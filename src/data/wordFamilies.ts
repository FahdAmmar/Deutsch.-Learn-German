import type { CEFRLevel, GermanArticle } from '@/types'

/**
 * Word families: words that grow from one root (fahren → die Fahrt, der Fahrer, abfahren, die Abfahrt).
 * Seeing the family teaches several words at once, and shows the learner how German builds new ones.
 *
 * Content only. Every member has its own level, so an A1 learner is shown only the words of the family an A1
 * learner knows (a family appears at a level once three of its members do). Each member carries a sentence in which the word stands exactly as it is listed (the
 * dictionary form), so a drill can blank it out; a test checks that the word is really in its sentence.
 */
export type FamilyPartOfSpeech = 'verb' | 'noun' | 'adjective'

export interface FamilyMember {
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  /** As in the dictionary: the infinitive of a verb, the singular of a noun. Nouns are capitalised. */
  word: string
  article?: GermanArticle
  partOfSpeech: FamilyPartOfSpeech
  meaningAr: string
  /** A German sentence that contains `word` exactly as written above, once. */
  sentence: string
  sentenceAr: string
}

export interface WordFamily {
  id: string
  /** The root word the family grows from. It is also the first member. */
  root: string
  noteAr: string
  members: readonly FamilyMember[]
}

export const WORD_FAMILIES: readonly WordFamily[] = [
  {
    id: 'fahren',
    root: 'fahren',
    noteAr: 'من الفعل fahren تتفرّع كلمات المواصلات: الحركة (Fahrt)، والشخص (Fahrer)، والوثيقة (Fahrkarte).',
    members: [
      { word: 'fahren', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يسافر / يقود', sentence: 'Wir wollen morgen nach Berlin fahren.', sentenceAr: 'نريد أن نسافر إلى برلين غداً.' },
      { word: 'Fahrt', level: 'A1', article: 'die', partOfSpeech: 'noun', meaningAr: 'رحلة (بالمركبة)', sentence: 'Die Fahrt dauert zwei Stunden.', sentenceAr: 'الرحلة تستغرق ساعتين.' },
      { word: 'Fahrer', level: 'A1', article: 'der', partOfSpeech: 'noun', meaningAr: 'سائق', sentence: 'Der Fahrer wartet vor dem Haus.', sentenceAr: 'السائق ينتظر أمام البيت.' },
      { word: 'Fahrkarte', level: 'A1', article: 'die', partOfSpeech: 'noun', meaningAr: 'تذكرة سفر', sentence: 'Ich brauche eine Fahrkarte nach Köln.', sentenceAr: 'أحتاج تذكرة إلى كولن.' },
      { word: 'abfahren', level: 'A2', partOfSpeech: 'verb', meaningAr: 'ينطلق (قطار، حافلة)', sentence: 'Der Zug soll um acht Uhr abfahren.', sentenceAr: 'من المفترض أن ينطلق القطار في الساعة الثامنة.' },
    ],
  },
  {
    id: 'arbeiten',
    root: 'arbeiten',
    noteAr: 'من arbeiten تأتي Arbeit (العمل) ومنها تُركَّب كلمات كثيرة: Arbeitsplatz، arbeitslos.',
    members: [
      { word: 'arbeiten', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يعمل', sentence: 'Ich möchte in einem Krankenhaus arbeiten.', sentenceAr: 'أريد أن أعمل في مستشفى.' },
      { word: 'Arbeit', level: 'A1', article: 'die', partOfSpeech: 'noun', meaningAr: 'عمل', sentence: 'Meine Arbeit beginnt um acht Uhr.', sentenceAr: 'يبدأ عملي في الساعة الثامنة.' },
      { word: 'Arbeiter', level: 'A1', article: 'der', partOfSpeech: 'noun', meaningAr: 'عامل', sentence: 'Der Arbeiter trägt einen Helm.', sentenceAr: 'العامل يرتدي خوذة.' },
      { word: 'Arbeitsplatz', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'مكان العمل / وظيفة', sentence: 'Mein Arbeitsplatz ist im Zentrum.', sentenceAr: 'مكان عملي في وسط المدينة.' },
      { word: 'arbeitslos', level: 'A2', partOfSpeech: 'adjective', meaningAr: 'عاطل عن العمل', sentence: 'Mein Bruder ist seit drei Monaten arbeitslos.', sentenceAr: 'أخي عاطل عن العمل منذ ثلاثة أشهر.' },
    ],
  },
  {
    id: 'wohnen',
    root: 'wohnen',
    noteAr: 'من wohnen (يسكن) تأتي Wohnung (الشقة) وكل كلمة عن السكن: Wohnzimmer، Wohnort.',
    members: [
      { word: 'wohnen', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يسكن', sentence: 'Ich möchte in der Stadt wohnen.', sentenceAr: 'أريد أن أسكن في المدينة.' },
      { word: 'Wohnung', level: 'A1', article: 'die', partOfSpeech: 'noun', meaningAr: 'شقة', sentence: 'Die Wohnung hat drei Zimmer.', sentenceAr: 'الشقة فيها ثلاث غرف.' },
      { word: 'Wohnzimmer', level: 'A1', article: 'das', partOfSpeech: 'noun', meaningAr: 'غرفة المعيشة', sentence: 'Das Wohnzimmer ist groß und hell.', sentenceAr: 'غرفة المعيشة كبيرة ومضيئة.' },
      { word: 'Wohnort', level: 'A1', article: 'der', partOfSpeech: 'noun', meaningAr: 'مكان الإقامة', sentence: 'Mein Wohnort ist Hamburg.', sentenceAr: 'مكان إقامتي هو هامبورغ.' },
      { word: 'Wohngemeinschaft', level: 'A2', article: 'die', partOfSpeech: 'noun', meaningAr: 'سكن مشترك', sentence: 'Meine Schwester lebt in einer Wohngemeinschaft.', sentenceAr: 'أختي تعيش في سكن مشترك.' },
    ],
  },
  {
    id: 'kaufen',
    root: 'kaufen',
    noteAr: 'البادئات تغيّر المعنى: ein- للتسوّق، ver- للبيع، وتأتي معها كلمات مثل Verkäufer وEinkaufsliste.',
    members: [
      { word: 'kaufen', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يشتري', sentence: 'Ich will ein neues Handy kaufen.', sentenceAr: 'أريد أن أشتري هاتفاً جديداً.' },
      { word: 'einkaufen', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يتسوّق', sentence: 'Wir müssen heute noch einkaufen.', sentenceAr: 'علينا أن نتسوّق اليوم.' },
      { word: 'verkaufen', level: 'A2', partOfSpeech: 'verb', meaningAr: 'يبيع', sentence: 'Er will sein Auto verkaufen.', sentenceAr: 'يريد أن يبيع سيارته.' },
      { word: 'Verkäufer', level: 'A1', article: 'der', partOfSpeech: 'noun', meaningAr: 'بائع', sentence: 'Der Verkäufer ist sehr freundlich.', sentenceAr: 'البائع لطيف جداً.' },
      { word: 'Einkaufsliste', level: 'A2', article: 'die', partOfSpeech: 'noun', meaningAr: 'قائمة التسوّق', sentence: 'Hast du die Einkaufsliste?', sentenceAr: 'هل معك قائمة التسوّق؟' },
    ],
  },
  {
    id: 'sprechen',
    root: 'sprechen',
    noteAr: 'من sprechen تأتي Sprache (اللغة) وGespräch (الحديث) وAussprache (النطق).',
    members: [
      { word: 'sprechen', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يتكلّم', sentence: 'Ich möchte besser Deutsch sprechen.', sentenceAr: 'أريد أن أتكلّم الألمانية بشكل أفضل.' },
      { word: 'Sprache', level: 'A1', article: 'die', partOfSpeech: 'noun', meaningAr: 'لغة', sentence: 'Deutsch ist eine schöne Sprache.', sentenceAr: 'الألمانية لغة جميلة.' },
      { word: 'Gespräch', level: 'A2', article: 'das', partOfSpeech: 'noun', meaningAr: 'حديث / محادثة', sentence: 'Das Gespräch war sehr kurz.', sentenceAr: 'كان الحديث قصيراً جداً.' },
      { word: 'Aussprache', level: 'A2', article: 'die', partOfSpeech: 'noun', meaningAr: 'النطق', sentence: 'Deine Aussprache ist schon gut.', sentenceAr: 'نطقك جيد فعلاً.' },
      { word: 'Sprechstunde', level: 'A2', article: 'die', partOfSpeech: 'noun', meaningAr: 'ساعات الاستقبال', sentence: 'Die Sprechstunde beginnt um neun Uhr.', sentenceAr: 'تبدأ ساعات الاستقبال في الساعة التاسعة.' },
    ],
  },
  {
    id: 'schreiben',
    root: 'schreiben',
    noteAr: 'من schreiben تأتي كلمات الكتابة: Schreibtisch (مكتب)، Unterschrift (توقيع)، unterschreiben (يوقّع).',
    members: [
      { word: 'schreiben', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يكتب', sentence: 'Ich muss noch einen Brief schreiben.', sentenceAr: 'ما زال عليّ أن أكتب رسالة.' },
      { word: 'aufschreiben', level: 'A2', partOfSpeech: 'verb', meaningAr: 'يدوّن', sentence: 'Kannst du das bitte aufschreiben?', sentenceAr: 'هل يمكنك أن تدوّن هذا من فضلك؟' },
      { word: 'Schreibtisch', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'مكتب', sentence: 'Der Schreibtisch steht am Fenster.', sentenceAr: 'المكتب عند النافذة.' },
      { word: 'Unterschrift', level: 'A2', article: 'die', partOfSpeech: 'noun', meaningAr: 'توقيع', sentence: 'Hier brauche ich Ihre Unterschrift.', sentenceAr: 'أحتاج هنا إلى توقيعك.' },
      { word: 'unterschreiben', level: 'A2', partOfSpeech: 'verb', meaningAr: 'يوقّع', sentence: 'Sie müssen den Vertrag unterschreiben.', sentenceAr: 'عليك أن توقّع العقد.' },
    ],
  },
  {
    id: 'essen',
    root: 'essen',
    noteAr: 'من essen تأتي Essen (الطعام) وكلمات مركّبة: Esszimmer، Esstisch.',
    members: [
      { word: 'essen', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يأكل', sentence: 'Wir wollen heute Abend Pizza essen.', sentenceAr: 'نريد أن نأكل البيتزا هذا المساء.' },
      { word: 'Essen', level: 'A1', article: 'das', partOfSpeech: 'noun', meaningAr: 'الطعام / وجبة', sentence: 'Das Essen ist fertig.', sentenceAr: 'الطعام جاهز.' },
      { word: 'Esstisch', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'طاولة الطعام', sentence: 'Der Esstisch ist aus Holz.', sentenceAr: 'طاولة الطعام من الخشب.' },
      { word: 'Esszimmer', level: 'A2', article: 'das', partOfSpeech: 'noun', meaningAr: 'غرفة الطعام', sentence: 'Das Esszimmer ist neben der Küche.', sentenceAr: 'غرفة الطعام بجانب المطبخ.' },
      { word: 'aufessen', level: 'A2', partOfSpeech: 'verb', meaningAr: 'يأكل كل ما في الطبق', sentence: 'Du musst nicht alles aufessen.', sentenceAr: 'لا يجب أن تأكل كل ما في الطبق.' },
    ],
  },
  {
    id: 'leben',
    root: 'leben',
    noteAr: 'من leben (يعيش) تأتي Leben (الحياة) وLebensmittel (المواد الغذائية) وLebenslauf (السيرة الذاتية).',
    members: [
      { word: 'leben', level: 'A2', partOfSpeech: 'verb', meaningAr: 'يعيش', sentence: 'Meine Eltern möchten auf dem Land leben.', sentenceAr: 'والداي يريدان أن يعيشا في الريف.' },
      { word: 'Leben', level: 'A2', article: 'das', partOfSpeech: 'noun', meaningAr: 'الحياة', sentence: 'Das Leben in der Stadt ist teuer.', sentenceAr: 'الحياة في المدينة غالية.' },
      { word: 'Lebensmittel', level: 'A1', partOfSpeech: 'noun', meaningAr: 'مواد غذائية (تُستعمل في الجمع)', sentence: 'Im Supermarkt kaufen wir Lebensmittel.', sentenceAr: 'نشتري المواد الغذائية من السوبرماركت.' },
      { word: 'Lebenslauf', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'السيرة الذاتية', sentence: 'Ich schreibe heute meinen Lebenslauf.', sentenceAr: 'أكتب اليوم سيرتي الذاتية.' },
      { word: 'erleben', level: 'A2', partOfSpeech: 'verb', meaningAr: 'يعيش تجربة', sentence: 'Im Urlaub möchte ich viel erleben.', sentenceAr: 'في العطلة أريد أن أعيش تجارب كثيرة.' },
    ],
  },
  {
    id: 'fliegen',
    root: 'fliegen',
    noteAr: 'من fliegen تأتي Flug (الرحلة الجوية) وFlugzeug (الطائرة) وFlughafen (المطار).',
    members: [
      { word: 'fliegen', level: 'A2', partOfSpeech: 'verb', meaningAr: 'يطير / يسافر بالطائرة', sentence: 'Wir wollen im Sommer nach Spanien fliegen.', sentenceAr: 'نريد أن نسافر إلى إسبانيا بالطائرة في الصيف.' },
      { word: 'Flug', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'رحلة جوية', sentence: 'Der Flug dauert zwei Stunden.', sentenceAr: 'الرحلة الجوية تستغرق ساعتين.' },
      { word: 'Flugzeug', level: 'A2', article: 'das', partOfSpeech: 'noun', meaningAr: 'طائرة', sentence: 'Das Flugzeug landet um zehn Uhr.', sentenceAr: 'تهبط الطائرة في الساعة العاشرة.' },
      { word: 'Flughafen', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'مطار', sentence: 'Der Flughafen ist weit weg.', sentenceAr: 'المطار بعيد.' },
      { word: 'abfliegen', level: 'A2', partOfSpeech: 'verb', meaningAr: 'تقلع (الطائرة)', sentence: 'Das Flugzeug soll um sechs Uhr abfliegen.', sentenceAr: 'من المفترض أن تقلع الطائرة في الساعة السادسة.' },
    ],
  },
  {
    id: 'spielen',
    root: 'spielen',
    noteAr: 'من spielen تأتي Spiel (لعبة) وSpieler (لاعب) وSpielplatz (ملعب الأطفال) وSpielzeug (لعبة الطفل).',
    members: [
      { word: 'spielen', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يلعب / يعزف', sentence: 'Die Kinder wollen im Garten spielen.', sentenceAr: 'الأطفال يريدون أن يلعبوا في الحديقة.' },
      { word: 'Spiel', level: 'A1', article: 'das', partOfSpeech: 'noun', meaningAr: 'لعبة / مباراة', sentence: 'Das Spiel beginnt um drei Uhr.', sentenceAr: 'تبدأ المباراة في الساعة الثالثة.' },
      { word: 'Spieler', level: 'A1', article: 'der', partOfSpeech: 'noun', meaningAr: 'لاعب', sentence: 'Der Spieler schießt ein Tor.', sentenceAr: 'اللاعب يسجّل هدفاً.' },
      { word: 'Spielplatz', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'ملعب الأطفال', sentence: 'Der Spielplatz ist neben der Schule.', sentenceAr: 'ملعب الأطفال بجانب المدرسة.' },
      { word: 'Spielzeug', level: 'A2', article: 'das', partOfSpeech: 'noun', meaningAr: 'لعبة الطفل', sentence: 'Das Spielzeug liegt im Kinderzimmer.', sentenceAr: 'لعبة الطفل في غرفة الأطفال.' },
    ],
  },
  {
    id: 'gehen',
    root: 'gehen',
    noteAr: 'من gehen تأتي كلمات المكان: Eingang (المدخل)، Ausgang (المخرج)، Spaziergang (النزهة).',
    members: [
      { word: 'gehen', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يذهب / يمشي', sentence: 'Ich möchte heute früh gehen.', sentenceAr: 'أريد أن أذهب مبكراً اليوم.' },
      { word: 'Eingang', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'مدخل', sentence: 'Der Eingang ist auf der rechten Seite.', sentenceAr: 'المدخل على الجهة اليمنى.' },
      { word: 'Ausgang', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'مخرج', sentence: 'Wo ist der Ausgang?', sentenceAr: 'أين المخرج؟' },
      { word: 'Spaziergang', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'نزهة على الأقدام', sentence: 'Der Spaziergang im Park war schön.', sentenceAr: 'كانت النزهة في الحديقة جميلة.' },
      { word: 'ausgehen', level: 'A2', partOfSpeech: 'verb', meaningAr: 'يخرج للتسلية', sentence: 'Heute Abend möchte ich ausgehen.', sentenceAr: 'هذا المساء أريد أن أخرج.' },
    ],
  },
  {
    id: 'kochen',
    root: 'kochen',
    noteAr: 'من kochen (يطبخ) تأتي Koch (الطبّاخ) وأدوات المطبخ: Kochbuch، Kochtopf، Kochlöffel.',
    members: [
      { word: 'kochen', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يطبخ', sentence: 'Ich kann sehr gut kochen.', sentenceAr: 'أستطيع الطبخ جيداً.' },
      { word: 'Koch', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'طبّاخ', sentence: 'Der Koch arbeitet in einem Restaurant.', sentenceAr: 'الطبّاخ يعمل في مطعم.' },
      { word: 'Kochbuch', level: 'A2', article: 'das', partOfSpeech: 'noun', meaningAr: 'كتاب طبخ', sentence: 'Ich habe ein neues Kochbuch.', sentenceAr: 'عندي كتاب طبخ جديد.' },
      { word: 'Kochtopf', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'قِدر', sentence: 'Der Kochtopf ist noch heiß.', sentenceAr: 'القِدر ما زال ساخناً.' },
      { word: 'Kochlöffel', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'ملعقة طبخ', sentence: 'Der Kochlöffel liegt in der Schublade.', sentenceAr: 'ملعقة الطبخ في الدرج.' },
    ],
  },
  {
    id: 'helfen',
    root: 'helfen',
    noteAr: 'من helfen (يساعد، مع Dativ) تأتي Hilfe (المساعدة) وHelfer (المساعد) وhilfsbereit (مستعدّ للمساعدة).',
    members: [
      { word: 'helfen', level: 'A1', partOfSpeech: 'verb', meaningAr: 'يساعد', sentence: 'Kannst du mir bitte helfen?', sentenceAr: 'هل يمكنك أن تساعدني من فضلك؟' },
      { word: 'Hilfe', level: 'A2', article: 'die', partOfSpeech: 'noun', meaningAr: 'مساعدة', sentence: 'Danke für deine Hilfe.', sentenceAr: 'شكراً على مساعدتك.' },
      { word: 'Helfer', level: 'A2', article: 'der', partOfSpeech: 'noun', meaningAr: 'مساعد', sentence: 'Der Helfer trägt die Koffer.', sentenceAr: 'المساعد يحمل الحقائب.' },
      { word: 'hilfsbereit', level: 'A2', partOfSpeech: 'adjective', meaningAr: 'مستعدّ للمساعدة', sentence: 'Meine Nachbarn sind sehr hilfsbereit.', sentenceAr: 'جيراني مستعدّون جداً للمساعدة.' },
    ],
  },
]
