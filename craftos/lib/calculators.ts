/** Pure, local calculator logic. Percentages are expressed as 20 for 20%. */
export type CalculationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: Record<string, string> };

export interface HourlyRateInput {
  annualPersonnelCosts: number;
  annualOwnerCompensation: number;
  annualOperatingCosts: number;
  billableHours: number;
  marginPercent: number;
  vatPercent: number;
}

export interface VatAmounts {
  net: number;
  vat: number;
  gross: number;
}

export interface HourlyRateResult extends VatAmounts {
  annualCosts: number;
  costRate: number;
  profitPerHour: number;
  marginPercent: number;
  markupPercent: number;
}

export interface OfferInput {
  materialCosts: number;
  hours: number;
  costRate: number;
  additionalCosts: number;
  vatPercent: number;
}

export type OfferPricingInput = OfferInput &
  (
    | { mode: "target"; marginPercent: number }
    | { mode: "check"; netPrice: number }
  );

export interface OfferResult extends VatAmounts {
  labourCosts: number;
  totalCosts: number;
  profit: number;
  marginPercent: number;
  markupPercent: number;
}

/**
 * Accept German decimals/grouping and an ungrouped decimal point from keyboards.
 * A single point with three following digits is a German thousands separator.
 * Reject partial values, ambiguous grouping, exponents, and non-finite numbers.
 */
export function parseDecimalInput(input: string): number | null {
  const value = input.trim().replace(/[\u00a0\u202f]/g, " ");
  if (!value || value.length > 30) return null;

  const signed = value.startsWith("-") ? value.slice(1) : value;
  const sign = value.startsWith("-") ? -1 : 1;
  const integer = "(?:\\d+|\\d{1,3}(?:\\.\\d{3})+|\\d{1,3}(?: \\d{3})+)";
  let normalized: string;

  if (signed.includes(",")) {
    if (!new RegExp(`^${integer},\\d{1,2}$`).test(signed)) return null;
    normalized = signed.replace(/[. ]/g, "").replace(",", ".");
  } else if (
    /^\d{1,3}(?:\.\d{3})+$/.test(signed) ||
    /^\d{1,3}(?: \d{3})+$/.test(signed)
  ) {
    normalized = signed.replace(/[. ]/g, "");
  } else if (/^\d+(?:\.\d{1,2})?$/.test(signed)) {
    normalized = signed;
  } else {
    return null;
  }

  const number = Number(normalized) * sign;
  return Number.isFinite(number) &&
    Math.abs(number) <= Number.MAX_SAFE_INTEGER / 100
    ? number
    : null;
}

export function roundCurrency(value: number): number {
  const absolute = Math.abs(value);
  const rounded =
    Math.round((absolute + Number.EPSILON * absolute) * 100) / 100;
  return rounded === 0 ? 0 : Math.sign(value) * rounded;
}

/** Round minimum/target prices upwards, without adding cents to exact cent values. */
export function ceilCurrency(value: number): number {
  const scaled = value * 100;
  return Math.ceil(scaled - Number.EPSILON * Math.abs(scaled) * 4) / 100;
}

export function calculateVat(net: number, vatPercent: number): VatAmounts {
  const roundedNet = roundCurrency(net);
  const vat = roundCurrency((roundedNet * vatPercent) / 100);
  return { net: roundedNet, vat, gross: roundCurrency(roundedNet + vat) };
}

function validateNonNegative(
  errors: Record<string, string>,
  key: string,
  value: number,
) {
  if (
    !Number.isFinite(value) ||
    value < 0 ||
    value > Number.MAX_SAFE_INTEGER / 100
  ) {
    errors[key] = "Geben Sie eine gültige Zahl ab 0 ein.";
  }
}

function validateMargin(errors: Record<string, string>, value: number) {
  if (!Number.isFinite(value) || value < 0 || value >= 100) {
    errors.marginPercent =
      "Die Zielmarge muss zwischen 0 und unter 100 % liegen.";
  }
}

function validateVat(errors: Record<string, string>, value: number) {
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    errors.vatPercent =
      "Geben Sie einen Umsatzsteuersatz zwischen 0 und 100 % ein.";
  }
}

function isSafeAmount(value: number): boolean {
  return (
    Number.isFinite(value) && Number.isSafeInteger(Math.round(value * 100))
  );
}

export function calculateHourlyRate(
  input: HourlyRateInput,
): CalculationResult<HourlyRateResult> {
  const errors: Record<string, string> = {};
  for (const key of [
    "annualPersonnelCosts",
    "annualOwnerCompensation",
    "annualOperatingCosts",
  ] as const) {
    validateNonNegative(errors, key, input[key]);
  }
  if (!Number.isFinite(input.billableHours) || input.billableHours <= 0) {
    errors.billableHours = "Geben Sie mehr als 0 verrechenbare Stunden ein.";
  }
  validateMargin(errors, input.marginPercent);
  validateVat(errors, input.vatPercent);
  if (Object.keys(errors).length) return { ok: false, errors };

  const annualCosts =
    input.annualPersonnelCosts +
    input.annualOwnerCompensation +
    input.annualOperatingCosts;
  if (annualCosts <= 0)
    return {
      ok: false,
      errors: {
        annualCosts: "Die Jahreskosten müssen zusammen größer als 0 sein.",
      },
    };

  // Annual personnel costs already include paid absences. Only divide by billable hours;
  // do not add a second hourly wage or an additional absence allowance.
  const costRate = annualCosts / input.billableHours;
  const netRate = ceilCurrency(costRate / (1 - input.marginPercent / 100));
  const amounts = calculateVat(netRate, input.vatPercent);
  if (
    ![annualCosts, costRate, amounts.gross].every(isSafeAmount) ||
    netRate <= 0
  ) {
    return {
      ok: false,
      errors: {
        calculation:
          "Die Werte sind für eine verlässliche Berechnung zu groß oder zu klein. Prüfen Sie Kosten, Stunden und Zielmarge.",
      },
    };
  }
  const profitPerHour = netRate - costRate;
  return {
    ok: true,
    value: {
      ...amounts,
      annualCosts,
      costRate,
      profitPerHour,
      marginPercent: (profitPerHour / netRate) * 100,
      markupPercent: (profitPerHour / costRate) * 100,
    },
  };
}

export function calculateOffer(
  input: OfferPricingInput,
): CalculationResult<OfferResult> {
  const errors: Record<string, string> = {};
  for (const key of [
    "materialCosts",
    "hours",
    "costRate",
    "additionalCosts",
  ] as const) {
    validateNonNegative(errors, key, input[key]);
  }
  validateVat(errors, input.vatPercent);
  if (input.mode === "target") validateMargin(errors, input.marginPercent);
  else if (!Number.isFinite(input.netPrice) || input.netPrice <= 0) {
    errors.netPrice = "Geben Sie einen Nettoangebotspreis größer als 0 ein.";
  }
  if (Object.keys(errors).length) return { ok: false, errors };

  const labourCosts = input.hours * input.costRate;
  const totalCosts = input.materialCosts + labourCosts + input.additionalCosts;
  if (totalCosts <= 0)
    return {
      ok: false,
      errors: {
        totalCosts: "Die Auftragskosten müssen zusammen größer als 0 sein.",
      },
    };
  const netPrice =
    input.mode === "target"
      ? ceilCurrency(totalCosts / (1 - input.marginPercent / 100))
      : roundCurrency(input.netPrice);
  const amounts = calculateVat(netPrice, input.vatPercent);
  if (
    ![labourCosts, totalCosts, amounts.gross].every(isSafeAmount) ||
    netPrice <= 0
  ) {
    return {
      ok: false,
      errors: {
        calculation:
          "Die Werte sind für eine verlässliche Berechnung zu groß oder zu klein. Prüfen Sie Kosten, Stunden und Preis.",
      },
    };
  }
  const profit = netPrice - totalCosts;
  return {
    ok: true,
    value: {
      ...amounts,
      labourCosts,
      totalCosts,
      profit,
      // Margin is a share of revenue. Markup is a share of costs.
      marginPercent: (profit / netPrice) * 100,
      markupPercent: (profit / totalCosts) * 100,
    },
  };
}

export const formatMoney = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundCurrency(value));

export const formatNumber = (value: number, decimals = 2) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);

export const formatPercent = (value: number) => `${formatNumber(value)} %`;
