export const site = {
  name: "CraftOS",
  subtitle: "Handwerkersoftware",
  tagline: "Mehr Handwerk. Weniger Büro.",
  description:
    "Angebote, Rechnungen, Plantafel, Zeiten und Projekte in einem System: CraftOS verbindet Ihr Büro mit der Baustelle. Web-App und Mobile-App inklusive.",
  url: "https://craftos.eu",
  appUrl: "https://app.craftos.eu",
  ctaUrl: "https://app.craftos.eu",
  email: "support@craftos.eu",
  locale: "de_DE",
  iosUrl: "https://apps.apple.com/de/app/craftos/id6757652683",
  androidUrl:
    "https://play.google.com/store/apps/details?id=com.despia.craftos",
  trialDays: 10,
  checkedAt: "2026-10-20",
} as const;
export const speicherPool = "50 GB Speicher-Pool pro Betrieb";
// Preise, Speicher und Credits entsprechen src/lib/constants.ts und src/lib/subscription/pricing.ts
// der Web-App (origin/release); geprüft durch tests/pricing-parity.test.ts gegen docs/product-pricing-snapshot.json.
/** Zusätzlicher Speicher je Block, netto. */
export const extraSpeicher = { gb: 50, monat: 0.99, jahr: 9.9 } as const;
/** Einmaliges KI-Startguthaben einer neuen Organisation (kein Monatskontingent). */
export const startCredits = 150;
/** Wert eines KI-Credits in Euro (Web-App: „1 Credit = 0,01 €“; FREE_AI_CREDIT 1,50 € = 150 Credits). */
export const creditWertEuro = 0.01;
const euroKurz = (value: number) => value.toFixed(2).replace(".", ",") + " €";
/** Einordnung der Start-Credits für /preise, FAQ-Schema und llms.txt: „entspricht 1,50 €; 1 Credit = 0,01 €“. */
export const creditUmrechnung = `entspricht ${euroKurz(startCredits * creditWertEuro)}; 1 Credit = ${euroKurz(creditWertEuro)}`;
/**
 * Höchstpreis der Foto-Erkennung im Lager („Foto mit KI erkennen“, Mobile-App) je Foto in Credits, datiert (D-22).
 * Beleg: web:supabase/functions/_shared/aiPricing.ts, Eintrag 'analyze-inventory-photo' (Label „Inventurfoto“):
 * `tariff: { kind: 'fixed', maxCredits: 2, steps: [{ from: '2027-01-01T00:00:00Z', maxCredits: 3 }] }`; in SQL
 * datiert mit Migration 20261009200000_inventory_photo_dated_price.sql. Stichtag als Kalendertag (00:00 UTC).
 * Geprüft durch tests/credit-paritaet.test.ts gegen den Release-Commit aus productBasis.
 */
export const lagerfotoCredits = [
  { ab: null, max: 2 },
  { ab: "2027-01-01", max: 3 },
] as const;
/** Höchstpreis der Lagerfoto-KI am Tag `datum` (ISO, „2027-01-01“ oder mit Uhrzeit; maßgeblich ist der UTC-Kalendertag). */
export function lagerfotoCreditsAm(datum: string): number {
  const tag = datum.slice(0, 10);
  let max: number = lagerfotoCredits[0].max;
  for (const stufe of lagerfotoCredits) if (stufe.ab !== null && tag >= stufe.ab) max = stufe.max;
  return max;
}
const datumLang = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
/** „bis zu 2 Credits, ab dem 1. Januar 2027 bis zu 3 Credits“ – Anzeige auf /craft-ai. */
export const lagerfotoCreditsText = lagerfotoCredits
  .map((s) => (s.ab === null ? `bis zu ${s.max} Credits` : `ab dem ${datumLang(s.ab)} bis zu ${s.max} Credits`))
  .join(", ");
export const annualSavingPercent = 100 * (1 - 10 / 12);
export const tarife = [
  {
    id: "app",
    name: "App-Lizenz",
    produktlizenz: "App",
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
    produktlizenz: "Admin oder Büro",
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
  trial: `${site.trialDays} Tage kostenlos testen. Ohne Zahlungsdaten.`,
} as const;
/**
 * Laufzeit und Kündigung der CraftOS-Abos für Vergleichsseiten (08-06).
 * Quelle: AGB § 5 (app/agb/page.tsx), Rechtstext bleibt unverändert.
 */
export const vertrag = {
  monat: "monatlich kündbar",
  jahr: "zum Ende der Laufzeit kündbar",
} as const;
export const creditPakete = [
  { preis: 10, bonus: 0, guthaben: 10 },
  { preis: 25, bonus: 10, guthaben: 27.5 },
  { preis: 50, bonus: 15, guthaben: 57.5 },
  { preis: 100, bonus: 20, guthaben: 120 },
] as const;
