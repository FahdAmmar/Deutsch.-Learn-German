import { themeBuilder } from '../../shared/themeBuilders'

export {
  adjective,
  adverb,
  noun,
  nounNoPlural,
  nounPluralOnly,
  phrase,
  verb,
  type ThemeConfig,
  type ThemeWord,
} from '../../shared/themeBuilders'

export const A1_WORTSCHATZ_MODULE_ID = 'a1-m21'

/** Builds a whole A1 vocabulary-themed lesson; its exercises are derived from its own words. */
export const defineTheme = themeBuilder({ level: 'A1', moduleId: A1_WORTSCHATZ_MODULE_ID, estimatedMinutes: 20 })
