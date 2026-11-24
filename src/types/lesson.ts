import type { CEFRLevel } from './cefr'
import type { Dialogue } from './dialogue'
import type { DiagramScene } from './diagram'
import type { Exercise } from './exercise'
import type { AdjectiveComparison, GrammarTopic } from './grammar'
import type { RuleBlock, RuleTone } from './grammarRule'
import type { ReadingText } from './reading'
import type { VocabularyItem } from './vocabulary'

export interface LessonExample {
  de: string
  ar: string
}

/** The small picture in the tile beside a section's heading. */
export type LessonSectionIcon = 'hash' | 'clock' | 'calendar' | 'sparkles' | 'book' | 'message' | 'globe' | 'compass'

export interface LessonSection {
  /** Heading shown for this explanation block (Arabic, since explanations are in Arabic). */
  titleAr: string
  /** The idea in a few plain sentences. The visual `blocks` carry the detail, so keep this short. */
  bodyAr: string
  /** Small German label above the heading, e.g. `Tageszeit`. */
  kickerDe?: string
  /** Accent colour of the section's kicker, icon and highlights. Defaults to `accent`. */
  tone?: RuleTone
  /** Picture shown in a tile beside the heading; leave out when the heading says it all. */
  icon?: LessonSectionIcon
  /**
   * Visual blocks drawn under the prose (formula, table, pattern cards, examples, compare, …).
   * They are the same typed blocks the grammar rules use, so a lesson never needs its own markup.
   */
  blocks?: RuleBlock[]
}

export interface PronunciationTip {
  titleAr: string
  bodyAr: string
  example?: string
}

export interface Lesson {
  id: string
  slug: string
  level: CEFRLevel
  moduleId: string
  title: string
  titleAr: string
  /** One sentence under the title that says what the lesson gives the learner (the hero's lead). */
  taglineAr?: string
  /** A single sentence the hero shows and can read aloud — the lesson in one example. */
  heroExample?: LessonExample
  /** Concrete, learner-facing objectives, in Arabic. */
  objectivesAr: string[]
  /** Core explanation of the lesson's topic, in Arabic, referencing German examples. */
  explanation: LessonSection[]
  /** Embedded grammar topic(s) taught in this lesson, if any. */
  grammarTopics?: GrammarTopic[]
  examples: LessonExample[]
  vocabulary: VocabularyItem[]
  /** A clickable illustration (room / body) that reveals example sentences per hotspot. */
  interactiveDiagram?: DiagramScene
  /** Adjective degree data (Positiv/Komparativ/Superlativ) rendered by the ComparisonLadder component. */
  adjectiveComparisons?: AdjectiveComparison[]
  /** Short, targeted pronunciation notes for tricky sounds introduced in this lesson. */
  pronunciationTips?: PronunciationTip[]
  /** Practical-usage dialogues (typically one informal, one formal register). */
  dialogues?: Dialogue[]
  exercises: Exercise[]
  commonMistakes?: { wrong: string; correct: string; explanationAr: string }[]
  /** Estimated time to complete, in minutes — shown to set expectations, not a hard limit. */
  estimatedMinutes: number
}

export interface Module {
  id: string
  slug: string
  level: CEFRLevel
  title: string
  titleAr: string
  order: number
  lessons: Lesson[]
}

export interface LevelCurriculum {
  level: CEFRLevel
  modules: Module[]
  /** Standalone bilingual reading passages for this level (the "Reading" tab). Always present, empty until authored. */
  readingTexts: ReadingText[]
  /**
   * Standalone conversations: longer, situational dialogues that belong to no
   * single lesson (at the pharmacy, a phone call, registering at the town
   * hall). They appear after the lesson conversations in the level's "texts &
   * conversations" tab. Always present, empty until authored.
   */
  conversations: Dialogue[]
}
