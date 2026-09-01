import { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/cn'
import type { MatchingExercise } from '@/types'
import { shuffle } from '@/utils/shuffle'

interface Props {
  exercise: MatchingExercise
  onAnswer: (correct: boolean) => void
}

export function MatchingQuestion({ exercise, onAnswer }: Props) {
  const shuffledAr = useMemo(() => shuffle(exercise.pairs.map((pair) => pair.ar)), [exercise.pairs])

  const [selectedDe, setSelectedDe] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongFlash, setWrongFlash] = useState<{ de: string; ar: string } | null>(null)
  const [mistakes, setMistakes] = useState(0)
  const hasReportedResult = useRef(false)
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (flashTimeout.current) clearTimeout(flashTimeout.current)
    },
    [],
  )

  const allMatched = matched.size === exercise.pairs.length

  useEffect(() => {
    if (allMatched && !hasReportedResult.current) {
      hasReportedResult.current = true
      onAnswer(mistakes === 0)
    }
  }, [allMatched, mistakes, onAnswer])

  function handleSelectDe(de: string) {
    if (matched.has(de) || wrongFlash) return
    setSelectedDe((current) => (current === de ? null : de))
  }

  function handleSelectAr(ar: string) {
    if (wrongFlash) return
    const pair = exercise.pairs.find((p) => p.ar === ar)
    const isAlreadyMatched = pair && matched.has(pair.de)
    if (!selectedDe || isAlreadyMatched) return

    const isCorrect = pair?.de === selectedDe

    if (isCorrect) {
      setMatched((prev) => new Set(prev).add(selectedDe))
      setSelectedDe(null)
    } else {
      setMistakes((prev) => prev + 1)
      setWrongFlash({ de: selectedDe, ar })
      flashTimeout.current = setTimeout(() => {
        setWrongFlash(null)
        setSelectedDe(null)
      }, 500)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div dir="ltr" className="space-y-2">
        {exercise.pairs.map((pair) => {
          const isMatched = matched.has(pair.de)
          const isSelected = selectedDe === pair.de
          const isWrong = wrongFlash?.de === pair.de
          return (
            <button
              key={pair.de}
              type="button"
              lang="de"
              onClick={() => handleSelectDe(pair.de)}
              disabled={isMatched}
              className={cn(
                'w-full rounded-md border px-3 py-2.5 text-start text-sm font-medium transition-colors',
                isMatched && 'border-success bg-success-muted text-success',
                !isMatched && isWrong && 'border-error bg-error-muted text-error',
                !isMatched && !isWrong && isSelected && 'border-primary bg-primary-muted text-primary',
                !isMatched && !isWrong && !isSelected && 'border-border-strong bg-surface hover:bg-surface-muted',
              )}
            >
              {pair.de}
            </button>
          )
        })}
      </div>
      <div dir="rtl" className="space-y-2">
        {shuffledAr.map((ar) => {
          const pair = exercise.pairs.find((p) => p.ar === ar)
          const isMatched = Boolean(pair && matched.has(pair.de))
          const isWrong = wrongFlash?.ar === ar
          return (
            <button
              key={ar}
              type="button"
              onClick={() => handleSelectAr(ar)}
              disabled={isMatched}
              className={cn(
                'w-full rounded-md border px-3 py-2.5 text-start text-sm font-medium transition-colors',
                isMatched && 'border-success bg-success-muted text-success',
                !isMatched && isWrong && 'border-error bg-error-muted text-error',
                !isMatched && !isWrong && 'border-border-strong bg-surface hover:bg-surface-muted',
              )}
            >
              {ar}
            </button>
          )
        })}
      </div>
    </div>
  )
}
