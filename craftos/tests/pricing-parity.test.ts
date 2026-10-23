// Paritätstest: Preise, Lizenzen, Netto-Hinweis, Testphase, Extra-Speicher und Credits der Website
// müssen dem Preis-Snapshot aus origin/release der Web-App entsprechen (npm run sync:product).
// Kein Netzwerk: gelesen werden nur der eingecheckte Snapshot und lokal das Produkt-Repo.
import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import snapshot from "@/docs/product-pricing-snapshot.json";
import * as siteModule from "@/lib/site";
import { buildLlmsTxt } from "@/lib/llms";
import { softwareApplicationSchema } from "@/lib/schema";
import { productBasis } from "@/lib/product-register";
import { pruefeReleaseStand, releaseSuite, WEB_REPO } from "./release-repos";

const { tarife, creditPakete, site } = siteModule;
const root = path.resolve(import.meta.dirname, "..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const euro = (value: number) => value.toFixed(2).replace(".", ",") + " €";

const voll = tarife.find((t) => t.id === "voll")!;
const app = tarife.find((t) => t.id === "app")!;
const p = snapshot.pricing;

describe("Preise entsprechen origin/release der Web-App", () => {
  it("Lizenzen: Voll-Lizenz (Admin oder Büro) und App-Lizenz", () => {
    expect(voll.monat).toBe(p.ADMIN_MONTHLY);
    expect(voll.jahr).toBe(p.ADMIN_YEARLY);
    expect(p.BUERO_MONTHLY).toBe(p.ADMIN_MONTHLY);
    expect(p.BUERO_YEARLY).toBe(p.ADMIN_YEARLY);
    expect(app.monat).toBe(p.APP_MONTHLY);
    expect(app.jahr).toBe(p.APP_YEARLY);
  });

  it("Credits, Extra-Speicher, Testtage und Netto-Kennzeichen", () => {
    const extra = (siteModule as Record<string, unknown>).extraSpeicher;
    const start = (siteModule as Record<string, unknown>).startCredits;
    expect(extra).toEqual({
      gb: p.EXTRA_STORAGE_GB,
      monat: p.EXTRA_STORAGE_PRICE_MONTHLY,
      jahr: p.EXTRA_STORAGE_PRICE_YEARLY,
    });
    expect(start).toBe(p.ADMIN_FREE_CREDITS);
    expect(creditPakete.map((c) => [c.preis, c.bonus])).toEqual(
      snapshot.creditPackages.map((c) => [c.amount, c.bonusPercent]),
    );
    expect(creditPakete.map((c) => c.guthaben)).toEqual(
      snapshot.creditPackages.map((c) => c.amount + c.bonus),
    );
    expect(site.trialDays).toBe(snapshot.trialDays);
    expect(snapshot.netPrices).toBe(true);
  });

  it("llms.txt nennt Lizenzen, Extra-Speicher, Start-Credits und Pakete", () => {
    const txt = buildLlmsTxt();
    for (const v of [
      p.ADMIN_MONTHLY,
      p.ADMIN_YEARLY,
      p.APP_MONTHLY,
      p.APP_YEARLY,
      p.EXTRA_STORAGE_PRICE_MONTHLY,
    ])
      expect(txt).toContain(euro(v));
    expect(txt).toContain(`${p.ADMIN_FREE_CREDITS} Credits`);
    expect(txt).toContain("einmalig");
    expect(txt).toContain("im Voraus gekauft");
    expect(txt).not.toContain("nach Verbrauch");
    for (const c of snapshot.creditPackages) {
      expect(txt).toContain(euro(c.amount));
      if (c.bonusPercent > 0) expect(txt).toContain(`${c.bonusPercent} %`);
    }
    expect(txt).toContain("netto");
  });

  it("Credit-Einheit: 1 Credit = 0,01 €, Start-Credits mit Euro-Gegenwert auf /preise, im FAQ-Schema und in llms.txt", () => {
    const { creditWertEuro, creditUmrechnung } = siteModule;
    expect(creditWertEuro).toBe(snapshot.creditValueEur);
    expect(p.FREE_AI_CREDIT / p.ADMIN_FREE_CREDITS).toBeCloseTo(snapshot.creditValueEur, 10);
    const startEuro = euro(p.FREE_AI_CREDIT);
    expect(creditUmrechnung).toBe(`entspricht ${startEuro}; 1 Credit = ${euro(snapshot.creditValueEur)}`);
    expect(buildLlmsTxt()).toContain(`${p.ADMIN_FREE_CREDITS} Credits Startguthaben (${creditUmrechnung})`);
    // /preise (08-07): Inhalte in lib/seiten/preise.ts. KeyFacts-Note (Zusatzkosten) und FAQ (Quelle des
    // FAQPage-JSON-LD) nutzen beide creditUmrechnung; die Seite bindet das FAQ-Schema aus demselben Array ein.
    const modul = read("lib/seiten/preise.ts");
    expect(modul).toContain("Craft AI und KI-Belegscans (${creditUmrechnung})");
    expect(modul).toContain("einmalig ${startCredits} Credits (${creditUmrechnung})");
    expect(read("app/preise/page.tsx")).toMatch(/faqSchema\(preiseFaq\)/);
  });

  it("Schema: Offer-Preis aus der Voll-Lizenz, ohne Umsatzsteuer", () => {
    const offers = softwareApplicationSchema().offers as {
      price: string;
      priceSpecification?: { valueAddedTaxIncluded?: boolean; price?: string };
    };
    expect(offers.price).toBe(p.ADMIN_MONTHLY.toFixed(2));
    expect(offers.priceSpecification?.valueAddedTaxIncluded).toBe(false);
    expect(offers.priceSpecification?.price).toBe(p.ADMIN_MONTHLY.toFixed(2));
    expect(offers.priceSpecification).toMatchObject({
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      unitText: "pro Person und Monat",
    });
  });

  it("Literale: keine Lizenzpreise und keine alten Lizenznamen in geprüften Dateien", () => {
    const files = [
      "components/home/HomeHero.tsx",
      "lib/home-content.ts",
      "app/preise/page.tsx",
      "app/page.tsx",
      "lib/seiten/preise.ts",
      "lib/llms.ts",
      "lib/schema.ts",
      "app/fakten-ueber-craftos/page.tsx",
      "lib/seiten/fakten.ts",
      "lib/seiten/craft-ai.ts",
      "lib/seiten/gobd.ts",
      "lib/funktionsgruppen.ts",
      "components/layout/HeaderShell.tsx",
      // 08-08: Alternativen-Vorlage und Builder – CraftOS-Preise nur aus tarife, Wettbewerberpreise nur per Vorlage.
      "lib/seiten/alternativen/index.ts",
      "components/vergleich/AlternativePage.tsx",
      // 08-10: Vergleichs-Hub – CraftOS-Werte nur aus site.ts, Wettbewerberwerte nur per Vorlage aus lib/wettbewerber.
      "lib/seiten/vergleich.ts",
      // 08-11: Seite „kleine Betriebe“ – CraftOS-Werte nur aus site.ts, Wettbewerberwerte per Vorlage, Recht aus amtlichen Feldern.
      "lib/seiten/kleine-betriebe.ts",
    ];
    const preis = /29[,.]95|9[,.]95|299[,.]50|99[,.]50|24[,.]96|8[,.]29|0[,.]99|9[,.]90/;
    const funde: string[] = [];
    for (const file of files) {
      read(file)
        .split("\n")
        .forEach((line, i) => {
          if (preis.test(line) || /Volllizenz|Mobile Lizenz/.test(line))
            funde.push(`${file}:${i + 1}: ${line.trim().slice(0, 120)}`);
        });
    }
    expect(funde).toEqual([]);
  });

  it("Register und Preis-Snapshot nutzen denselben Web-Commit", () => {
    expect(productBasis.web.ref).toBe(snapshot.source.ref);
    expect(productBasis.web.commit).toBe(snapshot.source.commit);
    expect(productBasis.web.tag).toBe(snapshot.source.tag);
  });
});

// Testphasen-Scan: jede Tagesangabe im Testkontext muss snapshot.trialDays entsprechen.
const zahlwoerter: Record<string, number> = { sieben: 7, zehn: 10, vierzehn: 14, dreißig: 30 };
// Komposita wie „Testtage“ zählen mit (LO-01).
const tagesLiteral = /(?<![\p{L}\d.,])(\d+|sieben|zehn|vierzehn|dreißig)(?:\s*-\s*|\s*)(?:(?:Test)?Tagen?|tägig)(?![\p{L}])/giu;
const tagesTemplate = /\$?\{[^{}]*trialDays\}\s*(?:-\s*)?(?:(?:Test)?[Tt]agen?|tägig)(?![\p{L}])/gu;
// „test“ nur am Wortanfang (nach Nicht-Buchstabe): „Testtage“ zählt, „Spätestens“ und „Bestandstest“ nicht (09-09).
const testKontext = /(?<!\p{L})test|kostenlos|ohne zahlungs/iu;

function satzFenster(text: string, start: number, end: number): string {
  let before = text.slice(Math.max(0, start - 60), start);
  let after = text.slice(end, end + 60);
  const satzEnde = /[.!?](?=\s|$)/g;
  let last = -1;
  for (const m of before.matchAll(satzEnde)) last = m.index! + 1;
  if (last >= 0) before = before.slice(last);
  const next = after.search(/[.!?](?=\s|"|$)/);
  if (next >= 0) after = after.slice(0, next);
  return before + text.slice(start, end) + after;
}

function sammleDateien(dir: string, endungen: string[]): string[] {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && endungen.some((x) => e.name.endsWith(x)))
    .map((e) => path.relative(root, path.join(e.parentPath, e.name)).replaceAll("\\", "/"));
}

/**
 * D-23: Belegte Wettbewerberangaben stehen ausschließlich in den Datenmodulen unter lib/wettbewerber/
 * (eigener Test unten: Tageszahlen dort nur im Feld testphaseTage oder in wörtlichen Zitaten).
 * Alle CraftOS-eigenen Dateien bleiben vom Testphasen-Scan voll erfasst.
 */
const WETTBEWERBER_DIR = "lib/wettbewerber/";

/** Testphasen-Scan über { rel, text }: Treffer (Literal + Template) und Fehler (Tageszahl ≠ trialDays). */
function testphasenFehler(dateien: { rel: string; text: string }[], trialDays = snapshot.trialDays) {
  const treffer: string[] = [];
  const fehler: string[] = [];
  for (const { rel: file, text } of dateien) {
    if (file.startsWith(WETTBEWERBER_DIR)) continue;
    const zeile = (idx: number) => text.slice(0, idx).split("\n").length;
    for (const m of text.matchAll(tagesTemplate)) treffer.push(`${file}:${zeile(m.index!)}: ${m[0]}`);
    for (const m of text.matchAll(tagesLiteral)) {
      const fenster = satzFenster(text, m.index!, m.index! + m[0].length);
      if (!testKontext.test(fenster)) continue;
      const roh = m[1].toLowerCase();
      const tage = zahlwoerter[roh] ?? Number(roh);
      const ort = `${file}:${zeile(m.index!)}: „${m[0]}“`;
      treffer.push(ort);
      if (tage !== trialDays) fehler.push(`${ort} (erwartet ${trialDays} Tage)`);
    }
  }
  return { treffer, fehler };
}

/**
 * Wettbewerber-Datenmodule: Tageszahlen nur als Zahl im Feld testphaseTage ({ wert: 7, … }) oder in einem
 * wörtlichen zitat-Feld; jede andere „N Tage“-Angabe (Freitext) wird gemeldet.
 */
function tageAusserhalbFeld(text: string): string[] {
  const funde: string[] = [];
  for (const m of text.matchAll(tagesLiteral)) {
    const vorher = text.slice(0, m.index!);
    const schluessel = [...vorher.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*["'`]/g)].at(-1)?.[1];
    if (schluessel === "zitat") continue;
    funde.push(`Zeile ${vorher.split("\n").length}: „${m[0]}“${schluessel ? ` in ${schluessel}` : ""}`);
  }
  return funde;
}

describe("Testphase entspricht dem Snapshot", () => {
  it("Testphase: alle Tagesangaben im Testkontext stimmen mit trialDays überein", () => {
    const dateien = [
      ...sammleDateien("app", [".ts", ".tsx"]),
      ...sammleDateien("components", [".ts", ".tsx"]),
      ...sammleDateien("lib", [".ts", ".tsx"]),
      ...sammleDateien("content", [".md", ".mdx"]),
    ].map((rel) => ({ rel, text: read(rel) }));
    const { treffer, fehler } = testphasenFehler(dateien);
    console.info(`Testphase: ${treffer.length} Fundstellen geprüft.`);
    expect(fehler).toEqual([]);
    expect(treffer.length).toBeGreaterThanOrEqual(5);
  });

  it("Ausnahme nur für lib/wettbewerber/: dieselbe Zeile in CraftOS-Dateien schlägt an (D-23)", () => {
    const zeile = "export const satz = \"plancraft nennt 7 Tage kostenlos\";";
    expect(testphasenFehler([{ rel: "lib/wettbewerber/plancraft.ts", text: zeile }], 10).fehler).toEqual([]);
    for (const rel of ["app/preise/page.tsx", "lib/seiten/preise.ts", "lib/wettbewerber-alt.ts", "app/vergleich/page.tsx"])
      expect(testphasenFehler([{ rel, text: zeile }], 10).fehler, rel).toHaveLength(1);
    expect(testphasenFehler([{ rel: "components/x.tsx", text: "<a>14 Tage kostenlos testen</a>" }], 10).fehler).toHaveLength(1);
  });

  it("Testkontext-Muster: „test“ nur am Wortanfang, Komposita wie „Testtage“ zählen weiter (09-09, D-14)", () => {
    for (const ohne of ["Spätestens nach 5 Tagen", "Der Bestandstest läuft 7 Tage"])
      expect(testKontext.test(ohne), ohne).toBe(false);
    for (const mit of ["Testtage", "10 Tage kostenlos testen", "ohne Zahlungsdaten starten", "Test 14 Tage"])
      expect(testKontext.test(mit), mit).toBe(true);
    // Satz mit „Spätestens“ und anderer Tageszahl ist keine Testphasen-Angabe.
    expect(testphasenFehler([{ rel: "lib/x.ts", text: "Spätestens 30 Tage nach Rechnungsdatum." }], 10).treffer).toEqual([]);
  });

  it("Wettbewerber-Datenmodule: Tageszahlen nur im Feld testphaseTage", () => {
    expect(tageAusserhalbFeld('export const x = { hinweis: "Die Testphase dauert 7 Tage." };')).toHaveLength(1);
    expect(
      tageAusserhalbFeld(
        'export const plancraft = {\n  testphaseTage: { wert: 7, quelle: "https://plancraft.com/preise", abgerufenAm: "2026-10-22" },\n  zitat:\n    "7 Tage kostenlos testen",\n};',
      ),
    ).toEqual([]);
    const dateien = sammleDateien(WETTBEWERBER_DIR, [".ts", ".tsx"]);
    const funde = dateien.flatMap((rel) => tageAusserhalbFeld(read(rel)).map((f) => `${rel} ${f}`));
    expect(funde).toEqual([]);
  });
});

describe("Netto-Hinweis", () => {
  it("Netto-Hinweis in llms.txt, auf /preise und im Snapshot", () => {
    const txt = buildLlmsTxt();
    const fakten = txt.slice(0, txt.indexOf("\n## "));
    const preisZeilen = fakten.split("\n").filter((l) => l.includes("Lizenz") && l.includes("€"));
    expect(preisZeilen.length).toBeGreaterThan(0);
    for (const line of preisZeilen) expect(line).toContain("netto");
    const preisSeite = read("lib/seiten/preise.ts") + read("app/preise/page.tsx");
    expect(preisSeite).toContain("Alle Preise netto");
    expect(preisSeite).toContain("Umsatzsteuer");
    expect(snapshot.netPrices).toBe(true);
  });
});

// Sichtbarer Skip mit Grund bzw. Pflichtmodus (CRAFTOS_REQUIRE_RELEASE=1, CI) aus tests/release-repos.ts (D-14).
const snapshotSuite = releaseSuite("Snapshot ist aktuell (nur lokal)", ["web"]);
describe.skipIf(snapshotSuite.skip)(snapshotSuite.titel, () => {
  it("Snapshot ist aktuell: Commit entspricht origin/release", () => {
    pruefeReleaseStand("web");
    const head = execFileSync("git", ["-C", WEB_REPO, "rev-parse", "origin/release"], {
      encoding: "utf8",
    }).trim();
    expect(snapshot.source.ref).toBe("origin/release");
    expect(snapshot.source.commit).toBe(head);
  });
});
