import type { GrammarRule } from '@/types'

/**
 * Rule 31 — Vergangenheit: the Perfekt-vs-Präteritum usage decision that
 * rules 17 and 18 both explicitly deferred to here. This rule teaches no
 * new forms — it is pure decision-practice built entirely on rules 17/18.
 */
const rule: GrammarRule = {
  id: 'gr-31',
  number: 31,
  slug: '31-vergangenheit',
  level: 'A2',
  termDe: 'Vergangenheit',
  titleAr: 'Perfekt vs. Präteritum',
  eyebrowAr: 'الدرس الخامس عشر في مستوى A2',
  taglineAr:
    'تعرف الآن كيف تكوّن [[Perfekt]] و[[Präteritum]] كليهما. السؤال العملي المتبقّي: **أيّهما تستخدم فعلياً** حين تتحدّث أو تكتب؟ الجواب بسيط نسبياً، مع استثناء واحد مهمّ جداً يجب حفظه.',
  stats: [
    { value: '1', labelAr: 'قاعدة أساسية: الكلام Perfekt، الكتابة Präteritum' },
    { value: '3', labelAr: 'استثناءات تفضّل Präteritum حتى في الكلام' },
    { value: '25+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich war gestern im Kino. Ich habe einen guten Film gesehen.',
    ar: 'كنتُ في السينما أمس. شاهدتُ فيلماً جيّداً.',
  },
  objectivesAr: [
    'تختار Perfekt للكلام المنطوق وPräteritum للكتابة الرسمية والسرد.',
    'تتذكّر أن sein وhaben والأفعال الناقصة تُفضَّل بصيغة Präteritum حتى في الكلام.',
    'تحافظ على زمن واحد متّسق داخل القصة أو النصّ نفسه.',
  ],

  sections: [
    {
      id: 'general-rule',
      navLabelAr: 'القاعدة العامة',
      kickerDe: 'Sprechen vs. Schreiben',
      titleAr: 'القاعدة العامة: الكلام مقابل الكتابة',
      titleDe: 'mündlich vs. schriftlich',
      tone: 'accent',
      introAr:
        'في المحادثة اليومية، يفضّل الألمان [[Perfekt]] لكل الأفعال تقريباً. في الكتابة — القصص، الأخبار، التقارير الرسمية — يُفضَّل [[Präteritum]]. كلاهما يُترجم إلى الماضي البسيط بالعربية؛ الفرق هنا **أسلوبي** لا في المعنى.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أين تُستخدم كل صيغة؟',
          columns: [
            { header: 'السياق', lang: 'ar' },
            { header: 'الزمن المفضّل', lang: 'de', tone: 'accent' },
          ],
          rows: [
            ['محادثة يومية، رسالة قصيرة', 'Perfekt'],
            ['قصّة، رواية، حكاية', 'Präteritum'],
            ['خبر صحفي، تقرير رسمي', 'Präteritum'],
            ['دردشة نصّية (واتساب مثلاً)', 'Perfekt'],
          ],
        },
        {
          kind: 'compare',
          titleAr: 'نفس الحدث، سياقان مختلفان',
          modes: [
            {
              labelAr: 'محادثة',
              captionAr: 'صديقان يتحدّثان — Perfekt.',
              parts: [{ text: 'Ich' }, { text: 'habe', tone: 'accent' }, { text: 'gestern einen Film' }, { text: 'gesehen.', tone: 'plum' }],
            },
            {
              labelAr: 'كتابة (قصّة)',
              captionAr: 'نفس الجملة في رواية أو مقالة — Präteritum.',
              parts: [{ text: 'Ich' }, { text: 'sah', tone: 'accent' }, { text: 'gestern einen Film.' }],
            },
          ],
        },
      ],
    },

    {
      id: 'exceptions',
      navLabelAr: 'الاستثناء المهمّ',
      kickerDe: 'sein, haben, Modalverben',
      titleAr: 'الاستثناء: sein وhaben والأفعال الناقصة',
      titleDe: 'war · hatte · konnte…',
      tone: 'plum',
      introAr:
        'حتى في **الكلام المنطوق**، يفضّل الألمان [[Präteritum]] مع ثلاثة أفعال شائعة جداً: [[sein]] ([[war]])، [[haben]] ([[hatte]])، والأفعال الناقصة ([[konnte]]، [[musste]]…). صيغة Perfekt لها ([[bin gewesen]]، [[habe gehabt]]) صحيحة لكنها **أثقل وأقلّ استخداماً** في الكلام اليومي.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الصيغة المفضّلة حتى في الكلام',
          columns: [
            { header: 'الفعل', lang: 'de' },
            { header: 'Präteritum (مفضّلة)', lang: 'de', tone: 'plum' },
            { header: 'Perfekt (صحيحة، أقلّ استخداماً)', lang: 'de' },
          ],
          rows: [
            ['sein', 'war', 'bin/ist gewesen'],
            ['haben', 'hatte', 'habe/hat gehabt'],
            ['können', 'konnte', 'habe gekonnt'],
            ['müssen', 'musste', 'habe gemusst'],
            ['wollen', 'wollte', 'habe gewollt'],
          ],
          emphasisRows: [0, 1],
        },
        {
          kind: 'examples',
          titleAr: 'في كلام يومي طبيعي',
          tone: 'plum',
          items: [
            { badge: 'sein', de: 'Ich war gestern beim Arzt.', ar: 'كنتُ عند الطبيب أمس.' },
            { badge: 'haben', de: 'Wir hatten keine Zeit.', ar: 'لم يكن لدينا وقت.' },
            { badge: 'können', de: 'Ich konnte nicht kommen.', ar: 'لم أستطع الحضور.' },
            { badge: 'müssen', de: 'Sie musste früh aufstehen.', ar: 'كان عليها الاستيقاظ باكراً.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'لماذا هذا الاستثناء؟',
          bodyAr: 'صيغة Perfekt لهذه الأفعال ([[bin gewesen]]، [[habe gehabt]]) تبدو ثقيلة وغير طبيعية في الحديث السريع، فاختصر الألمان الطريق بإبقاء [[Präteritum]] البسيط لها فقط — بينما بقية الأفعال تتبع القاعدة العامة (Perfekt في الكلام).',
        },
      ],
    },

    {
      id: 'consistency',
      navLabelAr: 'الاتّساق',
      kickerDe: 'Konsistenz',
      titleAr: 'لا تخلط بين الزمنين في نفس النصّ',
      titleDe: 'ein Text, eine Zeitform',
      tone: 'highlight',
      introAr: 'إذا بدأتَ قصّة أو فقرة بـ [[Präteritum]]، حافظ عليه حتى نهايتها (باستثناء الحوار المباشر المقتبس، الذي قد يستخدم Perfekt). التبديل العشوائي بين الزمنين يبدو مربكاً للقارئ.',
      blocks: [
        {
          kind: 'examples',
          titleAr: 'نصّ متّسق بـ Präteritum',
          tone: 'highlight',
          items: [
            {
              badge: 'سرد',
              de: 'Es war einmal ein Mann. Er wohnte in einem kleinen Dorf. Eines Tages ging er in die Stadt.',
              ar: 'كان يا ما كان رجل. كان يسكن في قرية صغيرة. في يوم من الأيام ذهب إلى المدينة.',
            },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: اختر الزمن المناسب للسياق',
          exercises: [
            {
              id: 'gr31-p1-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'تتحدّث مع صديق عمّا فعلتَه أمس. أيّ جملة أنسب؟',
              questionDe: '',
              options: ['Ich sah gestern einen Film.', 'Ich habe gestern einen Film gesehen.', 'Ich sehe gestern einen Film.', 'Ich werde gestern einen Film sehen.'],
              correctIndex: 1,
              explanationAr: 'محادثة يومية → [[Perfekt]].',
            },
            {
              id: 'gr31-p1-mc2',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'أيّ صيغة أكثر طبيعية في الكلام، رغم صحّة الاثنتين؟',
              questionDe: '',
              options: ['Ich bin gestern müde gewesen.', 'Ich war gestern müde.'],
              correctIndex: 1,
              explanationAr: '[[sein]] يُفضَّل بصيغة Präteritum حتى في الكلام.',
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
      introAr: 'هذه ليست أخطاء نحوية بل أخطاء أسلوبية — جمل صحيحة قواعدياً لكنها تبدو غريبة لمتحدّث أصلي.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich bin gestern müde gewesen. (في محادثة عادية)',
              correct: 'Ich war gestern müde.',
              explanationAr: 'صحيحة قواعدياً، لكن Präteritum أطبع هنا مع [[sein]].',
            },
            {
              wrong: 'Gestern habe ich gehabt keine Zeit.',
              correct: 'Gestern hatte ich keine Zeit.',
              explanationAr: '[[haben]] يُفضَّل بصيغة Präteritum حتى في الكلام.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'الكلام', hintAr: 'أيّ زمن؟', backAr: 'Perfekt — لمعظم الأفعال.' },
    { frontDe: 'الكتابة (قصص، أخبار)', hintAr: 'أيّ زمن؟', backAr: 'Präteritum.' },
    { frontDe: 'war · hatte · konnte', hintAr: 'استثناء ماذا؟', backAr: 'sein وhaben والأفعال الناقصة تُفضَّل بصيغة Präteritum حتى في الكلام.' },
  ],

  quiz: [
    {
      id: 'gr31-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'تكتب قصّة قصيرة. أيّ صيغة أنسب؟',
      questionDe: '',
      options: ['Er hat in einem Dorf gewohnt.', 'Er wohnte in einem Dorf.'],
      correctIndex: 1,
      explanationAr: 'الكتابة السردية → [[Präteritum]].',
    },
    {
      id: 'gr31-q2',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im gesprochenen Deutsch sagt man meistens „ich war" statt „ich bin gewesen".',
      isTrue: true,
      explanationAr: 'صحيح: [[sein]] يُفضَّل بصيغة Präteritum حتى في الكلام.',
    },
    {
      id: 'gr31-q3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'تحكي لصديقك ماذا فعلتَ في عطلة نهاية الأسبوع. أيّ صيغة أطبع؟',
      questionDe: '',
      options: ['Ich bin ins Kino gegangen.', 'Ich ging ins Kino.'],
      correctIndex: 0,
      explanationAr: 'محادثة شفهية → [[Perfekt]].',
    },
  ],

  cheatSheet: [
    { de: 'Perfekt', ar: 'الكلام المنطوق — معظم الأفعال.' },
    { de: 'Präteritum', ar: 'الكتابة الرسمية والسرد.' },
    { de: 'war · hatte · konnte/musste/wollte…', ar: 'استثناء: تُفضَّل حتى في الكلام.' },
  ],
}

export default rule
