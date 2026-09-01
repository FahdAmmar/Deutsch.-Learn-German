import { describe, expect, it } from 'vitest'

import { isAnswerAccepted, normalizeAnswer } from './text'

describe('normalizeAnswer', () => {
  it('trims, lowercases, and collapses whitespace', () => {
    expect(normalizeAnswer('  Guten   Morgen  ')).toBe('guten morgen')
  })

  it('strips common trailing punctuation', () => {
    expect(normalizeAnswer('Wir lernen Deutsch.')).toBe('wir lernen deutsch')
    expect(normalizeAnswer('Wie geht\'s?')).toBe('wie gehts')
  })
})

describe('isAnswerAccepted', () => {
  it('accepts an exact match regardless of case', () => {
    expect(isAnswerAccepted('guten', ['Guten'])).toBe(true)
  })

  it('accepts any one of several accepted answers', () => {
    expect(isAnswerAccepted('Wir lernen Deutsch', ['Wir lernen Deutsch', 'Wir lernen Deutsch.'])).toBe(true)
  })

  it('is tolerant of minor punctuation and spacing differences', () => {
    expect(isAnswerAccepted('  wir lernen deutsch.  ', ['Wir lernen Deutsch'])).toBe(true)
  })

  it('rejects an answer that matches nothing in the accepted list', () => {
    expect(isAnswerAccepted('Ich lerne Deutsch', ['Wir lernen Deutsch'])).toBe(false)
  })

  it('rejects empty input even if an accepted answer is also empty-ish', () => {
    expect(isAnswerAccepted('   ', ['Wir lernen Deutsch'])).toBe(false)
  })
})
