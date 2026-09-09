export const site = {
  name: "CraftOS",
  subtitle: "Handwerkersoftware",
  tagline: "Mehr Handwerk. Weniger Büro.",
  description:
    "Angebote, Rechnungen, Plantafel, Zeiten und Projekte in einem System: CraftOS verbindet Ihr Büro mit der Baustelle. Web-App und Mobile-App inklusive.",
  url: "https://craftos.eu",
  appUrl: "https://app.craftos.eu",
  ctaUrl: "https://app.craftos.eu",
  demoUrl: "/#produktdemo",
  email: "support@craftos.eu",
  locale: "de_DE",
  iosUrl: "https://apps.apple.com/de/app/craftos/id6757652683",
  androidUrl:
    "https://play.google.com/store/apps/details?id=com.despia.craftos",
  trialDays: 10,
  checkedAt: "2026-09-09",
} as const;
export const nav = [
  { label: "Produkt", href: "/funktionen" },
  { label: "Gewerke", href: "/gewerke" },
  { label: "Preise", href: "/preise" },
  { label: "Wissen", href: "/blog" },
  { label: "Hilfe", href: "/hilfe" },
] as const;
export const speicherPool = "50 GB Speicher-Pool pro Betrieb";
export const annualSavingPercent = 100 * (1 - 10 / 12);
export const tarife = [
  {
    id: "app",
    name: "App-Lizenz",
    monat: 9.95,
    jahr: 99.5,
    badge: null,
    fuer: "Für Mitarbeitende auf der Baustelle",
    highlights: [
      "Mobile-App für den Baustellenalltag",
      "Zeiten, zugewiesene Projekte und Einsätze",
      "Aufmaß, Fotos und Baudokumentation",
      "Urlaub und Abwesenheiten",
      "Ergänzt die Voll-Lizenz Ihres Betriebs",
    ],
  },
  {
    id: "voll",
    name: "Voll-Lizenz",
    monat: 29.95,
    jahr: 299.5,
    badge: "Web-App + Mobile-App inklusive",
    fuer: "Für Inhaber, Büro und Bauleitung",
    highlights: [
      "Web-App und Handy-App für dieselbe Person enthalten",
      "Angebote, Rechnungen und E-Rechnung",
      "Plantafel, Projekte, Zeiten und Lager",
      "Belege, DATEV und Nachkalkulation",
      "Keine zusätzlichen Modulgebühren für die Plantafel",
    ],
  },
] as const;
export const zahlung = {
  sepa: "SEPA-Lastschrift",
  karte: "Kreditkarte",
  jahresrabatt: "Jährliches Abo: rund 17 % günstiger als 12 Monatszahlungen",
  trial: "10 Tage kostenlos testen. Ohne Zahlungsdaten.",
} as const;
export const creditPakete = [
  { preis: 10, bonus: 0, guthaben: 10 },
  { preis: 25, bonus: 10, guthaben: 27.5 },
  { preis: 50, bonus: 15, guthaben: 57.5 },
  { preis: 100, bonus: 20, guthaben: 120 },
] as const;
