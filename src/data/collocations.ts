import type { CEFRLevel } from '@/types'

/**
 * Verb + noun combinations where the German verb is not the one an Arabic speaker (or a dictionary) would
 * pick: "التقط صورة" is `ein Foto machen`, not `nehmen`. Each entry names the verb that belongs, the verb a
 * learner is most likely to reach for instead, and two more that are wrong in this meaning.
 *
 * Content only. The wrong verbs are chosen so that none of them makes a correct German phrase in the
 * sense given; where another verb is also heard (einen Termin machen), the note says so and that verb is
 * kept out of the options. A test checks that every option list has four distinct verbs.
 */
export interface Collocation {
  id: string
  level: Extract<CEFRLevel, 'A1' | 'A2'>
  /** The noun phrase without the verb, as it stands in the phrase: "ein Foto", "die Zähne". */
  object: string
  /** The verb that belongs, in the infinitive. */
  verb: string
  /** What the Arabic-speaking learner tends to say instead. Never a correct choice in this meaning. */
  wrongVerb: string
  /** Two more wrong verbs, for the question's options. */
  distractors: readonly [string, string]
  /** The phrase as it is learned: the object and the verb ("ein Foto machen"). */
  phrase: string
  meaningAr: string
  noteAr?: string
  example: { de: string; ar: string }
}

export const COLLOCATIONS: readonly Collocation[] = [
  {
    id: 'foto-machen',
    level: 'A1',
    object: 'ein Foto',
    verb: 'machen',
    wrongVerb: 'nehmen',
    distractors: ['schreiben', 'stellen'],
    phrase: 'ein Foto machen',
    meaningAr: 'التقط صورة',
    noteAr: 'بالعربية «أخذ صورة»، لكن بالألمانية machen وليس nehmen.',
    example: { de: 'Ich mache ein Foto von dir.', ar: 'ألتقط لك صورة.' },
  },
  {
    id: 'frage-stellen',
    level: 'A1',
    object: 'eine Frage',
    verb: 'stellen',
    wrongVerb: 'machen',
    distractors: ['legen', 'bringen'],
    phrase: 'eine Frage stellen',
    meaningAr: 'طرح سؤالاً',
    noteAr: 'السؤال «يُوضَع» بالألمانية: stellen. أما fragen فهو فعل بمفرده: Ich frage dich.',
    example: { de: 'Darf ich eine Frage stellen?', ar: 'هل يمكنني أن أطرح سؤالاً؟' },
  },
  {
    id: 'hausaufgaben-machen',
    level: 'A1',
    object: 'Hausaufgaben',
    verb: 'machen',
    wrongVerb: 'schreiben',
    distractors: ['nehmen', 'sagen'],
    phrase: 'Hausaufgaben machen',
    meaningAr: 'أنجز الواجب المنزلي',
    noteAr: 'الواجب «يُصنَع» (machen) حتى لو كان كتابةً.',
    example: { de: 'Ich mache jeden Tag meine Hausaufgaben.', ar: 'أنجز واجباتي المنزلية كل يوم.' },
  },
  {
    id: 'pause-machen',
    level: 'A1',
    object: 'eine Pause',
    verb: 'machen',
    wrongVerb: 'nehmen',
    distractors: ['tragen', 'bauen'],
    phrase: 'eine Pause machen',
    meaningAr: 'أخذ استراحة',
    noteAr: 'الاستراحة تُصنَع (machen) ولا تُؤخَذ (nehmen).',
    example: { de: 'Wir machen jetzt eine Pause.', ar: 'نأخذ الآن استراحة.' },
  },
  {
    id: 'bus-nehmen',
    level: 'A1',
    object: 'den Bus',
    verb: 'nehmen',
    wrongVerb: 'fahren',
    distractors: ['gehen', 'laufen'],
    phrase: 'den Bus nehmen',
    meaningAr: 'استقلّ الحافلة',
    noteAr: 'الراكب «يأخذ» الحافلة. ويمكن أن تقول أيضاً: mit dem Bus fahren. أما «den Bus fahren» فهي لمن يقود الحافلة.',
    example: { de: 'Ich nehme den Bus zur Arbeit.', ar: 'أستقلّ الحافلة إلى العمل.' },
  },
  {
    id: 'auto-fahren',
    level: 'A1',
    object: 'Auto',
    verb: 'fahren',
    wrongVerb: 'führen',
    distractors: ['gehen', 'laufen'],
    phrase: 'Auto fahren',
    meaningAr: 'قاد سيارة',
    noteAr: 'القيادة بالألمانية fahren، وفعل führen يعني «يقود» بمعنى «يتزعّم» أو «يرشد».',
    example: { de: 'Kannst du Auto fahren?', ar: 'هل تستطيع قيادة السيارة؟' },
  },
  {
    id: 'zaehne-putzen',
    level: 'A2',
    object: 'die Zähne',
    verb: 'putzen',
    wrongVerb: 'waschen',
    distractors: ['machen', 'kämmen'],
    phrase: 'die Zähne putzen',
    meaningAr: 'نظّف أسنانه بالفرشاة',
    noteAr: 'الأسنان تُنظَّف (putzen) ولا تُغسَل. والشعر هو الذي يُغسَل: die Haare waschen.',
    example: { de: 'Ich putze mir jeden Morgen die Zähne.', ar: 'أنظّف أسناني كل صباح.' },
  },
  {
    id: 'termin-vereinbaren',
    level: 'A2',
    object: 'einen Termin',
    verb: 'vereinbaren',
    wrongVerb: 'nehmen',
    distractors: ['bauen', 'lesen'],
    phrase: 'einen Termin vereinbaren',
    meaningAr: 'حدّد موعداً',
    noteAr: 'تسمع في المحادثة أيضاً: einen Termin machen. أما «einen Termin nehmen» فليست ألمانية.',
    example: { de: 'Ich möchte einen Termin vereinbaren.', ar: 'أودّ أن أحدّد موعداً.' },
  },
  {
    id: 'geld-abheben',
    level: 'A2',
    object: 'Geld',
    verb: 'abheben',
    wrongVerb: 'ziehen',
    distractors: ['legen', 'schreiben'],
    phrase: 'Geld abheben',
    meaningAr: 'سحب نقوداً من البنك',
    noteAr: 'فعل منفصل: Ich hebe Geld ab. وتُسحَب النقود من الصرّاف الآلي: am Geldautomaten.',
    example: { de: 'Ich hebe Geld am Automaten ab.', ar: 'أسحب نقوداً من الصرّاف الآلي.' },
  },
  {
    id: 'spaziergang-machen',
    level: 'A2',
    object: 'einen Spaziergang',
    verb: 'machen',
    wrongVerb: 'gehen',
    distractors: ['laufen', 'fahren'],
    phrase: 'einen Spaziergang machen',
    meaningAr: 'قام بنزهة على الأقدام',
    noteAr: 'النزهة «تُصنَع». وهناك تعبير آخر: spazieren gehen، وفيه gehen مع الفعل spazieren لا مع الاسم.',
    example: { de: 'Am Sonntag machen wir einen Spaziergang im Park.', ar: 'يوم الأحد نتنزّه في الحديقة.' },
  },
  {
    id: 'ausflug-machen',
    level: 'A2',
    object: 'einen Ausflug',
    verb: 'machen',
    wrongVerb: 'gehen',
    distractors: ['laufen', 'nehmen'],
    phrase: 'einen Ausflug machen',
    meaningAr: 'قام برحلة قصيرة',
    example: { de: 'Am Samstag machen wir einen Ausflug.', ar: 'يوم السبت نقوم برحلة قصيرة.' },
  },
  {
    id: 'tisch-decken',
    level: 'A2',
    object: 'den Tisch',
    verb: 'decken',
    wrongVerb: 'machen',
    distractors: ['legen', 'stellen'],
    phrase: 'den Tisch decken',
    meaningAr: 'أعدّ المائدة للأكل',
    noteAr: 'المائدة «تُغطَّى» (decken) بالصحون والأدوات قبل الأكل.',
    example: { de: 'Kannst du bitte den Tisch decken?', ar: 'هل يمكنك أن تُعِدّ المائدة من فضلك؟' },
  },
  {
    id: 'bett-machen',
    level: 'A2',
    object: 'das Bett',
    verb: 'machen',
    wrongVerb: 'aufräumen',
    distractors: ['ordnen', 'waschen'],
    phrase: 'das Bett machen',
    meaningAr: 'رتّب السرير',
    noteAr: 'السرير يُصنَع (machen) كل صباح. وaufräumen تُستعمل للغرفة وللأشياء: das Zimmer aufräumen.',
    example: { de: 'Ich mache jeden Morgen das Bett.', ar: 'أرتّب السرير كل صباح.' },
  },
  {
    id: 'geschichte-erzaehlen',
    level: 'A2',
    object: 'eine Geschichte',
    verb: 'erzählen',
    wrongVerb: 'sagen',
    distractors: ['sprechen', 'reden'],
    phrase: 'eine Geschichte erzählen',
    meaningAr: 'حكى قصة',
    noteAr: 'القصة تُحكى (erzählen) ولا تُقال (sagen).',
    example: { de: 'Der Opa erzählt den Kindern eine Geschichte.', ar: 'الجدّ يحكي للأطفال قصة.' },
  },
  {
    id: 'wahrheit-sagen',
    level: 'A2',
    object: 'die Wahrheit',
    verb: 'sagen',
    wrongVerb: 'sprechen',
    distractors: ['reden', 'rufen'],
    phrase: 'die Wahrheit sagen',
    meaningAr: 'قال الحقيقة',
    noteAr: 'الحقيقة تُقال (sagen). أما sprechen فيأتي مع اللغات: Deutsch sprechen.',
    example: { de: 'Bitte sag mir die Wahrheit.', ar: 'من فضلك قل لي الحقيقة.' },
  },
  {
    id: 'kurs-besuchen',
    level: 'A2',
    object: 'einen Kurs',
    verb: 'besuchen',
    wrongVerb: 'gehen',
    distractors: ['fahren', 'kommen'],
    phrase: 'einen Kurs besuchen',
    meaningAr: 'حضر دورة دراسية',
    noteAr: 'الدورة «تُزار» (besuchen). وتسمع أيضاً: einen Kurs machen.',
    example: { de: 'Ich besuche einen Deutschkurs.', ar: 'أحضر دورة لغة ألمانية.' },
  },
  {
    id: 'problem-loesen',
    level: 'A2',
    object: 'ein Problem',
    verb: 'lösen',
    wrongVerb: 'machen',
    distractors: ['öffnen', 'bringen'],
    phrase: 'ein Problem lösen',
    meaningAr: 'حلّ مشكلة',
    example: { de: 'Wir lösen das Problem zusammen.', ar: 'نحلّ المشكلة معاً.' },
  },
]
