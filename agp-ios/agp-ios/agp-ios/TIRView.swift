import SwiftUI

struct TIRBreakdown {
  let veryLow: Int
  let low: Int
  let target: Int
  let high: Int
  let veryHigh: Int
  let total: Int

  var pVeryLow: Double { percent(veryLow) }
  var pLow: Double { percent(low) }
  var pTarget: Double { percent(target) }
  var pHigh: Double { percent(high) }
  var pVeryHigh: Double { percent(veryHigh) }

  private func percent(_ n: Int) -> Double { total == 0 ? 0 : (Double(n) / Double(total) * 100) }
}

struct TIRView: View {
  @ObservedObject var hk: HealthKitExporter
  @ObservedObject var app: AppSettings
  var showHeader: Bool = true
  var showFooter: Bool = true

  @State private var tirValue: TIRBreakdown = .init(veryLow: 0, low: 0, target: 0, high: 0, veryHigh: 0, total: 0)
  @State private var isLoading: Bool = false
  @State private var pending: Task<Void, Never>? = nil

  var body: some View {
    VStack(alignment: .leading, spacing: 16) {
      if showHeader {
        HStack {
          Text("Time in Range").font(.title3).bold()
          Spacer()
          Menu("Last \(app.periodDays) days") {
            ForEach(AppSettings.presets, id: \.self) { d in Button("Last \(d) days") { app.periodDays = d } }
          }
        }
        .padding(.horizontal)
      }

      if isLoading {
        ProgressView().frame(height: 240).padding(.horizontal)
      } else if tirValue.total == 0 {
        ContentUnavailableView("Not enough data", systemImage: "chart.bar", description: Text("Sync Health data and try again."))
      } else {
        bar
          .frame(height: 240)
          .padding(.horizontal)

        legend
          .padding(.horizontal)
      }

      Spacer(minLength: 0)
    }
    .navigationTitle(showHeader ? "TIR" : "")
    .safeAreaInset(edge: .bottom) { if showFooter { PeriodFooter(app: app) } }
    .task { await refresh() }
    .onChange(of: app.periodDays) { _ in scheduleRefresh() }
    .onChange(of: hk.cached.count) { _ in scheduleRefresh() }
  }

  // MARK: - Views
  private var bar: some View {
    GeometryReader { geo in
      let h = geo.size.height
      let vh = h * tirValue.pVeryHigh / 100
      let hi = h * tirValue.pHigh / 100
      let tr = h * tirValue.pTarget / 100
      let lo = h * tirValue.pLow / 100
      let vl = h * tirValue.pVeryLow / 100
      VStack(spacing: 0) {
        Rectangle().fill(Self.colors.veryHigh).frame(height: vh)
        Rectangle().fill(Self.colors.high).frame(height: hi)
        Rectangle().fill(Self.colors.target).frame(height: tr)
        Rectangle().fill(Self.colors.low).frame(height: lo)
        Rectangle().fill(Self.colors.veryLow).frame(height: vl)
      }
      .frame(maxWidth: 64)
      .overlay(alignment: .leading) {
        // Left axis labels at key mmol/L thresholds
        VStack {
          Text("13.9").font(.caption2).foregroundStyle(.secondary)
          Spacer()
          Text("10.0").font(.caption2).foregroundStyle(.secondary)
          Spacer()
          Text("3.9").font(.caption2).foregroundStyle(.secondary)
        }
        .frame(maxHeight: .infinity)
        .padding(.trailing, 80)
      }
    }
  }

  private var legend: some View {
    VStack(alignment: .leading, spacing: 12) {
      legendRow(title: "Very High", detail: ">13.9 mmol/L", percent: tirValue.pVeryHigh, color: Self.colors.veryHigh, goal: "Goal ≤5%")
      legendRow(title: "High", detail: "10–13.9 mmol/L", percent: tirValue.pHigh, color: Self.colors.high, goal: "Goal ≤25%")
      legendRow(title: "Target", detail: "3.9–10 mmol/L", percent: tirValue.pTarget, color: Self.colors.target, goal: "Goal ≥70%")
      legendRow(title: "Low", detail: "3–3.9 mmol/L", percent: tirValue.pLow, color: Self.colors.low, goal: "Goal ≤4%")
      legendRow(title: "Very Low", detail: "<3 mmol/L", percent: tirValue.pVeryLow, color: Self.colors.veryLow, goal: "Goal ≤1%")
    }
  }

  private func legendRow(title: String, detail: String, percent: Double, color: Color, goal: String) -> some View {
    HStack(alignment: .firstTextBaseline) {
      Circle().fill(color).frame(width: 10, height: 10)
      Text(title).bold()
      Text(detail).foregroundStyle(.secondary)
      Spacer()
      Text(String(format: "%.0f%%", percent)).bold()
      Text(goal).foregroundStyle(.secondary)
    }
    .font(.callout)
  }

  // MARK: - Data
  @MainActor private func refresh() async {
    isLoading = true
    let readings = hk.cached
    let res = await AnalyticsService.shared.tir(readings: readings, periodDays: app.periodDays)
    self.tirValue = res
    isLoading = false
  }

  private func scheduleRefresh() {
    pending?.cancel()
    pending = Task { @MainActor in
      try? await Task.sleep(nanoseconds: 250_000_000)
      await refresh()
    }
  }

  private struct colors {
    static let veryLow = Color(red: 0.85, green: 0.20, blue: 0.20)
    static let low = Color(red: 0.95, green: 0.55, blue: 0.35)
    static let target = Color(red: 0.50, green: 0.80, blue: 0.60)
    static let high = Color(red: 0.98, green: 0.76, blue: 0.40)
    static let veryHigh = Color(red: 0.96, green: 0.52, blue: 0.42)
  }
}

#Preview {
  let hk = HealthKitExporter(); hk.loadCache()
  let app = AppSettings()
  return NavigationStack { TIRView(hk: hk, app: app) }
}
