/**
 * A generic, reasonably detailed flat-illustration room interior — used as
 * the backdrop for any "room scene" InteractiveDiagram. Deliberately
 * generic (a window, a picture, a rug, a shelf) rather than tied to any
 * one lesson's exact furniture list, so future room-vocabulary lessons
 * can reuse it by supplying their own hotspots.
 */
export function RoomBackground({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" fill="none" className={className} aria-hidden="true">
      {/* wall */}
      <rect x="0" y="0" width="320" height="250" fill="currentColor" className="text-surface" />
      <rect x="0" y="0" width="320" height="250" fill="currentColor" className="text-bg-alt" opacity="0.4" />
      {/* floor */}
      <rect x="0" y="250" width="320" height="70" fill="currentColor" className="text-bg-alt" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={0}
          y1={264 + i * 13}
          x2={320}
          y2={264 + i * 13}
          stroke="currentColor"
          strokeWidth="1"
          className="text-border"
          opacity="0.6"
        />
      ))}
      {/* baseboard */}
      <rect x="0" y="248" width="320" height="4" fill="currentColor" className="text-border-strong" />

      {/* window, upper-left */}
      <g>
        <rect x="26" y="26" width="88" height="80" rx="6" fill="currentColor" className="text-primary-muted" />
        <rect x="26" y="26" width="88" height="80" rx="6" stroke="currentColor" strokeWidth="4" className="text-surface" fill="none" />
        <rect x="26" y="26" width="88" height="80" rx="6" stroke="currentColor" strokeWidth="2.5" className="text-border-strong" fill="none" />
        <line x1="70" y1="30" x2="70" y2="102" stroke="currentColor" strokeWidth="2.5" className="text-border-strong" />
        <line x1="30" y1="66" x2="110" y2="66" stroke="currentColor" strokeWidth="2.5" className="text-border-strong" />
        {/* curtains */}
        <path d="M18 20 Q26 60 18 110 L30 110 Q24 60 30 20 Z" fill="currentColor" className="text-accent-muted" />
        <path d="M122 20 Q114 60 122 110 L110 110 Q116 60 110 20 Z" fill="currentColor" className="text-accent-muted" />
      </g>

      {/* wall picture, upper-right */}
      <g>
        <rect x="228" y="34" width="66" height="50" rx="4" fill="currentColor" className="text-surface" />
        <rect x="228" y="34" width="66" height="50" rx="4" stroke="currentColor" strokeWidth="3" className="text-border-strong" fill="none" />
        <path d="M236 74 L256 52 L270 64 L286 44 L286 76 L236 76 Z" fill="currentColor" className="text-plum-muted" />
        <circle cx="278" cy="46" r="5" fill="currentColor" className="text-accent-muted" />
      </g>

      {/* shelf with a couple of books, left-center */}
      <g>
        <rect x="24" y="150" width="72" height="6" rx="2" fill="currentColor" className="text-border-strong" />
        <rect x="30" y="122" width="10" height="28" rx="1.5" fill="currentColor" className="text-primary-muted" />
        <rect x="42" y="116" width="10" height="34" rx="1.5" fill="currentColor" className="text-accent-muted" />
        <rect x="54" y="126" width="10" height="24" rx="1.5" fill="currentColor" className="text-plum-muted" />
      </g>

      {/* rug, bottom-center */}
      <ellipse cx="160" cy="288" rx="120" ry="20" fill="currentColor" className="text-primary-muted" />
      <ellipse cx="160" cy="288" rx="120" ry="20" stroke="currentColor" strokeWidth="2" className="text-primary" opacity="0.25" fill="none" />
      <ellipse cx="160" cy="288" rx="82" ry="13" stroke="currentColor" strokeWidth="2" className="text-primary" opacity="0.25" fill="none" />
    </svg>
  )
}
