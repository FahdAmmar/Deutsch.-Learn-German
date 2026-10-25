import { Volume2 } from 'lucide-react'

import { ArticleText, Badge, Card } from '@/components/ui'
import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import type { Dialogue } from '@/types'

interface DialogueDisplayProps {
  dialogue: Dialogue
}

export function DialogueDisplay({ dialogue }: DialogueDisplayProps) {
  return (
    <Card>
      <div dir="rtl" className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <h3 className="font-sans text-base font-bold text-ink">{dialogue.titleAr}</h3>
        <Badge>{dialogue.register === 'formal' ? 'أسلوب رسمي' : 'أسلوب غير رسمي'}</Badge>
      </div>

      <ol className="space-y-3 p-4 sm:p-5">
        {dialogue.lines.map((line, index) => (
          <DialogueBubble key={index} line={line} />
        ))}
      </ol>
    </Card>
  )
}

function DialogueBubble({ line }: { line: Dialogue['lines'][number] }) {
  const { speak, isSpeaking } = useSpeech()
  const isA = line.speaker === 'a'

  return (
    // Speaker A sits at the reading start, speaker B at the end, like a chat.
    <li className={cn('flex', isA ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'max-w-[88%] space-y-1 rounded-lg px-4 py-3',
          isA ? 'rounded-ss-sm bg-surface-sunken' : 'rounded-se-sm bg-accent-muted',
        )}
      >
        <p dir="rtl" className="text-sm font-semibold text-ink-muted">
          {line.name}
        </p>
        <button
          type="button"
          dir="ltr"
          lang="de"
          onClick={() => speak(line.de, GERMAN_LOCALE)}
          aria-label={`الاستماع إلى: ${line.de}`}
          className="display-de inline-flex items-start gap-2 text-start text-[1.05rem] font-medium text-ink hover:text-accent"
        >
          <Volume2 size={16} className={cn('mt-1 shrink-0 text-accent', isSpeaking && 'animate-pulse')} aria-hidden="true" />
          <span>
            <ArticleText text={line.de} />
          </span>
        </button>
        <p dir="rtl" className="text-[0.95rem] leading-7 text-ink-muted">
          {line.ar}
        </p>
      </div>
    </li>
  )
}
