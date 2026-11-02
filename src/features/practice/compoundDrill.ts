import { COMPOUNDS, type Compound } from '@/data/compounds'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Exercise, GermanArticle, MultipleChoiceExercise } from '@/types'
import { shuffle } from '@/utils/shuffle'

import { SESSION_SIZE } from './sessions'

const ARTICLES: readonly GermanArticle[] = ['der', 'die', 'das']

const RULE_AR = 'في الكلمة المركّبة تتبع الأداة دائماً الجزء الأخير منها.'

/** The compounds a level may use: its own and those of the levels below it. */
export function getCompoundsForLevel(level: CEFRLevel): Compound[] {
  const reach = CEFR_LEVELS.indexOf(level)
  return COMPOUNDS.filter((compound) => CEFR_LEVELS.indexOf(compound.level) <= reach)
}

const partsLine = (compound: Compound): string =>
  `${compound.first.article} ${compound.first.word} + ${compound.second.article} ${compound.second.word} = ${compound.article} ${compound.word}`

/** "Which article does this compound take?" — answered from its parts, shown to the learner in the explanation. */
export function buildCompoundArticleQuestion(compound: Compound): MultipleChoiceExercise {
  return {
    id: `compound-article-${compound.id}`,
    type: 'multiple-choice',
    level: compound.level,
    promptAr: `ما أداة الكلمة المركّبة «${compound.word}»؟ (${compound.meaningAr})`,
    questionDe: compound.word,
    options: [...ARTICLES],
    correctIndex: ARTICLES.indexOf(compound.article),
    explanationAr: `${partsLine(compound)}. ${RULE_AR} الجزء الأخير هنا هو ${compound.second.word} (${compound.second.meaningAr}).`,
  }
}

/** Two wrong spellings of a compound: its parts swapped, and the join done the wrong way. */
function wrongForms(compound: Compound): string[] {
  const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1)
  const swapped = `${compound.second.word}${lower(compound.first.word)}`
  const wrongJoin =
    compound.firstForm === compound.first.word
      ? `${compound.first.word}s${lower(compound.second.word)}`
      : `${compound.first.word}${lower(compound.second.word)}`
  return [...new Set([swapped, wrongJoin])].filter((form) => form !== compound.word)
}

/** "Build the word": which spelling of the two parts is right? The first part comes first, and the join matters. */
export function buildCompoundBuildQuestion(compound: Compound): MultipleChoiceExercise {
  const options = shuffle([compound.word, ...wrongForms(compound)])
  const note = compound.joinNoteAr ? ` ${compound.joinNoteAr}` : ''
  return {
    id: `compound-build-${compound.id}`,
    type: 'multiple-choice',
    level: compound.level,
    promptAr: `كوّن الكلمة المركّبة من: ${compound.first.word} + ${compound.second.word} (${compound.meaningAr})`,
    questionDe: `${compound.first.word} + ${compound.second.word}`,
    options,
    correctIndex: options.indexOf(compound.word),
    explanationAr: `${partsLine(compound)}. الجزء الذي يحدّد النوع يأتي أولاً، والجزء الأخير هو الأصل الذي يعطي الكلمة أداتها.${note}`,
  }
}

/** A session mixing the two question kinds, each compound at most once. */
export function buildCompoundDrill(level: CEFRLevel, size: number = SESSION_SIZE): Exercise[] {
  return shuffle(getCompoundsForLevel(level))
    .slice(0, size)
    .map((compound, index) => (index % 2 === 0 ? buildCompoundArticleQuestion(compound) : buildCompoundBuildQuestion(compound)))
}
