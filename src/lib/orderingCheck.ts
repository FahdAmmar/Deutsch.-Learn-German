import type { OrderingExercise } from '@/types'

/** Every order that counts as right: the one the exercise names, and any it lists besides. */
export function acceptedOrders(exercise: Pick<OrderingExercise, 'correctOrder' | 'acceptedOrders'>): number[][] {
  return [exercise.correctOrder, ...(exercise.acceptedOrders ?? [])]
}

/** Whether the learner's placement (indices into `words`, in the order placed) is one of the right orders. */
export function isOrderCorrect(exercise: Pick<OrderingExercise, 'correctOrder' | 'acceptedOrders'>, placed: readonly number[]): boolean {
  return acceptedOrders(exercise).some((order) => order.length === placed.length && order.every((wordIndex, position) => wordIndex === placed[position]))
}
