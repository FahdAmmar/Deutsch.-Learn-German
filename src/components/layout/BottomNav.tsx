import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/cn'

import { NAV_ITEMS } from './nav-items'

// A curated subset: the five items a learner reaches for most often,
// kept within thumb range. Grammar and Settings remain one tap away via
// the header menu rather than crowding the bar.
const PRIMARY_MOBILE_ITEMS = NAV_ITEMS.filter((item) =>
  ['/dashboard', '/levels', '/vocabulary', '/practice', '/progress'].includes(item.to),
)

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-stretch border-t border-border bg-surface md:hidden"
      aria-label="التنقل السريع"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {PRIMARY_MOBILE_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center justify-center gap-0.5 text-xs transition-colors',
              isActive ? 'text-primary' : 'text-ink-muted',
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon size={20} aria-hidden="true" className={cn(isActive && 'fill-primary/10')} />
              <span dir="rtl">{item.labelAr}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
