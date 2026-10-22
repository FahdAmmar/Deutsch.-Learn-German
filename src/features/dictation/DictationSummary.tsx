import type { ReactNode } from 'react'

import { ProgressBar } from '@/components/ui'
import type { RunStats } from '@/lib/dictation/session'
import { SPELLING_LABEL_AR, SPELLING_TIP_AR, type SpellingKindCount } from '@/lib/dictation/spelling'

import { formatDuration, formatPercent } from './format'

interface DictationSummaryProps {
  stats: RunStats
  mistakes: { char: string; count: number }[]
  /** The mistakes grouped by spelling pattern; the pattern that cost most gets a tip. */
  spelling?: SpellingKindCount[]
  /** Best result so far for this text, if it has been finished before. */
  best?: { bestAccuracy: number; bestWpm: number; attempts: number }
  /** The buttons and links that fit where this text came from. */
  actions: ReactNode
}

function verdict(accuracy: number): string {
  if (accuracy >= 0.95) return 'ممتاز! كتابتك دقيقة جدًا.'
  if (accuracy >= 0.8) return 'جيد جدًا. كرّر النص لتصل إلى دقة أعلى.'
  return 'أحسنت على إكمال النص. أعد المحاولة لتثبّت الإملاء.'
}

/** The end of a run: accuracy, speed, time, and the letters that cost the most mistakes. */
export function DictationSummary({ stats, mistakes, spelling = [], best, actions }: DictationSummaryProps) {
  return (
    <section aria-labelledby="dictation-result-title" dir="rtl" className="space-y-6 rounded-xl border border-border bg-surface p-5 sm:p-8">
      <header className="space-y-1 text-center">
        <h2 id="dictation-result-title" className="font-sans text-2xl font-bold text-ink">
          أكملت الإملاء
        </h2>
        <p className="text-ink-muted">{verdict(stats.accuracy)}</p>
      </header>

      <dl className="grid grid-cols-3 gap-3 text-center">
        <Stat label="الدقة" value={formatPercent(stats.accuracy)} />
        <Stat label="كلمة / دقيقة" value={String(stats.wpm)} />
        <Stat label="الوقت" value={formatDuration(stats.elapsedMs)} />
      </dl>

      <ProgressBar value={stats.accuracy} label="الدقة" tone={stats.accuracy >= 0.8 ? 'success' : 'accent'} />

      {mistakes.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-ink-muted">أكثر الأحرف التي أخطأت فيها</h3>
          <ul dir="ltr" className="flex flex-wrap justify-center gap-2">
            {mistakes.map(({ char, count }) => (
              <li key={char} lang="de" className="display-de flex items-center gap-2 rounded-md bg-error-muted px-3 py-1.5 text-error">
                <span className="text-xl font-semibold">{char}</span>
                <span className="tnum text-sm">×{count}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-sm text-success">لم ترتكب أي خطأ.</p>
      )}

      {spelling.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-ink-muted">ما نوع أخطائك؟</h3>
          <ul className="space-y-1.5">
            {spelling.slice(0, 3).map(({ kind, count }) => (
              <li key={kind} className="flex items-center justify-between gap-3 rounded-md bg-surface-sunken px-3 py-2">
                <span className="text-ink">{SPELLING_LABEL_AR[kind]}</span>
                <span className="tnum text-sm font-semibold text-ink-muted">×{count}</span>
              </li>
            ))}
          </ul>
          <p className="rounded-md border border-border p-3 text-sm leading-7 text-ink-muted">{SPELLING_TIP_AR[spelling[0].kind]}</p>
        </div>
      ) : null}

      {best ? (
        <p className="text-center text-sm text-ink-muted">
          أفضل دقة لك في هذا النص: <span className="tnum font-semibold text-ink">{formatPercent(best.bestAccuracy)}</span> · أفضل سرعة:{' '}
          <span className="tnum font-semibold text-ink">{best.bestWpm}</span> · محاولات مكتملة: <span className="tnum font-semibold text-ink">{best.attempts}</span>
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-sunken p-3">
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="tnum mt-1 text-2xl font-bold text-ink sm:text-3xl">{value}</dd>
    </div>
  )
}
