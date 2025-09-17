import SwiftUI

struct PeriodFooter: View {
  @ObservedObject var app: AppSettings
  var isVisible: Bool = true

  var body: some View {
    HStack {
      PeriodPicker(selected: $app.periodDays)
        .font(.callout)
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
  return PeriodFooter(app: app, isVisible: true)
}
