/**
 * Craftnote – belegte Angaben (08-06, D-01, D-04). Alle Angaben mit Quelle (offizielle Herstellerseite) und
 * Abrufdatum; Zahlen nur als Felder, Sätze per Vorlage (08-RESEARCH Pitfalls 1, 2, 6); keine Ankündigungen (U9).
 * Neuprüfung: 22.10.2026 (Preisseite, Startseite, Büro-Plus-Seite). Preise netto („exkl. MwSt.“), pro Nutzer und
 * Monat bei jährlicher Abrechnung. Nicht verwendet: Hilfeartikel zu Kosten/Laufzeit und Funktionen nach Paket
 * (08-RESEARCH N2/N5), GAEB (auf den geprüften Seiten nicht genannt).
 * Tests: tests/wettbewerber.test.ts.
 */
import type { Fakt, Quelle, Wettbewerber } from "./types";

const ABGERUFEN = "2026-10-22";
const TESTTAGE = 30;

const QUELLEN = {
  preise: { label: "Preise und Zusatzmodule", url: "https://craftnote.de/preise/" },
  start: { label: "Startseite", url: "https://craftnote.de/" },
  bueroPlus: { label: "Büro Plus", url: "https://craftnote.de/buero-plus/" },
} as const satisfies Record<string, Quelle>;

const fakt = <T,>(wert: T, quelle: Quelle, extra: { zitat?: string } = {}): Fakt<T> => ({
  wert,
  quelle,
  abgerufenAm: ABGERUFEN,
  ...extra,
});

export const craftnote: Wettbewerber = {
  slug: "craftnote",
  name: "Craftnote",
  domain: "craftnote.de",
  testphaseTage: fakt(TESTTAGE, QUELLEN.start, {
    zitat: "Den vollen Funktionsumfang von Büro Plus für 30 Tage erleben.",
  }),
  laufzeit: fakt("12 Monate", QUELLEN.preise, { zitat: "Die Vertragslaufzeit beträgt ein Jahr." }),
  kuendigung: fakt("drei Monate vor Vertragsende, sonst Verlängerung um ein Jahr", QUELLEN.preise, {
    zitat:
      "Der Vertrag über die Büro- und Baustellen-Pakete verlängert sich jeweils automatisch um ein Jahr, sofern der Vertrag nicht zum Vertragsende unter Einhaltung einer Kündigungsfrist von drei (3) Monaten von einem der Vertragspartner gekündigt wird.",
  }),
  preise: fakt(
    [
      { paket: "Büro Plus", centsJahrJeMonat: 4990, stattCents: 6990, enthalten: "pro Nutzer" },
      { paket: "Büro", centsJahrJeMonat: 2990, enthalten: "pro Nutzer" },
      { paket: "Baustelle", centsJahrJeMonat: 1490, enthalten: "pro Nutzer" },
    ],
    QUELLEN.preise,
    { zitat: "pro Nutzer/Monat (exkl. MwSt.), jährliche Abrechnung" },
  ),
  zusatzPreise: {
    zeitModul: fakt({ paket: "Zeit-Modul", centsJahrJeMonat: 4990 }, QUELLEN.preise, {
      zitat: "Jährliche Abrechnung, Preis pro Monat.",
    }),
    fahrzeugModul: fakt({ paket: "Fahrzeug-Modul je Tracker", centsJahrJeMonat: 2490, ersterJahrespreis: true }, QUELLEN.preise, {
      zitat: "Jährliche Abrechnung, Preis pro Monat pro Tracker im ersten Jahr.",
    }),
  },
  kriterien: {
    mobileApp: fakt("iOS ab 14.5, Android ab 8.0", QUELLEN.preise),
    plantafel: fakt(true, QUELLEN.start, { zitat: "Sieh auf einen Blick Engpässe, Terminkonflikte und freie Kapazitäten" }),
    eRechnung: fakt("E-Rechnungsfähig", QUELLEN.bueroPlus, { zitat: "Rechtssicher abrechnen – GoBD-konform und E-Rechnungsfähig" }),
    datev: fakt("Nur Büro Plus", QUELLEN.preise),
    zeiterfassung: fakt("In allen Paketen", QUELLEN.preise),
    fahrzeugortung: fakt("Zusatzmodul", QUELLEN.preise, { zitat: "Smarter GPS-Tracker für Deine Firmenwagen" }),
  },
  staerken: [
    fakt("Sie möchten Firmenfahrzeuge per GPS orten; Craftnote bietet dafür ein Zusatzmodul an.", QUELLEN.preise),
    fakt(`Sie möchten länger testen: Craftnote nennt ${TESTTAGE} Tage mit dem Umfang von Büro Plus.`, QUELLEN.start),
    fakt("Sie möchten Großhändlerartikel per IDS-Connect übernehmen, wie in Büro Plus.", QUELLEN.preise),
  ],
  angaben: {
    mindestpaket: fakt("mindestens ein Büropaket", QUELLEN.preise, {
      zitat: "Um Pakete buchen zu können, ist mindestens ein Büro-Paket nötig",
    }),
    testOhneZahlung: fakt("ohne hinterlegte Zahlungsmethode, endet automatisch", QUELLEN.start, {
      zitat: "Zum Testen musst Du noch keine Zahlungsmethode hinterlegen",
    }),
    zahlung: fakt("SEPA-Lastschrift (nur Deutschland und Österreich) oder Kreditkarte", QUELLEN.preise),
    webApp: fakt("Web-App in Edge, Chrome und Firefox", QUELLEN.preise),
  },
};
