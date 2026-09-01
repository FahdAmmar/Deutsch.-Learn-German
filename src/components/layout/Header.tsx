import { Flame, Menu } from 'lucide-react'
import { useState } from 'react'

import { useProgressStore } from '@/store/progressStore'

import { MobileDrawer } from './MobileDrawer'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const streakDays = useProgressStore((state) => state.streakDays)

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/80 md:px-6">
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="فتح القائمة"
        className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted md:hidden"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      <div className="flex items-center gap-2 md:hidden">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground">
          DA
        </span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        {streakDays > 0 && (
          <div
            className="flex items-center gap-1.5 rounded-md bg-accent-muted px-2.5 py-1.5 text-sm font-semibold text-accent"
            aria-label={`سلسلة التعلم: ${streakDays} ${streakDays === 1 ? 'يوم' : 'أيام'}`}
          >
            <Flame size={16} aria-hidden="true" />
            <span>{streakDays}</span>
          </div>
        )}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  )
}
