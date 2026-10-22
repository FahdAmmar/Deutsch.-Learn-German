import { useCallback, useRef, useState } from 'react'
import { ArrowLeft } from 'lucide-react'

import { Button, Card, InlineMarkup } from '@/components/ui'
import { useSound } from '@/hooks/useSound'
import type { Exercise, ExerciseType } from '@/types'

import { ExerciseQuestion } from './ExerciseQuestion'
import { FeedbackBanner } from './FeedbackBanner'
import { useExerciseShortcuts } from './useExerciseShortcuts'

interface ExerciseCardProps {
  exercise: Exercise
  questionNumber: number
  totalQuestions: number
  onNext: (correct: boolean) => void
  isLast: boolean
}

/** Exercise types answered by picking one numbered option, so the 1–9 shortcut applies. */
const OPTION_TYPES: ReadonlySet<ExerciseType> = new Set(['multiple-choice', 'true-false', 'listening', 'vocab-recall'])

export function ExerciseCard({ exercise, questionNumber, totalQuestions, onNext, isLast }: ExerciseCardProps) {
  const [result, setResult] = useState<boolean | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const playSound = useSound()

  const handleAnswer = useCallback(
    (correct: boolean) => {
      setResult(correct)
      playSound(correct ? 'correct' : 'wrong')
    },
    [playSound],
  )

  const handleNext = useCallback(() => {
    if (result !== null) onNext(result)
  }, [onNext, result])

  useExerciseShortcuts({ rootRef, answered: result !== null, onNext: handleNext })

  const usesOptions = OPTION_TYPES.has(exercise.type)

  return (
    <Card>
      <div ref={rootRef} className="space-y-6 p-4 sm:p-6">
        <div dir="rtl" className="flex items-start justify-between gap-4">
          <p className="text-[1.05rem] font-semibold text-ink">
            <InlineMarkup text={exercise.promptAr} />
          </p>
          <span className="tnum shrink-0 rounded-md bg-surface-sunken px-2.5 py-1 text-sm font-semibold text-ink-muted">
            {questionNumber} من {totalQuestions}
          </span>
        </div>

        <ExerciseQuestion exercise={exercise} onAnswer={handleAnswer} />

        {result !== null ? <FeedbackBanner correct={result} explanationAr={exercise.explanationAr} /> : null}

        {result !== null ? (
          <div dir="rtl" className="flex items-center justify-between gap-3">
            <p className="hidden text-sm text-ink-faint pointer-fine:block">
              اضغط <kbd className="rounded-sm border border-border-strong px-1.5 font-sans">Enter</kbd> للمتابعة
            </p>
            <Button size="lg" onClick={handleNext} icon={<ArrowLeft size={18} aria-hidden="true" />} iconPosition="end" className="ms-auto">
              {isLast ? 'إنهاء' : 'التالي'}
            </Button>
          </div>
        ) : usesOptions ? (
          <p dir="rtl" className="hidden text-sm text-ink-faint pointer-fine:block">
            اختصار: اضغط رقم الخيار (<kbd className="rounded-sm border border-border-strong px-1.5 font-sans">1</kbd>،{' '}
            <kbd className="rounded-sm border border-border-strong px-1.5 font-sans">2</kbd>…) لاختياره
          </p>
        ) : null}
      </div>
    </Card>
  )
}
