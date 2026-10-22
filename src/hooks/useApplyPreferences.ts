import { useEffect } from 'react'

import { speechService } from '@/services/speech'
import { useSettingsStore } from '@/store/settingsStore'
import { TEXT_SCALE_PERCENT } from '@/types/settings'

/**
 * Applies the learner's display and speech preferences to the page and the
 * speech service. Mounted once at the app root.
 *
 * Everything in the UI is sized in `rem`, so changing the root font size scales
 * all text, spacing and controls together — nothing needs its own text-size logic.
 */
export function useApplyPreferences(): void {
  const reducedMotion = useSettingsStore((state) => state.settings.reducedMotion)
  const textScale = useSettingsStore((state) => state.settings.textScale)
  const highContrast = useSettingsStore((state) => state.settings.highContrast)
  const preferredVoiceURI = useSettingsStore((state) => state.settings.preferredVoiceURI)

  // The user-level "reduce motion" preference layers on top of (doesn't replace)
  // the OS-level `prefers-reduced-motion` media query already handled in index.css.
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reducedMotion)
  }, [reducedMotion])

  useEffect(() => {
    document.documentElement.style.fontSize = `${TEXT_SCALE_PERCENT[textScale]}%`
  }, [textScale])

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast)
  }, [highContrast])

  useEffect(() => {
    speechService.setPreferredVoice(preferredVoiceURI)
  }, [preferredVoiceURI])
}
