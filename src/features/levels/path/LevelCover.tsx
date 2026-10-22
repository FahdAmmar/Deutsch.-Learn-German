import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button, ProgressBar } from '@/components/ui'
import type { ChapterProgress, ResolvedChapter } from '@/lib/learningPath'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel, Lesson } from '@/types'
import { CHAPTER_FORMS, formatCountAr, LESSON_FORMS } from '@/utils/arabicCount'

import { LevelMark } from '../LevelMark'
import { LEVEL_STYLE } from '../levelTone'

interface LevelCoverProps {
  level: CEFRLevel
  chapters: readonly ResolvedChapter[]
  progress: readonly ChapterProgress[]
  totalLessons: number
  completedLessons: number
  /** First unfinished lesson on the path, if any. */
  nextLesson?: Lesson
}

/** Top of a level page: what the level is, one progress segment per chapter, and the way back in. */
export function LevelCover({ level, chapters, progress, totalLessons, completedLessons, nextLesson }: LevelCoverProps) {
  const info = CEFR_LEVEL_INFO[level]

  return (
    <header dir="rtl" className="space-y-5">
      <div className="flex items-start gap-4">
        <LevelMark level={level} size="lg" />
        <div className="min-w-0 space-y-1">
          <h1 className="text-[1.9rem] leading-tight font-bold text-ink sm:text-4xl">{info.titleAr}</h1>
          <p lang="de" dir="ltr" className="display-de text-end text-lg font-normal text-ink-muted">
            {info.titleDe}
          </p>
        </div>
      </div>

      {totalLessons > 0 ? (
        <div className="space-y-4">
          <div className="max-w-2xl space-y-2">
            <ol aria-label="تقدّم فصول المستوى" className="flex gap-1.5">
              {chapters.map(({ chapter }, index) => (
                <li key={chapter.id} className="min-w-0 flex-1">
                  <ProgressBar
                    value={progress[index].ratio}
                    tone={progress[index].state === 'done' ? 'success' : LEVEL_STYLE[level].tone}
                    label={`الفصل ${index + 1}: ${chapter.titleAr}`}
                  />
                </li>
              ))}
            </ol>
            <p className="tnum text-sm text-ink-muted">
              أكملت {completedLessons} من {formatCountAr(totalLessons, LESSON_FORMS)} في {formatCountAr(chapters.length, CHAPTER_FORMS)}
            </p>
          </div>

          {nextLesson ? (
            <Link to={`/lessons/${nextLesson.level.toLowerCase()}/${nextLesson.slug}`} className="inline-block">
              <Button icon={<ArrowLeft size={17} aria-hidden="true" />} iconPosition="end">
                {completedLessons > 0 ? 'تابع من حيث توقفت' : 'ابدأ أول درس'}
              </Button>
            </Link>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
