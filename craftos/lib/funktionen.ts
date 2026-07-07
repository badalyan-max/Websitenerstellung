// Funktions-Katalog mit Status-Tiers:
// 'heute'  = live in der App (verifiziert im Code)
// 'launch' = kommt zum Launch (in Arbeit)
// 'vision' = Roadmap/Vision (ehrlich gelabelt)
import type { LucideIcon } from 'lucide-react'
import {
  FileText,
  Receipt,
  Landmark,
  CalendarRange,
  Clock,
  Boxes,
  HardHat,
  Users,
  TrendingUp,
  Globe,
} from 'lucide-react'

export type Tier = 'heute' | 'launch' | 'vision'

export interface Funktion {
  slug: string
  name: string
  icon: LucideIcon
  tier: Tier
  /** Kurzbeschreibung für Karten/Teaser */
  kurz: string
  heroTitle: string
  /** ≤300 Zeichen Fakten-Antwort (GEO/Fan-out) */
  heroIntro: string
  /** Welche interaktive Demo auf der Detailseite gezeigt wird */
  demo?: 'angebot' | 'plantafel' | 'zeiterfassung' | 'kichat' | 'lager'
  bullets: { titel: string; text: string; tier?: Tier }[]
  faq: { q: string; a: string }[]
  seoTitle: string
  seoDescription: string
}

export const funktionen: Funktion[] = [
  {
    slug: 'angebote',
    name: 'Angebote & Kalkulation',
    icon: FileText,
    tier: 'heute',
    kurz: 'Angebote mit Tiefenkalkulation, Aufmaß und Leistungsvorlagen – in Minuten statt Abenden.',
    heroTitle: 'Angebote schreiben, die kalkuliert sind – nicht geschätzt',
    heroIntro:
      'CraftOS kalkuliert Angebote aus Material, Lohn und Zuschlägen. Aufmaß fließt direkt in die Positionen, Leistungsvorlagen füllen den Rest. Reverse-Pricing verteilt einen Zielpreis nachvollziehbar auf alle Positionen.',
    demo: 'angebot',
    bullets: [
      { titel: 'Tiefenkalkulation', text: 'Material-, Lohn- und Gemeinkostenzuschläge pro Position – mit Lohngruppen für realistische Stundensätze.' },
      { titel: 'Aufmaß & Massen', text: 'Räume und Flächen mit Abzügen erfassen – die Massen wandern automatisch in Angebot und Abrechnung.' },
      { titel: 'Leistungsvorlagen', text: 'Fertige Vorlagen für Elektro, SHK, Maler, Schreiner und Allround-Arbeiten – plus eigene Vorlagen.' },
      { titel: 'Reverse-Pricing', text: 'Zielpreis vorgeben, CraftOS rechnet rückwärts: Rabatte und Anpassungen bleiben nachvollziehbar.' },
      { titel: 'Optional- & Alternativ-Positionen', text: 'Varianten anbieten, ohne das Angebot aufzublähen – der Kunde entscheidet.' },
      { titel: 'GAEB & DATANORM', text: 'Ausschreibungen und Artikelkataloge anbinden – im Ausbau.', tier: 'launch' },
    ],
    faq: [
      { q: 'Wie schnell erstelle ich ein Angebot in CraftOS?', a: 'Mit Leistungsvorlagen und Artikelkatalog steht ein typisches Angebot in wenigen Minuten – inklusive sauberer Kalkulation.' },
      { q: 'Kann ich vom Wunschpreis rückwärts kalkulieren?', a: 'Ja. Reverse-Pricing verteilt Ihren Zielpreis automatisch und transparent auf die Positionen.' },
    ],
    seoTitle: 'Angebote & Kalkulation – Handwerker-Angebotssoftware',
    seoDescription: 'Angebote mit Tiefenkalkulation, Aufmaß, Leistungsvorlagen und Reverse-Pricing. CraftOS – 14 Tage kostenlos testen.',
  },
  {
    slug: 'rechnungen',
    name: 'Rechnungen & E-Rechnung',
    icon: Receipt,
    tier: 'heute',
    kurz: 'Vom Abschlag bis zur Schlussrechnung – mit XRechnung, GiroCode und automatischem Mahnwesen.',
    heroTitle: 'Rechnungen, die sich selbst um die Zahlung kümmern',
    heroIntro:
      'CraftOS erstellt alle Rechnungsarten des Handwerks: Abschlag, Schluss-, Pauschal-, Storno- und Gutschrift. E-Rechnungen (XRechnung) auf Knopfdruck, GiroCode zum Scannen und ein 3-stufiges Mahnwesen, das automatisch läuft.',
    bullets: [
      { titel: 'Alle Rechnungsarten', text: 'Abschlags-, Schluss-, Pauschal-, Stornorechnung und Gutschrift – mit automatischer Abschlagsverrechnung.' },
      { titel: 'E-Rechnung (XRechnung)', text: 'Normkonforme XRechnung erzeugen und empfangen – Pflichtformat für öffentliche Auftraggeber.' },
      { titel: 'GiroCode auf der Rechnung', text: 'Kunde scannt den QR-Code mit der Banking-App – Betrag und Verwendungszweck sind vorausgefüllt.' },
      { titel: 'Automatisches Mahnwesen', text: '3 Mahnstufen mit Fristen und Verzugszinsen – CraftOS erinnert, Sie bleiben höflich.' },
      { titel: 'Sicherheitseinbehalt & VOB', text: 'Einbehalte (5 %/10 %) und Zahlungsziele direkt im Dokument geregelt.' },
      { titel: '§13b & Kleinunternehmer', text: 'Steuerschuldumkehr und §19-Regelung korrekt ausgewiesen – automatisch.' },
    ],
    faq: [
      { q: 'Erstellt CraftOS E-Rechnungen?', a: 'Ja. CraftOS erzeugt XRechnungen (UBL 2.1) und liest eingehende E-Rechnungen automatisch aus.' },
      { q: 'Was passiert, wenn ein Kunde nicht zahlt?', a: 'Das Mahnwesen läuft automatisch in drei Stufen mit konfigurierbaren Fristen und Verzugszinsen.' },
    ],
    seoTitle: 'Rechnungssoftware Handwerk – E-Rechnung, GiroCode & Mahnwesen',
    seoDescription: 'Abschlags- & Schlussrechnungen, XRechnung, GiroCode, automatisches Mahnwesen. CraftOS – 14 Tage kostenlos testen.',
  },
  {
    slug: 'buchhaltung',
    name: 'DATEV, Steuern & Belege',
    icon: Landmark,
    tier: 'heute',
    kurz: 'Belegscan-KI, automatische Kontierung, DATEV-Export und Steuer-Cockpit – prüfbereit ohne Aktenordner.',
    heroTitle: 'Buchhaltung, die der Steuerberater liebt',
    heroIntro:
      'CraftOS liest Eingangsrechnungen per KI aus, schlägt das Buchungskonto (SKR03) vor und übergibt sauber kontiert an DATEV. Das Steuer-Cockpit zeigt USt-Voranmeldung und Fristen, §48b-Nachweise inklusive.',
    bullets: [
      { titel: 'Belegscan mit KI', text: 'Eingangsrechnung fotografieren oder hochladen – Betrag, Lieferant und Positionen werden automatisch erkannt.' },
      { titel: 'Auto-Kontierung (SKR03)', text: 'CraftOS schlägt das passende Konto vor – kostenlos, ohne Credits.' },
      { titel: 'DATEV-Export', text: 'Buchungsdaten mit BU-Schlüsseln (inkl. §13b) direkt an den Steuerberater übergeben.' },
      { titel: 'Steuer-Cockpit', text: 'USt-Voranmeldung, Fristen und Steuer-Meldeprofil an einem Ort – nichts verpassen.' },
      { titel: 'Buchungsjournal & offene Posten', text: 'Jede Zahlung, jeder Beleg nachvollziehbar – GoBD-konform abgelegt.' },
    ],
    faq: [
      { q: 'Funktioniert CraftOS mit meinem Steuerberater?', a: 'Ja. Der DATEV-Export übergibt Buchungssätze inklusive Kontierung – Ihr Steuerberater arbeitet wie gewohnt weiter.' },
    ],
    seoTitle: 'DATEV & Buchhaltung für Handwerker – Belegscan mit KI',
    seoDescription: 'Belege per KI erfassen, automatisch kontieren, an DATEV exportieren. Steuer-Cockpit inklusive. CraftOS – 14 Tage kostenlos testen.',
  },
  {
    slug: 'plantafel',
    name: 'Plantafel & Einsatzplanung',
    icon: CalendarRange,
    tier: 'heute',
    kurz: 'Mitarbeiter, Subunternehmer und Maschinen per Drag & Drop planen – Änderungen sofort aufs Handy.',
    heroTitle: 'Die Plantafel, die Ihre Woche im Griff hat',
    heroIntro:
      'Wer arbeitet wann auf welcher Baustelle? Die CraftOS-Plantafel zeigt Mitarbeiter, Subunternehmer und Ressourcen in einer Wochenansicht. Einsätze werden per Drag & Drop geplant – das Team sieht Änderungen sofort in der App.',
    demo: 'plantafel',
    bullets: [
      { titel: 'Drag & Drop Planung', text: 'Einsätze ziehen, verschieben, verlängern – die Plantafel rechnet Zeiten und Konflikte mit.' },
      { titel: 'Teams & Kolonnen', text: 'Mitarbeiter zu Teams gruppieren und als Kolonne auf Baustellen planen.' },
      { titel: 'Subunternehmer & Maschinen', text: 'Auch Nachunternehmer und Ressourcen (Geräte, Fahrzeuge) haben ihre Zeile.' },
      { titel: 'Push aufs Handy', text: 'Einsatz geändert? Das Team bekommt sofort eine Benachrichtigung in der App.' },
      { titel: 'Kapazitäten im Blick', text: 'Auslastung pro Woche sehen – bevor die Doppelbuchung passiert.' },
    ],
    faq: [
      { q: 'Sehen Mitarbeiter ihre Einsätze in der App?', a: 'Ja. Jeder Mitarbeiter sieht seine zugewiesenen Einsätze in der Mobile-App und wird bei Änderungen per Push informiert.' },
    ],
    seoTitle: 'Plantafel Handwerk – Einsatzplanung per Drag & Drop',
    seoDescription: 'Mitarbeiter, Kolonnen, Subunternehmer & Maschinen planen. Push-Benachrichtigung inklusive. CraftOS – 14 Tage kostenlos testen.',
  },
  {
    slug: 'zeiterfassung',
    name: 'Zeiterfassung & Urlaub',
    icon: Clock,
    tier: 'heute',
    kurz: 'Stunden mobil erfassen – auch per Sprache – mit Arbeitszeitkonto, Urlaub und Export.',
    heroTitle: 'Zeiterfassung, die auf der Baustelle funktioniert',
    heroIntro:
      'Ihr Team bucht Arbeits- und Fahrtzeiten am Handy – auf Wunsch per Spracheingabe, mit GPS-Kontext. Arbeitszeitmodelle, Feiertage je Bundesland, Urlaubsanträge und Arbeitszeitkonto sind eingebaut. Export für die Lohnabrechnung inklusive.',
    demo: 'zeiterfassung',
    bullets: [
      { titel: 'Mobil & per Sprache', text: '„3 Stunden Baustelle Müller" – diktieren statt tippen, CraftOS versteht deutsch.' },
      { titel: 'Arbeit, Fahrt, Pause', text: 'Zeitarten sauber getrennt – für korrekte Lohnabrechnung und Kalkulation.' },
      { titel: 'Urlaub & Abwesenheiten', text: 'Anträge in der App stellen, im Büro freigeben – Resturlaub zählt automatisch.' },
      { titel: 'Arbeitszeitmodelle', text: 'Wochen- und Saisonmodelle, Feiertage je Bundesland, Arbeitszeitkonto.' },
      { titel: 'Projektgenau', text: 'Jede Stunde landet am Projekt – die Nachkalkulation weiß Bescheid.' },
    ],
    faq: [
      { q: 'Können Zeiten per Sprache erfasst werden?', a: 'Ja. Die Spracheingabe (deutsch) wandelt Diktate in fertige Zeiteinträge um – ideal mit Arbeitshandschuhen.' },
    ],
    seoTitle: 'Zeiterfassung Handwerk – mobil, per Sprache, projektgenau',
    seoDescription: 'Mobile Zeiterfassung mit Spracheingabe, Urlaubsverwaltung & Arbeitszeitkonto. CraftOS – 14 Tage kostenlos testen.',
  },
  {
    slug: 'lager',
    name: 'Lager & Materialwirtschaft',
    icon: Boxes,
    tier: 'heute',
    kurz: 'Bestände über Lager, Lagerplätze und Fahrzeuge führen – Entnahmen speisen die Nachkalkulation.',
    heroTitle: 'Wissen, wo Ihr Material ist – und was es kostet',
    heroIntro:
      'CraftOS führt Bestände über mehrere Lager, Lagerplätze und Fahrzeuge. Wareneingang, Warenausgang, Umlagerung und Rückbuchung – jeder Ausgang ist auftragsgebunden und speist die Nachkalkulation in Echtzeit. Mit Seriennummern und KI-Belegscan für den Wareneingang.',
    demo: 'lager',
    bullets: [
      { titel: 'Mehrere Lager & Fahrzeuge', text: 'Hauptlager, Container, Montagebus – jedes Lager mit eigenen Plätzen und Beständen.' },
      { titel: 'Auftragsgenaue Entnahme', text: 'Warenausgänge brauchen Kunde + Auftrag – so stimmt die Nachkalkulation immer.' },
      { titel: 'Seriennummern & Beleg-Scan', text: 'Geräte mit Seriennummer verfolgen, Wareneingänge per Lieferschein-Scan mit KI erfassen.' },
      { titel: 'Rückbuchung vom Auftrag', text: 'Nicht verbautes Material zurückbuchen – die Projektkosten korrigieren sich automatisch.' },
      { titel: 'Mindestbestand & Inventur', text: 'Warnungen bei Meldebestand und geführter Inventur-Workflow.', tier: 'launch' },
    ],
    faq: [
      { q: 'Kann ich Fahrzeugbestände führen?', a: 'Ja. Montagebusse sind eigene Lager – Umlagerungen zwischen Halle und Fahrzeug sind zwei Klicks.' },
    ],
    seoTitle: 'Lagerverwaltung Handwerk – Material auftragsgenau buchen',
    seoDescription: 'Lager, Lagerplätze & Fahrzeuge, Seriennummern, auftragsgebundene Entnahme, Nachkalkulation live. CraftOS – 14 Tage testen.',
  },
  {
    slug: 'baudokumentation',
    name: 'Baudokumentation & Berichte',
    icon: HardHat,
    tier: 'heute',
    kurz: 'Bautagesberichte, Mängel und Abnahmen – mit Fotos, GPS und Unterschrift direkt vom Smartphone.',
    heroTitle: 'Beweise statt Behauptungen: die digitale Bauakte',
    heroIntro:
      'Bautagesberichte mit Fotos, GPS und digitaler Unterschrift entstehen direkt auf der Baustelle. Mängel werden erfasst und verfolgt, Abnahmen protokolliert. Alles landet in der Projektakte – rechtssicher und jederzeit auffindbar.',
    bullets: [
      { titel: 'Bautagesberichte', text: 'Wetter, Personal, Leistung, Fotos – unterschrieben und mit GPS-Position gespeichert.' },
      { titel: 'Mängelverfolgung', text: 'Mangel fotografieren, zuweisen, Frist setzen – bis zur Behebung verfolgt.' },
      { titel: 'Abnahmeprotokolle', text: 'Abnahme mit Unterschrift des Kunden direkt am Gerät – PDF in der Akte.' },
      { titel: 'Projektordner & Dateien', text: 'Pläne, Fotos und Dokumente strukturiert je Projekt – mit Freigaben fürs Team.' },
      { titel: 'Berichtsvorlagen', text: 'Eigene Vorlagen im Designer gestalten – Ihr Betrieb, Ihr Briefkopf.' },
    ],
    faq: [
      { q: 'Sind die Berichte rechtssicher?', a: 'Berichte enthalten Zeitstempel, GPS-Position und digitale Unterschrift – und werden unveränderbar in der Projektakte abgelegt.' },
    ],
    seoTitle: 'Baudokumentation App – Bautagesbericht, Mängel & Abnahme',
    seoDescription: 'Bautagesberichte mit Foto, GPS & Unterschrift. Mängelverfolgung und Abnahmeprotokolle mobil. CraftOS – 14 Tage testen.',
  },
  {
    slug: 'team',
    name: 'Team, Rechte & Nachunternehmer',
    icon: Users,
    tier: 'heute',
    kurz: 'Rollen mit klaren Rechten, Nachunternehmer mit eigenem Zugang – jeder sieht genau das Richtige.',
    heroTitle: 'Jeder im Team sieht genau das, was er braucht',
    heroIntro:
      'CraftOS regelt Zugriffe über Rollen: Admin, Büro, Projektleitung, Team. Monteure sehen ihre Einsätze und Zeiten, das Büro die Projekte, der Chef alles. Nachunternehmer bekommen eigene, begrenzte Zugänge – sauber getrennt vom Betrieb.',
    bullets: [
      { titel: '5 Rollen-Presets', text: 'Von Admin bis Monteur – Rechte sind vorkonfiguriert und anpassbar.' },
      { titel: 'Nachunternehmer-Zugänge', text: 'Subs einladen, Einsätze zuweisen – interne Zahlen bleiben intern.' },
      { titel: 'Einladungen per E-Mail', text: 'Team-Mitglieder in Minuten onboarden – Lizenz zuweisen, fertig.' },
      { titel: 'Kundenportal', text: 'Kunden sehen Angebote, Rechnungen und Termine in ihrem eigenen Portal – und geben Angebote online frei.' },
    ],
    faq: [
      { q: 'Was kostet ein zusätzlicher Monteur?', a: 'Die App-Lizenz für Mitarbeiter im Einsatz kostet 9,95 € pro Monat (99,50 € im Jahresabo).' },
    ],
    seoTitle: 'Teamverwaltung Handwerk – Rollen, Rechte & Subunternehmer',
    seoDescription: 'Rollenbasierte Rechte, Nachunternehmer-Zugänge und Kundenportal. CraftOS – 14 Tage kostenlos testen.',
  },
  {
    slug: 'nachkalkulation',
    name: 'Nachkalkulation & Vorhersagen',
    icon: TrendingUp,
    tier: 'heute',
    kurz: 'Soll/Ist pro Projekt in Echtzeit – plus Vorhersagen für Termin, Liquidität und Saison.',
    heroTitle: 'Wissen, ob die Baustelle verdient – bevor sie fertig ist',
    heroIntro:
      'Die Nachkalkulation stellt Soll und Ist gegenüber: Zeiten, Material, Eingangsrechnungen, Lohnkosten. Dazu prognostiziert CraftOS Fertigstellung, Cashflow und Saisonspitzen – deterministisch berechnet, nicht geraten.',
    bullets: [
      { titel: 'Soll/Ist live', text: 'Jede Stunde und jede Materialentnahme aktualisiert die Projektrentabilität sofort.' },
      { titel: 'Cashflow-Vorhersage', text: 'Offene Posten, Abschläge und Fristen ergeben die Liquiditätskurve der nächsten Wochen.' },
      { titel: 'Fertigstellungs-Prognose', text: 'CraftOS rechnet aus Fortschritt und Tempo den realistischen Endtermin.' },
      { titel: 'Berichte & Auswertungen', text: 'Umsatz, Auslastung, Projekterfolg – als Dashboard und Export.' },
    ],
    faq: [
      { q: 'Woher kommen die Zahlen der Nachkalkulation?', a: 'Aus dem laufenden Betrieb: erfasste Zeiten, gebuchtes Material, Eingangsrechnungen und Lohnkosten je Projekt.' },
    ],
    seoTitle: 'Nachkalkulation Handwerk – Projektrentabilität in Echtzeit',
    seoDescription: 'Soll/Ist-Vergleich, Cashflow-Vorhersage & Fertigstellungsprognose. CraftOS – 14 Tage kostenlos testen.',
  },
  {
    slug: 'kundenportal',
    name: 'Kundenportal',
    icon: Globe,
    tier: 'heute',
    kurz: 'Kunden sehen Angebote, Rechnungen und Termine online – und geben Angebote digital frei.',
    heroTitle: 'Das Portal, das Rückfragen überflüssig macht',
    heroIntro:
      'Ihre Kunden bekommen einen eigenen Zugang: Angebote online freigeben, Rechnungen einsehen und bezahlen, Termine und Nachrichten an einem Ort. Weniger Telefon, schnellere Entscheidungen, professioneller Auftritt.',
    bullets: [
      { titel: 'Angebote online freigeben', text: 'Kunde klickt „Annehmen" – Sie sehen es sofort und legen los.' },
      { titel: 'Rechnungen & Zahlung', text: 'Rechnung einsehen und direkt online bezahlen.' },
      { titel: 'Termine & Nachrichten', text: 'Anstehende Einsätze und die Kommunikation gebündelt im Portal.' },
    ],
    faq: [
      { q: 'Muss mein Kunde eine App installieren?', a: 'Nein. Das Kundenportal läuft im Browser – ein Link genügt.' },
    ],
    seoTitle: 'Kundenportal Handwerk – Angebote online freigeben',
    seoDescription: 'Digitales Kundenportal: Angebotsfreigabe, Rechnungen, Termine & Nachrichten. CraftOS – 14 Tage kostenlos testen.',
  },
]

export function getFunktion(slug: string): Funktion | undefined {
  return funktionen.find((f) => f.slug === slug)
}

/** Vision-/Roadmap-Einträge (bewusst ohne eigene Detailseiten) */
export const vision = [
  {
    name: 'Telefon-Agent',
    text: 'Eine KI nimmt Anrufe entgegen, erfasst das Anliegen, ordnet Bestandskunden zu und legt Aufgaben an – Ihr Front-Office schläft nie.',
  },
  {
    name: 'Offener MCP-Server',
    text: 'Docken Sie Ihre eigene KI (z. B. ChatGPT oder Claude) sicher an CraftOS an – gleiche Rechte, gleiche Datensicherheit wie der eingebaute Agent.',
  },
  {
    name: 'AR-Aufmaß mit Laser-Kopplung',
    text: 'Bosch-Laser per Bluetooth verbinden, Räume in 3D erfassen – und die Maße landen direkt im Angebot.',
  },
] as const
