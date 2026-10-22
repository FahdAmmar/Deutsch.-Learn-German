import { useState } from 'react'

import type { MultipleChoiceExercise } from '@/types'

import { OptionButton } from '../OptionButton'

interface Props {
  exercise: MultipleChoiceExercise
  onAnswer: (correct: boolean) => void
}

export function MultipleChoiceQuestion({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const isArabic = exercise.optionLanguage === 'ar'

  function handleSelect(index: number) {
    if (selected !== null) return
    setSelected(index)
    onAnswer(index === exercise.correctIndex)
  }

  return (
    <div className="space-y-3">
      {exercise.questionDe ? (
        <p dir="ltr" lang="de" className="display-de text-start text-2xl font-medium text-ink">
          {exercise.questionDe}
        </p>
      ) : null}
      <div className="space-y-2" dir={isArabic ? 'rtl' : 'ltr'}>
        {exercise.options.map((option, index) => {
          let state: 'default' | 'selected-correct' | 'selected-incorrect' | 'unselected-correct' = 'default'
          if (selected !== null) {
            if (index === exercise.correctIndex) state = 'unselected-correct'
            if (index === selected && index !== exercise.correctIndex) state = 'selected-incorrect'
            if (index === selected && index === exercise.correctIndex) state = 'selected-correct'
          }
          return (
            <OptionButton
              key={option}
              marker={String.fromCharCode(65 + index)}
              onClick={() => handleSelect(index)}
              disabled={selected !== null}
              state={state}
              dir={isArabic ? 'rtl' : undefined}
            >
              <span lang={isArabic ? 'ar' : 'de'}>{option}</span>
            </OptionButton>
          )
        })}
      </div>
    </div>
  )
}
