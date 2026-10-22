/**
 * Inhalte der Preisseite `/preise` answer-first (08-UI-SPEC § 4; SEO-04, SEO-06, SEO-09, D-05, D-09, D-12, D-16).
 *
 * Quellenregel: Alle CraftOS-Werte stammen aus lib/site.ts (tarife, zahlung, vertrag, extraSpeicher, speicherPool,
 * startCredits, creditWertEuro, creditUmrechnung, creditPakete, site.trialDays, site.checkedAt) und werden mit
 * lib/format.ts formatiert; Monatswerte aus Jahresbeträgen über monatAusJahr (F1). Wettbewerberwerte kommen
 * ausschließlich aus lib/wettbewerber/* (Quelle und Abrufdatum je Angabe) und erscheinen nur per Vorlage.
 * In dieser Datei stehen keine Preis-, Tages- oder Eurobeträge als Literal (pricing-parity, preise-seite).
 * Begriff für zusätzlichen Speicher sitewide: „Extra-Speicher“ (PROD-03, llms.txt, live-check).
 * Tests: tests/preise-seite.test.ts, tests/pricing-parity.test.ts, tests/design-v2-budgets.test.ts.
 */
import { Navigation, Ruler } from "lucide-react";
import type { ComparisonColumn, ComparisonRow, ComparisonSource } from "@/components/v2/ComparisonTable";
import type { KeyFact } from "@/components/v2/KeyFacts";
import { appTiles, type AppTile } from "@/lib/app-content";
import { euro, germanDate } from "@/lib/format";
import type { KernpunktVisual } from "@/lib/funktionsdetails/types";
import { pruefeNurUnterstuetzt } from "@/lib/nur-unterstuetzt";
import {
  annualSavingPercent,
  creditPakete,
  creditUmrechnung,
  creditWertEuro,
  extraSpeicher,
  site,
  speicherPool,
  startCredits,
  tarife,
  vertrag,
  zahlung,
} from "@/lib/site";
import {
  craftnote,
  hero,
  heroVariante,
  monatAusJahr,
  plancraft,
  pruefeText,
  quellenFuer,
  standVon,
  tooltime,
} from "@/lib/wettbewerber";
import type { Preis, Wettbewerber } from "@/lib/wettbewerber/types";

function tarif(id: "voll" | "app") {
  const entry = tarife.find((t) => t.id === id);
  if (!entry) throw new Error(`preise: Tarif ${id} fehlt in lib/site.ts.`);
  return entry;
}

const voll = tarif("voll");
const app = tarif("app");
const cents = (wert: number) => Math.round(wert * 100);
const ganzeEuro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
/** Betrag aus Cent: ganze Euro ohne Nachkommastellen (Anbieterschreibweise), sonst mit Cent. */
const betrag = (c: number) => (c % 100 === 0 ? ganzeEuro.format(c / 100) : euro(c / 100));
/** „a, b, c oder d“ */
const oderListe = (teile: string[]) => `${teile.slice(0, -1).join(", ")} oder ${teile.at(-1)}`;
const stand = germanDate(site.checkedAt);
/** Jahresabo je Monat, rechnerisch, aus dem Jahresbetrag (F1). */
const jahrJeMonat = (jahr: number) => euro(monatAusJahr([cents(jahr)]) / 100);
const rabatt = Math.round(annualSavingPercent);
/** „50 GB“ aus speicherPool („… Speicher-Pool pro Betrieb“). */
const poolGroesse = speicherPool.split(" Speicher-Pool")[0];

// ---------------------------------------------------------------------------
// Abschnittsfolge und Flächen (Anker-Konvention DESIGN-V2 § 17: H2-id = Abschnitts-id)
// ---------------------------------------------------------------------------

export const PREISE_SECTION_IDS = ["lizenzen", "app-lizenz", "zusatzkosten", "was-kostet-handwerkersoftware", "faq"] as const;
export type PreiseSectionId = (typeof PREISE_SECTION_IDS)[number];

export const PREISE_SURFACES: Readonly<Record<"kopf" | PreiseSectionId | "cta", "dark" | "white" | "warm">> = {
  kopf: "dark",
  lizenzen: "white",
  "app-lizenz": "warm",
  zusatzkosten: "white",
  "was-kostet-handwerkersoftware": "warm",
  faq: "white",
  cta: "dark",
};

// ---------------------------------------------------------------------------
// Kopf (H1, Title und Description aus der Keyword-Map)
// ---------------------------------------------------------------------------

export const preiseKopf = {
  eyebrow: "Preise",
  kopfwort: "Handwerkersoftware",
  answer: `CraftOS kostet ${euro(voll.monat)} netto pro Person und Monat für die ${voll.name} mit Web-App und Mobile-App oder ${euro(voll.jahr)} im Jahresabo; die ${app.name} für Mitarbeitende auf der Baustelle kostet ${euro(app.monat)} im Monat oder ${euro(app.jahr)} im Jahr.`,
  stand: `Preise netto zzgl. USt., Stand ${stand}`,
  secondary: { label: "Lizenzen vergleichen", href: "#lizenzen" },
} as const;

// ---------------------------------------------------------------------------
// Marktspanne (Abschnitt 4): nur belegte Wettbewerberwerte, CraftOS zuerst, dann alphabetisch, ohne highlight
// ---------------------------------------------------------------------------

const HERO_OHNE_ZAHLEN = "laut hero-software.de";
const NICHT_ANGEGEBEN = "nicht angegeben";

function paket(w: Wettbewerber, name: string): Preis {
  const preis = w.preise.wert.find((p) => p.paket === name);
  if (!preis) throw new Error(`preise: Paket ${name} fehlt in lib/wettbewerber/${w.slug}.ts.`);
  return preis;
}

function monatZelle(p: Preis): string {
  if (p.centsMonat === undefined) return NICHT_ANGEGEBEN;
  return `${p.ab ? "ab " : ""}${betrag(p.centsMonat)}`;
}

/** U3: Statt-Preis im Wortlaut des Anbieters, Erstjahrespreis mit „1. Vertragsjahr“, „ab“ nur wie beim Anbieter. */
function jahrZelle(p: Preis): string {
  if (p.centsJahrJeMonat === undefined) return NICHT_ANGEGEBEN;
  const wert = `${p.ab ? "ab " : ""}${betrag(p.centsJahrJeMonat)}`;
  if (p.stattCents !== undefined) return `${wert} statt ${betrag(p.stattCents)}`;
  if (p.ersterJahrespreis) return `${wert} (1. Vertragsjahr)`;
  return wert;
}

/** Paketname mit Personenzahl, wenn der Anbieter das Paket über die Teamgröße definiert (ToolTime Solo). */
function personenPaket(p: Preis): string {
  const n = p.enthalten ? /^(\d+) Mitarbeiter$/.exec(p.enthalten)?.[1] : undefined;
  if (!n) return p.paket;
  return `${p.paket} (${n} ${n === "1" ? "Person" : "Personen"})`;
}

interface MarktZeile {
  label: string;
  paket: string;
  monat: string;
  jahr: string;
  /** Belegter Monatspreis in Cent (nur Zeilen mit Wert in Spalte „Monatlich“ zählen für die Spanne). */
  monatCents?: number;
  /** Belegtes Jahresabo je Monat in Cent (Spalte „Jahresabo je Monat“). */
  jahrCents?: number;
}

/**
 * Pakete, die laut Anbieter nur zusätzlich zu einem anderen Paket buchbar sind und deshalb nicht als kleinstes
 * Paket zählen (08-REVIEW HI-01). Jeder Eintrag braucht die belegte Angabe `angaben.mindestpaket` im Datenmodul
 * (Craftnote: „Um Pakete buchen zu können, ist mindestens ein Büro-Paket nötig“).
 */
export const NUR_ZUSAETZLICH: Readonly<Partial<Record<Wettbewerber["slug"], readonly string[]>>> = {
  craftnote: ["Baustelle"],
};

/** Einstiegspreis eines Pakets: monatliche Zahlweise, sonst Jahresabo je Monat (Anbieter ohne Monatspreis). */
const einstieg = (p: Preis) => p.centsMonat ?? p.centsJahrJeMonat;

/**
 * Kleinstes buchbares Paket laut Datenmodul (HI-01): günstigster Einstiegspreis ohne `NUR_ZUSAETZLICH`. Ohne
 * Preiszahlen (HERO Variante B) das erste genannte Paket. Keine Auswahl nach Funktionsumfang ohne Beleg.
 */
function kleinstesPaket(w: Wettbewerber): Preis {
  const ausgeschlossen = NUR_ZUSAETZLICH[w.slug] ?? [];
  if (ausgeschlossen.length && !w.angaben?.mindestpaket)
    throw new Error(`preise: ${w.name} schließt ${ausgeschlossen.join(", ")} ohne belegte Angabe angaben.mindestpaket aus.`);
  for (const name of ausgeschlossen) paket(w, name);
  const buchbar = w.preise.wert.filter((p) => !ausgeschlossen.includes(p.paket));
  const mitPreis = buchbar.filter((p) => einstieg(p) !== undefined);
  if (mitPreis.length === 0) return buchbar[0];
  return mitPreis.reduce((a, b) => (einstieg(b)! < einstieg(a)! ? b : a));
}

function marktZeile(w: Wettbewerber): MarktZeile {
  const p = kleinstesPaket(w);
  const name = w.slug === "hero" ? p.paket.replace(/^HERO\s+/, "") : personenPaket(p);
  if (w.slug === "hero" && heroVariante(hero) !== "A")
    return { label: w.name, paket: name, monat: HERO_OHNE_ZAHLEN, jahr: HERO_OHNE_ZAHLEN };
  return {
    label: w.name,
    paket: name,
    monat: monatZelle(p),
    jahr: jahrZelle(p),
    monatCents: p.centsMonat,
    jahrCents: p.centsJahrJeMonat,
  };
}

const verglichen = [craftnote, hero, plancraft, tooltime] as const;
const craftosJahrJeMonatCents = monatAusJahr([cents(voll.jahr)]);

const marktZeilen: MarktZeile[] = [
  {
    label: "CraftOS",
    paket: voll.name,
    monat: euro(voll.monat),
    jahr: jahrJeMonat(voll.jahr),
    monatCents: cents(voll.monat),
    jahrCents: craftosJahrJeMonatCents,
  },
  ...verglichen.map(marktZeile),
];

/** Kleinster und größter belegter Wert einer Spalte (nur Zeilen mit Betrag in dieser Spalte). */
function spanneVon(werte: (number | undefined)[]): { minCents: number; maxCents: number } {
  const belegt = werte.filter((c): c is number => c !== undefined);
  return { minCents: Math.min(...belegt), maxCents: Math.max(...belegt) };
}
const spanne = {
  monat: spanneVon(marktZeilen.map((z) => z.monatCents)),
  jahr: spanneVon(marktZeilen.map((z) => z.jahrCents)),
};
/** CraftOS-Werte immer mit Cent (Preisliste), Wettbewerber in Anbieterschreibweise. */
const spannenBetrag = (c: number) =>
  c === cents(voll.monat) || c === craftosJahrJeMonatCents ? euro(c / 100) : betrag(c);
const anbieterStand = germanDate(verglichen.map(standVon).reduce((a, b) => (b < a ? b : a)));

export const marktspanne: {
  caption: string;
  rowHeader: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  note: string;
  sources: ComparisonSource[];
  disclaimer: string;
  spanne: Record<"monat" | "jahr", { minCents: number; maxCents: number }>;
} = {
  caption: "Einstiegspakete im Vergleich",
  rowHeader: "Anbieter",
  columns: [
    { key: "paket", label: "Kleinstes Paket" },
    { key: "monat", label: "Monatlich" },
    { key: "jahr", label: "Jahresabo je Monat" },
  ],
  rows: marktZeilen.map((z) => ({ label: z.label, cells: { paket: z.paket, monat: z.monat, jahr: z.jahr } })),
  note: `Angaben ohne Gewähr, Stand ${anbieterStand}, Quellen unter der Tabelle. Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand ${stand}. Die Pakete unterscheiden sich im Funktionsumfang und in der Zahl der enthaltenen Personen.`,
  sources: verglichen.flatMap((w) => quellenFuer(w, ["preise"])),
  disclaimer: "Die Nennung der Anbieter dient der Zuordnung; es besteht keine Geschäftsbeziehung.",
  spanne,
};

// ---------------------------------------------------------------------------
// Abschnittsköpfe (Frage-H2 → Antwort-Lead ≤ 300, G2)
// ---------------------------------------------------------------------------

export const preiseSections = {
  lizenzen: {
    title: "Preise und Lizenzen im Überblick",
    lead: `Die ${voll.name} deckt Büro und Baustelle ab, die ${app.name} ergänzt sie für Ihr Team auf der Baustelle.`,
  },
  "app-lizenz": {
    title: "Was kostet die App-Lizenz für Mitarbeitende?",
    lead: `Die ${app.name} kostet ${euro(app.monat)} netto pro Person im Monat oder ${euro(app.jahr)} im Jahr und gibt Mitarbeitenden auf der Baustelle Zeiten, Einsätze, Aufmaß, Fotos und Urlaub in der Mobile-App.`,
  },
  zusatzkosten: {
    title: "Welche Kosten kommen zur Lizenz hinzu?",
    lead: `Hinzu kommen nur Credits für Craft AI und KI-Belegscans sowie Speicher über den ${poolGroesse.replace(" ", "-")}-Pool Ihres Betriebs hinaus; die Kernmodule gehören zur ${voll.name}.`,
  },
  "was-kostet-handwerkersoftware": {
    title: "Was kostet eine Handwerkersoftware pro Monat?",
    // HI-01: Spannen je Zahlweise aus den Tabellenzeilen; keine Einschränkung, die das Datenmodul nicht belegt.
    lead: `Das kleinste Paket kostet bei monatlicher Zahlung zwischen ${spannenBetrag(spanne.monat.minCents)} und ${spannenBetrag(spanne.monat.maxCents)} netto im Monat, im Jahresabo zwischen ${spannenBetrag(spanne.jahr.minCents)} und ${spannenBetrag(spanne.jahr.maxCents)} je Monat; weitere Personen kosten je nach Anbieter extra.`,
  },
  faq: {
    title: "Häufige Fragen zu den Preisen",
    lead: "Kurze Antworten zu Test, Abo, Jahresrabatt und Credits.",
  },
  cta: {
    title: "Machen Sie Platz für Ihr Handwerk.",
    text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
    secondary: { label: "Alle Funktionen ansehen", href: "/funktionen" },
  },
} as const;

// ---------------------------------------------------------------------------
// Lizenztabelle (Abschnitt 1): Werte aus tarife; Häkchen laut tarife.highlights (Belege nur Voll-Lizenz, 07 B11).
// Inhaber 22.10.2026 (08-REVIEW ME-01): Leistungen ohne App-Lizenz zeigen „mit Voll-Lizenz“ statt einer Nein-Zelle.
// ---------------------------------------------------------------------------

/** Zelle für Leistungen, die nur die Voll-Lizenz enthält (statt „Nein“, ME-01). */
const MIT_VOLL = `mit ${voll.name}`;

export const lizenzTabelle: {
  caption: string;
  rowHeader: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  note: string;
} = {
  caption: "Voll-Lizenz und App-Lizenz im Vergleich",
  rowHeader: "Leistung",
  columns: [
    { key: "voll", label: voll.name, highlight: true },
    { key: "app", label: app.name },
  ],
  rows: ([
    { label: "Monatsabo, netto", cells: { voll: euro(voll.monat), app: euro(app.monat) } },
    { label: "Jahresabo, netto", cells: { voll: euro(voll.jahr), app: euro(app.jahr) } },
    { label: "Jahresabo je Monat, rechnerisch", cells: { voll: jahrJeMonat(voll.jahr), app: jahrJeMonat(app.jahr) } },
    { label: "Für wen", cells: { voll: "Büro und Bauleitung", app: "Team auf der Baustelle" } },
    { label: "Web-App", cells: { voll: true, app: false } },
    { label: "Mobile-App", cells: { voll: true, app: true } },
    { label: "Angebote, Rechnungen und E-Rechnung", cells: { voll: true, app: false } },
    { label: "Plantafel und Projekte", cells: { voll: true, app: false } },
    { label: "Zeiten und zugewiesene Einsätze", cells: { voll: true, app: true } },
    { label: "Aufmaß, Fotos und Baudokumentation", cells: { voll: true, app: true } },
    { label: "Urlaub und Abwesenheiten", cells: { voll: true, app: true } },
    { label: "Belege, DATEV und Nachkalkulation", cells: { voll: true, app: false } },
  ] satisfies ComparisonRow[]).map((r) => ({
    ...r,
    cells: Object.fromEntries(Object.entries(r.cells).map(([k, v]) => [k, v === false ? MIT_VOLL : v])),
  })),
  // „Alle Preise netto zzgl. Umsatzsteuer“ statt „Preise netto zzgl. USt.“, damit die Paritätsprüfung greift;
  // Jahresrabatt ohne „günstiger als“ (UWG-Wortliste, U7), Wert aus annualSavingPercent.
  note: `Alle Preise netto zzgl. Umsatzsteuer, pro Person. Jährliches Abo: rund ${rabatt} % weniger als 12 Monatszahlungen. Quelle: Preisliste CraftOS, Stand ${stand}.`,
};

// ---------------------------------------------------------------------------
// App-Lizenz (Abschnitt 2): vier belegte /app-Kacheln, Texte unverändert aus lib/app-content.ts
// ---------------------------------------------------------------------------

export interface PreisKachel {
  size: "sm" | "md" | "lg";
  /** Warme Abschnittsfläche: Kacheln weiß, die große Zeitkachel bleibt dunkel. */
  surface: "white" | "dark";
  title: string;
  text: string;
  visual: KernpunktVisual;
  href: string;
}

function appKachel(titel: string): AppTile {
  const kachel = [...appTiles.zeit, ...appTiles.dokumentieren, ...appTiles.material].find((t) => t.title === titel);
  if (!kachel) throw new Error(`preise: Kachel ‚${titel}‘ fehlt in lib/app-content.ts.`);
  return kachel;
}

/** Raster lg, sm, sm, md wie /app (ab 1024 px lückenlos); Aufmaß als kleine Kachel mit Icon. */
const KACHELN: { titel: string; size: PreisKachel["size"]; icon?: KernpunktVisual }[] = [
  { titel: "Zeiterfassung mit Standort", size: "lg" },
  { titel: "Einsätze mit Navigation", size: "sm", icon: { kind: "icon", icon: Navigation } },
  { titel: "Aufmaß vor Ort", size: "sm", icon: { kind: "icon", icon: Ruler } },
  { titel: "Urlaub beantragen", size: "md" },
];

export const appLizenzKacheln: PreisKachel[] = KACHELN.map(({ titel, size, icon }) => {
  const kachel = appKachel(titel);
  return {
    size,
    surface: kachel.surface === "dark" ? "dark" : "white",
    title: kachel.title,
    text: kachel.text,
    visual: icon ?? kachel.visual,
    href: kachel.href,
  };
});

// ---------------------------------------------------------------------------
// Zusatzkosten (Abschnitt 3): KeyFacts aus site.ts (Kurzform site:)
// ---------------------------------------------------------------------------

export const zusatzkostenFakten: { facts: KeyFact[]; note: string } = {
  facts: [
    { value: poolGroesse, label: "Speicher-Pool pro Betrieb", source: "site:speicherPool" },
    { value: euro(extraSpeicher.monat), label: `je ${extraSpeicher.gb} GB Extra-Speicher im Monat`, source: "site:extraSpeicher-monat" },
    { value: String(startCredits), label: "Credits Startguthaben, einmalig", source: "site:startCredits" },
    { value: euro(creditWertEuro), label: "Wert eines Credits", source: "site:creditWertEuro" },
  ],
  note: `Zum Start erhält Ihr Betrieb einmalig ${startCredits} Credits für Craft AI und KI-Belegscans (${creditUmrechnung}); weitere Credits kaufen Sie im Voraus als Paket. Extra-Speicher kostet ${euro(extraSpeicher.monat)} im Monat oder ${euro(extraSpeicher.jahr)} im Jahr je ${extraSpeicher.gb} GB. Preise netto zzgl. USt., Stand ${stand}.`,
};

// ---------------------------------------------------------------------------
// FAQ (6, je ≤ 300; Quelle des FAQPage-JSON-LD)
// ---------------------------------------------------------------------------

const paketPreise = oderListe(creditPakete.map((p) => betrag(cents(p.preis))));
const paketGuthaben = oderListe(creditPakete.map((p) => betrag(cents(p.guthaben))));

export const preiseFaq: { q: string; a: string }[] = [
  {
    q: "Brauche ich für den Test eine Zahlungsmethode?",
    a: `Für den Test genügt ein Konto: Sie testen CraftOS ${site.trialDays} Tage kostenlos und hinterlegen eine Zahlungsmethode erst, wenn Sie ein Abo wählen.`,
  },
  {
    q: "Ist die Mobile-App in der Voll-Lizenz enthalten?",
    a: `Ja. Die ${voll.name} enthält Web-App und Mobile-App für dieselbe Person; wer nur auf der Baustelle arbeitet, erhält die ${app.name}.`,
  },
  {
    q: "Wie berechnet sich der Jahresrabatt?",
    a: `Das Jahresabo kostet zehn Monatsbeiträge, also ${euro(voll.jahr)} statt ${euro(voll.monat * 12)} für die ${voll.name}, rund ${rabatt} % weniger als zwölf Monatszahlungen.`,
  },
  {
    q: "Welche Lizenz braucht mein Betrieb mindestens?",
    a: `Mindestens eine ${voll.name}; ${app.name}en ergänzen sie für Mitarbeitende auf der Baustelle.`,
  },
  {
    q: "Wie wird CraftOS abgerechnet?",
    a: `CraftOS ist ein Abo, im Monatsabo ${vertrag.monat} und im Jahresabo ${vertrag.jahr}, bezahlt per ${zahlung.sepa} oder ${zahlung.karte}.`,
  },
  {
    q: "Was kosten Credit-Pakete?",
    a: `Credit-Pakete kosten ${paketPreise} netto und enthalten ${paketGuthaben} Guthaben; zum Start erhält jeder Betrieb einmalig ${startCredits} Credits (${creditUmrechnung}).`,
  },
];

// ---------------------------------------------------------------------------
// Prüfung beim Laden: kein Wort der UWG-Wortliste in den Preistexten (U7)
// ---------------------------------------------------------------------------

function pruefeAlle(wert: unknown): void {
  if (typeof wert === "string") pruefeText(wert);
  else if (Array.isArray(wert)) wert.forEach(pruefeAlle);
  else if (wert && typeof wert === "object") Object.values(wert).forEach(pruefeAlle);
}
pruefeAlle([preiseKopf, preiseSections, lizenzTabelle, zusatzkostenFakten, marktspanne, preiseFaq]);
pruefeAlle(appLizenzKacheln.map(({ title, text }) => ({ title, text })));

// Inhabervorgabe 22.10.2026 (08-REVIEW ME-06): nur Unterstütztes, keine Nein-Antwort und keine Nein-Zelle zu CraftOS.
pruefeNurUnterstuetzt(
  {
    preiseKopf,
    preiseSections,
    lizenzTabelle,
    zusatzkostenFakten,
    marktspanne,
    preiseFaq,
    kacheln: appLizenzKacheln.map(({ title, text }) => ({ title, text })),
  },
  { kontext: "Preise" },
);
