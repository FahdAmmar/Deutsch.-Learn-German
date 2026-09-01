/**
 * A friendly, simplified flat-illustration human figure — used as the
 * backdrop for any "body" InteractiveDiagram. Frontal and generic on
 * purpose so hotspots (any body part) can be laid over it by any lesson.
 */
export function BodyBackground({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 400" fill="none" className={className} aria-hidden="true">
      {/* hair */}
      <path d="M66 44a34 34 0 0 1 68 0v6H66z" fill="currentColor" className="text-plum-muted" />
      {/* head */}
      <circle cx="100" cy="52" r="34" fill="currentColor" className="text-accent-muted" />
      {/* ears */}
      <circle cx="65" cy="54" r="7" fill="currentColor" className="text-accent-muted" />
      <circle cx="135" cy="54" r="7" fill="currentColor" className="text-accent-muted" />
      {/* face */}
      <circle cx="88" cy="50" r="3.2" fill="currentColor" className="text-ink" opacity="0.55" />
      <circle cx="112" cy="50" r="3.2" fill="currentColor" className="text-ink" opacity="0.55" />
      <path d="M88 64 Q100 72 112 64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-ink" opacity="0.5" fill="none" />

      {/* neck */}
      <rect x="90" y="82" width="20" height="16" fill="currentColor" className="text-accent-muted" />

      {/* torso / shirt */}
      <path
        d="M62 108 Q100 92 138 108 L146 210 Q100 224 54 210 Z"
        fill="currentColor"
        className="text-primary-muted"
      />
      <path d="M86 104 L100 118 L114 104" stroke="currentColor" strokeWidth="4" className="text-surface" fill="none" strokeLinecap="round" />

      {/* arms */}
      <rect x="26" y="112" width="26" height="104" rx="13" fill="currentColor" className="text-primary-muted" />
      <rect x="148" y="112" width="26" height="104" rx="13" fill="currentColor" className="text-primary-muted" />
      {/* hands */}
      <circle cx="39" cy="222" r="12" fill="currentColor" className="text-accent-muted" />
      <circle cx="161" cy="222" r="12" fill="currentColor" className="text-accent-muted" />

      {/* legs / trousers */}
      <rect x="66" y="212" width="30" height="122" rx="10" fill="currentColor" className="text-der-muted" />
      <rect x="104" y="212" width="30" height="122" rx="10" fill="currentColor" className="text-der-muted" />

      {/* shoes */}
      <ellipse cx="81" cy="346" rx="20" ry="11" fill="currentColor" className="text-ink" opacity="0.7" />
      <ellipse cx="119" cy="346" rx="20" ry="11" fill="currentColor" className="text-ink" opacity="0.7" />
    </svg>
  )
}
