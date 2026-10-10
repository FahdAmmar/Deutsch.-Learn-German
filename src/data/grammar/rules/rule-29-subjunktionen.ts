import type { GrammarRule } from '@/types'

/**
 * Rule 29 — Subjunktionen: the specific meanings of weil/dass/wenn/obwohl
 * (the roadmap's own title for this rule). dass/weil were already used to
 * establish the verb-final rule in rule 28; this rule reviews them
 * briefly and focuses its new depth on wenn (two uses: conditional +
 * repeated time) and obwohl (concession), plus `ob` as a natural, very
 * common companion to dass (indirect yes/no question vs. statement).
 * `als` (single past "when") is intentionally out of scope — not in the
 * roadmap's list for this rule.
 */
const rule: GrammarRule = {
  id: 'gr-29',
  number: 29,
  slug: '29-subjunktionen',
  level: 'A2',
  termDe: 'Subjunktionen',
  titleAr: 'weil / dass / wenn / obwohl',
  eyebrowAr: 'الدرس الثالث عشر في مستوى A2',
  taglineAr:
    'تعلّمتَ القاعدة العامة للجملة الثانوية في الدرس السابق باستخدام [[dass]] و[[weil]]. الآن ستتعرّف على **معنى واستخدام** كل أداة من أدوات الربط الثانوية الأربع الأساسية بالتفصيل، وتضيف إليها [[wenn]] (إن/عندما) و[[obwohl]] (رغم أنّ) — وكلتاهما تتبعان نفس القاعدة: الفعل في آخر الجملة.',
  stats: [
    { value: '4', labelAr: 'أدوات ربط ثانوية أساسية' },
    { value: '2', labelAr: 'معنيان لـ wenn' },
    { value: '45+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Obwohl es regnet, gehen wir spazieren, weil wir das Wetter mögen.',
    ar: 'رغم أنها تمطر، سنذهب في نزهة، لأننا نحبّ هذا الطقس.',
  },
  objectivesAr: [
    'تراجع [[dass]] و[[weil]] وتضيف إليهما [[ob]] كأداة مشابهة.',
    'تستخدم [[wenn]] بمعنييها: الشرط (إن) والتكرار الزمني (عندما/كلّما).',
    'تستخدم [[obwohl]] للتعبير عن التناقض أو رغم الشيء.',
    'تميّز بسرعة بين الأدوات الأربع حسب المعنى المطلوب.',
  ],

  sections: [
    {
      id: 'recap',
      navLabelAr: 'مراجعة سريعة',
      kickerDe: 'Wiederholung',
      titleAr: 'مراجعة: dass وweil وob',
      titleDe: 'dass · weil · ob',
      tone: 'accent',
      introAr: 'سريعاً: [[dass]] (أنّ) تنقل معلومة أو رأياً، و[[weil]] (لأنّ) تفسّر سبباً. وتنضمّ إليهما هنا أداة جديدة قريبة منهما: [[ob]] (إن/هل) لنقل **سؤال غير مباشر**.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'dass مقابل ob',
          columns: [
            { header: 'الموقف', lang: 'ar' },
            { header: 'الأداة', lang: 'de', tone: 'accent' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['معلومة مؤكّدة', 'dass', 'Ich weiß, dass er kommt.'],
            ['سؤال نعم/لا غير مباشر', 'ob', 'Ich weiß nicht, ob er kommt.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'ob تُترجم «هل» أو «إن»',
          bodyAr: 'استخدم [[ob]] حين يكون السؤال الأصلي سؤال نعم/لا: [[Kommt er?]] (هل سيأتي؟) تصبح بعد [[Ich weiß nicht, …]]: [[…, ob er kommt.]] — الفعل، كالعادة، في آخر الجملة.',
        },
        {
          kind: 'examples',
          titleAr: 'dass وweil وob جنباً إلى جنب',
          tone: 'accent',
          items: [
            { badge: 'dass', de: 'Ich glaube, dass sie Recht **hat**.', ar: 'أعتقد أنها محقّة.' },
            { badge: 'weil', de: 'Ich bin froh, weil du gekommen **bist**.', ar: 'أنا سعيد لأنك أتيت.' },
            { badge: 'ob', de: 'Weißt du, ob der Laden heute offen **ist**?', ar: 'هل تعرف إن كان المحلّ مفتوحاً اليوم؟' },
          ],
        },
      ],
    },

    {
      id: 'wenn',
      navLabelAr: 'wenn',
      kickerDe: 'wenn',
      titleAr: 'wenn: شرط أم تكرار؟',
      titleDe: 'wenn',
      tone: 'plum',
      introAr: '[[wenn]] لها معنيان شائعان جداً: **الشرط** (إن/إذا)، و**التكرار الزمني** (عندما/كلّما تحدث مراراً). السياق يحسم المقصود.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'معنيا wenn',
          columns: [
            { header: 'المعنى', lang: 'ar' },
            { header: 'مثال', lang: 'de', tone: 'plum' },
            { header: 'الترجمة', lang: 'ar' },
          ],
          rows: [
            ['شرط', 'Wenn ich Zeit habe, rufe ich dich an.', 'إن كان لديّ وقت، سأتّصل بك.'],
            ['تكرار زمني', 'Wenn ich müde bin, trinke ich Kaffee.', 'عندما (كلّما) أتعب، أشرب قهوة.'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'star',
          titleAr: 'wenn يمكن أن تبدأ الجملة كاملة',
          bodyAr: 'لاحظ في الأمثلة أعلاه أن جملة [[wenn]] جاءت **أولاً**، تليها فاصلة ثم الجملة الرئيسية — وفي هذه الحالة ينقلب ترتيب الجملة الرئيسية (فعلها يأتي مباشرة بعد الفاصلة). التفاصيل الكاملة لهذا الترتيب في الدرس القادم ([[Satzstellung]]).',
        },
        {
          kind: 'examples',
          titleAr: 'wenn في جمل متنوّعة',
          tone: 'plum',
          items: [
            { badge: 'شرط', de: 'Wenn es morgen regnet, bleiben wir zu Hause.', ar: 'إن أمطرت غداً، سنبقى في البيت.' },
            { badge: 'شرط', de: 'Ich helfe dir, wenn du willst.', ar: 'سأساعدك إن أردتَ.' },
            { badge: 'تكرار', de: 'Wenn ich Zeit habe, lese ich gern.', ar: 'عندما يكون لديّ وقت، أحبّ القراءة.' },
            { badge: 'تكرار', de: 'Immer wenn sie kommt, bringt sie Kuchen mit.', ar: 'كلّما أتت، تحضر كعكاً معها.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بجملة wenn',
          exercises: [
            {
              id: 'gr29-p1-order1',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات',
              words: ['dich', 'Zeit', 'Wenn', 'habe,', 'ich', 'ich', 'an.', 'rufe'],
              correctOrder: [2, 4, 1, 3, 7, 5, 0, 6],
              explanationAr: '[[Wenn ich Zeit habe, rufe ich dich an.]]',
            },
          ],
        },
      ],
    },

    {
      id: 'obwohl',
      navLabelAr: 'obwohl',
      kickerDe: 'obwohl',
      titleAr: 'obwohl: التناقض والتنازل',
      titleDe: 'obwohl',
      tone: 'highlight',
      introAr: '[[obwohl]] (رغم أنّ/مع أنّ) تربط فكرتين متناقضتين — شيء يحدث رغم وجود سبب منطقي يمنعه.',
      blocks: [
        {
          kind: 'examples',
          titleAr: 'obwohl في جمل',
          tone: 'highlight',
          items: [
            { badge: 'obwohl', de: 'Ich gehe joggen, obwohl es kalt **ist**.', ar: 'سأذهب للركض رغم أن الجوّ بارد.' },
            { badge: 'obwohl', de: 'Sie hat die Prüfung bestanden, obwohl sie nicht viel gelernt **hat**.', ar: 'نجحت في الامتحان رغم أنها لم تدرس كثيراً.' },
            { badge: 'obwohl', de: 'Obwohl er müde war, ist er mitgekommen.', ar: 'رغم أنه كان متعباً، إلّا أنه رافقنا.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'compass',
          titleAr: 'obwohl مقابل aber: نفس الفكرة، بناء مختلف',
          bodyAr: 'يمكنك التعبير عن نفس التناقض بطريقتين: [[Es ist kalt, aber ich gehe joggen.]] (جملتان مستقلّتان، الفعل في موضعه الثاني في كلتيهما) أو [[Ich gehe joggen, obwohl es kalt ist.]] (جملة ثانوية، الفعل في النهاية). المعنى قريب، لكن البناء النحوي مختلف تماماً.',
        },
      ],
    },

    {
      id: 'decision',
      navLabelAr: 'أيّ أداة أختار؟',
      kickerDe: 'Welche Subjunktion?',
      titleAr: 'ملخّص: أيّ أداة لأيّ معنى',
      titleDe: 'Übersicht',
      tone: 'error',
      introAr: 'هذا الجدول يجمع الأدوات الأربع (مع ob) ليكون مرجعك السريع عند الشكّ.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'ملخّص أدوات الجملة الثانوية',
          columns: [
            { header: 'الأداة', lang: 'de', tone: 'error' },
            { header: 'المعنى', lang: 'ar' },
            { header: 'تُستخدم بعد', lang: 'ar' },
          ],
          rows: [
            ['dass', 'أنّ', 'wissen, glauben, sagen, hoffen…'],
            ['weil', 'لأنّ', 'سؤال Warum؟'],
            ['ob', 'هل / إن', 'سؤال نعم/لا غير مباشر'],
            ['wenn', 'إن / عندما', 'شرط أو تكرار زمني'],
            ['obwohl', 'رغم أنّ', 'تناقض أو تنازل'],
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين شامل: اختر الأداة المناسبة',
          exercises: [
            {
              id: 'gr29-p2-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الأداة المناسبة',
              questionDe: 'Ich gehe spazieren, ___ es regnet.',
              options: ['dass', 'weil', 'obwohl', 'ob'],
              correctIndex: 2,
              explanationAr: 'تناقض (يمشي رغم المطر) → [[obwohl]].',
            },
            {
              id: 'gr29-p2-mc2',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الأداة المناسبة',
              questionDe: 'Ich weiß nicht, ___ das Geschäft heute geöffnet ist.',
              options: ['dass', 'ob', 'weil', 'wenn'],
              correctIndex: 1,
              explanationAr: 'سؤال نعم/لا غير مباشر → [[ob]].',
            },
            {
              id: 'gr29-p2-mc3',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الأداة المناسبة',
              questionDe: '___ ich müde bin, trinke ich Kaffee.',
              options: ['Obwohl', 'Dass', 'Wenn', 'Weil'],
              correctIndex: 2,
              explanationAr: 'تكرار زمني (كلّما) → [[Wenn]].',
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
      introAr: 'أشهر خطأين: الخلط بين ob وwenn، واستخدام aber بدل obwohl في بناء جملة ثانوية.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich weiß nicht, wenn er kommt. (سؤال غير مباشر)',
              correct: 'Ich weiß nicht, ob er kommt.',
              explanationAr: 'للسؤال عن نعم/لا استخدم [[ob]]، وليس [[wenn]].',
            },
            {
              wrong: 'Obwohl es regnet, aber ich gehe spazieren.',
              correct: 'Obwohl es regnet, gehe ich spazieren.',
              explanationAr: 'لا تجمع [[obwohl]] و[[aber]] في نفس الجملة؛ [[obwohl]] وحدها تكفي للتعبير عن التناقض.',
            },
            {
              wrong: 'Wenn ich bin müde, trinke ich Kaffee.',
              correct: 'Wenn ich müde bin, trinke ich Kaffee.',
              explanationAr: 'الفعل [[bin]] ينتقل إلى آخر جملة [[wenn]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'dass', hintAr: 'ماذا تعني؟', backAr: 'أنّ — لنقل معلومة أو رأي.' },
    { frontDe: 'weil', hintAr: 'ماذا تعني؟', backAr: 'لأنّ — للسبب.' },
    { frontDe: 'ob', hintAr: 'ماذا تعني؟', backAr: 'هل / إن — لسؤال نعم/لا غير مباشر.' },
    { frontDe: 'wenn', hintAr: 'معنيان؟', backAr: 'شرط (إن) أو تكرار زمني (عندما/كلّما).' },
    { frontDe: 'obwohl', hintAr: 'ماذا تعني؟', backAr: 'رغم أنّ — تناقض أو تنازل.' },
    { frontDe: 'obwohl … aber', hintAr: 'هل يصحّ الجمع بينهما؟', backAr: 'لا — obwohl وحدها كافية.' },
  ],

  quiz: [
    {
      id: 'gr29-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة المناسبة',
      questionDe: 'Ich bleibe zu Hause, ___ ich krank bin.',
      options: ['dass', 'weil', 'ob', 'obwohl'],
      correctIndex: 1,
      explanationAr: 'سبب → [[weil]].',
    },
    {
      id: 'gr29-q2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة المناسبة',
      questionDe: 'Sie geht zur Arbeit, ___ sie krank ist.',
      options: ['weil', 'dass', 'obwohl', 'wenn'],
      correctIndex: 2,
      explanationAr: 'تناقض (تذهب رغم المرض) → [[obwohl]].',
    },
    {
      id: 'gr29-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„wenn" kann sowohl eine Bedingung als auch eine Wiederholung ausdrücken.',
      isTrue: true,
      explanationAr: 'صحيح: wenn للشرط أو للتكرار الزمني.',
    },
    {
      id: 'gr29-q4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بالأداة المناسبة (سؤال غير مباشر)',
      sentenceDe: 'Ich frage mich, ___ er heute kommt.',
      acceptedAnswers: ['ob'],
      explanationAr: 'سؤال نعم/لا غير مباشر → [[ob]].',
    },
    {
      id: 'gr29-q5',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['kalt', 'Obwohl', 'ist,', 'spazieren.', 'es', 'gehen', 'wir'],
      correctOrder: [1, 4, 0, 2, 6, 5, 3],
      explanationAr: '[[Obwohl es kalt ist, gehen wir spazieren.]]',
    },
    {
      id: 'gr29-q6',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق الأداة بمعناها',
      pairs: [
        { de: 'dass', ar: 'أنّ' },
        { de: 'weil', ar: 'لأنّ' },
        { de: 'ob', ar: 'هل / إن' },
        { de: 'obwohl', ar: 'رغم أنّ' },
      ],
      explanationAr: 'راجع جدول الملخّص أعلاه إن أخطأت.',
    },
  ],

  cheatSheet: [
    { de: 'dass', ar: 'أنّ (معلومة/رأي).' },
    { de: 'weil', ar: 'لأنّ (سبب).' },
    { de: 'ob', ar: 'هل / إن (سؤال غير مباشر).' },
    { de: 'wenn', ar: 'إن (شرط) أو عندما/كلّما (تكرار).' },
    { de: 'obwohl', ar: 'رغم أنّ (تناقض).' },
    { de: 'الفعل دائماً في آخر الجملة', ar: 'مع كل الأدوات الخمس أعلاه.' },
  ],
}

export default rule
