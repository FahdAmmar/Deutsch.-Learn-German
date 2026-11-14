import type { Module } from '@/types'
import { lessonWeilDenn } from './lesson-weil-denn'

import { lessonDeshalbTrotzdem } from './lesson-deshalb-trotzdem'
import { lessonVorschlaegeRatschlaege } from './lesson-vorschlaege-ratschlaege'

export const module20MeinungRatBegruendung: Module = {
  id: 'a2-m20',
  slug: 'meinung-rat-begruendung',
  level: 'A2',
  title: 'Meinung, Rat und Begründung',
  titleAr: 'الرأي والنصيحة والتعليل',
  order: 20,
  lessons: [lessonDeshalbTrotzdem, lessonVorschlaegeRatschlaege, lessonWeilDenn],
}
