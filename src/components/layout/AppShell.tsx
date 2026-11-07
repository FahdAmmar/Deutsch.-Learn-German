import { Suspense, useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useSearchShortcut } from '@/features/search/useSearchShortcut'
import { usePrintFriendly } from '@/hooks/usePrintFriendly'
import { lazyWithReload } from '@/lib/lazyWithReload'

import { BottomNav } from './BottomNav'
import { Header } from './Header'
import { MobileDrawer } from './MobileDrawer'
import { OfflineBanner } from './OfflineBanner'
import { Sidebar } from './Sidebar'

// Loaded the first time search is opened, so it adds nothing to the initial bundle.
const SearchDialog = lazyWithReload(() => import('@/features/search/SearchDialog'))
// The study plan panel is loaded the first time it is opened, together with the curriculum it lists.
const PlanDrawer = lazyWithReload(() => import('@/features/levels/PlanDrawer'))

export function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])
  const [searchOpen, setSearchOpen] = useState(false)
  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const [planOpen, setPlanOpen] = useState(false)
  const openPlan = useCallback(() => setPlanOpen(true), [])
  const closePlan = useCallback(() => setPlanOpen(false), [])
  useSearchShortcut(openSearch)
  usePrintFriendly()

  return (
    <div className="min-h-dvh bg-bg">
      <a
        href="#main"
        className="print:hidden sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        <span dir="rtl">تخطّي إلى المحتوى</span>
      </a>
      <Sidebar />
      <div className="flex min-h-dvh flex-col md:ps-72 print:ps-0">
        <Header onOpenSearch={openSearch} onOpenPlan={openPlan} />
        <OfflineBanner />
        <main id="main" className="flex-1 px-4 pt-6 pb-28 md:px-10 md:pt-8 md:pb-12 print:p-0">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
      <BottomNav onOpenMore={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
      {planOpen ? (
        <Suspense fallback={null}>
          <PlanDrawer onClose={closePlan} />
        </Suspense>
      ) : null}
      {searchOpen ? (
        <Suspense fallback={null}>
          <SearchDialog onClose={closeSearch} />
        </Suspense>
      ) : null}
    </div>
  )
}
