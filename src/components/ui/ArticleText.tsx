import { useMemo } from 'react'

import { splitArticleWords } from '@/lib/articleWords'
import type { GermanArticle } from '@/types'

/** Written out in full so Tailwind sees every class. */
const ARTICLE_CLASS: Record<GermanArticle, string> = {
  der: 'text-der',
  die: 'text-die',
  das: 'text-das',
}

interface ArticleTextProps {
  /** German text. Every der / die / das in it is coloured: der blue, die pink, das orange. */
  text: string
}

/**
 * German text with its articles coloured. The words stay in the text, so a screen reader
 * reads the sentence unchanged and the colour only adds to what the word already says.
 */
export function ArticleText({ text }: ArticleTextProps) {
  const parts = useMemo(() => splitArticleWords(text), [text])

  return (
    <>
      {parts.map((part, position) =>
        part.type === 'text' ? (
          part.text
        ) : (
          <span key={position} data-article={part.article} className={`font-semibold ${ARTICLE_CLASS[part.article]}`}>
            {part.text}
          </span>
        ),
      )}
    </>
  )
}
