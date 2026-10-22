// Alternativen-Seiten (08-08; 08-UI-SPEC § 3.1–3.6, D-01–D-04, U1–U12, C8, C9, F1): prüfender Inhalts-Builder,
// Vorlage AlternativePage (sync RSC) und die Seiten plancraft und Craftnote. Inhalts-, Struktur-, UWG- und
// Schemaprüfung über renderToString.
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { AlternativePage } from "@/components/vergleich/AlternativePage";
import { TEXT_BUDGET, charCount } from "@/components/v2/budgets";
import { germanDate, euro } from "@/lib/format";
import { alternativeAusModul, baueAlternative } from "@/lib/seiten/alternativen";
import type { AlternativeInhalt, Seitenmodul } from "@/lib/seiten/alternativen/types";
import { annualSavingPercent, site, tarife } from "@/lib/site";
import { craftnote, monatAusJahr, plancraft, standVon, UWG_WORTLISTE, uwgTreffer } from "@/lib/wettbewerber";
import type { Wettbewerber } from "@/lib/wettbewerber/types";

const ROOT = path.resolve(import.meta.dirname, "..");
const PFAD = "/vergleich/plancraft-alternative";

const cents = (e: number) => Math.round(e * 100);
const voll = tarife.find((t) => t.id === "voll")!;
const app = tarife.find((t) => t.id === "app")!;
const BEISPIEL_JAHR = euro(monatAusJahr([cents(voll.jahr), ...Array(4).fill(cents(app.jahr))]) / 100);
const BEISPIEL_MONAT = euro((cents(voll.monat) + 4 * cents(app.monat)) / 100);

/** Fixture-Wettbewerber: Kopie der belegten plancraft-Daten (gültige Quellen und Daten). */
function fixtureW(): Wettbewerber {
  return structuredClone(plancraft);
}

/** Fixture-Seitenmodul: minimale, regelkonforme Texte; Varianten über `aendern`. */
function fixtureSeite(aendern: (t: ReturnType<Seitenmodul>) => void = () => {}): Seitenmodul {
  return (k) => {
    const business = k.w.preise.wert[0];
    const texte: ReturnType<Seitenmodul> = {
      keyword: "plancraft-Alternative",
      answer: `CraftOS ist eine plancraft-Alternative mit Preis pro Person: Die Voll-Lizenz kostet ${k.craftos.vollMonat} netto im Monat.`,
      vertragsname: "plancraft-Abos",
      rows: [
        k.zeile("Bürozugang, monatliche Zahlung", k.craftos.vollMonat, `${k.euro(business.centsMonat!)} (Business)`, k.w.preise),
        k.laufzeit(),
        k.testphase(),
        k.kriterium("datev", "DATEV-Export"),
        k.kriterium("kiTelefon", "KI-Telefonempfang"),
      ],
      kosten: {
        answer: `Für fünf Personen zahlen Sie im Jahresabo ${k.craftos.beispielJahrJeMonat} netto im Monat bei CraftOS; die Pakete unterscheiden sich im Funktionsumfang.`,
        facts: [
          { key: "business-monat", value: k.euro(business.centsMonat!), label: "plancraft Business, Monat", fakt: k.w.preise },
        ],
        zusammenstellung: "Business",
        nichtEnthalten: "KI-Verbrauch",
      },
      fuerWen: {
        answer: "plancraft passt zu Betrieben mit KI-Empfang; CraftOS passt zu Betrieben, die pro Person abrechnen.",
        craftos: ["proPerson", "plantafel"],
      },
      umstieg: { laufzeit: "plancraft nennt als Frist einen Tag vor Ende der Mindestlaufzeit." },
      faq: [
        { q: "Was kostet plancraft pro Monat?", a: `plancraft Business kostet ${k.euro(business.centsMonat!)} netto im Monat.` },
        { q: "Was kostet CraftOS pro Monat?", a: `Die Voll-Lizenz kostet ${k.craftos.vollMonat} netto im Monat.` },
        { q: "Wie lange kann ich CraftOS testen?", a: `CraftOS testen Sie ${k.craftos.trialDays} Tage ohne Zahlungsdaten.` },
        { q: "Kann ich zu CraftOS wechseln?", a: "Ja. Kunden, Projekte und Stammdaten übernehmen Sie per Datei." },
      ],
    };
    aendern(texte);
    return texte;
  };
}

const decode = (v: string) =>
  v
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function jsonLd(html: string): Record<string, unknown>[] {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
}

/** Alle Texte eines Inhaltsobjekts (ohne das Wettbewerber-Datenmodul) für die UWG-Prüfung. */
function alleTexte(inhalt: AlternativeInhalt): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  for (const [schluessel, wert] of Object.entries(inhalt)) if (schluessel !== "wettbewerber") walk(wert);
  return out;
}

/** Strukturprüfung einer gerenderten Alternativen-Seite (UI-SPEC § 3.1, § 2, § 8). */
function pruefeHtml(inhalt: AlternativeInhalt) {
  const html = renderToString(createElement(AlternativePage, { inhalt }));
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  expect(h1, "genau eine H1").toHaveLength(1);
  expect(decode(h1[0][1])).toBe(inhalt.kopf.h1);

  // #antwort direkt nach der H1, ≤ 300.
  const nachH1 = html.slice(html.indexOf("</h1>") + 5);
  const antwort = nachH1.match(/^<p id="antwort" data-answer=""[^>]*>([\s\S]*?)<\/p>/);
  expect(antwort, "#antwort direkt nach der H1").toBeTruthy();
  expect(charCount(decode(antwort![1]))).toBeLessThanOrEqual(300);

  const abschnitte = [...html.matchAll(/data-abschnitt="([^"]+)"/g)].map((m) => m[1]).filter((a) => a !== "kopf");
  expect(abschnitte).toEqual(["vergleich", "kosten", "fuer-wen", "umstieg", "faq", "cta"]);
  for (const id of ["vergleich", "kosten", "fuer-wen", "umstieg", "faq"]) {
    expect(html, `section ${id}`).toContain(`data-abschnitt="${id}" aria-labelledby="${id}"`);
    expect(html, `H2 ${id}`).toMatch(new RegExp(`<h2 id="${id}"`));
  }
  for (const id of ["kosten", "fuer-wen", "umstieg"]) {
    const m = html.match(new RegExp(`<h2 id="${id}"[^>]*>([\\s\\S]*?)</h2><p[^>]*data-answer=""[^>]*>([\\s\\S]*?)</p>`));
    expect(m, `Frage-H2 ${id} mit Antwort`).toBeTruthy();
    expect(decode(m![1]).endsWith("?"), `${id}: Frage`).toBe(true);
    expect(charCount(decode(m![2])), `${id}: Antwort`).toBeLessThanOrEqual(300);
  }
  expect(html).toContain('href="/funktionen/datenuebernahme"');
  expect(html).toContain("Mehr zur Datenübernahme");
  expect(html).toContain('href="#vergleich"');
  expect(html).not.toContain("<img");
  for (const verboten of ["Product", "Review", "AggregateRating", "Telefon-Agent", "MCP-Server"])
    expect(html, verboten).not.toContain(verboten);

  // Quellenlinks: nofollow, gleicher Tab (U10).
  for (const a of html.matchAll(/<a [^>]*href="https:\/\/(?!app\.craftos\.eu)[^"]*"[^>]*>/g)) {
    expect(a[0], a[0]).toContain('rel="nofollow"');
    expect(a[0]).not.toContain("_blank");
  }

  const blocks = jsonLd(html);
  const crumbs = blocks.filter((b) => b["@type"] === "BreadcrumbList");
  expect(crumbs).toHaveLength(1);
  expect((crumbs[0].itemListElement as unknown[]).length).toBe(3);
  const faq = blocks.filter((b) => b["@type"] === "FAQPage");
  expect(faq).toHaveLength(1);
  const sichtbar = [...html.matchAll(/<summary[^>]*><h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => decode(m[1]));
  expect((faq[0].mainEntity as { name: string }[]).map((e) => e.name)).toEqual(sichtbar);
  expect(sichtbar).toEqual(inhalt.faq.items.map((i) => i.q));
  expect(blocks.filter((b) => b["@type"] === "WebPage")).toHaveLength(1);

  // CTA-Texte nennen genau site.trialDays (Gegenstück zu ctaTestphaseFehler, W5).
  const ctas = [...html.matchAll(/<a [^>]*data-track="trial"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => decode(m[1]));
  expect(ctas.length).toBeGreaterThanOrEqual(2);
  for (const c of ctas) expect(c).toBe(`${site.trialDays} Tage kostenlos testen`);
  return html;
}

describe("Vorlage", () => {
  const w = fixtureW();
  const inhalt = alternativeAusModul(w, fixtureSeite(), PFAD);

  it("Tabelle: ≤ 12 Zeilen, Zellen ≤ 24, Beschriftung ≤ 48, Pflichthinweis und Disclaimer wörtlich", () => {
    const { tabelle } = inhalt;
    expect(tabelle.rows.length).toBeLessThanOrEqual(TEXT_BUDGET.count.comparison.rows);
    for (const r of tabelle.rows) {
      expect(charCount(r.label), r.label).toBeLessThanOrEqual(TEXT_BUDGET.comparison.rowLabel);
      for (const c of [r.craftos, r.wettbewerber])
        if (typeof c === "string") expect(charCount(c), c).toBeLessThanOrEqual(TEXT_BUDGET.comparison.cell);
    }
    expect(tabelle.note).toContain(`Angaben ohne Gewähr, Stand ${germanDate(standVon(w))}, Quellen unter der Tabelle.`);
    expect(tabelle.note).toContain(
      `Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand ${germanDate(site.checkedAt)}.`,
    );
    expect(tabelle.disclaimer).toBe("Die Nennung von plancraft dient der Zuordnung; es besteht keine Geschäftsbeziehung.");
    expect(tabelle.caption).toBe("plancraft und CraftOS im Vergleich");
  });

  it("Quellenliste enthält jede Zellenquelle genau einmal, mit Anbieter und Abrufdatum", () => {
    const urls = inhalt.tabelle.sources.map((q) => q.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const r of inhalt.tabelle.rows) {
      expect(r.quellen.length, r.label).toBeGreaterThan(0);
      for (const q of r.quellen) expect(urls, `${r.label}: ${q.url}`).toContain(q.url);
    }
    for (const q of inhalt.tabelle.sources) {
      expect(q.anbieter).toBe("plancraft");
      expect(q.abgerufenAm).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("Testphase: CraftOS-Zelle nennt genau site.trialDays, Wettbewerberzelle den Datenwert", () => {
    const zeile = inhalt.tabelle.rows.find((r) => r.label === "Testphase")!;
    expect(zeile.craftos).toBe(`${site.trialDays} Tage`);
    expect(zeile.wettbewerber).toBe(`${w.testphaseTage.wert} Tage`);
  });

  it("Kosten: CraftOS 58,13 € aus monatAusJahr und 69,75 € aus Monatspreisen, Note mit Pflichtsätzen", () => {
    const [jahr, monat, ...rest] = inhalt.kosten.facts;
    expect(BEISPIEL_JAHR).toBe(euro(58.13));
    expect(BEISPIEL_MONAT).toBe(euro(69.75));
    expect(jahr.value).toBe(BEISPIEL_JAHR);
    expect(monat.value).toBe(BEISPIEL_MONAT);
    expect(jahr.source).toMatch(/^site:/);
    expect(rest.length).toBeGreaterThan(0);
    for (const f of rest) expect(f.source).toMatch(/^wettbewerber:plancraft-/);
    const { note } = inhalt.kosten;
    expect(note).toContain("Annahme: 1 Person im Büro, 4 auf der Baustelle. CraftOS: 1 Voll-Lizenz + 4 App-Lizenzen.");
    expect(note).toContain("Die Pakete unterscheiden sich im Funktionsumfang.");
    expect(note).toContain("Monatswerte rechnerisch aus dem Jahresbetrag, auf Cent gerundet.");
    expect(note).toContain(`Netto, Stand ${germanDate(standVon(w))}.`);
  });

  it("Für wen: Wettbewerber zuerst mit ≥ 2 belegten Stärken, CraftOS-Panel aus den gemeinsamen Punkten", () => {
    const [wp, cp] = inhalt.fuerWen.panels;
    expect(wp.title).toBe("Wann plancraft passt");
    expect(cp.title).toBe("Wann CraftOS passt");
    expect(wp.points.length).toBeGreaterThanOrEqual(2);
    for (const p of wp.points) expect(p.quelle?.url).toMatch(/^https:\/\/plancraft\.com\//);
    expect(cp.points.map((p) => p.text)).toEqual([
      "Sie möchten pro Person abrechnen und Mitarbeitende mit einer App-Lizenz ausstatten.",
      "Sie möchten die Plantafel ohne Modulgebühr in der Voll-Lizenz nutzen.",
    ]);
  });

  it("Umstieg: vier Schritte, Schritt 1 aus dem Seitenmodul, Schritte 2–4 gemeinsam", () => {
    const { steps, answer } = inhalt.umstieg;
    expect(steps.map((s) => s.title)).toEqual(["Laufzeit prüfen", "Parallel testen", "Daten übernehmen", "Team einladen"]);
    expect(steps[1].text).toBe(`CraftOS ${site.trialDays} Tage ohne Zahlungsdaten mit einem laufenden Auftrag ausprobieren.`);
    expect(answer).toBe(
      `Prüfen Sie die Kündigungsfrist Ihres plancraft-Abos, testen Sie CraftOS ${site.trialDays} Tage mit einem laufenden Auftrag und übernehmen Sie Kunden, Projekte und Stammdaten per Datei.`,
    );
  });

  it("alle Texte frei von der UWG-Wortliste", () => {
    expect(UWG_WORTLISTE.length).toBeGreaterThan(10);
    expect(alleTexte(inhalt).filter((t) => uwgTreffer(t))).toEqual([]);
  });

  it("Builder wirft bei UWG-Wort, Stärken < 2, fehlender Fairnesszeile und Zelle > 24", () => {
    expect(() =>
      alternativeAusModul(fixtureW(), fixtureSeite((t) => (t.answer = "CraftOS ist günstiger als plancraft.")), PFAD),
    ).toThrow(/günstiger als/);
    const wenig = fixtureW();
    wenig.staerken = wenig.staerken.slice(0, 1);
    expect(() => alternativeAusModul(wenig, fixtureSeite(), PFAD)).toThrow(/mindestens 2 belegte Stärken/);
    expect(() =>
      alternativeAusModul(fixtureW(), fixtureSeite((t) => (t.rows = t.rows.filter((r) => r.craftos !== false))), PFAD),
    ).toThrow(/Fairnesszeile/);
    expect(() =>
      alternativeAusModul(
        fixtureW(),
        fixtureSeite((t) => (t.rows[0] = { ...t.rows[0], wettbewerber: "x".repeat(25) })),
        PFAD,
      ),
    ).toThrow(/24/);
    expect(() =>
      alternativeAusModul(fixtureW(), fixtureSeite((t) => (t.rows[0] = { ...t.rows[0], quellen: [] })), PFAD),
    ).toThrow(/Quelle/);
  });

  it("renderToString: Struktur, Antwort zuerst, Schema, keine Logos und keine Ankündigungen", () => {
    pruefeHtml(inhalt);
  });

  it("Vorlage ist synchron, ohne Client-Insel und ohne Preisliterale", () => {
    const quelle = fs.readFileSync(path.join(ROOT, "components/vergleich/AlternativePage.tsx"), "utf8");
    expect(quelle).not.toContain('"use client"');
    expect(quelle).not.toMatch(/async function/);
    expect(quelle).not.toMatch(/Product|AggregateRating|<img/);
  });
});

/** Seitenmodule: keine Tageszahl und keine Preiszahl als Literal (U12, Akzeptanz 08-08). */
function pruefeModulLiterale(datei: string) {
  const quelle = fs.readFileSync(path.join(ROOT, datei), "utf8");
  expect(quelle.match(/[0-9]+ Tage|[0-9]+,[0-9]{2} €/g), datei).toBeNull();
}

const e = (c: number | undefined) => euro(c! / 100);
const VOLL_MONAT = euro(voll.monat);
const VOLL_JAHR = euro(voll.jahr);
const VOLL_JAHR_MONAT = euro(monatAusJahr([cents(voll.jahr)]) / 100);
const APP_MONAT = euro(app.monat);
const APP_JAHR_MONAT = euro(monatAusJahr([cents(app.jahr)]) / 100);

describe("plancraft", () => {
  const inhalt = baueAlternative("plancraft");
  const [business, pro, premium] = plancraft.preise.wert;
  const mobil = plancraft.zusatzPreise!.mobilzugang.wert;
  const tafel = plancraft.zusatzPreise!.plantafel.wert;
  const jahr5 = monatAusJahr([business, mobil, mobil, mobil, mobil, tafel].map((p) => p.centsJahrJeMonat! * 12));
  const monat5 = business.centsMonat! + 4 * mobil.centsMonat! + tafel.centsMonat!;

  it("Pfad, H1 aus der Map, Kopfwort und Antwort laut UI-SPEC § 3.6", () => {
    expect(inhalt.path).toBe("/vergleich/plancraft-alternative");
    expect(inhalt.kopf.h1).toBe("Die plancraft-Alternative für Büro und Baustelle");
    expect(inhalt.kopf.keyword).toBe("plancraft-Alternative");
    expect(inhalt.kopf.answer).toBe(
      `CraftOS ist eine plancraft-Alternative mit Preis pro Person: Die Voll-Lizenz mit Web-App, Mobile-App und Plantafel kostet ${VOLL_MONAT} netto im Monat. plancraft Business kostet ${e(business.centsMonat)} netto im Monat mit einem Bürozugang, die Plantafel ist dort ein Zusatzmodul.`,
    );
  });

  it("Tabelle mit 11 Zeilen und Werten aus den Modulen", () => {
    const zeilen = inhalt.tabelle.rows.map((r) => [r.label, r.craftos, r.wettbewerber]);
    expect(zeilen).toEqual([
      ["Bürozugang, monatliche Zahlung", VOLL_MONAT, `${e(business.centsMonat)} (Business)`],
      ["Bürozugang, Jahresabo je Monat", VOLL_JAHR_MONAT, `${e(business.centsJahrJeMonat)} (Business)`],
      ["Weitere mobile Person, Jahresabo je Monat", `${APP_JAHR_MONAT} (App-Lizenz)`, `${e(mobil.centsJahrJeMonat)} (Mobilzugang)`],
      ["Kürzeste Laufzeit", "1 Monat", plancraft.laufzeit.wert],
      ["Testphase", `${site.trialDays} Tage`, `${plancraft.testphaseTage.wert} Tage`],
      ["Mobile-App für iOS und Android", true, true],
      ["Plantafel", "In Voll-Lizenz", "Premium, sonst Modul"],
      ["E-Rechnung", "XRechnung und ZUGFeRD", "XRechnung-Format"],
      ["DATEV-Export", true, "In allen Paketen"],
      ["GAEB-Schnittstelle", "Import X83, Export X84", "ab Pro"],
      ["KI-Telefonempfang", false, "In allen Paketen"],
    ]);
  });

  it("Kosten: Business + 4 Mobilzugänge + Plantafel-Modul, Jahresabo je Monat berechnet", () => {
    expect(e(jahr5)).toBe(euro(179.4));
    expect(e(monat5)).toBe(euro(224.4));
    expect(inhalt.kosten.answer).toBe(
      `Für eine Person im Büro und vier auf der Baustelle zahlen Sie im Jahresabo ${BEISPIEL_JAHR} netto im Monat bei CraftOS und ${e(jahr5)} bei plancraft Business mit Plantafel; die Pakete unterscheiden sich im Funktionsumfang.`,
    );
    expect(inhalt.kosten.facts.map((f) => [f.value, f.label])).toEqual([
      [BEISPIEL_JAHR, "CraftOS, 5 Personen, Jahresabo je Monat"],
      [BEISPIEL_MONAT, "CraftOS, 5 Personen, Monatsabo"],
      [e(jahr5), "plancraft Business, 5 Personen, Jahr"],
      [e(monat5), "plancraft Business, 5 Personen, Monat"],
    ]);
    expect(inhalt.kosten.note).toContain("plancraft: Business + 4 Mobilzugänge + Plantafel-Modul.");
    expect(inhalt.kosten.note).toContain("Nicht enthalten: KI-Verbrauch, Extra-Speicher, Schulungen.");
  });

  it("Für wen, Umstieg und FAQ laut UI-SPEC § 3.6", () => {
    expect(inhalt.fuerWen.answer).toBe(
      "plancraft passt zu Betrieben, die Pakete mit KI-Empfang oder eine Zweijahresvorauszahlung nutzen möchten; CraftOS passt zu Betrieben, die pro Person abrechnen und die Plantafel ohne Modulgebühr wollen.",
    );
    expect(inhalt.fuerWen.panels[0].points.map((p) => p.text)).toEqual(plancraft.staerken.map((s) => s.wert));
    expect(inhalt.umstieg.steps[0].text).toBe("plancraft nennt als Frist einen Tag vor Ende der Mindestlaufzeit.");
    expect(inhalt.faq.items).toEqual([
      {
        q: "Was kostet plancraft pro Monat?",
        a: `plancraft Business kostet ${e(business.centsMonat)} netto im Monatsabo, ${e(business.centsJahrJeMonat)} im Jahresabo und ${e(business.centsZweiJahreJeMonat)} im Zweijahresabo, jeweils pro Monat mit einem Bürozugang; Pro kostet ${e(pro.centsMonat)}, ${e(pro.centsJahrJeMonat)} oder ${e(pro.centsZweiJahreJeMonat)}, Premium ${e(premium.centsMonat)}, ${e(premium.centsJahrJeMonat)} oder ${e(premium.centsZweiJahreJeMonat)}.`,
      },
      {
        q: "Ist die Plantafel bei CraftOS im Preis enthalten?",
        a: `Ja. Die Plantafel gehört zur Voll-Lizenz für ${VOLL_MONAT} netto im Monat oder ${VOLL_JAHR} im Jahr; zusätzlich kosten nur KI-Credits und Extra-Speicher.`,
      },
      {
        q: "Wie lange kann ich plancraft und CraftOS kostenlos testen?",
        a: `CraftOS testen Sie ${site.trialDays} Tage ohne Zahlungsdaten. plancraft nennt ${plancraft.testphaseTage.wert} Tage ohne Kreditkarte und ohne automatische Verlängerung, danach einen 0-€-Tarif mit eingeschränkten Funktionen.`,
      },
      {
        q: "Kann ich von plancraft zu CraftOS wechseln?",
        a: "Ja. Prüfen Sie die Frist Ihres plancraft-Abos, laut plancraft bis einen Tag vor Ende der Mindestlaufzeit, und übernehmen Sie Kunden, Projekte und Stammdaten per Datei in CraftOS.",
      },
      {
        q: "Unterstützen plancraft und CraftOS E-Rechnungen?",
        a: "Ja. CraftOS erzeugt XRechnung und ZUGFeRD und liest strukturierte E-Rechnungen im Eingang ein; plancraft beschreibt E-Rechnungen im XRechnung-Format in allen Paketen.",
      },
    ]);
  });

  it("renderToString besteht die Vorlagenprüfung; Seitenmodul ohne Zahlenliterale", () => {
    pruefeHtml(inhalt);
    pruefeModulLiterale("lib/seiten/alternativen/plancraft.ts");
  });
});

describe("Craftnote", () => {
  const inhalt = baueAlternative("craftnote");
  const preis = (paket: string) => craftnote.preise.wert.find((p) => p.paket === paket)!;
  const bueroPlus = preis("Büro Plus");
  const buero = preis("Büro");
  const baustelle = preis("Baustelle");
  const fahrzeug = craftnote.zusatzPreise!.fahrzeugModul.wert;
  const mit = monatAusJahr([bueroPlus.centsJahrJeMonat!, ...Array(4).fill(baustelle.centsJahrJeMonat!)].map((c) => c * 12));
  const mitStatt = monatAusJahr([bueroPlus.stattCents!, ...Array(4).fill(baustelle.centsJahrJeMonat!)].map((c) => c * 12));

  it("Pfad, H1 aus der Map, Kopfwort und Antwort laut UI-SPEC § 3.6", () => {
    expect(inhalt.path).toBe("/vergleich/craftnote-alternative");
    expect(inhalt.kopf.h1).toBe("Die Craftnote-Alternative mit Angebot und Rechnung");
    expect(inhalt.kopf.keyword).toBe("Craftnote-Alternative");
    expect(inhalt.kopf.answer).toBe(
      `CraftOS ist eine Craftnote-Alternative mit Angeboten, Rechnungen, Plantafel und Mobile-App in der Voll-Lizenz für ${VOLL_MONAT} netto pro Person und Monat. Craftnote Büro Plus kostet laut Preisseite ${e(bueroPlus.centsJahrJeMonat)} statt ${e(bueroPlus.stattCents)} netto pro Nutzer und Monat bei jährlicher Abrechnung.`,
    );
  });

  it("Tabelle mit 10 Zeilen und Werten aus den Modulen", () => {
    const zeilen = inhalt.tabelle.rows.map((r) => [r.label, r.craftos, r.wettbewerber]);
    expect(zeilen).toEqual([
      ["Bürozugang mit Rechnungen, Jahresabo je Monat", VOLL_JAHR_MONAT, `${e(bueroPlus.centsJahrJeMonat)} statt ${e(bueroPlus.stattCents)}`],
      ["Weitere mobile Person, Jahresabo je Monat", `${APP_JAHR_MONAT} (App-Lizenz)`, `${e(baustelle.centsJahrJeMonat)} (Baustelle)`],
      ["Kürzeste Laufzeit", "1 Monat", craftnote.laufzeit.wert],
      ["Testphase", `${site.trialDays} Tage`, `${craftnote.testphaseTage.wert} Tage`],
      ["Mobile-App für iOS und Android", true, true],
      ["Plantafel", "In Voll-Lizenz", "Ja, ohne Preisangabe"],
      ["E-Rechnung", "XRechnung und ZUGFeRD", "„E-Rechnungsfähig“"],
      ["DATEV-Export", true, "Nur Büro Plus"],
      ["Zeiterfassung", true, "In allen Paketen"],
      ["Fahrzeugortung per GPS", false, "Zusatzmodul"],
    ]);
  });

  it("Kosten: zwei Werte mit Statt-Preis-Wortlaut, Note wörtlich", () => {
    expect(e(mit)).toBe(euro(109.5));
    expect(e(mitStatt)).toBe(euro(129.5));
    expect(inhalt.kosten.answer).toBe(
      `Für eine Person im Büro und vier auf der Baustelle zahlen Sie im Jahresabo ${BEISPIEL_JAHR} netto im Monat bei CraftOS und ${e(mit)} bei Craftnote mit ${e(bueroPlus.centsJahrJeMonat)} für Büro Plus, mit ${e(bueroPlus.stattCents)} gerechnet ${e(mitStatt)}; die Pakete unterscheiden sich im Funktionsumfang.`,
    );
    expect(inhalt.kosten.facts.map((f) => [f.value, f.label])).toEqual([
      [BEISPIEL_JAHR, "CraftOS, 5 Personen, Jahresabo je Monat"],
      [BEISPIEL_MONAT, "CraftOS, 5 Personen, Monatsabo"],
      [e(mit), `Craftnote, 5 Personen, mit ${e(bueroPlus.centsJahrJeMonat)}`],
      [e(mitStatt), `Craftnote, 5 Personen, mit ${e(bueroPlus.stattCents)}`],
    ]);
    expect(inhalt.kosten.note).toBe(
      `Annahme: 1 Person im Büro, 4 auf der Baustelle. CraftOS: 1 Voll-Lizenz + 4 App-Lizenzen. Craftnote: 1 Büro Plus + 4 Baustelle, jährliche Abrechnung. Nicht enthalten: KI-Verbrauch und Extra-Speicher bei CraftOS; Fahrzeug-Modul (${e(fahrzeug.centsJahrJeMonat)} je Tracker und Monat im ersten Jahr, jährliche Abrechnung) und Formularpakete bei Craftnote. Die Pakete unterscheiden sich im Funktionsumfang. Monatswerte rechnerisch aus dem Jahresbetrag, auf Cent gerundet. Netto, Stand ${germanDate(standVon(craftnote))}.`,
    );
  });

  it("Für wen, Umstieg und FAQ laut UI-SPEC § 3.6", () => {
    expect(inhalt.fuerWen.answer).toBe(
      "Craftnote passt zu Betrieben, die Fahrzeuge orten oder länger testen möchten; CraftOS passt zu Betrieben, die monatlich kündbar bleiben und Mitarbeitende mit einer App-Lizenz ausstatten wollen.",
    );
    expect(inhalt.fuerWen.panels[0].points.map((p) => p.text)).toEqual(craftnote.staerken.map((s) => s.wert));
    expect(inhalt.umstieg.steps[0].text).toBe("Craftnote nennt drei Monate Frist vor Ende des Vertragsjahres.");
    expect(inhalt.umstieg.answer).toContain("Ihres Craftnote-Vertrags");
    expect(inhalt.faq.items).toEqual([
      {
        q: "Was kostet Craftnote pro Monat?",
        a: `Craftnote kostet pro Nutzer und Monat ${e(buero.centsJahrJeMonat)} (Büro), ${e(bueroPlus.centsJahrJeMonat)} statt ${e(bueroPlus.stattCents)} (Büro Plus) und ${e(baustelle.centsJahrJeMonat)} (Baustelle), jeweils netto bei jährlicher Abrechnung; mindestens ein Büropaket ist nötig.`,
      },
      {
        q: "Kann ich CraftOS monatlich kündigen?",
        a: `Ja. Das Monatsabo ist monatlich kündbar; das Jahresabo kostet rund ${Math.round(annualSavingPercent)} % weniger als zwölf Monatszahlungen und ist zum Ende der Laufzeit kündbar.`,
      },
      {
        q: "Wie lange kann ich Craftnote und CraftOS kostenlos testen?",
        a: `CraftOS testen Sie ${site.trialDays} Tage ohne Zahlungsdaten. Craftnote nennt ${craftnote.testphaseTage.wert} Tage mit dem Funktionsumfang von Büro Plus, ohne hinterlegte Zahlungsmethode.`,
      },
      {
        q: "Kann ich mit CraftOS Fahrzeuge orten?",
        a: "Nein. CraftOS speichert nur beim Start und Stopp der Zeiterfassung und bei Unterschriften je einen Standortpunkt, ohne Bewegungsverläufe.",
      },
      {
        q: "Brauche ich bei CraftOS für jede Person eine Voll-Lizenz?",
        a: `Nein. Büro und Bauleitung arbeiten mit der Voll-Lizenz, Mitarbeitende auf der Baustelle mit der App-Lizenz für ${APP_MONAT} netto im Monat.`,
      },
    ]);
  });

  it("renderToString besteht die Vorlagenprüfung; Seitenmodul ohne Zahlenliterale", () => {
    pruefeHtml(inhalt);
    pruefeModulLiterale("lib/seiten/alternativen/craftnote.ts");
  });
});

describe("Routen und OG-Dateien", () => {
  it("plancraft: Route rendert die Vorlage, Metadaten aus der Map, OG-Datei vorhanden", async () => {
    const mod = await import("@/app/vergleich/plancraft-alternative/page");
    const html = renderToString(createElement(mod.default));
    expect(html).toContain('id="antwort"');
    expect(String(mod.metadata.title)).toBe("plancraft-Alternative: Preise im Vergleich");
    expect(fs.existsSync(path.join(ROOT, "app/vergleich/plancraft-alternative/opengraph-image.tsx"))).toBe(true);
  });

  it("Craftnote: Route rendert die Vorlage, Metadaten aus der Map, OG-Datei vorhanden", async () => {
    const mod = await import("@/app/vergleich/craftnote-alternative/page");
    const html = renderToString(createElement(mod.default));
    expect(html).toContain('id="antwort"');
    expect(String(mod.metadata.title)).toBe("Craftnote-Alternative: Preise im Vergleich");
    expect(fs.existsSync(path.join(ROOT, "app/vergleich/craftnote-alternative/opengraph-image.tsx"))).toBe(true);
  });
});
