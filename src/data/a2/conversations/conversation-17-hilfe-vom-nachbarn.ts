import type { Dialogue } from '@/types'

export const conversationHilfeVomNachbarn: Dialogue = {
  id: 'dialogue-a2-hilfe-vom-nachbarn',
  level: 'A2',
  moduleId: 'a2-m16',
  titleDe: 'Eine Bitte an die Nachbarin',
  titleAr: 'طلب من الجارة',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Herr Mayer', de: 'Guten Tag, Frau Kaya. Ich habe eine Bitte an Sie.', ar: 'مرحباً سيدة كايا. عندي طلب منكِ.' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Natürlich. Was kann ich für Sie tun?', ar: 'طبعاً. ماذا يمكنني أن أفعل لكم؟' },
    { speaker: 'a', name: 'Herr Mayer', de: 'Ich fahre morgen früh weg. Könnten Sie vielleicht meine Blumen gießen?', ar: 'سأسافر غداً صباحاً. هل يمكنكِ أن تسقي زهوري؟' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Kein Problem. Wie lange sind Sie weg?', ar: 'لا مشكلة. كم مدة غيابكم؟' },
    { speaker: 'a', name: 'Herr Mayer', de: 'Nur drei Tage. Und würden Sie bitte auch die Post aus dem Briefkasten nehmen?', ar: 'ثلاثة أيام فقط. وهل تأخذين البريد من صندوق الرسائل أيضاً من فضلكِ؟' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Gern. Haben Sie einen Schlüssel für mich?', ar: 'بكل سرور. هل لديكم مفتاح لي؟' },
    { speaker: 'a', name: 'Herr Mayer', de: 'Ja, hier ist er. Vielen Dank, das ist wirklich nett von Ihnen.', ar: 'نعم، ها هو. شكراً جزيلاً، هذا لطف منكِ حقاً.' },
    { speaker: 'b', name: 'Frau Kaya', de: 'Gern geschehen. Gute Reise!', ar: 'العفو. رحلة سعيدة!' },
  ],
}
