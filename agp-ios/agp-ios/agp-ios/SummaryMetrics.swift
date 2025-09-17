import Foundation

struct SummaryStats {
  let activePercent: Double
  let meanMgdL: Double
  let meanMmol: Double
  let gmi: Double
  let cv: Double
}

@MainActor
func computeSummaryStats(hk: HealthKitExporter, days: Int) -> SummaryStats {
  let step: TimeInterval = 5 * 60
  let cal = Calendar.current
  let end = Date()
  let start = cal.date(byAdding: .day, value: -days, to: end) ?? .distantPast
  let startBin = Int(floor(start.timeIntervalSince1970 / step))
  let endBin = Int(floor(end.timeIntervalSince1970 / step))
  let expected = max(0, endBin - startBin + 1)

  var map: [Int: Double] = [:]
  for r in hk.cached where r.ts >= start.timeIntervalSince1970 {
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
  let gmi = 3.31 + 0.02392 * mean // mean in mg/dL
  let mmol = mean / 18.0
  return SummaryStats(activePercent: activePercent, meanMgdL: mean, meanMmol: mmol, gmi: gmi, cv: cv)
}
