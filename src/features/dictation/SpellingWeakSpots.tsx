import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui'
import { SPELLING_LABEL_AR, SPELLING_TIP_AR } from '@/lib/dictation/spelling'
import { selectKindCounts, selectWeakWords, useSpellingStore } from '@/store/spellingStore'

import { primaryLinkClass } from './actionClasses'

/**
 * What the learner's dictation mistakes have in common, and the words to go back to. Everything here is
 * read from the record that every finished dictation adds to, so it fills in by itself as they practise.
 */
export function SpellingWeakSpots() {
  // The stored records are stable references; the lists are derived from them, because a selector that builds a
  // new array on every call would make the store think the state changed on every render.
  const kindRecord = useSpellingStore((state) => state.kinds)
  const wordRecord = useSpellingStore((state) => state.words)
  const kinds = useMemo(() => selectKindCounts({ kinds: kindRecord, words: wordRecord }), [kindRecord, wordRecord])
  const words = useMemo(() => selectWeakWords({ kinds: kindRecord, words: wordRecord }), [kindRecord, wordRecord])
  const reset = useSpellingStore((state) => state.resetSpelling)

  if (kinds.length === 0) return null
  const total = kinds.reduce((sum, entry) => sum + entry.count, 0)
  const top = kinds[0]

  return (
    <section
      aria-labelledby="spelling-weak-title"
      dir="rtl"
      className="space-y-5 rounded-xl border border-border bg-surface p-5 sm:p-6"
    >
      <header className="space-y-1">
        <h2 id="spelling-weak-title" className="font-sans text-xl font-bold text-ink">
          نقاط ضعفك الإملائية
        </h2>
        <p className="text-ink-muted">تُحسب من كل إملاء أكملته، في القصص ونصوصك معاً.</p>
      </header>

      <ul className="space-y-3">
        {kinds.slice(0, 4).map(({ kind, count }) => (
          <li key={kind} className="space-y-1">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-ink">{SPELLING_LABEL_AR[kind]}</span>
              <span className="tnum text-sm font-semibold text-ink-muted">{count}</span>
            </div>
            {/* The bar is a share of all mistakes, so the longest one is the pattern that costs most. */}
            <div
              className="h-2 overflow-hidden rounded-full bg-surface-sunken"
              role="img"
              aria-label={`${Math.round((count / total) * 100)}٪ من أخطائك`}
            >
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${Math.max(4, (count / total) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="rounded-md border border-border p-3 text-sm leading-7 text-ink-muted">
        {SPELLING_TIP_AR[top.kind]}
      </p>

      {words.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-ink-muted">كلمات تتعثّر فيها</h3>
          <ul dir="ltr" className="flex flex-wrap gap-2">
            {words.map(({ word, count }) => (
              <li
                key={word}
                lang="de"
                className="display-de flex items-center gap-2 rounded-md bg-error-muted px-3 py-1.5 text-error"
              >
                <span className="text-lg font-semibold">{word}</span>
                <span className="tnum text-sm">×{count}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/my-text/weak-words" className={primaryLinkClass}>
              تدرّب على كلماتي الصعبة
            </Link>
            <Button variant="ghost" onClick={reset}>
              مسح السجل
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
