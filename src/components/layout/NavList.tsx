import { Link } from 'react-router-dom'

import { useDueCount } from '@/features/review/useDueCount'
import { cn } from '@/lib/cn'
import { useProgressStore } from '@/store/progressStore'

import { useNavGroups } from './useNavGroups'

interface NavListProps {
  /** Called after a link is followed — the mobile drawer uses it to close itself. */
  onNavigate?: () => void
}

/** The grouped primary navigation shared by the desktop sidebar and the mobile drawer. */
export function NavList({ onNavigate }: NavListProps) {
  const groups = useNavGroups()
  const dueCount = useDueCount()
  const currentLevel = useProgressStore((state) => state.currentLevel)

  return (
    <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="التنقل الرئيسي">
      {groups.map((group, index) => (
        <div
          key={group.id}
          role={group.labelAr ? 'group' : undefined}
          aria-labelledby={group.labelAr ? `nav-group-${group.id}` : undefined}
          className={cn('space-y-1', index > 0 && 'mt-4', index > 0 && !group.labelAr && 'border-t border-border pt-4')}
        >
          {group.labelAr ? (
            <p id={`nav-group-${group.id}`} dir="rtl" className="px-4 pb-1 text-sm font-semibold text-ink-faint">
              {group.labelAr}
            </p>
          ) : null}

          {group.items.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              onClick={onNavigate}
              aria-current={item.isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-md px-4 py-2.5 transition-colors',
                item.isActive
                  ? 'bg-primary-container font-semibold text-on-primary-container shadow-sm'
                  : 'text-ink-muted hover:bg-surface-sunken hover:text-ink',
              )}
            >
              <item.icon size={20} aria-hidden="true" className="shrink-0" />
              <span dir="rtl" className="min-w-0 flex-1 text-[0.95rem] leading-snug">
                {item.labelAr}
              </span>
              {item.id === 'levels' ? (
                <span dir="ltr" className="font-heading rounded bg-plum-muted px-1.5 py-0.5 text-[0.7rem] font-extrabold tracking-[0.08em] text-plum">
                  {currentLevel}
                </span>
              ) : null}
              {item.id === 'review' && dueCount > 0 ? (
                <span
                  className="tnum min-w-6 rounded-full bg-accent px-1.5 py-0.5 text-center text-xs font-bold text-accent-foreground"
                  aria-label={`${dueCount} كلمة جاهزة للمراجعة`}
                >
                  {dueCount > 99 ? '99+' : dueCount}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
