/**
 * ToolTime – belegte Angaben (08-06, D-01, D-04). Alle Angaben mit Quelle (offizielle Herstellerseite) und
 * Abrufdatum; Zahlen nur als Felder, Sätze per Vorlage (08-RESEARCH Pitfalls 1, 2, 6); keine Ankündigungen (U9).
 * Neuprüfung: 22.10.2026 (Preisseite, Nutzungsbedingungen 4.1/9.1/9.4, Startseite, Plantafel-Seite). Netto laut
 * Nutzungsbedingungen 4.1. Jahresabo-Preise gelten laut Preisseite nur im ersten Vertragsjahr (U3: ersterJahrespreis,
 * spätere Jahre nur als regulaerDerzeitCents). Nicht verwendet: „Weitere Mitarbeitende“ (Tabelle und FAQ nennen
 * unterschiedliche Werte).
 * Tests: tests/wettbewerber.test.ts.
 */
import type { Fakt, Quelle, Wettbewerber } from "./types";

const ABGERUFEN = "2026-10-22";

const QUELLEN = {
  preise: { label: "Preise und Pakete", url: "https://www.tooltime.app/preise" },
  nutzungsbedingungen: { label: "Nutzungsbedingungen", url: "https://www.tooltime.app/rechtliches/nutzungsbedingungen" },
  start: { label: "Startseite", url: "https://www.tooltime.app/" },
  plantafel: { label: "Digitale Plantafel", url: "https://www.tooltime.app/digitale-plantafel" },
} as const satisfies Record<string, Quelle>;

const fakt = <T,>(wert: T, quelle: Quelle, extra: { zitat?: string } = {}): Fakt<T> => ({
  wert,
  quelle,
  abgerufenAm: ABGERUFEN,
  ...extra,
});

export const tooltime: Wettbewerber = {
  slug: "tooltime",
  name: "ToolTime",
  domain: "tooltime.app",
  testphaseTage: fakt(7, QUELLEN.preise, {
    zitat: "Registriere Dich komplett unverbindlich für die 7-tägige Testversion!",
  }),
  laufzeit: fakt("12 Monate", QUELLEN.preise, { zitat: "Mindestlaufzeit von 12 Monaten" }),
  kuendigung: fakt("zum Laufzeitende, schriftlich oder in Textform; sonst Verlängerung um die Mindestlaufzeit", QUELLEN.nutzungsbedingungen),
  kuendigungsfristTage: fakt(30, QUELLEN.nutzungsbedingungen, {
    zitat: "unter Einhaltung einer Kündigungsfrist von dreißig (30) Tagen zum Ende der LAUFZEIT",
  }),
  preise: fakt(
    [
      { paket: "Solo", centsMonat: 8900, centsJahrJeMonat: 6900, ersterJahrespreis: true, regulaerDerzeitCents: 7900, enthalten: "1 Mitarbeiter" },
      { paket: "Team", centsMonat: 16900, centsJahrJeMonat: 14500, ersterJahrespreis: true, regulaerDerzeitCents: 14900, enthalten: "bis zu 5 Mitarbeiter" },
      { paket: "Max", centsMonat: 32900, centsJahrJeMonat: 27900, ersterJahrespreis: true, regulaerDerzeitCents: 29900, enthalten: "bis zu 10 Mitarbeiter" },
    ],
    QUELLEN.preise,
    { zitat: "Die ausgewiesenen Preise gelten ausschließlich für das erste Vertragsjahr des jährlichen Abonnements." },
  ),
  zusatzPreise: {
    teamJeLizenz: fakt(
      { paket: "Team, je Lizenz", centsMonat: 3400, centsJahrJeMonat: 2900, ersterJahrespreis: true, regulaerDerzeitCents: 3000 },
      QUELLEN.preise,
    ),
    maxJeLizenz: fakt(
      { paket: "Max, je Lizenz", centsMonat: 3300, centsJahrJeMonat: 2800, ersterJahrespreis: true, regulaerDerzeitCents: 3000 },
      QUELLEN.preise,
    ),
    datev: fakt({ paket: "DATEV Rechnungsdatenservice 1.0", centsMonat: 1900 }, QUELLEN.preise),
    assistant: fakt({ paket: "ToolTime Assistant, inkl. 100 Minuten im Monat", centsMonat: 5900 }, QUELLEN.preise),
  },
  kriterien: {
    mobileApp: fakt("iOS und Android", QUELLEN.start, { zitat: "Ja, für iOS & Android." }),
    plantafel: fakt(true, QUELLEN.plantafel),
    eRechnung: fakt("XRechnung und ZUGFeRD", QUELLEN.start, { zitat: "E-Rechnung (XRechnung/ZUGFeRD) inklusive" }),
    datev: fakt("Erweiterung", QUELLEN.preise, { zitat: "DATEV Rechnungsdatenservice 1.0" }),
    gaeb: fakt("Import und Export", QUELLEN.preise, { zitat: "GAEB-Import & Export" }),
    zeiterfassung: fakt(true, QUELLEN.preise),
    kiTelefon: fakt("Erweiterung", QUELLEN.preise, { zitat: "Dein KI-Telefonassistent" }),
    lexware: fakt("Team und Max, Solo auf Anfrage", QUELLEN.preise, { zitat: "Lexware Office Integration" }),
  },
  staerken: [
    fakt("Sie möchten einen festen Paketpreis für eine feste Zahl an Mitarbeitenden.", QUELLEN.preise),
    fakt("Sie arbeiten mit Lexware Office; ToolTime nennt die Anbindung in Team und Max.", QUELLEN.preise),
    fakt("Ihr Team soll Einsatzpläne in der App auch ohne Internetverbindung sehen.", QUELLEN.plantafel, {
      zitat: "Auch ohne Internetverbindung können Deine Mitarbeitenden in der App auf ihre aktuellen Einsatzpläne zugreifen",
    }),
  ],
  angaben: {
    netto: fakt("zzgl. gesetzlicher MwSt.", QUELLEN.nutzungsbedingungen),
    testOhneZahlung: fakt("ohne Zahlungsinformationen", QUELLEN.start, { zitat: "Keine Zahlungsinfos notwendig" }),
    plattformen: fakt("Desktop-Version und Smartphone-App", QUELLEN.start),
  },
};
