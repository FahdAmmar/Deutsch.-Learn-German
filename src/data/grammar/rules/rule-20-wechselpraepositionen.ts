import type { GrammarRule } from '@/types'

/**
 * Rule 20 — Wechselpräpositionen (two-way prepositions). The case-by-
 * motion-vs-location logic is introduced here; the position-verb pairs
 * (stehen/stellen, liegen/legen...) and deeper Wo?/Wohin? drilling are
 * rule 21, directly next.
 */
const rule: GrammarRule = {
  id: 'gr-20',
  number: 20,
  slug: '20-wechselpraepositionen',
  level: 'A2',
  termDe: 'Wechselpräpositionen',
  titleAr: 'حروف الجر المتغيرة',
  eyebrowAr: 'الدرس الرابع في مستوى A2',
  taglineAr:
    'تذكر حروف الجرّ الثابتة (الدرس ١٤)؟ تسعة حروف أخرى **تتغيّر حالتها** حسب المعنى: نفس الحرف قد يفرض [[Akkusativ]] أو [[Dativ]] في نفس الجملة تقريباً، والفيصل هو: هل هناك **حركة نحو مكان** أم **سكون في مكان**؟',
  stats: [
    { value: '9', labelAr: 'حروف جرّ متغيّرة' },
    { value: '2', labelAr: 'حالتان ممكنتان لكل حرف' },
    { value: '40+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Die Katze springt auf den Tisch. Die Katze sitzt auf dem Tisch.',
    ar: 'القطة تقفز على الطاولة. القطة تجلس على الطاولة.',
  },
  objectivesAr: [
    'تحفظ حروف الجرّ المتغيّرة التسعة.',
    'تفرّق بين الحركة (Akkusativ) والسكون (Dativ) بنفس الحرف.',
    'تطبّق هذه القاعدة على أفعال حركة وأفعال سكون شائعة.',
  ],

  sections: [
    {
      id: 'concept',
      navLabelAr: 'الفكرة',
      kickerDe: 'Bewegung oder Ort?',
      titleAr: 'حركة أم سكون؟',
      titleDe: 'Akkusativ oder Dativ',
      tone: 'accent',
      introAr: 'اطرح سؤالاً بسيطاً على نفسك: هل الفعل يصف **انتقالاً** إلى مكان (→ [[Akkusativ]])، أم **موقعاً ثابتاً** في مكان (→ [[Dativ]])؟',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'جرّب بنفسك: نفس الحرف، معنيان',
          modes: [
            {
              labelAr: 'حركة → Akkusativ',
              captionAr: 'القطة تنتقل إلى فوق الطاولة — فعل حركة [[springen]].',
              parts: [{ text: 'Die Katze springt auf' }, { text: 'den Tisch.', tone: 'accent' }],
            },
            {
              labelAr: 'سكون → Dativ',
              captionAr: 'القطة موجودة بالفعل فوق الطاولة — فعل سكون [[sitzen]].',
              parts: [{ text: 'Die Katze sitzt auf' }, { text: 'dem Tisch.', tone: 'plum' }],
            },
          ],
        },
        {
          kind: 'table',
          captionAr: 'حروف الجرّ المتغيّرة التسعة',
          columns: [
            { header: 'الحرف', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['an', 'عند / بجانب (ملاصقاً عمودياً)'],
            ['auf', 'على (فوق سطح)'],
            ['hinter', 'خلف'],
            ['in', 'في / داخل'],
            ['neben', 'بجانب'],
            ['über', 'فوق (بلا ملامسة)'],
            ['unter', 'تحت'],
            ['vor', 'أمام'],
            ['zwischen', 'بين'],
          ],
        },
      ],
    },

    {
      id: 'application',
      navLabelAr: 'التطبيق',
      kickerDe: 'Anwendung',
      titleAr: 'التطبيق على جمل حقيقية',
      titleDe: 'in · an · auf',
      tone: 'plum',
      introAr: 'لاحظ كيف يتغيّر شكل الأداة نفسها (Akkusativ أم Dativ) بتغيّر الفعل وحده — الحرف ثابت، لكن الحالة تتبع المعنى.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'نفس الحرف، معنيان مختلفان',
          columns: [
            { header: 'الحرف', lang: 'de', tone: 'highlight' },
            { header: 'حركة (Akkusativ)', lang: 'de', tone: 'accent' },
            { header: 'سكون (Dativ)', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['in', 'Ich gehe in die Schule.', 'Ich bin in der Schule.'],
            ['an', 'Ich gehe an den Strand.', 'Ich bin am Strand.'],
            ['auf', 'Ich lege das Buch auf den Tisch.', 'Das Buch liegt auf dem Tisch.'],
            ['vor', 'Ich stelle das Auto vor das Haus.', 'Das Auto steht vor dem Haus.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'اندماج شائع: in das → ins، an das → ans',
          bodyAr: 'في الكلام اليومي، تندمج بعض حروف الجرّ مع أداة [[das]] المحايدة: [[in das]] → [[ins]]، [[an das]] → [[ans]]، [[auf das]] → [[aufs]]. كما تندمج [[an dem]] → [[am]] و[[in dem]] → [[im]].',
        },
        {
          kind: 'examples',
          titleAr: 'جمل حركة وسكون متنوّعة',
          tone: 'plum',
          items: [
            { badge: 'حركة — in', de: 'Ich gehe **ins** Kino.', ar: 'أذهب إلى السينما.' },
            { badge: 'سكون — in', de: 'Ich bin **im** Kino.', ar: 'أنا في السينما.' },
            { badge: 'حركة — auf', de: 'Die Kinder laufen **auf den** Spielplatz.', ar: 'يركض الأطفال نحو الملعب.' },
            { badge: 'سكون — auf', de: 'Die Kinder spielen **auf dem** Spielplatz.', ar: 'يلعب الأطفال في الملعب.' },
            { badge: 'حركة — hinter', de: 'Die Katze läuft **hinter das** Sofa.', ar: 'تجري القطة إلى خلف الأريكة.' },
            { badge: 'سكون — hinter', de: 'Die Katze sitzt **hinter dem** Sofa.', ar: 'تجلس القطة خلف الأريكة.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: حركة أم سكون؟',
          exercises: [
            {
              id: 'gr20-p1-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الأداة الصحيحة (gehen = حركة)',
              questionDe: 'Ich gehe in ___ Garten.',
              options: ['der', 'den', 'dem', 'des'],
              correctIndex: 1,
              explanationAr: '[[gehen]] فعل حركة → Akkusativ: [[den Garten]].',
            },
            {
              id: 'gr20-p1-mc2',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الأداة الصحيحة (sein = سكون)',
              questionDe: 'Ich bin in ___ Garten.',
              options: ['der', 'den', 'dem', 'des'],
              correctIndex: 2,
              explanationAr: '[[sein]] فعل سكون → Dativ: [[dem Garten]].',
            },
          ],
        },
      ],
    },

    {
      id: 'mistakes',
      navLabelAr: 'أخطاء شائعة',
      kickerDe: 'Typische Fehler',
      titleAr: 'أخطاء شائعة',
      titleDe: 'Fehler',
      tone: 'error',
      introAr: 'أشهر خطأ هو استخدام Dativ دائماً لأن «المكان» يبدو ثابتاً، بينما الفعل نفسه يصف حركة.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich gehe in dem Park.',
              correct: 'Ich gehe in den Park.',
              explanationAr: 'المقصود هنا الانتقال إلى الحديقة (Wohin?)، فيلزم Akkusativ: [[in den Park]]. أمّا [[in dem Park]] فتجيب عن Wo? وتصلح فقط لمكان حدوث الفعل، كما في «Ich gehe im Park spazieren» (أتمشّى داخل الحديقة).',
            },
            {
              wrong: 'Das Buch liegt auf den Tisch.',
              correct: 'Das Buch liegt auf dem Tisch.',
              explanationAr: '[[liegen]] فعل سكون؛ يحتاج Dativ هنا، لا Akkusativ.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'an · auf · hinter · in · neben · über · unter · vor · zwischen', hintAr: 'ما هذه؟', backAr: 'حروف الجرّ المتغيّرة التسعة.' },
    { frontDe: 'حركة ← مكان', hintAr: 'أيّ حالة؟', backAr: 'Akkusativ.', exampleDe: 'Ich gehe **in den** Park.' },
    { frontDe: 'سكون في مكان', hintAr: 'أيّ حالة؟', backAr: 'Dativ.', exampleDe: 'Ich bin **in dem** Park.' },
    { frontDe: 'in das → ins · an dem → am', hintAr: 'ما هذا؟', backAr: 'اندماجات شائعة بين حرف الجرّ وأداة التعريف.' },
  ],

  quiz: [
    {
      id: 'gr20-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة',
      questionDe: 'Die Lampe hängt über ___ Tisch. (سكون)',
      options: ['den', 'dem', 'der', 'das'],
      correctIndex: 1,
      explanationAr: 'موقع ثابت → Dativ: [[dem Tisch]].',
    },
    {
      id: 'gr20-q2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة',
      questionDe: 'Ich stelle die Tasche neben ___ Tür. (حركة)',
      options: ['die', 'der', 'den', 'dem'],
      correctIndex: 0,
      explanationAr: 'حركة نحو مكان → Akkusativ: [[die Tür]] (مؤنّث، بلا تغيير شكلي لكنها Akkusativ منطقياً).',
    },
    {
      id: 'gr20-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„in dem" wird oft zu „im" zusammengezogen.',
      isTrue: true,
      explanationAr: 'صحيح: [[in dem]] → [[im]].',
    },
  ],

  cheatSheet: [
    { de: 'an, auf, hinter, in, neben, über, unter, vor, zwischen', ar: 'حروف الجرّ المتغيّرة التسعة.' },
    { de: 'حركة → Akkusativ', ar: 'gehen, laufen, legen, stellen…' },
    { de: 'سكون → Dativ', ar: 'sein, liegen, stehen, sitzen…' },
    { de: 'ins, ans, aufs, im, am', ar: 'اندماجات شائعة.' },
  ],
}

export default rule
