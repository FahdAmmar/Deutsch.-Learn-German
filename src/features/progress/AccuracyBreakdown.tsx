import { Link } from 'react-router-dom'

import { Button, ProgressBar } from '@/components/ui'
import { getModuleById } from '@/lib/curriculum'
import { accuracyOf } from '@/lib/stats'
import { EXERCISE_TYPES, type AnswerCounter, type LearningStats } from '@/types'

import { EXERCISE_TYPE_LABEL_AR } from './labels'

const MIN_ATTEMPTS_FOR_TOPIC = 3
const MAX_TOPICS_SHOWN = 6

interface AccuracyRow {
  key: string
  label: string
  counter: AnswerCounter
}

function percent(counter: AnswerCounter): number {
  return Math.round((accuracyOf(counter) ?? 0) * 100)
}

function AccuracyList({ rows, ariaLabel }: { rows: AccuracyRow[]; ariaLabel: string }) {
  return (
    <ul aria-label={ariaLabel} className="space-y-4">
      {rows.map((row) => {
        const ratio = accuracyOf(row.counter) ?? 0
        return (
          <li key={row.key} dir="rtl" className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 font-medium text-ink">{row.label}</span>
              <span className="tnum shrink-0 text-sm text-ink-muted">
                {percent(row.counter)}% · {row.counter.correct}/{row.counter.attempts}
              </span>
            </div>
            <ProgressBar value={ratio} tone={ratio >= 0.8 ? 'success' : ratio >= 0.5 ? 'accent' : 'plum'} label={`دقة ${row.label}`} />
          </li>
        )
      })}
    </ul>
  )
}

interface AccuracyBreakdownProps {
  stats: Pick<LearningStats, 'byType' | 'byModule'>
}

/** Where the learner is strong and where not: accuracy by kind of exercise, and by topic (weakest first, so it points at what to practise). */
export function AccuracyBreakdown({ stats }: AccuracyBreakdownProps) {
  const typeRows: AccuracyRow[] = EXERCISE_TYPES.flatMap((type) => {
    const counter = stats.byType[type]
    return counter && counter.attempts > 0 ? [{ key: type, label: EXERCISE_TYPE_LABEL_AR[type], counter }] : []
  }).sort((a, b) => b.counter.attempts - a.counter.attempts)

  const topicRows: AccuracyRow[] = Object.entries(stats.byModule)
    .filter(([, counter]) => counter.attempts >= MIN_ATTEMPTS_FOR_TOPIC)
    .flatMap(([moduleId, counter]) => {
      const module = getModuleById(moduleId)
      return module ? [{ key: moduleId, label: module.titleAr, counter }] : []
    })
    .sort((a, b) => (accuracyOf(a.counter) ?? 0) - (accuracyOf(b.counter) ?? 0))
    .slice(0, MAX_TOPICS_SHOWN)

  if (typeRows.length === 0) {
    return (
      <p dir="rtl" className="text-ink-muted">
        لا توجد إجابات مسجّلة بعد. أكمل بعض التمارين وستظهر هنا دقتك حسب نوع السؤال والموضوع.
      </p>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <h3 dir="rtl" className="font-sans text-base font-bold text-ink">
          حسب نوع التمرين
        </h3>
        <AccuracyList rows={typeRows} ariaLabel="الدقة حسب نوع التمرين" />
      </div>

      <div className="space-y-4">
        <h3 dir="rtl" className="font-sans text-base font-bold text-ink">
          المواضيع الأضعف أولاً
        </h3>
        {topicRows.length === 0 ? (
          <p dir="rtl" className="text-ink-muted">
            نحتاج ثلاث إجابات على الأقل في الموضوع الواحد لنقول أين تحتاج مراجعة.
          </p>
        ) : (
          <>
            <AccuracyList rows={topicRows} ariaLabel="الدقة حسب الموضوع" />
            <div dir="rtl">
              <Link to="/practice">
                <Button variant="outline" size="sm">
                  تدرّب على نقاط ضعفك
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
