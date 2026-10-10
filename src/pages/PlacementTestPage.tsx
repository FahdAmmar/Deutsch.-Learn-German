import { ArrowLeft, ClipboardCheck, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Card, CardBody, PageHeader, ProgressBar } from '@/components/ui'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { buildPlacementTest, evaluatePlacement, type PlacementResponse, type PlacementResult } from '@/lib/placementTest'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVEL_INFO } from '@/types'
import type { Exercise } from '@/types'

type Stage = 'intro' | 'testing' | 'results'

export default function PlacementTestPage() {
  const [stage, setStage] = useState<Stage>('intro')
  const [responses, setResponses] = useState<PlacementResponse[]>([])
  const [result, setResult] = useState<PlacementResult | null>(null)
  const setCurrentLevel = useProgressStore((state) => state.setCurrentLevel)
  const navigate = useNavigate()

  const questions = useMemo(() => buildPlacementTest(), [])
  const questionsBySourceLevel = useMemo(() => {
    const map = new Map<string, (typeof questions)[number]['sourceLevel']>()
    for (const question of questions) map.set(question.exercise.id, question.sourceLevel)
    return map
  }, [questions])

  function handleExerciseComplete(exercise: Exercise, correct: boolean) {
    const sourceLevel = questionsBySourceLevel.get(exercise.id)
    if (!sourceLevel) return
    setResponses((prev) => [...prev, { sourceLevel, correct }])
  }

  function handleTestComplete() {
    setResult(evaluatePlacement(responses))
    setStage('results')
  }

  function handleAcceptRecommendation() {
    if (!result) return
    setCurrentLevel(result.recommendedLevel)
    navigate(`/levels/${result.recommendedLevel.toLowerCase()}`)
  }

  if (stage === 'intro') {
    return (
      <div className="space-y-8 pb-6">
        <PageHeader title="اختبار تحديد المستوى" />
        <Card>
          <CardBody dir="rtl" className="flex flex-col items-start gap-5 py-8">
            <ClipboardCheck size={30} className="text-accent" aria-hidden="true" />
            <p className="max-w-[52ch] text-[1.05rem] text-ink-muted">
              {questions.length} سؤالاً سريعاً من مستويات مختلفة تساعدنا على اقتراح أفضل نقطة بداية لك. لا حاجة
              للقلق بشأن الإجابات الصعبة — هذا اختبار توجيهي وليس امتحاناً.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => setStage('testing')}>ابدأ الاختبار</Button>
              <Link to="/levels">
                <Button variant="ghost">تخطّي، سأختار بنفسي</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }

  if (stage === 'testing') {
    return (
      <div className="space-y-8 pb-6">
        <PageHeader title="اختبار تحديد المستوى" />
        <ExerciseRunner
          exercises={questions.map((question) => question.exercise)}
          onExerciseComplete={handleExerciseComplete}
          onComplete={handleTestComplete}
        />
      </div>
    )
  }

  // stage === 'results'
  if (!result) return null
  const info = CEFR_LEVEL_INFO[result.recommendedLevel]

  return (
    <div className="space-y-8 pb-6">
      <PageHeader title="نتيجة اختبار تحديد المستوى" />

      <Card tone="brand">
        <CardBody dir="rtl" className="flex flex-col items-start gap-4 py-8">
          <Sparkles size={28} className="text-accent" aria-hidden="true" />
          {result.exceedsAvailableContent ? (
            <p className="text-ink">
              أداء ممتاز! أجبت بشكل صحيح على كل الأسئلة المتاحة حالياً. ننصحك بالبدء من مستوى{' '}
              <span className="font-bold text-accent">{result.recommendedLevel}</span> والانتظار حتى نضيف
              مستويات أعلى قريباً.
            </p>
          ) : (
            <p className="text-ink">
              ننصحك بالبدء من مستوى <span className="font-bold text-accent">{result.recommendedLevel}</span>
              {' — '}
              {info.titleAr}
            </p>
          )}
          <Button size="lg" onClick={handleAcceptRecommendation} icon={<ArrowLeft size={16} aria-hidden="true" />} iconPosition="end">
            ابدأ من هذا المستوى
          </Button>
        </CardBody>
      </Card>

      <section className="space-y-3">
        <h2 dir="rtl" className="font-sans text-lg font-bold text-ink">
          تفاصيل النتيجة حسب المستوى
        </h2>
        {Object.entries(result.scoresByLevel).map(([level, score]) => (
          <Card key={level}>
            <CardBody className="space-y-2">
              <div dir="rtl" className="flex items-center justify-between text-sm">
                <span className="font-semibold text-ink">{level}</span>
                <span className="text-ink-muted">
                  {score.correct}/{score.total}
                </span>
              </div>
              <ProgressBar value={score.correct / score.total} />
            </CardBody>
          </Card>
        ))}
      </section>

      <div dir="rtl">
        <Link to="/levels" className="font-semibold text-accent hover:underline">
          أو تصفّح كل المستويات بنفسك
        </Link>
      </div>
    </div>
  )
}
