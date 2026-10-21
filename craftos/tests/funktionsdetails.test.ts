/**
 * Funktionsdetailseiten (Phase 7, Plan 07-04; FEAT-02, DESIGN-02, SEO-02, MEDIA-01; D-02, D-03, D-04, D-11, D-19, D-23).
 * Builder und Vorlage werden mit Fremddaten geprüft: Die Fixtures stehen nur hier, nicht im Produktcode.
 * Die echten Inhalte (lib/funktionsdetails/{gruppe}.ts) folgen in 07-05/07-06 und laufen dann über ERWARTET.
 */
import fs from "node:fs";
import path from "node:path";
import { Calculator, Copy, FileInput, FileOutput, BookOpen, Import, Info, Ruler, Signature } from "lucide-react";
import { describe, expect, it } from "vitest";
import { getFunktion, type Funktion } from "@/lib/funktionen";
import {
  INHALTE,
  SNIPPET_VARIANTE,
  buildFunktionsdetail,
  getFunktionsdetail,
  getFunktionsdetailAus,
  zielwerte,
} from "@/lib/funktionsdetails";
import type { FunktionsdetailInhalt, Kernpunkt, RolleName } from "@/lib/funktionsdetails/types";
import { getFunktionsgruppen } from "@/lib/funktionsgruppen";
import { keywordMap } from "@/lib/keyword-map";
import { angebotScene, cardScenes, kopfVisuals } from "@/lib/scenes";

const ROOT = path.resolve(import.meta.dirname, "..");
const gruppen = getFunktionsgruppen();

/** Gültiges Fremddaten-Inhaltsobjekt für den realen Slug „angebote“ (Texte nach 07-UI-SPEC). */
function angeboteInhalt(): FunktionsdetailInhalt {
  return {
    slug: "angebote",
    kopfwort: "Angebotssoftware,",
    lead: "Positionen mit Lohn, Material und Zuschlägen kalkulieren und als PDF mit Ihrem Briefpapier ausgeben.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/angebot-entwurf-anlegen" },
    ablauf: {
      title: "So entsteht ein Angebot",
      lead: "Vom Entwurf bis zur Unterschrift bleibt jedes Angebot beim Projekt.",
      steps: [
        { title: "Entwurf anlegen", text: "Angebotsentwurf mit Kunde und Projektbezug anlegen." },
        { title: "Positionen kalkulieren", text: "Lohn, Material, Geräte und Zuschläge je Position kalkulieren." },
        { title: "Mengen übernehmen", text: "Geprüfte Mengen aus dem Aufmaß als Positionen verwenden." },
        { title: "PDF ausgeben", text: "Angebot prüfen und als PDF mit Ihrem Briefpapier ausgeben." },
        { title: "Online unterschreiben lassen", text: "Ihr Kunde nimmt das Angebot online an und unterschreibt es." },
      ],
    },
    rollen: {
      title: "Wer mit Angeboten arbeitet",
      lead: "Kalkuliert wird im Web, unterschrieben wird je nach Rolle auch in der App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung", zusatz: "eigene Projekte" }],
          satz: "Im Büro kalkulieren Sie Positionen und geben das Angebot als PDF aus.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [],
          satz: "Dokumente unterschreiben Sie je nach Rolle und Freigabe in der App.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Angebotssoftware abdeckt",
      lead: "Kalkulation, Mengen und Unterschrift greifen in einem Ablauf ineinander.",
      tiles: [
        {
          size: "md",
          title: "Kosten nachvollziehen",
          text: "Lohn, Material, Geräte, Fremdleistungen und weitere Kosten je Position kalkulieren.",
          visual: { kind: "icon", icon: Calculator },
        },
        {
          size: "sm",
          title: "Positionen wiederverwenden",
          text: "Eigene Artikel und Leistungsvorlagen sparen wiederholte Eingaben.",
          visual: { kind: "icon", icon: Copy },
        },
        {
          size: "sm",
          title: "Mengen übernehmen",
          text: "Geprüfte Aufmaßmengen als Angebotspositionen verwenden.",
          visual: { kind: "icon", icon: Ruler },
        },
        {
          size: "wide",
          title: "Angebotsunterschrift online",
          text: "Ihr Kunde nimmt das Angebot online an und unterschreibt es oder sendet eine Ablehnung.",
          visual: { kind: "icon", icon: Signature },
          zusatz: "angebotsunterschrift",
        },
        {
          size: "wide",
          title: "DATANORM nicht pauschal zugesagt",
          text: "Prüfen Sie Ihre Lieferantendatei, eine pauschale DATANORM-v5-Kompatibilität wird nicht zugesagt.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Angebotssoftware",
      lead: "Kurze Antworten zu Unterschrift, Kalkulation und Ausgabe.",
      items: [
        {
          q: "Kann mein Kunde das Angebot online unterschreiben?",
          a: "Ja. Ihr Kunde nimmt das Angebot online an und unterschreibt es oder sendet eine Ablehnung.",
        },
        {
          q: "Welche Kosten kann ich je Position kalkulieren?",
          a: "Lohn, Material, Geräte, Fremdleistungen und weitere Kosten kalkulieren Sie je Position.",
        },
        {
          q: "Kann ich Mengen aus dem Aufmaß übernehmen?",
          a: "Ja. Geprüfte Mengen aus dem Aufmaß verwenden Sie als Angebotspositionen.",
        },
      ],
    },
    verwandt: ["aufmass", "gaeb", "projektverwaltung"],
  };
}

/** Gültiges Fremddaten-Inhaltsobjekt für „gaeb“ (Web-only, ohne FeatureSnippet). */
function gaebInhalt(): FunktionsdetailInhalt {
  return {
    slug: "gaeb",
    kopfwort: "GAEB-Software",
    lead: "Leistungsverzeichnisse als GAEB X83 importieren, Angebote als X84 abgeben und Artikel per DATANORM einlesen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/gaeb-importieren" },
    ablauf: {
      title: "So arbeiten Sie mit GAEB-Dateien",
      lead: "Vom Leistungsverzeichnis bis zur Angebotsabgabe bleiben die Positionen beim Projekt.",
      steps: [
        { title: "X83 importieren", text: "Leistungsverzeichnis als X83 einlesen und Positionen in der Vorschau wählen." },
        { title: "Angebot kalkulieren", text: "Die übernommenen Positionen wie gewohnt mit Preisen kalkulieren." },
        { title: "X84 exportieren", text: "Nach Preisbestätigung die Angebotsabgabe als X84 erzeugen." },
      ],
    },
    rollen: {
      title: "Wer GAEB-Dateien bearbeitet",
      lead: "Import und Export laufen in der Web-App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung", zusatz: "eigene Projekte" }],
          satz: "Im Büro lesen Sie Leistungsverzeichnisse ein und geben Angebote ab.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die GAEB-Software abdeckt",
      lead: "Import, Export und Kataloge greifen beim Angebot ineinander.",
      tiles: [
        {
          size: "md",
          title: "X83 mit Positionsvorschau",
          text: "Leistungsverzeichnisse einlesen und Positionen in der Vorschau gezielt auswählen.",
          visual: { kind: "icon", icon: FileInput },
        },
        {
          size: "sm",
          title: "X84 Angebotsabgabe",
          text: "Der Export setzt eine importierte Original-X83 voraus.",
          visual: { kind: "icon", icon: FileOutput },
        },
        {
          size: "sm",
          title: "DATANORM-Kataloge",
          text: "Kataloge einlesen und fehlerhafte Zeilen prüfen.",
          visual: { kind: "icon", icon: BookOpen },
        },
        {
          size: "wide",
          title: "Universalimport erkennt GAEB",
          text: "Der Universalimport erkennt GAEB-Dateien an ihrer Dateiendung.",
          visual: { kind: "icon", icon: Import },
        },
        {
          size: "wide",
          title: "Nur GAEB DA XML",
          text: "GAEB 90 und GAEB 2000 werden nicht unterstützt, Dateien sind bis 5 MiB in UTF-8 möglich.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur GAEB-Software",
      lead: "Kurze Antworten zu Formaten, Import und Export.",
      items: [
        {
          q: "Welche GAEB-Formate unterstützt CraftOS?",
          a: "CraftOS importiert X83 und exportiert X83 und X84. GAEB 90 und GAEB 2000 werden nicht unterstützt.",
        },
        {
          q: "Kann ich Positionen vor dem Import auswählen?",
          a: "Ja. Die Positionsvorschau zeigt das Leistungsverzeichnis, bevor Sie Positionen übernehmen.",
        },
        {
          q: "Wie groß darf eine GAEB-Datei sein?",
          a: "Dateien sind bis 5 MiB in UTF-8 möglich.",
        },
      ],
    },
    verwandt: ["angebote", "aufmass"],
  };
}

function baue(inhalt: FunktionsdetailInhalt, funktion?: Funktion) {
  return buildFunktionsdetail({
    inhalt,
    funktion: funktion ?? getFunktion(inhalt.slug)!,
    ziel: zielwerte("/funktionen/" + inhalt.slug),
    gruppen,
    visual: kopfVisuals[inhalt.slug],
  });
}

function mitKacheln(tiles: Kernpunkt[]): FunktionsdetailInhalt {
  const inhalt = angeboteInhalt();
  return { ...inhalt, kernpunkte: { ...inhalt.kernpunkte, tiles } };
}

const kachel = (size: Kernpunkt["size"], title: string, extra: Partial<Kernpunkt> = {}): Kernpunkt => ({
  size,
  title,
  text: "Ein kurzer belegter Satz zur Kachel.",
  visual: { kind: "icon", icon: Calculator },
  ...extra,
});

/**
 * Erwartungstabellen je Slug (07-UI-SPEC: Pflichtfrage, Verwandt, Anordnung, Web-/Mobile-Rollen, Sekundärlink).
 * 07-05/07-06 tragen hier je Inhaltsmodul die Werte aus dem UI-SPEC ein; der Fall unten prüft jeden Schlüssel aus INHALTE.
 */
interface Erwartung {
  pflichtfrage: string;
  verwandt: string[];
  anordnung: string;
  webRollen: RolleName[];
  mobileRollen: RolleName[] | null;
  sekundaer: { label: string; href: string };
}
const ERWARTET: Record<string, Erwartung> = {};

describe("Zielwerte aus der Keyword-Map", () => {
  it("zielwerte liefert Title, Title ohne Marke, H1, Description und Keyword", () => {
    const eintrag = keywordMap.find((k) => k.path === "/funktionen/angebote")!;
    const ziel = zielwerte("/funktionen/angebote");
    expect(ziel.title).toBe(eintrag.target!.title);
    expect(ziel.h1).toBe(eintrag.target!.h1);
    expect(ziel.description).toBe(eintrag.target!.description);
    expect(ziel.keyword).toBe(eintrag.primary!.keyword);
    expect(ziel.titleOhneMarke).toBe(eintrag.target!.title!.replace(/ \| CraftOS$/, ""));
    expect(ziel.titleOhneMarke.endsWith(" | CraftOS")).toBe(false);
  });

  it("zielwerte wirft für einen Pfad ohne Zielwerte", () => {
    expect(() => zielwerte("/gibt-es-nicht")).toThrow(
      "Keyword-Map: /gibt-es-nicht hat keine Zielwerte – target.title, target.h1 und target.description ergänzen.",
    );
  });
});

describe("buildFunktionsdetail – Gutfall (Fremddaten angebote)", () => {
  const detail = baue(angeboteInhalt());

  it("Kopf mit Gruppenlabel als Eyebrow, H1 aus der Keyword-Map und Kopf-Visual", () => {
    expect(detail.slug).toBe("angebote");
    expect(detail.name).toBe(getFunktion("angebote")!.name);
    expect(detail.gruppe).toEqual({ id: "angebot", label: "Angebot" });
    expect(detail.kopf.eyebrow).toBe("Angebot");
    expect(detail.kopf.h1).toBe(zielwerte("/funktionen/angebote").h1);
    expect(detail.kopf.kopfwort).toBe("Angebotssoftware,");
    expect(detail.kopf.visual).toBe(kopfVisuals.angebote);
    expect(detail.kopf.secondary).toEqual({ label: "Anleitung in der Hilfe", href: "/hilfe/angebot-entwurf-anlegen" });
  });

  it("FeatureSnippet-Variante angebot (D-19)", () => {
    expect(detail.snippet).toBe("angebot");
  });

  it("verwandt mit Name, Nutzen, Plattformen und Karten-Szene aus funktionen und cardScenes", () => {
    expect(detail.verwandt.map((v) => v.slug)).toEqual(["aufmass", "gaeb", "projektverwaltung"]);
    for (const v of detail.verwandt) {
      const f = getFunktion(v.slug)!;
      expect(v.name).toBe(f.name);
      expect(v.benefit).toBe(f.benefit);
      expect(v.icon).toBe(f.icon);
      expect(v.platforms).toEqual(f.platforms);
      expect(v.href).toBe(`/funktionen/${v.slug}`);
      expect(v.scene).toBe(cardScenes[v.slug]!.scene);
    }
  });

  it("Meta mit Pfad, Title ohne Marke und Description", () => {
    const ziel = zielwerte("/funktionen/angebote");
    expect(detail.meta).toEqual({
      path: "/funktionen/angebote",
      title: ziel.title,
      titleOhneMarke: ziel.titleOhneMarke,
      description: ziel.description,
    });
    expect(detail.meta.titleOhneMarke).not.toContain(" | CraftOS");
  });

  it("Abschnitte übernehmen die Inhalte unverändert", () => {
    const inhalt = angeboteInhalt();
    expect(detail.ablauf.steps.map((s) => s.title)).toEqual(inhalt.ablauf.steps.map((s) => s.title));
    expect(detail.rollen.panels.map((p) => p.platform)).toEqual(["web", "mobile"]);
    expect(detail.kernpunkte.tiles.map((t) => t.size).join("·")).toBe("md·sm·sm·wide·wide");
    expect(detail.faq.items).toEqual(inhalt.faq.items);
  });

  it("gaeb (Web-only) baut ohne FeatureSnippet", () => {
    const gaeb = baue(gaebInhalt());
    expect(gaeb.snippet).toBeUndefined();
    expect(gaeb.rollen.panels.map((p) => p.platform)).toEqual(["web"]);
  });

  it("„automatisch“ ist in einem Text mit „auf Wunsch“ erlaubt", () => {
    const inhalt = angeboteInhalt();
    inhalt.ablauf.steps[4] = { title: "Online unterschreiben lassen", text: "Auf Wunsch erinnert CraftOS automatisch an die Unterschrift." };
    expect(() => baue(inhalt)).not.toThrow();
  });
});

describe("buildFunktionsdetail – Regelverstöße werfen die 07-UI-SPEC-Fehlertexte", () => {
  it("Kopfwort fehlt in der H1", () => {
    expect(() => baue({ ...angeboteInhalt(), kopfwort: "Angebotsprogramm" })).toThrow(
      "FunktionsKopf: H1 enthält das Kopfwort ‚Angebotsprogramm‘ nicht – keyword-map.json oder Datenmodul prüfen.",
    );
  });

  it("Lead mit zwei Sätzen", () => {
    expect(() => baue({ ...angeboteInhalt(), lead: "Positionen kalkulieren. Als PDF ausgeben." })).toThrow(
      "FunktionsKopf: Lead hat 2 Sätze – genau einen Satz schreiben.",
    );
  });

  it("2 Schritte", () => {
    const inhalt = angeboteInhalt();
    inhalt.ablauf.steps = inhalt.ablauf.steps.slice(0, 2);
    expect(() => baue(inhalt)).toThrow("StepFlow: mindestens 3 Schritte erforderlich – Inhalte in lib/… ergänzen.");
  });

  it("6 Schritte", () => {
    const inhalt = angeboteInhalt();
    inhalt.ablauf.steps = [...inhalt.ablauf.steps, { title: "Nachfassen", text: "Offene Angebote im Projekt nachverfolgen." }];
    expect(() => baue(inhalt)).toThrow("StepFlow: höchstens 5 Schritte erlaubt – Inhalte in lib/… kürzen.");
  });

  it("Rolle „Bauleiter“", () => {
    const inhalt = angeboteInhalt();
    inhalt.rollen.panels[0].rollen = [{ name: "Bauleiter" as unknown as RolleName }];
    expect(() => baue(inhalt)).toThrow(
      "Funktionsdetail: Rolle ‚Bauleiter‘ ist keine belegte Rolle – Wert aus RolleName wählen.",
    );
  });

  it("Mobile-Panel bei einer Web-only-Funktion", () => {
    const webOnly: Funktion = { ...getFunktion("angebote")!, platforms: ["web"] };
    expect(() => baue(angeboteInhalt(), webOnly)).toThrow(
      "Plattform mobile ist für angebote nicht belegt – platforms aus lib/funktionen.ts übernehmen.",
    );
  });

  it("Anordnung md·md·sm", () => {
    const inhalt = mitKacheln([
      kachel("md", "Kosten nachvollziehen"),
      kachel("md", "Positionen wiederverwenden"),
      kachel("sm", "Grenze", { grenze: true }),
    ]);
    expect(() => baue(inhalt)).toThrow(
      "Funktionsdetail: Anordnung md·md·sm ist für angebote nicht zulässig – Größenfolge laut 07-UI-SPEC Abschnitt 4 wählen.",
    );
  });

  it("lg-Kachel mit Icon statt Phone-Szene", () => {
    const inhalt = mitKacheln([
      kachel("lg", "Große Kachel"),
      kachel("sm", "Klein eins"),
      kachel("sm", "Klein zwei"),
      kachel("md", "Mittel"),
      kachel("wide", "Grenze", { grenze: true }),
    ]);
    expect(() => baue(inhalt)).toThrow(
      "Funktionsdetail: lg-Kachel ‚Große Kachel‘ braucht ein Phone-Visual – Szene angeben oder Größe ändern.",
    );
  });

  it("lg-Kachel mit der Kopf-Szene", () => {
    const inhalt = mitKacheln([
      kachel("lg", "Große Kachel", { visual: { kind: "phone", scene: angebotScene, width: 194 } }),
      kachel("sm", "Klein eins"),
      kachel("sm", "Klein zwei"),
      kachel("md", "Mittel"),
      kachel("wide", "Grenze", { grenze: true }),
    ]);
    expect(() => baue(inhalt)).toThrow(
      "Funktionsdetail: Kachel ‚Große Kachel‘ zeigt die Kopf-Szene – eine andere Szene wählen.",
    );
  });

  it("zwei Grenze-Kacheln", () => {
    const inhalt = angeboteInhalt();
    inhalt.kernpunkte.tiles[3] = { ...inhalt.kernpunkte.tiles[3], zusatz: undefined, grenze: true };
    expect(() => baue(inhalt)).toThrow(
      "Funktionsdetail: angebote braucht genau eine Grenze-Kachel (gefunden: 2) – grenze: true an genau einer Kachel setzen.",
    );
  });

  it("Zusatz-Kachel in Größe sm", () => {
    const inhalt = angeboteInhalt();
    inhalt.kernpunkte.tiles[1] = { ...inhalt.kernpunkte.tiles[1], zusatz: "besichtigung" };
    expect(() => baue(inhalt)).toThrow(
      "Funktionsdetail: Zusatz-Kachel ‚Positionen wiederverwenden‘ darf nicht sm sein – md, wide oder lg wählen.",
    );
  });

  it("2 FAQ", () => {
    const inhalt = angeboteInhalt();
    inhalt.faq.items = inhalt.faq.items.slice(0, 2);
    expect(() => baue(inhalt)).toThrow("FaqList: mindestens 3 Fragen erforderlich – Inhalte in lib/… ergänzen.");
  });

  it("Frage ohne „?“", () => {
    const inhalt = angeboteInhalt();
    inhalt.faq.items[1] = { ...inhalt.faq.items[1], q: "Kosten je Position" };
    expect(() => baue(inhalt)).toThrow("FaqList: Frage ‚Kosten je Position‘ endet nicht mit „?“ – als direkte Frage formulieren.");
  });

  it("doppelte Frage", () => {
    const inhalt = angeboteInhalt();
    inhalt.faq.items[2] = { ...inhalt.faq.items[0] };
    expect(() => baue(inhalt)).toThrow(
      "Funktionsdetail: Frage ‚Kann mein Kunde das Angebot online unterschreiben?‘ steht in angebote doppelt – eine Frage entfernen.",
    );
  });

  it("verwandte Funktion aus nicht benachbarter Gruppe (angebote → bankabgleich)", () => {
    expect(() => baue({ ...angeboteInhalt(), verwandt: ["aufmass", "bankabgleich"] })).toThrow(
      "Funktionsdetail: verwandte Funktion bankabgleich liegt nicht in derselben oder einer benachbarten Gruppe – Auswahl ändern.",
    );
  });

  it("eigener Slug als verwandte Funktion", () => {
    expect(() => baue({ ...angeboteInhalt(), verwandt: ["aufmass", "angebote"] })).toThrow(
      "Funktionsdetail: angebote verweist in verwandt auf sich selbst – eigene Funktion entfernen.",
    );
  });

  it("„lückenlos“ im Kacheltext", () => {
    const inhalt = angeboteInhalt();
    inhalt.kernpunkte.tiles[0] = { ...inhalt.kernpunkte.tiles[0], text: "Kosten je Position lückenlos kalkulieren." };
    expect(() => baue(inhalt)).toThrow("Funktionsdetail: angebote enthält ‚lückenlos‘ – Formulierung laut 07-UI-SPEC ändern.");
  });

  it("„automatisch“ ohne „auf Wunsch“", () => {
    const inhalt = angeboteInhalt();
    inhalt.ablauf.steps[3] = { title: "PDF ausgeben", text: "Das Angebot wird automatisch als PDF ausgegeben." };
    expect(() => baue(inhalt)).toThrow("Funktionsdetail: angebote enthält ‚automatisch‘ – Formulierung laut 07-UI-SPEC ändern.");
  });

  it("„Bauphasen“ im Schritttext", () => {
    const inhalt = angeboteInhalt();
    inhalt.ablauf.steps[0] = { title: "Entwurf anlegen", text: "Angebotsentwurf für alle Bauphasen anlegen." };
    expect(() => baue(inhalt)).toThrow("Funktionsdetail: angebote enthält ‚Bauphase‘ – Formulierung laut 07-UI-SPEC ändern.");
  });
});

describe("getFunktionsdetail und Inhaltstabelle", () => {
  it("unbekannter Slug wirft", () => {
    expect(() => getFunktionsdetail("gibt-es-nicht")).toThrow(
      "Funktionsdetail: gibt-es-nicht ist keine Funktion aus lib/funktionen.ts – Slug prüfen.",
    );
  });

  it("Slug ohne Inhaltsmodul wirft (injizierte Tabelle, nicht INHALTE)", () => {
    expect(() => getFunktionsdetailAus({}, "gaeb")).toThrow(
      "Funktionsdetail: gaeb hat kein Inhaltsmodul – Eintrag in lib/funktionsdetails/angebot.ts ergänzen.",
    );
  });

  it("getFunktionsdetailAus baut aus einer injizierten Tabelle mit den Live-Daten", () => {
    const detail = getFunktionsdetailAus({ angebote: angeboteInhalt() }, "angebote");
    expect(detail.kopf.h1).toBe(zielwerte("/funktionen/angebote").h1);
    expect(detail.kopf.visual).toBe(kopfVisuals.angebote);
  });

  it("SNIPPET_VARIANTE nennt genau die 8 Seiten aus D-19", () => {
    expect(SNIPPET_VARIANTE).toEqual({
      dashboard: "dashboard",
      angebote: "angebot",
      plantafel: "planung",
      rechnungen: "rechnung",
      eingangsrechnungen: "beleg",
      zeiterfassung: "zeit",
      lager: "lager",
      aufmass: "aufmass",
    });
  });

  it("jedes Inhaltsmodul in INHALTE baut und entspricht ERWARTET", () => {
    for (const slug of Object.keys(INHALTE)) {
      const erwartung = ERWARTET[slug];
      expect(erwartung, `ERWARTET-Eintrag für ${slug}`).toBeDefined();
      const detail = getFunktionsdetail(slug);
      expect(detail.faq.items.map((f) => f.q), slug).toContain(erwartung.pflichtfrage);
      expect(detail.verwandt.map((v) => v.slug), slug).toEqual(erwartung.verwandt);
      expect(detail.kernpunkte.tiles.map((t) => t.size).join("·"), slug).toBe(erwartung.anordnung);
      const web = detail.rollen.panels.find((p) => p.platform === "web");
      const mobile = detail.rollen.panels.find((p) => p.platform === "mobile");
      expect(web?.rollen.map((r) => r.name), slug).toEqual(erwartung.webRollen);
      expect(mobile ? mobile.rollen.map((r) => r.name) : null, slug).toEqual(erwartung.mobileRollen);
      expect(detail.kopf.secondary, slug).toEqual(erwartung.sekundaer);
    }
  });

  it("Inhalts- und Builder-Quelltext ohne Preis- oder Testtage-Literale", () => {
    const dir = path.join(ROOT, "lib/funktionsdetails");
    for (const datei of fs.readdirSync(dir).filter((d) => d.endsWith(".ts"))) {
      const quelltext = fs.readFileSync(path.join(dir, datei), "utf8");
      expect(quelltext, datei).not.toMatch(/€|10 Tage/);
    }
  });
});
