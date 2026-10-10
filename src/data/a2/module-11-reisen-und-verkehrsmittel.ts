import type { Lesson, Module } from '@/types'

export const lessonReisen: Lesson = {
  id: 'a2-m11-l01',
  slug: 'reisen-und-verkehrsmittel',
  level: 'A2',
  moduleId: 'a2-m11',
  title: 'Reisen und Verkehrsmittel',
  titleAr: 'السفر ووسائل النقل',
  estimatedMinutes: 30,
  objectivesAr: [
    'حفظ مفردات وسائل النقل الشائعة وأفعال السفر المنفصلة (einsteigen، aussteigen، umsteigen)',
    'شراء تذكرة والاستفسار عن السفر بعبارات مهذبة',
    'التمييز بين als (لحظة واحدة في الماضي) وwenn (تكرار أو حاضر/مستقبل)',
    'وصف رحلة ماضية بجمل مركّبة بزمن Perfekt',
  ],
  explanation: [
    {
      titleAr: 'ثلاثة أفعال سفر منفصلة أساسية',
      bodyAr:
        'einsteigen (يركب/يصعد) وaussteigen (ينزل) وumsteigen (يبدّل الرحلة) أفعال منفصلة تتبع القاعدة المعتادة: تنفصل بادئتها وتنتقل إلى نهاية الجملة: "Ich steige am Hauptbahnhof um" (أُبدّل رحلتي في المحطة الرئيسية).',
    },
    {
      titleAr: 'als للحظة واحدة، wenn للتكرار',
      bodyAr:
        'كلتا الكلمتين تعنيان "عندما"، لكن als تُستخدَم حصراً لحدث واحد منتهٍ في الماضي: "Als ich zwölf war, bin ich zum ersten Mal geflogen" (عندما كنت في الثانية عشرة، طرت لأول مرة — مرة واحدة). أما wenn فتُستخدَم للأحداث المتكرّرة في الماضي، أو أي حدث في الحاضر أو المستقبل: "Wenn ich reise, nehme ich immer ein Buch mit" (عندما أسافر، آخذ دائماً كتاباً معي — تكرار). كلتاهما أداتا ربط ثانويتان تُرسلان الفعل إلى النهاية.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-als-wenn',
      slug: 'als-vs-wenn',
      level: 'A2',
      titleDe: 'als vs. wenn',
      titleAr: 'als مقابل wenn',
      conceptAr: 'als لحدث واحد منتهٍ في الماضي فقط؛ wenn لكل ما عدا ذلك (تكرار في الماضي، أو حاضر/مستقبل).',
      ruleAr:
        'اسأل: هل هذا حدث حصل مرّة واحدة فقط في الماضي؟ إن كانت الإجابة نعم استخدم als. إن كان الحدث متكرّراً (في الماضي أو غيره) أو يقع في الحاضر أو المستقبل، استخدم wenn. كلتاهما تُرسلان الفعل إلى نهاية الجملة الثانوية مثل باقي أدوات الربط الثانوية.',
      tables: [
        {
          caption: 'متى تُستخدَم كل أداة',
          headers: ['الأداة', 'الاستخدام', 'مثال'],
          rows: [
            { label: 'als', values: ['حدث واحد، ماضٍ منتهٍ', 'Als ich ankam, regnete es.'] },
            { label: 'wenn', values: ['تكرار في الماضي', 'Wenn ich Zeit hatte, bin ich gereist.'] },
            { label: 'wenn', values: ['حاضر / مستقبل', 'Wenn ich reise, nehme ich ein Buch mit.'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Als ich am Flughafen ankam, hatte das Flugzeug schon Verspätung.',
          ar: 'عندما وصلت إلى المطار، كانت الطائرة متأخّرة بالفعل. (حدث واحد، ماضٍ)',
          tokens: [
            { text: 'Als ich am Flughafen ankam,', role: 'جملة ثانوية (حدث واحد)' },
            { text: 'hatte das Flugzeug', role: 'الجملة الرئيسية' },
            { text: 'schon Verspätung.', role: 'الخبر' },
          ],
        },
        {
          de: 'Wenn ich verreise, steige ich immer früh in den Zug ein.',
          ar: 'عندما أسافر، أركب القطار دائماً باكراً. (تكرار)',
          tokens: [
            { text: 'Wenn ich verreise,', role: 'جملة ثانوية (تكرار)' },
            { text: 'steige', role: 'جذع الفعل' },
            { text: 'ich immer früh in den Zug', role: 'الحال + المفعول به' },
            { text: 'ein.', role: 'البادئة المنفصلة' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Wo muss ich umsteigen?', ar: 'أين يجب أن أُبدّل الرحلة؟' },
    { de: 'Eine Fahrkarte nach München, bitte.', ar: 'تذكرة إلى ميونخ، رجاءً.' },
    { de: 'Der Zug fährt von Gleis fünf ab.', ar: 'يغادر القطار من الرصيف الخامس.' },
    { de: 'Als wir in Berlin ankamen, war es schon dunkel.', ar: 'عندما وصلنا إلى برلين، كان الظلام قد حلّ بالفعل.' },
  ],
  vocabulary: [
    { id: 'voc-reisen-zug', word: 'Zug', article: 'der', partOfSpeech: 'noun', meaningAr: 'القطار', level: 'A2', category: 'وسائل النقل' },
    { id: 'voc-reisen-flugzeug', word: 'Flugzeug', article: 'das', partOfSpeech: 'noun', meaningAr: 'الطائرة', level: 'A2', category: 'وسائل النقل' },
    { id: 'voc-reisen-bahnhof', word: 'Bahnhof', article: 'der', partOfSpeech: 'noun', meaningAr: 'محطة القطار', level: 'A2', category: 'وسائل النقل' },
    { id: 'voc-reisen-flughafen', word: 'Flughafen', article: 'der', partOfSpeech: 'noun', meaningAr: 'المطار', level: 'A2', category: 'وسائل النقل' },
    { id: 'voc-reisen-fahrkarte', word: 'Fahrkarte', article: 'die', partOfSpeech: 'noun', meaningAr: 'تذكرة السفر', level: 'A2', category: 'وسائل النقل' },
    { id: 'voc-reisen-gleis', word: 'Gleis', article: 'das', partOfSpeech: 'noun', meaningAr: 'الرصيف (رقم القطار)', level: 'A2', category: 'وسائل النقل' },
    { id: 'voc-reisen-verspaetung', word: 'Verspätung', article: 'die', partOfSpeech: 'noun', meaningAr: 'التأخير', level: 'A2', category: 'وسائل النقل' },
    { id: 'voc-reisen-einsteigen', word: 'einsteigen', partOfSpeech: 'verb', meaningAr: 'يركب / يصعد', level: 'A2', category: 'أفعال السفر' },
    { id: 'voc-reisen-aussteigen', word: 'aussteigen', partOfSpeech: 'verb', meaningAr: 'ينزل', level: 'A2', category: 'أفعال السفر' },
    { id: 'voc-reisen-umsteigen', word: 'umsteigen', partOfSpeech: 'verb', meaningAr: 'يبدّل الرحلة', level: 'A2', category: 'أفعال السفر' },
    { id: 'voc-reisen-buchen', word: 'buchen', partOfSpeech: 'verb', meaningAr: 'يحجز', level: 'A2', category: 'أفعال السفر' },
    { id: 'voc-reisen-koffer', word: 'Koffer', article: 'der', partOfSpeech: 'noun', meaningAr: 'حقيبة السفر', level: 'A2', category: 'وسائل النقل' },
  ],
  dialogues: [
    {
      id: 'dialogue-reisen-informell',
      level: 'A2',
      moduleId: 'a2-m11',
      lessonId: 'a2-m11-l01',
      titleDe: 'Eine Reise planen',
      titleAr: 'التخطيط لرحلة',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Lior', de: 'Hast du schon die Fahrkarten gebucht?', ar: 'هل حجزت التذاكر بالفعل؟' },
        { speaker: 'b', name: 'Petra', de: 'Ja, wir müssen aber einmal umsteigen.', ar: 'نعم، لكن يجب أن نُبدّل الرحلة مرة واحدة.' },
        { speaker: 'a', name: 'Lior', de: 'Als ich das letzte Mal umgestiegen bin, hatte ich nur fünf Minuten Zeit!', ar: 'عندما بدّلت الرحلة آخر مرة، كان لدي خمس دقائق فقط!' },
        { speaker: 'b', name: 'Petra', de: 'Keine Sorge, diesmal haben wir 20 Minuten.', ar: 'لا تقلق، هذه المرة لدينا ٢٠ دقيقة.' },
      ],
    },
    {
      id: 'dialogue-reisen-formell',
      level: 'A2',
      moduleId: 'a2-m11',
      lessonId: 'a2-m11-l01',
      titleDe: 'Am Fahrkartenschalter',
      titleAr: 'في شبّاك التذاكر',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Reisender', de: 'Eine Fahrkarte nach Hamburg, bitte. Wann fährt der nächste Zug?', ar: 'تذكرة إلى هامبورغ، رجاءً. متى يغادر القطار التالي؟' },
        { speaker: 'b', name: 'Schalterbeamtin', de: 'Um 14 Uhr von Gleis sieben. Er hat momentan keine Verspätung.', ar: 'الساعة الثانية ظهراً من الرصيف السابع. ليس عليه تأخير حالياً.' },
        { speaker: 'a', name: 'Reisender', de: 'Muss ich umsteigen?', ar: 'هل يجب أن أُبدّل الرحلة؟' },
        { speaker: 'b', name: 'Schalterbeamtin', de: 'Nein, es ist eine direkte Verbindung.', ar: 'لا، إنه اتصال مباشر.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'ei في einsteigen وaussteigen', bodyAr: 'حروف ei دائماً [aɪ]، حتى في الأفعال المركّبة الطويلة.', example: 'einsteigen' },
    { titleAr: 'V في Verspätung تُنطق [f]', bodyAr: 'حرف V في الكلمات الألمانية الأصيلة يُنطق [f]، وليس [v].', example: 'Verspätung' },
  ],
  exercises: [
    {
      id: 'ex-reisen-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: ___ ich ankam, regnete es. (حدث واحد، ماضٍ)',
      questionDe: '___ ich ankam, regnete es.',
      options: ['Als', 'Wenn', 'Weil', 'Ob'],
      correctIndex: 0,
      explanationAr: 'حدث واحد منتهٍ في الماضي، فتُستخدَم als.',
    },
    {
      id: 'ex-reisen-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الأداة الصحيحة: ___ ich reise, nehme ich ein Buch mit. (تكرار)',
      questionDe: '___ ich reise, nehme ich ein Buch mit.',
      options: ['Wenn', 'Als', 'Dass', 'Ob'],
      correctIndex: 0,
      explanationAr: 'حدث متكرّر، فتُستخدَم wenn وليس als.',
    },
    {
      id: 'ex-reisen-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الفعل الصحيح: Wo muss ich ___؟ (تبديل الرحلة)',
      questionDe: 'Wo muss ich ___?',
      options: ['umsteigen', 'einsteigen', 'aussteigen', 'ansteigen'],
      correctIndex: 0,
      explanationAr: 'umsteigen تعني "يبدّل الرحلة".',
    },
    {
      id: 'ex-reisen-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل: Ich steige am Hauptbahnhof ____. (umsteigen)',
      sentenceDe: 'Ich steige am Hauptbahnhof ____.',
      acceptedAnswers: ['um'],
      hint: 'البادئة تنتقل إلى النهاية',
      explanationAr: 'umsteigen فعل منفصل: البادئة um في نهاية الجملة.',
    },
    {
      id: 'ex-reisen-5',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: '"als" benutzt man für wiederholte Ereignisse in der Vergangenheit.',
      isTrue: false,
      explanationAr: 'خطأ — als تُستخدَم لحدث واحد فقط، بينما wenn تُستخدَم للتكرار.',
    },
    {
      id: 'ex-reisen-6',
      type: 'matching',
      level: 'A2',
      promptAr: 'صل كل كلمة بمعناها',
      pairs: [
        { de: 'der Bahnhof', ar: 'محطة القطار' },
        { de: 'die Fahrkarte', ar: 'تذكرة السفر' },
        { de: 'das Gleis', ar: 'الرصيف' },
        { de: 'die Verspätung', ar: 'التأخير' },
      ],
      explanationAr: 'كل كلمة من هذه المجموعة لها مقابل واحد محدد بالعربية.',
    },
    {
      id: 'ex-reisen-7',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Als', 'wir', 'in', 'Berlin', 'ankamen,', 'war', 'es', 'schon', 'dunkel.'],
      correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      explanationAr: 'الترتيب الصحيح: "Als wir in Berlin ankamen, war es schon dunkel."',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Wenn ich zwölf war, bin ich zum ersten Mal geflogen.',
      correct: 'Als ich zwölf war, bin ich zum ersten Mal geflogen.',
      explanationAr: 'هذا حدث واحد منتهٍ في الماضي (كنت في الثانية عشرة مرّة واحدة)، فيجب استخدام als وليس wenn.',
    },
    {
      wrong: 'Als ich reise, nehme ich immer ein Buch mit.',
      correct: 'Wenn ich reise, nehme ich immer ein Buch mit.',
      explanationAr: 'كلمة "immer" (دائماً) تدلّ على تكرار، فيجب استخدام wenn وليس als.',
    },
    {
      wrong: 'Ich steige um am Hauptbahnhof.',
      correct: 'Ich steige am Hauptbahnhof um.',
      explanationAr: 'البادئة المنفصلة um يجب أن تنتقل إلى نهاية الجملة تماماً.',
    },
    {
      wrong: 'Eine Fahrkarte für München, bitte.',
      correct: 'Eine Fahrkarte nach München, bitte.',
      explanationAr: 'nach هي حرف الجر الصحيح للوجهة مع أسماء المدن، وليس für.',
    },
  ],
}

export const module11Reisen: Module = {
  id: 'a2-m11',
  slug: 'reisen-und-verkehrsmittel',
  level: 'A2',
  title: 'Reisen und Verkehrsmittel',
  titleAr: 'السفر ووسائل النقل',
  order: 11,
  lessons: [lessonReisen],
}
