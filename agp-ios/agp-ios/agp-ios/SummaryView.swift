import SwiftUI

struct SummaryView: View {
  @ObservedObject var hk: HealthKitExporter
  @ObservedObject var app: AppSettings
  var showFooter: Bool = true
  @State private var statsValue: SummaryStats = .init(activePercent: 0, meanMgdL: 0, meanMmol: 0, gmi: 0, cv: 0)
  @State private var isLoading: Bool = false
  @State private var pending: Task<Void, Never>? = nil

  var body: some View {
    List {
      header

      Section {
        HStack {
          Text(labelForDays(app.periodDays)).fontWeight(.semibold)
          Spacer()
          Text(dateRangeString).fontWeight(.semibold)
        }
      }

      Section(header: Text("Target Range")) {
        HStack { Text("General"); Spacer(); Text("3.9–10 mmol/L").foregroundStyle(.secondary) }
      }

      Section {
        ZStack {
          HStack { Text("Time CGM Active"); Spacer(); Text(String(format: "%.1f%%", statsValue.activePercent)) }
            .animation(.easeInOut(duration: 0.3), value: statsValue.activePercent)
          if isLoading { HStack { Spacer(); ProgressView(); Spacer() } }
        }
      }

      Section {
        row(title: "Average Glucose", value: String(format: "%.1f mmol/L", statsValue.meanMmol), goal: "Goal: <8.6 mmol/L")
          .animation(.easeInOut(duration: 0.3), value: statsValue.meanMmol)
        row(title: "Glucose Management Indicator (GMI)", value: String(format: "%.1f%%", statsValue.gmi), goal: "Goal: <7%")
          .animation(.easeInOut(duration: 0.3), value: statsValue.gmi)
        row(title: "Glucose Variability (CV)", value: String(format: "%.1f%%", statsValue.cv), goal: "Goal: ≤36%")
          .animation(.easeInOut(duration: 0.3), value: statsValue.cv)
      }
    }
    .navigationTitle(showFooter ? "Summary" : "")
    .safeAreaInset(edge: .bottom) { if showFooter { PeriodFooter(app: app) } }
    .task { await refresh() }
    .onChange(of: app.periodDays) { _ in scheduleRefresh() }
    .onChange(of: hk.cached.count) { _ in scheduleRefresh() }
  }

  private func row(title: String, value: String, goal: String) -> some View {
    VStack(alignment: .leading, spacing: 4) {
      HStack { Text(title).bold(); Spacer(); Text(value) }
      Text(goal).font(.footnote).foregroundStyle(.secondary)
    }
  }

  // MARK: - Header
  private var header: some View {
    HStack(alignment: .firstTextBaseline) {
      Menu("\(labelForDays(app.periodDays))") {
        ForEach(AppSettings.presets, id: \.self) { d in Button(labelForDays(d)) { app.periodDays = d } }
      }
      Spacer()
      Text(dateRangeString).fontWeight(.semibold)
    }
  }

  private func labelForDays(_ d: Int) -> String { periodLabel(days: d) }

  private var dateRangeString: String {
    periodDateRangeString(days: app.periodDays)
  }

  // MARK: - Stats
  private var stats: SummaryStats { computeSummaryStats(hk: hk, days: app.periodDays) }

  @MainActor private func refresh() async {
    isLoading = true
    let readings = hk.cached
    let res = await AnalyticsService.shared.summary(readings: readings, periodDays: app.periodDays)
    self.statsValue = res
    isLoading = false
  }

  private func scheduleRefresh() {
    pending?.cancel()
    pending = Task { @MainActor in
      try? await Task.sleep(nanoseconds: 250_000_000)
      await refresh()
    }
  }
}

#Preview {
  let hk = HealthKitExporter(); hk.loadCache()
  let app = AppSettings()
  return NavigationStack { SummaryView(hk: hk, app: app) }
}
