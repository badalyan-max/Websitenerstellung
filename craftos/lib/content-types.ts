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
