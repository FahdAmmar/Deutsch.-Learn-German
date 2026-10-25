import { useMemo } from 'react'

import { findGrammarHints } from '@/lib/grammarHints'
import { lookupNounArticle } from '@/lib/nounArticles'
import { useSettingsStore } from '@/store/settingsStore'
import type { GrammarHint } from '@/types'

const NONE: readonly GrammarHint[] = []

/** Whether the learner wants grammar hints (on unless switched off in the settings). */
export function useGrammarHintsEnabled(): boolean {
  return useSettingsStore((state) => state.settings.showGrammarHints ?? true)
}

/** The grammar hints of a German sentence — none when the learner has switched them off. */
export function useGrammarHints(text: string): readonly GrammarHint[] {
  const enabled = useGrammarHintsEnabled()
  return useMemo(() => (enabled ? findGrammarHints(text, lookupNounArticle) : NONE), [enabled, text])
}
