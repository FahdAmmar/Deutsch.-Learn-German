import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

import { Button, Card, CardBody } from '@/components/ui'
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
      <CardBody className="space-y-5">
        <div dir="rtl" className="flex items-center justify-between text-sm text-ink-muted">
          <span>{exercise.promptAr}</span>
          <span className="font-mono text-xs">
            {questionNumber} / {totalQuestions}
          </span>
        </div>

        <ExerciseQuestion exercise={exercise} onAnswer={setResult} />

        {result !== null ? <FeedbackBanner correct={result} explanationAr={exercise.explanationAr} /> : null}

        {result !== null ? (
          <div dir="rtl" className="flex justify-end">
            <Button onClick={() => onNext(result)} icon={<ArrowLeft size={16} aria-hidden="true" />} iconPosition="end">
              {isLast ? 'إنهاء' : 'التالي'}
            </Button>
          </div>
        ) : null}
      </CardBody>
    </Card>
  )
}
