import type { Lesson } from '@/types'

import { adjective, defineTheme, noun, phrase, verb } from './builders'

export const lessonAussehen: Lesson = defineTheme({
  number: 6,
  slug: 'aussehen',
  title: 'Aussehen',
  titleAr: 'وصف المظهر',
  categoryAr: 'وصف المظهر',
  objectivesAr: [
    'وصف شخص: Er ist groß. Sie hat lange Haare.',
    'التفريق بين sein للصفة وhaben للأجزاء: Er ist jung / Er hat einen Bart',
    'السؤال: Wie sieht er aus؟',
  ],
  explanation: [
    {
      titleAr: 'sein للصفة وhaben للجزء',
      bodyAr:
        'نصف الحال بـ **sein** + صفة: **Er ist groß. Sie ist jung. Mein Vater ist alt.** وننسب الأجزاء بـ **haben**: **Er hat einen Bart. Sie hat eine Brille. Ich habe kurze Haare.** لاحظ أن الصفة بعد sein لا تتغيّر، أما قبل الاسم (kurze Haare) فتأخذ نهاية، وسنتعلم ذلك في A2: احفظ العبارات الآن كما هي.',
    },
    {
      titleAr: 'Wie sieht er aus؟',
      bodyAr:
        'للسؤال عن المظهر نقول **Wie sieht er aus؟** / **Wie sieht sie aus؟** (كيف يبدو؟). والفعل **aussehen** منفصل ويتغيّر فيه e إلى ie: **er sieht … aus**. الجواب: **Er sieht jung aus.** (يبدو شاباً) أو **Er ist groß und schlank.**',
    },
    {
      titleAr: 'groß وklein مع الأشخاص',
      bodyAr:
        'نستعمل **groß** و**klein** للطول: **Mein Bruder ist groß.** (أخي طويل). وبالألمانية لا نقول "طويل" بكلمة مستقلة في الحديث البسيط، فنستعمل **groß** (كبير / طويل). وللعمر نستعمل **jung** و**alt**.',
    },
  ],
  examples: [
    { de: 'Wie sieht dein Bruder aus?', ar: 'كيف يبدو أخوك؟' },
    { de: 'Er ist groß und schlank.', ar: 'هو طويل ونحيف.' },
    { de: 'Er hat kurze Haare und einen Bart.', ar: 'له شعر قصير ولحية.' },
    { de: 'Meine Schwester ist jung und hübsch.', ar: 'أختي شابة وجميلة.' },
    { de: 'Sie hat lange blonde Haare.', ar: 'لها شعر أشقر طويل.' },
    { de: 'Mein Großvater ist alt, aber er sieht jung aus.', ar: 'جدي كبير في السن لكنه يبدو شاباً.' },
    { de: 'Er trägt eine Brille.', ar: 'هو يضع نظارة.' },
    { de: 'Ich habe dunkle Haare.', ar: 'عندي شعر داكن.' },
  ],
  words: [
    noun('das', 'Haar', 'Haare', 'الشعر', 'Sie hat lange Haare.', 'لها شعر طويل.'),
    noun('die', 'Brille', 'Brillen', 'النظارة', 'Er trägt eine Brille.', 'هو يضع نظارة.'),
    noun('der', 'Bart', 'Bärte', 'اللحية', 'Mein Onkel hat einen Bart.', 'عمّي له لحية.'),
    noun('das', 'Gesicht', 'Gesichter', 'الوجه', 'Sie hat ein freundliches Gesicht.', 'لها وجه ودود.'),
    verb(
      'aussehen',
      'يبدو',
      { present: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'], praeteritum: 'sah', partizip: 'ausgesehen', auxiliary: 'haben', separablePrefix: 'aus' },
      'Du siehst müde aus.',
      'تبدو متعباً.',
    ),
    adjective('groß', 'كبير / طويل', 'Mein Bruder ist groß.', 'أخي طويل.'),
    adjective('klein', 'صغير / قصير', 'Meine Tante ist klein.', 'خالتي قصيرة.'),
    adjective('jung', 'شاب / صغير في السن', 'Meine Schwester ist jung.', 'أختي شابة.'),
    adjective('alt', 'كبير في السن / قديم', 'Mein Großvater ist alt.', 'جدي كبير في السن.'),
    adjective('schlank', 'نحيف / رشيق', 'Sie ist groß und schlank.', 'هي طويلة ورشيقة.'),
    adjective('hübsch', 'جميل / لطيف المظهر', 'Das Mädchen ist hübsch.', 'الفتاة جميلة.'),
    adjective('blond', 'أشقر', 'Sie hat blonde Haare.', 'لها شعر أشقر.'),
    adjective('lang', 'طويل (غير الطول الجسدي)', 'Seine Haare sind lang.', 'شعره طويل.'),
    adjective('kurz', 'قصير', 'Ich habe kurze Haare.', 'شعري قصير.'),
    adjective('dunkel', 'داكن', 'Er hat dunkle Haare.', 'له شعر داكن.'),
    phrase('Wie sieht er aus?', 'كيف يبدو؟', 'Wie sieht er aus? Er ist groß und schlank.', 'كيف يبدو؟ هو طويل ونحيف.'),
  ],
  commonMistakes: [
    {
      wrong: 'Er hat groß.',
      correct: 'Er ist groß.',
      explanationAr: 'الصفة تأتي بعد sein، وليس بعد haben: Er ist groß.',
    },
    {
      wrong: 'Er sieht aus müde.',
      correct: 'Er sieht müde aus.',
      explanationAr: 'aussehen فعل منفصل: البادئة aus في آخر الجملة، والصفة قبلها.',
    },
  ],
})
