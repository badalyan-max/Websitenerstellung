/**
 * HERO – belegte Angaben (08-06, D-01, D-04, D-16). Alle Angaben mit Quelle (offizielle Herstellerseite) und
 * Abrufdatum; Zahlen nur als Felder, Sätze per Vorlage (08-RESEARCH Pitfalls 1, 2, 6); keine Ankündigungen (U9).
 * Neuprüfung: 22.10.2026 (Preisseite, AGB 3.5/9.1/9.2, E-Rechnung-Seite). Netto laut AGB 3.5.
 * D-16/U11: Preiszahlen nur mit Screenshot-Beleg beider Umschalterstellungen (`preiseBelegt`); ohne Beleg
 * Variante B ohne HERO-Zahlen. Nicht verwendet: Angebote, die nur Drittquellen nennen, DATEV und GAEB
 * (auf den geprüften offiziellen Seiten nicht gefunden), XRechnung-Import (laut HERO noch nicht verfügbar).
 * Tests: tests/wettbewerber.test.ts.
 */
import type { Fakt, Preis, PreiseBelegt, Quelle, Wettbewerber } from "./types";

const ABGERUFEN = "2026-10-22";
const TESTTAGE = 14;

const QUELLEN = {
  preise: { label: "Preise und Pläne", url: "https://hero-software.de/preise" },
  agb: { label: "AGB", url: "https://hero-software.de/rechtliches/agb" },
  eRechnung: { label: "E-Rechnung", url: "https://hero-software.de/features/rechnungsprogramm-handwerker/e-rechnung" },
} as const satisfies Record<string, Quelle>;

const fakt = <T,>(wert: T, quelle: Quelle, extra: { zitat?: string } = {}): Fakt<T> => ({
  wert,
  quelle,
  abgerufenAm: ABGERUFEN,
  ...extra,
});

/**
 * Screenshot-Beleg (D-16): Playwright, Chromium 1440 × 900, Cookie-Banner „Nur notwendige Cookies“, Ausschnitt
 * Umschalter + Preiskarten. Umschalter „Monatlich“ → 79/135/345 €, „Jährlich“ → 69/119/299 €; null → Variante B.
 */
const PREISE_BELEGT: PreiseBelegt | null = {
  screenshotMonatlich: "docs/seo/belege/2026-10-22-hero-preise-monatlich.png",
  screenshotJaehrlich: "docs/seo/belege/2026-10-22-hero-preise-jaehrlich.png",
  datum: "2026-10-22",
};

/** Variante A: Zuordnung laut Screenshots (jährlich / monatlich), „ab“ wie auf der Preisseite. */
const PREISE_A: Preis[] = [
  { paket: "HERO Select", centsJahrJeMonat: 6900, centsMonat: 7900, ab: true, enthalten: "1 Standard-Lizenz" },
  { paket: "HERO OS", centsJahrJeMonat: 11900, centsMonat: 13500, ab: true, enthalten: "1 Standard-Lizenz" },
  { paket: "HERO OS Plus", centsJahrJeMonat: 29900, centsMonat: 34500, ab: true, enthalten: "1 Standard-Lizenz" },
];

/** Variante B: nur Pläne ohne Zahlen. */
const PREISE_B: Preis[] = PREISE_A.map(({ paket, enthalten }) => ({ paket, enthalten }));

export const hero: Wettbewerber = {
  slug: "hero",
  name: "HERO",
  domain: "hero-software.de",
  testphaseTage: fakt(TESTTAGE, QUELLEN.agb, {
    zitat: "alle kostenpflichtigen Module während einer Testphase von 14 Tagen kostenfrei zu nutzen",
  }),
  laufzeit: fakt("12 Monate", QUELLEN.agb, {
    zitat: "Soweit in der Bestellung nichts Abweichendes vereinbart, beträgt die Grundlaufzeit zwölf (12) Monate",
  }),
  laufzeitArt: "grundlaufzeit",
  kuendigung: fakt("einen Monat zum Ende der Vertragslaufzeit, sonst automatische Verlängerung", QUELLEN.agb, {
    zitat: "die Kündigungsfrist beträgt einen (1) Monat",
  }),
  preise: fakt(PREISE_BELEGT ? PREISE_A : PREISE_B, QUELLEN.preise, { zitat: "Alle Preise zzgl. MwSt." }),
  ...(PREISE_BELEGT
    ? {
        zusatzPreise: {
          appLizenz: fakt({ paket: "App-Lizenz, je Nutzer", centsJahrJeMonat: 2200, centsMonat: 2500 }, QUELLEN.preise),
          standardLizenz: fakt(
            { paket: "Standard-Lizenz, je Nutzer (HERO OS und HERO OS Plus)", centsJahrJeMonat: 6900, centsMonat: 7900 },
            QUELLEN.preise,
          ),
        },
      }
    : {}),
  kriterien: {
    mobileApp: fakt(true, QUELLEN.preise, { zitat: "Android & iOS App" }),
    plantafel: fakt("In allen Plänen", QUELLEN.preise, { zitat: "Digitale Plantafel" }),
    eRechnung: fakt("ZUGFeRD und XRechnung erstellen", QUELLEN.eRechnung, {
      zitat: "HERO unterstützt deswegen die Erstellung beider E-Rechnungen.",
    }),
    zeiterfassung: fakt("In allen Plänen", QUELLEN.preise, { zitat: "Exakte Zeiterfassung" }),
    lager: fakt("ab HERO OS", QUELLEN.preise, { zitat: "Lagerverwaltung" }),
    kiTelefon: fakt("ab HERO OS", QUELLEN.preise, { zitat: "KI-Telefonassistent" }),
  },
  staerken: [
    fakt("Sie möchten KI-Telefonie mit HERO Voice nutzen, enthalten ab HERO OS.", QUELLEN.preise),
    fakt("Sie möchten Zahlungen über HERO Wallet abwickeln oder einen API-Zugang nutzen.", QUELLEN.preise),
    fakt(`Sie möchten länger testen: HERO nennt ${TESTTAGE} Tage.`, QUELLEN.agb),
  ],
  angaben: {
    netto: fakt("zuzüglich Umsatzsteuer", QUELLEN.agb, {
      zitat: "Alle Preise verstehen sich zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer.",
    }),
    zahlweisen: fakt("Monatlich oder Jährlich", QUELLEN.preise),
    selectZielgruppe: fakt("Betriebe mit bis zu 5 Mitarbeitenden", QUELLEN.preise, {
      zitat: "Für Betriebe mit bis zu 5 Mitarbeitenden.",
    }),
    osPlusImplementierung: fakt("zusätzlich kostenpflichtiger Implementierungsservice", QUELLEN.preise, {
      zitat: "HERO OS Plus benötigt zusätzlich einen kostenpflichtigen Implementierungsservice.",
    }),
  },
  preiseBelegt: PREISE_BELEGT,
};
