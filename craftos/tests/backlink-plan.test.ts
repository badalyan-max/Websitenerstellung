import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildLlmsTxt } from "@/lib/llms";

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
    // OMR war am 20.10.2026 „angefragt“; seit dem HTTP-Abruf vom 23.10.2026 (10-11) „live“ mit Profil-URL.
    expect(byDomain.get("omr.com")?.status).toBe("live");
    expect(byDomain.get("omr.com")!.notiz).toContain("https://omr.com/de/reviews/product/craftos");
    expect(byDomain.get("omr.com")!.notiz).toContain("20.10.2026");
    const expected: Record<string, string> = {
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

describe("backlink-register.json – Statuspflege (10-11, D-29)", () => {
  it("gibt jedem offenen oder angefragten Eintrag einen Browser-Prompt", () => {
    for (const e of register.filter((x) => x.status === "offen" || x.status === "angefragt"))
      expect(e.browserPrompt.trim().length, e.domain).toBeGreaterThan(0);
  });

  it("setzt „live“ nur mit datiertem Beleg (SE Ranking oder verlinkendes Profil)", () => {
    for (const e of register.filter((x) => x.status === "live")) {
      expect(e.notiz, e.domain).toMatch(/\d{4}-\d{2}-\d{2}|\d{1,2}\.\d{1,2}\.\d{4}/);
      const seRanking = /SE Ranking/.test(e.notiz);
      const profil = /Profil https:\/\/\S+ verlinkt auf https:\/\/craftos\.eu/.test(e.notiz);
      expect(seRanking || profil, e.domain).toBe(true);
    }
  });

  it("nennt in Prompts nur Preise, Testtage, Plattformen und Lizenzen aus llms.txt", () => {
    const llms = buildLlmsTxt();
    const linkplan = fs.readFileSync(path.join(ROOT, "docs/seo/LINKPLAN.md"), "utf8");
    const uebergabe2 = linkplan.slice(linkplan.indexOf("## 7. Übergabe 2"));
    const texte = [...register.map((e) => e.browserPrompt), uebergabe2];
    for (const t of texte) {
      for (const preis of t.match(/\d+,\d{2} €/g) ?? []) expect(llms, preis).toContain(preis);
      for (const tage of t.match(/\d+ Tage\b/g) ?? []) expect(llms, tage).toContain(tage);
      for (const lizenz of t.match(/\b[A-ZÄÖÜ][a-zäöü]+-Lizenz\b/g) ?? []) expect(llms, lizenz).toContain(lizenz);
      for (const plattform of ["iOS", "Android", "Web-App", "Mobile-App"])
        if (t.includes(plattform)) expect(llms, plattform).toContain(plattform);
    }
  });
});

describe("LINKPLAN.md", () => {
  const text = fs.readFileSync(path.join(ROOT, "docs/seo/LINKPLAN.md"), "utf8");

  it("enthält Übergabe, Kaufverbot, Disavow-Regel und Meilensteinziel", () => {
    for (const s of ["Übergabe 1 an den Inhaber", "Kaufe nichts", "Disavow", "15", "seo-report.mjs --etappe"])
      expect(text, s).toContain(s);
  });

  describe("Übergabe 2 an den Inhaber (10-11, D-29)", () => {
    const start = text.indexOf("## 7. Übergabe 2 an den Inhaber");
    const abschnitt = start >= 0 ? text.slice(start) : "";
    const regeln = text
      .slice(text.indexOf("## 2. Regeln"), text.indexOf("### Filterregel"))
      .split(/\r?\n/)
      .filter((z) => z.startsWith("- "));

    it("hat genau einen Abschnitt „## 7. Übergabe 2“", () => {
      expect(text.split("## 7. Übergabe 2").length - 1).toBe(1);
    });

    it("wiederholt die Regeln aus § 2 wörtlich", () => {
      expect(regeln.length).toBeGreaterThanOrEqual(4);
      for (const r of regeln) expect(abschnitt, r).toContain(r);
    });

    it("beginnt mit den Portalen in der vereinbarten Reihenfolge", () => {
      const titel = [...abschnitt.matchAll(/^### (.+)$/gm)].map((m) => m[1]);
      const erwartet = [/ProvenExpert/, /G2/, /OMR/, /kennstdueinen\.de/, /SoftwareWorld/, /softwareabc24\.de/, /betriebssoftware-kompass\.de/];
      expect(titel.length).toBeGreaterThanOrEqual(erwartet.length);
      erwartet.forEach((re, i) => expect(titel[i], String(re)).toMatch(re));
    });

    it("enthält für jeden offenen oder angefragten Eintrag den Prompt aus dem Register", () => {
      for (const e of register.filter((x) => x.status === "offen" || x.status === "angefragt")) {
        expect(abschnitt, e.domain).toContain(e.domain);
        expect(abschnitt, e.domain).toContain(e.browserPrompt);
      }
    });
  });
});
