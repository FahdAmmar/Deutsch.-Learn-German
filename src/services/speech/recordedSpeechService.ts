import { normalizeSpokenText } from './recordedAudio'
import type { SpeakOptions, SpeechService, SpeechStatus, VoiceInfo } from './types'

/** The part of an `HTMLAudioElement` this service uses, so tests can stand in for it. */
export interface PlayableAudio {
  playbackRate: number
  volume: number
  onplaying: (() => void) | null
  onended: (() => void) | null
  onerror: (() => void) | null
  play(): Promise<void>
  pause(): void
}

export interface RecordedSpeechOptions {
  /** Speaks everything that has no recording. Also provides the voices, since recordings have none to choose. */
  fallback: SpeechService
  /** Text → file URL for the recordings that exist. May reject; the service then has no recordings. */
  loadRecordings: () => Promise<ReadonlyMap<string, string>>
  createAudio: (url: string) => PlayableAudio
}

/**
 * A speech service that plays recorded audio for the texts that have a recording and hands every other text to a
 * fallback service (the browser's voice). The UI does not know which one spoke. It stays on the fallback whenever a
 * recording cannot serve the request: the text has none, the caller wants word-by-word progress (a recording reports
 * none), a particular voice was asked for, or the file fails to play.
 */
export class RecordedSpeechService implements SpeechService {
  private recordings: ReadonlyMap<string, string> = new Map()
  private current: PlayableAudio | null = null
  private status: SpeechStatus = 'idle'
  private ended: (() => void) | undefined

  private readonly options: RecordedSpeechOptions

  constructor(options: RecordedSpeechOptions) {
    this.options = options
  }

  /** Starts loading the recordings. Until it finishes, everything is spoken by the fallback. Never rejects. */
  preload(): Promise<void> {
    return this.options
      .loadRecordings()
      .then((recordings) => {
        this.recordings = recordings
      })
      .catch(() => {
        this.recordings = new Map()
      })
  }

  isSupported(): boolean {
    return this.options.fallback.isSupported() || this.recordings.size > 0
  }

  getStatus(): SpeechStatus {
    return this.current ? this.status : this.options.fallback.getStatus()
  }

  getVoices(): VoiceInfo[] {
    return this.options.fallback.getVoices()
  }

  onVoicesChanged(listener: () => void): () => void {
    return this.options.fallback.onVoicesChanged(listener)
  }

  setPreferredVoice(voiceURI: string | null): void {
    this.options.fallback.setPreferredVoice(voiceURI)
  }

  speak(text: string, options: SpeakOptions): void {
    this.stop()
    const url = options.onBoundary || options.voiceURI ? undefined : this.recordings.get(normalizeSpokenText(text))
    if (!url) {
      this.options.fallback.speak(text, options)
      return
    }
    this.play(url, text, options)
  }

  stop(): void {
    const audio = this.current
    if (audio) {
      this.detach(audio)
      audio.pause()
      this.current = null
      this.status = 'idle'
      // As the browser service does: a caller whose utterance is stopped on purpose can reset its state.
      const finished = this.ended
      this.ended = undefined
      finished?.()
    }
    this.options.fallback.stop()
  }

  private play(url: string, text: string, options: SpeakOptions): void {
    let audio: PlayableAudio
    try {
      audio = this.options.createAudio(url)
    } catch {
      this.options.fallback.speak(text, options)
      return
    }
    audio.playbackRate = options.rate ?? 1
    audio.volume = options.volume ?? 1
    this.current = audio
    this.ended = options.onEnd
    audio.onplaying = () => {
      this.status = 'speaking'
      options.onStart?.()
    }
    audio.onended = () => {
      this.release(audio)
      options.onEnd?.()
    }
    // A recording that cannot be played must never leave the learner in silence: the browser voice takes over.
    audio.onerror = () => {
      this.release(audio)
      this.options.fallback.speak(text, options)
    }
    audio.play().catch(() => audio.onerror?.())
  }

  private release(audio: PlayableAudio): void {
    this.detach(audio)
    if (this.current === audio) {
      this.current = null
      this.status = 'idle'
      this.ended = undefined
    }
  }

  private detach(audio: PlayableAudio): void {
    audio.onplaying = null
    audio.onended = null
    audio.onerror = null
  }
}
