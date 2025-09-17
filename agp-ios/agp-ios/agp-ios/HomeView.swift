import SwiftUI

struct HomeView: View {
  @StateObject private var app = AppSettings()
  @StateObject private var hk = HealthKitExporter()
  @State private var showSettings = false

  var body: some View {
    NavigationStack {
      ZStack(alignment: .bottom) {
        Group {
          if showSettings { ContentView(hk: hk) } else { ReportView(hk: hk, app: app) }
        }
        if !showSettings {
          FloatingControls(app: app) { withAnimation(.easeInOut) { showSettings.toggle() } }
        }
      }
      .navigationBarTitleDisplayMode(.inline)
      .toolbar { if showSettings { ToolbarItem(placement: .navigationBarLeading) { Button("Done") { withAnimation(.easeInOut) { showSettings = false } } } } }
      .task {
        // Initialize shared services once at app start
        hk.loadCache(); hk.loadSettings(); await hk.refreshSummary(); hk.startBackgroundDelivery()
      }
    }
  }
}

#Preview { HomeView() }
