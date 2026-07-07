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
  'lager-scan': { label: 'Material per Barcode buchen', variant: 'phone' },
  'baudoku-bericht': { label: 'Bautagesbericht mobil', variant: 'phone' },
  'baudoku-akte': { label: 'Digitale Projektakte', variant: 'fragment' },
  'team-rollen': { label: 'Rollen & Rechte', variant: 'fragment' },
  'kundenportal-freigabe': { label: 'Kundenportal — Angebotsfreigabe', variant: 'fragment' },
  'nachkalkulation-dashboard': { label: 'Nachkalkulation — Soll/Ist', variant: 'fragment' },
  'craft-ai-chat': { label: 'Craft AI — Chat-Agent', variant: 'fragment' },
}

/** Echte Screenshot-Dateien — Eintrag ergänzen, sobald das Bild vorliegt. */
export const screenshots: Record<string, Bild> = {}

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
  kundenportal: 'kundenportal-freigabe',
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
