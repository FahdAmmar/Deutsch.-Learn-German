import type { GrammarRule } from '@/types'

/**
 * Rule 07 — Artikel: definite (der/die/das/die) and indefinite
 * (ein/eine/ein) articles, Nominativ only. `kein` is rule 08; Akkusativ
 * endings (den/einen) are rule 09 — neither appears here.
 */
const rule: GrammarRule = {
  id: 'gr-07',
  number: 7,
  slug: '07-artikel',
  level: 'A1',
  termDe: 'Artikel',
  titleAr: 'أدوات التعريف والتنكير',
  eyebrowAr: 'الدرس السابع في خارطة القواعد',
  taglineAr:
    'كل اسم ألماني تقريباً يحتاج أداة تسبقه: **معرّفة** ([[der]]/[[die]]/[[das]]) حين يكون الشيء معروفاً أو مذكوراً سابقاً، أو **منكّرة** ([[ein]]/[[eine]]) حين يُذكر لأول مرة أو بشكل عام.',
  stats: [
    { value: '3', labelAr: 'أشكال للأداة المعرّفة' },
    { value: '2', labelAr: 'أشكال للأداة المنكّرة' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich sehe einen Park. Der Park ist schön.',
    ar: 'أرى حديقة. الحديقة جميلة.',
  },
  objectivesAr: [
    'تفرّق بين متى تستخدم الأداة المعرّفة ومتى تستخدم المنكّرة.',
    'تحفظ أشكال [[ein]]/[[eine]] الثلاثة في [[Nominativ]] ولماذا لا يوجد شكل جمع لها.',
    'تستفيد من إشارات بسيطة (لاحقة الكلمة) للتخمين المبدئي لجنس بعض الأسماء.',
  ],

  sections: [
    {
      id: 'definite-vs-indefinite',
      navLabelAr: 'معرّف أم منكّر',
      kickerDe: 'bestimmt vs. unbestimmt',
      titleAr: 'معرّف أم منكّر؟',
      titleDe: 'der vs. ein',
      tone: 'accent',
      introAr:
        'استخدم الأداة **المنكّرة** ([[ein]]/[[eine]]) أول مرة تذكر فيها شيئاً غير محدَّد. وبعد ذلك، أو حين يكون الشيء معروفاً لكلا المتحدّثين، استخدم الأداة **المعرّفة** ([[der]]/[[die]]/[[das]]).',
      blocks: [
        {
          kind: 'compare',
          titleAr: 'من التنكير إلى التعريف',
          modes: [
            {
              labelAr: 'أول ذكر — منكّر',
              captionAr: 'حديقة غير محدَّدة، تُذكر لأول مرة.',
              parts: [{ text: 'Ich sehe' }, { text: 'einen Park.', tone: 'accent' }],
            },
            {
              labelAr: 'ذكر ثانٍ — معرّف',
              captionAr: 'الآن كلانا يعرف عن أيّ حديقة نتحدّث.',
              parts: [{ text: 'Der Park', tone: 'plum' }, { text: 'ist schön.' }],
            },
          ],
        },
        {
          kind: 'table',
          captionAr: 'الأداتان في Nominativ',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'معرّف', lang: 'de', tone: 'accent' },
            { header: 'منكّر', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['مذكّر', 'der Mann', 'ein Mann'],
            ['مؤنّث', 'die Frau', 'eine Frau'],
            ['محايد', 'das Kind', 'ein Kind'],
            ['جمع', 'die Kinder', '— (بلا أداة)'],
          ],
          emphasisRows: [3],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'alert',
          titleAr: 'لا يوجد ein في الجمع',
          bodyAr:
            '[[ein]] تعني حرفياً «واحد»، ولذلك لا معنى لها في الجمع. الجملة الجمعية المنكّرة تُقال بلا أداة على الإطلاق: [[Ich sehe Kinder.]] (أرى أطفالاً) — وليس [[Ich sehe eine Kinder]].',
        },
        {
          kind: 'examples',
          titleAr: 'أمثلة على الاستخدامين',
          tone: 'accent',
          items: [
            { badge: 'منكّر', de: 'Das ist **eine** Lampe.', ar: 'هذه مصباح.' },
            { badge: 'معرّف', de: '**Die** Lampe ist neu.', ar: 'المصباح جديد.' },
            { badge: 'منكّر', de: 'Das ist **ein** Problem.', ar: 'هذه مشكلة.' },
            { badge: 'جمع بلا أداة', de: 'Ich brauche **Bücher**.', ar: 'أحتاج كتباً.' },
          ],
        },
      ],
    },

    {
      id: 'gender-hints',
      navLabelAr: 'تخمين الجنس',
      kickerDe: 'Genus-Tipps',
      titleAr: 'إشارات لتخمين جنس الاسم',
      titleDe: 'Genus-Signale',
      tone: 'highlight',
      introAr:
        'لا توجد قاعدة تغطّي كل الأسماء، لكن بعض اللواحق تساعد في **تخمين أوّلي** — وتبقى الطريقة الأضمن هي حفظ كل اسم مع أداته منذ البداية.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'إشارات شائعة (ليست قاعدة مطلقة)',
          columns: [
            { header: 'اللاحقة', lang: 'de', tone: 'highlight' },
            { header: 'الجنس الغالب', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['-chen، -lein', 'محايد دائماً', 'das Mädchen'],
            ['-ung، -heit، -keit، -schaft', 'مؤنّث غالباً', 'die Zeitung'],
            ['-er (للمهن والأدوات)', 'مذكّر غالباً', 'der Lehrer'],
            ['-e', 'مؤنّث غالباً', 'die Lampe'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'استثناءات موجودة دائماً',
          bodyAr:
            'هذه إشارات تقريبية فقط: [[der Junge]] (الولد) ينتهي بـ [[-e]] لكنه مذكّر، لأن المعنى (ذكر) يتغلّب على شكل الكلمة. لا تعتمد عليها وحدها أبداً — احفظ الأداة مع كل كلمة جديدة.',
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
      introAr: 'أغلب الأخطاء هنا تأتي من نقل قواعد الإنجليزية (a/an/the) حرفياً، أو حذف الأداة كما في العربية أحياناً.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich sehe eine Kinder.',
              correct: 'Ich sehe Kinder.',
              explanationAr: 'لا وجود لـ [[ein]] في الجمع؛ الجملة الجمعية المنكّرة تُقال بلا أداة.',
            },
            {
              wrong: 'Lehrer ist müde.',
              correct: 'Der Lehrer ist müde.',
              explanationAr: 'الأداة إلزامية مع الاسم المفرد المعرّف في الألمانية.',
            },
            {
              wrong: 'Das ist der Buch.',
              correct: 'Das ist das Buch.',
              explanationAr: '[[Buch]] محايدة، فأداتها [[das]] وليس [[der]].',
            },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: der/die/das أم ein/eine؟',
          exercises: [
            {
              id: 'gr07-p1-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أول مرة تذكر فيها كتاباً في المحادثة',
              questionDe: 'Ich habe ___ Buch gekauft.',
              options: ['das', 'ein', 'die', 'der'],
              correctIndex: 1,
              explanationAr: 'أول ذكر لشيء غير محدَّد → الأداة المنكّرة [[ein]].',
            },
            {
              id: 'gr07-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'أكمل (die Lampe — ذُكرت سابقاً)',
              sentenceDe: '___ Lampe ist sehr schön.',
              acceptedAnswers: ['Die', 'die'],
              explanationAr: 'الشيء معروف الآن (ذُكر سابقاً) → الأداة المعرّفة [[die]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'ein / eine / ein', hintAr: 'متى تُستخدم؟', backAr: 'عند أول ذكر لشيء غير محدَّد، أو للحديث عنه بشكل عام.' },
    { frontDe: 'der / die / das', hintAr: 'متى تُستخدم؟', backAr: 'حين يكون الشيء معروفاً أو ذُكر سابقاً.' },
    { frontDe: 'Kinder (بلا أداة)', hintAr: 'لماذا لا توجد أداة؟', backAr: 'الجمع المنكّر في الألمانية يُقال بلا أداة على الإطلاق — لا يوجد شكل جمع لـ ein.' },
    { frontDe: '-chen / -lein', hintAr: 'أيّ جنس؟', backAr: 'محايد دائماً (das)، بلا استثناء.' },
  ],

  quiz: [
    {
      id: 'gr07-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ أداة مناسبة لأول ذكر؟',
      questionDe: 'Da ist ___ Hund.',
      options: ['der', 'ein', 'die', '(بلا أداة)'],
      correctIndex: 1,
      explanationAr: 'أول ذكر لشيء غير محدَّد → [[ein]].',
    },
    {
      id: 'gr07-q2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Der Plural von „ein" ist „eine": eine Kinder.',
      isTrue: false,
      explanationAr: 'خطأ: لا يوجد شكل جمع لـ [[ein]] — الجمع المنكّر بلا أداة.',
    },
    {
      id: 'gr07-q3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (das Mädchen — بسبب لاحقة -chen)',
      sentenceDe: '___ Mädchen spielt.',
      acceptedAnswers: ['Das', 'das'],
      explanationAr: 'لاحقة [[-chen]] تجعل الاسم محايداً دائماً.',
    },
    {
      id: 'gr07-q4',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الاسم المنكّر بجنسه',
      pairs: [
        { de: 'ein Tisch', ar: 'مذكّر' },
        { de: 'eine Tasche', ar: 'مؤنّث' },
        { de: 'ein Auto', ar: 'محايد' },
      ],
      explanationAr: 'راجع جدول der/die/das وein/eine أعلاه.',
    },
  ],

  cheatSheet: [
    { de: 'der · die · das', ar: 'الأداة المعرّفة: ذُكر سابقاً أو محدَّد.' },
    { de: 'ein/eine → أول ذكر', ar: 'الأداة المنكّرة: شيء جديد أو عام.' },
    { de: 'Kinder (بلا أداة)', ar: 'الجمع المنكّر بلا أداة على الإطلاق.' },
    { de: '-chen/-lein → das', ar: 'إشارة موثوقة: هذه اللواحق محايدة دائماً.' },
  ],
}

export default rule
