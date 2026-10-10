import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { BrowserSpeechService } from './browserSpeechService'

class FakeUtterance {
  text: string
  lang = ''
  rate = 1
  pitch = 1
  volume = 1
  onstart: (() => void) | null = null
  onend: (() => void) | null = null
  onerror: ((event: { error: string }) => void) | null = null
  onboundary: ((event: { charIndex: number }) => void) | null = null

  constructor(text: string) {
    this.text = text
  }
}

describe('BrowserSpeechService', () => {
  let cancelSpy: ReturnType<typeof vi.fn>
  let speakSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    cancelSpy = vi.fn()
    speakSpy = vi.fn()

    // jsdom doesn't implement SpeechSynthesis; stub the minimal surface the
    // service depends on for these tests.
    vi.stubGlobal('speechSynthesis', { speak: speakSpy, cancel: cancelSpy })
    vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('reports supported when speechSynthesis exists on window', () => {
    const service = new BrowserSpeechService()
    expect(service.isSupported()).toBe(true)
  })

  it('reports unsupported and calls onError when speechSynthesis is missing', () => {
    vi.unstubAllGlobals()
    const service = new BrowserSpeechService()
    const onError = vi.fn()

    service.speak('Hallo', { language: 'de-DE', onError })

    expect(onError).toHaveBeenCalledTimes(1)
    expect(service.getStatus()).toBe('unsupported')
  })

  it('does nothing for empty or whitespace-only text', () => {
    const service = new BrowserSpeechService()
    service.speak('   ', { language: 'de-DE' })
    expect(speakSpy).not.toHaveBeenCalled()
  })

  it('cancels any in-flight speech before speaking again, and applies the requested language', () => {
    const service = new BrowserSpeechService()
    service.speak('Guten Morgen', { language: 'de-DE', rate: 0.8 })

    expect(cancelSpy).toHaveBeenCalledTimes(1)
    expect(speakSpy).toHaveBeenCalledTimes(1)

    const utterance = speakSpy.mock.calls[0][0] as FakeUtterance
    expect(utterance.text).toBe('Guten Morgen')
    expect(utterance.lang).toBe('de-DE')
    expect(utterance.rate).toBe(0.8)
  })

  it('clamps rate, pitch, and volume to safe ranges', () => {
    const service = new BrowserSpeechService()
    service.speak('Test', { language: 'de-DE', rate: 10, pitch: -5, volume: 99 })

    const utterance = speakSpy.mock.calls[0][0] as FakeUtterance
    expect(utterance.rate).toBe(2)
    expect(utterance.pitch).toBe(0)
    expect(utterance.volume).toBe(1)
  })

  it('surfaces synthesis errors through onError instead of throwing', () => {
    const service = new BrowserSpeechService()
    const onError = vi.fn()

    service.speak('Fehler', { language: 'de-DE', onError })
    const utterance = speakSpy.mock.calls[0][0] as FakeUtterance

    expect(() => utterance.onerror?.({ error: 'network' })).not.toThrow()
    expect(onError).toHaveBeenCalledWith('network')
    expect(service.getStatus()).toBe('error')
  })

  it('stop() cancels playback without throwing even if unsupported', () => {
    vi.unstubAllGlobals()
    const service = new BrowserSpeechService()
    expect(() => service.stop()).not.toThrow()
    expect(service.getStatus()).toBe('idle')
  })
})

describe('BrowserSpeechService — callbacks', () => {
  let speakSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    speakSpy = vi.fn()
    vi.stubGlobal('speechSynthesis', { speak: speakSpy, cancel: vi.fn() })
    vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('forwards word-boundary offsets so callers can show progress inside a sentence', () => {
    const onBoundary = vi.fn()
    new BrowserSpeechService().speak('Guten Morgen', { language: 'de-DE', onBoundary })

    const utterance = speakSpy.mock.calls[0][0] as FakeUtterance
    utterance.onboundary?.({ charIndex: 6 })
    expect(onBoundary).toHaveBeenCalledWith(6)
  })

  it.each(['canceled', 'interrupted'])('treats a "%s" error as a deliberate end, not a failure', (reason) => {
    const service = new BrowserSpeechService()
    const onEnd = vi.fn()
    const onError = vi.fn()
    service.speak('Hallo', { language: 'de-DE', onEnd, onError })

    const utterance = speakSpy.mock.calls[0][0] as FakeUtterance
    utterance.onerror?.({ error: reason })

    expect(onEnd).toHaveBeenCalledTimes(1)
    expect(onError).not.toHaveBeenCalled()
    expect(service.getStatus()).not.toBe('error')
  })

  it('still reports genuine speech errors', () => {
    const service = new BrowserSpeechService()
    const onError = vi.fn()
    service.speak('Hallo', { language: 'de-DE', onError })

    const utterance = speakSpy.mock.calls[0][0] as FakeUtterance
    utterance.onerror?.({ error: 'synthesis-failed' })

    expect(onError).toHaveBeenCalledWith('synthesis-failed')
    expect(service.getStatus()).toBe('error')
  })
})
