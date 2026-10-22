import { describe, expect, it } from 'vitest'

import { a1Modules } from './a1'
import { a2Modules } from './a2'
import type { Module } from '@/types'

/**
 * Every `module-NN-*.ts` file must be wired into its level's index. A file that
 * is not imported is dead content that still carries real lesson ids, so the next
 * edit may land in the wrong copy. This test fails on such a file.
 */
const moduleFiles = import.meta.glob('./{a1,a2}/module-*.ts', { eager: true })

const loadedByLevel: Record<string, Module[]> = { a1: a1Modules, a2: a2Modules }

describe('module files', () => {
  for (const level of Object.keys(loadedByLevel)) {
    it(`every ${level.toUpperCase()} module file is registered in the level index`, () => {
      const files = Object.keys(moduleFiles).filter((path) => path.startsWith(`./${level}/`))
      expect(files.length, `module files found for ${level}`).toBeGreaterThan(0)
      expect(loadedByLevel[level]).toHaveLength(files.length)
    })
  }

  it('module ids are unique across levels', () => {
    const ids = [...a1Modules, ...a2Modules].map((module) => module.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
