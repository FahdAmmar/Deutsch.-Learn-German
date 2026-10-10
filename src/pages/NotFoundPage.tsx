import { Link } from 'react-router-dom'

import { Button } from '@/components/ui'

export default function NotFoundPage() {
  return (
    <div dir="rtl" className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <p lang="de" dir="ltr" className="display-de text-7xl font-semibold text-ink-faint sm:text-8xl">
        404
      </p>
      <div className="space-y-2">
        <h1 className="font-sans text-2xl font-bold text-ink">هذه الصفحة غير موجودة</h1>
        <p className="max-w-[40ch] text-ink-muted">ربما تم نقل الرابط أو أنه غير صحيح. يمكنك العودة إلى الرئيسية ومتابعة درسك.</p>
      </div>
      <Link to="/dashboard">
        <Button size="lg">العودة إلى الرئيسية</Button>
      </Link>
    </div>
  )
}
