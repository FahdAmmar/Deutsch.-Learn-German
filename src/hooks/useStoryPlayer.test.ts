import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useSettingsStore } from '@/store/settingsStore'
import type { StorySegment } from '@/types'

import { useStoryPlayer } from './useStoryPlayer'

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
