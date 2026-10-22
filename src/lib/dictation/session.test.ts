import { describe, expect, it } from 'vitest'

import { DEFAULT_DICTATION_OPTIONS } from './engine'
import {
  MIN_SENTENCE_MS,
  createSession,
  remainingCharacters,
  runStats,
  sessionReducer,
  topMistakes,
  type SessionState,
} from './session'

function type(state: SessionState, text: string, startAt = 0, stepMs = 200): SessionState {
  let current = state
  let now = startAt
  for (const char of Array.from(text)) {
    current = sessionReducer(current, { type: 'key', char, now, options: DEFAULT_DICTATION_OPTIONS })
    now += stepMs
  }
  return current
}

const started = (texts: string[]) => sessionReducer(createSession(texts), { type: 'start' })

describe('sessionReducer', () => {
  it('stays on the intro until started and ignores keys before that', () => {
    const intro = createSession(['Hallo'])
    expect(sessionReducer(intro, { type: 'key', char: 'H', now: 0, options: DEFAULT_DICTATION_OPTIONS })).toBe(intro)
    expect(sessionReducer(intro, { type: 'start' }).phase).toBe('typing')
  })

  it('starts the clock at the first key press, not at start', () => {
    const state = started(['Hallo'])
    expect(state.startedAt).toBeNull()
    expect(type(state, 'H', 5000).startedAt).toBe(5000)
  })

  it('marks a sentence done, then advances to the next on request', () => {
    let state = type(started(['Hallo', 'Welt']), 'Hallo')
    expect(state.sentenceDone).toBe(true)
    expect(state.results).toHaveLength(1)

    // Keys are ignored while waiting to advance.
    expect(sessionReducer(state, { type: 'key', char: 'x', now: 9, options: DEFAULT_DICTATION_OPTIONS })).toBe(state)

    state = sessionReducer(state, { type: 'advance' })
    expect(state.index).toBe(1)
    expect(state.sentenceDone).toBe(false)
    expect(state.startedAt).toBeNull()
  })

  it('finishes after the last sentence', () => {
    let state = type(started(['Ja']), 'Ja')
    state = sessionReducer(state, { type: 'advance' })
    expect(state.phase).toBe('finished')
  })

  it('does not advance before the sentence is complete', () => {
    const state = started(['Hallo'])
    expect(sessionReducer(state, { type: 'advance' })).toBe(state)
  })

  it('floors very fast sentences so one-word lines cannot report absurd speeds', () => {
    const state = type(started(['Ja']), 'Ja', 0, 10)
    expect(state.results[0].elapsedMs).toBe(MIN_SENTENCE_MS)
  })

  it('restarts from the beginning with the same texts', () => {
    const done = sessionReducer(type(started(['Ja']), 'Ja'), { type: 'advance' })
    const again = sessionReducer(done, { type: 'restart' })
    expect(again).toMatchObject({ phase: 'intro', index: 0, sentenceDone: false, results: [] })
  })
})

describe('runStats', () => {
  it('covers finished sentences and the one in progress', () => {
    let state = type(started(['Ab', 'Cd']), 'Ab', 0, 1000)
    state = sessionReducer(state, { type: 'advance' })
    state = type(state, 'x', 10_000) // one wrong key on the second sentence
    const stats = runStats(state, 12_000)
    expect(stats.keystrokes).toBe(3)
    expect(stats.errors).toBe(1)
    expect(stats.accuracy).toBeCloseTo(2 / 3)
  })

  it('is 100% accurate before typing anything', () => {
    expect(runStats(started(['Hallo']), 0).accuracy).toBe(1)
  })
})

describe('remainingCharacters', () => {
  it('counts the rest of this sentence plus all later ones', () => {
    const state = type(started(['Haus', 'Tisch']), 'Ha')
    expect(remainingCharacters(state)).toBe(2 + 5)
  })

  it('is zero once finished', () => {
    const state = sessionReducer(type(started(['Ja']), 'Ja'), { type: 'advance' })
    expect(remainingCharacters(state)).toBe(0)
  })
})

describe('topMistakes', () => {
  it('lists the most mistyped letters first, spaces excluded', () => {
    let state = started(['Ärzte arbeiten'])
    for (const char of ['x', 'y', 'q']) state = type(state, char)
    state = type(state, 'Aerzte')
    state = type(state, 'z') // a wrong key where the space is expected
    state = type(state, ' arbeiten')
    expect(state.sentenceDone).toBe(true)
    const top = topMistakes(state)
    expect(top[0]).toEqual({ char: 'Ä', count: 3 })
    expect(top.some((entry) => entry.char === ' ')).toBe(false)
  })
})

describe('sessionReducer — last judged key', () => {
  const press = (state: SessionState, char: string) =>
    sessionReducer(state, { type: 'key', char, now: 0, options: DEFAULT_DICTATION_OPTIONS })

  it('has nothing to answer before the first key press', () => {
    expect(createSession(['Hallo']).lastKey).toBeNull()
  })

  it('reports each right and wrong press, counting them even when the outcome repeats', () => {
    let state = started(['Hallo'])
    state = press(state, 'H')
    expect(state.lastKey).toEqual({ seq: 1, outcome: 'correct', finalSegment: true })
    state = press(state, 'x')
    expect(state.lastKey).toEqual({ seq: 2, outcome: 'wrong', finalSegment: true })
    state = press(state, 'y')
    expect(state.lastKey).toEqual({ seq: 3, outcome: 'wrong', finalSegment: true })
  })

  it('does not change for a press that was ignored', () => {
    const state = press(started(['Hallo']), 'H')
    expect(press(state, 'ab')).toBe(state)
  })

  it('marks the end of a part, and flags only the last part as final', () => {
    let state = type(started(['Hallo', 'Welt']), 'Hallo')
    expect(state.lastKey).toMatchObject({ outcome: 'complete', finalSegment: false })

    state = sessionReducer(state, { type: 'advance' })
    state = type(state, 'Welt')
    expect(state.lastKey).toMatchObject({ outcome: 'complete', finalSegment: true })
  })

  it('starts counting again after a restart', () => {
    const state = sessionReducer(press(started(['Hallo']), 'H'), { type: 'restart' })
    expect(state.lastKey).toBeNull()
  })
})

describe('sessionReducer — spelling slips', () => {
  it('reads the mistakes of each finished sentence as the pattern they belong to', () => {
    // "Tür": a plain "u" is the start of "ue", so the "r" that follows is the wrong key — an Umlaut left out.
    let state = type(started(['Tür', 'Das Mädchen']), 'Tur')
    expect(state.sentenceDone).toBe(false)
    state = type(state, 'ür', 1000) // the learner retries with the Umlaut, then types the last letter
    expect(state.sentenceDone).toBe(true)
    expect(state.slips).toEqual([{ kind: 'umlaut', word: 'Tür', expected: 'ü', typed: 'r' }])

    state = sessionReducer(state, { type: 'advance' })
    // "a" then "d": the "ä" of "Mädchen" was typed as a plain "a", and the "d" that follows is the wrong key.
    state = type(state, 'Das Ma', 2000)
    state = type(state, 'dädchen', 3000)
    expect(state.slips.map((slip) => `${slip.kind}:${slip.word}`)).toEqual(['umlaut:Tür', 'umlaut:Mädchen'])
  })

  it('keeps a mistake once however often the cell is pressed wrong', () => {
    const state = type(started(['Tisch']), 'Txxxisch')
    expect(state.slips).toHaveLength(1)
  })

  it('has no slips for a clean run, and forgets them on restart', () => {
    const clean = type(started(['Hallo']), 'Hallo')
    expect(clean.slips).toEqual([])
    const dirty = type(started(['Hallo']), 'Hxallo')
    expect(dirty.slips).toHaveLength(1)
    expect(sessionReducer(dirty, { type: 'restart' }).slips).toEqual([])
  })
})
