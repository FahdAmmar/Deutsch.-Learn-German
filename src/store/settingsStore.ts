import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorageEngine } from '@/lib/storage'
import { DEFAULT_PREFERENCES, type TextScale, type UserPreferences } from '@/types/settings'

interface SettingsState {
  settings: UserPreferences
  setAutoPlayPronunciation: (value: boolean) => void
  setSpeechRate: (value: number) => void
  setReducedMotion: (value: boolean) => void
  setShowTranslations: (value: boolean) => void
  setDictationAcceptTransliteration: (value: boolean) => void
  setDictationHideText: (value: boolean) => void
  setSoundEffects: (value: boolean) => void
  setPreferredVoiceURI: (value: string | null) => void
  toggleFavoriteVoice: (voiceURI: string) => void
  setTextScale: (value: TextScale) => void
  setHighContrast: (value: boolean) => void
  setShowPronunciationHints: (value: boolean) => void
  setShowGrammarHints: (value: boolean) => void
  setLockScreenControls: (value: boolean) => void
  setDailyGoal: (value: number) => void
  completeOnboarding: () => void
  resetToDefaults: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_PREFERENCES,

      setAutoPlayPronunciation: (value) =>
        set((state) => ({ settings: { ...state.settings, autoPlayPronunciation: value } })),

      setSpeechRate: (value) =>
        set((state) => ({
          settings: { ...state.settings, speechRate: Math.min(Math.max(value, 0.5), 1.5) },
        })),

      setReducedMotion: (value) =>
        set((state) => ({ settings: { ...state.settings, reducedMotion: value } })),

      setShowTranslations: (value) =>
        set((state) => ({ settings: { ...state.settings, showTranslations: value } })),

      setDictationAcceptTransliteration: (value) =>
        set((state) => ({ settings: { ...state.settings, dictationAcceptTransliteration: value } })),

      setDictationHideText: (value) =>
        set((state) => ({ settings: { ...state.settings, dictationHideText: value } })),

      setSoundEffects: (value) => set((state) => ({ settings: { ...state.settings, soundEffects: value } })),

      setPreferredVoiceURI: (value) => set((state) => ({ settings: { ...state.settings, preferredVoiceURI: value } })),

      toggleFavoriteVoice: (voiceURI) =>
        set((state) => {
          const current = state.settings.favoriteVoiceURIs
          const next = current.includes(voiceURI) ? current.filter((uri) => uri !== voiceURI) : [...current, voiceURI]
          return { settings: { ...state.settings, favoriteVoiceURIs: next } }
        }),

      setTextScale: (value) => set((state) => ({ settings: { ...state.settings, textScale: value } })),

      setHighContrast: (value) => set((state) => ({ settings: { ...state.settings, highContrast: value } })),

      setShowPronunciationHints: (value) =>
        set((state) => ({ settings: { ...state.settings, showPronunciationHints: value } })),

      setShowGrammarHints: (value) => set((state) => ({ settings: { ...state.settings, showGrammarHints: value } })),

      setLockScreenControls: (value) => set((state) => ({ settings: { ...state.settings, lockScreenControls: value } })),

      setDailyGoal: (value) =>
        set((state) => ({ settings: { ...state.settings, dailyGoal: Math.min(Math.max(Math.round(value), 1), 100) } })),

      completeOnboarding: () => set((state) => ({ settings: { ...state.settings, onboardingDone: true } })),

      // Resetting preferences must not send a returning learner back through the welcome step.
      resetToDefaults: () =>
        set((state) => ({ settings: { ...DEFAULT_PREFERENCES, onboardingDone: state.settings.onboardingDone } })),
    }),
    {
      name: 'preferences',
      // Preferences saved by an older version lack newer fields; fill those from the defaults
      // instead of letting the stored object replace `settings` wholesale.
      merge: (persisted, current) => ({
        ...current,
        settings: { ...current.settings, ...((persisted as Partial<SettingsState> | undefined)?.settings ?? {}) },
      }),
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: (name, value) => zustandStorageEngine.setItem(name, JSON.stringify(value)),
        removeItem: (name) => zustandStorageEngine.removeItem(name),
      },
    },
  ),
)
