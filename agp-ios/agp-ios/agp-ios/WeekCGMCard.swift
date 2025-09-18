import SwiftUI
import Charts

struct WeekCGMCard: View {
  @ObservedObject var hk: HealthKitExporter
  @ObservedObject var app: AppSettings
  private let cal = Calendar.current

  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      ForEach(weekSeries) { wk in
        weekStrip(wk)
          .frame(height: 80)
      }
    }
  }

  // MARK: - Per-week strip
  @ViewBuilder private func weekStrip(_ wk: WeekSeries) -> some View {
    VStack(alignment: .leading, spacing: 4) {
      HStack { Text(weekTitle(wk.start)).font(.caption).foregroundStyle(.secondary); Spacer() }
      Chart {
        // Orange area above target
        ForEach(wk.points.filter { $0.mgdl > app.targetProfile.upperMgdl }) { p in
          AreaMark(x: .value("t", p.time), yStart: .value("lo", app.targetProfile.upperMgdl), yEnd: .value("y", p.mgdl))
            .foregroundStyle(Color.orange.opacity(0.55))
        }
        // Line
        ForEach(wk.points) { p in
          LineMark(x: .value("t", p.time), y: .value("y", p.mgdl))
            .foregroundStyle(Color.green)
            .lineStyle(StrokeStyle(lineWidth: 1))
            .interpolationMethod(.catmullRom)
        }
      }
      .chartYScale(domain: 0...maxY)
      .chartXAxis {
        AxisMarks(values: noonTicks(for: wk.start)) { _ in
          AxisGridLine()
          AxisValueLabel { Text("12pm") }
        }
      }
      .chartYAxis(.hidden)
      .chartOverlay { proxy in
        GeometryReader { geo in
          let yLow = proxy.position(forY: app.targetProfile.lowerMgdl) ?? 0
          let yHigh = proxy.position(forY: app.targetProfile.upperMgdl) ?? 0
          let top = min(yLow, yHigh), bottom = max(yLow, yHigh)
          Rectangle().fill(Color.green.opacity(0.10)).frame(height: bottom - top).offset(y: top)
          Path { p in
            let w = geo.size.width
            p.move(to: CGPoint(x: 0, y: yLow)); p.addLine(to: CGPoint(x: w, y: yLow))
            p.move(to: CGPoint(x: 0, y: yHigh)); p.addLine(to: CGPoint(x: w, y: yHigh))
          }.stroke(Color.green.opacity(0.6), style: StrokeStyle(lineWidth: 1))
        }
      }
    }
  }

  // MARK: - Data prep (all weeks in selected period)
  private struct WeekPoint: Identifiable { let id = UUID(); let time: Date; let mgdl: Double }
  private struct WeekSeries: Identifiable { let id = UUID(); let start: Date; let points: [WeekPoint] }

  private var weekSeries: [WeekSeries] {
    guard !hk.cached.isEmpty else { return [] }
    // Build week starts covering the selected period
    let end = Date()
    let periodStart = cal.date(byAdding: .day, value: -(app.periodDays - 1), to: cal.startOfDay(for: end)) ?? end
    let firstWeek = startOfWeek(for: periodStart)
    let lastWeek = startOfWeek(for: end)
    var starts: [Date] = []
    var s = firstWeek
    while s <= lastWeek {
      starts.append(s)
      s = cal.date(byAdding: .day, value: 7, to: s)!
    }

    var map: [Date: [WeekPoint]] = [:]
    for st in starts { map[st] = [] }

    for r in hk.cached {
      let d = Date(timeIntervalSince1970: r.ts)
      guard d >= firstWeek && d < cal.date(byAdding: .day, value: 7, to: lastWeek)! else { continue }
      let st = startOfWeek(for: d)
      map[st]?.append(WeekPoint(time: d, mgdl: r.mgdl))
    }
    return starts.map { st in
      WeekSeries(start: st, points: (map[st] ?? []).sorted { $0.time < $1.time })
    }
  }

  private var maxY: Double { 350 }
  private func noonTicks(for start: Date) -> [Date] {
    (0..<7).compactMap { cal.date(byAdding: .hour, value: 12 + $0*24, to: start) }
  }
  private func weekTitle(_ start: Date) -> String {
    let f = DateFormatter(); f.dateFormat = "MMM d"; let s = f.string(from: start)
    let e = f.string(from: cal.date(byAdding: .day, value: 6, to: start) ?? start)
    return "Week \(s) – \(e)"
  }
  private func startOfWeek(for date: Date) -> Date {
    let wd = cal.component(.weekday, from: date)
    // Make Monday=2, subtract offset to get Monday
    let daysToMon = (wd + 5) % 7
    return cal.startOfDay(for: cal.date(byAdding: .day, value: -daysToMon, to: date)!)
  }
}
