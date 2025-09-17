import SwiftUI

struct ReportQuickFooter: View {
  @ObservedObject var app: AppSettings
  var isVisible: Bool = true
  var onSettings: (() -> Void)?

  private let items: [(String, Int)] = [("1W", 7), ("2W", 14), ("1M", 30), ("3M", 90)]

  var body: some View {
    HStack(spacing: 12) {
      ForEach(items, id: \.0) { label, days in
        Button {
          guard app.periodDays != days else { return }
          app.periodDays = days
          #if canImport(UIKit)
          let gen = UISelectionFeedbackGenerator(); gen.selectionChanged()
          #endif
        } label: {
          Text(label)
            .font(.callout)
            .fontWeight(app.periodDays == days ? .semibold : .regular)
            .padding(.vertical, 6)
            .padding(.horizontal, 12)
            .background(Capsule().fill(app.periodDays == days ? Color(uiColor: .secondarySystemFill) : .clear))
            .overlay(Capsule().stroke(app.periodDays == days ? Color(uiColor: .separator).opacity(0.6) : Color.secondary.opacity(0.25)))
            .foregroundStyle(app.periodDays == days ? Color.primary : Color.secondary)
        }
        .buttonStyle(.plain)
      }
      Spacer()
      Button(action: { onSettings?() }) {
        Label("Settings", systemImage: "gearshape.fill")
          .labelStyle(.titleAndIcon)
          .font(.callout)
          .padding(.vertical, 6)
          .padding(.horizontal, 12)
          .background(RoundedRectangle(cornerRadius: 10, style: .continuous).fill(Color(uiColor: .tertiarySystemFill)))
      }
      .buttonStyle(.plain)
    }
    .padding(.horizontal, 16)
    .padding(.vertical, 10)
    .frame(maxWidth: .infinity)
    .background(.ultraThinMaterial)
    .overlay(Divider(), alignment: .top)
    .animation(.easeInOut(duration: 0.25), value: isVisible)
    .opacity(isVisible ? 1 : 0)
    .offset(y: isVisible ? 0 : 30)
  }
}

#Preview {
  let app = AppSettings()
  return ReportQuickFooter(app: app, isVisible: true) {}
}

