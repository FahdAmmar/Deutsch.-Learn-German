export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

/**
 * Preferences other than theme, which lives in its own store (see
 * `store/themeStore.ts`) since it has DOM side effects (toggling a class,
 * listening to the OS media query) that don't belong with plain settings.
 */
export interface UserPreferences {
  /** Whether German words/sentences can be clicked to hear pronunciation automatically on lesson load. */
  autoPlayPronunciation: boolean
  /** Playback rate for speech synthesis (0.5–1.5). */
  speechRate: number
  reducedMotion: boolean
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  autoPlayPronunciation: false,
  speechRate: 0.9,
  reducedMotion: false,
}
