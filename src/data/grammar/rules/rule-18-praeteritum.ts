import type { GrammarRule } from '@/types'

/**
 * Rule 18 — Präteritum. Builds directly on rule 17's Partizip II lists
 * (the irregular-verb stem changes largely parallel each other). The
 * full Perfekt-vs-Präteritum usage decision is rule 31; here the focus is
 * purely on forming Präteritum correctly.
 */
const rule: GrammarRule = {
  id: 'gr-18',
  number: 18,
  slug: '18-praeteritum',
  level: 'A2',
  termDe: 'Präteritum',
  titleAr: 'الماضي للأفعال الأساسية',
  eyebrowAr: 'الدرس الثاني في مستوى A2',
  taglineAr:
    '[[Präteritum]] هو زمن الماضي الثاني في الألمانية — أقلّ استخداماً من [[Perfekt]] في الكلام اليومي بشكل عام، **إلا** مع [[sein]] و[[haben]] والأفعال الناقصة، حيث يُفضَّل [[Präteritum]] حتى في المحادثة العادية.',
  stats: [
    { value: '2', labelAr: 'فعلان تستخدم صيغتهما دوماً في الكلام (sein/haben)' },
    { value: '1', labelAr: 'نهاية إضافية للأفعال المنتظمة: -te' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich war müde, weil ich die ganze Nacht gearbeitet hatte.',
    ar: 'كنتُ متعباً لأنّني عملتُ طوال الليل.',
  },
  objectivesAr: [
    'تحفظ تصريف [[sein]] و[[haben]] في Präteritum وتستخدمهما في الكلام اليومي.',
    'تكوّن Präteritum للأفعال المنتظمة بإضافة [[-te]] إلى الجذع.',
    'تحفظ تصريف الأفعال الناقصة في Präteritum.',
    'تتعرّف على صيغة Präteritum لأشهر الأفعال الشاذّة.',
  ],

  sections: [
    {
      id: 'sein-haben',
      navLabelAr: 'sein و haben',
      kickerDe: 'sein & haben',
      titleAr: 'الأهمّ أولاً: sein وhaben',
      titleDe: 'war · hatte',
      tone: 'accent',
      introAr: 'خلافاً لمعظم الأفعال، [[sein]] و[[haben]] يُستخدمان في [[Präteritum]] حتى في الحديث اليومي العادي — نادراً ما تسمع [[ich bin gewesen]] بدل [[ich war]].',
      blocks: [
        {
          kind: 'table',
          captionAr: 'تصريف sein وhaben في Präteritum',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'sein → war', lang: 'de', tone: 'accent' },
            { header: 'haben → hatte', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['ich', 'war', 'hatte'],
            ['du', 'warst', 'hattest'],
            ['er, sie, es', 'war', 'hatte'],
            ['wir', 'waren', 'hatten'],
            ['ihr', 'wart', 'hattet'],
            ['sie / Sie', 'waren', 'hatten'],
          ],
          emphasisRows: [0, 2],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'نفس قاعدة ich = er/sie/es',
          bodyAr: 'كما رأيت مع الأفعال الناقصة، صيغة [[ich]] تتطابق دائماً مع [[er/sie/es]] في Präteritum: [[war]]/[[war]]، [[hatte]]/[[hatte]].',
        },
        {
          kind: 'examples',
          titleAr: 'sein وhaben في جمل يومية',
          tone: 'accent',
          items: [
            { badge: 'sein', de: 'Ich **war** gestern krank.', ar: 'كنتُ مريضاً بالأمس.' },
            { badge: 'haben', de: 'Wir **hatten** keine Zeit.', ar: 'لم يكن لدينا وقت.' },
            { badge: 'sein', de: 'Warst du schon mal in Berlin?', ar: 'هل كنتَ في برلين من قبل؟' },
            { badge: 'haben', de: 'Sie **hatte** viele Fragen.', ar: 'كان لديها أسئلة كثيرة.' },
          ],
        },
      ],
    },

    {
      id: 'modalverben',
      navLabelAr: 'الأفعال الناقصة',
      kickerDe: 'Modalverben im Präteritum',
      titleAr: 'الأفعال الناقصة في Präteritum',
      titleDe: 'konnte · musste · wollte',
      tone: 'plum',
      introAr: 'الأفعال الناقصة (الدرس ١١) هي المجموعة الثانية التي تُستخدم في [[Präteritum]] حتى في الكلام اليومي.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الأفعال الناقصة في Präteritum',
          columns: [
            { header: 'المصدر', lang: 'de' },
            { header: 'Präteritum (ich/er)', lang: 'de', tone: 'plum' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['können', 'konnte', 'استطاع'],
            ['müssen', 'musste', 'كان عليه'],
            ['wollen', 'wollte', 'أراد'],
            ['sollen', 'sollte', 'كان ينبغي'],
            ['dürfen', 'durfte', 'كان مسموحاً له'],
            ['mögen', 'mochte', 'أحبّ'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'حرف العلّة يعود إلى أصله',
          bodyAr: 'لاحظ أن حرف العلّة المتغيّر في المضارع ([[kann]]، [[muss]]) **يختفي** في Präteritum ويعود الجذع الأصلي: [[können]] → [[konnte]] (ليس [[kannte]])، [[müssen]] → [[musste]].',
        },
        {
          kind: 'examples',
          titleAr: 'الأفعال الناقصة في Präteritum',
          tone: 'plum',
          items: [
            { badge: 'können', de: 'Ich **konnte** gestern nicht kommen.', ar: 'لم أستطع الحضور بالأمس.' },
            { badge: 'müssen', de: 'Wir **mussten** früh aufstehen.', ar: 'كان علينا الاستيقاظ باكراً.' },
            { badge: 'wollen', de: 'Sie **wollte** Ärztin werden.', ar: 'أرادت أن تصبح طبيبة.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بالصيغة الصحيحة',
          exercises: [
            {
              id: 'gr18-p1-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل بصيغة sein المناسبة',
              sentenceDe: 'Ich ___ letztes Jahr in Ägypten.',
              acceptedAnswers: ['war'],
              explanationAr: 'مع [[ich]]: [[war]].',
            },
            {
              id: 'gr18-p1-fill2',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل بصيغة können المناسبة',
              sentenceDe: 'Er ___ nicht schwimmen.',
              acceptedAnswers: ['konnte'],
              explanationAr: 'مع [[er]]: [[konnte]].',
            },
          ],
        },
      ],
    },

    {
      id: 'regular-verbs',
      navLabelAr: 'الأفعال المنتظمة',
      kickerDe: 'regelmäßige Verben',
      titleAr: 'الأفعال المنتظمة',
      titleDe: 'Stamm + te',
      tone: 'highlight',
      introAr: 'الفعل المنتظم في Präteritum يأخذ [[-te-]] بعد الجذع مباشرة، ثم نهاية حسب الضمير — هذا هو الشكل الذي تراه غالباً في الكتابة والقصص لا في الحديث.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'تصريف machen في Präteritum',
          columns: [
            { header: 'الضمير', lang: 'de' },
            { header: 'machen', lang: 'de', tone: 'highlight' },
          ],
          rows: [
            ['ich', 'machte'],
            ['du', 'machtest'],
            ['er, sie, es', 'machte'],
            ['wir', 'machten'],
            ['ihr', 'machtet'],
            ['sie / Sie', 'machten'],
          ],
          emphasisRows: [0, 2],
        },
        {
          kind: 'examples',
          titleAr: 'أفعال منتظمة في Präteritum',
          tone: 'highlight',
          items: [
            { badge: 'spielen', de: 'Die Kinder **spielten** im Garten.', ar: 'كان الأطفال يلعبون في الحديقة.' },
            { badge: 'lernen', de: 'Ich **lernte** drei Jahre lang Deutsch.', ar: 'تعلّمتُ الألمانية لمدة ثلاث سنوات.' },
            { badge: 'wohnen', de: 'Früher **wohnte** ich in Kairo.', ar: 'كنتُ أسكن في القاهرة سابقاً.' },
          ],
        },
      ],
    },

    {
      id: 'irregular-verbs',
      navLabelAr: 'الأفعال الشاذّة',
      kickerDe: 'unregelmäßige Verben',
      titleAr: 'الأفعال الشاذّة في Präteritum',
      titleDe: 'ging · kam · sah',
      tone: 'accent',
      introAr: 'نفس الأفعال الشاذّة التي قابلتها في [[Perfekt]] لها صيغة Präteritum خاصة بها أيضاً — غالباً بتغيّر مختلف في حرف العلّة عن Partizip II.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أفعال شاذّة شائعة',
          columns: [
            { header: 'المصدر', lang: 'de' },
            { header: 'Präteritum (ich/er)', lang: 'de', tone: 'accent' },
            { header: 'Partizip II (للمقارنة)', lang: 'de' },
          ],
          rows: [
            ['gehen', 'ging', 'gegangen'],
            ['kommen', 'kam', 'gekommen'],
            ['sehen', 'sah', 'gesehen'],
            ['essen', 'aß', 'gegessen'],
            ['trinken', 'trank', 'getrunken'],
            ['sprechen', 'sprach', 'gesprochen'],
            ['geben', 'gab', 'gegeben'],
            ['fahren', 'fuhr', 'gefahren'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'لا ينتهي الفعل الشاذّ بـ -te',
          bodyAr: 'خلافاً للأفعال المنتظمة، الفعل الشاذّ في Präteritum **لا يأخذ [[-te]]** مع [[ich]] و[[er/sie/es]] — ينتهي بلا نهاية إطلاقاً: [[ich ging]]، [[er kam]]، وليس [[ich ginge]] أو [[er kamte]].',
        },
        {
          kind: 'examples',
          titleAr: 'استخدام شائع: السرد والقصص',
          tone: 'accent',
          items: [
            { badge: 'gehen', de: 'Er **ging** langsam nach Hause.', ar: 'ذهب ببطء إلى البيت.' },
            { badge: 'sehen', de: 'Sie **sah** ihn nicht.', ar: 'لم ترَه.' },
            { badge: 'geben', de: 'Es **gab** viele Menschen im Park.', ar: 'كان هناك أناس كثيرون في الحديقة.' },
          ],
        },
        {
          kind: 'details',
          summaryAr: 'أين أرى Präteritum الأفعال الشاذّة غالباً؟',
          paragraphsAr: [
            'في القصص والأخبار المكتوبة والروايات. في الكلام اليومي، الألمان يفضّلون غالباً [[Perfekt]] لهذه الأفعال ([[ich bin gegangen]] أكثر شيوعاً في الحديث من [[ich ging]])، لكن فهم Präteritum ضروري للقراءة.',
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: طابق المصدر بصيغة Präteritum',
          exercises: [
            {
              id: 'gr18-p2-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر صيغة Präteritum الصحيحة لـ „gehen"',
              questionDe: 'Er ___ ins Kino.',
              options: ['gehte', 'ging', 'ginge', 'gegangen'],
              correctIndex: 1,
              explanationAr: '[[gehen]] → [[ging]] (بلا نهاية إضافية).',
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
      introAr: 'أشهر خطأين: إضافة -te لفعل شاذّ، أو استخدام Perfekt مع sein/haben بدل Präteritum في الحديث اليومي.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich gehte ins Kino.',
              correct: 'Ich ging ins Kino.',
              explanationAr: '[[gehen]] فعل شاذّ؛ لا تُضاف [[-te]] إليه.',
            },
            {
              wrong: 'Ich habe gestern Zeit gehabt.',
              correct: 'Ich hatte gestern Zeit.',
              explanationAr: 'الجملة الأولى سليمة نحوياً لكنها غير طبيعية: مع [[haben]] و[[sein]] يفضّل الألمان [[hatte]]/[[war]] حتى في الكلام اليومي بدل Perfekt (gehabt/gewesen).',
            },
            {
              wrong: 'Ich konntete nicht kommen.',
              correct: 'Ich konnte nicht kommen.',
              explanationAr: 'الأفعال الناقصة في Präteritum تنتهي بـ [[-te]] واحدة لا بتكرارها.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'ich war · ich hatte', hintAr: 'متى تُستخدم؟', backAr: 'دائماً في الكلام اليومي، حتى بدل Perfekt.' },
    { frontDe: 'können → konnte', hintAr: 'ماذا يحدث لحرف العلّة؟', backAr: 'يعود إلى أصله (konnte وليس kannte).' },
    { frontDe: 'machen → machte', hintAr: 'كيف يُكوَّن؟', backAr: 'الجذع + -te + نهاية حسب الضمير.' },
    { frontDe: 'gehen → ging', hintAr: 'هل تُضاف -te؟', backAr: 'لا — الأفعال الشاذّة بلا نهاية -te مع ich/er.' },
  ],

  quiz: [
    {
      id: 'gr18-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الصيغة الصحيحة',
      questionDe: 'Wir ___ gestern keine Zeit.',
      options: ['waren', 'hatten', 'habten', 'seid'],
      correctIndex: 1,
      explanationAr: 'مع [[wir]]: [[hatten]].',
    },
    {
      id: 'gr18-q2',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بصيغة Präteritum من „spielen"',
      sentenceDe: 'Die Kinder ___ im Park.',
      acceptedAnswers: ['spielten'],
      explanationAr: '[[spielen]] منتظم: الجذع + -ten مع [[die Kinder]] (هم).',
    },
    {
      id: 'gr18-q3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر صيغة Präteritum الصحيحة لـ „müssen"',
      questionDe: 'Ich ___ früh aufstehen.',
      options: ['muss', 'musste', 'müsste', 'gemusst'],
      correctIndex: 1,
      explanationAr: 'مع [[ich]]: [[musste]].',
    },
    {
      id: 'gr18-q4',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im Alltag sagt man meistens „ich war" statt „ich bin gewesen".',
      isTrue: true,
      explanationAr: 'صحيح: [[sein]] يُستخدم في Präteritum حتى في الكلام اليومي.',
    },
    {
      id: 'gr18-q5',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق المصدر بصيغة Präteritum (ich/er)',
      pairs: [
        { de: 'gehen', ar: 'ging' },
        { de: 'kommen', ar: 'kam' },
        { de: 'sehen', ar: 'sah' },
        { de: 'essen', ar: 'aß' },
      ],
      explanationAr: 'راجع جدول الأفعال الشاذّة أعلاه إن أخطأت.',
    },
  ],

  cheatSheet: [
    { de: 'ich war · ich hatte', ar: 'sein/haben في Präteritum — تُستخدم دائماً.' },
    { de: 'ich konnte · musste · wollte', ar: 'الأفعال الناقصة في Präteritum — تُستخدم دائماً أيضاً.' },
    { de: 'Stamm + te (machen → machte)', ar: 'الأفعال المنتظمة.' },
    { de: 'gehen → ging · kommen → kam', ar: 'الأفعال الشاذّة — بلا نهاية -te.' },
  ],
}

export default rule
