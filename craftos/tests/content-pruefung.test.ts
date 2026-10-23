/**
 * Prüfdateien der Phase 9 (D-11, D-18, D-27; 09-09): Jede Paket-Prüfdatei unter docs/content-pruefung nennt jeden
 * Artikel ihres Pakets genau einmal als Tabellenzeile `| blog/<slug> |`, `| hilfe/<slug> |` bzw.
 * `| gewerke/<slug> |` und enthält eine Übergabeliste. Die Pakete b bis g decken zusammen alle veröffentlichten
 * Ratgeber und Hilfeartikel ab, Paket a alle Gewerke. Andere Tabellen (Pflichtquellen) führen den Artikel als Code.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { gewerke } from "@/lib/gewerke";

const ROOT = path.resolve(import.meta.dirname, "..");
const ORDNER = path.join(ROOT, "docs/content-pruefung");
const ZEILE = /^\| ((?:blog|hilfe|gewerke)\/[a-z0-9-]+) \|/gm;

const PAKETE: Record<string, string[]> = {
  "09-a": gewerke.map((g) => `gewerke/${g.slug}`),
  "09-b": [
    "blog/abschlagsrechnung-schlussrechnung",
    "blog/aufmass-angebot-mengen-abzuege",
    "blog/handwerkerangebot-erstellen",
    "blog/handwerkerrechnung-schreiben",
    "blog/handwerkersoftware-auswaehlen",
    "blog/handwerkersoftware-einzelunternehmen",
    "blog/handwerkersoftware-wechseln",
    "blog/stundenverrechnungssatz-berechnen",
    "blog/tiefenkalkulation-handwerk",
    "blog/web-app-baustellen-app",
    "blog/xrechnung-zugferd-pdf-unterschiede",
    "blog/zahlungserinnerung-mahnung-handwerk",
  ],
  "09-c": [
    "blog/baustellen-einsatzplanung",
    "blog/datev-export-vorbereiten",
    "blog/digitale-bautagesberichte",
    "blog/digitale-projektakte",
    "blog/eingangsrechnungen-digital-organisieren",
    "blog/ki-belegscan-pruefen",
    "blog/materialverbrauch-baustelle-zuordnen",
    "blog/nachkalkulation-handwerk",
    "blog/offene-posten-liquiditaet",
    "blog/offline-baustellen-app",
    "blog/projektbezogene-zeiterfassung",
    "blog/urlaub-abwesenheiten-einsatzplanung",
  ],
  "09-d": [
    "hilfe/anmelden-web-mobile",
    "hilfe/beleg-kontieren-zuordnen",
    "hilfe/beleg-scannen-pruefen",
    "hilfe/datev-export-erstellen",
    "hilfe/firmenprofil-einrichten",
    "hilfe/kunden-ansprechpartner-anlegen",
    "hilfe/mitarbeiter-einladen-lizenz-zuweisen",
    "hilfe/rollen-zugriffsrechte-einstellen",
    "hilfe/zahlungen-erfassen",
  ],
  "09-d2": [
    "hilfe/abschlagsrechnung-erstellen",
    "hilfe/angebot-entwurf-anlegen",
    "hilfe/angebot-in-rechnung-uebernehmen",
    "hilfe/angebotspositionen-leistungsvorlagen",
    "hilfe/berichte-abrechnen",
    "hilfe/e-rechnung-herunterladen",
    "hilfe/gaeb-importieren",
    "hilfe/position-tiefenkalkulieren",
    "hilfe/raumaufmass-angebot-uebernehmen",
    "hilfe/rechnung-fertigstellen",
    "hilfe/rechnung-stornieren",
    "hilfe/schlussrechnung-erstellen",
  ],
  "09-e": [
    "hilfe/mobile-offline-synchronisierung",
    "hilfe/mobilen-timer-bedienen",
    "hilfe/plantafel-einsatz-planen",
    "hilfe/planung-mitarbeiter-ressourcen",
    "hilfe/projekt-phasen-anlegen",
    "hilfe/projektdateien-ordner",
    "hilfe/urlaub-beantragen-bearbeiten",
    "hilfe/zeiteintrag-erfassen-korrigieren",
    "hilfe/zeiten-pruefen-exportieren",
  ],
  "09-e2": [
    "hilfe/abnahme-dokumentieren",
    "hilfe/artikel-stammdaten-anlegen",
    "hilfe/bautagesbericht-erstellen",
    "hilfe/craft-ai-betriebsdaten-fragen",
    "hilfe/inventur-durchfuehren",
    "hilfe/ki-entwurf-pruefen-uebernehmen",
    "hilfe/lagerorte-lagerplaetze-einrichten",
    "hilfe/mangel-erfassen-bearbeiten",
    "hilfe/material-entnehmen-zurueckbuchen",
    "hilfe/wareneingang-buchen",
  ],
  "09-f": [
    "hilfe/angebot-online-unterschreiben-lassen",
    "hilfe/app-sprache-einstellen",
    "hilfe/bankumsaetze-abgleichen",
    "hilfe/besichtigung-durchfuehren",
    "hilfe/datanorm-katalog-importieren",
    "hilfe/daten-importieren",
    "hilfe/kassenbuch-fuehren",
    "hilfe/kundenportal-kunden-einladen",
    "hilfe/lager-scan-app",
    "hilfe/mahnwesen-einrichten",
    "hilfe/projekt-chat-nachrichten",
  ],
  "09-g": [
    "blog/arbeitszeitnachweis-vorlage",
    "blog/bauablaufplan",
    "blog/gaeb-formate",
    "blog/maengelanzeige",
    "blog/materialliste-vorlage",
    "blog/reverse-charge-bauleistungen",
    "hilfe/bedenkenanzeige",
    "hilfe/leistungszeitraum-rechnung",
    "hilfe/regiebericht",
  ],
};

const lies = (paket: string) => fs.readFileSync(path.join(ORDNER, `${paket}.md`), "utf8");
const zeilen = (text: string) => [...text.matchAll(ZEILE)].map((m) => m[1]);

/** Veröffentlichte Artikel (draft: false) als „blog/<slug>“ bzw. „hilfe/<slug>“. */
function artikel(): string[] {
  const out: string[] = [];
  for (const kind of ["blog", "hilfe"])
    for (const name of fs.readdirSync(path.join(ROOT, "content", kind)).sort()) {
      if (!name.endsWith(".md")) continue;
      const text = fs.readFileSync(path.join(ROOT, "content", kind, name), "utf8");
      if (/^draft:\s*false\s*$/m.test(text)) out.push(`${kind}/${name.slice(0, -3)}`);
    }
  return out;
}

describe("Prüfdateien der Phase 9 (D-11, D-27)", () => {
  for (const [paket, soll] of Object.entries(PAKETE))
    it(`${paket}: jeder Paketartikel genau einmal, mit Übergabeliste`, () => {
      const text = lies(paket);
      const ist = zeilen(text);
      expect(new Set(ist).size, `${paket}: doppelte Zeilen ${ist.filter((z, i) => ist.indexOf(z) !== i).join(", ")}`).toBe(
        ist.length,
      );
      expect([...ist].sort()).toEqual([...soll].sort());
      expect(text).toContain("Übergabeliste");
    });

  it("Pakete b bis g decken alle veröffentlichten Artikel genau einmal ab (30 Ratgeber, 54 Hilfeartikel)", () => {
    const alle = Object.entries(PAKETE)
      .filter(([p]) => p !== "09-a")
      .flatMap(([, liste]) => liste);
    expect(new Set(alle).size).toBe(alle.length);
    expect([...alle].sort()).toEqual(artikel());
    expect(alle.filter((a) => a.startsWith("blog/"))).toHaveLength(30);
    expect(alle.filter((a) => a.startsWith("hilfe/"))).toHaveLength(54);
  });

  it("Paket a deckt alle zwölf Gewerke ab", () => {
    expect(PAKETE["09-a"]).toHaveLength(12);
  });
});
