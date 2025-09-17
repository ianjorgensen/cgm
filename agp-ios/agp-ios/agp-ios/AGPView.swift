import SwiftUI
import Charts

struct AGPPoint: Identifiable, Equatable {
  let id = UUID()
  let time: Date
  let p10: Double?
  let p25: Double?
  let p50: Double?
  let p75: Double?
  let p90: Double?
}

struct AGPView: View {
  @ObservedObject var hk: HealthKitExporter
  @ObservedObject var app: AppSettings
  var showFooter: Bool = true
  @State private var yMax: Double = 350
  @State private var points: [AGPPoint] = []
  @State private var isLoading: Bool = false
  @State private var pending: Task<Void, Never>? = nil
  private let cal = Calendar.current

  var body: some View {
    VStack(alignment: .leading, spacing: 12) {
      Text("Ambulatory Glucose Profile")
        .font(.title3).bold()
        .padding(.horizontal)

      Chart(points) {
        // 10–90 band (orange)
        if let lo = $0.p10, let hi = $0.p90 {
          AreaMark(
            x: .value("Time", $0.time),
            yStart: .value("p10", lo),
            yEnd: .value("p90", hi)
          )
          .foregroundStyle(.orange.opacity(0.35))
          .interpolationMethod(.catmullRom)
        }
        // 25–75 band (green)
        if let lo = $0.p25, let hi = $0.p75 {
          AreaMark(
            x: .value("Time", $0.time),
            yStart: .value("p25", lo),
            yEnd: .value("p75", hi)
          )
          .foregroundStyle(Color.green.opacity(0.45))
          .interpolationMethod(.catmullRom)
        }
        // Median line
        if let mid = $0.p50 {
          LineMark(
            x: .value("Time", $0.time),
            y: .value("Median", mid)
          )
          .foregroundStyle(Color.green.darker())
          .lineStyle(StrokeStyle(lineWidth: 2))
          .interpolationMethod(.catmullRom)
        }
      }
      .chartYScale(domain: 0...yMax)
      .chartXAxis {
        AxisMarks(values: stride(from: 0, through: 24, by: 3).map { hourLabelDate($0) }) { value in
          AxisGridLine()
          AxisValueLabel { if let d = value.as(Date.self) { Text(timeLabel(d)) } }
        }
      }
      .chartYAxis {
        AxisMarks(position: .leading)
      }
      .chartOverlay { proxy in
        // Target range 70–180 mg/dL
        GeometryReader { geo in
          let y70 = proxy.position(forY: 70) ?? 0
          let y180 = proxy.position(forY: 180) ?? 0
          let top = min(y70, y180), bottom = max(y70, y180)
          Rectangle()
            .fill(Color.green.opacity(0.10))
            .frame(height: bottom - top)
            .offset(y: top)
          // Lines at 70 / 180
          Path { p in
            let w = geo.size.width
            p.move(to: CGPoint(x: 0, y: y70)); p.addLine(to: CGPoint(x: w, y: y70))
            p.move(to: CGPoint(x: 0, y: y180)); p.addLine(to: CGPoint(x: w, y: y180))
          }
          .stroke(Color.green.opacity(0.8), style: StrokeStyle(lineWidth: 1))
        }
      }
      .padding(.horizontal)
      .animation(.easeInOut(duration: 0.35), value: points)
      .overlay(alignment: .center) { if isLoading { ProgressView().controlSize(.regular).padding() } }
      .frame(minHeight: 260)

      HStack(spacing: 16) {
        Image(systemName: "checkmark.seal.fill").foregroundStyle(.green)
        Text("Target Range 70–180 mg/dL")
        Spacer()
        Stepper("Max: \(Int(yMax))", value: $yMax, in: 250...400, step: 25)
          .labelsHidden()
      }
      .font(.footnote)
      .padding(.horizontal)

      Spacer(minLength: 0)
    }
    .navigationTitle(showFooter ? "AGP" : "")
    .task { await refresh() }
    .onChange(of: app.periodDays) { _ in scheduleRefresh() }
    .onChange(of: hk.cached.count) { _ in scheduleRefresh() }
    .safeAreaInset(edge: .bottom) { if showFooter { PeriodFooter(app: app) } }
  }
  private func refresh() async {
    await MainActor.run { isLoading = true }
    let readings = hk.cached
    let res = await AnalyticsService.shared.agpPoints(readings: readings, periodDays: app.periodDays)
    await MainActor.run {
      self.points = res
      self.isLoading = false
    }
  }

  private func scheduleRefresh() {
    pending?.cancel()
    pending = Task { @MainActor in
      try? await Task.sleep(nanoseconds: 250_000_000)
      await refresh()
    }
  }

  private func hourLabelDate(_ hour: Int) -> Date {
    let d0 = cal.startOfDay(for: Date())
    return cal.date(byAdding: .hour, value: hour, to: d0) ?? d0
  }
  private func timeLabel(_ d: Date) -> String {
    let f = DateFormatter(); f.dateFormat = "ha"; f.amSymbol = "am"; f.pmSymbol = "pm"; return f.string(from: d).lowercased()
  }
}

private extension Color {
  func darker(_ amount: Double = 0.25) -> Color {
    var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
    #if canImport(UIKit)
    UIColor(self).getRed(&r, green: &g, blue: &b, alpha: &a)
    #endif
    return Color(red: max(0, Double(r) - amount), green: max(0, Double(g) - amount), blue: max(0, Double(b) - amount))
  }
}

#Preview {
  let hk = HealthKitExporter(); hk.loadCache()
  let app = AppSettings()
  return NavigationStack { AGPView(hk: hk, app: app) }
}
