import { getFunktionsgruppen } from "@/lib/funktionsgruppen";
import { cardScenes } from "@/lib/scenes";

/**
 * Funktionskarten (Name, Icon, Nutzen, Plattformen aus den Funktionsgruppen) mit Karten-Szene aus lib/scenes.ts für
 * Artikel und Gewerke (09-REVIEW IN-01: vorher zweifach kopiert). Fehlt Detailseite oder Szene, bricht der Build mit
 * dem Fehlertext des Aufrufers ab.
 */
export function funktionsKarten(slugs: readonly string[], fehlertext: (slug: string) => string) {
  const details = getFunktionsgruppen().flatMap((gruppe) => gruppe.details);
  return slugs.map((slug) => {
    const eintrag = details.find((d) => d.slug === slug);
    const karte = cardScenes[slug];
    if (!eintrag || !karte) throw new Error(fehlertext(slug));
    return { ...eintrag, karte };
  });
}
