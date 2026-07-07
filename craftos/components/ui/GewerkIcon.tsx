// Eigene Werkzeug-Icons pro Gewerk — von Hand gezeichnete Linework-SVGs
// (24er-Raster, 1.8er-Strich), statt generischer Icon-Bibliothek.
import type { ReactNode } from 'react'

const PATHS: Record<string, ReactNode> = {
  // Blitz
  elektriker: <path d="M13 2.5 6 13.5h4.5L9.5 21.5 18 10h-5l2-7.5Z" />,
  // Wassertropfen mit Pegel-Welle
  shk: (
    <>
      <path d="M12 3c3.8 4.4 6 7.7 6 10.4a6 6 0 0 1-12 0C6 10.7 8.2 7.4 12 3Z" />
      <path d="M9.2 14.8c.9.8 1.9.8 2.8 0 .9-.8 1.9-.8 2.8 0" />
    </>
  ),
  // Farbroller
  maler: (
    <>
      <rect x="3.5" y="4" width="12.5" height="5" rx="1.5" />
      <path d="M16 6.5h3.5V11H12v2.5" />
      <rect x="10.4" y="16.5" width="3.2" height="4.5" rx="0.9" />
    </>
  ),
  // Handsäge
  'tischler-schreiner': (
    <>
      <path d="M3 8.5h12.5l-1.8 6.5H5.5L3 8.5Z" />
      <path d="M5.5 15l1 1.8 1.6-1.8 1.6 1.8 1.6-1.8" />
      <path d="M15.5 8.5H18a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-4.3" />
    </>
  ),
  // Dach mit Schornstein
  dachdecker: (
    <>
      <path d="M3 13.5 12 4.5l9 9" />
      <path d="M16 8.5V5.8h2.6v5.3" />
      <path d="M6.2 12.7 12 7l5.8 5.7M9.1 15.6 12 12.8l2.9 2.8" />
    </>
  ),
  // Fliesenspiegel, eine Fliese frisch gesetzt
  fliesenleger: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="0.8" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="0.8" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="0.8" />
      <rect x="14.6" y="13.9" width="7" height="7" rx="0.8" transform="rotate(8 18.1 17.4)" />
    </>
  ),
  // Zimmermannswinkel mit Messmarken
  zimmerer: (
    <>
      <path d="M4.5 3.5h4v12h12v4h-16v-16Z" />
      <path d="M8.5 7h2M8.5 10.5h2M8.5 14h2M14 15.5v-2M17.5 15.5v-2" />
    </>
  ),
  // Blatt mit Blattader
  galabau: (
    <>
      <path d="M4.5 19.5C4.5 11.5 10.5 5 20 4.5 19.5 14 13 19.5 4.5 19.5Z" />
      <path d="M4.5 19.5C8 14.5 11.5 11.5 15.5 9" />
    </>
  ),
  // Spachtel / Glättkelle
  trockenbau: (
    <>
      <path d="M6.5 4h11l-1.2 8.5H7.7L6.5 4Z" />
      <path d="M10.4 12.5h3.2V19a1.6 1.6 0 0 1-3.2 0v-6.5Z" />
    </>
  ),
  // Amboss
  metallbau: (
    <>
      <path d="M3.5 7h17c0 3.6-3.6 5.5-7.2 5.5h-.8V16h3v3.5H8.5V16h3v-3.5h-.8C7 12.5 3.5 10.6 3.5 7Z" />
    </>
  ),
  // Baukran
  bauunternehmen: (
    <>
      <path d="M7 21V5.5M4 8h16M7 5.5 12.5 8M17.5 8v3.5a1.8 1.8 0 0 0 3.6 0" />
      <path d="M4 21h6.5M5.5 21v-2.5h3V21" />
    </>
  ),
  // Zollstock, halb aufgeklappt
  allrounder: (
    <>
      <path d="M3 19h7.5L14 8h7" />
      <path d="M6.5 19v-2M14 8h-1.5l-1 3" opacity="0.9" />
      <circle cx="10.5" cy="19" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14" cy="8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
}

export function GewerkIcon({ slug, className }: { slug: string; className?: string }) {
  const glyph = PATHS[slug] ?? PATHS.allrounder
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {glyph}
    </svg>
  )
}
