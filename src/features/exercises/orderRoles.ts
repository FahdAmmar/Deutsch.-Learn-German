import type { OrderRole } from '@/types'

/**
 * How each part of a sentence looks when a built sentence is shown with its structure. The label always
 * says the role in words, so the colour never carries the meaning alone; each pair of text and
 * background colour is one the design tokens guarantee at 4.5:1.
 */
export interface RoleStyle {
  labelAr: string
  className: string
}

export const ROLE_STYLE: Record<OrderRole, RoleStyle> = {
  subject: { labelAr: 'الفاعل', className: 'border-primary bg-primary-muted text-primary' },
  verb: { labelAr: 'الفعل', className: 'border-accent-vivid bg-accent-muted text-accent' },
  'verb-end': { labelAr: 'الفعل (الجزء الثاني)', className: 'border-accent-vivid border-dashed bg-accent-muted text-accent' },
  object: { labelAr: 'المفعول به', className: 'border-plum-vivid bg-plum-muted text-plum' },
  time: { labelAr: 'الزمان', className: 'border-highlight bg-highlight-muted text-highlight' },
  manner: { labelAr: 'الطريقة', className: 'border-border-strong bg-surface-sunken text-ink' },
  place: { labelAr: 'المكان', className: 'border-success bg-success-muted text-success' },
  'question-word': { labelAr: 'أداة السؤال', className: 'border-error bg-error-muted text-error' },
  conjunction: { labelAr: 'أداة الربط', className: 'border-border-strong bg-surface-sunken text-ink' },
  other: { labelAr: 'تكملة', className: 'border-border-strong bg-surface-sunken text-ink' },
}
