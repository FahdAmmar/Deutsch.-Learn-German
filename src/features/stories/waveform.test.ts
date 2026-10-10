import { describe, expect, it } from 'vitest'

import { waveformHeights } from './waveform'

describe('waveformHeights', () => {
  it('returns the requested number of bars within 0.15–1', () => {
    const heights = waveformHeights('a1-read-01', 48)
    expect(heights).toHaveLength(48)
    expect(heights.every((h) => h >= 0.15 && h <= 1)).toBe(true)
  })

  it('is deterministic for a seed and different between seeds', () => {
    expect(waveformHeights('a1-read-01', 48)).toEqual(waveformHeights('a1-read-01', 48))
    expect(waveformHeights('a1-read-01', 48)).not.toEqual(waveformHeights('a1-read-02', 48))
  })

  it('has real variation, not a flat line', () => {
    const heights = waveformHeights('dialogue-weg-formell', 48)
    expect(Math.max(...heights) - Math.min(...heights)).toBeGreaterThan(0.3)
  })
})
