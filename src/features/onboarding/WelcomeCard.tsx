import { ClipboardCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Card } from '@/components/ui'
import { ChoiceGroup } from '@/features/settings/ChoiceGroup'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { DAILY_GOAL_OPTIONS } from '@/types/settings'

/**
 * First-run welcome: pick a daily goal and a starting point, then go. Both
 * choices are changeable later in Settings, and skipping loses nothing.
 */
export function WelcomeCard() {
  const navigate = useNavigate()
  const savedGoal = useSettingsStore((state) => state.settings.dailyGoal)
  const setDailyGoal = useSettingsStore((state) => state.setDailyGoal)
  const completeOnboarding = useSettingsStore((state) => state.completeOnboarding)
  const setCurrentLevel = useProgressStore((state) => state.setCurrentLevel)
  const [goal, setGoal] = useState<number>(savedGoal)

  function finish(destination: string, level?: 'A1') {
    setDailyGoal(goal)
    if (level) setCurrentLevel(level)
    completeOnboarding()
    navigate(destination)
  }

  return (
    <Card tone="brand">
      <section dir="rtl" aria-labelledby="welcome-title" className="space-y-6 p-5 sm:p-8">
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Sparkles size={16} aria-hidden="true" />
            خطوة واحدة قبل أن نبدأ
          </p>
          <h2 id="welcome-title" className="font-sans text-2xl font-bold text-ink">
            مرحباً بك في تعلّم الألمانية
          </h2>
          <p className="max-w-[60ch] text-ink-muted">
            اختر كم سؤالاً تريد الإجابة عنه كل يوم، ثم ابدأ من الأساسيات أو جرّب اختباراً قصيراً يقترح عليك مستوى البداية. يمكنك تغيير
            ذلك لاحقاً من الإعدادات.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-semibold text-ink">هدفك اليومي</p>
          <ChoiceGroup
            label="الهدف اليومي"
            value={goal}
            options={DAILY_GOAL_OPTIONS.map((option) => ({ value: option, label: String(option), hint: 'سؤالاً' }))}
            onChange={setGoal}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={() => finish('/levels/a1', 'A1')}>
            ابدأ من الصفر (A1)
          </Button>
          <Button size="lg" variant="outline" onClick={() => finish('/placement-test')} icon={<ClipboardCheck size={18} aria-hidden="true" />}>
            حدّد مستواي باختبار قصير
          </Button>
          <Button variant="ghost" onClick={() => finish('/dashboard')}>
            تخطّي
          </Button>
        </div>
      </section>
    </Card>
  )
}
