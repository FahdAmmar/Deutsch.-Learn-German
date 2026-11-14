import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, nounPluralOnly, verb } from './builders'

export const lessonLebensmittel: Lesson = defineTheme({
  number: 2,
  slug: 'lebensmittel-und-getraenke',
  title: 'Lebensmittel und Getränke',
  titleAr: 'الأطعمة والمشروبات',
  categoryAr: 'الأطعمة والمشروبات',
  objectivesAr: [
    'تسمية الفواكه والخضار والمشروبات والمواد الأساسية مع أداتها',
    'معرفة متى نستعمل الأداة ومتى نتركها: Ich trinke Tee / Ich esse einen Apfel',
    'السؤال: Was isst du gern؟ Was trinkst du؟',
  ],
  explanation: [
    {
      titleAr: 'بلا أداة للمواد عموماً',
      bodyAr:
        'عندما تتحدث عن مادة بشكل عام (لا تُعدّ) لا تضع أداة: **Ich trinke Tee.** **Ich esse Reis.** **Ich mag Käse.** أما الشيء الذي يُعدّ فيأخذ أداة تنكير: **Ich esse einen Apfel.** **Ich nehme eine Banane.** (der Apfel → einen Apfel، die Banane → eine Banane).',
    },
    {
      titleAr: 'gern لما تحبه',
      bodyAr:
        'نضيف **gern** بعد الفعل: **Ich esse gern Reis.** (أحب أكل الأرز). **Ich trinke gern Tee.** والسؤال: **Was isst du gern؟** وللنفي: **Ich trinke nicht gern Kaffee.**',
    },
    {
      titleAr: 'مفردات تُستعمل غالباً بلا جمع',
      bodyAr:
        'كلمات مثل **der Reis، der Zucker، das Salz، die Butter** لا جمع لها في الاستعمال العادي. أما **die Nudeln** فتُستعمل بالجمع فقط، وكذلك نقول "أكلت معكرونة" بالجمع: Ich esse Nudeln.',
    },
  ],
  examples: [
    { de: 'Ich trinke jeden Morgen Tee.', ar: 'أشرب الشاي كل صباح.' },
    { de: 'Ich esse gern Reis mit Hähnchen.', ar: 'أحب أكل الأرز مع الدجاج.' },
    { de: 'Möchtest du Kaffee oder Tee?', ar: 'هل تريد قهوة أم شاياً؟' },
    { de: 'Ich esse einen Apfel und eine Banane.', ar: 'آكل تفاحة وموزة.' },
    { de: 'Der Salat ist frisch.', ar: 'السلطة طازجة.' },
    { de: 'Ich brauche Butter und Zucker.', ar: 'أحتاج زبدة وسكراً.' },
    { de: 'Was isst du gern?', ar: 'ماذا تحب أن تأكل؟' },
    { de: 'Wir kochen heute Nudeln mit Tomaten.', ar: 'نطبخ اليوم معكرونة بالطماطم.' },
  ],
  words: [
    noun('die', 'Banane', 'Bananen', 'الموزة', 'Ich esse eine Banane zum Frühstück.', 'آكل موزة في الفطور.'),
    noun('die', 'Orange', 'Orangen', 'البرتقالة', 'Die Orange ist süß.', 'البرتقالة حلوة.'),
    noun('die', 'Tomate', 'Tomaten', 'الطماطم', 'Ich kaufe fünf Tomaten.', 'أشتري خمس حبات طماطم.'),
    noun('die', 'Gurke', 'Gurken', 'الخيارة', 'Die Gurke ist frisch.', 'الخيارة طازجة.'),
    noun('die', 'Zwiebel', 'Zwiebeln', 'البصلة', 'Ich brauche eine Zwiebel.', 'أحتاج بصلة.'),
    noun('der', 'Salat', 'Salate', 'السلطة / الخس', 'Zum Essen gibt es Salat.', 'مع الطعام توجد سلطة.'),
    nounNoPlural('der', 'Reis', 'الأرز', 'Ich esse gern Reis.', 'أحب أكل الأرز.'),
    noun('das', 'Hähnchen', 'Hähnchen', 'الدجاج (القطعة / الدجاجة)', 'Das Hähnchen schmeckt gut.', 'الدجاج لذيذ.'),
    nounPluralOnly('Nudeln', 'المعكرونة', 'Ich koche heute Nudeln.', 'أطبخ اليوم معكرونة.'),
    noun('der', 'Tee', 'Tees', 'الشاي', 'Ich trinke jeden Morgen Tee.', 'أشرب الشاي كل صباح.'),
    noun('der', 'Kaffee', 'Kaffees', 'القهوة', 'Möchtest du Kaffee?', 'هل تريد قهوة؟'),
    noun('der', 'Saft', 'Säfte', 'العصير', 'Die Kinder trinken Saft.', 'الأطفال يشربون عصيراً.'),
    noun('der', 'Joghurt', 'Joghurts', 'الزبادي', 'Zum Frühstück esse ich Joghurt.', 'في الفطور آكل زبادي.'),
    nounNoPlural('die', 'Butter', 'الزبدة', 'Das Brot mit Butter schmeckt gut.', 'الخبز بالزبدة لذيذ.'),
    nounNoPlural('der', 'Zucker', 'السكر', 'Ich nehme keinen Zucker.', 'لا آخذ سكراً.'),
    nounNoPlural('das', 'Salz', 'الملح', 'Die Suppe braucht Salz.', 'الشوربة تحتاج ملحاً.'),
    nounNoPlural('das', 'Fleisch', 'اللحم', 'Ich esse kein Fleisch.', 'لا آكل لحماً.'),
    noun('der', 'Fisch', 'Fische', 'السمك', 'Am Freitag essen wir Fisch.', 'يوم الجمعة نأكل سمكاً.'),
    verb('trinken', 'يشرب', { praeteritum: 'trank', partizip: 'getrunken', auxiliary: 'haben' }, 'Was trinkst du gern?', 'ماذا تحب أن تشرب؟'),
    adjective('süß', 'حلو', 'Der Tee ist sehr süß.', 'الشاي حلو جداً.'),
    adjective('frisch', 'طازج', 'Das Obst ist frisch.', 'الفاكهة طازجة.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich trinke den Tee jeden Morgen.',
      correct: 'Ich trinke jeden Morgen Tee.',
      explanationAr: 'عند الحديث عن مادة بشكل عام (الشاي عموماً) لا نضع الأداة.',
    },
    {
      wrong: 'Ich esse eine Apfel.',
      correct: 'Ich esse einen Apfel.',
      explanationAr: 'Apfel مذكّر، وفي Akkusativ يصبح einen Apfel.',
    },
  ],
})
