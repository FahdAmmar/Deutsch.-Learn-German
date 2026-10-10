/**
 * Bar heights (0.15–1) for a story's decorative waveform. Derived from the
 * story id, so every story has its own recognisable shape and it never
 * changes between renders.
 */
export function waveformHeights(seed: string, count: number): number[] {
  let state = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    state = Math.imul(state ^ seed.charCodeAt(i), 16777619) >>> 0
  }
  const random = () => {
    // mulberry32
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const phase = random() * Math.PI * 2
  return Array.from({ length: count }, (_, i) => {
    // A slow swell, like phrases of speech, broken up by per-bar variation.
    const envelope = 0.5 + 0.35 * Math.sin((i / count) * Math.PI * 3 + phase)
    return Math.min(1, Math.max(0.15, envelope * (0.55 + 0.45 * random())))
  })
}
