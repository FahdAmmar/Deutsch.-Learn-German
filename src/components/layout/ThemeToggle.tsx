import { Monitor, Moon, Sun } from 'lucide-react'

import { useThemeStore } from '@/store/themeStore'
import type { ThemePreference } from '@/types/settings'

const CYCLE: ThemePreference[] = ['light', 'dark', 'system']

const ICON = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

const LABEL_AR: Record<ThemePreference, string> = {
  light: 'الوضع الفاتح',
  dark: 'الوضع الداكن',
  system: 'حسب إعدادات النظام',
}

export function ThemeToggle() {
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)

  const Icon = ICON[preference]

  function handleClick() {
    const currentIndex = CYCLE.indexOf(preference)
    const next = CYCLE[(currentIndex + 1) % CYCLE.length]
    setPreference(next)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`تغيير المظهر، الحالي: ${LABEL_AR[preference]}`}
      title={LABEL_AR[preference]}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  )
}
