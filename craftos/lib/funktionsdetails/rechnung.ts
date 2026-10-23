import {
  CalendarClock,
  FileCheck2,
  FileCode,
  FileInput,
  FileText,
  Files,
  History,
  Info,
  ListOrdered,
  Lock,
  NotebookPen,
  Percent,
  Wallet,
} from "lucide-react";
import type { FunktionsdetailInhalt } from "./types";

/**
 * Inhalte der Gruppe Rechnung: rechnungen, e-rechnung, mahnwesen (Phase 7, Plan 07-06; FEAT-02, D-02, D-03, D-04, D-23).
 *
 * Quellen (nur belegte Aussagen):
 * - 07-UI-SPEC: „Seitentexte“ (Kopfwort, Kurznutzen, Sekundärlink), „Ablaufschritte“, Abschnitt 3 (Rollen),
 *   Abschnitt 4 (Kacheln), Abschnitt 5 (Pflichtfragen), Abschnitt 6 (verwandte Funktionen) – wörtlich übernommen.
 * - lib/funktionen.ts: points, steps, access, note der drei Slugs.
 * - Hilfeartikel content/hilfe/rechnung-fertigstellen.md und e-rechnung-herunterladen.md.
 * - Web-Release (nur lesend, origin/release): src/pages/settings/MahnwesenSettings.tsx (Stufen „Zahlungserinnerung“,
 *   „1. Mahnung“, „2. Mahnung“; „Tage überfällig“; Mahngebühr; „Verzugszinssatz (jährlich)“; Gebühren und Zinsen
 *   optional, Standard 0; täglicher Versand per E-Mail, eine Stufe nach der anderen, mindestens 7 Tage Abstand;
 *   „Gemahnt werden nur Rechnungen. Abschlags- und Schlussrechnungen mahnt die Automatik nicht.“; Fristen, Gebühren
 *   und Stufen ändert nur der Inhaber), src/lib/reminderTemplateVariables.ts (elf Platzhalter),
 *   src/components/invoices/ReminderHistory.tsx (Mahnverlauf), src/lib/subscription/roles.ts (Preset-Beschreibungen).
 *
 * Satzregel (07-UI-SPEC Abschnitt 4): Ordinalzahlen wie „1. Mahnung“ zählt sentenceCount als Satzende, deshalb steht in
 * allen Texten „erste“ bzw. „zweite Mahnung“. „automatisch“ steht nur zusammen mit „auf Wunsch“.
 * Grenze-Kacheln von rechnungen und e-rechnung verlinken auf /gobd (Bestand, 07-UI-SPEC Abschnitt 4).
 */
export const rechnungInhalte: Record<string, FunktionsdetailInhalt> = {
  rechnungen: {
    slug: "rechnungen",
    kopfwort: "Rechnungssoftware:",
    lead: "Abschlags-, Teil- und Schlussrechnungen erstellen, vor dem Fertigstellen prüfen und Zahlungen zuordnen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/rechnung-fertigstellen" },
    ablauf: {
      title: "Rechnungen in vier Schritten",
      lead: "Vom Entwurf bis zur Zahlung bleibt jede Rechnung beim Projekt und beim Kunden.",
      steps: [
        { title: "Entwurf erstellen", text: "Rechnungsentwurf aus einem Angebot oder Bericht erstellen." },
        { title: "Entwurf prüfen", text: "Empfänger, Leistungen, Beträge und Anrechnungen kontrollieren." },
        { title: "Fertigstellen", text: "Beim Fertigstellen entsteht die Rechnungsnummer, danach geben Sie sie aus." },
        { title: "Zahlungen zuordnen", text: "Zahlungseingänge und Teilzahlungen an der Rechnung erfassen." },
      ],
    },
    rollen: {
      title: "Wer mit Rechnungen arbeitet",
      lead: "Rechnungen erstellen und prüfen Sie in der Web-App, je nach Rolle für alle oder für eigene Projekte.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung", zusatz: "eigene Projekte" }],
          satz: "Im Büro erstellen Sie Rechnungen, stellen sie fertig und erfassen Zahlungen.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Rechnungssoftware leistet",
      lead: "Belegtypen, Fertigstellung und Zahlungen greifen in einem Ablauf ineinander.",
      tiles: [
        {
          size: "md",
          title: "Passender Belegtyp",
          text: "Rechnung, Abschlag, Teil- und Schlussrechnung sowie Storno und Korrektur stehen bereit.",
          visual: { kind: "icon", icon: Files },
        },
        {
          size: "sm",
          title: "Kontrolliert fertigstellen",
          text: "Die Rechnungsnummer entsteht erst beim Fertigstellen.",
          visual: { kind: "icon", icon: Lock },
        },
        {
          size: "sm",
          title: "Zahlungen zuordnen",
          text: "Zahlungseingänge und Teilzahlungen an der Rechnung erfassen.",
          visual: { kind: "icon", icon: Wallet },
        },
        {
          size: "wide",
          title: "Berichte abrechnen",
          text: "Geeignete Leistungen aus Berichten in eine Einzel- oder Sammelrechnung übernehmen.",
          visual: { kind: "icon", icon: NotebookPen },
        },
        {
          size: "wide",
          title: "Korrektur nur über Folgebelege",
          text: "Fertige Rechnungen korrigieren Sie über Folgebelege, und eine erfasste Zahlung ist keine Bankbestätigung.",
          visual: { kind: "icon", icon: Info },
          href: "/gobd",
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Rechnungssoftware",
      lead: "Kurze Antworten zu Korrekturen, Rechnungsarten, Zahlungen und Berichten.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts rechnungen note, content/hilfe/rechnung-fertigstellen.md.
        {
          q: "Kann ich eine fertiggestellte Rechnung noch ändern?",
          a: "Nur über Folgebelege wie Storno oder Korrektur. Beim Fertigstellen vergibt CraftOS die endgültige Rechnungsnummer, hält den Dokumentstand fest und sperrt die normale Bearbeitung.",
        },
        // Quelle: funktionen.ts rechnungen points „Passender Belegtyp“; content/hilfe/rechnung-fertigstellen.md
        // (Abschlags- und Schlussrechnungen: bisherige Rechnungen, Zahlungen und Projektstatus prüfen).
        {
          q: "Welche Rechnungsarten kann ich erstellen?",
          a: "Rechnung, Abschlagsrechnung, Teil- und Schlussrechnung sowie Storno und Korrektur stehen bereit. Bei Abschlags- und Schlussrechnungen prüfen Sie vor dem Fertigstellen bisherige Rechnungen, Zahlungen und den Projektstatus.",
        },
        // Quelle: funktionen.ts rechnungen note („Eine Zahlungserfassung ist keine Bankbestätigung.“) und points
        // „Zahlungen zuordnen“; bankabgleich intro (Bankdatei-Import).
        {
          q: "Ist eine erfasste Zahlung eine Bankbestätigung?",
          a: "Nein. Zahlungseingänge und Teilzahlungen erfassen Sie an der Rechnung, eine Bestätigung durch die Bank ist das nicht. Bankumsätze gleichen Sie im Zahlungsabgleich per Bankdatei ab.",
        },
        // Quelle: funktionen.ts rechnungen points „Berichte abrechnen“, steps (Entwurf aus Angebot oder Bericht).
        {
          q: "Kann ich Leistungen aus Berichten abrechnen?",
          a: "Ja. Geeignete Leistungen aus Berichten übernehmen Sie in eine Einzel- oder Sammelrechnung und prüfen den Entwurf vor dem Fertigstellen.",
        },
      ],
    },
    verwandt: ["e-rechnung", "mahnwesen", "bankabgleich"],
  },

  "e-rechnung": {
    slug: "e-rechnung",
    kopfwort: "E-Rechnung",
    lead: "Rechnungen als XRechnung oder ZUGFeRD ausgeben und elektronische Eingangsrechnungen ohne OCR einlesen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/e-rechnung-herunterladen" },
    ablauf: {
      title: "E-Rechnung in drei Schritten",
      lead: "Aus dem gespeicherten Rechnungsstand entsteht die strukturierte Datei für Ihren Empfänger.",
      steps: [
        { title: "Rechnung vorbereiten", text: "Absender, Empfänger und Positionen der Rechnung vollständig ergänzen." },
        { title: "Format wählen", text: "XRechnung oder ZUGFeRD wählen und empfängerbezogene Referenzen prüfen." },
        { title: "Ausgabe prüfen", text: "E-Rechnung erzeugen und das Validierungsergebnis kontrollieren." },
      ],
    },
    rollen: {
      title: "Wer E-Rechnungen ausgibt",
      lead: "E-Rechnungen erzeugen Sie in der Web-App aus einer fertigen Rechnung.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung", zusatz: "eigene Projekte" }],
          satz: "Im Büro wählen Sie das Format und laden die E-Rechnung herunter.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die E-Rechnung abdeckt",
      lead: "Ausgabe in zwei Formaten und strukturierter Eingang gehören zusammen.",
      tiles: [
        {
          size: "md",
          title: "XRechnung",
          text: "Strukturierte XML-Daten im Format UBL 2.1 für entsprechende Empfangsprozesse erzeugen.",
          visual: { kind: "icon", icon: FileCode },
        },
        {
          size: "sm",
          title: "ZUGFeRD",
          text: "Die lesbare PDF/A-3 enthält zusätzlich die strukturierten Rechnungsdaten.",
          visual: { kind: "icon", icon: FileCheck2 },
        },
        {
          size: "sm",
          title: "Strukturierter Eingang",
          text: "E-Rechnungsdaten werden direkt gelesen, ohne OCR.",
          visual: { kind: "icon", icon: FileInput },
        },
        {
          size: "wide",
          title: "Eine PDF ist keine E-Rechnung",
          text: "Eine gewöhnliche PDF enthält keine strukturierten Daten, und nötige Referenzen hängen vom Empfänger ab.",
          visual: { kind: "icon", icon: Info },
          href: "/gobd",
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur E-Rechnung",
      lead: "Kurze Antworten zu PDF, Formaten, Empfängern und Eingangsrechnungen.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5 (zugleich SE-Ranking-Frage questions--e-rechnung.json);
        // Beleg: funktionen.ts e-rechnung note, content/hilfe/e-rechnung-herunterladen.md („Ergebnis prüfen“).
        {
          q: "Ist eine PDF-Rechnung eine E-Rechnung?",
          a: "Nein. Eine gewöhnliche PDF enthält keine strukturierten Rechnungsdaten und ist deshalb keine E-Rechnung. XRechnung liefert strukturierte XML-Daten, ZUGFeRD verbindet die lesbare PDF mit eingebetteten Rechnungsdaten.",
        },
        // Quelle: 07-UI-SPEC Kacheltabelle e-rechnung (UBL 2.1, PDF/A-3), content/hilfe/e-rechnung-herunterladen.md.
        {
          q: "Was ist der Unterschied zwischen XRechnung und ZUGFeRD?",
          a: "XRechnung ist eine reine XML-Datei im Format UBL 2.1. ZUGFeRD ist eine lesbare PDF/A-3, in die strukturierte Rechnungsdaten eingebettet sind.",
        },
        // Quelle: content/hilfe/e-rechnung-herunterladen.md (Leitweg-ID / Käuferreferenz; „Ein erfolgreicher Download
        // bestätigt noch nicht die Annahme durch den Rechnungsempfänger.“); keine Zusage zur Empfängerakzeptanz.
        {
          q: "Nimmt jeder Empfänger meine E-Rechnung an?",
          a: "Das hängt vom Empfänger ab, ein erfolgreicher Download bestätigt die Annahme noch nicht. Klären Sie Referenzen wie Leitweg-ID oder Käuferreferenz und den Übermittlungsweg vorher mit Ihrem Auftraggeber.",
        },
        // Quelle: funktionen.ts e-rechnung points „Strukturierter Eingang“, eingangsrechnungen note (Credits).
        {
          q: "Kann ich elektronische Eingangsrechnungen einlesen?",
          a: "Ja. Strukturierte E-Rechnungsdaten liest CraftOS direkt, ohne OCR. Für fotografierte Belege gibt es bei den Eingangsrechnungen das KI-Auslesen, das eine Verbindung braucht und Credits verbraucht.",
        },
      ],
    },
    verwandt: ["rechnungen", "eingangsrechnungen"],
  },

  mahnwesen: {
    slug: "mahnwesen",
    kopfwort: "Mahnwesen:",
    lead: "Fristen, Gebühren und Vorlagen je Stufe festlegen und überfällige Rechnungen auf Wunsch automatisch mahnen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/mahnwesen-einrichten" },
    ablauf: {
      title: "Mahnwesen in vier Schritten",
      lead: "Von der Frist bis zum Mahnverlauf legen Sie jede Stufe selbst fest.",
      steps: [
        { title: "Fristen festlegen", text: "Je Stufe festlegen, nach wie vielen Tagen überfällig gemahnt wird." },
        { title: "Vorlagen anpassen", text: "Betreff und Text je Stufe mit Platzhaltern vorbereiten." },
        { title: "Automatik einschalten", text: "Überfällige Rechnungen werden täglich eine Stufe nach der anderen gemahnt." },
        { title: "Verlauf prüfen", text: "Im Mahnverlauf jeder Rechnung sehen, wann welche Stufe verschickt wurde." },
      ],
    },
    rollen: {
      title: "Wer das Mahnwesen einrichtet",
      lead: "Das Mahnwesen liegt in den Einstellungen der Web-App, die Büro-Leitung sieht es nur lesend.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung", zusatz: "Einstellungen nur lesen" }],
          satz: "Fristen, Gebühren und Stufen ändert nur der Inhaber des Betriebs.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was das Mahnwesen leistet",
      lead: "Stufen, Fristen, Gebühren und Vorlagen greifen beim Mahnen ineinander.",
      tiles: [
        {
          size: "md",
          title: "Drei Stufen",
          text: "Auf die Zahlungserinnerung folgen die erste und die zweite Mahnung.",
          visual: { kind: "icon", icon: ListOrdered },
        },
        {
          size: "sm",
          title: "Fristen in Tagen",
          text: "Je Stufe legen Sie fest, ab wie vielen Tagen überfällig gemahnt wird.",
          visual: { kind: "icon", icon: CalendarClock },
        },
        {
          size: "sm",
          title: "Gebühr und Verzugszins",
          text: "Mahngebühr und jährlichen Verzugszinssatz hinterlegen.",
          visual: { kind: "icon", icon: Percent },
        },
        {
          size: "md",
          title: "Vorlagen mit Platzhaltern",
          text: "Betreff und Text je Stufe mit elf Platzhaltern vorbereiten.",
          visual: { kind: "icon", icon: FileText },
        },
        {
          size: "sm",
          title: "Mahnverlauf je Rechnung",
          text: "An jeder Rechnung sehen, welche Stufe wann verschickt wurde.",
          visual: { kind: "icon", icon: History },
        },
        {
          size: "sm",
          // L-1 (09-14, Hinweis aus 09-03): Umfang positiv; Beleg MahnwesenSettings.tsx Z. 313 („Gemahnt werden nur
          // Rechnungen.“), identisch mit funktionen.ts mahnwesen note (WR-06).
          title: "Für normale Rechnungen",
          text: "Auf Wunsch mahnt die Automatik normale Rechnungen nach Ihren Fristen.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zum Mahnwesen",
      lead: "Kurze Antworten zu Fristen, Versand, Gebühren und Umfang.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5 (SE-Ranking-Frage „wann mahnung nach zahlungserinnerung“,
        // questions--mahnung.json); Beleg: MahnwesenSettings.tsx („Tage überfällig“, nächste Stufe, 7 Tage Abstand).
        {
          q: "Wann kommt die Mahnung nach der Zahlungserinnerung?",
          a: "Das legen Sie selbst fest: Je Stufe bestimmen Sie, nach wie vielen Tagen Überfälligkeit gemahnt wird. Der Mahnlauf sendet immer die nächste Stufe nach der zuletzt versendeten und hält zwischen zwei Mahnungen mindestens 7 Tage Abstand.",
        },
        // Quelle: MahnwesenSettings.tsx (Schalter „Automatische Mahnungen“, täglicher Versand per E-Mail, eine Stufe
        // nach der anderen, Vorschau der als Nächstes gemahnten Rechnungen vor dem Einschalten).
        {
          q: "Mahnt CraftOS überfällige Rechnungen auf Wunsch automatisch?",
          a: "Ja, wenn Sie die automatischen Mahnungen auf Wunsch einschalten. Dann werden überfällige Rechnungen täglich nach Ihren Fristen per E-Mail gemahnt, immer eine Stufe nach der anderen. Vor dem Einschalten sehen Sie, welche Rechnungen als Nächstes gemahnt würden.",
        },
        // Quelle: MahnwesenSettings.tsx (Mahngebühr je Stufe, „Verzugszinssatz (jährlich)“, „Gebühren und Zinsen sind
        // optional (Standard: 0)“). Keine Rechtsberatung zur Höhe.
        {
          q: "Kann ich Mahngebühren und Verzugszinsen berechnen?",
          a: "Ja. Je Stufe hinterlegen Sie eine Mahngebühr, dazu einen jährlichen Verzugszinssatz. Beides ist optional und steht ohne Ihre Eingabe auf 0.",
        },
        // Quelle: MahnwesenSettings.tsx („Gemahnt werden nur Rechnungen. Abschlags- und Schlussrechnungen mahnt die
        // Automatik nicht.“).
        {
          q: "Welche Rechnungen mahnt CraftOS?",
          a: "Auf Wunsch eingeschaltete automatische Mahnungen gelten für normale Rechnungen. Sie mahnen nach Ihren Fristen, immer eine Stufe nach der anderen.",
        },
      ],
    },
    verwandt: ["rechnungen", "bankabgleich"],
  },
};
