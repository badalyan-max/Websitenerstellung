import { ImageResponse } from "next/og";
import { LOGO_PATH } from "@/components/CraftOSLogo";

/**
 * Eine OG-Vorlage für alle Seiten (08-05, G7, UI-SPEC § 7; D-08, D-20, D-21, C6, C7).
 * Fläche #101014 flach, Logo oben, unten Seitentyp, Titel (= H1 der Seite) und „craftos.eu“, Unterkante Amber.
 * Schrift: keine `fonts`-Option, also gebündelte Geist Regular 400; Hierarchie nur über Größe und Farbe.
 * Verboten: Preise, Testtage, Daten, Wettbewerberlogos, Verläufe, Raster, Pillen, Versalien.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_KINDS = [
  "Handwerkersoftware",
  "Funktion",
  "Funktionen",
  "Mobile-App",
  "Preise",
  "Vergleich",
  "Fakten",
  "Craft AI",
  "GoBD",
  "Gewerk",
  "Gewerke",
  "Ratgeber",
  "Hilfe",
  "Rechner",
  "Kontakt",
  "Rechtliches",
] as const;

export type OgKind = (typeof OG_KINDS)[number];

/** Höchstlänge des Titels; darüber bricht der Build mit einem Hinweis auf den Kurztitel ab. */
export const OG_TITLE_MAX = 90;

/** Titelgröße nach Zeichenzahl: bis 40 Zeichen 72 px, 41–60 Zeichen 64 px, 61–90 Zeichen 52 px, darüber Fehler. */
export function ogTitleSize(title: string, path?: string): 72 | 64 | 52 {
  const n = title.length;
  if (n > OG_TITLE_MAX) {
    throw new Error(
      `OG: Titel für ${path ?? `„${title}“`} hat ${n} Zeichen – höchstens ${OG_TITLE_MAX}, Kurztitel in den Daten angeben.`,
    );
  }
  if (n <= 40) return 72;
  if (n <= 60) return 64;
  return 52;
}

/** Alternativtext der OG-Grafik: „{kind}: {title}“. */
export function ogAlt(kind: OgKind, title: string): string {
  return `${kind}: ${title}`;
}

const FLAECHE = "#101014";
const TEXT = "#F4F4F5";
const AMBER = "#F2AF38";
const LEISE = "#BCBCC6";

export function pageOg({ title, kind, path }: { title: string; kind: OgKind; path?: string }): ImageResponse {
  const titleSize = ogTitleSize(title, path);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: FLAECHE,
          padding: 72,
          borderBottom: `12px solid ${AMBER}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width={56} height={56} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill={AMBER} fillRule="evenodd" d={LOGO_PATH} />
          </svg>
          <div style={{ display: "flex", marginLeft: 16, color: TEXT, fontSize: 40, lineHeight: 1 }}>CraftOS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: AMBER, fontSize: 28, lineHeight: 1.2 }}>{kind}</div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 1056,
              color: TEXT,
              fontSize: titleSize,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 48, color: LEISE, fontSize: 24, lineHeight: 1.2 }}>
            craftos.eu
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
