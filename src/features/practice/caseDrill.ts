import { CASE_FRAMES, CASE_NOUNS, type CaseFrame, type CaseNoun } from '@/data/caseDrill'
import {
  allDeterminers,
  articleChangeAr,
  CASE_LABEL_AR,
  CASE_NAME,
  columnOf,
  dativePlural,
  determiner,
  GENDER_OF_ARTICLE,
  GERMAN_CASES,
  nounForm,
  nounPhrase,
  type DeterminerKind,
  type GrammaticalNumber,
} from '@/lib/generators/cases'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Exercise, FillBlankExercise, MultipleChoiceExercise } from '@/types'
import { generateId } from '@/utils/id'
import { shuffle } from '@/utils/shuffle'

import { SESSION_SIZE } from './sessions'

export type CaseQuestionMode = 'choose' | 'type' | 'name'

/** The cases the drills use for a definite or an indefinite article; negative `kein-` belongs to the adjective drill. */
export type ArticleKind = Extract<DeterminerKind, 'definite' | 'indefinite'>

export interface CaseScenario {
  frame: CaseFrame
  noun: CaseNoun
  kind: ArticleKind
  number: GrammaticalNumber
}

const reaches = (itemLevel: CEFRLevel, level: CEFRLevel): boolean => CEFR_LEVELS.indexOf(itemLevel) <= CEFR_LEVELS.indexOf(level)

/** The frames a level may use: its own and those of the levels below it. */
export function getCaseFrames(level: CEFRLevel): CaseFrame[] {
  return CASE_FRAMES.filter((frame) => reaches(frame.level, level))
}

/** The nouns that make sense in a frame, and that the level has met. */
export function getCompatibleNouns(frame: CaseFrame, level: CEFRLevel): CaseNoun[] {
  return CASE_NOUNS.filter(
    (noun) => reaches(noun.level, level) && frame.groups.includes(noun.group) && (!frame.nounIds || frame.nounIds.includes(noun.id)),
  )
}

const KIND_LABEL_AR: Record<ArticleKind, string> = {
  definite: 'أداة التعريف (der / die / das …)',
  indefinite: 'أداة التنكير (ein / eine …)',
}

const GENDER_LABEL_AR = { m: 'مذكّر', f: 'مؤنّث', n: 'محايد', pl: 'جمع' } as const

const beforeOf = (frame: CaseFrame, number: GrammaticalNumber): string =>
  number === 'plural' && frame.beforePlural ? frame.beforePlural : frame.before

/** The sentence with the whole noun phrase written out, or with its article replaced by a blank. */
function sentenceOf(scenario: CaseScenario, blank: boolean): string {
  const { frame, noun, kind, number } = scenario
  const phrase = nounPhrase(noun, { kind, caseName: frame.caseName, number })
  if (phrase === undefined) throw new Error(`No such noun phrase: ${kind} ${number} ${noun.word}`)
  const shown = blank ? `___ ${nounForm(noun, frame.caseName, number)}` : phrase
  return `${beforeOf(frame, number)} ${shown}${frame.after}`
}

function articleOf(scenario: CaseScenario): string {
  const { frame, noun, kind, number } = scenario
  const form = determiner(kind, frame.caseName, columnOf(GENDER_OF_ARTICLE[noun.article], number))
  if (form === undefined) throw new Error(`No article for ${kind} ${number}`)
  return form
}

/** What the learner needs to read the blank: the noun as the dictionary has it, and which article is asked for. */
function promptOf(scenario: CaseScenario): string {
  const { noun, kind, number } = scenario
  const plural = number === 'plural' ? ' — في صيغة الجمع' : ''
  return `أكمل بـ${KIND_LABEL_AR[kind]}. الاسم: ${noun.article} ${noun.word} (${noun.meaningAr})${plural}`
}

/** Why the answer is right: the case, what decides it, what the article became, and any change in the noun. */
export function explainScenario(scenario: CaseScenario): string {
  const { frame, noun, kind, number } = scenario
  const column = columnOf(GENDER_OF_ARTICLE[noun.article], number)
  const phrase = nounPhrase(noun, { kind, caseName: frame.caseName, number }) ?? ''
  const parts = [`«${phrase}» في ${CASE_LABEL_AR[frame.caseName]}.`, frame.noteAr]

  const change = articleChangeAr(kind, frame.caseName, column)
  if (change) parts.push(`الأداة (${GENDER_LABEL_AR[column]}): ${change}.`)

  if (number === 'plural' && frame.caseName === 'dativ' && dativePlural(noun.plural) !== noun.plural) {
    parts.push(`وفي جمع Dativ تُضاف ‎-n‎ إلى الاسم: ${noun.plural} ← ${dativePlural(noun.plural)}.`)
  }
  if (number === 'singular' && frame.caseName === 'genitiv' && GENDER_OF_ARTICLE[noun.article] !== 'f' && noun.genitive) {
    parts.push(`والاسم المذكّر والمحايد يأخذ ‎-s‎ أو ‎-es‎ في Genitiv: ${noun.word} ← ${noun.genitive}.`)
  }
  return parts.join(' ')
}

/** The correct article and three wrong ones: first the forms the same noun takes in other cases, then any other. */
function articleOptions(scenario: CaseScenario): { options: string[]; correctIndex: number } {
  const { noun, kind, number } = scenario
  const correct = articleOf(scenario)
  const column = columnOf(GENDER_OF_ARTICLE[noun.article], number)
  const sameNoun = GERMAN_CASES.map((caseName) => determiner(kind, caseName, column)).filter(
    (form): form is string => form !== undefined && form !== correct,
  )
  const rest = allDeterminers(kind).filter((form) => form !== correct)
  const distractors = [...new Set([...shuffle(sameNoun), ...shuffle(rest)])].slice(0, 3)
  const options = shuffle([correct, ...distractors])
  return { options, correctIndex: options.indexOf(correct) }
}

function exerciseId(mode: CaseQuestionMode, scenario: CaseScenario): string {
  return generateId(`case-${mode}-${scenario.frame.id}-${scenario.noun.id}`)
}

function chooseQuestion(scenario: CaseScenario): MultipleChoiceExercise {
  const { options, correctIndex } = articleOptions(scenario)
  return {
    id: exerciseId('choose', scenario),
    type: 'multiple-choice',
    level: scenario.frame.level,
    promptAr: promptOf(scenario),
    questionDe: sentenceOf(scenario, true),
    options,
    correctIndex,
    explanationAr: explainScenario(scenario),
  }
}

function typeQuestion(scenario: CaseScenario): FillBlankExercise {
  return {
    id: exerciseId('type', scenario),
    type: 'fill-blank',
    level: scenario.frame.level,
    promptAr: promptOf(scenario),
    sentenceDe: sentenceOf(scenario, true),
    acceptedAnswers: [articleOf(scenario)],
    hint: `${scenario.noun.article} ${scenario.noun.word}`,
    explanationAr: explainScenario(scenario),
  }
}

/** "Which case is this noun phrase in?" — the cases offered are those the level knows. */
function nameQuestion(scenario: CaseScenario, level: CEFRLevel): MultipleChoiceExercise {
  const { frame, noun, kind, number } = scenario
  const phrase = nounPhrase(noun, { kind, caseName: frame.caseName, number }) ?? ''
  const cases = GERMAN_CASES.filter((caseName) => caseName !== 'genitiv' || level !== 'A1')
  return {
    id: exerciseId('name', scenario),
    type: 'multiple-choice',
    level: frame.level,
    promptAr: `ما حالة «${phrase}» في هذه الجملة؟`,
    questionDe: sentenceOf(scenario, false),
    options: cases.map((caseName) => CASE_NAME[caseName]),
    correctIndex: cases.indexOf(frame.caseName),
    explanationAr: explainScenario(scenario),
  }
}

export function buildCaseQuestion(scenario: CaseScenario, mode: CaseQuestionMode, level: CEFRLevel = 'A2'): Exercise {
  if (mode === 'choose') return chooseQuestion(scenario)
  if (mode === 'type') return typeQuestion(scenario)
  return nameQuestion(scenario, level)
}

const pick = <T>(values: readonly T[]): T => values[Math.floor(Math.random() * values.length)]

/** The share of questions that use a plural noun: the plural changes the article, so it is worth practising, but singular comes first. */
const PLURAL_SHARE = 0.3

function randomScenario(level: CEFRLevel): CaseScenario {
  const frame = pick(getCaseFrames(level))
  const noun = pick(getCompatibleNouns(frame, level))
  const kind: ArticleKind = Math.random() < 0.65 ? 'definite' : 'indefinite'
  // `ein` has no plural.
  const number: GrammaticalNumber = kind === 'definite' && Math.random() < PLURAL_SHARE ? 'plural' : 'singular'
  return { frame, noun, kind, number }
}

const MODES: readonly CaseQuestionMode[] = ['choose', 'type', 'name']

/**
 * A session of article and case questions. The three kinds alternate (choose the article, type it, name
 * the case) and the same sentence never comes up twice.
 */
export function buildCaseDrill(level: CEFRLevel, size: number = SESSION_SIZE): Exercise[] {
  const questions: Exercise[] = []
  const seen = new Set<string>()
  for (let attempt = 0; questions.length < size && attempt < size * 40; attempt += 1) {
    const scenario = randomScenario(level)
    const key = `${scenario.frame.id}|${scenario.noun.id}|${scenario.kind}|${scenario.number}`
    if (seen.has(key)) continue
    seen.add(key)
    questions.push(buildCaseQuestion(scenario, MODES[questions.length % MODES.length], level))
  }
  return questions
}

/** How many different sentences a level can make — shown on the practice card. */
export function countCaseScenarios(level: CEFRLevel): number {
  return getCaseFrames(level).reduce((total, frame) => total + getCompatibleNouns(frame, level).length, 0)
}
