import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { BrowserMediaSessionService } from './browserMediaSession'

interface FakeSession {
  metadata: unknown
  playbackState: string
  setActionHandler: ReturnType<typeof vi.fn>
}

const handlers = () => ({ play: vi.fn(), pause: vi.fn(), previous: vi.fn(), next: vi.fn() })

describe('BrowserMediaSessionService', () => {
  let session: FakeSession
  let audio: { loop: boolean; play: ReturnType<typeof vi.fn>; pause: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    session = { metadata: null, playbackState: 'none', setActionHandler: vi.fn() }
    audio = { loop: false, play: vi.fn().mockResolvedValue(undefined), pause: vi.fn() }

    Object.defineProperty(navigator, 'mediaSession', { value: session, configurable: true })
    vi.stubGlobal(
      'MediaMetadata',
      class {
        init: unknown
        constructor(init: unknown) {
          this.init = init
        }
      },
    )
    // A function (not an arrow) so `new Audio(url)` hands back the fake.
    vi.stubGlobal(
      'Audio',
      vi.fn(function () {
        return audio
      }),
    )
    URL.createObjectURL = vi.fn(() => 'blob:silence')
    URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    Reflect.deleteProperty(navigator, 'mediaSession')
    vi.unstubAllGlobals()
  })

  it('is unsupported, and every call is harmless, where the browser has no Media Session', () => {
    Reflect.deleteProperty(navigator, 'mediaSession')
    const service = new BrowserMediaSessionService()

    expect(service.isSupported()).toBe(false)
    expect(() => {
      service.start({ title: 'Mein Tag', artist: 'LEARN GERMAN' }, handlers())
      service.setPlaying(true)
      service.stop()
    }).not.toThrow()
  })

  it('shows the title and routes the four system buttons to the handlers', () => {
    const service = new BrowserMediaSessionService()
    const given = handlers()

    service.start({ title: 'Mein Tag', artist: 'LEARN GERMAN', album: 'A1' }, given)

    expect(session.metadata).toMatchObject({ init: { title: 'Mein Tag', artist: 'LEARN GERMAN', album: 'A1' } })
    const registered = new Map(session.setActionHandler.mock.calls as [string, () => void][])
    expect([...registered.keys()].sort()).toEqual(['nexttrack', 'pause', 'play', 'previoustrack'])

    registered.get('play')?.()
    registered.get('pause')?.()
    registered.get('previoustrack')?.()
    registered.get('nexttrack')?.()
    expect(given.play).toHaveBeenCalledOnce()
    expect(given.pause).toHaveBeenCalledOnce()
    expect(given.previous).toHaveBeenCalledOnce()
    expect(given.next).toHaveBeenCalledOnce()
  })

  it('keeps going when this browser rejects one of the buttons', () => {
    session.setActionHandler.mockImplementation((action: string) => {
      if (action === 'previoustrack') throw new TypeError('unsupported action')
    })
    const service = new BrowserMediaSessionService()

    expect(() => service.start({ title: 'Mein Tag', artist: 'LEARN GERMAN' }, handlers())).not.toThrow()
    expect(session.setActionHandler).toHaveBeenCalledWith('nexttrack', expect.any(Function))
  })

  it('reports the playback state and holds a silent looping sound while playing', () => {
    const service = new BrowserMediaSessionService()
    service.start({ title: 'Mein Tag', artist: 'LEARN GERMAN' }, handlers())

    service.setPlaying(true)
    expect(session.playbackState).toBe('playing')
    expect(audio.loop).toBe(true)
    expect(audio.play).toHaveBeenCalledOnce()

    service.setPlaying(false)
    expect(session.playbackState).toBe('paused')
    expect(audio.pause).toHaveBeenCalledOnce()
  })

  it('does not break when the browser refuses to play the silent sound', async () => {
    audio.play.mockRejectedValue(new DOMException('blocked', 'NotAllowedError'))
    const service = new BrowserMediaSessionService()
    service.start({ title: 'Mein Tag', artist: 'LEARN GERMAN' }, handlers())

    expect(() => service.setPlaying(true)).not.toThrow()
    await Promise.resolve()
    expect(session.playbackState).toBe('playing')
  })

  it('ignores a playing state before it was started', () => {
    const service = new BrowserMediaSessionService()

    service.setPlaying(true)

    expect(session.playbackState).toBe('none')
    expect(audio.play).not.toHaveBeenCalled()
  })

  it('takes everything back on stop', () => {
    const service = new BrowserMediaSessionService()
    service.start({ title: 'Mein Tag', artist: 'LEARN GERMAN' }, handlers())
    service.setPlaying(true)

    service.stop()

    expect(audio.pause).toHaveBeenCalled()
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:silence')
    expect(session.metadata).toBeNull()
    expect(session.playbackState).toBe('none')
    for (const action of ['play', 'pause', 'previoustrack', 'nexttrack']) {
      expect(session.setActionHandler).toHaveBeenCalledWith(action, null)
    }
  })
})
