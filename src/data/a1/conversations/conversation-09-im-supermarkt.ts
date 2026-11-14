import type { Dialogue } from '@/types'

export const conversationImSupermarkt: Dialogue = {
  id: 'dialogue-a1-im-supermarkt',
  level: 'A1',
  moduleId: 'a1-m14',
  titleDe: 'Was darf es sein?',
  titleAr: 'ماذا تريد؟ عند البائعة',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Frau Berg', de: 'Guten Tag! Was darf es sein?', ar: 'نهارك سعيد! ماذا تريد؟' },
    { speaker: 'b', name: 'Herr Haddad', de: 'Guten Tag. Ich möchte ein Kilo Äpfel, bitte.', ar: 'نهارك سعيد. أريد كيلو من التفاح من فضلك.' },
    { speaker: 'a', name: 'Frau Berg', de: 'Gern. Hier sind die Äpfel. Sonst noch etwas?', ar: 'بكل سرور. هذا هو التفاح. شيء آخر؟' },
    { speaker: 'b', name: 'Herr Haddad', de: 'Ja, ich brauche noch zweihundert Gramm Käse und eine Flasche Wasser.', ar: 'نعم، أحتاج أيضاً مئتي غرام من الجبن وزجاجة ماء.' },
    { speaker: 'a', name: 'Frau Berg', de: 'Bitte sehr. Möchten Sie auch Brötchen?', ar: 'تفضّل. هل تريد خبزاً صغيراً أيضاً؟' },
    { speaker: 'b', name: 'Herr Haddad', de: 'Ja, vier Brötchen, bitte. Wie viel kostet das zusammen?', ar: 'نعم، أربع قطع من فضلك. كم يكلّف كل هذا معاً؟' },
    { speaker: 'a', name: 'Frau Berg', de: 'Das macht sieben Euro achtzig.', ar: 'المجموع سبعة يورو وثمانون سنتاً.' },
    { speaker: 'b', name: 'Herr Haddad', de: 'Hier sind zehn Euro.', ar: 'تفضّلي عشرة يورو.' },
    { speaker: 'a', name: 'Frau Berg', de: 'Und zwei Euro zwanzig zurück. Danke und einen schönen Tag!', ar: 'ويورَوان وعشرون سنتاً باقي لك. شكراً ويوماً سعيداً!' },
    { speaker: 'b', name: 'Herr Haddad', de: 'Danke, Ihnen auch. Auf Wiedersehen!', ar: 'شكراً، ولكِ أيضاً. إلى اللقاء!' },
  ],
}
