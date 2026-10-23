/**
 * Inhalte der Seite `/vergleich/handwerkersoftware-kleine-betriebe` (08-UI-SPEC § 6, § 3.2, § 3.3, § 9, C5; D-02,
 * D-09, D-10; SEO-09 Prompt #1 zu Software für kleine Betriebe, Ziel #antwort laut docs/seo/ai-prompts-targets.json).
 *
 * Neutral und ohne Rangfolge: CraftOS ist eine von fünf Tabellenzeilen, die Tabelle hat keine Hervorhebung (C5);
 * keine Superlative (U7). Inhabervorgabe 22.10.2026 („Nur, was unterstützt wird, nicht, was nicht unterstützt
 * wird“; geht der UI-SPEC vor): keine Aussage, dass CraftOS etwas nicht kann, keine verneinte CraftOS-Zelle, keine
 * Kriterien, die CraftOS nicht hat (DESIGN-V2.md § 17.6). Fairness entsteht über die belegten Angaben der Anbieter.
 *
 * Quellenregel: CraftOS-Werte nur aus lib/site.ts; Wettbewerberwerte nur per Vorlage aus lib/wettbewerber/* über den
 * gemeinsamen Helfer `baueMarktuebersicht` (lib/seiten/vergleich.ts); Rechtsangaben nur aus `AMTLICH` (amtliche
 * Quellen mit Abrufdatum, Werte von Hand übernommen). In dieser Datei stehen keine Preis- oder Tagesliterale.
 * Tests: tests/vergleich-seiten.test.ts, tests/design-v2-budgets.test.ts, tests/pricing-parity.test.ts.
 */
import { CalendarClock, ClipboardCheck, FileCheck2, Receipt, Smartphone, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Cell, ComparisonSource } from "@/components/v2/ComparisonTable";
import type { Step } from "@/components/v2/StepFlow";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { einrichtung } from "@/lib/einrichtung";
import { euro } from "@/lib/format";
import { ERLAUBTE_ANORDNUNGEN } from "@/lib/funktionsdetails";
import { pruefeNurUnterstuetzt } from "@/lib/nur-unterstuetzt";
import {
  UEBERSICHT_SPALTEN,
  VERGLEICHS_CTA,
  alphabetisch,
  baueMarktuebersicht,
  gross,
  monatlichKuendbar,
  zahlwort,
  type MarktSpalte,
  type Marktuebersicht,
} from "@/lib/seiten/vergleich";
import { site, tarife, vertrag } from "@/lib/site";
import { craftosRechenbeispiel, heroVariante, pruefeText, wettbewerber as alleWettbewerber } from "@/lib/wettbewerber";
import type { Fakt, Wettbewerber, WettbewerberSlug } from "@/lib/wettbewerber/types";

export const KLEINE_BETRIEBE_PFAD = "/vergleich/handwerkersoftware-kleine-betriebe" as const;

// ---------------------------------------------------------------------------
// Amtliche Quellen (T-08-42): Werte von Hand aus der Quelle übernommen, Abrufdatum = Prüfdatum.
// ---------------------------------------------------------------------------

const BMF = "Bundesfinanzministerium";
const ABGERUFEN = "2026-10-22";

/**
 * Rechtsangaben mit amtlicher Quelle. Geprüft am 22.10.2026:
 * - BMF-FAQ E-Rechnung (Stand März 2026): Frage 8/12 „seit dem 1. Januar 2025 den Empfang einer E-Rechnung
 *   sicherstellen“; Frage 11 Übergangsfristen bis Ende 2026 bzw. 2027 (Vorjahresumsatz bis 800.000 Euro), erst
 *   danach „tatsächlich verpflichtend“; Frage 4 Ausnahmen u. a. Kleinbeträge „bis 250 Euro Bruttobetrag“ (§ 33 UStDV)
 *   und Leistungen von Kleinunternehmern (§ 34a UStDV).
 * - GoBD: Rz. 64 („Korrektur- bzw. Stornobuchungen müssen auf die ursprüngliche Buchung rückbeziehbar sein“),
 *   Rz. 58 ff. und 107 f. (Unveränderbarkeit, „Festschreibung“) im AO-Handbuch; geltende Fassung laut
 *   BMF-Schreiben vom 14.07.2025 (2. Änderung, anzuwenden ab 14.07.2025).
 */
export const AMTLICH = {
  eRechnung: {
    quelle: {
      anbieter: BMF,
      label: "Fragen und Antworten zur E-Rechnung",
      url: "https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html",
      abgerufenAm: ABGERUFEN,
    },
    /** Empfang von E-Rechnungen zwischen inländischen Unternehmen sicherstellen seit (ISO). */
    empfangSeit: "2025-01-01",
    /** Ausstellen nach Ablauf der Übergangsfristen grundsätzlich Pflicht ab Jahr. */
    ausstellenAbJahr: 2028,
    /** Ausnahme Kleinbetragsrechnungen bis zu diesem Bruttobetrag in Euro. */
    kleinbetragBisEuro: 250,
  },
  gobd: {
    quellen: [
      {
        anbieter: BMF,
        label: "GoBD, BMF-Schreiben vom 14.07.2025",
        url: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html",
        abgerufenAm: ABGERUFEN,
      },
      {
        anbieter: BMF,
        label: "GoBD im AO-Handbuch, Anhang 33",
        url: "https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html",
        abgerufenAm: ABGERUFEN,
      },
    ],
  },
} as const satisfies {
  eRechnung: { quelle: ComparisonSource; empfangSeit: string; ausstellenAbJahr: number; kleinbetragBisEuro: number };
  gobd: { quellen: readonly ComparisonSource[] };
};

const MONATE = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
] as const;
/** ISO-Datum → „1. Januar 2025“. */
function langesDatum(iso: string): string {
  const [jahr, monat, tag] = iso.split("-").map(Number);
  return `${tag}. ${MONATE[monat - 1]} ${jahr}`;
}
const jahrVon = (iso: string) => iso.slice(0, 4);

// ---------------------------------------------------------------------------
// Anbietertabelle (§ 6 Abschnitt 2): Spalten wie /vergleich plus „Weitere mobile Person“ (P3, Zahlweise je Zelle)
// ---------------------------------------------------------------------------

const app = tarife.find((t) => t.id === "app")!;
const euroCent = (c: number) => euro(c / 100);
/** Anbieterschreibweise ganzer Euro („25 €“), sonst mit Cent (wie die Alternativen-Seiten). */
const euroKurz = (c: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: c % 100 === 0 ? 0 : 2 }).format(
    c / 100,
  );

/** `imPaket` = weitere Personen sind bis zur Paketgröße im Paketpreis enthalten (keine eigene Lizenz, LO-04). */
type Zelle = { wert: Cell; beleg?: Fakt<unknown>; imPaket?: boolean };

/** Preis einer weiteren Person auf der Baustelle, netto je Person und Monat, mit Zahlweise (P3); belegt. */
const WEITERE_PERSON: Readonly<Record<WettbewerberSlug, (w: Wettbewerber) => Zelle>> = {
  craftnote: (w) => {
    const baustelle = w.preise.wert.find((p) => p.paket === "Baustelle");
    if (!baustelle?.centsJahrJeMonat) throw new Error("Kleine Betriebe: Craftnote-Paket „Baustelle“ ohne Jahrespreis – Datenmodul prüfen.");
    return { wert: `${euroCent(baustelle.centsJahrJeMonat)} (Jahresabo)`, beleg: w.preise };
  },
  hero: (w) => {
    if (heroVariante(w) === "B") return { wert: "laut hero-software.de", beleg: w.preise };
    const lizenz = w.zusatzPreise?.appLizenz;
    if (!lizenz?.wert.centsMonat) throw new Error("Kleine Betriebe: HERO-App-Lizenz ohne Monatspreis – Datenmodul prüfen.");
    return { wert: `${euroKurz(lizenz.wert.centsMonat)} (monatlich)`, beleg: lizenz };
  },
  plancraft: (w) => {
    const mobil = w.zusatzPreise?.mobilzugang;
    if (!mobil?.wert.centsMonat) throw new Error("Kleine Betriebe: plancraft-Mobilzugang ohne Monatspreis – Datenmodul prüfen.");
    return { wert: `${euroCent(mobil.wert.centsMonat)} (Monatsabo)`, beleg: mobil };
  },
  tooltime: (w) => {
    const team = w.preise.wert.find((p) => p.paket === "Team");
    const personen = Number(/\d+/.exec(team?.enthalten ?? "")?.[0]);
    if (!Number.isInteger(personen) || personen < 2)
      throw new Error("Kleine Betriebe: ToolTime-Paket „Team“ ohne Personenzahl in „enthalten“ – Datenmodul prüfen.");
    return { wert: `im Paket, bis ${personen} Personen`, beleg: w.preise, imPaket: true };
  },
};

/**
 * Paketgrößen mit mehreren Personen laut `enthalten` („Team bis 5, Max bis 10 Personen“), ME-04: Mitarbeitende sind
 * nur bis zur Paketgröße im Paketpreis enthalten.
 */
function paketGroessen(w: Wettbewerber): string {
  const teile = w.preise.wert.flatMap((p) => {
    const n = Number(/\d+/.exec(p.enthalten ?? "")?.[0]);
    return Number.isInteger(n) && n > 1 ? [`${p.paket} bis ${n}`] : [];
  });
  if (teile.length === 0) throw new Error(`Kleine Betriebe: ${w.name} ohne Paket mit Personenzahl in „enthalten“ – Datenmodul prüfen.`);
  return `${teile.join(", ")} Personen`;
}

const PERSON_SPALTE: MarktSpalte = {
  key: "person",
  label: "Weitere mobile Person",
  craftos: `${euro(app.monat)} (Monatsabo)`,
  wettbewerber: (w) => {
    const { wert, beleg } = WEITERE_PERSON[w.slug](w);
    return { wert, beleg };
  },
};

/**
 * Antwortanfang „Brauchen Mitarbeitende … eine eigene Lizenz?“ aus `WEITERE_PERSON` (LO-04): Anteil der Anbieter
 * (einschließlich CraftOS mit App-Lizenz), bei denen eine weitere Person eine eigene Lizenz braucht.
 */
function eigeneLizenzAnfang(anbieter: readonly Wettbewerber[]): string {
  const gesamt = anbieter.length + 1;
  const eigene = 1 + anbieter.filter((w) => !WEITERE_PERSON[w.slug](w).imPaket).length;
  if (eigene === gesamt) return "Bei allen verglichenen Anbietern ja";
  return eigene * 2 > gesamt ? "Bei den meisten verglichenen Anbietern ja" : "Bei einigen verglichenen Anbietern ja";
}

function hubSpalte(key: string): MarktSpalte {
  const spalte = UEBERSICHT_SPALTEN.find((s) => s.key === key);
  if (!spalte) throw new Error(`Kleine Betriebe: Spalte „${key}“ fehlt in UEBERSICHT_SPALTEN (lib/seiten/vergleich.ts).`);
  return spalte;
}

const ANBIETER_SPALTEN: readonly MarktSpalte[] = [hubSpalte("abrechnung"), hubSpalte("laufzeit"), PERSON_SPALTE, hubSpalte("testphase")];

/** Ergänzung des Pflichthinweises (§ 6 Abschnitt 2). */
const PERSON_HINWEIS = "Weitere mobile Person: netto je Person und Monat, Zahlweise in Klammern.";

// ---------------------------------------------------------------------------
// Abschnitte, Flächen und feste Texte (UI-SPEC § 6, § 9; Anker-Konvention DESIGN-V2 § 17)
// ---------------------------------------------------------------------------

export const KLEINE_BETRIEBE_SECTION_IDS = ["kriterien", "anbieter", "testen", "faq"] as const;
export type KleineBetriebeSectionId = (typeof KLEINE_BETRIEBE_SECTION_IDS)[number];

export const KLEINE_BETRIEBE_SURFACES: Readonly<Record<"kopf" | KleineBetriebeSectionId | "cta", "dark" | "white" | "warm">> = {
  kopf: "dark",
  kriterien: "white",
  anbieter: "warm",
  testen: "white",
  faq: "warm",
  cta: "dark",
};

export interface Kriterienkachel {
  title: string;
  text: string;
  size: "sm" | "md";
  icon: LucideIcon;
  /** URLs der amtlichen Quellen dieser Kachel (Einträge in `kriterien.quellen`); Anbieterangaben belegt die Tabelle. */
  quellen: string[];
}

const SCHRITTE: Step[] = [
  { title: "Auftrag auswählen", text: "Einen laufenden, typischen Auftrag mit Aufmaß und Material nehmen." },
  { title: "Angebot schreiben", text: "Positionen anlegen, Angebot versenden und Freigabe einholen." },
  { title: "Baustelle einbinden", text: "Eine Person erfasst Zeiten und Fotos in der Mobile-App." },
  { title: "Rechnung stellen", text: "Rechnung als E-Rechnung erzeugen und den Export prüfen." },
];

/** Rechenbeispiel der FAQ „fünf Personen“: eine Voll-Lizenz im Büro, vier App-Lizenzen (wie die Alternativen-Seiten). */
const BEISPIEL = { voll: 1, app: 4 } as const;

function laufzeitText(anbieter: readonly Wettbewerber[]): string {
  const monate = anbieter.map((w) => {
    const n = Number.parseInt(w.laufzeit.wert, 10);
    if (!Number.isInteger(n)) throw new Error(`Kleine Betriebe: Laufzeit „${w.laufzeit.wert}“ (${w.name}) ohne Monatszahl – Datenmodul prüfen.`);
    return n;
  });
  const laengste = Math.max(1, ...monate);
  if (laengste === 1) return `Alle verglichenen Anbieter sind ${vertrag.monat}.`;
  return `Die verglichenen Anbieter reichen von ${vertrag.monat} bis ${zahlwort(laengste)} Monate Laufzeit.`;
}

function testphasenText(anbieter: readonly Wettbewerber[]): string {
  const tage = [site.trialDays, ...anbieter.map((w) => w.testphaseTage.wert)];
  return `Die Testphasen der verglichenen Anbieter reichen von ${Math.min(...tage)} bis ${Math.max(...tage)} Tagen.`;
}

function kriterienKacheln(anbieter: readonly Wettbewerber[]): Kriterienkachel[] {
  const e = AMTLICH.eRechnung;
  return [
    {
      title: "E-Rechnung empfangen und erstellen",
      text: `Zwischen Unternehmen: Empfang seit ${jahrVon(e.empfangSeit)} Pflicht, Ausstellen ab ${e.ausstellenAbJahr} grundsätzlich.`,
      size: "md",
      icon: Receipt,
      quellen: [e.quelle.url],
    },
    {
      title: "Kosten für Ihre Personenzahl",
      text: "Rechnen Sie Büro- und Baustellenzugänge für Ihr Team, nicht nur den Einstiegspreis.",
      size: "sm",
      icon: Users,
      quellen: [],
    },
    {
      title: "Laufzeit und Kündigungsfrist",
      text: laufzeitText(anbieter),
      size: "sm",
      icon: CalendarClock,
      quellen: [],
    },
    {
      title: "Mobile-App fürs Team",
      text: "Zeiten, Einsätze und Fotos gehören aufs Handy, oft mit eigener, günstigerer Lizenz.",
      size: "md",
      icon: Smartphone,
      quellen: [],
    },
    {
      title: "GoBD-gerechte Abläufe",
      text: "Festgeschriebene Rechnungen und nachvollziehbare Korrekturen gehören zur Buchführung.",
      size: "sm",
      icon: FileCheck2,
      quellen: AMTLICH.gobd.quellen.map((q) => q.url),
    },
    {
      title: "Test mit echtem Auftrag",
      text: testphasenText(anbieter),
      size: "sm",
      icon: ClipboardCheck,
      quellen: [],
    },
  ];
}

// ---------------------------------------------------------------------------
// Seiteninhalt
// ---------------------------------------------------------------------------

export interface KleineBetriebeInhalt {
  kopf: {
    eyebrow: string;
    kopfwort: string;
    answer: string;
    stand: string;
    secondary: { label: string; href: string };
  };
  sections: Record<KleineBetriebeSectionId, { title: string; lead: string }>;
  kriterien: { kacheln: Kriterienkachel[]; quellen: ComparisonSource[] };
  anbieter: { tabelle: Marktuebersicht };
  schritte: Step[];
  ratgeber: { label: string; href: string };
  faq: { q: string; a: string }[];
  cta: typeof VERGLEICHS_CTA;
}

function pruefeAntwort(feld: string, text: string, maxSaetze = 2) {
  const n = charCount(text);
  if (n > TEXT_BUDGET.answer) throw new Error(`Kleine Betriebe: ${feld} hat ${n} von ${TEXT_BUDGET.answer} Zeichen – Antwort kürzen.`);
  if (sentenceCount(text) > maxSaetze) throw new Error(`Kleine Betriebe: ${feld} hat mehr als ${maxSaetze} Sätze.`);
}

const kleinAnfang = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Baut und prüft den Seiteninhalt; `anbieter` nur für Fixture-Tests abweichend. */
export function baueKleineBetriebe(anbieter: readonly Wettbewerber[] = alleWettbewerber): KleineBetriebeInhalt {
  const sortiert = alphabetisch(anbieter);
  const tabelle = baueMarktuebersicht({
    caption: "Handwerkersoftware für kleine Betriebe",
    spalten: ANBIETER_SPALTEN,
    anbieter: sortiert,
    noteZusatz: PERSON_HINWEIS,
  });
  const e = AMTLICH.eRechnung;
  const beispiel = craftosRechenbeispiel(BEISPIEL);
  const paketPersonen = sortiert.find((w) => WEITERE_PERSON[w.slug](w).imPaket);

  const inhalt: KleineBetriebeInhalt = {
    kopf: {
      eyebrow: "Vergleich",
      kopfwort: "Handwerkersoftware",
      answer:
        "Für einen kleinen Handwerksbetrieb eignet sich eine Software, die Angebote, Rechnungen mit E-Rechnung, Einsatzplanung und eine Mobile-App fürs Team abdeckt, für Ihre Personenzahl bezahlbar bleibt und kurz kündbar ist; prüfen Sie das mit einem echten Auftrag.",
      stand: `Anbieterangaben Stand ${tabelle.stand}, Quellen unter der Tabelle`,
      secondary: { label: "Zu den Kriterien", href: "#kriterien" },
    },
    sections: {
      kriterien: {
        title: "Welche Kriterien zählen für kleine Betriebe?",
        lead: "Wichtig sind E-Rechnung, Kosten für Ihre Personenzahl, Laufzeit, eine Mobile-App fürs Team, GoBD-gerechte Abläufe und ein Test mit echtem Auftrag.",
      },
      anbieter: {
        title: `${gross(zahlwort(sortiert.length + 1))} Anbieter für kleine Betriebe im Überblick`,
        lead: "Abrechnung, Laufzeit, Preis für weitere Personen und Testphase laut den Seiten der Anbieter.",
      },
      testen: {
        // UI-SPEC § 9 nennt „Wie testen Sie Handwerkersoftware mit einem Auftrag?“; die Silbentrennung brach das
        // Kopfwort („Hand-werkersoftware“ bei 360 px, „Handwerker-software“ bei 1440 px, Sichtprüfung 08-11). Das
        // Kopfwort steht in H1, Kopfantwort und im Ratgeber-Link desselben Abschnitts.
        title: "Wie testen Sie eine Software mit einem Auftrag?",
        lead: "Spielen Sie einen echten Auftrag vom Aufmaß bis zur Rechnung durch und beziehen Sie eine Person von der Baustelle mit ein.",
      },
      faq: {
        title: "Häufige Fragen zu Software für kleine Betriebe",
        lead: "Kurze Antworten zu E-Rechnung, Kosten, Laufzeit und Lizenzen für das Team.",
      },
    },
    kriterien: {
      kacheln: kriterienKacheln(sortiert),
      quellen: [{ ...e.quelle }, ...AMTLICH.gobd.quellen.map((q) => ({ ...q }))],
    },
    anbieter: { tabelle },
    schritte: SCHRITTE,
    ratgeber: { label: "Ratgeber: Handwerkersoftware auswählen", href: "/blog/handwerkersoftware-auswaehlen" },
    faq: [
      {
        q: "Ab wann muss ein kleiner Betrieb E-Rechnungen ausstellen?",
        a: `Für Rechnungen zwischen Unternehmen im Inland gilt: Empfangen müssen Betriebe E-Rechnungen seit dem ${langesDatum(e.empfangSeit)}; das Ausstellen wird nach Übergangsfristen ab ${e.ausstellenAbJahr} grundsätzlich für alle Pflicht, ausgenommen etwa Kleinbetragsrechnungen bis ${e.kleinbetragBisEuro} € brutto und Rechnungen von Kleinunternehmern.`,
      },
      {
        q: `Was kostet Handwerkersoftware für ${zahlwort(BEISPIEL.voll + BEISPIEL.app)} Personen?`,
        a: `Bei CraftOS zahlen eine Person im Büro und ${zahlwort(BEISPIEL.app)} auf der Baustelle im Jahresabo ${euro(beispiel.jahrJeMonatCents / 100)} netto im Monat; die Preise der anderen Anbieter stehen in den Einzelvergleichen.`,
      },
      {
        q: "Kann ich Handwerkersoftware monatlich kündigen?",
        a: `Das hängt vom Anbieter ab: ${kleinAnfang(monatlichKuendbar(sortiert))}`,
      },
      {
        q: "Brauchen Mitarbeitende auf der Baustelle eine eigene Lizenz?",
        a: `${eigeneLizenzAnfang(sortiert)}; bei CraftOS ist das die ${app.name} für ${euro(app.monat)} netto im Monat${
          paketPersonen ? `, bei ${paketPersonen.name} sind Mitarbeitende bis zur Paketgröße im Paketpreis enthalten (${paketGroessen(paketPersonen)})` : ""
        }.`,
      },
      // D-41 (Inhaber 23.10.2026): Wechsel mit kostenloser Einrichtung, Wortlaut aus lib/einrichtung.ts.
      { ...einrichtung.faqWechsel },
    ],
    cta: VERGLEICHS_CTA,
  };

  // Antwort zuerst (D-09, C3): Kopf, Frage-H2 und FAQ ≤ 300.
  pruefeAntwort("Kopfantwort", inhalt.kopf.answer);
  pruefeAntwort("Antwort „kriterien“", inhalt.sections.kriterien.lead);
  pruefeAntwort("Antwort „testen“", inhalt.sections.testen.lead);
  for (const f of inhalt.faq) pruefeAntwort(`FAQ „${f.q}“`, f.a);

  // Kriterienkacheln: erlaubte Anordnung (07-UI-SPEC Abschnitt 4), amtliche Quellen in der Liste.
  const anordnung = inhalt.kriterien.kacheln.map((k) => k.size).join("·");
  if (!ERLAUBTE_ANORDNUNGEN.includes(anordnung))
    throw new Error(`Kleine Betriebe: Anordnung ${anordnung} ist nicht zulässig – Größenfolge laut ERLAUBTE_ANORDNUNGEN wählen.`);
  const quellUrls = new Set(inhalt.kriterien.quellen.map((q) => q.url));
  for (const k of inhalt.kriterien.kacheln)
    for (const url of k.quellen)
      if (!quellUrls.has(url)) throw new Error(`Kleine Betriebe: Kachel „${k.title}“ nennt Quelle ${url}, die in der Quellenliste fehlt.`);

  // UWG-Wortliste (U7, inkl. Superlativen) und Negativsätze über alle Seitentexte (ohne Datenmodul-Belege).
  const texte: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") texte.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk([inhalt.kopf, inhalt.sections, tabelle.rows, tabelle.note, tabelle.disclaimer, inhalt.schritte, inhalt.faq, inhalt.cta]);
  walk(inhalt.kriterien.kacheln.map(({ title, text }) => ({ title, text })));
  for (const text of texte) pruefeText(text);
  // Inhabervorgabe 22.10.2026: zentraler Leitlinien-Schutz (Negativsätze, Nein-FAQ, verneinte CraftOS-Zellen).
  pruefeNurUnterstuetzt(
    { ...inhalt, kriterien: { kacheln: inhalt.kriterien.kacheln.map(({ title, text }) => ({ title, text })) } },
    { kontext: "Kleine Betriebe" },
  );
  return inhalt;
}

/** Inhalt der Seite „kleine Betriebe“ (geprüft beim Laden). */
export const kleineBetriebe: KleineBetriebeInhalt = baueKleineBetriebe();
