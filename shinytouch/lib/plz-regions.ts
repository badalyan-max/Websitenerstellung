/**
 * PLZ-zu-Bundesland Mapping
 * Basierend auf deutschen Postleitzahlen-Bereichen
 */

export type Bundesland =
  | 'Baden-Württemberg'
  | 'Bayern'
  | 'Berlin'
  | 'Brandenburg'
  | 'Bremen'
  | 'Hamburg'
  | 'Hessen'
  | 'Mecklenburg-Vorpommern'
  | 'Niedersachsen'
  | 'NRW'
  | 'Rheinland-Pfalz'
  | 'Saarland'
  | 'Sachsen'
  | 'Sachsen-Anhalt'
  | 'Schleswig-Holstein'
  | 'Thüringen'

/**
 * Detailliertes PLZ-Mapping zu Bundesländern
 * Format: [PLZ-Start, PLZ-Ende, Bundesland]
 */
const PLZ_RANGES: [number, number, Bundesland][] = [
  // Sachsen, Sachsen-Anhalt, Thüringen (01-09)
  [1000, 1999, 'Sachsen'], // Dresden
  [2000, 2999, 'Sachsen'], // Bautzen
  [3000, 3999, 'Sachsen'], // Görlitz
  [4000, 4999, 'Sachsen'], // Leipzig
  [6000, 6999, 'Sachsen-Anhalt'], // Halle, Dessau
  [7000, 7999, 'Thüringen'], // Gera, Jena
  [8000, 8999, 'Sachsen'], // Zwickau, Chemnitz
  [9000, 9999, 'Sachsen'], // Plauen, Chemnitz

  // Berlin, Brandenburg (10-19)
  [10000, 14999, 'Berlin'],
  [15000, 16999, 'Brandenburg'],
  [17000, 19999, 'Mecklenburg-Vorpommern'],

  // Hamburg, Schleswig-Holstein, Niedersachsen (20-29)
  [20000, 21999, 'Hamburg'],
  [22000, 22999, 'Hamburg'],
  [23000, 25999, 'Schleswig-Holstein'],
  [26000, 27999, 'Niedersachsen'],
  [28000, 28999, 'Bremen'],
  [29000, 29999, 'Niedersachsen'],

  // Niedersachsen (30-39)
  [30000, 31999, 'Niedersachsen'], // Hannover
  [32000, 33999, 'NRW'], // Bielefeld, Paderborn (gehört zu NRW!)
  [34000, 34999, 'Hessen'], // Kassel
  [35000, 35999, 'Hessen'], // Gießen
  [36000, 36999, 'Hessen'], // Fulda
  [37000, 37999, 'Niedersachsen'], // Göttingen
  [38000, 39999, 'Niedersachsen'], // Braunschweig, Wolfsburg

  // NRW (40-59)
  [40000, 41999, 'NRW'], // Düsseldorf
  [42000, 42999, 'NRW'], // Wuppertal
  [44000, 44999, 'NRW'], // Dortmund
  [45000, 45999, 'NRW'], // Essen
  [46000, 47999, 'NRW'], // Oberhausen, Duisburg
  [48000, 48999, 'NRW'], // Münster
  [49000, 49999, 'Niedersachsen'], // Osnabrück
  [50000, 53999, 'NRW'], // Köln, Bonn
  [54000, 54999, 'Rheinland-Pfalz'], // Trier
  [55000, 55999, 'Rheinland-Pfalz'], // Mainz
  [56000, 56999, 'Rheinland-Pfalz'], // Koblenz
  [57000, 57999, 'NRW'], // Siegen
  [58000, 59999, 'NRW'], // Hagen, Hamm

  // Hessen (60-69)
  [60000, 63999, 'Hessen'], // Frankfurt
  [64000, 64999, 'Hessen'], // Darmstadt
  [65000, 65999, 'Hessen'], // Wiesbaden
  [66000, 66999, 'Saarland'], // Saarbrücken
  [67000, 67999, 'Rheinland-Pfalz'], // Ludwigshafen
  [68000, 68999, 'Baden-Württemberg'], // Mannheim
  [69000, 69999, 'Baden-Württemberg'], // Heidelberg

  // Baden-Württemberg (70-79)
  [70000, 76999, 'Baden-Württemberg'], // Stuttgart, Karlsruhe
  [77000, 77999, 'Baden-Württemberg'], // Offenburg
  [78000, 78999, 'Baden-Württemberg'], // Villingen-Schwenningen
  [79000, 79999, 'Baden-Württemberg'], // Freiburg

  // Bayern (80-89, 90-97)
  [80000, 85999, 'Bayern'], // München
  [86000, 86999, 'Bayern'], // Augsburg
  [87000, 87999, 'Bayern'], // Kempten
  [88000, 88999, 'Baden-Württemberg'], // Friedrichshafen (BW!)
  [89000, 89999, 'Bayern'], // Ulm (teils BW)

  // Bayern, Thüringen (90-99)
  [90000, 92999, 'Bayern'], // Nürnberg
  [93000, 94999, 'Bayern'], // Regensburg
  [95000, 96999, 'Bayern'], // Bayreuth, Bamberg
  [97000, 97999, 'Bayern'], // Würzburg
  [98000, 98999, 'Thüringen'], // Suhl
  [99000, 99999, 'Thüringen'], // Erfurt
]

/**
 * Ermittelt das Bundesland basierend auf der Postleitzahl
 */
export function getBundeslandByPLZ(plz: string): Bundesland {
  const plzNum = parseInt(plz.substring(0, 5), 10)

  for (const [start, end, bundesland] of PLZ_RANGES) {
    if (plzNum >= start && plzNum <= end) {
      return bundesland
    }
  }

  // Fallback: Versuche grobe Zuordnung basierend auf erster Ziffer
  const firstDigit = plz.charAt(0)
  const fallbackMap: Record<string, Bundesland> = {
    '0': 'Sachsen',
    '1': 'Berlin',
    '2': 'Hamburg',
    '3': 'Niedersachsen',
    '4': 'NRW',
    '5': 'NRW',
    '6': 'Hessen',
    '7': 'Baden-Württemberg',
    '8': 'Bayern',
    '9': 'Bayern',
  }

  return fallbackMap[firstDigit] || 'Bayern'
}

/**
 * Alle Bundesländer sortiert
 */
export const BUNDESLAENDER: Bundesland[] = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'NRW',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
]

/**
 * Regionale Bezeichnungen für Content-Generierung
 */
export const REGIONAL_NAMES: Record<Bundesland, string> = {
  'Baden-Württemberg': 'Baden-Württemberg',
  Bayern: 'Bayern',
  Berlin: 'Berlin',
  Brandenburg: 'Brandenburg',
  Bremen: 'Bremen',
  Hamburg: 'Hamburg',
  Hessen: 'Hessen',
  'Mecklenburg-Vorpommern': 'Mecklenburg-Vorpommern',
  Niedersachsen: 'Niedersachsen',
  NRW: 'Nordrhein-Westfalen',
  'Rheinland-Pfalz': 'Rheinland-Pfalz',
  Saarland: 'Saarland',
  Sachsen: 'Sachsen',
  'Sachsen-Anhalt': 'Sachsen-Anhalt',
  'Schleswig-Holstein': 'Schleswig-Holstein',
  Thüringen: 'Thüringen',
}
