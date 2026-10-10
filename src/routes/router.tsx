import { Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { PageLoader } from '@/components/ui/PageLoader'

import {
  DashboardPage,
  LevelsPage,
  LevelDetailPage,
  StoryPage,
  PlacementTestPage,
  LessonPage,
  VocabularyPage,
  GrammarPage,
  GrammarRulePage,
  PracticePage,
  ReviewPage,
  ProgressPage,
  SettingsPage,
  NotFoundPage,
} from './lazyPages'


function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: withSuspense(<DashboardPage />) },
      { path: 'levels', element: withSuspense(<LevelsPage />) },
      { path: 'levels/:level', element: withSuspense(<LevelDetailPage />) },
      { path: 'levels/:level/texts/:itemId', element: withSuspense(<StoryPage />) },
      { path: 'placement-test', element: withSuspense(<PlacementTestPage />) },
      { path: 'lessons/:level/:lessonId', element: withSuspense(<LessonPage />) },
      { path: 'vocabulary', element: withSuspense(<VocabularyPage />) },
      { path: 'grammar', element: withSuspense(<GrammarPage />) },
      { path: 'grammar/:level/:slug', element: withSuspense(<GrammarRulePage />) },
      { path: 'practice', element: withSuspense(<PracticePage />) },
      { path: 'review', element: withSuspense(<ReviewPage />) },
      { path: 'progress', element: withSuspense(<ProgressPage />) },
      { path: 'settings', element: withSuspense(<SettingsPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
])
