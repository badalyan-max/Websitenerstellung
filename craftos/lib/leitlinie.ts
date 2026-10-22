/**
 * Leitlinie L-1 (Inhaber, 22.10.2026; 09-UI-SPEC § 5): Die Website nennt nur, was unterstützt wird – keine
 * Negativlisten nicht unterstützter Formate, Versionen oder Funktionen. Einzige Quelle der Wörter, Altbegriffe
 * und abschließenden Ausnahmen ist lib/leitlinie-l1.json; hier liegt nur die Suche. Bewusst ohne Abhängigkeiten
 * (kein Compiler-Import, kein server-only): Tests, Prüfskripte und die Inhaltspakete nutzen dieselbe Funktion.
 */
import leitlinie from "./leitlinie-l1.json";

/** Wortliste und Altbegriffe in der Reihenfolge der JSON-Datei. */
export const l1Woerter: readonly string[] = [...leitlinie.woerter, ...leitlinie.altbegriffe];

const escape = (wort: string) => wort.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");

// Wortgrenzen Unicode-sicher (\b kennt keine Umlaute): kein Buchstabe, keine Ziffer, kein „_“ davor bzw. danach.
// Über den RegExp-Konstruktor, weil Lookbehind und \p{…} erst ab ES2018 als Literal zulässig sind.
const MUSTER: readonly { wort: string; re: RegExp }[] = l1Woerter.map((wort) => ({
  wort,
  re: new RegExp(`(?<![\\p{L}\\p{N}_])${escape(wort)}(?![\\p{L}\\p{N}_])`, "iu"),
}));

/**
 * Alle Wörter und Altbegriffe der Leitlinie, die im Text vorkommen (Schreibweise der Liste, ohne Doppelung,
 * Reihenfolge der Liste). Groß-/Kleinschreibung egal, nur ganze Wörter: „Onlinezahlung“ trifft, „Überweisung“
 * und „Onlinezahlungen“ nicht.
 */
export function l1Treffer(text: string): string[] {
  return MUSTER.filter(({ re }) => re.test(text)).map(({ wort }) => wort);
}
