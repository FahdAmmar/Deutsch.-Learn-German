import { beforeEach, describe, expect, it, vi } from 'vitest'

import { normalizeSpokenText, parseAudioManifest } from './recordedAudio'
import { RecordedSpeechService, type PlayableAudio } from './recordedSpeechService'
import type { SpeechService } from './types'

function fakeFallback() {
  return {
    isSupported: vi.fn(() => true),
    speak: vi.fn(),
    stop: vi.fn(),
    getStatus: vi.fn(() => 'idle' as const),
    getVoices: vi.fn(() => []),
    onVoicesChanged: vi.fn(() => () => undefined),
    setPreferredVoice: vi.fn(),
  } satisfies SpeechService
}

function fakeAudio(): PlayableAudio & { url: string } {
  return {
    url: '',
    playbackRate: 1,
    volume: 1,
    onplaying: null,
    onended: null,
    onerror: null,
    play: vi.fn(() => Promise.resolve()),
    pause: vi.fn(),
  }
}

const RECORDINGS = new Map([['Guten Morgen!', '/audio/de/abc.mp3']])

describe('RecordedSpeechService', () => {
  let fallback: ReturnType<typeof fakeFallback>
  let created: Array<PlayableAudio & { url: string }>
  let service: RecordedSpeechService

  beforeEach(async () => {
    fallback = fakeFallback()
    created = []
    service = new RecordedSpeechService({
      fallback,
      loadRecordings: () => Promise.resolve(RECORDINGS),
      createAudio: (url) => {
        const audio = fakeAudio()
        audio.url = url
        created.push(audio)
        return audio
      },
    })
    await service.preload()
  })

  it('plays the recording for a text that has one, and does not use the fallback', () => {
    service.speak('  Guten   Morgen! ', { language: 'de-DE', rate: 0.8 })
    expect(created).toHaveLength(1)
    expect(created[0].url).toBe('/audio/de/abc.mp3')
    expect(created[0].playbackRate).toBe(0.8)
    expect(fallback.speak).not.toHaveBeenCalled()
  })

  it('reports start and end of a recording to the caller', () => {
    const onStart = vi.fn()
    const onEnd = vi.fn()
    service.speak('Guten Morgen!', { language: 'de-DE', onStart, onEnd })
    created[0].onplaying?.()
    expect(service.getStatus()).toBe('speaking')
    expect(onStart).toHaveBeenCalledTimes(1)
    created[0].onended?.()
    expect(onEnd).toHaveBeenCalledTimes(1)
    expect(service.getStatus()).toBe('idle')
  })

  it('speaks a text without a recording with the fallback', () => {
    service.speak('Guten Abend!', { language: 'de-DE' })
    expect(created).toHaveLength(0)
    expect(fallback.speak).toHaveBeenCalledWith('Guten Abend!', { language: 'de-DE' })
  })

  it('keeps to the fallback when the caller needs word-by-word progress or a particular voice', () => {
    service.speak('Guten Morgen!', { language: 'de-DE', onBoundary: () => undefined })
    service.speak('Guten Morgen!', { language: 'de-DE', voiceURI: 'x' })
    expect(created).toHaveLength(0)
    expect(fallback.speak).toHaveBeenCalledTimes(2)
  })

  it('falls back to the browser voice when a recording fails to play, so there is never silence', () => {
    service.speak('Guten Morgen!', { language: 'de-DE' })
    created[0].onerror?.()
    expect(fallback.speak).toHaveBeenCalledTimes(1)
  })

  it('falls back when the browser refuses to start the audio', async () => {
    const blocked = new RecordedSpeechService({
      fallback,
      loadRecordings: () => Promise.resolve(RECORDINGS),
      createAudio: () => ({ ...fakeAudio(), play: () => Promise.reject(new Error('blocked')) }),
    })
    await blocked.preload()
    blocked.speak('Guten Morgen!', { language: 'de-DE' })
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(fallback.speak).toHaveBeenCalledTimes(1)
  })

  it('stops a recording, lets the caller reset, and stops the fallback too', () => {
    const onEnd = vi.fn()
    service.speak('Guten Morgen!', { language: 'de-DE', onEnd })
    service.stop()
    expect(created[0].pause).toHaveBeenCalled()
    expect(onEnd).toHaveBeenCalledTimes(1)
    expect(fallback.stop).toHaveBeenCalled()
  })

  it('stops the previous recording when a new text starts', () => {
    service.speak('Guten Morgen!', { language: 'de-DE' })
    service.speak('Guten Abend!', { language: 'de-DE' })
    expect(created[0].pause).toHaveBeenCalled()
    expect(fallback.speak).toHaveBeenCalledTimes(1)
  })

  it('hands voices and the preferred voice to the fallback', () => {
    service.setPreferredVoice('v1')
    expect(fallback.setPreferredVoice).toHaveBeenCalledWith('v1')
    expect(service.getVoices()).toEqual([])
  })

  it('uses only the fallback when the recordings cannot be loaded', async () => {
    const broken = new RecordedSpeechService({
      fallback,
      loadRecordings: () => Promise.reject(new Error('offline')),
      createAudio: () => fakeAudio(),
    })
    await broken.preload()
    broken.speak('Guten Morgen!', { language: 'de-DE' })
    expect(fallback.speak).toHaveBeenCalledTimes(1)
  })
})

describe('recorded audio manifest', () => {
  it('normalises whitespace the same way everywhere', () => {
    expect(normalizeSpokenText('  Ich   lerne\nDeutsch. ')).toBe('Ich lerne Deutsch.')
  })

  it('keeps a valid manifest', () => {
    const files = parseAudioManifest({ version: 1, files: { 'Guten Morgen!': 'de/abc123.mp3' } })
    expect(files.get('Guten Morgen!')).toBe('de/abc123.mp3')
  })

  it.each(['../secret.mp3', 'https://example.com/a.mp3', '/etc/a.mp3', 'de/a.exe', 'de//a.mp3', 'de/a b.mp3', 'a.mp3?x=1'])(
    'rejects the whole manifest when a path is unsafe: %s',
    (path) => {
      expect(parseAudioManifest({ version: 1, files: { text: path } }).size).toBe(0)
    },
  )

  it('gives an empty lookup for anything that is not a manifest', () => {
    expect(parseAudioManifest(null).size).toBe(0)
    expect(parseAudioManifest({ version: 2, files: {} }).size).toBe(0)
    expect(parseAudioManifest('x').size).toBe(0)
  })
})
