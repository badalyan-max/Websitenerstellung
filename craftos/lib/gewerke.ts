export interface Gewerk {
  slug: string;
  name: string;
  kurz: string;
  hatVorlagen: boolean;
  /** Slogan der Gewerkeseite; die H1 (Slogan mit Kopfwort), Title und Description kommen seit 08-04 aus docs/seo/keyword-map.json. */
  heroTitle: string;
  heroIntro: string;
  exampleTitle: string;
  example: string;
  funktionen: string[];
  faq: { q: string; a: string }[];
}
const definitions = [
  [
    "elektriker",
    "Elektriker & Elektrotechnik",
    "Elektro",
    true,
    "Vom Zählerschrank bis zur Wallbox",
    "Elektroinstallationen und Material nachvollziehbar kalkulieren. Einsätze für Ihr Team planen und Zeiten beim richtigen Auftrag erfassen.",
    "Zählerschrank erneuern",
    "Zählerschrank, Schutzgeräte und Montagezeit werden als getrennte Kostenbestandteile kalkuliert. Nach dem Einsatz ergänzen Sie Material und tatsächliche Stunden.",
    ["angebote", "plantafel", "lager", "zeiterfassung"],
  ],
  [
    "shk",
    "Sanitär, Heizung, Klima",
    "SHK",
    true,
    "Vom Heizungstausch bis zur Badsanierung",
    "Angebote, Material, Einsätze und Abschlagsrechnungen für Ihre SHK-Projekte in einem gemeinsamen Ablauf bearbeiten.",
    "Badsanierung Familie Weber",
    "Sie gliedern Rückbau, Installation und Endmontage in Projektphasen, planen das Team und rechnen vereinbarte Abschläge mit Bezug zum Auftrag ab.",
    ["angebote", "rechnungen", "plantafel", "lager"],
  ],
  [
    "maler",
    "Maler & Lackierer",
    "Maler",
    true,
    "Von der Fläche zum fertigen Raum",
    "Raumflächen und Abzüge erfassen, Mengen als Angebotspositionen übernehmen und Leistungen auf der Baustelle dokumentieren.",
    "Renovierung einer Altbauwohnung",
    "Sie erfassen Wand- und Deckenflächen sowie Öffnungen. Aus den geprüften Nettomengen entstehen Positionen für Untergrundvorbereitung und Beschichtung.",
    ["aufmass", "angebote", "baudokumentation", "nachkalkulation"],
  ],
  [
    "tischler-schreiner",
    "Tischler & Schreiner",
    "Tischler",
    true,
    "Von der Werkbank bis zur Montage",
    "Material, Fertigung und Montage kalkulieren, Aufgaben bündeln und die Stunden Ihres Teams dem Projekt zuordnen.",
    "Einbauschrank nach Maß",
    "Plattenmaterial, Beschläge, Fertigungsstunden und Montage bilden getrennte Kalkulationsbestandteile. Die Nachkalkulation zeigt später die erfassten Istkosten.",
    ["angebote", "lager", "zeiterfassung", "nachkalkulation"],
  ],
  [
    "dachdecker",
    "Dachdecker",
    "Dach",
    false,
    "Vom Dachaufmaß bis zur Abnahme",
    "Dachprojekte organisieren, Materialbedarf kalkulieren und Baufortschritt mit Bildern und Berichten festhalten.",
    "Dachsanierung eines Wohnhauses",
    "Sie übernehmen selbst ermittelte Flächen als Angebotsmengen, planen Mitarbeiter und Ressourcen und halten zusätzliche Leistungen im Bericht fest.",
    ["angebote", "plantafel", "baudokumentation", "rechnungen"],
  ],
  [
    "fliesenleger",
    "Fliesenleger",
    "Fliesen",
    false,
    "Von der Fläche bis zur Fuge",
    "Mengen, Material und Verlegeleistung strukturiert kalkulieren und Änderungen beim Auftrag dokumentieren.",
    "Fliesenarbeiten in einem Bad",
    "Sie prüfen die Flächen, kalkulieren Verschnitt bewusst als eigene Menge und unterscheiden Untergrundvorbereitung, Abdichtung und Verlegung.",
    ["aufmass", "angebote", "lager", "baudokumentation"],
  ],
  [
    "zimmerer",
    "Zimmerer & Holzbau",
    "Holzbau",
    false,
    "Vom Holzbauplan bis zur Montage",
    "Holzbauprojekte in Phasen organisieren, Team und Ressourcen einteilen und Material und Stunden nachvollziehen.",
    "Erweiterung eines Dachstuhls",
    "Fertigung und Montage bekommen getrennte Phasen. Fahrzeuge, Mitarbeitende und andere Ressourcen werden eingeplant; Materialentnahmen bleiben zugeordnet.",
    ["projektverwaltung", "plantafel", "lager", "nachkalkulation"],
  ],
  [
    "galabau",
    "Garten- & Landschaftsbau",
    "GaLaBau",
    false,
    "Von der Erdarbeit bis zur fertigen Anlage",
    "Außenanlagen kalkulieren, Geräte und Teams planen und den tatsächlichen Materialverbrauch beim Projekt erfassen.",
    "Neugestaltung einer Hofeinfahrt",
    "Aushub, Unterbau und Pflasterarbeiten werden getrennt kalkuliert. Zusätzliche Entsorgungskosten und Gerätezeiten fließen bewusst in die Bewertung ein.",
    ["angebote", "plantafel", "lager", "nachkalkulation"],
  ],
  [
    "trockenbau",
    "Trockenbau & Innenausbau",
    "Innenausbau",
    false,
    "Von der Raumaufteilung bis zur Übergabe",
    "Flächen und Öffnungen erfassen, Positionen kalkulieren und den Fortschritt Ihres Innenausbauprojekts dokumentieren.",
    "Neue Büroräume im Bestand",
    "Sie erfassen Flächen für Trennwände und Decken, halten Abzüge fest und planen die Arbeitsschritte nach Materiallieferung und Teamverfügbarkeit.",
    ["aufmass", "angebote", "plantafel", "baudokumentation"],
  ],
  [
    "metallbau",
    "Metallbau & Schlosserei",
    "Metallbau",
    false,
    "Von der Fertigung bis zum Einbau",
    "Material, Werkstattarbeit und Montage zusammen kalkulieren und Informationen für Ihr Team beim Auftrag halten.",
    "Geländer für ein Treppenhaus",
    "Profile, Beschläge, Oberflächenbearbeitung und Montage werden einzeln kalkuliert. Werkstatt und Baustelle erfassen ihre Leistungen beim selben Projekt.",
    ["angebote", "arbeitsanweisungen", "zeiterfassung", "lager"],
  ],
  [
    "bauunternehmen",
    "Bauunternehmen",
    "Bau",
    false,
    "Von der Bauphase bis zur Schlussrechnung",
    "Projekte strukturieren, Ressourcen planen, Berichte erfassen und Abschläge bis zur Schlussrechnung nachvollziehen.",
    "Umbau eines Gewerbeobjekts",
    "Sie planen Gewerke und Ressourcen in Phasen, dokumentieren Fortschritt und Mängel und ordnen Berichte und Rechnungen der gemeinsamen Projektakte zu.",
    ["projektverwaltung", "plantafel", "baudokumentation", "rechnungen"],
  ],
  [
    "allrounder",
    "Allrounder & Hausmeisterservice",
    "Allrounder",
    true,
    "Vom kleinen Einsatz bis zum größeren Auftrag",
    "Wiederkehrende Leistungen vorbereiten, Einsätze einteilen und erbrachte Arbeit ohne Umwege dokumentieren.",
    "Instandhaltung einer Wohnanlage",
    "Wiederverwendbare Positionen erleichtern die Angebotserstellung. Jeder Einsatz bekommt einen Projektbezug; Zeiten und Berichte liefern die Grundlage für die Abrechnung.",
    ["angebote", "plantafel", "zeiterfassung", "rechnungen"],
  ],
] as const;
export const gewerke: Gewerk[] = definitions.map(
  ([
    slug,
    name,
    kurz,
    hatVorlagen,
    title,
    intro,
    exampleTitle,
    example,
    features,
  ]) => ({
    slug,
    name,
    kurz,
    hatVorlagen,
    heroTitle: title,
    heroIntro: intro,
    exampleTitle,
    example,
    funktionen: [...features],
    faq: [
      {
        q: "Sind branchenspezifische Vorlagen enthalten?",
        a: hatVorlagen
          ? "CraftOS enthält vorbereitete Leistungsvorlagen für dieses Gewerk. Prüfen Sie Mengen, Preise und Leistungsumfang für Ihren Betrieb und passen Sie die Positionen an."
          : "Sie können eigene Artikel und Leistungsvorlagen anlegen und wiederverwenden. Ein vollständiger branchenspezifischer Leistungskatalog ist für dieses Gewerk nicht als enthalten zugesagt.",
      },
      {
        q: "Kann mein Team die Handy-App nutzen?",
        a: "Ja. Die Voll-Lizenz enthält Web-App und Mobile-App für dieselbe Person. Weitere Mitarbeitende auf der Baustelle können App-Lizenzen erhalten; ihre Rolle bestimmt den Zugriff.",
      },
    ],
  }),
);
export function getGewerk(slug: string) {
  return gewerke.find((g) => g.slug === slug);
}
