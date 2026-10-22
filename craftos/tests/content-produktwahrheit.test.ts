/**
 * Produktwahrheit und Leitlinie L-1 (Inhaber, 22.10.2026; 09-UI-SPEC § 5, 09-VALIDATION „Produktwahrheit und L-1“):
 * Die Website nennt nur, was unterstützt wird. Wortliste, Altbegriffe und Ausnahmen kommen ausschließlich aus
 * lib/leitlinie-l1.json (über lib/leitlinie.ts). Geltungsbereich ab Welle 2: content/blog, content/hilfe und die
 * String-Literale von lib/gewerke.ts; ab der Integration (09-09) zusätzlich lib/funktionen.ts,
 * lib/funktionsdetails/*.ts und lib/app-content.ts. TypeScript-Dateien werden nur über ihre String-Literale
 * geprüft (scripts/lib/ts-literale.mjs, K-10/W6) – Belegkommentare bleiben unberührt.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { l1Treffer, l1Woerter } from "@/lib/leitlinie";
import leitlinie from "@/lib/leitlinie-l1.json";
import { stringLiterale } from "../scripts/lib/ts-literale.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const MD_ORDNER = ["content/blog", "content/hilfe"];
const TS_DATEIEN = ["lib/gewerke.ts"];

/** Fehlertext aus 09-UI-SPEC § 5 (wörtlich). */
const fehlertext = (pfad: string, wort: string) =>
  `Text ${pfad} enthält ‚${wort}‘ – nur Unterstütztes nennen (Leitlinie L-1).`;

const GAEB = leitlinie.ausnahmen.find((a) => a.id === "gaeb-formate-fachteil")!;
const PFLICHT = leitlinie.ausnahmen.find((a) => a.id === "pflichthinweise")!;

/** Ausnahme 3: rechtlich nötige Hinweise in genau dieser Form aus dem Text nehmen. */
function ohnePflichthinweise(text: string): string {
  let out = text;
  for (const t of PFLICHT.texte ?? []) out = out.split(t).join(" ");
  return out;
}

/**
 * Ausnahme 1: neutraler Fachteil von /blog/gaeb-formate – H2-Abschnitte, deren Überschrift und Text „CraftOS“
 * nicht nennen, entfallen; Frontmatter, Einleitung und Abschnitte mit CraftOS-Bezug bleiben in der Prüfung.
 */
function ohneGaebFachteil(markdown: string): string {
  const teile = markdown.split(/^(?=## )/m);
  return teile.filter((teil, i) => i === 0 || !teil.startsWith("## ") || /CraftOS/.test(teil)).join("");
}

/**
 * Prüfmechanik, keine Inhaltsausnahme (Begründung laut 09-UI-SPEC § 5 „Weitere Ausnahmen nur mit eigener Begründung
 * im Test“): Ein String-Literal, das genau aus einem Wort der Leitlinie besteht, ist ein Eintrag einer Prüf-Wortliste
 * (z. B. die lokale L1_WOERTER-Liste in lib/gewerke.ts bis 09-11) und kein Text, den die Website zeigt. Literale mit
 * weiterem Text – auch ein einzelnes Wort mit Satzzeichen oder Zusatz – bleiben voll in der Prüfung.
 */
const LISTENWOERTER = new Set(l1Woerter.map((w) => w.toLowerCase()));
const istListeneintrag = (literal: string) => LISTENWOERTER.has(literal.trim().toLowerCase());

/** Treffer einer Datei als „datei: wort“ (eindeutig je Wort). */
function trefferInDatei(rel: string, inhalt: string): { datei: string; wort: string }[] {
  let text = rel.endsWith(".ts")
    ? stringLiterale(inhalt)
        .filter((l) => !istListeneintrag(l))
        .join("\n")
    : inhalt;
  if (rel === GAEB.datei) text = ohneGaebFachteil(text);
  return l1Treffer(ohnePflichthinweise(text)).map((wort) => ({ datei: rel, wort }));
}

function dateien(): string[] {
  const out: string[] = [];
  for (const ordner of MD_ORDNER)
    for (const name of fs.readdirSync(path.join(ROOT, ordner)).sort())
      if (name.endsWith(".md")) out.push(`${ordner}/${name}`);
  return [...out, ...TS_DATEIEN];
}

/**
 * Übergang bis 09-09 (W3, T-09-04): Bestandstreffer, eingefroren am 23.10.2026 auf dem Stand von main 0b84201.
 * Schlüssel „<datei>|<wort>“ ohne Zeilennummer. Die Liste wird nie erweitert; die Inhaltspakete und Paket (a)
 * beheben die Treffer, 09-09 entfernt die Liste. Einträge ohne Treffer sind bis dahin erlaubt.
 */
const L1_UEBERGANG_PHASE9 = new Set<string>([
  // Ratgeber
  "content/blog/handwerkersoftware-einzelunternehmen.md|Admin-Lizenz",
  "content/blog/zahlungserinnerung-mahnung-handwerk.md|verspricht keine",
  "content/blog/zahlungserinnerung-mahnung-handwerk.md|Onlinezahlung",
  "content/blog/ki-belegscan-pruefen.md|kein autonomes Verbuchen",
  // Hilfe
  "content/hilfe/abschlagsrechnung-erstellen.md|Büro-Lizenz",
  "content/hilfe/anmelden-web-mobile.md|Büro-Lizenz",
  "content/hilfe/kunden-ansprechpartner-anlegen.md|Büro-Lizenz",
  "content/hilfe/gaeb-importieren.md|.x84 und .d83",
  "content/hilfe/rollen-zugriffsrechte-einstellen.md|Finanzen sichtbar",
  "content/hilfe/rollen-zugriffsrechte-einstellen.md|Teamleitung (Zeiten für andere)",
  "content/hilfe/schlussrechnung-erstellen.md|nicht pauschal",
  "content/hilfe/zahlungen-erfassen.md|ersetzt keinen",
  "content/hilfe/artikel-stammdaten-anlegen.md|Büro-Lizenz",
  "content/hilfe/craft-ai-betriebsdaten-fragen.md|Büro-Lizenz",
  "content/hilfe/lagerorte-lagerplaetze-einrichten.md|Büro-Lizenz",
  "content/hilfe/mobile-offline-synchronisierung.md|kein pauschales",
  "content/hilfe/plantafel-einsatz-planen.md|Keine Koordinaten",
  "content/hilfe/plantafel-einsatz-planen.md|Konflikt erkannt",
  "content/hilfe/plantafel-einsatz-planen.md|Büro-Lizenz",
  "content/hilfe/planung-mitarbeiter-ressourcen.md|Ressourcen verwalten",
  "content/hilfe/projekt-phasen-anlegen.md|Neue Phase",
  "content/hilfe/projekt-phasen-anlegen.md|Büro-Lizenz",
  "content/hilfe/projektdateien-ordner.md|Asset hinzufügen",
  // Gewerke-Daten (Paket a)
  "lib/gewerke.ts|vorbereitete Leistungsvorlagen",
]);

describe("Leitlinie L-1 in Ratgebern, Hilfe und Gewerke-Texten", () => {
  it("keine neuen Treffer außerhalb der Übergangsliste", () => {
    const neu: string[] = [];
    for (const rel of dateien()) {
      const inhalt = fs.readFileSync(path.join(ROOT, rel), "utf8");
      for (const t of trefferInDatei(rel, inhalt))
        if (!L1_UEBERGANG_PHASE9.has(`${t.datei}|${t.wort}`)) neu.push(fehlertext(t.datei, t.wort));
    }
    expect(neu).toEqual([]);
  });

  it("Übergangsschlüssel: Datei + Wort aus der Liste, keine Zeilennummer", () => {
    const woerter = new Set([...leitlinie.woerter, ...leitlinie.altbegriffe]);
    for (const k of L1_UEBERGANG_PHASE9) {
      const [datei, wort, rest] = k.split("|");
      expect(rest, k).toBeUndefined();
      expect(datei, k).toMatch(/^(content\/(blog|hilfe)\/[a-z0-9-]+\.md|lib\/[a-z0-9/-]+\.ts)$/);
      expect(woerter.has(wort), k).toBe(true);
    }
  });

  it("Ausnahmen sind abschließend: genau drei mit Begründung", () => {
    expect(leitlinie.ausnahmen.map((a) => a.id)).toEqual(["gaeb-formate-fachteil", "gobd-faq-zertifiziert", "pflichthinweise"]);
    for (const a of leitlinie.ausnahmen) expect(a.begruendung.length, a.id).toBeGreaterThan(20);
  });
});

describe("Prüfmechanik (Fixtures)", () => {
  it("Markdown: Treffer je Wort mit Fehlertext", () => {
    const t = trefferInDatei("content/hilfe/x.md", "Im Portal ist keine Onlinezahlung möglich. DATANORM v5 ist nicht zugesagt.");
    expect(t.map((x) => x.wort)).toEqual(["nicht zugesagt", "keine Onlinezahlung", "Onlinezahlung", "DATANORM v5"]);
    expect(fehlertext("content/hilfe/x.md", "Onlinezahlung")).toBe(
      "Text content/hilfe/x.md enthält ‚Onlinezahlung‘ – nur Unterstütztes nennen (Leitlinie L-1).",
    );
  });

  it("TypeScript: nur String-Literale, Kommentare bleiben unberührt", () => {
    const quelle = [
      "// Beleg: Portal ohne Onlinezahlung (PortalPaymentNotice.tsx)",
      "/* Altbegriff Neue Phase im Release */",
      'export const a = { text: "Rechnungen begleicht der Kunde per Überweisung." };',
      "export const b = `Vorlage ${a.text} ist Bald verfügbar.`;",
    ].join("\n");
    expect(trefferInDatei("lib/gewerke.ts", quelle).map((x) => x.wort)).toEqual(["Bald verfügbar"]);
  });

  it("TypeScript: reine Wortlisten-Einträge zählen nicht, Text mit Listenwort schon", () => {
    const quelle = [
      'const L1_WOERTER = ["nicht unterstützt", "Onlinezahlung", "DATANORM v5"] as const;',
      'export const faq = { a: "Onlinezahlung." };',
      'export const t = "Bald verfügbar im Portal";',
    ].join("\n");
    expect(trefferInDatei("lib/gewerke.ts", quelle).map((x) => x.wort)).toEqual(["Onlinezahlung", "Bald verfügbar"]);
  });

  it("gaeb-formate: neutraler Fachteil ausgenommen, CraftOS-Abschnitt und Einleitung geprüft", () => {
    const md = [
      "Einleitung.",
      "## Welche GAEB-Formate gibt es?",
      "GAEB 90 wird hier nicht unterstützt erklärt.",
      "## So unterstützt CraftOS",
      "CraftOS liest X83. DATANORM v5 bleibt.",
    ].join("\n");
    expect(trefferInDatei("content/blog/gaeb-formate.md", md).map((x) => x.wort)).toEqual(["DATANORM v5"]);
    expect(trefferInDatei("content/blog/anderer.md", md).map((x) => x.wort)).toEqual(["nicht unterstützt", "DATANORM v5"]);
    expect(trefferInDatei("content/blog/gaeb-formate.md", `Nicht unterstützt in der Einleitung.\n${md}`).length).toBe(2);
  });

  it("Pflichthinweis „Preise netto zzgl. USt.“ ist ausgenommen, Wörter daneben nicht", () => {
    expect(trefferInDatei("content/blog/x.md", "Preise netto zzgl. USt.")).toEqual([]);
    expect(trefferInDatei("content/blog/x.md", "Preise netto zzgl. USt. Bald verfügbar.").map((x) => x.wort)).toEqual([
      "Bald verfügbar",
    ]);
  });
});

describe("stringLiterale (scripts/lib/ts-literale.mjs, W6)", () => {
  it("liest einfache, doppelte und Template-Literale, keine Kommentare und keine Regex-Literale", () => {
    const quelle = [
      "// Kommentar mit \"Zitat\"",
      "const re = /\"nicht\"/g;",
      "const a = 'eins';",
      'const b = "zwei \\"drei\\"";',
      "const c = `vier ${a} fünf`;",
      "const d = `sechs`;",
    ].join("\n");
    expect(stringLiterale(quelle)).toEqual(["eins", 'zwei "drei"', "vier ", " fünf", "sechs"]);
  });

  it("verarbeitet lib/gewerke.ts ohne Fehler", () => {
    const quelle = fs.readFileSync(path.join(ROOT, "lib/gewerke.ts"), "utf8");
    expect(stringLiterale(quelle).length).toBeGreaterThan(50);
  });
});
