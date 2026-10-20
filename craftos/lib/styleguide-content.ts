/**
 * Inhalte der internen Musterseite /styleguide (UI-SPEC Phase 5, Blöcke 0–13).
 * Alle Zahlen stammen aus site.ts (tarife, trialDays, startCredits) und dem Produktregister;
 * Preise werden nie als Literal geschrieben. Mini-UI-Inhalte sind fiktive Beispieldaten.
 * Budget- und Faktentests: tests/design-v2-budgets.test.ts, tests/styleguide.test.ts.
 */
import {
  BookOpenCheck,
  CalendarDays,
  ClipboardCheck,
  FileCheck2,
  FileText,
  HardHat,
  ScanLine,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { KeyFact } from "@/components/v2/KeyFacts";
import type { ComparisonColumn, ComparisonRow } from "@/components/v2/ComparisonTable";
import type { MiniStatusName, MiniWeekEntry } from "@/components/v2/mini/MiniUi";
import type { PhoneTab } from "@/components/v2/PhoneFrame";
import type { Step } from "@/components/v2/StepFlow";
import { getFunktion, type ProductPlatform } from "@/lib/funktionen";
import { mobileLocales, productBasis } from "@/lib/product-register";
import { site, startCredits, tarife } from "@/lib/site";

const NBSP = " ";

/** Preis aus tarife, deutsch formatiert (Komma, geschütztes Leerzeichen vor dem Eurozeichen). */
export function euro(value: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}

/** ISO-Datum → „20.10.2026“. */
export function germanDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}

function tarif(id: "voll" | "app") {
  const entry = tarife.find((t) => t.id === id);
  if (!entry) throw new Error(`styleguide-content: Tarif ${id} fehlt in lib/site.ts.`);
  return entry;
}

function funktion(slug: string) {
  const entry = getFunktion(slug);
  if (!entry) throw new Error(`styleguide-content: Funktion ${slug} fehlt in lib/funktionen.ts.`);
  return entry;
}

const voll = tarif("voll");
const app = tarif("app");
/** Stand der Produkt- und Preisprüfung (Produktregister, origin/release). */
export const standDatum = germanDate(productBasis.checkedAt);
const trial = `${site.trialDays}${NBSP}Tage`;

// ---------------------------------------------------------------------------
// Mini-UI-Szenen (vereinfachte Produktoberflächen, Beispieldaten)
// ---------------------------------------------------------------------------

export interface MiniRowContent {
  primary: string;
  secondary?: string;
  value?: string;
  status?: MiniStatusName;
}

export interface FrameScene {
  /** Seitentitel in der Web-App bzw. Mobile-App (Mini-Budget 24 Zeichen). */
  title: string;
  /** Beleg am Release, Form "web:<pfad>" bzw. "mobile:<pfad>". */
  evidence: string;
  /** Screenreadersatz ≤ 140 Zeichen. */
  description: string;
  activeTab?: PhoneTab;
  rows?: MiniRowContent[];
  week?: MiniWeekEntry[];
  timer?: { label: string; value: string };
}

export type Visual =
  | { kind: "icon"; icon: LucideIcon }
  | { kind: "browser"; scene: FrameScene }
  | { kind: "phone"; scene: FrameScene };

const plantafelScene: FrameScene = {
  title: "Plantafel",
  evidence: "web:src/pages/Plantafel.tsx",
  description: "Wochenansicht der Plantafel mit Einsätzen auf drei Baustellen von Montag bis Freitag.",
  week: [
    { day: 0, label: "Bad Bergmann", span: 3 },
    { day: 3, label: "Bäckerei Krause", span: 2 },
    { day: 0, label: "Dach Schulte", lane: 1, span: 2 },
    { day: 2, label: "Aufmaß Weber", lane: 1 },
    { day: 1, label: "Bad Bergmann", lane: 2, span: 2 },
  ],
};

const zeitenScene: FrameScene = {
  title: "Zeiterfassung",
  evidence: "mobile:src/features/time-tracking/screens/TimeTrackingScreen.tsx",
  description: "Zeiterfassung in der Mobile-App mit laufendem Timer und den Zeiteinträgen des Tages.",
  activeTab: "Zeiten",
  timer: { label: "Bad Bergmann", value: "02:15:00" },
  rows: [
    { primary: "Arbeit", secondary: "Bad Bergmann", value: "4 Std. 30 Min." },
    { primary: "Fahrt", secondary: "Bad Bergmann", value: "30 Min." },
  ],
};

const maengelScene: FrameScene = {
  title: "Mängel",
  evidence: "mobile:src/features/defects/screens/DefectsScreen.tsx",
  description: "Mängelliste in der Mobile-App mit drei erfassten Mängeln aus zwei Projekten.",
  activeTab: "Projekte",
  rows: [
    { primary: "Silikonfuge Dusche", secondary: "Bad Bergmann" },
    { primary: "Fliese gesprungen", secondary: "Bad Bergmann" },
    { primary: "Türzarge beschädigt", secondary: "Bäckerei Krause" },
  ],
};

const aufmassScene: FrameScene = {
  title: "Aufmaß",
  evidence: "mobile:src/features/room-measurements/screens/RoomMeasurementsScreen.tsx",
  description: "Raumaufmaß in der Mobile-App mit Boden- und Wandfläche sowie einem Abzug für die Tür.",
  activeTab: "Projekte",
  rows: [
    { primary: "Bad, Boden", value: "6,4 m²" },
    { primary: "Bad, Wand", value: "21,8 m²" },
    { primary: "Abzug Tür", value: "−1,6 m²" },
  ],
};

const rechnungenScene: FrameScene = {
  title: "Rechnungen",
  evidence: "web:src/pages/Rechnungen.tsx",
  description: "Rechnungsliste der Web-App mit drei Rechnungen in den Status Gesendet, Bezahlt und Offen.",
  rows: [
    { primary: "RE-2026-041", secondary: "Bäckerei Krause", status: "Gesendet" },
    { primary: "RE-2026-040", secondary: "Bad Bergmann", status: "Bezahlt" },
    { primary: "RE-2026-039", secondary: "Dach Schulte", status: "Offen" },
  ],
};

const einsaetzeScene: FrameScene = {
  title: "Einsätze",
  evidence: "mobile:src/features/assignments/screens/AssignmentsListScreen.tsx",
  description: "Einsatzliste in der Mobile-App mit den zugewiesenen Einsätzen der Woche.",
  activeTab: "Einsätze",
  rows: [
    { primary: "Bad Bergmann", secondary: "Mo–Mi", value: "07:00" },
    { primary: "Bäckerei Krause", secondary: "Do–Fr", value: "07:30" },
  ],
};

// ---------------------------------------------------------------------------
// Block 0 und 1: Kopf und Tokens
// ---------------------------------------------------------------------------

export const pageIntro = {
  eyebrow: "Designsystem v2",
  title: "Designbausteine v2",
  intro: "Interne Musterseite: alle Bausteine für die Neugestaltung der CraftOS-Website mit echten Inhalten.",
} as const;

export const tokenSwatches = [
  { name: "Weiß", hex: "#FFFFFF", role: "Seitenfläche, Kacheln, Gerätebildschirme" },
  { name: "Warm", hex: "#F7F3EB", role: "Kacheln, Bühnen, Tabellenkopf" },
  { name: "Ink 950", hex: "#101014", role: "Hero, CTA-Band, eine Kachel je Raster" },
  { name: "Amber", hex: "#F2AF38", role: "Haupt-CTA, Schrittknoten, aktiver Tab" },
  { name: "Primary 700", hex: "#99600B", role: "Eyebrow und Link-Hover auf Weiß" },
  { name: "Ink 500", hex: "#62626E", role: "Lead, Kartentext, Labels" },
] as const;

export const typeSamples = [
  { role: "Display", spec: "48 px / 600, Clash Display", sample: "Weniger Büro" },
  { role: "Heading", spec: "20 px / 600, Clash Display", sample: "Plantafel" },
  { role: "Body", spec: "16 px / 400, General Sans", sample: "Einsätze für die Woche planen." },
  { role: "Label", spec: "14 px / 600, General Sans", sample: "Web-App" },
] as const;

export const spacingScale = [4, 8, 16, 24, 32, 48, 64] as const;
/** Ausnahme „Abschnittsabstand Desktop“ (UI-SPEC Spacing Scale). */
export const spacingException = 96;
export const radii = [
  { px: 6, use: "Badges, CTA-Button" },
  { px: 16, use: "Kacheln sm/md, Karten, Tabellen" },
  { px: 24, use: "Kacheln lg/wide, Bühnen" },
] as const;

// ---------------------------------------------------------------------------
// Block 2–6
// ---------------------------------------------------------------------------

export const sectionHeaderContent = {
  eyebrow: "Angebot",
  title: "Vom Aufmaß zum unterschriebenen Angebot",
  lead: "Maße auf der Baustelle erfassen, im Büro ins Angebot übernehmen und online unterschreiben lassen.",
} as const;

export interface BentoTileContent {
  size: "sm" | "md" | "lg" | "wide";
  surface?: "white" | "warm" | "dark";
  /** Live-Funktion, deren Plattformen als Badges erscheinen. */
  slug: string;
  title: string;
  text: string;
  visual: Visual;
  visualPosition?: "top" | "end";
}

export const bentoContent: BentoTileContent[] = [
  {
    size: "lg",
    surface: "dark",
    slug: "plantafel",
    title: "Plantafel",
    text: "Einsätze für die Woche planen; Änderungen erscheinen in der Einsatzübersicht der Mobile-App.",
    visual: { kind: "browser", scene: plantafelScene },
  },
  {
    size: "sm",
    surface: "warm",
    slug: "e-rechnung",
    title: "E-Rechnung",
    text: "Rechnungen als XRechnung oder ZUGFeRD mit strukturierten Daten ausgeben.",
    visual: { kind: "icon", icon: FileCheck2 },
  },
  {
    size: "sm",
    surface: "white",
    slug: "eingangsrechnungen",
    title: "Belege scannen",
    text: "Belege mit der Mobile-App fotografieren, erkannte Angaben prüfen und zuordnen.",
    visual: { kind: "icon", icon: ScanLine },
  },
  {
    size: "md",
    surface: "warm",
    slug: "zeiterfassung",
    title: "Zeiterfassung",
    text: "Zeit per Timer auf der Baustelle starten und stoppen, mit Standort und Projekt.",
    visual: { kind: "phone", scene: zeitenScene },
  },
  {
    size: "wide",
    surface: "warm",
    slug: "baudokumentation",
    title: "Mängel und Abnahme",
    text: "Mängel mit Foto am Projekt festhalten und Abnahmen vor Ort unterschreiben lassen.",
    visual: { kind: "phone", scene: maengelScene },
    visualPosition: "end",
  },
];

export const stepContent: Step[] = [
  { title: "Angebot", text: "Positionen kalkulieren und das Angebot online unterschreiben lassen.", icon: FileText },
  { title: "Planung", text: "Einsätze in der Plantafel verteilen und Bauphasen terminieren.", icon: CalendarDays },
  { title: "Baustelle", text: "Zeiten, Fotos, Aufmaß und Mängel in der Mobile-App erfassen.", icon: HardHat },
  { title: "Rechnung", text: "Rechnungen schreiben, als E-Rechnung ausgeben und Zahlungen verfolgen.", icon: ClipboardCheck },
  { title: "Buchhaltung", text: "Belege prüfen und Daten für DATEV an die Steuerberatung übergeben.", icon: BookOpenCheck },
  { title: "Team", text: "Rechte vergeben sowie Urlaub und Abwesenheiten im Blick behalten.", icon: Users },
];

export const keyFactsContent: { facts: KeyFact[]; note: string } = {
  facts: [
    { value: trial, label: "kostenlos testen", source: "site.trialDays" },
    { value: euro(voll.monat), label: "Voll-Lizenz pro Monat", source: "tarife.voll.monat" },
    { value: euro(app.monat), label: "App-Lizenz pro Monat", source: "tarife.app.monat" },
    { value: String(mobileLocales.length), label: "Sprachen in der Mobile-App", source: "product-register: mobileLocales" },
  ],
  note: `Preise netto zzgl. USt. Stand: ${standDatum}.`,
};

export interface FeatureCardContent {
  slug: string;
  name: string;
  icon: LucideIcon;
  benefit: string;
  platforms: ProductPlatform[];
  href: string;
  scene: Extract<Visual, { kind: "browser" | "phone" }>;
}

function featureCard(slug: string, benefit: string, scene: FeatureCardContent["scene"]): FeatureCardContent {
  const f = funktion(slug);
  return { slug, name: f.name, icon: f.icon, benefit, platforms: [...f.platforms], href: `/funktionen/${slug}`, scene };
}

export const featureCardContent: FeatureCardContent[] = [
  featureCard(
    "aufmass",
    "Räume, Flächen und Abzüge vor Ort erfassen und die Mengen ins Angebot übernehmen.",
    { kind: "phone", scene: aufmassScene },
  ),
  featureCard(
    "zeiterfassung",
    "Arbeitszeit per Timer starten und stoppen, mit Standort und passendem Projekt.",
    { kind: "phone", scene: zeitenScene },
  ),
  featureCard(
    "e-rechnung",
    "Rechnungen als XRechnung oder ZUGFeRD mit strukturierten Daten ausgeben.",
    { kind: "browser", scene: rechnungenScene },
  ),
];

// ---------------------------------------------------------------------------
// Block 7–13
// ---------------------------------------------------------------------------

export const frameContent = {
  browser: rechnungenScene,
  phones: [
    { width: 160 as const, scene: aufmassScene },
    { width: 194 as const, scene: zeitenScene },
    { width: 240 as const, scene: einsaetzeScene },
  ],
  pair: {
    browser: plantafelScene,
    phone: einsaetzeScene,
    description:
      "Plantafel der Web-App mit Wochenplanung und daneben die Einsatzliste der Mobile-App mit denselben Einsätzen.",
  },
};

export const comparisonContent: {
  caption: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  note: string;
} = {
  caption: "Voll-Lizenz und App-Lizenz im Vergleich",
  columns: [
    { key: "voll", label: voll.name, highlight: true },
    { key: "app", label: app.name },
  ],
  rows: [
    { label: "Web-App", cells: { voll: true, app: false } },
    { label: "Mobile-App", cells: { voll: true, app: true } },
    { label: "Angebote und Rechnungen", cells: { voll: true, app: false } },
    { label: "Plantafel", cells: { voll: true, app: "Einsätze ansehen" } },
    { label: "Zeiterfassung", cells: { voll: true, app: true } },
    { label: "Aufmaß und Baudokumentation", cells: { voll: true, app: true } },
    { label: "Urlaub und Abwesenheiten", cells: { voll: true, app: true } },
    { label: "Preis pro Monat", cells: { voll: euro(voll.monat), app: euro(app.monat) } },
  ],
  note: `Preise netto zzgl. USt. Quelle: Preisliste CraftOS, Stand ${standDatum}.`,
};

export const faqContent: { q: string; a: string }[] = [
  {
    q: "Brauche ich für den Test eine Zahlungsmethode?",
    a: `Nein. Sie testen CraftOS ${trial} kostenlos, eine Zahlungsmethode ist dafür nicht erforderlich.`,
  },
  {
    q: "Was kostet die App-Lizenz?",
    a: `Die App-Lizenz kostet ${euro(app.monat)} netto im Monat oder ${euro(app.jahr)} netto im Jahr und ergänzt die Voll-Lizenz Ihres Betriebs.`,
  },
  {
    q: "Wie werden KI-Funktionen abgerechnet?",
    a: `Über im Voraus gekaufte Credits; jeder Betrieb erhält einmalig ${startCredits}${NBSP}Credits Startguthaben.`,
  },
];

/**
 * Block 11: werkstatt-2026 ist laut docs/MEDIA.md ein KI-generiertes Motiv und trägt deshalb
 * die Kennzeichnung „Darstellung, KI-gestaltet“ (D-04, MEDIA-03).
 */
export const mediaContent = {
  src: "/images/werkstatt-2026-1600.webp",
  alt: "Tischlerin prüft ein Eichenbrett an einer Werkbank bei Tageslicht",
  width: 1536,
  height: 1024,
  sizes: "(max-width: 767px) 100vw, 720px",
  caption: "Illustratives Nutzungsmotiv einer Tischlerei, optimiert als WebP unter 150 KB.",
  label: "ki" as const,
};


export const ctaContent = {
  title: "Machen Sie Platz für Ihr Handwerk.",
  text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
} as const;
