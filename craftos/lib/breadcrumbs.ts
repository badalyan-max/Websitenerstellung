import { TEXT_BUDGET } from "@/components/v2/budgets";
import { categories, type ContentKind } from "@/lib/content-types";
import { funktionen } from "@/lib/funktionen";
import { gewerke } from "@/lib/gewerke";

/** Ein Glied der Brotkrumen; `path` ohne Origin (BreadcrumbList setzt site.url davor). */
export interface Crumb {
  name: string;
  path: string;
}

const START: Crumb = { name: "Start", path: "/" };

/**
 * Feste Kette für statische Pfade (08-UI-SPEC § 1, Tabelle „Ketten“). Eintrag = Glieder nach „Start“.
 * Neue statische Seite → hier ergänzen; sonst bricht der Build mit dem Fehlertext aus dem UI-SPEC ab.
 */
const STATISCH: Record<string, string[]> = {
  "/funktionen": ["Funktionen"],
  "/app": ["Mobile-App"],
  "/preise": ["Preise"],
  "/vergleich": ["Vergleich"],
  "/vergleich/plancraft-alternative": ["Vergleich", "plancraft-Alternative"],
  "/vergleich/craftnote-alternative": ["Vergleich", "Craftnote-Alternative"],
  "/vergleich/hero-alternative": ["Vergleich", "HERO-Alternative"],
  "/vergleich/tooltime-alternative": ["Vergleich", "ToolTime-Alternative"],
  "/vergleich/handwerkersoftware-kleine-betriebe": ["Vergleich", "Für kleine Betriebe"],
  "/fakten-ueber-craftos": ["Fakten zu CraftOS"],
  "/craft-ai": ["Craft AI"],
  "/gobd": ["GoBD"],
  "/gewerke": ["Gewerke"],
  "/blog": ["Ratgeber"],
  "/hilfe": ["Hilfe"],
  "/rechner": ["Rechner"],
  "/rechner/stundensatz": ["Rechner", "Stundensatz"],
  "/rechner/angebotskalkulation": ["Rechner", "Angebotskalkulation"],
  "/support": ["Kontakt"],
  "/impressum": ["Impressum"],
  "/datenschutz": ["Datenschutz"],
  "/agb": ["AGB"],
};

const BEREICH: Record<ContentKind, string> = { blog: "Ratgeber", hilfe: "Hilfe" };

function keinEintrag(path: string): Error {
  return new Error(`Breadcrumbs: Pfad ${path} hat keinen Eintrag – lib/breadcrumbs.ts ergänzen.`);
}

/** Wirft den Mengenfehler aus dem UI-SPEC, wenn eine Kette nicht 2 bis 4 Glieder hat. */
export function assertCrumbCount(n: number): void {
  const { min, max } = TEXT_BUDGET.count.crumbs;
  if (n < min || n > max) {
    throw new Error(`Breadcrumbs: ${n} Glieder – ${min} bis ${max} erlaubt.`);
  }
}

/** Zwischenpfade aus den Segmenten: ["Vergleich", "HERO-Alternative"] für /vergleich/hero-alternative. */
function ausStatisch(path: string, names: string[]): Crumb[] {
  const segmente = path.split("/").filter(Boolean);
  const start = segmente.length - names.length;
  return names.map((name, i) => ({ name, path: "/" + segmente.slice(0, start + i + 1).join("/") }));
}

function ketteOhneStart(path: string, current?: string): Crumb[] {
  const statisch = STATISCH[path];
  if (statisch) return ausStatisch(path, statisch);

  const [bereich, a, b, ...rest] = path.split("/").filter(Boolean);
  if (rest.length > 0) throw keinEintrag(path);

  if (bereich === "funktionen" && a && !b) {
    const funktion = funktionen.find((f) => f.slug === a);
    if (!funktion) throw keinEintrag(path);
    return [
      { name: "Funktionen", path: "/funktionen" },
      { name: funktion.name, path },
    ];
  }
  if (bereich === "gewerke" && a && !b) {
    const gewerk = gewerke.find((g) => g.slug === a);
    if (!gewerk) throw keinEintrag(path);
    return [
      { name: "Gewerke", path: "/gewerke" },
      { name: gewerk.name, path },
    ];
  }
  if (bereich === "blog" || bereich === "hilfe") {
    const kind: ContentKind = bereich;
    const oben: Crumb = { name: BEREICH[kind], path: "/" + kind };
    if (a === "kategorie" && b) {
      const kategorie = categories[kind][b];
      if (!kategorie) throw keinEintrag(path);
      return [oben, { name: kategorie, path }];
    }
    if (a && !b && a !== "kategorie") {
      if (!current?.trim()) {
        throw new Error(`Breadcrumbs: Pfad ${path} braucht den Artikeltitel als current – crumbsFor(path, title) aufrufen.`);
      }
      return [oben, { name: current, path }];
    }
  }
  throw keinEintrag(path);
}

/**
 * Einzige Kettenquelle für sichtbare Brotkrumen und BreadcrumbList (08-UI-SPEC § 1, D-07, D-22).
 * Erstes Glied immer „Start“, letztes Glied der angefragte Pfad. `current` ist nur für Artikel
 * (/blog/[slug], /hilfe/[slug]) der Artikeltitel; alle anderen Namen kommen aus der Tabelle bzw. aus
 * lib/funktionen.ts, lib/gewerke.ts und den Kategorien in lib/content-types.ts.
 */
export function crumbsFor(path: string, current?: string): Crumb[] {
  const normal = path.length > 1 ? path.replace(/\/+$/, "") : path;
  if (normal === "/" || !normal.startsWith("/")) throw keinEintrag(normal || path);
  const items = [START, ...ketteOhneStart(normal, current)];
  assertCrumbCount(items.length);
  return items;
}
