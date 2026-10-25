import type { MediaSessionHandlers, MediaSessionInfo, MediaSessionService } from './types'

const SILENCE_SAMPLE_RATE = 8000

/**
 * One second of silence as a tiny WAV (mono, 8-bit, 8 kHz), built in memory so there is no file to ship.
 * Speech synthesis is not "media" to a browser, so on its own it never earns a lock-screen player;
 * a silent looping audio element is what makes the page count as playing audio while a story is read.
 */
function createSilentWav(): Blob {
  const dataLength = SILENCE_SAMPLE_RATE
  const buffer = new ArrayBuffer(44 + dataLength)
  const view = new DataView(buffer)
  const writeText = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i += 1) view.setUint8(offset + i, text.charCodeAt(i))
  }

  writeText(0, 'RIFF')
  view.setUint32(4, 36 + dataLength, true)
  writeText(8, 'WAVE')
  writeText(12, 'fmt ')
  view.setUint32(16, 16, true) // fmt chunk size
  view.setUint16(20, 1, true) // PCM
  view.setUint16(22, 1, true) // mono
  view.setUint32(24, SILENCE_SAMPLE_RATE, true)
  view.setUint32(28, SILENCE_SAMPLE_RATE, true) // byte rate (8-bit mono)
  view.setUint16(32, 1, true) // block align
  view.setUint16(34, 8, true) // bits per sample
  writeText(36, 'data')
  view.setUint32(40, dataLength, true)
  new Uint8Array(buffer, 44).fill(0x80) // 8-bit PCM silence is the midpoint

  return new Blob([buffer], { type: 'audio/wav' })
}

type SessionAction = 'play' | 'pause' | 'previoustrack' | 'nexttrack'

/**
 * Media Session implementation. Best effort by design: browsers differ in which buttons they show
 * and whether they keep speech running with the screen off, so nothing here may throw.
 */
export class BrowserMediaSessionService implements MediaSessionService {
  private audio: HTMLAudioElement | null = null
  private audioUrl: string | null = null
  private started = false

  isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'mediaSession' in navigator
  }

  start(info: MediaSessionInfo, handlers: MediaSessionHandlers): void {
    if (!this.isSupported()) return
    this.started = true
    const session = navigator.mediaSession

    try {
      if (typeof MediaMetadata !== 'undefined') {
        session.metadata = new MediaMetadata({ title: info.title, artist: info.artist, album: info.album ?? '' })
      }
    } catch {
      // A browser that rejects the metadata still gets the buttons.
    }

    const actions: Record<SessionAction, () => void> = {
      play: handlers.play,
      pause: handlers.pause,
      previoustrack: handlers.previous,
      nexttrack: handlers.next,
    }
    for (const [action, handler] of Object.entries(actions) as [SessionAction, () => void][]) {
      try {
        session.setActionHandler(action, handler)
      } catch {
        // This browser does not offer that button.
      }
    }
  }

  setPlaying(playing: boolean): void {
    if (!this.isSupported() || !this.started) return

    try {
      navigator.mediaSession.playbackState = playing ? 'playing' : 'paused'
    } catch {
      // Ignored: the state is a hint to the system, not something the player relies on.
    }
    this.holdAudioSession(playing)
  }

  stop(): void {
    if (!this.isSupported() || !this.started) return
    this.started = false
    this.holdAudioSession(false)
    this.releaseAudio()

    const session = navigator.mediaSession
    for (const action of ['play', 'pause', 'previoustrack', 'nexttrack'] as const) {
      try {
        session.setActionHandler(action, null)
      } catch {
        // Nothing to take back.
      }
    }
    try {
      session.metadata = null
      session.playbackState = 'none'
    } catch {
      // Ignored.
    }
  }

  private holdAudioSession(hold: boolean): void {
    try {
      if (!hold) {
        this.audio?.pause()
        return
      }
      if (typeof Audio === 'undefined' || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') return

      if (!this.audio) {
        this.audioUrl = URL.createObjectURL(createSilentWav())
        const audio = new Audio(this.audioUrl)
        audio.loop = true
        this.audio = audio
      }
      // Playing can be refused (autoplay rules, an unsupported format): the story's own speech is unaffected.
      void Promise.resolve(this.audio.play()).catch(() => undefined)
    } catch {
      // Never let a lock-screen nicety break the story audio.
    }
  }

  private releaseAudio(): void {
    if (this.audioUrl) {
      try {
        URL.revokeObjectURL(this.audioUrl)
      } catch {
        // Ignored.
      }
    }
    this.audio = null
    this.audioUrl = null
  }
}
