import type { Lesson, Module } from '@/types'

export const lessonFutur: Lesson = {
  id: 'a2-m07-l01',
  slug: 'futur-i',
  level: 'A2',
  moduleId: 'a2-m07',
  title: 'Futur I',
  titleAr: 'المستقبل (Futur I)',
  estimatedMinutes: 28,
  objectivesAr: [
    'تصريف الفعل المساعد werden بشكل صحيح',
    'تكوين Futur I بتركيب werden + Infinitiv مع تطبيق قاعدة الإطار اللفظي',
    'استخدام Futur I للتعبير عن الوعد أو التأكيد على حدث مستقبلي',
    'استخدام Futur I للتعبير عن الافتراض حول الحاضر (وليس المستقبل فقط)',
  ],
  explanation: [
    {
      titleAr: 'الحاضر يكفي غالباً للمستقبل',
      bodyAr:
        'المفاجأة الأولى حول Futur I: الألمانية اليومية غالباً ما تستخدم المضارع البسيط + كلمة زمنية دالّة على المستقبل بدل Futur I: "Ich fahre morgen nach Berlin" (سأسافر غداً إلى برلين) أكثر شيوعاً من "Ich werde morgen nach Berlin fahren"، تماماً كما في العربية والإنجليزية العاميتين. يبقى Futur I ضرورياً في حالات محدّدة: التأكيد القوي أو الوعد، أو التعبير عن حدث بلا أي كلمة زمنية توضّحه، أو الافتراض حول الحاضر.',
    },
    {
      titleAr: 'استخدام مفاجئ: الافتراض حول الحاضر',
      bodyAr:
        'أحد أهم استخدامات Futur I لا علاقة له بالمستقبل إطلاقاً: التعبير عن افتراض أو تخمين حول الحاضر، غالباً مع ظرف مثل wohl (على الأرجح): "Er wird wohl noch schlafen" لا تعني "سينام" بل "هو نائم على الأرجح الآن". هذا الاستخدام شائع جداً في الحديث اليومي.',
    },
    {
      titleAr: 'werden فعل مساعد هنا، وليس "يصبح"',
      bodyAr:
        'احذر الخلط: werden فعل رئيسي بمعنى "يصبح" في جمل مثل "Ich werde Lehrer" (سأصبح معلّماً)، لكنها فعل مساعد بلا معنى مستقل في تركيب Futur I مثل "Ich werde arbeiten" (سأعمل) — الفرق أن الأولى بلا فعل ثانٍ في صيغة المصدر، والثانية دائماً مرفقة بفعل مصدر في نهاية الجملة.',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-futur-i',
      slug: 'futur-i-bildung',
      level: 'A2',
      titleDe: 'Futur I: werden + Infinitiv',
      titleAr: 'المستقبل: werden + Infinitiv',
      conceptAr: 'werden مصرَّفة في الموضع الثاني، والفعل الأساسي في صيغة المصدر بنهاية الجملة تماماً — نفس الإطار اللفظي المعتاد.',
      ruleAr:
        'صرّف werden حسب الفاعل وضعها في الموضع الثاني، ثم ضع الفعل الأساسي في صيغة المصدر بلا أي تغيير في نهاية الجملة تماماً، بعد كل المفاعيل والظروف.',
      tables: [
        {
          caption: 'تصريف werden',
          headers: ['الضمير', 'werden'],
          rows: [
            { label: 'ich', values: ['werde'] },
            { label: 'du', values: ['wirst'] },
            { label: 'er / sie / es', values: ['wird'] },
            { label: 'wir', values: ['werden'] },
            { label: 'ihr', values: ['werdet'] },
            { label: 'sie / Sie', values: ['werden'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Ich werde nächstes Jahr nach Japan reisen.',
          ar: 'سأسافر إلى اليابان العام القادم.',
          tokens: [
            { text: 'Ich', role: 'الفاعل' },
            { text: 'werde', role: 'الفعل المساعد' },
            { text: 'nächstes Jahr nach Japan', role: 'الحال + الوجهة' },
            { text: 'reisen.', role: 'الفعل الأساسي (مصدر)' },
          ],
        },
        {
          de: 'Er wird wohl noch schlafen.',
          ar: 'هو نائم على الأرجح الآن. (افتراض حول الحاضر، وليس مستقبلاً)',
          tokens: [
            { text: 'Er', role: 'الفاعل' },
            { text: 'wird', role: 'الفعل المساعد' },
            { text: 'wohl noch', role: 'أدوات الافتراض' },
            { text: 'schlafen.', role: 'الفعل الأساسي (مصدر)' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Ich verspreche, ich werde es nie wieder tun.', ar: 'أعدك، لن أفعل ذلك مجدداً أبداً. (وعد)' },
    { de: 'Es wird bald regnen.', ar: 'ستُمطر قريباً.' },
    { de: 'Sie wird wohl noch im Büro sein.', ar: 'هي على الأرجح ما زالت في المكتب. (افتراض)' },
    { de: 'Nächste Woche fahre ich nach Köln.', ar: 'الأسبوع القادم سأذهب إلى كولن. (مضارع بدل Futur I، أكثر شيوعاً)' },
  ],
  vocabulary: [
    { id: 'voc-futur-versprechen', word: 'versprechen', partOfSpeech: 'verb', meaningAr: 'يَعِد', level: 'A2', category: 'مفردات المستقبل' },
    { id: 'voc-futur-wohl', word: 'wohl', partOfSpeech: 'adverb', meaningAr: 'على الأرجح', level: 'A2', category: 'مفردات المستقبل' },
    { id: 'voc-futur-bald', word: 'bald', partOfSpeech: 'adverb', meaningAr: 'قريباً', level: 'A2', category: 'مفردات المستقبل' },
    { id: 'voc-futur-vielleicht', word: 'vielleicht', partOfSpeech: 'adverb', meaningAr: 'ربما', level: 'A2', category: 'مفردات المستقبل' },
    { id: 'voc-futur-zukunft', word: 'Zukunft', article: 'die', partOfSpeech: 'noun', meaningAr: 'المستقبل', level: 'A2', category: 'مفردات المستقبل' },
  ],
  dialogues: [
    {
      id: 'dialogue-futur-informell',
      level: 'A2',
      moduleId: 'a2-m07',
      lessonId: 'a2-m07-l01',
      titleDe: 'Ein Versprechen',
      titleAr: 'وعد بالتغيير',
      register: 'informal',
      lines: [
        { speaker: 'a', name: 'Pia', de: 'Du kommst schon wieder zu spät!', ar: 'تأتي متأخّراً مجدداً!' },
        { speaker: 'b', name: 'Kaan', de: 'Es tut mir leid. Ich werde das nie wieder tun.', ar: 'أنا آسف. لن أفعل ذلك مجدداً أبداً.' },
        { speaker: 'a', name: 'Pia', de: 'Wo ist Ben eigentlich? Er ist auch spät.', ar: 'أين بن أصلاً؟ هو متأخّر أيضاً.' },
        { speaker: 'b', name: 'Kaan', de: 'Er wird wohl noch im Verkehr stecken.', ar: 'هو على الأرجح عالق في الزحام الآن.' },
      ],
    },
    {
      id: 'dialogue-futur-formell',
      level: 'A2',
      moduleId: 'a2-m07',
      lessonId: 'a2-m07-l01',
      titleDe: 'Der Projektabschluss',
      titleAr: 'التزام تعاقدي',
      register: 'formal',
      lines: [
        { speaker: 'a', name: 'Frau Voss', de: 'Wann werden Sie das Projekt abschließen?', ar: 'متى ستنهون المشروع؟' },
        { speaker: 'b', name: 'Herr Diallo', de: 'Wir werden es bis Ende des Monats fertigstellen.', ar: 'سننهيه بحلول نهاية الشهر.' },
        { speaker: 'a', name: 'Frau Voss', de: 'Ausgezeichnet. Werden Sie uns wöchentlich informieren?', ar: 'ممتاز. هل ستُطلعوننا أسبوعياً؟' },
        { speaker: 'b', name: 'Herr Diallo', de: 'Ja, das versprechen wir Ihnen.', ar: 'نعم، نعدكم بذلك.' },
      ],
    },
  ],
  pronunciationTips: [
    { titleAr: 'wirst وwird بحرف r متبوعاً بصامت', bodyAr: 'حرف r بعد i هنا يُنطق خفيفاً جداً، يكاد يتلاشى قبل الصامت التالي.', example: 'wird' },
    { titleAr: 'werden وwerdet: النبرة على المقطع الأول', bodyAr: 'النبرة الرئيسية تقع دائماً على WER في كل صيغ werden.', example: 'werden' },
  ],
  exercises: [
    {
      id: 'ex-futur-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر تصريف werden الصحيح: Ich ___ nach Japan reisen.',
      questionDe: 'Ich ___ nach Japan reisen.',
      options: ['werde', 'wirst', 'wird', 'werdet'],
      correctIndex: 0,
      explanationAr: 'صيغة ich من werden هي werde.',
    },
    {
      id: 'ex-futur-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الترتيب الصحيح',
      questionDe: '___',
      options: [
        'Ich werde morgen arbeiten.',
        'Ich werde arbeiten morgen.',
        'Ich morgen werde arbeiten.',
        'Arbeiten ich werde morgen.',
      ],
      correctIndex: 0,
      explanationAr: 'werde في الموضع الثاني، وarbeiten (مصدر) في نهاية الجملة تماماً.',
    },
    {
      id: 'ex-futur-3',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'أي جملة تعبّر عن افتراض حول الحاضر، وليس المستقبل؟',
      questionDe: '___',
      options: [
        'Er wird wohl noch schlafen.',
        'Er wird nächstes Jahr nach Berlin fahren.',
        'Ich werde das nie vergessen.',
        'Wir werden bald ankommen.',
      ],
      correctIndex: 0,
      explanationAr: 'wohl + Futur I يعبّر عن افتراض حول الحاضر: "هو نائم على الأرجح الآن".',
    },
    {
      id: 'ex-futur-4',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل: Es ____ bald regnen. (es)',
      sentenceDe: 'Es ____ bald regnen.',
      acceptedAnswers: ['wird'],
      hint: 'صيغة es/er/sie',
      explanationAr: 'صيغة es من werden هي wird.',
    },
    {
      id: 'ex-futur-5',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Im Alltag benutzt man oft das Präsens statt Futur I für geplante Ereignisse.',
      isTrue: true,
      explanationAr: 'صحيح — المضارع + كلمة زمنية أكثر شيوعاً من Futur I في الحديث اليومي عن خطط مستقبلية.',
    },
    {
      id: 'ex-futur-6',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتب الكلمات لتكوين جملة صحيحة',
      words: ['Wir', 'werden', 'das', 'Projekt', 'abschließen.'],
      correctOrder: [0, 1, 2, 3, 4],
      explanationAr: 'الترتيب الصحيح: "Wir werden das Projekt abschließen."',
    },
    {
      id: 'ex-futur-7',
      type: 'matching',
      level: 'A2',
      promptAr: 'صل كل ضمير بصيغة werden الصحيحة',
      pairs: [
        { de: 'du', ar: 'wirst' },
        { de: 'ihr', ar: 'werdet' },
        { de: 'er', ar: 'wird' },
        { de: 'wir', ar: 'werden' },
      ],
      explanationAr: 'كل ضمير له صيغة werden محددة.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Ich werde arbeiten morgen.',
      correct: 'Ich werde morgen arbeiten.',
      explanationAr: 'الفعل الأساسي في صيغة المصدر يجب أن يبقى في نهاية الجملة تماماً، بعد الظروف.',
    },
    {
      wrong: 'Ich werde zu essen.',
      correct: 'Ich werde essen.',
      explanationAr: 'الفعل الأساسي بعد werden في Futur I لا يحتاج zu أبداً.',
    },
    {
      wrong: 'Er wird Lehrer arbeiten.',
      correct: 'Er wird Lehrer. / Er wird als Lehrer arbeiten.',
      explanationAr: 'werden بمعنى "يصبح" فعل رئيسي مستقل بلا فعل ثانٍ؛ لا تخلط بينها وبين تركيب Futur I.',
    },
    {
      wrong: 'Du wirdst spät kommen.',
      correct: 'Du wirst spät kommen.',
      explanationAr: 'صيغة du من werden هي wirst، وليس wirdst.',
    },
  ],
}

export const module07Futur: Module = {
  id: 'a2-m07',
  slug: 'futur-i',
  level: 'A2',
  title: 'Futur I',
  titleAr: 'المستقبل',
  order: 7,
  lessons: [lessonFutur],
}
