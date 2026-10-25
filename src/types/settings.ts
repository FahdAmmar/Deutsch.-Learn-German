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
  /** Whether the Arabic translation is shown under each German paragraph or line in texts and conversations. */
  showTranslations: boolean
  /** Dictation: accept "ae/oe/ue/ss" for "ä/ö/ü/ß", for keyboards without those letters. */
  dictationAcceptTransliteration: boolean
  /** Dictation: hide the German sentence so it is a true dictation (listen, then type from the ear). */
  dictationHideText: boolean
  /** Short sounds for a correct answer, a wrong answer and a finished set of exercises. */
  soundEffects: boolean
  /** `voiceURI` of the German voice the learner picked; `null` lets the browser choose the best match. */
  preferredVoiceURI: string | null
  /** Voices the learner starred, shown first in the voice picker. */
  favoriteVoiceURIs: string[]
  /** Size of all text in the app. */
  textScale: TextScale
  /** Stronger text and border contrast than the default themes. */
  highContrast: boolean
  /** Whether the pronunciation hint (syllable split) is shown on vocabulary cards. */
  showPronunciationHints: boolean
  /** Whether stories mark forms like "zur Arbeit" or "dem Frühstück" with dots that explain the grammar on hover. */
  showGrammarHints: boolean
  /** Whether a story shows its title and play / pause / previous / next buttons on the lock screen and to media keys. */
  lockScreenControls: boolean
  /** Exercises to answer each day; drives the daily-goal ring. */
  dailyGoal: number
  /** Whether the first-run welcome step has been completed or skipped. */
  onboardingDone: boolean
}

export const TEXT_SCALES = ['normal', 'large', 'xlarge'] as const
export type TextScale = (typeof TEXT_SCALES)[number]

/** Root font-size, as a percent, for each text scale. Everything in the UI is in `rem`, so this scales all of it. */
export const TEXT_SCALE_PERCENT: Record<TextScale, number> = { normal: 100, large: 112.5, xlarge: 125 }

export const DAILY_GOAL_OPTIONS = [5, 10, 20, 30] as const

export const DEFAULT_PREFERENCES: UserPreferences = {
  autoPlayPronunciation: false,
  speechRate: 0.9,
  reducedMotion: false,
  showTranslations: true,
  dictationAcceptTransliteration: true,
  dictationHideText: false,
  soundEffects: true,
  preferredVoiceURI: null,
  favoriteVoiceURIs: [],
  textScale: 'normal',
  highContrast: false,
  showPronunciationHints: true,
  showGrammarHints: true,
  lockScreenControls: true,
  dailyGoal: 10,
  onboardingDone: false,
}
