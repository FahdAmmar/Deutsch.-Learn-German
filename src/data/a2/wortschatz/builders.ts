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

export const WORTSCHATZ_MODULE_ID = 'a2-m15'

/** Builds a whole A2 vocabulary-themed lesson; its exercises are derived from its own words. */
export const defineTheme = themeBuilder({ level: 'A2', moduleId: WORTSCHATZ_MODULE_ID })
