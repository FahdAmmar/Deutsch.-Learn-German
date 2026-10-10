import { BookMarked, Headphones } from 'lucide-react'
import { useMemo } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'

import { EmptyState, RouteItem, RouteList, Tabs, tabPanelProps } from '@/components/ui'
import { LevelHeader } from '@/features/levels/LevelHeader'
import { ModuleSection } from '@/features/levels/ModuleSection'
import { getModulePath } from '@/features/dashboard/selectors'
import { StoryList } from '@/features/stories/StoryList'
import { getLessonsForLevel, getModulesForLevel } from '@/lib/curriculum'
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

  const completedLessonIds = useMemo(
    () => new Set(Object.values(lessons).filter((entry) => entry.completed).map((entry) => entry.lessonId)),
    [lessons],
  )

  if (!normalizedLevel || !CEFR_LEVELS.includes(normalizedLevel)) {
    return <Navigate to="/levels" replace />
  }

  const modules = getModulesForLevel(normalizedLevel)
  const stories = getStoriesForLevel(normalizedLevel)
  const levelLessons = getLessonsForLevel(normalizedLevel)
  const completedCount = levelLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length
  const nextLesson = levelLessons.find((lesson) => !completedLessonIds.has(lesson.id))
  const modulePath = getModulePath({ lessons }, normalizedLevel, currentLessonId ?? undefined)
  // Highlight the lesson the learner would resume with, but only if it is inside this level.
  const resumeLessonId = currentLessonId && levelLessons.some((lesson) => lesson.id === currentLessonId && !completedLessonIds.has(lesson.id))
    ? currentLessonId
    : nextLesson?.id

  return (
    <div className="space-y-8 pb-6">
      <LevelHeader
        level={normalizedLevel}
        moduleCount={modules.length}
        totalLessons={levelLessons.length}
        completedLessons={completedCount}
        nextLesson={nextLesson}
      />

      {modules.length === 0 ? (
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
              <RouteList dir="rtl">
                {modulePath.map((step, index) => (
                  <RouteItem
                    key={step.module.id}
                    state={step.state}
                    marker={step.module.order}
                    last={index === modulePath.length - 1}
                  >
                    <ModuleSection
                      module={step.module}
                      state={step.state}
                      completedLessonIds={completedLessonIds}
                      nextLessonId={resumeLessonId}
                    />
                  </RouteItem>
                ))}
              </RouteList>
            ) : null}

            {activeTab === 'stories' ? <StoryList stories={stories} /> : null}
          </div>
        </div>
      )}
    </div>
  )
}
