/**
 * Seitentexte /vergleich/craftnote-alternative (08-08; 08-UI-SPEC § 3.6 „Craftnote“, D-01–D-03).
 * Nur Texte und Auswahl der Fakten; alle Zahlen per Vorlage aus dem Kontext (CraftOS: lib/site.ts,
 * Craftnote: lib/wettbewerber/craftnote.ts). Rechenbeispiel = 1 Büro Plus + 4 Baustelle bei jährlicher Abrechnung,
 * einmal mit dem genannten Preis und einmal mit dem Statt-Preis im Wortlaut der Preisseite (U3).
 * Tabelle und FAQ nur mit Funktionen, die CraftOS hat (Inhaber 22.10.2026); die Fahrzeugortung nennt das Panel
 * „Wann Craftnote passt“. Prüfung: lib/seiten/alternativen/index.ts.
 */
import { monatAusJahr } from "@/lib/wettbewerber";
import type { Preis } from "@/lib/wettbewerber/types";
import type { Seitenmodul } from "./types";

export const craftnoteSeite: Seitenmodul = (k) => {
  const { w, craftos: c, euro } = k;
  const paket = (name: string): Preis => {
    const p = w.preise.wert.find((x) => x.paket === name);
    if (!p) throw new Error(`Craftnote: Paket ${name} fehlt im Datenmodul.`);
    return p;
  };
  const bueroPlus = paket("Büro Plus");
  const buero = paket("Büro");
  const baustelle = paket("Baustelle");
  const fahrzeug = w.zusatzPreise!.fahrzeugModul;
  const vierBaustelle = Array<number>(4).fill(baustelle.centsJahrJeMonat!);
  const mit = euro(monatAusJahr([bueroPlus.centsJahrJeMonat!, ...vierBaustelle].map((x) => x * 12)));
  const mitStatt = euro(monatAusJahr([bueroPlus.stattCents!, ...vierBaustelle].map((x) => x * 12)));
  const bp = euro(bueroPlus.centsJahrJeMonat!);
  const bpStatt = euro(bueroPlus.stattCents!);

  return {
    keyword: "Craftnote-Alternative",
    answer: `CraftOS ist eine Craftnote-Alternative mit Angeboten, Rechnungen, Plantafel und Mobile-App in der Voll-Lizenz für ${c.vollMonat} netto pro Person und Monat. Craftnote Büro Plus kostet laut Preisseite ${bp} statt ${bpStatt} netto pro Nutzer und Monat bei jährlicher Abrechnung.`,
    vertragsname: "Craftnote-Vertrags",
    rows: [
      k.zeile("Bürozugang (Büro Plus), Jahresabo je Monat", c.vollJahrJeMonat, `${bp} statt ${bpStatt}`, w.preise),
      k.zeile(
        "Weitere mobile Person, Jahresabo je Monat",
        `${c.appJahrJeMonat} (App-Lizenz)`,
        `${euro(baustelle.centsJahrJeMonat!)} (Baustelle)`,
        w.preise,
      ),
      k.laufzeit(),
      k.testphase(),
      k.kriterium("mobileApp", "Mobile-App für iOS und Android", true),
      k.kriterium("plantafel", "Plantafel", "Ja, ohne Preisangabe"),
      k.kriterium("eRechnung", "E-Rechnung", `„${w.kriterien.eRechnung!.wert}“`),
      k.kriterium("datev", "DATEV-Export"),
      k.kriterium("zeiterfassung", "Zeiterfassung"),
    ],
    kosten: {
      answer: `Für eine Person im Büro und vier auf der Baustelle zahlen Sie im Jahresabo ${c.beispielJahrJeMonat} netto im Monat bei CraftOS und ${mit} bei Craftnote mit ${bp} für Büro Plus, mit ${bpStatt} gerechnet ${mitStatt}; die Pakete unterscheiden sich im Funktionsumfang.`,
      facts: [
        { key: "5p-jahr", value: mit, label: `Craftnote, 5 Personen, mit ${bp}`, fakt: w.preise },
        { key: "5p-jahr-statt", value: mitStatt, label: `Craftnote, 5 Personen, mit ${bpStatt}`, fakt: w.preise },
      ],
      zusammenstellung: "1 Büro Plus + 4 Baustelle, jährliche Abrechnung",
      nichtEnthalten: `KI-Verbrauch und Extra-Speicher bei CraftOS; Fahrzeug-Modul (${euro(fahrzeug.wert.centsJahrJeMonat!)} je Tracker und Monat im ersten Jahr, jährliche Abrechnung) und Formularpakete bei Craftnote`,
    },
    fuerWen: {
      answer:
        "Craftnote passt zu Betrieben, die Fahrzeuge orten oder länger testen möchten; CraftOS passt zu Betrieben, die monatlich kündbar bleiben und Mitarbeitende mit einer App-Lizenz ausstatten wollen.",
      craftos: ["proPerson", "monatlich", "gaebDatev"],
    },
    umstieg: { laufzeit: "Craftnote nennt drei Monate Frist vor Ende des Vertragsjahres." },
    faq: [
      {
        q: "Was kostet Craftnote pro Monat?",
        a: `Craftnote kostet pro Nutzer und Monat ${euro(buero.centsJahrJeMonat!)} (Büro), ${bp} statt ${bpStatt} (Büro Plus) und ${euro(baustelle.centsJahrJeMonat!)} (Baustelle), jeweils netto bei jährlicher Abrechnung; ${w.angaben!.mindestpaket.wert} ist nötig.`,
      },
      {
        q: "Kann ich CraftOS monatlich kündigen?",
        a: `Ja. Das Monatsabo ist ${c.vertrag.monat}; das Jahresabo kostet rund ${c.jahresrabattProzent} % weniger als zwölf Monatszahlungen und ist ${c.vertrag.jahr}.`,
      },
      {
        q: "Wie lange kann ich Craftnote und CraftOS kostenlos testen?",
        a: `CraftOS testen Sie ${c.trialDays} Tage ohne Zahlungsdaten. Craftnote nennt ${w.testphaseTage.wert} Tage mit dem Funktionsumfang von Büro Plus, ohne hinterlegte Zahlungsmethode.`,
      },
      {
        q: "Welche Lizenzen braucht mein Team bei CraftOS?",
        a: `Büro und Bauleitung arbeiten mit der Voll-Lizenz, Mitarbeitende auf der Baustelle mit der App-Lizenz für ${c.appMonat} netto im Monat.`,
      },
    ],
  };
};
