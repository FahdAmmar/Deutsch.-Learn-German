import { NavLink } from 'react-router-dom'

import { useDueCount } from '@/features/review/useDueCount'
import { cn } from '@/lib/cn'

import { NAV_GROUPS, NAV_ITEMS } from './nav-items'

interface NavListProps {
  /** Called after a link is followed — the mobile drawer uses it to close itself. */
  onNavigate?: () => void
}

/** Grouped navigation shared by the desktop sidebar and the mobile drawer. */
export function NavList({ onNavigate }: NavListProps) {
  const dueCount = useDueCount()

  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5" aria-label="التنقل الرئيسي">
      {NAV_GROUPS.map((group) => {
        const items = NAV_ITEMS.filter((item) => item.group === group.id)
        return (
          <div key={group.id} className="space-y-1">
            {group.labelAr ? (
              <p dir="rtl" className="px-3 pb-1 text-xs font-semibold text-ink-faint">
                {group.labelAr}
              </p>
            ) : null}
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'relative flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors',
                    'before:absolute before:inset-y-2 before:start-0 before:w-[3px] before:rounded-full before:transition-colors',
                    isActive
                      ? 'bg-surface-sunken text-ink before:bg-accent'
                      : 'text-ink-muted before:bg-transparent hover:bg-surface-sunken/70 hover:text-ink',
                  )
                }
              >
                <item.icon size={19} aria-hidden="true" className="shrink-0" />
                <span className="flex min-w-0 flex-1 flex-col items-start leading-snug">
                  <span dir="rtl" className="text-[0.95rem] font-semibold">
                    {item.labelAr}
                  </span>
                  <span dir="ltr" lang="de" className="text-xs font-normal text-ink-faint">
                    {item.labelDe}
                  </span>
                </span>
                {item.to === '/review' && dueCount > 0 ? (
                  <span
                    className="tnum min-w-6 rounded-full bg-accent px-1.5 py-0.5 text-center text-xs font-bold text-accent-foreground"
                    aria-label={`${dueCount} كلمة جاهزة للمراجعة`}
                  >
                    {dueCount > 99 ? '99+' : dueCount}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </div>
        )
      })}
    </nav>
  )
}
