/**
 * Content-Generator für SEO-optimierte Stadtseiten
 * Generiert einzigartigen Content basierend auf Region, Stadtgröße und Synonymen
 */

import type { City, FAQ } from './types'
import { REGIONAL_NAMES, type Bundesland } from './plz-regions'

// ============================================================================
// Layer 1: Regionale Intros (pro Bundesland)
// ============================================================================

const REGIONAL_INTROS: Record<Bundesland, string[]> = {
  Bayern: [
    'Als bayerisches Unternehmen mit Hauptsitz in Bamberg sind wir Ihr kompetenter Partner für Gebäudereinigung in {city}.',
    'Professionelle Reinigungsservices für {city} und Umgebung – direkt aus dem Herzen Bayerns.',
    'Von unserem Standort in Bamberg betreuen wir Unternehmen in {city} mit erstklassiger Gebäudereinigung.',
  ],
  'Baden-Württemberg': [
    'Zuverlässige Gebäudereinigung in {city} – wir sind Ihr Partner im Ländle.',
    'Professionelle Reinigungsdienstleistungen für Unternehmen in {city} und der Region {region}.',
    'Mit unserem deutschlandweiten Netzwerk bieten wir erstklassige Gebäudereinigung in {city}.',
  ],
  Berlin: [
    'Gebäudereinigung in der Hauptstadt – professionell und zuverlässig für {city}.',
    'Ihr Partner für saubere Arbeitsumgebungen in Berlin und Umgebung.',
    'Moderne Reinigungslösungen für Unternehmen im Großraum Berlin.',
  ],
  Brandenburg: [
    'Professionelle Gebäudereinigung in {city} und der Region Brandenburg.',
    'Zuverlässige Reinigungsservices für Unternehmen in Brandenburg.',
    'Ihr Partner für Gebäudereinigung in {city} – flexibel und gründlich.',
  ],
  Bremen: [
    'Gebäudereinigung in der Hansestadt – professionell und zuverlässig.',
    'Ihr Partner für saubere Büros und Gewerbeobjekte in Bremen.',
    'Moderne Reinigungslösungen für Unternehmen in der Hansestadt.',
  ],
  Hamburg: [
    'Professionelle Gebäudereinigung in Hamburg – für die Hansestadt und darüber hinaus.',
    'Zuverlässige Reinigungsservices für Ihr Unternehmen in Hamburg.',
    'Ihr Partner für erstklassige Gebäudereinigung im Norden Deutschlands.',
  ],
  Hessen: [
    'Gebäudereinigung in {city} – professionell und zuverlässig für hessische Unternehmen.',
    'Moderne Reinigungslösungen für Büros und Gewerbeobjekte in Hessen.',
    'Ihr Partner für Sauberkeit in {city} und der Region.',
  ],
  'Mecklenburg-Vorpommern': [
    'Professionelle Gebäudereinigung in {city} an der Ostseeküste.',
    'Zuverlässige Reinigungsservices für Unternehmen in Mecklenburg-Vorpommern.',
    'Ihr Partner für Gebäudereinigung in {city} und Umgebung.',
  ],
  Niedersachsen: [
    'Gebäudereinigung in {city} – professionell und zuverlässig in Niedersachsen.',
    'Moderne Reinigungslösungen für Ihr Unternehmen in {city}.',
    'Ihr Partner für erstklassige Gebäudereinigung in Niedersachsen.',
  ],
  NRW: [
    'Professionelle Gebäudereinigung in {city} – für NRW und das Rheinland.',
    'Zuverlässige Reinigungsservices für Unternehmen im bevölkerungsreichsten Bundesland.',
    'Ihr Partner für saubere Arbeitsumgebungen in Nordrhein-Westfalen.',
  ],
  'Rheinland-Pfalz': [
    'Gebäudereinigung in {city} – professionell und zuverlässig an Rhein und Mosel.',
    'Moderne Reinigungslösungen für Unternehmen in Rheinland-Pfalz.',
    'Ihr Partner für Gebäudereinigung in {city} und der Region.',
  ],
  Saarland: [
    'Professionelle Gebäudereinigung im Saarland – für {city} und Umgebung.',
    'Zuverlässige Reinigungsservices für saarländische Unternehmen.',
    'Ihr Partner für erstklassige Gebäudereinigung an der französischen Grenze.',
  ],
  Sachsen: [
    'Gebäudereinigung in {city} – professionell und zuverlässig in Sachsen.',
    'Moderne Reinigungslösungen für Ihr Unternehmen in der sächsischen Region.',
    'Ihr Partner für saubere Arbeitsumgebungen in Sachsen.',
  ],
  'Sachsen-Anhalt': [
    'Professionelle Gebäudereinigung in {city} und Sachsen-Anhalt.',
    'Zuverlässige Reinigungsservices für Unternehmen in der Region.',
    'Ihr Partner für Gebäudereinigung im Herzen Deutschlands.',
  ],
  'Schleswig-Holstein': [
    'Gebäudereinigung zwischen den Meeren – professionell für {city}.',
    'Moderne Reinigungslösungen für Unternehmen in Schleswig-Holstein.',
    'Ihr Partner für erstklassige Gebäudereinigung im hohen Norden.',
  ],
  Thüringen: [
    'Professionelle Gebäudereinigung in {city} – im grünen Herzen Deutschlands.',
    'Zuverlässige Reinigungsservices für thüringische Unternehmen.',
    'Ihr Partner für Gebäudereinigung in Thüringen und Umgebung.',
  ],
}

// ============================================================================
// Layer 2: Stadtgröße-Templates
// ============================================================================

type CitySize = 'gross' | 'mittel' | 'klein'

const CITY_SIZE_TEMPLATES: Record<CitySize, string[]> = {
  gross: [
    'Als Metropole bietet {city} vielfältige Anforderungen an professionelle Gebäudereinigung.',
    'In einer Großstadt wie {city} setzen wir auf flexible Teams und moderne Reinigungstechnik.',
    'Für Unternehmen in {city} bieten wir maßgeschneiderte Reinigungslösungen auf höchstem Niveau.',
  ],
  mittel: [
    'In {city} verbinden wir persönliche Betreuung mit professioneller Reinigungsqualität.',
    '{city} als wichtiger Wirtschaftsstandort verdient erstklassige Gebäudereinigung.',
    'Für mittelständische Unternehmen in {city} sind wir der ideale Reinigungspartner.',
  ],
  klein: [
    'Auch in {city} und Umgebung sind wir Ihr zuverlässiger Partner für Gebäudereinigung.',
    'Für Unternehmen in {city} bieten wir persönlichen Service und kurze Wege.',
    'Professionelle Gebäudereinigung muss nicht weit weg sein – wir sind auch in {city} für Sie da.',
  ],
}

// ============================================================================
// Layer 3: Synonym-Pools für Variation
// ============================================================================

const ADJECTIVE_POOLS = {
  quality: ['professionell', 'erstklassig', 'hochwertig', 'gründlich', 'sorgfältig'],
  reliability: ['zuverlässig', 'pünktlich', 'verlässlich', 'termingerecht', 'beständig'],
  service: ['umfassend', 'maßgeschneidert', 'individuell', 'flexibel', 'kundenorientiert'],
}

const VERB_POOLS = {
  clean: ['reinigen', 'säubern', 'pflegen', 'betreuen', 'versorgen'],
  offer: ['bieten', 'liefern', 'gewährleisten', 'garantieren', 'ermöglichen'],
}

// ============================================================================
// Layer 4: Dynamische FAQ-Templates
// ============================================================================

const FAQ_TEMPLATES: Array<{ question: string; answer: string }> = [
  {
    question: 'Was kostet Gebäudereinigung in {city}?',
    answer:
      'Die Kosten für Gebäudereinigung in {city} richten sich nach Objektgröße, Reinigungsfrequenz und gewünschten Leistungen. Kontaktieren Sie uns für ein unverbindliches Angebot.',
  },
  {
    question: 'Wie oft sollte mein Büro in {city} gereinigt werden?',
    answer:
      'Die optimale Reinigungsfrequenz hängt von der Nutzungsintensität ab. Für Büros in {city} empfehlen wir in der Regel 2-3 Reinigungen pro Woche.',
  },
  {
    question: 'Bieten Sie auch Grundreinigung in {city} an?',
    answer:
      'Ja, neben der regelmäßigen Unterhaltsreinigung bieten wir auch professionelle Grundreinigungen für Objekte in {city} und {region} an.',
  },
  {
    question: 'Sind Ihre Reinigungskräfte in {city} versichert?',
    answer:
      'Selbstverständlich. Alle unsere Mitarbeiter sind vollständig versichert. Wir arbeiten mit festangestelltem Personal und achten auf faire Arbeitsbedingungen.',
  },
  {
    question: 'Wie schnell können Sie in {city} starten?',
    answer:
      'Nach der Auftragserteilung können wir meist innerhalb von wenigen Tagen mit der Gebäudereinigung in {city} beginnen. Bei dringenden Anfragen finden wir schnell eine Lösung.',
  },
  {
    question: 'Welche Reinigungsleistungen bieten Sie in {city}?',
    answer:
      'Wir bieten in {city} das volle Spektrum: Unterhaltsreinigung, Grundreinigung, Fensterreinigung, Teppichreinigung und Sonderreinigungen für Büros, Praxen und Gewerbeobjekte.',
  },
  {
    question: 'Arbeiten Sie auch am Wochenende in {city}?',
    answer:
      'Ja, wir passen uns Ihren Betriebszeiten an. Ob früh morgens, spät abends oder am Wochenende – wir reinigen dann, wenn es für Sie am besten passt.',
  },
  {
    question: 'Nutzen Sie umweltfreundliche Reinigungsmittel?',
    answer:
      'Wir setzen verstärkt auf nachhaltige und umweltschonende Reinigungsmittel. Auf Wunsch reinigen wir Ihr Objekt in {city} auch komplett mit Öko-Produkten.',
  },
]

// ============================================================================
// Hilfsfunktionen
// ============================================================================

/**
 * Deterministischer Hash für konsistente Auswahl
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

/**
 * Wählt deterministisch ein Element aus einem Array
 */
function selectFromArray<T>(arr: T[], seed: string, offset = 0): T {
  const hash = hashString(seed + offset.toString())
  return arr[hash % arr.length]
}

/**
 * Ermittelt die Stadtgröße basierend auf Einwohnerzahl
 */
function getCitySize(population?: number): CitySize {
  if (!population) return 'klein'
  if (population > 500000) return 'gross'
  if (population > 100000) return 'mittel'
  return 'klein'
}

/**
 * Ersetzt Platzhalter im Text
 */
function replacePlaceholders(
  text: string,
  city: City,
  region: string
): string {
  return text
    .replace(/{city}/g, city.name)
    .replace(/{region}/g, region)
    .replace(/{plz}/g, city.plz)
}

// ============================================================================
// Haupt-Export-Funktionen
// ============================================================================

/**
 * Generiert einen einzigartigen Intro-Text für eine Stadt
 */
export function generateCityIntro(city: City): string {
  // Wenn Custom-Intro existiert, dieses verwenden
  if (city.intro) return city.intro

  const region = city.region as Bundesland
  const regionName = REGIONAL_NAMES[region] || region
  const citySize = getCitySize(city.population)

  // Layer 1: Regionales Intro
  const regionalIntros = REGIONAL_INTROS[region] || REGIONAL_INTROS.Bayern
  const regionalIntro = selectFromArray(regionalIntros, city.slug, 0)

  // Layer 2: Stadtgröße-Ergänzung
  const sizeTemplates = CITY_SIZE_TEMPLATES[citySize]
  const sizeText = selectFromArray(sizeTemplates, city.slug, 1)

  // Layer 3: Variierte Adjektive einbauen
  const quality = selectFromArray(ADJECTIVE_POOLS.quality, city.slug, 2)
  const reliability = selectFromArray(ADJECTIVE_POOLS.reliability, city.slug, 3)

  // Kombiniere zu einzigartigem Text
  const intro = replacePlaceholders(regionalIntro, city, regionName)
  const size = replacePlaceholders(sizeText, city, regionName)

  // Zusätzlicher Satz mit variierten Adjektiven
  const closing = `Unsere ${quality}en und ${reliability}en Reinigungsteams sorgen für hygienische Sauberkeit in Ihrem Unternehmen.`

  return `${intro} ${size} ${closing}`
}

/**
 * Generiert Highlights für eine Stadt
 */
export function generateCityHighlights(city: City): string[] {
  // Wenn Custom-Highlights existieren, diese verwenden
  if (city.highlights && city.highlights.length > 0) return city.highlights

  const citySize = getCitySize(city.population)
  const region = city.region as Bundesland
  const regionName = REGIONAL_NAMES[region] || region

  const baseHighlights = [
    `Erfahrene Reinigungsteams in ${city.name}`,
    `Flexible Einsatzzeiten nach Ihren Wünschen`,
    `Moderne Reinigungstechnik und -methoden`,
    `Persönlicher Ansprechpartner für Ihr Objekt`,
  ]

  // Stadtgrößen-spezifische Highlights
  if (citySize === 'gross') {
    baseHighlights.push(`Erfahrung mit Großprojekten in ${regionName}`)
    baseHighlights.push(`24/7 Notfall-Service verfügbar`)
  } else if (citySize === 'mittel') {
    baseHighlights.push(`Kurze Reaktionszeiten in ${city.name}`)
    baseHighlights.push(`Regelmäßige Qualitätskontrollen`)
  } else {
    baseHighlights.push(`Persönlicher Service vor Ort`)
    baseHighlights.push(`Kurze Anfahrtswege in der Region`)
  }

  // Wähle 4 Highlights deterministisch aus
  const selected: string[] = []
  for (let i = 0; i < 4; i++) {
    const highlight = selectFromArray(baseHighlights, city.slug, i + 10)
    if (!selected.includes(highlight)) {
      selected.push(highlight)
    }
  }

  return selected.length >= 3 ? selected : baseHighlights.slice(0, 4)
}

/**
 * Generiert FAQs für eine Stadt
 */
export function generateCityFAQs(city: City): FAQ[] {
  // Wenn Custom-FAQs existieren, diese verwenden
  if (city.faqs && city.faqs.length > 0) return city.faqs

  const region = city.region as Bundesland
  const regionName = REGIONAL_NAMES[region] || region

  // Wähle 4-5 FAQs deterministisch aus
  const numFAQs = 4 + (hashString(city.slug) % 2) // 4 oder 5
  const selectedFAQs: FAQ[] = []

  for (let i = 0; i < numFAQs && i < FAQ_TEMPLATES.length; i++) {
    const template = selectFromArray(FAQ_TEMPLATES, city.slug, i + 20)
    if (!selectedFAQs.some((f) => f.question === template.question)) {
      selectedFAQs.push({
        question: replacePlaceholders(template.question, city, regionName),
        answer: replacePlaceholders(template.answer, city, regionName),
      })
    }
  }

  return selectedFAQs
}

/**
 * Generiert eine Meta-Description für eine Stadt
 */
export function generateCityMetaDescription(city: City): string {
  const region = city.region as Bundesland
  const regionName = REGIONAL_NAMES[region] || region
  const citySize = getCitySize(city.population)

  const templates = {
    gross: `Professionelle Gebäudereinigung in ${city.name} ✓ Büroreinigung ✓ Unterhaltsreinigung ✓ Großstadterfahrung ✓ Jetzt Angebot anfordern!`,
    mittel: `Gebäudereinigung ${city.name} (${regionName}) ✓ Büros ✓ Praxen ✓ Gewerbe ✓ Zuverlässig & gründlich ✓ Kostenlose Beratung!`,
    klein: `Ihr Partner für Gebäudereinigung in ${city.name} und Umgebung ✓ Persönlicher Service ✓ Faire Preise ✓ Jetzt anfragen!`,
  }

  return templates[citySize]
}

/**
 * Prüft ob eine Stadt Custom-Content hat
 */
export function hasCustomContent(city: City): boolean {
  return !!(
    city.intro ||
    (city.highlights && city.highlights.length > 0) ||
    (city.faqs && city.faqs.length > 0)
  )
}
