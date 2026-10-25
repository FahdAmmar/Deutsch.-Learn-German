import { useCallback, useEffect, useRef, useState } from 'react'

import { GERMAN_LOCALE, speechService } from '@/services/speech'
import { useSettingsStore } from '@/store/settingsStore'
import type { StorySegment } from '@/types'

export type PlayerStatus = 'idle' | 'playing' | 'paused'

/** What happens when a segment ends: carry on (off), say it again (sentence), or go round a chosen passage (range). */
export type LoopMode = 'off' | 'sentence' | 'range'

/** A passage of the story, first and last segment included. */
export interface SegmentRange {
  start: number
  end: number
}

/** The pause before a repeat starts, long enough to say the sentence back yourself. */
export const LOOP_GAP_MS = 700

/** The mode a press of the repeat button moves to. */
export function nextLoopMode(mode: LoopMode): LoopMode {
  return mode === 'off' ? 'sentence' : mode === 'sentence' ? 'range' : 'off'
}

/**
 * The segment to read after `finished`, or null when the story is over. A repeat is a segment at or
 * before the one that just ended; the caller waits a moment before starting it.
 */
export function segmentAfter(finished: number, total: number, mode: LoopMode, range: SegmentRange | null): number | null {
  if (mode === 'sentence') return finished
  if (mode === 'range' && range) {
    if (finished >= range.end) return range.start
    return finished + 1 < total ? finished + 1 : null
  }
  return finished + 1 < total ? finished + 1 : null
}

export interface StoryPlayer {
  status: PlayerStatus
  /** The segment being read (or that playback will resume from). */
  index: number
  /** 0–1 progress through the current segment; stays 0 where the speech engine reports no word positions. */
  fraction: number
  /** 0–1 progress through the whole story. */
  progress: number
  rate: number
  isSupported: boolean
  error: string | null
  loop: LoopMode
  /** The passage chosen in range mode, or null until the learner has tapped its first sentence. */
  range: SegmentRange | null
  /** In range mode, true after the first sentence is chosen and the last one is still to come. */
  awaitingRangeEnd: boolean
  play: () => void
  pause: () => void
  toggle: () => void
  /** Moves to a segment; keeps playing if it was playing. */
  seek: (index: number) => void
  /** Moves to a segment and starts reading from it. */
  playFrom: (index: number) => void
  replay: () => void
  setRate: (rate: number) => void
  /** Off → repeat the sentence → repeat a passage → off. */
  cycleLoop: () => void
  /**
   * What tapping a sentence does: starts reading from it, or — in range mode — chooses the first and then
   * the last sentence of the passage to repeat.
   */
  selectSegment: (index: number) => void
}

/**
 * Reads a story aloud one segment (sentence or conversation line) at a time
 * through the shared speech service.
 *
 * Speech engines can't reliably pause or seek inside an utterance, so the
 * segment is the unit of control: pausing stops the engine and resuming
 * re-reads the current segment from its start; seeking jumps between segments.
 * Every started utterance gets a run id, so callbacks from one that was
 * replaced or stopped are ignored.
 */
export function useStoryPlayer(segments: readonly StorySegment[]): StoryPlayer {
  const rate = useSettingsStore((state) => state.settings.speechRate)
  const setSpeechRate = useSettingsStore((state) => state.setSpeechRate)

  const [status, setStatus] = useState<PlayerStatus>('idle')
  const [index, setIndex] = useState(0)
  const [fraction, setFraction] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loop, setLoop] = useState<LoopMode>('off')
  const [range, setRange] = useState<SegmentRange | null>(null)
  const [awaitingRangeEnd, setAwaitingRangeEnd] = useState(false)

  const statusRef = useRef<PlayerStatus>('idle')
  const indexRef = useRef(0)
  const runRef = useRef(0)
  const rateRef = useRef(rate)
  const segmentsRef = useRef(segments)
  const loopRef = useRef<LoopMode>('off')
  const rangeRef = useRef<SegmentRange | null>(null)
  const awaitingEndRef = useRef(false)
  const gapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // A segment's end callback runs later and must call the latest `speakFrom` — and a callback can't
  // reference the function that creates it — so it goes through this ref.
  const speakFromRef = useRef<(target: number) => void>(() => {})

  const update = useCallback((nextStatus: PlayerStatus, nextIndex: number, nextFraction = 0) => {
    statusRef.current = nextStatus
    indexRef.current = nextIndex
    setStatus(nextStatus)
    setIndex(nextIndex)
    setFraction(nextFraction)
  }, [])

  const speakFrom = useCallback(
    (target: number) => {
      const list = segmentsRef.current
      const segment = list[target]
      if (!segment) return

      const run = ++runRef.current
      setError(null)
      update('playing', target)

      speechService.speak(segment.text, {
        language: GERMAN_LOCALE,
        rate: rateRef.current,
        pitch: segment.pitch,
        onBoundary: (charIndex) => {
          if (run === runRef.current) setFraction(Math.min(1, charIndex / Math.max(1, segment.text.length)))
        },
        onEnd: () => {
          if (run !== runRef.current) return
          const next = segmentAfter(target, segmentsRef.current.length, loopRef.current, rangeRef.current)
          if (next === null) {
            update('idle', 0)
          } else if (next > target) {
            speakFromRef.current(next)
          } else {
            // A repeat: a short pause first. Anything that stops or moves the player bumps the run id, which cancels it.
            gapTimerRef.current = setTimeout(() => {
              gapTimerRef.current = null
              if (run === runRef.current && statusRef.current === 'playing') speakFromRef.current(next)
            }, LOOP_GAP_MS)
          }
        },
        onError: (message) => {
          if (run !== runRef.current) return
          update('paused', target)
          setError(message)
        },
      })
    },
    [update],
  )

  // Keep the "latest value" refs current after every render (never during it).
  useEffect(() => {
    segmentsRef.current = segments
    rateRef.current = rate
    speakFromRef.current = speakFrom
  })

  const clearGap = useCallback(() => {
    if (gapTimerRef.current !== null) clearTimeout(gapTimerRef.current)
    gapTimerRef.current = null
  }, [])

  const stopSpeaking = useCallback(() => {
    runRef.current += 1
    clearGap()
    speechService.stop()
  }, [clearGap])

  const play = useCallback(() => {
    if (segmentsRef.current.length === 0 || !speechService.isSupported()) return
    const chosen = loopRef.current === 'range' ? rangeRef.current : null
    const outside = chosen !== null && (indexRef.current < chosen.start || indexRef.current > chosen.end)
    speakFrom(outside ? chosen.start : indexRef.current)
  }, [speakFrom])

  const pause = useCallback(() => {
    if (statusRef.current !== 'playing') return
    stopSpeaking()
    update('paused', indexRef.current)
  }, [stopSpeaking, update])

  const toggle = useCallback(() => {
    if (statusRef.current === 'playing') pause()
    else play()
  }, [pause, play])

  const seek = useCallback(
    (target: number) => {
      const last = segmentsRef.current.length - 1
      if (last < 0) return
      const clamped = Math.min(Math.max(Math.round(target), 0), last)
      if (statusRef.current === 'playing') speakFrom(clamped)
      else update(statusRef.current, clamped)
    },
    [speakFrom, update],
  )

  const playFrom = useCallback(
    (target: number) => {
      if (!speechService.isSupported()) return
      seek(target)
      if (statusRef.current !== 'playing') speakFrom(Math.min(Math.max(Math.round(target), 0), segmentsRef.current.length - 1))
    },
    [seek, speakFrom],
  )

  const replay = useCallback(() => {
    if (!speechService.isSupported()) return
    speakFrom(loopRef.current === 'range' && rangeRef.current ? rangeRef.current.start : 0)
  }, [speakFrom])

  const setRate = useCallback(
    (next: number) => {
      setSpeechRate(next)
      rateRef.current = next
      // Apply the new speed straight away rather than from the next segment.
      if (statusRef.current === 'playing') speakFrom(indexRef.current)
    },
    [setSpeechRate, speakFrom],
  )

  // Leaving the page must silence it.
  useEffect(
    () => () => {
      runRef.current += 1
      if (gapTimerRef.current !== null) clearTimeout(gapTimerRef.current)
      if (statusRef.current === 'playing') speechService.stop()
    },
    [],
  )

  const setRangeState = useCallback((next: SegmentRange | null, awaitingEnd: boolean) => {
    rangeRef.current = next
    awaitingEndRef.current = awaitingEnd
    setRange(next)
    setAwaitingRangeEnd(awaitingEnd)
  }, [])

  const cycleLoop = useCallback(() => {
    const next = nextLoopMode(loopRef.current)
    loopRef.current = next
    setLoop(next)
    // Leaving range mode forgets the passage; entering it starts a fresh choice.
    setRangeState(null, false)
  }, [setRangeState])

  const selectSegment = useCallback(
    (target: number) => {
      const last = segmentsRef.current.length - 1
      if (last < 0 || !speechService.isSupported()) return
      const clamped = Math.min(Math.max(Math.round(target), 0), last)

      if (loopRef.current !== 'range') {
        playFrom(clamped)
        return
      }
      if (awaitingEndRef.current && rangeRef.current) {
        const first = rangeRef.current.start
        const chosen = { start: Math.min(first, clamped), end: Math.max(first, clamped) }
        setRangeState(chosen, false)
        speakFrom(chosen.start)
      } else {
        setRangeState({ start: clamped, end: clamped }, true)
        speakFrom(clamped)
      }
    },
    [playFrom, setRangeState, speakFrom],
  )

  const total = segments.length
  const progress = total === 0 ? 0 : Math.min(1, (index + fraction) / total)

  return {
    status,
    index,
    fraction,
    progress,
    rate,
    isSupported: speechService.isSupported(),
    error,
    loop,
    range,
    awaitingRangeEnd,
    play,
    pause,
    toggle,
    seek,
    playFrom,
    replay,
    setRate,
    cycleLoop,
    selectSegment,
  }
}
