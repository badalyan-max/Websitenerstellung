// Zentrale Seiten-Konfiguration & Inhalte für CraftOS
export const site = {
  name: 'CraftOS',
  subtitle: 'Handwerkersoftware',
  tagline: 'Das Betriebssystem für Handwerksbetriebe',
  description:
    'CraftOS ist die All-in-One Handwerkersoftware für das deutsche Handwerk: Projekte, Kunden, Angebote & Rechnungen, Zeiterfassung, Plantafel und KI – alles in einem System.',
  url: 'https://craftos.eu',
  appUrl: 'https://app.craftos.eu',
  // Login/Registrierung läuft über die App-Subdomain
  ctaUrl: 'https://app.craftos.eu',
  demoUrl: 'https://app.craftos.eu/demo',
  email: 'support@craftos.eu',
  locale: 'de_DE',
} as const

export const nav = [
  { label: 'Funktionen', href: '/funktionen' },
  { label: 'Craft AI', href: '/craft-ai' },
  { label: 'App', href: '/app' },
  { label: 'Preise', href: '/preise' },
] as const

// Branchen (für Trust / Zielgruppe)
export const branchen = [
  'Elektriker',
  'Maler & Lackierer',
  'Sanitär, Heizung, Klima',
  'Tischler & Schreiner',
  'Dachdecker',
  'Bauunternehmen',
  'Garten- & Landschaftsbau',
  'Fliesenleger',
] as const

// Lizenz-Tarife (1:1 aus der App)
export const tarife = [
  {
    id: 'app',
    name: 'App',
    monat: 14,
    jahr: 140,
    speicher: '10 GB',
    badge: null,
    fuer: 'Monteure & Mitarbeiter im Einsatz',
    highlights: [
      'Mobile-App für iOS & Android',
      'Zeiterfassung (auch per Sprache)',
      'Zugewiesene Projekte & Aufgaben',
      'Fotos & Dokumente vor Ort erfassen',
      '10 GB Speicher',
    ],
  },
  {
    id: 'buero',
    name: 'Büro',
    monat: 32,
    jahr: 320,
    speicher: '20 GB',
    badge: 'Beliebt',
    fuer: 'Disposition, Büro & Bauleitung',
    highlights: [
      'Web-App + Mobile-App',
      'Projekte, Kunden & Dokumente',
      'Angebote, Rechnungen & Lieferscheine',
      'Plantafel & Zeiterfassung',
      '20 GB Speicher',
    ],
  },
  {
    id: 'admin',
    name: 'Admin',
    monat: 44,
    jahr: 440,
    speicher: '50 GB',
    badge: 'Voller Funktionsumfang',
    fuer: 'Inhaber & Geschäftsführung (1× pro Betrieb)',
    highlights: [
      'Alle Funktionen ohne Limit',
      'Craft AI inkl. 150 Gratis-Credits/Monat',
      'Team-, Rechte- & Nachunternehmer-Verwaltung',
      'DATEV-Export & Buchungsjournal',
      '50 GB Speicher',
    ],
  },
] as const
