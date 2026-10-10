import { Languages, Pause, Play, Rabbit, RotateCcw, Turtle } from 'lucide-react'

import { cn } from '@/lib/cn'
import type { StoryPlayer } from '@/hooks/useStoryPlayer'

import { formatSpeed, nextSpeed } from './speedPresets'

interface AudioPlayerBarProps {
  player: StoryPlayer
  /** Number of audio segments (sentences or lines). */
  total: number
  showTranslations: boolean
  onToggleTranslations: () => void
}

const iconButton =
  'grid size-10 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink disabled:pointer-events-none disabled:opacity-45'

/**
 * The floating audio bar: play/pause, a seek bar over the story's sentences,
 * replay, speed, and the Arabic-translation switch. Laid out left-to-right
 * like any media player, since the progress it shows follows the German text.
 */
export function AudioPlayerBar({ player, total, showTranslations, onToggleTranslations }: AudioPlayerBarProps) {
  const playing = player.status === 'playing'
  const percent = Math.round(player.progress * 1000) / 10
  const SpeedIcon = player.rate > 1 ? Rabbit : Turtle

  return (
    <div
      dir="ltr"
      role="group"
      aria-label="مشغّل الصوت"
      className="sticky bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-20 md:bottom-5"
    >
      {!player.isSupported || player.error ? (
        <p dir="rtl" role="status" className="mb-2 rounded-md bg-surface px-3 py-2 text-center text-sm text-error ring-1 ring-border">
          {!player.isSupported ? 'النطق الصوتي غير مدعوم في هذا المتصفح.' : 'تعذّر تشغيل الصوت. جرّب مرة أخرى.'}
        </p>
      ) : null}

      <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/95 p-2 shadow-lg backdrop-blur sm:gap-3 sm:p-2.5">
        <button
          type="button"
          onClick={player.toggle}
          disabled={!player.isSupported}
          aria-label={playing ? 'إيقاف مؤقت' : 'تشغيل'}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-[filter] hover:brightness-110 disabled:pointer-events-none disabled:opacity-45"
        >
          {playing ? <Pause size={20} fill="currentColor" aria-hidden="true" /> : <Play size={20} fill="currentColor" className="translate-x-px" aria-hidden="true" />}
        </button>

        <div className="relative h-11 min-w-0 flex-1 rounded-md has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent">
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-border-strong/60" />
          <div
            className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
          <div
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-[3px] ring-surface transition-[left] duration-300"
            style={{ left: `${percent}%` }}
          />
          <input
            type="range"
            min={0}
            max={Math.max(0, total - 1)}
            step={1}
            value={player.index}
            onChange={(event) => player.seek(Number(event.target.value))}
            disabled={total <= 1}
            aria-label="التنقّل بين الجمل"
            aria-valuetext={`الجملة ${player.index + 1} من ${total}`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-default"
          />
        </div>

        <button type="button" onClick={player.replay} disabled={!player.isSupported} aria-label="إعادة من البداية" className={iconButton}>
          <RotateCcw size={18} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => player.setRate(nextSpeed(player.rate))}
          aria-label={`سرعة القراءة ${formatSpeed(player.rate)}. اضغط للتغيير`}
          className="tnum inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-surface-sunken px-2.5 text-sm font-semibold text-ink transition-colors hover:bg-border sm:px-3"
        >
          <SpeedIcon size={16} className="text-accent" aria-hidden="true" />
          {formatSpeed(player.rate)}
        </button>

        <button
          type="button"
          onClick={onToggleTranslations}
          aria-pressed={showTranslations}
          aria-label="الترجمة العربية"
          title={showTranslations ? 'إخفاء الترجمة العربية' : 'إظهار الترجمة العربية'}
          className={cn(iconButton, showTranslations && 'bg-accent-muted text-accent hover:bg-accent-muted hover:text-accent')}
        >
          <Languages size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
