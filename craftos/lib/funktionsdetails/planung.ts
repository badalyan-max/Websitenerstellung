import {
  BellRing,
  CalendarRange,
  ChartGantt,
  Contact,
  EyeOff,
  FileText,
  FolderOpen,
  GitBranch,
  Info,
  ListChecks,
  MapPin,
  MessagesSquare,
  Move,
  Package,
  PanelsTopLeft,
  TriangleAlert,
  Users,
} from "lucide-react";
import { KUNDEN_APP_TEXT } from "@/lib/funktionsgruppen";
import type { FunktionsdetailInhalt } from "./types";

/**
 * Inhalte der Gruppe Planung: plantafel, projektverwaltung, arbeitsanweisungen, terminplanung
 * (Phase 7, Plan 07-05; FEAT-02, D-02, D-03, D-04, D-20).
 *
 * Quellen (nur belegte Aussagen):
 * - 07-UI-SPEC: „Seitentexte“, „Ablaufschritte“, Abschnitte 3–6 (Rollen, Kacheln, Pflichtfragen, verwandt) – wörtlich.
 * - lib/funktionen.ts: points, steps, access, note der vier Slugs.
 * - lib/product-register.ts: liveExtras „Kunden in der App“ (CustomersScreen.tsx u. a.) und „Projekt-Chat und
 *   Nachrichten“ (ChatScreen.tsx, InboxScreen.tsx), mobileEvidence terminplanung (ProjectPhaseSummary.tsx,
 *   AssignmentPhaseLine.tsx).
 * - Hilfeartikel content/hilfe/plantafel-einsatz-planen.md, projektdateien-ordner.md, projekt-phasen-anlegen.md.
 * - Web-Release (nur lesend): src/components/plantafel/PlantafelToolbar.tsx („Projektplan – Projekte über die Zeit“),
 *   src/components/projects/PhaseDependencyEditor.tsx („Abstand in Arbeitstagen“, „Termine bleiben unverändert“).
 * - Mobile-Release (nur lesend): src/shared/i18n/locales/de/projects.json `phases` („Arbeitsabschnitte“,
 *   Status Geplant, In Arbeit, Abgeschlossen, Verzögert).
 *
 * D-20: Terminplanung nutzt den UI-Begriff „Arbeitsabschnitte“; geplant wird im Web, die App zeigt die Abschnitte.
 */
export const planungInhalte: Record<string, FunktionsdetailInhalt> = {
  plantafel: {
    slug: "plantafel",
    kopfwort: "Plantafel-Software:",
    lead: "Einsätze für Ihr Team planen, Einsatzorte auf der Karte sehen und Änderungen in der Mobile-App anzeigen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/plantafel-einsatz-planen" },
    ablauf: {
      title: "Einsätze mit der Plantafel in vier Schritten",
      lead: "Vom Zeitraum bis zur Navigation in der App bleibt jeder Einsatz beim Projekt.",
      steps: [
        { title: "Zeitraum wählen", text: "Projekt, Zeitraum und Mitarbeiter in der Plantafel auswählen." },
        { title: "Einsatz planen", text: "Einsatz anlegen, verschieben oder kopieren und die Dauer anpassen." },
        { title: "Kapazität prüfen", text: "Abwesenheiten und Ressourcen bei der Planung im Blick behalten." },
        { title: "Team informieren", text: "Das Team sieht den Einsatz in der App und startet die Navigation." },
      ],
    },
    rollen: {
      title: "Wer mit der Plantafel arbeitet",
      lead: "Geplant wird im Büro, Ihr Team sieht seine Einsätze in der Mobile-App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung" }],
          satz: "Im Büro planen Sie Einsätze, Kapazitäten und Einsatzorte in der Plantafel.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [
            { name: "Mobil-Teamleitung", zusatz: "eigene Einsätze" },
            { name: "Mobil-Teammitglied", zusatz: "eigene Einsätze" },
          ],
          satz: "Unterwegs öffnet Ihr Team den Einsatz, sieht den Zielort und startet die Navigation.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Plantafel-Software leistet",
      lead: "Karte, Kapazitäten und Benachrichtigungen halten die Einsatzplanung aktuell.",
      tiles: [
        {
          size: "md",
          title: "Einsatzorte auf der Karte",
          text: "Sehen, wo Ihr Team eingeplant ist, und Einsätze nach Tag und Mitarbeiter filtern.",
          visual: { kind: "icon", icon: MapPin },
        },
        {
          size: "sm",
          title: "Mehrtägige Einsätze",
          text: "Einsätze über mehrere Tage mit Bezug zum Projekt planen.",
          visual: { kind: "icon", icon: CalendarRange },
        },
        {
          size: "sm",
          title: "Änderungen direkt vornehmen",
          text: "Einsätze verschieben, kopieren und zeitlich anpassen.",
          visual: { kind: "icon", icon: Move },
        },
        {
          size: "md",
          title: "Über Änderungen informiert",
          text: "Verknüpfte Teammitglieder werden über neue und geänderte Einsätze benachrichtigt.",
          visual: { kind: "icon", icon: BellRing },
        },
        {
          size: "sm",
          title: "Kapazitäten berücksichtigen",
          text: "Mitarbeiter, Abwesenheiten und Ressourcen bilden den Rahmen der Planung.",
          visual: { kind: "icon", icon: Users },
        },
        {
          size: "sm",
          title: "Geplante Orte, keine Live-Standorte",
          text: "Die Karte zeigt geplante Einsatzorte, Karten und Routen in der App brauchen Verbindung.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Plantafel",
      lead: "Kurze Antworten zu Karte, Benachrichtigungen, Navigation und Konflikten.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts plantafel note,
        // content/hilfe/plantafel-einsatz-planen.md („Einsatzorte auf der Karte prüfen“).
        {
          q: "Zeigt die Karte, wo meine Mitarbeitenden gerade sind?",
          a: "Nein. Die Karte zeigt geplante Einsatzorte, keine laufend erfassten Mitarbeiterstandorte. Als Kartenpunkt erscheint ein Einsatz, wenn ein Zielstandort oder Projektkoordinaten hinterlegt sind.",
        },
        // Quelle: content/hilfe/plantafel-einsatz-planen.md („Benachrichtigungen bei Änderungen“).
        {
          q: "Erfährt mein Team von neuen und geänderten Einsätzen?",
          a: "Ja. Wenn Sie einen Einsatz anlegen oder ändern, erhält das zugeordnete Teammitglied eine Benachrichtigung, sofern es mit einem App-Benutzer verknüpft ist. Als Push-Mitteilung erscheint sie, wenn Push in der App und im Betriebssystem erlaubt ist.",
        },
        // Quelle: funktionen.ts plantafel points „Unterwegs zum Auftrag“ und note;
        // content/hilfe/plantafel-einsatz-planen.md („Den Einsatz unterwegs öffnen“).
        {
          q: "Kann mein Team die Navigation zum Einsatz starten?",
          a: "Ja. In der Mobile-App sieht Ihr Team im Einsatz Projekt, Zeitraum, Status und Zielort und startet von dort die Navigation. Karten und Routen benötigen eine Internetverbindung.",
        },
        // Quelle: content/hilfe/plantafel-einsatz-planen.md (09-06); Release-Begriffe „Hinweis zur Planung“ und
        // „Trotzdem einplanen“ aus Web src/components/plantafel/AssignmentPlanHintsDialog.tsx (09-14, L-1-Altbegriff).
        {
          q: "Was passiert bei Überschneidungen in der Planung?",
          a: "Bei einer Doppelbelegung zeigt CraftOS den „Hinweis zur Planung“. Sie prüfen die Überschneidung, auch mit Blick auf Abwesenheiten, Fahrzeuge und Geräte, und wählen „Trotzdem einplanen“ oder „Abbrechen“.",
        },
      ],
    },
    verwandt: ["terminplanung", "projektverwaltung", "zeiterfassung"],
  },

  projektverwaltung: {
    slug: "projektverwaltung",
    kopfwort: "Auftragsverwaltung:",
    lead: "Kunden, Aufgaben, Termine, Dokumente und Projekt-Chat bleiben beim Auftrag, im Büro und in der App.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/projektdateien-ordner" },
    ablauf: {
      title: "Projektverwaltung in vier Schritten",
      lead: "Vom Anlegen bis zur Rückfrage von der Baustelle bleibt alles beim Auftrag.",
      steps: [
        { title: "Projekt anlegen", text: "Projekt anlegen und den Kunden zuordnen." },
        { title: "Aufgaben und Termine pflegen", text: "Aufgaben, Termine und Zuständigkeiten im Projekt festhalten." },
        { title: "Dateien ablegen", text: "Pläne, Bilder und Unterlagen in Ordnern und Unterordnern sortieren." },
        { title: "Im Projekt-Chat klären", text: "Rückfragen von der Baustelle bleiben im Chat beim Auftrag." },
      ],
    },
    rollen: {
      title: "Wer mit der Projektverwaltung arbeitet",
      lead: "Das Büro sieht Projekte nach Rolle, das Team in der App seine zugewiesenen Projekte.",
      panels: [
        {
          platform: "web",
          rollen: [
            { name: "Admin" },
            { name: "Büro-Leitung", zusatz: "alle Projekte" },
            { name: "Büro-Projektleitung", zusatz: "eigene und zugewiesene" },
          ],
          satz: "Im Büro legen Sie Projekte an und pflegen Aufgaben, Termine und Dokumente.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [
            { name: "Mobil-Teamleitung", zusatz: "zugewiesene Projekte" },
            { name: "Mobil-Teammitglied", zusatz: "zugewiesene Projekte" },
          ],
          satz: "Unterwegs öffnet Ihr Team freigegebene Projekte, Dateien und den Projekt-Chat.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Auftragsverwaltung leistet",
      lead: "Projektbereiche, Dateien, Kunden und Chat bleiben beim jeweiligen Auftrag.",
      tiles: [
        {
          size: "md",
          title: "Kunden in der App",
          text: KUNDEN_APP_TEXT,
          visual: { kind: "icon", icon: Contact },
          zusatz: "kunden-app",
        },
        {
          size: "sm",
          title: "Klare Projektbereiche",
          text: "Übersicht, Terminplanung, Dokumente und weitere Bereiche liegen in Reitern.",
          visual: { kind: "icon", icon: PanelsTopLeft },
        },
        {
          size: "sm",
          title: "Dateien wiederfinden",
          text: "Ordner, Unterordner und Filter ordnen Pläne, Bilder und Unterlagen.",
          visual: { kind: "icon", icon: FolderOpen },
        },
        {
          size: "wide",
          title: "Projekt-Chat und Nachrichten",
          text: "Rückfragen im Projekt-Chat beim Auftrag klären und Direktnachrichten im Posteingang der App lesen.",
          visual: { kind: "icon", icon: MessagesSquare },
          href: "/hilfe/projekt-chat-nachrichten",
          zusatz: "projekt-chat",
        },
        {
          size: "wide",
          title: "Zugriff nach Rolle",
          text: "Die Büro-Projektleitung sieht nur zugewiesene und eigene Projekte, globale Finanzbereiche bleiben gesperrt.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Projektverwaltung",
      lead: "Kurze Antworten zu Sichtbarkeit, Dateien, Kunden und Projekt-Chat.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts projektverwaltung access und note,
        // Rollenmodell (07-RESEARCH), content/hilfe/projekt-phasen-anlegen.md („Häufige Probleme“).
        {
          q: "Sehen Mitarbeitende in der App alle Projekte?",
          a: "Nein. Mitarbeitende sehen in der App die Projekte und Bereiche, die ihnen zugewiesen oder freigegeben sind. Wer ein Projekt sieht, richtet sich nach Zuordnung und Rolle, und Finanzdaten bleiben durch die Rechte des Mitglieds begrenzt.",
        },
        // Quelle: content/hilfe/projektdateien-ordner.md („Dateien“, „Neuer Ordner“, „Belege & Dateien“).
        {
          q: "Wo lege ich Pläne und Fotos zum Projekt ab?",
          a: "Im Projekt unter „Dateien“ legen Sie Ordner und Unterordner an und laden Pläne, Bilder und Unterlagen hoch. In der Mobile-App finden Sie die Ablage unter „Belege & Dateien“, Uploads brauchen eine Internetverbindung.",
        },
        // Quelle: Register liveExtras „Kunden in der App“ (CustomersScreen.tsx, CustomerEditScreen.tsx); Anlage nur
        // Admin/Büro laut useCustomerCreationAllowed.ts, sonst freigegebene Kunden (Mobile-Release, WR-02).
        {
          q: "Kann ich Kundendaten in der App bearbeiten?",
          a: "Ja, im Rahmen Ihrer Rechte. In der Mobile-App schlagen Sie freigegebene Kundendaten unterwegs nach und bearbeiten sie; neue Kunden legen nur Admin- und Büro-Zugänge an.",
        },
        // Quelle: Register liveExtras „Projekt-Chat und Nachrichten“ (ChatScreen.tsx, InboxScreen.tsx,
        // DirectChatScreen.tsx); funktionen.ts projektverwaltung points „Gespräche im Kontext“.
        {
          q: "Wo klärt mein Team Rückfragen zum Auftrag?",
          a: "Rückfragen klärt Ihr Team im Projekt-Chat direkt beim Auftrag. Direktnachrichten liest es im Posteingang der Mobile-App.",
        },
      ],
    },
    verwandt: ["terminplanung", "arbeitsanweisungen", "baudokumentation"],
  },

  arbeitsanweisungen: {
    slug: "arbeitsanweisungen",
    kopfwort: "Arbeitsanweisungen",
    lead: "Leistungen und Material ohne Verkaufspreise an das Team geben, das erledigte Schritte in der App abhakt.",
    secondary: { label: "Alle Funktionen ansehen", href: "/funktionen" },
    ablauf: {
      title: "Arbeitsanweisungen in vier Schritten",
      lead: "Vom Quelldokument bis zum abgehakten Schritt bleibt die Anweisung beim Projekt.",
      steps: [
        { title: "Quelldokument wählen", text: "Ein geeignetes Dokument des Projekts als Grundlage wählen." },
        { title: "Inhalt prüfen", text: "Abgeleitete Leistungen und den gesammelten Materialbedarf kontrollieren." },
        { title: "Bereitstellen", text: "Die Arbeitsanweisung ohne Verkaufspreise für die Ausführung bereitstellen." },
        { title: "In der App abhaken", text: "Das Team sieht die Arbeitsschritte und hakt erledigte Schritte ab." },
      ],
    },
    rollen: {
      title: "Wer mit Arbeitsanweisungen arbeitet",
      lead: "Erstellt wird in der Web-App, abgehakt wird auf der Baustelle in der Mobile-App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung" }],
          satz: "Im Büro erstellen und verwalten Sie Arbeitsanweisungen in der Web-App.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [
            { name: "Mobil-Teamleitung", zusatz: "mit Projektzugriff" },
            { name: "Mobil-Teammitglied", zusatz: "mit Projektzugriff" },
          ],
          satz: "Vor Ort sieht das Team Anleitung, Material und Werkzeug je Arbeitsschritt.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was Arbeitsanweisungen leisten",
      lead: "Leistungen, Material und Arbeitsschritte erreichen das Team ohne Verkaufspreise.",
      tiles: [
        {
          size: "md",
          title: "Arbeitsschritte in der App",
          text: "Das Team sieht Anleitung, Material und Werkzeug je Schritt und hakt Erledigtes ab.",
          visual: { kind: "icon", icon: ListChecks },
        },
        {
          size: "sm",
          title: "Leistungen weitergeben",
          text: "Der fachliche Inhalt des Quelldokuments wird übernommen.",
          visual: { kind: "icon", icon: FileText },
        },
        {
          size: "sm",
          title: "Preise schützen",
          text: "Informationen für die Ausführung erscheinen ohne Verkaufspreise.",
          visual: { kind: "icon", icon: EyeOff },
        },
        {
          size: "wide",
          title: "Material zusammenführen",
          text: "Eine gesammelte Materialliste unterstützt die Vorbereitung des Einsatzes.",
          visual: { kind: "icon", icon: Package },
        },
        {
          size: "wide",
          title: "Materialliste bucht keine Entnahme",
          text: "Die Materialliste plant den Bedarf, die Entnahme buchen Sie im Lager.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zu Arbeitsanweisungen",
      lead: "Kurze Antworten zu Preisen, Material, Quelldokument und Arbeitsschritten.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts arbeitsanweisungen points „Preise schützen“.
        {
          q: "Sieht das Team in der Arbeitsanweisung die Verkaufspreise?",
          a: "Nein. Die für die Ausführung bestimmten Informationen werden ohne Verkaufspreise dargestellt. Das Team sieht Leistungen sowie Material und Werkzeug je Arbeitsschritt.",
        },
        // Quelle: funktionen.ts arbeitsanweisungen note („Eine Materialliste allein bucht noch keine Lagerentnahme“).
        {
          q: "Bucht die Materialliste das Material aus dem Lager?",
          a: "Nein. Die Materialliste plant den Bedarf für den Einsatz, die Entnahme buchen Sie im Lager.",
        },
        // Quelle: funktionen.ts arbeitsanweisungen points „Leistungen weitergeben“ und steps.
        {
          q: "Woraus entsteht eine Arbeitsanweisung?",
          a: "Eine Arbeitsanweisung entsteht aus einem geeigneten Quelldokument des Projekts und übernimmt dessen fachlichen Inhalt. Die abgeleiteten Leistungen und den Materialbedarf prüfen Sie, bevor Sie die Anweisung bereitstellen.",
        },
        // Quelle: funktionen.ts arbeitsanweisungen access; Mobile-Release WorkStepsSection.tsx
        // („erledigt von {Name} am {Datum}“, 07-RESEARCH Mobile-App-Umfang).
        {
          q: "Wie hakt das Team erledigte Arbeitsschritte ab?",
          a: "In der Mobile-App sieht das Team die Arbeitsschritte des Projekts mit Anleitung, Material und Werkzeug und hakt erledigte Schritte ab. Am Schritt steht danach, wer ihn wann erledigt hat.",
        },
      ],
    },
    verwandt: ["projektverwaltung", "angebote", "lager"],
  },

  terminplanung: {
    slug: "terminplanung",
    kopfwort: "Bauzeitenplan",
    lead: "Arbeitsabschnitte im Projektplan terminieren, Abhängigkeiten setzen und den Stand in der Mobile-App zeigen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/projekt-phasen-anlegen" },
    ablauf: {
      title: "Terminplanung in vier Schritten",
      lead: "Vom Arbeitsabschnitt bis zur Anzeige in der App bleibt der Bauzeitenplan beim Projekt.",
      steps: [
        { title: "Abschnitte anlegen", text: "Im Projektreiter Terminplanung Arbeitsabschnitte mit Zeitraum anlegen." },
        { title: "Abhängigkeiten setzen", text: "Festlegen, welcher Abschnitt folgt, auch mit Versatz in Arbeitstagen." },
        { title: "Projektplan prüfen", text: "In der Plantafel-Ansicht Projektplan alle Projekte über die Zeit sehen." },
        { title: "In der App zeigen", text: "Das Team sieht die Arbeitsabschnitte im Projekt und am Einsatz." },
      ],
    },
    rollen: {
      title: "Wer mit der Terminplanung arbeitet",
      lead: "Geplant wird im Web, das Team sieht die Arbeitsabschnitte in der Mobile-App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung" }],
          satz: "Geplant wird im Web: Arbeitsabschnitte, Zeiträume und Abhängigkeiten legen Sie hier fest.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [{ name: "Mobil-Teamleitung" }, { name: "Mobil-Teammitglied" }],
          satz: "Das Team sieht die Arbeitsabschnitte mit Status im Projekt und am Einsatz.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was der Bauzeitenplan zeigt",
      lead: "Arbeitsabschnitte, Abhängigkeiten und der Projektplan geben jedem Projekt einen klaren Zeitrahmen.",
      tiles: [
        {
          size: "md",
          title: "Arbeitsabschnitte mit Zeitraum",
          text: "Abschnitte für jedes Projekt mit Zeitraum anlegen und benennen.",
          visual: { kind: "icon", icon: CalendarRange },
        },
        {
          size: "sm",
          title: "Abhängigkeiten mit Versatz",
          text: "Pfeile zeigen, welcher Abschnitt folgt, auch mit Versatz in Arbeitstagen.",
          visual: { kind: "icon", icon: GitBranch },
        },
        {
          size: "sm",
          title: "Projektplan in der Plantafel",
          text: "Die Ansicht Projektplan zeigt alle Projekte über die Zeit.",
          visual: { kind: "icon", icon: ChartGantt },
        },
        {
          size: "wide",
          title: "Warnung bei Überschreitung",
          text: "Ragt ein Arbeitsabschnitt über den Projektzeitraum hinaus, weist CraftOS darauf hin.",
          visual: { kind: "icon", icon: TriangleAlert },
        },
        {
          size: "wide",
          title: "Geplant wird im Web",
          text: "Die Mobile-App zeigt Arbeitsabschnitte mit Status an, geändert wird die Planung in der Web-App.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Terminplanung",
      lead: "Kurze Antworten zu App-Anzeige, Abhängigkeiten, Projektplan und Warnungen.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5 (D-20); Beleg: funktionen.ts terminplanung access und note,
        // Mobile-Release projects.json `phases` (Status), ProjectPhaseSummary.tsx, AssignmentPhaseLine.tsx.
        {
          q: "Kann mein Team den Bauzeitenplan in der App sehen?",
          a: "Ja. Das Team sieht die Arbeitsabschnitte mit Status wie Geplant, In Arbeit oder Abgeschlossen im Projekt und am Einsatz in der Mobile-App. Geplant und geändert wird der Bauzeitenplan in der Web-App.",
        },
        // Quelle: Web-Release src/components/projects/PhaseDependencyEditor.tsx („Der Abstand zählt Arbeitstage von
        // Montag bis Freitag; Termine bleiben unverändert.“).
        {
          q: "Verschieben Abhängigkeiten die Termine der Arbeitsabschnitte?",
          a: "Nein. Eine Abhängigkeit legt fest, welcher Arbeitsabschnitt folgt und mit welchem Abstand in Arbeitstagen von Montag bis Freitag. Die Termine selbst bleiben dabei unverändert.",
        },
        // Quelle: Web-Release PlantafelToolbar.tsx („Projektplan – Projekte über die Zeit“);
        // content/hilfe/plantafel-einsatz-planen.md (Einsatz aus „Projekte → Terminplanung“ planen).
        {
          q: "Wo sehe ich alle Projekte über die Zeit?",
          a: "In der Plantafel zeigt die Ansicht Projektplan alle Projekte über die Zeit. Einen Einsatz planen Sie bei Bedarf direkt an einem Arbeitsabschnitt aus der Terminplanung des Projekts.",
        },
        // Quelle: funktionen.ts terminplanung points „Warnung bei Überschreitung“;
        // content/hilfe/projekt-phasen-anlegen.md („Ergebnis prüfen“).
        {
          q: "Was passiert, wenn ein Arbeitsabschnitt über das Projekt hinausragt?",
          a: "Ragt ein Arbeitsabschnitt über den Projektzeitraum hinaus, weist CraftOS darauf hin. Sie prüfen den Hinweis und entscheiden bewusst über den Zeitraum.",
        },
      ],
    },
    verwandt: ["plantafel", "projektverwaltung"],
  },
};
