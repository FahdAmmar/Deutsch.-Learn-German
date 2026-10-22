import { describe, expect, it } from 'vitest'

import { soundCueFor } from './feedback'

describe('soundCueFor', () => {
  it('ticks softly for a right letter, including half of a transliteration like "a" for "ä"', () => {
    expect(soundCueFor({ seq: 1, outcome: 'correct', finalSegment: false })).toBe('key')
    expect(soundCueFor({ seq: 2, outcome: 'partial', finalSegment: false })).toBe('key')
  })

  it('plays the error tone for a wrong letter, in any part of the text', () => {
    expect(soundCueFor({ seq: 1, outcome: 'wrong', finalSegment: false })).toBe('wrong')
    expect(soundCueFor({ seq: 1, outcome: 'wrong', finalSegment: true })).toBe('wrong')
  })

  it('chimes when a part is finished and plays the fanfare only after the last one', () => {
    expect(soundCueFor({ seq: 9, outcome: 'complete', finalSegment: false })).toBe('correct')
    expect(soundCueFor({ seq: 9, outcome: 'complete', finalSegment: true })).toBe('complete')
  })
})
