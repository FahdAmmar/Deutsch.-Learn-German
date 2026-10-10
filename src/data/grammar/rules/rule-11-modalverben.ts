import type { GrammarRule } from '@/types'

/**
 * Rule 11 — Modalverben. Introduces the verb bracket (Satzklammer) for
 * the first time: modal in position 2, main verb as a bare infinitive at
 * the very end. Trennbare Verben (rule 12) reuses this same bracket idea.
 */
const rule: GrammarRule = {
  id: 'gr-11',
  number: 11,
  slug: '11-modalverben',
  level: 'A1',
  termDe: 'Modalverben',
  titleAr: 'الأفعال الناقصة',
  eyebrowAr: 'الدرس الحادي عشر في خارطة القواعد',
  taglineAr:
    'الأفعال الناقصة ([[können]]، [[müssen]]، [[wollen]]…) تضيف معنى مثل القدرة أو الضرورة أو الرغبة إلى فعل آخر. هي أول فعل تتعلّمه يحتاج **فعلاً ثانياً** في الجملة — وهذا الفعل الثاني له مكان واحد ثابت: **آخر الجملة**.',
  stats: [
    { value: '6', labelAr: 'أفعال ناقصة أساسية' },
    { value: '2', labelAr: 'صيغتان بلا نهاية (ich و er/sie/es)' },
    { value: '40+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich kann gut Deutsch sprechen.',
    ar: 'أستطيع التحدّث بالألمانية جيّداً.',
  },
  objectivesAr: [
    'تحفظ تصريف الأفعال الناقصة الستة الأساسية.',
    'تبني جملة بفعلين: الفعل الناقص في الموضع الثاني، والفعل الأصلي في صيغة المصدر في آخر الجملة.',
    'تفهم مفهوم «قوس الجملة» ([[Satzklammer]]) الذي يحكم موضع الفعلين.',
    'تستخدم كل فعل ناقص في سياقه المناسب (قدرة، ضرورة، رغبة، سماح، نصيحة).',
  ],

  sections: [
    {
      id: 'forms',
      navLabelAr: 'التصريف',
      kickerDe: 'Die Formen',
      titleAr: 'تصريف الأفعال الناقصة',
      titleDe: 'können · müssen · wollen · sollen · dürfen · möchten',
      tone: 'accent',
      introAr: 'الأفعال الناقصة **شاذّة**: [[ich]] و[[er/sie/es]] يأخذان الشكل نفسه بلا نهاية، وحرف العلّة يتغيّر غالباً في صيغة المفرد.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الأفعال الناقصة الستة',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'können (قدرة)', lang: 'de', tone: 'accent' },
            { header: 'müssen (ضرورة)', lang: 'de', tone: 'plum' },
            { header: 'wollen (رغبة)', lang: 'de', tone: 'highlight' },
          ],
          rows: [
            ['ich', 'kann', 'muss', 'will'],
            ['du', 'kannst', 'musst', 'willst'],
            ['er, sie, es', 'kann', 'muss', 'will'],
            ['wir', 'können', 'müssen', 'wollen'],
            ['ihr', 'könnt', 'müsst', 'wollt'],
            ['sie / Sie', 'können', 'müssen', 'wollen'],
          ],
          emphasisRows: [0, 2],
        },
        {
          kind: 'table',
          captionAr: 'sollen · dürfen · möchten',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'sollen (نصيحة)', lang: 'de', tone: 'accent' },
            { header: 'dürfen (سماح)', lang: 'de', tone: 'plum' },
            { header: 'möchten (رغبة مهذّبة)', lang: 'de', tone: 'highlight' },
          ],
          rows: [
            ['ich', 'soll', 'darf', 'möchte'],
            ['du', 'sollst', 'darfst', 'möchtest'],
            ['er, sie, es', 'soll', 'darf', 'möchte'],
            ['wir', 'sollen', 'dürfen', 'möchten'],
            ['ihr', 'sollt', 'dürft', 'möchtet'],
            ['sie / Sie', 'sollen', 'dürfen', 'möchten'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'قاعدة ثابتة: ich = er/sie/es',
          bodyAr: 'في كل الأفعال الناقصة بلا استثناء، صيغة [[ich]] تتطابق مع صيغة [[er/sie/es]] — كلتاهما بلا نهاية. لاحظ أيضاً أن [[möchten]] وحدها لا يتغيّر حرف العلّة فيها بين المفرد والجمع.',
        },
      ],
    },

    {
      id: 'satzklammer',
      navLabelAr: 'قوس الجملة',
      kickerDe: 'Satzklammer',
      titleAr: 'قوس الجملة: فعلان، موضعان ثابتان',
      titleDe: 'Modalverb + Infinitiv',
      tone: 'plum',
      introAr:
        'حين تستخدم فعلاً ناقصاً، يظهر فعل ثانٍ (الفعل الأصلي) في صيغة **المصدر** (بلا تصريف) في **آخر الجملة تماماً**. الفعلان معاً يشكّلان «قوساً» يحيط بباقي عناصر الجملة.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'Subjekt' },
            { text: 'Modalverb', tone: 'accent', noteAr: 'الموضع الثاني' },
            { text: '… (باقي الجملة)' },
            { text: 'Infinitiv', tone: 'plum', noteAr: 'آخر الجملة' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'kann', role: 'الفعل الناقص (٢)' },
            { text: 'gut Deutsch', role: 'باقي الجملة' },
            { text: 'sprechen.', role: 'المصدر (آخر الجملة)' },
          ],
          ar: 'أستطيع التحدّث بالألمانية جيّداً.',
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'الفعل الثاني لا يُصرَّف أبداً',
          bodyAr: 'الفعل الأصلي (مثل [[sprechen]]) يبقى في صيغة المصدر دائماً، أياً كان الفاعل. **التصريف كلّه** ينتقل إلى الفعل الناقص فقط.',
        },
        {
          kind: 'examples',
          titleAr: 'قوس الجملة مع أفعال ناقصة مختلفة',
          tone: 'plum',
          items: [
            { badge: 'können', de: 'Sie **kann** sehr gut **schwimmen**.', ar: 'هي تستطيع السباحة جيّداً جدّاً.' },
            { badge: 'müssen', de: 'Wir **müssen** jetzt **gehen**.', ar: 'علينا الذهاب الآن.' },
            { badge: 'wollen', de: 'Ich **will** ein Auto **kaufen**.', ar: 'أريد شراء سيارة.' },
            { badge: 'dürfen', de: 'Hier **darf** man nicht **rauchen**.', ar: 'لا يُسمح بالتدخين هنا.' },
            { badge: 'möchten', de: 'Ich **möchte** einen Kaffee **trinken**.', ar: 'أودّ شرب قهوة.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: رتّب الجملة (قوس الجملة)',
          exercises: [
            {
              id: 'gr11-p1-order1',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات',
              words: ['sprechen.', 'Ich', 'Deutsch', 'kann'],
              correctOrder: [1, 3, 2, 0],
              explanationAr: '[[Ich kann Deutsch sprechen.]] — الناقص ثانياً، المصدر أخيراً.',
            },
            {
              id: 'gr11-p1-order2',
              type: 'ordering',
              level: 'A1',
              promptAr: 'رتّب الكلمات',
              words: ['gehen.', 'nach Hause', 'Wir', 'müssen'],
              correctOrder: [2, 3, 1, 0],
              explanationAr: '[[Wir müssen nach Hause gehen.]]',
            },
          ],
        },
      ],
    },

    {
      id: 'meanings',
      navLabelAr: 'المعاني والاستخدام',
      kickerDe: 'Bedeutung',
      titleAr: 'أيّ فعل ناقص أستخدم؟',
      titleDe: 'Bedeutung & Gebrauch',
      tone: 'highlight',
      introAr: 'لكل فعل ناقص معنى مميّز — اختيار الفعل الصحيح لا يقلّ أهمية عن تصريفه بشكل صحيح.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'معاني الأفعال الناقصة',
          columns: [
            { header: 'الفعل', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['können', 'القدرة، المهارة', 'Ich kann Auto fahren.'],
            ['müssen', 'الضرورة، الإلزام', 'Ich muss arbeiten.'],
            ['wollen', 'الرغبة، النية', 'Ich will nach Berlin fahren.'],
            ['sollen', 'النصيحة، التوصية (من طرف آخر)', 'Du sollst mehr schlafen.'],
            ['dürfen', 'السماح، الإذن', 'Darf ich hier sitzen?'],
            ['möchten', 'رغبة مهذّبة (أخفّ من wollen)', 'Ich möchte bitte einen Tee.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'compass',
          titleAr: 'wollen أم möchten؟',
          bodyAr: '[[wollen]] رغبة مباشرة وقد تبدو حازمة، بينما [[möchten]] أكثر تهذيباً وتُستخدم في الطلبات اليومية (المطعم، المتجر). [[Ich möchte einen Kaffee.]] أكثر تهذيباً من [[Ich will einen Kaffee.]]',
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
      introAr: 'أشهر خطأ هو تصريف الفعلين معاً، أو نسيان إرسال الفعل الأصلي إلى آخر الجملة.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich kann spreche Deutsch.',
              correct: 'Ich kann Deutsch sprechen.',
              explanationAr: 'الفعل الثاني يبقى في صيغة المصدر [[sprechen]]، بلا تصريف، وينتقل إلى آخر الجملة.',
            },
            {
              wrong: 'Ich muss gehen nach Hause.',
              correct: 'Ich muss nach Hause gehen.',
              explanationAr: 'المصدر يجب أن يكون آخر كلمة في الجملة، بعد كل العناصر الأخرى.',
            },
            {
              wrong: 'Er können gut schwimmen.',
              correct: 'Er kann gut schwimmen.',
              explanationAr: 'مع [[er]] الشكل الصحيح [[kann]] (بلا نهاية)، وليس [[können]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'ich kann / er kann', hintAr: 'ما الملاحظة؟', backAr: 'صيغة ich تتطابق دائماً مع er/sie/es في الأفعال الناقصة.' },
    { frontDe: 'Modalverb + … + Infinitiv', hintAr: 'ما هذا الترتيب؟', backAr: 'قوس الجملة: الناقص في الموضع الثاني، والمصدر في آخر الجملة.', exampleDe: 'Ich **kann** gut **schwimmen**.' },
    { frontDe: 'wollen', hintAr: 'ماذا تعني؟', backAr: 'يريد — رغبة أو نية مباشرة.' },
    { frontDe: 'möchten', hintAr: 'ماذا تعني؟', backAr: 'يودّ — رغبة مهذّبة، للطلبات اليومية.' },
    { frontDe: 'dürfen', hintAr: 'ماذا تعني؟', backAr: 'يُسمح له — إذن.' },
  ],

  quiz: [
    {
      id: 'gr11-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر التصريف الصحيح',
      questionDe: 'Er ___ gut Deutsch sprechen.',
      options: ['kann', 'kannst', 'können', 'könnt'],
      correctIndex: 0,
      explanationAr: 'مع [[er]]: [[kann]] (بلا نهاية).',
    },
    {
      id: 'gr11-q2',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['Kaffee.', 'möchte', 'einen', 'Ich'],
      correctOrder: [3, 1, 2, 0],
      explanationAr: '[[Ich möchte einen Kaffee.]]',
    },
    {
      id: 'gr11-q3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Der zweite Verb bleibt immer im Infinitiv: Ich muss arbeiten.',
      isTrue: true,
      explanationAr: 'صحيح: الفعل الثاني يبقى دائماً في صيغة المصدر.',
    },
    {
      id: 'gr11-q4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بصيغة können المناسبة',
      sentenceDe: 'Wir ___ heute nicht kommen.',
      acceptedAnswers: ['können'],
      explanationAr: 'مع [[wir]]: [[können]].',
    },
    {
      id: 'gr11-q5',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ فعل ناقص أنسب للسؤال عن الإذن؟',
      questionDe: '___ ich hier parken?',
      options: ['Muss', 'Will', 'Darf', 'Soll'],
      correctIndex: 2,
      explanationAr: '[[dürfen]] يُستخدم للسؤال عن الإذن.',
    },
  ],

  cheatSheet: [
    { de: 'können · müssen · wollen', ar: 'قدرة · ضرورة · رغبة.' },
    { de: 'sollen · dürfen · möchten', ar: 'نصيحة · سماح · رغبة مهذّبة.' },
    { de: 'Modalverb (٢) … Infinitiv (نهاية)', ar: 'قوس الجملة: الناقص ثانياً، والمصدر في النهاية.' },
    { de: 'ich = er/sie/es', ar: 'نفس الشكل بلا نهاية في كل الأفعال الناقصة.' },
  ],
}

export default rule
