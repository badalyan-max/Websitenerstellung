/**
 * Erzeugt ausgelieferte Bildvarianten als AVIF und WebP im Medienbudget (MEDIA-04, D-15).
 * Nutzt das über next installierte sharp (0.35.4); es wird nichts installiert.
 * Die Ausgangsdateien bleiben unverändert in public/ (keine Löschung).
 *
 * Aufruf: node scripts/optimize-images.mjs   (im Ordner craftos/)
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const LIMIT = 150 * 1024;
const MAX_WIDTH = 1600;
const MIN_QUALITY = 45;
const STEP = 5;

/** Eingabe (relativ zu public/) → Ausgabestamm ohne Endung. */
const JOBS = [
  ["images/mobile/current/dashboard-original.png", "images/mobile/current/dashboard-original"],
  ["images/mobile/current/projekt-original.png", "images/mobile/current/projekt-original"],
  ["images/mobile/current/zeiten-original.png", "images/mobile/current/zeiten-original"],
  ["images/werkstatt-2026.webp", "images/werkstatt-2026-1600"],
  ["images/team-baustelle-2026.webp", "images/team-baustelle-2026-1600"],
];

const FORMATS = [
  { ext: "avif", quality: 60, encode: (img, quality) => img.avif({ quality, effort: 6 }) },
  { ext: "webp", quality: 75, encode: (img, quality) => img.webp({ quality, effort: 6, smartSubsample: true }) },
];

async function encodeWithinBudget(input, width, format) {
  for (let quality = format.quality; quality >= MIN_QUALITY; quality -= STEP) {
    const pipeline = sharp(input).rotate().resize({ width, withoutEnlargement: true });
    const buffer = await format.encode(pipeline, quality).toBuffer();
    if (buffer.length <= LIMIT) return { buffer, quality };
  }
  throw new Error(
    `${path.relative(PUBLIC, input)} → ${format.ext}: auch mit Qualität ${MIN_QUALITY} über 150 KB – Breite reduzieren oder Motiv prüfen.`,
  );
}

const rows = [];
for (const [source, target] of JOBS) {
  const input = path.join(PUBLIC, source);
  const meta = await sharp(input).metadata();
  const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);
  for (const format of FORMATS) {
    const { buffer, quality } = await encodeWithinBudget(input, width, format);
    const output = path.join(PUBLIC, `${target}.${format.ext}`);
    await fs.writeFile(output, buffer);
    const outMeta = await sharp(buffer).metadata();
    rows.push({
      Datei: `${target}.${format.ext}`,
      Abmessungen: `${outMeta.width}×${outMeta.height}`,
      Qualität: quality,
      Bytes: buffer.length,
      KB: (buffer.length / 1024).toFixed(1),
    });
  }
}

console.table(rows);
const over = rows.filter((r) => r.Bytes > LIMIT);
if (over.length) {
  console.error(`Über Budget: ${over.map((r) => r.Datei).join(", ")}`);
  process.exit(1);
}
console.log(`${rows.length} Dateien erzeugt, alle ≤ 150 KB. Ausgangsdateien unverändert.`);
