import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PwaUpdatePrompt } from '@/components/PwaUpdatePrompt'
import { router } from '@/routes/router'
import { useApplyPreferences } from '@/hooks/useApplyPreferences'
import { initThemeSystemListener } from '@/store/themeStore'

function App() {
  useApplyPreferences()

  // Keep the app in sync with OS-level theme changes while the user's
  // preference is "system".
  useEffect(() => initThemeSystemListener(), [])

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <PwaUpdatePrompt />
    </ErrorBoundary>
  )
}

export default App
