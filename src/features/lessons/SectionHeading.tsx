import type { LucideIcon } from 'lucide-react'

interface SectionHeadingProps {
  icon: LucideIcon
  titleAr: string
  /** Anchor id, so the lesson's section rail can link here. */
  id?: string
}

export function SectionHeading({ icon: Icon, titleAr, id }: SectionHeadingProps) {
  return (
    <div dir="rtl" className="flex items-center gap-2.5">
      <Icon size={20} className="shrink-0 text-accent" aria-hidden="true" />
      <h2 id={id} className="font-sans text-xl font-bold text-ink">
        {titleAr}
      </h2>
    </div>
  )
}
