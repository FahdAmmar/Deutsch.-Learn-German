import type { LevelPath } from '@/types'

/**
 * The A2 learning path. Modules (`src/data/a2/`) stay the storage unit for lessons; this file only
 * sequences them into chapters. The grammar modules keep their order, and the thirteen vocabulary
 * lessons of `a2-m15` are woven in where their topic and the grammar they lean on fit:
 *
 * - reflexive verbs come first, because several vocabulary lessons use them (sich bewerben, sich treffen …);
 * - the time lesson comes before work and money, since its sequence words (zuerst, danach) open a clause;
 * - the vocabulary lessons use only constructions from A1 and from earlier in this path.
 *
 * A test asserts every A2 lesson appears exactly once, so nothing can silently drop out of the path.
 */
export const a2Path: LevelPath = {
  level: 'A2',
  chapters: [
    {
      id: 'vergleichen-erzaehlen',
      titleAr: 'المقارنة والحكي',
      titleDe: 'Vergleichen und Erzählen',
      goalAr: 'تقارن بين الأشياء، وتحكي ما حدث، وتتحدث عن أفعالك التي تعود على الفاعل.',
      visual: 'phrase',
      sample: { de: 'Im Winter ist es kälter als im Sommer.', ar: 'في الشتاء يكون الجو أبرد منه في الصيف.' },
      lessonIds: ['a2-m01-l01', 'a2-m02-l01', 'a2-m04-l01'],
    },
    {
      id: 'alltag-arbeit-geld',
      titleAr: 'الحياة اليومية والعمل والمال',
      titleDe: 'Alltag, Arbeit und Geld',
      goalAr: 'ترتّب يومك بالكلمات الزمنية، وتتحدث عن عملك ومالك وأوراقك الرسمية.',
      visual: 'phrase',
      sample: { de: 'Zuerst trinke ich Kaffee, danach gehe ich zur Arbeit.', ar: 'أولاً أشرب القهوة ثم أذهب إلى العمل.' },
      lessonIds: ['a2-m15-l12', 'a2-m15-l01', 'a2-m15-l02', 'a2-m15-l10'],
    },
    {
      id: 'saetze-verbinden',
      titleAr: 'ربط الجمل',
      titleDe: 'Sätze verbinden',
      goalAr: 'تربط أفكارك بجمل فرعية: weil وdass وwenn وum … zu والأسئلة غير المباشرة وجمل الصلة.',
      visual: 'phrase',
      sample: { de: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.', ar: 'أتعلّم الألمانية لأنني أريد العمل في ألمانيا.' },
      lessonIds: ['a2-m03-l01', 'a2-m10-l01', 'a2-m09-l01', 'a2-m08-l01'],
    },
    {
      id: 'wohnen-stadt',
      titleAr: 'السكن والمدينة',
      titleDe: 'Wohnen und Stadt',
      goalAr: 'تبحث عن شقة، وتصف بيتك وجيرانك، وتتنقّل في المدينة.',
      visual: 'phrase',
      sample: { de: 'Auf welcher Etage wohnst du?', ar: 'في أي طابق تسكن؟' },
      lessonIds: ['a2-m13-l01', 'a2-m15-l04', 'a2-m15-l05'],
    },
    {
      id: 'reisen-natur',
      titleAr: 'السفر والطبيعة',
      titleDe: 'Reisen und Natur',
      goalAr: 'تسافر وتحجز فندقاً، وتتحدث عن الطبيعة والبيئة.',
      visual: 'phrase',
      sample: { de: 'Ich habe ein Zimmer reserviert.', ar: 'حجزتُ غرفة.' },
      lessonIds: ['a2-m11-l01', 'a2-m15-l13', 'a2-m15-l09'],
    },
    {
      id: 'gesundheit-gefuehle',
      titleAr: 'الصحة والمشاعر',
      titleDe: 'Gesundheit und Gefühle',
      goalAr: 'تشرح للطبيب ما يؤلمك، وتعبّر عن مشاعرك وطباعك.',
      visual: 'phrase',
      sample: { de: 'Ich habe seit einer Woche Husten.', ar: 'أعاني من السعال منذ أسبوع.' },
      lessonIds: ['a2-m12-l01', 'a2-m15-l06', 'a2-m15-l11'],
    },
    {
      id: 'beschreiben-zukunft',
      titleAr: 'الوصف والمستقبل',
      titleDe: 'Beschreiben und Zukunft',
      goalAr: 'تصف الأشياء بدقّة، وتعبّر عن الملكية، وتتحدث عمّا سيحدث.',
      visual: 'phrase',
      sample: { de: 'Meine neue Wohnung ist sehr hell.', ar: 'شقتي الجديدة مضيئة جداً.' },
      lessonIds: ['a2-m05-l01', 'a2-m06-l01', 'a2-m07-l01'],
    },
    {
      id: 'lernen-freizeit-feste',
      titleAr: 'الدراسة والفراغ والمناسبات',
      titleDe: 'Lernen, Freizeit und Feste',
      goalAr: 'تتحدث عن دراستك ووقت فراغك وطعامك ومناسباتك.',
      visual: 'phrase',
      sample: { de: 'Wir feiern Silvester bei meinen Eltern.', ar: 'نحتفل بليلة رأس السنة عند والديّ.' },
      lessonIds: ['a2-m15-l07', 'a2-m15-l08', 'a2-m15-l03', 'a2-m14-l01'],
    },
  ],
}
