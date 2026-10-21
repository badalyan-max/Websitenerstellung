import "server-only";
import {
  Calculator,
  CalendarDays,
  Camera,
  ClipboardCheck,
  Contact,
  FileText,
  HardHat,
  Languages,
  MessagesSquare,
  NotebookPen,
  Receipt,
  ScanBarcode,
  Signature,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  TEXT_BUDGET,
  assertCount,
  assertOneSentence,
  assertTextBudget,
  sentenceCount,
} from "@/components/v2/budgets";
import { funktionen, type Funktion, type ProductPlatform } from "./funktionen";
import { getProductRegister, mobileLocales } from "./product-register";

/**
 * Gruppenmodell der Funktionen (Phase 6, D-05, D-07, D-08, D-09, D-15, D-18).
 *
 * Einzige Quelle für Mega-Menü, Startseite und /funktionen: sechs Arbeitsablauf-Gruppen mit allen
 * Live-Funktionen – den 22 Detailseiten aus lib/funktionen.ts und den 8 beworbenen Zusatzfunktionen
 * (`liveExtras` mit `advertised: true`) aus dem Produktregister. Name, Icon, Plattformen und
 * Nutzensatz der Detailfunktionen werden nie doppelt gepflegt, sondern aus `input.funktionen`
 * übernommen; Plattformen der Zusatzfunktionen kommen immer aus dem Registereintrag.
 * Ein nicht zugeordneter Registereintrag oder eine leere Gruppe ist ein Entwicklerfehler und bricht
 * Test und Build mit dem Fehlertext aus dem 06-UI-SPEC ab.
 */

export type GruppenId = "angebot" | "planung" | "baustelle" | "rechnung" | "buchhaltung" | "team";

export interface DetailEintrag {
  kind: "detail";
  slug: string;
  name: string;
  icon: LucideIcon;
  benefit: string;
  platforms: ProductPlatform[];
  href: string;
}

export interface ZusatzZiel {
  href: string;
  /** "seite" (07-UI-SPEC F5, D-21): eigene Seite wie /app, Hinweis wie bei "funktion". */
  kind: "hilfe" | "funktion" | "seite";
  label: string;
}

export interface ZusatzEintrag {
  kind: "zusatz";
  id: string;
  registerName: string;
  name: string;
  icon: LucideIcon;
  benefit: string;
  platforms: ProductPlatform[];
  target?: ZusatzZiel;
}

export interface Funktionsgruppe {
  id: GruppenId;
  label: string;
  icon: LucideIcon;
  description: string;
  anchorHref: string;
  heading: string;
  lead: string;
  details: DetailEintrag[];
  extras: ZusatzEintrag[];
}

export const GRUPPEN_REIHENFOLGE: readonly GruppenId[] = [
  "angebot",
  "planung",
  "baustelle",
  "rechnung",
  "buchhaltung",
  "team",
];

interface GruppenKopf {
  label: string;
  icon: LucideIcon;
  /** Kurzbeschreibung im Mega-Menü (≤ 60 Zeichen, kein Satzende-Punkt) */
  description: string;
  /** H2 des Gruppenabschnitts auf /funktionen (≤ 60 Zeichen) */
  heading: string;
  /** Lead des Gruppenabschnitts (genau ein Satz, ≤ 140 Zeichen) */
  lead: string;
}

const GRUPPEN: Record<GruppenId, GruppenKopf> = {
  angebot: {
    label: "Angebot",
    icon: FileText,
    description: "Kalkulieren, Mengen übernehmen, online unterschreiben",
    heading: "Vom Aufmaß zum unterschriebenen Angebot",
    lead: "Maße auf der Baustelle erfassen, im Büro ins Angebot übernehmen und online unterschreiben lassen.",
  },
  planung: {
    label: "Planung",
    icon: CalendarDays,
    description: "Einsätze, Projekte und Bauphasen planen",
    heading: "Einsätze, Projekte und Bauphasen planen",
    lead: "Das Büro plant Team und Termine, die Mobile-App zeigt jedem Teammitglied seine Einsätze.",
  },
  baustelle: {
    label: "Baustelle",
    icon: HardHat,
    description: "Zeiten, Fotos, Mängel und Material vor Ort erfassen",
    heading: "Zeiten, Fotos und Mängel direkt vor Ort erfassen",
    lead: "Was auf der Baustelle passiert, landet über die Mobile-App im richtigen Projekt.",
  },
  rechnung: {
    label: "Rechnung",
    icon: Receipt,
    description: "Rechnungen, E-Rechnung und Zahlungserinnerungen",
    heading: "Rechnungen schreiben und offene Beträge verfolgen",
    lead: "Aus Angeboten und Berichten werden prüfbare Rechnungen, E-Rechnungen und bei Bedarf Zahlungserinnerungen.",
  },
  buchhaltung: {
    label: "Buchhaltung",
    icon: Calculator,
    description: "Belege, Bankumsätze, DATEV-Export und Kennzahlen",
    heading: "Belege, Zahlen und DATEV-Export an einem Ort",
    lead: "Belege prüfen, Bankumsätze zuordnen und Daten für die Steuerberatung vorbereiten.",
  },
  team: {
    label: "Team",
    icon: Users,
    description: "Zugänge, Rechte und Nachrichten im Team",
    heading: "Zugänge, Rechte und Kommunikation im Team",
    lead: "Jedes Teammitglied erhält den passenden Zugang und klärt Rückfragen im Projekt-Chat.",
  },
};

/*
 * Zuordnung der Grenzfälle (Ermessen laut 06-CONTEXT, im UI-SPEC festgehalten):
 * - Dashboard → Buchhaltung: Es zeigt Kennzahlen, offene Beträge und den Umsatzverlauf; Hauptkeyword
 *   der Seite ist „kennzahlen handwerksbetrieb“.
 * - Kundenportal → Angebot: Kunden nehmen Angebote im Portal an oder lehnen sie ab.
 * - Projekt-Chat → Team: Es geht um Kommunikation im Team und mit dem Projekt.
 * - Datenübernahme → Team: Sie gehört zur Einrichtung des Betriebs.
 * - Craft AI steht in keiner Gruppe, sondern nur als Link in der Fußleiste des Mega-Menüs (D-15).
 *
 * Phase 7 (D-07, 07-RESEARCH „Zuordnung“): Die sechs Zusatzfunktionen mit eigener Detailseite wandern
 * in die Detailzuordnung – GAEB → Angebot, Terminplanung → Planung, Mängelmanagement → Baustelle,
 * Mahnwesen → Rechnung, Bankabgleich → Buchhaltung, Datenübernahme → Team. Die 8 verbleibenden
 * Zusatzfunktionen behalten ihre Gruppe (Angebot 3, Baustelle 3, Team 2) und verweisen auf die
 * Detailseite, die sie beschreibt; „21 Sprachen“ verweist auf die Seite /app (D-21, kind „seite“).
 * Rechnung, Planung und Buchhaltung haben danach keine Zusatzfunktion mehr (keine Liste, kein Platzhalter).
 */

/** Detailfunktionen (Slugs aus lib/funktionen.ts) je Gruppe; Reihenfolge = Anzeigereihenfolge. */
const DETAIL_ZUORDNUNG: Record<GruppenId, readonly string[]> = {
  angebot: ["angebote", "aufmass", "kundenportal", "gaeb"],
  planung: ["plantafel", "projektverwaltung", "arbeitsanweisungen", "terminplanung"],
  baustelle: ["zeiterfassung", "baudokumentation", "lager", "maengelmanagement"],
  rechnung: ["rechnungen", "e-rechnung", "mahnwesen"],
  buchhaltung: ["buchhaltung", "eingangsrechnungen", "nachkalkulation", "dashboard", "bankabgleich"],
  team: ["team", "datenuebernahme"],
};

const sprachenName = `${mobileLocales.length} Sprachen in der Mobile-App`;

/**
 * Exakter Registername (`liveExtras[].name` in lib/product-register.ts) → stabile id.
 * Das Register hat kein id-Feld; der Sprachen-Eintrag entsteht dort wie hier aus mobileLocales.length.
 * „Vorhersagen“ ist nicht beworben und hat deshalb keine id.
 */
export const REGISTER_IDS: Record<string, string> = {
  "Angebotsunterschrift online": "angebotsunterschrift",
  Besichtigung: "besichtigung",
  "Kunden in der App": "kunden-app",
  "Abnahme und Teilabnahme": "abnahme",
  Bautagesbericht: "bautagesbericht",
  "Lager-Scan und Wareneingang": "lager-scan",
  "Projekt-Chat und Nachrichten": "projekt-chat",
  [sprachenName]: "sprachen",
};

interface ZusatzDefinition {
  gruppe: GruppenId;
  /** Anzeigename ≤ 32 Zeichen; weicht nur dort vom Registernamen ab, wo dieser zu lang ist */
  name: string;
  icon: LucideIcon;
  /** Genau ein Satz ≤ 100 Zeichen, belegt durch Register- und Releasebelege (06-UI-SPEC) */
  benefit: string;
  /**
   * Linkziel nur auf bestehende Routen der Sitemap; ohne Ziel kein Link und kein Platzhalter (D-09).
   * Seit Phase 7 hat jede Zusatzfunktion ein Ziel: die Detailseite, die sie beschreibt (label = Name der
   * Zielfunktion), bzw. /app für die App-Sprachen (D-21).
   */
  target?: ZusatzZiel;
}

/** Zusatzfunktionen je id; Reihenfolge innerhalb einer Gruppe = Reihenfolge dieser Tabelle. */
const ZUSATZ: Record<string, ZusatzDefinition> = {
  angebotsunterschrift: {
    gruppe: "angebot",
    name: "Angebotsunterschrift online",
    icon: Signature,
    benefit: "Kunden nehmen Ihr Angebot online an und unterschreiben es oder senden eine Ablehnung.",
    target: { href: "/funktionen/angebote", kind: "funktion", label: "Angebote & Kalkulation" },
  },
  besichtigung: {
    gruppe: "angebot",
    name: "Besichtigung",
    icon: Camera,
    benefit: "Fotos, Videos und Sprachnotizen der Besichtigung gesammelt im Projekt ablegen.",
    target: { href: "/funktionen/aufmass", kind: "funktion", label: "Aufmaß" },
  },
  "kunden-app": {
    gruppe: "angebot",
    name: "Kunden in der App",
    icon: Contact,
    benefit: "Kundendaten unterwegs in der Mobile-App nachschlagen und bearbeiten.",
    target: { href: "/funktionen/projektverwaltung", kind: "funktion", label: "Projektverwaltung" },
  },
  abnahme: {
    gruppe: "baustelle",
    name: "Abnahme und Teilabnahme",
    icon: ClipboardCheck,
    benefit: "Abnahmen und Teilabnahmen vor Ort protokollieren und unterschreiben lassen.",
    target: { href: "/funktionen/baudokumentation", kind: "funktion", label: "Baudokumentation" },
  },
  bautagesbericht: {
    gruppe: "baustelle",
    name: "Bautagesbericht",
    icon: NotebookPen,
    benefit: "Leistungen, Personal und weitere Angaben des Tages in der Mobile-App als Bericht festhalten.",
    target: { href: "/funktionen/baudokumentation", kind: "funktion", label: "Baudokumentation" },
  },
  "lager-scan": {
    gruppe: "baustelle",
    name: "Lager-Scan und Wareneingang",
    icon: ScanBarcode,
    benefit: "Artikel per Barcode scannen und Wareneingänge am Lager buchen.",
    target: { href: "/funktionen/lager", kind: "funktion", label: "Lager & Material" },
  },
  "projekt-chat": {
    gruppe: "team",
    name: "Projekt-Chat und Nachrichten",
    icon: MessagesSquare,
    benefit: "Rückfragen im Projekt-Chat klären und Direktnachrichten im Posteingang der App lesen.",
    target: { href: "/funktionen/projektverwaltung", kind: "funktion", label: "Projektverwaltung" },
  },
  sprachen: {
    gruppe: "team",
    name: sprachenName,
    icon: Languages,
    benefit: `Mitarbeitende nutzen die Mobile-App in einer von ${mobileLocales.length} Sprachen.`,
    target: { href: "/app", kind: "seite", label: "Mobile-App" },
  },
};

/** Schlüssel aller Zusatzfunktionen; der Paritätstest prüft sie gegen die beworbenen Registereinträge. */
export const ZUSATZ_IDS: readonly string[] = Object.keys(ZUSATZ);

/** Fußleiste des Mega-Menüs „Funktionen“ (Reihenfolge verbindlich, Craft AI nur hier – D-15). */
export const menuFooterLinks: readonly { label: string; href: string }[] = [
  { label: "Alle Funktionen", href: "/funktionen" },
  { label: "Mobile-App", href: "/app" },
  { label: "Craft AI", href: "/craft-ai" },
  { label: "GoBD & Nachvollziehbarkeit", href: "/gobd" },
  { label: "Warum CraftOS?", href: "/vergleich" },
];

interface RegisterEintrag {
  name: string;
  platforms: ProductPlatform[];
  advertised: boolean;
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

function pruefeKopf(id: GruppenId, kopf: GruppenKopf): void {
  assertTextBudget("menuGroup.description", kopf.description, TEXT_BUDGET.menuGroup.description);
  if (sentenceCount(kopf.description) !== 0) {
    throw new Error(`Funktionsgruppen: Kurzbeschreibung der Gruppe ${id} endet mit einem Satzzeichen – ohne Punkt schreiben.`);
  }
  assertTextBudget("sectionHeader.title", kopf.heading, TEXT_BUDGET.sectionHeader.title);
  assertTextBudget("sectionHeader.lead", kopf.lead, TEXT_BUDGET.sectionHeader.lead);
  assertOneSentence("SectionHeader", `Gruppe ${id}`, kopf.lead);
}

/**
 * Baut die sechs Gruppen aus übergebenen Daten (rein, mit Fremddaten testbar). Detailwerte stammen
 * ausschließlich aus `input.funktionen`, Plattformen der Zusatzfunktionen aus `input.liveExtras`.
 */
export function buildFunktionsgruppen(input: {
  funktionen: Funktion[];
  liveExtras: RegisterEintrag[];
}): Funktionsgruppe[] {
  // Doppelte Einträge ergäben doppelte Menülinks, ItemList-Einträge und React-Keys (06-REVIEW IN-04).
  const doppelteZuordnung = ersteDoppelung(GRUPPEN_REIHENFOLGE.flatMap((id) => DETAIL_ZUORDNUNG[id]));
  if (doppelteZuordnung) {
    throw new Error(
      `Funktionsgruppen: Funktion ${doppelteZuordnung} ist mehreren Gruppen zugeordnet – Zuordnung in lib/funktionsgruppen.ts korrigieren.`,
    );
  }
  const doppelterSlug = ersteDoppelung(input.funktionen.map((f) => f.slug));
  if (doppelterSlug) {
    throw new Error(
      `Funktionsgruppen: Funktion ${doppelterSlug} steht mehrfach in lib/funktionen.ts – doppelten Eintrag entfernen.`,
    );
  }
  const zugeordnet = new Set(GRUPPEN_REIHENFOLGE.flatMap((id) => DETAIL_ZUORDNUNG[id]));
  for (const f of input.funktionen) {
    if (!zugeordnet.has(f.slug)) {
      throw new Error(
        `Funktionsgruppen: Funktion ${f.slug} aus lib/funktionen.ts ist keiner Gruppe zugeordnet – Eintrag in lib/funktionsgruppen.ts ergänzen.`,
      );
    }
  }

  const extrasJeGruppe = new Map<GruppenId, ZusatzEintrag[]>(GRUPPEN_REIHENFOLGE.map((id) => [id, []]));
  const ids = Object.keys(ZUSATZ);
  const beworben = input.liveExtras
    .filter((x) => x.advertised === true)
    .map((x) => {
      const id = Object.hasOwn(REGISTER_IDS, x.name) ? REGISTER_IDS[x.name] : undefined;
      const def = id ? ZUSATZ[id] : undefined;
      if (!id || !def) {
        throw new Error(
          `Funktionsgruppen: ${x.name} aus dem Produktregister ist keiner Gruppe zugeordnet – Eintrag in lib/funktionsgruppen.ts ergänzen.`,
        );
      }
      return { id, def, eintrag: x };
    })
    .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  const doppelteZusatz = ersteDoppelung(beworben.map((x) => x.id));
  if (doppelteZusatz) {
    throw new Error(
      `Funktionsgruppen: Zusatzfunktion ${doppelteZusatz} ist mehreren Einträgen des Produktregisters zugeordnet – REGISTER_IDS in lib/funktionsgruppen.ts korrigieren.`,
    );
  }
  for (const { id, def, eintrag } of beworben) {
    assertTextBudget("featureList.name", def.name, TEXT_BUDGET.featureList.name);
    assertTextBudget("featureList.benefit", def.benefit, TEXT_BUDGET.featureList.benefit);
    assertOneSentence("FeatureList", def.name, def.benefit);
    extrasJeGruppe.get(def.gruppe)?.push({
      kind: "zusatz",
      id,
      registerName: eintrag.name,
      name: def.name,
      icon: def.icon,
      benefit: def.benefit,
      platforms: eintrag.platforms,
      ...(def.target ? { target: def.target } : {}),
    });
  }

  return GRUPPEN_REIHENFOLGE.map((id): Funktionsgruppe => {
    const kopf = GRUPPEN[id];
    pruefeKopf(id, kopf);
    const slugs = DETAIL_ZUORDNUNG[id];
    const vorhanden = slugs.flatMap((slug) => input.funktionen.filter((f) => f.slug === slug));
    const extras = extrasJeGruppe.get(id) ?? [];
    if (vorhanden.length === 0 && extras.length === 0) {
      throw new Error(`Funktionsgruppen: Gruppe ${id} enthält keine Funktion – Zuordnung in lib/funktionsgruppen.ts ergänzen.`);
    }
    const fehlend = slugs.find((slug) => !input.funktionen.some((f) => f.slug === slug));
    if (fehlend) {
      throw new Error(
        `Funktionsgruppen: Funktion ${fehlend} fehlt in lib/funktionen.ts – Zuordnung in lib/funktionsgruppen.ts korrigieren.`,
      );
    }
    if (extras.length > 0) assertCount("FeatureList", extras.length, TEXT_BUDGET.count.featureList, "Einträge");
    const details = vorhanden.map((f): DetailEintrag => {
      assertTextBudget("featureCard.title", f.name, TEXT_BUDGET.featureCard.title);
      assertTextBudget("featureCard.benefit", f.benefit, TEXT_BUDGET.featureCard.benefit);
      assertOneSentence("FeatureCard", f.name, f.benefit);
      return {
        kind: "detail",
        slug: f.slug,
        name: f.name,
        icon: f.icon,
        benefit: f.benefit,
        platforms: f.platforms,
        href: `/funktionen/${f.slug}`,
      };
    });
    return {
      id,
      label: kopf.label,
      icon: kopf.icon,
      description: kopf.description,
      anchorHref: `/funktionen#${id}`,
      heading: kopf.heading,
      lead: kopf.lead,
      details,
      extras,
    };
  });
}

/** Die sechs Gruppen mit den Live-Daten aus lib/funktionen.ts und dem Produktregister. */
export function getFunktionsgruppen(): Funktionsgruppe[] {
  return buildFunktionsgruppen({ funktionen, liveExtras: getProductRegister().liveExtras });
}
