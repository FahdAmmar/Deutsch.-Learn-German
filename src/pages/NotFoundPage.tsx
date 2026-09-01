import { Link } from 'react-router-dom'

import { Button } from '@/components/ui'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center" dir="rtl">
      <span className="font-mono text-6xl font-bold text-primary-muted select-none">404</span>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-ink">هذه الصفحة غير موجودة</h1>
        <p className="text-ink-muted">ربما تم نقل الرابط أو أنه غير صحيح.</p>
      </div>
      <Link to="/dashboard">
        <Button>العودة إلى الرئيسية</Button>
      </Link>
    </div>
  )
}
