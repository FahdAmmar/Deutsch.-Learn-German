import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useSettingsStore } from '@/store/settingsStore'

import type { StoryPlayer } from './useStoryPlayer'
import { useStoryMediaSession } from './useStoryMediaSession'

const service = vi.hoisted(() => ({
  supported: true,
  isSupported: vi.fn(() => service.supported),
  start: vi.fn(),
  setPlaying: vi.fn(),
  stop: vi.fn(),
}))

vi.mock('@/services/mediaSession', () => ({ mediaSessionService: service }))

const STORY = { titleDe: 'Mein Tag', level: 'A1' } as const

function fakePlayer(overrides: Partial<StoryPlayer> = {}): StoryPlayer {
  return {
    status: 'idle',
    index: 2,
    fraction: 0,
    progress: 0,
    rate: 1,
    isSupported: true,
    error: null,
    loop: 'off',
    range: null,
    awaitingRangeEnd: false,
    play: vi.fn(),
    pause: vi.fn(),
    toggle: vi.fn(),
    seek: vi.fn(),
    playFrom: vi.fn(),
    replay: vi.fn(),
    setRate: vi.fn(),
    cycleLoop: vi.fn(),
    selectSegment: vi.fn(),
    ...overrides,
  }
}

describe('useStoryMediaSession', () => {
  beforeEach(() => {
    service.supported = true
    service.isSupported.mockClear()
    service.start.mockClear()
    service.setPlaying.mockClear()
    service.stop.mockClear()
    useSettingsStore.getState().resetToDefaults()
  })

  it('shows the story title and routes the buttons to the player — previous and next move one sentence', () => {
    const player = fakePlayer()
    renderHook(() => useStoryMediaSession(STORY, player))

    expect(service.start).toHaveBeenCalledWith({ title: 'Mein Tag', artist: 'LEARN GERMAN', album: 'A1' }, expect.any(Object))
    const handlers = service.start.mock.calls[0][1]
    handlers.play()
    handlers.pause()
    handlers.previous()
    handlers.next()

    expect(player.play).toHaveBeenCalledOnce()
    expect(player.pause).toHaveBeenCalledOnce()
    expect(player.seek).toHaveBeenNthCalledWith(1, 1)
    expect(player.seek).toHaveBeenNthCalledWith(2, 3)
  })

  it('always calls the latest player, not the one from when the session started', () => {
    const first = fakePlayer({ index: 0 })
    const { rerender } = renderHook(({ player }) => useStoryMediaSession(STORY, player), { initialProps: { player: first } })
    const second = fakePlayer({ index: 5 })
    rerender({ player: second })

    service.start.mock.calls[0][1].next()

    expect(first.seek).not.toHaveBeenCalled()
    expect(second.seek).toHaveBeenCalledWith(6)
    expect(service.start).toHaveBeenCalledTimes(1)
  })

  it('tells the system when the story starts and stops playing', () => {
    const { rerender } = renderHook(({ player }) => useStoryMediaSession(STORY, player), { initialProps: { player: fakePlayer() } })
    expect(service.setPlaying).toHaveBeenLastCalledWith(false)

    rerender({ player: fakePlayer({ status: 'playing' }) })
    expect(service.setPlaying).toHaveBeenLastCalledWith(true)

    rerender({ player: fakePlayer({ status: 'paused' }) })
    expect(service.setPlaying).toHaveBeenLastCalledWith(false)
  })

  it('takes the buttons back when the story is left', () => {
    const { unmount } = renderHook(() => useStoryMediaSession(STORY, fakePlayer()))

    unmount()

    expect(service.stop).toHaveBeenCalledOnce()
  })

  it('does nothing when the learner switched it off', () => {
    useSettingsStore.getState().setLockScreenControls(false)
    renderHook(() => useStoryMediaSession(STORY, fakePlayer({ status: 'playing' })))

    expect(service.start).not.toHaveBeenCalled()
    expect(service.setPlaying).not.toHaveBeenCalled()
  })

  it('does nothing in a browser without Media Session', () => {
    service.supported = false
    renderHook(() => useStoryMediaSession(STORY, fakePlayer()))

    expect(service.start).not.toHaveBeenCalled()
  })
})
