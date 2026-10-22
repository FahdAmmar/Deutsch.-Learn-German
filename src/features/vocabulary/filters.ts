import type { GermanArticle, VocabularyItem } from '@/types'

export type ArticleFilter = 'all' | GermanArticle | 'none'
export type StatusFilter = 'all' | 'saved' | 'new'
export type VocabularySort = 'lesson' | 'alphabetical'

export interface VocabularyFilters {
  query: string
  category: string
  /** `none` matches words without an article (verbs, adjectives, phrases…). */
  article: ArticleFilter
  /** `saved`: added to review by hand. `new`: not taught by a completed lesson yet and not saved. */
  status: StatusFilter
  sort: VocabularySort
}

export const DEFAULT_FILTERS: VocabularyFilters = { query: '', category: 'all', article: 'all', status: 'all', sort: 'lesson' }

interface FilterContext {
  /** Words from lessons the learner has completed. */
  learnedIds: ReadonlySet<string>
  /** Words the learner added to review by hand. */
  savedIds: ReadonlySet<string>
}

/** Narrows and orders a level's vocabulary. Pure, so the rules are testable without rendering. */
export function filterVocabulary(
  items: readonly VocabularyItem[],
  filters: VocabularyFilters,
  { learnedIds, savedIds }: FilterContext,
): VocabularyItem[] {
  const query = filters.query.trim().toLowerCase()

  const matches = items.filter((item) => {
    if (filters.category !== 'all' && item.category !== filters.category) return false
    if (filters.article === 'none' ? item.article !== undefined : filters.article !== 'all' && item.article !== filters.article) return false
    if (filters.status === 'saved' && !savedIds.has(item.id)) return false
    if (filters.status === 'new' && (learnedIds.has(item.id) || savedIds.has(item.id))) return false
    if (query && !item.word.toLowerCase().includes(query) && !item.meaningAr.includes(query)) return false
    return true
  })

  return filters.sort === 'alphabetical' ? [...matches].sort((a, b) => a.word.localeCompare(b.word, 'de')) : matches
}
