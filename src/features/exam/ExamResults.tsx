import { Check, Volume2, X } from 'lucide-react'

import { Button } from '@/components/ui'
import { cn } from '@/lib/cn'
import { allItems, itemOptions, itemPrompt, taskScore, type ExamScore } from '@/lib/exam/score'
import type { ExamSet } from '@/types'

interface ExamResultsProps {
  examSet: ExamSet
  score: ExamScore
  /** Plays a recording's text, so the learner can listen again while reading it. */
  onListen: (text: string) => void
  speechSupported: boolean
  onRetry: () => void
  onExit: () => void
}

/** The score, then each text with every question: what the learner chose, the right answer and why. */
export function ExamResults({ examSet, score, onListen, speechSupported, onRetry, onExit }: ExamResultsProps) {
  const percent = Math.round(score.ratio * 100)
  const total = allItems(examSet).length

  return (
    <div className="space-y-6">
      <section aria-labelledby="exam-score" className="space-y-2 rounded-lg border border-primary/25 bg-primary-muted p-5">
        <h2 id="exam-score" dir="rtl" className="font-sans text-lg font-bold text-ink">
          نتيجتك
        </h2>
        <p dir="rtl" className="tnum text-3xl font-bold text-ink">
          {score.correct} من {total} <span className="text-xl font-semibold text-ink-muted">({percent}%)</span>
        </p>
        {score.unanswered > 0 ? (
          <p dir="rtl" className="text-ink-muted">
            تركتَ {score.unanswered} {score.unanswered === 1 ? 'سؤالاً' : 'أسئلة'} دون إجابة، وهي محسوبة خطأً.
          </p>
        ) : null}
        <div dir="rtl" className="flex flex-wrap gap-3 pt-2">
          <Button onClick={onRetry}>أعد المحاولة</Button>
          <Button variant="outline" onClick={onExit}>
            كل المجموعات
          </Button>
        </div>
      </section>

      {examSet.tasks.map((task) => {
        const { correct, total: taskTotal } = taskScore(task, score)
        return (
          <section key={task.id} aria-labelledby={`${task.id}-review`} className="space-y-4 rounded-lg border border-border bg-surface p-4 sm:p-5">
            <div dir="rtl" className="flex flex-wrap items-center justify-between gap-2">
              <h3 id={`${task.id}-review`} className="font-sans text-lg font-bold text-ink">
                {task.titleAr}
              </h3>
              <span className="tnum text-sm font-semibold text-ink-muted">
                {correct} من {taskTotal}
              </span>
            </div>

            {task.textDe ? (
              <p lang="de" dir="ltr" className="display-de rounded-md bg-surface-sunken p-4 text-start leading-9 whitespace-pre-line text-ink">
                {task.textDe}
              </p>
            ) : null}
            {task.audioDe ? (
              <div className="space-y-2 rounded-md bg-surface-sunken p-4">
                <p dir="rtl" className="text-sm font-semibold text-ink-muted">
                  نص التسجيل:
                </p>
                <p lang="de" dir="ltr" className="display-de text-start leading-9 text-ink">
                  {task.audioDe}
                </p>
                {speechSupported ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onListen(task.audioDe!)}
                    icon={<Volume2 size={16} aria-hidden="true" />}
                  >
                    استمع مرة أخرى
                  </Button>
                ) : null}
              </div>
            ) : null}

            <ul className="space-y-4">
              {task.items.map((item) => {
                const result = score.byItem[item.id]
                const options = itemOptions(item)
                const Icon = result.correct ? Check : X
                return (
                  <li key={item.id} className="flex items-start gap-3">
                    <span
                      className={cn(
                        'mt-1 grid size-6 shrink-0 place-items-center rounded-full',
                        result.correct ? 'bg-success-muted text-success' : 'bg-error-muted text-error',
                      )}
                    >
                      <Icon size={14} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p lang="de" dir="ltr" className="display-de text-start font-semibold text-ink">
                        {itemPrompt(item)}
                      </p>
                      <p dir="rtl" className="text-sm text-ink-muted">
                        <span className="font-semibold text-ink">{result.correct ? 'إجابتك صحيحة: ' : 'الإجابة الصحيحة: '}</span>
                        <span lang="de" dir="ltr" className="display-de">
                          {options[result.correctIndex]}
                        </span>
                        {!result.correct ? (
                          <>
                            {' · '}
                            <span className="font-semibold text-ink">إجابتك: </span>
                            {result.answered ? (
                              <span lang="de" dir="ltr" className="display-de">
                                {options[result.chosen!]}
                              </span>
                            ) : (
                              'لم تجب'
                            )}
                          </>
                        ) : null}
                      </p>
                      <p dir="rtl" className="text-sm leading-7 text-ink-muted">
                        {item.explanationAr}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
