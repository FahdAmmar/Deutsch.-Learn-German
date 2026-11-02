import type { WritingTask } from '@/types'

/**
 * A1 writing tasks: short messages of two to five sentences. Patterns are written without umlauts (see
 * `WritingPoint.patterns`). The model answers use only grammar taught in A1.
 */
export const a1WritingTasks: WritingTask[] = [
  {
    id: 'a1-write-01-einladung',
    level: 'A1',
    register: 'informal',
    titleAr: 'دعوة صديق إلى عيد ميلادك',
    titleDe: 'Eine Einladung schreiben',
    situationDe:
      'Du hast am Samstag Geburtstag und möchtest eine Freundin oder einen Freund einladen. Schreibe eine kurze Nachricht.',
    situationAr:
      'يوم السبت عيد ميلادك وتريد دعوة صديقة أو صديق. اكتب رسالة قصيرة إلى شخص تخاطبه بـ du (ودّياً).',
    minWords: 25,
    points: [
      {
        id: 'when',
        textAr: 'متى الحفلة؟ اذكر اليوم أو الساعة.',
        promptDe: 'Party: Wann?',
        patterns: ['montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag', '\\d{1,2}([:.]\\d{2})? ?uhr', '\\bum \\d'],
      },
      {
        id: 'where',
        textAr: 'أين الحفلة؟',
        promptDe: 'Party: Wo?',
        patterns: ['bei mir', 'zu hause', 'wohnung', 'restaurant', 'cafe', '\\bpark\\b', 'garten'],
      },
      {
        id: 'bring',
        textAr: 'ماذا يجلب الضيف معه؟',
        promptDe: 'Essen oder Getränke: Was mitbringen?',
        patterns: ['bring', 'mitbring'],
      },
    ],
    usefulPhrases: [
      { de: 'Ich lade dich zu meiner Party ein.', ar: 'أدعوك إلى حفلتي.' },
      { de: 'Die Party ist am Samstag um 18 Uhr.', ar: 'الحفلة يوم السبت في الساعة السادسة مساءً.' },
      { de: 'Bitte bring einen Salat mit.', ar: 'أحضر معك سلطة من فضلك.' },
      { de: 'Kommst du?', ar: 'هل ستأتي؟' },
    ],
    modelAnswer:
      'Hallo Anna,\nam Samstag habe ich Geburtstag. Ich lade dich zu meiner Party ein. Sie beginnt um 18 Uhr bei mir zu Hause. Bitte bring einen Salat mit. Kommst du?\nLiebe Grüße\nTarek',
    modelAnswerAr:
      'مرحباً آنا، يوم السبت عيد ميلادي. أدعوك إلى حفلتي. تبدأ في الساعة السادسة مساءً عندي في البيت. أحضري معك سلطة من فضلك. هل ستأتين؟ تحياتي الودّية، طارق',
  },
  {
    id: 'a1-write-02-krank',
    level: 'A1',
    register: 'formal',
    titleAr: 'الاعتذار للمعلّمة عن غياب اليوم',
    titleDe: 'Eine E-Mail an die Lehrerin',
    situationDe:
      'Du kannst heute nicht zum Deutschkurs kommen. Schreibe eine kurze E-Mail an deine Lehrerin, Frau Weber.',
    situationAr:
      'لا تستطيع حضور دورة الألمانية اليوم. اكتب بريداً قصيراً إلى معلّمتك السيدة Weber، وخاطبها بـ Sie (رسمياً).',
    minWords: 25,
    points: [
      {
        id: 'sorry',
        textAr: 'اعتذر عن غيابك.',
        promptDe: 'Entschuldigung',
        patterns: ['tut mir leid', 'entschuldig', 'leider'],
      },
      {
        id: 'reason',
        textAr: 'اذكر السبب (مرض، موعد طبيب…).',
        promptDe: 'Grund: Warum?',
        patterns: ['krank', 'arzt', 'fieber', 'kopfschmerzen', 'erkaeltung', 'termin', 'problem'],
      },
      {
        id: 'again',
        textAr: 'متى ستعود إلى الدورة؟',
        promptDe: 'Wann kommst du wieder?',
        patterns: ['wieder', 'morgen', 'naechste', 'montag|dienstag|mittwoch|donnerstag|freitag'],
      },
    ],
    usefulPhrases: [
      { de: 'Ich kann heute nicht kommen.', ar: 'لا أستطيع الحضور اليوم.' },
      { de: 'Ich bin krank.', ar: 'أنا مريض.' },
      { de: 'Es tut mir leid.', ar: 'أنا آسف.' },
      { de: 'Morgen komme ich wieder.', ar: 'غداً أعود إلى الدورة.' },
      { de: 'Mit freundlichen Grüßen', ar: 'مع خالص التحية (ختام رسمي).' },
    ],
    modelAnswer:
      'Sehr geehrte Frau Weber,\nleider kann ich heute nicht zum Deutschkurs kommen. Ich bin krank und muss zum Arzt gehen. Es tut mir leid. Morgen komme ich wieder.\nMit freundlichen Grüßen\nTarek Ali',
    modelAnswerAr:
      'السيدة Weber المحترمة، للأسف لا أستطيع الحضور إلى دورة الألمانية اليوم. أنا مريض وعليّ الذهاب إلى الطبيب. أنا آسف. غداً أعود إلى الدورة. مع خالص التحية، طارق علي',
  },
  {
    id: 'a1-write-03-vorstellung',
    level: 'A1',
    register: 'informal',
    titleAr: 'تعريف بنفسك لشريك مراسلة',
    titleDe: 'Sich vorstellen',
    situationDe:
      'Du hast eine neue Brieffreundin, Lisa. Stelle dich in einer E-Mail kurz vor.',
    situationAr: 'تعرّفت على شريكة مراسلة جديدة اسمها Lisa. عرّف بنفسك في رسالة قصيرة، بصيغة du.',
    minWords: 25,
    points: [
      { id: 'name', textAr: 'ما اسمك؟', promptDe: 'Name', patterns: ['ich heisse', 'mein name'] },
      {
        id: 'origin',
        textAr: 'من أين أنت، وأين تسكن؟',
        promptDe: 'Land und Wohnort',
        patterns: ['ich komme aus', '\\bwohne\\b', '\\bleben?\\b'],
      },
      {
        id: 'hobby',
        textAr: 'ما هوايتك؟',
        promptDe: 'Hobby',
        patterns: ['hobby', 'gern', 'ich spiele', 'ich lese', 'ich schwimme', 'ich mag'],
      },
    ],
    usefulPhrases: [
      { de: 'Ich heiße Tarek.', ar: 'اسمي طارق.' },
      { de: 'Ich komme aus Jordanien.', ar: 'أنا من الأردن.' },
      { de: 'Ich wohne in Berlin.', ar: 'أسكن في برلين.' },
      { de: 'Mein Hobby ist Fußball.', ar: 'هوايتي كرة القدم.' },
      { de: 'Und du?', ar: 'وأنتِ؟' },
    ],
    modelAnswer:
      'Hallo Lisa,\nich heiße Tarek. Ich komme aus Jordanien und wohne jetzt in Berlin. Ich bin 28 Jahre alt. Mein Hobby ist Fußball. Ich spiele gern am Wochenende. Und du?\nViele Grüße\nTarek',
    modelAnswerAr:
      'مرحباً ليزا، اسمي طارق. أنا من الأردن وأسكن الآن في برلين. عمري 28 سنة. هوايتي كرة القدم، ألعبها بسرور في عطلة نهاية الأسبوع. وأنتِ؟ تحياتي، طارق',
  },
  {
    id: 'a1-write-04-postkarte',
    level: 'A1',
    register: 'informal',
    titleAr: 'بطاقة بريدية من العطلة',
    titleDe: 'Eine Postkarte aus dem Urlaub',
    situationDe: 'Du bist im Urlaub. Schreibe eine Postkarte an eine Freundin.',
    situationAr: 'أنت في عطلة. اكتب بطاقة بريدية إلى صديقة، بصيغة du.',
    minWords: 25,
    points: [
      {
        id: 'place',
        textAr: 'أين أنت؟',
        promptDe: 'Wo bist du?',
        patterns: ['ich bin (in|im|am)', 'gruesse aus', 'hier in', '\\burlaub in\\b'],
      },
      {
        id: 'weather',
        textAr: 'كيف الطقس؟',
        promptDe: 'Wetter',
        patterns: ['wetter', 'sonne', 'sonnig', 'regen', 'warm', 'kalt', 'heiss'],
      },
      {
        id: 'activity',
        textAr: 'ماذا تفعل هناك؟',
        promptDe: 'Was machst du?',
        patterns: ['schwimm', 'besuch', 'ich gehe', 'ich esse', 'ich mache', 'ich fahre', 'spazier', 'besichtig'],
      },
    ],
    usefulPhrases: [
      { de: 'Viele Grüße aus Barcelona!', ar: 'تحية كثيرة من برشلونة!' },
      { de: 'Das Wetter ist super.', ar: 'الطقس رائع.' },
      { de: 'Ich schwimme jeden Tag im Meer.', ar: 'أسبح في البحر كل يوم.' },
      { de: 'Bis bald!', ar: 'إلى اللقاء قريباً!' },
    ],
    modelAnswer:
      'Liebe Anna,\nviele Grüße aus Barcelona! Das Wetter ist super, die Sonne scheint jeden Tag. Ich gehe oft zum Strand und schwimme im Meer. Das Essen ist sehr lecker.\nBis bald\nTarek',
    modelAnswerAr:
      'عزيزتي آنا، تحية كثيرة من برشلونة! الطقس رائع والشمس مشرقة كل يوم. أذهب كثيراً إلى الشاطئ وأسبح في البحر. والأكل لذيذ جداً. إلى اللقاء قريباً، طارق',
  },
]
