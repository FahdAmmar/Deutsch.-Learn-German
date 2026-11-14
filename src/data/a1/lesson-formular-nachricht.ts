import type { Lesson } from '@/types'

/**
 * A personal-data form and a short message: what the fields of a form are called, how an e-mail address is read
 * aloud, and the frame of an informal or a formal short message (greeting, one or two sentences, closing).
 * Everything is built from sentences the learner already knows (ich bin, ich komme, ich wohne).
 */
export const lessonFormularNachricht: Lesson = {
  id: 'a1-m01-l10',
  slug: 'formular-und-nachricht',
  level: 'A1',
  moduleId: 'a1-m01',
  title: 'Formular und kurze Nachricht',
  titleAr: 'نموذج البيانات الشخصية والرسالة القصيرة',
  estimatedMinutes: 22,
  objectivesAr: [
    'فهم حقول نموذج البيانات: Vorname، Nachname، Geburtsdatum، Wohnort …',
    'قراءة عنوان البريد الإلكتروني بصوت عالٍ: at، Punkt، Bindestrich',
    'كتابة رسالة قصيرة غير رسمية (WhatsApp / SMS) برسالة افتتاح وخاتمة',
    'كتابة رسالة رسمية قصيرة لمعلم أو لشركة بصيغة مناسبة',
  ],
  explanation: [
    {
      titleAr: 'حقول النموذج',
      bodyAr:
        'في أي نموذج ألماني تجد هذه الحقول: **Vorname** (الاسم الأول)، **Nachname** أو Familienname (اسم العائلة)، **Geburtsdatum** (تاريخ الميلاد)، **Geburtsort** (مكان الولادة)، **Wohnort** (مكان السكن)، **Straße** و**Hausnummer** و**Postleitzahl** (PLZ)، **Telefon** أو Handynummer، **E-Mail**، **Familienstand** (الحالة الاجتماعية: ledig أعزب، verheiratet متزوج)، و**Unterschrift** (التوقيع). انتبه: Vorname هو اسمك الأول، وNachname هو اسم العائلة، فاكتب اسمك كما في جواز السفر.',
    },
    {
      titleAr: 'ملء النموذج',
      bodyAr:
        'مثال: Vorname: **Omar**، Nachname: **Haddad**، Geburtsdatum: **12.03.1995**، Wohnort: **Berlin**، Straße: **Goethestraße 12**، PLZ: **10115**. التاريخ يُكتب يوم.شهر.سنة بالنقاط. وإذا قيل لك "Bitte füllen Sie das Formular aus" فمعناه: املأ النموذج. والفعل **ausfüllen** منفصل: Ich fülle das Formular aus.',
    },
    {
      titleAr: 'كيف نقرأ البريد الإلكتروني؟',
      bodyAr:
        'نقرأ العنوان رمزاً رمزاً: **@** = **at**، **.** = **Punkt**، **-** = **Bindestrich**، **_** = **Unterstrich**. فالعنوان omar.haddad@mail.de نقرأه: "omar Punkt haddad at mail Punkt de". وهذا ما تحتاجه عندما تُملي بريدك على موظف.',
    },
    {
      titleAr: 'رسالة قصيرة غير رسمية',
      bodyAr:
        'مع صديق نبدأ بـ **Hallo Anna,** أو **Liebe Anna,** ثم جملة أو جملتين، ثم نختم بـ **Bis bald!** أو **Liebe Grüße** وتختصر **LG**، أو **Viele Grüße** وتختصر **VG**. مثال: "Hallo Anna, ich bin um 18 Uhr da. Bis bald! LG Omar". قاعدة مهمة: بعد الفاصلة التي تلي التحية نبدأ **بحرف صغير** (ich، wir، das)، ما لم تكن الكلمة اسماً.',
    },
    {
      titleAr: 'رسالة رسمية قصيرة',
      bodyAr:
        'مع المعلمة أو الشركة نستعمل Sie: **Liebe Frau Klein,** (للمعلمة المألوفة) أو **Sehr geehrte Frau Klein,** (رسمي جداً)، ثم النص، ثم **Mit freundlichen Grüßen** مع الاسم الكامل. مثال: "Sehr geehrte Frau Klein, ich bin heute krank. Ich komme morgen. Mit freundlichen Grüßen, Omar Haddad". ولا نكتب LG في الرسائل الرسمية.',
    },
  ],
  examples: [
    { de: 'Mein Vorname ist Omar und mein Nachname ist Haddad.', ar: 'اسمي الأول عمر واسم عائلتي حداد.' },
    { de: 'Mein Geburtsdatum ist der zwölfte März neunzehnhundertfünfundneunzig.', ar: 'تاريخ ميلادي 12 مارس 1995.' },
    { de: 'Ich wohne in Berlin, in der Goethestraße zwölf.', ar: 'أسكن في برلين في شارع غوته رقم 12.' },
    { de: 'Meine E-Mail ist omar Punkt haddad at mail Punkt de.', ar: 'بريدي الإلكتروني omar.haddad@mail.de.' },
    { de: 'Bitte füllen Sie das Formular aus.', ar: 'من فضلك املأ النموذج.' },
    { de: 'Hallo Anna, ich bin um 18 Uhr da. Bis bald! LG Omar', ar: 'مرحباً آنا، سأكون هناك الساعة 18. إلى اللقاء! مع التحية، عمر' },
    { de: 'Liebe Frau Klein, ich bin heute krank. Ich komme morgen. Viele Grüße, Omar Haddad', ar: 'عزيزتي السيدة كلاين، أنا مريض اليوم. سأحضر غداً. مع التحية، عمر حداد' },
    { de: 'Sehr geehrte Frau Klein, ich komme heute nicht. Mit freundlichen Grüßen, Omar Haddad', ar: 'السيدة كلاين المحترمة، لن أحضر اليوم. مع فائق الاحترام، عمر حداد' },
  ],
  vocabulary: [
    { id: 'voc-formular-formular', word: 'Formular', article: 'das', plural: 'Formulare', partOfSpeech: 'noun', meaningAr: 'النموذج (الاستمارة)', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Das Formular ist kurz.', ar: 'النموذج قصير.' } },
    { id: 'voc-formular-vorname', word: 'Vorname', article: 'der', plural: 'Vornamen', partOfSpeech: 'noun', meaningAr: 'الاسم الأول', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Mein Vorname ist Omar.', ar: 'اسمي الأول عمر.' } },
    { id: 'voc-formular-nachname', word: 'Nachname', article: 'der', plural: 'Nachnamen', partOfSpeech: 'noun', meaningAr: 'اسم العائلة', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Mein Nachname ist Haddad.', ar: 'اسم عائلتي حداد.' } },
    { id: 'voc-formular-geburtsdatum', word: 'Geburtsdatum', article: 'das', plural: 'Geburtsdaten', partOfSpeech: 'noun', meaningAr: 'تاريخ الميلاد', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Wie ist Ihr Geburtsdatum?', ar: 'ما تاريخ ميلادكم؟' } },
    { id: 'voc-formular-geburtsort', word: 'Geburtsort', article: 'der', plural: 'Geburtsorte', partOfSpeech: 'noun', meaningAr: 'مكان الولادة', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Mein Geburtsort ist Damaskus.', ar: 'مكان ولادتي دمشق.' } },
    { id: 'voc-formular-wohnort', word: 'Wohnort', article: 'der', plural: 'Wohnorte', partOfSpeech: 'noun', meaningAr: 'مكان السكن', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Mein Wohnort ist Berlin.', ar: 'مكان سكني برلين.' } },
    { id: 'voc-formular-adresse', word: 'Adresse', article: 'die', plural: 'Adressen', partOfSpeech: 'noun', meaningAr: 'العنوان', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Wie ist Ihre Adresse?', ar: 'ما عنوانكم؟' } },
    { id: 'voc-formular-familienstand', word: 'Familienstand', article: 'der', numberUse: 'none', partOfSpeech: 'noun', meaningAr: 'الحالة الاجتماعية', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Mein Familienstand ist ledig.', ar: 'حالتي الاجتماعية أعزب.' } },
    { id: 'voc-formular-ledig', word: 'ledig', partOfSpeech: 'adjective', meaningAr: 'أعزب / عزباء', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Meine Schwester ist noch ledig.', ar: 'أختي ما زالت عزباء.' } },
    { id: 'voc-formular-verheiratet', word: 'verheiratet', partOfSpeech: 'adjective', meaningAr: 'متزوج / متزوجة', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Mein Bruder ist verheiratet.', ar: 'أخي متزوج.' } },
    { id: 'voc-formular-unterschrift', word: 'Unterschrift', article: 'die', plural: 'Unterschriften', partOfSpeech: 'noun', meaningAr: 'التوقيع', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Hier fehlt noch Ihre Unterschrift.', ar: 'ينقص هنا توقيعكم.' } },
    { id: 'voc-formular-email', word: 'E-Mail', article: 'die', plural: 'E-Mails', partOfSpeech: 'noun', meaningAr: 'البريد الإلكتروني (رسالة)', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Ich schreibe eine E-Mail an Frau Klein.', ar: 'أكتب بريداً إلكترونياً للسيدة كلاين.' } },
    { id: 'voc-formular-nachricht', word: 'Nachricht', article: 'die', plural: 'Nachrichten', partOfSpeech: 'noun', meaningAr: 'الرسالة (القصيرة)', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Anna schickt mir eine Nachricht.', ar: 'آنا ترسل لي رسالة.' } },
    { id: 'voc-formular-gruss', word: 'Gruß', article: 'der', plural: 'Grüße', partOfSpeech: 'noun', meaningAr: 'التحية', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Viele Grüße an deine Familie!', ar: 'تحياتي الكثيرة لعائلتك!' } },
    { id: 'voc-formular-ausfuellen', word: 'ausfüllen', partOfSpeech: 'verb', meaningAr: 'يملأ (نموذجاً)', level: 'A1', category: 'Formular und Nachricht', verb: { praeteritum: 'füllte', partizip: 'ausgefüllt', auxiliary: 'haben', separablePrefix: 'aus' }, example: { de: 'Ich fülle das Formular aus.', ar: 'أملأ النموذج.' } },
    { id: 'voc-formular-bis-bald', word: 'Bis bald!', partOfSpeech: 'phrase', meaningAr: 'إلى اللقاء قريباً!', level: 'A1', category: 'Formular und Nachricht', example: { de: 'Ich schreibe dir morgen. Bis bald!', ar: 'سأكتب لك غداً. إلى اللقاء قريباً!' } },
  ],
  exercises: [
    {
      id: 'ex-formular-1',
      type: 'matching',
      level: 'A1',
      promptAr: 'طابق حقل النموذج بمعناه',
      pairs: [
        { de: 'Vorname', ar: 'الاسم الأول' },
        { de: 'Nachname', ar: 'اسم العائلة' },
        { de: 'Wohnort', ar: 'مكان السكن' },
        { de: 'Geburtsort', ar: 'مكان الولادة' },
      ],
      explanationAr: 'Vorname = الاسم الأول، وNachname = اسم العائلة.',
    },
    {
      id: 'ex-formular-2',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'اسمك عمر حداد. أين تكتب "Haddad"؟',
      questionDe: '',
      options: ['Nachname', 'Vorname', 'Wohnort', 'Geburtsdatum'],
      correctIndex: 0,
      explanationAr: 'حداد اسم العائلة، أي Nachname.',
    },
    {
      id: 'ex-formular-3',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'كيف نقرأ الرمز @ في عنوان البريد؟',
      questionDe: '',
      options: ['at', 'Punkt', 'Unterstrich', 'Bindestrich'],
      correctIndex: 0,
      explanationAr: '@ = at، والنقطة = Punkt، والشرطة = Bindestrich، والشرطة السفلية = Unterstrich.',
    },
    {
      id: 'ex-formular-4',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بقراءة النقطة',
      sentenceDe: 'omar ___ haddad at mail Punkt de',
      acceptedAnswers: ['Punkt'],
      hint: 'النقطة',
      explanationAr: 'النقطة في عنوان البريد تُقرأ Punkt.',
    },
    {
      id: 'ex-formular-5',
      type: 'multiple-choice',
      level: 'A1',
      promptAr: 'أيّ خاتمة تناسب رسالة لصديقة؟',
      questionDe: '',
      options: ['Mit freundlichen Grüßen', 'Liebe Grüße', 'Sehr geehrte Damen und Herren', 'Guten Tag'],
      correctIndex: 1,
      explanationAr: 'Liebe Grüße (أو LG) للأصدقاء. أما Mit freundlichen Grüßen فللرسائل الرسمية.',
    },
    {
      id: 'ex-formular-6',
      type: 'true-false',
      level: 'A1',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'Nach „Hallo Anna,“ schreibt man das nächste Wort klein, zum Beispiel „ich“.',
      isTrue: true,
      explanationAr: 'صحيح. بعد فاصلة التحية نبدأ بحرف صغير ما لم تكن الكلمة اسماً.',
    },
    {
      id: 'ex-formular-7',
      type: 'fill-blank',
      level: 'A1',
      promptAr: 'أكمل بالفعل المنفصل',
      sentenceDe: 'Ich fülle das Formular ___.',
      acceptedAnswers: ['aus'],
      hint: 'ausfüllen',
      explanationAr: 'ausfüllen فعل منفصل: Ich fülle das Formular aus.',
    },
    {
      id: 'ex-formular-8',
      type: 'ordering',
      level: 'A1',
      promptAr: 'رتّب الكلمات',
      words: ['Nachricht', 'schreibe', 'eine', 'Ich'],
      correctOrder: [3, 1, 2, 0],
      explanationAr: 'Ich schreibe eine Nachricht.',
    },
    {
      id: 'ex-formular-9',
      type: 'translation',
      level: 'A1',
      promptAr: 'ترجم إلى الألمانية',
      direction: 'ar-to-de',
      sourceText: 'اسمي الأول عمر واسم عائلتي حداد.',
      acceptedAnswers: ['Mein Vorname ist Omar und mein Nachname ist Haddad.', 'Mein Vorname ist Omar und mein Nachname ist Haddad'],
      explanationAr: 'Mein Vorname ist Omar und mein Nachname ist Haddad.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Hallo Anna, Ich komme um 18 Uhr.',
      correct: 'Hallo Anna, ich komme um 18 Uhr.',
      explanationAr: 'بعد فاصلة التحية نكتب ich بحرف صغير.',
    },
    {
      wrong: 'Sehr geehrte Frau Klein, ... LG Omar',
      correct: 'Sehr geehrte Frau Klein, ... Mit freundlichen Grüßen, Omar Haddad',
      explanationAr: 'LG للأصدقاء فقط. الرسالة الرسمية تنتهي بـ Mit freundlichen Grüßen.',
    },
    {
      wrong: 'Name: Omar (في خانة Nachname)',
      correct: 'Vorname: Omar / Nachname: Haddad',
      explanationAr: 'في النماذج الألمانية خانتان منفصلتان: الاسم الأول واسم العائلة.',
    },
  ],
}
