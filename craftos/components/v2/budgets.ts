/**
 * Textbudgets und Mengenregeln des Designsystems v2 (UI-SPEC Phase 5, „Textbudgets“).
 * Zeichen inklusive Leerzeichen. Überschreitung ist ein Entwicklerfehler: Bausteine werfen beim
 * Rendern, Vitest prüft zusätzlich alle Seiteninhalte. Das Budget der vereinfachten
 * Produktoberflächen in Geräterahmen liegt getrennt bei den Geräterahmen-Bausteinen (Plan 05-05).
 */
export const TEXT_BUDGET = {
  sectionHeader: { eyebrow: 24, title: 60, lead: 140 },
  bentoTile: { title: 40, textSmall: 90, textLarge: 120 },
  featureCard: { title: 32, benefit: 100 },
  step: { title: 28, text: 80 },
  keyFact: { value: 10, label: 40 },
  comparison: { rowLabel: 48, cell: 24 },
  badge: 16,
  faq: { question: 90, firstSentence: 300, answer: 600 },
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
