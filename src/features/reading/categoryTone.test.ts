import { describe, expect, it } from 'vitest'

import { categoryTone } from './categoryTone'

describe('categoryTone', () => {
  it('is deterministic — the same category always gets the same tone', () => {
    expect(categoryTone('Vorstellung')).toBe(categoryTone('Vorstellung'))
    expect(categoryTone('Tagesablauf')).toBe(categoryTone('Tagesablauf'))
  })

  it('spreads different categories across more than one tone', () => {
    const tones = new Set(['Vorstellung', 'Tagesablauf', 'Familie', 'Essen', 'Wetter'].map(categoryTone))
    expect(tones.size).toBeGreaterThan(1)
  })
})
