import type { LucideIcon } from 'lucide-react'
import { BookOpen, BookText, Languages, Layers, LayoutDashboard, ListChecks, Mic, PenLine, Route, Settings, TrendingUp } from 'lucide-react'

/** Items whose destination depends on the learner's progress rather than being a fixed route. */
export type DynamicDestination = 'reading'

export interface NavItem {
  id: string
  labelAr: string
  icon: LucideIcon
  /** Fixed route. Absent for dynamic items. */
  to?: string
  dynamic?: DynamicDestination
}

export interface NavGroup {
  id: string
  /** The group's heading. A group without one is set apart by a rule instead. */
  labelAr?: string
  items: NavItem[]
}

/**
 * The primary navigation, grouped by what the learner is doing: today's plan, learning something new, practising
 * what was learned, and looking back. The next lesson is not an item of its own — it is the dashboard's call to
 * action — so no item changes its destination as the learner progresses, except reading, which opens the
 * texts of the current level.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'today',
    items: [{ id: 'dashboard', to: '/dashboard', labelAr: 'اليوم', icon: LayoutDashboard }],
  },
  {
    id: 'learn',
    labelAr: 'تعلّم',
    items: [
      { id: 'levels', to: '/levels', labelAr: 'المستويات', icon: Route },
      { id: 'grammar', to: '/grammar', labelAr: 'القواعد', icon: BookOpen },
      { id: 'vocabulary', to: '/vocabulary', labelAr: 'المفردات', icon: Languages },
    ],
  },
  {
    id: 'practice',
    labelAr: 'تدريب',
    items: [
      { id: 'review', to: '/review', labelAr: 'المراجعة', icon: Layers },
      { id: 'reading', dynamic: 'reading', labelAr: 'القراءة', icon: BookText },
      { id: 'practice', to: '/practice', labelAr: 'التمارين', icon: ListChecks },
      { id: 'pronunciation', to: '/pronunciation', labelAr: 'النطق', icon: Mic },
      { id: 'my-text', to: '/my-text', labelAr: 'نصوصي', icon: PenLine },
    ],
  },
  {
    id: 'me',
    items: [
      { id: 'progress', to: '/progress', labelAr: 'التقدّم', icon: TrendingUp },
      { id: 'settings', to: '/settings', labelAr: 'الإعدادات', icon: Settings },
    ],
  },
]

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((group) => group.items)

/**
 * The destinations the phone's bottom bar holds, in order. Everything else in {@link NAV_ITEMS} sits behind "More"
 * (`MoreSheet`), so the two lists can never drift apart: the sheet shows exactly the items this list leaves out.
 */
export const MOBILE_PRIMARY_IDS: readonly string[] = ['dashboard', 'levels', 'grammar', 'practice']
