import "server-only";
import { gewerke } from "./gewerke";
import { GRUPPEN_REIHENFOLGE } from "./funktionsgruppen";

/**
 * Navigationsmodell der Hauptnavigation (Phase 6, D-05, D-06, D-07).
 *
 * Server-only: Der Header (Server Component) liest das Modell und übergibt die gerenderten Panels als
 * Slot an die Client-Hülle `HeaderShell`. Der Inhalt des Mega-Menüs „Funktionen“ kommt aus
 * lib/funktionsgruppen.ts; hier stehen nur Hauptpunkte und einfache Link-Panels (Bestand).
 */

export type NavId = "funktionen" | "gewerke" | "preise" | "wissen" | "hilfe";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem {
  id: NavId;
  label: string;
  href: string;
  /** Pfadpräfixe, unter denen der Hauptpunkt als aktueller Bereich gilt */
  matchPrefixes: string[];
  panel: null | { kind: "funktionen" } | { kind: "links"; links: NavLink[]; columns: 1 | 2 };
}

export function getHauptnavigation(): NavItem[] {
  return [
    { id: "funktionen", label: "Funktionen", href: "/funktionen", matchPrefixes: ["/funktionen"], panel: { kind: "funktionen" } },
    {
      id: "gewerke",
      label: "Gewerke",
      href: "/gewerke",
      matchPrefixes: ["/gewerke"],
      panel: {
        kind: "links",
        columns: 2,
        links: [
          { label: "Alle Gewerke", href: "/gewerke" },
          ...gewerke.map((gewerk) => ({ label: gewerk.name, href: `/gewerke/${gewerk.slug}` })),
        ],
      },
    },
    { id: "preise", label: "Preise", href: "/preise", matchPrefixes: ["/preise"], panel: null },
    {
      id: "wissen",
      label: "Wissen",
      href: "/blog",
      matchPrefixes: ["/blog", "/rechner"],
      panel: {
        kind: "links",
        columns: 1,
        links: [
          { label: "Ratgeber", href: "/blog" },
          { label: "Kostenlose Rechner", href: "/rechner" },
          { label: "Stundensatz berechnen", href: "/rechner/stundensatz" },
          { label: "Angebot kalkulieren", href: "/rechner/angebotskalkulation" },
        ],
      },
    },
    {
      id: "hilfe",
      label: "Hilfe",
      href: "/hilfe",
      matchPrefixes: ["/hilfe"],
      panel: {
        kind: "links",
        columns: 1,
        links: [
          { label: "Hilfezentrum", href: "/hilfe" },
          { label: "Kontakt & Support", href: "/support" },
        ],
      },
    },
  ];
}

/**
 * Prüft Menüziele gegen die Routen der Sitemap. Gültig sind Sitemap-Pfade ohne Fragment und die
 * Gruppenanker `/funktionen#<GruppenId>`. Liefert je ungültigem Ziel den Fehlertext aus dem 06-UI-SPEC.
 */
export function checkNavigationTargets(hrefs: string[], routes: Set<string>): string[] {
  const gruppen = new Set<string>(GRUPPEN_REIHENFOLGE);
  const fehler: string[] = [];
  for (const href of hrefs) {
    const [pfad, anker] = href.split("#", 2);
    const gueltig =
      anker === undefined ? routes.has(pfad) : pfad === "/funktionen" && routes.has(pfad) && gruppen.has(anker);
    if (!gueltig) {
      fehler.push(`Menü: Ziel ${href} ist keine Route der Sitemap – Ziel in lib/funktionsgruppen.ts korrigieren oder Link entfernen.`);
    }
  }
  return fehler;
}
