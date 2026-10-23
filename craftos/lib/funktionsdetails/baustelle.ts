import {
  ArrowLeftRight,
  BellRing,
  ChartColumn,
  ClipboardCheck,
  ClipboardList,
  Crosshair,
  Images,
  Info,
  MapPin,
  NotebookPen,
  PencilLine,
  Receipt,
  Signature,
  TriangleAlert,
  UserCheck,
  Warehouse,
} from "lucide-react";
import { abnahmeScene, lagerAppScene } from "@/lib/scenes";
import type { FunktionsdetailInhalt } from "./types";

/**
 * Inhalte der Gruppe Baustelle: zeiterfassung, baudokumentation, lager, maengelmanagement
 * (Phase 7, Plan 07-05; FEAT-02, MEDIA-01, D-02, D-03, D-04, D-23).
 *
 * Quellen (nur belegte Aussagen):
 * - 07-UI-SPEC: „Seitentexte“, „Ablaufschritte“, Abschnitte 3–6 (Rollen, Kacheln, Pflichtfragen, verwandt) – wörtlich;
 *   Phone-Szenen der Kacheln aus dem Szenenkatalog (`abnahmeScene`, `lagerAppScene`, Breite 194).
 * - lib/funktionen.ts: points, steps, access, note der vier Slugs.
 * - lib/product-register.ts: limitations („GPS erfasst einzelne Vorgänge, keine dauerhaften Mitarbeiterstandorte“,
 *   „Automatische Projektzuordnung beim Timerstart benötigt Projektkoordinaten im passenden Radius“, „Keine
 *   vollständige Offline-Zusage“), liveExtras „Abnahme und Teilabnahme“, „Bautagesbericht“, „Lager-Scan und Wareneingang“.
 * - Hilfeartikel content/hilfe/mobilen-timer-bedienen.md, bautagesbericht-erstellen.md, abnahme-dokumentieren.md,
 *   material-entnehmen-zurueckbuchen.md, wareneingang-buchen.md, mangel-erfassen-bearbeiten.md.
 * - Mobile-Release (nur lesend): src/shared/i18n/locales/de/defects.json („Mangel fällig“, „Überfällig“, Zuständig
 *   „Mitarbeiter“/„Nachunternehmer“), construction.json (Wetter, „Ausgeführte Arbeiten“, „Materialverbrauch“,
 *   Unterschriften), acceptance.json (Prüfpunkte, Teilabnahme), src/features/defects/lib/reminder.ts (lokale
 *   Erinnerung am Fälligkeitstag, nur mit erlaubten Push-Mitteilungen).
 *
 * Pitfall 7: Mängeltexte nennen weder „In Arbeit“ noch „In Bearbeitung“. T-07-15: Bautagebuch- und Abnahme-FAQ nur
 * produktbezogen (Felder, Unterschrift mit Ort und Zeit), keine Rechtsberatung. D-23: kein Offline-Versprechen.
 */
export const baustelleInhalte: Record<string, FunktionsdetailInhalt> = {
  zeiterfassung: {
    slug: "zeiterfassung",
    kopfwort: "Zeiterfassung",
    lead: "Zeit per Timer starten und stoppen, Standort und Projekt mit erfassen und die Stunden im Büro auswerten.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/mobilen-timer-bedienen" },
    ablauf: {
      title: "Zeiterfassung in vier Schritten",
      lead: "Vom Timerstart bis zur Auswertung im Büro bleiben die Stunden beim Projekt.",
      steps: [
        { title: "Timer starten", text: "In der App starten, die App hält dabei den Standort fest." },
        { title: "Projekt zuordnen", text: "Liegt ein Projektort im Radius, ordnet die App den Timer diesem Projekt zu." },
        { title: "Timer stoppen", text: "Beim Stoppen hält die App erneut den Standort fest." },
        { title: "Im Büro auswerten", text: "Stunden in Projekt- und Monatsansichten prüfen und weiterverwenden." },
      ],
    },
    rollen: {
      title: "Wer mit der Zeiterfassung arbeitet",
      lead: "Erfasst wird in der Mobile-App, ausgewertet wird im Büro in der Web-App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung" }],
          satz: "Im Büro prüfen und werten Sie Stunden in Projekt- und Monatsansichten aus.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [
            { name: "Mobil-Teammitglied", zusatz: "eigene Zeiten" },
            { name: "Mobil-Teamleitung", zusatz: "auch Zeiten anderer" },
          ],
          satz: "Auf der Baustelle starten und stoppen Sie den Timer mit Standortfreigabe.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Zeiterfassung leistet",
      lead: "Standort, Projektbezug und Auswertung greifen vom Timerstart bis zur Nachkalkulation ineinander.",
      tiles: [
        {
          size: "md",
          title: "Arbeitszeit mit Standort",
          text: "Beim Starten und Stoppen hält die App den Standort fest, im Büro sehen Sie ihn am Eintrag.",
          visual: { kind: "icon", icon: MapPin },
        },
        {
          size: "sm",
          title: "Das Projekt findet sich mit",
          text: "Liegt ein Projektort im Radius, wählt die App beim Start dieses Projekt.",
          visual: { kind: "icon", icon: Crosshair },
        },
        {
          size: "sm",
          title: "Nachtragen und korrigieren",
          text: "Manuelle Einträge ergänzen die Erfassung im Rahmen der Rechte.",
          visual: { kind: "icon", icon: PencilLine },
        },
        {
          size: "wide",
          title: "Stunden weiterverwenden",
          text: "Projekt- und Monatsansichten unterstützen die Auswertung und die Nachkalkulation.",
          visual: { kind: "icon", icon: ChartColumn },
        },
        {
          size: "wide",
          title: "Standort nur bei Start und Stopp",
          text: "Die App erfasst einzelne Standortpunkte und keine Bewegungsverläufe, dafür ist eine GPS-Freigabe nötig.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Zeiterfassung",
      lead: "Kurze Antworten zu Standort, Projektwahl, Korrekturen und schwachem Empfang.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts zeiterfassung note, Register limitations
        // „GPS erfasst einzelne Vorgänge, keine dauerhaften Mitarbeiterstandorte“.
        {
          q: "Erfasst die App dauerhaft den Standort?",
          a: "Nein. Die App erfasst einzelne Standortpunkte beim Starten und Stoppen des Timers, keine Bewegungsverläufe. Dafür sind die GPS-Freigabe und eine ermittelbare Position erforderlich.",
        },
        // Quelle: content/hilfe/mobilen-timer-bedienen.md („Automatische Projektzuordnung einrichten“), funktionen.ts
        // zeiterfassung note, Register limitations (Projektkoordinaten im passenden Radius).
        {
          q: "Wie findet die App beim Timerstart das richtige Projekt?",
          a: "Liegt beim Start ein gespeicherter Projektort im eingestellten Radius, wählt die App das nächstgelegene passende Projekt. Den Radius stellen Sie auf 50, 100 oder 200 Meter ein, und ein bewusst im Projekt gestarteter Timer behält seine Zuordnung.",
        },
        // Quelle: funktionen.ts zeiterfassung points „Nachtragen und korrigieren“ und access;
        // content/hilfe/mobilen-timer-bedienen.md („Häufige Probleme“); Rollenmodell (07-RESEARCH).
        {
          q: "Können Zeiten nachgetragen oder korrigiert werden?",
          a: "Ja. Manuelle Einträge ergänzen die Erfassung im Rahmen der Rechte, eine vergessene Endzeit korrigieren Sie im bestehenden Eintrag. Zeiten anderer Personen erfasst und korrigiert die Mobil-Teamleitung.",
        },
        // Quelle: content/hilfe/mobilen-timer-bedienen.md (Synchronisierungsstatus, Standort für Start und Stopp);
        // 07-UI-SPEC /app Offline-Schritte; Register limitations „Keine vollständige Offline-Zusage“ (D-23).
        {
          q: "Funktioniert die Zeiterfassung bei schwachem Empfang?",
          a: "Teilweise: Zeiten werden ohne Empfang vorgemerkt und später übertragen, den Stand zeigt der Synchronisierungsstatus. Für Start und Stopp braucht die App weiterhin eine ermittelbare Position.",
        },
      ],
    },
    verwandt: ["plantafel", "baudokumentation"],
  },

  baudokumentation: {
    slug: "baudokumentation",
    kopfwort: "Bautagebuch-App:",
    lead: "Bautagesberichte, Fotos und Abnahmen beim Projekt festhalten und in der App unterschreiben lassen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/bautagesbericht-erstellen" },
    ablauf: {
      title: "Baudokumentation in vier Schritten",
      lead: "Vom Bericht auf der Baustelle bis zur Bauakte im Büro bleibt alles beim Projekt.",
      steps: [
        { title: "Bericht anlegen", text: "Bautagesbericht in der App mit Wetter, Arbeiten und Material anlegen." },
        { title: "Fotos ergänzen", text: "Fotos und Dateien direkt im Projekt ablegen." },
        { title: "Unterschreiben lassen", text: "In der App unterschreiben, Ort und Zeitpunkt werden mit erfasst." },
        { title: "Im Büro wiederfinden", text: "Berichte und Protokolle in der Bauakte des Projekts öffnen und ausgeben." },
      ],
    },
    rollen: {
      title: "Wer mit der Bautagebuch-App arbeitet",
      lead: "Dokumentiert wird vor Ort in der App, im Büro finden Sie alles in der Bauakte des Projekts.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung" }],
          satz: "Im Büro öffnen Sie Berichte und Protokolle in der Bauakte und geben sie aus.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [
            { name: "Mobil-Teamleitung", zusatz: "mit Projektzugriff" },
            { name: "Mobil-Teammitglied", zusatz: "mit Projektzugriff" },
          ],
          satz: "Vor Ort erfassen Sie Berichte, Fotos und Abnahmen und lassen sie unterschreiben.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Bautagebuch-App leistet",
      lead: "Berichte, Abnahmen und Unterschriften mit Ort und Zeit liegen gesammelt im Projekt.",
      tiles: [
        {
          size: "lg",
          title: "Abnahme und Teilabnahme",
          text: "Abnahmen vor Ort protokollieren, Auftraggeber und Auftragnehmer unterschreiben in der App.",
          visual: { kind: "phone", scene: abnahmeScene, width: 194 },
          zusatz: "abnahme",
        },
        {
          size: "sm",
          title: "Berichte abrechnen",
          text: "Geeignete Leistungen in einen prüfbaren Rechnungsentwurf übernehmen.",
          visual: { kind: "icon", icon: Receipt },
        },
        {
          size: "sm",
          title: "Mängel",
          text: "Mängel verfolgen Sie im Mängelmanagement bis zur Prüfung.",
          visual: { kind: "icon", icon: TriangleAlert },
          href: "/funktionen/maengelmanagement",
        },
        {
          size: "md",
          title: "Bautagesbericht",
          text: "Wetter, ausgeführte Arbeiten und Materialverbrauch in der App festhalten.",
          visual: { kind: "icon", icon: NotebookPen },
          zusatz: "bautagesbericht",
        },
        {
          size: "md",
          title: "Unterschriften mit Ort und Zeit",
          text: "Beim Unterschreiben in der App werden Standort und Zeitpunkt mit erfasst.",
          visual: { kind: "icon", icon: Signature },
        },
        {
          size: "md",
          title: "Unterschrift braucht Standortfreigabe",
          text: "Die mobile Unterschrift braucht Standortfreigabe, Foto-Uploads eine Verbindung.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Baudokumentation",
      lead: "Kurze Antworten zu Bautagebuch, Unterschriften, Abnahme und Fotos.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5 (questions--bautagebuch.json); nur produktbezogen (T-07-15).
        // Beleg: content/hilfe/bautagesbericht-erstellen.md, Mobile-Release construction.json
        // (Wetter, „Ausgeführte Arbeiten“, „Materialverbrauch“).
        {
          q: "Was gehört in ein Bautagebuch?",
          a: "In CraftOS hält ein Bautagesbericht Wetter, ausgeführte Arbeiten, anwesende Personen und den Materialverbrauch fest, dazu besondere Vorkommnisse und nächste Schritte. Fotos und Unterschriften mit Ort und Zeitpunkt ergänzen den Bericht.",
        },
        // Quelle: Mobile-Release construction.json („Bauleiter unterschreibt“, „Bauherr unterschreibt“, „Beide
        // unterschreiben (Vollbild)“); content/hilfe/bautagesbericht-erstellen.md (Angaben je Unterschrift).
        {
          q: "Wer unterschreibt den Bautagesbericht in der App?",
          a: "Vorgesehen sind die Unterschriften von Bauleiter und Bauherr, einzeln oder gemeinsam im Vollbild. Bei jeder Bestätigung speichert die App Standort und Zeitpunkt getrennt je Unterschrift.",
        },
        // Frage nach questions--abnahmeprotokoll.json, produktbezogen formuliert (T-07-15).
        // Quelle: content/hilfe/abnahme-dokumentieren.md, Mobile-Release acceptance.json (Prüfpunkte, Teilabnahme).
        {
          q: "Was hält das Abnahmeprotokoll in CraftOS fest?",
          a: "Das Protokoll enthält Datum, Auftraggeber und Auftragnehmer, die Prüfpunkte mit „OK“, „Mangel“ oder „Offen“, offene Mängel und die Unterschriften beider Seiten. Sie protokollieren eine Abnahme oder Teilabnahme, eine tatsächliche Verweigerung halten Sie über „Abnahme verweigern“ fest.",
        },
        // Quelle: funktionen.ts baudokumentation note; content/hilfe/bautagesbericht-erstellen.md
        // („Kann der Standort nicht ermittelt werden, wird die Unterschrift noch nicht bestätigt“).
        {
          q: "Was brauchen Fotos und Unterschriften in der App?",
          a: "Foto-Uploads benötigen eine Verbindung zum Internet. Eine mobile Unterschrift wird erst bestätigt, wenn Standortfreigabe und eine ermittelbare Position vorliegen, die Zeichnung bleibt bis dahin erhalten.",
        },
      ],
    },
    verwandt: ["maengelmanagement", "projektverwaltung", "rechnungen"],
  },

  lager: {
    slug: "lager",
    kopfwort: "Lagerverwaltung",
    lead: "Bestände, Lagerorte und Bewegungen verwalten und Artikel in der Mobile-App per Barcode buchen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/material-entnehmen-zurueckbuchen" },
    ablauf: {
      title: "Lagerverwaltung in vier Schritten",
      lead: "Vom Wareneingang bis zur Inventur bleibt jede gebuchte Bewegung nachvollziehbar.",
      steps: [
        { title: "Lager einrichten", text: "Artikel, Lagerorte und Lagerplätze mit Bestand anlegen." },
        { title: "Bewegung buchen", text: "Wareneingang, Entnahme, Umlagerung oder Rückbuchung mit Bezug buchen." },
        { title: "Per Barcode scannen", text: "In der App Artikel scannen und Ausgabe oder Rücknahme buchen." },
        { title: "Inventur durchführen", text: "Bestände zählen und Abweichungen per Bestandskorrektur ausgleichen." },
      ],
    },
    rollen: {
      title: "Wer mit dem Lager arbeitet",
      lead: "Das Büro verwaltet Bestände im Web, berechtigte Mitarbeitende buchen in der App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung" }],
          satz: "Im Büro verwalten Sie Artikel, Lagerorte und Bewegungen mit Ihren Lagerrechten.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [],
          satz: "Berechtigte Mitarbeitende scannen Artikel und sehen den Bestand freigegebener Lager.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Lagerverwaltung leistet",
      lead: "Lagerorte, Bewegungen und Inventur halten Bestand und Projektkosten zusammen.",
      tiles: [
        {
          size: "lg",
          title: "Lager-Scan und Wareneingang",
          text: "In der App Artikel per Barcode scannen, den Bestand freigegebener Lager sehen und Ware zubuchen.",
          visual: { kind: "phone", scene: lagerAppScene, width: 194 },
          href: "/hilfe/lager-scan-app",
          zusatz: "lager-scan",
        },
        {
          size: "sm",
          title: "Lagerorte abbilden",
          text: "Bestände nach Lagerorten und Lagerplätzen ordnen.",
          visual: { kind: "icon", icon: Warehouse },
        },
        {
          size: "sm",
          title: "Bestände prüfen",
          text: "Inventur und Bestandskorrektur gleichen mit dem tatsächlichen Material ab.",
          visual: { kind: "icon", icon: ClipboardList },
        },
        {
          size: "md",
          title: "Bewegungen nachvollziehen",
          text: "Wareneingang, Entnahme, Umlagerung und Rückbuchung bilden den Materialfluss ab.",
          visual: { kind: "icon", icon: ArrowLeftRight },
        },
        {
          size: "wide",
          title: "Werte nur mit gebuchten Bewegungen",
          text: "Bestands- und Kostenwerte stimmen nur, wenn die tatsächlichen Bewegungen gebucht werden.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Lagerverwaltung",
      lead: "Kurze Antworten zu Barcode, Entnahme, Wareneingang und Bestandswerten.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts lager access, Register liveExtras
        // „Lager-Scan und Wareneingang“ (InventoryScanScreen.tsx, InventoryScreen.tsx).
        {
          q: "Kann mein Team Artikel in der App per Barcode buchen?",
          a: "Ja. In der Mobile-App scannen berechtigte Mitarbeitende Artikel per Barcode, sehen den Bestand ihrer freigegebenen Lager und buchen Ausgabe, Rücknahme oder Bewegung.",
        },
        // Quelle: content/hilfe/material-entnehmen-zurueckbuchen.md („Warenausgang“, „Rückbuchung vom Auftrag“).
        {
          q: "Wie ordne ich Material einem Auftrag zu?",
          a: "Beim Warenausgang wählen Sie unter „Auftrag / Projekt“ den tatsächlichen Verwendungszweck, damit die Entnahme den Auftrag in der Nachkalkulation belastet. Nicht verbrauchtes Material buchen Sie über „Rückbuchung vom Auftrag“ zurück ins Lager.",
        },
        // Quelle: content/hilfe/wareneingang-buchen.md („Ergebnis prüfen“).
        {
          q: "Ersetzt der Wareneingang die Prüfung der Lieferantenrechnung?",
          a: "Nein. Der Wareneingang erhöht den Bestand am gewählten Lagerort, die Lieferantenrechnung prüfen Sie getrennt unter „Eingangsrechnungen“.",
        },
        // Quelle: funktionen.ts lager note und points „Bestände prüfen“.
        {
          q: "Wann stimmen Bestand und Materialkosten?",
          a: "Bestands- und Kostenwerte stimmen nur, wenn die tatsächlichen Bewegungen gebucht werden. Abweichungen gleichen Sie nach einer Inventur per Bestandskorrektur aus.",
        },
      ],
    },
    verwandt: ["arbeitsanweisungen", "zeiterfassung"],
  },

  maengelmanagement: {
    slug: "maengelmanagement",
    kopfwort: "Mängelmanagement",
    lead: "Mängel mit Foto, Ort und Frist erfassen, Zuständige festlegen und den Status bis zur Prüfung verfolgen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/mangel-erfassen-bearbeiten" },
    ablauf: {
      title: "Mängelmanagement in vier Schritten",
      lead: "Vom Vorher-Foto bis zur Prüfung bleibt jeder Mangel beim Projekt.",
      steps: [
        { title: "Mangel erfassen", text: "Mangel mit Titel, Ort und Vorher-Foto in der App oder im Web anlegen." },
        { title: "Frist und Zuständige", text: "Priorität, Frist und zuständige Person oder Nachunternehmer festlegen." },
        { title: "Behebung dokumentieren", text: "Nachher-Foto ergänzen und den Status auf Behoben setzen." },
        { title: "Prüfen und abschließen", text: "Behobene Mängel prüfen; offene Mängel zeigt das Abnahmeprotokoll." },
      ],
    },
    rollen: {
      title: "Wer mit dem Mängelmanagement arbeitet",
      lead: "Im Büro und vor Ort arbeiten alle mit Projektzugriff an denselben Mängeln.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung" }],
          satz: "Im Büro bearbeiten Sie Mängel in der Bauakte des Projekts.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [
            { name: "Mobil-Teamleitung", zusatz: "mit Projektzugriff" },
            { name: "Mobil-Teammitglied", zusatz: "mit Projektzugriff" },
          ],
          satz: "Vor Ort erfassen Sie Mängel mit Foto, Ort und Frist und dokumentieren die Behebung.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was das Mängelmanagement leistet",
      lead: "Frist, Zuständigkeit und Fotos führen jeden Mangel bis zur Prüfung.",
      tiles: [
        {
          size: "md",
          title: "Ort, Priorität und Frist",
          text: "Jeder Mangel erhält Ort, Priorität von niedrig bis kritisch und ein Datum zum Erledigen.",
          visual: { kind: "icon", icon: MapPin },
        },
        {
          size: "sm",
          title: "Zuständige festlegen",
          text: "Mitarbeiter oder Nachunternehmer als zuständig eintragen.",
          visual: { kind: "icon", icon: UserCheck },
        },
        {
          size: "sm",
          title: "Vorher und Nachher",
          text: "Fotos vor und nach der Behebung am Mangel ablegen.",
          visual: { kind: "icon", icon: Images },
        },
        {
          size: "md",
          title: "Erinnerung bei Fälligkeit",
          text: "Die App erinnert mit „Mangel fällig“ und listet überfällige Mängel gesondert.",
          visual: { kind: "icon", icon: BellRing },
        },
        {
          size: "sm",
          title: "Offene Mängel in der Abnahme",
          text: "Das Abnahmeprotokoll zeigt die Zahl offener Mängel.",
          visual: { kind: "icon", icon: ClipboardCheck },
        },
        {
          size: "sm",
          title: "Fotos brauchen Verbindung",
          text: "Foto-Uploads benötigen eine Verbindung zum Internet.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zum Mängelmanagement",
      lead: "Kurze Antworten zu Erinnerung, Zuständigkeit, Prüfung und Abnahme.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: Mobile-Release defects.json („Mangel fällig“, „Überfällig“),
        // src/features/defects/lib/reminder.ts (lokale Erinnerung am Fälligkeitstag, nur mit erlaubtem Push).
        {
          q: "Wie erinnert CraftOS an fällige Mängel?",
          a: "Hat ein Mangel eine Frist, erinnert die Mobile-App am Fälligkeitstag mit der Mitteilung „Mangel fällig“, sofern Push-Mitteilungen in der App erlaubt sind. Überfällige Mängel kennzeichnet die Mängelliste gesondert als „Überfällig“.",
        },
        // Quelle: Mobile-Release defects.json `assignedType` („Mitarbeiter“, „Nachunternehmer“);
        // content/hilfe/mangel-erfassen-bearbeiten.md („Zu erledigen bis“, „Zuständig“).
        {
          q: "Kann ich Nachunternehmer als zuständig eintragen?",
          a: "Ja. Als zuständig tragen Sie einen Mitarbeiter oder einen Nachunternehmer ein und legen im Feld „Zu erledigen bis“ die Frist fest.",
        },
        // Quelle: content/hilfe/mangel-erfassen-bearbeiten.md („Geprüft“ erst nach der Kontrolle).
        {
          q: "Wann gilt ein Mangel als geprüft?",
          a: "Einen behobenen Mangel setzen Sie erst nach der Kontrolle vor Ort auf „Geprüft“. Ein geänderter Status allein ersetzt keine Sichtprüfung, Nachher-Fotos ergänzen Sie bei Bedarf.",
        },
        // Quelle: funktionen.ts maengelmanagement points „Offene Mängel in der Abnahme“;
        // content/hilfe/abnahme-dokumentieren.md (offene Mängel vor dem Protokoll prüfen).
        {
          q: "Zeigt die Abnahme offene Mängel an?",
          a: "Ja. Das Abnahmeprotokoll zeigt die Zahl offener Mängel, die Sie vor dem Erstellen des Protokolls prüfen.",
        },
      ],
    },
    verwandt: ["baudokumentation", "projektverwaltung"],
  },
};
