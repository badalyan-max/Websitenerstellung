/**
 * Mini-UI-Szenen für Geräterahmen (vereinfachte Produktoberflächen mit Beispieldaten).
 *
 * Jede Szene führt zwei Belege:
 * - `evidence`: voller Beleg am Release ("web:<pfad>" bzw. "mobile:<pfad>"), nur intern –
 *   geprüft in tests/styleguide.test.ts gegen Produktregister und Funktionsbelege.
 * - `screen`: öffentliche Kurzform "web:<Bildschirm>" bzw. "app:<Bildschirm>" (D-16, LO-05);
 *   nur sie erscheint als data-evidence im HTML.
 *
 * Genutzt von Musterseite (lib/styleguide-content.ts), Startseite, /funktionen, den Funktionsdetailseiten
 * (kopfVisuals, Phase 7) und den Phone-Kacheln von /app.
 */
import type { LucideIcon } from "lucide-react";
import type { MiniStatusName, MiniWeekEntry } from "@/components/v2/mini/MiniUi";
import type { PhoneTab } from "@/components/v2/PhoneFrame";

export interface MiniRowContent {
  primary: string;
  secondary?: string;
  value?: string;
  status?: MiniStatusName;
}

export interface FrameScene {
  /** Seitentitel in der Web-App bzw. Mobile-App (Mini-Budget 24 Zeichen). */
  title: string;
  /** Voller Beleg am Release, Form "web:<pfad>" bzw. "mobile:<pfad>" – nur intern, nie im HTML. */
  evidence: string;
  /** Öffentliche Kurzform "web:<Bildschirm>" bzw. "app:<Bildschirm>" (ohne Pfad, ohne Leerzeichen). */
  screen: string;
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

/** Visual mit Geräterahmen (Browser oder Phone). */
export type FrameVisual = Extract<Visual, { kind: "browser" | "phone" }>;

export const plantafelScene: FrameScene = {
  title: "Plantafel",
  evidence: "web:src/pages/Plantafel.tsx",
  screen: "web:Plantafel",
  description: "Wochenansicht der Plantafel mit Einsätzen auf drei Baustellen von Montag bis Freitag.",
  week: [
    { day: 0, label: "Bad Bergmann", span: 3 },
    { day: 3, label: "Bäckerei Krause", span: 2 },
    { day: 0, label: "Dach Schulte", lane: 1, span: 2 },
    { day: 2, label: "Aufmaß Weber", lane: 1 },
    { day: 1, label: "Bad Bergmann", lane: 2, span: 2 },
  ],
};

export const zeitenScene: FrameScene = {
  title: "Zeiterfassung",
  evidence: "mobile:src/features/time-tracking/screens/TimeTrackingScreen.tsx",
  screen: "app:Zeiterfassung",
  description: "Zeiterfassung in der Mobile-App mit laufendem Timer und den Zeiteinträgen des Tages.",
  activeTab: "Zeiten",
  timer: { label: "Bad Bergmann", value: "02:15:00" },
  rows: [
    { primary: "Arbeit", secondary: "Bad Bergmann", value: "4 Std. 30 Min." },
    { primary: "Fahrt", secondary: "Bad Bergmann", value: "30 Min." },
  ],
};

export const maengelScene: FrameScene = {
  title: "Mängel",
  evidence: "mobile:src/features/defects/screens/DefectsScreen.tsx",
  screen: "app:Mängel",
  description: "Mängelliste in der Mobile-App mit drei erfassten Mängeln aus zwei Projekten.",
  activeTab: "Projekte",
  rows: [
    { primary: "Silikonfuge Dusche", secondary: "Bad Bergmann" },
    { primary: "Fliese gesprungen", secondary: "Bad Bergmann" },
    { primary: "Türzarge beschädigt", secondary: "Bäckerei Krause" },
  ],
};

export const aufmassScene: FrameScene = {
  title: "Aufmaß",
  evidence: "mobile:src/features/room-measurements/screens/RoomMeasurementsScreen.tsx",
  screen: "app:Aufmaß",
  description: "Raumaufmaß in der Mobile-App mit Boden- und Wandfläche sowie einem Abzug für die Tür.",
  activeTab: "Projekte",
  rows: [
    { primary: "Bad, Boden", value: "6,4 m²" },
    { primary: "Bad, Wand", value: "21,8 m²" },
    { primary: "Abzug Tür", value: "−1,6 m²" },
  ],
};

export const rechnungenScene: FrameScene = {
  title: "Rechnungen",
  evidence: "web:src/pages/Rechnungen.tsx",
  screen: "web:Rechnungen",
  description: "Rechnungsliste der Web-App mit drei Rechnungen in den Status Gesendet, Bezahlt und Offen.",
  rows: [
    { primary: "RE-2026-041", secondary: "Bäckerei Krause", status: "Gesendet" },
    { primary: "RE-2026-040", secondary: "Bad Bergmann", status: "Bezahlt" },
    { primary: "RE-2026-039", secondary: "Dach Schulte", status: "Offen" },
  ],
};

export const einsaetzeScene: FrameScene = {
  title: "Einsätze",
  evidence: "mobile:src/features/assignments/screens/AssignmentsListScreen.tsx",
  screen: "app:Einsätze",
  description: "Einsatzliste in der Mobile-App mit den zugewiesenen Einsätzen der Woche.",
  activeTab: "Einsätze",
  rows: [
    { primary: "Bad Bergmann", secondary: "Mo–Mi", value: "07:00" },
    { primary: "Bäckerei Krause", secondary: "Do–Fr", value: "07:30" },
  ],
};

// ---------------------------------------------------------------------------
// Phase 7: Kopf-Szenen der Detailseiten (07-UI-SPEC „Szenenkatalog – Detailseiten“, D-05, MEDIA-01).
// Titel, Feldnamen und Status wörtlich aus dem Release (A3); Namen, Daten und Beträge sind fiktiv.
// ---------------------------------------------------------------------------

export const dashboardScene: FrameScene = {
  title: "Übersicht",
  evidence: "web:src/pages/Dashboard.tsx",
  screen: "web:Übersicht",
  description: "Übersicht der Web-App mit drei aktuellen Projekten, ihrem Status und dem jeweiligen Fälligkeitsdatum.",
  rows: [
    { primary: "Bad Bergmann", secondary: "Fällig am 31.10.", status: "In Arbeit" },
    { primary: "Dach Schulte", secondary: "Fällig am 14.11.", status: "Geplant" },
    { primary: "Bäckerei Krause", secondary: "Fällig am 07.11.", status: "In Arbeit" },
  ],
};

export const projekteScene: FrameScene = {
  title: "Projekte",
  evidence: "mobile:src/features/projects/screens/ProjectsScreen.tsx",
  screen: "app:Projekte",
  description: "Projektliste in der Mobile-App mit drei Projekten in unterschiedlichem Status.",
  activeTab: "Projekte",
  rows: [
    { primary: "Bad Bergmann", status: "In Arbeit" },
    { primary: "Dach Schulte", status: "Geplant" },
    { primary: "Praxis Yilmaz", status: "Abgeschlossen" },
  ],
};

export const angebotScene: FrameScene = {
  title: "Angebot",
  evidence: "web:src/pages/DocumentEditorPage.tsx",
  screen: "web:Angebot",
  description: "Angebotsentwurf in der Web-App mit drei Positionen und ihren Beträgen.",
  rows: [
    { primary: "AN-2026-018", secondary: "Bad Bergmann", status: "Entwurf" },
    { primary: "Wandfliesen verlegen", value: "1.104,00 €" },
    { primary: "Abdichtung Dusche", value: "286,00 €" },
    { primary: "Fliesen verfugen", value: "312,80 €" },
  ],
};

export const eRechnungScene: FrameScene = {
  title: "E-Rechnung",
  evidence: "web:src/components/documents/EInvoiceDownloadDialog.tsx",
  screen: "web:E-Rechnung",
  description: "E-Rechnung zu einer gesendeten Rechnung mit den beiden Formaten XRechnung und ZUGFeRD.",
  rows: [
    { primary: "RE-2026-041", secondary: "Bäckerei Krause", status: "Gesendet" },
    { primary: "XRechnung", secondary: "XML (UBL 2.1)" },
    { primary: "ZUGFeRD", secondary: "PDF/A-3 (hybrid)" },
  ],
};

export const buchhaltungScene: FrameScene = {
  title: "Buchhaltung",
  evidence: "web:src/pages/SteuerberaterExport.tsx",
  screen: "web:Steuerberater-Export",
  description:
    "Steuerberater-Export der Web-App mit Zeitraum, Prüfung, Festschreiben und Übergabe im Kontenrahmen SKR03.",
  rows: [
    { primary: "Zeitraum", value: "01.07.–30.09.2026" },
    { primary: "Prüfung" },
    { primary: "Festschreiben" },
    { primary: "Übergabe", value: "SKR03" },
  ],
};

export const belegScene: FrameScene = {
  title: "Beleg scannen",
  evidence: "mobile:src/features/supplier-invoices/screens/ScanReceiptScreen.tsx",
  screen: "app:Belegscan",
  description:
    "Belegscan in der Mobile-App mit erkanntem Lieferanten, Rechnungsdatum, Nettobetrag und zugeordnetem Projekt.",
  activeTab: "Mehr",
  rows: [
    { primary: "Lieferant", value: "Baustoff Weber" },
    { primary: "Rechnungsdatum", value: "14.10.2026" },
    // Release-Feldname im Scan-Formular: „Nettobetrag (€)“ (de/invoices.json fields.netAmount)
    { primary: "Nettobetrag (€)", value: "184,20" },
    { primary: "Projekt", value: "Bad Bergmann" },
  ],
};

export const lagerScene: FrameScene = {
  title: "Lager",
  evidence: "web:src/pages/Lager.tsx",
  screen: "web:Lager",
  description: "Lagerbestand der Web-App mit drei Artikeln, ihrem Lagerort und der vorhandenen Menge.",
  rows: [
    { primary: "Wandfarbe, 10 Liter", secondary: "Hauptlager", value: "24 Stk." },
    { primary: "Silikon transparent", secondary: "Fahrzeug 2", value: "36 Stk." },
    { primary: "Fliesenkleber 25 kg", secondary: "Hauptlager", value: "12 Sack" },
  ],
};

export const bautagesberichteScene: FrameScene = {
  title: "Bautagesberichte",
  evidence: "mobile:src/features/construction-reports/screens/ConstructionReportsScreen.tsx",
  screen: "app:Bautagesberichte",
  description: "Bautagesberichte in der Mobile-App mit drei Berichten aus zwei Projekten und ihrem Status.",
  activeTab: "Projekte",
  rows: [
    { primary: "21.10.2026", secondary: "Bad Bergmann", status: "Entwurf" },
    { primary: "20.10.2026", secondary: "Bad Bergmann", status: "Unterschrieben" },
    { primary: "17.10.2026", secondary: "Dach Schulte", status: "Abgeschlossen" },
  ],
};

export const arbeitsschritteScene: FrameScene = {
  title: "Arbeitsschritte",
  evidence: "mobile:src/features/work-steps/components/WorkStepsSection.tsx",
  screen: "app:Arbeitsschritte",
  description: "Arbeitsschritte eines Projekts in der Mobile-App, von denen zwei bereits erledigt sind.",
  activeTab: "Projekte",
  rows: [
    { primary: "Untergrund prüfen", value: "erledigt" },
    { primary: "Abdichtung auftragen", value: "erledigt" },
    { primary: "Fliesen verlegen" },
  ],
};

export const mitarbeiterScene: FrameScene = {
  title: "Mitarbeiter",
  evidence: "web:src/pages/Mitarbeiter.tsx",
  screen: "web:Mitarbeiter",
  description: "Mitarbeiterliste der Web-App mit vier Personen und ihren Rollen von Admin bis Mobil-Teammitglied.",
  rows: [
    // Rollennamen: web:src/lib/subscription/roles.ts
    { primary: "Anna Weber", value: "Admin" },
    { primary: "Jonas Krüger", value: "Büro-Leitung" },
    { primary: "Mehmet Aydin", value: "Mobil-Teamleitung" },
    { primary: "Lena Schulz", value: "Mobil-Teammitglied" },
  ],
};

export const kalkulationScene: FrameScene = {
  title: "Kalkulation",
  evidence: "web:src/components/projects/ProjectControllingTab.tsx",
  screen: "web:Kalkulation",
  description: "Projektkalkulation der Web-App mit Einnahmen, Gesamtkosten, Marge und Budgetverbrauch eines Projekts.",
  rows: [
    { primary: "Einnahmen (netto)", value: "18.400 €" },
    { primary: "Gesamtkosten", value: "14.950 €" },
    { primary: "Marge", value: "18,8 %" },
    { primary: "Budgetverbrauch", value: "81 %" },
  ],
};

/**
 * Kundenportal (09-16, Release a0e27c42): Die Angebotsmail verlinkt die öffentliche Unterschriftsseite
 * (QuoteSigning.tsx); keine Mail verlinkt die Portal-Rechnungsansicht. Die Szene zeigt deshalb das Angebot
 * mit den Feldnamen des Formulars „Angebot annehmen und unterschreiben“ (A3: wörtlich aus dem Release).
 */
export const portalScene: FrameScene = {
  title: "Angebot AN-2026-018",
  evidence: "web:src/pages/QuoteSigning.tsx",
  screen: "web:Angebotsunterschrift",
  description: "Angebot online ansehen und unterschreiben: Formular mit Name, Unterschriftsfeld und optionalem Kommentar aus Sicht des Kunden.",
  rows: [
    { primary: "Vor- und Nachname", value: "Petra Bergmann" },
    { primary: "Unterschrift" },
    { primary: "Kommentar (optional)" },
  ],
};

export const gaebScene: FrameScene = {
  title: "Positionsvorschau",
  evidence: "web:src/components/DocumentEditor/GAEBImportDialog.tsx",
  screen: "web:GAEB-Import",
  description: "Positionsvorschau beim GAEB-Import mit einer Leistungsposition, einer Textposition und einer Bedarfsposition.",
  rows: [
    { primary: "Wandfliesen verlegen", value: "42,5 m²" },
    // Positionskennzeichen aus getTypeBadge (Text, Bedarf) als MiniStatus
    { primary: "Hinweis Fliesenformat", status: "Text" },
    { primary: "Mehrfläche Abdichtung", status: "Bedarf" },
  ],
};

export const mahnwesenScene: FrameScene = {
  title: "Mahnwesen",
  evidence: "web:src/pages/settings/MahnwesenSettings.tsx",
  screen: "web:Mahnwesen",
  description: "Mahnwesen-Einstellungen der Web-App mit drei Mahnstufen, ihren Fristen und der Mahngebühr.",
  rows: [
    { primary: "Zahlungserinnerung", value: "7 Tage" },
    { primary: "1. Mahnung", value: "21 Tage" },
    { primary: "2. Mahnung", value: "35 Tage" },
    { primary: "Mahngebühr", value: "5,00 €" },
  ],
};

export const projektplanScene: FrameScene = {
  title: "Projektplan",
  evidence: "web:src/components/plantafel/ProjectGanttView.tsx",
  screen: "web:Projektplan",
  description: "Projektplan der Web-App mit drei aufeinanderfolgenden Arbeitsabschnitten in einer Arbeitswoche.",
  week: [
    { day: 0, label: "Rohbau", span: 2 },
    { day: 2, label: "Abdichtung", lane: 1 },
    { day: 3, label: "Fliesen", lane: 2, span: 2 },
  ],
};

export const arbeitsabschnitteScene: FrameScene = {
  title: "Arbeitsabschnitte",
  evidence: "mobile:src/features/projects/components/ProjectPhaseSummary.tsx",
  screen: "app:Arbeitsabschnitte",
  description: "Arbeitsabschnitte eines Projekts in der Mobile-App mit dem Status jedes Abschnitts.",
  activeTab: "Projekte",
  rows: [
    { primary: "Rohbau", status: "Abgeschlossen" },
    { primary: "Abdichtung", status: "In Arbeit" },
    { primary: "Fliesen", status: "Geplant" },
  ],
};

export const bankScene: FrameScene = {
  title: "Bankumsätze",
  evidence: "web:src/pages/Bankumsaetze.tsx",
  screen: "web:Bankumsätze",
  description: "Bankumsätze der Web-App mit zwei zugeordneten Zahlungen und einem noch offenen Umsatz.",
  rows: [
    // Beide Status zuerst: Die Kartenvariante zeigt nur die ersten KARTEN_ZEILEN Zeilen (07-04).
    { primary: "+ 2.380,00 €", secondary: "Bäckerei Krause", status: "Zugeordnet" },
    { primary: "+ 960,00 €", secondary: "Bad Bergmann", status: "Noch nicht zugeordnet" },
    { primary: "− 184,20 €", secondary: "Baustoff Weber", status: "Zugeordnet" },
  ],
};

export const importScene: FrameScene = {
  title: "Daten übernehmen",
  evidence: "web:src/pages/Datenimport.tsx",
  screen: "web:Datenübernahme",
  description: "Datenübernahme der Web-App mit Importen für Kunden, Projekte und Stammdaten aus CSV- und Excel-Dateien.",
  rows: [
    { primary: "Kunden importieren", secondary: "kunden.csv" },
    { primary: "Projekte importieren", secondary: "projekte.xlsx" },
    { primary: "Stammdaten importieren", secondary: "artikel.csv" },
  ],
};

/** Mängel mit Status (App-Begriff „In Bearbeitung“, Pitfall 7); `maengelScene` bleibt für / unverändert. */
export const maengelStatusScene: FrameScene = {
  title: "Mängel",
  evidence: "mobile:src/features/defects/screens/DefectsScreen.tsx",
  screen: "app:Mängel",
  description: "Mängelliste in der Mobile-App mit drei Mängeln und ihrem jeweiligen Bearbeitungsstand.",
  activeTab: "Projekte",
  rows: [
    { primary: "Silikonfuge Dusche", status: "Offen" },
    { primary: "Fliese gesprungen", status: "In Bearbeitung" },
    { primary: "Türzarge beschädigt", status: "Behoben" },
  ],
};

// ---------------------------------------------------------------------------
// Phase 7: zusätzliche Phone-Szenen der /app-Kacheln (07-UI-SPEC „/app-Kacheln“).
// ---------------------------------------------------------------------------

export const urlaubScene: FrameScene = {
  title: "Meine Urlaubsanträge",
  evidence: "mobile:src/features/vacation/components/VacationTab.tsx",
  screen: "app:Urlaub",
  description: "Urlaubsanträge in der Mobile-App mit einem genehmigten und einem ausstehenden Antrag.",
  activeTab: "Zeiten",
  rows: [
    { primary: "27.–31.10.2026", secondary: "5 Tage", status: "Genehmigt" },
    { primary: "22.–23.12.2026", secondary: "2 Tage", status: "Ausstehend" },
  ],
};

export const abnahmeScene: FrameScene = {
  title: "Abnahmeprotokolle",
  evidence: "mobile:src/features/acceptance/screens/AcceptanceProtocolsScreen.tsx",
  screen: "app:Abnahme",
  description: "Abnahmeprotokolle in der Mobile-App mit einer Teilabnahme und einer Abnahme mit Mängeln.",
  activeTab: "Projekte",
  rows: [
    { primary: "Bad Bergmann", secondary: "Teilabnahme", status: "Abgenommen" },
    { primary: "Bäckerei Krause", secondary: "21.10.2026", status: "Abgenommen mit Mängeln" },
  ],
};

export const lagerAppScene: FrameScene = {
  title: "Lager",
  evidence: "mobile:src/features/inventory/screens/InventoryScreen.tsx",
  screen: "app:Lager",
  description: "Lager in der Mobile-App mit zwei Materialartikeln, einem Werkzeug und ihrem Bestand.",
  activeTab: "Mehr",
  rows: [
    { primary: "Wandfarbe, 10 Liter", secondary: "Hauptlager", value: "24" },
    { primary: "Silikon transparent", secondary: "Fahrzeug 2", value: "36" },
    { primary: "Akku-Bohrhammer", secondary: "Werkzeuge", value: "1" },
  ],
};

/** Alle Szenen genau einmal (für Beleg-, Budget- und Renderprüfungen): 6 Bestand + 22 aus Phase 7. */
export const allScenes: readonly FrameScene[] = [
  // Bestand (Phase 5/6)
  plantafelScene,
  zeitenScene,
  maengelScene,
  aufmassScene,
  rechnungenScene,
  einsaetzeScene,
  // Kopf-Szenen Detailseiten (Phase 7)
  dashboardScene,
  projekteScene,
  angebotScene,
  eRechnungScene,
  buchhaltungScene,
  belegScene,
  lagerScene,
  bautagesberichteScene,
  arbeitsschritteScene,
  mitarbeiterScene,
  kalkulationScene,
  portalScene,
  gaebScene,
  mahnwesenScene,
  projektplanScene,
  arbeitsabschnitteScene,
  bankScene,
  importScene,
  maengelStatusScene,
  // /app-Kacheln (Phase 7)
  urlaubScene,
  abnahmeScene,
  lagerAppScene,
];

/**
 * Phase 9 (D-15, 09-RESEARCH Pattern 3): Szenen-ID → Szene für das Frontmatter-Feld `scene` der Artikel.
 * Schlüssel = Exportname ohne „Scene“; enthält jedes Element aus `allScenes` genau einmal (Test in
 * tests/content.test.ts). Rein additiv – Inhaltspakete legen keine neuen Szenen an.
 */
export const sceneById: Readonly<Record<string, FrameScene>> = {
  plantafel: plantafelScene,
  zeiten: zeitenScene,
  maengel: maengelScene,
  aufmass: aufmassScene,
  rechnungen: rechnungenScene,
  einsaetze: einsaetzeScene,
  dashboard: dashboardScene,
  projekte: projekteScene,
  angebot: angebotScene,
  eRechnung: eRechnungScene,
  buchhaltung: buchhaltungScene,
  beleg: belegScene,
  lager: lagerScene,
  bautagesberichte: bautagesberichteScene,
  arbeitsschritte: arbeitsschritteScene,
  mitarbeiter: mitarbeiterScene,
  kalkulation: kalkulationScene,
  portal: portalScene,
  gaeb: gaebScene,
  mahnwesen: mahnwesenScene,
  projektplan: projektplanScene,
  arbeitsabschnitte: arbeitsabschnitteScene,
  bank: bankScene,
  import: importScene,
  maengelStatus: maengelStatusScene,
  urlaub: urlaubScene,
  abnahme: abnahmeScene,
  lagerApp: lagerAppScene,
};

/** Rahmenart einer Szene für Artikel (09-UI-SPEC § 2.2): Kurzform „web:…“ → Browser, „app:…“ → Phone. */
export function sceneFrame(scene: FrameScene): FrameVisual["kind"] {
  return scene.screen.startsWith("app:") ? "phone" : "browser";
}

/**
 * Kopf-Visual einer Detailseite: eine Szene im Browser- oder Phone-Rahmen oder ein Paar
 * (Web-App und Mobile-App) mit gemeinsamer Beschreibung (≤ 140 Zeichen, 1 Satz).
 */
export type KopfVisual =
  | { kind: "browser" | "phone"; scene: FrameScene }
  | { kind: "pair"; browser: FrameScene; phone: FrameScene; description: string };

/** Funktions-Slug → Kopf-Visual für alle 22 Detailfunktionen (07-UI-SPEC Szenenkatalog, D-05). */
export const kopfVisuals: Readonly<Record<string, KopfVisual>> = {
  dashboard: { kind: "browser", scene: dashboardScene },
  projektverwaltung: { kind: "phone", scene: projekteScene },
  angebote: { kind: "browser", scene: angebotScene },
  rechnungen: { kind: "browser", scene: rechnungenScene },
  "e-rechnung": { kind: "browser", scene: eRechnungScene },
  buchhaltung: { kind: "browser", scene: buchhaltungScene },
  eingangsrechnungen: { kind: "phone", scene: belegScene },
  plantafel: {
    kind: "pair",
    browser: plantafelScene,
    phone: einsaetzeScene,
    // Bestand der Startseite (lib/home-content.ts hero.pairDescription)
    description:
      "Plantafel der Web-App mit Wochenplanung und daneben die Einsatzliste der Mobile-App mit denselben Einsätzen.",
  },
  zeiterfassung: { kind: "phone", scene: zeitenScene },
  lager: { kind: "browser", scene: lagerScene },
  baudokumentation: { kind: "phone", scene: bautagesberichteScene },
  aufmass: { kind: "phone", scene: aufmassScene },
  arbeitsanweisungen: { kind: "phone", scene: arbeitsschritteScene },
  team: { kind: "browser", scene: mitarbeiterScene },
  nachkalkulation: { kind: "browser", scene: kalkulationScene },
  kundenportal: { kind: "browser", scene: portalScene },
  gaeb: { kind: "browser", scene: gaebScene },
  mahnwesen: { kind: "browser", scene: mahnwesenScene },
  terminplanung: {
    kind: "pair",
    browser: projektplanScene,
    phone: arbeitsabschnitteScene,
    description:
      "Projektplan der Web-App mit drei Arbeitsabschnitten und daneben dieselben Abschnitte mit Status in der Mobile-App.",
  },
  bankabgleich: { kind: "browser", scene: bankScene },
  datenuebernahme: { kind: "browser", scene: importScene },
  maengelmanagement: { kind: "phone", scene: maengelStatusScene },
};

/**
 * Funktions-Slug → Rahmen-Visual für die Karten auf /funktionen und „Passende Funktionen“.
 * Abgeleitet aus `kopfVisuals` (bei Paar die Browser-Szene), nicht separat gepflegt.
 */
export const cardScenes: Readonly<Partial<Record<string, FrameVisual>>> = Object.fromEntries(
  Object.entries(kopfVisuals).map(([slug, visual]): [string, FrameVisual] => [
    slug,
    visual.kind === "pair" ? { kind: "browser", scene: visual.browser } : { kind: visual.kind, scene: visual.scene },
  ]),
);
