import { describe, expect, it } from 'vitest'

import { getAllVocabulary, getLessonsForLevel, getReadingTextsForLevel } from '@/lib/curriculum'
import { splitSentences } from '@/lib/sentences'
import { parseInfinitive } from '@/lib/verbs'
import { CEFR_LEVELS } from '@/types'

/**
 * These tests exist because TypeScript's type system verifies *shape*
 * (an exercise has the right fields) but not *content quality* (no two
 * multiple-choice options happen to be identical strings, distractors
 * don't accidentally equal the correct answer, etc.). A real bug of
 * exactly this kind — a duplicated MCQ distractor — slipped through into
 * production data and was only caught by chance when the placement test
 * happened to sample that exact lesson. This suite catches the whole
 * class of bug for every lesson, not just the one that got noticed.
 */

const allLessons = CEFR_LEVELS.flatMap((level) => getLessonsForLevel(level))
const allExercises = allLessons.flatMap((lesson) => lesson.exercises)

function duplicates(values: string[]): string[] {
  const seen = new Set<string>()
  const dupes = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) dupes.add(value)
    seen.add(value)
  }
  return Array.from(dupes)
}

describe('curriculum content integrity', () => {
  it('every lesson has a globally unique id', () => {
    const ids = allLessons.map((lesson) => lesson.id)
    expect(duplicates(ids)).toEqual([])
  })

  it('every lesson slug is unique within its level (routes are /lessons/:level/:slug)', () => {
    for (const level of CEFR_LEVELS) {
      const slugs = getLessonsForLevel(level).map((lesson) => lesson.slug)
      expect(duplicates(slugs)).toEqual([])
    }
  })

  it('every vocabulary item has a globally unique id (SRS progress is keyed by it)', () => {
    const ids = getAllVocabulary().map((item) => item.id)
    expect(duplicates(ids)).toEqual([])
  })

  it('every exercise has a globally unique id', () => {
    const ids = allExercises.map((exercise) => exercise.id)
    expect(duplicates(ids)).toEqual([])
  })

  it('every multiple-choice exercise has distinct options and a valid correctIndex', () => {
    const mcqExercises = allExercises.filter((exercise) => exercise.type === 'multiple-choice')
    for (const exercise of mcqExercises) {
      expect(duplicates(exercise.options), `duplicate options in ${exercise.id}`).toEqual([])
      expect(exercise.correctIndex).toBeGreaterThanOrEqual(0)
      expect(exercise.correctIndex).toBeLessThan(exercise.options.length)
    }
  })

  it('every vocab-recall exercise has distinct distractors that do not repeat the correct answer', () => {
    const vocabRecallExercises = allExercises.filter((exercise) => exercise.type === 'vocab-recall')
    for (const exercise of vocabRecallExercises) {
      expect(duplicates(exercise.distractorsAr), `duplicate distractors in ${exercise.id}`).toEqual([])
      expect(exercise.distractorsAr).not.toContain(exercise.correctAnswerAr)
    }
  })

  it('every matching exercise has distinct German terms and distinct Arabic terms', () => {
    const matchingExercises = allExercises.filter((exercise) => exercise.type === 'matching')
    for (const exercise of matchingExercises) {
      expect(duplicates(exercise.pairs.map((pair) => pair.de)), `duplicate German terms in ${exercise.id}`).toEqual([])
      expect(duplicates(exercise.pairs.map((pair) => pair.ar)), `duplicate Arabic terms in ${exercise.id}`).toEqual([])
    }
  })

  it('every ordering exercise has a correctOrder that is a valid permutation of its words', () => {
    const orderingExercises = allExercises.filter((exercise) => exercise.type === 'ordering')
    for (const exercise of orderingExercises) {
      expect(exercise.correctOrder.length, `${exercise.id} length mismatch`).toBe(exercise.words.length)
      const sorted = [...exercise.correctOrder].sort((a, b) => a - b)
      const expectedIndices = exercise.words.map((_, index) => index)
      expect(sorted, `${exercise.id} is not a valid permutation`).toEqual(expectedIndices)
    }
  })

  it('every fill-blank exercise has at least one non-empty accepted answer', () => {
    const fillBlankExercises = allExercises.filter((exercise) => exercise.type === 'fill-blank')
    for (const exercise of fillBlankExercises) {
      expect(exercise.acceptedAnswers.length, `${exercise.id} has no accepted answers`).toBeGreaterThan(0)
      for (const answer of exercise.acceptedAnswers) {
        expect(answer.trim(), `${exercise.id} has a blank accepted answer`).not.toBe('')
      }
    }
  })

  it('every true-false exercise has a non-empty statement', () => {
    const trueFalseExercises = allExercises.filter((exercise) => exercise.type === 'true-false')
    for (const exercise of trueFalseExercises) {
      expect(exercise.statementDe.trim(), `${exercise.id} has a blank statement`).not.toBe('')
    }
  })

  it('every reading text has a globally unique id', () => {
    const ids = CEFR_LEVELS.flatMap((level) => getReadingTextsForLevel(level)).map((text) => text.id)
    expect(duplicates(ids)).toEqual([])
  })

  it('every reading text slug is unique within its level', () => {
    for (const level of CEFR_LEVELS) {
      const slugs = getReadingTextsForLevel(level).map((text) => text.slug)
      expect(duplicates(slugs)).toEqual([])
    }
  })

  it('every reading text has at least one paragraph, each with non-empty German and Arabic', () => {
    const allReadingTexts = CEFR_LEVELS.flatMap((level) => getReadingTextsForLevel(level))
    for (const text of allReadingTexts) {
      expect(text.paragraphs.length, `${text.id} has no paragraphs`).toBeGreaterThan(0)
      for (const paragraph of text.paragraphs) {
        expect(paragraph.de.trim(), `${text.id} has a blank German paragraph`).not.toBe('')
        expect(paragraph.ar.trim(), `${text.id} has a blank Arabic paragraph`).not.toBe('')
      }
    }
  })

  // Dictation shows one sentence at a time with its own translation, so every shipped paragraph
  // needs one Arabic line per German sentence, in the same order the sentence splitter yields them.
  it('every reading paragraph has one non-empty Arabic sentence per German sentence', () => {
    const allReadingTexts = CEFR_LEVELS.flatMap((level) => getReadingTextsForLevel(level))
    for (const text of allReadingTexts) {
      text.paragraphs.forEach((paragraph, position) => {
        const sentences = splitSentences(paragraph.de)
        const label = `${text.id} paragraph ${position + 1}`
        expect(paragraph.sentencesAr, `${label} has no sentencesAr`).toBeDefined()
        expect(paragraph.sentencesAr?.length, `${label}: ${sentences.length} German sentences vs sentencesAr`).toBe(sentences.length)
        for (const arabic of paragraph.sentencesAr ?? []) expect(arabic.trim(), `${label} has a blank Arabic sentence`).not.toBe('')
      })
    }
  })
})

describe('vocabulary integrity', () => {
  const vocabulary = getAllVocabulary()
  const nouns = vocabulary.filter((item) => item.partOfSpeech === 'noun')
  const verbs = vocabulary.filter((item) => item.partOfSpeech === 'verb')

  it('every noun is taught with its article and its plural, unless it is marked as having none', () => {
    for (const noun of nouns) {
      if (noun.numberUse === 'name') {
        expect(noun.article, `${noun.id} is a name used without an article`).toBeUndefined()
        expect(noun.plural, `${noun.id} is a name used without a plural`).toBeUndefined()
        continue
      }
      expect(noun.article, `${noun.id} needs its article`).toBeDefined()
      if (noun.numberUse === undefined) expect(noun.plural, `${noun.id} needs its plural (or numberUse)`).toBeTruthy()
      if (noun.numberUse === 'none' || noun.numberUse === 'only') expect(noun.plural, `${noun.id} has no ordinary plural`).toBeUndefined()
    }
  })

  it('every vocabulary item has a complete bilingual example sentence', () => {
    for (const item of vocabulary) {
      expect(item.example?.de.trim(), `${item.id} needs a German example`).toBeTruthy()
      expect(item.example?.ar.trim(), `${item.id} needs an Arabic example`).toBeTruthy()
    }
  })

  it('every verb carries the forms of its Perfekt and Präteritum (möchten has neither)', () => {
    for (const verb of verbs) {
      expect(verb.verb, `${verb.id} needs its verb forms`).toBeDefined()
      if (verb.word === 'möchten') continue
      expect(verb.verb?.praeteritum, `${verb.id} needs its Präteritum`).toBeTruthy()
      expect(verb.verb?.partizip, `${verb.id} needs its Partizip II`).toBeTruthy()
      expect(verb.verb?.auxiliary, `${verb.id} needs haben or sein`).toBeDefined()
    }
  })

  it('stored present forms are six full forms whose plural matches the infinitive', () => {
    for (const verb of verbs) {
      const present = verb.verb?.present
      if (!present) continue
      expect(present, `${verb.id} present`).toHaveLength(6)
      for (const form of present) expect(form.trim(), `${verb.id} has an empty present form`).not.toBe('')
      if (verb.word === 'sein') continue
      const { verb: infinitive } = parseInfinitive(verb)
      expect(present[3], `${verb.id}: wir-form`).toBe(infinitive)
      expect(present[5], `${verb.id}: sie-form`).toBe(infinitive)
    }
  })

  it('a separable verb starts with its prefix, and so does its Partizip II', () => {
    for (const verb of verbs) {
      const prefix = verb.verb?.separablePrefix
      if (!prefix) continue
      expect(verb.word.startsWith(prefix), `${verb.id}: infinitive`).toBe(true)
      expect(verb.verb?.partizip?.startsWith(prefix), `${verb.id}: Partizip II`).toBe(true)
    }
  })
})
