import { Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { CurriculumGate } from '@/components/CurriculumGate'
import { AppShell } from '@/components/layout/AppShell'
import { RouteErrorPage } from '@/components/RouteErrorPage'
import { PageLoader } from '@/components/ui/PageLoader'

import {
  DashboardPage,
  LevelsPage,
  LevelDetailPage,
  StoryPage,
  DictationPage,
  MyTextPage,
  MyTextPracticePage,
  WeakWordsPage,
  HardWordsPage,
  PronunciationPage,
  StoryQuizPage,
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

/** A page that reads curriculum data across levels: waits for every level with content. */
function withAllLevels(element: React.ReactNode) {
  return withSuspense(<CurriculumGate>{element}</CurriculumGate>)
}

/** A page scoped to the level in its URL: only that level's content is fetched. */
/** The route's level plus the levels below it: a text of A2 reuses A1 words, which its word list looks up. */
function withRouteLevelAndBelow(element: React.ReactNode) {
  return withSuspense(
    <CurriculumGate levelParam="level" includeLowerLevels>
      {element}
    </CurriculumGate>,
  )
}

function withRouteLevel(element: React.ReactNode) {
  return withSuspense(<CurriculumGate levelParam="level">{element}</CurriculumGate>)
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorPage standalone />,
    children: [
      {
        // Pathless layout: a failing page renders its error here, inside the shell.
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: withAllLevels(<DashboardPage />) },
          { path: 'levels', element: withAllLevels(<LevelsPage />) },
          { path: 'levels/:level', element: withRouteLevel(<LevelDetailPage />) },
          { path: 'levels/:level/texts/:itemId', element: withRouteLevelAndBelow(<StoryPage />) },
          { path: 'levels/:level/texts/:itemId/diktat', element: withRouteLevel(<DictationPage />) },
          { path: 'levels/:level/texts/:itemId/quiz', element: withAllLevels(<StoryQuizPage />) },
          // The learner's own texts need no curriculum data, so no gate.
          { path: 'my-text', element: withSuspense(<MyTextPage />) },
          // A fixed path, so it is matched before the `:id` of one of the learner's own texts.
          { path: 'my-text/weak-words', element: withSuspense(<WeakWordsPage />) },
          { path: 'my-text/:id', element: withSuspense(<MyTextPracticePage />) },
          { path: 'placement-test', element: withAllLevels(<PlacementTestPage />) },
          { path: 'lessons/:level/:lessonId', element: withRouteLevel(<LessonPage />) },
          { path: 'vocabulary', element: withAllLevels(<VocabularyPage />) },
          { path: 'grammar', element: withAllLevels(<GrammarPage />) },
          { path: 'grammar/:level/:slug', element: withAllLevels(<GrammarRulePage />) },
          { path: 'pronunciation', element: withSuspense(<PronunciationPage />) },
          { path: 'practice', element: withAllLevels(<PracticePage />) },
          { path: 'review', element: withAllLevels(<ReviewPage />) },
          { path: 'review/hard-words', element: withAllLevels(<HardWordsPage />) },
          { path: 'progress', element: withAllLevels(<ProgressPage />) },
          { path: 'settings', element: withSuspense(<SettingsPage />) },
          { path: '*', element: withSuspense(<NotFoundPage />) },
        ],
      },
    ],
  },
])
