import type { GrammarRule } from '@/types'

/**
 * Rule 02 — sein / haben.
 *
 * Scope note: only the Präsens forms of these two verbs, and their two
 * core uses (sein = identity/state/location; haben = possession + fixed
 * expressions). Perfekt with sein/haben as auxiliaries is rule 17;
 * Präteritum of sein/haben is rule 18. Word order beyond simple SVO is
 * rule 04; question word order is rule 05.
 */
const rule: GrammarRule = {
  id: 'gr-02',
  number: 2,
  slug: '02-sein-haben',
  level: 'A1',
  termDe: 'sein / haben',
  titleAr: 'الفعلان الأساسيان',
  eyebrowAr: 'الدرس الثاني في خارطة القواعد',
  taglineAr:
    '[[sein]] (يكون) و[[haben]] (يملك) هما أكثر فعلين استخداماً في الألمانية. لا تصريف منتظم لهما — يجب حفظهما عن ظهر قلب من اليوم الأول، لأنهما يدخلان في كل حديث عن نفسك وعن الآخرين: من أنت، من أين أنت، كم عمرك، وماذا تملك.',
  stats: [
    { value: '2', labelAr: 'فعلان لا غنى عنهما' },
    { value: '0', labelAr: 'قواعد تصريف منتظمة — احفظهما فقط' },
    { value: '40+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich bin Sara und ich habe zwei Brüder.',
    ar: 'أنا سارة ولدي أخوان.',
  },
  objectivesAr: [
    'تحفظ تصريف [[sein]] و[[haben]] مع الضمائر التسعة كلها.',
    'تستخدم [[sein]] للهوية والصفة والمكان: من أنت، كيف حالك، أين أنت.',
    'تستخدم [[haben]] للامتلاك وللعبارات الثابتة مثل الجوع والعطش والعمر.',
    'تميّز متى يُستخدم [[sein]] ومتى يُستخدم [[haben]] في العبارات التي قد تلتبس (العمر، الجوع، الاسم).',
    'تكوّن سؤالاً بسيطاً بـ [[sein]] أو [[haben]] وتجيب عنه.',
  ],

  sections: [
    {
      id: 'overview',
      navLabelAr: 'نظرة عامة',
      kickerDe: 'Überblick',
      titleAr: 'لماذا يأتيان أولاً؟',
      titleDe: 'sein & haben',
      tone: 'accent',
      introAr:
        'كل جملة عن نفسك تقريباً تحتاج إلى [[sein]] أو [[haben]]: «أنا…»، «لدي…». وكلاهما **شاذّ تماماً** — لا تنطبق عليهما قاعدة الحذف والإضافة العادية ([[Präsens]]، الدرس القادم)، لذلك يجب حفظهما بمفردهما قبل أي شيء آخر.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Subjekt', tone: 'accent', noteAr: 'الفاعل' },
            { text: 'sein / haben', tone: 'primary', noteAr: 'مصرّف حسب الفاعل' },
            { text: '… (باقي الجملة)' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'bin', role: 'sein' },
            { text: 'Lehrerin.', role: 'الخبر' },
          ],
          ar: 'أنا معلّمة.',
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'الفرق الأساسي بين الاثنين',
          bodyAr:
            '[[sein]] يصف **من أنت أو كيف حالك** (اسم، مهنة، صفة، مكان): [[Ich bin müde.]] أمّا [[haben]] فيصف **ما تملكه أو ما لديك** (شيء، أو شعور في عبارات ثابتة): [[Ich habe ein Buch.]] الخلط بينهما من أكثر الأخطاء شيوعاً عند الناطقين بالعربية لأن كلا الفعلين يترجمان أحياناً بما يشبه «لدي» أو «عندي».',
        },
        {
          kind: 'examples',
          titleAr: 'sein و haben جنباً إلى جنب',
          tone: 'accent',
          items: [
            { badge: 'sein', de: 'Ich **bin** Ali.', ar: 'أنا علي.' },
            { badge: 'haben', de: 'Ich **habe** einen Bruder.', ar: 'لديّ أخ.' },
            { badge: 'sein', de: 'Du **bist** freundlich.', ar: 'أنتَ لطيف.' },
            { badge: 'haben', de: 'Du **hast** ein Auto.', ar: 'لديك سيارة.' },
            { badge: 'sein', de: 'Wir **sind** in Berlin.', ar: 'نحن في برلين.' },
            { badge: 'haben', de: 'Wir **haben** Zeit.', ar: 'لدينا وقت.' },
          ],
        },
      ],
    },

    {
      id: 'forms',
      navLabelAr: 'التصريف الكامل',
      kickerDe: 'Die Formen',
      titleAr: 'التصريف الكامل',
      titleDe: 'Präsens',
      tone: 'primary',
      introAr:
        'لا توجد طريقة لاشتقاق هذه الأشكال من قاعدة — **احفظها كوحدة واحدة** مع الضمائر التي تعلّمتها في الدرس السابق.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'تصريف sein و haben',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'sein · يكون', lang: 'de', tone: 'accent' },
            { header: 'haben · يملك', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['ich', 'bin', 'habe'],
            ['du', 'bist', 'hast'],
            ['er, sie, es', 'ist', 'hat'],
            ['wir', 'sind', 'haben'],
            ['ihr', 'seid', 'habt'],
            ['sie', 'sind', 'haben'],
            ['Sie', 'sind', 'haben'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'alert',
          titleAr: 'أكثر شكلين يُخلط بينهما: hat و hast',
          bodyAr:
            '[[hat]] (هو/هي يملك) و[[hast]] (أنتَ تملك) يتشابهان كتابةً. ولاحظ أيضاً [[ist]] و[[bist]] — الفرق بينهما دائماً حرف واحد في النهاية: **-t** للغائب، **-st** للمخاطَب.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل التصريف',
          exercises: [
            {
              id: 'gr02-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'اكتب الشكل الصحيح من sein',
              sentenceDe: 'Wir ___ Studenten.',
              acceptedAnswers: ['sind'],
              hint: 'wir → ؟',
              explanationAr: 'مع [[wir]] الشكل هو [[sind]].',
            },
            {
              id: 'gr02-p1-fill2',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'اكتب الشكل الصحيح من haben',
              sentenceDe: 'Ihr ___ ein Auto.',
              acceptedAnswers: ['habt'],
              hint: 'ihr → ؟',
              explanationAr: 'مع [[ihr]] الشكل هو [[habt]].',
            },
            {
              id: 'gr02-p1-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'اختر الشكل الصحيح',
              questionDe: 'Er ___ müde.',
              options: ['bin', 'bist', 'ist', 'sind'],
              correctIndex: 2,
              explanationAr: 'مع [[er]] الشكل هو [[ist]].',
            },
          ],
        },
      ],
    },

    {
      id: 'sein-uses',
      navLabelAr: 'استخدامات sein',
      kickerDe: 'sein — Identität & Zustand',
      titleAr: 'متى نستخدم sein؟',
      titleDe: 'sein',
      tone: 'accent',
      introAr:
        '[[sein]] يربط الفاعل بصفة أو اسم أو مكان — تماماً كما تفعل «هو / أنا» في الجملة الاسمية بالعربية، لكنه **لا يُحذف** في الألمانية.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'استخدامات sein الأربعة',
          columns: [
            { header: 'الاستخدام', lang: 'ar' },
            { header: 'مثال', lang: 'de', tone: 'accent' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['الاسم', 'Ich bin Sara.', 'أنا سارة.'],
            ['المهنة/الجنسية', 'Er ist Arzt.', 'هو طبيب.'],
            ['الصفة/الحالة', 'Wir sind müde.', 'نحن متعبون.'],
            ['المكان', 'Sie sind in Berlin.', 'هم في برلين.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'العمر: sein وليس haben!',
          bodyAr:
            'خلافاً للعربية («عندي عشرون عاماً») والإنجليزية (I **have** 20 years)، الألمانية تستخدم [[sein]] للعمر: [[Ich bin zwanzig Jahre alt.]] وليس [[Ich habe zwanzig Jahre]]. احفظ هذه الجملة كوحدة واحدة؛ إنها من أكثر الأخطاء شيوعاً عند المتعلّمين الجدد.',
        },
        {
          kind: 'examples',
          titleAr: 'sein في التعريف بالنفس',
          tone: 'accent',
          items: [
            { badge: 'الاسم', de: 'Ich **bin** Omar.', ar: 'أنا عمر.' },
            { badge: 'العمر', de: 'Ich **bin** 25 Jahre alt.', ar: 'عمري خمسة وعشرون عاماً.' },
            { badge: 'الجنسية', de: 'Wir **sind** Syrer.', ar: 'نحن سوريّون.' },
            { badge: 'المهنة', de: 'Sind Sie Ingenieurin?', ar: 'هل حضرتك مهندسة؟' },
            { badge: 'الحالة', de: 'Das Kind **ist** krank.', ar: 'الطفل مريض.' },
            { badge: 'المكان', de: 'Wo **bist** du gerade?', ar: 'أين أنتَ الآن؟' },
          ],
        },
      ],
    },

    {
      id: 'haben-uses',
      navLabelAr: 'استخدامات haben',
      kickerDe: 'haben — Besitz & feste Ausdrücke',
      titleAr: 'متى نستخدم haben؟',
      titleDe: 'haben',
      tone: 'plum',
      introAr:
        '[[haben]] يعني «يملك»، لكنه يدخل أيضاً في مجموعة من **العبارات الثابتة** التي لا علاقة لها بالملكية الحرفية — هذه العبارات يجب حفظها كما هي.',
      blocks: [
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'ملكية حقيقية',
              subAr: 'شيء تملكه فعلاً',
              tone: 'plum',
              items: [
                { de: 'Ich habe ein Auto.', ar: 'لديّ سيارة.' },
                { de: 'Ich habe zwei Kinder.', ar: 'لديّ طفلان.' },
                { de: 'Wir haben Zeit.', ar: 'لدينا وقت.' },
              ],
            },
            {
              titleAr: 'عبارات ثابتة بـ haben',
              subAr: 'لا تُترجم حرفياً',
              tone: 'accent',
              items: [
                { de: 'Ich habe Hunger.', ar: 'أنا جائع.' },
                { de: 'Ich habe Durst.', ar: 'أنا عطشان.' },
                { de: 'Ich habe Angst.', ar: 'أنا خائف.' },
                { de: 'Ich habe Geburtstag.', ar: 'اليوم عيد ميلادي.' },
              ],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'قاعدة عملية: الشعور اسمٌ لا صفة',
          bodyAr:
            'في هذه العبارات الثابتة، الكلمة التي تأتي بعد [[haben]] هي **اسم** ([[Hunger]]، [[Durst]]، [[Angst]]) وليست صفة، ولذلك لا تُصرَّف ولا تتغيّر. قارن بـ [[Ich bin hungrig.]] (بصفة، مع [[sein]]) — كلا الشكلين صحيح ومستخدم، لكن العبارة بـ [[haben]] + اسم أكثر شيوعاً في الكلام اليومي.',
        },
        {
          kind: 'examples',
          titleAr: 'haben في الحياة اليومية',
          tone: 'plum',
          items: [
            { badge: 'ملكية', de: 'Hast du einen Stift?', ar: 'هل لديك قلم؟' },
            { badge: 'ملكية', de: 'Wir haben keine Milch mehr.', ar: 'لم يعد لدينا حليب.', noteAr: 'تفاصيل [[keine]] في درس النفي (الدرس ٠٨).' },
            { badge: 'ثابتة', de: 'Habt ihr Hunger?', ar: 'هل أنتم جياع؟' },
            { badge: 'ثابتة', de: 'Ich habe heute keine Zeit.', ar: 'ليس لديّ وقت اليوم.' },
            { badge: 'ثابتة', de: 'Sie hat morgen Geburtstag.', ar: 'غداً عيد ميلادها.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: sein أم haben؟',
          exercises: [
            {
              id: 'gr02-p2-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أيّ فعل مناسب؟',
              questionDe: 'Ich ___ 30 Jahre alt.',
              options: ['habe', 'bin', 'hat', 'ist'],
              correctIndex: 1,
              explanationAr: 'العمر في الألمانية يُعبَّر عنه بـ [[sein]]: [[Ich bin … alt]].',
            },
            {
              id: 'gr02-p2-mc2',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أيّ فعل مناسب؟',
              questionDe: 'Wir ___ Hunger.',
              options: ['sind', 'haben', 'ist', 'hat'],
              correctIndex: 1,
              explanationAr: '[[Hunger]] اسم يأتي مع [[haben]]: [[Wir haben Hunger]].',
            },
            {
              id: 'gr02-p2-order1',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات',
              words: ['ein', 'Ich', 'habe', 'Auto'],
              correctOrder: [1, 2, 0, 3],
              explanationAr: 'الفاعل، ثم الفعل، ثم المفعول به: [[Ich habe ein Auto.]]',
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
      introAr: 'معظم الأخطاء هنا مصدرها الترجمة الحرفية من العربية أو الإنجليزية.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich habe 20 Jahre.',
              correct: 'Ich bin 20 Jahre alt.',
              explanationAr: 'العمر يُعبَّر عنه بـ [[sein]] + [[alt]]، وليس بـ [[haben]].',
            },
            {
              wrong: 'Ich bin Hunger.',
              correct: 'Ich habe Hunger.',
              explanationAr: '[[Hunger]] اسم يأتي مع [[haben]]، وليس صفة مع [[sein]].',
            },
            {
              wrong: 'Du hast müde.',
              correct: 'Du bist müde.',
              explanationAr: '[[müde]] صفة تصف حالة، فتأتي مع [[sein]].',
            },
            {
              wrong: 'Er ist ein Bruder.',
              correct: 'Er hat einen Bruder.',
              explanationAr: 'امتلاك الأخ يُعبَّر عنه بـ [[haben]]: [[er hat einen Bruder]] (هو + عنده أخ)؛ [[er ist ein Bruder]] تعني خطأً أنه «هو أخٌ» ككيان لا كعلاقة.',
            },
            {
              wrong: 'Wir bin Studenten.',
              correct: 'Wir sind Studenten.',
              explanationAr: '[[bin]] فقط مع [[ich]]. مع [[wir]] الشكل هو [[sind]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'ich', hintAr: 'sein / haben؟', backAr: 'bin / habe', exampleDe: 'Ich **bin** müde. Ich **habe** Zeit.' },
    { frontDe: 'du', hintAr: 'sein / haben؟', backAr: 'bist / hast', exampleDe: 'Du **bist** nett. Du **hast** Zeit.' },
    { frontDe: 'er, sie, es', hintAr: 'sein / haben؟', backAr: 'ist / hat', exampleDe: 'Sie **ist** Ärztin. Sie **hat** ein Auto.' },
    { frontDe: 'wir / sie / Sie', hintAr: 'sein / haben؟', backAr: 'sind / haben', exampleDe: 'Wir **sind** Freunde.' },
    { frontDe: 'ihr', hintAr: 'sein / haben؟', backAr: 'seid / habt', exampleDe: 'Ihr **seid** pünktlich.' },
    {
      frontDe: 'Ich bin 20 Jahre alt.',
      hintAr: 'لماذا sein وليس haben؟',
      backAr: 'العمر يُعبَّر عنه دائماً بـ sein + alt في الألمانية.',
    },
    {
      frontDe: 'Ich habe Hunger.',
      hintAr: 'اسم أم صفة؟',
      backAr: 'اسم (Hunger)، ولهذا يأتي مع haben لا مع sein.',
    },
  ],

  quiz: [
    {
      id: 'gr02-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Ich ___ Student.',
      options: ['bin', 'bist', 'ist', 'habe'],
      correctIndex: 0,
      explanationAr: 'مع [[ich]] الشكل هو [[bin]].',
    },
    {
      id: 'gr02-q2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Sie (هم) ___ Lehrer.',
      options: ['ist', 'sind', 'seid', 'bin'],
      correctIndex: 1,
      explanationAr: 'مع [[sie]] (هم) الشكل هو [[sind]].',
    },
    {
      id: 'gr02-q3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بالفعل haben',
      sentenceDe: 'Du ___ einen Hund.',
      acceptedAnswers: ['hast'],
      explanationAr: 'مع [[du]] الشكل هو [[hast]].',
    },
    {
      id: 'gr02-q4',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Für das Alter benutzt man „haben": Ich habe 20 Jahre.',
      isTrue: false,
      explanationAr: 'خطأ: العمر يُعبَّر عنه بـ [[sein]]: [[Ich bin 20 Jahre alt]].',
    },
    {
      id: 'gr02-q5',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ جملة صحيحة؟',
      questionDe: '',
      options: ['Ich bin Hunger.', 'Ich habe Hunger.', 'Ich habe hungrig.', 'Ich bin habe Hunger.'],
      correctIndex: 1,
      explanationAr: '[[Hunger]] اسم يأتي مع [[haben]].',
    },
    {
      id: 'gr02-q6',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['müde', 'Wir', 'sind'],
      correctOrder: [1, 2, 0],
      explanationAr: '[[Wir sind müde.]] — الفاعل ثم الفعل ثم الصفة.',
    },
    {
      id: 'gr02-q7',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الضمير مع شكل sein الصحيح',
      pairs: [
        { de: 'ich', ar: 'bin' },
        { de: 'du', ar: 'bist' },
        { de: 'wir', ar: 'sind' },
        { de: 'ihr', ar: 'seid' },
      ],
      explanationAr: 'راجع جدول تصريف [[sein]] أعلاه إن أخطأت.',
    },
    {
      id: 'gr02-q8',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'عمري ثلاثون عاماً.',
      acceptedAnswers: ['Ich bin 30 Jahre alt.', 'Ich bin dreißig Jahre alt.'],
      explanationAr: 'العمر بصيغة [[sein]] + [[Jahre alt]].',
    },
  ],

  cheatSheet: [
    { de: 'ich bin · du bist · er/sie/es ist', ar: 'تصريف sein (المفرد).' },
    { de: 'wir sind · ihr seid · sie/Sie sind', ar: 'تصريف sein (الجمع والرسمي).' },
    { de: 'ich habe · du hast · er/sie/es hat', ar: 'تصريف haben (المفرد).' },
    { de: 'wir haben · ihr habt · sie/Sie haben', ar: 'تصريف haben (الجمع والرسمي).' },
    { de: 'Ich bin 20 Jahre alt.', ar: 'العمر مع sein، وليس haben.' },
    { de: 'Ich habe Hunger / Durst / Angst.', ar: 'عبارات ثابتة مع haben + اسم.' },
    { de: 'sein = هوية/صفة/مكان', ar: 'haben = ملكية/عبارات ثابتة.' },
  ],
}

export default rule
