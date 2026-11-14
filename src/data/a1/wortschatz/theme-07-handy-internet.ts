import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, verb } from './builders'

/**
 * The "Anglizismen" word group of the Goethe A1 list (Handy, Smartphone, Laptop, Internet, Link, Mail, online,
 * mailen, googeln, surfen) made into one lesson. These are loanwords, but each has a German article and takes
 * German verb endings, so they are taught as ordinary vocabulary with their gender.
 */
export const lessonHandyInternet: Lesson = defineTheme({
  number: 7,
  slug: 'handy-und-internet',
  title: 'Handy, Internet und E-Mail',
  titleAr: 'الهاتف المحمول والإنترنت والبريد الإلكتروني',
  categoryAr: 'الهاتف والإنترنت',
  objectivesAr: [
    'تسمية الأجهزة الشائعة مع أداتها: das Handy وder Laptop وder Computer',
    'استخدام الأفعال الحديثة: mailen وgoogeln وsurfen',
    'فهم كلمات الإنترنت الأساسية: online وLink وPasswort وHomepage',
    'كتابة سطر قصير لصديق: Ich schreibe dir eine E-Mail',
  ],
  explanation: [
    {
      titleAr: 'كلمات أجنبية بأداة ألمانية',
      bodyAr:
        'كثير من كلمات التقنية دخلت الألمانية، لكن كل اسم منها يحتاج **أداة ألمانية** تحفظها مع الكلمة: **das Handy** (الهاتف المحمول، وهي كلمة تُستعمل في الألمانية فقط بهذا المعنى)، **das Smartphone**، **der Laptop**، **der Computer**، **das Internet**، **der Link**، **das Passwort**، **die Homepage**، **die SMS**. وتأتي الجموع غالباً بـ **-s**: die Handys، die Laptops، die Links. أمّا **Computer** و**SMS** فلا يتغيّر جمعهما.',
    },
    {
      titleAr: 'أفعال جديدة تُصرَّف مثل غيرها',
      bodyAr:
        'الأفعال الجديدة منتظمة وتأخذ نهايات الأفعال العادية: **mailen**: **Ich maile dir.** (أراسلك بالبريد)، **surfen**: **Ich surfe im Internet.** (أتصفّح الإنترنت)، **googeln**: **Ich google das Wort.** (أبحث عن الكلمة في غوغل، وتسقط e قبل النهاية في ich). وفي Perfekt: **gemailt، gesurft، gegoogelt**.',
    },
    {
      titleAr: 'جمل تحتاجها كل يوم',
      bodyAr:
        '**Ich schreibe dir eine E-Mail.** (سأكتب لك رسالة بريد). **Schick mir bitte eine SMS.** (أرسل لي رسالة نصية من فضلك). **Wie ist dein Passwort?** (ما كلمة مرورك؟). **Bist du online?** (هل أنت متصل؟). لاحظ أن **dir** و**mir** هي ضمائر Dativ بمعنى «لك» و«لي»، وتأتي قبل الشيء المرسَل.',
    },
  ],
  examples: [
    { de: 'Mein Handy ist neu.', ar: 'هاتفي المحمول جديد.' },
    { de: 'Ich habe ein Smartphone und einen Laptop.', ar: 'عندي هاتف ذكي وحاسوب محمول.' },
    { de: 'Der Computer steht im Büro.', ar: 'الحاسوب في المكتب.' },
    { de: 'Ich surfe jeden Abend im Internet.', ar: 'أتصفّح الإنترنت كل مساء.' },
    { de: 'Ich google das Wort schnell.', ar: 'أبحث عن الكلمة بسرعة في غوغل.' },
    { de: 'Ich schreibe dir eine E-Mail.', ar: 'سأكتب لك رسالة بريد إلكتروني.' },
    { de: 'Schick mir bitte eine SMS.', ar: 'أرسل لي رسالة نصية من فضلك.' },
    { de: 'Hier ist der Link zur Homepage.', ar: 'هذا هو الرابط إلى الصفحة الرئيسية للموقع.' },
    { de: 'Wie ist dein Passwort?', ar: 'ما كلمة مرورك؟' },
    { de: 'Bist du jetzt online?', ar: 'هل أنت متصل الآن؟' },
  ],
  words: [
    noun('das', 'Handy', 'Handys', 'الهاتف المحمول', 'Mein Handy ist neu.', 'هاتفي المحمول جديد.'),
    noun('das', 'Smartphone', 'Smartphones', 'الهاتف الذكي', 'Ich habe ein neues Smartphone.', 'عندي هاتف ذكي جديد.'),
    noun('der', 'Laptop', 'Laptops', 'الحاسوب المحمول', 'Mein Laptop liegt auf dem Tisch.', 'حاسوبي المحمول على الطاولة.'),
    noun('der', 'Computer', 'Computer', 'الحاسوب', 'Der Computer steht im Büro.', 'الحاسوب في المكتب.'),
    nounNoPlural('das', 'Internet', 'الإنترنت', 'Ich surfe jeden Abend im Internet.', 'أتصفّح الإنترنت كل مساء.'),
    noun('die', 'Homepage', 'Homepages', 'الصفحة الرئيسية للموقع', 'Die Homepage ist sehr schön.', 'الصفحة الرئيسية جميلة جداً.'),
    noun('der', 'Link', 'Links', 'الرابط', 'Hier ist der Link.', 'هذا هو الرابط.'),
    noun('die', 'Mail', 'Mails', 'رسالة بريد إلكتروني (في الكلام)', 'Ich habe eine Mail von Anna.', 'وصلتني رسالة من آنا.'),
    noun('das', 'Passwort', 'Passwörter', 'كلمة المرور', 'Wie ist dein Passwort?', 'ما كلمة مرورك؟'),
    noun('die', 'SMS', 'SMS', 'رسالة نصية قصيرة', 'Ich schicke dir eine SMS.', 'سأرسل لك رسالة نصية.'),
    adjective('online', 'متصل بالإنترنت', 'Bist du jetzt online?', 'هل أنت متصل الآن؟'),
    verb('mailen', 'يراسل بالبريد الإلكتروني', { praeteritum: 'mailte', partizip: 'gemailt', auxiliary: 'haben' }, 'Ich maile dir die Adresse.', 'سأرسل لك العنوان بالبريد.'),
    verb('surfen', 'يتصفّح الإنترنت', { praeteritum: 'surfte', partizip: 'gesurft', auxiliary: 'haben' }, 'Mein Bruder surft jeden Tag im Internet.', 'أخي يتصفّح الإنترنت كل يوم.'),
    verb('googeln', 'يبحث في غوغل', { present: ['google', 'googelst', 'googelt', 'googeln', 'googelt', 'googeln'], praeteritum: 'googelte', partizip: 'gegoogelt', auxiliary: 'haben' }, 'Ich google das Wort schnell.', 'أبحث عن الكلمة بسرعة في غوغل.'),
  ],
  commonMistakes: [
    {
      wrong: 'Der Handy ist neu.',
      correct: 'Das Handy ist neu.',
      explanationAr: 'Handy محايد، فأداته das. احفظ الأداة مع الكلمة حتى لو كانت أصلها أجنبياً.',
    },
    {
      wrong: 'Ich mailen dir morgen.',
      correct: 'Ich maile dir morgen.',
      explanationAr: 'مع ich تنتهي الأفعال المنتظمة بـ -e، فنقول ich maile مثل ich lerne.',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'Handy ليست هاندي',
      bodyAr: 'تُنطق **Handy** في الألمانية «هِندي» بصوت e قصير في المقطع الأول والنبرة عليه، وليس «هاندي».',
      example: 'Handy',
    },
  ],
})
