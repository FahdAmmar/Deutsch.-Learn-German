import { cn } from '@/lib/cn'
import type { CEFRLevel } from '@/types'

import { LEVEL_STYLE } from './levelTone'

interface LevelMarkProps {
  level: CEFRLevel
  size?: 'sm' | 'md' | 'lg'
  /** Neutral colouring for levels that are not available yet. Uses solid neutral tokens, never opacity, so contrast stays AA. */
  muted?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'h-6 min-w-9 px-2 text-xs tracking-[0.08em] rounded-full',
  md: 'h-8 min-w-12 px-3 text-sm tracking-[0.08em] rounded-full',
  lg: 'h-14 min-w-[4.5rem] px-3 text-2xl tracking-[0.04em] rounded-lg',
}

/** The CEFR code as a compact mark. Latin letters, so it is always rendered left-to-right. */
export function LevelMark({ level, size = 'md', muted, className }: LevelMarkProps) {
  const style = LEVEL_STYLE[level]
  return (
    <span
      dir="ltr"
      className={cn(
        'font-heading tnum inline-flex shrink-0 items-center justify-center font-extrabold',
        muted ? 'bg-surface text-ink-muted ring-1 ring-border' : cn(style.tint, style.text),
        sizeClasses[size],
        className,
      )}
    >
      {level}
    </span>
  )
}
