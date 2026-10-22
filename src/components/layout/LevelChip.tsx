import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVEL_INFO } from '@/types'

/** The learner's current CEFR level as a pill in the top bar; leads to the level path. */
export function LevelChip() {
  const currentLevel = useProgressStore((state) => state.currentLevel)

  return (
    <Link
      to={`/levels/${currentLevel.toLowerCase()}`}
      className="font-heading inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-bold text-primary transition-colors hover:border-border-strong"
      aria-label={`مستواك الحالي ${currentLevel}: ${CEFR_LEVEL_INFO[currentLevel].titleAr}`}
    >
      <GraduationCap size={16} aria-hidden="true" />
      <span dir="ltr" className="tracking-[0.04em]">
        {currentLevel}
      </span>
    </Link>
  )
}
