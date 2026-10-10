import { useState } from 'react'

import { Button } from '@/components/ui'
import type { TranslationExercise } from '@/types'
import { isAnswerAccepted } from '@/utils/text'

interface Props {
  exercise: TranslationExercise
  onAnswer: (correct: boolean) => void
}

export function TranslationQuestion({ exercise, onAnswer }: Props) {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)

  const sourceIsGerman = exercise.direction === 'de-to-ar'
  const answerDir = sourceIsGerman ? 'rtl' : 'ltr'

  function handleCheck() {
    if (checked || !value.trim()) return
    const isCorrect = isAnswerAccepted(value, exercise.acceptedAnswers)
    setChecked(true)
    setCorrect(isCorrect)
    onAnswer(isCorrect)
  }

  return (
    <div className="space-y-3">
      <p dir={sourceIsGerman ? 'ltr' : 'rtl'} lang={sourceIsGerman ? 'de' : 'ar'} className="text-lg font-medium text-ink">
        {exercise.sourceText}
      </p>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={checked}
        dir={answerDir}
        lang={sourceIsGerman ? 'ar' : 'de'}
        rows={2}
        aria-label="أدخل ترجمتك"
        placeholder={sourceIsGerman ? 'اكتب الترجمة بالعربية' : 'Schreib die Übersetzung auf Deutsch'}
        className="w-full resize-none rounded-md border-2 border-border-strong bg-surface-sunken p-3.5 text-base outline-none focus-visible:border-accent disabled:opacity-70"
      />
      {checked && !correct ? (
        <p dir={answerDir} className="text-sm text-ink-muted">
          <span className="text-ink-faint">إجابة مقترحة: </span>
          <span className="font-semibold text-success">{exercise.acceptedAnswers[0]}</span>
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
