/**
 * Phase-9-Köpfe bleiben Byte für Byte gleich (Phase 10, Plan 10-03; 10-UI-SPEC K3).
 *
 * `ContentKopf` wird auf rund 90 Ratgeber-, Hilfe-, Übersichts- und Kategorieseiten gerendert. Die
 * Ergänzungen K1 (`crumbs={null}`) und K2 (`hinweis`) dürfen dort nichts ändern. Der Test entstand vor
 * der ersten Kopfänderung und vergleicht
 * 1. die `section[data-abschnitt="kopf"]` von drei Phase-9-Seiten (Artikel, Übersicht, Kategorie) und
 * 2. die Deklarationen der Grundregeln (`.kopf`, `.crumbs`, `.inner`, `.title`, `.answer`, `.lead`,
 *    `.meta`, `.stand`, `.platforms`) in `ContentKopf.module.css`
 * per readFileSync + toBe mit Referenzen aus dem unveränderten Stand unter tests/fixtures/contentkopf/.
 * Fehlt eine Referenz, ist der Test rot; Snapshot-APIs kommen nicht vor.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ArticlePage } from "@/components/content/ArticlePage";
import { ContentIndex } from "@/components/content/ContentIndex";
import { getContentArticle } from "@/lib/content";

/** Löst die `section` mit `data-abschnitt="kopf"` heraus; verschachtelte section werden gezählt. */
export function kopfAusschnitt(html: string): string {
  const start = html.search(/<section\b[^>]*\sdata-abschnitt="kopf"[^>]*>/);
  if (start < 0) throw new Error('section[data-abschnitt="kopf"] fehlt');
  const tagRe = /<(\/?)section\b[^>]*>/g;
  tagRe.lastIndex = start;
  let tiefe = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html)) !== null) {
    tiefe += m[1] === "/" ? -1 : 1;
    if (tiefe === 0) return html.slice(start, m.index + m[0].length);
  }
  throw new Error("Kopf: schließendes </section> fehlt");
}

const GRUNDKLASSEN = /\.(kopf|crumbs|inner|title|answer|lead|meta|stand|platforms)\b/;
const ERWEITERUNG = /data-crumbs|data-hinweis|\.hinweis/;

/** Zerlegt CSS in Regeln „@kontext | selektor { deklarationen }“ (Kommentare und Leerraum normalisiert). */
export function cssRegeln(css: string): string[] {
  const ohneKommentare = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const norm = (s: string) => s.replace(/[ \t\r\n]+/g, " ").trim();
  const regeln: string[] = [];
  const lies = (text: string, kontext: string) => {
    let i = 0;
    while (i < text.length) {
      const auf = text.indexOf("{", i);
      if (auf < 0) break;
      const prelude = norm(text.slice(i, auf));
      let tiefe = 1;
      let j = auf + 1;
      for (; j < text.length && tiefe > 0; j++) {
        if (text[j] === "{") tiefe++;
        else if (text[j] === "}") tiefe--;
      }
      const inhalt = text.slice(auf + 1, j - 1);
      if (prelude.startsWith("@")) {
        lies(inhalt, kontext ? `${kontext} ${prelude}` : prelude);
      } else {
        const deklarationen = inhalt
          .split(";")
          .map(norm)
          .filter((d) => d !== "")
          .join("; ");
        regeln.push(`${kontext || "@global"} | ${prelude} { ${deklarationen} }`);
      }
      i = j;
    }
  };
  lies(ohneKommentare, "");
  return regeln;
}

/** Nur die Grundregeln (ohne die K1/K2-Erweiterungen) als Text, eine Regel je Zeile. */
export function grundregeln(css: string): string {
  return (
    cssRegeln(css)
      .filter((r) => {
        const selektor = r.slice(r.indexOf(" | ") + 3, r.indexOf(" {"));
        return GRUNDKLASSEN.test(selektor) && !ERWEITERUNG.test(selektor);
      })
      .join("\n") + "\n"
  );
}

export const KOPF_SEITEN = [
  {
    datei: "hilfe-rechnung-fertigstellen.html",
    pfad: "/hilfe/rechnung-fertigstellen",
    rendern: async () => {
      const artikel = await getContentArticle("hilfe", "rechnung-fertigstellen");
      if (!artikel) throw new Error("Artikel hilfe/rechnung-fertigstellen fehlt");
      return renderToStaticMarkup(await ArticlePage({ article: artikel }));
    },
  },
  {
    datei: "blog.html",
    pfad: "/blog",
    rendern: async () => renderToStaticMarkup(await ContentIndex({ kind: "blog" })),
  },
  {
    datei: "hilfe-kategorie-rechnungen.html",
    pfad: "/hilfe/kategorie/rechnungen",
    rendern: async () => renderToStaticMarkup(await ContentIndex({ kind: "hilfe", category: "rechnungen" })),
  },
] as const;

export const CSS_DATEI = path.resolve(import.meta.dirname, "..", "components", "content", "ContentKopf.module.css");
export const CSS_REFERENZ = "ContentKopf.grundregeln.txt";
export const fixturePfad = (datei: string) => path.resolve(import.meta.dirname, "fixtures", "contentkopf", datei);

const lesenOderRot = (datei: string) => {
  const voll = fixturePfad(datei);
  if (!existsSync(voll)) {
    throw new Error(`Referenz ${path.relative(process.cwd(), voll)} fehlt – auf unverändertem Stand erzeugen.`);
  }
  // Zeilenenden normalisieren: core.autocrlf kann Referenzen beim Auschecken in CRLF wandeln.
  return readFileSync(voll, "utf8").replace(/\r\n/g, "\n");
};

describe("kopfAusschnitt und cssRegeln", () => {
  it("nimmt verschachtelte section mit und lässt Geschwister weg", () => {
    const html =
      '<main><section data-abschnitt="kopf" class="k"><section><p>a</p></section><p>b</p></section><section data-abschnitt="x"></section></main>';
    expect(kopfAusschnitt(html)).toBe('<section data-abschnitt="kopf" class="k"><section><p>a</p></section><p>b</p></section>');
    expect(() => kopfAusschnitt("<main></main>")).toThrow('section[data-abschnitt="kopf"] fehlt');
  });

  it("trennt Grundregeln von den K1/K2-Erweiterungen", () => {
    const css =
      "/* x */ .kopf { padding: 1px;\n color: red } .kopf[data-crumbs=\"ohne\"] { padding-top: 48px } .hinweis { gap: 8px }" +
      " @media (min-width: 768px) { .title { font-size: 2px } }";
    expect(grundregeln(css)).toBe(
      "@global | .kopf { padding: 1px; color: red }\n@media (min-width: 768px) | .title { font-size: 2px }\n",
    );
  });
});

describe("Phase-9-Köpfe unverändert (K3)", () => {
  for (const { datei, pfad, rendern } of KOPF_SEITEN) {
    it(`${pfad}: Kopf-Markup Byte für Byte gleich der Referenz`, async () => {
      const soll = lesenOderRot(datei);
      const ist = kopfAusschnitt(await rendern());
      expect(ist).not.toContain("data-crumbs");
      expect(ist).not.toContain("data-hinweis");
      expect(ist).toBe(soll);
    }, 60_000);
  }

  it("ContentKopf.module.css: Grundregeln unverändert", () => {
    const soll = lesenOderRot(CSS_REFERENZ);
    expect(grundregeln(readFileSync(CSS_DATEI, "utf8"))).toBe(soll);
  });
});
