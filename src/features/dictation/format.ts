/** 0–1 → "93%". */
export function formatPercent(value: number): string {
  return `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%`
}

/** Milliseconds → "2:05". */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
