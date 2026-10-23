#!/usr/bin/env node
/**
 * Paketprüfung der Phase-9-Inhalte (09-15, D-11, W4; Muster aus 09-RESEARCH „Prüfskript-Muster“).
 *
 *   node scripts/content-pruefen.mjs [--ausnahmen <prüfdatei>] [--zitate] [--l1] [--antwort] <dateien…>
 *
 * --zitate     Jeder Begriff in „…“ (an „→“ geteilt) muss wörtlich im eingefrorenen Release vorkommen:
 *              Web-Commit in `src` und `supabase/functions`, Mobile-Commit in `src` (Sprachdateien nur `de`),
 *              jeweils ohne Testdateien. Die Commits stehen in docs/product-source-snapshot.json (`basis`).
 *              Begriffe unter 4 Zeichen sind nur ein Hinweis (09-RESEARCH Pitfall 2: Substring-Treffer belegen nichts).
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

const ROOT = path.resolve(import.meta.dirname, "..");
const SNAPSHOT = path.join(ROOT, "docs/product-source-snapshot.json");
const LEITLINIE = path.join(ROOT, "lib/leitlinie-l1.json");
const REPOS = {
  web: process.env.CRAFTOS_WEB_REPO || "C:/Projekte/craft-connect-buddy",
  mobile: process.env.CRAFTOS_MOBILE_REPO || "C:/Projekte/CraftOS - Mobile/craftos-mobile",
};
const ANTWORT_MAX = 300;
const KURZ_UNTER = 4;
const OHNE_TESTS = [":(exclude,glob)**/*.test.*", ":(exclude,glob)**/*.spec.*", ":(exclude,glob)**/__tests__/**"];
const MOBILE_LOCALES = "src/shared/i18n/locales";

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

function git(repo, args) {
  return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "pipe"] });
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
    let pfade;
    if (k === "web") pfade = ["src", "supabase/functions", ...OHNE_TESTS];
    else {
      const locales = git(REPOS[k], ["ls-tree", "--name-only", `${commit}:${MOBILE_LOCALES}`]).split(/\r?\n/).filter(Boolean);
      pfade = ["src", ...OHNE_TESTS, ...locales.filter((l) => l !== "de").map((l) => `:(exclude)${MOBILE_LOCALES}/${l}`)];
    }
    quellen.push({ name: k, repo: REPOS[k], commit, pfade });
  }
  return quellen;
}

/** Menge der Begriffe, die in der Quelle wörtlich vorkommen (Sammelsuche, Fehlende einzeln nachgeprüft). */
function gefunden(quelle, begriffe) {
  const treffer = new Set();
  const liste = [...begriffe];
  for (let i = 0; i < liste.length; i += 150) {
    const teil = liste.slice(i, i + 150);
    try {
      const out = git(quelle.repo, ["grep", "-F", "-o", "-h", "-I", ...teil.flatMap((b) => ["-e", b]), quelle.commit, "--", ...quelle.pfade]);
      for (const z of out.split(/\r?\n/)) if (z) treffer.add(z);
    } catch (e) {
      if (e.status !== 1) throw e;
    }
  }
  for (const b of liste) {
    if (treffer.has(b)) continue;
    try {
      git(quelle.repo, ["grep", "-F", "-q", "-I", "-e", b, quelle.commit, "--", ...quelle.pfade]);
      treffer.add(b);
    } catch (e) {
      if (e.status !== 1) throw e;
    }
  }
  return new Set(liste.filter((b) => treffer.has(b)));
}

/** Bis zu drei Release-Dateien mit dem Begriff, als `web:<pfad>` bzw. `mobile:<pfad>`. */
function belegDateien(quellen, begriff) {
  const out = [];
  for (const q of quellen) {
    try {
      const liste = git(q.repo, ["grep", "-F", "-l", "-I", "-e", begriff, q.commit, "--", ...q.pfade]);
      for (const z of liste.split(/\r?\n/)) if (z) out.push(`${q.name}:${z.slice(q.commit.length + 1)}`);
    } catch (e) {
      if (e.status !== 1) throw e;
    }
  }
  return out.length > 3 ? [...out.slice(0, 3), `… (${out.length} Dateien)`] : out;
}

// ---------------------------------------------------------------- Texte je Datei

function textFuerZitate(datei, inhalt) {
  return datei.endsWith(".ts") ? stringLiterale(inhalt).join("\n") : inhalt;
}

function zitateAus(text) {
  const out = [];
  for (const m of text.matchAll(/„([^“„\n]{1,160})“/g)) {
    const ganz = m[1].trim();
    const teile = ganz.split(/\s*→\s*/).map((t) => t.trim()).filter(Boolean);
    out.push({ ganz, teile });
  }
  return out;
}

function pruefeZitate(dateien, ausnahmen, mitBelegen) {
  const jeDatei = new Map();
  const alle = new Set();
  for (const { datei, inhalt } of dateien) {
    const zitate = zitateAus(textFuerZitate(datei, inhalt));
    jeDatei.set(datei, zitate);
    for (const z of zitate) {
      if (ausnahmen.has(z.ganz)) continue;
      for (const t of z.teile) if (!ausnahmen.has(t)) alle.add(t);
    }
  }
  if (!alle.size) return;
  const quellen = releaseQuellen();
  const belegt = new Set();
  for (const q of quellen) for (const b of gefunden(q, alle)) belegt.add(b);
  const stand = quellen.map((q) => `${q.name === "web" ? "Web" : "Mobile"} ${q.commit.slice(0, 8)}`).join(", ");
  for (const [datei, zitate] of jeDatei) {
    const gemeldet = new Set();
    for (const z of zitate) {
      if (ausnahmen.has(z.ganz)) continue;
      for (const t of z.teile) {
        if (ausnahmen.has(t) || gemeldet.has(t)) continue;
        gemeldet.add(t);
        if (laenge(t) < KURZ_UNTER)
          hinweis(datei, `kurzer Begriff „${t}“ (unter ${KURZ_UNTER} Zeichen) ${belegt.has(t) ? "kommt vor, belegt aber nichts" : "nicht gefunden"} – Navigationsquelle lesen`);
        else if (!belegt.has(t)) befund(datei, `Zitat „${t}“ nicht im Release (${stand})`);
        else if (mitBelegen) belegZeilen.push(`${datei}: Beleg „${t}“ → ${belegDateien(quellen, t).join(", ")}`);
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

/** Zeilen des neutralen GAEB-Fachteils (H2-Abschnitte ohne „CraftOS“) als Menge von Zeilenindizes. */
function gaebFachteilZeilen(zeilen) {
  const aus = new Set();
  let start = -1;
  const abschliessen = (ende) => {
    if (start === -1) return;
    const abschnitt = zeilen.slice(start, ende);
    if (!abschnitt.some((z) => /CraftOS/.test(z))) for (let i = start; i < ende; i++) aus.add(i);
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
  const listenwoerter = new Set(l1.woerter.map((w) => w.toLowerCase()));
  for (const { datei, inhalt } of dateien) {
    if (datei.endsWith(".ts")) {
      // Prüfmechanik wie tests/content-produktwahrheit.test.ts: ein Literal, das genau ein Leitlinienwort ist,
      // ist ein Eintrag einer Prüf-Wortliste und kein Seitentext.
      for (const lit of stringLiterale(inhalt)) {
        if (listenwoerter.has(lit.trim().toLowerCase())) continue;
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
    const aus = l1.gaeb && datei.endsWith(l1.gaeb.datei) ? gaebFachteilZeilen(zeilen) : new Set();
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
