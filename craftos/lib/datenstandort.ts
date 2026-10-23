/**
 * Datenstandort und Cloud (Zusatzauftrag Spur 10-f, Inhaber-Zustimmung 23.10.2026): einzige Quelle für
 * /fakten-ueber-craftos, /preise und llms.txt.
 *
 * Belege (vom Orchestrator geprüft, 23.10.2026):
 * - Datenbank: Supabase-Projekt craft-connect-buddy, Region eu-central-1 (Frankfurt am Main).
 * - Dateien und Medien: Cloudflare R2 mit Standorthinweis EEUR bzw. WEUR (Europa); Jurisdiktion „default“, eine
 *   EU-Bindung ist damit nicht zugesichert. Deshalb nur „europäische Rechenzentren“, keine EU- oder Deutschland-Zusage.
 * - Produkt: Hinweis „Hosting in der EU“ in der Web-App (QuoteSigning.tsx); CraftOS ist Cloud-Software (Web-App und
 *   Mobile-App, Daten in der Cloud).
 *
 * Formulierung: nur positiv und nur das Belegte; keine Aussage „alle Daten in Deutschland“, „ausschließlich in der
 * EU“ oder „deutsche Server“; KI-Anbieter, E-Mail-Versand und Unterauftragnehmer werden hier nicht genannt.
 * Tests: tests/datenstandort.test.ts. Bewusst ohne Importe.
 */

/** Kernsatz (FAQ-Antwort auf /preise und /fakten-ueber-craftos; llms.txt). */
const kern =
  "CraftOS läuft in der Cloud: Ihre Daten liegen in einer Datenbank in Frankfurt am Main, Dateien speichern wir in europäischen Rechenzentren.";

export const datenstandort = {
  kern,
  faqPreise: { q: "Wo liegen meine Daten?", a: kern },
  faqFakten: { q: "Wo speichert CraftOS die Daten?", a: kern },
} as const;
