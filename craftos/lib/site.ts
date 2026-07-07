// Zentrale Seiten-Konfiguration & Inhalte für CraftOS
export const site = {
  name: 'CraftOS',
  subtitle: 'Handwerkersoftware',
  tagline: 'Das Betriebssystem für Handwerksbetriebe',
  description:
    'CraftOS ist die All-in-One Handwerkersoftware für das deutsche Handwerk: Angebote & Rechnungen, Plantafel, Zeiterfassung, Lager und Craft AI – alles in einem System.',
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
  { label: 'Gewerke', href: '/gewerke' },
  { label: 'Craft AI', href: '/craft-ai' },
  { label: 'App', href: '/app' },
  { label: 'Preise', href: '/preise' },
] as const

// Lizenz-Tarife (1:1 aus dem App-Code: src/lib/constants.ts PRICING)
// Speicher: 50-GB-Pool pro Organisation (lizenzunabhängig), erweiterbar.
export const speicherPool = '50 GB Speicher-Pool pro Betrieb'

// Zwei Lizenzmodelle: App-Lizenz (Monteure) und Voll-Lizenz (Büro ODER Admin —
// welche Rolle eine Voll-Lizenz bekommt, wird in CraftOS eingestellt).
export const tarife = [
  {
    id: 'app',
    name: 'App-Lizenz',
    monat: 9.95,
    jahr: 99.5,
    badge: null,
    fuer: 'Monteure & Mitarbeiter im Einsatz',
    highlights: [
      'Mobile-App für iOS & Android',
      'Zeiterfassung (auch per Sprache)',
      'Zugewiesene Projekte & Einsätze',
      'Fotos, Berichte & Aufmaß vor Ort',
      'Urlaub & Abwesenheiten beantragen',
    ],
  },
  {
    id: 'voll',
    name: 'Voll-Lizenz',
    monat: 29.95,
    jahr: 299.5,
    badge: 'Büro & Admin',
    fuer: 'Büro, Bauleitung & Geschäftsführung – die Rolle legen Sie in CraftOS fest',
    highlights: [
      'Web-App + Mobile-App, voller Funktionsumfang',
      'Angebote, Rechnungen & E-Rechnung',
      'Plantafel, Zeiterfassung, Lager & Baudoku',
      'Als Admin-Rolle: Team, Rechte, DATEV & Craft AI',
      '150 Credits KI-Startguthaben pro Betrieb',
    ],
  },
] as const

// Zahlungskonditionen (aus src/lib/subscription/pricing.ts)
export const zahlung = {
  sepa: 'SEPA-Lastschrift · 0,35 % Gebühr',
  karte: 'Kreditkarte (Visa/Mastercard) · 1,5 % + 0,25 €',
  jahresrabatt: 'Jahresabo ≈ 17 % günstiger (2 Monate geschenkt)',
  trial: '14 Tage kostenlos testen – voller Funktionsumfang, inkl. 1,50 € KI-Startguthaben',
} as const

// KI-Credit-Pakete (Pay-as-you-go, 1 Credit = 0,01 €)
export const creditPakete = [
  { preis: 10, bonus: 0, guthaben: 10 },
  { preis: 25, bonus: 10, guthaben: 27.5 },
  { preis: 50, bonus: 15, guthaben: 57.5 },
  { preis: 100, bonus: 20, guthaben: 120 },
] as const
