/**
 * Seitentexte /vergleich/hero-alternative (08-09; 08-UI-SPEC § 3.6 „HERO“, D-01–D-03, D-16, U11, P1).
 * Nur Texte und Auswahl der Fakten; alle Zahlen per Vorlage aus dem Kontext (CraftOS: lib/site.ts,
 * HERO: lib/wettbewerber/hero.ts). Die Variante folgt dem Datenbeleg: `heroVariante(w) === "A"` (Screenshot-Beleg
 * beider Umschalterstellungen) → Preise mit Zahlweise; sonst Variante B ohne HERO-Zahlen („laut hero-software.de“).
 * Der Wechsel A/B ändert nur Datenfelder, nicht die Vorlage. E-Rechnung nur „erstellen“ (Import laut HERO noch
 * nicht im Angebot, daher nicht erwähnt). Tabelle nur mit Funktionen, die CraftOS hat (Inhaber 22.10.2026); die
 * KI-Telefonie nennt das Panel „Wann HERO passt“. Prüfung: lib/seiten/alternativen/index.ts.
 */
import { heroPreise, heroVariante, monatAusJahr } from "@/lib/wettbewerber";
import type { Preis } from "@/lib/wettbewerber/types";
import type { AlternativeZeile, Seitenmodul, WettbewerberKennzahl } from "./types";

export const heroSeite: Seitenmodul = (k) => {
  const { w, craftos: c, euroKurz } = k;
  const variante = heroVariante(w);
  const preise = heroPreise(w);
  const paket = (name: string): Preis => {
    const p = preise.find((x) => x.paket === name);
    if (!p) throw new Error(`HERO: Paket ${name} fehlt im Datenmodul (Variante A).`);
    return p;
  };

  const kopfCraftos = `CraftOS ist eine HERO-Alternative mit Preis pro Person: Die Voll-Lizenz mit Web-App, Mobile-App und Plantafel kostet ${c.vollMonat} netto im Monat.`;
  const laufzeit = k.zeile("Grundlaufzeit", "1 Monat", `${w.laufzeit.wert} laut AGB`, w.laufzeit);
  const weitere = [
    laufzeit,
    k.testphase(),
    k.kriterium("mobileApp", "Mobile-App für iOS und Android", true),
    k.kriterium("plantafel", "Plantafel", "Ja, ab Select"),
    k.kriterium("eRechnung", "E-Rechnung erstellen", "ZUGFeRD und XRechnung"),
    k.kriterium("zeiterfassung", "Zeiterfassung", true),
    k.kriterium("lager", "Lager"),
  ];
  const gemeinsam = {
    keyword: "HERO-Software",
    vertragsname: "HERO-Vertrags",
    fuerWen: {
      answer:
        "HERO passt zu Betrieben, die KI-Telefonie, Online-Zahlungen oder einen API-Zugang im selben System nutzen möchten; CraftOS passt zu Betrieben, die pro Person abrechnen und monatlich kündbar bleiben wollen.",
      craftos: ["proPerson", "monatlich", "gaebDatev"] as const,
    },
    umstieg: { laufzeit: "HERO nennt in den AGB einen Monat Frist zum Ende der Laufzeit." },
  };
  const faqWeitere = [
    {
      q: "Welche Laufzeit hat HERO?",
      a: "Laut HERO-AGB beträgt die Grundlaufzeit zwölf Monate, soweit in der Bestellung nichts anderes vereinbart ist, mit einem Monat Kündigungsfrist und automatischer Verlängerung.",
    },
    {
      q: "Wie lange kann ich HERO und CraftOS kostenlos testen?",
      a: `CraftOS testen Sie ${c.trialDays} Tage ohne Zahlungsdaten. HERO nennt eine Testphase von ${w.testphaseTage.wert} Tagen.`,
    },
    {
      q: "Welche Lizenz brauchen Mitarbeitende auf der Baustelle bei CraftOS?",
      a: `Die App-Lizenz für ${c.appMonat} netto im Monat oder ${c.appJahr} im Jahr mit Zeiten, Einsätzen, Aufmaß, Fotos, Baudokumentation und Urlaub in der Mobile-App.`,
    },
  ];
  const nichtEnthalten = "KI-Verbrauch und Extra-Speicher bei CraftOS";

  if (variante === "B") {
    const rows: AlternativeZeile[] = [
      k.zeile("Preise je Plan und Zahlweise", `${c.vollJahrJeMonat} (Voll, jährlich)`, "laut hero-software.de", w.preise),
      ...weitere,
    ];
    return {
      ...gemeinsam,
      fuerWen: { ...gemeinsam.fuerWen, craftos: [...gemeinsam.fuerWen.craftos] },
      answer: `${kopfCraftos} HERO nennt Preise je Plan und Zahlweise auf hero-software.de/preise; laut AGB gilt eine Grundlaufzeit von zwölf Monaten, soweit nicht anders vereinbart.`,
      rows,
      kosten: {
        answer: `HERO nennt Preise je Plan und Zahlweise auf hero-software.de/preise; bei CraftOS zahlen eine Person im Büro und vier auf der Baustelle im Jahresabo ${c.beispielJahrJeMonat} netto im Monat.`,
        facts: [],
        craftosLizenzen: true,
        zusammenstellung: "Preise je Plan und Zahlweise laut hero-software.de/preise",
        nichtEnthalten,
      },
      faq: [
        {
          q: "Was kostet HERO pro Monat?",
          a: "HERO nennt Preise je Plan (Select, HERO OS, HERO OS Plus) und Zahlweise auf hero-software.de/preise, jeweils zuzüglich Umsatzsteuer und mit einer Standard-Lizenz.",
        },
        ...faqWeitere,
      ],
    };
  }

  // Variante A: Preise laut Screenshot-Beleg, „ab“ wie auf der Preisseite (P3).
  const select = paket("HERO Select");
  const os = paket("HERO OS");
  const osPlus = paket("HERO OS Plus");
  const appFakt = w.zusatzPreise?.appLizenz;
  if (!appFakt) throw new Error("HERO: App-Lizenz fehlt im Datenmodul (Variante A).");
  const appLizenz = appFakt.wert;
  const jahr = euroKurz(monatAusJahr([select, appLizenz, appLizenz, appLizenz, appLizenz].map((p) => p.centsJahrJeMonat! * 12)));
  const monat = euroKurz(select.centsMonat! + 4 * appLizenz.centsMonat!);
  const kennzahlen: WettbewerberKennzahl[] = [
    { key: "select-5p-jahr", value: `ab ${jahr}`, label: "HERO Select, 5 Personen, jährlich", fakt: w.preise },
    { key: "select-5p-monat", value: `ab ${monat}`, label: "HERO Select, 5 Personen, monatlich", fakt: w.preise },
  ];

  return {
    ...gemeinsam,
    fuerWen: { ...gemeinsam.fuerWen, craftos: [...gemeinsam.fuerWen.craftos] },
    answer: `${kopfCraftos} HERO Select kostet ab ${euroKurz(select.centsJahrJeMonat!)} netto im Monat bei jährlicher und ab ${euroKurz(select.centsMonat!)} bei monatlicher Zahlweise, jeweils mit einer Standard-Lizenz.`,
    rows: [
      k.zeile("Bürozugang, monatliche Zahlung", c.vollMonat, `ab ${euroKurz(select.centsMonat!)} (Select)`, w.preise),
      k.zeile("Bürozugang, jährliche Zahlung je Monat", c.vollJahrJeMonat, `ab ${euroKurz(select.centsJahrJeMonat!)} (Select)`, w.preise),
      k.zeile(
        "Weitere mobile Person, jährlich je Monat",
        `${c.appJahrJeMonat} (App-Lizenz)`,
        `${euroKurz(appLizenz.centsJahrJeMonat!)} (App-Lizenz)`,
        appFakt,
      ),
      ...weitere,
    ],
    kosten: {
      answer: `Für eine Person im Büro und vier auf der Baustelle zahlen Sie bei jährlicher Zahlweise ${c.beispielJahrJeMonat} netto im Monat bei CraftOS und ab ${jahr} bei HERO Select; die Pläne unterscheiden sich im Funktionsumfang.`,
      facts: kennzahlen,
      zusammenstellung: "HERO Select mit 1 Standard-Lizenz + 4 App-Lizenzen, „ab“-Preise laut Preisseite",
      nichtEnthalten,
    },
    faq: [
      {
        q: "Was kostet HERO pro Monat?",
        a: `HERO Select kostet ab ${euroKurz(select.centsJahrJeMonat!)} netto im Monat bei jährlicher und ab ${euroKurz(select.centsMonat!)} bei monatlicher Zahlweise, HERO OS ab ${euroKurz(os.centsJahrJeMonat!)} bzw. ${euroKurz(os.centsMonat!)}, HERO OS Plus ab ${euroKurz(osPlus.centsJahrJeMonat!)} bzw. ${euroKurz(osPlus.centsMonat!)}, jeweils mit einer Standard-Lizenz.`,
      },
      ...faqWeitere,
    ],
  };
};
