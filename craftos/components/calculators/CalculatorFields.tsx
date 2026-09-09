"use client";

import { useId, useSyncExternalStore, type ReactNode } from "react";
import { parseDecimalInput } from "@/lib/calculators";
import styles from "./Calculators.module.css";

const unsubscribe = () => {};
const subscribeToHydration = () => unsubscribe;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useHydrationReady() {
  // Server HTML and the first hydration render stay disabled. React enables
  // editing once its change handlers can update the controlled form state.
  return useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
}

export function readInputs<T extends Record<string, string>>(input: T) {
  const values = {} as { [K in keyof T]: number };
  const errors: Record<string, string> = {};
  for (const key of Object.keys(input) as (keyof T & string)[]) {
    const value = parseDecimalInput(input[key]);
    values[key] = value ?? NaN;
    if (value === null) {
      errors[key] = input[key].trim()
        ? "Verwenden Sie eine Zahl wie 1.250,50 mit höchstens zwei Nachkommastellen."
        : "Bitte füllen Sie dieses Feld aus.";
    }
  }
  return { values, errors };
}

export function NumberField({
  label,
  value,
  onChange,
  unit,
  hint,
  error,
  placeholder = "0,00",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  hint?: ReactNode;
  error?: string;
  placeholder?: string;
}) {
  const id = useId();
  const hydrationReady = useHydrationReady();
  const descriptions = [
    hint ? `${id}-hint` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div
        className={`${styles.inputWrap} ${error ? styles.inputInvalid : ""}`}
      >
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          required
          maxLength={30}
          value={value}
          disabled={!hydrationReady}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptions || undefined}
        />
        <span className={styles.unit} aria-hidden="true">
          {unit}
        </span>
      </div>
      {hint && (
        <p className={styles.hint} id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className={styles.error} id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function VatFields({
  enabled,
  setEnabled,
  value,
  setValue,
  error,
}: {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  error?: string;
}) {
  const hydrationReady = useHydrationReady();
  return (
    <fieldset className={styles.vatFields}>
      <legend>Umsatzsteuer</legend>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={enabled}
          disabled={!hydrationReady}
          onChange={(event) => setEnabled(event.target.checked)}
        />
        <span>Bruttopreis zusätzlich anzeigen</span>
      </label>
      {enabled && (
        <NumberField
          label="Verwendeter Umsatzsteuersatz in Prozent"
          unit="%"
          value={value}
          onChange={setValue}
          error={error}
          placeholder="Steuersatz"
          hint="Tragen Sie den für Ihren Auftrag verwendeten Satz ein; der Rechner bestimmt ihn nicht."
        />
      )}
    </fieldset>
  );
}

export function MoneyRow({
  label,
  children,
  emphasis = false,
}: {
  label: ReactNode;
  children: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`${styles.moneyRow} ${emphasis ? styles.moneyRowEmphasis : ""}`}
    >
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function InvalidResult({ errors }: { errors: Record<string, string> }) {
  const generalError =
    errors.calculation || errors.annualCosts || errors.totalCosts;
  return (
    <div className={styles.invalidResult}>
      <h3>Für Ihr Ergebnis fehlen gültige Werte.</h3>
      <p>
        {generalError ||
          "Prüfen Sie die Hinweise direkt an den Eingabefeldern. Sobald die Werte passen, erscheint hier Ihre Kalkulation."}
      </p>
    </div>
  );
}

export function CalculationNote() {
  return (
    <p className={styles.calculationNote}>
      Kalkulierter Gewinn auf Grundlage Ihrer erfassten Kosten. Zielpreise
      werden auf volle Cent aufgerundet; gerechnet wird ohne Zwischenrundung.
      Alle Kosten nur einmal erfassen.
    </p>
  );
}
