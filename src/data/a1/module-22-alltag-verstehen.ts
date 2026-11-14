import type { Module } from '@/types'

import { lessonSchilderAushaenge } from './lesson-schilder-aushaenge'
import { lessonTelefonDurchsage } from './lesson-telefon-durchsage'

/**
 * Reading and listening in everyday life at A1: the short public texts (signs, notices, small ads) and the two
 * spoken texts of the Goethe-Zertifikat A1 listening part (an answering-machine message and an announcement).
 * Mirrors `../a2/module-22-lesen-und-leben.ts`; the learning path decides where each lesson sits.
 */
export const module22AlltagVerstehen: Module = {
  id: 'a1-m22',
  slug: 'alltag-verstehen',
  level: 'A1',
  title: 'Lesen und Hören im Alltag',
  titleAr: 'القراءة والاستماع في الحياة اليومية',
  order: 22,
  lessons: [lessonSchilderAushaenge, lessonTelefonDurchsage],
}
