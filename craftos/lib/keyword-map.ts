// Keyword-Map (SEO-02): genau ein Hauptkeyword je Seite, Zahlen aus SE-Ranking-Rohdaten.
// Datenquelle: docs/seo/keyword-map.json (Rohdaten und Manifest unter docs/seo/data/kwmap/).
// Methode, Lücken und Zielwerte: docs/seo/KEYWORD-MAP.md. Zielwerte (target) werden erst in Phasen 6–8 angewendet (D-14).
// Bewusst ohne "@/"-Imports, damit Node-Skripte die JSON-Datei direkt lesen können.
import data from "../docs/seo/keyword-map.json";

/** SE-Ranking-Intent: I informational, N navigational, T transactional, C commercial, L local. */
export type Intent = "I" | "N" | "T" | "C" | "L";

export interface KeywordMetric {
  keyword: string;
  volume: number;
  difficulty: number;
  intents: Intent[];
  cpc?: number;
  /** file relativ zu craftos/, z. B. "docs/seo/data/kwmap/export--candidates-1.json" */
  source: { endpoint: string; file: string; fetchedAt: string };
}

export interface KeywordAssignment {
  /** normalisierter Pfad: "/" für die Startseite, sonst ohne Schrägstrich am Ende */
  path: string;
  status: "bestehend" | "geplant";
  phase?: 6 | 7 | 8 | 9;
  primary: KeywordMetric | null;
  /** Pflicht, wenn primary null ist oder das Hauptkeyword kein pageCandidate ist */
  reason?: string;
  secondary: string[];
  competitors: { domain: string; position: number | null; url: string | null }[];
  /** Zielwerte; title inklusive Marken-Suffix " | CraftOS" aus dem Layout-Template */
  target?: { title?: string; h1?: string; description?: string };
}

export const keywordMap = data as KeywordAssignment[];
