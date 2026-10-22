import { BookMarked, Headphones } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom'

import { EmptyState, Tabs, tabPanelProps } from '@/components/ui'
import { LevelCover } from '@/features/levels/path/LevelCover'
import { LevelPath } from '@/features/levels/path/LevelPath'
import { StoryList } from '@/features/stories/StoryList'
import { getChapterProgress, getLevelChapters } from '@/lib/learningPath'
import { getStoriesForLevel } from '@/lib/stories'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

type LevelTab = 'lessons' | 'stories'

export default function LevelDetailPage() {
  const { level } = useParams<{ level: string }>()
  const normalizedLevel = level?.toUpperCase() as CEFRLevel | undefined
  const lessons = useProgressStore((state) => state.lessons)
  const currentLessonId = useProgressStore((state) => state.currentLessonId)
  // The active tab lives in the URL (?tab=stories) so a story page can link back to it.
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab: LevelTab = searchParams.get('tab') === 'stories' ? 'stories' : 'lessons'
  const setActiveTab = (tab: LevelTab) => setSearchParams(tab === 'lessons' ? {} : { tab }, { replace: true })

  // Links from the levels page point at a chapter (#chapter-…): scroll to it once the chapters are on screen.
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash || activeTab !== 'lessons') return
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' })
  }, [hash, activeTab])

  const completedLessonIds = useMemo(
    () => new Set(Object.values(lessons).filter((entry) => entry.completed).map((entry) => entry.lessonId)),
    [lessons],
  )

  if (!normalizedLevel || !CEFR_LEVELS.includes(normalizedLevel)) {
    return <Navigate to="/levels" replace />
  }

  const chapters = getLevelChapters(normalizedLevel)
  const stories = getStoriesForLevel(normalizedLevel)
  const levelLessons = chapters.flatMap((entry) => entry.lessons)
  const completedCount = levelLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length
  // "Next" follows the learning path, not the order lessons happen to be stored in.
  const nextLesson = levelLessons.find((lesson) => !completedLessonIds.has(lesson.id))
  const progress = getChapterProgress(chapters, completedLessonIds, currentLessonId ?? undefined)
  // Highlight the lesson the learner would resume with, but only if it is inside this level.
  const resumeLessonId =
    currentLessonId && levelLessons.some((lesson) => lesson.id === currentLessonId && !completedLessonIds.has(lesson.id))
      ? currentLessonId
      : nextLesson?.id

  return (
    <div className="space-y-8 pb-6">
      <LevelCover
        level={normalizedLevel}
        chapters={chapters}
        progress={progress}
        totalLessons={levelLessons.length}
        completedLessons={completedCount}
        nextLesson={nextLesson}
      />

      {chapters.length === 0 ? (
        <EmptyState title="محتوى هذا المستوى قيد الإعداد">نعمل على إضافة الدروس، وسيظهر المحتوى هنا فور جاهزيته.</EmptyState>
      ) : (
        <div className="space-y-6">
          <Tabs<LevelTab>
            label="أقسام المستوى"
            idPrefix="level"
            value={activeTab}
            onChange={setActiveTab}
            tabs={[
              { value: 'lessons', label: 'الدروس', icon: <BookMarked size={16} aria-hidden="true" /> },
              { value: 'stories', label: 'نصوص ومحادثات', icon: <Headphones size={16} aria-hidden="true" /> },
            ]}
          />

          <div {...tabPanelProps('level', activeTab)} tabIndex={0} className="outline-offset-4">
            {activeTab === 'lessons' ? (
              <LevelPath
                chapters={chapters}
                progress={progress}
                completedLessonIds={completedLessonIds}
                resumeLessonId={resumeLessonId}
              />
            ) : null}

            {activeTab === 'stories' ? <StoryList stories={stories} /> : null}
          </div>
        </div>
      )}
    </div>
  )
}
