import type { CEFRLevel, SpeakingTask } from '@/types'

import { a1SpeakingTasks } from './a1'
import { a2SpeakingTasks } from './a2'

export const SPEAKING_TASKS: readonly SpeakingTask[] = [...a1SpeakingTasks, ...a2SpeakingTasks]

export function getSpeakingTask(id: string | undefined): SpeakingTask | undefined {
  return SPEAKING_TASKS.find((task) => task.id === id)
}

export function getSpeakingTasksForLevel(level: CEFRLevel): SpeakingTask[] {
  return SPEAKING_TASKS.filter((task) => task.level === level)
}
