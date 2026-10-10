import type { LucideIcon } from 'lucide-react'
import { Brain, BookMarked, Dumbbell, LayoutGrid, Library, Settings, SquareStack, TrendingUp } from 'lucide-react'

export type NavGroupId = 'learn' | 'practice' | 'account'

export interface NavItem {
  to: string
  labelDe: string
  labelAr: string
  icon: LucideIcon
  group: NavGroupId
}

export const NAV_GROUPS: { id: NavGroupId; labelAr?: string }[] = [
  { id: 'learn', labelAr: 'التعلّم' },
  { id: 'practice', labelAr: 'التدرّب والمتابعة' },
  { id: 'account' },
]

export const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', labelDe: 'Übersicht', labelAr: 'الرئيسية', icon: LayoutGrid, group: 'learn' },
  { to: '/levels', labelDe: 'Stufen', labelAr: 'المستويات', icon: SquareStack, group: 'learn' },
  { to: '/grammar', labelDe: 'Grammatik', labelAr: 'القواعد', icon: Library, group: 'learn' },
  { to: '/vocabulary', labelDe: 'Wortschatz', labelAr: 'المفردات', icon: BookMarked, group: 'learn' },
  { to: '/practice', labelDe: 'Übungen', labelAr: 'التمارين', icon: Dumbbell, group: 'practice' },
  { to: '/review', labelDe: 'Wiederholen', labelAr: 'المراجعة', icon: Brain, group: 'practice' },
  { to: '/progress', labelDe: 'Fortschritt', labelAr: 'التقدم', icon: TrendingUp, group: 'practice' },
  { to: '/settings', labelDe: 'Einstellungen', labelAr: 'الإعدادات', icon: Settings, group: 'account' },
]
