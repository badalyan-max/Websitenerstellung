import type { LucideIcon } from "lucide-react";
import { PlatformBadges } from "@/components/v2/Badges";
import { Breadcrumbs } from "@/components/v2/Breadcrumbs";
import { TEXT_BUDGET, assertTextBudget, charCount, sentenceCount } from "@/components/v2/budgets";
import type { Crumb } from "@/lib/breadcrumbs";
import type { ProductPlatform } from "@/lib/funktionen";
import s from "./ContentKopf.module.css";

export interface ContentKopfProps {
  /**
   * crumbsFor(pfad, title) – erzeugt die einzige BreadcrumbList der Seite. `null` nur auf der 404-Seite
   * (10-UI-SPEC K1, J1): kein Brotkrumen-Container, `data-crumbs="ohne"` an der section.
   */
  crumbs: Crumb[] | null;
  /** ≤ 24: Kategoriename (Artikel/Kategorie) bzw. „Ratgeber“/„Hilfe“ (Übersicht). */
  eyebrow: string;
  /** Exakt zielwerte(pfad).h1 aus keyword-map.json, ≤ 100 (09-UI-SPEC H5). */
  h1: string;
  /** ≤ 300, 1–2 Sätze → <p id="antwort" data-answer> (Prompt-Ziel, Antwort zuerst). */
  answer?: string;
  /** Übergang Welle 1–2: Artikel ohne answer zeigen die description als Lead (ohne id); nie zusammen mit answer. */
  lead?: string;
  /**
   * 10-UI-SPEC K2: kurzer Hinweis (≤ 80 Zeichen) mit dekorativem Icon nach Antwort bzw. Lead und vor meta,
   * z. B. das Rechnerversprechen. Ohne hinweis bleibt das Markup unverändert (K3).
   */
  hinweis?: { text: string; icon: LucideIcon };
  /** Artikel: Angaben der Metazeile in fester Reihenfolge (Stand, Veröffentlicht, Lesezeit, Autor), ohne Trennzeichen. */
  meta?: string[];
  /** Übersicht/Kategorie: Stand-Zeile, z. B. „40 Anleitungen, zuletzt aktualisiert am …“. */
  stand?: string;
  /** Plattformen des Artikels (Gruppe „Plattformen“). */
  platforms?: ProductPlatform[];
  /** id der H1; die section verweist per aria-labelledby darauf. Standard „artikel-titel“. */
  id?: string;
  /**
   * 09-REVIEW IN-05: Ob die section als benannte Region gilt (aria-labelledby auf die H1). Im Artikel trägt bereits
   * <article aria-labelledby> den Namen der H1; dort `false`, sonst gäbe es zwei Landmarken mit demselben Namen.
   */
  region?: boolean;
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
  hinweis,
  meta,
  stand,
  platforms,
  id = "artikel-titel",
  region = true,
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
  if (hinweis !== undefined) {
    const n = charCount(hinweis.text);
    // 10-UI-SPEC K2: Höchstlänge aus components/v2/budgets.ts (TEXT_BUDGET.contentKopf.hinweis = 80).
    const max = TEXT_BUDGET.contentKopf.hinweis;
    if (n > max) {
      throw new Error(`ContentKopf: hinweis hat ${n} von ${max} Zeichen – Satz kürzen.`);
    }
  }
  const HinweisIcon = hinweis?.icon;

  return (
    <section
      className={s.kopf}
      aria-labelledby={region ? id : undefined}
      data-abschnitt="kopf"
      data-tone="light"
      data-crumbs={crumbs === null ? "ohne" : undefined}
    >
      {crumbs !== null ? (
        <div className={`site-container ${s.crumbs}`}>
          <Breadcrumbs items={crumbs} tone="light" />
        </div>
      ) : null}
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
        {hinweis !== undefined && HinweisIcon !== undefined ? (
          <p data-hinweis="" className={s.hinweis}>
            <HinweisIcon size={16} aria-hidden="true" className={s.hinweisIcon} />
            <span>{hinweis.text}</span>
          </p>
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
