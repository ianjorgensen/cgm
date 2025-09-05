//
//  ContentView.swift
//  agp-ios
//
//  Created by Ian Jorgensen on 05/09/2025.
//

import SwiftUI

struct ContentView: View {
  @StateObject private var hk = HealthKitExporter()
  @State private var shareURL: URL?
  @State private var isSharing = false
  @State private var status = ""

  var body: some View {
    NavigationView {
      VStack(spacing: 16) {
        Button("Request Health Access") {
          Task {
            do {
              try await hk.requestAuthorization()
              status = "Authorized to read Blood Glucose"
            } catch {
              status = "Auth error: \(error.localizedDescription)"
            }
          }
        }
        .buttonStyle(.borderedProminent)

        HStack(spacing: 12) {
          exportButton(title: "Export mmol/L", units: .mmolL)
          exportButton(title: "Export mg/dL", units: .mgdL)
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
      .sheet(isPresented: $isSharing) {
        if let url = shareURL {
          ShareSheet(items: [url]) { status = "Saved/Shared cgm_data.js" }
        }
      }
    }
  }

  private func exportButton(title: String, units: HealthKitExporter.Units) -> some View {
    Button(title) {
      Task {
        status = "Exporting…"
        do {
          let res = try await hk.exportCGMJS(preferredUnits: units)
          shareURL = res.url
          status = "Exported \(res.count) points (\(res.units.rawValue)) starting \(res.t0ISO)"
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
