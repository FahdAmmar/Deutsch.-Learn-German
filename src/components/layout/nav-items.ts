import type { LucideIcon } from 'lucide-react'
import { BookOpen, BookText, CirclePlay, Languages, Layers, LayoutDashboard, ListChecks, Mic, PenLine, Route, Settings, TrendingUp } from 'lucide-react'

/** Items whose destination depends on the learner's progress rather than being a fixed route. */
export type DynamicDestination = 'continue-lesson' | 'reading'

export interface NavItem {
  id: string
  labelAr: string
  icon: LucideIcon
  /** Fixed route. Absent for dynamic items. */
  to?: string
  dynamic?: DynamicDestination
}

/** The primary navigation, in the order of the DeutschWelt design. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', to: '/dashboard', labelAr: 'لوحة التعلّم', icon: LayoutDashboard },
  { id: 'levels', to: '/levels', labelAr: 'مسار التعلّم والمستويات', icon: Route },
  { id: 'lesson', dynamic: 'continue-lesson', labelAr: 'درس تفاعلي', icon: CirclePlay },
  { id: 'grammar', to: '/grammar', labelAr: 'قواعد الألمانية', icon: BookOpen },
  { id: 'vocabulary', to: '/vocabulary', labelAr: 'بنك المفردات', icon: Languages },
  { id: 'review', to: '/review', labelAr: 'بطاقات الاستذكار', icon: Layers },
  { id: 'reading', dynamic: 'reading', labelAr: 'تدريب القراءة', icon: BookText },
  { id: 'my-text', to: '/my-text', labelAr: 'تدريب على نصّي', icon: PenLine },
  { id: 'pronunciation', to: '/pronunciation', labelAr: 'تدريب النطق', icon: Mic },
  { id: 'practice', to: '/practice', labelAr: 'التمارين والاختبارات', icon: ListChecks },
  { id: 'progress', to: '/progress', labelAr: 'إحصائيات التقدّم', icon: TrendingUp },
  { id: 'settings', to: '/settings', labelAr: 'الإعدادات', icon: Settings },
]
