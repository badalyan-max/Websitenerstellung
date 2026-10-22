/**
 * Leitlinien-Schutz der Inhabervorgabe vom 22.10.2026: „Nur, was unterstützt wird, nicht, was nicht unterstützt
 * wird.“ (08-REVIEW ME-06, DESIGN-V2.md § 17.6). Ein Helfer für alle Inhaltsmodule unter lib/seiten (Kernseiten,
 * Preise, Vergleich, kleine Betriebe, Alternativen); die Module rufen ihn beim Laden auf, ein Verstoß ist ein
 * Build- und Testfehler. Einzige Ausnahme ist die GoBD-Zertifizierungsfrage auf /gobd (`erlaubt`).
 *
 * Geprüft wird:
 * - jeder Text auf Negativsätze über CraftOS (`NEGATIVSATZ`),
 * - jede FAQ-Antwort (`{ q, a }`) auf „Nein“ am Anfang,
 * - CraftOS-Zellen auf Verneinung (`false`, „Nein“, Strich, „nicht …“): in Tabellen mit Zeile „CraftOS“ nur diese
 *   Zeile, in reinen CraftOS-Tabellen (z. B. Lizenzen) alle Zellen, in Alternativen-Zeilen die Spalte `craftos`.
 * Belegte Wettbewerberangaben (Schlüssel `wettbewerber`, `belege`, `zeilen`, Quellen) bleiben außen vor; sie prüft
 * lib/wettbewerber (`pruefeWettbewerber`). Tests: tests/nur-unterstuetzt.test.ts.
 */

/** Kennzeichnung der Fehlermeldungen. */
export const NUR_UNTERSTUETZT = "Inhaber 22.10.2026: nur, was CraftOS unterstützt";

/** CraftOS-Zelle verneint: „Nein“, Strich, „nicht …“, „nicht verfügbar“. */
export const VERNEINTE_ZELLE = /^\s*(nein|[-–—]|nicht\b)|nicht verfügbar/i;

/**
 * Satz, dass CraftOS etwas nicht kann, nicht zeigt oder nicht aufzeichnet, sowie Einschränkungsformeln
 * („Teilweise“, „Grenzen“, „brauchen eine Verbindung“). Bewusst eng: „Nicht zu verwechseln …“ oder „ohne
 * Zahlungsdaten“ sind keine Aussagen über fehlende Funktionen.
 */
export const NEGATIVSATZ = new RegExp(
  [
    "nicht verfügbar",
    "nicht unterstützt",
    "CraftOS (bietet|hat|kann|unterstützt|zeigt|speichert|zeichnet) (kein|nicht)",
    "ohne Bewegungsverläufe",
    "nicht (aufgezeichnet|angezeigt|möglich)",
    "zeigt [^.;:]* nicht(?![\\p{L}])",
    "^Teilweise(?![\\p{L}])",
    "(?<![\\p{L}])Grenzen(?![\\p{L}])",
    "(braucht|brauchen|benötigt|benötigen) eine Verbindung",
  ].join("|"),
  "iu",
);

const NEIN_ANTWORT = /^Nein(?![\p{L}])/u;

/** Schlüssel mit Wettbewerber-Datenmodul, Belegen oder Quellen: nicht Teil der CraftOS-Aussagen. */
const AUSSEN_VOR = new Set(["wettbewerber", "belege", "zeilen", "sources", "quellen"]);

export interface NurUnterstuetztOptionen {
  /** Texte, die wörtlich erlaubt sind (nur die GoBD-Zertifizierungsantwort). */
  erlaubt?: readonly string[];
}

const istObjekt = (v: unknown): v is Record<string, unknown> => Boolean(v) && typeof v === "object" && !Array.isArray(v);

function zelleVerneint(zelle: unknown): boolean {
  return zelle === false || (typeof zelle === "string" && VERNEINTE_ZELLE.test(zelle));
}

/** Alle Verstöße in einem Inhalt (beliebig verschachtelte Objekte und Arrays); leer = in Ordnung. */
export function nurUnterstuetztVerstoesse(inhalt: unknown, opts: NurUnterstuetztOptionen = {}): string[] {
  const erlaubt = new Set(opts.erlaubt ?? []);
  const out: string[] = [];
  const gesehen = new Set<object>();

  const tabelle = (rows: unknown[]) => {
    const zeilen = rows.filter(istObjekt);
    const craftosZeile = zeilen.find((r) => r.label === "CraftOS");
    for (const r of craftosZeile ? [craftosZeile] : zeilen) {
      if (!istObjekt(r.cells)) continue;
      for (const [spalte, zelle] of Object.entries(r.cells))
        if (zelleVerneint(zelle)) out.push(`Zelle „${String(r.label)}“/${spalte} verneint CraftOS („${String(zelle)}“) – Leistung positiv benennen.`);
    }
  };

  const walk = (v: unknown) => {
    if (typeof v === "string") {
      if (erlaubt.has(v)) return;
      const treffer = NEGATIVSATZ.exec(v)?.[0];
      if (treffer) out.push(`Text enthält „${treffer}“: „${v.slice(0, 80)}“ – nur nennen, was CraftOS unterstützt.`);
      return;
    }
    if (Array.isArray(v)) {
      if (v.some((r) => istObjekt(r) && istObjekt(r.cells))) tabelle(v);
      v.forEach(walk);
      return;
    }
    if (!istObjekt(v) || gesehen.has(v)) return;
    gesehen.add(v);
    if (typeof v.q === "string" && typeof v.a === "string" && !erlaubt.has(v.a) && NEIN_ANTWORT.test(v.a))
      out.push(`FAQ „${v.q}“ beginnt mit „Nein“ – positiv antworten.`);
    if ("craftos" in v && "wettbewerber" in v && zelleVerneint(v.craftos))
      out.push(`Zeile „${String(v.label)}“ verneint CraftOS – Zeile weglassen.`);
    for (const [k, w] of Object.entries(v)) if (!AUSSEN_VOR.has(k)) walk(w);
  };

  walk(inhalt);
  return out;
}

/** Wirft beim ersten Verstoß mit Kontext (Modul oder Seite) und Kennzeichnung der Inhabervorgabe. */
export function pruefeNurUnterstuetzt(inhalt: unknown, opts: NurUnterstuetztOptionen & { kontext: string }): void {
  const [erster] = nurUnterstuetztVerstoesse(inhalt, opts);
  if (erster) throw new Error(`${opts.kontext}: ${erster} (${NUR_UNTERSTUETZT})`);
}
