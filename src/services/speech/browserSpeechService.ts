import type { SpeakOptions, SpeechService, SpeechStatus } from './types'

/**
 * SpeechService backed by the browser's native SpeechSynthesis API.
 * Every entry point is wrapped defensively: unsupported browsers, missing
 * voices, and runtime errors all degrade to a no-op rather than throwing,
 * per the "audio failures must never crash the application" requirement.
 */
export class BrowserSpeechService implements SpeechService {
  private status: SpeechStatus = 'idle'

  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  getStatus(): SpeechStatus {
    return this.status
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
      utterance.rate = clamp(options.rate ?? 1, 0.5, 2)
      utterance.pitch = clamp(options.pitch ?? 1, 0, 2)
      utterance.volume = clamp(options.volume ?? 1, 0, 1)

      utterance.onstart = () => {
        this.status = 'speaking'
        options.onStart?.()
      }
      utterance.onend = () => {
        this.status = 'idle'
        options.onEnd?.()
      }
      utterance.onerror = (event) => {
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

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
