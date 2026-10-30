import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, verb } from './builders'

export const lessonAmt: Lesson = defineTheme({
  number: 10,
  slug: 'aemter-und-formulare',
  title: 'Ämter und Formulare',
  titleAr: 'الدوائر الرسمية والاستمارات',
  categoryAr: 'الدوائر الرسمية',
  objectivesAr: [
    'فهم حقول الاستمارة الرسمية: Vorname وNachname وGeburtsdatum وFamilienstand',
    'الحديث عن الأوراق: Ausweis وReisepass وVisum وAufenthaltserlaubnis',
    'فهم تعليمات الموظف الرسمية بصيغة Bitte … Sie',
    'استعمال أفعال المعاملات: ausfüllen وunterschreiben وbeantragen وabgeben',
  ],
  explanation: [
    {
      titleAr: 'تعليمات الموظف: Bitte + فعل + Sie',
      bodyAr:
        'في الدوائر الرسمية تأتي التعليمات بصيغة الأمر المهذّب: «Bitte füllen Sie das Formular aus»، «Bitte unterschreiben Sie hier»، «Bitte geben Sie das Formular am Schalter ab». الفعل يأتي أولاً بعد bitte ثم Sie. والفعل المنفصل (ausfüllen، abgeben) تذهب بادئته إلى آخر الجملة.',
    },
    {
      titleAr: 'حقول الاستمارة',
      bodyAr:
        'تجد في الاستمارة غالباً: «Vorname» (الاسم الأول)، «Nachname» (اسم العائلة)، «Geburtsdatum» (تاريخ الميلاد)، «Geburtsort» (مكان الميلاد)، «Staatsangehörigkeit» (الجنسية)، «Familienstand» (الحالة الاجتماعية: ledig أي أعزب، verheiratet أي متزوج). وتُكتب الحروف عادةً بخط واضح.',
    },
    {
      titleAr: 'Anmeldung: تسجيل السكن',
      bodyAr:
        'من ينتقل إلى سكن جديد في ألمانيا عليه عادةً أن يسجّل عنوانه لدى الجهة المحلية المختصة، ويكون ذلك في الغالب خلال أسبوعين تقريباً من الانتقال. وتختلف أسماء الجهة والأوراق المطلوبة من مدينة إلى أخرى، فاقرأ موقع مدينتك أو اسأل الدائرة قبل الذهاب.',
    },
  ],
  examples: [
    { de: 'Bitte füllen Sie das Formular aus.', ar: 'من فضلكم، املؤوا الاستمارة.' },
    { de: 'Bitte unterschreiben Sie hier.', ar: 'من فضلكم، وقّعوا هنا.' },
    { de: 'Wie ist Ihr Geburtsdatum?', ar: 'ما هو تاريخ ميلادكم؟' },
    { de: 'Ich bin in Damaskus geboren.', ar: 'وُلدتُ في دمشق.' },
    { de: 'Ich muss mein Visum verlängern.', ar: 'عليّ تمديد تأشيرتي.' },
  ],
  words: [
    noun('das', 'Amt', 'Ämter', 'الدائرة الرسمية', 'Ich muss morgen zum Amt.', 'عليّ الذهاب غداً إلى الدائرة الرسمية.'),
    noun('die', 'Behörde', 'Behörden', 'الجهة الرسمية (السلطة)', 'Die Behörde ist bis siebzehn Uhr geöffnet.', 'الجهة الرسمية مفتوحة حتى الخامسة مساءً.'),
    noun('das', 'Formular', 'Formulare', 'الاستمارة (النموذج)', 'Bitte füllen Sie das Formular aus.', 'من فضلكم، املؤوا الاستمارة.'),
    noun('der', 'Antrag', 'Anträge', 'الطلب الرسمي', 'Ich habe einen Antrag gestellt.', 'قدّمتُ طلباً رسمياً.'),
    noun('die', 'Anmeldung', 'Anmeldungen', 'التسجيل', 'Die Anmeldung dauert zehn Minuten.', 'يستغرق التسجيل عشر دقائق.'),
    noun('der', 'Ausweis', 'Ausweise', 'بطاقة الهوية', 'Haben Sie Ihren Ausweis dabei?', 'هل معكم بطاقة الهوية؟'),
    noun('der', 'Reisepass', 'Reisepässe', 'جواز السفر', 'Mein Reisepass liegt im Koffer.', 'جواز سفري في الحقيبة.'),
    noun('das', 'Visum', 'Visa', 'التأشيرة', 'Brauche ich ein Visum?', 'هل أحتاج إلى تأشيرة؟'),
    noun('die', 'Aufenthaltserlaubnis', 'Aufenthaltserlaubnisse', 'تصريح الإقامة', 'Meine Aufenthaltserlaubnis ist ein Jahr gültig.', 'تصريح إقامتي صالح لمدة سنة.'),
    noun('die', 'Unterschrift', 'Unterschriften', 'التوقيع', 'Hier fehlt noch Ihre Unterschrift.', 'ينقص هنا توقيعكم.'),
    noun('der', 'Vorname', 'Vornamen', 'الاسم الأول', 'Ihr Vorname und Nachname, bitte.', 'اسمكم الأول واسم العائلة من فضلكم.'),
    noun('der', 'Nachname', 'Nachnamen', 'اسم العائلة', 'Mein Nachname ist Hassan.', 'اسم عائلتي حسن.'),
    noun('das', 'Geburtsdatum', 'Geburtsdaten', 'تاريخ الميلاد', 'Wie ist Ihr Geburtsdatum?', 'ما هو تاريخ ميلادكم؟'),
    noun('der', 'Geburtsort', 'Geburtsorte', 'مكان الميلاد', 'Mein Geburtsort ist Damaskus.', 'مكان ميلادي دمشق.'),
    noun('die', 'Staatsangehörigkeit', 'Staatsangehörigkeiten', 'الجنسية', 'Welche Staatsangehörigkeit haben Sie?', 'ما جنسيتكم؟'),
    noun('der', 'Schalter', 'Schalter', 'الشبّاك (مكان الخدمة)', 'Ich gebe das Formular am Schalter ab.', 'أُسلّم الاستمارة عند الشبّاك.'),
    verb('ausfüllen', 'يملأ (استمارة)', { praeteritum: 'füllte', partizip: 'ausgefüllt', auxiliary: 'haben', separablePrefix: 'aus' }, 'Ich fülle das Formular aus.', 'أملأ الاستمارة.'),
    verb('unterschreiben', 'يوقّع', { praeteritum: 'unterschrieb', partizip: 'unterschrieben', auxiliary: 'haben' }, 'Bitte unterschreiben Sie hier.', 'من فضلكم، وقّعوا هنا.'),
    verb('beantragen', 'يتقدّم بطلب رسمي', { praeteritum: 'beantragte', partizip: 'beantragt', auxiliary: 'haben' }, 'Ich möchte ein Visum beantragen.', 'أودّ التقدّم بطلب للحصول على تأشيرة.'),
    verb('sich anmelden', 'يسجّل نفسه', { praeteritum: 'meldete', partizip: 'angemeldet', auxiliary: 'haben', separablePrefix: 'an' }, 'Ich melde mich beim Amt an.', 'أسجّل نفسي لدى الدائرة الرسمية.'),
    verb(
      'abgeben',
      'يسلّم (يقدّم)',
      { present: ['gebe', 'gibst', 'gibt', 'geben', 'gebt', 'geben'], praeteritum: 'gab', partizip: 'abgegeben', auxiliary: 'haben', separablePrefix: 'ab' },
      'Ich gebe das Formular am Schalter ab.',
      'أسلّم الاستمارة عند الشبّاك.',
    ),
    verb('verlängern', 'يمدّد', { praeteritum: 'verlängerte', partizip: 'verlängert', auxiliary: 'haben' }, 'Ich muss mein Visum verlängern.', 'عليّ تمديد تأشيرتي.'),
    adjective('gültig', 'صالح (ساري المفعول)', 'Mein Pass ist noch gültig.', 'جواز سفري ما زال صالحاً.'),
    adjective('verheiratet', 'متزوّج', 'Ich bin verheiratet.', 'أنا متزوّج.'),
    adjective('ledig', 'أعزب', 'Mein Bruder ist noch ledig.', 'أخي ما زال أعزب.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich bin geboren in Damaskus.',
      correct: 'Ich bin in Damaskus geboren.',
      explanationAr: 'الفعل المساعد bin يقع في الموضع الثاني، وgeboren (Partizip II) يذهب إلى آخر الجملة، وتأتي بقية المعلومات بينهما.',
    },
    {
      wrong: 'Ich fülle aus das Formular.',
      correct: 'Ich fülle das Formular aus.',
      explanationAr: 'بادئة الفعل المنفصل تقع في آخر الجملة الرئيسية، بعد المفعول به.',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ä في Amt/Ämter وch في Staatsangehörigkeit',
      bodyAr: 'Ämter تُنطق بصوت «إي» مفتوح. وفي Staatsangehörigkeit يأتي ö بشفتين مدوّرتين، والمقطع الأخير «keit» يُنطق «كايت».',
      example: 'Ämter',
    },
  ],
})
