import Foundation
import HealthKit

@MainActor
final class HealthKitExporter: ObservableObject {
  private let store = HKHealthStore()
  private let glucoseType = HKObjectType.quantityType(forIdentifier: .bloodGlucose)!
  private var observerQuery: HKObserverQuery?
  private let anchorKey = "HKAnchor_glucose_v1"
  private let bgEnabledKey = "BGEnabled_glucose_v1"
  private let lastSyncKey = "LastSync_glucose_v1"

  enum Units: String, CaseIterable { case mgdL = "mg/dL", mmolL = "mmol/L" }

  // Summary info for UI
  @Published var totalSamples: Int = 0
  @Published var firstSampleDate: Date? = nil
  @Published var lastSampleDate: Date? = nil

  // MARK: - Local cache (raw readings in mg/dL)
  struct Reading: Codable, Equatable {
    let ts: TimeInterval   // seconds since 1970
    let mgdl: Double
  }
  @Published private(set) var cached: [Reading] = [] // sorted ascending
  private var cacheURL: URL {
    let fm = FileManager.default
    let base = try! fm.url(for: .applicationSupportDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
    return base.appendingPathComponent("GlucoseCache.json")
  }

  func loadCache() {
    do {
      let data = try Data(contentsOf: cacheURL)
      let arr = try JSONDecoder().decode([Reading].self, from: data)
      cached = arr.sorted { $0.ts < $1.ts }
    } catch {
      cached = []
    }
    updateSummaryFromCache()
  }

  func loadSettings() {
    backgroundEnabled = UserDefaults.standard.object(forKey: bgEnabledKey) as? Bool ?? true
    if let d = UserDefaults.standard.object(forKey: lastSyncKey) as? TimeInterval { lastSyncDate = Date(timeIntervalSince1970: d) }
  }

  private func saveCache() {
    do {
      let fm = FileManager.default
      let dir = cacheURL.deletingLastPathComponent()
      try fm.createDirectory(at: dir, withIntermediateDirectories: true)
      let data = try JSONEncoder().encode(cached)
      try data.write(to: cacheURL, options: .atomic)
    } catch {
      // best-effort; ignore failures
    }
  }

  private func updateSummaryFromCache() {
    totalSamples = cached.count
    firstSampleDate = cached.first.map { Date(timeIntervalSince1970: $0.ts) }
    lastSampleDate = cached.last.map { Date(timeIntervalSince1970: $0.ts) }
  }

  func refreshSummary() async {
    do {
      // Use cache first; if empty and authorized, do a quick sync
      if cached.isEmpty { try await syncLatest() }
      updateSummaryFromCache()
    } catch {
      // Keep previous values; likely not authorized yet
    }
  }

  // MARK: - Sync new readings into cache
  func syncLatest() async throws {
    let start: Date? = cached.last.map { Date(timeIntervalSince1970: $0.ts - 1) } // -1s to include boundary
    let newSamples = try await fetchGlucose(start: start, end: Date())
    if newSamples.isEmpty { return }
    // Convert to mg/dL and append
    let unitMGDL = HKUnit(from: "mg/dL")
    var additions: [Reading] = []
    additions.reserveCapacity(newSamples.count)
    for s in newSamples {
      let mgdl = s.quantity.doubleValue(for: unitMGDL)
      additions.append(Reading(ts: s.startDate.timeIntervalSince1970, mgdl: mgdl))
    }
    // Merge (dedupe by timestamp seconds)
    var map: [TimeInterval: Double] = cached.reduce(into: [:]) { $0[$1.ts] = $1.mgdl }
    for a in additions { map[a.ts] = a.mgdl }
    cached = map.keys.sorted().map { Reading(ts: $0, mgdl: map[$0]!) }
    saveCache()
    updateSummaryFromCache()
    lastSyncDate = Date()
    UserDefaults.standard.set(lastSyncDate!.timeIntervalSince1970, forKey: lastSyncKey)
  }

  func requestAuthorization() async throws {
    try await store.requestAuthorization(toShare: [], read: [glucoseType])
  }

  struct ExportResult {
    let url: URL
    let count: Int
    let t0ISO: String
    let t1ISO: String
    let units: Units
  }

  func exportCGMJS(preferredUnits: Units = .mmolL) async throws -> ExportResult {
    if cached.isEmpty {
      // If nothing cached yet, attempt a sync to populate
      try await syncLatest()
    }
    guard let first = cached.first, let last = cached.last else {
      throw NSError(domain: "HK", code: 1, userInfo: [NSLocalizedDescriptionKey: "No glucose samples found in Health app."])
    }

    // 5-minute bins covering [first, last]
    let stepSec: TimeInterval = 5 * 60
    let t0 = floor(first.ts / stepSec) * stepSec
    let t1 = floor(last.ts / stepSec) * stepSec
    let bins = max(0, Int((t1 - t0) / stepSec) + 1)
    var glucose = Array<Double>(repeating: -1, count: bins)

    // Fill bins: use the last value seen within each bin
    for r in cached {
      let ts = r.ts
      let idx = Int(floor((ts - t0) / stepSec))
      guard idx >= 0 && idx < bins else { continue }
      let mgdl = r.mgdl
      // mg/dL as integer-ish; mmol/L with up to 2 decimals
      let val: Double
      if preferredUnits == .mgdL {
        val = Double(Int(round(mgdl)))
      } else {
        let mmol = mgdl / 18.0
        val = (mmol * 100).rounded() / 100
      }
      glucose[idx] = val
    }

    // Format JS file matching the web viewer
    let iso = ISO8601DateFormatter()
    let t0ISO = iso.string(from: Date(timeIntervalSince1970: t0))
    let stepMs = Int(stepSec * 1000)
    let t1ISO = iso.string(from: Date(timeIntervalSince1970: t1))

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

    return ExportResult(url: url, count: glucose.count, t0ISO: t0ISO, t1ISO: t1ISO, units: preferredUnits)
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

  private func fetchGlucose(start: Date?, end: Date) async throws -> [HKQuantitySample] {
    try await withCheckedThrowingContinuation { cont in
      let pred = HKQuery.predicateForSamples(withStart: start ?? .distantPast, end: end, options: [])
      let sort = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: true)
      let q = HKSampleQuery(sampleType: glucoseType, predicate: pred, limit: HKObjectQueryNoLimit, sortDescriptors: [sort]) { _, results, error in
        if let error = error { cont.resume(throwing: error) }
        else { cont.resume(returning: (results as? [HKQuantitySample]) ?? []) }
      }
      store.execute(q)
    }
  }

  // MARK: - Background delivery with observer + anchored query
  func startBackgroundDelivery() {
    // Set up observer (idempotent) and enable background delivery
    let q = HKObserverQuery(sampleType: glucoseType, predicate: nil) { [weak self] _, completion, error in
      guard let self = self else { completion(); return }
      Task {
        await self.runAnchoredQuery()
        completion()
      }
    }
    observerQuery = q
    store.execute(q)
    store.enableBackgroundDelivery(for: glucoseType, frequency: .immediate) { _, _ in }

    // Also run once on registration to pull any missed data
    Task { await self.runAnchoredQuery() }
    backgroundEnabled = true
    UserDefaults.standard.set(true, forKey: bgEnabledKey)
  }

  func stopBackgroundDelivery() {
    if let q = observerQuery { store.stop(q) }
    store.disableBackgroundDelivery(for: glucoseType) { _, _ in }
    observerQuery = nil
    backgroundEnabled = false
    UserDefaults.standard.set(false, forKey: bgEnabledKey)
  }

  private func loadAnchor() -> HKQueryAnchor? {
    guard let data = UserDefaults.standard.data(forKey: anchorKey) else { return nil }
    return try? NSKeyedUnarchiver.unarchivedObject(ofClass: HKQueryAnchor.self, from: data)
  }
  private func saveAnchor(_ a: HKQueryAnchor?) {
    guard let a else { return }
    if let data = try? NSKeyedArchiver.archivedData(withRootObject: a, requiringSecureCoding: true) {
      UserDefaults.standard.set(data, forKey: anchorKey)
    }
  }

  @discardableResult
  private func runAnchoredQuery() async -> Int {
    await withCheckedContinuation { (cont: CheckedContinuation<Void, Never>) in
      var anchor = loadAnchor()
      let aq = HKAnchoredObjectQuery(type: glucoseType, predicate: nil, anchor: anchor, limit: HKObjectQueryNoLimit) { [weak self] _, added, deleted, newAnchor, error in
        guard let self = self else { cont.resume() ; return }
        defer { cont.resume() }
        if let newAnchor { self.saveAnchor(newAnchor) }
        guard error == nil else { return }
        let unitMGDL = HKUnit(from: "mg/dL")
        // Hop to main actor for @Published mutations
        Task { @MainActor in
          var map: [TimeInterval: Double] = self.cached.reduce(into: [:]) { $0[$1.ts] = $1.mgdl }
          for case let s as HKQuantitySample in (added ?? []) {
            let ts = s.startDate.timeIntervalSince1970
            let mgdl = s.quantity.doubleValue(for: unitMGDL)
            map[ts] = mgdl
          }
          self.cached = map.keys.sorted().map { Reading(ts: $0, mgdl: map[$0]!) }
          self.saveCache()
          self.updateSummaryFromCache()
          self.lastSyncDate = Date()
          UserDefaults.standard.set(self.lastSyncDate!.timeIntervalSince1970, forKey: self.lastSyncKey)
        }
      }
      self.store.execute(aq)
    }
    return cached.count
  }

  // UI-bindable state
  @Published var backgroundEnabled: Bool = true
  @Published var lastSyncDate: Date? = nil

  func setBackgroundEnabled(_ enabled: Bool) {
    if enabled { startBackgroundDelivery() } else { stopBackgroundDelivery() }
  }

  func clearCache() {
    cached = []
    // Remove cache file
    do { try FileManager.default.removeItem(at: cacheURL) } catch {}
    // Clear anchor + last sync persistence
    UserDefaults.standard.removeObject(forKey: anchorKey)
    UserDefaults.standard.removeObject(forKey: lastSyncKey)
    lastSyncDate = nil
    saveCache()
    updateSummaryFromCache()
  }

  // Copy an exported file to a security-scoped repo folder (or its "cgm-data" subfolder)
  func copyExport(toBookmarkedFolder exportURL: URL, subfolder: String = "cgm-data") throws -> URL {
    guard let folder = RepoFolderBookmark.resolve() else {
      throw NSError(domain: "RepoFolder", code: 0, userInfo: [NSLocalizedDescriptionKey: "No repo folder selected yet."])
    }
    let access = folder.startAccessingSecurityScopedResource()
    defer { if access { folder.stopAccessingSecurityScopedResource() } }
    if !access {
      // Proceed anyway; File Providers may still allow, but surface a clearer error if op fails
    }

    let fm = FileManager.default
    let base: URL
    if folder.lastPathComponent.lowercased() == subfolder.lowercased() {
      base = folder
    } else {
      base = folder.appendingPathComponent(subfolder, isDirectory: true)
      try fm.ensureDirectory(base)
    }
    let dest = base.appendingPathComponent("cgm_data.js", isDirectory: false)
    // Replace existing file if present
    if fm.fileExists(atPath: dest.path) { try fm.removeItem(at: dest) }
    do {
      try fm.copyItem(at: exportURL, to: dest)
    } catch {
      throw NSError(domain: "RepoFolder", code: 2, userInfo: [NSLocalizedDescriptionKey: "Failed to write to repo folder. Please reselect the folder."])
    }
    return dest
  }
}
