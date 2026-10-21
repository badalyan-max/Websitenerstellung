/**
 * Funktionsdetailseiten (Phase 7, Plan 07-04; FEAT-02, DESIGN-02, SEO-02, MEDIA-01; D-02, D-03, D-04, D-11, D-19, D-23).
 * Builder und Vorlage werden mit Fremddaten geprüft: Die Fixtures stehen nur hier, nicht im Produktcode.
 * Die echten Inhalte (lib/funktionsdetails/{gruppe}.ts) folgen in 07-05/07-06 und laufen dann über ERWARTET.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Calculator, Copy, FileInput, FileOutput, BookOpen, Import, Info, Ruler, Signature } from "lucide-react";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { FunktionsDetail } from "@/components/funktionen/FunktionsDetail";
import { funktionen, getFunktion, type Funktion } from "@/lib/funktionen";
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
import { mobileLocales } from "@/lib/product-register";
import {
  abnahmeScene,
  angebotScene,
  cardScenes,
  kopfVisuals,
  lagerAppScene,
  type FrameScene,
} from "@/lib/scenes";
import { site } from "@/lib/site";

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
  /** FeatureSnippet-Variante (D-19) oder null. */
  snippet: string | null;
  /** ids der Zusatzfunktionen in Kachelreihenfolge (D-02 (4)). */
  zusatz: string[];
  /** Kachel mit Phone-Szene (lg), falls die Seite eine hat. */
  phone?: { title: string; scene: FrameScene; width: 160 | 194 };
  /** Kacheltitel → href (Querverweise, D-12). */
  hrefs?: Record<string, string>;
  /** Text, den der Satz des jeweiligen Panels enthalten muss (D-20). */
  panelSatz?: { web?: string; mobile?: string };
  /** Anfang der Antwort auf die Pflichtfrage (z. B. „Nein“). */
  pflichtAntwort?: string;
}
const HILFE = "Anleitung in der Hilfe";
const ALLE = { label: "Alle Funktionen ansehen", href: "/funktionen" };
const BUERO: RolleName[] = ["Admin", "Büro-Leitung", "Büro-Projektleitung"];
const MOBIL: RolleName[] = ["Mobil-Teamleitung", "Mobil-Teammitglied"];
const ERWARTET: Record<string, Erwartung> = {
  // Gruppe Angebot (07-05 Task 1)
  angebote: {
    pflichtfrage: "Kann mein Kunde das Angebot online unterschreiben?",
    verwandt: ["aufmass", "gaeb", "projektverwaltung"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: BUERO,
    mobileRollen: [],
    sekundaer: { label: HILFE, href: "/hilfe/angebot-entwurf-anlegen" },
    snippet: "angebot",
    zusatz: ["angebotsunterschrift"],
  },
  aufmass: {
    pflichtfrage: "Werden Maße automatisch gemessen?",
    verwandt: ["angebote", "gaeb", "arbeitsanweisungen"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: BUERO,
    mobileRollen: MOBIL,
    sekundaer: { label: HILFE, href: "/hilfe/raumaufmass-angebot-uebernehmen" },
    snippet: "aufmass",
    zusatz: ["besichtigung"],
  },
  kundenportal: {
    pflichtfrage: "Können Kunden Rechnungen im Portal online bezahlen?",
    verwandt: ["angebote", "projektverwaltung"],
    anordnung: "md·sm·sm·wide",
    webRollen: BUERO,
    mobileRollen: null,
    sekundaer: ALLE,
    snippet: null,
    zusatz: [],
  },
  gaeb: {
    pflichtfrage: "Welche GAEB-Formate unterstützt CraftOS?",
    verwandt: ["angebote", "aufmass"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: BUERO,
    mobileRollen: null,
    sekundaer: { label: HILFE, href: "/hilfe/gaeb-importieren" },
    snippet: null,
    zusatz: [],
  },
  // Gruppe Planung (07-05 Task 2)
  plantafel: {
    pflichtfrage: "Zeigt die Karte, wo meine Mitarbeitenden gerade sind?",
    verwandt: ["terminplanung", "projektverwaltung", "zeiterfassung"],
    anordnung: "md·sm·sm·md·sm·sm",
    webRollen: BUERO,
    mobileRollen: MOBIL,
    sekundaer: { label: HILFE, href: "/hilfe/plantafel-einsatz-planen" },
    snippet: "planung",
    zusatz: [],
  },
  projektverwaltung: {
    pflichtfrage: "Sehen Mitarbeitende in der App alle Projekte?",
    verwandt: ["terminplanung", "arbeitsanweisungen", "baudokumentation"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: BUERO,
    mobileRollen: MOBIL,
    sekundaer: { label: HILFE, href: "/hilfe/projektdateien-ordner" },
    snippet: null,
    zusatz: ["kunden-app", "projekt-chat"],
  },
  arbeitsanweisungen: {
    pflichtfrage: "Sieht das Team in der Arbeitsanweisung die Verkaufspreise?",
    verwandt: ["projektverwaltung", "angebote", "lager"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: BUERO,
    mobileRollen: MOBIL,
    sekundaer: ALLE,
    snippet: null,
    zusatz: [],
  },
  terminplanung: {
    pflichtfrage: "Kann mein Team den Bauzeitenplan in der App sehen?",
    verwandt: ["plantafel", "projektverwaltung"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: BUERO,
    mobileRollen: MOBIL,
    sekundaer: { label: HILFE, href: "/hilfe/projekt-phasen-anlegen" },
    snippet: null,
    zusatz: [],
    panelSatz: { web: "Geplant wird im Web", mobile: "Arbeitsabschnitte" },
  },
  // Gruppe Baustelle (07-05 Task 3)
  zeiterfassung: {
    pflichtfrage: "Erfasst die App dauerhaft den Standort?",
    pflichtAntwort: "Nein",
    verwandt: ["plantafel", "baudokumentation"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: BUERO,
    mobileRollen: ["Mobil-Teammitglied", "Mobil-Teamleitung"],
    sekundaer: { label: HILFE, href: "/hilfe/mobilen-timer-bedienen" },
    snippet: "zeit",
    zusatz: [],
  },
  baudokumentation: {
    pflichtfrage: "Was gehört in ein Bautagebuch?",
    verwandt: ["maengelmanagement", "projektverwaltung", "rechnungen"],
    anordnung: "lg·sm·sm·md·md·md",
    webRollen: BUERO,
    mobileRollen: MOBIL,
    sekundaer: { label: HILFE, href: "/hilfe/bautagesbericht-erstellen" },
    snippet: null,
    zusatz: ["abnahme", "bautagesbericht"],
    phone: { title: "Abnahme und Teilabnahme", scene: abnahmeScene, width: 194 },
    hrefs: { Mängel: "/funktionen/maengelmanagement" },
  },
  lager: {
    pflichtfrage: "Kann mein Team Artikel in der App per Barcode buchen?",
    verwandt: ["arbeitsanweisungen", "zeiterfassung"],
    anordnung: "lg·sm·sm·md·wide",
    webRollen: BUERO,
    mobileRollen: [],
    sekundaer: { label: HILFE, href: "/hilfe/material-entnehmen-zurueckbuchen" },
    snippet: "lager",
    zusatz: ["lager-scan"],
    phone: { title: "Lager-Scan und Wareneingang", scene: lagerAppScene, width: 194 },
  },
  maengelmanagement: {
    pflichtfrage: "Wie erinnert CraftOS an fällige Mängel?",
    verwandt: ["baudokumentation", "projektverwaltung"],
    anordnung: "md·sm·sm·md·sm·sm",
    webRollen: BUERO,
    mobileRollen: MOBIL,
    sekundaer: { label: HILFE, href: "/hilfe/mangel-erfassen-bearbeiten" },
    snippet: null,
    zusatz: [],
  },
  // Gruppe Rechnung (07-06 Task 1)
  rechnungen: {
    pflichtfrage: "Kann ich eine fertiggestellte Rechnung noch ändern?",
    verwandt: ["e-rechnung", "mahnwesen", "bankabgleich"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: BUERO,
    mobileRollen: null,
    sekundaer: { label: HILFE, href: "/hilfe/rechnung-fertigstellen" },
    snippet: "rechnung",
    zusatz: [],
    hrefs: { "Korrektur nur über Folgebelege": "/gobd" },
  },
  "e-rechnung": {
    pflichtfrage: "Ist eine PDF-Rechnung eine E-Rechnung?",
    pflichtAntwort: "Nein",
    verwandt: ["rechnungen", "eingangsrechnungen"],
    anordnung: "md·sm·sm·wide",
    webRollen: BUERO,
    mobileRollen: null,
    sekundaer: { label: HILFE, href: "/hilfe/e-rechnung-herunterladen" },
    snippet: null,
    zusatz: [],
    hrefs: { "Eine PDF ist keine E-Rechnung": "/gobd" },
  },
  mahnwesen: {
    pflichtfrage: "Wann kommt die Mahnung nach der Zahlungserinnerung?",
    verwandt: ["rechnungen", "bankabgleich"],
    anordnung: "md·sm·sm·md·sm·sm",
    webRollen: ["Admin", "Büro-Leitung"],
    mobileRollen: null,
    sekundaer: ALLE,
    snippet: null,
    zusatz: [],
    panelSatz: { web: "Fristen, Gebühren und Stufen ändert nur der Inhaber des Betriebs" },
  },
  // Gruppe Team (07-06 Task 1)
  team: {
    pflichtfrage: "Was ist der Unterschied zwischen Lizenz und Rolle?",
    verwandt: ["datenuebernahme", "dashboard"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: ["Admin"],
    mobileRollen: MOBIL,
    sekundaer: { label: HILFE, href: "/hilfe/rollen-zugriffsrechte-einstellen" },
    snippet: null,
    zusatz: ["sprachen"],
    hrefs: { [`${mobileLocales.length} Sprachen in der Mobile-App`]: "/app" },
  },
  datenuebernahme: {
    pflichtfrage: "Aus welcher Software kann ich Daten übernehmen?",
    verwandt: ["team", "buchhaltung"],
    anordnung: "md·sm·sm·wide",
    webRollen: ["Admin", "Büro-Leitung"],
    mobileRollen: null,
    sekundaer: ALLE,
    snippet: null,
    zusatz: [],
  },
  // Gruppe Buchhaltung (07-06 Task 2)
  buchhaltung: {
    pflichtfrage: "Reicht CraftOS die Steuererklärung bei ELSTER ein?",
    pflichtAntwort: "Nein",
    verwandt: ["bankabgleich", "eingangsrechnungen", "rechnungen"],
    anordnung: "md·sm·sm·wide",
    webRollen: ["Admin", "Büro-Leitung"],
    mobileRollen: null,
    sekundaer: { label: HILFE, href: "/hilfe/datev-export-erstellen" },
    snippet: null,
    zusatz: [],
    hrefs: { "Keine ELSTER-Einreichung": "/gobd" },
  },
  eingangsrechnungen: {
    pflichtfrage: "Verbraucht das Auslesen von Belegen Credits?",
    verwandt: ["buchhaltung", "e-rechnung", "nachkalkulation"],
    anordnung: "md·sm·sm·wide",
    webRollen: ["Admin", "Büro-Leitung"],
    mobileRollen: [],
    sekundaer: { label: HILFE, href: "/hilfe/beleg-scannen-pruefen" },
    snippet: "beleg",
    zusatz: [],
    hrefs: { "KI-Auslesen mit Verbindung und Credits": "/gobd" },
    panelSatz: { mobile: "Finanzfreigabe" },
  },
  nachkalkulation: {
    pflichtfrage: "Woher kommen die Ist-Kosten in der Nachkalkulation?",
    verwandt: ["dashboard", "eingangsrechnungen"],
    anordnung: "md·sm·sm·wide",
    webRollen: ["Admin", "Büro-Leitung"],
    mobileRollen: null,
    sekundaer: ALLE,
    snippet: null,
    zusatz: [],
  },
  dashboard: {
    pflichtfrage: "Welche Kennzahlen zeigt das Dashboard?",
    verwandt: ["nachkalkulation", "buchhaltung"],
    anordnung: "md·sm·sm·wide",
    webRollen: BUERO,
    mobileRollen: null,
    sekundaer: ALLE,
    snippet: "dashboard",
    zusatz: [],
  },
  bankabgleich: {
    pflichtfrage: "Brauche ich für den Zahlungsabgleich eine Bankverbindung?",
    verwandt: ["buchhaltung", "rechnungen", "mahnwesen"],
    anordnung: "md·sm·sm·wide·wide",
    webRollen: ["Admin", "Büro-Leitung"],
    mobileRollen: null,
    sekundaer: ALLE,
    snippet: null,
    zusatz: [],
  },
};

/** Alle Textfelder eines Inhaltsmoduls außer den FAQ-Fragen (für Wort- und Satzregeln je Seite). */
function texteOhneFragen(inhalt: FunktionsdetailInhalt): string[] {
  const abschnitte = [inhalt.ablauf, inhalt.rollen, inhalt.kernpunkte, inhalt.faq];
  return [
    inhalt.lead,
    ...abschnitte.flatMap((a) => [a.title, a.lead]),
    ...inhalt.ablauf.steps.flatMap((s) => [s.title, s.text]),
    ...inhalt.rollen.panels.flatMap((p) => [p.satz, p.kundenHinweis ?? "", ...p.rollen.map((r) => r.zusatz ?? "")]),
    ...inhalt.kernpunkte.tiles.flatMap((t) => [t.title, t.text]),
    ...inhalt.faq.items.map((f) => f.a),
  ];
}

/** Normierung wie tests/keyword-map.test.ts (Kopfwort-Regel). */
const norm = (k: string) =>
  k
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[\s-]+/g, "");
const GENERISCHE_H2 = ["features", "funktionen", "vorteile", "faq", "fragen", "ablauf", "rollen"];

/** Bezugswörter einer Seite: erstes Wort des Funktionsnamens und erstes Wort des Hauptkeywords (normiert). */
function bezugswoerter(slug: string): string[] {
  const name = getFunktion(slug)!.name.split(" ")[0];
  const keyword = zielwerte(`/funktionen/${slug}`).keyword?.split(" ")[0];
  return [name, keyword].filter((w): w is string => Boolean(w)).map(norm);
}

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
      expect(v.rahmen).toBe(cardScenes[v.slug]!.kind);
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

  it("Rolle „Kunde“ unter dem Lizenzbadge (WR-03, B13)", () => {
    const inhalt = angeboteInhalt();
    inhalt.rollen.panels[0].rollen = [{ name: "Kunde" as unknown as RolleName, zusatz: "eigener Zugang im Browser" }];
    expect(() => baue(inhalt)).toThrow("Funktionsdetail: Rolle ‚Kunde‘ ist keine belegte Rolle – Wert aus RolleName wählen.");
  });

  it("kundenHinweis im Mobile-Panel oder ohne „keine Lizenz“ (WR-03, B13)", () => {
    const mobil = angeboteInhalt();
    mobil.rollen.panels[1].kundenHinweis = "Ihre Kunden nutzen einen eigenen Portal-Zugang und brauchen keine Lizenz.";
    expect(() => baue(mobil)).toThrow(
      "Funktionsdetail: kundenHinweis im Panel mobile von angebote – nur im Web-Panel zulässig.",
    );
    const ohneLizenz = angeboteInhalt();
    ohneLizenz.rollen.panels[0].kundenHinweis = "Ihre Kunden nutzen einen eigenen Portal-Zugang im Browser.";
    expect(() => baue(ohneLizenz)).toThrow(
      "Funktionsdetail: kundenHinweis von angebote nennt „keine Lizenz“ nicht – Kunden brauchen keine Lizenz.",
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

  it("lg-Kachel mit einer Kopie der Kopf-Szene (Vergleich über screen, WR-05)", () => {
    const inhalt = mitKacheln([
      kachel("lg", "Große Kachel", { visual: { kind: "phone", scene: { ...angebotScene }, width: 194 } }),
      kachel("sm", "Klein eins"),
      kachel("sm", "Klein zwei"),
      kachel("md", "Mittel"),
      kachel("wide", "Grenze", { grenze: true }),
    ]);
    expect(() => baue(inhalt)).toThrow(
      "Funktionsdetail: Kachel ‚Große Kachel‘ zeigt die Kopf-Szene – eine andere Szene wählen.",
    );
  });

  it("unbekannte Zusatz-id (WR-05)", () => {
    const inhalt = angeboteInhalt();
    inhalt.kernpunkte.tiles[3] = { ...inhalt.kernpunkte.tiles[3], zusatz: "angebotsunterschrfit" };
    expect(() => baue(inhalt)).toThrow(
      "Funktionsdetail: Zusatz angebotsunterschrfit an Kachel ‚Angebotsunterschrift online‘ ist unbekannt – id aus ZUSATZ_IDS (lib/funktionsgruppen.ts) wählen.",
    );
  });

  it("Kachel-Link auf eine unbekannte oder die eigene Detailseite (WR-05)", () => {
    for (const href of ["/funktionen/angebot", "/funktionen/angebote", "/hilfe/Angebot", "https://example.com"]) {
      const inhalt = angeboteInhalt();
      inhalt.kernpunkte.tiles[1] = { ...inhalt.kernpunkte.tiles[1], href };
      expect(() => baue(inhalt), href).toThrow(
        `Funktionsdetail: Kachel ‚${inhalt.kernpunkte.tiles[1].title}‘ in angebote verlinkt ${href} – nur andere Detailseiten, /hilfe/{slug} oder Seiten wie /app und /gobd.`,
      );
    }
  });

  it("Wortregeln gelten auch für Title, Description, H1, Kopfwort und verwandte Nutzensätze (WR-05)", () => {
    const ziel = zielwerte("/funktionen/angebote");
    const mit = (z: Partial<typeof ziel>, g = gruppen) => () =>
      buildFunktionsdetail({
        inhalt: angeboteInhalt(),
        funktion: getFunktion("angebote")!,
        ziel: { ...ziel, ...z },
        gruppen: g,
        visual: kopfVisuals.angebote,
      });
    const fehler = (wort: string) => `Funktionsdetail: angebote enthält ‚${wort}‘ – Formulierung laut 07-UI-SPEC ändern.`;
    expect(mit({})).not.toThrow();
    expect(mit({ description: `${ziel.description} Belege lückenlos ablegen.` })).toThrow(fehler("lückenlos"));
    expect(mit({ title: "Angebote vollständig offline | CraftOS" })).toThrow(fehler("vollständig offline"));
    expect(mit({ description: `${ziel.description} Zahlungen automatisch abgleichen.` })).toThrow(fehler("automatisch"));
    expect(mit({ h1: "Angebotssoftware, per Online-Banking" })).toThrow(fehler("Online-Banking"));
    // B3: „Bauphasen“ ist in Title und Description als Suchbegriff zulässig, in der H1 nicht.
    expect(mit({ title: "Angebote nach Bauphasen | CraftOS", description: `${ziel.description} Nach Bauphasen gliedern.` })).not.toThrow();
    expect(mit({ h1: "Angebotssoftware, nach Bauphasen" })).toThrow(fehler("Bauphase"));
    // Nutzensatz einer verwandten Karte (aufmass ist verwandt mit angebote) kommt aus dem Gruppenmodell.
    const mitBenefit = gruppen.map((g) => ({
      ...g,
      details: g.details.map((d) => (d.slug === "aufmass" ? { ...d, benefit: "Maße lückenlos erfassen." } : d)),
    }));
    expect(mit({}, mitBenefit)).toThrow(fehler("lückenlos"));
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
      if (erwartung.pflichtAntwort) {
        const antwort = detail.faq.items.find((f) => f.q === erwartung.pflichtfrage)?.a ?? "";
        expect(antwort.startsWith(erwartung.pflichtAntwort), `${slug}: ${antwort}`).toBe(true);
      }
      expect(detail.verwandt.map((v) => v.slug), slug).toEqual(erwartung.verwandt);
      expect(detail.kernpunkte.tiles.map((t) => t.size).join("·"), slug).toBe(erwartung.anordnung);
      const web = detail.rollen.panels.find((p) => p.platform === "web");
      const mobile = detail.rollen.panels.find((p) => p.platform === "mobile");
      expect(web?.rollen.map((r) => r.name), slug).toEqual(erwartung.webRollen);
      expect(mobile ? mobile.rollen.map((r) => r.name) : null, slug).toEqual(erwartung.mobileRollen);
      expect(detail.kopf.secondary, slug).toEqual(erwartung.sekundaer);
      expect(detail.snippet ?? null, slug).toBe(erwartung.snippet);
      expect(
        detail.kernpunkte.tiles.flatMap((t) => (t.zusatz ? [t.zusatz] : [])),
        slug,
      ).toEqual(erwartung.zusatz);
      if (erwartung.phone) {
        const tile = detail.kernpunkte.tiles.find((t) => t.title === erwartung.phone!.title);
        expect(tile?.visual, slug).toEqual({ kind: "phone", scene: erwartung.phone.scene, width: erwartung.phone.width });
      }
      for (const [titel, href] of Object.entries(erwartung.hrefs ?? {})) {
        expect(detail.kernpunkte.tiles.find((t) => t.title === titel)?.href, `${slug}: ${titel}`).toBe(href);
      }
      if (erwartung.panelSatz?.web) expect(web?.satz, slug).toContain(erwartung.panelSatz.web);
      if (erwartung.panelSatz?.mobile) expect(mobile?.satz, slug).toContain(erwartung.panelSatz.mobile);
    }
  });

  it("Statusnamen „In Arbeit“/„In Bearbeitung“ kommen in den maengelmanagement-Texten nicht vor (Pitfall 7)", () => {
    expect(Object.hasOwn(INHALTE, "maengelmanagement")).toBe(true);
    const texte = JSON.stringify(INHALTE.maengelmanagement);
    expect(texte).not.toMatch(/In Arbeit|In Bearbeitung/i);
  });

  it("mahnwesen: Büro-Leitung liest Einstellungen nur, keine Ordinalzahl außerhalb der FAQ-Fragen, „automatisch“ nur mit „auf Wunsch“", () => {
    expect(Object.hasOwn(INHALTE, "mahnwesen")).toBe(true);
    const inhalt = INHALTE.mahnwesen;
    const web = inhalt.rollen.panels.find((p) => p.platform === "web")!;
    expect(web.rollen).toEqual([{ name: "Admin" }, { name: "Büro-Leitung", zusatz: "Einstellungen nur lesen" }]);
    for (const text of texteOhneFragen(inhalt)) {
      // Ordinalzahl = Ziffer, Punkt, Leerraum, Wort („1. Mahnung“); ein Satzende „auf 0.“ ist keine.
      expect(text, text).not.toMatch(/(^|\s)\d+\.\s+\p{L}/u);
      if (/automatisch/i.test(text)) expect(text, text).toMatch(/auf Wunsch/i);
    }
    expect(JSON.stringify(inhalt)).toContain("Zahlungserinnerung");
    expect(JSON.stringify(inhalt)).toMatch(/erste.*Mahnung/);
    expect(JSON.stringify(inhalt)).toMatch(/zweite Mahnung/);
    const grenze = inhalt.kernpunkte.tiles.find((t) => t.grenze);
    expect(grenze?.title).toBe("Nur Rechnungen");
  });

  it("team: Sprachen-Kachel aus mobileLocales mit Ziel /app, Web-Panel nur Admin", () => {
    expect(Object.hasOwn(INHALTE, "team")).toBe(true);
    const inhalt = INHALTE.team;
    const kachel = inhalt.kernpunkte.tiles.find((t) => t.zusatz === "sprachen");
    expect(kachel?.href).toBe("/app");
    expect(kachel?.size).not.toBe("sm");
    expect(kachel?.title).toContain(String(mobileLocales.length));
    expect(kachel?.text).toContain(String(mobileLocales.length));
    const web = inhalt.rollen.panels.find((p) => p.platform === "web")!;
    expect(web.rollen.map((r) => r.name)).toEqual(["Admin"]);
    expect(JSON.stringify(inhalt)).toContain("nur der Inhaber");
  });

  it("datenuebernahme: nur Web-Panel mit Admin und Büro-Leitung, Grenzen aus dem Release", () => {
    expect(Object.hasOwn(INHALTE, "datenuebernahme")).toBe(true);
    const inhalt = INHALTE.datenuebernahme;
    expect(inhalt.rollen.panels.map((p) => p.platform)).toEqual(["web"]);
    expect(inhalt.rollen.panels[0].rollen.map((r) => r.name)).toEqual(["Admin", "Büro-Leitung"]);
    const texte = JSON.stringify(inhalt);
    for (const fakt of ["10 MiB", "25.000 Zeilen", "XLSX", "Zahlungsdaten"]) expect(texte).toContain(fakt);
  });

  it("INHALTE deckt alle 22 Slugs aus lib/funktionen.ts ab", () => {
    expect(Object.keys(INHALTE).sort()).toEqual(funktionen.map((f) => f.slug).sort());
    expect(Object.keys(INHALTE)).toHaveLength(22);
  });

  it("bankabgleich: kein „automatisch“, „Online-Banking“ oder „Bankverbindung herstellen“; Pflichtantwort nennt den Dateiimport", () => {
    expect(Object.hasOwn(INHALTE, "bankabgleich")).toBe(true);
    const inhalt = INHALTE.bankabgleich;
    const texte = JSON.stringify(inhalt);
    expect(texte).not.toMatch(/automatisch|Online-Banking|Bankverbindung herstellen/i);
    const antwort = inhalt.faq.items.find((f) => f.q === "Brauche ich für den Zahlungsabgleich eine Bankverbindung?")!.a;
    const ersterSatz = antwort.split(/(?<=[.!?])\s+/)[0];
    for (const format of ["CSV", "camt.053", "PDF"]) expect(ersterSatz, ersterSatz).toContain(format);
    expect(ersterSatz).toMatch(/Datei/);
  });

  it("Finanzseiten: Web-Panels nur Admin und Büro-Leitung; Grenze-Kacheln von buchhaltung und eingangsrechnungen → /gobd", () => {
    for (const slug of ["buchhaltung", "eingangsrechnungen", "nachkalkulation", "bankabgleich"]) {
      expect(Object.hasOwn(INHALTE, slug), slug).toBe(true);
      const web = INHALTE[slug].rollen.panels.find((p) => p.platform === "web")!;
      for (const rolle of web.rollen) expect(["Admin", "Büro-Leitung"], `${slug}: ${rolle.name}`).toContain(rolle.name);
    }
    for (const slug of ["buchhaltung", "eingangsrechnungen", "rechnungen", "e-rechnung"]) {
      expect(INHALTE[slug].kernpunkte.tiles.find((t) => t.grenze)?.href, slug).toBe("/gobd");
    }
    for (const slug of ["buchhaltung", "eingangsrechnungen", "nachkalkulation", "dashboard", "bankabgleich"]) {
      expect(JSON.stringify(INHALTE[slug]), slug).not.toMatch(/automatisch|lückenlos|Online-Banking/i);
    }
  });

  it("Rechnungsseiten ohne „lückenlos“ und „Online-Banking“; e-rechnung sagt keine Empfängerakzeptanz zu", () => {
    for (const slug of ["rechnungen", "e-rechnung", "mahnwesen", "team", "datenuebernahme"]) {
      expect(Object.hasOwn(INHALTE, slug), slug).toBe(true);
      expect(JSON.stringify(INHALTE[slug]), slug).not.toMatch(/lückenlos|Online-Banking/i);
    }
    const eRechnung = JSON.stringify(INHALTE["e-rechnung"]);
    for (const fakt of ["UBL 2.1", "PDF/A-3", "ohne OCR"]) expect(eRechnung).toContain(fakt);
  });

  it("jede ERWARTET-Zeile hat ein Inhaltsmodul in INHALTE", () => {
    for (const slug of Object.keys(ERWARTET)) {
      expect(Object.hasOwn(INHALTE, slug), `INHALTE-Eintrag für ${slug}`).toBe(true);
    }
  });

  it("jede Abschnitts-H2 nennt Funktionsnamen oder erstes Keyword-Wort und ist nicht generisch", () => {
    for (const slug of Object.keys(INHALTE)) {
      const inhalt = INHALTE[slug];
      const woerter = bezugswoerter(slug);
      for (const abschnitt of [inhalt.ablauf, inhalt.rollen, inhalt.kernpunkte, inhalt.faq]) {
        const h2 = norm(abschnitt.title);
        expect(woerter.some((w) => h2.includes(w)), `${slug}: „${abschnitt.title}“ nennt keins von ${woerter.join(", ")}`).toBe(true);
        expect(GENERISCHE_H2.includes(h2), `${slug}: „${abschnitt.title}“ ist generisch`).toBe(false);
      }
    }
  });

  it("Sekundärlink und Kachel-Links zeigen auf Pfade der Sitemap", async () => {
    const pfade = new Set((await sitemap()).map((e) => new URL(e.url).pathname));
    for (const slug of Object.keys(INHALTE)) {
      const inhalt = INHALTE[slug];
      expect(pfade.has(inhalt.secondary.href), `${slug}: ${inhalt.secondary.href}`).toBe(true);
      for (const tile of inhalt.kernpunkte.tiles) {
        if (tile.href) expect(pfade.has(tile.href), `${slug}: ${tile.title} → ${tile.href}`).toBe(true);
      }
    }
  });

  it("jeder Hilfe-Link (Sekundärlink und Kacheln) hat einen Artikel in content/hilfe (WR-05)", () => {
    const fehlend: string[] = [];
    for (const slug of Object.keys(INHALTE)) {
      const inhalt = INHALTE[slug];
      const links = [inhalt.secondary.href, ...inhalt.kernpunkte.tiles.flatMap((t) => (t.href ? [t.href] : []))];
      for (const href of links.filter((h) => h.startsWith("/hilfe/"))) {
        const datei = path.join(ROOT, "content/hilfe", `${href.slice("/hilfe/".length)}.md`);
        if (!fs.existsSync(datei)) fehlend.push(`${slug}: ${href}`);
      }
    }
    expect(fehlend).toEqual([]);
    expect(Object.values(INHALTE).filter((i) => i.secondary.href.startsWith("/hilfe/")).length).toBeGreaterThan(0);
  });

  it("jede Zusatzfunktion mit Ziel auf einer Detailseite mit Inhalt steht dort als Kachel mit passendem zusatz", () => {
    for (const extra of gruppen.flatMap((g) => g.extras)) {
      const href = extra.target?.href ?? "";
      if (extra.target?.kind !== "funktion" || !href.startsWith("/funktionen/")) continue;
      const ziel = href.slice("/funktionen/".length);
      if (!Object.hasOwn(INHALTE, ziel)) continue;
      const kachel = INHALTE[ziel].kernpunkte.tiles.find((t) => t.zusatz === extra.id);
      expect(kachel, `${extra.id} auf ${ziel}`).toBeDefined();
      expect(kachel!.size, `${extra.id} auf ${ziel}`).not.toBe("sm");
    }
  });

  it("Inhalts- und Builder-Quelltext ohne Preis- oder Testtage-Literale", () => {
    const dir = path.join(ROOT, "lib/funktionsdetails");
    for (const datei of fs.readdirSync(dir).filter((d) => d.endsWith(".ts"))) {
      const quelltext = fs.readFileSync(path.join(dir, datei), "utf8");
      expect(quelltext, datei).not.toMatch(/€|10 Tage|Tage kostenlos/);
    }
  });
});

describe("Route /funktionen/[slug] rendert die v2-Vorlage (D-04, D-19)", () => {
  const ABSCHNITTE = ["kopf", "ablauf", "rollen", "kernpunkte", "faq", "verwandt", "cta"];

  it("alle 22 Detailseiten: feste Abschnittsfolge, kein PageHero-/TrialCta-Markup, FeatureSnippet genau auf den 8 Seiten", async () => {
    const { default: Page } = await import("@/app/funktionen/[slug]/page");
    let mitSnippet = 0;
    for (const { slug } of funktionen) {
      const element = await Page({ params: Promise.resolve({ slug }) });
      const html = renderToString(element);
      expect([...html.matchAll(/data-abschnitt="([^"]+)"/g)].map((m) => m[1]), slug).toEqual(ABSCHNITTE);
      expect(html, slug).not.toContain("craft-page-hero");
      expect(html, slug).not.toContain("CraftOS kennenlernen");
      expect(html.match(/<h1[\s>]/g) ?? [], slug).toHaveLength(1);
      const variante = Object.hasOwn(SNIPPET_VARIANTE, slug) ? SNIPPET_VARIANTE[slug] : undefined;
      const snippets = [...html.matchAll(/data-feature-snippet="([^"]+)"/g)].map((m) => m[1]);
      if (variante) {
        mitSnippet += 1;
        expect(snippets, slug).toEqual([variante]);
        expect(html, slug).toContain('data-figure="snippet"');
      } else {
        expect(snippets, slug).toEqual([]);
        expect(html, slug).not.toContain('data-figure="snippet"');
      }
    }
    expect(mitSnippet).toBe(8);
  });
});

/**
 * Rollen gegen den Web-Release (D-02 (3), T-07-17): nur lesend per `git show origin/release:<pfad>`.
 * Übersprungen wird nur, wenn das Web-Repo auf diesem Rechner fehlt.
 */
const WEB_REPO = "C:/Projekte/craft-connect-buddy";
const webRepoDa = fs.existsSync(path.join(WEB_REPO, ".git"));
function releaseDatei(pfad: string): string {
  return execFileSync("git", ["-C", WEB_REPO, "show", `origin/release:${pfad}`], { encoding: "utf8" });
}

describe.skipIf(!webRepoDa)("Rollen gegen Release (D-02 (3))", () => {
  const webRollen = (slug: string) =>
    INHALTE[slug].rollen.panels.find((p) => p.platform === "web")!.rollen.map((r) => r.name);

  it("die fünf Preset-Namen stehen in roles.ts; Büro-Leitung mit, Büro-Projektleitung ohne Finanzschalter", () => {
    const roles = releaseDatei("src/lib/subscription/roles.ts");
    for (const name of ["Admin", "Büro-Leitung", "Büro-Projektleitung", "Mobil-Teamleitung", "Mobil-Teammitglied"]) {
      expect(roles, name).toContain(`label: '${name}'`);
    }
    const license = releaseDatei("src/types/license.ts");
    const preset = (rolle: string) =>
      license.match(new RegExp(`${rolle}: \\{\\s*licenseType: '(\\w+)',\\s*toggles: \\{([^}]*)\\}`))?.slice(1) ?? [];
    expect(preset("buero_leitung")[1]).toMatch(/finanzen_sichtbar: true/);
    expect(preset("buero_projektleitung")[1]).toMatch(/finanzen_sichtbar: false/);
  });

  it("FEATURE_ACCESS gewährt finanzen und team_verwaltung nur admin", () => {
    const license = releaseDatei("src/types/license.ts");
    for (const feature of ["finanzen", "team_verwaltung"]) {
      const zeile = license.match(new RegExp(`^\\s*${feature}:\\s*\\{([^}]*)\\}`, "m"))?.[1] ?? "";
      expect(zeile, feature).toMatch(/admin:\s*true/);
      expect(zeile, feature).toMatch(/buero:\s*false/);
      expect(zeile, feature).toMatch(/app:\s*false/);
    }
  });

  it("Finanzseiten nur Admin und Büro-Leitung, team nur Admin, datenuebernahme laut Datenimport.tsx", () => {
    for (const slug of ["buchhaltung", "eingangsrechnungen", "nachkalkulation", "bankabgleich"]) {
      for (const name of webRollen(slug)) expect(["Admin", "Büro-Leitung"], `${slug}: ${name}`).toContain(name);
    }
    expect(webRollen("team")).toEqual(["Admin"]);
    for (const name of webRollen("datenuebernahme")) expect(["Admin", "Büro-Leitung"]).toContain(name);
    expect(releaseDatei("src/pages/Datenimport.tsx")).toContain("Admin oder Büro-Leitung");
  });
});

describe("Wortregel „automatisch“", () => {
  const mitFrage = (q: string, a: string): FunktionsdetailInhalt => {
    const inhalt = angeboteInhalt();
    inhalt.faq.items[2] = { q, a };
    return inhalt;
  };

  it("in einer Frage erlaubt, wenn die Antwort mit „Nein“ beginnt", () => {
    expect(() =>
      baue(mitFrage("Werden Mengen automatisch kalkuliert?", "Nein. Sie geben Mengen ein und prüfen sie.")),
    ).not.toThrow();
  });

  it("in einer Frage verboten, wenn die Antwort nicht mit „Nein“ beginnt", () => {
    expect(() =>
      baue(mitFrage("Werden Mengen automatisch kalkuliert?", "Ja. Sie geben Mengen ein und prüfen sie.")),
    ).toThrow("Funktionsdetail: angebote enthält ‚automatisch‘ – Formulierung laut 07-UI-SPEC ändern.");
  });

  it("in der Antwort nur mit „auf Wunsch“, auch wenn sie mit „Nein“ beginnt", () => {
    expect(() =>
      baue(mitFrage("Werden Mengen automatisch kalkuliert?", "Nein. Mengen werden automatisch übernommen.")),
    ).toThrow("Funktionsdetail: angebote enthält ‚automatisch‘ – Formulierung laut 07-UI-SPEC ändern.");
    expect(() =>
      baue(mitFrage("Werden Mengen kalkuliert?", "Ja. Auf Wunsch übernimmt CraftOS Mengen automatisch.")),
    ).not.toThrow();
  });
});

describe("Vorlage gerendert", () => {
  const detail = baue(angeboteInhalt());
  const html = renderToString(createElement(FunktionsDetail, { detail }));
  const gaebHtml = renderToString(createElement(FunktionsDetail, { detail: baue(gaebInhalt()) }));
  const ids = [...html.matchAll(/data-abschnitt="([^"]+)"/g)].map((m) => m[1]);
  const starts = ids.map((id) => html.indexOf(`data-abschnitt="${id}"`));
  const abschnitt = (id: string) => {
    const i = ids.indexOf(id);
    return html.slice(starts[i], starts[i + 1] ?? html.length);
  };
  const jsonLd = (h: string) =>
    [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

  it("sieben Abschnitte in fester Folge, je höchstens eine H2, genau eine H1", () => {
    expect(ids).toEqual(["kopf", "ablauf", "rollen", "kernpunkte", "faq", "verwandt", "cta"]);
    for (const id of ids) {
      expect((abschnitt(id).match(/<h2[\s>]/g) ?? []).length, id).toBeLessThanOrEqual(1);
    }
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect((gaebHtml.match(/data-abschnitt="/g) ?? []).length).toBe(7);
  });

  it("Ablauf mit StepFlow und FeatureSnippet in figure mit Kennzeichnung (angebote)", () => {
    const ablauf = abschnitt("ablauf");
    expect(ablauf).toContain('aria-labelledby="ablauf-titel"');
    expect(ablauf).toMatch(/<ol[^>]*aria-label="So entsteht ein Angebot"/);
    const figure = ablauf.match(/<figure[^>]*data-figure="snippet"[\s\S]*<\/figure>/);
    expect(figure).not.toBeNull();
    expect(figure![0]).toContain('data-feature-snippet="angebot"');
    expect(figure![0]).toContain("Vereinfachte Darstellung mit Beispieldaten");
    expect(html.match(/data-feature-snippet=/g)).toHaveLength(1);
  });

  it("ohne snippet (gaeb) weder Snippet-figure noch FeatureSnippet-Markup", () => {
    expect(gaebHtml).not.toContain('data-figure="snippet"');
    expect(gaebHtml).not.toContain("data-feature-snippet");
  });

  it("Rollen-Abschnitt auf warmer Fläche mit PlattformRollen", () => {
    const rollen = abschnitt("rollen");
    expect(rollen).toMatch(/^data-abschnitt="rollen"[^>]*class="[^"]*bg-\[#f7f3eb\]/);
    expect((rollen.match(/<article/g) ?? []).length).toBe(2);
    expect(rollen).toContain("Im Büro");
    expect(rollen).not.toContain("data-kunden-hinweis");
  });

  it("kundenportal: Kunde nicht in der Rollenliste, Kundenhinweis ohne Lizenz nach dem Lizenzbadge (WR-03, B13)", () => {
    const portal = renderToString(createElement(FunktionsDetail, { detail: getFunktionsdetail("kundenportal") }));
    expect(portal).not.toContain('data-rolle="Kunde"');
    const badge = portal.indexOf('aria-label="Enthalten in"');
    const hinweis = portal.indexOf("data-kunden-hinweis");
    expect(badge).toBeGreaterThan(-1);
    expect(hinweis).toBeGreaterThan(badge);
    expect(portal.slice(hinweis)).toMatch(/^data-kunden-hinweis=""[^>]*>[\s\S]*?keine Lizenz/);
  });

  it("Kacheln: data-zusatz an der Zusatz-Kachel, Grenze-Kachel weiß, übrige warm", () => {
    const kern = abschnitt("kernpunkte");
    expect(kern).toContain('data-zusatz="angebotsunterschrift"');
    const flaechen = [...kern.matchAll(/<article[^>]*data-surface="([a-z]+)"/g)].map((m) => m[1]);
    expect(flaechen).toEqual(["warm", "warm", "warm", "warm", "white"]);
    expect(kern).toMatch(/<ul role="list" aria-label="Was die Angebotssoftware abdeckt"/);
  });

  it("verwandt: je Eintrag li data-verwandt mit FeatureCard „Mehr zu {Name}“ und Rahmen; kein data-funktion", () => {
    const verwandt = abschnitt("verwandt");
    expect([...verwandt.matchAll(/<li[^>]*data-verwandt="([^"]+)"/g)].map((m) => m[1])).toEqual(detail.verwandt.map((v) => v.slug));
    for (const v of detail.verwandt) {
      expect(verwandt).toContain(`Mehr zu ${v.name}`.replace(/&/g, "&amp;"));
      expect(verwandt).toContain(`data-evidence="${v.scene.screen}"`);
    }
    expect(verwandt).toContain("Passende Funktionen");
    expect(html).not.toContain("data-funktion=");
  });

  it("JSON-LD: ein FAQPage aus den sichtbaren Fragen, BreadcrumbList mit 3 Ebenen, WebPage, kein HowTo", () => {
    const blocks = jsonLd(html);
    const faq = blocks.filter((b) => b["@type"] === "FAQPage");
    expect(faq).toHaveLength(1);
    expect(faq[0].mainEntity.map((q: { name: string }) => q.name)).toEqual(detail.faq.items.map((f) => f.q));
    for (const item of detail.faq.items) expect(abschnitt("faq")).toContain(item.q);
    const crumbs = blocks.filter((b) => b["@type"] === "BreadcrumbList");
    expect(crumbs).toHaveLength(1);
    expect(crumbs[0].itemListElement.map((e: { name: string }) => e.name)).toEqual(["Start", "Funktionen", detail.name]);
    const webPage = blocks.filter((b) => b["@type"] === "WebPage");
    expect(webPage).toHaveLength(1);
    expect(webPage[0]["@id"]).toBe(`${site.url}/funktionen/angebote#webpage`);
    expect(webPage[0].description).toBe(detail.meta.description);
    expect(blocks.some((b) => b["@type"] === "HowTo")).toBe(false);
    expect(blocks.some((b) => b["@type"] === "Organization" || b["@type"] === "SoftwareApplication")).toBe(false);
  });

  it("CtaBand mit festem Titel und /preise; alle CTA-Links auf site.ctaUrl ohne Login-Tracking", () => {
    const cta = abschnitt("cta");
    expect(cta).toContain("Machen Sie Platz für Ihr Handwerk.");
    expect(cta).toMatch(/<a[^>]*href="\/preise"[^>]*>Preise ansehen/);
    const ctaLinks = [...html.matchAll(/<a[^>]*href="([^"]+)"[^>]*>/g)].filter((m) => m[1] === site.ctaUrl).map((m) => m[0]);
    expect(ctaLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of ctaLinks) expect(link).toContain('data-track="trial"');
    expect(html).not.toContain('data-track="login"');
  });

  it("Rahmenbelege nur in Kurzform", () => {
    const belege = [...html.matchAll(/data-evidence="([^"]+)"/g)].map((m) => m[1]);
    expect(belege.length).toBeGreaterThanOrEqual(4);
    for (const beleg of belege) expect(beleg).toMatch(/^(web|app):[^\s/]+$/);
  });

  it("FunktionsDetail ist synchron, ohne use client und ohne product-demo", () => {
    const quelltext = fs.readFileSync(path.join(ROOT, "components/funktionen/FunktionsDetail.tsx"), "utf8");
    expect(quelltext).not.toContain("use client");
    expect(quelltext).not.toMatch(/async function FunktionsDetail|export async/);
    expect(quelltext).not.toContain("product-demo");
    expect(html).not.toContain("produktdemo");
  });
});
