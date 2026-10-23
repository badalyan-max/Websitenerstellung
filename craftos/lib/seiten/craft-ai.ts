/**
 * Inhalte der Seite `/craft-ai` (08-UI-SPEC § 5.3; D-09, D-12). Credits, Credit-Pakete und Stand kommen aus
 * lib/site.ts; keine Preis- oder Credit-Literale. Wortregeln (T-08-32): Craft AI bereitet Entwürfe vor, die Sie
 * prüfen und bestätigen. Inhaber 22.10.2026: nur Unterstütztes nennen – die Zuständigkeit steht positiv („Sie prüfen
 * und bestätigen“), ohne Verneinungen. Prüfung: tests/kernseiten.test.ts, tests/design-v2-budgets.test.ts.
 *
 * Hotfix 23.10.2026: Craft AI = KI-Funktionen auf Anforderung in einzelnen Bereichen, je am Release belegt:
 * - Angebotschat (Web): src/components/ai-agent/OfferAiWorkspace.tsx („KI-Angebot“, „Angebotschat öffnen“),
 *   OfferAiDraftPreview.tsx („Angebotsentwurf“), OfferAiConversation.tsx („Ins Angebot übernehmen“); Reiter „KI“ im
 *   Angebotseditor (DocumentEditor/DocumentToolbox.tsx), freigegeben über useAiGate('offer').
 * - Belegscan (Mobile): src/shared/i18n/locales/de/invoices.json „Beleg scannen“, „Beleg wird per KI ausgelesen…“.
 * - Diktieren in Berichten (Mobile): features/construction-reports/components/ReportDictationField.tsx,
 *   locales/de/construction.json voice.start „Diktieren“.
 * - Foto-Erkennung im Lager (Mobile): features/inventory/screens/InventoryDraftScreen.tsx, locales/de/common.json
 *   inventory.recognize „Foto mit KI erkennen“.
 * - Freigabe zentral und je Person: Web src/lib/ai/aiFeatures.ts (KiSettings, MemberAiDialog).
 * Prüfung zusätzlich: tests/nur-unterstuetzt.test.ts (Hotfix 23.10.2026).
 */
import { ListChecks, Scale, ToggleRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { KeyFact } from "@/components/v2/KeyFacts";
import type { Step } from "@/components/v2/StepFlow";
import { euro, germanDate } from "@/lib/format";
import { pruefeNurUnterstuetzt } from "@/lib/nur-unterstuetzt";
import { creditPakete, creditWertEuro, site, startCredits } from "@/lib/site";

export const CRAFT_AI_PFAD = "/craft-ai" as const;

export const CRAFT_AI_SECTION_IDS = ["kopf", "so-arbeitet-craft-ai", "kosten", "wer-entscheidet", "faq", "cta"] as const;
export type CraftAiSectionId = (typeof CRAFT_AI_SECTION_IDS)[number];

export const CRAFT_AI_SURFACES: Readonly<Record<CraftAiSectionId, "dark" | "white" | "warm">> = {
  kopf: "dark",
  "so-arbeitet-craft-ai": "white",
  kosten: "warm",
  "wer-entscheidet": "white",
  faq: "warm",
  cta: "dark",
};

/** Kopf G1 ohne Visual; H1 („KI im Handwerk: …“), Title und Description aus der Keyword-Map. */
export const craftAiKopf = {
  eyebrow: "Craft AI",
  kopfwort: "Handwerk:",
  lead: "KI-Funktionen auf Anforderung: Angebotsentwurf, Belegscan, Diktat in Berichten und Foto-Erkennung im Lager.",
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
    lead: "Craft AI arbeitet dort, wo Sie es anfordern: im Angebotschat des Angebotseditors, beim Belegscan, beim Diktieren in Berichten und bei der Foto-Erkennung im Lager. Sie prüfen und bestätigen jede Übernahme.",
  },
  kosten: {
    title: "Was kostet Craft AI?",
    lead: `Craft AI verbraucht Credits: Jeder Betrieb erhält einmalig ${startCredits} Credits Startguthaben, danach kaufen Sie Credit-Pakete ab ${euroGanz(kleinstesPaket)} netto, und 1 Credit entspricht ${euro(creditWertEuro)}.`,
  },
  "wer-entscheidet": {
    title: "Wer entscheidet bei Craft AI?",
    lead: "Sie entscheiden: Craft AI macht Vorschläge und bereitet Entwürfe vor, Sie prüfen jedes Ergebnis auf Vollständigkeit und Richtigkeit und bestätigen jede Übernahme selbst.",
  },
  faq: {
    title: "Häufige Fragen zu Craft AI",
    lead: "Kurze Antworten zu Angebotschat, Belegscan, Diktat und Foto-Erkennung.",
  },
};

export const craftAiSteps: Step[] = [
  { title: "KI anfordern", text: "Im Angebotschat, beim Belegscan, im Bericht oder im Lager die KI starten." },
  { title: "Vorschlag erhalten", text: "Angebotsentwurf, Belegangaben, diktierter Text oder Artikelvorschlag erscheinen." },
  { title: "Prüfen und bestätigen", text: "Inhalt und Zuordnung kontrollieren; erst Ihre Bestätigung übernimmt." },
];

export const craftAiKeyFacts: { facts: KeyFact[]; note: string } = {
  facts: [
    { value: String(startCredits), label: "Credits Startguthaben, einmalig", source: "site:startCredits" },
    { value: euro(creditWertEuro), label: "Wert eines Credits", source: "site:creditWertEuro" },
    { value: `ab ${euroGanz(kleinstesPaket)}`, label: "Credit-Paket, netto", source: "site:creditPakete" },
  ],
  note: `KI-Belegscans werden über Credits abgerechnet; die strukturierte Verarbeitung von E-Rechnungen ist davon getrennt. Stand ${germanDate(site.checkedAt)}.`,
};

/**
 * Zuständigkeit (BentoGrid, Abschnitt „Wer entscheidet bei Craft AI?“): mindestens zwei Kachelgrößen (Baustein-Regel);
 * wide + 2 × md, damit kein Titel in einer schmalen sm-Kachel silbengetrennt wird (Sichtprüfung 08-12) und die
 * Reihenfolge in allen Breiten bleibt.
 */
export const craftAiGrenzen: { title: string; text: string; icon: LucideIcon; size: "md" | "wide" }[] = [
  {
    title: "Mengen und Preise prüfen",
    text: "KI-Ergebnisse vor der Übernahme auf Mengen, Preise, Zeiten und Projektbezug prüfen.",
    icon: ListChecks,
    size: "wide",
  },
  {
    title: "Sie bestätigen jede Buchung",
    text: "Craft AI macht Vorschläge; Sie prüfen und bestätigen jede Buchung.",
    icon: Scale,
    size: "md",
  },
  {
    title: "Freigabe im Betrieb",
    text: "Ihr Betrieb gibt KI-Funktionen zentral und je Person frei.",
    icon: ToggleRight,
    size: "md",
  },
];

export const craftAiFaq: { q: string; a: string }[] = [
  {
    q: "Kann Craft AI Angebote erstellen?",
    a: "Im Angebotseditor öffnen Sie im Reiter „KI“ den Angebotschat. Er bereitet einen Angebotsentwurf vor; Sie prüfen Positionen, Mengen und Preise und übernehmen ihn mit „Ins Angebot übernehmen“.",
  },
  {
    q: "Welche KI-Funktionen umfasst Craft AI?",
    a: "Craft AI umfasst den Angebotschat im Angebotseditor, den Belegscan für Eingangsrechnungen, das Diktieren in Berichten und die Foto-Erkennung im Lager der Mobile-App.",
  },
  {
    q: "Kann ich Craft AI per Sprache nutzen?",
    a: "Ja. In Berichten tippen Sie auf „Diktieren“; der Text erscheint im Feld, und Sie prüfen ihn vor dem Speichern.",
  },
];

// Inhabervorgabe 22.10.2026 (08-REVIEW ME-06): nur Unterstütztes, positiv formuliert; Prüfung beim Laden.
pruefeNurUnterstuetzt(
  {
    craftAiKopf,
    craftAiSections,
    craftAiSteps,
    craftAiKeyFacts,
    craftAiGrenzen: craftAiGrenzen.map(({ title, text }) => ({ title, text })),
    craftAiFaq,
  },
  { kontext: "Craft AI" },
);
