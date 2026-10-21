/**
 * Inhalte der Startseite `/` (06-UI-SPEC „Seite 1: Startseite“; D-02, D-03, D-11, D-19).
 * Alle Zahlen stammen aus lib/site.ts (site, tarife), dem Produktregister und lib/format.ts;
 * Preise und Testtage werden nie als Literal geschrieben. Schritte nutzen Label, Icon und Anker der
 * sechs Funktionsgruppen (lib/funktionsgruppen.ts). Budget- und Herkunftstests: tests/home.test.ts.
 * Ausführliche Fassungen der gekürzten Inhalte stehen auf /gobd, /preise, /blog und
 * /hilfe/mobile-offline-synchronisierung (D-03).
 */
import { FileText, ScanLine } from "lucide-react";
import type { KeyFact } from "@/components/v2/KeyFacts";
import type { Step } from "@/components/v2/StepFlow";
import { euro, germanDate } from "@/lib/format";
import { getFunktionsgruppen, type GruppenId } from "@/lib/funktionsgruppen";
import { mobileLocales, productBasis } from "@/lib/product-register";
import {
  aufmassScene,
  einsaetzeScene,
  maengelScene,
  plantafelScene,
  rechnungenScene,
  zeitenScene,
} from "@/lib/scenes";
import { site, tarife } from "@/lib/site";
import { comparisonContent, type BentoTileContent } from "@/lib/styleguide-content";

/** Lizenzvergleich wie auf der Musterseite (06-UI-SPEC Abschnitt 5: gleicher Inhalt). */
export { comparisonContent };

const NBSP = " ";

function tarif(id: "voll" | "app") {
  const entry = tarife.find((t) => t.id === id);
  if (!entry) throw new Error(`home-content: Tarif ${id} fehlt in lib/site.ts.`);
  return entry;
}

const voll = tarif("voll");
const app = tarif("app");

// ---------------------------------------------------------------------------
// Metadaten und Hero (Keyword-Map-Ziel für "/", D-11, D-12)
// ---------------------------------------------------------------------------

export const homeMetadata = {
  /** Vollständiger Title: die Root-Seite erbt kein Title-Template. */
  title: "Handwerkersoftware für Büro und Baustelle | CraftOS",
  description: `CraftOS ist die Handwerkersoftware für Angebote, Rechnungen, Plantafel, Zeiterfassung und Lager – Web-App und Mobile-App in einer Lizenz. ${site.trialDays} Tage testen.`,
} as const;

export const hero = {
  /** Hauptkeyword inklusive Komma, im Hero ungetrennt (white-space: nowrap). */
  h1Keyword: "Handwerkersoftware,",
  h1Rest: " die Büro und Baustelle verbindet",
  lead: "Angebote, Plantafel, Zeiten und Rechnungen in einem System: Web-App im Büro, Mobile-App auf der Baustelle.",
  ctaLabel: `${site.trialDays} Tage kostenlos testen`,
  secondary: { label: "Alle Funktionen ansehen", href: "/funktionen" },
  pair: { browser: plantafelScene, phone: einsaetzeScene },
  pairDescription:
    "Plantafel der Web-App mit Wochenplanung und daneben die Einsatzliste der Mobile-App mit denselben Einsätzen.",
} as const;

// ---------------------------------------------------------------------------
// Abschnitte nach dem Hero (06-UI-SPEC Tabelle „Abschnittsfolge“)
// ---------------------------------------------------------------------------

export const HOME_SECTION_IDS = ["kennzahlen", "ablauf", "kernfunktionen", "apps", "preise", "faq", "abschluss"] as const;
export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

interface TextLink {
  label: string;
  href: string;
}

export const homeSections = {
  kennzahlen: {
    title: "Das Wichtigste auf einen Blick",
    lead: "Sie testen ohne Zahlungsdaten und wählen danach zwischen Voll-Lizenz für das Büro und App-Lizenz für die Baustelle.",
  },
  ablauf: {
    title: "So arbeitet Ihr Betrieb mit CraftOS",
    lead: "Vom Angebot bis zur Buchhaltung arbeiten Büro und Baustelle in einem System mit denselben Projektdaten.",
  },
  kernfunktionen: {
    title: "Kernfunktionen für Büro und Baustelle",
    lead: "Jede Kachel führt zur Seite der Funktion mit Ablauf, Plattformen und passender Anleitung.",
    link: { label: "Alle Funktionen ansehen", href: "/funktionen" } satisfies TextLink,
  },
  apps: {
    title: "Web-App im Büro, Mobile-App auf der Baustelle",
    lead: "Sie planen und rechnen im Browser ab, Ihr Team erfasst Zeiten, Fotos und Aufmaß in der Mobile-App.",
    link: { label: "Mobile-App ansehen", href: "/app" } satisfies TextLink,
  },
  preise: {
    title: "Zwei Lizenzen, klare Preise",
    lead: "Die Voll-Lizenz enthält Web-App und Mobile-App, die App-Lizenz ergänzt sie für Mitarbeitende auf der Baustelle.",
    link: { label: "Alle Preise ansehen", href: "/preise" } satisfies TextLink,
  },
  faq: {
    title: "Häufige Fragen zu CraftOS",
    lead: "Kurze Antworten zu Test, Lizenzen, GoBD und Arbeit ohne Internet; ausführliche Anleitungen stehen in der Hilfe.",
  },
  abschluss: {
    title: "Machen Sie Platz für Ihr Handwerk.",
    text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
    secondary: { label: "Preise ansehen", href: "/preise" } satisfies TextLink,
  },
} as const;

// Abschnitt 1: Kennzahlen (keine „Anzahl Funktionen“ – Zählweise missverständlich)
export const keyFactsContent: { facts: KeyFact[]; note: string } = {
  facts: [
    // Quellen in Kurzform (07 D-13): site:trialDays = site.trialDays, site:tarif-…-monat = tarife, register:… = Produktregister
    { value: `${site.trialDays}${NBSP}Tage`, label: "kostenlos testen", source: "site:trialDays" },
    { value: euro(voll.monat), label: "Voll-Lizenz pro Monat", source: "site:tarif-voll-monat" },
    { value: euro(app.monat), label: "App-Lizenz pro Monat", source: "site:tarif-app-monat" },
    { value: String(mobileLocales.length), label: "Sprachen in der Mobile-App", source: "register:mobileLocales" },
  ],
  note: `Preise netto zzgl. USt. Stand: ${germanDate(productBasis.checkedAt)}.`,
};

// Abschnitt 2: Arbeitsablauf – Titel, Icon und Ziel aus den Funktionsgruppen
const stepTexts: Record<GruppenId, string> = {
  angebot: "Positionen kalkulieren und das Angebot online unterschreiben lassen.",
  planung: "Einsätze in der Plantafel verteilen und Bauphasen terminieren.",
  baustelle: "Zeiten, Fotos, Aufmaß und Mängel in der Mobile-App erfassen.",
  rechnung: "Rechnungen schreiben, als E-Rechnung ausgeben und Zahlungen verfolgen.",
  buchhaltung: "Belege prüfen und Daten für DATEV an die Steuerberatung übergeben.",
  team: "Rechte vergeben sowie Urlaub und Abwesenheiten im Blick behalten.",
};

export const stepContent: Step[] = getFunktionsgruppen().map((gruppe) => ({
  title: gruppe.label,
  text: stepTexts[gruppe.id],
  icon: gruppe.icon,
  href: gruppe.anchorHref,
}));

// Abschnitt 3: Kernfunktionen (Plantafel bewusst nicht – sie steht im Hero)
export interface HomeBentoTile extends BentoTileContent {
  href: string;
}

export const bentoContent: HomeBentoTile[] = [
  {
    size: "lg",
    surface: "dark",
    slug: "rechnungen",
    title: "Rechnungen und E-Rechnung",
    text: "Abschlags-, Teil- und Schlussrechnungen erstellen und als XRechnung oder ZUGFeRD ausgeben.",
    visual: { kind: "browser", scene: rechnungenScene },
    href: "/funktionen/rechnungen",
  },
  {
    size: "sm",
    surface: "warm",
    slug: "angebote",
    title: "Angebote & Kalkulation",
    text: "Positionen mit Lohn, Material und Zuschlägen nachvollziehbar kalkulieren.",
    visual: { kind: "icon", icon: FileText },
    href: "/funktionen/angebote",
  },
  {
    size: "sm",
    surface: "white",
    slug: "eingangsrechnungen",
    title: "Belege scannen",
    text: "Belege mit der Mobile-App fotografieren, erkannte Angaben prüfen und zuordnen.",
    visual: { kind: "icon", icon: ScanLine },
    href: "/funktionen/eingangsrechnungen",
  },
  {
    size: "md",
    surface: "warm",
    slug: "zeiterfassung",
    title: "Zeiterfassung",
    text: "Zeit per Timer auf der Baustelle starten und stoppen, mit Standort und Projekt.",
    visual: { kind: "phone", scene: zeitenScene },
    href: "/funktionen/zeiterfassung",
  },
  {
    size: "wide",
    surface: "warm",
    slug: "baudokumentation",
    title: "Mängel und Abnahme",
    text: "Mängel mit Foto am Projekt festhalten und Abnahmen vor Ort unterschreiben lassen.",
    visual: { kind: "phone", scene: maengelScene },
    visualPosition: "end",
    href: "/funktionen/baudokumentation",
  },
];

// Abschnitt 4: Web-App + Mobile-App
export const appsContent = { scene: aufmassScene } as const;

// Abschnitt 6: FAQ – gekürzte Bestandsfassungen ohne neue Aussagen
export const faqContent: { q: string; a: string }[] = [
  {
    q: "Ist die Mobile-App in der Voll-Lizenz enthalten?",
    a: `Ja. Die ${voll.name} für ${euro(voll.monat)} netto pro Person und Monat umfasst Web-App und Mobile-App für dieselbe Person. Mitarbeitende auf der Baustelle nutzen die ${app.name} für ${euro(app.monat)} netto im Monat.`,
  },
  {
    q: "Wie lange kann ich CraftOS kostenlos testen?",
    a: `Sie testen CraftOS ${site.trialDays} Tage ohne Zahlungsdaten. Ein kostenpflichtiges Abonnement wählen Sie aktiv in der App; den Zahlungsbeginn sehen Sie im Checkout.`,
  },
  {
    q: "Kostet die Plantafel zusätzlich?",
    a: "Nein, die Plantafel gehört zur Voll-Lizenz, ebenso Angebote, Rechnungen, Projekte, Lager und Nachkalkulation. KI-Verbrauch und zusätzlicher Speicher werden gesondert abgerechnet.",
  },
  {
    q: "Wie unterstützt CraftOS die GoBD?",
    a: "CraftOS unterstützt GoBD-gerechte Abläufe durch festgeschriebene Rechnungen, geschützte Beleginhalte und nachvollziehbare Stornierungen. Vollständige Belegerfassung, Verfahrensdokumentation und Aufbewahrung bleiben Aufgabe Ihres Betriebs.",
  },
  {
    q: "Kann ich auf der Baustelle ohne Internet arbeiten?",
    a: "Teilweise: Bereits geladene Daten, ausgewählte Texteingaben und Zeiteinträge können mobil offline nutzbar sein. Fotos, KI und noch nicht geladene Inhalte benötigen eine Verbindung.",
  },
];
