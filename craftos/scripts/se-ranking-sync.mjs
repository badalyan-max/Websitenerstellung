// Abgleich des SE-Ranking-Projekts 13094375 mit der Keyword-Map (SEO-07, D-07a).
//   node scripts/se-ranking-sync.mjs --list-tools [PRÄFIX]  Toolnamen und Pflichtargumente des MCP-Servers
//   node scripts/se-ranking-sync.mjs --check                 Ist/Soll vergleichen → docs/seo/reports/<Datum>-projektabgleich[-N].json
//   node scripts/se-ranking-sync.mjs --apply                 Fehlende Keywords hinzufügen; abweichende Zielseiten
//                                                            nur auflisten (zielseiteNichtAngeglichen)
//   node scripts/se-ranking-sync.mjs --apply --retarget      zusätzlich Zielseiten bestehender Keywords angleichen
//                                                            (Keyword-Text in Original-Schreibweise, keine Umbenennung)
//                                                            → docs/seo/reports/<Datum>-projektabgleich-apply[-N].json
// Soll = alle Hauptkeywords der Keyword-Map (bestehende und geplante Seiten), Ziel-URL https://craftos.eu{path}.
// Löschregel: Das Skript entfernt nie Keywords, Wettbewerber oder Prompts; zusätzliche Projekt-Keywords
// (z. B. „craftview software gmbh“) bleiben unverändert und werden nur unter „zusaetzlich“ aufgeführt.
// Berichte werden nie überschrieben: weitere Läufe am selben Tag erhalten die Laufnummer -2, -3, …
// Projektlimits (nur HTTP 402 oder eindeutiger Limit-/Kontingenttext) werden je nicht übernommenem Soll-Eintrag
// mit grund "limit" in limits[] der apply-Datei persistiert; ein späterer --check (höchstens 30 Tage danach)
// übernimmt sie (limitsQuelle) und wertet sie nicht als Prüffehler. Alles andere, auch stillschweigend nicht
// übernommene Einträge, steht unter fehlgeschlagen[] und führt zu Exit 1.
// Die Logik liegt in scripts/lib/se-ranking-sync-core.mjs (Vitest: tests/se-ranking-sync.test.ts).
import fs from "node:fs";
import path from "node:path";
import { createClient } from "./lib/se-ranking-mcp.mjs";
import { apply, buildSoll, check } from "./lib/se-ranking-sync-core.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const MAP_FILE = path.join(ROOT, "docs/seo/keyword-map.json");
const REPORT_DIR = path.join(ROOT, "docs/seo/reports");

const mode = process.argv[2];
const retarget = process.argv.slice(3).includes("--retarget");
if (!["--list-tools", "--check", "--apply"].includes(mode) || (retarget && mode !== "--apply")) {
  console.error("Aufruf: node scripts/se-ranking-sync.mjs <--list-tools [PRÄFIX] | --check | --apply [--retarget]>");
  process.exit(1);
}

async function listTools(client) {
  const prefix = process.argv[3] ?? "";
  const tools = (await client.listTools()).filter((t) => t.name.startsWith(prefix));
  for (const t of tools) console.log(`${t.name}(${(t.inputSchema?.required ?? []).join(", ")})`);
  console.log(`${tools.length} Tools`);
}

let client;
try {
  client = createClient({ log: (m) => console.log(m) });
  let code = 0;
  if (mode === "--list-tools") await listTools(client);
  else {
    const soll = buildSoll(JSON.parse(fs.readFileSync(MAP_FILE, "utf8")));
    ({ code } =
      mode === "--check"
        ? await check(client, soll, { reportDir: REPORT_DIR })
        : await apply(client, soll, { reportDir: REPORT_DIR, retarget }));
  }
  console.log(`MCP-Aufrufe: ${client.callCount}`);
  process.exit(code);
} catch (err) {
  console.error(`Fehler: ${err.message}`);
  process.exit(1);
}
