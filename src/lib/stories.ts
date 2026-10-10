import { getDialoguesForLevel, getReadingTextsForLevel } from '@/lib/curriculum'
import { splitSentences } from '@/lib/sentences'
import type { CEFRLevel, Dialogue, ReadingText, Story, StorySegment } from '@/types'

// Two speakers get slightly different pitches so they're easy to tell apart by ear.
const SPEAKER_PITCH = { a: 1.05, b: 0.85 } as const

function buildReadingStory(text: ReadingText): Story {
  const segments: StorySegment[] = []
  const blocks = text.paragraphs.map((paragraph) => {
    const paragraphSegments = splitSentences(paragraph.de).map((sentence) => {
      const segment: StorySegment = { index: segments.length, text: sentence }
      segments.push(segment)
      return segment
    })
    return { type: 'paragraph' as const, ar: paragraph.ar, segments: paragraphSegments }
  })

  return {
    kind: 'reading',
    id: text.id,
    level: text.level,
    titleDe: text.titleDe,
    titleAr: text.titleAr,
    category: text.category,
    estimatedMinutes: text.estimatedMinutes,
    image: text.image,
    blocks,
    segments,
  }
}

function buildDialogueStory(dialogue: Dialogue): Story {
  const segments: StorySegment[] = []
  const blocks = dialogue.lines.map((line) => {
    const segment: StorySegment = { index: segments.length, text: line.de, pitch: SPEAKER_PITCH[line.speaker] }
    segments.push(segment)
    return { type: 'line' as const, speaker: line.speaker, name: line.name, ar: line.ar, segment }
  })

  return {
    kind: 'dialogue',
    id: dialogue.id,
    level: dialogue.level,
    // Falls back to the Arabic title so a dialogue without a German title still renders.
    titleDe: dialogue.titleDe ?? dialogue.titleAr,
    titleAr: dialogue.titleAr,
    register: dialogue.register,
    lessonId: dialogue.lessonId,
    image: dialogue.image,
    blocks,
    segments,
  }
}

const cache = new Map<CEFRLevel, Story[]>()

/** A level's reading texts followed by its conversations, each group in curriculum order. */
export function getStoriesForLevel(level: CEFRLevel): Story[] {
  const cached = cache.get(level)
  if (cached) return cached

  const stories = [...getReadingTextsForLevel(level).map(buildReadingStory), ...getDialoguesForLevel(level).map(buildDialogueStory)]
  cache.set(level, stories)
  return stories
}

export function getStory(level: CEFRLevel, id: string): Story | undefined {
  return getStoriesForLevel(level).find((story) => story.id === id)
}
