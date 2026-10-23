import type { ReactNode } from "react";
import { ContentSearch } from "./ContentSearch";
import { ContentKopf } from "./ContentKopf";
import { CONTENT_CTA } from "./ArticlePage";
import { getContentList } from "@/lib/content";
import { categories, type ContentKind, type ContentSummary } from "@/lib/content-types";
import { categoryIcons } from "@/lib/content-icons";
import { CtaBand } from "@/components/v2/CtaBand";
import { LinkKarten, type LinkKarte } from "@/components/v2/LinkKarten";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { crumbsFor } from "@/lib/breadcrumbs";
import { zielwerte } from "@/lib/seo-meta";

/** Copy der Übersichten und Kategorien (09-UI-SPEC § 3, § 5). */
const COPY = {
  blog: {
    eyebrow: "Ratgeber",
    answer:
      "Der CraftOS-Ratgeber erklärt Rechnungen, Kalkulation, Belege, Projekte und Teamarbeit im Handwerk mit Beispielen und Quellen. Jeder Artikel beantwortet seine Frage zuerst und zeigt dann das Vorgehen.",
    themen: { title: "Themen im Ratgeber", lead: "Wählen Sie ein Thema, um nur die passenden Artikel zu sehen." },
    weitere: { title: "Weitere Themen im Ratgeber", lead: "Wählen Sie ein anderes Thema." },
    alle: "Alle Ratgeber",
    menge: (n: number) => `${n} Artikel`,
  },
  hilfe: {
    eyebrow: "Hilfe",
    answer:
      "Die CraftOS-Hilfe führt Schritt für Schritt durch Web-App und Mobile-App, von der Einrichtung über Angebote und Rechnungen bis zu Zeiten, Lager und Baudokumentation. Suchen Sie nach einer Aufgabe oder wählen Sie ein Thema.",
    themen: { title: "Themen der Hilfe", lead: "Wählen Sie ein Thema, um nur die passenden Anleitungen zu sehen." },
    weitere: { title: "Weitere Themen der Hilfe", lead: "Wählen Sie ein anderes Thema." },
    alle: "Alle Anleitungen",
    menge: (n: number) => (n === 1 ? "1 Anleitung" : `${n} Anleitungen`),
  },
} as const;
const LEAD_ALLE = "Suchen Sie nach einem Begriff oder filtern Sie nach Thema.";
const LEAD_ALLE_KATEGORIE = "Suchen Sie nach einem Begriff oder wechseln Sie das Thema.";

const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;

function Abschnitt({ id, surface, children }: { id: "themen" | "alle"; surface: keyof typeof SURFACE; children: ReactNode }) {
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

/** Neuestes updatedAt als TT.MM.JJJJ. */
function zuletzt(liste: ContentSummary[]) {
  const iso = liste.map((a) => a.updatedAt).sort().at(-1);
  return iso ? iso.split("-").reverse().join(".") : undefined;
}

/** Themen-Karten je Kategorie mit Lucide-Icon im Icon-Feld und Mengenangabe (09-UI-SPEC § 3). */
function themenKarten(kind: ContentKind, items: ContentSummary[], ohne?: string): LinkKarte[] {
  return Object.entries(categories[kind])
    .filter(([slug]) => slug !== ohne)
    .map(([slug, name]) => {
      const Icon = categoryIcons[kind][slug];
      if (!Icon) throw new Error(`Kategorie ${kind}/${slug}: Icon fehlt – categoryIcons in lib/content-icons.ts ergänzen.`);
      const n = items.filter((a) => a.category === slug).length;
      return {
        href: "/" + kind + "/kategorie/" + slug,
        title: name,
        meta: n > 0 ? COPY[kind].menge(n) : undefined,
        icon: <Icon size={24} strokeWidth={1.75} />,
        iconFeld: true,
      };
    });
}

/**
 * Übersichten /blog, /hilfe und Kategorieseiten v2 (09-UI-SPEC § 3; D-17; H2, H3, H9): heller ContentKopf mit
 * Map-H1 (Übersicht mit Antwort § 5, Kategorie ohne), Themen als LinkKarten mit Kategorie-Icons, die Suche als
 * einzige Client-Insel und das CTA-Band als letzter Abschnitt (keine Hinweisbox mehr).
 * Flächen: Übersicht Kopf Warm → Themen Weiß → Alle Warm → CTA dunkel; Kategorie Kopf Warm → Alle Weiß →
 * Weitere Themen Warm → CTA dunkel. Karten stehen immer auf der Gegenfläche.
 */
export async function ContentIndex({
  kind,
  category,
}: {
  kind: ContentKind;
  category?: string;
}) {
  const items = await getContentList(kind);
  // H1 aus der Keyword-Map (08-04, D-17): Übersichten und Kategorien („Ratgeber: …“ / „Hilfe: …“).
  const pfad = category ? "/" + kind + "/kategorie/" + category : "/" + kind;
  const h1 = zielwerte(pfad).h1;
  const copy = COPY[kind];
  const imThema = category ? items.filter((a) => a.category === category) : items;
  const datum = zuletzt(imThema);
  const menge = copy.menge(imThema.length);
  const stand = datum
    ? category
      ? `${menge} in diesem Thema, zuletzt aktualisiert am ${datum}`
      : `${menge}, zuletzt aktualisiert am ${datum}`
    : undefined;
  const suchliste = items.map(({ slug, title, description, category, readingMinutes }) => ({
    slug,
    title,
    description,
    category,
    readingMinutes,
  }));

  const themen = category ? (
    <Abschnitt id="themen" surface="warm">
      <SectionHeader id="themen" title={copy.weitere.title} lead={copy.weitere.lead} />
      <LinkKarten
        items={themenKarten(kind, items, category)}
        label={copy.weitere.title}
        surface="white"
        columns={3}
      />
    </Abschnitt>
  ) : (
    <Abschnitt id="themen" surface="white">
      <SectionHeader id="themen" title={copy.themen.title} lead={copy.themen.lead} />
      <LinkKarten items={themenKarten(kind, items)} label={copy.themen.title} surface="warm" columns={3} />
    </Abschnitt>
  );
  const alleTitel = category ? `${copy.alle} zu ${categories[kind][category]}` : copy.alle;
  const alle = (
    <Abschnitt id="alle" surface={category ? "white" : "warm"}>
      <SectionHeader id="alle" title={alleTitel} lead={category ? LEAD_ALLE_KATEGORIE : LEAD_ALLE} />
      <ContentSearch
        kind={kind}
        initialCategory={category}
        items={suchliste}
        surface={category ? "warm" : "white"}
      />
    </Abschnitt>
  );

  return (
    <>
      <ContentKopf
        id="seiten-titel"
        crumbs={crumbsFor(pfad)}
        eyebrow={copy.eyebrow}
        h1={h1}
        answer={category ? undefined : copy.answer}
        stand={stand}
      />
      {category ? (
        <>
          {alle}
          {themen}
        </>
      ) : (
        <>
          {themen}
          {alle}
        </>
      )}
      <div data-abschnitt="cta">
        <CtaBand {...CONTENT_CTA[kind]} />
      </div>
    </>
  );
}
