// Wettbewerberdaten (08-06, D-01, D-02, D-04, D-16; 08-UI-SPEC § 3.2 U1–U12, § 3.4 F1):
// Pflichtprovenienz je Angabe, Alterswarnung, UWG-Wortliste, Statt-/Erstjahrespreise, Stärken-Pflicht,
// HERO-Variante und zentrale Rundung der Monatswerte aus Jahresbeträgen.
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  HERO_VARIANTE_B_HINWEIS,
  UWG_WORTLISTE,
  alterWarnung,
  craftosRechenbeispiel,
  heroPreise,
  heroVariante,
  monatAusJahr,
  pruefeText,
  pruefeWettbewerber,
  quellenFuer,
  standVon,
  uwgTreffer,
} from "@/lib/wettbewerber";
import type { Fakt, Quelle, Wettbewerber } from "@/lib/wettbewerber/types";
import { vertrag } from "@/lib/site";

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
  it("mindestens 2 belegte Stärken und 1 Kriterium, das CraftOS nicht anbietet", () => {
    expect(() => pruefeWettbewerber(fixture({ staerken: [fakt("Nur eine Stärke.")] }), HEUTE)).toThrow(
      "Wettbewerber plancraft: staerken hat 1 Einträge – mindestens 2 belegte Stärken erforderlich (U6).",
    );
    expect(() => pruefeWettbewerber(fixture({ kriterien: { datev: fakt(true) } }), HEUTE)).toThrow(/\(U6\)/);
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
