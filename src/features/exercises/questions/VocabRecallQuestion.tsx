import { useMemo, useState } from 'react'

import { ArticleText } from '@/components/ui'
import type { VocabRecallExercise } from '@/types'
import { shuffle } from '@/utils/shuffle'

import { OptionButton } from '../OptionButton'

interface Props {
  exercise: VocabRecallExercise
  onAnswer: (correct: boolean) => void
}

export function VocabRecallQuestion({ exercise, onAnswer }: Props) {
  const options = useMemo(
    () => shuffle([exercise.correctAnswerAr, ...exercise.distractorsAr]),
    [exercise.correctAnswerAr, exercise.distractorsAr],
  )
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(option: string) {
    if (selected !== null) return
    setSelected(option)
    onAnswer(option === exercise.correctAnswerAr)
  }

  return (
    <div className="space-y-3">
      <p dir="ltr" lang="de" className="text-lg font-medium text-ink">
        <ArticleText text={exercise.questionDe} />
      </p>
      <div className="space-y-2" dir="rtl">
        {options.map((option) => {
          let state: 'default' | 'selected-correct' | 'selected-incorrect' | 'unselected-correct' = 'default'
          if (selected !== null) {
            if (option === exercise.correctAnswerAr) state = 'unselected-correct'
            if (option === selected && option !== exercise.correctAnswerAr) state = 'selected-incorrect'
            if (option === selected && option === exercise.correctAnswerAr) state = 'selected-correct'
          }
          return (
            <OptionButton key={option} onClick={() => handleSelect(option)} disabled={selected !== null} state={state}>
              {option}
            </OptionButton>
          )
        })}
      </div>
    </div>
  )
}
