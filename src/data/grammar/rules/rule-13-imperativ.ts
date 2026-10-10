import type { GrammarRule } from '@/types'

/**
 * Rule 13 — Imperativ (du/ihr/Sie forms). Builds on rule 03's vowel-change
 * families (e→i/ie verbs drop the extra -e and keep the changed stem;
 * a→ä verbs do NOT change in the imperative) and rule 01's du/ihr/Sie
 * distinction.
 */
const rule: GrammarRule = {
  id: 'gr-13',
  number: 13,
  slug: '13-imperativ',
  level: 'A1',
  termDe: 'Imperativ',
  titleAr: 'صيغة الأمر',
  eyebrowAr: 'الدرس الثالث عشر في خارطة القواعد',
  taglineAr:
    'صيغة الأمر تُستخدم للطلب أو التوجيه المباشر. للألمانية ثلاث صيغ أمر — واحدة لكل صيغة مخاطَب تعلّمتها: [[du]]، [[ihr]]، [[Sie]] — وكل صيغة لها قاعدة بسيطة خاصة بها.',
  stats: [
    { value: '3', labelAr: 'صيغ أمر (du · ihr · Sie)' },
    { value: '1', labelAr: 'فعل شاذّ: sein' },
    { value: '30+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Komm bitte her! Seid leise! Nehmen Sie bitte Platz.',
    ar: 'تعالَ من فضلك! كونوا هادئين! تفضّل بالجلوس.',
  },
  objectivesAr: [
    'تكوّن صيغة أمر بـ [[du]] بحذف نهاية [[-st]] من صيغة المضارع.',
    'تكوّن صيغة أمر بـ [[ihr]] بإزالة الضمير فقط من صيغة المضارع.',
    'تكوّن صيغة أمر بـ [[Sie]] بانقلاب الفعل والضمير.',
    'تتعامل بشكل صحيح مع أفعال تغيّر حرف العلّة و[[sein]] الشاذّة في صيغة الأمر.',
  ],

  sections: [
    {
      id: 'du-form',
      navLabelAr: 'أمر du',
      kickerDe: 'du-Imperativ',
      titleAr: 'أمر du: احذف -st',
      titleDe: 'du-Imperativ',
      tone: 'accent',
      introAr: 'خذ صيغة [[du]] من المضارع (الدرس ٠٣) واحذف [[-st]] والضمير [[du]] نفسه.',
      blocks: [
        {
          kind: 'formula',
          tags: [
            { text: 'du kommst', tone: 'accent', noteAr: 'صيغة المضارع' },
            { text: '→' },
            { text: 'Komm!', tone: 'plum', noteAr: 'أمر — بلا st وبلا du' },
          ],
        },
        {
          kind: 'table',
          captionAr: 'من المضارع إلى الأمر (du)',
          columns: [
            { header: 'المضارع', lang: 'de' },
            { header: 'أمر du', lang: 'de', tone: 'accent' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['du kommst', 'Komm!', 'تعالَ!'],
            ['du machst', 'Mach!', 'افعل!'],
            ['du wartest', 'Warte!', 'انتظر!'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'أفعال e→i وe→ie: الجذع المتغيّر بلا نهاية إضافية',
          bodyAr: 'الأفعال التي تغيّر حرف العلّة مع [[du]] (الدرس ٠٣) تستخدم **الجذع المتغيّر نفسه** في الأمر، لكن بلا [[-st]] وبلا [[-e]] إضافية: [[du sprichst]] → [[Sprich!]]، [[du liest]] → [[Lies!]]. أمّا أفعال [[a→ä]] فلا تتغيّر في الأمر إطلاقاً: [[du fährst]] → [[Fahr!]] (وليس [[Fähr!]]).',
        },
        {
          kind: 'examples',
          titleAr: 'أمثلة إضافية',
          tone: 'accent',
          items: [
            { badge: 'e→i', de: '**Sprich** lauter!', ar: 'تحدّث بصوت أعلى!' },
            { badge: 'e→ie', de: '**Lies** den Text!', ar: 'اقرأ النصّ!' },
            { badge: 'a→ä (بلا تغيير)', de: '**Fahr** langsam!', ar: 'قُد ببطء!' },
          ],
        },
      ],
    },

    {
      id: 'ihr-sie-forms',
      navLabelAr: 'أمر ihr و Sie',
      kickerDe: 'ihr- & Sie-Imperativ',
      titleAr: 'أمر ihr وSie',
      titleDe: 'ihr / Sie',
      tone: 'plum',
      introAr: 'الصيغتان الأخريان أبسط من [[du]]: [[ihr]] لا تحتاج أيّ تغيير سوى حذف الضمير، و[[Sie]] تنقلب فقط.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أمر ihr وSie',
          columns: [
            { header: 'الصيغة', lang: 'ar' },
            { header: 'القاعدة', lang: 'ar' },
            { header: 'مثال', lang: 'de' },
          ],
          rows: [
            ['ihr', 'احذف الضمير [[ihr]] فقط', 'Kommt her!'],
            ['Sie', 'اقلب: الفعل ثم Sie (كما في السؤال)', 'Kommen Sie her!'],
          ],
        },
        {
          kind: 'compare',
          titleAr: 'نفس الأمر، ثلاث صيغ',
          modes: [
            {
              labelAr: 'du',
              captionAr: 'صديق واحد: احذف st وdu.',
              parts: [{ text: 'Komm', tone: 'accent' }, { text: 'her!' }],
            },
            {
              labelAr: 'ihr',
              captionAr: 'عدّة أصدقاء: احذف ihr فقط.',
              parts: [{ text: 'Kommt', tone: 'accent' }, { text: 'her!' }],
            },
            {
              labelAr: 'Sie',
              captionAr: 'رسمي: اقلب الفعل والضمير.',
              parts: [{ text: 'Kommen', tone: 'accent' }, { text: 'Sie', tone: 'plum' }, { text: 'her!' }],
            },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'error',
          icon: 'alert',
          titleAr: 'sein: الاستثناء الوحيد',
          bodyAr: '[[sein]] شاذّة تماماً في الأمر: [[Sei still!]] (كن هادئاً)، [[Seid still!]] (كونوا هادئين)، [[Seien Sie still!]] (كن هادئاً — رسمي). احفظها كوحدة منفصلة.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: كوّن صيغة الأمر',
          exercises: [
            {
              id: 'gr13-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'كوّن أمر du من „warten"',
              sentenceDe: '___ bitte!',
              acceptedAnswers: ['Warte', 'warte'],
              hint: 'du wartest → ؟',
              explanationAr: '[[du wartest]] → [[Warte!]] (بلا st وبلا du).',
            },
            {
              id: 'gr13-p1-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'اختر صيغة الأمر الرسمية الصحيحة',
              questionDe: '',
              options: ['Kommen Sie her!', 'Sie kommen her!', 'Komm Sie her!', 'Kommt Sie her!'],
              correctIndex: 0,
              explanationAr: 'أمر [[Sie]]: انقلاب — الفعل أولاً ثم [[Sie]].',
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
      introAr: 'أشهر خطأين: نسيان حذف الضمير مع du، وتطبيق تغيّر a→ä خطأً في الأمر.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Du komm her!',
              correct: 'Komm her!',
              explanationAr: 'الضمير [[du]] يُحذف تماماً في صيغة الأمر.',
            },
            {
              wrong: 'Fähr langsam!',
              correct: 'Fahr langsam!',
              explanationAr: 'أفعال [[a→ä]] لا تتغيّر في الأمر؛ التغيير يقتصر على صيغتَي du وer في المضارع.',
            },
            {
              wrong: 'Kommst du her!',
              correct: 'Komm her!',
              explanationAr: 'أمر [[du]] يحذف [[-st]] بالكامل، لا يبقيها.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'du kommst → Komm!', hintAr: 'ما القاعدة؟', backAr: 'احذف -st والضمير du.' },
    { frontDe: 'ihr kommt → Kommt!', hintAr: 'ما القاعدة؟', backAr: 'احذف الضمير ihr فقط.' },
    { frontDe: 'Sie kommen → Kommen Sie!', hintAr: 'ما القاعدة؟', backAr: 'اقلب: الفعل ثم Sie.' },
    { frontDe: 'du fährst → Fahr!', hintAr: 'هل يتغيّر حرف العلّة؟', backAr: 'لا — أفعال a→ä لا تتغيّر في الأمر.' },
    { frontDe: 'sein → Sei! / Seid! / Seien Sie!', hintAr: 'فعل شاذّ', backAr: 'صيغ أمر خاصة لا تتبع القاعدة العامة.' },
  ],

  quiz: [
    {
      id: 'gr13-q1',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'كوّن أمر du من „machen"',
      sentenceDe: '___ das bitte!',
      acceptedAnswers: ['Mach', 'mach'],
      explanationAr: '[[du machst]] → [[Mach!]]',
    },
    {
      id: 'gr13-q2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر أمر du الصحيح من „sprechen"',
      questionDe: '',
      options: ['Sprech!', 'Sprichst!', 'Sprich!', 'Sprecht!'],
      correctIndex: 2,
      explanationAr: 'الجذع المتغيّر [[sprich-]] بلا نهاية إضافية: [[Sprich!]]',
    },
    {
      id: 'gr13-q3',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Der Sie-Imperativ lautet: Kommen Sie her!',
      isTrue: true,
      explanationAr: 'صحيح: انقلاب الفعل مع [[Sie]].',
    },
    {
      id: 'gr13-q4',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق صيغة المضارع بصيغة الأمر',
      pairs: [
        { de: 'du kommst', ar: 'Komm!' },
        { de: 'ihr kommt', ar: 'Kommt!' },
        { de: 'Sie kommen', ar: 'Kommen Sie!' },
      ],
      explanationAr: 'راجع القواعد الثلاث أعلاه إن أخطأت.',
    },
  ],

  cheatSheet: [
    { de: 'du kommst → Komm!', ar: 'احذف -st وdu.' },
    { de: 'ihr kommt → Kommt!', ar: 'احذف ihr فقط.' },
    { de: 'Sie kommen → Kommen Sie!', ar: 'اقلب الفعل وSie.' },
    { de: 'Sei! · Seid! · Seien Sie!', ar: 'أمر sein الشاذّ.' },
  ],
}

export default rule
