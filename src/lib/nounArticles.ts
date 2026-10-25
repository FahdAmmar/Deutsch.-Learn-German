import { getCurriculum } from '@/data/curriculum'
import { getAllVocabulary } from '@/lib/curriculum'
import type { ArticleLookup, GermanArticle } from '@/types'

/**
 * The article of every noun the vocabulary teaches, so a grammar hint can say
 * "das Frühstück" and the learner sees *why* the form is "dem". A noun that
 * appears with two different articles ("der See" / "die See") is left out:
 * a hint must never guess.
 */

interface Index {
  /** The curriculum snapshot the index was built from; it changes whenever a level loads. */
  source: unknown
  articles: Map<string, GermanArticle | null>
}

let index: Index | null = null

function build(): Index {
  const articles = new Map<string, GermanArticle | null>()
  for (const item of getAllVocabulary()) {
    if (item.partOfSpeech !== 'noun' || !item.article) continue
    // "Lehrer / Lehrerin" is taught as "Lehrer".
    const word = item.word.split('/')[0].trim()
    if (!word || /\s/.test(word)) continue

    const known = articles.get(word)
    articles.set(word, known === undefined || known === item.article ? item.article : null)
  }
  return { source: getCurriculum(), articles }
}

export const lookupNounArticle: ArticleLookup = (noun) => {
  if (index?.source !== getCurriculum()) index = build()
  return index.articles.get(noun) ?? undefined
}
