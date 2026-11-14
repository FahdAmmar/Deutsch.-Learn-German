import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVEL_INFO } from '@/types'

/** The learner's current CEFR level as a pill in the top bar; leads to the study plan. */
export function LevelChip() {
  const currentLevel = useProgressStore((state) => state.currentLevel)

  return (
    <Link
      to="/levels"
      className="font-heading inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-sm font-bold text-primary transition-colors hover:border-border-strong active:bg-surface-sunken xs:gap-2 xs:px-3.5"
      aria-label={`مستواك الحالي ${currentLevel}: ${CEFR_LEVEL_INFO[currentLevel].titleAr}`}
    >
      <GraduationCap size={16} aria-hidden="true" className="max-xs:hidden" />
      <span dir="ltr" className="tracking-[0.04em]">
        {currentLevel}
      </span>
    </Link>
  )
}
