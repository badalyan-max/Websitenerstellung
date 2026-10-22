/**
 * Seitentexte /vergleich/plancraft-alternative (08-08; 08-UI-SPEC § 3.6 „plancraft“, D-01–D-03).
 * Nur Texte und Auswahl der Fakten; alle Zahlen per Vorlage aus dem Kontext (CraftOS: lib/site.ts,
 * plancraft: lib/wettbewerber/plancraft.ts). Rechenbeispiel = Business + 4 Mobilzugänge + Plantafel-Modul,
 * Jahresabo je Monat über monatAusJahr aus den Modulwerten. Prüfung: lib/seiten/alternativen/index.ts.
 */
import { monatAusJahr } from "@/lib/wettbewerber";
import type { Preis } from "@/lib/wettbewerber/types";
import type { Seitenmodul } from "./types";

export const plancraftSeite: Seitenmodul = (k) => {
  const { w, craftos: c, euro } = k;
  const paket = (name: string): Preis => {
    const p = w.preise.wert.find((x) => x.paket === name);
    if (!p) throw new Error(`plancraft: Paket ${name} fehlt im Datenmodul.`);
    return p;
  };
  const business = paket("Business");
  const pro = paket("Pro");
  const premium = paket("Premium");
  const { mobilzugang, plantafel } = w.zusatzPreise!;
  const mobil = mobilzugang.wert;
  const tafel = plantafel.wert;
  const beispiel = [business, mobil, mobil, mobil, mobil, tafel];
  const jahrJeMonat = euro(monatAusJahr(beispiel.map((p) => p.centsJahrJeMonat! * 12)));
  const monat = euro(beispiel.reduce((summe, p) => summe + p.centsMonat!, 0));
  const dreiStufen = (p: Preis) => `${euro(p.centsMonat!)}, ${euro(p.centsJahrJeMonat!)} oder ${euro(p.centsZweiJahreJeMonat!)}`;

  return {
    keyword: "plancraft-Alternative",
    answer: `CraftOS ist eine plancraft-Alternative mit Preis pro Person: Die Voll-Lizenz mit Web-App, Mobile-App und Plantafel kostet ${c.vollMonat} netto im Monat. plancraft Business kostet ${euro(business.centsMonat!)} netto im Monat mit einem Bürozugang, die Plantafel ist dort ein Zusatzmodul.`,
    vertragsname: "plancraft-Abos",
    rows: [
      k.zeile("Bürozugang, monatliche Zahlung", c.vollMonat, `${euro(business.centsMonat!)} (Business)`, w.preise),
      k.zeile("Bürozugang, Jahresabo je Monat", c.vollJahrJeMonat, `${euro(business.centsJahrJeMonat!)} (Business)`, w.preise),
      k.zeile(
        "Weitere mobile Person, Jahresabo je Monat",
        `${c.appJahrJeMonat} (App-Lizenz)`,
        `${euro(mobil.centsJahrJeMonat!)} (Mobilzugang)`,
        mobilzugang,
      ),
      k.laufzeit(),
      k.testphase(),
      k.kriterium("mobileApp", "Mobile-App für iOS und Android"),
      k.kriterium("plantafel", "Plantafel"),
      k.kriterium("eRechnung", "E-Rechnung"),
      k.kriterium("datev", "DATEV-Export"),
      k.kriterium("gaeb", "GAEB-Schnittstelle"),
      k.kriterium("kiTelefon", "KI-Telefonempfang"),
    ],
    kosten: {
      answer: `Für eine Person im Büro und vier auf der Baustelle zahlen Sie im Jahresabo ${c.beispielJahrJeMonat} netto im Monat bei CraftOS und ${jahrJeMonat} bei plancraft Business mit Plantafel; die Pakete unterscheiden sich im Funktionsumfang.`,
      facts: [
        { key: "business-5p-jahr", value: jahrJeMonat, label: "plancraft Business, 5 Personen, Jahr", fakt: w.preise },
        { key: "business-5p-monat", value: monat, label: "plancraft Business, 5 Personen, Monat", fakt: w.preise },
      ],
      zusammenstellung: "Business + 4 Mobilzugänge + Plantafel-Modul",
      nichtEnthalten: "KI-Verbrauch, Extra-Speicher, Schulungen",
    },
    fuerWen: {
      answer:
        "plancraft passt zu Betrieben, die Pakete mit KI-Empfang oder eine Zweijahresvorauszahlung nutzen möchten; CraftOS passt zu Betrieben, die pro Person abrechnen und die Plantafel ohne Modulgebühr wollen.",
      craftos: ["proPerson", "plantafel", "gaebDatev"],
    },
    umstieg: { laufzeit: "plancraft nennt als Frist einen Tag vor Ende der Mindestlaufzeit." },
    faq: [
      {
        q: "Was kostet plancraft pro Monat?",
        a: `plancraft Business kostet ${euro(business.centsMonat!)} netto im Monatsabo, ${euro(business.centsJahrJeMonat!)} im Jahresabo und ${euro(business.centsZweiJahreJeMonat!)} im Zweijahresabo, jeweils pro Monat mit einem Bürozugang; Pro kostet ${dreiStufen(pro)}, Premium ${dreiStufen(premium)}.`,
      },
      {
        q: "Ist die Plantafel bei CraftOS im Preis enthalten?",
        a: `Ja. Die Plantafel gehört zur Voll-Lizenz für ${c.vollMonat} netto im Monat oder ${c.vollJahr} im Jahr; zusätzlich kosten nur KI-Credits und Extra-Speicher.`,
      },
      {
        q: "Wie lange kann ich plancraft und CraftOS kostenlos testen?",
        a: `CraftOS testen Sie ${c.trialDays} Tage ohne Zahlungsdaten. plancraft nennt ${w.testphaseTage.wert} Tage ${w.angaben!.testOhne.wert}, danach einen 0-€-Tarif mit eingeschränkten Funktionen.`,
      },
      {
        q: "Kann ich von plancraft zu CraftOS wechseln?",
        a: `Ja. Prüfen Sie die Frist Ihres plancraft-Abos, laut plancraft ${w.kuendigung!.wert}, und übernehmen Sie Kunden, Projekte und Stammdaten per Datei in CraftOS.`,
      },
      {
        q: "Unterstützen plancraft und CraftOS E-Rechnungen?",
        a: "Ja. CraftOS erzeugt XRechnung und ZUGFeRD und liest strukturierte E-Rechnungen im Eingang ein; plancraft beschreibt E-Rechnungen im XRechnung-Format in allen Paketen.",
      },
    ],
  };
};
