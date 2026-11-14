import type { Module } from '@/types'

import { lessonAlltagDach } from './lesson-alltag-dach'
import { lessonAnzeigenProgramme } from './lesson-anzeigen-programme'
import { lessonDurchsagenAnrufbeantworter } from './lesson-durchsagen-anrufbeantworter'
import { lessonPraeteritumErkennen } from './lesson-praeteritum-erkennen'

export const module22LesenUndLeben: Module = {
  id: 'a2-m22',
  slug: 'lesen-und-leben',
  level: 'A2',
  title: 'Lesen und Leben in D-A-CH',
  titleAr: 'القراءة والحياة في D-A-CH',
  order: 22,
  lessons: [lessonPraeteritumErkennen, lessonAlltagDach, lessonAnzeigenProgramme, lessonDurchsagenAnrufbeantworter],
}
