import SwiftUI

struct GitHubSettingsView: View {
  @ObservedObject var gh: GitHubPusher
  @Environment(\.dismiss) private var dismiss
  @State private var token: String = ""

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
        Section(header: Text("Token"), footer: Text("Create a fine‑grained PAT with 'Contents: Read and Write' on the repo. It is stored securely in your Keychain.")) {
          SecureField("GitHub Personal Access Token", text: $token)
          HStack {
            Button("Save Token") { gh.setToken(token); token = "" }
            Spacer()
            if gh.tokenPresent() { Text("✓ Saved").foregroundColor(.green) }
          }
        }
      }
      .navigationTitle("GitHub Settings")
      .toolbar {
        ToolbarItem(placement: .cancellationAction) { Button("Close") { gh.save(); dismiss() } }
      }
      .onAppear { gh.load() }
    }
  }
}

