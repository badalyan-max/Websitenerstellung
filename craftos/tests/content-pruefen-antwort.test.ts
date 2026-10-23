/**
 * Antwortprüfung von scripts/content-pruefen.mjs --antwort (09-REVIEW LO-05): Fehlende Antwort ist ein Befund wie im
 * Build (lib/content.ts), die Antwort hat ein bis zwei Sätze (Zählung wie sentenceCount), und „Antwort direkt unter der
 * Frage“ nutzt dieselbe Funktion wie das SEO-Audit (answerFirstViolations auf dem gerenderten Markdown).
 */
import { describe, expect, it } from "vitest";
import { sentenceCount } from "@/components/v2/budgets";
import { antwortBefunde, saetze } from "../scripts/lib/antwort-pruefung.mjs";

const artikel = (kopf: string, text: string) => `---\ntitle: "x"\n${kopf}---\n\n${text}\n`;

describe("antwortBefunde", () => {
  it("fehlende Antwort ist ein Befund", async () => {
    expect(await antwortBefunde(artikel("", "Text."))).toEqual(["kein Frontmatter „answer“ (Pflicht ab 09-09)"]);
    expect(await antwortBefunde(artikel('answer: "  "\n', "Text."))).toEqual(["kein Frontmatter „answer“ (Pflicht ab 09-09)"]);
  });

  it("Antwort mit mehr als 300 Zeichen oder mehr als zwei Sätzen ist ein Befund", async () => {
    const lang = `${"a".repeat(301)}.`;
    expect(await antwortBefunde(artikel(`answer: "${lang}"\n`, "Text."))).toEqual(["answer 302 > 300"]);
    expect(await antwortBefunde(artikel('answer: "Eins. Zwei. Drei."\n', "Text."))).toEqual([
      "answer hat 3 Sätze – ein bis zwei Sätze schreiben",
    ]);
    expect(await antwortBefunde(artikel('answer: "Eins. Zwei."\n', "Text."))).toEqual([]);
  });

  it("Frage-Überschrift ohne Absatz bis zur nächsten Überschrift ist ein Befund", async () => {
    const md = artikel('answer: "Eins."\n', "## Wie geht das?\n\n- Schritt\n- Schritt\n\n## Weiter\n\nText.");
    expect(await antwortBefunde(md)).toEqual(["„Wie geht das?“: keine Antwort direkt darunter"]);
  });

  it("zu lange Antwort unter einer Frage ist ein Befund, wie im Audit gemessen", async () => {
    const md = artikel('answer: "Eins."\n', `### Was kostet das?\n\n${"b".repeat(301)}`);
    expect(await antwortBefunde(md)).toEqual(["„Was kostet das?“: Antwort 301 > 300"]);
  });

  it("Satzzählung entspricht sentenceCount", () => {
    for (const s of ["Eins.", "Eins. Zwei!", "z. B. drei Sätze? Ja.", "Kein Punkt"]) expect(saetze(s), s).toBe(sentenceCount(s));
  });
});
