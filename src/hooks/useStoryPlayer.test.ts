import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useSettingsStore } from '@/store/settingsStore'
import type { StorySegment } from '@/types'

import { LOOP_GAP_MS, nextLoopMode, segmentAfter, useStoryPlayer } from './useStoryPlayer'

interface SpeakCall {
  text: string
  options: {
    language: string
    rate?: number
    pitch?: number
    onBoundary?: (charIndex: number) => void
    onEnd?: () => void
    onError?: (message: string) => void
  }
}

const speech = vi.hoisted(() => ({
  calls: [] as SpeakCall[],
  supported: true,
  stop: vi.fn(),
}))

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: {
    isSupported: () => speech.supported,
    speak: (text: string, options: SpeakCall['options']) => {
      speech.calls.push({ text, options })
    },
    stop: speech.stop,
    getStatus: () => 'idle',
  },
}))

const SEGMENTS: StorySegment[] = [
  { index: 0, text: 'Eins.', pitch: 1.05 },
  { index: 1, text: 'Zwei.', pitch: 0.85 },
  { index: 2, text: 'Drei.' },
  { index: 3, text: 'Vier.' },
]

const lastCall = () => speech.calls[speech.calls.length - 1]

describe('useStoryPlayer', () => {
  beforeEach(() => {
    speech.calls.length = 0
    speech.supported = true
    speech.stop.mockClear()
    useSettingsStore.getState().resetToDefaults()
  })

  it('starts idle at the first segment', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    expect(result.current).toMatchObject({ status: 'idle', index: 0, progress: 0, isSupported: true, error: null })
  })

  it('plays the first segment in German at the saved speed, with its pitch', () => {
    useSettingsStore.getState().setSpeechRate(1.1)
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))

    act(() => result.current.play())

    expect(result.current.status).toBe('playing')
    expect(lastCall().text).toBe('Eins.')
    expect(lastCall().options).toMatchObject({ language: 'de-DE', rate: 1.1, pitch: 1.05 })
  })

  it('moves on to the next segment when one finishes, and returns to idle after the last', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.play())

    act(() => lastCall().options.onEnd?.())
    expect(result.current.index).toBe(1)
    expect(lastCall().text).toBe('Zwei.')

    act(() => lastCall().options.onEnd?.())
    act(() => lastCall().options.onEnd?.())
    expect(lastCall().text).toBe('Vier.')

    act(() => lastCall().options.onEnd?.())
    expect(result.current).toMatchObject({ status: 'idle', index: 0, progress: 0 })
  })

  it('pauses by stopping speech, keeps its place, and resumes by re-reading that segment', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.play())
    act(() => lastCall().options.onEnd?.())

    act(() => result.current.pause())
    expect(speech.stop).toHaveBeenCalled()
    expect(result.current).toMatchObject({ status: 'paused', index: 1 })

    act(() => result.current.play())
    expect(lastCall().text).toBe('Zwei.')
    expect(result.current.status).toBe('playing')
  })

  it('ignores the end callback of a segment that was already replaced or stopped', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.play())
    const stale = lastCall().options.onEnd

    act(() => result.current.pause())
    act(() => stale?.())

    expect(result.current).toMatchObject({ status: 'paused', index: 0 })
    expect(speech.calls).toHaveLength(1)
  })

  it('seeks: jumps and keeps playing while playing, only moves when not playing', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))

    act(() => result.current.seek(2))
    expect(result.current).toMatchObject({ status: 'idle', index: 2 })
    expect(speech.calls).toHaveLength(0)

    act(() => result.current.play())
    expect(lastCall().text).toBe('Drei.')

    act(() => result.current.seek(3))
    expect(lastCall().text).toBe('Vier.')
    expect(result.current).toMatchObject({ status: 'playing', index: 3 })
  })

  it('clamps seeking to the available segments', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.seek(99))
    expect(result.current.index).toBe(3)
    act(() => result.current.seek(-5))
    expect(result.current.index).toBe(0)
  })

  it('playFrom jumps to a segment and starts reading there', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.playFrom(2))
    expect(lastCall().text).toBe('Drei.')
    expect(result.current).toMatchObject({ status: 'playing', index: 2 })
  })

  it('replays from the beginning', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.seek(3))
    act(() => result.current.replay())
    expect(lastCall().text).toBe('Eins.')
    expect(result.current).toMatchObject({ status: 'playing', index: 0 })
  })

  it('applies a new speed straight away while playing, and saves it as the preference', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.play())

    act(() => result.current.setRate(1.2))

    expect(lastCall().text).toBe('Eins.')
    expect(lastCall().options.rate).toBe(1.2)
    expect(useSettingsStore.getState().settings.speechRate).toBe(1.2)
  })

  it('reports progress inside a segment from word boundaries', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.play())
    act(() => lastCall().options.onBoundary?.(2))
    expect(result.current.fraction).toBeCloseTo(0.4)
    expect(result.current.progress).toBeCloseTo(0.1)
  })

  it('pauses and exposes the error when speech fails', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.play())
    act(() => lastCall().options.onError?.('synthesis-failed'))
    expect(result.current).toMatchObject({ status: 'paused', error: 'synthesis-failed' })
  })

  it('does nothing when speech is unsupported', () => {
    speech.supported = false
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.play())
    act(() => result.current.replay())
    expect(result.current).toMatchObject({ status: 'idle', isSupported: false })
    expect(speech.calls).toHaveLength(0)
  })

  it('silences speech when the page is left', () => {
    const { result, unmount } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.play())
    speech.stop.mockClear()

    unmount()
    expect(speech.stop).toHaveBeenCalled()
  })
})

describe('useStoryPlayer — repeating', () => {
  beforeEach(() => {
    speech.calls.length = 0
    speech.supported = true
    speech.stop.mockClear()
    useSettingsStore.getState().resetToDefaults()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const spokenTexts = () => speech.calls.map((call) => call.text)
  const finishSegment = () => act(() => lastCall().options.onEnd?.())
  const waitForGap = () => act(() => vi.advanceTimersByTime(LOOP_GAP_MS))

  it('moves through off → sentence → range → off', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    expect(result.current.loop).toBe('off')

    act(() => result.current.cycleLoop())
    expect(result.current.loop).toBe('sentence')
    act(() => result.current.cycleLoop())
    expect(result.current.loop).toBe('range')
    act(() => result.current.cycleLoop())
    expect(result.current.loop).toBe('off')
  })

  it('says the same sentence again after a short pause, over and over', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.cycleLoop())
    act(() => result.current.seek(1))
    act(() => result.current.play())

    finishSegment()
    expect(spokenTexts()).toEqual(['Zwei.'])
    waitForGap()
    expect(spokenTexts()).toEqual(['Zwei.', 'Zwei.'])

    finishSegment()
    waitForGap()
    expect(spokenTexts()).toEqual(['Zwei.', 'Zwei.', 'Zwei.'])
    expect(result.current).toMatchObject({ status: 'playing', index: 1 })
  })

  it('does not repeat once the learner pauses during the pause', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.cycleLoop())
    act(() => result.current.play())

    finishSegment()
    act(() => result.current.pause())
    waitForGap()

    expect(spokenTexts()).toEqual(['Eins.'])
    expect(result.current.status).toBe('paused')
  })

  it('reads the next sentence instead when the repeat is switched off', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.cycleLoop())
    act(() => result.current.play())
    act(() => result.current.cycleLoop()) // range
    act(() => result.current.cycleLoop()) // off

    finishSegment()
    expect(spokenTexts()).toEqual(['Eins.', 'Zwei.'])
  })

  it('goes round a passage chosen with two taps', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.cycleLoop())
    act(() => result.current.cycleLoop())
    expect(result.current).toMatchObject({ loop: 'range', range: null, awaitingRangeEnd: false })

    act(() => result.current.selectSegment(1))
    expect(result.current).toMatchObject({ range: { start: 1, end: 1 }, awaitingRangeEnd: true })
    expect(spokenTexts()).toEqual(['Zwei.'])

    act(() => result.current.selectSegment(3))
    expect(result.current).toMatchObject({ range: { start: 1, end: 3 }, awaitingRangeEnd: false })
    expect(spokenTexts()).toEqual(['Zwei.', 'Zwei.'])

    finishSegment()
    expect(lastCall().text).toBe('Drei.')
    finishSegment()
    expect(lastCall().text).toBe('Vier.')

    finishSegment() // the last sentence of the passage: back to its first, after the pause
    expect(lastCall().text).toBe('Vier.')
    waitForGap()
    expect(lastCall().text).toBe('Zwei.')
    expect(result.current.index).toBe(1)
  })

  it('takes the two taps in either order', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.cycleLoop())
    act(() => result.current.cycleLoop())

    act(() => result.current.selectSegment(2))
    act(() => result.current.selectSegment(0))

    expect(result.current.range).toEqual({ start: 0, end: 2 })
    expect(lastCall().text).toBe('Eins.')
  })

  it('starts a new passage on the third tap, and forgets the passage when range mode is left', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.cycleLoop())
    act(() => result.current.cycleLoop())
    act(() => result.current.selectSegment(0))
    act(() => result.current.selectSegment(1))
    act(() => result.current.selectSegment(3))

    expect(result.current).toMatchObject({ range: { start: 3, end: 3 }, awaitingRangeEnd: true })

    act(() => result.current.cycleLoop())
    expect(result.current).toMatchObject({ loop: 'off', range: null, awaitingRangeEnd: false })
  })

  it('plays a passage from its first sentence when play is pressed outside it', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))
    act(() => result.current.cycleLoop())
    act(() => result.current.cycleLoop())
    act(() => result.current.selectSegment(2))
    act(() => result.current.selectSegment(3))
    act(() => result.current.pause())
    act(() => result.current.seek(0))

    act(() => result.current.play())

    expect(lastCall().text).toBe('Drei.')
  })

  it('still starts reading from a tapped sentence when no passage is being chosen', () => {
    const { result } = renderHook(() => useStoryPlayer(SEGMENTS))

    act(() => result.current.selectSegment(2))

    expect(lastCall().text).toBe('Drei.')
    expect(result.current).toMatchObject({ status: 'playing', index: 2, range: null })
  })
})

describe('segmentAfter', () => {
  it('goes on to the next segment, and stops after the last', () => {
    expect(segmentAfter(0, 4, 'off', null)).toBe(1)
    expect(segmentAfter(3, 4, 'off', null)).toBeNull()
  })

  it('repeats the same segment in sentence mode', () => {
    expect(segmentAfter(2, 4, 'sentence', null)).toBe(2)
  })

  it('goes round a passage and ignores a missing one', () => {
    const range = { start: 1, end: 2 }
    expect(segmentAfter(1, 4, 'range', range)).toBe(2)
    expect(segmentAfter(2, 4, 'range', range)).toBe(1)
    expect(segmentAfter(0, 4, 'range', range)).toBe(1)
    expect(segmentAfter(3, 4, 'range', range)).toBe(1)
    expect(segmentAfter(3, 4, 'range', null)).toBeNull()
  })
})

describe('nextLoopMode', () => {
  it('cycles through every mode and back', () => {
    expect(nextLoopMode('off')).toBe('sentence')
    expect(nextLoopMode('sentence')).toBe('range')
    expect(nextLoopMode('range')).toBe('off')
  })
})
