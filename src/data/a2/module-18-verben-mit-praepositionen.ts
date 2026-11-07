import type { Lesson, Module } from '@/types'

/**
 * Verbs that take a fixed preposition (warten auf, denken an, Angst haben vor …). The roadmap treats this topic
 * at B1; it is placed here because A2 learners meet these verbs in every text and conversation. Only the
 * most frequent ten are taught, each as a unit with its case, and only with people asked about
 * ("Auf wen wartest du?"): the question words for things (worauf, wofür) are left to B1.
 */
export const lessonVerbenMitPraepositionen: Lesson = {
  id: 'a2-m18-l01',
  slug: 'verben-mit-praepositionen',
  level: 'A2',
  moduleId: 'a2-m18',
  title: 'Verben mit Präpositionen',
  titleAr: 'الأفعال المرتبطة بحرف جر: warten auf, denken an …',
  estimatedMinutes: 30,
  objectivesAr: [
    'تعلّم الفعل مع حرف الجر الذي لا يتغيّر كوحدة واحدة: warten auf، denken an، Angst haben vor',
    'معرفة الحالة التي يطلبها حرف الجر: Akkusativ (auf، an، über، für) أو Dativ (vor، von، nach)',
    'استخدام عشرة أفعال شائعة في جمل صحيحة',
    'السؤال عن الأشخاص: Auf wen wartest du؟ Mit wem sprichst du؟',
  ],
  explanation: [
    {
      titleAr: 'الفعل وحرف الجر وحدة واحدة',
      bodyAr:
        'في العربية نقول "أنتظر الحافلة" بلا حرف جر، و"أفكّر في عائلتي" بحرف "في". والألمانية كذلك، لكن حرف الجر فيها **ثابت مع الفعل** ويجب حفظه معه، لأنه لا يُستنتج من المعنى: **warten auf** (ينتظر)، **denken an** (يفكّر في)، **sich interessieren für** (يهتم بـ). لذلك نتعلّم دائماً: الفعل + حرف الجر + الحالة.',
    },
    {
      titleAr: 'أي حالة بعد حرف الجر؟',
      bodyAr:
        'كل حرف جر في القائمة يطلب حالة ثابتة في هذه الأفعال: **Akkusativ** بعد auf وan وüber وfür: Ich warte **auf den** Bus. و**Dativ** بعد vor وvon وnach وmit: Ich habe Angst **vor dem** Test. لا تفكّر هنا في Wo/Wohin: الحالة تتبع الفعل، لا المكان.',
    },
    {
      titleAr: 'الفعل الانعكاسي مع حرف الجر',
      bodyAr:
        'بعض هذه الأفعال انعكاسية، فنضع الضمير الانعكاسي ثم حرف الجر: Ich freue **mich auf** den Urlaub. (أتطلّع إلى الإجازة، وهي لم تأتِ بعد) / Ich freue **mich über** das Geschenk. (أفرح بالهدية، وقد وصلت). وأيضاً: Sie interessiert **sich für** Musik. / Ich ärgere **mich über** den Lärm.',
    },
    {
      titleAr: 'السؤال عن الأشخاص',
      bodyAr:
        'للسؤال عن شخص نضع حرف الجر قبل كلمة الاستفهام: **Auf wen** wartest du؟ — Auf meinen Bruder. **An wen** denkst du؟ **Mit wem** sprichst du؟ (مع mit نستعمل wem لأنها Dativ). أما السؤال عن الأشياء بصيغة worauf وwofür فمستوى لاحق.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-verben-praepositionen',
      slug: 'verben-mit-praepositionen',
      level: 'A2',
      titleDe: 'Verben mit Präpositionen',
      titleAr: 'أفعال بحرف جر ثابت',
      conceptAr: 'بعض الأفعال لا تأتي بدون حرف جر معيّن، وهذا الحرف يحدّد الحالة، لذلك نحفظهما معاً.',
      ruleAr:
        'احفظ الفعل مع حرف الجر والحالة كوحدة واحدة. الحالة تتبع الفعل: auf وan وüber وfür مع Akkusativ هنا، وvor وvon وnach مع Dativ. وللأشخاص نسأل: حرف الجر + wen أو wem.',
      tables: [
        {
          caption: 'عشرة أفعال شائعة',
          headers: ['الفعل', 'حرف الجر', 'الحالة', 'المعنى'],
          rows: [
            { label: 'warten', values: ['auf', 'Akkusativ', 'ينتظر'] },
            { label: 'sich freuen', values: ['auf / über', 'Akkusativ', 'يتطلّع إلى / يفرح بـ'] },
            { label: 'denken', values: ['an', 'Akkusativ', 'يفكّر في'] },
            { label: 'sich interessieren', values: ['für', 'Akkusativ', 'يهتم بـ'] },
            { label: 'sprechen', values: ['über', 'Akkusativ', 'يتحدث عن'] },
            { label: 'sich ärgern', values: ['über', 'Akkusativ', 'ينزعج من'] },
            { label: 'fragen', values: ['nach', 'Dativ', 'يسأل عن'] },
            { label: 'träumen', values: ['von', 'Dativ', 'يحلم بـ'] },
            { label: 'Angst haben', values: ['vor', 'Dativ', 'يخاف من'] },
            { label: 'sprechen', values: ['mit', 'Dativ', 'يتحدث مع'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich warte auf den Bus.',
          ar: 'أنتظر الحافلة.',
          tokens: [
            { text: 'Ich warte', role: 'الفاعل والفعل' },
            { text: 'auf', role: 'حرف الجر الثابت' },
            { text: 'den Bus.', role: 'Akkusativ (der Bus → den Bus)' },
          ],
        },
        {
          de: 'Ich habe Angst vor dem Test.',
          ar: 'أخاف من الاختبار.',
          tokens: [
            { text: 'Ich habe Angst', role: 'التعبير' },
            { text: 'vor', role: 'حرف الجر الثابت' },
            { text: 'dem Test.', role: 'Dativ (der Test → dem Test)' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Sie wartet auf ihre Freundin.', ar: 'تنتظر صديقتها.' },
    { de: 'Er denkt oft an seine Familie.', ar: 'يفكّر كثيراً في عائلته.' },
    { de: 'Sie interessiert sich für Musik.', ar: 'تهتم بالموسيقى.' },
    { de: 'Wir sprechen über das Wetter.', ar: 'نتحدث عن الطقس.' },
    { de: 'Er fragt nach dem Weg.', ar: 'يسأل عن الطريق.' },
    { de: 'Sie träumt von einer Reise.', ar: 'تحلم برحلة.' },
    { de: 'Auf wen wartest du?', ar: 'من تنتظر؟' },
    { de: 'Mit wem sprichst du?', ar: 'مع من تتحدث؟' },
  ],
  vocabulary: [
    { id: 'voc-vprae-denken', word: 'denken', partOfSpeech: 'verb', meaningAr: 'يفكّر', level: 'A2', category: 'أفعال بحرف جر', verb: { praeteritum: 'dachte', partizip: 'gedacht', auxiliary: 'haben' }, example: { de: 'Ich denke oft an meine Familie.', ar: 'أفكّر كثيراً في عائلتي.' } },
    { id: 'voc-vprae-traeumen', word: 'träumen', partOfSpeech: 'verb', meaningAr: 'يحلم', level: 'A2', category: 'أفعال بحرف جر', verb: { praeteritum: 'träumte', partizip: 'geträumt', auxiliary: 'haben' }, example: { de: 'Sie träumt von einer Reise.', ar: 'تحلم برحلة.' } },
    { id: 'voc-vprae-aergern', word: 'sich ärgern', partOfSpeech: 'verb', meaningAr: 'ينزعج / يغضب', level: 'A2', category: 'أفعال بحرف جر', verb: { praeteritum: 'ärgerte', partizip: 'geärgert', auxiliary: 'haben' }, example: { de: 'Ich ärgere mich über den Lärm.', ar: 'أنزعج من الضجيج.' } },
    { id: 'voc-vprae-interessieren', word: 'sich interessieren', partOfSpeech: 'verb', meaningAr: 'يهتم', level: 'A2', category: 'أفعال بحرف جر', verb: { praeteritum: 'interessierte', partizip: 'interessiert', auxiliary: 'haben' }, example: { de: 'Sie interessiert sich für Musik.', ar: 'تهتم بالموسيقى.' } },
    { id: 'voc-vprae-angst', word: 'Angst', article: 'die', plural: 'Ängste', partOfSpeech: 'noun', meaningAr: 'الخوف', level: 'A2', category: 'أفعال بحرف جر', example: { de: 'Ich habe Angst vor dem Test.', ar: 'أخاف من الاختبار.' } },
    { id: 'voc-vprae-bestellung', word: 'Bestellung', article: 'die', plural: 'Bestellungen', partOfSpeech: 'noun', meaningAr: 'الطلبية', level: 'A2', category: 'أفعال بحرف جر', example: { de: 'Ich warte seit zwei Wochen auf meine Bestellung.', ar: 'أنتظر طلبيتي منذ أسبوعين.' } },
    { id: 'voc-vprae-paket', word: 'Paket', article: 'das', plural: 'Pakete', partOfSpeech: 'noun', meaningAr: 'الطرد', level: 'A2', category: 'أفعال بحرف جر', example: { de: 'Ich frage nach dem Paket.', ar: 'أسأل عن الطرد.' } },
  ],
  dialogues: [
    {
      id: 'dialogue-vprae-informell',
      level: 'A2',
      moduleId: 'a2-m18',
      lessonId: 'a2-m18-l01',
      titleDe: 'Vor dem Urlaub',
      titleAr: 'قبل الإجازة',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Selma', de: 'Freust du dich auf den Urlaub?', ar: 'هل تتطلّع إلى الإجازة؟' },
        { speaker: 'b', name: 'Paul', de: 'Ja, sehr! Ich träume schon lange von einer Reise nach Spanien.', ar: 'نعم جداً! أحلم منذ زمن برحلة إلى إسبانيا.' },
        { speaker: 'a', name: 'Selma', de: 'Ich habe ein bisschen Angst vor dem Flug.', ar: 'عندي خوف قليل من الرحلة الجوية.' },
        { speaker: 'b', name: 'Paul', de: 'Keine Sorge. Ich helfe dir bei allem.', ar: 'لا تقلقي. سأساعدك في كل شيء.' },
      ],
    },
    {
      id: 'dialogue-vprae-formell',
      level: 'A2',
      moduleId: 'a2-m18',
      lessonId: 'a2-m18-l01',
      titleDe: 'Beim Kundenservice',
      titleAr: 'في خدمة العملاء',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Frau Kaya', de: 'Guten Tag. Ich warte seit zwei Wochen auf meine Bestellung.', ar: 'مساء الخير. أنتظر طلبيتي منذ أسبوعين.' },
        { speaker: 'b', name: 'Herr Weiß', de: 'Das tut mir leid. Haben Sie Ihre Bestellnummer?', ar: 'يؤسفني ذلك. هل لديكم رقم الطلب؟' },
        { speaker: 'a', name: 'Frau Kaya', de: 'Ja. Ich ärgere mich wirklich über die lange Wartezeit.', ar: 'نعم. أنا منزعجة حقاً من طول مدة الانتظار.' },
        { speaker: 'b', name: 'Herr Weiß', de: 'Ich verstehe Sie. Ich frage sofort nach Ihrem Paket.', ar: 'أتفهّمكم. سأسأل فوراً عن طردكم.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'ä وö وü في träumen وärgern', bodyAr: 'ä تُنطق مثل "إي" مفتوحة قريبة من "أي"، كما في träumen (تْرويمن) وÄrger. الفعل träumen فيه äu وتُنطق "أوي".', example: 'träumen' },
    { titleAr: 'نبرة حرف الجر', bodyAr: 'حرف الجر الثابت قصير بلا نبرة: النبرة على الفعل وعلى الاسم بعده، مثل: Ich WARte auf den BUS.', example: 'Ich warte auf den Bus.' },
  ],
  exercises: [
    {
      id: 'ex-vprae-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر حرف الجر الصحيح',
      questionDe: 'Ich warte ___ den Bus.',
      options: ['auf', 'an', 'für', 'von'],
      correctIndex: 0,
      explanationAr: 'warten auf + Akkusativ.',
    },
    {
      id: 'ex-vprae-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر حرف الجر الصحيح',
      questionDe: 'Sie interessiert sich ___ Musik.',
      options: ['für', 'auf', 'über', 'mit'],
      correctIndex: 0,
      explanationAr: 'sich interessieren für + Akkusativ.',
    },
    {
      id: 'ex-vprae-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر حرف الجر الصحيح',
      questionDe: 'Er hat Angst ___ dem Hund.',
      options: ['vor', 'für', 'auf', 'an'],
      correctIndex: 0,
      explanationAr: 'Angst haben vor + Dativ.',
    },
    {
      id: 'ex-vprae-4',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر حرف الجر الصحيح',
      questionDe: 'Wir sprechen ___ das Wetter.',
      options: ['über', 'nach', 'von', 'vor'],
      correctIndex: 0,
      explanationAr: 'sprechen über + Akkusativ (تحدّث عن موضوع).',
    },
    {
      id: 'ex-vprae-5',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بأداة التعريف أو الملكية الصحيحة',
      sentenceDe: 'Ich denke oft an ___ Familie. (meine / meiner)',
      acceptedAnswers: ['meine'],
      hint: 'denken an + Akkusativ',
      explanationAr: 'denken an + Akkusativ، وdie Familie مؤنث فنقول an meine Familie.',
    },
    {
      id: 'ex-vprae-6',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل بأداة التعريف الصحيحة',
      sentenceDe: 'Er fragt nach ___ Weg.',
      acceptedAnswers: ['dem'],
      hint: 'fragen nach + Dativ',
      explanationAr: 'nach يطلب Dativ، وder Weg مذكّر فيصير dem Weg.',
    },
    {
      id: 'ex-vprae-7',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Man sagt: „Ich warte den Bus.“',
      isTrue: false,
      explanationAr: 'خطأ. في الألمانية نقول: Ich warte auf den Bus.',
    },
    {
      id: 'ex-vprae-8',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات لتكوين جملة',
      words: ['Bus.', 'Ich', 'den', 'auf', 'warte'],
      correctOrder: [1, 4, 3, 2, 0],
      explanationAr: 'الترتيب: Ich warte auf den Bus.',
    },
    {
      id: 'ex-vprae-9',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق الفعل مع حرف الجر والمعنى',
      pairs: [
        { de: 'warten auf', ar: 'ينتظر' },
        { de: 'denken an', ar: 'يفكّر في' },
        { de: 'träumen von', ar: 'يحلم بـ' },
        { de: 'Angst haben vor', ar: 'يخاف من' },
        { de: 'sich ärgern über', ar: 'ينزعج من' },
      ],
      explanationAr: 'احفظ كل فعل مع حرف جره كوحدة واحدة.',
    },
    {
      id: 'ex-vprae-10',
      type: 'vocab-recall',
      level: 'A2',
      promptAr: 'ما معنى هذه الكلمة؟',
      vocabularyId: 'voc-vprae-angst',
      questionDe: 'die Angst',
      correctAnswerAr: 'الخوف',
      distractorsAr: ['الغضب', 'الفرح', 'الحلم'],
      explanationAr: 'die Angst = الخوف، ونقول: Angst haben vor + Dativ.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich warte den Bus.',
      correct: 'Ich warte auf den Bus.',
      explanationAr: 'warten يحتاج حرف الجر auf، حتى لو كان الفعل في العربية بلا حرف جر.',
    },
    {
      wrong: 'Ich habe Angst von dem Test.',
      correct: 'Ich habe Angst vor dem Test.',
      explanationAr: 'للخوف نقول Angst haben vor + Dativ، وليس von.',
    },
    {
      wrong: 'Er fragt nach den Weg.',
      correct: 'Er fragt nach dem Weg.',
      explanationAr: 'nach يطلب Dativ دائماً، فنقول nach dem Weg.',
    },
    {
      wrong: 'Ich freue mich über den Urlaub nächste Woche.',
      correct: 'Ich freue mich auf den Urlaub nächste Woche.',
      explanationAr: 'للشيء القادم نقول sich freuen auf، وللشيء الذي حدث وصل نقول sich freuen über.',
    },
  ],
}

export const module18VerbenMitPraepositionen: Module = {
  id: 'a2-m18',
  slug: 'verben-mit-praepositionen',
  level: 'A2',
  title: 'Verben mit Präpositionen',
  titleAr: 'أفعال بحرف جر ثابت',
  order: 18,
  lessons: [lessonVerbenMitPraepositionen],
}
