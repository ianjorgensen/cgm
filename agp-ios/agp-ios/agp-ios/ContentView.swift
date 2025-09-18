//
//  ContentView.swift
//  agp-ios
//
//  Created by Ian Jorgensen on 05/09/2025.
//

import SwiftUI
import UIKit

struct ContentView: View {
  @ObservedObject var hk: HealthKitExporter
  @StateObject private var gh = GitHubPusher()
  @StateObject private var app = AppSettings()
  @StateObject private var web = LocalWebServer(baseURL: FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!.appendingPathComponent("serve", isDirectory: true))
  @Environment(\.openURL) private var openURL
  @State private var shareURL: URL?
  @State private var isSharing = false
  @State private var status = "" // legacy; no floating toast
  @State private var showClearConfirm = false
  // no modal; navigate via NavigationLink
  // transient inline messages per section
  @State private var healthMessage: String? = nil
  @State private var exportMessage: String? = nil
  @State private var serverMessage: String? = nil
  @State private var serverEnabled: Bool = UserDefaults.standard.bool(forKey: "ServerEnabled_v1")
  @State private var ghLoaded = false

  var body: some View {
    NavigationStack {
      Form {
        Section(header: Text("Server"), footer: serverFooter) {
          VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 8) {
              Image(systemName: "antenna.radiowaves.left.and.right")
                .foregroundStyle(Color(red: 0.10, green: 0.60, blue: 0.31))
              let p = web.port ?? 0
              let showPort = p != 0 && p != 80
              let urlText = web.ipAddress.isEmpty ? "Starting…" : "http://\(web.ipAddress)\(showPort ? ":\(p)" : "")/"
              Text(urlText)
                .font(.system(.footnote, design: .monospaced))
                .foregroundStyle(.secondary)
                .textSelection(.enabled)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
                .allowsTightening(true)
              Spacer(minLength: 8)
              if !web.ipAddress.isEmpty {
                Button { copyServerURL() } label: { Image(systemName: "doc.on.doc") }
                  .buttonStyle(.borderless)
                  .accessibilityLabel("Copy URL")
              }
            }
            if !web.stateText.isEmpty {
              Text(web.stateText)
                .font(.caption)
                .foregroundStyle(.secondary)
            }
          }
          Toggle(isOn: Binding(get: { serverEnabled }, set: { setServerEnabled($0) })) {
            Label(serverEnabled ? "Server Enabled" : "Server Disabled", systemImage: serverEnabled ? "chevron.left.slash.chevron.right" : "bolt.horizontal.circle")
          }
          .contentShape(Rectangle())
          .onTapGesture {
            let p = web.port ?? 80
            guard !web.ipAddress.isEmpty else { return }
            let urlStr = "http://\(web.ipAddress)\(p == 80 ? "" : ":\(p)")/"
            if let url = URL(string: urlStr) { openURL(url) }
          }
          .onLongPressGesture { if !web.ipAddress.isEmpty { copyServerURL() } }
        }
        Section(header: Text("Status")) {
          HStack { Label("Readings", systemImage: "dot.radiowaves.left.and.right"); Spacer(); Text("\(hk.totalSamples)").foregroundStyle(.secondary) }
          HStack { Label("First", systemImage: "calendar"); Spacer(); Text(formatDate(hk.firstSampleDate, dateStyle: .medium, timeStyle: .none)).foregroundStyle(.secondary) }
          HStack { Label("Last", systemImage: "clock"); Spacer(); Text(formatDate(hk.lastSampleDate, dateStyle: .medium, timeStyle: .short)).foregroundStyle(.secondary) }
          HStack { Label("Last Sync", systemImage: "arrow.triangle.2.circlepath"); Spacer(); Text(formatDate(hk.lastSyncDate, dateStyle: .medium, timeStyle: .short)).foregroundStyle(.secondary) }
        }

        Section(header: Text("Health"), footer: healthFooter) {
          Toggle(isOn: Binding(get: { hk.backgroundEnabled }, set: { hk.setBackgroundEnabled($0) })) { Label("Background Updates", systemImage: "leaf") }
          Button { requestAccess() } label: { Label("Request Health Access", systemImage: "heart.fill") }
            .buttonStyle(.plain)
            .foregroundStyle(Color(red: 0.10, green: 0.60, blue: 0.31))
            .tint(Color(red: 0.10, green: 0.60, blue: 0.31))
          Button { syncLatest() } label: { Label("Sync Latest From Health", systemImage: "arrow.clockwise") }
            .buttonStyle(.plain)
            .foregroundStyle(Color(red: 0.10, green: 0.60, blue: 0.31))
            .tint(Color(red: 0.10, green: 0.60, blue: 0.31))
        }

        Section(header: Text("Target Range")) {
          Picker("Profile", selection: $app.targetProfile) {
            ForEach(AppSettings.TargetProfile.allCases) { p in
              Text(p.title).tag(p)
            }
          }
          .pickerStyle(.segmented)
          let rangeStr = String(format: "%.1f - %.1f mmol/l", app.targetProfile.lowerMmol, app.targetProfile.upperMmol)
          HStack {
            Text("Goal 50%")
            Spacer()
            Text(rangeStr).foregroundStyle(.secondary)
          }
        }

        Section(header: Text("Units")) {
          Picker("Display Units", selection: $app.displayUnits) {
            ForEach(AppSettings.DisplayUnits.allCases) { u in Text(u.title).tag(u) }
          }
          .pickerStyle(.segmented)
        }

        Section(header: Text("Export"), footer: exportFooter) {
          Button { exportAction() } label: { Label("Export to File", systemImage: "square.and.arrow.up") }
            .buttonStyle(.plain)
            .foregroundStyle(Color(red: 0.10, green: 0.60, blue: 0.31))
            .tint(Color(red: 0.10, green: 0.60, blue: 0.31))
          Button { pushToGitHub() } label: { Label("Commit + Push to GitHub", systemImage: "arrow.up.doc.fill") }
            .buttonStyle(.plain)
            .foregroundStyle(Color(red: 0.10, green: 0.60, blue: 0.31))
            .tint(Color(red: 0.10, green: 0.60, blue: 0.31))
            .disabled(!gh.hasToken || gh.owner.isEmpty || gh.repo.isEmpty)
          NavigationLink(destination: GitHubSettingsView(gh: gh)) {
            Label("GitHub Settings", systemImage: "key.fill")
          }
          .onAppear { if !ghLoaded { gh.load(); ghLoaded = true } }
        }

        Section(header: Text("Visualize")) {
          NavigationLink(destination: AGPView(hk: hk, app: app)) {
            Label("Ambulatory Glucose Profile", systemImage: "waveform.path.ecg")
          }
          NavigationLink(destination: TIRView(hk: hk, app: app)) {
            Label("Time in Range", systemImage: "chart.bar.fill")
          }
          NavigationLink(destination: SummaryView(hk: hk, app: app)) {
            Label("Summary", systemImage: "list.bullet.rectangle")
          }
          NavigationLink(destination: RecentDaysView(hk: hk, app: app)) {
            Label("Recent Days", systemImage: "calendar")
          }
          NavigationLink(destination: ReportView(hk: hk, app: app)) {
            Label("Report", systemImage: "doc.text.magnifyingglass")
          }
        }

        Section(header: Text("Maintenance")) {
          Button(role: .destructive) { showClearConfirm = true } label: { Label("Clear Cache", systemImage: "trash") }
        }

        Section {
          Button { if let url = URL(string: "https://ianjorgensen.github.io/cgm/#y=2025") { openURL(url) } } label: { Label("Open CGM Viewer in Safari", systemImage: "safari") }
        }

      }
      .navigationTitle("Settings")
      .tint(Color(red: 0.10, green: 0.60, blue: 0.31))
      .task { if serverEnabled { prepareServeFolderIfNeeded(); web.start(preferredPort: 8080) } }
      .sheet(isPresented: $isSharing) { if let url = shareURL { ShareSheet(items: [url]) { present("Saved/Shared cgm_data.js", section: .export) } } }
      // navigation destination used instead of modal sheet for GitHub settings
      .alert("Clear local cache?", isPresented: $showClearConfirm) {
        Button("Cancel", role: .cancel) {}
        Button("Clear", role: .destructive) { hk.clearCache(); status = "Cache cleared" }
      } message: { Text("Removes stored readings and the last-sync marker. Background updates will refill as new data arrives.") }
    }
  }

  private func requestAccess() {
    present("Requesting Health access…", section: .health)
    Task {
      do {
        try await hk.requestAuthorization()
        present("Authorized to read Blood Glucose", section: .health)
        try await hk.syncLatest()
        await hk.refreshSummary()
        hk.startBackgroundDelivery()
      } catch { present("Auth error: \(error.localizedDescription)", section: .health) }
    }
  }

  private func syncLatest() {
    present("Syncing…", section: .health)
    Task {
      do { try await hk.syncLatest(); await hk.refreshSummary(); status = "Synced. Readings: \(hk.totalSamples)" }
      catch { present("Sync error: \(error.localizedDescription)", section: .health) }
    }
  }

  private func exportAction() {
    present("Exporting…", section: .export)
    Task { do { let res = try await hk.exportCGMJS(preferredUnits: .mmolL); shareURL = res.url; present("Exported \(res.count) points", section: .export); isSharing = true } catch { present("Export error: \(error.localizedDescription)", section: .export) } }
  }

  private func pushToGitHub() {
    present("Preparing upload…", section: .export)
    Task {
      do {
        let useJSON = gh.path.lowercased().hasSuffix(".json")
        let res = try await (useJSON ? hk.exportCGMJSON(preferredUnits: .mmolL) : hk.exportCGMJS(preferredUnits: .mmolL))
        let data = try Data(contentsOf: res.url)
        let msg = useJSON
          ? "export: update cgm_data.json (\(res.count) pts, up to \(res.t1ISO))"
          : "export: update cgm_data.js (\(res.count) pts, up to \(res.t1ISO))"
        try await gh.pushFile(data: data, message: msg)
        present("Pushed to GitHub", section: .export)
      } catch {
        let ns = error as NSError
        let dbg = (ns.userInfo["debug"] as? String) ?? ns.localizedDescription
        present("GitHub push error: \(dbg)", section: .export)
      }
    }
  }

  private func formatDate(_ date: Date?, dateStyle: DateFormatter.Style, timeStyle: DateFormatter.Style) -> String {
    guard let d = date else { return "–" }
    let df = DateFormatter(); df.dateStyle = dateStyle; df.timeStyle = timeStyle; return df.string(from: d)
  }
}

private enum MessageSection { case health, export }

extension ContentView {
  private func present(_ text: String, section: MessageSection? = nil, duration: TimeInterval = 2.5) {
    // inline section message only
    switch section {
    case .health: healthMessage = text
      DispatchQueue.main.asyncAfter(deadline: .now() + duration) { healthMessage = nil }
    case .export: exportMessage = text
      DispatchQueue.main.asyncAfter(deadline: .now() + duration) { exportMessage = nil }
    case .none: break
    }
  }

  private func copyServerURL() {
    let p = web.port ?? 80
    guard !web.ipAddress.isEmpty else { return }
    let urlStr = "http://\(web.ipAddress)\(p == 80 ? "" : ":\(p)")/"
    UIPasteboard.general.string = urlStr
    serverMessage = "Copied: \(urlStr)"
    DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) { serverMessage = nil }
  }
  private func setServerEnabled(_ on: Bool) {
    serverEnabled = on
    UserDefaults.standard.set(on, forKey: "ServerEnabled_v1")
    if on {
      prepareServeFolderIfNeeded()
      web.start(preferredPort: 8080)
    } else { web.stop() }
  }
  private func prepareServeFolderIfNeeded() {
    let fm = FileManager.default
    let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
    let docServe = docs.appendingPathComponent("serve", isDirectory: true)
    if !fm.fileExists(atPath: docServe.path) {
      try? fm.createDirectory(at: docServe, withIntermediateDirectories: true)
      if let bundleBase = Bundle.main.resourceURL?.appendingPathComponent("serve", isDirectory: true),
         fm.fileExists(atPath: bundleBase.path) {
        if let items = try? fm.contentsOfDirectory(atPath: bundleBase.path) {
          for name in items {
            let src = bundleBase.appendingPathComponent(name)
            let dst = docServe.appendingPathComponent(name)
            _ = try? fm.removeItem(at: dst)
            _ = try? fm.copyItem(at: src, to: dst)
          }
        }
      }
    }
    let indexURL = docServe.appendingPathComponent("index.html")
    if !fm.fileExists(atPath: indexURL.path) {
      let html = """
      <!doctype html>
      <meta charset=\"utf-8\" />
      <title>Local Server</title>
      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
      <style>body{font:14px -apple-system, system-ui, sans-serif; padding:16px;} code{background:#f5f5f5; padding:2px 4px; border-radius:4px;}</style>
      <h1>It works</h1>
      <p>This page is served from <code>Documents/serve/index.html</code> inside the app.</p>
      <p>Replace it by placing your own <code>index.html</code> and assets under <code>Documents/serve/</code> via the Files app.</p>
      """
      try? html.write(to: indexURL, atomically: true, encoding: .utf8)
    }
  }
}

#Preview { ContentView(hk: HealthKitExporter()) }


// Footers for section messages (only render when non-nil)
extension ContentView {
  @ViewBuilder private var healthFooter: some View {
    if let m = healthMessage { Text(m).font(.footnote).foregroundStyle(.secondary) }
  }
  @ViewBuilder private var exportFooter: some View {
    if let m = exportMessage { Text(m).font(.footnote).foregroundStyle(.secondary) }
  }
  @ViewBuilder private var serverFooter: some View {
    if let m = serverMessage { Text(m).font(.footnote).foregroundStyle(.secondary) }
  }
}
