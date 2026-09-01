import { useState } from 'react'
import { Volume2 } from 'lucide-react'

import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import { useSpeech } from '@/hooks/useSpeech'
import type { DiagramScene } from '@/types'

import { BodyBackground } from './diagram-backgrounds/BodyBackground'
import { RoomBackground } from './diagram-backgrounds/RoomBackground'

interface InteractiveDiagramProps {
  scene: DiagramScene
}

/**
 * A clickable illustration with labeled hotspots. Fully data-driven via
 * `DiagramScene` — the same component renders the "room" scene (rooms &
 * two-way prepositions) and the "body" scene (body parts & dative
 * pronouns); a future lesson can reuse it just by supplying new hotspot
 * data, without touching this component.
 */
export function InteractiveDiagram({ scene }: InteractiveDiagramProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const { speak, isSpeaking } = useSpeech()

  const active = scene.hotspots.find((hotspot) => hotspot.id === activeId)

  function activate(id: string, sentenceDe: string) {
    setActiveId(id)
    speak(sentenceDe, GERMAN_LOCALE)
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-md sm:p-7">
      <p dir="rtl" className="mb-5 text-sm text-ink-muted">
        {scene.promptAr}
      </p>

      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
        {scene.background === 'room' ? (
          <RoomBackground className="absolute inset-0 h-full w-full" />
        ) : (
          <BodyBackground className="absolute inset-0 h-full w-full" />
        )}

        {scene.hotspots.map((hotspot) => {
          const isActive = hotspot.id === activeId
          return (
            <button
              key={hotspot.id}
              type="button"
              onClick={() => activate(hotspot.id, hotspot.sentenceDe)}
              aria-label={`${hotspot.labelAr} — ${hotspot.labelDe}`}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
            >
              {!isActive && (
                <span
                  className="absolute inset-0 -m-1.5 animate-ping rounded-full bg-primary opacity-30 group-hover:hidden"
                  aria-hidden="true"
                />
              )}
              <span
                className={cn(
                  'relative flex h-7 w-7 items-center justify-center rounded-full shadow-md ring-4 ring-surface transition-transform group-hover:scale-110',
                  isActive ? 'scale-110 bg-accent' : 'bg-primary',
                )}
              >
                <span className="h-2 w-2 rounded-full bg-surface" />
              </span>
              <span
                className={cn(
                  'pointer-events-none absolute start-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-de text-xs text-bg opacity-0 shadow-md transition-opacity group-hover:opacity-100',
                  isActive && 'opacity-100',
                )}
              >
                {hotspot.labelDe}
              </span>
            </button>
          )
        })}
      </div>

      <div dir="rtl" className="mt-5 min-h-24 rounded-lg bg-bg-alt p-4 text-center">
        {active ? (
          <>
            <button
              type="button"
              onClick={() => activate(active.id, active.sentenceDe)}
              className="inline-flex items-center gap-2 font-de text-lg font-semibold text-ink hover:text-primary"
              dir="ltr"
            >
              <Volume2 size={16} className={cn(isSpeaking && 'animate-pulse')} aria-hidden="true" />
              {active.sentenceDe}
            </button>
            <p className="mt-2 text-ink-muted">{active.sentenceAr}</p>
          </>
        ) : (
          <p className="text-ink-faint">انقر على أي عنصر في الرسم لسماع الجملة الخاصة به</p>
        )}
      </div>
    </div>
  )
}
