/**
 * Gewerke-Daten (09-UI-SPEC § 1.3; D-05 bis D-08, FEAT-04). Je Gewerk ein Objektliteral mit Antwortsatz, Teaser,
 * gewerktypischem Ablauf (jeder Schritt mit Funktions-Slug), Beispielauftrag, passenden Funktionen, gewerkspezifischen
 * FAQ und weiterführenden Artikeln. H1, Title und Description kommen aus docs/seo/keyword-map.json (08-04).
 *
 * Inhaltsregeln (Belege je Gewerk und Funktion: docs/content-pruefung/09-a.md):
 * - Nur am Release belegte Funktionen; Inhaber 22.10.2026 (L-1): nur nennen, was unterstützt wird. Die frühere
 *   Zusage zu vorbereiteten Vorlagen je Gewerk ist am Release nicht als Nutzerfunktion belegt und entfällt ganz
 *   (Orchestrator-Entscheidung 5).
 * - „Arbeitsabschnitte“ als Produktbegriff, „Geräte & Fahrzeuge“ statt „Ressourcen“, „automatisch“ nur mit
 *   „auf Wunsch“; Beispieldaten fiktiv, Beispiel und `tradeSnippetExamples[slug]` erzählen denselben Auftrag.
 *
 * Prüfungen beim Laden (Muster lib/funktionsdetails): Mengen und Textbudgets aus TEXT_BUDGET.gewerk /
 * TEXT_BUDGET.count.gewerk* (F-A1), Ablauf-Funktionen ⊂ Funktionen, mindestens eine Phase-7-Detailseite, höchstens
 * eine gemeinsame FAQ-Frage, zentrale Wortliste der Leitlinie L-1 (lib/leitlinie.ts) plus die Produktbegriffe der
 * Gewerke-Texte. Die Existenz der Artikelziele prüft tests/gewerke.test.ts (Dateizugriff, dieses Modul wird auch
 * clientseitig geladen); den Vertrag als Ganzes hält tests/gewerke.test.ts fest (09-11).
 */
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { funktionen } from "@/lib/funktionen";
import { l1Treffer } from "@/lib/leitlinie";
import { pruefeNurUnterstuetzt } from "@/lib/nur-unterstuetzt";

export interface GewerkSchritt {
  /** ≤ 28 Zeichen */
  title: string;
  /** ≤ 80 Zeichen, genau ein Satz, Sie-Form */
  text: string;
  /** Slug unter /funktionen/{funktion}; muss in `funktionen` stehen. */
  funktion: string;
}

// Schlüssel der Typ- und Abschnittsdefinitionen in Anführungszeichen, damit die Zählproben für Ablauf und Kopfwort
// je Gewerk nur die zwölf Datensätze treffen (09-02-PLAN, Aufgabe 2).
export interface Gewerk {
  slug: string;
  name: string;
  kurz: string;
  /** Kopfwort-Span der H1 (09-UI-SPEC § 1.3); kommt wörtlich in zielwerte(pfad).h1 vor (Prüfung in 09-11). */
  "kopfwort": string;
  /** Antwortsatz im Kopf (#antwort), ≤ 300, 1–2 Sätze, nennt Gewerk und belegte Funktionen. */
  answer: string;
  /** Kartentext auf /gewerke, ≤ 100, genau ein Satz. */
  teaser: string;
  "ablauf": GewerkSchritt[];
  exampleTitle: string;
  example: string;
  /** 4–6 Funktions-Slugs (Ziel 6), mindestens eine Phase-7-Detailseite. */
  funktionen: string[];
  faq: { q: string; a: string }[];
  /** 2–3 bestehende Artikelpfade /blog/… oder /hilfe/… */
  artikel: string[];
}

/** Kopfwort-Span der Übersicht /gewerke. */
export const GEWERKE_KOPFWORT = "Branchensoftware";

/**
 * Texte der Übersicht /gewerke (09-UI-SPEC § 1b, wörtlich). „zwölf“ in Antwort und H2 muss gewerke.length
 * entsprechen (tests/gewerke.test.ts). Beleg „fragt Ihr Gewerk bei der Einrichtung ab“: Web SetupWizard.tsx Z. 449.
 */
export const GEWERKE_UEBERSICHT = {
  answer:
    "Eine Branchensoftware fürs Handwerk verbindet Angebot, Planung, Baustelle und Rechnung in einem Ablauf. CraftOS fragt Ihr Gewerk bei der Einrichtung ab; für zwölf Gewerke sehen Sie hier einen typischen Auftrag in Web-App und Mobile-App.",
  secondary: { label: "Zu den Gewerken", href: "#gewerke" },
  gewerke: {
    title: "Zwölf Gewerke im Überblick",
    lead: "Jede Seite zeigt einen typischen Auftrag mit den Funktionen, die Sie dafür nutzen.",
  },
} as const;

/** Datum der letzten inhaltlichen Änderung der Gewerke-Seiten (Sitemap `lastModified`). */
export const GEWERKE_STAND = "2026-10-23";

/** Abschnittsköpfe der Gewerke-Detailseiten (09-UI-SPEC § 1.1). */
export const GEWERK_ABSCHNITTE = {
  "ablauf": {
    title: "So läuft ein Auftrag in Ihrem Gewerk",
    lead: "Jeder Schritt führt zur Funktion, mit der Sie ihn in CraftOS erledigen.",
  },
  "funktionen": {
    title: "Passende Funktionen",
    lead: "Mit diesen Funktionen erledigen Sie den Ablauf im Büro und auf der Baustelle.",
  },
  "faq": {
    title: (name: string) => `Häufige Fragen: ${name}`,
    lead: "Kurze Antworten zu Ablauf, Funktionen und Mobile-App für Ihr Gewerk.",
  },
  "weiterlesen": {
    title: "Weiterlesen",
    lead: "Anleitungen und Ratgeber zu den Schritten dieses Ablaufs.",
  },
} as const;

/** CTA-Band der Gewerke-Seiten (09-UI-SPEC § 5). */
export const CTA_GEWERK = {
  title: "Testen Sie CraftOS mit Ihrem Auftrag.",
  text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
  secondary: { label: "Preise ansehen", href: "/preise" },
} as const;

/** Einzige über alle Gewerke gemeinsame FAQ-Frage (09-UI-SPEC § 1.3). */
const FAQ_APP = {
  q: "Kann mein Team die Handy-App nutzen?",
  a: "Ja. Die Voll-Lizenz enthält Web-App und Mobile-App für dieselbe Person. Weitere Mitarbeitende auf der Baustelle können App-Lizenzen erhalten; ihre Rolle bestimmt den Zugriff.",
} as const;

const definitions: Gewerk[] = [
  {
    slug: "elektriker",
    name: "Elektriker & Elektrotechnik",
    kurz: "Elektro",
    kopfwort: "Elektriker-Software:",
    answer:
      "CraftOS verbindet für Elektrobetriebe Angebote mit Artikeln aus DATANORM-Katalogen, die Einsatzplanung, die Zeiterfassung per App, den Lager-Scan und die Rechnung mit Mahnwesen in einer Software für Büro und Baustelle.",
    teaser: "Material aus DATANORM-Katalogen kalkulieren, Einsätze planen und Zeiten am Auftrag erfassen.",
    ablauf: [
      { title: "Material kalkulieren", text: "Übernehmen Sie Artikel aus dem DATANORM-Katalog Ihres Großhändlers.", funktion: "gaeb" },
      { title: "Angebot erstellen", text: "Kalkulieren Sie Material, Lohn und Zuschläge je Position.", funktion: "angebote" },
      { title: "Einsatz planen", text: "Planen Sie Ihre Monteure in der Plantafel für den Auftrag ein.", funktion: "plantafel" },
      { title: "Zeit erfassen", text: "Ihr Team startet den Timer in der Mobile-App am Projekt.", funktion: "zeiterfassung" },
      { title: "Material entnehmen", text: "Buchen Sie Kabel und Schutzgeräte in der App per Barcode aus.", funktion: "lager" },
    ],
    exampleTitle: "Zählerschrank für Familie Braun",
    example:
      "Zählerschrank, Schutzgeräte und Montagezeit kalkulieren Sie als getrennte Kostenbestandteile. Nach der Montage bei Familie Braun ergänzen Sie Material und tatsächliche Stunden.",
    funktionen: ["gaeb", "angebote", "plantafel", "zeiterfassung", "lager", "mahnwesen"],
    faq: [
      {
        q: "Welche DATANORM-Versionen liest CraftOS?",
        a: "DATANORM 4 und DATANORM 5. Sie lesen den Katalog Ihres Großhändlers in der Web-App ein und übernehmen die Artikel danach in Ihre Angebotspositionen.",
      },
      {
        q: "Wie bucht mein Team Material auf der Baustelle?",
        a: "Per Barcode in der Mobile-App. Berechtigte Mitarbeitende scannen den Artikel, sehen den Bestand ihrer freigegebenen Lager und buchen Ausgabe, Rücknahme oder Bewegung.",
      },
      {
        q: "Wie kommen die Stunden der Monteure zum Auftrag?",
        a: "Über den Timer in der Mobile-App. Liegt beim Start ein gespeicherter Projektort im eingestellten Radius, ordnet die App den Timer diesem Projekt zu; im Büro werten Sie die Stunden aus.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/datanorm-katalog-importieren", "/hilfe/plantafel-einsatz-planen", "/hilfe/lager-scan-app"],
  },
  {
    slug: "shk",
    name: "Sanitär, Heizung, Klima",
    kurz: "SHK",
    kopfwort: "SHK-Software:",
    answer:
      "CraftOS bündelt für SHK-Betriebe Besichtigung, Angebot mit Online-Unterschrift, Artikel aus DATANORM-Katalogen, Arbeitsabschnitte, Abnahme und Abschlagsrechnung in einer Software für Büro und Baustelle.",
    teaser: "Angebote online unterschreiben lassen, Arbeitsabschnitte planen und Abschläge abrechnen.",
    ablauf: [
      { title: "Besichtigung festhalten", text: "Legen Sie Fotos, Videos und Sprachnotizen vor Ort im Projekt ab.", funktion: "aufmass" },
      { title: "Angebot unterschreiben", text: "Ihr Kunde nimmt das Angebot online an und unterschreibt es.", funktion: "angebote" },
      { title: "Arbeitsabschnitte planen", text: "Terminieren Sie Rückbau, Installation und Endmontage im Projektplan.", funktion: "terminplanung" },
      { title: "Teilabnahme protokollieren", text: "Protokollieren Sie die Abnahme eines Teils mit Prüfpunkten und Unterschrift.", funktion: "baudokumentation" },
      { title: "Abschlag abrechnen", text: "Stellen Sie Abschlagsrechnungen mit Bezug zum Auftrag.", funktion: "rechnungen" },
    ],
    exampleTitle: "Badsanierung Familie Weber",
    example:
      "Sie gliedern Rückbau, Installation und Endmontage in Arbeitsabschnitte, planen das Team und rechnen vereinbarte Abschläge mit Bezug zum Auftrag ab.",
    funktionen: ["aufmass", "angebote", "gaeb", "terminplanung", "baudokumentation", "rechnungen"],
    faq: [
      {
        q: "Wie unterschreibt mein Kunde das Angebot?",
        a: "Online. Ihr Kunde nimmt das Angebot an und unterschreibt es oder sendet Ihnen eine Ablehnung; im Kundenportal kann er freigegebene Angebote ebenfalls annehmen.",
      },
      {
        q: "Kann ich den Katalog meines Großhändlers einlesen?",
        a: "Ja. CraftOS liest Kataloge in DATANORM 4 und DATANORM 5 ein, die Artikel übernehmen Sie danach in Ihre Angebotspositionen.",
      },
      {
        q: "Wie rechne ich Abschläge einer Badsanierung ab?",
        a: "Mit Abschlagsrechnungen zum Projekt und am Ende der Schlussrechnung. Vor dem Fertigstellen prüfen Sie bisherige Rechnungen, Zahlungen und den Projektstatus.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/angebot-online-unterschreiben-lassen", "/hilfe/abnahme-dokumentieren", "/hilfe/abschlagsrechnung-erstellen"],
  },
  {
    slug: "maler",
    name: "Maler & Lackierer",
    kurz: "Maler",
    kopfwort: "Maler:",
    answer:
      "CraftOS führt Malerbetriebe vom Raumaufmaß mit Abzügen über Angebot und Einsatzplanung bis zu Bautagesbericht, Mängelliste und Nachkalkulation in einer Software für Büro und Baustelle.",
    teaser: "Wand- und Deckenflächen aufmessen, Mengen ins Angebot übernehmen und Arbeiten dokumentieren.",
    ablauf: [
      { title: "Räume aufmessen", text: "Erfassen Sie Wand- und Deckenflächen und ziehen Sie Öffnungen ab.", funktion: "aufmass" },
      { title: "Angebot erstellen", text: "Übernehmen Sie die geprüften Mengen als Positionen ins Angebot.", funktion: "angebote" },
      { title: "Einsatz planen", text: "Planen Sie Ihr Team in der Plantafel für die Baustelle ein.", funktion: "plantafel" },
      { title: "Bericht schreiben", text: "Halten Sie ausgeführte Arbeiten und Fotos im Bautagesbericht fest.", funktion: "baudokumentation" },
      { title: "Nachkalkulieren", text: "Stellen Sie die erfassten Istkosten Ihrer Kalkulation gegenüber.", funktion: "nachkalkulation" },
    ],
    exampleTitle: "Altbauwohnung Familie Becker",
    example:
      "Sie erfassen Wand- und Deckenflächen sowie Öffnungen. Aus den geprüften Nettomengen entstehen Positionen für Untergrundvorbereitung und Beschichtung.",
    funktionen: ["aufmass", "angebote", "plantafel", "baudokumentation", "maengelmanagement", "nachkalkulation"],
    faq: [
      {
        q: "Wie ziehe ich Fenster und Türen von der Wandfläche ab?",
        a: "Als Abzüge im Raumaufmaß. Sie erfassen Boden-, Wand- und Deckenflächen eines Raums, ziehen Öffnungen ab und übernehmen die geprüften Mengen als Angebotspositionen.",
      },
      {
        q: "Wie halte ich Mängel nach der Übergabe fest?",
        a: "Im Mängelmanagement des Projekts. Sie legen den Mangel mit Titel, Ort und Vorher-Foto an, bestimmen Frist und Zuständige und verfolgen den Status bis zur Prüfung.",
      },
      {
        q: "Woran sehe ich, ob die kalkulierten Stunden gereicht haben?",
        a: "In der Nachkalkulation des Projekts. Lohn, Material, Geräte, Fremdleistungen und weitere Kosten stehen dort getrennt nebeneinander, die Zeiten Ihres Teams fließen vom Timer ein.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/raumaufmass-angebot-uebernehmen", "/hilfe/mangel-erfassen-bearbeiten", "/blog/aufmass-angebot-mengen-abzuege"],
  },
  {
    slug: "tischler-schreiner",
    name: "Tischler & Schreiner",
    kurz: "Tischler",
    kopfwort: "Schreiner:",
    answer:
      "CraftOS begleitet Tischlereien und Schreinereien von der Kalkulation über Arbeitsabschnitte und Arbeitsanweisungen bis zu Zeiterfassung, Material und Nachkalkulation in einer Software für Werkstatt, Büro und Baustelle.",
    teaser: "Material und Fertigung kalkulieren, Arbeitsanweisungen bereitstellen und Zeiten erfassen.",
    ablauf: [
      { title: "Kalkulation erstellen", text: "Kalkulieren Sie Platten, Beschläge, Fertigung und Montage je Position.", funktion: "angebote" },
      { title: "Fertigung terminieren", text: "Legen Sie Fertigung und Montage als Arbeitsabschnitte an.", funktion: "terminplanung" },
      { title: "Anweisung bereitstellen", text: "Geben Sie Werkstatt und Montage die Arbeitsanweisung ohne Verkaufspreise.", funktion: "arbeitsanweisungen" },
      { title: "Zeiten erfassen", text: "Ihr Team erfasst Werkstatt- und Montagezeiten am selben Projekt.", funktion: "zeiterfassung" },
      { title: "Nachkalkulieren", text: "Stellen Sie die erfassten Istkosten Ihrer Kalkulation gegenüber.", funktion: "nachkalkulation" },
    ],
    exampleTitle: "Einbauschrank für Familie Hoffmann",
    example:
      "Plattenmaterial, Beschläge, Fertigungsstunden und Montage bilden getrennte Kalkulationsbestandteile. Die Nachkalkulation zeigt später die erfassten Istkosten.",
    funktionen: ["angebote", "terminplanung", "arbeitsanweisungen", "zeiterfassung", "lager", "nachkalkulation"],
    faq: [
      {
        q: "Was sieht die Werkstatt in der Arbeitsanweisung?",
        a: "Leistungen sowie Material und Werkzeug je Arbeitsschritt, ohne Verkaufspreise. Die Anweisung entsteht aus einem Quelldokument des Projekts; Leistungen und Materialbedarf prüfen Sie vor dem Bereitstellen.",
      },
      {
        q: "Wie kalkuliere ich Material, Fertigung und Montage?",
        a: "Je Position mit Lohn, Material, Geräten, Fremdleistungen und weiteren Kosten. Eigene Artikel ersparen wiederholte Eingaben, die Nachkalkulation stellt später dieselben Kostenarten gegenüber.",
      },
      {
        q: "Wie plane ich Fertigung und Montage zeitlich?",
        a: "Als Arbeitsabschnitte in der Terminplanung des Projekts. Sie legen Zeiträume und Abhängigkeiten fest, und Ihr Team sieht die Arbeitsabschnitte mit Status in der Mobile-App.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/position-tiefenkalkulieren", "/blog/tiefenkalkulation-handwerk", "/blog/nachkalkulation-handwerk"],
  },
  {
    slug: "dachdecker",
    name: "Dachdecker",
    kurz: "Dach",
    kopfwort: "Dachdecker-",
    answer:
      "CraftOS unterstützt Dachdeckerbetriebe von der Besichtigung über das Leistungsverzeichnis per GAEB, Arbeitsabschnitte und Einsatzplanung bis zu Bautagesbericht, Abnahme und Schlussrechnung.",
    teaser: "Leistungsverzeichnisse per GAEB bepreisen, Dachprojekte planen und den Fortschritt dokumentieren.",
    ablauf: [
      { title: "Dach besichtigen", text: "Legen Sie Fotos, Videos und Sprachnotizen der Besichtigung im Projekt ab.", funktion: "aufmass" },
      { title: "LV bepreisen", text: "Lesen Sie das Leistungsverzeichnis als X83 ein und geben Sie X84 ab.", funktion: "gaeb" },
      { title: "Abschnitte planen", text: "Terminieren Sie Rückbau, Lattung und Eindeckung als Arbeitsabschnitte.", funktion: "terminplanung" },
      { title: "Bericht schreiben", text: "Halten Sie Arbeiten, Wetter und Fotos im Bautagesbericht fest.", funktion: "baudokumentation" },
      { title: "Schlussrechnung stellen", text: "Rechnen Sie nach der Abnahme mit der Schlussrechnung ab.", funktion: "rechnungen" },
    ],
    exampleTitle: "Dachsanierung Familie Schulz",
    example:
      "Sie übernehmen selbst ermittelte Flächen als Angebotsmengen, planen Mitarbeitende sowie Geräte & Fahrzeuge und halten zusätzliche Leistungen im Bericht fest.",
    funktionen: ["aufmass", "gaeb", "terminplanung", "plantafel", "baudokumentation", "rechnungen"],
    faq: [
      {
        q: "Wie bepreise ich eine GAEB-Ausschreibung?",
        a: "Sie importieren das Leistungsverzeichnis als X83 und geben das bepreiste Angebot als X84 ab. CraftOS liest dafür Dateien im Format GAEB DA XML 3.2 und 3.3.",
      },
      {
        q: "Wie plane ich Team und Fahrzeuge für die Dachbaustelle?",
        a: "In der Plantafel. Dort planen Sie Einsätze für Ihr Team und weisen Geräte & Fahrzeuge zu, die Sie vorher als Fahrzeug, Maschine oder Werkzeug angelegt haben.",
      },
      {
        q: "Wie dokumentiere ich zusätzliche Arbeiten auf dem Dach?",
        a: "Im Regiebericht, in der Mobile-App Stundenbericht genannt. Geeignete Leistungen aus Berichten übernehmen Sie danach in eine Einzel- oder Sammelrechnung.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/gaeb-importieren", "/hilfe/regiebericht", "/hilfe/schlussrechnung-erstellen"],
  },
  {
    slug: "fliesenleger",
    name: "Fliesenleger",
    kurz: "Fliesen",
    kopfwort: "Fliesenleger-",
    answer:
      "CraftOS begleitet Fliesenleger vom Raumaufmaß über das Angebot mit Verschnitt bis zu Materialbuchung, Bautagesbericht, Mängelliste und Rechnung in einer Software für Büro und Baustelle.",
    teaser: "Flächen aufmessen, Verschnitt kalkulieren und Material auf der Baustelle buchen.",
    ablauf: [
      { title: "Bad aufmessen", text: "Erfassen Sie Boden- und Wandflächen und ziehen Sie Öffnungen ab.", funktion: "aufmass" },
      { title: "Angebot kalkulieren", text: "Kalkulieren Sie Verschnitt als eigene Menge neben der Verlegefläche.", funktion: "angebote" },
      { title: "Material buchen", text: "Buchen Sie Fliesen und Kleber in der App per Barcode aus dem Lager.", funktion: "lager" },
      { title: "Mängel prüfen", text: "Erfassen Sie Mängel vor der Übergabe mit Foto, Ort und Frist.", funktion: "maengelmanagement" },
      { title: "Rechnung stellen", text: "Übernehmen Sie das Angebot in die Rechnung und stellen Sie sie fertig.", funktion: "rechnungen" },
    ],
    exampleTitle: "Bad Familie Weber",
    example:
      "Sie prüfen die Flächen, kalkulieren Verschnitt bewusst als eigene Menge und unterscheiden Untergrundvorbereitung, Abdichtung und Verlegung.",
    funktionen: ["aufmass", "angebote", "lager", "maengelmanagement", "baudokumentation", "rechnungen"],
    faq: [
      {
        q: "Wie kalkuliere ich Verschnitt bei Fliesen?",
        a: "Als eigene Menge im Angebot. Sie übernehmen die geprüfte Fläche aus dem Raumaufmaß und ergänzen den Verschnitt bewusst als zusätzliche Menge.",
      },
      {
        q: "Wie buche ich übrig gebliebenes Material zurück?",
        a: "Als Rückbuchung im Lager. Entnahme, Umlagerung und Rückbuchung buchen Sie mit Bezug, in der Mobile-App auch per Barcode-Scan.",
      },
      {
        q: "Wie dokumentiere ich die Abdichtung im Duschbereich?",
        a: "Im Bautagesbericht mit Fotos. Er hält ausgeführte Arbeiten, Materialverbrauch und besondere Vorkommnisse fest; Fotos und Unterschriften mit Ort und Zeitpunkt ergänzen ihn.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/raumaufmass-angebot-uebernehmen", "/hilfe/material-entnehmen-zurueckbuchen", "/hilfe/mangel-erfassen-bearbeiten"],
  },
  {
    slug: "zimmerer",
    name: "Zimmerer & Holzbau",
    kurz: "Holzbau",
    kopfwort: "Zimmerer-Software:",
    answer:
      "CraftOS unterstützt Zimmereien und Holzbaubetriebe vom Leistungsverzeichnis per GAEB über Arbeitsabschnitte für Fertigung und Montage bis zur Planung von Team, Geräten und Material und zur Nachkalkulation.",
    teaser: "Fertigung und Montage als Arbeitsabschnitte planen, Geräte einteilen und Material nachhalten.",
    ablauf: [
      { title: "LV übernehmen", text: "Lesen Sie das Leistungsverzeichnis als X83 ein und bepreisen Sie es.", funktion: "gaeb" },
      { title: "Abschnitte planen", text: "Legen Sie Abbund, Fertigung und Montage als Arbeitsabschnitte an.", funktion: "terminplanung" },
      { title: "Kran einplanen", text: "Planen Sie Team, Kran und Fahrzeuge für die Montage in der Plantafel.", funktion: "plantafel" },
      { title: "Material buchen", text: "Buchen Sie Holz und Verbindungsmittel mit Bezug zum Projekt.", funktion: "lager" },
      { title: "Nachkalkulieren", text: "Stellen Sie die Istkosten für Lohn, Material und Geräte gegenüber.", funktion: "nachkalkulation" },
    ],
    exampleTitle: "Dachstuhl Familie Berger",
    example:
      "Fertigung und Montage bekommen getrennte Arbeitsabschnitte. Mitarbeitende sowie Geräte & Fahrzeuge werden eingeplant; Materialentnahmen bleiben dem Projekt zugeordnet.",
    funktionen: ["gaeb", "terminplanung", "plantafel", "lager", "nachkalkulation", "projektverwaltung"],
    faq: [
      {
        q: "Wie plane ich Fertigung und Montage getrennt?",
        a: "Als eigene Arbeitsabschnitte in der Terminplanung. Eine Abhängigkeit legt fest, welcher Arbeitsabschnitt folgt und mit welchem Abstand in Arbeitstagen.",
      },
      {
        q: "Wie teile ich Kran und Fahrzeuge für die Montage ein?",
        a: "In der Plantafel. Dort planen Sie Einsätze für Ihr Team und weisen Geräte & Fahrzeuge zu, damit Kran und Transporter zum Montagetermin eingeplant sind.",
      },
      {
        q: "Wo findet mein Team Pläne und Zeichnungen?",
        a: "In den Projektdateien. Pläne, Bilder und Unterlagen sortieren Sie in Ordnern und Unterordnern; in der Mobile-App findet Ihr Team sie unter „Belege & Dateien“.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/projekt-phasen-anlegen", "/hilfe/planung-mitarbeiter-ressourcen", "/blog/nachkalkulation-handwerk"],
  },
  {
    slug: "galabau",
    name: "Garten- & Landschaftsbau",
    kurz: "GaLaBau",
    kopfwort: "GaLaBau-Software:",
    answer:
      "CraftOS begleitet GaLaBau-Betriebe von der Besichtigung über Angebot und Planung von Team und Geräten bis zu Bautagesbericht, Regiebericht, Mängelliste und Nachkalkulation in einer Software.",
    teaser: "Außenanlagen kalkulieren, Team und Geräte planen und Regiearbeiten dokumentieren.",
    ablauf: [
      { title: "Gelände besichtigen", text: "Legen Sie Fotos, Videos und Sprachnotizen der Besichtigung im Projekt ab.", funktion: "aufmass" },
      { title: "Angebot kalkulieren", text: "Kalkulieren Sie Aushub, Unterbau und Pflaster als getrennte Positionen.", funktion: "angebote" },
      { title: "Team und Geräte planen", text: "Planen Sie Team, Bagger und Fahrzeuge in der Plantafel.", funktion: "plantafel" },
      { title: "Regiearbeit festhalten", text: "Dokumentieren Sie Zusatzarbeiten im Regiebericht der Bauakte.", funktion: "baudokumentation" },
      { title: "Nachkalkulieren", text: "Stellen Sie die Istkosten für Material, Geräte und Lohn gegenüber.", funktion: "nachkalkulation" },
    ],
    exampleTitle: "Hofeinfahrt Familie Neumann",
    example:
      "Aushub, Unterbau und Pflasterarbeiten werden getrennt kalkuliert. Zusätzliche Entsorgungskosten und Gerätezeiten fließen bewusst in die Bewertung ein.",
    funktionen: ["aufmass", "angebote", "plantafel", "baudokumentation", "maengelmanagement", "nachkalkulation"],
    faq: [
      {
        q: "Wie plane ich Bagger und Fahrzeuge für die Baustelle?",
        a: "In der Plantafel. Sie planen Einsätze für Ihr Team und weisen Geräte & Fahrzeuge zu; Überschneidungen und Abwesenheiten sehen Sie dabei als Hinweis.",
      },
      {
        q: "Wie rechne ich Regiearbeiten ab?",
        a: "Über den Regiebericht, in der Mobile-App Stundenbericht genannt. Geeignete Leistungen aus Berichten übernehmen Sie in eine Einzel- oder Sammelrechnung und prüfen den Entwurf vor dem Fertigstellen.",
      },
      {
        q: "Wo halte ich den Materialverbrauch der Baustelle fest?",
        a: "Im Bautagesbericht. Er hält Wetter, ausgeführte Arbeiten, anwesende Personen und den Materialverbrauch fest, dazu besondere Vorkommnisse und nächste Schritte.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/planung-mitarbeiter-ressourcen", "/hilfe/berichte-abrechnen", "/blog/materialverbrauch-baustelle-zuordnen"],
  },
  {
    slug: "trockenbau",
    name: "Trockenbau & Innenausbau",
    kurz: "Innenausbau",
    kopfwort: "Trockenbau-",
    answer:
      "CraftOS unterstützt Trockenbau und Innenausbau vom Aufmaß über das Leistungsverzeichnis per GAEB und Arbeitsabschnitte bis zu Mängelliste, Abnahme und Schlussrechnung in einer Software.",
    teaser: "Flächen aufmessen, Leistungsverzeichnisse per GAEB bepreisen und Mängel vor der Abnahme klären.",
    ablauf: [
      { title: "Flächen aufmessen", text: "Erfassen Sie Wand- und Deckenflächen und ziehen Sie Öffnungen ab.", funktion: "aufmass" },
      { title: "LV bepreisen", text: "Lesen Sie das Leistungsverzeichnis als X83 ein und geben Sie X84 ab.", funktion: "gaeb" },
      { title: "Abschnitte planen", text: "Terminieren Sie Ständerwerk, Beplankung und Spachteln als Abschnitte.", funktion: "terminplanung" },
      { title: "Mängel klären", text: "Erfassen Sie Mängel vor der Abnahme und verfolgen Sie den Status.", funktion: "maengelmanagement" },
      { title: "Schlussrechnung stellen", text: "Rechnen Sie nach der Abnahme mit der Schlussrechnung ab.", funktion: "rechnungen" },
    ],
    exampleTitle: "Büroumbau für die Muster GmbH",
    example:
      "Sie erfassen Flächen für Trennwände und Decken, halten Abzüge fest und planen die Arbeitsschritte nach Materiallieferung und Teamverfügbarkeit.",
    funktionen: ["aufmass", "gaeb", "terminplanung", "maengelmanagement", "baudokumentation", "rechnungen"],
    faq: [
      {
        q: "Welche GAEB-Dateien kann ich importieren?",
        a: "Leistungsverzeichnisse als X83 im Format GAEB DA XML 3.2 und 3.3. Das bepreiste Angebot geben Sie als X84 ab.",
      },
      {
        q: "Wie führe ich eine Mängelliste vor der Abnahme?",
        a: "Im Mängelmanagement des Projekts. Jeder Mangel bekommt Titel, Ort, Vorher-Foto, Frist und Zuständige; nach der Kontrolle vor Ort setzen Sie ihn auf „Geprüft“.",
      },
      {
        q: "Wie protokolliere ich eine Teilabnahme?",
        a: "Im Abnahmeprotokoll des Projekts. Es enthält Prüfpunkte mit „OK“, „Mangel“ oder „Offen“, offene Mängel und die Unterschriften beider Seiten, für eine Abnahme oder Teilabnahme.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/gaeb-importieren", "/hilfe/mangel-erfassen-bearbeiten", "/hilfe/abnahme-dokumentieren"],
  },
  {
    slug: "metallbau",
    name: "Metallbau & Schlosserei",
    kurz: "Metallbau",
    kopfwort: "Metallbau-Software:",
    answer:
      "CraftOS unterstützt Metallbau und Schlosserei von der Kalkulation über Arbeitsanweisungen für Werkstatt und Montage bis zu Zeiterfassung, Lager-Scan und Nachkalkulation in einer Software.",
    teaser: "Profile und Beschläge kalkulieren, Werkstatt und Montage anweisen und Zeiten erfassen.",
    ablauf: [
      { title: "Kalkulation erstellen", text: "Kalkulieren Sie Profile, Beschläge, Oberfläche und Montage je Position.", funktion: "angebote" },
      { title: "Anweisung bereitstellen", text: "Geben Sie Werkstatt und Montage die Arbeitsanweisung ohne Verkaufspreise.", funktion: "arbeitsanweisungen" },
      { title: "Zeiten erfassen", text: "Werkstatt und Baustelle erfassen ihre Zeiten am selben Projekt.", funktion: "zeiterfassung" },
      { title: "Material buchen", text: "Buchen Sie Profile und Kleinteile in der App per Barcode aus dem Lager.", funktion: "lager" },
      { title: "Nachkalkulieren", text: "Stellen Sie die erfassten Istkosten Ihrer Kalkulation gegenüber.", funktion: "nachkalkulation" },
    ],
    exampleTitle: "Geländer im Treppenhaus Wolf",
    example:
      "Profile, Beschläge, Oberflächenbearbeitung und Montage werden einzeln kalkuliert. Werkstatt und Baustelle erfassen ihre Leistungen beim selben Projekt.",
    funktionen: ["angebote", "arbeitsanweisungen", "zeiterfassung", "lager", "nachkalkulation", "gaeb"],
    faq: [
      {
        q: "Wie kommen Zeichnungen zu Werkstatt und Montage?",
        a: "Über die Projektdateien. Pläne, Bilder und Unterlagen sortieren Sie in Ordnern und Unterordnern; in der Mobile-App findet Ihr Team sie unter „Belege & Dateien“.",
      },
      {
        q: "Wie bucht die Werkstatt Material auf den Auftrag?",
        a: "Im Lager mit Bezug, in der Mobile-App per Barcode. Berechtigte Mitarbeitende scannen den Artikel, sehen den Bestand ihrer freigegebenen Lager und buchen Ausgabe, Rücknahme oder Bewegung.",
      },
      {
        q: "Kann ich Ausschreibungen für Metallbauarbeiten per GAEB bepreisen?",
        a: "Ja. Sie importieren das Leistungsverzeichnis als X83 im Format GAEB DA XML 3.2 oder 3.3 und geben das bepreiste Angebot als X84 ab.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/projektdateien-ordner", "/hilfe/lager-scan-app", "/blog/projektbezogene-zeiterfassung"],
  },
  {
    slug: "bauunternehmen",
    name: "Bauunternehmen",
    kurz: "Bau",
    kopfwort: "Bauunternehmen:",
    answer:
      "CraftOS verbindet für Bauunternehmen Leistungsverzeichnisse per GAEB, die Terminplanung mit Arbeitsabschnitten, Bautagesberichte, Mängelmanagement, Abschlags- und Schlussrechnungen und das Kundenportal für Bauherren.",
    teaser: "Leistungsverzeichnisse per GAEB übernehmen, Arbeitsabschnitte terminieren und Abschläge abrechnen.",
    ablauf: [
      { title: "LV übernehmen", text: "Importieren Sie das Leistungsverzeichnis als X83 und bepreisen Sie es.", funktion: "gaeb" },
      { title: "Bauzeitenplan erstellen", text: "Terminieren Sie Arbeitsabschnitte und setzen Sie Abhängigkeiten.", funktion: "terminplanung" },
      { title: "Bautagesbericht führen", text: "Halten Sie Wetter, Arbeiten und anwesende Personen täglich fest.", funktion: "baudokumentation" },
      { title: "Mängel verfolgen", text: "Verfolgen Sie Mängel mit Frist und Zuständigkeit bis zur Prüfung.", funktion: "maengelmanagement" },
      { title: "Abschläge abrechnen", text: "Stellen Sie Abschlagsrechnungen und am Ende die Schlussrechnung.", funktion: "rechnungen" },
    ],
    exampleTitle: "Gewerbeumbau für die Muster GmbH",
    example:
      "Sie planen Gewerke sowie Geräte & Fahrzeuge in Arbeitsabschnitten, dokumentieren Fortschritt und Mängel und ordnen Berichte und Rechnungen der gemeinsamen Projektakte zu.",
    funktionen: ["gaeb", "terminplanung", "baudokumentation", "maengelmanagement", "rechnungen", "kundenportal"],
    faq: [
      {
        q: "Wie erstelle ich einen Bauzeitenplan?",
        a: "In der Terminplanung des Projekts. Sie legen Arbeitsabschnitte mit Zeitraum an, setzen Abhängigkeiten und sehen in der Plantafel-Ansicht Projektplan alle Projekte über die Zeit.",
      },
      {
        q: "Kann ich einem Arbeitsabschnitt ein Gewerk zuordnen?",
        a: "Ja. Am Arbeitsabschnitt wählen Sie das Gewerk aus Ihren Stammdaten; bei der Auswahl von Firmen zeigt der Schalter „Nur passendes Gewerk“ dann nur Firmen dieses Gewerks.",
      },
      {
        q: "Was sieht der Bauherr im Kundenportal?",
        a: "Freigegebene Angebote, Rechnungen und Termine seiner Projekte im Browser. Über Nachrichten schreibt er Ihnen direkt zum Projekt, und Angebote nimmt er an oder lehnt sie mit Rückmeldung ab.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/projekt-phasen-anlegen", "/blog/bauablaufplan", "/hilfe/abnahme-dokumentieren"],
  },
  {
    slug: "allrounder",
    name: "Allrounder & Hausmeisterservice",
    kurz: "Allrounder",
    kopfwort: "Hausmeister-",
    answer:
      "CraftOS unterstützt Allrounder und Hausmeisterservices von der Einsatzplanung über die Zeiterfassung per App und Berichte bis zu Rechnung und Mahnwesen in einer Software für Büro und Einsatzort.",
    teaser: "Viele kleine Einsätze planen, Stunden per App erfassen und Berichte direkt abrechnen.",
    ablauf: [
      { title: "Einsatz planen", text: "Legen Sie Einsätze in der Plantafel an, verschieben oder kopieren Sie sie.", funktion: "plantafel" },
      { title: "Zeit erfassen", text: "Ihr Team startet den Timer in der Mobile-App am Projekt.", funktion: "zeiterfassung" },
      { title: "Bericht schreiben", text: "Halten Sie erledigte Arbeiten und Stunden im Regiebericht fest.", funktion: "baudokumentation" },
      { title: "Rechnung stellen", text: "Übernehmen Sie Leistungen aus Berichten in eine Sammelrechnung.", funktion: "rechnungen" },
      { title: "Mahnungen versenden", text: "Lassen Sie überfällige Rechnungen auf Wunsch nach Ihren Fristen mahnen.", funktion: "mahnwesen" },
    ],
    exampleTitle: "Wohnanlage Lindenhof",
    example:
      "Eigene Artikel ersparen wiederholte Eingaben im Angebot. Jeder Einsatz bekommt einen Projektbezug; Zeiten und Berichte liefern die Grundlage für die Abrechnung.",
    funktionen: ["plantafel", "zeiterfassung", "baudokumentation", "rechnungen", "mahnwesen", "kundenportal"],
    faq: [
      {
        q: "Wie behalte ich viele kleine Einsätze im Blick?",
        a: "In der Plantafel. Sie legen Einsätze an, verschieben oder kopieren sie, und Ihr Team sieht Projekt, Zeitraum, Status und Zielort in der Mobile-App.",
      },
      {
        q: "Wie rechne ich Stunden aus Berichten ab?",
        a: "Über eine Einzel- oder Sammelrechnung. Geeignete Leistungen aus Berichten übernehmen Sie in den Rechnungsentwurf und prüfen ihn vor dem Fertigstellen.",
      },
      {
        q: "Versendet CraftOS Zahlungserinnerungen auf Wunsch automatisch?",
        a: "Ja, wenn Sie die automatischen Mahnungen auf Wunsch einschalten. Dann werden überfällige Rechnungen täglich nach Ihren Fristen per E-Mail gemahnt, eine Stufe nach der anderen.",
      },
      FAQ_APP,
    ],
    artikel: ["/hilfe/plantafel-einsatz-planen", "/hilfe/berichte-abrechnen", "/hilfe/mahnwesen-einrichten"],
  },
];

/* ---------- Prüfungen beim Laden (09-UI-SPEC § 4, § 5 „Error state“) ---------- */

/** Gewerk-Budgets und -Mengen aus dem Designsystem (09-UI-SPEC § 4, F-A1). */
const GEWERK_BUDGET = TEXT_BUDGET.gewerk;
const GEWERK_MENGEN = {
  schritte: TEXT_BUDGET.count.gewerkSteps,
  funktionen: TEXT_BUDGET.count.gewerkFunktionen,
  faq: TEXT_BUDGET.count.gewerkFaq,
  artikel: TEXT_BUDGET.count.gewerkArtikel,
} as const;

/** Phase-7-Detailseiten (07 D-07); jedes Gewerk verlinkt mindestens eine davon. */
export const PHASE7_SLUGS = [
  "gaeb",
  "mahnwesen",
  "terminplanung",
  "bankabgleich",
  "datenuebernahme",
  "maengelmanagement",
  "kundenportal",
] as const;

/**
 * Produktbegriffe der Gewerke-Texte (über L-1 hinaus): „Arbeitsabschnitte“ statt des alten Phasenbegriffs, „Geräte &
 * Fahrzeuge“ statt „Ressourcen“, keine Vorlagen-Zusage (Orchestrator-Entscheidung 5). Wortfamilien als Muster (auch
 * mit Leerzeichen oder Bindestrich), damit die Wörter nicht wörtlich in dieser Datei stehen. Die Wortliste der
 * Leitlinie L-1 selbst kommt zentral aus lib/leitlinie.ts (l1Treffer).
 */
const PRODUKTBEGRIFFE = [/bauphase/i, /ressourcen/i, /leistungs[\s-]*vorlagen/i, /projekt[\s-]*phasen/i] as const;

const fehler = (slug: string, text: string) => new Error(`Gewerk ${slug}: ${text}`);

function pruefeText(slug: string, feld: string, wert: string, max: number, saetze?: { min: number; max: number }): void {
  const n = charCount(wert);
  if (n > max) throw fehler(slug, `${feld} hat ${n} von ${max} Zeichen – Satz kürzen.`);
  if (saetze) {
    const s = sentenceCount(wert);
    if (s < saetze.min || s > saetze.max) {
      const soll = saetze.min === saetze.max ? `genau ${saetze.min}` : `${saetze.min} bis ${saetze.max}`;
      throw fehler(slug, `${feld} hat ${s} Sätze – ${soll} erforderlich.`);
    }
  }
}

function pruefeWoerter(slug: string, texte: readonly string[]): void {
  for (const text of texte) {
    const klein = text.toLowerCase();
    const [wort] = l1Treffer(text);
    if (wort) {
      throw new Error(`Text lib/gewerke.ts (${slug}) enthält ‚${wort}‘ – nur Unterstütztes nennen (Leitlinie L-1).`);
    }
    const muster = PRODUKTBEGRIFFE.find((m) => m.test(text));
    if (muster) {
      throw new Error(`Text lib/gewerke.ts (${slug}) enthält ‚${muster.exec(text)?.[0]}‘ – nur Unterstütztes nennen (Leitlinie L-1).`);
    }
    if (klein.includes("automatisch") && !klein.includes("auf wunsch")) {
      throw fehler(slug, `‚automatisch‘ nur mit „auf Wunsch“ verwenden: „${text.slice(0, 60)}“.`);
    }
  }
}

/** Prüft eine Gewerke-Liste (rein, mit Fremddaten testbar); wirft beim ersten Verstoß mit Fehlertext aus § 5. */
export function pruefeGewerke(liste: readonly Gewerk[]): void {
  const live = new Set(funktionen.filter((f) => f.tier === "heute").map((f) => f.slug));
  const phase7 = new Set<string>(PHASE7_SLUGS);
  const fragen = new Map<string, number>();

  for (const g of liste) {
    const { slug } = g;
    pruefeText(slug, "answer", g.answer, TEXT_BUDGET.answer, { min: 1, max: 2 });
    pruefeText(slug, "teaser", g.teaser, GEWERK_BUDGET.teaser, { min: 1, max: 1 });
    pruefeText(slug, "exampleTitle", g.exampleTitle, GEWERK_BUDGET.exampleTitle);
    pruefeText(slug, "example", g.example, GEWERK_BUDGET.example, { min: 1, max: 2 });

    const n = g.ablauf.length;
    if (n < GEWERK_MENGEN.schritte.min || n > GEWERK_MENGEN.schritte.max) {
      throw fehler(slug, `Ablauf hat ${n} Schritte – ${GEWERK_MENGEN.schritte.min} bis ${GEWERK_MENGEN.schritte.max} erforderlich.`);
    }
    for (const s of g.ablauf) {
      pruefeText(slug, `Schritt ‚${s.title}‘ title`, s.title, TEXT_BUDGET.step.title);
      pruefeText(slug, `Schritt ‚${s.title}‘ text`, s.text, TEXT_BUDGET.step.text, { min: 1, max: 1 });
      if (!g.funktionen.includes(s.funktion)) {
        throw fehler(
          slug,
          `Schritt ‚${s.title}‘ verlinkt ${s.funktion}, das nicht unter funktionen steht – Slug ergänzen oder Schritt ändern.`,
        );
      }
    }

    const anzahl = g.funktionen.length;
    const mitPhase7 = g.funktionen.some((f) => phase7.has(f));
    const doppelt = new Set(g.funktionen).size !== anzahl;
    if (anzahl < GEWERK_MENGEN.funktionen.min || anzahl > GEWERK_MENGEN.funktionen.max || !mitPhase7 || doppelt) {
      throw fehler(slug, `${anzahl} Funktionen – 4 bis 6 erforderlich, davon mindestens eine Phase-7-Detailseite.`);
    }
    for (const f of g.funktionen) {
      if (!live.has(f)) throw fehler(slug, `Funktion ${f} ist keine Live-Funktion aus lib/funktionen.ts.`);
    }

    const faqZahl = g.faq.length;
    if (faqZahl < GEWERK_MENGEN.faq.min || faqZahl > GEWERK_MENGEN.faq.max) {
      throw fehler(slug, `${faqZahl} FAQ – ${GEWERK_MENGEN.faq.min} bis ${GEWERK_MENGEN.faq.max} erforderlich.`);
    }
    for (const f of g.faq) {
      if (!f.q.trim().endsWith("?")) throw fehler(slug, `FAQ-Frage ‚${f.q}‘ endet nicht mit „?“.`);
      pruefeText(slug, "faq.question", f.q, TEXT_BUDGET.faq.question);
      pruefeText(slug, "faq.answer", f.a, TEXT_BUDGET.faq.answerCentral);
      fragen.set(f.q, (fragen.get(f.q) ?? 0) + 1);
    }

    const artikelZahl = g.artikel.length;
    if (artikelZahl < GEWERK_MENGEN.artikel.min || artikelZahl > GEWERK_MENGEN.artikel.max) {
      throw fehler(slug, `${artikelZahl} Artikel – ${GEWERK_MENGEN.artikel.min} bis ${GEWERK_MENGEN.artikel.max} erforderlich.`);
    }
    for (const pfad of g.artikel) {
      if (!/^\/(blog|hilfe)\/[a-z0-9-]+$/.test(pfad)) {
        throw fehler(slug, `Artikel ${pfad} fehlt – nur bestehende Artikel verlinken.`);
      }
    }

    pruefeWoerter(slug, [
      g.answer,
      g.teaser,
      g.exampleTitle,
      g.example,
      ...g.ablauf.flatMap((s) => [s.title, s.text]),
      ...g.faq.flatMap((f) => [f.q, f.a]),
    ]);
    pruefeNurUnterstuetzt(g, { kontext: `Gewerk ${slug}` });
  }

  const gemeinsam = [...fragen].filter(([, zahl]) => zahl > 1).map(([q]) => q);
  if (gemeinsam.length > 1) {
    throw new Error(`Gewerke: ${gemeinsam.length} FAQ-Fragen auf mehreren Seiten – höchstens eine gemeinsame Frage (${gemeinsam.join(" | ")}).`);
  }
}

pruefeGewerke(definitions);

export const gewerke: Gewerk[] = definitions;

export function getGewerk(slug: string) {
  return gewerke.find((g) => g.slug === slug);
}
