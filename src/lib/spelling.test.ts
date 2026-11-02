import { describe, expect, it } from 'vitest'

import { acceptedSpellings, withoutSpecialLetters } from './spelling'

describe('spelling', () => {
  it('writes umlauts and ß the way a keyboard without them does', () => {
    expect(withoutSpecialLetters('schönen Größe')).toBe('schoenen Groesse')
    expect(withoutSpecialLetters('Äpfel Ölkanne Übung')).toBe('Aepfel Oelkanne Uebung')
  })

  it('lists one spelling when the word has no special letter, two when it has', () => {
    expect(acceptedSpellings('neuen')).toEqual(['neuen'])
    expect(acceptedSpellings('großen')).toEqual(['großen', 'grossen'])
    expect(acceptedSpellings('Kochlöffel')).toEqual(['Kochlöffel', 'Kochloeffel'])
  })
})
