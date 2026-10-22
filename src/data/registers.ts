/**
 * Du or Sie: the same sentence in the informal and the formal way of addressing someone, and the situations
 * that call for each. German chooses by relationship, so the choice has to be learned with the sentence.
 */

export interface RegisterPair {
  id: string
  informal: string
  formal: string
  /** The sentence in Arabic, which does not mark the difference. */
  ar: string
  /** What changes between the two, in Arabic. */
  focusAr: string
}

export const REGISTER_PAIRS: readonly RegisterPair[] = [
  { id: 'name', informal: 'Wie heißt du?', formal: 'Wie heißen Sie?', ar: 'ما اسمك؟', focusAr: 'du ← Sie، ويأخذ الفعل صيغة الجمع: heißt ← heißen.' },
  { id: 'origin', informal: 'Woher kommst du?', formal: 'Woher kommen Sie?', ar: 'من أين أنت؟', focusAr: 'du kommst ← Sie kommen.' },
  { id: 'how-are-you', informal: 'Wie geht es dir?', formal: 'Wie geht es Ihnen?', ar: 'كيف حالك؟', focusAr: 'الضمير في حالة Dativ: dir ← Ihnen (بحرف كبير).' },
  { id: 'live', informal: 'Wo wohnst du?', formal: 'Wo wohnen Sie?', ar: 'أين تسكن؟', focusAr: 'du wohnst ← Sie wohnen.' },
  { id: 'time', informal: 'Hast du Zeit?', formal: 'Haben Sie Zeit?', ar: 'هل عندك وقت؟', focusAr: 'haben مع Sie: hast ← haben، ويتقدّم الفعل على الضمير في السؤال.' },
  { id: 'help', informal: 'Kannst du mir helfen?', formal: 'Können Sie mir helfen?', ar: 'هل تستطيع مساعدتي؟', focusAr: 'kannst ← können: الفعل الناقص يتبع الضمير.' },
  { id: 'job', informal: 'Was machst du beruflich?', formal: 'Was machen Sie beruflich?', ar: 'ما عملك؟', focusAr: 'machst ← machen.' },
  { id: 'phone', informal: 'Wie ist deine Telefonnummer?', formal: 'Wie ist Ihre Telefonnummer?', ar: 'ما رقم هاتفك؟', focusAr: 'أداة الملكية: deine ← Ihre (بحرف كبير).' },
  { id: 'know', informal: 'Weißt du, wo der Bahnhof ist?', formal: 'Wissen Sie, wo der Bahnhof ist?', ar: 'هل تعرف أين المحطة؟', focusAr: 'wissen فعل شاذ: weißt ← wissen.' },
  { id: 'come-in', informal: 'Komm bitte herein!', formal: 'Kommen Sie bitte herein!', ar: 'تفضّل بالدخول!', focusAr: 'الأمر: Komm! للمفرد المخاطَب، وKommen Sie! مع الضمير للاحترام.' },
  { id: 'speak', informal: 'Sprichst du Deutsch?', formal: 'Sprechen Sie Deutsch?', ar: 'هل تتكلّم الألمانية؟', focusAr: 'الفعل الشاذ يعود إلى شكله العادي مع Sie: sprichst ← sprechen.' },
  { id: 'drink', informal: 'Was möchtest du trinken?', formal: 'Was möchten Sie trinken?', ar: 'ماذا تريد أن تشرب؟', focusAr: 'möchtest ← möchten.' },
  { id: 'call', informal: 'Ich rufe dich morgen an.', formal: 'Ich rufe Sie morgen an.', ar: 'سأتصل بك غداً.', focusAr: 'المفعول به: dich ← Sie.' },
  { id: 'seat', informal: 'Das ist dein Platz.', formal: 'Das ist Ihr Platz.', ar: 'هذا مكانك.', focusAr: 'dein ← Ihr.' },
  { id: 'belongs', informal: 'Gehört das dir?', formal: 'Gehört das Ihnen?', ar: 'هل هذا لك؟', focusAr: 'Dativ: dir ← Ihnen.' },
  { id: 'sit', informal: 'Setz dich bitte!', formal: 'Setzen Sie sich bitte!', ar: 'اجلس من فضلك.', focusAr: 'الفعل الانعكاسي: dich ← sich، والضمير Sie بعد الفعل.' },
]

export type RegisterKind = 'informal' | 'formal'

export interface RegisterSituation {
  id: string
  /** Who is being spoken to, as a sentence start in Arabic. */
  situationAr: string
  register: RegisterKind
}

export const REGISTER_SITUATIONS: readonly RegisterSituation[] = [
  { id: 'boss', situationAr: 'تتحدث إلى مديرك في العمل لأول مرة', register: 'formal' },
  { id: 'office', situationAr: 'تتحدث إلى موظف في دائرة حكومية', register: 'formal' },
  { id: 'doctor', situationAr: 'تتحدث إلى طبيب لا تعرفه', register: 'formal' },
  { id: 'professor', situationAr: 'تتحدث إلى أستاذك في الجامعة', register: 'formal' },
  { id: 'stranger', situationAr: 'تسأل رجلاً مسنّاً في الشارع لا تعرفه', register: 'formal' },
  { id: 'neighbour', situationAr: 'تتحدث إلى جارة جديدة لا تعرفها', register: 'formal' },
  { id: 'customer', situationAr: 'تتحدث إلى زبون في المتجر الذي تعمل فيه', register: 'formal' },
  { id: 'friend', situationAr: 'تتحدث إلى صديقك المقرّب', register: 'informal' },
  { id: 'sibling', situationAr: 'تتحدث إلى أخيك أو أختك', register: 'informal' },
  { id: 'classmate', situationAr: 'تتحدث إلى زميل في دورة اللغة، وهو في سنّك', register: 'informal' },
  { id: 'child', situationAr: 'تتحدث إلى طفل', register: 'informal' },
  { id: 'colleague-du', situationAr: 'تتحدث إلى زميل في العمل عرض عليك أن تقولا لبعض «du»', register: 'informal' },
]

/** The forms of the two ways of address, for the reference table. */
export const REGISTER_FORMS: ReadonlyArray<{ labelAr: string; informal: string; formal: string }> = [
  { labelAr: 'الفاعل (Nominativ)', informal: 'du', formal: 'Sie' },
  { labelAr: 'المفعول به (Akkusativ)', informal: 'dich', formal: 'Sie' },
  { labelAr: 'المفعول لأجله (Dativ)', informal: 'dir', formal: 'Ihnen' },
  { labelAr: 'الملكية', informal: 'dein / deine', formal: 'Ihr / Ihre' },
  { labelAr: 'الفعل (lernen)', informal: 'du lernst', formal: 'Sie lernen' },
  { labelAr: 'الأمر (kommen)', informal: 'Komm!', formal: 'Kommen Sie!' },
]
