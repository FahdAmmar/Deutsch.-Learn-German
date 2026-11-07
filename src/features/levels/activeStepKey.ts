import { getLesson } from '@/lib/curriculum'
import { getRoadmapEntry } from '@/lib/grammarRoadmap'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel } from '@/types'

function asLevel(value: string | undefined): CEFRLevel | undefined {
  const upper = value?.toUpperCase()
  return CEFR_LEVELS.find((level) => level === upper)
}

/**
 * The plan step a page belongs to, from its address: `/lessons/a1/sein`, `/grammar/a1/praesens` or
 * `/levels/a1/texts/a1-read-02` (also its quiz, dictation and role-play pages). Undefined for any other page.
 * Reads the loaded curriculum to turn a lesson's address into its id.
 */
export function getStepKeyForPath(pathname: string): string | undefined {
  const [, section, levelPart, third, fourth] = pathname.split('/')
  const level = asLevel(levelPart)
  if (!level || !third) return undefined

  if (section === 'lessons') {
    const lesson = getLesson(level, third)
    return lesson ? `lesson:${lesson.id}` : undefined
  }
  if (section === 'grammar') {
    const entry = getRoadmapEntry(level, third)
    return entry ? `rule:${entry.number}` : undefined
  }
  if (section === 'levels' && third === 'texts' && fourth) return `story:${decodeURIComponent(fourth)}`
  return undefined
}
