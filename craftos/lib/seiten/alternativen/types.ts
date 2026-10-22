/**
 * Inhalts-Typen der Alternativen-Seiten (08-08; 08-UI-SPEC § 3.1–3.6, D-01–D-04, C8, C9).
 * Clientneutral (kein server-only): Die Vorlage components/vergleich/AlternativePage.tsx rendert nur
 * `AlternativeInhalt`; gebaut und geprüft wird er in lib/seiten/alternativen/index.ts (`baueAlternative`).
 * Seitenmodule (plancraft.ts, craftnote.ts …) liefern nur Seitentexte und die Auswahl der Fakten;
 * Zahlen kommen ausschließlich per Vorlage aus `Kontext` (CraftOS aus lib/site.ts, Wettbewerber aus lib/wettbewerber).
 */
import type { Cell, ComparisonSource } from "@/components/v2/ComparisonTable";
import type { FitPanel } from "@/components/v2/FitPanels";
import type { KeyFact } from "@/components/v2/KeyFacts";
import type { Step } from "@/components/v2/StepFlow";
import type { Fakt, KriteriumId, Quelle, Wettbewerber } from "@/lib/wettbewerber/types";

/** Tabellenzeile: CraftOS-Zelle, Wettbewerberzelle und die Quellen der Wettbewerberangabe (U1, G3). */
export interface AlternativeZeile {
  label: string;
  craftos: Cell;
  wettbewerber: Cell;
  quellen: Quelle[];
}

/** Gerenderter Inhalt einer Alternativen-Seite (Vorlagen-Vertrag UI-SPEC § 3.1). */
export interface AlternativeInhalt {
  path: string;
  wettbewerber: Wettbewerber;
  /** Für WebPage-JSON-LD: Title ohne Marke und Description aus der Keyword-Map. */
  meta: { name: string; description: string };
  kopf: { h1: string; keyword: string; answer: string; stand: string };
  tabelle: {
    title: string;
    lead: string;
    caption: string;
    rows: AlternativeZeile[];
    note: string;
    sources: ComparisonSource[];
    disclaimer: string;
  };
  kosten: { title: string; answer: string; facts: KeyFact[]; note: string };
  fuerWen: { title: string; answer: string; panels: [FitPanel, FitPanel] };
  umstieg: { title: string; answer: string; steps: Step[] };
  faq: { title: string; lead: string; items: { q: string; a: string }[] };
  cta: { title: string; text: string };
}

/** Gemeinsame Punkte des Panels „Wann CraftOS passt“ (UI-SPEC § 3.6 „Gemeinsam“; je Seite 3 passende). */
export type CraftosPunkt = "proPerson" | "plantafel" | "monatlich" | "gaebDatev";

/** Wettbewerberwert für die Kosten-KeyFacts (C9): Wert per Vorlage, Beleg = Fakt aus dem Datenmodul. */
export interface WettbewerberKennzahl {
  /** Schlüssel der Kurzform-Quelle `wettbewerber:{slug}-{key}`. */
  key: string;
  value: string;
  label: string;
  fakt: Fakt<unknown>;
}

/** Formatierte CraftOS-Werte aus lib/site.ts (`tarife`, `vertrag`, `site.trialDays`), nie Literale. */
export interface CraftosWerte {
  vollMonat: string;
  vollJahr: string;
  vollJahrJeMonat: string;
  appMonat: string;
  appJahr: string;
  appJahrJeMonat: string;
  /** 1 Voll- + 4 App-Lizenzen, Jahresabo je Monat (F1, monatAusJahr). */
  beispielJahrJeMonat: string;
  /** 1 Voll- + 4 App-Lizenzen, Monatsabo. */
  beispielMonat: string;
  trialDays: number;
  /** Ersparnis Jahresabo gegenüber zwölf Monatszahlungen, gerundet in Prozent. */
  jahresrabattProzent: number;
  vertrag: { monat: string; jahr: string };
}

/** Werkzeuge und Werte für die Seitenmodule (Zahlen nur per Vorlage, U12). */
export interface Kontext {
  w: Wettbewerber;
  craftos: CraftosWerte;
  /** Centbetrag → „74,90 €“. */
  euro: (cents: number) => string;
  /** Freie Zeile mit Belegen aus dem Datenmodul. */
  zeile: (label: string, craftos: Cell, wettbewerber: Cell, ...belege: Fakt<unknown>[]) => AlternativeZeile;
  /** Zeile „Testphase“: CraftOS `${site.trialDays} Tage`, Wettbewerber aus `testphaseTage`. */
  testphase: () => AlternativeZeile;
  /** Zeile „Kürzeste Laufzeit“: CraftOS „1 Monat“, Wettbewerber aus `laufzeit`. */
  laufzeit: () => AlternativeZeile;
  /** Kriteriumszeile: CraftOS-Zelle aus der gemeinsamen Liste, Wettbewerber aus `kriterien[id]` (oder `zelle`). */
  kriterium: (id: KriteriumId, label: string, zelle?: Cell) => AlternativeZeile;
}

/** Was ein Seitenmodul liefert; alles Übrige (Pflichthinweise, Panels, Schritte 2–4, CTA) setzt der Builder. */
export interface SeitenTexte {
  /** Kopfwort-Span der H1 (UI-SPEC Typography), steht wörtlich in `zielwerte(path).h1`. */
  keyword: string;
  answer: string;
  /** Genitiv für die Umstieg-Antwort, z. B. „plancraft-Abos“ oder „Craftnote-Vertrags“. */
  vertragsname: string;
  rows: AlternativeZeile[];
  kosten: {
    answer: string;
    /** Wettbewerberwerte des Rechenbeispiels (CraftOS-Werte setzt der Builder davor). */
    facts: WettbewerberKennzahl[];
    zusammenstellung: string;
    nichtEnthalten: string;
    /** Optionaler Zusatz nach „Die Pakete unterscheiden sich im Funktionsumfang.“ (z. B. P4). */
    zusatz?: string;
  };
  fuerWen: { answer: string; craftos: CraftosPunkt[] };
  /** Text von Schritt 1 „Laufzeit prüfen“ (≤ 80). */
  umstieg: { laufzeit: string };
  faq: { q: string; a: string }[];
}

export type Seitenmodul = (k: Kontext) => SeitenTexte;
