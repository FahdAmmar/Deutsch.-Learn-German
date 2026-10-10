import type { GrammarRule } from '@/types'

/**
 * Rule 27 — coordinating conjunctions (und, oder, aber, denn, sondern).
 * These do NOT move the verb — deliberately contrasted with rule 28
 * (Nebensätze), where subordinating conjunctions send the verb to the
 * very end. This rule is the calm "before" picture for that contrast.
 */
const rule: GrammarRule = {
  id: 'gr-27',
  number: 27,
  slug: '27-konjunktionen',
  level: 'A2',
  termDe: 'Konjunktionen',
  titleAr: 'أدوات الربط',
  eyebrowAr: 'الدرس الحادي عشر في مستوى A2',
  taglineAr:
    'أدوات الربط البسيطة ([[und]]، [[oder]]، [[aber]]، [[denn]]، [[sondern]]) تصل بين جملتين تامّتين **دون أن تغيّر ترتيب أيٍّ منهما**. الفعل يبقى في موضعه الثاني المعتاد في كل جملة — وهذا ما يميّزها عن أدوات الربط التي ستقابلها في الدرس القادم.',
  stats: [
    { value: '5', labelAr: 'أدوات ربط أساسية' },
    { value: '0', labelAr: 'تأثير على ترتيب الفعل' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich möchte Tee, aber meine Schwester möchte Kaffee.',
    ar: 'أريد شاياً، لكن أختي تريد قهوة.',
  },
  objectivesAr: [
    'تربط بين جملتين تامّتين بأدوات الربط الخمس الأساسية.',
    'تفهم أن هذه الأدوات لا تغيّر ترتيب الفعل في أيّ من الجملتين.',
    'تفرّق بين [[aber]] (لكن، تناقض عام) و[[sondern]] (بل، تصحيح بعد نفي).',
  ],

  sections: [
    {
      id: 'overview',
      navLabelAr: 'نظرة عامة',
      kickerDe: 'Überblick',
      titleAr: 'جملتان، فعلان في موضعهما',
      titleDe: 'Position 0',
      tone: 'accent',
      introAr:
        'أدوات الربط هذه تُسمّى أحياناً «في الموضع صفر» لأنها **لا تُحسب** ضمن ترتيب الجملة: الجملة التي تليها تبدأ عدّها من جديد، والفعل فيها يبقى في موضعه الثاني الطبيعي.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Satz 1' },
            { text: 'und/oder/aber/denn/sondern', tone: 'accent', noteAr: 'الموضع صفر — لا يُحسب' },
            { text: 'Satz 2', noteAr: 'يبدأ ترتيبها من جديد' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich lerne Deutsch,', role: 'جملة ١ كاملة' },
            { text: 'aber', role: 'أداة ربط (لا تُحسب)' },
            { text: 'er lernt Englisch.', role: 'جملة ٢ — فعلها في موضعه الثاني' },
          ],
          ar: 'أتعلّم الألمانية، لكنه يتعلّم الإنجليزية.',
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'لماذا هذا مهمّ؟',
          bodyAr:
            'في الدرس القادم ستتعلّم أدوات ربط من نوع مختلف تماماً ([[weil]]، [[dass]]…) تُرسل الفعل إلى **آخر الجملة**. احفظ هذا الفرق جيداً: أدوات هذا الدرس بريئة تماماً ولا تغيّر شيئاً في ترتيب أيّ جملة.',
        },
      ],
    },

    {
      id: 'the-five',
      navLabelAr: 'الأدوات الخمس',
      kickerDe: 'Die fünf Konjunktionen',
      titleAr: 'und · oder · aber · denn · sondern',
      titleDe: 'Konjunktionen',
      tone: 'plum',
      introAr: 'كل أداة من هذه الأدوات الخمس لها معنى ووظيفة واضحة — تعرّف عليها واحدة واحدة.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الأدوات الخمس',
          columns: [
            { header: 'الأداة', lang: 'de', tone: 'plum' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['und', 'و (إضافة)', 'Ich koche, und du deckst den Tisch.'],
            ['oder', 'أو (اختيار)', 'Möchtest du Tee, oder trinkst du Kaffee?'],
            ['aber', 'لكن (تناقض عام)', 'Ich bin müde, aber ich muss arbeiten.'],
            ['denn', 'لأنّ (سبب)', 'Ich bleibe zu Hause, denn ich bin krank.'],
            ['sondern', 'بل (تصحيح بعد نفي)', 'Ich trinke keinen Tee, sondern Kaffee.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'aber أم sondern؟',
          bodyAr:
            '[[aber]] تناقض عام يصلح في كل سياق. أمّا [[sondern]] فتُستخدم **فقط** بعد جملة منفية، لتصحيح معلومة خاطئة بمعلومة صحيحة بديلة: [[Ich trinke keinen Tee, sondern Kaffee.]] (لا أشرب شاياً، بل قهوة) — لا يصحّ هنا استخدام [[aber]].',
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'denn مقابل weil: نفس المعنى، ترتيب مختلف',
          bodyAr:
            '[[denn]] (هذا الدرس) و[[weil]] (الدرس القادم) يعنيان كلاهما «لأنّ»، لكن [[denn]] لا تغيّر ترتيب الفعل بينما [[weil]] ترسله إلى آخر الجملة. قارن: [[…, denn ich bin krank.]] مقابل [[…, weil ich krank bin.]]',
        },
        {
          kind: 'examples',
          titleAr: 'الأدوات الخمس في جمل متنوّعة',
          tone: 'plum',
          items: [
            { badge: 'und', de: 'Er wohnt in Berlin, und sie wohnt in München.', ar: 'هو يسكن في برلين، وهي تسكن في ميونخ.' },
            { badge: 'oder', de: 'Gehen wir ins Kino, oder bleiben wir zu Hause?', ar: 'هل نذهب إلى السينما أم نبقى في البيت؟' },
            { badge: 'aber', de: 'Das Hotel ist teuer, aber es ist sehr schön.', ar: 'الفندق غالٍ، لكنه جميل جدّاً.' },
            { badge: 'denn', de: 'Ich kann nicht kommen, denn ich habe keine Zeit.', ar: 'لا أستطيع الحضور، لأنني لا أملك وقتاً.' },
            { badge: 'sondern', de: 'Das ist nicht mein Buch, sondern deins.', ar: 'هذا ليس كتابي، بل كتابك.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: اختر أداة الربط المناسبة',
          exercises: [
            {
              id: 'gr27-p1-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الأداة المناسبة',
              questionDe: 'Ich mag keinen Fisch, ___ Fleisch.',
              options: ['aber', 'sondern', 'denn', 'oder'],
              correctIndex: 1,
              explanationAr: 'تصحيح بعد نفي → [[sondern]].',
            },
            {
              id: 'gr27-p1-mc2',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الأداة المناسبة',
              questionDe: 'Ich bin müde, ___ ich gehe trotzdem joggen.',
              options: ['sondern', 'denn', 'aber', 'und'],
              correctIndex: 2,
              explanationAr: 'تناقض عام (بلا نفي سابق) → [[aber]].',
            },
            {
              id: 'gr27-p1-order1',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات',
              words: ['krank.', 'bin', 'bleibe', 'denn', 'ich', 'zu Hause,', 'Ich'],
              correctOrder: [6, 2, 5, 3, 4, 1, 0],
              explanationAr: '[[Ich bleibe zu Hause, denn ich bin krank.]] — الفعل [[bin]] في موضعه الثاني الطبيعي بعد [[denn]].',
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
      introAr: 'أشهر خطأين: الخلط بين aber وsondern، وتحريك الفعل خطأً بعد denn (بتأثير من weil).',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich trinke keinen Tee, aber Kaffee.',
              correct: 'Ich trinke keinen Tee, sondern Kaffee.',
              explanationAr: 'بعد نفي + تصحيح مباشر → [[sondern]]، وليس [[aber]].',
            },
            {
              wrong: 'Ich bleibe zu Hause, denn ich bin krank sein.',
              correct: 'Ich bleibe zu Hause, denn ich bin krank.',
              explanationAr: '[[denn]] لا تغيّر ترتيب الفعل؛ الجملة بعدها جملة رئيسية عادية بفعل واحد مصرَّف.',
            },
            {
              wrong: 'Ich mag Tee, sondern auch Kaffee.',
              correct: 'Ich mag Tee, und ich mag auch Kaffee.',
              explanationAr: '[[sondern]] تحتاج نفياً سابقاً لتصحّحه؛ للإضافة البسيطة استخدم [[und]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'und · oder · aber · denn · sondern', hintAr: 'ما تأثيرها على ترتيب الفعل؟', backAr: 'لا تأثير — الفعل يبقى في موضعه الثاني الطبيعي في كلتا الجملتين.' },
    { frontDe: 'aber', hintAr: 'متى تُستخدم؟', backAr: 'تناقض عام، في أيّ سياق.' },
    { frontDe: 'sondern', hintAr: 'متى تُستخدم؟', backAr: 'فقط بعد نفي، لتصحيح معلومة ببديل صحيح.' },
    { frontDe: 'denn', hintAr: 'ماذا تعني؟', backAr: 'لأنّ — لكن بلا تغيير في ترتيب الفعل (خلافاً لـ weil).' },
  ],

  quiz: [
    {
      id: 'gr27-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة المناسبة',
      questionDe: 'Er kommt nicht zur Party, ___ er ist krank.',
      options: ['sondern', 'denn', 'aber', 'oder'],
      correctIndex: 1,
      explanationAr: 'سبب → [[denn]].',
    },
    {
      id: 'gr27-q2',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Nach „aber" bleibt das Verb an Position 2.',
      isTrue: true,
      explanationAr: 'صحيح: [[aber]] لا تغيّر ترتيب الفعل.',
    },
    {
      id: 'gr27-q3',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بالأداة المناسبة',
      sentenceDe: 'Das ist kein Tee, ___ Kaffee.',
      acceptedAnswers: ['sondern'],
      explanationAr: 'تصحيح بعد نفي → [[sondern]].',
    },
    {
      id: 'gr27-q4',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق أداة الربط بمعناها',
      pairs: [
        { de: 'und', ar: 'و' },
        { de: 'oder', ar: 'أو' },
        { de: 'denn', ar: 'لأنّ' },
        { de: 'sondern', ar: 'بل' },
      ],
      explanationAr: 'راجع جدول الأدوات الخمس أعلاه إن أخطأت.',
    },
  ],

  cheatSheet: [
    { de: 'und · oder · aber · denn · sondern', ar: 'الأدوات الخمس الأساسية.' },
    { de: 'Position 0', ar: 'لا تؤثّر على ترتيب الفعل في أيّ جملة.' },
    { de: 'aber = تناقض عام', ar: 'sondern = تصحيح بعد نفي فقط.' },
    { de: 'denn = weil (بلا تغيير ترتيب)', ar: 'نفس المعنى، لكن weil ترسل الفعل للنهاية.' },
  ],
}

export default rule
