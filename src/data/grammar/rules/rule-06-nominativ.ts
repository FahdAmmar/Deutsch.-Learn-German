import type { GrammarRule } from '@/types'

/**
 * Rule 06 — Nominativ, the first grammatical case. Scope stays narrow on
 * purpose: only der/die/das/die (definite articles) in the subject role,
 * plus the predicate-nominative use after `sein`. Indefinite articles
 * (ein/eine) are rule 07; Akkusativ is rule 09 — no `den`/`einen` appears
 * anywhere in this file.
 */
const rule: GrammarRule = {
  id: 'gr-06',
  number: 6,
  slug: '06-nominativ',
  level: 'A1',
  termDe: 'Nominativ',
  titleAr: 'حالة الفاعل',
  eyebrowAr: 'الدرس السادس في خارطة القواعد',
  taglineAr:
    'الألمانية، خلافاً للعربية والإنجليزية، تُعلِّم دور الكلمة في الجملة من خلال **شكلها** لا موضعها فقط — وهذا ما يُسمّى [[Kasus]] (الحالة الإعرابية). [[Nominativ]] هي أول هذه الحالات الأربع وأبسطها: حالة **الفاعل**.',
  stats: [
    { value: '4', labelAr: 'حالات إعرابية في الألمانية' },
    { value: '1', labelAr: 'الحالة التي نتعلّمها الآن' },
    { value: '30+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Der Lehrer ist müde. Er ist ein guter Lehrer.',
    ar: 'المعلّم متعب. هو معلّم جيّد.',
  },
  objectivesAr: [
    'تفهم لماذا تحتاج الألمانية «حالات إعرابية» أصلاً.',
    'تحدّد فاعل الجملة بطرح سؤال [[Wer?]] أو [[Was?]].',
    'تستخدم أدوات التعريف [[der]]/[[die]]/[[das]]/[[die]] بشكل صحيح مع الفاعل.',
    'تتعرّف على الاستخدام الثاني لـ [[Nominativ]]: الاسم الخبر بعد [[sein]].',
  ],

  sections: [
    {
      id: 'why-cases',
      navLabelAr: 'لماذا الحالات؟',
      kickerDe: 'Warum Kasus?',
      titleAr: 'لماذا تحتاج الألمانية حالات أصلاً؟',
      titleDe: 'Kasus',
      tone: 'accent',
      introAr:
        'في العربية والإنجليزية، **ترتيب الكلمات** غالباً ما يخبرنا من الفاعل ومن المفعول به. الألمانية تفعل شيئاً إضافياً: **شكل الأداة والاسم نفسه يتغيّر** حسب دور الكلمة، بغضّ النظر عن موضعها في الجملة.',
      blocks: [
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'مثال يوضّح الفكرة',
          bodyAr:
            'في [[Der Mann sieht den Hund.]] (الرجل يرى الكلب)، لو بدّلنا الترتيب إلى [[Den Hund sieht der Mann.]] يبقى المعنى نفسه: **الرجل هو الفاعل دائماً** لأن شكله [[der Mann]]، والكلب هو المفعول به دائماً لأن شكله [[den Hund]] — بغضّ النظر عمّن يأتي أولاً في الجملة. (لا تقلق بشأن [[den]] الآن؛ سنتعلّمها في [[Akkusativ]]، الدرس ٠٩ — المهم الآن أن تفهم *لماذا* يتغيّر شكل الأداة أصلاً.)',
        },
        {
          kind: 'formula',
          tags: [
            { text: 'Nominativ', tone: 'accent', noteAr: 'الفاعل: Wer? / Was?' },
            { text: 'Akkusativ', noteAr: 'المفعول به المباشر (الدرس ٠٩)' },
            { text: 'Dativ', noteAr: 'المفعول به غير المباشر (الدرس ١٥)' },
            { text: 'Genitiv', noteAr: 'الإضافة (الدرس ٣٣)' },
          ],
        },
      ],
    },

    {
      id: 'subject',
      navLabelAr: 'الفاعل',
      kickerDe: 'Das Subjekt',
      titleAr: 'Nominativ = حالة الفاعل',
      titleDe: 'Wer? / Was?',
      tone: 'primary',
      introAr:
        'لتحديد فاعل أيّ جملة ألمانية، اطرح السؤال [[Wer?]] (من؟) إن كان الفاعل شخصاً، أو [[Was?]] (ماذا؟) إن كان شيئاً. الكلمة التي تجيب عن هذا السؤال هي الفاعل، وتكون دائماً في [[Nominativ]].',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أدوات التعريف في Nominativ (كما تعرفها من der/die/das)',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'الأداة', lang: 'de', tone: 'accent' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['مذكّر', 'der', 'der Mann'],
            ['مؤنّث', 'die', 'die Frau'],
            ['محايد', 'das', 'das Kind'],
            ['جمع (كل الأجناس)', 'die', 'die Kinder'],
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Der Mann', role: 'Nominativ — الفاعل' },
            { text: 'arbeitet', role: 'الفعل' },
            { text: 'heute.', role: 'ظرف' },
          ],
          ar: 'الرجل يعمل اليوم.',
        },
        {
          kind: 'examples',
          titleAr: 'حدّد الفاعل بسؤال Wer/Was',
          tone: 'accent',
          items: [
            { badge: 'Wer?', de: '**Die Frau** kocht.', ar: 'المرأة تطبخ.' },
            { badge: 'Wer?', de: '**Der Student** lernt Deutsch.', ar: 'الطالب يتعلّم الألمانية.' },
            { badge: 'Was?', de: '**Das Auto** ist neu.', ar: 'السيارة جديدة.' },
            { badge: 'Was?', de: '**Die Kinder** spielen im Garten.', ar: 'الأطفال يلعبون في الحديقة.' },
          ],
        },
      ],
    },

    {
      id: 'predicate-nominative',
      navLabelAr: 'الاسم الخبر',
      kickerDe: 'Prädikatsnomen',
      titleAr: 'استخدام ثانٍ: الاسم بعد sein',
      titleDe: 'sein + Nominativ',
      tone: 'plum',
      introAr:
        'بعد الفعل [[sein]] (وكذلك [[heißen]] و[[werden]] لاحقاً)، الاسم الذي يصف الفاعل يبقى في [[Nominativ]] أيضاً — وليس في حالة أخرى، رغم أنه يأتي بعد الفعل.',
      blocks: [
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'star',
          titleAr: 'القاعدة',
          bodyAr:
            '[[sein]] لا يربط بفاعل ومفعول به، بل **يساوي بين شيئين**: [[Er ist der Lehrer.]] (هو = المعلّم). ولهذا يبقى [[der Lehrer]] في [[Nominativ]] بدل أن يتحوّل إلى [[den Lehrer]] كما قد نتوقّع من موضعه بعد الفعل.',
        },
        {
          kind: 'examples',
          titleAr: 'فاعل + اسم خبر — كلاهما Nominativ',
          tone: 'plum',
          items: [
            { badge: 'sein', de: 'Das ist **der Lehrer**.', ar: 'هذا هو المعلّم.' },
            { badge: 'sein', de: 'Sie ist **die Ärztin**.', ar: 'هي الطبيبة.' },
            { badge: 'sein', de: 'Das ist **das Problem**.', ar: 'هذه هي المشكلة.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بالأداة الصحيحة',
          exercises: [
            {
              id: 'gr06-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'اكتب أداة التعريف المناسبة (der Tisch)',
              sentenceDe: '___ Tisch ist braun.',
              acceptedAnswers: ['Der', 'der'],
              hint: 'der Tisch — مذكّر',
              explanationAr: 'الفاعل مذكّر: [[der Tisch]].',
            },
            {
              id: 'gr06-p1-fill2',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'اكتب أداة التعريف المناسبة (die Tür)',
              sentenceDe: '___ Tür ist offen.',
              acceptedAnswers: ['Die', 'die'],
              hint: 'die Tür — مؤنّث',
              explanationAr: 'الفاعل مؤنّث: [[die Tür]].',
            },
            {
              id: 'gr06-p1-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'ما فاعل هذه الجملة؟ Die Kinder essen einen Apfel.',
              questionDe: '',
              options: ['Die Kinder', 'essen', 'einen Apfel', 'لا فاعل'],
              correctIndex: 0,
              explanationAr: '[[Die Kinder]] تجيب عن سؤال [[Wer?]]، فهي الفاعل.',
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
      introAr: 'أغلب الأخطاء هنا مصدرها إسقاط الأداة أو الخلط بين جنس الاسم.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Mann arbeitet heute.',
              correct: 'Der Mann arbeitet heute.',
              explanationAr: 'أداة التعريف إلزامية في الألمانية؛ لا تُحذف كما في بعض التراكيب العربية.',
            },
            {
              wrong: 'Der Frau kocht.',
              correct: 'Die Frau kocht.',
              explanationAr: '[[Frau]] مؤنّثة، فأداتها [[die]] وليس [[der]].',
            },
            {
              wrong: 'Er ist den Lehrer.',
              correct: 'Er ist der Lehrer.',
              explanationAr: 'بعد [[sein]] يبقى الاسم في [[Nominativ]]؛ لا داعي لتحويله كما لو كان مفعولاً به.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'Wer? / Was?', hintAr: 'ما وظيفة هذين السؤالين؟', backAr: 'يحدّدان فاعل الجملة، وهو دائماً في Nominativ.' },
    { frontDe: 'der / die / das / die', hintAr: 'ما هذه الأشكال؟', backAr: 'أدوات التعريف في Nominativ: مذكّر، مؤنّث، محايد، جمع.' },
    {
      frontDe: 'Er ist der Lehrer.',
      hintAr: 'لماذا der وليس den؟',
      backAr: 'بعد sein يبقى الاسم في Nominativ (اسم خبر)، لا يتحوّل إلى حالة أخرى.',
    },
  ],

  quiz: [
    {
      id: 'gr06-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'ما فاعل الجملة؟ Das Kind spielt im Park.',
      questionDe: '',
      options: ['Das Kind', 'spielt', 'im Park', 'لا يوجد'],
      correctIndex: 0,
      explanationAr: '[[Das Kind]] تجيب عن [[Was?]]، فهي الفاعل.',
    },
    {
      id: 'gr06-q2',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بأداة Nominativ الصحيحة (das Auto)',
      sentenceDe: '___ Auto ist neu.',
      acceptedAnswers: ['Das', 'das'],
      explanationAr: '[[das Auto]] محايد.',
    },
    {
      id: 'gr06-q3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Nach „sein" bleibt das Nomen im Nominativ: Sie ist die Ärztin.',
      isTrue: true,
      explanationAr: 'صحيح: الاسم بعد [[sein]] يبقى في [[Nominativ]].',
    },
    {
      id: 'gr06-q4',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الاسم بجنسه وأداته',
      pairs: [
        { de: 'Mann', ar: 'مذكّر — der' },
        { de: 'Frau', ar: 'مؤنّث — die' },
        { de: 'Kind', ar: 'محايد — das' },
        { de: 'Kinder', ar: 'جمع — die' },
      ],
      explanationAr: 'راجع جدول أدوات Nominativ أعلاه إن أخطأت.',
    },
    {
      id: 'gr06-q5',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['ist', 'müde.', 'Der Lehrer'],
      correctOrder: [2, 0, 1],
      explanationAr: '[[Der Lehrer ist müde.]] — الفاعل، ثم الفعل، ثم الصفة.',
    },
  ],

  cheatSheet: [
    { de: 'Wer? / Was?', ar: 'أسئلة تحديد الفاعل — Nominativ.' },
    { de: 'der · die · das · die', ar: 'أدوات التعريف في Nominativ (مذكّر، مؤنّث، محايد، جمع).' },
    { de: 'Er ist der Lehrer.', ar: 'بعد sein يبقى الاسم في Nominativ.' },
  ],
}

export default rule
