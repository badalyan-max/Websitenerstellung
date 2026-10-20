// Liest Preise, Credits und Testphase der Web-App aus origin/release und schreibt den eingecheckten Preis-Snapshot.
//   npm run sync:product        Snapshot neu schreiben
//   npm run sync:product:check  nur prüfen, ob der gespeicherte Commit noch origin/release entspricht
// Nur lokal: kein git fetch, kein Netzwerk. Die Remote-Refs werden vom Inhaber aktualisiert.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const WEB = process.env.CRAFTOS_WEB_REPO || "C:/Projekte/craft-connect-buddy";
const MOBILE = process.env.CRAFTOS_MOBILE_REPO || "C:/Projekte/CraftOS - Mobile/craftos-mobile";
const REF = "origin/release";
const OUT = path.resolve(import.meta.dirname, "../docs/product-pricing-snapshot.json");

const gitIn = (repo) => (...args) =>
  execFileSync("git", ["-C", repo, ...args], { encoding: "utf8" }).trim();

if (!fs.existsSync(WEB)) {
  console.error(`Web-App-Repo nicht gefunden: ${WEB} (CRAFTOS_WEB_REPO setzen).`);
  process.exit(1);
}
const web = gitIn(WEB);
const commit = web("rev-parse", REF);

if (process.argv.includes("--check")) {
  const saved = JSON.parse(fs.readFileSync(OUT, "utf8"));
  if (saved.source?.commit === commit) {
    console.log(`Snapshot ist aktuell: ${saved.source.tag} (${commit.slice(0, 8)}).`);
  } else {
    console.error(
      `Snapshot veraltet: gespeichert ${String(saved.source?.commit).slice(0, 8)}, ${REF} ist ${commit.slice(0, 8)}. „npm run sync:product“ ausführen.`,
    );
    process.exitCode = 1;
  }
} else {
  const tag = web("describe", "--tags", REF);
  const constants = web("show", `${commit}:src/lib/constants.ts`);
  const pricingSrc = web("show", `${commit}:src/lib/subscription/pricing.ts`);
  const agb = web("show", `${commit}:src/pages/AGB.tsx`);

  const num = (src, key) => {
    const m = src.match(new RegExp(`\\b${key}:\\s*([\\d.]+)`));
    if (!m) throw new Error(`Feld ${key} in src/lib/constants.ts nicht gefunden.`);
    return Number(m[1]);
  };
  const keys = [
    "ADMIN_MONTHLY", "BUERO_MONTHLY", "APP_MONTHLY",
    "ADMIN_YEARLY", "BUERO_YEARLY", "APP_YEARLY",
    "YEARLY_DISCOUNT_PERCENT", "ADMIN_FREE_CREDITS", "ORG_STORAGE_BASE_GB",
    "EXTRA_STORAGE_GB", "EXTRA_STORAGE_PRICE_MONTHLY", "EXTRA_STORAGE_PRICE_YEARLY",
  ];
  const pricing = Object.fromEntries(keys.map((k) => [k, num(constants, k)]));

  const vat = constants.match(/export const VAT_RATE = ([\d.]+)/);
  if (!vat) throw new Error("VAT_RATE in src/lib/constants.ts nicht gefunden.");

  const creditPackages = [
    ...pricingSrc.matchAll(/\{\s*amount:\s*([\d.]+),\s*bonus:\s*([\d.]+),\s*bonusPercent:\s*(\d+)\s*\}/g),
  ].map(([, amount, bonus, pct]) => ({ amount: +amount, bonus: +bonus, bonusPercent: +pct }));
  if (creditPackages.length === 0)
    throw new Error("CREDIT_PACKAGES in src/lib/subscription/pricing.ts nicht gefunden.");

  const words = { sieben: 7, zehn: 10, vierzehn: 14, dreißig: 30 };
  const trialWord = agb.match(/beträgt (\S+) Kalendertage/)?.[1];
  const trialDays = trialWord ? (words[trialWord] ?? (Number(trialWord) || null)) : null;
  if (trialDays === null) throw new Error("Testphase (AGB § 4) in src/pages/AGB.tsx nicht gefunden.");

  const netPrices = /Alle Preise verstehen sich netto/.test(agb);

  let mobileSource = null;
  if (fs.existsSync(MOBILE)) {
    const mobile = gitIn(MOBILE);
    mobileSource = {
      repo: "craftos-mobile",
      ref: REF,
      tag: mobile("describe", "--tags", REF),
      commit: mobile("rev-parse", REF),
    };
  }

  const snapshot = {
    source: { repo: "craft-connect-buddy", ref: REF, tag, commit, readAt: new Date().toISOString() },
    mobileSource,
    pricing,
    vatRate: Number(vat[1]),
    creditPackages,
    trialDays,
    netPrices,
  };
  fs.writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`Snapshot ${tag} (${commit.slice(0, 8)}) geschrieben.`);
}
