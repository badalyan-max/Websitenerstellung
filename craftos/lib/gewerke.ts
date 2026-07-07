// Gewerke-Landingpages: 5 Gewerke mit fertigen Leistungsvorlagen in der App
// (Elektro, SHK, Maler, Schreiner/Tischler, Allrounder) + erweitertes SEO-Set.
// hatVorlagen = true → App liefert vorgefertigte Leistungs-/Positionsvorlagen.

export interface Gewerk {
  slug: string
  name: string
  /** Kurzform für Kacheln/Chips */
  kurz: string
  hatVorlagen: boolean
  heroTitle: string
  heroIntro: string
  painPoints: { titel: string; text: string }[]
  /** Welche Funktions-Slugs für dieses Gewerk besonders relevant sind */
  funktionen: string[]
  faq: { q: string; a: string }[]
  seoTitle: string
  seoDescription: string
}

export const gewerke: Gewerk[] = [
  {
    slug: 'elektriker',
    name: 'Elektriker & Elektrotechnik',
    kurz: 'Elektro',
    hatVorlagen: true,
    heroTitle: 'Handwerkersoftware für Elektriker',
    heroIntro:
      'Vom Zählerschrank bis zur Wallbox: Angebote mit fertigen Elektro-Vorlagen kalkulieren, Einsätze planen, Stunden mobil erfassen und Rechnungen inklusive E-Rechnung stellen – alles in CraftOS.',
    painPoints: [
      {
        titel: 'Angebote dauern Abende',
        text: 'Fertige Leistungsvorlagen für Elektroarbeiten – von der Steckdose bis zur Unterverteilung – machen aus Stunden Minuten.',
      },
      {
        titel: 'Wer ist morgen auf welcher Baustelle?',
        text: 'Die Plantafel zeigt jeden Monteur und jeden Einsatz. Änderungen landen sofort als Push auf dem Handy.',
      },
      {
        titel: 'Material verschwindet im Bus',
        text: 'Lager & Materialwirtschaft bucht Material auftragsgenau – auch das Fahrzeuglager – und speist die Nachkalkulation.',
      },
    ],
    funktionen: ['angebote', 'plantafel', 'zeiterfassung', 'lager', 'rechnungen'],
    faq: [
      {
        q: 'Gibt es fertige Vorlagen für Elektroarbeiten?',
        a: 'Ja. CraftOS bringt Leistungsvorlagen für Elektroinstallationen mit, die Sie direkt ins Angebot übernehmen und frei anpassen können.',
      },
      {
        q: 'Können meine Monteure Zeiten mobil erfassen?',
        a: 'Ja. Mit der App-Lizenz erfassen Monteure Zeiten am Handy – auf Wunsch per Spracheingabe – und sehen ihre zugewiesenen Einsätze.',
      },
    ],
    seoTitle: 'Elektriker Software – Angebote, Plantafel & Zeiterfassung',
    seoDescription:
      'CraftOS für Elektrobetriebe: Angebote mit Elektro-Vorlagen, Plantafel, mobile Zeiterfassung, Lager & E-Rechnung. 14 Tage kostenlos testen.',
  },
  {
    slug: 'shk',
    name: 'Sanitär, Heizung, Klima (SHK)',
    kurz: 'SHK',
    hatVorlagen: true,
    heroTitle: 'Handwerkersoftware für SHK-Betriebe',
    heroIntro:
      'Heizungstausch, Badsanierung, Wartung: CraftOS bündelt Angebote, Abschlagsrechnungen, Einsatzplanung und Materialwirtschaft für Sanitär-, Heizungs- und Klimabetriebe.',
    painPoints: [
      {
        titel: 'Badsanierung = 12 Abschläge',
        text: 'Abschlags- und Schlussrechnungen mit automatischer Verrechnung – CraftOS behält jeden Abschlag im Blick.',
      },
      {
        titel: 'Notdienst sprengt die Planung',
        text: 'Einsätze in der Plantafel per Drag & Drop umplanen – das Team sieht Änderungen sofort in der App.',
      },
      {
        titel: 'Materialkosten fressen die Marge',
        text: 'Warenausgänge sind auftragsgebunden. Die Nachkalkulation zeigt live, ob die Baustelle noch verdient.',
      },
    ],
    funktionen: ['rechnungen', 'plantafel', 'lager', 'angebote', 'baudokumentation'],
    faq: [
      {
        q: 'Unterstützt CraftOS Abschlagsrechnungen?',
        a: 'Ja. Abschlags-, Schluss-, Pauschal- und Stornorechnungen inklusive automatischer Abschlagsverrechnung sind Standard in CraftOS.',
      },
      {
        q: 'Gibt es Vorlagen für Sanitär- und Heizungsarbeiten?',
        a: 'Ja. SHK-Leistungsvorlagen (z. B. Sanitärmontage, Heizkörper) sind enthalten und lassen sich frei erweitern.',
      },
    ],
    seoTitle: 'SHK Software – Sanitär, Heizung, Klima digital verwalten',
    seoDescription:
      'CraftOS für SHK-Betriebe: Angebote, Abschlagsrechnungen, Plantafel, Lager & mobile Baudokumentation. 14 Tage kostenlos testen.',
  },
  {
    slug: 'maler',
    name: 'Maler & Lackierer',
    kurz: 'Maler',
    hatVorlagen: true,
    heroTitle: 'Handwerkersoftware für Maler & Lackierer',
    heroIntro:
      'Aufmaß vor Ort, Angebot mit Maler-Vorlagen, Baustellenfotos in der digitalen Bauakte: CraftOS macht aus Flächen Zahlen – und aus Zahlen bezahlte Rechnungen.',
    painPoints: [
      {
        titel: 'Flächen-Aufmaß auf Papier',
        text: 'Aufmaß mit Abzügen direkt in der App erfassen – die Massen fließen automatisch ins Angebot.',
      },
      {
        titel: '„So sah das vorher aus!"',
        text: 'Fotos vom Zustand landen mit Datum und GPS in der Bauakte. Diskussionen über Altschäden erledigen sich.',
      },
      {
        titel: 'Kleine Aufträge, viel Verwaltung',
        text: 'Vom Angebot zur Rechnung in einem Fluss – ohne Doppel-Eingabe, mit E-Rechnung und GiroCode zum Scannen.',
      },
    ],
    funktionen: ['angebote', 'baudokumentation', 'rechnungen', 'zeiterfassung'],
    faq: [
      {
        q: 'Kann ich das Aufmaß mobil erfassen?',
        a: 'Ja. Räume und Flächen inklusive Abzügen erfassen Sie in der App – die Werte werden ins Angebot übernommen.',
      },
      {
        q: 'Gibt es Maler-Leistungsvorlagen?',
        a: 'Ja. Vorlagen für typische Malerarbeiten sind enthalten und können mit eigenen Preisen hinterlegt werden.',
      },
    ],
    seoTitle: 'Maler Software – Aufmaß, Angebote & Baudokumentation',
    seoDescription:
      'CraftOS für Maler & Lackierer: mobiles Aufmaß, Angebote mit Vorlagen, Fotodokumentation & Rechnungen. 14 Tage kostenlos testen.',
  },
  {
    slug: 'tischler-schreiner',
    name: 'Tischler & Schreiner',
    kurz: 'Tischler',
    hatVorlagen: true,
    heroTitle: 'Handwerkersoftware für Tischler & Schreiner',
    heroIntro:
      'Maßarbeit verdient präzise Kalkulation: Materialkosten, Lohnanteile und Maschinenzeiten sauber kalkulieren, Projekte dokumentieren und pünktlich abrechnen – mit CraftOS.',
    painPoints: [
      {
        titel: 'Kalkulation nach Bauchgefühl',
        text: 'Tiefenkalkulation mit Material-, Lohn- und Gemeinkostenzuschlägen – inklusive Reverse-Pricing vom Zielpreis rückwärts.',
      },
      {
        titel: 'Werkstatt und Montage laufen aneinander vorbei',
        text: 'Plantafel für Werkstatt- und Montagetermine – jeder weiß, was wann gefertigt und montiert wird.',
      },
      {
        titel: 'Holz, Beschläge, Platten – wo ist was?',
        text: 'Lagerbestände mit Lagerplätzen und Seriennummern führen, Entnahmen auftragsgenau buchen.',
      },
    ],
    funktionen: ['angebote', 'nachkalkulation', 'plantafel', 'lager'],
    faq: [
      {
        q: 'Kann CraftOS vom Zielpreis rückwärts kalkulieren?',
        a: 'Ja. Mit Reverse-Pricing geben Sie den Zielpreis vor – CraftOS verteilt ihn nachvollziehbar auf die Positionen.',
      },
      {
        q: 'Sehe ich, ob ein Auftrag am Ende Gewinn gemacht hat?',
        a: 'Ja. Die Nachkalkulation stellt Soll und Ist gegenüber: Zeiten, Material, Eingangsrechnungen und Lohnkosten pro Projekt.',
      },
    ],
    seoTitle: 'Tischler & Schreiner Software – Kalkulation & Projekte',
    seoDescription:
      'CraftOS für Tischlereien: präzise Kalkulation, Reverse-Pricing, Plantafel, Lager & Nachkalkulation. 14 Tage kostenlos testen.',
  },
  {
    slug: 'dachdecker',
    name: 'Dachdecker',
    kurz: 'Dach',
    hatVorlagen: false,
    heroTitle: 'Handwerkersoftware für Dachdecker',
    heroIntro:
      'Wetterfenster nutzen, Kolonnen planen, Baufortschritt dokumentieren: CraftOS bringt Angebot, Plantafel, Baustellenfotos und Abrechnung für Dachdeckerbetriebe zusammen.',
    painPoints: [
      {
        titel: 'Wetter wirft die Planung um',
        text: 'Einsätze in der Plantafel per Drag & Drop verschieben – die Kolonne bekommt die Änderung sofort aufs Handy.',
      },
      {
        titel: 'Baufortschritt beweisen',
        text: 'Bautagesberichte mit Fotos, GPS und Unterschrift – rechtssicher dokumentiert, direkt von der Baustelle.',
      },
      {
        titel: 'Abschläge nach Bautenstand',
        text: 'Abschlagsrechnungen je Bauabschnitt stellen und in der Schlussrechnung automatisch verrechnen.',
      },
    ],
    funktionen: ['plantafel', 'baudokumentation', 'rechnungen', 'zeiterfassung'],
    faq: [
      {
        q: 'Funktioniert die App auch ohne Netz auf dem Dach?',
        a: 'Ja. Die CraftOS-App arbeitet offline weiter und synchronisiert automatisch, sobald wieder Verbindung besteht.',
      },
      {
        q: 'Kann ich Bautagesberichte mit Fotos führen?',
        a: 'Ja. Berichte mit Fotos, GPS-Position und digitaler Unterschrift entstehen direkt am Smartphone.',
      },
    ],
    seoTitle: 'Dachdecker Software – Plantafel, Baudoku & Abrechnung',
    seoDescription:
      'CraftOS für Dachdecker: flexible Einsatzplanung, Bautagesberichte mit Fotos, Abschlagsrechnungen & Zeiterfassung. 14 Tage kostenlos testen.',
  },
  {
    slug: 'fliesenleger',
    name: 'Fliesenleger',
    kurz: 'Fliesen',
    hatVorlagen: false,
    heroTitle: 'Handwerkersoftware für Fliesenleger',
    heroIntro:
      'Quadratmeter sauber aufmessen, Material kalkulieren, Bäder dokumentieren: CraftOS digitalisiert den Weg vom Aufmaß bis zur bezahlten Rechnung.',
    painPoints: [
      {
        titel: 'Aufmaß mit Zettel und Zollstock',
        text: 'Flächen-Aufmaß mit Abzügen in der App – die Massen wandern automatisch in Angebot und Rechnung.',
      },
      {
        titel: 'Verschnitt und Material im Blindflug',
        text: 'Materialverbrauch auftragsgenau buchen – die Nachkalkulation zeigt, was das Bad wirklich gekostet hat.',
      },
      {
        titel: 'Zahlung lässt auf sich warten',
        text: 'Rechnung mit GiroCode: Kunde scannt, zahlt, fertig. Mahnwesen läuft automatisch in drei Stufen.',
      },
    ],
    funktionen: ['angebote', 'lager', 'rechnungen', 'nachkalkulation'],
    faq: [
      {
        q: 'Kann ich Flächen mit Abzügen aufmessen?',
        a: 'Ja. Das Aufmaß-Modul erfasst Räume und Flächen inklusive Abzügen und übernimmt die Werte in Ihre Dokumente.',
      },
    ],
    seoTitle: 'Fliesenleger Software – Aufmaß, Kalkulation & Rechnung',
    seoDescription:
      'CraftOS für Fliesenleger: mobiles Aufmaß, Materialkalkulation, Nachkalkulation & automatisches Mahnwesen. 14 Tage kostenlos testen.',
  },
  {
    slug: 'zimmerer',
    name: 'Zimmerer & Holzbau',
    kurz: 'Holzbau',
    hatVorlagen: false,
    heroTitle: 'Handwerkersoftware für Zimmerer & Holzbau',
    heroIntro:
      'Abbund, Aufrichtung, Ausbau: CraftOS plant Kolonnen und Krantermine, dokumentiert den Baufortschritt und rechnet Bauvorhaben mit Abschlägen sauber ab.',
    painPoints: [
      {
        titel: 'Großprojekte, viele Beteiligte',
        text: 'Projekte mit digitaler Bauakte: Pläne, Fotos, Berichte und Nachträge an einem Ort – für Büro und Baustelle.',
      },
      {
        titel: 'Nachunternehmer koordinieren',
        text: 'Subunternehmer einladen, Einsätze zuweisen und Leistungen im Blick behalten – direkt in CraftOS.',
      },
      {
        titel: 'Liquidität bei langen Projekten',
        text: 'Abschläge nach Bautenstand plus Cashflow-Vorhersage: Sie sehen früh, wann es eng wird.',
      },
    ],
    funktionen: ['plantafel', 'baudokumentation', 'rechnungen', 'nachkalkulation'],
    faq: [
      {
        q: 'Kann ich Nachunternehmer einbinden?',
        a: 'Ja. Nachunternehmer erhalten eigene Zugänge, bekommen Einsätze zugewiesen und bleiben von internen Daten getrennt.',
      },
    ],
    seoTitle: 'Zimmerer Software – Holzbau-Projekte digital steuern',
    seoDescription:
      'CraftOS für Zimmereien: Projektakte, Nachunternehmer-Verwaltung, Abschlagsrechnungen & Cashflow-Vorhersage. 14 Tage kostenlos testen.',
  },
  {
    slug: 'galabau',
    name: 'Garten- & Landschaftsbau',
    kurz: 'GaLaBau',
    hatVorlagen: false,
    heroTitle: 'Software für Garten- & Landschaftsbau',
    heroIntro:
      'Saisongeschäft, Kolonnen, Maschinen: CraftOS plant Ihre Trupps, erfasst Zeiten und Material auf der Fläche und rechnet Projekte wie Pflegeverträge zuverlässig ab.',
    painPoints: [
      {
        titel: 'Saison-Spitzen planen',
        text: 'Die Plantafel zeigt alle Kolonnen und Baustellen – Saison-Vorhersagen helfen, Engpässe früh zu erkennen.',
      },
      {
        titel: 'Zeiten von draußen',
        text: 'Das Team bucht Stunden mobil – auf Wunsch per Sprache – direkt vom Grundstück, mit GPS-Kontext.',
      },
      {
        titel: 'Pflanzen, Substrat, Geräte',
        text: 'Material und Maschinen auftragsgenau erfassen – die Nachkalkulation zeigt die echte Marge pro Projekt.',
      },
    ],
    funktionen: ['plantafel', 'zeiterfassung', 'lager', 'rechnungen'],
    faq: [
      {
        q: 'Eignet sich CraftOS für wiederkehrende Pflegeaufträge?',
        a: 'Ja. Projekte lassen sich als wiederkehrende Einsätze planen und regelmäßig abrechnen.',
      },
    ],
    seoTitle: 'GaLaBau Software – Kolonnenplanung & Abrechnung',
    seoDescription:
      'CraftOS für Garten- & Landschaftsbau: Plantafel, mobile Zeiterfassung, Material & Nachkalkulation. 14 Tage kostenlos testen.',
  },
  {
    slug: 'trockenbau',
    name: 'Trockenbau & Innenausbau',
    kurz: 'Trockenbau',
    hatVorlagen: false,
    heroTitle: 'Handwerkersoftware für Trockenbau & Innenausbau',
    heroIntro:
      'Viele Gewerke, enge Taktung: CraftOS hält Aufmaß, Kolonnenplanung, Materialfluss und Abrechnung zusammen – vom Ständerwerk bis zur Spachtelung Q3.',
    painPoints: [
      {
        titel: 'Flächen über Flächen',
        text: 'Aufmaß mit Abzügen digital erfassen – Quadratmeter fließen ohne Doppel-Eingabe in Angebot und Abrechnung.',
      },
      {
        titel: 'Takt mit anderen Gewerken',
        text: 'Einsätze pro Bauabschnitt in der Plantafel takten – Verschiebungen sieht das Team sofort in der App.',
      },
      {
        titel: 'Platten und Profile nachbestellen',
        text: 'Bestände im Blick, Entnahmen auftragsgenau – so fehlen weder Platten noch Profile auf der Baustelle.',
      },
    ],
    funktionen: ['angebote', 'plantafel', 'lager', 'zeiterfassung'],
    faq: [
      {
        q: 'Kann ich pro Bauabschnitt abrechnen?',
        a: 'Ja. Abschlagsrechnungen je Abschnitt und die Schlussrechnung mit automatischer Verrechnung sind Standard.',
      },
    ],
    seoTitle: 'Trockenbau Software – Aufmaß, Taktung & Abrechnung',
    seoDescription:
      'CraftOS für Trockenbau & Innenausbau: digitales Aufmaß, Plantafel, Materialwirtschaft & Abschlagsrechnungen. 14 Tage kostenlos testen.',
  },
  {
    slug: 'metallbau',
    name: 'Metallbau & Schlosserei',
    kurz: 'Metallbau',
    hatVorlagen: false,
    heroTitle: 'Handwerkersoftware für Metallbau & Schlosserei',
    heroIntro:
      'Fertigung in der Werkstatt, Montage beim Kunden: CraftOS kalkuliert Material und Lohn, plant beide Welten in einer Plantafel und rechnet inklusive E-Rechnung ab.',
    painPoints: [
      {
        titel: 'Stahlpreise in der Kalkulation',
        text: 'Artikel mit aktuellen Preisen pflegen (auch per DATANORM-Import) und Zuschläge sauber kalkulieren.',
      },
      {
        titel: 'Werkstatt vs. Montage',
        text: 'Fertigungs- und Montagetermine in einer Plantafel – Kollisionen fallen sofort auf.',
      },
      {
        titel: 'Gewerbliche Auftraggeber wollen E-Rechnung',
        text: 'XRechnung auf Knopfdruck – CraftOS erstellt normkonforme E-Rechnungen für öffentliche und gewerbliche Kunden.',
      },
    ],
    funktionen: ['angebote', 'plantafel', 'rechnungen', 'lager'],
    faq: [
      {
        q: 'Kann ich Artikeldaten importieren?',
        a: 'Ja. Artikelkataloge lassen sich importieren (u. a. DATANORM) und in der Kalkulation direkt verwenden.',
      },
    ],
    seoTitle: 'Metallbau Software – Kalkulation, Fertigung & Montage',
    seoDescription:
      'CraftOS für Metallbau & Schlosserei: Kalkulation mit Artikelkatalog, Plantafel, E-Rechnung & Lager. 14 Tage kostenlos testen.',
  },
  {
    slug: 'bauunternehmen',
    name: 'Bauunternehmen & Bauhandwerk',
    kurz: 'Bau',
    hatVorlagen: false,
    heroTitle: 'Software für Bauunternehmen',
    heroIntro:
      'Mehrere Baustellen, Kolonnen und Nachunternehmer: CraftOS gibt Bauunternehmen die Übersicht – von der Kalkulation über Bautagesberichte bis zu §48b und DATEV.',
    painPoints: [
      {
        titel: 'Viele Baustellen, wenig Überblick',
        text: 'Alle Projekte, Einsätze und Kosten in einem System – mit Vorhersagen für Termin und Liquidität.',
      },
      {
        titel: 'Nachweise & Compliance',
        text: 'Bautagesberichte mit Unterschrift, §48b-Freistellungen und GoBD-konforme Ablage – prüfbereit ohne Aktenordner.',
      },
      {
        titel: 'Buchhaltung frisst Zeit',
        text: 'Belegscan-KI liest Eingangsrechnungen, DATEV-Export übergibt sauber kontiert an den Steuerberater.',
      },
    ],
    funktionen: ['baudokumentation', 'nachkalkulation', 'rechnungen', 'plantafel'],
    faq: [
      {
        q: 'Unterstützt CraftOS die Zusammenarbeit mit dem Steuerberater?',
        a: 'Ja. Der DATEV-Export übergibt Buchungsdaten inklusive automatischer Kontierungsvorschläge (SKR03).',
      },
      {
        q: 'Kann ich Nachunternehmer verwalten?',
        a: 'Ja. Nachunternehmer erhalten eigene Zugänge mit klar begrenzten Rechten und zugewiesenen Einsätzen.',
      },
    ],
    seoTitle: 'Bausoftware – Projekte, Baudoku & DATEV für Bauunternehmen',
    seoDescription:
      'CraftOS für Bauunternehmen: Projektsteuerung, Bautagesberichte, Nachunternehmer, DATEV & Vorhersagen. 14 Tage kostenlos testen.',
  },
  {
    slug: 'allrounder',
    name: 'Hausmeister & Allround-Handwerker',
    kurz: 'Allround',
    hatVorlagen: true,
    heroTitle: 'Software für Hausmeisterservice & Allround-Handwerker',
    heroIntro:
      'Viele kleine Aufträge, jeden Tag woanders: CraftOS macht aus Zurufen saubere Aufträge – mit schnellen Angeboten, mobiler Zeiterfassung und Rechnung noch am selben Tag.',
    painPoints: [
      {
        titel: 'Kleinaufträge rutschen durch',
        text: 'Jeder Auftrag wird ein Projekt mit Status – nichts geht mehr zwischen Anruf und Abrechnung verloren.',
      },
      {
        titel: 'Abends Zettel abtippen',
        text: 'Zeiten und Fotos direkt beim Kunden erfassen – die Rechnung ist fertig, bevor Sie zu Hause sind.',
      },
      {
        titel: 'Von der Glühbirne bis zum Umbau',
        text: 'Allround-Leistungsvorlagen decken typische Arbeiten ab – eigene Leistungen ergänzen Sie einmal und nutzen sie immer wieder.',
      },
    ],
    funktionen: ['angebote', 'zeiterfassung', 'rechnungen', 'kundenportal'],
    faq: [
      {
        q: 'Lohnt sich CraftOS auch für Einzelkämpfer?',
        a: 'Ja. Mit einer einzigen Voll-Lizenz haben Solo-Handwerker den vollen Funktionsumfang – vom Angebot bis zur Steuer.',
      },
    ],
    seoTitle: 'Hausmeister & Allround-Handwerker Software',
    seoDescription:
      'CraftOS für Hausmeisterservices: schnelle Angebote, mobile Zeiterfassung, Rechnungen & Kundenportal. 14 Tage kostenlos testen.',
  },
]

export function getGewerk(slug: string): Gewerk | undefined {
  return gewerke.find((g) => g.slug === slug)
}
