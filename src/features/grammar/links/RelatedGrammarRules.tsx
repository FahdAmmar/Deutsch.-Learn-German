import { BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

import { grammarRulePath, isRulePublished } from '@/lib/grammarRoadmap'
import type { GrammarRoadmapEntry } from '@/types'

interface RelatedGrammarRulesProps {
  rules: readonly GrammarRoadmapEntry[]
}

/** Links from a lesson to the full grammar-section rules it practises. */
export function RelatedGrammarRules({ rules }: RelatedGrammarRulesProps) {
  const published = rules.filter((entry) => isRulePublished(entry.number))
  if (published.length === 0) return null

  return (
    <nav aria-labelledby="related-grammar-heading" dir="rtl" className="space-y-3 rounded-lg bg-surface-sunken p-4">
      <h3 id="related-grammar-heading" className="flex items-center gap-2 font-sans text-base font-bold text-ink">
        <BookOpen size={18} className="text-accent" aria-hidden="true" />
        للتوسّع: الدرس الكامل في قسم القواعد
      </h3>
      <ul className="flex flex-wrap gap-2">
        {published.map((entry) => (
          <li key={entry.number}>
            <Link
              to={grammarRulePath(entry)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span>{entry.titleAr}</span>
              <span dir="ltr" lang="de" className="text-xs font-normal text-ink-muted">
                #{String(entry.number).padStart(2, '0')} · {entry.termDe}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
