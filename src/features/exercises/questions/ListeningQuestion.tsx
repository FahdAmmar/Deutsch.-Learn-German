import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'

import { useSpeech } from '@/hooks/useSpeech'
import type { ListeningExercise } from '@/types'

import { OptionButton } from '../OptionButton'

interface Props {
  exercise: ListeningExercise
  onAnswer: (correct: boolean) => void
}

export function ListeningQuestion({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const { speak, isSpeaking, isSupported } = useSpeech()

  useEffect(() => {
    speak(exercise.audioText)
    // Only auto-play once, when the exercise first mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSelect(index: number) {
    if (selected !== null) return
    setSelected(index)
    onAnswer(index === exercise.correctIndex)
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        data-exercise-audio=""
        onClick={() => speak(exercise.audioText)}
        disabled={!isSupported}
        aria-label="إعادة الاستماع"
        className="flex items-center gap-2 h-12 rounded-md border border-border-strong bg-surface-sunken px-5 text-base font-semibold text-ink hover:bg-accent-muted disabled:opacity-50"
      >
        <Volume2 size={18} aria-hidden="true" className={isSpeaking ? 'animate-pulse' : undefined} />
        استمع مرة أخرى
      </button>

      <div className="space-y-2" dir="ltr">
        {exercise.options.map((option, index) => {
          let state: 'default' | 'selected-correct' | 'selected-incorrect' | 'unselected-correct' = 'default'
          if (selected !== null) {
            if (index === exercise.correctIndex) state = 'unselected-correct'
            if (index === selected && index !== exercise.correctIndex) state = 'selected-incorrect'
            if (index === selected && index === exercise.correctIndex) state = 'selected-correct'
          }
          return (
            <OptionButton key={option} onClick={() => handleSelect(index)} disabled={selected !== null} state={state}>
              <span lang="de">{option}</span>
            </OptionButton>
          )
        })}
      </div>
    </div>
  )
}
