/**
 * Mobile-App-Seite `/app` (Phase 7, Plan 07-07; FEAT-03, MEDIA-01, D-09, D-10, D-11, D-13, D-23).
 * Inhalte budgetgeprüft in lib/app-content.ts, alle Zahlen aus site.ts, tarife und dem Produktregister;
 * Abdeckung der Live-Funktionen der App gegen das Register; Offline nur mit Einschränkung.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { KEY_FACT_SOURCE } from "@/components/v2/KeyFacts";
import { euro, germanDate } from "@/lib/format";
import { ERLAUBTE_ANORDNUNGEN } from "@/lib/funktionsdetails";
import { getProductRegister, mobileLocales, mobileOffline, productBasis } from "@/lib/product-register";
import { site, tarife } from "@/lib/site";
import * as app from "@/lib/app-content";

const tarif = (id: "voll" | "app") => tarife.find((t) => t.id === id)!;
const firstSentence = (text: string) => text.split(/(?<=[.!?])\s+/)[0] ?? text;
const toPath = (url: string) => new URL(url).pathname.replace(/\/$/, "") || "/";
const KURZFORM = /^(web|app):[^\s/]+$/;

const GRUPPEN = ["zeit", "dokumentieren", "material"] as const;
const alleKacheln = () => GRUPPEN.flatMap((g) => app.appTiles[g]);

/** FEAT-03-Kachelpunkte (07-UI-SPEC „Abdeckung FEAT-03“) plus „Kunden in der App“. */
const FEAT03_KACHELN = [
  "Zeiterfassung mit Standort",
  "Einsätze mit Navigation",
  "Aufmaß",
  "Fotos und Projektdateien",
  "Besichtigung",
  "Bautagesbericht",
  "Mängel",
  "Abnahme mit Unterschrift",
  "Arbeitsschritte",
  "Urlaub",
  "Lager-Scan",
  "Beleg scannen",
  "Projekt-Chat",
  "Kunden in der App",
];

describe("Inhalte", () => {
  it("Abschnittsfolge und Flächen laut 07-UI-SPEC", () => {
    expect(app.APP_SECTION_IDS).toEqual(["kopf", "zeit", "kennzahlen", "dokumentieren", "offline", "material", "faq", "cta"]);
    expect(app.APP_SECTION_IDS.map((id) => app.APP_SURFACES[id])).toEqual([
      "dark",
      "white",
      "warm",
      "white",
      "warm",
      "white",
      "warm",
      "dark",
    ]);
  });

  it("Kopf: Eyebrow, Kopfwort, Lead als ein Satz im Budget, Phone mit Einsätzen", () => {
    expect(app.appKopf.eyebrow).toBe("Mobile-App");
    expect(app.appKopf.kopfwort).toBe("Handwerker-App");
    expect(app.appKopf.lead).toBe("Zeiten, Einsätze, Fotos, Mängel und Unterschriften erfasst Ihr Team direkt auf der Baustelle.");
    expect(sentenceCount(app.appKopf.lead)).toBe(1);
    expect(charCount(app.appKopf.lead)).toBeLessThanOrEqual(TEXT_BUDGET.pageHead.kopfLead);
    expect(app.appKopf.visual.kind).toBe("phone");
    expect(app.appKopf.visual.scene.screen).toBe("app:Einsätze");
  });

  it("jede Abschnitts-H2 ≤ 60, jeder Lead genau ein Satz ≤ 140", () => {
    const koepfe = ["zeit", "kennzahlen", "dokumentieren", "offline", "material", "faq"] as const;
    for (const id of koepfe) {
      const k = app.appSections[id];
      expect(charCount(k.title), id).toBeLessThanOrEqual(TEXT_BUDGET.sectionHeader.title);
      expect(sentenceCount(k.lead), id).toBe(1);
      expect(charCount(k.lead), id).toBeLessThanOrEqual(TEXT_BUDGET.sectionHeader.lead);
    }
    expect(app.appSections.zeit.title).toBe("Zeiten, Einsätze und Urlaub");
    expect(app.appSections.faq.title).toBe("Häufige Fragen zur Handwerker-App");
    const { cta } = app.appSections;
    expect(cta.title).toBe("Ihr Team auf der Baustelle verbinden");
    expect(cta.text).toBe("Ohne Zahlungsdaten – Sie entscheiden nach dem Test.");
    expect(charCount(cta.title)).toBeLessThanOrEqual(TEXT_BUDGET.ctaBand.title);
    expect(cta.secondary).toEqual({ label: "Preise ansehen", href: "/preise" });
    expect(app.appSections.offline.link).toEqual({
      label: "Offline-Nutzung vorbereiten",
      href: "/hilfe/mobile-offline-synchronisierung",
    });
  });

  it("Kacheln: Anordnungen lg·sm·sm·md, lg·sm·sm·md·md·md, lg·sm·sm·md; höchstens eine dunkle je Raster; Budgets", () => {
    const anordnung = (g: (typeof GRUPPEN)[number]) => app.appTiles[g].map((t) => t.size).join("·");
    expect(anordnung("zeit")).toBe("lg·sm·sm·md");
    expect(anordnung("dokumentieren")).toBe("lg·sm·sm·md·md·md");
    expect(anordnung("material")).toBe("lg·sm·sm·md");
    for (const g of GRUPPEN) {
      expect(ERLAUBTE_ANORDNUNGEN, g).toContain(anordnung(g));
      expect(app.appTiles[g].filter((t) => t.surface === "dark").length, g).toBeLessThanOrEqual(1);
    }
    expect(app.appTiles.zeit[0].surface).toBe("dark");
    expect(alleKacheln()).toHaveLength(14);
    for (const tile of alleKacheln()) {
      expect(charCount(tile.title), tile.title).toBeLessThanOrEqual(TEXT_BUDGET.bentoTile.title);
      expect(sentenceCount(tile.text), tile.title).toBe(1);
      const max = tile.size === "lg" ? TEXT_BUDGET.bentoTile.textLarge : TEXT_BUDGET.bentoTile.textSmall;
      expect(charCount(tile.text), tile.title).toBeLessThanOrEqual(max);
      // lg nur mit Phone 194, md-Phones 160 (07-UI-SPEC Szenenkatalog /app)
      if (tile.visual.kind === "phone") expect(tile.visual.width, tile.title).toBe(tile.size === "lg" ? 194 : 160);
      if (tile.size === "lg") expect(tile.visual.kind, tile.title).toBe("phone");
    }
  });

  it("FEAT-03: Kacheltitel decken alle Live-Funktionen der App ab, Zusatzfunktionen sind im Register beworben", () => {
    const titel = alleKacheln().map((t) => t.title);
    for (const punkt of FEAT03_KACHELN) expect(titel.some((t) => t.includes(punkt)), punkt).toBe(true);
    const sources = app.appKeyFacts.facts.map((f) => f.source);
    expect(sources).toContain("register:mobileOffline");
    expect(sources).toContain("register:mobileLocales");
    const extras = getProductRegister().liveExtras.filter((x) => x.advertised).map((x) => x.name);
    for (const name of ["Kunden in der App", "Besichtigung", "Projekt-Chat und Nachrichten"]) expect(extras, name).toContain(name);
  });

  it("mindestens sechs Phone-Kacheln, jede Szene mit Kurzform und Registerbeleg, jede Szene höchstens einmal", () => {
    const phones = alleKacheln().flatMap((t) => (t.visual.kind === "phone" ? [t.visual.scene] : []));
    expect(phones.length).toBeGreaterThanOrEqual(6);
    const register = getProductRegister();
    const belege = new Set(
      [...register.features.flatMap((f) => f.evidence), ...register.liveExtras.flatMap((x) => x.evidence)].map(
        (e) => `${e.repository}:${e.path}`,
      ),
    );
    for (const scene of [app.appKopf.visual.scene, ...phones]) {
      expect(scene.screen, scene.title).toMatch(KURZFORM);
      expect(scene.screen.startsWith("app:"), scene.title).toBe(true);
      expect(belege.has(scene.evidence), scene.evidence).toBe(true);
    }
    const screens = [app.appKopf.visual.scene, ...phones].map((s) => s.screen);
    expect(new Set(screens).size).toBe(screens.length);
  });

  it("jedes Kachel-href steht in der Sitemap", async () => {
    const pfade = new Set((await sitemap()).map((e) => toPath(e.url)));
    for (const tile of alleKacheln()) expect(pfade.has(tile.href), `${tile.title}: ${tile.href}`).toBe(true);
    expect(pfade.has(app.appSections.offline.link.href)).toBe(true);
  });

  it("Kennzahlen aus Register und tarife, Kurzform-Quellen, Note mit netto und Einschränkungen", () => {
    const { facts, note } = app.appKeyFacts;
    expect(facts).toHaveLength(3);
    expect(facts[0]).toEqual({
      value: String(mobileLocales.length),
      label: "Sprachen in der Mobile-App",
      source: "register:mobileLocales",
    });
    expect(facts[1]).toEqual({
      value: "Offline",
      label: "teilweise nutzbar, später synchronisiert",
      source: "register:mobileOffline",
    });
    expect(facts[2]).toEqual({ value: euro(tarif("app").monat), label: "App-Lizenz pro Monat", source: "site:tarif-app-monat" });
    for (const fact of facts) {
      expect(fact.source).toMatch(KEY_FACT_SOURCE);
      expect(fact.source).toMatch(/^(site|register):[A-Za-z0-9.-]+$/);
      expect(charCount(fact.label), fact.label).toBeLessThanOrEqual(TEXT_BUDGET.keyFact.label);
      expect(charCount(fact.value), fact.value).toBeLessThanOrEqual(TEXT_BUDGET.keyFact.value);
    }
    expect(note).toContain("netto");
    expect(note).toContain("Einschränkungen");
    expect(note).toBe(
      `Preis netto zzgl. USt. Offline nur mit Einschränkungen, siehe unten. Stand: ${germanDate(productBasis.checkedAt)}.`,
    );
  });

  it("Offline-Ablauf: vier Schritte im Budget", () => {
    expect(app.offlineSteps.map((s) => s.title)).toEqual([
      "Projekte vorab laden",
      "Standort freigeben",
      "Ohne Empfang erfassen",
      "Übertragung prüfen",
    ]);
    for (const step of app.offlineSteps) {
      expect(charCount(step.title), step.title).toBeLessThanOrEqual(TEXT_BUDGET.step.title);
      expect(charCount(step.text), step.title).toBeLessThanOrEqual(TEXT_BUDGET.step.text);
      expect(sentenceCount(step.text), step.title).toBe(1);
    }
  });

  it("FAQ: fünf Fragen, Offline-Antwort „Teilweise:“, Sprachen aus mobileLocales, Preise aus tarife", () => {
    const faq = app.appFaq;
    expect(faq).toHaveLength(5);
    expect(faq.map((f) => f.q)).toEqual([
      "Ist die Mobile-App in der Voll-Lizenz enthalten?",
      "Was kostet die App-Lizenz für Mitarbeitende?",
      "Funktioniert die App ohne Internet?",
      "In welchen Sprachen gibt es die App?",
      "Auf welchen Geräten läuft die App?",
    ]);
    for (const item of faq) {
      expect(item.q.endsWith("?"), item.q).toBe(true);
      expect(charCount(item.q), item.q).toBeLessThanOrEqual(TEXT_BUDGET.faq.question);
      expect(charCount(item.a), item.q).toBeLessThanOrEqual(TEXT_BUDGET.faq.answer);
      expect(charCount(firstSentence(item.a)), item.q).toBeLessThanOrEqual(TEXT_BUDGET.faq.firstSentence);
    }
    expect(faq[0].a).toContain(euro(tarif("voll").monat));
    expect(faq[1].a).toContain(euro(tarif("app").monat));
    expect(faq[2].a.startsWith("Teilweise:")).toBe(true);
    expect(faq[3].a).toContain(String(mobileLocales.length));
    for (const geraet of ["iPhone", "iPad", "Android"]) expect(faq[4].a, geraet).toContain(geraet);
  });

  it("kein Text verspricht vollständige Offline-Nutzung", () => {
    const texte = JSON.stringify({
      kopf: app.appKopf.lead,
      sections: app.appSections,
      tiles: alleKacheln().map((t) => [t.title, t.text]),
      facts: app.appKeyFacts,
      steps: app.offlineSteps.map((s) => [s.title, s.text]),
      faq: app.appFaq,
    }).toLowerCase();
    expect(texte).not.toContain("vollständig offline");
    expect(texte).not.toContain("komplett offline");
  });

  it("Quelltext ohne Preis-, Sprach- und Testtage-Literale", () => {
    const source = fs.readFileSync(path.resolve(import.meta.dirname, "../lib/app-content.ts"), "utf8");
    expect(source).not.toContain("€");
    expect(source).not.toContain("9,95");
    expect(source).not.toContain("21 Sprachen");
    expect(source).not.toContain("10 Tage");
    expect(source.toLowerCase()).not.toContain("vollständig offline");
    expect(source.match(/register:mobileOffline/g)).toHaveLength(1);
  });

  it("Registereintrag mobileOffline: vier Mobile-Belege und Limitation aus dem Register", () => {
    expect(mobileOffline.name).toBe("Offline-Erfassung in der Mobile-App");
    expect(mobileOffline.evidence).toHaveLength(4);
    expect(mobileOffline.evidence.every((e) => e.repository === "mobile")).toBe(true);
    expect(mobileOffline.limitation).toBe("Keine vollständige Offline-Zusage");
    expect(getProductRegister().limitations).toContain(mobileOffline.limitation);
    expect(site.iosUrl).toMatch(/^https:\/\/apps\.apple\.com\//);
  });
});
