import type { LevelPath } from '@/types'

import { conversation, lesson, reading, rule } from './steps'

/**
 * The A2 learning path. It carries on from A1 as one plan, and follows the same principles (see `a1.ts`):
 * a rule right after the lesson that introduces it, a text or conversation only after the grammar it
 * leans on, next to the topic it is about.
 *
 * - The grammar lessons keep the order they had: Komparativ and the past first, reflexive verbs before the
 *   vocabulary lessons that use them (sich bewerben, sich treffen …), then clauses, then description and future.
 * - The thirteen vocabulary lessons of `a2-m15` are woven in where their topic and the grammar they lean on fit.
 * - Perfekt (rule 17) opens the chapter on the past: A1 only previews it in one lesson, and the roadmap
 *   teaches it here. Rule 31 (Perfekt oder Präteritum?) follows both tenses.
 * - Adjective endings, the Genitiv phrases of a text and the like are met receptively before their lesson;
 *   a text waits only for the structures that organise its sentences (a past tense, a subordinate clause,
 *   Futur I, a relative clause).
 *
 * A test asserts every A2 lesson, every A2 rule, every reading text and every standalone conversation of the
 * level appears exactly once, so nothing can silently drop out of the plan.
 */
export const a2Path: LevelPath = {
  level: 'A2',
  chapters: [
    {
      id: 'vergleichen-erzaehlen',
      titleAr: 'المقارنة والحكي',
      titleDe: 'Vergleichen und Erzählen',
      goalAr: 'تقارن بين الأشياء، وتحكي ما حدث بالماضي، وتتحدث عن أفعالك التي تعود على الفاعل.',
      steps: [
        lesson('a2-m01-l01'),
        rule(26),
        rule(17),
        lesson('a2-m02-l01'),
        rule(18),
        rule(31),
        lesson('a2-m04-l01'),
        rule(22),
        rule(23),
        reading('a2-read-05'),
        reading('a2-read-01'),
        reading('a2-read-10'),
      ],
    },
    {
      id: 'alltag-arbeit-geld',
      titleAr: 'الحياة اليومية والعمل والمال',
      titleDe: 'Alltag, Arbeit und Geld',
      goalAr: 'ترتّب يومك بالكلمات الزمنية، وتقول منذ متى وحتى متى، وتتحدث عن عملك ومالك وأوراقك الرسمية، وتطلب بأدب.',
      steps: [
        lesson('a2-m15-l12'),
        lesson('a2-m17-l01'),
        conversation('dialogue-a2-im-fitnessstudio'),
        lesson('a2-m15-l01'),
        lesson('a2-m15-l02'),
        lesson('a2-m16-l01'),
        conversation('dialogue-a2-hilfe-vom-nachbarn'),
        conversation('dialogue-a2-auf-der-bank'),
        conversation('dialogue-a2-beim-friseur'),
        lesson('a2-m15-l10'),
        rule(34),
      ],
    },
    {
      id: 'saetze-verbinden',
      titleAr: 'ربط الجمل',
      titleDe: 'Sätze verbinden',
      goalAr: 'تربط أفكارك بأدوات الربط، وتبني جملاً فرعية بـ weil وdass وwenn.',
      steps: [rule(27), lesson('a2-m03-l01'), rule(28), rule(29), rule(30), reading('a2-read-14')],
    },
    {
      id: 'saetze-erweitern',
      titleAr: 'جمل أطول',
      titleDe: 'Sätze erweitern',
      goalAr: 'تعبّر عن الغرض بـ um … zu، وتنقل الأسئلة بشكل غير مباشر، وتصف الأشياء بجمل الصلة.',
      steps: [
        lesson('a2-m10-l01'),
        conversation('dialogue-a2-vorstellungsgespraech'),
        lesson('a2-m09-l01'),
        conversation('dialogue-a2-gestern-im-buero'),
        lesson('a2-m08-l01'),
        conversation('dialogue-a2-im-handyshop'),
      ],
    },
    {
      id: 'wohnen-stadt',
      titleAr: 'السكن والمدينة',
      titleDe: 'Wohnen und Stadt',
      goalAr: 'تبحث عن شقة، وتصف بيتك وجيرانك، وتسجّل عنوانك، وتتنقّل في المدينة.',
      steps: [
        lesson('a2-m13-l01'),
        reading('a2-read-02'),
        lesson('a2-m15-l04'),
        rule(19),
        rule(20),
        rule(21),
        reading('a2-read-11'),
        conversation('dialogue-a2-beim-buergeramt'),
        lesson('a2-m15-l05'),
        conversation('dialogue-a2-am-informationsschalter'),
      ],
    },
    {
      id: 'reisen-natur',
      titleAr: 'السفر والطبيعة',
      titleDe: 'Reisen und Natur',
      goalAr: 'تسافر وتحجز فندقاً، وتتصرف في المطار، وتتحدث عن الطبيعة والبيئة.',
      steps: [
        lesson('a2-m11-l01'),
        reading('a2-read-04'),
        conversation('dialogue-a2-am-flughafen'),
        reading('a2-read-16'),
        lesson('a2-m15-l13'),
        conversation('dialogue-a2-im-hotel'),
        lesson('a2-m15-l09'),
        reading('a2-read-17'),
      ],
    },
    {
      id: 'gesundheit-gefuehle',
      titleAr: 'الصحة والمشاعر',
      titleDe: 'Gesundheit und Gefühle',
      goalAr: 'تشرح للطبيب ما يؤلمك، وتحجز موعداً، وتعبّر عن مشاعرك وطباعك، وتستخدم الأفعال المرتبطة بحرف جر.',
      steps: [
        lesson('a2-m12-l01'),
        reading('a2-read-03'),
        conversation('dialogue-a2-arzttermin'),
        conversation('dialogue-a2-treffen-absagen'),
        lesson('a2-m15-l06'),
        reading('a2-read-07'),
        lesson('a2-m15-l11'),
        lesson('a2-m18-l01'),
        conversation('dialogue-a2-pruefungsstress'),
      ],
    },
    {
      id: 'beschreiben-zukunft',
      titleAr: 'الوصف والمستقبل',
      titleDe: 'Beschreiben und Zukunft',
      goalAr: 'تصف الأشياء بدقّة، وتعبّر عن الملكية، وتتحدث عمّا سيحدث.',
      steps: [
        rule(24),
        lesson('a2-m05-l01'),
        rule(25),
        conversation('dialogue-a2-ein-geschenk'),
        lesson('a2-m06-l01'),
        rule(33),
        conversation('dialogue-a2-im-fundbuero'),
        lesson('a2-m07-l01'),
        rule(32),
        conversation('dialogue-a2-urlaubsplaene'),
        reading('a2-read-06'),
        reading('a2-read-15'),
      ],
    },
    {
      id: 'lernen-freizeit-feste',
      titleAr: 'الدراسة والفراغ والمناسبات',
      titleDe: 'Lernen, Freizeit und Feste',
      goalAr: 'تتحدث عن دراستك ووقت فراغك وطعامك ومناسباتك.',
      steps: [
        lesson('a2-m15-l07'),
        reading('a2-read-12'),
        lesson('a2-m15-l08'),
        reading('a2-read-09'),
        reading('a2-read-13'),
        lesson('a2-m15-l03'),
        conversation('dialogue-a2-beschwerde-im-restaurant'),
        lesson('a2-m14-l01'),
        reading('a2-read-08'),
        reading('a2-read-18'),
        conversation('dialogue-a2-zuckerfest'),
      ],
    },
  ],
}
