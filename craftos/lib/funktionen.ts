import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Receipt,
  Calculator,
  CalendarDays,
  Clock,
  Package,
  HardHat,
  Users,
  TrendingUp,
  Globe,
  Ruler,
  ScanLine,
  FileCheck2,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type ProductPlatform = "web" | "mobile";
export type DemoScene =
  | "dashboard"
  | "angebot"
  | "planung"
  | "rechnung"
  | "beleg"
  | "ki";
export interface Funktion {
  slug: string;
  name: string;
  icon: LucideIcon;
  tier: "heute" | "launch" | "vision";
  kurz: string;
  heroTitle: string;
  heroIntro: string;
  bullets: {
    titel: string;
    text: string;
    tier?: "heute" | "launch" | "vision";
  }[];
  faq: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
  platforms: ProductPlatform[];
  access: string;
  steps: string[];
  notes: string[];
  helpSlug: string;
  related: string[];
  demo?: DemoScene;
  checkedAt: string;
}
interface Definition {
  slug: string;
  name: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  platforms: ProductPlatform[];
  access: string;
  points: [string, string][];
  steps: string[];
  note: string;
  help: string;
  related: string[];
  demo?: DemoScene;
}
const definitions: Definition[] = [
  {
    slug: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    title: "Der Arbeitstag beginnt mit Überblick.",
    intro:
      "Projekte, offene Beträge, Angebote und Aufgaben auf einen Blick. Ihr Dashboard verbindet die wichtigen Zahlen mit der nächsten konkreten Aufgabe.",
    platforms: ["web"],
    access:
      "Büro und Admin; die sichtbaren Daten richten sich nach den eingerichteten Rechten.",
    points: [
      [
        "Zahlen mit Zusammenhang",
        "Aktive Projekte, offene Angebote, offene Beträge und erfasste Stunden führen in die weitere Arbeit.",
      ],
      [
        "Umsatz im Verlauf",
        "Verfolgen Sie die zeitliche Entwicklung und vergleichen Sie mit dem Vorjahr.",
      ],
      [
        "Ihre Arbeitsfläche",
        "Widgets verschieben, vergrößern und ausblenden; sensible Zahlen bei Bedarf weichzeichnen.",
      ],
    ],
    steps: [
      "Öffnen Sie das Dashboard in der Web-App.",
      "Prüfen Sie Kennzahlen, Aufgaben und aktuelle Projekte.",
      "Öffnen Sie ein Projekt oder passen Sie Ihre Widgets an.",
    ],
    note: "Die Auswertung berücksichtigt die tatsächlich erfassten Betriebsdaten.",
    help: "projekt-phasen-anlegen",
    related: ["projektverwaltung", "nachkalkulation", "plantafel"],
    demo: "dashboard",
  },
  {
    slug: "projektverwaltung",
    name: "Projektverwaltung",
    icon: FolderKanban,
    title: "Ein Projekt. Alle Informationen an ihrem Platz.",
    intro:
      "Kunden, Phasen, Aufgaben, Termine, Dokumente und Projektchat bleiben beim Auftrag, vom ersten Angebot bis zur letzten Rückmeldung von der Baustelle.",
    platforms: ["web", "mobile"],
    access:
      "Büro und Admin verwalten Projekte; mobile Mitarbeiter sehen freigegebene Projekte und Bereiche.",
    points: [
      [
        "Klare Projektbereiche",
        "Übersicht, Planung, Dokumente und weitere Arbeitsbereiche sind über kompakte Reiter erreichbar.",
      ],
      [
        "Gespräche im Kontext",
        "Der Projektchat hält Rückfragen beim zugehörigen Auftrag.",
      ],
      [
        "Dateien wiederfinden",
        "Ordner, Unterordner und Filter strukturieren Pläne, Bilder und Unterlagen.",
      ],
    ],
    steps: [
      "Legen Sie das Projekt an und ordnen Sie den Kunden zu.",
      "Pflegen Sie Phasen, Aufgaben, Termine und Zuständigkeiten.",
      "Ergänzen Sie Dokumente, Dateien und Nachrichten im Projekt.",
    ],
    note: "Finanzdaten und Projektzugriffe werden durch die Rechte des Mitglieds begrenzt.",
    help: "projekt-phasen-anlegen",
    related: ["arbeitsanweisungen", "baudokumentation", "nachkalkulation"],
    demo: "dashboard",
  },
  {
    slug: "angebote",
    name: "Angebote & Kalkulation",
    icon: FileText,
    title: "Angebote, die bis zur letzten Position passen.",
    intro:
      "Leistungen beschreiben, Mengen übernehmen und Kosten kalkulieren. Material, Lohn und Zuschläge machen aus einer Schätzung ein nachvollziehbares Angebot.",
    platforms: ["web", "mobile"],
    access:
      "Die vollständige Tiefenkalkulation steht Büro und Admin im Web zur Verfügung; mobile Dokumentaktionen hängen von Rolle und Freigabe ab.",
    points: [
      [
        "Positionen wiederverwenden",
        "Eigene Artikel und Leistungsvorlagen ersparen wiederholte Eingaben.",
      ],
      [
        "Kosten nachvollziehen",
        "Kalkulieren Sie Lohn, Material, Geräte, Fremdleistungen und weitere Kosten je Position.",
      ],
      [
        "Mengen übernehmen",
        "Verwenden Sie geprüfte Aufmaßmengen als Angebotspositionen.",
      ],
      [
        "Dokumente ausgeben",
        "Erstellen Sie ein PDF mit Ihren Firmenangaben und Ihrem Briefpapier.",
      ],
    ],
    steps: [
      "Legen Sie einen Angebotsentwurf mit Kunde und Projektbezug an.",
      "Ergänzen Sie Positionen, Mengen, Preise und Zuschläge.",
      "Prüfen Sie das Angebot und erstellen Sie die PDF-Ausgabe.",
    ],
    note: "GAEB- und DATANORM-Import unterstützen die Übernahme von Daten. Prüfen Sie Ihre konkrete Lieferantendatei; eine pauschale DATANORM-v5-Kompatibilität wird nicht zugesagt.",
    help: "angebot-entwurf-anlegen",
    related: ["aufmass", "rechnungen", "nachkalkulation"],
    demo: "angebot",
  },
  {
    slug: "rechnungen",
    name: "Rechnungen",
    icon: Receipt,
    title: "Von der geleisteten Arbeit zur nachvollziehbaren Rechnung.",
    intro:
      "Rechnungen, Abschläge und Schlussrechnungen erstellen, Zahlungen zuordnen und den Belegzusammenhang behalten. Sie prüfen den Entwurf, bevor das Dokument fertiggestellt wird.",
    platforms: ["web"],
    access:
      "Büro oder Admin mit den erforderlichen Dokument- und Finanzrechten.",
    points: [
      [
        "Passender Belegtyp",
        "Rechnung, Abschlag, Teil- und Schlussrechnung sowie Storno und Korrektur unterstützen unterschiedliche Fälle.",
      ],
      [
        "Kontrolliert fertigstellen",
        "Die Rechnungsnummer entsteht beim Fertigstellen des Dokuments.",
      ],
      [
        "Zahlungen zuordnen",
        "Erfassen Sie Zahlungseingänge und Teilzahlungen an der Rechnung.",
      ],
      [
        "Berichte abrechnen",
        "Übernehmen Sie geeignete Leistungen in eine Einzel- oder Sammelrechnung.",
      ],
    ],
    steps: [
      "Erstellen Sie einen Rechnungsentwurf, etwa aus einem Angebot oder Bericht.",
      "Prüfen Sie Empfänger, Leistungen, Beträge und Anrechnungen.",
      "Stellen Sie die Rechnung fertig und geben Sie das Dokument aus.",
    ],
    note: "Fertiggestellte Rechnungen werden über nachvollziehbare Folgebelege korrigiert. Eine Zahlungserfassung ist keine Bankbestätigung.",
    help: "rechnung-fertigstellen",
    related: ["e-rechnung", "buchhaltung", "baudokumentation"],
    demo: "rechnung",
  },
  {
    slug: "e-rechnung",
    name: "E-Rechnung",
    icon: FileCheck2,
    title: "Rechnungsdaten, mit denen andere Systeme weiterarbeiten.",
    intro:
      "XRechnung und ZUGFeRD verbinden strukturierte Rechnungsdaten mit Ihrem Dokumentablauf. Auch elektronische Eingangsrechnungen lassen sich einlesen.",
    platforms: ["web"],
    access: "Büro oder Admin mit Zugriff auf Rechnungen und deren Ausgabe.",
    points: [
      [
        "XRechnung",
        "Erzeugen Sie strukturierte XML-Daten für entsprechende Empfangsprozesse.",
      ],
      [
        "ZUGFeRD",
        "Die lesbare PDF wird mit eingebetteten strukturierten Rechnungsdaten verbunden.",
      ],
      [
        "Strukturierter Eingang",
        "E-Rechnungsdaten werden direkt gelesen; dafür ist keine OCR notwendig.",
      ],
    ],
    steps: [
      "Ergänzen Sie Absender, Empfänger und Rechnungspositionen.",
      "Prüfen Sie empfängerbezogene Referenzen und das gewünschte Format.",
      "Erzeugen Sie die Ausgabe und kontrollieren Sie das Validierungsergebnis.",
    ],
    note: "Eine gewöhnliche PDF ist keine strukturierte E-Rechnung. Erforderliche Referenzen hängen vom Empfänger ab.",
    help: "e-rechnung-herunterladen",
    related: ["rechnungen", "eingangsrechnungen", "buchhaltung"],
    demo: "rechnung",
  },
  {
    slug: "buchhaltung",
    name: "Buchhaltung & DATEV",
    icon: Calculator,
    title: "Die Vorbereitung sitzt. Die Steuerberatung kann weiterarbeiten.",
    intro:
      "Belege prüfen, Buchungen nachvollziehen und Daten samt Belegbezug exportieren. So schaffen Betrieb und Steuerberatung eine gemeinsame Arbeitsgrundlage.",
    platforms: ["web"],
    access:
      "Berechtigte Büro-/Admin-Zugänge; Finanz- und Exportrechte werden gesondert vergeben.",
    points: [
      [
        "Buchungsjournal",
        "Buchungen und Belegbezüge bleiben in einem gemeinsamen Ablauf nachvollziehbar.",
      ],
      [
        "Geprüfte Belege",
        "Zuordnung, Kontierung und Festschreibung unterstützen eine strukturierte Vorbereitung.",
      ],
      [
        "DATEV-Ausgabe",
        "Ein Assistent erstellt CSV- beziehungsweise ZIP-Ausgaben zur Weiterverarbeitung.",
      ],
    ],
    steps: [
      "Prüfen Sie Belege, Zuordnungen und Buchungsdaten.",
      "Wählen Sie Zeitraum und Umfang im Steuerberater-Export.",
      "Erzeugen Sie die Ausgabe und stimmen Sie den Import mit der Steuerberatung ab.",
    ],
    note: "Der Export ersetzt keine fachliche Prüfung oder Steuererklärung. Eine automatische ELSTER-Einreichung erfolgt nicht.",
    help: "datev-export-erstellen",
    related: ["eingangsrechnungen", "rechnungen", "nachkalkulation"],
    demo: "beleg",
  },
  {
    slug: "eingangsrechnungen",
    name: "Eingangsrechnungen & Belegscan",
    icon: ScanLine,
    title: "Der Beleg ist erfasst. Die Entscheidung bleibt bei Ihnen.",
    intro:
      "Belege aufnehmen, erkannte Angaben kontrollieren und Ausgaben einem Projekt zuordnen. Sie korrigieren bei Bedarf und speichern nach der Prüfung.",
    platforms: ["web", "mobile"],
    access:
      "Die jeweilige Finanzfreigabe ist erforderlich; eine App-Lizenz allein gibt keinen pauschalen Zugriff auf Belege.",
    points: [
      [
        "Vom Foto zur Prüfung",
        "Die mobile Erfassung führt über Upload und Erkennung zu editierbaren Feldern.",
      ],
      [
        "Doppelte Belege erkennen",
        "Hinweise auf mögliche Dubletten unterstützen die Kontrolle vor der Übernahme.",
      ],
      [
        "Kosten zuordnen",
        "Projekt- und Bereichszuordnungen stellen den Bezug zur Nachkalkulation her.",
      ],
    ],
    steps: [
      "Wählen Sie eine Datei oder fotografieren Sie den Beleg.",
      "Prüfen Sie Angaben, mögliche Dubletten und die Zuordnung.",
      "Speichern Sie die passenden Daten erst nach Ihrer Kontrolle.",
    ],
    note: "KI-Auslesen benötigt eine Verbindung und verbraucht Credits; strukturierte E-Rechnungsdaten werden ohne OCR gelesen.",
    help: "beleg-scannen-pruefen",
    related: ["buchhaltung", "projektverwaltung", "nachkalkulation"],
    demo: "beleg",
  },
  {
    slug: "plantafel",
    name: "Plantafel & Einsatzplanung",
    icon: CalendarDays,
    title: "Wer macht was? Und wann passt es wirklich?",
    intro:
      "Planen Sie Ihr Team und behalten Sie die Einsatzorte auf der Karte im Blick. Änderungen aus dem Büro erscheinen in der mobilen Einsatzübersicht.",
    platforms: ["web", "mobile"],
    access:
      "Büro und Admin planen im Web; mobile Mitarbeiter sehen zugeordnete Einsätze.",
    points: [
      [
        "Mehr als einzelne Termine",
        "Planen Sie mehrtägige Einsätze mit Bezug zu Projektphasen.",
      ],
      [
        "Änderungen direkt vornehmen",
        "Einsätze lassen sich verschieben, kopieren und zeitlich anpassen.",
      ],
      [
        "Kapazitäten berücksichtigen",
        "Mitarbeiter, Abwesenheiten und Ressourcen geben der Planung einen nachvollziehbaren Rahmen.",
      ],
      [
        "Einsatzorte auf der Karte",
        "Sehen Sie, wo Ihr Team eingeplant ist, und filtern Sie die Einsätze nach Tag und Mitarbeiter.",
      ],
      [
        "Unterwegs zum Auftrag",
        "Ihr Team öffnet den Einsatz auf dem Handy, sieht den Zielort und kann die Navigation starten.",
      ],
      [
        "Über Änderungen informiert",
        "Verknüpfte Teammitglieder werden über neue und geänderte Einsätze benachrichtigt. Bei aktivierten Push-Mitteilungen erscheint der Hinweis direkt auf dem Handy.",
      ],
    ],
    steps: [
      "Wählen Sie Projekt, Zeitraum und Mitarbeiter.",
      "Legen Sie den Einsatz an oder verschieben Sie einen bestehenden Einsatz.",
      "Prüfen Sie Kapazitäten und zugeordnete Ressourcen.",
    ],
    note: "Die Karte zeigt geplante Einsatzorte, keine laufend erfassten Mitarbeiterstandorte. Für Kartenpins sind Zielkoordinaten erforderlich; Karten und Routen in der App benötigen Verbindung.",
    help: "plantafel-einsatz-planen",
    related: ["zeiterfassung", "team", "projektverwaltung"],
    demo: "planung",
  },
  {
    slug: "zeiterfassung",
    name: "Zeiterfassung",
    icon: Clock,
    title: "Die Zeit landet dort, wo die Arbeit passiert.",
    intro:
      "Starten, arbeiten, stoppen: Die App erfasst die Zeit mit Standort und ordnet sie beim Timerstart dem passenden Projekt in Ihrer Nähe zu. Im Büro stehen die Stunden für Auswertung und Nachkalkulation bereit.",
    platforms: ["web", "mobile"],
    access:
      "Mobile Mitarbeiter erfassen eigene Zeiten; fremde Einträge sind nur mit passenden Rechten sichtbar und bearbeitbar.",
    points: [
      [
        "Arbeitszeit mit Standort",
        "Die App hält beim Starten und Stoppen jeweils den Standort fest. Im Büro sehen Sie den Ort zum Zeiteintrag.",
      ],
      [
        "Das Projekt findet sich mit",
        "Liegt ein hinterlegter Projektort im eingestellten Radius, ordnet die App den Timer beim Start dem nächstgelegenen passenden Projekt zu.",
      ],
      [
        "Nachtragen und korrigieren",
        "Manuelle Einträge ergänzen die Erfassung im Rahmen der Berechtigungen.",
      ],
      [
        "Stunden weiterverwenden",
        "Projekt- und Monatsansichten unterstützen Auswertung und Nachkalkulation.",
      ],
    ],
    steps: [
      "Starten Sie den mobilen Timer mit Standortfreigabe und prüfen Sie die automatisch gewählte Zuordnung oder starten Sie direkt im Projekt.",
      "Beenden Sie den Eintrag und kontrollieren Sie Dauer und Zuordnung.",
      "Prüfen Sie die Stunden in der Web-Auswertung.",
    ],
    note: "Die App erfasst einzelne Standortpunkte beim Start und Stopp, keine Bewegungsverläufe. GPS-Freigabe und eine ermittelbare Position sind erforderlich. Die automatische Projektwahl setzt gespeicherte Projektkoordinaten im passenden Radius voraus; eine bewusst gewählte Zuordnung bleibt erhalten.",
    help: "mobilen-timer-bedienen",
    related: ["plantafel", "nachkalkulation", "team"],
    demo: "planung",
  },
  {
    slug: "lager",
    name: "Lager & Material",
    icon: Package,
    title: "Wissen, was da ist. Und wohin es gegangen ist.",
    intro:
      "Bestände, Lagerorte und Bewegungen nachvollziehbar verwalten. Auftragsbezogene Entnahmen verbinden das Material mit den Kosten des Projekts.",
    platforms: ["web", "mobile"],
    access:
      "Büro- und Admin-Zugänge mit den eingerichteten Lagerrechten. In der Mobile-App scannen berechtigte Mitarbeitende Artikel per Barcode, sehen den Bestand ihrer freigegebenen Lager und buchen Ausgabe, Rücknahme oder Bewegung.",
    points: [
      [
        "Lagerorte abbilden",
        "Organisieren Sie Bestände nach Lagerorten und Lagerplätzen.",
      ],
      [
        "Bewegungen nachvollziehen",
        "Wareneingang, Entnahme, Umlagerung und Rückbuchung bilden den Materialfluss ab.",
      ],
      [
        "Bestände prüfen",
        "Inventur und Bestandskorrektur unterstützen den Abgleich mit dem tatsächlichen Material.",
      ],
    ],
    steps: [
      "Legen Sie Artikel, Lagerorte und Bestände an.",
      "Buchen Sie die Materialbewegung mit dem passenden Bezug.",
      "Prüfen Sie Bestände und führen Sie bei Bedarf eine Inventur durch.",
    ],
    note: "Bestands- und Kostenwerte setzen voraus, dass die tatsächlichen Bewegungen gebucht werden.",
    help: "material-entnehmen-zurueckbuchen",
    related: ["nachkalkulation", "angebote", "projektverwaltung"],
  },
  {
    slug: "baudokumentation",
    name: "Baudokumentation",
    icon: HardHat,
    title: "Was auf der Baustelle passiert, bleibt im Projekt.",
    intro:
      "Halten Sie Arbeiten, Fotos und Mängel direkt beim Projekt fest. Mobile Unterschriften ergänzen Berichte und Abnahmen um Ort und Zeitpunkt, im Büro jederzeit wieder auffindbar.",
    platforms: ["web", "mobile"],
    access:
      "Projektzugriff und Dokumentationsaktionen richten sich nach Rolle und Freigabe.",
    points: [
      [
        "Bautagesberichte",
        "Leistungen, Personal und ergänzende Informationen in Berichten bündeln.",
      ],
      [
        "Mängel bearbeiten",
        "Status und Zuständigkeiten unterstützen die Bearbeitung bis zur Erledigung.",
      ],
      [
        "Unterschriften mit Ort und Zeit",
        "Beim Unterschreiben in der App werden Standort und Zeitpunkt erfasst. Die Unterschriftsorte der Beteiligten bleiben im Bericht oder Abnahmeprotokoll getrennt nachvollziehbar.",
      ],
      [
        "Berichte abrechnen",
        "Geeignete Leistungen lassen sich in einen prüfbaren Rechnungsentwurf übernehmen.",
      ],
    ],
    steps: [
      "Öffnen Sie Berichte, Mängel oder Abnahmen im Projekt.",
      "Ergänzen Sie Angaben, Fotos und gegebenenfalls Unterschriften.",
      "Prüfen Sie das Dokument und erstellen Sie die Ausgabe.",
    ],
    note: "Die Bestätigung einer mobilen Unterschrift benötigt Standortfreigabe und eine ermittelbare Position. Der angezeigte Ort kann ungenau sein; Foto-Uploads benötigen Verbindung.",
    help: "bautagesbericht-erstellen",
    related: ["projektverwaltung", "rechnungen", "aufmass"],
    demo: "rechnung",
  },
  {
    slug: "aufmass",
    name: "Aufmaß",
    icon: Ruler,
    title: "Aus Maßen werden nachvollziehbare Positionen.",
    intro:
      "Räume, Flächen und Abzüge erfassen und geprüfte Mengen ins Angebot übernehmen. Boden, Wand und Decke bleiben dabei dem Projekt zugeordnet.",
    platforms: ["web", "mobile"],
    access:
      "Projekt- und Aufmaßrechte sind erforderlich; die vollständige anschließende Angebotskalkulation erfolgt im Web.",
    points: [
      [
        "Raumweise erfassen",
        "Strukturieren Sie Boden-, Wand- und Deckenflächen passend zu den Räumen.",
      ],
      [
        "Abzüge berücksichtigen",
        "Türen, Fenster und weitere Öffnungen fließen in die Mengen ein.",
      ],
      [
        "Mengen übernehmen",
        "Verwenden Sie geprüfte Mengen im Angebot und ergänzen Sie Leistung und Preis.",
      ],
    ],
    steps: [
      "Legen Sie einen Raum im Aufmaß des Projekts an.",
      "Erfassen Sie Abmessungen und abzuziehende Öffnungen.",
      "Prüfen Sie die Mengen und übernehmen Sie Angebotspositionen.",
    ],
    note: "Maße werden eingegeben und geprüft. Automatische Laseranbindung oder präzise Fotogrammetrie werden nicht vorausgesetzt.",
    help: "raumaufmass-angebot-uebernehmen",
    related: ["angebote", "arbeitsanweisungen", "baudokumentation"],
    demo: "angebot",
  },
  {
    slug: "arbeitsanweisungen",
    name: "Arbeitsanweisungen",
    icon: ClipboardList,
    title: "Das Team weiß, was zu tun ist.",
    intro:
      "Leistungen und Materialbedarf aus dem Dokument für die Ausführung bereitstellen, ohne Verkaufspreise und mit direktem Projektbezug.",
    platforms: ["web", "mobile"],
    access:
      "Berechtigte Büro- und Admin-Zugänge erstellen und verwalten die Arbeitsanweisungen in der Web-App. In der Mobile-App sieht das Team die Arbeitsschritte des Projekts mit Anleitung, Material und Werkzeug und hakt erledigte Schritte ab.",
    points: [
      [
        "Leistungen weitergeben",
        "Arbeitsanweisungen übernehmen den fachlichen Inhalt des Quelldokuments.",
      ],
      [
        "Material zusammenführen",
        "Eine aggregierte Materialliste unterstützt die Einsatzvorbereitung.",
      ],
      [
        "Preise schützen",
        "Die für die Ausführung bestimmten Informationen werden ohne Verkaufspreise dargestellt.",
      ],
    ],
    steps: [
      "Wählen Sie ein geeignetes Quelldokument im Projekt.",
      "Prüfen Sie die abgeleiteten Leistungen und den Materialbedarf.",
      "Stellen Sie die Arbeitsanweisung für die Ausführung bereit.",
    ],
    note: "Arbeitsanweisungen erstellen und verwalten Sie in der Web-App; die Mobile-App zeigt die Arbeitsschritte auf der Baustelle. Eine Materialliste allein bucht noch keine Lagerentnahme.",
    help: "projektdateien-ordner",
    related: ["angebote", "projektverwaltung", "lager"],
  },
  {
    slug: "team",
    name: "Team & Rechte",
    icon: Users,
    title: "Jeder Zugang passt zur Aufgabe.",
    intro:
      "Mitarbeiter einladen, Zugänge zuweisen und Rechte passend zur Arbeit vergeben. Büro und Baustelle nutzen dieselbe Grundlage mit unterschiedlichen Aufgaben.",
    platforms: ["web", "mobile"],
    access:
      "Admin verwaltet Lizenzen und Rechte; weitere Aktionen hängen von den eingerichteten Berechtigungen ab.",
    points: [
      [
        "Passende Zugänge",
        "Admin und Büro nutzen den Web-Zugang, App-Zugänge sind für mobile Mitarbeit vorgesehen.",
      ],
      [
        "Fünf Rollen-Presets",
        "Vorgegebene Rollen unterstützen die Einrichtung; einzelne Rechte bleiben überprüfbar.",
      ],
      [
        "Abwesenheiten berücksichtigen",
        "Urlaubsanträge und ihre Bearbeitung ergänzen die Team- und Einsatzplanung.",
      ],
    ],
    steps: [
      "Laden Sie ein Mitglied ein und weisen Sie den passenden Lizenztyp zu.",
      "Wählen Sie die Rolle und prüfen Sie die Berechtigungen.",
      "Ordnen Sie Projekte und Einsätze dem Aufgabenbereich zu.",
    ],
    note: "Lizenz und Rolle sind unterschiedliche Einstellungen. Der erste Admin-Zugang ist erforderlich.",
    help: "rollen-zugriffsrechte-einstellen",
    related: ["plantafel", "zeiterfassung", "projektverwaltung"],
  },
  {
    slug: "nachkalkulation",
    name: "Nachkalkulation",
    icon: TrendingUp,
    title: "Was war geplant? Was hat der Auftrag wirklich gekostet?",
    intro:
      "Geplante und tatsächliche Kosten für Lohn, Material und weitere Leistungen vergleichen. So werden Abweichungen und fehlende Zuordnungen sichtbar.",
    platforms: ["web"],
    access:
      "Büro oder Admin mit Zugriff auf die Finanz- und Controllingdaten des Projekts.",
    points: [
      [
        "Kostenarten getrennt sehen",
        "Lohn, Material, Geräte, Fremdleistungen und weitere Kosten gegenüberstellen.",
      ],
      [
        "Fortschritt einordnen",
        "Bewerten Sie Kosten gemeinsam mit dem erfassten Projektfortschritt.",
      ],
      [
        "Besser kalkulieren",
        "Nutzen Sie abgeschlossene Aufträge als Grundlage für zukünftige Angebote.",
      ],
    ],
    steps: [
      "Öffnen Sie das Controlling des Projekts.",
      "Vergleichen Sie Planwerte mit Stunden, Material und Belegen.",
      "Prüfen Sie Abweichungen und ergänzen Sie fehlende Zuordnungen.",
    ],
    note: "Prognosen sind berechnete Einschätzungen aus vorhandenen Daten, keine Zusage eines zukünftigen Ergebnisses.",
    help: "zeiten-pruefen-exportieren",
    related: ["zeiterfassung", "lager", "eingangsrechnungen"],
    demo: "planung",
  },
  {
    slug: "kundenportal",
    name: "Kundenportal",
    icon: Globe,
    title: "Ein gemeinsamer Ort für Ihre Kunden.",
    intro:
      "Angebote, Rechnungen, Termine und Nachrichten im Browser. Sie laden Ihre Kunden per E-Mail ein, der Kunde sieht nur die für ihn freigegebenen Projekte und Dokumente.",
    platforms: ["web"],
    access:
      "Separater Kundenbereich mit eigenem Login; Einladung und Zugang verwalten berechtigte Büro- und Admin-Zugänge im Kundenstamm.",
    points: [
      [
        "Dokumente im Browser",
        "Freigegebene Angebote und Rechnungen können im Kundenbereich dargestellt werden.",
      ],
      [
        "Angebote beantworten",
        "Der Portalablauf unterstützt Annahme und Ablehnung mit optionaler Rückmeldung.",
      ],
      [
        "Projekte, Termine und Nachrichten",
        "Kunden sehen ihre Projekte und Termine und schreiben Ihnen direkt zum Projekt.",
      ],
    ],
    steps: [
      "Hinterlegen Sie die E-Mail-Adresse im Kundenstamm und laden Sie den Kunden ins Portal ein.",
      "Stellen Sie die vorgesehenen Dokumente und Projektinformationen bereit.",
      "Der Kunde meldet sich an und sieht die freigegebenen Informationen im Browser.",
    ],
    note: "Rechnungen aus dem Portal begleicht der Kunde per Überweisung auf das Konto, das auf dem Rechnungs-PDF steht.",
    help: "kunden-ansprechpartner-anlegen",
    related: ["angebote", "rechnungen", "projektverwaltung"],
  },
];
export const funktionen: Funktion[] = definitions.map((d) => ({
  slug: d.slug,
  name: d.name,
  icon: d.icon,
  tier: "heute",
  kurz: d.intro,
  heroTitle: d.title,
  heroIntro: d.intro,
  bullets: d.points.map(([titel, text]) => ({ titel, text })),
  faq: [
    { q: "Wie läuft die Nutzung ab?", a: d.steps.join(" ") },
    { q: "Welchen Zugang benötigen Sie?", a: d.access },
  ],
  seoTitle: d.name + " für Handwerksbetriebe",
  seoDescription: d.intro,
  platforms: d.platforms,
  access: d.access,
  steps: d.steps,
  notes: [d.note],
  helpSlug: d.help,
  related: d.related,
  demo: d.demo,
  checkedAt: "2026-10-20",
}));
export function getFunktion(slug: string): Funktion | undefined {
  return funktionen.find((f) => f.slug === slug);
}
export const upcomingFeatures = [
  {
    name: "Telefon-Agent",
    text: "Anrufe aufnehmen, Anliegen erfassen und die weitere Bearbeitung im Betrieb vorbereiten.",
    when: "Geplant: September / Anfang Oktober 2026",
  },
  {
    name: "Offener MCP-Server",
    text: "Externe KI-Assistenten mit den freigegebenen CraftOS-Funktionen verbinden.",
    when: "Geplant: September / Anfang Oktober 2026",
  },
  {
    name: "Weitere Agent-Aktionen",
    text: "Craft AI soll nach Ihrer Bestätigung zusätzliche Aufgaben im System ausführen können.",
    when: "Geplant: September 2026",
  },
];
export const vision = upcomingFeatures;
