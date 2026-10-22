import type { ProgressState } from '@/types'

/**
 * The welcome step is for someone opening the app for the first time. A learner
 * who already has progress (anyone who used it before this step existed) never
 * sees it, whatever the flag says.
 */
export function shouldShowOnboarding(
  onboardingDone: boolean,
  progress: Pick<ProgressState, 'lessons' | 'activity' | 'vocabulary'>,
): boolean {
  if (onboardingDone) return false
  const hasProgress =
    Object.keys(progress.lessons).length > 0 || progress.activity.length > 0 || Object.keys(progress.vocabulary).length > 0
  return !hasProgress
}
