import { useState } from 'react'

import { Button } from '@/components/ui'
import type { FillBlankExercise } from '@/types'
import { isAnswerAccepted } from '@/utils/text'

interface Props {
  exercise: FillBlankExercise
  onAnswer: (correct: boolean) => void
}

export function FillBlankQuestion({ exercise, onAnswer }: Props) {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)

  const [before, after] = exercise.sentenceDe.split('___')

  function handleCheck() {
    if (checked || !value.trim()) return
    const isCorrect = isAnswerAccepted(value, exercise.acceptedAnswers)
    setChecked(true)
    setCorrect(isCorrect)
    onAnswer(isCorrect)
  }

  return (
    <div className="space-y-3">
      <p dir="ltr" lang="de" className="flex flex-wrap items-center gap-2 text-lg font-medium text-ink">
        <span>{before}</span>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleCheck()}
          disabled={checked}
          dir="ltr"
          lang="de"
          aria-label="أدخل إجابتك"
          className="w-40 rounded-sm border-b-2 border-primary bg-transparent px-1 py-0.5 text-center outline-none disabled:opacity-70"
        />
        <span>{after}</span>
      </p>
      {exercise.hint && !checked ? (
        <p dir="rtl" className="text-xs text-ink-faint">
          تلميح: {exercise.hint}
        </p>
      ) : null}
      {checked && !correct ? (
        <p dir="ltr" lang="de" className="text-sm text-ink-muted">
          الإجابة الصحيحة: <span className="font-semibold text-success">{exercise.acceptedAnswers[0]}</span>
        </p>
      ) : null}
      {!checked ? (
        <Button size="sm" onClick={handleCheck} disabled={!value.trim()}>
          تحقق
        </Button>
      ) : null}
    </div>
  )
}
