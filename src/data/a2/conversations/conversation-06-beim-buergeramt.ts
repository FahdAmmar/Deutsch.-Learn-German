import type { Dialogue } from '@/types'

export const conversationBeimBuergeramt: Dialogue = {
  id: 'dialogue-a2-beim-buergeramt',
  level: 'A2',
  moduleId: 'a2-m13',
  titleDe: 'Beim Bürgeramt',
  titleAr: 'في مكتب شؤون المواطنين: تسجيل السكن',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Sachbearbeiterin', de: 'Guten Morgen! Wie kann ich Ihnen helfen?', ar: 'صباح الخير! كيف أستطيع مساعدتك؟' },
    { speaker: 'b', name: 'Herr Amin', de: 'Guten Morgen. Ich bin vor drei Tagen umgezogen und möchte mich anmelden.', ar: 'صباح الخير. انتقلتُ قبل ثلاثة أيام وأريد تسجيل إقامتي (Anmeldung).' },
    { speaker: 'a', name: 'Sachbearbeiterin', de: 'Das ist wichtig: In Deutschland muss man sich innerhalb von zwei Wochen anmelden.', ar: 'هذا مهم: في ألمانيا يجب تسجيل الإقامة خلال أسبوعين.' },
    { speaker: 'b', name: 'Herr Amin', de: 'Ja, das weiß ich. Welche Dokumente brauche ich?', ar: 'نعم، أعرف ذلك. ما الوثائق التي أحتاجها؟' },
    { speaker: 'a', name: 'Sachbearbeiterin', de: 'Sie brauchen Ihren Pass und die Bestätigung von Ihrem Vermieter. Haben Sie beides dabei?', ar: 'تحتاج إلى جواز سفرك وتأكيدًا من مؤجّرك. هل معك الاثنان؟' },
    { speaker: 'b', name: 'Herr Amin', de: 'Ja, hier sind sie. Ich habe auch den Mietvertrag mitgebracht.', ar: 'نعم، تفضّلي. وأحضرتُ معي عقد الإيجار أيضًا.' },
    { speaker: 'a', name: 'Sachbearbeiterin', de: 'Den Mietvertrag brauche ich nicht, aber das schadet nicht. Bitte füllen Sie dieses Formular aus.', ar: 'لا أحتاج عقد الإيجار، لكن لا ضرر في ذلك. من فضلك املأ هذا النموذج.' },
    { speaker: 'b', name: 'Herr Amin', de: 'Muss ich auch angeben, ob ich verheiratet bin?', ar: 'هل عليّ أن أذكر أيضًا إن كنتُ متزوجًا؟' },
    { speaker: 'a', name: 'Sachbearbeiterin', de: 'Ja, bitte schreiben Sie alles vollständig auf. Dann bekommen Sie Ihre Meldebescheinigung.', ar: 'نعم، اكتب كل شيء كاملًا. بعدها تحصل على شهادة تسجيل الإقامة (Meldebescheinigung).' },
    { speaker: 'b', name: 'Herr Amin', de: 'Wofür brauche ich sie?', ar: 'لأيّ غرض أحتاجها؟' },
    { speaker: 'a', name: 'Sachbearbeiterin', de: 'Zum Beispiel für ein Bankkonto oder für einen Handyvertrag.', ar: 'مثلًا لفتح حساب مصرفي أو لعقد هاتف.' },
    { speaker: 'b', name: 'Herr Amin', de: 'Verstehe. Vielen Dank für Ihre Hilfe!', ar: 'فهمت. شكرًا جزيلًا على مساعدتك!' },
  ],
}
