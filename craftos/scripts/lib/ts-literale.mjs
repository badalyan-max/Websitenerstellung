// String-Literale aus TypeScript-Quelltext (09-01, K-10/W6): Die L-1-Prüfung liest in .ts-Dateien nur Zeichenketten,
// keine Kommentare – Belegkommentare wie „Portal ohne Onlinezahlung (PortalPaymentNotice.tsx)“ bleiben erlaubt.
// Der TypeScript-Scanner zerlegt den Quelltext über den Parser von `typescript` (devDependency): Nur so werden
// Regex-Literale, Template-Teile nach `${…}` und Kommentare sicher von Zeichenketten unterschieden.
import ts from "typescript";

/**
 * Alle String-Literale eines TypeScript-Quelltexts in Dateireihenfolge, mit aufgelösten Escapes:
 * einfache und doppelte Anführungszeichen, Template-Literale ohne Platzhalter sowie die festen Teile von
 * Template-Literalen mit Platzhaltern. Kommentare, Regex-Literale, Bezeichner und JSX-Text entfallen.
 * @param {string} tsQuelltext
 * @returns {string[]}
 */
export function stringLiterale(tsQuelltext) {
  const datei = ts.createSourceFile("quelle.ts", tsQuelltext, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const out = [];
  const besuche = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) out.push(node.text);
    else if (ts.isTemplateExpression(node)) {
      out.push(node.head.text);
      for (const span of node.templateSpans) {
        besuche(span.expression);
        out.push(span.literal.text);
      }
      return;
    }
    ts.forEachChild(node, besuche);
  };
  besuche(datei);
  return out;
}
