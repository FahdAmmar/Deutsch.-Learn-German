import { ChevronDown } from 'lucide-react'

import { articleToTone, Badge } from '@/components/ui'
import { GENDER_RULES } from '@/data/genderRules'

/**
 * The gender rules as a reference, grouped by article. A native `<details>` keeps it out of the way until the
 * learner wants it, and works by keyboard without ARIA. Every "mostly" rule says so, with its exceptions.
 */
export function GenderRulesReference() {
  return (
    <details className="group rounded-lg border border-border bg-surface">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 hover:bg-surface-sunken [&::-webkit-details-marker]:hidden">
        <span dir="rtl" className="space-y-0.5">
          <span className="block font-sans text-base font-bold text-ink">قواعد تساعدك على تخمين الأداة</span>
          <span className="block text-sm text-ink-muted">
            النهايات والمعاني التي تدلّ على der أو die أو das، مع استثناءاتها.
          </span>
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="shrink-0 text-ink-faint motion-safe:transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="grid gap-3 border-t border-border p-4 sm:grid-cols-2 xl:grid-cols-3">
        {GENDER_RULES.map((rule) => (
          <article key={rule.id} className="flex flex-col gap-2 rounded-md border border-border p-3">
            <div dir="rtl" className="flex flex-wrap items-center gap-2">
              <Badge tone={articleToTone(rule.article)}>{rule.article}</Badge>
              <Badge tone={rule.strength === 'always' ? 'success' : 'neutral'}>
                {rule.strength === 'always' ? 'دائماً' : 'في الغالب'}
              </Badge>
            </div>
            <h4 dir="rtl" className="text-base font-bold text-ink">
              {rule.titleAr}
            </h4>
            {rule.noteAr ? (
              <p dir="rtl" className="text-sm leading-7 text-ink-muted">
                {rule.noteAr}
              </p>
            ) : null}
            <p dir="ltr" lang="de" className="text-sm text-ink">
              {rule.examples.map((word) => `${rule.article} ${word}`).join(' · ')}
            </p>
            {rule.exceptions.length > 0 ? (
              <p dir="ltr" lang="de" className="text-sm text-ink-faint">
                <span dir="rtl" lang="ar">
                  استثناء:{' '}
                </span>
                {rule.exceptions.map((entry) => `${entry.article} ${entry.word}`).join(' · ')}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </details>
  )
}
