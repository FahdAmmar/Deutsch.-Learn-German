/**
 * What a learner can practise saying aloud. Each item is a German text for the recogniser to compare with
 * what was said; the note names the sound that matters in it. Minimal pairs are listed as the two words
 * together, so the recogniser has to tell them apart.
 */
export interface PronunciationItem {
  id: string
  text: string
  /** The sound to watch, in Arabic. */
  noteAr?: string
}

export interface PronunciationGroup {
  id: string
  titleAr: string
  descriptionAr: string
  items: readonly PronunciationItem[]
}

export const PRONUNCIATION_GROUPS: readonly PronunciationGroup[] = [
  {
    id: 'pairs',
    titleAr: 'أزواج الأصوات المتقاربة',
    descriptionAr: 'كلمتان لا يفرق بينهما إلا صوت واحد. الفرق هو ما يجعل المستمع يفهمك.',
    items: [
      { id: 'schon-schoen', text: 'schon schön', noteAr: 'ö: انطق e مغلقة وشفتاك مدوّرتان. في schon تأتي o عادية.' },
      { id: 'tor-tuer', text: 'Tor Tür', noteAr: 'ü: انطق «ي» ثم دوّر شفتيك دون أن تحرّك لسانك.' },
      { id: 'pass-bass', text: 'Pass Bass', noteAr: 'P يخرج معه نَفَس (جرّبه أمام كفّك)، وB بلا نَفَس.' },
      { id: 'wir-vier', text: 'wir vier', noteAr: 'W تُنطق /v/ وV تُنطق /f/: wir ≠ vier.' },
      { id: 'wein-wien', text: 'Wein Wien', noteAr: 'ei تُنطق «آي»، وie «ي» طويلة.' },
      { id: 'miete-mitte', text: 'Miete Mitte', noteAr: 'ie طويلة، وi في Mitte قصيرة.' },
      { id: 'ich-ach', text: 'ich ach', noteAr: 'ch في ich ناعمة، وفي ach قريبة من «خ».' },
      { id: 'buch-buecher', text: 'Buch Bücher', noteAr: 'ch تتحوّل من «خ» في Buch إلى الناعمة في Bücher.' },
    ],
  },
  {
    id: 'words',
    titleAr: 'كلمات فيها أصوات صعبة',
    descriptionAr: 'حروف ساكنة متتالية، وأصوات لا مثيل لها في العربية.',
    items: [
      { id: 'strasse', text: 'Straße', noteAr: 'ثلاثة ساكنة في البداية: Str. لا تُدخل حركة بينها.' },
      { id: 'schreiben', text: 'schreiben', noteAr: 'Schr في البداية، وei «آي».' },
      { id: 'pflanze', text: 'Pflanze', noteAr: 'Pf: اجمع P وF في نفَس واحد.' },
      { id: 'zwei', text: 'zwei', noteAr: 'Zw: Z تُنطق «تس».' },
      { id: 'geschwister', text: 'Geschwister', noteAr: 'sch وw: Schw = «شف».' },
      { id: 'maedchen', text: 'Mädchen', noteAr: 'ä «إيه» مفتوحة، وch ناعمة بعد n.' },
      { id: 'fruehstueck', text: 'Frühstück', noteAr: 'ü مرّتان، وst في الوسط تُنطق «شت» عند بدايتها.' },
      { id: 'woerterbuch', text: 'Wörterbuch', noteAr: 'ö ثم ch بـ «خ» بعد u.' },
      { id: 'entschuldigung', text: 'Entschuldigung', noteAr: 'tsch في الوسط، وung تنتهي بـ ng الأنفية.' },
    ],
  },
  {
    id: 'sentences',
    titleAr: 'جمل يومية',
    descriptionAr: 'جمل ستحتاجها فعلاً. انطقها كاملة بإيقاع طبيعي.',
    items: [
      { id: 'greeting', text: 'Guten Morgen, wie geht es Ihnen?' },
      { id: 'coffee', text: 'Ich möchte einen Kaffee, bitte.' },
      { id: 'station', text: 'Entschuldigung, wo ist der Bahnhof?' },
      { id: 'repeat', text: 'Können Sie das bitte wiederholen?' },
      { id: 'price', text: 'Wie viel kostet das?' },
      { id: 'family', text: 'Ich habe zwei Brüder und eine Schwester.' },
      { id: 'learn', text: 'Ich lerne seit einem Jahr Deutsch.' },
      { id: 'weather', text: 'Heute ist das Wetter schön.' },
    ],
  },
  {
    id: 'twisters',
    titleAr: 'تحدٍّ: ألغاز اللسان (Zungenbrecher)',
    descriptionAr: 'جمل تقليدية صعبة النطق، يتسلّى بها الألمان أنفسهم. ابدأ ببطء.',
    items: [
      { id: 'fischers-fritz', text: 'Fischers Fritz fischt frische Fische.', noteAr: 'تتكرّر F وfr وsch.' },
      {
        id: 'blaukraut',
        text: 'Blaukraut bleibt Blaukraut und Brautkleid bleibt Brautkleid.',
        noteAr: 'تتكرّر Bl وBr وkr.',
      },
      {
        id: 'zwetschgen',
        text: 'Zwischen zwei Zwetschgenzweigen sitzen zwei zwitschernde Schwalben.',
        noteAr: 'تتكرّر Zw وSchw.',
      },
    ],
  },
]
