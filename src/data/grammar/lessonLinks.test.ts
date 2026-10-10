import { describe, expect, it } from 'vitest'

import { getLessonsForGrammarRule, getGrammarRulesForLesson } from '@/lib/grammarLinks'
import { getLessonById } from '@/lib/curriculum'
import { isRulePublished } from '@/lib/grammarRoadmap'

import { GRAMMAR_ROADMAP } from './roadmap'
import { LESSON_GRAMMAR_LINKS } from './lessonLinks'

describe('lesson ↔ grammar rule links', () => {
  const entries = Object.entries(LESSON_GRAMMAR_LINKS)

  it('only references lessons that exist', () => {
    const missing = entries.map(([id]) => id).filter((id) => !getLessonById(id))
    expect(missing).toEqual([])
  })

  it('only references roadmap rules that are published', () => {
    const roadmapNumbers = new Set(GRAMMAR_ROADMAP.map((entry) => entry.number))
    for (const [lessonId, numbers] of entries) {
      for (const number of numbers) {
        expect(roadmapNumbers.has(number), `${lessonId} → rule ${number} is not in the roadmap`).toBe(true)
        expect(isRulePublished(number), `${lessonId} → rule ${number} is not published yet`).toBe(true)
      }
    }
  })

  it('has no duplicate rule numbers per lesson', () => {
    for (const [lessonId, numbers] of entries) {
      expect(new Set(numbers).size, lessonId).toBe(numbers.length)
    }
  })

  it('resolves rules for a lesson in roadmap order', () => {
    expect(getGrammarRulesForLesson('a2-m03-l01').map((entry) => entry.number)).toEqual([28, 29])
    expect(getGrammarRulesForLesson('a1-m14-l01')).toEqual([])
  })

  it('resolves lessons for a rule (reverse lookup) in curriculum order', () => {
    expect(getLessonsForGrammarRule(26).map((lesson) => lesson.id)).toEqual(['a1-m17-l01', 'a1-m20-l01', 'a2-m01-l01'])
  })
})
