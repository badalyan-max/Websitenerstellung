/**
 * Textbudgets und Mengenregeln des Designsystems v2 (UI-SPEC Phase 5, „Textbudgets“).
 * Zeichen inklusive Leerzeichen. Überschreitung ist ein Entwicklerfehler: Bausteine werfen beim
 * Rendern, Vitest prüft zusätzlich alle Seiteninhalte. Das Budget der vereinfachten
 * Produktoberflächen in Geräterahmen liegt getrennt bei den Geräterahmen-Bausteinen (Plan 05-05).
 */
export const TEXT_BUDGET = {
  /** Phase 8: answerLead gilt für den Antwort-Lead unter Frage-H2 (G2, 1–2 Sätze). */
  sectionHeader: { eyebrow: 24, title: 60, lead: 140, answerLead: 300 },
  bentoTile: { title: 40, textSmall: 90, textLarge: 120 },
  featureCard: { title: 32, benefit: 100 },
  step: { title: 28, text: 80 },
  keyFact: { value: 10, label: 40 },
  comparison: { rowLabel: 48, cell: 24 },
  badge: 16,
  /** Phase 8 (C3): answerCentral = ganze FAQ-Antwort auf zentralen Seiten (FaqList zentral). */
  faq: { question: 90, firstSentence: 300, answer: 600, answerCentral: 300 },
  /** Phase 8 (08-UI-SPEC G1–G7): Antwortsatz im Kopf, FitPanels, FactList, OG-Titel, Brotkrumen-Zwischenglieder. */
  answer: 300,
  fitPanel: { title: 40, point: 100 },
  factList: { term: 32, definition: 200 },
  og: { title: 90 },
  crumb: { name: 32 },
  ctaBand: { title: 40, text: 80, button: 28 },
  /** Phase 6 (06-UI-SPEC „Textbudgets“): Hero der Startseite, Seitenkopf /funktionen, Mega-Menü, FeatureList */
  hero: { h1: 60, lead: 110 },
  /**
   * Phase 7 (07-UI-SPEC F4): `lead` bleibt für den Seitenkopf von /funktionen; `kopfLead`, `h1` und
   * `eyebrow` gelten für den FunktionsKopf der Detailseiten und /app (Above-the-fold 360 × 640).
   */
  pageHead: { lead: 140, kopfLead: 110, h1: 60, eyebrow: 24 },
  menuGroup: { description: 60 },
  featureList: { name: 32, benefit: 100 },
  /**
   * Phase 9 (09-UI-SPEC G8–G10, § 4): LinkKarten-Felder, Gewerke-Daten (Karte, Beispielkachel) und
   * Artikelvorlage (H1 im ContentKopf, Prosa-Überschrift, Schritt der obersten Liste).
   */
  linkKarte: { label: 24, title: 100, text: 160, meta: 32 },
  gewerk: { teaser: 100, exampleTitle: 40, example: 200 },
  artikel: { h1: 100, heading: 80, step: 160 },
  /** Phase 10 (10-UI-SPEC K2): Höchstlänge des Kopf-Hinweises im ContentKopf (z. B. Rechnerköpfe). */
  contentKopf: { hinweis: 80 },
  /** Mengen je Baustein */
  count: {
    bento: { min: 3, max: 7 },
    steps: { min: 3, max: 6 },
    keyFacts: { min: 3, max: 4 },
    faq: { min: 3, max: 8 },
    comparison: { columns: 4, rows: 12 },
    /** Phase 6: Zusatzfunktionen je Gruppe und Startseiten-Abschnitte nach dem Hero */
    featureList: { min: 1, max: 7 },
    homeSections: { min: 6, max: 8 },
    /** Phase 7 (07-UI-SPEC F4): Ablaufschritte und verwandte Funktionen je Detailseite */
    detailSteps: { min: 3, max: 5 },
    related: { min: 2, max: 3 },
    /** Phase 8 (08-UI-SPEC G1–G7): Passt-Punkte je Panel, Einträge der Faktenliste, Brotkrumen-Glieder */
    fitPoints: { min: 2, max: 4 },
    factList: { min: 6, max: 12 },
    crumbs: { min: 2, max: 4 },
    /**
     * Phase 9 (09-UI-SPEC G9, § 4): Karten je Raster, Gewerke-Ablauf/-Funktionen/-FAQ/-Weiterlesen,
     * Schrittliste der Artikel-Prosa, „Passende Funktionen“ und „Weiterlesen“ je Artikel.
     */
    linkKarten: { min: 1, max: 60 },
    gewerkSteps: { min: 4, max: 5 },
    gewerkFunktionen: { min: 4, max: 6 },
    gewerkFaq: { min: 3, max: 4 },
    gewerkArtikel: { min: 2, max: 3 },
    artikelSchritte: { min: 2, max: 10 },
    artikelFunktionen: { min: 1, max: 3 },
    artikelVerwandt: { min: 1, max: 4 },
  },
} as const;

/** Zeichenzahl inklusive Leerzeichen, Unicode-sicher („€“, „ä“ zählen je 1). */
export function charCount(value: string): number {
  return Array.from(value).length;
}

/** Wirft den Fehlertext aus dem UI-SPEC, wenn ein Textfeld sein Budget überschreitet. */
export function assertTextBudget(field: string, value: string, max: number): void {
  const n = charCount(value);
  if (n > max) {
    throw new Error(`Textbudget überschritten: ${field} hat ${n} von ${max} Zeichen – Satz kürzen.`);
  }
}

/** Anzahl der Sätze: Satzzeichen „.“, „!“ oder „?“ vor Leerraum oder Textende (06-UI-SPEC). */
export function sentenceCount(value: string): number {
  return (value.match(/[.!?](?=\s|$)/g) ?? []).length;
}

/** Wirft den Fehlertext aus dem 06-UI-SPEC, wenn ein Nutzentext nicht genau einen Satz hat. */
export function assertOneSentence(component: string, name: string, value: string): void {
  const n = sentenceCount(value);
  if (n !== 1) {
    throw new Error(`${component}: Nutzen für ${name} hat ${n} Sätze – genau einen Satz schreiben.`);
  }
}

/** Wirft den Mengenfehler aus dem UI-SPEC („BentoGrid: mindestens 3 Kacheln erforderlich – …“). */
export function assertCount(
  component: string,
  n: number,
  range: { readonly min: number; readonly max: number },
  unit: string,
): void {
  if (n < range.min) {
    throw new Error(`${component}: mindestens ${range.min} ${unit} erforderlich – Inhalte in lib/… ergänzen.`);
  }
  if (n > range.max) {
    throw new Error(`${component}: höchstens ${range.max} ${unit} erlaubt – Inhalte in lib/… kürzen.`);
  }
}
