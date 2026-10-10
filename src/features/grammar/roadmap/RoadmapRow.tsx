import { Check, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'
import { grammarRulePath } from '@/lib/grammarRoadmap'
import type { GrammarRoadmapEntry } from '@/types'

interface RoadmapRowProps {
  entry: GrammarRoadmapEntry
  published: boolean
  completed: boolean
}

/**
 * One entry on the grammar roadmap. The number is real data (the rule's place in the
 * recommended order), so it is shown. Only authored rules are links; the rest sit in
 * order as "قريباً" so the learner can see what is coming.
 */
export function RoadmapRow({ entry, published, completed }: RoadmapRowProps) {
  const content = (
    <>
      <span
        dir="ltr"
        aria-hidden="true"
        className={cn(
          'tnum flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-sm font-bold',
          completed && 'bg-success text-success-foreground',
          !completed && published && 'bg-accent-muted text-accent',
          !published && 'bg-surface-sunken text-ink-faint',
        )}
      >
        {completed ? <Check size={17} strokeWidth={3} /> : String(entry.number).padStart(2, '0')}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-bold text-ink">{entry.titleAr}</span>
        <span dir="ltr" lang="de" className="display-de block truncate text-end text-sm font-normal text-ink-faint">
          {entry.termDe}
        </span>
      </span>

      {completed ? <span className="shrink-0 text-sm font-semibold text-success">أنجزتها</span> : null}
      {published ? (
        <ChevronLeft size={18} className="shrink-0 text-ink-faint" aria-hidden="true" />
      ) : (
        <span className="shrink-0 rounded-md bg-surface-sunken px-2 py-0.5 text-xs font-semibold text-ink-muted">قريباً</span>
      )}
    </>
  )

  const base = 'flex items-center gap-3 rounded-lg border px-4 py-3'

  return (
    <li>
      {published ? (
        <Link
          to={grammarRulePath(entry)}
          className={cn(base, 'border-border bg-surface transition-colors hover:border-border-strong hover:bg-surface-sunken/50')}
        >
          <span className="sr-only">القاعدة {entry.number}:</span>
          {content}
        </Link>
      ) : (
        <div className={cn(base, 'border-transparent bg-surface-sunken/60')}>{content}</div>
      )}
    </li>
  )
}
