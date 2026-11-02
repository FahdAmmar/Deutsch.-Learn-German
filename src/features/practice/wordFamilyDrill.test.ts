import { describe, expect, it } from 'vitest'

import { WORD_FAMILIES } from '@/data/wordFamilies'
import { getAllVocabulary } from '@/lib/curriculum'

import {
  blankOut,
  buildFamilyBlankQuestion,
  buildFamilyMatching,
  buildWordFamilyDrill,
  displayWord,
  getFamiliesForLevel,
  getFamilyMembers,
  MIN_FAMILY_SIZE,
} from './wordFamilyDrill'

describe('word family data', () => {
  it('has unique family ids, and starts every family with its root', () => {
    expect(new Set(WORD_FAMILIES.map((family) => family.id)).size).toBe(WORD_FAMILIES.length)
    for (const family of WORD_FAMILIES) expect(family.members[0].word, family.id).toBe(family.root)
  })

  it('has every word in its own sentence, exactly once and as a whole word', () => {
    for (const family of WORD_FAMILIES) {
      for (const member of family.members) {
        const blanked = blankOut(member.sentence, member.word)
        expect(blanked, `${family.id}/${member.word}`).not.toBe(member.sentence)
        expect(blanked.split('___'), `${family.id}/${member.word}`).toHaveLength(2)
        expect(member.sentenceAr, member.word).toBeTruthy()
      }
    }
  })

  it('gives nouns an article and a capital letter, and leaves verbs and adjectives lower case', () => {
    for (const family of WORD_FAMILIES) {
      for (const member of family.members) {
        if (member.partOfSpeech === 'noun') {
          expect(member.word, member.word).toMatch(/^\p{Lu}/u)
        } else {
          expect(member.article, member.word).toBeUndefined()
          expect(member.word, member.word).toMatch(/^\p{Ll}/u)
        }
      }
    }
  })

  it('agrees with the curriculum vocabulary on the article, wherever a noun appears in both', () => {
    const nouns = getAllVocabulary().filter((item) => item.partOfSpeech === 'noun' && item.article)
    for (const family of WORD_FAMILIES) {
      for (const member of family.members) {
        if (!member.article) continue
        const match = nouns.find((item) => item.word === member.word)
        if (match) expect(match.article, member.word).toBe(member.article)
      }
    }
  })

  it('has distinct words and meanings inside a family (a matching exercise needs distinct sides)', () => {
    for (const family of WORD_FAMILIES) {
      expect(new Set(family.members.map(displayWord)).size, family.id).toBe(family.members.length)
      expect(new Set(family.members.map((member) => member.meaningAr)).size, family.id).toBe(family.members.length)
    }
  })

  it('shows a family at a level only with enough words that level has met', () => {
    const a1 = getFamiliesForLevel('A1')
    expect(a1.length).toBeGreaterThanOrEqual(3)
    for (const family of a1) {
      const members = getFamilyMembers(family, 'A1')
      expect(members.length).toBeGreaterThanOrEqual(MIN_FAMILY_SIZE)
      expect(members.every((member) => member.level === 'A1')).toBe(true)
    }
    expect(getFamiliesForLevel('A2')).toHaveLength(WORD_FAMILIES.length)
  })
})

describe('blankOut', () => {
  it('finds a whole word only: Koch is not inside Kochbuch', () => {
    expect(blankOut('Das Kochbuch gehört dem Koch.', 'Koch')).toBe('Das Kochbuch gehört dem ___.')
  })

  it('tells a verb from the noun it makes by the capital letter', () => {
    expect(blankOut('Das Essen ist fertig, wir können essen.', 'essen')).toBe('Das Essen ist fertig, wir können ___.')
    expect(blankOut('Das Essen ist fertig, wir können essen.', 'Essen')).toBe('Das ___ ist fertig, wir können essen.')
  })
})

describe('word family drill', () => {
  it('builds a typed question with the word missing and its spellings accepted', () => {
    const family = WORD_FAMILIES.find((candidate) => candidate.id === 'kochen')!
    const member = family.members.find((candidate) => candidate.word === 'Kochlöffel')!
    const question = buildFamilyBlankQuestion(family, member)
    expect(question.sentenceDe).toBe('Der ___ liegt in der Schublade.')
    expect(question.acceptedAnswers).toEqual(['Kochlöffel', 'Kochloeffel'])
    expect(question.promptAr).toContain('kochen')
  })

  it('builds a matching exercise from the words a level knows', () => {
    const family = WORD_FAMILIES.find((candidate) => candidate.id === 'wohnen')!
    expect(buildFamilyMatching(family, 'A1').pairs.map((pair) => pair.de)).toEqual(['wohnen', 'die Wohnung', 'das Wohnzimmer', 'der Wohnort'])
    expect(buildFamilyMatching(family, 'A2').pairs).toHaveLength(5)
  })

  it('builds a session of blanks that spread over several families, closed by a matching exercise', () => {
    for (let round = 0; round < 20; round += 1) {
      const session = buildWordFamilyDrill('A2', 10)
      expect(session).toHaveLength(10)
      expect(session.at(-1)?.type).toBe('matching')
      const blanks = session.slice(0, -1)
      expect(blanks.every((exercise) => exercise.type === 'fill-blank')).toBe(true)
      expect(new Set(blanks.map((exercise) => (exercise.type === 'fill-blank' ? exercise.sentenceDe : ''))).size).toBe(blanks.length)
    }
  })

  it('keeps A1 sessions to words A1 knows', () => {
    const a2Only = new Set(WORD_FAMILIES.flatMap((family) => family.members.filter((member) => member.level === 'A2').map((member) => member.sentence)))
    for (let round = 0; round < 20; round += 1) {
      for (const exercise of buildWordFamilyDrill('A1', 10)) {
        if (exercise.type !== 'fill-blank') continue
        const original = WORD_FAMILIES.flatMap((family) => family.members).find((member) => blankOut(member.sentence, member.word) === exercise.sentenceDe)
        expect(original, exercise.sentenceDe).toBeDefined()
        expect(a2Only.has(original!.sentence)).toBe(false)
      }
    }
  })
})
