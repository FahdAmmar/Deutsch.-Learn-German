import type { Dialogue } from '@/types'

export const conversationBeschwerdeImRestaurant: Dialogue = {
  id: 'dialogue-a2-beschwerde-im-restaurant',
  level: 'A2',
  moduleId: 'a2-m03',
  titleDe: 'Eine Beschwerde im Restaurant',
  titleAr: 'شكوى في المطعم',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Kellner', de: 'Guten Abend! Ist alles in Ordnung?', ar: 'مساء الخير! هل كل شيء على ما يرام؟' },
    { speaker: 'b', name: 'Frau Schneider', de: 'Leider nicht. Die Suppe ist kalt, und ich habe sie schon vor zwanzig Minuten bestellt.', ar: 'للأسف لا. الحساء بارد، وقد طلبته قبل عشرين دقيقة.' },
    { speaker: 'a', name: 'Kellner', de: 'Das tut mir wirklich leid. Ich bringe Ihnen sofort eine neue Suppe.', ar: 'أنا آسف حقًا. سأحضر لكِ حساءً جديدًا حالًا.' },
    { speaker: 'b', name: 'Frau Schneider', de: 'Danke. Außerdem habe ich einen Salat bestellt, aber ich habe noch keinen bekommen.', ar: 'شكرًا. وطلبتُ أيضًا سلطة، لكنني لم أستلمها بعد.' },
    { speaker: 'a', name: 'Kellner', de: 'Einen Moment, ich frage in der Küche nach, warum es so lange dauert.', ar: 'لحظة، سأسأل في المطبخ لماذا يستغرق الأمر وقتًا طويلًا.' },
    { speaker: 'b', name: 'Frau Schneider', de: 'Das ist nett. Ich muss nämlich um acht Uhr gehen, weil ich noch einen Termin habe.', ar: 'هذا لطف منك. فعليّ أن أغادر في الثامنة لأن عندي موعدًا آخر.' },
    { speaker: 'a', name: 'Kellner', de: 'Das verstehe ich. Der Salat kommt in fünf Minuten. Und das Getränk geht aufs Haus.', ar: 'أتفهّم ذلك. السلطة ستصل خلال خمس دقائق. والمشروب على حساب المطعم (aufs Haus).' },
    { speaker: 'b', name: 'Frau Schneider', de: 'Das ist sehr freundlich. Danke!', ar: 'هذا لطف كبير. شكرًا!' },
    { speaker: 'a', name: 'Kellner', de: 'Hier ist der Salat. Ich hoffe, dass er Ihnen schmeckt.', ar: 'تفضّلي السلطة. آمل أن تعجبك.' },
    { speaker: 'b', name: 'Frau Schneider', de: 'Er sieht gut aus. Und die neue Suppe ist endlich heiß!', ar: 'تبدو جيدة. والحساء الجديد ساخن أخيرًا!' },
  ],
}
