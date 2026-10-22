import {
  ArrowRight,
  CalendarDays,
  Clock,
  Coins,
  Dumbbell,
  Hash,
  ListOrdered,
  MessagesSquare,
  Scale,
  Shuffle,
  Tags,
  Target,
  Workflow,
} from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'

import { Button, EmptyState, LevelTabs, PageHeader } from '@/components/ui'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { GenderRulesReference } from '@/features/practice/GenderRulesReference'
import { buildRegisterDrill } from '@/features/practice/registerDrill'
import { RegisterReference } from '@/features/practice/RegisterReference'
import { ModeCard } from '@/features/practice/ModeCard'
import { buildArticleDrill, buildWeakSpotSession, findWeakModules, SESSION_SIZE } from '@/features/practice/sessions'
import { buildGeneratedDrill, isGeneratedKindAvailable, type GeneratedKind } from '@/features/practice/generatedDrills'
import { buildPluralDrill, buildVerbDrill, countPluralQuestions, countVerbs } from '@/features/practice/wordDrills'
import { buildGenderDrill, countGenderQuestions } from '@/lib/gender'
import {
  getCumulativeVocabulary,
  getLessonsForLevel,
  getLevelsWithContent,
  getModuleById,
  getVocabularyForLevel,
} from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useStatsStore } from '@/store/statsStore'
import type { CEFRLevel, Exercise } from '@/types'
import { shuffle } from '@/utils/shuffle'

interface ActiveSession {
  title: string
  exercises: Exercise[]
}

export default function PracticePage() {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const byModule = useStatsStore((state) => state.byModule)
  const [level, setLevel] = useState<CEFRLevel>(currentLevel)
  const [session, setSession] = useState<ActiveSession | null>(null)

  const levelExercises = useMemo(() => getLessonsForLevel(level).flatMap((lesson) => lesson.exercises), [level])
  const nounCount = useMemo(() => getVocabularyForLevel(level).filter((item) => item.article).length, [level])
  // A2 builds on A1, so the word drills of a level draw on that level and the ones below it.
  const cumulative = useMemo(() => getCumulativeVocabulary(level), [level])
  const wordCounts = useMemo(
    () => ({
      gender: countGenderQuestions(cumulative),
      plural: countPluralQuestions(cumulative),
      verbs: countVerbs(cumulative),
    }),
    [cumulative],
  )
  const weakTopics = useMemo(
    () =>
      findWeakModules(byModule)
        .map((entry) => getModuleById(entry.moduleId))
        .filter((module) => module !== undefined),
    [byModule],
  )

  function startMixed() {
    setSession({
      title: 'جلسة مختلطة',
      exercises: shuffle(levelExercises).slice(0, SESSION_SIZE),
    })
  }

  function startArticles() {
    setSession({
      title: 'تدريب أدوات التعريف',
      exercises: buildArticleDrill(getVocabularyForLevel(level)),
    })
  }

  function startGender() {
    setSession({
      title: 'تخمين الأداة من شكل الكلمة',
      exercises: buildGenderDrill(cumulative),
    })
  }

  function startRegister() {
    setSession({ title: 'du أم Sie؟', exercises: buildRegisterDrill() })
  }

  function startPlural() {
    setSession({
      title: 'تدريب الجمع',
      exercises: buildPluralDrill(cumulative),
    })
  }

  function startVerbs() {
    setSession({
      title: 'تصريف الأفعال',
      exercises: buildVerbDrill(cumulative, {
        includePraeteritum: level !== 'A1',
      }),
    })
  }

  function startGenerated(kind: GeneratedKind, title: string) {
    setSession({ title, exercises: buildGeneratedDrill(kind, level) })
  }

  function startWeakSpots() {
    const { exercises } = buildWeakSpotSession(byModule)
    setSession({ title: 'نقاط ضعفي', exercises })
  }

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="التمارين"
        description="اختر طريقة التدريب: أسئلة متنوعة، أو الكلمات (الأداة والجمع والأفعال)، أو المواضيع التي تحتاج مراجعة."
      />

      <LevelTabs
        value={level}
        onChange={(next) => {
          setLevel(next)
          setSession(null)
        }}
        availableLevels={getLevelsWithContent()}
      />

      {session ? (
        <div className="space-y-4">
          <div dir="rtl" className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-sans text-lg font-bold text-ink">{session.title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSession(null)}
              icon={<ArrowRight size={16} aria-hidden="true" />}
            >
              العودة لأنماط التدريب
            </Button>
          </div>
          <ExerciseRunner exercises={session.exercises} />
        </div>
      ) : levelExercises.length === 0 ? (
        <EmptyState icon={Dumbbell} title="لا توجد تمارين لهذا المستوى بعد">
          اختر مستوى آخر لتبدأ التدرّب.
        </EmptyState>
      ) : (
        <div className="space-y-10">
          <PracticeGroup title="جلسات عامة" description="أسئلة من دروس المستوى، أو من المواضيع التي أخطأت فيها.">
            <ModeCard
              icon={Shuffle}
              title="جلسة مختلطة"
              description={`${Math.min(SESSION_SIZE, levelExercises.length)} سؤالاً عشوائياً من دروس ${level}. بعد كل سؤال ترى الإجابة وشرحها.`}
              meta={`${levelExercises.length} سؤالاً متاحاً`}
              actionLabel="ابدأ الجلسة"
              onStart={startMixed}
            />
            <ModeCard
              icon={Target}
              title="نقاط ضعفي"
              description="أسئلة من المواضيع التي أخطأت فيها أكثر، من كل المستويات."
              meta={weakTopics.length > 0 ? `${weakTopics.length} موضوعاً يحتاج مراجعة` : undefined}
              actionLabel="ركّز على نقاط ضعفي"
              onStart={startWeakSpots}
              disabledReason={
                weakTopics.length === 0 ? 'أجب عن بعض التمارين أولاً، وسنحدد لك المواضيع التي تحتاج مراجعة.' : undefined
              }
            />
          </PracticeGroup>

          <PracticeGroup title="الكلمات" description="الاسم يُحفظ مع أداته وجمعه، والفعل مع صيغه.">
            <ModeCard
              icon={Tags}
              title="أدوات التعريف"
              description="der أم die أم das؟ تدرّب على الأسماء مع أدواتها، لأن الاسم يُحفظ دائماً مع أداته."
              meta={nounCount > 0 ? `${nounCount} اسماً في ${level}` : undefined}
              actionLabel="ابدأ التدريب"
              onStart={startArticles}
              disabledReason={nounCount === 0 ? 'لا توجد أسماء بأدواتها في هذا المستوى بعد.' : undefined}
            />
            <ModeCard
              icon={Scale}
              title="تخمين الأداة من الشكل"
              description="كثير من النهايات تدلّ على الجنس: ‎-ung‎ وراءها die، و‎-chen‎ وراءها das. تدرّب على القواعد التي تنطبق فعلاً."
              meta={wordCounts.gender > 0 ? `${wordCounts.gender} اسماً تفسّره قاعدة` : undefined}
              actionLabel="ابدأ التدريب"
              onStart={startGender}
              disabledReason={
                wordCounts.gender === 0 ? 'لا توجد أسماء تنطبق عليها القواعد في هذا المستوى بعد.' : undefined
              }
            />
            <ModeCard
              icon={ListOrdered}
              title="الجمع"
              description="ما جمع Tisch وHand وKind؟ اختر الجمع الصحيح، وتعرّف على النمط الذي يتبعه."
              meta={wordCounts.plural > 0 ? `${wordCounts.plural} اسماً` : undefined}
              actionLabel="ابدأ التدريب"
              onStart={startPlural}
              disabledReason={wordCounts.plural === 0 ? 'لا توجد أسماء بجموعها في هذا المستوى بعد.' : undefined}
            />
            <ModeCard
              icon={Workflow}
              title="تصريف الأفعال"
              description={
                level === 'A1'
                  ? 'اكتب صيغة المضارع، واختر haben أو sein، واكتب Partizip II. يركّز التدريب على الأفعال التي يتغيّر جذعها.'
                  : 'المضارع وPerfekt وPräteritum للأفعال التي تعلّمتها، مع الأفعال المنفصلة والانعكاسية.'
              }
              meta={wordCounts.verbs > 0 ? `${wordCounts.verbs} فعلاً` : undefined}
              actionLabel="ابدأ التدريب"
              onStart={startVerbs}
              disabledReason={wordCounts.verbs === 0 ? 'لا توجد أفعال في هذا المستوى بعد.' : undefined}
            />
            <ModeCard
              icon={MessagesSquare}
              title="du أم Sie؟"
              description="اختر الصيغة المناسبة للموقف، وحوّل الجملة من الودّية إلى الرسمية وبالعكس: الضمير والفعل يتغيّران معاً."
              actionLabel="ابدأ التدريب"
              onStart={startRegister}
            />
          </PracticeGroup>

          <PracticeGroup title="الأرقام والوقت" description="أسئلة جديدة في كل مرة، لا تنتهي: استمع، واقرأ، واكتب.">
            <ModeCard
              icon={Hash}
              title="الأرقام"
              description={`استمع إلى الرقم واختره، أو اكتبه بالحروف. التدريب يختبرك في أكثر الأخطاء شيوعاً: 13 و30، و16 و60، و24 و42. الأرقام حتى ${level === 'A1' ? '100' : '999'}.`}
              actionLabel="ابدأ التدريب"
              onStart={() => startGenerated('numbers', 'تدريب الأرقام')}
            />
            <ModeCard
              icon={Clock}
              title="الساعة"
              description={
                level === 'A1'
                  ? 'قل الوقت بطريقتين: اليومية (halb vier وViertel nach drei) والرسمية (fünfzehn Uhr dreißig).'
                  : 'كل الدقائق بالطريقتين: اليومية مع nach وvor وhalb، والرسمية بنظام 24 ساعة.'
              }
              actionLabel="ابدأ التدريب"
              onStart={() => startGenerated('time', 'تدريب الساعة')}
            />
            <ModeCard
              icon={CalendarDays}
              title="التواريخ"
              description="am dritten Oktober: الأرقام الترتيبية ونهاية ‎-n‎ بعد am، من الاستماع والقراءة والكتابة."
              actionLabel="ابدأ التدريب"
              onStart={() => startGenerated('dates', 'تدريب التواريخ')}
              disabledReason={
                isGeneratedKindAvailable('dates', level)
                  ? undefined
                  : 'التواريخ بالأرقام الترتيبية من مستوى A2. اختر المستوى A2 لتبدأ.'
              }
            />
            <ModeCard
              icon={Coins}
              title="الأسعار"
              description="drei Euro fünfzig: كيف يُقال السعر عند الدفع، من الاستماع والقراءة والكتابة."
              actionLabel="ابدأ التدريب"
              onStart={() => startGenerated('prices', 'تدريب الأسعار')}
            />
          </PracticeGroup>

          <div className="space-y-3">
            <GenderRulesReference />
            <RegisterReference />
          </div>
        </div>
      )}
    </div>
  )
}

interface PracticeGroupProps {
  title: string
  description: string
  children: ReactNode
}

function PracticeGroup({ title, description, children }: PracticeGroupProps) {
  return (
    <section className="space-y-4">
      <div dir="rtl" className="space-y-1">
        <h2 className="font-sans text-xl font-bold text-ink">{title}</h2>
        <p className="text-ink-muted">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    </section>
  )
}
