/**
 * plancraft – belegte Angaben (08-06, D-01, D-04). Alle Angaben mit Quelle (offizielle Herstellerseite) und
 * Abrufdatum; Zahlen nur als Felder, Sätze per Vorlage (08-RESEARCH Pitfalls 1, 2, 6); keine Ankündigungen (U9).
 * Neuprüfung: 22.10.2026 (Preisseite, Kleinbetriebe-Seite, Rechnungsprogramm-Seite). Netto laut Preisseite
 * („zzgl. USt.“). Nicht übernommen: KI-Empfang-Credit-Staffel (uneindeutig), Funktionen, die plancraft noch nicht als verfügbar führt.
 * Tests: tests/wettbewerber.test.ts.
 */
import type { Fakt, Quelle, Wettbewerber } from "./types";

const ABGERUFEN = "2026-10-22";

const QUELLEN = {
  preise: { label: "Preise und Pakete", url: "https://plancraft.com/de-de/preise" },
  kleinbetriebe: {
    label: "Handwerkersoftware für Kleinbetriebe",
    url: "https://plancraft.com/de-de/handwerkersoftware-kleinbetriebe",
  },
  rechnung: {
    label: "Rechnungsprogramm und E-Rechnung",
    url: "https://plancraft.com/de-de/funktionen/handwerk-rechnungsprogramm",
  },
} as const satisfies Record<string, Quelle>;

const fakt = <T,>(wert: T, quelle: Quelle, extra: { zitat?: string } = {}): Fakt<T> => ({
  wert,
  quelle,
  abgerufenAm: ABGERUFEN,
  ...extra,
});

export const plancraft: Wettbewerber = {
  slug: "plancraft",
  name: "plancraft",
  domain: "plancraft.com",
  testphaseTage: fakt(7, QUELLEN.kleinbetriebe, {
    zitat: "Du kannst plancraft 7 Tage lang kostenlos testen – ohne Kreditkarte und ohne automatische Verlängerung.",
  }),
  laufzeit: fakt("1 Monat", QUELLEN.preise, { zitat: "Bei deinem monatlich kündbaren Tarif entsprechend bis 1 Tag vor Ablauf deines bezahlten Monats." }),
  kuendigung: fakt("bis einen Tag vor Ende der Mindestlaufzeit", QUELLEN.preise, { zitat: "Bis einen Tag vor Mindestvertragslaufzeitende." }),
  preise: fakt(
    [
      { paket: "Business", centsMonat: 7490, centsJahrJeMonat: 5990, centsZweiJahreJeMonat: 4792, enthalten: "1 Bürozugang" },
      { paket: "Pro", centsMonat: 13990, centsJahrJeMonat: 10990, centsZweiJahreJeMonat: 8792, enthalten: "2 Bürozugänge" },
      { paket: "Premium", centsMonat: 24990, centsJahrJeMonat: 19990, centsZweiJahreJeMonat: 15992, enthalten: "3 Bürozugänge" },
    ],
    QUELLEN.preise,
  ),
  zusatzPreise: {
    buerozugang: fakt(
      { paket: "Bürozugang inkl. mobil", centsMonat: 5990, centsJahrJeMonat: 4990, centsZweiJahreJeMonat: 3992 },
      QUELLEN.preise,
    ),
    mobilzugang: fakt(
      { paket: "Mobilzugang", centsMonat: 2490, centsJahrJeMonat: 1990, centsZweiJahreJeMonat: 1592 },
      QUELLEN.preise,
    ),
    plantafel: fakt(
      { paket: "Plantafel-Modul (Business und Pro)", centsMonat: 4990, centsJahrJeMonat: 3990, centsZweiJahreJeMonat: 3192 },
      QUELLEN.preise,
    ),
  },
  kriterien: {
    mobileApp: fakt(true, QUELLEN.rechnung, { zitat: "Egal ob Android oder iOS" }),
    plantafel: fakt("Premium, sonst Modul", QUELLEN.preise),
    eRechnung: fakt("XRechnung-Format", QUELLEN.rechnung, { zitat: "E-Rechnungen im XRechnungs-Format" }),
    datev: fakt("In allen Paketen", QUELLEN.preise),
    gaeb: fakt("ab Pro", QUELLEN.preise),
    zeiterfassung: fakt(true, QUELLEN.preise),
    kiTelefon: fakt("In allen Paketen", QUELLEN.preise, { zitat: "KI-Empfang (inkl. 60 credits pro Monat)" }),
  },
  staerken: [
    fakt("Sie möchten einen KI-Empfang am Telefon nutzen; plancraft nennt ihn in allen Paketen.", QUELLEN.preise),
    fakt("Sie möchten zwei Jahre im Voraus zahlen und dafür den niedrigsten Monatspreis nutzen.", QUELLEN.preise),
    fakt("Sie brauchen unbegrenzte Scans von Eingangsrechnungen, wie im Paket Premium.", QUELLEN.preise),
  ],
  angaben: {
    nachTest: fakt(
      "0-€-Tarif mit eingeschränkten Funktionen; Dokumente fertigstellen nur mit Bezahltarif",
      QUELLEN.preise,
      { zitat: "Du wechselst in unseren 0€ Tarif mit eingeschränkten Funktionen." },
    ),
    testOhne: fakt("ohne Kreditkarte und ohne automatische Verlängerung", QUELLEN.kleinbetriebe),
    zahlungsarten: fakt("Kreditkarte und PayPal", QUELLEN.preise),
    eingangsrechnungen: fakt("Business keine, Pro bis zu 50 Scans im Monat, Premium unbegrenzt", QUELLEN.preise),
  },
};
