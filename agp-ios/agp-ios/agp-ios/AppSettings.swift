import Foundation

final class AppSettings: ObservableObject {
  @Published var periodDays: Int {
    didSet { UserDefaults.standard.set(periodDays, forKey: Self.key) }
  }
  static let presets: [Int] = [1, 7, 14, 21, 30, 90]
  private static let key = "AppSettings.periodDays.v1"

  init() {
    let saved = UserDefaults.standard.integer(forKey: Self.key)
    self.periodDays = saved > 0 ? saved : 14
  }
}

