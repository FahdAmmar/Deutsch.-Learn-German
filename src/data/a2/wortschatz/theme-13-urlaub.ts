import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, verb } from './builders'

export const lessonUrlaub: Lesson = defineTheme({
  number: 13,
  slug: 'urlaub-und-hotel',
  title: 'Urlaub und Hotel',
  titleAr: 'العطلة والفندق',
  categoryAr: 'العطلة والفندق',
  objectivesAr: [
    'حجز غرفة في فندق والسؤال عن الأسعار والتوفّر',
    'التفريق بين Urlaub وReise وAusflug',
    'استعمال الـ Perfekt الصحيح مع أفعال السفر: sein مع reisen وverreisen',
    'التحدث عن الحدود والجمارك وجواز السفر في الرحلة',
  ],
  explanation: [
    {
      titleAr: 'في الفندق: عبارات الحجز',
      bodyAr:
        'للحجز تقول: «Haben Sie ein Zimmer frei؟» (هل لديكم غرفة شاغرة؟)، «Ich möchte ein Doppelzimmer für zwei Nächte» (أريد غرفة مزدوجة لليلتين)، «Ich habe ein Zimmer reserviert» (حجزتُ غرفة). وعند الوصول: «Ich möchte einchecken» وعند المغادرة: «Ich möchte auschecken». وإذا لم تجد: «Das Hotel ist leider ausgebucht».',
    },
    {
      titleAr: 'Urlaub وReise وAusflug',
      bodyAr:
        '«der Urlaub» هو وقت الإجازة التي تأخذها من عملك: «Ich habe zwei Wochen Urlaub». و«die Reise» هي الرحلة نفسها: «Die Reise nach Wien dauert vier Stunden». و«der Ausflug» رحلة قصيرة تعود منها في اليوم نفسه.',
    },
    {
      titleAr: 'Perfekt مع reisen وübernachten',
      bodyAr:
        'أفعال الانتقال من مكان إلى آخر تأخذ sein في الـ Perfekt: «Wir sind nach Wien gereist»، «Sie sind verreist». أما übernachten فتأخذ haben: «Wir haben im Hotel übernachtet».',
    },
  ],
  examples: [
    { de: 'Haben Sie noch ein Doppelzimmer frei?', ar: 'هل لديكم غرفة مزدوجة شاغرة؟' },
    { de: 'Ich habe ein Zimmer reserviert.', ar: 'حجزتُ غرفة.' },
    { de: 'Wir sind nach Wien gereist.', ar: 'سافرنا إلى فيينا.' },
    { de: 'Das Hotel ist leider ausgebucht.', ar: 'الفندق محجوز بالكامل للأسف.' },
    { de: 'Vergiss deine Sonnenbrille nicht!', ar: 'لا تنسَ نظارتك الشمسية!' },
  ],
  words: [
    noun('das', 'Hotel', 'Hotels', 'الفندق', 'Wir übernachten in einem Hotel.', 'نبيت في فندق.'),
    noun('das', 'Zimmer', 'Zimmer', 'الغرفة', 'Das Zimmer hat einen Balkon.', 'للغرفة شرفة.'),
    noun('das', 'Einzelzimmer', 'Einzelzimmer', 'غرفة فردية', 'Ich brauche ein Einzelzimmer für eine Nacht.', 'أحتاج إلى غرفة فردية لليلة واحدة.'),
    noun('das', 'Doppelzimmer', 'Doppelzimmer', 'غرفة مزدوجة', 'Haben Sie noch ein Doppelzimmer frei?', 'هل لديكم غرفة مزدوجة شاغرة؟'),
    noun('die', 'Reservierung', 'Reservierungen', 'الحجز', 'Ich habe eine Reservierung auf den Namen Hassan.', 'لديّ حجز باسم حسن.'),
    nounNoPlural('die', 'Rezeption', 'الاستقبال (في الفندق)', 'Der Schlüssel liegt an der Rezeption.', 'المفتاح عند الاستقبال.'),
    noun('der', 'Gast', 'Gäste', 'الضيف (النزيل)', 'Die Gäste frühstücken um acht Uhr.', 'يتناول نزلاء الفندق الفطور في الثامنة.'),
    nounNoPlural('das', 'Gepäck', 'الأمتعة', 'Mein Gepäck ist noch nicht da.', 'أمتعتي لم تصل بعد.'),
    noun('die', 'Reise', 'Reisen', 'الرحلة (السفر)', 'Die Reise nach Wien dauert vier Stunden.', 'تستغرق الرحلة إلى فيينا أربع ساعات.'),
    noun('der', 'Reiseführer', 'Reiseführer', 'الدليل السياحي', 'Ich kaufe einen Reiseführer.', 'أشتري دليلاً سياحياً.'),
    noun('der', 'Strand', 'Strände', 'الشاطئ', 'Das Hotel liegt direkt am Strand.', 'يقع الفندق على الشاطئ مباشرة.'),
    noun('die', 'Grenze', 'Grenzen', 'الحدود', 'An der Grenze kontrolliert die Polizei die Pässe.', 'تفحص الشرطة جوازات السفر عند الحدود.'),
    nounNoPlural('der', 'Zoll', 'الجمارك', 'Wir müssen am Zoll kurz warten.', 'علينا أن ننتظر قليلاً عند الجمارك.'),
    nounNoPlural('das', 'Ausland', 'الخارج (بلد أجنبي)', 'Ich war noch nie im Ausland.', 'لم أسافر إلى الخارج من قبل.'),
    noun('die', 'Sonnenbrille', 'Sonnenbrillen', 'النظارة الشمسية', 'Vergiss deine Sonnenbrille nicht!', 'لا تنسَ نظارتك الشمسية!'),
    noun('die', 'Unterkunft', 'Unterkünfte', 'مكان الإقامة', 'Die Unterkunft ist günstig.', 'مكان الإقامة بسعر مناسب.'),
    noun('die', 'Übernachtung', 'Übernachtungen', 'ليلة إقامة', 'Eine Übernachtung kostet achtzig Euro.', 'تكلّف الليلة الواحدة ثمانين يورو.'),
    verb('reservieren', 'يحجز', { praeteritum: 'reservierte', partizip: 'reserviert', auxiliary: 'haben' }, 'Ich möchte einen Tisch reservieren.', 'أودّ حجز طاولة.'),
    verb('übernachten', 'يبيت', { praeteritum: 'übernachtete', partizip: 'übernachtet', auxiliary: 'haben' }, 'Wir übernachten in einem Hotel.', 'نبيت في فندق.'),
    verb('einchecken', 'يسجّل الدخول (في الفندق أو المطار)', { praeteritum: 'checkte', partizip: 'eingecheckt', auxiliary: 'haben', separablePrefix: 'ein' }, 'Wann kann ich einchecken?', 'متى يمكنني تسجيل الدخول؟'),
    verb('auschecken', 'يغادر الفندق (يسجّل الخروج)', { praeteritum: 'checkte', partizip: 'ausgecheckt', auxiliary: 'haben', separablePrefix: 'aus' }, 'Wir checken um zehn Uhr aus.', 'نسجّل الخروج في العاشرة.'),
    verb('packen', 'يحزم الأمتعة', { praeteritum: 'packte', partizip: 'gepackt', auxiliary: 'haben' }, 'Ich muss noch meinen Koffer packen.', 'ما زال عليّ أن أحزم حقيبتي.'),
    verb('verreisen', 'يسافر (إلى مكان بعيد)', { praeteritum: 'verreiste', partizip: 'verreist', auxiliary: 'sein' }, 'Wir verreisen im August.', 'نسافر في أغسطس.'),
    verb('besichtigen', 'يزور (معلماً) / يعاين', { praeteritum: 'besichtigte', partizip: 'besichtigt', auxiliary: 'haben' }, 'Wir besichtigen die Altstadt.', 'نزور البلدة القديمة.'),
    verb('sich erholen', 'يستجمّ (يستعيد نشاطه)', { praeteritum: 'erholte', partizip: 'erholt', auxiliary: 'haben' }, 'Im Urlaub erhole ich mich gut.', 'أستجمّ جيداً في الإجازة.'),
    adjective('günstig', 'بسعر مناسب (رخيص)', 'Das Zimmer ist günstig.', 'الغرفة بسعر مناسب.'),
    adjective('ausgebucht', 'محجوز بالكامل', 'Das Hotel ist leider ausgebucht.', 'الفندق محجوز بالكامل للأسف.'),
    adjective('frei', 'شاغر (متاح)', 'Ist der Platz noch frei?', 'هل المكان ما زال شاغراً؟'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich habe nach Wien gereist.',
      correct: 'Ich bin nach Wien gereist.',
      explanationAr: 'reisen فعل انتقال، ويكوّن الـ Perfekt بـ sein: «ich bin gereist».',
    },
    {
      wrong: 'Ich möchte ein Zimmer für ein Nacht.',
      correct: 'Ich möchte ein Zimmer für eine Nacht.',
      explanationAr: 'Nacht مؤنثة، فتأخذ eine بعد für. وجمعها Nächte: «für zwei Nächte».',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ch في einchecken وauschecken',
      bodyAr: 'كلمتان مقترضتان من الإنجليزية: تُنطق ch فيهما «تش» كما في check، وليس ch الألمانية.',
      example: 'einchecken',
    },
  ],
})
