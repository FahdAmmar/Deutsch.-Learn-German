import { X } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

import { useDialogFocus } from '@/hooks/useDialogFocus'
import { useDueCount } from '@/features/review/useDueCount'
import { cn } from '@/lib/cn'

import { LevelFooter } from './LevelFooter'
import { MOBILE_PRIMARY_IDS } from './nav-items'
import { ThemeSegmented } from './ThemeSegmented'
import { useNavGroups } from './useNavGroups'

interface MoreSheetProps {
  open: boolean
  onClose: () => void
}

/**
 * "More" on a phone: a bottom sheet, not a side drawer — the controls sit where the thumb already is. It holds the
 * destinations the bottom bar has no room for (same data as the sidebar, minus `MOBILE_PRIMARY_IDS`), the learner's
 * place in their level, and the theme choice. Closes on the backdrop, the close button, Escape or after a link.
 */
export function MoreSheet({ open, onClose }: MoreSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const groups = useNavGroups()
  const dueCount = useDueCount()
  useDialogFocus(open, panelRef, onClose)

  if (!open) return null

  const items = groups.flatMap((group) => group.items).filter((item) => !MOBILE_PRIMARY_IDS.includes(item.id))

  return (
    <div className="print:hidden fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="القائمة">
      <button
        type="button"
        aria-label="إغلاق القائمة"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 animate-[fade-in_150ms_ease-out_both] bg-ink/45"
      />

      <div
        ref={panelRef}
        className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] animate-[sheet-up_260ms_cubic-bezier(0.2,0.8,0.2,1)_both] flex-col rounded-t-xl border-t border-border bg-surface shadow-lg"
      >
        <div className="flex h-14 shrink-0 items-center justify-between ps-5 pe-2">
          <h2 dir="rtl" className="font-heading text-lg font-bold text-ink">
            المزيد
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="flex size-11 select-none items-center justify-center rounded-full text-ink-muted active:bg-surface-sunken"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,var(--safe-b))]">
          <LevelFooter variant="card" onNavigate={onClose} />

          <nav aria-label="التنقل الرئيسي">
            <ul className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    aria-current={item.isActive ? 'page' : undefined}
                    className={cn(
                      'flex min-h-14 select-none items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors',
                      item.isActive
                        ? 'border-primary/30 bg-primary-muted font-semibold text-primary'
                        : 'border-border bg-bg-alt text-ink active:bg-surface-sunken',
                    )}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-surface text-ink-muted">
                      <item.icon size={19} aria-hidden="true" />
                    </span>
                    <span dir="rtl" className="min-w-0 flex-1 truncate text-[0.95rem] leading-snug">
                      {item.labelAr}
                    </span>
                    {item.id === 'review' && dueCount > 0 ? (
                      <span
                        className="tnum min-w-6 rounded-full bg-accent px-1.5 py-0.5 text-center text-xs font-bold text-accent-foreground"
                        aria-label={`${dueCount} كلمة جاهزة للمراجعة`}
                      >
                        {dueCount > 99 ? '99+' : dueCount}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-2 pt-1">
            <p dir="rtl" className="px-1 text-sm font-semibold text-ink-faint">
              المظهر
            </p>
            <ThemeSegmented />
          </div>
        </div>
      </div>
    </div>
  )
}
