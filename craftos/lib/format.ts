/**
 * Deutsche Formatierer für Preise und Datumsangaben (Musterseite, Startseite, Kennzahlen).
 * Preise kommen immer aus lib/site.ts (tarife); hier wird nur formatiert.
 */

/** Preis deutsch formatiert (Komma, geschütztes Leerzeichen vor dem Eurozeichen). */
export function euro(value: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}

/** ISO-Datum → „20.10.2026“. */
export function germanDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}
