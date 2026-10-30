import type { PartOfSpeech, VocabularyItem } from '@/types'

import { nounSurfaces, startsSentence, tokenize, verbForms } from './germanChecks'

/**
 * The words of a text that the curriculum already teaches, so a learner can put them into spaced
 * review straight from what they just read. Only curated vocabulary is offered: its meaning,
 * article and plural were written and checked, which a looked-up translation of a single word is not.
 */
export interface StoryWord {
  /** The entry to show and to save. */
  item: VocabularyItem
  /** Every vocabulary id that stands for this same word (the curriculum teaches a few words in two lessons). */
  ids: string[]
  /** How many times the word occurs in the text. */
  count: number
}

/** Function words and greetings are met in every text; listing them would bury the words worth learning. */
const SKIPPED_PARTS: ReadonlySet<PartOfSpeech> = new Set(['pronoun', 'conjunction', 'preposition', 'number', 'interjection'])
/** Verbs so frequent that they are not worth a place in a word list. */
const SKIPPED_VERBS: ReadonlySet<string> = new Set(['sein', 'haben', 'werden'])
const ADJECTIVE_ENDINGS = ['e', 'en', 'er', 'em', 'es'] as const

interface WordIndex {
  /** Nouns by exact (capitalised) spelling. */
  nouns: Map<string, VocabularyItem[]>
  /** Verbs and other single words by lower-case spelling. */
  words: Map<string, VocabularyItem[]>
  /** Adjectives by lower-case base form, to be found again under a case ending. */
  adjectives: Map<string, VocabularyItem[]>
  /** Expressions of several words that must appear together ("Rad fahren"). */
  phrases: VocabularyItem[]
}

function add(map: Map<string, VocabularyItem[]>, key: string, item: VocabularyItem) {
  const items = map.get(key) ?? []
  if (!items.includes(item)) items.push(item)
  map.set(key, items)
}

function isWorthListing(item: VocabularyItem): boolean {
  if (SKIPPED_PARTS.has(item.partOfSpeech)) return false
  return !(item.partOfSpeech === 'verb' && SKIPPED_VERBS.has(item.word))
}

function buildIndex(vocabulary: readonly VocabularyItem[]): WordIndex {
  const index: WordIndex = { nouns: new Map(), words: new Map(), adjectives: new Map(), phrases: [] }
  for (const item of vocabulary) {
    if (!isWorthListing(item)) continue
    const isVerb = item.partOfSpeech === 'verb'
    const multiWord = item.word.includes(' ') || item.word.includes('/') || item.word.includes('...')
    if (item.partOfSpeech === 'noun' && item.article && !multiWord) {
      for (const surface of nounSurfaces(item)) add(index.nouns, surface, item)
    } else if (isVerb) {
      for (const form of verbForms(item)) add(index.words, form, item)
    } else if (multiWord) {
      if (!item.word.includes('/') && !item.word.includes('...')) index.phrases.push(item)
    } else if (item.partOfSpeech === 'adjective') {
      add(index.adjectives, item.word.toLowerCase(), item)
    } else {
      add(index.words, item.word.toLowerCase(), item)
    }
  }
  return index
}

/** Which of the given texts' sentences contain which curriculum words, in the order they first appear. */
export function findStoryWords(sentences: readonly string[], vocabulary: readonly VocabularyItem[]): StoryWord[] {
  const index = buildIndex(vocabulary)
  // The same word taught twice (two ids) is one entry; the first id found is the one shown.
  const found = new Map<string, StoryWord>()
  const note = (item: VocabularyItem) => {
    const key = `${item.partOfSpeech === 'noun' ? item.article : ''}|${item.word}`
    const entry = found.get(key)
    if (!entry) {
      found.set(key, { item, ids: [item.id], count: 1 })
      return
    }
    entry.count += 1
    if (!entry.ids.includes(item.id)) entry.ids.push(item.id)
  }

  for (const sentence of sentences) {
    const tokens = tokenize(sentence)
    const lowered = new Set(tokens.map((token) => token.text.toLowerCase()))
    const counted = new Set<VocabularyItem>()
    const noteOnce = (item: VocabularyItem) => {
      // One occurrence per sentence is enough; a word is not counted twice by two of its forms.
      if (counted.has(item)) return
      counted.add(item)
      note(item)
    }

    for (const token of tokens) {
      for (const item of index.nouns.get(token.text) ?? []) noteOnce(item)
      // A capital in the middle of a sentence is a noun or a name, never a verb or an adjective.
      const capital = token.text[0] !== token.text[0].toLowerCase()
      if (capital && !startsSentence(sentence, token)) continue
      const word = token.text.toLowerCase()

      for (const item of index.words.get(word) ?? []) {
        const prefix = item.verb?.separablePrefix
        // "steht … auf": the stem form only counts when its prefix is in the sentence as well.
        if (item.partOfSpeech === 'verb' && prefix && !word.startsWith(prefix) && !lowered.has(prefix)) continue
        noteOnce(item)
      }
      for (const item of index.adjectives.get(word) ?? []) noteOnce(item)
      for (const ending of ADJECTIVE_ENDINGS) {
        if (word.length > ending.length + 2 && word.endsWith(ending)) {
          for (const item of index.adjectives.get(word.slice(0, -ending.length)) ?? []) noteOnce(item)
        }
      }
    }

    const lowerSentence = sentence.toLowerCase()
    for (const item of index.phrases) if (lowerSentence.includes(item.word.toLowerCase())) noteOnce(item)
  }
  return [...found.values()]
}
