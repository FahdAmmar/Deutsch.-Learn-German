/** The short cues the app plays. Each is a feedback signal, never decoration. */
export type SoundCue =
  /** A single right letter while typing — a soft tick, short enough to follow fast typing. */
  | 'key'
  /** A right answer (or a finished part of a text). */
  | 'correct'
  | 'wrong'
  /** The whole exercise or text is done. */
  | 'complete'

/**
 * Abstraction over "play a feedback sound". The initial implementation
 * synthesises the cues with the Web Audio API — no audio files to ship or
 * cache. Recorded sounds can replace it later by implementing this interface.
 */
export interface SoundService {
  /** Whether this environment can play sound at all. */
  isSupported(): boolean
  /** Plays a cue. Never throws: a sound that cannot play is simply skipped. */
  play(cue: SoundCue): void
}
