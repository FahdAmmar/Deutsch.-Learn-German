import { InlineMarkup } from '@/components/ui'
import type { GermanArticle, GrammarHint } from '@/types'

const GENDER_AR: Record<GermanArticle, string> = { der: 'مذكر', die: 'مؤنث', das: 'محايد' }

interface GrammarHintCardProps {
  hint: GrammarHint
  /** Show the phrase itself above the formula — used when several hints are listed together. */
  showPhrase?: boolean
}

/** One hint, briefly: the formula, the case, the noun's article when known, and the reason in Arabic. */
export function GrammarHintCard({ hint, showPhrase = false }: GrammarHintCardProps) {
  return (
    <div className="space-y-1.5">
      {showPhrase ? (
        <p dir="ltr" lang="de" className="font-de text-[0.95rem] font-semibold text-ink">
          {hint.phrase}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <span dir="ltr" lang="de" className="font-de text-[0.9rem] font-semibold text-ink">
          {hint.formula}
        </span>
        {hint.grammarCase ? (
          <span dir="ltr" className="rounded-sm bg-accent-muted px-1.5 py-0.5 text-xs font-semibold text-accent">
            {hint.grammarCase}
          </span>
        ) : null}
      </div>

      {hint.noun ? (
        <p className="text-sm text-ink-muted">
          <span dir="ltr" lang="de" className="font-de font-semibold text-ink">
            {hint.noun.article} {hint.noun.word}
          </span>{' '}
          ← {GENDER_AR[hint.noun.article]}
        </p>
      ) : null}

      <p className="text-[0.92rem] leading-7 text-ink-muted">
        <InlineMarkup text={hint.noteAr} />
      </p>
    </div>
  )
}
