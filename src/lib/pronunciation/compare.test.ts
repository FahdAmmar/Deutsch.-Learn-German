import { describe, expect, it } from 'vitest'

import { bestComparison, compareSpeech, editDistance, normalizeWord, verdictFor } from './compare'

describe('normalizeWord', () => {
  it('ignores case and punctuation and reads ß as ss', () => {
    expect(normalizeWord('Straße!')).toBe('strasse')
    expect(normalizeWord('„Guten')).toBe('guten')
  })

  it('spells a number written in digits, as the recogniser often writes it', () => {
    expect(normalizeWord('3')).toBe('drei')
    expect(normalizeWord('21')).toBe('einundzwanzig')
    expect(normalizeWord('12345')).toBe('12345')
  })
})

describe('editDistance', () => {
  it.each([
    ['schon', 'schön', 1],
    ['kitten', 'sitting', 3],
    ['gleich', 'gleich', 0],
    ['', 'ab', 2],
  ])('%s / %s = %i', (a, b, expected) => {
    expect(editDistance(a, b)).toBe(expected)
  })
})

describe('compareSpeech', () => {
  it('matches a sentence said right, whatever the case and punctuation', () => {
    const result = compareSpeech('Ich möchte einen Kaffee, bitte.', 'ich möchte einen kaffee bitte')
    expect(result.words.map((entry) => entry.status)).toEqual(['match', 'match', 'match', 'match', 'match'])
    expect(result.score).toBe(1)
    expect(verdictFor(result)).toBe('good')
  })

  it('tells a minimal pair apart: "schön" heard as "schon" is close, not right', () => {
    const result = compareSpeech('Das ist schön', 'das ist schon')
    expect(result.words.map((entry) => entry.status)).toEqual(['match', 'match', 'close'])
    expect(result.words[2].heard).toBe('schon')
    expect(result.score).toBeCloseTo(2.5 / 3)
    expect(verdictFor(result)).toBe('almost')
  })

  it('does not call a short different word close', () => {
    expect(compareSpeech('wir', 'vier').words[0].status).toBe('wrong')
  })

  it('finds the word that was dropped without marking the rest wrong', () => {
    const result = compareSpeech('Ich komme aus Berlin', 'ich komme berlin')
    expect(result.words.map((entry) => `${entry.word}:${entry.status}`)).toEqual([
      'Ich:match',
      'komme:match',
      'aus:missing',
      'Berlin:match',
    ])
    expect(result.score).toBe(0.75)
  })

  it('lists the words that were heard but are not in the target', () => {
    const result = compareSpeech('Guten Morgen', 'guten schönen morgen')
    expect(result.words.map((entry) => entry.status)).toEqual(['match', 'match'])
    expect(result.extra).toEqual(['schönen'])
    expect(verdictFor(result)).toBe('almost')
  })

  it('reads digits as the words that were asked for', () => {
    const result = compareSpeech('Ich habe drei Brüder', 'ich habe 3 brüder')
    expect(result.score).toBe(1)
  })

  it('scores nothing for silence, and asks to try again', () => {
    const result = compareSpeech('Guten Morgen', '')
    expect(result.words.map((entry) => entry.status)).toEqual(['missing', 'missing'])
    expect(result.score).toBe(0)
    expect(verdictFor(result)).toBe('again')
  })

  it('scores nothing for an empty target rather than dividing by zero', () => {
    expect(compareSpeech('', 'hallo').score).toBe(0)
  })
})

describe('bestComparison', () => {
  it('judges the reading closest to the target, not just the first guess', () => {
    const { comparison, heard } = bestComparison('Das ist schön', ['das ist schon', 'das ist schön'])
    expect(heard).toBe('das ist schön')
    expect(comparison.score).toBe(1)
  })

  it('keeps the first reading when none is better', () => {
    expect(bestComparison('Hallo', ['hallo', 'halo']).heard).toBe('hallo')
  })

  it('prefers, at an equal score, the reading with fewer extra words', () => {
    expect(bestComparison('Hallo', ['hallo welt', 'hallo']).heard).toBe('hallo')
  })

  it('handles no reading at all as silence', () => {
    expect(bestComparison('Hallo', []).comparison.score).toBe(0)
  })
})
