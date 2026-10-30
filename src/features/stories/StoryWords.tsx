import { BookmarkCheck, BookmarkPlus, Check } from 'lucide-react'
import { useMemo } from 'react'

import { ArticleText, Button } from '@/components/ui'
import { getAllVocabulary } from '@/lib/curriculum'
import { findStoryWords } from '@/lib/storyWords'
import { getReviewableVocabulary } from '@/features/review/selectors'
import { useProgressStore } from '@/store/progressStore'
import type { Story } from '@/types'

interface StoryWordsProps {
  story: Story
}

/**
 * The curriculum words that occur in this text, each with a button that puts it into spaced review.
 * Words from a lesson the learner has completed are already reviewed, and are marked as such.
 */
export function StoryWords({ story }: StoryWordsProps) {
  const lessons = useProgressStore((state) => state.lessons)
  const savedVocabularyIds = useProgressStore((state) => state.savedVocabularyIds)
  const toggleSavedVocabulary = useProgressStore((state) => state.toggleSavedVocabulary)
  const saveVocabulary = useProgressStore((state) => state.saveVocabulary)

  const words = useMemo(() => findStoryWords(story.segments.map((segment) => segment.text), getAllVocabulary()), [story])
  const saved = useMemo(() => new Set(savedVocabularyIds ?? []), [savedVocabularyIds])
  const reviewed = useMemo(() => new Set(getReviewableVocabulary({ lessons, savedVocabularyIds }).map((item) => item.id)), [lessons, savedVocabularyIds])

  if (words.length === 0) return null

  const isReviewed = (ids: readonly string[]) => ids.some((id) => reviewed.has(id))
  const isSaved = (ids: readonly string[]) => ids.some((id) => saved.has(id))
  const addable = words.filter((word) => !isReviewed(word.ids))

  return (
    <section dir="rtl" aria-labelledby="story-words-title" className="space-y-4 rounded-lg border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 id="story-words-title" className="font-display text-xl font-semibold text-ink">
            كلمات هذا النص <span className="tnum text-ink-muted">({words.length})</span>
          </h2>
          <p className="text-sm text-ink-muted">كلمات من مفردات المنهج وردت في النص. أضف ما تريد حفظه إلى المراجعة المتباعدة.</p>
        </div>
        {addable.length > 0 ? (
          <Button size="sm" variant="outline" icon={<BookmarkPlus size={16} aria-hidden="true" />} onClick={() => saveVocabulary(addable.map((word) => word.ids[0]))}>
            أضف الكل <span className="tnum">({addable.length})</span>
          </Button>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-success">
            <Check size={16} aria-hidden="true" />
            كل كلمات النص في مراجعتك
          </span>
        )}
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {words.map((word) => {
          const inReview = isReviewed(word.ids)
          const manually = isSaved(word.ids)
          return (
            <li key={word.item.id} className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-sunken px-3.5 py-2.5">
              <div className="min-w-0 space-y-0.5">
                <p lang="de" dir="ltr" className="text-start text-base font-semibold text-ink [overflow-wrap:anywhere]">
                  <ArticleText text={word.item.article ? `${word.item.article} ${word.item.word}` : word.item.word} />
                  {word.item.plural ? <span className="ms-2 text-sm font-normal text-ink-muted">· {word.item.plural}</span> : null}
                </p>
                <p className="text-sm text-ink-muted">{word.item.meaningAr}</p>
              </div>
              {inReview && !manually ? (
                <span className="shrink-0 text-xs font-semibold text-success">في مراجعتك</span>
              ) : (
                <button
                  type="button"
                  aria-pressed={manually}
                  aria-label={manually ? `إزالة ${word.item.word} من المراجعة` : `إضافة ${word.item.word} إلى المراجعة`}
                  onClick={() => toggleSavedVocabulary(word.ids[0])}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border-strong text-ink-muted transition-colors hover:bg-surface hover:text-ink aria-pressed:border-accent aria-pressed:bg-accent-muted aria-pressed:text-accent"
                >
                  {manually ? <BookmarkCheck size={18} aria-hidden="true" /> : <BookmarkPlus size={18} aria-hidden="true" />}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
