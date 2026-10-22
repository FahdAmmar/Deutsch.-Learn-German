import { getLessonsForLevel, getVocabularyForLevel } from '@/lib/curriculum'
import { getRoadmapEntries, grammarRulePath } from '@/lib/grammarRoadmap'
import { getStoriesForLevel } from '@/lib/stories'
import { CEFR_LEVELS } from '@/types'

export type SearchKind = 'lesson' | 'rule' | 'story' | 'word'

export interface SearchEntry {
  id: string
  kind: SearchKind
  title: string
  titleLanguage: 'de' | 'ar'
  subtitle?: string
  /** Where the entry leads. */
  to: string
  /** Normalised text the query is matched against. */
  haystack: string
}

/**
 * Makes text comparable regardless of how it was typed: case, accents and
 * umlauts (so "madchen" finds "Mädchen"), Arabic vowel marks, and the
 * interchangeable alef / ya / ta-marbuta spellings.
 */
export function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670]/g, '')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .trim()
}

function entry(partial: Omit<SearchEntry, 'haystack'>, ...searchable: (string | undefined)[]): SearchEntry {
  return { ...partial, haystack: normalizeForSearch(searchable.filter(Boolean).join(' ')) }
}

/** Everything searchable, built from the curriculum levels that are loaded. */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = []

  for (const level of CEFR_LEVELS) {
    for (const lesson of getLessonsForLevel(level)) {
      entries.push(
        entry(
          { id: `lesson:${lesson.id}`, kind: 'lesson', title: lesson.titleAr, titleLanguage: 'ar', subtitle: `${level} · ${lesson.title}`, to: `/lessons/${level.toLowerCase()}/${lesson.slug}` },
          lesson.titleAr,
          lesson.title,
        ),
      )
    }

    for (const story of getStoriesForLevel(level)) {
      entries.push(
        entry(
          { id: `story:${story.id}`, kind: 'story', title: story.titleAr, titleLanguage: 'ar', subtitle: `${level} · ${story.titleDe}`, to: `/levels/${level.toLowerCase()}/texts/${story.id}` },
          story.titleAr,
          story.titleDe,
          story.category,
        ),
      )
    }

    for (const item of getVocabularyForLevel(level)) {
      entries.push(
        entry(
          {
            id: `word:${item.id}`,
            kind: 'word',
            title: item.article ? `${item.article} ${item.word}` : item.word,
            titleLanguage: 'de',
            subtitle: `${item.meaningAr} · ${level}`,
            to: `/vocabulary?level=${level.toLowerCase()}&q=${encodeURIComponent(item.word)}`,
          },
          item.article,
          item.word,
          item.plural,
          item.meaningAr,
        ),
      )
    }
  }

  for (const rule of getRoadmapEntries()) {
    entries.push(
      entry(
        { id: `rule:${rule.number}`, kind: 'rule', title: rule.titleAr, titleLanguage: 'ar', subtitle: `${rule.level} · ${rule.termDe}`, to: grammarRulePath(rule) },
        rule.titleAr,
        rule.termDe,
      ),
    )
  }

  return entries
}

const KIND_ORDER: Record<SearchKind, number> = { lesson: 0, rule: 1, word: 2, story: 3 }

/** No kind may fill the whole list — a common word matches hundreds of vocabulary entries. */
const MAX_PER_KIND = 6

function scoreEntry(item: SearchEntry, query: string, tokens: string[]): number {
  if (!tokens.every((token) => item.haystack.includes(token))) return 0
  const title = normalizeForSearch(item.title)
  if (title === query) return 4
  if (title.startsWith(query)) return 3
  if (title.includes(query)) return 2
  return 1
}

/** Entries matching every word of the query, best match first, with each kind capped so results stay varied. */
export function searchEntries(index: readonly SearchEntry[], rawQuery: string, limit = 20): SearchEntry[] {
  const query = normalizeForSearch(rawQuery)
  if (!query) return []
  const tokens = query.split(/\s+/)

  const scored = index
    .map((item) => ({ item, score: scoreEntry(item, query, tokens) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || KIND_ORDER[a.item.kind] - KIND_ORDER[b.item.kind])

  const perKind = new Map<SearchKind, number>()
  const results: SearchEntry[] = []
  for (const { item } of scored) {
    const used = perKind.get(item.kind) ?? 0
    if (used >= MAX_PER_KIND) continue
    perKind.set(item.kind, used + 1)
    results.push(item)
    if (results.length >= limit) break
  }
  return results
}
