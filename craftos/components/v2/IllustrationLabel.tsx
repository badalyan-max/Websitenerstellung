import { Info } from "lucide-react";
import s from "./MediaFigure.module.css";

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
