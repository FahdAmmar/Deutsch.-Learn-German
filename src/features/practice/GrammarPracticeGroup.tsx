import { Link2, Network, Rows3, SpellCheck, Type } from 'lucide-react'

import type { CEFRLevel, Exercise } from '@/types'

import { buildAdjectiveDrill } from './adjectiveDrill'
import { buildCaseDrill, countCaseScenarios } from './caseDrill'
import { buildCollocationDrill, getCollocationsForLevel } from './collocationDrill'
import { CasesReference } from './CasesReference'
import { CollocationsReference } from './CollocationsReference'
import { ModeCard } from './ModeCard'
import { PracticeGroup } from './PracticeGroup'
import { buildWordFamilyDrill, getFamiliesForLevel } from './wordFamilyDrill'
import { WordFamiliesReference } from './WordFamiliesReference'
import { buildWordOrderDrill, getWordOrderSentences } from './wordOrderDrill'
import { WordOrderReference } from './WordOrderReference'

interface GrammarPracticeGroupProps {
  level: CEFRLevel
  onStart: (title: string, exercises: Exercise[]) => void
}

/** The drills on how German is put together: the case of a noun, the ending of an adjective, the place of the verb, and which words go together. */
export function GrammarPracticeGroup({ level, onStart }: GrammarPracticeGroupProps) {
  const collocationCount = getCollocationsForLevel(level).length
  const familyCount = getFamiliesForLevel(level).length
  const orderCount = getWordOrderSentences(level).length

  return (
    <>
      <PracticeGroup title="النحو والتركيب" description="الحالة والنهايات ومكان الفعل: ما يصعب على من يتكلّم العربية، وتتدرّب عليه بأسئلة جديدة.">
        <ModeCard
          icon={SpellCheck}
          title="الحالات: أي أداة؟"
          description="Ich sehe ___ Mann. Ich helfe ___ Frau. اختر الأداة الصحيحة أو اكتبها، وسمِّ الحالة. الفعل أو حرف الجر هو الذي يقرّر."
          meta={`${countCaseScenarios(level)} جملة ممكنة في ${level}`}
          actionLabel="ابدأ التدريب"
          onStart={() => onStart('الحالات: أي أداة؟', buildCaseDrill(level))}
        />
        <ModeCard
          icon={Type}
          title="نهايات الصفات"
          description="ein neuer Tisch، einen neuen Tisch، mit dem neuen Tisch: أيّ نهاية تأخذ الصفة بعد الأداة؟ تدرّب عليها في الجمل."
          actionLabel="ابدأ التدريب"
          onStart={() => onStart('نهايات الصفات', buildAdjectiveDrill())}
          disabledReason={level === 'A1' ? 'نهايات الصفات من مستوى A2. اختر المستوى A2 لتبدأ.' : undefined}
        />
        <ModeCard
          icon={Rows3}
          title="ترتيب الجملة"
          description="ضع الأجزاء في مكانها: الفعل ثانياً، والمصدر في النهاية، وفعل الجملة الثانوية في آخرها. بعد الإجابة ترى الجملة ملوّنة بأدوار أجزائها."
          meta={`${orderCount} جملة في ${level}`}
          actionLabel="ابدأ التدريب"
          onStart={() => onStart('ترتيب الجملة', buildWordOrderDrill(level))}
        />
      </PracticeGroup>

      <PracticeGroup title="مفردات أعمق" description="الكلمة لا تُحفظ وحدها: تُحفظ مع فعلها ومع أخواتها.">
        <ModeCard
          icon={Link2}
          title="التلازمات اللفظية"
          description="ein Foto machen أم nehmen؟ اختر الفعل الذي يأتي مع الاسم، وطابِق التعبيرات بمعانيها."
          meta={`${collocationCount} تعبيراً في ${level}`}
          actionLabel="ابدأ التدريب"
          onStart={() => onStart('التلازمات اللفظية', buildCollocationDrill(level))}
        />
        <ModeCard
          icon={Network}
          title="عائلات الكلمات"
          description="fahren ← die Fahrt، der Fahrer، abfahren. أكمل الجمل بكلمة من عائلة الجذر، وطابِق كلمات العائلة بمعانيها."
          meta={`${familyCount} عائلة في ${level}`}
          actionLabel="ابدأ التدريب"
          onStart={() => onStart('عائلات الكلمات', buildWordFamilyDrill(level))}
          disabledReason={familyCount === 0 ? 'لا توجد عائلات كلمات كافية في هذا المستوى بعد.' : undefined}
        />
      </PracticeGroup>

      <div className="space-y-3">
        <CasesReference />
        <WordOrderReference />
        <CollocationsReference />
        <WordFamiliesReference />
      </div>
    </>
  )
}
