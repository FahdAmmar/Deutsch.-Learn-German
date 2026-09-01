import { Flame } from 'lucide-react'

import { Badge } from '@/components/ui'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel } from '@/types'

interface WelcomeHeaderProps {
  currentLevel: CEFRLevel
  streakDays: number
}

export function WelcomeHeader({ currentLevel, streakDays }: WelcomeHeaderProps) {
  const info = CEFR_LEVEL_INFO[currentLevel]

  return (
    <header dir="rtl" className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-ink">مرحباً بعودتك 👋</h1>
        <p className="mt-1 flex items-center gap-2 text-ink-muted">
          مستواك الحالي:
          <Badge tone="primary">{currentLevel}</Badge>
          <span dir="ltr" className="text-sm">
            {info.titleDe}
          </span>
        </p>
      </div>

      {streakDays > 0 ? (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-accent-muted px-4 py-2.5">
          <Flame size={22} className="text-accent" aria-hidden="true" />
          <div className="leading-tight">
            <p className="text-lg font-bold text-accent">{streakDays}</p>
            <p className="text-xs text-ink-muted">{streakDays === 1 ? 'يوم متتالٍ' : 'أيام متتالية'}</p>
          </div>
        </div>
      ) : null}
    </header>
  )
}
