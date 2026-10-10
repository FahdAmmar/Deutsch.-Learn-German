import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Dumbbell,
  Languages,
  ListChecks,
  MessageCircle,
  MousePointerClick,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { Badge, Button, Card, InlineMarkup } from '@/components/ui'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { ComparisonLadder } from '@/features/grammar/ComparisonLadder'
import { CommonMistakesList } from '@/features/lessons/CommonMistakesList'
import { DialogueDisplay } from '@/features/lessons/DialogueDisplay'
import { ExampleSentence } from '@/features/lessons/ExampleSentence'
import { InteractiveDiagram } from '@/features/lessons/InteractiveDiagram'
import { LessonSectionNav } from '@/features/lessons/LessonSectionNav'
import type { LessonSectionLink } from '@/features/lessons/LessonSectionNav'
import { LevelMark } from '@/features/levels/LevelMark'
import { PronunciationTips } from '@/features/lessons/PronunciationTips'
import { SectionHeading } from '@/features/lessons/SectionHeading'
import { GermanWord } from '@/features/pronunciation/GermanWord'
import { GrammarTopicCard } from '@/features/grammar/GrammarTopicCard'
import { RelatedGrammarRules } from '@/features/grammar/links/RelatedGrammarRules'
import { FlipVocabularyCard } from '@/features/vocabulary/FlipVocabularyCard'
import { getLesson, getModuleById, getNextLesson } from '@/lib/curriculum'
import { getGrammarRulesForLesson } from '@/lib/grammarLinks'
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

  const relatedRules = useMemo(() => (lesson ? getGrammarRulesForLesson(lesson.id) : []), [lesson])

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

  const hasGrammar = Boolean((lesson.grammarTopics && lesson.grammarTopics.length > 0) || lesson.adjectiveComparisons)
  const hasPronunciation = Boolean((lesson.pronunciationTips && lesson.pronunciationTips.length > 0) || practiceWords.length > 0)
  const hasDialogues = Boolean(lesson.dialogues && lesson.dialogues.length > 0)
  const hasMistakes = Boolean(lesson.commonMistakes && lesson.commonMistakes.length > 0)

  // The rail only lists sections this lesson actually has.
  const sections: LessonSectionLink[] = [
    { id: 'lesson-objectives', label: 'الأهداف' },
    { id: 'lesson-explanation', label: 'الشرح' },
    ...(hasGrammar ? [{ id: 'lesson-grammar', label: 'القاعدة' }] : []),
    ...(lesson.interactiveDiagram ? [{ id: 'lesson-diagram', label: 'اكتشف القاعدة' }] : []),
    ...(lesson.examples.length > 0 ? [{ id: 'lesson-examples', label: 'أمثلة' }] : []),
    ...(lesson.vocabulary.length > 0 ? [{ id: 'lesson-vocabulary', label: 'المفردات' }] : []),
    ...(hasDialogues ? [{ id: 'lesson-dialogues', label: 'محادثة' }] : []),
    ...(hasPronunciation ? [{ id: 'lesson-pronunciation', label: 'النطق' }] : []),
    ...(lesson.exercises.length > 0 ? [{ id: 'lesson-exercises', label: 'التمارين' }] : []),
    ...(hasMistakes ? [{ id: 'lesson-mistakes', label: 'أخطاء شائعة' }] : []),
    { id: 'lesson-complete', label: 'الإكمال' },
  ]

  return (
    <div className="pb-6">
      {/* Lesson header */}
      <header dir="rtl" className="space-y-4 pb-6">
        <nav aria-label="مسار الصفحة" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
          <Link to={`/levels/${lesson.level.toLowerCase()}`} className="inline-flex items-center gap-2 hover:text-ink">
            <LevelMark level={lesson.level} size="sm" />
            <span className="font-semibold">كل دروس المستوى</span>
          </Link>
          {module ? (
            <>
              <span aria-hidden="true">/</span>
              <span>{module.titleAr}</span>
            </>
          ) : null}
        </nav>

        <div className="space-y-1.5">
          <h1
            dir="ltr"
            lang="de"
            className="display-de text-end text-[2.5rem] font-semibold text-ink [overflow-wrap:anywhere] sm:text-6xl"
          >
            {lesson.title}
          </h1>
          <p className="font-sans text-xl font-semibold text-ink-muted sm:text-2xl">{lesson.titleAr}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
          <span className="flex items-center gap-1.5">
            <Clock size={15} aria-hidden="true" />
            <span className="tnum">{lesson.estimatedMinutes}</span> دقيقة تقريباً
          </span>
          {showCompleted ? (
            <Badge tone="success">
              <CheckCircle2 size={13} aria-hidden="true" />
              مكتمل
            </Badge>
          ) : null}
        </div>
      </header>

      <LessonSectionNav sections={sections} variant="bar" />

      <div className="gap-14 pt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem]">
        <div className="min-w-0 space-y-12">
          {/* Objectives */}
          <section aria-labelledby="lesson-objectives" className="space-y-4">
            <SectionHeading id="lesson-objectives" icon={ListChecks} titleAr="أهداف الدرس" />
            <Card tone="tint">
              <ul dir="rtl" className="space-y-3 p-4 sm:p-5">
                {lesson.objectivesAr.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3 leading-8 text-ink">
                    <Check size={18} className="mt-2 shrink-0 text-accent" strokeWidth={2.6} aria-hidden="true" />
                    <InlineMarkup text={objective} />
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* Explanation: Arabic prose that explains the German concept */}
          <section aria-labelledby="lesson-explanation" className="space-y-4">
            <SectionHeading id="lesson-explanation" icon={BookOpen} titleAr="الشرح" />
            <div dir="rtl" className="space-y-8">
              {lesson.explanation.map((section, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-sans text-lg font-bold text-ink">
                    <InlineMarkup text={section.titleAr} />
                  </h3>
                  <p className="prose-ar text-ink">
                    <InlineMarkup text={section.bodyAr} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Visual grammar */}
          {hasGrammar ? (
            <section aria-labelledby="lesson-grammar" className="space-y-4">
              <SectionHeading id="lesson-grammar" icon={Sparkles} titleAr="القاعدة النحوية" />
              <div className="space-y-4">
                {lesson.grammarTopics?.map((topic) => <GrammarTopicCard key={topic.id} topic={topic} />)}
                {lesson.adjectiveComparisons ? <ComparisonLadder adjectives={lesson.adjectiveComparisons} /> : null}
              </div>
              <RelatedGrammarRules rules={relatedRules} />
            </section>
          ) : (
            <RelatedGrammarRules rules={relatedRules} />
          )}

          {/* Interactive diagram: discover the rule visually before drilling examples */}
          {lesson.interactiveDiagram ? (
            <section aria-labelledby="lesson-diagram" className="space-y-4">
              <SectionHeading id="lesson-diagram" icon={MousePointerClick} titleAr="اكتشف القاعدة بصرياً" />
              <InteractiveDiagram scene={lesson.interactiveDiagram} />
            </section>
          ) : null}

          {/* Examples */}
          {lesson.examples.length > 0 ? (
            <section aria-labelledby="lesson-examples" className="space-y-4">
              <SectionHeading id="lesson-examples" icon={Languages} titleAr="أمثلة" />
              <Card>
                <div className="divide-y divide-border">
                  {lesson.examples.map((example, index) => (
                    <ExampleSentence key={index} de={example.de} ar={example.ar} />
                  ))}
                </div>
              </Card>
            </section>
          ) : null}

          {/* Vocabulary */}
          {lesson.vocabulary.length > 0 ? (
            <section aria-labelledby="lesson-vocabulary" className="space-y-4">
              <SectionHeading id="lesson-vocabulary" icon={BookOpen} titleAr="المفردات" />
              <p dir="rtl" className="text-sm text-ink-muted">
                اضغط على البطاقة لترى المعنى، وعلى السماعة لتسمع النطق.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {lesson.vocabulary.map((item) => (
                  <FlipVocabularyCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ) : null}

          {/* Practical-usage dialogues */}
          {hasDialogues ? (
            <section aria-labelledby="lesson-dialogues" className="space-y-4">
              <SectionHeading id="lesson-dialogues" icon={MessageCircle} titleAr="محادثة عملية" />
              <div className="grid gap-4 xl:grid-cols-2">
                {lesson.dialogues?.map((dialogue) => <DialogueDisplay key={dialogue.id} dialogue={dialogue} />)}
              </div>
            </section>
          ) : null}

          {/* Pronunciation practice */}
          {hasPronunciation ? (
            <section aria-labelledby="lesson-pronunciation" className="space-y-4">
              <SectionHeading id="lesson-pronunciation" icon={Volume2} titleAr="نصائح النطق والتدرّب" />
              {lesson.pronunciationTips && lesson.pronunciationTips.length > 0 ? (
                <PronunciationTips tips={lesson.pronunciationTips} />
              ) : null}
              {practiceWords.length > 0 ? (
                <Card tone="tint">
                  <div className="space-y-3 p-4 sm:p-5">
                    <p dir="rtl" className="text-sm text-ink-muted">
                      اضغط على أي كلمة أو جملة للاستماع إلى نطقها.
                    </p>
                    <div className="flex flex-wrap gap-2" dir="ltr">
                      {practiceWords.map((word) => (
                        <GermanWord
                          key={word}
                          word={word}
                          size="sm"
                          className="rounded-md border border-border-strong bg-surface px-2.5 py-1.5"
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              ) : null}
            </section>
          ) : null}

          {/* Exercises */}
          {lesson.exercises.length > 0 ? (
            <section aria-labelledby="lesson-exercises" className="space-y-4">
              <SectionHeading id="lesson-exercises" icon={Dumbbell} titleAr="التمارين" />
              <ExerciseRunner exercises={lesson.exercises} onComplete={setExerciseAccuracy} />
            </section>
          ) : null}

          {/* Common mistakes */}
          {hasMistakes ? (
            <section aria-labelledby="lesson-mistakes" className="space-y-4">
              <SectionHeading id="lesson-mistakes" icon={AlertTriangle} titleAr="أخطاء شائعة" />
              <Card>
                <CommonMistakesList mistakes={lesson.commonMistakes ?? []} />
              </Card>
            </section>
          ) : null}

          {/* Completion */}
          <section aria-labelledby="lesson-complete" className="space-y-4">
            <SectionHeading id="lesson-complete" icon={CheckCircle2} titleAr="المراجعة والإكمال" />
            <Card tone={showCompleted ? 'surface' : 'brand'}>
              <div dir="rtl" className="flex flex-col items-center gap-4 px-5 py-8 text-center">
                {showCompleted ? (
                  <>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground">
                      <Check size={28} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <p className="font-sans text-xl font-bold text-ink">أحسنت! لقد أكملت هذا الدرس.</p>
                    {nextLesson ? (
                      <Link to={`/lessons/${nextLesson.level.toLowerCase()}/${nextLesson.slug}`}>
                        <Button size="lg" icon={<ArrowLeft size={18} aria-hidden="true" />} iconPosition="end">
                          الانتقال إلى الدرس التالي: {nextLesson.titleAr}
                        </Button>
                      </Link>
                    ) : (
                      <Link to={`/levels/${lesson.level.toLowerCase()}`}>
                        <Button variant="outline">العودة إلى قائمة الدروس</Button>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <p className="max-w-[46ch] text-ink-muted">
                      راجع أهداف الدرس أعلاه، ثم أكمل التمارين لإنهاء هذا الدرس بثقة.
                    </p>
                    <Button
                      size="lg"
                      onClick={handleCompleteLesson}
                      disabled={lesson.exercises.length > 0 && exerciseAccuracy === null}
                      icon={<CheckCircle2 size={18} aria-hidden="true" />}
                    >
                      إكمال الدرس
                    </Button>
                    {lesson.exercises.length > 0 && exerciseAccuracy === null ? (
                      <p className="text-sm text-ink-muted">أكمل التمارين أعلاه أولاً لتفعيل هذا الزر.</p>
                    ) : null}
                  </>
                )}
              </div>
            </Card>
          </section>
        </div>

        <LessonSectionNav sections={sections} variant="rail" />
      </div>
    </div>
  )
}
