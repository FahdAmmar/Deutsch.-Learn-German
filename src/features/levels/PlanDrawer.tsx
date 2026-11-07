import { X } from 'lucide-react'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { CurriculumGate } from '@/components/CurriculumGate'
import { useDialogFocus } from '@/hooks/useDialogFocus'

import { getStepKeyForPath } from './activeStepKey'
import { PlanSidelist } from './PlanSidelist'

interface PlanDrawerProps {
  onClose: () => void
}

/** Under the curriculum gate, so a lesson's address can be turned into its step. */
function DrawerList({ onClose }: PlanDrawerProps) {
  const { pathname } = useLocation()
  return <PlanSidelist activeKey={getStepKeyForPath(pathname)} onNavigate={onClose} />
}

/** The A1 → A2 plan as a panel that opens over any page, so the learner can jump anywhere without leaving the lesson first. */
export default function PlanDrawer({ onClose }: PlanDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  useDialogFocus(true, panelRef, onClose)

  return (
    <div className="print:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="خطة الدراسة">
      <button
        type="button"
        aria-label="إغلاق خطة الدراسة"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 animate-[pop-in_150ms_ease-out_both] bg-ink/45"
      />
      <div
        ref={panelRef}
        className="absolute inset-y-0 start-0 flex w-96 max-w-[92vw] animate-[pop-in_200ms_ease-out_both] flex-col bg-surface shadow-lg"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border ps-5 pe-3">
          <h2 dir="rtl" className="text-lg font-bold text-ink">
            خطة الدراسة
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <CurriculumGate>
            <DrawerList onClose={onClose} />
          </CurriculumGate>
        </div>
      </div>
    </div>
  )
}
