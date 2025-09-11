import SwiftUI
import UIKit

struct GitHubSettingsView: View {
  @ObservedObject var gh: GitHubPusher
  // @Environment(\.dismiss) private var dismiss
  @State private var token: String = ""
  @State private var showSavedToken = false
  @State private var saveError: String? = nil

  var body: some View {
    NavigationStack {
      Form {
        Section(header: Text("Repository")) {
          HStack { Text("Owner"); Spacer(); TextField("user or org", text: $gh.owner).multilineTextAlignment(.trailing) }
          HStack { Text("Repo"); Spacer(); TextField("name", text: $gh.repo).multilineTextAlignment(.trailing) }
          HStack { Text("Branch"); Spacer(); TextField("main", text: $gh.branch).multilineTextAlignment(.trailing) }
          HStack { Text("Path"); Spacer(); TextField("cgm-data/cgm_data.js", text: $gh.path).textInputAutocapitalization(.never).autocorrectionDisabled().multilineTextAlignment(.trailing) }
          if !gh.owner.isEmpty && !gh.repo.isEmpty {
            HStack { Text("Summary"); Spacer(); Text("\(gh.owner)/\(gh.repo)@\(gh.branch)").foregroundStyle(.secondary) }
          }
        }
        Section(header: Text("Token"), footer: Text("Fine‑grained token with Contents: Read/Write for the repo. Stored in your Keychain.")) {
          SecureField("Personal Access Token", text: $token)
          Button { if let s = UIPasteboard.general.string { token = s.trimmingCharacters(in: .whitespacesAndNewlines) } } label: { Label("Paste from Clipboard", systemImage: "doc.on.clipboard") }
          Button {
            do { try gh.setToken(token); saveError = nil }
            catch { saveError = error.localizedDescription }
          } label: { Label("Save Token", systemImage: "key.fill") }
          Button(role: .destructive) { gh.clearToken(); showSavedToken = false } label: { Label("Clear Token", systemImage: "trash") }
          Toggle("Show Saved Token", isOn: $showSavedToken)
          if gh.hasToken { Text("✓ Saved").foregroundColor(.green) } else { Text("No token").foregroundColor(.secondary) }
          if let err = saveError { Text(err).foregroundColor(.red).font(.footnote) }
          if showSavedToken {
            ScrollView(.horizontal) {
              Text((gh.currentToken() ?? "").isEmpty ? "(no token saved)" : (gh.currentToken() ?? ""))
                .font(.system(.footnote, design: .monospaced))
                .textSelection(.enabled)
            }
          }
        }
      }
      .navigationTitle("GitHub Settings")
      .tint(Color(red: 0.10, green: 0.60, blue: 0.31))
      .onDisappear { gh.save() }
      .onAppear { gh.load(); token = gh.currentToken() ?? "" }
    }
  }
}
