import { MINIMAL_PAIRS, type MinimalPair, type MinimalPairWord } from '@/data/minimalPairs'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Exercise, ListeningExercise } from '@/types'
import { shuffle } from '@/utils/shuffle'

import { SESSION_SIZE } from './sessions'

/** The pairs a level may use: its own and those of the levels below it (A2 learners keep hearing the A1 pairs). */
export function getMinimalPairsForLevel(level: CEFRLevel): MinimalPair[] {
  const reach = CEFR_LEVELS.indexOf(level)
  return MINIMAL_PAIRS.filter((pair) => CEFR_LEVELS.indexOf(pair.level) <= reach)
}

const describe = ({ word, article, meaningAr }: MinimalPairWord): string => `${article ? `${article} ` : ''}${word} = ${meaningAr}`

/**
 * "Which word did you hear?" — the learner hears one word of a pair and picks it from both.
 * Which of the two is spoken is decided by `playFirst`, so a session can balance them.
 */
export function buildPairQuestion(pair: MinimalPair, playFirst: boolean): ListeningExercise {
  const spoken = playFirst ? pair.a : pair.b
  const other = playFirst ? pair.b : pair.a
  const options = shuffle([pair.a.word, pair.b.word])
  return {
    id: `minimal-pair-${pair.id}-${playFirst ? 'a' : 'b'}`,
    type: 'listening',
    level: pair.level,
    promptAr: 'استمع إلى الكلمة، ثم اختر ما سمعته. الكلمتان متشابهتان في كل شيء إلا صوتاً واحداً.',
    audioText: spoken.word,
    options,
    correctIndex: options.indexOf(spoken.word),
    explanationAr: `سمعتَ ${describe(spoken)}، وليست ${describe(other)}. الفرق بينهما: ${pair.differenceAr}.`,
  }
}

/** A session of "which word did you hear?" questions, each pair at most once, the two words of a pair spoken about equally often. */
export function buildMinimalPairDrill(level: CEFRLevel, size: number = SESSION_SIZE): Exercise[] {
  const pairs = shuffle(getMinimalPairsForLevel(level)).slice(0, size)
  // Alternating, then shuffled: the learner cannot guess from the order which word comes next.
  const firsts = shuffle(pairs.map((_, index) => index % 2 === 0))
  return pairs.map((pair, index) => buildPairQuestion(pair, firsts[index]))
}
