import type { Dialogue } from '@/types'

export const conversationAmInformationsschalter: Dialogue = {
  id: 'dialogue-a2-am-informationsschalter',
  level: 'A2',
  moduleId: 'a2-m09',
  titleDe: 'Am Informationsschalter',
  titleAr: 'عند شباك المعلومات في المحطة',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Mitarbeiter', de: 'Guten Tag! Wie kann ich Ihnen helfen?', ar: 'مرحبًا! كيف أستطيع مساعدتك؟' },
    { speaker: 'b', name: 'Frau Abdi', de: 'Guten Tag. Können Sie mir sagen, wann der nächste Zug nach München fährt?', ar: 'مرحبًا. هل يمكنك أن تخبرني متى يغادر القطار القادم إلى ميونيخ؟' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Der nächste Zug fährt um vierzehn Uhr zwanzig ab.', ar: 'القطار القادم ينطلق في الساعة الرابعة عشرة والدقيقة العشرين (٢:٢٠ بعد الظهر).' },
    { speaker: 'b', name: 'Frau Abdi', de: 'Wissen Sie auch, von welchem Gleis er abfährt?', ar: 'هل تعرف أيضًا من أي رصيف ينطلق؟' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Das weiß ich noch nicht genau. Das Gleis steht ungefähr zehn Minuten vorher auf der Anzeigetafel.', ar: 'لا أعرف ذلك بدقة بعد. يظهر رقم الرصيف على لوحة العرض قبل ذلك بنحو عشر دقائق.' },
    { speaker: 'b', name: 'Frau Abdi', de: 'Dann möchte ich gern wissen, ob ich im Zug einen Sitzplatz reservieren kann.', ar: 'إذن أودّ أن أعرف هل يمكنني حجز مقعد في القطار.' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Ja, das geht. Die Reservierung kostet extra.', ar: 'نعم، هذا ممكن. الحجز يكلّف مبلغًا إضافيًا.' },
    { speaker: 'b', name: 'Frau Abdi', de: 'Gut. Ich möchte auch wissen, wie lange die Fahrt dauert.', ar: 'جيد. وأريد أيضًا أن أعرف كم تستغرق الرحلة.' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Die Fahrt dauert ungefähr vier Stunden. Wenn der Zug pünktlich ist, sind Sie kurz nach achtzehn Uhr in München.', ar: 'تستغرق الرحلة نحو أربع ساعات. وإن كان القطار في موعده تصلين إلى ميونيخ بعد السادسة مساءً بقليل.' },
    { speaker: 'b', name: 'Frau Abdi', de: 'Wunderbar. Können Sie mir noch erklären, wo ich eine Fahrkarte kaufen kann?', ar: 'رائع. هل يمكنك أن تشرح لي أيضًا أين أستطيع شراء تذكرة؟' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Am Schalter links oder am Automaten neben dem Eingang.', ar: 'عند الشباك على اليسار أو عند الآلة بجانب المدخل.' },
    { speaker: 'b', name: 'Frau Abdi', de: 'Vielen Dank für Ihre Hilfe!', ar: 'شكرًا جزيلًا على مساعدتك!' },
  ],
}
