import type { SpeechVerdict } from '@/lib/pronunciation/compare'
import type { RecognitionErrorCode } from '@/services/recognition'

/** What to tell a learner about how a spoken attempt went. */
export const VERDICT_AR: Record<SpeechVerdict, string> = {
  good: 'ممتاز! نطقك مطابق للمطلوب.',
  almost: 'قريب جداً. راجع الكلمات الموسومة وأعد المحاولة.',
  again: 'حاول مرة أخرى بتمهّل، وابدأ بالاستماع إلى النطق.',
}

/** What to tell a learner when the microphone or the recogniser could not do its part. Empty where the learner's own stop is not an error. */
export const RECOGNITION_ERROR_AR: Record<RecognitionErrorCode, string> = {
  unsupported: 'متصفحك لا يدعم التعرّف على الكلام.',
  'not-allowed': 'لم يُسمح باستخدام الميكروفون. فعّل الإذن من إعدادات المتصفح ثم حاول مجدداً.',
  'no-microphone': 'لم يُعثر على ميكروفون في هذا الجهاز.',
  'no-speech': 'لم أسمع شيئاً. اقترب من الميكروفون وحاول مجدداً.',
  network: 'يحتاج التعرّف على الكلام إلى اتصال بالإنترنت.',
  aborted: '',
  unknown: 'تعذّر التعرّف على الكلام. حاول مرة أخرى.',
}
