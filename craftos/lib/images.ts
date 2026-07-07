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
