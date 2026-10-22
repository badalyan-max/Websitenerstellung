/**
 * Gewerke-Vertrag (09-UI-SPEC § 1, § 1b, § 4, § 5, § 8 Zeilen „Gewerke-Daten“ und „Medien“; D-05, D-08, D-09; FEAT-04).
 * Budgets kommen aus TEXT_BUDGET.gewerk / count.gewerk* (F-A1), die Wortliste der Leitlinie L-1 aus lib/leitlinie.ts.
 * Gewerke-Budgets leben bewusst hier und nicht im Sammeltest tests/design-v2-budgets.test.ts (Fundament).
 */
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { funktionen } from "@/lib/funktionen";
import {
  CTA_GEWERK,
  GEWERK_ABSCHNITTE,
  GEWERKE_KOPFWORT,
  GEWERKE_UEBERSICHT,
  gewerke,
  pruefeGewerke,
  type Gewerk,
} from "@/lib/gewerke";
import { l1Treffer } from "@/lib/leitlinie";
import { zielwerte } from "@/lib/seo-meta";

const ROOT = path.resolve(import.meta.dirname, "..");
const B = TEXT_BUDGET.gewerk;
const C = TEXT_BUDGET.count;

/** Phase-7-Detailseiten: die sechs aus tests/funktionsdetails.test.ts plus kundenportal (D-05). */
const PHASE7 = ["gaeb", "mahnwesen", "terminplanung", "bankabgleich", "datenuebernahme", "maengelmanagement", "kundenportal"];

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const h1s = (html: string) => [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));

function jsonLd(html: string): Record<string, unknown>[] {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
}

/** Alle img-Tags; jedes muss ein Gewerke-Piktogramm mit leerem alt sein (Medien-Zeile § 8). */
function fremdeBilder(html: string): string[] {
  return [...html.matchAll(/<img\b[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => !/src="\/icons\/gewerke\/[a-z-]+\.svg"/.test(tag) || !/\balt=""/.test(tag));
}

/** Abschnitt `section[data-abschnitt=id]` aus dem gerenderten HTML (bis zum nächsten Abschnitt). */
function abschnitt(html: string, id: string): string {
  const start = html.indexOf(`data-abschnitt="${id}"`);
  if (start < 0) return "";
  const rest = html.slice(start + 1);
  const ende = rest.search(/data-abschnitt="/);
  return ende < 0 ? rest : rest.slice(0, ende);
}

async function renderDetail(slug: string): Promise<string> {
  const detail = await import("@/app/gewerke/[slug]/page");
  return renderToString(await detail.default({ params: Promise.resolve({ slug }) }));
}

async function renderUebersicht(): Promise<string> {
  const uebersicht = await import("@/app/gewerke/page");
  return renderToString(createElement(uebersicht.default));
}

const pfadVon = (g: Gewerk) => `/gewerke/${g.slug}`;

/** Gültiges Gewerk als Vorlage für Negativfälle (tiefe Kopie). */
const vorlage = (): Gewerk => structuredClone(gewerke.find((g) => g.slug === "elektriker")!);

describe("Gewerke-Daten im Budget (09-UI-SPEC § 4)", () => {
  it("zwölf Gewerke mit eindeutigen Slugs", () => {
    expect(gewerke).toHaveLength(12);
    expect(new Set(gewerke.map((g) => g.slug)).size).toBe(12);
  });

  it.each(gewerke.map((g) => [g.slug, g] as const))("%s: Antwort, Teaser, Ablauf, Beispiel, FAQ und Artikel", (_slug, g) => {
    expect(charCount(g.answer)).toBeLessThanOrEqual(TEXT_BUDGET.answer);
    expect(sentenceCount(g.answer)).toBeGreaterThanOrEqual(1);
    expect(sentenceCount(g.answer)).toBeLessThanOrEqual(2);
    expect(charCount(g.teaser)).toBeLessThanOrEqual(B.teaser);
    expect(sentenceCount(g.teaser)).toBe(1);

    expect(g.ablauf.length).toBeGreaterThanOrEqual(C.gewerkSteps.min);
    expect(g.ablauf.length).toBeLessThanOrEqual(C.gewerkSteps.max);
    for (const s of g.ablauf) {
      expect(charCount(s.title), s.title).toBeLessThanOrEqual(TEXT_BUDGET.step.title);
      expect(charCount(s.text), s.text).toBeLessThanOrEqual(TEXT_BUDGET.step.text);
      expect(sentenceCount(s.text), s.text).toBe(1);
    }

    expect(charCount(g.exampleTitle)).toBeLessThanOrEqual(B.exampleTitle);
    expect(charCount(g.example)).toBeLessThanOrEqual(B.example);
    expect(sentenceCount(g.example)).toBeLessThanOrEqual(2);

    expect(g.faq.length).toBeGreaterThanOrEqual(C.gewerkFaq.min);
    expect(g.faq.length).toBeLessThanOrEqual(C.gewerkFaq.max);
    for (const f of g.faq) {
      expect(f.q.endsWith("?"), f.q).toBe(true);
      expect(charCount(f.q), f.q).toBeLessThanOrEqual(TEXT_BUDGET.faq.question);
      expect(charCount(f.a), f.q).toBeLessThanOrEqual(TEXT_BUDGET.faq.answerCentral);
    }

    expect(g.artikel.length).toBeGreaterThanOrEqual(C.gewerkArtikel.min);
    expect(g.artikel.length).toBeLessThanOrEqual(C.gewerkArtikel.max);
  });

  it("verbotene Altfelder existieren nicht (heroTitle, heroIntro, hatVorlagen)", () => {
    for (const g of gewerke) {
      for (const feld of ["heroTitle", "heroIntro", "hatVorlagen"]) {
        expect(Object.hasOwn(g, feld), `${g.slug}.${feld}`).toBe(false);
      }
    }
  });
});

describe("Ablauf, Funktionen und FAQ (09-UI-SPEC § 1.3, § 5)", () => {
  const live = new Set(funktionen.filter((f) => f.tier === "heute").map((f) => f.slug));

  it("jeder Ablaufschritt verlinkt eine Funktion aus funktionen; 4–6 Live-Funktionen mit mindestens einer Phase-7-Seite", () => {
    for (const g of gewerke) {
      for (const s of g.ablauf) expect(g.funktionen, `${g.slug}: ${s.title}`).toContain(s.funktion);
      expect(g.funktionen.length, g.slug).toBeGreaterThanOrEqual(C.gewerkFunktionen.min);
      expect(g.funktionen.length, g.slug).toBeLessThanOrEqual(C.gewerkFunktionen.max);
      expect(new Set(g.funktionen).size, g.slug).toBe(g.funktionen.length);
      expect(g.funktionen.some((f) => PHASE7.includes(f)), g.slug).toBe(true);
      for (const f of g.funktionen) expect(live.has(f), `${g.slug}: ${f}`).toBe(true);
    }
  });

  it("über alle zwölf Gewerke höchstens eine gemeinsame FAQ-Frage", () => {
    const zaehler = new Map<string, number>();
    for (const g of gewerke) for (const f of g.faq) zaehler.set(f.q, (zaehler.get(f.q) ?? 0) + 1);
    const gemeinsam = [...zaehler].filter(([, n]) => n > 1).map(([q]) => q);
    expect(gemeinsam.length).toBeLessThanOrEqual(1);
  });

  it("pruefeGewerke wirft die Fehlertexte aus § 5", () => {
    const dreiSchritte = vorlage();
    dreiSchritte.ablauf = dreiSchritte.ablauf.slice(0, 3);
    expect(() => pruefeGewerke([dreiSchritte])).toThrow("Gewerk elektriker: Ablauf hat 3 Schritte – 4 bis 5 erforderlich.");

    const fremderSlug = vorlage();
    fremderSlug.ablauf[0] = { ...fremderSlug.ablauf[0], funktion: "aufmass" };
    expect(() => pruefeGewerke([fremderSlug])).toThrow(
      "Gewerk elektriker: Schritt ‚Material kalkulieren‘ verlinkt aufmass, das nicht unter funktionen steht – Slug ergänzen oder Schritt ändern.",
    );

    const ohnePhase7 = vorlage();
    ohnePhase7.funktionen = ["angebote", "plantafel", "zeiterfassung", "lager", "rechnungen"];
    ohnePhase7.ablauf = ohnePhase7.ablauf.filter((s) => s.funktion !== "gaeb");
    expect(() => pruefeGewerke([ohnePhase7])).toThrow(
      "Gewerk elektriker: 5 Funktionen – 4 bis 6 erforderlich, davon mindestens eine Phase-7-Detailseite.",
    );

    const falscherArtikel = vorlage();
    falscherArtikel.artikel = ["/hilfe/plantafel-einsatz-planen", "/ratgeber/gibt-es-nicht"];
    expect(() => pruefeGewerke([falscherArtikel])).toThrow(
      "Gewerk elektriker: Artikel /ratgeber/gibt-es-nicht fehlt – nur bestehende Artikel verlinken.",
    );

    const l1 = vorlage();
    l1.faq[0] = { ...l1.faq[0], a: "Onlinezahlung ist möglich." };
    expect(() => pruefeGewerke([l1])).toThrow("Text lib/gewerke.ts (elektriker) enthält ‚Onlinezahlung‘ – nur Unterstütztes nennen (Leitlinie L-1).");

    expect(() => pruefeGewerke(gewerke)).not.toThrow();
  });

  it("jedes Artikelziel existiert als content/{blog,hilfe}/<slug>.md", () => {
    const fehlend: string[] = [];
    for (const g of gewerke) {
      for (const pfad of g.artikel) {
        const [, art, slug] = pfad.split("/");
        const datei = path.join(ROOT, "content", art, `${slug}.md`);
        if (!(["blog", "hilfe"].includes(art) && fs.existsSync(datei))) {
          fehlend.push(`Gewerk ${g.slug}: Artikel ${pfad} fehlt – nur bestehende Artikel verlinken.`);
        }
      }
    }
    expect(fehlend).toEqual([]);
  });

  it("Leitlinie L-1: kein Gewerke-Text trifft die zentrale Wortliste", () => {
    const texte = [
      GEWERKE_UEBERSICHT.answer,
      GEWERKE_UEBERSICHT.gewerke.title,
      GEWERKE_UEBERSICHT.gewerke.lead,
      CTA_GEWERK.title,
      CTA_GEWERK.text,
      ...Object.values(GEWERK_ABSCHNITTE).flatMap((a) => [typeof a.title === "string" ? a.title : a.title("X"), a.lead]),
      ...gewerke.flatMap((g) => [
        g.name,
        g.answer,
        g.teaser,
        g.exampleTitle,
        g.example,
        ...g.ablauf.flatMap((s) => [s.title, s.text]),
        ...g.faq.flatMap((f) => [f.q, f.a]),
      ]),
    ];
    expect(texte.flatMap((t) => l1Treffer(t).map((w) => `${w}: ${t.slice(0, 60)}`))).toEqual([]);
  });
});

describe("Prompt-Anker Elektro und Maler (D-10, 09-UI-SPEC § 1.3)", () => {
  it("die Antworten unter /gewerke/elektriker#antwort und /gewerke/maler#antwort nennen das Gewerk (kurz)", () => {
    const elektriker = gewerke.find((g) => g.slug === "elektriker")!;
    const maler = gewerke.find((g) => g.slug === "maler")!;
    expect(elektriker.kurz).toBe("Elektro");
    expect(maler.kurz).toBe("Maler");
    expect(elektriker.answer).toContain("Elektro");
    expect(maler.answer).toContain("Maler");
    for (const g of [elektriker, maler]) expect(charCount(g.answer)).toBeLessThanOrEqual(TEXT_BUDGET.answer);
  });
});

describe("H1 und Kopfwort aus der Keyword-Map (09-UI-SPEC § 1.3)", () => {
  it("Kopfwort steht wörtlich in der Map-H1; H1 ≤ 60", () => {
    for (const g of gewerke) {
      const { h1 } = zielwerte(pfadVon(g));
      expect(charCount(h1), g.slug).toBeLessThanOrEqual(TEXT_BUDGET.pageHead.h1);
      expect(h1.includes(g.kopfwort), `${g.slug}: ‚${g.kopfwort}‘ in „${h1}“`).toBe(true);
    }
    const uebersicht = zielwerte("/gewerke").h1;
    expect(charCount(uebersicht)).toBeLessThanOrEqual(TEXT_BUDGET.pageHead.h1);
    expect(uebersicht).toContain(GEWERKE_KOPFWORT);
  });

  it("„zwölf“ in H1, Antwort und H2 der Übersicht genau dann, wenn es zwölf Gewerke gibt", () => {
    const zwoelf = gewerke.length === 12;
    for (const text of [zielwerte("/gewerke").h1, GEWERKE_UEBERSICHT.answer, GEWERKE_UEBERSICHT.gewerke.title]) {
      expect(/zwölf/i.test(text), text).toBe(zwoelf);
    }
  });
});

describe("Gerenderte Gewerke-Seiten (09-UI-SPEC § 1.1, § 1b, § 8 „Medien“)", () => {
  it.each(gewerke.map((g) => [g.slug, g] as const))(
    "%s: FunktionsKopf mit Map-H1, Kopfwort, #antwort; FAQPage = sichtbare Fragen; nur Gewerke-Piktogramme",
    async (slug, g) => {
      const html = await renderDetail(slug);
      const z = zielwerte(pfadVon(g));
      expect(h1s(html)).toEqual([z.h1]);
      expect(html).toContain('data-funktions-kopf=""');
      expect(html).toMatch(/<h1 id="gewerk-titel"/);
      expect(html).toMatch(new RegExp(`data-keyword="">${g.kopfwort.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</span>`));
      const antwort = html.match(/<p id="antwort" data-answer=""[^>]*>([\s\S]*?)<\/p>/);
      expect(antwort?.[1] && decode(antwort[1])).toBe(g.answer);
      expect(html).toContain(">Gewerke</p>");
      expect(html).toMatch(/<a [^>]*href="#ablauf"[^>]*>So läuft ein Auftrag<\/a>/);
      expect(html).not.toContain("PageHero");

      const faqs = jsonLd(html).filter((d) => d["@type"] === "FAQPage");
      expect(faqs).toHaveLength(1);
      const schemaFragen = (faqs[0].mainEntity as { name: string }[]).map((q) => q.name);
      const sichtbar = [...abschnitt(html, "faq").matchAll(/<summary[^>]*>\s*<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => decode(m[1]));
      expect(sichtbar).toEqual(g.faq.map((f) => f.q));
      expect(schemaFragen).toEqual(sichtbar);

      expect(fremdeBilder(html)).toEqual([]);
      expect(html).not.toMatch(/werkstatt-2026|\.webp|\.jpe?g|\.png/);
    },
    30_000,
  );

  it.each(gewerke.map((g) => [g.slug, g] as const))(
    "%s: „Weiterlesen“ (Warm) zwischen FAQ und CTA mit 2–3 LinkKarten auf die Artikel aus g.artikel",
    async (slug, g) => {
      const html = await renderDetail(slug);
      const reihenfolge = [...html.matchAll(/data-abschnitt="([a-z-]+)"/g)].map((m) => m[1]);
      expect(reihenfolge).toEqual(["kopf", "ablauf", "funktionen", "faq", "weiterlesen", "cta"]);
      const teil = abschnitt(html, "weiterlesen");
      expect(teil).toContain("bg-[#f7f3eb]");
      expect(teil).toContain(`>${GEWERK_ABSCHNITTE.weiterlesen.title}</h2>`);
      expect(decode(teil)).toContain(GEWERK_ABSCHNITTE.weiterlesen.lead);
      expect(teil).toContain('data-surface="white"');
      const ziele = [...teil.matchAll(/<h3[^>]*><a [^>]*href="([^"]+)"/g)].map((m) => m[1]);
      expect(ziele).toEqual(g.artikel);
      for (const pfad of g.artikel) {
        const label = pfad.startsWith("/blog/") ? "Ratgeber" : "Hilfe";
        expect(teil, pfad).toContain(`>${label}</p>`);
      }
      expect([...teil.matchAll(/>(\d+) Min\. Lesezeit</g)]).toHaveLength(g.artikel.length);
    },
    30_000,
  );

  it("/gewerke: FunktionsKopf mit Antwort, zwölf LinkKarten mit Piktogramm und Teaser, CTA-Band, kein KI-Bild", async () => {
    const html = await renderUebersicht();
    expect(h1s(html)).toEqual([zielwerte("/gewerke").h1]);
    expect(html).toMatch(new RegExp(`data-keyword="">${GEWERKE_KOPFWORT}</span>`));
    const antwort = html.match(/<p id="antwort" data-answer=""[^>]*>([\s\S]*?)<\/p>/);
    expect(antwort?.[1] && decode(antwort[1])).toBe(GEWERKE_UEBERSICHT.answer);
    expect(html).toMatch(/<a [^>]*href="#gewerke"[^>]*>Zu den Gewerken<\/a>/);
    expect(html).toContain('data-abschnitt="gewerke"');
    expect(html).toContain(`>${GEWERKE_UEBERSICHT.gewerke.title}</h2>`);

    const karten = abschnitt(html, "gewerke");
    const ziele = [...karten.matchAll(/href="(\/gewerke\/[a-z-]+)"/g)].map((m) => m[1]);
    expect(ziele).toEqual(gewerke.map(pfadVon));
    for (const g of gewerke) {
      expect(karten, g.slug).toContain(`src="/icons/gewerke/${g.slug}.svg"`);
      expect(decode(karten), g.slug).toContain(g.teaser);
    }
    expect(html).toContain(CTA_GEWERK.title);
    expect(html).not.toContain("werkstatt-2026");
    expect(fremdeBilder(html)).toEqual([]);
    expect(jsonLd(html).filter((d) => d["@type"] === "FAQPage")).toHaveLength(0);
  });
});
