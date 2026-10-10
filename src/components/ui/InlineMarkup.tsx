import { cn } from '@/lib/cn'
import { parseRichText, splitQuotedLatin } from '@/lib/richText'

interface InlineMarkupProps {
  text: string
  /** How `**bold**` segments are drawn: plain emphasis, or a tinted highlight. */
  boldAs?: 'strong' | 'mark'
  /** Classes for highlighted (`mark`) segments — supplied by the caller so this primitive stays colour-agnostic. */
  markClassName?: string
}

/**
 * Renders the inline markup from `lib/richText.ts` (`**bold**`, `[[Deutsch]]`)
 * as React nodes. Never uses `dangerouslySetInnerHTML`, so authored content
 * cannot inject markup. Text with no markup renders as a single span, so it
 * is safe to use for any content string. Quoted German inside Arabic prose is
 * isolated as LTR automatically, so use this (not a bare `{string}`) for any
 * Arabic prose that may quote German.
 */
export function InlineMarkup({ text, boldAs = 'strong', markClassName }: InlineMarkupProps) {
  return (
    <>
      {parseRichText(text).map((segment, index) => {
        if (segment.type === 'text') {
          // Quoted German inside Arabic prose is isolated as LTR so its closing
          // quote and full stop stay attached to the sentence (see richText.ts).
          return (
            <span key={index}>
              {splitQuotedLatin(segment.text).map((part, partIndex) =>
                part.type === 'quote' ? (
                  <bdi key={partIndex} lang="de" dir="ltr" className="font-de">
                    {part.text}
                  </bdi>
                ) : (
                  part.text
                ),
              )}
            </span>
          )
        }

        if (segment.type === 'de') {
          return (
            <span key={index} lang="de" dir="ltr" className="font-de font-semibold">
              {segment.text}
            </span>
          )
        }

        if (boldAs === 'mark') {
          return (
            <mark key={index} className={cn('rounded-sm bg-transparent px-1 font-bold', markClassName)}>
              {segment.text}
            </mark>
          )
        }

        return (
          <strong key={index} className="font-bold text-ink">
            {segment.text}
          </strong>
        )
      })}
    </>
  )
}
