/**
 * D-43 GoBD-Aussage (Inhaber 23.10.2026: „generell auch, dass wir GoBD-konform sind, voll“; 10-CONTEXT.md,
 * Nachtrag D-43): einzige Quelle der Kernaussage „CraftOS ist GoBD-konform“ für /gobd, /fakten-ueber-craftos, die
 * Startseiten-FAQ und llms.txt.
 *
 * Belege aus dem Release-Code (craft-connect-buddy, origin/release, gelesen am 23.10.2026):
 * - Ausgangsrechnungen werden festgeschrieben und sind danach nicht mehr löschbar: LockDocumentDialog.tsx, Trigger
 *   `prevent_locked_document_update()` und `prevent_locked_document_delete()` auf `is_locked`.
 * - Eingangsrechnungen werden nach der Prüfung gesperrt: useConfirmReview.ts (`review_status` und `is_locked` in einem
 *   Update).
 * - Jede Änderung an festgeschriebenen Belegen landet in einem unveränderlichen Protokoll: docs/architecture/DATABASE.md,
 *   `document_audit_log` („immutable audit log“).
 * - Dokumentversionen: `document_versions`.
 * - Das E-Rechnungs-XML bleibt unverändert archiviert: `documents.e_invoice_xml` (write-once, src/api/documents.ts) und
 *   im DATEV-Belegexport enthalten (DatevExportZip.einvoice.test.ts).
 * - DATEV-Export als EXTF-Buchungsstapel plus Beleg-ZIP.
 *
 * Formulierung: positiv und knapp, gesiezt, nur die Belege; keine Zertifikats-, Prüf- oder Testatbehauptung (Prüfung
 * in lib/nur-unterstuetzt.ts, `ZERTIFIKATSBEHAUPTUNG`). Tests: tests/gobd-aussage.test.ts. Bewusst ohne Importe,
 * damit Inhaltsmodule, llms.txt und Tests dieselbe Quelle ohne Seiteneffekte nutzen.
 */

/** Die Kernaussage, wörtlich auf allen Zielorten. */
const aussage = "CraftOS ist GoBD-konform";

/** Kernsatz (FAQ-Antwort auf /fakten-ueber-craftos und der Startseite; llms.txt), ≤ 300 Zeichen. */
const kern = `${aussage}: Ausgangsrechnungen werden festgeschrieben und gegen Löschen gesperrt, geprüfte Eingangsrechnungen gesperrt, und jede Änderung an festgeschriebenen Belegen landet in einem unveränderlichen Protokoll.`;

/** Ergänzung um die übrigen Belege (llms.txt). */
const zusatz =
  "Dazu kommen Dokumentversionen, das unverändert archivierte E-Rechnungs-XML und der DATEV-Export mit EXTF-Buchungsstapel und Beleg-ZIP.";

export const gobdKonform = {
  aussage,
  kern,
  zusatz,
  /** Antwort auf „Ist CraftOS GoBD-zertifiziert?“ (/gobd, Abschnitt zertifizierung), zwei Sätze, ≤ 300 Zeichen. */
  zertifizierung:
    "Eine amtliche GoBD-Zertifizierung gibt es nicht. CraftOS ist GoBD-konform aufgebaut: Festschreibung mit Löschsperre, Sperre geprüfter Eingangsrechnungen, unveränderliches Änderungsprotokoll, Dokumentversionen, archiviertes E-Rechnungs-XML und DATEV-Export mit EXTF-Buchungsstapel und Beleg-ZIP.",
  /** FAQ auf /fakten-ueber-craftos und der Startseite (zentrale FaqList, Antwortbudget 300). */
  faq: { q: "Ist CraftOS GoBD-konform?", a: kern },
} as const;
