import { Navigate, useParams } from 'react-router-dom'

import { MyTextDictation } from '@/features/mytext/MyTextDictation'
import { selectMyText, useMyTextStore } from '@/store/myTextStore'

/** Letter-by-letter dictation of one of the learner's own texts. Route: /my-text/:id */
export default function MyTextPracticePage() {
  const { id } = useParams<{ id: string }>()
  const text = useMyTextStore(selectMyText(id))

  if (!text) return <Navigate to="/my-text" replace />

  // Keyed by text so opening another one starts a fresh run (and silences the old audio).
  return <MyTextDictation key={text.id} text={text} />
}
