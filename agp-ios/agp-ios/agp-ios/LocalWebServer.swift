import Foundation
import Network
import SwiftUI
import Darwin

final class LocalWebServer: ObservableObject {
  @Published var port: UInt16? = nil
  @Published var ipAddress: String = ""
  @Published var isRunning: Bool = false
  @Published var stateText: String = "idle"

  private var listener: NWListener?
  private var baseURL: URL

  init(baseURL: URL) {
    self.baseURL = baseURL
  }

  private func displayBaseName() -> String {
    let path = baseURL.path
    if path.contains("/Documents/") {
      return "Documents/\(baseURL.lastPathComponent)"
    }
    return "App Bundle/\(baseURL.lastPathComponent)"
  }

  func start(preferredPort: UInt16 = 8080) {
    guard !isRunning else { return }
    do {
      DispatchQueue.main.async { self.stateText = "starting…" }
      let params = NWParameters.tcp
      params.allowLocalEndpointReuse = true
      // Try preferred port first; fall back to an ephemeral port if it fails
      if let l = try? NWListener(using: params, on: NWEndpoint.Port(rawValue: preferredPort)!) {
        listener = l
      } else {
        listener = try NWListener(using: params)
      }
      guard let listener = listener else { return }

      listener.newConnectionHandler = { [weak self] conn in
        self?.handle(connection: conn)
      }
      listener.stateUpdateHandler = { [weak self] state in
        switch state {
        case .setup:
          DispatchQueue.main.async { self?.stateText = "setup" }
        case .waiting(let err):
          DispatchQueue.main.async { self?.stateText = "waiting: \(err.localizedDescription)" }
        case .ready:
          DispatchQueue.main.async {
            self?.isRunning = true
            if let p = listener.port { self?.port = p.rawValue }
            self?.ipAddress = LocalWebServer.getWiFiAddress() ?? "127.0.0.1"
            let base = self?.displayBaseName() ?? "serve"
            self?.stateText = "ready — serving from \(base)"
          }
        case .failed(let err):
          DispatchQueue.main.async {
            self?.isRunning = false
            self?.stateText = "failed: \(err.localizedDescription)"
          }
        case .cancelled:
          DispatchQueue.main.async {
            self?.isRunning = false
            self?.stateText = "cancelled"
          }
        default:
          break
        }
      }
      listener.start(queue: .global(qos: .utility))
    } catch {
      print("WebServer start error:", error)
    }
  }

  func stop() {
    listener?.cancel()
    listener = nil
    isRunning = false
    stateText = "stopped"
  }

  private func handle(connection: NWConnection) {
    connection.start(queue: .global(qos: .utility))
    receiveRequest(on: connection) { [weak self] req in
      guard let self = self else { connection.cancel(); return }
      let response = self.buildResponse(for: req)
      connection.send(content: response, completion: .contentProcessed { _ in
        connection.cancel()
      })
    }
  }

  private struct HTTPRequest {
    var method: String
    var path: String
  }

  private func receiveRequest(on conn: NWConnection, completion: @escaping (HTTPRequest) -> Void) {
    var buffer = Data()
    func receiveMore() {
      conn.receive(minimumIncompleteLength: 1, maximumLength: 16 * 1024) { data, _, isComplete, error in
        if let d = data { buffer.append(d) }
        if error != nil || isComplete { /* fall through to parse whatever we have */ }
        // Look for end of headers (CRLFCRLF)
        if let range = buffer.range(of: Data("\r\n\r\n".utf8)) {
          let head = buffer[..<range.lowerBound]
          // Parse request line
          if let line = String(data: head, encoding: .utf8)?.components(separatedBy: "\r\n").first {
            let parts = line.split(separator: " ")
            if parts.count >= 2 {
              let method = String(parts[0])
              var path = String(parts[1])
              if let q = path.firstIndex(of: "?") { path = String(path[..<q]) }
              completion(HTTPRequest(method: method, path: path))
              return
            }
          }
          // Fallback bad request
          completion(HTTPRequest(method: "GET", path: "/"))
        } else {
          receiveMore()
        }
      }
    }
    receiveMore()
  }

  private func buildResponse(for req: HTTPRequest) -> Data {
    guard req.method == "GET" || req.method == "HEAD" else {
      return http(status: 405, headers: ["Content-Type": "text/plain"], body: Data("Method Not Allowed".utf8))
    }
    // Validate base directory
    var isBaseDir: ObjCBool = false
    let baseExists = FileManager.default.fileExists(atPath: baseURL.path, isDirectory: &isBaseDir) && isBaseDir.boolValue
    let rel = sanitize(path: req.path)
    if !baseExists {
      let msg = "<h1>Server Running</h1><p>No content folder found at:<br><code>\(baseURL.path)</code></p><p>Create a <code>serve/</code> folder in the app’s Files (Documents) and put an <code>index.html</code> there.</p>"
      return http(status: 200, headers: ["Content-Type": "text/html; charset=utf-8"], body: Data(msg.utf8))
    }
    if rel.isEmpty {
      let fileURL = baseURL.appendingPathComponent("index.html")
      if let data = try? Data(contentsOf: fileURL) {
        let headers = [
          "Content-Type": mimeType(for: fileURL.pathExtension.lowercased()),
          "Content-Length": String(data.count),
          "Connection": "close",
          "Access-Control-Allow-Origin": "*"
        ]
        return req.method == "HEAD" ? http(status: 200, headers: headers, body: Data()) : http(status: 200, headers: headers, body: data)
      }
      let msg = "<h1>Not Found</h1><p>Missing <code>index.html</code> in <code>\(baseURL.path)</code>.</p>"
      return http(status: 404, headers: ["Content-Type": "text/html; charset=utf-8"], body: Data(msg.utf8))
    }
    let candidate = baseURL.appendingPathComponent(rel)
    let fileURL: URL
    var isDir: ObjCBool = false
    if FileManager.default.fileExists(atPath: candidate.path, isDirectory: &isDir) {
      if isDir.boolValue {
        fileURL = candidate.appendingPathComponent("index.html")
      } else {
        fileURL = candidate
      }
    } else {
      return http(status: 404, headers: ["Content-Type": "text/plain"], body: Data("Not Found".utf8))
    }

    guard let data = try? Data(contentsOf: fileURL) else {
      return http(status: 404, headers: ["Content-Type": "text/plain"], body: Data("Not Found".utf8))
    }
    let mime = mimeType(for: fileURL.pathExtension.lowercased())
    let headers = [
      "Content-Type": mime,
      "Content-Length": String(data.count),
      "Connection": "close",
      "Access-Control-Allow-Origin": "*"
    ]
    if req.method == "HEAD" {
      return http(status: 200, headers: headers, body: Data())
    } else {
      return http(status: 200, headers: headers, body: data)
    }
  }

  private func http(status: Int, headers: [String:String], body: Data) -> Data {
    var head = "HTTP/1.1 \(status) \(statusText(status))\r\n"
    for (k,v) in headers { head += "\(k): \(v)\r\n" }
    head += "\r\n"
    var bytes = Data(head.utf8)
    bytes.append(body)
    return bytes
  }

  private func statusText(_ code: Int) -> String {
    switch code {
    case 200: return "OK"
    case 404: return "Not Found"
    case 405: return "Method Not Allowed"
    default: return "HTTP"
    }
  }

  private func mimeType(for ext: String) -> String {
    switch ext {
    case "html": return "text/html; charset=utf-8"
    case "js": return "application/javascript; charset=utf-8"
    case "css": return "text/css; charset=utf-8"
    case "json": return "application/json; charset=utf-8"
    case "svg": return "image/svg+xml"
    case "png": return "image/png"
    case "jpg", "jpeg": return "image/jpeg"
    case "ico": return "image/x-icon"
    case "map": return "application/json"
    default: return "application/octet-stream"
    }
  }

  private func sanitize(path: String) -> String {
    var p = path
    if !p.hasPrefix("/") { p = "/" + p }
    // Normalize .. to prevent path traversal
    let comps = p.split(separator: "/").reduce(into: [String]()) { acc, part in
      if part == "." || part.isEmpty { return }
      if part == ".." { _ = acc.popLast(); return }
      acc.append(String(part))
    }
    // Return relative path (no leading slash). Root => empty string
    return comps.isEmpty ? "" : comps.joined(separator: "/")
  }

  private static func getWiFiAddress() -> String? {
    // Prefer IPv4 on Wi‑Fi (en0); fallback to other interfaces
    var address: String?
    var ifaddr: UnsafeMutablePointer<ifaddrs>? = nil
    if getifaddrs(&ifaddr) == 0 {
      var ptr = ifaddr
      while ptr != nil {
        defer { ptr = ptr?.pointee.ifa_next }
        guard let interface = ptr?.pointee else { continue }
        let addrFamily = interface.ifa_addr.pointee.sa_family
        if addrFamily == UInt8(AF_INET) {
          let name = String(cString: interface.ifa_name)
          var hostname = [CChar](repeating: 0, count: Int(NI_MAXHOST))
          getnameinfo(interface.ifa_addr, socklen_t(interface.ifa_addr.pointee.sa_len), &hostname, socklen_t(hostname.count), nil, 0, NI_NUMERICHOST)
          let ip = String(cString: hostname)
          if name == "en0" { address = ip; break }
          if address == nil { address = ip }
        }
      }
      freeifaddrs(ifaddr)
    }
    return address
  }
}
