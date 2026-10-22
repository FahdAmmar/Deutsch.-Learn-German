import { useState } from 'react'
import { CheckCircle2, RotateCcw, Target } from 'lucide-react'

import { Button, Card, ProgressBar } from '@/components/ui'
import { useSound } from '@/hooks/useSound'
import { getLessonByExerciseId } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useStatsStore } from '@/store/statsStore'
import type { Exercise } from '@/types'

import { ExerciseCard } from './ExerciseCard'
import { MistakeSummary } from './MistakeSummary'

interface ExerciseRunnerProps {
  exercises: Exercise[]
  /** Called once all exercises have been answered, with accuracy from 0–1. Not called for the mistakes-only retry. */
  onComplete?: (accuracy: number) => void
  /** Called after each exercise is answered, before advancing — for callers that need a per-item breakdown (e.g. the placement test). */
  onExerciseComplete?: (exercise: Exercise, correct: boolean) => void
}

/** 'full' is the session as given. 'retry' replays only the questions got wrong, as practice. */
type Round = 'full' | 'retry'

const PASS_THRESHOLD = 0.7

export function ExerciseRunner({ exercises, onComplete, onExerciseComplete }: ExerciseRunnerProps) {
  const [round, setRound] = useState<Round>('full')
  const [retryList, setRetryList] = useState<Exercise[]>([])
  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [mistakes, setMistakes] = useState<Exercise[]>([])
  const [finished, setFinished] = useState(false)
  const [runId, setRunId] = useState(0)
  const recordVocabularyReview = useProgressStore((state) => state.recordVocabularyReview)
  const recordAnswer = useStatsStore((state) => state.recordAnswer)
  const playSound = useSound()

  const activeList = round === 'full' ? exercises : retryList

  if (exercises.length === 0) {
    return (
      <p dir="rtl" className="text-sm text-ink-muted">
        لا توجد تمارين متاحة لهذا الدرس حالياً.
      </p>
    )
  }

  const currentExercise = activeList[index]
  const accuracy = activeList.length === 0 ? 0 : correctCount / activeList.length

  function handleNext(correct: boolean) {
    // The mistakes-only retry is practice: it must not skew spaced-repetition boxes,
    // accuracy statistics, or the result the lesson was completed with.
    if (round === 'full') {
      if (currentExercise.type === 'vocab-recall') {
        recordVocabularyReview(currentExercise.vocabularyId, correct)
      }
      onExerciseComplete?.(currentExercise, correct)
      recordAnswer({
        type: currentExercise.type,
        correct,
        moduleId: getLessonByExerciseId(currentExercise.id)?.moduleId,
      })
    }

    const newCorrectCount = correctCount + (correct ? 1 : 0)
    setCorrectCount(newCorrectCount)
    if (!correct) setMistakes((previous) => [...previous, currentExercise])

    if (index + 1 >= activeList.length) {
      const finalAccuracy = newCorrectCount / activeList.length
      setFinished(true)
      if (finalAccuracy >= PASS_THRESHOLD) playSound('complete')
      if (round === 'full') onComplete?.(finalAccuracy)
    } else {
      setIndex((previous) => previous + 1)
    }
  }

  function startRound(nextRound: Round, list: Exercise[]) {
    setRound(nextRound)
    setRetryList(list)
    setIndex(0)
    setCorrectCount(0)
    setMistakes([])
    setFinished(false)
    setRunId((previous) => previous + 1)
  }

  if (finished) {
    const percent = Math.round(accuracy * 100)
    const passed = accuracy >= PASS_THRESHOLD
    const isRetry = round === 'retry'
    const fixedAll = isRetry && mistakes.length === 0

    return (
      <Card tone={passed ? 'brand' : 'surface'}>
        <div dir="rtl" className="flex flex-col items-center gap-5 px-5 py-9 text-center">
          <CheckCircle2 size={32} className="text-success" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-sans text-xl font-bold text-ink">
              {isRetry ? (fixedAll ? 'صحّحت كل أخطائك!' : 'أكملت مراجعة الأخطاء') : 'أكملت التمارين!'}
            </p>
            <p className="text-ink-muted">
              أجبت بشكل صحيح على {correctCount} من {activeList.length} ({percent}%)
            </p>
          </div>
          <div className="w-full max-w-xs">
            <ProgressBar value={accuracy} tone={passed ? 'success' : 'accent'} label="نسبة الإجابات الصحيحة" />
          </div>
          <p className="max-w-[42ch] text-sm text-ink-muted">
            {passed ? 'نتيجة جيدة، يمكنك المتابعة.' : 'أعد المحاولة لتثبّت ما تعلمته قبل المتابعة.'}
          </p>

          <MistakeSummary mistakes={mistakes} />

          <div className="flex flex-wrap items-center justify-center gap-3">
            {mistakes.length > 0 ? (
              <Button onClick={() => startRound('retry', mistakes)} icon={<Target size={16} aria-hidden="true" />}>
                راجع أخطاءك ({mistakes.length})
              </Button>
            ) : null}
            <Button
              variant="outline"
              onClick={() => startRound('full', [])}
              icon={<RotateCcw size={16} aria-hidden="true" />}
            >
              إعادة المحاولة
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {round === 'retry' ? (
        <p dir="rtl" className="inline-flex items-center gap-2 rounded-full bg-accent-muted px-3 py-1 text-sm font-semibold text-ink">
          <Target size={15} aria-hidden="true" />
          مراجعة الأخطاء — لا تُحتسب في نتيجتك
        </p>
      ) : null}
      <ProgressBar value={index / activeList.length} size="sm" tone="accent" label="تقدّم التمارين" />
      <ExerciseCard
        key={`${runId}-${index}-${currentExercise.id}`}
        exercise={currentExercise}
        questionNumber={index + 1}
        totalQuestions={activeList.length}
        onNext={handleNext}
        isLast={index + 1 === activeList.length}
      />
    </div>
  )
}
