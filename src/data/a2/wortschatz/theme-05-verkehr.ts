import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, verb } from './builders'

export const lessonVerkehr: Lesson = defineTheme({
  number: 5,
  slug: 'verkehr-und-stadt',
  title: 'Verkehr und Stadt',
  titleAr: 'المواصلات والمدينة',
  categoryAr: 'المواصلات والمدينة',
  objectivesAr: [
    'تسمية وسائل النقل داخل المدينة والأماكن العامة المهمة',
    'استعمال mit + Dativ للوسيلة وzu Fuß للمشي',
    'التفريق بين in + Akkusativ وzu + Dativ عند ذكر الوجهة',
    'الحديث عن فوات الحافلة والازدحام والمسافة',
  ],
  explanation: [
    {
      titleAr: 'mit + Dativ: بماذا تتنقّل؟',
      bodyAr:
        'للوسيلة استعمل mit مع Dativ: «mit dem Bus»، «mit der Straßenbahn»، «mit der U-Bahn»، «mit dem Fahrrad»، «mit dem Auto». أما المشي فله تعبير ثابت بلا أداة: «zu Fuß» (على الأقدام). ولا يصح «mit dem Fuß».',
    },
    {
      titleAr: 'إلى أين؟ in أم zu',
      bodyAr:
        'حين تدخل إلى مكان استعمل in + Akkusativ: «ins Museum»، «ins Schwimmbad»، «in die Bibliothek». وحين تتجه نحو مكان أو شخص استعمل zu + Dativ: «zum Rathaus»، «zur Haltestelle»، «zum Arzt». وكلتا الصيغتين شائعة، والفرق في أن in تعني الدخول إلى داخل المكان.',
    },
  ],
  examples: [
    { de: 'Ich fahre jeden Tag mit der U-Bahn zur Arbeit.', ar: 'أذهب إلى العمل كل يوم بالمترو.' },
    { de: 'Wir gehen am Sonntag ins Museum.', ar: 'نذهب إلى المتحف يوم الأحد.' },
    { de: 'Ich habe den Bus verpasst.', ar: 'فاتتني الحافلة.' },
    { de: 'Ist es weit bis zum Rathaus?', ar: 'هل المسافة بعيدة إلى البلدية؟' },
    { de: 'Die Moschee ist in der Nähe.', ar: 'المسجد قريب من هنا.' },
  ],
  words: [
    noun('der', 'Bus', 'Busse', 'الحافلة', 'Der Bus kommt in fünf Minuten.', 'تصل الحافلة بعد خمس دقائق.'),
    noun('die', 'Straßenbahn', 'Straßenbahnen', 'الترام', 'Ich fahre mit der Straßenbahn zur Arbeit.', 'أذهب إلى العمل بالترام.'),
    noun('die', 'U-Bahn', 'U-Bahnen', 'المترو', 'Die U-Bahn fährt alle fünf Minuten.', 'يمرّ المترو كل خمس دقائق.'),
    noun('die', 'Haltestelle', 'Haltestellen', 'محطة الحافلة (موقفها)', 'Die Haltestelle ist vor dem Supermarkt.', 'موقف الحافلة أمام السوبر ماركت.'),
    noun('das', 'Fahrrad', 'Fahrräder', 'الدراجة', 'Ich fahre jeden Tag mit dem Fahrrad.', 'أذهب كل يوم بالدراجة.'),
    noun('das', 'Auto', 'Autos', 'السيارة', 'Mein Auto steht vor dem Haus.', 'سيارتي أمام المنزل.'),
    noun('der', 'Führerschein', 'Führerscheine', 'رخصة القيادة', 'Hast du einen Führerschein?', 'هل لديك رخصة قيادة؟'),
    noun('der', 'Parkplatz', 'Parkplätze', 'موقف السيارات', 'Hier gibt es keinen Parkplatz.', 'لا يوجد هنا موقف للسيارات.'),
    noun('der', 'Stau', 'Staus', 'الازدحام المروري', 'Auf der Straße ist Stau.', 'يوجد ازدحام مروري على الطريق.'),
    noun('die', 'Baustelle', 'Baustellen', 'موقع الأشغال (البناء)', 'In der Hauptstraße ist eine Baustelle.', 'في الشارع الرئيسي أشغال.'),
    noun('die', 'Innenstadt', 'Innenstädte', 'وسط المدينة', 'Die Innenstadt ist am Samstag voll.', 'وسط المدينة مزدحم يوم السبت.'),
    noun('das', 'Rathaus', 'Rathäuser', 'مبنى البلدية', 'Das Rathaus ist sehr alt.', 'مبنى البلدية قديم جداً.'),
    noun('die', 'Bibliothek', 'Bibliotheken', 'المكتبة', 'Ich lerne in der Bibliothek.', 'أدرس في المكتبة.'),
    noun('das', 'Krankenhaus', 'Krankenhäuser', 'المستشفى', 'Das Krankenhaus ist neben der Apotheke.', 'المستشفى بجانب الصيدلية.'),
    noun('das', 'Museum', 'Museen', 'المتحف', 'Am Sonntag besuchen wir das Museum.', 'نزور المتحف يوم الأحد.'),
    noun('die', 'Kirche', 'Kirchen', 'الكنيسة', 'Die Kirche steht am Markt.', 'الكنيسة عند السوق.'),
    noun('die', 'Moschee', 'Moscheen', 'المسجد', 'Die Moschee ist in der Nähe.', 'المسجد قريب من هنا.'),
    noun('der', 'Supermarkt', 'Supermärkte', 'السوبر ماركت', 'Der Supermarkt schließt um zwanzig Uhr.', 'يُغلق السوبر ماركت في الساعة الثامنة مساءً.'),
    noun('das', 'Schwimmbad', 'Schwimmbäder', 'المسبح', 'Im Sommer gehen wir oft ins Schwimmbad.', 'في الصيف نذهب كثيراً إلى المسبح.'),
    noun('die', 'Sehenswürdigkeit', 'Sehenswürdigkeiten', 'المَعلم السياحي', 'Berlin hat viele Sehenswürdigkeiten.', 'في برلين معالم سياحية كثيرة.'),
    verb(
      'abfahren',
      'يغادر (قطار، حافلة)',
      { present: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'], praeteritum: 'fuhr', partizip: 'abgefahren', auxiliary: 'sein', separablePrefix: 'ab' },
      'Der Bus fährt um acht Uhr ab.',
      'تغادر الحافلة في الساعة الثامنة.',
    ),
    verb('parken', 'يركن السيارة', { praeteritum: 'parkte', partizip: 'geparkt', auxiliary: 'haben' }, 'Hier darf man nicht parken.', 'لا يُسمح بالركن هنا.'),
    verb('überqueren', 'يعبر (الشارع)', { praeteritum: 'überquerte', partizip: 'überquert', auxiliary: 'haben' }, 'Ich überquere die Straße an der Ampel.', 'أعبر الشارع عند إشارة المرور.'),
    verb('verpassen', 'يفوّت (حافلة، موعداً)', { praeteritum: 'verpasste', partizip: 'verpasst', auxiliary: 'haben' }, 'Ich habe den Bus verpasst.', 'فاتتني الحافلة.'),
    adjective('weit', 'بعيد', 'Ist es weit bis zum Rathaus?', 'هل المسافة بعيدة إلى البلدية؟'),
    adjective('voll', 'ممتلئ / مزدحم', 'Der Bus ist heute sehr voll.', 'الحافلة مزدحمة جداً اليوم.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich fahre mit Bus zur Arbeit.',
      correct: 'Ich fahre mit dem Bus zur Arbeit.',
      explanationAr: 'بعد mit يلزم Dativ مع الأداة: «mit dem Bus» لأن der Bus مذكّر.',
    },
    {
      wrong: 'Ich bin mit dem Fuß gekommen.',
      correct: 'Ich bin zu Fuß gekommen.',
      explanationAr: '«zu Fuß» تعبير ثابت للمشي على الأقدام، ولا يُترجَم حرفياً.',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ß وss في Straßenbahn وKrankenhaus',
      bodyAr: 'حرف ß يُنطق «س» مهموسة كالسين العربية، ويأتي بعد الصوت الطويل كما في Straße. أما sch في Schwimmbad فتُنطق «ش».',
      example: 'Straßenbahn',
    },
  ],
})
