import type { LevelPath } from '@/types'

import { conversation, lesson, reading, rule } from './steps'

/**
 * The A1 learning path: the order a beginner should actually walk through the level.
 *
 * A chapter is not only lessons. Each one interleaves the four things the app teaches — a lesson, the
 * grammar rule behind it, a reading text, a conversation — in the order they depend on each other:
 *
 * - a grammar rule comes right after the lesson that introduces it, as the place to see the rule whole
 *   and be tested on it;
 * - a text or conversation comes after the grammar it leans on, never before (a text with separable
 *   verbs follows the separable-verb lesson), and next to the topic it is about;
 * - the rules of the A2 roadmap that an A1 lesson only previews (Perfekt, Komparativ, Wechselpräpositionen)
 *   are not steps here; they are placed in the A2 path, where the roadmap teaches them.
 *
 * Lessons, rules and stories stay where they are authored; this file only sequences them. Tests assert
 * that every A1 lesson, every A1 rule, every reading text and every standalone conversation of the level
 * appears exactly once, so nothing can silently drop out of the plan.
 */
export const a1Path: LevelPath = {
  level: 'A1',
  chapters: [
    {
      id: 'ankommen',
      titleAr: 'البداية',
      titleDe: 'Ankommen',
      goalAr: 'تحيّي الناس، وتعرّف بنفسك، وتسأل الأسئلة الأولى.',
      steps: [lesson('a1-m01-l01'), lesson('a1-m01-l02'), lesson('a1-m01-l06')],
    },
    {
      id: 'buchstaben-zahlen',
      titleAr: 'الحروف والأرقام',
      titleDe: 'Buchstaben und Zahlen',
      goalAr: 'تنطق كل حرف، وتتهجّى اسمك، وتعدّ بالأرقام، وتقدّم نفسك في نص قصير.',
      steps: [lesson('a1-m01-l03'), lesson('a1-m01-l04'), reading('a1-read-01')],
    },
    {
      id: 'tage-uhrzeit',
      titleAr: 'الأيام والوقت',
      titleDe: 'Tage und Uhrzeit',
      goalAr: 'تقول اليوم والتاريخ والساعة، وتصف يومك.',
      steps: [lesson('a1-m02-l05'), lesson('a1-m02-l06'), lesson('a1-m02-l04'), lesson('a1-m02-l03'), reading('a1-read-02')],
    },
    {
      id: 'grammatik-fundament',
      titleAr: 'أساس القواعد',
      titleDe: 'Grammatik-Fundament',
      goalAr: 'تبني جملة صحيحة بالضمائر وsein وhaben والأفعال والأدوات والمفعول به.',
      steps: [
        lesson('a1-m01-l05'),
        rule(1),
        lesson('a1-m03-l01'),
        lesson('a1-m03-l02'),
        rule(2),
        lesson('a1-m03-l03'),
        rule(3),
        rule(4),
        rule(5),
        lesson('a1-m03-l04'),
        rule(6),
        rule(7),
        lesson('a1-m03-l05'),
        rule(9),
      ],
    },
    {
      id: 'meine-welt',
      titleAr: 'عالمي',
      titleDe: 'Meine Welt',
      goalAr: 'تتحدث عن عائلتك ومهنتك وبيتك وجسمك، وتتعرّف على جيرانك.',
      steps: [
        lesson('a1-m02-l01'),
        reading('a1-read-03'),
        lesson('a1-m02-l02'),
        lesson('a1-m04-l01'),
        reading('a1-read-04'),
        lesson('a1-m05-l01'),
        rule(15),
        rule(16),
        conversation('dialogue-a1-neue-nachbarn'),
      ],
    },
    {
      id: 'verben-saetze',
      titleAr: 'الأفعال وبناء الجملة',
      titleDe: 'Verben und Sätze',
      goalAr: 'تعبّر عن القدرة والرغبة والواجب، وتنفي جملتك، وتتحدث عمّا تملك.',
      steps: [
        lesson('a1-m06-l01'),
        rule(11),
        conversation('dialogue-a1-am-telefon'),
        lesson('a1-m07-l01'),
        rule(8),
        reading('a1-read-14'),
        lesson('a1-m08-l01'),
        rule(10),
        reading('a1-read-12'),
        lesson('a1-m09-l01'),
      ],
    },
    {
      id: 'verben-praepositionen',
      titleAr: 'أفعال الحياة اليومية',
      titleDe: 'Verben im Alltag',
      goalAr: 'تستخدم الأفعال المنفصلة وحروف الجر، وتحكي ما حدث، وتعطي أمراً أو نصيحة.',
      steps: [
        lesson('a1-m10-l01'),
        rule(12),
        reading('a1-read-16'),
        reading('a1-read-15'),
        lesson('a1-m11-l01'),
        rule(14),
        reading('a1-read-06'),
        lesson('a1-m12-l01'),
        lesson('a1-m13-l01'),
        rule(13),
        conversation('dialogue-a1-in-der-apotheke'),
      ],
    },
    {
      id: 'einkaufen-essen',
      titleAr: 'التسوّق والطعام',
      titleDe: 'Einkaufen und Essen',
      goalAr: 'تشتري ما تحتاجه، وتطلب في المقهى والمطعم، وتدفع الحساب.',
      steps: [
        lesson('a1-m14-l01'),
        reading('a1-read-07'),
        lesson('a1-m19-l01'),
        reading('a1-read-11'),
        reading('a1-read-05'),
        conversation('dialogue-a1-zahlen-bitte'),
      ],
    },
    {
      id: 'wetter-freizeit',
      titleAr: 'الطقس والملابس والفراغ',
      titleDe: 'Wetter, Kleidung und Freizeit',
      goalAr: 'تصف الطقس وملابسك، وتتحدث عن هواياتك وعدد مرات ممارستها.',
      steps: [
        lesson('a1-m15-l01'),
        lesson('a1-m18-l01'),
        reading('a1-read-08'),
        lesson('a1-m17-l01'),
        lesson('a1-m20-l01'),
        reading('a1-read-09'),
        reading('a1-read-17'),
      ],
    },
    {
      id: 'unterwegs-kurs',
      titleAr: 'في الطريق وفي الدورة',
      titleDe: 'Unterwegs und im Deutschkurs',
      goalAr: 'تسأل عن الطريق، وتحجز غرفة في فندق، وتسجّل في دورة لغة، وتحكي عن دراستك.',
      steps: [
        lesson('a1-m16-l01'),
        reading('a1-read-10'),
        conversation('dialogue-a1-im-hotel'),
        conversation('dialogue-a1-anmeldung-deutschkurs'),
        reading('a1-read-13'),
      ],
    },
  ],
}
