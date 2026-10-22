/**
 * Kernseiten /fakten-ueber-craftos, /craft-ai und /gobd (Plan 08-12; D-09, D-12, D-25; 08-UI-SPEC §§ 5.2–5.4, § 9).
 * Inhalte stehen budgetgeprüft in lib/seiten/{fakten,craft-ai,gobd}.ts; Preise, Credits, Testtage und Sprachenzahl
 * kommen aus lib/site.ts und dem Produktregister. Wortregeln (T-08-32): keine behördliche GoBD-Zertifizierung,
 * kein autonomes Verbuchen durch Craft AI, Offline nur „Teilweise“.
 */
import fs from "node:fs";
import path from "node:path";
import { createElement, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { KEY_FACT_SOURCE } from "@/components/v2/KeyFacts";
import { euro, germanDate } from "@/lib/format";
import { funktionen } from "@/lib/funktionen";
import { getFunktionsgruppen } from "@/lib/funktionsgruppen";
import { mobileLocales, mobileOffline } from "@/lib/product-register";
import { webPageSchema } from "@/lib/schema";
import { creditPakete, creditWertEuro, site, startCredits, tarife } from "@/lib/site";
import { zielwerte } from "@/lib/seo-meta";
import * as craftAi from "@/lib/seiten/craft-ai";
import * as fakten from "@/lib/seiten/fakten";
import * as gobd from "@/lib/seiten/gobd";

const root = path.resolve(import.meta.dirname, "..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const tarif = (id: "voll" | "app") => tarife.find((t) => t.id === id)!;
const NBSP = " ";
const MODULE = ["lib/seiten/fakten.ts", "lib/seiten/craft-ai.ts", "lib/seiten/gobd.ts"] as const;

/** Alle Zeichenketten eines Moduls (rekursiv über exportierte Werte), für Wortregeln. */
function texte(mod: Record<string, unknown>): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  Object.values(mod).forEach(walk);
  return out;
}

/** Frage-H2 → Antwort ≤ 300, 1–2 Sätze; sonst Lead ≤ 140, genau ein Satz (08-UI-SPEC § 9, G2). */
function abschnittsProbleme(sections: Record<string, { title: string; lead: string }>): string[] {
  const problems: string[] = [];
  for (const [id, { title, lead }] of Object.entries(sections)) {
    if (charCount(title) > TEXT_BUDGET.sectionHeader.title) problems.push(`${id}: H2 ${charCount(title)} Zeichen`);
    const frage = title.endsWith("?");
    const max = frage ? TEXT_BUDGET.sectionHeader.answerLead : TEXT_BUDGET.sectionHeader.lead;
    if (charCount(lead) > max) problems.push(`${id}: Lead ${charCount(lead)} > ${max}`);
    const n = sentenceCount(lead);
    if (frage ? n < 1 || n > 2 : n !== 1) problems.push(`${id}: Lead mit ${n} Sätzen`);
  }
  return problems;
}

function faqProbleme(items: { q: string; a: string }[]): string[] {
  return items.flatMap(({ q, a }) => [
    ...(q.endsWith("?") ? [] : [`${q}: kein Fragezeichen`]),
    ...(charCount(q) > TEXT_BUDGET.faq.question ? [`${q}: Frage zu lang`] : []),
    ...(charCount(a) > TEXT_BUDGET.faq.answerCentral ? [`${q}: Antwort ${charCount(a)} > 300`] : []),
  ]);
}

function kopfProbleme(kopf: { eyebrow: string; kopfwort: string; lead: string; secondary: { label: string; href: string } }, pfad: string) {
  const problems: string[] = [];
  if (charCount(kopf.eyebrow) > TEXT_BUDGET.pageHead.eyebrow) problems.push("Eyebrow zu lang");
  if (charCount(kopf.lead) > TEXT_BUDGET.pageHead.kopfLead) problems.push(`Lead ${charCount(kopf.lead)} > 110`);
  if (sentenceCount(kopf.lead) !== 1) problems.push("Lead nicht genau ein Satz");
  if (!zielwerte(pfad).h1.includes(kopf.kopfwort)) problems.push(`Kopfwort ${kopf.kopfwort} fehlt in der H1`);
  return problems;
}

describe("Fakten über CraftOS (§ 5.2, D-25)", () => {
  it("Abschnittsfolge und Flächen", () => {
    expect(fakten.FAKTEN_PFAD).toBe("/fakten-ueber-craftos");
    expect(fakten.FAKTEN_SECTION_IDS).toEqual(["kopf", "was-ist-craftos", "produktfakten", "funktionen", "faq", "cta"]);
    expect(fakten.FAKTEN_SECTION_IDS.map((id) => fakten.FAKTEN_SURFACES[id])).toEqual([
      "dark",
      "white",
      "warm",
      "white",
      "warm",
      "dark",
    ]);
  });

  it("Kopf: Eyebrow „Fakten“, Kopfwort „CraftOS“, Lead ≤ 110, Sekundärlink „Preise ansehen“", () => {
    expect(fakten.faktenKopf.eyebrow).toBe("Fakten");
    expect(fakten.faktenKopf.kopfwort).toBe("CraftOS");
    expect(fakten.faktenKopf.lead).toBe(
      "Überprüfbare Angaben zu Produkt, Plattformen, Lizenzen und Grenzen der Handwerkersoftware CraftOS.",
    );
    expect(fakten.faktenKopf.secondary).toEqual({ label: "Preise ansehen", href: "/preise" });
    expect(kopfProbleme(fakten.faktenKopf, fakten.FAKTEN_PFAD)).toEqual([]);
  });

  it("„Was ist CraftOS?“ wird direkt in ≤ 300 Zeichen beantwortet (Prompt #6)", () => {
    const s = fakten.faktenSections["was-ist-craftos"];
    expect(s.title).toBe("Was ist CraftOS?");
    expect(s.lead).toBe(
      "CraftOS ist eine Handwerkersoftware von craftos.eu für Betriebe in Deutschland: Angebote, Plantafel, Zeiterfassung, Rechnungen und Buchhaltungsvorbereitung in einer Web-App und einer Mobile-App für iOS und Android.",
    );
    expect(fakten.faktenSections.produktfakten.title).toBe("Produktfakten im Überblick");
    expect(fakten.faktenSections.funktionen.title).toBe("Welche Funktionen hat CraftOS?");
    expect(fakten.faktenSections.faq.title).toBe("Häufige Fragen zu CraftOS");
    expect(abschnittsProbleme(fakten.faktenSections)).toEqual([]);
  });

  it("KeyFacts aus Daten: 3 Plattformen, Sprachen, Testtage, Voll-Lizenz", () => {
    const facts = fakten.faktenKeyFacts.facts;
    expect(facts.map((f) => f.value)).toEqual([
      "3",
      String(mobileLocales.length),
      `${site.trialDays}${NBSP}Tage`,
      euro(tarif("voll").monat),
    ]);
    expect(facts.map((f) => f.label)).toEqual([
      "Plattformen: Web, iOS und Android",
      "Sprachen in der Mobile-App",
      "Testphase ohne Zahlungsdaten",
      "Voll-Lizenz pro Person und Monat, netto",
    ]);
    for (const f of facts) {
      expect(f.source).toMatch(KEY_FACT_SOURCE);
      expect(f.source).toMatch(/^(site|register):/);
    }
    expect(fakten.faktenKeyFacts.note.trim().length).toBeGreaterThan(0);
  });

  it("Abgrenzung wörtlich, sachlich, ohne Links (D-25)", () => {
    expect(fakten.ABGRENZUNG).toBe(
      "Nicht zu verwechseln: CraftOS-PC und das CraftOS der Minecraft-Erweiterung ComputerCraft sind eigenständige Projekte mit gleichem Namen und gehören nicht zu dieser Handwerkersoftware.",
    );
    expect(read("lib/seiten/fakten.ts")).not.toMatch(/https?:\/\/[^"`]*(craftos-pc|computercraft)/i);
  });

  it("Produktfakten: 12 Einträge laut UI-SPEC, je ≤ 200 Zeichen und ≤ 2 Sätze, Werte aus Daten", () => {
    const items = fakten.produktfakten;
    expect(items.map((i) => i.term)).toEqual([
      "Plattformen",
      "Voll-Lizenz",
      "App-Lizenz",
      "Testphase",
      "Module",
      "GoBD-Unterstützung",
      "Offline-Nutzung",
      "Standort bei der Zeiterfassung",
      "Einsatzkarte",
      "Unterschriften mit Standort",
      "KI",
      "Nicht zugesagt",
    ]);
    for (const { term, definition } of items) {
      expect(charCount(term), term).toBeLessThanOrEqual(TEXT_BUDGET.factList.term);
      expect(charCount(definition), term).toBeLessThanOrEqual(TEXT_BUDGET.factList.definition);
      expect(sentenceCount(definition), term).toBeLessThanOrEqual(2);
    }
    const def = (term: string) => items.find((i) => i.term === term)!.definition;
    const voll = tarif("voll");
    const app = tarif("app");
    expect(def("Voll-Lizenz")).toContain(euro(voll.monat));
    expect(def("Voll-Lizenz")).toContain(euro(voll.jahr));
    expect(def("App-Lizenz")).toContain(euro(app.monat));
    expect(def("App-Lizenz")).toContain(euro(app.jahr));
    expect(def("Testphase")).toContain(`${site.trialDays} Tage`);
    expect(def("Offline-Nutzung").startsWith("Teilweise")).toBe(true);
    expect(def("Offline-Nutzung")).toContain(mobileOffline.limitation);
    expect(def("Standort bei der Zeiterfassung")).toMatch(/keine Bewegungsverläufe|Bewegungsverläufe werden nicht/);
    const nicht = def("Nicht zugesagt");
    for (const punkt of ["Portal-Onlinezahlung", "DATANORM-v5", "ELSTER", "autonome Buchhaltung"]) expect(nicht).toContain(punkt);
    expect(nicht).toMatch(/nicht/);
  });

  it("Stand-Zeile mit Datum aus site.checkedAt und Korrektur per E-Mail", () => {
    expect(fakten.faktenStand.text).toBe(`Stand ${germanDate(site.checkedAt)}. Fehler gefunden?`);
    expect(fakten.faktenStand.link).toEqual({ label: "Korrektur melden", href: `mailto:${site.email}` });
  });

  it("Funktionen: sechs Gruppenkacheln mit Sprungziel, Antwort mit Seitenzahl aus den Daten", () => {
    const gruppen = getFunktionsgruppen();
    expect(fakten.faktenKacheln.map((k) => k.title)).toEqual(gruppen.map((g) => g.label));
    expect(fakten.faktenKacheln.map((k) => k.text)).toEqual(gruppen.map((g) => g.description));
    expect(fakten.faktenKacheln.map((k) => k.href)).toEqual(gruppen.map((g) => `/funktionen#${g.id}`));
    expect(new Set(fakten.faktenKacheln.map((k) => k.size)).size).toBeGreaterThanOrEqual(2);
    expect(fakten.faktenSections.funktionen.lead).toBe(
      `CraftOS bündelt ${funktionen.length} Funktionsseiten in sechs Arbeitsabläufen von Angebot bis Team; jede Seite nennt Plattformen, Rollen und Lizenzen.`,
    );
  });

  it("FAQ: vier Antworten ≤ 300; Offline „Teilweise.“, GoBD ohne Zertifizierungsbehauptung, Standort ohne Verlauf", () => {
    expect(fakten.faktenFaq.map((f) => f.q)).toEqual([
      "Wer bietet CraftOS an?",
      "Funktioniert CraftOS offline?",
      "Unterstützt CraftOS die GoBD?",
      "Zeichnet CraftOS Bewegungen meiner Mitarbeitenden auf?",
    ]);
    expect(faqProbleme(fakten.faktenFaq)).toEqual([]);
    expect(fakten.faktenFaq[1].a.startsWith("Teilweise.")).toBe(true);
    expect(fakten.faktenFaq[2].a).toContain("eine behördliche Zertifizierung wird nicht behauptet");
    expect(fakten.faktenFaq[3].a.startsWith("Nein.")).toBe(true);
  });
});

describe("Craft AI (§ 5.3)", () => {
  it("Abschnittsfolge, Flächen und Kopf", () => {
    expect(craftAi.CRAFT_AI_PFAD).toBe("/craft-ai");
    expect(craftAi.CRAFT_AI_SECTION_IDS).toEqual(["kopf", "so-arbeitet-craft-ai", "kosten", "grenzen", "faq", "cta"]);
    expect(craftAi.CRAFT_AI_SECTION_IDS.map((id) => craftAi.CRAFT_AI_SURFACES[id])).toEqual([
      "dark",
      "white",
      "warm",
      "white",
      "warm",
      "dark",
    ]);
    expect(craftAi.craftAiKopf.eyebrow).toBe("Craft AI");
    expect(craftAi.craftAiKopf.kopfwort).toBe("Handwerk:");
    expect(craftAi.craftAiKopf.secondary).toEqual({
      label: "Anleitung in der Hilfe",
      href: "/hilfe/ki-entwurf-pruefen-uebernehmen",
    });
    expect(kopfProbleme(craftAi.craftAiKopf, craftAi.CRAFT_AI_PFAD)).toEqual([]);
  });

  it("drei Frage-Abschnitte mit Antworten ≤ 300, FAQ-Abschnitt mit Lead", () => {
    const s = craftAi.craftAiSections;
    expect(s["so-arbeitet-craft-ai"].title).toBe("Wie arbeitet Craft AI?");
    expect(s.kosten.title).toBe("Was kostet Craft AI?");
    expect(s.grenzen.title).toBe("Was übernimmt Craft AI nicht?");
    expect(s.faq.title).toBe("Häufige Fragen zu Craft AI");
    expect(abschnittsProbleme(s)).toEqual([]);
    expect(s.grenzen.lead.startsWith("Craft AI bucht nicht selbstständig")).toBe(true);
  });

  it("Ablauf: drei Schritte bis zur Bestätigung", () => {
    expect(craftAi.craftAiSteps.map((st) => st.title)).toEqual(["Frage stellen", "Entwurf erhalten", "Prüfen und bestätigen"]);
    for (const st of craftAi.craftAiSteps) {
      expect(charCount(st.title)).toBeLessThanOrEqual(TEXT_BUDGET.step.title);
      expect(charCount(st.text)).toBeLessThanOrEqual(TEXT_BUDGET.step.text);
    }
  });

  it("Kosten aus startCredits, creditWertEuro und kleinstem Credit-Paket", () => {
    const kleinstes = Math.min(...creditPakete.map((p) => p.preis));
    const facts = craftAi.craftAiKeyFacts.facts;
    expect(facts.map((f) => f.value)).toEqual([
      String(startCredits),
      euro(creditWertEuro),
      `ab ${kleinstes}${NBSP}€`,
    ]);
    for (const f of facts) expect(f.source).toMatch(/^site:[A-Za-z0-9.-]+$/);
    expect(craftAi.craftAiSections.kosten.lead).toContain(`einmalig ${startCredits} Credits`);
    expect(craftAi.craftAiSections.kosten.lead).toContain(euro(creditWertEuro));
    expect(craftAi.craftAiKeyFacts.note).toContain(germanDate(site.checkedAt));
  });

  it("Grenzen: drei Kacheln, mindestens zwei Größen, kein autonomes Verbuchen als Zusage", () => {
    expect(craftAi.craftAiGrenzen.map((k) => k.title)).toEqual([
      "Mengen und Preise prüfen",
      "Kein autonomes Verbuchen",
      "Zugriff nach Rolle",
    ]);
    expect(new Set(craftAi.craftAiGrenzen.map((k) => k.size)).size).toBeGreaterThanOrEqual(2);
  });

  it("FAQ: drei Antworten ≤ 300", () => {
    expect(craftAi.craftAiFaq.map((f) => f.q)).toEqual([
      "Kann Craft AI Angebote erstellen?",
      "Welche Daten nutzt Craft AI?",
      "Kann ich Craft AI per Sprache nutzen?",
    ]);
    expect(faqProbleme(craftAi.craftAiFaq)).toEqual([]);
  });
});

describe("GoBD (§ 5.4)", () => {
  it("Abschnittsfolge, Flächen und Kopf", () => {
    expect(gobd.GOBD_PFAD).toBe("/gobd");
    expect(gobd.GOBD_SECTION_IDS).toEqual(["kopf", "funktionen", "ablauf", "zertifizierung", "faq", "cta"]);
    expect(gobd.GOBD_SECTION_IDS.map((id) => gobd.GOBD_SURFACES[id])).toEqual([
      "dark",
      "white",
      "warm",
      "white",
      "warm",
      "dark",
    ]);
    expect(gobd.gobdKopf.eyebrow).toBe("GoBD");
    expect(gobd.gobdKopf.kopfwort).toBe("GoBD-konforme");
    expect(gobd.gobdKopf.secondary).toEqual({ label: "Anleitung in der Hilfe", href: "/hilfe/rechnung-fertigstellen" });
    expect(kopfProbleme(gobd.gobdKopf, gobd.GOBD_PFAD)).toEqual([]);
  });

  it("Abschnitte: Frage-H2 mit Antwort, Ablauf als Nicht-Frage, Zertifizierung beginnt mit „Nein.“", () => {
    const s = gobd.gobdSections;
    expect(s.funktionen.title).toBe("Wie unterstützt CraftOS GoBD-konforme Abläufe?");
    expect(s.ablauf.title).toBe("Ein typischer Ablauf bis zur Übergabe");
    expect(s.zertifizierung.title).toBe("Ist CraftOS GoBD-zertifiziert?");
    expect(s.zertifizierung.lead.startsWith("Nein.")).toBe(true);
    expect(sentenceCount(s.zertifizierung.lead)).toBe(2);
    expect(s.faq.title).toBe("Häufige Fragen zur GoBD");
    expect(abschnittsProbleme(s)).toEqual([]);
  });

  it("sechs Kacheln mit Bestandstiteln und -zielen, je ein Satz", () => {
    expect(gobd.gobdKacheln.map((k) => [k.title, k.href])).toEqual([
      ["Rechnungen verbindlich festschreiben", "/hilfe/rechnung-fertigstellen"],
      ["Den Dokumentstand nachvollziehen", "/funktionen/rechnungen"],
      ["Korrekturen mit Bezug zum Original", "/hilfe/rechnung-stornieren"],
      ["Eingangsbelege prüfen und sperren", "/hilfe/beleg-scannen-pruefen"],
      ["Zugriffe und E-Rechnungsbezug schützen", "/funktionen/e-rechnung"],
      ["Die Übergabe vorbereiten", "/hilfe/datev-export-erstellen"],
    ]);
    for (const k of gobd.gobdKacheln) {
      const size: string = k.size;
      const max = size === "lg" || size === "wide" ? TEXT_BUDGET.bentoTile.textLarge : TEXT_BUDGET.bentoTile.textSmall;
      expect(charCount(k.text), k.title).toBeLessThanOrEqual(max);
      expect(sentenceCount(k.text), k.title).toBe(1);
    }
    expect(new Set(gobd.gobdKacheln.map((k) => k.size)).size).toBeGreaterThanOrEqual(2);
  });

  it("Ablauf in fünf Schritten", () => {
    expect(gobd.gobdSteps.map((st) => st.title)).toEqual([
      "Stammdaten pflegen",
      "Belege prüfen",
      "Rechnung festschreiben",
      "Korrektur per Storno",
      "Übergabe abstimmen",
    ]);
  });

  it("Zuständigkeiten: zwei Panels mit je drei Punkten ohne Quellen", () => {
    expect(gobd.gobdPanels.map((p) => p.title)).toEqual(["Was CraftOS unterstützt", "Was Ihr Betrieb organisiert"]);
    for (const panel of gobd.gobdPanels) {
      expect(panel.points).toHaveLength(3);
      for (const pt of panel.points) {
        expect(pt.quelle).toBeUndefined();
        expect(sentenceCount(pt.text)).toBe(1);
        expect(charCount(pt.text)).toBeLessThanOrEqual(TEXT_BUDGET.fitPanel.point);
      }
    }
  });

  it("FAQ: drei Antworten ≤ 300 und Grundlage mit AO-Handbuch und BMF-Schreiben", () => {
    expect(gobd.gobdFaq.map((f) => f.q)).toEqual([
      "Ersetzt CraftOS die Verfahrensdokumentation?",
      "Kann ich eine festgeschriebene Rechnung ändern?",
      "Reicht ein DATEV-Export für die GoBD?",
    ]);
    expect(faqProbleme(gobd.gobdFaq)).toEqual([]);
    for (const f of gobd.gobdFaq) expect(f.a.startsWith("Nein."), f.q).toBe(true);
    expect(gobd.gobdGrundlage.quellen.map((q) => q.href)).toEqual([
      "https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html",
      "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html",
    ]);
    expect(gobd.gobdGrundlage.stand).toBe(`Funktionsstand ${germanDate(site.checkedAt)}.`);
  });
});

describe("Wortregeln und Literale (T-08-32)", () => {
  // Nur Fließtexte (mit Leerzeichen); Abschnitts-ids wie „zertifizierung“ sind keine Aussagen.
  const alle = [fakten, craftAi, gobd].flatMap((m) => texte(m as Record<string, unknown>)).filter((t) => /s/.test(t));

  it("keine positive Zertifizierungsbehauptung", () => {
    const funde = alle.filter((t) => /zertifizier/i.test(t) && !t.endsWith("?") && !/\b(nicht|kein\w*|Nein)\b/i.test(t));
    expect(funde).toEqual([]);
  });

  it("kein autonomes Verbuchen als Zusage", () => {
    const funde = alle.filter((t) => /autonom/i.test(t) && !/\b(nicht|kein\w*|Nein)\b/i.test(t));
    expect(funde).toEqual([]);
  });

  it("Offline nur mit Einschränkung, nie „vollständig offline“", () => {
    expect(alle.filter((t) => /vollständig offline/i.test(t))).toEqual([]);
  });

  it("Quelltexte ohne Preisliteral, ohne Testtage-Literal", () => {
    const preis = /29[,.]95|9[,.]95|299[,.]50|99[,.]50|24[,.]96|8[,.]29|0[,.]99|9[,.]90|0[,.]01|1[,.]50/;
    for (const file of MODULE) {
      const quelltext = read(file);
      expect(quelltext, file).not.toMatch(preis);
      expect(quelltext, file).not.toMatch(/\b10 Tage/);
      expect(quelltext, file).not.toMatch(/vollständig offline/i);
    }
  });

  it("Preisliteral-Prüfung in pricing-parity umfasst die drei Module", () => {
    const parity = read("tests/pricing-parity.test.ts");
    for (const file of MODULE) expect(parity).toContain(`"${file}"`);
  });
});

// ---------------------------------------------------------------------------
// Task 2: gerenderte Seiten (renderToString) – Kopf, Abschnitte, Antworten, JSON-LD, Altbausteine
// ---------------------------------------------------------------------------

type Ld = Record<string, unknown> & { "@type"?: string };

const decode = (v: string) =>
  v
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

function ldBlocks(html: string): Ld[] {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]) as Ld);
}

/** Sichtbare FAQ-Fragen: Text der summary ohne aria-hidden-Symbol. */
function summaryFragen(html: string): string[] {
  return [...html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) =>
    decode(m[1].replace(/<span[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/g, "")),
  );
}

const SEITEN = [
  { pfad: "/fakten-ueber-craftos", ids: fakten.FAKTEN_SECTION_IDS, laden: () => import("@/app/fakten-ueber-craftos/page") },
  { pfad: "/craft-ai", ids: craftAi.CRAFT_AI_SECTION_IDS, laden: () => import("@/app/craft-ai/page") },
  { pfad: "/gobd", ids: gobd.GOBD_SECTION_IDS, laden: () => import("@/app/gobd/page") },
] as const;

async function rendern(laden: () => Promise<{ default: () => ReactElement }>) {
  const Page = (await laden()).default;
  return renderToString(createElement(Page));
}

describe("gerendert", () => {
  for (const seite of SEITEN) {
    describe(seite.pfad, () => {
      it("eine H1 aus der Keyword-Map, Abschnittsfolge laut UI-SPEC, H2-ids = Abschnitts-ids", async () => {
        const html = await rendern(seite.laden);
        const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));
        expect(h1).toEqual([zielwerte(seite.pfad).h1]);
        const abschnitte = [...html.matchAll(/data-abschnitt="([^"]+)"/g)].map((m) => m[1]);
        expect(abschnitte).toEqual([...seite.ids]);
        for (const id of seite.ids.filter((i) => i !== "kopf" && i !== "cta")) {
          expect(html, id).toContain(`aria-labelledby="${id}"`);
          expect(html, id).toMatch(new RegExp(`<h2 id="${id}"`));
        }
      });

      it("jede Frage-H2 hat direkt darunter eine Antwort ≤ 300 mit data-answer", async () => {
        const html = await rendern(seite.laden);
        const probleme: string[] = [];
        for (const m of html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>(<p[^>]*>)([\s\S]*?)<\/p>/g)) {
          const titel = decode(m[1]);
          if (!titel.endsWith("?")) continue;
          if (!m[2].includes("data-answer")) probleme.push(`${titel}: ohne data-answer`);
          if (charCount(decode(m[3])) > 300) probleme.push(`${titel}: Antwort zu lang`);
        }
        expect(probleme).toEqual([]);
      });

      it("JSON-LD: genau eine BreadcrumbList (2 Glieder), eine FAQPage = sichtbare FAQ, ein WebPage", async () => {
        const html = await rendern(seite.laden);
        const ld = ldBlocks(html);
        const typ = (t: string) => ld.filter((b) => b["@type"] === t);
        expect(ld.filter((b) => Array.isArray(b["@graph"]))).toEqual([]);
        const crumbs = typ("BreadcrumbList");
        expect(crumbs).toHaveLength(1);
        expect((crumbs[0].itemListElement as unknown[]).length).toBe(2);
        const faqs = typ("FAQPage");
        expect(faqs).toHaveLength(1);
        const schemaFragen = (faqs[0].mainEntity as { name: string }[]).map((q) => q.name);
        expect(schemaFragen).toEqual(summaryFragen(html));
        const web = typ("WebPage");
        expect(web).toHaveLength(1);
        expect(web[0].url).toBe(site.url + seite.pfad);
        expect(web[0].name).toBe(zielwerte(seite.pfad).h1);
      });

      it("keine Altbausteine: kein PageHero, kein TrialCta, kein ui/Faq; CTA auf site.ctaUrl", async () => {
        const html = await rendern(seite.laden);
        expect(html).not.toContain("craft-page-hero");
        expect(html).not.toContain("CraftOS kennenlernen");
        expect(html).not.toContain("group-open:rotate-45");
        expect(html).toContain(`href="${site.ctaUrl}"`);
        expect(html).toContain('data-track="trial"');
      });
    });
  }

  it("Fakten: WebPage about → #organization, Abgrenzung sichtbar ohne Links, Stand mit Korrektur-Mail", async () => {
    const html = await rendern(SEITEN[0].laden);
    const web = ldBlocks(html).find((b) => b["@type"] === "WebPage")!;
    expect(web.about).toEqual({ "@id": "https://craftos.eu/#organization" });
    const abgrenzung = html.match(/<p[^>]*data-abgrenzung[^>]*>([\s\S]*?)<\/p>/);
    expect(abgrenzung).not.toBeNull();
    expect(decode(abgrenzung![1])).toBe(fakten.ABGRENZUNG);
    expect(abgrenzung![1]).not.toContain("<a");
    expect(html).toContain(`href="mailto:${site.email}"`);
    expect(html).toMatch(/<dl\b/);
  });

  it("Craft AI: FeatureSnippet „ki“ in figure mit Kennzeichnung unterhalb des ersten Abschnittskopfs", async () => {
    const html = await rendern(SEITEN[1].laden);
    const figur = html.match(/<figure data-figure="snippet"[\s\S]*?<\/figure>/);
    expect(figur).not.toBeNull();
    expect(figur![0]).toContain('data-feature-snippet="ki"');
    expect(figur![0]).toContain("data-illustration-label");
    expect(html.indexOf('id="so-arbeitet-craft-ai"')).toBeLessThan(html.indexOf('data-feature-snippet="ki"'));
    expect(html.indexOf('data-feature-snippet="ki"')).toBeLessThan(html.indexOf('data-abschnitt="kosten"'));
  });

  it("GoBD: FeatureSnippet „rechnung“ im Abschnitt ablauf, FitPanels ohne Quellen, keine unsichtbare FAQPage-Frage", async () => {
    const html = await rendern(SEITEN[2].laden);
    const ablauf = html.slice(html.indexOf('data-abschnitt="ablauf"'), html.indexOf('data-abschnitt="zertifizierung"'));
    expect(ablauf).toContain('data-feature-snippet="rechnung"');
    expect(ablauf).toContain("data-illustration-label");
    const zert = html.slice(html.indexOf('data-abschnitt="zertifizierung"'), html.indexOf('data-abschnitt="faq"'));
    expect(zert).not.toContain("Quelle");
    const sichtbar = new Set(summaryFragen(html));
    const faq = ldBlocks(html).find((b) => b["@type"] === "FAQPage")!;
    for (const q of faq.mainEntity as { name: string }[]) expect(sichtbar.has(q.name), q.name).toBe(true);
    expect(html).toContain(gobd.gobdGrundlage.quellen[0].href);
    expect(html).toContain(gobd.gobdGrundlage.quellen[1].href);
  });

  it("webPageSchema: about überschreibbar, Standard bleibt #software", () => {
    const standard = webPageSchema({ path: "/x", name: "X", description: "Y" });
    expect(standard.about).toEqual({ "@id": "https://craftos.eu/#software" });
    const org = webPageSchema({ path: "/x", name: "X", description: "Y", about: { "@id": "https://craftos.eu/#organization" } });
    expect(org.about).toEqual({ "@id": "https://craftos.eu/#organization" });
  });
});
