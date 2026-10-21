/**
 * Funktionsübersicht `/funktionen` (Phase 6, Plan 06-05; FEAT-01, D-07, D-08, D-09, D-10, D-11, D-18):
 * Seitenkopf mit Keyword-H1 und Sprungnavigation, sechs Gruppenabschnitte aus getFunktionsgruppen(),
 * 16 Detailkarten + 14 Zusatzfunktionen, CtaBand sowie BreadcrumbList- und ItemList-JSON-LD.
 */
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import FunktionenPage, { metadata } from "@/app/funktionen/page";
import { charCount } from "@/components/v2/budgets";
import { GRUPPEN_REIHENFOLGE, getFunktionsgruppen } from "@/lib/funktionsgruppen";
import { keywordMap } from "@/lib/keyword-map";
import { cardScenes } from "@/lib/scenes";
import { itemListSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const gruppen = getFunktionsgruppen();
const html = renderToString(createElement(FunktionenPage));
const target = keywordMap.find((k) => k.path === "/funktionen")!.target!;

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const text = (s: string) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const all = (re: RegExp) => [...html.matchAll(re)].map((m) => m[1]);

/** Inhalt des <li data-funktion="id"> mit ausbalancierter Zählung (Badges enthalten eigene li). */
function eintrag(id: string): string {
  const start = html.indexOf(`data-funktion="${id}"`);
  expect(start, `data-funktion ${id} vorhanden`).toBeGreaterThan(-1);
  const open = html.lastIndexOf("<li", start);
  const re = /<li[\s>]|<\/li>/g;
  re.lastIndex = open;
  let depth = 0;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    depth += m[0] === "</li>" ? -1 : 1;
    if (depth === 0) return html.slice(open, m.index + 5);
  }
  throw new Error(`li für ${id} nicht geschlossen`);
}

function jsonLd(): Record<string, unknown>[] {
  return all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g).map((raw) => JSON.parse(raw));
}

describe("itemListSchema", () => {
  it("liefert ItemList mit Positionen und absoluten URLs", () => {
    expect(itemListSchema("Funktionen von CraftOS", [{ name: "A", path: "/funktionen/a" }])).toEqual({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Funktionen von CraftOS",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "A", url: site.url + "/funktionen/a" }],
    });
  });
});

describe("Funktionsübersicht /funktionen", () => {
  it("Metadaten folgen der Keyword-Map (D-11, D-12)", () => {
    expect(metadata.title).toBe("Software für Handwerksbetriebe: alle Funktionen");
    expect(`${String(metadata.title)} | CraftOS`).toBe(target.title);
    expect(metadata.description).toBe(target.description);
    const len = charCount(String(metadata.description));
    expect(len).toBeGreaterThanOrEqual(120);
    expect(len).toBeLessThanOrEqual(155);
  });

  it("Seitenkopf: genau eine H1 mit Keyword-Span und Sprungnavigation in Gruppenreihenfolge", () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)![1];
    expect(text(h1)).toBe("Alle Funktionen der Software für Handwerksbetriebe");
    expect(h1).toMatch(/<span[^>]*data-keyword=""[^>]*>Handwerksbetriebe<\/span>/);
    const nav = html.match(/<nav aria-label="Funktionsgruppen"[^>]*>([\s\S]*?)<\/nav>/);
    expect(nav, "nav Funktionsgruppen").toBeTruthy();
    const hrefs = [...nav![1].matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs).toEqual(GRUPPEN_REIHENFOLGE.map((id) => `#${id}`));
    const labels = [...nav![1].matchAll(/<a[^>]*>([\s\S]*?)<\/a>/g)].map((m) => text(m[1]));
    expect(labels).toEqual(gruppen.map((g) => g.label));
  });

  it("sechs Gruppenabschnitte in fester Reihenfolge mit Anker-H2, Eyebrow, Titel und Lead", () => {
    expect(all(/data-gruppe="([^"]+)"/g)).toEqual([...GRUPPEN_REIHENFOLGE]);
    for (const g of gruppen) {
      const start = html.indexOf(`data-gruppe="${g.id}"`);
      const section = html.slice(html.lastIndexOf("<section", start), html.indexOf("</section>", start));
      expect(section).toContain(`aria-labelledby="${g.id}"`);
      const h2 = section.match(/<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/);
      expect(h2?.[1], `${g.id}: H2-id`).toBe(g.id);
      expect(text(h2![2])).toBe(g.heading);
      expect(text(section)).toContain(g.label);
      expect(text(section)).toContain(g.lead);
    }
  });

  it("30 Funktionen: 16 Detailkarten mit Visual und 14 Zusatzfunktionen je Gruppe in Modellreihenfolge", () => {
    const erwartet = gruppen.flatMap((g) => [...g.details.map((d) => d.slug), ...g.extras.map((x) => x.id)]);
    expect(erwartet).toHaveLength(30);
    expect(all(/data-funktion="([^"]+)"/g)).toEqual(erwartet);
    const details = gruppen.flatMap((g) => g.details);
    expect(details).toHaveLength(16);
    expect(all(/>(Mehr zu [^<]+)</g).map(decode)).toEqual(details.map((d) => `Mehr zu ${d.name}`));
    for (const d of details) {
      const li = eintrag(d.slug);
      expect(li, `${d.slug}: Link`).toContain(`href="${d.href}"`);
      const visual = li.match(/data-visual="(scene|icon)"/)?.[1];
      expect(visual, `${d.slug}: Visual`).toBe(cardScenes[d.slug] ? "scene" : "icon");
      expect(decode(li)).toContain(d.benefit);
    }
    expect(html.match(/>Weitere Funktionen<\/h3>/g)).toHaveLength(gruppen.filter((g) => g.extras.length > 0).length);
    expect(gruppen.filter((g) => g.extras.length > 0)).toHaveLength(6);
  });

  it("Zusatzfunktionen verlinken nur mit Ziel (7 mit Link, 7 ohne)", () => {
    const extras = gruppen.flatMap((g) => g.extras);
    expect(extras).toHaveLength(14);
    const mitZiel = extras.filter((x) => x.target);
    expect(mitZiel).toHaveLength(7);
    for (const x of extras) {
      const li = eintrag(x.id);
      if (x.target) {
        expect(li, `${x.id}: Link auf Ziel`).toContain(`href="${x.target.href}"`);
        expect(li.match(/<a[\s>]/g), `${x.id}: genau ein Link`).toHaveLength(1);
      } else {
        expect(li, `${x.id}: ohne Link`).not.toMatch(/<a[\s>]/);
      }
    }
  });

  it("JSON-LD: BreadcrumbList Start → Funktionen und ItemList mit 16 Detailseiten", () => {
    const daten = jsonLd();
    const crumbs = daten.find((d) => d["@type"] === "BreadcrumbList") as {
      itemListElement: { position: number; name: string; item: string }[];
    };
    expect(crumbs).toBeTruthy();
    expect(crumbs.itemListElement.map((i) => [i.position, i.name, i.item])).toEqual([
      [1, "Start", site.url + "/"],
      [2, "Funktionen", site.url + "/funktionen"],
    ]);
    const list = daten.find((d) => d["@type"] === "ItemList") as {
      name: string;
      itemListElement: { position: number; name: string; url: string }[];
    };
    expect(list?.name).toBe("Funktionen von CraftOS");
    const details = gruppen.flatMap((g) => g.details);
    expect(list.itemListElement).toHaveLength(16);
    list.itemListElement.forEach((item, n) => {
      expect(item.position).toBe(n + 1);
      expect(item.name).toBe(details[n].name);
      expect(item.url).toBe(`${site.url}/funktionen/${details[n].slug}`);
    });
  });

  it("keine Ankündigung, kein Craft AI im Inhalt, nur Kurzform-Belege, kein Altmarkup", () => {
    const inhalt = text(html);
    expect(inhalt).not.toContain("Vorhersagen");
    expect(html).not.toContain('href="/craft-ai"');
    expect(html).not.toMatch(/data-evidence="web:src/);
    expect(html).not.toMatch(/data-evidence="mobile:/);
    for (const ev of all(/data-evidence="([^"]+)"/g)) expect(ev).toMatch(/^(web|app):[^\s/]+$/);
    // PageHero (craft-page-hero, Alt-.eyebrow), TrialCta (btn-cta „Jetzt Ihren Betrieb anlegen“), Lizenz-Hinweisbox
    expect(html).not.toMatch(/feature-grid|feature-link|class="notice|craft-page-hero|class="eyebrow"|class="btn-cta"/);
    expect(inhalt).not.toContain("Jetzt Ihren Betrieb anlegen");
    expect(inhalt).not.toMatch(/Seite folgt|demnächst|in Vorbereitung/i);
  });

  it("CtaBand: Titel, Satz, Test-CTA auf site.ctaUrl ohne Login-Tracking, Sekundär Preise", () => {
    const band = html.slice(html.indexOf("Alle Funktionen selbst ausprobieren") - 400);
    expect(band).toContain("Alle Funktionen selbst ausprobieren");
    expect(decode(band)).toContain("Ohne Zahlungsdaten – Sie entscheiden nach dem Test.");
    const cta = band.match(/<a[^>]*href="([^"]+)"[^>]*>[^<]*Tage kostenlos testen/);
    expect(cta?.[1]).toBe(site.ctaUrl);
    expect(cta![0]).not.toContain('data-track="login"');
    expect(band).toMatch(/<a[^>]*href="\/preise"[^>]*>Preise ansehen<\/a>/);
  });
});
