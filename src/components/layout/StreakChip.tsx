import { Flame } from 'lucide-react'

import { cn } from '@/lib/cn'
import { useProgressStore } from '@/store/progressStore'

/** Current learning streak. Renders nothing until the learner has one. On the narrowest phones only the number stays visible. */
export function StreakChip({ className }: { className?: string }) {
  const streakDays = useProgressStore((state) => state.streakDays)
  if (streakDays <= 0) return null

  const unit = streakDays === 1 ? 'يوم' : 'أيام'

  return (
    <div
      dir="rtl"
      className={cn('inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-accent-muted px-3 text-sm font-bold text-accent', className)}
      aria-label={`سلسلة التعلم: ${streakDays} ${unit}`}
    >
      <Flame size={16} aria-hidden="true" />
      <span className="tnum">{streakDays}</span>
      <span className="font-medium max-xs:sr-only">{unit}</span>
    </div>
  )
}
