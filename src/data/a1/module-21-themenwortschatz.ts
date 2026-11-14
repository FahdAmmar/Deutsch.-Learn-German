import type { Module } from '@/types'

import { lessonAussehen } from './wortschatz/theme-06-aussehen'
import { lessonLebensmittel } from './wortschatz/theme-02-lebensmittel'
import { lessonOrte } from './wortschatz/theme-01-orte'
import { lessonSchule } from './wortschatz/theme-03-schule'
import { lessonTageszeiten } from './wortschatz/theme-04-tageszeiten'
import { lessonVerkehrsmittel } from './wortschatz/theme-05-verkehrsmittel'
import { lessonHandyInternet } from './wortschatz/theme-07-handy-internet'
import { lessonFesteWuensche } from './wortschatz/theme-08-feste-wuensche'
import { A1_WORTSCHATZ_MODULE_ID } from './wortschatz/builders'

/**
 * Eight vocabulary-themed lessons for the A1 level, built like the A2 "Themenwortschatz" (see
 * `../a2/module-15-wortschatz.ts`): they widen the word stock of an everyday topic and reuse only constructions
 * met earlier, so each can sit where its topic fits on the learning path (`data/paths/a1.ts` decides where).
 */
export const module21Themenwortschatz: Module = {
  id: A1_WORTSCHATZ_MODULE_ID,
  slug: 'themenwortschatz',
  level: 'A1',
  title: 'Themenwortschatz',
  titleAr: 'مفردات المواضيع',
  order: 21,
  lessons: [lessonOrte, lessonLebensmittel, lessonSchule, lessonTageszeiten, lessonVerkehrsmittel, lessonAussehen, lessonHandyInternet, lessonFesteWuensche],
}
