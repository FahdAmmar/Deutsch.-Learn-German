import type { CEFRLevel } from './cefr'

/** Grammatical gender/article for German nouns. Kept separate from verbs. */
export type GermanArticle = 'der' | 'die' | 'das'

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'number'
  | 'interjection'
  | 'phrase'

export interface VocabularyExample {
  /** Authentic German example sentence. */
  de: string
  /** Arabic translation of the example sentence (meaning-based, not word-for-word). */
  ar: string
}

export interface VocabularyItem {
  id: string
  /** The German word or phrase, without the article (nouns store the article separately). */
  word: string
  /** Required for nouns; article taught together with the noun. */
  article?: GermanArticle
  /** Plural form, shown for nouns when it exists / is educationally relevant. */
  plural?: string
  partOfSpeech: PartOfSpeech
  /** Arabic meaning of the word. */
  meaningAr: string
  example?: VocabularyExample
  level: CEFRLevel
  category: string
  /** IPA-lite / pronunciation hint shown alongside the audio button, e.g. syllable split. */
  pronunciationHint?: string
}
