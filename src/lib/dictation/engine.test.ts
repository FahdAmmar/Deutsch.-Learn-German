import { describe, expect, it } from 'vitest'

import {
  applyKey,
  buildCells,
  clearPending,
  combineStats,
  computeStats,
  createDictation,
  estimateMinutesLeft,
  isArabicScript,
  isFinished,
  type DictationOptions,
  type DictationState,
} from './engine'

function typeAll(state: DictationState, text: string): DictationState {
  let current = state
  for (const char of Array.from(text)) current = applyKey(current, char).state
  return current
}

describe('buildCells', () => {
  it('marks letters, digits and spaces as typeable and punctuation as automatic', () => {
    const cells = buildCells('Hallo, Welt!')
    expect(cells.filter((cell) => cell.typeable).map((cell) => cell.char).join('')).toBe('Hallo Welt')
    expect(cells.find((cell) => cell.char === ',')?.typeable).toBe(false)
  })

  it('collapses repeated whitespace', () => {
    expect(buildCells('Ich   bin  da').map((cell) => cell.char).join('')).toBe('Ich bin da')
  })
})

describe('applyKey', () => {
  it('advances on the right letter and rejects the wrong one without moving', () => {
    const start = createDictation('Haus')
    const wrong = applyKey(start, 'x')
    expect(wrong.outcome).toBe('wrong')
    expect(wrong.state.position).toBe(0)
    expect(wrong.state.errors).toBe(1)

    const right = applyKey(wrong.state, 'H')
    expect(right.outcome).toBe('correct')
    expect(right.state.position).toBe(1)
  })

  it('is case-sensitive — German nouns are capitalised', () => {
    const result = applyKey(createDictation('Tisch'), 't')
    expect(result.outcome).toBe('wrong')
  })

  it('fills punctuation automatically and completes on the last letter', () => {
    let state = createDictation('Guten Tag!')
    state = typeAll(state, 'Guten Ta')
    const last = applyKey(state, 'g')
    expect(last.outcome).toBe('complete')
    expect(isFinished(last.state)).toBe(true)
  })

  it('skips punctuation between words', () => {
    const state = typeAll(createDictation('Ja, gern.'), 'Ja')
    // Comma is skipped; the next typeable cell is the space.
    expect(state.cells[state.position].char).toBe(' ')
  })

  it('ignores input after the sentence is finished and multi-character input', () => {
    const done = typeAll(createDictation('Ja'), 'Ja')
    expect(applyKey(done, 'x').outcome).toBe('ignored')
    expect(applyKey(createDictation('Ja'), 'Ja').outcome).toBe('ignored')
  })

  it('tracks consecutive errors and resets after progress', () => {
    let state = createDictation('Ab')
    state = applyKey(state, 'x').state
    state = applyKey(state, 'y').state
    expect(state.streak).toBe(2)
    state = applyKey(state, 'A').state
    expect(state.streak).toBe(0)
  })

  it('records which expected letters were mistyped', () => {
    const state = applyKey(applyKey(createDictation('Ärzte'), 'x').state, 'y').state
    expect(state.mistakes['Ä']).toBe(2)
  })
})

describe('umlaut transliteration', () => {
  it('accepts ae, oe, ue and ss for ä, ö, ü and ß', () => {
    expect(isFinished(typeAll(createDictation('Käse'), 'Kaese'))).toBe(true)
    expect(isFinished(typeAll(createDictation('schön'), 'schoen'))).toBe(true)
    expect(isFinished(typeAll(createDictation('für'), 'fuer'))).toBe(true)
    expect(isFinished(typeAll(createDictation('Straße'), 'Strasse'))).toBe(true)
  })

  it('accepts the real umlaut as well', () => {
    expect(isFinished(typeAll(createDictation('Käse'), 'Käse'))).toBe(true)
  })

  it('keeps capital umlauts capital in the transliteration', () => {
    expect(isFinished(typeAll(createDictation('Ärztin'), 'Aerztin'))).toBe(true)
    expect(applyKey(createDictation('Ärztin'), 'A').outcome).toBe('partial')
    // A lowercase "a" is not the start of "Ae".
    expect(applyKey(createDictation('Ärztin'), 'a').outcome).toBe('wrong')
    const wrongCase = applyKey(applyKey(createDictation('Ärztin'), 'A').state, 'E')
    expect(wrongCase.outcome).toBe('wrong')
  })

  it('reports a half-typed transliteration as partial without counting a keystroke', () => {
    const partial = applyKey(createDictation('für'), 'f').state
    const result = applyKey(partial, 'u')
    expect(result.outcome).toBe('partial')
    expect(result.state.pending).toBe('u')
    expect(result.state.keystrokes).toBe(1)
  })

  it('treats a wrong second letter as an error and clears the pending letter', () => {
    const partial = applyKey(applyKey(createDictation('für'), 'f').state, 'u').state
    const wrong = applyKey(partial, 'x')
    expect(wrong.outcome).toBe('wrong')
    expect(wrong.state.pending).toBe('')
  })

  it('can be switched off', () => {
    const off = { acceptTransliteration: false }
    expect(applyKey(createDictation('für'), 'f', off).outcome).toBe('correct')
    const result = applyKey(applyKey(createDictation('für'), 'f', off).state, 'u', off)
    expect(result.outcome).toBe('wrong')
  })

  it('clearPending drops a half-typed transliteration', () => {
    const partial = applyKey(applyKey(createDictation('für'), 'f').state, 'u').state
    expect(clearPending(partial).pending).toBe('')
  })
})

describe('stats', () => {
  it('is 100% accurate before any keystroke', () => {
    expect(computeStats(createDictation('Hallo'), 0).accuracy).toBe(1)
  })

  it('computes accuracy from wrong presses', () => {
    let state = createDictation('Ab')
    state = applyKey(state, 'x').state
    state = typeAll(state, 'Ab')
    // 3 key presses, 1 wrong.
    expect(computeStats(state, 1000).accuracy).toBeCloseTo(2 / 3)
  })

  it('computes WPM with the five-characters-per-word convention', () => {
    const state = typeAll(createDictation('Hallo Welt Haus'), 'Hallo Welt Haus')
    // 15 typeable characters (spaces count) in 12 seconds = 0.2 minutes.
    expect(computeStats(state, 12_000).wpm).toBe(Math.round(15 / 5 / 0.2))
  })

  it('returns 0 WPM when no time has passed', () => {
    expect(computeStats(createDictation('Hallo'), 0).wpm).toBe(0)
  })

  it('combines several sentences', () => {
    const combined = combineStats([
      { keystrokes: 10, errors: 1, correctCharacters: 9, elapsedMs: 30_000 },
      { keystrokes: 10, errors: 0, correctCharacters: 10, elapsedMs: 30_000 },
    ])
    expect(combined.accuracy).toBeCloseTo(19 / 20)
    expect(combined.wpm).toBe(Math.round(19 / 5 / 1))
  })

  it('estimates time left with a floor for slow typists', () => {
    expect(estimateMinutesLeft(300, 30)).toBe(2)
    expect(estimateMinutesLeft(0, 30)).toBe(1)
    expect(estimateMinutesLeft(150, 0)).toBe(2)
  })
})

describe('isArabicScript', () => {
  it('detects Arabic letters', () => {
    expect(isArabicScript('ب')).toBe(true)
    expect(isArabicScript('b')).toBe(false)
  })
})

describe('given words (cloze)', () => {
  const options: DictationOptions = { acceptTransliteration: true }

  it('shows a given word without asking for it, and passes over the spaces beside it', () => {
    const cells = buildCells('Das ist gut', new Set([0, 2]))
    expect(cells.map((cell) => cell.typeable)).toEqual([false, false, false, false, true, true, true, false, false, false, false])
  })

  it('starts at the first word the learner has to type, and ends when the last one is typed', () => {
    let state = createDictation('Das ist gut.', new Set([0, 2]))
    expect(state.position).toBe(4)

    for (const key of 'ist') state = applyKey(state, key, options).state
    expect(isFinished(state)).toBe(true)
    expect(state.errors).toBe(0)
  })

  it('still needs the space between two words the learner types', () => {
    let state = createDictation('Ich lerne heute Deutsch', new Set([0, 3]))
    for (const key of 'lerne') state = applyKey(state, key, options).state
    // Both neighbours are typed words, so the space between them is typed too.
    expect(state.cells[state.position].char).toBe(' ')
    expect(isFinished(state)).toBe(false)
    for (const key of ' heute') state = applyKey(state, key, options).state
    expect(isFinished(state)).toBe(true)
  })

  it('counts only the typed words when the accuracy is measured', () => {
    expect(buildCells('Das ist gut', new Set([0, 2])).filter((cell) => cell.typeable)).toHaveLength(3)
  })

  it('changes nothing when no word is given', () => {
    expect(buildCells('Das ist gut')).toEqual(buildCells('Das ist gut', new Set()))
    expect(buildCells('Das ist gut').filter((cell) => !cell.typeable)).toHaveLength(0)
  })
})

describe('given words and apostrophes', () => {
  it('keeps a word with an apostrophe whole: given, it is not half typed', () => {
    // Wie(0) geht’s(1) dir(2) — word 1 is given, so none of "geht’s" is typed.
    const cells = buildCells('Wie geht’s dir', new Set([1]))
    const typed = cells.filter((cell) => cell.typeable).map((cell) => cell.char)
    expect(typed.join('')).toBe('Wiedir')
    expect(cells.find((cell) => cell.char === 's')?.typeable).toBe(false)
  })
})
