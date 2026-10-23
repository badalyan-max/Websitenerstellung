/**
 * Interne Links im Hauptteil der Rechtsseiten (QA-06, Befunde O2 und O3 des Bestätigungsaudits, 80-Punkte-Liste
 * Gruppe 7: „3 to 5 internal links in the body“, „Links point at the money pages“).
 *
 * Jede Rechtsseite führt unter dem Rechtstext mindestens drei interne Links, darunter /funktionen und /preise. Gezählt
 * wird ohne die Brotkrumen (nav[aria-label="Brotkrumen"]); die Links liegen außerhalb von `data-rechtstext`, damit der
 * Wortlaut-Schutz (tests/rechtstexte-wortlaut.test.ts) unverändert gilt. Gerendert wird die Seite ohne Layout, also
 * ohne Kopf- und Fußleiste; alles im Ergebnis liegt im späteren <main>.
 */
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

const SEITEN: { pfad: string; laden: () => Promise<{ default: ComponentType }> }[] = [
  { pfad: "/impressum", laden: () => import("@/app/impressum/page") },
  { pfad: "/datenschutz", laden: () => import("@/app/datenschutz/page") },
  { pfad: "/agb", laden: () => import("@/app/agb/page") },
];

/** Interne Linkziele (Pfad mit „/“) ohne Brotkrumen und ohne den Rechtstext-Container. */
function interneZieleAusserhalbRechtstext(html: string): string[] {
  const ohneBrotkrumen = html.replace(/<nav\b[^>]*aria-label="Brotkrumen"[^>]*>[\s\S]*?<\/nav>/g, "");
  const start = ohneBrotkrumen.search(/<div\b[^>]*\sdata-rechtstext(?:[\s=>])/);
  if (start < 0) throw new Error("data-rechtstext fehlt");
  const tagRe = /<(\/?)div\b[^>]*>/g;
  tagRe.lastIndex = start;
  let tiefe = 0;
  let ende = -1;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(ohneBrotkrumen)) !== null) {
    tiefe += m[1] === "/" ? -1 : 1;
    if (tiefe === 0) {
      ende = m.index + m[0].length;
      break;
    }
  }
  if (ende < 0) throw new Error("data-rechtstext: schließendes </div> fehlt");
  const ausserhalb = ohneBrotkrumen.slice(0, start) + ohneBrotkrumen.slice(ende);
  return [...ausserhalb.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/g)].map((t) => t[1]);
}

describe("Rechtsseiten: interne Links im Hauptteil (QA-06, O2/O3)", () => {
  for (const { pfad, laden } of SEITEN) {
    it(`${pfad}: mindestens drei interne Links außerhalb der Brotkrumen, darunter /funktionen und /preise`, async () => {
      const { default: Seite } = await laden();
      const html = renderToStaticMarkup(createElement(Seite));
      const ziele = new Set(interneZieleAusserhalbRechtstext(html));
      expect(ziele.size, [...ziele].join(", ")).toBeGreaterThanOrEqual(3);
      expect([...ziele]).toEqual(expect.arrayContaining(["/funktionen", "/preise"]));
    }, 60_000); // Kaltstart des Seitenimports unter Volllast der Suite (wie rechtstexte-wortlaut.test.ts)
  }
});
