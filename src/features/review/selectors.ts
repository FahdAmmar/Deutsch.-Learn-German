import { getLessonById, getVocabularyById } from '@/lib/curriculum'
import { isDue } from '@/lib/srs'
import type { ProgressState, VocabularyItem } from '@/types'

/**
 * All vocabulary the learner has actually been taught — i.e. every word
 * from every lesson they've completed — deduplicated. This is the pool
 * spaced repetition draws from; a word never becomes reviewable just
 * because it exists somewhere in the curriculum.
 */
export function getReviewableVocabulary(
  progress: Pick<ProgressState, 'lessons'> & Partial<Pick<ProgressState, 'savedVocabularyIds'>>,
): VocabularyItem[] {
  const completedLessonIds = Object.values(progress.lessons)
    .filter((entry) => entry.completed)
    .map((entry) => entry.lessonId)

  const seen = new Map<string, VocabularyItem>()
  for (const lessonId of completedLessonIds) {
    const lesson = getLessonById(lessonId)
    if (!lesson) continue
    for (const item of lesson.vocabulary) {
      seen.set(item.id, item)
    }
  }
  // Words the learner added by hand are reviewable even if their lesson is not finished yet.
  for (const id of progress.savedVocabularyIds ?? []) {
    const item = getVocabularyById(id)
    if (item) seen.set(item.id, item)
  }
  return Array.from(seen.values())
}

/**
 * The subset of reviewable vocabulary due right now: either never
 * reviewed (new) or past its scheduled Leitner review date.
 */
export function getDueVocabulary(
  progress: Pick<ProgressState, 'lessons' | 'vocabulary'> & Partial<Pick<ProgressState, 'savedVocabularyIds'>>,
  limit?: number,
): VocabularyItem[] {
  const due = getReviewableVocabulary(progress).filter((item) =>
    isDue(progress.vocabulary[item.id]?.nextReviewAt),
  )
  return typeof limit === 'number' ? due.slice(0, limit) : due
}
