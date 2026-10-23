import type { ContentKind } from "./content-types";

/**
 * CTA-Bänder der Wissensinhalte (09-UI-SPEC § 5, H9): Ratgeber mit „Stundensatz berechnen“, Hilfe mit
 * „Support kontaktieren“. Gilt für Artikel, Übersichten und Kategorien. 09-REVIEW IN-01: eigenes Modul, damit die
 * Übersichten nicht das ganze Artikelmodul (Szenen, Funktionsgruppen) importieren.
 */
export const CONTENT_CTA: Record<ContentKind, { title: string; text: string; secondary: { label: string; href: string } }> = {
  blog: {
    title: "Machen Sie Platz für Ihr Handwerk.",
    text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
    secondary: { label: "Stundensatz berechnen", href: "/rechner/stundensatz" },
  },
  hilfe: {
    title: "Machen Sie Platz für Ihr Handwerk.",
    text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
    secondary: { label: "Support kontaktieren", href: "/support" },
  },
};
