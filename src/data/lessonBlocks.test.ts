import { beforeAll, describe, expect, it } from 'vitest'

import { getCurriculum, loadAllLevels } from '@/data/curriculum'
import type { Lesson, RuleBlock } from '@/types'

interface Located {
  lesson: Lesson
  sectionIndex: number
  block: RuleBlock
}

/** Every visual block of every lesson, with where it lives, so a failure names the lesson and section. */
function allLessonBlocks(): Located[] {
  const found: Located[] = []
  for (const entry of getCurriculum()) {
    for (const module of entry.modules) {
      for (const lesson of module.lessons) {
        lesson.explanation.forEach((section, sectionIndex) => {
          for (const block of section.blocks ?? []) found.push({ lesson, sectionIndex, block })
        })
      }
    }
  }
  return found
}

const where = ({ lesson, sectionIndex }: Located) => `${lesson.id} section ${sectionIndex + 1}`

describe('lesson visual blocks', () => {
  let blocks: Located[] = []

  // Levels load lazily; the blocks are collected once all of them are in.
  beforeAll(async () => {
    await loadAllLevels()
    blocks = allLessonBlocks()
  })

  it('finds converted lessons (the suite is not vacuous)', () => {
    expect(blocks.length).toBeGreaterThan(0)
  })

  it('keeps every table rectangular, with emphasis rows that exist', () => {
    for (const located of blocks) {
      const { block } = located
      if (block.kind !== 'table') continue
      for (const row of block.rows) expect(row, where(located)).toHaveLength(block.columns.length)
      for (const index of block.emphasisRows ?? []) expect(index, where(located)).toBeLessThan(block.rows.length)
    }
  })

  it('gives every tile a mark, a German word and an Arabic meaning, and never repeats a tile', () => {
    for (const located of blocks) {
      const { block } = located
      if (block.kind !== 'tileGrid') continue
      expect(block.items.length, where(located)).toBeGreaterThan(0)
      const seen = new Set<string>()
      for (const item of block.items) {
        expect(item.mark.trim(), where(located)).not.toBe('')
        expect(item.de.trim(), where(located)).not.toBe('')
        expect(item.ar.trim(), where(located)).not.toBe('')
        const key = `${item.mark}|${item.de}`
        expect(seen.has(key), `${where(located)} repeats ${key}`).toBe(false)
        seen.add(key)
      }
    }
  })

  it('only offers clock times the informal way can say: hours 0–23, minutes in steps of 5', () => {
    for (const located of blocks) {
      const { block } = located
      if (block.kind !== 'clock') continue
      for (const preset of block.presets) {
        expect(Number.isInteger(preset.hour) && preset.hour >= 0 && preset.hour <= 23, where(located)).toBe(true)
        expect(preset.minute % 5 === 0 && preset.minute >= 0 && preset.minute <= 55, where(located)).toBe(true)
      }
    }
  })

  it('gives pattern cards and comparisons something to show', () => {
    for (const located of blocks) {
      const { block } = located
      if (block.kind === 'patternCards') {
        expect(block.cards.length, where(located)).toBeGreaterThan(0)
        for (const card of block.cards) expect(card.items.length, where(located)).toBeGreaterThan(0)
      }
      if (block.kind === 'compare') {
        expect(block.modes.length, where(located)).toBeGreaterThanOrEqual(2)
        for (const mode of block.modes) expect(mode.parts.length, where(located)).toBeGreaterThan(0)
      }
    }
  })

  it('does not write German quotation marks or Arabic question marks into German text', () => {
    for (const located of blocks) {
      const { block } = located
      if (block.kind !== 'tileGrid') continue
      for (const item of block.items) expect(item.de, where(located)).not.toMatch(/[؟«»"]/)
    }
  })
})
