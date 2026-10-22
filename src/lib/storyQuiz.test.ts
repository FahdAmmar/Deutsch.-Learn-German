import { describe, expect, it } from 'vitest'

import { getAllVocabulary } from '@/lib/curriculum'
import { buildStoryQuiz, transliterate } from '@/lib/storyQuiz'
import { getStoriesForLevel } from '@/lib/stories'
import { CEFR_LEVELS } from '@/types'
import type { Exercise, Story } from '@/types'

const vocabulary = getAllVocabulary()
const allStories: Story[] = CEFR_LEVELS.flatMap((level) => getStoriesForLevel(level))
const quizOf = (story: Story) => buildStoryQuiz(story, { pool: getStoriesForLevel(story.level), vocabulary })

const distinct = (values: string[]) => new Set(values.map((value) => value.trim().toLowerCase())).size === values.length

function expectValid(exercise: Exercise, label: string) {
  expect(exercise.promptAr.trim(), `${label}: prompt`).not.toBe('')
  expect(exercise.explanationAr.trim(), `${label}: explanation`).not.toBe('')

  switch (exercise.type) {
    case 'multiple-choice':
    case 'listening':
      expect(exercise.options.length, `${label}: options`).toBeGreaterThanOrEqual(2)
      expect(distinct(exercise.options), `${label}: duplicate options`).toBe(true)
      expect(exercise.correctIndex, `${label}: correctIndex`).toBeGreaterThanOrEqual(0)
      expect(exercise.correctIndex, `${label}: correctIndex`).toBeLessThan(exercise.options.length)
      for (const option of exercise.options) expect(option.trim(), `${label}: blank option`).not.toBe('')
      break
    case 'fill-blank':
      expect(exercise.sentenceDe.split('___'), `${label}: exactly one blank`).toHaveLength(2)
      expect(exercise.acceptedAnswers.length).toBeGreaterThan(0)
      break
    case 'ordering': {
      expect(exercise.words.length).toBeGreaterThanOrEqual(3)
      expect([...exercise.correctOrder].sort((a, b) => a - b), `${label}: correctOrder is a permutation`).toEqual(exercise.words.map((_, i) => i))
      expect(exercise.correctOrder.every((value, position) => value === position), `${label}: already in order`).toBe(false)
      break
    }
    case 'matching':
      expect(exercise.pairs.length).toBeGreaterThanOrEqual(3)
      expect(distinct(exercise.pairs.map((pair) => pair.de)), `${label}: duplicate German`).toBe(true)
      expect(distinct(exercise.pairs.map((pair) => pair.ar)), `${label}: duplicate Arabic`).toBe(true)
      break
    case 'true-false':
      expect(exercise.statementDe.trim()).not.toBe('')
      break
    default:
      break
  }
}

describe('buildStoryQuiz', () => {
  it('builds a quiz for every text and conversation in the curriculum', () => {
    expect(allStories.length).toBeGreaterThan(0)
    for (const story of allStories) {
      const quiz = quizOf(story)
      expect(quiz.length, `${story.id} has ${quiz.length} questions`).toBeGreaterThanOrEqual(5)
      expect(quiz.length).toBeLessThanOrEqual(10)
      expect(new Set(quiz.map((exercise) => exercise.id)).size, `${story.id}: ids`).toBe(quiz.length)
      quiz.forEach((exercise, index) => expectValid(exercise, `${story.id} q${index + 1} (${exercise.type})`))
    }
  })

  it('is deterministic', () => {
    for (const story of allStories.slice(0, 12)) expect(quizOf(story)).toEqual(quizOf(story))
  })

  it('is not only translation: every quiz also asks something answered from the German alone', () => {
    for (const story of allStories) {
      const types = new Set(quizOf(story).map((exercise) => exercise.type))
      expect(types.has('listening') || types.has('fill-blank'), story.id).toBe(true)
      expect(types.size, `${story.id} uses ${[...types].join(', ')}`).toBeGreaterThanOrEqual(3)
    }
  })

  it('asks who said a line in conversations, and not in reading texts', () => {
    const dialogue = allStories.find((story) => story.kind === 'dialogue')!
    const reading = allStories.find((story) => story.kind === 'reading')!
    const speakerQuestion = (story: Story) => quizOf(story).some((exercise) => exercise.type === 'multiple-choice' && exercise.promptAr.includes('من قال'))
    expect(speakerQuestion(dialogue)).toBe(true)
    expect(speakerQuestion(reading)).toBe(false)
  })

  it('puts the correct answer where correctIndex says', () => {
    for (const story of allStories) {
      for (const exercise of quizOf(story)) {
        if (exercise.type === 'listening') {
          expect(exercise.options[exercise.correctIndex]).toBe(exercise.audioText)
        }
        if (exercise.type === 'multiple-choice' && exercise.promptAr === 'ما معنى هذه الجملة؟') {
          const segment = story.segments.find((s) => s.text === exercise.questionDe)!
          expect(exercise.options[exercise.correctIndex]).toBe(segment.ar)
        }
      }
    }
  })

  it('accepts the transliterated spelling of a blanked word', () => {
    const quiz = allStories.flatMap((story) => quizOf(story)).filter((exercise) => exercise.type === 'fill-blank')
    const withUmlaut = quiz.find((exercise) => exercise.type === 'fill-blank' && /[äöüß]/i.test(exercise.acceptedAnswers[0]))
    if (withUmlaut?.type === 'fill-blank') expect(withUmlaut.acceptedAnswers.length).toBe(2)
  })

  it('does not invent false German: a false true/false item reuses a real sentence with another sentence\'s translation', () => {
    for (const story of allStories) {
      for (const exercise of quizOf(story)) {
        if (exercise.type !== 'true-false') continue
        const sentence = story.segments.find((s) => s.text === exercise.statementDe)
        expect(sentence, `${story.id}: statement is a real sentence of the story`).toBeDefined()
        const shown = exercise.promptAr.match(/«(.+)»/)?.[1]
        expect(shown === sentence?.ar, `${story.id}: isTrue matches the translation shown`).toBe(exercise.isTrue)
      }
    }
  })
})

describe('transliterate', () => {
  it('writes umlauts the way a keyboard without them would', () => {
    expect(transliterate('Ägypten')).toBe('Aegypten')
    expect(transliterate('Straße')).toBe('Strasse')
    expect(transliterate('Haus')).toBe('Haus')
  })
})
