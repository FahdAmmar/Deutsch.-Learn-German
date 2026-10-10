import type { GrammarRule } from '@/types'

/**
 * Rule 03 — Präsens (regular conjugation + the three stem-change families
 * + the two spelling-adjustment families). Modal verbs (rule 11) and
 * separable verbs (rule 12) are explicitly out of scope and not used in
 * examples here.
 */
const rule: GrammarRule = {
  id: 'gr-03',
  number: 3,
  slug: '03-praesens',
  level: 'A1',
  termDe: 'Präsens',
  titleAr: 'المضارع وتصريف الأفعال',
  eyebrowAr: 'الدرس الثالث في خارطة القواعد',
  taglineAr:
    'بعد أن حفظتَ [[sein]] و[[haben]] كاستثناءين، حان دور **القاعدة العامة**: كيف نصرّف أيّ فعل منتظم في المضارع، ومتى يتغيّر حرف العلّة في جذع الفعل مع [[du]] و[[er/sie/es]] فقط.',
  stats: [
    { value: '6', labelAr: 'نهايات تُضاف للجذع' },
    { value: '3', labelAr: 'أنماط تغيّر حرف العلّة' },
    { value: '45+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich lerne Deutsch, aber sie spricht schon fließend.',
    ar: 'أنا أتعلّم الألمانية، لكنها هي تتحدّثها بطلاقة بالفعل.',
  },
  objectivesAr: [
    'تشتقّ جذع أيّ فعل منتظم وتضيف له النهايات الست الصحيحة.',
    'تتعامل مع الأفعال التي جذعها ينتهي بـ [[-d]]/[[-t]] أو [[-s]]/[[-ß]]/[[-z]] دون خطأ إملائي.',
    'تتعرّف على الأفعال التي يتغيّر حرف العلّة في جذعها مع [[du]] و[[er/sie/es]] فقط ([[e→i]]، [[e→ie]]، [[a→ä]]).',
    'تفرّق بين فعل منتظم تماماً وفعل بتغيّر في حرف العلّة، وتستخدم كلاهما بثقة في جمل يومية.',
  ],

  sections: [
    {
      id: 'overview',
      navLabelAr: 'نظرة عامة',
      kickerDe: 'Überblick',
      titleAr: 'جذع الفعل + نهاية الضمير',
      titleDe: 'Stamm + Endung',
      tone: 'accent',
      introAr:
        'كل فعل ألماني منتظم يُبنى من جزأين: **الجذع** (المصدر بلا [[-en]]) و**نهاية** تتغيّر حسب الضمير. احذف [[-en]] من نهاية المصدر لتحصل على الجذع، ثم أضف النهاية المناسبة.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'lern', tone: 'accent', noteAr: 'الجذع' },
            { text: '+ e / st / t / en / t / en', tone: 'primary', noteAr: 'النهاية حسب الضمير' },
          ],
        },
        {
          kind: 'table',
          captionAr: 'تصريف lernen (فعل منتظم تماماً)',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'lernen · يتعلّم', lang: 'de', tone: 'accent' },
            { header: 'النهاية', lang: 'ar' },
          ],
          rows: [
            ['ich', 'lerne', '-e'],
            ['du', 'lernst', '-st'],
            ['er, sie, es', 'lernt', '-t'],
            ['wir', 'lernen', '-en'],
            ['ihr', 'lernt', '-t'],
            ['sie', 'lernen', '-en'],
            ['Sie', 'lernen', '-en'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'لاحظ التطابق',
          bodyAr:
            'كما رأيت مع الضمائر: [[er/sie/es]] و[[ihr]] يتطابقان أحياناً في النهاية ([[-t]])، و[[wir]] و[[sie]] (هم) و[[Sie]] يأخذون دائماً صيغة المصدر نفسها ([[-en]]). هذا التطابق يقلّل ما عليك حفظه فعلياً إلى أربعة أشكال مختلفة لا سبعة.',
        },
        {
          kind: 'examples',
          titleAr: 'أفعال منتظمة شائعة',
          tone: 'accent',
          items: [
            { badge: 'wohnen', de: 'Ich **wohne** in Kairo.', ar: 'أسكن في القاهرة.' },
            { badge: 'machen', de: 'Was **machst** du gern?', ar: 'ماذا تحبّ أن تفعل؟' },
            { badge: 'kommen', de: 'Woher **kommt** ihr?', ar: 'من أين أنتم؟' },
            { badge: 'spielen', de: 'Die Kinder **spielen** im Park.', ar: 'الأطفال يلعبون في الحديقة.' },
          ],
        },
      ],
    },

    {
      id: 'spelling',
      navLabelAr: 'تعديلات إملائية',
      kickerDe: 'Rechtschreibung',
      titleAr: 'تعديلات إملائية على الجذع',
      titleDe: '-d/-t · -s/-ß/-z',
      tone: 'plum',
      introAr:
        'بعض الأفعال المنتظمة تحتاج تعديلاً بسيطاً حتى يسهل نطقها — النمط النحوي نفسه، لكن حرفاً يُضاف أو يُحذف.',
      blocks: [
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'جذع ينتهي بـ d أو t',
              subAr: 'arbeiten, finden, warten — تُضاف e قبل st/t',
              formula: 'Stamm + e + st/t',
              tone: 'plum',
              items: [
                { de: 'du arbeitest', ar: '← arbeit + e + st' },
                { de: 'er arbeitet', ar: '← arbeit + e + t' },
                { de: 'ihr arbeitet', ar: '← arbeit + e + t' },
                { de: 'du findest', ar: '← find + e + st' },
              ],
            },
            {
              titleAr: 'جذع ينتهي بـ s أو ß أو z',
              subAr: 'heißen, tanzen, reisen — تُحذف نهاية st لتصبح t فقط',
              formula: 'du: Stamm + t (بلا s إضافية)',
              tone: 'accent',
              items: [
                { de: 'du heißt', ar: 'وليس heißst' },
                { de: 'du tanzt', ar: 'وليس tanzst' },
                { de: 'du reist', ar: 'وليس reisst' },
              ],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'السبب بسيط: سهولة النطق',
          bodyAr:
            'اللغة الألمانية تتجنّب تكديس حروف صوتية متشابهة. [[arbeitst]] يصعب نطقه فتضاف [[e]]: [[arbeitest]]. و[[heißst]] يكرّر صوت السين فتُحذف الزيادة: [[heißt]].',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: صرّف الفعل بشكل صحيح',
          exercises: [
            {
              id: 'gr03-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'صرّف arbeiten مع du',
              sentenceDe: 'Wo ___ du?',
              acceptedAnswers: ['arbeitest'],
              hint: 'الجذع ينتهي بـ t',
              explanationAr: '[[arbeiten]] جذعه [[arbeit-]] الذي ينتهي بـ t، فتُضاف e: [[arbeitest]].',
            },
            {
              id: 'gr03-p1-fill2',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'صرّف heißen مع du',
              sentenceDe: 'Wie ___ du?',
              acceptedAnswers: ['heißt', 'heisst'],
              hint: 'الجذع ينتهي بـ ß',
              explanationAr: '[[heißen]] جذعه ينتهي بـ ß، فالشكل [[heißt]] بلا s إضافية.',
            },
          ],
        },
      ],
    },

    {
      id: 'vowel-change',
      navLabelAr: 'تغيّر حرف العلّة',
      kickerDe: 'Vokalwechsel',
      titleAr: 'أفعال يتغيّر فيها حرف العلّة',
      titleDe: 'e→i · e→ie · a→ä',
      tone: 'accent',
      introAr:
        'مجموعة من أشهر الأفعال الألمانية تغيّر حرف العلّة في جذعها — **فقط** مع [[du]] و[[er/sie/es]]. بقية الضمائر تستخدم الجذع الأصلي بلا تغيير.',
      blocks: [
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'القاعدة الذهبية',
          bodyAr:
            'التغيير يظهر في **صيغتين فقط**: [[du]] و[[er/sie/es]]. مع [[ich]] و[[wir]] و[[ihr]] و[[sie]]/[[Sie]] يبقى الجذع كما هو في المصدر.',
        },
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'e → i',
              subAr: 'sprechen, essen, geben, nehmen, helfen',
              formula: 'du sprichst · er spricht',
              tone: 'accent',
              items: [
                { de: 'sprechen → du sprichst, er spricht', ar: 'يتحدّث' },
                { de: 'essen → du isst, er isst', ar: 'يأكل' },
                { de: 'geben → du gibst, er gibt', ar: 'يعطي' },
                { de: 'nehmen → du nimmst, er nimmt', ar: 'يأخذ (تغيّر إضافي: nehmen → nimmt)' },
                { de: 'helfen → du hilfst, er hilft', ar: 'يساعد' },
              ],
            },
            {
              titleAr: 'e → ie',
              subAr: 'sehen, lesen',
              formula: 'du siehst · er sieht',
              tone: 'plum',
              items: [
                { de: 'sehen → du siehst, er sieht', ar: 'يرى' },
                { de: 'lesen → du liest, er liest', ar: 'يقرأ' },
              ],
            },
            {
              titleAr: 'a → ä',
              subAr: 'fahren, schlafen, tragen',
              formula: 'du fährst · er fährt',
              tone: 'highlight',
              items: [
                { de: 'fahren → du fährst, er fährt', ar: 'يقود/يسافر' },
                { de: 'schlafen → du schläfst, er schläft', ar: 'ينام' },
                { de: 'tragen → du trägst, er trägt', ar: 'يحمل/يرتدي' },
              ],
            },
          ],
        },
        {
          kind: 'table',
          captionAr: 'sprechen عبر كل الضمائر — التغيير في خليتين فقط',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'sprechen', lang: 'de', tone: 'accent' },
          ],
          rows: [
            ['ich', 'spreche'],
            ['du', 'sprichst'],
            ['er, sie, es', 'spricht'],
            ['wir', 'sprechen'],
            ['ihr', 'sprecht'],
            ['sie / Sie', 'sprechen'],
          ],
          emphasisRows: [1, 2],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'خطأ شائع: تعميم التغيير على كل الضمائر',
          bodyAr:
            'لا تقل [[ich spriche]] ولا [[wir sprechen]] بتغيير — [[wir]] يستخدم الجذع الأصلي دائماً: [[wir sprechen]] (صحيح دون تغيير) وليس [[wir sprichen]].',
        },
        {
          kind: 'examples',
          titleAr: 'أفعال التغيّر في جمل',
          tone: 'accent',
          items: [
            { badge: 'e→i', de: 'Sie **spricht** drei Sprachen.', ar: 'هي تتحدّث ثلاث لغات.' },
            { badge: 'e→i', de: 'Er **isst** viel Obst.', ar: 'هو يأكل الكثير من الفواكه.' },
            { badge: 'e→ie', de: 'Was **liest** du gerade?', ar: 'ماذا تقرأ الآن؟' },
            { badge: 'a→ä', de: 'Sie **fährt** jeden Tag mit dem Bus.', ar: 'هي تذهب بالحافلة كل يوم.' },
            { badge: 'a→ä', de: 'Das Baby **schläft** schon.', ar: 'الطفل نائم بالفعل.' },
            { badge: 'بلا تغيير', de: 'Wir **sprechen** Arabisch und Deutsch.', ar: 'نحن نتحدّث العربية والألمانية.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: اختر الشكل الصحيح',
          exercises: [
            {
              id: 'gr03-p2-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أيّ شكل صحيح؟',
              questionDe: 'Was ___ du gern? (essen)',
              options: ['esse', 'isst', 'esst', 'essen'],
              correctIndex: 1,
              explanationAr: '[[essen]] فعل e→i، ومع [[du]]: [[isst]].',
            },
            {
              id: 'gr03-p2-mc2',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أيّ شكل صحيح؟',
              questionDe: 'Wir ___ heute Fußball. (spielen)',
              options: ['spielt', 'spielst', 'spielen', 'spiele'],
              correctIndex: 2,
              explanationAr: '[[spielen]] فعل منتظم تماماً، ومع [[wir]]: [[spielen]].',
            },
            {
              id: 'gr03-p2-order1',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات',
              words: ['fährt', 'Sie', 'nach', 'Berlin'],
              correctOrder: [1, 0, 2, 3],
              explanationAr: '[[Sie fährt nach Berlin.]] — لاحظ [[fährt]] بتغيّر a→ä.',
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
      introAr: 'أغلب الأخطاء تأتي من تعميم قاعدة واحدة على كل الحالات.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Du arbeitst viel.',
              correct: 'Du arbeitest viel.',
              explanationAr: 'الجذع [[arbeit-]] ينتهي بـ t، فتُضاف e قبل [[-st]].',
            },
            {
              wrong: 'Du heißst Anna.',
              correct: 'Du heißt Anna.',
              explanationAr: 'الجذع ينتهي بـ ß، فلا تُضاف s أخرى.',
            },
            {
              wrong: 'Ich spriche Deutsch.',
              correct: 'Ich spreche Deutsch.',
              explanationAr: 'تغيّر e→i يحدث فقط مع [[du]] و[[er/sie/es]]، وليس مع [[ich]].',
            },
            {
              wrong: 'Wir sprichen Arabisch.',
              correct: 'Wir sprechen Arabisch.',
              explanationAr: 'مع [[wir]] يبقى الجذع الأصلي [[sprech-]] بلا تغيير.',
            },
            {
              wrong: 'Er nehmt das Buch.',
              correct: 'Er nimmt das Buch.',
              explanationAr: '[[nehmen]] فعل e→i بتغيّر إضافي في الحروف (nehmen → nimmt)، وليس مجرّد إضافة -t.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'lernen → ich', hintAr: 'أضف النهاية', backAr: 'lerne (جذع + e)', exampleDe: 'Ich **lerne** Deutsch.' },
    { frontDe: 'arbeiten → du', hintAr: 'الجذع ينتهي بـ t', backAr: 'arbeitest (تُضاف e قبل st)', exampleDe: 'Du **arbeitest** viel.' },
    { frontDe: 'heißen → du', hintAr: 'الجذع ينتهي بـ ß', backAr: 'heißt (بلا s إضافية)', exampleDe: 'Wie **heißt** du?' },
    { frontDe: 'sprechen → er', hintAr: 'e → ؟', backAr: 'spricht (e→i)', exampleDe: 'Er **spricht** Deutsch.' },
    { frontDe: 'sehen → du', hintAr: 'e → ؟', backAr: 'siehst (e→ie)', exampleDe: 'Was **siehst** du?' },
    { frontDe: 'fahren → er', hintAr: 'a → ؟', backAr: 'fährt (a→ä)', exampleDe: 'Er **fährt** nach Hause.' },
    { frontDe: 'wir sprechen', hintAr: 'هل يتغيّر الجذع؟', backAr: 'لا — تغيّر حرف العلّة يحدث فقط مع du وer/sie/es.' },
  ],

  quiz: [
    {
      id: 'gr03-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Ich ___ in Hamburg. (wohnen)',
      options: ['wohne', 'wohnst', 'wohnt', 'wohnen'],
      correctIndex: 0,
      explanationAr: 'مع [[ich]]: جذع + [[-e]].',
    },
    {
      id: 'gr03-q2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Wo ___ du? (arbeiten)',
      options: ['arbeitst', 'arbeitest', 'arbeitet', 'arbeiten'],
      correctIndex: 1,
      explanationAr: 'جذع ينتهي بـ t → تُضاف e: [[arbeitest]].',
    },
    {
      id: 'gr03-q3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Er ___ gern Bücher. (lesen)',
      options: ['lest', 'liest', 'liesst', 'lesen'],
      correctIndex: 1,
      explanationAr: '[[lesen]] فعل e→ie، ومع [[er]]: [[liest]].',
    },
    {
      id: 'gr03-q4',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Ich spriche" ist korrekt.',
      isTrue: false,
      explanationAr: 'خطأ: مع [[ich]] لا يحدث تغيّر — الصحيح [[Ich spreche]].',
    },
    {
      id: 'gr03-q5',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'صرّف fahren مع du',
      sentenceDe: '___ du morgen nach Berlin?',
      acceptedAnswers: ['Fährst', 'fährst'],
      explanationAr: '[[fahren]] فعل a→ä، ومع [[du]]: [[fährst]].',
    },
    {
      id: 'gr03-q6',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Wie ___ ihr? (heißen)',
      options: ['heißt', 'heißen', 'heißst', 'heißet'],
      correctIndex: 0,
      explanationAr: 'مع [[ihr]] النهاية العادية [[-t]]: [[heißt]] (تصادف نفس شكل du هنا لأن الجذع ينتهي بـ ß).',
    },
    {
      id: 'gr03-q7',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['isst', 'Was', 'du', 'gern'],
      correctOrder: [1, 0, 2, 3],
      explanationAr: '[[Was isst du gern?]] — سؤال بأداة استفهام في المقدّمة.',
    },
    {
      id: 'gr03-q8',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'هي تتحدّث ثلاث لغات.',
      acceptedAnswers: ['Sie spricht drei Sprachen.'],
      explanationAr: '[[sprechen]] فعل e→i، ومع [[sie]] (هي): [[spricht]].',
    },
  ],

  cheatSheet: [
    { de: 'Stamm + e/st/t/en/t/en', ar: 'نهايات الفعل المنتظم حسب الضمير.' },
    { de: 'arbeiten → du arbeitest', ar: 'جذع بـ -d/-t: تُضاف e قبل st/t.' },
    { de: 'heißen → du heißt', ar: 'جذع بـ -s/-ß/-z: بلا s إضافية مع du.' },
    { de: 'sprechen → du sprichst, er spricht', ar: 'e → i (فقط مع du وer/sie/es).' },
    { de: 'sehen → du siehst, er sieht', ar: 'e → ie (فقط مع du وer/sie/es).' },
    { de: 'fahren → du fährst, er fährt', ar: 'a → ä (فقط مع du وer/sie/es).' },
    { de: 'wir/ihr/sie: الجذع الأصلي دائماً', ar: 'تغيّر حرف العلّة لا يمتدّ خارج du وer/sie/es.' },
  ],
}

export default rule
