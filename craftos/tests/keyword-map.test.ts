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

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const DATA_DIR = "docs/seo/data/kwmap";
const LEGAL = new Set(["/agb", "/datenschutz", "/impressum"]);
const pageCandidates = seeds.pageCandidates as Record<string, string[]>;

const norm = (k: string) =>
  k
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[\s-]+/g, "");
const toPath = (url: string) => new URL(url).pathname.replace(/\/$/, "") || "/";

/** Seiten, deren Title, H1 und Description in Phase 6 auf die Keyword-Map-Ziele umgestellt sind (D-12). Plan 06-05 ergänzt /funktionen. */
type SeitenModul = { default: () => ReactElement; metadata: Metadata };
const PHASE6_SEITEN: { path: string; modul: () => Promise<SeitenModul> }[] = [
  { path: "/", modul: () => import("@/app/page") },
  { path: "/funktionen", modul: () => import("@/app/funktionen/page") },
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
    for (const marke of ["plancraft", "craftnote", "hero", "tooltime"]) {
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

  it("Zielwerte für Titel, H1 und Description (D-14)", () => {
    for (const k of keywordMap) {
      if (!k.primary) continue;
      const t = k.target;
      expect(t?.title && t.h1 && t.description, `${k.path}: Zielwerte vollständig`).toBeTruthy();
      expect(t!.title!.length, `${k.path}: Titel ≤ 60`).toBeLessThanOrEqual(60);
      expect(norm(t!.title!), `${k.path}: Titel enthält Hauptkeyword`).toContain(norm(k.primary.keyword));
      expect(t!.description!.length, `${k.path}: Description ${t!.description!.length}`).toBeGreaterThanOrEqual(120);
      expect(t!.description!.length, `${k.path}: Description ${t!.description!.length}`).toBeLessThanOrEqual(155);
    }
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

  it("Phase-6-Seiten folgen den Zielwerten (D-12)", async () => {
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
