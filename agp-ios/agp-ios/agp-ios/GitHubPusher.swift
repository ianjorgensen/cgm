import Foundation
import Security

@MainActor
final class GitHubPusher: ObservableObject {
  @Published var owner: String = "ianjorgensen"
  @Published var repo: String = "cgm"
  @Published var branch: String = "main"
  @Published var path: String = "cgm-data/cgm_data.js"
  @Published var hasToken: Bool = false

  private let settingsKey = "GitHubSettings_v1"
  private let tokenService = "CGMExport.GitHubToken"

  struct Settings: Codable { let owner: String; let repo: String; let branch: String; let path: String }

  func load() {
    let ud = UserDefaults.standard
    if let data = ud.data(forKey: settingsKey),
       let s = try? JSONDecoder().decode(Settings.self, from: data) {
      owner = s.owner; repo = s.repo; branch = s.branch; path = s.path
    } else {
      // Persist the built-in defaults on first run so they stick
      save()
    }
    hasToken = tokenPresent()
  }
  func save() {
    let s = Settings(owner: owner, repo: repo, branch: branch, path: path)
    if let data = try? JSONEncoder().encode(s) { UserDefaults.standard.set(data, forKey: settingsKey) }
  }

  // MARK: - Keychain token
  func setToken(_ token: String) throws {
    clearToken()
    guard !token.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
      throw NSError(domain: "GitHub", code: -1, userInfo: [NSLocalizedDescriptionKey: "Token is empty"])
    }
    let data = token.data(using: .utf8) ?? Data()
    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: tokenService,
      kSecAttrAccount as String: "token",
      kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly,
      kSecValueData as String: data
    ]
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else {
      throw NSError(domain: NSOSStatusErrorDomain as String, code: Int(status), userInfo: [NSLocalizedDescriptionKey: "Keychain save failed (status \(status))"])
    }
    hasToken = true
  }
  func tokenPresent() -> Bool { getToken() != nil }
  func currentToken() -> String? { getToken() }
  func clearToken() {
    let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                kSecAttrService as String: tokenService]
    SecItemDelete(query as CFDictionary)
    hasToken = false
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
    func addCommonHeaders(_ req: inout URLRequest) {
      req.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
      req.setValue("application/vnd.github+json", forHTTPHeaderField: "Accept")
      req.setValue("2022-11-28", forHTTPHeaderField: "X-GitHub-Api-Version")
      req.setValue("CGMExport/1.0 (iOS)", forHTTPHeaderField: "User-Agent")
    }
    func error(_ prefix: String, status: Int?, data: Data?) -> NSError {
      var bodyStr = data.flatMap { String(data: $0, encoding: .utf8) } ?? ""
      if bodyStr.count > 1200 { bodyStr = String(bodyStr.prefix(1200)) + "…" }
      let msg = "\(prefix) — status: \(status ?? -1)\nrepo: \(owner)/\(repo)@\(branch)\npath: \(path)\nbody: \n\(bodyStr)"
      return NSError(domain: "GitHub", code: status ?? -1, userInfo: [NSLocalizedDescriptionKey: msg, "debug": msg])
    }

    // Get current file SHA (if exists)
    var currentSHA: String? = nil
    do {
      var req = URLRequest(url: contentURL)
      addCommonHeaders(&req)
      let (body, resp) = try await session.data(for: req)
      if let http = resp as? HTTPURLResponse, http.statusCode == 200 {
        if let obj = try? JSONSerialization.jsonObject(with: body) as? [String: Any] {
          currentSHA = obj["sha"] as? String
        }
      } else if let http = resp as? HTTPURLResponse, http.statusCode == 404 {
        // new file — that's fine
      } else {
        let http = resp as? HTTPURLResponse
        throw error("GET current file failed", status: http?.statusCode, data: body)
      }
    } catch {
      // If it's not a 404, rethrow with context
      throw error as NSError
    }

    // PUT new content
    struct Payload: Codable { let message: String; let content: String; let branch: String; let sha: String? }
    let b64 = data.base64EncodedString()
    let payload = Payload(message: message, content: b64, branch: branch, sha: currentSHA)
    var putReq = URLRequest(url: contentURL)
    putReq.httpMethod = "PUT"
    addCommonHeaders(&putReq)
    putReq.setValue("application/json", forHTTPHeaderField: "Content-Type")
    putReq.httpBody = try JSONEncoder().encode(payload)
    let (respBody, resp2) = try await session.data(for: putReq)
    guard let http2 = resp2 as? HTTPURLResponse, (200...201).contains(http2.statusCode) else {
      let code = (resp2 as? HTTPURLResponse)?.statusCode
      throw error("PUT new content failed", status: code, data: respBody)
    }
  }
}
