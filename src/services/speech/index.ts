import { BrowserSpeechService } from './browserSpeechService'
import type { SpeakOptions, SpeechService, SpeechStatus } from './types'

export type { SpeakOptions, SpeechService, SpeechStatus }

/**
 * Single instance used across the app. To move to an external TTS
 * provider later, implement `SpeechService` in a new class and swap the
 * instantiation below — no other file needs to change.
 */
export const speechService: SpeechService = new BrowserSpeechService()

export const GERMAN_LOCALE = 'de-DE'
