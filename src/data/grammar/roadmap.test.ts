import { describe, expect, it } from 'vitest'

import { CEFR_LEVELS } from '@/types'

import doc from '../../../docs/grammar-roadmap.md?raw'
import { GRAMMAR_ROADMAP } from './roadmap'

/**
 * `GRAMMAR_ROADMAP` must always match `docs/grammar-roadmap.md` — that
 * document (the user-supplied "Grammer Roles" roadmap) is the single
 * source of truth for which 70 rules exist and in what order they're
 * taught. This test parses the document itself and fails the moment the
 * two drift apart, so the roadmap can never silently get reordered,
 * skipped, or duplicated by a future edit.
 *
 * Imported via Vite's `?raw` loader (typed by `vite/client`, already this
 * project's only ambient-types source for `src/`) rather than Node's `fs`,
 * which is untyped here on purpose — this app never touches Node builtins
 * from browser code, and this test is no exception.
 */

const LEVEL_HEADING_PATTERN = /^## .*?المستوى (A1|A2|B1|B2)/gm
const ROW_PATTERN = /^\| (\d{2}) \| (.+?) \| `(.+?)` \|/gm

interface DocRow {
  number: number
  level: string
  titleAr: string
  termDe: string
}

function parseDocument(): DocRow[] {
  const levelBoundaries = [...doc.matchAll(LEVEL_HEADING_PATTERN)].map((match) => ({
    index: match.index ?? 0,
    level: match[1],
  }))

  return [...doc.matchAll(ROW_PATTERN)].map((match) => {
    const position = match.index ?? 0
    const level = [...levelBoundaries].reverse().find((boundary) => boundary.index < position)?.level
    if (!level) throw new Error(`Row ${match[1]} in grammar-roadmap.md appears before any level heading`)
    return { number: Number(match[1]), level, titleAr: match[2].trim(), termDe: match[3].trim() }
  })
}

describe('grammar roadmap matches docs/grammar-roadmap.md', () => {
  const docRows = parseDocument()

  it('the source document has exactly 70 numbered rules', () => {
    expect(docRows).toHaveLength(70)
  })

  it('GRAMMAR_ROADMAP has exactly one entry per document row, in the same order', () => {
    expect(GRAMMAR_ROADMAP).toHaveLength(docRows.length)
    for (let index = 0; index < docRows.length; index += 1) {
      const doc = docRows[index]
      const entry = GRAMMAR_ROADMAP[index]
      expect(entry.number, `position ${index}`).toBe(doc.number)
      expect(entry.level, `rule ${doc.number}`).toBe(doc.level)
      expect(entry.titleAr, `rule ${doc.number}`).toBe(doc.titleAr)
      expect(entry.termDe, `rule ${doc.number}`).toBe(doc.termDe)
    }
  })

  it('is numbered 1–70 with no gaps or repeats, in ascending order', () => {
    expect(GRAMMAR_ROADMAP.map((entry) => entry.number)).toEqual(Array.from({ length: 70 }, (_, i) => i + 1))
  })

  it('every entry has a valid CEFR level and a slug prefixed with its own number', () => {
    for (const entry of GRAMMAR_ROADMAP) {
      expect(CEFR_LEVELS as readonly string[]).toContain(entry.level)
      expect(entry.slug).toMatch(new RegExp(`^${String(entry.number).padStart(2, '0')}-`))
    }
  })

  it('every slug is globally unique', () => {
    const slugs = GRAMMAR_ROADMAP.map((entry) => entry.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('levels are contiguous blocks in roadmap order (A1 rules all precede A2, etc.)', () => {
    const seenLevels: string[] = []
    for (const entry of GRAMMAR_ROADMAP) {
      if (seenLevels[seenLevels.length - 1] !== entry.level) {
        expect(seenLevels, `level ${entry.level} re-appears after being left`).not.toContain(entry.level)
        seenLevels.push(entry.level)
      }
    }
    expect(seenLevels).toEqual(['A1', 'A2', 'B1', 'B2'])
  })
})
