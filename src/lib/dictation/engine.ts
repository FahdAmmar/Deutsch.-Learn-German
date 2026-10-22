/**
 * Letter-by-letter dictation engine — pure logic, no React, no DOM, no clock.
 *
 * A sentence is turned into "cells". Letters, digits and spaces must be typed;
 * every other character (punctuation, apostrophes, dashes) is filled in
 * automatically, so the learner trains on German spelling rather than on
 * hunting for punctuation keys on a phone keyboard.
 *
 * Typing is strict about letters, *including capitalisation* — German nouns
 * are capitalised, and that is part of what is being learned. A wrong key is
 * rejected (the cursor does not move) and counted as an error.
 *
 * Learners on an Arabic or US keyboard often have no ä ö ü ß. With
 * `acceptTransliteration` on (the default), "ae" is accepted for "ä", "oe" for
 * "ö", "ue" for "ü" and "ss" for "ß".
 */

export interface DictationCell {
  char: string
  /** Must be typed by the learner (letter, digit or space). Otherwise auto-filled. */
  typeable: boolean
}

export interface DictationOptions {
  acceptTransliteration: boolean
}

export const DEFAULT_DICTATION_OPTIONS: DictationOptions = { acceptTransliteration: true }

/** A cell the learner mistyped, and what they pressed instead; only the first wrong press per cell is kept. */
export interface DictationSlip {
  position: number
  typed: string
}

export interface DictationState {
  cells: readonly DictationCell[]
  /** Index of the next cell to fill. Equals `cells.length` when finished. */
  position: number
  /** Characters typed so far toward a multi-letter transliteration (e.g. "a" while "ä" is expected). */
  pending: string
  /** Every key press that was judged right or wrong (the unit of accuracy). */
  keystrokes: number
  errors: number
  /** Wrong presses in a row on the current cell; resets on progress. Drives the hint. */
  streak: number
  /** Expected character → how often it was mistyped. */
  mistakes: Readonly<Record<string, number>>
  /** The cell the learner last got wrong, for a brief visual flash. */
  lastError: { position: number; typed: string } | null
  /** Every cell mistyped at least once, in order — what the spelling analysis works from. */
  slips: readonly DictationSlip[]
}

export type KeyOutcome = 'correct' | 'partial' | 'wrong' | 'ignored' | 'complete'

export interface KeyResult {
  state: DictationState
  outcome: KeyOutcome
}

const TRANSLITERATIONS: Readonly<Record<string, string>> = {
  ä: 'ae',
  ö: 'oe',
  ü: 'ue',
  Ä: 'Ae',
  Ö: 'Oe',
  Ü: 'Ue',
  ß: 'ss',
}

/** After this many wrong presses on one cell, the UI should reveal the expected letter. */
export const HINT_AFTER_ERRORS = 2

const TYPEABLE = /[\p{L}\p{N}\s]/u

/** Which words of a sentence the learner is given instead of typing (by position: 0 is the first word). */
export type GivenWords = (text: string) => ReadonlySet<number>

const NO_GIVEN_WORDS: ReadonlySet<number> = new Set()
const WORD_CHAR = /[\p{L}\p{N}]/u
const APOSTROPHE = /['’]/u

/**
 * One cell per character. A letter of a given word is not typeable, so the cursor passes over it: the word
 * is shown, and only the others are typed. A space next to a given word is passed over too — otherwise the
 * learner would have to type a space before every word they were given. Punctuation keeps its usual behaviour.
 */
export function buildCells(text: string, given: ReadonlySet<number> = NO_GIVEN_WORDS): DictationCell[] {
  const chars = Array.from(text.trim().replace(/\s+/g, ' '))
  // The word each character belongs to; a space belongs to the word before it. An apostrophe between two
  // letters (geht’s) is inside the word, so a word is never cut in two.
  const wordOf: number[] = []
  let wordIndex = -1
  let inWord = false
  chars.forEach((char, index) => {
    const isWordChar = WORD_CHAR.test(char)
    const insideWord = APOSTROPHE.test(char) && inWord && WORD_CHAR.test(chars[index + 1] ?? '')
    if (isWordChar && !inWord) wordIndex += 1
    inWord = isWordChar || insideWord
    wordOf.push(wordIndex)
  })
  return chars.map((char, index) => {
    const isWordChar = WORD_CHAR.test(char)
    if (isWordChar) return { char, typeable: !given.has(wordOf[index]) }
    if (char === ' ') return { char, typeable: !given.has(wordOf[index]) && !given.has(wordOf[index] + 1) }
    return { char, typeable: TYPEABLE.test(char) }
  })
}

function skipAuto(cells: readonly DictationCell[], from: number): number {
  let position = from
  while (position < cells.length && !cells[position].typeable) position += 1
  return position
}

export function createDictation(text: string, given?: ReadonlySet<number>): DictationState {
  const cells = buildCells(text, given)
  return {
    cells,
    // A sentence may begin with an opening quote — that is filled in too.
    position: skipAuto(cells, 0),
    pending: '',
    keystrokes: 0,
    errors: 0,
    streak: 0,
    mistakes: {},
    lastError: null,
    slips: [],
  }
}

export function isFinished(state: DictationState): boolean {
  return state.position >= state.cells.length
}

/** Whether the cursor sits where only auto-filled characters remain (nothing left to type). */
function noTypeableLeft(state: DictationState): boolean {
  return skipAuto(state.cells, state.position) >= state.cells.length
}

function recordError(state: DictationState, typed: string): DictationState {
  const expected = state.cells[state.position]?.char ?? ''
  return {
    ...state,
    pending: '',
    keystrokes: state.keystrokes + 1,
    errors: state.errors + 1,
    streak: state.streak + 1,
    mistakes: { ...state.mistakes, [expected]: (state.mistakes[expected] ?? 0) + 1 },
    lastError: { position: state.position, typed },
    slips: state.slips.some((slip) => slip.position === state.position) ? state.slips : [...state.slips, { position: state.position, typed }],
  }
}

function advance(state: DictationState): DictationState {
  // Consume the cell, then any auto-filled punctuation after it.
  return {
    ...state,
    position: skipAuto(state.cells, state.position + 1),
    pending: '',
    keystrokes: state.keystrokes + 1,
    streak: 0,
    lastError: null,
  }
}

/** Applies one typed character. Pure: returns a new state and what happened. */
export function applyKey(state: DictationState, typed: string, options: DictationOptions = DEFAULT_DICTATION_OPTIONS): KeyResult {
  if (isFinished(state) || Array.from(typed).length !== 1) return { state, outcome: 'ignored' }

  const expected = state.cells[state.position].char
  const transliteration = options.acceptTransliteration ? TRANSLITERATIONS[expected] : undefined

  if (transliteration) {
    const attempt = state.pending + typed
    // The umlaut itself is always accepted, whatever the keyboard.
    if (state.pending === '' && typed === expected) return finish(advance(state))
    if (attempt === transliteration) return finish(advance(state))
    if (transliteration.startsWith(attempt)) return { state: { ...state, pending: attempt }, outcome: 'partial' }
    return { state: recordError(state, typed), outcome: 'wrong' }
  }

  if (typed === expected) return finish(advance(state))
  return { state: recordError(state, typed), outcome: 'wrong' }
}

function finish(state: DictationState): KeyResult {
  return { state, outcome: isFinished(state) || noTypeableLeft(state) ? 'complete' : 'correct' }
}

/** Removes a half-typed transliteration ("a" waiting for "e"); nothing else can be undone. */
export function clearPending(state: DictationState): DictationState {
  return state.pending === '' ? state : { ...state, pending: '' }
}

export interface DictationStats {
  /** 0–1. A learner who has not typed anything yet has 1 (nothing wrong so far). */
  accuracy: number
  /** Words per minute, using the standard five-characters-per-word convention. */
  wpm: number
  correctCharacters: number
}

/** Characters that have been filled in correctly, auto-filled punctuation excluded. */
export function countCorrectCharacters(state: DictationState): number {
  let count = 0
  for (let index = 0; index < Math.min(state.position, state.cells.length); index += 1) {
    if (state.cells[index].typeable) count += 1
  }
  return count
}

export function computeStats(state: DictationState, elapsedMs: number): DictationStats {
  const accuracy = state.keystrokes === 0 ? 1 : (state.keystrokes - state.errors) / state.keystrokes
  const correctCharacters = countCorrectCharacters(state)
  const minutes = elapsedMs / 60_000
  const wpm = minutes > 0 ? Math.round(correctCharacters / 5 / minutes) : 0
  return { accuracy, wpm, correctCharacters }
}

/** Combines stats of several sentences into one for the whole story. */
export function combineStats(parts: readonly { keystrokes: number; errors: number; correctCharacters: number; elapsedMs: number }[]): DictationStats {
  const keystrokes = parts.reduce((sum, part) => sum + part.keystrokes, 0)
  const errors = parts.reduce((sum, part) => sum + part.errors, 0)
  const correctCharacters = parts.reduce((sum, part) => sum + part.correctCharacters, 0)
  const elapsedMs = parts.reduce((sum, part) => sum + part.elapsedMs, 0)
  const minutes = elapsedMs / 60_000
  return {
    accuracy: keystrokes === 0 ? 1 : (keystrokes - errors) / keystrokes,
    wpm: minutes > 0 ? Math.round(correctCharacters / 5 / minutes) : 0,
    correctCharacters,
  }
}

/** Rough time left, from the story's length so far. Returns minutes, rounded up, at least 1. */
export function estimateMinutesLeft(remainingCharacters: number, wpm: number): number {
  const effectiveWpm = wpm >= 8 ? wpm : 15 // beginners type slowly; do not divide by ~0
  return Math.max(1, Math.ceil(remainingCharacters / 5 / effectiveWpm))
}

/** True for characters a learner on an Arabic keyboard layout would produce by mistake. */
export function isArabicScript(char: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F]/u.test(char)
}
