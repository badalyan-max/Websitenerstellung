// Reine Prüffunktionen für das Post-Build-SEO-Audit (scripts/seo-audit.mjs) und live-check.mjs.
// Kein Dateizugriff, kein Netz: Eingabe ist immer ein HTML-String bzw. bereits gelesene Daten.
// Regeln und Fehlertexte: .planning/phases/08-seo-und-ki-sichtbarkeit/08-UI-SPEC.md (Prüfmatrix,
// Copywriting Contract) und der Audit-Vertrag in 08-01-PLAN.md.

/** Seitenbezogene Regeln (je Sitemap-URL). `duplikate` und `prompts` sind sitewide und laufen im CLI. */
export const SEITEN_REGELN = [
  "title",
  "description",
  "h1",
  "keyword",
  "map",
  "breadcrumbs",
  "og",
  "faq-schema",
  "schema",
  "antwort",
];

export const TITEL_MAX = 60;
export const DESC_MIN = 120;
export const DESC_MAX = 155;
export const ANTWORT_MAX = 300;
export const OG_MAX_BYTES = 300 * 1024;

const laenge = (s) => Array.from(s).length;

export const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/** Inline-Elemente trennen keine Wörter (wie im Browser: „<span>HERO-Software</span>-Alternative“), andere Tags schon. */
const INLINE_TAG = /<\/?(?:span|a|strong|em|b|i|mark|abbr|code|small|sub|sup|wbr)\b[^>]*>/gi;
export const plain = (html) =>
  decode(html.replace(INLINE_TAG, "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) out[m[1].toLowerCase()] = decode(m[2]);
  return out;
}

/** Title, Description, H1-Texte, Canonical, og:image und twitter:image (Entities dekodiert, fehlend = null). */
export function headTags(html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => plain(m[1]));
  let description = null;
  let ogImage = null;
  let twitterImage = null;
  for (const m of html.matchAll(/<meta\b([^>]*)>/gi)) {
    const a = attrs(m[1]);
    if (a.content === undefined) continue;
    if (a.name === "description" && description === null) description = a.content;
    else if (a.property === "og:image" && ogImage === null) ogImage = a.content;
    else if (a.name === "twitter:image" && twitterImage === null) twitterImage = a.content;
  }
  let canonical = null;
  for (const m of html.matchAll(/<link\b([^>]*)>/gi)) {
    const a = attrs(m[1]);
    if (a.rel === "canonical" && a.href) {
      canonical = a.href;
      break;
    }
  }
  return { title: title ? plain(title[1]) : null, description, h1s, canonical, ogImage, twitterImage };
}

export function jsonLd(html) {
  const out = [];
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      // Ungültige Blöcke zählen nicht; die Prüfung schlägt dann über fehlende Typen fehl.
    }
  }
  return out;
}

/** Alle Objekte mit dem gesuchten @type (auch in @graph oder verschachtelt). */
export function findType(node, type, acc = []) {
  if (Array.isArray(node)) node.forEach((n) => findType(n, type, acc));
  else if (node && typeof node === "object") {
    const t = node["@type"];
    if (t === type || (Array.isArray(t) && t.includes(type))) acc.push(node);
    Object.values(node).forEach((v) => findType(v, type, acc));
  }
  return acc;
}

/** Keyword-Normalisierung (früher in tests/keyword-map.test.ts): Kleinschrift, Umlaute, ohne Leerzeichen/Bindestriche. */
export function norm(k) {
  return k
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[\s-]+/g, "");
}

/** Pfad ohne Origin, Query, Anker und abschließenden Schrägstrich („/“ für die Startseite). */
export function pfadVonUrl(url) {
  if (typeof url !== "string" || url === "") return null;
  let p = url;
  if (!url.startsWith("/")) {
    try {
      p = new URL(url).pathname;
    } catch {
      return null;
    }
  }
  p = p.split(/[?#]/)[0];
  return p.replace(/\/+$/, "") || "/";
}

/**
 * Sichtbare Brotkrumen: nav[aria-label="Brotkrumen"] (die alte „Brotkrümelnavigation“ der Rechner zählt nicht).
 * Glieder aus den li-Elementen; das aktuelle Glied (aria-current, ohne Link) erhält `currentPath`.
 * @param {string} html
 * @param {string | null} [currentPath]
 * @returns {{ count: number, items: { name: string, path: string | null }[] }}
 */
export function breadcrumbNav(html, currentPath = null) {
  const navs = [...html.matchAll(/<nav\b([^>]*)>([\s\S]*?)<\/nav>/gi)].filter((m) => attrs(m[1])["aria-label"] === "Brotkrumen");
  if (navs.length === 0) return { count: 0, items: [] };
  const items = [];
  for (const li of navs[0][2].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)) {
    const a = li[1].match(/<a\b([^>]*)>([\s\S]*?)<\/a>/i);
    if (a) {
      items.push({ name: plain(a[2]), path: pfadVonUrl(attrs(a[1]).href ?? "") });
      continue;
    }
    const cur = li[1].match(/<([a-z][\w-]*)\b[^>]*aria-current="page"[^>]*>([\s\S]*?)<\/\1>/i);
    if (cur) items.push({ name: plain(cur[2]), path: currentPath });
  }
  return { count: navs.length, items };
}

function schemaCrumbs(list, currentPath) {
  const elems = Array.isArray(list.itemListElement) ? list.itemListElement : [];
  return [...elems]
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((e) => {
      const item = e.item && typeof e.item === "object" ? e.item["@id"] ?? e.item.url : e.item;
      return { name: String(e.name ?? (e.item && typeof e.item === "object" ? e.item.name : "") ?? ""), path: pfadVonUrl(item) ?? currentPath };
    });
}

/** Entfernt aria-hidden-Elemente (Symbole wie „+“ gehören nicht zum sichtbaren Fragetext). */
const ohneVersteckt = (html) =>
  html
    .replace(/<([a-z][\w-]*)\b[^>]*aria-hidden="true"[^>]*\/>/gi, "")
    .replace(/<([a-z][\w-]*)\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/\1>/gi, "");

/** Schema-Fragen der FAQPage-Blöcke und welche davon nicht sichtbar (summary oder Überschrift) auf der Seite stehen. */
export function faqFragenSichtbar(html) {
  const fragen = findType(findType(jsonLd(html), "FAQPage"), "Question")
    .map((q) => String(q.name ?? "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const sichtbar = new Set(
    [...html.matchAll(/<(summary|h[2-4])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => plain(ohneVersteckt(m[2]))),
  );
  return { fragen, fehlend: fragen.filter((q) => !sichtbar.has(q)) };
}

const NAECHSTE_UEBERSCHRIFT = /<(h[1-6]|summary)\b/i;

/** Erster Absatz nach einer Überschrift, sofern er vor der nächsten Überschrift steht; sonst "". */
function antwortDanach(rest) {
  const p = /<p\b[^>]*>([\s\S]*?)<\/p>/i.exec(rest);
  if (!p) return "";
  const nextH = rest.search(NAECHSTE_UEBERSCHRIFT);
  if (nextH !== -1 && nextH < p.index) return "";
  return plain(p[1]);
}

function fragenMitAntwort(html, max) {
  const out = [];
  for (const m of html.matchAll(/<(h2|h3|summary)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const q = plain(ohneVersteckt(m[2]));
    if (!q.includes("?")) continue;
    const ans = antwortDanach(html.slice(m.index + m[0].length));
    const n = laenge(ans);
    const problem = !ans ? "keine Antwort direkt darunter" : n > max ? `Antwort ${n} > ${max}` : null;
    out.push({ q, laenge: n, problem });
  }
  return out;
}

/** Antwort zuerst: jede H2/H3/summary mit „?“ → erstes folgendes <p> vor der nächsten Überschrift, ≤ max Zeichen. */
export function answerFirstViolations(html, max = ANTWORT_MAX) {
  return fragenMitAntwort(html, max)
    .filter((f) => f.problem)
    .map(({ q, problem, laenge: n }) => ({ q, problem, laenge: n }));
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Prüft einen Prompt-Anker nach der Anker-Konvention (DESIGN-V2.md § 17):
 * Anker an <p> → dessen Text ≤ max; Anker an Frage-Überschrift → erstes folgendes <p> ≤ max;
 * Anker an Nicht-Frage-Überschrift (FAQ-H2) → alle Fragen bis zur nächsten H2 erfüllen die Antwortregel;
 * Anker an einem Wrapper → erste H2/H3 darin wie oben.
 */
export function anchorAnswer(html, id, max = ANTWORT_MAX) {
  const open = new RegExp(`<([a-zA-Z][\\w-]*)\\b[^>]*\\sid="${escapeRe(id)}"[^>]*>`).exec(html);
  if (!open) return { exists: false, ok: false, laenge: 0, problem: `Anker #${id} fehlt` };
  let tag = open[1].toLowerCase();
  let inner = html.slice(open.index + open[0].length);
  if (tag === "p") {
    const end = inner.search(/<\/p>/i);
    const n = laenge(plain(end === -1 ? "" : inner.slice(0, end)));
    const ok = n > 0 && n <= max;
    return { exists: true, ok, laenge: n, problem: ok ? null : n === 0 ? "Anker-Absatz ist leer" : `Antwort ${n} > ${max}` };
  }
  if (!/^h[1-6]$/.test(tag)) {
    const h = /<(h2|h3)\b[^>]*>/i.exec(inner);
    if (!h) return { exists: true, ok: false, laenge: 0, problem: `unter #${id} steht keine Überschrift` };
    tag = h[1].toLowerCase();
    inner = inner.slice(h.index + h[0].length);
  }
  const close = inner.search(new RegExp(`</${tag}>`, "i"));
  const text = plain(close === -1 ? "" : inner.slice(0, close));
  const rest = close === -1 ? inner : inner.slice(close + tag.length + 3);
  if (text.includes("?")) {
    const n = laenge(antwortDanach(rest));
    const ok = n > 0 && n <= max;
    return { exists: true, ok, laenge: n, problem: ok ? null : n === 0 ? "keine Antwort direkt darunter" : `Antwort ${n} > ${max}` };
  }
  const bisH2 = rest.search(/<h[12]\b/i);
  const fragen = fragenMitAntwort(bisH2 === -1 ? rest : rest.slice(0, bisH2), max);
  if (fragen.length === 0) return { exists: true, ok: false, laenge: 0, problem: `unter #${id} stehen keine Fragen` };
  const verstoss = fragen.find((f) => f.problem);
  const n = Math.max(...fragen.map((f) => f.laenge));
  return { exists: true, ok: !verstoss, laenge: n, problem: verstoss ? `Frage ‚${verstoss.q}‘: ${verstoss.problem}` : null };
}

const ZENTRAL_EXAKT = new Set(["/", "/preise", "/fakten-ueber-craftos", "/app", "/craft-ai", "/gobd"]);
const ZENTRAL_BAUM = ["/vergleich", "/funktionen"];

/** Zentrale Seiten nach D-09 (Antwort-zuerst-Regel). */
export function istZentral(path) {
  if (ZENTRAL_EXAKT.has(path)) return true;
  return ZENTRAL_BAUM.some((b) => path === b || path.startsWith(`${b}/`));
}

const istVergleich = (path) => path === "/vergleich" || path.startsWith("/vergleich/");

/**
 * route-audit „oldTrial“ (D-23): „14 Tage kostenlos/testen“ gilt als alte CraftOS-Testphase – außer auf
 * /vergleich und darunter, wo belegte Wettbewerberangaben stehen dürfen. Dort prüft ctaTestphaseFehler
 * stattdessen jeden CraftOS-CTA streng.
 */
export function istAlteTestphase(path, html) {
  if (istVergleich(path)) return false;
  return /14 Tage (kostenlos|testen)/i.test(html);
}

/**
 * CraftOS-CTAs (Elemente mit data-track="trial") müssen „{trialDays} Tage“ nennen und dürfen keine andere
 * Tageszahl enthalten. Liefert je fehlerhaftem CTA einen Fehlertext.
 * @param {string} html
 * @param {number} trialDays
 * @returns {string[]}
 */
export function ctaTestphaseFehler(html, trialDays) {
  const out = [];
  for (const m of html.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    if (attrs(m[2])["data-track"] !== "trial") continue;
    const text = plain(m[3]);
    const zahlen = [...text.matchAll(/(\d+)\s*-?\s*Tag/g)].map((z) => Number(z[1]));
    if (!zahlen.includes(trialDays) || zahlen.some((z) => z !== trialDays))
      out.push(`CTA „${text}“ nennt nicht genau ${trialDays} Tage – Testphase aus site.trialDays übernehmen.`);
  }
  return out;
}
const VERBOTENE_VERGLEICH_TYPEN = ["Product", "Review", "AggregateRating"];

export const antwortText = (q, path) =>
  `Antwort zuerst: Frage ‚${q}‘ auf ${path} hat keine Antwort ≤ ${ANTWORT_MAX} Zeichen direkt darunter – ersten Absatz kürzen oder vorziehen.`;

/**
 * Prüft eine gebaute Seite gegen die seitenbezogenen Regeln.
 * @param {{ path: string, html: string, mapEntry?: any, og?: { imInManifest: boolean, bytes: number | null } }} seite
 * @param {string[]} [regeln] Auswahl aus SEITEN_REGELN (Standard: alle)
 * @returns {{ regel: string, path: string, problem: string, detail?: string }[]}
 */
export function pruefeSeite({ path, html, mapEntry = null, og = { imInManifest: false, bytes: null } }, regeln = SEITEN_REGELN) {
  const aktiv = new Set(regeln);
  const out = [];
  const add = (regel, problem, detail) => out.push(detail ? { regel, path, problem, detail } : { regel, path, problem });
  const ist = headTags(html);
  const target = mapEntry?.target ?? null;

  if (aktiv.has("title")) {
    if (!ist.title) add("title", `Titel: ${path} hat keinen <title>.`);
    else if (laenge(ist.title) > TITEL_MAX)
      add("title", `Titel: ${path} hat ${laenge(ist.title)} Zeichen – höchstens ${TITEL_MAX}, Zielwert in docs/seo/keyword-map.json kürzen.`, ist.title);
  }

  if (aktiv.has("description")) {
    const n = ist.description === null ? 0 : laenge(ist.description);
    if (n < DESC_MIN || n > DESC_MAX)
      add("description", `Description: ${path} hat ${n} Zeichen – ${DESC_MIN} bis ${DESC_MAX} erforderlich.`, ist.description ?? undefined);
  }

  if (aktiv.has("h1") && ist.h1s.length !== 1) add("h1", `H1: ${path} hat ${ist.h1s.length} H1 – genau eine erforderlich.`);

  if (aktiv.has("keyword") && mapEntry?.primary?.keyword) {
    const kw = mapEntry.primary.keyword;
    if (!ist.title || !norm(ist.title).includes(norm(kw)))
      add("keyword", `Keyword: Titel von ${path} enthält das Hauptkeyword ‚${kw}‘ nicht.`, ist.title ?? undefined);
  }

  if (aktiv.has("map") && target) {
    if (target.title && ist.title !== target.title)
      add("map", `Keyword-Map: Titel von ${path} weicht vom Zielwert ab – „${target.title}“ erwartet.`, ist.title ?? undefined);
    if (target.h1 && ist.h1s.length === 1 && ist.h1s[0] !== target.h1)
      add("map", `Keyword-Map: H1 von ${path} weicht vom Zielwert ab – „${target.h1}“ erwartet.`, ist.h1s[0]);
    if (target.description && ist.description !== target.description)
      add("map", `Keyword-Map: Description von ${path} weicht vom Zielwert ab – „${target.description}“ erwartet.`, ist.description ?? undefined);
  }

  if (aktiv.has("breadcrumbs") && path !== "/") {
    const nav = breadcrumbNav(html, path);
    const lists = findType(jsonLd(html), "BreadcrumbList");
    if (nav.count !== 1)
      add("breadcrumbs", `Brotkrumen: ${path} hat ${nav.count} nav[aria-label="Brotkrumen"] – genau eine erforderlich.`);
    if (lists.length !== 1) add("breadcrumbs", `Brotkrumen: ${path} hat ${lists.length} BreadcrumbList – genau eine erforderlich.`);
    if (nav.count === 1 && lists.length === 1) {
      const fmt = (items) => items.map((i) => `${i.name} (${i.path})`).join(" › ");
      const sichtbar = fmt(nav.items);
      const schema = fmt(schemaCrumbs(lists[0], path));
      if (sichtbar !== schema)
        add("breadcrumbs", `Brotkrumen: Glieder von ${path} weichen vom Schema ab – Baustein und BreadcrumbList aus derselben Quelle erzeugen.`, `nav: ${sichtbar} | Schema: ${schema}`);
    }
  }

  if (aktiv.has("og") && path !== "/") {
    const ogPfad = pfadVonUrl(ist.ogImage);
    if (!ogPfad) add("og", `OG: ${path} hat kein og:image.`);
    else {
      if (ogPfad === "/opengraph-image" || !ogPfad.startsWith(`${path}/opengraph-image`))
        add("og", `OG: ${path} nutzt kein eigenes Bild (${ogPfad}) – opengraph-image im Segment anlegen.`);
      if (ist.twitterImage !== ist.ogImage)
        add("og", `OG: twitter:image von ${path} weicht von og:image ab – imagePath an pageMetadata übergeben.`, `${ist.twitterImage} ≠ ${ist.ogImage}`);
      if (!og.imInManifest) add("og", `OG: Bild von ${path} ist nicht statisch erzeugt (fehlt im prerender-manifest).`, ogPfad);
      else if (typeof og.bytes === "number" && og.bytes > OG_MAX_BYTES)
        add("og", `OG: ${path} ist ${Math.round(og.bytes / 1024)} KB – höchstens ${OG_MAX_BYTES / 1024} KB.`);
    }
  }

  if (aktiv.has("faq-schema"))
    for (const q of faqFragenSichtbar(html).fehlend)
      add("faq-schema", `FAQ-Schema: Frage ‚${q}‘ auf ${path} steht nicht sichtbar auf der Seite – Schema und FaqList aus demselben Array erzeugen.`);

  if (aktiv.has("schema") && istVergleich(path)) {
    const ld = jsonLd(html);
    for (const t of VERBOTENE_VERGLEICH_TYPEN)
      if (findType(ld, t).length > 0) add("schema", `Schema: ${path} enthält ${t} – auf Vergleichsseiten nicht erlaubt.`);
  }

  if (aktiv.has("antwort") && istZentral(path))
    for (const v of answerFirstViolations(html)) add("antwort", antwortText(v.q, path), v.problem);

  return out;
}

const DUP_FELDER = [
  ["title", "Titel"],
  ["description", "Description"],
  ["h1", "H1"],
];

/**
 * Doppelte Titel, Descriptions und H1-Texte, immer sitewide berechnet.
 * Mit `pfadFilter` werden nur Gruppen gemeldet, an denen mindestens ein gefilterter Pfad beteiligt ist.
 * @param {{ path: string, title: string | null, description: string | null, h1s: string[] }[]} seiten
 * @param {string[] | null} [pfadFilter]
 */
export function duplikate(seiten, pfadFilter = null) {
  const filter = pfadFilter ? new Set(pfadFilter) : null;
  const out = [];
  for (const [feld, label] of DUP_FELDER) {
    const gruppen = new Map();
    for (const s of seiten) {
      const werte = feld === "h1" ? s.h1s ?? [] : [s[feld]];
      for (const w of new Set(werte)) {
        if (!w) continue;
        if (!gruppen.has(w)) gruppen.set(w, new Set());
        gruppen.get(w).add(s.path);
      }
    }
    for (const [wert, pfadSet] of gruppen) {
      const pfade = [...pfadSet];
      if (pfade.length < 2) continue;
      if (filter && !pfade.some((p) => filter.has(p))) continue;
      for (const p of pfade)
        out.push({
          regel: "duplikate",
          path: p,
          problem: `Duplikat: ${label} „${wert}“ steht auch auf ${pfade.filter((o) => o !== p).join(", ")} – eindeutig formulieren.`,
        });
    }
  }
  return out;
}

/**
 * Prüft die Aufrufoptionen von scripts/seo-audit.mjs (08-REVIEW ME-05): Eine unbekannte Regel in `--only`, eine
 * leere Regelliste oder ein Pfad in `--paths`, der nicht in der Sitemap steht, ist ein Fehler – sonst meldet das
 * Audit „0 Verstöße“, ohne etwas geprüft zu haben. Git Bash (MSYS) schreibt Argumente wie `--paths=/preise` zu
 * `C:/Program Files/Git/preise` um; dafür nennt die Meldung `MSYS_NO_PATHCONV=1`.
 * @param {{ only: string[] | null, paths: string[] | null, alleRegeln: readonly string[], alleSeiten: readonly string[] }} opts
 * @returns {string[]} Fehlertexte (leer = Optionen in Ordnung)
 */
export function optionsFehler({ only, paths, alleRegeln, alleSeiten }) {
  const fehler = [];
  if (only) {
    if (only.length === 0) fehler.push(`--only ohne Regel – bekannt: ${alleRegeln.join(", ")}.`);
    for (const r of only.filter((x) => !alleRegeln.includes(x)))
      fehler.push(`Regel ‚${r}‘ ist unbekannt – bekannt: ${alleRegeln.join(", ")}.`);
  }
  if (paths) {
    if (paths.length === 0) fehler.push("--paths ohne Pfad.");
    for (const p of paths.filter((x) => !alleSeiten.includes(x))) {
      const msys = /^\/?[A-Za-z]:[\\/]/.test(p)
        ? " Der Pfad wurde offenbar von Git Bash umgeschrieben – Aufruf mit MSYS_NO_PATHCONV=1 wiederholen."
        : "";
      fehler.push(`Pfad ${p} steht nicht in der Sitemap – nichts geprüft.${msys}`);
    }
  }
  return fehler;
}

/**
 * Regel `prompts` (08 D-10, D-18): Mapping-Ziele aus docs/seo/ai-prompts-targets.json im Build prüfen.
 * Ziele bis Phase 8: Seite gebaut, Anker-id vorhanden, Antwort darunter ≤ 300 (anchorAnswer). Phase-9-Ziele:
 * nur Existenz der Seite. Mit `pfadFilter` werden nur Ziele geprüft, deren Pfad (ohne Anker) im Filter steht.
 * @param {{ prompts: { target: string, phase: number, prompt?: string }[] } | { target: string, phase: number }[]} mapping
 * @param {(path: string) => string | null} getHtml
 * @param {string[] | null} [pfadFilter]
 * @returns {{ regel: string, path: string, problem: string }[]}
 */
export function promptVerstoesse(mapping, getHtml, pfadFilter = null) {
  const eintraege = Array.isArray(mapping) ? mapping : mapping.prompts ?? [];
  const filter = pfadFilter ? new Set(pfadFilter) : null;
  const out = [];
  // LO-07: je Ziel die strengste (kleinste) Phase, unabhängig von der Reihenfolge im Mapping.
  const minPhase = new Map();
  for (const e of eintraege) minPhase.set(e.target, Math.min(minPhase.get(e.target) ?? Infinity, e.phase));
  for (const [target, phase] of minPhase) {
    const e = { target, phase };
    const [pfadRoh, anker] = e.target.split("#");
    const pfad = pfadRoh || "/";
    if (filter && !filter.has(pfad)) continue;
    const add = (problem) => out.push({ regel: "prompts", path: pfad, problem });
    const html = getHtml(pfad);
    if (html === null || html === undefined) {
      add(`Prompt-Ziel ${e.target} fehlt im Build`);
      continue;
    }
    if (e.phase >= 9) continue;
    if (!anker) {
      add(`Prompt-Ziel ${e.target} hat keinen Anker – Ziel nach DESIGN-V2.md § 17 mit #id angeben.`);
      continue;
    }
    const r = anchorAnswer(html, anker);
    if (!r.exists) add(`Prompt-Ziel ${e.target}: Anker #${anker} fehlt – id laut DESIGN-V2.md § 17 ergänzen.`);
    else if (!r.ok) add(`Prompt-Ziel ${e.target}: ${r.problem} – Antwort zuerst (≤ ${ANTWORT_MAX} Zeichen) direkt unter dem Anker.`);
  }
  return out;
}
