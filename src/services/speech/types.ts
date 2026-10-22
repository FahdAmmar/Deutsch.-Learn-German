export type SpeechStatus = 'idle' | 'speaking' | 'unsupported' | 'error'

/** A voice the engine can speak with — only the facts the UI and the voice picker need. */
export interface VoiceInfo {
  /** Stable identifier used to remember the learner's choice. */
  voiceURI: string
  name: string
  /** BCP-47 tag of the voice, e.g. 'de-DE'. */
  lang: string
  /** Installed on the device (as opposed to streamed from a service). */
  localService: boolean
}

export interface SpeakOptions {
  /** BCP-47 language tag, e.g. 'de-DE'. */
  language: string
  /** Playback rate, roughly 0.5–2. Defaults to 1. */
  rate?: number
  pitch?: number
  volume?: number
  /** Speak with this voice just this once (used to preview voices), instead of the preferred one. */
  voiceURI?: string
  onStart?: () => void
  /** Called with the character offset of the word being spoken, where the engine reports it (progress inside a sentence). */
  onBoundary?: (charIndex: number) => void
  /** Also called when this utterance is replaced or stopped on purpose, so callers can reset their state. */
  onEnd?: () => void
  /** Called instead of throwing — speech failures must never crash the app. */
  onError?: (message: string) => void
}

/**
 * Abstraction over "say this text out loud". The initial implementation
 * uses the browser's SpeechSynthesis API. Swapping in an external TTS
 * provider later (for higher-quality German voices) means writing a new
 * class that implements this interface — the UI layer never changes.
 */
export interface SpeechService {
  /** Whether this environment can speak at all. */
  isSupported(): boolean
  speak(text: string, options: SpeakOptions): void
  stop(): void
  getStatus(): SpeechStatus
  /** The voices on offer. Browsers load them asynchronously, so this can be empty at first — see `onVoicesChanged`. */
  getVoices(): VoiceInfo[]
  /** Notifies when the list of voices changes. Returns an unsubscribe function. */
  onVoicesChanged(listener: () => void): () => void
  /** Chooses the voice to speak with; `null` picks the best match for the requested language. */
  setPreferredVoice(voiceURI: string | null): void
}
