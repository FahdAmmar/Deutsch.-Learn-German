import { useLocation } from 'react-router-dom'

import { getContinueLearningLesson } from '@/features/dashboard/selectors'
import { useProgressStore } from '@/store/progressStore'

import { NAV_ITEMS } from './nav-items'
import type { NavItem } from './nav-items'

export interface ResolvedNavItem extends NavItem {
  href: string
  isActive: boolean
}

/**
 * Navigation items with their destinations resolved and their active state worked out.
 * "Interactive lesson" resumes the learner's lesson; "Reading practice" opens the texts tab
 * of their level. Both share a path prefix with other items, so active state is decided here
 * rather than by the router's path-only matching.
 */
export function useNavItems(): ResolvedNavItem[] {
  const { pathname, search } = useLocation()
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const currentLessonId = useProgressStore((state) => state.currentLessonId)
  const lessons = useProgressStore((state) => state.lessons)

  const continueLesson = getContinueLearningLesson({ currentLevel, currentLessonId, lessons })
  const lessonHref = continueLesson ? `/lessons/${continueLesson.level.toLowerCase()}/${continueLesson.slug}` : '/levels'
  const readingHref = `/levels/${currentLevel.toLowerCase()}?tab=stories`
  const onTexts = pathname.startsWith('/levels/') && new URLSearchParams(search).get('tab') === 'stories'

  return NAV_ITEMS.map((item) => {
    if (item.dynamic === 'continue-lesson') {
      return { ...item, href: lessonHref, isActive: pathname.startsWith('/lessons') }
    }
    if (item.dynamic === 'reading') {
      return { ...item, href: readingHref, isActive: onTexts }
    }
    const to = item.to ?? '/dashboard'
    const isLevels = to === '/levels'
    return { ...item, href: to, isActive: isLevels ? pathname.startsWith('/levels') && !onTexts : pathname === to || pathname.startsWith(`${to}/`) }
  })
}
