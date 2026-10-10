import type { GrammarRule } from '@/types'

/**
 * Rule 19 — Akkusativ vs. Dativ. A consolidation/decision rule: given a
 * verb, which case does its object take? Reviews rules 09 and 15, adds
 * two-object (Wechsel-) verbs taking both at once, and drills the
 * decision itself rather than introducing new declension endings.
 */
const rule: GrammarRule = {
  id: 'gr-19',
  number: 19,
  slug: '19-akkusativ-vs-dativ',
  level: 'A2',
  termDe: 'Akkusativ vs. Dativ',
  titleAr: 'الفرق بين Akkusativ وDativ',
  eyebrowAr: 'الدرس الثالث في مستوى A2',
  taglineAr:
    'أتقنتَ [[Akkusativ]] (الدرس ٠٩) و[[Dativ]] (الدرس ١٥) كلّاً على حدة. التحدّي الحقيقي الآن: حين تواجه فعلاً جديداً، كيف تعرف **فوراً** أيّ حالة يحتاج؟ هذا الدرس يجمع كل ما تعلّمته في جدول قرار واحد، ويضيف الأفعال التي تحتاج **كلتا الحالتين معاً**.',
  stats: [
    { value: '2', labelAr: 'حالتان للمراجعة الشاملة' },
    { value: '5', labelAr: 'أفعال شائعة بمفعولين (Dativ + Akkusativ)' },
    { value: '40+', labelAr: 'مثال صوتي وتطبيقي' },
  ],
  heroExample: {
    de: 'Ich schenke meiner Mutter einen Blumenstrauß.',
    ar: 'أهدي أمّي باقة ورد.',
  },
  objectivesAr: [
    'تراجع متى تحتاج فعل Akkusativ ومتى تحتاج فعل Dativ.',
    'تحفظ أشهر الأفعال التي تحتاج كلا المفعولين معاً.',
    'تطبّق ترتيب Dativ قبل Akkusativ عند استخدام اسمين.',
    'تقرّر بسرعة وثقة أيّ حالة يحتاج أيّ فعل جديد تقابله.',
  ],

  sections: [
    {
      id: 'recap',
      navLabelAr: 'مراجعة سريعة',
      kickerDe: 'Wiederholung',
      titleAr: 'مراجعة: متى Akkusativ، متى Dativ',
      titleDe: 'Akkusativ oder Dativ?',
      tone: 'accent',
      introAr: 'قبل الأفعال المزدوجة، راجع هذا الملخّص السريع لما تعلّمته في الدرسين ٠٩ و١٥.',
      blocks: [
        {
          kind: 'table',
          captionAr: 'الأداة المعرّفة عبر الحالتين',
          columns: [
            { header: 'الجنس', lang: 'ar' },
            { header: 'Akkusativ', lang: 'de', tone: 'accent' },
            { header: 'Dativ', lang: 'de', tone: 'plum' },
          ],
          rows: [
            ['مذكّر', 'den Mann', 'dem Mann'],
            ['مؤنّث', 'die Frau', 'der Frau'],
            ['محايد', 'das Kind', 'dem Kind'],
            ['جمع', 'die Kinder', 'den Kindern'],
          ],
        },
        {
          kind: 'patternCards',
          cards: [
            {
              titleAr: 'أفعال Akkusativ (مفعول مباشر)',
              formula: 'Wen? / Was?',
              tone: 'accent',
              items: [
                { de: 'sehen, kaufen, essen', ar: 'يرى، يشتري، يأكل' },
                { de: 'brauchen, lesen, trinken', ar: 'يحتاج، يقرأ، يشرب' },
              ],
            },
            {
              titleAr: 'أفعال Dativ (مفعول وحيد)',
              formula: 'Wem?',
              tone: 'plum',
              items: [
                { de: 'helfen, danken, gefallen', ar: 'يساعد، يشكر، يُعجِب' },
                { de: 'gehören, antworten, folgen', ar: 'يعود ملكاً لـ، يجيب، يتبع' },
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'two-objects',
      navLabelAr: 'أفعال بمفعولين',
      kickerDe: 'Verben mit zwei Objekten',
      titleAr: 'أفعال تحتاج Dativ وAkkusativ معاً',
      titleDe: 'geben · schenken · zeigen',
      tone: 'highlight',
      introAr: 'مجموعة من الأفعال الشائعة جداً تحتاج **شخصاً** (في Dativ) و**شيئاً** (في Akkusativ) في الجملة نفسها — غالباً أفعال تتضمّن معنى «إعطاء» أو «إرسال» أو «إظهار».',
      blocks: [
        {
          kind: 'table',
          captionAr: 'أفعال شائعة بمفعولين',
          columns: [
            { header: 'الفعل', lang: 'de', tone: 'highlight' },
            { header: 'المعنى', lang: 'ar' },
          ],
          rows: [
            ['geben', 'يعطي'],
            ['schenken', 'يهدي'],
            ['zeigen', 'يُري'],
            ['schicken', 'يرسل'],
            ['erzählen', 'يحكي لـ'],
            ['erklären', 'يشرح لـ'],
          ],
        },
        {
          kind: 'formula',
          tags: [
            { text: 'Subjekt' },
            { text: 'Verb', tone: 'accent' },
            { text: 'Dativ', tone: 'plum', noteAr: 'الشخص — Wem?' },
            { text: 'Akkusativ', tone: 'highlight', noteAr: 'الشيء — Was?' },
          ],
        },
        {
          kind: 'sentence',
          tokens: [
            { text: 'Ich', role: 'Nominativ — الفاعل' },
            { text: 'schenke', role: 'الفعل' },
            { text: 'meiner Mutter', role: 'Dativ — Wem? (الشخص)' },
            { text: 'einen Blumenstrauß.', role: 'Akkusativ — Was? (الشيء)' },
          ],
          ar: 'أهدي أمّي باقة ورد.',
        },
        {
          kind: 'ruleBox',
          tone: 'highlight',
          icon: 'star',
          titleAr: 'الترتيب: Dativ قبل Akkusativ (مع اسمين)',
          bodyAr: 'حين يكون كلا المفعولين اسماً (لا ضميراً)، الشخص (Dativ) يأتي قبل الشيء (Akkusativ) دائماً: [[Ich gebe dem Kind das Buch.]] — وليس العكس.',
        },
        {
          kind: 'examples',
          titleAr: 'أفعال بمفعولين في جمل',
          tone: 'highlight',
          items: [
            { badge: 'geben', de: 'Er gibt **dem Kellner** **das Geld**.', ar: 'يعطي النادل المال.' },
            { badge: 'zeigen', de: 'Ich zeige **meinem Freund** **die Fotos**.', ar: 'أُري صديقي الصور.' },
            { badge: 'schicken', de: 'Wir schicken **unseren Eltern** **eine Karte**.', ar: 'نرسل لوالدينا بطاقة.' },
            { badge: 'erklären', de: 'Die Lehrerin erklärt **den Schülern** **die Regel**.', ar: 'تشرح المعلّمة القاعدة للطلاب.' },
          ],
        },
        {
          kind: 'practice',
          titleAr: 'تمرين: أكمل بأداة الحالة الصحيحة',
          exercises: [
            {
              id: 'gr19-p1-fill1',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (geben + der Mann [Dativ] + der Schlüssel [Akkusativ، مذكّر])',
              sentenceDe: 'Ich gebe ___ Mann den Schlüssel.',
              acceptedAnswers: ['dem'],
              hint: 'der Mann في Dativ',
              explanationAr: 'الشخص في Dativ: [[dem Mann]].',
            },
            {
              id: 'gr19-p1-fill2',
              type: 'fill-blank',
              level: 'A2',
              promptAr: 'أكمل (zeigen + die Kinder [Dativ] + das Foto [Akkusativ])',
              sentenceDe: 'Sie zeigt ___ Kindern das Foto.',
              acceptedAnswers: ['den'],
              hint: 'die Kinder (جمع) في Dativ',
              explanationAr: 'الجمع في Dativ: [[den Kindern]] (مع -n على الاسم).',
            },
          ],
        },
      ],
    },

    {
      id: 'decision-drill',
      navLabelAr: 'تمرين قرار',
      kickerDe: 'Entscheidung',
      titleAr: 'تمرين شامل: اتّخذ القرار بسرعة',
      titleDe: 'Akkusativ, Dativ, oder beides?',
      tone: 'plum',
      introAr: 'هذا القسم يخلط بين الأنواع الثلاثة عمداً — تدرّب على التعرّف السريع.',
      blocks: [
        {
          kind: 'practice',
          titleAr: 'تمرين شامل',
          exercises: [
            {
              id: 'gr19-p2-mc1',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الأداة الصحيحة (helfen → Dativ وحده)',
              questionDe: 'Ich helfe ___ Frau.',
              options: ['die', 'der', 'den', 'das'],
              correctIndex: 1,
              explanationAr: '[[helfen]] يحتاج Dativ وحده: [[der Frau]].',
            },
            {
              id: 'gr19-p2-mc2',
              type: 'multiple-choice',
              level: 'A2',
              promptAr: 'اختر الأداة الصحيحة (sehen → Akkusativ وحده)',
              questionDe: 'Ich sehe ___ Mann.',
              options: ['der', 'den', 'dem', 'die'],
              correctIndex: 1,
              explanationAr: '[[sehen]] يحتاج Akkusativ وحده: [[den Mann]].',
            },
            {
              id: 'gr19-p2-order1',
              type: 'ordering',
              level: 'A2',
              promptAr: 'رتّب الكلمات (geben → مفعولان)',
              words: ['das Buch.', 'Kind', 'gibt', 'dem', 'Sie'],
              correctOrder: [4, 2, 3, 1, 0],
              explanationAr: '[[Sie gibt dem Kind das Buch.]] — Dativ (الشخص) قبل Akkusativ (الشيء).',
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
      introAr: 'أشهر خطأين: عكس ترتيب المفعولين، واستخدام Akkusativ بدل Dativ مع أفعال مثل helfen.',
      blocks: [
        {
          kind: 'mistakes',
          items: [
            {
              wrong: 'Ich gebe das Buch dem Kind.',
              correct: 'Ich gebe dem Kind das Buch.',
              explanationAr: 'مع اسمين، Dativ (الشخص) يسبق Akkusativ (الشيء).',
            },
            {
              wrong: 'Ich helfe die Frau.',
              correct: 'Ich helfe der Frau.',
              explanationAr: '[[helfen]] يحتاج Dativ وحده، وليس Akkusativ.',
            },
          ],
        },
      ],
    },
  ],

  flashcards: [
    { frontDe: 'geben, schenken, zeigen, schicken', hintAr: 'كم مفعولاً تحتاج؟', backAr: 'مفعولان: شخص في Dativ وشيء في Akkusativ.' },
    { frontDe: 'Dativ قبل Akkusativ', hintAr: 'ما الترتيب مع اسمين؟', backAr: 'الشخص (Dativ) يأتي أولاً، ثم الشيء (Akkusativ).', exampleDe: 'Ich gebe **dem Kind** **das Buch**.' },
    { frontDe: 'helfen, danken, gefallen', hintAr: 'أيّ حالة؟', backAr: 'Dativ وحده — لا Akkusativ معها.' },
  ],

  quiz: [
    {
      id: 'gr19-q1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة',
      questionDe: 'Ich schenke ___ Bruder ein Buch.',
      options: ['der', 'dem', 'den', 'die'],
      correctIndex: 1,
      explanationAr: 'الشخص المستفيد في Dativ: [[dem Bruder]].',
    },
    {
      id: 'gr19-q2',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['die Fotos.', 'zeigt', 'ihrer Freundin', 'Sie'],
      correctOrder: [3, 1, 2, 0],
      explanationAr: '[[Sie zeigt ihrer Freundin die Fotos.]] — Dativ قبل Akkusativ.',
    },
    {
      id: 'gr19-q3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„danken" braucht den Akkusativ: Ich danke den Lehrer.',
      isTrue: false,
      explanationAr: 'خطأ: [[danken]] يحتاج Dativ: [[Ich danke dem Lehrer]].',
    },
    {
      id: 'gr19-q4',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق الفعل بالحالة (الحالات) التي يحتاجها',
      pairs: [
        { de: 'sehen', ar: 'Akkusativ' },
        { de: 'helfen', ar: 'Dativ' },
        { de: 'geben', ar: 'Dativ + Akkusativ' },
      ],
      explanationAr: 'راجع جداول الأفعال أعلاه إن أخطأت.',
    },
  ],

  cheatSheet: [
    { de: 'Wen?/Was? → Akkusativ', ar: 'sehen, kaufen, essen…' },
    { de: 'Wem? → Dativ', ar: 'helfen, danken, gefallen…' },
    { de: 'Wem? + Was? → Dativ + Akkusativ', ar: 'geben, schenken, zeigen, schicken…' },
    { de: 'Dativ قبل Akkusativ', ar: 'ترتيب المفعولين مع اسمين.' },
  ],
}

export default rule
