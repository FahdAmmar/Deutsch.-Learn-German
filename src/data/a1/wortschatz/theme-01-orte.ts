import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, phrase, verb } from './builders'

export const lessonOrte: Lesson = defineTheme({
  number: 1,
  slug: 'orte-in-der-stadt',
  title: 'Orte in der Stadt',
  titleAr: 'الأماكن في المدينة',
  categoryAr: 'الأماكن في المدينة',
  objectivesAr: [
    'تسمية الأماكن المهمة في المدينة مع أداة كل منها',
    'السؤال عن مكان: Wo ist …؟ وGibt es hier …؟',
    'قول وجهتك: Ich gehe zum / zur / ins / in die … / nach Hause',
  ],
  explanation: [
    {
      titleAr: 'Wo ist …؟ وGibt es hier …؟',
      bodyAr:
        'للسؤال عن مكان معروف نقول **Wo ist die Bank؟** وللسؤال عن وجود مكان نقول **Gibt es hier eine Bank؟** (هل يوجد هنا بنك؟). وبعد es gibt نستعمل حالة Akkusativ: Gibt es hier **einen** Park؟ (der Park → einen Park). والإجابة المفيدة: **Ja, in der Nähe.** (نعم، قريب من هنا).',
    },
    {
      titleAr: 'إلى أين؟ قاعدة مبسّطة',
      bodyAr:
        'للأماكن التي تقصدها لتنجز فيها شيئاً (بنك، بريد، محطة، طبيب) نقول **zu**: Ich gehe **zum** Bahnhof، **zur** Bank، **zur** Post. وللأماكن التي تدخلها وتبقى فيها (سينما، مدرسة، مقهى، حديقة) نقول **in**: Ich gehe **ins** Kino، **in die** Schule، **in den** Park. وللبيت نقول **nach Hause** (إلى البيت) و**zu Hause** (في البيت). هذه قاعدة تكفي الآن، وتفاصيلها الكاملة في A2.',
    },
    {
      titleAr: 'أين تكون؟ im وin der',
      bodyAr:
        'عند السؤال Wo؟ (أين) نقول: **im** Kino، **im** Park، **im** Café، **im** Supermarkt (للمذكر والمحايد)، و**in der** Schule، **in der** Bäckerei (للمؤنث). الجواب يتغيّر مع جنس الكلمة، فاحفظ كل مكان مع أداته.',
    },
  ],
  examples: [
    { de: 'Wo ist die Bank?', ar: 'أين البنك؟' },
    { de: 'Die Post liegt neben dem Bahnhof.', ar: 'مكتب البريد بجانب المحطة.' },
    { de: 'Gibt es hier eine Bäckerei?', ar: 'هل توجد هنا مخبزة؟' },
    { de: 'Ich gehe zur Bank und dann zur Post.', ar: 'أذهب إلى البنك ثم إلى البريد.' },
    { de: 'Heute Abend gehen wir ins Kino.', ar: 'نذهب الليلة إلى السينما.' },
    { de: 'Die Kinder spielen im Park.', ar: 'الأطفال يلعبون في الحديقة.' },
    { de: 'Ich kaufe Brötchen in der Bäckerei.', ar: 'أشتري الخبز الصغير من المخبزة.' },
    { de: 'Nach der Schule gehe ich nach Hause.', ar: 'بعد المدرسة أذهب إلى البيت.' },
  ],
  words: [
    noun('die', 'Stadt', 'Städte', 'المدينة', 'Die Stadt ist groß und schön.', 'المدينة كبيرة وجميلة.'),
    noun('das', 'Dorf', 'Dörfer', 'القرية', 'Mein Onkel wohnt in einem Dorf.', 'عمّي يسكن في قرية.'),
    noun('das', 'Zentrum', 'Zentren', 'المركز / وسط المدينة', 'Das Zentrum ist nicht weit.', 'وسط المدينة ليس بعيداً.'),
    noun('der', 'Bahnhof', 'Bahnhöfe', 'المحطة (القطار)', 'Der Bahnhof ist in der Nähe.', 'المحطة قريبة من هنا.'),
    noun('die', 'Bank', 'Banken', 'البنك', 'Die Bank öffnet um neun Uhr.', 'يفتح البنك في الساعة التاسعة.'),
    nounNoPlural('die', 'Post', 'البريد (المكتب)', 'Die Post ist neben der Bank.', 'مكتب البريد بجانب البنك.'),
    noun('die', 'Bäckerei', 'Bäckereien', 'المخبزة', 'In der Bäckerei kaufe ich Brötchen.', 'أشتري الخبز الصغير من المخبزة.'),
    noun('die', 'Metzgerei', 'Metzgereien', 'محل اللحوم (الملحمة)', 'Die Metzgerei verkauft frisches Fleisch.', 'محل اللحوم يبيع لحماً طازجاً.'),
    noun('der', 'Supermarkt', 'Supermärkte', 'السوبرماركت', 'Im Supermarkt gibt es alles.', 'في السوبرماركت يوجد كل شيء.'),
    noun('das', 'Kino', 'Kinos', 'السينما', 'Am Samstag gehen wir ins Kino.', 'يوم السبت نذهب إلى السينما.'),
    noun('der', 'Park', 'Parks', 'الحديقة العامة', 'Die Kinder spielen im Park.', 'الأطفال يلعبون في الحديقة.'),
    noun('das', 'Restaurant', 'Restaurants', 'المطعم', 'Das Restaurant ist sehr gut.', 'المطعم جيد جداً.'),
    noun('das', 'Café', 'Cafés', 'المقهى', 'Wir trinken einen Tee im Café.', 'نشرب شاياً في المقهى.'),
    noun('die', 'Moschee', 'Moscheen', 'المسجد', 'Die Moschee ist neben dem Park.', 'المسجد بجانب الحديقة.'),
    noun('die', 'Schule', 'Schulen', 'المدرسة', 'Die Schule beginnt um acht Uhr.', 'تبدأ المدرسة في الساعة الثامنة.'),
    nounNoPlural('die', 'Polizei', 'الشرطة', 'Ich rufe die Polizei an.', 'أتصل بالشرطة.'),
    verb('liegen', 'يقع / يوجد (موضع أفقي)', { praeteritum: 'lag', partizip: 'gelegen', auxiliary: 'haben' }, 'Das Kino liegt im Zentrum.', 'السينما تقع في وسط المدينة.'),
    adjective('nah', 'قريب', 'Der Park ist ganz nah.', 'الحديقة قريبة جداً.'),
    phrase('in der Nähe', 'قريب من هنا', 'Gibt es hier ein Café in der Nähe?', 'هل يوجد مقهى قريب من هنا؟'),
    phrase('Gibt es hier …?', 'هل يوجد هنا …؟', 'Gibt es hier eine Apotheke?', 'هل توجد هنا صيدلية؟'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich gehe in die Bank.',
      correct: 'Ich gehe zur Bank.',
      explanationAr: 'للأماكن التي تقصدها لإنجاز عمل (بنك، بريد، محطة) نقول zu: zur Bank، zur Post، zum Bahnhof.',
    },
    {
      wrong: 'Ich gehe zu Hause.',
      correct: 'Ich gehe nach Hause.',
      explanationAr: 'للاتجاه إلى البيت نقول nach Hause، أما zu Hause فتعني "في البيت".',
    },
  ],
})
