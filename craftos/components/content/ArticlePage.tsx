import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { getContentList } from "@/lib/content";
import { categories, type ContentArticle, type ContentKind } from "@/lib/content-types";
import { getFunktionsgruppen } from "@/lib/funktionsgruppen";
import { cardScenes, sceneById, sceneFrame } from "@/lib/scenes";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { FeatureCard } from "@/components/v2/FeatureCard";
import { LinkKarten, type LinkKarte } from "@/components/v2/LinkKarten";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { crumbsFor } from "@/lib/breadcrumbs";
import { faqSchema } from "@/lib/schema";
import { segmentBild, zielwerte } from "@/lib/seo-meta";
import { site } from "@/lib/site";
import { ContentKopf } from "./ContentKopf";

/**
 * CTA-Bänder der Wissensinhalte (09-UI-SPEC § 5, H9): Ratgeber mit „Stundensatz berechnen“, Hilfe mit
 * „Support kontaktieren“. Gilt für Artikel, Übersichten und Kategorien (ContentIndex nutzt dieselbe Quelle).
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

/** Abschnittsköpfe nach dem Artikel (09-UI-SPEC § 2.2). */
const NACH_ARTIKEL = {
  funktionen: { title: "Passende Funktionen", lead: "Diese Funktionen setzen das Thema des Artikels in CraftOS um." },
  weiterlesen: { title: "Weiterlesen", lead: "Diese Artikel führen das Thema weiter." },
} as const;

/** ISO-Datum → TT.MM.JJJJ mit führenden Nullen (Metazeile, Quellen). */
const datum = (iso: string) => iso.split("-").reverse().join(".");

const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;

function Abschnitt({
  id,
  surface,
  children,
}: {
  id: "funktionen" | "weiterlesen";
  surface: keyof typeof SURFACE;
  children: ReactNode;
}) {
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

/** Einträge des Inhaltsverzeichnisses (H2, H3 eingerückt); Links mindestens 44 px hoch. */
function TocListe({ toc }: { toc: ContentArticle["toc"] }) {
  return (
    <ol className="artikel-toc-liste">
      {toc.map((h) => (
        <li key={h.id} data-ebene={h.level}>
          <a href={"#" + h.id}>{h.title}</a>
        </li>
      ))}
    </ol>
  );
}

/** Funktionskarten (Name, Icon, Nutzen, Plattformen aus den Funktionsgruppen) mit Karten-Szene aus lib/scenes.ts. */
function funktionsKarten(a: ContentArticle) {
  const details = getFunktionsgruppen().flatMap((gruppe) => gruppe.details);
  return a.relatedFeatures.map((slug) => {
    const eintrag = details.find((d) => d.slug === slug);
    const karte = cardScenes[slug];
    if (!eintrag || !karte) {
      throw new Error(
        `Artikel ${a.slug}: Funktion ${slug} hat keine Detailseite oder Karten-Szene – relatedFeatures prüfen.`,
      );
    }
    return { ...eintrag, karte };
  });
}

/**
 * Artikelvorlage v2 für /blog/[slug] und /hilfe/[slug] (09-UI-SPEC § 2; D-15–D-17; H1, H2, H6, H10).
 * <article> umfasst Kopf (ContentKopf mit Map-H1, #antwort bzw. Übergangs-Lead, Metazeile), Szene, Prosa, FAQ und
 * Quellen; das Inhaltsverzeichnis steht ab 1024 px sticky in der Seitenspalte, darunter als eingeklapptes details.
 * Danach „Passende Funktionen“ (FeatureCard), „Weiterlesen“ (LinkKarten) und das CTA-Band. Keine Client-Insel:
 * Die Schrittliste ist reines CSS auf der obersten nummerierten Liste der Prosa (globals.css, § 2.4).
 * Schema: Article (Ratgeber) bzw. TechArticle (Hilfe), FAQPage nur aus der sichtbaren Frontmatter-FAQ, kein Schritt-Schema (D-16).
 * Das Prosa-HTML stammt ausschließlich aus renderMarkdown (rehype-sanitize, T-09-10).
 */
export async function ArticlePage({ article: a }: { article: ContentArticle }) {
  const all = [...(await getContentList("blog")), ...(await getContentList("hilfe"))];
  // Reihenfolge des Frontmatters; Ziele, die (noch) nicht veröffentlicht sind, entfallen.
  const related = a.relatedArticles
    .map((pfad) => all.find((x) => "/" + x.kind + "/" + x.slug === pfad))
    .filter((x) => x !== undefined)
    .slice(0, 4);
  const pfad = "/" + a.kind + "/" + a.slug;
  const url = site.url + pfad;
  // H1 aus der Keyword-Map (08-04, D-17); der Frontmatter-Titel bleibt für Brotkrumen, Listen, Feed und Schema.
  const h1 = zielwerte(pfad).h1;
  const meta = [
    `Stand ${datum(a.updatedAt)}`,
    ...(a.publishedAt !== a.updatedAt ? [`Veröffentlicht ${datum(a.publishedAt)}`] : []),
    `${a.readingMinutes} Min. Lesezeit`,
    a.author,
  ];
  const mitToc = a.toc.length >= 3;
  const szene = a.scene ? sceneById[a.scene] : undefined;
  const karten = a.relatedFeatures.length > 0 ? funktionsKarten(a) : [];
  const lesen: LinkKarte[] = related.map((r) => ({
    href: "/" + r.kind + "/" + r.slug,
    label: r.kind === "blog" ? "Ratgeber" : "Hilfe",
    title: r.title,
    text: r.description,
    meta: `${r.readingMinutes} Min. Lesezeit`,
  }));
  // Flächenrhythmus: Kopf Warm → Text Weiß → abwechselnd Warm/Weiß für die vorhandenen Abschnitte → CTA dunkel.
  const flaecheWeiterlesen = karten.length > 0 ? "white" : "warm";

  return (
    <>
      <article aria-labelledby="artikel-titel">
        <ContentKopf
          id="artikel-titel"
          crumbs={crumbsFor(pfad, a.title)}
          eyebrow={categories[a.kind][a.category]}
          h1={h1}
          {...(a.answer !== undefined ? { answer: a.answer } : { lead: a.description })}
          meta={meta}
          platforms={a.platforms}
        />
        <div className="bg-white py-12 md:py-16 lg:py-24">
          <div className="site-container artikel-raster">
            {mitToc ? (
              <nav aria-label="Inhaltsverzeichnis" className="artikel-toc" data-toc="seite">
                <p className="artikel-toc-label">In diesem Artikel</p>
                <TocListe toc={a.toc} />
              </nav>
            ) : null}
            <div className="artikel-haupt">
              {mitToc ? (
                <details className="artikel-toc-mobil" data-toc="mobil">
                  <summary>
                    <span>Inhalt dieses Artikels</span>
                    <span className="artikel-toc-symbol" aria-hidden="true">
                      <Plus size={20} strokeWidth={2} />
                    </span>
                  </summary>
                  <TocListe toc={a.toc} />
                </details>
              ) : null}
              {szene && a.scene ? (
                <div
                  className="artikel-szene"
                  data-szene={a.scene}
                  data-rahmen={sceneFrame(szene)}
                >
                  <Frame visual={{ kind: sceneFrame(szene), scene: szene }} width={194} />
                </div>
              ) : null}
              <div className="article-prose" dangerouslySetInnerHTML={{ __html: a.html }} />
              {a.faq.length > 0 ? (
                <section className="artikel-faq" aria-labelledby="faq">
                  <h2 id="faq" className="artikel-h2">
                    Häufige Fragen
                  </h2>
                  <FaqList items={a.faq} headingLevel={3} zentral />
                </section>
              ) : null}
              {a.sources.length > 0 ? (
                <section className="artikel-quellen" aria-labelledby="quellen">
                  <h2 id="quellen">Quellen</h2>
                  <ol aria-label="Quellen">
                    {a.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} rel="noopener noreferrer">
                          {s.label}
                        </a>
                        {`, geprüft am ${datum(s.checkedAt)}`}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </article>

      {karten.length > 0 ? (
        <Abschnitt id="funktionen" surface="warm">
          <SectionHeader id="funktionen" title={NACH_ARTIKEL.funktionen.title} lead={NACH_ARTIKEL.funktionen.lead} />
          <ul
            role="list"
            aria-label={NACH_ARTIKEL.funktionen.title}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          >
            {karten.map((k) => (
              <li key={k.slug} data-funktion={k.slug} className="flex">
                <FeatureCard
                  slug={k.slug}
                  name={k.name}
                  icon={k.icon}
                  benefit={k.benefit}
                  platforms={k.platforms}
                  href={k.href}
                  visual={<Frame visual={{ kind: k.karte.kind, scene: k.karte.scene }} width={160} karte />}
                />
              </li>
            ))}
          </ul>
        </Abschnitt>
      ) : null}

      {lesen.length > 0 ? (
        <Abschnitt id="weiterlesen" surface={flaecheWeiterlesen}>
          <SectionHeader id="weiterlesen" title={NACH_ARTIKEL.weiterlesen.title} lead={NACH_ARTIKEL.weiterlesen.lead} />
          <LinkKarten
            items={lesen}
            label={NACH_ARTIKEL.weiterlesen.title}
            surface={flaecheWeiterlesen === "white" ? "warm" : "white"}
            columns={2}
          />
        </Abschnitt>
      ) : null}

      <div data-abschnitt="cta">
        <CtaBand {...CONTENT_CTA[a.kind]} />
      </div>

      {a.faq.length > 0 ? <JsonLd data={faqSchema(a.faq)} /> : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": a.kind === "blog" ? "Article" : "TechArticle",
          "@id": url + "#article",
          headline: a.title,
          description: a.description,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          inLanguage: "de-DE",
          author: {
            "@type": "Organization",
            name: a.author,
            "@id": site.url + "/#organization",
          },
          publisher: { "@id": site.url + "/#organization" },
          mainEntityOfPage: url,
          // LO-02: dasselbe Hauptbild wie og:image (Segmentbild des Artikels, 08-05).
          image: site.url + segmentBild(pfad),
          about: a.relatedFeatures.map((s) => ({
            "@id": site.url + "/funktionen/" + s,
          })),
        }}
      />
    </>
  );
}
