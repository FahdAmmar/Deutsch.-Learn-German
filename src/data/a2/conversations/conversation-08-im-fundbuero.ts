import type { Dialogue } from '@/types'

export const conversationImFundbuero: Dialogue = {
  id: 'dialogue-a2-im-fundbuero',
  level: 'A2',
  moduleId: 'a2-m06',
  titleDe: 'Im Fundbüro',
  titleAr: 'في مكتب المفقودات',
  register: 'formal',
  lines: [
    { speaker: 'a', name: 'Mitarbeiter', de: 'Guten Tag. Was kann ich für Sie tun?', ar: 'مرحبًا. ماذا أستطيع أن أفعل لك؟' },
    { speaker: 'b', name: 'Herr Nasser', de: 'Guten Tag. Ich habe gestern im Bus die Tasche meiner Schwester verloren.', ar: 'مرحبًا. فقدتُ أمس في الحافلة حقيبة أختي.' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Das tut mir leid. Wie sieht die Tasche aus?', ar: 'يؤسفني ذلك. كيف تبدو الحقيبة؟' },
    { speaker: 'b', name: 'Herr Nasser', de: 'Sie ist braun und aus Leder. Der Griff der Tasche ist kaputt.', ar: 'إنها بنّية ومن الجلد. ومقبض الحقيبة مكسور.' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Und was war in der Tasche?', ar: 'وماذا كان في الحقيبة؟' },
    { speaker: 'b', name: 'Herr Nasser', de: 'Ein Portemonnaie, ein Schlüssel und das Handy meiner Schwester.', ar: 'محفظة ومفتاح وهاتف أختي.' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Ich schaue nach. Gestern hat der Fahrer des Busses eine braune Tasche abgegeben.', ar: 'سأبحث. أمس سلّم سائق الحافلة حقيبة بنّية.' },
    { speaker: 'b', name: 'Herr Nasser', de: 'Wirklich? Das ist wunderbar!', ar: 'حقًا؟ هذا رائع!' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Bitte zeigen Sie mir Ihren Ausweis. Dann brauche ich noch den Namen der Besitzerin.', ar: 'من فضلك أرني هويتك. ثم أحتاج إلى اسم صاحبة الحقيبة.' },
    { speaker: 'b', name: 'Herr Nasser', de: 'Sie heißt Samira Haddad. Das ist der Name meiner Schwester.', ar: 'اسمها سميرة حداد. هذا هو اسم أختي.' },
    { speaker: 'a', name: 'Mitarbeiter', de: 'Gut, das stimmt. Hier ist die Tasche.', ar: 'جيد، هذا صحيح. تفضّل الحقيبة.' },
    { speaker: 'b', name: 'Herr Nasser', de: 'Vielen Dank! Die Freude meiner Schwester wird groß sein.', ar: 'شكرًا جزيلًا! ستكون فرحة أختي كبيرة.' },
  ],
}
