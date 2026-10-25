import type { CEFRLevel } from './cefr'
import type { Dialogue } from './dialogue'
import type { DiagramScene } from './diagram'
import type { Exercise } from './exercise'
import type { AdjectiveComparison, GrammarTopic } from './grammar'
import type { ReadingText } from './reading'
import type { VocabularyItem } from './vocabulary'

export interface LessonExample {
  de: string
  ar: string
}

export interface LessonSection {
  /** Heading shown for this explanation block (Arabic, since explanations are in Arabic). */
  titleAr: string
  bodyAr: string
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
