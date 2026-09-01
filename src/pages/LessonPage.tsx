import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  Dumbbell,
  ListChecks,
  MessageCircle,
  MousePointerClick,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { Badge, Button, Card, CardBody } from '@/components/ui'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { ComparisonLadder } from '@/features/grammar/ComparisonLadder'
import { CommonMistakesList } from '@/features/lessons/CommonMistakesList'
import { DialogueDisplay } from '@/features/lessons/DialogueDisplay'
import { ExampleSentence } from '@/features/lessons/ExampleSentence'
import { InteractiveDiagram } from '@/features/lessons/InteractiveDiagram'
import { PronunciationTips } from '@/features/lessons/PronunciationTips'
import { SectionHeading } from '@/features/lessons/SectionHeading'
import { GermanWord } from '@/features/pronunciation/GermanWord'
import { GrammarTopicCard } from '@/features/grammar/GrammarTopicCard'
import { FlipVocabularyCard } from '@/features/vocabulary/FlipVocabularyCard'
import { getLesson, getModuleById, getNextLesson } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { speechService, GERMAN_LOCALE } from '@/services/speech'
import type { CEFRLevel } from '@/types'

export default function LessonPage() {
  const { level, lessonId } = useParams<{ level: string; lessonId: string }>()
  const normalizedLevel = (level?.toUpperCase() ?? '') as CEFRLevel
  const lesson = lessonId ? getLesson(normalizedLevel, lessonId) : undefined

  const startLesson = useProgressStore((state) => state.startLesson)
  const completeLesson = useProgressStore((state) => state.completeLesson)
  const isCompleted = useProgressStore((state) => (lesson ? state.isLessonCompleted(lesson.id) : false))
  const autoPlayPronunciation = useSettingsStore((state) => state.settings.autoPlayPronunciation)
  const speechRate = useSettingsStore((state) => state.settings.speechRate)

  const [exerciseAccuracy, setExerciseAccuracy] = useState<number | null>(null)
  const [justCompleted, setJustCompleted] = useState(false)

  useEffect(() => {
    if (lesson) {
      startLesson({ lessonId: lesson.id, moduleId: lesson.moduleId, level: lesson.level })
    }
    // Only re-run when navigating to a different lesson.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id])

  useEffect(() => {
    if (!lesson || !autoPlayPronunciation) return
    const firstExample = lesson.examples[0]?.de
    if (!firstExample) return
    // Autoplay is opt-in via Settings; failures are silent by design (see speechService).
    speechService.speak(firstExample, { language: GERMAN_LOCALE, rate: speechRate })
    // Only re-run when navigating to a different lesson.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id, autoPlayPronunciation])

  const practiceWords = useMemo(() => {
    if (!lesson) return []
    const fromExamples = lesson.examples.map((example) => example.de)
    const fromVocab = lesson.vocabulary.map((item) => item.word)
    return Array.from(new Set([...fromVocab, ...fromExamples]))
  }, [lesson])

  const nextLesson = lesson ? getNextLesson(lesson.id) : undefined
  const module = lesson ? getModuleById(lesson.moduleId) : undefined

  if (!lessonId || !level || !lesson) {
    return <Navigate to="/levels" replace />
  }

  function handleCompleteLesson() {
    if (!lesson) return
    completeLesson({
      lessonId: lesson.id,
      moduleId: lesson.moduleId,
      level: lesson.level,
      accuracy: exerciseAccuracy ?? 0,
    })
    setJustCompleted(true)
  }

  const showCompleted = isCompleted || justCompleted

  return (
    <div className="space-y-8 pb-10">
      {/* Lesson Header */}
      <header className="space-y-3">
        <div dir="rtl" className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <Link to={`/levels/${lesson.level.toLowerCase()}`} className="hover:text-primary hover:underline">
            {lesson.level}
          </Link>
          {module ? (
            <>
              <span>/</span>
              <span>{module.titleAr}</span>
            </>
          ) : null}
        </div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 dir="ltr" lang="de" className="text-2xl font-bold text-ink">
              {lesson.title}
            </h1>
            <p dir="rtl" className="text-lg text-ink-muted">
              {lesson.titleAr}
            </p>
          </div>
          <div dir="rtl" className="flex items-center gap-2">
            <Badge tone="primary">{lesson.level}</Badge>
            {showCompleted ? (
              <Badge tone="success">
                <CheckCircle2 size={12} className="me-1 inline" aria-hidden="true" />
                مكتمل
              </Badge>
            ) : null}
          </div>
        </div>
        <div dir="rtl" className="flex items-center gap-1.5 text-sm text-ink-faint">
          <Clock size={14} aria-hidden="true" />
          <span>{lesson.estimatedMinutes} دقيقة تقريباً</span>
        </div>
      </header>

      {/* Objectives */}
      <section className="space-y-3">
        <SectionHeading icon={ListChecks} titleAr="أهداف الدرس" />
        <Card>
          <CardBody>
            <ul dir="rtl" className="space-y-2 text-sm text-ink">
              {lesson.objectivesAr.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {objective}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </section>

      {/* Explanation (Arabic explanation referencing German) */}
      <section className="space-y-3">
        <SectionHeading icon={BookOpen} titleAr="الشرح" />
        <div className="space-y-3">
          {lesson.explanation.map((section, index) => (
            <Card key={index}>
              <CardBody className="space-y-2">
                <h3 dir="rtl" className="font-semibold text-ink">
                  {section.titleAr}
                </h3>
                <p dir="rtl" className="text-sm leading-relaxed text-ink-muted">
                  {section.bodyAr}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Visual Grammar */}
      {(lesson.grammarTopics && lesson.grammarTopics.length > 0) || lesson.adjectiveComparisons ? (
        <section className="space-y-3">
          <SectionHeading icon={Sparkles} titleAr="القاعدة النحوية" />
          <div className="space-y-4">
            {lesson.grammarTopics?.map((topic) => <GrammarTopicCard key={topic.id} topic={topic} />)}
            {lesson.adjectiveComparisons ? <ComparisonLadder adjectives={lesson.adjectiveComparisons} /> : null}
          </div>
        </section>
      ) : null}

      {/* Interactive diagram — discover the rule visually before drilling examples */}
      {lesson.interactiveDiagram ? (
        <section className="space-y-3">
          <SectionHeading icon={MousePointerClick} titleAr="اكتشف القاعدة بصرياً" />
          <InteractiveDiagram scene={lesson.interactiveDiagram} />
        </section>
      ) : null}

      {/* Examples */}
      {lesson.examples.length > 0 ? (
        <section className="space-y-3">
          <SectionHeading icon={BookOpen} titleAr="أمثلة" />
          <div className="grid gap-2 sm:grid-cols-2">
            {lesson.examples.map((example, index) => (
              <ExampleSentence key={index} de={example.de} ar={example.ar} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Vocabulary */}
      {lesson.vocabulary.length > 0 ? (
        <section className="space-y-3">
          <SectionHeading icon={BookOpen} titleAr="المفردات" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {lesson.vocabulary.map((item) => (
              <FlipVocabularyCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Practical-usage dialogues */}
      {lesson.dialogues && lesson.dialogues.length > 0 ? (
        <section className="space-y-3">
          <SectionHeading icon={MessageCircle} titleAr="محادثة عملية" />
          <div className="grid gap-4 lg:grid-cols-2">
            {lesson.dialogues.map((dialogue) => (
              <DialogueDisplay key={dialogue.id} dialogue={dialogue} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Pronunciation practice */}
      {(lesson.pronunciationTips && lesson.pronunciationTips.length > 0) || practiceWords.length > 0 ? (
        <section className="space-y-3">
          <SectionHeading icon={Volume2} titleAr="نصائح النطق والتدرّب" />
          {lesson.pronunciationTips && lesson.pronunciationTips.length > 0 ? (
            <PronunciationTips tips={lesson.pronunciationTips} />
          ) : null}
          {practiceWords.length > 0 ? (
            <Card>
              <CardBody>
                <p dir="rtl" className="mb-3 text-sm text-ink-muted">
                  اضغط على أي كلمة أو جملة للاستماع إلى نطقها.
                </p>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {practiceWords.map((word) => (
                    <GermanWord key={word} word={word} size="sm" className="rounded-md border border-border-strong" />
                  ))}
                </div>
              </CardBody>
            </Card>
          ) : null}
        </section>
      ) : null}

      {/* Exercises */}
      {lesson.exercises.length > 0 ? (
        <section className="space-y-3">
          <SectionHeading icon={Dumbbell} titleAr="التمارين" />
          <ExerciseRunner exercises={lesson.exercises} onComplete={setExerciseAccuracy} />
        </section>
      ) : null}

      {/* Common Mistakes */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 ? (
        <section className="space-y-3">
          <SectionHeading icon={AlertTriangle} titleAr="أخطاء شائعة" />
          <Card>
            <CardBody>
              <CommonMistakesList mistakes={lesson.commonMistakes} />
            </CardBody>
          </Card>
        </section>
      ) : null}

      {/* Review / Completion */}
      <section className="space-y-3">
        <SectionHeading icon={CheckCircle2} titleAr="المراجعة والإكمال" />
        <Card>
          <CardBody dir="rtl" className="flex flex-col items-center gap-4 py-6 text-center">
            {showCompleted ? (
              <>
                <CheckCircle2 size={36} className="text-success" aria-hidden="true" />
                <p className="font-semibold text-ink">أحسنت! لقد أكملت هذا الدرس.</p>
                {nextLesson ? (
                  <Link to={`/lessons/${nextLesson.level.toLowerCase()}/${nextLesson.slug}`}>
                    <Button>الانتقال إلى الدرس التالي: {nextLesson.titleAr}</Button>
                  </Link>
                ) : (
                  <Link to={`/levels/${lesson.level.toLowerCase()}`}>
                    <Button variant="outline">العودة إلى قائمة الدروس</Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <p className="text-sm text-ink-muted">
                  راجع أهداف الدرس أعلاه، ثم أكمل التمارين لإنهاء هذا الدرس بثقة.
                </p>
                <Button
                  onClick={handleCompleteLesson}
                  disabled={lesson.exercises.length > 0 && exerciseAccuracy === null}
                  icon={<CheckCircle2 size={16} aria-hidden="true" />}
                >
                  إكمال الدرس
                </Button>
                {lesson.exercises.length > 0 && exerciseAccuracy === null ? (
                  <p className="text-xs text-ink-faint">أكمل التمارين أعلاه أولاً لتفعيل هذا الزر.</p>
                ) : null}
              </>
            )}
          </CardBody>
        </Card>
      </section>
    </div>
  )
}
