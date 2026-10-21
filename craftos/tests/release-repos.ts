/**
 * Release-Repos für die Belegtests gegen Web- und Mobile-Release (Code-Review 07 WR-07; D-02 (3), F3).
 *
 * - Pfade über `CRAFTOS_WEB_REPO` und `CRAFTOS_MOBILE_REPO`, Fallback auf das Layout der Windows-Arbeitsplätze.
 * - Fehlt ein Repo, wird die Suite sichtbar übersprungen: Grund im Suite-Namen („ÜBERSPRUNGEN: …“) und als Warnung im
 *   Log, nie stilles Grün. Mit `CI=true` oder `CRAFTOS_REQUIRE_RELEASE=1` läuft die Suite trotzdem und schlägt fehl.
 * - Gelesen wird am Release-Commit aus `productBasis` (lib/product-register.ts), nicht am lokal zuletzt geholten
 *   `origin/release`; ein veralteter Fetch fällt in `pruefeReleaseStand` mit Hinweis auf `git fetch` auf.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { productBasis } from "@/lib/product-register";

export type ReleaseRepo = "web" | "mobile";

export const WEB_REPO = process.env.CRAFTOS_WEB_REPO || "C:/Projekte/craft-connect-buddy";
export const MOBILE_REPO = process.env.CRAFTOS_MOBILE_REPO || "C:/Projekte/CraftOS - Mobile/craftos-mobile";

/** Pflichtmodus: fehlende Repos sind ein Fehler statt eines Skips. */
export const RELEASE_PFLICHT = process.env.CI === "true" || process.env.CRAFTOS_REQUIRE_RELEASE === "1";

const PFAD: Record<ReleaseRepo, string> = { web: WEB_REPO, mobile: MOBILE_REPO };
const VARIABLE: Record<ReleaseRepo, string> = { web: "CRAFTOS_WEB_REPO", mobile: "CRAFTOS_MOBILE_REPO" };

function git(repo: ReleaseRepo, args: string[]): string {
  return execFileSync("git", ["-C", PFAD[repo], ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

/** Grund, warum Release-Repos fehlen, oder null. */
export function fehlendeReleaseRepos(repos: readonly ReleaseRepo[]): string | null {
  const fehlend = repos.filter((r) => !fs.existsSync(path.join(PFAD[r], ".git")));
  if (fehlend.length === 0) return null;
  return fehlend.map((r) => `${VARIABLE[r]} → ${PFAD[r]} nicht gefunden`).join(", ");
}

/**
 * Titel und Skip-Entscheidung einer Release-Suite. Ein Skip steht im Suite-Namen und als Warnung im Log;
 * im Pflichtmodus wird nicht übersprungen, die erste Prüfung (`pruefeReleaseStand`) schlägt dann mit Grund fehl.
 */
export function releaseSuite(titel: string, repos: readonly ReleaseRepo[]): { titel: string; skip: boolean } {
  const grund = fehlendeReleaseRepos(repos);
  if (!grund) return { titel, skip: false };
  if (RELEASE_PFLICHT) return { titel: `${titel} (Pflicht: ${grund})`, skip: false };
  console.warn(
    `[Release-Belege] ÜBERSPRUNGEN: „${titel}“ – ${grund}. Pfad per Umgebungsvariable setzen; CRAFTOS_REQUIRE_RELEASE=1 erzwingt die Prüfung.`,
  );
  return { titel: `${titel} – ÜBERSPRUNGEN: ${grund}`, skip: true };
}

/**
 * Wirft mit klarem Grund, wenn das Repo fehlt, der Release-Commit aus productBasis lokal nicht vorliegt oder nicht in
 * `origin/release` enthalten ist (veralteter oder fremder Stand).
 */
export function pruefeReleaseStand(repo: ReleaseRepo): void {
  const grund = fehlendeReleaseRepos([repo]);
  if (grund) throw new Error(`Release-Belege: ${grund}.`);
  const commit = productBasis[repo].commit;
  try {
    git(repo, ["cat-file", "-e", `${commit}^{commit}`]);
  } catch {
    throw new Error(`Release-Belege: Commit ${commit} (productBasis.${repo}) fehlt in ${PFAD[repo]} – git fetch ausführen.`);
  }
  try {
    git(repo, ["merge-base", "--is-ancestor", commit, "origin/release"]);
  } catch {
    throw new Error(
      `Release-Belege: Commit ${commit} (productBasis.${repo}) ist nicht in origin/release von ${PFAD[repo]} enthalten – git fetch ausführen oder productBasis prüfen.`,
    );
  }
}

/** Datei am Release-Commit aus productBasis (nur lesend). */
export function releaseDatei(repo: ReleaseRepo, datei: string): string {
  return git(repo, ["show", `${productBasis[repo].commit}:${datei}`]);
}
