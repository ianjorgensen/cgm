import SwiftUI

struct HomeView: View {
  @StateObject private var app = AppSettings()
  @StateObject private var hk = HealthKitExporter()
  @State private var showSettings = false
  @State private var isBooting = true

  var body: some View {
    NavigationStack {
      ZStack(alignment: .bottom) {
        Group {
          if showSettings { ContentView(hk: hk) } else { ReportView(hk: hk, app: app) }
        }
        if !showSettings && !isBooting {
          FloatingControls(app: app) { withAnimation(.easeInOut) { showSettings.toggle() } }
        }
        if isBooting { SplashView().transition(.opacity) }
      }
      .navigationBarTitleDisplayMode(.inline)
      .toolbar { if showSettings { ToolbarItem(placement: .navigationBarLeading) { Button("Done") { withAnimation(.easeInOut) { showSettings = false } } } } }
      .task {
        // Initialize shared services once at app start
        hk.loadCache(); hk.loadSettings(); await hk.refreshSummary(); hk.startBackgroundDelivery()
        // Prefetch analytics for default period (2W) so first paint is fast
        _ = await AnalyticsService.shared.summary(readings: hk.cached, periodDays: app.periodDays)
        _ = await AnalyticsService.shared.agpPoints(readings: hk.cached, periodDays: app.periodDays)
        _ = await AnalyticsService.shared.tir(readings: hk.cached, periodDays: app.periodDays)
        withAnimation(.easeInOut) { isBooting = false }
      }
    }
  }
}

#Preview { HomeView() }
