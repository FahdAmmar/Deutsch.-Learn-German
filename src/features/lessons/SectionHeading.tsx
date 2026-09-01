import type { LucideIcon } from 'lucide-react'

interface SectionHeadingProps {
  icon: LucideIcon
  titleAr: string
}

export function SectionHeading({ icon: Icon, titleAr }: SectionHeadingProps) {
  return (
    <div dir="rtl" className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-muted text-primary">
        <Icon size={16} aria-hidden="true" />
      </span>
      <h2 className="text-base font-semibold text-ink">{titleAr}</h2>
    </div>
  )
}
