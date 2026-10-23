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

/**
 * Zusammengesetzte Texte (09-REVIEW IN-08): `"Online" + "zahlung"` oder `` `nicht ${x}unterstützt` `` umgehen eine
 * Prüfung je Literal. Geliefert wird je äußerster `+`-Kette mit mindestens einem String-Literal und je
 * Template-Literal mit Platzhaltern der Text, in dem Nicht-Literale und Platzhalter leer bleiben. Ergänzt
 * `stringLiterale`, ersetzt es nicht.
 * @param {string} tsQuelltext
 * @returns {string[]}
 */
export function zusammengesetzteTexte(tsQuelltext) {
  const datei = ts.createSourceFile("quelle.ts", tsQuelltext, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out = [];
  const istPlus = (n) => ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.PlusToken;
  const text = (n) => {
    if (ts.isParenthesizedExpression(n)) return text(n.expression);
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
    if (ts.isTemplateExpression(n)) return n.head.text + n.templateSpans.map((s) => s.literal.text).join("");
    if (istPlus(n)) return text(n.left) + text(n.right);
    return "";
  };
  const hatLiteral = (n) =>
    ts.isStringLiteral(n) ||
    ts.isNoSubstitutionTemplateLiteral(n) ||
    ts.isTemplateExpression(n) ||
    (ts.isParenthesizedExpression(n) && hatLiteral(n.expression)) ||
    (istPlus(n) && (hatLiteral(n.left) || hatLiteral(n.right)));
  /** Nächster Vorfahr außerhalb von Klammern. */
  const ausserhalb = (node) => {
    let p = node.parent;
    while (p && ts.isParenthesizedExpression(p)) p = p.parent;
    return p;
  };
  const besuche = (node) => {
    const teilVonPlus = istPlus(ausserhalb(node) ?? node.getSourceFile());
    if (istPlus(node) && !teilVonPlus && hatLiteral(node)) out.push(text(node));
    else if (ts.isTemplateExpression(node) && !teilVonPlus) out.push(text(node));
    ts.forEachChild(node, besuche);
  };
  besuche(datei);
  return out;
}
