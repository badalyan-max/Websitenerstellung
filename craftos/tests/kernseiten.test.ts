/**
 * Kernseiten /fakten-ueber-craftos, /craft-ai und /gobd (Plan 08-12; D-09, D-12, D-25; 08-UI-SPEC §§ 5.2–5.4, § 9).
 * Inhalte stehen budgetgeprüft in lib/seiten/{fakten,craft-ai,gobd}.ts; Preise, Credits, Testtage und Sprachenzahl
 * kommen aus lib/site.ts und dem Produktregister. Wortregeln (T-08-32): keine behördliche GoBD-Zertifizierung,
 * kein autonomes Verbuchen durch Craft AI, Offline nur als Aufzählung belegter Vorgänge (HI-03), nie „vollständig offline“.
 */
import fs from "node:fs";
import path from "node:path";
import { LockKeyhole } from "lucide-react";
import { createElement, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContentKopf, type ContentKopfProps } from "@/components/content/ContentKopf";
import { crumbsFor } from "@/lib/breadcrumbs";
import { getContentList } from "@/lib/content";
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
      "Überprüfbare Angaben zu Produkt, Plattformen, Lizenzen und Funktionen der Handwerkersoftware CraftOS.",
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
      "GAEB und DATANORM",
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
    // HI-03 (Inhaber 22.10.2026): positiv – was offline funktioniert und danach synchronisiert wird; GPS nur je Vorgang.
    expect(def("Offline-Nutzung")).toBe(
      "Zeiten, Bautagesberichte, Mängel, Aufmaße und Urlaubsanträge erfasst die Mobile-App auch ohne Empfang und überträgt sie danach. Geladene Projekte hält die App bis zu 24 Stunden offline bereit.",
    );
    expect(mobileOffline.evidence.length).toBeGreaterThan(0);
    expect(def("Standort bei der Zeiterfassung")).toBe(
      "GPS erfasst nur einzelne Vorgänge wie das Ein- und Ausstempeln: Die Mobile-App speichert beim Starten und Stoppen des Timers je einen Standortpunkt.",
    );
    expect(def("Einsatzkarte")).toBe("Die Web-App zeigt geplante Einsatzorte mit Tages- und Mitarbeiterfilter.");
    expect(fakten.faktenSections.produktfakten.lead).toBe("Jede Angabe beschreibt den freigegebenen Funktionsstand.");
    for (const { term, definition } of items) expect(definition, term).not.toMatch(/^Teilweise|\bnicht\b|\bkeine?\b|Grenzen/);
    // Inhabervorgabe 22.10.2026: nur nennen, was unterstützt wird; DATANORM nur positiv als „DATANORM 4 und 5“.
    expect(def("GAEB und DATANORM")).toContain("DATANORM 4 und 5");
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

  it("FAQ: sechs Antworten ≤ 300, nur positiv formuliert (HI-03): Offline-Aufzählung, GoBD-Zuständigkeit, Standort je Vorgang, Einrichtung und Datenstandort (10-f)", () => {
    expect(fakten.faktenFaq.map((f) => f.q)).toEqual([
      "Wer bietet CraftOS an?",
      "Was funktioniert in CraftOS offline?",
      "Unterstützt CraftOS die GoBD?",
      "Welche Standortdaten speichert die Mobile-App?",
      "Was kostet die Einrichtung von CraftOS?",
      "Wo speichert CraftOS die Daten?",
    ]);
    expect(faqProbleme(fakten.faktenFaq)).toEqual([]);
    expect(fakten.faktenFaq[1].a).toBe(
      "In der Mobile-App erfassen Sie Zeiten, Bautagesberichte, Mängel, Aufmaße und Urlaubsanträge auch ohne Empfang; die App überträgt sie, sobald wieder eine Verbindung besteht, und geladene Projekte hält sie bis zu 24 Stunden offline bereit.",
    );
    expect(fakten.faktenFaq[2].a).toBe(
      "CraftOS unterstützt GoBD-konforme Abläufe mit Festschreibung, Dokumentversionen und Protokollen; die GoBD-Konformität des gesamten Verfahrens organisiert Ihr Betrieb.",
    );
    expect(fakten.faktenFaq[3].a).toBe(
      "GPS erfasst nur einzelne Vorgänge wie das Ein- und Ausstempeln: Die Mobile-App speichert beim Start und Stopp der Zeiterfassung je einen Standortpunkt, bei mobilen Unterschriften Ort und Zeitpunkt.",
    );
    for (const f of fakten.faktenFaq) expect(f.a, f.q).not.toMatch(/^(Nein|Teilweise)\b|\bnicht\b|\bkeine?\b/);
  });
});

describe("Craft AI (§ 5.3)", () => {
  it("Abschnittsfolge, Flächen und Kopf", () => {
    expect(craftAi.CRAFT_AI_PFAD).toBe("/craft-ai");
    expect(craftAi.CRAFT_AI_SECTION_IDS).toEqual(["kopf", "so-arbeitet-craft-ai", "kosten", "wer-entscheidet", "faq", "cta"]);
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
    // Inhaber 22.10.2026: nur Unterstütztes – Zuständigkeit positiv statt „Was übernimmt Craft AI nicht?“.
    expect(s["wer-entscheidet"].title).toBe("Wer entscheidet bei Craft AI?");
    expect(s.faq.title).toBe("Häufige Fragen zu Craft AI");
    expect(abschnittsProbleme(s)).toEqual([]);
    // Überclaim-Schutz bleibt: Sie prüfen jedes Ergebnis und bestätigen jede Übernahme selbst.
    expect(s["wer-entscheidet"].lead.startsWith("Sie entscheiden:")).toBe(true);
    expect(s["wer-entscheidet"].lead).toContain("prüfen");
    expect(s["wer-entscheidet"].lead).toContain("bestätigen");
  });

  it("Ablauf: drei Schritte bis zur Bestätigung", () => {
    // Hotfix 23.10.2026: KI-Funktionen auf Anforderung statt Fragen zu Betriebsdaten.
    expect(craftAi.craftAiSteps.map((st) => st.title)).toEqual(["KI anfordern", "Vorschlag erhalten", "Prüfen und bestätigen"]);
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

  it("Zuständigkeit: drei Kacheln, mindestens zwei Größen, Buchungen bestätigen Sie", () => {
    expect(craftAi.craftAiGrenzen.map((k) => k.title)).toEqual([
      "Mengen und Preise prüfen",
      "Sie bestätigen jede Buchung",
      "Freigabe im Betrieb",
    ]);
    expect(craftAi.craftAiGrenzen[1].text).toBe("Craft AI macht Vorschläge; Sie prüfen und bestätigen jede Buchung.");
    expect(new Set(craftAi.craftAiGrenzen.map((k) => k.size)).size).toBeGreaterThanOrEqual(2);
  });

  it("FAQ: drei Antworten ≤ 300", () => {
    expect(craftAi.craftAiFaq.map((f) => f.q)).toEqual([
      "Kann Craft AI Angebote erstellen?",
      "Welche KI-Funktionen umfasst Craft AI?",
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
    // ME-01 (Inhaber 22.10.2026): positiv formuliert; einzige Verneinung bleibt die Zertifizierungsfrage.
    expect(gobd.gobdFaq).toEqual([
      {
        q: "Wer erstellt die Verfahrensdokumentation?",
        a: "Die Verfahrensdokumentation erstellt Ihr Betrieb; CraftOS liefert dafür nachvollziehbare Funktionen wie Festschreibung, Versionen und Protokolle.",
      },
      {
        q: "Wie korrigiere ich eine festgeschriebene Rechnung?",
        a: "Über einen Storno mit eigener Nummer und Bezug zum Original; die festgeschriebene Rechnung bleibt dabei geschützt.",
      },
      {
        q: "Was leistet der DATEV-Export für die GoBD?",
        a: "Der DATEV-Export bereitet die Übergabe an die Steuerberatung vor; Prüfungs- und Aufbewahrungsanforderungen stimmen Sie mit Ihrer Steuerberatung ab.",
      },
    ]);
    expect(faqProbleme(gobd.gobdFaq)).toEqual([]);
    for (const f of gobd.gobdFaq) expect(f.a, f.q).not.toMatch(/^Nein/);
    expect(gobd.gobdGrundlage.quellen.map((q) => q.href)).toEqual([
      "https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html",
      "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html",
    ]);
    expect(gobd.gobdGrundlage.stand).toBe(`Funktionsstand ${germanDate(site.checkedAt)}.`);
  });
});

describe("Wortregeln und Literale (T-08-32)", () => {
  // Nur Fließtexte (mit Leerzeichen); Abschnitts-ids wie „zertifizierung“ sind keine Aussagen.
  const alle = [fakten, craftAi, gobd].flatMap((m) => texte(m as Record<string, unknown>)).filter((t) => /\s/.test(t));

  it("keine positive Zertifizierungsbehauptung", () => {
    const funde = alle.filter((t) => /zertifizier/i.test(t) && !t.endsWith("?") && !/\b(nicht|kein\w*|Nein)\b/i.test(t));
    expect(funde).toEqual([]);
  });

  it("kein autonomes Verbuchen als Zusage", () => {
    const funde = alle.filter((t) => /autonom/i.test(t) && !/\b(nicht|kein\w*|Nein)\b/i.test(t));
    expect(funde).toEqual([]);
  });

  // Inhaber 22.10.2026: „Nur, was unterstützt wird, nicht, was nicht unterstützt wird.“ Craft AI und das
  // KI-Faktum beschreiben die Zuständigkeit positiv (Sie prüfen und bestätigen); die GoBD-Zertifizierungsfrage
  // bleibt als gebotener Überclaim-Schutz bewusst verneint.
  it("nur Unterstütztes: Craft AI und KI-Faktum positiv, ohne Verneinung und ohne „autonom“", () => {
    const ki = fakten.produktfakten.find((i) => i.term === "KI")!.definition;
    // Hotfix 23.10.2026: belegte KI-Funktionen auf Anforderung.
    expect(ki).toBe(
      "Craft AI umfasst KI-Funktionen auf Anforderung: Angebotsentwurf im Angebotschat, Belegscan, Diktat in Berichten und Foto-Erkennung im Lager. Sie prüfen und bestätigen jede Übernahme.",
    );
    const craftAiTexte = texte(craftAi as Record<string, unknown>).filter((t) => /\s/.test(t));
    expect([...craftAiTexte, ki].filter((t) => /\b(nicht|kein\w*|Nein)\b/i.test(t))).toEqual([]);
    expect(alle.filter((t) => /autonom/i.test(t))).toEqual([]);
  });

  it("keine Negativlisten: DATANORM nur als „DATANORM 4 und 5“, kein „nicht zugesagt“ (Inhabervorgabe 22.10.2026)", () => {
    // Ausnahme: der FactList-Begriff „GAEB und DATANORM“ ist eine Überschrift ohne Versionsaussage.
    expect(alle.filter((t) => /DATANORM/.test(t) && t !== "GAEB und DATANORM" && !t.includes("DATANORM 4 und 5"))).toEqual([]);
    expect(alle.filter((t) => /nicht zugesagt|DATANORM[- ]?v5/i.test(t))).toEqual([]);
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
        // IN-02: WebPage.name = Title ohne Marke (wie og:title, Funktions- und Alternativen-Seiten).
        expect(web[0].name).toBe(zielwerte(seite.pfad).titleOhneMarke);
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
    // Quellenlinks wie in ComparisonTable/FitPanels: rel="nofollow", gleicher Tab (08-UI-SPEC § 3.5, 08-13).
    for (const q of gobd.gobdGrundlage.quellen) {
      const tag = html.match(new RegExp(`<a [^>]*href="${q.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`));
      expect(tag, q.href).not.toBeNull();
      expect(tag![0], q.href).toMatch(/rel="[^"]*nofollow/);
      expect(tag![0], q.href).not.toContain('target="_blank"');
    }
  });

  it("webPageSchema: about überschreibbar, Standard bleibt #software", () => {
    const standard = webPageSchema({ path: "/x", name: "X", description: "Y" });
    expect(standard.about).toEqual({ "@id": "https://craftos.eu/#software" });
    const org = webPageSchema({ path: "/x", name: "X", description: "Y", about: { "@id": "https://craftos.eu/#organization" } });
    expect(org.about).toEqual({ "@id": "https://craftos.eu/#organization" });
  });
});

// ---------------------------------------------------------------------------
// Phase 10, Plan 10-03 (Paket c): ContentKopf K1/K2, Rechtsseiten, 404 (10-UI-SPEC K1–K3, § 3, § 4, § 11)
// ---------------------------------------------------------------------------

/** Überschriftenebenen in Dokumentreihenfolge. */
const ueberschriften = (html: string) => [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));

/** Sprünge in der Überschriftenfolge (z. B. h1 → h3); leer, wenn keine. */
function spruenge(html: string): string[] {
  const ebenen = ueberschriften(html);
  const out: string[] = [];
  for (let i = 1; i < ebenen.length; i++) {
    if (ebenen[i] > ebenen[i - 1] + 1) out.push(`h${ebenen[i - 1]} → h${ebenen[i]} (Position ${i})`);
  }
  return out;
}

/** Klassen-Token aller class-Attribute. */
const klassen = (html: string) => [...html.matchAll(/\sclass="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/).filter(Boolean));

const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;

const ALTKLASSEN_404 = ["section-space", "eyebrow", "section-intro", "btn-cta", "btn-secondary"] as const;
const HELLER_KOPF = /<section\b[^>]*data-abschnitt="kopf"[^>]*data-tone="light"/;

describe("ContentKopf K1/K2 (10-UI-SPEC Design System, K3)", () => {
  const basis: ContentKopfProps = {
    crumbs: crumbsFor("/blog"),
    eyebrow: "Ratgeber",
    h1: "Ratgeber für Handwerksbetriebe",
    lead: "Kurzer Lead für den Test.",
    meta: ["Stand 23.10.2026"],
    stand: "12 Artikel",
  };
  const kopf = (props: Partial<ContentKopfProps> = {}) => renderToString(createElement(ContentKopf, { ...basis, ...props }));

  it("crumbs={null}: keine Brotkrumen, keine BreadcrumbList, data-crumbs=\"ohne\" an der section", () => {
    const html = kopf({ crumbs: null });
    expect(html).not.toContain('aria-label="Brotkrumen"');
    expect(html).not.toContain("BreadcrumbList");
    expect(html).toMatch(/^<section\b[^>]*data-crumbs="ohne"/);
  });

  it("mit Brotkrumen kein data-crumbs und kein data-hinweis", () => {
    const html = kopf();
    expect(html).not.toContain("data-crumbs");
    expect(html).not.toContain("data-hinweis");
    expect(html).toContain('aria-label="Brotkrumen"');
  });

  it("hinweis steht nach Lead bzw. Antwort und vor meta, stand und platforms; Icon aria-hidden", () => {
    const hinweis = { text: "Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.", icon: LockKeyhole };
    const html = kopf({ hinweis, platforms: ["web"] });
    const p = html.match(/<p\b[^>]*data-hinweis=""[^>]*>([\s\S]*?)<\/p>/);
    expect(p).not.toBeNull();
    expect(p![1]).toMatch(/<svg\b[^>]*aria-hidden="true"/);
    expect(decode(p![1])).toBe(hinweis.text);
    const pos = (s: string) => html.indexOf(s);
    expect(pos("Kurzer Lead für den Test.")).toBeLessThan(pos("data-hinweis"));
    expect(pos("data-hinweis")).toBeLessThan(pos('aria-label="Angaben zum Artikel"'));
    expect(pos('aria-label="Angaben zum Artikel"')).toBeLessThan(pos("data-stand"));
    expect(pos("data-stand")).toBeLessThan(pos('aria-label="Plattformen"'));

    const mitAntwort = kopf({
      lead: undefined,
      answer: "Eine Antwort in einem Satz.",
      hinweis,
    });
    expect(mitAntwort.indexOf('id="antwort"')).toBeLessThan(mitAntwort.indexOf("data-hinweis"));
  });

  it("hinweis mit 81 Zeichen wirft den Fehlertext wörtlich, 80 Zeichen gehen", () => {
    expect(() => kopf({ hinweis: { text: "x".repeat(81), icon: LockKeyhole } })).toThrow(
      "ContentKopf: hinweis hat 81 von 80 Zeichen – Satz kürzen.",
    );
    expect(() => kopf({ hinweis: { text: "x".repeat(80), icon: LockKeyhole } })).not.toThrow();
  });

  it("CSS: K1/K2-Regeln hängen nur an [data-crumbs=\"ohne\"] bzw. .hinweis; Höchstlänge aus budgets.ts", () => {
    const css = read("components/content/ContentKopf.module.css");
    expect(css).toMatch(/\.kopf\[data-crumbs="ohne"\]\s*\{[^}]*padding-top:\s*48px/);
    expect(css).toMatch(/@media \(min-width: 768px\)\s*\{\s*\.kopf\[data-crumbs="ohne"\]\s*\{[^}]*padding-top:\s*64px/);
    expect(css).toMatch(/\.hinweis\s*\{[^}]*color:\s*#62626e/i);
    // 10-06 (10-UI-SPEC K2): der Wert 80 steht in components/v2/budgets.ts, ContentKopf liest ihn dort.
    const kopfTsx = read("components/content/ContentKopf.tsx");
    expect(kopfTsx).not.toContain("HINWEIS_MAX = 80");
    expect(kopfTsx).toContain("TEXT_BUDGET.contentKopf.hinweis");
    expect(read("components/v2/budgets.ts")).toMatch(/contentKopf:\s*\{\s*hinweis:\s*80\s*\}/);
  });

  it("eine null-Kette gibt es nur in app/not-found.tsx (K1, K3)", () => {
    const treffer: string[] = [];
    const scan = (dir: string) => {
      for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
        const rel = path.posix.join(dir, e.name);
        if (e.isDirectory()) scan(rel);
        else if (/\.(tsx?|mjs|js)$/.test(e.name)) {
          const src = read(rel);
          if (/crumbs=\{null\}|crumbs:\s*null\b/.test(src)) treffer.push(rel);
          // Variablen, die null erhalten und als crumbs übergeben werden
          for (const m of src.matchAll(/\b(?:const|let|var)\s+(\w+)\s*(?::[^=]+)?=\s*null\b/g)) {
            if (new RegExp(`crumbs=\\{${m[1]}\\}|crumbs:\\s*${m[1]}\\b`).test(src)) treffer.push(`${rel} (${m[1]})`);
          }
        }
      }
    };
    for (const dir of ["app", "components", "lib"]) scan(dir);
    const fremd = treffer.filter((t) => t !== "app/not-found.tsx");
    if (fremd.length > 0) {
      throw new Error(
        `ContentKopf: crumbs={null} ist nur auf der 404-Seite erlaubt – crumbsFor(pfad) verwenden. (${fremd.join(", ")})`,
      );
    }
    expect(treffer).toEqual(["app/not-found.tsx"]);
  });
});

const RECHTSSEITEN_10 = [
  { pfad: "/impressum", datei: "app/impressum/page.tsx", laden: () => import("@/app/impressum/page") },
  { pfad: "/datenschutz", datei: "app/datenschutz/page.tsx", laden: () => import("@/app/datenschutz/page") },
  { pfad: "/agb", datei: "app/agb/page.tsx", laden: () => import("@/app/agb/page") },
] as const;

describe("Rechtsseiten auf v2 (D-09, D-17; 10-UI-SPEC § 3)", () => {
  for (const seite of RECHTSSEITEN_10) {
    describe(seite.pfad, () => {
      it("heller ContentKopf mit Eyebrow „Rechtliches“, H1 aus der Keyword-Map, id rechtstext-titel", async () => {
        const html = await rendern(seite.laden);
        expect(html).toMatch(HELLER_KOPF);
        const h1 = [...html.matchAll(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/g)];
        expect(h1.map((m) => decode(m[2]))).toEqual([zielwerte(seite.pfad).h1]);
        expect(h1[0][1]).toContain('id="rechtstext-titel"');
        expect(html).toMatch(/<p class="v2-eyebrow[^"]*">Rechtliches<\/p>/);
      });

      it("genau eine BreadcrumbList und eine Brotkrumen-Navigation", async () => {
        const html = await rendern(seite.laden);
        expect(count(html, /"@type":"BreadcrumbList"/g)).toBe(1);
        expect(count(html, /aria-label="Brotkrumen"/g)).toBe(1);
      });

      it("Kontrast: kein text-primary-600, kein text-ink-400, keine Gewichte 500/700/800 im Markup und in der Quelle", async () => {
        const html = await rendern(seite.laden);
        const quellen = [read(seite.datei), read("components/legal/Legal.tsx"), read("components/legal/Legal.module.css")];
        for (const text of [html, ...quellen]) {
          expect(text).not.toMatch(/text-primary-600|text-ink-400/);
          expect(text).not.toMatch(/font-(medium|bold|extrabold)\b|font-weight:\s*(500|700|800)\b/);
        }
      });

      it("Überschriftenfolge ohne Sprung", async () => {
        expect(spruenge(await rendern(seite.laden))).toEqual([]);
      });
    });
  }

  it("Legal.module.css: Links #784B10 mit Unterstrich, Hinweisabsätze #62626E, Prosa max. 720 px", () => {
    const css = read("components/legal/Legal.module.css").toLowerCase();
    expect(css).toContain("#784b10");
    expect(css).toContain("#62626e");
    expect(css).toMatch(/text-underline-offset:\s*4px/);
    expect(css).toMatch(/max-width:\s*720px/);
    expect(css).toMatch(/scroll-margin-top:\s*100px/);
  });
});

describe("404-Seite auf v2 (D-18; 10-UI-SPEC § 4)", () => {
  const notFound = async () => renderToString(createElement((await import("@/app/not-found")).default));

  it("ContentKopf ohne Brotkrumen, Eyebrow, H1 und Lead wörtlich", async () => {
    const html = await notFound();
    expect(html).toMatch(HELLER_KOPF);
    expect(html).toMatch(/<section\b[^>]*data-crumbs="ohne"/);
    expect(html).not.toContain('aria-label="Brotkrumen"');
    expect(html).not.toContain("BreadcrumbList");
    expect(html).not.toContain("<br");
    const h1 = [...html.matchAll(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/g)];
    expect(h1.map((m) => decode(m[2]))).toEqual(["Hier geht es nicht weiter. An anderer Stelle schon."]);
    expect(h1[0][1]).toContain('id="fehler-titel"');
    expect(html).toMatch(/<p class="v2-eyebrow[^"]*">Seite nicht gefunden<\/p>/);
    expect(decode(html)).toContain(
      "Diese Adresse ist nicht verfügbar. Über die Startseite oder das Hilfezentrum finden Sie den passenden Einstieg.",
    );
  });

  it("Abschnitt einstiege: H2 „So geht es weiter“ und drei Karten zu /, /hilfe, /funktionen", async () => {
    const html = await notFound();
    expect(html).toMatch(/<section\b[^>]*data-abschnitt="einstiege"[^>]*aria-labelledby="einstiege"/);
    expect(html).toMatch(/<h2 id="einstiege"[^>]*>So geht es weiter<\/h2>/);
    const liste = html.match(/<ul\b[^>]*aria-label="Einstiege"[^>]*>[\s\S]*?<\/ul>/)?.[0] ?? "";
    expect(liste).toMatch(/data-surface="warm"/);
    expect(liste).toMatch(/data-columns="3"/);
    expect([...liste.matchAll(/<h3\b[^>]*><a\b[^>]*href="([^"]+)"/g)].map((m) => m[1])).toEqual(["/", "/hilfe", "/funktionen"]);
    expect([...liste.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => decode(m[1]))).toEqual([
      "Startseite",
      "Hilfezentrum",
      "Funktionen",
    ]);
    expect(decode(liste)).toContain("CraftOS im Überblick: Angebot, Planung, Baustelle und Rechnung in einer Software.");
    expect(decode(liste)).toContain("Anleitungen Schritt für Schritt, von der Einrichtung bis zur Rechnung.");
    expect(decode(liste)).toContain(
      "Alle Funktionen von Angebot bis Buchhaltung mit Plattformen und Lizenzen im Überblick.",
    );
  });

  it("keine Altklassen, kein CtaBand, Überschriftenfolge ohne Sprung", async () => {
    const html = await notFound();
    const k = klassen(html);
    for (const alt of ALTKLASSEN_404) expect(k, alt).not.toContain(alt);
    expect(html).not.toContain('data-abschnitt="cta"');
    expect(spruenge(html)).toEqual([]);
    expect(ueberschriften(html)).toEqual([1, 2, 3, 3, 3]);
  });

});

describe("/support auf v2 (D-16, K-2; 10-UI-SPEC § 2)", () => {
  const support = async () => renderToString(await (await import("@/app/support/page")).default());
  const ALTKLASSEN_SUPPORT = ["section-space", "split-section", "soft-panel", "btn-cta", "text-link"] as const;

  it("heller ContentKopf mit Brotkrumen, Eyebrow „Kontakt & Support“, H1 aus der Keyword-Map, Bestands-Intro als Lead", async () => {
    const html = await support();
    expect(html).toMatch(HELLER_KOPF);
    expect(count(html, /"@type":"BreadcrumbList"/g)).toBe(1);
    expect(count(html, /aria-label="Brotkrumen"/g)).toBe(1);
    const h1 = [...html.matchAll(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/g)];
    expect(h1.map((m) => decode(m[2]))).toEqual([zielwerte("/support").h1]);
    expect(h1[0][1]).toContain('id="support-titel"');
    expect(html).toMatch(/<p class="v2-eyebrow[^"]*">Kontakt &amp; Support<\/p>/);
    expect(decode(html)).toContain(
      "Ob Einrichtung, Rechnung oder eine Frage zur Mobile-App: Beschreiben Sie uns kurz, wobei Sie Unterstützung benötigen.",
    );
  });

  it("Abschnittsfolge kopf → kontakt (Weiß) → hilfe (Warm) → cta, H2-ids = Abschnitts-ids", async () => {
    const html = await support();
    expect([...html.matchAll(/data-abschnitt="([^"]+)"/g)].map((m) => m[1])).toEqual(["kopf", "kontakt", "hilfe", "cta"]);
    expect(html).toMatch(/<section data-abschnitt="kontakt" aria-labelledby="kontakt" class="bg-white /);
    expect(html).toMatch(/<section data-abschnitt="hilfe" aria-labelledby="hilfe" class="bg-\[#f7f3eb\] /);
    expect(html).toMatch(/<h2 id="kontakt"[^>]*>Direkt zum CraftOS Support\.<\/h2>/);
    expect(html).toMatch(/<h2 id="hilfe"[^>]*>Die Antwort ist vielleicht schon da\.<\/h2>/);
  });

  it("Kontaktweg: eine Karte mailto:site.email mit Label „E-Mail“ und dem Bestandstext", async () => {
    const html = await support();
    const liste = html.match(/<ul\b[^>]*aria-label="Kontaktweg"[^>]*>[\s\S]*?<\/ul>/)?.[0] ?? "";
    expect(liste).toMatch(/data-surface="warm"/);
    expect(liste).toMatch(/data-columns="2"/);
    expect([...liste.matchAll(/<h3\b[^>]*><a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => [m[1], decode(m[2])])).toEqual([
      [`mailto:${site.email}`, site.email],
    ]);
    expect(decode(liste)).toContain("E-Mail");
    expect(decode(liste)).toContain(
      "Eine genaue Fehlermeldung hilft uns bei der Einordnung. Bitte senden Sie keine Passwörter oder vollständigen Zahlungsdaten.",
    );
    expect(decode(html)).toContain(
      "Nennen Sie die betroffene Ansicht, Ihr Gerät und die Schritte, bei denen die Frage auftritt.",
    );
  });

  it("Hilfe und Ratgeber: Karten /hilfe und /blog mit Mengen aus lib/content", async () => {
    const html = await support();
    const liste = html.match(/<ul\b[^>]*aria-label="Hilfe und Ratgeber"[^>]*>[\s\S]*?<\/ul>/)?.[0] ?? "";
    expect(liste).toMatch(/data-surface="white"/);
    expect(liste).toMatch(/data-columns="2"/);
    expect([...liste.matchAll(/<h3\b[^>]*><a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => [m[1], decode(m[2])])).toEqual([
      ["/hilfe", "Hilfezentrum öffnen"],
      ["/blog", "Ratgeber für Ihren Betriebsalltag"],
    ]);
    const nHilfe = (await getContentList("hilfe")).length;
    const nBlog = (await getContentList("blog")).length;
    expect(nHilfe).toBeGreaterThan(1);
    expect(nBlog).toBeGreaterThan(0);
    expect(decode(liste)).toContain(`${nHilfe} Anleitungen`);
    expect(decode(liste)).toContain(`${nBlog} Artikel`);
    expect(decode(html)).toContain(
      "Im Hilfezentrum finden Sie Anleitungen zu Einrichtung, Angeboten, Rechnungen, Zeiten, Lager und Craft AI.",
    );
  });

  it("CtaBand „Machen Sie Platz für Ihr Handwerk.“ mit Sekundärlink „Preise ansehen“ → /preise", async () => {
    const html = await support();
    const cta = html.slice(html.indexOf('data-abschnitt="cta"'));
    expect(decode(cta)).toContain("Machen Sie Platz für Ihr Handwerk.");
    expect(decode(cta)).toContain("Ohne Zahlungsdaten – Sie entscheiden nach dem Test.");
    expect(cta).toMatch(/<a href="\/preise"[^>]*>Preise ansehen<\/a>/);
    expect(cta).toContain(`href="${site.ctaUrl}"`);
  });

  it("keine Altklassen außerhalb des CtaBand, kein PageHero, Überschriftenfolge ohne Sprung", async () => {
    const html = await support();
    const ohneCta = html.slice(0, html.indexOf('data-abschnitt="cta"'));
    const k = klassen(ohneCta);
    for (const alt of ALTKLASSEN_SUPPORT) expect(k, alt).not.toContain(alt);
    const quelle = read("app/support/page.tsx");
    expect(quelle).not.toMatch(/PageHero|section-space|split-section|soft-panel|btn-cta|text-link/);
    expect(spruenge(html)).toEqual([]);
    expect(ueberschriften(html)).toEqual([1, 2, 3, 2, 3, 3, 2]);
  });
});

const RECHNER_HINWEIS = "Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.";
const RECHNER_NOTIZ = "Lernen Sie die Angebotsfunktionen von CraftOS kennen und bringen Sie Ihre Aufträge ins System.";
const ALTKLASSEN_RECHNER = ["section-space", "eyebrow", "section-intro", "btn-cta", "btn-secondary", "soft-panel", "split-section"] as const;
const RECHNERSEITEN_10 = [
  {
    pfad: "/rechner",
    laden: () => import("@/app/rechner/page"),
    lead: "Was muss Ihre Arbeitsstunde kosten? Was bleibt von einem Auftrag übrig? Rechnen Sie beides mit Ihren eigenen Werten durch.",
    abschnitte: [
      ["kopf", null],
      ["einstieg", "white"],
      ["cta", null],
    ],
    h2: [["einstieg", "Welcher Rechner ist der richtige Einstieg?"]],
    schema: "CollectionPage",
    ebenen: [1, 2, 3, 3, 2],
  },
  {
    pfad: "/rechner/stundensatz",
    laden: () => import("@/app/rechner/stundensatz/page"),
    lead: "Berechnen Sie Ihren Stundensatz aus den Kosten Ihres Betriebs, Ihren verrechenbaren Stunden und der Gewinnmarge, die Sie erreichen möchten.",
    abschnitte: [
      ["kopf", null],
      ["rechner", "white"],
      ["berechnung", "warm"],
      ["kosten-und-stunden", "white"],
      ["cta", null],
    ],
    h2: [
      ["berechnung", "Wie wird der Stundensatz berechnet?"],
      ["kosten-und-stunden", "Welche Kosten und Stunden gehören hinein?"],
    ],
    schema: "WebApplication",
    ebenen: [1, 2, 2, 2, 2, 2],
  },
  {
    pfad: "/rechner/angebotskalkulation",
    laden: () => import("@/app/rechner/angebotskalkulation/page"),
    lead: "Kalkulieren Sie einen Auftrag aus Material, Arbeitszeit und zusätzlichen Kosten. Oder prüfen Sie, welche Gewinnmarge Ihr vorhandener Preis ergibt.",
    abschnitte: [
      ["kopf", null],
      ["rechner", "white"],
      ["angebotspreis", "warm"],
      ["marge-und-aufschlag", "white"],
      ["eingaben", "warm"],
      ["cta", null],
    ],
    h2: [
      ["angebotspreis", "Wie kalkuliere ich einen Angebotspreis?"],
      ["marge-und-aufschlag", "Was unterscheidet Marge und Kostenaufschlag?"],
      ["eingaben", "Was muss ich bei meinen Eingaben beachten?"],
    ],
    schema: "WebApplication",
    ebenen: [1, 2, 2, 2, 2, 3, 3, 2, 2],
  },
] as const;

const FLAECHE_KLASSE = { white: "bg-white", warm: "bg-\\[#f7f3eb\\]" } as const;

describe("Rechnerseiten auf v2 (D-15; 10-UI-SPEC § 1, J6–J8, J12)", () => {
  for (const seite of RECHNERSEITEN_10) {
    describe(seite.pfad, () => {
      it("heller ContentKopf: Brotkrumen, Eyebrow „Rechner“, H1 aus der Keyword-Map, Bestands-Intro als Lead, Hinweis", async () => {
        const html = await rendern(seite.laden);
        expect(html).toMatch(HELLER_KOPF);
        expect(count(html, /"@type":"BreadcrumbList"/g)).toBe(1);
        expect(count(html, /aria-label="Brotkrumen"/g)).toBe(1);
        const h1 = [...html.matchAll(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/g)];
        expect(h1.map((m) => decode(m[2]))).toEqual([zielwerte(seite.pfad).h1]);
        expect(h1[0][1]).toContain('id="rechner-titel"');
        expect(html).toMatch(/<p class="v2-eyebrow[^"]*">Rechner<\/p>/);
        const kopf = html.slice(html.indexOf('data-abschnitt="kopf"'), html.indexOf("</section>"));
        expect(decode(kopf)).toContain(seite.lead);
        expect(kopf).not.toContain("data-answer");
        const hinweis = kopf.match(/<p\b[^>]*data-hinweis=""[^>]*>([\s\S]*?)<\/p>/);
        expect(hinweis).not.toBeNull();
        expect(decode(hinweis![1])).toBe(RECHNER_HINWEIS);
        expect(kopf.indexOf(seite.lead.slice(0, 20))).toBeLessThan(kopf.indexOf("data-hinweis"));
      });

      it("Abschnittsfolge und Flächen laut § 1.2, H2-ids = Abschnitts-ids", async () => {
        const html = await rendern(seite.laden);
        expect([...html.matchAll(/data-abschnitt="([^"]+)"/g)].map((m) => m[1])).toEqual(seite.abschnitte.map((a) => a[0]));
        for (const [id, flaeche] of seite.abschnitte) {
          if (flaeche === null) continue;
          expect(html, id).toMatch(new RegExp(`<section data-abschnitt="${id}"[^>]*class="${FLAECHE_KLASSE[flaeche]} `));
        }
        for (const [id, titel] of seite.h2) {
          expect(html, id).toMatch(new RegExp(`<section data-abschnitt="${id}" aria-labelledby="${id}"`));
          const h2 = html.match(new RegExp(`<h2 id="${id}"[^>]*>([\\s\\S]*?)</h2>`));
          expect(h2, id).not.toBeNull();
          expect(decode(h2![1])).toBe(titel);
        }
        // Der Rechner-Abschnitt ist keine benannte Region; die Panels tragen ihre H2.
        expect(html).not.toMatch(/<section data-abschnitt="rechner" aria-labelledby/);
      });

      it("Notiz wörtlich direkt vor dem CtaBand „Von der Kalkulation zum Angebot.“ mit „Angebotsfunktionen ansehen“", async () => {
        const html = await rendern(seite.laden);
        const iCta = html.indexOf('data-abschnitt="cta"');
        const notiz = [...html.matchAll(/<p\b[^>]*data-notiz=""[^>]*>([\s\S]*?)<\/p>/g)];
        expect(notiz.map((m) => decode(m[1]))).toEqual([RECHNER_NOTIZ]);
        expect(notiz[0].index!).toBeLessThan(iCta);
        // Nichts Sichtbares zwischen Notiz und CTA-Band außer schließenden Tags.
        expect(html.slice(notiz[0].index! + notiz[0][0].length, iCta)).toMatch(/^(<\/(div|section)>)*<div $/);
        expect(notiz[0][0]).not.toContain("<a ");
        const cta = html.slice(iCta);
        expect(decode(cta)).toContain("Von der Kalkulation zum Angebot.");
        expect(decode(cta)).toContain("Ohne Zahlungsdaten – Sie entscheiden nach dem Test.");
        expect(cta).toMatch(/<a href="\/funktionen\/angebote"[^>]*>Angebotsfunktionen ansehen<\/a>/);
        expect(cta).toContain(`href="${site.ctaUrl}"`);
        expect(html).not.toContain("calculator-cta-title");
      });

      it("JSON-LD unverändert, keine FAQPage, keine Altklassen, Überschriftenfolge ohne Sprung", async () => {
        const html = await rendern(seite.laden);
        const typen = ldBlocks(html).flatMap((b) => {
          const graph = (b as { "@graph"?: Ld[] })["@graph"];
          return (graph ?? [b]).map((x) => (x as { "@type"?: string })["@type"]);
        });
        expect(typen).toContain(seite.schema);
        expect(typen).not.toContain("FAQPage");
        const k = klassen(html.slice(0, html.indexOf('data-abschnitt="cta"')));
        for (const alt of ALTKLASSEN_RECHNER) expect(k, alt).not.toContain(alt);
        expect(spruenge(html)).toEqual([]);
        expect(ueberschriften(html)).toEqual(seite.ebenen);
      });
    });
  }

  it("Rechner: Navigation „Rechner auswählen“ mit aria-current und noscript-Hinweis wörtlich", async () => {
    for (const seite of RECHNERSEITEN_10.slice(1)) {
      const html = await rendern(seite.laden);
      const abschnitt = html.slice(html.indexOf('data-abschnitt="rechner"'), html.indexOf('data-abschnitt="', html.indexOf('data-abschnitt="rechner"') + 30));
      expect(abschnitt).toMatch(/<nav\b[^>]*aria-label="Rechner auswählen"/);
      expect(count(abschnitt, /aria-current="page"/g)).toBe(1);
      expect(decode(abschnitt)).toContain(
        "Aktivieren Sie JavaScript, um mit Ihren eigenen Werten zu rechnen; die Formel und das Beispiel finden Sie weiter unten.",
      );
      expect(abschnitt).toMatch(/data-calculator="(stundensatz|angebot)"/);
    }
  });

  it("/rechner: Einstiegsfrage mit Antwort aus dem ersten Bestandsabsatz, zwei Werkzeugkarten als H3, Netto-Absatz als Notiz", async () => {
    const html = await rendern(RECHNERSEITEN_10[0].laden);
    const einstieg = html.slice(html.indexOf('data-abschnitt="einstieg"'), html.indexOf('data-abschnitt="cta"'));
    const antwort = einstieg.match(/<p\b[^>]*data-answer=""[^>]*>([\s\S]*?)<\/p>/);
    expect(decode(antwort![1])).toBe(
      "Beginnen Sie beim Stundensatz, wenn Sie Ihre internen Kosten je Stunde noch nicht kennen. Verwenden Sie diese Kosten anschließend im Angebotsrechner für einen konkreten Auftrag.",
    );
    const karten = [...einstieg.matchAll(/<article\b[\s\S]*?<\/article>/g)].map((m) => m[0]);
    expect(karten).toHaveLength(2);
    expect(karten.map((k) => decode(k.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)![1]))).toEqual([
      "Stundensatzkalkulator",
      "Angebots- und Margenrechner",
    ]);
    expect(karten.map((k) => [...k.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => [m[1], decode(m[2])]))).toEqual([
      [["/rechner/stundensatz", "Stundensatz berechnen"]],
      [["/rechner/angebotskalkulation", "Angebot kalkulieren"]],
    ]);
    expect(decode(einstieg)).toContain(
      "Beide Rechner arbeiten netto. Sie können die Umsatzsteuer zusätzlich anzeigen lassen und den verwendeten Satz selbst eintragen. Beispielwerte helfen beim Einstieg und lassen sich vollständig ersetzen.",
    );
    expect(einstieg.indexOf("Beide Rechner arbeiten netto.")).toBeLessThan(einstieg.indexOf("data-notiz"));
  });

  it("Hilfe-FAQ als FaqList mit den Bestandsfragen wörtlich (A7)", async () => {
    const stunden = await rendern(RECHNERSEITEN_10[1].laden);
    const angebot = await rendern(RECHNERSEITEN_10[2].laden);
    const faq = angebot.slice(angebot.indexOf('data-abschnitt="eingaben"'));
    expect(summaryFragen(faq)).toEqual([
      "Welchen Stundensatz trage ich ein?",
      "Was passiert bei einem zu niedrigen Angebotspreis?",
      "Wie werden Nachlässe und Umsatzsteuer berücksichtigt?",
      "Werden meine Zahlen gespeichert?",
    ]);
    expect(decode(faq)).toContain(
      "Die Berechnung läuft in Ihrem Browser. Ihre Eingaben werden nicht gespeichert oder an einen Berechnungsdienst gesendet. Ein bewusst aus dem Stundensatzrechner übernommener Kostensatz wird nur für die geöffnete Berechnung verwendet.",
    );
    const kosten = stunden.slice(stunden.indexOf('data-abschnitt="kosten-und-stunden"'));
    expect(summaryFragen(kosten)).toEqual([
      "Warum darf ich meinen Lohn nicht doppelt eintragen?",
      "Was sind verrechenbare Stunden?",
      "Gehört das Material in meinen Stundensatz?",
      "Ist die Gewinnmarge dasselbe wie ein Aufschlag?",
    ]);
  });

  it("Quelle: CalculatorPage nutzt ContentKopf mit Hinweis und Notiz, CalculatorCta bleibt erhalten (Inhaberliste)", () => {
    const src = read("components/calculators/CalculatorPage.tsx");
    expect(src).toContain("ContentKopf");
    expect(src).toContain(RECHNER_HINWEIS);
    expect(src).toContain("data-notiz");
    expect(count(src, /function CalculatorCta\b/g)).toBe(1);
    for (const datei of ["app/rechner/page.tsx", "app/rechner/stundensatz/page.tsx", "app/rechner/angebotskalkulation/page.tsx"]) {
      expect(read(datei), datei).not.toMatch(/<CalculatorCta\b|PageHero|section-space|btn-cta/);
    }
  });
});

describe("Gewichte und Farben der Paket-(c)-Dateien aus 10-03 (10-UI-SPEC § 11, Typography, Color)", () => {
  // Rechner (app/rechner/**, components/calculators/**) ergänzt 10-10; components/CraftOSLogo.tsx prüft Paket (b) (K2).
  const DATEIEN = [
    "app/support/page.tsx",
    "app/impressum/page.tsx",
    "app/datenschutz/page.tsx",
    "app/agb/page.tsx",
    "app/not-found.tsx",
    "components/legal/Legal.tsx",
    "components/legal/Legal.module.css",
    "components/content/ContentKopf.tsx",
    "components/content/ContentKopf.module.css",
  ] as const;

  it("nur Gewichte 400/600, kein text-primary-600 und kein text-ink-400", () => {
    const probleme: string[] = [];
    for (const datei of DATEIEN) {
      const src = read(datei);
      for (const m of src.matchAll(/font-weight:\s*(\d{3})\b/g)) {
        if (m[1] !== "400" && m[1] !== "600") probleme.push(`${datei}: font-weight ${m[1]} gefunden – nur 400 und 600 verwenden.`);
      }
      for (const m of src.matchAll(/\bfont-(medium|bold|extrabold)\b/g)) {
        probleme.push(`${datei}: font-weight ${m[1]} gefunden – nur 400 und 600 verwenden.`);
      }
      if (/text-primary-600|text-ink-400/.test(src)) {
        probleme.push(`${datei}: text-primary-600/text-ink-400 als Textfarbe – #784B10 bzw. #62626E verwenden.`);
      }
    }
    expect(probleme).toEqual([]);
  });
});
