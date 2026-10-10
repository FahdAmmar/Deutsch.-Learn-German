import { AlertTriangle } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Button } from '@/components/ui'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * React error boundaries must be class components — there is still no
 * hook equivalent of `getDerivedStateFromError`/`componentDidCatch`.
 * Mounted once at the app root (see `App.tsx`) so any unexpected render
 * error, anywhere in the tree, degrades to this screen rather than a
 * blank page with no way back in.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // No telemetry service is wired up in this project yet — at minimum,
    // make the failure visible in the console rather than swallowing it.
    console.error('Unhandled UI error caught by ErrorBoundary:', error, info.componentStack)
  }

  handleReturnHome = () => {
    this.setState({ hasError: false })
    window.location.assign('/dashboard')
  }

  render() {
    if (this.state.hasError) {
      return (
        <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg p-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-error-muted text-error">
            <AlertTriangle size={26} aria-hidden="true" />
          </span>
          <h1 className="text-xl font-bold text-ink">حدث خطأ غير متوقّع</h1>
          <p className="max-w-sm text-ink-muted">
            نعتذر عن الإزعاج. لم يستطع التطبيق عرض هذه الصفحة. جرّب العودة إلى الرئيسية.
          </p>
          <Button onClick={this.handleReturnHome}>العودة إلى الرئيسية</Button>
        </div>
      )
    }

    return this.props.children
  }
}
