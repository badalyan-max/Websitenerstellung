import { describe, it, expect, vi } from "vitest";
import fs from "node:fs/promises";
import {
  getContentList,
  getContentArticle,
  parseContent,
  prosaProbleme,
  renderMarkdown,
} from "@/lib/content";
import { funktionen } from "@/lib/funktionen";
import { categories, categoryIcons } from "@/lib/content-types";
import { keywordMap } from "@/lib/keyword-map";
import * as szenen from "@/lib/scenes";
import { allScenes, sceneById, sceneFrame } from "@/lib/scenes";
import sitemap from "@/app/sitemap";
import { GET } from "@/app/feed.xml/route";
describe("published content", () => {
  // Phase 9 (D-27, K-5; 09-RESEARCH Pattern 4): Map-Bezug plus Endmengen der Integration (09-09):
  // 30 Ratgeber, 54 Hilfeartikel (40 Bestand + 10 neue Anleitungen + 3 Wissensseiten + Kassenbuch, D-32).
  it("Endmengen: 30 Ratgeber und 54 Hilfeartikel (09-09)", async () => {
    expect(await getContentList("blog")).toHaveLength(30);
    expect(await getContentList("hilfe")).toHaveLength(54);
  });
  it("jede Inhaltsdatei hat einen Map-Eintrag, jeder bestehende Artikel-Eintrag eine Datei", async () => {
    const artikelEintraege = keywordMap.filter(
      (e) => /^\/(blog|hilfe)\/[^/]+$/.test(e.path) && !e.path.includes("/kategorie/"),
    );
    const dateien = new Set<string>();
    for (const kind of ["blog", "hilfe"] as const)
      for (const a of await getContentList(kind)) {
        const pfad = `/${kind}/${a.slug}`;
        dateien.add(pfad);
        expect(artikelEintraege.some((e) => e.path === pfad), `${pfad}: Map-Eintrag fehlt`).toBe(true);
      }
    expect(dateien.size).toBe(84);
    for (const e of artikelEintraege) {
      expect(e.status, `${e.path}: Artikel-Eintrag ist veröffentlicht`).toBe("bestehend");
      expect(dateien.has(e.path), `${e.path}: bestehend, aber keine Datei`).toBe(true);
    }
  });
  // D-18 (09-09): answer ist Pflicht; B2: Listenobergrenzen für alle veröffentlichten Artikel.
  it("jeder Artikel hat eine Antwort (≤ 300, 1–2 Sätze) und höchstens 3 Funktionen und 4 Artikel", async () => {
    let n = 0;
    for (const kind of ["blog", "hilfe"] as const)
      for (const a of await getContentList(kind)) {
        n++;
        expect(typeof a.answer, `${kind}/${a.slug}: answer fehlt`).toBe("string");
        expect(Array.from(a.answer!.trim()).length, a.slug).toBeLessThanOrEqual(300);
        expect(a.relatedFeatures.length, a.slug).toBeLessThanOrEqual(3);
        expect(a.relatedArticles.length, a.slug).toBeLessThanOrEqual(4);
      }
    expect(n).toBe(84);
  });
  it("has valid categories, source metadata and feature links", async () => {
    for (const kind of ["blog", "hilfe"] as const) {
      for (const a of await getContentList(kind)) {
        expect(categories[kind][a.category]).toBeTruthy();
        expect(a.draft).toBe(false);
        expect(a.updatedAt >= a.publishedAt).toBe(true);
        for (const f of a.relatedFeatures)
          expect(
            funktionen.some((x) => x.slug === f),
            a.slug + ":" + f,
          ).toBe(true);
        // 09-REVIEW LO-06: jedes Ziel ist ein veröffentlichter Ratgeber- oder Hilfeartikel und nicht der Artikel
        // selbst; die Vorlage filtert nicht auflösbare Ziele still weg, daher muss der Test sie finden.
        for (const url of a.relatedArticles) {
          expect(url, `${kind}/${a.slug}`).toMatch(/^\/(blog|hilfe)\/[a-z0-9]+(?:-[a-z0-9]+)*$/);
          expect(url, `${kind}/${a.slug}: verweist auf sich selbst`).not.toBe(`/${kind}/${a.slug}`);
          const [, k, s] = url.split("/");
          expect(await getContentArticle(k as "blog" | "hilfe", s), url).not.toBeNull();
        }
      }
    }
    // 08-09: Unter der vollen Vitest-Suite liest dieser Fall alle Artikel unter Last und lief ins 5-s-Limit
    // (deferred-items 08-07/08-08); einzeln grün. Zeitlimit wie bei den Render-Prüfungen aus 08-04.
  }, 60_000);
  it("uses published dates in sitemap and excludes unknown addresses", async () => {
    const list = await sitemap();
    expect(list.every((x) => !(x.lastModified instanceof Date))).toBe(true);
    // K-11 (09-09): Übersichten /blog und /hilfe tragen das Datum der Phase-9-Überarbeitung statt des Standards.
    // 09-REVIEW LO-08: zusätzlich das jüngste updatedAt der Artikel, damit ein neuer Artikel die Übersicht mitzieht.
    for (const kind of ["blog", "hilfe"] as const) {
      const e = list.find((x) => new URL(x.url).pathname === `/${kind}`);
      const juengstes = (await getContentList(kind)).reduce((m, a) => (a.updatedAt > m ? a.updatedAt : m), "2026-10-23");
      expect(e?.lastModified, kind).toBe(juengstes);
    }
    const { uebersichtStand } = await import("@/lib/content");
    expect(uebersichtStand([{ updatedAt: "2026-11-02" }, { updatedAt: "2026-10-01" }])).toBe("2026-11-02");
    expect(uebersichtStand([{ updatedAt: "2026-10-01" }])).toBe("2026-10-23");
    // /gewerke aus derselben Konstante wie die Gewerke-Seiten (keine doppelte Pflege).
    const { GEWERKE_STAND } = await import("@/lib/gewerke");
    expect(list.find((x) => new URL(x.url).pathname === "/gewerke")?.lastModified).toBe(GEWERKE_STAND);
    expect(await getContentArticle("blog", "../../package")).toBeNull();
    expect(await getContentArticle("hilfe", "does-not-exist")).toBeNull();
  });
  it("renders a populated RSS feed without draft entries", async () => {
    const xml = await (await GET()).text();
    const ratgeber = (await getContentList("blog")).length;
    expect(ratgeber).toBe(30);
    expect(xml.match(/<item>/g)?.length, "RSS-Items = Zahl der Ratgeber").toBe(ratgeber);
  });
  it("renders safe HTML and unique heading anchors", async () => {
    const rendered = await renderMarkdown(
      "## Beispiel\n\nText [gefährlich](javascript:alert%281%29)\n\n<script>alert(1)</script>\n\n## Beispiel",
    );
    expect(rendered.html).not.toContain("<script");
    expect(rendered.html).not.toContain('href="javascript:');
    expect(rendered.toc.map((h) => h.id)).toEqual(["beispiel", "beispiel-1"]);
  });
  it("Inhaltsverzeichnis aus dem hast-Baum: Titel ohne HTML-Entities, mit Inline-Code und Links (LO-02)", async () => {
    const { toc } = await renderMarkdown(
      '## Gilt die Grenze < 250 €?\n\nText.\n\n### A & B "zitiert"\n\nText.\n\n## Feld `Betrag` und [Link](/hilfe)\n\nText.\n\n#### Tiefer\n\nText.',
    );
    expect(toc).toEqual([
      { level: 2, id: "gilt-die-grenze--250-", title: "Gilt die Grenze < 250 €?" },
      { level: 3, id: "a--b-zitiert", title: 'A & B "zitiert"' },
      { level: 2, id: "feld-betrag-und-link", title: "Feld Betrag und Link" },
    ]);
  });
  it("requires explicit draft status and consistent metadata", () => {
    expect(() =>
      parseContent("---\ntitle: Test\n---\nText", "blog", "test"),
    ).toThrow();
  });
  it("keeps a valid draft out of detail pages, search lists, sitemap and feed", async () => {
    const draft = [
      "---",
      "title: Unveröffentlichter Entwurf",
      "description: Nur für die Redaktion",
      "category: rechnungen",
      'publishedAt: "2026-09-09"',
      'updatedAt: "2026-09-09"',
      "author: CraftOS",
      "draft: true",
      'answer: "Ein Entwurf hat bereits eine Antwort."',
      "relatedFeatures: []",
      "relatedArticles: []",
      "sources: []",
      "---",
      "## Entwurf",
      "Noch nicht veröffentlichen.",
    ].join("\n");
    const readDirectory = vi
      .spyOn(fs, "readdir")
      .mockImplementation(async () => ["entwurf.md"] as never);
    const readFile = vi.spyOn(fs, "readFile").mockResolvedValue(draft);
    try {
      expect(await getContentList("blog")).toEqual([]);
      expect(await getContentList("hilfe")).toEqual([]);
      expect(await getContentArticle("blog", "entwurf")).toBeNull();
      expect(
        (await sitemap()).some((entry) => entry.url.endsWith("/entwurf")),
      ).toBe(false);
      expect(await (await GET()).text()).not.toContain(
        "Unveröffentlichter Entwurf",
      );
    } finally {
      readDirectory.mockRestore();
      readFile.mockRestore();
    }
  });
});

/**
 * 08-04 (D-06, D-17): Ratgeber, Hilfe, Kategorien, Übersichten und Gewerke beziehen Title, Description und H1
 * ausschließlich aus docs/seo/keyword-map.json (metaFor/zielwerte).
 */
describe("Inhaltsrouten folgen der Keyword-Map (08-04)", () => {
  type Meta = { title?: unknown; description?: unknown; openGraph?: { type?: string; images?: unknown }; twitter?: { images?: unknown } };
  const gerenderterTitel = (m: Meta) =>
    typeof m.title === "string" ? `${m.title} | CraftOS` : (m.title as { absolute: string } | undefined)?.absolute;
  const decode = (s: string) =>
    s
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  const h1s = (html: string) => [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));

  it("Artikel: Title, Description und OG-Artikelfelder aus metaFor, H1 aus der Map", async () => {
    const { renderToString } = await import("react-dom/server");
    const { ArticlePage } = await import("@/components/content/ArticlePage");
    const { zielwerte } = await import("@/lib/seo-meta");
    const routen = {
      blog: await import("@/app/blog/[slug]/page"),
      hilfe: await import("@/app/hilfe/[slug]/page"),
    };
    for (const kind of ["blog", "hilfe"] as const) {
      for (const a of await getContentList(kind)) {
        const pfad = `/${kind}/${a.slug}`;
        const z = zielwerte(pfad);
        const meta = (await routen[kind].generateMetadata({ params: Promise.resolve({ slug: a.slug }) })) as Meta;
        expect(gerenderterTitel(meta), `${pfad}: Title`).toBe(z.title);
        expect(meta.description, `${pfad}: Description`).toBe(z.description);
        expect(meta.openGraph?.type, `${pfad}: og:type`).toBe("article");
        expect(JSON.stringify(meta.openGraph?.images), `${pfad}: og:image`).toContain(`${pfad}/opengraph-image`);
        expect(JSON.stringify(meta.twitter?.images), `${pfad}: twitter:image`).toContain(`${pfad}/opengraph-image`);
        const html = renderToString(await ArticlePage({ article: (await getContentArticle(kind, a.slug))! }));
        expect(h1s(html), `${pfad}: genau eine H1 = Map`).toEqual([z.h1]);
        // LO-02: Article/TechArticle-Schema nennt dasselbe Hauptbild wie og:image (Segmentbild des Artikels).
        const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
          .map((m) => JSON.parse(m[1]) as { "@type"?: string; image?: string })
          .find((d) => d["@type"] === "Article" || d["@type"] === "TechArticle");
        expect(ld?.image, `${pfad}: Schema-Bild`).toBe(`https://craftos.eu${pfad}/opengraph-image`);
      }
    }
  }, 60_000);

  it("Kategorien und Übersichten: Metadaten über metaFor, ContentIndex-H1 aus der Map", async () => {
    const { renderToString } = await import("react-dom/server");
    const { ContentIndex } = await import("@/components/content/ContentIndex");
    const { zielwerte } = await import("@/lib/seo-meta");
    const kat = {
      blog: await import("@/app/blog/kategorie/[category]/page"),
      hilfe: await import("@/app/hilfe/kategorie/[category]/page"),
    };
    const uebersicht = { blog: await import("@/app/blog/page"), hilfe: await import("@/app/hilfe/page") };
    for (const kind of ["blog", "hilfe"] as const) {
      const z = zielwerte(`/${kind}`);
      expect(gerenderterTitel(uebersicht[kind].metadata as Meta), `/${kind}: Title`).toBe(z.title);
      expect(uebersicht[kind].metadata.description, `/${kind}: Description`).toBe(z.description);
      expect(h1s(renderToString(await ContentIndex({ kind }))), `/${kind}: H1`).toEqual([z.h1]);
      for (const category of Object.keys(categories[kind])) {
        const pfad = `/${kind}/kategorie/${category}`;
        const zk = zielwerte(pfad);
        const meta = (await kat[kind].generateMetadata({ params: Promise.resolve({ category }) })) as Meta;
        expect(gerenderterTitel(meta), `${pfad}: Title`).toBe(zk.title);
        expect(meta.description, `${pfad}: Description`).toBe(zk.description);
        expect(zk.h1.startsWith(kind === "blog" ? "Ratgeber: " : "Hilfe: "), pfad).toBe(true);
        expect(h1s(renderToString(await ContentIndex({ kind, category }))), `${pfad}: H1`).toEqual([zk.h1]);
      }
      expect(await kat[kind].generateMetadata({ params: Promise.resolve({ category: "gibt-es-nicht" }) })).toEqual({});
    }
  }, 60_000);

  it("Gewerke: Übersicht und Detailseiten aus der Map, keine eigenen SEO-Felder mehr", async () => {
    const { renderToString } = await import("react-dom/server");
    const { zielwerte } = await import("@/lib/seo-meta");
    const { gewerke } = await import("@/lib/gewerke");
    const uebersicht = await import("@/app/gewerke/page");
    const detail = await import("@/app/gewerke/[slug]/page");
    const z = zielwerte("/gewerke");
    expect(gerenderterTitel(uebersicht.metadata as Meta)).toBe(z.title);
    expect(uebersicht.metadata.description).toBe(z.description);
    expect(h1s(renderToString(uebersicht.default()))).toEqual([z.h1]);
    for (const g of gewerke) {
      const pfad = `/gewerke/${g.slug}`;
      const zg = zielwerte(pfad);
      expect(Object.hasOwn(g, "seoTitle") || Object.hasOwn(g, "seoDescription"), pfad).toBe(false);
      const meta = (await detail.generateMetadata({ params: Promise.resolve({ slug: g.slug }) })) as Meta;
      expect(gerenderterTitel(meta), `${pfad}: Title`).toBe(zg.title);
      expect(meta.description, `${pfad}: Description`).toBe(zg.description);
      const html = renderToString(await detail.default({ params: Promise.resolve({ slug: g.slug }) }));
      expect(h1s(html), `${pfad}: H1`).toEqual([zg.h1]);
    }
  }, 60_000);
});

/**
 * Phase 9, Inhaltsvertrag (09-01 Aufgabe 2; D-15, D-18, D-24, B2, W3; 09-UI-SPEC § 2.2–2.4, § 4, § 5).
 * Frontmatter answer/faq/scene, Listenobergrenzen, Rehype-Schritt und Prosa-Regeln mit den Fehlertexten aus § 5.
 */
const kopf = (extra: string[] = [], features = "[]", articles = "[]") =>
  [
    "---",
    'title: "Testartikel"',
    'description: "Beschreibung"',
    'category: "rechnungen"',
    'publishedAt: "2026-09-09"',
    'updatedAt: "2026-09-09"',
    'author: "CraftOS Redaktion"',
    "draft: false",
    `relatedFeatures: ${features}`,
    `relatedArticles: ${articles}`,
    "sources: []",
    // answer ist seit 09-09 Pflicht; Fälle mit eigener answer bringen sie in extra mit.
    ...(extra.some((z) => z.startsWith("answer:")) ? [] : ['answer: "Kurze Antwort."']),
    ...extra,
    "---",
    "Text.",
  ].join("\n");
const ohneAnswer = () => kopf().replace('answer: "Kurze Antwort."\n', "");
const faqYaml = (n: number, q = (i: number) => `Frage ${i}?`, a = () => "Antwort.") =>
  `faq: ${JSON.stringify(Array.from({ length: n }, (_, i) => ({ q: q(i + 1), a: a() })))}`;

describe("Frontmatter answer, faq, scene und Listenobergrenzen (D-18, B2)", () => {
  it("Artikel ohne faq und scene bleibt gültig; faq ist dann leer", () => {
    const a = parseContent(kopf(), "blog", "test");
    expect(a.answer).toBe("Kurze Antwort.");
    expect(a.faq).toEqual([]);
    expect(a.scene).toBeUndefined();
  });

  it("answer ist Pflicht (D-18, ab 09-09): fehlende oder leere answer wirft", () => {
    expect(ohneAnswer()).not.toContain("answer:");
    expect(() => parseContent(ohneAnswer(), "blog", "test")).toThrow(
      "Artikel test: Antwort fehlt – Frontmatter answer mit ein bis zwei Sätzen (≤ 300 Zeichen) ergänzen.",
    );
    expect(() => parseContent(kopf(['answer: ""']), "hilfe", "test")).toThrow(
      "Artikel test: Antwort fehlt – Frontmatter answer mit ein bis zwei Sätzen (≤ 300 Zeichen) ergänzen.",
    );
  });

  it("answer, faq und scene werden übernommen", () => {
    const a = parseContent(
      kopf(['answer: "Eine kurze Antwort. Mit zweitem Satz."', faqYaml(3), 'scene: "rechnungen"']),
      "blog",
      "test",
    );
    expect(a.answer).toBe("Eine kurze Antwort. Mit zweitem Satz.");
    expect(a.faq).toHaveLength(3);
    expect(a.faq[0]).toEqual({ q: "Frage 1?", a: "Antwort." });
    expect(a.scene).toBe("rechnungen");
  });

  it("answer mit 301 Zeichen bzw. 3 Sätzen wirft", () => {
    expect(() => parseContent(kopf([`answer: "${"x".repeat(300)}."`]), "blog", "test")).toThrow(
      "Textbudget überschritten: answer hat 301 von 300 Zeichen – Satz kürzen.",
    );
    expect(() => parseContent(kopf(['answer: "Eins. Zwei. Drei."']), "blog", "test")).toThrow(
      "Artikel test: Antwort hat 3 Sätze – ein bis zwei Sätze schreiben.",
    );
  });

  it("faq: 2 Einträge, Frage ohne „?“, Frage > 90 und Antwort > 300 werfen", () => {
    expect(() => parseContent(kopf([faqYaml(2)]), "blog", "test")).toThrow("Artikel test: 2 FAQ-Fragen – 3 bis 8 erforderlich.");
    expect(() => parseContent(kopf([faqYaml(9)]), "blog", "test")).toThrow("Artikel test: 9 FAQ-Fragen – 3 bis 8 erforderlich.");
    expect(() => parseContent(kopf([faqYaml(3, (i) => `Frage ${i}`)]), "blog", "test")).toThrow(
      "Artikel test: FAQ-Frage ‚Frage 1‘ endet nicht mit „?“ – als Frage formulieren.",
    );
    expect(() => parseContent(kopf([faqYaml(3, () => `${"x".repeat(90)}?`)]), "blog", "test")).toThrow(
      "Textbudget überschritten: faq.question hat 91 von 90 Zeichen – Satz kürzen.",
    );
    expect(() => parseContent(kopf([faqYaml(3, undefined, () => `${"x".repeat(300)}.`)]), "blog", "test")).toThrow(
      "Textbudget überschritten: faq.answerCentral hat 301 von 300 Zeichen – Satz kürzen.",
    );
  });

  it("unbekannte Szene wirft den Fehlertext aus § 5", () => {
    expect(() => parseContent(kopf(['scene: "gibtsnicht"']), "hilfe", "test")).toThrow(
      "Artikel test: Szene ‚gibtsnicht‘ ist unbekannt – nur IDs aus sceneById verwenden.",
    );
  });

  it("höchstens 3 relatedFeatures und 4 relatedArticles (B2)", () => {
    const f = JSON.stringify(["angebote", "rechnungen", "mahnwesen", "dashboard"]);
    const a = JSON.stringify(["/blog/a", "/blog/b", "/blog/c", "/blog/d", "/blog/e"]);
    expect(() => parseContent(kopf([], f), "blog", "test")).toThrow(
      "Artikel test: 4 relatedFeatures – höchstens 3, die wichtigsten behalten.",
    );
    expect(() => parseContent(kopf([], "[]", a), "blog", "test")).toThrow(
      "Artikel test: 5 relatedArticles – höchstens 4, die wichtigsten behalten.",
    );
    expect(() => parseContent(kopf([], JSON.stringify(["angebote", "rechnungen", "mahnwesen"])), "blog", "test")).not.toThrow();
  });
});

describe("Rehype-Schritt hinter rehype-sanitize (G10, T-09-01)", () => {
  it("oberste ol erhält role=list, verschachtelte nicht", async () => {
    const { html } = await renderMarkdown("## Ablauf\n\n1. Erster Schritt\n   1. Unterpunkt\n   2. Unterpunkt\n2. Zweiter Schritt\n");
    expect(html.match(/<ol role="list">/g)).toHaveLength(1);
    expect(html.match(/<ol>/g)).toHaveLength(1);
  });

  it("jede Tabelle steckt in div.table-scroll[role=region][tabindex=0] mit H2-Label", async () => {
    const md = "## Preise im Vergleich\n\nText.\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n## Zweite & Liste\n\n| C |\n|---|\n| 3 |\n";
    const { html } = await renderMarkdown(md);
    expect(html).toContain(
      '<div class="table-scroll" role="region" tabindex="0" aria-label="Tabelle: Preise im Vergleich"><table>',
    );
    expect(html).toContain('aria-label="Tabelle: Zweite &#x26; Liste"');
    expect(html.match(/<div class="table-scroll"/g)).toHaveLength(2);
    expect(html.match(/<\/table><\/div>/g)).toHaveLength(2);
  });

  it("Tabelle ohne vorherige H2 heißt nur „Tabelle“", async () => {
    const { html } = await renderMarkdown("| A |\n|---|\n| 1 |\n");
    expect(html).toContain('aria-label="Tabelle"');
  });

  it("script und javascript:-Links bleiben entfernt; role/tabindex aus Markdown-HTML kommen nicht durch", async () => {
    const { html } = await renderMarkdown(
      '<ol role="menu"><li>x</li></ol>\n\n<div tabindex="5" role="region">y</div>\n\n[a](javascript:alert(1))\n\n<script>alert(1)</script>',
    );
    expect(html).not.toContain("<script");
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain('role="menu"');
    expect(html).not.toContain('tabindex="5"');
  });

  it("TOC liest weiter H2/H3 mit id", async () => {
    const { toc } = await renderMarkdown("## Eins\n\n### Zwei\n\n| A |\n|---|\n| 1 |\n");
    expect(toc).toEqual([
      { level: 2, id: "eins", title: "Eins" },
      { level: 3, id: "zwei", title: "Zwei" },
    ]);
  });
});

describe("Prosa-Regeln (09-UI-SPEC § 2.3–2.4, § 5)", () => {
  const regeln = async (md: string, faq: { q: string; a: string }[] = []) =>
    (await prosaProbleme("test", md, faq)).map((p) => p.meldung);

  it("Bild im Text", async () => {
    expect(await regeln("Text ![Bild](https://example.com/a.png)")).toEqual([
      "Artikel test: Bild im Text gefunden – Screenshots sind nicht erlaubt, Szene per Frontmatter nutzen.",
    ]);
  });

  it("Liste mit Startnummer", async () => {
    expect(await regeln("3. Drei\n4. Vier\n")).toEqual([
      "Artikel test: nummerierte Liste beginnt bei 3 – jede Liste beginnt bei 1, Startnummer entfernen.",
    ]);
  });

  it("Schritt > 160 Zeichen und Schrittliste außerhalb 2–10", async () => {
    expect(await regeln(`1. ${"x".repeat(161)}\n2. Kurz\n`)).toEqual([
      "Artikel test: Schritt 1 hat 161 Zeichen – höchstens 160, Schritt teilen.",
    ]);
    expect(await regeln("1. Allein\n")).toEqual([
      "Artikel test: Schrittliste mit 1 Einträgen – 2 bis 10, unter Zwischenüberschriften aufteilen.",
    ]);
    const elf = Array.from({ length: 11 }, (_, i) => `${i + 1}. Schritt`).join("\n");
    expect(await regeln(elf)).toEqual([
      "Artikel test: Schrittliste mit 11 Einträgen – 2 bis 10, unter Zwischenüberschriften aufteilen.",
    ]);
    // verschachtelte Listen zählen nicht als Schrittliste
    expect(await regeln("1. Eins\n   1. a\n2. Zwei\n")).toEqual([]);
  });

  it("Überschrift > 80 Zeichen", async () => {
    const h = "Ü".repeat(81);
    expect(await regeln(`## ${h}\n\nText.`)).toEqual([`Artikel test: Überschrift ‚${h}‘ hat 81 Zeichen – höchstens 80.`]);
  });

  it("reservierte ids", async () => {
    expect(await regeln("## Quellen\n\nText.\n\n### FAQ\n\nText.")).toEqual([
      "Artikel test: Überschrift erzeugt die reservierte id ‚quellen‘ – Überschrift umbenennen.",
      "Artikel test: Überschrift erzeugt die reservierte id ‚faq‘ – Überschrift umbenennen.",
    ]);
  });

  it("reservierte ids stehen wirklich in Layout, Kopf und Vorlagen (LO-01)", async () => {
    const { RESERVIERTE_IDS, RESERVIERTES_ID_PRAEFIX } = await import("@/lib/content");
    const lies = (rel: string) => fs.readFile(new URL(`../${rel}`, import.meta.url), "utf8");
    const dateien = [
      "app/layout.tsx",
      "components/layout/HeaderShell.tsx",
      "components/content/ArticlePage.tsx",
      "components/content/ContentIndex.tsx",
      "components/content/ContentKopf.tsx",
    ];
    const quellen = (await Promise.all(dateien.map(lies))).join("\n");
    for (const id of RESERVIERTE_IDS) expect(quellen, id).toMatch(new RegExp(`["'\`]${id}["'\`]`));
    expect(await lies("components/layout/HeaderShell.tsx")).toContain(`\`${RESERVIERTES_ID_PRAEFIX}\${`);
  });

  it("reservierte ids der Seitenvorlage: Skip-Ziel, Titel, Hauptnavigation und Navigations-Präfix (LO-01)", async () => {
    const md = ["## Inhalt", "## Artikel-Titel", "## Seiten-Titel", "## Hauptnavigation", "### Navigation Hilfe"].join("\n\nText.\n\n");
    expect(await regeln(md)).toEqual(
      ["inhalt", "artikel-titel", "seiten-titel", "hauptnavigation", "navigation-hilfe"].map(
        (id) => `Artikel test: Überschrift erzeugt die reservierte id ‚${id}‘ – Überschrift umbenennen.`,
      ),
    );
  });

  it("FAQ-Frage zugleich Überschrift", async () => {
    expect(await regeln("## Was kostet das?\n\nText.", [{ q: "Was kostet das?", a: "Nichts." }])).toEqual([
      "Artikel test: FAQ-Frage ‚Was kostet das?‘ steht auch als Überschrift im Text – nur an einer Stelle beantworten.",
    ]);
  });

  it("regelkonformer Text hat keine Probleme", async () => {
    expect(await regeln("## Wie geht es?\n\nSo.\n\n1. Öffnen Sie A.\n2. Klicken Sie B.\n\n| A |\n|---|\n| 1 |\n")).toEqual([]);
  });
});

/** Prosa-Regeln ohne Ausnahme (09-09: Übergangsliste aus 09-01 entfernt, T-09-27). */
describe("Prosa-Regeln über alle Artikel (Sammelprüfung)", () => {
  it("kein Artikel verstößt gegen eine Prosa-Regel", async () => {
    const verstoesse: string[] = [];
    for (const kind of ["blog", "hilfe"] as const)
      for (const s of await getContentList(kind)) {
        const a = (await getContentArticle(kind, s.slug))!;
        const datei = `content/${kind}/${s.slug}.md`;
        for (const p of await prosaProbleme(s.slug, a.body, a.faq)) verstoesse.push(`${datei}|${p.regel}: ${p.meldung}`);
      }
    expect(verstoesse).toEqual([]);
  }, 60_000);
});

describe("Szenen-Registry sceneById (D-15, 09-RESEARCH Pattern 3)", () => {
  it("enthält jedes Element aus allScenes genau einmal", () => {
    const werte = Object.values(sceneById);
    expect(werte).toHaveLength(allScenes.length);
    for (const s of allScenes) expect(werte.filter((w) => w === s), s.title).toHaveLength(1);
  });

  it("Schlüssel = Exportname ohne „Scene“", () => {
    for (const [id, scene] of Object.entries(sceneById))
      expect((szenen as Record<string, unknown>)[`${id}Scene`], id).toBe(scene);
  });

  it("Rahmenart ist ablesbar: web: → Browser, app: → Phone", () => {
    expect(sceneFrame(sceneById.rechnungen)).toBe("browser");
    expect(sceneFrame(sceneById.zeiten)).toBe("phone");
    for (const s of Object.values(sceneById)) expect(["browser", "phone"]).toContain(sceneFrame(s));
  });
});

describe("Kategorie-Icons (09-UI-SPEC § 3)", () => {
  it("je Kategorie genau ein Icon, categories unverändert", () => {
    for (const kind of ["blog", "hilfe"] as const)
      expect(Object.keys(categoryIcons[kind]).sort(), kind).toEqual(Object.keys(categories[kind]).sort());
    expect(Object.keys(categories.blog)).toHaveLength(6);
    expect(Object.keys(categories.hilfe)).toHaveLength(9);
    expect(categoryIcons.hilfe.lager.displayName).toBe("Warehouse");
    expect(categoryIcons.blog.rechnungen.displayName).toBe("Receipt");
  });
});
