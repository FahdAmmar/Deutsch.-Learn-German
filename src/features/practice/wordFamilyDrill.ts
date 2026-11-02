import { WORD_FAMILIES, type FamilyMember, type WordFamily } from '@/data/wordFamilies'
import { acceptedSpellings } from '@/lib/spelling'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Exercise, FillBlankExercise, MatchingExercise } from '@/types'
import { generateId } from '@/utils/id'
import { shuffle } from '@/utils/shuffle'

import { SESSION_SIZE } from './sessions'

/** A family needs this many words at a level to be worth showing there. */
export const MIN_FAMILY_SIZE = 3

const reaches = (itemLevel: CEFRLevel, level: CEFRLevel): boolean => CEFR_LEVELS.indexOf(itemLevel) <= CEFR_LEVELS.indexOf(level)

/** The words of a family that a level has met. */
export function getFamilyMembers(family: WordFamily, level: CEFRLevel): FamilyMember[] {
  return family.members.filter((member) => reaches(member.level, level))
}

/** The families that have enough words at a level. */
export function getFamiliesForLevel(level: CEFRLevel): WordFamily[] {
  return WORD_FAMILIES.filter((family) => getFamilyMembers(family, level).length >= MIN_FAMILY_SIZE)
}

/** "der Fahrer", "fahren": how a member is written in a list. */
export const displayWord = (member: FamilyMember): string => (member.article ? `${member.article} ${member.word}` : member.word)

/** The sentence with the member's word replaced by a blank. The word is matched whole, so Koch is not found inside Kochbuch. */
export function blankOut(sentence: string, word: string): string {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return sentence.replace(new RegExp(`(?<![\\p{L}])${escaped}(?![\\p{L}])`, 'u'), '___')
}

export function buildFamilyBlankQuestion(family: WordFamily, member: FamilyMember): FillBlankExercise {
  return {
    id: generateId(`family-${family.id}-${member.word}`),
    type: 'fill-blank',
    level: member.level,
    promptAr: `أكمل الجملة بكلمة من عائلة «${family.root}»`,
    sentenceDe: blankOut(member.sentence, member.word),
    acceptedAnswers: acceptedSpellings(member.word),
    hint: `${member.meaningAr}${member.article ? ` (${member.article})` : ''}`,
    explanationAr: `«${displayWord(member)}» — ${member.meaningAr}. ${member.sentence} (${member.sentenceAr}) ${family.noteAr}`,
  }
}

export function buildFamilyMatching(family: WordFamily, level: CEFRLevel): MatchingExercise {
  const members = getFamilyMembers(family, level)
  return {
    id: generateId(`family-matching-${family.id}`),
    type: 'matching',
    level,
    promptAr: `طابِق كل كلمة من عائلة «${family.root}» بمعناها`,
    pairs: members.map((member) => ({ de: displayWord(member), ar: member.meaningAr })),
    explanationAr: `${family.noteAr}`,
  }
}

/**
 * A session on word families: sentences with one word missing, taken in turn from different families so
 * that no family crowds the others out, and a matching exercise at the end for one of them.
 */
export function buildWordFamilyDrill(level: CEFRLevel, size: number = SESSION_SIZE): Exercise[] {
  const families = shuffle(getFamiliesForLevel(level))
  if (families.length === 0) return []
  const queues = families.map((family) => ({ family, members: shuffle(getFamilyMembers(family, level)) }))

  const blanks: Exercise[] = []
  const wanted = Math.max(1, size - 1)
  for (let round = 0; blanks.length < wanted; round += 1) {
    let added = false
    for (const { family, members } of queues) {
      if (round < members.length && blanks.length < wanted) {
        blanks.push(buildFamilyBlankQuestion(family, members[round]))
        added = true
      }
    }
    if (!added) break
  }
  return [...blanks, buildFamilyMatching(families[0], level)]
}
