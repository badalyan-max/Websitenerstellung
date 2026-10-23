import { describe, expect, it } from "vitest";
import {
  AXE_TAGS,
  BREITEN,
  ENGINES,
  NICHT_GEFUNDEN,
  WEBKIT_VORLAGEN,
  bewerteAxe,
  erwarteterStatus,
  fokusSichtbar,
  matrix,
  mergeReports,
  parseOptionen,
  pruefeGesamtlauf,
  tastaturFehler,
  teil,
} from "../scripts/lib/a11y-audit-core.mjs";

// Phase 10, Plan 10-01 (D-05 bis D-08, K-10): reine Bewertungsfunktionen des A11y-Werkzeugs scripts/a11y-audit.mjs.

const SITEMAP = ["/", "/funktionen", "/funktionen/zeiterfassung", "/preise", ...WEBKIT_VORLAGEN.filter((p) => p !== NICHT_GEFUNDEN)];

describe("Konstanten", () => {
  it("nennen Breiten, Engines, Tags und 20 WebKit-Vorlagen laut Vertrag", () => {
    expect(BREITEN).toEqual([360, 390, 768, 1024, 1440]);
    expect(ENGINES).toEqual(["chromium", "webkit"]);
    expect(AXE_TAGS).toEqual(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]);
    expect(NICHT_GEFUNDEN).toBe("/gibt-es-nicht-a11y");
    expect(WEBKIT_VORLAGEN).toHaveLength(20);
    expect(new Set(WEBKIT_VORLAGEN).size).toBe(20);
    expect(WEBKIT_VORLAGEN).toContain("/support");
    expect(WEBKIT_VORLAGEN).toContain(NICHT_GEFUNDEN);
  });
});

describe("matrix und teil", () => {
  const liste = matrix({ pfade: ["/a", "/b", "/c"], breiten: BREITEN, engines: ["chromium", "webkit"], webkitPfade: ["/b"] });

  it("ergibt 2 Engines × 5 Breiten × 3 Pfade mit einem WebKit-Pfad = 15 + 5 Einträge", () => {
    expect(liste).toHaveLength(20);
    expect(liste.filter((x) => x.engine === "chromium")).toHaveLength(15);
    expect(liste.filter((x) => x.engine === "webkit").map((x) => x.pfad)).toEqual(["/b", "/b", "/b", "/b", "/b"]);
  });

  it("ist stabil sortiert, unabhängig von der Eingabereihenfolge", () => {
    const anders = matrix({ pfade: ["/c", "/a", "/b"], breiten: [...BREITEN].reverse(), engines: ["webkit", "chromium"], webkitPfade: ["/b"] });
    expect(anders).toEqual(liste);
    expect(liste[0]).toEqual({ engine: "chromium", breite: 360, pfad: "/a" });
  });

  it("teilt die Liste mit k = 1..4 vollständig und ohne Doppelung", () => {
    const teile = [1, 2, 3, 4].map((k) => teil(liste, k, 4));
    const alle = teile.flat();
    expect(alle).toHaveLength(liste.length);
    expect(new Set(alle.map((x) => `${x.engine}|${x.breite}|${x.pfad}`)).size).toBe(liste.length);
    expect(teil(liste, 2, 4)[0]).toEqual(liste[1]);
  });
});

describe("parseOptionen", () => {
  it("nimmt ohne Optionen alle Sitemap-Pfade plus /styleguide und die 404-Probe, WebKit nur Vorlagen", () => {
    const o = parseOptionen([], { sitemapPfade: SITEMAP });
    expect("fehler" in o).toBe(false);
    if ("fehler" in o) return;
    expect(o.pfade).toContain("/styleguide");
    expect(o.pfade).toContain("/gibt-es-nicht-a11y");
    expect(o.pfade).toContain("/preise");
    expect(o.webkitPfade).toEqual(WEBKIT_VORLAGEN);
    expect(o.breiten).toEqual(BREITEN);
    expect(o.engines).toEqual(ENGINES);
    expect(o.shard).toBeNull();
    expect(o.concurrency).toBe(2);
    expect(o.animation).toBe("an");
    expect(o.merge).toBe(false);
  });

  it("liest --paths, --widths, --engines, --shard, --concurrency, --animation und --merge", () => {
    const o = parseOptionen(["--paths=/,/preise", "--widths=360,1440", "--engines=chromium", "--shard=2/4", "--concurrency=1", "--animation=aus"], { sitemapPfade: SITEMAP });
    if ("fehler" in o) throw new Error(o.fehler.join("; "));
    expect(o.pfade).toEqual(["/", "/preise"]);
    expect(o.breiten).toEqual([360, 1440]);
    expect(o.engines).toEqual(["chromium"]);
    expect(o.shard).toEqual({ k: 2, n: 4 });
    expect(o.concurrency).toBe(1);
    expect(o.animation).toBe("aus");
    expect(parseOptionen(["--merge"], { sitemapPfade: null })).toMatchObject({ merge: true });
  });

  it.each([["--widths=500"], ["--shard=5/4"], ["--shard=x"], ["--shard=0/4"], ["--foo"], ["--engines=firefox"], ["--animation=vielleicht"], ["--concurrency=0"]])(
    "meldet einen Fehler für %s",
    (arg) => {
      const o = parseOptionen([arg], { sitemapPfade: SITEMAP });
      expect("fehler" in o && o.fehler.length).toBeTruthy();
    },
  );

  it("meldet Pfade außerhalb der Sitemap, mit MSYS-Hinweis bei umgeschriebenen Pfaden", () => {
    const o = parseOptionen(["--paths=/gibt-es-auch-nicht"], { sitemapPfade: SITEMAP });
    expect("fehler" in o && o.fehler.join(" ")).toContain("/gibt-es-auch-nicht");
    const msys = parseOptionen(["--paths=C:/Program Files/Git/preise"], { sitemapPfade: SITEMAP });
    expect("fehler" in msys && msys.fehler.join(" ")).toContain("MSYS_NO_PATHCONV=1");
  });

  it("prüft ohne Sitemap nur die Optionen ohne Sitemap-Bezug (vor jedem Netzaufruf)", () => {
    expect(parseOptionen(["--widths=500"], { sitemapPfade: null })).toHaveProperty("fehler");
    const o = parseOptionen(["--paths=/irgendwas"], { sitemapPfade: null });
    expect("fehler" in o).toBe(false);
  });
});

describe("erwarteterStatus (K-10)", () => {
  it("erwartet 404 für die 404-Proben, sonst 200", () => {
    expect(erwarteterStatus("/gibt-es-nicht-a11y")).toBe(404);
    expect(erwarteterStatus("/gibt-es-nicht")).toBe(404);
    expect(erwarteterStatus("/")).toBe(200);
  });
});

/** axe-Fixture: ein Verstoß mit einem Knoten. */
function verstoss(id: string, impact: string, data: Record<string, unknown> = {}) {
  return { id, impact, help: id, nodes: [{ target: [`.${id}`], html: "<a></a>", failureSummary: id, any: [{ data }] }] };
}

describe("bewerteAxe (D-06)", () => {
  it("wertet color-contrast jeder Wirkung und target-size als Gate", () => {
    const r = bewerteAxe({ violations: [verstoss("color-contrast", "moderate"), verstoss("target-size", "minor")], incomplete: [] });
    expect(r.gate.map((g) => g.regel).sort()).toEqual(["color-contrast", "target-size"]);
  });

  it("wertet serious/critical als Gate, moderate/minor nur als Zähler in uebrige", () => {
    const r = bewerteAxe({ violations: [verstoss("button-name", "critical"), verstoss("aria-allowed-role", "minor")], incomplete: [] });
    expect(r.gate.map((g) => g.regel)).toEqual(["button-name"]);
    expect(r.uebrige).toEqual({ "aria-allowed-role": { minor: 1 } });
  });

  it("ignoriert color-contrast-enhanced mit 7:1 und zählt Großtext mit 4.5:1", () => {
    const sieben = bewerteAxe({ violations: [verstoss("color-contrast-enhanced", "serious", { expectedContrastRatio: "7:1", contrastRatio: 5.2 })], incomplete: [] });
    expect(sieben.gate).toEqual([]);
    expect(sieben.grossText).toEqual([]);
    const gross = bewerteAxe({ violations: [verstoss("color-contrast-enhanced", "serious", { expectedContrastRatio: "4.5:1", contrastRatio: 3.9 })], incomplete: [] });
    expect(gross.gate).toEqual([]);
    expect(gross.grossText).toHaveLength(1);
    expect(gross.grossText[0]).toMatchObject({ regel: "color-contrast-enhanced", selektor: ".color-contrast-enhanced", verhaeltnis: 3.9 });
  });

  it("zählt unvollständige color-contrast-Knoten nur für den Bericht", () => {
    const r = bewerteAxe({ violations: [], incomplete: [verstoss("color-contrast", "serious"), verstoss("link-in-text-block", "serious")] });
    expect(r.unvollstaendigKontrast).toBe(1);
    expect(r.gate).toEqual([]);
  });
});

/** Signatur einer Ebene; Standard = Ruhezustand ohne Indikator. */
function ebene(teile: Partial<Record<"outlineStyle" | "outlineWidth" | "boxShadow" | "borderTopColor" | "backgroundColor" | "textDecorationLine", string>> = {}) {
  return { outlineStyle: "none", outlineWidth: "0px", boxShadow: "none", borderTopColor: "rgb(0, 0, 0)", backgroundColor: "rgba(0, 0, 0, 0)", textDecorationLine: "none", ...teile };
}
/** Element + 4 Vorfahren, je ohne Pseudo, ::before, ::after = 15 Ebenen. */
function signatur(aenderung: Record<number, ReturnType<typeof ebene>> = {}) {
  return Array.from({ length: 15 }, (_, i) => aenderung[i] ?? ebene());
}

describe("fokusSichtbar (10-UI-SPEC § 9.1)", () => {
  it("erkennt den Ring am Vorfahren (Karte mit :focus-within, Ebene 2)", () => {
    const ruhe = signatur();
    const aktiv = signatur({ 6: ebene({ outlineStyle: "solid", outlineWidth: "3px" }) });
    expect(fokusSichtbar(ruhe, aktiv)).toBe(true);
  });

  it("meldet keinen Indikator, wenn die Signatur gleich bleibt", () => {
    const mitRing = signatur({ 0: ebene({ outlineStyle: "solid", outlineWidth: "3px" }) });
    expect(fokusSichtbar(mitRing, signatur({ 0: ebene({ outlineStyle: "solid", outlineWidth: "3px" }) }))).toBe(false);
    expect(fokusSichtbar(signatur(), signatur())).toBe(false);
  });

  it("erkennt einen Hintergrundwechsel am Element", () => {
    expect(fokusSichtbar(signatur(), signatur({ 0: ebene({ backgroundColor: "rgb(255, 240, 200)" }) }))).toBe(true);
  });

  it("wertet eine Outline mit Breite 0 nicht als Indikator", () => {
    expect(fokusSichtbar(signatur(), signatur({ 0: ebene({ outlineStyle: "solid", outlineWidth: "0px" }) }))).toBe(false);
  });
});

describe("tastaturFehler (D-07, 10-UI-SPEC § 9.2)", () => {
  const basis = {
    pfad: "/preise",
    breite: 360,
    kandidaten: [
      { id: "k0", selektor: "a.skip" },
      { id: "k1", selektor: "button.menu" },
    ],
    fokussiert: ["k0", "k1"],
    schritte: 3,
    falle: false,
    ohneIndikator: [] as string[],
    unsichtbar: [] as string[],
    verdeckt: [] as string[],
  };

  it("liefert [] für einen sauberen Durchlauf", () => {
    expect(tastaturFehler(basis)).toEqual([]);
  });

  it("liefert die fünf Fehlertexte wörtlich", () => {
    const fehler = tastaturFehler({
      ...basis,
      fokussiert: ["k0"],
      schritte: 22,
      falle: true,
      ohneIndikator: ["a.karte"],
      unsichtbar: ["a.versteckt"],
      verdeckt: ["a.unten"],
    });
    expect(fehler).toEqual([
      "Tastatur /preise @360: 1 Bedienelemente nie fokussiert (button.menu)",
      "Tastatur /preise @360: Tastaturfalle nach 22 Schritten",
      "Tastatur /preise @360: kein sichtbarer Fokus an a.karte",
      "Tastatur /preise @360: Fokus auf unsichtbarem Element a.versteckt",
      "Tastatur /preise @360: Fokus von der Kopfleiste verdeckt an a.unten",
    ]);
  });
});

/** Teilbericht-Fixture mit einem Aufruf. */
function teilbericht(k: number, n: number, aufruf: Record<string, unknown> = {}) {
  return {
    shard: { k, n },
    aufrufe: [
      {
        engine: "chromium",
        breite: 360,
        pfad: `/seite-${k}`,
        status: 200,
        erwartet: 200,
        gate: [],
        grossText: [],
        uebrige: {},
        unvollstaendigKontrast: 0,
        tastatur: [],
        snippet: false,
        animation: null,
        ...aufruf,
      },
    ],
  };
}

describe("mergeReports", () => {
  it("wirft, wenn ein Teil fehlt oder doppelt ist", () => {
    expect(() => mergeReports([teilbericht(1, 4), teilbericht(2, 4), teilbericht(4, 4)])).toThrow("a11y-audit: Teil 3/4 fehlt");
    expect(() => mergeReports([teilbericht(1, 4), teilbericht(2, 4), teilbericht(2, 4), teilbericht(3, 4), teilbericht(4, 4)])).toThrow("a11y-audit: Teil 2/4 doppelt");
  });

  it("summiert Zähler je Regel, Seite, Breite und Engine und ist ohne Befund grün", () => {
    const r = mergeReports([
      teilbericht(1, 2, { uebrige: { "aria-allowed-role": { minor: 2 } }, unvollstaendigKontrast: 3 }),
      teilbericht(2, 2, { engine: "webkit", breite: 1440, uebrige: { "aria-allowed-role": { minor: 1 } } }),
    ]);
    expect(r.seiten).toBe(2);
    expect(r.aufrufe).toBe(2);
    expect(r.jeRegel["aria-allowed-role"]).toEqual({ minor: 3 });
    expect(r.jeEngine.webkit).toEqual({ aufrufe: 1, gateVerstoesse: 0, grossText: 0, tastatur: 0, statusFehler: 0 });
    expect(r.jeBreite["360"].aufrufe).toBe(1);
    expect(r.jeSeite["/seite-1"].aufrufe).toBe(1);
    expect(r.unvollstaendigKontrast).toBe(3);
    expect(r.gate).toBe(false);
  });

  it("setzt gate bei Gate-Verstoß, Großtext, Tastaturfehler oder unerwartetem Status und führt regel und zustand", () => {
    const befund = { regel: "color-contrast", wirkung: "serious", selektor: "a.os", text: "2,84 : 1" };
    const mitGate = mergeReports([teilbericht(1, 1, { gate: [befund] })]);
    expect(mitGate.gate).toBe(true);
    expect(mitGate.gateVerstoesse[0]).toMatchObject({ engine: "chromium", breite: 360, pfad: "/seite-1", regel: "color-contrast", selektor: "a.os", zustand: "stabil" });
    expect(mitGate.jeRegel["color-contrast"]).toEqual({ serious: 1 });
    expect(mitGate.jeSeite["/seite-1"].gateVerstoesse).toBe(1);

    expect(mergeReports([teilbericht(1, 1, { grossText: [{ regel: "color-contrast-enhanced", wirkung: "serious", selektor: "h2", verhaeltnis: 3.9 }] })]).gate).toBe(true);
    expect(mergeReports([teilbericht(1, 1, { tastatur: ["Tastatur /seite-1 @360: Tastaturfalle nach 22 Schritten"] })]).tastatur[0]).toMatchObject({ regel: "tastatur", zustand: "stabil" });
    expect(mergeReports([teilbericht(1, 1, { tastatur: ["x"] })]).gate).toBe(true);
    const status = mergeReports([teilbericht(1, 1, { status: 500 })]);
    expect(status.gate).toBe(true);
    expect(status.statusFehler[0]).toMatchObject({ regel: "status", erwartet: 200, ist: 500 });
    expect(mergeReports([teilbericht(1, 1, { pfad: "/gibt-es-nicht-a11y", status: 404, erwartet: 404 })]).gate).toBe(false);
  });

  it("übernimmt Befunde aus dem Animationszustand mit zustand animation und zählt Snippet-Seiten", () => {
    const r = mergeReports([
      teilbericht(1, 1, {
        snippet: true,
        animation: { phasen: [1, 2, 3], gate: [{ regel: "color-contrast", wirkung: "serious", selektor: ".opening", phase: 2 }] },
      }),
    ]);
    expect(r.snippetSeiten).toBe(1);
    expect(r.gateVerstoesse[0]).toMatchObject({ regel: "color-contrast", zustand: "animation", phase: 2 });
    expect(r.gate).toBe(true);
  });

  it("wertet einen nicht gestarteten Animationszustand als Befund statt still zu bestehen", () => {
    const r = mergeReports([teilbericht(1, 1, { snippet: true, animation: { phasen: [], gate: [], fehler: "data-running blieb aus" } })]);
    expect(r.statusFehler[0]).toMatchObject({ regel: "animation", zustand: "animation", fehler: "data-running blieb aus" });
    expect(r.gate).toBe(true);
  });
});

/** Vollständiger Teilbericht eines Gesamtlaufs (HI-01): Laufkennung, Sollmenge, Optionen ohne gezielte Auswahl. */
function laufbericht(k: number, n: number, extra: Record<string, unknown> = {}) {
  return {
    ...teilbericht(k, n),
    erstellt: "2026-10-23T10:00:00.000Z",
    origin: "http://localhost:3101",
    lauf: "build-abc",
    gezielt: false,
    soll: { aufrufe: n, seiten: n },
    optionen: { breiten: [360], engines: ["chromium"], concurrency: 2, animation: "an", pfade: 0 },
    ...extra,
  };
}

describe("pruefeGesamtlauf (HI-01)", () => {
  it("lässt einen vollständigen Lauf aus allen Teilen durch", () => {
    expect(pruefeGesamtlauf([laufbericht(1, 2), laufbericht(2, 2, { erstellt: "2026-10-23T11:00:00.000Z" })])).toEqual([]);
  });

  it("lehnt einen gezielten Lauf (--paths/--widths/--engines) als Gesamtgate ab", () => {
    const f = pruefeGesamtlauf([laufbericht(1, 1, { gezielt: true, optionen: { breiten: [1440], engines: ["chromium"], animation: "an", pfade: 1 } })]);
    expect(f.join(" ")).toContain("gezielt");
  });

  it("lehnt Teilberichte im alten Format ohne Laufangaben ab", () => {
    expect(pruefeGesamtlauf([teilbericht(1, 1)]).join(" ")).toContain("ohne Laufangaben");
  });

  it("lehnt Teile aus verschiedenen Läufen ab (Laufkennung, Herkunft, Optionen, Zeitabstand)", () => {
    expect(pruefeGesamtlauf([laufbericht(1, 2), laufbericht(2, 2, { lauf: "build-alt" })]).join(" ")).toContain("verschiedenen Läufen");
    expect(pruefeGesamtlauf([laufbericht(1, 2), laufbericht(2, 2, { origin: "http://localhost:3100" })]).join(" ")).toContain("verschiedenen Läufen");
    expect(
      pruefeGesamtlauf([laufbericht(1, 2), laufbericht(2, 2, { optionen: { breiten: [360], engines: ["chromium"], concurrency: 2, animation: "aus", pfade: 0 } })]).join(" "),
    ).toContain("verschiedenen Läufen");
    expect(pruefeGesamtlauf([laufbericht(1, 2), laufbericht(2, 2, { erstellt: "2026-10-24T10:00:01.000Z" })]).join(" ")).toContain("12 Stunden");
  });

  it("verlangt, dass Aufrufe und Seiten der Sollmenge entsprechen", () => {
    const zuWenig = pruefeGesamtlauf([laufbericht(1, 2, { soll: { aufrufe: 5, seiten: 2 } }), laufbericht(2, 2, { soll: { aufrufe: 5, seiten: 2 } })]);
    expect(zuWenig.join(" ")).toContain("2 von 5 Aufrufen");
    const seiten = pruefeGesamtlauf([laufbericht(1, 2, { soll: { aufrufe: 2, seiten: 3 } }), laufbericht(2, 2, { soll: { aufrufe: 2, seiten: 3 } })]);
    expect(seiten.join(" ")).toContain("2 von 3 Seiten");
  });
});
