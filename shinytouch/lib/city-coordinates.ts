/**
 * Koordinaten für deutsche Orte
 * Verwendet für die Positionierung auf der interaktiven Karte
 *
 * Quelle: SimpleMaps Germany Cities Database (MIT Lizenz)
 * https://simplemaps.com/data/de-cities
 */

export interface CityCoordinate {
  lat: number
  lng: number
}

export const CITY_COORDINATES: Record<string, CityCoordinate> = {
  // Bayern (Heimatregion)
  bamberg: { lat: 49.8988, lng: 10.9028 },
  nuernberg: { lat: 49.4521, lng: 11.0767 },
  muenchen: { lat: 48.1351, lng: 11.582 },
  wuerzburg: { lat: 49.7913, lng: 9.9534 },
  erlangen: { lat: 49.5897, lng: 11.0078 },
  fuerth: { lat: 49.4774, lng: 10.9887 },
  bayreuth: { lat: 49.9456, lng: 11.5713 },
  augsburg: { lat: 48.3705, lng: 10.8978 },
  regensburg: { lat: 49.0134, lng: 12.1016 },
  ingolstadt: { lat: 48.7665, lng: 11.4258 },

  // Berlin
  berlin: { lat: 52.52, lng: 13.405 },

  // Hamburg
  hamburg: { lat: 53.5511, lng: 9.9937 },

  // NRW
  koeln: { lat: 50.9375, lng: 6.9603 },
  duesseldorf: { lat: 51.2277, lng: 6.7735 },
  dortmund: { lat: 51.5136, lng: 7.4653 },
  essen: { lat: 51.4556, lng: 7.0116 },
  duisburg: { lat: 51.4344, lng: 6.7623 },
  bochum: { lat: 51.4818, lng: 7.2162 },
  wuppertal: { lat: 51.2562, lng: 7.1508 },
  bielefeld: { lat: 52.0302, lng: 8.5325 },
  bonn: { lat: 50.7374, lng: 7.0982 },
  muenster: { lat: 51.9607, lng: 7.6261 },

  // Hessen
  frankfurt: { lat: 50.1109, lng: 8.6821 },
  wiesbaden: { lat: 50.0826, lng: 8.2401 },
  kassel: { lat: 51.3127, lng: 9.4797 },
  darmstadt: { lat: 49.8728, lng: 8.6512 },

  // Baden-Württemberg
  stuttgart: { lat: 48.7758, lng: 9.1829 },
  karlsruhe: { lat: 49.0069, lng: 8.4037 },
  mannheim: { lat: 49.4875, lng: 8.466 },
  freiburg: { lat: 47.999, lng: 7.8421 },
  heidelberg: { lat: 49.3988, lng: 8.6724 },
  ulm: { lat: 48.4011, lng: 9.9876 },

  // Sachsen
  leipzig: { lat: 51.3397, lng: 12.3731 },
  dresden: { lat: 51.0504, lng: 13.7373 },
  chemnitz: { lat: 50.8278, lng: 12.9214 },

  // Niedersachsen
  hannover: { lat: 52.3759, lng: 9.732 },
  braunschweig: { lat: 52.2689, lng: 10.5268 },
  oldenburg: { lat: 53.1435, lng: 8.2146 },
  osnabrueck: { lat: 52.2799, lng: 8.0472 },

  // Bremen
  bremen: { lat: 53.0793, lng: 8.8017 },

  // Schleswig-Holstein
  kiel: { lat: 54.3233, lng: 10.1228 },
  luebeck: { lat: 53.8655, lng: 10.6866 },

  // Rheinland-Pfalz
  mainz: { lat: 49.9929, lng: 8.2473 },
  koblenz: { lat: 50.3569, lng: 7.5889 },

  // Saarland
  saarbruecken: { lat: 49.2402, lng: 6.9969 },

  // Thüringen
  erfurt: { lat: 50.9848, lng: 11.0299 },
  jena: { lat: 50.9272, lng: 11.5892 },

  // Sachsen-Anhalt
  magdeburg: { lat: 52.1205, lng: 11.6276 },
  halle: { lat: 51.4828, lng: 11.97 },

  // Brandenburg
  potsdam: { lat: 52.3906, lng: 13.0645 },

  // Mecklenburg-Vorpommern
  rostock: { lat: 54.0924, lng: 12.0991 },
  schwerin: { lat: 53.6355, lng: 11.4012 },

  // Weitere wichtige Orte Bayern
  aschaffenburg: { lat: 49.9769, lng: 9.1583 },
  schweinfurt: { lat: 50.0492, lng: 10.2267 },
  passau: { lat: 48.5665, lng: 13.4319 },
  landshut: { lat: 48.545, lng: 12.1508 },
  rosenheim: { lat: 47.8561, lng: 12.1289 },
  kempten: { lat: 47.7267, lng: 10.3168 },
  ansbach: { lat: 49.3008, lng: 10.5719 },
  hof: { lat: 50.3135, lng: 11.9128 },
  coburg: { lat: 50.2594, lng: 10.9647 },
  straubing: { lat: 48.8817, lng: 12.5731 },
  freising: { lat: 48.4028, lng: 11.7489 },
  neu_ulm: { lat: 48.3933, lng: 10.0128 },

  // Weitere NRW
  aachen: { lat: 50.7753, lng: 6.0839 },
  gelsenkirchen: { lat: 51.5177, lng: 7.0857 },
  krefeld: { lat: 51.3388, lng: 6.5853 },
  moenchengladbach: { lat: 51.1805, lng: 6.4428 },
  oberhausen: { lat: 51.4696, lng: 6.8514 },
  hagen: { lat: 51.3671, lng: 7.4633 },
  hamm: { lat: 51.6739, lng: 7.8159 },
  muelheim: { lat: 51.4272, lng: 6.8826 },
  leverkusen: { lat: 51.0459, lng: 6.9844 },
  solingen: { lat: 51.1652, lng: 7.0671 },
  herne: { lat: 51.5369, lng: 7.2211 },
  neuss: { lat: 51.2042, lng: 6.6879 },
  paderborn: { lat: 51.7189, lng: 8.7575 },
  recklinghausen: { lat: 51.614, lng: 7.1979 },
  bottrop: { lat: 51.5247, lng: 6.9286 },
  remscheid: { lat: 51.1787, lng: 7.1896 },
  siegen: { lat: 50.8748, lng: 8.0243 },
  guetersloh: { lat: 51.9032, lng: 8.3858 },
  moers: { lat: 51.4528, lng: 6.6261 },
  witten: { lat: 51.4434, lng: 7.3352 },
  iserlohn: { lat: 51.3758, lng: 7.7006 },
  minden: { lat: 52.2886, lng: 8.9178 },
  detmold: { lat: 51.9386, lng: 8.8792 },

  // Weitere Hessen
  offenbach: { lat: 50.0956, lng: 8.7761 },
  giessen: { lat: 50.5841, lng: 8.6784 },
  marburg: { lat: 50.8021, lng: 8.7711 },
  fulda: { lat: 50.5528, lng: 9.6756 },
  hanau: { lat: 50.1326, lng: 8.9217 },
  ruesselsheim: { lat: 49.9953, lng: 8.4119 },

  // Weitere Baden-Württemberg
  heilbronn: { lat: 49.1427, lng: 9.2109 },
  pforzheim: { lat: 48.8922, lng: 8.6947 },
  reutlingen: { lat: 48.4914, lng: 9.2043 },
  tuebingen: { lat: 48.5216, lng: 9.0576 },
  ludwigsburg: { lat: 48.8975, lng: 9.1922 },
  esslingen: { lat: 48.7433, lng: 9.3048 },
  konstanz: { lat: 47.6633, lng: 9.175 },
  sindelfingen: { lat: 48.7133, lng: 9.0028 },
  villingen_schwenningen: { lat: 48.0603, lng: 8.4617 },
  friedrichshafen: { lat: 47.6536, lng: 9.4797 },
  offenburg: { lat: 48.4714, lng: 7.9428 },
  goeppingen: { lat: 48.7025, lng: 9.6522 },
  aalen: { lat: 48.8378, lng: 10.0933 },
  ravensburg: { lat: 47.7822, lng: 9.6128 },

  // Weitere Niedersachsen
  wolfsburg: { lat: 52.4227, lng: 10.7865 },
  salzgitter: { lat: 52.1539, lng: 10.3336 },
  hildesheim: { lat: 52.1508, lng: 9.9511 },
  goettingen: { lat: 51.5328, lng: 9.9353 },
  wilhelmshaven: { lat: 53.5306, lng: 8.1067 },
  delmenhorst: { lat: 53.0506, lng: 8.6317 },
  celle: { lat: 52.6228, lng: 10.0803 },
  lueneburg: { lat: 53.2464, lng: 10.4114 },
  emden: { lat: 53.3669, lng: 7.2058 },
  lingen: { lat: 52.5228, lng: 7.3128 },
  nordhorn: { lat: 52.4339, lng: 7.0692 },
  hameln: { lat: 52.1039, lng: 9.3567 },
  wolfenbuettel: { lat: 52.1642, lng: 10.5411 },
  cuxhaven: { lat: 53.8614, lng: 8.6939 },

  // Weitere Sachsen
  zwickau: { lat: 50.7189, lng: 12.4958 },
  plauen: { lat: 50.4942, lng: 12.1369 },
  goerlitz: { lat: 51.1528, lng: 14.9872 },
  freiberg: { lat: 50.9117, lng: 13.3428 },
  bautzen: { lat: 51.1814, lng: 14.4244 },
  pirna: { lat: 50.9619, lng: 13.9386 },
  freital: { lat: 51.0167, lng: 13.6483 },
  meissen: { lat: 51.1667, lng: 13.4667 },

  // Weitere Thüringen
  gera: { lat: 50.8781, lng: 12.0833 },
  weimar: { lat: 50.9803, lng: 11.3297 },
  gotha: { lat: 50.9489, lng: 10.7181 },
  nordhausen: { lat: 51.5047, lng: 10.7911 },
  eisenach: { lat: 50.9747, lng: 10.3194 },
  suhl: { lat: 50.6097, lng: 10.6939 },
  altenburg: { lat: 50.9878, lng: 12.4364 },

  // Weitere Sachsen-Anhalt
  dessau_rosslau: { lat: 51.8319, lng: 12.2419 },
  wittenberg: { lat: 51.8667, lng: 12.65 },
  stendal: { lat: 52.6058, lng: 11.8589 },
  halberstadt: { lat: 51.8958, lng: 11.0461 },
  bernburg: { lat: 51.7942, lng: 11.7403 },
  wernigerode: { lat: 51.8347, lng: 10.7853 },
  quedlinburg: { lat: 51.7889, lng: 11.15 },

  // Weitere Brandenburg
  cottbus: { lat: 51.7606, lng: 14.3342 },
  brandenburg: { lat: 52.4125, lng: 12.5317 },
  frankfurt_oder: { lat: 52.3472, lng: 14.5506 },
  eberswalde: { lat: 52.8344, lng: 13.8247 },
  falkensee: { lat: 52.5608, lng: 13.0931 },
  oranienburg: { lat: 52.7544, lng: 13.2378 },
  schwedt: { lat: 53.0631, lng: 14.2831 },

  // Weitere Schleswig-Holstein
  flensburg: { lat: 54.7936, lng: 9.4469 },
  neumuenster: { lat: 54.0714, lng: 9.9853 },
  norderstedt: { lat: 53.6961, lng: 9.9928 },
  elmshorn: { lat: 53.7531, lng: 9.6528 },
  pinneberg: { lat: 53.6603, lng: 9.7972 },
  itzehoe: { lat: 53.9256, lng: 9.5153 },
  wedel: { lat: 53.5836, lng: 9.7081 },

  // Weitere Rheinland-Pfalz
  ludwigshafen: { lat: 49.4811, lng: 8.4353 },
  trier: { lat: 49.7492, lng: 6.6386 },
  kaiserslautern: { lat: 49.4447, lng: 7.7689 },
  worms: { lat: 49.6328, lng: 8.3567 },
  neuwied: { lat: 50.4286, lng: 7.4614 },
  neustadt: { lat: 49.3508, lng: 8.1392 },
  speyer: { lat: 49.3175, lng: 8.4314 },
  bad_kreuznach: { lat: 49.8414, lng: 7.8678 },
  landau: { lat: 49.1983, lng: 8.1178 },
  frankenthal: { lat: 49.5342, lng: 8.3528 },
  pirmasens: { lat: 49.2006, lng: 7.6056 },
  zweibruecken: { lat: 49.2467, lng: 7.3636 },

  // Mecklenburg-Vorpommern weitere
  stralsund: { lat: 54.3092, lng: 13.0819 },
  greifswald: { lat: 54.0958, lng: 13.3817 },
  neubrandenburg: { lat: 53.5569, lng: 13.2611 },
  wismar: { lat: 53.8917, lng: 11.4667 },
  guestrow: { lat: 53.7972, lng: 12.1756 },
}

/**
 * Deutschland-Grenzen für Koordinaten-Projektion
 */
export const GERMANY_BOUNDS = {
  lat: { min: 47.27, max: 55.1 },
  lng: { min: 5.87, max: 15.04 },
}

/**
 * Projiziert geografische Koordinaten auf SVG-Position
 */
export function projectToSVG(
  lat: number,
  lng: number,
  width: number,
  height: number
): { x: number; y: number } {
  const { lat: latBounds, lng: lngBounds } = GERMANY_BOUNDS

  // Normalisieren auf 0-1
  const x = (lng - lngBounds.min) / (lngBounds.max - lngBounds.min)
  const y = 1 - (lat - latBounds.min) / (latBounds.max - latBounds.min) // Y invertiert

  return {
    x: x * width,
    y: y * height,
  }
}

/**
 * Region-Zentren für Fallback-Koordinaten
 */
export const REGION_CENTERS: Record<string, CityCoordinate> = {
  'Bayern': { lat: 48.79, lng: 11.5 },
  'NRW': { lat: 51.5, lng: 7.5 },
  'Baden-Württemberg': { lat: 48.6, lng: 9.0 },
  'Niedersachsen': { lat: 52.6, lng: 9.5 },
  'Hessen': { lat: 50.5, lng: 8.8 },
  'Sachsen': { lat: 51.0, lng: 13.2 },
  'Rheinland-Pfalz': { lat: 49.8, lng: 7.5 },
  'Berlin': { lat: 52.52, lng: 13.405 },
  'Schleswig-Holstein': { lat: 54.2, lng: 9.8 },
  'Brandenburg': { lat: 52.4, lng: 13.5 },
  'Sachsen-Anhalt': { lat: 51.9, lng: 11.5 },
  'Thüringen': { lat: 50.9, lng: 11.0 },
  'Hamburg': { lat: 53.55, lng: 10.0 },
  'Mecklenburg-Vorpommern': { lat: 53.8, lng: 12.2 },
  'Saarland': { lat: 49.4, lng: 7.0 },
  'Bremen': { lat: 53.08, lng: 8.8 },
}

/**
 * Holt Koordinaten für einen Ort mit Fallback auf Region-Zentrum
 */
export function getCityCoordinates(city: { slug: string; region: string }): CityCoordinate | null {
  // Exakte Koordinaten wenn vorhanden
  if (CITY_COORDINATES[city.slug]) {
    return CITY_COORDINATES[city.slug]
  }

  // Fallback: Region-Zentrum mit deterministischem Offset basierend auf Slug
  const regionCenter = REGION_CENTERS[city.region]
  if (regionCenter) {
    // Deterministischer "Hash" basierend auf Slug für konsistente Positionen
    const hash = city.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const hash2 = city.slug.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0)

    // Offset im Bereich von ca. +/- 0.5 Grad (ca. 50km)
    const latOffset = ((hash % 100) - 50) * 0.01
    const lngOffset = ((hash2 % 100) - 50) * 0.01

    return {
      lat: regionCenter.lat + latOffset,
      lng: regionCenter.lng + lngOffset
    }
  }

  return null
}
