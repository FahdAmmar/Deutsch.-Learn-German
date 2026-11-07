import type { PathStep } from '@/types'

/**
 * One-word constructors so a chapter reads like the order a learner walks it:
 *
 *   steps: [lesson('a1-m03-l03'), rule(3), reading('a1-read-02')]
 */
export const lesson = (id: string): PathStep => ({ kind: 'lesson', id })
export const rule = (number: number): PathStep => ({ kind: 'rule', number })
export const reading = (id: string): PathStep => ({ kind: 'reading', id })
export const conversation = (id: string): PathStep => ({ kind: 'conversation', id })
