import { BrowserMediaSessionService } from './browserMediaSession'
import type { MediaSessionHandlers, MediaSessionInfo, MediaSessionService } from './types'

export type { MediaSessionHandlers, MediaSessionInfo, MediaSessionService }

/** The app-wide media-session service. Swap the implementation here to change how the system player is fed. */
export const mediaSessionService: MediaSessionService = new BrowserMediaSessionService()
