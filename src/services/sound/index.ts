import { WebAudioSoundService } from './webAudioSoundService'

import type { SoundService } from './types'

export type { SoundCue, SoundService } from './types'

/** The app-wide sound service. Swap the implementation here to change how cues are produced. */
export const soundService: SoundService = new WebAudioSoundService()
