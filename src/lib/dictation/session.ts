import {
  applyKey,
  buildCells,
  clearPending,
  combineStats,
  computeStats,
  countCorrectCharacters,
  createDictation,
  type GivenWords,
  isFinished,
  type DictationOptions,
  type DictationState,
  type DictationStats,
  type KeyOutcome,
} from './engine'
import { classifySlip } from './spelling'
import type { SpellingSlip } from '@/types'

/**
 * A whole dictation run over a story: one sentence after another, with the
 * results of the finished ones kept so accuracy and speed cover the full text.
 * Pure — time comes in through actions, so the reducer is deterministic.
 */

export type SessionPhase = 'intro' | 'typing' | 'finished'

export interface SegmentResult {
  keystrokes: number
  errors: number
  correctCharacters: number
  elapsedMs: number
}

/** The last key press that was judged, so the UI can answer it (a sound, a flash) exactly once per press. */
export interface LastKey {
  /** Counts judged presses within a run; changes with every one, even two identical outcomes in a row. */
  seq: number
  outcome: Exclude<KeyOutcome, 'ignored'>
  /** The press belonged to the final sentence of the text. */
  finalSegment: boolean
}

export interface SessionState {
  phase: SessionPhase
  texts: readonly string[]
  /** Words shown instead of typed, per sentence; absent when every word is typed. */
  given?: GivenWords
  /** Typeable characters per sentence, for the "time left" estimate. */
  charCounts: readonly number[]
  index: number
  engine: DictationState
  /** Time of the first key press on the current sentence; null until the learner starts typing it. */
  startedAt: number | null
  /** The current sentence is complete and the next one has not been shown yet. */
  sentenceDone: boolean
  results: readonly SegmentResult[]
  /** Mistyped expected character → count, over the finished sentences. */
  mistakes: Readonly<Record<string, number>>
  /** The mistyped letters of the finished sentences, each read as the spelling pattern it belongs to. */
  slips: readonly SpellingSlip[]
  lastKey: LastKey | null
}

export type SessionAction =
  | { type: 'start' }
  | { type: 'key'; char: string; now: number; options: DictationOptions }
  | { type: 'clear-pending' }
  | { type: 'advance' }
  | { type: 'restart' }

/** A sentence finished faster than this is measured as if it took this long, so one-word lines cannot report absurd speeds. */
export const MIN_SENTENCE_MS = 1000

export function createSession(texts: readonly string[], given?: GivenWords): SessionState {
  return {
    phase: 'intro',
    texts,
    given,
    charCounts: texts.map((text) => buildCells(text, given?.(text)).filter((cell) => cell.typeable).length),
    index: 0,
    engine: createDictation(texts[0] ?? '', given?.(texts[0] ?? '')),
    startedAt: null,
    sentenceDone: false,
    results: [],
    mistakes: {},
    slips: [],
    lastKey: null,
  }
}

function mergeMistakes(
  into: Readonly<Record<string, number>>,
  from: Readonly<Record<string, number>>,
): Record<string, number> {
  const merged: Record<string, number> = { ...into }
  for (const [char, count] of Object.entries(from)) merged[char] = (merged[char] ?? 0) + count
  return merged
}

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'start':
      return state.phase === 'intro' ? { ...state, phase: 'typing' } : state

    case 'key': {
      if (state.phase !== 'typing' || state.sentenceDone) return state
      const { state: engine, outcome } = applyKey(state.engine, action.char, action.options)
      if (outcome === 'ignored') return state

      const startedAt = state.startedAt ?? action.now
      const lastKey: LastKey = {
        seq: (state.lastKey?.seq ?? 0) + 1,
        outcome,
        finalSegment: state.index === state.texts.length - 1,
      }
      if (outcome !== 'complete') return { ...state, engine, startedAt, lastKey }

      const elapsedMs = Math.max(MIN_SENTENCE_MS, action.now - startedAt)
      const stats = computeStats(engine, elapsedMs)
      const result: SegmentResult = {
        keystrokes: engine.keystrokes,
        errors: engine.errors,
        correctCharacters: stats.correctCharacters,
        elapsedMs,
      }
      return {
        ...state,
        engine,
        startedAt,
        sentenceDone: true,
        results: [...state.results, result],
        mistakes: mergeMistakes(state.mistakes, engine.mistakes),
        slips: [...state.slips, ...engine.slips.map((slip) => classifySlip(engine.cells, slip))],
        lastKey,
      }
    }

    case 'clear-pending':
      if (state.phase !== 'typing' || state.engine.pending === '') return state
      return { ...state, engine: clearPending(state.engine) }

    case 'advance': {
      if (state.phase !== 'typing' || !state.sentenceDone) return state
      const next = state.index + 1
      if (next >= state.texts.length) return { ...state, phase: 'finished' }
      return { ...state, index: next, engine: createDictation(state.texts[next], state.given?.(state.texts[next])), startedAt: null, sentenceDone: false }
    }

    case 'restart':
      return createSession(state.texts, state.given)
  }
}

export interface RunStats extends DictationStats {
  keystrokes: number
  errors: number
  elapsedMs: number
}

/** Accuracy and speed over everything typed so far, the sentence in progress included. */
export function runStats(state: SessionState, now: number): RunStats {
  const parts: SegmentResult[] = [...state.results]
  if (!state.sentenceDone && state.phase !== 'finished') {
    parts.push({
      keystrokes: state.engine.keystrokes,
      errors: state.engine.errors,
      correctCharacters: countCorrectCharacters(state.engine),
      elapsedMs: state.startedAt === null ? 0 : Math.max(0, now - state.startedAt),
    })
  }
  const combined = combineStats(parts)
  return {
    ...combined,
    keystrokes: parts.reduce((sum, part) => sum + part.keystrokes, 0),
    errors: parts.reduce((sum, part) => sum + part.errors, 0),
    elapsedMs: parts.reduce((sum, part) => sum + part.elapsedMs, 0),
  }
}

/** Typeable characters still ahead, the rest of the current sentence included. */
export function remainingCharacters(state: SessionState): number {
  if (state.phase === 'finished') return 0
  const ahead = state.charCounts.slice(state.index + 1).reduce((sum, count) => sum + count, 0)
  const currentLeft = state.sentenceDone || isFinished(state.engine) ? 0 : (state.charCounts[state.index] ?? 0) - countCorrectCharacters(state.engine)
  return ahead + Math.max(0, currentLeft)
}

/** The letters the learner got wrong most often (spaces excluded), worst first. */
export function topMistakes(state: SessionState, limit = 5): { char: string; count: number }[] {
  return Object.entries(state.mistakes)
    .filter(([char]) => char.trim() !== '')
    .map(([char, count]) => ({ char, count }))
    .sort((a, b) => b.count - a.count || a.char.localeCompare(b.char))
    .slice(0, limit)
}
