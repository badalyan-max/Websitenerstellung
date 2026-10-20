// Prüft, dass der SE-Ranking-Schlüssel in keiner Datei der angegebenen Pfade steht (T-05-01).
//   node scripts/check-no-secrets.mjs [pfad ...]   (Standard: docs/seo scripts lib tests)
// Gibt nie den Schlüsselwert aus, nur Dateipfade.
import fs from "node:fs";
import path from "node:path";

const KEY_NAME = "SE_RANKING_API_KEY";
const ENV_FILE = process.env.CRAFTOS_ENV_FILE || "C:/Projekte/Websitenerstellung/.env";
try {
  process.loadEnvFile(ENV_FILE);
} catch {
  // Fehlende Datei wird unten gemeldet.
}
const secret = process.env[KEY_NAME];
if (!secret) {
  console.error(`${KEY_NAME} fehlt in ${ENV_FILE}`);
  process.exit(1);
}

const ROOT = path.resolve(import.meta.dirname, "..");
const targets = process.argv.slice(2).length ? process.argv.slice(2) : ["docs/seo", "scripts", "lib", "tests"];
const SKIP = new Set(["node_modules", ".next", ".git", "test-results"]);
const needle = Buffer.from(secret, "utf8");

const hits = [];
function walk(p) {
  let stat;
  try {
    stat = fs.statSync(p);
  } catch {
    return;
  }
  if (stat.isDirectory()) {
    if (SKIP.has(path.basename(p))) return;
    for (const entry of fs.readdirSync(p)) walk(path.join(p, entry));
    return;
  }
  if (!stat.isFile()) return;
  if (fs.readFileSync(p).includes(needle)) hits.push(path.relative(ROOT, p).replace(/\\/g, "/"));
}
for (const t of targets) walk(path.resolve(ROOT, t));

if (hits.length) {
  console.error(`FEHLER: Schlüssel in ${hits.length} Datei(en): ${hits.join(", ")}`);
  process.exit(1);
}
console.log("OK: Schlüssel in keiner Datei");
