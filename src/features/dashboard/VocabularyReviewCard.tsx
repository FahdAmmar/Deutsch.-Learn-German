import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card, ProgressBar } from '@/components/ui'
import type { VocabularyReviewSummary } from './selectors'

interface VocabularyReviewCardProps {
  summary: VocabularyReviewSummary
}

export function VocabularyReviewCard({ summary }: VocabularyReviewCardProps) {
  const ratio = summary.total === 0 ? 0 : summary.reviewed / summary.total

  return (
    <Link to="/vocabulary" className="block">
      <Card interactive>
        <div dir="rtl" className="space-y-3 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-lg font-bold text-ink">مفردات المستوى</h2>
            <ChevronLeft size={18} className="text-ink-faint" aria-hidden="true" />
          </div>
          <ProgressBar value={ratio} tone="highlight" label="نسبة مراجعة المفردات" />
          <p className="tnum text-sm text-ink-muted">
            راجعت {summary.reviewed} من {summary.total} كلمة
          </p>
        </div>
      </Card>
    </Link>
  )
}
