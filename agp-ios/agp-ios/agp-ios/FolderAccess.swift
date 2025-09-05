import Foundation
import UniformTypeIdentifiers
import SwiftUI
import UIKit

enum RepoFolderBookmark {
  private static let key = "repoFolderBookmark"

  static func save(url: URL) throws {
    // On iOS, .withSecurityScope is unavailable; minimal bookmark persists access for document URLs
    let data = try url.bookmarkData(options: .minimalBookmark, includingResourceValuesForKeys: nil, relativeTo: nil)
    UserDefaults.standard.set(data, forKey: key)
  }

  static func resolve() -> URL? {
    guard let data = UserDefaults.standard.data(forKey: key) else { return nil }
    var stale = false
    do {
      let url = try URL(resolvingBookmarkData: data, options: [], relativeTo: nil, bookmarkDataIsStale: &stale)
      if stale { return nil }
      return url
    } catch {
      return nil
    }
  }

  static func clear() { UserDefaults.standard.removeObject(forKey: key) }
}

struct FolderPicker: UIViewControllerRepresentable {
  let onPick: (URL) -> Void

  func makeUIViewController(context: Context) -> UIDocumentPickerViewController {
    let vc = UIDocumentPickerViewController(forOpeningContentTypes: [UTType.folder], asCopy: false)
    vc.delegate = context.coordinator
    vc.allowsMultipleSelection = false
    return vc
  }

  func updateUIViewController(_ vc: UIDocumentPickerViewController, context: Context) {}

  func makeCoordinator() -> Coordinator { Coordinator(self) }
  final class Coordinator: NSObject, UIDocumentPickerDelegate {
    let parent: FolderPicker
    init(_ parent: FolderPicker) { self.parent = parent }
    func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
      guard let url = urls.first else { return }
      parent.onPick(url)
    }
  }
}

extension FileManager {
  func ensureDirectory(_ url: URL) throws {
    var isDir: ObjCBool = false
    if fileExists(atPath: url.path, isDirectory: &isDir) {
      if isDir.boolValue { return }
      try removeItem(at: url)
    }
    try createDirectory(at: url, withIntermediateDirectories: true)
  }
}
