import type { Lesson } from '@/types'

import { defineTheme, noun, phrase, verb } from './builders'

/**
 * Greeting, inviting, thanking and apologising on a festive occasion. The Goethe A1 list has "Feste/Feiern" as a
 * topic and the A1 writing task is a short personal text (an invitation or an apology), so this lesson teaches the
 * fixed formulas that such a text needs. The A2 lesson `a2-m14` goes further (gifts, reported celebrations).
 */
export const lessonFesteWuensche: Lesson = defineTheme({
  number: 8,
  slug: 'feste-und-wuensche',
  title: 'Feste, Wünsche und Dank',
  titleAr: 'الأعياد والتهاني والشكر والاعتذار',
  categoryAr: 'الأعياد والتهاني',
  objectivesAr: [
    'تهنئة الآخرين: Herzlichen Glückwunsch zum Geburtstag! وAlles Gute! وFrohe Weihnachten!',
    'الدعوة والرد عليها: Ich lade dich ein. Ja, gern! Leider kann ich nicht.',
    'الشكر والاعتذار: Vielen Dank! وGern geschehen! وEs tut mir leid.',
    'تسمية الأعياد الأساسية: Weihnachten وOstern وNeujahr وSilvester',
  ],
  explanation: [
    {
      titleAr: 'التهنئة',
      bodyAr:
        'للتهنئة في عيد الميلاد: **Herzlichen Glückwunsch zum Geburtstag!** أو **Alles Gute zum Geburtstag!** والتعبير **zum Geburtstag** يعني «بمناسبة عيد الميلاد» وتحفظه كما هو. وللأعياد: **Frohe Weihnachten!** و**Frohe Ostern!** و**Frohes neues Jahr!**، وقبل رأس السنة تقول **Guten Rutsch!** وهي تمنّي بداية موفّقة للسنة. والرد على التهنئة: **Danke schön!**',
    },
    {
      titleAr: 'الدعوة والرد عليها',
      bodyAr:
        'للدعوة: **Ich lade dich zu meiner Party ein.** (أدعوك إلى حفلتي) أو سؤالاً: **Kommst du am Samstag zu meiner Party?** والفعل **einladen** منفصل: lade … ein. للقبول: **Ja, gern!** أو **Das ist nett! Ich komme gern.** وللرفض بأدب: **Leider kann ich nicht.** (للأسف لا أستطيع). ولا تنسَ أن تشكر: **Vielen Dank für die Einladung!**',
    },
    {
      titleAr: 'الشكر والاعتذار',
      bodyAr:
        'للشكر: **Danke!** ثم **Danke schön!** ثم **Vielen Dank!** (الأقوى). والرد: **Bitte!** أو **Gern geschehen!** (على الرحب). وللاعتذار: **Entschuldigung!** عند لفت الانتباه أو الاصطدام، و**Es tut mir leid.** عند الأسف الحقيقي. والرد: **Kein Problem!** (لا مشكلة).',
    },
    {
      titleAr: 'الأعياد التي ستسمع عنها',
      bodyAr:
        'أعياد تُستعمل بلا أداة غالباً: **Weihnachten** (الميلاد) و**Ostern** (الفصح) و**Silvester** (ليلة رأس السنة) و**Neujahr** (رأس السنة): **zu Weihnachten، an Silvester، zu Ostern**. وعطلة رسمية اسمها **der Feiertag**. وفي ألمانيا يُقال لعيد الفطر **das Zuckerfest** ولعيد الأضحى **das Opferfest**، فتفهم هذين الاسمين في الأخبار والإعلانات.',
    },
  ],
  examples: [
    { de: 'Herzlichen Glückwunsch zum Geburtstag!', ar: 'تهانينا بعيد ميلادك!' },
    { de: 'Alles Gute zum Geburtstag!', ar: 'كل التمنيات الطيبة بعيد ميلادك!' },
    { de: 'Frohe Weihnachten!', ar: 'عيد ميلاد مجيد!' },
    { de: 'Ich lade dich zu meiner Party ein.', ar: 'أدعوك إلى حفلتي.' },
    { de: 'Kommst du am Samstag zu meiner Party?', ar: 'هل ستأتي إلى حفلتي يوم السبت؟' },
    { de: 'Ja, gern! Ich komme um acht Uhr.', ar: 'نعم بكل سرور! سآتي في الساعة الثامنة.' },
    { de: 'Leider kann ich am Samstag nicht kommen.', ar: 'للأسف لا أستطيع المجيء يوم السبت.' },
    { de: 'Vielen Dank für die Einladung!', ar: 'شكراً جزيلاً على الدعوة!' },
    { de: 'Es tut mir leid. Ich bin zu spät.', ar: 'أنا آسف. لقد تأخرت.' },
    { de: 'An Silvester feiern wir mit Freunden.', ar: 'في ليلة رأس السنة نحتفل مع الأصدقاء.' },
  ],
  words: [
    noun('das', 'Fest', 'Feste', 'العيد / الحفل الكبير', 'Das Fest ist am Samstag.', 'الحفل الكبير يوم السبت.'),
    noun('die', 'Feier', 'Feiern', 'الاحتفال', 'Die Feier beginnt um sieben Uhr.', 'يبدأ الاحتفال في الساعة السابعة.'),
    noun('die', 'Party', 'Partys', 'الحفلة', 'Meine Party ist am Freitag.', 'حفلتي يوم الجمعة.'),
    noun('der', 'Feiertag', 'Feiertage', 'العطلة الرسمية', 'Der Montag ist ein Feiertag.', 'يوم الاثنين عطلة رسمية.'),
    noun('das', 'Geschenk', 'Geschenke', 'الهدية', 'Ich kaufe ein Geschenk für Anna.', 'أشتري هدية لآنا.'),
    noun('die', 'Einladung', 'Einladungen', 'الدعوة', 'Danke für die Einladung!', 'شكراً على الدعوة!'),
    { word: 'Weihnachten', numberUse: 'name', partOfSpeech: 'noun', meaningAr: 'عيد الميلاد', example: { de: 'Zu Weihnachten besuchen wir die Familie.', ar: 'في عيد الميلاد نزور العائلة.' } },
    { word: 'Ostern', numberUse: 'name', partOfSpeech: 'noun', meaningAr: 'عيد الفصح', example: { de: 'Zu Ostern gibt es bunte Eier.', ar: 'في عيد الفصح هناك بيض ملوّن.' } },
    { word: 'Neujahr', numberUse: 'name', partOfSpeech: 'noun', meaningAr: 'رأس السنة (1 يناير)', example: { de: 'An Neujahr schlafen viele lange.', ar: 'في رأس السنة ينام كثيرون طويلاً.' } },
    { word: 'Silvester', numberUse: 'name', partOfSpeech: 'noun', meaningAr: 'ليلة رأس السنة', example: { de: 'An Silvester gibt es ein Feuerwerk.', ar: 'في ليلة رأس السنة تُطلق ألعاب نارية.' } },
    verb('feiern', 'يحتفل', { praeteritum: 'feierte', partizip: 'gefeiert', auxiliary: 'haben' }, 'Wir feiern meinen Geburtstag.', 'نحتفل بعيد ميلادي.'),
    verb(
      'einladen',
      'يدعو',
      { present: ['lade', 'lädst', 'lädt', 'laden', 'ladet', 'laden'], praeteritum: 'lud', partizip: 'eingeladen', auxiliary: 'haben', separablePrefix: 'ein' },
      'Ich lade dich zu meiner Party ein.',
      'أدعوك إلى حفلتي.',
    ),
    phrase('Herzlichen Glückwunsch', 'تهانينا', 'Herzlichen Glückwunsch zum Geburtstag!', 'تهانينا بعيد ميلادك!'),
    phrase('Alles Gute', 'كل التمنيات الطيبة', 'Alles Gute zum Geburtstag!', 'كل التمنيات الطيبة بعيد ميلادك!'),
    phrase('Frohe Weihnachten', 'عيد ميلاد مجيد', 'Frohe Weihnachten, liebe Anna!', 'عيد ميلاد مجيد يا آنا العزيزة!'),
    phrase('Vielen Dank', 'شكراً جزيلاً', 'Vielen Dank für die Einladung!', 'شكراً جزيلاً على الدعوة!'),
    phrase('Gern geschehen', 'على الرحب / عفواً', 'Danke für die Hilfe! – Gern geschehen!', 'شكراً على المساعدة! – على الرحب!'),
    phrase('Es tut mir leid', 'أنا آسف', 'Es tut mir leid. Ich bin zu spät.', 'أنا آسف. لقد تأخرت.'),
    phrase('Kein Problem', 'لا مشكلة', 'Kein Problem, ich warte auf dich.', 'لا مشكلة، سأنتظرك.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich einlade dich zur Party.',
      correct: 'Ich lade dich zur Party ein.',
      explanationAr: 'einladen فعل منفصل: lade في الموضع الثاني وein في آخر الجملة.',
    },
    {
      wrong: 'Glückwunsch für den Geburtstag!',
      correct: 'Herzlichen Glückwunsch zum Geburtstag!',
      explanationAr: 'نقول zum Geburtstag (بمناسبة عيد الميلاد) ولا نستعمل für هنا.',
    },
  ],
})
