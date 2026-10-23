// Belege für Bedienzitate (09-REVIEW HI-01): Ein Zitat aus einem Artikel gilt nur dann als im Release belegt, wenn es
// in einem Nutzer-Oberflächentext steht. Das sind JSX-Text, String-Literale in Quelldateien (auch Attributwerte wie
// `aria-label`) und die Werte deutscher Sprachdateien. Kommentare, JSDoc, Modulpfade, Literal-Typen, Tests, Mocks,
// Fixtures und Stories zählen nicht. Menüpfade mit „→“ werden je Segment als ganzes Label geprüft.
//
// Grenze: Ob der Kunde die Stelle erreicht (Rolle, Lizenz, Entwickler-Freischaltung, Feature-Flag), kann die
// Textsuche nicht beweisen. `FREISCHALTUNG` ist nur eine Datei-Heuristik für einen Hinweis; die Erreichbarkeit bleibt
// Teil der manuellen Prüfdatei (docs/content-pruefung/09-*.md).
import ts from "typescript";

/** Pfadfilter für `git grep` (Pathspec-Magie), passend zu `istUiQuelle`. */
export const OHNE_NICHT_UI = [
  ":(exclude,glob)**/*.test.*",
  ":(exclude,glob)**/*.spec.*",
  ":(exclude,glob)**/*.stories.*",
  ":(exclude,glob)**/*.d.ts",
  ":(exclude,glob)**/__tests__/**",
  ":(exclude,glob)**/__mocks__/**",
  ":(exclude,glob)**/__fixtures__/**",
  ":(exclude,glob)**/fixtures/**",
  ":(exclude,glob)**/test/**",
  ":(exclude,glob)**/eval/**",
];

const QUELLTEXT = /\.(tsx?|jsx?|mjs|cjs)$/;
const NICHT_UI = /(^|\/)(__tests__|__mocks__|__fixtures__|fixtures|test|eval)\/|\.(test|spec|stories)\.[^/]+$|\.d\.ts$/;
/** Deutsche Sprachdateien (Mobile: src/shared/i18n/locales/de/*.json). */
const LOCALE_DE = /(^|\/)i18n\/locales\/de\/[^/]+\.json$/;

/** Entwickler- oder Feature-Abfrage im Dateiinhalt (nur Heuristik für einen Hinweis). */
export const FREISCHALTUNG = /\b(isDeveloper|usePlatformDeveloper|isPlatformDeveloper|useFeatureFlag|isFeatureEnabled)\b/;

/** Ob eine Release-Datei Nutzer-Oberflächentexte enthalten kann. */
export function istUiQuelle(pfad) {
  const p = pfad.split("\\").join("/");
  if (NICHT_UI.test(p)) return false;
  return QUELLTEXT.test(p) || LOCALE_DE.test(p);
}

/** Leerraum wie auf der gerenderten Seite zusammenfassen. */
export const normalisiert = (s) => s.replace(/\s+/g, " ").trim();

const ENTITIES = { "&nbsp;": " ", "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">", "&shy;": "" };
const jsxText = (s) => normalisiert(s.replace(/&(nbsp|amp|quot|apos|lt|gt|shy);/g, (m) => ENTITIES[m]));

function scriptKind(pfad) {
  if (/\.tsx$/.test(pfad)) return ts.ScriptKind.TSX;
  if (/\.(jsx|js|mjs|cjs)$/.test(pfad)) return ts.ScriptKind.JSX;
  return ts.ScriptKind.TS;
}

/** String-Literal, das kein Oberflächentext sein kann (Modulpfad, Literal-Typ). */
function technischesLiteral(node) {
  const p = node.parent;
  if (!p) return false;
  if ((ts.isImportDeclaration(p) || ts.isExportDeclaration(p)) && p.moduleSpecifier === node) return true;
  if (ts.isExternalModuleReference(p) || ts.isLiteralTypeNode(p) || ts.isModuleDeclaration(p)) return true;
  if (ts.isCallExpression(p) && p.expression.kind === ts.SyntaxKind.ImportKeyword) return true;
  return false;
}

function quelltextTexte(pfad, inhalt) {
  const datei = ts.createSourceFile(pfad, inhalt, ts.ScriptTarget.Latest, true, scriptKind(pfad));
  const out = [];
  const push = (t) => {
    if (t.trim()) out.push(t);
  };
  const besuche = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (!technischesLiteral(node)) push(node.text);
    } else if (ts.isTemplateExpression(node)) {
      push(node.head.text);
      for (const span of node.templateSpans) {
        besuche(span.expression);
        push(span.literal.text);
      }
      return;
    } else if (ts.isJsxText(node)) {
      const t = jsxText(node.text);
      if (t) out.push(t);
    }
    ts.forEachChild(node, besuche);
  };
  besuche(datei);
  return out;
}

function jsonWerte(inhalt) {
  let daten;
  try {
    daten = JSON.parse(inhalt);
  } catch {
    return [];
  }
  const out = [];
  const walk = (v) => {
    if (typeof v === "string") {
      if (v.trim()) out.push(v);
    } else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(daten);
  return out;
}

/** Nutzer-Oberflächentexte einer Release-Datei (leer für Dateien, die `istUiQuelle` nicht nimmt). */
export function uiTexte(pfad, inhalt) {
  const p = pfad.split("\\").join("/");
  if (!istUiQuelle(p)) return [];
  if (LOCALE_DE.test(p)) return jsonWerte(inhalt);
  return quelltextTexte(p, inhalt);
}

/** Zitate „…“ eines Texts; `teile` sind die Segmente eines Menüpfads (an „→“ geteilt), sonst das Zitat selbst. */
export function zitateAus(text) {
  const out = [];
  for (const m of text.matchAll(/„([^“„\n]{1,160})“/g)) {
    const ganz = m[1].trim();
    const teile = ganz.split(/\s*→\s*/).map((t) => t.trim()).filter(Boolean);
    out.push({ ganz, teile });
  }
  return out;
}

/**
 * Ob ein Zitat in den Oberflächentexten belegt ist: Ein einfaches Zitat muss Teil eines Texts sein. Ein Menüpfad ist
 * belegt, wenn er als Ganzes in einem Text steht oder jedes Segment ein ganzes Label ist.
 */
export function zitatBelegt(zitat, texte) {
  const norm = texte.map(normalisiert);
  const enthalten = (s) => norm.some((t) => t.includes(normalisiert(s)));
  if (zitat.teile.length <= 1) return enthalten(zitat.ganz);
  if (enthalten(zitat.ganz)) return true;
  const labels = new Set(norm);
  return zitat.teile.every((t) => labels.has(normalisiert(t)));
}
