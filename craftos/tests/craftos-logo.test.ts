import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CraftOSLogo } from "../components/CraftOSLogo";

// 10-UI-SPEC § 7.1 und § 7.4 (J11, K4): Logo-Schriftzug als ein Inline-SVG ohne Schriftklassen;
// sm und lg skalieren dasselbe SVG mit 16/18 bzw. 20/18 gegenüber md.

const render = (props: Parameters<typeof CraftOSLogo>[0] = {}) =>
  renderToStaticMarkup(createElement(CraftOSLogo, { variant: "full", ...props }));

function schriftzugMasse(html: string) {
  const svg = html.match(/<svg[^>]*data-logo-schriftzug[^>]*>/g) ?? [];
  expect(svg).toHaveLength(1);
  const tag = svg[0] ?? "";
  const width = Number(tag.match(/\swidth="([\d.]+)"/)?.[1]);
  const height = Number(tag.match(/\sheight="([\d.]+)"/)?.[1]);
  return { tag, width, height };
}

describe("CraftOSLogo (10-UI-SPEC § 7)", () => {
  it("rendert den Schriftzug als genau ein verstecktes, nicht fokussierbares SVG", () => {
    const html = render();
    const { tag, width, height } = schriftzugMasse(html);
    expect(tag).toContain('aria-hidden="true"');
    expect(tag).toContain('focusable="false"');
    expect(tag).toMatch(/viewBox="0 0 [\d.]+ [\d.]+"/);
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    expect((html.match(/data-logo-schriftzug/g) ?? []).length).toBe(1);
    // Zwei Pfade im Schriftzug: „CraftOS“ (currentColor) und „Handwerkersoftware“ (Literal aus text-zinc-400)
    const schriftzug = html.slice(html.indexOf(tag));
    const inhalt = schriftzug.slice(0, schriftzug.indexOf("</svg>"));
    expect((inhalt.match(/<path /g) ?? []).length).toBe(2);
    expect(inhalt).toContain('fill="currentColor"');
    // LO-05: sRGB-Wert statt lab(), damit Browser ohne lab()-Unterstützung die Unterzeile nicht mit fill="none" erben.
    expect(inhalt).not.toMatch(/lab\(|oklch\(/);
    expect(inhalt).toContain('fill="#9f9fa9"');
  });

  it("enthält keine Schriftklassen und keinen Text im Schriftzug", () => {
    for (const size of ["sm", "md", "lg"] as const) {
      const html = render({ size });
      expect(html).not.toMatch(/font-bold|font-medium/);
      expect(html).not.toContain(">CraftOS<");
      expect(html).not.toContain("Handwerkersoftware<");
    }
  });

  it("skaliert sm und lg gleichmäßig mit 16/18 bzw. 20/18 gegenüber md", () => {
    const md = schriftzugMasse(render({ size: "md" }));
    const sm = schriftzugMasse(render({ size: "sm" }));
    const lg = schriftzugMasse(render({ size: "lg" }));
    expect(Math.abs(sm.width / md.width - 16 / 18)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(sm.height / md.height - 16 / 18)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(lg.width / md.width - 20 / 18)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(lg.height / md.height - 20 / 18)).toBeLessThanOrEqual(0.01);
    // dieselbe viewBox in allen Größen
    const vb = (t: string) => t.match(/viewBox="([^"]+)"/)?.[1];
    expect(vb(sm.tag)).toBe(vb(md.tag));
    expect(vb(lg.tag)).toBe(vb(md.tag));
  });

  it("rendert in der Icon-Variante keinen Schriftzug", () => {
    expect(renderToStaticMarkup(createElement(CraftOSLogo, { variant: "icon" }))).not.toContain("data-logo-schriftzug");
  });
});
