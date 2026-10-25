import { describe, expect, it } from 'vitest'

import { getDialoguesForLevel } from '@/lib/curriculum'

import { a1Conversations, a1Modules } from './a1'
import { a2Conversations, a2Modules } from './a2'

const LEVELS = [
  { level: 'A1', conversations: a1Conversations, modules: a1Modules },
  { level: 'A2', conversations: a2Conversations, modules: a2Modules },
] as const

describe('dialogue ids', () => {
  it('are unique across every level, because progress stores key a conversation by its id alone', () => {
    const ids = LEVELS.flatMap(({ level }) => getDialoguesForLevel(level).map((dialogue) => dialogue.id))
    const duplicates = ids.filter((id, position) => ids.indexOf(id) !== position)
    expect(duplicates).toEqual([])
  })
})

describe.each(LEVELS)('standalone conversations — $level', ({ level, conversations, modules }) => {
  it('are plentiful: at least six, each with at least eight lines', () => {
    expect(conversations.length).toBeGreaterThanOrEqual(6)
    for (const conversation of conversations) expect(conversation.lines.length, conversation.id).toBeGreaterThanOrEqual(8)
  })

  it('carry their level, a level-specific id and a module of that level — and belong to no lesson', () => {
    const moduleIds = new Set(modules.map((module) => module.id))
    for (const conversation of conversations) {
      expect(conversation.level, conversation.id).toBe(level)
      expect(conversation.id.startsWith(`dialogue-${level.toLowerCase()}-`), conversation.id).toBe(true)
      expect(moduleIds.has(conversation.moduleId), `${conversation.id} points at unknown module ${conversation.moduleId}`).toBe(true)
      expect(conversation.lessonId, conversation.id).toBeUndefined()
    }
  })

  it('have German and Arabic titles, and an Arabic line that is a translation, not a copy of the German', () => {
    for (const conversation of conversations) {
      expect(conversation.titleDe?.trim(), `${conversation.id} titleDe`).toBeTruthy()
      expect(conversation.titleAr.trim(), `${conversation.id} titleAr`).toBeTruthy()
      for (const line of conversation.lines) {
        expect(line.de.trim(), `${conversation.id} German line`).not.toBe('')
        expect(line.ar.trim(), `${conversation.id}: ${line.de}`).not.toBe('')
        expect(line.ar, `${conversation.id}: ${line.de}`).not.toBe(line.de)
      }
    }
  })

  it('are real exchanges: the two speakers take turns and each keeps one name', () => {
    for (const conversation of conversations) {
      const names = new Map<string, string>()
      conversation.lines.forEach((line, position) => {
        if (position > 0) expect(line.speaker, `${conversation.id} line ${position + 1} repeats the speaker`).not.toBe(conversation.lines[position - 1]?.speaker)
        const known = names.get(line.speaker)
        if (known !== undefined) expect(line.name, `${conversation.id}: speaker ${line.speaker} changes name`).toBe(known)
        names.set(line.speaker, line.name)
      })
      expect(names.size, conversation.id).toBe(2)
      expect(new Set(names.values()).size, `${conversation.id}: both speakers need different names`).toBe(2)
    }
  })

  it('are listed after the lessons\' own dialogues in the level\'s conversations', () => {
    const all = getDialoguesForLevel(level)
    expect(all.slice(all.length - conversations.length)).toEqual(conversations)
  })
})

describe('A2 conversations follow the course', () => {
  it('are listed in module order, and every module has one to practise with', () => {
    const order = a2Modules.map((module) => module.id)
    const positions = a2Conversations.map((conversation) => order.indexOf(conversation.moduleId))
    expect(positions).toEqual([...positions].sort((first, second) => first - second))

    for (const module of a2Modules) {
      expect(
        a2Conversations.some((conversation) => conversation.moduleId === module.id),
        `${module.id} has no standalone conversation`,
      ).toBe(true)
    }
  })
})
