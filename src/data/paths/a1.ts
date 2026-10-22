import type { LevelPath } from '@/types'

/**
 * The A1 learning path: the order a beginner should actually walk through the
 * level. Modules (`src/data/a1/`) remain the storage unit for lessons; this
 * file only sequences them into chapters, so lessons can be re-ordered here
 * without touching lesson content. A test asserts every A1 lesson appears
 * exactly once, so nothing can silently drop out of the path.
 */
export const a1Path: LevelPath = {
  level: 'A1',
  chapters: [
    {
      id: 'ankommen',
      titleAr: 'البداية',
      titleDe: 'Ankommen',
      goalAr: 'تحيّي الناس وتعرّف بنفسك.',
      visual: 'phrase',
      sample: { de: 'Hallo! Ich heiße Lina.', ar: 'مرحباً! اسمي لينا.' },
      lessonIds: ['a1-m01-l01', 'a1-m01-l02'],
    },
    {
      id: 'buchstaben-zahlen',
      titleAr: 'الحروف والأرقام',
      titleDe: 'Buchstaben und Zahlen',
      goalAr: 'تنطق كل حرف، وتتهجّى اسمك، وتعدّ بالأرقام.',
      visual: 'letters',
      lessonIds: ['a1-m01-l03', 'a1-m01-l04'],
    },
    {
      id: 'tage-uhrzeit',
      titleAr: 'الأيام والوقت',
      titleDe: 'Tage und Uhrzeit',
      goalAr: 'تقول اليوم والشهر والساعة، وتصف يومك.',
      visual: 'time',
      lessonIds: ['a1-m02-l05', 'a1-m02-l04', 'a1-m02-l03'],
    },
    {
      id: 'grammatik-fundament',
      titleAr: 'أساس القواعد',
      titleDe: 'Grammatik-Fundament',
      goalAr: 'تبني جملة صحيحة بالضمائر وsein وhaben والأدوات والمفعول به.',
      visual: 'sentence',
      lessonIds: ['a1-m01-l05', 'a1-m03-l01', 'a1-m03-l02', 'a1-m03-l03', 'a1-m03-l04', 'a1-m03-l05'],
    },
    {
      id: 'meine-welt',
      titleAr: 'عالمي',
      titleDe: 'Meine Welt',
      goalAr: 'تتحدث عن عائلتك ومهنتك وبيتك وجسمك.',
      visual: 'phrase',
      sample: { de: 'Das ist meine Familie.', ar: 'هذه عائلتي.' },
      lessonIds: ['a1-m02-l01', 'a1-m02-l02', 'a1-m04-l01', 'a1-m05-l01'],
    },
    {
      id: 'verben-saetze',
      titleAr: 'الأفعال وبناء الجملة',
      titleDe: 'Verben und Sätze',
      goalAr: 'توسّع جملك بالأفعال الشرطية والنفي والملكية والأمر والماضي.',
      visual: 'phrase',
      sample: { de: 'Ich kann Deutsch sprechen.', ar: 'أستطيع التحدث بالألمانية.' },
      lessonIds: [
        'a1-m06-l01',
        'a1-m07-l01',
        'a1-m08-l01',
        'a1-m09-l01',
        'a1-m10-l01',
        'a1-m11-l01',
        'a1-m12-l01',
        'a1-m13-l01',
      ],
    },
    {
      id: 'alltag',
      titleAr: 'مواقف الحياة اليومية',
      titleDe: 'Alltag',
      goalAr: 'تتصرف في التسوق والطعام والطقس والاتجاهات والهوايات.',
      visual: 'phrase',
      sample: { de: 'Wie viel kostet das?', ar: 'كم يكلّف هذا؟' },
      lessonIds: ['a1-m14-l01', 'a1-m15-l01', 'a1-m16-l01', 'a1-m17-l01', 'a1-m18-l01', 'a1-m19-l01', 'a1-m20-l01'],
    },
  ],
}
