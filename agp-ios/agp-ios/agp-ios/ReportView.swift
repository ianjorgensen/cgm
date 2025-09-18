import SwiftUI

struct ReportView: View {
  @ObservedObject var hk: HealthKitExporter
  @ObservedObject var app: AppSettings
  var onSettings: (() -> Void)? = nil

  @State private var statsValue: SummaryStats = .init(activePercent: 0, meanMgdL: 0, meanMmol: 0, gmi: 0, cv: 0)
  @State private var isLoading: Bool = false
  @State private var pending: Task<Void, Never>? = nil

  var body: some View {
    ScrollView {
      VStack(alignment: .leading, spacing: 24) {
        // Plain summary (no card): 3 rows, same font and weight
        VStack(alignment: .leading, spacing: 6) {
          HStack { Text(periodLabel(days: app.periodDays)); Spacer(); Text(periodDateRangeString(days: app.periodDays)) }
        }
        .font(.subheadline)
        .padding(.horizontal)
        .padding(.top, 8)
        .animation(.easeInOut(duration: 0.3), value: statsValue.activePercent)

        // Glucose metrics card (second 3 rows) — smaller text
        Card {
          Text("Glucose Metrics").font(.headline)
          VStack(alignment: .leading, spacing: 10) {
            // Average glucose (units-aware)
            if app.displayUnits == .mmolL {
              metricsRow(title: "Average Glucose", value: String(format: "%.1f mmol/L", statsValue.meanMmol), goal: "Goal: <8.6 mmol/L")
            } else {
              metricsRow(title: "Average Glucose", value: "\(Int(round(statsValue.meanMgdL))) mg/dL", goal: "Goal: <155 mg/dL")
            }
            Divider()
            metricsRow(title: "Glucose Management Indicator", value: String(format: "%.1f%%", statsValue.gmi), goal: "Goal: <7%")
            Divider()
            metricsRow(title: "Glucose Variability", value: String(format: "%.1f%%", statsValue.cv), goal: "Goal: ≤36%")
          }
          .padding(.top, 2)
          .font(.subheadline)
        }

        // TIR
        Card {
          Text("Time in Range").font(.headline)
          TIRView(hk: hk, app: app, showHeader: false, showFooter: false)
            .padding(.top, 4)
        }

        // AGP
        Card {
          Text("Ambulatory Glucose Profile").font(.headline)
          AGPView(hk: hk, app: app, showFooter: false)
            .padding(.top, 4)
        }

        // One-week overview card
        Card {
          WeekCGMCard(hk: hk, app: app)
        }

        // Recent Days
        Card {
          Text("Glucose Trending").font(.headline)
          RecentDaysView(hk: hk, app: app, showFooter: false, showHeader: false)
            .padding(.top, 4)
        }
      }
    }
    .navigationTitle("Report")
    .task { await refreshSummary() }
    .onChange(of: app.periodDays) { _ in scheduleRefresh() }
    .onChange(of: hk.cached.count) { _ in scheduleRefresh() }
  }

  @MainActor private func refreshSummary() async {
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
      await refreshSummary()
    }
  }

  // Shared metrics row used in the metrics card
  @ViewBuilder private func metricsRow(title: String, value: String, goal: String) -> some View {
    VStack(alignment: .leading, spacing: 4) {
      HStack { Text(title).fontWeight(.semibold); Spacer(); Text(value) }
      Text(goal).font(.footnote).foregroundStyle(.secondary)
    }
  }
}

#Preview {
  let hk = HealthKitExporter(); hk.loadCache()
  let app = AppSettings()
  return NavigationStack { ReportView(hk: hk, app: app) }
}
