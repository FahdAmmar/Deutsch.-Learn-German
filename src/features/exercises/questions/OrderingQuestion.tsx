import { useState } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { OrderingExercise } from '@/types'

interface Props {
  exercise: OrderingExercise
  onAnswer: (correct: boolean) => void
}

export function OrderingQuestion({ exercise, onAnswer }: Props) {
  const [placed, setPlaced] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)

  const isComplete = placed.length === exercise.words.length

  function placeWord(index: number) {
    if (checked || placed.includes(index)) return
    setPlaced((prev) => [...prev, index])
  }

  function removeWord(position: number) {
    if (checked) return
    setPlaced((prev) => prev.filter((_, i) => i !== position))
  }

  function handleCheck() {
    if (checked || !isComplete) return
    const isCorrect = placed.every((wordIndex, position) => wordIndex === exercise.correctOrder[position])
    setChecked(true)
    setCorrect(isCorrect)
    onAnswer(isCorrect)
  }

  return (
    <div className="space-y-4">
      <div
        dir="ltr"
        className="flex min-h-14 flex-wrap items-center gap-2 rounded-md border border-dashed border-border-strong bg-surface-muted p-3"
      >
        {placed.length === 0 && (
          <span dir="rtl" className="text-sm text-ink-faint">
            انقر على الكلمات أدناه لترتيبها هنا
          </span>
        )}
        {placed.map((wordIndex, position) => (
          <button
            key={position}
            type="button"
            onClick={() => removeWord(position)}
            disabled={checked}
            lang="de"
            className="flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-80"
          >
            {exercise.words[wordIndex]}
            {!checked && <X size={13} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div dir="ltr" className="flex flex-wrap gap-2">
        {exercise.words.map((word, index) => (
          <button
            key={index}
            type="button"
            onClick={() => placeWord(index)}
            disabled={checked || placed.includes(index)}
            lang="de"
            className={cn(
              'rounded-sm border border-border-strong px-3 py-1.5 text-sm font-medium transition-colors',
              placed.includes(index)
                ? 'invisible'
                : 'bg-surface text-ink hover:bg-surface-muted',
            )}
          >
            {word}
          </button>
        ))}
      </div>

      {checked && !correct ? (
        <p dir="ltr" lang="de" className="text-sm text-ink-muted">
          الترتيب الصحيح:{' '}
          <span className="font-semibold text-success">
            {exercise.correctOrder.map((i) => exercise.words[i]).join(' ')}
          </span>
        </p>
      ) : null}

      {!checked ? (
        <Button size="sm" onClick={handleCheck} disabled={!isComplete}>
          تحقق
        </Button>
      ) : null}
    </div>
  )
}
