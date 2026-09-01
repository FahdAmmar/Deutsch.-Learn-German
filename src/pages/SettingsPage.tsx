import { Monitor, Moon, RotateCcw, Sun } from 'lucide-react'
import { useState } from 'react'

import { Button, Card, CardBody, CardHeader, Switch } from '@/components/ui'
import { cn } from '@/lib/cn'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useThemeStore } from '@/store/themeStore'
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
  const [confirmingReset, setConfirmingReset] = useState(false)

  function handleResetProgress() {
    if (!confirmingReset) {
      setConfirmingReset(true)
      return
    }
    resetProgress()
    setConfirmingReset(false)
  }

  return (
    <div className="space-y-6 pb-10">
      <header dir="rtl">
        <h1 className="text-2xl font-bold text-ink">الإعدادات</h1>
        <p className="mt-1 text-ink-muted">خصّص طريقة تعلّمك.</p>
      </header>

      <Card>
        <CardHeader>
          <h2 dir="rtl" className="font-semibold text-ink">
            المظهر
          </h2>
        </CardHeader>
        <CardBody>
          <div dir="rtl" className="inline-flex gap-2">
            {THEME_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setThemePreference(option.value)}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-md border px-5 py-3 text-sm font-medium transition-colors',
                  themePreference === option.value
                    ? 'border-primary bg-primary-muted text-primary'
                    : 'border-border-strong text-ink-muted hover:bg-surface-muted',
                )}
              >
                <option.icon size={18} aria-hidden="true" />
                {option.labelAr}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 dir="rtl" className="font-semibold text-ink">
            النطق
          </h2>
        </CardHeader>
        <CardBody className="space-y-5">
          <div dir="rtl" className="flex items-center justify-between gap-4">
            <div>
              <label htmlFor="autoplay-switch" className="font-medium text-ink">
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

          <div dir="rtl" className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="speech-rate" className="font-medium text-ink">
                سرعة النطق
              </label>
              <span className="font-mono text-sm text-ink-muted">{settings.speechRate.toFixed(1)}×</span>
            </div>
            <input
              id="speech-rate"
              type="range"
              min={0.5}
              max={1.5}
              step={0.1}
              value={settings.speechRate}
              onChange={(event) => setSpeechRate(Number(event.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 dir="rtl" className="font-semibold text-ink">
            إمكانية الوصول
          </h2>
        </CardHeader>
        <CardBody>
          <div dir="rtl" className="flex items-center justify-between gap-4">
            <div>
              <label htmlFor="reduced-motion-switch" className="font-medium text-ink">
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
        </CardBody>
      </Card>

      <Card className="border-error/30">
        <CardHeader>
          <h2 dir="rtl" className="font-semibold text-error">
            منطقة الخطر
          </h2>
        </CardHeader>
        <CardBody dir="rtl" className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-medium text-ink">إعادة تعيين التقدّم</p>
            <p className="text-sm text-ink-muted">سيتم حذف جميع الدروس المكتملة وسجل المفردات نهائياً.</p>
          </div>
          <Button
            variant="danger"
            onClick={handleResetProgress}
            onBlur={() => setConfirmingReset(false)}
            icon={<RotateCcw size={16} aria-hidden="true" />}
          >
            {confirmingReset ? 'اضغط مرة أخرى للتأكيد' : 'إعادة تعيين'}
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
