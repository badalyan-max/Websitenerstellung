// Erzeugt /llms.txt aus denselben Daten wie die Website, damit Preise und Seiten nie auseinanderlaufen.
import { datenstandort } from "./datenstandort";
import { einrichtung } from "./einrichtung";
import { funktionen } from "./funktionen";
import { gewerke } from "./gewerke";
import { keywordMap } from "./keyword-map";
import { mobileOffline } from "./product-register";
import { zahlwort } from "./seiten/vergleich";
import { wettbewerber } from "./wettbewerber";
import {
  creditPakete,
  creditUmrechnung,
  extraSpeicher,
  site,
  speicherPool,
  startCredits,
  tarife,
  zahlung,
} from "./site";

/**
 * 09-09 (SEO-09, CONTENT-04): Wissensseiten und Anleitungen zu den seit dem 09.09.2026 neuen Live-Funktionen.
 * Linktext = Map-Titel ohne Markenzusatz (eine Quelle mit der Seite); jeder Pfad muss als „bestehend“ in der Map stehen.
 */
export const LLMS_WISSENSSEITEN = [
  "/hilfe/leistungszeitraum-rechnung",
  "/hilfe/regiebericht",
  "/hilfe/bedenkenanzeige",
  "/blog/maengelanzeige",
  "/blog/reverse-charge-bauleistungen",
  "/blog/gaeb-formate",
  "/blog/materialliste-vorlage",
  "/blog/bauablaufplan",
  "/blog/arbeitszeitnachweis-vorlage",
] as const;
export const LLMS_ANLEITUNGEN = [
  "/hilfe/kundenportal-kunden-einladen",
  "/hilfe/angebot-online-unterschreiben-lassen",
  "/hilfe/mahnwesen-einrichten",
  "/hilfe/bankumsaetze-abgleichen",
  "/hilfe/daten-importieren",
  "/hilfe/datanorm-katalog-importieren",
  "/hilfe/lager-scan-app",
  "/hilfe/besichtigung-durchfuehren",
  "/hilfe/projekt-chat-nachrichten",
  "/hilfe/app-sprache-einstellen",
  "/hilfe/kassenbuch-fuehren",
] as const;
function mapTitel(pfad: string): string {
  const e = keywordMap.find((k) => k.path === pfad);
  if (!e || e.status !== "bestehend" || !e.target?.title)
    throw new Error(`llms.txt: ${pfad} ist nicht als bestehender Map-Eintrag mit Titel geführt – keyword-map.json prüfen.`);
  return e.target.title.replace(/ \| CraftOS$/, "");
}

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
    // D-41 und Zusatzauftrag 10-f (Inhaber 23.10.2026): Wortlaut aus lib/einrichtung.ts bzw. lib/datenstandort.ts.
    `- Einrichtung: ${einrichtung.kern}`,
    `- Datenstandort: ${datenstandort.kern}`,
    `- Zahlung: ${zahlung.sepa} oder ${zahlung.karte}. ${zahlung.jahresrabatt}.`,
    `- Speicher: ${speicherPool}`,
    `- Extra-Speicher: ${euro(extraSpeicher.monat)} netto pro Monat je ${extraSpeicher.gb} GB oder ${euro(extraSpeicher.jahr)} netto im Jahr`,
    `- KI-Credits: einmalig ${startCredits} Credits Startguthaben (${creditUmrechnung}), danach im Voraus gekaufte Credit-Pakete (netto): ${pakete}. Kein Monatskontingent, keine Nachabrechnung.`,
    `- Mobile-App: iOS ${site.iosUrl}, Android ${site.androidUrl}`,
    `- Kontakt: ${site.email}`,
    `- Stand der Angaben: ${site.checkedAt}`,
    "",
    "## Funktionen",
    "",
    ...funktionen
      .filter((f) => f.tier === "heute")
      .map((f) => link(f.name, `/funktionen/${f.slug}`, f.kurz)),
    // Hotfix 23.10.2026: Craft AI als KI-Funktionen auf Anforderung (Belege: lib/seiten/craft-ai.ts, Kopfkommentar).
    link(
      "Craft AI",
      "/craft-ai",
      "KI-Funktionen auf Anforderung: Angebotsentwurf im Angebotschat, Belegscan, Diktat in Berichten und Foto-Erkennung im Lager; Sie prüfen und bestätigen jede Übernahme",
    ),
    "",
    "## Mobile-App",
    "",
    // Phase-7-Seite /app (Code-Review 07 WR-04); Offline positiv aufgezählt (09-10, Registereintrag mobileOffline.erfassung).
    link(
      "Handwerker-App für die Baustelle",
      "/app",
      `Zeiten, Einsätze, Fotos, Mängel und Unterschriften in der Mobile-App erfassen; ohne Empfang ${mobileOffline.erfassung} erfassen und später übertragen`,
    ),
    "",
    "## Gewerke",
    "",
    ...gewerke.map((g) => link(g.name, `/gewerke/${g.slug}`)),
    "",
    "## Preise und Vergleich",
    "",
    link("Preise", "/preise"),
    // 08-10: Hub mit Marktübersicht aller verglichenen Anbieter (Quellen und Stand auf der Seite).
    link("Handwerkersoftware-Vergleich", "/vergleich"),
    // 08-08/08-09: Alternativen-Seiten aus der Anbieterliste (LO-04), ohne Wettbewerberzahlen (Preise mit Quelle und
    // Stand stehen auf der Seite).
    ...wettbewerber.map((w) =>
      link(`${w.name}-Alternative`, `/vergleich/${w.slug}-alternative`, `CraftOS und ${w.name} mit Quellen und Stand im Vergleich`),
    ),
    // 08-11: Seite für kleine Betriebe (Kriterien mit amtlichen Quellen, Anbieterzahl aus den Daten), ohne Wettbewerberzahlen.
    link(
      "Handwerkersoftware für kleine Betriebe",
      "/vergleich/handwerkersoftware-kleine-betriebe",
      `Kriterien wie E-Rechnung, Laufzeit und Kosten pro Person, ${zahlwort(wettbewerber.length + 1)} Anbieter mit Quellen und Stand`,
    ),
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
    "### Wissensseiten",
    "",
    ...LLMS_WISSENSSEITEN.map((p) => link(mapTitel(p), p)),
    "",
    "### Anleitungen zu neuen Funktionen",
    "",
    ...LLMS_ANLEITUNGEN.map((p) => link(mapTitel(p), p)),
    "",
  ].join("\n");
}
