import type { CEFRLevel } from './cefr'
import type { StoryImage } from './media'

export type DialogueRegister = 'informal' | 'formal'

export interface DialogueLine {
  /** Which of the two speakers says this line — used to align the bubble left/right. */
  speaker: 'a' | 'b'
  name: string
  de: string
  ar: string
}

export interface Dialogue {
  id: string
  level: CEFRLevel
  moduleId: string
  /** The lesson this conversation belongs to, if any — dialogues can also stand alone in the level's "Conversation" tab. */
  lessonId?: string
  /** German title shown as the page heading. Optional in the type; the content-integrity test requires it for shipped dialogues. */
  titleDe?: string
  titleAr: string
  register: DialogueRegister
  lines: DialogueLine[]
  image?: StoryImage
}
