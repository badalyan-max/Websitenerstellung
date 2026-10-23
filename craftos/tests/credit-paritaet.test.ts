/**
 * Lagerfoto-Credits (Plan 10-13; D-22, K-6, Inhaberregel L-1/D-03).
 *
 * Höchstpreis der Foto-Erkennung im Lager („Foto mit KI erkennen“, Mobile) je Foto, datiert in lib/site.ts
 * (`lagerfotoCredits`). Beleg im Web-Release (Commit aus productBasis, nur lesend über tests/release-repos.ts):
 * - supabase/functions/_shared/aiPricing.ts, Eintrag 'analyze-inventory-photo' (Label „Inventurfoto“):
 *   tariff { kind: 'fixed', maxCredits: 2, steps: [{ from: '2027-01-01T00:00:00Z', maxCredits: 3 }] }
 * - supabase/migrations/20261009200000_inventory_photo_dated_price.sql: v_max … then 3 else 2 (Stichtag in SQL)
 * Nicht verwechseln: 'analyze-goods-receipt' ist cost_plus ohne festen Wert.
 *
 * Die Release-Suite überspringt nur sichtbar (Grund im Suite-Namen); mit CRAFTOS_REQUIRE_RELEASE=1 oder CI=true
 * läuft sie immer und schlägt bei fehlendem Repo fehl.
 */
import fs from "node:fs";
import path from "node:path";
import { createElement, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { lagerfotoCredits, lagerfotoCreditsAm, lagerfotoCreditsText } from "@/lib/site";
import { pruefeReleaseStand, releaseDatei, releaseSuite } from "./release-repos";

const ROOT = path.resolve(__dirname, "..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

/** ISO-Datum → „1. Januar 2027“ (unabhängig von lib/site.ts formatiert, damit der Test den Text gegenprüft). */
const datumLang = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

const stufen = lagerfotoCredits.map((s) => ({ ab: s.ab as string | null, max: s.max as number }));
const spaeter = stufen.filter((s): s is { ab: string; max: number } => s.ab !== null);
const erwarteterText = [
  `bis zu ${stufen[0].max} Credits`,
  ...spaeter.map((s) => `ab dem ${datumLang(s.ab)} bis zu ${s.max} Credits`),
].join(", ");

const decode = (v: string) =>
  v
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;| /g, " ");

describe("Lagerfoto-Credits in lib/site.ts (D-22)", () => {
  it("datierte Stufen: zuerst ohne Stichtag, danach aufsteigende ISO-Daten", () => {
    expect(stufen[0].ab).toBeNull();
    expect(spaeter.length).toBeGreaterThanOrEqual(1);
    for (const s of spaeter) expect(s.ab).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(spaeter.map((s) => s.ab)).toEqual([...spaeter.map((s) => s.ab)].sort());
    expect(stufen).toEqual([
      { ab: null, max: 2 },
      { ab: "2027-01-01", max: 3 },
    ]);
  });

  it("lagerfotoCreditsAm: 2 bis einschließlich 31.12.2026, 3 ab 01.01.2027", () => {
    expect(lagerfotoCreditsAm("2026-10-23")).toBe(2);
    expect(lagerfotoCreditsAm("2026-12-31")).toBe(2);
    expect(lagerfotoCreditsAm("2027-01-01")).toBe(3);
    expect(lagerfotoCreditsAm("2027-06-30T12:00:00Z")).toBe(3);
  });

  it("lagerfotoCreditsText nennt beide Werte und den Stichtag ausgeschrieben", () => {
    expect(lagerfotoCreditsText).toBe(erwarteterText);
    expect(lagerfotoCreditsText).toBe("bis zu 2 Credits, ab dem 1. Januar 2027 bis zu 3 Credits");
  });

  it("Belegkommentar in lib/site.ts verweist auf aiPricing.ts und die Migration", () => {
    const quelle = read("lib/site.ts");
    expect(quelle).toContain("web:supabase/functions/_shared/aiPricing.ts");
    expect(quelle).toContain("'analyze-inventory-photo'");
    expect(quelle).toContain("20261009200000");
  });
});

describe("Anzeige auf /craft-ai und im Hilfeartikel lager-scan-app (K-6)", () => {
  it("/craft-ai: Werte per Import aus lib/site.ts, keine Credit-Literale der Lagerfoto-KI im Quelltext", () => {
    const quelle = read("lib/seiten/craft-ai.ts");
    expect(quelle).toMatch(/import \{[^}]*\blagerfotoCredits\w*[^}]*\} from "@\/lib\/site"/);
    expect(quelle).not.toMatch(/bis zu \d+ Credits/);
    expect(quelle).not.toContain("Januar 2027");
  });

  it("/craft-ai gerendert: Foto-Erkennung mit beiden Werten und „1. Januar 2027“, auch im FAQPage-Schema", async () => {
    const Page = (await import("@/app/craft-ai/page")).default as () => ReactElement;
    const html = renderToString(createElement(Page));
    const sichtbar = decode(html);
    expect(sichtbar).toContain(`Foto-Erkennung verbraucht je Foto ${erwarteterText}.`);
    const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    expect(ld.some((json) => json.includes("FAQPage") && json.includes(erwarteterText))).toBe(true);
  }, 60_000);

  it("Hilfeartikel: genau der beauftragte Satz direkt nach „Die App nennt den Verbrauch vor dem Start.“", () => {
    const md = read("content/hilfe/lager-scan-app.md");
    const [aktuell, ...rest] = stufen;
    const satz = `Je Foto fallen bis zu ${aktuell.max} Credits an, ${rest
      .map((s) => `ab dem ${datumLang(s.ab as string)} bis zu ${s.max} Credits`)
      .join(", ")}.`;
    expect(satz).toBe("Je Foto fallen bis zu 2 Credits an, ab dem 1. Januar 2027 bis zu 3 Credits.");
    expect(md).toContain(`Die App nennt den Verbrauch vor dem Start. ${satz}`);
    expect(md.split("1. Januar 2027").length - 1).toBe(1);
  });
});

const lagerfotoSuite = releaseSuite("Lagerfoto-Credits am Release-Commit", ["web"]);

describe.skipIf(lagerfotoSuite.skip)(lagerfotoSuite.titel, () => {
  it("Web-Repo vorhanden, Release-Commit aus productBasis lokal und in origin/release enthalten", () => {
    pruefeReleaseStand("web");
  });

  it("aiPricing.ts 'analyze-inventory-photo': Höchstwert und Stichtag gleich lagerfotoCredits", () => {
    const quelle = releaseDatei("web", "supabase/functions/_shared/aiPricing.ts");
    const start = quelle.indexOf("'analyze-inventory-photo': {");
    expect(start, "Eintrag 'analyze-inventory-photo' fehlt in aiPricing.ts").toBeGreaterThanOrEqual(0);
    const eintrag = quelle.slice(start, quelle.indexOf("\n  },", start));
    expect(eintrag).toContain("label: 'Inventurfoto'");
    const tarif = eintrag.match(/tariff:\s*\{\s*kind:\s*'fixed',\s*maxCredits:\s*(\d+)(?:,\s*steps:\s*\[([^\]]*)\])?\s*\}/);
    expect(tarif, "Tarif 'fixed' mit maxCredits im Eintrag erwartet").not.toBeNull();
    const releaseStufen: { ab: string | null; max: number }[] = [{ ab: null, max: Number(tarif![1]) }];
    for (const m of (tarif![2] ?? "").matchAll(/\{\s*from:\s*'([^']+)',\s*maxCredits:\s*(\d+)\s*\}/g)) {
      // Website-Stichtag ist ein Kalendertag; der Release-Stichtag muss deshalb genau auf 00:00 UTC liegen.
      expect(m[1]).toMatch(/^\d{4}-\d{2}-\d{2}T00:00:00Z$/);
      releaseStufen.push({ ab: m[1].slice(0, 10), max: Number(m[2]) });
    }
    expect(releaseStufen).toEqual(stufen);
  });

  it("Migration 20261009200000 datiert denselben Höchstwert in SQL", () => {
    const sql = releaseDatei("web", "supabase/migrations/20261009200000_inventory_photo_dated_price.sql");
    const m = sql.match(/v_max integer:=case when now\(\)>=timestamptz ''(\d{4}-\d{2}-\d{2}) 00:00:00\+00'' then (\d+) else (\d+) end/);
    expect(m, "datierter Höchstwert v_max in der Migration erwartet").not.toBeNull();
    expect([
      { ab: null, max: Number(m![3]) },
      { ab: m![1], max: Number(m![2]) },
    ]).toEqual(stufen);
  });
});
