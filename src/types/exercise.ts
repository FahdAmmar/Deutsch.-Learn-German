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

export interface OrderingExercise extends ExerciseBase {
  type: 'ordering'
  /** Words/chunks in scrambled order as shown to the learner. */
  words: string[]
  /** The correct order, as indices into `words`. */
  correctOrder: number[]
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
