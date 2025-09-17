import SwiftUI
import Charts

private struct DayPoint: Identifiable {
  let id = UUID()
  let time: Date
  let mgdl: Double
}

private struct DaySeries: Identifiable {
  let id = UUID()
  let date: Date // midnight
  let points: [DayPoint]
}

struct RecentDaysView: View {
  @ObservedObject var hk: HealthKitExporter
  @ObservedObject var app: AppSettings
  var showFooter: Bool = true
  var showHeader: Bool = true
  @State private var yMax: Double = 300
  private let cal = Calendar.current
  @State private var footerVisible: Bool = true
  @State private var lastOffset: CGFloat = 0

  var body: some View {
    ScrollView {
      VStack(alignment: .leading, spacing: 24) {
        if showHeader { header.padding(.horizontal) }
        ForEach(series) { day in
          dayStrip(day)
            .frame(height: 90)
            .padding(.horizontal)
        }
        ScrollOffsetReader(space: "recentDaysScroll")
      }
    }
    .coordinateSpace(name: "recentDaysScroll")
    .onPreferenceChange(ScrollOffsetPreferenceKey.self) { newVal in
      let delta = newVal - lastOffset
      withAnimation(.easeInOut(duration: 0.2)) {
        if newVal > -10 { footerVisible = true }
        else if abs(delta) > 1 { footerVisible = delta > 0 }
      }
      lastOffset = newVal
    }
    .navigationTitle(showFooter ? "Recent Days" : "")
    .safeAreaInset(edge: .bottom) { if showFooter { PeriodFooter(app: app, isVisible: footerVisible) } }
  }

  private var header: some View {
    HStack {
      Menu("Last \(app.periodDays) days") { ForEach(AppSettings.presets, id: \.self) { d in Button("Last \(d) days") { app.periodDays = d } } }
      Spacer()
      Stepper("Max: \(Int(yMax))", value: $yMax, in: 250...400, step: 25).labelsHidden()
    }
    .font(.footnote)
  }

  @ViewBuilder private func dayStrip(_ day: DaySeries) -> some View {
    VStack(alignment: .leading, spacing: 6) {
      HStack {
        Text(dayLabel(day.date)).font(.headline)
        Spacer()
        Text(shortDate(day.date)).foregroundStyle(.secondary)
      }
      Chart {
        // High area (above 180)
        ForEach(day.points.filter { $0.mgdl > 180 }) { p in
          AreaMark(x: .value("Time", p.time), yStart: .value("180", 180), yEnd: .value("mg/dL", p.mgdl))
            .foregroundStyle(Color.orange.opacity(0.55))
        }
        // Line
        ForEach(day.points) { p in
          LineMark(x: .value("Time", p.time), y: .value("mg/dL", p.mgdl))
            .foregroundStyle(Color.green)
            .interpolationMethod(.catmullRom)
        }
      }
      .chartYScale(domain: 0...yMax)
      .chartXAxis {
        AxisMarks(values: [noon(day.date)]) { value in
          AxisGridLine()
          AxisValueLabel { Text("12pm") }
        }
      }
      .chartYAxis(.hidden)
      .chartOverlay { proxy in
        GeometryReader { geo in
          let y70 = proxy.position(forY: 70) ?? 0
          let y180 = proxy.position(forY: 180) ?? 0
          let top = min(y70, y180), bottom = max(y70, y180)
          Rectangle().fill(Color.green.opacity(0.10)).frame(height: bottom - top).offset(y: top)
          Path { p in
            let w = geo.size.width
            p.move(to: CGPoint(x: 0, y: y70)); p.addLine(to: CGPoint(x: w, y: y70))
            p.move(to: CGPoint(x: 0, y: y180)); p.addLine(to: CGPoint(x: w, y: y180))
          }.stroke(Color.green.opacity(0.5), style: StrokeStyle(lineWidth: 1))
        }
      }
    }
  }

  // MARK: - Data prep
  private var series: [DaySeries] {
    let step: TimeInterval = 5 * 60
    guard !hk.cached.isEmpty else { return [] }
    let end = Date()
    let start = cal.date(byAdding: .day, value: -app.periodDays + 1, to: cal.startOfDay(for: end)) ?? end
    let daysRange = stride(from: 0, to: app.periodDays, by: 1)
    let baseMidnight = cal.startOfDay(for: end)

    // Map readings into bins by exact Date of their time-of-day on that day's midnight
    var dayMap: [Date: [DayPoint]] = [:]
    for d in daysRange {
      if let day = cal.date(byAdding: .day, value: -d, to: baseMidnight) {
        dayMap[day] = []
      }
    }

    for r in hk.cached {
      let tsDate = Date(timeIntervalSince1970: r.ts)
      guard tsDate >= start else { continue }
      let midnight = cal.startOfDay(for: tsDate)
      guard dayMap[midnight] != nil else { continue }
      let comps = cal.dateComponents([.hour, .minute], from: tsDate)
      let minutes = (comps.hour ?? 0) * 60 + (comps.minute ?? 0)
      if let t = cal.date(byAdding: .minute, value: minutes, to: midnight) {
        dayMap[midnight]?.append(DayPoint(time: t, mgdl: r.mgdl))
      }
    }

    return dayMap.keys.sorted().map { k in
      let pts = (dayMap[k] ?? []).sorted { $0.time < $1.time }
      return DaySeries(date: k, points: pts)
    }
  }

  private func noon(_ d: Date) -> Date { cal.date(byAdding: .hour, value: 12, to: cal.startOfDay(for: d)) ?? d }
  private func dayLabel(_ d: Date) -> String { let f = DateFormatter(); f.dateFormat = "EEE"; return f.string(from: d) }
  private func shortDate(_ d: Date) -> String { let f = DateFormatter(); f.dateFormat = "d MMM"; return f.string(from: d) }
}

#Preview {
  let hk = HealthKitExporter(); hk.loadCache()
  let app = AppSettings()
  return NavigationStack { RecentDaysView(hk: hk, app: app) }
}
