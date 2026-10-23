#!/usr/bin/env node
/**
 * Paketprüfung der Phase-9-Inhalte (09-15, D-11, W4; Muster aus 09-RESEARCH „Prüfskript-Muster“).
 *
 *   node scripts/content-pruefen.mjs [--ausnahmen <prüfdatei>] [--zitate] [--l1] [--antwort] <dateien…>
 *
 * --zitate     Jedes Zitat in „…“ muss in einem Nutzer-Oberflächentext des eingefrorenen Release stehen (09-REVIEW
 *              HI-01, scripts/lib/zitat-belege.mjs): JSX-Text, String-Literal einer Quelldatei oder Wert einer
 *              deutschen Sprachdatei; Web-Commit in `src` und `supabase/functions`, Mobile-Commit in `src`.
 *              Kommentare, JSDoc, Modulpfade, Tests, Mocks, Fixtures und Stories zählen nicht. Ein Menüpfad
 *              „A → B“ ist belegt, wenn jedes Segment innerhalb einer App ein ganzes Label ist (oder der Pfad als
 *              Ganzes in einem Text steht). Die Commits stehen in docs/product-source-snapshot.json (`basis`).
 *              Begriffe unter 4 Zeichen sind nur ein Hinweis (09-RESEARCH Pitfall 2: Substring-Treffer belegen nichts).
 *              GRENZE: Grün heißt „der Text steht in der Oberfläche“, nicht „der Kunde erreicht die Stelle“. Rolle,
 *              Lizenz, Entwickler-Freischaltung und Feature-Flags prüft das Skript nicht. Es meldet nur per
 *              Datei-Heuristik einen Hinweis, wenn alle Belegdateien isDeveloper/usePlatformDeveloper/Feature-Abfragen
 *              enthalten (Sprachdateien und Rollen-Sperren erkennt die Heuristik nicht). Die Erreichbarkeit bleibt
 *              Teil der manuellen Prüfdatei (docs/content-pruefung/09-*.md, Spalte „Belegpfade“).
 * --ausnahmen  Begriffe aus dem Abschnitt „Zitat-Ausnahmen“ der Paket-Prüfdatei (`- „Begriff“ – Begründung`) sind
 *              von --zitate ausgenommen. Zeilen ohne Begründung gelten nicht. Fehlt Datei oder Abschnitt: keine Ausnahmen.
 * --l1         Wörter und Altbegriffe der Leitlinie L-1 aus lib/leitlinie-l1.json (ohne Übergangsliste), Ausnahmen
 *              laut JSON. Markdown zeilenweise; .ts-Dateien nur über String-Literale (scripts/lib/ts-literale.mjs).
 * --antwort    Frontmatter `answer` ≤ 300 Zeichen; unter jeder H2/H3 mit „?“ ist der erste Absatz ≤ 300 Zeichen.
 * --belege     Zusatz zu --zitate: nennt je belegtem Begriff bis zu drei Release-Dateien (für die Spalte „Belegpfade“
 *              der Prüfdatei, D-11). Ein Treffer in einer fremden Ansicht ist kein Beleg für den beschriebenen Ablauf.
 *
 * Ohne Prüfschalter laufen alle drei Prüfungen. Ausgabe je Zeile `datei: befund`, Hinweise mit „Hinweis:“.
 * Exitcode 1 bei mindestens einem Befund, 2 bei Bedienfehlern. Das Skript liest nur Dateien und Git-Objekte
 * (kein Fetch, kein Checkout) und schreibt nichts (T-09-36).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { stringLiterale } from "./lib/ts-literale.mjs";
import { FREISCHALTUNG, istUiQuelle, normalisiert, OHNE_NICHT_UI, uiTexte, zitatBelegt, zitateAus } from "./lib/zitat-belege.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SNAPSHOT = path.join(ROOT, "docs/product-source-snapshot.json");
const LEITLINIE = path.join(ROOT, "lib/leitlinie-l1.json");
const REPOS = {
  web: process.env.CRAFTOS_WEB_REPO || "C:/Projekte/craft-connect-buddy",
  mobile: process.env.CRAFTOS_MOBILE_REPO || "C:/Projekte/CraftOS - Mobile/craftos-mobile",
};
const ANTWORT_MAX = 300;
const KURZ_UNTER = 4;

const laenge = (s) => Array.from(s).length;
const rel = (datei) => path.relative(process.cwd(), path.resolve(datei)).split(path.sep).join("/");

// ---------------------------------------------------------------- Argumente

function argumente(argv) {
  const opt = { zitate: false, l1: false, antwort: false, belege: false, ausnahmen: null, dateien: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--zitate") opt.zitate = true;
    else if (a === "--belege") opt.belege = opt.zitate = true;
    else if (a === "--l1") opt.l1 = true;
    else if (a === "--antwort") opt.antwort = true;
    else if (a === "--ausnahmen") {
      opt.ausnahmen = argv[++i];
      if (!opt.ausnahmen) bedienfehler("--ausnahmen braucht den Pfad der Prüfdatei");
    } else if (a.startsWith("--")) bedienfehler(`unbekannter Schalter ${a}`);
    else opt.dateien.push(a);
  }
  if (!opt.dateien.length) bedienfehler("keine Dateien angegeben");
  if (!opt.zitate && !opt.l1 && !opt.antwort) opt.zitate = opt.l1 = opt.antwort = true;  return opt;
}

function bedienfehler(text) {
  console.error(`content-pruefen: ${text}`);
  console.error("Aufruf: node scripts/content-pruefen.mjs [--ausnahmen <prüfdatei>] [--zitate] [--l1] [--antwort] <dateien…>");
  process.exit(2);
}

// ---------------------------------------------------------------- Ausgabe

const befunde = [];
const hinweise = [];
const befund = (datei, text) => befunde.push(`${datei}: ${text}`);
const hinweis = (datei, text) => hinweise.push(`${datei}: Hinweis: ${text}`);
const belegZeilen = [];

// ---------------------------------------------------------------- Zitat-Ausnahmen

/** Begriffe aus „## Zitat-Ausnahmen“ einer Prüfdatei; nur Zeilen `- „Begriff“ – Begründung`. */
function zitatAusnahmen(pruefdatei) {
  const out = new Set();
  if (!pruefdatei) return out;
  if (!fs.existsSync(pruefdatei)) {
    hinweis(rel(pruefdatei), "Prüfdatei fehlt – keine Zitat-Ausnahmen");
    return out;
  }
  const zeilen = fs.readFileSync(pruefdatei, "utf8").split(/\r?\n/);
  const start = zeilen.findIndex((z) => /^#{2,3}\s+Zitat-Ausnahmen\s*$/.test(z));
  if (start === -1) {
    hinweis(rel(pruefdatei), "Abschnitt „Zitat-Ausnahmen“ fehlt – keine Zitat-Ausnahmen");
    return out;
  }
  for (const z of zeilen.slice(start + 1)) {
    if (/^#{1,3}\s/.test(z)) break;
    if (!/^\s*[-*]\s+„/.test(z)) continue;
    const m = /^\s*[-*]\s+„([^“]+)“\s*[–—-]\s*(\S.*)$/.exec(z);
    if (m) out.add(m[1].trim());
    else hinweis(rel(pruefdatei), `Ausnahme ohne Begründung gilt nicht: ${z.trim()}`);
  }
  return out;
}

// ---------------------------------------------------------------- Release-Suche

function git(repo, args, input) {
  return execFileSync("git", ["-C", repo, ...args], {
    ...(input === undefined ? { encoding: "utf8" } : {}),
    input,
    maxBuffer: 1 << 28,
    stdio: ["pipe", "pipe", "pipe"],
  });
}

function releaseQuellen() {
  const snap = JSON.parse(fs.readFileSync(SNAPSHOT, "utf8"));
  if (!snap.basis?.web?.commit || !snap.basis?.mobile?.commit)
    throw new Error("docs/product-source-snapshot.json ohne basis.web/basis.mobile");
  const quellen = [];
  for (const k of ["web", "mobile"]) {
    const { commit } = snap.basis[k];
    try {
      git(REPOS[k], ["cat-file", "-e", `${commit}^{commit}`]);
    } catch {
      throw new Error(`${k}: Commit ${commit.slice(0, 8)} in ${REPOS[k]} nicht vorhanden`);
    }
    const pfade = k === "web" ? ["src", "supabase/functions", ...OHNE_NICHT_UI] : ["src", ...OHNE_NICHT_UI];
    quellen.push({ name: k, repo: REPOS[k], commit, pfade, cache: new Map() });
  }
  return quellen;
}

/** Release-Dateien (Nutzer-Oberfläche), deren Rohtext mindestens einen der Begriffe enthält. */
function kandidaten(quelle, begriffe) {
  const dateien = new Set();
  const liste = [...begriffe];
  for (let i = 0; i < liste.length; i += 150) {
    const teil = liste.slice(i, i + 150);
    try {
      const out = git(quelle.repo, ["grep", "-F", "-l", "-I", ...teil.flatMap((b) => ["-e", b]), quelle.commit, "--", ...quelle.pfade]);
      for (const z of out.split(/\r?\n/)) {
        const pfad = z.slice(quelle.commit.length + 1);
        if (z && istUiQuelle(pfad)) dateien.add(pfad);
      }
    } catch (e) {
      if (e.status !== 1) throw e;
    }
  }
  return [...dateien];
}

/** Lädt Dateien eines Commits über `git cat-file --batch` und legt Oberflächentexte und Freischaltung im Cache ab. */
function laden(quelle, pfade) {
  const fehlend = pfade.filter((p) => !quelle.cache.has(p));
  if (!fehlend.length) return;
  const out = git(quelle.repo, ["cat-file", "--batch"], fehlend.map((p) => `${quelle.commit}:${p}`).join("\n") + "\n");
  let pos = 0;
  for (const pfad of fehlend) {
    const nl = out.indexOf(10, pos);
    const kopf = out.subarray(pos, nl).toString("utf8");
    pos = nl + 1;
    const m = /^\S+ blob (\d+)$/.exec(kopf);
    if (!m) {
      quelle.cache.set(pfad, { texte: [], gesperrt: false });
      continue;
    }
    const groesse = Number(m[1]);
    const inhalt = out.subarray(pos, pos + groesse).toString("utf8");
    pos += groesse + 1;
    quelle.cache.set(pfad, { texte: uiTexte(pfad, inhalt), gesperrt: FREISCHALTUNG.test(inhalt) });
  }
}

/**
 * Release-Dateien, deren Oberflächentexte das Zitat belegen (`web:<pfad>` bzw. `mobile:<pfad>`). Ein Menüpfad muss
 * innerhalb einer App (Web oder Mobile) belegt sein; seine Segmente dürfen in verschiedenen Dateien stehen.
 */
function belegeFuer(quellen, kandidatenJeQuelle, zitat) {
  const out = [];
  for (const q of quellen) {
    const pfade = kandidatenJeQuelle.get(q.name);
    const alle = pfade.flatMap((p) => q.cache.get(p).texte);
    if (!zitatBelegt(zitat, alle)) continue;
    const label = (t, texte) => texte.some((x) => normalisiert(x) === normalisiert(t));
    const traegt = (texte) => zitatBelegt(zitat, texte) || (zitat.teile.length > 1 && zitat.teile.some((t) => label(t, texte)));
    for (const pfad of pfade) {
      const eintrag = q.cache.get(pfad);
      if (traegt(eintrag.texte)) out.push({ beleg: `${q.name}:${pfad}`, gesperrt: eintrag.gesperrt });
    }
  }
  return out;
}

// ---------------------------------------------------------------- Texte je Datei

function textFuerZitate(datei, inhalt) {
  return datei.endsWith(".ts") ? stringLiterale(inhalt).join("\n") : inhalt;
}

function pruefeZitate(dateien, ausnahmen, mitBelegen) {
  const jeDatei = new Map();
  const begriffe = new Set();
  for (const { datei, inhalt } of dateien) {
    const zitate = zitateAus(textFuerZitate(datei, inhalt)).filter((z) => !ausnahmen.has(z.ganz));
    jeDatei.set(datei, zitate);
    for (const z of zitate) {
      begriffe.add(z.ganz);
      for (const t of z.teile) begriffe.add(t);
    }
  }
  if (!begriffe.size) return;
  const quellen = releaseQuellen();
  const kandidatenJeQuelle = new Map();
  for (const q of quellen) {
    const k = kandidaten(q, begriffe);
    laden(q, k);
    kandidatenJeQuelle.set(q.name, k);
  }
  const stand = quellen.map((q) => `${q.name === "web" ? "Web" : "Mobile"} ${q.commit.slice(0, 8)}`).join(", ");
  for (const [datei, zitate] of jeDatei) {
    const gemeldet = new Set();
    for (const z of zitate) {
      if (gemeldet.has(z.ganz)) continue;
      gemeldet.add(z.ganz);
      // Menüpfad: Segmente, die selbst als Ausnahme geführt sind, gelten als Label
      const pruef = { ganz: z.ganz, teile: z.teile.filter((t) => !ausnahmen.has(t)) };
      if (z.teile.length > 1 && !pruef.teile.length) continue;
      if (z.teile.length <= 1 && laenge(z.ganz) < KURZ_UNTER) {
        const da = belegeFuer(quellen, kandidatenJeQuelle, z).length > 0;
        hinweis(datei, `kurzer Begriff „${z.ganz}“ (unter ${KURZ_UNTER} Zeichen) ${da ? "kommt vor, belegt aber nichts" : "nicht gefunden"} – Navigationsquelle lesen`);
        continue;
      }
      const belege = belegeFuer(quellen, kandidatenJeQuelle, z.teile.length > 1 ? pruef : z);
      if (!belege.length) {
        const art = z.teile.length > 1 ? "Menüpfad (jedes Segment als ganzes Label)" : "Zitat";
        befund(datei, `${art} „${z.ganz}“ nicht in einem Oberflächentext des Release (${stand})`);
        continue;
      }
      // Heuristik: Alle Fundstellen der App-Oberfläche (src/, ohne Edge Functions) lesen eine Freischaltung
      const oberflaeche = belege.filter((b) => /^(web|mobile):src\//.test(b.beleg));
      if (oberflaeche.length && oberflaeche.every((b) => b.gesperrt))
        hinweis(datei, `„${z.ganz}“ nur in Dateien mit Entwickler- oder Feature-Abfrage belegt (${belege.map((b) => b.beleg).slice(0, 3).join(", ")}) – Erreichbarkeit prüfen`);
      if (mitBelegen) {
        const liste = belege.map((b) => b.beleg);
        const kurz = liste.length > 3 ? [...liste.slice(0, 3), `… (${liste.length} Dateien)`] : liste;
        belegZeilen.push(`${datei}: Beleg „${z.ganz}“ → ${kurz.join(", ")}`);
      }
    }
  }
}

// ---------------------------------------------------------------- Leitlinie L-1

function leitlinie() {
  const json = JSON.parse(fs.readFileSync(LEITLINIE, "utf8"));
  const woerter = [...json.woerter, ...json.altbegriffe];
  const escape = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  const muster = woerter.map((wort) => ({ wort, re: new RegExp(`(?<![\\p{L}\\p{N}_])${escape(wort)}(?![\\p{L}\\p{N}_])`, "iu") }));
  const treffer = (text) => muster.filter(({ re }) => re.test(text)).map(({ wort }) => wort);
  const ausnahme = (id) => json.ausnahmen.find((a) => a.id === id);
  return { json, woerter, treffer, gaeb: ausnahme("gaeb-formate-fachteil"), pflicht: ausnahme("pflichthinweise") };
}

function ohnePflichthinweise(text, pflicht) {
  let out = text;
  for (const t of pflicht?.texte ?? []) out = out.split(t).join(" ");
  return out;
}

/**
 * Zeilen des neutralen GAEB-Fachteils als Menge von Zeilenindizes: H2-Abschnitte unter einer Frage-Überschrift ohne
 * Produktbezug (Muster `produktbezug` aus lib/leitlinie-l1.json; 09-REVIEW LO-10).
 */
function gaebFachteilZeilen(zeilen, gaeb) {
  const aus = new Set();
  const bezug = new RegExp(gaeb.produktbezug, "i");
  let start = -1;
  const abschliessen = (ende) => {
    if (start === -1) return;
    const abschnitt = zeilen.slice(start, ende);
    const frage = abschnitt[0].trim().endsWith("?");
    if (frage && !abschnitt.some((z) => bezug.test(z))) for (let i = start; i < ende; i++) aus.add(i);
  };
  zeilen.forEach((z, i) => {
    if (/^## /.test(z)) {
      abschliessen(i);
      start = i;
    }
  });
  abschliessen(zeilen.length);
  return aus;
}

function pruefeL1(dateien) {
  const l1 = leitlinie();
  for (const { datei, inhalt } of dateien) {
    if (datei.endsWith(".ts")) {
      // Jedes Literal ist möglicher Seitentext, auch ein einzelnes Leitlinienwort (09-REVIEW ME-04): Die einzige
      // Wortliste ist lib/leitlinie-l1.json, wie in tests/content-produktwahrheit.test.ts.
      for (const lit of stringLiterale(inhalt)) {
        for (const wort of l1.treffer(ohnePflichthinweise(lit, l1.pflicht))) {
          const pos = inhalt.indexOf(lit);
          const zeile = pos === -1 ? null : inhalt.slice(0, pos).split("\n").length;
          const auszug = laenge(lit) > 80 ? `${Array.from(lit).slice(0, 77).join("")}…` : lit;
          befund(datei, `L-1 „${wort}“${zeile ? ` (Z. ${zeile})` : ""} in „${auszug}“`);
        }
      }
      continue;
    }
    const zeilen = inhalt.split(/\r?\n/);
    const aus = l1.gaeb && datei.endsWith(l1.gaeb.datei) ? gaebFachteilZeilen(zeilen, l1.gaeb) : new Set();
    const inZeile = new Set();
    zeilen.forEach((z, i) => {
      if (aus.has(i)) return;
      for (const wort of l1.treffer(ohnePflichthinweise(z, l1.pflicht))) {
        inZeile.add(wort);
        befund(datei, `L-1 „${wort}“ (Z. ${i + 1})`);
      }
    });
    // Mehrwortbegriffe über einen Zeilenumbruch hinweg
    const gesamt = zeilen.filter((_, i) => !aus.has(i)).join("\n");
    for (const wort of l1.treffer(ohnePflichthinweise(gesamt, l1.pflicht)))
      if (!inZeile.has(wort)) befund(datei, `L-1 „${wort}“ (über einen Zeilenumbruch)`);
  }
}

// ---------------------------------------------------------------- Antwort zuerst

/** Markdown-Absatz als reiner Text (wie die gerenderte Seite ihn zählt). */
function klartext(md) {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/(\*\*|__|\*|_|`)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const LISTE_ODER_TABELLE = /^\s*([-*+]\s|\d+[.)]\s|\||```|~~~|<!--)/;

/** Erster Absatz nach Zeile `ab` bis zur nächsten Überschrift; Listen, Tabellen und Codeblöcke zählen nicht. */
function ersterAbsatz(zeilen, ab) {
  let block = [];
  let imCode = false;
  for (let i = ab; i < zeilen.length; i++) {
    const z = zeilen[i];
    if (/^\s*(```|~~~)/.test(z)) {
      imCode = !imCode;
      block = [];
      continue;
    }
    if (imCode) continue;
    if (/^#{1,6}\s/.test(z)) return block.length ? block.join(" ") : "";
    if (!z.trim()) {
      if (block.length) return block.join(" ");
      continue;
    }
    if (!block.length && LISTE_ODER_TABELLE.test(z)) {
      // Block überspringen
      while (i + 1 < zeilen.length && zeilen[i + 1].trim() && !/^#{1,6}\s/.test(zeilen[i + 1])) i++;
      continue;
    }
    block.push(z.replace(/^\s*>\s?/, ""));
  }
  return block.join(" ");
}

function pruefeAntwort(dateien) {
  for (const { datei, inhalt } of dateien) {
    if (!datei.endsWith(".md")) {
      hinweis(datei, "--antwort prüft nur Markdown-Dateien");
      continue;
    }
    const { data, content } = matter(inhalt);
    if (typeof data.answer === "string") {
      const n = laenge(data.answer.trim());
      if (n > ANTWORT_MAX) befund(datei, `answer ${n} > ${ANTWORT_MAX}`);
    } else hinweis(datei, "kein Frontmatter „answer“ (Pflicht ab 09-09)");
    const zeilen = content.split(/\r?\n/);
    let imCode = false;
    zeilen.forEach((z, i) => {
      if (/^\s*(```|~~~)/.test(z)) imCode = !imCode;
      if (imCode) return;
      const h = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(z);
      if (!h) return;
      const frage = klartext(h[2]);
      if (!frage.includes("?")) return;
      const antwort = klartext(ersterAbsatz(zeilen, i + 1));
      const n = laenge(antwort);
      if (!n) befund(datei, `„${frage}“: keine Antwort direkt darunter`);
      else if (n > ANTWORT_MAX) befund(datei, `„${frage}“: Antwort ${n} > ${ANTWORT_MAX}`);
    });
  }
}

// ---------------------------------------------------------------- Ablauf

const opt = argumente(process.argv.slice(2));
const dateien = [];
for (const d of opt.dateien) {
  const name = rel(d);
  if (!fs.existsSync(d)) {
    befund(name, "Datei fehlt");
    continue;
  }
  dateien.push({ datei: name, inhalt: fs.readFileSync(d, "utf8") });
}
try {
  if (opt.zitate) pruefeZitate(dateien, zitatAusnahmen(opt.ausnahmen), opt.belege);
  if (opt.l1) pruefeL1(dateien);
  if (opt.antwort) pruefeAntwort(dateien);
} catch (e) {
  console.error(`content-pruefen: ${e.message}`);
  process.exit(2);
}
for (const z of belegZeilen) console.log(z);
for (const z of hinweise) console.log(z);
for (const z of befunde) console.log(z);
const pruefungen = [opt.zitate && "zitate", opt.l1 && "l1", opt.antwort && "antwort"].filter(Boolean).join(", ");
console.log(`content-pruefen: ${dateien.length} Datei(en), Prüfungen ${pruefungen}: ${befunde.length} Befund(e), ${hinweise.length} Hinweis(e)`);
process.exit(befunde.length ? 1 : 0);
