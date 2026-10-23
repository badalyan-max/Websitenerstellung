/**
 * Artikelvorlage v2, Übersichten und Kategorien (Phase 9, Plan 09-12; 09-UI-SPEC § 2, § 3, § 5, § 7; D-15–D-17).
 * Fixtures laufen durch parseContent und renderMarkdown wie echte Inhaltsdateien; Pfade sind echte Map-Einträge,
 * damit die H1 aus zielwerte() kommt. Muster: tests/funktionskopf.test.ts (decode/text/count).
 */
import fs from "node:fs";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ArticlePage } from "@/components/content/ArticlePage";
import { getContentArticle, getContentList, parseContent, renderMarkdown } from "@/lib/content";
import type { ContentArticle, ContentKind } from "@/lib/content-types";
import { zielwerte } from "@/lib/seo-meta";

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const text = (s: string) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const count = (html: string, needle: string) => html.split(needle).length - 1;
const h1s = (html: string) => [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
const ldBlocks = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]) as Record<string, unknown>,
  );
/** Inhalt des ersten Elements ab `start` bis zum passenden schließenden Tag (ohne Verschachtelung gleichen Namens). */
const block = (html: string, start: string, tag: string) => {
  const i = html.indexOf(start);
  if (i < 0) return "";
  const j = html.indexOf(`</${tag}>`, i);
  return html.slice(i, j + tag.length + 3);
};

const ANTWORT =
  "Material für einen Auftrag buchen Sie in der Mobile-App als Entnahme auf das Projekt. Ungenutztes Material buchen Sie mit einer Rückgabe zurück ins Lager.";
const FAQ = [
  { q: "Wo sehe ich die Entnahmen eines Projekts?", a: "In der Web-App unter Lager im Verlauf der Lagerbewegungen, gefiltert nach Projekt." },
  { q: "Kann ich eine Rückgabe teilweise buchen?", a: "Ja. Sie geben die zurückgebrachte Menge an; der Rest bleibt als Verbrauch am Projekt." },
  { q: "Wer darf Material entnehmen?", a: "Alle Rollen mit Zugriff auf das Lager in der Mobile-App." },
];

interface FixtureOptions {
  kind?: ContentKind;
  slug?: string;
  answer?: boolean;
  faq?: boolean;
  scene?: string;
  publishedAt?: string;
  updatedAt?: string;
  relatedFeatures?: string[];
  relatedArticles?: string[];
  body?: string;
}

const KOERPER = [
  "## Voraussetzungen",
  "",
  "- Voll-Lizenz oder App-Lizenz mit Zugriff auf das Lager",
  "- Mobile-App auf dem Gerät",
  "",
  "## Schritt für Schritt",
  "",
  "1. Öffnen Sie in der Mobile-App das Lager.",
  "2. Wählen Sie den Artikel aus.",
  "3. Tippen Sie auf „Entnahme“.",
  "",
  "### Rückgabe buchen",
  "",
  "Eine Rückgabe buchen Sie auf demselben Weg.",
  "",
  "## Ergebnis prüfen",
  "",
  "| Bewegung | Menge |",
  "| --- | --- |",
  "| Entnahme | 4 |",
  "",
].join("\n");

async function fixture(o: FixtureOptions = {}): Promise<ContentArticle> {
  const kind = o.kind ?? "hilfe";
  const slug = o.slug ?? "material-entnehmen-zurueckbuchen";
  const zeilen = [
    "---",
    'title: "Material für einen Auftrag entnehmen und zurückbuchen"',
    'description: "So erfassen Sie Projektverbrauch und ungenutzte Rückgaben mit den vorgesehenen Lagerbewegungen."',
    `category: "${kind === "hilfe" ? "lager" : "kalkulation"}"`,
    `publishedAt: "${o.publishedAt ?? "2026-09-09"}"`,
    `updatedAt: "${o.updatedAt ?? "2026-10-22"}"`,
    'author: "CraftOS Redaktion"',
    "draft: false",
    `relatedFeatures: ${JSON.stringify(o.relatedFeatures ?? ["lager", "projektverwaltung"])}`,
    `relatedArticles: ${JSON.stringify(o.relatedArticles ?? ["/hilfe/inventur-durchfuehren", "/blog/tiefenkalkulation-handwerk"])}`,
    "platforms: [\"mobile\", \"web\"]",
    "sources:",
    '  - label: "Gesetz über die Mehrwertsteuer"',
    '    url: "https://www.gesetze-im-internet.de/ustg_1980/"',
    '    checkedAt: "2026-10-05"',
  ];
  if (o.answer) zeilen.push(`answer: "${ANTWORT}"`);
  if (o.scene) zeilen.push(`scene: "${o.scene}"`);
  if (o.faq) {
    zeilen.push("faq:");
    for (const f of FAQ) zeilen.push(`  - q: "${f.q}"`, `    a: "${f.a}"`);
  }
  zeilen.push("---", "", o.body ?? KOERPER);
  const s = parseContent(zeilen.join("\n"), kind, slug);
  return { ...s, ...(await renderMarkdown(s.body)) };
}
const seite = async (o: FixtureOptions = {}) => renderToString(await ArticlePage({ article: await fixture(o) }));
/** Bereich innerhalb von <article>…</article>. */
const artikel = (html: string) => html.slice(html.indexOf("<article"), html.lastIndexOf("</article>") + 10);
const ausserhalb = (html: string) => html.slice(html.lastIndexOf("</article>"));

describe("Artikelvorlage v2: Kopf (09-UI-SPEC § 2.1)", () => {
  it("mit answer: genau eine H1 aus der Map, #antwort mit data-answer, kein Lead", async () => {
    const html = await seite({ answer: true });
    expect(h1s(html)).toEqual([zielwerte("/hilfe/material-entnehmen-zurueckbuchen").h1]);
    expect(count(html, 'id="antwort"')).toBe(1);
    expect(html).toMatch(/<p id="antwort" data-answer=""[^>]*>/);
    expect(text(block(html, '<p id="antwort"', "p"))).toBe(ANTWORT);
    expect(html).not.toContain("So erfassen Sie Projektverbrauch und ungenutzte Rückgaben");
    expect(html).not.toContain("PageHero");
  });

  it("ohne answer: description als Lead ohne id (Übergang Welle 1–2)", async () => {
    const html = await seite();
    expect(html).not.toContain('id="antwort"');
    expect(html).not.toContain("data-answer");
    expect(text(html)).toContain(
      "So erfassen Sie Projektverbrauch und ungenutzte Rückgaben mit den vorgesehenen Lagerbewegungen.",
    );
  });

  it("Metazeile als Liste ohne Trennzeichen; „Veröffentlicht“ nur bei abweichendem Datum", async () => {
    const html = await seite();
    const meta = block(html, '<ul aria-label="Angaben zum Artikel"', "ul");
    const angaben = [...meta.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => text(m[1]));
    expect(angaben).toEqual(["Stand 22.10.2026", "Veröffentlicht 09.09.2026", "1 Min. Lesezeit", "CraftOS Redaktion"]);
    expect(meta).not.toContain("·");
    const gleich = await seite({ publishedAt: "2026-10-22" });
    const angaben2 = [...block(gleich, '<ul aria-label="Angaben zum Artikel"', "ul").matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map(
      (m) => text(m[1]),
    );
    expect(angaben2).toEqual(["Stand 22.10.2026", "1 Min. Lesezeit", "CraftOS Redaktion"]);
  });

  it("Brotkrumen nur im Kopf, Eyebrow = Kategoriename, kein CTA im Kopf", async () => {
    const html = await seite();
    expect(count(html, 'aria-label="Brotkrumen"')).toBe(1);
    const kopf = block(html, '<section', "section");
    expect(text(kopf)).toContain("Lager");
    expect(kopf).not.toContain('data-track="trial"');
  });
});

describe("Artikelvorlage v2: Inhalt (09-UI-SPEC § 2.2)", () => {
  it("<article aria-labelledby> umfasst Kopf, Prosa, FAQ und Quellen", async () => {
    const html = await seite({ faq: true });
    const a = artikel(html);
    expect(html).toMatch(/<article[^>]*aria-labelledby="artikel-titel"/);
    expect(a).toContain('id="artikel-titel"');
    expect(a).toContain('class="article-prose"');
    expect(a).toContain('id="faq"');
    expect(a).toContain('id="quellen"');
  });

  it("Inhaltsverzeichnis ab 3 Einträgen: nav mit Label-Absatz und details mit summary", async () => {
    const html = await seite();
    expect(count(html, 'aria-label="Inhaltsverzeichnis"')).toBeGreaterThanOrEqual(1);
    const nav = block(html, '<nav aria-label="Inhaltsverzeichnis"', "nav");
    expect(nav).toContain("#voraussetzungen");
    expect(html).toMatch(/<p[^>]*>In diesem Artikel<\/p>/);
    expect(html).not.toMatch(/<h[1-6][^>]*>In diesem Artikel/);
    expect(html).toMatch(/<details[^>]*>\s*<summary[^>]*>[\s\S]*?Inhalt dieses Artikels/);
  });

  it("kein Inhaltsverzeichnis unter 3 Einträgen", async () => {
    const html = await seite({ body: "## Erste Frage\n\nText.\n\n## Zweite Frage\n\nText.\n" });
    expect(html).not.toContain('aria-label="Inhaltsverzeichnis"');
    expect(html).not.toContain("Inhalt dieses Artikels");
  });

  it("mit faq: H2 #faq „Häufige Fragen“, FaqList und genau eine FAQPage mit denselben Fragen", async () => {
    const html = await seite({ faq: true });
    expect(html).toMatch(/<h2[^>]*id="faq"[^>]*>Häufige Fragen<\/h2>/);
    for (const f of FAQ) expect(decode(html)).toContain(f.q);
    const faqs = ldBlocks(html).filter((b) => b["@type"] === "FAQPage");
    expect(faqs).toHaveLength(1);
    const fragen = (faqs[0].mainEntity as { name: string; acceptedAnswer: { text: string } }[]).map((e) => [
      e.name,
      e.acceptedAnswer.text,
    ]);
    expect(fragen).toEqual(FAQ.map((f) => [f.q, f.a]));
  });

  it("ohne faq: keine FAQPage und kein #faq", async () => {
    const html = await seite();
    expect(ldBlocks(html).some((b) => b["@type"] === "FAQPage")).toBe(false);
    expect(html).not.toContain('id="faq"');
  });

  it("mit scene: figure mit Kennzeichnung; ohne: keine figure", async () => {
    const mit = await seite({ scene: "lagerApp" });
    expect(artikel(mit)).toContain("<figure");
    expect(text(artikel(mit))).toContain("Vereinfachte Darstellung mit Beispieldaten");
    expect(mit).toContain('data-szene="lagerApp"');
    const browser = await seite({ scene: "rechnungen" });
    expect(browser).toContain('data-szene="rechnungen"');
    const ohne = await seite();
    expect(artikel(ohne)).not.toContain("<figure");
  });

  it("Quellen: H2 #quellen, ol mit aria-label, Eintrag „{label}, geprüft am TT.MM.JJJJ“", async () => {
    const html = await seite();
    expect(html).toMatch(/<h2[^>]*id="quellen"[^>]*>Quellen<\/h2>/);
    const ol = block(html, '<ol aria-label="Quellen"', "ol");
    expect(text(ol)).toBe("Gesetz über die Mehrwertsteuer, geprüft am 05.10.2026");
    expect(ol).toContain('href="https://www.gesetze-im-internet.de/ustg_1980/"');
    expect(ol).not.toContain('target="_blank"');
  });

  it("#funktionen und #weiterlesen außerhalb von <article>, mit Lead; Weiterlesen als LinkKarten", async () => {
    const html = await seite();
    const a = artikel(html);
    const nach = ausserhalb(html);
    expect(a).not.toContain('id="funktionen"');
    expect(a).not.toContain('id="weiterlesen"');
    expect(nach).toMatch(/<h2[^>]*id="funktionen"[^>]*>Passende Funktionen<\/h2>/);
    expect(text(nach)).toContain("Diese Funktionen setzen das Thema des Artikels in CraftOS um.");
    expect(count(nach, "Mehr zu ")).toBe(2);
    expect(nach).toMatch(/<h2[^>]*id="weiterlesen"[^>]*>Weiterlesen<\/h2>/);
    expect(text(nach)).toContain("Diese Artikel führen das Thema weiter.");
    const liste = block(nach, '<ul role="list" aria-label="Weiterlesen"', "ul");
    expect(count(liste, "<article")).toBe(2);
    expect(liste).toContain('href="/hilfe/inventur-durchfuehren"');
    expect(text(liste)).toContain("Ratgeber");
    expect(text(liste)).toContain("Hilfe");
  });

  it("ohne relatedFeatures/relatedArticles: keine Abschnitte #funktionen/#weiterlesen", async () => {
    const html = await seite({ relatedFeatures: [], relatedArticles: [] });
    expect(html).not.toContain('id="funktionen"');
    expect(html).not.toContain('id="weiterlesen"');
  });

  it("CTA-Band: Hilfe mit „Support kontaktieren“, Ratgeber mit „Stundensatz berechnen“", async () => {
    const hilfe = await seite();
    expect(hilfe).toMatch(/href="\/support"[^>]*>Support kontaktieren</);
    expect(text(hilfe)).toContain("Machen Sie Platz für Ihr Handwerk.");
    const blog = await seite({ kind: "blog", slug: "tiefenkalkulation-handwerk", relatedArticles: [] });
    expect(blog).toMatch(/href="\/rechner\/stundensatz"[^>]*>Stundensatz berechnen</);
    expect(count(blog, 'data-track="trial"')).toBe(1);
  });

  it("Schema: TechArticle (Hilfe) bzw. Article (Ratgeber), kein HowTo", async () => {
    const hilfe = ldBlocks(await seite({ faq: true }));
    expect(hilfe.some((b) => b["@type"] === "TechArticle")).toBe(true);
    const blog = ldBlocks(await seite({ kind: "blog", slug: "tiefenkalkulation-handwerk" }));
    expect(blog.some((b) => b["@type"] === "Article")).toBe(true);
    expect(JSON.stringify([...hilfe, ...blog])).not.toContain("HowTo");
  });

  it("Schrittliste: oberste ol mit role=list in der Prosa, ohne Client-Insel", async () => {
    const html = await seite();
    expect(block(html, 'class="article-prose"', "div")).toContain('<ol role="list">');
    const quelle = fs.readFileSync(path.resolve(import.meta.dirname, "../components/content/ArticlePage.tsx"), "utf8");
    expect(quelle).not.toContain("use client");
    expect(quelle).not.toContain("HowTo");
  });
});

describe("Prosa v2 und Schrittliste (09-UI-SPEC § 2.3, § 2.4; G10, H1, H6)", () => {
  const css = fs.readFileSync(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");
  const regel = (selektor: string) => {
    const i = css.indexOf(selektor + " {");
    expect(i, `Regel ${selektor} fehlt`).toBeGreaterThanOrEqual(0);
    return css.slice(i, css.indexOf("}", i));
  };

  it("Schrittliste: Zähler, Ausweichzeile vor der Alt-Text-Zeile, Sechseck 40 × 40 in #F2AF38", () => {
    const ol = regel(".article-prose > ol");
    expect(ol).toContain("counter-reset: schritt");
    expect(ol).toContain("list-style: none");
    const knoten = regel(".article-prose > ol > li::before");
    const ausweich = knoten.indexOf("content: counter(schritt);");
    const stumm = knoten.indexOf('content: counter(schritt) / "";');
    expect(ausweich).toBeGreaterThanOrEqual(0);
    expect(stumm).toBeGreaterThan(ausweich);
    expect(knoten).toContain("clip-path: polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)");
    expect(knoten).toContain("width: 40px");
    expect(knoten).toContain("height: 40px");
    expect(knoten.toLowerCase()).toContain("#f2af38");
    const linie = regel(".article-prose > ol > li:not(:last-child)::after");
    expect(linie).toContain("border-block: 2px solid #f2af38");
  });

  it("v2-Skala: Text 16/1.5, H2 32 mit Trennregeln und scroll-margin, H3 20; Zitat ohne Amber; Links #784B10", () => {
    const basis = regel(".article-prose");
    expect(basis).toContain("font-size: 16px");
    expect(basis).toContain("line-height: 1.5");
    const h2 = regel(".article-prose h2");
    expect(h2).toContain("font-size: 32px");
    expect(h2).toContain("hyphens: auto");
    expect(h2).toContain("hyphenate-limit-chars: 10 4 4");
    expect(h2).toContain("overflow-wrap: break-word");
    expect(h2).toContain("scroll-margin-top: 100px");
    expect(regel(".article-prose h3")).toContain("font-size: 20px");
    const zitat = regel(".article-prose blockquote");
    expect(zitat.toLowerCase()).not.toContain("#f2af38");
    expect(zitat.toLowerCase()).toContain("#e7dcc9");
    expect(regel(".article-prose a").toLowerCase()).toContain("#784b10");
    expect(regel(".table-scroll")).toContain("overflow-x: auto");
  });
});

describe("Bestand: alle realen Artikel rendern in der v2-Vorlage", () => {
  it("genau eine H1 = Map, Article/TechArticle, kein HowTo, FAQPage nur mit sichtbarer FAQ", async () => {
    const probleme: string[] = [];
    for (const kind of ["blog", "hilfe"] as const)
      for (const s of await getContentList(kind)) {
        const pfad = `/${kind}/${s.slug}`;
        const a = (await getContentArticle(kind, s.slug))!;
        const html = renderToString(await ArticlePage({ article: a }));
        if (JSON.stringify(h1s(html)) !== JSON.stringify([zielwerte(pfad).h1])) probleme.push(`${pfad}: H1`);
        const ld = ldBlocks(html);
        if (!ld.some((b) => b["@type"] === (kind === "blog" ? "Article" : "TechArticle"))) probleme.push(`${pfad}: Schema`);
        if (html.includes("HowTo")) probleme.push(`${pfad}: HowTo`);
        const faqPage = ld.some((b) => b["@type"] === "FAQPage");
        if (faqPage !== a.faq.length > 0) probleme.push(`${pfad}: FAQPage ohne sichtbare FAQ`);
        if (!html.includes('<article aria-labelledby="artikel-titel"')) probleme.push(`${pfad}: article`);
      }
    expect(probleme).toEqual([]);
  }, 120_000);
});
