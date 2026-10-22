import { REGISTER_PAIRS, REGISTER_SITUATIONS, type RegisterKind, type RegisterPair } from '@/data/registers'
import { shuffle } from '@/utils/shuffle'
import type { CEFRLevel, Exercise, FillBlankExercise, MultipleChoiceExercise } from '@/types'

import { SESSION_SIZE } from './sessions'

const LEVEL: CEFRLevel = 'A1'

const RULE_AR =
  'الصيغة الرسمية (Sie) مع من لا تعرفهم من البالغين وفي المواقف الرسمية، والصيغة الودّية (du) مع الأصدقاء والعائلة والأطفال وزملاء السنّ في الدراسة. وتُكتب Sie وIhr وIhnen دائماً بحرف كبير.'

const pick = <T>(values: readonly T[]): T => values[Math.floor(Math.random() * values.length)]

/** Which of the two forms fits a situation: the learner reads the situation and chooses the sentence. */
function situationQuestion(pair: RegisterPair): MultipleChoiceExercise {
  const situation = pick(REGISTER_SITUATIONS)
  const options = shuffle([pair.informal, pair.formal])
  const right = situation.register === 'formal' ? pair.formal : pair.informal
  return {
    id: `register-situation-${pair.id}-${situation.id}`,
    type: 'multiple-choice',
    level: LEVEL,
    promptAr: `${situation.situationAr}. أي صيغة تناسب هذا الموقف؟ (${pair.ar})`,
    questionDe: '',
    options,
    correctIndex: options.indexOf(right),
    explanationAr: `«${right}» — ${situation.register === 'formal' ? 'موقف رسمي: Sie' : 'موقف ودّي: du'}. ${pair.focusAr} ${RULE_AR}`,
  }
}

/** Turn a sentence from one form into the other, typed — which is where the verb and the pronoun must change together. */
function convertQuestion(pair: RegisterPair, toward: RegisterKind): FillBlankExercise {
  const from = toward === 'informal' ? pair.formal : pair.informal
  const answer = toward === 'informal' ? pair.informal : pair.formal
  return {
    id: `register-convert-${pair.id}-${toward}`,
    type: 'fill-blank',
    level: LEVEL,
    promptAr: toward === 'informal' ? 'حوّل الجملة إلى الصيغة الودّية (du).' : 'حوّل الجملة إلى الصيغة الرسمية (Sie).',
    sentenceDe: `${from} → ___`,
    acceptedAnswers: [answer],
    hint: pair.ar,
    explanationAr: `«${answer}». ${pair.focusAr}`,
  }
}

/** A session mixing the two kinds of question, each pair used at most once. */
export function buildRegisterDrill(size: number = SESSION_SIZE): Exercise[] {
  const pairs = shuffle([...REGISTER_PAIRS]).slice(0, size)
  return pairs.map((pair, index) => {
    if (index % 2 === 0) return situationQuestion(pair)
    return convertQuestion(pair, pick<RegisterKind>(['informal', 'formal']))
  })
}
