import { Navigate, useParams } from 'react-router-dom'

import { StoryView } from '@/features/stories/StoryView'
import { getStory } from '@/lib/stories'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

/** A single reading text or conversation, with audio. Route: /levels/:level/texts/:itemId */
export default function StoryPage() {
  const { level, itemId } = useParams<{ level: string; itemId: string }>()
  const normalizedLevel = level?.toUpperCase() as CEFRLevel | undefined

  if (!normalizedLevel || !CEFR_LEVELS.includes(normalizedLevel)) {
    return <Navigate to="/levels" replace />
  }

  const story = itemId ? getStory(normalizedLevel, itemId) : undefined
  if (!story) {
    return <Navigate to={`/levels/${normalizedLevel.toLowerCase()}?tab=stories`} replace />
  }

  // Keyed by story so switching stories resets the player (and silences the old audio).
  return <StoryView key={story.id} story={story} />
}
