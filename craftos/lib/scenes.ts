/**
 * Mini-UI-Szenen für Geräterahmen (vereinfachte Produktoberflächen mit Beispieldaten).
 *
 * Jede Szene führt zwei Belege:
 * - `evidence`: voller Beleg am Release ("web:<pfad>" bzw. "mobile:<pfad>"), nur intern –
 *   geprüft in tests/styleguide.test.ts gegen Produktregister und Funktionsbelege.
 * - `screen`: öffentliche Kurzform "web:<Bildschirm>" bzw. "app:<Bildschirm>" (D-16, LO-05);
 *   nur sie erscheint als data-evidence im HTML.
 *
 * Genutzt von Musterseite (lib/styleguide-content.ts), Startseite und /funktionen.
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

/** Alle sechs Szenen (für Belegprüfungen). */
export const allScenes: readonly FrameScene[] = [
  plantafelScene,
  zeitenScene,
  maengelScene,
  aufmassScene,
  rechnungenScene,
  einsaetzeScene,
];

/**
 * Funktions-Slug → Rahmen-Visual für die Karten auf /funktionen (06-UI-SPEC, „Visual je Karte“).
 * Slugs ohne Eintrag zeigen bewusst das Icon-Visual der FeatureCard.
 */
export const cardScenes: Readonly<Partial<Record<string, FrameVisual>>> = {
  aufmass: { kind: "phone", scene: aufmassScene },
  plantafel: { kind: "browser", scene: plantafelScene },
  zeiterfassung: { kind: "phone", scene: zeitenScene },
  baudokumentation: { kind: "phone", scene: maengelScene },
  rechnungen: { kind: "browser", scene: rechnungenScene },
};
