import { ArrowLeft, Clock, MessagesSquare, BookOpenText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui'
import { categoryTone } from '@/features/reading/categoryTone'
import { LevelMark } from '@/features/levels/LevelMark'
import { useStoryPlayer } from '@/hooks/useStoryPlayer'
import { getLessonById } from '@/lib/curriculum'
import { useSettingsStore } from '@/store/settingsStore'
import type { Story } from '@/types'

import { AudioPlayerBar } from './AudioPlayerBar'
import { StoryBody } from './StoryBody'
import { StoryCover } from './StoryCover'

interface StoryViewProps {
  story: Story
}

/**
 * A text or conversation as a page: title, a cover with a play button, the
 * German text, and a floating audio bar. Laid out left-to-right with the
 * German first; Arabic appears as the subtitle and the translations.
 */
export function StoryView({ story }: StoryViewProps) {
  const player = useStoryPlayer(story.segments)
  const showTranslations = useSettingsStore((state) => state.settings.showTranslations ?? true)
  const setShowTranslations = useSettingsStore((state) => state.setShowTranslations)
  const lesson = story.lessonId ? getLessonById(story.lessonId) : undefined
  const isReading = story.kind === 'reading'
  const playing = player.status === 'playing'

  return (
    <article dir="ltr" className="mx-auto w-full max-w-3xl space-y-8 pb-4">
      <header className="space-y-4">
        <Link
          to={`/levels/${story.level.toLowerCase()}?tab=stories`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span dir="rtl">نصوص ومحادثات {story.level}</span>
        </Link>

        <div className="space-y-2">
          <h1 lang="de" className="display-de text-start text-[2.5rem] leading-[1.1] font-semibold text-ink [overflow-wrap:anywhere] sm:text-6xl">
            {story.titleDe}
          </h1>
          <p dir="rtl" className="text-left font-sans text-xl font-semibold text-ink-muted sm:text-2xl">
            {story.titleAr}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <LevelMark level={story.level} size="sm" />
          <Badge tone={isReading ? categoryTone(story.category ?? '') : story.register === 'formal' ? 'primary' : 'neutral'}>
            {isReading ? <BookOpenText size={12} aria-hidden="true" /> : <MessagesSquare size={12} aria-hidden="true" />}
            <span dir={isReading ? 'ltr' : 'rtl'}>{isReading ? story.category : story.register === 'formal' ? 'أسلوب رسمي' : 'أسلوب غير رسمي'}</span>
          </Badge>
          {isReading ? (
            <span dir="rtl" className="flex items-center gap-1.5 text-sm text-ink-muted">
              <Clock size={15} aria-hidden="true" />
              <span className="tnum">{story.estimatedMinutes}</span> دقائق تقريباً
            </span>
          ) : (
            <span dir="rtl" className="text-sm text-ink-muted">
              محادثة من <span className="tnum">{story.segments.length}</span> جمل
            </span>
          )}
          {lesson ? (
            <Link dir="rtl" to={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`} className="text-sm font-semibold text-accent underline-offset-4 hover:underline">
              من درس: {lesson.titleAr}
            </Link>
          ) : null}
        </div>
      </header>

      <StoryCover story={story} progress={player.progress} playing={playing} disabled={!player.isSupported} onTogglePlay={player.toggle} />

      <StoryBody
        story={story}
        currentIndex={player.status === 'idle' ? null : player.index}
        showTranslations={showTranslations}
        onPlayFrom={player.playFrom}
      />

      <AudioPlayerBar
        player={player}
        total={story.segments.length}
        showTranslations={showTranslations}
        onToggleTranslations={() => setShowTranslations(!showTranslations)}
      />
    </article>
  )
}
