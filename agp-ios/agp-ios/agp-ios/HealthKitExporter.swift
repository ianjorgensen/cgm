import Foundation
import HealthKit

@MainActor
final class HealthKitExporter: ObservableObject {
  private let store = HKHealthStore()
  private let glucoseType = HKObjectType.quantityType(forIdentifier: .bloodGlucose)!

  enum Units: String, CaseIterable { case mgdL = "mg/dL", mmolL = "mmol/L" }

  func requestAuthorization() async throws {
    try await store.requestAuthorization(toShare: [], read: [glucoseType])
  }

  struct ExportResult {
    let url: URL
    let count: Int
    let t0ISO: String
    let units: Units
  }

  func exportCGMJS(preferredUnits: Units = .mmolL) async throws -> ExportResult {
    let samples = try await fetchAllGlucose()
    guard let first = samples.first, let last = samples.last else {
      throw NSError(domain: "HK", code: 1, userInfo: [NSLocalizedDescriptionKey: "No glucose samples found in Health app."])
    }

    // Output units
    let unit: HKUnit = (preferredUnits == .mgdL) ? HKUnit(from: "mg/dL") : HKUnit(from: "mmol/L")

    // 5-minute bins covering [first, last]
    let stepSec: TimeInterval = 5 * 60
    let t0 = floor(first.startDate.timeIntervalSince1970 / stepSec) * stepSec
    let t1 = floor(last.startDate.timeIntervalSince1970 / stepSec) * stepSec
    let bins = max(0, Int((t1 - t0) / stepSec) + 1)
    var glucose = Array<Double>(repeating: -1, count: bins)

    // Fill bins: use the last value seen within each bin
    for s in samples {
      let ts = s.startDate.timeIntervalSince1970
      let idx = Int(floor((ts - t0) / stepSec))
      guard idx >= 0 && idx < bins else { continue }
      let raw = s.quantity.doubleValue(for: unit)
      // mg/dL as integer-ish; mmol/L with up to 2 decimals
      let val: Double
      if preferredUnits == .mgdL {
        val = Double(Int(round(raw)))
      } else {
        val = (raw * 100).rounded() / 100
      }
      glucose[idx] = val
    }

    // Format JS file matching the web viewer
    let iso = ISO8601DateFormatter()
    let t0ISO = iso.string(from: Date(timeIntervalSince1970: t0))
    let stepMs = Int(stepSec * 1000)

    let numberString: String = glucose.map { v in
      if v < 0 { return "-1" }
      if preferredUnits == .mgdL {
        return String(Int(v))
      } else {
        var s = String(format: "%.2f", v)
        while s.contains(".") && (s.hasSuffix("0") || s.hasSuffix(".")) { s.removeLast() }
        return s
      }
    }.joined(separator: ",")

    let js = """
    // Auto-generated from HealthKit
    export const units = '\(preferredUnits.rawValue)';
    export const t0 = '\(t0ISO)';
    export const stepMs = \(stepMs);
    export const glucose = [\(numberString)];
    """

    // Write to a temp file for sharing/saving
    let url = FileManager.default.temporaryDirectory.appendingPathComponent("cgm_data.js")
    try js.write(to: url, atomically: true, encoding: .utf8)

    return ExportResult(url: url, count: glucose.count, t0ISO: t0ISO, units: preferredUnits)
  }

  // MARK: - HealthKit
  private func fetchAllGlucose() async throws -> [HKQuantitySample] {
    try await withCheckedThrowingContinuation { cont in
      let pred = HKQuery.predicateForSamples(withStart: .distantPast, end: Date(), options: [])
      let sort = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: true)
      let q = HKSampleQuery(sampleType: glucoseType, predicate: pred, limit: HKObjectQueryNoLimit, sortDescriptors: [sort]) { _, results, error in
        if let error = error {
          cont.resume(throwing: error)
        } else {
          cont.resume(returning: (results as? [HKQuantitySample]) ?? [])
        }
      }
      store.execute(q)
    }
  }
}

