/**
 * Inhalte des Vergleichs-Hubs `/vergleich` (08-UI-SPEC § 5.1, § 3.2, § 3.3, C5; D-02, D-09, D-12; SEO-03, SEO-09).
 *
 * Quellenregel: CraftOS-Werte nur aus lib/site.ts (`tarife`, `vertrag`, `site.trialDays`, `site.checkedAt`),
 * Wettbewerberwerte nur per Vorlage aus lib/wettbewerber/* (jede Zelle mit Beleg = Fakt des Datenmoduls, Quelle und
 * Abrufdatum). In dieser Datei stehen keine Preis- oder Tagesliterale (pricing-parity, vergleich-seiten).
 * Marktübersicht ohne Hervorhebung (C5), mit Pflichthinweis und Disclaimer wörtlich (§ 3.2).
 * Inhabervorgabe 22.10.2026 („Nur, was unterstützt wird, nicht, was nicht unterstützt wird“; geht der UI-SPEC vor):
 * keine verneinte CraftOS-Zelle, keine Kriterien, die CraftOS nicht hat, keine Nein-FAQ zu CraftOS
 * (DESIGN-V2.md § 17.6). `baueMarktuebersicht`, `UEBERSICHT_SPALTEN` und `monatlichKuendbar` sind die gemeinsamen
 * Helfer für Marktübersichten (auch lib/seiten/kleine-betriebe.ts, 08-11).
 * Tests: tests/vergleich-seiten.test.ts, tests/design-v2-budgets.test.ts, tests/pricing-parity.test.ts.
 */
import { ArrowLeftRight, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Cell, ComparisonColumn, ComparisonRow, ComparisonSource } from "@/components/v2/ComparisonTable";
import type { Step } from "@/components/v2/StepFlow";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { germanDate } from "@/lib/format";
import { ERLAUBTE_ANORDNUNGEN } from "@/lib/funktionsdetails";
import { NEGATIVSATZ, NUR_UNTERSTUETZT, VERNEINTE_ZELLE, pruefeNurUnterstuetzt } from "@/lib/nur-unterstuetzt";
import { site, tarife, vertrag } from "@/lib/site";
import {
  alterWarnung,
  craftnote,
  faktenVon,
  hero,
  plancraft,
  pruefeText,
  pruefeWettbewerber,
  standVon,
  tooltime,
  wettbewerber as alleWettbewerber,
} from "@/lib/wettbewerber";
import type { Fakt, Wettbewerber, WettbewerberSlug } from "@/lib/wettbewerber/types";

export const VERGLEICH_PFAD = "/vergleich" as const;

// ---------------------------------------------------------------------------
// Gemeinsamer Helfer: Marktübersicht (Zeilen = Anbieter, ohne highlight; C5, G3, § 3.2, § 3.3)
// ---------------------------------------------------------------------------

/** Einzige erlaubte Platzhalterform in Marktübersichten (§ 3.3). */
export const NICHT_ANGEGEBEN = "nicht angegeben";
/** Pflicht-Disclaimer für Marktübersichten (§ 3.2, wörtlich). */
export const MARKT_DISCLAIMER = "Die Nennung der Anbieter dient der Zuordnung; es besteht keine Geschäftsbeziehung.";

/** Leitlinien-Schutz zentral in lib/nur-unterstuetzt.ts (08-REVIEW ME-06); hier für bestehende Importe weitergereicht. */
export { NEGATIVSATZ, NUR_UNTERSTUETZT };

export interface MarktSpalte {
  key: string;
  label: string;
  /** CraftOS-Zelle aus lib/site.ts; nie verneint (Inhaber 22.10.2026). */
  craftos: Cell;
  /** Zelle des Anbieters mit Beleg (Fakt des Datenmoduls); ohne Beleg nur „nicht angegeben“. */
  wettbewerber: (w: Wettbewerber) => { wert: Cell; beleg?: Fakt<unknown> };
  /** Satz für den Pflichthinweis, wenn die Zellen einen Vorbehalt brauchen (z. B. Grundlaufzeit, HI-02). */
  hinweis?: (anbieter: readonly Wettbewerber[]) => string | undefined;
}

export interface MarktZeile {
  anbieter: string;
  slug: "craftos" | WettbewerberSlug;
  /** Beleg je Spalte (nur Wettbewerber und nur belegte Zellen). */
  belege: Record<string, Fakt<unknown>>;
}

export interface Marktuebersicht {
  caption: string;
  rowHeader: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  zeilen: MarktZeile[];
  note: string;
  sources: ComparisonSource[];
  disclaimer: string;
  /** Jüngstes Abrufdatum aller Anbieter, deutsch formatiert. */
  stand: string;
}

/** Anbieter in Tabellenfolge: alphabetisch ohne Groß-/Kleinschreibung (CraftOS steht davor). */
export function alphabetisch(anbieter: readonly Wettbewerber[]): Wettbewerber[] {
  return [...anbieter].sort((a, b) => a.name.localeCompare(b.name, "de", { sensitivity: "base" }));
}

/**
 * Baut eine Marktübersicht: CraftOS zuerst, dann die Anbieter alphabetisch; Spalten ohne Hervorhebung; jede
 * Wettbewerberzelle mit Beleg aus dem Datenmodul; Quellenliste mit jeder verwendeten Quelle genau einmal; Note =
 * Pflichthinweis § 3.2 wörtlich, Disclaimer für Marktübersichten. Wirft beim ersten Verstoß mit Abhilfe.
 */
export function baueMarktuebersicht(opts: {
  caption: string;
  spalten: readonly MarktSpalte[];
  anbieter?: readonly Wettbewerber[];
  /** Satz, der an den Pflichthinweis angehängt wird (z. B. Erläuterung einer Spalte, 08-UI-SPEC § 6). */
  noteZusatz?: string;
}): Marktuebersicht {
  const anbieter = alphabetisch(opts.anbieter ?? alleWettbewerber);
  const limits = TEXT_BUDGET.count.comparison;
  if (opts.spalten.length > limits.columns)
    throw new Error(`Marktübersicht: ${opts.spalten.length} Spalten – höchstens ${limits.columns}.`);
  if (anbieter.length + 1 > limits.rows)
    throw new Error(`Marktübersicht: ${anbieter.length + 1} Zeilen – höchstens ${limits.rows}.`);

  const pruefeZelle = (anbieterName: string, label: string, zelle: Cell) => {
    if (typeof zelle === "string" && charCount(zelle) > TEXT_BUDGET.comparison.cell)
      throw new Error(
        `Marktübersicht: Zelle „${zelle}“ (${anbieterName}, ${label}) über ${TEXT_BUDGET.comparison.cell} Zeichen – Zusatz in die Spaltenbeschriftung.`,
      );
  };

  const craftosCells: Record<string, Cell> = {};
  for (const s of opts.spalten) {
    if (s.craftos === false || (typeof s.craftos === "string" && VERNEINTE_ZELLE.test(s.craftos)))
      throw new Error(`Marktübersicht: Spalte „${s.label}“ verneint CraftOS – Spalte weglassen (${NUR_UNTERSTUETZT}).`);
    pruefeZelle("CraftOS", s.label, s.craftos);
    craftosCells[s.key] = s.craftos;
  }

  const rows: ComparisonRow[] = [{ label: "CraftOS", cells: craftosCells }];
  const zeilen: MarktZeile[] = [{ anbieter: "CraftOS", slug: "craftos", belege: {} }];
  const quellen = new Map<string, ComparisonSource>();

  for (const w of anbieter) {
    pruefeWettbewerber(w);
    alterWarnung(w);
    const fakten = new Set(faktenVon(w).map((f) => f.fakt));
    const cells: Record<string, Cell> = {};
    const belege: Record<string, Fakt<unknown>> = {};
    for (const s of opts.spalten) {
      const { wert, beleg } = s.wettbewerber(w);
      pruefeZelle(w.name, s.label, wert);
      if (!beleg) {
        if (wert !== NICHT_ANGEGEBEN)
          throw new Error(`Marktübersicht: ${w.name}, „${s.label}“ ohne Quelle – Beleg aus dem Datenmodul angeben oder „${NICHT_ANGEGEBEN}“ (U1).`);
      } else {
        if (!fakten.has(beleg))
          throw new Error(`Marktübersicht: ${w.name}, „${s.label}“: Quelle stammt nicht aus lib/wettbewerber/${w.slug}.ts (U1).`);
        belege[s.key] = beleg;
        const vorhanden = quellen.get(beleg.quelle.url);
        if (!vorhanden)
          quellen.set(beleg.quelle.url, {
            anbieter: w.name,
            label: beleg.quelle.label,
            url: beleg.quelle.url,
            abgerufenAm: beleg.abgerufenAm,
          });
        else if (beleg.abgerufenAm > vorhanden.abgerufenAm) vorhanden.abgerufenAm = beleg.abgerufenAm;
      }
      cells[s.key] = wert;
    }
    rows.push({ label: w.name, cells });
    zeilen.push({ anbieter: w.name, slug: w.slug, belege });
  }

  const stand = germanDate(anbieter.map(standVon).reduce((a, b) => (b > a ? b : a)));
  const zusaetze = [opts.noteZusatz, ...opts.spalten.map((s) => s.hinweis?.(anbieter))].filter((x): x is string => Boolean(x));
  return {
    caption: opts.caption,
    rowHeader: "Anbieter",
    columns: opts.spalten.map(({ key, label }) => ({ key, label })),
    rows,
    zeilen,
    note: `Angaben ohne Gewähr, Stand ${stand}, Quellen unter der Tabelle. Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand ${germanDate(site.checkedAt)}.${zusaetze.map((z) => ` ${z}`).join("")}`,
    sources: [...quellen.values()],
    disclaimer: MARKT_DISCLAIMER,
    stand,
  };
}

// ---------------------------------------------------------------------------
// Werte und Zellformate (§ 3.3; Werte per Vorlage)
// ---------------------------------------------------------------------------

const voll = tarife.find((t) => t.id === "voll")!;
/** Kürzeste CraftOS-Laufzeit (Monatsabo, `vertrag.monat`). */
const CRAFTOS_LAUFZEIT = "1 Monat";

const ZAHLWORT: Readonly<Record<number, string>> = { 2: "zwei", 3: "drei", 4: "vier", 5: "fünf", 6: "sechs", 12: "zwölf" };
/** Zahlwort für Fließtext; unbekannte Zahlen werfen statt geraten zu werden. */
export function zahlwort(n: number): string {
  const wort = ZAHLWORT[n];
  if (!wort) throw new Error(`Vergleich: keine Zahlwortform für ${n} – ZAHLWORT ergänzen.`);
  return wort;
}
export const gross = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** „a, b und c“ */
export const undListe = (teile: string[]) => (teile.length <= 1 ? teile.join("") : `${teile.slice(0, -1).join(", ")} und ${teile.at(-1)}`);

/** Abrechnungsmodell je Anbieter in Kurzform, belegt mit der Preisseite (`preise`). */
const ABRECHNUNG: Readonly<Record<WettbewerberSlug, (w: Wettbewerber) => string>> = {
  craftnote: (w) => {
    const je = w.preise.wert[0]?.enthalten;
    if (!je) throw new Error("Vergleich: Craftnote-Pakete ohne Angabe „enthalten“ – Datenmodul prüfen.");
    return `${je}, ${w.preise.wert.length} Pakete`;
  },
  hero: () => "Plan plus Lizenzen",
  plancraft: () => "Paket plus Zugänge",
  tooltime: () => "Paket nach Teamgröße",
};

/** Plantafel-Angaben der Anbieter als Satzteil für die FAQ; unbekannte Angaben werfen statt geraten zu werden. */
const PLANTAFEL_SATZ: Readonly<Record<string, string>> = {
  "In allen Plänen": "in allen Plänen",
  "Premium, sonst Modul": "im Paket Premium, sonst als Modul",
};
const PLANTAFEL_OHNE_PAKET = "ohne Paketangabe";

function plantafelZelle(w: Wettbewerber): { wert: Cell; beleg?: Fakt<unknown> } {
  const fakt = w.kriterien.plantafel;
  if (!fakt) return { wert: NICHT_ANGEGEBEN };
  if (fakt.wert === true) return { wert: `Ja, ${PLANTAFEL_OHNE_PAKET}`, beleg: fakt };
  return { wert: fakt.wert, beleg: fakt };
}

/** Vorbehalt der Grundlaufzeit (HERO-AGB: „Soweit in der Bestellung nichts Abweichendes vereinbart …“, HI-02). */
export const GRUNDLAUFZEIT_VORBEHALT = "soweit nicht abweichend vereinbart";

/**
 * Laufzeit laut Anbieter (§ 5.1): Grundlaufzeit als „12 Monate Grundlaufzeit“ (Vorbehalt im Pflichthinweis, HI-02),
 * sonst der Wert, Angaben aus den AGB mit Zusatz „laut AGB“.
 */
function laufzeitZelle(w: Wettbewerber): string {
  if (w.laufzeitArt === "grundlaufzeit") return `${w.laufzeit.wert} Grundlaufzeit`;
  return `${w.laufzeit.wert}${w.laufzeit.quelle.label === "AGB" ? " laut AGB" : ""}`;
}

/** Pflichthinweis zur Laufzeitspalte: Anbieter mit Grundlaufzeit samt Vorbehalt der AGB (HI-02). */
function laufzeitHinweis(anbieter: readonly Wettbewerber[]): string | undefined {
  const namen = anbieter.filter((w) => w.laufzeitArt === "grundlaufzeit").map((w) => w.name);
  return namen.length ? `${undListe(namen)}: Grundlaufzeit laut AGB, ${GRUNDLAUFZEIT_VORBEHALT}.` : undefined;
}

/** Spalten der Marktübersicht /vergleich; kleine Betriebe übernimmt Abrechnung, Laufzeit und Testphase (§ 6). */
export const UEBERSICHT_SPALTEN: readonly MarktSpalte[] = [
  {
    key: "abrechnung",
    label: "Abrechnung",
    craftos: `pro Person, ${tarife.length} Lizenzen`,
    wettbewerber: (w) => ({ wert: ABRECHNUNG[w.slug](w), beleg: w.preise }),
  },
  {
    // HI-02: „Laufzeit laut Anbieter“ statt „Kürzeste Laufzeit“ – die HERO-AGB nennen eine Grundlaufzeit.
    key: "laufzeit",
    label: "Laufzeit laut Anbieter",
    craftos: CRAFTOS_LAUFZEIT,
    wettbewerber: (w) => ({ wert: laufzeitZelle(w), beleg: w.laufzeit }),
    hinweis: laufzeitHinweis,
  },
  {
    key: "testphase",
    label: "Testphase",
    craftos: `${site.trialDays} Tage`,
    wettbewerber: (w) => ({ wert: `${w.testphaseTage.wert} Tage`, beleg: w.testphaseTage }),
  },
  { key: "plantafel", label: "Plantafel", craftos: `In ${voll.name}`, wettbewerber: plantafelZelle },
];

// ---------------------------------------------------------------------------
// Abschnitte, Flächen und feste Texte (UI-SPEC § 5.1, § 9; Anker-Konvention DESIGN-V2 § 17)
// ---------------------------------------------------------------------------

export const VERGLEICH_SECTION_IDS = ["ueberblick", "einzelvergleiche", "so-vergleichen", "faq"] as const;
export type VergleichSectionId = (typeof VERGLEICH_SECTION_IDS)[number];

export const VERGLEICH_SURFACES: Readonly<Record<"kopf" | VergleichSectionId | "cta", "dark" | "white" | "warm">> = {
  kopf: "dark",
  ueberblick: "white",
  einzelvergleiche: "warm",
  "so-vergleichen": "white",
  faq: "warm",
  cta: "dark",
};

export interface Vergleichskachel {
  title: string;
  text: string;
  href: string;
  size: "sm" | "md" | "wide";
  icon: LucideIcon;
}

/**
 * Einzelvergleiche (UI-SPEC § 5.1, Abschnitt 2). 4 × md ist nicht zulässig (ERLAUBTE_ANORDNUNGEN, keine
 * lückenlose Folge mit vier gleichen Kacheln); nächstliegende erlaubte Folge ohne lg: md·sm·sm·wide. Mit der Kachel
 * „Handwerkersoftware für kleine Betriebe“ (wide, Icon Users, 08-11) ergibt sich md·sm·sm·wide·wide.
 */
function einzelvergleichKacheln(): Vergleichskachel[] {
  const ttMonate = Number.parseInt(tooltime.laufzeit.wert, 10);
  if (!Number.isInteger(ttMonate)) throw new Error("Vergleich: ToolTime-Laufzeit ohne Monatszahl – Datenmodul prüfen.");
  return [
    {
      title: `${plancraft.name}-Alternative`,
      text: "Pakete mit Zusatzzugängen und Plantafel-Modul neben Voll- und App-Lizenz.",
      href: "/vergleich/plancraft-alternative",
      size: "md",
      icon: ArrowLeftRight,
    },
    {
      title: `${craftnote.name}-Alternative`,
      text: "Pakete pro Nutzer mit jährlicher Abrechnung neben Voll- und App-Lizenz.",
      href: "/vergleich/craftnote-alternative",
      size: "sm",
      icon: ArrowLeftRight,
    },
    {
      title: `${hero.name}-Alternative`,
      text: "Pläne mit Standard- und App-Lizenzen neben dem Preis pro Person.",
      href: "/vergleich/hero-alternative",
      size: "sm",
      icon: ArrowLeftRight,
    },
    {
      title: `${tooltime.name}-Alternative`,
      text: `Pakete nach Teamgröße mit ${ttMonate} Monaten Laufzeit neben dem Monatsabo.`,
      href: "/vergleich/tooltime-alternative",
      size: "wide",
      icon: ArrowLeftRight,
    },
    {
      title: "Handwerkersoftware für kleine Betriebe",
      text: `Belegte Kriterien und ${zahlwort(alleWettbewerber.length + 1)} Anbieter für Betriebe mit wenigen Personen im Überblick.`,
      href: "/vergleich/handwerkersoftware-kleine-betriebe",
      size: "wide",
      icon: Users,
    },
  ];
}

const SCHRITTE: Step[] = [
  { title: "Abläufe notieren", text: "Angebot, Planung, Baustelle, Rechnung: was muss die Software abdecken?" },
  { title: "Teamgröße rechnen", text: "Büro- und Baustellenzugänge für Ihre Personenzahl zusammenrechnen." },
  { title: "Laufzeit prüfen", text: "Laufzeit, Kündigungsfrist und Preise nach dem ersten Jahr vergleichen." },
  { title: "Mit Auftrag testen", text: "Einen echten Auftrag vom Angebot bis zur Rechnung durchspielen." },
];

/** CtaBand der Vergleichsseiten (08-UI-SPEC Copywriting Contract), auch für kleine Betriebe. */
export const VERGLEICHS_CTA = {
  title: "Testen Sie CraftOS mit Ihrem Auftrag",
  text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
  secondary: { label: "Preise ansehen", href: "/preise" },
} as const;

// ---------------------------------------------------------------------------
// FAQ aus den Moduldaten (Prompts #2/#3; Antworten ≤ 300, C3)
// ---------------------------------------------------------------------------

/** Antwortsatz „monatlich kündbar“ aus `laufzeit` der Module (FAQ /vergleich und kleine Betriebe). */
export function monatlichKuendbar(anbieter: readonly Wettbewerber[]): string {
  const monatlich = ["CraftOS", ...anbieter.filter((w) => w.laufzeit.wert === CRAFTOS_LAUFZEIT).map((w) => w.name)];
  const gruppen = new Map<string, { namen: string[]; agb: boolean; wert: string; grund: boolean }>();
  for (const w of anbieter.filter((x) => x.laufzeit.wert !== CRAFTOS_LAUFZEIT)) {
    const agb = w.laufzeit.quelle.label === "AGB";
    const grund = w.laufzeitArt === "grundlaufzeit";
    const schluessel = `${w.laufzeit.wert}|${agb}|${grund}`;
    const g = gruppen.get(schluessel) ?? { namen: [], agb, wert: w.laufzeit.wert, grund };
    g.namen.push(w.name);
    gruppen.set(schluessel, g);
  }
  const kopf = `Von den ${zahlwort(anbieter.length + 1)} verglichenen Anbietern ${monatlich.length === 1 ? "ist" : "sind"} ${undListe(monatlich)} ${vertrag.monat}`;
  // HI-02: Grundlaufzeit mit Vorbehalt der AGB, sonst „Laufzeit“ – nie „Mindestlaufzeit“ ohne Beleg.
  const rest = [...gruppen.values()].map(
    (g) =>
      `${undListe(g.namen)} ${g.namen.length === 1 ? "nennt" : "nennen"}${g.agb ? " laut AGB" : ""} ${g.wert} ${
        g.grund ? `Grundlaufzeit, ${GRUNDLAUFZEIT_VORBEHALT}` : "Laufzeit"
      }`,
  );
  return rest.length ? `${kopf}; ${rest.join(", ")}.` : `${kopf}.`;
}

function plantafelAntwort(anbieter: readonly Wettbewerber[]): string {
  const mit = anbieter.filter((w) => w.kriterien.plantafel && w.kriterien.plantafel.wert !== false);
  const genannt: string[] = [`CraftOS in der ${voll.name}`];
  const ohnePaket: string[] = [];
  for (const w of mit) {
    const wert = w.kriterien.plantafel!.wert;
    if (wert === true) ohnePaket.push(w.name);
    else {
      const satz = PLANTAFEL_SATZ[String(wert)];
      if (!satz) throw new Error(`Vergleich: Plantafel-Angabe „${String(wert)}“ (${w.name}) ohne Satzform – PLANTAFEL_SATZ ergänzen.`);
      genannt.push(`${w.name} ${satz}`);
    }
  }
  const gesamt = anbieter.length + 1;
  const n = mit.length + 1;
  const start =
    n === gesamt
      ? `Alle ${zahlwort(gesamt)} Anbieter nennen eine Plantafel`
      : `${gross(zahlwort(n))} der ${zahlwort(gesamt)} Anbieter nennen eine Plantafel`;
  return `${start}: ${genannt.join(", ")}${ohnePaket.length ? `; ${undListe(ohnePaket)} ${PLANTAFEL_OHNE_PAKET}` : ""}.`;
}

// ---------------------------------------------------------------------------
// Seiteninhalt
// ---------------------------------------------------------------------------

export interface VergleichInhalt {
  kopf: {
    eyebrow: string;
    kopfwort: string;
    answer: string;
    stand: string;
    secondary: { label: string; href: string };
  };
  sections: Record<VergleichSectionId, { title: string; lead: string }>;
  ueberblick: { tabelle: Marktuebersicht };
  einzelvergleiche: { kacheln: Vergleichskachel[] };
  schritte: Step[];
  faq: { q: string; a: string }[];
  cta: typeof VERGLEICHS_CTA;
}

function pruefeAntwort(feld: string, text: string, maxSaetze = 2) {
  const n = charCount(text);
  if (n > TEXT_BUDGET.answer) throw new Error(`Vergleich: ${feld} hat ${n} von ${TEXT_BUDGET.answer} Zeichen – Antwort kürzen.`);
  if (sentenceCount(text) > maxSaetze) throw new Error(`Vergleich: ${feld} hat mehr als ${maxSaetze} Sätze.`);
}

/** Baut und prüft den Hub-Inhalt; `anbieter` nur für Fixture-Tests abweichend. */
export function baueVergleich(anbieter: readonly Wettbewerber[] = alleWettbewerber): VergleichInhalt {
  const sortiert = alphabetisch(anbieter);
  const tabelle = baueMarktuebersicht({
    caption: "Handwerkersoftware im Überblick",
    spalten: UEBERSICHT_SPALTEN,
    anbieter: sortiert,
  });

  const inhalt: VergleichInhalt = {
    kopf: {
      eyebrow: "Vergleich",
      kopfwort: "Handwerkersoftware",
      answer: `Handwerkersoftware unterscheidet sich vor allem in Abrechnung, Laufzeit und Plantafel: CraftOS rechnet pro Person ab und ist ${vertrag.monat}, plancraft und ToolTime arbeiten mit Paketen, Craftnote mit Paketen pro Nutzer und HERO mit Plänen und Lizenzen.`,
      stand: `Anbieterangaben Stand ${tabelle.stand}, Quellen unter der Tabelle`,
      secondary: { label: "Zur Übersicht", href: "#ueberblick" },
    },
    sections: {
      ueberblick: {
        title: `${gross(zahlwort(sortiert.length + 1))} Anbieter im Überblick`,
        lead: "Abrechnung, Laufzeit, Testphase und Plantafel laut den Seiten der Anbieter, mit Quelle je Zeile.",
      },
      einzelvergleiche: {
        title: "Einzelvergleiche mit Quellen",
        lead: "Jeder Vergleich stellt CraftOS einem Anbieter mit Preisen, Laufzeiten und Stärken gegenüber.",
      },
      "so-vergleichen": {
        title: "Wie vergleichen Sie Handwerkersoftware?",
        lead: "Notieren Sie Ihre Abläufe, rechnen Sie Preise für Ihre Teamgröße, prüfen Sie Laufzeit und Kündigungsfrist und testen Sie mit einem echten Auftrag.",
      },
      faq: {
        // UI-SPEC § 9 nennt „… zum Handwerkersoftware-Vergleich“; in der 5fr-Spalte ab 1024 px trennte die
        // Silbentrennung „Handwerkersoft-ware“ (Sichtprüfung 08-10). Kopfwort steht in H1 und Kopfantwort.
        title: "Häufige Fragen zum Vergleich",
        lead: "Kurze Antworten mit Quelle und Stand der Anbieterangaben.",
      },
    },
    ueberblick: { tabelle },
    einzelvergleiche: { kacheln: einzelvergleichKacheln() },
    schritte: SCHRITTE,
    faq: [
      {
        q: "Welche Handwerkersoftware passt zu einem kleinen Betrieb?",
        a: "Eine Software, die Angebote, Rechnungen mit E-Rechnung, Einsatzplanung und eine Mobile-App fürs Team abdeckt und für Ihre Personenzahl bezahlbar bleibt; vergleichen Sie dazu Laufzeit, Testphase und den Preis je weiterer Person.",
      },
      { q: "Welche Handwerkersoftware ist monatlich kündbar?", a: monatlichKuendbar(sortiert) },
      { q: "Welche Handwerkersoftware hat eine Plantafel?", a: plantafelAntwort(sortiert) },
      {
        q: "Woher stammen die Angaben im Vergleich?",
        a: "Aus den Preisseiten, Produktseiten und AGB der Anbieter, jeweils mit Quelle und Abrufdatum; CraftOS-Angaben stammen aus der Preisliste und dem Produktregister.",
      },
    ],
    cta: VERGLEICHS_CTA,
  };

  // Antwort zuerst (D-09, C3): Kopf, Frage-H2 und FAQ ≤ 300.
  pruefeAntwort("Kopfantwort", inhalt.kopf.answer);
  pruefeAntwort("Antwort „so-vergleichen“", inhalt.sections["so-vergleichen"].lead);
  for (const f of inhalt.faq) pruefeAntwort(`FAQ „${f.q}“`, f.a);

  // Einzelvergleiche: erlaubte Anordnung (07-UI-SPEC Abschnitt 4).
  const anordnung = inhalt.einzelvergleiche.kacheln.map((k) => k.size).join("·");
  if (!ERLAUBTE_ANORDNUNGEN.includes(anordnung))
    throw new Error(`Vergleich: Anordnung ${anordnung} ist nicht zulässig – Größenfolge laut ERLAUBTE_ANORDNUNGEN wählen.`);

  // UWG-Wortliste (U7, inkl. Superlativen) und Negativsätze über alle Seitentexte (ohne Datenmodul-Belege).
  const texte: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") texte.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk([inhalt.kopf, inhalt.sections, tabelle.rows, tabelle.note, tabelle.disclaimer, inhalt.schritte, inhalt.faq, inhalt.cta]);
  walk(inhalt.einzelvergleiche.kacheln.map(({ title, text }) => ({ title, text })));
  for (const text of texte) pruefeText(text);
  // Inhabervorgabe 22.10.2026: zentraler Leitlinien-Schutz (Negativsätze, Nein-FAQ, verneinte CraftOS-Zellen).
  pruefeNurUnterstuetzt(
    { ...inhalt, einzelvergleiche: { kacheln: inhalt.einzelvergleiche.kacheln.map(({ title, text }) => ({ title, text })) } },
    { kontext: "Vergleich" },
  );
  return inhalt;
}

/** Inhalt der Seite /vergleich (geprüft beim Laden). */
export const vergleich: VergleichInhalt = baueVergleich();
