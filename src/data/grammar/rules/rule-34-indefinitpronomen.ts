import type { GrammarRule } from '@/types'

/**
 * Rule 34 — Indefinitpronomen, the last A2 rule. Covers man, jemand/
 * niemand, etwas/nichts, and alle/einige/manche. `man` only ever appears
 * in Nominativ here (its Akkusativ/Dativ forms einen/einem are a B1-level
 * refinement, intentionally out of scope).
 */
const rule: GrammarRule = {
  id: 'gr-34',
  number: 34,
  slug: '34-indefinitpronomen',
  level: 'A2',
  termDe: 'Indefinitpronomen',
  titleAr: 'الضمائر غير المحددة',
  eyebrowAr: 'الدرس الثامن عشر — خاتمة مستوى A2',
  taglineAr:
    'آخر محطة في A2: الضمائر غير المحدَّدة، التي تتحدّث عن أشخاص أو أشياء **بلا تحديد**: [[man]] (المرء)، [[jemand]] (أحدهم)، [[niemand]] (لا أحد)، [[etwas]] (شيء ما)، [[nichts]] (لا شيء). هذه الكلمات الصغيرة تُستخدم باستمرار في الحديث اليومي.',
  stats: [
    { value: '5', labelAr: 'ضمائر غير محدَّدة أساسية' },
    { value: '1', labelAr: 'ضمير الحديث العامّ: man' },
    { value: '30+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'In Deutschland spricht man oft über das Wetter. Hat jemand eine Frage?',
    ar: 'في ألمانيا يتحدّث الناس كثيراً عن الطقس. هل لدى أحدكم سؤال؟',
  },
  objectivesAr: [
    'تستخدم [[man]] للحديث العامّ، بدل صيغة المجهول أو «الناس» بالعربية.',
    'تفرّق بين [[jemand]]/[[niemand]] (أشخاص) و[[etwas]]/[[nichts]] (أشياء).',
    'تستخدم [[alle]]/[[einige]]/[[manche]] للتحدّث عن كمّيات غير محدَّدة.',
  ],

  sections: [
    {
      id: 'man',
      navLabelAr: 'man',
      kickerDe: 'man',
      titleAr: 'man: الحديث العامّ',
      titleDe: 'man',
      tone: 'accent',
      introAr:
        '[[man]] يقابل «المرء» أو «الناس» أو صيغة المجهول بالعربية («يُقال إنّ...»). يُصرَّف الفعل معه **تماماً** كما مع [[er/sie/es]] (الغائب المفرد).',
      blocks: [
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'man = er/sie/es في التصريف',
          bodyAr: '[[man]] يأخذ دائماً نفس صيغة الفعل التي يأخذها [[er]]: [[man spricht]]، [[man kann]]، [[man ist]]. ولا وجود لصيغة جمع لـ man — هي دائماً صيغة مفردة في التصريف، حتى لو كان معناها يشمل الجميع.',
        },
        {
          kind: 'examples',
          titleAr: 'man في جمل شائعة جداً',
          tone: 'accent',
          items: [
            { badge: 'قاعدة عامة', de: 'In Deutschland spricht man Deutsch.', ar: 'في ألمانيا يتحدّث الناس الألمانية.' },
            { badge: 'نصيحة', de: 'Man sollte viel Wasser trinken.', ar: 'ينبغي للمرء شرب الكثير من الماء.' },
            { badge: 'قاعدة/لافتة', de: 'Hier darf man nicht rauchen.', ar: 'لا يُسمح بالتدخين هنا.' },
            { badge: 'تعميم', de: 'Man kann hier gut essen.', ar: 'يمكن للمرء أن يأكل جيداً هنا.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'لا تخلط man بـ Mann',
          bodyAr: '[[man]] (الضمير، بحرف n واحد) تختلف تماماً عن [[der Mann]] (الرجل، بحرفَي n). النطق متقارب لكن المعنى والكتابة مختلفان كلياً.',
        },
      ],
    },

    {
      id: 'jemand-niemand',
      navLabelAr: 'jemand · niemand',
      kickerDe: 'Personen',
      titleAr: 'jemand وniemand: أشخاص غير محدَّدين',
      titleDe: 'jemand / niemand',
      tone: 'plum',
      introAr: '[[jemand]] (أحدهم/شخص ما) و[[niemand]] (لا أحد) يشيران إلى شخص دون تحديد هويته.',
      blocks: [
        {
          kind: 'examples',
          titleAr: 'في جمل',
          tone: 'plum',
          items: [
            { badge: 'jemand', de: 'Hat jemand meinen Stift gesehen?', ar: 'هل رأى أحدكم قلمي؟' },
            { badge: 'jemand', de: 'Ich suche jemanden, der mir helfen kann.', ar: 'أبحث عن شخص يمكنه مساعدتي.' },
            { badge: 'niemand', de: 'Niemand war zu Hause.', ar: 'لم يكن أحد في البيت.' },
            { badge: 'niemand', de: 'Ich kenne hier niemanden.', ar: 'لا أعرف أحداً هنا.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'نهاية -en اختيارية في Akkusativ/Dativ',
          bodyAr: 'في الكلام الرسمي، [[jemand]]/[[niemand]] قد تأخذان [[-en]] في Akkusativ ([[jemanden]]) و[[-em]] في Dativ ([[jemandem]])؛ في الكلام العامّي يكثر استخدام الشكل الأساسي بلا نهاية. كلا الاستخدامين مقبول في A2.',
        },
      ],
    },

    {
      id: 'etwas-nichts',
      navLabelAr: 'etwas · nichts',
      kickerDe: 'Sachen',
      titleAr: 'etwas وnichts: أشياء غير محدَّدة',
      titleDe: 'etwas / nichts',
      tone: 'highlight',
      introAr: '[[etwas]] (شيء ما) و[[nichts]] (لا شيء) للأشياء — ولا تتغيّران أبداً، بلا نهايات.',
      blocks: [
        {
          kind: 'examples',
          titleAr: 'في جمل',
          tone: 'highlight',
          items: [
            { badge: 'etwas', de: 'Ich möchte etwas trinken.', ar: 'أودّ شرب شيء ما.' },
            { badge: 'etwas', de: 'Hast du etwas gesagt?', ar: 'هل قلتَ شيئاً؟' },
            { badge: 'nichts', de: 'Ich habe nichts gehört.', ar: 'لم أسمع شيئاً.' },
            { badge: 'nichts', de: 'Das hat nichts mit mir zu tun.', ar: 'ليس لهذا علاقة بي.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'star',
          titleAr: 'etwas/nichts + صفة',
          bodyAr: 'حين تصف [[etwas]] أو [[nichts]] بصفة، تُكتب الصفة بحرف كبير وتأخذ نهاية [[-es]] ثابتة: [[etwas Interessantes]] (شيء مثير للاهتمام)، [[nichts Neues]] (لا جديد).',
        },
      ],
    },

    {
      id: 'alle-einige-manche',
      navLabelAr: 'alle · einige · manche',
      kickerDe: 'Mengen',
      titleAr: 'alle وeinige وmanche: كمّيات غير محدَّدة',
      titleDe: 'Mengenangaben',
      tone: 'accent',
      introAr: 'هذه الكلمات تصف كمّية من مجموعة بلا تحديد دقيق — وتُستخدم مع أسماء جمع.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'كمّيات شائعة',
          columns: [
            { header: 'الكلمة', lang: 'de', tone: 'accent' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['alle', 'الجميع/كلّ', 'Alle Schüler waren da.'],
            ['einige', 'بعض (قليل)', 'Einige Leute kamen spät.'],
            ['manche', 'بعض (متفرّقون)', 'Manche Studenten lernen abends.'],
            ['viele', 'كثيرون', 'Viele Kinder spielen draußen.'],
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين شامل',
          exercises: [
            {
              id: 'gr34-p1-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الكلمة المناسبة: «هل رأى أحد كتابي؟»',
              questionDe: 'Hat ___ mein Buch gesehen?',
              options: ['man', 'jemand', 'etwas', 'niemand'],
              correctIndex: 1,
              explanationAr: '[[jemand]] = أحدهم (شخص).',
            },
            {
              id: 'gr34-p1-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل: في فرنسا يتحدّث الناس الفرنسية',
              sentenceDe: 'In Frankreich spricht ___ Französisch.',
              acceptedAnswers: ['man'],
              explanationAr: '[[man]] للحديث العامّ.',
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
      introAr: 'أشهر خطأ هو الخلط بين jemand/niemand (للأشخاص) وetwas/nichts (للأشياء).',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Hat etwas meinen Stift gesehen?',
              correct: 'Hat jemand meinen Stift gesehen?',
              explanationAr: 'السؤال عن شخص، فالضمير الصحيح [[jemand]].',
            },
            {
              wrong: 'Ich habe niemand gegessen.',
              correct: 'Ich habe nichts gegessen.',
              explanationAr: 'الحديث عن طعام (شيء)، فالضمير الصحيح [[nichts]].',
            },
            {
              wrong: 'Man sprechen Deutsch hier.',
              correct: 'Man spricht Deutsch hier.',
              explanationAr: '[[man]] يُصرَّف كـ[[er/sie/es]]: [[spricht]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'man', hintAr: 'كيف يُصرَّف الفعل؟', backAr: 'تماماً كـ er/sie/es: man spricht, man kann.' },
    { frontDe: 'jemand / niemand', hintAr: 'للأشخاص أم الأشياء؟', backAr: 'للأشخاص: أحدهم / لا أحد.' },
    { frontDe: 'etwas / nichts', hintAr: 'للأشخاص أم الأشياء؟', backAr: 'للأشياء: شيء ما / لا شيء.' },
    { frontDe: 'etwas Interessantes', hintAr: 'ما شكل الصفة هنا؟', backAr: 'حرف كبير + نهاية -es ثابتة.' },
  ],

  quiz: [
    {
      id: 'gr34-q1',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بصيغة man الصحيحة لفعل „können"',
      sentenceDe: 'Hier ___ man gut essen.',
      acceptedAnswers: ['kann'],
      explanationAr: '[[man]] + [[können]] → [[man kann]].',
    },
    {
      id: 'gr34-q2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الكلمة المناسبة: «لم أسمع شيئاً»',
      questionDe: 'Ich habe ___ gehört.',
      options: ['niemand', 'nichts', 'jemand', 'etwas nicht'],
      correctIndex: 1,
      explanationAr: '[[nichts]] = لا شيء.',
    },
    {
      id: 'gr34-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„man" wird wie „er/sie/es" konjugiert.',
      isTrue: true,
      explanationAr: 'صحيح.',
    },
    {
      id: 'gr34-q4',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق الضمير بمعناه',
      pairs: [
        { de: 'man', ar: 'المرء/الناس' },
        { de: 'jemand', ar: 'أحدهم' },
        { de: 'niemand', ar: 'لا أحد' },
        { de: 'etwas', ar: 'شيء ما' },
        { de: 'nichts', ar: 'لا شيء' },
      ],
      explanationAr: 'راجع الأقسام أعلاه إن أخطأت.',
    },
  ],

  cheatSheet: [
    { de: 'man spricht · man kann', ar: 'man يُصرَّف كـ er/sie/es.' },
    { de: 'jemand / niemand', ar: 'للأشخاص.' },
    { de: 'etwas / nichts', ar: 'للأشياء.' },
    { de: 'etwas Interessantes', ar: 'صفة بعد etwas/nichts: حرف كبير + -es.' },
    { de: 'alle · einige · manche · viele', ar: 'كمّيات غير محدَّدة مع أسماء جمع.' },
  ],
}

export default rule
