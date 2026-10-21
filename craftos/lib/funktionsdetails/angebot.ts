import {
  BookOpen,
  Calculator,
  Camera,
  CheckCheck,
  Copy,
  FileInput,
  FileOutput,
  FileText,
  Globe,
  Import,
  Info,
  LayoutGrid,
  MessageSquare,
  Minus,
  Ruler,
  Signature,
} from "lucide-react";
import type { FunktionsdetailInhalt } from "./types";

/**
 * Inhalte der Gruppe Angebot: angebote, aufmass, kundenportal, gaeb (Phase 7, Plan 07-05; FEAT-02, D-02, D-03, D-04).
 *
 * Quellen (nur belegte Aussagen):
 * - 07-UI-SPEC: „Seitentexte“ (Kopfwort, Kurznutzen, Sekundärlink), „Ablaufschritte“, Abschnitt 3 (Rollen),
 *   Abschnitt 4 (Kacheln), Abschnitt 5 (Pflichtfragen), Abschnitt 6 (verwandte Funktionen) – wörtlich übernommen.
 * - lib/funktionen.ts: points, steps, access, note der vier Slugs.
 * - lib/product-register.ts: limitations („Portal-Onlinezahlungen deaktiviert“, „DATANORM v5 nicht als geprüft
 *   zugesagt“), liveExtras „Angebotsunterschrift online“ (web:src/pages/QuoteSigning.tsx) und „Besichtigung“
 *   (mobile:src/features/site-visit/screens/SiteVisitScreen.tsx), notLive „Portal-Onlinezahlung“.
 * - Hilfeartikel content/hilfe/angebot-entwurf-anlegen.md, raumaufmass-angebot-uebernehmen.md, gaeb-importieren.md.
 * - Release-Belege laut 07-RESEARCH „Neue Detailseiten“: GAEBImportDialog.tsx, GAEBExportDialog.tsx,
 *   DatanormImportDialog.tsx (web), RoomMeasurementsScreen.tsx (mobile).
 *
 * Abweichung von der Kacheltabelle (Orchestrator-Auftrag aus 07-04): Die 07-UI-SPEC-Tabelle für angebote hat keine
 * Grenze-Kachel, der Builder verlangt genau eine (D-04). Die Kachel „Dokumente ausgeben“ (PDF-Ausgabe, steht weiter in
 * Kurznutzen, Ablauf und Panel) weicht der Grenze „DATANORM v5 nicht pauschal zugesagt“ aus funktionen.ts `note` und
 * der Register-Limitation; die Anordnung md·sm·sm·wide·wide bleibt.
 */
export const angebotInhalte: Record<string, FunktionsdetailInhalt> = {
  angebote: {
    slug: "angebote",
    kopfwort: "Angebotssoftware,",
    lead: "Positionen mit Lohn, Material und Zuschlägen kalkulieren und als PDF mit Ihrem Briefpapier ausgeben.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/angebot-entwurf-anlegen" },
    ablauf: {
      title: "Angebote in fünf Schritten",
      lead: "Vom Entwurf bis zur Unterschrift bleibt jedes Angebot beim Kunden und beim Projekt.",
      steps: [
        { title: "Entwurf anlegen", text: "Angebotsentwurf mit Kunde und Projektbezug anlegen." },
        { title: "Positionen kalkulieren", text: "Lohn, Material, Geräte und Zuschläge je Position kalkulieren." },
        { title: "Mengen übernehmen", text: "Geprüfte Mengen aus dem Aufmaß als Positionen verwenden." },
        { title: "PDF ausgeben", text: "Angebot prüfen und als PDF mit Ihrem Briefpapier ausgeben." },
        { title: "Online unterschreiben lassen", text: "Ihr Kunde nimmt das Angebot online an und unterschreibt es." },
      ],
    },
    rollen: {
      title: "Wer mit Angeboten arbeitet",
      lead: "Kalkuliert wird im Web, Dokumente unterschreiben Sie je nach Rolle und Freigabe auch in der App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung", zusatz: "eigene Projekte" }],
          satz: "Im Büro kalkulieren Sie Positionen und geben das Angebot als PDF aus.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [],
          satz: "Dokumente unterschreiben Sie je nach Rolle und Freigabe in der App.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Angebotssoftware leistet",
      lead: "Kalkulation, Mengen und Unterschrift greifen in einem Ablauf ineinander.",
      tiles: [
        {
          size: "md",
          title: "Kosten nachvollziehen",
          text: "Lohn, Material, Geräte, Fremdleistungen und weitere Kosten je Position kalkulieren.",
          visual: { kind: "icon", icon: Calculator },
        },
        {
          size: "sm",
          title: "Positionen wiederverwenden",
          text: "Eigene Artikel und Leistungsvorlagen sparen wiederholte Eingaben.",
          visual: { kind: "icon", icon: Copy },
        },
        {
          size: "sm",
          title: "Mengen übernehmen",
          text: "Geprüfte Aufmaßmengen als Angebotspositionen verwenden.",
          visual: { kind: "icon", icon: Ruler },
        },
        {
          size: "wide",
          title: "Angebotsunterschrift online",
          text: "Ihr Kunde nimmt das Angebot online an und unterschreibt es oder sendet eine Ablehnung.",
          visual: { kind: "icon", icon: Signature },
          zusatz: "angebotsunterschrift",
        },
        {
          size: "wide",
          title: "DATANORM v5 nicht pauschal zugesagt",
          text: "Prüfen Sie Ihre konkrete Lieferantendatei, eine pauschale Kompatibilität mit DATANORM v5 wird nicht zugesagt.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur Angebotssoftware",
      lead: "Kurze Antworten zu Unterschrift, Kalkulation, Aufmaß und DATANORM.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: Register liveExtras „Angebotsunterschrift online“
        // (web:src/pages/QuoteSigning.tsx), funktionen.ts kundenportal points „Angebote beantworten“.
        {
          q: "Kann mein Kunde das Angebot online unterschreiben?",
          a: "Ja. Ihr Kunde nimmt das Angebot online an und unterschreibt es oder sendet Ihnen eine Ablehnung. Im Kundenportal kann er freigegebene Angebote ebenfalls annehmen oder mit Rückmeldung ablehnen.",
        },
        // Quelle: funktionen.ts angebote points „Kosten nachvollziehen“, „Positionen wiederverwenden“.
        {
          q: "Welche Kosten kann ich je Position kalkulieren?",
          a: "Lohn, Material, Geräte, Fremdleistungen und weitere Kosten kalkulieren Sie je Position. Eigene Artikel und Leistungsvorlagen ersparen dabei wiederholte Eingaben.",
        },
        // Quelle: content/hilfe/raumaufmass-angebot-uebernehmen.md („Als Angebotspositionen“).
        {
          q: "Kann ich Mengen aus dem Aufmaß übernehmen?",
          a: "Ja. Erfasste Raumflächen übernehmen Sie im Projekt mit „Als Angebotspositionen“ in einen neuen Angebotsentwurf. Leistungen und Preise ergänzen und prüfen Sie anschließend im Editor.",
        },
        // Quelle: funktionen.ts angebote note; Register limitations „DATANORM v5 nicht als geprüft zugesagt“.
        {
          q: "Kann ich Artikel per DATANORM ins Angebot übernehmen?",
          a: "Der DATANORM-Import unterstützt die Übernahme von Artikeldaten. Prüfen Sie Ihre konkrete Lieferantendatei, denn eine pauschale Kompatibilität mit DATANORM v5 wird nicht zugesagt.",
        },
      ],
    },
    verwandt: ["aufmass", "gaeb", "projektverwaltung"],
  },

  aufmass: {
    slug: "aufmass",
    kopfwort: "Aufmaß-App:",
    lead: "Räume, Flächen und Abzüge vor Ort erfassen und die geprüften Mengen ins Angebot übernehmen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/raumaufmass-angebot-uebernehmen" },
    ablauf: {
      title: "Aufmaß in vier Schritten",
      lead: "Vom Raum bis zur Angebotsposition bleiben die Maße beim Projekt.",
      steps: [
        { title: "Raum anlegen", text: "Im Aufmaß des Projekts einen Raum anlegen." },
        { title: "Maße erfassen", text: "Abmessungen für Boden, Wand und Decke eingeben." },
        { title: "Abzüge berücksichtigen", text: "Türen, Fenster und weitere Öffnungen von den Flächen abziehen." },
        { title: "Ins Angebot übernehmen", text: "Geprüfte Mengen als Angebotspositionen verwenden." },
      ],
    },
    rollen: {
      title: "Wer das Aufmaß erfasst",
      lead: "Erfasst wird vor Ort in der App oder im Web, die Angebotskalkulation folgt in der Web-App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung" }],
          satz: "Im Büro übernehmen Sie geprüfte Mengen als Angebotspositionen.",
          lizenzen: ["voll"],
        },
        {
          platform: "mobile",
          rollen: [
            { name: "Mobil-Teamleitung", zusatz: "mit Projektzugriff" },
            { name: "Mobil-Teammitglied", zusatz: "mit Projektzugriff" },
          ],
          satz: "Vor Ort erfassen Sie Räume, Flächen und Abzüge direkt im Projekt.",
          lizenzen: ["voll", "app"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die Aufmaß-App leistet",
      lead: "Räume, Abzüge und Besichtigung liefern prüfbare Mengen für das Angebot.",
      tiles: [
        {
          size: "md",
          title: "Raumweise erfassen",
          text: "Boden-, Wand- und Deckenflächen passend zu den Räumen gliedern.",
          visual: { kind: "icon", icon: LayoutGrid },
        },
        {
          size: "sm",
          title: "Abzüge berücksichtigen",
          text: "Türen, Fenster und weitere Öffnungen fließen in die Mengen ein.",
          visual: { kind: "icon", icon: Minus },
        },
        {
          size: "sm",
          title: "Mengen übernehmen",
          text: "Geprüfte Mengen im Angebot mit Leistung und Preis ergänzen.",
          visual: { kind: "icon", icon: FileText },
        },
        {
          size: "wide",
          title: "Besichtigung",
          text: "Fotos, Videos und Sprachnotizen der Besichtigung gesammelt im Projekt ablegen, bevor Sie das Angebot schreiben.",
          visual: { kind: "icon", icon: Camera },
          zusatz: "besichtigung",
        },
        {
          size: "wide",
          title: "Maße werden eingegeben",
          text: "Sie geben Maße ein und prüfen sie, eine Laseranbindung oder Fotogrammetrie wird nicht vorausgesetzt.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zum Aufmaß",
      lead: "Kurze Antworten zu Messung, Ablauf, Mobile-App und Besichtigung.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts aufmass note.
        {
          q: "Werden Maße automatisch gemessen?",
          a: "Nein. Sie geben Maße ein und prüfen sie, eine Laseranbindung oder Fotogrammetrie wird nicht vorausgesetzt. Türen, Fenster und weitere Öffnungen ziehen Sie als Abzüge von den Flächen ab.",
        },
        // Frage: docs/seo/data/kwmap/questions--aufmass.json („wie erstellt man ein aufmaß“);
        // Antwort: funktionen.ts aufmass steps, content/hilfe/raumaufmass-angebot-uebernehmen.md.
        {
          q: "Wie erstellt man ein Aufmaß mit CraftOS?",
          a: "Sie legen im Aufmaß des Projekts einen Raum an, erfassen Boden-, Wand- und Deckenflächen und berücksichtigen Abzüge. Die geprüften Mengen übernehmen Sie danach als Angebotspositionen und ergänzen Leistung und Preis.",
        },
        // Quelle: funktionen.ts aufmass platforms/access; Mobile-Release RoomMeasurementsScreen.tsx (07-RESEARCH).
        {
          q: "Kann ich das Aufmaß in der Mobile-App erfassen?",
          a: "Ja. Mit Projekt- und Aufmaßrechten erfassen Sie Räume, Flächen und Abzüge vor Ort in der Mobile-App. Die anschließende Angebotskalkulation erfolgt in der Web-App.",
        },
        // Quelle: Register liveExtras „Besichtigung“ (mobile:src/features/site-visit/screens/SiteVisitScreen.tsx),
        // lib/funktionsgruppen.ts ZUSATZ besichtigung.
        {
          q: "Wofür ist die Besichtigung gedacht?",
          a: "In der Besichtigung legen Sie Fotos, Videos und Sprachnotizen vor Ort gesammelt im Projekt ab. So liegen die Eindrücke bereit, bevor Sie Aufmaß und Angebot ausarbeiten.",
        },
      ],
    },
    verwandt: ["angebote", "gaeb", "arbeitsanweisungen"],
  },

  kundenportal: {
    slug: "kundenportal",
    kopfwort: "Kundenportal:",
    lead: "Ihre Kunden sehen freigegebene Angebote, Rechnungen und Termine im Browser und schreiben Ihnen direkt.",
    secondary: { label: "Alle Funktionen ansehen", href: "/funktionen" },
    ablauf: {
      title: "Das Kundenportal in vier Schritten",
      lead: "Von der Einladung bis zur Antwort auf ein Angebot sieht Ihr Kunde nur, was Sie freigeben.",
      steps: [
        { title: "Kunden einladen", text: "E-Mail-Adresse im Kundenstamm hinterlegen und den Kunden einladen." },
        { title: "Unterlagen freigeben", text: "Angebote, Rechnungen und Termine für den Kunden bereitstellen." },
        { title: "Kunde meldet sich an", text: "Der Kunde sieht nur seine freigegebenen Projekte und Dokumente." },
        { title: "Angebot beantworten", text: "Der Kunde nimmt Angebote an oder lehnt sie mit Rückmeldung ab." },
      ],
    },
    rollen: {
      title: "Wer das Kundenportal nutzt",
      lead: "Ihr Büro lädt Kunden ein, der Kunde arbeitet mit eigenem Zugang im Browser.",
      panels: [
        {
          platform: "web",
          rollen: [
            { name: "Admin" },
            { name: "Büro-Leitung" },
            { name: "Büro-Projektleitung" },
            { name: "Kunde", zusatz: "eigener Zugang im Browser" },
          ],
          satz: "Im Büro laden Sie Kunden ein und geben Angebote, Rechnungen und Termine frei.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was das Kundenportal bietet",
      lead: "Dokumente, Termine und Nachrichten liegen für Ihre Kunden an einem Ort.",
      tiles: [
        {
          size: "md",
          title: "Projekte, Termine und Nachrichten",
          text: "Kunden sehen ihre Projekte und Termine und schreiben Ihnen direkt zum Projekt.",
          visual: { kind: "icon", icon: MessageSquare },
        },
        {
          size: "sm",
          title: "Dokumente im Browser",
          text: "Freigegebene Angebote und Rechnungen erscheinen im Kundenbereich.",
          visual: { kind: "icon", icon: Globe },
        },
        {
          size: "sm",
          title: "Angebote beantworten",
          text: "Kunden nehmen Angebote an oder lehnen sie mit Rückmeldung ab.",
          visual: { kind: "icon", icon: CheckCheck },
        },
        {
          size: "wide",
          title: "Zahlung per Überweisung",
          text: "Rechnungen aus dem Portal begleicht der Kunde per Überweisung auf das Konto im Rechnungs-PDF.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zum Kundenportal",
      lead: "Kurze Antworten zu Zahlung, Zugang und Inhalten des Portals.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: funktionen.ts kundenportal note, Register limitations
        // „Portal-Onlinezahlungen deaktiviert“, notLive „Portal-Onlinezahlung“ (PortalPaymentNotice).
        {
          q: "Können Kunden Rechnungen im Portal online bezahlen?",
          a: "Nein. Rechnungen aus dem Portal begleicht der Kunde per Überweisung auf das Konto, das auf dem Rechnungs-PDF steht.",
        },
        // Quelle: funktionen.ts kundenportal steps und access (Einladung im Kundenstamm, eigener Login).
        {
          q: "Wie bekommt mein Kunde Zugang zum Kundenportal?",
          a: "Sie hinterlegen die E-Mail-Adresse im Kundenstamm und laden den Kunden ins Portal ein. Der Kunde meldet sich mit eigenem Login an und sieht nur die für ihn freigegebenen Projekte und Dokumente.",
        },
        // Quelle: funktionen.ts kundenportal intro und points; Register evidence kundenportal
        // (CustomerQuote.tsx, CustomerInvoice.tsx, CustomerSchedule.tsx, CustomerMessages.tsx).
        {
          q: "Was sieht mein Kunde im Kundenportal?",
          a: "Ihr Kunde sieht freigegebene Angebote, Rechnungen und Termine seiner Projekte im Browser. Über Nachrichten schreibt er Ihnen direkt zum Projekt, und Angebote nimmt er an oder lehnt sie mit Rückmeldung ab.",
        },
      ],
    },
    verwandt: ["angebote", "projektverwaltung"],
  },

  gaeb: {
    slug: "gaeb",
    kopfwort: "GAEB-Software",
    lead: "Leistungsverzeichnisse als GAEB X83 importieren, Angebote als X84 abgeben und Artikel per DATANORM einlesen.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/gaeb-importieren" },
    ablauf: {
      title: "GAEB-Dateien in vier Schritten",
      lead: "Vom Leistungsverzeichnis bis zur Angebotsabgabe bleiben die Positionen beim Angebot.",
      steps: [
        { title: "X83 importieren", text: "Leistungsverzeichnis als X83 einlesen und Positionen in der Vorschau wählen." },
        { title: "Angebot kalkulieren", text: "Die übernommenen Positionen wie gewohnt mit Preisen kalkulieren." },
        { title: "X84 exportieren", text: "Nach Preisbestätigung die Angebotsabgabe als X84 erzeugen." },
        { title: "Artikel per DATANORM", text: "Lieferantenkatalog per DATANORM einlesen und fehlerhafte Zeilen prüfen." },
      ],
    },
    rollen: {
      title: "Wer mit GAEB-Dateien arbeitet",
      lead: "Import, Export und DATANORM-Kataloge laufen in der Web-App.",
      panels: [
        {
          platform: "web",
          rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung", zusatz: "eigene Projekte" }],
          satz: "Im Büro lesen Sie Leistungsverzeichnisse ein und geben Angebote als X84 ab.",
          lizenzen: ["voll"],
        },
      ],
    },
    kernpunkte: {
      title: "Was die GAEB-Software leistet",
      lead: "Import, Export und Kataloge greifen beim Angebot ineinander.",
      tiles: [
        {
          size: "md",
          title: "X83 mit Positionsvorschau",
          text: "Leistungsverzeichnisse einlesen und Positionen in der Vorschau gezielt auswählen.",
          visual: { kind: "icon", icon: FileInput },
        },
        {
          size: "sm",
          title: "X84 Angebotsabgabe",
          text: "Der Export setzt eine vollständig importierte Original-X83 voraus.",
          visual: { kind: "icon", icon: FileOutput },
        },
        {
          size: "sm",
          title: "DATANORM-Kataloge",
          text: "Kataloge einlesen und fehlerhafte Zeilen prüfen; DATANORM v5 ist nicht pauschal zugesagt.",
          visual: { kind: "icon", icon: BookOpen },
        },
        {
          size: "wide",
          title: "Universalimport erkennt GAEB",
          text: "Der Universalimport erkennt GAEB-Dateien an ihrer Dateiendung.",
          visual: { kind: "icon", icon: Import },
        },
        {
          size: "wide",
          title: "Nur GAEB DA XML",
          text: "GAEB 90 und GAEB 2000 werden nicht unterstützt, Dateien sind bis 5 MiB in UTF-8 möglich.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zur GAEB-Software",
      lead: "Kurze Antworten zu Formaten, Positionsauswahl, Export und DATANORM.",
      items: [
        // Pflichtfrage 07-UI-SPEC Abschnitt 5; Beleg: Web-Release src/lib/gaeb/gaebParser.ts (GAEB DA XML 3.3,
        // X83/X84), GAEBExportDialog.tsx; funktionen.ts gaeb note.
        {
          q: "Welche GAEB-Formate unterstützt CraftOS?",
          a: "CraftOS importiert Leistungsverzeichnisse als GAEB X83 und exportiert X83 sowie die Angebotsabgabe als X84, jeweils im Format GAEB DA XML. GAEB 90 und GAEB 2000 werden nicht unterstützt, Dateien sind bis 5 MiB in UTF-8 möglich.",
        },
        // Quelle: content/hilfe/gaeb-importieren.md („Positionsvorschau“, „Alle auswählen“, „Preise übernehmen“).
        {
          q: "Kann ich Positionen vor dem Import auswählen?",
          a: "Ja. Die Positionsvorschau zeigt Positionen, Mengen und Einheiten, bevor Sie gezielt einzelne oder alle Positionen übernehmen. Ob Preise mit übernommen werden, entscheiden Sie beim Import.",
        },
        // Quelle: Web-Release GAEBExportDialog.tsx (X84 nur mit vollständig importierter Original-X83,
        // Preisbestätigung) laut 07-RESEARCH; funktionen.ts gaeb points „X84 Angebotsabgabe“.
        {
          q: "Wann kann ich ein Angebot als X84 exportieren?",
          a: "Der Export als X84 setzt eine vollständig importierte Original-X83 voraus. Nach der Preisbestätigung erzeugen Sie daraus die Angebotsabgabe.",
        },
        // Quelle: Register limitations „DATANORM v5 nicht als geprüft zugesagt“; DatanormImportDialog.tsx
        // („Artikelvorschau“, „Fehlerhafte Zeilen anzeigen“) laut 07-RESEARCH.
        {
          q: "Wird DATANORM v5 unterstützt?",
          a: "Eine pauschale Kompatibilität mit DATANORM v5 wird nicht zugesagt. Lesen Sie Ihren Lieferantenkatalog ein und prüfen Sie in der Artikelvorschau und bei den fehlerhaften Zeilen, ob die Daten passen.",
        },
      ],
    },
    verwandt: ["angebote", "aufmass"],
  },
};
