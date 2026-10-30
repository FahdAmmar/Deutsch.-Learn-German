import type { Module } from '@/types'

import { lessonAmt } from './wortschatz/theme-10-amt'
import { lessonArbeit } from './wortschatz/theme-01-arbeit'
import { lessonEssen } from './wortschatz/theme-03-essen'
import { lessonFreizeit } from './wortschatz/theme-08-freizeit'
import { lessonGefuehle } from './wortschatz/theme-11-gefuehle'
import { lessonGeld } from './wortschatz/theme-02-geld'
import { lessonGesundheit } from './wortschatz/theme-06-gesundheit'
import { lessonNatur } from './wortschatz/theme-09-natur'
import { lessonSchule } from './wortschatz/theme-07-schule'
import { lessonUrlaub } from './wortschatz/theme-13-urlaub'
import { lessonVerkehr } from './wortschatz/theme-05-verkehr'
import { lessonWohnen } from './wortschatz/theme-04-wohnen'
import { lessonZeit } from './wortschatz/theme-12-zeit'
import { WORTSCHATZ_MODULE_ID } from './wortschatz/builders'

/**
 * Thirteen vocabulary-themed lessons. They teach no new grammar: each one widens the word stock
 * of an everyday topic and reuses only constructions met earlier, so they can sit anywhere on the
 * A2 learning path (`data/paths/a2.ts` decides where). The lessons live in `./wortschatz/`.
 */
export const module15Wortschatz: Module = {
  id: WORTSCHATZ_MODULE_ID,
  slug: 'themenwortschatz',
  level: 'A2',
  title: 'Themenwortschatz',
  titleAr: 'مفردات المواضيع',
  order: 15,
  lessons: [
    lessonArbeit,
    lessonGeld,
    lessonEssen,
    lessonWohnen,
    lessonVerkehr,
    lessonGesundheit,
    lessonSchule,
    lessonFreizeit,
    lessonNatur,
    lessonAmt,
    lessonGefuehle,
    lessonZeit,
    lessonUrlaub,
  ],
}
