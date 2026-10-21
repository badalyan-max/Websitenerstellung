/**
 * Startseite `/` (Phase 6, Plan 06-04; D-02, D-03, D-11, D-12, D-19): Texte budgetgeprüft in
 * lib/home-content.ts, alle Zahlen aus site.ts, tarife und dem Produktregister, Abschnittsfolge
 * und FAQPage-Schema der gerenderten Seite.
 */
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { euro, germanDate } from "@/lib/format";
import { getFunktionsgruppen } from "@/lib/funktionsgruppen";
import { keywordMap } from "@/lib/keyword-map";
import { mobileLocales, productBasis } from "@/lib/product-register";
import { site, tarife } from "@/lib/site";
import * as home from "@/lib/home-content";

const NBSP = " ";
const tarif = (id: "voll" | "app") => tarife.find((t) => t.id === id)!;
const target = keywordMap.find((k) => k.path === "/")!.target!;
const firstSentence = (text: string) => text.split(/(?<=[.!?])\s+/)[0] ?? text;

describe("Startseiteninhalte", () => {
  it("Hero: H1 = Keyword-Map-Ziel, Lead ein Satz im Budget, CTA mit Testtagen", () => {
    const h1 = home.hero.h1Keyword + home.hero.h1Rest;
    expect(h1).toBe(target.h1);
    expect(home.hero.h1Keyword).toBe("Handwerkersoftware,");
    expect(h1).toContain("Handwerkersoftware");
    expect(charCount(h1)).toBeLessThanOrEqual(TEXT_BUDGET.hero.h1);
    expect(sentenceCount(home.hero.lead)).toBe(1);
    expect(charCount(home.hero.lead)).toBeLessThanOrEqual(TEXT_BUDGET.hero.lead);
    expect(home.hero.ctaLabel).toBe(`${site.trialDays} Tage kostenlos testen`);
    expect(home.hero.secondary).toEqual({ label: "Alle Funktionen ansehen", href: "/funktionen" });
    expect(charCount(home.hero.pairDescription)).toBeLessThanOrEqual(140);
  });

  it("Metadaten entsprechen der Keyword-Map (D-11, D-12)", () => {
    expect(home.homeMetadata.title).toBe(target.title);
    expect(home.homeMetadata.title).toBe("Handwerkersoftware für Büro und Baustelle | CraftOS");
    expect(home.homeMetadata.description).toBe(target.description);
    expect(home.homeMetadata.description.length).toBeGreaterThanOrEqual(120);
    expect(home.homeMetadata.description.length).toBeLessThanOrEqual(155);
  });

  it("sieben Abschnitte; jeder Kopf mit Titel ≤ 60 und genau einem Satz ≤ 140", () => {
    expect(home.HOME_SECTION_IDS).toEqual(["kennzahlen", "ablauf", "kernfunktionen", "apps", "preise", "faq", "abschluss"]);
    const n = home.HOME_SECTION_IDS.length;
    expect(n).toBeGreaterThanOrEqual(TEXT_BUDGET.count.homeSections.min);
    expect(n).toBeLessThanOrEqual(TEXT_BUDGET.count.homeSections.max);
    for (const id of home.HOME_SECTION_IDS) {
      if (id === "abschluss") continue;
      const section = home.homeSections[id];
      expect(charCount(section.title), id).toBeLessThanOrEqual(TEXT_BUDGET.sectionHeader.title);
      expect(sentenceCount(section.lead), id).toBe(1);
      expect(charCount(section.lead), id).toBeLessThanOrEqual(TEXT_BUDGET.sectionHeader.lead);
    }
    const { abschluss } = home.homeSections;
    expect(charCount(abschluss.title)).toBeLessThanOrEqual(TEXT_BUDGET.ctaBand.title);
    expect(sentenceCount(abschluss.text)).toBe(1);
    expect(charCount(abschluss.text)).toBeLessThanOrEqual(TEXT_BUDGET.ctaBand.text);
    expect(abschluss.secondary).toEqual({ label: "Preise ansehen", href: "/preise" });
    expect(home.homeSections.kernfunktionen.link).toEqual({ label: "Alle Funktionen ansehen", href: "/funktionen" });
    expect(home.homeSections.apps.link).toEqual({ label: "Mobile-App ansehen", href: "/app" });
    expect(home.homeSections.preise.link).toEqual({ label: "Alle Preise ansehen", href: "/preise" });
  });

  it("Kennzahlen stammen aus site.ts, tarife und Produktregister", () => {
    const expected: Record<string, string> = {
      "site.trialDays": `${site.trialDays}${NBSP}Tage`,
      "tarife.voll.monat": euro(tarif("voll").monat),
      "tarife.app.monat": euro(tarif("app").monat),
      "product-register: mobileLocales": String(mobileLocales.length),
    };
    const { facts, note } = home.keyFactsContent;
    expect(facts.map((f) => f.source)).toEqual(Object.keys(expected));
    for (const fact of facts) expect(fact.value, fact.source).toBe(expected[fact.source]);
    expect(note).toBe(`Preise netto zzgl. USt. Stand: ${germanDate(productBasis.checkedAt)}.`);
    expect(facts.some((f) => /Funktion/.test(f.label))).toBe(false);
  });

  it("Arbeitsablauf: sechs Schritte mit Gruppen-Label, -Icon und -Anker", () => {
    const gruppen = getFunktionsgruppen();
    expect(home.stepContent).toHaveLength(6);
    expect(home.stepContent.map((s) => s.title)).toEqual(["Angebot", "Planung", "Baustelle", "Rechnung", "Buchhaltung", "Team"]);
    expect(home.stepContent.map((s) => s.href)).toEqual(
      ["angebot", "planung", "baustelle", "rechnung", "buchhaltung", "team"].map((id) => `/funktionen#${id}`),
    );
    home.stepContent.forEach((step, i) => {
      expect(step.title).toBe(gruppen[i].label);
      expect(step.icon, step.title).toBe(gruppen[i].icon);
      expect(charCount(step.text), step.title).toBeLessThanOrEqual(TEXT_BUDGET.step.text);
      expect(sentenceCount(step.text), step.title).toBe(1);
    });
  });

  it("Kernfunktionen: fünf Kacheln lg, sm, sm, md, wide mit genau einer dunklen Kachel", () => {
    const tiles = home.bentoContent;
    expect(tiles.map((t) => t.size)).toEqual(["lg", "sm", "sm", "md", "wide"]);
    expect(tiles.filter((t) => t.surface === "dark")).toHaveLength(1);
    expect(tiles.map((t) => t.href)).toEqual([
      "/funktionen/rechnungen",
      "/funktionen/angebote",
      "/funktionen/eingangsrechnungen",
      "/funktionen/zeiterfassung",
      "/funktionen/baudokumentation",
    ]);
    for (const tile of tiles) {
      expect(tile.href).toBe(`/funktionen/${tile.slug}`);
      expect(charCount(tile.title), tile.title).toBeLessThanOrEqual(TEXT_BUDGET.bentoTile.title);
      const max = tile.size === "lg" || tile.size === "wide" ? TEXT_BUDGET.bentoTile.textLarge : TEXT_BUDGET.bentoTile.textSmall;
      expect(charCount(tile.text), tile.title).toBeLessThanOrEqual(max);
    }
    // Plantafel steht schon im Hero – keine doppelte Szene auf einer Seite.
    expect(tiles.some((t) => t.visual.kind !== "icon" && t.visual.scene.screen === "web:Plantafel")).toBe(false);
    expect(home.appsContent.scene.screen).toBe("app:Aufmaß");
  });

  it("FAQ: fünf direkte Fragen mit Werten aus tarife und site", () => {
    const faq = home.faqContent;
    expect(faq).toHaveLength(5);
    for (const item of faq) {
      expect(item.q.endsWith("?"), item.q).toBe(true);
      expect(charCount(item.q), item.q).toBeLessThanOrEqual(TEXT_BUDGET.faq.question);
      expect(charCount(item.a), item.q).toBeLessThanOrEqual(TEXT_BUDGET.faq.answer);
      expect(charCount(firstSentence(item.a)), item.q).toBeLessThanOrEqual(TEXT_BUDGET.faq.firstSentence);
    }
    expect(faq[0].a).toContain(euro(tarif("voll").monat));
    expect(faq[0].a).toContain(euro(tarif("app").monat));
    expect(faq[1].a).toContain(`${site.trialDays} Tage`);
    expect(faq[3].q).toContain("GoBD");
  });

  it("Quelltext ohne Preisliterale und ohne festgeschriebene Testtage", () => {
    const source = fs.readFileSync(path.resolve(import.meta.dirname, "../lib/home-content.ts"), "utf8");
    expect(source).not.toMatch(/29,95|9,95|299,50|99,50/);
    expect(source).not.toMatch(/\d\s*€/);
    expect(source).not.toContain("10 Tage");
    expect(source).toContain("getFunktionsgruppen");
  });
});

describe("Startseite gerendert", () => {
  const html = renderToString(createElement(Home));
  const sectionIds = [...html.matchAll(/data-home-section="([^"]+)"/g)].map((m) => m[1]);

  it("genau ein H1 mit ungetrenntem Keyword", () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toMatch(/<span[^>]*data-keyword=""[^>]*>Handwerkersoftware,<\/span>/);
  });

  it("sieben Abschnitte in der Reihenfolge HOME_SECTION_IDS, je höchstens eine H2", () => {
    expect(sectionIds).toEqual([...home.HOME_SECTION_IDS]);
    const starts = sectionIds.map((id) => html.indexOf(`data-home-section="${id}"`));
    starts.forEach((start, i) => {
      const chunk = html.slice(start, starts[i + 1] ?? html.length);
      expect((chunk.match(/<h2[\s>]/g) ?? []).length, sectionIds[i]).toBeLessThanOrEqual(1);
    });
  });

  it("FAQPage-JSON-LD enthält genau die fünf sichtbaren Fragen", () => {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const faq = blocks.filter((b) => b["@type"] === "FAQPage");
    expect(faq).toHaveLength(1);
    const names = faq[0].mainEntity.map((q: { name: string }) => q.name);
    expect(names).toEqual(home.faqContent.map((f) => f.q));
    for (const item of home.faqContent) expect(html).toContain(item.q);
    // Organization/SoftwareApplication kommen aus dem Layout, nicht aus der Seite.
    expect(blocks.some((b) => b["@type"] === "Organization" || b["@type"] === "SoftwareApplication")).toBe(false);
  });

  it("Produktdarstellung: DevicePair compact, Kurzform-Belege, Kennzeichnung je Rahmen", () => {
    expect(html).toMatch(/data-figure="pair"[^>]*data-layout="compact"/);
    expect(html).not.toContain('data-evidence="web:src');
    expect(html).not.toContain('data-evidence="mobile:');
    expect((html.match(/Vereinfachte Darstellung mit Beispieldaten/g) ?? []).length).toBeGreaterThanOrEqual(5);
  });

  it("CTA auf site.ctaUrl ohne Login-Tracking; keine Altbausteine", () => {
    expect(html).toContain(`href="${site.ctaUrl}"`);
    expect(html).toMatch(new RegExp(`<a href="${site.ctaUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*data-track="trial"`));
    expect(html).not.toContain('data-track="login"');
    expect(html).not.toContain("produktdemo");
    expect(html).not.toContain("data-feature-snippet");
  });
});
