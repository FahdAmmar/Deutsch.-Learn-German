import { GRAMMAR_ROADMAP } from '@/data/grammar/roadmap'
import { GRAMMAR_RULE_LOADERS } from '@/data/grammar/loaders'
import type { CEFRLevel, GrammarRoadmapEntry, GrammarRule } from '@/types'

/** All roadmap entries in learning order, optionally limited to one level. */
export function getRoadmapEntries(level?: CEFRLevel): GrammarRoadmapEntry[] {
  return level ? GRAMMAR_ROADMAP.filter((entry) => entry.level === level) : [...GRAMMAR_ROADMAP]
}

export function getRoadmapEntry(level: CEFRLevel, slug: string): GrammarRoadmapEntry | undefined {
  return GRAMMAR_ROADMAP.find((entry) => entry.level === level && entry.slug === slug)
}

/** Neighbours in the global roadmap order — they can sit in a different level (e.g. 16 → 17 crosses A1/A2). */
export function getAdjacentEntries(number: number): {
  previous: GrammarRoadmapEntry | undefined
  next: GrammarRoadmapEntry | undefined
} {
  const index = GRAMMAR_ROADMAP.findIndex((entry) => entry.number === number)
  if (index === -1) return { previous: undefined, next: undefined }
  return { previous: GRAMMAR_ROADMAP[index - 1], next: GRAMMAR_ROADMAP[index + 1] }
}

/** A rule is "published" once its content file exists in `data/grammar/rules/`. */
export function isRulePublished(number: number): boolean {
  return GRAMMAR_RULE_LOADERS.has(number)
}

export function getPublishedCount(level?: CEFRLevel): number {
  return getRoadmapEntries(level).filter((entry) => isRulePublished(entry.number)).length
}

export function grammarRulePath(entry: Pick<GrammarRoadmapEntry, 'level' | 'slug'>): string {
  return `/grammar/${entry.level.toLowerCase()}/${entry.slug}`
}

const ruleCache = new Map<number, Promise<GrammarRule | null>>()

/** Loads a rule's content on demand. Resolves `null` when the rule is not authored yet or fails to load. */
export function loadGrammarRule(number: number): Promise<GrammarRule | null> {
  const cached = ruleCache.get(number)
  if (cached) return cached

  const loader = GRAMMAR_RULE_LOADERS.get(number)
  const pending = loader
    ? loader()
        .then((module) => module.default)
        .catch(() => {
          // Don't cache failures — a transient chunk-load error should be retryable.
          ruleCache.delete(number)
          return null
        })
    : Promise.resolve(null)

  ruleCache.set(number, pending)
  return pending
}
