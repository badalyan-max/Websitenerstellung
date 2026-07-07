// Bild-Assets (Gemini-generiert, Metadaten eingebettet) mit Alt-Texten für SEO/A11y.
// Quelle der Alt-Texte: public/images-Metadaten (EXIF/XMP) der Bilddateien.

export interface Bild {
  src: string
  width: number
  height: number
  alt: string
}

export const heroWerkbank: Bild = {
  src: '/images/hero-werkbank.jpg',
  width: 1920,
  height: 1080,
  alt: 'Dunkle Schreiner-Werkbank mit hochwertigen Werkzeugen, Tablet mit dunkler App und warmem Amber-Licht.',
}

export const appBaustelle: Bild = {
  src: '/images/app-baustelle.jpg',
  width: 1600,
  height: 900,
  alt: 'Raue Handwerkerhände bedienen auf der Baustelle ein Smartphone mit dunkler App und Amber-Akzenten.',
}

export const craftAiFunken: Bild = {
  src: '/images/craft-ai-funken.jpg',
  width: 1600,
  height: 900,
  alt: 'Abstrakte Amber-Funken eines Winkelschleifers vor schwarzem Hintergrund mit hexagonalem Bokeh.',
}

export const gewerkBilder: Record<string, Bild> = {
  elektriker: {
    src: '/images/gewerk-elektriker.jpg',
    width: 1600,
    height: 900,
    alt: 'Elektriker an offenem Schaltschrank mit Smartphone und dunkler Handwerker-App.',
  },
  shk: {
    src: '/images/gewerk-shk.jpg',
    width: 1600,
    height: 900,
    alt: 'SHK-Techniker neben Wärmepumpe und Kupferrohren zeigt eine klare dunkle Terminplan-App auf dem Smartphone.',
  },
  maler: {
    src: '/images/gewerk-maler.jpg',
    width: 1600,
    height: 900,
    alt: 'Maler in weißer Arbeitskleidung misst eine Wand mit einem Laser in warmem Baustellenlicht.',
  },
  'tischler-schreiner': {
    src: '/images/gewerk-tischler.jpg',
    width: 1600,
    height: 900,
    alt: 'Tischler markiert Eichenbretter an der Werkbank, daneben ein Tablet mit dunkler Kalkulations-App.',
  },
}

// ---------- App-Screenshots (Slots) ----------
// Jeder Slot ist ein definierter Platz für einen echten App-Screenshot.
// Solange die Datei fehlt, rendert <ScreenshotFrame> einen Werkbank-Platzhalter.
// Benötigte Motive + Zielpfade: siehe craftos/SCREENSHOT-PLAN.md
// Sobald ein Screenshot vorliegt: Datei unter public/images/screenshots/<key>.webp
// ablegen und hier im screenshots-Objekt eintragen — fertig.

export type ScreenshotVariant = 'fragment' | 'tilt-stack' | 'phone'

export interface ScreenshotSlot {
  /** Modul-/Motivname, erscheint im Platzhalter */
  label: string
  variant: ScreenshotVariant
}

export const screenshotSlots: Record<string, ScreenshotSlot> = {
  'angebot-maske': { label: 'Angebot & Kalkulation', variant: 'fragment' },
  'angebot-aufmass': { label: 'Aufmaß in der App', variant: 'phone' },
  'rechnung-dokument': { label: 'Rechnung mit GiroCode', variant: 'tilt-stack' },
  'rechnung-mahnwesen': { label: 'Offene Posten & Mahnwesen', variant: 'fragment' },
  'beleg-scan': { label: 'Belegscan mit KI', variant: 'phone' },
  'datev-export': { label: 'Steuer-Cockpit & DATEV', variant: 'fragment' },
  'plantafel-woche': { label: 'Plantafel — Wochenansicht', variant: 'fragment' },
  'plantafel-app': { label: 'Einsatz-Änderung als Push', variant: 'phone' },
  'zeiterfassung-app': { label: 'Zeiterfassung mobil', variant: 'phone' },
  'zeiterfassung-konto': { label: 'Arbeitszeitkonto & Urlaub', variant: 'fragment' },
  'lager-bestand': { label: 'Lager & Bestände', variant: 'fragment' },
  'lager-scan': { label: 'Material buchen — KI-Belegscan', variant: 'fragment' },
  'baudoku-bericht': { label: 'Bautagesbericht mobil', variant: 'phone' },
  'baudoku-akte': { label: 'Digitale Projektakte', variant: 'fragment' },
  'team-rollen': { label: 'Rollen & Rechte', variant: 'fragment' },
  'nachkalkulation-dashboard': { label: 'Nachkalkulation — Soll/Ist', variant: 'fragment' },
  'craft-ai-chat': { label: 'Craft AI — Chat-Agent', variant: 'fragment' },
}

/** Echte Screenshot-Dateien — Eintrag ergänzen, sobald das Bild vorliegt. */
const shot = (key: string, width: number, height: number, alt: string): Bild => ({
  src: `/images/screenshots/${key}.webp`,
  width,
  height,
  alt,
})

export const screenshots: Record<string, Bild> = {
  'angebot-maske': shot('angebot-maske', 1600, 1000, 'CraftOS-Angebotseditor mit Elektro-Positionen wie NYM-J-Leitung und Wallbox, Kalkulationssummen und PDF-Bausteinen.'),
  'angebot-aufmass': shot('angebot-aufmass', 900, 1800, 'Aufmaß in der CraftOS-App: Boden-, Wand- und Deckenflächen zweier Räume mit Abzügen, daraus direkt ein Angebot erstellen.'),
  'rechnung-dokument': shot('rechnung-dokument', 1200, 1600, 'Fertige CraftOS-Rechnung als PDF mit Positionen, Netto/USt/Brutto und GiroCode zum Scan-Bezahlen.'),
  'rechnung-mahnwesen': shot('rechnung-mahnwesen', 1600, 1000, 'Rechnungsübersicht in CraftOS mit offener Forderung, Status-Badges und überfälliger Rechnung.'),
  'beleg-scan': shot('beleg-scan', 900, 1800, 'Belegscan in der CraftOS-App: fotografierte Eingangsrechnung, KI-Auslesung mit 95 % Sicherheit, Lieferant und Betrag erkannt.'),
  'datev-export': shot('datev-export', 1600, 1000, 'DATEV-Übergabe in CraftOS: Zeitraum wählen, prüfen, festschreiben und als DATEV-Datei an den Steuerberater übergeben.'),
  'plantafel-woche': shot('plantafel-woche', 1600, 1000, 'CraftOS-Plantafel in der Wochenansicht: Monteure mit Auslastung, farbige Einsatz-Balken und Subunternehmer-Zeilen.'),
  'plantafel-app': shot('plantafel-app', 900, 1800, 'Einsätze in der CraftOS-App: heutige und morgige Einsätze mit Uhrzeit, Projekt und Status Angenommen.'),
  'zeiterfassung-app': shot('zeiterfassung-app', 900, 1800, 'Mobile Zeiterfassung in der CraftOS-App: laufender Timer auf dem Projekt und Tagesliste der gebuchten Zeiten.'),
  'zeiterfassung-konto': shot('zeiterfassung-konto', 1600, 1000, 'Zeiterfassung im CraftOS-Büro: Zeiteinträge des Teams mit Projekt, Zeitraum, Beschreibung und Stunden.'),
  'lager-bestand': shot('lager-bestand', 1600, 1000, 'CraftOS-Lagerübersicht: Bestände über Hauptlager und Montagebusse mit Mindestbestandswarnung und Nachbestellen-Button.'),
  'lager-scan': shot('lager-scan', 1600, 1000, 'Wareneingang in CraftOS buchen: Dialog mit KI-Belegscan, Artikel, Menge, Seriennummer und Ziel-Lager.'),
  'baudoku-bericht': shot('baudoku-bericht', 900, 1800, 'Bautagesbericht in der CraftOS-App mit Anwesenden, ausgeführten Arbeiten, Materialverbrauch und besonderen Vorkommnissen.'),
  'baudoku-akte': shot('baudoku-akte', 1600, 1000, 'Digitale Projektakte in CraftOS: Projektstatus, Soll-Ist-Stunden, Fertigstellungs-Prognose und Aufgaben auf einen Blick.'),
  'team-rollen': shot('team-rollen', 1600, 1000, 'Team-Verwaltung in CraftOS: Mitarbeiter mit Rollen wie Mobil-Teammitglied und Büro-Leitung inklusive Lizenzkosten pro Monat.'),
  'nachkalkulation-dashboard': shot('nachkalkulation-dashboard', 1600, 1000, 'Nachkalkulation in CraftOS: Ist-Kosten, Fortschritt, Überschuss und Kostenverteilung nach Lohn und Material.'),
  'craft-ai-chat': shot('craft-ai-chat', 1600, 1000, 'Craft AI beantwortet im Chat eine Frage zu gebuchten Stunden und zeigt die genutzten Werkzeuge und Credits an.'),
}

/** Standard-Screenshot-Slot je Funktions-Slug (für Gewerke-Seiten u. a.) */
export const funktionScreenshot: Record<string, string> = {
  angebote: 'angebot-maske',
  rechnungen: 'rechnung-dokument',
  buchhaltung: 'beleg-scan',
  plantafel: 'plantafel-woche',
  zeiterfassung: 'zeiterfassung-app',
  lager: 'lager-bestand',
  baudokumentation: 'baudoku-bericht',
  team: 'team-rollen',
  nachkalkulation: 'nachkalkulation-dashboard',
  // Kundenportal hat keinen eigenen Screenshot — das Dokument ist das, was der Kunde sieht
  kundenportal: 'rechnung-dokument',
}

export const funktionBilder: Record<string, Bild> = {
  lager: {
    src: '/images/funktion-lager.jpg',
    width: 1600,
    height: 900,
    alt: 'Handwerker scannt im dunklen Werkstattlager eine Box zwischen Regalen mit Material und Kupferfittings.',
  },
  plantafel: {
    src: '/images/funktion-plantafel.jpg',
    width: 1600,
    height: 900,
    alt: 'Drei Handwerker besprechen an der Werkbank eine dunkle digitale Plantafel auf einem Tablet.',
  },
}
