/**
 * Inhalte der Seite `/gobd` (08-UI-SPEC § 5.4; D-09, D-12). Funktionspunkte aus dem Bestand gekürzt (Titel und
 * Ziele unverändert), Stand aus site.checkedAt. D-43 (Inhaber 23.10.2026): Die Seite sagt positiv „CraftOS ist
 * GoBD-konform“ (Wortlaut und Belege aus lib/gobd-konform.ts); die Zertifizierungsfrage beantwortet sie mit der
 * amtlichen Einordnung und den Belegen, ohne Zertifikats- oder Testatbehauptung (T-08-32). Die FAQPage der Seite
 * entsteht aus demselben Array wie die sichtbare FAQ (T-08-33). Prüfung: tests/kernseiten.test.ts.
 */
import { FileCheck2, FileOutput, Files, History, LockKeyhole, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FitPanel } from "@/components/v2/FitPanels";
import type { Step } from "@/components/v2/StepFlow";
import { germanDate } from "@/lib/format";
import { gobdKonform } from "@/lib/gobd-konform";
import { pruefeNurUnterstuetzt } from "@/lib/nur-unterstuetzt";
import { site } from "@/lib/site";

export const GOBD_PFAD = "/gobd" as const;

export const GOBD_SECTION_IDS = ["kopf", "funktionen", "ablauf", "zertifizierung", "faq", "cta"] as const;
export type GobdSectionId = (typeof GOBD_SECTION_IDS)[number];

export const GOBD_SURFACES: Readonly<Record<GobdSectionId, "dark" | "white" | "warm">> = {
  kopf: "dark",
  funktionen: "white",
  ablauf: "warm",
  zertifizierung: "white",
  faq: "warm",
  cta: "dark",
};

/** Kopf G1 ohne Visual; H1, Title und Description aus der Keyword-Map. */
export const gobdKopf = {
  eyebrow: "GoBD",
  kopfwort: "GoBD-konforme",
  lead: `${gobdKonform.aussage}: Festschreibung mit Löschsperre, gesperrte Eingangsbelege und ein Änderungsprotokoll.`,
  secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/rechnung-fertigstellen" },
} as const;

export const gobdSections: Record<Exclude<GobdSectionId, "kopf" | "cta">, { title: string; lead: string }> = {
  funktionen: {
    title: "Wie ist CraftOS GoBD-konform?",
    lead: "Mit festgeschriebenen Ausgangsrechnungen, gesperrten Eingangsrechnungen, Dokumentversionen, nachvollziehbaren Stornos und einem unveränderlichen Protokoll jeder Änderung an festgeschriebenen Belegen.",
  },
  ablauf: {
    title: "Ein typischer Ablauf bis zur Übergabe",
    lead: "Vom gepflegten Stammsatz bis zur abgestimmten Übergabe an die Steuerberatung in fünf Schritten.",
  },
  zertifizierung: {
    title: "Ist CraftOS GoBD-zertifiziert?",
    lead: gobdKonform.zertifizierung,
  },
  faq: {
    title: "Häufige Fragen zur GoBD",
    lead: "Kurze Antworten zu Verfahrensdokumentation, Festschreibung und DATEV-Export.",
  },
};

/**
 * Sechs Bestandspunkte: Titel und Ziele unverändert, Text auf einen Satz gekürzt. Größen md, sm, sm, md, md, wide:
 * „E-Rechnungsbezug“ steht nicht in einer schmalen sm-Kachel (Sichtprüfung 08-12), Reihenfolge bleibt in allen Breiten.
 */
export const gobdKacheln: { title: string; text: string; href: string; icon: LucideIcon; size: "sm" | "md" | "wide" }[] = [
  {
    title: "Rechnungen verbindlich festschreiben",
    text: "Fertige Ausgangsrechnungen tragen die endgültige Nummer und sind gegen Löschen gesperrt.",
    href: "/hilfe/rechnung-fertigstellen",
    icon: LockKeyhole,
    size: "md",
  },
  {
    title: "Den Dokumentstand nachvollziehen",
    text: "Zum finalisierten Dokument wird ein Versionsstand mit verantwortlicher Person gespeichert.",
    href: "/funktionen/rechnungen",
    icon: History,
    size: "sm",
  },
  {
    title: "Korrekturen mit Bezug zum Original",
    text: "Eine Stornorechnung erhält eine eigene Nummer und verweist auf die ursprüngliche Rechnung.",
    href: "/hilfe/rechnung-stornieren",
    icon: Files,
    size: "sm",
  },
  {
    title: "Eingangsbelege prüfen und sperren",
    text: "Nach bestätigter Prüfung sperrt CraftOS die Belegangaben und protokolliert Änderungen.",
    href: "/hilfe/beleg-scannen-pruefen",
    icon: FileCheck2,
    size: "md",
  },
  {
    title: "Zugriffe und E-Rechnungsbezug schützen",
    text: "Berechtigungen schützen Finanzdaten, das E-Rechnungs-XML bleibt unverändert archiviert.",
    href: "/funktionen/e-rechnung",
    icon: ShieldCheck,
    size: "md",
  },
  {
    title: "Die Übergabe vorbereiten",
    text: "Der DATEV-Export liefert den Buchungsstapel im EXTF-Format und die Belege als ZIP für Ihre Kanzlei.",
    href: "/hilfe/datev-export-erstellen",
    icon: FileOutput,
    size: "wide",
  },
];

export const gobdSteps: Step[] = [
  { title: "Stammdaten pflegen", text: "Firmen- und Kundenangaben vollständig pflegen." },
  { title: "Belege prüfen", text: "Belege erfassen, Inhalte prüfen und korrekt zuordnen." },
  { title: "Rechnung festschreiben", text: "Rechnungen nach Prüfung fertigstellen und festschreiben." },
  { title: "Korrektur per Storno", text: "Korrekturen über nachvollziehbare Stornovorgänge bearbeiten." },
  { title: "Übergabe abstimmen", text: "Zahlungen nachführen, Unterlagen aufbewahren und Übergabe abstimmen." },
];

/** FitPanels ohne Quellenpflicht (D-43): wie CraftOS GoBD-konform ist und wie der Betrieb damit arbeitet. */
export const gobdPanels: [FitPanel, FitPanel] = [
  {
    title: "So ist CraftOS GoBD-konform",
    points: [
      { text: "Ausgangsrechnungen werden festgeschrieben und sind gegen Löschen gesperrt." },
      { text: "Geprüfte Eingangsrechnungen sperrt CraftOS gegen weitere Änderungen." },
      { text: "Jede Änderung an festgeschriebenen Belegen landet in einem unveränderlichen Protokoll." },
    ],
  },
  {
    title: "So arbeiten Sie damit im Betrieb",
    points: [
      { text: "Sie erfassen Belege zeitnah und prüfen sie direkt in CraftOS." },
      { text: "Ihre Verfahrensdokumentation beschreibt, wer prüft und wer festschreibt." },
      { text: "Der DATEV-Export übergibt Buchungsstapel und Belege an Ihre Steuerberatung." },
    ],
  },
];

export const gobdFaq: { q: string; a: string }[] = [
  // Inhaber 22.10.2026 (08-REVIEW ME-01) und D-43 (23.10.2026): durchgehend positiv formuliert.
  {
    q: "Wie hilft CraftOS bei der Verfahrensdokumentation?",
    a: "Festschreibung, Dokumentversionen und Protokolle bilden Ihre Abläufe in CraftOS nachvollziehbar ab; in der Verfahrensdokumentation beschreiben Sie, wie Ihr Betrieb damit arbeitet.",
  },
  {
    q: "Wie korrigiere ich eine festgeschriebene Rechnung?",
    a: "Über einen Storno mit eigener Nummer und Bezug zum Original; die festgeschriebene Rechnung bleibt dabei geschützt.",
  },
  {
    q: "Was leistet der DATEV-Export für die GoBD?",
    a: "Er übergibt Ihre Buchungen als DATEV-Buchungsstapel im EXTF-Format und die Belege als ZIP an Ihre Steuerberatung; das E-Rechnungs-XML ist als Original enthalten.",
  },
];

/** Label-Zeile unter der FAQ: amtliche Grundlagen (Bestandslinks) und Funktionsstand aus site.checkedAt. */
export const gobdGrundlage = {
  quellen: [
    {
      label: "GoBD im amtlichen AO-Handbuch",
      href: "https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html",
    },
    {
      label: "BMF-Schreiben vom 14. Juli 2025",
      href: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html",
    },
  ],
  stand: `Funktionsstand ${germanDate(site.checkedAt)}.`,
} as const;

// Inhabervorgabe 22.10.2026 (08-REVIEW ME-06) und D-43 (23.10.2026): nur Unterstütztes, durchgehend positiv, auch die
// Antwort auf die Zertifizierungsfrage; keine Ausnahme. Prüfung beim Laden.
pruefeNurUnterstuetzt(
  {
    gobdKopf,
    gobdSections,
    gobdKacheln: gobdKacheln.map(({ title, text }) => ({ title, text })),
    gobdSteps,
    gobdPanels,
    gobdFaq,
    gobdGrundlage,
  },
  { kontext: "GoBD" },
);
