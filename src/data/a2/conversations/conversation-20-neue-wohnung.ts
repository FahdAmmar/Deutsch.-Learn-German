import type { Dialogue } from '@/types'

export const conversationNeueWohnung: Dialogue = {
  id: 'dialogue-a2-neue-wohnung',
  level: 'A2',
  moduleId: 'a2-m19',
  titleDe: 'Wie gefällt dir die Wohnung?',
  titleAr: 'كيف تعجبك الشقة؟',
  register: 'informal',
  lines: [
    { speaker: 'a', name: 'Sara', de: 'Wow, die Wohnung gefällt mir sehr! Seit wann wohnst du hier?', ar: 'واو، الشقة تعجبني كثيراً! منذ متى تسكن هنا؟' },
    { speaker: 'b', name: 'Jonas', de: 'Seit zwei Wochen. Das Sofa gehört meiner Schwester, aber es passt gut ins Wohnzimmer.', ar: 'منذ أسبوعين. الأريكة لأختي لكنها تناسب غرفة المعيشة جيداً.' },
    { speaker: 'a', name: 'Sara', de: 'Das Sofa gefällt mir auch. Wem gehört der Sessel?', ar: 'الأريكة تعجبني أيضاً. لمن هذا المقعد؟' },
    { speaker: 'b', name: 'Jonas', de: 'Der Sessel gehört mir. Möchtest du einen Kaffee? Schmeckt dir Kaffee mit Milch?', ar: 'المقعد لي. هل تريدين قهوة؟ هل تعجبك القهوة بالحليب؟' },
    { speaker: 'a', name: 'Sara', de: 'Ja, gern, danke. Kennst du schon die Nachbarn?', ar: 'نعم، بكل سرور، شكراً. هل تعرف الجيران بعد؟' },
    { speaker: 'b', name: 'Jonas', de: 'Ich kenne die Nachbarin von unten. Sie ist sehr freundlich, aber ich weiß nicht, wie sie heißt.', ar: 'أعرف الجارة التي في الأسفل. هي ودودة جداً لكنني لا أعرف ما اسمها.' },
    { speaker: 'a', name: 'Sara', de: 'Das ist kein Problem. Du kannst ihr einen Brief schreiben und dich vorstellen.', ar: 'ليست مشكلة. يمكنك أن تكتب لها رسالة وتعرّف بنفسك.' },
    { speaker: 'b', name: 'Jonas', de: 'Gute Idee! Ich zeige ihr die Wohnung und lade sie zum Kaffee ein.', ar: 'فكرة جيدة! سأُريها الشقة وأدعوها إلى القهوة.' },
    { speaker: 'a', name: 'Sara', de: 'Mir ist ein bisschen kalt. Kannst du das Fenster schließen?', ar: 'أشعر ببعض البرد. هل يمكنك إغلاق النافذة؟' },
    { speaker: 'b', name: 'Jonas', de: 'Natürlich. Ich gebe dir auch eine Jacke, sie liegt auf dem Sofa.', ar: 'طبعاً. وسأعطيك سترة أيضاً، هي على الأريكة.' },
  ],
}
