import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

import { Button, Card, InlineMarkup } from '@/components/ui'
import type { Exercise } from '@/types'

import { ExerciseQuestion } from './ExerciseQuestion'
import { FeedbackBanner } from './FeedbackBanner'

interface ExerciseCardProps {
  exercise: Exercise
  questionNumber: number
  totalQuestions: number
  onNext: (correct: boolean) => void
  isLast: boolean
}

export function ExerciseCard({ exercise, questionNumber, totalQuestions, onNext, isLast }: ExerciseCardProps) {
  const [result, setResult] = useState<boolean | null>(null)

  return (
    <Card>
      <div className="space-y-6 p-4 sm:p-6">
        <div dir="rtl" className="flex items-start justify-between gap-4">
          <p className="text-[1.05rem] font-semibold text-ink">
            <InlineMarkup text={exercise.promptAr} />
          </p>
          <span className="tnum shrink-0 rounded-md bg-surface-sunken px-2.5 py-1 text-sm font-semibold text-ink-muted">
            {questionNumber} من {totalQuestions}
          </span>
        </div>

        <ExerciseQuestion exercise={exercise} onAnswer={setResult} />

        {result !== null ? <FeedbackBanner correct={result} explanationAr={exercise.explanationAr} /> : null}

        {result !== null ? (
          <div dir="rtl" className="flex justify-end">
            <Button size="lg" onClick={() => onNext(result)} icon={<ArrowLeft size={18} aria-hidden="true" />} iconPosition="end">
              {isLast ? 'إنهاء' : 'التالي'}
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  )
}
