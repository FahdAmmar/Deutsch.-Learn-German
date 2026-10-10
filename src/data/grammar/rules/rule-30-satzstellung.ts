import type { GrammarRule } from '@/types'

/**
 * Rule 30 — Satzstellung: the harder subordinate-clause mechanics that
 * rules 28–29 deliberately deferred — Nebensatz-first inversion, the
 * two-verb cluster at the end (modal+infinitive, haben/sein+Partizip II),
 * and separable verbs staying joined. Builds directly on 28 (verb-final
 * rule), 11/12 (Satzklammer), and 17 (Perfekt).
 */
const rule: GrammarRule = {
  id: 'gr-30',
  number: 30,
  slug: '30-satzstellung',
  level: 'A2',
  termDe: 'Satzstellung',
  titleAr: 'ترتيب الكلمات في الجملة الثانوية',
  eyebrowAr: 'الدرس الرابع عشر في مستوى A2',
  taglineAr:
    'تعلّمتَ القاعدة الكبرى: الفعل ينتقل إلى آخر الجملة الثانوية. الآن سنتعامل مع **ثلاث حالات خاصة** تظهر كثيراً عملياً: ماذا يحدث حين تبدأ الجملة الثانوية الجملةَ كلّها؟ وماذا لو كان هناك فعلان في النهاية؟ وماذا عن الأفعال القابلة للانفصال؟',
  stats: [
    { value: '3', labelAr: 'حالات خاصة لترتيب الجملة الثانوية' },
    { value: '2', labelAr: 'فعلان يتجمّعان معاً في النهاية أحياناً' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Weil ich müde bin, gehe ich früh ins Bett.',
    ar: 'لأنني متعب، أذهب إلى الفراش باكراً.',
  },
  objectivesAr: [
    'تبني جملة تبدأ بجملة ثانوية، وتطبّق الانقلاب الصحيح على الجملة الرئيسية بعدها.',
    'ترتّب فعلين في نهاية الجملة الثانوية (فعل ناقص + مصدر، أو مساعد + Partizip II).',
    'تتعامل مع الأفعال القابلة للانفصال في الجملة الثانوية دون فصلها خطأً.',
  ],

  sections: [
    {
      id: 'nebensatz-first',
      navLabelAr: 'الثانوية أولاً',
      kickerDe: 'Nebensatz zuerst',
      titleAr: 'حين تبدأ الجملة الثانوية الجملةَ كاملة',
      titleDe: 'Nebensatz + Hauptsatz',
      tone: 'accent',
      introAr:
        'تذكّر قاعدة «الموضع الثاني» من الدرس ٠٤: الجملة الثانوية بأكملها تُحسب **عنصراً واحداً**، حتى لو كانت طويلة. فإذا بدأت بها الجملة، فإن فعل الجملة الرئيسية ينتقل مباشرة بعد الفاصلة — انقلاب كامل.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Weil ich müde bin', tone: 'accent', noteAr: 'الجملة الثانوية = العنصر الأول' },
            { text: ',' },
            { text: 'gehe', tone: 'plum', noteAr: 'فعل الرئيسية — الموضع الثاني' },
            { text: 'ich früh ins Bett.' },
          ],
        },
        {
          kind: 'compare',
          titleAr: 'نفس المعنى، ترتيبان',
          modes: [
            {
              labelAr: 'الرئيسية أولاً',
              captionAr: 'الترتيب المعتاد: رئيسية ثم ثانوية.',
              parts: [{ text: 'Ich gehe früh ins Bett,' }, { text: 'weil', tone: 'accent' }, { text: 'ich müde bin.' }],
            },
            {
              labelAr: 'الثانوية أولاً',
              captionAr: 'الثانوية = عنصر أول، فالفعل gehe ينتقل مباشرة بعد الفاصلة، والفاعل ich بعده.',
              parts: [{ text: 'Weil ich müde bin,' }, { text: 'gehe', tone: 'plum' }, { text: 'ich früh ins Bett.' }],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'لا تنسَ الفاصلة',
          bodyAr:
            'الفاصلة **إلزامية** بين الجملة الثانوية والرئيسية في الألمانية، في كلا الاتجاهين. وحين تبدأ الثانوية الجملةَ، الفاصلة هي التي تفصل العنصر الأول (الثانوية كاملة) عن فعل الرئيسية.',
        },
        {
          kind: 'examples',
          titleAr: 'أمثلة بأدوات مختلفة',
          tone: 'accent',
          items: [
            { badge: 'weil', de: 'Weil es regnet, bleibe ich zu Hause.', ar: 'لأنها تمطر، أبقى في البيت.' },
            { badge: 'wenn', de: 'Wenn ich Zeit habe, rufe ich dich an.', ar: 'إن كان لديّ وقت، سأتّصل بك.' },
            { badge: 'obwohl', de: 'Obwohl er müde war, ist er gekommen.', ar: 'رغم أنه كان متعباً، أتى.' },
            { badge: 'dass', de: 'Dass du kommst, freut mich sehr.', ar: 'كونك ستأتي، هذا يسعدني كثيراً.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: رتّب الجملة',
          exercises: [
            {
              id: 'gr30-p1-order1',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات لتبدأ بـ Weil',
              words: ['bin,', 'gehe', 'Weil ich krank', 'ich zum Arzt.'],
              correctOrder: [2, 0, 1, 3],
              explanationAr: '[[Weil ich krank bin, gehe ich zum Arzt.]] — الفعل [[gehe]] مباشرة بعد الفاصلة.',
            },
          ],
        },
      ],
    },

    {
      id: 'two-verbs',
      navLabelAr: 'فعلان في النهاية',
      kickerDe: 'Zwei Verben am Ende',
      titleAr: 'حين يجتمع فعلان في نهاية الجملة الثانوية',
      titleDe: 'Modalverb + Infinitiv · haben/sein + Partizip II',
      tone: 'plum',
      introAr:
        'في الجملة الرئيسية، الفعل الناقص أو المساعد في الموضع الثاني والفعل الآخر في النهاية (قوس الجملة). في الجملة الثانوية، **كلا الفعلين ينتقلان إلى النهاية معاً** — والفعل المصرَّف (الناقص أو المساعد) يأتي **أخيراً**، بعد الفعل الآخر.',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'من الرئيسية إلى الثانوية: الفعلان يتجمّعان',
          modes: [
            {
              labelAr: 'جملة رئيسية (فعل ناقص)',
              captionAr: 'قوس الجملة المعتاد: الناقص ثانياً، المصدر أخيراً.',
              parts: [{ text: 'Ich' }, { text: 'muss', tone: 'accent' }, { text: 'heute' }, { text: 'arbeiten.', tone: 'plum' }],
            },
            {
              labelAr: 'جملة ثانوية (نفس الفعلين)',
              captionAr: 'الفعلان معاً في النهاية؛ الفعل المصرَّف (muss) هو الأخير.',
              parts: [{ text: 'weil ich' }, { text: 'heute' }, { text: 'arbeiten', tone: 'plum' }, { text: 'muss.', tone: 'accent' }],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'star',
          titleAr: 'القاعدة: المصدر أولاً، ثم الفعل المصرَّف',
          bodyAr:
            'في النهاية، **المصدر أو Partizip II يأتي قبل الفعل المصرَّف مباشرة**: [[arbeiten muss]]، [[gelesen habe]]، [[kommen wird]]. هذا الترتيب هو عكس ما تتوقّعه، فانتبه له جيداً.',
        },
        {
          kind: 'examples',
          titleAr: 'مع Perfekt',
          tone: 'plum',
          items: [
            { badge: 'Perfekt', de: 'Ich weiß, dass er das Buch gelesen hat.', ar: 'أعلم أنه قرأ الكتاب.' },
            { badge: 'Perfekt', de: 'Sie sagt, dass sie nach Berlin gefahren ist.', ar: 'تقول إنها ذهبت إلى برلين.' },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'مع فعل ناقص',
          tone: 'plum',
          items: [
            { badge: 'Modalverb', de: 'Ich bleibe zu Hause, weil ich schlafen muss.', ar: 'أبقى في البيت لأنّني يجب أن أنام.' },
            { badge: 'Modalverb', de: 'Er sagt, dass er nicht kommen kann.', ar: 'يقول إنه لا يستطيع المجيء.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: رتّب الفعلين في النهاية',
          exercises: [
            {
              id: 'gr30-p2-order1',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات (Perfekt في جملة ثانوية)',
              words: ['dass', 'gelernt', 'Ich weiß,', 'hat.', 'du Deutsch'],
              correctOrder: [2, 0, 4, 1, 3],
              explanationAr: '[[Ich weiß, dass du Deutsch gelernt hat.]] ← ترتيب الفعلين: [[gelernt]] قبل [[hast]].',
            },
            {
              id: 'gr30-p2-order2',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات (فعل ناقص في جملة ثانوية)',
              words: ['muss.', 'weil ich', 'Ich bleibe hier,', 'arbeiten'],
              correctOrder: [2, 1, 3, 0],
              explanationAr: '[[Ich bleibe hier, weil ich arbeiten muss.]] — المصدر قبل الفعل الناقص.',
            },
          ],
        },
      ],
    },

    {
      id: 'trennbare-verben-nebensatz',
      navLabelAr: 'الأفعال المنفصلة',
      kickerDe: 'Trennbare Verben im Nebensatz',
      titleAr: 'الأفعال القابلة للانفصال: تبقى متّصلة',
      titleDe: 'aufstehen → … aufstehe',
      tone: 'highlight',
      introAr:
        'تذكّر من الدرس ١٢: الأفعال القابلة للانفصال تنفصل في الجملة الرئيسية فقط. في الجملة الثانوية، الفعل بأكمله **ينتقل كوحدة واحدة** إلى النهاية، بلا انفصال، تماماً كما يبقى متّصلاً بعد فعل ناقص.',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'من الانفصال إلى الاتّصال',
          modes: [
            {
              labelAr: 'جملة رئيسية (منفصل)',
              captionAr: 'البادئة auf تنفصل وتذهب للنهاية.',
              parts: [{ text: 'Ich' }, { text: 'stehe', tone: 'accent' }, { text: 'um sechs' }, { text: 'auf.', tone: 'plum' }],
            },
            {
              labelAr: 'جملة ثانوية (متّصل)',
              captionAr: 'الفعل aufstehe ينتقل كاملاً وكوحدة واحدة.',
              parts: [{ text: 'weil ich' }, { text: 'um sechs' }, { text: 'aufstehe', tone: 'accent' }, { text: 'muss.', tone: 'plum' }],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'أفعال منفصلة في جمل ثانوية',
          tone: 'highlight',
          items: [
            { badge: 'aufstehen', de: 'Ich bin müde, weil ich früh aufstehe.', ar: 'أنا متعب لأنّني أستيقظ باكراً.' },
            { badge: 'einkaufen', de: 'Sie sagt, dass sie heute einkauft.', ar: 'تقول إنها تتسوّق اليوم.' },
            { badge: 'anrufen', de: 'Ich weiß nicht, ob er mich anruft.', ar: 'لا أعلم إن كان سيتّصل بي.' },
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
      introAr: 'أشهر خطأين: نسيان الانقلاب بعد جملة ثانوية أولى، وقلب ترتيب الفعلين في النهاية.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Weil ich müde bin, ich gehe ins Bett.',
              correct: 'Weil ich müde bin, gehe ich ins Bett.',
              explanationAr: 'الجملة الثانوية عنصر أول، فيجب أن يتبعها فعل الرئيسية مباشرة، ثم الفاعل.',
            },
            {
              wrong: '…, weil ich muss arbeiten.',
              correct: '…, weil ich arbeiten muss.',
              explanationAr: 'المصدر يأتي قبل الفعل الناقص في نهاية الجملة الثانوية.',
            },
            {
              wrong: 'Ich weiß, dass er hat das Buch gelesen.',
              correct: 'Ich weiß, dass er das Buch gelesen hat.',
              explanationAr: 'الفعل المساعد [[hat]] يأتي أخيراً، بعد [[Partizip II]].',
            },
            {
              wrong: '…, weil ich stehe früh auf.',
              correct: '…, weil ich früh aufstehe.',
              explanationAr: 'الفعل القابل للانفصال يبقى كلمة واحدة في الجملة الثانوية.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'Weil ich müde bin, gehe ich …', hintAr: 'ما القاعدة؟', backAr: 'الجملة الثانوية = عنصر أول، فيتبعها فعل الرئيسية مباشرة.' },
    { frontDe: '… arbeiten muss.', hintAr: 'أيّ فعل أخيراً؟', backAr: 'الفعل المصرَّف (الناقص/المساعد) يأتي أخيراً، بعد المصدر أو Partizip II.' },
    { frontDe: '…, weil ich früh aufstehe.', hintAr: 'هل ينفصل الفعل؟', backAr: 'لا — يبقى كلمة واحدة في الجملة الثانوية.' },
  ],

  quiz: [
    {
      id: 'gr30-q1',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['bin,', 'Weil ich krank', 'ich zu Hause.', 'bleibe'],
      correctOrder: [1, 0, 3, 2],
      explanationAr: '[[Weil ich krank bin, bleibe ich zu Hause.]]',
    },
    {
      id: 'gr30-q2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'أيّ جملة صحيحة؟',
      questionDe: '',
      options: [
        'Ich weiß, dass er kommen kann.',
        'Ich weiß, dass er kann kommen.',
        'Ich weiß, dass kann er kommen.',
        'Ich weiß, er dass kommen kann.',
      ],
      correctIndex: 0,
      explanationAr: 'المصدر [[kommen]] قبل الفعل الناقص [[kann]] في النهاية.',
    },
    {
      id: 'gr30-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Trennbare Verben trennen sich auch im Nebensatz: …, weil ich stehe auf.',
      isTrue: false,
      explanationAr: 'خطأ: تبقى متّصلة: [[…, weil ich aufstehe.]]',
    },
    {
      id: 'gr30-q4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'رتّب بكتابة الفعل الناقص في مكانه (أكمل الجملة)',
      sentenceDe: 'Ich bin froh, dass du mir helfen ___.',
      acceptedAnswers: ['kannst'],
      hint: 'الفعل الناقص أخيراً',
      explanationAr: '[[helfen kannst]] — المصدر ثم الناقص.',
    },
  ],

  cheatSheet: [
    { de: 'Nebensatz, Verb + Subjekt …', ar: 'حين تبدأ الثانوية الجملة، فعل الرئيسية يتبعها مباشرة.' },
    { de: '… arbeiten muss. / … gelesen hat.', ar: 'المصدر أو Partizip II قبل الفعل المصرَّف في النهاية.' },
    { de: '…, weil ich aufstehe.', ar: 'الأفعال المنفصلة تبقى متّصلة في الجملة الثانوية.' },
  ],
}

export default rule
