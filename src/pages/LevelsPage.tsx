import { BookCheck, ClipboardCheck, Languages } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageHeader } from '@/components/ui'
import { LevelPanel } from '@/features/levels/LevelPanel'
import { PathTrack } from '@/features/levels/PathTrack'
import type { TrackState } from '@/features/levels/PathTrack'
import { getAllVocabulary } from '@/lib/curriculum'
import { getChapterProgress, getLevelChapters } from '@/lib/learningPath'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVELS } from '@/types'

export default function LevelsPage() {
  const lessons = useProgressStore((state) => state.lessons)
  const vocabulary = useProgressStore((state) => state.vocabulary)
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const currentLessonId = useProgressStore((state) => state.currentLessonId)

  const completedIds = new Set(Object.values(lessons).filter((entry) => entry.completed).map((entry) => entry.lessonId))

  const levels = CEFR_LEVELS.map((level) => {
    const chapters = getLevelChapters(level)
    const levelLessons = chapters.flatMap((entry) => entry.lessons)
    const completedLessons = levelLessons.filter((lesson) => completedIds.has(lesson.id)).length
    const hasContent = levelLessons.length > 0
    const finished = hasContent && completedLessons === levelLessons.length
    const state: TrackState = !hasContent ? 'locked' : finished ? 'done' : level === currentLevel ? 'current' : 'upcoming'

    return {
      level,
      chapters,
      chapterProgress: getChapterProgress(chapters, completedIds, level === currentLevel ? (currentLessonId ?? undefined) : undefined),
      totalLessons: levelLessons.length,
      completedLessons,
      state,
    }
  })

  const totalLessons = levels.reduce((sum, entry) => sum + entry.totalLessons, 0)
  const completedLessons = levels.reduce((sum, entry) => sum + entry.completedLessons, 0)
  const knownWords = Object.keys(vocabulary).length
  const allWords = getAllVocabulary().length

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="مسار التعلّم والمستويات"
        titleDe="Lernpfad nach dem GER (CEFR)"
        description="تقدّم بشكل منهجي من A1 حتى B2. كل مستوى يُبنى على ما قبله، وكل فصل فيه يسبقه ما يحتاجه."
      />

      <PathTrack levels={levels.map((entry) => ({ level: entry.level, ratio: entry.totalLessons === 0 ? 0 : entry.completedLessons / entry.totalLessons, state: entry.state }))} />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="space-y-5">
          {levels.map((entry) => (
            <LevelPanel
              key={entry.level}
              level={entry.level}
              totalLessons={entry.totalLessons}
              completedLessons={entry.completedLessons}
              isCurrent={entry.state === 'current'}
              chapters={entry.chapters}
              chapterProgress={entry.chapterProgress}
            />
          ))}
        </div>

        <aside dir="rtl" className="space-y-4 lg:sticky lg:top-24">
          <section aria-labelledby="path-stats-title" className="space-y-4 rounded-lg border border-border bg-surface p-5 shadow-sm">
            <h2 id="path-stats-title" className="text-lg font-bold text-ink">
              إحصائيات المسار
            </h2>
            <dl className="space-y-3">
              <div className="flex items-center gap-3 rounded-md bg-bg p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-muted text-accent">
                  <BookCheck size={18} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm text-ink-muted">الدروس المنجزة</dt>
                  <dd className="font-heading tnum text-xl font-extrabold text-ink">
                    {completedLessons} <span className="text-sm font-semibold text-ink-muted">/ {totalLessons}</span>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-bg p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-plum-muted text-plum">
                  <Languages size={18} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm text-ink-muted">المفردات المراجَعة</dt>
                  <dd className="font-heading tnum text-xl font-extrabold text-ink">
                    {knownWords} <span className="text-sm font-semibold text-ink-muted">/ {allWords}</span>
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          <section aria-labelledby="placement-title" className="space-y-3 rounded-lg bg-primary-container p-5 text-on-primary-container shadow-md">
            <ClipboardCheck size={22} aria-hidden="true" />
            <h2 id="placement-title" className="text-lg font-bold">
              هل لديك معرفة سابقة بالألمانية؟
            </h2>
            <p className="text-sm leading-7">اختبر نفسك بأسئلة من منهج المنصة، ونقترح عليك المستوى المناسب للبدء منه.</p>
            <Link
              to="/placement-test"
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-on-primary-container px-5 font-semibold text-primary-container transition-transform active:scale-[0.98]"
            >
              ابدأ اختبار تحديد المستوى
            </Link>
          </section>
        </aside>
      </div>
    </div>
  )
}
