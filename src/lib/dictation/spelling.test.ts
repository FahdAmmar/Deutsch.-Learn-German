import { describe, expect, it } from 'vitest'

import { buildCells, createDictation, applyKey, type DictationOptions } from './engine'
import { classifySlip, countByKind, wordAt, type SpellingKind } from './spelling'

/** The kind of the first mistake made when `typed` is pressed at the first cell where it differs from `text`. */
function firstSlip(text: string, typedKey: string, atPosition: number) {
  const cells = buildCells(text)
  return classifySlip(cells, { position: atPosition, typed: typedKey })
}

describe('classifySlip', () => {
  it.each<[string, string, number, SpellingKind]>([
    ['Mädchen', 'a', 1, 'umlaut'],
    ['schön', 'o', 3, 'umlaut'],
    ['Tür', 'u', 1, 'umlaut'],
    ['Straße', 's', 5, 'other'],
    ['Straße', 'x', 4, 'eszett'],
    ['Fluss', 'ß', 3, 'eszett'],
    ['Wein', 'i', 1, 'ie-ei'],
    ['Liebe', 'e', 1, 'ie-ei'],
    ['kommen', 'e', 3, 'double-consonant'],
    ['Name', 'm', 3, 'double-consonant'],
    ['Haus', 'x', 0, 'other'],
    ['Der Tisch', 't', 4, 'capital'],
    ['Der Tisch', 'x', 0, 'other'],
  ])('%s, pressing "%s" at %i → %s', (text, key, position, expected) => {
    expect(firstSlip(text, key, position).kind).toBe(expected)
  })

  it('reads a capital typed where a small letter belongs as a capital slip too', () => {
    expect(firstSlip('der Tisch', 'D', 0).kind).toBe('capital')
  })

  it('names the whole word the mistake was in', () => {
    expect(firstSlip('Das Mädchen lernt.', 'a', 5).word).toBe('Mädchen')
  })

  it('does not call a mistake on a plain letter an Umlaut one', () => {
    expect(firstSlip('Haus', 'u', 1).kind).toBe('other')
  })

  it('says "other" when no pattern fits instead of guessing', () => {
    expect(firstSlip('Haus', 'x', 2).kind).toBe('other')
  })
})

describe('wordAt', () => {
  const cells = buildCells('Das ist gut.')

  it('finds the word around a letter', () => {
    expect(wordAt(cells, 5)).toBe('ist')
  })

  it('gives the word that ended before a space that was mistyped', () => {
    expect(wordAt(cells, 3)).toBe('Das')
  })

  it('has no word where there is no letter near', () => {
    expect(wordAt(buildCells(' . '), 1)).toBe('')
  })
})

describe('the engine records each mistyped cell once, and the kind follows from real typing', () => {
  const options: DictationOptions = { acceptTransliteration: true }

  it('keeps the first wrong press per cell, however many follow', () => {
    let state = createDictation('Tür')
    state = applyKey(state, 'T', options).state
    for (const key of ['i', 'x', 'y']) state = applyKey(state, key, options).state
    expect(state.errors).toBe(3)
    expect(state.slips).toEqual([{ position: 1, typed: 'i' }])
  })

  it('classifies what a learner who skips the Umlaut gets wrong', () => {
    let state = createDictation('Tür')
    state = applyKey(state, 'T', options).state
    state = applyKey(state, 'u', options).state // partial: an "u" could be the start of "ue"
    state = applyKey(state, 'r', options).state // wrong: "ur" is not "ue"
    expect(state.slips).toHaveLength(1)
    expect(classifySlip(state.cells, state.slips[0]).kind).toBe('umlaut')
  })
})

describe('countByKind', () => {
  it('counts per kind, most frequent first, leaving out kinds with none', () => {
    const counts = countByKind([{ kind: 'umlaut' }, { kind: 'capital' }, { kind: 'umlaut' }, { kind: 'other' }, { kind: 'umlaut' }])
    expect(counts).toEqual([
      { kind: 'umlaut', count: 3 },
      { kind: 'capital', count: 1 },
      { kind: 'other', count: 1 },
    ])
  })

  it('is empty for no slips', () => {
    expect(countByKind([])).toEqual([])
  })
})
