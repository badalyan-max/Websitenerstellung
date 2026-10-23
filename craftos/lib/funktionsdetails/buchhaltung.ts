import {
  BookOpen,
  ChartPie,
  CircleCheck,
  ClipboardCheck,
  CopyCheck,
  FileOutput,
  FolderKanban,
  Gauge,
  Info,
  LayoutDashboard,
  LayoutGrid,
  Receipt,
  ScanLine,
  TrendingUp,
  Upload,
  Wallet,
} from "lucide-react";
import type { FunktionsdetailInhalt } from "./types";

/**
 * Inhalte der Gruppe Buchhaltung: buchhaltung, eingangsrechnungen, nachkalkulation, dashboard, bankabgleich
 * (Phase 7, Plan 07-06; FEAT-02, D-02, D-03, D-04, D-22, D-23).
 *
 * Quellen (nur belegte Aussagen):
 * - 07-UI-SPEC: „Seitentexte“, „Ablaufschritte“, Abschnitte 3–6 – wörtlich übernommen.
 * - lib/funktionen.ts: points, steps, access, note der fünf Slugs.
 * - Hilfeartikel content/hilfe/datev-export-erstellen.md, beleg-scannen-pruefen.md, zahlungen-erfassen.md.
 * - Web-Release (nur lesend, origin/release): src/pages/SteuerberaterExport.tsx (Zeitraum, „Ist alles vollständig?“,
 *   „Festschreiben (GoBD)“, Steuerberater-Paket als ZIP mit DATEV-Buchungsstapel, Belegen, Buchungsjournal,
 *   Offene-Posten-Liste und Zeiten-Nachweis, alternativ „Nur Buchungsdaten (CSV)“; sichtbar nur mit
 *   Finanz-Berechtigung), src/pages/Bankumsaetze.tsx (Zuordnungsstatus Offen/Zugeordnet, „Mögliche Dublette · bitte
 *   prüfen“, Finanzrechte), src/components/buchhaltung/BankImportDialog.tsx (CSV und camt.053 bis 2 MiB, PDF bis
 *   10 MiB, höchstens 2.000 Umsätze, EUR-Konten; CSV und camt.053 ohne KI-Credits; PDF-Auslesung mit KI gegen Credits;
 *   „Diese Datei wurde bereits importiert.“), src/components/buchhaltung/BankAllocationDialog.tsx (kostenlose
 *   Hervorhebung passender Belegnummern, Namen und Beträge; KI-Vorschläge erst nach Bestätigung des
 *   Credit-Verbrauchs), src/api/bankImportAssistant.ts, src/pages/Dashboard.tsx und
 *   src/components/dashboard/StatsOverviewWidget.tsx, RevenueTrendChart.tsx, DashboardCustomizeSheet.tsx.
 * - Rollen: src/types/license.ts FEATURE_ACCESS `finanzen` nur admin, Büro über den Schalter finanzen_sichtbar
 *   (Preset Büro-Leitung); die Finanzseiten nennen deshalb nur Admin und Büro-Leitung.
 *
 * Wortregeln: Der Bankabgleich verbindet keine Bank und ordnet nichts selbsttätig zu – Import per Datei, KI-Vorschläge
 * nur auf Anforderung gegen Credits. Grenze-Kacheln von buchhaltung und eingangsrechnungen verlinken auf /gobd.
 */
export const buchhaltungInhalte: Record<string, FunktionsdetailInhalt> = {
  buchhaltung: {
    slug: "buchhaltung",
    kopfwort: "Buchhaltung",
    lead: "Belege prüfen, Zeiträume festschreiben und Buchungsdaten mit Belegbezug für DATEV übergeben.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/datev-export-erstellen" },
    ablauf: {
      title: "Buchhaltung in vier Schritten",
      lead: "Vom Zeitraum bis zur Übergabe bereiten Sie die Daten für Ihre Steuerberatung vor.",
      steps: [
        { title: "Zeitraum wählen", text: "Im Steuerberater-Export den Zeitraum für die Übergabe festlegen." },
        { title: "Vollständigkeit prüfen", text: "Der Vollständigkeits-Check zeigt fehlende Angaben mit Link zur Korrektur." },
        { title: "Festschreiben", text: "Den geprüften Zeitraum festschreiben, damit Buchungen unverändert bleiben." },
        { title: "Übergeben", text: "CSV- oder ZIP-Ausgabe erzeugen und den Import mit der Steuerberatung abstimmen." },
      ],
    },
    rollen: {
      title: "Wer die Buchhaltung vorbereitet",
      lead: "Die Übergabe an die Steuerberatung sehen nur Admin und Büro-Leitung mit Finanzrechten.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung", zusatz: "globale Finanzen" }],
          satz: "Im Büro prüfen Sie Belege und erzeugen die Ausgabe für die Steuerberatung.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Buchhaltung vorbereitet",
      lead: "Journal, geprüfte Belege und DATEV-Ausgabe greifen bei der Übergabe ineinander.",
      tiles: [
        {
          size: "md",
          title: "Buchungsjournal",
          text: "Buchungen und Belegbezüge bleiben in einem gemeinsamen Ablauf nachvollziehbar.",
          visual: { kind: "icon", icon: BookOpen },
        },
        {
          size: "sm",
          title: "Geprüfte Belege",
          text: "Zuordnung, Kontierung und Festschreibung bereiten die Übergabe vor.",
          visual: { kind: "icon", icon: ClipboardCheck },
        },
        {
          size: "sm",
          title: "DATEV-Ausgabe",
          text: "Ein Assistent erstellt CSV- oder ZIP-Dateien zur Weiterverarbeitung.",
          visual: { kind: "icon", icon: FileOutput },
        },
        {
          // D-32 (09-09): Kassenbuch live seit test.242–244 (Register liveExtras „Kassenbuch“, web:src/pages/Kassenbuch.tsx);
          // Übergabeliste 09-f: Verlinkung des Hilfeartikels über eine Kernpunkt-Kachel.
          // 10-04 (D-21): Die Kachel trägt das beworbene Extra „Kassenbuch“; Text und href unverändert.
          size: "wide",
          title: "Kassenbuch",
          text: "Bargeld mit Anfangsbestand buchen, den Kassensturz speichern und den Monat für DATEV exportieren.",
          visual: { kind: "icon", icon: Wallet },
          href: "/hilfe/kassenbuch-fuehren",
          zusatz: "kassenbuch",
        },
        {
          size: "wide",
          title: "Steuererklärung über die Kanzlei",
          text: "Der Export bereitet die Daten vor, Prüfung und Steuererklärung übernimmt Ihre Steuerberatung.",
          visual: { kind: "icon", icon: Info },
          href: "/gobd",
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Buchhaltung",
      lead: "Kurze Antworten zu Steuererklärung, Steuerberater-Paket, Festschreibung und Zugriff.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts buchhaltung note.
        {
          q: "Wer reicht die Steuererklärung bei ELSTER ein?",
          a: "Sie oder Ihre Steuerberatung. CraftOS bereitet Belege und Buchungsdaten dafür vor und gibt sie als Steuerberater-Paket oder DATEV-Export aus.",
        },
        // Quelle: SteuerberaterExport.tsx (Steuerberater-Paket, „Nur Buchungsdaten (CSV)“);
        // content/hilfe/datev-export-erstellen.md (fehlende Bestandteile erscheinen als Warnung).
        {
          q: "Was enthält das Steuerberater-Paket?",
          a: "Das ZIP-Paket enthält den DATEV-Buchungsstapel, die Belege, das Buchungsjournal, eine Offene-Posten-Liste und einen Zeiten-Nachweis. Alternativ geben Sie nur die Buchungsdaten als CSV aus, und fehlende Bestandteile erscheinen als Warnung.",
        },
        // Quelle: content/hilfe/datev-export-erstellen.md (nur festgeschriebene Belege; Ablauf Zeitraum → Prüfung →
        // Festschreiben → Übergabe); SteuerberaterExport.tsx „Festschreiben (GoBD)“.
        {
          q: "Warum schreibe ich einen Zeitraum vor der Übergabe fest?",
          a: "Mit dem Festschreiben bleiben die Buchungen des geprüften Zeitraums unverändert. Übergeben werden nur festgeschriebene Belege, offene Prüfungen klären Sie deshalb vorher.",
        },
        // Quelle: SteuerberaterExport.tsx (sichtbar nur mit Finanz-Berechtigung); FEATURE_ACCESS finanzen;
        // roles.ts Büro-Projektleitung „keine globalen Finanzbereiche“.
        {
          q: "Wer kann die Übergabe an die Steuerberatung erstellen?",
          a: "Admin und Büro-Zugänge mit Finanzberechtigung, im Rollenmodell also die Büro-Leitung. Die globalen Finanzbereiche sind diesen Rollen vorbehalten.",
        },
      ],
    },
    verwandt: ["bankabgleich", "eingangsrechnungen", "rechnungen"],
  },

  eingangsrechnungen: {
    slug: "eingangsrechnungen",
    kopfwort: "Eingangsrechnungen",
    lead: "Belege mit der Mobile-App fotografieren, erkannte Angaben prüfen und Ausgaben einem Projekt zuordnen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/beleg-scannen-pruefen" },
    ablauf: {
      title: "Eingangsrechnungen in vier Schritten",
      lead: "Vom Foto bis zur gespeicherten Ausgabe entscheiden Sie, was übernommen wird.",
      steps: [
        { title: "Beleg aufnehmen", text: "Beleg in der App scannen, fotografieren oder als PDF auswählen." },
        { title: "Angaben prüfen", text: "Erkannte Angaben wie Lieferant, Datum und Betrag kontrollieren." },
        { title: "Dubletten beachten", text: "Hinweise auf mögliche Dubletten vor dem Speichern prüfen." },
        { title: "Zuordnen und speichern", text: "Ausgabe einem Projekt zuordnen und erst nach Ihrer Prüfung speichern." },
      ],
    },
    rollen: {
      title: "Wer Eingangsrechnungen erfasst",
      lead: "Belege prüfen Admin und Büro-Leitung im Web, in der App scannen Sie nur mit Finanzfreigabe.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung", zusatz: "globale Finanzen" }],
          satz: "Im Büro prüfen Sie erkannte Angaben, kontieren Belege und ordnen sie Projekten zu.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [],
          satz: "In der App scannen Sie Belege nur mit der Finanzfreigabe Ihrer Rolle.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Eingangsrechnungen abdecken",
      lead: "Erkennung, Dublettenhinweis und Projektbezug greifen vor dem Speichern ineinander.",
      tiles: [
        {
          size: "md",
          title: "Vom Foto zur Prüfung",
          text: "Die App führt über Upload und Erkennung zu Feldern, die Sie bearbeiten können.",
          visual: { kind: "icon", icon: ScanLine },
        },
        {
          size: "sm",
          title: "Doppelte Belege erkennen",
          text: "Hinweise auf mögliche Dubletten helfen vor der Übernahme.",
          visual: { kind: "icon", icon: CopyCheck },
        },
        {
          size: "sm",
          title: "Kosten zuordnen",
          text: "Projektzuordnungen stellen den Bezug zur Nachkalkulation her.",
          visual: { kind: "icon", icon: FolderKanban },
        },
        {
          size: "wide",
          title: "KI-Auslesen mit Verbindung und Credits",
          text: "Das KI-Auslesen braucht eine Verbindung und verbraucht Credits, strukturierte E-Rechnungen werden ohne OCR gelesen.",
          visual: { kind: "icon", icon: Info },
          href: "/gobd",
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zu Eingangsrechnungen",
      lead: "Kurze Antworten zu Credits, Prüfung, Dubletten und Projektbezug.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts eingangsrechnungen note.
        {
          q: "Verbraucht das Auslesen von Belegen Credits?",
          a: "Ja, das KI-Auslesen verbraucht Credits und braucht eine Verbindung. Strukturierte E-Rechnungen wie XRechnung liest CraftOS dagegen direkt, ohne OCR.",
        },
        // Quelle: content/hilfe/beleg-scannen-pruefen.md (Felder vergleichen, „Prüfung bestätigen“ als eigener Schritt);
        // Release-Feldnamen laut 07-UI-SPEC (locales/de/invoices.json).
        {
          q: "Wie prüfe ich die erkannten Angaben?",
          a: "Lieferant, Rechnungsnummer, Datum, Nettobetrag und Steuer vergleichen Sie mit dem Original und korrigieren sie bei Bedarf. Gespeichert wird nach Ihrer Kontrolle, und die Prüfung bestätigen Sie als eigenen Schritt.",
        },
        // Quelle: funktionen.ts eingangsrechnungen points „Doppelte Belege erkennen“; beleg-scannen-pruefen.md
        // (Dublettenwarnung anhand von Lieferant und Rechnungsnummer prüfen).
        {
          q: "Erkennt CraftOS doppelte Belege?",
          a: "CraftOS weist auf mögliche Dubletten hin. Prüfen Sie den Hinweis anhand von Lieferant und Rechnungsnummer, bevor Sie den Beleg speichern.",
        },
        // Quelle: funktionen.ts eingangsrechnungen points „Kosten zuordnen“, nachkalkulation steps.
        {
          q: "Kann ich Ausgaben einem Projekt zuordnen?",
          a: "Ja. Die Projektzuordnung stellt den Bezug zur Nachkalkulation her, dort fließen die Ausgaben in den Vergleich von Plan und Ist ein.",
        },
      ],
    },
    verwandt: ["buchhaltung", "e-rechnung", "nachkalkulation"],
  },

  nachkalkulation: {
    slug: "nachkalkulation",
    kopfwort: "Nachkalkulation:",
    lead: "Geplante und tatsächliche Kosten für Lohn, Material und Leistungen je Auftrag vergleichen.",
    secondary: { label: "Alle Funktionen ansehen", href: "/funktionen" },
    ablauf: {
      title: "Nachkalkulation in vier Schritten",
      lead: "Vom Reiter Kalkulation bis zum nächsten Angebot vergleichen Sie Plan und Ist je Auftrag.",
      steps: [
        { title: "Reiter Kalkulation öffnen", text: "Im Projekt den Reiter Kalkulation mit Plan und Ist öffnen." },
        { title: "Plan und Ist vergleichen", text: "Planwerte mit Stunden, Material und Belegen vergleichen." },
        { title: "Abweichungen prüfen", text: "Abweichungen erkennen und fehlende Zuordnungen ergänzen." },
        { title: "Besser kalkulieren", text: "Abgeschlossene Aufträge als Grundlage für neue Angebote nutzen." },
      ],
    },
    rollen: {
      title: "Wer die Nachkalkulation sieht",
      lead: "Plan und Ist vergleichen Admin und Büro-Leitung mit Zugriff auf die Finanzdaten.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung", zusatz: "globale Finanzen" }],
          satz: "Im Büro vergleichen Sie Planwerte mit Stunden, Material und Belegen.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Nachkalkulation zeigt",
      lead: "Kostenarten, Fortschritt und Erfahrungswerte machen Abweichungen sichtbar.",
      tiles: [
        {
          size: "md",
          title: "Kostenarten getrennt sehen",
          text: "Lohn, Material, Geräte, Fremdleistungen und weitere Kosten gegenüberstellen.",
          visual: { kind: "icon", icon: ChartPie },
        },
        {
          size: "sm",
          title: "Fortschritt einordnen",
          text: "Kosten gemeinsam mit dem erfassten Projektfortschritt bewerten.",
          visual: { kind: "icon", icon: Gauge },
        },
        {
          size: "sm",
          title: "Besser kalkulieren",
          text: "Abgeschlossene Aufträge als Grundlage für neue Angebote nutzen.",
          visual: { kind: "icon", icon: TrendingUp },
        },
        {
          size: "wide",
          title: "Prognosen sind Einschätzungen",
          text: "Prognosen werden aus den vorhandenen Projektdaten berechnet und helfen beim Einordnen.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Nachkalkulation",
      lead: "Kurze Antworten zu Ist-Kosten, Prognosen, Kostenarten und neuen Angeboten.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts nachkalkulation steps und intro.
        {
          q: "Woher kommen die Ist-Kosten in der Nachkalkulation?",
          a: "Aus den Daten, die zum Projekt erfasst sind: Stunden, Material und Belege mit Projektzuordnung. Fehlen Zuordnungen, ergänzen Sie diese, damit Plan und Ist vergleichbar bleiben.",
        },
        // Quelle: funktionen.ts nachkalkulation note.
        {
          q: "Wie entsteht die Prognose zum Auftrag?",
          a: "Aus den vorhandenen Projektdaten. Prognosen sind berechnete Einschätzungen, die Sie mit dem Fortschritt des Auftrags einordnen.",
        },
        // Quelle: funktionen.ts nachkalkulation points „Kostenarten getrennt sehen“, „Fortschritt einordnen“.
        {
          q: "Welche Kostenarten vergleicht die Nachkalkulation?",
          a: "Lohn, Material, Geräte, Fremdleistungen und weitere Kosten stehen getrennt nebeneinander. Zur Bewertung ziehen Sie den erfassten Projektfortschritt hinzu.",
        },
        // Quelle: funktionen.ts nachkalkulation points „Besser kalkulieren“.
        {
          q: "Wie hilft die Nachkalkulation bei neuen Angeboten?",
          a: "Abgeschlossene Aufträge zeigen, wo Plan und Ist auseinanderlagen. Diese Erfahrungswerte nutzen Sie als Grundlage für neue Angebote.",
        },
      ],
    },
    verwandt: ["dashboard", "eingangsrechnungen"],
  },

  dashboard: {
    slug: "dashboard",
    kopfwort: "Kennzahlen",
    lead: "Projekte, offene Beträge, Angebote und Aufgaben sehen Sie beim Start der Web-App auf einen Blick.",
    secondary: { label: "Alle Funktionen ansehen", href: "/funktionen" },
    ablauf: {
      title: "Das Dashboard in drei Schritten",
      lead: "Beim Start der Web-App sehen Sie die Kennzahlen, die direkt in die Arbeit führen.",
      steps: [
        { title: "Web-App öffnen", text: "Das Dashboard zeigt Kennzahlen, Aufgaben und aktuelle Projekte." },
        { title: "Kennzahlen prüfen", text: "Aktive Projekte, offene Angebote und offene Beträge führen in die Details." },
        { title: "Arbeitsfläche anpassen", text: "Widgets verschieben, vergrößern, ausblenden oder sensible Zahlen weichzeichnen." },
      ],
    },
    rollen: {
      title: "Wer das Dashboard nutzt",
      lead: "Das Dashboard öffnen alle Büro-Zugänge, die Zahlen richten sich nach den Rechten der Rolle.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung", zusatz: "Zahlen nach Rechten" }],
          satz: "Im Büro sehen Sie Projekte, offene Beträge, Angebote und Aufgaben beim Start.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was das Dashboard zeigt",
      lead: "Kennzahlen und Umsatzverlauf stehen auf einer Arbeitsfläche, die Sie selbst anordnen.",
      tiles: [
        {
          size: "md",
          title: "Zahlen mit Zusammenhang",
          text: "Aktive Projekte, offene Angebote, offene Beträge und Stunden führen direkt in die Arbeit.",
          visual: { kind: "icon", icon: LayoutDashboard },
        },
        {
          size: "sm",
          title: "Umsatz im Verlauf",
          text: "Die Entwicklung über die Zeit mit dem Vorjahr vergleichen.",
          visual: { kind: "icon", icon: TrendingUp },
        },
        {
          size: "sm",
          title: "Ihre Arbeitsfläche",
          text: "Widgets verschieben, vergrößern, ausblenden oder sensible Zahlen weichzeichnen.",
          visual: { kind: "icon", icon: LayoutGrid },
        },
        {
          size: "wide",
          title: "Nur erfasste Daten zählen",
          text: "Die Auswertung berücksichtigt ausschließlich Daten, die in Ihrem Betrieb tatsächlich erfasst sind.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zum Dashboard",
      lead: "Kurze Antworten zu Kennzahlen, Datenbasis und Anpassung.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts dashboard points; Web-Release
        // StatsOverviewWidget.tsx (active-projects, open-offers, offer-value, pending-payments, monthly-hours,
        // weekly-assignments) und RevenueTrendChart.tsx („Umsatz-Trend“, „Vorjahr“).
        {
          q: "Welche Kennzahlen zeigt das Dashboard?",
          a: "Aktive Projekte, offene Angebote und ihren Wert, offene Beträge, die Stunden des Monats und die Einsätze der Woche. Dazu kommt der Umsatzverlauf im Vergleich zum Vorjahr.",
        },
        // Quelle: funktionen.ts dashboard note und access (sichtbare Daten nach eingerichteten Rechten).
        {
          q: "Woher stammen die Zahlen im Dashboard?",
          a: "Aus den Daten, die in Ihrem Betrieb erfasst sind. Welche Zahlen Sie sehen, richtet sich nach Ihren Rechten.",
        },
        // Quelle: funktionen.ts dashboard points „Ihre Arbeitsfläche“; DashboardCustomizeSheet.tsx („Übersicht
        // anpassen“, „Verdeckte Werte werden erst auf Klick lesbar“).
        {
          q: "Kann ich das Dashboard anpassen?",
          a: "Ja. Widgets verschieben, vergrößern oder blenden Sie in der Übersicht aus, sensible Zahlen zeichnen Sie weich. Verdeckte Werte werden erst auf Klick lesbar.",
        },
      ],
    },
    verwandt: ["nachkalkulation", "buchhaltung"],
  },

  bankabgleich: {
    slug: "bankabgleich",
    kopfwort: "Zahlungsabgleich:",
    lead: "Bankdatei als CSV, camt.053 oder PDF importieren und Umsätze mit Belegen und erfassten Zahlungen verbinden.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/bankumsaetze-abgleichen" },
    ablauf: {
      title: "Zahlungsabgleich in vier Schritten",
      lead: "Vom Kontoauszug bis zur Zuordnung entscheiden Sie bei jedem Umsatz selbst.",
      steps: [
        { title: "Bankdatei importieren", text: "Kontoauszug als CSV, camt.053 oder PDF hochladen." },
        { title: "Umsätze prüfen", text: "Mögliche Dubletten werden zur Prüfung markiert." },
        { title: "Zuordnen", text: "Jeden Umsatz mit Belegen und erfassten Zahlungen verbinden." },
        { title: "Vorschläge anfordern", text: "Auf Wunsch Zuordnungsvorschläge der KI gegen Credits anfordern." },
      ],
    },
    rollen: {
      title: "Wer den Zahlungsabgleich macht",
      lead: "Bankumsätze ordnen Admin und Büro-Leitung mit Finanzrechten in der Web-App zu.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung", zusatz: "globale Finanzen" }],
          satz: "Im Büro importieren Sie die Bankdatei und ordnen jeden Umsatz zu.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was der Zahlungsabgleich leistet",
      lead: "Import, Zuordnungsstatus und Zahlungen an Rechnungen greifen beim Abgleich ineinander.",
      tiles: [
        {
          size: "md",
          title: "Bankdatei importieren",
          text: "CSV oder camt.053 bis 2 MiB und PDF-Kontoauszüge bis 10 MiB einlesen.",
          visual: { kind: "icon", icon: Upload },
        },
        {
          size: "sm",
          title: "Zuordnungsstatus",
          text: "Jeder Umsatz zeigt, ob er zugeordnet ist oder noch offen.",
          visual: { kind: "icon", icon: CircleCheck },
        },
        {
          size: "sm",
          title: "Dubletten-Hinweis",
          text: "Mögliche Dubletten werden zur Prüfung markiert.",
          visual: { kind: "icon", icon: CopyCheck },
        },
        {
          size: "wide",
          title: "Zahlungen an Rechnungen",
          text: "Zahlungseingänge erfassen Sie direkt an der Rechnung und verbinden sie mit dem Umsatz.",
          visual: { kind: "icon", icon: Receipt },
        },
        {
          size: "wide",
          title: "Vorschläge nur auf Anforderung",
          text: "KI-Vorschläge kommen nur auf Ihre Anforderung und kosten Credits, die Zuordnung entscheiden Sie selbst.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zum Zahlungsabgleich",
      lead: "Kurze Antworten zu Bankanbindung, Dateien, Zuordnung und Dubletten.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: Bankumsaetze.tsx („Bankdatei importieren“),
        // BankImportDialog.tsx (Formate; CSV und camt.053 ohne KI-Credits; PDF-Auslesung gegen Credits).
        {
          q: "Wie kommen die Kontoauszüge in den Zahlungsabgleich?",
          a: "Als Datei: Sie importieren Kontoauszüge im Format CSV, camt.053 oder PDF. CSV und camt.053 werden ohne Credits eingelesen, einen PDF-Kontoauszug liest die KI gegen Credits aus.",
        },
        // Quelle: BankImportDialog.tsx („CSV und camt.053 bis 2 MiB · PDF bis 10 MiB · höchstens 2.000 Umsätze ·
        // EUR-Konten.“, „Diese Datei wurde bereits importiert.“).
        {
          q: "Welche Bankdateien kann ich importieren?",
          a: "CSV und camt.053 bis 2 MiB sowie PDF-Kontoauszüge bis 10 MiB, je Datei höchstens 2.000 Umsätze von EUR-Konten. Eine bereits importierte Datei erkennt CraftOS wieder.",
        },
        // Quelle: BankAllocationDialog.tsx (kostenlose Hervorhebung; KI-Vorschläge erst nach Bestätigung des
        // Credit-Verbrauchs; „du kannst manuell auswählen“); funktionen.ts bankabgleich note.
        {
          q: "Wer entscheidet, zu welchem Beleg ein Umsatz gehört?",
          a: "Sie entscheiden jede Zuordnung selbst. Passende Belegnummern, Namen und Beträge hebt CraftOS kostenlos hervor, KI-Vorschläge kommen nur auf Ihre Anforderung und kosten Credits.",
        },
        // Quelle: Bankumsaetze.tsx („Mögliche Dublette · bitte prüfen“); BankAllocationDialog.tsx („Mögliche Dublette
        // geprüft: Dieser Umsatz ist eine eigene Zahlung.“).
        {
          q: "Was passiert mit doppelten Umsätzen?",
          a: "Mögliche Dubletten werden markiert, damit Sie sie prüfen. Ist ein markierter Umsatz doch eine eigene Zahlung, halten Sie das bei der Zuordnung fest.",
        },
      ],
    },
    verwandt: ["buchhaltung", "rechnungen", "mahnwesen"],
  },
};
