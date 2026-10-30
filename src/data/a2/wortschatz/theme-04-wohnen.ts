import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounPluralOnly, verb } from './builders'

export const lessonWohnen: Lesson = defineTheme({
  number: 4,
  slug: 'wohnen-und-haushalt',
  title: 'Wohnen und Haushalt',
  titleAr: 'السكن والمنزل',
  categoryAr: 'السكن والمنزل',
  objectivesAr: [
    'وصف مبنى سكني: الطابق والمصعد والسلّم والجيران',
    'تسمية الأجهزة والأثاث المنزلي والتحدث عن التنظيف',
    'التمييز بين Kaltmiete وWarmmiete وفهم ما تعنيه Nebenkosten',
    'استعمال einziehen وausziehen مع sein في الـ Perfekt',
  ],
  explanation: [
    {
      titleAr: 'Kaltmiete وWarmmiete: ما الذي ستدفعه فعلاً',
      bodyAr:
        '«Kaltmiete» هي الإيجار الأساسي وحده. و«Nebenkosten» تكاليف إضافية كالماء ورفع النفايات وصيانة البناية. وإذا قيل «Warmmiete» فالمقصود الإيجار مع هذه التكاليف، وغالباً مع التدفئة. لذلك اسأل دائماً: «Ist das kalt oder warm؟» قبل أن تقارن بين إعلانين.',
    },
    {
      titleAr: 'الطوابق في ألمانيا',
      bodyAr:
        'الطابق الأرضي هو «das Erdgeschoss»، والطابق الذي فوقه هو الطابق الأول «der erste Stock»، وهكذا. وللسؤال عن طابق أحدهم قل: «Auf welcher Etage wohnst du؟». وفي المباني القديمة قد لا يوجد مصعد (der Aufzug)، فاسأل عنه قبل الاستئجار.',
    },
    {
      titleAr: 'einziehen وausziehen: الانتقال يأخذ sein',
      bodyAr:
        'الفعلان einziehen (يدخل السكن الجديد) وausziehen (يغادر السكن) يدلان على تغيير المكان، ولذلك يكوّنان الـ Perfekt بـ sein: «Wir sind eingezogen»، «Er ist ausgezogen». ويأتي ausziehen أيضاً بمعنى «يخلع ملابسه»، ويُفهم المعنى من السياق.',
    },
  ],
  examples: [
    { de: 'Wir wohnen im Erdgeschoss.', ar: 'نسكن في الطابق الأرضي.' },
    { de: 'Auf welcher Etage wohnst du?', ar: 'في أي طابق تسكن؟' },
    { de: 'Der Aufzug ist leider kaputt.', ar: 'المصعد معطّل للأسف.' },
    { de: 'Die Nebenkosten betragen achtzig Euro.', ar: 'تبلغ التكاليف الإضافية ثمانين يورو.' },
    { de: 'Wir sind letzte Woche eingezogen.', ar: 'انتقلنا إلى السكن الجديد الأسبوع الماضي.' },
  ],
  words: [
    nounPluralOnly('Nebenkosten', 'التكاليف الإضافية (الماء والخدمات)', 'Die Nebenkosten betragen achtzig Euro.', 'تبلغ التكاليف الإضافية ثمانين يورو.'),
    noun('das', 'Erdgeschoss', 'Erdgeschosse', 'الطابق الأرضي', 'Wir wohnen im Erdgeschoss.', 'نسكن في الطابق الأرضي.'),
    noun('die', 'Etage', 'Etagen', 'الطابق', 'Auf welcher Etage wohnst du?', 'في أي طابق تسكن؟'),
    noun('der', 'Aufzug', 'Aufzüge', 'المصعد', 'Der Aufzug ist kaputt.', 'المصعد معطّل.'),
    noun('die', 'Treppe', 'Treppen', 'السلّم', 'Ich nehme lieber die Treppe.', 'أفضّل استعمال السلّم.'),
    noun('der', 'Nachbar', 'Nachbarn', 'الجار', 'Mein Nachbar ist sehr freundlich.', 'جاري ودود جداً.'),
    noun('die', 'Heizung', 'Heizungen', 'التدفئة', 'Die Heizung funktioniert nicht.', 'التدفئة لا تعمل.'),
    noun('die', 'Waschmaschine', 'Waschmaschinen', 'الغسّالة', 'Die Waschmaschine steht im Keller.', 'الغسّالة في القبو.'),
    noun('der', 'Herd', 'Herde', 'الموقد', 'Der Herd ist neu.', 'الموقد جديد.'),
    noun('die', 'Spülmaschine', 'Spülmaschinen', 'غسّالة الصحون', 'Die Teller kommen in die Spülmaschine.', 'توضع الصحون في غسّالة الصحون.'),
    noun('der', 'Teppich', 'Teppiche', 'السجّادة', 'Der Teppich liegt im Wohnzimmer.', 'السجّادة في غرفة الجلوس.'),
    noun('der', 'Vorhang', 'Vorhänge', 'الستارة', 'Die Vorhänge sind blau.', 'الستائر زرقاء.'),
    noun('der', 'Spiegel', 'Spiegel', 'المرآة', 'Im Badezimmer hängt ein Spiegel.', 'في الحمّام مرآة معلّقة.'),
    noun('der', 'Schlüssel', 'Schlüssel', 'المفتاح', 'Ich habe meinen Schlüssel vergessen.', 'نسيتُ مفتاحي.'),
    nounPluralOnly('Möbel', 'الأثاث', 'Die Möbel sind noch nicht da.', 'الأثاث لم يصل بعد.'),
    noun('die', 'Wand', 'Wände', 'الجدار', 'An der Wand hängt ein Bild.', 'على الجدار صورة معلّقة.'),
    noun('die', 'Decke', 'Decken', 'السقف / البطانية', 'Die Lampe hängt an der Decke.', 'المصباح معلّق في السقف.'),
    noun('die', 'Steckdose', 'Steckdosen', 'مقبس الكهرباء', 'Wo ist die Steckdose?', 'أين مقبس الكهرباء؟'),
    verb('putzen', 'ينظّف', { praeteritum: 'putzte', partizip: 'geputzt', auxiliary: 'haben' }, 'Am Samstag putze ich die Wohnung.', 'أنظّف الشقة يوم السبت.'),
    verb(
      'abwaschen',
      'يغسل الصحون',
      { present: ['wasche', 'wäschst', 'wäscht', 'waschen', 'wascht', 'waschen'], praeteritum: 'wusch', partizip: 'abgewaschen', auxiliary: 'haben', separablePrefix: 'ab' },
      'Nach dem Essen wasche ich ab.',
      'بعد الأكل أغسل الصحون.',
    ),
    verb('einziehen', 'ينتقل إلى السكن الجديد', { praeteritum: 'zog', partizip: 'eingezogen', auxiliary: 'sein', separablePrefix: 'ein' }, 'Wann ziehst du ein?', 'متى ستنتقل إلى السكن الجديد؟'),
    verb('ausziehen', 'يغادر السكن / يخلع ملابسه', { praeteritum: 'zog', partizip: 'ausgezogen', auxiliary: 'sein', separablePrefix: 'aus' }, 'Mein Bruder ist letzte Woche ausgezogen.', 'غادر أخي السكن الأسبوع الماضي.'),
    verb('mieten', 'يستأجر', { praeteritum: 'mietete', partizip: 'gemietet', auxiliary: 'haben' }, 'Ich miete eine Wohnung in der Stadt.', 'أستأجر شقة في المدينة.'),
    adjective('möbliert', 'مفروش', 'Die Wohnung ist möbliert.', 'الشقة مفروشة.'),
    adjective('gemütlich', 'مريح ودافئ (ذو أجواء مريحة)', 'Das Wohnzimmer ist sehr gemütlich.', 'غرفة الجلوس مريحة ودافئة جداً.'),
    adjective('laut', 'صاخب (عالي الصوت)', 'Die Nachbarn sind abends oft laut.', 'الجيران صاخبون في المساء كثيراً.'),
  ],
  commonMistakes: [
    {
      wrong: 'Wir haben letzte Woche eingezogen.',
      correct: 'Wir sind letzte Woche eingezogen.',
      explanationAr: 'أفعال تغيير المكان كـ einziehen وausziehen تكوّن الـ Perfekt بـ sein لا بـ haben.',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'sp وst في أول الكلمة: Spiegel وStock',
      bodyAr: 'في بداية الكلمة يُنطق sp «شب» وst «شت»: Spiegel «شبيغل». أما في وسط الكلمة كما في Erdgeschoss فتُنطق s عادية.',
      example: 'Spiegel',
    },
  ],
})
