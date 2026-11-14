import { LayoutGrid } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useDueCount } from '@/features/review/useDueCount'
import { cn } from '@/lib/cn'

import { MOBILE_PRIMARY_IDS } from './nav-items'
import { useNavGroups } from './useNavGroups'

interface BottomNavProps {
  onOpenMore: () => void
}

// The four destinations a learner reaches for most, kept within thumb range (`MOBILE_PRIMARY_IDS`).
// Everything else (vocabulary, review, progress, settings …) lives behind "المزيد".
const itemClasses =
  'group relative flex min-w-0 flex-1 basis-0 select-none flex-col items-center justify-center gap-0.5 text-xs transition-colors'

/** The icon sits on a pill that fills when the item is current — a shape as well as a colour, so it reads without hue. */
function Pill({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'relative flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-200',
        active ? 'bg-primary-muted text-primary' : 'text-ink-muted group-active:bg-surface-sunken',
      )}
    >
      {children}
    </span>
  )
}

export function BottomNav({ onOpenMore }: BottomNavProps) {
  const groups = useNavGroups()
  const dueCount = useDueCount()
  const items = groups.flatMap((group) => group.items).filter((item) => MOBILE_PRIMARY_IDS.includes(item.id))

  return (
    <nav
      className="print:hidden fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 pb-(--safe-b) backdrop-blur md:hidden"
      aria-label="التنقل السريع"
    >
      <div className="flex h-16 items-stretch pr-(--safe-r) pl-(--safe-l)">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            aria-current={item.isActive ? 'page' : undefined}
            className={cn(itemClasses, item.isActive ? 'font-semibold text-ink' : 'font-medium text-ink-muted')}
          >
            <Pill active={item.isActive}>
              <item.icon size={22} aria-hidden="true" strokeWidth={item.isActive ? 2.3 : 1.9} />
            </Pill>
            <span dir="rtl" className="max-w-full truncate px-1 leading-4">
              {item.labelAr}
            </span>
          </Link>
        ))}

        <button type="button" onClick={onOpenMore} aria-haspopup="dialog" className={cn(itemClasses, 'font-medium text-ink-muted')}>
          <Pill active={false}>
            <LayoutGrid size={22} aria-hidden="true" strokeWidth={1.9} />
            {dueCount > 0 ? (
              <span aria-hidden="true" className="absolute end-3 top-0.5 size-2.5 rounded-full bg-accent ring-2 ring-surface" />
            ) : null}
          </Pill>
          <span dir="rtl" className="max-w-full truncate px-1 leading-4">
            المزيد
          </span>
          {dueCount > 0 ? <span className="sr-only">{`، ${dueCount} كلمة جاهزة للمراجعة`}</span> : null}
        </button>
      </div>
    </nav>
  )
}
