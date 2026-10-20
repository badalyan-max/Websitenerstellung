import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Linkplan und Statusregister (SEO-08, D-07a): Regeln für Browser-Prompts und bekannter Portalstand.
const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const REGISTER = path.join(ROOT, "docs/seo/backlink-register.json");
const GAP = path.join(ROOT, "docs/seo/data/2026-10-20-backlink-gap.json");

type Entry = {
  domain: string;
  kategorie: string;
  dr: number | null;
  drQuelle: string | null;
  wettbewerber: string[];
  prioritaet: number;
  status: string;
  inhaberAktion: string;
  browserPrompt: string;
  kosten: string;
  notiz: string;
  aktualisiert: string;
};
type GapRow = { domain: string; dr: number; competitors: string[] };

const KATEGORIEN = [
  "Bewertungsportal",
  "Vergleichsportal",
  "Fachmedium",
  "Verzeichnis",
  "Kammer/Digitalisierung",
  "Großhandel/Partner",
  "Presseportal",
  "Video",
];
const STATUS = ["offen", "angefragt", "live", "nicht möglich"];
const KOSTEN = ["kostenlos", "nur bezahlt", "unbekannt"];
const DR_QUELLEN = ["backlink-gap", "befund", null];

const read = <T,>(file: string): T => JSON.parse(fs.readFileSync(file, "utf8")) as T;
// Fehlendes Register ist ein Fehler, keine leere Prüfung (LO-08).
const register = read<Entry[]>(REGISTER);
const gap = read<GapRow[]>(GAP);
// Der Gap-Rohsatz führt Domains teils mit „www.“; das Register führt die Basisdomain.
const bare = (d: string) => d.toLowerCase().replace(/^www\./, "");
const gapByDomain = new Map(gap.map((g) => [bare(g.domain), g]));
const byDomain = new Map(register.map((e) => [e.domain, e]));

describe("backlink-register.json", () => {
  it("hat alle Pflichtfelder mit gültigen Werten und eindeutige Domains", () => {
    expect(register.length).toBeGreaterThan(0);
    const seen = new Set<string>();
    for (const e of register) {
      expect(e.domain, JSON.stringify(e)).toMatch(/^[a-z0-9.-]+\.[a-z]{2,}$/);
      expect(seen.has(e.domain), e.domain).toBe(false);
      seen.add(e.domain);
      expect(KATEGORIEN, e.domain).toContain(e.kategorie);
      expect(e.dr === null || (Number.isInteger(e.dr) && e.dr >= 0 && e.dr <= 100), e.domain).toBe(true);
      expect(DR_QUELLEN, e.domain).toContain(e.drQuelle);
      expect(e.dr === null ? e.drQuelle === null : e.drQuelle !== null, e.domain).toBe(true);
      expect(Array.isArray(e.wettbewerber), e.domain).toBe(true);
      expect([1, 2, 3], e.domain).toContain(e.prioritaet);
      expect(STATUS, e.domain).toContain(e.status);
      expect(typeof e.inhaberAktion === "string" && e.inhaberAktion.length > 0, e.domain).toBe(true);
      expect(typeof e.browserPrompt, e.domain).toBe("string");
      expect(KOSTEN, e.domain).toContain(e.kosten);
      expect(typeof e.notiz, e.domain).toBe("string");
      expect(e.aktualisiert, e.domain).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("übernimmt DR und Wettbewerber identisch aus dem Backlink-Gap-Rohsatz", () => {
    const fromGap = register.filter((e) => e.drQuelle === "backlink-gap");
    expect(fromGap.length).toBeGreaterThan(20);
    for (const e of fromGap) {
      const g = gapByDomain.get(e.domain);
      expect(g, `${e.domain} fehlt im backlink-gap`).toBeTruthy();
      expect(e.dr, e.domain).toBe(g!.dr);
      expect([...e.wettbewerber].sort(), e.domain).toEqual([...g!.competitors].sort());
    }
  });

  it("gibt jedem bearbeitbaren Eintrag einen regelkonformen Browser-Prompt", () => {
    for (const e of register.filter((x) => x.status !== "nicht möglich")) {
      const p = e.browserPrompt;
      expect(p.length, e.domain).toBeGreaterThanOrEqual(200);
      expect(p, e.domain).toContain("Kaufe nichts");
      expect(p, e.domain).toContain("Gib keine Zugangsdaten");
      expect(p, e.domain).toContain("Konten legt ausschließlich der Inhaber an");
      expect(p, e.domain).toContain("https://craftos.eu/llms.txt");
      expect(p, e.domain).toContain("support@craftos.eu");
    }
  });

  it("enthält weder Passwörter noch Schlüsselvariablen", () => {
    for (const e of register) {
      const text = `${e.browserPrompt}\n${e.inhaberAktion}\n${e.notiz}`;
      expect(text, e.domain).not.toMatch(/passwor[td]\s*[:=]/i);
      expect(text, e.domain).not.toMatch(/[A-Z][A-Z0-9_]*_(API_KEY|TOKEN|SECRET)\b/);
      expect(text, e.domain).not.toMatch(/X-Api-Key/i);
    }
  });

  it("führt den bekannten Portalstand vom 20.10.2026", () => {
    const expected: Record<string, string> = {
      "omr.com": "angefragt",
      "provenexpert.com": "offen",
      "g2.com": "offen",
      "softwareabc24.de": "offen",
      "betriebssoftware-kompass.de": "offen",
      "trusted.de": "nicht möglich",
      "softguide.de": "nicht möglich",
    };
    for (const [domain, status] of Object.entries(expected)) {
      expect(byDomain.get(domain)?.status, domain).toBe(status);
    }
    expect(byDomain.get("g2.com")!.notiz).toMatch(/Capterra/);
    expect(byDomain.get("g2.com")!.notiz).toMatch(/GetApp/);
    expect(byDomain.get("trusted.de")!.kosten).toBe("nur bezahlt");
    expect(byDomain.get("softguide.de")!.kosten).toBe("nur bezahlt");
    expect(byDomain.get("softwareabc24.de")!.inhaberAktion).toContain("info@softwareabc24.de");
    expect(byDomain.get("betriebssoftware-kompass.de")!.inhaberAktion).toContain(
      "redaktion@betriebssoftware-kompass.de",
    );
    expect(byDomain.get("de.wikipedia.org")?.status).toBe("nicht möglich");
    expect(byDomain.get("youtube.com")?.kategorie).toBe("Video");
  });

  it("umfasst mindestens 40 Ziele, davon mindestens 8 Portale mit Priorität 1", () => {
    expect(register.length).toBeGreaterThanOrEqual(40);
    const portale = register.filter(
      (e) => (e.kategorie === "Bewertungsportal" || e.kategorie === "Vergleichsportal") && e.prioritaet === 1,
    );
    expect(portale.length).toBeGreaterThanOrEqual(8);
  });
});

describe("LINKPLAN.md", () => {
  it("enthält Übergabe, Kaufverbot, Disavow-Regel und Meilensteinziel", () => {
    const file = path.join(ROOT, "docs/seo/LINKPLAN.md");
    const text = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
    for (const s of ["Übergabe 1 an den Inhaber", "Kaufe nichts", "Disavow", "15", "seo-report.mjs --etappe"])
      expect(text, s).toContain(s);
  });
});
