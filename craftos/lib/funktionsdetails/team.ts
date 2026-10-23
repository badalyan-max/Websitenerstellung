import {
  BookOpen,
  CalendarOff,
  FileSpreadsheet,
  Info,
  KeyRound,
  Languages,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { mobileLocales } from "@/lib/product-register";
import type { FunktionsdetailInhalt } from "./types";

/**
 * Inhalte der Gruppe Team: team, datenuebernahme (Phase 7, Plan 07-06; FEAT-02, D-02, D-03, D-04, D-21, D-23).
 *
 * Quellen (nur belegte Aussagen):
 * - 07-UI-SPEC: „Seitentexte“, „Ablaufschritte“, Abschnitte 3–6 – wörtlich übernommen.
 * - lib/funktionen.ts: points, steps, access, note der zwei Slugs; lib/site.ts Lizenznamen (Voll-Lizenz, App-Lizenz).
 * - Hilfeartikel content/hilfe/rollen-zugriffsrechte-einstellen.md.
 * - Web-Release (nur lesend, origin/release): src/lib/subscription/roles.ts `ROLES` (fünf Presets, „Rollen und Sitze
 *   vergibt nur der Inhaber. Weitere Admins belegen Büro-Sitze.“, Lizenzbeschreibungen Admin/Büro „Web + App“,
 *   App „Nur App“), src/types/license.ts `FEATURE_ACCESS` (team_verwaltung nur admin),
 *   src/pages/Datenimport.tsx („Admin oder Büro-Leitung“, „Kostenlos – die KI-Kosten für den Import übernehmen wir.“,
 *   „keine Zahlungsdaten“, Bereiche Kunden, Projekte, Stammdaten), src/lib/import/vendorSources.json (10 Anbieter),
 *   src/lib/import/readImportSources.ts (CSV, TSV, TXT, XLSX; 10 MiB je Datei).
 * - Mobile-Release laut Register: src/features/vacation/components/VacationTab.tsx (Urlaubsanträge in der App).
 *
 * D-21: Die Zusatzfunktion „{n} Sprachen in der Mobile-App“ steht als Kachel mit Ziel /hilfe/app-sprache-einstellen
 * (09-14, vorher /app); die Zahl kommt immer aus mobileLocales.length, nie als Literal. W13: Projekt-Chat steht
 * zusätzlich als Kernpunkt-Kachel mit Ziel /hilfe/projekt-chat-nachrichten (Anordnung md·sm·sm·md·sm·sm).
 */
const sprachen = mobileLocales.length;

export const teamInhalte: Record<string, FunktionsdetailInhalt> = {
  team: {
    slug: "team",
    kopfwort: "Mitarbeiter-App",
    lead: "Mitarbeitende einladen, Lizenz und Rolle zuweisen und Urlaubsanträge aus der App bearbeiten.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/rollen-zugriffsrechte-einstellen" },
    ablauf: {
      title: "Team und Rechte in vier Schritten",
      lead: "Vom Einladen bis zum Urlaubsantrag passt jeder Zugang zur Aufgabe.",
      steps: [
        { title: "Mitglied einladen", text: "Mitarbeitende einladen und den passenden Lizenztyp zuweisen." },
        { title: "Rolle wählen", text: "Eines von fünf Rollen-Presets wählen und die Rechte prüfen." },
        { title: "Aufgaben zuordnen", text: "Projekte und Einsätze dem Aufgabenbereich zuordnen." },
        { title: "Urlaub bearbeiten", text: "Urlaubsanträge aus der App genehmigen oder ablehnen." },
      ],
    },
    rollen: {
      title: "Wer im Team was einstellt",
      lead: "Das Team verwaltet der Admin in der Web-App, Mitarbeitende arbeiten mit ihrer Rolle in der Mobile-App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin", zusatz: "Rollen und Sitze vergibt nur der Inhaber" }],
          satz: "Im Büro laden Sie Mitarbeitende ein und weisen Lizenz und Rolle zu.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [{ name: "Mobil-Teamleitung" }, { name: "Mobil-Teammitglied" }],
          satz: "In der App beantragen Mitarbeitende Urlaub und arbeiten mit den Rechten ihrer Rolle.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was Team und Rechte leisten",
      lead: "Lizenzen, Rollen, Abwesenheiten und Nachrichten bilden den Rahmen für Ihr Team.",
      tiles: [
        {
          size: "md",
          title: `${sprachen} Sprachen in der Mobile-App`,
          text: `Mitarbeitende nutzen die Mobile-App in einer von ${sprachen} Sprachen.`,
          visual: { kind: "icon", icon: Languages },
          href: "/hilfe/app-sprache-einstellen",
          zusatz: "sprachen",
        },
        {
          size: "sm",
          title: "Passende Zugänge",
          // L-1-Altbegriff (09-14): Lizenzname aus lib/site.ts („Voll-Lizenz“), Typen laut roles.ts LICENSE_TYPES.
          text: "Die Voll-Lizenz (Admin oder Büro) öffnet Web und App, die App-Lizenz nur die App.",
          visual: { kind: "icon", icon: KeyRound },
        },
        {
          size: "sm",
          title: "Fünf Rollen-Presets",
          text: "Vorgegebene Rollen erleichtern die Einrichtung, einzelne Rechte bleiben prüfbar.",
          visual: { kind: "icon", icon: ShieldCheck },
        },
        {
          // W13 (09-14): Projekt-Chat auch auf team; Beleg Register liveExtras „Projekt-Chat und Nachrichten“
          // (mobile ChatScreen.tsx, InboxScreen.tsx, DirectChatScreen.tsx „Kollege auswählen“).
          size: "md",
          title: "Projekt-Chat und Nachrichten",
          text: "Rückfragen im Projekt-Chat klären und Kollegen in der App Direktnachrichten schreiben.",
          visual: { kind: "icon", icon: MessagesSquare },
          href: "/hilfe/projekt-chat-nachrichten",
        },
        {
          size: "sm",
          title: "Abwesenheiten berücksichtigen",
          text: "Urlaubsanträge und ihre Bearbeitung ergänzen die Team- und Einsatzplanung.",
          visual: { kind: "icon", icon: CalendarOff },
        },
        {
          // Wer Rollen und Sitze vergibt, nennen Admin-Zusatz im Web-Panel und die FAQ („nur der Inhaber“).
          size: "sm",
          title: "Lizenz und Rolle sind getrennt",
          text: "Die Lizenz bestimmt Zugang und Preis, die Rolle die Rechte des Mitglieds.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Mitarbeiter-App",
      lead: "Kurze Antworten zu Lizenz, Rollen, Rechtevergabe und Urlaub.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts team note, roles.ts LICENSE_TYPES (Admin/Büro
        // „Web + App“, App „Nur App“) und ROLES; lib/site.ts Lizenznamen.
        {
          q: "Was ist der Unterschied zwischen Lizenz und Rolle?",
          a: "Die Lizenz bestimmt Zugang und Preis, die Rolle die Rechte. Die Voll-Lizenz öffnet Web-App und Mobile-App für Admin und Büro, die App-Lizenz nur die Mobile-App; die Rolle legt darüber etwa Finanzsicht und Projektzugriff fest.",
        },
        // Quelle: roles.ts ROLES (Labels und Beschreibungen der fünf Presets).
        {
          q: "Welche Rollen-Presets gibt es in CraftOS?",
          a: "Es gibt fünf: Admin, Büro-Leitung, Büro-Projektleitung, Mobil-Teamleitung und Mobil-Teammitglied. Die Büro-Leitung sieht alle Projekte und globale Finanzen, die Büro-Projektleitung zugewiesene und eigene Projekte, und die Mobil-Teamleitung erfasst auch Zeiten anderer.",
        },
        // Quelle: roles.ts ROLES admin („Rollen und Sitze vergibt nur der Inhaber. Weitere Admins belegen Büro-Sitze.“);
        // FEATURE_ACCESS team_verwaltung nur admin.
        {
          q: "Wer vergibt Rollen und Sitze im Team?",
          a: "Rollen und Sitze vergibt nur der Inhaber des Betriebs. Weitere Admins verwalten den Betrieb mit und belegen dabei Büro-Sitze.",
        },
        // Quelle: Register mobileEvidence team (src/features/vacation/components/VacationTab.tsx); funktionen.ts team
        // points „Abwesenheiten berücksichtigen“.
        {
          q: "Können Mitarbeitende Urlaub in der App beantragen?",
          a: "Ja. Mitarbeitende stellen Urlaubsanträge in der Mobile-App, und Sie genehmigen oder lehnen sie ab. Die Abwesenheiten ergänzen die Team- und Einsatzplanung.",
        },
      ],
    },
    verwandt: ["datenuebernahme", "dashboard"],
  },

  datenuebernahme: {
    slug: "datenuebernahme",
    kopfwort: "Datenimport",
    lead: "Kunden, Projekte und Stammdaten aus Dateien prüfen, zuordnen und kontrolliert in CraftOS übernehmen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/daten-importieren" },
    ablauf: {
      title: "Datenimport in vier Schritten",
      lead: "Von der Exportdatei bis zur Übernahme prüfen Sie jeden Schritt selbst.",
      steps: [
        { title: "Export vorbereiten", text: "Daten aus der bisherigen Software nach Anleitung exportieren." },
        { title: "Datei hochladen", text: "CSV- oder Excel-Datei im Assistenten hochladen." },
        { title: "Spalten zuordnen", text: "Die kostenlose Import-KI schlägt Zuordnungen vor, Sie prüfen sie." },
        { title: "Kontrolliert übernehmen", text: "Kunden, Projekte oder Stammdaten nach Ihrer Prüfung übernehmen." },
      ],
    },
    rollen: {
      title: "Wer den Datenimport startet",
      lead: "Der Import läuft in der Web-App und ist Admin und Büro-Leitung vorbehalten.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }],
          satz: "Im Büro laden Sie Dateien hoch, prüfen Zuordnungen und übernehmen die Daten.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was der Datenimport leistet",
      lead: "Anleitungen, Formate und Import-KI erleichtern den Umstieg.",
      tiles: [
        {
          size: "md",
          title: "Anleitungen für 10 Anbieter",
          text: "Exportanleitungen etwa für Craftnote, plancraft, HERO und TAIFUN erleichtern den Umstieg.",
          visual: { kind: "icon", icon: BookOpen },
        },
        {
          size: "sm",
          title: "Gängige Dateiformate",
          text: "CSV, TSV, TXT und XLSX lassen sich einlesen.",
          visual: { kind: "icon", icon: FileSpreadsheet },
        },
        {
          size: "sm",
          title: "Kostenlose Import-KI",
          text: "Für die Import-KI hinterlegen Sie keine Zahlungsdaten.",
          visual: { kind: "icon", icon: Sparkles },
        },
        {
          size: "wide",
          title: "Bis 10 MiB und 25.000 Zeilen",
          text: "Je Datei gelten höchstens 10 MiB und 25.000 Zeilen, den Import starten Admin oder Büro-Leitung.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zum Datenimport",
      lead: "Kurze Antworten zu Anbietern, Formaten, Kosten und Grenzen.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: vendorSources.json (10 Anbieter), readImportSources.ts (Formate).
        {
          q: "Aus welcher Software kann ich Daten übernehmen?",
          a: "Exportanleitungen gibt es für 10 Anbieter: Craftnote, plancraft, HERO, BauSU, TAIFUN, TopKontor, HAPAK, STREIT, Labelwin und SCC-CONTROL. Aus anderer Software übernehmen Sie Daten, wenn sie sich als CSV, TSV, TXT oder XLSX exportieren lassen.",
        },
        // Quelle: Datenimport.tsx („Kostenlos – die KI-Kosten für den Import übernehmen wir.“, „Für die kostenlose
        // Import-KI musst du keine Zahlungsdaten hinterlegen.“).
        {
          q: "Was kostet die Import-KI?",
          a: "Nichts. Die KI-Kosten für den Import übernimmt CraftOS, und Sie hinterlegen dafür keine Zahlungsdaten.",
        },
        // Quelle: Datenimport.tsx (Bereiche „Kunden importieren“, „Projekte importieren“, „Stammdaten importieren“,
        // „Dateien prüfen, Daten zuordnen und kontrolliert übernehmen.“).
        {
          q: "Welche Daten kann ich importieren?",
          a: "Kunden, Projekte und Stammdaten übernehmen Sie in eigenen Importbereichen. Die Import-KI schlägt Spaltenzuordnungen vor, übernommen wird erst nach Ihrer Prüfung.",
        },
        // Quelle: funktionen.ts datenuebernahme note; readImportSources.ts („Die Datei ist größer als 10 MiB; bitte den
        // Export aufteilen.“).
        {
          q: "Wie groß darf eine Importdatei sein?",
          a: "Je Datei gelten höchstens 10 MiB und 25.000 Zeilen. Größere Exporte teilen Sie vor dem Hochladen auf.",
        },
      ],
    },
    verwandt: ["team", "buchhaltung"],
  },
};
