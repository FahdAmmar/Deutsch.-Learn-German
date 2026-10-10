import { useEffect, useState } from 'react'

import { loadGrammarRule } from '@/lib/grammarRoadmap'
import type { GrammarRule } from '@/types'

export type GrammarRuleState =
  | { status: 'loading' }
  | { status: 'ready'; rule: GrammarRule }
  | { status: 'unavailable' }

/**
 * Loads a rule's content chunk on demand. `unavailable` covers both
 * "not authored yet" and "chunk failed to load" — the page shows the same
 * calm fallback for either instead of crashing.
 */
export function useGrammarRule(number: number | undefined): GrammarRuleState {
  const [loaded, setLoaded] = useState<{ number: number; rule: GrammarRule | null } | null>(null)

  useEffect(() => {
    if (number === undefined) return
    let cancelled = false
    loadGrammarRule(number).then((rule) => {
      if (!cancelled) setLoaded({ number, rule })
    })
    return () => {
      cancelled = true
    }
  }, [number])

  if (number === undefined) return { status: 'unavailable' }
  if (!loaded || loaded.number !== number) return { status: 'loading' }
  return loaded.rule ? { status: 'ready', rule: loaded.rule } : { status: 'unavailable' }
}
