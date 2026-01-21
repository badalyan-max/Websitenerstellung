import type { City } from './types'
import { getBundeslandByPLZ } from './plz-regions'

/**
 * Deutsche Orte für Einsatzorte
 * ~500 Orte mit PLZ, Region und Priority
 *
 * Priority-Stufen:
 * 1 = Top-Orte (> 500.000 Einwohner + Bayern Heimatregion)
 * 2 = Große Orte (100.000 - 500.000 Einwohner)
 * 3 = Weitere Orte (< 100.000 Einwohner)
 */

// Orte mit Custom-Content (Premium)
const PREMIUM_CITIES: City[] = [
  // Bayern (Heimatregion) - Priority 1
  {
    slug: 'bamberg',
    name: 'Bamberg',
    plz: '96047',
    region: 'Bayern',
    priority: 1,
    population: 78000,
    intro:
      'ShinyTouch Gebäudereinigung hat seinen Hauptsitz in Bamberg am Paul-Keller-Ring 41. Als lokales Unternehmen kennen wir jeden Stadtteil – von der UNESCO-Welterbe Altstadt über das Hafengebiet bis zu den Gewerbegebieten in Bamberg-Ost. Unsere Reinigungsteams sind in maximal 15 Minuten bei Ihnen. Wir reinigen Büros, Arztpraxen, Treppenhäuser und Gewerbeobjekte in ganz Bamberg und dem Landkreis Bamberg.',
    highlights: [
      'Firmensitz in Bamberg (Paul-Keller-Ring 41, 96052)',
      'Anfahrt in max. 15 Minuten zu jedem Objekt',
      'Reinigung in allen Stadtteilen: Altstadt, Berggebiet, Gärtnerstadt, Bamberg-Ost',
      'Lokale Referenzkunden auf Anfrage',
      'Persönlicher Ansprechpartner vor Ort',
      'Kenntnis der besonderen Anforderungen historischer Gebäude',
    ],
    faqs: [
      {
        question: 'Wo ist der Firmensitz von ShinyTouch in Bamberg?',
        answer:
          'Unser Hauptsitz befindet sich am Paul-Keller-Ring 41, 96052 Bamberg. Von hier aus koordinieren wir alle Einsätze in Bamberg und der Region Oberfranken.',
      },
      {
        question: 'In welchen Bamberger Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen Bamberger Stadtteilen: Inselstadt (Altstadt), Berggebiet, Gärtnerstadt, Bamberg-Ost, Bamberg-Süd, Gaustadt, Bug, Wildensorg und dem gesamten Landkreis Bamberg.',
      },
      {
        question: 'Wie schnell können Sie in Bamberg vor Ort sein?',
        answer:
          'Da unser Firmensitz in Bamberg ist, erreichen unsere Teams jeden Standort in der Stadt innerhalb von 15 Minuten. Bei Notfällen auch kurzfristiger.',
      },
      {
        question: 'Reinigen Sie auch historische Gebäude in der Bamberger Altstadt?',
        answer:
          'Ja, wir haben Erfahrung mit denkmalgeschützten Gebäuden in der UNESCO-Welterbe Altstadt. Wir verwenden schonende Reinigungsmethoden für historische Substanz.',
      },
      {
        question: 'Was kostet Büroreinigung in Bamberg?',
        answer:
          'Büroreinigung in Bamberg kostet 20-30€/Stunde oder ab 0,50€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 250-350€/Monat. Kostenloses Angebot anfordern!',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Bamberg an?',
        answer:
          'Ja, Treppenhausreinigung ist einer unserer Schwerpunkte in Bamberg. Für Hausverwaltungen und Eigentümergemeinschaften bieten wir regelmäßige Reinigung ab 40€/Woche.',
      },
    ],
  },
  {
    slug: 'nuernberg',
    name: 'Nürnberg',
    plz: '90402',
    region: 'Bayern',
    priority: 1,
    population: 520000,
    intro:
      'Gebäudereinigung in Nürnberg – mit lokalem Team direkt vor Ort. Wir reinigen in allen Stadtteilen: Altstadt (St. Lorenz, St. Sebald), Gostenhof, St. Johannis, Langwasser, Mögeldorf, Erlenstegen, Schweinau und Zerzabelshof. Unsere Nürnberger Mitarbeiter betreuen Bürogebäude, Messeobjekte, Gewerbeflächen und öffentliche Einrichtungen in der gesamten Metropolregion.',
    highlights: [
      'Lokales Reinigungsteam direkt in Nürnberg stationiert',
      'Reinigung in allen 87 Stadtbezirken',
      'Erfahrung mit Messeobjekten (Nürnberg Messe)',
      'Flexible Zeiten: Vor/nach Geschäftszeiten',
      'Persönlicher Ansprechpartner für Nürnberger Kunden',
      'Bei Großprojekten: Zusammenarbeit mit lokalen Partnern',
    ],
    faqs: [
      {
        question: 'In welchen Nürnberger Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen Nürnberger Stadtteilen: Altstadt (St. Lorenz, St. Sebald), Gostenhof, St. Johannis, Langwasser, Mögeldorf, Erlenstegen, Schweinau, Zerzabelshof, Gibitzenhof, Steinbühl und alle weiteren 87 Bezirke.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Nürnberg?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Nürnberg stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung vor Ort.',
      },
      {
        question: 'Was kostet Büroreinigung in Nürnberg?',
        answer:
          'Büroreinigung in Nürnberg kostet 22-32€/Stunde oder ab 0,60€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 280-380€/Monat. Kostenloses Angebot anfordern!',
      },
      {
        question: 'Bieten Sie Reinigung für Messeobjekte in Nürnberg an?',
        answer:
          'Ja, wir haben Erfahrung mit Messeobjekten rund um die Nürnberg Messe. Vor, während und nach Messen bieten wir flexible Reinigungsservices für Aussteller und Veranstalter.',
      },
      {
        question: 'Reinigen Sie auch Treppenhäuser in Nürnberg?',
        answer:
          'Ja, Treppenhausreinigung ist ein Schwerpunkt. Für Hausverwaltungen und Eigentümergemeinschaften in Nürnberg bieten wir regelmäßige Reinigung ab 50€/Woche, je nach Stockwerken und Größe.',
      },
      {
        question: 'Haben Sie Erfahrung mit Gewerbeobjekten in Nürnberg?',
        answer:
          'Ja, wir betreuen Gewerbeobjekte in allen Nürnberger Gewerbegebieten: Langwasser, Gewerbepark Nürnberg-Feucht, Hafen und die Industriegebiete. Büros, Hallen und Produktionsstätten.',
      },
    ],
  },
  {
    slug: 'muenchen',
    name: 'München',
    plz: '80331',
    region: 'Bayern',
    priority: 1,
    population: 1490000,
    intro:
      'Gebäudereinigung in München – mit lokalem Team direkt in der Landeshauptstadt. Wir reinigen in allen 25 Stadtbezirken: Altstadt-Lehel, Maxvorstadt, Schwabing, Au-Haidhausen, Sendling, Bogenhausen, Neuhausen-Nymphenburg und Trudering-Riem. Unsere Münchner Mitarbeiter betreuen Büros, Praxen, Gewerbeobjekte und Premium-Immobilien.',
    highlights: [
      'Lokales Reinigungsteam direkt in München stationiert',
      'Reinigung in allen 25 Münchner Stadtbezirken',
      'Erfahrung mit Premium-Immobilien und Bürokomplexen',
      'Flexible Einsatzzeiten (auch Wochenende)',
      'Persönlicher Ansprechpartner für Münchner Kunden',
      'Bei Großprojekten: Zusammenarbeit mit lokalen Partnern',
    ],
    faqs: [
      {
        question: 'In welchen Münchner Stadtbezirken sind Sie tätig?',
        answer:
          'Wir reinigen in allen 25 Münchner Stadtbezirken: Altstadt-Lehel, Maxvorstadt, Schwabing-West, Au-Haidhausen, Sendling, Bogenhausen, Neuhausen-Nymphenburg, Trudering-Riem, Pasing und alle weiteren Bezirke.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in München?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in München stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung vor Ort.',
      },
      {
        question: 'Was kostet Büroreinigung in München?',
        answer:
          'Büroreinigung in München kostet 25-38€/Stunde oder ab 0,70€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 320-450€/Monat. Kostenloses Angebot anfordern!',
      },
      {
        question: 'Bieten Sie Reinigung für Praxen und Kanzleien in München?',
        answer:
          'Ja, wir sind spezialisiert auf Praxisreinigung (Ärzte, Zahnärzte) und Kanzleien in der Maxvorstadt und Altstadt. Hygienische Reinigung nach aktuellen Standards, auch außerhalb der Sprechzeiten.',
      },
      {
        question: 'Reinigen Sie auch Treppenhäuser in München?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in München. Regelmäßige Reinigung ab 60€/Woche, abhängig von Stockwerken und Größe. Ideal für Mehrfamilienhäuser in Schwabing, Haidhausen oder Sendling.',
      },
      {
        question: 'Haben Sie Erfahrung mit Gewerbeobjekten in München?',
        answer:
          'Ja, wir betreuen Gewerbeobjekte in allen Münchner Gewerbegebieten: Trudering-Riem, Moosach, Berg am Laim und das Messegelände. Büroreinigung, Hallenreinigung und Industriereinigung.',
      },
    ],
  },
  {
    slug: 'wuerzburg',
    name: 'Würzburg',
    plz: '97070',
    region: 'Bayern',
    priority: 2,
    population: 128000,
    intro:
      'Gebäudereinigung in Würzburg – mit lokalem Team direkt vor Ort. Wir reinigen in allen 13 Stadtbezirken: Altstadt, Sanderau, Zellerau, Frauenland, Hubland, Grombühl und Lengfeld. Unsere Würzburger Mitarbeiter betreuen Universität, Kliniken, Büros und Gewerbeobjekte in der UNESCO-Stadt.',
    highlights: [
      'Lokales Reinigungsteam direkt in Würzburg stationiert',
      'Reinigung in allen 13 Würzburger Stadtbezirken',
      'Erfahrung mit Universitätsgebäuden und Kliniken',
      'Expertise für historische Gebäude (UNESCO Residenz)',
      'Flexible Zeiten für Praxen und Kanzleien',
      'Bei Großprojekten: Zusammenarbeit mit lokalen Partnern',
    ],
    faqs: [
      {
        question: 'In welchen Würzburger Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen Würzburger Stadtteilen: Altstadt, Sanderau, Zellerau, Frauenland, Hubland, Grombühl, Lengfeld, Heuchelhof, Versbach, Dürrbachtal und Heidingsfeld.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Würzburg?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Würzburg stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung vor Ort.',
      },
      {
        question: 'Was kostet Büroreinigung in Würzburg?',
        answer:
          'Büroreinigung in Würzburg kostet 20-30€/Stunde oder ab 0,55€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 250-350€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Universitätsgebäude an?',
        answer:
          'Ja, wir haben Erfahrung mit Universitätsgebäuden am Campus Hubland und in der Altstadt. Hörsäle, Labore, Büros und Mensen – nach Vorlesungsende oder am Wochenende.',
      },
      {
        question: 'Reinigen Sie auch Arztpraxen in Würzburg?',
        answer:
          'Ja, Praxisreinigung ist ein Schwerpunkt. In der Sanderau und am Hubland-Klinikum betreuen wir Arztpraxen, Zahnarztpraxen und Therapieeinrichtungen mit hygienischer Reinigung.',
      },
      {
        question: 'Haben Sie Erfahrung mit historischen Gebäuden in Würzburg?',
        answer:
          'Ja, wir reinigen in der Würzburger Altstadt und kennen die besonderen Anforderungen historischer Substanz. Schonende Reinigungsmethoden für denkmalgeschützte Gebäude.',
      },
    ],
  },
  {
    slug: 'erlangen',
    name: 'Erlangen',
    plz: '91052',
    region: 'Bayern',
    priority: 2,
    population: 113000,
    intro:
      'Gebäudereinigung in Erlangen – mit lokalem Team direkt vor Ort. Wir reinigen in allen 9 Stadtteilen und 40 Bezirken: Innenstadt, Büchenbach, Bruck, Alterlangen, Tennenlohe, Frauenaurach und Eltersdorf. Unsere Erlanger Mitarbeiter sind spezialisiert auf Siemens-Campus, Universität und medizinische Einrichtungen.',
    highlights: [
      'Lokales Reinigungsteam direkt in Erlangen stationiert',
      'Reinigung in allen 9 Erlanger Stadtteilen',
      'Erfahrung mit Siemens-Campus und Tech-Unternehmen',
      'Spezialisierung auf Universitätsgebäude und Kliniken',
      'Persönlicher Ansprechpartner vor Ort',
      'Bei Großprojekten: Zusammenarbeit mit lokalen Partnern',
    ],
    faqs: [
      {
        question: 'In welchen Erlanger Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen Erlanger Stadtteilen: Innenstadt, Büchenbach (Dorf, Nord, West), Bruck, Alterlangen, Tennenlohe, Frauenaurach, Eltersdorf, Kosbach und alle 40 statistischen Bezirke.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Erlangen?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Erlangen stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung vor Ort.',
      },
      {
        question: 'Was kostet Büroreinigung in Erlangen?',
        answer:
          'Büroreinigung in Erlangen kostet 20-30€/Stunde oder ab 0,55€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 250-350€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Siemens und Tech-Unternehmen?',
        answer:
          'Ja, wir haben Erfahrung mit Bürogebäuden am Siemens-Campus und im Medical Valley. Labore, Reinräume, Bürokomplexe und Produktionsstätten – nach höchsten Standards.',
      },
      {
        question: 'Reinigen Sie auch Universitätsgebäude in Erlangen?',
        answer:
          'Ja, wir betreuen Gebäude der Friedrich-Alexander-Universität: Hörsäle, Bibliotheken, Institute und Mensen. Flexible Zeiten außerhalb des Lehrbetriebs.',
      },
      {
        question: 'Haben Sie Erfahrung mit medizinischen Einrichtungen?',
        answer:
          'Ja, im Medical Valley Erlangen reinigen wir Arztpraxen, Kliniken und medizinische Forschungseinrichtungen. Hygienische Reinigung nach aktuellen Standards.',
      },
    ],
  },
  {
    slug: 'fuerth',
    name: 'Fürth',
    plz: '90762',
    region: 'Bayern',
    priority: 2,
    population: 130000,
    intro:
      'Gebäudereinigung in Fürth – mit lokalem Team direkt vor Ort in der Metropolregion. Wir reinigen in allen 3 Stadtbezirken und 18 statistischen Bezirken: Altstadt, Innenstadt, Südstadt, Hardhöhe, Poppenreuth, Stadeln und Burgfarrnbach. Unsere Fürther Mitarbeiter sind spezialisiert auf Gründerzeit-Gebäude, Gewerbe und Industrieanlagen.',
    highlights: [
      'Lokales Reinigungsteam in der Metropolregion stationiert',
      'Reinigung in allen 18 Fürther Stadtbezirken',
      'Expertise für historische Gründerzeit-Fassaden',
      'Erfahrung mit Industrieunternehmen (Siemens, Uvex)',
      'Persönlicher Ansprechpartner vor Ort',
      'Bei Großprojekten: Zusammenarbeit mit lokalen Partnern',
    ],
    faqs: [
      {
        question: 'In welchen Fürther Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen Fürther Stadtteilen: Altstadt, Innenstadt, Südstadt, Hardhöhe, Poppenreuth, Stadeln, Burgfarrnbach, Dambach, Oberfürberg, Ronhof und alle weiteren 71 Distrikte.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Fürth?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam in der Metropolregion Nürnberg-Fürth stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung vor Ort.',
      },
      {
        question: 'Was kostet Büroreinigung in Fürth?',
        answer:
          'Büroreinigung in Fürth kostet 20-30€/Stunde oder ab 0,55€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 250-350€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Industrieunternehmen in Fürth?',
        answer:
          'Ja, wir betreuen Industrieunternehmen in den Fürther Gewerbegebieten. Siemens, Uvex, Kennametal und weitere – Büros, Produktionshallen und Lagerflächen.',
      },
      {
        question: 'Reinigen Sie auch Gründerzeit-Gebäude in der Fürther Altstadt?',
        answer:
          'Ja, Fürth ist bekannt für seine Gründerzeit-Architektur. Wir haben Erfahrung mit historischen Fassaden und Treppenhäusern – schonende Reinigungsmethoden für alte Substanz.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Fürth an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in Fürth. Regelmäßige Reinigung ab 45€/Woche, ideal für die vielen Mehrfamilienhäuser in der Südstadt.',
      },
    ],
  },
  {
    slug: 'bayreuth',
    name: 'Bayreuth',
    plz: '95444',
    region: 'Bayern',
    priority: 2,
    population: 75000,
    intro:
      'Professionelle Gebäudereinigung in Bayreuth. Von der Unterhaltsreinigung bis zur Grundreinigung.',
  },
  {
    slug: 'augsburg',
    name: 'Augsburg',
    plz: '86150',
    region: 'Bayern',
    priority: 1,
    population: 300000,
    intro:
      'Gebäudereinigung in Augsburg – mit lokalem Team direkt in Bayerns drittgrößter Stadt. Wir reinigen in allen 42 Stadtbezirken: Innenstadt, Lechhausen, Pfersee, Göggingen, Haunstetten, Kriegshaber und Hochzoll. Unsere Augsburger Mitarbeiter haben Expertise für Industrie, Gewerbe und historische Gebäude der Fuggerstadt.',
    highlights: [
      'Lokales Reinigungsteam direkt in Augsburg stationiert',
      'Reinigung in allen 42 Augsburger Stadtbezirken',
      'Erfahrung mit Industrieunternehmen und Messe',
      'Expertise für Fuggerstadt-Architektur',
      'Persönlicher Ansprechpartner vor Ort',
      'Bei Großprojekten: Zusammenarbeit mit lokalen Partnern',
    ],
    faqs: [
      {
        question: 'In welchen Augsburger Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen 42 Augsburger Stadtbezirken: Innenstadt, Lechhausen (Süd, Ost, West), Pfersee, Göggingen, Haunstetten-Siebenbrunn, Kriegshaber, Hochzoll, Oberhausen und alle weiteren Planungsräume.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Augsburg?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Augsburg stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung in Bayerns drittgrößter Stadt.',
      },
      {
        question: 'Was kostet Büroreinigung in Augsburg?',
        answer:
          'Büroreinigung in Augsburg kostet 22-32€/Stunde oder ab 0,60€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 280-380€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Industrieunternehmen in Augsburg?',
        answer:
          'Ja, Augsburg ist Industriestandort. Wir betreuen Unternehmen in Lechhausen, im Innovationspark und den Gewerbegebieten. Büros, Produktionshallen und Lagerflächen.',
      },
      {
        question: 'Reinigen Sie auch historische Gebäude in der Augsburger Altstadt?',
        answer:
          'Ja, die Fuggerstadt hat bedeutende historische Architektur. Wir reinigen in der Altstadt, bei der Fuggerei und in Gründerzeit-Gebäuden mit schonenden Methoden.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Augsburg an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in ganz Augsburg. Regelmäßige Reinigung ab 50€/Woche, besonders in Lechhausen und Pfersee gefragt.',
      },
    ],
  },
  {
    slug: 'regensburg',
    name: 'Regensburg',
    plz: '93047',
    region: 'Bayern',
    priority: 2,
    population: 153000,
    intro:
      'Gebäudereinigung in Regensburg – mit lokalem Team direkt vor Ort. Wir reinigen in allen 18 Stadtbezirken: Innenstadt, Stadtamhof, Steinweg-Pfaffenstein, Kumpfmühl, Kasernenviertel, Burgweinting und Reinhausen. Unsere Regensburger Mitarbeiter haben Expertise für die UNESCO-Welterbe Altstadt und historische Gebäude.',
    highlights: [
      'Lokales Reinigungsteam direkt in Regensburg stationiert',
      'Reinigung in allen 18 Regensburger Stadtbezirken',
      'Expertise für UNESCO-Welterbe Altstadt',
      'Erfahrung mit Continental, BMW und Infineon',
      'Persönlicher Ansprechpartner vor Ort',
      'Bei Großprojekten: Zusammenarbeit mit lokalen Partnern',
    ],
    faqs: [
      {
        question: 'In welchen Regensburger Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen 18 Regensburger Stadtbezirken: Innenstadt, Stadtamhof, Steinweg-Pfaffenstein, Kumpfmühl-Ziegetsdorf-Neuprüll, Kasernenviertel, Burgweinting-Harting, Reinhausen und alle weiteren.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Regensburg?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Regensburg stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung vor Ort.',
      },
      {
        question: 'Was kostet Büroreinigung in Regensburg?',
        answer:
          'Büroreinigung in Regensburg kostet 20-30€/Stunde oder ab 0,55€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 260-360€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Industrieunternehmen in Regensburg?',
        answer:
          'Ja, Regensburg ist Industriestandort. Wir betreuen Unternehmen wie Continental, BMW und Infineon – Bürokomplexe, Produktionsstätten und Lagerhallen.',
      },
      {
        question: 'Reinigen Sie auch historische Gebäude in der Regensburger Altstadt?',
        answer:
          'Ja, die UNESCO-Welterbe Altstadt erfordert besondere Sorgfalt. Wir reinigen historische Gebäude, Patrizierhäuser und den Bereich um den Dom mit schonenden Methoden.',
      },
      {
        question: 'Haben Sie Erfahrung mit Universitätsgebäuden in Regensburg?',
        answer:
          'Ja, wir betreuen Gebäude der Universität Regensburg und der OTH. Hörsäle, Bibliotheken, Institute und Mensen – flexible Zeiten außerhalb des Lehrbetriebs.',
      },
    ],
  },
  {
    slug: 'ingolstadt',
    name: 'Ingolstadt',
    plz: '85049',
    region: 'Bayern',
    priority: 2,
    population: 140000,
    intro:
      'Gebäudereinigung in Ingolstadt – mit lokalem Team direkt in der AUDI-Stadt. Wir reinigen in allen 12 Stadtbezirken und 61 Unterbezirken: Mitte (Altstadt), Nordost, Südost, Ringsee, Friedrichshofen und Münchener Straße. Unsere Ingolstädter Mitarbeiter haben Expertise für Automobilindustrie und Gewerbe.',
    highlights: [
      'Lokales Reinigungsteam direkt in Ingolstadt stationiert',
      'Reinigung in allen 12 Ingolstädter Stadtbezirken',
      'Erfahrung mit AUDI und Automobilzulieferern',
      'Expertise für Industriegebäude und Bürokomplexe',
      'Flexible Einsatzzeiten für Schichtbetrieb',
      'Bei Großprojekten: Zusammenarbeit mit lokalen Partnern',
    ],
    faqs: [
      {
        question: 'In welchen Ingolstädter Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen 12 Ingolstädter Stadtbezirken: Mitte (Altstadt, Brückenkopf), Nordost (Konradviertel, Josephsviertel), Südost (Ringsee, Augustinviertel), West, Friedrichshofen, Münchener Straße und alle 61 Unterbezirke.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Ingolstadt?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Ingolstadt stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung in der AUDI-Stadt.',
      },
      {
        question: 'Was kostet Büroreinigung in Ingolstadt?',
        answer:
          'Büroreinigung in Ingolstadt kostet 22-32€/Stunde oder ab 0,60€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 270-370€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für AUDI und Automobilzulieferer?',
        answer:
          'Ja, Ingolstadt ist AUDI-Standort. Wir haben Erfahrung mit Automobilindustrie und Zulieferern – Bürokomplexe, Showrooms, Produktionsstätten und Kantinen.',
      },
      {
        question: 'Reinigen Sie auch in den Gewerbegebieten Ingolstadt?',
        answer:
          'Ja, wir betreuen Unternehmen in allen Ingolstädter Gewerbegebieten: Nordost, Südost und das Industriegebiet. Büros, Hallen und Lagerflächen.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Ingolstadt an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in Ingolstadt. Regelmäßige Reinigung ab 45€/Woche, besonders in Ringsee und der Altstadt gefragt.',
      },
    ],
  },
  // Top-Orte Deutschland - Priority 1
  {
    slug: 'berlin',
    name: 'Berlin',
    plz: '10115',
    region: 'Berlin',
    priority: 1,
    population: 3670000,
    intro:
      'Gebäudereinigung in Berlin – Deutschlands Hauptstadt mit 3,7 Millionen Einwohnern. Wir reinigen in allen 12 Bezirken und 96 Ortsteilen: Mitte, Friedrichshain-Kreuzberg, Pankow (Prenzlauer Berg), Charlottenburg-Wilmersdorf, Neukölln, Tempelhof-Schöneberg und weitere. Professionelle Reinigung für Büros, Startups, Behörden und Kultureinrichtungen.',
    highlights: [
      'Reinigung in allen 12 Berliner Bezirken',
      'Erfahrung mit Startups, Behörden und Kultureinrichtungen',
      'Lokale Teams in Berlin stationiert',
      'Flexible Einsatzzeiten (auch Wochenende)',
      'Expertise für Altbau und moderne Bürokomplexe',
      'Persönlicher Ansprechpartner vor Ort',
    ],
    faqs: [
      {
        question: 'In welchen Berliner Bezirken sind Sie tätig?',
        answer:
          'Wir reinigen in allen 12 Berliner Bezirken: Mitte, Friedrichshain-Kreuzberg, Pankow (inkl. Prenzlauer Berg), Charlottenburg-Wilmersdorf, Spandau, Steglitz-Zehlendorf, Tempelhof-Schöneberg, Neukölln, Treptow-Köpenick, Marzahn-Hellersdorf, Lichtenberg und Reinickendorf.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Berlin?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Berlin stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung in der Hauptstadt.',
      },
      {
        question: 'Was kostet Büroreinigung in Berlin?',
        answer:
          'Büroreinigung in Berlin kostet 23-35€/Stunde oder ab 0,65€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 300-420€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Startups und Co-Working Spaces?',
        answer:
          'Ja, wir haben Erfahrung mit Startups in Kreuzberg, Prenzlauer Berg und Mitte. Co-Working Spaces, Tech-Büros und kreative Arbeitsumgebungen – flexible Verträge ohne lange Bindung.',
      },
      {
        question: 'Reinigen Sie auch Behörden und öffentliche Einrichtungen?',
        answer:
          'Ja, wir betreuen Behörden, Kultureinrichtungen und öffentliche Gebäude in Berlin. Erfahrung mit besonderen Sicherheitsanforderungen und Zugangsbeschränkungen.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Berlin an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in ganz Berlin. Regelmäßige Reinigung ab 55€/Woche, besonders gefragt in Prenzlauer Berg, Kreuzberg und Charlottenburg.',
      },
    ],
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    plz: '20095',
    region: 'Hamburg',
    priority: 1,
    population: 1900000,
    intro:
      'Gebäudereinigung in Hamburg – Deutschlands zweitgrößte Stadt mit 1,9 Millionen Einwohnern. Wir reinigen in allen 7 Bezirken und 104 Stadtteilen: Mitte, Altona, Eimsbüttel, Hamburg-Nord, Wandsbek, Bergedorf und Harburg. Professionelle Reinigung für Hafen, HafenCity, Bürokomplexe und Gewerbe.',
    highlights: [
      'Reinigung in allen 7 Hamburger Bezirken',
      'Erfahrung mit HafenCity und Speicherstadt',
      'Lokale Teams in Hamburg stationiert',
      'Flexible Einsatzzeiten für Hafen und Logistik',
      'Expertise für maritime Gebäude und Kontore',
      'Persönlicher Ansprechpartner vor Ort',
    ],
    faqs: [
      {
        question: 'In welchen Hamburger Bezirken sind Sie tätig?',
        answer:
          'Wir reinigen in allen 7 Hamburger Bezirken und 104 Stadtteilen: Mitte (HafenCity, St. Pauli, Altstadt), Altona (Ottensen, Blankenese), Eimsbüttel (Harvestehude), Hamburg-Nord (Winterhude, Eppendorf), Wandsbek, Bergedorf und Harburg.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Hamburg?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Hamburg stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung in der Hansestadt.',
      },
      {
        question: 'Was kostet Büroreinigung in Hamburg?',
        answer:
          'Büroreinigung in Hamburg kostet 23-35€/Stunde oder ab 0,65€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 300-420€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung in der HafenCity und Speicherstadt?',
        answer:
          'Ja, wir haben Erfahrung mit modernen Bürokomplexen in der HafenCity und historischen Kontoren in der Speicherstadt. Besondere Anforderungen für maritime Architektur.',
      },
      {
        question: 'Reinigen Sie auch im Hamburger Hafen?',
        answer:
          'Ja, wir betreuen Logistikunternehmen, Reedereien und Hafenbetriebe. Büros, Lagerhallen und Verwaltungsgebäude im Hafengebiet – flexible Zeiten für Schichtbetrieb.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Hamburg an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in ganz Hamburg. Regelmäßige Reinigung ab 55€/Woche, besonders gefragt in Eimsbüttel, Eppendorf und Winterhude.',
      },
    ],
  },
  {
    slug: 'koeln',
    name: 'Köln',
    plz: '50667',
    region: 'NRW',
    priority: 1,
    population: 1080000,
    intro:
      'Gebäudereinigung in Köln – Millionenstadt am Rhein mit über 1 Million Einwohnern. Wir reinigen in allen 9 Stadtbezirken und 86 Stadtteilen: Innenstadt, Ehrenfeld, Lindenthal, Nippes, Rodenkirchen, Chorweiler, Porz, Kalk und Mülheim. Professionelle Reinigung für Medien, Versicherungen, Handel und Messe.',
    highlights: [
      'Reinigung in allen 9 Kölner Stadtbezirken',
      'Erfahrung mit Medienhäusern (RTL, WDR-Umfeld)',
      'Lokale Teams in Köln stationiert',
      'Flexible Einsatzzeiten für Messe und Events',
      'Expertise für Altstadt und Bürokomplexe',
      'Persönlicher Ansprechpartner vor Ort',
    ],
    faqs: [
      {
        question: 'In welchen Kölner Stadtbezirken sind Sie tätig?',
        answer:
          'Wir reinigen in allen 9 Kölner Stadtbezirken und 86 Stadtteilen: Innenstadt (Altstadt-Nord/Süd, Neustadt), Ehrenfeld, Lindenthal (Sülz, Klettenberg), Nippes (Riehl), Rodenkirchen, Chorweiler, Porz, Kalk und Mülheim.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Köln?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Köln stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung in der Domstadt.',
      },
      {
        question: 'Was kostet Büroreinigung in Köln?',
        answer:
          'Büroreinigung in Köln kostet 22-33€/Stunde oder ab 0,60€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 290-400€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Medienhäuser in Köln?',
        answer:
          'Ja, Köln ist Medienstadt. Wir haben Erfahrung mit Fernsehstudios, Produktionsfirmen und Agenturen in Ehrenfeld, Ossendorf und der Innenstadt. Flexible Zeiten für 24/7-Betrieb.',
      },
      {
        question: 'Reinigen Sie auch während der Kölner Messe?',
        answer:
          'Ja, wir bieten Reinigungsservices rund um Koelnmesse. Vor, während und nach Veranstaltungen – für Aussteller, Messehallen und umliegende Hotels und Büros.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Köln an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in ganz Köln. Regelmäßige Reinigung ab 50€/Woche, besonders gefragt in Ehrenfeld, Nippes und Lindenthal.',
      },
    ],
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt am Main',
    plz: '60311',
    region: 'Hessen',
    priority: 1,
    population: 760000,
    intro:
      'Gebäudereinigung in Frankfurt am Main – Finanzmetropole mit 760.000 Einwohnern. Wir reinigen in allen 46 Stadtteilen und 16 Ortsbezirken: Innenstadt, Westend, Sachsenhausen, Bockenheim, Nordend, Gallus und Bornheim. Professionelle Reinigung für Banken, Bürotürme, Messe und Gewerbe.',
    highlights: [
      'Reinigung in allen 46 Frankfurter Stadtteilen',
      'Erfahrung mit Bankenviertel und Bürotürmen',
      'Lokale Teams in Frankfurt stationiert',
      'Flexible Einsatzzeiten für Messe Frankfurt',
      'Expertise für Hochhäuser und historische Gebäude',
      'Persönlicher Ansprechpartner vor Ort',
    ],
    faqs: [
      {
        question: 'In welchen Frankfurter Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen 46 Frankfurter Stadtteilen: Innenstadt, Westend (Nord/Süd), Sachsenhausen (Nord/Süd), Bockenheim, Nordend (Ost/West), Gallus, Bornheim, Niederrad, Höchst und alle weiteren.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Frankfurt?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Frankfurt stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung in der Finanzmetropole.',
      },
      {
        question: 'Was kostet Büroreinigung in Frankfurt?',
        answer:
          'Büroreinigung in Frankfurt kostet 24-38€/Stunde oder ab 0,70€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 320-450€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Banken und Bürotürme?',
        answer:
          'Ja, wir haben Erfahrung mit Bürotürmen im Bankenviertel und Westend. Hochhausreinigung, Lobbys, Konferenzräume und Handelssäle – nach höchsten Sicherheitsstandards.',
      },
      {
        question: 'Reinigen Sie auch während der Frankfurter Messe?',
        answer:
          'Ja, wir bieten Reinigungsservices rund um Messe Frankfurt. Vor, während und nach Veranstaltungen – für Aussteller, Messestände und umliegende Hotels und Büros.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Frankfurt an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in ganz Frankfurt. Regelmäßige Reinigung ab 55€/Woche, besonders gefragt in Sachsenhausen, Nordend und Bornheim.',
      },
    ],
  },
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    plz: '70173',
    region: 'Baden-Württemberg',
    priority: 1,
    population: 635000,
    intro:
      'Gebäudereinigung in Stuttgart – Landeshauptstadt Baden-Württembergs mit 635.000 Einwohnern. Wir reinigen in allen 23 Stadtbezirken und 152 Stadtteilen: Mitte, Bad Cannstatt, Vaihingen, Degerloch, Feuerbach, Möhringen und Zuffenhausen. Professionelle Reinigung für Automobil, IT, Messe und Gewerbe.',
    highlights: [
      'Reinigung in allen 23 Stuttgarter Stadtbezirken',
      'Erfahrung mit Daimler, Porsche, Bosch-Umfeld',
      'Lokale Teams in Stuttgart stationiert',
      'Flexible Einsatzzeiten für Messe Stuttgart',
      'Expertise für Industriegebäude und Bürokomplexe',
      'Persönlicher Ansprechpartner vor Ort',
    ],
    faqs: [
      {
        question: 'In welchen Stuttgarter Stadtbezirken sind Sie tätig?',
        answer:
          'Wir reinigen in allen 23 Stuttgarter Stadtbezirken und 152 Stadtteilen: Mitte, Bad Cannstatt (18 Stadtteile), Vaihingen (12 Stadtteile), Degerloch, Feuerbach, Möhringen, Zuffenhausen, Nord, West, Ost, Süd und alle weiteren.',
      },
      {
        question: 'Haben Sie Mitarbeiter direkt in Stuttgart?',
        answer:
          'Ja, wir haben ein lokales Reinigungsteam direkt in Stuttgart stationiert. So garantieren wir schnelle Reaktionszeiten und persönliche Betreuung in der Automobilstadt.',
      },
      {
        question: 'Was kostet Büroreinigung in Stuttgart?',
        answer:
          'Büroreinigung in Stuttgart kostet 23-35€/Stunde oder ab 0,65€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 300-420€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Automobilunternehmen?',
        answer:
          'Ja, Stuttgart ist Automobilstadt. Wir haben Erfahrung mit Daimler, Porsche, Bosch und Zulieferern – Bürokomplexe, Showrooms, Produktionsstätten und Kantinen.',
      },
      {
        question: 'Reinigen Sie auch während der Stuttgarter Messe?',
        answer:
          'Ja, wir bieten Reinigungsservices rund um Messe Stuttgart in Leinfelden-Echterdingen. Vor, während und nach Veranstaltungen – für Aussteller und Hotels.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Stuttgart an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in ganz Stuttgart. Regelmäßige Reinigung ab 50€/Woche, besonders gefragt in Mitte, West und Degerloch.',
      },
    ],
  },
  // Weitere Großstädte - Priority 1
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    plz: '40213',
    region: 'NRW',
    priority: 1,
    population: 620000,
    intro:
      'Gebäudereinigung in Düsseldorf – Landeshauptstadt NRW mit 620.000 Einwohnern. Wir reinigen in allen 10 Stadtbezirken und 50 Stadtteilen: Altstadt, Bilk, Oberkassel, Pempelfort, Derendorf, Flingern und Unterbilk. Professionelle Reinigung für Mode, Werbung, Medien und Messe.',
    highlights: [
      'Reinigung in allen 10 Düsseldorfer Stadtbezirken',
      'Erfahrung mit Modeindustrie und Werbeagenturen',
      'Lokale Teams in Düsseldorf stationiert',
      'Expertise für Kö und Medienhafen',
      'Flexible Einsatzzeiten für Messe Düsseldorf',
      'Persönlicher Ansprechpartner vor Ort',
    ],
    faqs: [
      {
        question: 'In welchen Düsseldorfer Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen 50 Düsseldorfer Stadtteilen: Altstadt, Carlstadt, Stadtmitte, Pempelfort, Derendorf, Bilk, Oberbilk, Flingern, Oberkassel und alle weiteren.',
      },
      {
        question: 'Was kostet Büroreinigung in Düsseldorf?',
        answer:
          'Büroreinigung in Düsseldorf kostet 23-35€/Stunde oder ab 0,65€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 300-420€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung im Medienhafen und auf der Kö?',
        answer:
          'Ja, wir haben Erfahrung mit exklusiven Büros auf der Königsallee und im Medienhafen. Agenturen, Showrooms, Kanzleien und Boutiquen – mit höchsten Standards.',
      },
      {
        question: 'Reinigen Sie auch während der Düsseldorfer Messe?',
        answer:
          'Ja, wir bieten Reinigungsservices rund um Messe Düsseldorf. Boot, drupa, MEDICA – vor, während und nach Veranstaltungen für Aussteller und Hotels.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Düsseldorf an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in ganz Düsseldorf. Regelmäßige Reinigung ab 55€/Woche, besonders gefragt in Bilk, Oberkassel und Pempelfort.',
      },
    ],
  },
  {
    slug: 'dortmund',
    name: 'Dortmund',
    plz: '44135',
    region: 'NRW',
    priority: 1,
    population: 590000,
    intro:
      'Gebäudereinigung in Dortmund – größte Stadt im Ruhrgebiet mit 590.000 Einwohnern. Wir reinigen in allen 12 Stadtbezirken: Innenstadt, Hörde, Hombruch, Brackel, Eving und Aplerbeck. Professionelle Reinigung für Technologie, Logistik und Gewerbe.',
    highlights: [
      'Reinigung in allen 12 Dortmunder Stadtbezirken',
      'Erfahrung mit Technologiepark und Phoenix-See',
      'Lokale Teams im Ruhrgebiet stationiert',
      'Expertise für Industrie und Bürokomplexe',
      'Flexible Einsatzzeiten für Logistik',
      'Persönlicher Ansprechpartner vor Ort',
    ],
    faqs: [
      {
        question: 'In welchen Dortmunder Stadtbezirken sind Sie tätig?',
        answer:
          'Wir reinigen in allen 12 Dortmunder Stadtbezirken: Innenstadt-West, Innenstadt-Ost, Innenstadt-Nord, Eving, Scharnhorst, Brackel, Aplerbeck, Hörde, Hombruch, Lütgendortmund, Huckarde und Mengede.',
      },
      {
        question: 'Was kostet Büroreinigung in Dortmund?',
        answer:
          'Büroreinigung in Dortmund kostet 20-30€/Stunde oder ab 0,55€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 260-360€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung am Phoenix-See und Technologiepark?',
        answer:
          'Ja, wir betreuen Unternehmen am Phoenix-See und im Technologiepark. Moderne Bürokomplexe, Startups und etablierte Tech-Firmen – nach höchsten Standards.',
      },
      {
        question: 'Reinigen Sie auch in den Dortmunder Industriegebieten?',
        answer:
          'Ja, wir betreuen Logistik- und Industrieunternehmen in den Gewerbegebieten. Büros, Hallen, Lagerflächen und Produktionsstätten.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Dortmund an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in ganz Dortmund. Regelmäßige Reinigung ab 45€/Woche, besonders gefragt in Hörde und der Innenstadt.',
      },
    ],
  },
  {
    slug: 'essen',
    name: 'Essen',
    plz: '45127',
    region: 'NRW',
    priority: 1,
    population: 580000,
    intro:
      'Gebäudereinigung in Essen – Grüne Hauptstadt Europas mit 580.000 Einwohnern. Wir reinigen in allen 9 Stadtbezirken und 50 Stadtteilen: Mitte, Rüttenscheid, Bredeney, Werden, Kettwig und Steele. Professionelle Reinigung für Energie, Handel und Messe.',
    highlights: [
      'Reinigung in allen 9 Essener Stadtbezirken',
      'Erfahrung mit ThyssenKrupp, RWE, E.ON-Umfeld',
      'Lokale Teams im Ruhrgebiet stationiert',
      'Expertise für Zeche Zollverein und Messe',
      'Flexible Einsatzzeiten für Messe Essen',
      'Persönlicher Ansprechpartner vor Ort',
    ],
    faqs: [
      {
        question: 'In welchen Essener Stadtbezirken sind Sie tätig?',
        answer:
          'Wir reinigen in allen 9 Essener Stadtbezirken und 50 Stadtteilen: Mitte, Rüttenscheid, Bredeney, Werden, Kettwig, Steele, Borbeck, Altenessen und alle weiteren.',
      },
      {
        question: 'Was kostet Büroreinigung in Essen?',
        answer:
          'Büroreinigung in Essen kostet 20-30€/Stunde oder ab 0,55€/m². Für ein 100m² Büro mit 2x wöchentlicher Reinigung rechnen Sie mit ca. 260-360€/Monat.',
      },
      {
        question: 'Bieten Sie Reinigung für Energieunternehmen?',
        answer:
          'Ja, Essen ist Sitz großer Energiekonzerne. Wir haben Erfahrung mit Bürokomplexen, Verwaltungsgebäuden und Konferenzräumen – nach höchsten Standards.',
      },
      {
        question: 'Reinigen Sie auch an der Zeche Zollverein?',
        answer:
          'Ja, wir betreuen Unternehmen im Umfeld des UNESCO-Welterbes Zeche Zollverein. Büros, Veranstaltungsräume und Kultureinrichtungen.',
      },
      {
        question: 'Bieten Sie Treppenhausreinigung in Essen an?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen und WEGs in ganz Essen. Regelmäßige Reinigung ab 45€/Woche, besonders gefragt in Rüttenscheid und Bredeney.',
      },
    ],
  },
  {
    slug: 'leipzig',
    name: 'Leipzig',
    plz: '04109',
    region: 'Sachsen',
    priority: 1,
    population: 600000,
    intro:
      'Gebäudereinigung in Leipzig – mit lokalem Team direkt in der Messestadt. Wir reinigen in allen 10 Stadtbezirken und 63 Ortsteilen: Zentrum, Gohlis, Plagwitz, Connewitz, Schleußig, Südvorstadt, Reudnitz, Lindenau, Mockau, Paunsdorf und Grünau. Unsere Leipziger Mitarbeiter betreuen Büros, Messeobjekte, Universitätsgebäude und Gewerbeimmobilien.',
    highlights: [
      'Lokales Reinigungsteam direkt in Leipzig stationiert',
      'Erfahrung mit Messeobjekten (Leipziger Messe)',
      'Universitätsgebäude und Forschungseinrichtungen',
      'Flexible Zeiten für Gewerbekunden',
      'Persönlicher Ansprechpartner für Leipziger Kunden',
      'Expertise für Gründerzeitgebäude und Altbauten',
    ],
    faqs: [
      {
        question: 'In welchen Leipziger Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen 63 Ortsteilen Leipzigs – von Zentrum über Gohlis, Plagwitz, Connewitz bis Grünau, Paunsdorf und Mockau. Alle Stadtbezirke werden abgedeckt.',
      },
      {
        question: 'Was kostet Büroreinigung in Leipzig?',
        answer:
          'Büroreinigung in Leipzig ab 23€/Stunde oder als Pauschale nach Quadratmetern. Kostenlose Besichtigung und individuelles Angebot für Ihr Objekt.',
      },
      {
        question: 'Bieten Sie Reinigung für Messeobjekte in Leipzig an?',
        answer:
          'Ja, wir haben Erfahrung mit der Leipziger Messe und Kongresszentren. Vor, während und nach Veranstaltungen – schnell und gründlich.',
      },
      {
        question: 'Reinigen Sie auch Treppenhäuser in Leipzig?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen in ganz Leipzig. Regelmäßige Reinigung ab 40€/Woche, besonders gefragt in Gohlis und der Südvorstadt.',
      },
      {
        question: 'Haben Sie Erfahrung mit Altbauten in Leipzig?',
        answer:
          'Ja, wir kennen die Besonderheiten Leipziger Gründerzeitgebäude – sensible Reinigung für historische Treppenhäuser, Stuck und Holzböden.',
      },
    ],
  },
  {
    slug: 'dresden',
    name: 'Dresden',
    plz: '01067',
    region: 'Sachsen',
    priority: 1,
    population: 560000,
    intro:
      'Gebäudereinigung in Dresden – mit lokalem Team direkt in der Landeshauptstadt. Wir reinigen in allen 10 Stadtbezirken: Altstadt, Neustadt, Pieschen, Loschwitz, Blasewitz, Leuben, Prohlis, Plauen, Cotta und Klotzsche. Unsere Dresdner Mitarbeiter betreuen Büros, historische Gebäude, Kultureinrichtungen und Gewerbeimmobilien in Elbflorenz.',
    highlights: [
      'Lokales Reinigungsteam direkt in Dresden stationiert',
      'Erfahrung mit historischen Gebäuden (UNESCO-Welterbe)',
      'Kultureinrichtungen und Museen',
      'Flexible Zeiten für Gewerbekunden',
      'Persönlicher Ansprechpartner für Dresdner Kunden',
      'Expertise für Barockarchitektur und Altbauten',
    ],
    faqs: [
      {
        question: 'In welchen Dresdner Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen 64 Stadtteilen Dresdens – von der Altstadt über Neustadt, Blasewitz, Loschwitz bis Pieschen, Plauen und Klotzsche. Alle Stadtbezirke werden abgedeckt.',
      },
      {
        question: 'Was kostet Büroreinigung in Dresden?',
        answer:
          'Büroreinigung in Dresden ab 23€/Stunde oder als Pauschale nach Quadratmetern. Kostenlose Besichtigung und individuelles Angebot für Ihr Objekt.',
      },
      {
        question: 'Haben Sie Erfahrung mit historischen Gebäuden in Dresden?',
        answer:
          'Ja, wir kennen die Anforderungen für Dresdner Barockgebäude und UNESCO-Welterbe. Sensible Reinigung für Stuck, Sandstein und historische Böden.',
      },
      {
        question: 'Reinigen Sie auch Treppenhäuser in Dresden?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen in ganz Dresden. Regelmäßige Reinigung ab 40€/Woche, besonders gefragt in Blasewitz und der Neustadt.',
      },
      {
        question: 'Bieten Sie Reinigung für Kultureinrichtungen in Dresden an?',
        answer:
          'Ja, wir haben Erfahrung mit Museen, Galerien und Veranstaltungsstätten. Diskrete Reinigung außerhalb der Öffnungszeiten.',
      },
    ],
  },
  {
    slug: 'hannover',
    name: 'Hannover',
    plz: '30159',
    region: 'Niedersachsen',
    priority: 1,
    population: 535000,
    intro:
      'Gebäudereinigung in Hannover – mit lokalem Team direkt in der Messestadt. Wir reinigen in allen 13 Stadtbezirken und 51 Stadtteilen: Mitte, List, Oststadt, Südstadt, Linden-Nord, Linden-Mitte, Nordstadt, Vahrenwald, Bothfeld, Döhren, Ricklingen und Herrenhausen. Unsere Hannoveraner Mitarbeiter betreuen Büros, Messeobjekte und Gewerbeimmobilien.',
    highlights: [
      'Lokales Reinigungsteam direkt in Hannover stationiert',
      'Erfahrung mit Messeobjekten (Hannover Messe)',
      'Bürogebäude und Verwaltungsgebäude',
      'Flexible Zeiten für Gewerbekunden',
      'Persönlicher Ansprechpartner für Hannoveraner Kunden',
      'Expertise für Altbauten in Linden und der Südstadt',
    ],
    faqs: [
      {
        question: 'In welchen Hannoveraner Stadtteilen sind Sie tätig?',
        answer:
          'Wir reinigen in allen 51 Stadtteilen Hannovers – von Mitte über List, Oststadt, Südstadt, Linden bis Bothfeld, Döhren und Ricklingen. Alle 13 Stadtbezirke werden abgedeckt.',
      },
      {
        question: 'Was kostet Büroreinigung in Hannover?',
        answer:
          'Büroreinigung in Hannover ab 22€/Stunde oder als Pauschale nach Quadratmetern. Kostenlose Besichtigung und individuelles Angebot für Ihr Objekt.',
      },
      {
        question: 'Bieten Sie Reinigung für Messeobjekte in Hannover an?',
        answer:
          'Ja, wir haben Erfahrung mit der Hannover Messe und dem Congress Centrum. Vor, während und nach Veranstaltungen – schnell und gründlich.',
      },
      {
        question: 'Reinigen Sie auch Treppenhäuser in Hannover?',
        answer:
          'Ja, Treppenhausreinigung für Hausverwaltungen in ganz Hannover. Regelmäßige Reinigung ab 40€/Woche, besonders gefragt in Linden und der List.',
      },
      {
        question: 'Haben Sie Erfahrung mit Altbauten in Hannover?',
        answer:
          'Ja, wir kennen die Gründerzeitgebäude in Linden und der Südstadt. Sensible Reinigung für historische Treppenhäuser und Holzböden.',
      },
    ],
  },
  {
    slug: 'bremen',
    name: 'Bremen',
    plz: '28195',
    region: 'Bremen',
    priority: 1,
    population: 565000,
    intro: 'Professionelle Gebäudereinigung in Bremen. Für Büros und Gewerbe.',
  },
  {
    slug: 'karlsruhe',
    name: 'Karlsruhe',
    plz: '76131',
    region: 'Baden-Württemberg',
    priority: 2,
    population: 310000,
    intro: 'Gebäudereinigung in Karlsruhe – professionell und zuverlässig.',
  },
  {
    slug: 'mannheim',
    name: 'Mannheim',
    plz: '68159',
    region: 'Baden-Württemberg',
    priority: 2,
    population: 310000,
    intro: 'Professionelle Gebäudereinigung in Mannheim.',
  },
  {
    slug: 'wiesbaden',
    name: 'Wiesbaden',
    plz: '65183',
    region: 'Hessen',
    priority: 2,
    population: 280000,
    intro: 'Gebäudereinigung in Wiesbaden – für saubere Arbeitsplätze.',
  },
  {
    slug: 'bonn',
    name: 'Bonn',
    plz: '53111',
    region: 'NRW',
    priority: 2,
    population: 330000,
    intro: 'Professionelle Gebäudereinigung in Bonn.',
  },
  // Weitere Orte - Priority 3
  {
    slug: 'braunschweig',
    name: 'Braunschweig',
    plz: '38100',
    region: 'Niedersachsen',
    priority: 2,
    population: 250000,
    intro: 'Gebäudereinigung in Braunschweig.',
  },
  {
    slug: 'kiel',
    name: 'Kiel',
    plz: '24103',
    region: 'Schleswig-Holstein',
    priority: 2,
    population: 250000,
    intro: 'Professionelle Gebäudereinigung in Kiel.',
  },
  {
    slug: 'chemnitz',
    name: 'Chemnitz',
    plz: '09111',
    region: 'Sachsen',
    priority: 2,
    population: 245000,
    intro: 'Gebäudereinigung in Chemnitz.',
  },
  {
    slug: 'magdeburg',
    name: 'Magdeburg',
    plz: '39104',
    region: 'Sachsen-Anhalt',
    priority: 2,
    population: 240000,
    intro: 'Professionelle Gebäudereinigung in Magdeburg.',
  },
  {
    slug: 'mainz',
    name: 'Mainz',
    plz: '55116',
    region: 'Rheinland-Pfalz',
    priority: 2,
    population: 220000,
    intro: 'Gebäudereinigung in Mainz.',
  },
  {
    slug: 'saarbruecken',
    name: 'Saarbrücken',
    plz: '66111',
    region: 'Saarland',
    priority: 2,
    population: 180000,
    intro: 'Professionelle Gebäudereinigung in Saarbrücken.',
  },
]

// Alle weiteren Orte aus der Benutzerliste
// Format: [name, plz, population (geschätzt)]
const ADDITIONAL_CITIES_DATA: [string, string, number?][] = [
  ['Aachen', '52062', 250000],
  ['Aalen', '73430', 68000],
  ['Ahaus', '48683', 40000],
  ['Ahlen', '59227', 53000],
  ['Ahrensburg', '22926', 34000],
  ['Albstadt', '72458', 44000],
  ['Alfter', '53347', 24000],
  ['Alsdorf', '52477', 47000],
  ['Altenburg', '04600', 32000],
  ['Amberg', '92224', 42000],
  ['Andernach', '56626', 30000],
  ['Annaberg-Buchholz', '09456', 20000],
  ['Ansbach', '91522', 42000],
  ['Arnsberg', '59755', 73000],
  ['Arnstadt', '99310', 28000],
  ['Aschaffenburg', '63739', 72000],
  ['Aschersleben', '06449', 27000],
  ['Attendorn', '57439', 25000],
  ['Aurich', '26603', 42000],
  ['Backnang', '71522', 37000],
  ['Bad Hersfeld', '36251', 30000],
  ['Bad Homburg', '61348', 54000],
  ['Bad Honnef', '53604', 26000],
  ['Bad Kissingen', '97688', 22000],
  ['Bad Kreuznach', '55543', 52000],
  ['Bad Nauheim', '61231', 32000],
  ['Bad Oeynhausen', '32545', 49000],
  ['Bad Oldesloe', '23843', 25000],
  ['Bad Rappenau', '74906', 22000],
  ['Bad Salzuflen', '32105', 55000],
  ['Bad Soden', '65812', 23000],
  ['Bad Vilbel', '61118', 35000],
  ['Bad Waldsee', '88339', 21000],
  ['Bad Zwischenahn', '26160', 29000],
  ['Baden-Baden', '76530', 57000],
  ['Baesweiler', '52499', 27000],
  ['Balingen', '72336', 34000],
  ['Barsinghausen', '30890', 35000],
  ['Bautzen', '02625', 39000],
  ['Beckum', '59269', 37000],
  ['Bedburg', '50181', 24000],
  ['Bensheim', '64625', 42000],
  ['Bergheim', '50126', 63000],
  ['Bergisch Gladbach', '51465', 112000],
  ['Bergkamen', '59192', 50000],
  ['Bernau', '16321', 42000],
  ['Bernburg', '06406', 33000],
  ['Biberach', '88400', 33000],
  ['Bielefeld', '33602', 335000],
  ['Bietigheim-Bissingen', '74321', 43000],
  ['Bingen', '55411', 26000],
  ['Bitterfeld-Wolfen', '06749', 39000],
  ['Blankenburg', '38889', 20000],
  ['Blieskastel', '66440', 21000],
  ['Böblingen', '71032', 50000],
  ['Bocholt', '46395', 71000],
  ['Bochum', '44787', 365000],
  ['Bogen', '94327', 10000],
  ['Borken', '46325', 42000],
  ['Bornheim', '53332', 49000],
  ['Bottrop', '46236', 117000],
  ['Bramsche', '49565', 32000],
  ['Brandenburg an der Havel', '14770', 72000],
  ['Brilon', '59929', 26000],
  ['Bruchköbel', '63486', 21000],
  ['Bruchsal', '76646', 45000],
  ['Brühl', '50321', 44000],
  ['Buchholz', '21244', 41000],
  ['Bückeburg', '31675', 20000],
  ['Büdingen', '63654', 23000],
  ['Bühl', '77815', 29000],
  ['Bünde', '32257', 46000],
  ['Burghausen', '84489', 19000],
  ['Burgwedel', '30938', 21000],
  ['Buxtehude', '21614', 41000],
  ['Calw', '75365', 24000],
  ['Castrop-Rauxel', '44575', 74000],
  ['Celle', '29221', 69000],
  ['Cham', '93413', 17000],
  ['Cloppenburg', '49661', 36000],
  ['Coburg', '96450', 41000],
  ['Coesfeld', '48653', 37000],
  ['Coswig', '01640', 21000],
  ['Cottbus', '03046', 99000],
  ['Crailsheim', '74564', 35000],
  ['Cuxhaven', '27472', 48000],
  ['Dachau', '85221', 48000],
  ['Darmstadt', '64283', 160000],
  ['Datteln', '45711', 35000],
  ['Deggendorf', '94469', 35000],
  ['Delbrück', '33129', 32000],
  ['Delitzsch', '04509', 25000],
  ['Delmenhorst', '27749', 78000],
  ['Dessau-Roßlau', '06844', 80000],
  ['Detmold', '32756', 75000],
  ['Dietzenbach', '63128', 35000],
  ['Dillenburg', '35683', 24000],
  ['Dillingen', '89407', 20000],
  ['Dinslaken', '46535', 70000],
  ['Döbeln', '04720', 24000],
  ['Donaueschingen', '78166', 23000],
  ['Donauwörth', '86609', 19000],
  ['Dorsten', '46282', 75000],
  ['Dreieich', '63303', 43000],
  ['Dülmen', '48249', 47000],
  ['Düren', '52349', 92000],
  ['Duisburg', '47051', 500000],
  ['Eberswalde', '16225', 40000],
  ['Eckernförde', '24340', 22000],
  ['Edewecht', '26188', 23000],
  ['Ehingen', '89584', 27000],
  ['Eichwalde', '15732', 6000],
  ['Einbeck', '37574', 31000],
  ['Eisenach', '99817', 42000],
  ['Eisenhüttenstadt', '15890', 25000],
  ['Eislingen', '73054', 21000],
  ['Elmshorn', '25335', 52000],
  ['Emden', '26721', 51000],
  ['Emmendingen', '79312', 28000],
  ['Emmerich', '46446', 31000],
  ['Emsdetten', '48282', 36000],
  ['Enger', '32130', 21000],
  ['Ennepetal', '58256', 30000],
  ['Ennigerloh', '59320', 20000],
  ['Eppingen', '75031', 22000],
  ['Erding', '85435', 38000],
  ['Erftstadt', '50374', 51000],
  ['Erfurt', '99084', 215000],
  ['Erkrath', '40699', 46000],
  ['Eschborn', '65760', 22000],
  ['Eschweiler', '52249', 58000],
  ['Eschwege', '37269', 20000],
  ['Espelkamp', '32339', 26000],
  ['Esslingen', '73728', 94000],
  ['Ettlingen', '76275', 40000],
  ['Euskirchen', '53879', 59000],
  ['Eutin', '23701', 17000],
  ['Falkensee', '14612', 45000],
  ['Fellbach', '70734', 46000],
  ['Filderstadt', '70794', 45000],
  ['Flensburg', '24937', 90000],
  ['Forchheim', '91301', 32000],
  ['Frankenthal', '67227', 48000],
  ['Frechen', '50226', 54000],
  ['Freiberg', '09599', 41000],
  ['Freiburg', '79098', 235000],
  ['Freising', '85354', 49000],
  ['Freital', '01705', 40000],
  ['Freudenstadt', '72250', 23000],
  ['Friedberg', '61169', 30000],
  ['Friedrichshafen', '88045', 62000],
  ['Friesoythe', '26169', 23000],
  ['Fulda', '36037', 68000],
  ['Fürstenwalde', '15517', 32000],
  ['Gaggenau', '76571', 30000],
  ['Ganderkesee', '27777', 32000],
  ['Garbsen', '30823', 62000],
  ['Garmisch-Partenkirchen', '82467', 27000],
  ['Geesthacht', '21502', 31000],
  ['Geilenkirchen', '52511', 28000],
  ['Geldern', '47608', 34000],
  ['Gelsenkirchen', '45879', 260000],
  ['Gera', '07545', 92000],
  ['Geretsried', '82538', 26000],
  ['Germering', '82110', 41000],
  ['Gersthofen', '86368', 23000],
  ['Geseke', '59590', 21000],
  ['Gevelsberg', '58285', 31000],
  ['Gießen', '35390', 92000],
  ['Gifhorn', '38518', 43000],
  ['Gladbeck', '45964', 76000],
  ['Glauchau', '08371', 22000],
  ['Goch', '47574', 34000],
  ['Göppingen', '73033', 57000],
  ['Görlitz', '02826', 56000],
  ['Goslar', '38640', 50000],
  ['Gotha', '99867', 45000],
  ['Göttingen', '37073', 119000],
  ['Greifswald', '17489', 59000],
  ['Greiz', '07973', 20000],
  ['Greven', '48268', 38000],
  ['Grevenbroich', '41515', 64000],
  ['Griesheim', '64347', 28000],
  ['Grimma', '04668', 28000],
  ['Gronau', '48599', 48000],
  ['Großenhain', '01558', 18000],
  ['Gummersbach', '51643', 52000],
  ['Günzburg', '89312', 21000],
  ['Güstrow', '18273', 29000],
  ['Gütersloh', '33330', 100000],
  ['Haan', '42781', 31000],
  ['Hagen', '58095', 188000],
  ['Halberstadt', '38820', 41000],
  ['Halle', '06108', 240000],
  ['Haltern', '45721', 38000],
  ['Hameln', '31785', 58000],
  ['Hamm', '59065', 180000],
  ['Hanau', '63450', 97000],
  ['Haren', '49733', 25000],
  ['Hattersheim', '65795', 28000],
  ['Hattingen', '45525', 56000],
  ['Heide', '25746', 22000],
  ['Heidelberg', '69115', 160000],
  ['Heidenau', '01809', 17000],
  ['Heidenheim', '89518', 50000],
  ['Heilbronn', '74072', 126000],
  ['Heinsberg', '52525', 43000],
  ['Helmstedt', '38350', 25000],
  ['Hemer', '58675', 35000],
  ['Hennef', '53773', 48000],
  ['Hennigsdorf', '16761', 27000],
  ['Herborn', '35745', 21000],
  ['Herdecke', '58313', 23000],
  ['Herford', '32052', 67000],
  ['Herne', '44623', 160000],
  ['Herrenberg', '71083', 32000],
  ['Herten', '45699', 62000],
  ['Herzogenaurach', '91074', 24000],
  ['Herzogenrath', '52134', 47000],
  ['Hilden', '40721', 57000],
  ['Hildesheim', '31134', 101000],
  ['Hockenheim', '68766', 22000],
  ['Hof', '95028', 45000],
  ['Hofheim', '65719', 41000],
  ['Holzminden', '37603', 20000],
  ['Homburg', '66424', 42000],
  ['Hoyerswerda', '02977', 32000],
  ['Hückelhoven', '41836', 41000],
  ['Hürth', '50354', 60000],
  ['Husum', '25813', 23000],
  ['Ibbenbüren', '49477', 52000],
  ['Idar-Oberstein', '55743', 28000],
  ['Ilmenau', '98693', 26000],
  ['Iserlohn', '58636', 92000],
  ['Isernhagen', '30916', 24000],
  ['Itzehoe', '25524', 32000],
  ['Jena', '07743', 111000],
  ['Jülich', '52428', 33000],
  ['Kaarst', '41564', 44000],
  ['Kaiserslautern', '67655', 100000],
  ['Kaltenkirchen', '24568', 22000],
  ['Kamen', '59174', 44000],
  ['Kamenz', '01917', 16000],
  ['Kamp-Lintfort', '47475', 38000],
  ['Karben', '61184', 24000],
  ['Kassel', '34117', 200000],
  ['Kaufbeuren', '87600', 45000],
  ['Kehl', '77694', 37000],
  ['Kelkheim', '65779', 30000],
  ['Kempen', '47906', 36000],
  ['Kempten', '87435', 70000],
  ['Kerpen', '50171', 67000],
  ['Kevelaer', '47623', 29000],
  ['Kirchheim unter Teck', '73230', 41000],
  ['Kitzingen', '97318', 22000],
  ['Kleve', '47533', 52000],
  ['Koblenz', '56068', 114000],
  ['Königs Wusterhausen', '15711', 38000],
  ['Königswinter', '53639', 42000],
  ['Konstanz', '78462', 85000],
  ['Korbach', '34497', 24000],
  ['Kornwestheim', '70806', 34000],
  ['Korschenbroich', '41352', 34000],
  ['Krefeld', '47798', 227000],
  ['Kreuztal', '57223', 31000],
  ['Kronach', '96317', 17000],
  ['Kulmbach', '95326', 26000],
  ['Laatzen', '30880', 42000],
  ['Lage', '32791', 36000],
  ['Lahr', '77933', 47000],
  ['Lampertheim', '68623', 33000],
  ['Landau', '76829', 47000],
  ['Landsberg am Lech', '86899', 30000],
  ['Landshut', '84028', 75000],
  ['Langen', '63225', 39000],
  ['Langenfeld', '40764', 59000],
  ['Langenhagen', '30851', 54000],
  ['Lauf', '91207', 27000],
  ['Leer', '26789', 35000],
  ['Leichlingen', '42799', 28000],
  ['Leimen', '69181', 27000],
  ['Leinefelde-Worbis', '37327', 19000],
  ['Leinfelden-Echterdingen', '70771', 41000],
  ['Lemgo', '32657', 41000],
  ['Lengerich', '49525', 23000],
  ['Lennestadt', '57368', 26000],
  ['Leonberg', '71229', 48000],
  ['Leverkusen', '51373', 165000],
  ['Lichtenfels', '96215', 20000],
  ['Limburg', '65549', 35000],
  ['Lindau', '88131', 26000],
  ['Lingen', '49808', 57000],
  ['Lippstadt', '59555', 72000],
  ['Löhne', '32584', 41000],
  ['Lörrach', '79539', 50000],
  ['Lohmar', '53797', 31000],
  ['Lohne', '49393', 31000],
  ['Lübeck', '23552', 220000],
  ['Lübbecke', '32312', 26000],
  ['Lüdenscheid', '58507', 73000],
  ['Lüdinghausen', '59348', 25000],
  ['Ludwigsburg', '71638', 94000],
  ['Ludwigshafen', '67059', 172000],
  ['Lüneburg', '21335', 78000],
  ['Lünen', '44532', 87000],
  ['Meerbusch', '40667', 56000],
  ['Meinerzhagen', '58540', 20000],
  ['Meiningen', '98617', 25000],
  ['Meißen', '01662', 28000],
  ['Melle', '49324', 47000],
  ['Memmingen', '87700', 44000],
  ['Menden', '58706', 53000],
  ['Meppen', '49716', 36000],
  ['Merzig', '66663', 30000],
  ['Meschede', '59872', 31000],
  ['Mettmann', '40822', 39000],
  ['Michelstadt', '64720', 17000],
  ['Miltenberg', '63897', 9000],
  ['Minden', '32423', 82000],
  ['Moers', '47441', 104000],
  ['Mölln', '23879', 19000],
  ['Monheim', '40789', 43000],
  ['Mönchengladbach', '41061', 260000],
  ['Moormerland', '26802', 24000],
  ['Mörfelden-Walldorf', '64546', 35000],
  ['Mosbach', '74821', 24000],
  ['Mühlacker', '75417', 26000],
  ['Mühlhausen', '99974', 35000],
  ['Mülheim', '45468', 170000],
  ['Munderkingen', '89597', 5000],
  ['Münster', '48143', 315000],
  ['Nagold', '72202', 23000],
  ['Naumburg', '06618', 33000],
  ['Neckarsulm', '74172', 27000],
  ['Nettetal', '41334', 43000],
  ['Neu-Isenburg', '63263', 38000],
  ['Neu-Ulm', '89231', 60000],
  ['Neubrandenburg', '17033', 63000],
  ['Neuburg', '86633', 30000],
  ['Neumarkt', '92318', 41000],
  ['Neumünster', '24534', 80000],
  ['Neunkirchen', '66538', 47000],
  ['Neuruppin', '16816', 31000],
  ['Neuss', '41460', 153000],
  ['Neustadt', '67433', 53000],
  ['Neuwied', '56564', 65000],
  ['Nidda', '63667', 18000],
  ['Nidderau', '61130', 21000],
  ['Nienburg', '31582', 32000],
  ['Norden', '26506', 25000],
  ['Nordenham', '26954', 26000],
  ['Norderstedt', '22846', 80000],
  ['Nordhausen', '99734', 42000],
  ['Nordhorn', '48529', 54000],
  ['Northeim', '37154', 29000],
  ['Nürtingen', '72622', 42000],
  ['Oberasbach', '90522', 18000],
  ['Oberhausen', '46045', 210000],
  ['Obertshausen', '63179', 25000],
  ['Oberursel', '61440', 48000],
  ['Ochtrup', '48607', 20000],
  ['Oelde', '59302', 30000],
  ['Oer-Erkenschwick', '45739', 32000],
  ['Offenbach', '63065', 130000],
  ['Offenburg', '77652', 63000],
  ['Olching', '82140', 29000],
  ['Oldenburg', '26122', 170000],
  ['Olpe', '57462', 25000],
  ['Oranienburg', '16515', 47000],
  ['Oschersleben', '39387', 19000],
  ['Osnabrück', '49074', 165000],
  ['Osterholz-Scharmbeck', '27711', 31000],
  ['Overath', '51491', 28000],
  ['Paderborn', '33098', 155000],
  ['Panketal', '16341', 21000],
  ['Papenburg', '26871', 38000],
  ['Passau', '94032', 53000],
  ['Peine', '31224', 51000],
  ['Penzberg', '82377', 17000],
  ['Petershagen', '32469', 26000],
  ['Pfaffenhofen', '85276', 27000],
  ['Pfarrkirchen', '84347', 13000],
  ['Pforzheim', '75172', 126000],
  ['Pinneberg', '25421', 44000],
  ['Pirmasens', '66953', 40000],
  ['Pirna', '01796', 39000],
  ['Plauen', '08523', 65000],
  ['Plettenberg', '58840', 26000],
  ['Porta Westfalica', '32457', 36000],
  ['Potsdam', '14467', 185000],
  ['Preetz', '24211', 16000],
  ['Prenzlau', '17291', 18000],
  ['Pulheim', '50259', 56000],
  ['Quedlinburg', '06484', 24000],
  ['Quickborn', '25451', 23000],
  ['Radeberg', '01454', 18000],
  ['Radebeul', '01445', 34000],
  ['Radevormwald', '42477', 22000],
  ['Rastatt', '76437', 50000],
  ['Rastede', '26180', 23000],
  ['Rathenow', '14712', 24000],
  ['Ratingen', '40878', 88000],
  ['Ravensburg', '88212', 51000],
  ['Recklinghausen', '45657', 115000],
  ['Rees', '46459', 22000],
  ['Reinbek', '21465', 28000],
  ['Remagen', '53424', 18000],
  ['Remscheid', '42853', 110000],
  ['Rendsburg', '24768', 29000],
  ['Reutlingen', '72764', 118000],
  ['Rheda-Wiedenbrück', '33378', 49000],
  ['Rheinbach', '53359', 28000],
  ['Rheinberg', '47495', 31000],
  ['Rheine', '48431', 77000],
  ['Rheinfelden', '79618', 34000],
  ['Riesa', '01589', 30000],
  ['Rietberg', '33397', 30000],
  ['Rinteln', '31737', 26000],
  ['Rodgau', '63110', 46000],
  ['Rosenheim', '83022', 64000],
  ['Rösrath', '51503', 29000],
  ['Rostock', '18055', 210000],
  ['Rotenburg', '27356', 22000],
  ['Roth', '91154', 25000],
  ['Rothenburg ob der Tauber', '91541', 11000],
  ['Rottenburg', '72108', 44000],
  ['Rottweil', '78628', 25000],
  ['Rudolstadt', '07407', 24000],
  ['Rüsselsheim', '65428', 65000],
  ['Saalfeld', '07318', 26000],
  ['Salzgitter', '38226', 105000],
  ['Salzwedel', '29410', 23000],
  ['Sangerhausen', '06526', 27000],
  ['Sankt Augustin', '53757', 56000],
  ['Sankt Ingbert', '66386', 36000],
  ['Sankt Wendel', '66606', 26000],
  ['Sassnitz', '18546', 9000],
  ['Schifferstadt', '67105', 21000],
  ['Schleswig', '24837', 24000],
  ['Schmallenberg', '57392', 25000],
  ['Schönebeck', '39218', 30000],
  ['Schortens', '26419', 21000],
  ['Schramberg', '78713', 21000],
  ['Schwabach', '91126', 41000],
  ['Schwäbisch Gmünd', '73525', 61000],
  ['Schwäbisch Hall', '74523', 42000],
  ['Schwalbach', '65824', 16000],
  ['Schwandorf', '92421', 29000],
  ['Schwarzenbek', '21493', 17000],
  ['Schwedt', '16303', 30000],
  ['Schweinfurt', '97421', 54000],
  ['Schwelm', '58332', 29000],
  ['Schwerin', '19053', 96000],
  ['Schwerte', '58239', 47000],
  ['Seelze', '30926', 35000],
  ['Seesen', '38723', 20000],
  ['Seevetal', '21217', 43000],
  ['Seligenstadt', '63500', 22000],
  ['Selm', '59379', 27000],
  ['Sendenhorst', '48324', 14000],
  ['Senftenberg', '01968', 24000],
  ['Siegburg', '53721', 43000],
  ['Siegen', '57072', 103000],
  ['Sindelfingen', '71063', 65000],
  ['Singen', '78224', 48000],
  ['Sinsheim', '74889', 36000],
  ['Soest', '59494', 48000],
  ['Solingen', '42651', 160000],
  ['Soltau', '29614', 22000],
  ['Sondershausen', '99706', 21000],
  ['Sonneberg', '96515', 23000],
  ['Sonthofen', '87527', 22000],
  ['Speyer', '67346', 51000],
  ['Springe', '31832', 29000],
  ['Sprockhövel', '45549', 25000],
  ['Stade', '21682', 48000],
  ['Stadtallendorf', '35260', 22000],
  ['Stadthagen', '31655', 23000],
  ['Stadtlohn', '48703', 21000],
  ['Starnberg', '82319', 24000],
  ['Staßfurt', '39418', 24000],
  ['Steinfurt', '48565', 34000],
  ['Stendal', '39576', 38000],
  ['Stolberg', '52222', 57000],
  ['Stralsund', '18435', 59000],
  ['Straubing', '94315', 48000],
  ['Stuhr', '28816', 34000],
  ['Sundern', '59846', 28000],
  ['Syke', '28857', 25000],
  ['Taunusstein', '65232', 31000],
  ['Teltow', '14513', 28000],
  ['Tönisvorst', '47918', 30000],
  ['Torgau', '04860', 20000],
  ['Traunreut', '83301', 21000],
  ['Traunstein', '83278', 22000],
  ['Trier', '54290', 111000],
  ['Troisdorf', '53840', 77000],
  ['Tübingen', '72070', 92000],
  ['Tuttlingen', '78532', 36000],
  ['Übach-Palenberg', '52531', 25000],
  ['Überlingen', '88662', 24000],
  ['Uelzen', '29525', 33000],
  ['Ulm', '89073', 127000],
  ['Unna', '59423', 59000],
  ['Uslar', '37170', 14000],
  ['Vaihingen', '71665', 30000],
  ['Vaterstetten', '85591', 25000],
  ['Vechta', '49377', 34000],
  ['Velbert', '42549', 81000],
  ['Verden', '27283', 28000],
  ['Verl', '33415', 27000],
  ['Versmold', '33775', 22000],
  ['Viernheim', '68519', 35000],
  ['Viersen', '41747', 78000],
  ['Villingen-Schwenningen', '78050', 85000],
  ['Visselhövede', '27374', 10000],
  ['Vlotho', '32602', 19000],
  ['Völklingen', '66333', 39000],
  ['Vreden', '48691', 23000],
  ['Wachtberg', '53343', 21000],
  ['Waghäusel', '68753', 22000],
  ['Waiblingen', '71332', 57000],
  ['Waldkirch', '79183', 22000],
  ['Waldkraiburg', '84478', 24000],
  ['Waldshut-Tiengen', '79761', 24000],
  ['Walsrode', '29664', 24000],
  ['Waltrop', '45731', 30000],
  ['Wandlitz', '16348', 24000],
  ['Waren', '17192', 21000],
  ['Warendorf', '48231', 38000],
  ['Warstein', '59581', 26000],
  ['Wedel', '22880', 34000],
  ['Wedemark', '30900', 30000],
  ['Wegberg', '41844', 29000],
  ['Weiden', '92637', 43000],
  ['Weil am Rhein', '79576', 31000],
  ['Weilheim', '82362', 23000],
  ['Weimar', '99423', 66000],
  ['Weingarten', '88250', 25000],
  ['Weinheim', '69469', 45000],
  ['Weinstadt', '71384', 27000],
  ['Weißenfels', '06667', 40000],
  ['Weißwasser', '02943', 16000],
  ['Weiterstadt', '64331', 26000],
  ['Werdau', '08412', 21000],
  ['Werder', '14542', 27000],
  ['Werl', '59457', 32000],
  ['Wermelskirchen', '42929', 36000],
  ['Werne', '59368', 30000],
  ['Wernigerode', '38855', 32000],
  ['Wertheim', '97877', 24000],
  ['Wesel', '46483', 61000],
  ['Wesseling', '50389', 36000],
  ['Westerstede', '26655', 24000],
  ['Wetter', '58300', 28000],
  ['Wetzlar', '35578', 54000],
  ['Wiehl', '51674', 26000],
  ['Wiesloch', '69168', 27000],
  ['Wildeshausen', '27793', 21000],
  ['Wilhelmshaven', '26382', 77000],
  ['Willich', '47877', 51000],
  ['Wilnsdorf', '57234', 21000],
  ['Winnenden', '71364', 29000],
  ['Winsen', '21423', 36000],
  ['Wismar', '23966', 44000],
  ['Witten', '58452', 97000],
  ['Wittenberg', '06886', 47000],
  ['Wittlich', '54516', 20000],
  ['Wittmund', '26409', 21000],
  ['Wolfenbüttel', '38300', 52000],
  ['Wolfsburg', '38440', 125000],
  ['Worms', '67547', 84000],
  ['Wunstorf', '31515', 42000],
  ['Wuppertal', '42103', 355000],
  ['Xanten', '46509', 22000],
  ['Zeitz', '06712', 28000],
  ['Zerbst', '39261', 22000],
  ['Zirndorf', '90513', 26000],
  ['Zittau', '02763', 25000],
  ['Zweibrücken', '66482', 34000],
  ['Zwickau', '08056', 88000],
]

// Erstelle Slug aus Ortsname
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9-]/g, '')
}

// Bestimme Priority basierend auf Einwohnerzahl (mehr Stufen für besseres Zoom-Verhalten)
function getPriority(population?: number): 1 | 2 | 3 | 4 | 5 | 6 {
  if (!population) return 6
  if (population >= 500000) return 1  // ~5 Orte (Berlin, Hamburg, München, Köln, Frankfurt)
  if (population >= 200000) return 2  // ~15 Orte
  if (population >= 100000) return 3  // ~30 Orte
  if (population >= 50000) return 4   // ~80 Orte
  if (population >= 30000) return 5   // ~150 Orte
  return 6                             // Rest (~320 Orte)
}

// Erstelle zusätzliche Orte aus Daten
function createAdditionalCities(): City[] {
  // Existierende Slugs sammeln um Duplikate zu vermeiden
  const existingSlugs = new Set(PREMIUM_CITIES.map((c) => c.slug))

  return ADDITIONAL_CITIES_DATA.filter(([name]) => !existingSlugs.has(createSlug(name))).map(
    ([name, plz, population]) => {
      const region = getBundeslandByPLZ(plz)
      return {
        slug: createSlug(name),
        name,
        plz,
        region,
        priority: getPriority(population),
        population,
      }
    }
  )
}

// Alle Orte zusammenführen
export const CITIES: City[] = [...PREMIUM_CITIES, ...createAdditionalCities()].sort((a, b) =>
  a.name.localeCompare(b.name, 'de')
)

// Anzahl der Orte
export const CITIES_COUNT = CITIES.length

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
export function getCitiesByPriority(priority: 1 | 2 | 3 | 4 | 5 | 6): City[] {
  return CITIES.filter((city) => city.priority === priority)
}

/**
 * Get cities by region (Bundesland)
 */
export function getCitiesByRegion(region: string): City[] {
  return CITIES.filter((city) => city.region === region)
}

/**
 * Get all unique regions (Bundesländer)
 */
export function getAllRegions(): string[] {
  const regions = new Set(CITIES.map((city) => city.region))
  return Array.from(regions).sort((a, b) => a.localeCompare(b, 'de'))
}

/**
 * Get cities grouped by region
 */
export function getCitiesGroupedByRegion(): Record<string, City[]> {
  return CITIES.reduce(
    (acc, city) => {
      if (!acc[city.region]) {
        acc[city.region] = []
      }
      acc[city.region].push(city)
      return acc
    },
    {} as Record<string, City[]>
  )
}

/**
 * Search cities by name or PLZ
 */
export function searchCities(query: string, limit = 8): City[] {
  if (!query || query.length < 2) return []

  const q = query.toLowerCase().trim()

  return CITIES.filter(
    (city) => city.name.toLowerCase().includes(q) || city.plz.startsWith(q)
  ).slice(0, limit)
}
