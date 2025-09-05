//
//  ContentView.swift
//  agp-ios
//
//  Created by Ian Jorgensen on 05/09/2025.
//

import SwiftUI

struct ContentView: View {
  @StateObject private var hk = HealthKitExporter()
  @StateObject private var gh = GitHubPusher()
  @Environment(\.openURL) private var openURL
  @State private var shareURL: URL?
  @State private var isSharing = false
  @State private var status = ""
  // Removed local repo export flow (folder picker)
  @State private var showClearConfirm = false
  @State private var showGitHubSheet = false

  var body: some View {
    NavigationView {
      VStack(spacing: 16) {
        // Summary row
        summaryView

        // Background control + last sync
        Toggle(isOn: Binding(get: { hk.backgroundEnabled }, set: { hk.setBackgroundEnabled($0) })) {
          Text("Background Updates")
        }
        .toggleStyle(.switch)
        .frame(maxWidth: .infinity, alignment: .leading)
        HStack(spacing: 6) {
          Text("Last sync:")
          Text(formatDate(hk.lastSyncDate, dateStyle: .medium, timeStyle: .short)).bold()
        }
        .frame(maxWidth: .infinity, alignment: .leading)


        Button("Request Health Access") {
          Task {
            do {
              try await hk.requestAuthorization()
              status = "Authorized to read Blood Glucose"
              try await hk.syncLatest()
              await hk.refreshSummary()
              hk.startBackgroundDelivery()
            } catch {
              status = "Auth error: \(error.localizedDescription)"
            }
          }
        }
        .buttonStyle(.borderedProminent)

        Button("Sync Latest From Health") {
          Task {
            status = "Syncing…"
            do {
              try await hk.syncLatest()
              await hk.refreshSummary()
              status = "Synced. Readings: \(hk.totalSamples)"
            } catch {
              status = "Sync error: \(error.localizedDescription)"
            }
          }
        }
        .buttonStyle(.bordered)

        exportButton(title: "Export to File", units: .mmolL)

        Button(role: .destructive) {
          showClearConfirm = true
        } label: {
          Text("Clear Cache")
        }
        .buttonStyle(.bordered)
        .alert("Clear local cache?", isPresented: $showClearConfirm) {
          Button("Cancel", role: .cancel) {}
          Button("Clear", role: .destructive) {
            hk.clearCache()
            status = "Cache cleared"
          }
        } message: {
          Text("Removes stored readings and the last-sync marker. Background updates will refill as new data arrives.")
        }

        // Web Viewer link
        Button("Open CGM Viewer in Safari") {
          if let url = URL(string: "https://ianjorgensen.github.io/cgm/#y=2025") { openURL(url) }
        }
        .buttonStyle(.bordered)

        // GitHub section
        Divider()
        HStack(spacing: 12) {
          Button("GitHub Settings") { showGitHubSheet = true }
            .buttonStyle(.bordered)
          Button("Commit + Push to GitHub") {
            Task {
              status = "Preparing upload…"
              do {
                let res = try await hk.exportCGMJS(preferredUnits: .mmolL)
                let data = try Data(contentsOf: res.url)
                let msg = "export: update cgm_data.js (\(res.count) pts, up to \(res.t1ISO))"
                try await gh.pushFile(data: data, message: msg)
                status = "Pushed to GitHub: \(gh.owner)/\(gh.repo)@\(gh.branch)"
              } catch {
                let ns = error as NSError
                let dbg = (ns.userInfo["debug"] as? String) ?? ns.localizedDescription
                status = "GitHub push error:\n\(dbg)"
                print("GitHub push failed: \(dbg)")
              }
            }
          }
          .buttonStyle(.borderedProminent)
          .disabled(!gh.hasToken || gh.owner.isEmpty || gh.repo.isEmpty)
        }

        

        if !status.isEmpty {
          Text(status)
            .font(.footnote)
            .foregroundColor(.secondary)
            .multilineTextAlignment(.center)
            .padding(.top, 8)
        }

        Spacer()
      }
      .padding()
      .navigationTitle("CGM Export")
      .task {
        hk.loadCache()
        hk.loadSettings()
        await hk.refreshSummary()
        hk.startBackgroundDelivery()
      }
      .sheet(isPresented: $isSharing) {
        if let url = shareURL {
          ShareSheet(items: [url]) { status = "Saved/Shared cgm_data.js" }
        }
      }
      .sheet(isPresented: $showGitHubSheet) { GitHubSettingsView(gh: gh) }
    }
  }

  private var summaryView: some View {
    VStack(alignment: .leading, spacing: 4) {
      HStack {
        Text("Readings:")
        Text("\(hk.totalSamples)").bold()
      }
      HStack(spacing: 6) {
        Text("First:")
        Text(formatDate(hk.firstSampleDate, dateStyle: .medium, timeStyle: .none)).bold()
      }
      HStack(spacing: 6) {
        Text("Last:")
        Text(formatDate(hk.lastSampleDate, dateStyle: .medium, timeStyle: .short)).bold()
      }
    }
    .frame(maxWidth: .infinity, alignment: .leading)
  }

  private func formatDate(_ date: Date?, dateStyle: DateFormatter.Style, timeStyle: DateFormatter.Style) -> String {
    guard let d = date else { return "–" }
    let df = DateFormatter()
    df.dateStyle = dateStyle
    df.timeStyle = timeStyle
    return df.string(from: d)
  }

  private func exportButton(title: String, units: HealthKitExporter.Units) -> some View {
    Button(title) {
      Task {
        status = "Exporting…"
        do {
          let res = try await hk.exportCGMJS(preferredUnits: units)
          shareURL = res.url
          status = "Exported \(res.count) 5‑min points (\(res.units.rawValue))\n\(res.t0ISO) → \(res.t1ISO)"
          isSharing = true
        } catch {
          status = "Export error: \(error.localizedDescription)"
        }
      }
    }
    .buttonStyle(.bordered)
  }
}

#Preview { ContentView() }
