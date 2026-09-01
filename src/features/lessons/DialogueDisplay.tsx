import { Volume2 } from 'lucide-react'

import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import { useSpeech } from '@/hooks/useSpeech'
import type { Dialogue } from '@/types'

interface DialogueDisplayProps {
  dialogue: Dialogue
}

export function DialogueDisplay({ dialogue }: DialogueDisplayProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      <div dir="rtl" className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-ink">{dialogue.titleAr}</h3>
        <span className="rounded-full bg-bg-alt px-3 py-1 text-xs text-ink-muted">
          {dialogue.register === 'formal' ? 'أسلوب رسمي' : 'أسلوب غير رسمي'}
        </span>
      </div>

      <ol className="space-y-3">
        {dialogue.lines.map((line, index) => (
          <DialogueBubble key={index} line={line} />
        ))}
      </ol>
    </div>
  )
}

function DialogueBubble({ line }: { line: Dialogue['lines'][number] }) {
  const { speak, isSpeaking } = useSpeech()
  const isA = line.speaker === 'a'

  return (
    <li className={cn('flex', isA ? 'justify-start' : 'justify-end')}>
      <div className={cn('max-w-[85%] rounded-lg p-3', isA ? 'bg-bg-alt' : 'bg-primary-muted')}>
        <p dir="rtl" className="mb-1 text-xs font-semibold text-ink-muted">
          {line.name}
        </p>
        <button
          type="button"
          dir="ltr"
          onClick={() => speak(line.de, GERMAN_LOCALE)}
          className="inline-flex items-center gap-1.5 font-de text-ink hover:text-primary"
        >
          <Volume2 size={14} className={cn(isSpeaking && 'animate-pulse')} aria-hidden="true" />
          {line.de}
        </button>
        <p dir="rtl" className="mt-1 text-sm text-ink-muted">
          {line.ar}
        </p>
      </div>
    </li>
  )
}
