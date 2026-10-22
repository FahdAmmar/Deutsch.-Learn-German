import { Link } from 'react-router-dom'

import { ProgressBar } from '@/components/ui'
import { cn } from '@/lib/cn'
import { getRoadmapEntries, grammarRulePath, isRulePublished } from '@/lib/grammarRoadmap'
import { useGrammarProgressStore } from '@/store/grammarProgressStore'
import type { CEFRLevel } from '@/types'

interface RuleIndexProps {
  level: CEFRLevel
  currentNumber: number
}

/** The rules of the current level in learning order, with the open one marked and the learner's completed count. */
export function RuleIndex({ level, currentNumber }: RuleIndexProps) {
  const progress = useGrammarProgressStore((state) => state.rules)
  const entries = getRoadmapEntries(level)
  const published = entries.filter((entry) => isRulePublished(entry.number))
  const completed = published.filter((entry) => progress[entry.number]?.completed).length

  return (
    <nav aria-labelledby="rule-index-title" dir="rtl" className="space-y-4 rounded-lg border border-border bg-surface p-5 shadow-sm lg:sticky lg:top-24">
      <div className="space-y-1">
        <h2 id="rule-index-title" className="text-lg font-bold text-ink">
          فهرس القواعد
        </h2>
        <p className="tnum text-sm text-ink-muted">
          {entries.length} قاعدة في المستوى <span dir="ltr">{level}</span>
        </p>
      </div>

      <div className="space-y-1.5">
        <ProgressBar value={published.length === 0 ? 0 : completed / published.length} size="sm" tone="success" label="القواعد التي أنهيت اختبارها" />
        <p className="tnum text-xs text-ink-muted">
          أنهيت اختبار {completed} من {published.length} قاعدة منشورة
        </p>
      </div>

      <ol className="max-h-[26rem] space-y-1 overflow-y-auto">
        {entries.map((entry) => {
          const isCurrent = entry.number === currentNumber
          const isPublished = isRulePublished(entry.number)
          const body = (
            <>
              <span className="font-heading tnum w-6 shrink-0 text-center text-sm font-bold">{entry.number}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm leading-snug font-semibold">{entry.titleAr}</span>
                <span dir="ltr" lang="de" className={cn('block text-start text-xs', isCurrent ? 'text-on-primary-container' : 'text-ink-muted')}>
                  {entry.termDe}
                </span>
              </span>
              {!isPublished ? <span className="shrink-0 text-xs text-ink-muted">قريباً</span> : null}
            </>
          )
          const rowClass = cn(
            'flex items-center gap-2.5 rounded-md px-3 py-2 transition-colors',
            isCurrent ? 'bg-primary-container text-on-primary-container' : isPublished ? 'text-ink hover:bg-surface-sunken' : 'text-ink-muted',
          )
          return (
            <li key={entry.number}>
              {isPublished ? (
                <Link to={grammarRulePath(entry)} aria-current={isCurrent ? 'page' : undefined} className={rowClass}>
                  {body}
                </Link>
              ) : (
                <div className={rowClass}>{body}</div>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
