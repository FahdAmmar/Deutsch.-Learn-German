import { vocabularyThemeExercises } from '../lessonPractice'
import type {
  CEFRLevel,
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
  /** 1-based position in the level's "Themenwortschatz" module: lesson id `<moduleId>-lNN`. */
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

/** Where a family of vocabulary-themed lessons lives: the level, the module that holds them, and the minutes each takes. */
export interface ThemeHome {
  level: CEFRLevel
  moduleId: string
  estimatedMinutes?: number
}

/**
 * Builds a `defineTheme` bound to one level and module. A2 and A1 each call this once (see
 * `a2/wortschatz/builders.ts`, `a1/wortschatz/builders.ts`), so the vocabulary lessons of both levels
 * are built the same way: one line per word, exercises derived from the lesson's own words.
 */
export function themeBuilder(home: ThemeHome): (config: ThemeConfig) => Lesson {
  return (config) => {
    const lessonId = `${home.moduleId}-l${String(config.number).padStart(2, '0')}`
    const prefix = `voc-${home.level.toLowerCase()}`
    const vocabulary: VocabularyItem[] = config.words.map((word) => ({
      ...word,
      id: `${prefix}-${config.slug}-${asciiSlug(word.word)}`,
      level: home.level,
      category: config.categoryAr,
    }))

    const lesson: Lesson = {
      id: lessonId,
      slug: config.slug,
      level: home.level,
      moduleId: home.moduleId,
      title: config.title,
      titleAr: config.titleAr,
      estimatedMinutes: home.estimatedMinutes ?? 25,
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
}
