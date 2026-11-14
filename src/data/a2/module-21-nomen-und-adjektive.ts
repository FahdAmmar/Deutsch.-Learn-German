import type { Module } from '@/types'
import { lessonDerWoerter } from './lesson-der-woerter'

import { lessonAdjektiveDativ } from './lesson-adjektive-dativ'
import { lessonNDeklination } from './lesson-n-deklination'
import { lessonWortbildung } from './lesson-wortbildung'

export const module21NomenUndAdjektive: Module = {
  id: 'a2-m21',
  slug: 'nomen-und-adjektive',
  level: 'A2',
  title: 'Nomen und Adjektive',
  titleAr: 'الأسماء والصفات',
  order: 21,
  lessons: [lessonNDeklination, lessonAdjektiveDativ, lessonDerWoerter, lessonWortbildung],
}
