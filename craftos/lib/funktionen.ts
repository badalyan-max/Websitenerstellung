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
  FileInput,
  BellRing,
  CalendarRange,
  Landmark,
  Import,
  TriangleAlert,
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
  /** Genau ein Nutzensatz (≤ 100 Zeichen) für Funktionskarten und Gruppenmodell (06-UI-SPEC). */
  benefit: string;
  /** Kurzbeschreibung für das Produktregister (summary); llms.txt nutzt `kurz` mit demselben Text. */
  heroIntro: string;
  platforms: ProductPlatform[];
  /** Zugang laut Release für das Produktregister (nicht gerendert). */
  access: string;
  /** Einschränkungen für das Produktregister (nicht gerendert). */
  notes: string[];
  helpSlug: string;
  related: string[];
  demo?: DemoScene;
  checkedAt: string;
}
/**
 * Stammdaten je Funktion. Seitentexte der Detailseiten (Kopf, Ablauf, Kernpunkte, FAQ) stehen ausschließlich in
 * lib/funktionsdetails/{gruppe}.ts; die früheren Felder title, points und steps las seit Phase 7 niemand mehr und
 * wurden entfernt, damit keine zweite Textquelle auseinanderläuft (Code-Review 07 WR-06). intro, access und note
 * speisen llms.txt und das Produktregister; für die sechs Phase-7-Funktionen prüft tests/funktionsdetails.test.ts
 * dieselben Wortregeln wie auf den Detailseiten.
 */
interface Definition {
  slug: string;
  name: string;
  icon: LucideIcon;
  intro: string;
  benefit: string;
  platforms: ProductPlatform[];
  access: string;
  note: string;
  help: string;
  related: string[];
  demo?: DemoScene;
}
const definitions: Definition[] = [
  {
    slug: "dashboard",
    name: "Dashboard",
    benefit:
      "Projekte, offene Beträge, Angebote und Aufgaben auf einen Blick sehen.",
    icon: LayoutDashboard,
    intro:
      "Projekte, offene Beträge, Angebote und Aufgaben auf einen Blick. Ihr Dashboard verbindet die wichtigen Zahlen mit der nächsten konkreten Aufgabe.",
    platforms: ["web"],
    access:
      "Büro und Admin; die sichtbaren Daten richten sich nach den eingerichteten Rechten.",
    note: "Die Auswertung berücksichtigt die tatsächlich erfassten Betriebsdaten.",
    help: "projekt-phasen-anlegen",
    related: ["projektverwaltung", "nachkalkulation", "plantafel"],
    demo: "dashboard",
  },
  {
    slug: "projektverwaltung",
    name: "Projektverwaltung",
    benefit:
      "Kunden, Phasen, Aufgaben, Termine und Dokumente bleiben beim jeweiligen Auftrag.",
    icon: FolderKanban,
    intro:
      "Kunden, Phasen, Aufgaben, Termine, Dokumente und Projektchat bleiben beim Auftrag, vom ersten Angebot bis zur letzten Rückmeldung von der Baustelle.",
    platforms: ["web", "mobile"],
    access:
      "Büro und Admin verwalten Projekte; mobile Mitarbeiter sehen freigegebene Projekte und Bereiche.",
    note: "Finanzdaten und Projektzugriffe werden durch die Rechte des Mitglieds begrenzt.",
    help: "projekt-phasen-anlegen",
    related: ["arbeitsanweisungen", "baudokumentation", "nachkalkulation"],
    demo: "dashboard",
  },
  {
    slug: "angebote",
    name: "Angebote & Kalkulation",
    benefit:
      "Positionen mit Lohn, Material und Zuschlägen kalkulieren und als PDF mit Briefpapier ausgeben.",
    icon: FileText,
    intro:
      "Leistungen beschreiben, Mengen übernehmen und Kosten kalkulieren. Material, Lohn und Zuschläge machen aus einer Schätzung ein nachvollziehbares Angebot.",
    platforms: ["web", "mobile"],
    access:
      "Die vollständige Tiefenkalkulation steht Büro und Admin im Web zur Verfügung; mobile Dokumentaktionen hängen von Rolle und Freigabe ab.",
    note: "GAEB- und DATANORM-Import unterstützen die Übernahme von Daten. Großhändlerkataloge lesen Sie in DATANORM 4 und DATANORM 5 ein.",
    help: "angebot-entwurf-anlegen",
    related: ["aufmass", "rechnungen", "nachkalkulation"],
    demo: "angebot",
  },
  {
    slug: "rechnungen",
    name: "Rechnungen",
    benefit:
      "Abschlags-, Teil- und Schlussrechnungen erstellen und Zahlungseingänge zuordnen.",
    icon: Receipt,
    intro:
      "Rechnungen, Abschläge und Schlussrechnungen erstellen, Zahlungen zuordnen und den Belegzusammenhang behalten. Sie prüfen den Entwurf, bevor das Dokument fertiggestellt wird.",
    platforms: ["web"],
    access:
      "Büro oder Admin mit den erforderlichen Dokument- und Finanzrechten.",
    note: "Fertiggestellte Rechnungen werden über nachvollziehbare Folgebelege korrigiert. Eine Zahlungserfassung ist keine Bankbestätigung.",
    help: "rechnung-fertigstellen",
    related: ["e-rechnung", "buchhaltung", "baudokumentation"],
    demo: "rechnung",
  },
  {
    slug: "e-rechnung",
    name: "E-Rechnung",
    benefit:
      "Rechnungen als XRechnung oder ZUGFeRD mit strukturierten Daten ausgeben.",
    icon: FileCheck2,
    intro:
      "XRechnung und ZUGFeRD verbinden strukturierte Rechnungsdaten mit Ihrem Dokumentablauf. Auch elektronische Eingangsrechnungen lassen sich einlesen.",
    platforms: ["web"],
    access: "Büro oder Admin mit Zugriff auf Rechnungen und deren Ausgabe.",
    note: "Eine gewöhnliche PDF ist keine strukturierte E-Rechnung. Erforderliche Referenzen hängen vom Empfänger ab.",
    help: "e-rechnung-herunterladen",
    related: ["rechnungen", "eingangsrechnungen", "buchhaltung"],
    demo: "rechnung",
  },
  {
    slug: "buchhaltung",
    name: "Buchhaltung & DATEV",
    benefit:
      "Belege prüfen und Buchungsdaten samt Belegbezug für DATEV exportieren.",
    icon: Calculator,
    intro:
      "Belege prüfen, Buchungen nachvollziehen und Daten samt Belegbezug exportieren. So schaffen Betrieb und Steuerberatung eine gemeinsame Arbeitsgrundlage.",
    platforms: ["web"],
    access:
      "Berechtigte Büro-/Admin-Zugänge; Finanz- und Exportrechte werden gesondert vergeben.",
    note: "Der Export ersetzt keine fachliche Prüfung oder Steuererklärung. Eine automatische ELSTER-Einreichung erfolgt nicht.",
    help: "datev-export-erstellen",
    related: ["eingangsrechnungen", "rechnungen", "nachkalkulation"],
    demo: "beleg",
  },
  {
    slug: "eingangsrechnungen",
    name: "Eingangsrechnungen & Belegscan",
    benefit:
      "Belege fotografieren, erkannte Angaben prüfen und Ausgaben einem Projekt zuordnen.",
    icon: ScanLine,
    intro:
      "Belege aufnehmen, erkannte Angaben kontrollieren und Ausgaben einem Projekt zuordnen. Sie korrigieren bei Bedarf und speichern nach der Prüfung.",
    platforms: ["web", "mobile"],
    access:
      "Die jeweilige Finanzfreigabe ist erforderlich; eine App-Lizenz allein gibt keinen pauschalen Zugriff auf Belege.",
    note: "KI-Auslesen benötigt eine Verbindung und verbraucht Credits; strukturierte E-Rechnungsdaten werden ohne OCR gelesen.",
    help: "beleg-scannen-pruefen",
    related: ["buchhaltung", "projektverwaltung", "nachkalkulation"],
    demo: "beleg",
  },
  {
    slug: "plantafel",
    name: "Plantafel & Einsatzplanung",
    benefit:
      "Einsätze für das Team planen und die Einsatzorte auf der Karte im Blick behalten.",
    icon: CalendarDays,
    intro:
      "Planen Sie Ihr Team und behalten Sie die Einsatzorte auf der Karte im Blick. Änderungen aus dem Büro erscheinen in der mobilen Einsatzübersicht.",
    platforms: ["web", "mobile"],
    access:
      "Büro und Admin planen im Web; mobile Mitarbeiter sehen zugeordnete Einsätze.",
    note: "Die Karte zeigt geplante Einsatzorte, keine laufend erfassten Mitarbeiterstandorte. Für Kartenpins sind Zielkoordinaten erforderlich; Karten und Routen in der App benötigen Verbindung.",
    help: "plantafel-einsatz-planen",
    related: ["zeiterfassung", "team", "projektverwaltung"],
    demo: "planung",
  },
  {
    slug: "zeiterfassung",
    name: "Zeiterfassung",
    benefit:
      "Arbeitszeit per Timer starten und stoppen, mit Standort erfassen und einem Projekt zuordnen.",
    icon: Clock,
    intro:
      "Starten, arbeiten, stoppen: Die App erfasst die Zeit mit Standort und ordnet sie beim Timerstart dem passenden Projekt in Ihrer Nähe zu. Im Büro stehen die Stunden für Auswertung und Nachkalkulation bereit.",
    platforms: ["web", "mobile"],
    access:
      "Mobile Mitarbeiter erfassen eigene Zeiten; fremde Einträge sind nur mit passenden Rechten sichtbar und bearbeitbar.",
    note: "Die App erfasst einzelne Standortpunkte beim Start und Stopp, keine Bewegungsverläufe. GPS-Freigabe und eine ermittelbare Position sind erforderlich. Die automatische Projektwahl setzt gespeicherte Projektkoordinaten im passenden Radius voraus; eine bewusst gewählte Zuordnung bleibt erhalten.",
    help: "mobilen-timer-bedienen",
    related: ["plantafel", "nachkalkulation", "team"],
    demo: "planung",
  },
  {
    slug: "lager",
    name: "Lager & Material",
    benefit:
      "Bestände, Lagerorte und Materialbewegungen nachvollziehbar verwalten.",
    icon: Package,
    intro:
      "Bestände, Lagerorte und Bewegungen nachvollziehbar verwalten. Auftragsbezogene Entnahmen verbinden das Material mit den Kosten des Projekts.",
    platforms: ["web", "mobile"],
    access:
      "Büro- und Admin-Zugänge mit den eingerichteten Lagerrechten. In der Mobile-App scannen berechtigte Mitarbeitende Artikel per Barcode, sehen den Bestand ihrer freigegebenen Lager und buchen Ausgabe, Rücknahme oder Bewegung.",
    note: "Bestands- und Kostenwerte setzen voraus, dass die tatsächlichen Bewegungen gebucht werden.",
    help: "material-entnehmen-zurueckbuchen",
    related: ["nachkalkulation", "angebote", "projektverwaltung"],
  },
  {
    slug: "baudokumentation",
    name: "Baudokumentation",
    benefit:
      "Arbeiten, Fotos und Mängel direkt beim Projekt festhalten und im Büro wiederfinden.",
    icon: HardHat,
    intro:
      "Halten Sie Arbeiten, Fotos und Mängel direkt beim Projekt fest. Mobile Unterschriften ergänzen Berichte und Abnahmen um Ort und Zeitpunkt, im Büro jederzeit wieder auffindbar.",
    platforms: ["web", "mobile"],
    access:
      "Projektzugriff und Dokumentationsaktionen richten sich nach Rolle und Freigabe.",
    note: "Die Bestätigung einer mobilen Unterschrift benötigt Standortfreigabe und eine ermittelbare Position. Der angezeigte Ort kann ungenau sein; Foto-Uploads benötigen Verbindung.",
    help: "bautagesbericht-erstellen",
    related: ["projektverwaltung", "rechnungen", "aufmass"],
    demo: "rechnung",
  },
  {
    slug: "aufmass",
    name: "Aufmaß",
    benefit:
      "Räume, Flächen und Abzüge vor Ort erfassen und die Mengen ins Angebot übernehmen.",
    icon: Ruler,
    intro:
      "Räume, Flächen und Abzüge erfassen und geprüfte Mengen ins Angebot übernehmen. Boden, Wand und Decke bleiben dabei dem Projekt zugeordnet.",
    platforms: ["web", "mobile"],
    access:
      "Projekt- und Aufmaßrechte sind erforderlich; die vollständige anschließende Angebotskalkulation erfolgt im Web.",
    note: "Maße werden eingegeben und geprüft. Automatische Laseranbindung oder präzise Fotogrammetrie werden nicht vorausgesetzt.",
    help: "raumaufmass-angebot-uebernehmen",
    related: ["angebote", "arbeitsanweisungen", "baudokumentation"],
    demo: "angebot",
  },
  {
    slug: "arbeitsanweisungen",
    name: "Arbeitsanweisungen",
    benefit:
      "Leistungen und Materialbedarf ohne Verkaufspreise für die Ausführung bereitstellen.",
    icon: ClipboardList,
    intro:
      "Leistungen und Materialbedarf aus dem Dokument für die Ausführung bereitstellen, ohne Verkaufspreise und mit direktem Projektbezug.",
    platforms: ["web", "mobile"],
    access:
      "Berechtigte Büro- und Admin-Zugänge erstellen und verwalten die Arbeitsanweisungen in der Web-App. In der Mobile-App sieht das Team die Arbeitsschritte des Projekts mit Anleitung, Material und Werkzeug und hakt erledigte Schritte ab.",
    note: "Arbeitsanweisungen erstellen und verwalten Sie in der Web-App; die Mobile-App zeigt die Arbeitsschritte auf der Baustelle. Eine Materialliste allein bucht noch keine Lagerentnahme.",
    help: "projektdateien-ordner",
    related: ["angebote", "projektverwaltung", "lager"],
  },
  {
    slug: "team",
    name: "Team & Rechte",
    benefit:
      "Mitarbeitende einladen und Zugänge und Rechte passend zur Aufgabe vergeben.",
    icon: Users,
    intro:
      "Mitarbeiter einladen, Zugänge zuweisen und Rechte passend zur Arbeit vergeben. Büro und Baustelle nutzen dieselbe Grundlage mit unterschiedlichen Aufgaben.",
    platforms: ["web", "mobile"],
    access:
      "Admin verwaltet Lizenzen und Rechte; weitere Aktionen hängen von den eingerichteten Berechtigungen ab.",
    note: "Lizenz und Rolle sind unterschiedliche Einstellungen. Der erste Admin-Zugang ist erforderlich.",
    help: "rollen-zugriffsrechte-einstellen",
    related: ["plantafel", "zeiterfassung", "projektverwaltung"],
  },
  {
    slug: "nachkalkulation",
    name: "Nachkalkulation",
    benefit:
      "Geplante und tatsächliche Kosten je Projekt vergleichen und Abweichungen erkennen.",
    icon: TrendingUp,
    intro:
      "Geplante und tatsächliche Kosten für Lohn, Material und weitere Leistungen vergleichen. So werden Abweichungen und fehlende Zuordnungen sichtbar.",
    platforms: ["web"],
    access:
      "Büro oder Admin mit Zugriff auf die Finanz- und Controllingdaten des Projekts.",
    note: "Prognosen sind berechnete Einschätzungen aus vorhandenen Daten, keine Zusage eines zukünftigen Ergebnisses.",
    help: "zeiten-pruefen-exportieren",
    related: ["zeiterfassung", "lager", "eingangsrechnungen"],
    demo: "planung",
  },
  {
    slug: "kundenportal",
    name: "Kundenportal",
    benefit:
      "Kunden unterschreiben Angebote online und erhalten Rechnungen als PDF per E-Mail.",
    icon: Globe,
    intro:
      "Sie laden Ihre Kunden per E-Mail ins Portal ein, dort melden sie sich mit eigenem Zugang an. Angebote öffnen sie über einen persönlichen Link und unterschreiben sie online; Rechnungen erhalten sie als PDF.",
    platforms: ["web"],
    access:
      "Separater Kundenbereich mit eigenem Login; Einladung und Zugang verwalten berechtigte Büro- und Admin-Zugänge im Kundenstamm.",
    note: "Rechnungen begleicht der Kunde per Überweisung auf das Konto, das auf dem Rechnungs-PDF steht.",
    help: "kundenportal-kunden-einladen",
    related: ["angebote", "rechnungen", "projektverwaltung"],
  },
  // Phase 7 (D-07): sechs live und beworbene Funktionen, bisher Zusatzfunktionen im Produktregister.
  // Seitentexte stehen in lib/funktionsdetails/*; hier nur Stammdaten, note = Text der Grenze-Kachel (WR-06).
  {
    slug: "gaeb",
    name: "GAEB und DATANORM",
    benefit:
      "Leistungsverzeichnisse per GAEB importieren und exportieren, Artikel per DATANORM einlesen.",
    icon: FileInput,
    intro:
      "Leistungsverzeichnisse als GAEB X83 importieren, Angebote als X84 abgeben und Artikel per DATANORM einlesen.",
    platforms: ["web"],
    access:
      "Admin- und Büro-Zugänge mit Zugriff auf Dokumente nutzen GAEB und DATANORM in der Web-App.",
    note: "Leistungsverzeichnisse als X83 in GAEB DA XML 3.2 oder 3.3 einlesen, bis 5 MiB in UTF-8.",
    help: "gaeb-importieren",
    related: ["angebote", "aufmass"],
  },
  {
    slug: "mahnwesen",
    name: "Mahnwesen",
    benefit:
      "Zahlungserinnerungen mit Fristen, Stufen und Vorlagen einrichten, auf Wunsch automatisch.",
    icon: BellRing,
    intro:
      "Fristen, Gebühren und Vorlagen je Stufe festlegen und überfällige Rechnungen auf Wunsch automatisch mahnen.",
    platforms: ["web"],
    access:
      "Admin- und Büro-Zugänge mit Zugriff auf die Einstellungen; Fristen, Gebühren und Stufen ändert nur der Inhaber des Betriebs.",
    note: "Auf Wunsch mahnt die Automatik normale Rechnungen nach Ihren Fristen.",
    help: "mahnwesen-einrichten",
    related: ["rechnungen", "bankabgleich"],
  },
  {
    slug: "terminplanung",
    name: "Terminplanung",
    benefit:
      "Arbeitsabschnitte im Projektplan terminieren und Abhängigkeiten zwischen ihnen sehen.",
    icon: CalendarRange,
    intro:
      "Arbeitsabschnitte im Projektplan terminieren, Abhängigkeiten setzen und den Stand in der Mobile-App zeigen.",
    platforms: ["web", "mobile"],
    access:
      "Admin- und Büro-Zugänge planen in der Web-App; das Team sieht die Arbeitsabschnitte in der Mobile-App im Projekt und am Einsatz.",
    note: "Die Mobile-App zeigt Arbeitsabschnitte mit Status an, geändert wird die Planung in der Web-App.",
    help: "projekt-phasen-anlegen",
    related: ["plantafel", "projektverwaltung"],
  },
  {
    slug: "bankabgleich",
    name: "Bankabgleich",
    benefit:
      "Bankdatei importieren und Umsätze mit Belegen und erfassten Zahlungen verbinden.",
    icon: Landmark,
    intro:
      "Bankdatei als CSV, camt.053 oder PDF importieren und Umsätze mit Belegen und erfassten Zahlungen verbinden.",
    platforms: ["web"],
    access:
      "Finanzbereich: Admin; Büro-Zugänge nur mit Finanzfreigabe (Rolle Büro-Leitung).",
    note: "KI-Vorschläge kommen nur auf Ihre Anforderung und kosten Credits, die Zuordnung entscheiden Sie selbst.",
    help: "bankumsaetze-abgleichen",
    related: ["buchhaltung", "rechnungen", "mahnwesen"],
  },
  {
    slug: "datenuebernahme",
    name: "Datenübernahme",
    benefit:
      "Bestehende Daten aus Dateien prüfen, zuordnen und kontrolliert in CraftOS übernehmen.",
    icon: Import,
    intro:
      "Kunden, Projekte und Stammdaten aus Dateien prüfen, zuordnen und kontrolliert in CraftOS übernehmen.",
    platforms: ["web"],
    access: "Datenimport: Admin oder Büro-Leitung.",
    note: "Je Datei gelten höchstens 10 MiB und 25.000 Zeilen, den Import starten Admin oder Büro-Leitung.",
    help: "daten-importieren",
    related: ["team", "buchhaltung"],
  },
  {
    slug: "maengelmanagement",
    name: "Mängelmanagement",
    benefit:
      "Mängel mit Foto erfassen und über Status und Zuständigkeit bis zur Erledigung verfolgen.",
    icon: TriangleAlert,
    intro:
      "Mängel mit Foto, Ort und Frist erfassen, Zuständige festlegen und den Status bis zur Prüfung verfolgen.",
    platforms: ["web", "mobile"],
    access:
      "Admin- und Büro-Zugänge bearbeiten Mängel in der Bauakte; in der Mobile-App arbeiten Mitarbeitende mit Projektzugriff.",
    note: "Foto-Uploads benötigen eine Verbindung zum Internet.",
    help: "mangel-erfassen-bearbeiten",
    related: ["baudokumentation", "projektverwaltung"],
  },
];
export const funktionen: Funktion[] = definitions.map((d) => ({
  slug: d.slug,
  name: d.name,
  icon: d.icon,
  tier: "heute",
  kurz: d.intro,
  benefit: d.benefit,
  heroIntro: d.intro,
  platforms: d.platforms,
  access: d.access,
  notes: [d.note],
  helpSlug: d.help,
  related: d.related,
  demo: d.demo,
  // Stand der Detailseiten (Phase 7 geprüft und ausgeliefert am 2026-10-22); speist lastModified der Sitemap (Code-Review 07 IN-03).
  checkedAt: "2026-10-22",
}));
export function getFunktion(slug: string): Funktion | undefined {
  return funktionen.find((f) => f.slug === slug);
}
