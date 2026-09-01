import { useState } from 'react'
import { RotateCcw, CheckCircle2 } from 'lucide-react'

import { Button, Card, CardBody, ProgressBar } from '@/components/ui'
import type { Exercise } from '@/types'
import { useProgressStore } from '@/store/progressStore'

import { ExerciseCard } from './ExerciseCard'

interface ExerciseRunnerProps {
  exercises: Exercise[]
  /** Called once all exercises have been answered, with accuracy from 0–1. */
  onComplete?: (accuracy: number) => void
}

export function ExerciseRunner({ exercises, onComplete }: ExerciseRunnerProps) {
  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [runId, setRunId] = useState(0)
  const recordVocabularyReview = useProgressStore((state) => state.recordVocabularyReview)

  if (exercises.length === 0) {
    return (
      <p dir="rtl" className="text-sm text-ink-muted">
        لا توجد تمارين متاحة لهذا الدرس حالياً.
      </p>
    )
  }

  const currentExercise = exercises[index]
  const accuracy = correctCount / exercises.length

  function handleNext(correct: boolean) {
    if (currentExercise.type === 'vocab-recall') {
      recordVocabularyReview(currentExercise.vocabularyId, correct)
    }

    const newCorrectCount = correctCount + (correct ? 1 : 0)
    setCorrectCount(newCorrectCount)

    if (index + 1 >= exercises.length) {
      setFinished(true)
      onComplete?.(newCorrectCount / exercises.length)
    } else {
      setIndex((prev) => prev + 1)
    }
  }

  function handleRestart() {
    setIndex(0)
    setCorrectCount(0)
    setFinished(false)
    setRunId((prev) => prev + 1)
  }

  if (finished) {
    const percent = Math.round(accuracy * 100)
    return (
      <Card>
        <CardBody dir="rtl" className="flex flex-col items-center gap-4 py-8 text-center">
          <CheckCircle2 size={40} className="text-success" aria-hidden="true" />
          <div>
            <p className="text-lg font-semibold text-ink">أكملت التمارين!</p>
            <p className="text-ink-muted">
              أجبت بشكل صحيح على {correctCount} من {exercises.length} ({percent}%)
            </p>
          </div>
          <div className="w-full max-w-xs">
            <ProgressBar value={accuracy} tone={accuracy >= 0.7 ? 'success' : 'accent'} label="نسبة الإجابات الصحيحة" />
          </div>
          <Button variant="outline" size="sm" onClick={handleRestart} icon={<RotateCcw size={15} aria-hidden="true" />}>
            إعادة المحاولة
          </Button>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <ProgressBar value={index / exercises.length} label="تقدّم التمارين" />
      <ExerciseCard
        key={`${runId}-${currentExercise.id}`}
        exercise={currentExercise}
        questionNumber={index + 1}
        totalQuestions={exercises.length}
        onNext={handleNext}
        isLast={index + 1 === exercises.length}
      />
    </div>
  )
}
