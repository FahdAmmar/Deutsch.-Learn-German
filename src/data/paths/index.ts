import type { CEFRLevel, LevelPath } from '@/types'

import { a1Path } from './a1'
import { a2Path } from './a2'

/** Levels with a hand-sequenced path. Other levels fall back to their module order (see `lib/learningPath.ts`). */
export const LEVEL_PATHS: Partial<Record<CEFRLevel, LevelPath>> = {
  A1: a1Path,
  A2: a2Path,
}
