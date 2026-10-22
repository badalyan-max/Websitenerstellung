/**
 * Datentypen der Wettbewerberangaben (08-UI-SPEC § 3.2 U1–U12, § 3.3, D-01, D-02, D-04, D-16).
 *
 * Quellenregel: Jede Angabe ist ein `Fakt` mit Quelle (https-URL auf der offiziellen Herstellerdomain) und
 * Abrufdatum (JJJJ-MM-TT). Unbelegte Angaben werden weggelassen, nie als Platzhalter gefüllt (U1).
 * Literalregel: Zahlen stehen nur in Feldern (Cent, Tage), Sätze entstehen per Vorlage in den Seitenmodulen
 * (Testphasen-Scan, Preisliteral-Test, Route-Audit; 08-RESEARCH Pitfalls 1, 2, 6). Tageszahlen nur im Feld
 * `testphaseTage`/`kuendigungsfristTage` oder wörtlich in `zitat`.
 * Prüfung: lib/wettbewerber/index.ts (`pruefeWettbewerber`), Tests: tests/wettbewerber.test.ts.
 * Diese Datei bleibt clientneutral (kein server-only), weil Seitenbausteine die Typen nutzen.
 */

/** Beleg einer Angabe: Label für die Quellenliste („{Anbieter}: {Label}, abgerufen am …“) und https-URL. */
export interface Quelle {
  label: string;
  url: string;
}

/** Eine belegte Angabe. `zitat` = wörtlicher Ausschnitt der Quelle (U4), nur wenn die Seite ihn braucht. */
export interface Fakt<T> {
  wert: T;
  quelle: Quelle;
  /** Abrufdatum JJJJ-MM-TT, nicht in der Zukunft; älter als MAX_ALTER_TAGE (index.ts) → Warnung (D-04). */
  abgerufenAm: string;
  zitat?: string;
}

/**
 * Preis eines Pakets oder einer Lizenz, netto, in Cent (vermeidet Rundungsunterschiede).
 * U3: `stattCents` nur im Wortlaut „{Preis} statt {Preis}“; `ersterJahrespreis` → Zusatz „1. Vertragsjahr“;
 * `regulaerDerzeitCents` nur zusammen mit `ersterJahrespreis` und nur als „regulär derzeit …“ (nie Zusage);
 * `ab` nur, wenn der Anbieter selbst „ab“ schreibt.
 */
export interface Preis {
  paket: string;
  /** Monatliche Zahlweise, je Monat. */
  centsMonat?: number;
  /** Jährliche Zahlweise, je Monat. */
  centsJahrJeMonat?: number;
  /** Zweijährliche Zahlweise, je Monat. */
  centsZweiJahreJeMonat?: number;
  /** Vom Anbieter genannter Vergleichspreis („49,90 € statt 69,90 €“). */
  stattCents?: number;
  /** Jahrespreis gilt laut Anbieter nur im ersten Vertragsjahr. */
  ersterJahrespreis?: boolean;
  /** Vom Anbieter genannter regulärer Preis späterer Jahre (je Monat), nie als Zusage formulieren. */
  regulaerDerzeitCents?: number;
  /** Anbieter schreibt „ab“. */
  ab?: boolean;
  /** Enthaltene Zugänge oder Lizenzen in Kurzform, z. B. „1 Bürozugang“. */
  enthalten?: string;
}

export type WettbewerberSlug = "plancraft" | "craftnote" | "hero" | "tooltime";

/** Anbieterschreibweise je slug (U8). */
export type WettbewerberName = "plancraft" | "Craftnote" | "HERO" | "ToolTime";

/** Kriterien der Vergleichstabellen; nur belegte Kriterien werden gesetzt (U1). */
export type KriteriumId =
  | "mobileApp"
  | "plantafel"
  | "eRechnung"
  | "datev"
  | "gaeb"
  | "zeiterfassung"
  | "lager"
  | "kiTelefon"
  | "fahrzeugortung"
  | "lexware";

/** Screenshot-Beleg beider Umschalterstellungen der HERO-Preisseite (D-16, U11); Pfade relativ zu craftos/. */
export interface PreiseBelegt {
  screenshotMonatlich: string;
  screenshotJaehrlich: string;
  datum: string;
}

export interface Wettbewerber {
  slug: WettbewerberSlug;
  name: WettbewerberName;
  /** Offizielle Herstellerdomain; jede Quelle muss auf ihr oder einer Subdomain liegen. */
  domain: string;
  /** Testphase in Tagen (Zahl, kein Satz; Pitfall 1). */
  testphaseTage: Fakt<number>;
  /** Kürzeste Laufzeit in Kurzform, z. B. „1 Monat“ oder „12 Monate“. */
  laufzeit: Fakt<string>;
  /** Kündigungsregel ohne Tageszahl (Tage → `kuendigungsfristTage`). */
  kuendigung?: Fakt<string>;
  /** Kündigungsfrist in Tagen, nur wenn der Anbieter sie in Tagen nennt. */
  kuendigungsfristTage?: Fakt<number>;
  preise: Fakt<Preis[]>;
  /** Weitere Lizenzen, Module und Erweiterungen, Schlüssel frei (z. B. „mobilZugang“). */
  zusatzPreise?: Record<string, Fakt<Preis>>;
  /** `true`/Kurztext = bietet der Anbieter laut Quelle; fehlender Schlüssel = keine belegte Angabe. */
  kriterien: Partial<Record<KriteriumId, Fakt<string | boolean>>>;
  /** Belegte Stärken für „Wann {Name} passt“ (U6, mindestens 2). */
  staerken: Fakt<string>[];
  /** Weitere belegte Einzelangaben für FAQ und Panels (z. B. „zahlungsarten“), Schlüssel frei. */
  angaben?: Record<string, Fakt<string>>;
  /** Nur HERO: Screenshot-Beleg; `null` → Variante B ohne HERO-Preiszahlen. */
  preiseBelegt?: PreiseBelegt | null;
}

/** Eintrag der Quellenliste (entspricht ComparisonSource in components/v2/ComparisonTable.tsx). */
export interface QuellenEintrag {
  anbieter: string;
  label: string;
  url: string;
  abgerufenAm: string;
}
