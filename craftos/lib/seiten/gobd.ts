/**
 * Inhalte der Seite `/gobd` (08-UI-SPEC § 5.4; D-09, D-12). Funktionspunkte aus dem Bestand gekürzt (Titel und
 * Ziele unverändert), Stand aus site.checkedAt. Wortregeln (T-08-32): keine behördliche GoBD-Zertifizierung;
 * CraftOS unterstützt das Verfahren, die Verfahrensdokumentation bleibt beim Betrieb. Die FAQPage der Seite
 * entsteht aus demselben Array wie die sichtbare FAQ (T-08-33). Prüfung: tests/kernseiten.test.ts.
 */
import { FileCheck2, FileOutput, Files, History, LockKeyhole, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FitPanel } from "@/components/v2/FitPanels";
import type { Step } from "@/components/v2/StepFlow";
import { germanDate } from "@/lib/format";
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
  lead: "Festschreibung, geschützte Rechnungen, Versionen und Protokolle für nachvollziehbare Abläufe im Betrieb.",
  secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/rechnung-fertigstellen" },
} as const;

export const gobdSections: Record<Exclude<GobdSectionId, "kopf" | "cta">, { title: string; lead: string }> = {
  funktionen: {
    title: "Wie unterstützt CraftOS GoBD-konforme Abläufe?",
    lead: "Mit festgeschriebenen Rechnungen, geschützten Inhalten, Dokumentversionen, nachvollziehbaren Stornos sowie Prüfung, Sperre und Protokoll von Eingangsbelegen.",
  },
  ablauf: {
    title: "Ein typischer Ablauf bis zur Übergabe",
    lead: "Vom gepflegten Stammsatz bis zur abgestimmten Übergabe an die Steuerberatung in fünf Schritten.",
  },
  zertifizierung: {
    title: "Ist CraftOS GoBD-zertifiziert?",
    lead: "Nein. CraftOS behauptet keine behördliche GoBD-Zertifizierung: GoBD-Konformität betrifft das gesamte Verfahren in Ihrem Betrieb, und die Funktionen von CraftOS unterstützen dieses Verfahren.",
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
    text: "Beim Fertigstellen vergibt CraftOS die endgültige Nummer und sperrt den Rechnungsinhalt.",
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
    text: "Berechtigungen begrenzen den Zugriff auf Finanzdaten und die Festschreibung.",
    href: "/funktionen/e-rechnung",
    icon: ShieldCheck,
    size: "md",
  },
  {
    title: "Die Übergabe vorbereiten",
    text: "Der DATEV-Export unterstützt die Übergabe; den Umfang stimmen Sie mit Ihrer Kanzlei ab.",
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

/** Zuständigkeiten (FitPanels ohne Quellenpflicht): was CraftOS unterstützt, was der Betrieb organisiert. */
export const gobdPanels: [FitPanel, FitPanel] = [
  {
    title: "Was CraftOS unterstützt",
    points: [
      { text: "Rechnungen werden nach der Prüfung festgeschrieben und bleiben geschützt." },
      { text: "Dokumentversionen und Protokolle machen Änderungen nachvollziehbar." },
      { text: "Der DATEV-Export bereitet die Übergabe an die Steuerberatung vor." },
    ],
  },
  {
    title: "Was Ihr Betrieb organisiert",
    points: [
      { text: "Sie führen eine Verfahrensdokumentation mit klaren Zuständigkeiten." },
      { text: "Sie erfassen alle Belege vollständig und zeitnah." },
      { text: "Sie bewahren Originaldaten auf und klären den Datenzugriff mit Ihrer Steuerberatung." },
    ],
  },
];

export const gobdFaq: { q: string; a: string }[] = [
  // Inhaber 22.10.2026 (08-REVIEW ME-01): positiv formuliert; verneint bleibt nur die Zertifizierungsfrage.
  {
    q: "Wer erstellt die Verfahrensdokumentation?",
    a: "Die Verfahrensdokumentation erstellt Ihr Betrieb; CraftOS liefert dafür nachvollziehbare Funktionen wie Festschreibung, Versionen und Protokolle.",
  },
  {
    q: "Wie korrigiere ich eine festgeschriebene Rechnung?",
    a: "Über einen Storno mit eigener Nummer und Bezug zum Original; die festgeschriebene Rechnung bleibt dabei geschützt.",
  },
  {
    q: "Was leistet der DATEV-Export für die GoBD?",
    a: "Der DATEV-Export bereitet die Übergabe an die Steuerberatung vor; Prüfungs- und Aufbewahrungsanforderungen stimmen Sie mit Ihrer Steuerberatung ab.",
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
