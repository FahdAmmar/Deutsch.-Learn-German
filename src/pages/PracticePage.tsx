import {
  ArrowRight,
  AudioLines,
  Blocks,
  CalendarCheck,
  CalendarDays,
  Clock,
  Coins,
  ClipboardCheck,
  Dumbbell,
  Hash,
  ListOrdered,
  MessagesSquare,
  Mic,
  PenLine,
  Scale,
  Shuffle,
  Tags,
  Target,
  Workflow,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Button, EmptyState, LevelTabs, PageHeader } from '@/components/ui'
import { getExamSetsForLevel } from '@/data/exam'
import { getSpeakingTasksForLevel } from '@/data/speaking'
import { getWritingTasksForLevel } from '@/data/writing'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { buildCompoundDrill, getCompoundsForLevel } from '@/features/practice/compoundDrill'
import { CompoundsReference } from '@/features/practice/CompoundsReference'
import { dailySessionParts } from '@/features/practice/dailySession'
import type { DailySession } from '@/features/practice/dailySession'
import { useDailySessionPlan } from '@/features/practice/useDailySessionPlan'
import { GrammarPracticeGroup } from '@/features/practice/GrammarPracticeGroup'
import { GenderRulesReference } from '@/features/practice/GenderRulesReference'
import { buildMinimalPairDrill, getMinimalPairsForLevel } from '@/features/practice/minimalPairDrill'
import { buildRegisterDrill } from '@/features/practice/registerDrill'
import { RegisterReference } from '@/features/practice/RegisterReference'
import { ModeCard } from '@/features/practice/ModeCard'
import { PracticeGroup } from '@/features/practice/PracticeGroup'
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

/** "10 سؤالاً: 5 للمراجعة · 3 من نقاط ضعفك · 2 جديدة": what today's session is made of, leaving out the parts that are empty. */
function dailyBreakdown(daily: DailySession): string | undefined {
  const parts = dailySessionParts(daily)
  return parts.length > 0 ? `${daily.exercises.length} سؤالاً: ${parts.join(' · ')}` : undefined
}

export default function PracticePage() {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const byModule = useStatsStore((state) => state.byModule)
  const [level, setLevel] = useState<CEFRLevel>(currentLevel)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const levelExercises = useMemo(() => getLessonsForLevel(level).flatMap((lesson) => lesson.exercises), [level])
  // Today's session is planned up front so the card can say what is in it.
  const daily = useDailySessionPlan(level)
  // The dashboard links here with ?session=daily: start it at once, and drop the parameter so going back does not restart it.
  const [session, setSession] = useState<ActiveSession | null>(() =>
    searchParams.get('session') === 'daily' && daily.exercises.length > 0 ? { title: 'جلسة اليوم', exercises: daily.exercises } : null,
  )
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
  const pairCount = getMinimalPairsForLevel(level).length
  const compoundCount = getCompoundsForLevel(level).length
  const weakTopics = useMemo(
    () =>
      findWeakModules(byModule)
        .map((entry) => getModuleById(entry.moduleId))
        .filter((module) => module !== undefined),
    [byModule],
  )

  function startDaily() {
    setSession({ title: 'جلسة اليوم', exercises: daily.exercises })
    if (searchParams.has('session')) setSearchParams({}, { replace: true })
  }

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

  function startCompounds() {
    setSession({ title: 'الكلمات المركّبة', exercises: buildCompoundDrill(level) })
  }

  function startMinimalPairs() {
    setSession({ title: 'أزواج صوتية', exercises: buildMinimalPairDrill(level) })
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
              icon={CalendarCheck}
              title="جلسة اليوم"
              description="كل ما تحتاجه اليوم في جلسة واحدة: كلمات حان وقت مراجعتها، ثم أسئلة من المواضيع التي أخطأت فيها، ثم أسئلة جديدة من دروس مستواك."
              meta={dailyBreakdown(daily)}
              actionLabel="ابدأ جلسة اليوم"
              onStart={startDaily}
              disabledReason={daily.exercises.length === 0 ? 'لا توجد أسئلة كافية لتكوين جلسة. اختر مستوى فيه دروس.' : undefined}
            />
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
            <ModeCard
              icon={Blocks}
              title="الكلمات المركّبة"
              description="Haus + Tür = ؟ الأداة تتبع الجزء الأخير. ركّب الكلمة من جزأيها واختر أداتها، وتعلّم متى يُضاف حرف رابط."
              meta={`${compoundCount} كلمة مركّبة`}
              actionLabel="ابدأ التدريب"
              onStart={startCompounds}
            />
          </PracticeGroup>

 <GrammarPracticeGroup level={level} onStart={(title, exercises) => setSession({ title, exercises })} />

          <PracticeGroup title="النطق والاستماع" description="درّب أذنك على الأصوات التي لا تفرّق بينها العربية.">
            <ModeCard
              icon={AudioLines}
              title="أزواج صوتية"
              description="schon أم schön؟ Tür أم Tier؟ استمع إلى كلمة واحدة من زوج، ثم اختر ما سمعته. بعدها تجد في صفحة النطق الأزواج كلها مع شرح كل صوت."
              meta={`${pairCount} زوجاً في ${level}`}
              actionLabel="ابدأ التدريب"
              onStart={startMinimalPairs}
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

          <PracticeGroup title="الكتابة والامتحان" description="اكتب نصّاً في موقف حقيقي، أو جرّب القراءة والاستماع بأسلوب الامتحان.">
            <ModeCard
              icon={PenLine}
              title="الكتابة الموجّهة"
              description="رسالة إلى صديق، أو بريد رسمي، أو بطاقة بريدية: موقف ونقاط محدّدة، وفحص للتحية والخاتمة والنقاط، ونموذج جواب."
              meta={`${getWritingTasksForLevel(level).length} مهام في ${level}`}
              actionLabel="افتح مهام الكتابة"
              onStart={() => navigate('/practice/writing')}
            />
            <ModeCard
              icon={Mic}
              title="تدريب المحادثة"
              description="تحدّث من كلمات مفتاحية، أو كوّن سؤالاً من بطاقة، أو اطلب شيئاً بأدب: بصوتك أو بالكتابة، مع فحص للنقاط ونموذج تسمعه."
              meta={`${getSpeakingTasksForLevel(level).length} مهمة في ${level}`}
              actionLabel="افتح مهام المحادثة"
              onStart={() => navigate('/practice/speaking')}
            />
            <ModeCard
              icon={ClipboardCheck}
              title="تدريب بنمط الامتحان"
              description="نصوص وتسجيلات في أسلوب مهام الامتحانات، بعدّاد وقت اختياري وتشغيلين فقط لكل تسجيل، وتصحيح تلقائي مع شرح كل سؤال."
              meta={`${getExamSetsForLevel(level).length} مجموعات في ${level}`}
              actionLabel="افتح التدريب"
              onStart={() => navigate('/practice/exam')}
            />
          </PracticeGroup>

          <div className="space-y-3">
            <GenderRulesReference />
            <CompoundsReference />
            <RegisterReference />
          </div>
        </div>
      )}
    </div>
  )
}
