import { cn } from '@/lib/cn'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

import { handleTabKeyDown } from './tabsHelpers'

interface LevelTabsProps {
  value: CEFRLevel
  onChange: (level: CEFRLevel) => void
  /** Levels with no content yet are shown but disabled. */
  availableLevels?: CEFRLevel[]
}

/** Segmented level switcher. Level codes are Latin, so the control is always left-to-right. */
export function LevelTabs({ value, onChange, availableLevels }: LevelTabsProps) {
  const enabledLevels = CEFR_LEVELS.filter((level) => !availableLevels || availableLevels.includes(level))

  return (
    <div
      role="tablist"
      aria-label="اختر المستوى"
      dir="ltr"
      className="inline-flex rounded-md bg-surface-sunken p-1"
    >
      {CEFR_LEVELS.map((level) => {
        const isAvailable = !availableLevels || availableLevels.includes(level)
        const isActive = level === value
        return (
          <button
            key={level}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={!isAvailable}
            onClick={() => onChange(level)}
            onKeyDown={(event) => handleTabKeyDown(event, enabledLevels, value, onChange)}
            className={cn(
              'tnum min-w-14 rounded-sm px-4 py-2 text-sm font-bold transition-colors',
              'disabled:cursor-not-allowed disabled:opacity-40',
              isActive ? 'bg-surface text-ink shadow-sm ring-1 ring-border' : 'text-ink-muted hover:text-ink',
            )}
          >
            {level}
          </button>
        )
      })}
    </div>
  )
}
