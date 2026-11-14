import { Monitor, Moon, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'
import { useThemeStore } from '@/store/themeStore'
import type { ThemePreference } from '@/types/settings'

const OPTIONS: { value: ThemePreference; label: string; icon: LucideIcon }[] = [
  { value: 'light', label: 'فاتح', icon: Sun },
  { value: 'dark', label: 'داكن', icon: Moon },
  { value: 'system', label: 'تلقائي', icon: Monitor },
]

/**
 * The theme choice as three visible options (the phone's "More" sheet). The header's cycling icon button asks the
 * learner to tap and see what happens; here all three are on screen, each a 44px target.
 */
export function ThemeSegmented() {
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)

  return (
    <div role="group" aria-label="المظهر" className="grid grid-cols-3 gap-1 rounded-lg bg-surface-sunken p-1">
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const selected = preference === value
        return (
          <button
            key={value}
            type="button"
            aria-pressed={selected}
            onClick={() => setPreference(value)}
            className={cn(
              'flex min-h-11 select-none items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-colors',
              selected ? 'bg-surface font-semibold text-ink shadow-sm ring-1 ring-border' : 'text-ink-muted active:bg-surface',
            )}
          >
            <Icon size={16} aria-hidden="true" />
            <span dir="rtl">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
