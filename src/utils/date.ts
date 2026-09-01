/** Returns today's date as a stable YYYY-MM-DD key, in the user's local time zone. */
export function todayKey(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Number of whole calendar days between two YYYY-MM-DD keys (b - a). */
export function daysBetween(a: string, b: string): number {
  const dateA = new Date(`${a}T00:00:00`)
  const dateB = new Date(`${b}T00:00:00`)
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((dateB.getTime() - dateA.getTime()) / msPerDay)
}
