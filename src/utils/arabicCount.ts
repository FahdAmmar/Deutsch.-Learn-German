/**
 * Arabic number agreement. The counted noun changes form with the number:
 *   1       → singular            (وحدة)
 *   2       → dual                (وحدتان)
 *   3–10    → plural              (وحدات)
 *   11+     → singular, accusative (وحدة / درساً)
 */
export interface ArabicCountForms {
  one: string
  two: string
  few: string
  many: string
}

export function countAr(n: number, forms: ArabicCountForms): string {
  if (n === 1) return forms.one
  if (n === 2) return forms.two
  if (n >= 11) return forms.many
  return forms.few
}

/** "20 وحدة", "3 دروس" — number and correctly inflected noun together. A count of one or two reads naturally as the bare word. */
export function formatCountAr(n: number, forms: ArabicCountForms): string {
  if (n === 1) return forms.one
  if (n === 2) return forms.two
  return `${n} ${countAr(n, forms)}`
}

export const LESSON_FORMS: ArabicCountForms = { one: 'درس واحد', two: 'درسان', few: 'دروس', many: 'درساً' }
export const MODULE_FORMS: ArabicCountForms = { one: 'وحدة واحدة', two: 'وحدتان', few: 'وحدات', many: 'وحدة' }
export const CHAPTER_FORMS: ArabicCountForms = { one: 'فصل واحد', two: 'فصلان', few: 'فصول', many: 'فصلاً' }
export const WORD_FORMS: ArabicCountForms = { one: 'كلمة واحدة', two: 'كلمتان', few: 'كلمات', many: 'كلمة' }
export const DAY_FORMS: ArabicCountForms = { one: 'يوم واحد', two: 'يومان', few: 'أيام', many: 'يوماً' }
