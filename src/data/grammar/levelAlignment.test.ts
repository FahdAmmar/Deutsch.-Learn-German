import { describe, expect, it } from 'vitest'

import { findLevelMismatches, MODULE_TOPIC_RULES } from './levelAlignment'
import { GRAMMAR_ROADMAP } from './roadmap'

/**
 * The mismatches that exist today, recorded in docs/level-alignment.md. This test pins them: a NEW lesson that
 * practises a rule from a higher level fails it, and so does fixing one without updating the list and the document.
 */
const KNOWN = [
  'a1-m04-l01 → 20 Wechselpräpositionen [A2]',
  'a1-m04-l01 → 21 Wo? / Wohin? [A2]',
  'a1-m12-l01 → 17 Perfekt [A2]',
  'a1-m17-l01 → 26 Komparativ / Superlativ [A2]',
  'a1-m18-l01 → 24 Adjektive [A2]',
  'a1-m20-l01 → 26 Komparativ / Superlativ [A2]',
  'a2-m08 → 35 Relativsätze [B1]',
  'a2-m08 → 36 Relativpronomen [B1]',
  'a2-m09 → 50 Indirekte Fragen [B1]',
  'a2-m10 → 43 um ... zu [B1]',
]

describe('level alignment of lessons and the grammar roadmap', () => {
  it('knows exactly the mismatches recorded in docs/level-alignment.md', () => {
    const found = findLevelMismatches()
      .map((item) => `${item.source} → ${item.rule} ${item.termDe} [${item.ruleLevel}]`)
      .sort()
    expect(found).toEqual([...KNOWN].sort())
  })

  it('points the module topics at rules that exist', () => {
    for (const rules of Object.values(MODULE_TOPIC_RULES)) {
      for (const number of rules) expect(GRAMMAR_ROADMAP.some((rule) => rule.number === number)).toBe(true)
    }
  })
})
