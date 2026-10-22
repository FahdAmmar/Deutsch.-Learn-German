import { GENDER_RULES } from '@/data/genderRules'
import { shuffle } from '@/utils/shuffle'
import type { Exercise, GenderRule, GermanArticle, MultipleChoiceExercise, VocabularyItem } from '@/types'

const ARTICLES: readonly GermanArticle[] = ['der', 'die', 'das']

const drillRules = GENDER_RULES.filter((rule) => rule.drill)

/** Longest ending first, so "-ie" is tried before "-e" and "-chen" before "-en". */
function endingLength(rule: GenderRule): number {
  return Math.max(0, ...(rule.endings ?? []).map((ending) => ending.length))
}
const endingRules = drillRules.filter((rule) => rule.endings).sort((a, b) => endingLength(b) - endingLength(a))
const wordRules = drillRules.filter((rule) => rule.words)

/** The noun without the feminine form some entries add ("Lehrer / Lehrerin" is taught as "Lehrer"). */
function baseWord(word: string): string {
  return word.split('/')[0].trim()
}

/**
 * The rule that explains the article of a noun, or `undefined` when no rule applies or the noun
 * is an exception — the drill must only ask what a rule truly explains.
 */
export function findGenderRule(
  item: Pick<VocabularyItem, 'word' | 'article' | 'partOfSpeech'>,
): GenderRule | undefined {
  if (item.partOfSpeech !== 'noun' || !item.article) return undefined
  const word = baseWord(item.word).toLowerCase()

  const byMeaning = wordRules.find((rule) => rule.words?.includes(word))
  if (byMeaning) return byMeaning.article === item.article ? byMeaning : undefined

  const byEnding = endingRules.find((rule) => rule.endings?.some((ending) => word.endsWith(ending)))
  return byEnding && byEnding.article === item.article ? byEnding : undefined
}

export function buildGenderExercise(item: VocabularyItem): MultipleChoiceExercise | undefined {
  const rule = findGenderRule(item)
  if (!rule || !item.article) return undefined
  const strength = rule.strength === 'always' ? 'دائماً' : 'في الغالب'
  const exceptions =
    rule.exceptions.length > 0
      ? ` وهناك استثناءات مثل: ${rule.exceptions.map((entry) => `${entry.article} ${entry.word}`).join('، ')}.`
      : ''
  return {
    id: `gender-${item.id}`,
    type: 'multiple-choice',
    level: item.level,
    promptAr: 'خمّن أداة التعريف من شكل الكلمة.',
    questionDe: baseWord(item.word),
    options: [...ARTICLES],
    correctIndex: ARTICLES.indexOf(item.article),
    explanationAr: `«${item.article} ${baseWord(item.word)}» — ${rule.titleAr}: تأخذ ‎${rule.article}‎ ${strength}.${exceptions}`,
  }
}

export const GENDER_SESSION_SIZE = 10

/** One question per noun a rule explains, mixed, at most `size`. */
export function buildGenderDrill(
  vocabulary: readonly VocabularyItem[],
  size: number = GENDER_SESSION_SIZE,
): Exercise[] {
  const questions = vocabulary.flatMap((item) => {
    const exercise = buildGenderExercise(item)
    return exercise ? [exercise] : []
  })
  return shuffle(questions).slice(0, size)
}

/** How many nouns of the given vocabulary a rule explains: the drill's real size. */
export function countGenderQuestions(vocabulary: readonly VocabularyItem[]): number {
  return vocabulary.filter((item) => findGenderRule(item) !== undefined).length
}
