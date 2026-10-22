import fs from "node:fs";
import path from "node:path";
import { createElement, type FunctionComponent } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FileCheck2, ScanLine } from "lucide-react";
import { BentoGrid, BentoTile, TileIcon, type BentoGridProps, type BentoTileProps } from "@/components/v2/BentoGrid";
import { ComparisonTable } from "@/components/v2/ComparisonTable";
import { CtaBand } from "@/components/v2/CtaBand";
import { FactList } from "@/components/v2/FactList";
import { FitPanels } from "@/components/v2/FitPanels";
import { FaqList } from "@/components/v2/FaqList";
import { FeatureList, type FeatureListItem } from "@/components/v2/FeatureList";
import { StepFlow, type Step } from "@/components/v2/StepFlow";
import { KeyFacts, type KeyFact } from "@/components/v2/KeyFacts";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { MINI_STATUS_BELEGE, MINI_STATUS_TON, MiniStatus, type MiniStatusName } from "@/components/v2/mini/MiniUi";
import { MINI_BUDGET } from "@/components/v2/mini/limits";
import { pruefeReleaseStand, releaseDatei, releaseSuite } from "./release-repos";
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
  { value: "10 Tage", label: "kostenlos testen", source: "site:trialDays" },
  { value: "29,95 €", label: "Voll-Lizenz pro Monat", source: "site:tarif-voll-monat" },
  { value: "9,95 €", label: "App-Lizenz pro Monat", source: "site:tarif-app-monat" },
  { value: "21", label: "Sprachen in der Mobile-App", source: "register:mobileLocales" },
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

describe("SectionHeader mit Frage-Titel (08-UI-SPEC G2, C2)", () => {
  const FRAGE = "Was kostet die App-Lizenz für Mitarbeitende?";
  /** 179 Zeichen, ein Satz. */
  const ANTWORT =
    "Die App-Lizenz kostet 9,95 € netto je Person und Monat und deckt die Mobile-App für Mitarbeitende auf der Baustelle ab, ohne Zugang zur Web-App im Büro und ohne extra Modulgebühr.";
  const header = (title: string, lead: string) => renderToString(createElement(SectionHeader, { title, lead, id: "kosten" }));

  it("Antwort-Lead (179 Zeichen, 1 Satz) rendert als <p data-answer>, id an der H2", () => {
    expect(Array.from(ANTWORT).length).toBe(179);
    const html = header(FRAGE, ANTWORT);
    expect(html).toMatch(/<h2[^>]*id="kosten"/);
    expect(html).toMatch(/<p[^>]*data-answer=""[^>]*>Die App-Lizenz kostet/);
    expect(count(html, /data-answer/g)).toBe(1);
  });

  it("Antwort-Lead mit zwei Sätzen ist erlaubt", () => {
    expect(() => header(FRAGE, "Die App-Lizenz kostet 9,95 € netto je Monat. Sie gilt für die Mobile-App.")).not.toThrow();
  });

  it("Antwort-Lead über 300 Zeichen wirft sectionHeader.answerLead", () => {
    expect(() => header(FRAGE, `${"x".repeat(300)}.`)).toThrow(
      "Textbudget überschritten: sectionHeader.answerLead hat 301 von 300 Zeichen – Satz kürzen.",
    );
  });

  it("Antwort-Lead mit drei Sätzen wirft", () => {
    expect(() => header(FRAGE, "Eins. Zwei. Drei.")).toThrow(
      "SectionHeader: Antwort-Lead hat 3 Sätze – ein bis zwei Sätze schreiben.",
    );
  });

  it("Nicht-Frage-Titel: Lead über 140 wirft sectionHeader.lead, zwei Sätze werfen, kein data-answer", () => {
    expect(() => header("Ablauf im Überblick", `${"x".repeat(140)}.`)).toThrow(
      "Textbudget überschritten: sectionHeader.lead hat 141 von 140 Zeichen – Satz kürzen.",
    );
    expect(() => header("Ablauf im Überblick", "Erster Satz. Zweiter Satz.")).toThrow(
      "SectionHeader: Lead hat 2 Sätze – genau einen Satz schreiben.",
    );
    expect(header("Ablauf im Überblick", "Genau ein Satz.")).not.toContain("data-answer");
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

  it("wirft bei Quellen ohne Kurzform site:…, register:… oder wettbewerber:… (07 D-13, 08 D-04)", () => {
    for (const bad of [
      "tarife.voll.monat",
      "product-register: mobileLocales",
      "site.trialDays",
      "site:",
      "web:src/x",
      "wettbewerber:",
      "wettbewerber:lib/x",
      "plancraft:x",
    ]) {
      const falsch = [...facts.slice(0, 3), { value: "29,95 €", label: "Voll-Lizenz", source: bad }];
      expect(() => renderToString(createElement(KeyFacts, { facts: falsch, note })), bad).toThrow(
        `KeyFacts: Quelle ‚${bad}‘ ist keine Kurzform site:…, register:… oder wettbewerber:… – Schlüssel angeben.`,
      );
    }
    const html = renderToString(createElement(KeyFacts, { facts, note }));
    expect(html).toContain('data-source="site:tarif-voll-monat"');
  });

  it("akzeptiert wettbewerber:<schlüssel> für belegte Wettbewerberwerte; site:/register: bleiben gültig", () => {
    const mitWettbewerber = [
      ...facts.slice(0, 2),
      { value: "24,90 €", label: "plancraft Business je Person", source: "wettbewerber:plancraft-business-5p-jahr" },
      { value: "21", label: "Sprachen", source: "register:mobileLocales" },
    ];
    const html = renderToString(createElement(KeyFacts, { facts: mitWettbewerber, note }));
    expect(html).toContain('data-source="wettbewerber:plancraft-business-5p-jahr"');
    expect(html).toContain('data-source="register:mobileLocales"');
  });

  it("wirft bei 2 und bei 5 Fakten", () => {
    expect(() => renderToString(createElement(KeyFacts, { facts: facts.slice(0, 2), note }))).toThrow(
      "KeyFacts: mindestens 3 Fakten erforderlich – Inhalte in lib/… ergänzen.",
    );
    const fuenf = [...facts, { value: "50 GB", label: "Speicher", source: "site:speicher" }];
    expect(() => renderToString(createElement(KeyFacts, { facts: fuenf, note }))).toThrow(
      "KeyFacts: höchstens 4 Fakten erlaubt – Inhalte in lib/… kürzen.",
    );
  });
});

/** 07-UI-SPEC „MiniStatusName-Erweiterung (F3)“: Name → Ton. Bestandsfarben bleiben unverändert. */
const ERWARTETE_TOENE: Record<MiniStatusName, "neutral" | "positiv" | "hervorgehoben"> = {
  Entwurf: "neutral",
  Offen: "neutral",
  Gesendet: "neutral",
  Bezahlt: "positiv",
  Überfällig: "hervorgehoben",
  Storniert: "neutral",
  Geplant: "neutral",
  "In Arbeit": "neutral",
  Abgeschlossen: "positiv",
  "In Bearbeitung": "neutral",
  Behoben: "positiv",
  Geprüft: "positiv",
  Unterschrieben: "positiv",
  Ausstehend: "neutral",
  Genehmigt: "positiv",
  Abgelehnt: "hervorgehoben",
  Abgenommen: "positiv",
  "Abgenommen mit Mängeln": "neutral",
  Zugeordnet: "positiv",
  "Noch nicht zugeordnet": "neutral",
  Text: "neutral",
  Bedarf: "neutral",
};
const BESTANDSNAMEN: MiniStatusName[] = ["Entwurf", "Offen", "Gesendet", "Bezahlt", "Überfällig", "Storniert"];
const NEUE_NAMEN = (Object.keys(ERWARTETE_TOENE) as MiniStatusName[]).filter((n) => !BESTANDSNAMEN.includes(n));

describe("MiniStatus (07-UI-SPEC F3)", () => {
  it("kennt 22 Namen, davon 16 neue, jeder mit Beleg web:/mobile: und genau einem Ton", () => {
    expect(NEUE_NAMEN).toHaveLength(16);
    expect(Object.keys(MINI_STATUS_BELEGE).sort()).toEqual(Object.keys(ERWARTETE_TOENE).sort());
    expect(MINI_STATUS_TON).toEqual(ERWARTETE_TOENE);
    for (const [name, beleg] of Object.entries(MINI_STATUS_BELEGE)) {
      expect(beleg, name).toMatch(/^(web|mobile):src\/[\w./-]+\.(tsx|json)$/);
    }
    for (const name of BESTANDSNAMEN) expect(MINI_STATUS_BELEGE[name]).toBe("web:src/pages/Dokumente.tsx");
  });

  it("jeder Name passt in das Mini-UI-Zeilenbudget", () => {
    for (const name of Object.keys(ERWARTETE_TOENE)) {
      expect(Array.from(name).length, name).toBeLessThanOrEqual(MINI_BUDGET.row);
    }
  });

  it("rendert data-status und data-tone", () => {
    const html = (status: MiniStatusName) => renderToString(createElement(MiniStatus, { status }));
    const mitMaengeln = html("Abgenommen mit Mängeln");
    expect(mitMaengeln).toContain('data-status="Abgenommen mit Mängeln"');
    expect(mitMaengeln).toContain('data-tone="neutral"');
    expect(html("Genehmigt")).toContain('data-tone="positiv"');
    expect(html("Abgelehnt")).toContain('data-tone="hervorgehoben"');
    expect(html("Bezahlt")).toContain('data-tone="positiv"');
    expect(html("Überfällig")).toContain('data-tone="hervorgehoben"');
  });

  it("CSS kennt genau die drei Töne mit den Farben aus dem UI-SPEC, keine Einzelselektoren je Status", () => {
    const css = fs.readFileSync(path.resolve(import.meta.dirname, "../components/v2/mini/MiniUi.module.css"), "utf8");
    const rule = (tone: string) =>
      css.match(new RegExp(`\\.status\\[data-tone="${tone}"\\]\\s*\\{([^}]*)\\}`))?.[1]?.toLowerCase() ?? "";
    expect(rule("neutral")).toContain("background: #ededf0");
    expect(rule("neutral")).toContain("color: #393941");
    expect(rule("positiv")).toContain("background: #ffefcc");
    expect(rule("positiv")).toContain("color: #784b10");
    expect(rule("hervorgehoben")).toContain("background: #17171c");
    expect(rule("hervorgehoben")).toContain("color: #fff");
    expect(css).not.toContain("data-status=");
  });
});

// WR-07: Pfade, sichtbarer Skip mit Grund und Pflichtmodus (CI / CRAFTOS_REQUIRE_RELEASE=1) aus tests/release-repos.ts.
const miniStatusSuite = releaseSuite("MiniStatus-Belege am Release-Commit", ["web", "mobile"]);

describe.skipIf(miniStatusSuite.skip)(miniStatusSuite.titel, () => {
  function release(beleg: string): string {
    const [repository, file] = beleg.split(/:(.+)/);
    if (repository !== "web" && repository !== "mobile") throw new Error(`Beleg ${beleg} ohne web:/mobile:-Präfix.`);
    return releaseDatei(repository, file);
  }

  it("beide Repos vorhanden, Release-Commits aus productBasis lokal und in origin/release enthalten", () => {
    pruefeReleaseStand("web");
    pruefeReleaseStand("mobile");
  });

  it("jeder der 16 neuen Namen steht wörtlich in seiner Release-Datei", () => {
    const fehlend: string[] = [];
    for (const name of NEUE_NAMEN) {
      if (!release(MINI_STATUS_BELEGE[name]).includes(name)) fehlend.push(`${name} → ${MINI_STATUS_BELEGE[name]}`);
    }
    expect(fehlend).toEqual([]);
  });

  it("Projektstatus sind zusätzlich in der Mobile-App belegt", () => {
    const projects = release("mobile:src/shared/i18n/locales/de/projects.json");
    for (const name of ["Geplant", "In Arbeit", "Abgeschlossen"]) expect(projects, name).toContain(`"${name}"`);
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
    // Einheitlich mit Hero- und Header-CTA (06-REVIEW IN-06).
    expect(primary).toContain('data-track="trial"');
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

  it("answerMax={300} (C3): Antwort mit 301 Zeichen wirft faq.answerCentral, ohne answerMax gilt 600", () => {
    // Zwei Sätze: erster Satz 150 Zeichen (≤ firstSentence 300), gesamt 301 (≤ answer 600).
    const lang = `${"a".repeat(149)}. ${"b".repeat(149)}.`;
    expect(Array.from(lang).length).toBe(301);
    const items = [{ q: "Wie lang darf eine Antwort sein?", a: lang }, ...faqs.slice(0, 2)];
    expect(() => renderToString(createElement(FaqList, { items, answerMax: 300 }))).toThrow(
      "Textbudget überschritten: faq.answerCentral hat 301 von 300 Zeichen – Satz kürzen.",
    );
    expect(() => renderToString(createElement(FaqList, { items }))).not.toThrow();
    const ohne = renderToString(createElement(FaqList, { items: faqs.slice(0, 3) }));
    const mit = renderToString(createElement(FaqList, { items: faqs.slice(0, 3), answerMax: 300 }));
    expect(mit).toBe(ohne);
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

describe("FeatureList (E2)", () => {
  const mitZiel: FeatureListItem = {
    id: "eintrag-hilfe",
    name: "Eintrag mit Ziel",
    icon: FileCheck2,
    benefit: "Ein Satz Nutzen mit Ziel in der Hilfe.",
    platforms: ["web", "mobile"],
    target: { href: "/hilfe/test-anleitung", kind: "hilfe", label: "Testanleitung" },
  };
  const ohneZiel: FeatureListItem = {
    id: "eintrag-ohne",
    name: "Eintrag ohne Ziel",
    icon: ScanLine,
    benefit: "Ein Satz Nutzen ohne Ziel.",
    platforms: [],
  };
  const render = (items: FeatureListItem[], title = "Weitere Funktionen") =>
    renderToString(createElement(FeatureList, { items, title }));

  it("rendert h3, eine Liste, zwei Einträge und genau einen Link mit Zielhinweis", () => {
    const html = render([mitZiel, ohneZiel]);
    expect(count(html, /<h3\b/g)).toBe(1);
    expect(html).toMatch(/<h3\b[^>]*>Weitere Funktionen<\/h3>/);
    expect(count(html, /<ul\b(?![^>]*aria-label="Plattformen")/g)).toBe(1);
    expect(count(html, /<li\b[^>]*data-funktion="/g)).toBe(2);
    expect(html).toContain('data-funktion="eintrag-hilfe"');
    expect(html).toContain('data-funktion="eintrag-ohne"');

    const links = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? [];
    expect(links).toHaveLength(1);
    expect(links[0]).toContain('href="/hilfe/test-anleitung"');
    expect(links[0]).toContain("Eintrag mit Ziel");
    const describedBy = (links[0] ?? "").match(/aria-describedby="([^"]+)"/)?.[1];
    expect(describedBy).toBeDefined();
    expect(count(html, new RegExp(`id="${describedBy}"`, "g"))).toBe(1);
    expect(html).toMatch(new RegExp(`id="${describedBy}"[^>]*>Anleitung in der Hilfe<`));
  });

  it("Eintrag ohne Ziel hat weder Link noch Hinweis noch Platzhalter", () => {
    const html = render([mitZiel, ohneZiel]);
    const start = html.indexOf('data-funktion="eintrag-ohne"');
    expect(start).toBeGreaterThan(-1);
    const rest = html.slice(start);
    expect(rest).not.toContain("<a");
    expect(rest).not.toContain("Anleitung in der Hilfe");
    expect(rest).not.toContain("Beschrieben unter");
    expect(html).not.toMatch(/Seite folgt|bald|demnächst|in Vorbereitung/i);
  });

  it("Ziel vom Typ funktion nennt die Zielseite", () => {
    const html = render([
      { ...mitZiel, target: { href: "/funktionen/projektverwaltung", kind: "funktion", label: "Projektverwaltung" } },
    ]);
    expect(html).toContain("Beschrieben unter Projektverwaltung");
    expect(html).toContain('href="/funktionen/projektverwaltung"');
    expect(html).not.toContain("Anleitung in der Hilfe");
  });

  it("Ziel vom Typ seite nennt die Zielseite wie funktion (07-UI-SPEC F5, D-21)", () => {
    const html = render([{ ...mitZiel, target: { href: "/app", kind: "seite", label: "Mobile-App" } }]);
    expect(html).toContain("Beschrieben unter Mobile-App");
    expect(html).toContain('href="/app"');
    expect(html).not.toContain("Anleitung in der Hilfe");
  });

  it("Plattform-Badges erscheinen nur bei belegten Plattformen", () => {
    expect(count(render([mitZiel]), /data-kind="platform"/g)).toBe(2);
    expect(count(render([ohneZiel]), /data-kind="platform"/g)).toBe(0);
    expect(render([ohneZiel])).not.toContain('aria-label="Plattformen"');
  });

  it("Icon-Feld ist dekorativ", () => {
    const html = render([ohneZiel]);
    expect(html).toMatch(/<svg\b[^>]*aria-hidden="true"/);
  });

  it("prüft Satzzahl, Namensbudget und Menge beim Rendern", () => {
    expect(() => render([{ ...ohneZiel, benefit: "Erster Satz. Zweiter Satz." }])).toThrow(
      "FeatureList: Nutzen für Eintrag ohne Ziel hat 2 Sätze – genau einen Satz schreiben.",
    );
    expect(() => render([{ ...ohneZiel, name: "N".repeat(33) }])).toThrow(
      "Textbudget überschritten: featureList.name hat 33 von 32 Zeichen – Satz kürzen.",
    );
    expect(() => render([{ ...ohneZiel, benefit: `${"B".repeat(100)}.` }])).toThrow(
      "Textbudget überschritten: featureList.benefit hat 101 von 100 Zeichen – Satz kürzen.",
    );
    expect(() => render([])).toThrow("FeatureList: mindestens 1 Einträge erforderlich – Inhalte in lib/… ergänzen.");
    const acht = Array.from({ length: 8 }, (_, i) => ({ ...ohneZiel, id: `e${i}` }));
    expect(() => render(acht)).toThrow("FeatureList: höchstens 7 Einträge erlaubt – Inhalte in lib/… kürzen.");
  });

  it("ist statisch; Übergänge nur unter hover: hover mit 150 ms und Reduced-Motion-Schutz", () => {
    expectStatic(render([mitZiel, ohneZiel]), "FeatureList");
    const css = fs.readFileSync(path.resolve(import.meta.dirname, "../components/v2/FeatureList.module.css"), "utf8");
    expect(css).not.toMatch(/animation|@keyframes/);
    const ohneHoverBlock = css.replace(/@media \(hover: hover\)\s*\{[\s\S]*?\n\}/g, "").replace(
      /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\n\}/g,
      "",
    );
    expect(ohneHoverBlock).not.toMatch(/transition/);
    const hover = css.match(/@media \(hover: hover\)\s*\{[\s\S]*?\n\}/)?.[0] ?? "";
    expect(hover).toMatch(/transition:[^;]*0?\.15s|transition:[^;]*150ms/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*transition:\s*none/);
    // Fokusrahmen nur bei Tastaturfokus (:focus-visible), nicht beim Mausklick (06-REVIEW WR-01).
    expect(css).toMatch(/\.item:has\(\.link:focus-visible\)\s*\{[^}]*outline:\s*3px solid #bb7609/);
    expect(css).not.toMatch(/:focus-within/);
    // Verlinkte Namen sind dauerhaft unterstrichen, nicht erst beim Überfahren (WCAG 1.4.1).
    const linkRegel = css.match(/\n\.link\s*\{[^}]*\}/)?.[0] ?? "";
    expect(linkRegel).toMatch(/text-decoration:\s*underline/);
    expect(linkRegel).not.toMatch(/transparent/);
  });
});

// ---------------------------------------------------------------------------
// Phase 8 (08-UI-SPEC G3–G5): ComparisonTable mit Quellen, FitPanels, FactList
// ---------------------------------------------------------------------------

const decodeHtml = (v: string) =>
  v
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const tabelle = {
  caption: "Marktübersicht mit Beispieldaten",
  rowHeader: "Anbieter",
  columns: [
    { key: "web", label: "Web-App" },
    { key: "mobil", label: "Mobile-App" },
  ],
  rows: [
    { label: "Anbieter A", cells: { web: true, mobil: "nicht angegeben" } },
    { label: "Anbieter B", cells: { web: true, mobil: true } },
  ],
  note: "Beispieldaten. Angaben ohne Gewähr, Quellen unter der Tabelle.",
};
const quellen = [
  { anbieter: "Anbieter A", label: "Preisseite", url: "https://example.com/a/preise", abgerufenAm: "2026-10-22" },
  { anbieter: "Anbieter B", label: "Produktseite", url: "https://example.com/b/produkt", abgerufenAm: "2026-10-22" },
  { anbieter: "Anbieter A", label: "Funktionsübersicht", url: "https://example.com/a/funktionen", abgerufenAm: "2026-10-22" },
];
const DISCLAIMER = "Die Nennung der Anbieter dient der Zuordnung; es besteht keine Geschäftsbeziehung.";

describe("ComparisonTable mit Quellen und Disclaimer (08-UI-SPEC G3, C5)", () => {
  const html = renderToString(createElement(ComparisonTable, { ...tabelle, sources: quellen, disclaimer: DISCLAIMER }));

  it("Quellenliste <ol aria-label=„Quellen zur Tabelle“> nach der Note, nach Anbieter gruppiert, deutsches Datum", () => {
    expect(count(html, /aria-label="Quellen zur Tabelle"/g)).toBe(1);
    const ol = html.match(/<ol[^>]*aria-label="Quellen zur Tabelle"[^>]*>([\s\S]*?)<\/ol>/)!;
    expect(html.indexOf(ol[0])).toBeGreaterThan(html.indexOf(tabelle.note));
    const eintraege = [...ol[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => decodeHtml(m[1]));
    expect(eintraege).toEqual([
      "Anbieter A: Preisseite, abgerufen am 22.10.2026",
      "Anbieter A: Funktionsübersicht, abgerufen am 22.10.2026",
      "Anbieter B: Produktseite, abgerufen am 22.10.2026",
    ]);
  });

  it("jeder Quellenlink rel=nofollow, gleicher Tab, Linktext = Label", () => {
    const links = [...html.matchAll(/<a\s[^>]*>[\s\S]*?<\/a>/g)].map((m) => m[0]);
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toMatch(/rel="nofollow"/);
      expect(link).not.toContain("target=");
    }
    expect(links[0]).toMatch(/href="https:\/\/example\.com\/a\/preise"[^>]*>Preisseite<\/a>/);
  });

  it("Disclaimer steht nach der Quellenliste", () => {
    expect(html.indexOf(DISCLAIMER)).toBeGreaterThan(html.indexOf('aria-label="Quellen zur Tabelle"'));
    expect(html).toMatch(/<p[^>]*data-disclaimer=""[^>]*>Die Nennung der Anbieter/);
  });

  it("ohne highlight keine hervorgehobene Spalte (Marktübersicht)", () => {
    expect(html).not.toContain('data-highlight="true"');
  });

  it("Quelle mit http:// wirft", () => {
    expect(() =>
      renderToString(createElement(ComparisonTable, { ...tabelle, sources: [{ ...quellen[0], url: "http://example.com/a" }] })),
    ).toThrow("ComparisonTable: Quelle ‚Preisseite‘ ohne https-Adresse – nur https://-Quellen verlinken.");
  });

  it("Zelle mit 25 Zeichen wirft wie bisher", () => {
    const zu = { ...tabelle, rows: [{ label: "Anbieter A", cells: { web: "x".repeat(25), mobil: true } }] };
    expect(() => renderToString(createElement(ComparisonTable, zu))).toThrow(
      "Textbudget überschritten: comparison.cell hat 25 von 24 Zeichen – Satz kürzen.",
    );
  });

  it("ohne sources und disclaimer unverändertes Markup (keine Liste, kein Disclaimer)", () => {
    const ohne = renderToString(createElement(ComparisonTable, tabelle));
    expect(ohne).not.toContain("Quellen zur Tabelle");
    expect(ohne).not.toContain("data-disclaimer");
    expect(ohne).not.toContain("<ol");
    expect(ohne).not.toContain("<a ");
  });
});

const wettbewerber = {
  title: "Wann Anbieter A passt",
  points: [
    { text: "Sie planen überwiegend im Büro und brauchen keine Mobile-App.", quelle: { label: "Anbieter A: Produktseite", url: "https://example.com/a" } },
    { text: "Sie möchten Angebote mit eigenen Vorlagen gestalten.", quelle: { label: "Anbieter A: Vorlagen", url: "https://example.com/a/vorlagen" } },
  ],
};
const craftosPanel = {
  title: "Wann CraftOS passt",
  points: [
    { text: "Sie möchten pro Person abrechnen und Mitarbeitende mit einer App-Lizenz ausstatten." },
    { text: "Sie möchten Büro und Baustelle mit Web-App und Mobile-App verbinden." },
  ],
};
const fit = (props: Partial<Parameters<typeof FitPanels>[0]> = {}) =>
  renderToString(createElement(FitPanels, { label: "Für wen passt was", panels: [wettbewerber, craftosPanel], ...props }));

describe("FitPanels (08-UI-SPEC G4, § 3.5)", () => {
  const html = fit();

  it("zwei article mit h3 in einer Liste, Wettbewerber zuerst, beide gleich gestaltet", () => {
    expect(html).toMatch(/^<ul[^>]*aria-label="Für wen passt was"/);
    expect(count(html, /<article\b/g)).toBe(2);
    const h3 = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => decodeHtml(m[1]));
    expect(h3).toEqual(["Wann Anbieter A passt", "Wann CraftOS passt"]);
    const klassen = [...html.matchAll(/<article class="([^"]+)"/g)].map((m) => m[1]);
    expect(klassen).toHaveLength(2);
    expect(new Set(klassen).size).toBe(1);
    expect(html).not.toMatch(/Empfohlen/);
  });

  it("Quellenlinks „Quelle“ mit rel=nofollow, gleicher Tab; Icons dekorativ", () => {
    const links = [...html.matchAll(/<a\s[^>]*>[\s\S]*?<\/a>/g)].map((m) => m[0]);
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toMatch(/rel="nofollow"/);
      expect(link).not.toContain("target=");
      expect(decodeHtml(link)).toMatch(/^Quelle/);
    }
    expect(html).not.toMatch(/<svg(?![^>]*aria-hidden="true")[^>]*>/);
  });

  it("Panel mit 1 oder 5 Punkten wirft den Mengenfehler aus dem UI-SPEC", () => {
    expect(() => fit({ panels: [{ ...wettbewerber, points: wettbewerber.points.slice(0, 1) }, craftosPanel] })).toThrow(
      "FitPanels: Panel Wann Anbieter A passt hat 1 Punkte – 2 bis 4 erforderlich.",
    );
    const fuenf = Array.from({ length: 5 }, (_, i) => ({ text: `Punkt ${i + 1} ist ein Satz.` }));
    expect(() => fit({ panels: [wettbewerber, { ...craftosPanel, points: fuenf }] })).toThrow(
      "FitPanels: Panel Wann CraftOS passt hat 5 Punkte – 2 bis 4 erforderlich.",
    );
  });

  it("Wettbewerberpunkt ohne Quelle wirft; quellenPflicht={false} erlaubt ihn", () => {
    const ohneQuelle = { ...wettbewerber, points: [{ text: "Sie planen im Büro." }, wettbewerber.points[1]] };
    expect(() => fit({ panels: [ohneQuelle, craftosPanel] })).toThrow(
      "FitPanels: Wettbewerberpunkt ‚Sie planen im Büro.‘ ohne Quelle – im Datenmodul ergänzen.",
    );
    expect(() => fit({ panels: [ohneQuelle, craftosPanel], quellenPflicht: false })).not.toThrow();
  });

  it("Punkt mit zwei Sätzen oder 101 Zeichen wirft; Titel über 40 wirft", () => {
    const zweiSaetze = { ...craftosPanel, points: [{ text: "Erster Satz. Zweiter Satz." }, craftosPanel.points[1]] };
    expect(() => fit({ panels: [wettbewerber, zweiSaetze] })).toThrow(
      "FitPanels: Nutzen für Wann CraftOS passt hat 2 Sätze – genau einen Satz schreiben.",
    );
    const zuLang = { ...craftosPanel, points: [{ text: `${"x".repeat(100)}.` }, craftosPanel.points[1]] };
    expect(() => fit({ panels: [wettbewerber, zuLang] })).toThrow(
      "Textbudget überschritten: fitPanel.point hat 101 von 100 Zeichen – Satz kürzen.",
    );
    expect(() => fit({ panels: [{ ...wettbewerber, title: "x".repeat(41) }, craftosPanel] })).toThrow(
      "Textbudget überschritten: fitPanel.title hat 41 von 40 Zeichen – Satz kürzen.",
    );
  });

  it("Quelle ohne https wirft", () => {
    const http = {
      ...wettbewerber,
      points: [{ text: "Sie planen im Büro.", quelle: { label: "A", url: "http://example.com" } }, wettbewerber.points[1]],
    };
    expect(() => fit({ panels: [http, craftosPanel] })).toThrow(
      "FitPanels: Quelle ‚A‘ ohne https-Adresse – nur https://-Quellen verlinken.",
    );
  });
});

const fakten = Array.from({ length: 6 }, (_, i) => ({
  term: `Begriff ${i + 1}`,
  definition: `Definition ${i + 1} in einem Satz.`,
}));

describe("FactList (08-UI-SPEC G5, § 5.2)", () => {
  const html = renderToString(createElement(FactList, { items: fakten, note: "Stand 22.10.2026." }));

  it("<dl> mit n Paaren dt/dd in je einem div, Note danach", () => {
    expect(count(html, /<dl\b/g)).toBe(1);
    expect(count(html, /<div[^>]*><dt\b/g)).toBe(6);
    expect(count(html, /<dd\b/g)).toBe(6);
    expect(html.indexOf("Stand 22.10.2026.")).toBeGreaterThan(html.indexOf("</dl>"));
  });

  it("5 Einträge werfen den Mengenfehler", () => {
    expect(() => renderToString(createElement(FactList, { items: fakten.slice(0, 5) }))).toThrow(
      "FactList: mindestens 6 Einträge erforderlich – Inhalte in lib/… ergänzen.",
    );
  });

  it("Begriff 33 und Definition 201 Zeichen werfen Budgetfehler, drei Sätze werfen", () => {
    const mit = (eintrag: { term: string; definition: string }) =>
      renderToString(createElement(FactList, { items: [eintrag, ...fakten.slice(1)] }));
    expect(() => mit({ term: "x".repeat(33), definition: "Ein Satz." })).toThrow(
      "Textbudget überschritten: factList.term hat 33 von 32 Zeichen – Satz kürzen.",
    );
    expect(() => mit({ term: "Begriff", definition: `${"x".repeat(200)}.` })).toThrow(
      "Textbudget überschritten: factList.definition hat 201 von 200 Zeichen – Satz kürzen.",
    );
    expect(() => mit({ term: "Begriff", definition: "Eins. Zwei. Drei." })).toThrow(
      "FactList: Definition für Begriff hat 3 Sätze – höchstens zwei Sätze schreiben.",
    );
  });
});

// ---------------------------------------------------------------------------
// Globale Reduced-Motion-Regel (08-13, Befund home-navigation.pw.cjs:501 WebKit)
// ---------------------------------------------------------------------------

describe("globals.css: reduzierte Bewegung ohne Übergänge", () => {
  // Mit transition-duration 0.01ms erhielt jedes Element (Standard transition-property: all) einen Übergang;
  // WebKit startete danach Hunderte tab-size-Übergänge, die unter Last sekundenlang „running“ blieben.
  // Gesamtdauer 0 s (Dauer und Verzögerung) erzeugt laut CSS Transitions gar keinen Übergang.
  const css = fs.readFileSync(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");
  const block = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\n\}/)?.[0] ?? "";

  it("setzt Übergangsdauer und -verzögerung global auf 0 s", () => {
    expect(block).toMatch(/transition-duration:\s*0s\s*!important/);
    expect(block).toMatch(/transition-delay:\s*0s\s*!important/);
    expect(block).not.toMatch(/transition-duration:\s*0\.01ms/);
  });

  it("beendet Animationen weiterhin sofort und nur einmal", () => {
    expect(block).toMatch(/animation-duration:\s*0\.01ms\s*!important/);
    expect(block).toMatch(/animation-iteration-count:\s*1\s*!important/);
  });
});

describe("FeatureCard-Raster: einspaltig mit minmax(0, 1fr) unter 768 px", () => {
  // Ohne explizite Spalte behielt WebKit nach einem Größenwechsel 1440 → 360 px die implizite Spur mit 410 px
  // (Seitenüberlauf auf /funktionen und den Detailseiten, function-illustrations.pw.cjs:443). grid-cols-1 begrenzt
  // die Spur auf die Containerbreite.
  for (const datei of ["app/funktionen/page.tsx", "components/funktionen/FunktionsDetail.tsx", "app/styleguide/page.tsx"]) {
    it(datei, () => {
      const quelle = fs.readFileSync(path.resolve(import.meta.dirname, "..", datei), "utf8");
      const raster = [...quelle.matchAll(/className="(grid [^"]*md:grid-cols-2[^"]*lg:grid-cols-3[^"]*)"/g)].map((m) => m[1]);
      expect(raster.length, datei).toBeGreaterThan(0);
      for (const klassen of raster) expect(klassen.split(" "), klassen).toContain("grid-cols-1");
    });
  }
});
