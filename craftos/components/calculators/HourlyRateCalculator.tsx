"use client";

import { useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import {
  calculateHourlyRate,
  ceilCurrency,
  formatMoney,
  formatNumber,
  formatPercent,
} from "@/lib/calculators";
import {
  CalculationNote,
  InvalidResult,
  MoneyRow,
  NumberField,
  readInputs,
  VatFields,
} from "./CalculatorFields";
import styles from "./Calculators.module.css";

const example = {
  annualPersonnelCosts: "60.000",
  annualOwnerCompensation: "48.000",
  annualOperatingCosts: "36.000",
  billableHours: "2.400",
  marginPercent: "20",
  vatPercent: "",
};

export function HourlyRateCalculator() {
  const [input, setInput] = useState(example);
  const [vatEnabled, setVatEnabled] = useState(false);
  const update = (field: keyof typeof example, value: string) =>
    setInput((previous) => ({ ...previous, [field]: value }));
  const parsed = readInputs({
    ...input,
    vatPercent: vatEnabled ? input.vatPercent : "0",
  });
  const calculated = calculateHourlyRate(parsed.values);
  const errors = {
    ...(!calculated.ok ? calculated.errors : {}),
    ...parsed.errors,
  };
  const result =
    calculated.ok && Object.keys(errors).length === 0 ? calculated.value : null;

  function reset() {
    setInput({ ...example });
    setVatEnabled(false);
  }

  return (
    <div className={styles.calculatorGrid} data-calculator="stundensatz">
      <form
        className={styles.formPanel}
        aria-labelledby="hourly-input-title"
        noValidate
        onSubmit={(event) => event.preventDefault()}
        onReset={(event) => {
          event.preventDefault();
          reset();
        }}
      >
        <div className={styles.panelHeader}>
          <h2 id="hourly-input-title">Ihr Betrieb in Zahlen</h2>
          <p>
            Die Werte sind ein Beispiel. Passen Sie sie an Ihren Betrieb an; Ihr
            Ergebnis aktualisiert sich direkt.
          </p>
        </div>
        <fieldset className={styles.fieldset}>
          <legend>Kosten pro Jahr</legend>
          <NumberField
            label="Personalkosten pro Jahr in Euro"
            value={input.annualPersonnelCosts}
            onChange={(value) => update("annualPersonnelCosts", value)}
            unit="€"
            error={errors.annualPersonnelCosts}
            hint="Alle Beschäftigten einschließlich Arbeitgeberkosten und bezahlter Ausfallzeiten. Ohne Personal tragen Sie 0 ein."
          />
          <NumberField
            label="Kalkulatorischer Unternehmerlohn pro Jahr in Euro"
            value={input.annualOwnerCompensation}
            onChange={(value) => update("annualOwnerCompensation", value)}
            unit="€"
            error={errors.annualOwnerCompensation}
            hint="Vergütung für Ihre eigene Arbeit. Ist sie bereits als Gehalt in den Personalkosten enthalten, tragen Sie hier 0 ein. Kein privates Nettoeinkommen."
          />
          <NumberField
            label="Weitere Betriebskosten pro Jahr in Euro"
            value={input.annualOperatingCosts}
            onChange={(value) => update("annualOperatingCosts", value)}
            unit="€"
            error={errors.annualOperatingCosts}
            hint="Zum Beispiel Miete, Fahrzeuge, Versicherungen und Abschreibungen. Ohne schon erfasste Löhne und separat berechnetes Auftragsmaterial."
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>Verrechenbare Zeit und Ziel</legend>
          <NumberField
            label="Verrechenbare Stunden pro Jahr"
            value={input.billableHours}
            onChange={(value) => update("billableHours", value)}
            unit="h"
            error={errors.billableHours}
            hint="Für den gesamten Betrieb inklusive Ihrer produktiven Zeit. Urlaub, Krankheit und nicht abrechenbare Arbeit vorher abziehen."
          />
          <NumberField
            label="Gewünschte Gewinnmarge in Prozent"
            value={input.marginPercent}
            onChange={(value) => update("marginPercent", value)}
            unit="%"
            error={errors.marginPercent}
            hint="Die Marge ist der Gewinnanteil am Nettoverkaufspreis. 20 % Marge entsprechen 25 % Aufschlag auf Ihre Kosten."
          />
        </fieldset>
        <VatFields
          enabled={vatEnabled}
          setEnabled={setVatEnabled}
          value={input.vatPercent}
          setValue={(value) => update("vatPercent", value)}
          error={errors.vatPercent}
        />
        <button className={styles.resetButton} type="reset">
          <RotateCcw size={16} aria-hidden="true" />
          Auf Beispielwerte zurücksetzen
        </button>
        <p className={styles.privacyNote}>
          Ihre Eingaben bleiben für diese Berechnung im Browser und werden nicht
          gespeichert.
        </p>
      </form>

      <section
        className={styles.resultsPanel}
        aria-labelledby="hourly-result-title"
      >
        <h2 id="hourly-result-title">Ihre Kalkulation</h2>
        <p
          className={styles.srOnly}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {result
            ? `Stundensatz ${formatMoney(result.net)} netto pro Stunde. Kostendeckend ${formatMoney(result.costRate)}.`
            : "Kein Ergebnis. Prüfen Sie Ihre Eingaben."}
        </p>
        {result ? (
          <>
            <div className={styles.primaryResult}>
              <p>Stundensatz bei Ihrer Zielmarge</p>
              <p className={styles.resultAmount}>{formatMoney(result.net)}</p>
              <p className={styles.resultUnit}>netto pro Stunde</p>
            </div>
            <dl className={styles.breakdown}>
              <MoneyRow label="Rechnerisch kostendeckend">
                {formatMoney(result.costRate)} / h
              </MoneyRow>
              <MoneyRow label="Kalkulierter Gewinn">
                {formatMoney(result.profitPerHour)} / h
              </MoneyRow>
              <MoneyRow label="Gewinnmarge">
                {formatPercent(result.marginPercent)}
              </MoneyRow>
              <MoneyRow label="Kostenaufschlag">
                {formatPercent(result.markupPercent)}
              </MoneyRow>
              {vatEnabled && (
                <>
                  <MoneyRow
                    label={`Umsatzsteuer (${formatPercent(parsed.values.vatPercent)})`}
                  >
                    {formatMoney(result.vat)} / h
                  </MoneyRow>
                  <MoneyRow label="Stundensatz brutto" emphasis>
                    {formatMoney(result.gross)} / h
                  </MoneyRow>
                </>
              )}
            </dl>
            <details className={styles.calculationPath}>
              <summary>So wird Ihr Stundensatz berechnet</summary>
              <ol>
                <li>
                  Jahreskosten:{" "}
                  {formatMoney(parsed.values.annualPersonnelCosts)} +{" "}
                  {formatMoney(parsed.values.annualOwnerCompensation)} +{" "}
                  {formatMoney(parsed.values.annualOperatingCosts)} ={" "}
                  <strong>{formatMoney(result.annualCosts)}</strong>.
                </li>
                <li>
                  Kosten je Stunde: {formatMoney(result.annualCosts)} ÷{" "}
                  {formatNumber(parsed.values.billableHours)} h ={" "}
                  <strong>{formatMoney(result.costRate)} / h</strong>.
                </li>
                <li>
                  Zielpreis: Kosten je Stunde ÷ (1 − Zielmarge ÷ 100) ={" "}
                  <strong>{formatMoney(result.net)} netto / h</strong>, auf
                  volle Cent aufgerundet.
                </li>
              </ol>
            </details>
            <a
              className={styles.transferLink}
              href={`/rechner/angebotskalkulation#kostensatz=${ceilCurrency(result.costRate).toFixed(2)}`}
              referrerPolicy="no-referrer"
            >
              Mit {formatMoney(ceilCurrency(result.costRate))} Kostensatz ein
              Angebot kalkulieren
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <p className={styles.hint}>
              Übernommen wird nur der Kostensatz ohne Gewinn, auf Cent
              aufgerundet.
            </p>
            <CalculationNote />
          </>
        ) : (
          <InvalidResult errors={errors} />
        )}
      </section>
    </div>
  );
}
