import { COLLOCATIONS, type Collocation } from '@/data/collocations'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Exercise, MatchingExercise, MultipleChoiceExercise } from '@/types'
import { generateId } from '@/utils/id'
import { shuffle } from '@/utils/shuffle'

import { SESSION_SIZE } from './sessions'

/** The collocations a level may use: its own and those of the levels below it. */
export function getCollocationsForLevel(level: CEFRLevel): Collocation[] {
  const reach = CEFR_LEVELS.indexOf(level)
  return COLLOCATIONS.filter((entry) => CEFR_LEVELS.indexOf(entry.level) <= reach)
}

/** "Which verb goes with this noun?" — the wrong verb a learner would reach for is always among the options. */
export function buildCollocationQuestion(entry: Collocation): MultipleChoiceExercise {
  const options = shuffle([entry.verb, entry.wrongVerb, ...entry.distractors])
  const note = entry.noteAr ? ` ${entry.noteAr}` : ''
  return {
    id: generateId(`collocation-${entry.id}`),
    type: 'multiple-choice',
    level: entry.level,
    promptAr: `اختر الفعل الذي يأتي مع هذا التعبير: ${entry.meaningAr}`,
    questionDe: `${entry.object} ___`,
    options,
    correctIndex: options.indexOf(entry.verb),
    explanationAr: `«${entry.phrase}» — ${entry.meaningAr}.${note} مثال: ${entry.example.de}`,
  }
}

const MATCHING_PAIRS = 5

/** Match the phrases to their meanings: the phrase is learned whole, verb included. */
export function buildCollocationMatching(entries: readonly Collocation[]): MatchingExercise {
  const chosen = entries.slice(0, MATCHING_PAIRS)
  return {
    id: generateId('collocation-matching'),
    type: 'matching',
    level: chosen[0]?.level ?? 'A1',
    promptAr: 'طابِق كل تعبير ألماني بمعناه',
    pairs: chosen.map((entry) => ({ de: entry.phrase, ar: entry.meaningAr })),
    explanationAr: chosen.map((entry) => `${entry.phrase} = ${entry.meaningAr}`).join(' — '),
  }
}

/** Questions on the verb that belongs, then one matching exercise to close (when there are enough phrases to match). */
export function buildCollocationDrill(level: CEFRLevel, size: number = SESSION_SIZE): Exercise[] {
  const pool = shuffle(getCollocationsForLevel(level))
  const wantMatching = pool.length >= 3 && size >= 3
  const questions: Exercise[] = pool.slice(0, wantMatching ? size - 1 : size).map(buildCollocationQuestion)
  if (wantMatching) questions.push(buildCollocationMatching(shuffle(pool)))
  return questions
}
