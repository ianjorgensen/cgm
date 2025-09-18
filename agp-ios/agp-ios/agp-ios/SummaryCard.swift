import SwiftUI

struct SummaryCard: View {
  let stats: SummaryStats
  var units: AppSettings.DisplayUnits = .mmolL
  var periodLabelText: String? = nil
  var periodRangeText: String? = nil

  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      // First group (lighter/smaller): period, target range, CGM active
      if let left = periodLabelText, let right = periodRangeText {
        HStack {
          Text(left).font(.subheadline).fontWeight(.semibold)
          Spacer()
          Text(right).font(.subheadline).fontWeight(.semibold)
        }
      }
      HStack {
        Text("Target Range").font(.footnote).fontWeight(.semibold)
        Spacer()
        Text("3.9–10 mmol/L").font(.footnote).foregroundStyle(.secondary)
      }
      HStack {
        Text("Time CGM Active").font(.footnote)
        Spacer()
        Text(String(format: "%.1f%%", stats.activePercent)).font(.footnote)
      }

      // Group separator
      Divider().padding(.vertical, 4)

      // Second group (emphasis): average, GMI, CV
      if units == .mmolL {
        row(title: "Average Glucose", value: String(format: "%.1f mmol/L", stats.meanMmol), goal: "Goal: <8.6 mmol/L")
      } else {
        row(title: "Average Glucose", value: "\(Int(round(stats.meanMgdL))) mg/dL", goal: "Goal: <155 mg/dL")
      }
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
