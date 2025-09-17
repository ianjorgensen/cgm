import SwiftUI

struct Card<Content: View>: View {
  let content: Content
  init(@ViewBuilder content: () -> Content) { self.content = content() }
  var body: some View {
    VStack(alignment: .leading, spacing: 12) {
      content
    }
    .padding(16)
    .background(
      RoundedRectangle(cornerRadius: 14, style: .continuous)
        .fill(Color(uiColor: .secondarySystemBackground))
    )
    .overlay(
      RoundedRectangle(cornerRadius: 14, style: .continuous)
        .stroke(Color.black.opacity(0.05))
    )
    .shadow(color: .black.opacity(0.05), radius: 2, x: 0, y: 1)
    .padding(.horizontal)
  }
}

#Preview {
  Card { Text("Card Title").font(.headline); Text("Body…") }
}

