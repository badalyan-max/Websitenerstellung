import type { Service } from './types'

/**
 * Alle Services mit SEO-optimierten Beschreibungen
 */
export const SERVICES: Service[] = [
  {
    slug: 'bueroreinigung',
    name: 'Büroreinigung',
    shortName: 'Büro',
    icon: '🏢',
    description: 'Professionelle Büroreinigung für saubere und hygienische Arbeitsplätze. Regelmäßige Unterhaltsreinigung nach Ihren Wünschen.',
    shortDescription: 'Saubere Büros für produktive Mitarbeiter. Regelmäßige Reinigung nach Ihrem Zeitplan.',
    longDescription: 'Eine saubere Arbeitsumgebung steigert die Produktivität und das Wohlbefinden Ihrer Mitarbeiter. Unsere professionelle Büroreinigung umfasst die Reinigung von Schreibtischen, Böden, Sanitäranlagen und Gemeinschaftsbereichen. Wir arbeiten flexibel außerhalb Ihrer Geschäftszeiten.',
    features: [
      'Schreibtisch- und Arbeitsplatzreinigung',
      'Bodenreinigung und -pflege',
      'Sanitärreinigung',
      'Küchen- und Pausenraumreinigung',
      'Müllenleeerung und Entsorgung',
      'Glasflächenreinigung innen',
    ],
    benefits: [
      'Steigerung der Mitarbeiterzufriedenheit',
      'Professionelles Erscheinungsbild',
      'Hygienische Arbeitsumgebung',
      'Flexible Reinigungszeiten',
    ],
    faqs: [
      {
        question: 'Wie oft sollte eine Büroreinigung stattfinden?',
        answer: 'Die optimale Reinigungsfrequenz hängt von der Bürogröße und Mitarbeiterzahl ab. Für die meisten Büros empfehlen wir 2-3 Reinigungen pro Woche. Gerne erstellen wir ein individuelles Konzept.',
      },
      {
        question: 'Wann wird gereinigt?',
        answer: 'Wir reinigen außerhalb Ihrer Geschäftszeiten – früh morgens, abends oder nachts. So stören wir Ihren Arbeitsablauf nicht.',
      },
    ],
  },
  {
    slug: 'glasreinigung',
    name: 'Glasreinigung',
    shortName: 'Glas',
    icon: '🪟',
    description: 'Professionelle Glasreinigung für Fenster, Glasfassaden und Schaufenster. Streifenfreie Ergebnisse garantiert.',
    shortDescription: 'Streifenfreie Fenster und Glasfassaden. Lassen Sie mehr Licht in Ihr Gebäude.',
    longDescription: 'Saubere Fenster und Glasflächen lassen Ihr Gebäude in bestem Licht erscheinen. Unsere Glasreinigung umfasst Fensterreinigung, Glasfassadenreinigung und Schaufensterreinigung mit professioneller Ausrüstung für streifenfreie Ergebnisse.',
    features: [
      'Fensterreinigung innen und außen',
      'Glasfassadenreinigung',
      'Schaufensterreinigung',
      'Rahmen- und Falzreinigung',
      'Wintergartenreinigung',
      'Oberlichtreinigung',
    ],
    benefits: [
      'Streifenfreie Ergebnisse',
      'Mehr Tageslicht im Gebäude',
      'Professionelles Erscheinungsbild',
      'Werterhalt der Glasflächen',
    ],
    faqs: [
      {
        question: 'Wie oft sollten Fenster professionell gereinigt werden?',
        answer: 'Für Bürogebäude empfehlen wir eine Glasreinigung alle 4-8 Wochen. Bei Schaufenstern im Einzelhandel oft wöchentlich. Wir erstellen einen individuellen Reinigungsplan.',
      },
      {
        question: 'Werden auch schwer erreichbare Fenster gereinigt?',
        answer: 'Ja, mit professioneller Ausrüstung reinigen wir auch Oberlichter, Wintergärten und Glasfassaden in großer Höhe. Sicherheit und Qualität sind dabei gewährleistet.',
      },
    ],
  },
  {
    slug: 'grundreinigung',
    name: 'Grundreinigung',
    shortName: 'Grund',
    icon: '✨',
    description: 'Intensive Grundreinigung für hartnäckige Verschmutzungen. Ideal nach Renovierung oder für vernachlässigte Flächen.',
    shortDescription: 'Intensive Tiefenreinigung für den Wie-neu-Zustand. Perfekt für Frühjahrsputz oder Mieterwechsel.',
    longDescription: 'Die Grundreinigung ist eine intensive Reinigung, die weit über die normale Unterhaltsreinigung hinausgeht. Sie eignet sich besonders nach Renovierungen, bei Mieterwechsel oder wenn Flächen lange nicht gereinigt wurden.',
    features: [
      'Intensive Bodenreinigung und Versiegelung',
      'Entfernung hartnäckiger Verschmutzungen',
      'Sanitärgrundreinigung mit Kalkentfernung',
      'Küchengrundreinigung inkl. Geräte',
      'Fenster-Intensivreinigung',
      'Heizkörperreinigung',
    ],
    benefits: [
      'Wie-neu-Zustand',
      'Basis für regelmäßige Unterhaltsreinigung',
      'Wertsteigerung der Immobilie',
      'Hygienischer Neustart',
    ],
    faqs: [
      {
        question: 'Wann ist eine Grundreinigung sinnvoll?',
        answer: 'Eine Grundreinigung empfehlen wir nach Renovierungen, bei Mieterwechsel, vor wichtigen Events oder wenn die letzte Intensivreinigung länger als 12 Monate zurückliegt.',
      },
      {
        question: 'Wie lange dauert eine Grundreinigung?',
        answer: 'Die Dauer hängt von Fläche und Verschmutzungsgrad ab. Für ein 100m² Büro rechnen Sie mit 4-6 Stunden. Wir nennen Ihnen den genauen Zeitrahmen nach Besichtigung.',
      },
    ],
  },
  {
    slug: 'unterhaltsreinigung',
    name: 'Unterhaltsreinigung',
    shortName: 'Unterhalt',
    icon: '🔄',
    description: 'Regelmäßige Unterhaltsreinigung für dauerhaft saubere Räume. Flexibel nach Ihrem Bedarf.',
    shortDescription: 'Regelmäßige Pflege für dauerhaft saubere Räume. Planbare Kosten und fester Ansprechpartner.',
    longDescription: 'Die Unterhaltsreinigung sorgt für dauerhaft saubere und gepflegte Räumlichkeiten. Mit regelmäßigen Reinigungsintervallen halten wir Ihr Gebäude in optimalem Zustand.',
    features: [
      'Regelmäßige Bodenreinigung',
      'Staubwischen und Oberflächenpflege',
      'Sanitärreinigung',
      'Papierkorb- und Müllenleeerung',
      'Türen und Lichtschalter reinigen',
      'Spinnwebenentfernung',
    ],
    benefits: [
      'Konstant saubere Räume',
      'Planbare Kosten',
      'Fester Ansprechpartner',
      'Flexible Intervalle',
    ],
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen Unterhalts- und Grundreinigung?',
        answer: 'Die Unterhaltsreinigung ist die regelmäßige Pflege (täglich bis wöchentlich). Die Grundreinigung ist eine intensive Tiefenreinigung, die 1-2x jährlich ergänzend durchgeführt wird.',
      },
      {
        question: 'Können wir die Reinigungsintervalle anpassen?',
        answer: 'Selbstverständlich. Wir passen die Intervalle flexibel an Ihren Bedarf an – ob täglich, 2x wöchentlich oder nach individuellem Plan. Änderungen sind jederzeit möglich.',
      },
    ],
  },
  {
    slug: 'baureinigung',
    name: 'Baureinigung',
    shortName: 'Bau',
    icon: '🏗️',
    description: 'Professionelle Baureinigung nach Neubau oder Renovierung. Baustaub und Verschmutzungen fachgerecht entfernt.',
    shortDescription: 'Nach Bau- oder Renovierungsarbeiten: Baustaub, Klebereste und Farbspritzer fachgerecht entfernt.',
    longDescription: 'Nach Bauarbeiten oder Renovierungen hinterlässt der Baustaub seine Spuren überall. Unsere Baureinigung entfernt Baustaub, Klebereste, Farbspritzer und andere bautypische Verschmutzungen fachgerecht.',
    features: [
      'Bauschutt- und Grobschmutzentfernung',
      'Baustaub-Feinreinigung',
      'Fenster-Erstreinigung',
      'Entfernung von Kleberesten und Farbspritzern',
      'Sanitär-Erstreinigung',
      'Bodenreinigung und Versiegelung',
    ],
    benefits: [
      'Bezugsfertiger Zustand',
      'Fachgerechte Behandlung aller Oberflächen',
      'Schnelle Durchführung',
      'Einzugstermin wird eingehalten',
    ],
    faqs: [
      {
        question: 'Wann sollte die Baureinigung stattfinden?',
        answer: 'Idealerweise nach Abschluss aller Bauarbeiten und vor Einzug oder Möblierung. Wir empfehlen 2-3 Tage Vorlauf für eine gründliche Feinreinigung einzuplanen.',
      },
      {
        question: 'Entfernen Sie auch Klebereste und Farbspritzer?',
        answer: 'Ja, wir entfernen fachgerecht Klebereste, Farbspritzer, Zementreste und andere bautypische Verschmutzungen – schonend für alle Oberflächen.',
      },
    ],
  },
  {
    slug: 'hochdruckreinigung',
    name: 'Hochdruckreinigung',
    shortName: 'Hochdruck',
    icon: '💧',
    description: 'Hochdruckreinigung für Fassaden, Pflaster und Außenanlagen. Kraftvolle Reinigung für hartnäckige Verschmutzungen.',
    shortDescription: 'Kraftvolle Außenreinigung für Fassaden, Pflaster und Terrassen. Algen und Moos nachhaltig entfernt.',
    longDescription: 'Mit professioneller Hochdruckreinigung entfernen wir hartnäckige Verschmutzungen von Fassaden, Pflasterflächen, Parkplätzen und anderen Außenbereichen effektiv und schonend.',
    features: [
      'Fassadenreinigung',
      'Pflaster- und Terrassenreinigung',
      'Parkplatz- und Zufahrtsreinigung',
      'Graffiti-Entfernung',
      'Algenenfernung',
      'Industriebodenreinigung',
    ],
    benefits: [
      'Kraftvolle Reinigung',
      'Umweltfreundlich ohne Chemie möglich',
      'Werterhalt der Außenanlagen',
      'Unfallverhütung durch rutschfreie Böden',
    ],
    faqs: [
      {
        question: 'Kann Hochdruckreinigung Oberflächen beschädigen?',
        answer: 'Wir passen den Druck und die Düse an jede Oberfläche an. Empfindliche Materialien wie weiches Holz reinigen wir mit reduziertem Druck oder alternativen Methoden.',
      },
      {
        question: 'Wie oft sollte die Fassade gereinigt werden?',
        answer: 'Je nach Lage und Verschmutzung empfehlen wir eine Fassadenreinigung alle 2-5 Jahre. Bei starkem Algen- oder Moosbefall auch häufiger.',
      },
    ],
  },
  {
    slug: 'winterdienst',
    name: 'Winterdienst',
    shortName: 'Winter',
    icon: '❄️',
    description: 'Professioneller Winterdienst für sichere Wege und Zufahrten. Schneeräumung und Streudienst – zuverlässig und pünktlich.',
    shortDescription: 'Sichere Wege im Winter. Schneeräumung und Streudienst für Ihre Verkehrssicherungspflicht.',
    longDescription: 'Mit unserem professionellen Winterdienst erfüllen Sie Ihre Verkehrssicherungspflicht zuverlässig. Wir räumen Schnee und Eis von Gehwegen, Zufahrten, Parkplätzen und Eingangsbereichen – pünktlich vor Geschäftsbeginn oder nach Ihren Vorgaben. Unser Bereitschaftsdienst ist bei Schneefall und Glätte für Sie im Einsatz.',
    features: [
      'Schneeräumung von Gehwegen und Zufahrten',
      'Streudienst mit abstumpfenden Mitteln',
      'Parkplatzräumung',
      'Dachlawinen-Warnschilder',
      'Bereitschaftsdienst bei Schneefall',
      'Dokumentation aller Einsätze',
    ],
    benefits: [
      'Verkehrssicherungspflicht erfüllt',
      'Haftungsrisiko minimiert',
      'Zuverlässiger Bereitschaftsdienst',
      'Dokumentierte Nachweise',
    ],
    faqs: [
      {
        question: 'Wann beginnt der Winterdienst?',
        answer: 'Der Winterdienst beginnt bei Schneefall oder Glätte. Gehwege müssen werktags ab 7 Uhr, sonn- und feiertags ab 8 Uhr geräumt sein. Wir beginnen entsprechend früher.',
      },
      {
        question: 'Was passiert bei nächtlichem Schneefall?',
        answer: 'Unser Bereitschaftsdienst überwacht die Wetterlage. Bei Schneefall in der Nacht räumen wir rechtzeitig vor Ihren Öffnungszeiten.',
      },
    ],
  },
  {
    slug: 'gruenanlagenpflege',
    name: 'Grünanlagenpflege',
    shortName: 'Grün',
    icon: '🌿',
    description: 'Professionelle Grünanlagenpflege für gepflegte Außenbereiche. Rasenpflege, Heckenschnitt und Beetpflege aus einer Hand.',
    shortDescription: 'Gepflegte Grünanlagen das ganze Jahr. Rasenmähen, Heckenschnitt und Beetpflege.',
    longDescription: 'Gepflegte Grünanlagen sind die Visitenkarte Ihrer Immobilie. Unsere Gartenpflege-Teams sorgen das ganze Jahr über für ansprechende Außenbereiche. Von regelmäßiger Rasenpflege über Heckenschnitt bis zur saisonalen Beetbepflanzung – wir übernehmen alle Arbeiten rund um Ihre Grünanlagen.',
    features: [
      'Rasenmähen und Rasenpflege',
      'Heckenschnitt und Formschnitt',
      'Unkrautentfernung',
      'Laubbeseitigung im Herbst',
      'Beetpflege und Bepflanzung',
      'Bewässerung bei Trockenheit',
    ],
    benefits: [
      'Gepflegtes Erscheinungsbild',
      'Wertsteigerung der Immobilie',
      'Zeitersparnis für Eigentümer',
      'Professionelle Ausrüstung',
    ],
    faqs: [
      {
        question: 'Wie oft sollte der Rasen gemäht werden?',
        answer: 'In der Wachstumsphase (April bis Oktober) empfehlen wir wöchentliches Mähen. Im Frühjahr und Herbst kann ein 2-wöchiger Rhythmus ausreichen.',
      },
      {
        question: 'Entsorgen Sie auch das Schnittgut?',
        answer: 'Ja, wir entsorgen Rasenschnitt, Heckenschnitt und Laub fachgerecht. Die Entsorgungskosten sind im Angebot enthalten.',
      },
    ],
  },
]

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug)
}

/**
 * Get all service slugs for generateStaticParams
 */
export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug)
}
