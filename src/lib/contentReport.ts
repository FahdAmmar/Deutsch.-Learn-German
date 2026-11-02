import { COLLOCATIONS } from '@/data/collocations'
import { CASE_FRAMES } from '@/data/caseDrill'
import { COMPOUNDS } from '@/data/compounds'
import { getExamSetsForLevel } from '@/data/exam'
import { getPublishedCount, getRoadmapEntries } from '@/lib/grammarRoadmap'
import { WORD_FAMILIES } from '@/data/wordFamilies'
import { WORD_ORDER_SENTENCES, ORDER_PATTERNS } from '@/data/wordOrder'
import { getWritingTasksForLevel } from '@/data/writing'
import { getDialoguesForLevel, getModulesForLevel, getReadingTextsForLevel, getVocabularyForLevel } from '@/lib/curriculum'
import type { CEFRLevel, ExerciseType, VocabularyItem } from '@/types'

/**
 * What the content of one level amounts to, and where it is thin. Read-only: it counts, and lists the
 * things an author would want to fix, but it never changes anything and is not a test. The tests in
 * `data/` guard what must hold; this answers "how much is there, and what is missing?".
 */
export interface LevelReport {
  level: CEFRLevel
  modules: number
  lessons: number
  exercises: number
  exercisesByType: Partial<Record<ExerciseType, number>>
  vocabulary: number
  nouns: number
  readingTexts: number
  dialogues: number
  grammar: { written: number; planned: number }
  practice: {
    collocations: number
    wordFamilyWords: number
    wordOrderSentences: number
    caseFrames: number
    compounds: number
    examSets: number
    writingTasks: number
  }
  /** Where the level is thin: each entry is one thing to look at, with the ids to look at it by. */
  gaps: {
    lessonsWithoutExercises: string[]
    lessonsWithoutVocabulary: string[]
    wordsWithoutExample: string[]
    nounsWithoutPlural: string[]
    dialoguesWithoutGermanTitle: string[]
  }
}

const isNoun = (item: VocabularyItem): boolean => item.partOfSpeech === 'noun' && item.article !== undefined

/** A noun needs a plural unless the data says it has none in normal use, or only has one. */
const lacksPlural = (item: VocabularyItem): boolean => isNoun(item) && !item.plural && item.numberUse === undefined

export function buildLevelReport(level: CEFRLevel): LevelReport {
  const modules = getModulesForLevel(level)
  const lessons = modules.flatMap((module) => module.lessons)
  const exercises = lessons.flatMap((lesson) => lesson.exercises)
  const vocabulary = getVocabularyForLevel(level)
  const exercisesByType: Partial<Record<ExerciseType, number>> = {}
  for (const exercise of exercises) exercisesByType[exercise.type] = (exercisesByType[exercise.type] ?? 0) + 1

  const reaches = (itemLevel: CEFRLevel): boolean => itemLevel === level || (level === 'A2' && itemLevel === 'A1')
  const patternLevel = new Map(ORDER_PATTERNS.map((pattern) => [pattern.id, pattern.level]))

  return {
    level,
    modules: modules.length,
    lessons: lessons.length,
    exercises: exercises.length,
    exercisesByType,
    vocabulary: vocabulary.length,
    nouns: vocabulary.filter(isNoun).length,
    readingTexts: getReadingTextsForLevel(level).length,
    dialogues: getDialoguesForLevel(level).length,
    grammar: { written: getPublishedCount(level), planned: getRoadmapEntries(level).length },
    practice: {
      collocations: COLLOCATIONS.filter((entry) => reaches(entry.level)).length,
      wordFamilyWords: WORD_FAMILIES.flatMap((family) => family.members).filter((member) => reaches(member.level)).length,
      wordOrderSentences: WORD_ORDER_SENTENCES.filter((sentence) => {
        const itemLevel = patternLevel.get(sentence.pattern)
        return itemLevel !== undefined && reaches(itemLevel)
      }).length,
      caseFrames: CASE_FRAMES.filter((frame) => reaches(frame.level)).length,
      compounds: COMPOUNDS.length,
      examSets: getExamSetsForLevel(level).length,
      writingTasks: getWritingTasksForLevel(level).length,
    },
    gaps: {
      lessonsWithoutExercises: lessons.filter((lesson) => lesson.exercises.length === 0).map((lesson) => lesson.id),
      lessonsWithoutVocabulary: lessons.filter((lesson) => lesson.vocabulary.length === 0).map((lesson) => lesson.id),
      wordsWithoutExample: vocabulary.filter((item) => !item.example).map((item) => item.id),
      nounsWithoutPlural: vocabulary.filter(lacksPlural).map((item) => item.id),
      dialoguesWithoutGermanTitle: getDialoguesForLevel(level)
        .filter((dialogue) => !dialogue.titleDe)
        .map((dialogue) => dialogue.id),
    },
  }
}

const GAP_LABELS: Record<keyof LevelReport['gaps'], string> = {
  lessonsWithoutExercises: 'دروس بلا تمارين',
  lessonsWithoutVocabulary: 'دروس بلا مفردات',
  wordsWithoutExample: 'كلمات بلا جملة مثال',
  nounsWithoutPlural: 'أسماء بلا جمع (ولم يُحدَّد أنها بلا جمع)',
  dialoguesWithoutGermanTitle: 'محادثات بلا عنوان ألماني',
}

/** The report as plain text, one block per level. `sampleSize` caps how many ids are listed under each gap. */
export function formatReport(reports: readonly LevelReport[], sampleSize = 8): string {
  const lines: string[] = []
  for (const report of reports) {
    const { practice, grammar } = report
    lines.push(
      `── ${report.level} ──────────────────────────────`,
      `الوحدات ${report.modules} · الدروس ${report.lessons} · التمارين ${report.exercises}`,
      `المفردات ${report.vocabulary} (أسماء ${report.nouns}) · نصوص ${report.readingTexts} · محادثات ${report.dialogues}`,
      `القواعد: ${grammar.written} من ${grammar.planned} مكتوبة`,
      `التدريبات: تلازمات ${practice.collocations} · كلمات عائلات ${practice.wordFamilyWords} · جمل ترتيب ${practice.wordOrderSentences} · قوالب حالات ${practice.caseFrames} · مركّبات ${practice.compounds} · امتحان ${practice.examSets} · كتابة ${practice.writingTasks}`,
      `أنواع التمارين: ${Object.entries(report.exercisesByType)
        .map(([type, count]) => `${type} ${count}`)
        .join(' · ')}`,
    )
    const gapEntries = (Object.keys(report.gaps) as (keyof LevelReport['gaps'])[]).filter((key) => report.gaps[key].length > 0)
    if (gapEntries.length === 0) lines.push('لا نواقص.')
    for (const key of gapEntries) {
      const ids = report.gaps[key]
      const shown = ids.slice(0, sampleSize).join(', ')
      lines.push(`⚠ ${GAP_LABELS[key]}: ${ids.length}${shown ? ` — ${shown}${ids.length > sampleSize ? ', …' : ''}` : ''}`)
    }
    lines.push('')
  }
  return lines.join('\n')
}
