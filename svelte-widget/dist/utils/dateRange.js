export const DAY = 24 * 60 * 60 * 1000
// Start of UTC day for a timestamp (ms)
export const utcDayStart = t => {
  const d = new Date(t)
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
}
// End of UTC day for a timestamp (ms, inclusive)
export const utcDayEnd = t => utcDayStart(t) + DAY - 1

// Returns an inclusive range [start,end] (ms) covering the last N days in the dataset
export function lastNDaysRange(data, days = 14){
  const t0 = Date.parse(data.t0)
  const tEnd = t0 + data.stepMs * (data.glucose.length - 1)
  const end = utcDayEnd(tEnd)
  const start = Math.max(utcDayStart(t0), end - (days * DAY - 1))
  return { start, end }
}
