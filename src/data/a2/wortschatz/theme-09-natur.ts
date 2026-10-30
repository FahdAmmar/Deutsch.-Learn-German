import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, verb } from './builders'

export const lessonNatur: Lesson = defineTheme({
  number: 9,
  slug: 'natur-und-umwelt',
  title: 'Natur und Umwelt',
  titleAr: 'الطبيعة والبيئة',
  categoryAr: 'الطبيعة والبيئة',
  objectivesAr: [
    'تسمية عناصر الطبيعة والحيوانات الشائعة',
    'التفريق بين Wo؟ وWohin؟ مع الأماكن الطبيعية: am See / an den See',
    'الحديث عن البيئة والنفايات وحماية الطبيعة',
    'وصف الماء والهواء بصفات مثل sauber وgefährlich',
  ],
  explanation: [
    {
      titleAr: 'Wo؟ وWohin؟ مع البحر والبحيرة والجبل',
      bodyAr:
        'للموقع (Wo؟) تستعمل Dativ: «am See» (على البحيرة)، «am Meer»، «im Wald»، «in den Bergen». وللحركة نحو المكان (Wohin؟) تستعمل Akkusativ: «an den See»، «ans Meer» (= an das Meer)، «in den Wald»، «in die Berge». لاحظ أن Meer محايد فيصبح «ans»، وأن Berge جمع فتأخذ «den» في Dativ.',
    },
    {
      titleAr: 'Müll trennen: فصل النفايات',
      bodyAr:
        'في ألمانيا تُفصل النفايات في المنازل غالباً إلى ورق وزجاج وبلاستيك وبقايا طعام وبقية النفايات، ولكل نوع حاوية خاصة. وتقول: «Wir trennen den Müll» أو «Wir recyceln Papier und Glas». وقد تختلف الألوان والتفاصيل من منطقة إلى أخرى، فاسأل جيرانك أو مالك البيت.',
    },
  ],
  examples: [
    { de: 'Im Sommer fahren wir ans Meer.', ar: 'في الصيف نسافر إلى البحر.' },
    { de: 'Am Sonntag gehen wir an den See.', ar: 'يوم الأحد نذهب إلى البحيرة.' },
    { de: 'Wir müssen die Umwelt schützen.', ar: 'علينا أن نحمي البيئة.' },
    { de: 'Die Sonne scheint, und der Himmel ist blau.', ar: 'الشمس مشرقة والسماء زرقاء.' },
    { de: 'Wir recyceln Papier und Glas.', ar: 'نعيد تدوير الورق والزجاج.' },
  ],
  words: [
    nounNoPlural('die', 'Natur', 'الطبيعة', 'Ich gehe gern in die Natur.', 'أحبّ الذهاب إلى الطبيعة.'),
    nounNoPlural('die', 'Umwelt', 'البيئة', 'Wir müssen die Umwelt schützen.', 'علينا أن نحمي البيئة.'),
    noun('der', 'Wald', 'Wälder', 'الغابة', 'Im Wald sind viele Bäume.', 'في الغابة أشجار كثيرة.'),
    noun('der', 'Baum', 'Bäume', 'الشجرة', 'Der Baum ist sehr hoch.', 'الشجرة عالية جداً.'),
    noun('die', 'Blume', 'Blumen', 'الزهرة', 'Ich kaufe Blumen für meine Mutter.', 'أشتري زهوراً لأمي.'),
    noun('die', 'Pflanze', 'Pflanzen', 'النبات', 'Die Pflanzen brauchen Wasser.', 'النباتات تحتاج إلى ماء.'),
    noun('der', 'Berg', 'Berge', 'الجبل', 'Im Winter fahren wir in die Berge.', 'في الشتاء نذهب إلى الجبال.'),
    noun('der', 'See', 'Seen', 'البحيرة', 'Am Sonntag gehen wir an den See.', 'يوم الأحد نذهب إلى البحيرة.'),
    noun('das', 'Meer', 'Meere', 'البحر', 'Im Sommer fahren wir ans Meer.', 'في الصيف نسافر إلى البحر.'),
    noun('der', 'Fluss', 'Flüsse', 'النهر', 'Der Rhein ist ein Fluss in Deutschland.', 'الراين نهر في ألمانيا.'),
    nounNoPlural('der', 'Himmel', 'السماء', 'Der Himmel ist heute blau.', 'السماء زرقاء اليوم.'),
    nounNoPlural('die', 'Luft', 'الهواء', 'Die Luft ist hier sehr frisch.', 'الهواء هنا منعش جداً.'),
    noun('das', 'Tier', 'Tiere', 'الحيوان', 'Hast du ein Tier zu Hause?', 'هل عندك حيوان في المنزل؟'),
    noun('der', 'Vogel', 'Vögel', 'الطائر', 'Der Vogel singt am Morgen.', 'يغرّد الطائر في الصباح.'),
    noun('die', 'Katze', 'Katzen', 'القطّة', 'Meine Katze schläft auf dem Sofa.', 'تنام قطّتي على الأريكة.'),
    nounNoPlural('der', 'Müll', 'القمامة (النفايات)', 'Ich bringe den Müll raus.', 'أُخرج القمامة.'),
    nounNoPlural('die', 'Energie', 'الطاقة', 'Wir sparen Energie.', 'نوفّر الطاقة.'),
    nounNoPlural('das', 'Klima', 'المناخ', 'Das Klima in Deutschland ist mild.', 'المناخ في ألمانيا معتدل.'),
    nounNoPlural('das', 'Wetter', 'الطقس', 'Das Wetter ist heute schön.', 'الطقس جميل اليوم.'),
    verb('schützen', 'يحمي', { praeteritum: 'schützte', partizip: 'geschützt', auxiliary: 'haben' }, 'Wir müssen die Natur schützen.', 'علينا أن نحمي الطبيعة.'),
    verb('recyceln', 'يعيد التدوير', { praeteritum: 'recycelte', partizip: 'recycelt', auxiliary: 'haben' }, 'Wir recyceln Papier und Glas.', 'نعيد تدوير الورق والزجاج.'),
    verb(
      'wachsen',
      'ينمو',
      { present: ['wachse', 'wächst', 'wächst', 'wachsen', 'wachst', 'wachsen'], praeteritum: 'wuchs', partizip: 'gewachsen', auxiliary: 'sein' },
      'Die Blumen wachsen schnell.',
      'تنمو الزهور بسرعة.',
    ),
    verb('scheinen', 'يسطع / يبدو', { praeteritum: 'schien', partizip: 'geschienen', auxiliary: 'haben' }, 'Heute scheint die Sonne.', 'اليوم تسطع الشمس.'),
    adjective('sauber', 'نظيف', 'Das Wasser im See ist sauber.', 'ماء البحيرة نظيف.'),
    adjective('schmutzig', 'متّسخ', 'Die Straße ist schmutzig.', 'الشارع متّسخ.'),
    adjective('gefährlich', 'خطير', 'Der Fluss ist hier gefährlich.', 'النهر خطير هنا.'),
  ],
  commonMistakes: [
    {
      wrong: 'Wir fahren zu Meer.',
      correct: 'Wir fahren ans Meer.',
      explanationAr: 'للتوجّه نحو الساحل تستعمل «an das Meer» وتُختصر إلى «ans Meer». وللوجود هناك: «am Meer».',
    },
    {
      wrong: 'Der Wetter ist schön.',
      correct: 'Das Wetter ist schön.',
      explanationAr: 'Wetter محايدة: das Wetter. وكذلك das Klima وdas Meer وdas Tier.',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'الفرق بين ie وei',
      bodyAr: 'الحرفان ie يُنطقان «ي» طويلة: Tier «تير». أما ei فتُنطق «آي»: Eis «آيس». احفظ الفرق لأن الخلط بينهما شائع.',
      example: 'Tier',
    },
  ],
})
