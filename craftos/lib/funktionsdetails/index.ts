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
  ZUSATZ_IDS,
  getFunktionsgruppen,
  type Funktionsgruppe,
} from "@/lib/funktionsgruppen";
import { zielwerte, type Zielwerte } from "@/lib/seo-meta";
import { cardScenes, kopfVisuals, type FrameScene, type KopfVisual } from "@/lib/scenes";
import {
  PANEL_BUDGET,
  ROLLEN,
  type Abschnittskopf,
  type Funktionsdetail,
  type FunktionsdetailInhalt,
  type SnippetVariante,
  type VerwandtEintrag,
} from "./types";

// zielwerte() und Zielwerte liegen seit 08-01 in lib/seo-meta.ts (metaFor); Re-Export für bestehende Aufrufer.
export { zielwerte, type Zielwerte };
import { angebotInhalte } from "./angebot";
import { planungInhalte } from "./planung";
import { baustelleInhalte } from "./baustelle";
import { rechnungInhalte } from "./rechnung";
import { teamInhalte } from "./team";
import { buchhaltungInhalte } from "./buchhaltung";

/**
 * Builder der Funktionsdetailseiten (Phase 7, 07-UI-SPEC „Vorlage Detailseite“; D-02, D-03, D-04, D-19, D-23).
 *
 * Server-only: Keyword-Map (138 KB), Register und Inhalte gelangen nie ins Client-Bundle (T-07-10).
 * `buildFunktionsdetail` ist rein und mit Fremddaten testbar; `getFunktionsdetail` verbindet die
 * Inhaltsmodule mit lib/funktionen.ts, der Keyword-Map, dem Gruppenmodell und den Kopf-Visuals.
 * Jeder Regelverstoß ist ein Entwicklerfehler und bricht Test und Build mit dem 07-UI-SPEC-Fehlertext ab.
 */

/**
 * Inhaltsmodule je Slug aus den Gruppenmodulen (lib/funktionsdetails/{gruppe}.ts): alle 22 Detailfunktionen in
 * der Gruppenreihenfolge Angebot, Planung, Baustelle (07-05), Rechnung, Buchhaltung, Team (07-06).
 */
export const INHALTE: Readonly<Record<string, FunktionsdetailInhalt>> = {
  ...angebotInhalte,
  ...planungInhalte,
  ...baustelleInhalte,
  ...rechnungInhalte,
  ...buchhaltungInhalte,
  ...teamInhalte,
};

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

/**
 * Textfeld für die Wortregeln; `frageMitNein` = FAQ-Frage, deren Antwort mit „Nein“ beginnt; `suchbegriff` = Title
 * oder Description aus der Keyword-Map, in denen „Bauphasen“ als Suchbegriff zulässig ist (07-UI-SPEC B3).
 */
interface Textfeld {
  text: string;
  frageMitNein?: true;
  suchbegriff?: true;
}

/** B3: „Bauphasen“ nur in Title/Description als Suchbegriff, sonst „Arbeitsabschnitte“. */
const SUCHBEGRIFF_ERLAUBT: readonly string[] = ["Bauphase"];

/** Alle Textfelder außer der H1 (die H1 kommt aus der Keyword-Map). */
function textfelder(inhalt: FunktionsdetailInhalt): Textfeld[] {
  const abschnitte = [inhalt.ablauf, inhalt.rollen, inhalt.kernpunkte, inhalt.faq];
  const texte = [
    inhalt.lead,
    inhalt.secondary.label,
    ...abschnitte.flatMap((a) => [a.title, a.lead]),
    ...inhalt.ablauf.steps.flatMap((s) => [s.title, s.text]),
    ...inhalt.rollen.panels.flatMap((p) => [p.satz, p.kundenHinweis ?? "", ...p.rollen.map((r) => r.zusatz ?? "")]),
    ...inhalt.kernpunkte.tiles.flatMap((t) => [t.title, t.text]),
  ];
  return [
    ...texte.map((text): Textfeld => ({ text })),
    ...inhalt.faq.items.flatMap((f): Textfeld[] => [
      /^Nein\b/.test(f.a.trim()) ? { text: f.q, frageMitNein: true } : { text: f.q },
      { text: f.a },
    ]),
  ];
}

/**
 * Wortregeln (Pitfall 7/8, D-20, D-23): verbotene Überclaims nie; „automatisch“ nur mit „auf Wunsch“ im selben
 * Feld. Ausnahme: eine FAQ-Frage darf „automatisch“ enthalten, wenn ihre Antwort mit „Nein“ beginnt
 * (z. B. „Werden Maße automatisch gemessen?“); die Antwort selbst unterliegt weiter der Regel.
 */
function pruefeWortregeln(slug: string, felder: readonly Textfeld[]): void {
  for (const { text, frageMitNein, suchbegriff } of felder) {
    const klein = text.toLowerCase();
    for (const wort of VERBOTENE_WOERTER) {
      if (suchbegriff && SUCHBEGRIFF_ERLAUBT.includes(wort)) continue;
      if (klein.includes(wort.toLowerCase())) {
        throw new Error(`Funktionsdetail: ${slug} enthält ‚${wort}‘ – Formulierung laut 07-UI-SPEC ändern.`);
      }
    }
    if (klein.includes("automatisch") && !klein.includes("auf wunsch") && !frageMitNein) {
      throw new Error(`Funktionsdetail: ${slug} enthält ‚automatisch‘ – Formulierung laut 07-UI-SPEC ändern.`);
    }
  }
}

const PLATTFORM_REIHENFOLGE: readonly ProductPlatform[] = ["web", "mobile"];

/**
 * Kachel-Links (WR-05): /funktionen/{slug} nur auf eine bekannte andere Detailseite, /hilfe/{slug} im Slug-Format
 * (Existenz der Datei prüft tests/funktionsdetails.test.ts, der Builder nutzt kein fs), sonst eine Seite der ersten
 * Ebene wie /app oder /gobd (Existenz in der Sitemap prüft derselbe Test).
 */
function pruefeKachelLink(slug: string, titel: string, href: string, gruppen: readonly Funktionsgruppe[]): void {
  const funktion = /^\/funktionen\/([a-z0-9-]+)$/.exec(href)?.[1];
  const gueltig = funktion
    ? funktion !== slug && gruppeVon(gruppen, funktion) !== undefined
    : /^\/hilfe\/[a-z0-9-]+$/.test(href) || /^\/[a-z0-9-]+$/.test(href);
  if (!gueltig) {
    throw new Error(
      `Funktionsdetail: Kachel ‚${titel}‘ in ${slug} verlinkt ${href} – nur andere Detailseiten, /hilfe/{slug} oder Seiten wie /app und /gobd.`,
    );
  }
}

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
    if (panel.kundenHinweis !== undefined) {
      // WR-03 (B13): Kunden stehen nie unter dem Lizenzbadge, sondern in einem eigenen Hinweis ohne Lizenz.
      if (panel.platform !== "web") {
        throw new Error(`Funktionsdetail: kundenHinweis im Panel ${panel.platform} von ${slug} – nur im Web-Panel zulässig.`);
      }
      assertTextBudget("plattformRollen.kundenHinweis", panel.kundenHinweis, PANEL_BUDGET.kundenHinweis);
      assertOneSentence("PlattformRollen", `${slug} (Kundenhinweis)`, panel.kundenHinweis);
      if (!panel.kundenHinweis.includes("keine Lizenz")) {
        throw new Error(`Funktionsdetail: kundenHinweis von ${slug} nennt „keine Lizenz“ nicht – Kunden brauchen keine Lizenz.`);
      }
    }
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
  // Vergleich über die Kurzform `screen`, damit auch eine kopierte oder abgeleitete Kopf-Szene auffällt (WR-05).
  const kopfScreens = new Set(kopfSzenen(visual).map((szene) => szene.screen));
  for (const tile of tiles) {
    if (tile.size === "lg" && tile.visual.kind !== "phone") {
      throw new Error(`Funktionsdetail: lg-Kachel ‚${tile.title}‘ braucht ein Phone-Visual – Szene angeben oder Größe ändern.`);
    }
    if (tile.visual.kind === "phone" && kopfScreens.has(tile.visual.scene.screen)) {
      throw new Error(`Funktionsdetail: Kachel ‚${tile.title}‘ zeigt die Kopf-Szene – eine andere Szene wählen.`);
    }
    if (tile.zusatz !== undefined && !ZUSATZ_IDS.includes(tile.zusatz)) {
      throw new Error(
        `Funktionsdetail: Zusatz ${tile.zusatz} an Kachel ‚${tile.title}‘ ist unbekannt – id aus ZUSATZ_IDS (lib/funktionsgruppen.ts) wählen.`,
      );
    }
    if (tile.href !== undefined) pruefeKachelLink(slug, tile.title, tile.href, gruppen);
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
      rahmen: karte.kind,
    };
  });

  // (8) Wortregeln über alle Textfelder, Kopfwort, Zielwerte der Keyword-Map und die Nutzensätze der verwandten
  // Karten (WR-05); Title und Description dürfen „Bauphasen“ als Suchbegriff enthalten (B3).
  pruefeWortregeln(slug, [
    ...textfelder(inhalt),
    { text: inhalt.kopfwort },
    { text: ziel.h1 },
    { text: ziel.title, suchbegriff: true },
    { text: ziel.description, suchbegriff: true },
    ...verwandt.map((v): Textfeld => ({ text: v.benefit })),
  ]);

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
