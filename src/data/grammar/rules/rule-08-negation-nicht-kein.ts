import type { GrammarRule } from '@/types'

/**
 * Rule 08 — Negation with `nicht` and `kein`. Akkusativ (rule 09) has not
 * been taught yet, so every `kein` example here uses a neuter, feminine,
 * or plural noun (where Nominativ and Akkusativ forms are identical) —
 * `keinen` (masculine Akkusativ) is deliberately never used in this file.
 */
const rule: GrammarRule = {
  id: 'gr-08',
  number: 8,
  slug: '08-negation-nicht-kein',
  level: 'A1',
  termDe: 'Negation: nicht / kein',
  titleAr: 'النفي',
  eyebrowAr: 'الدرس الثامن في خارطة القواعد',
  taglineAr:
    'الألمانية تستخدم أداتين مختلفتين للنفي حسب ما تنفيه: [[nicht]] لنفي الأفعال والصفات والجمل، و[[kein]] لنفي **الأسماء** التي كانت لتأخذ [[ein]] أو بلا أداة. اختيار الأداة الخاطئة من أكثر الأخطاء شيوعاً عند المبتدئين.',
  stats: [
    { value: '2', labelAr: 'أداتا نفي' },
    { value: '1', labelAr: 'قاعدة بسيطة للاختيار بينهما' },
    { value: '30+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich habe kein Auto und ich bin nicht müde.',
    ar: 'لا أملك سيارة، ولستُ متعباً.',
  },
  objectivesAr: [
    'تفرّق بين ما ينفيه [[nicht]] وما ينفيه [[kein]].',
    'تضع [[nicht]] في الموضع الصحيح من الجملة.',
    'تنفي جملة تحتوي اسماً بأداة [[ein]] أو بلا أداة باستخدام [[kein]].',
  ],

  sections: [
    {
      id: 'which-one',
      navLabelAr: 'nicht أم kein',
      kickerDe: 'nicht oder kein?',
      titleAr: 'أيّ أداة نفي أختار؟',
      titleDe: 'nicht vs. kein',
      tone: 'accent',
      introAr:
        'القاعدة الفاصلة بسيطة: هل تنفي **اسماً** كان سيأخذ [[ein]] أو بلا أداة؟ استخدم [[kein]]. هل تنفي أيّ شيء آخر (فعل، صفة، ظرف، أو اسماً بأداة معرّفة)؟ استخدم [[nicht]].',
      blocks: [
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'القاعدة الفاصلة',
          bodyAr:
            '[[kein]] = [[nicht]] + [[ein]] — فكّر بها كاختصار. فإذا كانت الجملة المثبتة ستحتوي [[ein]]/[[eine]] أو بلا أداة (جمع)، فإن نفيها يستخدم [[kein]]/[[keine]]. أمّا كل شيء آخر (الأفعال، الصفات، الأسماء المعرّفة بـ [[der]]/[[die]]/[[das]]) فيُنفى بـ [[nicht]].',
        },
        {
          kind: 'compare',
          titleAr: 'جرّب بنفسك',
          modes: [
            {
              labelAr: 'اسم بـ ein → kein',
              captionAr: '[[Ich habe ein Auto]] → نفيها بـ [[kein]].',
              parts: [{ text: 'Ich habe' }, { text: 'kein', tone: 'accent' }, { text: 'Auto.' }],
            },
            {
              labelAr: 'صفة → nicht',
              captionAr: '[[Ich bin müde]] → نفيها بـ [[nicht]].',
              parts: [{ text: 'Ich bin' }, { text: 'nicht', tone: 'plum' }, { text: 'müde.' }],
            },
          ],
        },
      ],
    },

    {
      id: 'kein',
      navLabelAr: 'kein',
      kickerDe: 'kein',
      titleAr: 'kein: نفي الاسم',
      titleDe: 'kein / keine',
      tone: 'plum',
      introAr:
        '[[kein]] يتصرّف تماماً مثل [[ein]] في أشكاله ([[kein]] للمذكّر والمحايد، [[keine]] للمؤنّث)، لكنه يُضيف أيضاً شكلاً للجمع — وهذا ما لا تملكه [[ein]] أصلاً.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أشكال kein في Nominativ',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'مثبتة', lang: 'de' },
            { header: 'منفية', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['مذكّر', 'ein Hund', 'kein Hund'],
            ['مؤنّث', 'eine Katze', 'keine Katze'],
            ['محايد', 'ein Auto', 'kein Auto'],
            ['جمع', 'Kinder (بلا أداة)', 'keine Kinder'],
          ],
          emphasisRows: [3],
        },
        {
          kind: 'examples',
          titleAr: 'kein في جمل',
          tone: 'plum',
          items: [
            { badge: 'محايد', de: 'Ich habe **kein** Auto.', ar: 'لا أملك سيارة.' },
            { badge: 'مؤنّث', de: 'Wir haben **keine** Zeit.', ar: 'ليس لدينا وقت.' },
            { badge: 'جمع', de: 'Ich habe **keine** Geschwister.', ar: 'ليس لديّ إخوة.' },
            { badge: 'Nominativ', de: 'Das ist **kein** Problem.', ar: 'هذه ليست مشكلة.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: انفِ الجملة بـ kein',
          exercises: [
            {
              id: 'gr08-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'انفِ: Ich habe Zeit.',
              sentenceDe: 'Ich habe ___ Zeit.',
              acceptedAnswers: ['keine'],
              hint: 'die Zeit — مؤنّث',
              explanationAr: '[[die Zeit]] مؤنّث، فنفيها [[keine Zeit]].',
            },
            {
              id: 'gr08-p1-fill2',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'انفِ: Das ist ein Problem.',
              sentenceDe: 'Das ist ___ Problem.',
              acceptedAnswers: ['kein'],
              hint: 'das Problem — محايد',
              explanationAr: '[[das Problem]] محايد، فنفيها [[kein Problem]].',
            },
          ],
        },
      ],
    },

    {
      id: 'nicht',
      navLabelAr: 'nicht',
      kickerDe: 'nicht',
      titleAr: 'nicht: نفي كل ما عداه',
      titleDe: 'nicht',
      tone: 'accent',
      introAr:
        '[[nicht]] ينفي الأفعال والصفات والظروف والأسماء المعرّفة. موضعها يتغيّر حسب **ما تنفيه بالضبط**: نفي الجملة كاملة يضع [[nicht]] قرب النهاية، ونفي جزء محدَّد يضع [[nicht]] قبله مباشرة.',
      blocks: [
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'نفي الجملة كاملة',
              subAr: 'nicht قرب النهاية',
              tone: 'accent',
              items: [
                { de: 'Ich verstehe das nicht.', ar: 'لا أفهم ذلك.' },
                { de: 'Er kommt heute nicht.', ar: 'هو لن يأتي اليوم.' },
              ],
            },
            {
              titleAr: 'نفي صفة أو ظرف محدَّد',
              subAr: 'nicht قبل الكلمة المنفية مباشرة',
              tone: 'plum',
              items: [
                { de: 'Ich bin nicht müde.', ar: 'لستُ متعباً.' },
                { de: 'Das ist nicht schwer.', ar: 'هذا ليس صعباً.' },
              ],
            },
            {
              titleAr: 'نفي اسم معرّف',
              subAr: 'nicht قبل der/die/das + الاسم',
              tone: 'highlight',
              items: [
                { de: 'Das ist nicht der Lehrer.', ar: 'هذا ليس المعلّم.' },
                { de: 'Das ist nicht die Lösung.', ar: 'هذا ليس الحلّ.' },
              ],
            },
          ],
        },
        {
          kind: 'examples',
          titleAr: 'nicht في مواضع مختلفة',
          tone: 'accent',
          items: [
            { badge: 'فعل', de: 'Ich arbeite heute **nicht**.', ar: 'أنا لا أعمل اليوم.' },
            { badge: 'صفة', de: 'Das Wetter ist **nicht** schön.', ar: 'الطقس ليس جميلاً.' },
            { badge: 'ظرف', de: 'Er wohnt **nicht** hier.', ar: 'هو لا يسكن هنا.' },
          ],
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'lightbulb',
          titleAr: 'قاعدة مبسّطة للمستوى A1',
          bodyAr:
            'إن كانت الجملة قصيرة وتريد نفيها كاملة، ضع [[nicht]] في **آخر الجملة**. وإن كنت تنفي صفة أو ظرفاً محدَّداً، ضع [[nicht]] **مباشرة قبله**. هذه القاعدة تغطّي أغلب جمل A1؛ التفاصيل الدقيقة الإضافية تأتي مع الممارسة.',
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: nicht أم kein؟',
          exercises: [
            {
              id: 'gr08-p2-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أيّ أداة نفي مناسبة؟',
              questionDe: 'Ich bin ___ müde.',
              options: ['kein', 'keine', 'nicht', 'keinen'],
              correctIndex: 2,
              explanationAr: '[[müde]] صفة، فتُنفى بـ [[nicht]].',
            },
            {
              id: 'gr08-p2-mc2',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'أيّ أداة نفي مناسبة؟',
              questionDe: 'Das ist ___ Buch.',
              options: ['nicht', 'kein', 'keine', 'keinen'],
              correctIndex: 1,
              explanationAr: '[[das Buch]] محايد وتأخذ [[ein]] مثبتة، فتُنفى بـ [[kein]].',
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
      introAr: 'أشهر خطأ هو استخدام [[nicht ein]] بدل [[kein]] مباشرة.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich habe nicht ein Auto.',
              correct: 'Ich habe kein Auto.',
              explanationAr: 'نفي اسم بـ [[ein]] يستخدم [[kein]] مباشرة، وليس [[nicht ein]].',
            },
            {
              wrong: 'Ich bin kein müde.',
              correct: 'Ich bin nicht müde.',
              explanationAr: '[[müde]] صفة وليست اسماً، فتُنفى بـ [[nicht]].',
            },
            {
              wrong: 'Ich habe kein Zeit.',
              correct: 'Ich habe keine Zeit.',
              explanationAr: '[[die Zeit]] مؤنّث، فالشكل الصحيح [[keine]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'kein = nicht + ein', hintAr: 'ما الفكرة؟', backAr: 'اختصار ذهني: نفي اسم بـ ein أو بلا أداة يستخدم kein.' },
    { frontDe: 'kein / keine / kein / keine', hintAr: 'ما الأشكال؟', backAr: 'مذكّر ومحايد: kein. مؤنّث وجمع: keine.' },
    { frontDe: 'Ich bin nicht müde.', hintAr: 'لماذا nicht وليس kein؟', backAr: 'müde صفة، وnicht ينفي الصفات.' },
  ],

  quiz: [
    {
      id: 'gr08-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ أداة نفي مناسبة؟',
      questionDe: 'Wir haben ___ Kinder.',
      options: ['nicht', 'kein', 'keine', 'keinen'],
      correctIndex: 2,
      explanationAr: 'جمع → [[keine]].',
    },
    {
      id: 'gr08-q2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Ich habe nicht ein Buch" ist korrekt.',
      isTrue: false,
      explanationAr: 'خطأ: الصحيح [[Ich habe kein Buch]].',
    },
    {
      id: 'gr08-q3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'انفِ: Das Wetter ist schön.',
      sentenceDe: 'Das Wetter ist ___ schön.',
      acceptedAnswers: ['nicht'],
      explanationAr: '[[schön]] صفة، فتُنفى بـ [[nicht]].',
    },
    {
      id: 'gr08-q4',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['kein', 'Ich', 'habe', 'Auto.'],
      correctOrder: [1, 2, 0, 3],
      explanationAr: '[[Ich habe kein Auto.]] — الفاعل، الفعل، ثم kein + الاسم.',
    },
  ],

  cheatSheet: [
    { de: 'kein = nicht + ein', ar: 'نفي اسم بـ ein أو بلا أداة.' },
    { de: 'kein · keine · kein · keine', ar: 'مذكّر ومحايد: kein. مؤنّث وجمع: keine.' },
    { de: 'nicht', ar: 'لكل ما عدا ذلك: أفعال، صفات، ظروف، أسماء معرّفة.' },
    { de: '✗ nicht ein Buch', ar: 'خطأ شائع — الصحيح: kein Buch.' },
  ],
}

export default rule
