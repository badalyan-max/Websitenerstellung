/**
 * Textbudgets der Musterseite (UI-SPEC „Textbudgets“): Alle Textfelder in lib/styleguide-content.ts
 * liegen im TEXT_BUDGET bzw. im MINI_BUDGET der Geräterahmen. Wird in den Phasen 6–9 auf Seitendaten erweitert.
 */
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AppPage from "@/app/app/page";
import FunktionenPage from "@/app/funktionen/page";
import Home from "@/app/page";
import { FunktionsDetail } from "@/components/funktionen/FunktionsDetail";
import { AlternativePage } from "@/components/vergleich/AlternativePage";
import {
  TEXT_BUDGET,
  assertCount,
  assertOneSentence,
  assertTextBudget,
  charCount,
  sentenceCount,
} from "@/components/v2/budgets";
import { MINI_BUDGET } from "@/components/v2/mini/limits";
import { funktionen } from "@/lib/funktionen";
import { getFunktionsdetail } from "@/lib/funktionsdetails";
import { baueAlternative } from "@/lib/seiten/alternativen";
import * as content from "@/lib/styleguide-content";
import { l1Treffer, l1Woerter } from "@/lib/leitlinie";
import leitlinieL1 from "@/lib/leitlinie-l1.json";

type Check = [field: string, value: string | undefined, max: number];

/** Sammelt Verstöße mit dem wörtlichen Fehlertext aus dem UI-SPEC. */
function violations(checks: Check[]): string[] {
  const out: string[] = [];
  for (const [field, value, max] of checks) {
    if (value === undefined) continue;
    try {
      assertTextBudget(field, value, max);
    } catch (error) {
      out.push((error as Error).message);
    }
  }
  return out;
}

function countViolation(component: string, n: number, range: { min: number; max: number }, unit: string): string[] {
  try {
    assertCount(component, n, range, unit);
    return [];
  } catch (error) {
    return [(error as Error).message];
  }
}

/** Alle Mini-UI-Szenen (Kacheln, Karten, Rahmen) einsammeln. */
function scenes(): content.FrameScene[] {
  const out: content.FrameScene[] = [];
  for (const tile of content.bentoContent) if (tile.visual.kind !== "icon") out.push(tile.visual.scene);
  for (const card of content.featureCardContent) out.push(card.scene.scene);
  const f = content.frameContent;
  out.push(f.browser, ...f.phones.map((p) => p.scene), f.pair.browser, f.pair.phone);
  return out;
}

describe("Textbudgets der Musterseite", () => {
  it("Fehlertext entspricht dem UI-SPEC", () => {
    expect(() => assertTextBudget("bentoTile.title", "x".repeat(41), 40)).toThrow(
      "Textbudget überschritten: bentoTile.title hat 41 von 40 Zeichen – Satz kürzen.",
    );
  });

  it("SectionHeader, BentoGrid, StepFlow und KeyFacts im Budget", () => {
    const b = TEXT_BUDGET;
    const h = content.sectionHeaderContent;
    const checks: Check[] = [
      ["sectionHeader.eyebrow", h.eyebrow, b.sectionHeader.eyebrow],
      ["sectionHeader.title", h.title, b.sectionHeader.title],
      ["sectionHeader.lead", h.lead, b.sectionHeader.lead],
      ...content.bentoContent.flatMap((t): Check[] => [
        ["bentoTile.title", t.title, b.bentoTile.title],
        [
          t.size === "lg" || t.size === "wide" ? "bentoTile.textLarge" : "bentoTile.textSmall",
          t.text,
          t.size === "lg" || t.size === "wide" ? b.bentoTile.textLarge : b.bentoTile.textSmall,
        ],
      ]),
      ...content.stepContent.flatMap((s): Check[] => [
        ["step.title", s.title, b.step.title],
        ["step.text", s.text, b.step.text],
      ]),
      ...content.keyFactsContent.facts.flatMap((f): Check[] => [
        ["keyFact.value", f.value, b.keyFact.value],
        ["keyFact.label", f.label, b.keyFact.label],
      ]),
    ];
    expect([
      ...violations(checks),
      ...countViolation("BentoGrid", content.bentoContent.length, b.count.bento, "Kacheln"),
      ...countViolation("StepFlow", content.stepContent.length, b.count.steps, "Schritte"),
      ...countViolation("KeyFacts", content.keyFactsContent.facts.length, b.count.keyFacts, "Fakten"),
    ]).toEqual([]);
  });

  it("FeatureCard, ComparisonTable, FAQ und CtaBand im Budget", () => {
    const b = TEXT_BUDGET;
    const t = content.comparisonContent;
    const checks: Check[] = [
      ...content.featureCardContent.flatMap((c): Check[] => [
        ["featureCard.title", c.name, b.featureCard.title],
        ["featureCard.benefit", c.benefit, b.featureCard.benefit],
      ]),
      ...t.rows.flatMap((r): Check[] => [
        ["comparison.rowLabel", r.label, b.comparison.rowLabel],
        ...Object.values(r.cells)
          .filter((c): c is string => typeof c === "string" && c !== "teilweise")
          .map((c): Check => ["comparison.cell", c, b.comparison.cell]),
      ]),
      ...content.faqContent.flatMap((f): Check[] => [
        ["faq.question", f.q, b.faq.question],
        ["faq.firstSentence", f.a.split(/(?<=[.!?])\s+/)[0], b.faq.firstSentence],
        ["faq.answer", f.a, b.faq.answer],
      ]),
      ["ctaBand.title", content.ctaContent.title, b.ctaBand.title],
      ["ctaBand.text", content.ctaContent.text, b.ctaBand.text],
      ["mediaFigure.caption", content.mediaContent.caption, 90],
    ];
    expect([
      ...violations(checks),
      ...countViolation("FaqList", content.faqContent.length, b.count.faq, "Fragen"),
      ...countViolation("ComparisonTable", t.columns.length, { min: 1, max: b.count.comparison.columns }, "Wertspalten"),
      ...countViolation("ComparisonTable", t.rows.length, { min: 1, max: b.count.comparison.rows }, "Zeilen"),
    ]).toEqual([]);
    expect(content.faqContent.every((f) => f.q.endsWith("?"))).toBe(true);
  });

  it("Mini-UI aller Geräterahmen im MINI_BUDGET (24 Zeichen, 5 Zeilen)", () => {
    const all = scenes();
    expect(all.length).toBeGreaterThanOrEqual(8);
    const checks: Check[] = all.flatMap((s): Check[] => [
      ["mini.row", s.title, MINI_BUDGET.row],
      ["frame.description", s.description, 140],
      ...(s.rows ?? []).flatMap((r): Check[] => [
        ["mini.row", r.primary, MINI_BUDGET.row],
        ["mini.row", r.secondary, MINI_BUDGET.row],
        ["mini.row", r.value, MINI_BUDGET.row],
      ]),
      ...(s.week ?? []).map((w): Check => ["mini.row", w.label, MINI_BUDGET.row]),
      ...(s.timer ? ([["mini.row", s.timer.label, MINI_BUDGET.row], ["mini.row", s.timer.value, MINI_BUDGET.row]] as Check[]) : []),
    ]);
    const tooMany = all
      .filter((s) => (s.rows?.length ?? 0) > MINI_BUDGET.rows || (s.week?.length ?? 0) > MINI_BUDGET.rows)
      .map((s) => `MiniList: höchstens ${MINI_BUDGET.rows} Zeilen erlaubt – ${s.title} kürzen.`);
    expect([...violations(checks), ...tooMany]).toEqual([]);
  });
});

/**
 * Nutzensätze der 22 Detailfunktionen, wörtlich aus 06-UI-SPEC „FeatureCard-Raster“ (16) und
 * 07-UI-SPEC „Namen und Nutzensätze der neuen Funktionen“ (6).
 */
const ERWARTETE_NUTZENSAETZE: Record<string, string> = {
  angebote: "Positionen mit Lohn, Material und Zuschlägen kalkulieren und als PDF mit Briefpapier ausgeben.",
  aufmass: "Räume, Flächen und Abzüge vor Ort erfassen und die Mengen ins Angebot übernehmen.",
  kundenportal: "Kunden sehen freigegebene Angebote, Rechnungen und Termine in einem eigenen Bereich im Browser.",
  plantafel: "Einsätze für das Team planen und die Einsatzorte auf der Karte im Blick behalten.",
  projektverwaltung: "Kunden, Phasen, Aufgaben, Termine und Dokumente bleiben beim jeweiligen Auftrag.",
  arbeitsanweisungen: "Leistungen und Materialbedarf ohne Verkaufspreise für die Ausführung bereitstellen.",
  zeiterfassung: "Arbeitszeit per Timer starten und stoppen, mit Standort erfassen und einem Projekt zuordnen.",
  baudokumentation: "Arbeiten, Fotos und Mängel direkt beim Projekt festhalten und im Büro wiederfinden.",
  lager: "Bestände, Lagerorte und Materialbewegungen nachvollziehbar verwalten.",
  rechnungen: "Abschlags-, Teil- und Schlussrechnungen erstellen und Zahlungseingänge zuordnen.",
  "e-rechnung": "Rechnungen als XRechnung oder ZUGFeRD mit strukturierten Daten ausgeben.",
  buchhaltung: "Belege prüfen und Buchungsdaten samt Belegbezug für DATEV exportieren.",
  eingangsrechnungen: "Belege fotografieren, erkannte Angaben prüfen und Ausgaben einem Projekt zuordnen.",
  nachkalkulation: "Geplante und tatsächliche Kosten je Projekt vergleichen und Abweichungen erkennen.",
  dashboard: "Projekte, offene Beträge, Angebote und Aufgaben auf einen Blick sehen.",
  team: "Mitarbeitende einladen und Zugänge und Rechte passend zur Aufgabe vergeben.",
  gaeb: "Leistungsverzeichnisse per GAEB importieren und exportieren, Artikel per DATANORM einlesen.",
  mahnwesen: "Zahlungserinnerungen mit Fristen, Stufen und Vorlagen einrichten, auf Wunsch automatisch.",
  terminplanung: "Arbeitsabschnitte im Projektplan terminieren und Abhängigkeiten zwischen ihnen sehen.",
  bankabgleich: "Bankdatei importieren und Umsätze mit Belegen und erfassten Zahlungen verbinden.",
  datenuebernahme: "Bestehende Daten aus Dateien prüfen, zuordnen und kontrolliert in CraftOS übernehmen.",
  maengelmanagement: "Mängel mit Foto erfassen und über Status und Zuständigkeit bis zur Erledigung verfolgen.",
};

describe("Phase-6-Budgets und Satzprüfung", () => {
  it("ergänzt die Phase-6-Budgets und lässt den Bestand unverändert", () => {
    expect(TEXT_BUDGET.hero).toEqual({ h1: 60, lead: 110 });
    // Phase 7 ergänzt pageHead um kopfLead/h1/eyebrow (F4, eigener Test unten); lead bleibt 140.
    expect(TEXT_BUDGET.pageHead.lead).toBe(140);
    expect(TEXT_BUDGET.menuGroup).toEqual({ description: 60 });
    expect(TEXT_BUDGET.featureList).toEqual({ name: 32, benefit: 100 });
    expect(TEXT_BUDGET.count.featureList).toEqual({ min: 1, max: 7 });
    expect(TEXT_BUDGET.count.homeSections).toEqual({ min: 6, max: 8 });
    expect(TEXT_BUDGET.sectionHeader).toMatchObject({ eyebrow: 24, title: 60, lead: 140 });
    expect(TEXT_BUDGET.featureCard).toEqual({ title: 32, benefit: 100 });
    expect(TEXT_BUDGET.count.bento).toEqual({ min: 3, max: 7 });
  });

  it("Phase 7 (07-UI-SPEC F4): pageHead mit kopfLead, h1, eyebrow; lead für /funktionen unverändert", () => {
    expect(TEXT_BUDGET.pageHead).toEqual({ lead: 140, kopfLead: 110, h1: 60, eyebrow: 24 });
    expect(TEXT_BUDGET.count.detailSteps).toEqual({ min: 3, max: 5 });
    expect(TEXT_BUDGET.count.related).toEqual({ min: 2, max: 3 });
    expect(() => assertTextBudget("pageHead.kopfLead", "x".repeat(111), TEXT_BUDGET.pageHead.kopfLead)).toThrow(
      "Textbudget überschritten: pageHead.kopfLead hat 111 von 110 Zeichen – Satz kürzen.",
    );
    expect(() => assertTextBudget("pageHead.kopfLead", "x".repeat(110), TEXT_BUDGET.pageHead.kopfLead)).not.toThrow();
  });

  it("Phase 8 (08-UI-SPEC G1–G7): Antwort-, Panel-, Faktenlisten-, OG- und Brotkrumen-Budgets", () => {
    expect(TEXT_BUDGET.answer).toBe(300);
    expect(TEXT_BUDGET.sectionHeader.answerLead).toBe(300);
    expect(TEXT_BUDGET.faq.answerCentral).toBe(300);
    expect(TEXT_BUDGET.fitPanel).toEqual({ title: 40, point: 100 });
    expect(TEXT_BUDGET.factList).toEqual({ term: 32, definition: 200 });
    expect(TEXT_BUDGET.og).toEqual({ title: 90 });
    expect(TEXT_BUDGET.crumb).toEqual({ name: 32 });
    expect(TEXT_BUDGET.count.fitPoints).toEqual({ min: 2, max: 4 });
    expect(TEXT_BUDGET.count.factList).toEqual({ min: 6, max: 12 });
    expect(TEXT_BUDGET.count.crumbs).toEqual({ min: 2, max: 4 });
    // Bestand unverändert
    expect(TEXT_BUDGET.sectionHeader.lead).toBe(140);
    expect(TEXT_BUDGET.faq).toMatchObject({ question: 90, firstSentence: 300, answer: 600 });
    expect(() => assertTextBudget("crumb.name", "x".repeat(33), TEXT_BUDGET.crumb.name)).toThrow(
      "Textbudget überschritten: crumb.name hat 33 von 32 Zeichen – Satz kürzen.",
    );
  });

  it("zählt Sätze an Satzenden vor Leerraum oder Textende", () => {
    expect(sentenceCount("Ein Satz.")).toBe(1);
    expect(sentenceCount("Erster Satz. Zweiter Satz.")).toBe(2);
    expect(sentenceCount("Kalkulieren, Mengen übernehmen")).toBe(0);
    expect(sentenceCount("Wirklich? Ja!")).toBe(2);
  });

  it("assertOneSentence wirft den Fehlertext aus dem UI-SPEC", () => {
    expect(() => assertOneSentence("FeatureList", "Mahnwesen", "A. B.")).toThrow(
      "FeatureList: Nutzen für Mahnwesen hat 2 Sätze – genau einen Satz schreiben.",
    );
    expect(() => assertOneSentence("FeatureList", "Mahnwesen", "Ohne Punkt")).toThrow(
      "FeatureList: Nutzen für Mahnwesen hat 0 Sätze – genau einen Satz schreiben.",
    );
    expect(() => assertOneSentence("FeatureList", "Mahnwesen", "Genau ein Satz.")).not.toThrow();
  });

  it("jede der 22 Detailfunktionen hat genau einen belegten Nutzensatz mit höchstens 100 Zeichen", () => {
    expect(funktionen).toHaveLength(22);
    expect(Object.keys(ERWARTETE_NUTZENSAETZE).sort()).toEqual(funktionen.map((f) => f.slug).sort());
    const problems: string[] = [];
    for (const f of funktionen) {
      if (f.benefit !== ERWARTETE_NUTZENSAETZE[f.slug]) problems.push(`${f.slug}: Nutzensatz weicht ab`);
      if (sentenceCount(f.benefit ?? "") !== 1) problems.push(`${f.slug}: nicht genau ein Satz`);
      if (charCount(f.benefit ?? "") > TEXT_BUDGET.featureCard.benefit) problems.push(`${f.slug}: zu lang`);
    }
    expect(problems).toEqual([]);
  });
});

/**
 * Sammeltest Phase 8 (08-UI-SPEC § 2, G1, G2, C2–C4): Alle Bestandsseiten mit v2-Abschnittsköpfen
 * (Startseite, /app, /funktionen, 22 Detailseiten) rendern mit den neuen Antwort-zuerst-Regeln fehlerfrei.
 * Jede Frage-H2 eines SectionHeader trägt direkt danach einen Antwort-Lead mit data-answer und ≤ 300 Zeichen,
 * jeder Nicht-Frage-Lead bleibt bei ≤ 140 Zeichen und genau einem Satz.
 */
describe("Antwort-zuerst-Regeln über Bestandsinhalte (Phase 8)", () => {
  const seiten: [string, string][] = [
    ["/", renderToString(createElement(Home))],
    ["/app", renderToString(createElement(AppPage))],
    ["/funktionen", renderToString(createElement(FunktionenPage))],
    ...funktionen.map((f): [string, string] => [
      `/funktionen/${f.slug}`,
      renderToString(createElement(FunktionsDetail, { detail: getFunktionsdetail(f.slug) })),
    ]),
    // 08-08/08-09: Alternativen-Seiten (Frage-H2 kosten, fuer-wen, umstieg; Nicht-Frage-H2 vergleich, faq).
    ...(["plancraft", "craftnote", "hero", "tooltime"] as const).map((slug): [string, string] => [
      `/vergleich/${slug}-alternative`,
      renderToString(createElement(AlternativePage, { inhalt: baueAlternative(slug) })),
    ]),
  ];
  const decode = (v: string) =>
    v.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").trim();

  it("29 Seiten rendern; Frage-H2 → Antwort-Lead mit data-answer ≤ 300, sonst Lead ≤ 140 mit einem Satz", () => {
    expect(seiten).toHaveLength(29);
    const problems: string[] = [];
    for (const [pfad, html] of seiten) {
      for (const m of html.matchAll(/<header[^>]*>[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>(<p[^>]*>)([\s\S]*?)<\/p>/g)) {
        const titel = decode(m[1]);
        const lead = decode(m[3]);
        const frage = titel.endsWith("?");
        if (frage && !m[2].includes("data-answer")) problems.push(`${pfad}: ${titel} ohne data-answer`);
        if (!frage && m[2].includes("data-answer")) problems.push(`${pfad}: ${titel} mit data-answer`);
        const max = frage ? TEXT_BUDGET.sectionHeader.answerLead : TEXT_BUDGET.sectionHeader.lead;
        if (charCount(lead) > max) problems.push(`${pfad}: ${titel} Lead ${charCount(lead)} > ${max}`);
        const n = sentenceCount(lead);
        if (frage ? n < 1 || n > 2 : n !== 1) problems.push(`${pfad}: ${titel} Lead mit ${n} Sätzen`);
      }
    }
    expect(problems).toEqual([]);
  });
});

/**
 * Phase 8, Plan 08-07 (08-UI-SPEC § 4): Inhalte der Preisseite aus lib/seiten/preise.ts im Budget –
 * beide Tabellen (Lizenzen, Marktspanne), Zusatzkosten-KeyFacts, App-Lizenz-Kacheln und FAQ (zentral ≤ 300).
 */
describe("Preisseite /preise im Budget (Phase 8)", () => {
  it("Tabellen, KeyFacts, Bento und FAQ der Preisseite halten die Textbudgets und Mengenregeln ein", async () => {
    const p = await import("@/lib/seiten/preise");
    const b = TEXT_BUDGET;
    const tabellen = [p.lizenzTabelle, p.marktspanne];
    const checks: Check[] = [
      ...tabellen.flatMap((t): Check[] =>
        t.rows.flatMap((r): Check[] => [
          ["comparison.rowLabel", r.label, b.comparison.rowLabel],
          ...Object.values(r.cells)
            .filter((c): c is string => typeof c === "string" && c !== "teilweise")
            .map((c): Check => ["comparison.cell", c, b.comparison.cell]),
        ]),
      ),
      ...p.zusatzkostenFakten.facts.flatMap((f): Check[] => [
        ["keyFact.value", f.value, b.keyFact.value],
        ["keyFact.label", f.label, b.keyFact.label],
      ]),
      ...p.appLizenzKacheln.flatMap((t): Check[] => [
        ["bentoTile.title", t.title, b.bentoTile.title],
        [
          t.size === "lg" ? "bentoTile.textLarge" : "bentoTile.textSmall",
          t.text,
          t.size === "lg" ? b.bentoTile.textLarge : b.bentoTile.textSmall,
        ],
      ]),
      ...p.preiseFaq.flatMap((f): Check[] => [
        ["faq.question", f.q, b.faq.question],
        ["faq.answerCentral", f.a, b.faq.answerCentral],
      ]),
      ["ctaBand.title", p.preiseSections.cta.title, b.ctaBand.title],
      ["ctaBand.text", p.preiseSections.cta.text, b.ctaBand.text],
    ];
    expect([
      ...violations(checks),
      ...tabellen.flatMap((t) => [
        ...countViolation("ComparisonTable", t.columns.length, { min: 1, max: b.count.comparison.columns }, "Wertspalten"),
        ...countViolation("ComparisonTable", t.rows.length, { min: 1, max: b.count.comparison.rows }, "Zeilen"),
      ]),
      ...countViolation("KeyFacts", p.zusatzkostenFakten.facts.length, b.count.keyFacts, "Fakten"),
      ...countViolation("BentoGrid", p.appLizenzKacheln.length, b.count.bento, "Kacheln"),
      ...countViolation("FaqList", p.preiseFaq.length, b.count.faq, "Fragen"),
    ]).toEqual([]);
    expect(p.lizenzTabelle.rows).toHaveLength(12);
    expect(p.marktspanne.columns.some((c) => "highlight" in c && c.highlight)).toBe(false);
  });
});

/**
 * Sammeltest 08-12: Inhalte der Kernseiten /fakten-ueber-craftos, /craft-ai und /gobd (lib/seiten/*) im Budget
 * der Bausteine (G1, G2, G4, G5, C3). Dynamische Imports halten die Importliste oben für parallele Pläne stabil.
 */
describe("Kernseiten Fakten, Craft AI, GoBD im Budget (08-12)", () => {
  it("Abschnitte, Kacheln, Schritte, KeyFacts, FactList, FitPanels und FAQ im Budget", async () => {
    const fakten = await import("@/lib/seiten/fakten");
    const craftAi = await import("@/lib/seiten/craft-ai");
    const gobd = await import("@/lib/seiten/gobd");
    const checks: Check[] = [];
    const out: string[] = [];
    const leads = (sections: Record<string, { title: string; lead: string }>) => {
      for (const { title, lead } of Object.values(sections)) {
        checks.push(["sectionHeader.title", title, TEXT_BUDGET.sectionHeader.title]);
        const frage = title.endsWith("?");
        checks.push(
          frage
            ? ["sectionHeader.answerLead", lead, TEXT_BUDGET.sectionHeader.answerLead]
            : ["sectionHeader.lead", lead, TEXT_BUDGET.sectionHeader.lead],
        );
      }
    };
    const kopf = (k: { eyebrow: string; lead: string }) => {
      checks.push(["pageHead.eyebrow", k.eyebrow, TEXT_BUDGET.pageHead.eyebrow]);
      checks.push(["pageHead.kopfLead", k.lead, TEXT_BUDGET.pageHead.kopfLead]);
    };
    const kacheln = (tiles: { size: string; title: string; text: string }[]) => {
      out.push(...countViolation("BentoGrid", tiles.length, TEXT_BUDGET.count.bento, "Kacheln"));
      for (const t of tiles) {
        checks.push(["bentoTile.title", t.title, TEXT_BUDGET.bentoTile.title]);
        const gross = t.size === "lg" || t.size === "wide";
        checks.push(
          gross
            ? ["bentoTile.textLarge", t.text, TEXT_BUDGET.bentoTile.textLarge]
            : ["bentoTile.textSmall", t.text, TEXT_BUDGET.bentoTile.textSmall],
        );
      }
    };
    const schritte = (steps: { title: string; text: string }[]) => {
      out.push(...countViolation("StepFlow", steps.length, TEXT_BUDGET.count.steps, "Schritte"));
      for (const s of steps) {
        checks.push(["step.title", s.title, TEXT_BUDGET.step.title], ["step.text", s.text, TEXT_BUDGET.step.text]);
      }
    };
    const kennzahlen = (facts: { value: string; label: string }[]) => {
      out.push(...countViolation("KeyFacts", facts.length, TEXT_BUDGET.count.keyFacts, "Fakten"));
      for (const f of facts) {
        checks.push(["keyFact.value", f.value, TEXT_BUDGET.keyFact.value], ["keyFact.label", f.label, TEXT_BUDGET.keyFact.label]);
      }
    };
    const faq = (items: { q: string; a: string }[]) => {
      out.push(...countViolation("FaqList", items.length, TEXT_BUDGET.count.faq, "Fragen"));
      for (const i of items) {
        checks.push(["faq.question", i.q, TEXT_BUDGET.faq.question], ["faq.answerCentral", i.a, TEXT_BUDGET.faq.answerCentral]);
      }
    };

    kopf(fakten.faktenKopf);
    leads(fakten.faktenSections);
    kennzahlen(fakten.faktenKeyFacts.facts);
    out.push(...countViolation("FactList", fakten.produktfakten.length, TEXT_BUDGET.count.factList, "Einträge"));
    for (const f of fakten.produktfakten) {
      checks.push(["factList.term", f.term, TEXT_BUDGET.factList.term]);
      checks.push(["factList.definition", f.definition, TEXT_BUDGET.factList.definition]);
      if (sentenceCount(f.definition) > 2) out.push(`FactList: ${f.term} hat mehr als zwei Sätze`);
    }
    kacheln(fakten.faktenKacheln);
    faq(fakten.faktenFaq);

    kopf(craftAi.craftAiKopf);
    leads(craftAi.craftAiSections);
    schritte(craftAi.craftAiSteps);
    kennzahlen(craftAi.craftAiKeyFacts.facts);
    kacheln(craftAi.craftAiGrenzen);
    faq(craftAi.craftAiFaq);

    kopf(gobd.gobdKopf);
    leads(gobd.gobdSections);
    kacheln(gobd.gobdKacheln);
    schritte(gobd.gobdSteps);
    for (const panel of gobd.gobdPanels) {
      checks.push(["fitPanel.title", panel.title, TEXT_BUDGET.fitPanel.title]);
      out.push(...countViolation("FitPanels", panel.points.length, TEXT_BUDGET.count.fitPoints, "Punkte"));
      for (const p of panel.points) checks.push(["fitPanel.point", p.text, TEXT_BUDGET.fitPanel.point]);
    }
    faq(gobd.gobdFaq);

    expect([...out, ...violations(checks)]).toEqual([]);
  });
});

/**
 * Sammeltest 08-10 (08-UI-SPEC § 5.1, C5): Inhalte des Vergleichs-Hubs /vergleich aus lib/seiten/vergleich.ts im Budget –
 * Kopfantwort, Abschnittsköpfe, Marktübersicht (ohne highlight), Einzelvergleich-Kacheln, StepFlow und FAQ (zentral ≤ 300).
 */
describe("Vergleichs-Hub /vergleich im Budget (08-10)", () => {
  it("Kopf, Tabelle, Kacheln, Schritte und FAQ halten Textbudgets und Mengenregeln ein", async () => {
    const { vergleich } = await import("@/lib/seiten/vergleich");
    const b = TEXT_BUDGET;
    const t = vergleich.ueberblick.tabelle;
    const checks: Check[] = [
      ["answer", vergleich.kopf.answer, b.answer],
      ["pageHead.eyebrow", vergleich.kopf.eyebrow, b.pageHead.eyebrow],
      ...Object.values(vergleich.sections).flatMap(({ title, lead }): Check[] => [
        ["sectionHeader.title", title, b.sectionHeader.title],
        title.endsWith("?")
          ? ["sectionHeader.answerLead", lead, b.sectionHeader.answerLead]
          : ["sectionHeader.lead", lead, b.sectionHeader.lead],
      ]),
      ...t.rows.flatMap((r): Check[] => [
        ["comparison.rowLabel", r.label, b.comparison.rowLabel],
        ...Object.values(r.cells)
          .filter((c): c is string => typeof c === "string" && c !== "teilweise")
          .map((c): Check => ["comparison.cell", c, b.comparison.cell]),
      ]),
      ...vergleich.einzelvergleiche.kacheln.flatMap((k): Check[] => [
        ["bentoTile.title", k.title, b.bentoTile.title],
        k.size === "wide"
          ? ["bentoTile.textLarge", k.text, b.bentoTile.textLarge]
          : ["bentoTile.textSmall", k.text, b.bentoTile.textSmall],
      ]),
      ...vergleich.schritte.flatMap((s): Check[] => [
        ["step.title", s.title, b.step.title],
        ["step.text", s.text, b.step.text],
      ]),
      ...vergleich.faq.flatMap((f): Check[] => [
        ["faq.question", f.q, b.faq.question],
        ["faq.answerCentral", f.a, b.faq.answerCentral],
      ]),
      ["ctaBand.title", vergleich.cta.title, b.ctaBand.title],
      ["ctaBand.text", vergleich.cta.text, b.ctaBand.text],
    ];
    const saetze = [vergleich.kopf.answer, ...Object.values(vergleich.sections).map((s) => s.lead)].filter(
      (s) => sentenceCount(s) > 2,
    );
    expect([
      ...violations(checks),
      ...countViolation("ComparisonTable", t.columns.length, { min: 1, max: b.count.comparison.columns }, "Wertspalten"),
      ...countViolation("ComparisonTable", t.rows.length, { min: 1, max: b.count.comparison.rows }, "Zeilen"),
      ...countViolation("BentoGrid", vergleich.einzelvergleiche.kacheln.length, b.count.bento, "Kacheln"),
      ...countViolation("StepFlow", vergleich.schritte.length, b.count.steps, "Schritte"),
      ...countViolation("FaqList", vergleich.faq.length, b.count.faq, "Fragen"),
      ...saetze,
    ]).toEqual([]);
    expect(t.columns.some((c) => c.highlight)).toBe(false);
  });
});

/**
 * Sammeltest 08-11 (08-UI-SPEC § 6, § 9, C5): Inhalte der Seite /vergleich/handwerkersoftware-kleine-betriebe aus
 * lib/seiten/kleine-betriebe.ts im Budget – Kopfantwort, Abschnittsköpfe (Frage-H2 ≤ 300), Kriterienkacheln,
 * Anbietertabelle (ohne highlight), StepFlow, FAQ (zentral ≤ 300) und CtaBand.
 */
describe("Kleine Betriebe im Budget (08-11)", () => {
  it("Kopf, Kacheln, Tabelle, Schritte und FAQ halten Textbudgets und Mengenregeln ein", async () => {
    const { kleineBetriebe: kb } = await import("@/lib/seiten/kleine-betriebe");
    const b = TEXT_BUDGET;
    const t = kb.anbieter.tabelle;
    const checks: Check[] = [
      ["answer", kb.kopf.answer, b.answer],
      ["pageHead.eyebrow", kb.kopf.eyebrow, b.pageHead.eyebrow],
      ...Object.values(kb.sections).flatMap(({ title, lead }): Check[] => [
        ["sectionHeader.title", title, b.sectionHeader.title],
        title.endsWith("?")
          ? ["sectionHeader.answerLead", lead, b.sectionHeader.answerLead]
          : ["sectionHeader.lead", lead, b.sectionHeader.lead],
      ]),
      ...t.rows.flatMap((r): Check[] => [
        ["comparison.rowLabel", r.label, b.comparison.rowLabel],
        ...Object.values(r.cells)
          .filter((c): c is string => typeof c === "string" && c !== "teilweise")
          .map((c): Check => ["comparison.cell", c, b.comparison.cell]),
      ]),
      ...t.columns.map((c): Check => ["comparison.rowLabel", c.label, b.comparison.rowLabel]),
      ...kb.kriterien.kacheln.flatMap((k): Check[] => [
        ["bentoTile.title", k.title, b.bentoTile.title],
        ["bentoTile.textSmall", k.text, b.bentoTile.textSmall],
      ]),
      ...kb.schritte.flatMap((s): Check[] => [
        ["step.title", s.title, b.step.title],
        ["step.text", s.text, b.step.text],
      ]),
      ...kb.faq.flatMap((f): Check[] => [
        ["faq.question", f.q, b.faq.question],
        ["faq.answerCentral", f.a, b.faq.answerCentral],
      ]),
      ["ctaBand.title", kb.cta.title, b.ctaBand.title],
      ["ctaBand.text", kb.cta.text, b.ctaBand.text],
    ];
    const saetze = [kb.kopf.answer, ...Object.values(kb.sections).map((s) => s.lead)].filter((s) => sentenceCount(s) > 2);
    expect([
      ...violations(checks),
      ...countViolation("ComparisonTable", t.columns.length, { min: 1, max: b.count.comparison.columns }, "Wertspalten"),
      ...countViolation("ComparisonTable", t.rows.length, { min: 1, max: b.count.comparison.rows }, "Zeilen"),
      ...countViolation("BentoGrid", kb.kriterien.kacheln.length, b.count.bento, "Kacheln"),
      ...countViolation("StepFlow", kb.schritte.length, b.count.steps, "Schritte"),
      ...countViolation("FaqList", kb.faq.length, b.count.faq, "Fragen"),
      ...saetze,
    ]).toEqual([]);
    expect(kb.kriterien.kacheln).toHaveLength(6);
    expect(kb.schritte).toHaveLength(4);
    expect(kb.faq).toHaveLength(4);
    expect(t.columns.some((c) => c.highlight)).toBe(false);
  });
});

describe("Phase 9 (09-UI-SPEC G8–G10)", () => {
  it("ergänzt LinkKarten-, Gewerke- und Artikelbudgets samt Mengen additiv", () => {
    expect(TEXT_BUDGET.linkKarte).toEqual({ label: 24, title: 100, text: 160, meta: 32 });
    expect(TEXT_BUDGET.gewerk).toEqual({ teaser: 100, exampleTitle: 40, example: 200 });
    expect(TEXT_BUDGET.artikel).toEqual({ h1: 100, heading: 80, step: 160 });
    expect(TEXT_BUDGET.count.linkKarten).toEqual({ min: 1, max: 60 });
    expect(TEXT_BUDGET.count.gewerkSteps).toEqual({ min: 4, max: 5 });
    expect(TEXT_BUDGET.count.gewerkFunktionen).toEqual({ min: 4, max: 6 });
    expect(TEXT_BUDGET.count.gewerkFaq).toEqual({ min: 3, max: 4 });
    expect(TEXT_BUDGET.count.gewerkArtikel).toEqual({ min: 2, max: 3 });
    expect(TEXT_BUDGET.count.artikelSchritte).toEqual({ min: 2, max: 10 });
    expect(TEXT_BUDGET.count.artikelFunktionen).toEqual({ min: 1, max: 3 });
    expect(TEXT_BUDGET.count.artikelVerwandt).toEqual({ min: 1, max: 4 });
  });

  it("Bestand unverändert (Phasen 5–8)", () => {
    expect(TEXT_BUDGET.answer).toBe(300);
    expect(TEXT_BUDGET.pageHead).toEqual({ lead: 140, kopfLead: 110, h1: 60, eyebrow: 24 });
    expect(TEXT_BUDGET.step).toEqual({ title: 28, text: 80 });
    expect(TEXT_BUDGET.faq).toEqual({ question: 90, firstSentence: 300, answer: 600, answerCentral: 300 });
    expect(TEXT_BUDGET.count.steps).toEqual({ min: 3, max: 6 });
    expect(TEXT_BUDGET.count.faq).toEqual({ min: 3, max: 8 });
    expect(TEXT_BUDGET.count.related).toEqual({ min: 2, max: 3 });
    expect(TEXT_BUDGET.count.crumbs).toEqual({ min: 2, max: 4 });
  });

  it("Fehlertexte der neuen Felder folgen dem UI-SPEC", () => {
    expect(() => assertTextBudget("linkKarte.title", "x".repeat(101), TEXT_BUDGET.linkKarte.title)).toThrow(
      "Textbudget überschritten: linkKarte.title hat 101 von 100 Zeichen – Satz kürzen.",
    );
    expect(() => assertCount("LinkKarten", 0, TEXT_BUDGET.count.linkKarten, "Einträge")).toThrow(
      "LinkKarten: mindestens 1 Einträge erforderlich – Inhalte in lib/… ergänzen.",
    );
    expect(() => assertTextBudget("artikel.h1", "x".repeat(101), TEXT_BUDGET.artikel.h1)).toThrow(
      "Textbudget überschritten: artikel.h1 hat 101 von 100 Zeichen – Satz kürzen.",
    );
  });
});

describe("Leitlinie L-1 (09-UI-SPEC § 5, lib/leitlinie-l1.json)", () => {
  it("Wortliste, Altbegriffe und abschließende Ausnahmen mit Begründung", () => {
    expect(leitlinieL1.woerter).toEqual(
      expect.arrayContaining(["nicht unterstützt", "DATANORM v5", "Onlinezahlung", "Bald verfügbar", "ersetzt keinen"]),
    );
    expect(leitlinieL1.woerter).toHaveLength(19);
    expect(leitlinieL1.altbegriffe).toEqual(expect.arrayContaining(["Neue Phase", "Admin-Lizenz", "Büro-Lizenz"]));
    expect(leitlinieL1.ausnahmen).toHaveLength(3);
    for (const a of leitlinieL1.ausnahmen) expect(a.begruendung.length, a.id).toBeGreaterThan(20);
    expect(l1Woerter).toEqual([...leitlinieL1.woerter, ...leitlinieL1.altbegriffe]);
  });

  it("l1Treffer findet jedes Wort und jeden Altbegriff, ohne Groß-/Kleinschreibung", () => {
    for (const wort of l1Woerter) {
      // „keine Onlinezahlung“ enthält zusätzlich „Onlinezahlung“ – daher toContain statt toEqual.
      expect(l1Treffer(`Vorher ${wort.toUpperCase()} danach.`), wort).toContain(wort);
      expect(l1Treffer(`(${wort.toLowerCase()})`), wort).toContain(wort);
    }
  });

  it("Wortgrenzen: „Onlinezahlung“ wird gefunden, „Überweisung“ und Wortteile nicht", () => {
    expect(l1Treffer("Im Portal gibt es Onlinezahlung.")).toEqual(["Onlinezahlung"]);
    expect(l1Treffer("Der Kunde zahlt per Überweisung auf das Konto.")).toEqual([]);
    expect(l1Treffer("Onlinezahlungen")).toEqual([]);
    expect(l1Treffer("DATANORM v50")).toEqual([]);
    expect(l1Treffer("Über „Teamleitung (Zeiten für andere)“ buchen.")).toEqual(["Teamleitung (Zeiten für andere)"]);
    expect(l1Treffer("Das ist nicht unterstützt und Bald verfügbar.")).toEqual(["nicht unterstützt", "Bald verfügbar"]);
  });
});
