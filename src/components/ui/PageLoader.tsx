export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-strong border-t-primary" />
      <span className="sr-only">جارٍ التحميل...</span>
    </div>
  )
}
