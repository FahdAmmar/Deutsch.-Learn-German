import { useCallback, useEffect, useRef, useState } from 'react'

import { GERMAN_LOCALE, speechService } from '@/services/speech'
import { useSettingsStore } from '@/store/settingsStore'
import type { StorySegment } from '@/types'

export type PlayerStatus = 'idle' | 'playing' | 'paused'

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
  play: () => void
  pause: () => void
  toggle: () => void
  /** Moves to a segment; keeps playing if it was playing. */
  seek: (index: number) => void
  /** Moves to a segment and starts reading from it. */
  playFrom: (index: number) => void
  replay: () => void
  setRate: (rate: number) => void
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

  const statusRef = useRef<PlayerStatus>('idle')
  const indexRef = useRef(0)
  const runRef = useRef(0)
  const rateRef = useRef(rate)
  const segmentsRef = useRef(segments)
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
          if (target + 1 < segmentsRef.current.length) speakFromRef.current(target + 1)
          else update('idle', 0)
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

  const stopSpeaking = useCallback(() => {
    runRef.current += 1
    speechService.stop()
  }, [])

  const play = useCallback(() => {
    if (segmentsRef.current.length === 0 || !speechService.isSupported()) return
    speakFrom(indexRef.current)
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
    speakFrom(0)
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
      if (statusRef.current === 'playing') speechService.stop()
    },
    [],
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
    play,
    pause,
    toggle,
    seek,
    playFrom,
    replay,
    setRate,
  }
}
