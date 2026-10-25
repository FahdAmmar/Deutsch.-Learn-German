import type { Dialogue } from '@/types'

export const conversationZahlenBitte: Dialogue = {
  id: 'dialogue-a1-zahlen-bitte',
  level: 'A1',
  moduleId: 'a1-m19',
  titleDe: 'Zahlen, bitte!',
  titleAr: 'الحساب من فضلك!',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Kellnerin', de: 'Hat es Ihnen geschmeckt?', ar: 'هل أعجبكم الطعام؟' },
    { speaker: 'b', name: 'Herr Braun', de: 'Ja, sehr gut, danke. Wir möchten bitte zahlen.', ar: 'نعم، كان لذيذًا جدًا، شكرًا. نريد أن ندفع من فضلك.' },
    { speaker: 'a', name: 'Kellnerin', de: 'Zusammen oder getrennt?', ar: 'معًا أم كلٌّ على حدة؟' },
    { speaker: 'b', name: 'Herr Braun', de: 'Zusammen, bitte.', ar: 'معًا، من فضلك.' },
    { speaker: 'a', name: 'Kellnerin', de: 'Das sind zwei Suppen, ein Schnitzel, eine Pizza und drei Getränke.', ar: 'هذه حساءان وشنيتزل وبيتزا وثلاثة مشروبات.' },
    { speaker: 'b', name: 'Herr Braun', de: 'Und was macht das zusammen?', ar: 'وكم يكون المجموع؟' },
    { speaker: 'a', name: 'Kellnerin', de: 'Das macht dreiunddreißig Euro achtzig.', ar: 'المجموع ثلاثة وثلاثون يورو وثمانون سنتًا.' },
    { speaker: 'b', name: 'Herr Braun', de: 'Hier sind vierzig Euro. Stimmt so.', ar: 'تفضّلي أربعون يورو. الباقي لكِ. (Stimmt so تعني: لا حاجة للباقي)' },
    { speaker: 'a', name: 'Kellnerin', de: 'Vielen Dank! Das ist sehr nett.', ar: 'شكرًا جزيلًا! هذا لطف كبير منكم.' },
    { speaker: 'b', name: 'Herr Braun', de: 'Gern. Auf Wiedersehen!', ar: 'على الرحب والسعة. إلى اللقاء!' },
  ],
}
