/**
 * Inhaltstypen der Funktionsdetailseiten (07-UI-SPEC „Vorlage Detailseite“; D-02, D-03, D-04).
 * Inhalte sind Daten statt JSX-Texte; der Builder in lib/funktionsdetails/index.ts prüft alle Budgets,
 * Mengen, Rollen, Plattformen, Nachbarschaften, Anordnungen und Wortregeln beim Bauen.
 * Typ-Importe aus server-only-Modulen werden beim Übersetzen entfernt; diese Datei bleibt clientneutral.
 */
import type { LucideIcon } from "lucide-react";
import type { SnippetVariant } from "@/components/feature-snippet/FeatureSnippet";
import type { Step } from "@/components/v2/StepFlow";
import type { ProductPlatform } from "@/lib/funktionen";
import type { GruppenId } from "@/lib/funktionsgruppen";
import type { FrameScene, KopfVisual } from "@/lib/scenes";

/**
 * Rollen-Presets des Web-Releases (`src/lib/subscription/roles.ts` `ROLES`) plus „Kunde“ für das Kundenportal.
 * „Büro“ ist eine Lizenzstufe, keine Rolle (07-UI-SPEC Abschnitt 3, Abweichung B2).
 */
export type RolleName =
  | "Admin"
  | "Büro-Leitung"
  | "Büro-Projektleitung"
  | "Mobil-Teamleitung"
  | "Mobil-Teammitglied"
  | "Kunde";

export const ROLLEN: readonly RolleName[] = [
  "Admin",
  "Büro-Leitung",
  "Büro-Projektleitung",
  "Mobil-Teamleitung",
  "Mobil-Teammitglied",
  "Kunde",
];

/** Budgets der Plattform-Panels (07-UI-SPEC Abschnitt 3); geprüft mit assertTextBudget/assertCount. */
export const PANEL_BUDGET = {
  zusatz: 40,
  satz: 90,
  rollen: { min: 0, max: 4 },
  lizenzen: { min: 1, max: 2 },
} as const;

export interface PlattformPanel {
  /** Nur Werte aus funktionen[].platforms, Reihenfolge web, mobile. */
  platform: ProductPlatform;
  /** 0–4 Rollen; zusatz ≤ 40 Zeichen. Leer → das Panel zeigt nur den Satz. */
  rollen: { name: RolleName; zusatz?: string }[];
  /** Genau ein Satz ≤ 90 Zeichen: was auf dieser Plattform passiert. */
  satz: string;
  /** Mindestens eine Lizenz (LicenseBadge). */
  lizenzen: ("voll" | "app")[];
}

export interface Abschnittskopf {
  /** H2 ≤ 60 Zeichen, nennt Funktion oder Wortstamm des Keywords. */
  title: string;
  /** Genau ein Satz ≤ 140 Zeichen. */
  lead: string;
}

export type KernpunktVisual =
  | { kind: "icon"; icon: LucideIcon }
  | { kind: "phone"; scene: FrameScene; width: 160 | 194 };

export interface Kernpunkt {
  size: "sm" | "md" | "lg" | "wide";
  /** ≤ 40 Zeichen. */
  title: string;
  /** Genau ein Satz: sm/md ≤ 90, lg/wide ≤ 120 Zeichen. */
  text: string;
  /** Icon (Standard) oder eine zweite Szene; lg nur mit Phone-Szene, nie die Kopf-Szene. */
  visual: KernpunktVisual;
  href?: string;
  /** id der Zusatzfunktion (lib/funktionsgruppen.ts ZUSATZ_IDS) → data-zusatz; nie Größe sm. */
  zusatz?: string;
  /** Grenze-Kachel (Pflicht, genau eine je Seite): Icon Info, weiße Fläche. */
  grenze?: true;
}

export type SekundaerLabel = "Anleitung in der Hilfe" | "Alle Funktionen ansehen";

/** Inhaltsmodul einer Detailseite (lib/funktionsdetails/{gruppe}.ts). */
export interface FunktionsdetailInhalt {
  slug: string;
  /** Kopfwort-Token, steht wörtlich in der H1 aus keyword-map.json (nowrap-Span). */
  kopfwort: string;
  /** Kurznutzen im Kopf: genau ein Satz ≤ 110 Zeichen. */
  lead: string;
  secondary: { label: SekundaerLabel; href: string };
  ablauf: Abschnittskopf & { steps: Step[] };
  rollen: Abschnittskopf & { panels: PlattformPanel[] };
  kernpunkte: Abschnittskopf & { tiles: Kernpunkt[] };
  faq: Abschnittskopf & { items: { q: string; a: string }[] };
  /** 2–3 Slugs aus derselben oder einer benachbarten Gruppe. */
  verwandt: string[];
}

/** FeatureSnippet-Varianten der 8 Detailseiten aus D-19. */
export type SnippetVariante = Extract<
  SnippetVariant,
  "dashboard" | "angebot" | "planung" | "rechnung" | "beleg" | "zeit" | "lager" | "aufmass"
>;

export interface VerwandtEintrag {
  slug: string;
  name: string;
  icon: LucideIcon;
  benefit: string;
  platforms: ProductPlatform[];
  href: string;
  /** Karten-Szene der Zielseite (cardScenes, bei Paar die Browser-Szene). */
  scene: FrameScene;
}

/** Ergebnis des Builders: alles, was die Vorlage FunktionsDetail rendert. */
export interface Funktionsdetail {
  slug: string;
  name: string;
  gruppe: { id: GruppenId; label: string };
  kopf: {
    eyebrow: string;
    h1: string;
    kopfwort: string;
    lead: string;
    secondary: { label: SekundaerLabel; href: string };
    visual: KopfVisual;
  };
  ablauf: Abschnittskopf & { steps: Step[] };
  snippet?: SnippetVariante;
  rollen: Abschnittskopf & { panels: PlattformPanel[] };
  kernpunkte: Abschnittskopf & { tiles: Kernpunkt[] };
  faq: Abschnittskopf & { items: { q: string; a: string }[] };
  verwandt: VerwandtEintrag[];
  meta: { path: string; title: string; titleOhneMarke: string; description: string };
}

/** Zielwerte einer Seite aus keyword-map.json (title inklusive „ | CraftOS“). */
export interface Zielwerte {
  title: string;
  titleOhneMarke: string;
  h1: string;
  description: string;
  keyword: string | null;
}
