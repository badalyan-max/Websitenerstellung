/**
 * Prüfender Inhalts-Builder der Alternativen-Seiten (08-08; 08-UI-SPEC § 3.1–3.6, D-01–D-04, U1–U12, C8, C9, F1).
 *
 * `baueAlternative(slug)` setzt CraftOS-Werte aus lib/site.ts (`tarife`, `vertrag`, `site.trialDays`; Preise per
 * `euro`, Monatswerte per `monatAusJahr`) und Wettbewerberwerte aus lib/wettbewerber per Vorlage zusammen und prüft:
 * Zellen ≤ 24, Beschriftungen ≤ 48, ≤ 12 Zeilen, Quelle je Zeile und Quellenliste ⊇ Zellenquellen, Pflichthinweis
 * und Rechenweg-Note wörtlich, UWG-Wortliste über alle Texte, ≥ 2 belegte Stärken, ≥ 1 Zeile „Wettbewerber ✓ /
 * CraftOS –“, Antworten ≤ 300. Ein Verstoß ist ein Build-/Testfehler. Gemeinsame Texte stehen nur hier.
 * Tests: tests/vergleich-seiten.test.ts; Literalverbot: tests/pricing-parity.test.ts.
 */
import "server-only";
import type { Cell } from "@/components/v2/ComparisonTable";
import { TEXT_BUDGET, charCount } from "@/components/v2/budgets";
import { euro, germanDate } from "@/lib/format";
import { zielwerte } from "@/lib/seo-meta";
import { annualSavingPercent, site, tarife, vertrag } from "@/lib/site";
import {
  alterWarnung,
  craftnote,
  craftosRechenbeispiel,
  monatAusJahr,
  plancraft,
  pruefeText,
  pruefeWettbewerber,
  quellenFuer,
  standVon,
} from "@/lib/wettbewerber";
import type { Fakt, KriteriumId, Wettbewerber, WettbewerberSlug } from "@/lib/wettbewerber/types";
import type {
  AlternativeInhalt,
  AlternativeZeile,
  CraftosPunkt,
  CraftosWerte,
  Kontext,
  Seitenmodul,
} from "./types";
import { craftnoteSeite } from "./craftnote";
import { plancraftSeite } from "./plancraft";

const cents = (betrag: number) => Math.round(betrag * 100);
const euroCent = (c: number) => euro(c / 100);
const tarif = (id: "voll" | "app") => tarife.find((t) => t.id === id)!;

/** CraftOS-Werte für alle Alternativen-Seiten, nur aus lib/site.ts. */
function craftosWerte(): CraftosWerte {
  const voll = tarif("voll");
  const app = tarif("app");
  const beispiel = craftosRechenbeispiel({ voll: 1, app: 4 });
  return {
    vollMonat: euro(voll.monat),
    vollJahr: euro(voll.jahr),
    vollJahrJeMonat: euroCent(monatAusJahr([cents(voll.jahr)])),
    appMonat: euro(app.monat),
    appJahr: euro(app.jahr),
    appJahrJeMonat: euroCent(monatAusJahr([cents(app.jahr)])),
    beispielJahrJeMonat: euroCent(beispiel.jahrJeMonatCents),
    beispielMonat: euroCent(beispiel.monatCents),
    trialDays: site.trialDays,
    jahresrabattProzent: Math.round(annualSavingPercent),
    vertrag,
  };
}

/**
 * CraftOS-Zellen je Kriterium (Belege: lib/funktionen.ts e-rechnung, buchhaltung, gaeb, zeiterfassung, plantafel,
 * lager; lib/product-register.ts notLive für KI-Telefonie; Zeiterfassung ohne Bewegungsverläufe). `false` = neutrale
 * „Nein“-Zelle (U9). Nicht aufgeführte Kriterien haben keine belegte CraftOS-Angabe und dürfen nicht verwendet werden.
 */
const CRAFTOS_KRITERIEN: Partial<Record<KriteriumId, Cell>> = {
  mobileApp: true,
  plantafel: "In Voll-Lizenz",
  eRechnung: "XRechnung und ZUGFeRD",
  datev: true,
  gaeb: "Import X83, Export X84",
  zeiterfassung: true,
  lager: true,
  kiTelefon: false,
  fahrzeugortung: false,
};

/** Panel „Wann CraftOS passt“ (UI-SPEC § 3.6 „Gemeinsam“). */
const CRAFTOS_PUNKTE: Record<CraftosPunkt, string> = {
  proPerson: "Sie möchten pro Person abrechnen und Mitarbeitende mit einer App-Lizenz ausstatten.",
  plantafel: "Sie möchten die Plantafel ohne Modulgebühr in der Voll-Lizenz nutzen.",
  monatlich: "Sie möchten monatlich kündbar bleiben.",
  gaebDatev: "Sie brauchen GAEB, DATEV-Export und Nachkalkulation in derselben Lizenz.",
};

/** Gemeinsame Texte aller Alternativen-Seiten (UI-SPEC § 3.6 „Gemeinsam“). */
const GEMEINSAM = {
  vergleichLead: "Belegte Angaben aus den Preis- und Produktseiten beider Anbieter, mit Quelle und Abrufdatum je Zeile.",
  faqLead: "Kurze Antworten zu Preisen, Plantafel, Testphase und Wechsel, belegt mit Quelle und Stand.",
  cta: { title: "Testen Sie CraftOS mit Ihrem Auftrag", text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test." },
  pflichtFunktionsumfang: "Die Pakete unterscheiden sich im Funktionsumfang.",
  pflichtRundung: "Monatswerte rechnerisch aus dem Jahresbetrag, auf Cent gerundet.",
} as const;

function schritte(laufzeit: string) {
  return [
    { title: "Laufzeit prüfen", text: laufzeit },
    { title: "Parallel testen", text: `CraftOS ${site.trialDays} Tage ohne Zahlungsdaten mit einem laufenden Auftrag ausprobieren.` },
    { title: "Daten übernehmen", text: "Kunden, Projekte und Stammdaten aus Dateien prüfen und zuordnen." },
    { title: "Team einladen", text: "Mitarbeitende mit der App-Lizenz in die Mobile-App holen." },
  ];
}

function kontext(w: Wettbewerber): Kontext {
  const zeile = (label: string, craftos: Cell, wettbewerber: Cell, ...belege: Fakt<unknown>[]): AlternativeZeile => ({
    label,
    craftos,
    wettbewerber,
    quellen: belege.map((b) => b.quelle),
  });
  return {
    w,
    craftos: craftosWerte(),
    euro: euroCent,
    zeile,
    testphase: () => zeile("Testphase", `${site.trialDays} Tage`, `${w.testphaseTage.wert} Tage`, w.testphaseTage),
    laufzeit: () => zeile("Kürzeste Laufzeit", "1 Monat", w.laufzeit.wert, w.laufzeit),
    kriterium: (id, label, zelle) => {
      const fakt = w.kriterien[id];
      if (!fakt) throw new Error(`Alternative ${w.slug}: Kriterium ${id} ohne belegte Angabe – Zeile weglassen (U1).`);
      const craftos = CRAFTOS_KRITERIEN[id];
      if (craftos === undefined) throw new Error(`Alternative ${w.slug}: keine belegte CraftOS-Angabe für ${id}.`);
      const wert = zelle ?? (typeof fakt.wert === "string" ? fakt.wert : fakt.wert === true);
      return zeile(label, craftos, wert, fakt);
    },
  };
}

function fehler(w: Wettbewerber, text: string): Error {
  return new Error(`Alternative ${w.slug}: ${text}`);
}

/** Antworten (Kopf, Frage-H2, FAQ) ≤ 300 Zeichen (D-09, C3). */
function pruefeAntwort(w: Wettbewerber, feld: string, text: string) {
  const n = charCount(text);
  if (n > TEXT_BUDGET.answer) throw fehler(w, `${feld} hat ${n} von ${TEXT_BUDGET.answer} Zeichen – Antwort kürzen.`);
}

/** Alle Texte eines Inhalts außer dem Wettbewerber-Datenmodul (UWG-Prüfung über die Seite). */
function texteVon(inhalt: AlternativeInhalt): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  for (const [schluessel, wert] of Object.entries(inhalt)) if (schluessel !== "wettbewerber") walk(wert);
  return out;
}

/**
 * Baut und prüft eine Alternativen-Seite aus Datenmodul und Seitenmodul. Wirft beim ersten Verstoß mit Abhilfe.
 * Öffentlich für Tests mit Fixture-Wettbewerbern; Seiten nutzen `baueAlternative(slug)`.
 */
export function alternativeAusModul(w: Wettbewerber, seite: Seitenmodul, path: string): AlternativeInhalt {
  const k = kontext(w);
  const t = seite(k);
  const z = zielwerte(path);
  const stand = germanDate(standVon(w));
  const name = w.name;

  // Stärken (U6): mindestens zwei belegte Punkte im Panel „Wann {Name} passt“.
  if (w.staerken.length < 2)
    throw fehler(w, `${w.staerken.length} Stärke(n) – mindestens 2 belegte Stärken erforderlich (U6).`);

  // Tabelle (G3, § 3.3).
  if (t.rows.length > TEXT_BUDGET.count.comparison.rows)
    throw fehler(w, `${t.rows.length} Tabellenzeilen – höchstens ${TEXT_BUDGET.count.comparison.rows}.`);
  const bekannteQuellen = quellenFuer(w);
  for (const r of t.rows) {
    if (charCount(r.label) > TEXT_BUDGET.comparison.rowLabel)
      throw fehler(w, `Zeilenbeschriftung „${r.label}“ über ${TEXT_BUDGET.comparison.rowLabel} Zeichen.`);
    for (const zelle of [r.craftos, r.wettbewerber])
      if (typeof zelle === "string" && charCount(zelle) > TEXT_BUDGET.comparison.cell)
        throw fehler(w, `Zelle „${zelle}“ (${r.label}) über ${TEXT_BUDGET.comparison.cell} Zeichen – Zusatz in die Beschriftung.`);
    if (r.quellen.length === 0) throw fehler(w, `Zeile „${r.label}“ ohne Quelle – Beleg aus dem Datenmodul angeben (U1).`);
    for (const q of r.quellen)
      if (!bekannteQuellen.some((b) => b.url === q.url))
        throw fehler(w, `Zeile „${r.label}“: Quelle ${q.url} steht nicht im Datenmodul (U1).`);
  }
  if (!t.rows.some((r) => r.craftos === false && r.wettbewerber !== false))
    throw fehler(w, `keine Zeile, in der ${name} etwas bietet, das CraftOS nicht anbietet – Fairnesszeile ergänzen (U6).`);
  const zellQuellen = new Set(t.rows.flatMap((r) => r.quellen.map((q) => q.url)));
  for (const f of t.kosten.facts) zellQuellen.add(f.fakt.quelle.url);
  const sources = bekannteQuellen.filter((q) => zellQuellen.has(q.url));

  const tabellenNote =
    `Angaben ohne Gewähr, Stand ${stand}, Quellen unter der Tabelle. ` +
    `Alle Beträge netto zzgl. USt.; CraftOS-Preise laut Preisliste, Stand ${germanDate(site.checkedAt)}. ` +
    `CraftOS-${GEMEINSAM.pflichtRundung}`;

  const kostenNote = [
    "Annahme: 1 Person im Büro, 4 auf der Baustelle. CraftOS: 1 Voll-Lizenz + 4 App-Lizenzen.",
    `${name}: ${t.kosten.zusammenstellung}.`,
    `Nicht enthalten: ${t.kosten.nichtEnthalten}.`,
    GEMEINSAM.pflichtFunktionsumfang,
    ...(t.kosten.zusatz ? [t.kosten.zusatz] : []),
    GEMEINSAM.pflichtRundung,
    `Netto, Stand ${stand}.`,
  ].join(" ");

  const inhalt: AlternativeInhalt = {
    path,
    wettbewerber: w,
    meta: { name: z.titleOhneMarke, description: z.description },
    kopf: {
      h1: z.h1,
      keyword: t.keyword,
      answer: t.answer,
      stand: `Anbieterangaben Stand ${stand}, Quellen unter der Tabelle`,
    },
    tabelle: {
      title: `${name} und CraftOS im Überblick`,
      lead: GEMEINSAM.vergleichLead,
      caption: `${name} und CraftOS im Vergleich`,
      rows: t.rows,
      note: tabellenNote,
      sources,
      disclaimer: `Die Nennung von ${name} dient der Zuordnung; es besteht keine Geschäftsbeziehung.`,
    },
    kosten: {
      title: `Was kostet ${name} im Vergleich zu CraftOS?`,
      answer: t.kosten.answer,
      facts: [
        { value: k.craftos.beispielJahrJeMonat, label: "CraftOS, 5 Personen, Jahresabo je Monat", source: "site:tarife-5p-jahr" },
        { value: k.craftos.beispielMonat, label: "CraftOS, 5 Personen, Monatsabo", source: "site:tarife-5p-monat" },
        ...t.kosten.facts.map((f) => ({ value: f.value, label: f.label, source: `wettbewerber:${w.slug}-${f.key}` })),
      ],
      note: kostenNote,
    },
    fuerWen: {
      title: `Für wen passt ${name}, für wen CraftOS?`,
      answer: t.fuerWen.answer,
      panels: [
        {
          title: `Wann ${name} passt`,
          points: w.staerken.slice(0, TEXT_BUDGET.count.fitPoints.max).map((s) => ({
            text: s.wert,
            quelle: { label: `${name}: ${s.quelle.label}`, url: s.quelle.url },
          })),
        },
        { title: "Wann CraftOS passt", points: t.fuerWen.craftos.map((p) => ({ text: CRAFTOS_PUNKTE[p] })) },
      ],
    },
    umstieg: {
      title: `Wie wechseln Sie von ${name} zu CraftOS?`,
      answer: `Prüfen Sie die Kündigungsfrist Ihres ${t.vertragsname}, testen Sie CraftOS ${site.trialDays} Tage mit einem laufenden Auftrag und übernehmen Sie Kunden, Projekte und Stammdaten per Datei.`,
      steps: schritte(t.umstieg.laufzeit),
    },
    faq: { title: `Häufige Fragen zur ${name}-Alternative`, lead: GEMEINSAM.faqLead, items: t.faq },
    cta: { ...GEMEINSAM.cta },
  };

  // Antwort zuerst (D-09): Kopf, Frage-H2 und FAQ ≤ 300.
  pruefeAntwort(w, "Kopfantwort", inhalt.kopf.answer);
  pruefeAntwort(w, "Kosten-Antwort", inhalt.kosten.answer);
  pruefeAntwort(w, "Für-wen-Antwort", inhalt.fuerWen.answer);
  pruefeAntwort(w, "Umstieg-Antwort", inhalt.umstieg.answer);
  for (const item of inhalt.faq.items) pruefeAntwort(w, `FAQ „${item.q}“`, item.a);
  if (!inhalt.kopf.h1.includes(inhalt.kopf.keyword))
    throw fehler(w, `Kopfwort „${inhalt.kopf.keyword}“ steht nicht in der H1 „${inhalt.kopf.h1}“.`);

  // UWG-Wortliste über alle Seitentexte (U7).
  for (const text of texteVon(inhalt)) {
    try {
      pruefeText(text);
    } catch (e) {
      throw fehler(w, (e as Error).message);
    }
  }

  // Datenmodul vollständig geprüft (U1, U3, U6–U9, U11); Alterswarnung ohne Abbruch (D-04).
  pruefeWettbewerber(w);
  alterWarnung(w);
  return inhalt;
}

/** Registrierte Alternativen-Seiten: Datenmodul, Seitenmodul und Pfad (Keyword-Map). */
const SEITEN: Partial<Record<WettbewerberSlug, { w: Wettbewerber; modul: Seitenmodul; path: string }>> = {
  plancraft: { w: plancraft, modul: plancraftSeite, path: "/vergleich/plancraft-alternative" },
  craftnote: { w: craftnote, modul: craftnoteSeite, path: "/vergleich/craftnote-alternative" },
};

/** Alternativen-Seite eines Wettbewerbers, geprüft (Vorlage UI-SPEC § 3.1). */
export function baueAlternative(slug: WettbewerberSlug): AlternativeInhalt {
  const eintrag = SEITEN[slug];
  if (!eintrag) throw new Error(`Alternative ${slug}: kein Seitenmodul registriert – lib/seiten/alternativen ergänzen.`);
  return alternativeAusModul(eintrag.w, eintrag.modul, eintrag.path);
}
