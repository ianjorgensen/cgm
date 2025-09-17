import SwiftUI

struct PeriodPicker: View {
  @Binding var selected: Int
  private let items: [(String, Int)] = [
    ("1d", 1), ("1w", 7), ("2w", 14), ("3w", 21), ("1m", 30), ("3m", 90)
  ]
  @State private var dragStartIndex: Int? = nil

  var body: some View {
    HStack(spacing: 10) {
      ForEach(items, id: \.1) { label, days in
        Button(action: {
          if selected != days {
            selected = days
            #if canImport(UIKit)
            let gen = UISelectionFeedbackGenerator()
            gen.selectionChanged()
            #endif
          }
        }) {
          Text(label)
            .font(.callout)
            .fontWeight(selected == days ? .semibold : .regular)
            .padding(.vertical, 6)
            .padding(.horizontal, 10)
            .background(
              Capsule().fill(
                selected == days
                ? Color(uiColor: .secondarySystemFill)
                : Color.clear
              )
            )
            .overlay(
              Capsule().stroke(
                selected == days
                ? Color(uiColor: .separator).opacity(0.5)
                : Color.secondary.opacity(0.25)
              )
            )
            .foregroundStyle(selected == days ? Color.primary : Color.secondary)
        }
        .buttonStyle(.plain)
      }
      Spacer(minLength: 0)
    }
    .contentShape(Rectangle())
    .gesture(
      DragGesture(minimumDistance: 8)
        .onChanged { value in
          let currentIndex = items.firstIndex(where: { $0.1 == selected }) ?? 0
          if dragStartIndex == nil { dragStartIndex = currentIndex }
          guard let start = dragStartIndex else { return }
          // Change one step per ~50pt horizontal movement
          let steps = Int((value.translation.width / 50.0).rounded())
          var newIndex = start + steps
          newIndex = max(0, min(items.count - 1, newIndex))
          if newIndex != currentIndex {
            selected = items[newIndex].1
            #if canImport(UIKit)
            let gen = UISelectionFeedbackGenerator(); gen.selectionChanged()
            #endif
          }
        }
        .onEnded { _ in dragStartIndex = nil }
    )
  }
}

#Preview {
  StatefulPreviewWrapper(14) { PeriodPicker(selected: $0) }
}

// A simple helper to preview bindings
struct StatefulPreviewWrapper<Value, Content: View>: View {
  @State var value: Value
  var content: (Binding<Value>) -> Content
  init(_ initialValue: Value, content: @escaping (Binding<Value>) -> Content) {
    _value = State(initialValue: initialValue)
    self.content = content
  }
  var body: some View { content($value) }
}
