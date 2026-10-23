/**
 * Sitemap-Änderungsdaten der in Phase 10 geänderten Seiten (K-15, K-5; Übergaben 10-03, 10-04, 10-10, 10-13,
 * 10-F-NOTIZ; Integration 10-06). Kernseiten über `pageUpdated` in app/sitemap.ts, Detailseiten über `checkedAt`
 * (lib/funktionen.ts), Artikel über `updatedAt` im Frontmatter. Format YYYY-MM-DD (Europe/Berlin).
 */
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

const PHASE10 = "2026-10-23";

const GEAENDERT = [
  // Startseite: Tabellen-Caption J4 (10-10)
  "/",
  // 10-04 (D-21): Zusatzkarten Kassenbuch und § 13b
  "/funktionen",
  // 10-13: Lagerfoto-Credits in der FAQ
  "/craft-ai",
  // 10-03 / 10-10: v2-Köpfe
  "/support",
  "/rechner",
  "/rechner/stundensatz",
  "/rechner/angebotskalkulation",
  // 10-03 v2-Darstellung; /datenschutz Inhalt (476c1a0); /impressum Inhalt (D-42)
  "/impressum",
  "/datenschutz",
  "/agb",
  // 10-F (D-41): Einrichtungsservice und Datenstandort
  "/preise",
  "/fakten-ueber-craftos",
  "/vergleich",
  "/vergleich/plancraft-alternative",
  "/vergleich/craftnote-alternative",
  "/vergleich/hero-alternative",
  "/vergleich/tooltime-alternative",
  "/vergleich/handwerkersoftware-kleine-betriebe",
  "/funktionen/datenuebernahme",
  "/hilfe/daten-importieren",
  // 10-04 (K-5): Detailseiten mit neuer Kachel bzw. Extra
  "/funktionen/rechnungen",
  "/funktionen/buchhaltung",
  // 10-13: Hilfeartikel mit Credit-Wert
  "/hilfe/lager-scan-app",
] as const;

describe("Sitemap: Änderungsdaten Phase 10", () => {
  it("jede in Phase 10 geänderte Seite trägt 2026-10-23", async () => {
    const stand = new Map((await sitemap()).map((e) => [new URL(e.url).pathname, e.lastModified]));
    const abweichend = GEAENDERT.filter((p) => stand.get(p) !== PHASE10).map((p) => `${p}: ${String(stand.get(p))}`);
    expect(abweichend).toEqual([]);
  });

  it("alle Einträge haben ein Datum im Format YYYY-MM-DD, auch die Rechtsseiten", async () => {
    const ohne = (await sitemap()).filter((e) => !/^\d{4}-\d{2}-\d{2}$/.test(String(e.lastModified ?? "")));
    expect(ohne.map((e) => e.url)).toEqual([]);
  });
});
