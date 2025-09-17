import Foundation
import os

final class AnalyticsService {
  static let shared = AnalyticsService()
  private init() {}

  private struct Key: Hashable { let period: Int; let count: Int; let last: Double }

  private var agpCache: [Key: [AGPPoint]] = [:]
  private var tirCache: [Key: TIRBreakdown] = [:]
  private var summaryCache: [Key: SummaryStats] = [:]

  private func key(for readings: [HealthKitExporter.Reading], periodDays: Int) -> Key {
    let count = readings.count
    let last = readings.last?.ts ?? 0
    return Key(period: periodDays, count: count, last: last)
  }

  // MARK: - Public API
  func agpPoints(readings: [HealthKitExporter.Reading], periodDays: Int) async -> [AGPPoint] {
    let k = key(for: readings, periodDays: periodDays)
    if let cached = agpCache[k] { return cached }
    let result = await Task.detached(priority: .userInitiated) { () -> [AGPPoint] in
      let id = Perf.begin("AGPCompute")
      let out = AnalyticsService.computeAGPPoints(readings: readings, periodDays: periodDays)
      Perf.end("AGPCompute", id: id)
      return out
    }.value
    agpCache[k] = result
    return result
  }

  func tir(readings: [HealthKitExporter.Reading], periodDays: Int) async -> TIRBreakdown {
    let k = key(for: readings, periodDays: periodDays)
    if let cached = tirCache[k] { return cached }
    let result = await Task.detached(priority: .userInitiated) { () -> TIRBreakdown in
      let id = Perf.begin("TIRCompute")
      let out = AnalyticsService.computeTIR(readings: readings, periodDays: periodDays)
      Perf.end("TIRCompute", id: id)
      return out
    }.value
    tirCache[k] = result
    return result
  }

  func summary(readings: [HealthKitExporter.Reading], periodDays: Int) async -> SummaryStats {
    let k = key(for: readings, periodDays: periodDays)
    if let cached = summaryCache[k] { return cached }
    let result = await Task.detached(priority: .userInitiated) { () -> SummaryStats in
      let id = Perf.begin("SummaryCompute")
      let out = AnalyticsService.computeSummary(readings: readings, periodDays: periodDays)
      Perf.end("SummaryCompute", id: id)
      return out
    }.value
    summaryCache[k] = result
    return result
  }

  // MARK: - Compute
  private static func computeAGPPoints(readings: [HealthKitExporter.Reading], periodDays: Int) -> [AGPPoint] {
    let cal = Calendar.current
    let step: TimeInterval = 5 * 60
    let bins = 24 * 60 / 5
    let start = cal.date(byAdding: .day, value: -periodDays, to: Date()) ?? .distantPast

    var vals = Array(repeating: [Double](), count: bins)
    for r in readings where Date(timeIntervalSince1970: r.ts) >= start {
      let d = Date(timeIntervalSince1970: r.ts)
      let comps = cal.dateComponents([.hour, .minute], from: d)
      guard let h = comps.hour, let m = comps.minute else { continue }
      let idx = (h * 60 + m) / 5
      if idx >= 0 && idx < bins { vals[idx].append(r.mgdl) }
    }
    for i in 0..<bins { vals[i].sort() }
    let today = cal.startOfDay(for: Date())
    var out: [AGPPoint] = []
    out.reserveCapacity(bins)
    for i in 0..<bins {
      let minutes = i * 5
      guard let time = cal.date(byAdding: .minute, value: minutes, to: today) else { continue }
      let arr = vals[i]
      let p10 = percentile(arr, 0.10)
      let p25 = percentile(arr, 0.25)
      let p50 = percentile(arr, 0.50)
      let p75 = percentile(arr, 0.75)
      let p90 = percentile(arr, 0.90)
      out.append(AGPPoint(time: time, p10: p10, p25: p25, p50: p50, p75: p75, p90: p90))
    }
    return out
  }

  private static func percentile(_ sorted: [Double], _ p: Double) -> Double? {
    guard !sorted.isEmpty else { return nil }
    if sorted.count == 1 { return sorted[0] }
    let x = max(0.0, min(1.0, p))
    let idx = x * Double(sorted.count - 1)
    let lo = Int(floor(idx))
    let hi = Int(ceil(idx))
    if lo == hi { return sorted[lo] }
    let t = idx - floor(idx)
    return sorted[lo] * (1 - t) + sorted[hi] * t
  }

  private static func computeTIR(readings: [HealthKitExporter.Reading], periodDays: Int) -> TIRBreakdown {
    let now = Date()
    let start = Calendar.current.date(byAdding: .day, value: -periodDays, to: now) ?? .distantPast
    let step: TimeInterval = 5 * 60
    var map: [Int: Double] = [:]
    for r in readings where Date(timeIntervalSince1970: r.ts) >= start {
      let idx = Int(floor(r.ts / step))
      map[idx] = r.mgdl
    }
    let vl = 3.0 * 18.0
    let lo = 3.9 * 18.0
    let hi = 10.0 * 18.0
    let vh = 13.9 * 18.0
    var veryLow = 0, low = 0, target = 0, high = 0, veryHigh = 0
    for v in map.values {
      if v < vl { veryLow += 1 }
      else if v < lo { low += 1 }
      else if v <= hi { target += 1 }
      else if v <= vh { high += 1 }
      else { veryHigh += 1 }
    }
    let total = veryLow + low + target + high + veryHigh
    return TIRBreakdown(veryLow: veryLow, low: low, target: target, high: high, veryHigh: veryHigh, total: total)
  }

  private static func computeSummary(readings: [HealthKitExporter.Reading], periodDays: Int) -> SummaryStats {
    let step: TimeInterval = 5 * 60
    let cal = Calendar.current
    let end = Date()
    let start = cal.date(byAdding: .day, value: -periodDays, to: end) ?? .distantPast
    let startBin = Int(floor(start.timeIntervalSince1970 / step))
    let endBin = Int(floor(end.timeIntervalSince1970 / step))
    let expected = max(0, endBin - startBin + 1)
    var map: [Int: Double] = [:]
    for r in readings where r.ts >= start.timeIntervalSince1970 {
      let idx = Int(floor(r.ts / step))
      map[idx] = r.mgdl
    }
    let presentVals = map.filter { $0.key >= startBin && $0.key <= endBin }.sorted { $0.key < $1.key }.map { $0.value }
    let active = Double(presentVals.count)
    let activePercent = expected == 0 ? 0 : (active / Double(expected) * 100)
    guard !presentVals.isEmpty else { return SummaryStats(activePercent: 0, meanMgdL: 0, meanMmol: 0, gmi: 0, cv: 0) }
    let mean = presentVals.reduce(0, +) / Double(presentVals.count)
    let variance = presentVals.reduce(0) { $0 + pow($1 - mean, 2) } / Double(presentVals.count)
    let sd = sqrt(variance)
    let cv = mean == 0 ? 0 : (sd / mean * 100)
    let gmi = 3.31 + 0.02392 * mean
    let mmol = mean / 18.0
    return SummaryStats(activePercent: activePercent, meanMgdL: mean, meanMmol: mmol, gmi: gmi, cv: cv)
  }
}
