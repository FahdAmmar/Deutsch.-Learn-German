import type { ReactNode } from 'react'

import { Switch } from '@/components/ui'

interface SettingRowProps {
  id: string
  title: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** A labelled on/off setting: the title and its explanation beside the switch. */
export function SettingRow({ id, title, description, checked, onChange }: SettingRowProps) {
  return (
    <div dir="rtl" className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className="font-semibold text-ink">
          {title}
        </label>
        {description ? <p className="text-sm text-ink-muted">{description}</p> : null}
      </div>
      <Switch id={id} checked={checked} onChange={onChange} label={title} />
    </div>
  )
}

interface SettingGroupProps {
  title: string
  description?: string
  children: ReactNode
}

/** A titled sub-group inside a settings card (e.g. "حجم النص" with its choices below). */
export function SettingGroup({ title, description, children }: SettingGroupProps) {
  return (
    <div dir="rtl" role="group" aria-label={title} className="space-y-3">
      <div>
        <p className="font-semibold text-ink">{title}</p>
        {description ? <p className="text-sm text-ink-muted">{description}</p> : null}
      </div>
      {children}
    </div>
  )
}
