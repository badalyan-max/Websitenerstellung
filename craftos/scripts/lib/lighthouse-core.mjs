// Reine Auswertung für den Lighthouse-Modus von scripts/performance-audit.mjs (`--lighthouse`).
// Kein Dateizugriff, kein Netz, kein Browser: Eingabe sind Lighthouse-Ergebnisse (lhr) bzw. daraus
// gelesene Kennzahlen. Regeln: 10-CONTEXT D-11 (Gate Score ≥ 95 und LCP < 2.500 ms, Median aus drei
// Läufen), D-12 (Werkzeug) und 10-UI-SPEC § 11 K13 (Accessibility 100 auf den A11y-Gate-Seiten,
// Best Practices und SEO nur Bericht). Getestet in tests/lighthouse-core.test.ts.

/**
 * @typedef {{ bestanden: boolean, gruende: string[] }} Urteil
 * @typedef {{ score: number|null, lcp: number|null, fcp: number|null, si: number|null, tbt: number|null,
 *   cls: number|null, lcpElement: string|null, laeufe: number, ungueltig: number,
 *   kategorien: Record<string, number|null>, gate: Urteil|null, info: boolean,
 *   befunde?: Array<{ id: string, titel: string, lcp: number, fcp: number, anzeige: string|null }> }} UrlErgebnis
 * @typedef {{ herkunft: string, kennzeichnung: string, urls: Record<string, UrlErgebnis>, gateVerletzt: boolean }} Zusammenfassung
 */

/**
 * Gate-Seiten je Vorlage (D-11): je Vorlage die Seite mit dem schlechtesten Median-LCP aus der Ausgangsmessung
 * 10-09 (23.10.2026, Labordaten, mobil, lokal, Median aus 3 Läufen; Begründung im 10-09-SUMMARY).
 * Reihenfolge: Start, Funktionsübersicht, Funktionsdetail, Gewerke, Vergleich, Ratgeber.
 */
export const GATE_ROUTEN = [
  "/",
  "/funktionen",
  "/funktionen/angebote",
  "/gewerke/shk",
  "/vergleich/handwerkersoftware-kleine-betriebe",
  "/blog/handwerkerrechnung-schreiben",
];

/** Zur Information gemessen, kein Gate (D-11). */
export const INFO_ROUTEN = ["/preise", "/app", "/hilfe/rechnung-fertigstellen", "/rechner/stundensatz"];

/** Lighthouse Accessibility muss hier 100 sein (K13). */
export const A11Y_GATE = ["/impressum", ...GATE_ROUTEN];

/** Lighthouse Accessibility wird hier berichtet (Soll 100, kein Gate, K13). */
export const A11Y_BERICHT = [
  "/datenschutz",
  "/agb",
  "/support",
  "/rechner",
  "/rechner/stundensatz",
  "/rechner/angebotskalkulation",
];

/** Zusätzliche Kategorien für `--kategorien=` (je URL ein eigener Lauf). */
export const KATEGORIEN = ["accessibility", "best-practices", "seo"];

export const GRENZEN = { score: 95, lcp: 2500, accessibility: 100 };

const KENNZEICHNUNG_LOKAL = "Labordaten, mobil, lokal, Median aus 3 Läufen, URL";

/**
 * Median über die gültigen Zahlen. Bei gerader Anzahl (z. B. zwei gültige Läufe nach Ausfällen) gilt
 * das untere Mittel, also der kleinere der beiden mittleren Werte; ohne Werte `null`.
 */
export function median(xs) {
  const s = xs.filter((x) => typeof x === "number" && Number.isFinite(x)).sort((a, b) => a - b);
  if (s.length === 0) return null;
  return s[Math.ceil(s.length / 2) - 1];
}

/** Dateiname je Pfad: `/` → `start`, sonst Pfad ohne führenden Schrägstrich mit `-` statt `/`. */
export function slug(pfad) {
  if (pfad === "/") return "start";
  return pfad.replace(/^\/+|\/+$/g, "").split("/").join("-");
}

/** „Labordaten, mobil, lokal|live, Median aus N Läufen, URL“ (D-11); live bei https-Herkunft. */
export function kennzeichnung(herkunft, laeufe = 3) {
  let text = KENNZEICHNUNG_LOKAL;
  if (/^https:/i.test(herkunft ?? "")) text = text.split("lokal").join("live");
  if (laeufe !== 3) text = text.split("3 Läufen").join(laeufe === 1 ? "1 Lauf" : `${laeufe} Läufen`);
  return text;
}

function zahl(lhr, audit) {
  const v = lhr?.audits?.[audit]?.numericValue;
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/** Erstes Element vom Typ `node` in verschachtelten Details (Liste, Tabelle, Tabellenzeile). */
function findeKnoten(wert, tiefe = 0) {
  if (!wert || typeof wert !== "object" || tiefe > 6) return null;
  if (wert.type === "node" && (wert.selector || wert.nodeLabel || wert.snippet)) return wert;
  for (const kind of Array.isArray(wert) ? wert : Object.values(wert)) {
    const k = findeKnoten(kind, tiefe + 1);
    if (k) return k;
  }
  return null;
}

/** LCP-Element: Lighthouse 13 liefert es im Insight `lcp-breakdown-insight`, ältere Versionen im Audit `largest-contentful-paint-element`. */
function lcpElement(lhr) {
  for (const id of ["lcp-breakdown-insight", "largest-contentful-paint-element"]) {
    const k = findeKnoten(lhr?.audits?.[id]?.details);
    if (k) return k.selector || k.nodeLabel || k.snippet;
  }
  return null;
}

/** Kennzahlen eines Laufs; `runtimeError` (Code) markiert einen ungültigen Lauf. */
export function kennzahlen(lhr) {
  const roh = lhr?.categories?.performance?.score;
  return {
    score: typeof roh === "number" ? Math.round(roh * 100) : null,
    lcp: zahl(lhr, "largest-contentful-paint"),
    fcp: zahl(lhr, "first-contentful-paint"),
    si: zahl(lhr, "speed-index"),
    tbt: zahl(lhr, "total-blocking-time"),
    cls: zahl(lhr, "cumulative-layout-shift"),
    lcpElement: lcpElement(lhr),
    runtimeError: lhr?.runtimeError ? lhr.runtimeError.code || lhr.runtimeError.message || "runtimeError" : null,
  };
}

/** Hauptbefunde (D-11): Insights mit Score < 1, nach geschätzter LCP- und FCP-Ersparnis sortiert. */
export function hauptbefunde(lhr, anzahl = 6) {
  return Object.values(lhr?.audits ?? {})
    .filter((a) => a && /-insight$/.test(a.id ?? "") && typeof a.score === "number" && a.score < 1)
    .map((a) => ({
      id: a.id,
      titel: a.title,
      lcp: a.metricSavings?.LCP ?? 0,
      fcp: a.metricSavings?.FCP ?? 0,
      anzeige: a.displayValue ?? null,
    }))
    .sort((a, b) => b.lcp - a.lcp || b.fcp - a.fcp)
    .slice(0, anzahl);
}

/** Gate D-11 auf Medianwerte: Score ≥ 95 und LCP < 2.500 ms; fehlende Werte sind ein Verstoß. */
export function bewerte({ score, lcp }) {
  const gruende = [];
  if (score == null) gruende.push("Score fehlt");
  else if (score < GRENZEN.score) gruende.push(`Score ${score} < ${GRENZEN.score}`);
  if (lcp == null) gruende.push("LCP fehlt");
  else if (lcp >= GRENZEN.lcp) gruende.push(`LCP ${Math.round(lcp)} ms ≥ ${GRENZEN.lcp} ms`);
  return { bestanden: gruende.length === 0, gruende };
}

/** Kategorien (K13): Accessibility ist Gate (100), Best Practices und SEO nur Bericht. */
export function bewerteKategorie(name, wert) {
  if (name !== "accessibility") return { gate: false, bestanden: null, grund: null };
  const bestanden = wert === GRENZEN.accessibility;
  return {
    gate: true,
    bestanden,
    grund: bestanden ? null : wert == null ? "Accessibility fehlt" : `Accessibility ${wert} < ${GRENZEN.accessibility}`,
  };
}

/**
 * Sammelergebnis. `ergebnisse`: `[{ pfad, laeufe: kennzahlen[], ungueltig, kategorien?, lcpElement?, befunde? }]`.
 * `gate` gilt für Performance (D-11), `a11yGate` für Accessibility, sofern die Kategorie gemessen wurde (K13);
 * `info`-Pfade werden nur berichtet. Kennzahlen sind Mediane je Kennzahl über die gültigen Läufe.
 * @returns {Zusammenfassung}
 */
export function zusammenfassung(ergebnisse, { gate = GATE_ROUTEN, info = INFO_ROUTEN, a11yGate = A11Y_GATE, herkunft = "", laeufe = 3 } = {}) {
  /** @type {Record<string, UrlErgebnis>} */
  const urls = {};
  let gateVerletzt = false;
  for (const e of ergebnisse) {
    const gueltig = e.laeufe.filter((k) => !k.runtimeError);
    const m = {};
    for (const key of ["score", "lcp", "fcp", "si", "tbt", "cls"]) m[key] = median(gueltig.map((k) => k[key]));
    const naechster = [...gueltig].sort((a, b) => Math.abs((a.lcp ?? 0) - (m.lcp ?? 0)) - Math.abs((b.lcp ?? 0) - (m.lcp ?? 0)))[0];
    const kategorien = { ...(e.kategorien ?? {}) };

    let urteil = null;
    if (gate.includes(e.pfad)) urteil = bewerte(m);
    if (a11yGate.includes(e.pfad) && kategorien.accessibility !== undefined) {
      const k = bewerteKategorie("accessibility", kategorien.accessibility);
      urteil = urteil ?? { bestanden: true, gruende: [] };
      if (!k.bestanden) urteil = { bestanden: false, gruende: [...urteil.gruende, k.grund] };
    }
    if (urteil && !urteil.bestanden) gateVerletzt = true;

    urls[e.pfad] = {
      ...m,
      lcpElement: e.lcpElement ?? naechster?.lcpElement ?? null,
      laeufe: gueltig.length,
      ungueltig: e.ungueltig ?? 0,
      kategorien,
      gate: urteil,
      info: info.includes(e.pfad),
      ...(e.befunde ? { befunde: e.befunde } : {}),
    };
  }
  return { herkunft, kennzeichnung: kennzeichnung(herkunft, laeufe), urls, gateVerletzt };
}

/** CLI-Optionen des Modus `--lighthouse`; `fehler` nicht leer → Exit 2. */
export function optionen(argv) {
  const o = { fehler: [], paths: [...GATE_ROUTEN, ...INFO_ROUTEN], runs: 3, kategorien: [], block: null };
  for (const arg of argv) {
    if (arg === "--lighthouse") continue;
    const [name, ...rest] = arg.split("=");
    const wert = rest.join("=");
    if (name === "--paths") {
      o.paths = wert.split(",").map((p) => p.trim()).filter(Boolean);
      if (o.paths.length === 0) o.fehler.push("--paths ohne Pfad.");
      for (const p of o.paths) {
        if (/^\/?[A-Za-z]:[\\/]/.test(p))
          o.fehler.push(`Pfad ${p} wurde offenbar von Git Bash umgeschrieben – Aufruf mit MSYS_NO_PATHCONV=1 wiederholen.`);
        else if (!p.startsWith("/")) o.fehler.push(`Pfad ${p} beginnt nicht mit „/“.`);
      }
    } else if (name === "--runs") {
      const n = Number(wert);
      if (!Number.isInteger(n) || n < 1 || n > 9) o.fehler.push(`--runs=${wert} ist keine ganze Zahl von 1 bis 9.`);
      else o.runs = n;
    } else if (name === "--kategorien") {
      o.kategorien = wert.split(",").map((k) => k.trim()).filter(Boolean);
      for (const k of o.kategorien.filter((x) => !KATEGORIEN.includes(x)))
        o.fehler.push(`Kategorie ‚${k}‘ ist unbekannt – bekannt: ${KATEGORIEN.join(", ")}.`);
    } else if (name === "--block") {
      if (!/^[A-Za-z0-9_-]+$/.test(wert)) o.fehler.push(`--block=${wert}: nur Buchstaben, Ziffern, „-“ und „_“.`);
      else o.block = wert;
    } else {
      o.fehler.push(`Unbekannte Option ${arg} – bekannt: --paths=, --runs=, --kategorien=, --block=.`);
    }
  }
  return o;
}
