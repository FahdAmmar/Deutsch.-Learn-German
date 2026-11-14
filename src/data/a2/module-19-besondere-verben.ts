import type { Module } from '@/types'

import { lessonVerbenMitDativ } from './lesson-verben-mit-dativ'
import { lessonWissenKennen } from './lesson-wissen-kennen'

export const module19BesondereVerben: Module = {
  id: 'a2-m19',
  slug: 'besondere-verben',
  level: 'A2',
  title: 'Besondere Verben',
  titleAr: 'أفعال تحتاج إلى انتباه',
  order: 19,
  lessons: [lessonVerbenMitDativ, lessonWissenKennen],
}
