import { Navigate, useParams } from 'react-router-dom'

import { DictationView } from '@/features/dictation/DictationView'
import { getStoriesForLevel, getStory } from '@/lib/stories'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

/** Letter-by-letter dictation of one text or conversation. Route: /levels/:level/texts/:itemId/diktat */
export default function DictationPage() {
  const { level, itemId } = useParams<{ level: string; itemId: string }>()
  const normalizedLevel = level?.toUpperCase() as CEFRLevel | undefined

  if (!normalizedLevel || !CEFR_LEVELS.includes(normalizedLevel)) {
    return <Navigate to="/levels" replace />
  }

  const story = itemId ? getStory(normalizedLevel, itemId) : undefined
  if (!story) {
    return <Navigate to={`/levels/${normalizedLevel.toLowerCase()}?tab=stories`} replace />
  }

  const stories = getStoriesForLevel(normalizedLevel)
  const nextStory = stories[stories.findIndex((candidate) => candidate.id === story.id) + 1]

  // Keyed by story so moving to the next text starts a fresh run (and silences the old audio).
  return <DictationView key={story.id} story={story} nextStory={nextStory} />
}
