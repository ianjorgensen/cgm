import Foundation
import Security

@MainActor
final class GitHubPusher: ObservableObject {
  @Published var owner: String = "ianjorgensen"
  @Published var repo: String = "cgm"
  @Published var branch: String = "main"
  @Published var path: String = "cgm-data/cgm_data.js"

  private let settingsKey = "GitHubSettings_v1"
  private let tokenService = "CGMExport.GitHubToken"

  struct Settings: Codable { let owner: String; let repo: String; let branch: String; let path: String }

  func load() {
    if let data = UserDefaults.standard.data(forKey: settingsKey),
       let s = try? JSONDecoder().decode(Settings.self, from: data) {
      owner = s.owner; repo = s.repo; branch = s.branch; path = s.path
    }
  }
  func save() {
    let s = Settings(owner: owner, repo: repo, branch: branch, path: path)
    if let data = try? JSONEncoder().encode(s) { UserDefaults.standard.set(data, forKey: settingsKey) }
  }

  // MARK: - Keychain token
  func setToken(_ token: String) {
    clearToken()
    let data = token.data(using: .utf8) ?? Data()
    let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                kSecAttrService as String: tokenService,
                                kSecValueData as String: data]
    SecItemAdd(query as CFDictionary, nil)
  }
  func tokenPresent() -> Bool { getToken() != nil }
  func clearToken() {
    let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                kSecAttrService as String: tokenService]
    SecItemDelete(query as CFDictionary)
  }
  private func getToken() -> String? {
    let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                kSecAttrService as String: tokenService,
                                kSecReturnData as String: kCFBooleanTrue!,
                                kSecMatchLimit as String: kSecMatchLimitOne]
    var item: CFTypeRef?
    let status = SecItemCopyMatching(query as CFDictionary, &item)
    guard status == errSecSuccess, let data = item as? Data, let s = String(data: data, encoding: .utf8) else { return nil }
    return s
  }

  // MARK: - Push via GitHub Contents API
  func pushFile(data: Data, message: String) async throws {
    guard !owner.isEmpty, !repo.isEmpty, !branch.isEmpty, !path.isEmpty else {
      throw NSError(domain: "GitHub", code: 0, userInfo: [NSLocalizedDescriptionKey: "Missing owner/repo/branch/path in GitHub settings."])
    }
    guard let token = getToken(), !token.isEmpty else {
      throw NSError(domain: "GitHub", code: 1, userInfo: [NSLocalizedDescriptionKey: "No GitHub token set."])
    }

    let session = URLSession(configuration: .ephemeral)
    let base = URL(string: "https://api.github.com")!
    let contentURL = base.appendingPathComponent("repos/\(owner)/\(repo)/contents/\(path)")

    // Get current file SHA (if exists)
    var currentSHA: String? = nil
    do {
      var req = URLRequest(url: contentURL)
      req.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
      req.setValue("application/vnd.github+json", forHTTPHeaderField: "Accept")
      req.setValue("2022-11-28", forHTTPHeaderField: "X-GitHub-Api-Version")
      let (body, resp) = try await session.data(for: req)
      if let http = resp as? HTTPURLResponse, http.statusCode == 200 {
        if let obj = try? JSONSerialization.jsonObject(with: body) as? [String: Any] {
          currentSHA = obj["sha"] as? String
        }
      }
    } catch { /* ignore: treat as new file */ }

    // PUT new content
    struct Payload: Codable { let message: String; let content: String; let branch: String; let sha: String? }
    let b64 = data.base64EncodedString()
    let payload = Payload(message: message, content: b64, branch: branch, sha: currentSHA)
    var putReq = URLRequest(url: contentURL)
    putReq.httpMethod = "PUT"
    putReq.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
    putReq.setValue("application/vnd.github+json", forHTTPHeaderField: "Accept")
    putReq.setValue("2022-11-28", forHTTPHeaderField: "X-GitHub-Api-Version")
    putReq.setValue("application/json", forHTTPHeaderField: "Content-Type")
    putReq.httpBody = try JSONEncoder().encode(payload)
    let (_, resp2) = try await session.data(for: putReq)
    guard let http2 = resp2 as? HTTPURLResponse, (200...201).contains(http2.statusCode) else {
      throw NSError(domain: "GitHub", code: 2, userInfo: [NSLocalizedDescriptionKey: "GitHub push failed (check token scopes, repo path, and branch)."])
    }
  }
}
