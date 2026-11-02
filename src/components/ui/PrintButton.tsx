import { Printer } from 'lucide-react'

import { Button } from './Button'

/** Opens the browser's print dialog for the page. It is not on the paper itself. */
export function PrintButton({ label = 'طباعة الصفحة' }: { label?: string }) {
  return (
    <Button variant="outline" size="sm" onClick={() => window.print()} icon={<Printer size={16} aria-hidden="true" />} className="print:hidden">
      {label}
    </Button>
  )
}
