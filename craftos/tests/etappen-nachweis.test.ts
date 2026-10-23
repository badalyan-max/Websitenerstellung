import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Sammelnachweis der Etappen 05–09 (QA-05, D-30): docs/releases/ETAPPEN-NACHWEIS-V2.md.
const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const FILE = path.join(ROOT, "docs/releases/ETAPPEN-NACHWEIS-V2.md");
const text = fs.existsSync(FILE) ? fs.readFileSync(FILE, "utf8") : "";

const SPALTEN = [
  "Etappe",
  "Code-Commit",
  "Push-Zeit",
  "Ship-Gate",
  "gh workflow list --all",
  "Vercel-Deployment",
  "IndexNow",
  "live-check",
  "Etappenbericht",
  "trial_click/ai_visit",
  "Beleg",
];

const zellen = (zeile: string) =>
  zeile
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((z) => z.trim());

// Etappentabelle: die Tabelle, deren Kopfzeile mit „| Etappe |“ beginnt.
const zeilen = text.split(/\r?\n/);
const kopfIndex = zeilen.findIndex((z) => /^\|\s*Etappe\s*\|/.test(z));
const kopf = kopfIndex >= 0 ? zellen(zeilen[kopfIndex]) : [];
const daten: string[][] = [];
for (let i = kopfIndex + 2; kopfIndex >= 0 && i < zeilen.length && zeilen[i].startsWith("|"); i++)
  daten.push(zellen(zeilen[i]));
const nachEtappe = new Map(daten.map((d) => [d[0].replace(/\D/g, "").padStart(2, "0"), d]));

describe("ETAPPEN-NACHWEIS-V2.md", () => {
  it("existiert", () => {
    expect(fs.existsSync(FILE)).toBe(true);
  });

  it("hat die Pflichtspalten in fester Reihenfolge", () => {
    expect(kopf).toEqual(SPALTEN);
  });

  it("hat vollständige Zeilen für die Etappen 05 bis 09 mit Belegverweis", () => {
    for (const nr of ["05", "06", "07", "08", "09"]) {
      const zeile = nachEtappe.get(nr);
      expect(zeile, `Etappe ${nr} fehlt`).toBeTruthy();
      expect(zeile!.length, `Etappe ${nr}`).toBe(SPALTEN.length);
      zeile!.forEach((z, i) => expect(z.length, `Etappe ${nr}, Spalte ${SPALTEN[i]}`).toBeGreaterThan(0));
      expect(zeile![SPALTEN.length - 1], `Etappe ${nr}`).toContain(`PHASE-${nr}-ROLLOUT.md`);
    }
  });

  it("hält eine vorhandene Zeile 10 ebenso vollständig", () => {
    const zeile = nachEtappe.get("10");
    if (!zeile) return;
    expect(zeile.length).toBe(SPALTEN.length);
    zeile.forEach((z, i) => expect(z.length, `Etappe 10, Spalte ${SPALTEN[i]}`).toBeGreaterThan(0));
    expect(zeile[SPALTEN.length - 1]).toContain("PHASE-10-ROLLOUT.md");
  });

  it("dokumentiert die Analytics-Kontrolle mit Befund zu ai_visit", () => {
    const start = text.indexOf("## Analytics-Kontrolle");
    expect(start).toBeGreaterThanOrEqual(0);
    const abschnitt = text.slice(start);
    for (const s of ["trial_click", "ai_visit", "Abfragezeitpunkt", "detectAiSource", "_vercel/insights/script.js"])
      expect(abschnitt, s).toContain(s);
  });
});
