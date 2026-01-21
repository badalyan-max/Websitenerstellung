import type { ObjectType } from './types'

/**
 * Kategorie-Mapping für Display-Namen
 */
export const CATEGORY_NAMES: Record<string, string> = {
  wohnen: 'Wohngebäude',
  buero: 'Büro & Gewerbe',
  handel: 'Handel & Einzelhandel',
  gastronomie: 'Gastronomie',
  beherbergung: 'Beherbergung & Tourismus',
  gesundheit: 'Gesundheitswesen',
  bildung: 'Bildung & Betreuung',
  sport: 'Sport & Freizeit',
  oeffentlich: 'Öffentliche Einrichtungen',
  sonstige: 'Sonstige',
}

/**
 * Alle Objektarten mit SEO-optimierten Beschreibungen
 */
export const OBJEKTARTEN: ObjectType[] = [
  // ============================================
  // KATEGORIE: WOHNGEBÄUDE (8)
  // ============================================
  {
    slug: 'treppenhaus',
    name: 'Treppenhaus',
    category: 'wohnen',
    categoryName: 'Wohngebäude',
    icon: '🏢',
    description: 'Professionelle Treppenhausreinigung für saubere Gemeinschaftsflächen. Regelmäßig, gründlich, zuverlässig – für zufriedene Mieter.',
    shortDescription: 'Saubere Treppenhäuser für zufriedene Mieter',
    longDescription: `Saubere Treppenhäuser sind die Visitenkarte jeder Wohnanlage und der erste Eindruck für Besucher. Als erfahrener Gebäudereiniger wissen wir: Ein gepflegtes Treppenhaus steigert nicht nur das Wohlbefinden der Bewohner, sondern auch den Wert Ihrer Immobilie.

Unsere professionelle Treppenhausreinigung umfasst die gründliche Reinigung aller Etagen – von der Eingangstür bis zum Dachgeschoss. Wir reinigen Böden, Geländer, Handläufe, Briefkastenanlagen und Eingangsbereiche mit geeigneten Reinigungsmitteln für jeden Bodenbelag.

Ob Fliesen, Naturstein, Linoleum oder Teppichbelag – unsere geschulten Reinigungskräfte kennen die optimale Behandlung für jedes Material. Wir arbeiten nach einem festen Reinigungsplan, der auf die Bedürfnisse Ihrer Wohnanlage abgestimmt ist.

Hausverwaltungen und Eigentümergemeinschaften schätzen unsere Zuverlässigkeit: Dokumentierte Reinigungsnachweise, feste Ansprechpartner und flexible Reinigungszeiten gehören zu unserem Service.`,
    challenges: [
      'Hohe Frequentierung durch Bewohner und Besucher',
      'Schmutz von außen wird ständig hereingetragen',
      'Unterschiedliche Bodenbeläge erfordern spezielle Pflege',
      'Geländer und Handläufe als Hygiene-Hotspots',
      'Briefkastenanlagen und Klingelschilder verstauben',
      'Spinnweben in Ecken und an Lampen',
    ],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung'],
    benefits: [
      'Fester Reinigungsplan für Verlässlichkeit',
      'Geschultes Stammpersonal',
      'Dokumentierte Reinigungsnachweise',
      'Direkte Kommunikation mit Hausverwaltung',
      'Faire Pauschalpreise ohne versteckte Kosten',
    ],
    faqs: [
      {
        question: 'Wie oft sollte ein Treppenhaus gereinigt werden?',
        answer: 'Bei normaler Nutzung empfehlen wir 1-2x wöchentlich. Bei hoher Frequentierung, vielen Parteien oder nach Renovierungen kann auch eine häufigere Reinigung sinnvoll sein.',
      },
      {
        question: 'Wann wird das Treppenhaus gereinigt?',
        answer: 'Wir reinigen zu Zeiten mit geringer Frequentierung – typischerweise vormittags zwischen 9-12 Uhr. Die genauen Zeiten stimmen wir mit Ihrer Hausverwaltung ab.',
      },
      {
        question: 'Was kostet die Treppenhausreinigung?',
        answer: 'Die Kosten hängen von Größe, Etagenzahl und Reinigungsintervall ab. Fordern Sie ein unverbindliches Angebot an – wir besichtigen Ihr Objekt kostenlos.',
      },
    ],
  },
  {
    slug: 'wohnanlage',
    name: 'Wohnanlage',
    category: 'wohnen',
    categoryName: 'Wohngebäude',
    icon: '🏘️',
    description: 'Komplette Gebäudereinigung für Wohnanlagen. Treppenhäuser, Außenanlagen und Gemeinschaftsräume aus einer Hand.',
    shortDescription: 'Rundum-Service für Ihre Wohnanlage',
    longDescription: `Wohnanlagen mit mehreren Gebäuden, Außenanlagen und Gemeinschaftseinrichtungen erfordern ein durchdachtes Reinigungskonzept. Als erfahrener Partner für Hausverwaltungen und WEGs bieten wir Ihnen alle Reinigungsleistungen aus einer Hand.

Von der regelmäßigen Treppenhausreinigung über die Pflege von Gemeinschaftsräumen wie Waschküchen, Fahrradkellern und Müllhäusern bis zur Außenanlagenpflege – wir übernehmen die komplette Gebäudebetreuung Ihrer Wohnanlage.

Unser Vorteil: Ein Ansprechpartner für alle Belange, abgestimmte Reinigungspläne und transparente Kosten. Wir dokumentieren alle Leistungen und stehen in regelmäßigem Austausch mit Ihrer Hausverwaltung.

Saisonale Zusatzleistungen wie Winterdienst, Laubbeseitigung und Grünanlagenpflege runden unser Angebot ab. So bleibt Ihre Wohnanlage das ganze Jahr über gepflegt und einladend.`,
    challenges: [
      'Mehrere Gebäude mit unterschiedlichen Anforderungen',
      'Koordination verschiedener Reinigungsbereiche',
      'Außenanlagen benötigen saisonale Pflege',
      'Gemeinschaftsräume werden intensiv genutzt',
      'Müllhäuser erfordern regelmäßige Grundreinigung',
      'Kommunikation mit vielen Mietparteien',
    ],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung', 'gruenanlagenpflege', 'winterdienst'],
    benefits: [
      'Alle Leistungen aus einer Hand',
      'Ein Ansprechpartner für die gesamte Anlage',
      'Abgestimmte Reinigungspläne',
      'Transparente Kostenkalkulation',
      'Saisonale Zusatzleistungen verfügbar',
    ],
    faqs: [
      {
        question: 'Können Sie unsere gesamte Wohnanlage betreuen?',
        answer: 'Ja, wir übernehmen die komplette Gebäudebetreuung – von Treppenhäusern über Gemeinschaftsräume bis zu Außenanlagen. Alles aus einer Hand.',
      },
      {
        question: 'Wie erfolgt die Abrechnung?',
        answer: 'Wir erstellen ein transparentes Pauschalangebot für Ihre gesamte Anlage. Auf Wunsch schlüsseln wir die Kosten nach Gebäuden oder Leistungen auf.',
      },
    ],
  },
  {
    slug: 'eigentuemergemeinschaft',
    name: 'Eigentümergemeinschaft (WEG)',
    category: 'wohnen',
    categoryName: 'Wohngebäude',
    icon: '🏛️',
    description: 'Gebäudereinigung für WEGs. Zuverlässiger Service, faire Preise und direkte Kommunikation mit Ihrer Hausverwaltung.',
    shortDescription: 'Zuverlässiger Partner für Ihre WEG',
    longDescription: `Eigentümergemeinschaften stellen besondere Anforderungen an ihren Reinigungsdienstleister: Transparente Kosten für die Abrechnung, zuverlässiger Service ohne Beschwerden und professionelle Kommunikation mit der Hausverwaltung.

Als erfahrener Partner für WEGs kennen wir diese Anforderungen. Wir bieten klare Leistungsverzeichnisse, dokumentierte Reinigungsnachweise und feste Ansprechpartner. Unsere Preise sind fair kalkuliert und bleiben über die Vertragslaufzeit stabil.

Die Qualitätskontrolle erfolgt regelmäßig durch unsere Objektleitung. Bei Reklamationen reagieren wir schnell und unbürokratisch – Ihre Hausverwaltung hat immer einen direkten Draht zu uns.

Ob kleine WEG mit wenigen Einheiten oder große Anlage mit mehreren Häusern – wir passen unser Angebot an Ihre Bedürfnisse an und wachsen bei Bedarf mit Ihnen mit.`,
    challenges: [
      'Verschiedene Eigentümer mit unterschiedlichen Erwartungen',
      'Kosten müssen transparent und nachvollziehbar sein',
      'Beschwerdemanagement bei Qualitätsmängeln',
      'Abstimmung mit wechselnden Hausverwaltungen',
      'Eigentümerversammlungen erfordern Rechenschaft',
    ],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung', 'winterdienst'],
    benefits: [
      'Transparente Kostenstruktur für WEG-Abrechnung',
      'Dokumentierte Leistungsnachweise',
      'Fester Ansprechpartner für Hausverwaltung',
      'Schnelle Reaktion bei Reklamationen',
      'Stabile Preise über Vertragslaufzeit',
    ],
    faqs: [
      {
        question: 'Erstellen Sie Angebote für Eigentümerversammlungen?',
        answer: 'Ja, wir erstellen detaillierte Angebote mit Leistungsverzeichnis, die Sie Ihrer Eigentümerversammlung vorlegen können.',
      },
      {
        question: 'Wie läuft die Zusammenarbeit mit der Hausverwaltung?',
        answer: 'Ihre Hausverwaltung erhält einen festen Ansprechpartner. Wir stimmen Reinigungspläne ab, dokumentieren Leistungen und sind bei Fragen schnell erreichbar.',
      },
    ],
  },
  {
    slug: 'mehrfamilienhaus',
    name: 'Mehrfamilienhaus',
    category: 'wohnen',
    categoryName: 'Wohngebäude',
    icon: '🏠',
    description: 'Professionelle Reinigung für Mehrfamilienhäuser. Treppenhaus, Keller und Außenbereich – regelmäßig und zuverlässig.',
    shortDescription: 'Sauberes Mehrfamilienhaus vom Keller bis zum Dach',
    longDescription: `Ein gepflegtes Mehrfamilienhaus schafft Wohnqualität für alle Bewohner. Unsere Reinigungsleistungen decken alle Gemeinschaftsflächen ab – vom Eingangsbereich über das Treppenhaus bis zum Keller.

Wir reinigen regelmäßig nach Ihrem Wunschintervall: Böden werden gewischt, Geländer abgewischt, Briefkästen gesäubert und Spinnweben entfernt. Auch Kellerflure, Waschküchen und Fahrradräume gehören zu unserem Leistungsumfang.

Für private Vermieter und kleine Hausverwaltungen bieten wir unkomplizierte Zusammenarbeit: Ein Anruf genügt, und wir kümmern uns um den Rest. Keine komplizierten Verträge, keine versteckten Kosten.

Bei Mieterwechsel übernehmen wir auf Wunsch auch Wohnungsreinigungen oder Grundreinigungen der Gemeinschaftsflächen.`,
    challenges: [
      'Verschiedene Mietparteien mit unterschiedlicher Nutzung',
      'Kellerflure und Nebenräume werden oft vernachlässigt',
      'Eingangsbereich muss repräsentativ sein',
      'Mülltonnenstellplätze verschmutzen schnell',
    ],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: [
      'Unkomplizierte Zusammenarbeit',
      'Flexible Reinigungsintervalle',
      'Alle Gemeinschaftsflächen inklusive',
      'Zusatzleistungen bei Bedarf buchbar',
    ],
    faqs: [
      {
        question: 'Reinigen Sie auch den Keller?',
        answer: 'Ja, Kellerflure, Waschküchen und andere Gemeinschaftsräume im Keller gehören zu unserem Standard-Leistungsumfang.',
      },
      {
        question: 'Bieten Sie auch Wohnungsreinigung an?',
        answer: 'Ja, bei Mieterwechsel oder auf Wunsch reinigen wir auch einzelne Wohnungen. Sprechen Sie uns an.',
      },
    ],
  },
  {
    slug: 'tiefgarage',
    name: 'Tiefgarage',
    category: 'wohnen',
    categoryName: 'Wohngebäude',
    icon: '🅿️',
    description: 'Professionelle Tiefgaragenreinigung. Bodenreinigung, Staubentfernung und Beseitigung von Ölflecken.',
    shortDescription: 'Saubere Tiefgaragen für Ihre Immobilie',
    longDescription: `Tiefgaragen werden oft vernachlässigt, obwohl sie täglich von Bewohnern und Besuchern genutzt werden. Staub, Reifenabrieb, Ölflecken und Streusalzreste im Winter beeinträchtigen nicht nur die Optik, sondern auch die Langlebigkeit der Bodenbeschichtung.

Unsere Tiefgaragenreinigung umfasst die maschinelle Bodenreinigung, Entfernung von Ölflecken und Staubablagerungen sowie die Reinigung von Wänden und Stützpfeilern. Besonders nach dem Winter ist eine gründliche Reinigung wichtig, um Streusalzreste zu entfernen.

Mit professionellen Reinigungsmaschinen arbeiten wir effizient und stören den Parkbetrieb nur minimal. Auf Wunsch reinigen wir nachts oder am Wochenende.

Regelmäßige Tiefgaragenreinigung erhält den Wert Ihrer Immobilie und sorgt für ein gepflegtes Erscheinungsbild.`,
    challenges: [
      'Reifenabrieb und Bremsstaub setzen sich ab',
      'Ölflecken und Tropfspuren von Fahrzeugen',
      'Streusalzreste im Winter greifen Beschichtung an',
      'Schlechte Belüftung begünstigt Staubansammlung',
      'Beschränkte Zugänglichkeit durch parkende Fahrzeuge',
    ],
    services: ['grundreinigung', 'hochdruckreinigung', 'unterhaltsreinigung'],
    benefits: [
      'Maschinelle Reinigung für große Flächen',
      'Spezialreiniger für Ölflecken',
      'Flexible Reinigungszeiten (auch nachts)',
      'Werterhalt der Bodenbeschichtung',
    ],
    faqs: [
      {
        question: 'Wie oft sollte eine Tiefgarage gereinigt werden?',
        answer: 'Wir empfehlen mindestens 2x jährlich eine Grundreinigung – im Frühjahr nach der Streusalz-Saison und im Herbst. Bei starker Nutzung auch häufiger.',
      },
      {
        question: 'Können Sie auch während der Nutzung reinigen?',
        answer: 'Ja, wir arbeiten abschnittsweise und kennzeichnen die Bereiche. So bleibt die Tiefgarage nutzbar.',
      },
    ],
  },
  {
    slug: 'seniorenwohnanlage',
    name: 'Seniorenwohnanlage',
    category: 'wohnen',
    categoryName: 'Wohngebäude',
    icon: '👴',
    description: 'Gebäudereinigung für Seniorenwohnanlagen. Besondere Sorgfalt, Hygiene und Rücksichtnahme auf ältere Bewohner.',
    shortDescription: 'Reinigung mit Rücksicht auf ältere Bewohner',
    longDescription: `Seniorenwohnanlagen erfordern besondere Sorgfalt bei der Reinigung. Ältere Bewohner haben ein erhöhtes Hygienebedürfnis, sind empfindlicher gegenüber Stolperfallen und schätzen ruhiges, rücksichtsvolles Personal.

Unsere Reinigungskräfte sind im Umgang mit Senioren geschult. Wir arbeiten leise, vermeiden Stolperfallen durch herumliegende Kabel oder nasse Böden und nehmen uns Zeit für einen freundlichen Gruß.

Hygiene steht an erster Stelle: Handläufe, Türklinken und häufig berührte Oberflächen werden besonders gründlich desinfiziert. In Gemeinschaftsräumen wie Aufenthaltsräumen oder Gemeinschaftsküchen achten wir auf höchste Sauberkeitsstandards.

Barrierefreie Zugänge, Aufzüge und Rampen werden selbstverständlich in die Reinigung einbezogen.`,
    challenges: [
      'Erhöhte Hygieneanforderungen',
      'Bewohner sind empfindlich gegenüber Lärm',
      'Stolperfallen müssen vermieden werden',
      'Gemeinschaftsräume werden intensiv genutzt',
      'Barrierefreie Bereiche erfordern besondere Aufmerksamkeit',
    ],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: [
      'Geschultes Personal im Umgang mit Senioren',
      'Besondere Hygiene bei Kontaktflächen',
      'Ruhiges, rücksichtsvolles Arbeiten',
      'Keine Stolperfallen während der Reinigung',
    ],
    faqs: [
      {
        question: 'Achten Sie auf besondere Hygiene?',
        answer: 'Ja, in Seniorenwohnanlagen desinfizieren wir Handläufe, Türklinken und häufig berührte Oberflächen besonders gründlich.',
      },
      {
        question: 'Stören Sie die Bewohner nicht?',
        answer: 'Unser Personal arbeitet ruhig und rücksichtsvoll. Wir vermeiden Lärm und grüßen freundlich – Ihre Bewohner sollen sich wohlfühlen.',
      },
    ],
  },
  {
    slug: 'studentenwohnheim',
    name: 'Studentenwohnheim',
    category: 'wohnen',
    categoryName: 'Wohngebäude',
    icon: '🎓',
    description: 'Reinigung für Studentenwohnheime. Gemeinschaftsküchen, Sanitäranlagen und Flure – auch bei hoher Fluktuation.',
    shortDescription: 'Saubere Wohnheime für Studierende',
    longDescription: `Studentenwohnheime sind lebendige Orte mit hoher Fluktuation und intensiver Nutzung der Gemeinschaftsflächen. Gemeinschaftsküchen, Sanitäranlagen und Aufenthaltsräume werden von vielen jungen Menschen genutzt – das erfordert regelmäßige, gründliche Reinigung.

Wir kennen die besonderen Anforderungen: Gemeinschaftsküchen müssen täglich gereinigt werden, Sanitäranlagen brauchen besondere Hygiene, und Flure sind stark frequentiert. Zum Semesterwechsel übernehmen wir Grundreinigungen und Zimmerreinigungen.

Unsere Reinigungskräfte arbeiten effizient und diskret – auch wenn der Betrieb in vollem Gange ist. Wir kennen die Rhythmen eines Wohnheims und passen unsere Zeiten an.

Bei Veranstaltungen oder besonderen Anlässen sind wir flexibel und bieten Sonderreinigungen an.`,
    challenges: [
      'Hohe Fluktuation zu Semesterbeginn und -ende',
      'Gemeinschaftsküchen werden intensiv genutzt',
      'Sanitäranlagen für viele Nutzer',
      'Partys und Veranstaltungen hinterlassen Spuren',
      'Studierende haben unterschiedliche Sauberkeitsstandards',
    ],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: [
      'Erfahrung mit Wohnheimbetrieb',
      'Flexible Zeiten auch bei Vollbetrieb',
      'Grundreinigung zum Semesterwechsel',
      'Sonderreinigung nach Veranstaltungen',
    ],
    faqs: [
      {
        question: 'Bieten Sie Zimmerreinigung zum Semesterwechsel?',
        answer: 'Ja, wir übernehmen Zimmerreinigungen bei Auszug und bereiten Zimmer für neue Bewohner vor.',
      },
      {
        question: 'Wie gehen Sie mit Partys um?',
        answer: 'Nach Veranstaltungen bieten wir Sonderreinigungen an – auch kurzfristig am Wochenende.',
      },
    ],
  },
  {
    slug: 'hochhaus',
    name: 'Hochhaus',
    category: 'wohnen',
    categoryName: 'Wohngebäude',
    icon: '🏙️',
    description: 'Professionelle Hochhausreinigung. Treppenhäuser, Aufzüge und Gemeinschaftsflächen über viele Etagen.',
    shortDescription: 'Reinigung für Hochhäuser mit vielen Etagen',
    longDescription: `Hochhäuser stellen besondere Anforderungen an die Gebäudereinigung: Viele Etagen, Aufzüge als zentrale Verkehrswege und zahlreiche Mietparteien bedeuten intensive Nutzung der Gemeinschaftsflächen.

Unsere Teams sind auf Hochhausreinigung spezialisiert. Wir reinigen systematisch von oben nach unten, um effizient zu arbeiten und Verschmutzungen nicht erneut zu verteilen. Aufzüge werden besonders häufig gereinigt, da sie von allen Bewohnern genutzt werden.

Die Eingangshalle als Visitenkarte des Gebäudes erhält besondere Aufmerksamkeit. Auch Technikräume, Müllschlucker-Räume und Kellergeschosse gehören zu unserem Leistungsumfang.

Für die Glasreinigung in großer Höhe arbeiten wir mit spezialisierten Partnern zusammen, die über die nötige Ausrüstung und Zertifizierungen verfügen.`,
    challenges: [
      'Viele Etagen erfordern systematisches Vorgehen',
      'Aufzüge werden von allen genutzt',
      'Eingangshalle muss repräsentativ sein',
      'Müllentsorgungssysteme brauchen regelmäßige Reinigung',
      'Glasfassaden in großer Höhe',
    ],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung'],
    benefits: [
      'Erfahrung mit Hochhausreinigung',
      'Systematische Reinigung über alle Etagen',
      'Besondere Aufmerksamkeit für Aufzüge',
      'Partner für Fassadenreinigung in Höhe',
    ],
    faqs: [
      {
        question: 'Reinigen Sie auch die Aufzüge?',
        answer: 'Ja, Aufzüge werden bei jeder Reinigung mitgereinigt – Kabine, Spiegel, Tasten und Türen.',
      },
      {
        question: 'Wie reinigen Sie in den oberen Etagen die Fenster?',
        answer: 'Für Außenreinigung in großer Höhe arbeiten wir mit zertifizierten Partnern zusammen, die Seilzugangstechnik oder Hubarbeitsbühnen einsetzen.',
      },
    ],
  },

  // ============================================
  // KATEGORIE: BÜRO & GEWERBE (6)
  // ============================================
  {
    slug: 'buerogebaeude',
    name: 'Bürogebäude',
    category: 'buero',
    categoryName: 'Büro & Gewerbe',
    icon: '🏢',
    description: 'Professionelle Bürogebäudereinigung für produktive Arbeitsumgebungen. Regelmäßig, diskret, außerhalb der Geschäftszeiten.',
    shortDescription: 'Saubere Büros für produktive Mitarbeiter',
    longDescription: `Ein sauberes Bürogebäude ist die Grundlage für produktives Arbeiten und ein professionelles Erscheinungsbild gegenüber Kunden und Geschäftspartnern. Unsere Büroreinigung sorgt für hygienische Arbeitsplätze und repräsentative Gemeinschaftsflächen.

Wir reinigen außerhalb Ihrer Geschäftszeiten – früh morgens, abends oder nachts – damit Ihr Tagesgeschäft ungestört bleibt. Unsere Reinigungskräfte arbeiten diskret und zuverlässig nach einem festen Plan, der auf Ihre Anforderungen abgestimmt ist.

Das Leistungsspektrum reicht von der täglichen Unterhaltsreinigung über Sanitärreinigung bis zur regelmäßigen Grundreinigung. Konferenzräume, Empfangsbereiche und Chefetagen erhalten auf Wunsch besondere Aufmerksamkeit.`,
    challenges: [
      'Reinigung muss außerhalb der Arbeitszeit erfolgen',
      'Vertraulichkeit bei Dokumenten und Daten',
      'Unterschiedliche Bereiche mit verschiedenen Anforderungen',
      'Technik und Elektronik dürfen nicht beschädigt werden',
    ],
    services: ['bueroreinigung', 'glasreinigung', 'unterhaltsreinigung', 'grundreinigung'],
    benefits: [
      'Reinigung außerhalb der Geschäftszeiten',
      'Geschultes Personal mit Vertraulichkeit',
      'Fester Reinigungsplan',
      'Konstante Qualität durch Stammteam',
    ],
    faqs: [
      {
        question: 'Wann reinigen Sie das Büro?',
        answer: 'Wir reinigen außerhalb Ihrer Geschäftszeiten – früh morgens ab 5 Uhr, abends oder nachts.',
      },
      {
        question: 'Wie gehen Sie mit vertraulichen Dokumenten um?',
        answer: 'Unsere Mitarbeiter sind zur Verschwiegenheit verpflichtet. Dokumente werden nicht berührt.',
      },
    ],
  },
  {
    slug: 'coworking-space',
    name: 'Coworking Space',
    category: 'buero',
    categoryName: 'Büro & Gewerbe',
    icon: '💼',
    description: 'Reinigung für Coworking Spaces. Flexible Arbeitsplätze, Meetingräume und Gemeinschaftsbereiche hygienisch sauber.',
    shortDescription: 'Hygienische Coworking-Umgebungen',
    longDescription: `Coworking Spaces leben von ihrer Atmosphäre: Modern, einladend und hygienisch sauber. Wechselnde Nutzer teilen sich Arbeitsplätze, Meetingräume und Gemeinschaftsbereiche.

Wir verstehen die Dynamik von Coworking Spaces: Gemeinsam genutzte Schreibtische, Telefonboxen und Konferenzräume werden täglich desinfiziert. Die Gemeinschaftsküche als sozialer Treffpunkt erhält besondere Aufmerksamkeit.`,
    challenges: [
      'Wechselnde Nutzer an flexiblen Arbeitsplätzen',
      'Gemeinschaftsbereiche werden intensiv genutzt',
      'Lange Öffnungszeiten erschweren Reinigung',
    ],
    services: ['bueroreinigung', 'unterhaltsreinigung', 'glasreinigung'],
    benefits: [
      'Desinfektion gemeinsam genutzter Flächen',
      'Flexible Reinigungszeiten',
      'Sonderreinigung für Events',
    ],
    faqs: [
      {
        question: 'Desinfizieren Sie die Arbeitsplätze?',
        answer: 'Ja, gemeinsam genutzte Schreibtische werden täglich desinfiziert – besonders wichtig bei Hot-Desking.',
      },
    ],
  },
  {
    slug: 'arztpraxis',
    name: 'Arztpraxis',
    category: 'buero',
    categoryName: 'Büro & Gewerbe',
    icon: '🏥',
    description: 'Professionelle Praxisreinigung mit höchsten Hygienestandards. Desinfektionsreinigung für Arztpraxen aller Fachrichtungen.',
    shortDescription: 'Hygienische Reinigung für Ihre Praxis',
    longDescription: `Arztpraxen unterliegen strengen Hygienevorschriften. Unsere Praxisreinigung arbeitet nach Hygieneplänen, verwendet Desinfektionsmittel entsprechend der Vorgaben und dokumentiert unsere Leistungen.

Behandlungsräume, Wartezimmer, Empfang und Sanitäranlagen werden nach Praxisschluss gründlich gereinigt und desinfiziert. Kontaktflächen wie Türklinken und Handläufe erhalten besondere Aufmerksamkeit.`,
    challenges: [
      'Strenge Hygienevorschriften',
      'Desinfektion muss dokumentiert werden',
      'Patienten erwarten makellose Sauberkeit',
    ],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: [
      'Geschultes Personal für medizinische Umgebungen',
      'Desinfektionsreinigung nach Hygieneplan',
      'Dokumentation für Praxisunterlagen',
    ],
    faqs: [
      {
        question: 'Arbeiten Sie nach Hygieneplan?',
        answer: 'Ja, wir stimmen unsere Reinigung auf Ihren Hygieneplan ab.',
      },
    ],
  },
  {
    slug: 'zahnarztpraxis',
    name: 'Zahnarztpraxis',
    category: 'buero',
    categoryName: 'Büro & Gewerbe',
    icon: '🦷',
    description: 'Spezialisierte Reinigung für Zahnarztpraxen. Hygiene und Desinfektion nach zahnärztlichen Standards.',
    shortDescription: 'Hygienische Zahnarztpraxis-Reinigung',
    longDescription: `Zahnarztpraxen haben besondere Hygieneanforderungen. Böden, Oberflächen und Kontaktflächen werden mit zugelassenen Desinfektionsmitteln gereinigt. Unser Personal ist diskret und vertrauenswürdig.`,
    challenges: [
      'Hohe Hygieneanforderungen durch Aerosole',
      'Spezielle Reinigung im Behandlungsbereich',
    ],
    services: ['unterhaltsreinigung', 'grundreinigung'],
    benefits: [
      'Spezialisiert auf Zahnarztpraxen',
      'Desinfektionsmittel nach Vorgabe',
      'Geschultes, diskretes Personal',
    ],
    faqs: [
      {
        question: 'Welche Desinfektionsmittel verwenden Sie?',
        answer: 'Wir verwenden VAH-gelistete Desinfektionsmittel. Auf Wunsch auch von Ihnen vorgegebene Produkte.',
      },
    ],
  },
  {
    slug: 'rechtsanwaltskanzlei',
    name: 'Rechtsanwaltskanzlei',
    category: 'buero',
    categoryName: 'Büro & Gewerbe',
    icon: '⚖️',
    description: 'Diskrete Kanzleireinigung für Rechtsanwälte. Vertraulichkeit, Zuverlässigkeit und repräsentative Sauberkeit.',
    shortDescription: 'Diskrete Reinigung für Ihre Kanzlei',
    longDescription: `Rechtsanwaltskanzleien erfordern höchste Diskretion. Unser Personal ist zur Verschwiegenheit verpflichtet. Dokumente werden nicht berührt, Aktenregale werden vorsichtig abgestaubt.`,
    challenges: [
      'Vertrauliche Dokumente und Akten',
      'Repräsentatives Erscheinungsbild erforderlich',
    ],
    services: ['bueroreinigung', 'unterhaltsreinigung', 'glasreinigung'],
    benefits: [
      'Höchste Diskretion garantiert',
      'Geschultes, vertrauenswürdiges Personal',
      'Repräsentative Sauberkeit',
    ],
    faqs: [
      {
        question: 'Wie stellen Sie Vertraulichkeit sicher?',
        answer: 'Unser Personal ist zur Verschwiegenheit verpflichtet. Wir berühren keine Dokumente.',
      },
    ],
  },
  {
    slug: 'steuerberatungskanzlei',
    name: 'Steuerberatungskanzlei',
    category: 'buero',
    categoryName: 'Büro & Gewerbe',
    icon: '📊',
    description: 'Professionelle Reinigung für Steuerberater. Diskretion bei Finanzdaten, zuverlässiger Service das ganze Jahr.',
    shortDescription: 'Vertrauliche Kanzleireinigung für Steuerberater',
    longDescription: `Steuerberatungskanzleien arbeiten mit sensiblen Finanzdaten. Wir wissen: Besonders in der Hochsaison vor Abgabeterminen ist Zuverlässigkeit entscheidend.`,
    challenges: [
      'Vertrauliche Finanzdaten',
      'Hochsaison erfordert besondere Zuverlässigkeit',
    ],
    services: ['bueroreinigung', 'unterhaltsreinigung', 'glasreinigung'],
    benefits: [
      'Diskretion bei Finanzdaten',
      'Besonders zuverlässig in der Hochsaison',
    ],
    faqs: [
      {
        question: 'Sind Sie auch während der Steuersaison zuverlässig?',
        answer: 'Gerade in der Hochsaison erscheinen wir pünktlich und zuverlässig.',
      },
    ],
  },

  // ============================================
  // KATEGORIE: HANDEL (6)
  // ============================================
  {
    slug: 'handelsgeschaeft',
    name: 'Handelsgeschäft',
    category: 'handel',
    categoryName: 'Handel & Einzelhandel',
    icon: '🛍️',
    description: 'Professionelle Reinigung für Einzelhandelsgeschäfte. Saubere Verkaufsflächen für mehr Umsatz und zufriedene Kunden.',
    shortDescription: 'Saubere Geschäfte für zufriedene Kunden',
    longDescription: `In Handelsgeschäften sind Sauberkeit und Präsentation der Waren von entscheidender Bedeutung. Ein sauberes Geschäft lädt Kunden zum Verweilen und Kaufen ein.

Unsere Reinigungskräfte arbeiten vor Ladenöffnung oder nach Ladenschluss. Verkaufsflächen, Regale, Schaufenster, Umkleidekabinen und Sanitäranlagen – wir reinigen alle Bereiche.`,
    challenges: [
      'Hohe Kundenfrequenz bringt viel Schmutz',
      'Schaufenster müssen immer sauber sein',
      'Waren dürfen nicht beschädigt werden',
    ],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung'],
    benefits: [
      'Reinigung vor/nach Öffnungszeiten',
      'Schaufensterreinigung inklusive',
      'Sorgfältiger Umgang mit Waren',
    ],
    faqs: [
      {
        question: 'Reinigen Sie auch die Schaufenster?',
        answer: 'Ja, Schaufensterreinigung gehört zu unserem Service – innen und außen.',
      },
    ],
  },
  {
    slug: 'einkaufszentrum',
    name: 'Einkaufszentrum',
    category: 'handel',
    categoryName: 'Handel & Einzelhandel',
    icon: '🏬',
    description: 'Gebäudereinigung für Einkaufszentren. Große Flächen, hohe Frequenz, konstante Sauberkeit den ganzen Tag.',
    shortDescription: 'Saubere Einkaufszentren für Besucher',
    longDescription: `Einkaufszentren sind komplexe Immobilien mit hoher Besucherfrequenz. Wir bieten Komplettlösungen: tägliche Unterhaltsreinigung, Sanitärdienst während der Öffnungszeiten, nächtliche Grundreinigung.`,
    challenges: [
      'Tausende Besucher täglich',
      'Große Flächen effizient reinigen',
      'Food Court mit besonderen Anforderungen',
    ],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung', 'hochdruckreinigung'],
    benefits: [
      'Komplettlösung für Center-Management',
      'Teams während Öffnungszeiten präsent',
      'Flexible Kapazitäten für Events',
    ],
    faqs: [
      {
        question: 'Sind Sie auch tagsüber im Center?',
        answer: 'Ja, während der Öffnungszeiten sind Teams für Sanitärdienst und schnelle Reaktion präsent.',
      },
    ],
  },
  {
    slug: 'supermarkt',
    name: 'Supermarkt',
    category: 'handel',
    categoryName: 'Handel & Einzelhandel',
    icon: '🛒',
    description: 'Reinigung für Supermärkte und Lebensmittelmärkte. Hygiene im Frischebereich, saubere Gänge, gepflegter Eingangsbereich.',
    shortDescription: 'Hygienische Reinigung für Lebensmittelmärkte',
    longDescription: `Supermärkte unterliegen strengen Hygienevorschriften. Wir reinigen vor Marktöffnung für einen hygienisch sauberen Start. Böden, Regale, Kühltruhen und Sanitäranlagen werden gründlich gereinigt.`,
    challenges: [
      'Strenge Hygienevorschriften',
      'Hohe Kundenfrequenz',
      'Enge Reinigungszeitfenster vor Öffnung',
    ],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: [
      'Frühmorgendliche Reinigung vor Öffnung',
      'Hygiene nach Lebensmittelstandards',
      'Zuverlässige Stammteams',
    ],
    faqs: [
      {
        question: 'Wann reinigen Sie den Markt?',
        answer: 'Wir reinigen vor Marktöffnung, typischerweise zwischen 5 und 7 Uhr.',
      },
    ],
  },
  {
    slug: 'autohaus',
    name: 'Autohaus',
    category: 'handel',
    categoryName: 'Handel & Einzelhandel',
    icon: '🚗',
    description: 'Professionelle Autohausreinigung. Showroom, Werkstatt, Empfang und Außenbereich – alles aus einer Hand.',
    shortDescription: 'Glänzende Showrooms und saubere Werkstätten',
    longDescription: `Ein Autohaus muss glänzen – der Showroom ist die Bühne für hochwertige Fahrzeuge. Wir reinigen Showroom-Böden streifenfrei, Glasflächen und auch Werkstatt und Außenbereiche.`,
    challenges: [
      'Showroom muss makellos glänzen',
      'Großflächige Glasfronten',
      'Werkstatt mit Öl- und Schmierstoffen',
    ],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung', 'hochdruckreinigung'],
    benefits: [
      'Streifenfreie Showroom-Böden',
      'Regelmäßige Glasreinigung',
      'Werkstattreinigung inklusive',
    ],
    faqs: [
      {
        question: 'Reinigen Sie auch die Werkstatt?',
        answer: 'Ja, Werkstattreinigung gehört zu unserem Angebot.',
      },
    ],
  },
  {
    slug: 'tankstelle',
    name: 'Tankstelle',
    category: 'handel',
    categoryName: 'Handel & Einzelhandel',
    icon: '⛽',
    description: 'Tankstellenreinigung für Shop und Außenbereich. Öl- und Kraftstoffrückstände fachgerecht entfernt.',
    shortDescription: 'Saubere Tankstellen rund um die Uhr',
    longDescription: `Tankstellen haben besondere Anforderungen: Shop-Reinigung und Außenbereich mit Öl- und Kraftstoffrückständen. Wir reinigen zu verkehrsarmen Zeiten mit Spezialreinigern.`,
    challenges: [
      'Öl- und Kraftstoffrückstände',
      'Oft 24-Stunden-Betrieb',
      'Sanitäranlagen stark beansprucht',
    ],
    services: ['unterhaltsreinigung', 'hochdruckreinigung', 'glasreinigung'],
    benefits: [
      'Spezialreinigung für Kraftstoffbereiche',
      'Flexible Zeiten auch bei 24h-Betrieb',
      'Regelmäßige Hochdruckreinigung',
    ],
    faqs: [
      {
        question: 'Können Sie nachts reinigen?',
        answer: 'Ja, für 24-Stunden-Tankstellen reinigen wir zu verkehrsarmen Zeiten.',
      },
    ],
  },
  {
    slug: 'fachmarkt',
    name: 'Fachmarkt',
    category: 'handel',
    categoryName: 'Handel & Einzelhandel',
    icon: '🔧',
    description: 'Reinigung für Fachmärkte und Baumärkte. Große Flächen, unterschiedliche Bodenbeläge, Lagerbereiche.',
    shortDescription: 'Saubere Fachmärkte mit großen Flächen',
    longDescription: `Fachmärkte haben große Verkaufsflächen mit unterschiedlichen Anforderungen. Mit Scheuersaugmaschinen arbeiten wir schnell und gründlich. Lagerbereiche und Außenbereiche gehören dazu.`,
    challenges: [
      'Sehr große Flächen',
      'Unterschiedliche Bodenbeläge',
      'Lagerbereiche schwer zugänglich',
    ],
    services: ['unterhaltsreinigung', 'grundreinigung', 'hochdruckreinigung'],
    benefits: [
      'Maschinelle Reinigung großer Flächen',
      'Erfahrung mit verschiedenen Böden',
      'Lager- und Außenbereiche inklusive',
    ],
    faqs: [
      {
        question: 'Reinigen Sie auch das Lager?',
        answer: 'Ja, Lagerbereiche gehören zu unserem Leistungsumfang.',
      },
    ],
  },

  // ============================================
  // KATEGORIE: GASTRONOMIE (4)
  // ============================================
  {
    slug: 'restaurant',
    name: 'Restaurant',
    category: 'gastronomie',
    categoryName: 'Gastronomie',
    icon: '🍽️',
    description: 'Professionelle Restaurantreinigung. Gastraum, Küche und Sanitäranlagen hygienisch sauber für Ihre Gäste.',
    shortDescription: 'Hygienische Restaurants für zufriedene Gäste',
    longDescription: `In der Gastronomie ist Hygiene das A und O. Wir reinigen Restaurants nach Küchenschluss – Gastraum, Bar, Toiletten und je nach Vereinbarung auch Küchenbereiche nach gastronomischen Hygienestandards.`,
    challenges: ['Fett und Essensreste in der Küche', 'Späte Schließzeiten', 'Hygienekontrollen durch Behörden'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Reinigung nach Küchenschluss', 'Hygiene nach Gastronomiestandards', 'Küchenreinigung optional'],
    faqs: [{ question: 'Reinigen Sie auch die Küche?', answer: 'Ja, auf Wunsch reinigen wir auch Küchenbereiche nach Gastronomiestandards.' }],
  },
  {
    slug: 'cafe',
    name: 'Café',
    category: 'gastronomie',
    categoryName: 'Gastronomie',
    icon: '☕',
    description: 'Café-Reinigung für einladende Atmosphäre. Saubere Sitzplätze, glänzende Theke, gepflegte Toiletten.',
    shortDescription: 'Einladende Cafés durch professionelle Reinigung',
    longDescription: `Ein Café lebt von seiner Atmosphäre – gemütlich, einladend und selbstverständlich sauber. Wir sorgen dafür, dass Ihr Café jeden Tag bereit ist: Böden, Tische, Stühle, Theke und Sanitäranlagen.`,
    challenges: ['Atmosphäre muss einladend bleiben', 'Polstermöbel und Textilien', 'Terrasse bei schönem Wetter'],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung'],
    benefits: ['Reinigung vor Café-Öffnung', 'Pflege von Polstermöbeln', 'Terrassenreinigung in Saison'],
    faqs: [{ question: 'Reinigen Sie auch Polstermöbel?', answer: 'Ja, Polstermöbel werden regelmäßig abgesaugt. Tiefenreinigung bieten wir als Zusatzleistung.' }],
  },
  {
    slug: 'baeckerei',
    name: 'Bäckerei',
    category: 'gastronomie',
    categoryName: 'Gastronomie',
    icon: '🥐',
    description: 'Hygienische Bäckerei-Reinigung. Verkaufsraum und Café-Bereich makellos für Ihre Kunden.',
    shortDescription: 'Saubere Bäckereien für frischen Genuss',
    longDescription: `Bäckereien brauchen makellose Sauberkeit – der Duft von frischem Brot verdient einen ebenso frischen, sauberen Verkaufsraum. Wir reinigen in den frühen Morgenstunden oder nach Ladenschluss.`,
    challenges: ['Mehlstaub setzt sich überall ab', 'Frühe Öffnungszeiten', 'Vitrinen müssen glänzen'],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung'],
    benefits: ['Frühmorgendliche Reinigung möglich', 'Gründliche Staubentfernung', 'Vitrinenreinigung inklusive'],
    faqs: [{ question: 'Wie früh können Sie reinigen?', answer: 'Wir können ab 4 Uhr morgens reinigen, damit alles fertig ist bevor Ihre Bäckerei öffnet.' }],
  },
  {
    slug: 'kantine',
    name: 'Kantine',
    category: 'gastronomie',
    categoryName: 'Gastronomie',
    icon: '🍲',
    description: 'Kantinenreinigung für Unternehmen und Einrichtungen. Hygiene und Sauberkeit bei hoher Gästefrequenz.',
    shortDescription: 'Saubere Kantinen für viele Gäste',
    longDescription: `Kantinen versorgen täglich viele Gäste in kurzer Zeit. Wir reinigen vor der Öffnung und nach Betriebsschluss. Bei hoher Frequenz bieten wir auch Zwischenreinigungen an.`,
    challenges: ['Viele Gäste in kurzer Zeit', 'Große Flächen effizient bearbeiten', 'Hygiene nach HACCP-Standards'],
    services: ['unterhaltsreinigung', 'grundreinigung'],
    benefits: ['Effiziente Reinigung großer Flächen', 'Zwischenreinigung während Betrieb', 'Hygiene nach HACCP'],
    faqs: [{ question: 'Arbeiten Sie nach HACCP?', answer: 'Ja, in Kantinen arbeiten wir nach HACCP-Hygienestandards.' }],
  },

  // ============================================
  // KATEGORIE: BEHERBERGUNG (4)
  // ============================================
  {
    slug: 'hotel',
    name: 'Hotel',
    category: 'beherbergung',
    categoryName: 'Beherbergung & Tourismus',
    icon: '🏨',
    description: 'Professionelle Hotelreinigung. Zimmer, Lobby, Restaurant und Wellness – erstklassiger Service für Ihre Gäste.',
    shortDescription: 'Erstklassige Sauberkeit für Ihre Hotelgäste',
    longDescription: `Hotels leben von der Zufriedenheit ihrer Gäste. Unser Housekeeping-Team arbeitet nach Ihren Standards. Zimmer, Lobby, Restaurant und Wellness-Bereiche – wir bieten flexible Kapazitäten je nach Saison.`,
    challenges: ['Zimmer müssen schnell bezugsfertig sein', 'Saisonale Schwankungen', 'Schichtbetrieb und enge Zeitfenster'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Komplettes Housekeeping möglich', 'Arbeiten nach Ihren Standards', 'Flexible Kapazitäten je nach Saison'],
    faqs: [{ question: 'Können Sie unser komplettes Housekeeping übernehmen?', answer: 'Ja, wir bieten vollständige Housekeeping-Services an.' }],
  },
  {
    slug: 'pension',
    name: 'Pension',
    category: 'beherbergung',
    categoryName: 'Beherbergung & Tourismus',
    icon: '🛏️',
    description: 'Reinigung für Pensionen und Gästehäuser. Persönlicher Service, gründliche Zimmerreinigung, gepflegte Gemeinschaftsräume.',
    shortDescription: 'Gemütliche Sauberkeit für Ihre Pension',
    longDescription: `Pensionen bieten persönliche Atmosphäre. Wir übernehmen die Zimmerreinigung zwischen Abreise und Anreise, sorgen für frische Betten und saubere Gemeinschaftsräume.`,
    challenges: ['Variable Belegung erfordert Flexibilität', 'Enge Zeitfenster zwischen Gästen'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Flexible Einsätze je nach Belegung', 'Persönlicher Service', 'Saisonale Grundreinigung'],
    faqs: [{ question: 'Können Sie auch nur bei Bedarf kommen?', answer: 'Ja, für kleinere Pensionen bieten wir flexible Einsätze nach Absprache.' }],
  },
  {
    slug: 'ferienwohnung',
    name: 'Ferienwohnung',
    category: 'beherbergung',
    categoryName: 'Beherbergung & Tourismus',
    icon: '🏠',
    description: 'Ferienwohnungsreinigung zwischen den Gästen. Schnell, gründlich, zuverlässig – für zufriedene Urlauber.',
    shortDescription: 'Reinigung zwischen den Gästen',
    longDescription: `Ferienwohnungen müssen zwischen Abreise und Anreise blitzblank sein. Wir bieten zuverlässige Komplett-Reinigung: alle Räume, frische Bettwäsche, Küche und Bad hygienisch sauber.`,
    challenges: ['Enge Zeitfenster zwischen Gästen', 'Komplett-Reinigung in kurzer Zeit'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Schnelle Komplett-Reinigung', 'Zuverlässig auch bei engem Zeitfenster', 'Rundum-Service für Vermieter'],
    faqs: [{ question: 'Wie schnell können Sie eine Wohnung reinigen?', answer: 'Eine Standard-Ferienwohnung reinigen wir in 2-3 Stunden gründlich durch.' }],
  },
  {
    slug: 'hostel',
    name: 'Hostel',
    category: 'beherbergung',
    categoryName: 'Beherbergung & Tourismus',
    icon: '🎒',
    description: 'Hostel-Reinigung für Schlafsäle und Gemeinschaftsbereiche. Hygiene bei hoher Fluktuation und jungem Publikum.',
    shortDescription: 'Saubere Hostels für Backpacker',
    longDescription: `Hostels haben hohe Fluktuation und intensiv genutzte Gemeinschaftsbereiche. Wir reinigen Schlafsäle täglich. Gemeinschaftsküchen und Sanitäranlagen werden mehrfach täglich kontrolliert.`,
    challenges: ['Hohe Fluktuation der Gäste', 'Schlafsäle mit vielen Betten', 'Oft 24-Stunden-Betrieb'],
    services: ['unterhaltsreinigung', 'grundreinigung'],
    benefits: ['Erfahrung mit Hostel-Betrieb', 'Mehrfach tägliche Sanitärkontrolle', 'Nachtservice möglich'],
    faqs: [{ question: 'Reinigen Sie auch nachts?', answer: 'Ja, für Check-outs in den frühen Morgenstunden bieten wir Nachtservice an.' }],
  },

  // ============================================
  // KATEGORIE: GESUNDHEIT (5)
  // ============================================
  {
    slug: 'pflegeheim',
    name: 'Pflegeheim',
    category: 'gesundheit',
    categoryName: 'Gesundheitswesen',
    icon: '🏥',
    description: 'Reinigung für Pflegeheime und Senioreneinrichtungen. Höchste Hygiene, geschultes Personal, rücksichtsvoller Umgang.',
    shortDescription: 'Hygienische Reinigung für Pflegeeinrichtungen',
    longDescription: `Pflegeheime erfordern höchste Hygienestandards und geschultes Personal im Umgang mit älteren und pflegebedürftigen Menschen. Wir arbeiten ruhig, rücksichtsvoll und nach Hygieneplänen.`,
    challenges: ['Höchste Hygieneanforderungen', 'Sensible Bewohner', 'Desinfektion muss dokumentiert werden'],
    services: ['unterhaltsreinigung', 'grundreinigung'],
    benefits: ['Geschultes Personal im Umgang mit Senioren', 'Desinfektionsreinigung nach Hygieneplan', 'Ruhiges, rücksichtsvolles Arbeiten'],
    faqs: [{ question: 'Ist Ihr Personal im Umgang mit Pflegebedürftigen geschult?', answer: 'Ja, unser Personal ist im respektvollen Umgang mit älteren und pflegebedürftigen Menschen geschult.' }],
  },
  {
    slug: 'klinik',
    name: 'Klinik',
    category: 'gesundheit',
    categoryName: 'Gesundheitswesen',
    icon: '🏨',
    description: 'Professionelle Klinikreinigung. Stationen, Wartebereiche und OP-nahe Bereiche nach Krankenhausstandards.',
    shortDescription: 'Klinikreinigung nach höchsten Standards',
    longDescription: `Kliniken und Krankenhäuser erfordern Reinigung nach strengsten Hygienestandards. Wir reinigen Stationen, Wartebereiche, Sanitäranlagen und OP-nahe Bereiche nach dokumentierten Hygieneplänen.`,
    challenges: ['Strengste Hygienevorschriften', 'Unterschiedliche Reinigungszonen', '24-Stunden-Betrieb'],
    services: ['unterhaltsreinigung', 'grundreinigung'],
    benefits: ['Reinigung nach Krankenhausstandards', 'Dokumentierte Hygienepläne', 'Erfahrung im Klinikbereich'],
    faqs: [{ question: 'Reinigen Sie auch OP-nahe Bereiche?', answer: 'Ja, nach entsprechenden Hygieneplänen und mit speziell geschultem Personal.' }],
  },
  {
    slug: 'apotheke',
    name: 'Apotheke',
    category: 'gesundheit',
    categoryName: 'Gesundheitswesen',
    icon: '💊',
    description: 'Apothekenreinigung mit Hygienefokus. Verkaufsraum, Labor und Lager hygienisch sauber.',
    shortDescription: 'Hygienische Reinigung für Apotheken',
    longDescription: `Apotheken erfordern besondere Hygiene im Verkaufsraum und Laborbereich. Wir reinigen vor Öffnung und sorgen für hygienisch saubere Theken, Regale und Böden.`,
    challenges: ['Hygiene im Laborbereich', 'Theken mit Kundenkontakt', 'Reinigung vor früher Öffnung'],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung'],
    benefits: ['Frühmorgendliche Reinigung', 'Hygienefokus', 'Erfahrung mit Apotheken'],
    faqs: [{ question: 'Reinigen Sie auch das Labor?', answer: 'Wir reinigen den Laborbereich nach Ihren Vorgaben – sensible Geräte bleiben Ihrem Fachpersonal vorbehalten.' }],
  },
  {
    slug: 'physiotherapie',
    name: 'Physiotherapie',
    category: 'gesundheit',
    categoryName: 'Gesundheitswesen',
    icon: '💪',
    description: 'Reinigung für Physiotherapiepraxen. Behandlungsliegen, Gerätebereich und Sanitäranlagen hygienisch sauber.',
    shortDescription: 'Hygienische Physiotherapiepraxen',
    longDescription: `Physiotherapiepraxen brauchen hygienisch saubere Behandlungsräume. Wir reinigen Böden, Liegen-Umgebung, Gerätebereich und Sanitäranlagen nach Praxisschluss.`,
    challenges: ['Behandlungsliegen als Kontaktflächen', 'Gerätebereich mit speziellen Anforderungen', 'Oft späte Praxiszeiten'],
    services: ['unterhaltsreinigung', 'grundreinigung'],
    benefits: ['Desinfektion von Kontaktflächen', 'Reinigung nach Praxisschluss', 'Hygiene im Gerätebereich'],
    faqs: [{ question: 'Desinfizieren Sie die Behandlungsliegen?', answer: 'Wir desinfizieren die Liegen-Umgebung. Die Liegen selbst werden meist vom Praxispersonal zwischen Patienten gereinigt.' }],
  },
  {
    slug: 'labor',
    name: 'Labor',
    category: 'gesundheit',
    categoryName: 'Gesundheitswesen',
    icon: '🔬',
    description: 'Laborreinigung nach Hygienevorschriften. Böden, Oberflächen und Nebenräume fachgerecht gereinigt.',
    shortDescription: 'Fachgerechte Laborreinigung',
    longDescription: `Labore erfordern spezialisierte Reinigung nach Hygienevorschriften. Wir reinigen Böden, Oberflächen und Nebenräume – Laborgeräte und sensible Bereiche bleiben Ihrem Fachpersonal vorbehalten.`,
    challenges: ['Strenge Hygienevorschriften', 'Sensible Bereiche', 'Dokumentationspflichten'],
    services: ['unterhaltsreinigung', 'grundreinigung'],
    benefits: ['Reinigung nach Laborstandards', 'Geschultes Personal', 'Dokumentierte Leistungen'],
    faqs: [{ question: 'Was reinigen Sie im Labor?', answer: 'Wir reinigen Böden, Oberflächen und Nebenräume. Laborgeräte und sensible Bereiche obliegen Ihrem Fachpersonal.' }],
  },

  // ============================================
  // KATEGORIE: BILDUNG (4)
  // ============================================
  {
    slug: 'kindergarten',
    name: 'Kindergarten',
    category: 'bildung',
    categoryName: 'Bildung & Betreuung',
    icon: '👶',
    description: 'Kindergartenreinigung mit besonderer Sorgfalt. Hygiene für die Kleinsten, kindersichere Reinigungsmittel.',
    shortDescription: 'Hygienische Kitas für unsere Kleinsten',
    longDescription: `Kindergärten erfordern besondere Sorgfalt: Hygiene für die Gesundheit der Kinder und kindersichere Reinigungsmittel. Wir reinigen Gruppenräume, Sanitäranlagen, Küchen und Außenbereiche.`,
    challenges: ['Kinder sind anfällig für Keime', 'Spielzeug und Böden werden beansprucht', 'Kindersichere Reinigungsmittel'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Kindersichere Reinigungsmittel', 'Besondere Hygiene', 'Erfahrung mit Kita-Reinigung'],
    faqs: [{ question: 'Verwenden Sie kindersichere Reinigungsmittel?', answer: 'Ja, in Kindergärten verwenden wir ausschließlich kindersichere und hypoallergene Reinigungsmittel.' }],
  },
  {
    slug: 'schule',
    name: 'Schule',
    category: 'bildung',
    categoryName: 'Bildung & Betreuung',
    icon: '🏫',
    description: 'Professionelle Schulreinigung. Klassenzimmer, Turnhalle, Sanitäranlagen und Außenbereiche zuverlässig sauber.',
    shortDescription: 'Saubere Schulen für gutes Lernen',
    longDescription: `Schulen brauchen tägliche Reinigung für eine saubere Lernumgebung. Wir reinigen Klassenzimmer, Fachräume, Turnhallen, Sanitäranlagen und Außenbereiche – während der Schulzeiten oder in den Ferien.`,
    challenges: ['Viele Schüler bringen viel Schmutz', 'Turnhallen und Fachräume', 'Ferienzeiten für Grundreinigung'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung', 'hochdruckreinigung'],
    benefits: ['Tägliche Unterhaltsreinigung', 'Grundreinigung in den Ferien', 'Erfahrung mit Schulreinigung'],
    faqs: [{ question: 'Bieten Sie Grundreinigung in den Ferien?', answer: 'Ja, Schulferien nutzen wir für gründliche Grundreinigung aller Bereiche.' }],
  },
  {
    slug: 'universitaet',
    name: 'Universität',
    category: 'bildung',
    categoryName: 'Bildung & Betreuung',
    icon: '🎓',
    description: 'Gebäudereinigung für Universitäten und Hochschulen. Hörsäle, Bibliotheken, Labore und Mensabereiche.',
    shortDescription: 'Saubere Hochschulen für Studierende',
    longDescription: `Universitäten sind komplexe Einrichtungen mit unterschiedlichen Anforderungen. Wir reinigen Hörsäle, Seminarräume, Bibliotheken, Labore und Mensabereiche nach jeweiligen Standards.`,
    challenges: ['Verschiedene Gebäude mit unterschiedlichen Anforderungen', 'Labore erfordern spezielle Reinigung', 'Semesterbetrieb mit Schwankungen'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Erfahrung mit Hochschulen', 'Flexible Kapazitäten im Semesterbetrieb', 'Verschiedene Bereiche aus einer Hand'],
    faqs: [{ question: 'Reinigen Sie auch die Labore?', answer: 'Ja, Laborbereiche reinigen wir nach den jeweiligen Hygieneanforderungen.' }],
  },
  {
    slug: 'volkshochschule',
    name: 'Volkshochschule',
    category: 'bildung',
    categoryName: 'Bildung & Betreuung',
    icon: '📚',
    description: 'Reinigung für Volkshochschulen und Bildungseinrichtungen. Kursräume, Büros und Sanitäranlagen.',
    shortDescription: 'Saubere Bildungseinrichtungen',
    longDescription: `Volkshochschulen und Bildungseinrichtungen haben Kursbetrieb zu unterschiedlichen Zeiten. Wir reinigen Kursräume, Verwaltungsbereiche und Sanitäranlagen flexibel nach Ihrem Kursplan.`,
    challenges: ['Kurse zu unterschiedlichen Zeiten', 'Wechselnde Raumbelegung', 'Unterschiedliche Kursarten'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Flexible Reinigungszeiten', 'Anpassung an Kursplan', 'Zuverlässiger Service'],
    faqs: [{ question: 'Können Sie sich an unseren Kursplan anpassen?', answer: 'Ja, wir stimmen die Reinigungszeiten auf Ihren Kursbetrieb ab.' }],
  },

  // ============================================
  // KATEGORIE: SPORT & FREIZEIT (4)
  // ============================================
  {
    slug: 'sportverein',
    name: 'Sportverein',
    category: 'sport',
    categoryName: 'Sport & Freizeit',
    icon: '⚽',
    description: 'Reinigung für Sportvereine. Vereinsheim, Umkleiden, Sanitäranlagen und Außenanlagen zuverlässig sauber.',
    shortDescription: 'Saubere Vereinsheime für Sportler',
    longDescription: `Sportvereine brauchen saubere Umkleiden, hygienische Sanitäranlagen und ein gepflegtes Vereinsheim. Wir reinigen nach Trainingszeiten oder Spieltagen und sorgen für Sauberkeit, die Sportler verdienen.`,
    challenges: ['Umkleiden werden intensiv genutzt', 'Sanitäranlagen stark beansprucht', 'Spieltage erfordern Sonderreinigung'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'gruenanlagenpflege'],
    benefits: ['Reinigung nach Trainingszeiten', 'Hygienische Umkleiden und Duschen', 'Sonderreinigung nach Spieltagen'],
    faqs: [{ question: 'Können Sie nach Spieltagen reinigen?', answer: 'Ja, nach Spieltagen und Veranstaltungen bieten wir Sonderreinigungen an.' }],
  },
  {
    slug: 'fitnessstudio',
    name: 'Fitnessstudio',
    category: 'sport',
    categoryName: 'Sport & Freizeit',
    icon: '🏋️',
    description: 'Professionelle Fitnessstudio-Reinigung. Trainingsbereich, Umkleiden und Sanitäranlagen hygienisch sauber.',
    shortDescription: 'Hygienische Fitnessstudios',
    longDescription: `Fitnessstudios erfordern besondere Hygiene – Schweiß, Körperkontakt mit Geräten und hohe Frequenz. Wir reinigen Trainingsflächen, Geräte-Umgebungen, Umkleiden und Sanitäranlagen gründlich.`,
    challenges: ['Schweiß auf Geräten und Böden', 'Lange Öffnungszeiten', 'Umkleiden und Duschen stark frequentiert'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Desinfektion von Trainingsflächen', 'Flexible Reinigung auch bei langen Öffnungszeiten', 'Hygienische Umkleiden'],
    faqs: [{ question: 'Desinfizieren Sie die Trainingsflächen?', answer: 'Ja, Böden und Geräte-Umgebungen werden desinfiziert. Die Geräte selbst werden meist vom Studio-Personal zwischen Nutzungen gereinigt.' }],
  },
  {
    slug: 'schwimmbad',
    name: 'Schwimmbad',
    category: 'sport',
    categoryName: 'Sport & Freizeit',
    icon: '🏊',
    description: 'Reinigung für Schwimmbäder und Hallenbäder. Umkleiden, Sanitäranlagen, Beckenumgang und Foyer.',
    shortDescription: 'Saubere Schwimmbäder',
    longDescription: `Schwimmbäder brauchen tägliche Reinigung aller Barfußbereiche, Umkleiden und Sanitäranlagen. Wir reinigen nach Badeschluss und sorgen für hygienisch saubere Einrichtungen.`,
    challenges: ['Barfußbereiche erfordern besondere Hygiene', 'Feuchtigkeit und Chlor', 'Umkleiden mit hoher Frequenz'],
    services: ['unterhaltsreinigung', 'grundreinigung'],
    benefits: ['Hygiene in Barfußbereichen', 'Reinigung nach Badeschluss', 'Erfahrung mit Schwimmbädern'],
    faqs: [{ question: 'Reinigen Sie auch den Beckenumgang?', answer: 'Ja, der Beckenumgang und alle Barfußbereiche werden täglich hygienisch gereinigt.' }],
  },
  {
    slug: 'sporthalle',
    name: 'Sporthalle',
    category: 'sport',
    categoryName: 'Sport & Freizeit',
    icon: '🏀',
    description: 'Reinigung für Sporthallen und Turnhallen. Hallenboden, Tribüne, Umkleiden und Sanitäranlagen.',
    shortDescription: 'Saubere Sporthallen',
    longDescription: `Sporthallen werden von Schulen, Vereinen und für Events genutzt. Wir reinigen Hallenböden fachgerecht, pflegen Tribünenbereiche und sorgen für hygienische Umkleiden und Sanitäranlagen.`,
    challenges: ['Sportböden erfordern spezielle Pflege', 'Unterschiedliche Nutzungen', 'Events erfordern Sonderreinigung'],
    services: ['unterhaltsreinigung', 'grundreinigung'],
    benefits: ['Fachgerechte Sportbodenpflege', 'Reinigung nach Veranstaltungen', 'Flexible Einsätze'],
    faqs: [{ question: 'Pflegen Sie auch den Sportboden?', answer: 'Ja, wir reinigen und pflegen Sportböden fachgerecht nach Herstellervorgaben.' }],
  },

  // ============================================
  // KATEGORIE: ÖFFENTLICH & SONSTIGE (4)
  // ============================================
  {
    slug: 'behoerde',
    name: 'Behörde',
    category: 'oeffentlich',
    categoryName: 'Öffentliche Einrichtungen',
    icon: '🏛️',
    description: 'Gebäudereinigung für Behörden und Ämter. Zuverlässig, diskret und nach öffentlichen Ausschreibungsstandards.',
    shortDescription: 'Zuverlässige Behördenreinigung',
    longDescription: `Behörden und öffentliche Einrichtungen erfordern zuverlässige Reinigung nach definierten Standards. Wir arbeiten nach Leistungsverzeichnissen und erfüllen die Anforderungen öffentlicher Auftraggeber.`,
    challenges: ['Strenge Leistungsverzeichnisse', 'Hohe Besucherfrequenz', 'Sicherheitsbereiche'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Erfahrung mit öffentlichen Auftraggebern', 'Arbeiten nach Leistungsverzeichnis', 'Zuverlässigkeit garantiert'],
    faqs: [{ question: 'Haben Sie Erfahrung mit öffentlichen Auftraggebern?', answer: 'Ja, wir arbeiten regelmäßig für Behörden und kennen die Anforderungen öffentlicher Ausschreibungen.' }],
  },
  {
    slug: 'rathaus',
    name: 'Rathaus',
    category: 'oeffentlich',
    categoryName: 'Öffentliche Einrichtungen',
    icon: '🏛️',
    description: 'Reinigung für Rathäuser und Gemeindeverwaltungen. Repräsentative Sauberkeit für Bürger und Mitarbeiter.',
    shortDescription: 'Repräsentative Rathausreinigung',
    longDescription: `Rathäuser sind repräsentative Gebäude, die Bürgern und Mitarbeitern eine saubere Umgebung bieten müssen. Wir reinigen Publikumsbereiche, Büros, Sitzungssäle und Sanitäranlagen zuverlässig.`,
    challenges: ['Repräsentativer Charakter', 'Hoher Publikumsverkehr', 'Sitzungssäle für Ratssitzungen'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
    benefits: ['Repräsentative Sauberkeit', 'Reinigung auch abends nach Sitzungen', 'Zuverlässiger Service'],
    faqs: [{ question: 'Reinigen Sie auch nach Ratssitzungen?', answer: 'Ja, nach Ratssitzungen und Veranstaltungen bieten wir Sonderreinigung an.' }],
  },
  {
    slug: 'bankfiliale',
    name: 'Bankfiliale',
    category: 'sonstige',
    categoryName: 'Sonstige',
    icon: '🏦',
    description: 'Reinigung für Bankfilialen und Sparkassen. Diskretion, Sicherheit und repräsentative Sauberkeit.',
    shortDescription: 'Diskrete Reinigung für Bankfilialen',
    longDescription: `Bankfilialen erfordern höchste Diskretion und Sicherheit. Wir reinigen Kundenbereiche, Schalter, Beratungsräume und Sanitäranlagen außerhalb der Geschäftszeiten.`,
    challenges: ['Höchste Diskretion erforderlich', 'Sicherheitsbereiche', 'Repräsentatives Erscheinungsbild'],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung'],
    benefits: ['Diskretes, vertrauenswürdiges Personal', 'Reinigung außerhalb Geschäftszeiten', 'Repräsentative Sauberkeit'],
    faqs: [{ question: 'Wie stellen Sie Sicherheit sicher?', answer: 'Unser Personal ist überprüft und zur Verschwiegenheit verpflichtet. Wir arbeiten außerhalb der Geschäftszeiten.' }],
  },
  {
    slug: 'friseursalon',
    name: 'Friseursalon',
    category: 'sonstige',
    categoryName: 'Sonstige',
    icon: '💇',
    description: 'Reinigung für Friseursalons und Beautystudios. Hygienische Sauberkeit für Ihre Kunden.',
    shortDescription: 'Saubere Salons für zufriedene Kunden',
    longDescription: `Friseursalons brauchen tägliche Hygiene – Haare, Produktreste und hohe Kundenfrequenz erfordern gründliche Reinigung. Wir reinigen Böden, Arbeitsplätze, Waschbecken und Sanitäranlagen.`,
    challenges: ['Haare überall', 'Produktreste auf Oberflächen', 'Enge Zeitfenster vor/nach Öffnung'],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung'],
    benefits: ['Gründliche Haarentfernung', 'Reinigung vor Salonöffnung', 'Hygienische Arbeitsplätze'],
    faqs: [{ question: 'Können Sie vor Salonöffnung reinigen?', answer: 'Ja, wir reinigen früh morgens vor Ihrer Öffnung, damit alles bereit ist.' }],
  },
]

/**
 * Get object type by slug
 */
export function getObjektartBySlug(slug: string): ObjectType | undefined {
  return OBJEKTARTEN.find((obj) => obj.slug === slug)
}

/**
 * Get all object type slugs for generateStaticParams
 */
export function getAllObjektartSlugs(): string[] {
  return OBJEKTARTEN.map((obj) => obj.slug)
}

/**
 * Get object types by category
 */
export function getObjektartenByCategory(category: string): ObjectType[] {
  return OBJEKTARTEN.filter((obj) => obj.category === category)
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  return [...new Set(OBJEKTARTEN.map((obj) => obj.category))]
}
