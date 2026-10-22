/**
 * Inhalte der Entitätsseite `/fakten-ueber-craftos` (08-UI-SPEC § 5.2; D-09, D-12, D-25, Prompt #6 „Was ist CraftOS?“).
 * Alle Zahlen kommen aus lib/site.ts (site, tarife), dem Produktregister (mobileLocales, mobileOffline) und
 * lib/funktionen.ts bzw. lib/funktionsgruppen.ts; Preise und Testtage werden nie als Literal geschrieben
 * (tests/pricing-parity.test.ts). Bestandsfakten sind nur gekürzt, es kommen keine neuen Behauptungen hinzu.
 * Prüfung: tests/kernseiten.test.ts, tests/design-v2-budgets.test.ts.
 */
import type { LucideIcon } from "lucide-react";
import type { FactListItem } from "@/components/v2/FactList";
import type { KeyFact } from "@/components/v2/KeyFacts";
import { euro, germanDate } from "@/lib/format";
import { funktionen } from "@/lib/funktionen";
import { getFunktionsgruppen } from "@/lib/funktionsgruppen";
import { mobileLocales, mobileOffline } from "@/lib/product-register";
import { site, tarife } from "@/lib/site";

function tarif(id: "voll" | "app") {
  const entry = tarife.find((t) => t.id === id);
  if (!entry) throw new Error(`fakten: Tarif ${id} fehlt in lib/site.ts.`);
  return entry;
}

const voll = tarif("voll");
const app = tarif("app");
const NBSP = " ";
const ZAHLWORT: Record<number, string> = { 4: "vier", 5: "fünf", 6: "sechs", 7: "sieben", 8: "acht" };

export const FAKTEN_PFAD = "/fakten-ueber-craftos" as const;

// ---------------------------------------------------------------------------
// Abschnittsfolge und Flächen (Kopf dunkel → Weiß → Warm → Weiß → Warm → CTA dunkel)
// ---------------------------------------------------------------------------

export const FAKTEN_SECTION_IDS = ["kopf", "was-ist-craftos", "produktfakten", "funktionen", "faq", "cta"] as const;
export type FaktenSectionId = (typeof FAKTEN_SECTION_IDS)[number];

export const FAKTEN_SURFACES: Readonly<Record<FaktenSectionId, "dark" | "white" | "warm">> = {
  kopf: "dark",
  "was-ist-craftos": "white",
  produktfakten: "warm",
  funktionen: "white",
  faq: "warm",
  cta: "dark",
};

/** Kopf G1 ohne Visual; H1, Title und Description kommen aus der Keyword-Map. */
export const faktenKopf = {
  eyebrow: "Fakten",
  kopfwort: "CraftOS",
  lead: "Überprüfbare Angaben zu Produkt, Plattformen, Lizenzen und Grenzen der Handwerkersoftware CraftOS.",
  secondary: { label: "Preise ansehen", href: "/preise" },
} as const;

const gruppen = getFunktionsgruppen();

/** H2 und Lead bzw. Antwort je Abschnitt (08-UI-SPEC § 9). */
export const faktenSections: Record<Exclude<FaktenSectionId, "kopf" | "cta">, { title: string; lead: string }> = {
  "was-ist-craftos": {
    title: "Was ist CraftOS?",
    lead: "CraftOS ist eine Handwerkersoftware von craftos.eu für Betriebe in Deutschland: Angebote, Plantafel, Zeiterfassung, Rechnungen und Buchhaltungsvorbereitung in einer Web-App und einer Mobile-App für iOS und Android.",
  },
  produktfakten: {
    title: "Produktfakten im Überblick",
    lead: "Jede Angabe beschreibt den freigegebenen Funktionsstand mit seinen Grenzen.",
  },
  funktionen: {
    title: "Welche Funktionen hat CraftOS?",
    lead: `CraftOS bündelt ${funktionen.length} Funktionsseiten in ${ZAHLWORT[gruppen.length] ?? String(gruppen.length)} Arbeitsabläufen von Angebot bis Team; jede Seite nennt Plattformen, Rollen und Lizenzen.`,
  },
  faq: {
    title: "Häufige Fragen zu CraftOS",
    lead: "Kurze Antworten zu Anbieter, Offline-Nutzung, GoBD und Standort.",
  },
};

/** Plattformen der Produktfamilie: Web-App, App Store, Google Play (Links aus site.ts). */
const plattformen = [site.appUrl, site.iosUrl, site.androidUrl];

export const faktenKeyFacts: { facts: KeyFact[]; note: string } = {
  facts: [
    { value: String(plattformen.length), label: "Plattformen: Web, iOS und Android", source: "site:plattformen" },
    { value: String(mobileLocales.length), label: "Sprachen in der Mobile-App", source: "register:mobileLocales" },
    { value: `${site.trialDays}${NBSP}Tage`, label: "Testphase ohne Zahlungsdaten", source: "site:trialDays" },
    { value: euro(voll.monat), label: "Voll-Lizenz pro Person und Monat, netto", source: "site:tarif-voll-monat" },
  ],
  note: `Preise netto zzgl. USt., Stand ${germanDate(site.checkedAt)}.`,
};

/** Abgrenzung zu gleichnamigen Projekten (D-25): sachlich, ohne Wertung, ohne Links auf diese Projekte. */
export const ABGRENZUNG =
  "Nicht zu verwechseln: CraftOS-PC und das CraftOS der Minecraft-Erweiterung ComputerCraft sind eigenständige Projekte mit gleichem Namen und gehören nicht zu dieser Handwerkersoftware.";

/** Produktfakten (FactList G5): Bestandsangaben auf ≤ 200 Zeichen und ≤ 2 Sätze gekürzt. */
export const produktfakten: FactListItem[] = [
  {
    term: "Plattformen",
    definition: "Web-App im Browser und Mobile-App für iOS im App Store und für Android bei Google Play.",
  },
  {
    term: voll.name,
    definition: `${euro(voll.monat)} netto pro Person und Monat oder ${euro(voll.jahr)} netto pro Jahr. Web-App und Mobile-App für dieselbe Person sind enthalten.`,
  },
  {
    term: app.name,
    definition: `${euro(app.monat)} netto pro Person und Monat oder ${euro(app.jahr)} netto pro Jahr. Ergänzung für Mitarbeitende auf der Baustelle; der Betrieb braucht mindestens eine ${voll.name}.`,
  },
  {
    term: "Testphase",
    definition: `${site.trialDays} Tage ohne Zahlungsdaten. Ein kostenpflichtiges Abo wird aktiv gewählt.`,
  },
  {
    term: "Module",
    definition: `Die freigegebenen Kernmodule einschließlich Plantafel gehören zur ${voll.name}. KI-Verbrauch und zusätzlicher Speicher können gesondert kosten.`,
  },
  {
    term: "GoBD-Unterstützung",
    definition:
      "Festschreibung, geschützte Inhalte, Dokumentversionen, Storno-Bezüge und Belegprüfung mit Protokollen unterstützen nachvollziehbare Abläufe. Das betriebliche Gesamtverfahren organisiert Ihr Betrieb.",
  },
  {
    term: "Offline-Nutzung",
    definition: `Teilweise: bereits geladene mobile Daten und ausgewählte Eingaben. ${mobileOffline.limitation} für Fotos, KI oder neue Downloads.`,
  },
  {
    term: "Standort bei der Zeiterfassung",
    definition:
      "Die Mobile-App speichert beim Starten und Stoppen des Timers je einen Standortpunkt. Bewegungsverläufe werden nicht aufgezeichnet.",
  },
  {
    term: "Einsatzkarte",
    definition:
      "Die Web-App zeigt geplante Einsatzorte mit Tages- und Mitarbeiterfilter. Aktuelle Aufenthaltsorte des Teams zeigt die Karte nicht.",
  },
  {
    term: "Unterschriften mit Standort",
    definition:
      "Mobile Unterschriften in Berichten, Abnahmen und unterstützten Kundendokumenten werden mit Ort und Zeitpunkt gespeichert. Dafür braucht die App eine Standortfreigabe.",
  },
  {
    term: "KI",
    definition:
      "Abfragen und unterstützte Entwürfe; übernommen wird erst nach Ihrer Prüfung und Bestätigung. Kein pauschales autonomes Verbuchen.",
  },
  {
    term: "Nicht zugesagt",
    definition:
      "Portal-Onlinezahlung, DATANORM-v5-Kompatibilität, automatische ELSTER-Übermittlung und autonome Buchhaltung werden nicht als verfügbar angeboten.",
  },
];

/** Label-Zeile unter der FactList: Stand aus site.checkedAt, Korrektur per E-Mail. */
export const faktenStand = {
  text: `Stand ${germanDate(site.checkedAt)}. Fehler gefunden?`,
  link: { label: "Korrektur melden", href: `mailto:${site.email}` },
} as const;

/** Funktionen: sechs Gruppenkacheln (Titel = Gruppenname, Text = Gruppenbeschreibung, Sprung auf /funktionen). */
const KACHEL_GROESSE = ["md", "sm", "sm", "sm", "sm", "md"] as const;

export const faktenKacheln: { title: string; text: string; href: string; icon: LucideIcon; size: "sm" | "md" }[] =
  gruppen.map((g, i) => ({
    title: g.label,
    text: g.description,
    href: g.anchorHref,
    icon: g.icon,
    size: KACHEL_GROESSE[i] ?? "sm",
  }));

export const faktenFaq: { q: string; a: string }[] = [
  {
    q: "Wer bietet CraftOS an?",
    a: "CraftOS wird von einem Einzelunternehmen angeboten; Name, Anschrift und Kontakt stehen im Impressum.",
  },
  {
    q: "Funktioniert CraftOS offline?",
    a: "Teilweise. Die Mobile-App zeigt bereits geladene Daten und nimmt ausgewählte Eingaben offline an; Fotos, KI und neue Downloads brauchen eine Verbindung.",
  },
  {
    q: "Unterstützt CraftOS die GoBD?",
    a: "CraftOS unterstützt GoBD-konforme Abläufe mit Festschreibung, Dokumentversionen und Protokollen; eine behördliche Zertifizierung wird nicht behauptet.",
  },
  {
    q: "Zeichnet CraftOS Bewegungen meiner Mitarbeitenden auf?",
    a: "Nein. Die Mobile-App speichert nur beim Start und Stopp der Zeiterfassung je einen Standortpunkt; Bewegungsverläufe werden nicht aufgezeichnet.",
  },
];
