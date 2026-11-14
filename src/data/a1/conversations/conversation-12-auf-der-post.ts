import type { Dialogue } from '@/types'

export const conversationAufDerPost: Dialogue = {
  id: 'dialogue-a1-auf-der-post',
  level: 'A1',
  moduleId: 'a1-m21',
  titleDe: 'Auf der Post',
  titleAr: 'في مكتب البريد',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Herr Ali', de: 'Guten Tag. Ich möchte ein Paket nach Syrien schicken.', ar: 'نهارك سعيد. أريد إرسال طرد إلى سوريا.' },
    { speaker: 'b', name: 'Angestellte', de: 'Guten Tag. Wie schwer ist das Paket?', ar: 'نهارك سعيد. كم وزن الطرد؟' },
    { speaker: 'a', name: 'Herr Ali', de: 'Ich glaube, drei Kilo.', ar: 'أظن ثلاثة كيلوغرامات.' },
    { speaker: 'b', name: 'Angestellte', de: 'Legen Sie das Paket bitte hier auf die Waage.', ar: 'ضع الطرد هنا على الميزان من فضلك.' },
    { speaker: 'a', name: 'Herr Ali', de: 'So, bitte. Wie viel kostet das?', ar: 'تفضّلي. كم يكلّف هذا؟' },
    { speaker: 'b', name: 'Angestellte', de: 'Drei Kilo, das sind achtundzwanzig Euro. Möchten Sie auch Briefmarken?', ar: 'ثلاثة كيلوغرامات، هذا ثمانية وعشرون يورو. هل تريد طوابع بريد أيضاً؟' },
    { speaker: 'a', name: 'Herr Ali', de: 'Ja, zwei Briefmarken für Briefe nach Deutschland, bitte.', ar: 'نعم، طابعان لرسالتين داخل ألمانيا من فضلك.' },
    { speaker: 'b', name: 'Angestellte', de: 'Das macht zusammen neunundzwanzig Euro neunzig.', ar: 'المجموع تسعة وعشرون يورو وتسعون سنتاً.' },
    { speaker: 'a', name: 'Herr Ali', de: 'Hier sind dreißig Euro.', ar: 'تفضّلي ثلاثون يورو.' },
    { speaker: 'b', name: 'Angestellte', de: 'Danke, zehn Cent zurück. Das Paket kommt in einer Woche an.', ar: 'شكراً، عشرة سنتات باقي لك. سيصل الطرد خلال أسبوع.' },
    { speaker: 'a', name: 'Herr Ali', de: 'Vielen Dank. Auf Wiedersehen!', ar: 'شكراً جزيلاً. إلى اللقاء!' },
  ],
}
