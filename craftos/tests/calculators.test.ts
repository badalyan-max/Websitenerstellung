import { describe, expect, it } from "vitest";
import {
  calculateHourlyRate,
  calculateOffer,
  calculateVat,
  ceilCurrency,
  parseDecimalInput,
  roundCurrency,
  type HourlyRateInput,
} from "../lib/calculators";

const hourly: HourlyRateInput = {
  annualPersonnelCosts: 60_000,
  annualOwnerCompensation: 48_000,
  annualOperatingCosts: 36_000,
  billableHours: 2_400,
  marginPercent: 20,
  vatPercent: 0,
};

const offer = {
  materialCosts: 500,
  hours: 10,
  costRate: 60,
  additionalCosts: 100,
  vatPercent: 0,
};

describe("German number entry", () => {
  it.each([
    ["1.234,56", 1234.56],
    ["1 234,56", 1234.56],
    ["1\u202f234,56", 1234.56],
    ["1234.56", 1234.56],
    ["1.234", 1234],
    ["60,00", 60],
    [" 0 ", 0],
    ["-2,50", -2.5],
  ])("parses %s without silently dropping characters", (input, expected) => {
    expect(parseDecimalInput(input)).toBe(expected);
  });

  it.each([
    "",
    " ",
    "12,",
    "1.2.3",
    "12,345",
    "1 2",
    "1e3",
    "12abc",
    "Infinity",
    "NaN",
    "1,234.56",
  ])("rejects %s", (input) => {
    expect(parseDecimalInput(input)).toBeNull();
  });
});

describe("hourly rate", () => {
  it("spreads annual costs over billable hours and calculates a revenue margin", () => {
    const result = calculateHourlyRate(hourly);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toMatchObject({
      annualCosts: 144_000,
      costRate: 60,
      net: 75,
      profitPerHour: 15,
      marginPercent: 20,
      markupPercent: 25,
    });
  });

  it("does not count owner compensation twice when it is already included as salary", () => {
    const result = calculateHourlyRate({
      ...hourly,
      annualPersonnelCosts: 108_000,
      annualOwnerCompensation: 0,
    });
    expect(result).toEqual(calculateHourlyRate(hourly));
  });

  it("covers a solo business without employed staff and zero target margin", () => {
    const result = calculateHourlyRate({
      ...hourly,
      annualPersonnelCosts: 0,
      annualOwnerCompensation: 48_000,
      annualOperatingCosts: 24_000,
      billableHours: 1200,
      marginPercent: 0,
    });
    expect(result.ok && result.value.net).toBe(60);
    expect(result.ok && result.value.profitPerHour).toBe(0);
  });

  it.each([
    { billableHours: 0 },
    { billableHours: -1 },
    { annualOperatingCosts: -1 },
    { marginPercent: 100 },
    { marginPercent: NaN },
    { vatPercent: -1 },
    { annualPersonnelCosts: Infinity },
  ])("rejects invalid data %j", (invalid) => {
    expect(calculateHourlyRate({ ...hourly, ...invalid }).ok).toBe(false);
  });

  it("rejects all-zero annual costs and non-finite arithmetic", () => {
    expect(
      calculateHourlyRate({
        ...hourly,
        annualPersonnelCosts: 0,
        annualOwnerCompensation: 0,
        annualOperatingCosts: 0,
      }).ok,
    ).toBe(false);
    expect(
      calculateHourlyRate({ ...hourly, billableHours: Number.MIN_VALUE }).ok,
    ).toBe(false);
  });
});

describe("offer and margin", () => {
  it("keeps 20% revenue margin distinct from 25% cost markup and adds VAT afterwards", () => {
    const result = calculateOffer({
      ...offer,
      mode: "target",
      marginPercent: 20,
      vatPercent: 19,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toMatchObject({
      totalCosts: 1200,
      labourCosts: 600,
      net: 1500,
      profit: 300,
      marginPercent: 20,
      markupPercent: 25,
      vat: 285,
      gross: 1785,
    });
  });

  it("shows a loss instead of hiding or clamping negative margins", () => {
    const result = calculateOffer({ ...offer, mode: "check", netPrice: 1000 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.profit).toBe(-200);
    expect(result.value.marginPercent).toBe(-20);
    expect(result.value.markupPercent).toBeCloseTo(-16.6666667);
  });

  it("identifies a 20% markup as a 16.67% revenue margin", () => {
    const result = calculateOffer({ ...offer, mode: "check", netPrice: 1440 });
    expect(result.ok && result.value.markupPercent).toBe(20);
    expect(result.ok && result.value.marginPercent).toBeCloseTo(16.6666667);
  });

  it("rounds a target upwards to cents without undershooting its margin", () => {
    const result = calculateOffer({
      ...offer,
      materialCosts: 100,
      hours: 0,
      additionalCosts: 0,
      mode: "target",
      marginPercent: 30,
    });
    expect(result.ok && result.value.net).toBe(142.86);
    if (result.ok)
      expect(result.value.marginPercent).toBeGreaterThanOrEqual(30);
  });

  it("keeps VAT independent of net price, profit and margin", () => {
    const withoutVat = calculateOffer({
      ...offer,
      mode: "target",
      marginPercent: 20,
    });
    const withVat = calculateOffer({
      ...offer,
      mode: "target",
      marginPercent: 20,
      vatPercent: 7,
    });
    expect(withoutVat.ok && withoutVat.value.net).toBe(
      withVat.ok && withVat.value.net,
    );
    expect(withoutVat.ok && withoutVat.value.marginPercent).toBe(
      withVat.ok && withVat.value.marginPercent,
    );
    expect(withVat.ok && withVat.value.gross).toBe(1605);
  });

  it.each([
    { netPrice: 0 },
    { netPrice: -100 },
    { hours: -2 },
    { costRate: Infinity },
    { vatPercent: 101 },
  ])("rejects invalid check data %j", (invalid) => {
    expect(
      calculateOffer({ ...offer, mode: "check", netPrice: 1500, ...invalid })
        .ok,
    ).toBe(false);
  });

  it("rejects zero cost totals, impossible margins and overflowing products", () => {
    expect(
      calculateOffer({
        ...offer,
        materialCosts: 0,
        hours: 0,
        additionalCosts: 0,
        mode: "target",
        marginPercent: 20,
      }).ok,
    ).toBe(false);
    expect(
      calculateOffer({ ...offer, mode: "target", marginPercent: 100 }).ok,
    ).toBe(false);
    expect(
      calculateOffer({
        ...offer,
        hours: 1e12,
        costRate: 1e12,
        mode: "target",
        marginPercent: 20,
      }).ok,
    ).toBe(false);
  });
});

describe("money rounding", () => {
  it("rounds commercial half-cent values and avoids binary floating point cent errors", () => {
    expect(roundCurrency(1.005)).toBe(1.01);
    expect(roundCurrency(-1.005)).toBe(-1.01);
    expect(ceilCurrency(0.1 + 0.2)).toBe(0.3);
    expect(ceilCurrency(60)).toBe(60);
  });

  it("computes VAT from the displayed net amount and keeps the displayed totals consistent", () => {
    expect(calculateVat(142.86, 19)).toEqual({
      net: 142.86,
      vat: 27.14,
      gross: 170,
    });
  });
});
