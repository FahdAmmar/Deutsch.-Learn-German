import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorageEngine } from '@/lib/storage'
import { DEFAULT_PREFERENCES, type UserPreferences } from '@/types/settings'

interface SettingsState {
  settings: UserPreferences
  setAutoPlayPronunciation: (value: boolean) => void
  setSpeechRate: (value: number) => void
  setReducedMotion: (value: boolean) => void
  setShowTranslations: (value: boolean) => void
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

      resetToDefaults: () => set({ settings: DEFAULT_PREFERENCES }),
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
