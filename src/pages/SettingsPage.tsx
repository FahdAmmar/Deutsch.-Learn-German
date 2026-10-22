import { Download, Monitor, Moon, RotateCcw, Sun, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button, Card, PageHeader } from '@/components/ui'
import { ChoiceGroup } from '@/features/settings/ChoiceGroup'
import { SettingGroup, SettingRow } from '@/features/settings/SettingRow'
import { VoicePicker } from '@/features/settings/VoicePicker'
import { getLessonsForLevel, getVocabularyForLevel, getLevelsWithContent } from '@/lib/curriculum'
import { cn } from '@/lib/cn'
import { loadLevel } from '@/data/curriculum'
import { parseProgressBackup, type ProgressBackup } from '@/lib/progressExport'
import { applyBackup, createBackupJson, describeExtras } from '@/store/backup'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatsStore } from '@/store/statsStore'
import { useThemeStore } from '@/store/themeStore'
import { todayKey } from '@/utils/date'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel } from '@/types'
import { DAILY_GOAL_OPTIONS, type TextScale, type ThemePreference } from '@/types/settings'

const THEME_OPTIONS: { value: ThemePreference; icon: typeof Sun; labelAr: string }[] = [
  { value: 'light', icon: Sun, labelAr: 'فاتح' },
  { value: 'dark', icon: Moon, labelAr: 'داكن' },
  { value: 'system', icon: Monitor, labelAr: 'النظام' },
]

const TEXT_SCALE_OPTIONS: { value: TextScale; label: string; hint: string }[] = [
  { value: 'normal', label: 'عادي', hint: '100%' },
  { value: 'large', label: 'كبير', hint: '112%' },
  { value: 'xlarge', label: 'كبير جداً', hint: '125%' },
]

export default function SettingsPage() {
  const themePreference = useThemeStore((state) => state.preference)
  const setThemePreference = useThemeStore((state) => state.setPreference)

  const settings = useSettingsStore((state) => state.settings)
  const setAutoPlayPronunciation = useSettingsStore((state) => state.setAutoPlayPronunciation)
  const setSpeechRate = useSettingsStore((state) => state.setSpeechRate)
  const setReducedMotion = useSettingsStore((state) => state.setReducedMotion)
  const setSoundEffects = useSettingsStore((state) => state.setSoundEffects)
  const setTextScale = useSettingsStore((state) => state.setTextScale)
  const setHighContrast = useSettingsStore((state) => state.setHighContrast)
  const setShowPronunciationHints = useSettingsStore((state) => state.setShowPronunciationHints)
  const setDailyGoal = useSettingsStore((state) => state.setDailyGoal)

  const resetProgress = useProgressStore((state) => state.resetProgress)
  const resetLessons = useProgressStore((state) => state.resetLessons)
  const resetStats = useStatsStore((state) => state.resetStats)
  const [confirmingReset, setConfirmingReset] = useState(false)
  const [resetLevelChoice, setResetLevelChoice] = useState<CEFRLevel | null>(null)
  const [levelResetDone, setLevelResetDone] = useState<CEFRLevel | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pendingImport, setPendingImport] = useState<ProgressBackup | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const pendingExtras = describeExtras(pendingImport?.extras)
  const [importSuccess, setImportSuccess] = useState(false)

  function handleResetProgress() {
    if (!confirmingReset) {
      setConfirmingReset(true)
      return
    }
    resetProgress()
    resetStats()
    setConfirmingReset(false)
  }

  async function handleResetLevel() {
    if (!resetLevelChoice) return
    const level = resetLevelChoice
    // The level's content may not be loaded yet (it is fetched on demand); the reset needs its lesson ids.
    await loadLevel(level)
    resetLessons({
      lessonIds: getLessonsForLevel(level).map((lesson) => lesson.id),
      vocabularyIds: getVocabularyForLevel(level).map((item) => item.id),
    })
    setResetLevelChoice(null)
    setLevelResetDone(level)
  }

  function handleExport() {
    const json = createBackupJson()
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
    const result = parseProgressBackup(text)

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
    applyBackup(pendingImport)
    setPendingImport(null)
    setImportSuccess(true)
  }

  return (
    <div className="space-y-10 pb-6">
      <PageHeader title="الإعدادات" description="خصّص طريقة تعلّمك." />

      <SettingsSection title="المظهر">
        <SettingGroup title="السمة">
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
        </SettingGroup>

        <SettingGroup title="حجم النص" description="يكبّر كل النصوص والعناصر في التطبيق معاً.">
          <ChoiceGroup label="حجم النص" value={settings.textScale} options={TEXT_SCALE_OPTIONS} onChange={setTextScale} />
        </SettingGroup>

        <SettingRow
          id="high-contrast-switch"
          title="تباين عالٍ"
          description="نصوص أغمق وحدود أوضح لسهولة القراءة."
          checked={settings.highContrast}
          onChange={setHighContrast}
        />
      </SettingsSection>

      <SettingsSection title="النطق والصوت">
        <SettingRow
          id="autoplay-switch"
          title="تشغيل النطق تلقائياً"
          description="نطق الجمل الألمانية تلقائياً عند فتح الدرس."
          checked={settings.autoPlayPronunciation}
          onChange={setAutoPlayPronunciation}
        />

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

        <SettingGroup title="الصوت الألماني" description="اختر الصوت الذي تُقرأ به الدروس. جرّب كل صوت بزر التشغيل قبل اختياره.">
          <VoicePicker />
        </SettingGroup>

        <SettingRow
          id="sound-effects-switch"
          title="أصوات الإجابات"
          description="نغمة قصيرة للإجابة الصحيحة وأخرى للخاطئة، وعند إنهاء التمارين."
          checked={settings.soundEffects}
          onChange={setSoundEffects}
        />

        <SettingRow
          id="pronunciation-hints-switch"
          title="إظهار تقطيع النطق"
          description="عرض تقطيع المقاطع تحت الكلمة في بطاقات المفردات."
          checked={settings.showPronunciationHints}
          onChange={setShowPronunciationHints}
        />
      </SettingsSection>

      <SettingsSection title="الهدف اليومي">
        <SettingGroup title="عدد الأسئلة يومياً" description="يظهر تقدّمك نحو الهدف في لوحة التحكم وصفحة التقدّم.">
          <ChoiceGroup
            label="الهدف اليومي"
            value={settings.dailyGoal}
            options={DAILY_GOAL_OPTIONS.map((goal) => ({ value: goal, label: String(goal), hint: 'سؤالاً' }))}
            onChange={setDailyGoal}
          />
        </SettingGroup>
      </SettingsSection>

      <SettingsSection title="إمكانية الوصول">
        <SettingRow
          id="reduced-motion-switch"
          title="تقليل الحركة"
          description="تقليل الانتقالات والحركات المرئية في التطبيق."
          checked={settings.reducedMotion}
          onChange={setReducedMotion}
        />
      </SettingsSection>

      <SettingsSection title="النسخ الاحتياطي للتقدّم">
        <div dir="rtl" className="space-y-4">
          <p className="max-w-[60ch] text-ink-muted">
            تقدّمك وإحصاءاتك ونصوصك الخاصة محفوظة حالياً في هذا المتصفح فقط. صدّر نسخة احتياطية قبل مسح بيانات المتصفح، أو لنقل
            كل ذلك إلى جهاز آخر.
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
            <p role="status" className="rounded-md bg-success-muted p-3.5 text-success">
              تم استيراد التقدّم بنجاح.
            </p>
          ) : null}

          {pendingImport ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-accent-muted p-4">
              <p className="text-ink">
                {pendingExtras.length > 0
                  ? `سيستبدل هذا الملف تقدّمك الحالي ويستبدل أيضاً: ${pendingExtras.join('، ')}. هذا الإجراء لا يمكن التراجع عنه.`
                  : 'سيستبدل هذا الملف تقدّمك الحالي. إنه ملف قديم لا يتضمن نصوصك الخاصة، فتبقى نصوص هذا الجهاز كما هي. هذا الإجراء لا يمكن التراجع عنه.'}
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
        <div dir="rtl" className="space-y-3">
          <div>
            <p className="font-semibold text-ink">إعادة مستوى من البداية</p>
            <p className="text-sm text-ink-muted">
              يمسح دروس هذا المستوى المكتملة وسجل كلماته. باقي المستويات وسلسلة الأيام وإحصاءاتك العامة تبقى كما هي.
            </p>
          </div>
          <ChoiceGroup
            label="المستوى المراد إعادته"
            value={resetLevelChoice ?? ('' as CEFRLevel)}
            options={getLevelsWithContent().map((level) => ({ value: level, label: level, hint: CEFR_LEVEL_INFO[level].titleAr }))}
            onChange={(level) => {
              setLevelResetDone(null)
              setResetLevelChoice(level)
            }}
          />
          {resetLevelChoice ? (
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="danger" size="sm" onClick={handleResetLevel}>
                تأكيد إعادة {resetLevelChoice} من البداية
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setResetLevelChoice(null)}>
                إلغاء
              </Button>
            </div>
          ) : null}
          {levelResetDone ? (
            <p role="status" className="rounded-md bg-success-muted p-3 text-success">
              تمت إعادة المستوى {levelResetDone} من البداية.
            </p>
          ) : null}
        </div>

        <div dir="rtl" className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <div>
            <p className="font-semibold text-ink">إعادة تعيين كل التقدّم</p>
            <p className="text-sm text-ink-muted">سيتم حذف جميع الدروس المكتملة وسجل المفردات والإحصاءات نهائياً.</p>
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
