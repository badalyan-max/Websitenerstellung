/**
 * Paritätstest Produktregister ↔ Funktionsgruppen ↔ Linkziele (Phase 6, FEAT-01, DESIGN-03, D-07, D-09, D-15).
 * lib/funktionsgruppen.ts ist die einzige Quelle für Menü, Startseite und /funktionen.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { funktionen, getFunktion } from "@/lib/funktionen";
import {
  GRUPPEN_REIHENFOLGE,
  REGISTER_IDS,
  buildFunktionsgruppen,
  getFunktionsgruppen,
  menuFooterLinks,
  type Funktionsgruppe,
} from "@/lib/funktionsgruppen";
import { getProductRegister, mobileLocales } from "@/lib/product-register";

const ROOT = path.resolve(import.meta.dirname, "..");
const gruppen = getFunktionsgruppen();
const register = getProductRegister();
const beworben = register.liveExtras.filter((x) => x.advertised);

async function sitemapPfade(): Promise<Set<string>> {
  return new Set((await sitemap()).map((e) => new URL(e.url).pathname));
}

function gruppe(id: string): Funktionsgruppe {
  const g = gruppen.find((x) => x.id === id);
  if (!g) throw new Error(`Gruppe ${id} fehlt`);
  return g;
}

const ERWARTETE_GRUPPEN = [
  {
    id: "angebot",
    label: "Angebot",
    icon: "FileText",
    description: "Kalkulieren, Mengen übernehmen, online unterschreiben",
    heading: "Vom Aufmaß zum unterschriebenen Angebot",
    lead: "Maße auf der Baustelle erfassen, im Büro ins Angebot übernehmen und online unterschreiben lassen.",
    details: ["angebote", "aufmass", "kundenportal"],
    extras: ["gaeb-datanorm", "angebotsunterschrift", "besichtigung", "kunden-app"],
  },
  {
    id: "planung",
    label: "Planung",
    icon: "CalendarDays",
    description: "Einsätze, Projekte und Bauphasen planen",
    heading: "Einsätze, Projekte und Bauphasen planen",
    lead: "Das Büro plant Team und Termine, die Mobile-App zeigt jedem Teammitglied seine Einsätze.",
    details: ["plantafel", "projektverwaltung", "arbeitsanweisungen"],
    extras: ["terminplanung"],
  },
  {
    id: "baustelle",
    label: "Baustelle",
    icon: "HardHat",
    description: "Zeiten, Fotos, Mängel und Material vor Ort erfassen",
    heading: "Zeiten, Fotos und Mängel direkt vor Ort erfassen",
    lead: "Was auf der Baustelle passiert, landet über die Mobile-App im richtigen Projekt.",
    details: ["zeiterfassung", "baudokumentation", "lager"],
    extras: ["maengel", "abnahme", "bautagesbericht", "lager-scan"],
  },
  {
    id: "rechnung",
    label: "Rechnung",
    icon: "Receipt",
    description: "Rechnungen, E-Rechnung und Zahlungserinnerungen",
    heading: "Rechnungen schreiben und offene Beträge verfolgen",
    lead: "Aus Angeboten und Berichten werden prüfbare Rechnungen, E-Rechnungen und bei Bedarf Zahlungserinnerungen.",
    details: ["rechnungen", "e-rechnung"],
    extras: ["mahnwesen"],
  },
  {
    id: "buchhaltung",
    label: "Buchhaltung",
    icon: "Calculator",
    description: "Belege, Bankumsätze, DATEV-Export und Kennzahlen",
    heading: "Belege, Zahlen und DATEV-Export an einem Ort",
    lead: "Belege prüfen, Bankumsätze zuordnen und Daten für die Steuerberatung vorbereiten.",
    details: ["buchhaltung", "eingangsrechnungen", "nachkalkulation", "dashboard"],
    extras: ["bankabgleich"],
  },
  {
    id: "team",
    label: "Team",
    icon: "Users",
    description: "Zugänge, Rechte und Nachrichten im Team",
    heading: "Zugänge, Rechte und Kommunikation im Team",
    lead: "Jedes Teammitglied erhält den passenden Zugang und klärt Rückfragen im Projekt-Chat.",
    details: ["team"],
    extras: ["projekt-chat", "sprachen", "datenuebernahme"],
  },
] as const;

const sprachenName = `${mobileLocales.length} Sprachen in der Mobile-App`;

/** Zusatzfunktionen wörtlich aus 06-UI-SPEC „FeatureList“ (Anzeigename, Icon, Nutzensatz, Ziel). */
const ERWARTETE_ZUSATZ: Record<
  string,
  { name: string; icon: string; benefit: string; target?: { href: string; kind: "hilfe" | "funktion" } }
> = {
  "gaeb-datanorm": {
    name: "GAEB und DATANORM",
    icon: "FileInput",
    benefit: "Leistungsverzeichnisse per GAEB importieren und exportieren, Artikel per DATANORM einlesen.",
    target: { href: "/hilfe/gaeb-importieren", kind: "hilfe" },
  },
  angebotsunterschrift: {
    name: "Angebotsunterschrift online",
    icon: "Signature",
    benefit: "Kunden nehmen Ihr Angebot online an und unterschreiben es oder senden eine Ablehnung.",
  },
  besichtigung: {
    name: "Besichtigung",
    icon: "Camera",
    benefit: "Fotos, Videos und Sprachnotizen der Besichtigung gesammelt im Projekt ablegen.",
  },
  "kunden-app": {
    name: "Kunden in der App",
    icon: "Contact",
    benefit: "Kundendaten unterwegs in der Mobile-App nachschlagen und bearbeiten.",
  },
  terminplanung: {
    name: "Terminplanung mit Bauphasen",
    icon: "CalendarRange",
    benefit: "Bauphasen im Zeitplan anlegen und Abhängigkeiten zwischen den Phasen sehen.",
    target: { href: "/hilfe/projekt-phasen-anlegen", kind: "hilfe" },
  },
  maengel: {
    name: "Mängel",
    icon: "TriangleAlert",
    benefit: "Mängel mit Foto erfassen und über Status und Zuständigkeit bis zur Erledigung verfolgen.",
    target: { href: "/hilfe/mangel-erfassen-bearbeiten", kind: "hilfe" },
  },
  abnahme: {
    name: "Abnahme und Teilabnahme",
    icon: "ClipboardCheck",
    benefit: "Abnahmen und Teilabnahmen vor Ort protokollieren und unterschreiben lassen.",
    target: { href: "/hilfe/abnahme-dokumentieren", kind: "hilfe" },
  },
  bautagesbericht: {
    name: "Bautagesbericht",
    icon: "NotebookPen",
    benefit: "Leistungen, Personal und weitere Angaben des Tages in der Mobile-App als Bericht festhalten.",
    target: { href: "/hilfe/bautagesbericht-erstellen", kind: "hilfe" },
  },
  "lager-scan": {
    name: "Lager-Scan und Wareneingang",
    icon: "ScanBarcode",
    benefit: "Artikel per Barcode scannen und Wareneingänge am Lager buchen.",
    target: { href: "/hilfe/wareneingang-buchen", kind: "hilfe" },
  },
  mahnwesen: {
    name: "Mahnwesen",
    icon: "BellRing",
    benefit: "Zahlungserinnerungen mit Fristen, Stufen und Vorlagen einrichten, auf Wunsch automatisch.",
  },
  bankabgleich: {
    name: "Bankabgleich & Zahlungen",
    icon: "Landmark",
    benefit: "Bankdatei importieren und Umsätze mit Belegen und erfassten Zahlungen verbinden.",
  },
  "projekt-chat": {
    name: "Projekt-Chat und Nachrichten",
    icon: "MessagesSquare",
    benefit: "Rückfragen im Projekt-Chat klären und Direktnachrichten im Posteingang der App lesen.",
    target: { href: "/funktionen/projektverwaltung", kind: "funktion" },
  },
  sprachen: {
    name: sprachenName,
    icon: "Languages",
    benefit: `Mitarbeitende nutzen die Mobile-App in einer von ${mobileLocales.length} Sprachen.`,
  },
  datenuebernahme: {
    name: "Datenübernahme",
    icon: "Import",
    benefit: "Bestehende Daten aus Dateien prüfen, zuordnen und kontrolliert in CraftOS übernehmen.",
  },
};

/** lucide-Komponenten tragen ihren Namen als displayName. */
function iconName(icon: unknown): string | undefined {
  return (icon as { displayName?: string }).displayName;
}

describe("Funktionsgruppen: Gruppen und Köpfe", () => {
  it("liefert sechs Gruppen in der Arbeitsablauf-Reihenfolge", () => {
    expect(GRUPPEN_REIHENFOLGE).toEqual(["angebot", "planung", "baustelle", "rechnung", "buchhaltung", "team"]);
    expect(gruppen.map((g) => g.id)).toEqual(ERWARTETE_GRUPPEN.map((g) => g.id));
  });

  it("Label, Icon, Kurzbeschreibung, Anker und Gruppenkopf entsprechen dem UI-SPEC", () => {
    for (const soll of ERWARTETE_GRUPPEN) {
      const g = gruppe(soll.id);
      expect(g.label).toBe(soll.label);
      expect(iconName(g.icon)).toBe(soll.icon);
      expect(g.description).toBe(soll.description);
      expect(g.anchorHref).toBe(`/funktionen#${soll.id}`);
      expect(g.heading).toBe(soll.heading);
      expect(g.lead).toBe(soll.lead);
    }
  });

  it("Kurzbeschreibung ≤ 60 ohne Satzende, H2 ≤ 60, Lead genau ein Satz ≤ 140", () => {
    const problems: string[] = [];
    for (const g of gruppen) {
      if (charCount(g.description) > TEXT_BUDGET.menuGroup.description) problems.push(`${g.id}: description`);
      if (sentenceCount(g.description) !== 0) problems.push(`${g.id}: description mit Satzende`);
      if (charCount(g.heading) > TEXT_BUDGET.sectionHeader.title) problems.push(`${g.id}: heading`);
      if (charCount(g.lead) > TEXT_BUDGET.sectionHeader.lead) problems.push(`${g.id}: lead`);
      if (sentenceCount(g.lead) !== 1) problems.push(`${g.id}: lead nicht genau ein Satz`);
    }
    expect(problems).toEqual([]);
  });
});

describe("Funktionsgruppen: 16 Detailfunktionen", () => {
  it("ordnet jede Detailfunktion genau einer Gruppe in der festgelegten Reihenfolge zu", () => {
    for (const soll of ERWARTETE_GRUPPEN) {
      expect(gruppe(soll.id).details.map((d) => d.slug)).toEqual([...soll.details]);
    }
    const alle = gruppen.flatMap((g) => g.details.map((d) => d.slug));
    expect(alle).toHaveLength(16);
    expect(new Set(alle).size).toBe(16);
    expect([...alle].sort()).toEqual(funktionen.map((f) => f.slug).sort());
  });

  it("übernimmt Name, Icon, Plattformen und Nutzensatz unverändert aus lib/funktionen.ts", () => {
    for (const d of gruppen.flatMap((g) => g.details)) {
      const quelle = getFunktion(d.slug);
      expect(quelle).toBeDefined();
      expect(d.kind).toBe("detail");
      expect(d.name).toBe(quelle?.name);
      expect(d.icon).toBe(quelle?.icon);
      expect(d.platforms).toEqual(quelle?.platforms);
      expect(d.benefit).toBe(quelle?.benefit);
      expect(d.href).toBe(`/funktionen/${d.slug}`);
    }
  });

  it("der Builder liest Detailwerte nur aus input.funktionen", () => {
    const quelltext = fs.readFileSync(path.join(ROOT, "lib/funktionsgruppen.ts"), "utf8");
    expect(quelltext.startsWith('import "server-only";')).toBe(true);
    expect(quelltext).not.toContain("getFunktion(");
    const fremd = funktionen.map((f) => (f.slug === "aufmass" ? { ...f, name: "Fremdname", benefit: "Fremdsatz." } : f));
    const g = buildFunktionsgruppen({ funktionen: fremd, liveExtras: register.liveExtras });
    const aufmass = g.flatMap((x) => x.details).find((d) => d.slug === "aufmass");
    expect(aufmass?.name).toBe("Fremdname");
    expect(aufmass?.benefit).toBe("Fremdsatz.");
  });

  it("wirft, wenn eine zugeordnete Detailfunktion in lib/funktionen.ts fehlt", () => {
    const ohne = funktionen.filter((f) => f.slug !== "aufmass");
    expect(() => buildFunktionsgruppen({ funktionen: ohne, liveExtras: register.liveExtras })).toThrow(
      "Funktionsgruppen: Funktion aufmass fehlt in lib/funktionen.ts – Zuordnung in lib/funktionsgruppen.ts korrigieren.",
    );
  });

  it("wirft, wenn eine Detailfunktion aus lib/funktionen.ts keiner Gruppe zugeordnet ist", () => {
    const neu = { ...funktionen[0], slug: "neue-funktion", name: "Neue Funktion" };
    expect(() =>
      buildFunktionsgruppen({ funktionen: [...funktionen, neu], liveExtras: register.liveExtras }),
    ).toThrow(
      "Funktionsgruppen: Funktion neue-funktion aus lib/funktionen.ts ist keiner Gruppe zugeordnet – Eintrag in lib/funktionsgruppen.ts ergänzen.",
    );
  });
});

describe("Funktionsgruppen: 14 beworbene Zusatzfunktionen", () => {
  it("ordnet jede beworbene Zusatzfunktion genau einer Gruppe in der festgelegten Reihenfolge zu", () => {
    for (const soll of ERWARTETE_GRUPPEN) {
      expect(gruppe(soll.id).extras.map((x) => x.id)).toEqual([...soll.extras]);
    }
    const alle = gruppen.flatMap((g) => g.extras);
    expect(beworben).toHaveLength(14);
    expect(alle).toHaveLength(beworben.length);
    expect(new Set(alle.map((x) => x.id)).size).toBe(14);
    expect(alle.map((x) => x.registerName).sort()).toEqual(beworben.map((x) => x.name).sort());
  });

  it("REGISTER_IDS ist beidseitig vollständig: jede id existiert im Register, „Vorhersagen“ hat keine", () => {
    expect(Object.keys(REGISTER_IDS).sort()).toEqual(beworben.map((x) => x.name).sort());
    expect(Object.values(REGISTER_IDS).sort()).toEqual(Object.keys(ERWARTETE_ZUSATZ).sort());
    expect(REGISTER_IDS[sprachenName]).toBe("sprachen");
    expect(register.liveExtras.find((x) => x.name === "Vorhersagen")?.advertised).toBe(false);
    expect(REGISTER_IDS["Vorhersagen"]).toBeUndefined();
    const namen = gruppen.flatMap((g) => [...g.details.map((d) => d.name), ...g.extras.map((x) => x.name)]);
    expect(namen.some((n) => n.includes("Vorhersage"))).toBe(false);
  });

  it("Anzeigename, Icon, Nutzensatz und Plattformen entsprechen UI-SPEC und Register", () => {
    for (const x of gruppen.flatMap((g) => g.extras)) {
      const soll = ERWARTETE_ZUSATZ[x.id];
      const quelle = register.liveExtras.find((e) => e.name === x.registerName);
      expect(x.kind).toBe("zusatz");
      expect(x.name).toBe(soll.name);
      expect(iconName(x.icon)).toBe(soll.icon);
      expect(x.benefit).toBe(soll.benefit);
      expect(x.platforms).toEqual(quelle?.platforms);
    }
  });

  it("Namen ≤ 32 Zeichen, Nutzensätze genau ein Satz ≤ 100, 1–7 Einträge je Gruppe", () => {
    const problems: string[] = [];
    for (const g of gruppen) {
      if (g.extras.length < 1 || g.extras.length > TEXT_BUDGET.count.featureList.max) problems.push(`${g.id}: Anzahl`);
      for (const e of [...g.details, ...g.extras]) {
        if (charCount(e.name) > TEXT_BUDGET.featureList.name) problems.push(`${e.name}: Name zu lang`);
        if (charCount(e.benefit) > TEXT_BUDGET.featureList.benefit) problems.push(`${e.name}: Nutzen zu lang`);
        if (sentenceCount(e.benefit) !== 1) problems.push(`${e.name}: nicht genau ein Satz`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("Ziele: Hilfeartikel und Funktionsseite mit Label aus der Zielseite, übrige ohne Ziel", () => {
    for (const x of gruppen.flatMap((g) => g.extras)) {
      const soll = ERWARTETE_ZUSATZ[x.id].target;
      if (!soll) {
        expect(x.target, x.id).toBeUndefined();
        continue;
      }
      expect(x.target?.href).toBe(soll.href);
      expect(x.target?.kind).toBe(soll.kind);
      if (soll.kind === "hilfe") {
        const slug = soll.href.replace("/hilfe/", "");
        const datei = path.join(ROOT, "content/hilfe", `${slug}.md`);
        expect(fs.existsSync(datei), datei).toBe(true);
        expect(x.target?.label).toBe(matter(fs.readFileSync(datei, "utf8")).data.title);
      } else {
        expect(x.target?.label).toBe("Projektverwaltung");
        expect(x.target?.label).toBe(getFunktion("projektverwaltung")?.name);
      }
    }
    expect(gruppen.flatMap((g) => g.extras).filter((x) => x.target)).toHaveLength(7);
  });

  it("jedes Ziel ist eine Route der Sitemap (kein toter Link)", async () => {
    const pfade = await sitemapPfade();
    const ziele = [
      ...gruppen.flatMap((g) => g.extras.flatMap((x) => (x.target ? [x.target.href] : []))),
      ...gruppen.flatMap((g) => g.details.map((d) => d.href)),
      "/funktionen",
    ];
    const tot = ziele
      .filter((href) => !pfade.has(href))
      .map((href) => `Menü: Ziel ${href} ist keine Route der Sitemap – Ziel in lib/funktionsgruppen.ts korrigieren oder Link entfernen.`);
    expect(tot).toEqual([]);
  });

  it("wirft für einen beworbenen Registereintrag ohne Gruppe den UI-SPEC-Fehlertext", () => {
    const liveExtras = [...register.liveExtras, { name: "Unbekannt", platforms: ["web" as const], advertised: true }];
    expect(() => buildFunktionsgruppen({ funktionen, liveExtras })).toThrow(
      "Funktionsgruppen: Unbekannt aus dem Produktregister ist keiner Gruppe zugeordnet – Eintrag in lib/funktionsgruppen.ts ergänzen.",
    );
  });

  it("ignoriert nicht beworbene Registereinträge", () => {
    const liveExtras = [...register.liveExtras, { name: "Intern", platforms: ["web" as const], advertised: false }];
    expect(buildFunktionsgruppen({ funktionen, liveExtras }).flatMap((g) => g.extras)).toHaveLength(14);
  });

  it("wirft für eine leere Gruppe den UI-SPEC-Fehlertext", () => {
    const ohneRechnung = funktionen.filter((f) => f.slug !== "rechnungen" && f.slug !== "e-rechnung");
    const ohneMahnwesen = register.liveExtras.filter((x) => x.name !== "Mahnwesen");
    expect(() => buildFunktionsgruppen({ funktionen: ohneRechnung, liveExtras: ohneMahnwesen })).toThrow(
      "Funktionsgruppen: Gruppe rechnung enthält keine Funktion – Zuordnung in lib/funktionsgruppen.ts ergänzen.",
    );
  });
});

describe("Funktionsgruppen: Menü-Fußleiste und Craft AI (D-15)", () => {
  it("Fußleiste hat fünf Links in der festgelegten Reihenfolge", () => {
    expect(menuFooterLinks).toEqual([
      { label: "Alle Funktionen", href: "/funktionen" },
      { label: "Mobile-App", href: "/app" },
      { label: "Craft AI", href: "/craft-ai" },
      { label: "GoBD & Nachvollziehbarkeit", href: "/gobd" },
      { label: "Warum CraftOS?", href: "/vergleich" },
    ]);
  });

  it("Craft AI und KI-Agent erscheinen in keiner Gruppe", () => {
    const namen = gruppen.flatMap((g) => [g.label, ...g.details.map((d) => d.name), ...g.extras.map((x) => x.name)]);
    expect(namen.filter((n) => n === "Craft AI" || n.includes("KI-Agent"))).toEqual([]);
  });

  it("jeder Fußleistenlink ist eine Route der Sitemap", async () => {
    const pfade = await sitemapPfade();
    expect(menuFooterLinks.filter((l) => !pfade.has(l.href)).map((l) => l.href)).toEqual([]);
  });
});
