import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, nounPluralOnly, verb } from './builders'

export const lessonGesundheit: Lesson = defineTheme({
  number: 6,
  slug: 'gesundheit-und-krankheit',
  title: 'Gesundheit und Krankheit',
  titleAr: 'الصحة والمرض',
  categoryAr: 'الصحة والمرض',
  objectivesAr: [
    'وصف ما يؤلمك بـ Schmerzen وwehtun',
    'تسمية الأمراض والأدوية ومستلزمات الإسعاف',
    'معرفة ما يحدث في العيادة: Sprechstunde وWartezimmer وKrankenkasse',
    'طلب المساعدة في حالة طارئة بالعبارات الصحيحة',
  ],
  explanation: [
    {
      titleAr: 'ما الذي يؤلمك؟ Schmerzen أم wehtun',
      bodyAr:
        'للألم طريقتان: الأولى بالاسم الذي يأتي دائماً بصيغة الجمع وبلا أداة: «Ich habe Kopfschmerzen» و«Ich habe Bauchschmerzen». والثانية بالفعل wehtun: «Mein Rücken tut weh» أو «Der Kopf tut mir weh». ومعنى الجملتين واحد، لكن الأولى أكثر شيوعاً في الكلام اليومي.',
    },
    {
      titleAr: 'في العيادة',
      bodyAr:
        'تحجز موعداً في الـ Sprechstunde (ساعات استقبال المرضى)، وتنتظر في الـ Wartezimmer. وفي ألمانيا تُقدَّم بطاقة التأمين الصحي عند الطبيب، والـ Krankenkasse هي الجهة المؤمِّنة التي تتحمّل تكاليف العلاج بحسب نوع التأمين. وتذكّر أن Zahnarzt هو طبيب الأسنان وأن Facharzt هو الطبيب الأخصائي.',
    },
    {
      titleAr: 'الطوارئ',
      bodyAr:
        'رقم الإسعاف والإطفاء في ألمانيا هو 112، ورقم الشرطة هو 110. وللنداء قل بوضوح: «Ich brauche einen Krankenwagen!» ثم اذكر العنوان واسمك. والـ Notarzt هو طبيب الطوارئ الذي يصل مع سيارة الإسعاف عند الحالات الخطيرة.',
    },
  ],
  examples: [
    { de: 'Ich habe seit gestern Kopfschmerzen.', ar: 'عندي صداع منذ أمس.' },
    { de: 'Mein Rücken tut weh.', ar: 'ظهري يؤلمني.' },
    { de: 'Der Arzt gibt mir eine Salbe.', ar: 'يعطيني الطبيب مرهماً.' },
    { de: 'Rufen Sie bitte einen Krankenwagen!', ar: 'اتصلوا بسيارة الإسعاف من فضلكم!' },
    { de: 'Am Wochenende ruhe ich mich aus.', ar: 'في عطلة نهاية الأسبوع أرتاح.' },
  ],
  words: [
    noun('die', 'Krankheit', 'Krankheiten', 'المرض', 'Diese Krankheit ist nicht gefährlich.', 'هذا المرض ليس خطيراً.'),
    nounNoPlural('die', 'Grippe', 'الإنفلونزا', 'Ich habe die Grippe.', 'أنا مصاب بالإنفلونزا.'),
    noun('die', 'Allergie', 'Allergien', 'الحساسية', 'Ich habe eine Allergie gegen Nüsse.', 'عندي حساسية من المكسّرات.'),
    nounPluralOnly('Kopfschmerzen', 'الصداع', 'Ich habe seit gestern Kopfschmerzen.', 'عندي صداع منذ أمس.'),
    nounPluralOnly('Bauchschmerzen', 'ألم البطن', 'Mein Sohn hat Bauchschmerzen.', 'ابني عنده ألم في البطن.'),
    noun('der', 'Zahn', 'Zähne', 'السنّ', 'Mein Zahn tut weh.', 'سنّي يؤلمني.'),
    noun('der', 'Zahnarzt', 'Zahnärzte', 'طبيب الأسنان', 'Ich habe morgen einen Termin beim Zahnarzt.', 'عندي غداً موعد عند طبيب الأسنان.'),
    noun('der', 'Unfall', 'Unfälle', 'الحادث', 'Auf der Straße war ein Unfall.', 'وقع حادث في الشارع.'),
    noun('die', 'Verletzung', 'Verletzungen', 'الإصابة', 'Die Verletzung ist nicht schlimm.', 'الإصابة ليست خطيرة.'),
    noun('der', 'Krankenwagen', 'Krankenwagen', 'سيارة الإسعاف', 'Rufen Sie bitte einen Krankenwagen!', 'اتصلوا بسيارة الإسعاف من فضلكم!'),
    noun('der', 'Notarzt', 'Notärzte', 'طبيب الطوارئ', 'Der Notarzt kommt sofort.', 'يصل طبيب الطوارئ فوراً.'),
    noun('das', 'Medikament', 'Medikamente', 'الدواء', 'Ich muss das Medikament dreimal täglich nehmen.', 'عليّ تناول الدواء ثلاث مرات يومياً.'),
    noun('die', 'Salbe', 'Salben', 'المرهم', 'Der Arzt gibt mir eine Salbe.', 'يعطيني الطبيب مرهماً.'),
    noun('das', 'Pflaster', 'Pflaster', 'اللاصق الطبي', 'Hast du ein Pflaster für mich?', 'هل عندك لاصق طبي لي؟'),
    noun('die', 'Spritze', 'Spritzen', 'الحقنة', 'Ich habe Angst vor der Spritze.', 'أخاف من الحقنة.'),
    noun('die', 'Krankenkasse', 'Krankenkassen', 'صندوق التأمين الصحي', 'Meine Krankenkasse bezahlt die Untersuchung.', 'يدفع صندوق التأمين الصحي تكلفة الفحص.'),
    noun('die', 'Sprechstunde', 'Sprechstunden', 'ساعات استقبال المرضى', 'Die Sprechstunde beginnt um neun Uhr.', 'تبدأ ساعات الاستقبال في التاسعة.'),
    noun('das', 'Wartezimmer', 'Wartezimmer', 'غرفة الانتظار', 'Im Wartezimmer sitzen viele Leute.', 'يجلس كثير من الناس في غرفة الانتظار.'),
    noun('der', 'Patient', 'Patienten', 'المريض', 'Der Patient wartet im Wartezimmer.', 'ينتظر المريض في غرفة الانتظار.'),
    verb(
      'wehtun',
      'يؤلم',
      { present: ['tue', 'tust', 'tut', 'tun', 'tut', 'tun'], praeteritum: 'tat', partizip: 'wehgetan', auxiliary: 'haben', separablePrefix: 'weh' },
      'Mein Rücken tut weh.',
      'ظهري يؤلمني.',
    ),
    verb('husten', 'يسعل', { praeteritum: 'hustete', partizip: 'gehustet', auxiliary: 'haben' }, 'Er hustet seit drei Tagen.', 'يسعل منذ ثلاثة أيام.'),
    verb('sich ausruhen', 'يرتاح', { praeteritum: 'ruhte', partizip: 'ausgeruht', auxiliary: 'haben', separablePrefix: 'aus' }, 'Am Wochenende ruhe ich mich aus.', 'في عطلة نهاية الأسبوع أرتاح.'),
    verb('behandeln', 'يعالج', { praeteritum: 'behandelte', partizip: 'behandelt', auxiliary: 'haben' }, 'Der Arzt behandelt den Patienten.', 'يعالج الطبيب المريض.'),
    verb('sich verletzen', 'يُصاب (بجرح)', { praeteritum: 'verletzte', partizip: 'verletzt', auxiliary: 'haben' }, 'Er hat sich beim Fußball verletzt.', 'أُصيب أثناء لعب كرة القدم.'),
    adjective('schlimm', 'سيّئ / خطير', 'Das ist nicht schlimm.', 'هذا ليس خطيراً.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich habe ein Kopfschmerzen.',
      correct: 'Ich habe Kopfschmerzen.',
      explanationAr: 'Kopfschmerzen جمع فقط، ولذلك لا تسبقه أداة تنكير. تقول «Ich habe Kopfschmerzen» بلا أداة.',
    },
    {
      wrong: 'Ich bin Angst vor der Spritze.',
      correct: 'Ich habe Angst vor der Spritze.',
      explanationAr: 'الخوف في الألمانية اسم يُستعمل مع haben: «Angst haben vor + Dativ»، وليس مع sein.',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ä في Zähne وÄrzte',
      bodyAr: 'ä الطويلة تُنطق قريبة من «إي» مفتوحة، فتُنطق Zähne «تسيِنه» لا «تسانه».',
      example: 'Zähne',
    },
  ],
})
