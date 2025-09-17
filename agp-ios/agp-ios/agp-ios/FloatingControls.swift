import SwiftUI

struct FloatingControls: View {
  @ObservedObject var app: AppSettings
  var onSettings: (() -> Void)

  private let order: [Int] = [7, 14, 30, 90]
  private var items: [(String, Int)] { order.map { (label(for: $0), $0) } }

  var body: some View {
    ZStack {
      // Left: period cycler
      HStack {
        Button(action: cyclePeriod) {
          Text(label(for: app.periodDays))
            .font(.subheadline).bold()
            .frame(width: 48, height: 48)
            .background(.ultraThinMaterial, in: Circle())
            .overlay(Circle().stroke(Color.black.opacity(0.08)))
        }
        .buttonStyle(.plain)
        .accessibilityLabel("Change period")
        .contextMenu {
          ForEach(items, id: \.1) { label, days in
            Button(action: { setPeriod(days) }) {
              HStack {
                Text(label)
                if app.periodDays == days { Image(systemName: "checkmark") }
              }
            }
          }
        }
        Spacer()
        // Right: settings gear
        Button(action: onSettings) {
          Image(systemName: "gearshape.fill")
            .font(.system(size: 18, weight: .semibold))
            .frame(width: 48, height: 48)
            .background(.ultraThinMaterial, in: Circle())
            .overlay(Circle().stroke(Color.black.opacity(0.08)))
        }
        .buttonStyle(.plain)
        .accessibilityLabel("Settings")
      }
      .padding(.horizontal, 20)
      .padding(.bottom, 14)
      .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottom)
      .ignoresSafeArea(.keyboard)
    }
  }

  private func cyclePeriod() {
    let idx = order.firstIndex(of: app.periodDays) ?? 0
    let next = order[(idx + 1) % order.count]
    setPeriod(next)
  }

  private func setPeriod(_ days: Int) {
    guard days != app.periodDays else { return }
    app.periodDays = days
    #if canImport(UIKit)
    let gen = UIImpactFeedbackGenerator(style: .light)
    gen.impactOccurred()
    #endif
  }

  private func label(for days: Int) -> String {
    switch days {
    case 7: return "1W"
    case 14: return "2W"
    case 30: return "1M"
    case 90: return "3M"
    default: return "1W"
    }
  }
}

#Preview {
  let app = AppSettings()
  return ZStack {
    Color.gray.opacity(0.1)
    FloatingControls(app: app) {}
  }
}
