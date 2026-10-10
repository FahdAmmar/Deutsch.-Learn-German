import { describe, expect, it } from 'vitest'

import { GRAMMAR_ROADMAP } from './roadmap'
import type { GrammarRule } from '@/types'

/**
 * Mirrors `src/data/contentIntegrity.test.ts` for the roadmap-ordered
 * grammar rules: TypeScript checks shape, not content quality (duplicate
 * MCQ options, a `correctIndex` out of range, …). This suite loads every
 * authored rule file eagerly (test-only — the app itself lazy-loads them
 * one at a time, see `lib/grammarRoadmap.ts`) and checks it the same way.
 */

const ruleModules = import.meta.glob<{ default: GrammarRule }>('./rules/rule-*.ts', { eager: true })
const rules = Object.entries(ruleModules).map(([path, module]) => ({ path, rule: module.default }))

function duplicates(values: string[]): string[] {
  const seen = new Set<string>()
  const dupes = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) dupes.add(value)
    seen.add(value)
  }
  return Array.from(dupes)
}

describe('grammar rule content integrity', () => {
  it('at least one rule is authored (this suite is not silently vacuous)', () => {
    expect(rules.length).toBeGreaterThan(0)
  })

  it('every rule file lives at the path its own number implies', () => {
    for (const { path, rule } of rules) {
      expect(path, `rule ${rule.number}`).toBe(`./rules/rule-${String(rule.number).padStart(2, '0')}-${rule.slug.slice(3)}.ts`)
    }
  })

  it('every rule matches its roadmap entry (number, level, slug, term, Arabic title)', () => {
    for (const { rule } of rules) {
      const entry = GRAMMAR_ROADMAP.find((candidate) => candidate.number === rule.number)
      expect(entry, `rule ${rule.number} has no roadmap entry`).toBeDefined()
      expect(rule.id).toBe(`gr-${String(rule.number).padStart(2, '0')}`)
      expect(rule.slug).toBe(entry?.slug)
      expect(rule.level).toBe(entry?.level)
      expect(rule.termDe).toBe(entry?.termDe)
      expect(rule.titleAr).toBe(entry?.titleAr)
    }
  })

  it('every rule has at least one section, one flashcard, one quiz question, and one cheat-sheet item', () => {
    for (const { rule } of rules) {
      expect(rule.sections.length, `rule ${rule.number}`).toBeGreaterThan(0)
      expect(rule.flashcards.length, `rule ${rule.number}`).toBeGreaterThan(0)
      expect(rule.quiz.length, `rule ${rule.number}`).toBeGreaterThan(0)
      expect(rule.cheatSheet.length, `rule ${rule.number}`).toBeGreaterThan(0)
    }
  })

  it('section ids are unique within each rule and used by exactly one section', () => {
    for (const { rule } of rules) {
      const ids = rule.sections.map((section) => section.id)
      expect(duplicates(ids), `rule ${rule.number}`).toEqual([])
    }
  })

  it('every exercise id (practice blocks + quiz) is unique within its rule', () => {
    for (const { rule } of rules) {
      const practiceExerciseIds = rule.sections
        .flatMap((section) => section.blocks)
        .filter((block) => block.kind === 'practice')
        .flatMap((block) => block.exercises.map((exercise) => exercise.id))
      const allIds = [...practiceExerciseIds, ...rule.quiz.map((exercise) => exercise.id)]
      expect(duplicates(allIds), `rule ${rule.number}`).toEqual([])
    }
  })

  it('exercise ids are globally unique across every authored rule', () => {
    const allIds = rules.flatMap(({ rule }) => {
      const practiceIds = rule.sections
        .flatMap((section) => section.blocks)
        .filter((block) => block.kind === 'practice')
        .flatMap((block) => block.exercises.map((exercise) => exercise.id))
      return [...practiceIds, ...rule.quiz.map((exercise) => exercise.id)]
    })
    expect(duplicates(allIds)).toEqual([])
  })

  it('every multiple-choice exercise has distinct options and a valid correctIndex', () => {
    for (const { rule } of rules) {
      const exercises = [
        ...rule.sections.flatMap((section) => section.blocks).filter((block) => block.kind === 'practice').flatMap((block) => block.exercises),
        ...rule.quiz,
      ].filter((exercise) => exercise.type === 'multiple-choice')
      for (const exercise of exercises) {
        expect(duplicates(exercise.options), `${exercise.id}`).toEqual([])
        expect(exercise.correctIndex, exercise.id).toBeGreaterThanOrEqual(0)
        expect(exercise.correctIndex, exercise.id).toBeLessThan(exercise.options.length)
      }
    }
  })

  it('every matching exercise has distinct German terms and distinct Arabic terms', () => {
    for (const { rule } of rules) {
      const exercises = [
        ...rule.sections.flatMap((section) => section.blocks).filter((block) => block.kind === 'practice').flatMap((block) => block.exercises),
        ...rule.quiz,
      ].filter((exercise) => exercise.type === 'matching')
      for (const exercise of exercises) {
        expect(duplicates(exercise.pairs.map((pair) => pair.de)), `${exercise.id}`).toEqual([])
        expect(duplicates(exercise.pairs.map((pair) => pair.ar)), `${exercise.id}`).toEqual([])
      }
    }
  })

  it('every ordering exercise has a correctOrder that is a valid permutation of its words', () => {
    for (const { rule } of rules) {
      const exercises = [
        ...rule.sections.flatMap((section) => section.blocks).filter((block) => block.kind === 'practice').flatMap((block) => block.exercises),
        ...rule.quiz,
      ].filter((exercise) => exercise.type === 'ordering')
      for (const exercise of exercises) {
        const sorted = [...exercise.correctOrder].sort((a, b) => a - b)
        expect(sorted, exercise.id).toEqual(exercise.words.map((_, index) => index))
      }
    }
  })

  it('every fill-blank exercise has a single blank and at least one non-empty accepted answer', () => {
    for (const { rule } of rules) {
      const exercises = [
        ...rule.sections.flatMap((section) => section.blocks).filter((block) => block.kind === 'practice').flatMap((block) => block.exercises),
        ...rule.quiz,
      ].filter((exercise) => exercise.type === 'fill-blank')
      for (const exercise of exercises) {
        expect(exercise.sentenceDe.split('___').length, exercise.id).toBe(2)
        expect(exercise.acceptedAnswers.length, exercise.id).toBeGreaterThan(0)
        for (const answer of exercise.acceptedAnswers) expect(answer.trim(), exercise.id).not.toBe('')
      }
    }
  })

  it('every vocab-recall exercise has distinct distractors that do not repeat the correct answer', () => {
    for (const { rule } of rules) {
      const exercises = [
        ...rule.sections.flatMap((section) => section.blocks).filter((block) => block.kind === 'practice').flatMap((block) => block.exercises),
        ...rule.quiz,
      ].filter((exercise) => exercise.type === 'vocab-recall')
      for (const exercise of exercises) {
        expect(duplicates(exercise.distractorsAr), exercise.id).toEqual([])
        expect(exercise.distractorsAr, exercise.id).not.toContain(exercise.correctAnswerAr)
      }
    }
  })

  it('every rule table row has exactly as many cells as the table has columns', () => {
    for (const { rule } of rules) {
      const tables = rule.sections.flatMap((section) => section.blocks).filter((block) => block.kind === 'table')
      for (const table of tables) {
        for (const row of table.rows) expect(row.length).toBe(table.columns.length)
      }
    }
  })

  it('no rule string field bolds a fragment inside a German word (only whole tokens may use **bold**)', () => {
    // Latin letters only: `wohn**e**` is a real rendering bug (the padded
    // <mark> splits one word visually). Arabic single-letter conjunction/
    // preposition prefixes (و/ف/ب/ل/ك) directly before a bolded word —
    // e.g. `و**رسمي**` — are normal Arabic orthography, not this bug.
    const MID_WORD_BOLD = /[A-Za-zÄÖÜäöüß]\*\*[A-Za-zÄÖÜäöüß]+\*\*|\*\*[A-Za-zÄÖÜäöüß]+\*\*[A-Za-zÄÖÜäöüß]/
    function walk(value: unknown, path: string): void {
      if (typeof value === 'string') {
        expect(MID_WORD_BOLD.test(value), `${path}: ${JSON.stringify(value)}`).toBe(false)
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => walk(item, `${path}[${index}]`))
      } else if (value && typeof value === 'object') {
        for (const [key, nested] of Object.entries(value)) walk(nested, `${path}.${key}`)
      }
    }
    for (const { rule } of rules) walk(rule, `rule ${rule.number}`)
  })
})
