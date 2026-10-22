import { useCallback } from 'react'

import { soundService, type SoundCue } from '@/services/sound'
import { useSettingsStore } from '@/store/settingsStore'

/** Returns a `play(cue)` that respects the learner's sound-effects setting. */
export function useSound(): (cue: SoundCue) => void {
  const enabled = useSettingsStore((state) => state.settings.soundEffects)
  return useCallback(
    (cue: SoundCue) => {
      if (enabled) soundService.play(cue)
    },
    [enabled],
  )
}
