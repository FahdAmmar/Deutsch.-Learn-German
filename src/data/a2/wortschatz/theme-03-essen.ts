import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, nounNoPlural, nounPluralOnly, verb } from './builders'

export const lessonEssen: Lesson = defineTheme({
  number: 3,
  slug: 'essen-und-restaurant',
  title: 'Essen und Restaurant',
  titleAr: 'الطعام والمطعم',
  categoryAr: 'الطعام والمطعم',
  objectivesAr: [
    'تسمية الوجبات والأطباق والأواني على المائدة',
    'الطلب والدفع في المطعم بالعبارات الشائعة',
    'التعبير عن ما تأكله وما لا تأكله: kein Fleisch، vegetarisch',
    'وصف الطعام: scharf وsatt وfrisch',
  ],
  explanation: [
    {
      titleAr: 'في المطعم: من الطلب إلى الدفع',
      bodyAr:
        'تطلب بـ «Ich nehme …» أو «Ich möchte …, bitte». وحين تنتهي تقول «Wir möchten zahlen, bitte» أو «Zahlen, bitte!». وسيسألك النادل غالباً: «Zusammen oder getrennt؟» (معاً أم كلٌّ على حدة؟). أما البقشيش (das Trinkgeld) فليس إلزامياً، والعادة أن تقرّب المبلغ إلى الأعلى وتقول «Stimmt so!» (الباقي لك). تقولها عند تسليم المال لا بعده.',
    },
    {
      titleAr: 'ein Glas Wasser: المقدار بلا حرف جر',
      bodyAr:
        'بين وحدة القياس والمادة لا يوجد حرف جر في الألمانية: «ein Glas Wasser» (كأس ماء)، «eine Tasse Kaffee» (فنجان قهوة)، «eine Flasche Wasser» (زجاجة ماء). وللوجبة استعمل zu: «zum Frühstück» (على الفطور)، «zum Mittagessen»، «zum Abendessen».',
    },
  ],
  examples: [
    { de: 'Ich nehme das Hauptgericht und ein Glas Wasser.', ar: 'آخذ الطبق الرئيسي وكأس ماء.' },
    { de: 'Zum Frühstück esse ich Brot und Käse.', ar: 'على الفطور آكل خبزاً وجبناً.' },
    { de: 'Wir möchten zahlen, bitte.', ar: 'نريد أن ندفع من فضلك.' },
    { de: 'Ich esse kein Fleisch.', ar: 'لا آكل اللحم.' },
    { de: 'Das Essen ist sehr scharf.', ar: 'الطعام حارّ جداً.' },
  ],
  words: [
    nounNoPlural('das', 'Frühstück', 'وجبة الفطور', 'Zum Frühstück esse ich Brot und Käse.', 'على الفطور آكل خبزاً وجبناً.'),
    noun('das', 'Mittagessen', 'Mittagessen', 'الغداء', 'Das Mittagessen ist um eins fertig.', 'يكون الغداء جاهزاً في الواحدة.'),
    noun('das', 'Abendessen', 'Abendessen', 'العشاء', 'Das Abendessen steht auf dem Tisch.', 'العشاء على الطاولة.'),
    noun('die', 'Vorspeise', 'Vorspeisen', 'المقبّلات', 'Als Vorspeise nehme ich eine Suppe.', 'آخذ حساءً كمقبّلات.'),
    noun('das', 'Hauptgericht', 'Hauptgerichte', 'الطبق الرئيسي', 'Das Hauptgericht ist Fisch mit Kartoffeln.', 'الطبق الرئيسي سمك مع بطاطس.'),
    noun('das', 'Getränk', 'Getränke', 'المشروب', 'Welches Getränk möchten Sie?', 'أيّ مشروب تودّون؟'),
    nounNoPlural('das', 'Trinkgeld', 'البقشيش', 'Ich gebe immer fünf Euro Trinkgeld.', 'أعطي دائماً خمسة يورو بقشيشاً.'),
    noun('der', 'Teller', 'Teller', 'الصحن', 'Der Teller ist leer.', 'الصحن فارغ.'),
    noun('das', 'Glas', 'Gläser', 'الكأس (الكوب)', 'Ich trinke ein Glas Wasser.', 'أشرب كأس ماء.'),
    noun('die', 'Tasse', 'Tassen', 'الفنجان', 'Möchtest du eine Tasse Kaffee?', 'هل تريد فنجان قهوة؟'),
    noun('die', 'Flasche', 'Flaschen', 'الزجاجة', 'Eine Flasche Wasser, bitte.', 'زجاجة ماء من فضلك.'),
    noun('die', 'Gabel', 'Gabeln', 'الشوكة', 'Die Gabel liegt links vom Teller.', 'الشوكة على يسار الصحن.'),
    noun('der', 'Löffel', 'Löffel', 'الملعقة', 'Ich esse die Suppe mit dem Löffel.', 'آكل الحساء بالملعقة.'),
    noun('das', 'Messer', 'Messer', 'السكين', 'Ich brauche ein Messer.', 'أحتاج إلى سكين.'),
    nounNoPlural('das', 'Fleisch', 'اللحم', 'Ich esse kein Fleisch.', 'لا آكل اللحم.'),
    noun('der', 'Fisch', 'Fische', 'السمك', 'Heute gibt es Fisch.', 'اليوم يوجد سمك.'),
    nounNoPlural('das', 'Gemüse', 'الخضار', 'Ich esse viel Gemüse.', 'آكل الكثير من الخضار.'),
    nounNoPlural('das', 'Obst', 'الفاكهة', 'Zum Nachtisch gibt es Obst.', 'للتحلية يوجد فاكهة.'),
    nounNoPlural('der', 'Käse', 'الجبن', 'Ich mag Käse sehr.', 'أحبّ الجبن كثيراً.'),
    nounPluralOnly('Nudeln', 'المعكرونة', 'Heute koche ich Nudeln mit Tomatensauce.', 'اليوم أطبخ معكرونة بصلصة الطماطم.'),
    noun('der', 'Kuchen', 'Kuchen', 'الكعكة', 'Zum Geburtstag gibt es Kuchen.', 'في عيد الميلاد توجد كعكة.'),
    noun('die', 'Kartoffel', 'Kartoffeln', 'البطاطس (حبّة)', 'Die Kartoffeln sind noch nicht fertig.', 'البطاطس لم تنضج بعد.'),
    verb('probieren', 'يتذوّق / يجرّب', { praeteritum: 'probierte', partizip: 'probiert', auxiliary: 'haben' }, 'Möchten Sie die Suppe probieren?', 'هل تودّون تذوّق الحساء؟'),
    verb('zahlen', 'يدفع', { praeteritum: 'zahlte', partizip: 'gezahlt', auxiliary: 'haben' }, 'Wir möchten zahlen, bitte.', 'نريد أن ندفع من فضلك.'),
    adjective('vegetarisch', 'نباتي', 'Ich esse vegetarisch.', 'آكل طعاماً نباتياً.'),
    adjective('satt', 'شبعان', 'Danke, ich bin satt.', 'شكراً، أنا شبعان.'),
    adjective('scharf', 'حارّ (بالتوابل)', 'Das Essen ist sehr scharf.', 'الطعام حارّ جداً.'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich esse Fleisch nicht.',
      correct: 'Ich esse kein Fleisch.',
      explanationAr: 'الاسم الذي لا أداة له أو أداته تنكير يُنفى بـ kein، لا بـ nicht: «kein Fleisch».',
    },
    {
      wrong: 'Ich trinke ein Glas von Wasser.',
      correct: 'Ich trinke ein Glas Wasser.',
      explanationAr: 'لا يوجد حرف جر بين وحدة القياس والمادة: «ein Glas Wasser»، «eine Tasse Kaffee».',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ch في Kuchen',
      bodyAr: 'بعد a وo وu وau يُنطق ch قريباً من «خ» العربية، ولذلك تُنطق Kuchen «كوخن».',
      example: 'Kuchen',
    },
    {
      titleAr: 'ä وö وü في Käse وLöffel وGemüse',
      bodyAr: 'Käse تُنطق «كيزه» بإمالة طويلة. وö تُنطق بشفتين مدوّرتين كأنك تقول «إي» ثم تضمّ الشفتين. وü بالطريقة نفسها مع «ي».',
      example: 'Käse',
    },
  ],
})
