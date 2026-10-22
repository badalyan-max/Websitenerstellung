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
import {
  craftnote,
  hero,
  heroVariante,
  monatAusJahr,
  plancraft,
  standVon,
  tooltime,
  UWG_WORTLISTE,
  uwgTreffer,
} from "@/lib/wettbewerber";
import type { Preis, Wettbewerber } from "@/lib/wettbewerber/types";
import { heroSeite } from "@/lib/seiten/alternativen/hero";

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
        k.kriterium("gaeb", "GAEB-Schnittstelle"),
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

/**
 * Inhaber 22.10.2026 („Nur, was unterstützt wird, nicht, was nicht unterstützt wird“; geht U6 vor): keine
 * CraftOS-Zelle verneint, keine FAQ „Kann/Hat/Bietet … CraftOS …? – Nein“, kein Satz „CraftOS bietet kein …“.
 */
function pruefeNurUnterstuetzt(inhalt: AlternativeInhalt) {
  for (const r of inhalt.tabelle.rows) {
    expect(r.craftos, `${r.label}: CraftOS-Zelle`).not.toBe(false);
    if (typeof r.craftos === "string")
      expect(r.craftos, `${r.label}: CraftOS-Zelle`).not.toMatch(/^\s*(nein|[-–—]|nicht\b)|nicht verfügbar/i);
  }
  for (const item of inhalt.faq.items)
    if (/^(Kann|Hat|Bietet|Unterstützt|Gibt es|Lässt sich)\b/.test(item.q) && /CraftOS/.test(item.q))
      expect(item.a, item.q).not.toMatch(/^Nein\b/);
  for (const t of alleTexte(inhalt))
    expect(t).not.toMatch(/nicht verfügbar|CraftOS (bietet|hat|kann|unterstützt) (kein|nicht)|ohne Bewegungsverläufe/i);
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

  it("Builder wirft bei UWG-Wort, Stärken < 2 und Zelle > 24", () => {
    expect(() =>
      alternativeAusModul(fixtureW(), fixtureSeite((t) => (t.answer = "CraftOS ist günstiger als plancraft.")), PFAD),
    ).toThrow(/günstiger als/);
    const wenig = fixtureW();
    wenig.staerken = wenig.staerken.slice(0, 1);
    expect(() => alternativeAusModul(wenig, fixtureSeite(), PFAD)).toThrow(/mindestens 2 belegte Stärken/);
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

  it("Inhaber 22.10.2026 „Nur, was unterstützt wird“: keine CraftOS-Fairnesszeile nötig, CraftOS-Negativaussagen werfen", () => {
    // Ohne Zeile „Wettbewerber ✓ / CraftOS –“ baut die Seite (Abweichung von U6).
    expect(() => alternativeAusModul(fixtureW(), fixtureSeite(), PFAD)).not.toThrow();
    pruefeNurUnterstuetzt(alternativeAusModul(fixtureW(), fixtureSeite(), PFAD));
    // CraftOS-Zelle verneint: false, „Nein“, Strich, „nicht verfügbar“.
    for (const zelle of [false, "Nein", "–", "—", "-", "nicht verfügbar", "Nicht enthalten"] as const)
      expect(
        () =>
          alternativeAusModul(
            fixtureW(),
            fixtureSeite((t) => t.rows.push({ label: "KI-Telefonempfang", craftos: zelle, wettbewerber: true, quellen: [t.rows[0].quellen[0]] })),
            PFAD,
          ),
        String(zelle),
      ).toThrow(/Inhaber 22\.10\.2026/);
    // Kriterien, die CraftOS nicht anbietet, haben keine CraftOS-Zelle mehr.
    for (const id of ["kiTelefon", "fahrzeugortung"] as const)
      expect(
        () => alternativeAusModul(fixtureW(), (k) => ({ ...fixtureSeite()(k), rows: [k.kriterium(id, "Kriterium")] }), PFAD),
        id,
      ).toThrow(/Inhaber 22\.10\.2026/);
    // FAQ: Frage nach einer CraftOS-Funktion mit „Nein“-Antwort.
    expect(() =>
      alternativeAusModul(
        fixtureW(),
        fixtureSeite((t) => (t.faq[3] = { q: "Kann ich mit CraftOS Fahrzeuge orten?", a: "Nein. CraftOS speichert nur Standortpunkte." })),
        PFAD,
      ),
    ).toThrow(/Inhaber 22\.10\.2026/);
    // Satz, dass CraftOS etwas nicht bietet.
    for (const satz of ["CraftOS bietet keinen KI-Telefonempfang.", "Bei CraftOS ist das nicht verfügbar."])
      expect(
        () => alternativeAusModul(fixtureW(), fixtureSeite((t) => (t.fuerWen.answer = satz)), PFAD),
        satz,
      ).toThrow(/Inhaber 22\.10\.2026/);
    // Belegtes „Nein“ beim Wettbewerber bleibt zulässig, ebenso eine positive „Nein“-Antwort ohne Funktionsfrage.
    expect(() =>
      alternativeAusModul(
        fixtureW(),
        fixtureSeite((t) => {
          t.rows.push({ label: "Zeiterfassung", craftos: true, wettbewerber: false, quellen: [t.rows[0].quellen[0]] });
          t.faq[3] = { q: "Brauche ich bei CraftOS für jede Person eine Voll-Lizenz?", a: "Nein. Mitarbeitende nutzen die App-Lizenz." };
        }),
        PFAD,
      ),
    ).not.toThrow();
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

  it("Tabelle mit 10 Zeilen und Werten aus den Modulen, nur Funktionen, die CraftOS hat (Inhaber 22.10.2026)", () => {
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
    pruefeNurUnterstuetzt(inhalt);
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

  it("Tabelle mit 9 Zeilen und Werten aus den Modulen, nur Funktionen, die CraftOS hat (Inhaber 22.10.2026)", () => {
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
        q: "Brauche ich bei CraftOS für jede Person eine Voll-Lizenz?",
        a: `Nein. Büro und Bauleitung arbeiten mit der Voll-Lizenz, Mitarbeitende auf der Baustelle mit der App-Lizenz für ${APP_MONAT} netto im Monat.`,
      },
    ]);
  });

  it("renderToString besteht die Vorlagenprüfung; Seitenmodul ohne Zahlenliterale", () => {
    pruefeHtml(inhalt);
    pruefeNurUnterstuetzt(inhalt);
    pruefeModulLiterale("lib/seiten/alternativen/craftnote.ts");
  });
});

/** Anbieterschreibweise ganzer Euro („69 €“), sonst mit Cent („74,90 €“). */
const ek = (c: number | undefined) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: c! % 100 === 0 ? 0 : 2 }).format(
    c! / 100,
  );
const APP_JAHR = euro(app.jahr);
const HERO_PFAD = "/vergleich/hero-alternative";

/** HERO ohne Screenshot-Beleg: Variante B ohne Preiszahlen (D-16, U11). */
function heroOhneBeleg(): Wettbewerber {
  const w = structuredClone(hero);
  w.preiseBelegt = null;
  w.preise = { ...w.preise, wert: w.preise.wert.map(({ paket, enthalten }) => ({ paket, enthalten })) };
  delete w.zusatzPreise;
  return w;
}

/** HERO-Seite je Variante (UI-SPEC § 3.6 „HERO“, Inhaber 22.10.2026 ohne Zeile KI-Telefonassistent). */
function pruefeHeroInhalt(w: Wettbewerber, inhalt: AlternativeInhalt) {
  const variante = heroVariante(w);
  const preis = (paket: string): Preis => w.preise.wert.find((p) => p.paket === paket)!;
  const [select, os, osPlus] = [preis("HERO Select"), preis("HERO OS"), preis("HERO OS Plus")];
  const appLizenz = w.zusatzPreise?.appLizenz?.wert;

  expect(inhalt.path).toBe(HERO_PFAD);
  expect(inhalt.kopf.h1).toBe("Die HERO-Software-Alternative im Vergleich");
  expect(inhalt.kopf.keyword).toBe("HERO-Software");
  const kopfCraftos = `CraftOS ist eine HERO-Alternative mit Preis pro Person: Die Voll-Lizenz mit Web-App, Mobile-App und Plantafel kostet ${VOLL_MONAT} netto im Monat.`;
  expect(inhalt.kopf.answer).toBe(
    variante === "A"
      ? `${kopfCraftos} HERO Select kostet ab ${ek(select.centsJahrJeMonat)} netto im Monat bei jährlicher und ab ${ek(select.centsMonat)} bei monatlicher Zahlweise, jeweils mit einer Standard-Lizenz.`
      : `${kopfCraftos} HERO nennt Preise je Plan und Zahlweise auf hero-software.de/preise; laut AGB gilt eine Grundlaufzeit von zwölf Monaten, soweit nicht anders vereinbart.`,
  );

  const preisZeilen =
    variante === "A"
      ? [
          ["Bürozugang, monatliche Zahlung", VOLL_MONAT, `ab ${ek(select.centsMonat)} (Select)`],
          ["Bürozugang, jährliche Zahlung je Monat", VOLL_JAHR_MONAT, `ab ${ek(select.centsJahrJeMonat)} (Select)`],
          ["Weitere mobile Person, jährlich je Monat", `${APP_JAHR_MONAT} (App-Lizenz)`, `${ek(appLizenz!.centsJahrJeMonat)} (App-Lizenz)`],
        ]
      : [["Preise je Plan und Zahlweise", `${VOLL_JAHR_MONAT} (Voll, jährlich)`, "laut hero-software.de"]];
  expect(inhalt.tabelle.rows.map((r) => [r.label, r.craftos, r.wettbewerber])).toEqual([
    ...preisZeilen,
    ["Grundlaufzeit", "1 Monat", `${w.laufzeit.wert} laut AGB`],
    ["Testphase", `${site.trialDays} Tage`, `${w.testphaseTage.wert} Tage`],
    ["Mobile-App für iOS und Android", true, true],
    ["Plantafel", "In Voll-Lizenz", "Ja, ab Select"],
    ["E-Rechnung erstellen", "XRechnung und ZUGFeRD", "ZUGFeRD und XRechnung"],
    ["Zeiterfassung", true, true],
    ["Lager", true, "ab HERO OS"],
  ]);

  const jahr5 = appLizenz && ek(monatAusJahr([select.centsJahrJeMonat! * 12, ...Array(4).fill(appLizenz.centsJahrJeMonat! * 12)]));
  const monat5 = appLizenz && ek(select.centsMonat! + 4 * appLizenz.centsMonat!);
  if (variante === "A") {
    expect(jahr5).toBe(ek(15700));
    expect(monat5).toBe(ek(17900));
    expect(inhalt.kosten.answer).toBe(
      `Für eine Person im Büro und vier auf der Baustelle zahlen Sie bei jährlicher Zahlweise ${BEISPIEL_JAHR} netto im Monat bei CraftOS und ab ${jahr5} bei HERO Select; die Pläne unterscheiden sich im Funktionsumfang.`,
    );
    expect(inhalt.kosten.facts.map((f) => [f.value, f.label])).toEqual([
      [BEISPIEL_JAHR, "CraftOS, 5 Personen, Jahresabo je Monat"],
      [BEISPIEL_MONAT, "CraftOS, 5 Personen, Monatsabo"],
      [`ab ${jahr5}`, "HERO Select, 5 Personen, jährlich"],
      [`ab ${monat5}`, "HERO Select, 5 Personen, monatlich"],
    ]);
    expect(inhalt.kosten.note).toContain("HERO: HERO Select mit 1 Standard-Lizenz + 4 App-Lizenzen, „ab“-Preise laut Preisseite.");
  } else {
    expect(inhalt.kosten.answer).toBe(
      `HERO nennt Preise je Plan und Zahlweise auf hero-software.de/preise; bei CraftOS zahlen eine Person im Büro und vier auf der Baustelle im Jahresabo ${BEISPIEL_JAHR} netto im Monat.`,
    );
    expect(inhalt.kosten.facts.map((f) => [f.value, f.label, f.source])).toEqual([
      [BEISPIEL_JAHR, "CraftOS, 5 Personen, Jahresabo je Monat", "site:tarife-5p-jahr"],
      [BEISPIEL_MONAT, "CraftOS, 5 Personen, Monatsabo", "site:tarife-5p-monat"],
      [VOLL_MONAT, "CraftOS Voll-Lizenz pro Monat", "site:tarife-voll-monat"],
      [APP_MONAT, "CraftOS App-Lizenz pro Monat", "site:tarife-app-monat"],
    ]);
    expect(inhalt.kosten.note).toContain("HERO: Preise je Plan und Zahlweise laut hero-software.de/preise.");
    // D-16/U11: In Variante B steht keine HERO-Preiszahl in Text oder Zelle.
    const heroZahlen = hero.preise.wert.flatMap((p) => [p.centsMonat, p.centsJahrJeMonat]).filter(Boolean) as number[];
    const texte = alleTexte(inhalt).join(" | ");
    for (const c of heroZahlen) expect(texte, ek(c)).not.toMatch(new RegExp(`(^|[^0-9,])${c / 100} €`));
  }
  expect(inhalt.kosten.note).toContain("Nicht enthalten: KI-Verbrauch und Extra-Speicher bei CraftOS.");

  expect(inhalt.fuerWen.answer).toBe(
    "HERO passt zu Betrieben, die KI-Telefonie, Online-Zahlungen oder einen API-Zugang im selben System nutzen möchten; CraftOS passt zu Betrieben, die pro Person abrechnen und monatlich kündbar bleiben wollen.",
  );
  expect(inhalt.fuerWen.panels[0].points.map((p) => p.text)).toEqual(w.staerken.map((s) => s.wert));
  expect(inhalt.fuerWen.panels[0].points.length).toBeGreaterThanOrEqual(2);
  expect(inhalt.umstieg.answer).toContain("Ihres HERO-Vertrags");
  expect(inhalt.umstieg.steps[0].text).toBe("HERO nennt in den AGB einen Monat Frist zum Ende der Laufzeit.");
  expect(inhalt.faq.items).toEqual([
    {
      q: "Was kostet HERO pro Monat?",
      a:
        variante === "A"
          ? `HERO Select kostet ab ${ek(select.centsJahrJeMonat)} netto im Monat bei jährlicher und ab ${ek(select.centsMonat)} bei monatlicher Zahlweise, HERO OS ab ${ek(os.centsJahrJeMonat)} bzw. ${ek(os.centsMonat)}, HERO OS Plus ab ${ek(osPlus.centsJahrJeMonat)} bzw. ${ek(osPlus.centsMonat)}, jeweils mit einer Standard-Lizenz.`
          : "HERO nennt Preise je Plan (Select, HERO OS, HERO OS Plus) und Zahlweise auf hero-software.de/preise, jeweils zuzüglich Umsatzsteuer und mit einer Standard-Lizenz.",
    },
    {
      q: "Welche Laufzeit hat HERO?",
      a: "Laut HERO-AGB beträgt die Grundlaufzeit zwölf Monate, soweit in der Bestellung nichts anderes vereinbart ist, mit einem Monat Kündigungsfrist und automatischer Verlängerung.",
    },
    {
      q: "Wie lange kann ich HERO und CraftOS kostenlos testen?",
      a: `CraftOS testen Sie ${site.trialDays} Tage ohne Zahlungsdaten. HERO nennt eine Testphase von ${w.testphaseTage.wert} Tagen.`,
    },
    {
      q: "Welche Lizenz brauchen Mitarbeitende auf der Baustelle bei CraftOS?",
      a: `Die App-Lizenz für ${APP_MONAT} netto im Monat oder ${APP_JAHR} im Jahr mit Zeiten, Einsätzen, Aufmaß, Fotos, Baudokumentation und Urlaub in der Mobile-App.`,
    },
  ]);
  // „E-Rechnung erstellen“, kein „Empfangen“ (XRechnung-Import laut HERO nicht verfügbar → nicht erwähnt).
  expect(alleTexte(inhalt).filter((t) => /empfang/i.test(t))).toEqual([]);
  expect(alleTexte(inhalt).filter((t) => uwgTreffer(t))).toEqual([]);
  for (const item of inhalt.faq.items) expect(charCount(item.a), item.q).toBeLessThanOrEqual(300);
  pruefeHtml(inhalt);
  pruefeNurUnterstuetzt(inhalt);
}

describe("HERO", () => {
  it(`Seite folgt der belegten Variante ${heroVariante(hero)} (heroVariante)`, () => {
    pruefeHeroInhalt(hero, baueAlternative("hero"));
  });

  it("Variante B (Fixture ohne Screenshot-Beleg): keine HERO-Zahl, „laut hero-software.de“, nur CraftOS-KeyFacts", () => {
    const w = heroOhneBeleg();
    expect(heroVariante(w)).toBe("B");
    pruefeHeroInhalt(w, alternativeAusModul(w, heroSeite, HERO_PFAD));
  });

  it("Seitenmodul ohne Zahlenliterale und ohne „empfangen“", () => {
    pruefeModulLiterale("lib/seiten/alternativen/hero.ts");
    const quelle = fs.readFileSync(path.join(ROOT, "lib/seiten/alternativen/hero.ts"), "utf8");
    expect(quelle).toContain("heroVariante");
    expect(quelle).not.toMatch(/empfangen/i);
  });
});

describe("ToolTime", () => {
  const inhalt = baueAlternative("tooltime");
  const preis = (paket: string): Preis => tooltime.preise.wert.find((p) => p.paket === paket)!;
  const [solo, team, max] = [preis("Solo"), preis("Team"), preis("Max")];
  const teamLizenz = tooltime.zusatzPreise!.teamJeLizenz.wert;
  const datev = tooltime.zusatzPreise!.datev.wert;

  it("Pfad, H1 aus der Map, Kopfwort und Antwort laut UI-SPEC § 3.6", () => {
    expect(inhalt.path).toBe("/vergleich/tooltime-alternative");
    expect(inhalt.kopf.h1).toBe("ToolTime-Alternative: CraftOS im Vergleich");
    expect(inhalt.kopf.keyword).toBe("ToolTime-Alternative:");
    expect(inhalt.kopf.answer).toBe(
      `CraftOS ist eine ToolTime-Alternative mit Preis pro Person und monatlich kündbarem Abo: Die Voll-Lizenz kostet ${VOLL_MONAT} netto im Monat. ToolTime rechnet in Paketen für 1, bis zu 5 oder bis zu 10 Mitarbeitende mit 12 Monaten Mindestlaufzeit ab.`,
    );
  });

  it("Tabelle mit 10 Zeilen, nur Funktionen, die CraftOS hat (Inhaber 22.10.2026); Jahresabo nur „1. Jahr“", () => {
    expect(inhalt.tabelle.rows.map((r) => [r.label, r.craftos, r.wettbewerber])).toEqual([
      ["Abrechnung", "pro Person", "Paket nach Teamgröße"],
      ["Preis je Person, monatliche Zahlung", `${VOLL_MONAT} Voll, ${APP_MONAT} App`, `${ek(teamLizenz.centsMonat)} (Team-Paket)`],
      ["Preis je Person, Jahresabo je Monat", `${VOLL_JAHR_MONAT} Voll, ${APP_JAHR_MONAT} App`, `${ek(teamLizenz.centsJahrJeMonat)} (Team, 1. Jahr)`],
      ["Kürzeste Laufzeit", "1 Monat", tooltime.laufzeit.wert],
      ["Testphase", `${site.trialDays} Tage`, `${tooltime.testphaseTage.wert} Tage`],
      ["Mobile-App für iOS und Android", true, true],
      ["Plantafel", "In Voll-Lizenz", "Ja, ohne Paketangabe"],
      ["E-Rechnung", "XRechnung und ZUGFeRD", "XRechnung und ZUGFeRD"],
      ["DATEV-Export", true, `Erweiterung, ${ek(datev.centsMonat)}/Monat`],
      ["GAEB-Schnittstelle", "Import X83, Export X84", "Import und Export"],
    ]);
    for (const r of inhalt.tabelle.rows.filter((r) => /Jahresabo/.test(r.label)))
      expect(String(r.wettbewerber), r.label).toMatch(/1\. (Jahr|Vertragsjahr)/);
  });

  it("Kosten: Team im ersten Vertragsjahr, regulär derzeit, Note mit P4-Satz", () => {
    expect(inhalt.kosten.answer).toBe(
      `Für fünf Personen zahlen Sie im Jahresabo ${BEISPIEL_JAHR} netto im Monat bei CraftOS mit einer Voll- und vier App-Lizenzen und ${ek(team.centsJahrJeMonat)} bei ToolTime Team im ersten Vertragsjahr, regulär derzeit ${ek(team.regulaerDerzeitCents)}.`,
    );
    expect(inhalt.kosten.facts.map((f) => [f.value, f.label])).toEqual([
      [BEISPIEL_JAHR, "CraftOS, 5 Personen, Jahresabo je Monat"],
      [BEISPIEL_MONAT, "CraftOS, 5 Personen, Monatsabo"],
      [ek(team.centsJahrJeMonat), "ToolTime Team, 1. Vertragsjahr je Monat"],
      [ek(team.centsMonat), "ToolTime Team, monatliche Zahlung"],
    ]);
    expect(inhalt.kosten.note).toContain("ToolTime: Team-Paket für bis zu 5 Mitarbeiter, Jahresabo.");
    expect(inhalt.kosten.note).toContain(
      `Die Jahresabo-Preise gelten laut ToolTime nur im ersten Vertragsjahr; regulär nennt ToolTime derzeit ${ek(team.regulaerDerzeitCents)} (Team). Preise späterer Jahre sind nicht zugesagt.`,
    );
    for (const t of alleTexte(inhalt)) expect(t).not.toMatch(/ab Jahr 2|danach [0-9]/);
  });

  it("Für wen, Umstieg und FAQ laut UI-SPEC § 3.6", () => {
    expect(inhalt.fuerWen.answer).toBe(
      "ToolTime passt zu Betrieben, die einen festen Paketpreis je Teamgröße, Lexware Office oder offline sichtbare Einsatzpläne wollen; CraftOS passt zu Betrieben, die pro Person abrechnen und monatlich kündbar bleiben wollen.",
    );
    expect(inhalt.fuerWen.panels[0].points.map((p) => p.text)).toEqual(tooltime.staerken.map((s) => s.wert));
    expect(inhalt.umstieg.answer).toContain("Ihres ToolTime-Vertrags");
    expect(inhalt.umstieg.steps[0].text).toBe(
      `ToolTime nennt ${tooltime.kuendigungsfristTage!.wert} Tage Frist zum Laufzeitende, in Textform.`,
    );
    expect(inhalt.faq.items).toEqual([
      {
        q: "Was kostet ToolTime pro Monat?",
        a: `ToolTime kostet bei monatlicher Zahlung ${ek(solo.centsMonat)} (Solo), ${ek(team.centsMonat)} (Team, bis zu 5) oder ${ek(max.centsMonat)} (Max, bis zu 10); im Jahresabo im ersten Vertragsjahr ${ek(solo.centsJahrJeMonat)}, ${ek(team.centsJahrJeMonat)} oder ${ek(max.centsJahrJeMonat)}, regulär derzeit ${ek(solo.regulaerDerzeitCents)}, ${ek(team.regulaerDerzeitCents)} oder ${ek(max.regulaerDerzeitCents)} pro Monat.`,
      },
      {
        q: "Kann ich CraftOS ohne lange Vertragsbindung nutzen?",
        a: `Ja. Das Monatsabo ist monatlich kündbar; das Jahresabo kostet rund ${Math.round(annualSavingPercent)} % weniger als zwölf Monatszahlungen und ist zum Ende der Laufzeit kündbar.`,
      },
      {
        q: "Wie lange kann ich ToolTime und CraftOS kostenlos testen?",
        a: `CraftOS testen Sie ${site.trialDays} Tage ohne Zahlungsdaten. ToolTime nennt eine ${tooltime.testphaseTage.wert}-tägige Testversion ohne Zahlungsinformationen.`,
      },
      {
        q: "Hat CraftOS eine DATEV-Schnittstelle?",
        a: `Ja. CraftOS erstellt in der Voll-Lizenz einen DATEV-Export für die Steuerberatung; bei ToolTime ist der DATEV Rechnungsdatenservice eine Erweiterung für ${ek(datev.centsMonat)} im Monat.`,
      },
    ]);
  });

  it("renderToString besteht die Vorlagenprüfung; Seitenmodul ohne Zahlenliterale und ohne Folgejahr-Zusage", () => {
    pruefeHtml(inhalt);
    pruefeNurUnterstuetzt(inhalt);
    expect(alleTexte(inhalt).filter((t) => uwgTreffer(t))).toEqual([]);
    pruefeModulLiterale("lib/seiten/alternativen/tooltime.ts");
    const quelle = fs.readFileSync(path.join(ROOT, "lib/seiten/alternativen/tooltime.ts"), "utf8");
    expect(quelle).not.toMatch(/ab Jahr 2|danach [0-9]/);
    expect(quelle).toContain("ersterJahrespreis");
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

  it("HERO: Route rendert die Vorlage, Metadaten aus der Map, OG-Datei vorhanden", async () => {
    const mod = await import("@/app/vergleich/hero-alternative/page");
    const html = renderToString(createElement(mod.default));
    expect(html).toContain('id="antwort"');
    expect(String(mod.metadata.title)).toBe("HERO Software Alternative im Vergleich");
    expect(fs.existsSync(path.join(ROOT, "app/vergleich/hero-alternative/opengraph-image.tsx"))).toBe(true);
  });

  it("ToolTime: Route rendert die Vorlage, Metadaten aus der Map, OG-Datei vorhanden", async () => {
    const mod = await import("@/app/vergleich/tooltime-alternative/page");
    const html = renderToString(createElement(mod.default));
    expect(html).toContain('id="antwort"');
    expect(String(mod.metadata.title)).toBe("ToolTime-Alternative: Preise im Vergleich");
    expect(fs.existsSync(path.join(ROOT, "app/vergleich/tooltime-alternative/opengraph-image.tsx"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 08-10: Vergleichs-Hub /vergleich (08-UI-SPEC § 5.1, § 3.2, § 3.3, C5; D-02, D-12; Inhaber 22.10.2026)
// ---------------------------------------------------------------------------

const ALTERNATIVEN_PFADE = [
  "/vergleich/plancraft-alternative",
  "/vergleich/craftnote-alternative",
  "/vergleich/hero-alternative",
  "/vergleich/tooltime-alternative",
];
const KB_PFAD = "/vergleich/handwerkersoftware-kleine-betriebe";
const juengsterStand = () => germanDate([plancraft, craftnote, hero, tooltime].map(standVon).reduce((a, b) => (b > a ? b : a)));

describe("/vergleich Inhalte", () => {
  const laden = () => import("@/lib/seiten/vergleich");

  it("Kopf: Antwort wörtlich laut UI-SPEC § 5.1 (≤ 300, ≤ 2 Sätze), Stand-Zeile und Sekundärlink", async () => {
    const { vergleich } = await laden();
    expect(vergleich.kopf.eyebrow).toBe("Vergleich");
    expect(vergleich.kopf.kopfwort).toBe("Handwerkersoftware");
    expect(vergleich.kopf.answer).toBe(
      "Handwerkersoftware unterscheidet sich vor allem in Abrechnung, Laufzeit und Plantafel: CraftOS rechnet pro Person ab und ist monatlich kündbar, plancraft und ToolTime arbeiten mit Paketen, Craftnote mit Paketen pro Nutzer und HERO mit Plänen und Lizenzen.",
    );
    expect(charCount(vergleich.kopf.answer)).toBeLessThanOrEqual(300);
    expect(vergleich.kopf.stand).toBe(`Anbieterangaben Stand ${juengsterStand()}, Quellen unter der Tabelle`);
    expect(vergleich.kopf.secondary).toEqual({ label: "Zur Übersicht", href: "#ueberblick" });
  });

  it("Marktübersicht: fünf Anbieter in der Folge CraftOS, dann alphabetisch, vier Spalten, ohne Hervorhebung", async () => {
    const { vergleich } = await laden();
    const t = vergleich.ueberblick.tabelle;
    expect(t.rows.map((r) => r.label)).toEqual(["CraftOS", "Craftnote", "HERO", "plancraft", "ToolTime"]);
    expect(t.columns.map((c) => c.label)).toEqual(["Abrechnung", "Kürzeste Laufzeit", "Testphase", "Plantafel"]);
    expect(t.columns.some((c) => c.highlight)).toBe(false);
    expect(t.rowHeader).toBe("Anbieter");
    for (const r of t.rows)
      for (const zelle of Object.values(r.cells))
        if (typeof zelle === "string") expect(charCount(zelle), `${r.label}: ${zelle}`).toBeLessThanOrEqual(24);
    const zeile = (label: string) => t.rows.find((r) => r.label === label)!.cells;
    expect(zeile("CraftOS")).toEqual({
      abrechnung: `pro Person, ${tarife.length} Lizenzen`,
      laufzeit: "1 Monat",
      testphase: `${site.trialDays} Tage`,
      plantafel: "In Voll-Lizenz",
    });
    expect(zeile("Craftnote")).toEqual({
      abrechnung: `pro Nutzer, ${craftnote.preise.wert.length} Pakete`,
      laufzeit: craftnote.laufzeit.wert,
      testphase: `${craftnote.testphaseTage.wert} Tage`,
      plantafel: "Ja, ohne Paketangabe",
    });
    expect(zeile("HERO")).toEqual({
      abrechnung: "Plan plus Lizenzen",
      laufzeit: `${hero.laufzeit.wert} laut AGB`,
      testphase: `${hero.testphaseTage.wert} Tage`,
      plantafel: hero.kriterien.plantafel!.wert,
    });
    expect(zeile("plancraft")).toEqual({
      abrechnung: "Paket plus Zugänge",
      laufzeit: plancraft.laufzeit.wert,
      testphase: `${plancraft.testphaseTage.wert} Tage`,
      plantafel: plancraft.kriterien.plantafel!.wert,
    });
    expect(zeile("ToolTime")).toEqual({
      abrechnung: "Paket nach Teamgröße",
      laufzeit: tooltime.laufzeit.wert,
      testphase: `${tooltime.testphaseTage.wert} Tage`,
      plantafel: "Ja, ohne Paketangabe",
    });
  });

  it("jede Wettbewerberzelle stammt aus einem Modul; jede verwendete Quelle genau einmal in sources", async () => {
    const { vergleich } = await laden();
    const t = vergleich.ueberblick.tabelle;
    const datenmodule = [craftnote, hero, plancraft, tooltime];
    const urls = t.sources.map((s) => s.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const z of t.zeilen.filter((z) => z.slug !== "craftos")) {
      const w = datenmodule.find((m) => m.slug === z.slug)!;
      expect(Object.keys(z.belege).sort(), z.anbieter).toEqual(["abrechnung", "laufzeit", "plantafel", "testphase"]);
      for (const beleg of Object.values(z.belege)) {
        expect(beleg.quelle.url.startsWith("https://"), `${z.anbieter}: ${beleg.quelle.url}`).toBe(true);
        expect(new URL(beleg.quelle.url).hostname.endsWith(w.domain)).toBe(true);
        const eintrag = t.sources.find((s) => s.url === beleg.quelle.url);
        expect(eintrag, `${z.anbieter}: Quelle ${beleg.quelle.url} fehlt in sources`).toBeDefined();
        expect(eintrag!.anbieter).toBe(w.name);
        expect(eintrag!.abgerufenAm >= beleg.abgerufenAm).toBe(true);
      }
    }
    const benutzt = new Set(t.zeilen.flatMap((z) => Object.values(z.belege).map((b) => b.quelle.url)));
    expect(new Set(urls)).toEqual(benutzt);
  });

  it("Pflichthinweis und Disclaimer wörtlich (UI-SPEC § 3.2)", async () => {
    const { vergleich } = await laden();
    const t = vergleich.ueberblick.tabelle;
    expect(t.note.startsWith(`Angaben ohne Gewähr, Stand ${juengsterStand()}, `)).toBe(true);
    expect(t.note).toBe(
      `Angaben ohne Gewähr, Stand ${juengsterStand()}, Quellen unter der Tabelle. Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand ${germanDate(site.checkedAt)}.`,
    );
    expect(t.disclaimer).toBe("Die Nennung der Anbieter dient der Zuordnung; es besteht keine Geschäftsbeziehung.");
  });

  it("Einzelvergleiche: vier Alternativen und als fünfte Kachel (wide) die Seite für kleine Betriebe, erlaubte Anordnung", async () => {
    const { vergleich } = await laden();
    const { ERLAUBTE_ANORDNUNGEN } = await import("@/lib/funktionsdetails");
    const kacheln = vergleich.einzelvergleiche.kacheln;
    expect(kacheln).toHaveLength(5);
    expect(kacheln.map((k) => k.href)).toEqual([...ALTERNATIVEN_PFADE, KB_PFAD]);
    expect(kacheln.map((k) => k.size).join("·")).toBe("md·sm·sm·wide·wide");
    expect(ERLAUBTE_ANORDNUNGEN).toContain(kacheln.map((k) => k.size).join("·"));
    expect(kacheln.map((k) => k.title)).toEqual([
      "plancraft-Alternative",
      "Craftnote-Alternative",
      "HERO-Alternative",
      "ToolTime-Alternative",
      "Handwerkersoftware für kleine Betriebe",
    ]);
    expect(kacheln[4].text).toBe("Belegte Kriterien und fünf Anbieter für Betriebe mit wenigen Personen im Überblick.");
    expect(kacheln[4].icon).not.toBe(kacheln[0].icon);
  });

  it("So vergleichen: Frage-H2 mit Antwort ≤ 300 und vier Schritte; FAQ mit vier Einträgen ≤ 300", async () => {
    const { vergleich } = await laden();
    const s = vergleich.sections["so-vergleichen"];
    expect(s.title).toBe("Wie vergleichen Sie Handwerkersoftware?");
    expect(s.lead).toBe(
      "Notieren Sie Ihre Abläufe, rechnen Sie Preise für Ihre Teamgröße, prüfen Sie Laufzeit und Kündigungsfrist und testen Sie mit einem echten Auftrag.",
    );
    expect(vergleich.schritte.map((x) => x.title)).toEqual([
      "Abläufe notieren",
      "Teamgröße rechnen",
      "Laufzeit prüfen",
      "Mit Auftrag testen",
    ]);
    expect(vergleich.faq).toHaveLength(4);
    for (const f of vergleich.faq) expect(charCount(f.a), f.q).toBeLessThanOrEqual(300);
    expect(vergleich.faq.map((f) => f.q)).toEqual([
      "Welche Handwerkersoftware passt zu einem kleinen Betrieb?",
      "Welche Handwerkersoftware ist monatlich kündbar?",
      "Welche Handwerkersoftware hat eine Plantafel?",
      "Woher stammen die Angaben im Vergleich?",
    ]);
  });

  it("FAQ „monatlich kündbar“ und „Plantafel“ leiten sich aus den Modulen ab (Fixture ändert die Antwort)", async () => {
    const { vergleich, baueVergleich } = await laden();
    const antwort = (v: typeof vergleich, q: string) => v.faq.find((f) => f.q.includes(q))!.a;
    expect(antwort(vergleich, "monatlich kündbar")).toBe(
      `Von den fünf verglichenen Anbietern sind CraftOS und plancraft monatlich kündbar; Craftnote und ToolTime nennen ${craftnote.laufzeit.wert} Mindestlaufzeit, HERO nennt laut AGB ${hero.laufzeit.wert} Mindestlaufzeit.`,
    );
    expect(antwort(vergleich, "Plantafel")).toBe(
      "Alle fünf Anbieter nennen eine Plantafel: CraftOS in der Voll-Lizenz, HERO in allen Plänen, plancraft im Paket Premium, sonst als Modul; Craftnote und ToolTime ohne Paketangabe.",
    );

    const tt = structuredClone(tooltime);
    tt.laufzeit = { ...tt.laufzeit, wert: "1 Monat" };
    const monatlich = baueVergleich([plancraft, craftnote, hero, tt]);
    expect(antwort(monatlich, "monatlich kündbar").split(";")[0]).toBe(
      "Von den fünf verglichenen Anbietern sind CraftOS, plancraft und ToolTime monatlich kündbar",
    );

    const cn = structuredClone(craftnote);
    delete cn.kriterien.plantafel;
    const ohneTafel = baueVergleich([plancraft, cn, hero, tooltime]);
    expect(antwort(ohneTafel, "Plantafel").startsWith("Vier der fünf Anbieter nennen eine Plantafel:")).toBe(true);
    expect(antwort(ohneTafel, "Plantafel")).not.toContain("Craftnote");
    expect(ohneTafel.ueberblick.tabelle.rows.find((r) => r.label === "Craftnote")!.cells.plantafel).toBe("nicht angegeben");
  });

  it("Inhaber 22.10.2026 und UWG: keine verneinte CraftOS-Zelle, keine Nein-FAQ, kein „beste“, keine Wortliste, keine Ankündigung", async () => {
    const { vergleich } = await laden();
    for (const r of vergleich.ueberblick.tabelle.rows.filter((r) => r.label === "CraftOS"))
      for (const zelle of Object.values(r.cells)) {
        expect(zelle).not.toBe(false);
        if (typeof zelle === "string") expect(zelle).not.toMatch(/^\s*(nein|[-–—]|nicht\b)|nicht verfügbar/i);
      }
    for (const f of vergleich.faq) expect(f.a, f.q).not.toMatch(/^Nein\b/);
    const texte: string[] = [];
    const walk = (v: unknown) => {
      if (typeof v === "string") texte.push(v);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    walk({ ...vergleich, ueberblick: { ...vergleich.ueberblick, tabelle: { ...vergleich.ueberblick.tabelle, zeilen: [] } } });
    for (const t of texte) {
      expect(uwgTreffer(t), t).toBeUndefined();
      expect(t).not.toMatch(/\bbeste\b|testsieger|Telefon-Agent|MCP-Server|nicht verfügbar|CraftOS (bietet|hat|kann|unterstützt) (kein|nicht)/i);
      expect(t).not.toMatch(/Telefon|Fahrzeug/);
    }
  });

  it("Marktübersicht-Helfer wirft bei verneinter CraftOS-Zelle, Zelle > 24 und unbelegter Wettbewerberzelle", async () => {
    const { baueMarktuebersicht } = await laden();
    const spalte = (craftos: string, zelle: string) => ({
      key: "x",
      label: "X",
      craftos,
      wettbewerber: (w: Wettbewerber) => ({ wert: zelle, beleg: w.laufzeit }),
    });
    expect(() => baueMarktuebersicht({ caption: "Test", spalten: [spalte("1 Monat", "12 Monate")] })).not.toThrow();
    expect(() => baueMarktuebersicht({ caption: "Test", spalten: [spalte("Nein", "12 Monate")] })).toThrow(/Inhaber 22\.10\.2026/);
    expect(() => baueMarktuebersicht({ caption: "Test", spalten: [spalte("1 Monat", "x".repeat(25))] })).toThrow(/24/);
    expect(() =>
      baueMarktuebersicht({
        caption: "Test",
        spalten: [{ key: "x", label: "X", craftos: "1 Monat", wettbewerber: () => ({ wert: "frei erfunden" }) }],
      }),
    ).toThrow(/Quelle/);
  });

  it("Inhaltsmodul ohne Preis- und Tagesliterale, mit Kachel auf die Seite für kleine Betriebe", () => {
    pruefeModulLiterale("lib/seiten/vergleich.ts");
    const quelle = fs.readFileSync(path.join(ROOT, "lib/seiten/vergleich.ts"), "utf8");
    expect(quelle).toContain("handwerkersoftware-kleine-betriebe");
    expect(quelle).not.toMatch(/\bbeste\b|testsieger/i);
  });
});

describe("/vergleich gerendert", () => {
  const rendern = async () => {
    const mod = await import("@/app/vergleich/page");
    return { mod, html: renderToString(createElement(mod.default)) };
  };

  it("eine H1 aus der Map, #antwort ≤ 300 direkt danach, Abschnitte in fester Folge mit H2-ids", async () => {
    const { mod, html } = await rendern();
    const { zielwerte } = await import("@/lib/seo-meta");
    const z = zielwerte("/vergleich");
    expect(String(mod.metadata.title)).toBe(z.titleOhneMarke);
    const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
    expect(h1).toHaveLength(1);
    expect(decode(h1[0][1])).toBe(z.h1);
    const nachH1 = html.slice(html.indexOf("</h1>") + 5);
    const antwort = nachH1.match(/^<p id="antwort" data-answer=""[^>]*>([\s\S]*?)<\/p>/);
    expect(antwort, "#antwort direkt nach der H1").toBeTruthy();
    expect(charCount(decode(antwort![1]))).toBeLessThanOrEqual(300);

    const abschnitte = [...html.matchAll(/data-abschnitt="([^"]+)"/g)].map((m) => m[1]).filter((a) => a !== "kopf");
    expect(abschnitte).toEqual(["ueberblick", "einzelvergleiche", "so-vergleichen", "faq", "cta"]);
    for (const id of ["ueberblick", "einzelvergleiche", "so-vergleichen", "faq"]) {
      expect(html, `section ${id}`).toContain(`data-abschnitt="${id}" aria-labelledby="${id}"`);
      expect(html, `H2 ${id}`).toMatch(new RegExp(`<h2 id="${id}"`));
    }
    const frage = html.match(/<h2 id="so-vergleichen"[^>]*>([\s\S]*?)<\/h2><p[^>]*data-answer=""[^>]*>([\s\S]*?)<\/p>/);
    expect(frage, "Frage-H2 so-vergleichen mit Antwort").toBeTruthy();
    expect(charCount(decode(frage![2]))).toBeLessThanOrEqual(300);
    expect(html).toContain('href="#ueberblick"');
  });

  it("Kacheln verlinken die vier Alternativen und kleine Betriebe; Pflichthinweis, Disclaimer und Quellen im HTML; keine Logos", async () => {
    const { html } = await rendern();
    const { vergleich } = await import("@/lib/seiten/vergleich");
    for (const p of [...ALTERNATIVEN_PFADE, KB_PFAD]) expect(html, p).toContain(`href="${p}"`);
    const text = decode(html);
    expect(text).toContain(vergleich.ueberblick.tabelle.note);
    expect(text).toContain("Die Nennung der Anbieter dient der Zuordnung; es besteht keine Geschäftsbeziehung.");
    for (const s of vergleich.ueberblick.tabelle.sources) expect(html, s.url).toContain(`href="${s.url}"`);
    expect(html).not.toContain("<img");
    expect(html).not.toMatch(/images\/brands|data-highlight="true"/);
    for (const a of html.matchAll(/<a [^>]*href="https:\/\/(?!app\.craftos\.eu)[^"]*"[^>]*>/g)) {
      expect(a[0], a[0]).toContain('rel="nofollow"');
      expect(a[0]).not.toContain("_blank");
    }
    const ctas = [...html.matchAll(/<a [^>]*data-track="trial"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => decode(m[1]));
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    for (const c of ctas) expect(c).toBe(`${site.trialDays} Tage kostenlos testen`);
  });

  it("JSON-LD: genau eine BreadcrumbList (Start, Vergleich), FAQPage = sichtbare FAQ, ein WebPage, kein @graph", async () => {
    const { html } = await rendern();
    const { vergleich } = await import("@/lib/seiten/vergleich");
    expect(html).not.toContain("@graph");
    for (const verboten of ["Product", "Review", "AggregateRating", "Telefon-Agent", "MCP-Server"])
      expect(html, verboten).not.toContain(verboten);
    const blocks = jsonLd(html);
    const crumbs = blocks.filter((b) => b["@type"] === "BreadcrumbList");
    expect(crumbs).toHaveLength(1);
    expect((crumbs[0].itemListElement as { name: string }[]).map((i) => i.name)).toEqual(["Start", "Vergleich"]);
    const faq = blocks.filter((b) => b["@type"] === "FAQPage");
    expect(faq).toHaveLength(1);
    const sichtbar = [...html.matchAll(/<summary[^>]*><h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => decode(m[1]));
    expect(sichtbar).toEqual(vergleich.faq.map((f) => f.q));
    expect((faq[0].mainEntity as { name: string }[]).map((e) => e.name)).toEqual(sichtbar);
    expect(blocks.filter((b) => b["@type"] === "WebPage")).toHaveLength(1);
  });

  it("Altbestände entfernt: keine Logos, keine Logo-Komponente, kein altes CSS-Modul, keine alten Vergleichsdaten", () => {
    for (const datei of [
      "app/vergleich/ProviderLogo.tsx",
      "app/vergleich/Comparison.module.css",
      path.join("lib", "comparison.ts"),
      "public/images/brands/craftnote.png",
      "public/images/brands/plancraft.svg",
    ])
      expect(fs.existsSync(path.join(ROOT, datei)), datei).toBe(false);
    const seite = fs.readFileSync(path.join(ROOT, "app/vergleich/page.tsx"), "utf8");
    expect(seite).not.toMatch(/@graph|<img|PageHero|lib\/comparison/);
  });
});

// ---------------------------------------------------------------------------
// 08-11: /vergleich/handwerkersoftware-kleine-betriebe (08-UI-SPEC § 6, § 3.2, § 3.3, § 9; D-02, D-10, Prompt #1).
// Inhaber 22.10.2026 („Nur, was unterstützt wird“): keine Aussage, dass CraftOS etwas nicht kann.
// ---------------------------------------------------------------------------

const ANBIETER_MODULE = [craftnote, hero, plancraft, tooltime];
const TESTTAGE_MIN = () => Math.min(site.trialDays, ...ANBIETER_MODULE.map((w) => w.testphaseTage.wert));
const TESTTAGE_MAX = () => Math.max(site.trialDays, ...ANBIETER_MODULE.map((w) => w.testphaseTage.wert));
const ISO_DATUM = /^\d{4}-\d{2}-\d{2}$/;

/** Alle Zeichenketten eines Objekts (für Wort- und Negativregeln). */
function texteVon(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => texteVon(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => texteVon(x, out));
  return out;
}

describe("kleine Betriebe Inhalte", () => {
  const laden = () => import("@/lib/seiten/kleine-betriebe");

  it("Kopf: Antwort wörtlich laut UI-SPEC § 6 (≤ 300, ≤ 2 Sätze), Stand-Zeile und „Zu den Kriterien“", async () => {
    const { kleineBetriebe: kb, KLEINE_BETRIEBE_PFAD } = await laden();
    expect(KLEINE_BETRIEBE_PFAD).toBe(KB_PFAD);
    expect(kb.kopf.eyebrow).toBe("Vergleich");
    expect(kb.kopf.kopfwort).toBe("Handwerkersoftware");
    expect(kb.kopf.answer).toBe(
      "Für einen kleinen Handwerksbetrieb eignet sich eine Software, die Angebote, Rechnungen mit E-Rechnung, Einsatzplanung und eine Mobile-App fürs Team abdeckt, für Ihre Personenzahl bezahlbar bleibt und kurz kündbar ist; prüfen Sie das mit einem echten Auftrag.",
    );
    expect(charCount(kb.kopf.answer)).toBeLessThanOrEqual(300);
    expect(kb.kopf.stand).toBe(`Anbieterangaben Stand ${juengsterStand()}, Quellen unter der Tabelle`);
    expect(kb.kopf.secondary).toEqual({ label: "Zu den Kriterien", href: "#kriterien" });
  });

  it("Kriterien: Frage-H2 mit Antwort, sechs Kacheln laut UI-SPEC (sm/md, erlaubte Anordnung), Testphasen-Spanne aus Daten", async () => {
    const { kleineBetriebe: kb } = await laden();
    const { ERLAUBTE_ANORDNUNGEN } = await import("@/lib/funktionsdetails");
    expect(kb.sections.kriterien).toEqual({
      title: "Welche Kriterien zählen für kleine Betriebe?",
      lead: "Wichtig sind E-Rechnung, Kosten für Ihre Personenzahl, Laufzeit, eine Mobile-App fürs Team, GoBD-gerechte Abläufe und ein Test mit echtem Auftrag.",
    });
    const k = kb.kriterien.kacheln;
    expect(k.map((x) => [x.title, x.text])).toEqual([
      ["E-Rechnung empfangen und erstellen", "Zwischen Unternehmen: Empfang seit 2025 Pflicht, Ausstellen ab 2028 grundsätzlich."],
      ["Kosten für Ihre Personenzahl", "Rechnen Sie Büro- und Baustellenzugänge für Ihr Team, nicht nur den Einstiegspreis."],
      ["Laufzeit und Kündigungsfrist", "Die verglichenen Anbieter reichen von monatlich kündbar bis zwölf Monate Laufzeit."],
      ["Mobile-App fürs Team", "Zeiten, Einsätze und Fotos gehören aufs Handy, oft mit eigener, günstigerer Lizenz."],
      ["GoBD-gerechte Abläufe", "Festgeschriebene Rechnungen und nachvollziehbare Korrekturen gehören zur Buchführung."],
      [
        "Test mit echtem Auftrag",
        `Die Testphasen der verglichenen Anbieter reichen von ${TESTTAGE_MIN()} bis ${TESTTAGE_MAX()} Tagen.`,
      ],
    ]);
    for (const x of k) expect(["sm", "md"], x.title).toContain(x.size);
    expect(ERLAUBTE_ANORDNUNGEN).toContain(k.map((x) => x.size).join("·"));
  });

  it("Testphasen- und Laufzeit-Kachel ändern sich mit den Moduldaten (Fixture)", async () => {
    const { baueKleineBetriebe } = await laden();
    const cn = structuredClone(craftnote);
    cn.testphaseTage = { ...cn.testphaseTage, wert: 45 };
    const tt = structuredClone(tooltime);
    tt.laufzeit = { ...tt.laufzeit, wert: "1 Monat" };
    const hr = structuredClone(hero);
    hr.laufzeit = { ...hr.laufzeit, wert: "1 Monat" };
    const cn2 = structuredClone(cn);
    cn2.laufzeit = { ...cn2.laufzeit, wert: "1 Monat" };
    const inhalt = baueKleineBetriebe([plancraft, cn2, hr, tt]);
    const text = (t: string) => inhalt.kriterien.kacheln.find((x) => x.title === t)!.text;
    expect(text("Test mit echtem Auftrag")).toBe(`Die Testphasen der verglichenen Anbieter reichen von ${TESTTAGE_MIN()} bis 45 Tagen.`);
    expect(text("Laufzeit und Kündigungsfrist")).toBe("Alle verglichenen Anbieter sind monatlich kündbar.");
  });

  it("amtliche Quellen: BMF-FAQ E-Rechnung und GoBD mit https-URL auf bundesfinanzministerium.de und Abrufdatum", async () => {
    const { kleineBetriebe: kb } = await laden();
    const quellen = kb.kriterien.quellen;
    expect(quellen.length).toBeGreaterThanOrEqual(2);
    const heute = new Date().toISOString().slice(0, 10);
    for (const q of quellen) {
      expect(q.url.startsWith("https://"), q.url).toBe(true);
      expect(new URL(q.url).hostname.endsWith("bundesfinanzministerium.de"), q.url).toBe(true);
      expect(q.anbieter).toBe("Bundesfinanzministerium");
      expect(q.abgerufenAm).toMatch(ISO_DATUM);
      expect(q.abgerufenAm <= heute).toBe(true);
    }
    expect(quellen.some((q) => /E-Rechnung/.test(q.label))).toBe(true);
    expect(quellen.some((q) => /GoBD/.test(q.label) && /14\.07\.2025/.test(q.label))).toBe(true);
    // Jede amtlich belegte Kachel verweist auf einen Eintrag der Liste.
    for (const titel of ["E-Rechnung empfangen und erstellen", "GoBD-gerechte Abläufe"]) {
      const kachel = kb.kriterien.kacheln.find((x) => x.title === titel)!;
      expect(kachel.quellen.length, titel).toBeGreaterThanOrEqual(1);
      for (const url of kachel.quellen) expect(quellen.map((q) => q.url), titel).toContain(url);
    }
  });

  it("Anbietertabelle: fünf Zeilen, Spalten laut UI-SPEC, Zahlweise in jeder Preiszelle, Zellen ≤ 24, ohne Hervorhebung", async () => {
    const { kleineBetriebe: kb } = await laden();
    const { vergleich } = await import("@/lib/seiten/vergleich");
    const t = kb.anbieter.tabelle;
    expect(t.rows.map((r) => r.label)).toEqual(["CraftOS", "Craftnote", "HERO", "plancraft", "ToolTime"]);
    expect(t.columns.map((c) => c.label)).toEqual(["Abrechnung", "Kürzeste Laufzeit", "Weitere mobile Person", "Testphase"]);
    expect(t.columns.some((c) => c.highlight)).toBe(false);
    for (const r of t.rows)
      for (const zelle of Object.values(r.cells))
        if (typeof zelle === "string") expect(charCount(zelle), `${r.label}: ${zelle}`).toBeLessThanOrEqual(24);
    const person = (label: string) => t.rows.find((r) => r.label === label)!.cells.person;
    expect(person("CraftOS")).toBe(`${euro(app.monat)} (Monatsabo)`);
    expect(person("Craftnote")).toBe(`${e(craftnote.preise.wert.find((p) => p.paket === "Baustelle")!.centsJahrJeMonat)} (Jahresabo)`);
    expect(heroVariante(hero)).toBe("A");
    expect(person("HERO")).toBe(`${ek(hero.zusatzPreise!.appLizenz.wert.centsMonat)} (monatlich)`);
    expect(person("plancraft")).toBe(`${e(plancraft.zusatzPreise!.mobilzugang.wert.centsMonat)} (Monatsabo)`);
    expect(person("ToolTime")).toBe("im Paket, bis 5 Personen");
    for (const r of t.rows) {
      const zelle = String(r.cells.person);
      if (zelle.includes("€")) expect(zelle, r.label).toMatch(/ \([^)]+\)$/);
    }
    // Übrige Spalten wie /vergleich (gemeinsamer Helfer, gleiche Zellen).
    for (const r of t.rows) {
      const hub = vergleich.ueberblick.tabelle.rows.find((x) => x.label === r.label)!.cells;
      expect({ a: r.cells.abrechnung, l: r.cells.laufzeit, t: r.cells.testphase }, r.label).toEqual({
        a: hub.abrechnung,
        l: hub.laufzeit,
        t: hub.testphase,
      });
    }
  });

  it("HERO ohne Screenshot-Beleg: Zelle „laut hero-software.de“ (Variante B, D-16)", async () => {
    const { baueKleineBetriebe } = await laden();
    const inhalt = baueKleineBetriebe([plancraft, craftnote, heroOhneBeleg(), tooltime]);
    expect(inhalt.anbieter.tabelle.rows.find((r) => r.label === "HERO")!.cells.person).toBe("laut hero-software.de");
  });

  it("Pflichthinweis wörtlich (UI-SPEC § 3.2 plus Zahlweise-Satz) und Disclaimer; jede verwendete Quelle genau einmal", async () => {
    const { kleineBetriebe: kb } = await laden();
    const t = kb.anbieter.tabelle;
    expect(t.note.startsWith("Angaben ohne Gewähr, Stand ")).toBe(true);
    expect(t.note).toContain("Quellen unter der Tabelle.");
    expect(t.note).toContain("Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand ");
    expect(t.note).toBe(
      `Angaben ohne Gewähr, Stand ${juengsterStand()}, Quellen unter der Tabelle. Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand ${germanDate(site.checkedAt)}. Weitere mobile Person: netto je Person und Monat, Zahlweise in Klammern.`,
    );
    expect(t.disclaimer).toBe("Die Nennung der Anbieter dient der Zuordnung; es besteht keine Geschäftsbeziehung.");
    const urls = t.sources.map((s) => s.url);
    expect(new Set(urls).size).toBe(urls.length);
    const benutzt = new Set(t.zeilen.flatMap((z) => Object.values(z.belege).map((b) => b.quelle.url)));
    expect(new Set(urls)).toEqual(benutzt);
    for (const z of t.zeilen.filter((z) => z.slug !== "craftos"))
      expect(Object.keys(z.belege).sort(), z.anbieter).toEqual(["abrechnung", "laufzeit", "person", "testphase"]);
  });

  it("Testen: Frage-H2 mit Antwort, vier Schritte und Textlink auf den Ratgeber", async () => {
    const { kleineBetriebe: kb } = await laden();
    expect(kb.sections.testen).toEqual({
      // UI-SPEC § 9: „… Handwerkersoftware …“; gekürzt wegen Silbentrennung im Kopfwort (Sichtprüfung 08-11).
      title: "Wie testen Sie eine Software mit einem Auftrag?",
      lead: "Spielen Sie einen echten Auftrag vom Aufmaß bis zur Rechnung durch und beziehen Sie eine Person von der Baustelle mit ein.",
    });
    expect(kb.schritte.map((s) => s.title)).toEqual(["Auftrag auswählen", "Angebot schreiben", "Baustelle einbinden", "Rechnung stellen"]);
    expect(kb.ratgeber).toEqual({ label: "Ratgeber: Handwerkersoftware auswählen", href: "/blog/handwerkersoftware-auswaehlen" });
    expect(kb.sections.anbieter).toEqual({
      title: "Fünf Anbieter für kleine Betriebe im Überblick",
      lead: "Abrechnung, Laufzeit, Preis für weitere Personen und Testphase laut den Seiten der Anbieter.",
    });
    expect(kb.sections.faq).toEqual({
      title: "Häufige Fragen zu Software für kleine Betriebe",
      lead: "Kurze Antworten zu E-Rechnung, Kosten, Laufzeit und Lizenzen für das Team.",
    });
  });

  it("FAQ: vier Fragen ≤ 300, E-Rechnung mit Ausnahmen laut BMF, CraftOS-Wert aus monatAusJahr (58,13 €)", async () => {
    const { kleineBetriebe: kb } = await laden();
    expect(kb.faq.map((f) => f.q)).toEqual([
      "Ab wann muss ein kleiner Betrieb E-Rechnungen ausstellen?",
      "Was kostet Handwerkersoftware für fünf Personen?",
      "Kann ich Handwerkersoftware monatlich kündigen?",
      "Brauchen Mitarbeitende auf der Baustelle eine eigene Lizenz?",
    ]);
    for (const f of kb.faq) expect(charCount(f.a), f.q).toBeLessThanOrEqual(300);
    const [eRechnung, kosten, kuendigen, lizenz] = kb.faq.map((f) => f.a);
    for (const teil of ["seit dem 1. Januar 2025", "ab 2028 grundsätzlich", "Kleinbetragsrechnungen bis 250 € brutto", "Kleinunternehmern"])
      expect(eRechnung).toContain(teil);
    expect(BEISPIEL_JAHR).toBe("58,13 €");
    expect(kosten).toBe(
      `Bei CraftOS zahlen eine Person im Büro und vier auf der Baustelle im Jahresabo ${BEISPIEL_JAHR} netto im Monat; die Preise der anderen Anbieter stehen in den Einzelvergleichen.`,
    );
    expect(kuendigen.startsWith("Das hängt vom Anbieter ab: ")).toBe(true);
    expect(kuendigen).toContain("CraftOS und plancraft");
    expect(lizenz).toBe(
      `Bei den meisten verglichenen Anbietern ja; bei CraftOS ist das die App-Lizenz für ${euro(app.monat)} netto im Monat, bei ToolTime sind Mitarbeitende im Paketpreis enthalten.`,
    );
  });

  it("Inhaber 22.10.2026 und UWG: keine verneinte CraftOS-Zelle, keine Nein-FAQ, kein „beste“, keine Wortliste, keine Ankündigung", async () => {
    const { kleineBetriebe: kb } = await laden();
    for (const zelle of Object.values(kb.anbieter.tabelle.rows.find((r) => r.label === "CraftOS")!.cells)) {
      expect(zelle).not.toBe(false);
      if (typeof zelle === "string") expect(zelle).not.toMatch(/^\s*(nein|[-–—]|nicht\b)|nicht verfügbar/i);
    }
    for (const f of kb.faq) expect(f.a, f.q).not.toMatch(/^Nein\b/);
    const texte = texteVon({ ...kb, anbieter: { tabelle: { ...kb.anbieter.tabelle, zeilen: [] } } });
    for (const t of texte) {
      expect(uwgTreffer(t), t).toBeUndefined();
      expect(t).not.toMatch(/\bbeste\b|testsieger|Rangfolge|Platz 1|Telefon-Agent|MCP-Server|nicht verfügbar|CraftOS (bietet|hat|kann|unterstützt) (kein|nicht)/i);
      expect(t).not.toMatch(/Telefon|Fahrzeug/);
    }
  });

  it("Inhaltsmodul: keine Preis- und Tagesliterale, amtliche Quellen mit abgerufenAm, Marktübersicht über den Helfer aus lib/seiten/vergleich", () => {
    pruefeModulLiterale("lib/seiten/kleine-betriebe.ts");
    const quelle = fs.readFileSync(path.join(ROOT, "lib/seiten/kleine-betriebe.ts"), "utf8");
    expect(quelle).toContain("bundesfinanzministerium.de");
    expect(quelle).toContain("abgerufenAm");
    expect(quelle).toContain("@/lib/seiten/vergleich");
    expect(quelle).toContain("baueMarktuebersicht(");
    expect(quelle).not.toMatch(/\bbeste\b|testsieger/i);
  });
});

describe("kleine Betriebe gerendert", () => {
  const rendern = async () => {
    const mod = await import("@/app/vergleich/handwerkersoftware-kleine-betriebe/page");
    return { mod, html: renderToString(createElement(mod.default)) };
  };
  /** HTML eines Abschnitts (bis zum nächsten data-abschnitt). */
  const abschnitt = (html: string, id: string) => {
    const start = html.indexOf(`data-abschnitt="${id}"`);
    const ende = html.indexOf("data-abschnitt=", start + 20);
    return html.slice(start, ende < 0 ? undefined : ende);
  };

  it("eine H1 aus der Map, #antwort ≤ 300 direkt danach, Abschnitte in fester Folge, Frage-H2 mit Antwort", async () => {
    const { mod, html } = await rendern();
    const { zielwerte } = await import("@/lib/seo-meta");
    const z = zielwerte(KB_PFAD);
    expect(String(mod.metadata.title)).toBe(z.titleOhneMarke);
    expect(mod.metadata.description).toBe(z.description);
    const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
    expect(h1).toHaveLength(1);
    expect(decode(h1[0][1])).toBe(z.h1);
    const nachH1 = html.slice(html.indexOf("</h1>") + 5);
    const antwort = nachH1.match(/^<p id="antwort" data-answer=""[^>]*>([\s\S]*?)<\/p>/);
    expect(antwort, "#antwort direkt nach der H1").toBeTruthy();
    expect(charCount(decode(antwort![1]))).toBeLessThanOrEqual(300);

    const abschnitte = [...html.matchAll(/data-abschnitt="([^"]+)"/g)].map((m) => m[1]).filter((a) => a !== "kopf");
    expect(abschnitte).toEqual(["kriterien", "anbieter", "testen", "faq", "cta"]);
    for (const id of ["kriterien", "anbieter", "testen", "faq"]) {
      expect(html, `section ${id}`).toContain(`data-abschnitt="${id}" aria-labelledby="${id}"`);
      expect(html, `H2 ${id}`).toMatch(new RegExp(`<h2 id="${id}"`));
    }
    for (const id of ["kriterien", "testen"]) {
      const m = html.match(new RegExp(`<h2 id="${id}"[^>]*>([\\s\\S]*?)</h2><p[^>]*data-answer=""[^>]*>([\\s\\S]*?)</p>`));
      expect(m, `Frage-H2 ${id} mit Antwort`).toBeTruthy();
      expect(decode(m![1]).endsWith("?"), id).toBe(true);
      expect(charCount(decode(m![2])), id).toBeLessThanOrEqual(300);
    }
    expect(html).toContain('href="#kriterien"');
  });

  it("Kriterien mit amtlicher Quellenliste darunter; Tabelle mit Pflichthinweis, Quellen und Disclaimer ohne Hervorhebung", async () => {
    const { html } = await rendern();
    const { kleineBetriebe: kb } = await import("@/lib/seiten/kleine-betriebe");
    const kriterien = abschnitt(html, "kriterien");
    for (const k of kb.kriterien.kacheln) expect(decode(kriterien), k.title).toContain(k.title);
    const liste = kriterien.match(/<ol[^>]*aria-label="Quellen zu den Kriterien"[^>]*>([\s\S]*?)<\/ol>/);
    expect(liste, "Quellenliste unter den Kriterien").toBeTruthy();
    expect(kriterien.indexOf("Quellen zu den Kriterien")).toBeGreaterThan(kriterien.lastIndexOf(kb.kriterien.kacheln.at(-1)!.title));
    for (const q of kb.kriterien.quellen) {
      expect(liste![1], q.url).toContain(`href="${q.url}"`);
      expect(decode(liste![1])).toContain(`${q.anbieter}: ${q.label}, abgerufen am ${germanDate(q.abgerufenAm)}`);
    }

    const anbieter = abschnitt(html, "anbieter");
    const text = decode(anbieter);
    expect(text).toContain(kb.anbieter.tabelle.note);
    expect(text).toContain("Die Nennung der Anbieter dient der Zuordnung; es besteht keine Geschäftsbeziehung.");
    for (const s of kb.anbieter.tabelle.sources) expect(anbieter, s.url).toContain(`href="${s.url}"`);
    expect(html).not.toMatch(/data-highlight="true"|images\/brands|<img/);
    for (const a of html.matchAll(/<a [^>]*href="https:\/\/(?!app\.craftos\.eu)[^"]*"[^>]*>/g)) {
      expect(a[0], a[0]).toContain('rel="nofollow"');
      expect(a[0]).not.toContain("_blank");
    }
  });

  it("Testen verlinkt den Ratgeber; CTAs nennen genau site.trialDays", async () => {
    const { html } = await rendern();
    const testen = abschnitt(html, "testen");
    expect(testen).toMatch(/<a [^>]*href="\/blog\/handwerkersoftware-auswaehlen"[^>]*>([\s\S]*?)<\/a>/);
    expect(decode(testen)).toContain("Ratgeber: Handwerkersoftware auswählen");
    const ctas = [...html.matchAll(/<a [^>]*data-track="trial"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => decode(m[1]));
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    for (const c of ctas) expect(c).toBe(`${site.trialDays} Tage kostenlos testen`);
  });

  it("JSON-LD: genau eine BreadcrumbList (Start, Vergleich, Für kleine Betriebe), FAQPage = sichtbare FAQ, ein WebPage", async () => {
    const { html } = await rendern();
    const { kleineBetriebe: kb } = await import("@/lib/seiten/kleine-betriebe");
    expect(html).not.toContain("@graph");
    for (const verboten of ["Product", "Review", "AggregateRating", "Telefon-Agent", "MCP-Server"])
      expect(html, verboten).not.toContain(verboten);
    const blocks = jsonLd(html);
    const crumbs = blocks.filter((b) => b["@type"] === "BreadcrumbList");
    expect(crumbs).toHaveLength(1);
    expect((crumbs[0].itemListElement as { name: string }[]).map((i) => i.name)).toEqual(["Start", "Vergleich", "Für kleine Betriebe"]);
    const faq = blocks.filter((b) => b["@type"] === "FAQPage");
    expect(faq).toHaveLength(1);
    const sichtbar = [...html.matchAll(/<summary[^>]*><h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => decode(m[1]));
    expect(sichtbar).toEqual(kb.faq.map((f) => f.q));
    expect((faq[0].mainEntity as { name: string }[]).map((e) => e.name)).toEqual(sichtbar);
    expect(blocks.filter((b) => b["@type"] === "WebPage")).toHaveLength(1);
  });

  it("Route mit eigenem OG-Bild; Seite ohne Sammelgraph, Bild und PageHero", () => {
    expect(fs.existsSync(path.join(ROOT, "app/vergleich/handwerkersoftware-kleine-betriebe/opengraph-image.tsx"))).toBe(true);
    const og = fs.readFileSync(path.join(ROOT, "app/vergleich/handwerkersoftware-kleine-betriebe/opengraph-image.tsx"), "utf8");
    expect(og).toContain('kind: "Vergleich"');
    const seite = fs.readFileSync(path.join(ROOT, "app/vergleich/handwerkersoftware-kleine-betriebe/page.tsx"), "utf8");
    expect(seite).toContain("metaFor(");
    expect(seite).not.toMatch(/@graph|<img|PageHero/);
  });

  it("beide Ratgeber zur Softwareauswahl verlinken die Seite mit genau einem Satz am Artikelende", () => {
    for (const slug of ["handwerkersoftware-auswaehlen", "handwerkersoftware-einzelunternehmen"]) {
      const md = fs.readFileSync(path.join(ROOT, `content/blog/${slug}.md`), "utf8");
      expect(md.split(KB_PFAD).length - 1, slug).toBe(1);
      const satz = `Anbieter und Kriterien im Vergleich: [Handwerkersoftware für kleine Betriebe](${KB_PFAD}).`;
      expect(md.trimEnd().endsWith(satz), slug).toBe(true);
    }
  });
});
