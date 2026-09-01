import { useState } from 'react'

import type { TrueFalseExercise } from '@/types'

import { OptionButton } from '../OptionButton'

interface Props {
  exercise: TrueFalseExercise
  onAnswer: (correct: boolean) => void
}

export function TrueFalseQuestion({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<boolean | null>(null)

  function handleSelect(value: boolean) {
    if (selected !== null) return
    setSelected(value)
    onAnswer(value === exercise.isTrue)
  }

  const choices: { value: boolean; labelAr: string }[] = [
    { value: true, labelAr: 'صحيح' },
    { value: false, labelAr: 'خطأ' },
  ]

  return (
    <div className="space-y-3">
      <p dir="ltr" lang="de" className="text-lg font-medium text-ink">
        {exercise.statementDe}
      </p>
      <div className="grid grid-cols-2 gap-2" dir="rtl">
        {choices.map((choice) => {
          let state: 'default' | 'selected-correct' | 'selected-incorrect' | 'unselected-correct' = 'default'
          if (selected !== null) {
            if (choice.value === exercise.isTrue) state = 'unselected-correct'
            if (choice.value === selected && choice.value !== exercise.isTrue) state = 'selected-incorrect'
            if (choice.value === selected && choice.value === exercise.isTrue) state = 'selected-correct'
          }
          return (
            <OptionButton
              key={String(choice.value)}
              onClick={() => handleSelect(choice.value)}
              disabled={selected !== null}
              state={state}
            >
              {choice.labelAr}
            </OptionButton>
          )
        })}
      </div>
    </div>
  )
}
