import { describe, expect, it } from 'vitest'

import { checkSpeaking } from '@/lib/speakingCheck'

import { getSpeakingTask, getSpeakingTasksForLevel, SPEAKING_TASKS } from './index'

describe('speaking tasks', () => {
  it('have unique ids that start with their level', () => {
    const ids = SPEAKING_TASKS.map((task) => task.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const task of SPEAKING_TASKS) expect(task.id.startsWith(task.level.toLowerCase()), task.id).toBe(true)
  })

  it('offer all three kinds at both levels', () => {
    for (const level of ['A1', 'A2'] as const) {
      const kinds = new Set(getSpeakingTasksForLevel(level).map((task) => task.kind))
      expect([...kinds].sort(), level).toEqual(['question', 'request', 'talk'])
    }
  })

  it('have a title, a prompt and a bilingual model answer', () => {
    for (const task of SPEAKING_TASKS) {
      expect(task.titleAr.trim(), task.id).not.toBe('')
      expect(task.titleDe.trim(), task.id).not.toBe('')
      expect(task.promptAr.trim(), task.id).not.toBe('')
      expect(task.model.length, task.id).toBeGreaterThanOrEqual(2)
      for (const line of task.model) {
        expect(line.de.trim(), task.id).not.toBe('')
        expect(/[\u0600-\u06FF]/.test(line.ar), `${task.id}: ${line.ar}`).toBe(true)
      }
    }
  })

  it('use patterns that compile and are written without umlauts or ß', () => {
    for (const task of SPEAKING_TASKS) {
      const sources =
        task.kind === 'talk' ? task.cues.flatMap((cue) => cue.patterns) : task.kind === 'question' ? task.topicStems : task.objectStems
      expect(sources.length, task.id).toBeGreaterThan(0)
      for (const source of sources) {
        expect(() => new RegExp(source), `${task.id}: ${source}`).not.toThrow()
        expect(/[äöüß]/i.test(source), `${task.id}: ${source}`).toBe(false)
      }
    }
  })

  it('are satisfied by their own model answer', () => {
    for (const task of SPEAKING_TASKS) {
      if (task.kind === 'talk') {
        const check = checkSpeaking(task, task.model.map((line) => line.de).join(' '))
        expect(check.items.filter((item) => !item.ok).map((item) => item.labelAr), task.id).toEqual([])
      } else {
        for (const line of task.model) expect(checkSpeaking(task, line.de).ok, `${task.id}: ${line.de}`).toBe(true)
      }
    }
  })

  it('finds a task by id and returns nothing for an unknown id', () => {
    expect(getSpeakingTask('a1-sprechen-vorstellung')?.kind).toBe('talk')
    expect(getSpeakingTask('nope')).toBeUndefined()
    expect(getSpeakingTask(undefined)).toBeUndefined()
  })
})
