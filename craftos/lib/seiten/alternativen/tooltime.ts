/**
 * Seitentexte /vergleich/tooltime-alternative (08-09; 08-UI-SPEC § 3.6 „ToolTime“, D-01–D-03, U3, P4).
 * Nur Texte und Auswahl der Fakten; alle Zahlen per Vorlage aus dem Kontext (CraftOS: lib/site.ts,
 * ToolTime: lib/wettbewerber/tooltime.ts). Jahresabo-Preise gelten laut ToolTime nur im ersten Vertragsjahr
 * (`ersterJahrespreis`): Zellen mit „1. Jahr“, Texte mit „im ersten Vertragsjahr“, spätere Preise nur als
 * „regulär derzeit“ und nie als Zusage. „Weitere Mitarbeitende“ (widersprüchliche Werte) wird nicht verwendet.
 * Tabelle nur mit Funktionen, die CraftOS hat (Inhaber 22.10.2026); den KI-Telefonassistenten nennt ToolTime als
 * Erweiterung, er steht nicht in der Tabelle. Prüfung: lib/seiten/alternativen/index.ts.
 */
import type { Preis } from "@/lib/wettbewerber/types";
import type { Seitenmodul } from "./types";

export const tooltimeSeite: Seitenmodul = (k) => {
  const { w, craftos: c, euroKurz } = k;
  const paket = (name: string): Preis => {
    const p = w.preise.wert.find((x) => x.paket === name);
    if (!p) throw new Error(`ToolTime: Paket ${name} fehlt im Datenmodul.`);
    // U3/P4: Jahresabo-Preise nur mit dem Erstjahr-Zusatz und dem regulären Preis „derzeit“.
    if (!p.ersterJahrespreis || p.regulaerDerzeitCents === undefined)
      throw new Error(`ToolTime: Paket ${name} ohne ersterJahrespreis/regulaerDerzeitCents – Erstjahrespreis nicht belegbar (U3).`);
    return p;
  };
  const solo = paket("Solo");
  const team = paket("Team");
  const max = paket("Max");
  const { teamJeLizenz, datev } = w.zusatzPreise!;
  if (!teamJeLizenz.wert.ersterJahrespreis) throw new Error("ToolTime: Team je Lizenz ohne ersterJahrespreis (U3).");
  const umfang = (p: Preis) => (p.enthalten ?? "").replace(/ Mitarbeiter$/, "");
  const monate = Number.parseInt(w.laufzeit.wert, 10);
  const dreiPreise = (feld: "centsMonat" | "centsJahrJeMonat" | "regulaerDerzeitCents") =>
    `${euroKurz(solo[feld]!)}, ${euroKurz(team[feld]!)} oder ${euroKurz(max[feld]!)}`;
  const teamErstjahr = euroKurz(team.centsJahrJeMonat!);
  const teamRegulaer = euroKurz(team.regulaerDerzeitCents!);
  const datevPreis = euroKurz(datev.wert.centsMonat!);

  return {
    keyword: "ToolTime-Alternative:",
    answer: `CraftOS ist eine ToolTime-Alternative mit Preis pro Person und monatlich kündbarem Abo: Die Voll-Lizenz kostet ${c.vollMonat} netto im Monat. ToolTime rechnet in Paketen für ${umfang(solo)}, ${umfang(team)} oder ${umfang(max)} Mitarbeitende mit ${monate} Monaten Mindestlaufzeit ab.`,
    vertragsname: "ToolTime-Vertrags",
    rows: [
      k.zeile("Abrechnung", "pro Person", "Paket nach Teamgröße", w.preise),
      k.zeile(
        "Preis je Person, monatliche Zahlung",
        `${c.vollMonat} Voll, ${c.appMonat} App`,
        `${euroKurz(teamJeLizenz.wert.centsMonat!)} (Team-Paket)`,
        teamJeLizenz,
      ),
      k.zeile(
        "Preis je Person, Jahresabo je Monat",
        `${c.vollJahrJeMonat} Voll, ${c.appJahrJeMonat} App`,
        `${euroKurz(teamJeLizenz.wert.centsJahrJeMonat!)} (Team, 1. Jahr)`,
        teamJeLizenz,
      ),
      k.laufzeit(),
      k.testphase(),
      k.kriterium("mobileApp", "Mobile-App für iOS und Android", true),
      k.kriterium("plantafel", "Plantafel", "Ja, ohne Paketangabe"),
      k.kriterium("eRechnung", "E-Rechnung"),
      k.kriterium("datev", "DATEV-Export", `Erweiterung, ${datevPreis}/Monat`),
      k.kriterium("gaeb", "GAEB-Schnittstelle"),
    ],
    kosten: {
      answer: `Für fünf Personen zahlen Sie im Jahresabo ${c.beispielJahrJeMonat} netto im Monat bei CraftOS mit einer Voll- und vier App-Lizenzen und ${teamErstjahr} bei ToolTime Team im ersten Vertragsjahr, regulär derzeit ${teamRegulaer}.`,
      facts: [
        { key: "team-erstjahr", value: teamErstjahr, label: "ToolTime Team, 1. Vertragsjahr je Monat", fakt: w.preise },
        { key: "team-monat", value: euroKurz(team.centsMonat!), label: "ToolTime Team, monatliche Zahlung", fakt: w.preise },
      ],
      zusammenstellung: `Team-Paket für ${team.enthalten}, Jahresabo`,
      nichtEnthalten:
        "KI-Verbrauch und Extra-Speicher bei CraftOS; Erweiterungen wie DATEV Rechnungsdatenservice und ToolTime Assistant bei ToolTime",
      zusatz: `Die Jahresabo-Preise gelten laut ToolTime nur im ersten Vertragsjahr; regulär nennt ToolTime derzeit ${teamRegulaer} (Team). Preise späterer Jahre sind nicht zugesagt.`,
    },
    fuerWen: {
      answer:
        "ToolTime passt zu Betrieben, die einen festen Paketpreis je Teamgröße, Lexware Office oder offline sichtbare Einsatzpläne wollen; CraftOS passt zu Betrieben, die pro Person abrechnen und monatlich kündbar bleiben wollen.",
      craftos: ["proPerson", "monatlich", "gaebDatev"],
    },
    umstieg: { laufzeit: `ToolTime nennt ${w.kuendigungsfristTage!.wert} Tage Frist zum Laufzeitende, in Textform.` },
    faq: [
      {
        q: "Was kostet ToolTime pro Monat?",
        a: `ToolTime kostet bei monatlicher Zahlung ${euroKurz(solo.centsMonat!)} (Solo), ${euroKurz(team.centsMonat!)} (Team, ${umfang(team)}) oder ${euroKurz(max.centsMonat!)} (Max, ${umfang(max)}); im Jahresabo im ersten Vertragsjahr ${dreiPreise("centsJahrJeMonat")}, regulär derzeit ${dreiPreise("regulaerDerzeitCents")} pro Monat.`,
      },
      {
        q: "Kann ich CraftOS ohne lange Vertragsbindung nutzen?",
        a: `Ja. Das Monatsabo ist ${c.vertrag.monat}; das Jahresabo kostet rund ${c.jahresrabattProzent} % weniger als zwölf Monatszahlungen und ist ${c.vertrag.jahr}.`,
      },
      {
        q: "Wie lange kann ich ToolTime und CraftOS kostenlos testen?",
        a: `CraftOS testen Sie ${c.trialDays} Tage ohne Zahlungsdaten. ToolTime nennt eine ${w.testphaseTage.wert}-tägige Testversion ${w.angaben!.testOhneZahlung.wert}.`,
      },
      {
        q: "Hat CraftOS eine DATEV-Schnittstelle?",
        a: `Ja. CraftOS erstellt in der Voll-Lizenz einen DATEV-Export für die Steuerberatung; bei ToolTime ist der DATEV Rechnungsdatenservice eine Erweiterung für ${datevPreis} im Monat.`,
      },
    ],
  };
};
