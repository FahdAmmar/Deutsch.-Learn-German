import type { SpeakOptions, SpeechService, SpeechStatus, VoiceInfo } from './types'
import { chooseVoice } from './voices'

/**
 * SpeechService backed by the browser's native SpeechSynthesis API.
 * Every entry point is wrapped defensively: unsupported browsers, missing
 * voices, and runtime errors all degrade to a no-op rather than throwing,
 * per the "audio failures must never crash the application" requirement.
 */
export class BrowserSpeechService implements SpeechService {
  private status: SpeechStatus = 'idle'
  private preferredVoiceURI: string | null = null

  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  getStatus(): SpeechStatus {
    return this.status
  }

  setPreferredVoice(voiceURI: string | null): void {
    this.preferredVoiceURI = voiceURI
  }

  getVoices(): VoiceInfo[] {
    try {
      if (!this.isSupported() || typeof window.speechSynthesis.getVoices !== 'function') return []
      return window.speechSynthesis.getVoices().map(toVoiceInfo)
    } catch {
      return []
    }
  }

  onVoicesChanged(listener: () => void): () => void {
    if (!this.isSupported() || typeof window.speechSynthesis.addEventListener !== 'function') return () => undefined
    // Keep the engine we subscribed to: the unsubscribe must work even if `window.speechSynthesis` is gone by then.
    const synthesis = window.speechSynthesis
    synthesis.addEventListener('voiceschanged', listener)
    return () => synthesis.removeEventListener('voiceschanged', listener)
  }

  speak(text: string, options: SpeakOptions): void {
    const trimmed = text.trim()
    if (!trimmed) return

    if (!this.isSupported()) {
      this.status = 'unsupported'
      options.onError?.('SpeechSynthesis wird von diesem Browser nicht unterstützt.')
      return
    }

    try {
      // Cancel anything in-flight so rapid clicks don't queue up audio.
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(trimmed)
      utterance.lang = options.language
      const voice = chooseVoice(this.getNativeVoices(), options.language, options.voiceURI ?? this.preferredVoiceURI)
      if (voice) utterance.voice = voice
      utterance.rate = clamp(options.rate ?? 1, 0.5, 2)
      utterance.pitch = clamp(options.pitch ?? 1, 0, 2)
      utterance.volume = clamp(options.volume ?? 1, 0, 1)

      utterance.onstart = () => {
        this.status = 'speaking'
        options.onStart?.()
      }
      utterance.onboundary = (event) => options.onBoundary?.(event.charIndex)
      utterance.onend = () => {
        this.status = 'idle'
        options.onEnd?.()
      }
      utterance.onerror = (event) => {
        // `cancel()` — called when a new utterance replaces this one, or on stop() — makes browsers
        // report 'canceled'/'interrupted'. That is a deliberate end, not a failure: say so, and leave
        // the shared status to whoever cancelled (the replacement utterance may already be speaking).
        if (event.error === 'canceled' || event.error === 'interrupted') {
          options.onEnd?.()
          return
        }
        this.status = 'error'
        options.onError?.(event.error || 'Unbekannter Sprachausgabefehler.')
      }

      window.speechSynthesis.speak(utterance)
    } catch (error) {
      this.status = 'error'
      const message = error instanceof Error ? error.message : 'Sprachausgabe fehlgeschlagen.'
      options.onError?.(message)
    }
  }

  private getNativeVoices(): SpeechSynthesisVoice[] {
    try {
      return typeof window.speechSynthesis.getVoices === 'function' ? window.speechSynthesis.getVoices() : []
    } catch {
      return []
    }
  }

  stop(): void {
    try {
      if (this.isSupported()) {
        window.speechSynthesis.cancel()
      }
      this.status = 'idle'
    } catch {
      // Nothing meaningful to recover here — swallow and reset state.
      this.status = 'idle'
    }
  }
}

function toVoiceInfo(voice: SpeechSynthesisVoice): VoiceInfo {
  return { voiceURI: voice.voiceURI, name: voice.name, lang: voice.lang, localService: voice.localService }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
