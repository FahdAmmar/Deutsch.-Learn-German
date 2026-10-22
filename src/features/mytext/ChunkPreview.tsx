import { Scissors, Volume2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { EmptyState } from '@/components/ui'
import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import { countWords } from '@/lib/myText/split'

interface ChunkPreviewProps {
  chunks: readonly string[]
}

/**
 * The text as the parts it will be typed in. Each part can be heard on its
 * own, so the learner can read and listen to the text piece by piece — the
 * short bar under each part shows how long it is next to the others.
 */
export function ChunkPreview({ chunks }: ChunkPreviewProps) {
  const { speak, stop, isSpeaking, isSupported } = useSpeech()
  const [active, setActive] = useState<number | null>(null)
  const playing = isSpeaking ? active : null

  const counts = useMemo(() => chunks.map(countWords), [chunks])
  const longest = Math.max(1, ...counts)
  const totalWords = counts.reduce((sum, count) => sum + count, 0)

  // Leaving the page silences whatever is being read.
  useEffect(() => () => stop(), [stop])

  const listen = (index: number) => {
    setActive(index)
    speak(chunks[index])
  }

  return (
    <section aria-label="معاينة المقاطع" className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface">
      <header dir="rtl" className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <h2 className="font-bold text-ink">المقاطع</h2>
        <p className="tnum text-sm text-ink-muted">
          {chunks.length} مقطع · {totalWords} كلمة
        </p>
      </header>

      {chunks.length === 0 ? (
        <EmptyState icon={Scissors} title="ستظهر المقاطع هنا" className="rounded-none">
          اكتب النص الألماني أو الصقه، وسيُقسَّم تلقائيًا بحسب الطريقة التي تختارها.
        </EmptyState>
      ) : (
        <ol dir="ltr" className="divide-y divide-border">
          {chunks.map((chunk, index) => (
            <li key={`${index}-${chunk}`} className={cn('flex items-start gap-3 px-5 py-3.5 transition-colors', playing === index && 'bg-accent-muted')}>
              <span className="tnum mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-surface-sunken text-xs font-bold text-ink-muted">{index + 1}</span>
              <div className="min-w-0 flex-1 space-y-2">
                <p lang="de" className="display-de text-start text-lg leading-snug font-medium text-ink [overflow-wrap:anywhere]">
                  {chunk}
                </p>
                <div aria-hidden="true" className="h-1 rounded-full bg-surface-sunken">
                  <div className="h-full rounded-full bg-accent/70" style={{ width: `${(counts[index] / longest) * 100}%` }} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => listen(index)}
                disabled={!isSupported}
                aria-label={`استمع إلى المقطع ${index + 1}`}
                className="grid size-10 shrink-0 place-items-center rounded-md text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink disabled:pointer-events-none disabled:opacity-45"
              >
                <Volume2 size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
