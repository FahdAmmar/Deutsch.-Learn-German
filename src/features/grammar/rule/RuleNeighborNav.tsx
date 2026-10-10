import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { getAdjacentEntries, grammarRulePath, isRulePublished } from '@/lib/grammarRoadmap'
import type { GrammarRoadmapEntry } from '@/types'

function NeighborLink({ entry, direction }: { entry: GrammarRoadmapEntry; direction: 'previous' | 'next' }) {
  const published = isRulePublished(entry.number)
  const Arrow = direction === 'previous' ? ArrowRight : ArrowLeft

  return (
    <Link
      to={grammarRulePath(entry)}
      className="flex flex-1 flex-col gap-1 rounded-lg border border-border bg-surface p-4 shadow-sm transition-colors hover:border-border-strong"
    >
      <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-faint">
        {direction === 'previous' ? <Arrow size={14} aria-hidden="true" /> : null}
        {direction === 'previous' ? 'القاعدة السابقة' : 'القاعدة التالية'}
        {direction === 'next' ? <Arrow size={14} aria-hidden="true" /> : null}
      </span>
      <span className="font-bold text-ink">{entry.titleAr}</span>
      <span dir="ltr" lang="de" className="text-sm text-ink-muted">
        #{String(entry.number).padStart(2, '0')} · {entry.termDe}
        {published ? '' : ' — قريباً'}
      </span>
    </Link>
  )
}

/** Previous/next in the *roadmap* order, so the learner follows the curriculum rather than guessing. */
export function RuleNeighborNav({ number }: { number: number }) {
  const { previous, next } = getAdjacentEntries(number)
  if (!previous && !next) return null

  return (
    <nav aria-label="التنقل بين القواعد" className="flex flex-col gap-3 sm:flex-row">
      {previous ? <NeighborLink entry={previous} direction="previous" /> : <span className="flex-1" />}
      {next ? <NeighborLink entry={next} direction="next" /> : <span className="flex-1" />}
    </nav>
  )
}
