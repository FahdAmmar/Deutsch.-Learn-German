import type { CEFRLevel } from './cefr'

export const EXERCISE_TYPES = [
  'multiple-choice',
  'fill-blank',
  'ordering',
  'matching',
  'translation',
  'true-false',
  'listening',
  'vocab-recall',
] as const

export type ExerciseType = (typeof EXERCISE_TYPES)[number]

interface ExerciseBase {
  id: string
  type: ExerciseType
  level: CEFRLevel
  /** Instruction shown above the question, in Arabic (the learner's support language). */
  promptAr: string
  /** Explanation shown after answering, regardless of correctness. */
  explanationAr: string
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: 'multiple-choice'
  /** The German question or sentence. May be empty when the question is carried by `promptAr`. */
  questionDe: string
  options: string[]
  correctIndex: number
  /** Language of the options, so they are laid out and read correctly. German unless stated. */
  optionLanguage?: 'de' | 'ar'
}

export interface TrueFalseExercise extends ExerciseBase {
  type: 'true-false'
  statementDe: string
  isTrue: boolean
}

export interface FillBlankExercise extends ExerciseBase {
  type: 'fill-blank'
  /** Sentence with a single blank marked as ___. */
  sentenceDe: string
  /** Accepted answers (to tolerate minor, meaning-neutral variants). */
  acceptedAnswers: string[]
  hint?: string
}

/** The part a chunk plays in a sentence, for exercises that show the structure of the sentence once it is built. */
export const ORDER_ROLES = [
  'subject',
  'verb',
  'verb-end',
  'object',
  'time',
  'manner',
  'place',
  'question-word',
  'conjunction',
  'other',
] as const

export type OrderRole = (typeof ORDER_ROLES)[number]

export interface OrderingExercise extends ExerciseBase {
  type: 'ordering'
  /** Words/chunks in scrambled order as shown to the learner. */
  words: string[]
  /** The correct order, as indices into `words`. */
  correctOrder: number[]
  /** Other orders that are just as correct (a time phrase before or after a place), as indices into `words`. */
  acceptedOrders?: number[][]
  /** The role of each entry of `words`, same length and order. When present, the built sentence is shown with its parts named. */
  roles?: OrderRole[]
}

export interface MatchingPair {
  de: string
  ar: string
}

export interface MatchingExercise extends ExerciseBase {
  type: 'matching'
  pairs: MatchingPair[]
}

export interface TranslationExercise extends ExerciseBase {
  type: 'translation'
  direction: 'de-to-ar' | 'ar-to-de'
  sourceText: string
  acceptedAnswers: string[]
}

export interface ListeningExercise extends ExerciseBase {
  type: 'listening'
  audioText: string
  options: string[]
  correctIndex: number
}

export interface VocabRecallExercise extends ExerciseBase {
  type: 'vocab-recall'
  vocabularyId: string
  questionDe: string
  correctAnswerAr: string
  distractorsAr: string[]
}

export type Exercise =
  | MultipleChoiceExercise
  | TrueFalseExercise
  | FillBlankExercise
  | OrderingExercise
  | MatchingExercise
  | TranslationExercise
  | ListeningExercise
  | VocabRecallExercise

export interface ExerciseResult {
  exerciseId: string
  correct: boolean
  attemptedAt: number
}
