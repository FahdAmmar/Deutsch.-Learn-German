import { Volume2 } from 'lucide-react'

import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import type { RuleTone } from '@/types'

import { RichText } from './RichText'
import { stripMarkup } from '@/lib/richText'

interface SpeakableGermanProps {
  /** German text; `**word**` segments are highlighted, and stripped before speaking. */
  text: string
  tone?: RuleTone
  showIcon?: boolean
  className?: string
}

/**
 * A German phrase that speaks itself on click. Speech goes through the
 * shared speech service (`hooks/useSpeech`), so failures are silent and
 * an unsupported browser simply disables the control.
 */
export function SpeakableGerman({ text, tone, showIcon = true, className }: SpeakableGermanProps) {
  const { speak, isSpeaking, isSupported } = useSpeech()
  const plain = stripMarkup(text)

  return (
    <button
      type="button"
      dir="ltr"
      lang="de"
      disabled={!isSupported}
      onClick={() => speak(plain, GERMAN_LOCALE)}
      aria-label={`الاستماع إلى نطق: ${plain}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm text-start font-de transition-colors',
        'hover:bg-primary-muted disabled:cursor-default disabled:hover:bg-transparent',
        isSpeaking && 'bg-primary-muted',
        className,
      )}
    >
      <span>
        <RichText text={text} boldAs="mark" tone={tone} german />
      </span>
      {showIcon && isSupported ? (
        <Volume2 size={14} aria-hidden="true" className={cn('shrink-0 text-ink-faint', isSpeaking && 'animate-pulse text-primary')} />
      ) : null}
    </button>
  )
}
