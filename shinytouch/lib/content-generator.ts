/**
 * Content-Generator für SEO-optimierte Ortsseiten
 * Generiert einzigartigen Content basierend auf Region, Ortsgröße und Synonymen
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
// Layer 2: Ortsgröße-Templates
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
  // ========== NEU: People Also Ask Fragen (DataForSEO Research 2026-01) ==========
  // Kosten-Fragen
  {
    question: 'Wie viel verlangen Reinigungsfirmen pro Stunde?',
    answer:
      'Reinigungsfirmen in {city} verlangen 20-35€/Stunde für Standardreinigung. Grundreinigung kostet 35-50€/Stunde. Preise variieren nach Region, Objektgröße und Aufwand.',
  },
  {
    question: 'Was kostet 100 qm putzen?',
    answer:
      'Für 100 qm Bürofläche in {city} rechnen Sie mit 50-150€ pro Reinigung, je nach Verschmutzungsgrad und Frequenz. Monatliche Pauschalen ab 200€ möglich.',
  },
  {
    question: 'Wie kalkuliert man in der Gebäudereinigung?',
    answer:
      'Kalkulation basiert auf: Quadratmeterzahl, Reinigungsart, Frequenz und Anfahrt. Wir erstellen individuelle Angebote nach kostenloser Objektbesichtigung in {city}.',
  },
  // Treppenhausreinigung
  {
    question: 'Was kostet eine Treppenhausreinigung?',
    answer:
      'Treppenhausreinigung in {city} kostet 30-80€ pro Reinigung, abhängig von Stockwerken und Größe. Monatliche Pauschalen für regelmäßige Reinigung ab 60€.',
  },
  {
    question: 'Wie oft muss das Treppenhaus gereinigt werden?',
    answer:
      'Empfohlen: 1-2x wöchentlich bei Mehrfamilienhäusern. Bei hohem Publikumsverkehr täglich. Wir erstellen individuelle Reinigungspläne für Objekte in {city}.',
  },
  {
    question: 'Was nimmt man für eine Treppenhausreinigung?',
    answer:
      'Professionelle Treppenhausreinigung umfasst: Fegen, Wischen, Handläufe, Geländer, Fensterbänke, Briefkästen. Wir nutzen materialschonende Reinigungsmittel.',
  },
  // Baureinigung
  {
    question: 'Wer muss die Reinigung nach Bauarbeiten bezahlen?',
    answer:
      'Bauherr oder Auftraggeber trägt die Kosten. Oft ist Baureinigung im Bauvertrag geregelt. Wir bieten transparente Festpreise für Baureinigung in {city}.',
  },
  {
    question: 'Was ist eine Baureinigung?',
    answer:
      'Baureinigung ist die professionelle Reinigung nach Bau- oder Renovierungsarbeiten: Entfernung von Staub, Mörtelresten, Kleberückständen und Schutzfolien.',
  },
  {
    question: 'Wie sauber muss ein Handwerker die Baustelle verlassen?',
    answer:
      'Handwerker müssen groben Schmutz entfernen. Feinreinigung ist meist nicht im Handwerkerauftrag enthalten. Professionelle Baureinigung übernehmen wir in {city}.',
  },
  {
    question: 'Wie hoch sind die Kosten für die Bauendreinigung?',
    answer:
      'Bauendreinigung kostet 3-8€/m² in {city}, je nach Verschmutzungsgrad. Für 100m² rechnen Sie mit 300-800€. Kostenlose Besichtigung und Festpreisangebot.',
  },
  // Glasreinigung
  {
    question: 'Was kostet eine professionelle Glasreinigung?',
    answer:
      'Professionelle Glasreinigung in {city} kostet 2-5€ pro Fenster (beidseitig) oder 25-40€/Stunde. Rahmenreinigung und schwer zugängliche Fenster kosten mehr.',
  },
  {
    question: 'Wie viel kostet es, 10 Fenster zu putzen?',
    answer:
      '10 Standardfenster (beidseitig) kosten in {city} ca. 20-50€. Mit Rahmen und Falzen 40-80€. Wir bieten transparente Festpreise nach Besichtigung.',
  },
  {
    question: 'Wie berechnet man den Preis für die Glasreinigung?',
    answer:
      'Glasreinigung wird pro Fenster, pro m² Glasfläche oder nach Stundensatz berechnet. Faktoren: Fenstergröße, Zugänglichkeit, Verschmutzung. Angebot in {city} anfordern.',
  },
  {
    question: 'Was verwenden Profis zum Fensterputzen?',
    answer:
      'Profis nutzen: Einwascher, Abzieher, Mikrofasertücher, destilliertes Wasser und spezielle Glasreiniger. Für Hochhäuser: Teleskopstangen oder Hebebühnen.',
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
 * Ermittelt die Ortsgröße basierend auf Einwohnerzahl
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
 * Generiert einen einzigartigen Intro-Text für einen Ort
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

  // Layer 2: Ortsgröße-Ergänzung
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
 * Generiert Highlights für einen Ort
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

  // Ortsgrößen-spezifische Highlights
  if (citySize === 'gross') {
    baseHighlights.push(`Erfahrung mit Großprojekten in ${regionName}`)
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
 * Generiert FAQs für einen Ort
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
 * Generiert eine Meta-Description für einen Ort
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
 * Prüft ob ein Ort Custom-Content hat
 */
export function hasCustomContent(city: City): boolean {
  return !!(
    city.intro ||
    (city.highlights && city.highlights.length > 0) ||
    (city.faqs && city.faqs.length > 0)
  )
}

// ============================================================================
// AI Overview Optimierung (300-Zeichen-Regel)
// ============================================================================

/**
 * AI-Optimierte Kurzantworten für Fan-out Optimierung
 * Max 300 Zeichen, faktisch, direkt
 */
const AI_OPTIMIZED_ANSWERS: Record<string, (city: City) => string> = {
  kosten: (city) =>
    `Gebäudereinigung in ${city.name} kostet 15-35€/Stunde oder 0,50-3,00€/m². Monatliche Festpreise ab 150€ für regelmäßige Unterhaltsreinigung. Kostenloses Angebot erhalten.`,

  frequenz: (city) =>
    `Empfohlen: 2-3x wöchentlich für Büros in ${city.name}. Bei hohem Publikumsverkehr täglich. Individuelle Beratung kostenlos. Wir erstellen einen Plan nach Ihrem Bedarf.`,

  start: (city) =>
    `Start innerhalb von 3-5 Werktagen nach Auftragserteilung in ${city.name}. Bei Dringlichkeit Express-Service möglich. Persönliche Objektbesichtigung inklusive.`,

  versicherung: () =>
    `Ja, alle Mitarbeiter sind vollständig haftpflicht- und unfallversichert. Betriebshaftpflicht bis 5 Mio. Euro. Wir arbeiten nur mit festangestelltem Personal.`,

  leistungen: (city) =>
    `In ${city.name}: Büroreinigung, Glasreinigung, Grundreinigung, Unterhaltsreinigung, Baureinigung, Winterdienst. Alle Services aus einer Hand, ein Ansprechpartner.`,

  zeiten: () =>
    `Flexibel nach Ihren Wünschen: Früh ab 5 Uhr, spät bis 22 Uhr, Wochenende möglich. Wir reinigen außerhalb Ihrer Geschäftszeiten. Keine Störung im Arbeitsalltag.`,

  qualitaet: () =>
    `30 Tage risikofrei testen. Regelmäßige Qualitätskontrollen. Fester Ansprechpartner. Bei Unzufriedenheit kostenlose Nachreinigung innerhalb von 24 Stunden.`,

  umwelt: () =>
    `Wir setzen auf umweltschonende Reinigungsmittel und ressourcensparende Methoden. Auf Wunsch 100% Öko-Reinigung verfügbar. Zertifizierte Produkte.`,

  // NEU: People Also Ask Themen (DataForSEO Research 2026-01)
  stundenpreis: (city) =>
    `Reinigungsfirmen in ${city.name} verlangen 20-35€/Stunde für Standardreinigung, 35-50€ für Grundreinigung. Preise variieren nach Region und Aufwand. Festpreise möglich.`,

  treppenhausreinigung: (city) =>
    `Treppenhausreinigung in ${city.name}: 30-80€ pro Reinigung oder ab 60€/Monat. Inkl. Fegen, Wischen, Handläufe, Geländer. 1-2x wöchentlich empfohlen.`,

  baureinigung: (city) =>
    `Baureinigung in ${city.name} kostet 3-8€/m². Für 100m² ca. 300-800€. Entfernung von Baustaub, Mörtel, Kleberesten. Kostenlose Besichtigung und Festpreis.`,

  glasreinigung: (city) =>
    `Glasreinigung in ${city.name}: 2-5€ pro Fenster (beidseitig) oder 25-40€/Stunde. 10 Fenster ca. 20-50€. Rahmenreinigung auf Wunsch inklusive.`,

  quadratmeterpreis: (city) =>
    `Gebäudereinigung in ${city.name}: 0,50-3,00€/m² für Unterhaltsreinigung. 100m² Büro = 50-150€ pro Reinigung. Monatspauschalen ab 200€ verfügbar.`,
}

type AnswerType = keyof typeof AI_OPTIMIZED_ANSWERS

/**
 * Generiert eine AI-optimierte Kurzantwort (max 300 Zeichen)
 * Für die 300-Zeichen-Regel direkt nach H2-Überschriften
 *
 * @param type - Art der Frage (kosten, frequenz, start, etc.)
 * @param city - Ort-Objekt
 * @returns Kurze, faktische Antwort für AI Overview Optimierung
 */
export function generateAIOptimizedAnswer(type: string, city: City): string {
  const answerFn = AI_OPTIMIZED_ANSWERS[type as AnswerType]
  if (!answerFn) {
    return `Professionelle Gebäudereinigung in ${city.name}: Kontaktieren Sie uns für individuelle Beratung und ein kostenloses Angebot.`
  }
  return answerFn(city)
}

/**
 * Alle verfügbaren Antwort-Typen
 */
export function getAvailableAnswerTypes(): string[] {
  return Object.keys(AI_OPTIMIZED_ANSWERS)
}

/**
 * Generiert eine FAQ mit AI-optimierter Kurzantwort
 * Format: Kurze Antwort (300 Zeichen) + Ausführliche Antwort
 */
export function generateAIOptimizedFAQ(
  type: string,
  city: City
): { question: string; shortAnswer: string; longAnswer: string } {
  const questions: Record<string, string> = {
    kosten: `Was kostet Gebäudereinigung in ${city.name}?`,
    frequenz: `Wie oft sollte mein Büro in ${city.name} gereinigt werden?`,
    start: `Wie schnell können Sie in ${city.name} starten?`,
    versicherung: `Sind Ihre Reinigungskräfte versichert?`,
    leistungen: `Welche Reinigungsleistungen bieten Sie in ${city.name}?`,
    zeiten: `Wann wird bei uns gereinigt?`,
    qualitaet: `Wie garantieren Sie die Reinigungsqualität?`,
    umwelt: `Nutzen Sie umweltfreundliche Reinigungsmittel?`,
    // NEU: People Also Ask (2026-01)
    stundenpreis: `Wie viel verlangen Reinigungsfirmen pro Stunde in ${city.name}?`,
    treppenhausreinigung: `Was kostet Treppenhausreinigung in ${city.name}?`,
    baureinigung: `Was kostet Baureinigung in ${city.name}?`,
    glasreinigung: `Was kostet professionelle Glasreinigung in ${city.name}?`,
    quadratmeterpreis: `Was kostet Gebäudereinigung pro m² in ${city.name}?`,
  }

  const longAnswers: Record<string, string> = {
    kosten: `Die genauen Kosten hängen von mehreren Faktoren ab: Objektgröße, Reinigungsfrequenz, gewünschte Leistungen und Erreichbarkeit. Für ein 100m² Büro mit wöchentlicher Reinigung liegen die monatlichen Kosten typischerweise zwischen 200-400€. Wir erstellen Ihnen gerne ein individuelles Angebot nach einer kostenlosen Objektbesichtigung.`,
    frequenz: `Die optimale Reinigungsfrequenz richtet sich nach der Nutzungsintensität, Mitarbeiterzahl und Art des Geschäfts. Büros mit normalem Publikumsverkehr profitieren von 2-3 Reinigungen pro Woche. Praxen und Einzelhandel oft täglich. Wir beraten Sie gerne und erstellen einen maßgeschneiderten Reinigungsplan.`,
    start: `Nach Ihrer Anfrage erfolgt innerhalb von 24 Stunden ein Rückruf. Die Objektbesichtigung vereinbaren wir kurzfristig. Nach Auftragserteilung starten unsere Teams in der Regel binnen 3-5 Werktagen. Bei dringendem Bedarf ist auch ein schnellerer Start möglich.`,
    versicherung: `Alle unsere Reinigungskräfte sind über unsere Betriebshaftpflichtversicherung (Deckungssumme 5 Mio. Euro) und Unfallversicherung abgesichert. Wir arbeiten ausschließlich mit festangestelltem Personal und verzichten bewusst auf Subunternehmer. So garantieren wir Qualität und Verlässlichkeit.`,
    leistungen: `Unser Leistungsspektrum umfasst: regelmäßige Unterhaltsreinigung, intensive Grundreinigung, professionelle Glasreinigung, Baureinigung nach Renovierung, Hochdruckreinigung für Außenbereiche, Winterdienst sowie Grünanlagenpflege. Alle Services erhalten Sie aus einer Hand mit einem festen Ansprechpartner.`,
    zeiten: `Wir passen uns Ihren Betriebszeiten an: Reinigung früh morgens ab 5 Uhr, nach Feierabend bis 22 Uhr oder am Wochenende. So stören wir Ihren Arbeitsalltag nicht. Die Zeiten werden individuell vereinbart und können flexibel angepasst werden.`,
    qualitaet: `Qualität sichern wir durch: 30 Tage Testphase ohne Risiko, regelmäßige Qualitätskontrollen durch unsere Objektleiter, feste Reinigungsteams für Ihr Objekt, dokumentierte Leistungsnachweise. Bei Beanstandungen erfolgt kostenlose Nachreinigung innerhalb von 24 Stunden.`,
    umwelt: `Nachhaltigkeit ist uns wichtig. Wir verwenden überwiegend biologisch abbaubare Reinigungsmittel, dosieren sparsam und setzen auf Mikrofasertechnologie. Auf Wunsch bieten wir komplett ökologische Reinigung mit zertifizierten Produkten. Auch bei der Mülltrennung unterstützen wir Sie.`,
    // NEU: People Also Ask (2026-01)
    stundenpreis: `Die Stundenpreise für Gebäudereinigung 2026 variieren je nach Region, Reinigungsart und Anbieter. Standardreinigung (Unterhaltsreinigung) kostet 20-35€/Stunde, Grundreinigung 35-50€/Stunde. In Großstädten sind die Preise höher als in ländlichen Gebieten. Wir bieten transparente Festpreise nach kostenloser Objektbesichtigung.`,
    treppenhausreinigung: `Treppenhausreinigung umfasst: Kehren und Wischen aller Stufen, Reinigung von Handläufen und Geländern, Fensterbänke, Briefkästen und Eingangsbereiche. Bei Mehrfamilienhäusern empfehlen wir 1-2x wöchentliche Reinigung. Die Kosten richten sich nach Stockwerken, Fläche und Verschmutzungsgrad. Monatliche Pauschalen sind möglich.`,
    baureinigung: `Baureinigung (auch Bauendreinigung) erfolgt nach Abschluss von Bau- oder Renovierungsarbeiten. Wir entfernen: Baustaub, Mörtel- und Putzreste, Kleberückstände, Schutzfolien, Farbspritzer. Die Kosten betragen 3-8€/m² je nach Verschmutzungsgrad. Die Bauendreinigung ist üblicherweise vom Bauherrn zu zahlen und oft nicht im Handwerkerauftrag enthalten.`,
    glasreinigung: `Professionelle Glasreinigung 2026 wird pro Fenster (2-5€ beidseitig), pro m² Glasfläche oder nach Stundensatz (25-40€) berechnet. Faktoren: Fenstergröße, Zugänglichkeit (Erdgeschoss vs. Hochhaus), Verschmutzungsgrad, Rahmenreinigung. Wir nutzen professionelle Werkzeuge: Einwascher, Abzieher, Mikrofasertücher, für Hochhäuser Teleskopstangen oder Hebebühnen.`,
    quadratmeterpreis: `Gebäudereinigung nach Quadratmeter: Unterhaltsreinigung 0,50-3,00€/m², Grundreinigung 3-8€/m². Ein 100m² Büro kostet bei wöchentlicher Reinigung ca. 200-400€ monatlich. Der m²-Preis sinkt bei größeren Flächen und regelmäßiger Reinigung. Faktoren: Raumaufteilung, Bodenbelag, Möblierung, Sanitäranlagen.`,
  }

  return {
    question: questions[type] || `Frage zu ${type}`,
    shortAnswer: generateAIOptimizedAnswer(type, city),
    longAnswer: longAnswers[type] || '',
  }
}
