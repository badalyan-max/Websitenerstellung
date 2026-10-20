import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CtaBand } from "@/components/v2/CtaBand";
import { KeyFacts, type KeyFact } from "@/components/v2/KeyFacts";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { site } from "@/lib/site";

/** Inhalte dürfen nie auf eine Einblendung warten (DESIGN-04, T-05-15). */
function expectStatic(html: string, name: string) {
  expect(html, name).not.toMatch(/opacity:\s*0(?![.\d])/);
  expect(html, name).not.toMatch(/visibility:\s*hidden/);
  expect(html, name).not.toContain("data-cursor-target");
}

function count(html: string, pattern: RegExp) {
  return html.match(pattern)?.length ?? 0;
}

const facts: KeyFact[] = [
  { value: "10 Tage", label: "kostenlos testen", source: "site.trialDays" },
  { value: "29,95 €", label: "Voll-Lizenz pro Monat", source: "tarife.voll.monat" },
  { value: "9,95 €", label: "App-Lizenz pro Monat", source: "tarife.app.monat" },
  { value: "21", label: "Sprachen in der Mobile-App", source: "product-register: mobile i18n" },
];
const note = "Preise netto zzgl. USt. Stand: 20.10.2026.";

describe("SectionHeader", () => {
  it("rendert genau eine h2 mit optionaler Eyebrow und dem Lead als Absatz", () => {
    const html = renderToString(
      createElement(SectionHeader, {
        eyebrow: "Angebot",
        title: "Vom Aufmaß zum unterschriebenen Angebot",
        lead: "Maße auf der Baustelle erfassen, im Büro ins Angebot übernehmen und online unterschreiben lassen.",
      }),
    );
    expect(count(html, /<h2\b/g)).toBe(1);
    expect(count(html, /<h1\b/g)).toBe(0);
    expect(html).toContain("v2-eyebrow");
    expect(html).toMatch(/<p\b[^>]*>Maße auf der Baustelle/);

    const ohneEyebrow = renderToString(
      createElement(SectionHeader, { title: "Zeiterfassung", lead: "Zeiten direkt auf der Baustelle buchen." }),
    );
    expect(ohneEyebrow).not.toContain("v2-eyebrow");
    expect(count(ohneEyebrow, /<h2\b/g)).toBe(1);
  });

  it("rendert mit as=h1 genau eine h1 und keine h2 (nur Musterseite)", () => {
    const html = renderToString(
      createElement(SectionHeader, { as: "h1", title: "Designbausteine v2", lead: "Interne Musterseite." }),
    );
    expect(count(html, /<h1\b/g)).toBe(1);
    expect(count(html, /<h2\b/g)).toBe(0);
  });

  it("verweigert Titel über dem Textbudget", () => {
    expect(() =>
      renderToString(createElement(SectionHeader, { title: "x".repeat(61), lead: "Ein Satz." })),
    ).toThrow("Textbudget überschritten: sectionHeader.title hat 61 von 60 Zeichen – Satz kürzen.");
  });
});

describe("KeyFacts", () => {
  it("rendert dl mit dt/dd, data-source je Wert und den Pflichthinweis", () => {
    const html = renderToString(createElement(KeyFacts, { facts, note }));
    expect(count(html, /<dl\b/g)).toBe(1);
    expect(count(html, /<dt\b/g)).toBe(4);
    expect(count(html, /<dd\b/g)).toBe(4);
    for (const fact of facts) {
      expect(html, fact.source).toContain(`data-source="${fact.source}"`);
    }
    expect(html).toContain(note);
  });

  it("wirft bei leerer Quelle den Fehlertext aus dem UI-SPEC", () => {
    const ohneQuelle = [...facts.slice(0, 3), { value: "21", label: "Sprachen", source: " " }];
    expect(() => renderToString(createElement(KeyFacts, { facts: ohneQuelle, note }))).toThrow(
      "KeyFacts: Wert ‚21‘ ohne Quelle – source aus site.ts, tarife oder Produktregister angeben.",
    );
  });

  it("wirft bei 2 und bei 5 Fakten", () => {
    expect(() => renderToString(createElement(KeyFacts, { facts: facts.slice(0, 2), note }))).toThrow(
      "KeyFacts: mindestens 3 Fakten erforderlich – Inhalte in lib/… ergänzen.",
    );
    const fuenf = [...facts, { value: "50 GB", label: "Speicher", source: "tarife.speicher" }];
    expect(() => renderToString(createElement(KeyFacts, { facts: fuenf, note }))).toThrow(
      "KeyFacts: höchstens 4 Fakten erlaubt – Inhalte in lib/… kürzen.",
    );
  });
});

describe("CtaBand", () => {
  it("verlinkt site.ctaUrl mit v2-btn-cta und den Sekundärlink auf /preise", () => {
    const html = renderToString(
      createElement(CtaBand, {
        title: "Machen Sie Platz für Ihr Handwerk.",
        text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
      }),
    );
    const primary = html.match(/<a\b[^>]*class="[^"]*v2-btn-cta[^"]*"[^>]*>[\s\S]*?<\/a>/)?.[0];
    expect(primary).toBeDefined();
    expect(primary).toContain(`href="${site.ctaUrl}"`);
    expect(primary).toContain("10 Tage kostenlos testen");
    expect(html).not.toMatch(/class="[^"]*\bbtn-cta\b/);
    const secondary = html.match(/<a\b[^>]*href="\/preise"[^>]*>([\s\S]*?)<\/a>/);
    expect(secondary?.[1]).toBe("Preise ansehen");
    expect(count(html, /<h2\b/g)).toBe(1);
  });
});

describe("Bewegungsfreiheit Teil A (DESIGN-04)", () => {
  it("kein Markup von SectionHeader, KeyFacts und CtaBand startet unsichtbar", () => {
    expectStatic(
      renderToString(createElement(SectionHeader, { title: "Zeiterfassung", lead: "Zeiten buchen.", tone: "dark" })),
      "SectionHeader",
    );
    expectStatic(renderToString(createElement(KeyFacts, { facts, note, tone: "dark" })), "KeyFacts");
    expectStatic(
      renderToString(createElement(CtaBand, { title: "Machen Sie Platz für Ihr Handwerk.", text: "Ohne Zahlungsdaten." })),
      "CtaBand",
    );
  });
});
