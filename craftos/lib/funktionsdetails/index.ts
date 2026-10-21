import "server-only";
import {
  TEXT_BUDGET,
  assertCount,
  assertOneSentence,
  assertTextBudget,
  sentenceCount,
} from "@/components/v2/budgets";
import { getFunktion, type Funktion, type ProductPlatform } from "@/lib/funktionen";
import {
  GRUPPEN_REIHENFOLGE,
  getFunktionsgruppen,
  type Funktionsgruppe,
} from "@/lib/funktionsgruppen";
import { keywordMap } from "@/lib/keyword-map";
import { cardScenes, kopfVisuals, type FrameScene, type KopfVisual } from "@/lib/scenes";
import {
  PANEL_BUDGET,
  ROLLEN,
  type Abschnittskopf,
  type Funktionsdetail,
  type FunktionsdetailInhalt,
  type SnippetVariante,
  type VerwandtEintrag,
  type Zielwerte,
} from "./types";

/**
 * Builder der Funktionsdetailseiten (Phase 7, 07-UI-SPEC „Vorlage Detailseite“; D-02, D-03, D-04, D-19, D-23).
 *
 * Server-only: Keyword-Map (138 KB), Register und Inhalte gelangen nie ins Client-Bundle (T-07-10).
 * `buildFunktionsdetail` ist rein und mit Fremddaten testbar; `getFunktionsdetail` verbindet die
 * Inhaltsmodule mit lib/funktionen.ts, der Keyword-Map, dem Gruppenmodell und den Kopf-Visuals.
 * Jeder Regelverstoß ist ein Entwicklerfehler und bricht Test und Build mit dem 07-UI-SPEC-Fehlertext ab.
 */

/**
 * Inhaltsmodule je Slug. Leer bis 07-05/07-06 die Gruppenmodule (lib/funktionsdetails/{gruppe}.ts)
 * hier zusammenführen.
 */
export const INHALTE: Readonly<Record<string, FunktionsdetailInhalt>> = {};

/** FeatureSnippet nur auf diesen 8 Detailseiten, als einziges animiertes Element im Ablauf (D-19). */
export const SNIPPET_VARIANTE: Readonly<Record<string, SnippetVariante>> = {
  dashboard: "dashboard",
  angebote: "angebot",
  plantafel: "planung",
  rechnungen: "rechnung",
  eingangsrechnungen: "beleg",
  zeiterfassung: "zeit",
  lager: "lager",
  aufmass: "aufmass",
};

/** Zulässige Größenfolgen der Kernpunkt-Kacheln (07-UI-SPEC Abschnitt 4, lückenlos bei 4 Spalten). */
export const ERLAUBTE_ANORDNUNGEN: readonly string[] = [
  // mit lg (nur mit Phone-Visual)
  "lg·sm·sm·md",
  "lg·sm·sm·md·wide",
  "lg·sm·sm·md·md·md",
  "lg·sm·sm·md·md·sm·sm",
  // ohne lg
  "md·sm·sm",
  "md·sm·sm·wide",
  "md·sm·sm·wide·wide",
  "sm·sm·sm·sm·wide",
  "md·sm·sm·md·md",
  "md·sm·sm·md·sm·sm",
  "md·sm·sm·md·sm·sm·wide",
];

/** Abschnitt 6: fester Kopf auf allen Detailseiten. */
export const VERWANDT_KOPF: Abschnittskopf = {
  title: "Passende Funktionen",
  lead: "Diese Funktionen arbeiten mit denselben Projektdaten weiter.",
};

/** Abschnitt 7: CtaBand der Detailseiten (Copywriting Contract). */
export const CTA_DETAIL = {
  title: "Machen Sie Platz für Ihr Handwerk.",
  text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
  secondary: { label: "Preise ansehen", href: "/preise" },
} as const;

/** Überclaims (Pitfall 7/8, D-20, D-23); Vergleich ohne Groß-/Kleinschreibung. */
const VERBOTENE_WOERTER = ["lückenlos", "vollständig offline", "Online-Banking", "Bauphase"] as const;

const MARKE = " | CraftOS";

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

/** Erster Wert, der mehr als einmal vorkommt, sonst undefined. */
function ersteDoppelung(werte: readonly string[]): string | undefined {
  const gesehen = new Set<string>();
  for (const wert of werte) {
    if (gesehen.has(wert)) return wert;
    gesehen.add(wert);
  }
  return undefined;
}

function gruppeVon(gruppen: readonly Funktionsgruppe[], slug: string): Funktionsgruppe | undefined {
  return gruppen.find((g) => g.details.some((d) => d.slug === slug));
}

function pruefeAbschnittskopf(slug: string, abschnitt: string, kopf: Abschnittskopf): void {
  assertTextBudget("sectionHeader.title", kopf.title, TEXT_BUDGET.sectionHeader.title);
  assertTextBudget("sectionHeader.lead", kopf.lead, TEXT_BUDGET.sectionHeader.lead);
  assertOneSentence("SectionHeader", `${slug} (${abschnitt})`, kopf.lead);
}

function firstSentence(answer: string): string {
  return answer.split(/(?<=[.!?])\s+/)[0] ?? answer;
}

function kopfSzenen(visual: KopfVisual): FrameScene[] {
  return visual.kind === "pair" ? [visual.browser, visual.phone] : [visual.scene];
}

/** Alle Textfelder außer der H1 (die H1 kommt aus der Keyword-Map). */
function textfelder(inhalt: FunktionsdetailInhalt): string[] {
  const abschnitte = [inhalt.ablauf, inhalt.rollen, inhalt.kernpunkte, inhalt.faq];
  return [
    inhalt.lead,
    inhalt.secondary.label,
    ...abschnitte.flatMap((a) => [a.title, a.lead]),
    ...inhalt.ablauf.steps.flatMap((s) => [s.title, s.text]),
    ...inhalt.rollen.panels.flatMap((p) => [p.satz, ...p.rollen.map((r) => r.zusatz ?? "")]),
    ...inhalt.kernpunkte.tiles.flatMap((t) => [t.title, t.text]),
    ...inhalt.faq.items.flatMap((f) => [f.q, f.a]),
  ];
}

function pruefeWortregeln(slug: string, texte: readonly string[]): void {
  for (const text of texte) {
    const klein = text.toLowerCase();
    for (const wort of VERBOTENE_WOERTER) {
      if (klein.includes(wort.toLowerCase())) {
        throw new Error(`Funktionsdetail: ${slug} enthält ‚${wort}‘ – Formulierung laut 07-UI-SPEC ändern.`);
      }
    }
    if (klein.includes("automatisch") && !klein.includes("auf wunsch")) {
      throw new Error(`Funktionsdetail: ${slug} enthält ‚automatisch‘ – Formulierung laut 07-UI-SPEC ändern.`);
    }
  }
}

const PLATTFORM_REIHENFOLGE: readonly ProductPlatform[] = ["web", "mobile"];

/**
 * Baut eine Detailseite aus übergebenen Daten (rein, mit Fremddaten testbar). Prüfreihenfolge laut 07-04-PLAN:
 * Kopf, Abschnittsköpfe, Schritte, Panels, Kacheln, FAQ, verwandte Funktionen, Wortregeln.
 */
export function buildFunktionsdetail(input: {
  inhalt: FunktionsdetailInhalt;
  funktion: Funktion;
  ziel: Zielwerte;
  gruppen: Funktionsgruppe[];
  visual: KopfVisual;
}): Funktionsdetail {
  const { inhalt, funktion, ziel, gruppen, visual } = input;
  const slug = inhalt.slug;
  if (funktion.slug !== slug) {
    throw new Error(`Funktionsdetail: Inhalt ${slug} passt nicht zur Funktion ${funktion.slug} – Slug prüfen.`);
  }
  const gruppe = gruppeVon(gruppen, slug);
  if (!gruppe) {
    throw new Error(`Funktionsdetail: ${slug} ist keiner Gruppe zugeordnet – Zuordnung in lib/funktionsgruppen.ts ergänzen.`);
  }

  // (1) Kopf
  assertTextBudget("pageHead.h1", ziel.h1, TEXT_BUDGET.pageHead.h1);
  if (!inhalt.kopfwort || !ziel.h1.includes(inhalt.kopfwort)) {
    throw new Error(
      `FunktionsKopf: H1 enthält das Kopfwort ‚${inhalt.kopfwort}‘ nicht – keyword-map.json oder Datenmodul prüfen.`,
    );
  }
  assertTextBudget("pageHead.kopfLead", inhalt.lead, TEXT_BUDGET.pageHead.kopfLead);
  const leadSaetze = sentenceCount(inhalt.lead);
  if (leadSaetze !== 1) {
    throw new Error(`FunktionsKopf: Lead hat ${leadSaetze} Sätze – genau einen Satz schreiben.`);
  }
  assertTextBudget("pageHead.eyebrow", gruppe.label, TEXT_BUDGET.pageHead.eyebrow);
  const { secondary } = inhalt;
  const sekundaerGueltig =
    (secondary.label === "Alle Funktionen ansehen" && secondary.href === "/funktionen") ||
    (secondary.label === "Anleitung in der Hilfe" && /^\/hilfe\/[a-z0-9-]+$/.test(secondary.href));
  if (!sekundaerGueltig) {
    throw new Error(
      `Funktionsdetail: Sekundärlink ‚${secondary.label}‘ → ${secondary.href} für ${slug} ist nicht zulässig – „Anleitung in der Hilfe“ → /hilfe/{slug} oder „Alle Funktionen ansehen“ → /funktionen wählen.`,
    );
  }

  // (2) Abschnittsköpfe
  pruefeAbschnittskopf(slug, "ablauf", inhalt.ablauf);
  pruefeAbschnittskopf(slug, "rollen", inhalt.rollen);
  pruefeAbschnittskopf(slug, "kernpunkte", inhalt.kernpunkte);
  pruefeAbschnittskopf(slug, "faq", inhalt.faq);

  // (3) Schritte
  assertCount("StepFlow", inhalt.ablauf.steps.length, TEXT_BUDGET.count.detailSteps, "Schritte");
  for (const step of inhalt.ablauf.steps) {
    assertTextBudget("step.title", step.title, TEXT_BUDGET.step.title);
    assertTextBudget("step.text", step.text, TEXT_BUDGET.step.text);
    assertOneSentence("StepFlow", step.title, step.text);
  }

  // (4) Plattform-Panels
  for (const panel of inhalt.rollen.panels) {
    if (!funktion.platforms.includes(panel.platform)) {
      throw new Error(
        `Plattform ${panel.platform} ist für ${slug} nicht belegt – platforms aus lib/funktionen.ts übernehmen.`,
      );
    }
  }
  const sollPlattformen = PLATTFORM_REIHENFOLGE.filter((p) => funktion.platforms.includes(p));
  const istPlattformen = inhalt.rollen.panels.map((p) => p.platform);
  if (istPlattformen.join(",") !== sollPlattformen.join(",")) {
    throw new Error(
      `Funktionsdetail: ${slug} braucht genau ein Panel je belegter Plattform (${sollPlattformen.join(", ")}) in der Reihenfolge web, mobile – rollen.panels anpassen.`,
    );
  }
  for (const panel of inhalt.rollen.panels) {
    for (const rolle of panel.rollen) {
      if (!ROLLEN.includes(rolle.name)) {
        throw new Error(`Funktionsdetail: Rolle ‚${rolle.name}‘ ist keine belegte Rolle – Wert aus RolleName wählen.`);
      }
      if (rolle.zusatz !== undefined) assertTextBudget("plattformRollen.zusatz", rolle.zusatz, PANEL_BUDGET.zusatz);
    }
    assertCount("PlattformRollen", panel.rollen.length, PANEL_BUDGET.rollen, "Rollen");
    const doppelteRolle = ersteDoppelung(panel.rollen.map((r) => r.name));
    if (doppelteRolle) {
      throw new Error(`Funktionsdetail: Rolle ‚${doppelteRolle}‘ steht im Panel ${panel.platform} von ${slug} doppelt – Eintrag entfernen.`);
    }
    assertTextBudget("plattformRollen.satz", panel.satz, PANEL_BUDGET.satz);
    assertOneSentence("PlattformRollen", `${slug} (${panel.platform})`, panel.satz);
    assertCount("PlattformRollen", panel.lizenzen.length, PANEL_BUDGET.lizenzen, "Lizenzen");
  }

  // (5) Kernpunkt-Kacheln
  const tiles = inhalt.kernpunkte.tiles;
  assertCount("BentoGrid", tiles.length, TEXT_BUDGET.count.bento, "Kacheln");
  const anordnung = tiles.map((t) => t.size).join("·");
  if (!ERLAUBTE_ANORDNUNGEN.includes(anordnung)) {
    throw new Error(
      `Funktionsdetail: Anordnung ${anordnung} ist für ${slug} nicht zulässig – Größenfolge laut 07-UI-SPEC Abschnitt 4 wählen.`,
    );
  }
  const kopf = kopfSzenen(visual);
  for (const tile of tiles) {
    if (tile.size === "lg" && tile.visual.kind !== "phone") {
      throw new Error(`Funktionsdetail: lg-Kachel ‚${tile.title}‘ braucht ein Phone-Visual – Szene angeben oder Größe ändern.`);
    }
    if (tile.visual.kind === "phone" && kopf.includes(tile.visual.scene)) {
      throw new Error(`Funktionsdetail: Kachel ‚${tile.title}‘ zeigt die Kopf-Szene – eine andere Szene wählen.`);
    }
  }
  const grenzen = tiles.filter((t) => t.grenze === true).length;
  if (grenzen !== 1) {
    throw new Error(
      `Funktionsdetail: ${slug} braucht genau eine Grenze-Kachel (gefunden: ${grenzen}) – grenze: true an genau einer Kachel setzen.`,
    );
  }
  for (const tile of tiles) {
    if (tile.zusatz !== undefined && tile.size === "sm") {
      throw new Error(`Funktionsdetail: Zusatz-Kachel ‚${tile.title}‘ darf nicht sm sein – md, wide oder lg wählen.`);
    }
    const gross = tile.size === "lg" || tile.size === "wide";
    assertTextBudget("bentoTile.title", tile.title, TEXT_BUDGET.bentoTile.title);
    if (gross) assertTextBudget("bentoTile.textLarge", tile.text, TEXT_BUDGET.bentoTile.textLarge);
    else assertTextBudget("bentoTile.textSmall", tile.text, TEXT_BUDGET.bentoTile.textSmall);
    assertOneSentence("BentoGrid", tile.title, tile.text);
  }
  const doppelteKachel = ersteDoppelung(tiles.map((t) => t.title));
  if (doppelteKachel) {
    throw new Error(`Funktionsdetail: Kachel ‚${doppelteKachel}‘ steht in ${slug} doppelt – Titel ändern.`);
  }

  // (6) FAQ
  const faq = inhalt.faq.items;
  assertCount("FaqList", faq.length, TEXT_BUDGET.count.faq, "Fragen");
  for (const item of faq) {
    if (!item.q.trim().endsWith("?")) {
      throw new Error(`FaqList: Frage ‚${item.q}‘ endet nicht mit „?“ – als direkte Frage formulieren.`);
    }
    assertTextBudget("faq.question", item.q, TEXT_BUDGET.faq.question);
    assertTextBudget("faq.firstSentence", firstSentence(item.a), TEXT_BUDGET.faq.firstSentence);
    assertTextBudget("faq.answer", item.a, TEXT_BUDGET.faq.answer);
  }
  const doppelteFrage = ersteDoppelung(faq.map((f) => f.q));
  if (doppelteFrage) {
    throw new Error(`Funktionsdetail: Frage ‚${doppelteFrage}‘ steht in ${slug} doppelt – eine Frage entfernen.`);
  }

  // (7) Verwandte Funktionen
  assertCount("Verwandte Funktionen", inhalt.verwandt.length, TEXT_BUDGET.count.related, "Links");
  const doppelteVerwandte = ersteDoppelung(inhalt.verwandt);
  if (doppelteVerwandte) {
    throw new Error(`Funktionsdetail: verwandte Funktion ${doppelteVerwandte} steht in ${slug} doppelt – Eintrag entfernen.`);
  }
  const eigenerIndex = GRUPPEN_REIHENFOLGE.indexOf(gruppe.id);
  const verwandt = inhalt.verwandt.map((ziel): VerwandtEintrag => {
    if (ziel === slug) {
      throw new Error(`Funktionsdetail: ${slug} verweist in verwandt auf sich selbst – eigene Funktion entfernen.`);
    }
    const zielGruppe = gruppeVon(gruppen, ziel);
    const eintrag = zielGruppe?.details.find((d) => d.slug === ziel);
    if (!zielGruppe || !eintrag) {
      throw new Error(`Funktionsdetail: verwandte Funktion ${ziel} fehlt in lib/funktionen.ts – Slug prüfen.`);
    }
    if (Math.abs(GRUPPEN_REIHENFOLGE.indexOf(zielGruppe.id) - eigenerIndex) > 1) {
      throw new Error(
        `Funktionsdetail: verwandte Funktion ${ziel} liegt nicht in derselben oder einer benachbarten Gruppe – Auswahl ändern.`,
      );
    }
    const karte = cardScenes[ziel];
    if (!karte) {
      throw new Error(`Funktionsdetail: verwandte Funktion ${ziel} hat keine Karten-Szene – kopfVisuals in lib/scenes.ts ergänzen.`);
    }
    return {
      slug: eintrag.slug,
      name: eintrag.name,
      icon: eintrag.icon,
      benefit: eintrag.benefit,
      platforms: eintrag.platforms,
      href: eintrag.href,
      scene: karte.scene,
    };
  });

  // (8) Wortregeln über alle Textfelder außer der H1
  pruefeWortregeln(slug, textfelder(inhalt));

  const snippet = Object.hasOwn(SNIPPET_VARIANTE, slug) ? SNIPPET_VARIANTE[slug] : undefined;
  const path = `/funktionen/${slug}`;
  return {
    slug,
    name: funktion.name,
    gruppe: { id: gruppe.id, label: gruppe.label },
    kopf: {
      eyebrow: gruppe.label,
      h1: ziel.h1,
      kopfwort: inhalt.kopfwort,
      lead: inhalt.lead,
      secondary: inhalt.secondary,
      visual,
    },
    ablauf: inhalt.ablauf,
    ...(snippet ? { snippet } : {}),
    rollen: inhalt.rollen,
    kernpunkte: inhalt.kernpunkte,
    faq: inhalt.faq,
    verwandt,
    meta: { path, title: ziel.title, titleOhneMarke: ziel.titleOhneMarke, description: ziel.description },
  };
}

/** Baut die Detailseite aus einer injizierten Inhaltstabelle mit den Live-Daten (testbar ohne INHALTE). */
export function getFunktionsdetailAus(
  inhalte: Readonly<Record<string, FunktionsdetailInhalt>>,
  slug: string,
): Funktionsdetail {
  const funktion = getFunktion(slug);
  if (!funktion) {
    throw new Error(`Funktionsdetail: ${slug} ist keine Funktion aus lib/funktionen.ts – Slug prüfen.`);
  }
  const gruppen = getFunktionsgruppen();
  const inhalt = Object.hasOwn(inhalte, slug) ? inhalte[slug] : undefined;
  if (!inhalt) {
    const gruppe = gruppeVon(gruppen, slug)?.id ?? "{gruppe}";
    throw new Error(
      `Funktionsdetail: ${slug} hat kein Inhaltsmodul – Eintrag in lib/funktionsdetails/${gruppe}.ts ergänzen.`,
    );
  }
  const visual = Object.hasOwn(kopfVisuals, slug) ? kopfVisuals[slug] : undefined;
  if (!visual) {
    throw new Error(`Funktionsdetail: ${slug} hat kein Kopf-Visual – Eintrag in kopfVisuals (lib/scenes.ts) ergänzen.`);
  }
  return buildFunktionsdetail({
    inhalt,
    funktion,
    ziel: zielwerte(`/funktionen/${slug}`),
    gruppen,
    visual,
  });
}

/** Detailseite eines Slugs mit den Inhaltsmodulen aus INHALTE. */
export function getFunktionsdetail(slug: string): Funktionsdetail {
  return getFunktionsdetailAus(INHALTE, slug);
}
