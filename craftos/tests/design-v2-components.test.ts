import { createElement, type FunctionComponent } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FileCheck2, ScanLine } from "lucide-react";
import { BentoGrid, BentoTile, TileIcon, type BentoGridProps, type BentoTileProps } from "@/components/v2/BentoGrid";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { StepFlow, type Step } from "@/components/v2/StepFlow";
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
    expect(html, "Altklasse .btn-cta").not.toMatch(/class="(?:[^"]*\s)?btn-cta[\s"]/);
    const secondary = html.match(/<a\b[^>]*href="\/preise"[^>]*>([\s\S]*?)<\/a>/);
    expect(secondary?.[1]).toBe("Preise ansehen");
    expect(count(html, /<h2\b/g)).toBe(1);
  });

  it("aria-labelledby zeigt auch bei zwei Instanzen auf den jeweils eigenen Titel (eindeutige IDs)", () => {
    const props = { title: "Machen Sie Platz für Ihr Handwerk.", text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test." };
    const html = renderToString(createElement("div", null, createElement(CtaBand, props), createElement(CtaBand, props)));
    const labelled = [...html.matchAll(/aria-labelledby="([^"]+)"/g)].map((m) => m[1]);
    const ids = [...html.matchAll(/<h2\b[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
    expect(labelled).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
    expect(labelled).toEqual(ids);
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

/** Kinder als createElement-Argumente (react/no-children-prop); Mengenprüfung erfolgt zur Laufzeit. */
const Grid = BentoGrid as FunctionComponent<Omit<BentoGridProps, "children">>;

const sizes: BentoTileProps["size"][] =["lg", "sm", "sm", "md", "wide", "sm", "md", "sm"];
function tiles(n: number) {
  return Array.from({ length: n }, (_, i) =>
    createElement(BentoTile, {
      key: i,
      size: sizes[i],
      surface: i === 0 ? "dark" : "warm",
      title: `Kachel ${i + 1}`,
      text: "Ein Satz Nutzen.",
      visual: createElement(TileIcon, { icon: i % 2 ? FileCheck2 : ScanLine }),
      href: i === 1 ? "/funktionen/e-rechnung" : undefined,
    }),
  );
}
function grid(n: number) {
  return renderToString(createElement(Grid, { label: "Kernfunktionen" }, ...tiles(n)));
}

const steps: Step[] = [
  { title: "Angebot", text: "Aufmaß übernehmen und Angebot schreiben." },
  { title: "Planung", text: "Einsätze auf der Plantafel verteilen." },
  { title: "Baustelle", text: "Zeiten und Fotos direkt vor Ort erfassen." },
  { title: "Rechnung", text: "Rechnung aus dem Angebot erzeugen." },
  { title: "Buchhaltung", text: "Belege und Zahlungen abgleichen." },
  { title: "Team", text: "Urlaub und Abwesenheiten planen." },
  { title: "Archiv", text: "Unterlagen ablegen." },
];

const faqs = [
  { q: "Brauche ich für den Test eine Zahlungsmethode?", a: "Nein. Sie testen CraftOS 10 Tage kostenlos." },
  { q: "Was kostet die App-Lizenz?", a: "Die App-Lizenz kostet 9,95 € netto im Monat." },
  { q: "Wie werden KI-Funktionen abgerechnet?", a: "Über im Voraus gekaufte Credits." },
  { q: "Läuft CraftOS auf dem Smartphone?", a: "Ja, über die Mobile-App." },
  { q: "Gibt es eine Web-App?", a: "Ja." },
  { q: "Kann ich kündigen?", a: "Ja." },
  { q: "Gibt es E-Rechnungen?", a: "Ja." },
  { q: "Gibt es eine Plantafel?", a: "Ja." },
  { q: "Gibt es Aufmaß?", a: "Ja." },
];

describe("BentoGrid", () => {
  it("rendert ul role=list mit li > article > h3 je Kachel", () => {
    const html = grid(5);
    expect(html).toMatch(/<ul\b[^>]*role="list"[^>]*aria-label="Kernfunktionen"/);
    expect(count(html, /<li\b[^>]*>\s*<article\b/g)).toBe(5);
    expect(count(html, /<h3\b/g)).toBe(5);
    expect(html).toMatch(/<h3\b[^>]*><a\b[^>]*href="\/funktionen\/e-rechnung"/);
  });

  it("wirft bei 2 und bei 8 Kacheln den Fehlertext", () => {
    expect(() => grid(2)).toThrow("BentoGrid: mindestens 3 Kacheln erforderlich – Inhalte in lib/… ergänzen.");
    expect(() => grid(8)).toThrow("BentoGrid: höchstens 7 Kacheln erlaubt – Inhalte in lib/… kürzen.");
  });

  it("verweigert gleichförmige Raster und mehr als eine dunkle Kachel", () => {
    const gleich = ["a", "b", "c"].map((t) =>
      createElement(BentoTile, { key: t, size: "sm", title: t, text: "Satz.", visual: createElement(TileIcon, { icon: ScanLine }) }),
    );
    expect(() => renderToString(createElement(Grid, null, ...gleich))).toThrow(
      "BentoGrid: mindestens zwei verschiedene Kachelgrößen erforderlich – size variieren.",
    );
    const dunkel = (["lg", "sm", "md"] as const).map((size) =>
      createElement(BentoTile, { key: size, size, surface: "dark", title: size, text: "Satz.", visual: createElement(TileIcon, { icon: ScanLine }) }),
    );
    expect(() => renderToString(createElement(Grid, null, ...dunkel))).toThrow(
      "BentoGrid: höchstens 1 dunkle Kachel je Raster erlaubt – surface anpassen.",
    );
  });

  it("schließt Kacheln ohne visual per Typ aus", () => {
    const props = { size: "sm", title: "Nur Text", text: "Reine Textkacheln sind unzulässig." } as const;
    // @ts-expect-error visual ist Pflicht – reine Textkacheln sind unzulässig
    const ohneVisual: BentoTileProps = props;
    expect(ohneVisual.title).toBe("Nur Text");
  });
});

describe("StepFlow", () => {
  it("rendert ol mit 3–6 li und aria-hidden-Knoten", () => {
    for (const n of [3, 6]) {
      const html = renderToString(createElement(StepFlow, { steps: steps.slice(0, n), label: "Arbeitsablauf" }));
      expect(count(html, /<ol\b/g)).toBe(1);
      expect(html).toMatch(/<ol\b[^>]*aria-label="Arbeitsablauf"/);
      expect(count(html, /<li\b/g)).toBe(n);
      expect(count(html, /<h3\b/g)).toBe(n);
      expect(count(html, /aria-hidden="true"[^>]*>\d<\/span>/g)).toBe(n);
    }
  });

  it("wirft außerhalb von 3–6 Schritten", () => {
    expect(() => renderToString(createElement(StepFlow, { steps: steps.slice(0, 2), label: "Ablauf" }))).toThrow(
      "StepFlow: mindestens 3 Schritte erforderlich – Inhalte in lib/… ergänzen.",
    );
    expect(() => renderToString(createElement(StepFlow, { steps, label: "Ablauf" }))).toThrow(
      "StepFlow: höchstens 6 Schritte erlaubt – Inhalte in lib/… kürzen.",
    );
  });
});

describe("FaqList", () => {
  it("rendert details/summary für 3–8 Fragen", () => {
    const html = renderToString(createElement(FaqList, { items: faqs.slice(0, 3) }));
    expect(count(html, /<details\b/g)).toBe(3);
    expect(count(html, /<summary\b/g)).toBe(3);
    expect(html).toContain("Brauche ich für den Test eine Zahlungsmethode?");
    const mitH3 = renderToString(createElement(FaqList, { items: faqs.slice(0, 3), headingLevel: 3 }));
    expect(count(mitH3, /<summary\b[^>]*>[\s\S]*?<h3\b/g)).toBe(3);
    expect(() => renderToString(createElement(FaqList, { items: faqs.slice(0, 2) }))).toThrow(
      "FaqList: mindestens 3 Fragen erforderlich – Inhalte in lib/… ergänzen.",
    );
    expect(() => renderToString(createElement(FaqList, { items: faqs }))).toThrow(
      "FaqList: höchstens 8 Fragen erlaubt – Inhalte in lib/… kürzen.",
    );
  });

  it("verlangt, dass jede Frage mit „?“ endet", () => {
    const ohneFrage = [...faqs.slice(0, 2), { q: "Preise und Lizenzen", a: "Siehe Preisseite." }];
    expect(() => renderToString(createElement(FaqList, { items: ohneFrage }))).toThrow(
      "FaqList: Frage ‚Preise und Lizenzen‘ endet nicht mit „?“ – als direkte Frage formulieren.",
    );
  });
});

describe("Bewegungsfreiheit Teil A, Raster und Listen (DESIGN-04)", () => {
  it("kein Markup von BentoGrid, StepFlow und FaqList startet unsichtbar", () => {
    expectStatic(grid(5), "BentoGrid");
    expectStatic(
      renderToString(createElement(StepFlow, { steps: steps.slice(0, 4), label: "Ablauf", tone: "amber" })),
      "StepFlow",
    );
    expectStatic(renderToString(createElement(FaqList, { items: faqs.slice(0, 3) })), "FaqList");
  });
});
