import { describe, expect, it } from 'vitest'

import { formatSpeed, nextSpeed, SPEED_PRESETS } from './speedPresets'

describe('speed presets', () => {
  it('steps up through every preset and wraps to the slowest', () => {
    expect(nextSpeed(0.6)).toBe(0.8)
    expect(nextSpeed(0.8)).toBe(1)
    expect(nextSpeed(1)).toBe(1.2)
    expect(nextSpeed(1.2)).toBe(SPEED_PRESETS[0])
  })

  it('moves to the next preset above a custom speed from Settings', () => {
    expect(nextSpeed(0.9)).toBe(1)
    expect(nextSpeed(0.5)).toBe(0.6)
    expect(nextSpeed(1.5)).toBe(0.6)
  })

  it('formats with two decimals', () => {
    expect(formatSpeed(1)).toBe('×1.00')
    expect(formatSpeed(0.9)).toBe('×0.90')
  })
})
