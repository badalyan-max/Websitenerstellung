import "server-only";
import type { Metadata } from "next";
import { keywordMap } from "@/lib/keyword-map";
import { pageMetadata } from "@/lib/metadata";
import { ogAlt, type OgKind } from "@/lib/og-meta";

/**
 * Metadaten aus der Keyword-Map (SEO-02, 08 D-06): docs/seo/keyword-map.json ist die einzige Quelle für
 * Title, H1 und Description. Seiten nutzen `metaFor(path)` statt eigener Literale; die H1 kommt aus
 * `zielwerte(path).h1`.
 */

/** Zielwerte einer Seite aus keyword-map.json (title inklusive „ | CraftOS“). */
export interface Zielwerte {
  title: string;
  titleOhneMarke: string;
  h1: string;
  description: string;
  keyword: string | null;
}

/** Suffix des Title-Templates aus app/layout.tsx. */
export const MARKE = " | CraftOS";

/** Zielwerte einer Seite aus keyword-map.json; wirft, wenn title, h1 oder description fehlen. */
export function zielwerte(path: string): Zielwerte {
  const eintrag = keywordMap.find((k) => k.path === path);
  const target = eintrag?.target;
  if (!eintrag || !target?.title || !target.h1 || !target.description) {
    throw new Error(
      `Keyword-Map: ${path} hat keine Zielwerte – target.title, target.h1 und target.description ergänzen.`,
    );
  }
  return {
    title: target.title,
    titleOhneMarke: target.title.endsWith(MARKE) ? target.title.slice(0, -MARKE.length) : target.title,
    h1: target.h1,
    description: target.description,
    keyword: eintrag.primary?.keyword ?? null,
  };
}

/** Pfad des statisch erzeugten OG-Bilds eines Segments (app/<pfad>/opengraph-image.tsx). */
export function segmentBild(path: string): string {
  return path === "/" ? "/opengraph-image" : path + "/opengraph-image";
}

/**
 * Titel der OG-Grafik (08-05, UI-SPEC § 7): die H1 der Seite; nur wenn sie länger als 90 Zeichen ist, der
 * Kurztitel `target.ogTitle` aus derselben Map.
 */
export function ogTitel(path: string): string {
  const { h1 } = zielwerte(path);
  return keywordMap.find((k) => k.path === path)?.target?.ogTitle ?? h1;
}

/**
 * Title, Description, Canonical, Open Graph und Twitter einer Seite aus der Keyword-Map.
 * `imagePath` setzt og:image und twitter:image auf dasselbe Bild (Pitfall 8). Standard ist das Segmentbild
 * `{path}/opengraph-image` (08-05, D-08); die Startseite behält `/opengraph-image`.
 *
 * Endet `target.title` auf „ | CraftOS“, hängt das Layout-Template die Marke an (title = Teil ohne Marke).
 * Fehlt der Zusatz (08-04, Entwurfsregel Hilfe: Markenzusatz entfällt, wenn der Titel sonst > 60 Zeichen
 * hätte), rendert die Seite `title: { absolute }` – der gerenderte Title ist dann genau `target.title`.
 */
export function metaFor(path: string, opts?: { imagePath?: string }): Metadata {
  const z = zielwerte(path);
  const bild = ogBildFuer(path, opts?.imagePath ?? segmentBild(path));
  const meta = pageMetadata(z.titleOhneMarke, z.description, path, bild.pfad, bild.alt);
  return z.title.endsWith(MARKE) ? meta : { ...meta, title: { absolute: z.title } };
}

/** Seitentyp der OG-Grafik je Pfad, wie in app/**\/opengraph-image.tsx (`kind`); Test: tests/og.test.ts. */
const OG_ARTEN: readonly [RegExp, OgKind][] = [
  [/^\/$/, "Handwerkersoftware"],
  [/^\/funktionen$/, "Funktionen"],
  [/^\/funktionen\/[^/]+$/, "Funktion"],
  [/^\/app$/, "Mobile-App"],
  [/^\/preise$/, "Preise"],
  [/^\/vergleich(\/.*)?$/, "Vergleich"],
  [/^\/fakten-ueber-craftos$/, "Fakten"],
  [/^\/craft-ai$/, "Craft AI"],
  [/^\/gobd$/, "GoBD"],
  [/^\/gewerke$/, "Gewerke"],
  [/^\/gewerke\/[^/]+$/, "Gewerk"],
  [/^\/blog(\/.*)?$/, "Ratgeber"],
  [/^\/hilfe(\/.*)?$/, "Hilfe"],
  [/^\/rechner(\/.*)?$/, "Rechner"],
  [/^\/support$/, "Kontakt"],
  [/^\/(agb|datenschutz|impressum)$/, "Rechtliches"],
];

/** Seitentyp der OG-Grafik eines Pfads; `undefined` für Seiten ohne eigene OG-Grafik. */
export function ogArt(path: string): OgKind | undefined {
  return OG_ARTEN.find(([re]) => re.test(path))?.[1];
}

/**
 * Versionsschlüssel der OG-Grafik (08-REVIEW LO-01): kurzer FNV-1a-Hash aus Seitentyp, Titel und Bildgröße. Ändert
 * sich der Titel, ändert sich die URL – Facebook, LinkedIn und Slack laden dann das neue Bild statt des Caches.
 */
export function ogVersion(kind: OgKind, titel: string): string {
  let h = 0x811c9dc5;
  for (const zeichen of `${kind}|${titel}|1200x630`) {
    h ^= zeichen.codePointAt(0)!;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36);
}

/** Bildpfad mit Versionsschlüssel und Alternativtext „{Seitentyp}: {OG-Titel}“; ohne Seitentyp unverändert. */
export function ogBildFuer(path: string, bildPfad: string = segmentBild(path)): { pfad: string; alt?: string } {
  const art = ogArt(path);
  if (!art) return { pfad: bildPfad };
  const titel = ogTitel(path);
  return { pfad: `${bildPfad}?v=${ogVersion(art, titel)}`, alt: ogAlt(art, titel) };
}
