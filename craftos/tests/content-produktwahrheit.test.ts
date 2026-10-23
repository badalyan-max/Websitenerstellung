/**
 * Produktwahrheit und Leitlinie L-1 (Inhaber, 22.10.2026; 09-UI-SPEC § 5, 09-VALIDATION „Produktwahrheit und L-1“):
 * Die Website nennt nur, was unterstützt wird. Wortliste, Altbegriffe und Ausnahmen kommen ausschließlich aus
 * lib/leitlinie-l1.json (über lib/leitlinie.ts). Geltungsbereich ab Welle 2: content/blog, content/hilfe und die
 * String-Literale von lib/gewerke.ts; ab der Integration (09-09) zusätzlich lib/funktionen.ts,
 * lib/funktionsdetails/*.ts und lib/app-content.ts (umgesetzt in 09-09, ohne Übergangsliste). TypeScript-Dateien werden nur über ihre String-Literale
 * geprüft (scripts/lib/ts-literale.mjs, K-10/W6) – Belegkommentare bleiben unberührt.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import { l1Treffer } from "@/lib/leitlinie";
import leitlinie from "@/lib/leitlinie-l1.json";
import { artikelAussagen, nurUnterstuetztVerstoesse } from "@/lib/nur-unterstuetzt";
import { stringLiterale, zusammengesetzteTexte } from "../scripts/lib/ts-literale.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const MD_ORDNER = ["content/blog", "content/hilfe"];
/** Seit 09-09 zusätzlich die Produktdaten der Funktionsseiten und der App-Seite (09-UI-SPEC § 5 „Geltungsbereich“). */
const TS_DATEIEN = [
  "lib/gewerke.ts",
  "lib/funktionen.ts",
  ...fs
    .readdirSync(path.join(ROOT, "lib/funktionsdetails"))
    .filter((n) => n.endsWith(".ts"))
    .sort()
    .map((n) => `lib/funktionsdetails/${n}`),
  "lib/app-content.ts",
];

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
 * Ausnahme 1: neutraler Fachteil von /blog/gaeb-formate – H2-Abschnitte unter einer Frage-Überschrift ohne
 * Produktbezug (CraftOS, Web-App, Mobile-App, „in der App“; 09-REVIEW LO-10) entfallen; Frontmatter, Einleitung,
 * Abschnitte ohne Frage-Überschrift und Abschnitte mit Produktbezug bleiben in der Prüfung.
 */
const PRODUKTBEZUG = new RegExp(GAEB.produktbezug!, "i");
const neutralerFachteil = (teil: string) =>
  teil.startsWith("## ") && teil.split("\n")[0].trim().endsWith("?") && !PRODUKTBEZUG.test(teil);
function ohneGaebFachteil(markdown: string): string {
  return markdown
    .split(/^(?=## )/m)
    .filter((teil) => !neutralerFachteil(teil))
    .join("");
}

/**
 * Treffer einer Datei als „datei: wort“ (eindeutig je Wort). Seit 09-REVIEW ME-04 ohne Listenwort-Ausnahme: Die
 * einzige Wortliste ist lib/leitlinie-l1.json; ein Literal, das genau einem Leitlinienwort entspricht (z. B.
 * `label: "Onlinezahlung"`), ist sichtbarer Text und wird gemeldet.
 */
function trefferInDatei(rel: string, inhalt: string): { datei: string; wort: string }[] {
  // IN-08: zusätzlich zusammengesetzte Texte („Online“ + „zahlung“, Template-Literale mit Platzhaltern).
  let text = rel.endsWith(".ts") ? [...stringLiterale(inhalt), ...zusammengesetzteTexte(inhalt)].join("\n") : inhalt;
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

describe("Leitlinie L-1 in Ratgebern, Hilfe, Gewerke- und Produktdaten", () => {
  it("Geltungsbereich umfasst funktionen.ts, alle Funktionsdetails und app-content.ts (09-09)", () => {
    expect(TS_DATEIEN).toContain("lib/funktionen.ts");
    expect(TS_DATEIEN).toContain("lib/app-content.ts");
    expect(TS_DATEIEN.filter((d) => d.startsWith("lib/funktionsdetails/")).length).toBeGreaterThanOrEqual(5);
  });

  it("kein Treffer in content/, lib/gewerke.ts, lib/funktionen.ts, lib/funktionsdetails/*.ts und lib/app-content.ts", () => {
    const treffer: string[] = [];
    for (const rel of dateien()) {
      const inhalt = fs.readFileSync(path.join(ROOT, rel), "utf8");
      for (const t of trefferInDatei(rel, inhalt)) treffer.push(fehlertext(t.datei, t.wort));
    }
    expect(treffer).toEqual([]);
  });

  it("Ausnahmen sind abschließend: genau drei mit Begründung", () => {
    expect(leitlinie.ausnahmen.map((a) => a.id)).toEqual(["gaeb-formate-fachteil", "gobd-zertifizierungsfrage", "pflichthinweise"]);
    for (const a of leitlinie.ausnahmen) expect(a.begruendung.length, a.id).toBeGreaterThan(20);
  });
});

/**
 * Satzprüfung der Artikel (09-REVIEW ME-04): Dieselbe Prüfung wie für die TS-Inhaltsmodule (`NEGATIVSATZ`,
 * Nein-Antworten) läuft über Antwort, Frontmatter-FAQ und die Prosa jedes Artikels. Die Prosa liefert
 * `artikelAussagen` (Fragen, zitierte Oberflächentexte und „grenzen Sie … ein“ sind keine Aussagen über CraftOS).
 * Ausnahme wie bei L-1: der neutrale Fachteil von /blog/gaeb-formate.
 */
function satzVerstoesse(rel: string, inhalt: string): string[] {
  const { data, content } = matter(inhalt);
  const prosa = artikelAussagen(rel === GAEB.datei ? ohneGaebFachteil(content) : content);
  return nurUnterstuetztVerstoesse({ answer: data.answer, faq: data.faq ?? [], prosa });
}

describe("Satzprüfung der Artikel (ME-04)", () => {
  it("keine Negativsätze und Nein-Antworten in Antwort, FAQ und Prosa der Ratgeber und Hilfeartikel", () => {
    const treffer: string[] = [];
    for (const rel of dateien().filter((d) => d.endsWith(".md")))
      for (const v of satzVerstoesse(rel, fs.readFileSync(path.join(ROOT, rel), "utf8"))) treffer.push(`${rel}: ${v}`);
    expect(treffer).toEqual([]);
  });

  it("meldet Negativsätze in Antwort, FAQ und Prosa", () => {
    const md = [
      "---",
      'answer: "CraftOS kann keine Fahrzeuge orten."',
      "faq:",
      '  - q: "Gibt es eine Kasse?"',
      '    a: "Nein, eine Kasse fehlt."',
      "---",
      "Die Ortung ist nicht möglich.",
    ].join("\n");
    expect(satzVerstoesse("content/hilfe/x.md", md)).toHaveLength(3);
  });

  it("Fragen, zitierte Meldungen und „grenzen Sie … ein“ sind keine Aussagen", () => {
    const md = [
      "### Warum wird ein Mangel nicht angezeigt?",
      "Die App zeigt „Stornierung nicht möglich“, wenn die Rechnung bezahlt ist.",
      "1. Grenzen Sie die Liste mit dem Filter ein.",
      "Warum ist das nicht möglich? Weil die Rechnung festgeschrieben ist.",
    ].join("\n");
    expect(nurUnterstuetztVerstoesse({ prosa: artikelAussagen(md) })).toEqual([]);
    expect(artikelAussagen(md)).toContain("Weil die Rechnung festgeschrieben ist.");
  });
});

/**
 * Offline-Lesen (09-REVIEW ME-02): Die Mobile-App verwirft den gespeicherten Abfrage-Cache nach 24 Stunden
 * (Mobile-Release src/AppRoot.tsx `maxAge: 1000 * 60 * 60 * 24`, src/shared/lib/query-client.ts `gcTime` 24 h).
 * Jeder Satz der Website, der geladene Inhalte offline bereitstellt, nennt deshalb die Frist „24 Stunden“.
 */
const OFFLINE_BEREIT =
  /(offline|ohne Netz)[^.]*(?<![\p{L}])(bereit|zur Verfügung)(?![\p{L}])|(?<![\p{L}])(bereit|zur Verfügung)(?![\p{L}])[^.]*(offline|ohne Netz)/iu;

function offlineSaetzeOhneFrist(rel: string, inhalt: string): string[] {
  const texte = rel.endsWith(".ts") ? stringLiterale(inhalt) : [inhalt];
  return texte
    .flatMap((t) => t.split(/(?<=[.!?])\s+|\n/))
    .filter((s) => OFFLINE_BEREIT.test(s) && !/24 Stunden/.test(s))
    .map((s) => `${rel}: ${s.trim()}`);
}

function websiteDateien(): string[] {
  const out: string[] = [];
  for (const ordner of MD_ORDNER)
    for (const name of fs.readdirSync(path.join(ROOT, ordner)).sort()) if (name.endsWith(".md")) out.push(`${ordner}/${name}`);
  const lib = (ordner: string): string[] =>
    fs.readdirSync(path.join(ROOT, ordner), { withFileTypes: true }).flatMap((e) => {
      const rel = `${ordner}/${e.name}`;
      if (e.isDirectory()) return lib(rel);
      return e.name.endsWith(".ts") ? [rel] : [];
    });
  return [...out, ...lib("lib")];
}

describe("Offline-Lesen nennt die 24-Stunden-Frist (ME-02)", () => {
  it("kein Satz in Inhalten und lib/ verspricht Offline-Bereitschaft ohne Frist", () => {
    const treffer = websiteDateien().flatMap((rel) => offlineSaetzeOhneFrist(rel, fs.readFileSync(path.join(ROOT, rel), "utf8")));
    expect(treffer).toEqual([]);
  });

  it("erkennt Bereitschaftssätze und lässt Sätze mit Frist durch", () => {
    expect(offlineSaetzeOhneFrist("x.md", "Jede Ansicht steht danach auch offline zur Verfügung.")).toHaveLength(1);
    expect(offlineSaetzeOhneFrist("x.md", "Die App hält sie bis zu 24 Stunden offline bereit.")).toEqual([]);
    expect(offlineSaetzeOhneFrist("x.md", "Was offline bereitsteht, beschreibt der Ratgeber.")).toEqual([]);
  });
});

/**
 * Kundenportal (09-REVIEW ME-03, Web-Release c5b5135): Nach der Anmeldung zeigt das Portal nur „Ihre Unterlagen“ mit
 * dem Hinweis auf den Link in der E-Mail (src/pages/portal/CustomerPortalHome.tsx, /portal/* in src/App.tsx); keine
 * Mail verlinkt /portal/quotes/:id oder /portal/invoices/:id, und die Portal-Vorschau zeigt Belege, die der Kunde so
 * nicht erreicht. Die Website nennt deshalb nur die Online-Unterschrift aus der Angebotsmail und die Rechnung als PDF.
 */
const PORTAL_VERSPRECHEN =
  /aus dem Portal|im (Kunden)?portal (sehen|öffnen|finden|abrufen)|Kundenportal für Bauherren|Im Kundenportal meldet|so, wie Ihr Kunde es sieht|Portal-Vorschau öffnen|eigene[nm]? (Portal-)?Zugang (zum|im|ins) Kundenportal|nutzen einen eigenen Portal-Zugang/i;

describe("Kundenportal nur mit erreichbaren Leistungen (ME-03)", () => {
  it("Gewerke, Funktionsdaten und Artikel stellen das Portal nicht als Ort für Unterlagen dar", () => {
    const treffer: string[] = [];
    for (const rel of websiteDateien()) {
      const inhalt = fs.readFileSync(path.join(ROOT, rel), "utf8");
      const texte = rel.endsWith(".ts") ? stringLiterale(inhalt) : [inhalt];
      for (const t of texte) {
        const m = PORTAL_VERSPRECHEN.exec(t);
        if (m) treffer.push(`${rel}: ${m[0]}`);
      }
    }
    expect(treffer).toEqual([]);
  });

  it("Bauunternehmen nennt die Online-Unterschrift statt des Kundenportals", async () => {
    const { gewerke } = await import("@/lib/gewerke");
    const bau = gewerke.find((g) => g.slug === "bauunternehmen")!;
    expect(bau.answer).toContain("Online-Unterschrift");
    expect(bau.answer).not.toMatch(/Kundenportal/);
    expect(bau.funktionen).not.toContain("kundenportal");
    expect(bau.funktionen).toContain("angebote");
  });
});

/**
 * Kassenbuch (09-REVIEW LO-09, Web-Release src/hooks/useLicense.ts `canSeeFinance = isAdmin || (isBuero &&
 * toggles.finanzen_sichtbar)`, src/hooks/useCashBook.ts): Zugang hängt an der Finanzfreigabe „Globale Finanzbereiche“,
 * nicht an der Rolle Büro-Leitung.
 */
describe("Kassenbuch-Voraussetzung nennt die Finanzfreigabe (LO-09)", () => {
  it("Admin oder Büro mit „Globale Finanzbereiche“", () => {
    const md = fs.readFileSync(path.join(ROOT, "content/hilfe/kassenbuch-fuehren.md"), "utf8");
    expect(md).not.toContain("(Admin oder Büro-Leitung)");
    expect(md).toMatch(/Admin oder mit einer Voll-Lizenz \(Büro\), für die „Globale Finanzbereiche“ eingeschaltet ist/);
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

  it("TypeScript: ein Literal, das genau ein Leitlinienwort ist, zählt als sichtbarer Text (ME-04)", () => {
    const quelle = ['export const karte = { label: "Onlinezahlung" };', 'export const t = "DATANORM v5";'].join("\n");
    expect(trefferInDatei("lib/funktionsdetails/rechnung.ts", quelle).map((x) => x.wort)).toEqual([
      "Onlinezahlung",
      "DATANORM v5",
    ]);
  });

  it("TypeScript: zusammengesetzte Texte aus + und Template-Literalen werden als Ganzes geprüft (IN-08)", () => {
    const quelle = [
      'export const a = "Online" + "zahlung";',
      "export const b = (x: string) => `nicht ${x}unterstützt`;",
      'export const c = "Bald " + name + "verfügbar";',
    ].join("\n");
    expect(trefferInDatei("lib/funktionsdetails/x.ts", quelle).map((x) => x.wort)).toEqual([
      "nicht unterstützt",
      "Onlinezahlung",
      "Bald verfügbar",
    ]);
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

  it("gaeb-formate: nur Frage-Abschnitte ohne Produktbezug sind ausgenommen (LO-10)", () => {
    const md = [
      "## Welche Formate liest die Web-App?",
      "Die Web-App liest X83, DATANORM v5 nicht.",
      "## Welche Formate liest craftos?",
      "Bald verfügbar.",
      "## Formate im Überblick",
      "GAEB 90 wird hier nicht unterstützt erklärt.",
      "## Was ist GAEB D83?",
      "D83 ist nicht zugesagt für jede Software.",
    ].join("\n");
    expect(trefferInDatei("content/blog/gaeb-formate.md", md).map((x) => x.wort)).toEqual([
      "nicht unterstützt",
      "Bald verfügbar",
      "DATANORM v5",
    ]);
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
