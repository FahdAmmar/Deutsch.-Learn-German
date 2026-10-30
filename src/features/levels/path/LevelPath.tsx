import type { ChapterProgress, ResolvedChapter } from '@/lib/learningPath'

import { ChapterIndex } from './ChapterIndex'
import { ChapterSection } from './ChapterSection'

interface LevelPathProps {
  chapters: readonly ResolvedChapter[]
  progress: readonly ChapterProgress[]
  completedLessonIds: ReadonlySet<string>
  resumeLessonId?: string
}

/** A level as an ordered path of chapters: an index beside (or above) the chapters themselves. */
export function LevelPath({ chapters, progress, completedLessonIds, resumeLessonId }: LevelPathProps) {
  return (
    <div dir="rtl" className="grid grid-cols-1 gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
      <ChapterIndex chapters={chapters} progress={progress} />
      <div className="space-y-12">
        {chapters.map((entry, index) => (
          <ChapterSection
            key={entry.chapter.id}
            number={index + 1}
            entry={entry}
            progress={progress[index]}
            completedLessonIds={completedLessonIds}
            resumeLessonId={resumeLessonId}
          />
        ))}
      </div>
    </div>
  )
}
