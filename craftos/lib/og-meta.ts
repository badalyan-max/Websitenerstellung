/**
 * Leichte OG-Metadaten ohne `next/og` (08-REVIEW LO-01): Seitentypen und Alternativtext der OG-Grafik. lib/og.tsx
 * (Bildvorlage) und lib/seo-meta.ts (Seitenmetadaten) nutzen dieselben Werte; Seiten laden so kein ImageResponse.
 */

export const OG_KINDS = [
  "Handwerkersoftware",
  "Funktion",
  "Funktionen",
  "Mobile-App",
  "Preise",
  "Vergleich",
  "Fakten",
  "Craft AI",
  "GoBD",
  "Gewerk",
  "Gewerke",
  "Ratgeber",
  "Hilfe",
  "Rechner",
  "Kontakt",
  "Rechtliches",
] as const;

export type OgKind = (typeof OG_KINDS)[number];

/** Alternativtext der OG-Grafik: „{kind}: {title}“. */
export function ogAlt(kind: OgKind, title: string): string {
  return `${kind}: ${title}`;
}
