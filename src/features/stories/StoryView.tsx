import { ArrowLeft, ClipboardCheck, Clock, Ellipsis, Keyboard, MessagesSquare, BookOpenText } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui'
import { useGrammarHintsEnabled } from '@/features/grammarHints/useGrammarHints'
import { categoryTone } from '@/features/reading/categoryTone'
import { LevelMark } from '@/features/levels/LevelMark'
import { useStoryMediaSession } from '@/hooks/useStoryMediaSession'
import { useStoryPlayer } from '@/hooks/useStoryPlayer'
import { cn } from '@/lib/cn'
import { getLessonById } from '@/lib/curriculum'
import { findGrammarHints } from '@/lib/grammarHints'
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
  useStoryMediaSession(story, player)
  const showTranslations = useSettingsStore((state) => state.settings.showTranslations ?? true)
  const setShowTranslations = useSettingsStore((state) => state.setShowTranslations)
  const hintsEnabled = useGrammarHintsEnabled()
  const setShowGrammarHints = useSettingsStore((state) => state.setShowGrammarHints)
  // The switch is only offered where there is something to switch.
  const hasGrammarHints = useMemo(() => story.segments.some((segment) => findGrammarHints(segment.text).length > 0), [story])
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

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/levels/${story.level.toLowerCase()}/texts/${story.id}/quiz`}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-[0.95rem] font-semibold text-accent-foreground transition-[filter] hover:brightness-110"
          >
            <ClipboardCheck size={18} aria-hidden="true" />
            <span dir="rtl">اختبر نفسك</span>
          </Link>
          <Link
            to={`/levels/${story.level.toLowerCase()}/texts/${story.id}/diktat`}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-5 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-surface-sunken"
          >
            <Keyboard size={18} aria-hidden="true" />
            <span dir="rtl">إملاء حرفًا بحرف</span>
          </Link>
          {hasGrammarHints ? (
            <button
              type="button"
              aria-pressed={hintsEnabled}
              onClick={() => setShowGrammarHints(!hintsEnabled)}
              title={hintsEnabled ? 'إخفاء النقاط التي تشرح القواعد' : 'إظهار النقاط التي تشرح القواعد'}
              className={cn(
                'inline-flex h-11 items-center gap-2 rounded-md border px-5 text-[0.95rem] font-semibold transition-colors',
                hintsEnabled ? 'border-accent bg-accent-muted text-accent' : 'border-border-strong text-ink hover:bg-surface-sunken',
              )}
            >
              <Ellipsis size={18} aria-hidden="true" />
              <span dir="rtl">تلميحات القواعد</span>
            </button>
          ) : null}
        </div>
      </header>

      <StoryCover story={story} progress={player.progress} playing={playing} disabled={!player.isSupported} onTogglePlay={player.toggle} />

      <StoryBody
        story={story}
        currentIndex={player.status === 'idle' ? null : player.index}
        showTranslations={showTranslations}
        range={player.loop === 'range' ? player.range : null}
        onPlayFrom={player.selectSegment}
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
