import type { LucideIcon } from 'lucide-react'
import { BookMarked, Dumbbell, LayoutGrid, Library, Settings, SquareStack, TrendingUp } from 'lucide-react'

export interface NavItem {
  to: string
  labelDe: string
  labelAr: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', labelDe: 'Übersicht', labelAr: 'الرئيسية', icon: LayoutGrid },
  { to: '/levels', labelDe: 'Stufen', labelAr: 'المستويات', icon: SquareStack },
  { to: '/vocabulary', labelDe: 'Wortschatz', labelAr: 'المفردات', icon: BookMarked },
  { to: '/grammar', labelDe: 'Grammatik', labelAr: 'القواعد', icon: Library },
  { to: '/practice', labelDe: 'Übungen', labelAr: 'التمارين', icon: Dumbbell },
  { to: '/progress', labelDe: 'Fortschritt', labelAr: 'التقدم', icon: TrendingUp },
  { to: '/settings', labelDe: 'Einstellungen', labelAr: 'الإعدادات', icon: Settings },
]
