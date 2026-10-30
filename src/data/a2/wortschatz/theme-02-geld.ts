import type { Lesson } from '@/types'

import { defineTheme, noun, nounNoPlural, verb } from './builders'

export const lessonGeld: Lesson = defineTheme({
  number: 2,
  slug: 'geld-bank-und-post',
  title: 'Geld, Bank und Post',
  titleAr: 'المال والبنك والبريد',
  categoryAr: 'المال والبنك والبريد',
  objectivesAr: [
    'الحديث عن الحساب والبطاقة والنقود وعن الدفع نقداً أو ببطاقة',
    'فهم عمليات البنك الأساسية: السحب والإيداع والتحويل',
    'إرسال رسالة أو طرد في مكتب البريد وكتابة العنوان بالترتيب الألماني',
    'طلب إيصال أو سؤال عن السعر والعرض والخصم',
  ],
  explanation: [
    {
      titleAr: 'العنوان في ألمانيا: الشارع أولاً ثم الرمز البريدي',
      bodyAr:
        'يُكتب العنوان بترتيب مختلف عن العربية: اسم الشارع ثم رقم المنزل، وفي السطر التالي الرمز البريدي (die Postleitzahl) ثم اسم المدينة. مثال: «Hauptstraße 12» ثم «10115 Berlin». وفي الرسالة يُكتب اسم المُرسِل في الزاوية أو على الظهر.',
    },
    {
      titleAr: 'أفعال البنك: بعضها منفصل وبعضها غير منفصل',
      bodyAr:
        '«abheben» (يسحب) و«einzahlen» (يودع) فعلان منفصلان: «Ich hebe Geld ab» و«Ich zahle Geld ein»، والبادئة تذهب إلى آخر الجملة. أما «überweisen» (يحوّل) و«verschicken» (يرسل) فغير منفصلين: «Ich überweise die Miete». وتُصاغ كل الأفعال بـ haben في الـ Perfekt: «Ich habe Geld abgehoben».',
    },
  ],
  examples: [
    { de: 'Ich hebe hundert Euro ab.', ar: 'أسحب مئة يورو.' },
    { de: 'Kann ich mit Kreditkarte bezahlen?', ar: 'هل يمكنني الدفع ببطاقة الائتمان؟' },
    { de: 'Ich brauche eine Briefmarke für diesen Brief.', ar: 'أحتاج إلى طابع بريد لهذه الرسالة.' },
    { de: 'Das Paket kommt morgen.', ar: 'يصل الطرد غداً.' },
    { de: 'Wie lautet Ihre Adresse?', ar: 'ما هو عنوانكم؟' },
  ],
  words: [
    nounNoPlural('das', 'Geld', 'المال', 'Ich habe heute kein Geld dabei.', 'ليس معي مال اليوم.'),
    noun('das', 'Konto', 'Konten', 'الحساب المصرفي', 'Ich habe ein Konto bei einer Bank.', 'لدي حساب في بنك.'),
    noun('die', 'Bank', 'Banken', 'البنك', 'Die Bank öffnet um neun Uhr.', 'يفتح البنك في الساعة التاسعة.'),
    noun('der', 'Geldautomat', 'Geldautomaten', 'ماكينة الصرف الآلي', 'Der Geldautomat funktioniert nicht.', 'ماكينة الصرف الآلي لا تعمل.'),
    nounNoPlural('das', 'Bargeld', 'النقد (المال السائل)', 'Ich zahle lieber mit Bargeld.', 'أفضّل الدفع نقداً.'),
    noun('die', 'Kreditkarte', 'Kreditkarten', 'بطاقة الائتمان', 'Nehmen Sie auch Kreditkarten?', 'هل تقبلون بطاقات الائتمان أيضاً؟'),
    noun('die', 'Münze', 'Münzen', 'العملة المعدنية', 'Haben Sie Münzen für den Automaten?', 'هل لديكم عملات معدنية للماكينة؟'),
    noun('der', 'Geldschein', 'Geldscheine', 'الورقة النقدية', 'Der Geldschein liegt auf dem Tisch.', 'الورقة النقدية على الطاولة.'),
    noun('der', 'Preis', 'Preise', 'السعر', 'Der Preis steht auf dem Schild.', 'السعر مكتوب على اللافتة.'),
    noun('das', 'Angebot', 'Angebote', 'العرض (التخفيض)', 'Diese Woche gibt es ein Angebot für Obst.', 'هذا الأسبوع يوجد عرض على الفاكهة.'),
    noun('der', 'Rabatt', 'Rabatte', 'الخصم', 'Mit der Karte bekomme ich Rabatt.', 'أحصل على خصم بهذه البطاقة.'),
    noun('die', 'Quittung', 'Quittungen', 'الإيصال', 'Kann ich bitte eine Quittung haben?', 'هل يمكنني الحصول على إيصال من فضلك؟'),
    noun('die', 'Überweisung', 'Überweisungen', 'التحويل المصرفي', 'Die Überweisung dauert zwei Tage.', 'يستغرق التحويل يومين.'),
    noun('die', 'Briefmarke', 'Briefmarken', 'طابع البريد', 'Ich brauche eine Briefmarke.', 'أحتاج إلى طابع بريد.'),
    noun('der', 'Brief', 'Briefe', 'الرسالة (الخطاب)', 'Ich schreibe einen Brief an meine Tante.', 'أكتب رسالة إلى عمّتي.'),
    noun('das', 'Paket', 'Pakete', 'الطرد', 'Das Paket ist schwer.', 'الطرد ثقيل.'),
    nounNoPlural('die', 'Post', 'مكتب البريد / البريد', 'Ich gehe heute zur Post.', 'أذهب اليوم إلى مكتب البريد.'),
    noun('die', 'Adresse', 'Adressen', 'العنوان', 'Wie ist deine Adresse?', 'ما هو عنوانك؟'),
    noun('die', 'Postleitzahl', 'Postleitzahlen', 'الرمز البريدي', 'Die Postleitzahl hat fünf Ziffern.', 'يتكوّن الرمز البريدي من خمسة أرقام.'),
    verb('abheben', 'يسحب (مالاً)', { praeteritum: 'hob', partizip: 'abgehoben', auxiliary: 'haben', separablePrefix: 'ab' }, 'Ich hebe fünfzig Euro ab.', 'أسحب خمسين يورو.'),
    verb('überweisen', 'يحوّل (مالاً)', { praeteritum: 'überwies', partizip: 'überwiesen', auxiliary: 'haben' }, 'Ich überweise die Miete am Monatsanfang.', 'أحوّل الإيجار في بداية الشهر.'),
    verb('einzahlen', 'يودع (مالاً)', { praeteritum: 'zahlte', partizip: 'eingezahlt', auxiliary: 'haben', separablePrefix: 'ein' }, 'Ich zahle Geld auf mein Konto ein.', 'أودع مالاً في حسابي.'),
    verb('verschicken', 'يرسل (بالبريد)', { praeteritum: 'verschickte', partizip: 'verschickt', auxiliary: 'haben' }, 'Ich verschicke das Paket heute.', 'أرسل الطرد اليوم.'),
    verb('wechseln', 'يصرف (عملة) / يغيّر', { praeteritum: 'wechselte', partizip: 'gewechselt', auxiliary: 'haben' }, 'Wo kann ich Geld wechseln?', 'أين يمكنني صرف العملة؟'),
  ],
  commonMistakes: [
    {
      wrong: 'Ich habe Geld abheben.',
      correct: 'Ich habe Geld abgehoben.',
      explanationAr: 'في الـ Perfekt يأتي الفعل المنفصل بصيغة Partizip II كاملة: «abgehoben»، وتقع ge- بين البادئة والجذر.',
    },
    {
      wrong: 'Ich bezahle mit der Bargeld.',
      correct: 'Ich bezahle mit Bargeld.',
      explanationAr: 'اسم المادة أو الوسيلة بعد mit يأتي هنا بلا أداة: «mit Bargeld»، «mit Karte».',
    },
  ],
  pronunciationTips: [
    {
      titleAr: 'ü في Überweisung وMünze',
      bodyAr: 'انطق «ي» طويلة مع تدوير الشفتين. لا تحوّلها إلى «و» ولا إلى «ي» خالصة.',
      example: 'Überweisung',
    },
  ],
})
