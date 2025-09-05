import SwiftUI
import UIKit

struct GitHubSettingsView: View {
  @ObservedObject var gh: GitHubPusher
  @Environment(\.dismiss) private var dismiss
  @State private var token: String = ""
  @State private var showSavedToken = false
  @State private var saveError: String? = nil

  var body: some View {
    NavigationView {
      Form {
        Section(header: Text("Repository")) {
          TextField("Owner (user or org)", text: $gh.owner)
          TextField("Repo name", text: $gh.repo)
          TextField("Branch", text: $gh.branch)
          TextField("Path", text: $gh.path)
            .textInputAutocapitalization(.never)
            .autocorrectionDisabled()
        }
        Section(header: Text("Token"), footer: Text("Create a fine‑grained PAT with 'Contents: Read and Write' for ianjorgensen/cgm. The token is stored in your device Keychain (never in the repo).")) {
          SecureField("GitHub Personal Access Token", text: $token)
          Button("Paste from Clipboard") {
            if let s = UIPasteboard.general.string { token = s.trimmingCharacters(in: .whitespacesAndNewlines) }
          }
          Button("Save Token") {
            do {
              try gh.setToken(token)
              saveError = nil
            } catch {
              saveError = error.localizedDescription
            }
          }
          Button("Clear Token", role: .destructive) {
            gh.clearToken(); showSavedToken = false
          }
          Toggle(isOn: $showSavedToken) { Text("Show Saved Token") }
          if gh.hasToken { Text("✓ Saved").foregroundColor(.green) } else { Text("No token").foregroundColor(.secondary) }
          if let err = saveError { Text(err).foregroundColor(.red).font(.footnote) }
          if showSavedToken {
            let saved = gh.currentToken() ?? ""
            ScrollView(.horizontal) {
              Text(saved.isEmpty ? "(no token saved)" : saved)
                .font(.system(.footnote, design: .monospaced))
                .textSelection(.enabled)
            }
          }
        }
      }
      .navigationTitle("GitHub Settings")
      .toolbar {
        ToolbarItem(placement: .cancellationAction) { Button("Close") { gh.save(); dismiss() } }
      }
      .onAppear {
        gh.load()
        token = gh.currentToken() ?? ""
      }
    }
  }
}
