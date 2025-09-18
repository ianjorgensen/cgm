import Foundation

final class AppSettings: ObservableObject {
  @Published var periodDays: Int {
    didSet { UserDefaults.standard.set(periodDays, forKey: Self.key) }
  }
  static let presets: [Int] = [1, 7, 14, 21, 30, 90]
  private static let key = "AppSettings.periodDays.v1"

  enum TargetProfile: String, CaseIterable, Identifiable {
    case general, tight, pregnancy
    var id: String { rawValue }
    var title: String {
      switch self { case .general: return "General"; case .tight: return "Tight"; case .pregnancy: return "Pregnancy" }
    }
    // Ranges in mmol/L
    var lowerMmol: Double { 3.9 }
    var upperMmol: Double { switch self { case .general: return 10.0; case .tight, .pregnancy: return 7.8 } }
    // mg/dL thresholds
    var lowerMgdl: Double { lowerMmol * 18.0 }
    var upperMgdl: Double { upperMmol * 18.0 }
    var rangeStringMmol: String { String(format: "%.1f–%.1f mmol/L", lowerMmol, upperMmol) }
    var rangeStringMgdl: String { "\(Int(round(lowerMgdl)))–\(Int(round(upperMgdl))) mg/dL" }
  }
  @Published var targetProfile: TargetProfile {
    didSet { UserDefaults.standard.set(targetProfile.rawValue, forKey: Self.targetKey) }
  }
  private static let targetKey = "AppSettings.targetProfile.v1"

  enum DisplayUnits: String, CaseIterable, Identifiable { case mgdL, mmolL
    var id: String { rawValue }
    var title: String { self == .mgdL ? "mg/dL" : "mmol/L" }
  }
  @Published var displayUnits: DisplayUnits {
    didSet { UserDefaults.standard.set(displayUnits.rawValue, forKey: Self.unitsKey) }
  }
  private static let unitsKey = "AppSettings.displayUnits.v1"

  init() {
    let saved = UserDefaults.standard.integer(forKey: Self.key)
    self.periodDays = saved > 0 ? saved : 14
    if let raw = UserDefaults.standard.string(forKey: Self.targetKey), let p = TargetProfile(rawValue: raw) { self.targetProfile = p } else { self.targetProfile = .general }
    if let u = UserDefaults.standard.string(forKey: Self.unitsKey), let du = DisplayUnits(rawValue: u) { self.displayUnits = du } else { self.displayUnits = .mmolL }
  }
}
