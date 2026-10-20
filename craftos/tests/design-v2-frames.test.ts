import { createElement, type FunctionComponent } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Receipt, Ruler } from "lucide-react";
import { ComparisonTable, type ComparisonTableProps } from "@/components/v2/ComparisonTable";
import { LicenseBadge, PlatformBadge } from "@/components/v2/Badges";
import { FeatureCard, type FeatureCardProps } from "@/components/v2/FeatureCard";
import { IllustrationLabel } from "@/components/v2/IllustrationLabel";
import { MediaFigure } from "@/components/v2/MediaFigure";
import { BrowserFrame, type BrowserFrameProps } from "@/components/v2/BrowserFrame";
import { PhoneFrame, type PhoneFrameProps } from "@/components/v2/PhoneFrame";
import { DevicePair } from "@/components/v2/DevicePair";
import {
  MiniList,
  MiniRow,
  MiniStat,
  MiniStatus,
  MiniTimer,
  MiniWeek,
  type MiniListProps,
} from "@/components/v2/mini/MiniUi";
import { MINI_BUDGET } from "@/components/v2/mini/limits";
import { PhoneFrame as BestandPhoneFrame } from "@/components/feature-snippet/DeviceFrame";

/** Kinder als createElement-Argumente: typisierte Hüllen (react/no-children-prop, siehe 05-04). */
const Phone = PhoneFrame as FunctionComponent<Omit<PhoneFrameProps, "children">>;
const Browser = BrowserFrame as FunctionComponent<Omit<BrowserFrameProps, "children">>;
const List = MiniList as FunctionComponent<Omit<MiniListProps, "children">>;
const BestandPhone = BestandPhoneFrame as FunctionComponent<{ title: string; active?: string }>;

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
    expectStatic(html, "ComparisonTable");
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
    expectStatic(html, "FeatureCard");
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

const KENNZEICHNUNG = "Vereinfachte Darstellung mit Beispieldaten";

function zeitenAnsicht() {
  return createElement(
    List,
    null,
    createElement(MiniRow, { key: "1", primary: "Bäckerei Krause", secondary: "Fliesen Bad", value: "07:30" }),
    createElement(MiniRow, { key: "2", primary: "Praxis Dr. Yilmaz", secondary: "Wand spachteln", value: "11:15" }),
  );
}

function plantafel() {
  return createElement(MiniWeek, {
    entries: [
      { day: 0, label: "Bäckerei Krause" },
      { day: 2, label: "Praxis Dr. Yilmaz", lane: 1 },
    ],
  });
}

const phoneProps = {
  title: "Zeiterfassung",
  evidence: "mobile:src/features/time-tracking/screens/TimeTrackingScreen.tsx",
  description: "Zeiterfassung in der Mobile-App mit zwei gebuchten Einsätzen des Tages.",
  activeTab: "Zeiten" as const,
};

const browserProps = {
  title: "Plantafel",
  evidence: "web:src/pages/Plantafel.tsx",
  description: "Plantafel der Web-App mit Einsätzen in der Wochenansicht.",
};

describe("PhoneFrame", () => {
  it("rendert figure mit Beleg, inerter Mini-UI, Tabs in Release-Reihenfolge und Kennzeichnung", () => {
    const html = renderToString(createElement(Phone, phoneProps, zeitenAnsicht()));
    const figure = html.match(/<figure\b[^>]*>/)?.[0];
    expect(figure).toBeDefined();
    expect(figure).toContain(`data-evidence="${phoneProps.evidence}"`);

    const wrapper = html.match(/<div\b[^>]*aria-hidden="true"[^>]*>/)?.[0];
    expect(wrapper).toBeDefined();
    expect(wrapper).toContain('inert=""');

    const tabs = [...html.matchAll(/data-tab="([^"]+)"/g)].map((m) => m[1]);
    expect(tabs).toEqual(["Einsätze", "Zeiten", "Projekte", "Mehr"]);
    expect(html).toMatch(/data-tab="Zeiten"[^>]*data-active="true"/);

    const caption = html.match(/<figcaption\b[\s\S]*<\/figcaption>/)?.[0];
    expect(caption).toBeDefined();
    expect(caption).toContain(`<span class="sr-only">${phoneProps.description}</span>`);
    expect(caption).toContain(KENNZEICHNUNG);
  });

  it("wirft ohne Beleg mit dem Fehlertext aus dem UI-SPEC", () => {
    expect(() => renderToString(createElement(Phone, { ...phoneProps, evidence: " " }, zeitenAnsicht()))).toThrow(
      "PhoneFrame: evidence fehlt – Belegpfad aus origin/release angeben.",
    );
  });
});

describe("BrowserFrame", () => {
  it("rendert CraftOSMark statt C-Platzhalter, Fensterleiste, Beleg und Kennzeichnung", () => {
    const html = renderToString(createElement(Browser, browserProps, plantafel()));
    expect(html).toMatch(/<figure\b[^>]*data-evidence="web:src\/pages\/Plantafel\.tsx"/);
    expect(html).toContain('aria-label="CraftOS"');
    expect(html).toMatch(/<svg\b[^>]*viewBox="0 0 1024 1024"/);
    expect(html).not.toMatch(/>C<\/span>/);
    expect(html).toContain("CraftOS Web-App");
    expect(html).toContain("Plantafel");
    expect(html).toMatch(/<div\b[^>]*aria-hidden="true"[^>]*inert=""/);
    expect(html).toContain(KENNZEICHNUNG);
  });

  it("wirft ohne Beleg mit dem Fehlertext aus dem UI-SPEC", () => {
    expect(() => renderToString(createElement(Browser, { ...browserProps, evidence: "" }, plantafel()))).toThrow(
      "BrowserFrame: evidence fehlt – Belegpfad aus origin/release angeben.",
    );
  });
});

describe("DevicePair", () => {
  it("rendert beide Geräte mit Belegen und genau eine Kennzeichnung, statisch", () => {
    const html = renderToString(
      createElement(DevicePair, {
        description: "Plantafel im Büro und Zeiterfassung auf der Baustelle mit denselben Einsätzen.",
        browser: { title: browserProps.title, evidence: browserProps.evidence, children: plantafel() },
        phone: {
          title: phoneProps.title,
          evidence: phoneProps.evidence,
          activeTab: "Zeiten",
          children: zeitenAnsicht(),
        },
      }),
    );
    expect(count(html, /<figure\b/g)).toBe(1);
    expect(count(html, new RegExp(KENNZEICHNUNG, "g"))).toBe(1);
    expect(html).toContain(`data-evidence="${browserProps.evidence}"`);
    expect(html).toContain(`data-evidence="${phoneProps.evidence}"`);
    expectStatic(html, "DevicePair");
  });
});

describe("Bestand DeviceFrame", () => {
  it("zeigt den Tab „Zeiten“ und nicht mehr „Zeit“", () => {
    const html = renderToString(createElement(BestandPhone, { title: "Zeiterfassung", active: "Zeiten" }));
    expect(html).toContain("<small>Zeiten</small>");
    expect(html).not.toContain("<small>Zeit</small>");
  });
});

describe("Mini-UI", () => {
  it("hält das Budget von 24 Zeichen je Zeile und 5 Zeilen je Liste", () => {
    expect(MINI_BUDGET).toEqual({ row: 24, rows: 5 });
    const lang = "Bäckerei Krause, Filiale Nord";
    expect(() => renderToString(createElement(MiniRow, { primary: lang }))).toThrow(
      `Textbudget überschritten: mini.row hat ${Array.from(lang).length} von 24 Zeichen – Satz kürzen.`,
    );
    expect(() => renderToString(createElement(MiniStat, { label: "Offene Rechnungen", value: "x".repeat(25) }))).toThrow(
      "Textbudget überschritten: mini.row hat 25 von 24 Zeichen – Satz kürzen.",
    );
    const sechs = Array.from({ length: MINI_BUDGET.rows + 1 }, (_, i) =>
      createElement(MiniRow, { key: String(i), primary: `Einsatz ${i + 1}` }),
    );
    expect(() => renderToString(createElement(List, null, ...sechs))).toThrow("MiniList: höchstens 5 Zeilen erlaubt");
  });

  it("rendert Statusnamen, Kennzahl, Wochenraster und Timer ohne fokussierbare Elemente", () => {
    const html = renderToString(
      createElement(
        List,
        null,
        createElement(MiniRow, {
          key: "r",
          icon: Receipt,
          primary: "RE-2026-114",
          secondary: "Bäckerei Krause",
          status: createElement(MiniStatus, { status: "Bezahlt" }),
        }),
      ),
    );
    expect(html).toContain("Bezahlt");
    const extra = [
      renderToString(createElement(MiniStat, { label: "Heute gebucht", value: "6:45 h" })),
      renderToString(plantafel()),
      renderToString(createElement(MiniTimer, { label: "Bäckerei Krause", value: "02:14:09" })),
    ].join("");
    expect(extra).toContain("02:14:09");
    for (const markup of [html, extra]) {
      expect(markup).not.toMatch(/<(a|button|input|select|textarea)\b/);
      expect(markup).not.toMatch(/tabindex="[0-9]/);
    }
  });
});

describe("Keine Einblendungen", () => {
  it("kein Rahmen und kein Inhaltsbaustein startet unsichtbar oder mit Cursorziel", () => {
    const markups: [string, string][] = [
      ["PhoneFrame", renderToString(createElement(Phone, phoneProps, zeitenAnsicht()))],
      ["PhoneFrame 160", renderToString(createElement(Phone, { ...phoneProps, width: 160 }, zeitenAnsicht()))],
      ["PhoneFrame 240", renderToString(createElement(Phone, { ...phoneProps, width: 240 }, zeitenAnsicht()))],
      ["BrowserFrame", renderToString(createElement(Browser, browserProps, plantafel()))],
      ["BrowserFrame dunkel", renderToString(createElement(Browser, { ...browserProps, tone: "dark" }, plantafel()))],
      ["ComparisonTable", renderToString(createElement(ComparisonTable, tabelle))],
      ["FeatureCard", renderToString(createElement(FeatureCard, aufmass))],
      ["PlatformBadge", renderToString(createElement(PlatformBadge, { platform: "web" }))],
      ["LicenseBadge", renderToString(createElement(LicenseBadge, { license: "voll" }))],
      ["IllustrationLabel", renderToString(createElement(IllustrationLabel, { kind: "vereinfacht" }))],
      [
        "MediaFigure",
        renderToString(
          createElement(MediaFigure, {
            src: "/images/werkstatt-2026.webp",
            alt: "Werkbank",
            width: 1536,
            height: 1024,
            sizes: "100vw",
            label: "ki",
          }),
        ),
      ],
    ];
    for (const [name, html] of markups) expectStatic(html, name);
  });
});
