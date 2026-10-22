import { dateToGerman, formatDate, MONTH_NAMES, ordinalToGerman } from '@/lib/generators/dates'
import { confusableNumbers, numberSpellings, numberToGerman } from '@/lib/generators/numbers'
import { formatPrice, priceToGerman } from '@/lib/generators/prices'
import { formatClock, timeToGerman } from '@/lib/generators/time'
import { shuffle } from '@/utils/shuffle'
import type { CEFRLevel, Exercise, FillBlankExercise, ListeningExercise, MultipleChoiceExercise } from '@/types'

import { SESSION_SIZE } from './sessions'

/**
 * Practice that never runs out: the questions are made from rules, not written one by one.
 * The German itself comes from `lib/generators`, which has exact-value tests.
 */

export type GeneratedKind = 'numbers' | 'time' | 'dates' | 'prices'

const randomInt = (min: number, max: number): number => min + Math.floor(Math.random() * (max - min + 1))
const pick = <T>(values: readonly T[]): T => values[Math.floor(Math.random() * values.length)]
const uid = (): string => Math.random().toString(36).slice(2, 8)

/** The right answer among `wrong` ones in random order, with its position. Duplicates and the answer itself are dropped. */
function withOptions(
  correct: string,
  wrong: readonly string[],
  count = 4,
): { options: string[]; correctIndex: number } {
  const distinct = [...new Set(wrong)].filter((option) => option !== correct).slice(0, count - 1)
  const options = shuffle([correct, ...distinct])
  return { options, correctIndex: options.indexOf(correct) }
}

/** `count` values for the wrong answers: the confusable ones first, then any others in range. */
function fillDistractors(preferred: readonly number[], correct: number, max: number, count = 3): number[] {
  const chosen = shuffle([...preferred]).slice(0, count)
  const taken = new Set([correct, ...chosen])
  while (chosen.length < count && taken.size < max + 1) {
    const filler = randomInt(0, max)
    if (!taken.has(filler)) {
      taken.add(filler)
      chosen.push(filler)
    }
  }
  return chosen
}

// ---- numbers ----

function numberNote(n: number, word: string): string {
  const notes = [`${n} = ${word}.`]
  if (n === 1) notes.push('تُقال eins وحدها، لكنها تصير ‎ein‎ قبل كلمة أخرى: einundzwanzig (21) وeintausend (1000).')
  else if (n <= 12) notes.push('الأرقام من 0 إلى 12 كلمات مستقلة تُحفظ كما هي، ثم تبدأ القاعدة من 13.')
  if (n >= 13 && n <= 19)
    notes.push(
      'من 13 إلى 19 تنتهي الكلمة بـ ‎-zehn‎ وتُقال الآحاد أولاً: dreizehn = ثلاثة + عشرة. أما ‎-zig‎ فللعشرات: dreißig = 30.',
    )
  else if (n >= 20 && n < 100 && n % 10 === 0)
    notes.push('النهاية ‎-zig‎ (و‎-ßig‎ في dreißig) تدلّ على العشرات، وليس ‎-zehn‎: sechzig = 60، بينما sechzehn = 16.')
  else if (n > 20 && n < 100)
    notes.push('من 21 إلى 99 تُقال الآحاد أولاً ثم ‎und‎ ثم العشرات، وتُكتب كلمة واحدة: vierundzwanzig = أربعة وعشرون.')
  else if (n >= 100) notes.push('الأرقام المركّبة تُكتب كلمة واحدة بلا مسافات: المئات ثم الآحاد والعشرات.')
  return notes.join(' ')
}

function numberQuestion(kind: 'listening' | 'reading' | 'writing', max: number): Exercise {
  const n = randomInt(0, max)
  const word = numberToGerman(n)
  const base = {
    id: `gen-number-${kind}-${n}-${uid()}`,
    level: 'A1' as CEFRLevel,
    explanationAr: numberNote(n, word),
  }
  const wrongNumbers = fillDistractors(confusableNumbers(n, max), n, max)

  if (kind === 'listening') {
    const { options, correctIndex } = withOptions(String(n), wrongNumbers.map(String))
    const exercise: ListeningExercise = {
      ...base,
      type: 'listening',
      promptAr: 'استمع واختر الرقم الذي سمعته.',
      audioText: word,
      options,
      correctIndex,
    }
    return exercise
  }
  if (kind === 'reading') {
    const { options, correctIndex } = withOptions(word, wrongNumbers.map(numberToGerman))
    const exercise: MultipleChoiceExercise = {
      ...base,
      type: 'multiple-choice',
      promptAr: 'كيف يُقال هذا الرقم بالألمانية؟',
      questionDe: String(n),
      options,
      correctIndex,
    }
    return exercise
  }
  const exercise: FillBlankExercise = {
    ...base,
    type: 'fill-blank',
    promptAr: 'اكتب الرقم بالحروف، كلمة واحدة.',
    sentenceDe: `${n} = ___`,
    acceptedAnswers: numberSpellings(n),
    hint: numberToGerman(n).length > 12 ? `يبدأ بـ ${word.slice(0, 3)}…` : undefined,
  }
  return exercise
}

// ---- time ----

interface DrillTime {
  /** 1–12 for the informal clock, 0–23 for the formal one. */
  hour: number
  minute: number
}

function timeNote(time: DrillTime, phrase: string, style: 'informal' | 'formal', shown: string): string {
  const head = `${shown} = «${phrase}».`
  if (style === 'formal')
    return `${head} في الاستعمال الرسمي (القطارات والمواعيد) تُقال الساعة من 0 إلى 24، ثم Uhr، ثم الدقائق كرقم عادي.`
  if (time.minute === 30)
    return `${head} halb + الساعة القادمة: halb vier تعني نصف ساعة قبل الرابعة، أي 3:30، وليس 4:30.`
  if (time.minute === 15) return `${head} Viertel nach = والربع.`
  if (time.minute === 45) return `${head} Viertel vor + الساعة القادمة = إلا ربعاً.`
  if (time.minute === 25 || time.minute === 35)
    return `${head} نقيس بالنسبة إلى النصف: fünf vor halb = قبل النصف بخمس دقائق، وfünf nach halb = بعده بخمس دقائق.`
  return `${head} nach = بعد، وvor = قبل (الساعة القادمة).`
}

function randomTime(style: 'informal' | 'formal', level: CEFRLevel): DrillTime {
  if (style === 'informal') {
    const minutes = level === 'A1' ? [0, 15, 30, 45] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
    return { hour: randomInt(1, 12), minute: pick(minutes) }
  }
  return {
    hour: randomInt(0, 23),
    minute: level === 'A1' ? pick([0, 30]) : pick([0, 5, 10, 15, 20, 30, 45, randomInt(1, 59)]),
  }
}

/** Times a learner confuses with `time`: the hour on either side of "halb", the quarter hour, and the neighbours. */
function nearbyTimes(time: DrillTime, style: 'informal' | 'formal'): DrillTime[] {
  const wrap = (hour: number) => (style === 'informal' ? ((hour + 11 + 12) % 12) + 1 : (hour + 24) % 24)
  const shift = (hourDelta: number, minute: number): DrillTime => ({
    hour: wrap(time.hour + hourDelta),
    minute,
  })
  const step = style === 'informal' ? 15 : 5
  const candidates: DrillTime[] = [
    // "halb vier" is 3:30, and learners hear 4:30.
    shift(1, time.minute),
    shift(-1, time.minute),
    { hour: time.hour, minute: (time.minute + step) % 60 },
    { hour: time.hour, minute: (time.minute + 60 - step) % 60 },
    shift(1, (time.minute + 30) % 60),
  ]
  const seen = new Set([`${time.hour}:${time.minute}`])
  return candidates.filter((candidate) => {
    const key = `${candidate.hour}:${candidate.minute}`
    const informalOk = style === 'formal' || candidate.minute % 5 === 0
    const keep = informalOk && !seen.has(key)
    if (keep) seen.add(key)
    return keep
  })
}

const showTime = (time: DrillTime, style: 'informal' | 'formal'): string =>
  style === 'informal' ? `${time.hour}:${String(time.minute).padStart(2, '0')}` : formatClock(time)

function timeQuestion(kind: 'listening' | 'reading', level: CEFRLevel): Exercise {
  const style = pick<'informal' | 'formal'>(['informal', 'formal'])
  const time = randomTime(style, level)
  const phrase = timeToGerman(time, style)
  const shown = showTime(time, style)
  const wrong = nearbyTimes(time, style)
  const styleAr = style === 'informal' ? 'الصيغة اليومية (12 ساعة)' : 'الصيغة الرسمية (24 ساعة)'
  const base = {
    id: `gen-time-${kind}-${style}-${shown}-${uid()}`,
    level: 'A1' as CEFRLevel,
    explanationAr: timeNote(time, phrase, style, shown),
  }

  if (kind === 'listening') {
    const { options, correctIndex } = withOptions(
      shown,
      wrong.map((candidate) => showTime(candidate, style)),
    )
    const exercise: ListeningExercise = {
      ...base,
      type: 'listening',
      promptAr: `استمع واختر الوقت الذي سمعته — ${styleAr}.`,
      audioText: phrase,
      options,
      correctIndex,
    }
    return exercise
  }
  const { options, correctIndex } = withOptions(
    phrase,
    wrong.map((candidate) => timeToGerman(candidate, style)),
  )
  const exercise: MultipleChoiceExercise = {
    ...base,
    type: 'multiple-choice',
    promptAr: `كيف تقول هذا الوقت؟ — ${styleAr}.`,
    questionDe: shown,
    options,
    correctIndex,
  }
  return exercise
}

// ---- dates ----

function dateNote(day: number, month: number): string {
  return `${formatDate(day, month)} = «${dateToGerman(day, month, 'dative')}». الأرقام الترتيبية: 1–19 تنتهي بـ ‎-te‎ و20 فما فوق بـ ‎-ste‎، مع شواذّ: erste وdritte وsiebte وachte. وبعد am تُضاف ‎-n‎ (Dativ): am dritten.`
}

function dateQuestion(kind: 'listening' | 'reading' | 'writing'): Exercise {
  const day = randomInt(1, 31)
  const month = randomInt(1, 12)
  const phrase = dateToGerman(day, month, 'dative')
  const base = {
    id: `gen-date-${kind}-${formatDate(day, month)}-${uid()}`,
    level: 'A2' as CEFRLevel,
    explanationAr: dateNote(day, month),
  }

  if (kind === 'listening') {
    // 03.10. and 10.03. sound different in German, and 3 and 13 differ by one syllable.
    const wrong = [
      formatDate(month <= 31 ? month : day, day <= 12 ? day : month),
      formatDate(day > 13 ? day - 10 : day + 10 > 31 ? day - 1 : day + 10, month),
      formatDate(day, (month % 12) + 1),
      formatDate(day === 31 ? 30 : day + 1, month),
    ]
    const { options, correctIndex } = withOptions(formatDate(day, month), wrong)
    const exercise: ListeningExercise = {
      ...base,
      type: 'listening',
      promptAr: 'استمع واختر التاريخ الذي سمعته.',
      audioText: phrase,
      options,
      correctIndex,
    }
    return exercise
  }
  if (kind === 'reading') {
    const ordinal = ordinalToGerman(day)
    const name = MONTH_NAMES[month - 1]
    // The slips learners make: -n forgotten, a cardinal instead of an ordinal, and the neighbouring day.
    const wrong = [
      `am ${ordinal} ${name}`,
      `am ${numberToGerman(day)} ${name}`,
      dateToGerman(day === 31 ? 30 : day + 1, month, 'dative'),
      `der ${ordinal} ${name}`,
    ]
    const { options, correctIndex } = withOptions(phrase, wrong)
    const exercise: MultipleChoiceExercise = {
      ...base,
      type: 'multiple-choice',
      promptAr: 'كيف تقول هذا التاريخ مع am (في يوم كذا)؟',
      questionDe: formatDate(day, month),
      options,
      correctIndex,
    }
    return exercise
  }
  const exercise: FillBlankExercise = {
    ...base,
    type: 'fill-blank',
    promptAr: 'اكتب الرقم الترتيبي بنهايته الصحيحة بعد am.',
    sentenceDe: `Mein Geburtstag ist am ___ ${MONTH_NAMES[month - 1]}. (${day}.)`,
    acceptedAnswers: [`${ordinalToGerman(day)}n`],
  }
  return exercise
}

// ---- prices ----

function priceQuestion(kind: 'listening' | 'reading' | 'writing', level: CEFRLevel): Exercise {
  const euros = level === 'A1' ? randomInt(1, 20) : randomInt(1, 99)
  const cents = level === 'A1' ? pick([0, 20, 50, 90, 99]) : pick([0, 5, 10, 25, 50, 75, 99, randomInt(1, 99)])
  const total = euros * 100 + cents
  const phrase = priceToGerman(total)
  const shown = formatPrice(total)
  const base = {
    id: `gen-price-${kind}-${total}-${uid()}`,
    level: 'A1' as CEFRLevel,
    explanationAr: `${shown} = «${phrase}». نقرأ اليورو أولاً ثم السنتات كرقم عادي، ولا نقول «Komma»: drei Euro fünfzig.`,
  }
  const wrongEuros = fillDistractors(confusableNumbers(euros, 99), euros, 99, 2)
  const wrongCents = fillDistractors(confusableNumbers(cents, 99), cents, 99, 2)
  const wrongTotals = [
    wrongEuros[0] * 100 + cents,
    euros * 100 + wrongCents[0],
    wrongEuros[1] * 100 + wrongCents[1],
  ].filter((value) => value > 0)

  if (kind === 'listening') {
    const { options, correctIndex } = withOptions(shown, wrongTotals.map(formatPrice))
    const exercise: ListeningExercise = {
      ...base,
      type: 'listening',
      promptAr: 'استمع واختر السعر الذي سمعته.',
      audioText: phrase,
      options,
      correctIndex,
    }
    return exercise
  }
  if (kind === 'reading') {
    const { options, correctIndex } = withOptions(phrase, wrongTotals.map(priceToGerman))
    const exercise: MultipleChoiceExercise = {
      ...base,
      type: 'multiple-choice',
      promptAr: 'كيف يُقال هذا السعر؟',
      questionDe: shown,
      options,
      correctIndex,
    }
    return exercise
  }
  const exercise: FillBlankExercise = {
    ...base,
    type: 'fill-blank',
    promptAr: 'اكتب السعر بالحروف كما يُقال عند الدفع.',
    sentenceDe: `${shown} = ___`,
    acceptedAnswers: [phrase],
  }
  return exercise
}

// ---- sessions ----

/** What each kind needs from a level; dates are A2 grammar (ordinal numbers and the dative after "am"). */
export function isGeneratedKindAvailable(kind: GeneratedKind, level: CEFRLevel): boolean {
  return kind !== 'dates' || level !== 'A1'
}

/** A fresh session of generated questions, alternating hearing, reading and writing so each skill gets its turn. */
export function buildGeneratedDrill(kind: GeneratedKind, level: CEFRLevel, size: number = SESSION_SIZE): Exercise[] {
  const questions: Exercise[] = []
  const seen = new Set<string>()
  // The same question twice in one session would let the first answer give away the second.
  const key = (exercise: Exercise): string => {
    if (exercise.type === 'listening') return `${exercise.audioText}|l`
    if (exercise.type === 'multiple-choice') return `${exercise.questionDe}|r`
    if (exercise.type === 'fill-blank') return `${exercise.sentenceDe}|w`
    return exercise.id
  }
  const kinds = {
    numbers: ['listening', 'reading', 'writing'],
    time: ['listening', 'reading'],
    dates: ['listening', 'reading', 'writing'],
    prices: ['listening', 'reading', 'writing'],
  } as const
  const numberMax = level === 'A1' ? 100 : 999

  for (let attempt = 0; attempt < size * 12 && questions.length < size; attempt += 1) {
    const skill = kinds[kind][questions.length % kinds[kind].length]
    let exercise: Exercise
    if (kind === 'numbers') exercise = numberQuestion(skill as 'listening' | 'reading' | 'writing', numberMax)
    else if (kind === 'time') exercise = timeQuestion(skill as 'listening' | 'reading', level)
    else if (kind === 'dates') exercise = dateQuestion(skill as 'listening' | 'reading' | 'writing')
    else exercise = priceQuestion(skill as 'listening' | 'reading' | 'writing', level)
    const id = key(exercise)
    if (seen.has(id)) continue
    seen.add(id)
    questions.push(exercise)
  }
  return questions
}
