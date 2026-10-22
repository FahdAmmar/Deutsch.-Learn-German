import {
  RecognitionError,
  type ListenOptions,
  type RecognitionErrorCode,
  type RecognitionResult,
  type SpeechRecognizer,
} from './types'

/**
 * The parts of the Web Speech API's recogniser this app uses. TypeScript's DOM library does not describe it,
 * and Chrome/Edge/Safari expose it under different names, so the shape is written down here once.
 */
interface RecognitionAlternative {
  transcript: string
  confidence: number
}

interface RecognitionEventLike {
  results: ArrayLike<ArrayLike<RecognitionAlternative>>
}

interface RecognitionErrorEventLike {
  error: string
}

interface RecognitionInstance {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  onresult: ((event: RecognitionEventLike) => void) | null
  onerror: ((event: RecognitionErrorEventLike) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type RecognitionConstructor = new () => RecognitionInstance

interface RecognitionWindow {
  SpeechRecognition?: RecognitionConstructor
  webkitSpeechRecognition?: RecognitionConstructor
}

const ERROR_CODES: Record<string, RecognitionErrorCode> = {
  'not-allowed': 'not-allowed',
  'service-not-allowed': 'not-allowed',
  'audio-capture': 'no-microphone',
  'no-speech': 'no-speech',
  network: 'network',
  aborted: 'aborted',
}

function constructorOf(scope: RecognitionWindow): RecognitionConstructor | undefined {
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition
}

export class BrowserSpeechRecognizer implements SpeechRecognizer {
  private scope(): RecognitionWindow | undefined {
    return typeof window === 'undefined' ? undefined : (window as unknown as RecognitionWindow)
  }

  isSupported(): boolean {
    const scope = this.scope()
    return scope !== undefined && constructorOf(scope) !== undefined
  }

  listen({ language = 'de-DE', signal }: ListenOptions = {}): Promise<RecognitionResult> {
    return new Promise((resolve, reject) => {
      const scope = this.scope()
      const Recognition = scope ? constructorOf(scope) : undefined
      if (!Recognition) {
        reject(new RecognitionError('unsupported'))
        return
      }
      if (signal?.aborted) {
        reject(new RecognitionError('aborted'))
        return
      }

      let settled = false
      const finish = (action: () => void) => {
        if (settled) return
        settled = true
        signal?.removeEventListener('abort', onAbort)
        action()
      }

      let recognition: RecognitionInstance
      try {
        recognition = new Recognition()
      } catch {
        reject(new RecognitionError('unknown'))
        return
      }
      const onAbort = () => {
        finish(() => reject(new RecognitionError('aborted')))
        try {
          recognition.abort()
        } catch {
          // The recogniser may already have stopped; there is nothing left to stop.
        }
      }
      signal?.addEventListener('abort', onAbort)

      recognition.lang = language
      recognition.continuous = false
      recognition.interimResults = false
      recognition.maxAlternatives = 3

      recognition.onresult = (event) => {
        const alternatives = Array.from(event.results[0] ?? [])
        const [best, ...others] = alternatives
        if (!best) {
          finish(() => reject(new RecognitionError('no-speech')))
          return
        }
        finish(() =>
          resolve({
            transcript: best.transcript.trim(),
            confidence: best.confidence ?? 0,
            alternatives: others.map((entry) => entry.transcript.trim()),
          }),
        )
      }
      recognition.onerror = (event) => {
        finish(() => reject(new RecognitionError(ERROR_CODES[event.error] ?? 'unknown', event.error)))
      }
      // Some browsers end without a result or an error when nothing was said.
      recognition.onend = () => {
        finish(() => reject(new RecognitionError('no-speech')))
      }

      try {
        recognition.start()
      } catch {
        finish(() => reject(new RecognitionError('unknown')))
      }
    })
  }
}
