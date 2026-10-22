// Wettbewerberdaten (08-06, D-01, D-02, D-04, D-16; 08-UI-SPEC § 3.2 U1–U12, § 3.4 F1):
// Pflichtprovenienz je Angabe, Alterswarnung, UWG-Wortliste, Statt-/Erstjahrespreise, Stärken-Pflicht,
// HERO-Variante und zentrale Rundung der Monatswerte aus Jahresbeträgen.
import { afterEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  HERO_VARIANTE_B_HINWEIS,
  UWG_WORTLISTE,
  alterWarnung,
  craftosRechenbeispiel,
  faktenVon,
  heroPreise,
  heroVariante,
  monatAusJahr,
  pruefeText,
  pruefeWettbewerber,
  quellenFuer,
  standVon,
  uwgTreffer,
  wettbewerber,
} from "@/lib/wettbewerber";
import type { Fakt, Preis, Quelle, Wettbewerber } from "@/lib/wettbewerber/types";
import { vertrag } from "@/lib/site";

const ROOT = path.resolve(import.meta.dirname, "..");

const HEUTE = new Date(2026, 9, 22, 12);
const pad = (n: number) => String(n).padStart(2, "0");
function isoVor(tage: number, heute = HEUTE): string {
  const d = new Date(heute);
  d.setDate(d.getDate() - tage);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const PREISE: Quelle = { label: "plancraft: Preise", url: "https://plancraft.com/de-de/preise" };
const KLEIN: Quelle = { label: "plancraft: Kleinbetriebe", url: "https://plancraft.com/de-de/handwerkersoftware-kleinbetriebe" };
const fakt = <T,>(wert: T, abgerufenAm = "2026-10-22", quelle: Quelle = PREISE): Fakt<T> => ({ wert, quelle, abgerufenAm });

function fixture(over: Partial<Wettbewerber> = {}): Wettbewerber {
  return {
    slug: "plancraft",
    name: "plancraft",
    domain: "plancraft.com",
    testphaseTage: fakt(7, "2026-10-21", KLEIN),
    laufzeit: fakt("1 Monat"),
    preise: fakt([{ paket: "Business", centsMonat: 7490, centsJahrJeMonat: 5990 }]),
    kriterien: { kiTelefon: fakt(true), datev: fakt("In allen Paketen") },
    staerken: [fakt("Erste belegte Stärke."), fakt("Zweite belegte Stärke.")],
    ...over,
  };
}

const ohneBeleg = (feld: string) => `Wettbewerber plancraft: Angabe ${feld} ohne quelle oder abgerufenAm – im Datenmodul ergänzen.`;

afterEach(() => vi.restoreAllMocks());

describe("Rundung F1: Monatswerte aus Jahresbeträgen in Cent aus der Summe", () => {
  it("1 Voll- + 4 App-Lizenzen ergeben 58,13 € (nicht 58,12 €), eine Voll-Lizenz 24,96 €", () => {
    expect(monatAusJahr([29950, 9950, 9950, 9950, 9950])).toBe(5813);
    expect(monatAusJahr([29950])).toBe(2496);
    expect(monatAusJahr([9950])).toBe(829);
  });
  it("CraftOS-Rechenbeispiel aus tarife: 58,13 € im Jahresabo, 69,75 € im Monatsabo je Monat", () => {
    expect(craftosRechenbeispiel({ voll: 1, app: 4 })).toEqual({ jahrJeMonatCents: 5813, monatCents: 6975 });
    expect(craftosRechenbeispiel({ voll: 1, app: 0 })).toEqual({ jahrJeMonatCents: 2496, monatCents: 2995 });
  });
});

describe("Provenienz je Angabe (U1, D-04)", () => {
  it("vollständig belegter Wettbewerber besteht", () => {
    expect(() => pruefeWettbewerber(fixture(), HEUTE)).not.toThrow();
  });
  it("fehlende Quelle oder fehlendes Abrufdatum", () => {
    const ohneQuelle = { wert: 7, abgerufenAm: "2026-10-22" } as unknown as Fakt<number>;
    expect(() => pruefeWettbewerber(fixture({ testphaseTage: ohneQuelle }), HEUTE)).toThrow(ohneBeleg("testphaseTage"));
    const ohneDatum = { wert: true, quelle: PREISE } as unknown as Fakt<boolean>;
    expect(() => pruefeWettbewerber(fixture({ kriterien: { kiTelefon: ohneDatum } }), HEUTE)).toThrow(
      ohneBeleg("kriterien.kiTelefon"),
    );
  });
  it("http-URL, fremde Domain und Domain-Anhängsel werden abgelehnt", () => {
    for (const url of [
      "http://plancraft.com/de-de/preise",
      "https://example.com/plancraft",
      "https://plancraft.com.example.org/preise",
      "https://evilplancraft.com/preise",
    ]) {
      const w = fixture({ laufzeit: fakt("1 Monat", "2026-10-22", { label: "x", url }) });
      expect(() => pruefeWettbewerber(w, HEUTE), url).toThrow(ohneBeleg("laufzeit"));
    }
    const sub = fixture({ laufzeit: fakt("1 Monat", "2026-10-22", { label: "Hilfe", url: "https://www.plancraft.com/x" }) });
    expect(() => pruefeWettbewerber(sub, HEUTE)).not.toThrow();
  });
  it("ungültiges oder zukünftiges Datum", () => {
    for (const datum of ["2026-13-01", "2026-02-30", "22.10.2026", "", "2026-10-23"]) {
      const w = fixture({ staerken: [fakt("Erste belegte Stärke."), fakt("Zweite belegte Stärke.", datum)] });
      expect(() => pruefeWettbewerber(w, HEUTE), datum).toThrow(ohneBeleg("staerken.1"));
    }
  });
});

describe("Alterswarnung (D-04): Warnung ohne Abbruch", () => {
  it("Stand älter als 60 Tage → console.warn, kein Fehler", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const alt = isoVor(61, new Date());
    const w = fixture({ laufzeit: fakt("1 Monat", alt) });
    expect(() => alterWarnung(w)).not.toThrow();
    expect(warn).toHaveBeenCalledWith(
      `Wettbewerber plancraft: Stand ${alt} ist älter als 60 Tage – Angaben neu prüfen und abgerufenAm aktualisieren.`,
    );
    expect(() => pruefeWettbewerber(w)).not.toThrow();
  });
  it("genau 60 Tage alt → keine Warnung", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const w = fixture({
      testphaseTage: fakt(7, isoVor(60), KLEIN),
      laufzeit: fakt("1 Monat", isoVor(60)),
      preise: fakt([{ paket: "Business", centsMonat: 7490 }], isoVor(60)),
      kriterien: { kiTelefon: fakt(true, isoVor(60)) },
      staerken: [fakt("Erste belegte Stärke.", isoVor(60)), fakt("Zweite belegte Stärke.", isoVor(60))],
    });
    expect(alterWarnung(w, HEUTE)).toBeUndefined();
    expect(warn).not.toHaveBeenCalled();
  });
});

describe("UWG-Wortliste (U7)", () => {
  it("enthält alle Wörter laut UI-SPEC U7 plus „Aktionspreis“", () => {
    expect([...UWG_WORTLISTE]).toEqual([
      "besser als",
      "billiger als",
      "günstiger als",
      "die beste",
      "Testsieger",
      "Nr. 1",
      "führend",
      "Marktführer",
      "veraltet",
      "teuer",
      "versteckte Kosten",
      "Abzocke",
      "fehlt",
      "im Gegensatz zu",
      "schlechter",
      "umständlich",
      "Aktionspreis",
    ]);
  });
  it("trifft mit Wortgrenzen und ohne Groß-/Kleinschreibung", () => {
    expect(uwgTreffer("CraftOS ist besser als andere.")).toBe("besser als");
    expect(uwgTreffer("Der TESTSIEGER 2026")).toBe("Testsieger");
    expect(uwgTreffer("Aktionspreis statt 69,90 €")).toBe("Aktionspreis");
    expect(uwgTreffer("Die Plantafel fehlt dort.")).toBe("fehlt");
    expect(uwgTreffer("Alle Preise zzgl. Umsatzsteuer.")).toBeUndefined();
    expect(uwgTreffer("DATEV-Export für die Steuerberatung.")).toBeUndefined();
    expect(uwgTreffer("Die Angabe fehlte bisher.")).toBeUndefined();
    expect(uwgTreffer("Nr. 10 der Liste")).toBeUndefined();
  });
  it("pruefeText wirft mit Abhilfe", () => {
    expect(() => pruefeText("Das ist besser als alles.")).toThrow(
      "Vergleichstext enthält ‚besser als‘ – sachlich formulieren (UWG-Wortliste).",
    );
    expect(() => pruefeText("Belegte, sachliche Angabe.")).not.toThrow();
  });
  it("pruefeWettbewerber prüft alle Texte des Moduls", () => {
    const w = fixture({ staerken: [fakt("Erste belegte Stärke."), fakt("Nicht teuer im Einstieg.")] });
    expect(() => pruefeWettbewerber(w, HEUTE)).toThrow("Vergleichstext enthält ‚teuer‘");
  });
});

describe("Preisfelder (U3), Stärken (U6), Ankündigungen (U9), Schreibweise (U8)", () => {
  it("regulaerDerzeitCents nur zusammen mit ersterJahrespreis", () => {
    const falsch = fixture({ preise: fakt([{ paket: "Team", centsJahrJeMonat: 14500, regulaerDerzeitCents: 14900 }]) });
    expect(() => pruefeWettbewerber(falsch, HEUTE)).toThrow(/regulaerDerzeitCents/);
    const richtig = fixture({
      preise: fakt([{ paket: "Team", centsJahrJeMonat: 14500, ersterJahrespreis: true, regulaerDerzeitCents: 14900 }]),
    });
    expect(() => pruefeWettbewerber(richtig, HEUTE)).not.toThrow();
  });
  it("stattCents nur mit Preis und nur über dem Preis", () => {
    const ohnePreis = fixture({ preise: fakt([{ paket: "Büro Plus", stattCents: 6990 }]) });
    expect(() => pruefeWettbewerber(ohnePreis, HEUTE)).toThrow(/stattCents/);
    const kleiner = fixture({ preise: fakt([{ paket: "Büro Plus", centsJahrJeMonat: 4990, stattCents: 3990 }]) });
    expect(() => pruefeWettbewerber(kleiner, HEUTE)).toThrow(/stattCents/);
  });
  it("mindestens 2 belegte Stärken; kein Pflichtkriterium, das CraftOS nicht anbietet (Inhaber 22.10.2026)", () => {
    expect(() => pruefeWettbewerber(fixture({ staerken: [fakt("Nur eine Stärke.")] }), HEUTE)).toThrow(
      "Wettbewerber plancraft: staerken hat 1 Einträge – mindestens 2 belegte Stärken erforderlich (U6).",
    );
    // Inhaber 22.10.2026 („Nur, was unterstützt wird“): Fairness über die belegten Stärken, nicht über CraftOS-„Nein“.
    expect(() => pruefeWettbewerber(fixture({ kriterien: { datev: fakt(true) } }), HEUTE)).not.toThrow();
    const doppelt = fixture({ staerken: [fakt("Gleiche Stärke."), fakt("Gleiche Stärke.")] });
    expect(() => pruefeWettbewerber(doppelt, HEUTE)).toThrow(/doppelt/);
  });
  it("keine Ankündigungen in Modultexten", () => {
    for (const text of ["Ein Telefon-Agent ist angekündigt.", "MCP-Server folgt.", "Das Modul ist geplant."]) {
      const w = fixture({ staerken: [fakt("Erste belegte Stärke."), fakt(text)] });
      expect(() => pruefeWettbewerber(w, HEUTE), text).toThrow(/U9/);
    }
    const eingeplant = fixture({ staerken: [fakt("Erste belegte Stärke."), fakt("Einsätze werden eingeplant.")] });
    expect(() => pruefeWettbewerber(eingeplant, HEUTE)).not.toThrow();
  });
  it("Anbieterschreibweise passt zum slug", () => {
    const w = fixture({ name: "Craftnote" });
    expect(() => pruefeWettbewerber(w, HEUTE)).toThrow(/Schreibweise/);
  });
});

describe("HERO-Variante (D-16, U11)", () => {
  const HERO_Q: Quelle = { label: "HERO: Preise", url: "https://hero-software.de/preise" };
  const heroFakt = <T,>(wert: T): Fakt<T> => ({ wert, quelle: HERO_Q, abgerufenAm: "2026-10-22" });
  const hero = (over: Partial<Wettbewerber> = {}): Wettbewerber => ({
    slug: "hero",
    name: "HERO",
    domain: "hero-software.de",
    testphaseTage: heroFakt(14),
    laufzeit: heroFakt("12 Monate"),
    preise: heroFakt([{ paket: "HERO Select" }, { paket: "HERO OS" }]),
    kriterien: { kiTelefon: heroFakt("ab HERO OS") },
    staerken: [heroFakt("Erste belegte Stärke."), heroFakt("Zweite belegte Stärke.")],
    preiseBelegt: null,
    ...over,
  });
  const belegt = { screenshotMonatlich: "docs/seo/belege/m.png", screenshotJaehrlich: "docs/seo/belege/j.png", datum: "2026-10-22" };

  it("ohne Screenshot-Beleg Variante B, keine Preise", () => {
    expect(heroVariante(hero())).toBe("B");
    expect(heroVariante(hero({ preiseBelegt: undefined }))).toBe("B");
    expect(heroVariante(hero({ preiseBelegt: { ...belegt, datum: "" } }))).toBe("B");
    expect(heroVariante(hero({ preiseBelegt: { ...belegt, screenshotJaehrlich: "" } }))).toBe("B");
    expect(heroPreise(hero())).toEqual([]);
    expect(HERO_VARIANTE_B_HINWEIS).toBe("HERO-Preise ohne Screenshot-Beleg – Variante B ohne Zahlen rendern (D-16).");
  });
  it("mit beiden Screenshots und Datum Variante A", () => {
    const preise = [{ paket: "HERO Select", centsJahrJeMonat: 6900, centsMonat: 7900, ab: true }];
    const w = hero({ preiseBelegt: belegt, preise: heroFakt(preise) });
    expect(heroVariante(w)).toBe("A");
    expect(heroPreise(w)).toEqual(preise);
    expect(() => pruefeWettbewerber(w, HEUTE)).not.toThrow();
  });
  it("Variante B mit Preiszahlen wird abgelehnt", () => {
    const w = hero({ preise: heroFakt([{ paket: "HERO Select", centsMonat: 7900 }]) });
    expect(() => pruefeWettbewerber(w, HEUTE)).toThrow(HERO_VARIANTE_B_HINWEIS);
  });
});

describe("Stand und Quellen", () => {
  it("standVon = jüngstes abgerufenAm aller Fakten", () => {
    const w = fixture({ laufzeit: fakt("1 Monat", "2026-10-01"), testphaseTage: fakt(7, "2026-09-30", KLEIN) });
    expect(standVon(w)).toBe("2026-10-22");
    const alt = fixture({
      testphaseTage: fakt(7, "2026-10-01", KLEIN),
      laufzeit: fakt("1 Monat", "2026-10-02"),
      preise: fakt([{ paket: "Business", centsMonat: 7490 }], "2026-10-03"),
      kriterien: { kiTelefon: fakt(true, "2026-10-01") },
      staerken: [fakt("Erste belegte Stärke.", "2026-10-01"), fakt("Zweite belegte Stärke.", "2026-10-01")],
    });
    expect(standVon(alt)).toBe("2026-10-03");
  });
  it("quellenFuer liefert eindeutige Quellen der genutzten Fakten mit Anbieter und Abrufdatum", () => {
    const w = fixture();
    expect(quellenFuer(w, ["preise", "laufzeit"])).toEqual([
      { anbieter: "plancraft", label: PREISE.label, url: PREISE.url, abgerufenAm: "2026-10-22" },
    ]);
    expect(quellenFuer(w, ["testphaseTage"])).toEqual([
      { anbieter: "plancraft", label: KLEIN.label, url: KLEIN.url, abgerufenAm: "2026-10-21" },
    ]);
    expect(quellenFuer(w, ["kriterien"]).map((q) => q.url)).toEqual([PREISE.url]);
    expect(quellenFuer(w).map((q) => q.url)).toEqual([KLEIN.url, PREISE.url]);
  });
});

describe("CraftOS-Vertragskonstante (AGB § 5)", () => {
  it("vertrag aus lib/site.ts", () => {
    expect(vertrag).toEqual({ monat: "monatlich kündbar", jahr: "zum Ende der Laufzeit kündbar" });
  });
});

// ---------------------------------------------------------------------------------------------------------------
// Datenmodule (Neuprüfung 22.10.2026): alle vier Wettbewerber
// ---------------------------------------------------------------------------------------------------------------

const DOMAINS: Record<string, string> = {
  plancraft: "plancraft.com",
  craftnote: "craftnote.de",
  hero: "hero-software.de",
  tooltime: "tooltime.app",
};
const modul = (slug: string) => wettbewerber.find((w) => w.slug === slug)!;
const quelltext = (slug: string) => fs.readFileSync(path.join(ROOT, "lib/wettbewerber", `${slug}.ts`), "utf8");
const heute = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const preis = (w: Wettbewerber, paket: string): Preis => w.preise.wert.find((p) => p.paket === paket)!;
const zusatz = (w: Wettbewerber, key: string): Preis => w.zusatzPreise![key].wert;

describe("Datenmodule: Provenienz, UWG, Ankündigungen (alle vier)", () => {
  it("Liste in fester Reihenfolge mit Anbieterschreibweise", () => {
    expect(wettbewerber.map((w) => [w.slug, w.name, w.domain])).toEqual([
      ["plancraft", "plancraft", "plancraft.com"],
      ["craftnote", "Craftnote", "craftnote.de"],
      ["hero", "HERO", "hero-software.de"],
      ["tooltime", "ToolTime", "tooltime.app"],
    ]);
  });

  for (const slug of Object.keys(DOMAINS)) {
    it(`${slug}: pruefeWettbewerber besteht, jede Quelle https auf ${DOMAINS[slug]}, Datum ≤ heute`, () => {
      const w = modul(slug);
      expect(() => pruefeWettbewerber(w)).not.toThrow();
      for (const { feld, fakt } of faktenVon(w)) {
        expect(fakt.quelle.url, feld).toMatch(/^https:\/\//);
        const host = new URL(fakt.quelle.url).hostname;
        expect(host === DOMAINS[slug] || host.endsWith(`.${DOMAINS[slug]}`), `${feld}: ${host}`).toBe(true);
        expect(fakt.abgerufenAm <= heute(), feld).toBe(true);
      }
      expect(w.staerken.length).toBeGreaterThanOrEqual(2);
    });

    it(`${slug}: Quelltext ohne Ankündigung, UWG-Wort und http://`, () => {
      const text = quelltext(slug);
      expect(text).not.toMatch(/Telefon-Agent|MCP-Server|angekündigt|(?<!\p{L})geplant/u);
      expect(uwgTreffer(text)).toBeUndefined();
      expect(text).not.toContain("http://");
      expect((text.match(/https:\/\//g) ?? []).length).toBeGreaterThanOrEqual(2);
    });
  }

  it("Alterswarnung über alle Module ist nur eine Warnung", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    for (const w of wettbewerber) expect(() => alterWarnung(w)).not.toThrow();
  });
});

describe("Datenmodule: Werte laut Neuprüfung", () => {
  it("plancraft: Zweijahrespreis, DATEV in allen Paketen, GAEB ab Pro, Testphase", () => {
    const w = modul("plancraft");
    expect(preis(w, "Business")).toMatchObject({ centsMonat: 7490, centsJahrJeMonat: 5990, centsZweiJahreJeMonat: 4792 });
    expect(preis(w, "Pro")).toMatchObject({ centsMonat: 13990, centsJahrJeMonat: 10990, centsZweiJahreJeMonat: 8792 });
    expect(preis(w, "Premium")).toMatchObject({ centsMonat: 24990, centsJahrJeMonat: 19990, centsZweiJahreJeMonat: 15992 });
    expect(w.kriterien.datev?.wert).toBe("In allen Paketen");
    expect(w.kriterien.gaeb?.wert).toBe("ab Pro");
    expect(w.testphaseTage.wert).toBe(7);
    expect(w.laufzeit.wert).toBe("1 Monat");
  });

  it("Craftnote: Laufzeit 12 Monate mit drei Monaten Frist laut Preisseite, Büro Plus mit Statt-Preis", () => {
    const w = modul("craftnote");
    expect(w.laufzeit.wert).toBe("12 Monate");
    expect(w.laufzeit.quelle.url).toBe("https://craftnote.de/preise/");
    expect(w.kuendigung?.quelle.url).toBe("https://craftnote.de/preise/");
    expect(w.kuendigung?.zitat).toContain("Kündigungsfrist von drei (3) Monaten");
    expect(quelltext("craftnote")).not.toContain("hilfe.mycraftnote");
    expect(preis(w, "Büro Plus")).toMatchObject({ centsJahrJeMonat: 4990, stattCents: 6990 });
    expect(preis(w, "Baustelle").centsJahrJeMonat).toBe(1490);
    expect(w.testphaseTage.wert).toBe(30);
    expect(w.kriterien.gaeb).toBeUndefined();
  });

  it("HERO: E-Rechnung „erstellen“, kein DATEV/GAEB, Laufzeit laut AGB", () => {
    const w = modul("hero");
    expect(String(w.kriterien.eRechnung?.wert)).toContain("erstellen");
    expect(w.kriterien.datev).toBeUndefined();
    expect(w.kriterien.gaeb).toBeUndefined();
    expect(w.laufzeit.quelle.url).toBe("https://hero-software.de/rechtliches/agb");
    expect(w.testphaseTage.wert).toBe(14);
    expect(quelltext("hero")).not.toMatch(/Einführungs/);
  });

  it("ToolTime: Jahresabo-Preise als Erstjahrespreise mit regulär derzeit, Frist in Tagen als Feld", () => {
    const w = modul("tooltime");
    for (const p of w.preise.wert) {
      expect(p.ersterJahrespreis, p.paket).toBe(true);
      expect(p.regulaerDerzeitCents, p.paket).toBeGreaterThan(p.centsJahrJeMonat!);
    }
    expect(preis(w, "Team")).toMatchObject({ centsMonat: 16900, centsJahrJeMonat: 14500, regulaerDerzeitCents: 14900 });
    expect(w.kuendigungsfristTage?.wert).toBe(30);
    expect(w.kriterien.eRechnung?.wert).toBe("XRechnung und ZUGFeRD");
    expect(w.testphaseTage.wert).toBe(7);
  });

  it("U6 (Inhaber 22.10.2026): jeder Wettbewerber hat mindestens 2 belegte Stärken für „Wann {Name} passt“", () => {
    for (const w of wettbewerber) expect(w.staerken.length, w.slug).toBeGreaterThanOrEqual(2);
  });
});

describe("HERO-Beleg (D-16): Variante A genau dann, wenn beide Screenshots existieren", () => {
  const w = () => modul("hero");
  it("Variante folgt den Dateien unter docs/seo/belege/", () => {
    const b = w().preiseBelegt;
    const dateienDa =
      !!b && fs.existsSync(path.join(ROOT, b.screenshotMonatlich)) && fs.existsSync(path.join(ROOT, b.screenshotJaehrlich));
    expect(heroVariante(w())).toBe(dateienDa && b?.datum ? "A" : "B");
    if (b) {
      for (const datei of [b.screenshotMonatlich, b.screenshotJaehrlich]) {
        expect(datei).toMatch(/^docs\/seo\/belege\/\d{4}-\d{2}-\d{2}-hero-preise-(monatlich|jaehrlich)\.(png|jpg)$/);
        expect(fs.statSync(path.join(ROOT, datei)).size).toBeLessThanOrEqual(300 * 1024);
      }
    }
  });
  it("Variante B: keine Preiszahlen; Variante A: Zuordnung laut Screenshot", () => {
    const h = w();
    if (heroVariante(h) === "B") {
      expect(heroPreise(h)).toEqual([]);
      for (const p of [...h.preise.wert, ...Object.values(h.zusatzPreise ?? {}).map((f) => f.wert)])
        expect(Object.keys(p).filter((k) => k.toLowerCase().includes("cents")), p.paket).toEqual([]);
    } else {
      expect(heroPreise(h).find((p) => p.paket === "HERO Select")).toMatchObject({ centsJahrJeMonat: 6900, centsMonat: 7900, ab: true });
      expect(zusatz(h, "appLizenz")).toMatchObject({ centsJahrJeMonat: 2200, centsMonat: 2500 });
    }
  });
});

describe("Rechenbeispiele aus den Daten (UI-SPEC § 3.4/§ 3.6/§ 4, F1)", () => {
  it("CraftOS 1 Voll + 4 App: 58,13 € im Jahresabo je Monat, 69,75 € im Monatsabo", () => {
    expect(craftosRechenbeispiel({ voll: 1, app: 4 })).toEqual({ jahrJeMonatCents: 5813, monatCents: 6975 });
  });
  it("plancraft Business + 4 Mobilzugänge + Plantafel-Modul: 179,40 € jährlich, 224,40 € monatlich", () => {
    const w = modul("plancraft");
    const b = preis(w, "Business");
    const m = zusatz(w, "mobilzugang");
    const t = zusatz(w, "plantafel");
    expect(b.centsJahrJeMonat! + 4 * m.centsJahrJeMonat! + t.centsJahrJeMonat!).toBe(17940);
    expect(b.centsMonat! + 4 * m.centsMonat! + t.centsMonat!).toBe(22440);
  });
  it("Craftnote 1 Büro Plus + 4 Baustelle: 109,50 €, mit Statt-Preis gerechnet 129,50 €", () => {
    const w = modul("craftnote");
    const bp = preis(w, "Büro Plus");
    const bs = preis(w, "Baustelle");
    expect(bp.centsJahrJeMonat! + 4 * bs.centsJahrJeMonat!).toBe(10950);
    expect(bp.stattCents! + 4 * bs.centsJahrJeMonat!).toBe(12950);
  });
  it("HERO Select + 4 App-Lizenzen (nur Variante A): ab 157 € jährlich, ab 179 € monatlich", () => {
    const h = modul("hero");
    if (heroVariante(h) === "B") return;
    const s = heroPreise(h).find((p) => p.paket === "HERO Select")!;
    const a = zusatz(h, "appLizenz");
    expect(s.centsJahrJeMonat! + 4 * a.centsJahrJeMonat!).toBe(15700);
    expect(s.centsMonat! + 4 * a.centsMonat!).toBe(17900);
  });
  it("Marktspanne /preise: kleinstes Paket mit Monatspreis zwischen 29,95 € und 89 €; Testphasen 7 bis 30", () => {
    const kleinste = wettbewerber
      .map((w) => (w.slug === "hero" ? heroPreise(w) : w.preise.wert)[0]?.centsMonat)
      .filter((c): c is number => c !== undefined);
    const craftos = craftosRechenbeispiel({ voll: 1, app: 0 }).monatCents;
    expect(Math.min(craftos, ...kleinste)).toBe(2995);
    expect(Math.max(craftos, ...kleinste)).toBe(8900);
    const tage = wettbewerber.map((w) => w.testphaseTage.wert);
    expect([Math.min(...tage), Math.max(...tage)]).toEqual([7, 30]);
  });
});
