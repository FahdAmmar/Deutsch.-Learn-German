import { Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/cn'

import { NAV_ITEMS } from './nav-items'

// The four destinations a learner reaches for most, kept within thumb range.
// Everything else (vocabulary, review, progress, settings) lives behind "المزيد".
const PRIMARY_MOBILE_ROUTES = ['/dashboard', '/levels', '/grammar', '/practice']
const PRIMARY_MOBILE_ITEMS = PRIMARY_MOBILE_ROUTES.map((route) => NAV_ITEMS.find((item) => item.to === route)).filter(
  (item): item is (typeof NAV_ITEMS)[number] => item !== undefined,
)

interface BottomNavProps {
  onOpenMore: () => void
}

const itemClasses =
  'relative flex flex-1 flex-col items-center justify-center gap-1 pt-1 text-xs font-medium transition-colors'

export function BottomNav({ onOpenMore }: BottomNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-stretch border-t border-border bg-surface/95 backdrop-blur md:hidden"
      aria-label="التنقل السريع"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', height: 'calc(4rem + env(safe-area-inset-bottom))' }}
    >
      {PRIMARY_MOBILE_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => cn(itemClasses, isActive ? 'text-ink' : 'text-ink-muted')}
        >
          {({ isActive }) => (
            <>
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-0 h-0.5 w-8 rounded-full transition-colors',
                  isActive ? 'bg-accent' : 'bg-transparent',
                )}
              />
              <item.icon size={21} aria-hidden="true" strokeWidth={isActive ? 2.4 : 1.9} />
              <span dir="rtl">{item.labelAr}</span>
            </>
          )}
        </NavLink>
      ))}

      <button type="button" onClick={onOpenMore} aria-haspopup="dialog" className={cn(itemClasses, 'text-ink-muted')}>
        <Menu size={21} aria-hidden="true" strokeWidth={1.9} />
        <span dir="rtl">المزيد</span>
      </button>
    </nav>
  )
}
