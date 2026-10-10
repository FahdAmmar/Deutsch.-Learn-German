import { Brain, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card } from '@/components/ui'
import { formatCountAr, WORD_FORMS } from '@/utils/arabicCount'

interface ReviewReminderCardProps {
  dueCount: number
}

export function ReviewReminderCard({ dueCount }: ReviewReminderCardProps) {
  if (dueCount === 0) return null

  const adjective = dueCount === 2 ? 'جاهزتان' : 'جاهزة'

  return (
    <Link to="/review" className="block">
      <Card interactive>
        <div dir="rtl" className="flex items-center gap-4 p-4 sm:px-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent-muted text-accent">
            <Brain size={22} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">
              {formatCountAr(dueCount, WORD_FORMS)} {adjective} للمراجعة
            </p>
            <p className="text-sm text-ink-muted">دقيقتان من المراجعة الآن تثبّتانها في ذاكرتك طويلة الأمد.</p>
          </div>
          <ChevronLeft size={20} className="shrink-0 text-ink-faint" aria-hidden="true" />
        </div>
      </Card>
    </Link>
  )
}
