import type { CEFRLevel } from '@/types'

import { LESSON_GRAMMAR_LINKS } from './lessonLinks'
import { GRAMMAR_ROADMAP } from './roadmap'

/**
 * Topics a whole module teaches whose lessons carry no link to a published rule (the roadmap rule is not written
 * yet, or the lessons are not mapped). Written down so that `findLevelMismatches` sees them too.
 * Module id → roadmap rule numbers (see `roadmap.ts`).
 */
export const MODULE_TOPIC_RULES: Readonly<Record<string, readonly number[]>> = {
  'a2-m08': [35, 36], // Relativsätze, Relativpronomen
  'a2-m09': [50], // Indirekte Fragen
  'a2-m10': [43], // um ... zu
}

const RANK: Readonly<Record<CEFRLevel, number>> = { A1: 1, A2: 2, B1: 3, B2: 4 }

export interface LevelMismatch {
  /** A lesson id or a module id. */
  source: string
  sourceLevel: CEFRLevel
  rule: number
  termDe: string
  ruleLevel: CEFRLevel
}

const levelOf = (id: string): CEFRLevel => id.slice(0, 2).toUpperCase() as CEFRLevel

/**
 * Lessons and modules that teach or drill a topic the grammar roadmap places at a HIGHER level than their own.
 * The roadmap is the learning order the project follows; a mismatch means a learner meets the topic earlier than
 * the roadmap intends. Nothing here is an error by itself: `docs/level-alignment.md` records each one and the decision.
 */
export function findLevelMismatches(): LevelMismatch[] {
  const found: LevelMismatch[] = []
  const check = (source: string, rules: readonly number[]) => {
    const sourceLevel = levelOf(source)
    for (const number of rules) {
      const entry = GRAMMAR_ROADMAP.find((rule) => rule.number === number)
      if (entry && RANK[entry.level] > RANK[sourceLevel]) {
        found.push({ source, sourceLevel, rule: number, termDe: entry.termDe, ruleLevel: entry.level })
      }
    }
  }
  for (const [lessonId, rules] of Object.entries(LESSON_GRAMMAR_LINKS)) check(lessonId, rules)
  for (const [moduleId, rules] of Object.entries(MODULE_TOPIC_RULES)) check(moduleId, rules)
  return found
}
