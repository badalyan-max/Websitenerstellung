import { Children, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { assertTextBudget } from "../budgets";
import { MINI_BUDGET } from "./limits";
import s from "./MiniUi.module.css";

/**
 * Mini-UI-Grundelemente (UI-SPEC §6): verkleinerte, statische Produktoberfläche in Geräterahmen.
 * Nur fiktive Beispieldaten, keine fokussierbaren Elemente, keine Cursor oder Zeitleisten.
 * Die Rahmen setzen den Container auf aria-hidden="true" und inert.
 */

function assertRow(value: string | undefined): void {
  if (value !== undefined) assertTextBudget("mini.row", value, MINI_BUDGET.row);
}

export interface MiniListProps {
  /** Höchstens MINI_BUDGET.rows MiniRow-Elemente. */
  children?: ReactNode;
}

export function MiniList({ children }: MiniListProps) {
  const rows = Children.toArray(children);
  if (rows.length > MINI_BUDGET.rows) {
    throw new Error(`MiniList: höchstens ${MINI_BUDGET.rows} Zeilen erlaubt – Inhalte in lib/… kürzen.`);
  }
  return <ul className={s.list}>{rows}</ul>;
}

export interface MiniRowProps {
  icon?: LucideIcon;
  primary: string;
  secondary?: string;
  /** Rechter Wert, z. B. Uhrzeit oder Betrag (Beispieldaten). */
  value?: string;
  /** Statuspille statt Wert. */
  status?: ReactNode;
}

export function MiniRow({ icon: Icon, primary, secondary, value, status }: MiniRowProps) {
  assertRow(primary);
  assertRow(secondary);
  assertRow(value);
  return (
    <li className={s.row}>
      {Icon ? (
        <span className={s.rowIcon}>
          <Icon size={16} strokeWidth={1.75} />
        </span>
      ) : null}
      <span className={s.rowText}>
        <span className={s.primary}>{primary}</span>
        {secondary ? <span className={s.secondary}>{secondary}</span> : null}
      </span>
      {status ?? (value ? <span className={s.value}>{value}</span> : null)}
    </li>
  );
}

export interface MiniStatProps {
  label: string;
  value: string;
}

export function MiniStat({ label, value }: MiniStatProps) {
  assertRow(label);
  assertRow(value);
  return (
    <div className={s.stat}>
      <span className={s.statLabel}>{label}</span>
      <span className={s.statValue}>{value}</span>
    </div>
  );
}

/**
 * Nur Statusnamen, die im Produkt-Release existieren (07-UI-SPEC „MiniStatusName-Erweiterung (F3)“).
 * Jeder Name hat einen Beleg in MINI_STATUS_BELEGE; Vitest prüft die neuen Namen am Release-Commit.
 */
export type MiniStatusName =
  // Dokumentstatus paid/pending/draft/sent/overdue/cancelled – web:src/pages/Dokumente.tsx
  | "Entwurf"
  | "Offen"
  | "Gesendet"
  | "Bezahlt"
  | "Überfällig"
  | "Storniert"
  // Projektstatus – web:src/pages/Dashboard.tsx und mobile:src/shared/i18n/locales/de/projects.json
  | "Geplant"
  | "In Arbeit"
  | "Abgeschlossen"
  // Mängelstatus – mobile:src/shared/i18n/locales/de/defects.json
  | "In Bearbeitung"
  | "Behoben"
  | "Geprüft"
  // Bautagebuch/Berichte – mobile:src/shared/i18n/locales/de/construction.json
  | "Unterschrieben"
  // Urlaubsanträge – mobile:src/shared/i18n/locales/de/vacation.json
  | "Ausstehend"
  | "Genehmigt"
  | "Abgelehnt"
  // Abnahmen – mobile:src/shared/i18n/locales/de/acceptance.json
  | "Abgenommen"
  | "Abgenommen mit Mängeln"
  // Bankumsätze – web:src/pages/Bankumsaetze.tsx
  | "Zugeordnet"
  | "Noch nicht zugeordnet"
  // GAEB-Positionskennzeichen (keine Status) – web:src/components/DocumentEditor/GAEBImportDialog.tsx
  | "Text"
  | "Bedarf";

/** Release-Beleg je Statusname, Form `web:<pfad>` oder `mobile:<pfad>` (Pfad im jeweiligen Produktrepo). */
export const MINI_STATUS_BELEGE: Record<MiniStatusName, string> = {
  Entwurf: "web:src/pages/Dokumente.tsx",
  Offen: "web:src/pages/Dokumente.tsx",
  Gesendet: "web:src/pages/Dokumente.tsx",
  Bezahlt: "web:src/pages/Dokumente.tsx",
  Überfällig: "web:src/pages/Dokumente.tsx",
  Storniert: "web:src/pages/Dokumente.tsx",
  Geplant: "web:src/pages/Dashboard.tsx",
  "In Arbeit": "web:src/pages/Dashboard.tsx",
  Abgeschlossen: "web:src/pages/Dashboard.tsx",
  "In Bearbeitung": "mobile:src/shared/i18n/locales/de/defects.json",
  Behoben: "mobile:src/shared/i18n/locales/de/defects.json",
  Geprüft: "mobile:src/shared/i18n/locales/de/defects.json",
  Unterschrieben: "mobile:src/shared/i18n/locales/de/construction.json",
  Ausstehend: "mobile:src/shared/i18n/locales/de/vacation.json",
  Genehmigt: "mobile:src/shared/i18n/locales/de/vacation.json",
  Abgelehnt: "mobile:src/shared/i18n/locales/de/vacation.json",
  Abgenommen: "mobile:src/shared/i18n/locales/de/acceptance.json",
  "Abgenommen mit Mängeln": "mobile:src/shared/i18n/locales/de/acceptance.json",
  Zugeordnet: "web:src/pages/Bankumsaetze.tsx",
  "Noch nicht zugeordnet": "web:src/pages/Bankumsaetze.tsx",
  Text: "web:src/components/DocumentEditor/GAEBImportDialog.tsx",
  Bedarf: "web:src/components/DocumentEditor/GAEBImportDialog.tsx",
};

export type MiniStatusTon = "neutral" | "positiv" | "hervorgehoben";

/** Ton je Statusname; Farben in MiniUi.module.css (kein Rot, kein Grün – UI-SPEC [05]). */
export const MINI_STATUS_TON: Record<MiniStatusName, MiniStatusTon> = {
  Entwurf: "neutral",
  Offen: "neutral",
  Gesendet: "neutral",
  Bezahlt: "positiv",
  Überfällig: "hervorgehoben",
  Storniert: "neutral",
  Geplant: "neutral",
  "In Arbeit": "neutral",
  Abgeschlossen: "positiv",
  "In Bearbeitung": "neutral",
  Behoben: "positiv",
  Geprüft: "positiv",
  Unterschrieben: "positiv",
  Ausstehend: "neutral",
  Genehmigt: "positiv",
  Abgelehnt: "hervorgehoben",
  Abgenommen: "positiv",
  "Abgenommen mit Mängeln": "neutral",
  Zugeordnet: "positiv",
  "Noch nicht zugeordnet": "neutral",
  Text: "neutral",
  Bedarf: "neutral",
};

export function MiniStatus({ status }: { status: MiniStatusName }) {
  return (
    <span className={s.status} data-status={status} data-tone={MINI_STATUS_TON[status]}>
      {status}
    </span>
  );
}

export interface MiniWeekEntry {
  /** 0 = Montag … 4 = Freitag */
  day: 0 | 1 | 2 | 3 | 4;
  label: string;
  /** Zeile im Tag (0–2), Standard 0 */
  lane?: 0 | 1 | 2;
  /** Spannweite in Tagen, Standard 1 */
  span?: 1 | 2 | 3;
}

const WEEK_DAYS = ["Mo", "Di", "Mi", "Do", "Fr"] as const;

/** Plantafel-Wochenraster mit Einsatzblöcken (statisch). */
export function MiniWeek({ entries }: { entries: MiniWeekEntry[] }) {
  if (entries.length > MINI_BUDGET.rows) {
    throw new Error(`MiniWeek: höchstens ${MINI_BUDGET.rows} Einsätze erlaubt – Inhalte in lib/… kürzen.`);
  }
  for (const entry of entries) {
    assertRow(entry.label);
    // Ein Einsatz darf nicht über Freitag hinausragen, sonst entstehen implizite Grid-Spalten (LO-09).
    if (entry.day + (entry.span ?? 1) > WEEK_DAYS.length) {
      throw new Error(`MiniWeek: Einsatz „${entry.label}“ ragt über Freitag hinaus (day + span > ${WEEK_DAYS.length}).`);
    }
  }
  return (
    <div className={s.week}>
      {WEEK_DAYS.map((day, index) => (
        <span key={day} className={s.weekDay} style={{ gridColumn: index + 1 }}>
          {day}
        </span>
      ))}
      {entries.map((entry, index) => (
        <span
          key={`${entry.day}-${entry.lane ?? 0}-${index}`}
          className={s.weekBlock}
          data-lane={entry.lane ?? 0}
          style={{ gridColumn: `${entry.day + 1} / span ${entry.span ?? 1}`, gridRow: (entry.lane ?? 0) + 2 }}
        >
          {entry.label}
        </span>
      ))}
    </div>
  );
}

/** Laufende Zeiterfassung mit statischem Wert (keine tickende Uhr). */
export function MiniTimer({ label, value }: { label: string; value: string }) {
  assertRow(label);
  assertRow(value);
  return (
    <div className={s.timer}>
      <span className={s.timerDot} />
      <span className={s.timerLabel}>{label}</span>
      <span className={s.timerValue}>{value}</span>
    </div>
  );
}
