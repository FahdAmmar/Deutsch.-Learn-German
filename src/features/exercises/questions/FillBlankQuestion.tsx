import { useState } from 'react'

import { ArticleText, Button, InlineMarkup, SpecialCharsBar } from '@/components/ui'
import { useInsertAtCaret } from '@/hooks/useInsertAtCaret'
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
  const { ref: inputRef, insert } = useInsertAtCaret<HTMLInputElement>(value, setValue)

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
      <p dir="ltr" lang="de" className="display-de flex flex-wrap items-center gap-2 text-2xl font-medium text-ink">
        <span>
          <ArticleText text={before} />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleCheck()}
          disabled={checked}
          dir="ltr"
          lang="de"
          aria-label="أدخل إجابتك"
          className="h-11 w-44 rounded-md border-2 border-border-strong bg-surface-sunken px-3 text-center text-xl outline-none focus-visible:border-accent disabled:opacity-70"
        />
        <span>
          <ArticleText text={after ?? ''} />
        </span>
      </p>
      {!checked ? <SpecialCharsBar onInsert={insert} /> : null}
      {exercise.hint && !checked ? (
        <p dir="rtl" className="text-xs text-ink-faint">
          تلميح: <InlineMarkup text={exercise.hint} />
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
