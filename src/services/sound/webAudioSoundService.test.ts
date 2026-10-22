import { afterEach, describe, expect, it, vi } from 'vitest'

import { WebAudioSoundService } from './webAudioSoundService'

function fakeAudioContext() {
  const oscillators: { start: ReturnType<typeof vi.fn>; frequency: { setValueAtTime: ReturnType<typeof vi.fn> } }[] = []
  class FakeAudioContext {
    state = 'running'
    currentTime = 0
    destination = {}
    resume = vi.fn().mockResolvedValue(undefined)
    createGain() {
      return { gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn() }
    }
    createOscillator() {
      const oscillator = {
        type: 'sine',
        frequency: { setValueAtTime: vi.fn() },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      }
      oscillators.push(oscillator)
      return oscillator
    }
  }
  return { Constructor: FakeAudioContext, oscillators }
}

describe('WebAudioSoundService', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('reports unsupported and plays nothing where Web Audio does not exist', () => {
    const service = new WebAudioSoundService()
    expect(service.isSupported()).toBe(false)
    expect(() => service.play('correct')).not.toThrow()
  })

  it('plays one oscillator per note of the cue', () => {
    const { Constructor, oscillators } = fakeAudioContext()
    vi.stubGlobal('AudioContext', Constructor)
    const service = new WebAudioSoundService()

    expect(service.isSupported()).toBe(true)
    service.play('correct')
    expect(oscillators).toHaveLength(2)
    service.play('complete')
    expect(oscillators).toHaveLength(2 + 4)
    expect(oscillators.every((oscillator) => oscillator.start.mock.calls.length === 1)).toBe(true)
  })

  it('plays the per-letter tick as a single note', () => {
    const { Constructor, oscillators } = fakeAudioContext()
    vi.stubGlobal('AudioContext', Constructor)

    new WebAudioSoundService().play('key')
    expect(oscillators).toHaveLength(1)
  })

  it('swallows errors from the audio engine', () => {
    vi.stubGlobal(
      'AudioContext',
      class {
        constructor() {
          throw new Error('blocked')
        }
      },
    )
    expect(() => new WebAudioSoundService().play('wrong')).not.toThrow()
  })
})
