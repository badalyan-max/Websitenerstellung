import type { City } from './types'

/**
 * Alle 32 Städte für Stadt-Seiten
 * Priority 1 = Höchste Priorität (Bayern + Top-Städte)
 * Priority 2 = Mittlere Priorität
 * Priority 3 = Niedrige Priorität
 */
export const CITIES: City[] = [
  // Bayern (Heimatregion) - Priority 1
  {
    slug: 'bamberg',
    name: 'Bamberg',
    region: 'Bayern',
    priority: 1,
    intro: 'Als Bamberger Unternehmen mit Hauptsitz direkt vor Ort kennen wir die Anforderungen der Region genau. Von der historischen Altstadt bis zum modernen Gewerbegebiet – wir reinigen zuverlässig und mit kurzen Reaktionszeiten.',
    highlights: [
      'Hauptsitz in Bamberg – schnellste Reaktionszeiten',
      'Kenntnis der UNESCO-Welterbe Altstadt',
      'Lokale Referenzen verfügbar',
      'Persönliche Betreuung vor Ort',
    ],
  },
  {
    slug: 'nuernberg',
    name: 'Nürnberg',
    region: 'Bayern',
    priority: 1,
    intro: 'Professionelle Gebäudereinigung in Nürnberg – Frankens Metropole. Wir betreuen Bürogebäude, Gewerbeobjekte und öffentliche Einrichtungen in der gesamten Nürnberger Region.',
    highlights: [
      'Kurze Anfahrt aus Bamberg',
      'Erfahrung mit Großstadtobjekten',
      'Flexible Reinigungszeiten',
    ],
  },
  {
    slug: 'muenchen',
    name: 'München',
    region: 'Bayern',
    priority: 1,
    intro: 'Gebäudereinigung in München – Bayerns Landeshauptstadt. Professionelle Reinigungslösungen für Unternehmen aller Größen in München und Umgebung.',
    highlights: [
      'Deutschlandweites Netzwerk',
      'Erfahrung mit Premiumobjekten',
      'Höchste Qualitätsstandards',
    ],
  },
  {
    slug: 'wuerzburg',
    name: 'Würzburg',
    region: 'Bayern',
    priority: 2,
    intro: 'Gebäudereinigung in Würzburg – professionell und zuverlässig. Wir reinigen Büros, Praxen und Gewerbeobjekte in der Universitätsstadt.',
  },
  {
    slug: 'erlangen',
    name: 'Erlangen',
    region: 'Bayern',
    priority: 2,
    intro: 'Professionelle Gebäudereinigung in Erlangen. Spezialisiert auf Büroreinigung, Praxisreinigung und Unterhaltsreinigung.',
  },
  {
    slug: 'fuerth',
    name: 'Fürth',
    region: 'Bayern',
    priority: 2,
    intro: 'Gebäudereinigung in Fürth – Ihr Partner für saubere Arbeitsumgebungen. Regelmäßige Reinigung und Sonderreinigungen.',
  },
  {
    slug: 'bayreuth',
    name: 'Bayreuth',
    region: 'Bayern',
    priority: 2,
    intro: 'Professionelle Gebäudereinigung in Bayreuth. Von der Unterhaltsreinigung bis zur Grundreinigung.',
  },
  {
    slug: 'augsburg',
    name: 'Augsburg',
    region: 'Bayern',
    priority: 2,
    intro: 'Gebäudereinigung in Augsburg – zuverlässig und gründlich. Für Büros, Praxen und Gewerbeobjekte.',
  },
  {
    slug: 'regensburg',
    name: 'Regensburg',
    region: 'Bayern',
    priority: 2,
    intro: 'Professionelle Gebäudereinigung in Regensburg. Moderne Reinigungstechnik für beste Ergebnisse.',
  },
  {
    slug: 'ingolstadt',
    name: 'Ingolstadt',
    region: 'Bayern',
    priority: 2,
    intro: 'Gebäudereinigung in Ingolstadt – für Industrie und Gewerbe. Professionelle Reinigungslösungen.',
  },

  // Top-Städte Deutschland - Priority 1
  {
    slug: 'berlin',
    name: 'Berlin',
    region: 'Berlin',
    priority: 1,
    intro: 'Gebäudereinigung in Berlin – Deutschlands Hauptstadt. Professionelle Reinigung für Büros, Gewerbe und öffentliche Einrichtungen.',
    highlights: [
      'Deutschlandweites Netzwerk',
      'Flexible Einsatzzeiten',
      'Erfahrung mit Großprojekten',
    ],
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    region: 'Hamburg',
    priority: 1,
    intro: 'Professionelle Gebäudereinigung in Hamburg. Zuverlässige Reinigungsservices für die Hansestadt.',
  },
  {
    slug: 'koeln',
    name: 'Köln',
    region: 'NRW',
    priority: 1,
    intro: 'Gebäudereinigung in Köln – professionell und zuverlässig. Für saubere Arbeitsumgebungen am Rhein.',
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt am Main',
    region: 'Hessen',
    priority: 1,
    intro: 'Professionelle Gebäudereinigung in Frankfurt. Spezialisiert auf Büro- und Gewerbereinigung im Finanzmetropole.',
  },
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    region: 'Baden-Württemberg',
    priority: 1,
    intro: 'Gebäudereinigung in Stuttgart – für Industrie und Gewerbe. Höchste Qualitätsstandards.',
  },

  // Weitere Großstädte - Priority 2
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    region: 'NRW',
    priority: 2,
    intro: 'Professionelle Gebäudereinigung in Düsseldorf. Für Büros, Praxen und Gewerbeobjekte.',
  },
  {
    slug: 'dortmund',
    name: 'Dortmund',
    region: 'NRW',
    priority: 2,
    intro: 'Gebäudereinigung in Dortmund – zuverlässig und gründlich.',
  },
  {
    slug: 'essen',
    name: 'Essen',
    region: 'NRW',
    priority: 2,
    intro: 'Professionelle Gebäudereinigung in Essen. Moderne Reinigungstechnik.',
  },
  {
    slug: 'leipzig',
    name: 'Leipzig',
    region: 'Sachsen',
    priority: 2,
    intro: 'Gebäudereinigung in Leipzig – für saubere Arbeitsumgebungen.',
  },
  {
    slug: 'dresden',
    name: 'Dresden',
    region: 'Sachsen',
    priority: 2,
    intro: 'Professionelle Gebäudereinigung in Dresden. Zuverlässig und gründlich.',
  },
  {
    slug: 'hannover',
    name: 'Hannover',
    region: 'Niedersachsen',
    priority: 2,
    intro: 'Gebäudereinigung in Hannover – Ihr Partner für Sauberkeit.',
  },
  {
    slug: 'bremen',
    name: 'Bremen',
    region: 'Bremen',
    priority: 2,
    intro: 'Professionelle Gebäudereinigung in Bremen. Für Büros und Gewerbe.',
  },
  {
    slug: 'karlsruhe',
    name: 'Karlsruhe',
    region: 'Baden-Württemberg',
    priority: 2,
    intro: 'Gebäudereinigung in Karlsruhe – professionell und zuverlässig.',
  },
  {
    slug: 'mannheim',
    name: 'Mannheim',
    region: 'Baden-Württemberg',
    priority: 2,
    intro: 'Professionelle Gebäudereinigung in Mannheim.',
  },
  {
    slug: 'wiesbaden',
    name: 'Wiesbaden',
    region: 'Hessen',
    priority: 2,
    intro: 'Gebäudereinigung in Wiesbaden – für saubere Arbeitsplätze.',
  },
  {
    slug: 'bonn',
    name: 'Bonn',
    region: 'NRW',
    priority: 2,
    intro: 'Professionelle Gebäudereinigung in Bonn.',
  },

  // Weitere Städte - Priority 3
  {
    slug: 'braunschweig',
    name: 'Braunschweig',
    region: 'Niedersachsen',
    priority: 3,
    intro: 'Gebäudereinigung in Braunschweig.',
  },
  {
    slug: 'kiel',
    name: 'Kiel',
    region: 'Schleswig-Holstein',
    priority: 3,
    intro: 'Professionelle Gebäudereinigung in Kiel.',
  },
  {
    slug: 'chemnitz',
    name: 'Chemnitz',
    region: 'Sachsen',
    priority: 3,
    intro: 'Gebäudereinigung in Chemnitz.',
  },
  {
    slug: 'magdeburg',
    name: 'Magdeburg',
    region: 'Sachsen-Anhalt',
    priority: 3,
    intro: 'Professionelle Gebäudereinigung in Magdeburg.',
  },
  {
    slug: 'mainz',
    name: 'Mainz',
    region: 'Rheinland-Pfalz',
    priority: 3,
    intro: 'Gebäudereinigung in Mainz.',
  },
  {
    slug: 'saarbruecken',
    name: 'Saarbrücken',
    region: 'Saarland',
    priority: 3,
    intro: 'Professionelle Gebäudereinigung in Saarbrücken.',
  },
]

/**
 * Get city by slug
 */
export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug)
}

/**
 * Get all city slugs for generateStaticParams
 */
export function getAllCitySlugs(): string[] {
  return CITIES.map((city) => city.slug)
}

/**
 * Get cities by priority
 */
export function getCitiesByPriority(priority: 1 | 2 | 3): City[] {
  return CITIES.filter((city) => city.priority === priority)
}

/**
 * Get cities by region
 */
export function getCitiesByRegion(region: string): City[] {
  return CITIES.filter((city) => city.region === region)
}
