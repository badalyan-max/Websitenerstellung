/**
 * Prüf- und Rechenfunktionen für Wettbewerberangaben (08-UI-SPEC § 3.2 U1–U12, § 3.4 F1; D-01, D-02, D-04, D-16).
 * Seitenmodule (Alternativen, /vergleich, /preise, kleine Betriebe) beziehen Wettbewerberwerte nur von hier;
 * CraftOS-Werte kommen aus lib/site.ts (`tarife`, `vertrag`). Tests: tests/wettbewerber.test.ts.
 */
import "server-only";
import { ersteDoppelung } from "@/lib/funktionsdetails";
import { getProductRegister } from "@/lib/product-register";
import { tarife } from "@/lib/site";
import { craftnote } from "./craftnote";
import { hero } from "./hero";
import { plancraft } from "./plancraft";
import { tooltime } from "./tooltime";
import type { Fakt, KriteriumId, Preis, QuellenEintrag, Wettbewerber, WettbewerberName, WettbewerberSlug } from "./types";

/** Die vier verglichenen Anbieter in fester Reihenfolge (Datenmodule mit Neuprüfung je Angabe). */
export const wettbewerber: readonly Wettbewerber[] = [plancraft, craftnote, hero, tooltime];
export { craftnote, hero, plancraft, tooltime };

/** Ab diesem Alter (in Tagen) warnt `alterWarnung` (D-04); kein Abbruch. */
export const MAX_ALTER_TAGE = 60;

/** Verbotene Wörter in Vergleichs-, Preis- und Kleine-Betriebe-Texten (U7, U3); Wortgrenzen, ohne Groß-/Kleinschreibung. */
export const UWG_WORTLISTE = [
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
] as const;

/** Ganzes Wort bzw. ganze Wortfolge mit Unicode-Wortgrenzen, ohne Groß-/Kleinschreibung. */
function ganzesWort(wort: string): RegExp {
  const maskiert = wort.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\p{L}\\p{N}])${maskiert}(?![\\p{L}\\p{N}])`, "iu");
}

/**
 * Ankündigungen (U9, PROD-04): Namen der nicht-live CraftOS-Funktionen aus dem Produktregister (`notLive`, als
 * ganze Wörter) und Ankündigungsstämme mit beliebiger Endung („angekündig…“, „geplant…“; „eingeplant“ trifft
 * nicht). Die Namen stehen bewusst nicht als Literal in dieser Datei (tests/announcements.test.ts prüft lib/).
 */
const ANKUENDIGUNG_MUSTER: readonly RegExp[] = [
  ...getProductRegister().notLive.map((eintrag) => ganzesWort(eintrag.name)),
  ...["angekündig", "geplant"].map((stamm) => new RegExp(`(?<![\\p{L}\\p{N}])${stamm}\\p{L}*`, "iu")),
];

/** Anbieterschreibweise je slug (U8). */
const SCHREIBWEISE: Record<WettbewerberSlug, WettbewerberName> = {
  plancraft: "plancraft",
  craftnote: "Craftnote",
  hero: "HERO",
  tooltime: "ToolTime",
};

/**
 * Kriterien, die CraftOS nicht anbietet (U6-Fairnesszeile): KI-Telefonie ist nicht live (lib/product-register.ts
 * `notLive`), Zeiterfassung speichert nur Standortpunkte ohne Bewegungsverläufe
 * (lib/funktionen.ts `zeiterfassung`).
 */
export const CRAFTOS_OHNE: readonly KriteriumId[] = ["kiTelefon", "fahrzeugortung"];

export const HERO_VARIANTE_B_HINWEIS = "HERO-Preise ohne Screenshot-Beleg – Variante B ohne Zahlen rendern (D-16).";

const UWG_MUSTER = UWG_WORTLISTE.map((wort) => ({ wort, re: ganzesWort(wort) }));

/** Erstes Wort der UWG-Wortliste im Text, sonst undefined. */
export function uwgTreffer(text: string): (typeof UWG_WORTLISTE)[number] | undefined {
  return UWG_MUSTER.find((m) => m.re.test(text))?.wort;
}

/** Wirft, wenn ein Vergleichstext ein Wort der UWG-Wortliste enthält (U7). */
export function pruefeText(text: string): void {
  const wort = uwgTreffer(text);
  if (wort) throw new Error(`Vergleichstext enthält ‚${wort}‘ – sachlich formulieren (UWG-Wortliste).`);
}

/** Monatswert in Cent aus der Summe der Jahresbeträge, erst am Ende kaufmännisch gerundet (F1). */
export function monatAusJahr(jahrCents: readonly number[]): number {
  return Math.round(jahrCents.reduce((summe, cents) => summe + cents, 0) / 12);
}

const cents = (euro: number) => Math.round(euro * 100);

/** CraftOS-Rechenbeispiel aus `tarife` (z. B. 1 Voll- + 4 App-Lizenzen): Jahresabo je Monat und Monatsabo, in Cent. */
export function craftosRechenbeispiel(anzahl: { voll: number; app: number }): { jahrJeMonatCents: number; monatCents: number } {
  const voll = tarife.find((t) => t.id === "voll")!;
  const app = tarife.find((t) => t.id === "app")!;
  const jahr = [...Array(anzahl.voll).fill(cents(voll.jahr)), ...Array(anzahl.app).fill(cents(app.jahr))];
  return {
    jahrJeMonatCents: monatAusJahr(jahr),
    monatCents: anzahl.voll * cents(voll.monat) + anzahl.app * cents(app.monat),
  };
}

/** Alle Fakten eines Wettbewerbers mit Feldpfad (z. B. „kriterien.datev“, „staerken.1“). */
export function faktenVon(w: Wettbewerber): { feld: string; fakt: Fakt<unknown> }[] {
  const liste: { feld: string; fakt: Fakt<unknown> }[] = [
    { feld: "testphaseTage", fakt: w.testphaseTage },
    { feld: "laufzeit", fakt: w.laufzeit },
  ];
  if (w.kuendigung) liste.push({ feld: "kuendigung", fakt: w.kuendigung });
  if (w.kuendigungsfristTage) liste.push({ feld: "kuendigungsfristTage", fakt: w.kuendigungsfristTage });
  liste.push({ feld: "preise", fakt: w.preise });
  for (const [k, f] of Object.entries(w.zusatzPreise ?? {})) liste.push({ feld: `zusatzPreise.${k}`, fakt: f });
  for (const [k, f] of Object.entries(w.kriterien)) if (f) liste.push({ feld: `kriterien.${k}`, fakt: f });
  w.staerken.forEach((f, i) => liste.push({ feld: `staerken.${i}`, fakt: f }));
  for (const [k, f] of Object.entries(w.angaben ?? {})) liste.push({ feld: `angaben.${k}`, fakt: f });
  return liste;
}

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
const isoHeute = (heute: Date) =>
  `${heute.getFullYear()}-${String(heute.getMonth() + 1).padStart(2, "0")}-${String(heute.getDate()).padStart(2, "0")}`;

function gueltigesDatum(datum: unknown): datum is string {
  if (typeof datum !== "string") return false;
  const m = ISO.exec(datum);
  if (!m) return false;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return d.getUTCFullYear() === Number(m[1]) && d.getUTCMonth() === Number(m[2]) - 1 && d.getUTCDate() === Number(m[3]);
}

function aufDomain(url: unknown, domain: string): boolean {
  if (typeof url !== "string" || !url.startsWith("https://")) return false;
  try {
    const host = new URL(url).hostname;
    return host === domain || host.endsWith(`.${domain}`);
  } catch {
    return false;
  }
}

/** Alle Texte eines Fakts (wert als Text oder Kurztext, zitat). */
function texteVon(fakt: Fakt<unknown>): string[] {
  const texte: string[] = [];
  const sammle = (v: unknown) => {
    if (typeof v === "string") texte.push(v);
    else if (Array.isArray(v)) v.forEach(sammle);
    else if (v && typeof v === "object") Object.values(v).forEach(sammle);
  };
  sammle(fakt.wert);
  if (fakt.zitat) texte.push(fakt.zitat);
  return texte;
}

const PREISZAHLEN = ["centsMonat", "centsJahrJeMonat", "centsZweiJahreJeMonat", "stattCents", "regulaerDerzeitCents"] as const;

function pruefePreis(slug: string, feld: string, p: Preis): void {
  const fehler = (text: string) => new Error(`Wettbewerber ${slug}: ${feld} (${p.paket}) ${text}`);
  for (const k of PREISZAHLEN) {
    const v = p[k];
    if (v !== undefined && (!Number.isInteger(v) || v <= 0)) throw fehler(`${k} ist kein positiver Centbetrag.`);
  }
  if (p.regulaerDerzeitCents !== undefined && !p.ersterJahrespreis)
    throw fehler("nennt regulaerDerzeitCents ohne ersterJahrespreis – Folgejahrpreise nur als „regulär derzeit“ zum Erstjahrespreis (U3).");
  if (p.regulaerDerzeitCents !== undefined && p.centsJahrJeMonat === undefined)
    throw fehler("nennt regulaerDerzeitCents ohne centsJahrJeMonat (U3).");
  if (p.stattCents !== undefined) {
    const preis = p.centsJahrJeMonat ?? p.centsMonat;
    if (preis === undefined || p.stattCents <= preis)
      throw fehler("nennt stattCents ohne niedrigeren Preis – Statt-Preis nur im Wortlaut des Anbieters (U3).");
  }
}

const hatPreiszahl = (p: Preis) => PREISZAHLEN.some((k) => p[k] !== undefined);

/**
 * Prüft einen Wettbewerber vollständig (U1, U3, U6–U9, U11, D-04): Quelle (https auf der Herstellerdomain) und
 * gültiges, nicht zukünftiges Abrufdatum je Angabe, Preisfelder, Stärken, Wortliste, Ankündigungen, Schreibweise
 * und HERO-Variante. Wirft beim ersten Fehler mit Abhilfe.
 */
export function pruefeWettbewerber(w: Wettbewerber, heute: Date = new Date()): void {
  if (SCHREIBWEISE[w.slug] !== w.name)
    throw new Error(`Wettbewerber ${w.slug}: Name ‚${w.name}‘ – Schreibweise des Anbieters ‚${SCHREIBWEISE[w.slug]}‘ verwenden (U8).`);

  const heuteIso = isoHeute(heute);
  for (const { feld, fakt } of faktenVon(w)) {
    const datum = fakt?.abgerufenAm;
    if (
      !fakt?.quelle?.label ||
      !aufDomain(fakt.quelle.url, w.domain) ||
      !gueltigesDatum(datum) ||
      datum > heuteIso
    )
      throw new Error(`Wettbewerber ${w.slug}: Angabe ${feld} ohne quelle oder abgerufenAm – im Datenmodul ergänzen.`);
    for (const text of texteVon(fakt)) {
      try {
        pruefeText(text);
      } catch (e) {
        throw new Error(`Wettbewerber ${w.slug}, ${feld}: ${(e as Error).message}`);
      }
      const ankuendigung = ANKUENDIGUNG_MUSTER.map((re) => re.exec(text)?.[0]).find(Boolean);
      if (ankuendigung)
        throw new Error(`Wettbewerber ${w.slug}, ${feld}: enthält ‚${ankuendigung}‘ – keine Ankündigungen in Vergleichsdaten (U9).`);
    }
  }

  if (!Number.isInteger(w.testphaseTage.wert) || w.testphaseTage.wert <= 0)
    throw new Error(`Wettbewerber ${w.slug}: testphaseTage ist keine positive ganze Zahl.`);

  w.preise.wert.forEach((p, i) => pruefePreis(w.slug, `preise.${i}`, p));
  for (const [k, f] of Object.entries(w.zusatzPreise ?? {})) pruefePreis(w.slug, `zusatzPreise.${k}`, f.wert);
  const doppeltesPaket = ersteDoppelung(w.preise.wert.map((p) => p.paket));
  if (doppeltesPaket) throw new Error(`Wettbewerber ${w.slug}: Paket ‚${doppeltesPaket}‘ doppelt in preise.`);

  if (w.staerken.length < 2)
    throw new Error(`Wettbewerber ${w.slug}: staerken hat ${w.staerken.length} Einträge – mindestens 2 belegte Stärken erforderlich (U6).`);
  const doppelteStaerke = ersteDoppelung(w.staerken.map((s) => s.wert));
  if (doppelteStaerke) throw new Error(`Wettbewerber ${w.slug}: Stärke ‚${doppelteStaerke}‘ doppelt.`);
  if (!CRAFTOS_OHNE.some((k) => Boolean(w.kriterien[k]?.wert)))
    throw new Error(
      `Wettbewerber ${w.slug}: kein belegtes Kriterium, das CraftOS nicht anbietet (${CRAFTOS_OHNE.join(", ")}) – Fairnesszeile ergänzen (U6).`,
    );

  if (w.slug === "hero" && heroVariante(w) === "B") {
    const preise = [...w.preise.wert, ...Object.values(w.zusatzPreise ?? {}).map((f) => f.wert)];
    if (preise.some(hatPreiszahl)) throw new Error(`Wettbewerber hero: ${HERO_VARIANTE_B_HINWEIS}`);
  }
}

/** Ältestes Abrufdatum; älter als MAX_ALTER_TAGE → console.warn und Rückgabe der Meldung (D-04, kein Abbruch). */
export function alterWarnung(w: Wettbewerber, heute: Date = new Date()): string | undefined {
  const daten = faktenVon(w)
    .map(({ fakt }) => fakt.abgerufenAm)
    .filter(gueltigesDatum)
    .sort();
  const aeltestes = daten[0];
  if (!aeltestes) return undefined;
  const [y, m, d] = aeltestes.split("-").map(Number);
  const alter = Math.round(
    (Date.UTC(heute.getFullYear(), heute.getMonth(), heute.getDate()) - Date.UTC(y, m - 1, d)) / 86_400_000,
  );
  if (alter <= MAX_ALTER_TAGE) return undefined;
  const meldung = `Wettbewerber ${w.slug}: Stand ${aeltestes} ist älter als ${MAX_ALTER_TAGE} Tage – Angaben neu prüfen und abgerufenAm aktualisieren.`;
  console.warn(meldung);
  return meldung;
}

/** Stand eines Wettbewerbers = jüngstes abgerufenAm aller Fakten. */
export function standVon(w: Wettbewerber): string {
  return faktenVon(w)
    .map(({ fakt }) => fakt.abgerufenAm)
    .reduce((a, b) => (b > a ? b : a));
}

/**
 * Eindeutige Quellen der genutzten Fakten für die Quellenliste (G3), in Reihenfolge des ersten Vorkommens.
 * `felder` = Feldpfade oder deren Anfang („preise“, „kriterien“, „kriterien.datev“); ohne Angabe alle Fakten.
 * `abgerufenAm` = jüngstes Abrufdatum der Fakten mit dieser Quelle.
 */
export function quellenFuer(w: Wettbewerber, felder?: readonly string[]): QuellenEintrag[] {
  const passt = (feld: string) => !felder || felder.some((f) => feld === f || feld.startsWith(`${f}.`));
  const eintraege = new Map<string, QuellenEintrag>();
  for (const { feld, fakt } of faktenVon(w)) {
    if (!passt(feld)) continue;
    const vorhanden = eintraege.get(fakt.quelle.url);
    if (!vorhanden)
      eintraege.set(fakt.quelle.url, { anbieter: w.name, label: fakt.quelle.label, url: fakt.quelle.url, abgerufenAm: fakt.abgerufenAm });
    else if (fakt.abgerufenAm > vorhanden.abgerufenAm) vorhanden.abgerufenAm = fakt.abgerufenAm;
  }
  return [...eintraege.values()];
}

/** HERO-Variante (D-16, U11): „A“ nur mit beiden Screenshot-Pfaden und gültigem Datum, sonst „B“. */
export function heroVariante(w: Wettbewerber): "A" | "B" {
  const b = w.preiseBelegt;
  return b && b.screenshotMonatlich && b.screenshotJaehrlich && gueltigesDatum(b.datum) ? "A" : "B";
}

/** HERO-Preise nur in Variante A; in Variante B leere Liste (Seiten rendern dann HERO_VARIANTE_B_HINWEIS-gemäß ohne Zahlen). */
export function heroPreise(w: Wettbewerber): Preis[] {
  return heroVariante(w) === "A" ? w.preise.wert : [];
}
