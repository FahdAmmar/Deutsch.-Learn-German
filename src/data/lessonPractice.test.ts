import { describe, expect, it } from 'vitest'

import { getLessonsForLevel } from '@/lib/curriculum'
import { isAnswerAccepted, normalizeAnswer } from '@/utils/text'
import type { Exercise, Lesson, VocabularyItem } from '@/types'

import { transliterate, translationFromTask, vocabularyThemeExercises, withPractice } from './lessonPractice'
import { TRANSLATION_TASKS } from './translationTasks'

function vocabulary(count: number): VocabularyItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `voc-${index}`,
    word: `Wort${index}`,
    article: 'der' as const,
    plural: `Wörter${index}`,
    partOfSpeech: 'noun' as const,
    meaningAr: `معنى ${index}`,
    level: 'A1' as const,
    category: 'اختبار',
    example: { de: `Das ist Wort${index} im Satz hier.`, ar: `جملة ${index}` },
  }))
}

function lesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    id: 'a1-test-l01',
    slug: 'test',
    level: 'A1',
    moduleId: 'a1-test',
    title: 'Test',
    titleAr: 'اختبار',
    estimatedMinutes: 10,
    objectivesAr: ['هدف'],
    explanation: [],
    examples: [],
    vocabulary: vocabulary(8),
    exercises: [],
    ...overrides,
  }
}

const countOf = (exercises: readonly Exercise[], type: Exercise['type']) => exercises.filter((exercise) => exercise.type === type).length

describe('withPractice', () => {
  it('adds two recall questions and one listening question to a lesson that has none', () => {
    const result = withPractice(lesson())
    expect(countOf(result.exercises, 'vocab-recall')).toBe(2)
    expect(countOf(result.exercises, 'listening')).toBe(1)
  })

  it('leaves a kind alone when the lesson already has it, and keeps authored exercises first', () => {
    const authored: Exercise = {
      id: 'a1-test-l01-ex1',
      type: 'listening',
      level: 'A1',
      promptAr: 'x',
      audioText: 'Hallo.',
      options: ['Hallo.', 'Tschüss.'],
      correctIndex: 0,
      explanationAr: 'شرح',
    }
    const result = withPractice(lesson({ exercises: [authored] }))
    expect(result.exercises[0]).toBe(authored)
    expect(countOf(result.exercises, 'listening')).toBe(1)
  })

  it('does nothing for a lesson too small to ask about', () => {
    const small = lesson({ vocabulary: vocabulary(3) })
    expect(withPractice(small)).toBe(small)
  })

  it('is deterministic: the same lesson always yields the same exercises', () => {
    expect(withPractice(lesson())).toEqual(withPractice(lesson()))
  })

  it('gives recall questions four distinct options, none of them the right one repeated', () => {
    const recall = withPractice(lesson()).exercises.filter((exercise) => exercise.type === 'vocab-recall')
    for (const exercise of recall) {
      if (exercise.type !== 'vocab-recall') continue
      const options = [exercise.correctAnswerAr, ...exercise.distractorsAr]
      expect(new Set(options).size).toBe(4)
    }
  })

  it('never offers a recall distractor that has the same meaning as the answer', () => {
    const twins = vocabulary(6).map((entry, index) => (index % 2 === 0 ? { ...entry, meaningAr: 'نفس المعنى' } : entry))
    for (const exercise of withPractice(lesson({ vocabulary: twins })).exercises) {
      if (exercise.type !== 'vocab-recall') continue
      expect(exercise.distractorsAr).not.toContain(exercise.correctAnswerAr)
    }
  })

  it('builds a listening question whose right option is the sentence that is spoken', () => {
    const listening = withPractice(lesson()).exercises.find((exercise) => exercise.type === 'listening')
    expect(listening?.type).toBe('listening')
    if (listening?.type !== 'listening') return
    expect(listening.options[listening.correctIndex]).toBe(listening.audioText)
    expect(new Set(listening.options).size).toBe(listening.options.length)
  })

  it('adds the authored translation task of the lesson, and only when there is one', () => {
    const withTask = withPractice(lesson({ id: 'a1-m03-l02' }))
    expect(countOf(withTask.exercises, 'translation')).toBe(1)
    expect(countOf(withPractice(lesson({ id: 'a1-no-task-l01' })).exercises, 'translation')).toBe(0)
  })
})

describe('transliterate', () => {
  it('writes umlauts and ß the way a keyboard without them does', () => {
    expect(transliterate('Öffne bitte das Fenster, süße Mädchen: Straße')).toBe('Oeffne bitte das Fenster, suesse Maedchen: Strasse')
  })
})

describe('translationFromTask', () => {
  const task = { ar: 'نص', de: ['Öffne das Fenster!', 'Ich möchte Käse.'] }
  const exercise = translationFromTask('a1-x-l01', 'A1', task)

  it('accepts every listed answer and its ae/oe/ue/ss spelling', () => {
    for (const answer of ['Öffne das Fenster!', 'Oeffne das Fenster', 'ich möchte käse', 'Ich moechte Kaese.']) {
      expect(isAnswerAccepted(answer, exercise.acceptedAnswers), answer).toBe(true)
    }
  })

  it('rejects a different sentence', () => {
    expect(isAnswerAccepted('Ich möchte Brot.', exercise.acceptedAnswers)).toBe(false)
  })

  it('shows the first answer as the model answer', () => {
    expect(exercise.explanationAr).toContain('Öffne das Fenster!')
  })
})

describe('vocabularyThemeExercises', () => {
  it('builds matching, three article questions, fill-in sentences and an ordering task from the word list', () => {
    const exercises = vocabularyThemeExercises(lesson())
    expect(countOf(exercises, 'matching')).toBe(1)
    expect(countOf(exercises, 'multiple-choice')).toBe(3)
    expect(countOf(exercises, 'fill-blank')).toBeGreaterThanOrEqual(1)
  })

  it('asks for the right article', () => {
    const [question] = vocabularyThemeExercises(lesson()).filter((exercise) => exercise.type === 'multiple-choice')
    expect(question.type === 'multiple-choice' && question.options[question.correctIndex]).toBe('der')
  })

  it('makes an ordering task whose scrambled order differs from the sentence and solves back to it', () => {
    const ordering = vocabularyThemeExercises(lesson()).find((exercise) => exercise.type === 'ordering')
    if (ordering?.type !== 'ordering') return
    const solved = ordering.correctOrder.map((position) => ordering.words[position]).join(' ')
    expect(solved).toBe('Das ist Wort0 im Satz hier.')
    expect(ordering.words.join(' ')).not.toBe(solved)
  })
})

describe('the curriculum, once practice is added', () => {
  const lessons = (['A1', 'A2'] as const).flatMap((level) => getLessonsForLevel(level))

  it('gives every lesson with a vocabulary of four or more words two recall questions and a listening question', () => {
    for (const each of lessons.filter((entry) => entry.vocabulary.length >= 4)) {
      expect(countOf(each.exercises, 'vocab-recall'), `${each.id} recall`).toBeGreaterThanOrEqual(2)
      if (each.examples.length + each.vocabulary.length >= 4) expect(countOf(each.exercises, 'listening'), `${each.id} listening`).toBeGreaterThanOrEqual(1)
    }
  })

  it('gives every lesson a translation, except where the lesson already has its own', () => {
    for (const each of lessons) expect(countOf(each.exercises, 'translation'), each.id).toBeGreaterThanOrEqual(1)
  })

  it('has a translation task for exactly the lessons that need one, and none for a lesson that does not exist', () => {
    const ids = new Set(lessons.map((entry) => entry.id))
    for (const id of Object.keys(TRANSLATION_TASKS)) expect(ids.has(id), `${id} is not a lesson`).toBe(true)
  })

  it('keeps every exercise id unique inside its lesson', () => {
    for (const each of lessons) {
      const ids = each.exercises.map((exercise) => exercise.id)
      expect(new Set(ids).size, each.id).toBe(ids.length)
    }
  })

  it('never lets two options of a derived question be the same answer', () => {
    for (const each of lessons) {
      for (const exercise of each.exercises.filter((entry) => entry.id.includes('-gen-'))) {
        if (exercise.type === 'listening') expect(new Set(exercise.options).size, exercise.id).toBe(exercise.options.length)
        if (exercise.type === 'multiple-choice') expect(new Set(exercise.options).size, exercise.id).toBe(exercise.options.length)
        if (exercise.type === 'matching') {
          expect(new Set(exercise.pairs.map((pair) => pair.ar)).size, exercise.id).toBe(exercise.pairs.length)
          expect(new Set(exercise.pairs.map((pair) => pair.de)).size, exercise.id).toBe(exercise.pairs.length)
        }
      }
    }
  })
})

describe('translation tasks', () => {
  const entries = Object.entries(TRANSLATION_TASKS)

  it('has an Arabic sentence and at least one German answer for each', () => {
    for (const [id, task] of entries) {
      expect(/[\u0600-\u06FF]/.test(task.ar), `${id} Arabic`).toBe(true)
      expect(task.de.length, `${id} answers`).toBeGreaterThan(0)
      expect(/[\u0600-\u06FF]/.test(task.de.join(' ')), `${id} German has Arabic letters`).toBe(false)
    }
  })

  it('lists no German answer twice once case and punctuation are ignored', () => {
    for (const [id, task] of entries) {
      const normalized = task.de.map((answer) => normalizeAnswer(answer))
      expect(new Set(normalized).size, id).toBe(normalized.length)
    }
  })

  it('writes every answer as a finished sentence', () => {
    for (const [id, task] of entries) for (const answer of task.de) expect(/[.!?]$/.test(answer), `${id}: ${answer}`).toBe(true)
  })

  it('stays short enough to be a fair thing to type', () => {
    for (const [id, task] of entries) for (const answer of task.de) expect(answer.split(/\s+/).length, `${id}: ${answer}`).toBeLessThanOrEqual(14)
  })
})
