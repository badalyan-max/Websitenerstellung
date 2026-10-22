/**
 * Preisseite `/preise` answer-first auf v2-Bausteinen (Phase 8, Plan 08-07; SEO-04, SEO-06, SEO-09, D-05, D-09,
 * D-12, D-16). Inhalte in lib/seiten/preise.ts: alle CraftOS-Werte aus lib/site.ts (tarife, zahlung, extraSpeicher,
 * startCredits, creditUmrechnung, creditPakete, vertrag), Wettbewerberwerte nur aus lib/wettbewerber/*.
 * Wortlaut nach 08-UI-SPEC § 4; Begriff sitewide „Extra-Speicher“.
 */
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PreisePage, { metadata } from "@/app/preise/page";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { KEY_FACT_SOURCE } from "@/components/v2/KeyFacts";
import { appTiles } from "@/lib/app-content";
import { euro, germanDate } from "@/lib/format";
import { metaFor, zielwerte } from "@/lib/seo-meta";
import {
  annualSavingPercent,
  creditPakete,
  creditUmrechnung,
  creditWertEuro,
  extraSpeicher,
  site,
  startCredits,
  tarife,
  vertrag,
  zahlung,
} from "@/lib/site";
import {
  craftnote,
  hero,
  heroVariante,
  monatAusJahr,
  plancraft,
  quellenFuer,
  tooltime,
  uwgTreffer,
  wettbewerber,
} from "@/lib/wettbewerber";
import * as preise from "@/lib/seiten/preise";

const root = path.resolve(import.meta.dirname, "..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const voll = tarife.find((t) => t.id === "voll")!;
const app = tarife.find((t) => t.id === "app")!;
const cents = (v: number) => Math.round(v * 100);
const ganz = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
/** Wettbewerberbeträge: ganze Euro ohne Nachkommastellen („89 €“), sonst mit Cent („74,90 €“). */
const betrag = (c: number) => (c % 100 === 0 ? ganz.format(c / 100) : euro(c / 100));
const paketVon = (preis: readonly { paket: string }[], name: string) => {
  const p = preis.find((x) => x.paket === name);
  if (!p) throw new Error(`Paket ${name} fehlt`);
  return p as (typeof preis)[number] & Record<string, number | string | boolean | undefined>;
};

/** Alle sichtbaren Texte des Inhaltsmoduls (für Wortlisten-Prüfungen). */
function alleTexte(): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk({
    kopf: preise.preiseKopf,
    sections: preise.preiseSections,
    lizenz: preise.lizenzTabelle,
    kacheln: preise.appLizenzKacheln.map((k) => ({ title: k.title, text: k.text })),
    zusatz: preise.zusatzkostenFakten,
    markt: preise.marktspanne,
    faq: preise.preiseFaq,
  });
  return out;
}

describe("Inhalte", () => {
  it("Abschnittsfolge und Flächenrhythmus (Kopf dunkel → Weiß → Warm → Weiß → Warm → Weiß → CTA dunkel)", () => {
    expect(preise.PREISE_SECTION_IDS).toEqual(["lizenzen", "app-lizenz", "zusatzkosten", "was-kostet-handwerkersoftware", "faq"]);
    expect(preise.PREISE_SURFACES).toEqual({
      kopf: "dark",
      lizenzen: "white",
      "app-lizenz": "warm",
      zusatzkosten: "white",
      "was-kostet-handwerkersoftware": "warm",
      faq: "white",
      cta: "dark",
    });
  });

  it("Kopf: Antwortsatz aus tarife (≤ 300, 1–2 Sätze, netto), Stand-Zeile, Sekundärlink", () => {
    const k = preise.preiseKopf;
    expect(k.answer).toBe(
      `CraftOS kostet ${euro(voll.monat)} netto pro Person und Monat für die Voll-Lizenz mit Web-App und Mobile-App oder ${euro(voll.jahr)} im Jahresabo; die App-Lizenz für Mitarbeitende auf der Baustelle kostet ${euro(app.monat)} im Monat oder ${euro(app.jahr)} im Jahr.`,
    );
    expect(charCount(k.answer)).toBeLessThanOrEqual(TEXT_BUDGET.answer);
    expect(sentenceCount(k.answer)).toBeGreaterThanOrEqual(1);
    expect(sentenceCount(k.answer)).toBeLessThanOrEqual(2);
    expect(k.answer).toContain("netto");
    expect(k.stand).toBe(`Preise netto zzgl. USt., Stand ${germanDate(site.checkedAt)}`);
    expect(k.eyebrow).toBe("Preise");
    expect(zielwerte("/preise").h1).toContain(k.kopfwort);
    expect(k.kopfwort).toBe("Handwerkersoftware");
    expect(k.secondary).toEqual({ label: "Lizenzen vergleichen", href: "#lizenzen" });
  });

  it("Lizenztabelle: 12 Zeilen, Werte aus tarife, Jahresabo je Monat über monatAusJahr, Zellen ≤ 24, Note", () => {
    const t = preise.lizenzTabelle;
    expect(t.caption).toBe("Voll-Lizenz und App-Lizenz im Vergleich");
    expect(t.rowHeader).toBe("Leistung");
    expect(t.columns).toEqual([
      { key: "voll", label: voll.name, highlight: true },
      { key: "app", label: app.name },
    ]);
    expect(t.rows.map((r) => r.label)).toEqual([
      "Monatsabo, netto",
      "Jahresabo, netto",
      "Jahresabo je Monat, rechnerisch",
      "Für wen",
      "Web-App",
      "Mobile-App",
      "Angebote, Rechnungen und E-Rechnung",
      "Plantafel und Projekte",
      "Zeiten und zugewiesene Einsätze",
      "Aufmaß, Fotos und Baudokumentation",
      "Urlaub und Abwesenheiten",
      "Belege, DATEV und Nachkalkulation",
    ]);
    const zeile = (label: string) => t.rows.find((r) => r.label === label)!.cells;
    expect(zeile("Monatsabo, netto")).toEqual({ voll: euro(voll.monat), app: euro(app.monat) });
    expect(zeile("Jahresabo, netto")).toEqual({ voll: euro(voll.jahr), app: euro(app.jahr) });
    expect(zeile("Jahresabo je Monat, rechnerisch")).toEqual({
      voll: euro(monatAusJahr([cents(voll.jahr)]) / 100),
      app: euro(monatAusJahr([cents(app.jahr)]) / 100),
    });
    expect(zeile("Für wen")).toEqual({ voll: "Büro und Bauleitung", app: "Team auf der Baustelle" });
    for (const r of t.rows) {
      expect(charCount(r.label), r.label).toBeLessThanOrEqual(TEXT_BUDGET.comparison.rowLabel);
      for (const c of Object.values(r.cells)) if (typeof c === "string") expect(charCount(c), c).toBeLessThanOrEqual(24);
    }
    expect(t.note.startsWith("Alle Preise netto zzgl. Umsatzsteuer, pro Person.")).toBe(true);
    expect(t.note).toContain(`rund ${Math.round(annualSavingPercent)} %`);
    expect(t.note).toContain(`Quelle: Preisliste CraftOS, Stand ${germanDate(site.checkedAt)}.`);
  });

  it("Lizenztabelle: Ja/Nein-Zellen passen zu tarife.highlights (App-Lizenz nur mobile Funktionen, Belege nur Voll-Lizenz)", () => {
    const stichwort: Record<string, string> = {
      "Web-App": "Web-App",
      "Mobile-App": "Mobile-App",
      "Angebote, Rechnungen und E-Rechnung": "Angebote",
      "Plantafel und Projekte": "Plantafel",
      "Zeiten und zugewiesene Einsätze": "Zeiten",
      "Aufmaß, Fotos und Baudokumentation": "Aufmaß",
      "Urlaub und Abwesenheiten": "Urlaub",
      "Belege, DATEV und Nachkalkulation": "Belege",
    };
    for (const [label, wort] of Object.entries(stichwort)) {
      const cells = preise.lizenzTabelle.rows.find((r) => r.label === label)!.cells;
      expect(cells.voll, label).toBe(true);
      const imApp = app.highlights.some((h) => h.includes(wort));
      // ME-01 (Inhaber 22.10.2026): keine „Nein“-Zelle, sondern der Hinweis auf die Lizenz mit dieser Leistung.
      expect(cells.app, label).toBe(imApp ? true : "mit Voll-Lizenz");
      if (!imApp) expect(voll.highlights.some((h) => h.includes(wort)), label).toBe(true);
    }
  });

  it("Frage-Abschnitte beantworten ihre Frage direkt (≤ 300, 1–2 Sätze); Nicht-Frage-Leads ≤ 140 mit einem Satz", () => {
    const s = preise.preiseSections;
    expect(s.lizenzen.title).toBe("Preise und Lizenzen im Überblick");
    expect(s.lizenzen.lead).toBe("Die Voll-Lizenz deckt Büro und Baustelle ab, die App-Lizenz ergänzt sie für Ihr Team auf der Baustelle.");
    expect(s["app-lizenz"].title).toBe("Was kostet die App-Lizenz für Mitarbeitende?");
    expect(s.zusatzkosten.title).toBe("Welche Kosten kommen zur Lizenz hinzu?");
    expect(s["was-kostet-handwerkersoftware"].title).toBe("Was kostet eine Handwerkersoftware pro Monat?");
    expect(s.faq.title).toBe("Häufige Fragen zu den Preisen");
    expect(s.faq.lead).toBe("Kurze Antworten zu Test, Abo, Jahresrabatt und Credits.");
    for (const id of preise.PREISE_SECTION_IDS) {
      const { title, lead } = s[id];
      expect(charCount(title), id).toBeLessThanOrEqual(TEXT_BUDGET.sectionHeader.title);
      if (title.endsWith("?")) {
        expect(charCount(lead), id).toBeLessThanOrEqual(300);
        expect(sentenceCount(lead), id).toBeGreaterThanOrEqual(1);
        expect(sentenceCount(lead), id).toBeLessThanOrEqual(2);
      } else {
        expect(charCount(lead), id).toBeLessThanOrEqual(TEXT_BUDGET.sectionHeader.lead);
        expect(sentenceCount(lead), id).toBe(1);
      }
    }
    expect(s["app-lizenz"].lead).toBe(
      `Die App-Lizenz kostet ${euro(app.monat)} netto pro Person im Monat oder ${euro(app.jahr)} im Jahr und gibt Mitarbeitenden auf der Baustelle Zeiten, Einsätze, Aufmaß, Fotos und Urlaub in der Mobile-App.`,
    );
    expect(s.zusatzkosten.lead).toBe(
      "Hinzu kommen nur Credits für Craft AI und KI-Belegscans sowie Speicher über den 50-GB-Pool Ihres Betriebs hinaus; die Kernmodule gehören zur Voll-Lizenz.",
    );
    expect(s.cta).toEqual({
      title: "Machen Sie Platz für Ihr Handwerk.",
      text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
      secondary: { label: "Alle Funktionen ansehen", href: "/funktionen" },
    });
  });

  it("App-Lizenz: vier belegte /app-Kacheln (Zeiten, Einsätze, Aufmaß, Urlaub) mit unverändertem Text", () => {
    const k = preise.appLizenzKacheln;
    expect(k.map((x) => x.title)).toEqual(["Zeiterfassung mit Standort", "Einsätze mit Navigation", "Aufmaß vor Ort", "Urlaub beantragen"]);
    const bestand = [...appTiles.zeit, ...appTiles.dokumentieren, ...appTiles.material];
    for (const kachel of k) {
      const quelle = bestand.find((t) => t.title === kachel.title)!;
      expect(kachel.text).toBe(quelle.text);
      expect(kachel.href).toBe(quelle.href);
    }
    expect(new Set(k.map((x) => x.size)).size).toBeGreaterThanOrEqual(2);
    expect(k.filter((x) => x.surface === "dark")).toHaveLength(1);
  });

  it("Zusatzkosten: vier KeyFacts aus site.ts (nur site:-Quellen), Note mit Credit-Umrechnung und Extra-Speicher", () => {
    const z = preise.zusatzkostenFakten;
    expect(z.facts.map((f) => [f.value, f.label])).toEqual([
      ["50 GB", "Speicher-Pool pro Betrieb"],
      [euro(extraSpeicher.monat), `je ${extraSpeicher.gb} GB Extra-Speicher im Monat`],
      [String(startCredits), "Credits Startguthaben, einmalig"],
      [euro(creditWertEuro), "Wert eines Credits"],
    ]);
    for (const f of z.facts) {
      expect(f.source.startsWith("site:"), f.source).toBe(true);
      expect(KEY_FACT_SOURCE.test(f.source), f.source).toBe(true);
      expect(charCount(f.value)).toBeLessThanOrEqual(TEXT_BUDGET.keyFact.value);
      expect(charCount(f.label)).toBeLessThanOrEqual(TEXT_BUDGET.keyFact.label);
    }
    expect(z.note).toContain(`Craft AI und KI-Belegscans (${creditUmrechnung})`);
    expect(z.note).toContain(`Extra-Speicher kostet ${euro(extraSpeicher.monat)} im Monat oder ${euro(extraSpeicher.jahr)} im Jahr je ${extraSpeicher.gb} GB`);
    expect(z.note).toContain("netto");
  });

  it("Marktspanne: 5 Anbieterzeilen ohne Hervorhebung, Werte nur aus lib/wettbewerber, HERO nach Variante", () => {
    const m = preise.marktspanne;
    expect(m.caption).toBe("Einstiegspakete im Vergleich");
    expect(m.rowHeader).toBe("Anbieter");
    expect(m.columns.map((c) => c.label)).toEqual(["Kleinstes Paket", "Monatlich", "Jahresabo je Monat"]);
    expect(m.columns.some((c) => "highlight" in c && c.highlight)).toBe(false);
    expect(m.rows.map((r) => r.label)).toEqual(["CraftOS", "Craftnote", "HERO", "plancraft", "ToolTime"]);
    const z = (label: string) => m.rows.find((r) => r.label === label)!.cells;
    expect(z("CraftOS")).toEqual({ paket: voll.name, monat: euro(voll.monat), jahr: euro(monatAusJahr([cents(voll.jahr)]) / 100) });

    // HI-01: kleinstes buchbares Paket laut Datenmodul („Büro“); „Baustelle“ nur zusätzlich zu einem Büropaket.
    const cn = paketVon(craftnote.preise.wert, "Büro");
    expect(z("Craftnote")).toEqual({ paket: "Büro", monat: "nicht angegeben", jahr: betrag(cn.centsJahrJeMonat as number) });
    const pc = paketVon(plancraft.preise.wert, "Business");
    expect(z("plancraft")).toEqual({ paket: "Business", monat: betrag(pc.centsMonat as number), jahr: betrag(pc.centsJahrJeMonat as number) });
    const tt = paketVon(tooltime.preise.wert, "Solo");
    expect(z("ToolTime")).toEqual({
      paket: "Solo (1 Person)",
      monat: betrag(tt.centsMonat as number),
      jahr: `${betrag(tt.centsJahrJeMonat as number)} (1. Vertragsjahr)`,
    });
    if (heroVariante(hero) === "A") {
      const h = paketVon(hero.preise.wert, "HERO Select");
      expect(z("HERO")).toEqual({ paket: "Select", monat: `ab ${betrag(h.centsMonat as number)}`, jahr: `ab ${betrag(h.centsJahrJeMonat as number)}` });
    } else {
      expect(z("HERO")).toEqual({ paket: "Select", monat: "laut hero-software.de", jahr: "laut hero-software.de" });
    }
    for (const r of m.rows) for (const c of Object.values(r.cells)) expect(charCount(String(c)), String(c)).toBeLessThanOrEqual(24);
  });

  it("Marktspanne: Antwort nennt Min und Max je Zahlweise aus den Tabellenzeilen, ohne unbelegte Einschränkung", () => {
    const pc = paketVon(plancraft.preise.wert, "Business");
    const tt = paketVon(tooltime.preise.wert, "Solo");
    const cn = paketVon(craftnote.preise.wert, "Büro");
    const monat = [cents(voll.monat), pc.centsMonat as number, tt.centsMonat as number];
    const jahr = [monatAusJahr([cents(voll.jahr)]), cn.centsJahrJeMonat as number, pc.centsJahrJeMonat as number, tt.centsJahrJeMonat as number];
    if (heroVariante(hero) === "A") {
      const h = paketVon(hero.preise.wert, "HERO Select");
      monat.push(h.centsMonat as number);
      jahr.push(h.centsJahrJeMonat as number);
    }
    const spanne = (werte: number[]) => ({ minCents: Math.min(...werte), maxCents: Math.max(...werte) });
    expect(preise.marktspanne.spanne).toEqual({ monat: spanne(monat), jahr: spanne(jahr) });
    const fmt = (c: number) =>
      c === cents(voll.monat) || c === monatAusJahr([cents(voll.jahr)]) ? euro(c / 100) : betrag(c);
    const m = spanne(monat);
    const j = spanne(jahr);
    const lead = preise.preiseSections["was-kostet-handwerkersoftware"].lead;
    expect(lead).toBe(
      `Das kleinste Paket kostet bei monatlicher Zahlung zwischen ${fmt(m.minCents)} und ${fmt(m.maxCents)} netto im Monat, im Jahresabo zwischen ${fmt(j.minCents)} und ${fmt(j.maxCents)} je Monat; weitere Personen kosten je nach Anbieter extra.`,
    );
    // Craftnote „Büro“ (nur jährliche Abrechnung) liegt in der Jahresspanne.
    expect(j.minCents).toBeLessThanOrEqual(cn.centsJahrJeMonat as number);
    expect(j.maxCents).toBeGreaterThanOrEqual(cn.centsJahrJeMonat as number);
    // Keine Einschränkung, die das Datenmodul nicht belegt (HI-01).
    for (const t of [lead, preise.marktspanne.caption, ...preise.marktspanne.columns.map((c) => c.label)])
      expect(t).not.toMatch(/Angebot|Rechnung/);
  });

  it("Marktspanne: jede Anbieterzeile zeigt das kleinste buchbare Paket (Ausschluss nur mit belegtem Mindestpaket)", () => {
    const einstieg = (p: { centsMonat?: number; centsJahrJeMonat?: number }) => p.centsMonat ?? p.centsJahrJeMonat ?? Infinity;
    for (const w of [craftnote, hero, plancraft, tooltime]) {
      const zeile = preise.marktspanne.rows.find((r) => r.label === w.name)!;
      const ausgeschlossen = preise.NUR_ZUSAETZLICH[w.slug] ?? [];
      if (ausgeschlossen.length) expect(w.angaben?.mindestpaket?.quelle.url, w.name).toMatch(/^https:\/\//);
      const buchbar = w.preise.wert.filter((p) => !ausgeschlossen.includes(p.paket));
      const kleinstes = [...buchbar].sort((a, b) => einstieg(a) - einstieg(b))[0];
      expect(String(zeile.cells.paket).startsWith(kleinstes.paket.replace(/^HERO\s+/, "")), w.name).toBe(true);
    }
    expect(preise.NUR_ZUSAETZLICH).toEqual({ craftnote: ["Baustelle"] });
  });

  it("Marktspanne: Quellenliste enthält alle Preisquellen, Pflichthinweis, Pakethinweis und Disclaimer", () => {
    const m = preise.marktspanne;
    const urls = new Set(m.sources.map((q) => q.url));
    for (const w of wettbewerber) for (const q of quellenFuer(w, ["preise"])) expect(urls.has(q.url), `${w.name}: ${q.url}`).toBe(true);
    for (const q of m.sources) {
      expect(q.url.startsWith("https://")).toBe(true);
      expect(q.abgerufenAm).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    expect(m.note.startsWith("Angaben ohne Gewähr, Stand ")).toBe(true);
    expect(m.note).toContain("Quellen unter der Tabelle. Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand ");
    expect(m.note).toContain(germanDate(site.checkedAt));
    expect(m.note.endsWith("Die Pakete unterscheiden sich im Funktionsumfang und in der Zahl der enthaltenen Personen.")).toBe(true);
    expect(m.disclaimer).toBe("Die Nennung der Anbieter dient der Zuordnung; es besteht keine Geschäftsbeziehung.");
  });

  it("FAQ: 6 eindeutige Fragen nach UI-SPEC § 4, Antworten ≤ 300 aus site.ts, ohne Wettbewerber", () => {
    const f = preise.preiseFaq;
    expect(f.map((x) => x.q)).toEqual([
      "Brauche ich für den Test eine Zahlungsmethode?",
      "Ist die Mobile-App in der Voll-Lizenz enthalten?",
      "Wie berechnet sich der Jahresrabatt?",
      "Welche Lizenz braucht mein Betrieb mindestens?",
      "Wie wird CraftOS abgerechnet?",
      "Was kosten Credit-Pakete?",
    ]);
    expect(new Set(f.map((x) => x.q)).size).toBe(6);
    const a = (i: number) => f[i].a;
    expect(a(0)).toBe(
      `Für den Test genügt ein Konto: Sie testen CraftOS ${site.trialDays} Tage kostenlos und hinterlegen eine Zahlungsmethode erst, wenn Sie ein Abo wählen.`,
    );
    expect(a(1)).toBe("Ja. Die Voll-Lizenz enthält Web-App und Mobile-App für dieselbe Person; wer nur auf der Baustelle arbeitet, erhält die App-Lizenz.");
    expect(a(2)).toBe(
      `Das Jahresabo kostet zehn Monatsbeiträge, also ${euro(voll.jahr)} statt ${euro(voll.monat * 12)} für die Voll-Lizenz, rund ${Math.round(annualSavingPercent)} % weniger als zwölf Monatszahlungen.`,
    );
    expect(a(3)).toBe("Mindestens eine Voll-Lizenz; App-Lizenzen ergänzen sie für Mitarbeitende auf der Baustelle.");
    expect(a(4)).toBe(`CraftOS ist ein Abo, im Monatsabo ${vertrag.monat} und im Jahresabo ${vertrag.jahr}, bezahlt per ${zahlung.sepa} oder ${zahlung.karte}.`);
    // ME-01: keine „Nein“-Antwort über CraftOS.
    for (const x of f) expect(x.a, x.q).not.toMatch(/^Nein/);
    const liste = (werte: number[]) => {
      const t = werte.map((w) => betrag(cents(w)));
      return `${t.slice(0, -1).join(", ")} oder ${t.at(-1)}`;
    };
    expect(a(5)).toBe(
      `Credit-Pakete kosten ${liste(creditPakete.map((p) => p.preis))} netto und enthalten ${liste(creditPakete.map((p) => p.guthaben))} Guthaben; zum Start erhält jeder Betrieb einmalig ${startCredits} Credits (${creditUmrechnung}).`,
    );
    for (const x of f) {
      expect(x.q.endsWith("?")).toBe(true);
      expect(charCount(x.q)).toBeLessThanOrEqual(TEXT_BUDGET.faq.question);
      expect(charCount(x.a), x.q).toBeLessThanOrEqual(300);
      for (const w of wettbewerber) expect(x.a.includes(w.name), `${x.q}: ${w.name}`).toBe(false);
    }
  });

  it("Alle Texte ohne UWG-Wortliste und ohne „Zusatzspeicher“", () => {
    const texte = alleTexte();
    expect(texte.length).toBeGreaterThan(40);
    const funde = texte.flatMap((t) => {
      const wort = uwgTreffer(t);
      return [...(wort ? [`${wort}: ${t}`] : []), ...(t.includes("Zusatzspeicher") ? [`Zusatzspeicher: ${t}`] : [])];
    });
    expect(funde).toEqual([]);
  });

  it("Quelltext lib/seiten/preise.ts ohne Preisliteral, ohne Tages-Literal und ohne Eurozeichen neben einer Zahl", () => {
    const quelle = read("lib/seiten/preise.ts");
    expect(quelle).not.toMatch(/29[,.]95|9[,.]95|299[,.]50|99[,.]50|24[,.]96|8[,.]29|0[,.]99|9[,.]90/);
    expect(quelle).not.toMatch(/\b10 Tage/);
    expect(quelle).not.toMatch(/\d\s*€|€\s*\d/);
    expect(quelle).not.toContain("Zusatzspeicher");
    expect(quelle).toContain("was-kostet-handwerkersoftware");
    expect(quelle).toContain("app-lizenz");
  });
});

describe("gerendert", () => {
  const html = renderToString(createElement(PreisePage));
  const text = (v: string) =>
    v.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/<!-- -->/g, "").trim();
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]) as Record<string, unknown>,
  );
  const vomTyp = (typ: string) => jsonLd.filter((d) => d["@type"] === typ);

  it("Metadaten aus der Keyword-Map", () => {
    expect(metadata).toEqual(metaFor("/preise"));
    expect(metadata.description).toBe(zielwerte("/preise").description);
  });

  it("genau eine H1 = Zielwert, direkt danach der Antwortabsatz #antwort mit data-answer", () => {
    const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
    expect(h1).toHaveLength(1);
    expect(text(h1[0][1])).toBe(zielwerte("/preise").h1);
    const nachH1 = html.slice(h1[0].index! + h1[0][0].length);
    expect(nachH1).toMatch(/^<p id="antwort" data-answer=""[^>]*>/);
    expect(text(nachH1.slice(0, nachH1.indexOf("</p>")))).toBe(preise.preiseKopf.answer);
  });

  it("die Preistabelle folgt vor jeder weiteren H2-Sektion; Abschnitte in der Folge des Seitenvertrags", () => {
    const ersteTabelle = html.indexOf("<table");
    expect(ersteTabelle).toBeGreaterThan(html.indexOf('id="antwort"'));
    expect(ersteTabelle).toBeLessThan(html.indexOf('data-abschnitt="app-lizenz"'));
    expect(text(html.slice(html.indexOf("<caption"), html.indexOf("</caption>")))).toBe(preise.lizenzTabelle.caption);
    const folge = [...html.matchAll(/data-abschnitt="([^"]+)"/g)].map((m) => m[1]);
    expect(folge).toEqual(["kopf", ...preise.PREISE_SECTION_IDS, "cta"]);
    for (const id of preise.PREISE_SECTION_IDS) {
      expect(html, id).toContain(`<section data-abschnitt="${id}" aria-labelledby="${id}"`);
      expect(html.match(new RegExp(`<h2 id="${id}"`, "g")) ?? [], id).toHaveLength(1);
      const start = html.indexOf(`data-abschnitt="${id}"`);
      const abschnitt = html.slice(start, html.indexOf("</section>", start));
      expect(abschnitt.match(/<h2[ >]/g) ?? [], id).toHaveLength(1);
    }
    expect(html.match(/<table/g) ?? []).toHaveLength(2);
  });

  it("JSON-LD: eine BreadcrumbList (Start, Preise), eine FAQPage aus der sichtbaren FAQ, ein WebPage-Knoten", () => {
    const crumbs = vomTyp("BreadcrumbList");
    expect(crumbs).toHaveLength(1);
    const items = crumbs[0].itemListElement as { name: string }[];
    expect(items.map((i) => i.name)).toEqual(["Start", "Preise"]);
    const faq = vomTyp("FAQPage");
    expect(faq).toHaveLength(1);
    const fragen = (faq[0].mainEntity as { name: string; acceptedAnswer: { text: string } }[]).map((q) => [q.name, q.acceptedAnswer.text]);
    expect(fragen).toEqual(preise.preiseFaq.map((f) => [f.q, f.a]));
    for (const f of preise.preiseFaq) expect(html).toContain(f.q);
    const webPage = vomTyp("WebPage");
    expect(webPage).toHaveLength(1);
    expect(webPage[0].url).toBe(`${site.url}/preise`);
    // IN-02: WebPage.name = Title ohne Marke (wie og:title).
    expect(webPage[0].name).toBe(zielwerte("/preise").titleOhneMarke);
    for (const verboten of ["Product", "Review", "AggregateRating"]) expect(html).not.toContain(`"@type":"${verboten}"`);
  });

  it("ohne PageHero, PricingTable, ui/Faq und TrialCta; CTAs auf site.ctaUrl mit data-track; Extra-Speicher und Start-Credits sichtbar", () => {
    expect(html).not.toContain("craft-page-hero");
    expect(html).not.toContain("Abrechnung wählen");
    expect(html).not.toContain("group-open:rotate-45");
    expect(html).not.toContain("CraftOS kennenlernen");
    const ctas = [...html.matchAll(/<a [^>]*data-track="trial"[^>]*>/g)].map((m) => m[0]);
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    for (const a of ctas) expect(a).toContain(`href="${site.ctaUrl}"`);
    expect(html).toContain('href="#lizenzen"');
    expect(html).toContain('href="/funktionen"');
    expect(html).toContain("Extra-Speicher");
    expect(html).toContain(String(startCredits));
    expect(html).not.toContain("Zusatzspeicher");
    expect(html).toContain('rel="nofollow"');
    expect(html).toContain(preise.marktspanne.disclaimer);
  });

  it("Quelltext app/preise/page.tsx: v2-Bausteine, FAQ-Schema aus demselben Array", () => {
    const seite = read("app/preise/page.tsx");
    expect(seite).not.toMatch(/PageHero|PricingTable|TrialCta|components\/ui\/Faq/);
    expect(seite.match(/faqSchema\(/g)).toHaveLength(1);
    expect(seite).toContain("faqSchema(preiseFaq)");
  });
});
