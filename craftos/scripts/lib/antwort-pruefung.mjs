// „Antwort zuerst“ für content-pruefen --antwort (09-REVIEW LO-05). Gleiche Regeln wie Build und Audit:
// - Frontmatter `answer` ist Pflicht, ≤ 300 Zeichen, ein bis zwei Sätze (lib/content.ts `answerFeld`,
//   Satzzählung wie `sentenceCount` in components/v2/budgets.ts).
// - Unter jeder H2/H3 mit „?“ steht vor der nächsten Überschrift ein Absatz mit ≤ 300 Zeichen. Gemessen wird mit
//   `answerFirstViolations` aus scripts/lib/seo-audit-core.mjs auf dem gerenderten Markdown (gleiche
//   remark/rehype-Kette wie lib/content.ts bis vor den Artikel-Schritt), damit Skript und Audit gleich zählen.
import matter from "gray-matter";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { ANTWORT_MAX, answerFirstViolations } from "./seo-audit-core.mjs";

const laenge = (s) => Array.from(s).length;

/** Satzzahl wie `sentenceCount` (components/v2/budgets.ts). */
export const saetze = (text) => (text.match(/[.!?](?=\s|$)/g) ?? []).length;

async function html(markdown) {
  const out = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);
  return String(out);
}

/** Befunde eines Markdown-Artikels (Frontmatter und Text) als Texte ohne Dateinamen; leer = in Ordnung. */
export async function antwortBefunde(inhalt) {
  const out = [];
  const { data, content } = matter(inhalt);
  if (typeof data.answer !== "string" || !data.answer.trim()) out.push("kein Frontmatter „answer“ (Pflicht ab 09-09)");
  else {
    const a = data.answer.trim();
    const n = laenge(a);
    if (n > ANTWORT_MAX) out.push(`answer ${n} > ${ANTWORT_MAX}`);
    const s = saetze(a);
    if (s < 1 || s > 2) out.push(`answer hat ${s} Sätze – ein bis zwei Sätze schreiben`);
  }
  for (const v of answerFirstViolations(await html(content), ANTWORT_MAX)) out.push(`„${v.q}“: ${v.problem}`);
  return out;
}
