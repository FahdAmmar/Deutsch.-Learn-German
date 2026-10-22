import type { ExerciseType } from '@/types'

/** Learner-facing names for the exercise types, in Arabic. */
export const EXERCISE_TYPE_LABEL_AR: Record<ExerciseType, string> = {
  'multiple-choice': 'اختيار من متعدد',
  'fill-blank': 'أكمل الفراغ',
  ordering: 'ترتيب الكلمات',
  matching: 'مطابقة',
  translation: 'ترجمة',
  'true-false': 'صح أو خطأ',
  listening: 'استماع',
  'vocab-recall': 'استرجاع المفردات',
}
