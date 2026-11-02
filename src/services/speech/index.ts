import { BrowserSpeechService } from './browserSpeechService'
import { AUDIO_DIRECTORY, MANIFEST_FILE, parseAudioManifest } from './recordedAudio'
import { RecordedSpeechService, type PlayableAudio } from './recordedSpeechService'
import type { SpeakOptions, SpeechService, SpeechStatus, VoiceInfo } from './types'

export type { SpeakOptions, SpeechService, SpeechStatus, VoiceInfo }
export { chooseVoice, scoreVoice, voicesForLanguage } from './voices'

const base = import.meta.env.BASE_URL

/** Reads `audio/manifest.json` and turns each file name into a URL under the app's base path. */
async function loadRecordings(): Promise<ReadonlyMap<string, string>> {
  const response = await fetch(`${base}${MANIFEST_FILE}`)
  if (!response.ok) return new Map()
  const files = parseAudioManifest(await response.json())
  return new Map([...files].map(([text, file]) => [text, `${base}${AUDIO_DIRECTORY}${file}`]))
}

/**
 * Single instance used across the app: the browser's voice, or, when the build sets `VITE_RECORDED_AUDIO=true`, recorded
 * audio for the texts that have a recording with the browser's voice for all the others (see docs/recorded-audio.md).
 * It is off by default, so an ordinary build makes no extra request. To move to an external TTS provider later,
 * implement `SpeechService` in a new class and swap the instantiation below — no other file needs to change.
 */
function createSpeechService(): SpeechService {
  const browser = new BrowserSpeechService()
  if (import.meta.env.VITE_RECORDED_AUDIO !== 'true' || typeof Audio === 'undefined') return browser
  const recorded = new RecordedSpeechService({
    fallback: browser,
    loadRecordings,
    createAudio: (url) => new Audio(url) as PlayableAudio,
  })
  void recorded.preload()
  return recorded
}

export const speechService: SpeechService = createSpeechService()

export const GERMAN_LOCALE = 'de-DE'
