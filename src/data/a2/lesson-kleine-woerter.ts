import type { Lesson } from '@/types'

/**
 * Small words (Modalpartikeln) that change the tone of a sentence, not its meaning: doch, mal, denn, ja, aber,
 * eigentlich. The Goethe A2 word list shows them only inside example sentences ("Geh doch mal wieder ins Kino!",
 * "Wie geht es dir denn?", "Das ist ja toll!", "Das ist aber nett von dir!"), which is exactly the level this
 * lesson aims at: understanding them in everyday speech and using the commonest ones in a friendly request. It
 * follows the lesson on polite requests, because mal and doch are what make a request sound friendly.
 */
export const lessonKleineWoerter: Lesson = {
  id: 'a2-m16-l02',
  slug: 'kleine-woerter',
  level: 'A2',
  moduleId: 'a2-m16',
  title: 'Kleine Wörter: doch, mal, denn, ja',
  titleAr: 'الكلمات الصغيرة: doch وmal وdenn وja',
  estimatedMinutes: 20,
  objectivesAr: [
    'فهم doch وmal في طلب ودّي: Komm doch mal vorbei!',
    'فهم denn في سؤال: Was ist denn los؟',
    'فهم ja وaber للتعجّب: Das ist ja toll! Das ist aber nett!',
    'معرفة أنّ هذه الكلمات تغيّر النبرة لا المعنى، ولا تُترجَم حرفياً',
  ],
  explanation: [
    {
      titleAr: 'كلمات تغيّر النبرة',
      bodyAr:
        'في الكلام اليومي تسمع كلمات صغيرة تُضاف إلى الجملة ولا تغيّر معناها الأساسي، لكنها تُظهر **الموقف**: ودّ، تعجّب، اهتمام. لا نترجمها حرفياً. وفي هذا المستوى الهدف الأول أن **تفهمها**، ثم تستعمل الأشهر منها.',
    },
    {
      titleAr: 'doch وmal: طلب ودّي',
      bodyAr:
        'مع الأمر تجعل **doch** و**mal** الطلب أخفّ وأودّ: **Komm doch mal vorbei!** (تعال لزيارتنا!). **Geh doch mal wieder ins Kino!** (اذهب إلى السينما من جديد!). و**mal** وحدها تلطّف الطلب: **Kannst du mal kurz helfen?** (هل تساعدني قليلاً؟). **Sag mal, wie spät ist es?** (قل لي، كم الساعة؟).',
    },
    {
      titleAr: 'denn: اهتمام في السؤال',
      bodyAr:
        '**denn** داخل السؤال تُظهر الاهتمام أو الاستغراب: **Wie heißt du denn?** و**Was ist denn los?** (ماذا حدث؟). وهي **ليست** denn التي تعني «لأنّ» والتي رأيتَها في درس weil وdenn؛ هنا لا تربط جملتين.',
    },
    {
      titleAr: 'ja وaber: التعجّب',
      bodyAr:
        '**ja** في وسط الجملة تدلّ على أنّ الأمر ظاهر ومفاجئ: **Das ist ja toll!** (هذا رائع حقاً!). و**aber** هنا ليست «لكن»، بل تأكيد وتعجّب: **Das ist aber nett von dir!** (هذا لطيف منك فعلاً!).',
    },
    {
      titleAr: 'eigentlich',
      bodyAr:
        '**eigentlich** تعني «في الحقيقة / بالمناسبة» وتجعل السؤال أخفّ: **Wie spät ist es eigentlich?** (كم الساعة، بالمناسبة؟).',
    },
  ],
  grammarTopics: [
    {
      id: 'gr-a2-kleine-woerter',
      slug: 'kleine-woerter',
      level: 'A2',
      titleDe: 'Kleine Wörter',
      titleAr: 'الكلمات الصغيرة ووظيفتها',
      conceptAr: 'كلمات قصيرة في وسط الجملة تحمل النبرة: ودّاً أو تعجّباً أو اهتماماً.',
      ruleAr:
        'تقف في وسط الجملة بعد الفعل ولا تغيّر ترتيبها. نفهمها من الموقف، ولا نترجمها كلمة بكلمة.',
      tables: [
        {
          caption: 'الكلمة ووظيفتها',
          headers: ['الكلمة', 'تدلّ على', 'مثال'],
          rows: [
            { label: 'doch', values: ['اقتراح ودّي', 'Komm doch mal vorbei!'] },
            { label: 'mal', values: ['تلطيف الطلب', 'Kannst du mal kurz helfen?'] },
            { label: 'denn', values: ['اهتمام في السؤال', 'Was ist denn los?'] },
            { label: 'ja', values: ['تعجّب: الأمر ظاهر', 'Das ist ja toll!'] },
            { label: 'aber', values: ['تعجّب وتأكيد', 'Das ist aber nett von dir!'] },
          ],
        },
      ],
      examples: [
        {
          de: 'Komm doch mal vorbei!',
          ar: 'تعال لزيارتنا!',
          tokens: [
            { text: 'Komm', role: 'فعل الأمر' },
            { text: 'doch mal', role: 'كلمتان تجعلان الدعوة ودّية' },
            { text: 'vorbei!', role: 'الجزء المفصول من الفعل' },
          ],
        },
        {
          de: 'Was ist denn los?',
          ar: 'ماذا حدث؟',
          tokens: [
            { text: 'Was', role: 'أداة سؤال' },
            { text: 'ist', role: 'فعل (ثانياً)' },
            { text: 'denn', role: 'اهتمام (لا تعني «لأنّ»)' },
            { text: 'los?', role: 'الخبر' },
          ],
        },
      ],
    },
  ],
  examples: [
    { de: 'Komm doch mal vorbei!', ar: 'تعال لزيارتنا!' },
    { de: 'Geh doch mal wieder ins Kino!', ar: 'اذهب إلى السينما من جديد!' },
    { de: 'Kannst du mal kurz helfen?', ar: 'هل تساعدني قليلاً؟' },
    { de: 'Sag mal, wie spät ist es?', ar: 'قل لي، كم الساعة؟' },
    { de: 'Was ist denn los?', ar: 'ماذا حدث؟' },
    { de: 'Wie heißt du denn?', ar: 'وما اسمك أنت؟' },
    { de: 'Das ist ja toll!', ar: 'هذا رائع حقاً!' },
    { de: 'Das ist aber nett von dir!', ar: 'هذا لطيف منك فعلاً!' },
  ],
  vocabulary: [
    { id: 'voc-kw-doch', word: 'doch', partOfSpeech: 'adverb', meaningAr: '(كلمة ودّ في الأمر)', level: 'A2', category: 'Kleine Wörter', example: { de: 'Komm doch mal vorbei!', ar: 'تعال لزيارتنا!' } },
    { id: 'voc-kw-mal', word: 'mal', partOfSpeech: 'adverb', meaningAr: '(كلمة تلطيف الطلب)', level: 'A2', category: 'Kleine Wörter', example: { de: 'Kannst du mal kurz helfen?', ar: 'هل تساعدني قليلاً؟' } },
    { id: 'voc-kw-denn', word: 'denn', partOfSpeech: 'adverb', meaningAr: '(كلمة اهتمام في السؤال)', level: 'A2', category: 'Kleine Wörter', example: { de: 'Was ist denn los?', ar: 'ماذا حدث؟' } },
    { id: 'voc-kw-ja', word: 'ja', partOfSpeech: 'adverb', meaningAr: '(كلمة تعجّب)', level: 'A2', category: 'Kleine Wörter', example: { de: 'Das ist ja toll!', ar: 'هذا رائع حقاً!' } },
    { id: 'voc-kw-aber', word: 'aber', partOfSpeech: 'adverb', meaningAr: '(كلمة تعجّب وتأكيد)', level: 'A2', category: 'Kleine Wörter', example: { de: 'Das ist aber nett von dir!', ar: 'هذا لطيف منك فعلاً!' } },
    { id: 'voc-kw-eigentlich', word: 'eigentlich', partOfSpeech: 'adverb', meaningAr: 'في الحقيقة / بالمناسبة', level: 'A2', category: 'Kleine Wörter', example: { de: 'Wie spät ist es eigentlich?', ar: 'كم الساعة، بالمناسبة؟' } },
  ],
  exercises: [
    {
      id: 'ex-kw-1',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'أيّ كلمة تجعل الدعوة ودّية؟',
      questionDe: 'Komm ___ mal vorbei!',
      options: ['doch', 'weil', 'dass', 'dann'],
      correctIndex: 0,
      explanationAr: 'doch + mal مع الأمر = دعوة ودّية: Komm doch mal vorbei!',
    },
    {
      id: 'ex-kw-2',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'اختر الكلمة المناسبة للتعجّب',
      questionDe: 'Das ist ___ toll!',
      options: ['ja', 'weil', 'oder', 'dass'],
      correctIndex: 0,
      explanationAr: 'ja تعبّر هنا عن التعجّب: Das ist ja toll! (هذا رائع حقاً).',
    },
    {
      id: 'ex-kw-3',
      type: 'true-false',
      level: 'A2',
      promptAr: 'صح أم خطأ؟',
      statementDe: 'In „Was ist denn los?“ ist „denn“ eine Konjunktion und bedeutet „weil“.',
      isTrue: false,
      explanationAr: 'خطأ. denn هنا كلمة اهتمام داخل السؤال، ولا تعني «لأنّ».',
    },
    {
      id: 'ex-kw-4',
      type: 'multiple-choice',
      level: 'A2',
      promptAr: 'ماذا يفعل mal في هذه الجملة؟',
      questionDe: 'Kannst du mal kurz helfen?',
      options: [
        'Es macht die Bitte freundlicher.',
        'Es bedeutet „zweimal“.',
        'Es zeigt die Vergangenheit.',
        'Es verneint den Satz.',
      ],
      correctIndex: 0,
      explanationAr: 'mal تلطّف الطلب فقط، ولا تعني «مرتين» هنا.',
      optionLanguage: 'de',
    },
    {
      id: 'ex-kw-5',
      type: 'fill-blank',
      level: 'A2',
      promptAr: 'أكمل (كلمة الاهتمام في السؤال)',
      sentenceDe: 'Was ist ___ los?',
      acceptedAnswers: ['denn'],
      hint: 'كلمة اهتمام',
      explanationAr: 'Was ist denn los? — denn تُظهر الاهتمام بما حدث.',
    },
    {
      id: 'ex-kw-6',
      type: 'ordering',
      level: 'A2',
      promptAr: 'رتّب الكلمات',
      words: ['mal', 'Komm', 'vorbei!', 'doch'],
      correctOrder: [1, 3, 0, 2],
      explanationAr: 'Komm doch mal vorbei! الفعل أولاً في الأمر، ثم doch mal، والجزء المفصول vorbei في الآخر.',
    },
    {
      id: 'ex-kw-7',
      type: 'matching',
      level: 'A2',
      promptAr: 'طابق كل كلمة بوظيفتها',
      pairs: [
        { de: 'doch', ar: 'اقتراح ودّي في الأمر' },
        { de: 'mal', ar: 'تلطيف الطلب' },
        { de: 'denn', ar: 'اهتمام في السؤال' },
        { de: 'ja', ar: 'تعجّب: الأمر ظاهر' },
      ],
      explanationAr: 'الكلمات الصغيرة تغيّر النبرة لا المعنى.',
    },
  ],
  commonMistakes: [
    {
      wrong: 'Was ist denn los? = Warum ist los?',
      correct: 'Was ist denn los? = Was ist passiert?',
      explanationAr: 'denn في السؤال ليست «لأنّ»؛ تُظهر الاهتمام فقط.',
    },
    {
      wrong: 'Komm doch mal vorbei! ← «تعال مرتين»',
      correct: 'Komm doch mal vorbei! ← «تعال لزيارتنا»',
      explanationAr: 'mal هنا ليست «مرة»؛ هي كلمة تلطيف. لا نترجم الكلمات الصغيرة كلمة بكلمة.',
    },
  ],
}
