import { Pause, Play } from 'lucide-react'
import { useMemo } from 'react'

import { cn } from '@/lib/cn'
import type { Story } from '@/types'

import { waveformHeights } from './waveform'

const BAR_COUNT = 56

interface StoryCoverProps {
  story: Story
  /** 0–1 playback progress; bars up to this point are drawn in the accent colour. */
  progress: number
  playing: boolean
  disabled: boolean
  onTogglePlay: () => void
}

/**
 * The hero of a story page: a large play button over the story's illustration.
 * Stories without an illustration get a waveform that fills in as the audio
 * plays — so the cover doubles as a progress display and needs no artwork.
 */
export function StoryCover({ story, progress, playing, disabled, onTogglePlay }: StoryCoverProps) {
  const heights = useMemo(() => waveformHeights(story.id, BAR_COUNT), [story.id])

  return (
    <div className="relative isolate h-44 overflow-hidden rounded-xl border border-border bg-surface-sunken sm:h-60">
      {story.image ? (
        <img src={story.image.src} alt={story.image.alt} className="h-full w-full object-cover" />
      ) : (
        <div aria-hidden="true" className="flex h-full items-center gap-[3px] px-5 sm:gap-1 sm:px-8">
          {heights.map((height, index) => (
            <span
              key={index}
              className={cn(
                'flex-1 rounded-full transition-colors duration-300',
                index / BAR_COUNT < progress ? 'bg-accent-vivid' : 'bg-border-strong',
              )}
              style={{ height: `${Math.round(height * 78)}%` }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 grid place-items-center">
        <button
          type="button"
          onClick={onTogglePlay}
          disabled={disabled}
          aria-label={playing ? 'إيقاف مؤقت' : 'تشغيل الصوت'}
          className="grid size-[4.5rem] place-items-center rounded-full border border-border bg-surface/95 text-accent shadow-md transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
        >
          {playing ? <Pause size={30} fill="currentColor" aria-hidden="true" /> : <Play size={30} fill="currentColor" className="translate-x-0.5" aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
