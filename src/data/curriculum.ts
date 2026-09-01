import type { LevelCurriculum } from '@/types'

import { a1Modules } from './a1'
import { a2Modules } from './a2'

/**
 * B1 and B2 modules are intentionally empty for now rather than filled
 * with placeholder lesson titles — the Levels page shows an honest
 * "coming soon" state for them instead of fabricated content. Add
 * `b1Modules`, `b2Modules` here as they're authored, following the same
 * `Module[]` shape as `a1Modules`.
 */
export const curriculum: LevelCurriculum[] = [
  { level: 'A1', modules: a1Modules },
  { level: 'A2', modules: a2Modules },
  { level: 'B1', modules: [] },
  { level: 'B2', modules: [] },
]
