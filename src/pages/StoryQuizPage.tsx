import { ArrowLeft, ArrowRight, ClipboardCheck, Keyboard } from 'lucide-react'
import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { Badge } from '@/components/ui'
import { formatPercent } from '@/features/dictation/format'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { LevelMark } from '@/features/levels/LevelMark'
import { getAllVocabulary } from '@/lib/curriculum'
import { getStoriesForLevel, getStory } from '@/lib/stories'
import { buildStoryQuiz } from '@/lib/storyQuiz'
import { selectStoryQuizProgress, useStoryQuizStore } from '@/store/storyQuizStore'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Story } from '@/types'

/** A comprehension test built from one text or conversation. Route: /levels/:level/texts/:itemId/quiz */
export default function StoryQuizPage() {
  const { level, itemId } = useParams<{ level: string; itemId: string }>()
  const normalizedLevel = level?.toUpperCase() as CEFRLevel | undefined

  if (!normalizedLevel || !CEFR_LEVELS.includes(normalizedLevel)) return <Navigate to="/levels" replace />

  const story = itemId ? getStory(normalizedLevel, itemId) : undefined
  if (!story) return <Navigate to={`/levels/${normalizedLevel.toLowerCase()}?tab=stories`} replace />

  // Keyed by story so moving to another text starts a fresh quiz.
  return <StoryQuiz key={story.id} story={story} />
}

function StoryQuiz({ story }: { story: Story }) {
  const recordRun = useStoryQuizStore((store) => store.recordRun)
  const best = useStoryQuizStore(selectStoryQuizProgress(story.id))

  const exercises = useMemo(
    () => buildStoryQuiz(story, { pool: getStoriesForLevel(story.level), vocabulary: getAllVocabulary() }),
    [story],
  )

  const base = `/levels/${story.level.toLowerCase()}/texts/${story.id}`
  const stories = getStoriesForLevel(story.level)
  const next = stories[stories.findIndex((candidate) => candidate.id === story.id) + 1]

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-4">
      <header dir="ltr" className="space-y-3">
        <Link to={base} className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink">
          <ArrowLeft size={16} aria-hidden="true" />
          <span dir="rtl">العودة إلى النص</span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 lang="de" className="display-de text-start text-2xl font-semibold text-ink [overflow-wrap:anywhere] sm:text-3xl">
            {story.titleDe}
          </h1>
          <LevelMark level={story.level} size="sm" />
          <Badge tone="accent">
            <ClipboardCheck size={12} aria-hidden="true" />
            <span dir="rtl">اختبار</span>
          </Badge>
        </div>
      </header>

      <p dir="rtl" className="text-ink-muted">
        <span className="tnum font-semibold text-ink">{exercises.length}</span> أسئلة من هذا {story.kind === 'dialogue' ? 'الحوار' : 'النص'}: استماع، وترتيب،
        وملء فراغات، وفهم.
        {best ? (
          <>
            {' '}
            أفضل نتيجة لك: <span className="tnum font-semibold text-ink">{formatPercent(best.bestAccuracy)}</span>.
          </>
        ) : null}
      </p>

      <ExerciseRunner exercises={exercises} onComplete={(accuracy) => recordRun({ storyId: story.id, level: story.level, accuracy })} />

      <nav dir="rtl" aria-label="بعد الاختبار" className="flex flex-wrap items-center justify-center gap-3 border-t border-border pt-5">
        <Link to={`${base}/diktat`} className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border-strong px-5 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-surface-sunken">
          <Keyboard size={18} aria-hidden="true" />
          جرّب الإملاء
        </Link>
        {next ? (
          <Link
            to={`/levels/${next.level.toLowerCase()}/texts/${next.id}/quiz`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border-strong px-5 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-surface-sunken"
          >
            اختبار النص التالي
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
        ) : null}
        <Link to={base} className="inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-[0.95rem] font-semibold text-ink-muted transition-colors hover:text-ink">
          <ArrowRight size={18} aria-hidden="true" />
          اقرأ النص مرة أخرى
        </Link>
      </nav>
    </div>
  )
}
