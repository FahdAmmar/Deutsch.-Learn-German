import { useCallback, useMemo, useState } from 'react'

import { Button } from '@/components/ui'
import { allItems, scoreExam, type ExamAnswers, type ExamScore } from '@/lib/exam/score'
import { useSpeech } from '@/hooks/useSpeech'
import { useExamStore } from '@/store/examStore'
import { useStatsStore } from '@/store/statsStore'
import type { ExamSet } from '@/types'

import { ExamResults } from './ExamResults'
import { ExamTaskView } from './ExamTaskView'
import { ExamTimer } from './ExamTimer'

/** In exam mode each recording can be played this many times, as in a real listening test. */
const EXAM_MAX_PLAYS = 2

type Phase = 'intro' | 'running' | 'done'

interface ExamSessionProps {
  examSet: ExamSet
  onExit: () => void
}

/** One set from the first screen to the review: choose a mode, answer everything, submit, read the feedback. */
export function ExamSession({ examSet, onExit }: ExamSessionProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [examMode, setExamMode] = useState(true)
  const [answers, setAnswers] = useState<ExamAnswers>({})
  const [plays, setPlays] = useState<Record<string, number>>({})
  const [activeTask, setActiveTask] = useState<string | null>(null)
  const [score, setScore] = useState<ExamScore | null>(null)
  const { speak, stop: stopSpeech, isSpeaking, isSupported: speechSupported } = useSpeech()
  const recordAttempt = useExamStore((state) => state.recordAttempt)
  const recordAnswer = useStatsStore((state) => state.recordAnswer)

  const items = useMemo(() => allItems(examSet), [examSet])
  // The number of each task's first question within the set: 1, then 1 + the first task's questions, and so on.
  const firstPositions = useMemo(
    () => examSet.tasks.map((_, index) => 1 + examSet.tasks.slice(0, index).reduce((sum, earlier) => sum + earlier.items.length, 0)),
    [examSet],
  )
  const answeredCount = items.filter((item) => answers[item.id] !== undefined).length
  const isListening = examSet.part === 'hoeren'

  const submit = useCallback(() => {
    stopSpeech()
    const result = scoreExam(examSet, answers)
    for (const item of items) {
      const outcome = result.byItem[item.id]
      // An unanswered question is not an attempt at an answer, so it does not count towards accuracy.
      if (!outcome.answered) continue
      recordAnswer({ type: item.kind === 'true-false' ? 'true-false' : isListening ? 'listening' : 'multiple-choice', correct: outcome.correct })
    }
    recordAttempt(examSet.id, result.ratio)
    setScore(result)
    setPhase('done')
  }, [examSet, answers, items, isListening, stopSpeech, recordAnswer, recordAttempt])

  function start() {
    setAnswers({})
    setPlays({})
    setScore(null)
    setActiveTask(null)
    setPhase('running')
  }

  function playTask(taskId: string, text: string) {
    setPlays((current) => ({ ...current, [taskId]: (current[taskId] ?? 0) + 1 }))
    setActiveTask(taskId)
    speak(text)
  }

  if (phase === 'intro') {
    return (
      <section aria-labelledby="exam-intro" className="space-y-5 rounded-lg border border-border bg-surface p-5">
        <h2 id="exam-intro" dir="rtl" className="font-sans text-lg font-bold text-ink">
          قبل أن تبدأ
        </h2>
        <p dir="rtl" className="leading-8 text-ink-muted">
          {examSet.descriptionAr} الأسئلة {items.length}، والوقت المقترح {examSet.suggestedMinutes} دقيقة. لا ترى الإجابات الصحيحة إلا بعد
          التسليم، ثم تقرأ شرح كل سؤال.
        </p>
        <label dir="rtl" className="flex cursor-pointer items-start gap-3 rounded-md bg-surface-sunken p-4">
          <input
            type="checkbox"
            checked={examMode}
            onChange={(event) => setExamMode(event.target.checked)}
            className="mt-1.5 size-4 accent-[var(--color-primary)]"
          />
          <span className="space-y-1">
            <span className="block font-semibold text-ink">وضع الامتحان</span>
            <span className="block text-sm leading-7 text-ink-muted">
              عدّاد وقت يسلّم الإجابات عند انتهائه{isListening ? `، وكل تسجيل يُشغَّل ${EXAM_MAX_PLAYS} مرتين فقط` : ''}. أوقفه إن أردت التدرّب
              على مهلك.
            </span>
          </span>
        </label>
        <div dir="rtl" className="flex flex-wrap gap-3">
          <Button onClick={start}>ابدأ</Button>
          <Button variant="outline" onClick={onExit}>
            رجوع
          </Button>
        </div>
      </section>
    )
  }

  if (phase === 'done' && score) {
    return (
      <ExamResults
        examSet={examSet}
        score={score}
        onListen={speak}
        speechSupported={speechSupported}
        onRetry={() => setPhase('intro')}
        onExit={onExit}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div
        dir="rtl"
        className="sticky top-[calc(var(--header-h)+0.5rem)] z-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface/95 px-4 py-3 backdrop-blur"
      >
        <p className="tnum text-sm font-semibold text-ink">
          أجبتَ عن {answeredCount} من {items.length}
        </p>
        {examMode ? <ExamTimer totalSeconds={examSet.suggestedMinutes * 60} onElapsed={submit} /> : null}
      </div>

      {examSet.tasks.map((task, taskIndex) => {
        return (
          <ExamTaskView
            key={task.id}
            task={task}
            firstPosition={firstPositions[taskIndex]}
            answers={answers}
            onChoose={(itemId, index) => setAnswers((current) => ({ ...current, [itemId]: index }))}
            playsUsed={plays[task.id] ?? 0}
            maxPlays={examMode ? EXAM_MAX_PLAYS : undefined}
            speaking={isSpeaking && activeTask === task.id}
            speechSupported={speechSupported}
            onPlay={() => task.audioDe && playTask(task.id, task.audioDe)}
          />
        )
      })}

      <div dir="rtl" className="flex flex-wrap items-center gap-3">
        <Button onClick={submit}>سلّم الإجابات</Button>
        {answeredCount < items.length ? (
          <p className="text-sm text-ink-muted">بقي {items.length - answeredCount} دون إجابة، وستُحسب خطأً إن سلّمتَ الآن.</p>
        ) : null}
      </div>
    </div>
  )
}
