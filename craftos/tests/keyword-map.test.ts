import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Metadata } from "next";
import { createElement, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import sitemap from "@/app/sitemap";
import { keywordMap } from "@/lib/keyword-map";
import seeds from "@/docs/seo/keyword-seeds.json";
import manifest from "@/docs/seo/data/kwmap/manifest.json";
import { norm } from "../scripts/lib/seo-audit-core.mjs";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const DATA_DIR = "docs/seo/data/kwmap";
const LEGAL = new Set(["/agb", "/datenschutz", "/impressum"]);
const pageCandidates = seeds.pageCandidates as Record<string, string[]>;

/**
 * Zielwertregeln (D-14; 08 D-06): gelten für jeden Eintrag mit Hauptkeyword oder gesetztem target –
 * Titel ≤ 60, Description 120–155, alle drei Werte vorhanden; Hauptkeyword im Titel nur bei primary.
 */
type ZielEintrag = { primary: { keyword: string } | null; target?: { title?: string; h1?: string; description?: string } | null };
function zielwertFehler(k: ZielEintrag): string[] {
  if (!k.primary && !k.target) return [];
  const t = k.target ?? {};
  const fehler: string[] = [];
  if (!t.title || !t.h1 || !t.description) fehler.push("unvollständig");
  if (t.title && Array.from(t.title).length > 60) fehler.push(`Titel ${Array.from(t.title).length} > 60`);
  if (k.primary && t.title && !norm(t.title).includes(norm(k.primary.keyword))) fehler.push("Titel ohne Hauptkeyword");
  if (t.description && (t.description.length < 120 || t.description.length > 155))
    fehler.push(`Description ${t.description.length}`);
  return fehler;
}
const toPath = (url: string) => new URL(url).pathname.replace(/\/$/, "") || "/";

/**
 * Statische Seiten, deren Title, H1 und Description auf die Keyword-Map-Ziele umgestellt sind (D-12).
 * Plan 06-05 ergänzt /funktionen, Plan 07-07 die Mobile-App-Seite /app (07 D-10).
 */
type SeitenModul = { default: () => ReactElement; metadata: Metadata };
const PHASE6_SEITEN: { path: string; modul: () => Promise<SeitenModul> }[] = [
  { path: "/", modul: () => import("@/app/page") },
  { path: "/funktionen", modul: () => import("@/app/funktionen/page") },
  { path: "/app", modul: () => import("@/app/app/page") },
  // 08-08: Alternativen-Seiten (statische Ordner, H1 aus zielwerte(path).h1).
  { path: "/vergleich/plancraft-alternative", modul: () => import("@/app/vergleich/plancraft-alternative/page") },
  { path: "/vergleich/craftnote-alternative", modul: () => import("@/app/vergleich/craftnote-alternative/page") },
];

type Row = Record<string, unknown>;
const rawCache = new Map<string, unknown>();
function readRaw(file: string): unknown {
  if (!rawCache.has(file))
    rawCache.set(file, JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8")));
  return rawCache.get(file);
}
// Alle Objekte einer Rohdatei, die genau dieses Keyword tragen (gleiches Objekt = gleiche Zeile).
function rowsFor(file: string, keyword: string): Row[] {
  const out: Row[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") {
      const o = v as Row;
      if (o.keyword === keyword) out.push(o);
      Object.values(o).forEach(walk);
    }
  };
  walk(readRaw(file));
  return out;
}
const exportFiles = fs
  .readdirSync(path.join(ROOT, DATA_DIR))
  .filter((f) => f.startsWith("export--") && f.endsWith(".json"))
  .map((f) => `${DATA_DIR}/${f}`);
const RAW_REF = /(related|questions|longtail|domain-keywords|comparison)--[a-z0-9.-]+\.json/g;

describe("Keyword-Map", () => {
  it("jede Sitemap-URL hat genau einen Eintrag", async () => {
    const paths = (await sitemap()).map((e) => toPath(e.url));
    expect(paths.length).toBeGreaterThanOrEqual(125);
    for (const p of paths) expect(keywordMap.filter((k) => k.path === p), p).toHaveLength(1);
    const all = keywordMap.map((k) => k.path);
    expect(new Set(all).size, "Pfade eindeutig").toBe(all.length);
  });

  it("kein Hauptkeyword doppelt (inkl. Schreibvarianten)", () => {
    const seen = new Map<string, string>();
    for (const k of keywordMap) {
      if (!k.primary) continue;
      const n = norm(k.primary.keyword);
      expect(seen.get(n), `${k.path} ↔ ${seen.get(n)}`).toBeUndefined();
      seen.set(n, k.path);
    }
    // Nebenbegriffe dürfen kein Hauptkeyword einer anderen Seite sein.
    for (const k of keywordMap)
      for (const s of k.secondary) {
        const owner = seen.get(norm(s));
        if (owner) expect(owner, `${k.path}: Nebenbegriff „${s}“ ist Hauptkeyword von ${owner}`).toBe(k.path);
      }
  });

  it("jede Zahl ist mit Rohdaten im selben Objekt belegt", () => {
    const files = new Map(manifest.files.map((f) => [f.file, f]));
    for (const k of keywordMap) {
      if (!k.primary) continue;
      const { keyword, volume, difficulty, intents, cpc, source } = k.primary;
      expect(source.file.startsWith("docs/seo/data/"), k.path).toBe(true);
      expect(fs.existsSync(path.join(ROOT, source.file)), source.file).toBe(true);
      const rows = rowsFor(source.file, keyword).filter(
        (r) => r.volume === volume && r.difficulty === difficulty,
      );
      expect(rows.length, `${k.path}: ${keyword} ${volume}/${difficulty} in ${source.file}`).toBeGreaterThan(0);
      expect([...((rows[0].intents as string[]) ?? [])].sort(), k.path).toEqual([...intents].sort());
      if (cpc !== undefined) expect(rows[0].cpc, k.path).toBe(cpc);
      const entry = files.get(path.basename(source.file));
      expect(entry, `${source.file} im Manifest`).toBeDefined();
      expect(source.endpoint, k.path).toBe(entry!.endpoint);
      expect(source.fetchedAt, k.path).toBe(entry!.fetchedAt);
    }
  });

  it("primary null nur für Rechtsseiten oder Pfade ohne Daten (is_data_found:false)", () => {
    for (const k of keywordMap) {
      if (k.primary) continue;
      expect(k.reason, k.path).toBeTruthy();
      expect(k.competitors, k.path).toEqual([]);
      if (LEGAL.has(k.path)) continue;
      const candidates = pageCandidates[k.path];
      expect(candidates?.length, `${k.path} braucht pageCandidates`).toBeGreaterThan(0);
      const namedFiles = exportFiles.filter((f) => k.reason!.includes(path.basename(f)));
      expect(namedFiles.length, `${k.path}: reason nennt die Exportdatei`).toBeGreaterThan(0);
      for (const c of candidates) {
        const found = exportFiles.flatMap((f) => rowsFor(f, c));
        expect(found.length, `${k.path}: ${c} im Export`).toBeGreaterThan(0);
        expect(found.every((r) => r.is_data_found === false), `${k.path}: ${c} hat Daten`).toBe(true);
      }
    }
  });

  it("Hauptkeyword stammt aus den pageCandidates oder einer benannten Rohdatei", () => {
    for (const k of keywordMap) {
      if (k.status !== "bestehend" || !k.primary) continue;
      if ((pageCandidates[k.path] ?? []).includes(k.primary.keyword)) continue;
      const refs = [...(k.reason ?? "").matchAll(RAW_REF)].map((m) => m[0]);
      expect(refs.length, `${k.path}: reason muss die Rohdatei nennen`).toBeGreaterThan(0);
      const ok = refs.some(
        (f) => fs.existsSync(path.join(ROOT, DATA_DIR, f)) && rowsFor(`${DATA_DIR}/${f}`, k.primary!.keyword).length > 0,
      );
      expect(ok, `${k.path}: ${k.primary.keyword} in ${refs.join(", ")}`).toBe(true);
    }
  });

  it("geplante Seiten haben eine Zielphase 6–9, Alternativen-Seiten Phase 8", async () => {
    const sitemapPaths = new Set((await sitemap()).map((e) => toPath(e.url)));
    // 08-08: plancraft und Craftnote sind veröffentlicht (bestehend + in der Sitemap, Pitfall 12).
    for (const marke of ["plancraft", "craftnote"]) {
      const e = keywordMap.find((k) => k.path === `/vergleich/${marke}-alternative`);
      expect(e?.status, marke).toBe("bestehend");
      expect(e?.phase, marke).toBe(8);
      expect(sitemapPaths.has(`/vergleich/${marke}-alternative`), marke).toBe(true);
    }
    for (const marke of ["hero", "tooltime"]) {
      const e = keywordMap.find((k) => k.path === `/vergleich/${marke}-alternative`);
      expect(e?.status, marke).toBe("geplant");
      expect(e?.phase, marke).toBe(8);
    }
    for (const k of keywordMap) {
      if (k.status === "geplant") {
        expect([6, 7, 8, 9], k.path).toContain(k.phase);
        expect(sitemapPaths.has(k.path), `${k.path} ist schon live`).toBe(false);
      } else expect(sitemapPaths.has(k.path), `${k.path} fehlt in der Sitemap`).toBe(true);
    }
  });

  it("Zielwerte für Titel, H1 und Description (D-14; 08 D-06: jeder Eintrag mit target)", () => {
    const geprueft = keywordMap.filter((k) => k.primary || k.target);
    expect(geprueft.length).toBeGreaterThan(0);
    for (const k of geprueft) expect(zielwertFehler(k), k.path).toEqual([]);
  });

  it("Zielwertregeln greifen auch ohne Hauptkeyword (Fixture)", () => {
    const desc = "d".repeat(130);
    expect(zielwertFehler({ primary: null, target: { title: "x".repeat(61), h1: "H", description: desc } })).toEqual(["Titel 61 > 60"]);
    expect(zielwertFehler({ primary: null, target: { title: "Kurz | CraftOS", h1: "H", description: "zu kurz" } })).toEqual(["Description 7"]);
    expect(zielwertFehler({ primary: null, target: { title: "Kurz | CraftOS", description: desc } })).toEqual(["unvollständig"]);
    expect(zielwertFehler({ primary: null, target: { title: "Kurz | CraftOS", h1: "H", description: desc } })).toEqual([]);
    expect(zielwertFehler({ primary: { keyword: "aufmaß app" }, target: { title: "Kurz | CraftOS", h1: "H", description: desc } })).toEqual([
      "Titel ohne Hauptkeyword",
    ]);
    expect(zielwertFehler({ primary: { keyword: "aufmaß app" }, target: null })).toEqual(["unvollständig"]);
    expect(zielwertFehler({ primary: null })).toEqual([]);
  });

  it("Wettbewerber sind in domain-keywords- oder comparison-Rohdaten belegt", () => {
    for (const k of keywordMap) {
      expect(Array.isArray(k.competitors), k.path).toBe(true);
      for (const c of k.competitors) {
        const rows = [`domain-keywords--${c.domain}.json`, `comparison--${c.domain}.json`]
          .filter((f) => fs.existsSync(path.join(ROOT, DATA_DIR, f)))
          .flatMap((f) => rowsFor(`${DATA_DIR}/${f}`, k.primary!.keyword));
        expect(rows.length, `${k.path}: ${c.domain}`).toBeGreaterThan(0);
        if (c.position !== null) expect(rows.some((r) => r.position === c.position), `${k.path}: ${c.domain} Position`).toBe(true);
      }
    }
  });

  it("Bauphasen ist Hauptbegriff, Arbeitsabschnitte Nebenbegriff (D-13)", () => {
    const e = keywordMap.find((k) => k.primary?.keyword === "bauphasen");
    expect(e, "Eintrag mit Hauptkeyword bauphasen").toBeDefined();
    expect(e!.secondary.some((s) => s.startsWith("arbeitsabschnitte")), e!.path).toBe(true);
    const arbeitsabschnitte = exportFiles.flatMap((f) => rowsFor(f, "arbeitsabschnitte bau"));
    expect(arbeitsabschnitte.length, "Rohdaten zu arbeitsabschnitte bau").toBeGreaterThan(0);
  });

  it("Phase 7 (D-08, D-22): neue Detailseiten bestehend und in der Sitemap, bereinigte Zielwerte laut 07-UI-SPEC", async () => {
    const sitemapPaths = new Set((await sitemap()).map((e) => toPath(e.url)));
    for (const slug of ["gaeb", "mahnwesen", "terminplanung", "bankabgleich", "datenuebernahme", "maengelmanagement"]) {
      const e = keywordMap.find((k) => k.path === `/funktionen/${slug}`);
      expect(e?.status, slug).toBe("bestehend");
      expect(e && "phase" in e, `${slug}: kein Feld phase bei bestehenden Seiten`).toBe(false);
      expect(sitemapPaths.has(`/funktionen/${slug}`), slug).toBe(true);
    }
    const h1: Record<string, string> = {
      "/funktionen/team": "Mitarbeiter-App und Rechte: jeder Zugang passt zur Aufgabe",
      "/funktionen/terminplanung": "Bauzeitenplan mit Arbeitsabschnitten und Abhängigkeiten",
      "/funktionen/bankabgleich": "Zahlungsabgleich: Bankumsätze nachvollziehbar zuordnen",
      "/funktionen/datenuebernahme": "Datenimport beim Umstieg auf CraftOS",
      "/funktionen/buchhaltung": "Buchhaltung im Handwerk: vorbereitet für die Steuerberatung",
      "/funktionen/baudokumentation": "Bautagebuch-App: Berichte, Fotos und Abnahmen im Projekt",
    };
    for (const [p, wert] of Object.entries(h1)) {
      const e = keywordMap.find((k) => k.path === p);
      expect(e?.target?.h1, p).toBe(wert);
      expect(Array.from(wert).length, `${p}: H1 ≤ 60`).toBeLessThanOrEqual(60);
      // Kopfwort-Regel (07-UI-SPEC SEO-Vertrag): H1 enthält das erste Wort des Hauptkeywords.
      expect(norm(wert), `${p}: Kopfwort`).toContain(norm(e!.primary!.keyword.split(" ")[0]));
    }
    const maengel = keywordMap.find((k) => k.path === "/funktionen/maengelmanagement");
    expect(maengel?.target?.description).toBe(
      "Mängelmanagement in CraftOS: Mängel mit Foto und Ort erfassen, Fristen und Zuständige festlegen und die Behebung bis zur Prüfung nachverfolgen.",
    );
    // Überclaims (Pitfall 8, T-07-06): „automatisch“ und „lückenlos“ nicht in den Zielwerten der Funktionsseiten.
    for (const k of keywordMap.filter((x) => x.path.startsWith("/funktionen/"))) {
      const werte = [k.target?.title, k.target?.h1, k.target?.description].join(" ");
      expect(werte, k.path).not.toMatch(/lückenlos|automatisch/i);
    }
  });

  it("Phase-7-Detailseiten folgen den Zielwerten (D-10, D-22, SEO-02)", async () => {
    // Pitfall 1: Detailseiten haben generateMetadata (params als Promise) und eine async Page; gerendert wird
    // deshalb die synchrone Vorlage FunktionsDetail mit getFunktionsdetail(slug).
    const { generateMetadata } = await import("@/app/funktionen/[slug]/page");
    const { FunktionsDetail } = await import("@/components/funktionen/FunktionsDetail");
    const { getFunktionsdetail } = await import("@/lib/funktionsdetails");
    const { funktionen } = await import("@/lib/funktionen");
    expect(funktionen).toHaveLength(22);
    for (const f of funktionen) {
      const pfad = `/funktionen/${f.slug}`;
      const eintrag = keywordMap.find((k) => k.path === pfad);
      expect(eintrag?.primary && eintrag.target, `${pfad}: Eintrag mit Zielwerten`).toBeTruthy();
      const { target, primary } = eintrag!;
      const meta = await generateMetadata({ params: Promise.resolve({ slug: f.slug }) });
      expect(`${String(meta.title)} | CraftOS`, `${pfad}: Title`).toBe(target!.title);
      expect(meta.description, `${pfad}: Description`).toBe(target!.description);
      expect(meta.alternates?.canonical, `${pfad}: Canonical`).toMatch(new RegExp(`${pfad}$`));
      const html = renderToString(createElement(FunktionsDetail, { detail: getFunktionsdetail(f.slug) }));
      const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
      expect(h1s, `${pfad}: genau eine H1`).toHaveLength(1);
      const h1 = h1s[0][1]
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
      expect(h1, `${pfad}: H1`).toBe(target!.h1);
      expect(norm(h1), `${pfad}: Kopfwort`).toContain(norm(primary!.keyword.split(" ")[0]));
    }
    const leer = await generateMetadata({ params: Promise.resolve({ slug: "gibt-es-nicht" }) });
    expect(leer).toEqual({});
  });

  it("statische Seiten (/, /funktionen, /app) folgen den Zielwerten (D-12, 07 D-10)", async () => {
    for (const seite of PHASE6_SEITEN) {
      const eintrag = keywordMap.find((k) => k.path === seite.path);
      expect(eintrag?.primary && eintrag.target, `${seite.path}: Eintrag mit Zielwerten`).toBeTruthy();
      const { target, primary } = eintrag!;
      const mod = await seite.modul();
      const titel = String(mod.metadata.title);
      // Die Root-Seite erbt kein Title-Template und trägt den vollständigen Title.
      const gerendert = seite.path === "/" ? titel : `${titel} | CraftOS`;
      expect(gerendert, `${seite.path}: Title`).toBe(target!.title);
      expect(mod.metadata.description, `${seite.path}: Description`).toBe(target!.description);
      const html = renderToString(createElement(mod.default));
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      expect(h1Match, `${seite.path}: H1 vorhanden`).toBeTruthy();
      const h1 = h1Match![1]
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
      expect(h1, `${seite.path}: H1`).toBe(target!.h1);
      expect(norm(gerendert), `${seite.path}: Title enthält Hauptkeyword`).toContain(norm(primary!.keyword));
      expect(norm(h1), `${seite.path}: H1 enthält Hauptkeyword`).toContain(norm(primary!.keyword));
    }
  });
});

/**
 * Phase 8 (D-06, D-17, D-20; 08-UI-SPEC § 8): Die Keyword-Map ist die einzige Quelle für Title, H1 und
 * Description jeder indexierten Seite. Geprüft werden alle bestehenden Einträge und die geplanten Phase-8-Pfade.
 */
describe("Phase 8 – Zielwerte sitewide", () => {
  const sitewide = keywordMap.filter((k) => k.status === "bestehend" || (k.status === "geplant" && k.phase === 8));
  const kopfwort = (keyword: string) => norm(keyword.split(" ")[0]);
  // Überclaims in Descriptions (Wortliste wie lib/funktionsdetails, ergänzt um Superlative; T-08-09).
  const UEBERCLAIM = [/lückenlos/i, /vollständig offline/i, /\bbeste[nrs]?\b/i, /testsieger/i, /\bNr\. ?1\b/i, /marktführer/i];

  it("jeder bestehende und jeder geplante Phase-8-Eintrag hat title, h1 und description", () => {
    expect(sitewide.length).toBeGreaterThanOrEqual(136);
    const ohne = sitewide.filter((k) => !(k.target?.title && k.target.h1 && k.target.description)).map((k) => k.path);
    expect(ohne).toEqual([]);
  });

  it("gerenderter Title ≤ 60 (mit oder ohne Markenzusatz), Description 120–155", () => {
    for (const k of sitewide) {
      const t = k.target ?? {};
      expect(Array.from(t.title ?? "").length, `${k.path}: Titel`).toBeLessThanOrEqual(60);
      const d = (t.description ?? "").length;
      expect(d >= 120 && d <= 155, `${k.path}: Description ${d}`).toBe(true);
    }
  });

  it("Titel, Descriptions und H1 sind sitewide eindeutig", () => {
    for (const feld of ["title", "h1", "description"] as const) {
      const gesehen = new Map<string, string>();
      for (const k of sitewide) {
        const wert = k.target?.[feld];
        if (!wert) continue;
        expect(gesehen.get(wert), `${feld} „${wert}“: ${k.path} ↔ ${gesehen.get(wert)}`).toBeUndefined();
        gesehen.set(wert, k.path);
      }
    }
  });

  it("Seiten mit Hauptkeyword tragen dessen Kopfwort in Titel und H1 (D-17)", () => {
    for (const k of sitewide) {
      if (!k.primary) continue;
      expect(norm(k.target?.title ?? ""), `${k.path}: Titel`).toContain(kopfwort(k.primary.keyword));
      expect(norm(k.target?.h1 ?? ""), `${k.path}: H1`).toContain(kopfwort(k.primary.keyword));
    }
  });

  it("Kategorien heißen „Ratgeber: …“ bzw. „Hilfe: …“ (Pitfall 11)", () => {
    const kategorien = sitewide.filter((k) => k.path.includes("/kategorie/"));
    expect(kategorien.length).toBe(15);
    for (const k of kategorien) {
      const praefix = k.path.startsWith("/blog/") ? "Ratgeber: " : "Hilfe: ";
      expect(k.target?.h1?.startsWith(praefix), `${k.path}: ${k.target?.h1}`).toBe(true);
    }
  });

  it("Descriptions ohne Superlative und Überclaims (T-08-09)", () => {
    for (const k of sitewide)
      for (const re of UEBERCLAIM) expect(k.target?.description ?? "", `${k.path}: ${re}`).not.toMatch(re);
  });

  it("Werte aus 08-UI-SPEC § 8 und §§ 4–5 stehen exakt in der Map", () => {
    const soll: Record<string, { title?: string; h1?: string; description?: string }> = {
      "/vergleich/plancraft-alternative": { title: "plancraft-Alternative: Preise im Vergleich | CraftOS" },
      "/vergleich/craftnote-alternative": { title: "Craftnote-Alternative: Preise im Vergleich | CraftOS" },
      "/vergleich/hero-alternative": { title: "HERO Software Alternative im Vergleich | CraftOS" },
      "/vergleich/tooltime-alternative": { title: "ToolTime-Alternative: Preise im Vergleich | CraftOS" },
      "/vergleich": {
        h1: "Handwerkersoftware im Vergleich: fünf Anbieter mit Quellen",
        description:
          "Handwerkersoftware-Vergleich mit Quellen: Abrechnung, Laufzeit, Testphase und Plantafel von CraftOS, plancraft, Craftnote, HERO und ToolTime im Überblick.",
      },
      "/fakten-ueber-craftos": {
        title: "Fakten über CraftOS: Funktionen und Lizenzen | CraftOS",
        h1: "Fakten über CraftOS",
        description:
          "Überprüfbare Fakten über CraftOS: was die Handwerkersoftware ist, Plattformen, Lizenzen und Preise, Testphase, GoBD-Unterstützung und benannte Grenzen.",
      },
      "/vergleich/handwerkersoftware-kleine-betriebe": {
        title: "Handwerkersoftware für kleine Betriebe: Kriterien | CraftOS",
        h1: "Handwerkersoftware für kleine Betriebe im Vergleich",
      },
      "/preise": { h1: "Preise der Handwerkersoftware CraftOS" },
      "/craft-ai": { h1: "KI im Handwerk: Craft AI beantwortet Fragen zu Ihrem Betrieb" },
      "/gobd": { h1: "GoBD-konforme Software: wie CraftOS Ihre Abläufe unterstützt" },
    };
    for (const [p, werte] of Object.entries(soll)) {
      const t = keywordMap.find((k) => k.path === p)?.target;
      for (const [feld, wert] of Object.entries(werte)) expect(t?.[feld as "title"], `${p}: ${feld}`).toBe(wert);
    }
  });

  it("Rechtsseiten: eindeutige Titel, Impressum-Description ohne Paragrafenangabe (D-20, Open Question 5)", () => {
    const titel = Object.fromEntries([...LEGAL].map((p) => [p, keywordMap.find((k) => k.path === p)?.target?.title]));
    expect(titel["/impressum"]).toBe("Impressum | CraftOS");
    expect(new Set(Object.values(titel)).size).toBe(3);
    expect(keywordMap.find((k) => k.path === "/impressum")?.target?.description).not.toMatch(/§|DDG|TMG/);
  });
});
