import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import {
  getProductRegister,
  productBasis,
  mobileLocales,
  mobileOffline,
} from "@/lib/product-register";
import { pageMetadata } from "@/lib/metadata";
import { ZUSATZ_IDS } from "@/lib/funktionsgruppen";
import { MOBILE_REPO as MOBILE, WEB_REPO as WEB, pruefeReleaseStand, releaseDatei, releaseSuite } from "./release-repos";

// Sichtbarer Skip mit Grund bzw. Pflichtmodus (CRAFTOS_REQUIRE_RELEASE=1, CI) aus tests/release-repos.ts (D-14).
const tagSuite = releaseSuite("Tags lösen lokal genau auf den eingetragenen Commit auf (IN-04)", ["web", "mobile"]);
const repoSuite = releaseSuite("lokale Produkt-Repositories", ["web", "mobile"]);

describe("publication basis", () => {
  it("bezieht beide Produkte auf origin/release mit Tag und Commit", () => {
    const register = getProductRegister();
    for (const repo of [register.basis.web, register.basis.mobile]) {
      expect(repo.ref).toBe("origin/release");
      expect(repo.commit).toMatch(/^[0-9a-f]{40}$/);
    }
    expect(register.basis.web.tag.startsWith("v4.")).toBe(true);
    expect(register.basis.mobile.tag.startsWith("mobile-v")).toBe(true);
    // IN-04: echte Tags, keine `git describe`-Ausgabe („…-2-g837aab4f“).
    for (const repo of [register.basis.web, register.basis.mobile]) expect(repo.tag).not.toMatch(/-\d+-g[0-9a-f]+$/);
    expect(register.basis.checkedAt).toBe("2026-10-23");
  });
  it.skipIf(tagSuite.skip)(tagSuite.titel, () => {
    pruefeReleaseStand("web");
    pruefeReleaseStand("mobile");
    const register = getProductRegister();
    for (const [repo, basis] of [
      [WEB, register.basis.web],
      [MOBILE, register.basis.mobile],
    ] as const) {
      const commit = execFileSync("git", ["-C", repo, "rev-parse", `${basis.tag}^{commit}`], { encoding: "utf8" }).trim();
      expect(commit, basis.tag).toBe(basis.commit);
    }
  });
  it("links every advertised platform to source evidence", () => {
    const register = getProductRegister();
    expect(register.features).toHaveLength(22);
    // Jede Detailfunktion hat mindestens einen Release-Beleg (T-07-04).
    for (const feature of register.features)
      expect(feature.evidence.length, feature.slug).toBeGreaterThan(0);
    for (const feature of register.features) {
      for (const platform of feature.platforms)
        expect(
          feature.evidence.some((item) => item.repository === platform),
          feature.slug + ": " + platform,
        ).toBe(true);
    }
    const portal = register.features.find((f) => f.slug === "kundenportal");
    expect(portal?.availability).toBe("implemented");
    expect(register.trialDays).toBe(10);
    expect(register.licenses.every((license) => license.mobileIncluded)).toBe(
      true,
    );
  });
  it("führt Lager, Arbeitsanweisungen, Terminplanung und Mängelmanagement mit Mobile-Beleg", () => {
    const register = getProductRegister();
    for (const slug of ["lager", "arbeitsanweisungen", "terminplanung", "maengelmanagement"]) {
      const feature = register.features.find((f) => f.slug === slug);
      expect(feature?.platforms, slug).toContain("mobile");
      expect(
        feature?.evidence.some((e) => e.repository === "mobile"),
        slug,
      ).toBe(true);
    }
  });
  it("die sechs neuen Detailfunktionen tragen ihre Belege als Funktion, nicht mehr in liveExtras (D-07, Pattern 4)", () => {
    const register = getProductRegister();
    const slugs = register.features.map((f) => f.slug);
    for (const slug of ["gaeb", "mahnwesen", "terminplanung", "bankabgleich", "datenuebernahme", "maengelmanagement"])
      expect(slugs, slug).toContain(slug);
    const namen = register.liveExtras.map((x) => x.name);
    for (const alt of [
      "GAEB-Import/-Export und DATANORM-Import",
      "Mahnwesen",
      "Terminplanung mit Bauphasen (in der Mobile-App: Arbeitsabschnitte)",
      "Bankabgleich und Zahlungseingänge",
      "Datenübernahme",
      "Mängel",
    ])
      expect(namen, alt).not.toContain(alt);
    const pfade = (slug: string, repo: "web" | "mobile") =>
      register.features
        .find((f) => f.slug === slug)
        ?.evidence.filter((e) => e.repository === repo)
        .map((e) => e.path) ?? [];
    expect(pfade("terminplanung", "mobile")).toEqual([
      "src/features/projects/components/ProjectPhaseSummary.tsx",
      "src/features/assignments/components/AssignmentPhaseLine.tsx",
    ]);
    expect(pfade("maengelmanagement", "mobile")).toEqual([
      "src/features/defects/screens/DefectsScreen.tsx",
      "src/features/defects/screens/DefectDetailScreen.tsx",
    ]);
    expect(pfade("gaeb", "web")).toContain("src/components/DocumentEditor/GAEBImportDialog.tsx");
    expect(pfade("mahnwesen", "web")).toContain("src/pages/settings/MahnwesenSettings.tsx");
    expect(pfade("bankabgleich", "web")).toContain("src/pages/Bankumsaetze.tsx");
    expect(pfade("datenuebernahme", "web")).toContain("src/pages/Datenimport.tsx");
    // Parität mit lib/funktionsgruppen.ts – die feste Zahl prüft tests/funktionsgruppen.test.ts (Paket d).
    expect(register.liveExtras.filter((x) => x.advertised)).toHaveLength(ZUSATZ_IDS.length);
  });
  it("führt 21 App-Sprachen, Zusatzfunktionen und nicht-live Funktionen getrennt", () => {
    const register = getProductRegister();
    expect(mobileLocales).toHaveLength(21);
    expect("upcoming" in register).toBe(false);
    const names = register.notLive.map((n) => n.name);
    for (const name of [
      "Telefon-Agent",
      "MCP-Server",
      "KI-Agent",
      "Videoanalyse (Web)",
      "Subunternehmer-Portal-Einladungen",
      "Portal-Onlinezahlung",
    ])
      expect(names, name).toContain(name);
    for (const extra of register.liveExtras) {
      expect(extra.evidence.length, extra.name).toBeGreaterThan(0);
      for (const platform of extra.platforms)
        expect(
          extra.evidence.some((e) => e.repository === platform),
          extra.name + ": " + platform,
        ).toBe(true);
    }
  });
  it("führt Offline als belegten Registereintrag mit Limitation (07-07, D-23)", () => {
    const register = getProductRegister();
    expect(mobileOffline.evidence.map((e) => `${e.repository}:${e.path}`)).toEqual([
      "mobile:src/shared/hooks/useOfflineQueueSync.ts",
      "mobile:src/shared/hooks/useOfflineMutation.ts",
      "mobile:src/shared/components/SyncStatusBadge.tsx",
      "mobile:src/shared/components/OfflineIndicator.tsx",
    ]);
    expect(register.limitations).toContain(mobileOffline.limitation);
    expect(mobileOffline.limitation).toBe("Keine vollständige Offline-Zusage");
  });
  it("zählt die offline erfassbaren Vorgänge mit je einem Mobile-Beleg auf (09-10)", () => {
    expect(mobileOffline.erfassung).toBe("Zeiten, Bautagesberichte, Mängel, Aufmaße und Urlaubsanträge");
    expect(mobileOffline.erfassungEvidence.map((e) => e.path)).toEqual([
      "src/features/time-tracking/hooks/useTimeEntries.ts",
      "src/features/construction-reports/hooks/useConstructionReports.ts",
      "src/features/defects/hooks/useDefects.ts",
      "src/features/room-measurements/hooks/useRoomMeasurements.ts",
      "src/features/vacation/hooks/useVacationRequests.ts",
    ]);
    expect(mobileOffline.erfassungEvidence.every((e) => e.repository === "mobile")).toBe(true);
  });
  it("uses the individual article image for both sharing formats", () => {
    const result = pageMetadata(
      "Rechnung schreiben",
      "Eine Anleitung",
      "/blog/rechnung",
      "/blog/rechnung/opengraph-image",
    );
    const expected = "https://craftos.eu/blog/rechnung/opengraph-image";
    expect(result.openGraph).toMatchObject({ images: [{ url: expected }] });
    expect(result.twitter).toMatchObject({ images: [expected] });
  });
});

describe.skipIf(repoSuite.skip)(
  repoSuite.titel,
  () => {
    it("beide Repos vorhanden, Release-Commits aus productBasis lokal und in origin/release enthalten", () => {
      pruefeReleaseStand("web");
      pruefeReleaseStand("mobile");
    });
    function exists(repository: "web" | "mobile", path: string): boolean {
      const repo = repository === "web" ? WEB : MOBILE;
      const commit =
        repository === "web" ? productBasis.web.commit : productBasis.mobile.commit;
      try {
        execFileSync("git", ["-C", repo, "cat-file", "-e", `${commit}:${path}`], {
          stdio: "ignore",
        });
        return true;
      } catch {
        return false;
      }
    }
    it("Belege existieren am Release-Commit", () => {
      const register = getProductRegister();
      const missing: string[] = [];
      const all = [
        ...register.features.flatMap((f) => f.evidence),
        ...register.liveExtras.flatMap((x) => x.evidence),
        // 07-07 (D-23): Offline-Erfassung der Mobile-App mit Belegen am Mobile-Release
        ...mobileOffline.evidence,
        ...mobileLocales.map((code) => ({
          repository: "mobile" as const,
          path: `src/shared/i18n/locales/${code}`,
        })),
      ];
      for (const item of all)
        if (!exists(item.repository, item.path))
          missing.push(item.repository + ":" + item.path);
      expect(missing).toEqual([]);
      expect(all.length).toBeGreaterThan(80);
      // Ein git-Aufruf je Beleg (über 130); unter Volllast der Suite reichen 5 s nicht (07-03).
    }, 30_000);
    it("jeder offline aufgezählte Vorgang nutzt useOfflineMutation am Mobile-Release (09-10)", () => {
      for (const item of mobileOffline.erfassungEvidence) {
        const src = releaseDatei("mobile", item.path);
        expect(src, item.path).toContain("useOfflineMutation");
      }
    }, 30_000);
  },
);
