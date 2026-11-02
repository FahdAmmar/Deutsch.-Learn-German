import type { CEFRLevel, WritingTask } from '@/types'

import { a1WritingTasks } from './a1'
import { a2WritingTasks } from './a2'

export const WRITING_TASKS: readonly WritingTask[] = [...a1WritingTasks, ...a2WritingTasks]

export function getWritingTask(id: string | undefined): WritingTask | undefined {
  return WRITING_TASKS.find((task) => task.id === id)
}

export function getWritingTasksForLevel(level: CEFRLevel): WritingTask[] {
  return WRITING_TASKS.filter((task) => task.level === level)
}
