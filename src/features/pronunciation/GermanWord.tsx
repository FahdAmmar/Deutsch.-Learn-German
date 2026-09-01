import { Volume2, VolumeX } from 'lucide-react'

import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import { useSpeech } from '@/hooks/useSpeech'

export interface GermanWordProps {
  /** The German word or short phrase to display and pronounce. */
  word: string
  /** BCP-47 locale to speak with. Defaults to German (de-DE). */
  pronunciation?: string
  size?: 'sm' | 'md' | 'lg'
  /** Show the small speaker icon next to the word. Defaults to true. */
  showIcon?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'text-sm gap-1',
  md: 'text-base gap-1.5',
  lg: 'text-lg gap-1.5',
}

const iconSizes = { sm: 14, md: 16, lg: 18 }

/**
 * Every clickable German word/phrase in the app should go through this
 * component so pronunciation behaves consistently. Always renders
 * dir="ltr" internally so it stays correct even inside Arabic (RTL) text.
 */
export function GermanWord({
  word,
  pronunciation = GERMAN_LOCALE,
  size = 'md',
  showIcon = true,
  className,
}: GermanWordProps) {
  const { speak, isSpeaking, isSupported, error } = useSpeech()

  return (
    <span dir="ltr" className="inline-flex flex-col items-start">
      <button
        type="button"
        onClick={() => speak(word, pronunciation)}
        disabled={!isSupported}
        aria-label={`الاستماع إلى نطق: ${word}`}
        title={isSupported ? 'انقر للاستماع إلى النطق' : 'النطق الصوتي غير مدعوم في هذا المتصفح'}
        className={cn(
          'inline-flex items-center rounded-sm font-medium text-primary',
          'hover:bg-primary-muted disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
          'px-1 -mx-1 transition-colors',
          isSpeaking && 'bg-primary-muted',
          sizeClasses[size],
          className,
        )}
      >
        <span lang="de">{word}</span>
        {showIcon &&
          (isSupported ? (
            <Volume2 size={iconSizes[size]} aria-hidden="true" className={cn(isSpeaking && 'animate-pulse')} />
          ) : (
            <VolumeX size={iconSizes[size]} aria-hidden="true" />
          ))}
      </button>
      {error ? (
        <span dir="rtl" className="text-xs text-error">
          تعذّر تشغيل الصوت
        </span>
      ) : null}
    </span>
  )
}
