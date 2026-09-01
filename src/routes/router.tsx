import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { PageLoader } from '@/components/ui/PageLoader'

const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const LevelsPage = lazy(() => import('@/pages/LevelsPage'))
const LevelDetailPage = lazy(() => import('@/pages/LevelDetailPage'))
const LessonPage = lazy(() => import('@/pages/LessonPage'))
const VocabularyPage = lazy(() => import('@/pages/VocabularyPage'))
const GrammarPage = lazy(() => import('@/pages/GrammarPage'))
const PracticePage = lazy(() => import('@/pages/PracticePage'))
const ProgressPage = lazy(() => import('@/pages/ProgressPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

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
      { path: 'lessons/:level/:lessonId', element: withSuspense(<LessonPage />) },
      { path: 'vocabulary', element: withSuspense(<VocabularyPage />) },
      { path: 'grammar', element: withSuspense(<GrammarPage />) },
      { path: 'practice', element: withSuspense(<PracticePage />) },
      { path: 'progress', element: withSuspense(<ProgressPage />) },
      { path: 'settings', element: withSuspense(<SettingsPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
])
