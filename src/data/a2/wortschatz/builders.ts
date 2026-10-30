import { vocabularyThemeExercises } from '../../lessonPractice'
import type {
  GermanArticle,
  Lesson,
  LessonExample,
  LessonSection,
  PartOfSpeech,
  PronunciationTip,
  VerbForms,
  VocabularyItem,
} from '@/types'

/**
 * Small constructors that keep a vocabulary-themed lesson readable: one line per word.
 * They only build typed data (`VocabularyItem`, `Lesson`) — all teaching content stays
 * in the theme files, and the derived exercises come from `lessonPractice.ts`.
 */

/** A word before it gets its id, level and category from the lesson it belongs to. */
export type ThemeWord = Omit<VocabularyItem, 'id' | 'level' | 'category'>

/** `der Tisch` → `tisch`; umlauts and ß become ae/oe/ue/ss so an id stays plain ASCII. */
function asciiSlug(word: string): string {
  return word
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function item(partOfSpeech: PartOfSpeech, word: string, meaningAr: string, de: string, ar: string, extra: Partial<ThemeWord> = {}): ThemeWord {
  return { word, partOfSpeech, meaningAr, example: { de, ar }, ...extra }
}

/** A noun with an ordinary plural. */
export function noun(article: GermanArticle, word: string, plural: string, meaningAr: string, de: string, ar: string): ThemeWord {
  return item('noun', word, meaningAr, de, ar, { article, plural })
}

/** A noun used without a plural in normal speech (der Hunger, das Geld). */
export function nounNoPlural(article: GermanArticle, word: string, meaningAr: string, de: string, ar: string): ThemeWord {
  return item('noun', word, meaningAr, de, ar, { article, numberUse: 'none' })
}

/** A noun that exists only in the plural (die Eltern, die Nudeln). */
export function nounPluralOnly(word: string, meaningAr: string, de: string, ar: string): ThemeWord {
  return item('noun', word, `${meaningAr} (جمع فقط)`, de, ar, { article: 'die', numberUse: 'only' })
}

/**
 * A verb. `forms` holds only what the regular pattern cannot produce: give `present`
 * for a stem change, and always give the Präteritum, Partizip II and auxiliary.
 */
export function verb(word: string, meaningAr: string, forms: VerbForms, de: string, ar: string): ThemeWord {
  return item('verb', word, meaningAr, de, ar, { verb: forms })
}

export function adjective(word: string, meaningAr: string, de: string, ar: string): ThemeWord {
  return item('adjective', word, meaningAr, de, ar)
}

export function adverb(word: string, meaningAr: string, de: string, ar: string): ThemeWord {
  return item('adverb', word, meaningAr, de, ar)
}

export function phrase(word: string, meaningAr: string, de: string, ar: string): ThemeWord {
  return item('phrase', word, meaningAr, de, ar)
}

export interface ThemeConfig {
  /** 1-based position in the A2 "Themenwortschatz" module: lesson id `a2-m15-lNN`. */
  number: number
  slug: string
  title: string
  titleAr: string
  /** Arabic label of the vocabulary category (shown on the vocabulary page). */
  categoryAr: string
  objectivesAr: string[]
  explanation: LessonSection[]
  examples: LessonExample[]
  words: ThemeWord[]
  commonMistakes?: Lesson['commonMistakes']
  pronunciationTips?: PronunciationTip[]
}

export const WORTSCHATZ_MODULE_ID = 'a2-m15'

/** Builds a whole vocabulary-themed lesson; its exercises are derived from its own words. */
export function defineTheme(config: ThemeConfig): Lesson {
  const lessonId = `${WORTSCHATZ_MODULE_ID}-l${String(config.number).padStart(2, '0')}`
  const vocabulary: VocabularyItem[] = config.words.map((word) => ({
    ...word,
    id: `voc-a2-${config.slug}-${asciiSlug(word.word)}`,
    level: 'A2',
    category: config.categoryAr,
  }))

  const lesson: Lesson = {
    id: lessonId,
    slug: config.slug,
    level: 'A2',
    moduleId: WORTSCHATZ_MODULE_ID,
    title: config.title,
    titleAr: config.titleAr,
    estimatedMinutes: 25,
    objectivesAr: config.objectivesAr,
    explanation: config.explanation,
    examples: config.examples,
    vocabulary,
    exercises: [],
    commonMistakes: config.commonMistakes,
    pronunciationTips: config.pronunciationTips,
  }
  return { ...lesson, exercises: vocabularyThemeExercises(lesson) }
}
