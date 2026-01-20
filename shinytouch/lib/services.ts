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
