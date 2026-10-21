/**
 * Inhalte der Mobile-App-Seite `/app` (07-UI-SPEC „Mobile-App-Seite /app“; FEAT-03, MEDIA-01, D-09, D-13, D-23).
 * Alle Zahlen stammen aus lib/site.ts (site, tarife), dem Produktregister (mobileLocales, mobileOffline,
 * productBasis) und lib/format.ts; Preise, Sprachenzahl und Testtage werden nie als Literal geschrieben.
 * Die Kacheln decken alle Live-Funktionen der App am Mobile-Release ab (07-RESEARCH „Mobile-App-Umfang“),
 * Phone-Szenen kommen aus lib/scenes.ts. Offline erscheint nur mit Einschränkung (Kennzahl, Hinweis,
 * Ablauf und FAQ „Teilweise: …“; Belege und Limitation im Registereintrag mobileOffline).
 * Ausführliche Fassung der Offline-Grenzen: /hilfe/mobile-offline-synchronisierung.
 * Budget- und Herkunftstests: tests/app-seite.test.ts.
 */
import { Camera, Contact, FolderOpen, ListChecks, MessagesSquare, Navigation } from "lucide-react";
import type { KeyFact } from "@/components/v2/KeyFacts";
import type { Step } from "@/components/v2/StepFlow";
import { euro, germanDate } from "@/lib/format";
import type { KernpunktVisual } from "@/lib/funktionsdetails/types";
import { mobileLocales, productBasis } from "@/lib/product-register";
import {
  abnahmeScene,
  aufmassScene,
  bautagesberichteScene,
  belegScene,
  einsaetzeScene,
  lagerAppScene,
  maengelStatusScene,
  urlaubScene,
  zeitenScene,
  type FrameScene,
} from "@/lib/scenes";
import { tarife } from "@/lib/site";

function tarif(id: "voll" | "app") {
  const entry = tarife.find((t) => t.id === id);
  if (!entry) throw new Error(`app-content: Tarif ${id} fehlt in lib/site.ts.`);
  return entry;
}

const voll = tarif("voll");
const app = tarif("app");

// ---------------------------------------------------------------------------
// Abschnittsfolge und Flächen (Kopf dunkel → Weiß → Warm → … → CTA dunkel)
// ---------------------------------------------------------------------------

export const APP_SECTION_IDS = ["kopf", "zeit", "kennzahlen", "dokumentieren", "offline", "material", "faq", "cta"] as const;
export type AppSectionId = (typeof APP_SECTION_IDS)[number];

export const APP_SURFACES: Readonly<Record<AppSectionId, "dark" | "white" | "warm">> = {
  kopf: "dark",
  zeit: "white",
  kennzahlen: "warm",
  dokumentieren: "white",
  offline: "warm",
  material: "white",
  faq: "warm",
  cta: "dark",
};

// ---------------------------------------------------------------------------
// Kopf (H1, Title und Description kommen aus der Keyword-Map, D-10)
// ---------------------------------------------------------------------------

export const appKopf: {
  eyebrow: string;
  kopfwort: string;
  lead: string;
  visual: { kind: "phone"; scene: FrameScene };
} = {
  eyebrow: "Mobile-App",
  kopfwort: "Handwerker-App",
  lead: "Zeiten, Einsätze, Fotos, Mängel und Unterschriften erfasst Ihr Team direkt auf der Baustelle.",
  visual: { kind: "phone", scene: einsaetzeScene },
};

interface TextLink {
  label: string;
  href: string;
}

export const appSections = {
  zeit: {
    title: "Zeiten, Einsätze und Urlaub",
    lead: "Ihr Team startet den Timer, findet den nächsten Einsatz und beantragt Urlaub in derselben App.",
  },
  kennzahlen: {
    title: "Das Wichtigste zur Mobile-App",
    lead: "Die App gibt es für iPhone, iPad und Android, in der Voll-Lizenz ist sie für dieselbe Person enthalten.",
  },
  dokumentieren: {
    title: "Die Baustelle in der App dokumentieren",
    lead: "Aufmaß, Fotos, Berichte, Mängel und Abnahmen landen im richtigen Projekt.",
  },
  offline: {
    title: "Vorbereitet bei schwachem Empfang",
    lead: "Geladene Daten bleiben verfügbar; Karten, Routen, Fotos, KI und neue Downloads brauchen eine Verbindung.",
    link: { label: "Offline-Nutzung vorbereiten", href: "/hilfe/mobile-offline-synchronisierung" } satisfies TextLink,
  },
  material: {
    title: "Material, Belege und Kommunikation",
    lead: "Artikel scannen, Belege fotografieren und Rückfragen im Projekt-Chat klären, ohne ins Büro zu fahren.",
  },
  faq: {
    title: "Häufige Fragen zur Handwerker-App",
    lead: "Kurze Antworten zu Lizenz, Arbeit ohne Empfang, Sprachen und Geräten.",
  },
  cta: {
    title: "Ihr Team auf der Baustelle verbinden",
    text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
    secondary: { label: "Preise ansehen", href: "/preise" } satisfies TextLink,
  },
} as const;

// ---------------------------------------------------------------------------
// Kacheln in drei Gruppen (alle verlinkt, keine Plattform-Badges: alles Mobile-App)
// ---------------------------------------------------------------------------

export interface AppTile {
  size: "sm" | "md" | "lg";
  /** „dark“ nur für die lg-Kachel der ersten Gruppe; sonst warm auf weißer Abschnittsfläche. */
  surface: "warm" | "dark";
  title: string;
  text: string;
  /** Icon oder Phone-Szene (lg 194 px, md 160 px). */
  visual: KernpunktVisual;
  href: string;
}

export const appTiles: Readonly<Record<"zeit" | "dokumentieren" | "material", AppTile[]>> = {
  zeit: [
    {
      size: "lg",
      surface: "dark",
      title: "Zeiterfassung mit Standort",
      text: "Timer starten und stoppen, die App hält jeweils den Standort fest und ordnet das Projekt in der Nähe zu.",
      visual: { kind: "phone", scene: zeitenScene, width: 194 },
      href: "/funktionen/zeiterfassung",
    },
    {
      size: "sm",
      surface: "warm",
      title: "Einsätze mit Navigation",
      text: "Den Einsatz öffnen, den Zielort sehen und die Navigation zur Baustelle starten.",
      visual: { kind: "icon", icon: Navigation },
      href: "/funktionen/plantafel",
    },
    {
      size: "sm",
      surface: "warm",
      title: "Arbeitsschritte abhaken",
      text: "Anleitung, Material und Werkzeug je Schritt sehen und Erledigtes abhaken.",
      visual: { kind: "icon", icon: ListChecks },
      href: "/funktionen/arbeitsanweisungen",
    },
    {
      size: "md",
      surface: "warm",
      title: "Urlaub beantragen",
      text: "Urlaub in der App beantragen und sehen, ob der Antrag ausstehend oder genehmigt ist.",
      visual: { kind: "phone", scene: urlaubScene, width: 160 },
      href: "/funktionen/team",
    },
  ],
  dokumentieren: [
    {
      size: "lg",
      surface: "warm",
      title: "Mängel mit Foto und Frist",
      text: "Mangel mit Ort, Priorität und Frist anlegen, Vorher- und Nachher-Foto ergänzen und den Status verfolgen.",
      visual: { kind: "phone", scene: maengelStatusScene, width: 194 },
      href: "/funktionen/maengelmanagement",
    },
    {
      size: "sm",
      surface: "warm",
      title: "Besichtigung",
      text: "Fotos, Videos und Sprachnotizen der Besichtigung gesammelt im Projekt ablegen.",
      visual: { kind: "icon", icon: Camera },
      href: "/funktionen/aufmass",
    },
    {
      size: "sm",
      surface: "warm",
      title: "Fotos und Projektdateien",
      text: "Pläne, Bilder und Unterlagen des Projekts unterwegs öffnen und ergänzen.",
      visual: { kind: "icon", icon: FolderOpen },
      href: "/funktionen/baudokumentation",
    },
    {
      size: "md",
      surface: "warm",
      title: "Aufmaß vor Ort",
      text: "Räume, Flächen und Abzüge erfassen und die Mengen für das Angebot bereitstellen.",
      visual: { kind: "phone", scene: aufmassScene, width: 160 },
      href: "/funktionen/aufmass",
    },
    {
      size: "md",
      surface: "warm",
      title: "Bautagesbericht",
      text: "Wetter, ausgeführte Arbeiten und Materialverbrauch festhalten und unterschreiben lassen.",
      visual: { kind: "phone", scene: bautagesberichteScene, width: 160 },
      href: "/funktionen/baudokumentation",
    },
    {
      size: "md",
      surface: "warm",
      title: "Abnahme mit Unterschrift",
      text: "Abnahme oder Teilabnahme protokollieren und vor Ort von beiden Seiten unterschreiben.",
      visual: { kind: "phone", scene: abnahmeScene, width: 160 },
      href: "/funktionen/baudokumentation",
    },
  ],
  material: [
    {
      size: "lg",
      surface: "warm",
      title: "Lager-Scan",
      text: "Artikel per Barcode scannen, den Bestand freigegebener Lager sehen und Ausgabe oder Rücknahme buchen.",
      visual: { kind: "phone", scene: lagerAppScene, width: 194 },
      href: "/funktionen/lager",
    },
    {
      size: "sm",
      surface: "warm",
      title: "Kunden in der App",
      text: "Kundendaten unterwegs in der Mobile-App nachschlagen und bearbeiten.",
      visual: { kind: "icon", icon: Contact },
      href: "/funktionen/projektverwaltung",
    },
    {
      size: "sm",
      surface: "warm",
      title: "Projekt-Chat und Nachrichten",
      text: "Rückfragen im Projekt-Chat klären und Direktnachrichten im Posteingang lesen.",
      visual: { kind: "icon", icon: MessagesSquare },
      href: "/funktionen/projektverwaltung",
    },
    {
      size: "md",
      surface: "warm",
      title: "Beleg scannen",
      text: "Beleg fotografieren, erkannte Angaben prüfen und die Ausgabe einem Projekt zuordnen.",
      visual: { kind: "phone", scene: belegScene, width: 160 },
      href: "/funktionen/eingangsrechnungen",
    },
  ],
};

// ---------------------------------------------------------------------------
// Kennzahlen (Kurzform-Quellen nach D-13; Offline nur mit Einschränkung, D-23)
// ---------------------------------------------------------------------------

export const appKeyFacts: { facts: KeyFact[]; note: string } = {
  facts: [
    { value: String(mobileLocales.length), label: "Sprachen in der Mobile-App", source: "register:mobileLocales" },
    { value: "Offline", label: "teilweise nutzbar, später synchronisiert", source: "register:mobileOffline" },
    { value: euro(app.monat), label: "App-Lizenz pro Monat", source: "site:tarif-app-monat" },
  ],
  note: `Preis netto zzgl. USt. Offline nur mit Einschränkungen, siehe unten. Stand: ${germanDate(productBasis.checkedAt)}.`,
};

// ---------------------------------------------------------------------------
// Offline-Ablauf (Bestand /app, Hilfeartikel und Mobile-Release: Offline-Queue mit Sync-Status)
// ---------------------------------------------------------------------------

export const offlineSteps: Step[] = [
  { title: "Projekte vorab laden", text: "Relevante Projekte mit Verbindung öffnen, damit sie bereitliegen." },
  { title: "Standort freigeben", text: "Standortfreigabe für Timer und Unterschriften vor dem Einsatz prüfen." },
  { title: "Ohne Empfang erfassen", text: "Zeiten und ausgewählte Eingaben werden vorgemerkt und später gesendet." },
  { title: "Übertragung prüfen", text: "Der Sync-Status zeigt ausstehende Einträge, bis alles übertragen ist." },
];

// ---------------------------------------------------------------------------
// FAQ (Werte aus tarife und mobileLocales; Offline-Antwort beginnt mit „Teilweise:“)
// ---------------------------------------------------------------------------

export const appFaq: { q: string; a: string }[] = [
  {
    q: "Ist die Mobile-App in der Voll-Lizenz enthalten?",
    a: `Ja. Die ${voll.name} für ${euro(voll.monat)} netto pro Person und Monat umfasst Web-App und Mobile-App für dieselbe Person. Mitarbeitende, die nur auf der Baustelle arbeiten, nutzen die ${app.name}.`,
  },
  {
    q: "Was kostet die App-Lizenz für Mitarbeitende?",
    a: `Die ${app.name} kostet ${euro(app.monat)} netto pro Person und Monat, bei jährlicher Zahlung ${euro(app.jahr)} netto im Jahr. Sie ergänzt die ${voll.name} Ihres Betriebs; mindestens eine ${voll.name} pro Betrieb ist erforderlich.`,
  },
  {
    q: "Funktioniert die App ohne Internet?",
    a: "Teilweise: Bereits geladene Daten, ausgewählte Texteingaben und Zeiteinträge können ohne Empfang nutzbar sein und werden später synchronisiert. Karten, Routen, Fotos, KI und noch nicht geladene Inhalte benötigen eine Verbindung; der Sync-Status zeigt ausstehende Einträge.",
  },
  {
    q: "In welchen Sprachen gibt es die App?",
    a: `Die Mobile-App gibt es in ${mobileLocales.length} Sprachen, darunter Deutsch, Englisch, Polnisch, Rumänisch, Türkisch und Ukrainisch. So kann Ihr Team die App in der eigenen Sprache bedienen.`,
  },
  {
    q: "Auf welchen Geräten läuft die App?",
    a: "Die Mobile-App gibt es für iPhone und iPad im App Store und für Android-Geräte bei Google Play. Nach der Installation melden Sie sich mit Ihrem CraftOS-Konto an.",
  },
];
