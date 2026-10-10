/** Playback speeds the player cycles through. The app-wide default (0.9) sits between two of them. */
export const SPEED_PRESETS = [0.6, 0.8, 1, 1.2] as const

/** The next preset above the current speed, wrapping to the slowest after the fastest. */
export function nextSpeed(current: number): number {
  return SPEED_PRESETS.find((preset) => preset > current + 0.001) ?? SPEED_PRESETS[0]
}

/** "×0.90" — always two decimals so the chip doesn't change width. */
export function formatSpeed(rate: number): string {
  return `×${rate.toFixed(2)}`
}
