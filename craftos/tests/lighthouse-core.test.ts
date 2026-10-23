import { describe, expect, it } from "vitest";
import {
  A11Y_BERICHT,
  A11Y_GATE,
  GATE_ROUTEN,
  INFO_ROUTEN,
  bewerte,
  bewerteKategorie,
  hauptbefunde,
  kennzahlen,
  kennzeichnung,
  median,
  optionen,
  slug,
  zusammenfassung,
} from "../scripts/lib/lighthouse-core.mjs";

// Kleine lhr-Fixtures: nur die Felder, die lighthouse-core liest (Lighthouse 13.5.0, Kategorie Performance).
function lhr({
  score = 0.96,
  lcp = 2400,
  fcp = 1200,
  si = 1500,
  tbt = 40,
  cls = 0,
  runtimeError,
  lcpNode = "h1.hero-titel",
}: {
  score?: number | null;
  lcp?: number;
  fcp?: number;
  si?: number;
  tbt?: number;
  cls?: number;
  runtimeError?: { code: string; message: string };
  lcpNode?: string | null;
} = {}) {
  return {
    ...(runtimeError ? { runtimeError } : {}),
    categories: { performance: { score } },
    audits: {
      "largest-contentful-paint": { numericValue: lcp },
      "first-contentful-paint": { numericValue: fcp },
      "speed-index": { numericValue: si },
      "total-blocking-time": { numericValue: tbt },
      "cumulative-layout-shift": { numericValue: cls },
      interactive: { numericValue: 3000 },
      "lcp-breakdown-insight": {
        id: "lcp-breakdown-insight",
        title: "LCP-Aufschlüsselung",
        score: 0,
        metricSavings: { LCP: 0 },
        details: {
          type: "list",
          items: [
            { type: "table", items: [] },
            ...(lcpNode ? [{ type: "node", selector: lcpNode, nodeLabel: "Handwerkersoftware" }] : []),
          ],
        },
      },
      "render-blocking-insight": {
        id: "render-blocking-insight",
        title: "Rendering blockierende Anfragen",
        score: 0,
        metricSavings: { LCP: 150, FCP: 150 },
      },
      "font-display-insight": { id: "font-display-insight", title: "Schriftanzeige", score: 1, metricSavings: {} },
    },
  };
}

describe("median", () => {
  it("liefert den mittleren Wert unabhängig von der Reihenfolge", () => {
    expect(median([3, 1, 2])).toBe(2);
    expect(median([2700, 2580, 2590])).toBe(2590);
  });
  it("nimmt bei gerader Anzahl das untere Mittel und ignoriert fehlende Werte", () => {
    expect(median([2600, 2400])).toBe(2400);
    expect(median([null, 5, Number.NaN, 7, 6])).toBe(6);
    expect(median([])).toBeNull();
  });
});

describe("slug", () => {
  it("bildet Pfade auf Dateinamen ab", () => {
    expect(slug("/")).toBe("start");
    expect(slug("/funktionen/zeiterfassung")).toBe("funktionen-zeiterfassung");
    expect(slug("/preise")).toBe("preise");
  });
});

describe("kennzahlen", () => {
  it("liest Score als Prozentwert und die Metriken aus numericValue", () => {
    const k = kennzahlen(lhr({ score: 0.96, lcp: 2581.4, cls: 0.002 }));
    expect(k.score).toBe(96);
    expect(k.lcp).toBe(2581.4);
    expect(k.fcp).toBe(1200);
    expect(k.si).toBe(1500);
    expect(k.tbt).toBe(40);
    expect(k.cls).toBe(0.002);
    expect(k.lcpElement).toBe("h1.hero-titel");
    expect(k.runtimeError).toBeNull();
  });
  it("erkennt einen Lauf mit runtimeError als ungültig", () => {
    const k = kennzahlen(lhr({ score: null, runtimeError: { code: "NO_FCP", message: "Keine Inhalte" } }));
    expect(k.runtimeError).toBe("NO_FCP");
    expect(k.score).toBeNull();
  });
  it("liest das LCP-Element auch aus dem älteren Audit largest-contentful-paint-element", () => {
    const alt = lhr({ lcpNode: null }) as Record<string, unknown> & { audits: Record<string, unknown> };
    alt.audits["largest-contentful-paint-element"] = {
      details: { type: "list", items: [{ type: "table", items: [{ node: { type: "node", selector: "main > p" } }] }] },
    };
    expect(kennzahlen(alt).lcpElement).toBe("main > p");
  });
});

describe("bewerte (Gate D-11)", () => {
  it("verfehlt das Gate bei LCP ab 2500 ms", () => {
    expect(bewerte({ score: 96, lcp: 2581 })).toEqual({ bestanden: false, gruende: ["LCP 2581 ms ≥ 2500 ms"] });
  });
  it("verfehlt das Gate bei Score unter 95", () => {
    expect(bewerte({ score: 94, lcp: 2200 })).toEqual({ bestanden: false, gruende: ["Score 94 < 95"] });
  });
  it("besteht mit Score ≥ 95 und LCP < 2500 ms", () => {
    expect(bewerte({ score: 97, lcp: 2290 })).toEqual({ bestanden: true, gruende: [] });
  });
  it("wertet fehlende Werte als Verstoß statt still zu bestehen", () => {
    expect(bewerte({ score: null, lcp: null }).bestanden).toBe(false);
  });
});

describe("bewerteKategorie (10-UI-SPEC § 11 K13)", () => {
  it("verlangt Accessibility 100", () => {
    expect(bewerteKategorie("accessibility", 96)).toMatchObject({ gate: true, bestanden: false });
    expect(bewerteKategorie("accessibility", 100)).toMatchObject({ gate: true, bestanden: true });
  });
  it("berichtet SEO und Best Practices nur", () => {
    expect(bewerteKategorie("seo", 92)).toMatchObject({ gate: false, bestanden: null });
    expect(bewerteKategorie("best-practices", 78)).toMatchObject({ gate: false, bestanden: null });
  });
});

describe("hauptbefunde", () => {
  it("listet Insights mit Score unter 1, sortiert nach LCP-Ersparnis", () => {
    const b = hauptbefunde(lhr());
    expect(b.map((x: { id: string }) => x.id)).toEqual(["render-blocking-insight", "lcp-breakdown-insight"]);
    expect(b[0]).toMatchObject({ lcp: 150, fcp: 150 });
  });
});

describe("Routenlisten (D-11, K13)", () => {
  it("enthält die Startwerte der Gate-, Info- und A11y-Listen", () => {
    expect(GATE_ROUTEN).toEqual([
      "/",
      "/funktionen",
      "/funktionen/zeiterfassung",
      "/gewerke/elektriker",
      "/vergleich/plancraft-alternative",
      "/blog/handwerkerrechnung-schreiben",
    ]);
    expect(INFO_ROUTEN).toEqual(["/preise", "/app", "/hilfe/rechnung-fertigstellen", "/rechner/stundensatz"]);
    expect(A11Y_GATE).toEqual(["/impressum", ...GATE_ROUTEN]);
    expect(A11Y_BERICHT).toContain("/rechner/angebotskalkulation");
  });
});

describe("zusammenfassung", () => {
  const gute = [lhr({ score: 0.97, lcp: 2290 }), lhr({ score: 0.96, lcp: 2310 }), lhr({ score: 0.98, lcp: 2280 })];
  const schlechte = [lhr({ score: 0.9, lcp: 3100 }), lhr({ score: 0.91, lcp: 3000 }), lhr({ score: 0.89, lcp: 3200 })];
  const optionenBasis = { gate: GATE_ROUTEN, info: INFO_ROUTEN, a11yGate: A11Y_GATE, herkunft: "http://localhost:3102" };

  it("bildet Mediane je Kennzahl und kennzeichnet lokale Labordaten", () => {
    const s = zusammenfassung([{ pfad: "/", laeufe: gute.map(kennzahlen), ungueltig: 0 }], optionenBasis);
    expect(s.herkunft).toBe("http://localhost:3102");
    expect(s.kennzeichnung).toBe("Labordaten, mobil, lokal, Median aus 3 Läufen, URL");
    expect(s.urls["/"]).toMatchObject({ score: 97, lcp: 2290, laeufe: 3, ungueltig: 0, gate: { bestanden: true } });
    expect(s.gateVerletzt).toBe(false);
  });

  it("setzt gateVerletzt nicht für Info-Routen", () => {
    const s = zusammenfassung([{ pfad: "/preise", laeufe: schlechte.map(kennzahlen), ungueltig: 0 }], optionenBasis);
    expect(s.urls["/preise"].gate).toBeNull();
    expect(s.gateVerletzt).toBe(false);
  });

  it("setzt gateVerletzt für Gate-Routen und für A11y-Gate-Routen unter 100", () => {
    const perf = zusammenfassung([{ pfad: "/funktionen", laeufe: schlechte.map(kennzahlen), ungueltig: 0 }], optionenBasis);
    expect(perf.gateVerletzt).toBe(true);
    expect(perf.urls["/funktionen"].gate?.gruende).toEqual(["Score 90 < 95", "LCP 3100 ms ≥ 2500 ms"]);

    const a11y = zusammenfassung(
      [{ pfad: "/impressum", laeufe: schlechte.map(kennzahlen), ungueltig: 0, kategorien: { accessibility: 96, seo: 92 } }],
      optionenBasis,
    );
    expect(a11y.gateVerletzt).toBe(true);
    expect(a11y.urls["/impressum"].gate).toEqual({ bestanden: false, gruende: ["Accessibility 96 < 100"] });
    expect(a11y.urls["/impressum"].kategorien).toEqual({ accessibility: 96, seo: 92 });
  });

  it("kennzeichnet Live-Messungen und abweichende Laufzahlen", () => {
    const s = zusammenfassung([{ pfad: "/", laeufe: [kennzahlen(gute[0])], ungueltig: 1 }], {
      ...optionenBasis,
      herkunft: "https://craftos.eu",
      laeufe: 1,
    });
    expect(s.kennzeichnung).toBe("Labordaten, mobil, live, Median aus 1 Lauf, URL");
    expect(s.urls["/"].ungueltig).toBe(1);
    expect(kennzeichnung("https://craftos.eu", 3)).toBe("Labordaten, mobil, live, Median aus 3 Läufen, URL");
  });
});

describe("optionen (CLI --lighthouse)", () => {
  it("setzt Standardwerte", () => {
    expect(optionen(["--lighthouse"])).toEqual({
      fehler: [],
      paths: [...GATE_ROUTEN, ...INFO_ROUTEN],
      runs: 3,
      kategorien: [],
      block: null,
    });
  });
  it("liest Pfade, Läufe, Kategorien und Block", () => {
    const o = optionen(["--lighthouse", "--paths=/,/impressum", "--runs=1", "--kategorien=accessibility,seo", "--block=a"]);
    expect(o).toMatchObject({ fehler: [], paths: ["/", "/impressum"], runs: 1, kategorien: ["accessibility", "seo"], block: "a" });
  });
  it("meldet unbekannte Optionen, Kategorien, ungültige Läufe und von Git Bash umgeschriebene Pfade", () => {
    expect(optionen(["--lighthouse", "--foo"]).fehler.length).toBe(1);
    expect(optionen(["--lighthouse", "--kategorien=pwa"]).fehler.length).toBe(1);
    expect(optionen(["--lighthouse", "--runs=0"]).fehler.length).toBe(1);
    expect(optionen(["--lighthouse", "--block=../x"]).fehler.length).toBe(1);
    expect(optionen(["--lighthouse", "--paths=C:/Program Files/Git/"]).fehler[0]).toMatch(/MSYS_NO_PATHCONV=1/);
  });
});
