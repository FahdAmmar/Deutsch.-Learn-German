import { ADJECTIVE_FRAMES, ADJECTIVE_NOUN_GROUPS, CASE_NOUNS, REGULAR_ADJECTIVES, type AdjectiveFrame, type CaseNoun } from '@/data/caseDrill'
import {
  ADJECTIVE_ENDINGS,
  adjectiveEnding,
  CASE_NAME,
  columnOf,
  determiner,
  GENDER_OF_ARTICLE,
  nounForm,
  nounPhrase,
  type DeterminerKind,
  type GrammaticalNumber,
} from '@/lib/generators/cases'
import { acceptedSpellings } from '@/lib/spelling'
import type { Exercise, FillBlankExercise, MultipleChoiceExercise } from '@/types'
import { generateId } from '@/utils/id'
import { shuffle } from '@/utils/shuffle'

import { SESSION_SIZE } from './sessions'

export type AdjectiveQuestionMode = 'choose' | 'type'

export interface AdjectiveScenario {
  frame: AdjectiveFrame
  noun: CaseNoun
  adjective: string
  kind: DeterminerKind
  number: GrammaticalNumber
}

const GENDER_LABEL_AR = { m: 'مذكّر', f: 'مؤنّث', n: 'محايد', pl: 'جمع' } as const

const DEFINITE_RULE_AR =
  'بعد der / die / das وأخواتها: النهاية ‎-e‎ في خمس خانات فقط (Nominativ: المفرد كله، Akkusativ: المؤنّث والمحايد)، وفي كل ما عداها ‎-en‎.'

const EIN_RULE_AR =
  'بعد ein وkein: القاعدة نفسها، لكن حيث تأتي الأداة بلا نهاية (ein في Nominativ للمذكّر والمحايد، وفي Akkusativ للمحايد) تظهر النهاية على الصفة: ‎-er‎ و‎-es‎.'

/** The nouns an adjective may stand in front of: things only, in the three groups that make sense. */
export function getAdjectiveNouns(): CaseNoun[] {
  return CASE_NOUNS.filter((noun) => ADJECTIVE_NOUN_GROUPS.includes(noun.group))
}

/** A sentence is built only from combinations that exist: `ein` has no plural, and "von keinem …" is not something one says. */
export function isValidAdjectiveScenario(scenario: AdjectiveScenario): boolean {
  const { frame, kind, number } = scenario
  if (kind === 'indefinite' && number === 'plural') return false
  if (kind === 'negative' && frame.caseName === 'dativ') return false
  return true
}

const columnOfScenario = (scenario: AdjectiveScenario) => columnOf(GENDER_OF_ARTICLE[scenario.noun.article], scenario.number)

export function adjectiveAnswer(scenario: AdjectiveScenario): string {
  const { frame, kind, adjective } = scenario
  return adjective + adjectiveEnding(kind, frame.caseName, columnOfScenario(scenario))
}

function sentenceOf(scenario: AdjectiveScenario, blank: boolean): string {
  const { frame, noun, kind, number } = scenario
  const before = number === 'plural' && frame.beforePlural ? frame.beforePlural : frame.before
  const column = columnOfScenario(scenario)
  const article = determiner(kind, frame.caseName, column)
  if (article === undefined) throw new Error(`No article for ${kind} ${number}`)
  const adjective = blank ? '___' : adjectiveAnswer(scenario)
  return `${before} ${article} ${adjective} ${nounForm(noun, frame.caseName, number)}${frame.after}`
}

function explain(scenario: AdjectiveScenario): string {
  const { frame, noun, kind, number } = scenario
  const column = columnOfScenario(scenario)
  const phrase = nounPhrase(noun, { kind, caseName: frame.caseName, number, adjective: scenario.adjective }) ?? ''
  const ending = adjectiveEnding(kind, frame.caseName, column)
  const rule = kind === 'definite' ? DEFINITE_RULE_AR : EIN_RULE_AR
  return `«${phrase}»: ${CASE_NAME[frame.caseName]}، ${GENDER_LABEL_AR[column]} ← النهاية ‎-${ending}‎. ${rule}`
}

function promptOf(scenario: AdjectiveScenario): string {
  const { noun, adjective, number } = scenario
  const plural = number === 'plural' ? ' (بصيغة الجمع)' : ''
  return `ضع الصفة «${adjective}» بالنهاية الصحيحة. الاسم: ${noun.article} ${noun.word} (${noun.meaningAr})${plural}`
}

function chooseQuestion(scenario: AdjectiveScenario): MultipleChoiceExercise {
  const correct = adjectiveAnswer(scenario)
  const options = shuffle(ADJECTIVE_ENDINGS.map((ending) => scenario.adjective + ending))
  return {
    id: generateId(`adj-choose-${scenario.noun.id}`),
    type: 'multiple-choice',
    level: 'A2',
    promptAr: promptOf(scenario),
    questionDe: sentenceOf(scenario, true),
    options,
    correctIndex: options.indexOf(correct),
    explanationAr: explain(scenario),
  }
}

function typeQuestion(scenario: AdjectiveScenario): FillBlankExercise {
  return {
    id: generateId(`adj-type-${scenario.noun.id}`),
    type: 'fill-blank',
    level: 'A2',
    promptAr: promptOf(scenario),
    sentenceDe: sentenceOf(scenario, true),
    acceptedAnswers: acceptedSpellings(adjectiveAnswer(scenario)),
    hint: scenario.adjective,
    explanationAr: explain(scenario),
  }
}

export function buildAdjectiveQuestion(scenario: AdjectiveScenario, mode: AdjectiveQuestionMode): Exercise {
  return mode === 'choose' ? chooseQuestion(scenario) : typeQuestion(scenario)
}

const pick = <T>(values: readonly T[]): T => values[Math.floor(Math.random() * values.length)]

const KINDS: readonly DeterminerKind[] = ['definite', 'definite', 'indefinite', 'negative']

function randomScenario(): AdjectiveScenario {
  return {
    frame: pick(ADJECTIVE_FRAMES),
    noun: pick(getAdjectiveNouns()),
    adjective: pick(REGULAR_ADJECTIVES),
    kind: pick(KINDS),
    number: Math.random() < 0.3 ? 'plural' : 'singular',
  }
}

/** A session on adjective endings, A2: half chosen from the four endings, half typed. No sentence repeats. */
export function buildAdjectiveDrill(size: number = SESSION_SIZE): Exercise[] {
  const questions: Exercise[] = []
  const seen = new Set<string>()
  for (let attempt = 0; questions.length < size && attempt < size * 60; attempt += 1) {
    const scenario = randomScenario()
    if (!isValidAdjectiveScenario(scenario)) continue
    const key = `${scenario.frame.caseName}|${scenario.noun.id}|${scenario.adjective}|${scenario.kind}|${scenario.number}`
    if (seen.has(key)) continue
    seen.add(key)
    questions.push(buildAdjectiveQuestion(scenario, questions.length % 2 === 0 ? 'choose' : 'type'))
  }
  return questions
}
