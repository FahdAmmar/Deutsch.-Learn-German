import { BrowserSpeechRecognizer } from './browserRecognizer'
import type { SpeechRecognizer } from './types'

export { RecognitionError } from './types'
export type { ListenOptions, RecognitionErrorCode, RecognitionResult, SpeechRecognizer } from './types'

/**
 * Single instance used across the app. To move to an external recogniser later, implement `SpeechRecognizer`
 * in a new class and swap the instantiation below — no other file needs to change.
 */
export const speechRecognizer: SpeechRecognizer = new BrowserSpeechRecognizer()
