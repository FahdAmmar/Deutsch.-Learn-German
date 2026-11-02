import { useCallback } from 'react'

import type { RolePlayLine } from '@/lib/rolePlay'
import { SPEAKER_PITCH } from '@/lib/stories'
import { GERMAN_LOCALE, speechService } from '@/services/speech'
import { useSettingsStore } from '@/store/settingsStore'

/** Reads a line of a conversation aloud in its speaker's voice (the two speakers differ in pitch), at the learner's chosen speed. */
export function useSpeakLine(): (line: Pick<RolePlayLine, 'de' | 'speaker'>) => void {
  const speechRate = useSettingsStore((state) => state.settings.speechRate)
  return useCallback(
    (line) => {
      speechService.speak(line.de, { language: GERMAN_LOCALE, rate: speechRate, pitch: SPEAKER_PITCH[line.speaker] })
    },
    [speechRate],
  )
}
