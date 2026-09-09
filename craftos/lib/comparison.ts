import { tarife } from "./site";

export const comparisonCheckedAt = "2026-09-09";
export const comparisonCheckedLabel = "9. September 2026";

export const comparisonSources = {
  craftnotePrices: {
    label: "Craftnote: Preise und Zusatzmodule",
    url: "https://craftnote.de/preise/",
  },
  craftnoteTerms: {
    label: "Craftnote: Kosten und Vertragslaufzeit",
    url: "https://hilfe.mycraftnote.de/hc/de/articles/360010406620--Was-f%C3%BCr-Kosten-kommen-auf-mich-zu",
  },
  craftnoteOffice: {
    label: "Craftnote: Büro Plus",
    url: "https://craftnote.de/buero-plus/",
  },
  craftnotePlanning: {
    label: "Craftnote: Plantafel",
    url: "https://craftnote.de/plantafel/",
  },
  craftnoteTime: {
    label: "Craftnote: Zeiterfassung",
    url: "https://craftnote.de/zeiterfassung/",
  },
  craftnoteLicenses: {
    label: "Craftnote: Funktionen nach Paket",
    url: "https://hilfe.mycraftnote.de/hc/de/articles/9857078583324--Welche-Funktionen-stehen-mir-in-Craftnote-zur-Verf%C3%BCgung",
  },
  plancraftPrices: {
    label: "plancraft: Pakete, Nutzer und Laufzeiten",
    url: "https://plancraft.com/de-de/preise",
  },
  plancraftPlanning: {
    label: "plancraft: Digitale Plantafel",
    url: "https://plancraft.com/de-de/funktionen/digitale-plantafel",
  },
  plancraftTime: {
    label: "plancraft: Zeiterfassung",
    url: "https://plancraft.com/de-de/funktionen/zeiterfassung-handwerk",
  },
  plancraftPhone: {
    label: "plancraft: KI-Empfang und Credit-Tarife",
    url: "https://help.plancraft.com/de/articles/685961-preise-und-tarife-fur-den-ki-empfang-credits-abrechnung-kundigung-und-rabatte",
  },
} as const;

export type ComparisonSourceId = keyof typeof comparisonSources;

// Centbeträge vermeiden Rundungsunterschiede zwischen Lizenzpreis und Jahressumme.
export const craftnotePlans = [
  {
    name: "Büro",
    monthlyEquivalentCents: 2990,
    note: "Pro Person; Projektorganisation und Baustellenkommunikation.",
  },
  {
    name: "Büro Plus",
    monthlyEquivalentCents: 4990,
    note: "Pro Person; ergänzt Angebote, Rechnungen und Kalkulation. Angezeigter Aktionspreis statt 69,90 €.",
  },
  {
    name: "Baustelle",
    monthlyEquivalentCents: 1490,
    note: "Pro zusätzlicher Person im Team; mindestens ein Büropaket erforderlich.",
  },
] as const;

export const plancraftPlans = [
  {
    name: "Business",
    monthlyCents: 7490,
    annualMonthlyCents: 5990,
    biennialMonthlyCents: 4792,
    officeUsers: 1,
  },
  {
    name: "Pro",
    monthlyCents: 13990,
    annualMonthlyCents: 10990,
    biennialMonthlyCents: 8792,
    officeUsers: 2,
  },
  {
    name: "Premium",
    monthlyCents: 24990,
    annualMonthlyCents: 19990,
    biennialMonthlyCents: 15992,
    officeUsers: 3,
  },
] as const;

export const plancraftAddons = [
  {
    name: "Zusätzlicher Bürozugang",
    monthlyCents: 5990,
    annualMonthlyCents: 4990,
    biennialMonthlyCents: 3992,
    note: "Mobile Nutzung derselben Person inklusive.",
  },
  {
    name: "Zusätzlicher Mobilzugang",
    monthlyCents: 2490,
    annualMonthlyCents: 1990,
    biennialMonthlyCents: 1592,
    note: "Pro zusätzlicher mobiler Person.",
  },
  {
    name: "Plantafel",
    monthlyCents: 4990,
    annualMonthlyCents: 3990,
    biennialMonthlyCents: 3192,
    note: "Zusatzmodul für Business und Pro; in Premium enthalten.",
  },
] as const;

const fullLicense = tarife.find((plan) => plan.id === "voll")!;
const appLicense = tarife.find((plan) => plan.id === "app")!;

export const craftosComparisonPrices = {
  fullMonthlyCents: Math.round(fullLicense.monat * 100),
  fullAnnualCents: Math.round(fullLicense.jahr * 100),
  appMonthlyCents: Math.round(appLicense.monat * 100),
  appAnnualCents: Math.round(appLicense.jahr * 100),
};

export const teamExamples = [
  {
    name: "CraftOS",
    package: "1 Voll-Lizenz + 4 App-Lizenzen",
    annualCents:
      craftosComparisonPrices.fullAnnualCents +
      4 * craftosComparisonPrices.appAnnualCents,
    calculation: `${formatComparisonMoney(craftosComparisonPrices.fullAnnualCents)} + 4 × ${formatComparisonMoney(craftosComparisonPrices.appAnnualCents)}`,
    note: "Plantafel und Mobile-App der Person mit Voll-Lizenz enthalten.",
    href: "/preise",
    sourceLabel: "CraftOS-Preise",
  },
  {
    name: "Craftnote",
    package: "1 Büro Plus + 4 Baustelle",
    annualCents:
      (craftnotePlans[1].monthlyEquivalentCents +
        4 * craftnotePlans[2].monthlyEquivalentCents) *
      12,
    calculation: `(${formatComparisonMoney(craftnotePlans[1].monthlyEquivalentCents)} + 4 × ${formatComparisonMoney(craftnotePlans[2].monthlyEquivalentCents)}) × 12`,
    note: "Büro-Plus-Aktionspreis am Prüfdatum; keine zusätzliche Plantafelgebühr angesetzt.",
    href: comparisonSources.craftnotePrices.url,
    sourceLabel: "Craftnote-Preise",
  },
  {
    name: "plancraft",
    package: "Business + 4 Mobilzugänge + Plantafel",
    annualCents:
      (plancraftPlans[0].annualMonthlyCents +
        4 * plancraftAddons[1].annualMonthlyCents +
        plancraftAddons[2].annualMonthlyCents) *
      12,
    calculation: `(${formatComparisonMoney(plancraftPlans[0].annualMonthlyCents)} + 4 × ${formatComparisonMoney(plancraftAddons[1].annualMonthlyCents)} + ${formatComparisonMoney(plancraftAddons[2].annualMonthlyCents)}) × 12`,
    note: "Business mit einem Bürozugang; die zusätzlichen Pro-Funktionen sind hier nicht enthalten.",
    href: comparisonSources.plancraftPrices.url,
    sourceLabel: "plancraft-Preise",
  },
] as const;

type ComparisonCell = {
  text: string;
  detail?: string;
  href?: string;
  source?: ComparisonSourceId;
};
export type FeatureComparison = {
  feature: string;
  craftos: ComparisonCell;
  craftnote: ComparisonCell;
  plancraft: ComparisonCell;
};

export const featureComparisons: FeatureComparison[] = [
  {
    feature: "Angebote und Rechnungen",
    craftos: {
      text: "In der Voll-Lizenz",
      detail: "Kalkulation, Abschläge, Teil- und Schlussrechnungen.",
      href: "/funktionen/rechnungen",
    },
    craftnote: {
      text: "Im Paket Büro Plus",
      detail: "Mit Kalkulation und Kunden-/Leistungskatalog.",
      source: "craftnoteOffice",
    },
    plancraft: {
      text: "Ab Business",
      detail: "Pro ergänzt unter anderem kumulative Abschläge.",
      source: "plancraftPrices",
    },
  },
  {
    feature: "Plantafel",
    craftos: {
      text: "In der Voll-Lizenz",
      detail: "Web-Planung; zugeordnete Einsätze mobil sehen.",
      href: "/funktionen/plantafel",
    },
    craftnote: {
      text: "Plantafel angeboten",
      detail:
        "Personen, Projekte und Ressourcen planen; keine gesonderte Modulgebühr auf der Preisseite ausgewiesen.",
      source: "craftnotePlanning",
    },
    plancraft: {
      text: "In Premium enthalten",
      detail: "Für Business und Pro als kostenpflichtiges Zusatzmodul.",
      source: "plancraftPrices",
    },
  },
  {
    feature: "Mobile Nutzung des Bürozugangs",
    craftos: {
      text: "In der Voll-Lizenz enthalten",
      detail:
        "Web und Mobile-App für dieselbe Person; Zugriff nach Rolle und Rechten.",
      href: "/app",
    },
    craftnote: {
      text: "Web- und Mobilfunktionen",
      detail:
        "Laut Paketübersicht auch für Büro; Funktionsumfang unterscheidet sich nach Oberfläche und Rolle.",
      source: "craftnoteLicenses",
    },
    plancraft: {
      text: "Im Bürozugang enthalten",
      detail: "Zusätzliche mobile Personen benötigen eigene Zugänge.",
      source: "plancraftPrices",
    },
  },
  {
    feature: "Zeiterfassung",
    craftos: {
      text: "Mobil und im Web",
      detail: "Timer, manuelle Einträge und projektbezogene Auswertung.",
      href: "/funktionen/zeiterfassung",
    },
    craftnote: {
      text: "Mobile Erfassung",
      detail: "Mit Büroauswertung und Export.",
      source: "craftnoteTime",
    },
    plancraft: {
      text: "Mobile Erfassung",
      detail: "Mit Offline-Zwischenspeicherung und späterer Synchronisation.",
      source: "plancraftTime",
    },
  },
  {
    feature: "KI-Telefonempfang",
    craftos: {
      text: "Angekündigt",
      detail:
        "Telefon-Agent geplant für September / Anfang Oktober 2026; noch keine verfügbare Leistung.",
      href: "#ausblick",
    },
    craftnote: {
      text: "Hier nicht bewertet",
      detail:
        "Der Vergleich trifft dazu keine Aussage über Verfügbarkeit oder Planung.",
    },
    plancraft: {
      text: "Bereits angeboten",
      detail:
        "Kostenloser Tarif mit 60 Credits/Monat; kostenpflichtiger Tarif ab 79,90 €/Monat für plancraft-Kunden.",
      source: "plancraftPhone",
    },
  },
];

export function formatComparisonMoney(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
