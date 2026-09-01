/**
 * Common European Framework of Reference for Languages levels supported
 * by the platform, in ascending order of difficulty.
 */
export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2'] as const

export type CEFRLevel = (typeof CEFR_LEVELS)[number]

export const CEFR_LEVEL_INFO: Record<
  CEFRLevel,
  { titleDe: string; titleAr: string; descriptionAr: string }
> = {
  A1: {
    titleDe: 'Deutsch für Anfänger',
    titleAr: 'الألمانية للمبتدئين',
    descriptionAr: 'أساسيات اللغة الألمانية: التحية، التعارف، الأرقام، والجمل البسيطة.',
  },
  A2: {
    titleDe: 'Grundlegende Kenntnisse',
    titleAr: 'المستوى الأساسي المتقدم',
    descriptionAr: 'توسيع المفردات والتواصل في مواقف الحياة اليومية.',
  },
  B1: {
    titleDe: 'Fortgeschrittene Sprachverwendung',
    titleAr: 'المستوى المتوسط',
    descriptionAr: 'التعبير المستقل عن الآراء والتجارب في سياقات متنوعة.',
  },
  B2: {
    titleDe: 'Selbstständige Sprachverwendung',
    titleAr: 'المستوى فوق المتوسط',
    descriptionAr: 'التواصل بطلاقة حول مواضيع معقدة ومجردة.',
  },
}
