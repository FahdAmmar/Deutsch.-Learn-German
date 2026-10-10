import { lazy } from 'react'

/** Route-level code splitting: one lazy chunk per page. */
export const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
export const LevelsPage = lazy(() => import('@/pages/LevelsPage'))
export const LevelDetailPage = lazy(() => import('@/pages/LevelDetailPage'))
export const StoryPage = lazy(() => import('@/pages/StoryPage'))
export const PlacementTestPage = lazy(() => import('@/pages/PlacementTestPage'))
export const LessonPage = lazy(() => import('@/pages/LessonPage'))
export const VocabularyPage = lazy(() => import('@/pages/VocabularyPage'))
export const GrammarPage = lazy(() => import('@/pages/GrammarPage'))
export const GrammarRulePage = lazy(() => import('@/pages/GrammarRulePage'))
export const PracticePage = lazy(() => import('@/pages/PracticePage'))
export const ReviewPage = lazy(() => import('@/pages/ReviewPage'))
export const ProgressPage = lazy(() => import('@/pages/ProgressPage'))
export const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
export const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
