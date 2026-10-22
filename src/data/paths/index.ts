import type { CEFRLevel, LevelPath } from '@/types'

import { a1Path } from './a1'

/** Levels with a hand-sequenced path. Other levels fall back to their module order (see `lib/learningPath.ts`). */
export const LEVEL_PATHS: Partial<Record<CEFRLevel, LevelPath>> = {
  A1: a1Path,
}
