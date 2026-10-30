import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, phrase, verb } from './builders'

export const lessonFreizeit: Lesson = defineTheme({
  number: 8,
  slug: 'freizeit-und-medien',
  title: 'Freizeit und Medien',
  titleAr: 'وقت الفراغ والإعلام',
  categoryAr: 'وقت الفراغ والإعلام',
  objectivesAr: [
    'الحديث عن الذهاب إلى السينما والحفلات والمعارض والنوادي',
    'استعمال in + Akkusativ للوجهة وin + Dativ للمكان مع هذه الأماكن',
    'تسمية وسائل التواصل والإعلام: Handy وInternet وNachricht وE-Mail',
    'وصف الأفلام والبرامج بصفات مثل spannend وlangweilig',
  ],
  explanation: [
    {
      titleAr: 'ins Kino أم im Kino؟',
      bodyAr:
        'للحركة نحو المكان تستعمل in + Akkusativ: «Wir gehen ins Kino» (ins = in das)، وللوجود فيه in + Dativ: «Wir sind im Kino» (im = in dem). وكذلك: «ins Konzert / im Konzert»، «ins Theater / im Theater». السؤال «Wohin؟» يقود إلى Akkusativ، والسؤال «Wo؟» يقود إلى Dativ.',
    },
    {
      titleAr: 'das Handy: كلمة ألمانية الشكل',
      bodyAr:
        'تبدو كلمة Handy إنجليزية، لكنها ألمانية الاستعمال بمعنى الهاتف المحمول، ولا يفهمها المتكلم بالإنجليزية بهذا المعنى. وهي مثل «der Computer» و«die E-Mail» (مؤنثة) و«das Internet». وانتبه إلى جنس الكلمة: die E-Mail وليس der.',
    },
    {
      titleAr: 'sich treffen mit: أن تلتقي بأحد',
      bodyAr:
        'للقاء الأصدقاء تقول: «Ich treffe mich mit Freunden» (أنا ألتقي بأصدقائي)، فالفعل انعكاسي ويُتبع بـ mit + Dativ. وللاتفاق المسبق على موعد اجتماعي تستعمل «die Verabredung» (ستجدها في درس الوقت).',
    },
  ],
  examples: [
    { de: 'Wir gehen heute ins Kino.', ar: 'نذهب اليوم إلى السينما.' },
    { de: 'Der Film ist sehr spannend.', ar: 'الفيلم مشوّق جداً.' },
    { de: 'Ich schreibe dir eine E-Mail.', ar: 'سأكتب لك رسالة إلكترونية.' },
    { de: 'Am Samstag treffe ich mich mit Freunden.', ar: 'يوم السبت ألتقي بأصدقائي.' },
    { de: 'Unsere Mannschaft hat gewonnen.', ar: 'فاز فريقنا.' },
  ],
  words: [
    noun('der', 'Film', 'Filme', 'الفيلم', 'Der Film beginnt um acht Uhr.', 'يبدأ الفيلم في الساعة الثامنة.'),
    noun('das', 'Kino', 'Kinos', 'السينما', 'Wir gehen heute ins Kino.', 'نذهب اليوم إلى السينما.'),
    noun('das', 'Konzert', 'Konzerte', 'الحفل الموسيقي', 'Am Samstag gehen wir ins Konzert.', 'يوم السبت نذهب إلى حفل موسيقي.'),
    noun('die', 'Ausstellung', 'Ausstellungen', 'المعرض', 'Die Ausstellung ist bis Sonntag geöffnet.', 'المعرض مفتوح حتى الأحد.'),
    noun('der', 'Verein', 'Vereine', 'النادي (الجمعية)', 'Ich bin Mitglied in einem Verein.', 'أنا عضو في نادٍ.'),
    noun('die', 'Mannschaft', 'Mannschaften', 'الفريق', 'Unsere Mannschaft hat gewonnen.', 'فاز فريقنا.'),
    noun('das', 'Spiel', 'Spiele', 'اللعبة / المباراة', 'Das Spiel ist um halb neun.', 'المباراة في الثامنة والنصف.'),
    noun('der', 'Ausflug', 'Ausflüge', 'الرحلة القصيرة (نزهة)', 'Am Sonntag machen wir einen Ausflug.', 'يوم الأحد نقوم برحلة قصيرة.'),
    noun('die', 'Zeitung', 'Zeitungen', 'الصحيفة', 'Mein Vater liest jeden Morgen die Zeitung.', 'يقرأ أبي الصحيفة كل صباح.'),
    noun('die', 'Sendung', 'Sendungen', 'البرنامج (التلفزيوني)', 'Die Sendung beginnt um zwanzig Uhr.', 'يبدأ البرنامج في الثامنة مساءً.'),
    noun('die', 'Nachricht', 'Nachrichten', 'الرسالة القصيرة / الخبر', 'Ich habe dir eine Nachricht geschrieben.', 'كتبتُ لك رسالة.'),
    noun('das', 'Handy', 'Handys', 'الهاتف المحمول', 'Wo ist mein Handy?', 'أين هاتفي المحمول؟'),
    noun('der', 'Computer', 'Computer', 'الحاسوب', 'Ich arbeite am Computer.', 'أعمل على الحاسوب.'),
    nounNoPlural('das', 'Internet', 'الإنترنت', 'Ich habe zu Hause kein Internet.', 'ليس عندي إنترنت في المنزل.'),
    noun('die', 'E-Mail', 'E-Mails', 'البريد الإلكتروني (رسالة)', 'Ich schreibe dir eine E-Mail.', 'سأكتب لك رسالة إلكترونية.'),
    noun('das', 'Foto', 'Fotos', 'الصورة الفوتوغرافية', 'Ich mache viele Fotos im Urlaub.', 'ألتقط صوراً كثيرة في الإجازة.'),
    noun('das', 'Theater', 'Theater', 'المسرح', 'Das Theater ist in der Innenstadt.', 'المسرح في وسط المدينة.'),
    verb('gewinnen', 'يفوز / يربح', { praeteritum: 'gewann', partizip: 'gewonnen', auxiliary: 'haben' }, 'Wir haben das Spiel gewonnen.', 'فزنا بالمباراة.'),
    verb('verlieren', 'يخسر / يضيّع', { praeteritum: 'verlor', partizip: 'verloren', auxiliary: 'haben' }, 'Er hat seinen Schlüssel verloren.', 'ضيّع مفتاحه.'),
    verb(
      'sich treffen',
      'يلتقي',
      { present: ['treffe', 'triffst', 'trifft', 'treffen', 'trefft', 'treffen'], praeteritum: 'traf', partizip: 'getroffen', auxiliary: 'haben' },
      'Wir treffen uns am Samstag im Kino.',
      'نلتقي يوم السبت في السينما.',
    ),
    verb('chatten', 'يدردش (كتابياً)', { praeteritum: 'chattete', partizip: 'gechattet', auxiliary: 'haben' }, 'Ich chatte oft mit meinen Freunden.', 'أدردش كثيراً مع أصدقائي.'),
    phrase('spazieren gehen', 'يتنزّه (مشياً)', 'Am Abend gehen wir im Park spazieren.', 'في المساء نتنزّه في الحديقة.'),
    adjective('spannend', 'مشوّق', 'Der Film ist sehr spannend.', 'الفيلم مشوّق جداً.'),
    adjective('langweilig', 'ممل', 'Das Spiel war langweilig.', 'كانت المباراة مملّة.'),
    adjective('lustig', 'مضحك', 'Die Sendung ist sehr lustig.', 'البرنامج مضحك جداً.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich gehe zu Kino.',
      correct: 'Ich gehe ins Kino.',
      explanationAr: 'للدخول إلى السينما تستعمل in + Akkusativ: ins = in das، لأن Kino محايد.',
    },
    {
      wrong: 'Ich habe eine Handy.',
      correct: 'Ich habe ein Handy.',
      explanationAr: 'Handy محايدة (das Handy)، فتأخذ ein في حالة المفعول به، بينما E-Mail مؤنثة: eine E-Mail.',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'sp وst في Spiel وSpannend',
      bodyAr: 'في أول الكلمة يُنطق sp «شب» وst «شت»: Spiel «شبيل»، spannend «شبانِنت». وهذه قاعدة ثابتة في الألمانية الفصحى.',
      example: 'Spiel',
    },
  ],
})
