// Erzeugt /llms.txt aus denselben Daten wie die Website, damit Preise und Seiten nie auseinanderlaufen.
import { funktionen } from "./funktionen";
import { gewerke } from "./gewerke";
import {
  creditPakete,
  extraSpeicher,
  site,
  speicherPool,
  startCredits,
  tarife,
  zahlung,
} from "./site";

const euro = (value: number) => value.toFixed(2).replace(".", ",") + " €";
const link = (name: string, path: string, note?: string) =>
  `- [${name}](${site.url}${path})${note ? ": " + note : ""}`;

export function buildLlmsTxt(): string {
  const lizenzen = tarife.map(
    (t) =>
      `- ${t.name}${t.id === "voll" ? ` (${t.produktlizenz})` : ""}: ${euro(t.monat)} netto pro Person und Monat oder ${euro(t.jahr)} netto im Jahr. ${t.fuer}.`,
  );
  const pakete = creditPakete
    .map((c) => `${euro(c.preis)}${c.bonus > 0 ? ` (+${c.bonus} % Bonus)` : ""}`)
    .join(", ");
  return [
    "# CraftOS Handwerkersoftware",
    "",
    `> CraftOS (craftos.eu) ist eine Handwerkersoftware für Handwerksbetriebe in Deutschland. Sie verbindet Angebote, Rechnungen, Plantafel, Zeiterfassung, Projekte und Lager in einem System, mit Web-App und Mobile-App für iOS und Android.`,
    "",
    `- Website: ${site.url}, Web-App: ${site.appUrl}`,
    ...lizenzen,
    "- Die Voll-Lizenz enthält Web-App und Mobile-App für dieselbe Person. Mindestens eine Voll-Lizenz pro Betrieb.",
    `- Testphase: ${zahlung.trial}`,
    `- Zahlung: ${zahlung.sepa} oder ${zahlung.karte}. ${zahlung.jahresrabatt}.`,
    `- Speicher: ${speicherPool}`,
    `- Extra-Speicher: ${euro(extraSpeicher.monat)} netto pro Monat je ${extraSpeicher.gb} GB oder ${euro(extraSpeicher.jahr)} netto im Jahr`,
    `- KI-Credits: einmalig ${startCredits} Credits Startguthaben, danach im Voraus gekaufte Credit-Pakete (netto): ${pakete}. Kein Monatskontingent, keine Nachabrechnung.`,
    `- Mobile-App: iOS ${site.iosUrl}, Android ${site.androidUrl}`,
    `- Kontakt: ${site.email}`,
    `- Stand der Angaben: ${site.checkedAt}`,
    "",
    "## Funktionen",
    "",
    ...funktionen
      .filter((f) => f.tier === "heute")
      .map((f) => link(f.name, `/funktionen/${f.slug}`, f.kurz)),
    "",
    "## Gewerke",
    "",
    ...gewerke.map((g) => link(g.name, `/gewerke/${g.slug}`)),
    "",
    "## Preise und Vergleich",
    "",
    link("Preise", "/preise"),
    link("Vergleich mit Craftnote und plancraft", "/vergleich"),
    link("Fakten über CraftOS", "/fakten-ueber-craftos"),
    link("GoBD", "/gobd"),
    "",
    "## Rechner",
    "",
    link("Stundensatz-Rechner", "/rechner/stundensatz"),
    link("Angebots- und Margenrechner", "/rechner/angebotskalkulation"),
    "",
    "## Wissen",
    "",
    link("Ratgeber", "/blog"),
    link("Hilfe-Center", "/hilfe"),
    "",
  ].join("\n");
}
