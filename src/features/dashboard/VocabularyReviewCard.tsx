import { BookMarked } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ProgressBar } from '@/components/ui'
import type { VocabularyReviewSummary } from './selectors'

interface VocabularyReviewCardProps {
  summary: VocabularyReviewSummary
}

export function VocabularyReviewCard({ summary }: VocabularyReviewCardProps) {
  const ratio = summary.total === 0 ? 0 : summary.reviewed / summary.total

  return (
    <Link
      to="/vocabulary"
      className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/40"
    >
      <div dir="rtl" className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-der-muted text-der">
          <BookMarked size={16} aria-hidden="true" />
        </span>
        <h3 className="font-semibold text-ink">مراجعة المفردات</h3>
      </div>
      <ProgressBar value={ratio} tone="accent" label="نسبة مراجعة المفردات" />
      <p dir="rtl" className="mt-2 text-sm text-ink-muted">
        راجعت {summary.reviewed} من {summary.total} كلمة في هذا المستوى
      </p>
    </Link>
  )
}
