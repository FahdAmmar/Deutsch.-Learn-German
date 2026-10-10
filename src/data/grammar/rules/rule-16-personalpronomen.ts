import type { GrammarRule } from '@/types'

/**
 * Rule 16 — object personal pronouns (Akkusativ + Dativ), closing the A1
 * case arc that started with rule 01's subject pronouns. Ties directly
 * back to rule 01, 09, and 15.
 */
const rule: GrammarRule = {
  id: 'gr-16',
  number: 16,
  slug: '16-personalpronomen',
  level: 'A1',
  termDe: 'Personalpronomen',
  titleAr: 'الضمائر في Akkusativ/Dativ',
  eyebrowAr: 'الدرس السادس عشر — خاتمة قواعد A1',
  taglineAr:
    'في الدرس الأول تعلّمتَ ضمائر الفاعل ([[ich]]، [[du]]، [[er]]…). الآن، بعد أن أتقنتَ [[Akkusativ]] و[[Dativ]]، تكتمل الصورة: لهذه الضمائر أشكال مختلفة أيضاً حين تكون **مفعولاً به**، تماماً كما لـ«ني/ه/ها» أشكال خاصة بالعربية.',
  stats: [
    { value: '9', labelAr: 'ضمائر في Akkusativ' },
    { value: '9', labelAr: 'ضمائر في Dativ' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich sehe dich. Kannst du mir helfen?',
    ar: 'أراك. هل تستطيع مساعدتي؟',
  },
  objectivesAr: [
    'تحفظ ضمائر Akkusativ التسعة ([[mich]]، [[dich]]، [[ihn]]…).',
    'تحفظ ضمائر Dativ التسعة ([[mir]]، [[dir]]، [[ihm]]…).',
    'تستبدل اسماً مذكوراً سابقاً بالضمير المناسب في الحالة الصحيحة.',
    'تراجع منظومة الحالات الثلاث كاملة: Nominativ → Akkusativ → Dativ.',
  ],

  sections: [
    {
      id: 'akkusativ-pronouns',
      navLabelAr: 'ضمائر Akkusativ',
      kickerDe: 'Akkusativ-Pronomen',
      titleAr: 'ضمائر Akkusativ',
      titleDe: 'mich · dich · ihn · sie · es …',
      tone: 'accent',
      introAr: 'حين يكون المفعول به المباشر شخصاً ذُكر سابقاً، نستبدله بضمير في Akkusativ بدل تكرار اسمه.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'ضمائر Akkusativ',
          columns: [
            { header: 'Nominativ', lang: 'de' },
            { header: 'Akkusativ', lang: 'de', tone: 'accent' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['ich', 'mich', 'ني (إيّاي)'],
            ['du', 'dich', 'ك (إيّاك)'],
            ['er', 'ihn', 'ه (إيّاه)'],
            ['sie (هي)', 'sie', 'ها (إيّاها)'],
            ['es', 'es', 'ه (محايد)'],
            ['wir', 'uns', 'نا (إيّانا)'],
            ['ihr', 'euch', 'كم (إيّاكم)'],
            ['sie (هم)', 'sie', 'هم (إيّاهم)'],
            ['Sie', 'Sie', 'كم (رسمي)'],
          ],
        },
        {
          kind: 'compare',
          titleAr: 'من الاسم إلى الضمير',
          modes: [
            {
              labelAr: 'بالاسم',
              captionAr: 'أول ذكر: نستخدم الاسم كاملاً.',
              parts: [{ text: 'Ich sehe' }, { text: 'den Lehrer.', tone: 'accent' }],
            },
            {
              labelAr: 'بالضمير',
              captionAr: 'بعد الذكر الأول: نستبدله بالضمير المناسب.',
              parts: [{ text: 'Ich sehe' }, { text: 'ihn.', tone: 'plum' }],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'ضمائر Akkusativ في جمل',
          tone: 'accent',
          items: [
            { badge: 'mich', de: 'Verstehst du **mich**?', ar: 'هل تفهمني؟' },
            { badge: 'dich', de: 'Ich liebe **dich**.', ar: 'أحبّك.' },
            { badge: 'ihn', de: 'Kennst du ihn? — Ja, ich kenne **ihn**.', ar: 'هل تعرفه؟ — نعم، أعرفه.' },
            { badge: 'sie', de: 'Ich sehe **sie** jeden Tag.', ar: 'أراها كل يوم.' },
            { badge: 'uns', de: 'Er besucht **uns** morgen.', ar: 'هو يزورنا غداً.' },
          ],
        },
      ],
    },

    {
      id: 'dativ-pronouns',
      navLabelAr: 'ضمائر Dativ',
      kickerDe: 'Dativ-Pronomen',
      titleAr: 'ضمائر Dativ',
      titleDe: 'mir · dir · ihm · ihr · uns …',
      tone: 'plum',
      introAr: 'بنفس المبدأ، ضمائر Dativ تحلّ محلّ الشخص المستفيد من الفعل أو الذي وُجِّه إليه.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'ضمائر Dativ',
          columns: [
            { header: 'Nominativ', lang: 'de' },
            { header: 'Dativ', lang: 'de', tone: 'plum' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['ich', 'mir', 'لي'],
            ['du', 'dir', 'لك'],
            ['er', 'ihm', 'له'],
            ['sie (هي)', 'ihr', 'لها'],
            ['es', 'ihm', 'له (محايد)'],
            ['wir', 'uns', 'لنا'],
            ['ihr', 'euch', 'لكم'],
            ['sie (هم)', 'ihnen', 'لهم'],
            ['Sie', 'Ihnen', 'لكم (رسمي)'],
          ],
        },
        {
          kind: 'examples',
          titleAr: 'ضمائر Dativ في جمل',
          tone: 'plum',
          items: [
            { badge: 'mir', de: 'Kannst du **mir** helfen?', ar: 'هل تستطيع مساعدتي؟' },
            { badge: 'dir', de: 'Das Buch gefällt **dir**, oder?', ar: 'الكتاب يعجبك، أليس كذلك؟' },
            { badge: 'ihm', de: 'Ich danke **ihm** für die Hilfe.', ar: 'أشكره على المساعدة.' },
            { badge: 'ihr', de: 'Ich schreibe **ihr** eine E-Mail.', ar: 'أكتب لها بريداً إلكترونياً.' },
            { badge: 'uns', de: 'Er zeigt **uns** den Weg.', ar: 'هو يُرينا الطريق.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'star',
          titleAr: 'es → ihm في Dativ',
          bodyAr: 'لاحظ أن [[es]] (محايد) يتحوّل إلى [[ihm]] في Dativ — نفس شكل [[er]]. هذا التطابق طبيعي: أداة [[das]] نفسها تتحوّل إلى [[dem]] في Dativ، وهي نفس أداة [[der]] المذكّر.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: استبدل الاسم بالضمير',
          exercises: [
            {
              id: 'gr16-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'استبدل: Ich sehe den Lehrer. → Ich sehe ___.',
              sentenceDe: 'Ich sehe ___.',
              acceptedAnswers: ['ihn'],
              hint: 'der Lehrer (مذكّر) في Akkusativ',
              explanationAr: '[[der Lehrer]] مذكّر، فضميره في Akkusativ هو [[ihn]].',
            },
            {
              id: 'gr16-p1-fill2',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'أكمل: Kannst du ___ helfen? (لي)',
              sentenceDe: 'Kannst du ___ helfen?',
              acceptedAnswers: ['mir'],
              hint: 'ich في Dativ',
              explanationAr: '[[helfen]] يحتاج Dativ، وضمير المتكلّم فيه [[mir]].',
            },
            {
              id: 'gr16-p1-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'استبدل «die Kinder» بالضمير المناسب (Akkusativ)',
              questionDe: 'Ich sehe ___.',
              options: ['ihnen', 'sie', 'ihn', 'es'],
              correctIndex: 1,
              explanationAr: 'الجمع في Akkusativ ضميره [[sie]] (نفس شكل الجمع في Nominativ).',
            },
          ],
        },
      ],
    },

    {
      id: 'recap',
      navLabelAr: 'مراجعة شاملة',
      kickerDe: 'Gesamtüberblick',
      titleAr: 'مراجعة: منظومة الحالات الثلاث كاملة',
      titleDe: 'Nominativ → Akkusativ → Dativ',
      tone: 'highlight',
      introAr: 'هذا الجدول يجمع كل ما تعلّمته منذ الدرس الأول حتى الآن — استخدمه كمرجع سريع كلّما احتجت.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الضمائر عبر الحالات الثلاث',
          columns: [
            { header: 'Nominativ', lang: 'de', tone: 'accent' },
            { header: 'Akkusativ', lang: 'de', tone: 'plum' },
            { header: 'Dativ', lang: 'de', tone: 'highlight' },
          ],
          rows: [
            ['ich', 'mich', 'mir'],
            ['du', 'dich', 'dir'],
            ['er', 'ihn', 'ihm'],
            ['sie', 'sie', 'ihr'],
            ['es', 'es', 'ihm'],
            ['wir', 'uns', 'uns'],
            ['ihr', 'euch', 'euch'],
            ['sie (هم)', 'sie', 'ihnen'],
            ['Sie', 'Sie', 'Ihnen'],
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'sparkles',
          titleAr: 'بهذا تكتمل قواعد A1 الأساسية',
          bodyAr: 'من [[Personalpronomen]] (الدرس ٠١) إلى هنا، بنيتَ منظومة الحالات الإعرابية كاملة: من يفعل ([[Nominativ]])، وعلى من يقع الفعل مباشرة ([[Akkusativ]])، ولمن يُوجَّه أو يستفيد ([[Dativ]]) — وهذا هو الأساس الذي ستُبنى عليه كل قواعد A2 القادمة.',
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
      introAr: 'أشهر خطأ هو الخلط بين ضمير Akkusativ وDativ لنفس الشخص.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Kannst du mich helfen?',
              correct: 'Kannst du mir helfen?',
              explanationAr: '[[helfen]] يحتاج Dativ، فالضمير الصحيح [[mir]] وليس [[mich]].',
            },
            {
              wrong: 'Ich sehe ihm jeden Tag.',
              correct: 'Ich sehe ihn jeden Tag.',
              explanationAr: '[[sehen]] يحتاج Akkusativ، فالضمير الصحيح [[ihn]] وليس [[ihm]].',
            },
            {
              wrong: 'Das Buch gefällt dich.',
              correct: 'Das Buch gefällt dir.',
              explanationAr: '[[gefallen]] يحتاج Dativ: [[dir]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'mich / dich / ihn / sie / es', hintAr: 'أيّ حالة؟', backAr: 'Akkusativ — المفعول به المباشر.' },
    { frontDe: 'mir / dir / ihm / ihr / ihm', hintAr: 'أيّ حالة؟', backAr: 'Dativ — المفعول به غير المباشر.' },
    { frontDe: 'es → ihm', hintAr: 'في أيّ حالة يتغيّر هكذا؟', backAr: 'في Dativ، مثل تحوّل das إلى dem.' },
    { frontDe: 'Kannst du mir helfen?', hintAr: 'لماذا mir وليس mich؟', backAr: 'helfen يحتاج Dativ دائماً.' },
    { frontDe: 'Nominativ → Akkusativ → Dativ', hintAr: 'ما الترتيب الذي تعلّمته؟', backAr: 'فاعل ← مفعول مباشر ← مفعول غير مباشر — أساس قواعد A1.' },
  ],

  quiz: [
    {
      id: 'gr16-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الضمير الصحيح',
      questionDe: 'Ich liebe ___. (du)',
      options: ['du', 'dich', 'dir', 'dein'],
      correctIndex: 1,
      explanationAr: '[[lieben]] + Akkusativ → [[dich]].',
    },
    {
      id: 'gr16-q2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الضمير الصحيح',
      questionDe: 'Kannst du ___ helfen? (ich)',
      options: ['ich', 'mich', 'mir', 'mein'],
      correctIndex: 2,
      explanationAr: '[[helfen]] + Dativ → [[mir]].',
    },
    {
      id: 'gr16-q3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'استبدل: Ich sehe die Kinder. → Ich sehe ___.',
      sentenceDe: 'Ich sehe ___.',
      acceptedAnswers: ['sie'],
      explanationAr: 'الجمع في Akkusativ ضميره [[sie]].',
    },
    {
      id: 'gr16-q4',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„es" wird im Dativ zu „ihm".',
      isTrue: true,
      explanationAr: 'صحيح: [[es]] → [[ihm]] في Dativ.',
    },
    {
      id: 'gr16-q5',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الضمير بحالته ومعناه',
      pairs: [
        { de: 'mich', ar: 'Akkusativ — إيّاي' },
        { de: 'mir', ar: 'Dativ — لي' },
        { de: 'ihn', ar: 'Akkusativ — إيّاه' },
        { de: 'ihm', ar: 'Dativ — له' },
      ],
      explanationAr: 'راجع الجدولين أعلاه إن أخطأت.',
    },
    {
      id: 'gr16-q6',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['dir', 'Das', 'gefällt', 'Buch'],
      correctOrder: [1, 3, 2, 0],
      explanationAr: '[[Das Buch gefällt dir.]] — الفاعل Nominativ (Buch) والمفعول Dativ (dir).',
    },
  ],

  cheatSheet: [
    { de: 'mich · dich · ihn · sie · es · uns · euch · sie · Sie', ar: 'ضمائر Akkusativ.' },
    { de: 'mir · dir · ihm · ihr · ihm · uns · euch · ihnen · Ihnen', ar: 'ضمائر Dativ.' },
    { de: 'es → ihm (Dativ)', ar: 'تطابق مع das → dem.' },
    { de: 'Nominativ → Akkusativ → Dativ', ar: 'خارطة الحالات الثلاث التي أتقنتها في A1.' },
  ],
}

export default rule
