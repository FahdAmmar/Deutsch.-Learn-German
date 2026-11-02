import { useEffect } from 'react'

import { preparePrint } from '@/lib/printPrep'

/**
 * Prepares the page whenever it is printed, however printing was started: the button, the browser's menu, or
 * the keyboard. The page is put back as soon as the print dialog closes.
 */
export function usePrintFriendly(): void {
  useEffect(() => {
    let restore: (() => void) | undefined
    const before = () => {
      restore?.()
      restore = preparePrint()
    }
    const after = () => {
      restore?.()
      restore = undefined
    }
    window.addEventListener('beforeprint', before)
    window.addEventListener('afterprint', after)
    return () => {
      after()
      window.removeEventListener('beforeprint', before)
      window.removeEventListener('afterprint', after)
    }
  }, [])
}
