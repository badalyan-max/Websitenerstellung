import { describe, expect, it } from "vitest";
import {
  anchorAnswer,
  answerFirstViolations,
  breadcrumbNav,
  duplikate,
  faqFragenSichtbar,
  findType,
  headTags,
  istZentral,
  jsonLd,
  norm,
  pruefeSeite,
} from "../scripts/lib/seo-audit-core.mjs";

// ---------------------------------------------------------------------------------------------
// Fixture-Bausteine: kleine HTML-Seiten, die genau eine Eigenschaft verletzen.
// ---------------------------------------------------------------------------------------------
const ORIGIN = "https://craftos.eu";
const x = (n: number, c = "a") => c.repeat(n);
const ld = (data: unknown) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
const crumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, item: ORIGIN + i.path })),
});
const crumbNav = (items: { name: string; path: string }[]) =>
  `<nav aria-label="Brotkrumen" data-tone="dark"><ol>${items
    .map((i, n) =>
      n === items.length - 1
        ? `<li><span aria-current="page">${i.name}</span></li>`
        : `<li><a href="${i.path}">${i.name}</a><svg aria-hidden="true"></svg></li>`,
    )
    .join("")}</ol></nav>`;

const PREISE_CRUMBS = [
  { name: "Start", path: "/" },
  { name: "Preise", path: "/preise" },
];
const GUTER_TITEL = "Handwerkersoftware Preise und Lizenzen | CraftOS";
const GUTE_DESC = x(140, "d");

interface Fixture {
  title?: string | null;
  description?: string | null;
  h1s?: string[];
  nav?: string;
  ldBlocks?: unknown[];
  og?: string | null;
  twitter?: string | null;
  body?: string;
}
function html(f: Fixture = {}) {
  const title = f.title === undefined ? GUTER_TITEL : f.title;
  const description = f.description === undefined ? GUTE_DESC : f.description;
  const og = f.og === undefined ? `${ORIGIN}/preise/opengraph-image` : f.og;
  const twitter = f.twitter === undefined ? og : f.twitter;
  const head = [
    title !== null ? `<title>${title}</title>` : "",
    description !== null ? `<meta name="description" content="${description}"/>` : "",
    `<link rel="canonical" href="${ORIGIN}/preise"/>`,
    og ? `<meta property="og:image" content="${og}"/>` : "",
    twitter ? `<meta name="twitter:image" content="${twitter}"/>` : "",
  ].join("");
  const h1s = (f.h1s ?? ["Preise der Handwerkersoftware CraftOS"]).map((h) => `<h1>${h}</h1>`).join("");
  const nav = f.nav ?? crumbNav(PREISE_CRUMBS);
  const blocks = (f.ldBlocks ?? [crumbSchema(PREISE_CRUMBS)]).map(ld).join("");
  return `<html><head>${head}</head><body>${nav}<main>${h1s}${f.body ?? ""}</main>${blocks}</body></html>`;
}
const OG_OK = { imInManifest: true, bytes: 80 * 1024 };
const regeln = (v: { regel: string }[]) => v.map((e) => e.regel).sort();

describe("headTags", () => {
  it("liest title, description, h1s, canonical, og:image und twitter:image mit dekodierten Entities", () => {
    const h = `<head><title>Preise &amp; Lizenzen | CraftOS</title><meta name="description" content="Sie &quot;rechnen&quot; mit Ihrem &#x27;Team&#x27;"/><link rel="canonical" href="https://craftos.eu/preise"/><meta property="og:image" content="https://craftos.eu/preise/opengraph-image"/><meta name="twitter:image" content="https://craftos.eu/preise/opengraph-image"/></head><h1>Preise <span>&amp;</span> Lizenzen</h1>`;
    expect(headTags(h)).toEqual({
      title: "Preise & Lizenzen | CraftOS",
      description: 'Sie "rechnen" mit Ihrem \'Team\'',
      h1s: ["Preise & Lizenzen"],
      canonical: "https://craftos.eu/preise",
      ogImage: "https://craftos.eu/preise/opengraph-image",
      twitterImage: "https://craftos.eu/preise/opengraph-image",
    });
  });

  it("liefert null für fehlende Tags", () => {
    expect(headTags("<p>leer</p>")).toEqual({
      title: null,
      description: null,
      h1s: [],
      canonical: null,
      ogImage: null,
      twitterImage: null,
    });
  });
});

describe("findType", () => {
  it("findet BreadcrumbList in @graph und verschachtelt, zwei Vorkommen zählen als 2", () => {
    const graph = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage" }, crumbSchema(PREISE_CRUMBS)] };
    const einzeln = crumbSchema(PREISE_CRUMBS);
    const blocks = jsonLd(ld(graph) + ld(einzeln));
    expect(findType(blocks, "BreadcrumbList")).toHaveLength(2);
    expect(findType(jsonLd(ld({ "@type": "WebPage", breadcrumb: einzeln })), "BreadcrumbList")).toHaveLength(1);
  });
});

describe("breadcrumbNav", () => {
  it("liest nav[aria-label=Brotkrumen] mit Gliedern, aktuelles Glied aus aria-current", () => {
    const r = breadcrumbNav(crumbNav([...PREISE_CRUMBS.slice(0, 1), { name: "Vergleich", path: "/vergleich" }, { name: "HERO-Alternative", path: "/vergleich/hero-alternative" }]), "/vergleich/hero-alternative");
    expect(r.count).toBe(1);
    expect(r.items).toEqual([
      { name: "Start", path: "/" },
      { name: "Vergleich", path: "/vergleich" },
      { name: "HERO-Alternative", path: "/vergleich/hero-alternative" },
    ]);
  });

  it("ignoriert die alte Brotkrümelnavigation der Rechner", () => {
    const r = breadcrumbNav('<nav aria-label="Brotkrümelnavigation"><ol><li><a href="/">Start</a></li></ol></nav>', "/rechner");
    expect(r).toEqual({ count: 0, items: [] });
  });
});

describe("pruefeSeite", () => {
  const seite = (path: string, f: Fixture = {}, mapEntry: unknown = null, og = OG_OK) =>
    pruefeSeite({ path, html: html(f), mapEntry, og });

  it("saubere Seite ohne Verstoß", () => {
    expect(seite("/preise")).toEqual([]);
  });

  it("Titel mit 61 Zeichen → title", () => {
    expect(regeln(seite("/preise", { title: x(61) }))).toEqual(["title"]);
    expect(regeln(seite("/preise", { title: x(60) }))).toEqual([]);
  });

  it("Description 119 und 156 → description", () => {
    expect(regeln(seite("/preise", { description: x(119) }))).toEqual(["description"]);
    expect(regeln(seite("/preise", { description: x(156) }))).toEqual(["description"]);
    expect(regeln(seite("/preise", { description: x(120) }))).toEqual([]);
    expect(regeln(seite("/preise", { description: x(155) }))).toEqual([]);
  });

  it("0 und 2 H1 → h1", () => {
    expect(regeln(seite("/preise", { h1s: [] }))).toEqual(["h1"]);
    expect(regeln(seite("/preise", { h1s: ["Eins", "Zwei"] }))).toEqual(["h1"]);
  });

  it("Nicht-Root ohne Brotkrumen-nav → breadcrumbs", () => {
    const v = seite("/preise", { nav: "" });
    expect(regeln(v)).toEqual(["breadcrumbs"]);
  });

  it("zwei BreadcrumbList (einzeln + @graph) → breadcrumbs", () => {
    const v = seite("/preise", { ldBlocks: [crumbSchema(PREISE_CRUMBS), { "@graph": [crumbSchema(PREISE_CRUMBS)] }] });
    expect(regeln(v)).toEqual(["breadcrumbs"]);
  });

  it("Brotkrumen-Namen ≠ Schema-Namen → breadcrumbs", () => {
    const v = seite("/preise", { ldBlocks: [crumbSchema([PREISE_CRUMBS[0], { name: "Preise und Lizenzen", path: "/preise" }])] });
    expect(regeln(v)).toEqual(["breadcrumbs"]);
  });

  it("og:image = Root-Bild auf /preise → og", () => {
    const v = seite("/preise", { og: `${ORIGIN}/opengraph-image` });
    expect(regeln(v)).toEqual(["og"]);
  });

  it("twitter:image ≠ og:image → og", () => {
    const v = seite("/preise", { twitter: `${ORIGIN}/opengraph-image` });
    expect(regeln(v)).toEqual(["og"]);
  });

  it("OG-Körper 301 KB → og mit Fehlertext laut UI-SPEC", () => {
    const v = seite("/preise", {}, null, { imInManifest: true, bytes: 301 * 1024 });
    expect(regeln(v)).toEqual(["og"]);
    expect(v[0].problem).toBe("OG: /preise ist 301 KB – höchstens 300 KB.");
    expect(regeln(seite("/preise", {}, null, { imInManifest: true, bytes: 300 * 1024 }))).toEqual([]);
  });

  it("OG nicht im prerender-manifest → og", () => {
    expect(regeln(seite("/preise", {}, null, { imInManifest: false, bytes: null }))).toEqual(["og"]);
  });

  it("FAQPage-Frage ohne sichtbare summary → faq-schema", () => {
    const faq = {
      "@type": "FAQPage",
      mainEntity: [{ "@type": "Question", name: "Gibt es eine Testphase?", acceptedAnswer: { "@type": "Answer", text: "Ja." } }],
    };
    const ohne = seite("/preise", { ldBlocks: [crumbSchema(PREISE_CRUMBS), faq] });
    expect(regeln(ohne)).toEqual(["faq-schema"]);
    const mit = seite("/preise", {
      ldBlocks: [crumbSchema(PREISE_CRUMBS), faq],
      body: '<details><summary><h3>Gibt es eine Testphase?</h3></summary><p>Ja.</p></details>',
    });
    expect(regeln(mit)).toEqual([]);
  });

  it("Title ≠ target.title → map", () => {
    const entry = {
      path: "/preise",
      primary: null,
      target: { title: "Anderer Titel | CraftOS", h1: "Preise der Handwerkersoftware CraftOS", description: GUTE_DESC },
    };
    expect(regeln(seite("/preise", {}, entry))).toEqual(["map"]);
  });

  it("Hauptkeyword fehlt im Titel → keyword (nur mit primary)", () => {
    const entry = { path: "/preise", primary: { keyword: "handwerkersoftware kosten" }, target: null };
    expect(regeln(seite("/preise", {}, entry))).toEqual(["keyword"]);
    const passt = { path: "/preise", primary: { keyword: "handwerkersoftware preise" }, target: null };
    expect(regeln(seite("/preise", {}, passt))).toEqual([]);
  });

  it("Product auf /vergleich/x → schema", () => {
    const crumbs = [PREISE_CRUMBS[0], { name: "Vergleich", path: "/vergleich" }, { name: "X", path: "/vergleich/x" }];
    const v = pruefeSeite({
      path: "/vergleich/x",
      html: html({ nav: crumbNav(crumbs), ldBlocks: [crumbSchema(crumbs), { "@type": "Product", name: "X" }], og: `${ORIGIN}/vergleich/x/opengraph-image` }),
      mapEntry: null,
      og: OG_OK,
    });
    expect(regeln(v)).toEqual(["schema"]);
  });

  it("Root / ohne Brotkrumen und mit Root-OG → kein Verstoß", () => {
    const v = pruefeSeite({
      path: "/",
      html: html({ nav: "", ldBlocks: [], og: `${ORIGIN}/opengraph-image` }),
      mapEntry: null,
      og: OG_OK,
    });
    expect(v).toEqual([]);
  });

  it("Antwort > 300 auf zentraler Seite → antwort, auf nicht zentraler Seite ignoriert", () => {
    const body = `<h2>Was kostet CraftOS?</h2><p>${x(301)}</p>`;
    const v = seite("/preise", { body });
    expect(regeln(v)).toEqual(["antwort"]);
    expect(v[0].problem).toBe(
      "Antwort zuerst: Frage ‚Was kostet CraftOS?‘ auf /preise hat keine Antwort ≤ 300 Zeichen direkt darunter – ersten Absatz kürzen oder vorziehen.",
    );
    const blogCrumbs = [PREISE_CRUMBS[0], { name: "Ratgeber", path: "/blog" }, { name: "X", path: "/blog/x" }];
    const blog = pruefeSeite({
      path: "/blog/x",
      html: html({ nav: crumbNav(blogCrumbs), ldBlocks: [crumbSchema(blogCrumbs)], og: `${ORIGIN}/blog/x/opengraph-image`, body }),
      mapEntry: null,
      og: OG_OK,
    });
    expect(blog).toEqual([]);
  });

  it("Regelauswahl beschränkt die Prüfung", () => {
    const v = pruefeSeite({ path: "/preise", html: html({ title: x(61), nav: "" }), mapEntry: null, og: OG_OK }, ["title"]);
    expect(regeln(v)).toEqual(["title"]);
  });
});

describe("faqFragenSichtbar", () => {
  it("meldet Schema-Fragen ohne sichtbare Frage", () => {
    const h =
      ld({ "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "A?" }, { "@type": "Question", name: "B?" }] }) +
      "<details><summary><h3>A?</h3></summary><p>Ja.</p></details>";
    expect(faqFragenSichtbar(h)).toEqual({ fragen: ["A?", "B?"], fehlend: ["B?"] });
  });
});

describe("answerFirstViolations", () => {
  it("Frage-H2 mit 301 Zeichen → Verstoß, genau 300 → ok", () => {
    expect(answerFirstViolations(`<h2>Was kostet das?</h2><p>${x(301)}</p>`)).toEqual([
      { q: "Was kostet das?", problem: "Antwort 301 > 300", laenge: 301 },
    ]);
    expect(answerFirstViolations(`<h2>Was kostet das?</h2><p>${x(300)}</p>`)).toEqual([]);
  });

  it("summary-Frage mit <p> 200 → ok", () => {
    expect(answerFirstViolations(`<details><summary><h3>Gibt es eine App?</h3><span></span></summary><p>${x(200)}</p></details>`)).toEqual([]);
  });

  it("Frage-H2 direkt gefolgt von <h3> vor dem ersten <p> → keine Antwort direkt darunter", () => {
    expect(answerFirstViolations(`<h2>Welche Kriterien zählen?</h2><div><h3>Kachel</h3><p>${x(50)}</p></div>`)).toEqual([
      { q: "Welche Kriterien zählen?", problem: "keine Antwort direkt darunter", laenge: 0 },
    ]);
  });

  it("Nicht-Frage-H2 wird ignoriert", () => {
    expect(answerFirstViolations(`<h2>Häufige Fragen</h2><p>${x(400)}</p>`)).toEqual([]);
  });

  it("findet die Antwort auch hinter langem Markup (keine feste Fenstergröße)", () => {
    expect(answerFirstViolations(`<h2>Was ist CraftOS?</h2><div>${x(5000, " ")}</div><p>${x(100)}</p>`)).toEqual([]);
  });
});

describe("anchorAnswer", () => {
  it("<p id=antwort> mit 256 Zeichen → ok", () => {
    const r = anchorAnswer(`<h1>Titel</h1><p id="antwort" data-answer>${x(256)}</p>`, "antwort");
    expect(r).toMatchObject({ exists: true, ok: true, laenge: 256 });
  });

  it("<p id=antwort> mit 301 Zeichen → nicht ok", () => {
    expect(anchorAnswer(`<p id="antwort">${x(301)}</p>`, "antwort")).toMatchObject({ exists: true, ok: false, laenge: 301 });
  });

  it("id an Frage-H2 → misst erstes folgendes <p>", () => {
    const r = anchorAnswer(`<h2 id="was-ist-craftos">Was ist CraftOS?</h2><p>${x(214)}</p><p>${x(900)}</p>`, "was-ist-craftos");
    expect(r).toMatchObject({ exists: true, ok: true, laenge: 214 });
  });

  it("id an FAQ-H2 → alle summary-Fragen der Liste erfüllen die Antwortregel", () => {
    const faq = (a: number) =>
      `<h2 id="faq-titel">Häufige Fragen zur Zeiterfassung</h2><p>Kurz.</p><details><summary><h3>A?</h3></summary><p>${x(120)}</p></details><details><summary><h3>B?</h3></summary><p>${x(a)}</p></details><h2>Weiter</h2><details><summary><h3>C?</h3></summary><p>${x(900)}</p></details>`;
    expect(anchorAnswer(faq(250), "faq-titel")).toMatchObject({ exists: true, ok: true });
    expect(anchorAnswer(faq(301), "faq-titel")).toMatchObject({ exists: true, ok: false });
  });

  it("fehlende id → exists false", () => {
    expect(anchorAnswer("<h1>X</h1>", "antwort")).toMatchObject({ exists: false, ok: false });
  });
});

describe("duplikate", () => {
  const s = (path: string, title: string, description: string, h1: string) => ({ path, title, description, h1s: [h1] });

  it("zwei Seiten mit gleichem Titel → beide gemeldet", () => {
    const v = duplikate([s("/a", "Gleich", "da", "Ha"), s("/b", "Gleich", "db", "Hb"), s("/c", "Anders", "dc", "Hc")]);
    expect(v.map((e: { path: string }) => e.path).sort()).toEqual(["/a", "/b"]);
    expect(v.every((e: { regel: string }) => e.regel === "duplikate")).toBe(true);
  });

  it("H1 „Rechnungen“ auf zwei Seiten → gemeldet", () => {
    const v = duplikate([
      s("/blog/kategorie/rechnungen", "T1", "D1", "Rechnungen"),
      s("/hilfe/kategorie/rechnungen", "T2", "D2", "Rechnungen"),
    ]);
    expect(v).toHaveLength(2);
    expect(v[0].problem).toContain("Rechnungen");
  });

  it("Pfadfilter: Berechnung sitewide, Meldung nur für Gruppen mit gefiltertem Pfad", () => {
    const seiten = [s("/a", "Gleich", "da", "Ha"), s("/b", "Gleich", "db", "Hb"), s("/c", "Tc", "Dup", "Hc"), s("/d", "Td", "Dup", "Hd")];
    const v = duplikate(seiten, ["/a"]);
    expect(v.map((e: { path: string }) => e.path).sort()).toEqual(["/a", "/b"]);
    expect(duplikate(seiten, ["/x"])).toEqual([]);
  });
});

describe("istZentral", () => {
  it("zentrale Seiten laut D-09", () => {
    for (const p of ["/", "/preise", "/vergleich", "/vergleich/hero-alternative", "/funktionen", "/funktionen/aufmass", "/fakten-ueber-craftos", "/app", "/craft-ai", "/gobd"])
      expect(istZentral(p), p).toBe(true);
    for (const p of ["/blog/x", "/hilfe/x", "/gewerke/maler", "/vergleicher", "/preise-alt"]) expect(istZentral(p), p).toBe(false);
  });
});

describe("norm", () => {
  it("identisch zur bisherigen Normalisierung aus keyword-map.test.ts", () => {
    const fixtures: [string, string][] = [
      ["Handwerkersoftware Preise", "handwerkersoftwarepreise"],
      ["Bautagebuch-App", "bautagebuchapp"],
      ["Aufmaß", "aufmass"],
      ["Größe Übersicht Ärger", "groesseuebersichtaerger"],
      ["  zeit  erfassung - app ", "zeiterfassungapp"],
      ["E-Rechnung", "erechnung"],
    ];
    for (const [ein, aus] of fixtures) expect(norm(ein), ein).toBe(aus);
  });
});
