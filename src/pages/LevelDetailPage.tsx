import { Navigate, useParams, useSearchParams } from 'react-router-dom'

import { EmptyState, PageHeader } from '@/components/ui'
import { StoryList } from '@/features/stories/StoryList'
import { getStoriesForLevel } from '@/lib/stories'
import { CEFR_LEVEL_INFO, CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

/**
 * `/levels/:level?tab=stories`: the texts and conversations of one level, gathered in one place (they are also
 * steps of the plan). `/levels/:level` on its own used to be the level's path; the plan now lives in one
 * list at `/levels`, so it leads there.
 */
export default function LevelDetailPage() {
  const { level } = useParams<{ level: string }>()
  const [searchParams] = useSearchParams()
  const normalizedLevel = level?.toUpperCase() as CEFRLevel | undefined

  if (!normalizedLevel || !CEFR_LEVELS.includes(normalizedLevel) || searchParams.get('tab') !== 'stories') {
    return <Navigate to="/levels" replace />
  }

  const stories = getStoriesForLevel(normalizedLevel)
  const info = CEFR_LEVEL_INFO[normalizedLevel]

  return (
    <div className="space-y-8 pb-6">
      <PageHeader title={`نصوص ومحادثات: ${info.titleAr}`} titleDe={`Texte und Gespräche ${normalizedLevel}`} />
      {stories.length === 0 ? (
        <EmptyState title="محتوى هذا المستوى قيد الإعداد">نعمل على إضافة النصوص والمحادثات، وسيظهر المحتوى هنا فور جاهزيته.</EmptyState>
      ) : (
        <StoryList stories={stories} />
      )}
    </div>
  )
}
