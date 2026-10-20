import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Ruler } from "lucide-react";
import { ComparisonTable, type ComparisonTableProps } from "@/components/v2/ComparisonTable";
import { LicenseBadge, PlatformBadge } from "@/components/v2/Badges";
import { FeatureCard, type FeatureCardProps } from "@/components/v2/FeatureCard";
import { IllustrationLabel } from "@/components/v2/IllustrationLabel";
import { MediaFigure } from "@/components/v2/MediaFigure";

/**
 * Testattrappe: eine Funktion mit tier "launch", die es nur in diesem Test gibt. Echte Slugs aus
 * lib/funktionen.ts werden nie als Fehlerfall verwendet, weil sich ihr tier mit dem Produktstand ändert.
 */
vi.mock("@/lib/funktionen", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/funktionen")>();
  return {
    ...original,
    funktionen: [
      ...original.funktionen,
      { ...original.funktionen[0], slug: "test-nicht-live", name: "Testattrappe", tier: "launch" as const },
    ],
  };
});

/** Inhalte dürfen nie auf eine Einblendung warten (DESIGN-04, T-05-15b). */
function expectStatic(html: string, name: string) {
  expect(html, name).not.toMatch(/opacity:\s*0(?![.\d])/);
  expect(html, name).not.toMatch(/visibility:\s*hidden/);
  expect(html, name).not.toContain("data-cursor-target");
}

function count(html: string, pattern: RegExp) {
  return html.match(pattern)?.length ?? 0;
}

const tabelle: ComparisonTableProps = {
  caption: "Voll-Lizenz und App-Lizenz im Vergleich",
  columns: [
    { key: "voll", label: "Voll-Lizenz", highlight: true },
    { key: "app", label: "App-Lizenz" },
  ],
  rows: [
    { label: "Web-App", cells: { voll: true, app: false } },
    { label: "Mobile-App", cells: { voll: true, app: true } },
    { label: "Angebote und Rechnungen", cells: { voll: true, app: "teilweise" } },
    { label: "Preis pro Monat", cells: { voll: "29,95 €", app: "9,95 €" } },
  ],
  note: "Preise netto zzgl. USt. Quelle: Preisliste CraftOS, Stand 20.10.2026.",
};

const aufmass: FeatureCardProps = {
  slug: "aufmass",
  name: "Aufmaß",
  icon: Ruler,
  benefit: "Räume vor Ort messen und geprüfte Mengen direkt ins Angebot übernehmen.",
  platforms: ["web", "mobile"],
  href: "/funktionen/aufmass",
};

describe("ComparisonTable", () => {
  it("rendert eine echte Tabelle mit caption, Spalten- und Zeilenköpfen und Screenreadertexten", () => {
    const html = renderToString(createElement(ComparisonTable, tabelle));
    expect(count(html, /<table\b/g)).toBe(1);
    expect(html).toMatch(/<caption\b[^>]*>[^<]*Voll-Lizenz und App-Lizenz im Vergleich/);
    expect(count(html, /<th\b[^>]*scope="col"/g)).toBe(3);
    expect(count(html, /<th\b[^>]*scope="row"/g)).toBe(4);
    expect(html).toMatch(/<span class="sr-only">Ja<\/span>/);
    expect(html).toMatch(/<span class="sr-only">Nein<\/span>/);
    expect(html).toContain("Teilweise");
    expect(html).toContain("29,95 €");
    expect(html).toContain(tabelle.note);
    expect(html).toContain("Zum Vergleichen seitlich wischen");

    const region = html.match(/<div\b[^>]*role="region"[^>]*>/)?.[0];
    expect(region).toBeDefined();
    expect(region).toContain(`aria-label="${tabelle.caption}"`);
    expect(region).toContain('tabindex="0"');
    expect(html).not.toContain(" · ");
  });

  it("wirft bei mehr als 4 Wertspalten oder mehr als 12 Zeilen", () => {
    const spalten = Array.from({ length: 5 }, (_, i) => ({ key: `k${i}`, label: `Spalte ${i}` }));
    expect(() => renderToString(createElement(ComparisonTable, { ...tabelle, columns: spalten }))).toThrow(
      "ComparisonTable: höchstens 4 Wertspalten erlaubt",
    );
    const zeilen = Array.from({ length: 13 }, (_, i) => ({ label: `Zeile ${i}`, cells: { voll: true, app: true } }));
    expect(() => renderToString(createElement(ComparisonTable, { ...tabelle, rows: zeilen }))).toThrow(
      "ComparisonTable: höchstens 12 Zeilen erlaubt",
    );
  });
});

describe("Badges", () => {
  it("rendert Plattform- und Lizenztexte wörtlich", () => {
    expect(renderToString(createElement(PlatformBadge, { platform: "web" }))).toContain("Web-App");
    expect(renderToString(createElement(PlatformBadge, { platform: "mobile" }))).toContain("Mobile-App");
    expect(renderToString(createElement(LicenseBadge, { license: "voll" }))).toContain("Voll-Lizenz");
    expect(renderToString(createElement(LicenseBadge, { license: "app" }))).toContain("App-Lizenz");
  });
});

describe("FeatureCard", () => {
  it("verweigert einen unbekannten Slug mit dem Fehlertext aus dem UI-SPEC", () => {
    expect(() => renderToString(createElement(FeatureCard, { ...aufmass, slug: "gibt-es-nicht" }))).toThrow(
      "FeatureCard: gibt-es-nicht ist keine Live-Funktion – nur tier heute zulässig.",
    );
  });

  it("verweigert eine Funktion mit tier ungleich heute (Testattrappe)", () => {
    expect(() =>
      renderToString(createElement(FeatureCard, { ...aufmass, slug: "test-nicht-live", name: "Testattrappe" })),
    ).toThrow("FeatureCard: test-nicht-live ist keine Live-Funktion – nur tier heute zulässig.");
  });

  it("rendert für Aufmaß h3, Badges und den Linktext „Mehr zu Aufmaß“ ohne Pfeilglyphe", () => {
    const html = renderToString(createElement(FeatureCard, aufmass));
    expect(html).toMatch(/<h3\b[^>]*>[^<]*Aufmaß/);
    expect(html).toContain("Mehr zu Aufmaß");
    expect(html).toContain('href="/funktionen/aufmass"');
    expect(html).toContain("Web-App");
    expect(html).toContain("Mobile-App");
    expect(html).not.toMatch(/[→↗›»]/);
  });
});

describe("IllustrationLabel", () => {
  it("rendert die Kennzeichnungen wörtlich", () => {
    expect(renderToString(createElement(IllustrationLabel, { kind: "vereinfacht" }))).toContain(
      "Vereinfachte Darstellung mit Beispieldaten",
    );
    expect(renderToString(createElement(IllustrationLabel, { kind: "ki" }))).toContain("Darstellung, KI-gestaltet");
  });
});

describe("MediaFigure", () => {
  const bild = {
    src: "/images/werkstatt-2026.webp",
    alt: "Tischlerin prüft ein Eichenbrett an einer Werkbank bei Tageslicht",
    width: 1536,
    height: 1024,
    sizes: "(max-width: 767px) 100vw, 50vw",
  };

  it("rendert figure mit img samt width und height", () => {
    const html = renderToString(createElement(MediaFigure, bild));
    expect(count(html, /<figure\b/g)).toBe(1);
    const img = html.match(/<img\b[^>]*>/)?.[0];
    expect(img).toBeDefined();
    expect(img).toContain('width="1536"');
    expect(img).toContain('height="1024"');
    expect(img).toContain(`alt="${bild.alt}"`);
    expect(html).not.toContain("KI-gestaltet");
  });

  it("fügt bei label ki die Kennzeichnung in die figcaption ein", () => {
    const html = renderToString(createElement(MediaFigure, { ...bild, label: "ki", caption: "Werkstatt am Morgen" }));
    const caption = html.match(/<figcaption\b[\s\S]*<\/figcaption>/)?.[0];
    expect(caption).toBeDefined();
    expect(caption).toContain("Darstellung, KI-gestaltet");
    expect(caption).toContain("Werkstatt am Morgen");
  });
});
