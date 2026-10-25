import type { Dialogue } from '@/types'

export const conversationBeimFriseur: Dialogue = {
  id: 'dialogue-a2-beim-friseur',
  level: 'A2',
  moduleId: 'a2-m01',
  titleDe: 'Beim Friseur',
  titleAr: 'عند الحلاق',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Friseurin', de: 'Guten Tag! Haben Sie einen Termin?', ar: 'مرحبًا! هل عندك موعد؟' },
    { speaker: 'b', name: 'Herr Demir', de: 'Ja, ich habe um zehn Uhr einen Termin. Mein Name ist Demir.', ar: 'نعم، عندي موعد في العاشرة. اسمي ديمير.' },
    { speaker: 'a', name: 'Friseurin', de: 'Richtig. Nehmen Sie bitte Platz. Was darf es heute sein?', ar: 'صحيح. تفضّل بالجلوس. ماذا تحب أن نفعل اليوم؟' },
    { speaker: 'b', name: 'Herr Demir', de: 'Meine Haare sind mir zu lang. Ich möchte sie kürzer haben, aber nicht zu kurz.', ar: 'شعري طويل جدًا بالنسبة لي. أريده أقصر، لكن ليس قصيرًا جدًا.' },
    { speaker: 'a', name: 'Friseurin', de: 'Wie viele Zentimeter soll ich abschneiden? Drei oder vier?', ar: 'كم سنتيمترًا أقصّ؟ ثلاثة أم أربعة؟' },
    { speaker: 'b', name: 'Herr Demir', de: 'Vier Zentimeter, bitte. An den Seiten darf es etwas kürzer sein.', ar: 'أربعة سنتيمترات من فضلك. على الجانبين يمكن أن يكون أقصر قليلًا.' },
    { speaker: 'a', name: 'Friseurin', de: 'Gut. Soll ich die Haare zuerst waschen?', ar: 'حسنًا. هل أغسل الشعر أولًا؟' },
    { speaker: 'b', name: 'Herr Demir', de: 'Ja, bitte.', ar: 'نعم، من فضلك.' },
    { speaker: 'a', name: 'Friseurin', de: 'So, fertig! Wie gefällt es Ihnen?', ar: 'تمّ! كيف يعجبك؟' },
    { speaker: 'b', name: 'Herr Demir', de: 'Sehr gut, danke! Was kostet das?', ar: 'ممتاز، شكرًا! كم الثمن؟' },
    { speaker: 'a', name: 'Friseurin', de: 'Waschen und Schneiden kostet fünfunddreißig Euro.', ar: 'الغسل والقص يكلّفان خمسة وثلاثين يورو.' },
    { speaker: 'b', name: 'Herr Demir', de: 'Hier sind vierzig. Der Rest ist für Sie. Auf Wiedersehen!', ar: 'تفضّلي أربعين. الباقي لكِ. إلى اللقاء!' },
  ],
}
