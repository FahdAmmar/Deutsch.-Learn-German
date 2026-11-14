import type { Dialogue } from '@/types'

export const conversationAmFahrkartenschalter: Dialogue = {
  id: 'dialogue-a1-am-fahrkartenschalter',
  level: 'A1',
  moduleId: 'a1-m21',
  titleDe: 'Am Fahrkartenschalter',
  titleAr: 'عند شباك التذاكر',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Layla', de: 'Guten Tag. Eine Fahrkarte nach Köln, bitte.', ar: 'نهارك سعيد. تذكرة إلى كولن من فضلك.' },
    { speaker: 'b', name: 'Angestellter', de: 'Guten Tag. Einfach oder hin und zurück?', ar: 'نهارك سعيد. ذهاب فقط أم ذهاب وإياب؟' },
    { speaker: 'a', name: 'Layla', de: 'Hin und zurück, bitte. Wann fährt der nächste Zug?', ar: 'ذهاب وإياب من فضلك. متى يغادر القطار التالي؟' },
    { speaker: 'b', name: 'Angestellter', de: 'Der nächste Zug fährt um zehn Uhr fünfzehn von Gleis vier ab.', ar: 'القطار التالي يغادر في العاشرة وخمس عشرة دقيقة من الرصيف الرابع.' },
    { speaker: 'a', name: 'Layla', de: 'Danke. Wie viel kostet das?', ar: 'شكراً. كم يكلّف هذا؟' },
    { speaker: 'b', name: 'Angestellter', de: 'Das macht sechsunddreißig Euro. Zahlen Sie bar oder mit Karte?', ar: 'المجموع ستة وثلاثون يورو. هل تدفعين نقداً أم بالبطاقة؟' },
    { speaker: 'a', name: 'Layla', de: 'Mit Karte, bitte. Muss ich umsteigen?', ar: 'بالبطاقة من فضلك. هل عليّ أن أغيّر القطار؟' },
    { speaker: 'b', name: 'Angestellter', de: 'Nein, der Zug fährt direkt. Er hat heute keine Verspätung.', ar: 'لا، القطار مباشر. وليس متأخراً اليوم.' },
    { speaker: 'a', name: 'Layla', de: 'Super! Wann komme ich in Köln an?', ar: 'ممتاز! متى أصل إلى كولن؟' },
    { speaker: 'b', name: 'Angestellter', de: 'Um elf Uhr fünfzehn. Gute Reise!', ar: 'في الحادية عشرة وخمس عشرة دقيقة. رحلة سعيدة!' },
  ],
}
