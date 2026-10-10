import type { CEFRLevel } from './cefr'
import type { DialogueRegister } from './dialogue'
import type { StoryImage } from './media'

/** One unit of audio: a sentence of a reading text, or one line of a conversation. */
export interface StorySegment {
  /** Position in the story's playback order (0-based, contiguous). */
  index: number
  text: string
  /** Optional voice pitch, used to tell two speakers apart. */
  pitch?: number
}

export interface StoryParagraphBlock {
  type: 'paragraph'
  /** Arabic explanation of the whole paragraph. */
  ar: string
  /** The paragraph's German sentences, in order. */
  segments: StorySegment[]
}

export interface StoryLineBlock {
  type: 'line'
  speaker: 'a' | 'b'
  name: string
  ar: string
  segment: StorySegment
}

export type StoryBlock = StoryParagraphBlock | StoryLineBlock

/**
 * A reading text or a conversation, normalised into one shape so a single
 * page, audio player and list can present both.
 */
export interface Story {
  kind: 'reading' | 'dialogue'
  id: string
  level: CEFRLevel
  titleDe: string
  titleAr: string
  /** Topic label of a reading text (e.g. "Freizeit"). */
  category?: string
  register?: DialogueRegister
  estimatedMinutes?: number
  /** The lesson a conversation belongs to, if any. */
  lessonId?: string
  image?: StoryImage
  blocks: StoryBlock[]
  /** Every segment in playback order — what the audio player walks through. */
  segments: StorySegment[]
}
