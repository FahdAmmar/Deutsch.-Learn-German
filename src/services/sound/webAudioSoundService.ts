import type { SoundCue, SoundService } from './types'

interface Note {
  /** Frequency in Hz. */
  frequency: number
  /** Seconds after the cue starts. */
  start: number
  duration: number
  type: OscillatorType
  /** Peak loudness for this note; defaults to `PEAK_GAIN`. */
  gain?: number
}

/** Overall loudness: feedback should be noticed, not startling. */
const PEAK_GAIN = 0.11

/**
 * Cue shapes. Correct rises (resolution), wrong falls to a low, soft tone
 * (not a harsh buzzer — a wrong answer is part of learning), complete is a
 * short rising arpeggio.
 */
const CUES: Record<SoundCue, Note[]> = {
  // Heard on every right letter, so it is quieter and much shorter than the others.
  key: [{ frequency: 1174.66, start: 0, duration: 0.07, type: 'sine', gain: 0.05 }],
  correct: [
    { frequency: 659.25, start: 0, duration: 0.11, type: 'sine' },
    { frequency: 880, start: 0.09, duration: 0.2, type: 'sine' },
  ],
  wrong: [
    { frequency: 247, start: 0, duration: 0.14, type: 'triangle' },
    { frequency: 185, start: 0.12, duration: 0.24, type: 'triangle' },
  ],
  complete: [
    { frequency: 523.25, start: 0, duration: 0.12, type: 'sine' },
    { frequency: 659.25, start: 0.1, duration: 0.12, type: 'sine' },
    { frequency: 783.99, start: 0.2, duration: 0.12, type: 'sine' },
    { frequency: 1046.5, start: 0.3, duration: 0.32, type: 'sine' },
  ],
}

type AudioContextConstructor = typeof AudioContext

function getAudioContextConstructor(): AudioContextConstructor | undefined {
  if (typeof window === 'undefined') return undefined
  const withWebkit = window as Window & { webkitAudioContext?: AudioContextConstructor }
  return window.AudioContext ?? withWebkit.webkitAudioContext
}

/**
 * Plays the cues through one lazily created `AudioContext`. Browsers only
 * allow audio after a user gesture; every cue is triggered by an answer
 * click, so the context is created (and resumed) at the right moment.
 */
export class WebAudioSoundService implements SoundService {
  private context: AudioContext | null = null

  isSupported(): boolean {
    return getAudioContextConstructor() !== undefined
  }

  play(cue: SoundCue): void {
    try {
      const Constructor = getAudioContextConstructor()
      if (!Constructor) return

      this.context ??= new Constructor()
      const context = this.context
      if (context.state === 'suspended') void context.resume().catch(() => undefined)

      const startAt = context.currentTime
      for (const note of CUES[cue]) this.playNote(context, note, startAt)
    } catch {
      // Sound is a nicety. If it fails the exercise carries on silently.
    }
  }

  private playNote(context: AudioContext, note: Note, startAt: number): void {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const begin = startAt + note.start
    const end = begin + note.duration

    oscillator.type = note.type
    oscillator.frequency.setValueAtTime(note.frequency, begin)

    // A quick attack and an exponential release avoid the click of a hard-edged tone.
    gain.gain.setValueAtTime(0.0001, begin)
    gain.gain.exponentialRampToValueAtTime(note.gain ?? PEAK_GAIN, begin + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, end)

    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(begin)
    oscillator.stop(end + 0.02)
  }
}
