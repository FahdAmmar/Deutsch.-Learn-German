import { Clock, Square, Volume2, VolumeX } from 'lucide-react'

import { Badge, Button, Card, CardBody, CardHeader } from '@/components/ui'
import { cn } from '@/lib/cn'
import { useSpeech } from '@/hooks/useSpeech'
import type { ReadingParagraph, ReadingText } from '@/types'

import { categoryTone } from './categoryTone'

interface ReadingTextCardProps {
  text: ReadingText
}

/**
 * A standalone bilingual reading passage: German paragraphs, each paired
 * with its Arabic explanation directly below, plus audio for both the
 * whole text and each individual paragraph (via the shared speech
 * service — see `@/services/speech`).
 */
export function ReadingTextCard({ text }: ReadingTextCardProps) {
  const { speak, stop, isSpeaking, isSupported, error } = useSpeech()
  const fullGermanText = text.paragraphs.map((paragraph) => paragraph.de).join(' ')

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 dir="ltr" lang="de" className="display-de text-start text-2xl font-semibold text-ink">
              {text.titleDe}
            </h3>
            <p dir="rtl" className="font-semibold text-ink-muted">
              {text.titleAr}
            </p>
          </div>
          <Badge tone={categoryTone(text.category)}>{text.category}</Badge>
        </div>

        <div dir="rtl" className="flex flex-wrap items-center gap-3">
          <span className="tnum flex items-center gap-1.5 text-sm text-ink-muted">
            <Clock size={14} aria-hidden="true" />
            {text.estimatedMinutes} دقيقة تقريباً
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => (isSpeaking ? stop() : speak(fullGermanText))}
            disabled={!isSupported}
            icon={
              isSpeaking ? (
                <Square size={14} aria-hidden="true" />
              ) : isSupported ? (
                <Volume2 size={14} aria-hidden="true" />
              ) : (
                <VolumeX size={14} aria-hidden="true" />
              )
            }
          >
            {isSpeaking ? 'إيقاف' : 'الاستماع للنص كاملاً'}
          </Button>
        </div>
        {error ? (
          <p dir="rtl" className="text-xs text-error">
            تعذّر تشغيل الصوت
          </p>
        ) : null}
      </CardHeader>

      <CardBody className="space-y-3">
        {text.paragraphs.map((paragraph, index) => (
          <ReadingParagraphBlock key={index} paragraph={paragraph} />
        ))}
      </CardBody>
    </Card>
  )
}

function ReadingParagraphBlock({ paragraph }: { paragraph: ReadingParagraph }) {
  const { speak, stop, isSpeaking, isSupported, error } = useSpeech()

  return (
    <div className="space-y-2 rounded-md bg-surface-sunken p-4">
      <div className="flex items-start justify-between gap-3">
        <p dir="ltr" lang="de" className="display-de text-start text-lg leading-8 font-medium text-ink">
          {paragraph.de}
        </p>
        <button
          type="button"
          onClick={() => (isSpeaking ? stop() : speak(paragraph.de))}
          disabled={!isSupported}
          aria-label={isSpeaking ? 'إيقاف القراءة الصوتية' : `الاستماع إلى: ${paragraph.de}`}
          title={isSupported ? 'الاستماع إلى الفقرة' : 'النطق الصوتي غير مدعوم في هذا المتصفح'}
          className={cn(
            'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-accent transition-colors',
            'hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface',
            isSpeaking && 'bg-accent-muted',
          )}
        >
          {isSpeaking ? (
            <Square size={15} aria-hidden="true" />
          ) : isSupported ? (
            <Volume2 size={15} aria-hidden="true" />
          ) : (
            <VolumeX size={15} aria-hidden="true" />
          )}
        </button>
      </div>
      <p dir="rtl" className="text-[0.95rem] leading-8 text-ink-muted">
        {paragraph.ar}
      </p>
      {error ? (
        <p dir="rtl" className="text-xs text-error">
          تعذّر تشغيل الصوت
        </p>
      ) : null}
    </div>
  )
}
