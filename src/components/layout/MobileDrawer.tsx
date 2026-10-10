import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Brand } from './Brand'
import { NavList } from './NavList'
import { ThemeToggle } from './ThemeToggle'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])'

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const opener = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      // Keep keyboard focus inside the dialog while it is open.
      if (event.key !== 'Tab' || !panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      opener?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="القائمة">
      <button
        type="button"
        aria-label="إغلاق القائمة"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 animate-[pop-in_150ms_ease-out_both] bg-ink/45"
      />

      <div
        ref={panelRef}
        className="absolute inset-y-0 start-0 flex w-80 max-w-[88vw] animate-[pop-in_200ms_ease-out_both] flex-col bg-surface shadow-lg"
      >
        <div className="flex h-16 items-center justify-between border-b border-border ps-5 pe-3">
          <Brand />
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <NavList onNavigate={onClose} />

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
