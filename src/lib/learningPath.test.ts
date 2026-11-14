import { describe, expect, it } from 'vitest'

import { LESSON_GRAMMAR_LINKS } from '@/data/grammar/lessonLinks'
import { LEVEL_PATHS } from '@/data/paths'
import { getLessonsForLevel, getNextLesson, getReadingTextsForLevel, getStandaloneConversationsForLevel } from '@/lib/curriculum'
import { getRoadmapEntries, isRulePublished } from '@/lib/grammarRoadmap'
import {
  countSteps,
  getChapterNumberOffset,
  getChapterProgress,
  getLevelChapters,
  getNextLessonInPath,
  getNextPlanStep,
  getPathLessons,
  getPathSteps,
  getResumeStep,
  stepKey,
} from '@/lib/learningPath'
import type { CEFRLevel, PathStep } from '@/types'

const stepsOf = (level: CEFRLevel): PathStep[] => (LEVEL_PATHS[level]?.chapters ?? []).flatMap((chapter) => chapter.steps)
const idsOf = (steps: readonly PathStep[], kind: PathStep['kind']) =>
  steps.flatMap((step) => (step.kind === kind && 'id' in step ? [step.id] : []))
const rulesOf = (steps: readonly PathStep[]) => steps.flatMap((step) => (step.kind === 'rule' ? [step.number] : []))

/** The plan as one flat list of step keys: A1, then A2. */
const planKeys = () => (['A1', 'A2'] as const).flatMap((level) => getPathSteps(level).map((step) => step.key))
const at = (key: string) => planKeys().indexOf(key)

describe.each(['A1', 'A2'] as const)('%s learning path', (level) => {
  const steps = stepsOf(level)

  it('places every lesson of the level exactly once, so no lesson drops out of the plan', () => {
    const lessonIds = getLessonsForLevel(level).map((lesson) => lesson.id)
    expect(idsOf(steps, 'lesson').sort()).toEqual([...lessonIds].sort())
  })

  it('places every published grammar rule of the level exactly once', () => {
    const rules = getRoadmapEntries(level)
      .filter((entry) => isRulePublished(entry.number))
      .map((entry) => entry.number)
    expect(rulesOf(steps).sort((a, b) => a - b)).toEqual(rules)
  })

  it('places every reading text of the level exactly once', () => {
    const texts = getReadingTextsForLevel(level).map((text) => text.id)
    expect(idsOf(steps, 'reading').sort()).toEqual([...texts].sort())
  })

  it('places every standalone conversation of the level exactly once', () => {
    const conversations = getStandaloneConversationsForLevel(level).map((dialogue) => dialogue.id)
    expect(idsOf(steps, 'conversation').sort()).toEqual([...conversations].sort())
  })

  it('has no chapter without steps and needs no catch-all chapter', () => {
    const chapters = getLevelChapters(level)
    expect(chapters.every((entry) => entry.steps.length > 0)).toBe(true)
    expect(chapters.some((entry) => entry.chapter.id === 'weitere-lektionen')).toBe(false)
  })

  it('resolves every step it lists (a mistyped id would silently vanish otherwise)', () => {
    const resolved = getPathSteps(level).length
    expect(resolved).toBe(steps.length)
  })

  it('gives every chapter at least one lesson to anchor it', () => {
    for (const entry of getLevelChapters(level)) expect(entry.lessons.length, entry.chapter.id).toBeGreaterThan(0)
  })

  it('puts a grammar rule after the first lesson that practises it', () => {
    for (const number of rulesOf(steps)) {
      const linked = Object.entries(LESSON_GRAMMAR_LINKS)
        .filter(([, numbers]) => numbers.includes(number))
        .map(([lessonId]) => at(`lesson:${lessonId}`))
        .filter((index) => index !== -1)
      if (linked.length === 0) continue
      expect(at(`rule:${number}`), `rule ${number}`).toBeGreaterThan(Math.min(...linked))
    }
  })
})

describe('the plan as one sequence', () => {
  it('uses every rule once across both levels', () => {
    const all = [...rulesOf(stepsOf('A1')), ...rulesOf(stepsOf('A2'))]
    expect(new Set(all).size).toBe(all.length)
  })

  it('keeps every rule at the level the grammar roadmap gives it', () => {
    const levelOfRule = new Map(getRoadmapEntries().map((entry) => [entry.number, entry.level]))
    for (const level of ['A1', 'A2'] as const) {
      for (const number of rulesOf(stepsOf(level))) expect(levelOfRule.get(number), `rule ${number}`).toBe(level)
    }
  })

  it('numbers the chapters through the whole plan: A2 carries on where A1 stops', () => {
    expect(getChapterNumberOffset('A1')).toBe(0)
    expect(getChapterNumberOffset('A2')).toBe(getLevelChapters('A1').length)
    expect(getChapterNumberOffset('B1')).toBe(getLevelChapters('A1').length + getLevelChapters('A2').length)
  })

  it('moves on from the last A1 step to the first A2 step when both levels are loaded', () => {
    const lastA1 = getPathSteps('A1').at(-1)
    const firstA2 = getPathSteps('A2')[0]
    expect(lastA1 && getNextPlanStep(lastA1.key)?.step.key).toBe(firstA2.key)
    expect(lastA1 && getNextPlanStep(lastA1.key)?.startsChapter).toBe(true)
  })

  it('has nothing after the last step of the plan', () => {
    const last = getPathSteps('A2').at(-1)
    expect(last && getNextPlanStep(last.key)).toBeUndefined()
  })

  it('knows nothing about a step that is not on the plan', () => {
    expect(getNextPlanStep('lesson:does-not-exist')).toBeUndefined()
  })
})

/**
 * Why each text and conversation sits where it does: it must come after the lessons and rules it leans on.
 * Written out so that moving a text earlier than its grammar fails here, with the reason next to it.
 */
const COMES_AFTER: ReadonlyArray<readonly [step: string, after: readonly string[], why: string]> = [
  // A1
  ['story:a1-read-01', ['lesson:a1-m01-l04'], 'says an age, so the numbers come first'],
  ['story:a1-read-02', ['lesson:a1-m02-l04', 'lesson:a1-m02-l03'], 'the day told by the clock'],
  ['story:a1-read-03', ['lesson:a1-m02-l01', 'rule:9'], 'family words and the Akkusativ (wir haben eine Katze)'],
  ['story:a1-read-04', ['lesson:a1-m04-l01'], 'the position prepositions of the room lesson'],
  ['story:a1-read-14', ['rule:8'], 'kein: the negation lesson and rule'],
  ['story:a1-read-12', ['rule:10'], 'ihre Haare: the possessive articles'],
  ['story:a1-read-16', ['rule:12'], 'steht auf, fährt los: separable verbs'],
  ['story:a1-read-15', ['rule:12', 'rule:15'], 'rufen an, lade ein, schenkt mir: separable verbs and the Dativ'],
  ['story:a1-read-06', ['rule:14'], 'mit der U-Bahn, an der Elbe: the prepositions'],
  ['story:a1-read-07', ['lesson:a1-m14-l01', 'rule:9'], 'shopping and the Akkusativ'],
  ['story:a1-read-11', ['lesson:a1-m19-l01', 'rule:8'], 'food, and kein Fleisch'],
  ['story:a1-read-05', ['lesson:a1-m19-l01', 'rule:11'], 'ich möchte: the modal verbs'],
  ['story:a1-read-08', ['lesson:a1-m15-l01', 'lesson:a1-m18-l01', 'rule:12'], 'weather and clothes; nehme … mit is separable'],
  ['story:a1-read-09', ['lesson:a1-m17-l01', 'lesson:a1-m20-l01', 'rule:11'], 'hobbies, how often, ich kann'],
  ['story:a1-read-17', ['lesson:a1-m17-l01', 'rule:11'], 'free time and möchten'],
  ['story:a1-read-10', ['rule:12', 'rule:11'], 'fährt … ab, steige ein: separable verbs'],
  ['story:a1-read-13', ['lesson:a1-m09-l01'], 'spricht, liest: the irregular verbs of the course story'],
  ['story:dialogue-a1-neue-nachbarn', ['rule:16', 'lesson:a1-m04-l01'], 'über dir, kommst du vorbei; the Wohnung lesson'],
  ['story:dialogue-a1-am-telefon', ['rule:11'], 'wollen wir, soll ich: the modal verbs'],
  ['story:dialogue-a1-in-der-apotheke', ['rule:13', 'rule:8', 'lesson:a1-m05-l01'], 'nehmen Sie: the Imperativ; kein Fieber; the body'],
  ['story:dialogue-a1-zahlen-bitte', ['lesson:a1-m19-l01', 'lesson:a1-m14-l01'], 'the restaurant bill'],
  ['story:dialogue-a1-im-hotel', ['lesson:a1-m01-l04', 'lesson:a1-m02-l04'], 'room numbers and breakfast times'],
  ['story:dialogue-a1-anmeldung-deutschkurs', ['rule:11', 'rule:13', 'lesson:a1-m01-l03'], 'können Sie, füllen Sie aus; spelling a name'],
  ['lesson:a1-m16-l01', ['rule:13'], 'directions are given in the Imperativ'],
  ['lesson:a1-m01-l07', ['lesson:a1-m01-l06'], 'Woher kommst du? comes first; the answer needs the countries'],
  ['story:dialogue-a1-im-deutschkurs', ['lesson:a1-m01-l08'], 'the classroom phrases it practises'],
  ['lesson:a1-m01-l09', ['lesson:a1-m01-l04'], 'hundreds and thousands build on the numbers up to 99'],
  ['lesson:a1-m01-l10', ['lesson:a1-m01-l03', 'lesson:a1-m01-l09'], 'a form needs the alphabet (spelling) and the numbers (phone, postcode)'],
  ['story:dialogue-a1-telefonnummer', ['lesson:a1-m01-l09', 'lesson:a1-m01-l10'], 'reading a phone number and an e-mail address aloud'],
  ['lesson:a1-m06-l02', ['lesson:a1-m06-l01', 'rule:11'], 'nicht müssen / nicht dürfen only make sense once the modal verbs are known'],
  ['story:dialogue-a1-verabredung', ['lesson:a1-m06-l02', 'rule:11'], 'wollen wir, du musst nicht, du darfst nicht'],
  ['lesson:a1-m14-l02', ['lesson:a1-m14-l01'], 'quantities follow the shopping lesson'],
  ['story:dialogue-a1-im-supermarkt', ['lesson:a1-m14-l02', 'lesson:a1-m01-l09'], 'ein Kilo, zweihundert Gramm, the price'],
  ['lesson:a1-m21-l01', ['lesson:a1-m11-l01', 'rule:9'], 'zum / zur / ins and Gibt es hier einen …?: prepositions and the Akkusativ'],
  ['lesson:a1-m21-l04', ['lesson:a1-m02-l03'], 'the parts of the day extend the day told by the clock'],
  ['lesson:a1-m21-l05', ['lesson:a1-m10-l01', 'lesson:a1-m11-l01'], 'fährt … ab, steigt um: separable verbs; mit dem Bus: the prepositions'],
  ['lesson:a1-m21-l06', ['lesson:a1-m10-l01'], 'aussehen is a separable verb'],
  ['story:dialogue-a1-am-fahrkartenschalter', ['lesson:a1-m21-l05', 'lesson:a1-m01-l09'], 'tickets, platforms and prices'],
  ['story:dialogue-a1-auf-der-post', ['lesson:a1-m21-l01', 'rule:13', 'lesson:a1-m14-l02'], 'legen Sie: the Imperativ; weights and prices'],
  ['lesson:a1-m02-l06', ['lesson:a1-m02-l05'], 'the date builds on days and months'],
  ['lesson:a1-m02-l04', ['lesson:a1-m02-l06'], 'the date comes before the clock'],
  // A2
  ['rule:17', ['lesson:a1-m12-l01'], 'A1 previews Perfekt; the roadmap rule is the A2 chapter on the past'],
  ['story:a2-read-05', ['rule:18', 'rule:17'], 'war, hatte and Perfekt'],
  ['story:a2-read-01', ['rule:17', 'rule:31', 'rule:22'], 'Perfekt told as a story, habe mich getroffen'],
  ['story:a2-read-10', ['rule:17', 'rule:31', 'rule:22'], 'Perfekt told as a story, uns gelegt'],
  ['story:a2-read-14', ['rule:28', 'rule:29', 'rule:18'], 'hatte, musste, durfte; weil and wenn clauses'],
  ['story:a2-read-02', ['rule:29'], 'weil and dass clauses'],
  ['story:a2-read-11', ['lesson:a2-m08-l01', 'rule:29'], 'relative clause (in der er früher gearbeitet hat), wenn, dass'],
  ['story:a2-read-04', ['rule:29', 'rule:17'], 'weil, Perfekt'],
  ['story:a2-read-16', ['rule:29', 'rule:17'], 'dass, Perfekt'],
  ['story:a2-read-17', ['rule:29', 'lesson:a2-m08-l01'], 'dass, weil, relative clause (Automaten, die einen Bon ausdrucken)'],
  ['story:a2-read-03', ['rule:29', 'rule:22'], 'dass, mich ausruhen'],
  ['story:a2-read-07', ['lesson:a2-m10-l01', 'rule:29', 'rule:26'], 'um … zu, wenn, mehr als früher'],
  ['story:a2-read-06', ['lesson:a2-m07-l01', 'rule:32'], 'werde … besuchen: Futur I'],
  ['story:a2-read-15', ['lesson:a2-m07-l01', 'lesson:a2-m10-l01', 'rule:32'], 'Futur I, um … zu, ob, dass'],
  ['story:a2-read-12', ['lesson:a2-m10-l01', 'rule:29'], 'weil, um … zu, wenn'],
  ['story:a2-read-09', ['rule:29', 'rule:17'], 'weil, Perfekt'],
  ['story:a2-read-13', ['lesson:a2-m07-l01', 'lesson:a2-m08-l01'], 'werde, and the relative clause (Die Band, die wir sehen wollten)'],
  ['story:a2-read-08', ['lesson:a2-m07-l01', 'lesson:a2-m08-l01', 'rule:29'], 'wird, relative clause (den sie gern mag), dass'],
  ['story:a2-read-18', ['lesson:a2-m07-l01', 'lesson:a2-m14-l01'], 'werde, and the festival lesson'],
  ['story:dialogue-a2-vorstellungsgespraech', ['lesson:a2-m10-l01', 'rule:29'], 'um besser zu werden, wenn Sie möchten'],
  ['story:dialogue-a2-gestern-im-buero', ['lesson:a2-m09-l01', 'rule:18'], 'war, hatte, wollte; wissen, ob …'],
  ['story:dialogue-a2-im-handyshop', ['lesson:a2-m08-l01', 'lesson:a2-m15-l02'], 'das Teil, das …; repairs and prices'],
  ['story:dialogue-a2-beim-buergeramt', ['lesson:a2-m09-l01', 'lesson:a2-m15-l10'], 'ob ich verheiratet bin; the forms lesson'],
  ['story:dialogue-a2-am-informationsschalter', ['lesson:a2-m09-l01', 'lesson:a2-m15-l05'], 'indirect questions; the transport vocabulary'],
  ['story:dialogue-a2-am-flughafen', ['lesson:a2-m11-l01'], 'travel vocabulary'],
  ['lesson:a2-m22-l01', ['rule:17', 'rule:18', 'rule:31'], 'recognising the Präteritum builds on the Perfekt and on war / hatte'],
  ['lesson:a2-m20-l01', ['rule:29'], 'deshalb is contrasted with weil, so the weil clause comes first'],
  ['lesson:a2-m20-l02', ['lesson:a2-m16-l01', 'rule:29'], 'könnten / würde (polite requests) and the dass clause'],
  ['story:dialogue-a2-wochenende-planen', ['lesson:a2-m20-l01', 'lesson:a2-m20-l02'], 'deshalb, trotzdem, wir könnten, du solltest'],
  ['lesson:a2-m19-l01', ['rule:19', 'rule:20', 'rule:21'], 'Dativ verbs follow the Akkusativ / Dativ rules and the position prepositions'],
  ['lesson:a2-m19-l02', ['lesson:a2-m09-l01', 'rule:29'], 'wissen + ob / wo / dass needs the indirect questions and the dass clause'],
  ['story:dialogue-a2-neue-wohnung', ['lesson:a2-m19-l01', 'lesson:a2-m19-l02'], 'gefällt mir, gehört, passt; kennst du, ich weiß nicht, wie sie heißt'],
  ['lesson:a2-m21-l01', ['lesson:a2-m05-l01'], 'N-Deklination follows the adjective endings'],
  ['lesson:a2-m21-l02', ['lesson:a2-m05-l01'], 'the Dativ endings follow the Nominativ and Akkusativ endings'],
  ['story:dialogue-a2-neue-kollegen', ['lesson:a2-m21-l01', 'lesson:a2-m21-l02'], 'den Kollegen, dem neuen Kollegen, mit dem freundlichen Team'],
  ['lesson:a2-m22-l02', ['lesson:a2-m13-l01', 'lesson:a2-m15-l04'], 'the new home: Anmeldung and Hausordnung follow the flat-hunting lessons'],
  ['story:dialogue-a2-im-treppenhaus', ['lesson:a2-m22-l02'], 'Pfand, Tonne, Anmeldung, Nachtruhe'],
  ['story:dialogue-a2-im-hotel', ['lesson:a2-m15-l13'], 'the hotel vocabulary'],
  ['story:dialogue-a2-arzttermin', ['lesson:a2-m12-l01', 'rule:29'], 'weil; the doctor lesson'],
  ['story:dialogue-a2-treffen-absagen', ['lesson:a2-m12-l01', 'rule:22', 'rule:29'], 'weil ich Fieber habe; interessiert sich'],
  ['story:dialogue-a2-ein-geschenk', ['rule:19', 'rule:25'], 'ihn, Ihrer Mutter; einen warmen Schal'],
  ['story:dialogue-a2-im-fundbuero', ['lesson:a2-m06-l01', 'rule:33'], 'die Tasche meiner Schwester, der Fahrer des Busses: the Genitiv'],
  ['story:dialogue-a2-urlaubsplaene', ['lesson:a2-m07-l01', 'rule:32'], 'ich werde … fliegen: Futur I'],
  ['story:dialogue-a2-auf-der-bank', ['lesson:a2-m15-l02'], 'the bank vocabulary'],
  ['story:dialogue-a2-beim-friseur', ['lesson:a2-m15-l02'], 'services and prices'],
  ['story:dialogue-a2-beschwerde-im-restaurant', ['lesson:a2-m15-l03', 'rule:29'], 'weil, dass; the restaurant vocabulary'],
  ['story:dialogue-a2-zuckerfest', ['lesson:a2-m14-l01'], 'the festival lesson'],
  ['lesson:a2-m17-l01', ['lesson:a2-m15-l12', 'rule:17'], 'seit + Präsens versus vor + Perfekt: after the past tenses and the time-and-sequence lesson'],
  ['story:dialogue-a2-im-fitnessstudio', ['lesson:a2-m17-l01'], 'seit wann, ab dem, bis, vor drei Jahren: the time expressions'],
  ['lesson:a2-m16-l01', ['lesson:a2-m01-l01', 'lesson:a2-m15-l02'], 'etwas langsamer (Komparativ); the shop, bank and office situations it is used in'],
  ['story:dialogue-a2-hilfe-vom-nachbarn', ['lesson:a2-m16-l01'], 'könnten Sie, würden Sie: the polite requests'],
  ['story:dialogue-a2-auf-der-bank', ['lesson:a2-m16-l01'], 'polite requests at the counter'],
  ['lesson:a2-m18-l01', ['lesson:a2-m15-l11', 'rule:19', 'rule:22'], 'a fixed preposition with its Akkusativ or Dativ; the reflexive verbs among them'],
  ['story:dialogue-a2-pruefungsstress', ['lesson:a2-m18-l01'], 'Angst haben vor, warten auf, sich interessieren für, träumen von, sich freuen auf'],
  // lessons that lean on earlier lessons
  ['lesson:a2-m04-l01', ['lesson:a2-m02-l01'], 'the past before the reflexive verbs'],
  ['lesson:a2-m08-l01', ['lesson:a2-m03-l01'], 'subordinate clauses before the relative clauses that build on them'],
]

describe('the order of the plan', () => {
  it.each(COMES_AFTER)('%s comes after %j (%s)', (step, after) => {
    expect(at(step), `${step} is on the plan`).toBeGreaterThan(-1)
    for (const earlier of after) {
      expect(at(earlier), `${earlier} is on the plan`).toBeGreaterThan(-1)
      expect(at(earlier), `${earlier} before ${step}`).toBeLessThan(at(step))
    }
  })

  it('teaches letters, then days and time, then the grammar foundation', () => {
    const order = getPathLessons('A1').map((lesson) => lesson.slug)
    const index = (slug: string) => order.indexOf(slug)
    expect(index('alphabet')).toBeGreaterThan(-1)
    expect(index('alphabet')).toBeLessThan(index('wochentage-monate'))
    expect(index('wochentage-monate')).toBeLessThan(index('uhrzeit'))
    expect(index('uhrzeit')).toBeLessThan(index('personalpronomen'))
    expect(index('personalpronomen')).toBeLessThan(index('sein'))
  })

  it('introduces sein and haben before the lessons that rely on them (Familie, Berufe)', () => {
    const order = getPathLessons('A1').map((lesson) => lesson.slug)
    expect(order.indexOf('sein')).toBeLessThan(order.indexOf('familie'))
    expect(order.indexOf('haben')).toBeLessThan(order.indexOf('familie'))
  })

  it('teaches reflexive verbs before the A2 vocabulary lessons that use them', () => {
    const order = getPathLessons('A2').map((lesson) => lesson.slug)
    const reflexive = order.indexOf('reflexive-verben')
    expect(reflexive).toBeGreaterThan(-1)
    for (const slug of ['arbeit-und-beruf', 'zeit-und-ablauf', 'aemter-und-formulare', 'freizeit-und-medien', 'gesundheit-und-krankheit', 'gefuehle-und-charakter', 'urlaub-und-hotel']) {
      expect(order.indexOf(slug), slug).toBeGreaterThan(reflexive)
    }
  })

  it('puts the new A1 lessons where the chapter needs them', () => {
    // Question words follow "Sich vorstellen"; the date sits between the days and the clock.
    const order = getPathLessons('A1').map((lesson) => lesson.id)
    expect(order.indexOf('a1-m01-l06')).toBe(order.indexOf('a1-m01-l02') + 1)
    expect(order.indexOf('a1-m02-l06')).toBe(order.indexOf('a1-m02-l05') + 1)
  })
})

describe('next lesson on the path', () => {
  it('follows the path, not module order', () => {
    expect(getNextLesson('a1-m01-l04')?.id).toBe('a1-m01-l09')
    expect(getNextLesson('a1-m01-l09')?.id).toBe('a1-m01-l10')
    expect(getNextLesson('a1-m01-l10')?.id).toBe('a1-m02-l05')
    expect(getNextLesson('a1-m02-l05')?.id).toBe('a1-m02-l06')
    expect(getNextLesson('a1-m02-l06')?.id).toBe('a1-m02-l04')
    expect(getNextLesson('a1-m02-l04')?.id).toBe('a1-m02-l03')
    expect(getNextLesson('a1-m02-l03')?.id).toBe('a1-m21-l04')
    expect(getNextLesson('a1-m21-l04')?.id).toBe('a1-m01-l05')
    expect(getNextLesson('a2-m04-l01')?.id).toBe('a2-m22-l01')
    expect(getNextLesson('a2-m22-l01')?.id).toBe('a2-m15-l12')
    expect(getNextLesson('a2-m15-l10')?.id).toBe('a2-m03-l01')
  })

  it('has no next lesson after the last one of a level', () => {
    for (const level of ['A1', 'A2'] as const) {
      const last = getPathLessons(level).at(-1)
      expect(last).toBeDefined()
      expect(last && getNextLessonInPath(last)).toBeUndefined()
    }
  })
})

describe('levels without a hand-made path', () => {
  it('fall back to one chapter per module, in module order', () => {
    // A2 has a hand-made path today, so take it away for this test to exercise the fallback.
    const handMade = LEVEL_PATHS.A2
    delete LEVEL_PATHS.A2
    try {
      const chapters = getLevelChapters('A2')
      expect(chapters.length).toBeGreaterThan(0)
      expect(chapters.flatMap((entry) => entry.lessons).map((lesson) => lesson.id)).toEqual(getLessonsForLevel('A2').map((lesson) => lesson.id))
      expect(chapters.every((entry) => entry.steps.every((step) => step.kind === 'lesson'))).toBe(true)
    } finally {
      LEVEL_PATHS.A2 = handMade
    }
  })

  it('return no chapters for a level with no content', () => {
    expect(getLevelChapters('B1')).toEqual([])
  })
})

describe('stepKey and countSteps', () => {
  it('gives lessons, rules and stories distinct keys', () => {
    expect(stepKey({ kind: 'lesson', id: 'a1-m01-l01' })).toBe('lesson:a1-m01-l01')
    expect(stepKey({ kind: 'rule', number: 3 })).toBe('rule:3')
    expect(stepKey({ kind: 'reading', id: 'a1-read-01' })).toBe('story:a1-read-01')
    expect(stepKey({ kind: 'conversation', id: 'dialogue-a1-am-telefon' })).toBe('story:dialogue-a1-am-telefon')
  })

  it('counts the steps of each kind', () => {
    expect(countSteps([{ kind: 'lesson' }, { kind: 'lesson' }, { kind: 'rule' }, { kind: 'reading' }])).toEqual({ lesson: 2, rule: 1, reading: 1, conversation: 0 })
  })

  it('adds up to the whole level', () => {
    const counts = countSteps(getPathSteps('A1'))
    expect(counts.lesson).toBe(getLessonsForLevel('A1').length)
    expect(counts.rule).toBe(16)
    expect(counts.reading).toBe(getReadingTextsForLevel('A1').length)
    expect(counts.conversation).toBe(getStandaloneConversationsForLevel('A1').length)
  })
})

describe('getChapterProgress', () => {
  it('marks exactly one chapter as current: the one holding the first unfinished step', () => {
    const chapters = getLevelChapters('A1')
    const done = new Set(chapters[0].steps.map((step) => step.key))
    const progress = getChapterProgress(chapters, done)
    expect(progress[0].state).toBe('done')
    expect(progress[1].state).toBe('current')
    expect(progress.filter((entry) => entry.state === 'current')).toHaveLength(1)
  })

  it('counts every kind of step, not only lessons', () => {
    const chapters = getLevelChapters('A1')
    const [first, second] = chapters
    // Finishing the lessons of a chapter that also holds a text does not finish the chapter.
    const lessonsOnly = new Set(second.lessons.map((lesson) => `lesson:${lesson.id}`))
    const progress = getChapterProgress(chapters, lessonsOnly)
    expect(first.steps.length).toBeGreaterThan(0)
    expect(second.steps.length).toBeGreaterThan(second.lessons.length)
    expect(progress[1].completed).toBe(second.lessons.length)
    expect(progress[1].state).not.toBe('done')
  })

  it('prefers the chapter of the lesson the learner is on', () => {
    const chapters = getLevelChapters('A1')
    const progress = getChapterProgress(chapters, new Set(), 'a1-m03-l01')
    expect(chapters[progress.findIndex((entry) => entry.state === 'current')].lessons.map((lesson) => lesson.id)).toContain('a1-m03-l01')
  })
})

describe('getResumeStep', () => {
  it('starts at the first step of the plan', () => {
    expect(getResumeStep(getLevelChapters('A1'), new Set())?.key).toBe('lesson:a1-m01-l01')
  })

  it('goes to the first step not done, whatever its kind', () => {
    const chapters = getLevelChapters('A1')
    const done = new Set([
      'lesson:a1-m01-l01',
      'lesson:a1-m01-l02',
      'lesson:a1-m01-l06',
      'lesson:a1-m01-l07',
      'lesson:a1-m01-l08',
      'story:dialogue-a1-im-deutschkurs',
      'lesson:a1-m01-l03',
      'lesson:a1-m01-l04',
      'lesson:a1-m01-l09',
      'lesson:a1-m01-l10',
      'story:dialogue-a1-telefonnummer',
    ])
    // The next step in chapter 2 is the text, not the next lesson.
    expect(getResumeStep(chapters, done)?.key).toBe('story:a1-read-01')
  })

  it('resumes the lesson the learner is on when it is still open', () => {
    expect(getResumeStep(getLevelChapters('A1'), new Set(), 'a1-m03-l02')?.key).toBe('lesson:a1-m03-l02')
  })

  it('returns nothing when everything is done', () => {
    const chapters = getLevelChapters('A1')
    const all = new Set(chapters.flatMap((entry) => entry.steps.map((step) => step.key)))
    expect(getResumeStep(chapters, all)).toBeUndefined()
  })
})
