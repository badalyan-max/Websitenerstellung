import { Check, Minus } from "lucide-react";
import { germanDate } from "@/lib/format";
import { TEXT_BUDGET, assertCount, assertTextBudget } from "./budgets";
import s from "./ComparisonTable.module.css";

/** true = enthalten, false = nicht enthalten, "teilweise", sonst kurzer Zelltext ≤ 24 Zeichen. */
export type Cell = boolean | "teilweise" | string;

export interface ComparisonColumn {
  key: string;
  label: string;
  /** Hervorgehobene Spalte (CraftOS bzw. empfohlene Lizenz) – höchstens eine. */
  highlight?: boolean;
}

export interface ComparisonRow {
  label: string;
  cells: Record<string, Cell>;
}

/** Beleg einer Tabellenangabe (08-UI-SPEC G3, D-02/D-04): Anbieter, Quellen-Label, https-URL, Abrufdatum (ISO). */
export interface ComparisonSource {
  anbieter: string;
  label: string;
  url: string;
  /** ISO-Datum JJJJ-MM-TT; sichtbar als TT.MM.JJJJ. */
  abgerufenAm: string;
}

export interface ComparisonTableProps {
  /** Sichtbar, zugleich aria-label des Scrollbereichs. */
  caption: string;
  /** Höchstens 4 Wertspalten. */
  columns: ComparisonColumn[];
  /** Höchstens 12 Zeilen. */
  rows: ComparisonRow[];
  /** Pflicht: Quelle und Stand. */
  note: string;
  /** Kopf der Zeilenbeschriftungsspalte, Standard „Leistung“. */
  rowHeader?: string;
  /** Quellenliste unter der Note, gruppiert nach Anbieter (G3). Links rel="nofollow", gleicher Tab. */
  sources?: ComparisonSource[];
  /** Zeile unter der Quellenliste, z. B. „Die Nennung von … dient der Zuordnung; …“ (G3). */
  disclaimer?: string;
}

const LIMITS = TEXT_BUDGET.count.comparison;

/**
 * Vergleichstabelle v2 (UI-SPEC §7): echte Tabelle, neutrale Ja/Nein-Darstellung ohne Rot und Grün,
 * hervorgehobene Spalte warm mit Amber-Oberkante. Unter 768 px seitlich scrollbar mit fester erster Spalte.
 * Phase 8 (G3, C5): optionale Quellenliste und Disclaimer unter der Note; Marktübersichten ohne highlight.
 */
export function ComparisonTable({
  caption,
  columns,
  rows,
  note,
  rowHeader = "Leistung",
  sources,
  disclaimer,
}: ComparisonTableProps) {
  assertCount("ComparisonTable", columns.length, { min: 1, max: LIMITS.columns }, "Wertspalten");
  assertCount("ComparisonTable", rows.length, { min: 1, max: LIMITS.rows }, "Zeilen");
  if (columns.filter((column) => column.highlight).length > 1) {
    throw new Error("ComparisonTable: höchstens 1 hervorgehobene Spalte erlaubt – highlight anpassen.");
  }
  if (!note.trim()) {
    throw new Error("ComparisonTable: note fehlt – Quelle und Stand angeben.");
  }
  for (const row of rows) {
    assertTextBudget("comparison.rowLabel", row.label, TEXT_BUDGET.comparison.rowLabel);
    for (const column of columns) {
      const cell = row.cells[column.key];
      if (cell === undefined) {
        throw new Error(`ComparisonTable: Zeile „${row.label}“ hat keinen Wert für Spalte ${column.key} – Zelle ergänzen.`);
      }
      if (typeof cell === "string" && cell !== "teilweise") {
        assertTextBudget("comparison.cell", cell, TEXT_BUDGET.comparison.cell);
      }
    }
  }
  const quellen = sources ? gruppiereQuellen(sources) : [];

  return (
    <div className={s.root}>
      <p className={s.hint}>Zum Vergleichen seitlich wischen</p>
      <div className={s.scroll} role="region" aria-label={caption} tabIndex={0}>
        <table className={s.table}>
          <caption className={s.caption}>{caption}</caption>
          <thead>
            <tr>
              <th scope="col" className={s.rowHead}>
                {rowHeader}
              </th>
              {columns.map((column) => (
                <th key={column.key} scope="col" data-highlight={column.highlight ? "true" : undefined}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className={s.rowHead}>
                  {row.label}
                </th>
                {columns.map((column) => (
                  <td key={column.key} data-highlight={column.highlight ? "true" : undefined}>
                    <CellValue value={row.cells[column.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={s.note}>{note}</p>
      {quellen.length > 0 ? (
        <ol className={s.sources} aria-label="Quellen zur Tabelle">
          {quellen.map((quelle) => (
            <li key={quelle.url + quelle.label} className={s.source}>
              {`${quelle.anbieter}: `}
              <a href={quelle.url} rel="nofollow" className={s.sourceLink}>
                {quelle.label}
              </a>
              {`, abgerufen am ${germanDate(quelle.abgerufenAm)}`}
            </li>
          ))}
        </ol>
      ) : null}
      {disclaimer ? (
        <p className={s.note} data-disclaimer="">
          {disclaimer}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Prüft jede Quelle (nur https, ISO-Datum; T-08-07) und gruppiert nach Anbieter in der Reihenfolge des
 * ersten Auftretens, innerhalb eines Anbieters in Eingabereihenfolge.
 */
function gruppiereQuellen(sources: ComparisonSource[]): ComparisonSource[] {
  for (const quelle of sources) {
    if (!quelle.url.startsWith("https://")) {
      throw new Error(`ComparisonTable: Quelle ‚${quelle.label}‘ ohne https-Adresse – nur https://-Quellen verlinken.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(quelle.abgerufenAm)) {
      throw new Error(`ComparisonTable: Quelle ‚${quelle.label}‘ hat kein Abrufdatum im Format JJJJ-MM-TT.`);
    }
  }
  const reihenfolge = [...new Set(sources.map((quelle) => quelle.anbieter))];
  return reihenfolge.flatMap((anbieter) => sources.filter((quelle) => quelle.anbieter === anbieter));
}

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className={s.mark} data-value="ja">
        <Check size={20} strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Ja</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className={s.mark} data-value="nein">
        <Minus size={20} strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Nein</span>
      </span>
    );
  }
  if (value === "teilweise") {
    return <span className={s.partial}>Teilweise</span>;
  }
  return <span className={s.text}>{value}</span>;
}
