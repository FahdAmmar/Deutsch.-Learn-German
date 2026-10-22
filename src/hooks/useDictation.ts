import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'

import { HINT_AFTER_ERRORS, estimateMinutesLeft, type GivenWords } from '@/lib/dictation/engine'
import { soundCueFor } from '@/lib/dictation/feedback'
import {
  createSession,
  remainingCharacters,
  runStats,
  sessionReducer,
  topMistakes,
  type RunStats,
  type SessionState,
} from '@/lib/dictation/session'
import { useSound } from '@/hooks/useSound'
import { GERMAN_LOCALE, speechService } from '@/services/speech'
import { useSettingsStore } from '@/store/settingsStore'
import type { DictationSegmentSource, DictationSource, FinishedDictationRun } from '@/types'

/** How long a finished sentence stays on screen (with its translation) before the next one appears. */
export const ADVANCE_DELAY_MS = 900

export interface DictationController {
  state: SessionState
  segment: DictationSegmentSource
  total: number
  stats: RunStats
  minutesLeft: number
  mistakes: { char: string; count: number }[]
  /** Two or more wrong presses in a row on the same letter — the screen should reveal it. */
  showHint: boolean
  audioError: string | null
  audioSupported: boolean
  start: () => void
  press: (char: string) => void
  clearPending: () => void
  replay: () => void
  restart: () => void
}

/**
 * Drives a letter-by-letter dictation of a text: reads each part aloud, feeds
 * key presses to the pure session reducer, answers every press with a sound,
 * moves on when a part is done and reports the result when the last one is.
 * Where the result is saved is the caller's business (`onFinished`).
 *
 * Audio starts from the learner's first tap (browsers only allow speech after
 * a gesture), which is also why the screen opens with a "tap to start" step.
 */
/** How a dictation differs from copying the text letter by letter. */
export interface DictationPlan {
  /** Words the learner is given instead of typing. */
  given?: GivenWords
  /** Read each part aloud on its own; off for typing from memory, where the learner asks to hear it. */
  autoSpeak?: boolean
}

export function useDictation(
  source: DictationSource,
  onFinished: (run: FinishedDictationRun) => void,
  { given, autoSpeak = true }: DictationPlan = {},
): DictationController {
  const texts = useMemo(() => source.segments.map((segment) => segment.text), [source.segments])
  // The plan is read once, when the dictation opens: a different plan is a different dictation and remounts it.
  const [state, dispatch] = useReducer(sessionReducer, texts, (initialTexts) => createSession(initialTexts, given))

  const rate = useSettingsStore((settings) => settings.settings.speechRate)
  const acceptTransliteration = useSettingsStore((settings) => settings.settings.dictationAcceptTransliteration)
  const playSound = useSound()

  const [now, setNow] = useState(() => Date.now())
  const [audioError, setAudioError] = useState<string | null>(null)

  const rateRef = useRef(rate)
  const segmentsRef = useRef(source.segments)
  const onFinishedRef = useRef(onFinished)
  const playSoundRef = useRef(playSound)
  const recordedRef = useRef(false)
  const autoSpeakRef = useRef(autoSpeak)
  useEffect(() => {
    autoSpeakRef.current = autoSpeak
    rateRef.current = rate
    segmentsRef.current = source.segments
    onFinishedRef.current = onFinished
    playSoundRef.current = playSound
  })

  const speakAt = useCallback((index: number) => {
    const segment = segmentsRef.current[index]
    if (!segment) return
    setAudioError(null)
    speechService.speak(segment.text, {
      language: GERMAN_LOCALE,
      rate: rateRef.current,
      pitch: segment.pitch,
      onError: (message) => setAudioError(message),
    })
  }, [])

  const start = useCallback(() => {
    dispatch({ type: 'start' })
    if (autoSpeakRef.current) speakAt(0)
  }, [speakAt])

  const press = useCallback(
    (char: string) => {
      const timestamp = Date.now()
      setNow(timestamp)
      dispatch({ type: 'key', char, now: timestamp, options: { acceptTransliteration } })
    },
    [acceptTransliteration],
  )

  const clearPending = useCallback(() => dispatch({ type: 'clear-pending' }), [])
  const replay = useCallback(() => speakAt(state.index), [speakAt, state.index])

  const restart = useCallback(() => {
    speechService.stop()
    recordedRef.current = false
    dispatch({ type: 'restart' })
  }, [])

  // A finished sentence stays visible for a moment, then the next one is shown and read.
  useEffect(() => {
    if (state.phase !== 'typing' || !state.sentenceDone) return
    const next = state.index + 1
    const total = state.texts.length
    const timer = window.setTimeout(() => {
      dispatch({ type: 'advance' })
      if (next < total && autoSpeakRef.current) speakAt(next)
    }, ADVANCE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [state.phase, state.sentenceDone, state.index, state.texts.length, speakAt])

  // The live WPM figure ticks once a second while the learner is mid-sentence.
  useEffect(() => {
    if (state.phase !== 'typing' || state.startedAt === null || state.sentenceDone) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [state.phase, state.startedAt, state.sentenceDone])

  // Answer every judged key press: a tick for a right letter, a low tone for a wrong one, a chime
  // when a part is finished. Keyed on the press itself, so changing the sound setting never replays one.
  const lastKey = state.lastKey
  useEffect(() => {
    if (lastKey) playSoundRef.current(soundCueFor(lastKey))
  }, [lastKey])

  // Report once, when the last sentence is done.
  useEffect(() => {
    if (state.phase !== 'finished' || recordedRef.current) return
    recordedRef.current = true
    const final = runStats(state, 0)
    onFinishedRef.current({ accuracy: final.accuracy, wpm: final.wpm, slips: state.slips })
  }, [state])

  // Leaving the page must silence the reader.
  useEffect(() => () => speechService.stop(), [])

  const stats = useMemo(() => runStats(state, now), [state, now])
  const minutesLeft = estimateMinutesLeft(remainingCharacters(state), stats.wpm)
  const mistakes = useMemo(() => topMistakes(state), [state])

  return {
    state,
    segment: source.segments[state.index] ?? source.segments[0],
    total: source.segments.length,
    stats,
    minutesLeft,
    mistakes,
    showHint: state.engine.streak >= HINT_AFTER_ERRORS,
    audioError,
    audioSupported: speechService.isSupported(),
    start,
    press,
    clearPending,
    replay,
    restart,
  }
}
