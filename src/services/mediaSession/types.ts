/** What a lock screen, a headset button or a media key can ask the story player to do. */
export interface MediaSessionHandlers {
  play: () => void
  pause: () => void
  /** The previous sentence. */
  previous: () => void
  /** The next sentence. */
  next: () => void
}

export interface MediaSessionInfo {
  title: string
  artist: string
  album?: string
}

/**
 * Abstraction over "show what is playing and take the system's transport buttons".
 * Every method is safe to call anywhere: an environment without the API simply ignores it.
 */
export interface MediaSessionService {
  isSupported(): boolean
  /** Shows the title and routes the system's play / pause / previous / next buttons to the handlers. */
  start(info: MediaSessionInfo, handlers: MediaSessionHandlers): void
  /** Tells the system whether something is playing now. */
  setPlaying(playing: boolean): void
  /** Takes the title and the buttons back. */
  stop(): void
}
