import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { BrowserSpeechRecognizer } from './browserRecognizer'
import { RecognitionError } from './types'

/** A recogniser the test controls: it records how it was set up and lets the test fire its events. */
class FakeRecognition {
  static last: FakeRecognition | undefined
  lang = ''
  continuous = true
  interimResults = true
  maxAlternatives = 1
  started = false
  aborted = false
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }>> }) => void) | null =
    null
  onerror: ((event: { error: string }) => void) | null = null
  onend: (() => void) | null = null

  constructor() {
    FakeRecognition.last = this
  }

  start() {
    this.started = true
  }

  stop() {}

  abort() {
    this.aborted = true
  }
}

const scope = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }

describe('BrowserSpeechRecognizer', () => {
  beforeEach(() => {
    FakeRecognition.last = undefined
    scope.SpeechRecognition = FakeRecognition
  })

  afterEach(() => {
    delete scope.SpeechRecognition
    delete scope.webkitSpeechRecognition
  })

  it('says whether the browser can recognise speech, under either name', () => {
    const recognizer = new BrowserSpeechRecognizer()
    expect(recognizer.isSupported()).toBe(true)
    delete scope.SpeechRecognition
    expect(recognizer.isSupported()).toBe(false)
    scope.webkitSpeechRecognition = FakeRecognition
    expect(recognizer.isSupported()).toBe(true)
  })

  it('listens for one German utterance and gives the best reading with the others', async () => {
    const pending = new BrowserSpeechRecognizer().listen()
    const fake = FakeRecognition.last!
    expect(fake).toMatchObject({ lang: 'de-DE', continuous: false, interimResults: false, started: true })

    fake.onresult?.({
      results: [
        [
          { transcript: ' guten Morgen ', confidence: 0.9 },
          { transcript: 'guten Morgan', confidence: 0.4 },
        ],
      ],
    })
    await expect(pending).resolves.toEqual({
      transcript: 'guten Morgen',
      confidence: 0.9,
      alternatives: ['guten Morgan'],
    })
  })

  it.each([
    ['not-allowed', 'not-allowed'],
    ['service-not-allowed', 'not-allowed'],
    ['audio-capture', 'no-microphone'],
    ['no-speech', 'no-speech'],
    ['network', 'network'],
    ['something-new', 'unknown'],
  ])('turns the browser error "%s" into "%s"', async (browserError, code) => {
    const pending = new BrowserSpeechRecognizer().listen()
    FakeRecognition.last!.onerror?.({ error: browserError })
    await expect(pending).rejects.toMatchObject({ name: 'RecognitionError', code })
  })

  it('reports that nothing was heard when the recogniser ends without a result', async () => {
    const pending = new BrowserSpeechRecognizer().listen()
    FakeRecognition.last!.onend?.()
    await expect(pending).rejects.toMatchObject({ code: 'no-speech' })
  })

  it('settles once: a late "end" after a result changes nothing', async () => {
    const pending = new BrowserSpeechRecognizer().listen()
    const fake = FakeRecognition.last!
    fake.onresult?.({ results: [[{ transcript: 'hallo', confidence: 1 }]] })
    fake.onend?.()
    await expect(pending).resolves.toMatchObject({ transcript: 'hallo' })
  })

  it('stops and rejects when the signal aborts', async () => {
    const controller = new AbortController()
    const pending = new BrowserSpeechRecognizer().listen({ signal: controller.signal })
    controller.abort()
    await expect(pending).rejects.toMatchObject({ code: 'aborted' })
    expect(FakeRecognition.last!.aborted).toBe(true)
  })

  it('rejects at once for a signal that is already aborted', async () => {
    const controller = new AbortController()
    controller.abort()
    await expect(new BrowserSpeechRecognizer().listen({ signal: controller.signal })).rejects.toMatchObject({
      code: 'aborted',
    })
    expect(FakeRecognition.last).toBeUndefined()
  })

  it('rejects as unsupported when the browser has no recogniser', async () => {
    delete scope.SpeechRecognition
    const error = await new BrowserSpeechRecognizer().listen().catch((caught: unknown) => caught)
    expect(error).toBeInstanceOf(RecognitionError)
    expect(error).toMatchObject({ code: 'unsupported' })
  })
})
