/**
 * Wortlaut-Schutz der Rechtsseiten (Phase 10, Plan 10-03; D-09, D-17; 10-UI-SPEC § 3.3, K1).
 *
 * Die Rechtstexte von /impressum, /datenschutz und /agb sind rechtlich bindend. Dieser Test entstand
 * vor jeder Darstellungsänderung: Er rendert jede Seite per renderToStaticMarkup, löst den Container mit
 * `data-rechtstext` heraus (div-Zähler), zerlegt ihn in eine Blockfolge mit Tags und Linkzielen und
 * vergleicht sie per readFileSync + toBe mit den Referenzen unter tests/fixtures/rechtstexte/.
 * Die Referenzen werden nie automatisch aktualisiert; eine Aktualisierung braucht eine Inhaberfreigabe
 * für eine Rechtstextänderung. Snapshot-APIs sind hier bewusst nicht im Einsatz (fehlende Referenz = rot).
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { zielwerte } from "@/lib/seo-meta";

/* ------------------------------------------------------------------------------------------------ */
/* Reine Hilfsfunktionen (auch vom einmaligen Referenz-Erzeuger genutzt, deshalb exportiert)          */
/* ------------------------------------------------------------------------------------------------ */

/** Löst den div mit `data-rechtstext` samt Inhalt heraus; verschachtelte div werden gezählt. */
export function rechtstextAusschnitt(html: string): string {
  const start = html.search(/<div\b[^>]*\sdata-rechtstext(?:[\s=>])/);
  if (start < 0) throw new Error("data-rechtstext fehlt");
  const tagRe = /<(\/?)div\b[^>]*>/g;
  tagRe.lastIndex = start;
  let tiefe = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html)) !== null) {
    if (m[0].endsWith("/>")) continue;
    tiefe += m[1] === "/" ? -1 : 1;
    if (tiefe === 0) return html.slice(start, m.index + m[0].length);
  }
  throw new Error("data-rechtstext: schließendes </div> fehlt");
}

const BENANNTE_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  shy: "­",
  ndash: "–",
  mdash: "—",
  sect: "§",
  euro: "€",
  copy: "©",
  reg: "®",
  hellip: "…",
  laquo: "«",
  raquo: "»",
  bdquo: "„",
  ldquo: "“",
  rdquo: "”",
  sbquo: "‚",
  lsquo: "‘",
  rsquo: "’",
  middot: "·",
  auml: "ä",
  ouml: "ö",
  uuml: "ü",
  Auml: "Ä",
  Ouml: "Ö",
  Uuml: "Ü",
  szlig: "ß",
};

/** Dekodiert benannte und numerische Entities; unbekannte benannte Entities brechen ab. */
export function dekodiere(s: string): string {
  return s.replace(/&(#[xX][0-9a-fA-F]+|#[0-9]+|[A-Za-z][A-Za-z0-9]*);/g, (ganz, name: string) => {
    if (name[0] === "#") {
      const code = name[1] === "x" || name[1] === "X" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
      return String.fromCodePoint(code);
    }
    const wert = BENANNTE_ENTITIES[name];
    if (wert === undefined) throw new Error(`Unbekannte Entity ${ganz} im Rechtstext`);
    return wert;
  });
}

/** Leerraum nur über [ \t\r\n]+ zusammenfassen – U+00A0 bleibt erhalten. */
export function normalisiere(s: string): string {
  return s.replace(/[ \t\r\n]+/g, " ").replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, "");
}

/** Elemente, die einen eigenen Block bilden; alles andere gilt als Inline-Element. */
const BLOCK_TAGS = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "dd",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "section",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "ul",
]);
const LEERE_TAGS = new Set(["br", "hr", "img", "input", "meta", "link", "source", "wbr"]);

/**
 * Versteckter Inhalt ist im Container verboten (Klassen `sr-only`/`hidden`, Attribut `hidden`,
 * `aria-hidden="true"`). Gibt den ersten Fund zurück oder null.
 */
export function versteckterInhalt(container: string): string | null {
  const tagRe = /<[a-zA-Z][^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(container)) !== null) {
    const tag = m[0];
    const klasse = /\sclass="([^"]*)"/.exec(tag);
    if (klasse) {
      for (const token of klasse[1].split(/[ \t\r\n]+/)) {
        const basis = token.slice(token.lastIndexOf(":") + 1);
        if (basis === "sr-only" || basis === "hidden") return token;
      }
    }
    if (/\saria-hidden="true"/.test(tag)) return 'aria-hidden="true"';
    if (/\shidden(?:[\s=>/])/.test(tag)) return "hidden";
  }
  return null;
}

/**
 * Zerlegt den Container in eine Blockfolge: eine Zeile je Block mit Tagnamen (`[h2] …`, `[p] …`,
 * `[li] …`, `[div] …`), Links als `[a href="…"]Text[/a]` ohne zusätzlichen Leerraum, damit auch ein fehlendes
 * oder zusätzliches Leerzeichen am Link auffällt. Text gehört immer zum innersten offenen Block.
 */
export function blockfolge(container: string): string {
  const zeilen: string[] = [];
  const stapel: string[] = [];
  let puffer = "";
  const flush = (tag: string | undefined) => {
    const text = normalisiere(puffer);
    puffer = "";
    if (text !== "" && tag !== undefined) zeilen.push(`[${tag}] ${text}`);
  };
  const tokenRe = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*)>|([^<]+)/g;
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(container)) !== null) {
    if (m[0].startsWith("<!--")) continue;
    if (m[4] !== undefined) {
      puffer += dekodiere(m[4]);
      continue;
    }
    const schliessend = m[1] === "/";
    const tag = m[2].toLowerCase();
    const attribute = m[3];
    if (BLOCK_TAGS.has(tag)) {
      if (schliessend) {
        flush(tag);
        stapel.pop();
      } else {
        flush(stapel[stapel.length - 1]);
        if (!attribute.endsWith("/")) stapel.push(tag);
      }
      continue;
    }
    if (tag === "a") {
      if (schliessend) {
        puffer += "[/a]";
      } else {
        const href = /\shref="([^"]*)"/.exec(attribute);
        puffer += href ? `[a href="${dekodiere(href[1])}"]` : "[a]";
      }
      continue;
    }
    if (LEERE_TAGS.has(tag) && !schliessend) {
      if (tag === "br") puffer += " ";
      continue;
    }
    // übrige Inline-Elemente (span, strong, em …) tragen keinen eigenen Block
  }
  flush(stapel[stapel.length - 1]);
  return zeilen.join("\n") + "\n";
}

/** Erste Abweichung zweier Texte als Index (oder -1). */
export function ersteAbweichung(ist: string, soll: string): number {
  const n = Math.max(ist.length, soll.length);
  for (let i = 0; i < n; i++) if (ist[i] !== soll[i]) return i;
  return -1;
}

const ausschnittUm = (s: string, i: number) => s.slice(Math.max(0, i - 10), i + 30).replace(/\n/g, "⏎");

/* ------------------------------------------------------------------------------------------------ */
/* Seiten                                                                                             */
/* ------------------------------------------------------------------------------------------------ */

export const RECHTSSEITEN = [
  { seite: "impressum", pfad: "/impressum", laden: () => import("@/app/impressum/page") },
  { seite: "datenschutz", pfad: "/datenschutz", laden: () => import("@/app/datenschutz/page") },
  { seite: "agb", pfad: "/agb", laden: () => import("@/app/agb/page") },
] as const;

export const referenzPfad = (seite: string) =>
  path.resolve(import.meta.dirname, "fixtures", "rechtstexte", `${seite}.txt`);

export async function rendereRechtsseite(laden: () => Promise<{ default: ComponentType }>): Promise<string> {
  const Seite = (await laden()).default;
  return renderToStaticMarkup(createElement(Seite));
}

describe("rechtstextAusschnitt (div-Zähler)", () => {
  it("nimmt verschachtelte div mit und lässt Geschwister danach weg", () => {
    const html =
      '<section><div class="a"><p>vorher</p></div><div data-rechtstext="" class="x"><div><div><p>innen</p></div></div><p>rest</p></div><div><p>geschwister</p></div></section>';
    expect(rechtstextAusschnitt(html)).toBe(
      '<div data-rechtstext="" class="x"><div><div><p>innen</p></div></div><p>rest</p></div>',
    );
  });

  it("wirft ohne Container", () => {
    expect(() => rechtstextAusschnitt("<div><p>kein Rechtstext</p></div>")).toThrow("data-rechtstext fehlt");
  });
});

describe("Blockfolge und Normalisierung", () => {
  it("eine Zeile je Block mit Tagnamen, Links mit href, Entities dekodiert, U+00A0 bleibt", () => {
    const html =
      '<div data-rechtstext=""><section><h2>§ 1  Titel</h2><div><p>A &amp; B &#x27;C&#x27; &quot;D&quot; &#169;</p><p>X&nbsp;Y\n  Z</p></div></section><div><p>erste</p><p>zweite</p></div><ul><li>Punkt</li></ul><p>Link: <a href="mailto:a@b.de?x=1&amp;y=2" class="k">a@b.de</a>.</p></div>';
    expect(blockfolge(rechtstextAusschnitt(html))).toBe(
      [
        "[h2] § 1 Titel",
        "[p] A & B 'C' \"D\" ©",
        "[p] X Y Z",
        "[p] erste",
        "[p] zweite",
        "[li] Punkt",
        '[p] Link: [a href="mailto:a@b.de?x=1&y=2"]a@b.de[/a].',
        "",
      ].join("\n"),
    );
  });

  it("Text direkt im div wird als [div] geführt", () => {
    expect(blockfolge('<div data-rechtstext=""><div>Zeile</div></div>')).toBe("[div] Zeile\n");
  });

  it("erkennt versteckten Inhalt", () => {
    expect(versteckterInhalt('<div data-rechtstext=""><span class="sr-only">x</span></div>')).toBe("sr-only");
    expect(versteckterInhalt('<div data-rechtstext=""><p class="md:hidden">x</p></div>')).toBe("md:hidden");
    expect(versteckterInhalt('<div data-rechtstext=""><p hidden="">x</p></div>')).toBe("hidden");
    expect(versteckterInhalt('<div data-rechtstext=""><svg aria-hidden="true"></svg></div>')).toBe('aria-hidden="true"');
    expect(versteckterInhalt('<div data-rechtstext=""><p class="hidden-ok text-sm">x</p></div>')).toBeNull();
  });
});

describe("Rechtstexte bleiben wörtlich (D-09, D-17)", () => {
  for (const { seite, pfad, laden } of RECHTSSEITEN) {
    it(`${pfad}: Blockfolge gleich der Referenz`, async () => {
      const html = await rendereRechtsseite(laden);
      const container = rechtstextAusschnitt(html);

      const versteckt = versteckterInhalt(container);
      if (versteckt !== null) {
        throw new Error(
          `Rechtstext ${seite}: versteckter Inhalt (‚${versteckt}‘) im Container – Text muss sichtbar bleiben.`,
        );
      }

      const datei = referenzPfad(seite);
      if (!existsSync(datei)) {
        throw new Error(`Referenz ${path.relative(process.cwd(), datei)} fehlt – auf unverändertem Stand erzeugen.`);
      }
      // Zeilenenden der Referenz normalisieren: core.autocrlf kann sie beim Auschecken in CRLF wandeln.
      const soll = readFileSync(datei, "utf8").replace(/\r\n/g, "\n");
      const ist = blockfolge(container);
      if (ist !== soll) {
        const i = ersteAbweichung(ist, soll);
        throw new Error(
          `Rechtstext ${seite} weicht vom Wortlaut ab (erste Abweichung bei Zeichen ${i}: ‚${ausschnittUm(ist, i)}‘ statt ‚${ausschnittUm(soll, i)}‘) – nur Darstellung ändern.`,
        );
      }
      expect(ist).toBe(soll);
    }, 60_000);

    it(`${pfad}: H1 gleich zielwerte(pfad).h1 (getrennt, nicht in der Referenz)`, async () => {
      const html = await rendereRechtsseite(laden);
      const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g) ?? [];
      expect(h1).toHaveLength(1);
      const text = normalisiere(dekodiere((h1[0] ?? "").replace(/<[^>]+>/g, "")));
      expect(text).toBe(zielwerte(pfad).h1);
    }, 60_000);
  }
});
