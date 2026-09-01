import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/cn'

import { NAV_ITEMS } from './nav-items'

export function Sidebar() {
  return (
    <aside
      className="fixed inset-y-0 start-0 hidden w-60 flex-col border-e border-border bg-surface md:flex"
      aria-label="التنقل الرئيسي"
    >
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
          DA
        </span>
        <div className="flex flex-col leading-tight" dir="ltr">
          <span className="text-sm font-semibold text-ink">Deutsch</span>
          <span dir="rtl" className="text-xs text-ink-muted">
            تعلّم الألمانية
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
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
    </aside>
  )
}
