import { Clock, MessagesSquare, Play, BookOpenText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui'
import type { Story } from '@/types'

import { categoryTone } from '@/features/reading/categoryTone'

interface StoryCardProps {
  story: Story
}

/** A story in the level's list: a link to its page, with an audio cue. */
export function StoryCard({ story }: StoryCardProps) {
  const isReading = story.kind === 'reading'
  const lineCount = story.segments.length

  return (
    <Link
      to={`/levels/${story.level.toLowerCase()}/texts/${story.id}`}
      className="group flex h-full items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-strong sm:p-5"
    >
      <span
        aria-hidden="true"
        className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-muted text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground"
      >
        <Play size={20} fill="currentColor" className="translate-x-px" />
      </span>

      <span className="min-w-0 flex-1 space-y-2">
        <span dir="ltr" lang="de" className="display-de block text-end text-xl font-semibold text-ink [overflow-wrap:anywhere]">
          {story.titleDe}
        </span>
        <span dir="rtl" className="block font-semibold text-ink-muted">
          {story.titleAr}
        </span>
        <span dir="rtl" className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <Badge tone={isReading ? categoryTone(story.category ?? '') : story.register === 'formal' ? 'primary' : 'neutral'}>
            {isReading ? <BookOpenText size={12} aria-hidden="true" /> : <MessagesSquare size={12} aria-hidden="true" />}
            {isReading ? story.category : story.register === 'formal' ? 'أسلوب رسمي' : 'أسلوب غير رسمي'}
          </Badge>
          <span className="flex items-center gap-1.5 text-xs text-ink-muted">
            {isReading ? (
              <>
                <Clock size={13} aria-hidden="true" />
                <span className="tnum">{story.estimatedMinutes}</span> دقائق
              </>
            ) : (
              <>
                <span className="tnum">{lineCount}</span> جمل
              </>
            )}
          </span>
        </span>
      </span>
    </Link>
  )
}
