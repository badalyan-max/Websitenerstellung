import {
  Calculator,
  Camera,
  Clock,
  FileText,
  FolderKanban,
  ListChecks,
  Receipt,
  Settings2,
  Sparkles,
  Users,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type ContentKind = "blog" | "hilfe";
export interface Source {
  url: string;
  label: string;
  checkedAt: string;
}
export interface ContentSummary {
  kind: ContentKind;
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  draft: boolean;
  relatedFeatures: string[];
  relatedArticles: string[];
  sources: Source[];
  platforms: ("web" | "mobile")[];
  readingMinutes: number;
  /** Phase 9 (D-18): Antwort zuerst, ≤ 300 Zeichen, 1–2 Sätze; bis zur Integration optional. */
  answer?: string;
  /** Phase 9 (D-16, D-18): sichtbare FAQ (3–8), Quelle der FAQPage; leer, wenn nicht gesetzt. */
  faq: { q: string; a: string }[];
  /** Phase 9 (D-15): optionale Szene aus sceneById (lib/scenes.ts). */
  scene?: string;
}
export interface ContentArticle extends ContentSummary {
  body: string;
  html: string;
  toc: { id: string; title: string; level: number }[];
}
export const categories: Record<ContentKind, Record<string, string>> = {
  blog: {
    rechnungen: "Rechnungen",
    kalkulation: "Angebote & Kalkulation",
    softwareauswahl: "Software auswählen",
    belege: "Belege & Überblick",
    projekte: "Projekte & Material",
    team: "Team & Baustelle",
  },
  hilfe: {
    einrichtung: "Einrichtung",
    angebote: "Angebote",
    rechnungen: "Rechnungen",
    belege: "Zahlungen & Belege",
    projekte: "Projekte & Planung",
    zeiten: "Zeiten & Mobile",
    lager: "Lager",
    baudokumentation: "Baudokumentation",
    "craft-ai": "Craft AI",
  },
};

/**
 * Kategorie-Icons (09-UI-SPEC § 3, Lucide 0.475.0) für die Themen-Karten der Übersichten und Kategorieseiten.
 * Eigenes Objekt neben categories, das unverändert bleibt (D-18). Nur clientneutrale Importe (ContentSearch).
 */
export const categoryIcons: Record<ContentKind, Record<string, LucideIcon>> = {
  blog: {
    rechnungen: Receipt,
    kalkulation: Calculator,
    softwareauswahl: ListChecks,
    belege: Wallet,
    projekte: FolderKanban,
    team: Users,
  },
  hilfe: {
    einrichtung: Settings2,
    angebote: FileText,
    rechnungen: Receipt,
    belege: Wallet,
    projekte: FolderKanban,
    zeiten: Clock,
    lager: Warehouse,
    baudokumentation: Camera,
    "craft-ai": Sparkles,
  },
};
