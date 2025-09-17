import SwiftUI

struct SummaryCard: View {
  let stats: SummaryStats
  var periodLabelText: String? = nil
  var periodRangeText: String? = nil

  var body: some View {
    VStack(alignment: .leading, spacing: 12) {
      if let left = periodLabelText, let right = periodRangeText {
        HStack { Text(left).fontWeight(.semibold); Spacer(); Text(right).fontWeight(.semibold) }
        Divider()
      }
      HStack { Text("Target Range").bold(); Spacer(); Text("3.9–10 mmol/L").foregroundStyle(.secondary) }
      Divider()
      HStack { Text("Time CGM Active"); Spacer(); Text(String(format: "%.1f%%", stats.activePercent)) }
      Divider()
      row(title: "Average Glucose", value: String(format: "%.1f mmol/L", stats.meanMmol), goal: "Goal: <8.6 mmol/L")
      Divider()
      row(title: "Glucose Management Indicator (GMI)", value: String(format: "%.1f%%", stats.gmi), goal: "Goal: <7%")
      Divider()
      row(title: "Glucose Variability (CV)", value: String(format: "%.1f%%", stats.cv), goal: "Goal: ≤36%")
    }
  }

  private func row(title: String, value: String, goal: String) -> some View {
    VStack(alignment: .leading, spacing: 4) {
      HStack { Text(title).bold(); Spacer(); Text(value) }
      Text(goal).font(.footnote).foregroundStyle(.secondary)
    }
  }
}

#Preview {
  let sample = SummaryStats(activePercent: 96.7, meanMgdL: 157, meanMmol: 8.7, gmi: 7.1, cv: 37.2)
  return SummaryCard(stats: sample, periodLabelText: "2 Weeks", periodRangeText: "Sep 3 – 17, 2025").padding()
}
