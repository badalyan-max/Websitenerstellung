// Reine Funktionen für scripts/a11y-audit.mjs – kein Datei- und Netzzugriff.
// Eingaben sind immer bereits gesammelte Daten (axe-Ergebnis, Stil-Signaturen, Teilberichte).
// Regeln: .planning/phases/10-abschlussaudit/10-CONTEXT.md D-05 bis D-08 und K-10, 10-UI-SPEC.md § 9.1–§ 9.3 und § 11,
// 10-RESEARCH.md Pattern 2/3. Tests: tests/a11y-audit-core.test.ts. Auch von scripts/visual-audit.mjs genutzt.

/** Prüfbreiten in px (D-05). */
export const BREITEN = [360, 390, 768, 1024, 1440];
/** Engines; Chromium prüft alle Seiten, WebKit nur die Vorlagen (D-05). */
export const ENGINES = ["chromium", "webkit"];
/** axe-Tags (D-06); `color-contrast-enhanced` wird zusätzlich über `.options()` zugeschaltet (vor `.withTags()`). */
export const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
/** Unbekannter Pfad für die 404-Seite (K-10: Status 404 erwartet, kein Fehler). */
export const NICHT_GEFUNDEN = "/gibt-es-nicht-a11y";
/** noindex, aber erreichbar und Teil des Prüfumfangs (D-05). */
export const STYLEGUIDE = "/styleguide";
/** Je Vorlage eine Seite für die WebKit-Stichprobe (D-05, 20 Seiten). */
export const WEBKIT_VORLAGEN = [
  "/",
  "/funktionen",
  "/funktionen/zeiterfassung",
  "/app",
  "/gewerke",
  "/gewerke/elektriker",
  "/blog",
  "/hilfe/kategorie/einrichtung",
  "/blog/handwerkerrechnung-schreiben",
  "/hilfe/rechnung-fertigstellen",
  "/vergleich",
  "/vergleich/plancraft-alternative",
  "/preise",
  "/fakten-ueber-craftos",
  "/craft-ai",
  "/gobd",
  "/rechner/stundensatz",
  "/support",
  "/impressum",
  NICHT_GEFUNDEN,
];
/** Bekannte Schalter des CLI. */
export const OPTIONEN = ["paths", "widths", "engines", "shard", "concurrency", "animation", "merge"];
/** Stil-Eigenschaften der Fokus-Signatur (10-UI-SPEC § 9.1). */
export const FOKUS_STIL = ["outlineStyle", "outlineWidth", "boxShadow", "borderTopColor", "backgroundColor", "textDecorationLine"];

const MSYS = /^\/?[A-Za-z]:[\\/]/;
const MSYS_HINWEIS = " Der Pfad wurde offenbar von Git Bash umgeschrieben – Aufruf mit MSYS_NO_PATHCONV=1 wiederholen.";

/**
 * Liest die Aufrufoptionen. Ohne `sitemapPfade` (null) werden nur die Optionen ohne Sitemap-Bezug geprüft, damit
 * Tippfehler vor jedem Netzaufruf mit Exit 2 enden; `pfade` ist dann die ausdrückliche Liste oder null.
 * Ausdrückliche `--paths` gelten für alle Engines; ohne `--paths` prüft WebKit nur `WEBKIT_VORLAGEN`.
 * @param {string[]} argv Argumente ohne `node` und Skriptpfad
 * @param {{ sitemapPfade: string[] | null }} kontext
 * @returns {{ fehler: string[] } | { pfade: string[] | null, webkitPfade: string[] | null, breiten: number[], engines: string[], shard: { k: number, n: number } | null, concurrency: number, animation: string, merge: boolean }}
 */
export function parseOptionen(argv, { sitemapPfade }) {
  /** @type {string[]} */
  const fehler = [];
  /** @type {Record<string, string | true>} */
  const werte = {};
  for (const arg of argv) {
    const m = /^--([a-z]+)(?:=(.*))?$/s.exec(arg);
    if (!m || !OPTIONEN.includes(m[1])) {
      fehler.push(`Unbekannte Option ${arg} – bekannt: ${OPTIONEN.map((o) => `--${o}`).join(", ")}.`);
      continue;
    }
    werte[m[1]] = m[2] === undefined ? true : m[2];
  }
  /** @param {string} name */
  const liste = (name) => {
    const w = werte[name];
    if (w === undefined) return null;
    if (w === true) {
      fehler.push(`--${name} braucht einen Wert (--${name}=…).`);
      return null;
    }
    const l = w
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!l.length) fehler.push(`--${name} ohne Wert.`);
    return l;
  };

  const merge = werte.merge === true;
  if (typeof werte.merge === "string") fehler.push("--merge hat keinen Wert.");

  let breiten = BREITEN;
  const breitenListe = liste("widths");
  if (breitenListe) {
    for (const b of breitenListe.filter((x) => !BREITEN.includes(Number(x))))
      fehler.push(`Breite ${b} ist nicht vorgesehen – erlaubt: ${BREITEN.join(", ")}.`);
    breiten = BREITEN.filter((b) => breitenListe.map(Number).includes(b));
  }

  let engines = ENGINES;
  const engineListe = liste("engines");
  if (engineListe) {
    for (const e of engineListe.filter((x) => !ENGINES.includes(x))) fehler.push(`Engine ${e} ist unbekannt – erlaubt: ${ENGINES.join(", ")}.`);
    engines = ENGINES.filter((e) => engineListe.includes(e));
  }

  /** @type {{ k: number, n: number } | null} */
  let shard = null;
  if (werte.shard !== undefined) {
    const m = typeof werte.shard === "string" ? /^(\d+)\/(\d+)$/.exec(werte.shard.trim()) : null;
    const k = m ? Number(m[1]) : NaN;
    const n = m ? Number(m[2]) : NaN;
    if (!m || k < 1 || n < 1 || k > n) fehler.push(`--shard=${werte.shard === true ? "" : werte.shard} ist ungültig – Form k/n mit 1 ≤ k ≤ n, z. B. --shard=1/4.`);
    else shard = { k, n };
  }

  let concurrency = 2;
  if (werte.concurrency !== undefined) {
    const c = typeof werte.concurrency === "string" ? Number(werte.concurrency) : NaN;
    if (!Number.isInteger(c) || c < 1 || c > 3) fehler.push(`--concurrency=${werte.concurrency === true ? "" : werte.concurrency} ist ungültig – erlaubt 1, 2 oder 3.`);
    else concurrency = c;
  }

  let animation = "an";
  if (werte.animation !== undefined) {
    if (werte.animation !== "an" && werte.animation !== "aus") fehler.push(`--animation=${werte.animation === true ? "" : werte.animation} ist ungültig – erlaubt an oder aus.`);
    else animation = werte.animation;
  }

  const pfadListe = liste("paths")?.map((p) => (p.startsWith("/") ? p : `/${p}`)) ?? null;
  /** @type {string[] | null} */
  let pfade = pfadListe;
  /** @type {string[] | null} */
  let webkitPfade = pfadListe;
  if (sitemapPfade) {
    const erlaubt = [...new Set([...sitemapPfade, STYLEGUIDE, NICHT_GEFUNDEN])];
    if (pfadListe) {
      for (const p of pfadListe.filter((x) => !erlaubt.includes(x)))
        fehler.push(`Pfad ${p} steht nicht in der Sitemap – nichts geprüft.${MSYS.test(p) ? MSYS_HINWEIS : ""}`);
    } else {
      pfade = erlaubt;
      for (const p of WEBKIT_VORLAGEN.filter((x) => !erlaubt.includes(x)))
        fehler.push(`WebKit-Vorlage ${p} steht nicht in der Sitemap – Vorlagenliste in a11y-audit-core.mjs anpassen.`);
      webkitPfade = WEBKIT_VORLAGEN;
    }
  }

  if (fehler.length) return { fehler };
  return { pfade, webkitPfade, breiten, engines, shard, concurrency, animation, merge };
}

/** @param {string} a @param {string} b */
const vergleich = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

/**
 * Prüfmatrix (Engine, Breite, Pfad), deterministisch sortiert: Engine, dann Breite numerisch, dann Pfad.
 * @param {{ pfade: string[], breiten: number[], engines: string[], webkitPfade?: string[] | null }} opts
 * @returns {{ engine: string, breite: number, pfad: string }[]}
 */
export function matrix({ pfade, breiten, engines, webkitPfade }) {
  const liste = engines.flatMap((engine) =>
    [...new Set(engine === "webkit" && webkitPfade ? webkitPfade : pfade)].flatMap((pfad) => [...new Set(breiten)].map((breite) => ({ engine, breite, pfad }))),
  );
  return liste.sort((x, y) => vergleich(x.engine, y.engine) || x.breite - y.breite || vergleich(x.pfad, y.pfad));
}

/**
 * Teil k von n einer Liste: Indizes mit `i % n === k - 1`.
 * @template T
 * @param {T[]} liste
 * @param {number} k
 * @param {number} n
 * @returns {T[]}
 */
export function teil(liste, k, n) {
  return liste.filter((_, i) => i % n === k - 1);
}

/**
 * Erwarteter HTTP-Status je Pfad (K-10).
 * @param {string} pfad
 * @returns {number}
 */
export function erwarteterStatus(pfad) {
  return pfad === NICHT_GEFUNDEN || pfad === "/gibt-es-nicht" ? 404 : 200;
}

/**
 * @typedef {{ id: string, impact?: string | null, help?: string, nodes: { target: unknown[], html?: string, failureSummary?: string, any?: { data?: any }[] }[] }} AxeRegel
 * @typedef {{ regel: string, wirkung: string, selektor: string, text: string, verhaeltnis?: number | null }} AxeBefund
 */

/** @param {unknown[]} target */
const selektorVon = (target) => target.map((t) => (Array.isArray(t) ? t.join(" >>> ") : String(t))).join(" ");

/**
 * Bewertet ein axe-Ergebnis nach D-06: Gate = `color-contrast` und `target-size` jeder Wirkung sowie alle Verstöße
 * mit Wirkung `serious`/`critical` außer `color-contrast-enhanced`; Großtext = Knoten aus `color-contrast-enhanced`
 * mit erwartetem Verhältnis 4.5:1 (7:1 ist kein Gate); übrige `moderate`/`minor` als Zähler je Regel.
 * @param {{ violations: AxeRegel[], incomplete?: AxeRegel[] }} result
 * @returns {{ gate: AxeBefund[], grossText: AxeBefund[], uebrige: Record<string, Record<string, number>>, unvollstaendigKontrast: number, unvollstaendigStellen: string[] }}
 */
export function bewerteAxe(result) {
  /** @type {AxeBefund[]} */
  const gate = [];
  /** @type {AxeBefund[]} */
  const grossText = [];
  /** @type {Record<string, Record<string, number>>} */
  const uebrige = {};
  for (const v of result.violations ?? []) {
    const wirkung = v.impact ?? "unbekannt";
    if (v.id === "color-contrast-enhanced") {
      for (const n of v.nodes)
        if (n.any?.[0]?.data?.expectedContrastRatio === "4.5:1")
          grossText.push({ regel: v.id, wirkung, selektor: selektorVon(n.target), text: n.failureSummary ?? v.help ?? "", verhaeltnis: n.any?.[0]?.data?.contrastRatio ?? null });
      continue;
    }
    if (v.id === "color-contrast" || v.id === "target-size" || wirkung === "serious" || wirkung === "critical") {
      for (const n of v.nodes) gate.push({ regel: v.id, wirkung, selektor: selektorVon(n.target), text: n.failureSummary ?? v.help ?? "" });
      continue;
    }
    uebrige[v.id] ??= {};
    uebrige[v.id][wirkung] = (uebrige[v.id][wirkung] ?? 0) + v.nodes.length;
  }
  const unvollstaendig = (result.incomplete ?? []).filter((v) => v.id === "color-contrast").flatMap((v) => v.nodes.map((n) => selektorVon(n.target)));
  return { gate, grossText, uebrige, unvollstaendigKontrast: unvollstaendig.length, unvollstaendigStellen: unvollstaendig };
}

/**
 * @typedef {Record<string, string> | null} StilEbene
 */

/** @param {string | undefined} w */
const breitePx = (w) => Number.parseFloat(w ?? "0") || 0;

/**
 * Fokusindikator gegen den Ruhezustand (10-UI-SPEC § 9.1, 10-RESEARCH Pattern 3). Beide Listen enthalten je Ebene
 * (Element und bis zu vier Vorfahren, je ohne Pseudo, `::before`, `::after`) die Werte aus `FOKUS_STIL` oder null.
 * Sichtbar heißt: Die Signatur unterscheidet sich, und mindestens eine geänderte Ebene hat im Fokus eine Outline
 * ungleich `none` mit Breite > 0, einen `box-shadow` ungleich `none` oder einen Wechsel von Rahmen- bzw. Hintergrundfarbe.
 * @param {StilEbene[]} ruhe
 * @param {StilEbene[]} aktiv
 * @returns {boolean}
 */
export function fokusSichtbar(ruhe, aktiv) {
  const laenge = Math.max(ruhe.length, aktiv.length);
  for (let i = 0; i < laenge; i++) {
    const r = ruhe[i] ?? null;
    const a = aktiv[i] ?? null;
    if (!a) continue;
    const geaendert = !r || FOKUS_STIL.some((k) => r[k] !== a[k]);
    if (!geaendert) continue;
    const outline = a.outlineStyle !== "none" && breitePx(a.outlineWidth) > 0;
    const schatten = a.boxShadow !== "none" && (!r || r.boxShadow !== a.boxShadow);
    const farbe = !!r && (r.borderTopColor !== a.borderTopColor || r.backgroundColor !== a.backgroundColor);
    if (outline || schatten || farbe) return true;
  }
  return false;
}

/**
 * Fehlertexte des Tab-Durchlaufs (D-07, 10-UI-SPEC § 9.2). `kandidaten` sind die sichtbaren Bedienelemente vor dem
 * ersten Tab (Radiogruppen als ein Eintrag), `fokussiert` die IDs, die mindestens einmal den Fokus hatten.
 * @param {{ pfad: string, breite: number, kandidaten: { id: string, selektor: string }[], fokussiert: string[], schritte: number, falle?: boolean, ohneIndikator?: string[], unsichtbar?: string[], verdeckt?: string[] }} lauf
 * @returns {string[]}
 */
export function tastaturFehler({ pfad, breite, kandidaten, fokussiert, schritte, falle = false, ohneIndikator = [], unsichtbar = [], verdeckt = [] }) {
  const vor = `Tastatur ${pfad} @${breite}:`;
  const erreicht = new Set(fokussiert);
  const nie = kandidaten.filter((k) => !erreicht.has(k.id));
  /** @type {string[]} */
  const fehler = [];
  if (nie.length)
    fehler.push(
      `${vor} ${nie.length} Bedienelemente nie fokussiert (${nie
        .slice(0, 3)
        .map((k) => k.selektor)
        .join(", ")})`,
    );
  if (falle) fehler.push(`${vor} Tastaturfalle nach ${schritte} Schritten`);
  for (const s of new Set(ohneIndikator)) fehler.push(`${vor} kein sichtbarer Fokus an ${s}`);
  for (const s of new Set(unsichtbar)) fehler.push(`${vor} Fokus auf unsichtbarem Element ${s}`);
  for (const s of new Set(verdeckt)) fehler.push(`${vor} Fokus von der Kopfleiste verdeckt an ${s}`);
  return fehler;
}

/**
 * @typedef {{ aufrufe: number, gateVerstoesse: number, grossText: number, tastatur: number, statusFehler: number }} Zaehler
 */

/** @returns {Zaehler} */
const leer = () => ({ aufrufe: 0, gateVerstoesse: 0, grossText: 0, tastatur: 0, statusFehler: 0 });

/**
 * Führt Teilberichte zusammen und bewertet das Gesamtgate. Die Teile müssen genau 1..n abdecken.
 * Einzelbefunde tragen `engine`, `breite`, `pfad`, `regel` und `zustand` (`stabil` oder `animation`).
 * @param {any[]} teile Teilberichte `{ shard: { k, n } | null, aufrufe: [...] }`
 * @returns {{ seiten: number, aufrufe: number, animationsAufrufe: number, jeRegel: Record<string, Record<string, number>>, jeSeite: Record<string, Zaehler>, jeBreite: Record<string, Zaehler>, jeEngine: Record<string, Zaehler>, gateVerstoesse: any[], grossText: any[], tastatur: any[], statusFehler: any[], unvollstaendigKontrast: number, unvollstaendigStellen: any[], snippetSeiten: number, snippetPfade: string[], gate: boolean }}
 */
export function mergeReports(teile) {
  if (!teile.length) throw new Error("a11y-audit: keine Teilberichte");
  const shards = teile.map((t) => t.shard ?? { k: 1, n: 1 });
  const n = shards[0].n;
  if (shards.some((s) => s.n !== n)) throw new Error(`a11y-audit: Teilberichte mit unterschiedlicher Teilzahl (${[...new Set(shards.map((s) => s.n))].join(", ")})`);
  for (let k = 1; k <= n; k++) {
    const anzahl = shards.filter((s) => s.k === k).length;
    if (anzahl === 0) throw new Error(`a11y-audit: Teil ${k}/${n} fehlt`);
    if (anzahl > 1) throw new Error(`a11y-audit: Teil ${k}/${n} doppelt`);
  }
  const fremd = shards.find((s) => s.k < 1 || s.k > n);
  if (fremd) throw new Error(`a11y-audit: Teil ${fremd.k}/${n} ungültig`);

  /** @type {Record<string, Record<string, number>>} */
  const jeRegel = {};
  /** @type {Record<string, Zaehler>} */
  const jeSeite = {};
  /** @type {Record<string, Zaehler>} */
  const jeBreite = {};
  /** @type {Record<string, Zaehler>} */
  const jeEngine = {};
  /** @type {any[]} */
  const gateVerstoesse = [];
  /** @type {any[]} */
  const grossText = [];
  /** @type {any[]} */
  const tastatur = [];
  /** @type {any[]} */
  const statusFehler = [];
  /** @type {any[]} */
  const unvollstaendigStellen = [];
  const seiten = new Set();
  const snippetPfade = new Set();
  let aufrufe = 0;
  let animationsAufrufe = 0;
  let unvollstaendigKontrast = 0;

  /** @param {string} regel @param {string} wirkung @param {number} anzahl */
  const zaehle = (regel, wirkung, anzahl) => {
    jeRegel[regel] ??= {};
    jeRegel[regel][wirkung] = (jeRegel[regel][wirkung] ?? 0) + anzahl;
  };

  for (const t of teile)
    for (const a of t.aufrufe ?? []) {
      aufrufe++;
      seiten.add(a.pfad);
      const ort = { engine: a.engine, breite: a.breite, pfad: a.pfad };
      const ziele = [(jeSeite[a.pfad] ??= leer()), (jeBreite[String(a.breite)] ??= leer()), (jeEngine[a.engine] ??= leer())];
      /** @param {keyof Zaehler} feld @param {number} anzahl */
      const plus = (feld, anzahl) => {
        for (const z of ziele) z[feld] += anzahl;
      };
      plus("aufrufe", 1);

      const animGate = a.animation?.gate ?? [];
      if (a.animation) animationsAufrufe++;
      for (const g of a.gate ?? []) gateVerstoesse.push({ ...ort, ...g, zustand: "stabil" });
      for (const g of animGate) gateVerstoesse.push({ ...ort, ...g, zustand: "animation" });
      for (const g of [...(a.gate ?? []), ...animGate]) zaehle(g.regel, g.wirkung ?? "unbekannt", 1);
      plus("gateVerstoesse", (a.gate ?? []).length + animGate.length);

      for (const g of a.grossText ?? []) {
        grossText.push({ ...ort, ...g, zustand: "stabil" });
        zaehle(g.regel ?? "color-contrast-enhanced", g.wirkung ?? "unbekannt", 1);
      }
      plus("grossText", (a.grossText ?? []).length);

      for (const [regel, wirkungen] of Object.entries(a.uebrige ?? {}))
        for (const [wirkung, anzahl] of Object.entries(/** @type {Record<string, number>} */ (wirkungen))) zaehle(regel, wirkung, anzahl);

      for (const fehler of a.tastatur ?? []) tastatur.push({ ...ort, regel: "tastatur", fehler, zustand: "stabil" });
      plus("tastatur", (a.tastatur ?? []).length);

      const erwartet = a.erwartet ?? erwarteterStatus(a.pfad);
      if (a.status !== erwartet) {
        statusFehler.push({ ...ort, regel: "status", erwartet, ist: a.status ?? null, fehler: a.fehler ?? null, zustand: "stabil" });
        plus("statusFehler", 1);
      }

      unvollstaendigKontrast += a.unvollstaendigKontrast ?? 0;
      for (const selektor of a.unvollstaendigStellen ?? []) unvollstaendigStellen.push({ ...ort, regel: "color-contrast", selektor, zustand: "stabil" });
      if (a.snippet) snippetPfade.add(a.pfad);
    }

  return {
    seiten: seiten.size,
    aufrufe,
    animationsAufrufe,
    jeRegel,
    jeSeite,
    jeBreite,
    jeEngine,
    gateVerstoesse,
    grossText,
    tastatur,
    statusFehler,
    unvollstaendigKontrast,
    unvollstaendigStellen,
    snippetSeiten: snippetPfade.size,
    snippetPfade: [...snippetPfade].sort(),
    gate: gateVerstoesse.length > 0 || grossText.length > 0 || tastatur.length > 0 || statusFehler.length > 0,
  };
}
