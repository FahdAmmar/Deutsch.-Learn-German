import type { Lesson } from '@/types'

/**
 * The der-words dieser, welcher, jeder (and alle in the plural) in all three cases the learner knows, so the
 * Dativ forms diesem / welchem / jedem join the Nominativ and Akkusativ of the A1 lesson. The Goethe A2 word list
 * carries jed- and uses dieser and welcher in the Dativ in its example sentences. It stands before the adjective
 * lesson because the adjective after a der-word takes the same endings as after the definite article.
 * The short last section recognises the demonstrative "Den finde ich schön", which is heard everywhere.
 */
export const lessonDerWoerter: Lesson = {
  id: 'a2-m21-l03',
  slug: 'der-woerter',
  level: 'A2',
  moduleId: 'a2-m21',
  title: 'dieser, welcher, jeder',
  titleAr: 'der-Wörter: dieser وwelcher وjeder في كل الحالات',
  estimatedMinutes: 25,
  objectivesAr: [
    'تصريف dieser وwelcher وjeder في Nominativ وAkkusativ وDativ',
    'اختيار النهاية الصحيحة بمعرفة الجنس والحالة',
    'استعمال alle مع الجمع بدل jeder',
    'فهم الفرق بين Welcher …؟ وWas für ein …؟',
  ],
  explanation: [
    {
      titleAr: 'القاعدة: نهايات أداة التعريف',
      bodyAr:
        'الكلمات **dieser** (هذا) و**welcher** (أيّ) و**jeder** (كلّ) تأخذ **نهايات أداة التعريف** نفسها. إن عرفتَ der / den / dem فقد عرفتَ **dieser / diesen / diesem**. مذكر ومحايد في Dativ: **-em**، مؤنث في Dativ: **-er**، جمع في Dativ: **-en**. تذكّر أن المؤنث والجمع في Nominativ وAkkusativ يبقيان **diese**.',
    },
    {
      titleAr: 'كيف أختار النهاية؟',
      bodyAr:
        'اسأل نفسك سؤالين: ما جنس الاسم؟ وما حالته؟ **من يفعل؟** ← Nominativ: **Dieser Bus fährt zum Bahnhof.** **ماذا / من أفعل به؟** ← Akkusativ: **Ich nehme diesen Bus.** **بعد mit وbei وvon وzu وaus وnach، وبعد in / an / auf عند السؤال «أين؟»** ← Dativ: **Mit diesem Bus fahre ich zur Arbeit. In welchem Zimmer wohnst du? Ich wohne in dieser Straße.**',
    },
    {
      titleAr: 'jeder وalle',
      bodyAr:
        '**jeder / jede / jedes** تعني «كلّ» وتأتي مع **المفرد فقط**: **Jeder Mensch braucht Wasser. Ich fahre jeden Tag mit dem Bus. In jedem Zimmer gibt es ein Bett.** أمّا مع الجمع فنقول **alle**: **Alle Kinder spielen im Garten.** وليس ~~Jede Kinder~~.',
    },
    {
      titleAr: 'Welcher …؟ أم Was für ein …؟',
      bodyAr:
        '**Welcher** تسأل عن اختيار من أشياء معروفة: **Welcher Film läuft heute?** (أيّ فيلم من الأفلام المعروضة؟). أمّا **Was für ein …؟** فتسأل عن **النوع**: **Was für ein Film ist das? – Ein Krimi.** (أيّ نوع من الأفلام؟ فيلم جريمة).',
    },
    {
      titleAr: 'للتعرّف: Den finde ich schön',
      bodyAr:
        'في الكلام اليومي تسمع **der / die / das** بمعنى «هذا» وتقف في أول الجملة: **Wie findest du den Pullover? – Den finde ich schön.** **Die Hose ist schön. Die nehme ich.** الكلمة تأخذ حالة الاسم الذي تعوّض عنه (den هنا Akkusativ)، والفعل يبقى ثانياً. تعلّمها للفهم الآن.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-der-woerter',
      slug: 'der-woerter',
      level: 'A2',
      titleDe: 'der-Wörter: dieser, welcher, jeder',
      titleAr: 'dieser وwelcher وjeder: النهايات الثلاث',
      conceptAr: 'ثلاث كلمات تأخذ نهايات أداة التعريف، فنتعلّم جدولاً واحداً ونطبّقه عليها كلها.',
      ruleAr:
        'Nominativ: dieser / diese / dieses / diese. Akkusativ: diesen / diese / dieses / diese. Dativ: diesem / dieser / diesem / diesen. وكذلك welch- وjed- (jed- للمفرد فقط).',
      tables: [
        {
          caption: 'نهايات dies- (وكذلك welch- وjed-)',
          headers: ['الحالة', 'مذكر', 'مؤنث', 'محايد', 'جمع'],
          rows: [
            { label: 'Nominativ', values: ['dieser', 'diese', 'dieses', 'diese'] },
            { label: 'Akkusativ', values: ['diesen', 'diese', 'dieses', 'diese'] },
            { label: 'Dativ', values: ['diesem', 'dieser', 'diesem', 'diesen'] },
          ],
        },
        {
          caption: 'الكلمات الأربع',
          headers: ['الكلمة', 'المعنى', 'مثال'],
          rows: [
            { label: 'dieser', values: ['هذا', 'Mit diesem Bus fahre ich zur Arbeit.'] },
            { label: 'welcher', values: ['أيّ؟', 'In welchem Zimmer wohnst du?'] },
            { label: 'jeder (مفرد)', values: ['كلّ', 'Ich fahre jeden Tag mit dem Bus.'] },
            { label: 'alle (جمع)', values: ['كلّ / جميع', 'Alle Kinder spielen im Garten.'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Mit diesem Bus fahre ich zur Arbeit.',
          ar: 'بهذه الحافلة أذهب إلى العمل.',
          tokens: [
            { text: 'Mit', role: 'حرف جر ← Dativ' },
            { text: 'diesem', role: 'مذكر Dativ (مثل dem)' },
            { text: 'Bus', role: 'الاسم (مذكر)' },
            { text: 'fahre', role: 'فعل (ثانياً)' },
            { text: 'ich', role: 'فاعل' },
            { text: 'zur Arbeit.', role: 'المكان' },
          ],
        },
        {
          de: 'In welchem Zimmer wohnst du?',
          ar: 'في أيّ غرفة تسكن؟',
          tokens: [
            { text: 'In', role: 'حرف جر (أين؟) ← Dativ' },
            { text: 'welchem', role: 'محايد Dativ (مثل dem)' },
            { text: 'Zimmer', role: 'الاسم (محايد)' },
            { text: 'wohnst', role: 'فعل (ثانياً)' },
            { text: 'du?', role: 'فاعل' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Dieser Bus fährt zum Bahnhof.', ar: 'هذه الحافلة تذهب إلى المحطة.' },
    { de: 'Ich nehme diesen Bus.', ar: 'آخذ هذه الحافلة.' },
    { de: 'Mit diesem Bus fahre ich zur Arbeit.', ar: 'بهذه الحافلة أذهب إلى العمل.' },
    { de: 'In welchem Zimmer wohnst du?', ar: 'في أيّ غرفة تسكن؟' },
    { de: 'Ich wohne in dieser Straße.', ar: 'أسكن في هذا الشارع.' },
    { de: 'Welche Wohnung gefällt dir?', ar: 'أيّ شقة تعجبك؟' },
    { de: 'Ich fahre jeden Tag mit dem Bus.', ar: 'أذهب كل يوم بالحافلة.' },
    { de: 'Alle Kinder spielen im Garten.', ar: 'كل الأطفال يلعبون في الحديقة.' },
  ],
  vocabulary: [
    { id: 'voc-dw2-jeder', word: 'jeder', partOfSpeech: 'pronoun', meaningAr: 'كلّ (للمفرد)', level: 'A2', category: 'Begleiter', example: { de: 'Ich fahre jeden Tag mit dem Bus.', ar: 'أذهب كل يوم بالحافلة.' } },
    { id: 'voc-dw2-alle', word: 'alle', partOfSpeech: 'pronoun', meaningAr: 'كلّ / جميع (للجمع)', level: 'A2', category: 'Begleiter', example: { de: 'Alle Kinder spielen im Garten.', ar: 'كل الأطفال يلعبون في الحديقة.' } },
    { id: 'voc-dw2-mensch', word: 'Mensch', article: 'der', plural: 'Menschen', partOfSpeech: 'noun', meaningAr: 'إنسان', level: 'A2', category: 'Gesellschaft', example: { de: 'Jeder Mensch braucht Wasser.', ar: 'كل إنسان يحتاج إلى الماء.' } },
    { id: 'voc-dw2-woche', word: 'Woche', article: 'die', plural: 'Wochen', partOfSpeech: 'noun', meaningAr: 'أسبوع', level: 'A2', category: 'Zeit', example: { de: 'Jede Woche gehe ich schwimmen.', ar: 'كل أسبوع أذهب للسباحة.' } },
    { id: 'voc-dw2-strasse', word: 'Straße', article: 'die', plural: 'Straßen', partOfSpeech: 'noun', meaningAr: 'شارع', level: 'A2', category: 'Stadt', example: { de: 'Ich wohne in dieser Straße.', ar: 'أسكن في هذا الشارع.' } },
  ],
  exercises: [
    {
      id: 'ex-dw2-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: '___ Bus fährt zum Bahnhof.',
      options: ['Dieser', 'Diesen', 'Diesem', 'Dieses'],
      correctIndex: 0,
      explanationAr: 'الحافلة هي التي تفعل (فاعل) ← Nominativ مذكر ← Dieser.',
    },
    {
      id: 'ex-dw2-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Ich nehme ___ Bus.',
      options: ['dieser', 'diesen', 'diesem', 'dieses'],
      correctIndex: 1,
      explanationAr: 'ماذا آخذ؟ ← مفعول به مذكر ← Akkusativ ← diesen.',
    },
    {
      id: 'ex-dw2-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Mit ___ Bus fahre ich zur Arbeit.',
      options: ['dieser', 'diesen', 'diesem', 'dieses'],
      correctIndex: 2,
      explanationAr: 'بعد mit دائماً Dativ، والمذكر ← diesem.',
    },
    {
      id: 'ex-dw2-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (Dativ)',
      sentenceDe: 'In ___ Zimmer wohnst du?',
      acceptedAnswers: ['welchem'],
      hint: 'das Zimmer ← أين؟ ← Dativ',
      explanationAr: 'in + أين؟ ← Dativ، والمحايد ← welchem (مثل dem).',
    },
    {
      id: 'ex-dw2-5',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (Dativ)',
      sentenceDe: 'Ich wohne in ___ Straße.',
      acceptedAnswers: ['dieser'],
      hint: 'die Straße ← أين؟ ← Dativ',
      explanationAr: 'المؤنث في Dativ يأخذ -er (مثل der): in dieser Straße.',
    },
    {
      id: 'ex-dw2-6',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الشكل الصحيح',
      questionDe: 'Ich fahre ___ Tag mit dem Bus.',
      options: ['jeder', 'jeden', 'jedem', 'jedes'],
      correctIndex: 1,
      explanationAr: 'Tag مذكر وهو ظرف زمان بلا حرف جر ← Akkusativ ← jeden Tag.',
    },
    {
      id: 'ex-dw2-7',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '„Jede Kinder spielen im Garten.“ ist richtig.',
      isTrue: false,
      explanationAr: 'خطأ. jeder للمفرد فقط. مع الجمع نقول Alle Kinder spielen im Garten.',
    },
    {
      id: 'ex-dw2-8',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق كل عبارة بحالتها',
      pairs: [
        { de: 'dieser Bus fährt', ar: 'مذكر، فاعل ← Nominativ' },
        { de: 'ich nehme diesen Bus', ar: 'مذكر، مفعول به ← Akkusativ' },
        { de: 'mit diesem Bus', ar: 'مذكر بعد mit ← Dativ' },
        { de: 'in dieser Straße', ar: 'مؤنث بعد in (أين؟) ← Dativ' },
      ],
      explanationAr: 'اعرف الجنس ثم الحالة، ثم اختر النهاية من الجدول.',
    },
    {
      id: 'ex-dw2-9',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['fahre', 'Mit', 'Arbeit.', 'diesem', 'ich', 'zur', 'Bus'],
      correctOrder: [1, 3, 6, 0, 4, 5, 2],
      explanationAr: 'Mit diesem Bus fahre ich zur Arbeit. الفعل fahre ثانياً بعد العبارة الأولى كلها.',
    },
    {
      id: 'ex-dw2-10',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الجواب المناسب',
      questionDe: 'Was für ein Film ist das?',
      options: ['Ein Krimi.', 'Dieser Film.', 'Welcher Film?', 'Alle Filme.'],
      correctIndex: 0,
      explanationAr: 'Was für ein … تسأل عن النوع، فالجواب نوع الفيلم: Ein Krimi (فيلم جريمة).',
      optionLanguage: 'de',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich fahre mit dieser Bus.',
      correct: 'Ich fahre mit diesem Bus.',
      explanationAr: 'بعد mit دائماً Dativ، والمذكر ← diesem. dieser هنا هو Nominativ.',
    },
    {
      wrong: 'Jede Kinder spielen im Garten.',
      correct: 'Alle Kinder spielen im Garten.',
      explanationAr: 'jeder / jede / jedes للمفرد فقط. للجمع نستعمل alle.',
    },
    {
      wrong: 'In welchen Zimmer wohnst du?',
      correct: 'In welchem Zimmer wohnst du?',
      explanationAr: 'مع in عند السؤال «أين؟» نستعمل Dativ: das Zimmer ← welchem.',
    },
  ],
}
