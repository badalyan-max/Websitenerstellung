import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  NumberField,
  VatFields,
} from "../components/calculators/CalculatorFields";

describe("Rechner vor der Hydration", () => {
  it("verhindert frühe Zahleneingaben, die React noch nicht übernehmen kann", () => {
    const html = renderToString(
      createElement(NumberField, {
        label: "Materialkosten netto in Euro",
        value: "500",
        unit: "€",
        onChange: () => {},
      }),
    );
    const input = html.match(/<input\b[^>]*>/)?.[0];
    expect(input).toBeDefined();
    expect(input).toContain('disabled=""');
    expect(input).toContain('value="500"');
  });

  it("verhindert frühes Umschalten der Umsatzsteuer vor den React-Handlern", () => {
    const html = renderToString(
      createElement(VatFields, {
        enabled: false,
        setEnabled: () => {},
        value: "",
        setValue: () => {},
      }),
    );
    const input = html.match(/<input\b[^>]*>/)?.[0];
    expect(input).toBeDefined();
    expect(input).toContain('type="checkbox"');
    expect(input).toContain('disabled=""');
    expect(input).not.toContain('checked=""');
  });
});
