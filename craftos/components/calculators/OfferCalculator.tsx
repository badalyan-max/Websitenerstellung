"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import {
  calculateOffer,
  formatMoney,
  formatNumber,
  formatPercent,
  parseDecimalInput,
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
  materialCosts: "500",
  hours: "10",
  costRate: "60",
  additionalCosts: "100",
  marginPercent: "20",
  netPrice: "1.500",
  vatPercent: "",
};

export function OfferCalculator() {
  const [input, setInput] = useState(example);
  const [mode, setMode] = useState<"target" | "check">("target");
  const [vatEnabled, setVatEnabled] = useState(false);
  const [transferNotice, setTransferNotice] = useState("");
  const update = (field: keyof typeof example, value: string) =>
    setInput((previous) => ({ ...previous, [field]: value }));

  useEffect(() => {
    // The deliberate transfer uses only a URL fragment, which is never sent to the
    // server. Consume it after hydration, then remove it from the address bar.
    // Analytics removes query strings and fragments and never reads input values.
    const frame = window.requestAnimationFrame(() => {
      const parameters = new URLSearchParams(window.location.hash.slice(1));
      const raw = parameters.get("kostensatz");
      if (raw === null) return;
      const rate = /^\d+(?:\.\d{1,2})?$/.test(raw)
        ? parseDecimalInput(raw)
        : null;
      if (rate !== null && rate >= 0) {
        setInput((previous) => ({
          ...previous,
          costRate: rate.toFixed(2).replace(".", ","),
        }));
        setTransferNotice(
          `${formatMoney(rate)} Kostensatz ohne Gewinn aus Ihrem Stundensatzrechner übernommen.`,
        );
      } else {
        setInput((previous) => ({ ...previous, costRate: "" }));
        setTransferNotice(
          "Der übergebene Kostensatz ist ungültig. Tragen Sie Ihren Kostensatz bitte erneut ein.",
        );
      }
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const parsed = readInputs({
    ...input,
    marginPercent: mode === "target" ? input.marginPercent : "0",
    netPrice: mode === "check" ? input.netPrice : "0",
    vatPercent: vatEnabled ? input.vatPercent : "0",
  });
  const calculated =
    mode === "target"
      ? calculateOffer({ ...parsed.values, mode: "target" })
      : calculateOffer({ ...parsed.values, mode: "check" });
  const errors = {
    ...(!calculated.ok ? calculated.errors : {}),
    ...parsed.errors,
  };
  const result =
    calculated.ok && Object.keys(errors).length === 0 ? calculated.value : null;

  function reset() {
    setInput({ ...example });
    setMode("target");
    setVatEnabled(false);
    setTransferNotice("");
  }

  return (
    <div className={styles.calculatorGrid} data-calculator="angebot">
      <form
        className={styles.formPanel}
        aria-labelledby="offer-input-title"
        noValidate
        onSubmit={(event) => event.preventDefault()}
        onReset={(event) => {
          event.preventDefault();
          reset();
        }}
      >
        <div className={styles.panelHeader}>
          <h2 id="offer-input-title">Ihren Auftrag durchrechnen</h2>
          <p>
            Starten Sie mit den Beispielwerten oder Ihren eigenen Zahlen; Ihr
            Ergebnis aktualisiert sich direkt.
          </p>
        </div>
        <fieldset className={styles.modeFieldset}>
          <legend>Was möchten Sie berechnen?</legend>
          <div className={styles.modeOptions}>
            <label
              className={mode === "target" ? styles.selectedMode : undefined}
            >
              <input
                type="radio"
                name="offer-mode"
                value="target"
                checked={mode === "target"}
                onChange={() => setMode("target")}
              />
              <span>Angebotspreis berechnen</span>
            </label>
            <label
              className={mode === "check" ? styles.selectedMode : undefined}
            >
              <input
                type="radio"
                name="offer-mode"
                value="check"
                checked={mode === "check"}
                onChange={() => setMode("check")}
              />
              <span>Vorhandenen Preis prüfen</span>
            </label>
          </div>
        </fieldset>
        {transferNotice && (
          <p className={styles.transferNotice} role="status">
            {transferNotice}
          </p>
        )}
        <fieldset className={styles.fieldset}>
          <legend>Ihre Auftragskosten</legend>
          <NumberField
            label="Materialkosten netto in Euro"
            value={input.materialCosts}
            onChange={(value) => update("materialCosts", value)}
            unit="€"
            error={errors.materialCosts}
            hint="Einkaufskosten des Materials für diesen Auftrag, ohne Verkaufsaufschlag."
          />
          <div className={styles.fieldPair}>
            <NumberField
              label="Arbeitsstunden für den Auftrag"
              value={input.hours}
              onChange={(value) => update("hours", value)}
              unit="h"
              error={errors.hours}
              hint="Gesamter Zeitbedarf aller beteiligten Personen."
            />
            <NumberField
              label="Interner Kostensatz in Euro pro Stunde"
              value={input.costRate}
              onChange={(value) => update("costRate", value)}
              unit="€/h"
              error={errors.costRate}
              hint="Personalkosten und anteilige Betriebskosten, ohne Gewinn."
            />
          </div>
          <p className={styles.fieldLink}>
            <Link href="/rechner/stundensatz">
              Ihren internen Kostensatz berechnen
            </Link>
          </p>
          <NumberField
            label="Zusätzliche Auftragskosten netto in Euro"
            value={input.additionalCosts}
            onChange={(value) => update("additionalCosts", value)}
            unit="€"
            error={errors.additionalCosts}
            hint="Zum Beispiel Fremdleistungen oder auftragsbezogene Mieten, soweit sie nicht schon im Material oder Kostensatz enthalten sind."
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>
            {mode === "target" ? "Ihre Zielmarge" : "Ihr vorhandener Preis"}
          </legend>
          {mode === "target" ? (
            <NumberField
              label="Gewünschte Gewinnmarge in Prozent"
              value={input.marginPercent}
              onChange={(value) => update("marginPercent", value)}
              unit="%"
              error={errors.marginPercent}
              hint="Gewinn als Anteil am Nettoangebotspreis. 20 % Marge entsprechen 25 % Aufschlag auf die Kosten."
            />
          ) : (
            <NumberField
              label="Vorhandener Nettoangebotspreis in Euro"
              value={input.netPrice}
              onChange={(value) => update("netPrice", value)}
              unit="€"
              error={errors.netPrice}
              hint="Der Preis nach vereinbarten Nachlässen, ohne Umsatzsteuer."
            />
          )}
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
        aria-labelledby="offer-result-title"
      >
        <h2 id="offer-result-title">Ihre Kalkulation</h2>
        <p
          className={styles.srOnly}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {result
            ? `${formatMoney(result.net)} netto. ${result.profit < 0 ? "Verlust" : "Kalkulierter Gewinn"} ${formatMoney(Math.abs(result.profit))}. Marge ${formatPercent(result.marginPercent)}.`
            : "Kein Ergebnis. Prüfen Sie Ihre Eingaben."}
        </p>
        {result ? (
          <>
            <div className={styles.primaryResult}>
              <p>
                {mode === "target"
                  ? "Angebotspreis bei Ihrer Zielmarge"
                  : "Ihr vorhandener Angebotspreis"}
              </p>
              <p className={styles.resultAmount}>{formatMoney(result.net)}</p>
              <p className={styles.resultUnit}>netto für Ihren Auftrag</p>
            </div>
            {result.profit < 0 && (
              <p className={styles.lossNotice}>
                Dieser Preis deckt Ihre erfassten Kosten nicht. Es fehlen{" "}
                {formatMoney(-result.profit)}.
              </p>
            )}
            <dl className={styles.breakdown}>
              <MoneyRow label="Materialkosten">
                {formatMoney(parsed.values.materialCosts)}
              </MoneyRow>
              <MoneyRow label="Arbeitskosten">
                {formatMoney(result.labourCosts)}
              </MoneyRow>
              <MoneyRow label="Zusätzliche Kosten">
                {formatMoney(parsed.values.additionalCosts)}
              </MoneyRow>
              <MoneyRow label="Auftragskosten gesamt" emphasis>
                {formatMoney(result.totalCosts)}
              </MoneyRow>
              <MoneyRow
                label={
                  result.profit < 0
                    ? "Kalkulierter Verlust"
                    : "Kalkulierter Gewinn"
                }
              >
                {formatMoney(result.profit)}
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
                    {formatMoney(result.vat)}
                  </MoneyRow>
                  <MoneyRow label="Angebotspreis brutto" emphasis>
                    {formatMoney(result.gross)}
                  </MoneyRow>
                </>
              )}
            </dl>
            <details className={styles.calculationPath}>
              <summary>So wird Ihr Angebot berechnet</summary>
              <ol>
                <li>
                  Arbeitskosten: {formatNumber(parsed.values.hours)} h ×{" "}
                  {formatMoney(parsed.values.costRate)} / h ={" "}
                  <strong>{formatMoney(result.labourCosts)}</strong>.
                </li>
                <li>
                  Auftragskosten: {formatMoney(parsed.values.materialCosts)} +{" "}
                  {formatMoney(result.labourCosts)} +{" "}
                  {formatMoney(parsed.values.additionalCosts)} ={" "}
                  <strong>{formatMoney(result.totalCosts)}</strong>.
                </li>
                {mode === "target" && (
                  <li>
                    Zielpreis: Auftragskosten ÷ (1 − Zielmarge ÷ 100) ={" "}
                    <strong>{formatMoney(result.net)} netto</strong>, auf volle
                    Cent aufgerundet.
                  </li>
                )}
                <li>
                  Gewinn: {formatMoney(result.net)} −{" "}
                  {formatMoney(result.totalCosts)} ={" "}
                  <strong>{formatMoney(result.profit)}</strong>.
                </li>
                <li>
                  Marge: Gewinn ÷ Nettoangebotspreis × 100 ={" "}
                  <strong>{formatPercent(result.marginPercent)}</strong>.
                </li>
                <li>
                  Kostenaufschlag: Gewinn ÷ Auftragskosten × 100 ={" "}
                  <strong>{formatPercent(result.markupPercent)}</strong>.
                </li>
              </ol>
            </details>
            <CalculationNote />
          </>
        ) : (
          <InvalidResult errors={errors} />
        )}
      </section>
    </div>
  );
}
