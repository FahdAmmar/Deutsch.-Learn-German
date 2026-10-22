export interface RecognitionResult {
  /** The best reading of what was said. */
  transcript: string
  /** 0–1 as the recogniser reports it; 0 when it does not say. */
  confidence: number
  /** Other readings the recogniser considered, best first (without the transcript itself). */
  alternatives: string[]
}

/** Why listening ended without a result, in terms the interface can act on. */
export type RecognitionErrorCode =
  | 'unsupported' // this browser has no speech recognition
  | 'not-allowed' // the learner (or the browser) refused the microphone
  | 'no-microphone'
  | 'no-speech' // nothing was heard
  | 'network' // recognition runs on a server and could not reach it
  | 'aborted' // the learner stopped, or left the page
  | 'unknown'

export class RecognitionError extends Error {
  readonly code: RecognitionErrorCode

  constructor(code: RecognitionErrorCode, message?: string) {
    super(message ?? code)
    this.name = 'RecognitionError'
    this.code = code
  }
}

export interface ListenOptions {
  /** BCP-47 language to recognise; German by default. */
  language?: string
  /** Stops listening and rejects with `aborted`. */
  signal?: AbortSignal
}

/**
 * Turns the learner's voice into text. Behind this interface sits the browser's recogniser today; an external
 * provider can replace it later without any change to the screens, the same way `SpeechService` does for speaking.
 */
export interface SpeechRecognizer {
  isSupported: () => boolean
  /** Listens for one utterance and resolves with it. Rejects with a `RecognitionError`; never throws otherwise. */
  listen: (options?: ListenOptions) => Promise<RecognitionResult>
}
