import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageHeader } from '@/components/ui'
import { SpellingWeakSpots } from '@/features/dictation/SpellingWeakSpots'
import { MyTextWorkbench } from '@/features/mytext/MyTextWorkbench'
import { SavedTexts } from '@/features/mytext/SavedTexts'
import type { MyText } from '@/types'

/** Enter a German text, see it cut into parts, and practise it as a dictation. Route: /my-text */
export default function MyTextPage() {
  const navigate = useNavigate()
  const [editing, setEditing] = useState<MyText | null>(null)
  // A new key gives the form a clean start (or loads the text being edited) without effects that copy props into state.
  const [formKey, setFormKey] = useState(0)
  const [notice, setNotice] = useState('')

  const resetForm = (next: MyText | null) => {
    setEditing(next)
    setFormKey((key) => key + 1)
  }

  return (
    <div className="space-y-10 pb-6">
      <PageHeader
        title="تدريب على نصّي"
        titleDe="Mein Text"
        description="الصق أي نص ألماني تريد حفظه. نقسّمه إلى مقاطع قصيرة، وتتدرّب عليه إملاءً حرفًا حرفًا، مع صوت يُخبرك بالحرف الصحيح والخاطئ."
      />

      <MyTextWorkbench
        key={formKey}
        editing={editing}
        onCancelEdit={() => resetForm(null)}
        onSaved={(id, startNow) => {
          if (startNow) {
            navigate(`/my-text/${id}`)
            return
          }
          resetForm(null)
          setNotice('تم حفظ النص في قائمتك.')
        }}
      />

      {notice ? (
        <p dir="rtl" role="status" className="rounded-md bg-success-muted px-4 py-3 text-success">
          {notice}
        </p>
      ) : null}

      <SpellingWeakSpots />

      <SavedTexts
        onEdit={(entry) => {
          setNotice('')
          resetForm(entry)
          document.getElementById('my-text-editor')?.scrollIntoView?.({ block: 'start' })
        }}
      />
    </div>
  )
}
