import type { Dialogue } from '@/types'

export const conversationImDeutschkurs: Dialogue = {
  id: 'dialogue-a1-im-deutschkurs',
  level: 'A1',
  moduleId: 'a1-m01',
  titleDe: 'Wie bitte?',
  titleAr: 'عفواً؟ في حصة الألمانية',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Frau Klein', de: 'Guten Morgen, Layla! Wie geht es Ihnen?', ar: 'صباح الخير يا ليلى! كيف حالك؟' },
    { speaker: 'b', name: 'Layla', de: 'Guten Morgen, Frau Klein. Gut, danke. Und Ihnen?', ar: 'صباح الخير يا سيدة كلاين. بخير، شكراً. وأنتِ؟' },
    { speaker: 'a', name: 'Frau Klein', de: 'Auch gut, danke. Öffnen Sie bitte das Buch auf Seite zehn.', ar: 'بخير أيضاً، شكراً. افتحي الكتاب على الصفحة العاشرة من فضلك.' },
    { speaker: 'b', name: 'Layla', de: 'Wie bitte? Können Sie das bitte wiederholen?', ar: 'عفواً؟ هل يمكنك أن تعيدي هذا من فضلك؟' },
    { speaker: 'a', name: 'Frau Klein', de: 'Gern. Öffnen Sie das Buch auf Seite zehn.', ar: 'بكل سرور. افتحي الكتاب على الصفحة العاشرة.' },
    { speaker: 'b', name: 'Layla', de: 'Danke. Entschuldigung, ich habe eine Frage. Was bedeutet das Wort „Feierabend“?', ar: 'شكراً. المعذرة، عندي سؤال. ما معنى كلمة «Feierabend»؟' },
    { speaker: 'a', name: 'Frau Klein', de: 'Das ist die Zeit nach der Arbeit. Dann ist die Arbeit zu Ende.', ar: 'هو الوقت بعد العمل. حينها ينتهي العمل.' },
    { speaker: 'b', name: 'Layla', de: 'Ah, ich verstehe. Wie schreibt man das?', ar: 'آه، فهمت. كيف تُكتب هذه الكلمة؟' },
    { speaker: 'a', name: 'Frau Klein', de: 'F, E, I, E, R, A, B, E, N, D. Und jetzt lesen Sie bitte den Text.', ar: 'F وE وI وE وR وA وB وE وN وD. والآن اقرئي النص من فضلك.' },
    { speaker: 'b', name: 'Layla', de: 'Langsamer, bitte. Ich lese noch nicht so schnell.', ar: 'أبطأ من فضلك. لا أقرأ بسرعة بعد.' },
  ],
}
