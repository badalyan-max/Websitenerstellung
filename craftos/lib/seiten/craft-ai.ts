/**
 * Inhalte der Seite `/craft-ai` (08-UI-SPEC § 5.3; D-09, D-12). Credits, Credit-Pakete und Stand kommen aus
 * lib/site.ts; keine Preis- oder Credit-Literale. Wortregeln (T-08-32): Craft AI bereitet Entwürfe vor, die Sie
 * prüfen und bestätigen – kein autonomes Verbuchen. Prüfung: tests/kernseiten.test.ts, tests/design-v2-budgets.test.ts.
 */
import { KeyRound, ListChecks, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { KeyFact } from "@/components/v2/KeyFacts";
import type { Step } from "@/components/v2/StepFlow";
import { euro, germanDate } from "@/lib/format";
import { creditPakete, creditWertEuro, site, startCredits } from "@/lib/site";

export const CRAFT_AI_PFAD = "/craft-ai" as const;

export const CRAFT_AI_SECTION_IDS = ["kopf", "so-arbeitet-craft-ai", "kosten", "grenzen", "faq", "cta"] as const;
export type CraftAiSectionId = (typeof CRAFT_AI_SECTION_IDS)[number];

export const CRAFT_AI_SURFACES: Readonly<Record<CraftAiSectionId, "dark" | "white" | "warm">> = {
  kopf: "dark",
  "so-arbeitet-craft-ai": "white",
  kosten: "warm",
  grenzen: "white",
  faq: "warm",
  cta: "dark",
};

/** Kopf G1 ohne Visual; H1 („KI im Handwerk: …“), Title und Description aus der Keyword-Map. */
export const craftAiKopf = {
  eyebrow: "Craft AI",
  kopfwort: "Handwerk:",
  lead: "Fragen zu Projekten, Rechnungen und Zeiten stellen, Entwürfe vorbereiten lassen und selbst prüfen.",
  secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/ki-entwurf-pruefen-uebernehmen" },
} as const;

/** Kleinstes Credit-Paket ohne Nachkommastellen („10 €“), Betrag aus lib/site.ts. */
const kleinstesPaket = Math.min(...creditPakete.map((p) => p.preis));
const euroGanz = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(
    value,
  );

export const craftAiSections: Record<Exclude<CraftAiSectionId, "kopf" | "cta">, { title: string; lead: string }> = {
  "so-arbeitet-craft-ai": {
    title: "Wie arbeitet Craft AI?",
    lead: "Sie stellen eine Frage per Text oder Sprache, Craft AI antwortet aus den Betriebsdaten, auf die Ihre Rolle Zugriff hat, und bereitet unterstützte Entwürfe vor, die Sie prüfen und bestätigen.",
  },
  kosten: {
    title: "Was kostet Craft AI?",
    lead: `Craft AI verbraucht Credits: Jeder Betrieb erhält einmalig ${startCredits} Credits Startguthaben, danach kaufen Sie Credit-Pakete ab ${euroGanz(kleinstesPaket)} netto, und 1 Credit entspricht ${euro(creditWertEuro)}.`,
  },
  grenzen: {
    title: "Was übernimmt Craft AI nicht?",
    lead: "Craft AI bucht nicht selbstständig und ersetzt keine Prüfung: Ergebnisse können unvollständig oder falsch sein, und jede Übernahme bestätigen Sie selbst.",
  },
  faq: {
    title: "Häufige Fragen zu Craft AI",
    lead: "Kurze Antworten zu Entwürfen, Daten und Sprache.",
  },
};

export const craftAiSteps: Step[] = [
  { title: "Frage stellen", text: "Betriebsdaten per Text oder Sprache abfragen, im Rahmen Ihrer Rechte." },
  { title: "Entwurf erhalten", text: "Angebots-, Zeit-, Einsatz- oder Berichtsentwürfe als Ausgangspunkt nutzen." },
  { title: "Prüfen und bestätigen", text: "Inhalt und Zuordnung kontrollieren; erst Ihre Bestätigung übernimmt." },
];

export const craftAiKeyFacts: { facts: KeyFact[]; note: string } = {
  facts: [
    { value: String(startCredits), label: "Credits Startguthaben, einmalig", source: "site:startCredits" },
    { value: euro(creditWertEuro), label: "Wert eines Credits", source: "site:creditWertEuro" },
    { value: `ab ${euroGanz(kleinstesPaket)}`, label: "Credit-Paket, netto", source: "site:creditPakete" },
  ],
  note: `KI-Belegscans werden ebenfalls über Credits abgerechnet; die strukturierte Verarbeitung von E-Rechnungen ist davon getrennt. Stand ${germanDate(site.checkedAt)}.`,
};

/**
 * Grenzen (BentoGrid): mindestens zwei Kachelgrößen (Baustein-Regel); wide + 2 × md, damit kein Titel in einer
 * schmalen sm-Kachel silbengetrennt wird (Sichtprüfung 08-12: „autono-mes“) und die Reihenfolge in allen Breiten bleibt.
 */
export const craftAiGrenzen: { title: string; text: string; icon: LucideIcon; size: "md" | "wide" }[] = [
  {
    title: "Mengen und Preise prüfen",
    text: "KI-Ergebnisse vor der Übernahme auf Mengen, Preise, Zeiten und Projektbezug prüfen.",
    icon: ListChecks,
    size: "wide",
  },
  {
    title: "Kein autonomes Verbuchen",
    text: "Craft AI wird nicht als selbstständig verbuchendes Buchhaltungssystem angeboten.",
    icon: Scale,
    size: "md",
  },
  {
    title: "Zugriff nach Rolle",
    text: "Antworten richten sich nach den Daten, auf die Ihre Rolle Zugriff hat.",
    icon: KeyRound,
    size: "md",
  },
];

export const craftAiFaq: { q: string; a: string }[] = [
  {
    q: "Kann Craft AI Angebote erstellen?",
    a: "Craft AI bereitet unterstützte Angebotsentwürfe vor; Sie prüfen Positionen, Mengen und Preise und übernehmen den Entwurf erst nach Ihrer Bestätigung.",
  },
  {
    q: "Welche Daten nutzt Craft AI?",
    a: "Craft AI nutzt die Betriebsdaten in CraftOS, auf die Ihre Rolle Zugriff hat, etwa Projekte, Rechnungen und Zeiten.",
  },
  {
    q: "Kann ich Craft AI per Sprache nutzen?",
    a: "Ja. Fragen stellen Sie per Text oder per Sprache.",
  },
];
