import { Download, Monitor, Moon, RotateCcw, Sun, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button, Card, PageHeader, Switch } from '@/components/ui'
import { cn } from '@/lib/cn'
import { parseProgressImport, serializeProgress } from '@/lib/progressExport'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useThemeStore } from '@/store/themeStore'
import { todayKey } from '@/utils/date'
import type { ProgressState } from '@/types'
import type { ThemePreference } from '@/types/settings'

const THEME_OPTIONS: { value: ThemePreference; icon: typeof Sun; labelAr: string }[] = [
  { value: 'light', icon: Sun, labelAr: 'فاتح' },
  { value: 'dark', icon: Moon, labelAr: 'داكن' },
  { value: 'system', icon: Monitor, labelAr: 'النظام' },
]

export default function SettingsPage() {
  const themePreference = useThemeStore((state) => state.preference)
  const setThemePreference = useThemeStore((state) => state.setPreference)

  const settings = useSettingsStore((state) => state.settings)
  const setAutoPlayPronunciation = useSettingsStore((state) => state.setAutoPlayPronunciation)
  const setSpeechRate = useSettingsStore((state) => state.setSpeechRate)
  const setReducedMotion = useSettingsStore((state) => state.setReducedMotion)

  const resetProgress = useProgressStore((state) => state.resetProgress)
  const replaceProgress = useProgressStore((state) => state.replaceProgress)
  const [confirmingReset, setConfirmingReset] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pendingImport, setPendingImport] = useState<ProgressState | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [importSuccess, setImportSuccess] = useState(false)

  function handleResetProgress() {
    if (!confirmingReset) {
      setConfirmingReset(true)
      return
    }
    resetProgress()
    setConfirmingReset(false)
  }

  function handleExport() {
    const json = serializeProgress(useProgressStore.getState())
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `learn-german-progress-${todayKey()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  async function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    // Allow re-selecting the same file later even if this attempt fails.
    event.target.value = ''
    if (!file) return

    setImportSuccess(false)
    const text = await file.text()
    const result = parseProgressImport(text)

    if (!result.success) {
      setImportError(result.error)
      setPendingImport(null)
      return
    }

    setImportError(null)
    setPendingImport(result.data)
  }

  function confirmImport() {
    if (!pendingImport) return
    replaceProgress(pendingImport)
    setPendingImport(null)
    setImportSuccess(true)
  }

  return (
    <div className="space-y-10 pb-6">
      <PageHeader title="الإعدادات" description="خصّص طريقة تعلّمك." />

      <SettingsSection title="المظهر">
        <div dir="rtl" role="group" aria-label="المظهر" className="grid max-w-md grid-cols-3 gap-2">
          {THEME_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={themePreference === option.value}
              onClick={() => setThemePreference(option.value)}
              className={cn(
                'flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-md border-2 px-3 py-3 text-sm font-semibold transition-colors',
                themePreference === option.value
                  ? 'border-accent bg-accent-muted text-ink'
                  : 'border-border text-ink-muted hover:border-border-strong hover:text-ink',
              )}
            >
              <option.icon size={20} aria-hidden="true" />
              {option.labelAr}
            </button>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="النطق">
        <div dir="rtl" className="flex items-center justify-between gap-4">
          <div>
            <label htmlFor="autoplay-switch" className="font-semibold text-ink">
              تشغيل النطق تلقائياً
            </label>
            <p className="text-sm text-ink-muted">نطق الجمل الألمانية تلقائياً عند فتح الدرس.</p>
          </div>
          <Switch
            id="autoplay-switch"
            checked={settings.autoPlayPronunciation}
            onChange={setAutoPlayPronunciation}
            label="تشغيل النطق تلقائياً"
          />
        </div>

        <div dir="rtl" className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="speech-rate" className="font-semibold text-ink">
              سرعة النطق
            </label>
            <span dir="ltr" className="tnum rounded-md bg-surface-sunken px-2 py-0.5 text-sm font-semibold text-ink">
              {settings.speechRate.toFixed(1)}×
            </span>
          </div>
          <input
            id="speech-rate"
            type="range"
            min={0.5}
            max={1.5}
            step={0.1}
            value={settings.speechRate}
            onChange={(event) => setSpeechRate(Number(event.target.value))}
            className="h-6 w-full accent-accent"
          />
        </div>
      </SettingsSection>

      <SettingsSection title="إمكانية الوصول">
        <div dir="rtl" className="flex items-center justify-between gap-4">
          <div>
            <label htmlFor="reduced-motion-switch" className="font-semibold text-ink">
              تقليل الحركة
            </label>
            <p className="text-sm text-ink-muted">تقليل الانتقالات والحركات المرئية في التطبيق.</p>
          </div>
          <Switch
            id="reduced-motion-switch"
            checked={settings.reducedMotion}
            onChange={setReducedMotion}
            label="تقليل الحركة"
          />
        </div>
      </SettingsSection>

      <SettingsSection title="النسخ الاحتياطي للتقدّم">
        <div dir="rtl" className="space-y-4">
          <p className="max-w-[60ch] text-ink-muted">
            التقدّم محفوظ حالياً في هذا المتصفح فقط. صدّر نسخة احتياطية قبل مسح بيانات المتصفح، أو لنقل تقدّمك إلى
            جهاز آخر.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleExport} icon={<Download size={17} aria-hidden="true" />}>
              تصدير التقدّم
            </Button>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              icon={<Upload size={17} aria-hidden="true" />}
            >
              استيراد التقدّم
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleFileSelected}
              className="hidden"
            />
          </div>

          {importError ? (
            <p role="alert" className="rounded-md bg-error-muted p-3.5 text-error">
              {importError}
            </p>
          ) : null}

          {importSuccess ? (
            <p className="rounded-md bg-success-muted p-3.5 text-success">تم استيراد التقدّم بنجاح.</p>
          ) : null}

          {pendingImport ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-accent-muted p-4">
              <p className="text-ink">
                سيستبدل هذا الملف تقدّمك الحالي بالكامل. هذا الإجراء لا يمكن التراجع عنه.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="danger" onClick={confirmImport}>
                  استبدال التقدّم
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setPendingImport(null)}>
                  إلغاء
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </SettingsSection>

      <SettingsSection title="منطقة الخطر" tone="danger">
        <div dir="rtl" className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-ink">إعادة تعيين التقدّم</p>
            <p className="text-sm text-ink-muted">سيتم حذف جميع الدروس المكتملة وسجل المفردات نهائياً.</p>
          </div>
          <Button
            variant="danger"
            onClick={handleResetProgress}
            onBlur={() => setConfirmingReset(false)}
            icon={<RotateCcw size={17} aria-hidden="true" />}
          >
            {confirmingReset ? 'اضغط مرة أخرى للتأكيد' : 'إعادة تعيين'}
          </Button>
        </div>
      </SettingsSection>
    </div>
  )
}

/** A titled group of settings: the heading beside the card on wide screens, above it on phones. */
function SettingsSection({
  title,
  tone = 'default',
  children,
}: {
  title: string
  tone?: 'default' | 'danger'
  children: React.ReactNode
}) {
  return (
    <section dir="rtl" className="grid gap-4 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
      <h2 className={cn('font-sans text-lg font-bold', tone === 'danger' ? 'text-error' : 'text-ink')}>{title}</h2>
      <Card className={cn(tone === 'danger' && 'border-error/40')}>
        <div className="space-y-6 p-4 sm:p-6">{children}</div>
      </Card>
    </section>
  )
}
