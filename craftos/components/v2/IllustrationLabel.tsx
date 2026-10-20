import { Info } from "lucide-react";
import { assertTextBudget } from "./budgets";
import s from "./MediaFigure.module.css";

/** Screenreadersatz der Geräterahmen ≤ 140 Zeichen (UI-SPEC §6). */
const FRAME_DESCRIPTION_MAX = 140;

export type IllustrationLabelProps = { kind: "vereinfacht" | "ki" };

/** Feste Kennzeichnungstexte (UI-SPEC §9, MEDIA-03, D-04) – nie frei formulieren. */
const LABEL_TEXT = {
  vereinfacht: "Vereinfachte Darstellung mit Beispieldaten",
  ki: "Darstellung, KI-gestaltet",
} as const satisfies Record<IllustrationLabelProps["kind"], string>;

/**
 * Sichtbare Kennzeichnung in der figcaption unter Rahmen bzw. Bild.
 * Auf dunklen Flächen wechselt die Farbe über data-tone="dark" an einem Vorfahren.
 */
export function IllustrationLabel({ kind }: IllustrationLabelProps) {
  return (
    <span className={s.label} data-illustration-label={kind}>
      <Info size={16} strokeWidth={1.75} aria-hidden="true" />
      {LABEL_TEXT[kind]}
    </span>
  );
}

/**
 * figcaption der Geräterahmen: Screenreadersatz (sr-only, beschreibt die Ansicht) plus sichtbare
 * Kennzeichnung der Art „vereinfacht“ (MEDIA-03, D-02).
 */
export function FrameCaption({ description, className }: { description: string; className?: string }) {
  if (!description.trim()) {
    throw new Error("Geräterahmen: description fehlt – Screenreadersatz zur Ansicht angeben.");
  }
  assertTextBudget("frame.description", description, FRAME_DESCRIPTION_MAX);
  return (
    <figcaption className={className}>
      <span className="sr-only">{description}</span>
      <IllustrationLabel kind="vereinfacht" />
    </figcaption>
  );
}
