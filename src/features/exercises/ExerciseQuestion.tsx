import type { Exercise } from '@/types'

import { FillBlankQuestion } from './questions/FillBlankQuestion'
import { ListeningQuestion } from './questions/ListeningQuestion'
import { MatchingQuestion } from './questions/MatchingQuestion'
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion'
import { OrderingQuestion } from './questions/OrderingQuestion'
import { TranslationQuestion } from './questions/TranslationQuestion'
import { TrueFalseQuestion } from './questions/TrueFalseQuestion'
import { VocabRecallQuestion } from './questions/VocabRecallQuestion'

interface ExerciseQuestionProps {
  exercise: Exercise
  onAnswer: (correct: boolean) => void
}

/**
 * Dispatches to the renderer for `exercise.type`. This is the one place
 * that needs to know about every exercise type — lesson/practice screens
 * just render <ExerciseQuestion exercise={...} onAnswer={...} /> and stay
 * oblivious to the specific type, so exercises stay fully data-driven.
 */
export function ExerciseQuestion({ exercise, onAnswer }: ExerciseQuestionProps) {
  switch (exercise.type) {
    case 'multiple-choice':
      return <MultipleChoiceQuestion exercise={exercise} onAnswer={onAnswer} />
    case 'true-false':
      return <TrueFalseQuestion exercise={exercise} onAnswer={onAnswer} />
    case 'fill-blank':
      return <FillBlankQuestion exercise={exercise} onAnswer={onAnswer} />
    case 'ordering':
      return <OrderingQuestion exercise={exercise} onAnswer={onAnswer} />
    case 'matching':
      return <MatchingQuestion exercise={exercise} onAnswer={onAnswer} />
    case 'translation':
      return <TranslationQuestion exercise={exercise} onAnswer={onAnswer} />
    case 'listening':
      return <ListeningQuestion exercise={exercise} onAnswer={onAnswer} />
    case 'vocab-recall':
      return <VocabRecallQuestion exercise={exercise} onAnswer={onAnswer} />
    default: {
      // Exhaustiveness check: if a new ExerciseType is added without a
      // renderer here, this will fail to type-check.
      const _exhaustive: never = exercise
      return _exhaustive
    }
  }
}
