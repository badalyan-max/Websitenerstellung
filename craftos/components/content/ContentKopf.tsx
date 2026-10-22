import { PlatformBadges } from "@/components/v2/Badges";
import { Breadcrumbs } from "@/components/v2/Breadcrumbs";
import { TEXT_BUDGET, assertTextBudget, sentenceCount } from "@/components/v2/budgets";
import type { Crumb } from "@/lib/breadcrumbs";
import type { ProductPlatform } from "@/lib/funktionen";
import s from "./ContentKopf.module.css";

export interface ContentKopfProps {
  /** crumbsFor(pfad, title) – erzeugt die einzige BreadcrumbList der Seite. */
  crumbs: Crumb[];
  /** ≤ 24: Kategoriename (Artikel/Kategorie) bzw. „Ratgeber“/„Hilfe“ (Übersicht). */
  eyebrow: string;
  /** Exakt zielwerte(pfad).h1 aus keyword-map.json, ≤ 100 (09-UI-SPEC H5). */
  h1: string;
  /** ≤ 300, 1–2 Sätze → <p id="antwort" data-answer> (Prompt-Ziel, Antwort zuerst). */
  answer?: string;
  /** Übergang Welle 1–2: Artikel ohne answer zeigen die description als Lead (ohne id); nie zusammen mit answer. */
  lead?: string;
  /** Artikel: Angaben der Metazeile in fester Reihenfolge (Stand, Veröffentlicht, Lesezeit, Autor), ohne Trennzeichen. */
  meta?: string[];
  /** Übersicht/Kategorie: Stand-Zeile, z. B. „40 Anleitungen, zuletzt aktualisiert am …“. */
  stand?: string;
  /** Plattformen des Artikels (Gruppe „Plattformen“). */
  platforms?: ProductPlatform[];
  /** id der H1; die section verweist per aria-labelledby darauf. Standard „artikel-titel“. */
  id?: string;
}

/**
 * Heller Seitenkopf für Artikel, Übersichten und Kategorien (09-UI-SPEC G8, § 2.1; Abweichungen H2, H5).
 * Wie der FunktionsKopf, aber hell (#F7F3EB), ohne CTA, ohne Kopfwort-Span (Silbentrennung statt Span) und mit
 * Metazeile. Server Component ohne Client-JavaScript; Budgets werden beim Rendern in der Reihenfolge des
 * FunktionsKopf geprüft. Die H1 ist das LCP-Element (keine Bilder im Kopf).
 */
export function ContentKopf({
  crumbs,
  eyebrow,
  h1,
  answer,
  lead,
  meta,
  stand,
  platforms,
  id = "artikel-titel",
}: ContentKopfProps) {
  assertTextBudget("artikel.h1", h1, TEXT_BUDGET.artikel.h1);
  assertTextBudget("pageHead.eyebrow", eyebrow, TEXT_BUDGET.pageHead.eyebrow);
  if (lead !== undefined && answer !== undefined) {
    throw new Error("ContentKopf: lead und answer gleichzeitig gesetzt – nur answer verwenden.");
  }
  if (answer !== undefined) {
    assertTextBudget("answer", answer, TEXT_BUDGET.answer);
    const saetze = sentenceCount(answer);
    if (saetze < 1 || saetze > 2) {
      throw new Error(`ContentKopf: Antwort hat ${saetze} Sätze – ein bis zwei Sätze schreiben.`);
    }
  }

  return (
    <section className={s.kopf} aria-labelledby={id} data-abschnitt="kopf" data-tone="light">
      <div className={`site-container ${s.crumbs}`}>
        <Breadcrumbs items={crumbs} tone="light" />
      </div>
      <div className={`site-container ${s.inner}`}>
        <p className={`v2-eyebrow ${s.eyebrow}`}>{eyebrow}</p>
        <h1 id={id} className={s.title}>
          {h1}
        </h1>
        {answer !== undefined ? (
          <p id="antwort" data-answer="" className={s.answer}>
            {answer}
          </p>
        ) : lead !== undefined ? (
          <p className={s.lead}>{lead}</p>
        ) : null}
        {meta && meta.length > 0 ? (
          <ul aria-label="Angaben zum Artikel" className={s.meta}>
            {meta.map((angabe) => (
              <li key={angabe}>{angabe}</li>
            ))}
          </ul>
        ) : null}
        {stand ? (
          <p data-stand="" className={s.stand}>
            {stand}
          </p>
        ) : null}
        {platforms && platforms.length > 0 ? (
          <div className={s.platforms}>
            <PlatformBadges platforms={platforms} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
