import type { Dialogue } from '@/types'

export const conversationTelefonnummer: Dialogue = {
  id: 'dialogue-a1-telefonnummer',
  level: 'A1',
  moduleId: 'a1-m01',
  titleDe: 'Meine Nummer ist …',
  titleAr: 'رقمي هو …',
  register: 'informal',
  lines: [
    { speaker: 'a', name: 'Sara', de: 'Jonas, wie ist deine Handynummer?', ar: 'يوناس، ما رقم هاتفك المحمول؟' },
    { speaker: 'b', name: 'Jonas', de: 'Meine Nummer ist null eins fünf eins, zwei drei vier, fünf sechs sieben acht.', ar: 'رقمي هو 0151 234 5678.' },
    { speaker: 'a', name: 'Sara', de: 'Moment, noch einmal bitte. Langsamer, bitte.', ar: 'لحظة، مرة أخرى من فضلك. أبطأ من فضلك.' },
    { speaker: 'b', name: 'Jonas', de: 'Null eins fünf eins, zwei drei vier, fünf sechs sieben acht.', ar: '0151، 234، 5678.' },
    { speaker: 'a', name: 'Sara', de: 'Danke. Und wie ist deine E-Mail-Adresse?', ar: 'شكراً. وما عنوان بريدك الإلكتروني؟' },
    { speaker: 'b', name: 'Jonas', de: 'Jonas Punkt Weber at mail Punkt de.', ar: 'jonas.weber@mail.de' },
    { speaker: 'a', name: 'Sara', de: 'Wie schreibt man Weber?', ar: 'كيف تُكتب Weber؟' },
    { speaker: 'b', name: 'Jonas', de: 'W, E, B, E, R.', ar: 'W وE وB وE وR.' },
    { speaker: 'a', name: 'Sara', de: 'Super, danke! Ich schreibe dir heute Abend eine Nachricht.', ar: 'ممتاز، شكراً! سأكتب لك رسالة الليلة.' },
    { speaker: 'b', name: 'Jonas', de: 'Prima. Bis später!', ar: 'رائع. إلى اللقاء لاحقاً!' },
  ],
}
