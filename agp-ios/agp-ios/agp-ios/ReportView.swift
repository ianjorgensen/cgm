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
        // Summary card
        Card {
          Text("Summary").font(.headline)
          ZStack {
            SummaryCard(
              stats: statsValue,
              periodLabelText: periodLabel(days: app.periodDays),
              periodRangeText: periodDateRangeString(days: app.periodDays)
            )
            .animation(.easeInOut(duration: 0.3), value: statsValue.meanMgdL)
            if isLoading { ProgressView().padding() }
          }
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
}

#Preview {
  let hk = HealthKitExporter(); hk.loadCache()
  let app = AppSettings()
  return NavigationStack { ReportView(hk: hk, app: app) }
}
