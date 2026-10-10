import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { BottomNav } from './BottomNav'
import { Header } from './Header'
import { MobileDrawer } from './MobileDrawer'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <div className="min-h-dvh bg-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        <span dir="rtl">تخطّي إلى المحتوى</span>
      </a>
      <Sidebar />
      <div className="flex min-h-dvh flex-col md:ps-64">
        <Header />
        <main id="main" className="flex-1 px-4 pt-6 pb-28 md:px-10 md:pt-10 md:pb-12">
          <div className="mx-auto w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
      <BottomNav onOpenMore={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </div>
  )
}
