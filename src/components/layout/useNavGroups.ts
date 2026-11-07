import { useLocation } from 'react-router-dom'

import { useProgressStore } from '@/store/progressStore'
import type { CEFRLevel } from '@/types'

import { NAV_GROUPS } from './nav-items'
import type { NavGroup, NavItem } from './nav-items'

export interface ResolvedNavItem extends NavItem {
  href: string
  isActive: boolean
}

export interface ResolvedNavGroup extends Omit<NavGroup, 'items'> {
  items: ResolvedNavItem[]
}

function resolveItem(item: NavItem, pathname: string, onTexts: boolean, currentLevel: CEFRLevel): ResolvedNavItem {
  if (item.dynamic === 'reading') {
    return { ...item, href: `/levels/${currentLevel.toLowerCase()}?tab=stories`, isActive: onTexts }
  }

  const to = item.to ?? '/dashboard'
  if (to === '/levels') {
    // A lesson belongs to a level, so it keeps "Levels" lit; the texts tab belongs to "Reading".
    const inLevels = (pathname.startsWith('/levels') && !onTexts) || pathname.startsWith('/lessons')
    return { ...item, href: to, isActive: inLevels }
  }
  return { ...item, href: to, isActive: pathname === to || pathname.startsWith(`${to}/`) }
}

/**
 * The navigation groups with their destinations resolved and their active state worked out. "Reading" opens the
 * texts tab of the learner's level, which shares a path prefix with "Levels", so active state is decided here
 * rather than by the router's path-only matching.
 */
export function resolveNavGroups(pathname: string, search: string, currentLevel: CEFRLevel): ResolvedNavGroup[] {
  const onTexts = pathname.startsWith('/levels/') && new URLSearchParams(search).get('tab') === 'stories'
  return NAV_GROUPS.map((group) => ({ ...group, items: group.items.map((item) => resolveItem(item, pathname, onTexts, currentLevel)) }))
}

export function useNavGroups(): ResolvedNavGroup[] {
  const { pathname, search } = useLocation()
  const currentLevel = useProgressStore((state) => state.currentLevel)
  return resolveNavGroups(pathname, search, currentLevel)
}
