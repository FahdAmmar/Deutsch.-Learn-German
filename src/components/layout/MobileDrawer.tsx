import { useEffect } from 'react'
import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/cn'

import { NAV_ITEMS } from './nav-items'
import { ThemeToggle } from './ThemeToggle'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="القائمة">
      <button
        type="button"
        aria-label="إغلاق القائمة"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />

      <div className="absolute inset-y-0 start-0 flex w-72 max-w-[85vw] flex-col bg-surface shadow-md">
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
              DA
            </span>
            <span dir="rtl" className="text-sm font-semibold text-ink">
              تعلّم الألمانية
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-primary-muted text-primary font-semibold'
                    : 'text-ink-muted hover:bg-surface-muted hover:text-ink',
                )
              }
            >
              <item.icon size={18} aria-hidden="true" />
              <span className="flex flex-col leading-tight">
                <span dir="ltr" className="text-start">
                  {item.labelDe}
                </span>
                <span dir="rtl" className="text-xs opacity-80">
                  {item.labelAr}
                </span>
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-between border-t border-border p-4">
          <span dir="rtl" className="text-sm text-ink-muted">
            المظهر
          </span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
