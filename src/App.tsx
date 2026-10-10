import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PwaUpdatePrompt } from '@/components/PwaUpdatePrompt'
import { router } from '@/routes/router'
import { initThemeSystemListener } from '@/store/themeStore'
import { useSettingsStore } from '@/store/settingsStore'

function App() {
  const reducedMotion = useSettingsStore((state) => state.settings.reducedMotion)

  // Keep the app in sync with OS-level theme changes while the user's
  // preference is "system".
  useEffect(() => initThemeSystemListener(), [])

  // The user-level "reduce motion" preference layers on top of (doesn't
  // replace) the OS-level `prefers-reduced-motion` media query already
  // handled in index.css.
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reducedMotion)
  }, [reducedMotion])

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <PwaUpdatePrompt />
    </ErrorBoundary>
  )
}

export default App
