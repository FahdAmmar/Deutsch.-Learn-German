import type { GrammarRule } from '@/types'

/**
 * Rule 09 — Akkusativ. Only the masculine forms change (der→den,
 * ein→einen); feminine, neuter, and plural are identical to Nominativ.
 * Dativ (rule 15) and Akkusativ personal pronouns (rule 16) are out of
 * scope — no mich/dich/ihn etc. here.
 */
const rule: GrammarRule = {
  id: 'gr-09',
  number: 9,
  slug: '09-akkusativ',
  level: 'A1',
  termDe: 'Akkusativ',
  titleAr: 'المفعول به المباشر',
  eyebrowAr: 'الدرس التاسع في خارطة القواعد',
  taglineAr:
    'بعد أن أتقنتَ [[Nominativ]] (حالة الفاعل)، حان دور [[Akkusativ]] — حالة **المفعول به المباشر**، أي الشيء أو الشخص الذي يقع عليه الفعل مباشرة. الخبر السار: **يتغيّر شكل واحد فقط** — أداة المذكّر.',
  stats: [
    { value: '1', labelAr: 'شكل يتغيّر فقط (المذكّر)', },
    { value: '3', labelAr: 'أشكال تبقى كما هي' },
    { value: '35+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich sehe den Mann, die Frau und das Kind.',
    ar: 'أرى الرجل والمرأة والطفل.',
  },
  objectivesAr: [
    'تحدّد المفعول به المباشر بسؤال [[Wen?]] أو [[Was?]].',
    'تحفظ أن [[der]] فقط يتحوّل إلى [[den]]، و[[ein]] يتحوّل إلى [[einen]] في Akkusativ.',
    'تتعرّف على أفعال شائعة تحتاج مفعولاً به مباشراً دائماً.',
    'تميّز بثقة بين فاعل (Nominativ) ومفعول به (Akkusativ) في جملة واحدة.',
  ],

  sections: [
    {
      id: 'overview',
      navLabelAr: 'نظرة عامة',
      kickerDe: 'Überblick',
      titleAr: 'Wen? / Was؟ — المفعول به المباشر',
      titleDe: 'Akkusativ',
      tone: 'accent',
      introAr:
        'إن كان [[Nominativ]] يجيب عن «من يفعل؟»، فإن [[Akkusativ]] يجيب عن «على من/ماذا يقع الفعل؟». اطرح السؤال [[Wen?]] (من — لشخص) أو [[Was?]] (ماذا — لشيء) لتحديده.',
      blocks: [
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'Nominativ — الفاعل' },
            { text: 'sehe', role: 'الفعل' },
            { text: 'den Mann.', role: 'Akkusativ — المفعول به (Wen?)' },
          ],
          ar: 'أنا أرى الرجل.',
        },
        {
          kind: 'ruleBox',
          tone: 'accent',
          icon: 'star',
          titleAr: 'الخبر السار: تغيير واحد فقط',
          bodyAr: 'من بين كل أدوات Nominativ، **أداة المذكّر فقط** ([[der]] → [[den]]، [[ein]] → [[einen]]) تتغيّر في Akkusativ. المؤنّث والمحايد والجمع تبقى تماماً كما هي.',
        },
      ],
    },

    {
      id: 'forms',
      navLabelAr: 'الأشكال',
      kickerDe: 'Die Formen',
      titleAr: 'Nominativ مقابل Akkusativ',
      titleDe: 'der → den',
      tone: 'primary',
      introAr: 'قارن الجدولين التاليين جيداً — التغيير الوحيد مظلّل باللون.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الأداة المعرّفة: Nominativ مقابل Akkusativ',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'Nominativ', lang: 'de', tone: 'accent' },
            { header: 'Akkusativ', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['مذكّر', 'der Mann', 'den Mann'],
            ['مؤنّث', 'die Frau', 'die Frau'],
            ['محايد', 'das Kind', 'das Kind'],
            ['جمع', 'die Kinder', 'die Kinder'],
          ],
          emphasisRows: [0],
        },
        {
          kind: 'table',
          captionAr: 'الأداة المنكّرة: Nominativ مقابل Akkusativ',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'Nominativ', lang: 'de', tone: 'accent' },
            { header: 'Akkusativ', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['مذكّر', 'ein Mann', 'einen Mann'],
            ['مؤنّث', 'eine Frau', 'eine Frau'],
            ['محايد', 'ein Kind', 'ein Kind'],
          ],
          emphasisRows: [0],
        },
        {
          kind: 'ruleBox',
          tone: 'plum',
          icon: 'lightbulb',
          titleAr: 'حيلة للتذكّر',
          bodyAr: 'أضف الحرفين **-en** إلى نهاية أداة المذكّر فقط: [[der]] → [[den]]، [[ein]] → [[einen]]. كل شيء آخر لا يتغيّر إطلاقاً.',
        },
        {
          kind: 'examples',
          titleAr: 'أمثلة متنوّعة',
          tone: 'accent',
          items: [
            { badge: 'مذكّر (تغيّر)', de: 'Ich kaufe **den** Tisch.', ar: 'أشتري الطاولة.' },
            { badge: 'مذكّر منكّر (تغيّر)', de: 'Ich kaufe **einen** Tisch.', ar: 'أشتري طاولة.' },
            { badge: 'مؤنّث (بلا تغيّر)', de: 'Ich kaufe **die** Lampe.', ar: 'أشتري المصباح.' },
            { badge: 'محايد (بلا تغيّر)', de: 'Ich kaufe **das** Auto.', ar: 'أشتري السيارة.' },
            { badge: 'جمع (بلا تغيّر)', de: 'Ich kaufe **die** Bücher.', ar: 'أشتري الكتب.' },
          ],
        },
      ],
    },

    {
      id: 'akkusativ-verbs',
      navLabelAr: 'أفعال Akkusativ',
      kickerDe: 'Akkusativ-Verben',
      titleAr: 'أفعال شائعة تحتاج Akkusativ',
      titleDe: 'brauchen, kaufen, sehen…',
      tone: 'plum',
      introAr: 'كثير من أشهر الأفعال الألمانية تحتاج مفعولاً به مباشراً في Akkusativ — تعلّمها كمجموعة يسهّل عليك بناء الجمل بسرعة.',
      blocks: [
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'أفعال Akkusativ شائعة',
              formula: 'Subjekt + Verb + Akkusativ-Objekt',
              tone: 'plum',
              items: [
                { de: 'Ich sehe den Film.', ar: 'أشاهد الفيلم.' },
                { de: 'Ich brauche einen Stift.', ar: 'أحتاج قلماً.' },
                { de: 'Ich kaufe das Brot.', ar: 'أشتري الخبز.' },
                { de: 'Ich trinke einen Kaffee.', ar: 'أشرب قهوة.' },
                { de: 'Ich esse einen Apfel.', ar: 'آكل تفاحة.' },
                { de: 'Ich lese das Buch.', ar: 'أقرأ الكتاب.' },
              ],
            },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بأداة Akkusativ الصحيحة',
          exercises: [
            {
              id: 'gr09-p1-fill1',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'أكمل (der Tisch)',
              sentenceDe: 'Ich kaufe ___ Tisch.',
              acceptedAnswers: ['den'],
              hint: 'مذكّر في Akkusativ',
              explanationAr: '[[der Tisch]] مذكّر، ففي Akkusativ يصبح [[den Tisch]].',
            },
            {
              id: 'gr09-p1-fill2',
              type: 'fill-blank',
              level: 'A1',
              promptAr: 'أكمل (eine Lampe)',
              sentenceDe: 'Ich brauche ___ Lampe.',
              acceptedAnswers: ['eine'],
              hint: 'مؤنّث — بلا تغيير',
              explanationAr: 'المؤنّث لا يتغيّر في Akkusativ: [[eine Lampe]].',
            },
            {
              id: 'gr09-p1-mc1',
              type: 'multiple-choice',
              level: 'A1',
              promptAr: 'اختر الشكل الصحيح',
              questionDe: 'Er sieht ___ Hund.',
              options: ['der', 'den', 'dem', 'des'],
              correctIndex: 1,
              explanationAr: '[[der Hund]] مذكّر، فمفعوله المباشر [[den Hund]].',
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
      introAr: 'الخطأ شبه الوحيد هنا هو نسيان تغيير أداة المذكّر، أو تطبيق التغيير على المؤنّث والمحايد خطأً.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich sehe der Mann.',
              correct: 'Ich sehe den Mann.',
              explanationAr: 'المفعول به المباشر لمذكّر يحتاج [[den]]، وليس [[der]].',
            },
            {
              wrong: 'Ich kaufe den Lampe.',
              correct: 'Ich kaufe die Lampe.',
              explanationAr: 'المؤنّث لا يتغيّر في Akkusativ؛ تبقى [[die]] كما هي ولا تصبح [[den]] (التغيّر يخصّ المذكّر فقط).',
            },
            {
              wrong: 'Ich brauche dasn Buch.',
              correct: 'Ich brauche das Buch.',
              explanationAr: 'المحايد لا يتغيّر في Akkusativ؛ لا توجد نهاية [[-n]] تُضاف إلى [[das]].',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'Wen? / Was?', hintAr: 'ما وظيفة هذين السؤالين؟', backAr: 'يحدّدان المفعول به المباشر، وهو في Akkusativ.' },
    { frontDe: 'der → den', hintAr: 'أين يحدث هذا التغيير؟', backAr: 'في Akkusativ، للمذكّر فقط.' },
    { frontDe: 'ein → einen', hintAr: 'أين يحدث هذا التغيير؟', backAr: 'في Akkusativ، للمذكّر المنكّر فقط.' },
    { frontDe: 'die / das (Akkusativ)', hintAr: 'هل تتغيّر؟', backAr: 'لا — المؤنّث والمحايد والجمع يبقون كما في Nominativ تماماً.' },
  ],

  quiz: [
    {
      id: 'gr09-q1',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Ich sehe ___ Lehrer.',
      options: ['der', 'den', 'die', 'das'],
      correctIndex: 1,
      explanationAr: '[[der Lehrer]] مذكّر، فمفعوله [[den Lehrer]].',
    },
    {
      id: 'gr09-q2',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im Akkusativ ändert sich „die" (feminin) zu „den".',
      isTrue: false,
      explanationAr: 'خطأ: المؤنّث [[die]] لا يتغيّر في Akkusativ.',
    },
    {
      id: 'gr09-q3',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل (ein Apfel)',
      sentenceDe: 'Ich esse ___ Apfel.',
      acceptedAnswers: ['einen'],
      explanationAr: '[[ein Apfel]] مذكّر، ففي Akkusativ يصبح [[einen Apfel]].',
    },
    {
      id: 'gr09-q4',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['den', 'Ich', 'Film.', 'sehe'],
      correctOrder: [1, 3, 0, 2],
      explanationAr: '[[Ich sehe den Film.]] — فاعل، فعل، مفعول به في Akkusativ.',
    },
    {
      id: 'gr09-q5',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق الاسم بشكله الصحيح في Akkusativ',
      pairs: [
        { de: 'der Tisch', ar: 'den Tisch' },
        { de: 'die Lampe', ar: 'die Lampe' },
        { de: 'das Auto', ar: 'das Auto' },
        { de: 'ein Mann', ar: 'einen Mann' },
      ],
      explanationAr: 'التغيير يقتصر على المذكّر فقط.',
    },
  ],

  cheatSheet: [
    { de: 'Wen? / Was?', ar: 'أسئلة تحديد المفعول به المباشر.' },
    { de: 'der → den · ein → einen', ar: 'التغيير الوحيد في Akkusativ (للمذكّر فقط).' },
    { de: 'die / das / die (بلا تغيير)', ar: 'مؤنّث ومحايد وجمع تبقى كما في Nominativ.' },
    { de: 'sehen, kaufen, brauchen, essen, trinken, lesen', ar: 'أفعال شائعة تحتاج مفعولاً به في Akkusativ.' },
  ],
}

export default rule
