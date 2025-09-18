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
      Chart {
        // Subtle p25–p75 band behind lines
        ForEach(band2575, id: \.time) { d in
          AreaMark(
            x: .value("Time", d.time),
            yStart: .value("p25", d.lo),
            yEnd: .value("p75", d.hi)
          )
          .foregroundStyle(Color.orange.opacity(0.30))
          .interpolationMethod(.catmullRom)
        }
        // 5% (red)
        ForEach(q05, id: \.time) { p in
          LineMark(
            x: .value("Time", p.time),
            y: .value("Value", p.y),
            series: .value("Series", "p05")
          )
          .foregroundStyle(Color.red.opacity(0.85))
          .lineStyle(StrokeStyle(lineWidth: 1.2))
          .interpolationMethod(.catmullRom)
        }
        // 25% (orange)
        ForEach(q25, id: \.time) { p in
          LineMark(
            x: .value("Time", p.time),
            y: .value("Value", p.y),
            series: .value("Series", "p25")
          )
          .foregroundStyle(Color.orange)
          .lineStyle(StrokeStyle(lineWidth: 1.4))
          .interpolationMethod(.catmullRom)
        }
        // 50% (green)
        ForEach(median, id: \.time) { m in
          LineMark(
            x: .value("Time", m.time),
            y: .value("Value", m.y),
            series: .value("Series", "p50")
          )
          .foregroundStyle(Color.green)
          .lineStyle(StrokeStyle(lineWidth: 2))
          .interpolationMethod(.catmullRom)
        }
        // 75% (orange)
        ForEach(q75, id: \.time) { p in
          LineMark(
            x: .value("Time", p.time),
            y: .value("Value", p.y),
            series: .value("Series", "p75")
          )
          .foregroundStyle(Color.orange)
          .lineStyle(StrokeStyle(lineWidth: 1.4))
          .interpolationMethod(.catmullRom)
        }
        // 95% (red)
        ForEach(q95, id: \.time) { p in
          LineMark(
            x: .value("Time", p.time),
            y: .value("Value", p.y),
            series: .value("Series", "p95")
          )
          .foregroundStyle(Color.red.opacity(0.85))
          .lineStyle(StrokeStyle(lineWidth: 1.2))
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
        AxisMarks(position: .leading) { value in
          AxisGridLine()
          AxisValueLabel { if let y = value.as(Double.self) { Text(app.displayUnits == .mmolL ? String(format: "%.0f", y) : String(Int(y))) } }
        }
      }
      .chartOverlay { proxy in
        GeometryReader { geo in
          ZStack(alignment: .topLeading) {
            if let y = lastY(q05) { label("5%", color: .red.opacity(0.9), y: y, proxy: proxy, width: geo.size.width) }
            if let y = lastY(q25) { label("25%", color: .orange, y: y, proxy: proxy, width: geo.size.width) }
            if let y = lastY(median) { label("50%", color: .green, y: y, proxy: proxy, width: geo.size.width) }
            if let y = lastY(q75) { label("75%", color: .orange, y: y, proxy: proxy, width: geo.size.width) }
            if let y = lastY(q95) { label("95%", color: .red.opacity(0.9), y: y, proxy: proxy, width: geo.size.width) }
          }
        }
      }
      .padding(.leading, 8)
      .padding(.trailing, 24)
      .overlay(alignment: .center) { if isLoading { ProgressView().controlSize(.regular).padding() } }
      .frame(minHeight: 260)

      Spacer(minLength: 0)
    }
    .navigationTitle(showFooter ? "AGP" : "")
    .task { await refresh() }
    .onChange(of: app.periodDays) { _ in scheduleRefresh() }
    .onChange(of: hk.cached.count) { _ in scheduleRefresh() }
    .onChange(of: app.displayUnits) { _ in updateYMaxForUnits(); scheduleRefresh() }
    .onAppear { updateYMaxForUnits() }
    .safeAreaInset(edge: .bottom) { if showFooter { PeriodFooter(app: app) } }
  }
  private func refresh() async {
    await MainActor.run { isLoading = true }
    let readings = hk.cached
    var res = await AnalyticsService.shared.agpPoints(readings: readings, periodDays: app.periodDays)
    if app.displayUnits == .mmolL { res = convertToMmol(res) }
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

  private func updateYMaxForUnits() {
    if app.displayUnits == .mmolL { yMax = 20 } else { yMax = 350 }
  }

  private func convertToMmol(_ pts: [AGPPoint]) -> [AGPPoint] {
    var out: [AGPPoint] = []
    out.reserveCapacity(pts.count)
    for p in pts {
      let n = AGPPoint(
        time: p.time,
        p10: p.p10.map { $0 / 18.0 },
        p25: p.p25.map { $0 / 18.0 },
        p50: p.p50.map { $0 / 18.0 },
        p75: p.p75.map { $0 / 18.0 },
        p90: p.p90.map { $0 / 18.0 }
      )
      out.append(n)
    }
    return out
  }

  // Derived datasets for Chart marks
  private struct Band { let time: Date; let lo: Double; let hi: Double }
  private struct Mid { let time: Date; let y: Double }
  private var band1090: [Band] {
    points.compactMap { p in
      guard let lo = p.p10, let hi = p.p90 else { return nil }
      return Band(time: p.time, lo: lo, hi: hi)
    }
  }
  private var band2575: [Band] {
    points.compactMap { p in
      guard let lo = p.p25, let hi = p.p75 else { return nil }
      return Band(time: p.time, lo: lo, hi: hi)
    }
  }
  private var median: [Mid] {
    points.compactMap { p in
      guard let m = p.p50 else { return nil }
      return Mid(time: p.time, y: m)
    }
  }
  private var q25: [Mid] {
    points.compactMap { p in
      guard let v = p.p25 else { return nil }
      return Mid(time: p.time, y: v)
    }
  }
  private var q75: [Mid] {
    points.compactMap { p in
      guard let v = p.p75 else { return nil }
      return Mid(time: p.time, y: v)
    }
  }
  private var q05: [Mid] {
    points.compactMap { p in
      guard let v = p.p10 else { return nil }
      // approximate 5% from 10% if only p10 available; if p05 available later, swap
      return Mid(time: p.time, y: v) // placeholder using p10
    }
  }
  private var q95: [Mid] {
    points.compactMap { p in
      guard let v = p.p90 else { return nil }
      // approximate 95% from 90% if only p90 available; if p95 available later, swap
      return Mid(time: p.time, y: v)
    }
  }

  // Helpers for overlay labels
  private func lastY(_ arr: [Mid]) -> Double? { arr.last?.y }
  @ViewBuilder private func label(_ text: String, color: Color, y: Double, proxy: ChartProxy, width: CGFloat) -> some View {
    let py = proxy.position(forY: y) ?? 0
    // Place the capsule so its LEFT edge aligns to the chart's right edge
    // Approximate capsule half-width as 18pt to move its center outside the chart
    let x = width + 18
    Text(text)
      .font(.caption2)
      .foregroundStyle(color)
      .position(x: x, y: py)
  }

private struct AGPChartView: View {
  let band1090: [AGPView.Band]
  let band2575: [AGPView.Band]
  let median: [AGPView.Mid]
  let q25: [AGPView.Mid]
  let q75: [AGPView.Mid]
  let yMax: Double
  let units: AppSettings.DisplayUnits
  let profile: AppSettings.TargetProfile
  let hourLabelDate: (Int) -> Date
  let timeLabel: (Date) -> String

  var body: some View {
    Chart {
      // 25% and 75% lines
      ForEach(q25, id: \.time) { p in
        LineMark(x: .value("Time", p.time), y: .value("p25", p.y))
          .foregroundStyle(Color.green.opacity(0.5))
          .lineStyle(StrokeStyle(lineWidth: 1))
          .interpolationMethod(.catmullRom)
      }
      ForEach(q75, id: \.time) { p in
        LineMark(x: .value("Time", p.time), y: .value("p75", p.y))
          .foregroundStyle(Color.green.opacity(0.5))
          .lineStyle(StrokeStyle(lineWidth: 1))
          .interpolationMethod(.catmullRom)
      }
      ForEach(median, id: \.time) { m in
        LineMark(x: .value("Time", m.time), y: .value("Median", m.y))
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
      AxisMarks(position: .leading) { value in
        AxisGridLine()
        AxisValueLabel {
          if let y = value.as(Double.self) {
            Text((units == .mmolL) ? String(format: "%.0f", y) : String(Int(y)))
          }
        }
      }
    }
    .chartOverlay { proxy in
      GeometryReader { geo in
        let low = (units == .mmolL) ? profile.lowerMmol : profile.lowerMgdl
        let high = (units == .mmolL) ? profile.upperMmol : profile.upperMgdl
        let yLow = proxy.position(forY: low) ?? 0
        let yHigh = proxy.position(forY: high) ?? 0
        let t = min(yLow, yHigh), b = max(yLow, yHigh)
        Rectangle().fill(Color.green.opacity(0.10)).frame(height: b - t).offset(y: t)
        Path { p in
          let w = geo.size.width
          p.move(to: CGPoint(x: 0, y: yLow)); p.addLine(to: CGPoint(x: w, y: yLow))
          p.move(to: CGPoint(x: 0, y: yHigh)); p.addLine(to: CGPoint(x: w, y: yHigh))
        }.stroke(Color.green.opacity(0.8), style: StrokeStyle(lineWidth: 1))
      }
    }
  }
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
