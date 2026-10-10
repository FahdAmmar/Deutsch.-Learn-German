import type { LevelCurriculum } from '@/types'

import { a1Modules, a1ReadingTexts } from './a1'
import { a2Modules, a2ReadingTexts } from './a2'

/**
 * B1 and B2 modules are intentionally empty for now rather than filled
 * with placeholder lesson titles — the Levels page shows an honest
 * "coming soon" state for them instead of fabricated content. Add
 * `b1Modules`, `b2Modules` here as they're authored, following the same
 * `Module[]` shape as `a1Modules`. The same applies to `readingTexts`:
 * empty until a level has authored reading passages.
 */
export const curriculum: LevelCurriculum[] = [
  { level: 'A1', modules: a1Modules, readingTexts: a1ReadingTexts },
  { level: 'A2', modules: a2Modules, readingTexts: a2ReadingTexts },
  { level: 'B1', modules: [], readingTexts: [] },
  { level: 'B2', modules: [], readingTexts: [] },
]
