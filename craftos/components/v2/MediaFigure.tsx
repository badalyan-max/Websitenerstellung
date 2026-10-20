import Image from "next/image";
import { assertTextBudget } from "./budgets";
import { IllustrationLabel } from "./IllustrationLabel";
import s from "./MediaFigure.module.css";

/** Bildunterschrift ≤ 90 Zeichen (UI-SPEC §9). */
const CAPTION_MAX = 90;

export interface MediaFigureProps {
  src: string;
  alt: string;
  /** Intrinsische Größe – reserviert den Platz und verhindert Layout-Shift (MEDIA-04). */
  width: number;
  height: number;
  sizes: string;
  /** KI-gestaltete Szene → sichtbare Kennzeichnung „Darstellung, KI-gestaltet“ (D-04). */
  label?: "ki";
  caption?: string;
  /**
   * Nur oberhalb der Falz. Next.js 16 hat die Image-Prop `priority` abgekündigt; der Baustein
   * übersetzt sie gemäß Doku in `loading="eager"` und `fetchPriority="high"`.
   */
  priority?: boolean;
}

/** Bild v2 (UI-SPEC §9): Hülle um next/image mit Pflichtmaßen, optionaler Bildunterschrift und Kennzeichnung. */
export function MediaFigure({ src, alt, width, height, sizes, label, caption, priority = false }: MediaFigureProps) {
  if (caption) assertTextBudget("mediaFigure.caption", caption, CAPTION_MAX);

  return (
    <figure className={s.figure}>
      <Image
        className={s.image}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
      {caption || label ? (
        <figcaption className={s.caption}>
          {caption ? <span className={s.captionText}>{caption}</span> : null}
          {label ? <IllustrationLabel kind={label} /> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
