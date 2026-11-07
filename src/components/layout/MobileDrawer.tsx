import { X } from 'lucide-react'
import { useRef } from 'react'

import { useDialogFocus } from '@/hooks/useDialogFocus'

import { Brand } from './Brand'
import { NavList } from './NavList'
import { ThemeToggle } from './ThemeToggle'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  useDialogFocus(open, panelRef, onClose)

  if (!open) return null

  return (
    <div className="print:hidden fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="القائمة">
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
