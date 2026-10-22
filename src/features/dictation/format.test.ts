import { describe, expect, it } from 'vitest'

import { formatDuration, formatPercent } from './format'

describe('formatPercent', () => {
  it('rounds and clamps', () => {
    expect(formatPercent(0.934)).toBe('93%')
    expect(formatPercent(1.4)).toBe('100%')
    expect(formatPercent(-1)).toBe('0%')
  })
})

describe('formatDuration', () => {
  it('formats minutes and zero-padded seconds', () => {
    expect(formatDuration(125_000)).toBe('2:05')
    expect(formatDuration(0)).toBe('0:00')
    expect(formatDuration(59_600)).toBe('1:00')
  })
})
