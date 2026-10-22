import type { Exercise } from '@/types'

export type TextLanguage = 'de' | 'ar'

export interface ExerciseDigest {
  /** What was asked, short enough for a list. */
  prompt: string
  promptLanguage: TextLanguage
  /** The right answer. */
  answer: string
  answerLanguage: TextLanguage
}

/**
 * Reduces any exercise to "what was asked" and "what the answer was", so the
 * end-of-session summary can show a mistake without knowing exercise types.
 * The `never` check makes a new exercise type fail to compile until handled here.
 */
export function digestExercise(exercise: Exercise): ExerciseDigest {
  switch (exercise.type) {
    case 'multiple-choice':
      return {
        prompt: exercise.questionDe || exercise.promptAr,
        promptLanguage: exercise.questionDe ? 'de' : 'ar',
        answer: exercise.options[exercise.correctIndex] ?? '',
        answerLanguage: exercise.optionLanguage ?? 'de',
      }
    case 'true-false':
      return {
        prompt: exercise.statementDe,
        promptLanguage: 'de',
        answer: exercise.isTrue ? 'صحيح' : 'خطأ',
        answerLanguage: 'ar',
      }
    case 'fill-blank':
      return {
        prompt: exercise.sentenceDe,
        promptLanguage: 'de',
        answer: exercise.acceptedAnswers[0] ?? '',
        answerLanguage: 'de',
      }
    case 'ordering':
      return {
        prompt: exercise.promptAr,
        promptLanguage: 'ar',
        answer: exercise.correctOrder.map((index) => exercise.words[index]).join(' '),
        answerLanguage: 'de',
      }
    case 'matching':
      return {
        prompt: exercise.promptAr,
        promptLanguage: 'ar',
        answer: exercise.pairs.map((pair) => `${pair.de} = ${pair.ar}`).join(' · '),
        answerLanguage: 'de',
      }
    case 'translation':
      return {
        prompt: exercise.sourceText,
        promptLanguage: exercise.direction === 'de-to-ar' ? 'de' : 'ar',
        answer: exercise.acceptedAnswers[0] ?? '',
        answerLanguage: exercise.direction === 'de-to-ar' ? 'ar' : 'de',
      }
    case 'listening':
      return {
        prompt: exercise.audioText,
        promptLanguage: 'de',
        answer: exercise.options[exercise.correctIndex] ?? exercise.audioText,
        answerLanguage: 'de',
      }
    case 'vocab-recall':
      return {
        prompt: exercise.questionDe,
        promptLanguage: 'de',
        answer: exercise.correctAnswerAr,
        answerLanguage: 'ar',
      }
    default: {
      const _exhaustive: never = exercise
      return _exhaustive
    }
  }
}
