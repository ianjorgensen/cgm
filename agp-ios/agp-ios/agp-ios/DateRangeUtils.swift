import Foundation

func periodLabel(days: Int) -> String {
  switch days {
  case 1: return "1 Day"
  case 7: return "1 Week"
  case 14: return "2 Weeks"
  case 21: return "3 Weeks"
  case 30: return "1 Month"
  case 90: return "3 Months"
  default: return "\(days) Days"
  }
}

func periodDateRangeString(days: Int, now: Date = Date()) -> String {
  let cal = Calendar.current
  let end = now
  let start = cal.date(byAdding: .day, value: -days + 1, to: cal.startOfDay(for: now)) ?? now
  let f = DateFormatter(); f.dateFormat = "MMM d"; let startStr = f.string(from: start)
  let f2 = DateFormatter(); f2.dateFormat = "MMM d, yyyy"; let endStr = f2.string(from: end)
  return "\(startStr) – \(endStr)"
}

