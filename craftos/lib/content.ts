import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import type { Element, ElementContent, Root, RootContent } from "hast";
import { TEXT_BUDGET, assertTextBudget, charCount, sentenceCount } from "@/components/v2/budgets";
import { sceneById } from "./scenes";
import {
  categories,
  type ContentKind,
  type ContentSummary,
  type ContentArticle,
} from "./content-types";
type TocEintrag = ContentArticle["toc"][number];
/** Teil der VFile-Schnittstelle, den der Artikel-Schritt braucht (Übergabe des Inhaltsverzeichnisses). */
type VFile = { data: Record<string, unknown> };
const root = path.join(process.cwd(), "content");
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
function string(data: Record<string, unknown>, key: string) {
  if (typeof data[key] !== "string" || !data[key])
    throw new Error("Missing content field " + key);
  return data[key] as string;
}
function strings(value: unknown): string[] {
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string"))
    throw new Error("Expected content string array");
  return value;
}
/** Phase 9 (D-18): Antwort zuerst – seit der Integration (09-09) Pflicht für jeden Artikel. ≤ 300 Zeichen, 1–2 Sätze. */
function answerFeld(data: Record<string, unknown>, slug: string): string {
  if (data.answer === undefined || (typeof data.answer === "string" && !data.answer.trim()))
    throw new Error(`Artikel ${slug}: Antwort fehlt – Frontmatter answer mit ein bis zwei Sätzen (≤ 300 Zeichen) ergänzen.`);
  if (typeof data.answer !== "string")
    throw new Error("Invalid answer in " + slug);
  assertTextBudget("answer", data.answer, TEXT_BUDGET.answer);
  const saetze = sentenceCount(data.answer);
  if (saetze < 1 || saetze > 2)
    throw new Error(`Artikel ${slug}: Antwort hat ${saetze} Sätze – ein bis zwei Sätze schreiben.`);
  return data.answer;
}
/** Phase 9 (D-16, D-18): sichtbare FAQ, 3–8 Fragen; Frage ≤ 90 mit „?“, Antwort ≤ 300 (FaqList answerMax={300}). */
function faqFeld(data: Record<string, unknown>, slug: string): { q: string; a: string }[] {
  const roh = data.faq;
  if (roh === undefined) return [];
  if (
    !Array.isArray(roh) ||
    roh.some((e) => !e || typeof e.q !== "string" || typeof e.a !== "string" || !e.q.trim() || !e.a.trim())
  )
    throw new Error("Invalid faq in " + slug);
  const { min, max } = TEXT_BUDGET.count.faq;
  if (roh.length < min || roh.length > max)
    throw new Error(`Artikel ${slug}: ${roh.length} FAQ-Fragen – ${min} bis ${max} erforderlich.`);
  return roh.map(({ q, a }: { q: string; a: string }) => {
    assertTextBudget("faq.question", q, TEXT_BUDGET.faq.question);
    if (!q.trim().endsWith("?"))
      throw new Error(`Artikel ${slug}: FAQ-Frage ‚${q}‘ endet nicht mit „?“ – als Frage formulieren.`);
    assertTextBudget("faq.answerCentral", a, TEXT_BUDGET.faq.answerCentral);
    return { q, a };
  });
}
/** Phase 9 (D-15): optionale Szene, nur IDs aus sceneById (keine neuen Szenen in Inhaltspaketen). */
function sceneFeld(data: Record<string, unknown>, slug: string): string | undefined {
  if (data.scene === undefined) return undefined;
  if (typeof data.scene !== "string" || !Object.hasOwn(sceneById, data.scene))
    throw new Error(`Artikel ${slug}: Szene ‚${String(data.scene)}‘ ist unbekannt – nur IDs aus sceneById verwenden.`);
  return data.scene;
}
export function parseContent(
  raw: string,
  kind: ContentKind,
  slug: string,
): ContentSummary & { body: string } {
  const { data, content } = matter(raw);
  const publishedAt = string(data, "publishedAt"),
    updatedAt = string(data, "updatedAt");
  if (
    !datePattern.test(publishedAt) ||
    !datePattern.test(updatedAt) ||
    updatedAt < publishedAt
  )
    throw new Error("Invalid dates in " + slug);
  if (!Object.hasOwn(categories[kind], string(data, "category")))
    throw new Error("Unknown category in " + slug);
  if (typeof data.draft !== "boolean")
    throw new Error("draft must be explicit in " + slug);
  const sources = data.sources;
  if (
    !Array.isArray(sources) ||
    sources.some(
      (s) =>
        !s ||
        typeof s.label !== "string" ||
        typeof s.url !== "string" ||
        !/^https:\/\//.test(s.url) ||
        !datePattern.test(s.checkedAt),
    )
  )
    throw new Error("Invalid sources in " + slug);
  const platforms = data.platforms ? strings(data.platforms) : [];
  if (platforms.some((p) => p !== "web" && p !== "mobile"))
    throw new Error("Invalid platform");
  // Listenobergrenzen (B2; 09-UI-SPEC § 4: count.artikelFunktionen 1–3, count.artikelVerwandt 1–4).
  const relatedFeatures = strings(data.relatedFeatures),
    relatedArticles = strings(data.relatedArticles);
  if (relatedFeatures.length > TEXT_BUDGET.count.artikelFunktionen.max)
    throw new Error(
      `Artikel ${slug}: ${relatedFeatures.length} relatedFeatures – höchstens 3, die wichtigsten behalten.`,
    );
  if (relatedArticles.length > TEXT_BUDGET.count.artikelVerwandt.max)
    throw new Error(
      `Artikel ${slug}: ${relatedArticles.length} relatedArticles – höchstens 4, die wichtigsten behalten.`,
    );
  return {
    kind,
    slug,
    title: string(data, "title"),
    description: string(data, "description"),
    category: string(data, "category"),
    publishedAt,
    updatedAt,
    author: string(data, "author"),
    draft: data.draft,
    relatedFeatures,
    relatedArticles,
    sources,
    platforms: platforms as ("web" | "mobile")[],
    readingMinutes: Math.max(
      1,
      Math.ceil(content.trim().split(/\s+/).length / 200),
    ),
    answer: answerFeld(data, slug),
    faq: faqFeld(data, slug),
    scene: sceneFeld(data, slug),
    body: content,
  };
}
const readAll = cache(async (kind: ContentKind) => {
  const names = await fs
    .readdir(path.join(root, kind))
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return [];
      throw error;
    });
  return Promise.all(
    names
      .filter((n) => n.endsWith(".md"))
      .map(async (name) =>
        parseContent(
          await fs.readFile(path.join(root, kind, name), "utf8"),
          kind,
          name.slice(0, -3),
        ),
      ),
  );
});
/** Stand der Übersichtsvorlage /blog und /hilfe (K-11, Phase-9-Überarbeitung). */
export const UEBERSICHT_STAND = "2026-10-23";
/**
 * lastModified einer Übersicht (09-REVIEW LO-08): jüngstes updatedAt der Artikel, mindestens der Vorlagenstand.
 * ISO-Daten vergleichen sich als Text richtig.
 */
export function uebersichtStand(artikel: readonly { updatedAt: string }[], basis: string = UEBERSICHT_STAND): string {
  return artikel.reduce((m, a) => (a.updatedAt > m ? a.updatedAt : m), basis);
}
export const getContentList = cache(
  async (kind: ContentKind): Promise<ContentSummary[]> => {
    const all = await readAll(kind);
    return all
      .filter((a) => !a.draft)
      .sort(
        (a, b) =>
          b.publishedAt.localeCompare(a.publishedAt) ||
          a.title.localeCompare(b.title, "de"),
      )
      .map((a) => {
        const summary = { ...a } as Partial<typeof a>;
        delete summary.body;
        return summary as ContentSummary;
      });
  },
);

/** Sichtbarer Text eines hast-Knotens (Leerraum zusammengefasst). */
function textOf(node: Root | RootContent | ElementContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}
const kurz = (s: string) => s.replace(/\s+/g, " ").trim();
const isElement = (node: Root | RootContent | ElementContent): node is Element => node.type === "element";

/**
 * Rehype-Schritt der Artikel-Prosa (09-UI-SPEC G10, § 2.3/§ 2.4; T-09-01): läuft nach rehype-sanitize und
 * rehype-slug, damit Sanitize die gesetzten Attribute nicht entfernt und Markdown selbst keine role/tabindex
 * einschleusen kann. Oberste nummerierte Listen erhalten role="list" (WebKit verwirft die Listensemantik bei
 * list-style: none); jede Tabelle steckt in einem fokussierbaren Scrollbereich mit dem Text der vorherigen H2.
 */
function rehypeArtikel() {
  return (tree: Root, file: VFile) => {
    let h2 = "";
    // 09-REVIEW LO-02: Inhaltsverzeichnis direkt aus dem Baum (Text statt HTML, keine Entities, Reihenfolge des Texts).
    const toc: TocEintrag[] = [];
    const besuche = (parent: Root | Element) => {
      parent.children = parent.children.map((kind) => {
        if (!isElement(kind)) return kind;
        if (kind.tagName === "h2") h2 = kurz(textOf(kind));
        if ((kind.tagName === "h2" || kind.tagName === "h3") && typeof kind.properties?.id === "string")
          toc.push({ level: kind.tagName === "h2" ? 2 : 3, id: kind.properties.id, title: kurz(textOf(kind)) });
        if (kind.tagName === "ol" && parent.type === "root") kind.properties = { ...kind.properties, role: "list" };
        if (kind.tagName === "table") {
          const huelle: Element = {
            type: "element",
            tagName: "div",
            properties: {
              className: ["table-scroll"],
              role: "region",
              tabIndex: 0,
              ariaLabel: h2 ? `Tabelle: ${h2}` : "Tabelle",
            },
            children: [kind],
          };
          return huelle;
        }
        besuche(kind);
        return kind;
      });
    };
    besuche(tree);
    file.data.toc = toc;
  };
}

/** Markdown → hast (gleiche Kette wie renderMarkdown bis vor den Artikel-Schritt). */
function prosaPipeline() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeSlug);
}

export async function renderMarkdown(body: string) {
  const result = await prosaPipeline()
    .use(rehypeArtikel)
    .use(rehypeStringify)
    .process(body);
  const html = String(result);
  const toc = (result.data.toc as TocEintrag[] | undefined) ?? [];
  return { html, toc };
}

/**
 * Reservierte Anker (09-UI-SPEC § 2.2; 09-REVIEW LO-01) – keine Prosa-Überschrift darf sie erzeugen: Abschnitte der
 * Artikelvorlage, H1-ids von Artikel (`artikel-titel`) und Übersicht (`seiten-titel`), Skip-Ziel `<main id="inhalt">`
 * (app/layout.tsx) und `hauptnavigation` (components/layout/HeaderShell.tsx). tests/content.test.ts prüft, dass die
 * ids dort wirklich vergeben werden.
 */
export const RESERVIERTE_IDS = [
  "antwort",
  "faq",
  "quellen",
  "funktionen",
  "weiterlesen",
  "inhalt",
  "artikel-titel",
  "seiten-titel",
  "hauptnavigation",
] as const;
/** Präfix der Menü-ids im Kopf (`navigation-<eintrag>`, HeaderShell.tsx). */
export const RESERVIERTES_ID_PRAEFIX = "navigation-";

export interface ProsaProblem {
  /** Regel-Schlüssel für Übergangslisten („<datei>|<regel>“). */
  regel: "bild" | "ol-start" | "schritt" | "schrittliste" | "ueberschrift" | "reservierte-id" | "faq-ueberschrift";
  /** Fehlertext wörtlich aus 09-UI-SPEC § 5. */
  meldung: string;
}

/**
 * Prosa-Regeln der Artikelvorlage (09-UI-SPEC § 2.3, § 2.4, § 4, § 5): kein Bild, keine Liste mit Startnummer,
 * Schritt der obersten Liste ≤ 160 Zeichen, 2–10 Schritte je oberster Liste, Überschrift ≤ 80, keine reservierte
 * id, keine FAQ-Frage zugleich als Überschrift. Liefert alle Probleme (Sammelprüfung), wirft nicht.
 */
export async function prosaProbleme(
  slug: string,
  body: string,
  faq: { q: string; a: string }[] = [],
): Promise<ProsaProblem[]> {
  const pipeline = prosaPipeline();
  const tree = (await pipeline.run(pipeline.parse(body))) as Root;
  const out: ProsaProblem[] = [];
  const add = (regel: ProsaProblem["regel"], meldung: string) => out.push({ regel, meldung });
  const alle: Element[] = [];
  const sammle = (node: Root | Element) => {
    for (const kind of node.children)
      if (isElement(kind)) {
        alle.push(kind);
        sammle(kind);
      }
  };
  sammle(tree);

  if (alle.some((e) => e.tagName === "img"))
    add("bild", `Artikel ${slug}: Bild im Text gefunden – Screenshots sind nicht erlaubt, Szene per Frontmatter nutzen.`);
  for (const ol of alle.filter((e) => e.tagName === "ol")) {
    const start = ol.properties?.start;
    if (start !== undefined && start !== null && Number(start) !== 1)
      add("ol-start", `Artikel ${slug}: nummerierte Liste beginnt bei ${String(start)} – jede Liste beginnt bei 1, Startnummer entfernen.`);
  }
  const { min, max } = TEXT_BUDGET.count.artikelSchritte;
  for (const ol of tree.children.filter((k): k is Element => isElement(k) && k.tagName === "ol")) {
    const schritte = ol.children.filter((k): k is Element => isElement(k) && k.tagName === "li");
    if (schritte.length < min || schritte.length > max)
      add("schrittliste", `Artikel ${slug}: Schrittliste mit ${schritte.length} Einträgen – ${min} bis ${max}, unter Zwischenüberschriften aufteilen.`);
    schritte.forEach((li, i) => {
      // Schritttext ohne verschachtelte Listen (Unterpunkte gehören nicht zum Schritt).
      const text = kurz(li.children.filter((k) => !(isElement(k) && (k.tagName === "ol" || k.tagName === "ul"))).map(textOf).join(" "));
      const n = charCount(text);
      if (n > TEXT_BUDGET.artikel.step)
        add("schritt", `Artikel ${slug}: Schritt ${i + 1} hat ${n} Zeichen – höchstens ${TEXT_BUDGET.artikel.step}, Schritt teilen.`);
    });
  }
  const ueberschriften = alle.filter((e) => /^h[1-6]$/.test(e.tagName));
  for (const h of ueberschriften.filter((e) => /^h[234]$/.test(e.tagName))) {
    const text = kurz(textOf(h));
    const n = charCount(text);
    if (n > TEXT_BUDGET.artikel.heading)
      add("ueberschrift", `Artikel ${slug}: Überschrift ‚${text}‘ hat ${n} Zeichen – höchstens ${TEXT_BUDGET.artikel.heading}.`);
  }
  for (const h of ueberschriften) {
    const id = String(h.properties?.id ?? "");
    if ((RESERVIERTE_IDS as readonly string[]).includes(id) || id.startsWith(RESERVIERTES_ID_PRAEFIX))
      add("reservierte-id", `Artikel ${slug}: Überschrift erzeugt die reservierte id ‚${id}‘ – Überschrift umbenennen.`);
  }
  const titel = new Set(ueberschriften.map((h) => kurz(textOf(h))));
  for (const { q } of faq)
    if (titel.has(kurz(q)))
      add("faq-ueberschrift", `Artikel ${slug}: FAQ-Frage ‚${q}‘ steht auch als Überschrift im Text – nur an einer Stelle beantworten.`);
  return out;
}

export const getContentArticle = cache(
  async (kind: ContentKind, slug: string): Promise<ContentArticle | null> => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
    const all = await readAll(kind),
      article = all.find((a) => a.slug === slug && !a.draft);
    if (!article) return null;
    return { ...article, ...(await renderMarkdown(article.body)) };
  },
);
