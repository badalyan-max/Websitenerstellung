import "server-only";
import type { Metadata } from "next";
import { keywordMap } from "@/lib/keyword-map";
import { pageMetadata } from "@/lib/metadata";

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

/**
 * Title, Description, Canonical, Open Graph und Twitter einer Seite aus der Keyword-Map.
 * `imagePath` setzt og:image und twitter:image auf dasselbe Bild (Pitfall 8); Standard bleibt das
 * Bild aus pageMetadata, bis die Seite ein eigenes Segmentbild hat.
 */
export function metaFor(path: string, opts?: { imagePath?: string }): Metadata {
  const z = zielwerte(path);
  return pageMetadata(z.titleOhneMarke, z.description, path, opts?.imagePath);
}
