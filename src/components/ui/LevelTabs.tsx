import { cn } from '@/lib/cn'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

interface LevelTabsProps {
  value: CEFRLevel
  onChange: (level: CEFRLevel) => void
  /** Levels with no content yet are shown but disabled. */
  availableLevels?: CEFRLevel[]
}

export function LevelTabs({ value, onChange, availableLevels }: LevelTabsProps) {
  return (
    <div role="tablist" aria-label="اختر المستوى" className="inline-flex rounded-md border border-border bg-surface-muted p-1">
      {CEFR_LEVELS.map((level) => {
        const isAvailable = !availableLevels || availableLevels.includes(level)
        const isActive = level === value
        return (
          <button
            key={level}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={!isAvailable}
            onClick={() => onChange(level)}
            className={cn(
              'rounded-sm px-3.5 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40',
              isActive ? 'bg-surface text-primary shadow-sm' : 'text-ink-muted hover:text-ink',
            )}
          >
            {level}
          </button>
        )
      })}
    </div>
  )
}
