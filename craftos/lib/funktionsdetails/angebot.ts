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
  Mail,
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
 * - lib/product-register.ts: limitations („Portal-Onlinezahlungen deaktiviert“), liveExtras „Angebotsunterschrift online“ (web:src/pages/QuoteSigning.tsx) und „Besichtigung“
 *   (mobile:src/features/site-visit/screens/SiteVisitScreen.tsx), notLive „Portal-Onlinezahlung“.
 * - Hilfeartikel content/hilfe/angebot-entwurf-anlegen.md, raumaufmass-angebot-uebernehmen.md, gaeb-importieren.md.
 * - Release-Belege laut 07-RESEARCH „Neue Detailseiten“: GAEBImportDialog.tsx, GAEBExportDialog.tsx,
 *   DatanormImportDialog.tsx (web), RoomMeasurementsScreen.tsx (mobile).
 *
 * Abweichung von der Kacheltabelle: Statt „Dokumente ausgeben“ (PDF-Ausgabe, steht weiter in Kurznutzen, Ablauf und
 * Panel) zeigt die letzte wide-Kachel „DATANORM 4 und 5“ (Release src/lib/datanorm/datanormParser.ts). Inhaber 22.10.2026:
 * nur nennen, was unterstützt wird; angebote hat deshalb keine Grenze-Kachel. Anordnung md·sm·sm·wide·wide bleibt.
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
          href: "/hilfe/angebot-online-unterschreiben-lassen",
          zusatz: "angebotsunterschrift",
        },
        {
          size: "wide",
          title: "DATANORM 4 und 5",
          text: "Kataloge Ihres Großhändlers in DATANORM 4 oder DATANORM 5 einlesen und Artikel direkt ins Angebot übernehmen.",
          visual: { kind: "icon", icon: BookOpen },
          href: "/hilfe/datanorm-katalog-importieren",
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
          a: "Ja. Über den persönlichen Link in Ihrer Angebotsmail nimmt Ihr Kunde das Angebot online an und unterschreibt es oder sendet Ihnen eine Ablehnung.",
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
        // Quelle: funktionen.ts angebote note; Release src/lib/datanorm/datanormParser.ts (DATANORM 4 und 5, Semikolonformat).
        {
          q: "Kann ich Artikel per DATANORM ins Angebot übernehmen?",
          a: "Ja. Der DATANORM-Import liest Kataloge in DATANORM 4 und DATANORM 5 (Semikolonformat) ein; die Artikel übernehmen Sie danach in Ihre Angebotspositionen.",
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
          // D-21-Abweichung (09-RESEARCH „Verlinkung – Korrektur“, Orchestrator): die Kachel sitzt auf aufmass.
          href: "/hilfe/besichtigung-durchfuehren",
          zusatz: "besichtigung",
        },
        {
          size: "wide",
          title: "Maße werden eingegeben",
          text: "Sie geben Maße ein und prüfen sie, Öffnungen ziehen Sie als Abzüge von den Flächen ab.",
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
          q: "Wie kommen die Maße ins Aufmaß?",
          a: "Sie geben die Maße ein und prüfen sie. Türen, Fenster und weitere Öffnungen ziehen Sie als Abzüge von den Flächen ab.",
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
    // 09-14 (Orchestrator-Entscheidung 2, L-1): nur am Release geroutete Inhalte. Web 6686d05 src/App.tsx Z. 235–238
    // routet /portal/quotes/:id und /portal/invoices/:id, alles andere zeigt „Ihre Unterlagen“ (09-f.md Befund 1).
    // 09-09 (Release a0e27c42, 09-f.md Befund 7): Die Angebotsmail verlinkt die öffentliche Unterschriftsseite
    // (supabase/functions/_shared/quoteSigning.ts SIGNING_PAGE_PATH, src/pages/QuoteSigning.tsx), die Rechnungsmail
    // trägt das PDF (send-document-email, _shared/mailAttachment.ts); keine Mail verlinkt Portal-Belegseiten.
    lead: "Ihre Kunden unterschreiben Angebote online und erhalten Rechnungen als PDF per E-Mail.",
    secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/kundenportal-kunden-einladen" },
    ablauf: {
      title: "Kundenportal: Online-Unterschrift in vier Schritten",
      lead: "Vom Versand bis zur Antwort auf ein Angebot arbeitet Ihr Kunde im Browser.",
      steps: [
        { title: "E-Mail hinterlegen", text: "Die E-Mail-Adresse Ihres Kunden im Kundenstamm hinterlegen." },
        // Beleg: Angebotsversand mit „Senden“ und „E-Mail senden“ (Hilfeartikel angebot-online-unterschreiben-lassen, 09-f).
        { title: "Angebot senden", text: "Das fertige Angebot aus der Web-App per E-Mail an Ihren Kunden senden." },
        // Beleg: supabase/functions/_shared/quoteSigning.ts (SIGNING_PAGE_PATH „/angebot-unterschreiben“).
        { title: "Angebot öffnen", text: "Der Kunde öffnet das Angebot über den persönlichen Link in Ihrer Angebotsmail." },
        // Beleg: src/pages/QuoteSigning.tsx („Angebot annehmen und unterschreiben“, „Ablehnung senden“).
        { title: "Angebot beantworten", text: "Der Kunde nimmt das Angebot an und unterschreibt es oder sendet eine Ablehnung." },
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
          ],
          // Beleg: src/components/customers/CustomerPortalAccessCard.tsx (Karte „Kundenportal“ mit Status).
          satz: "Im Büro laden Sie Kunden ein und sehen auf der Kundenkarte den Stand der Einladung.",
          lizenzen: ["voll"],
          // WR-03/B13: Kunden sind keine Betriebsrolle; funktionen.ts access „Separater Kundenbereich mit eigenem
          // Login“, Web-Release LicenseType admin | buero | app (keine Kundenlizenz), src/pages/portal/CustomerLogin.tsx.
          kundenHinweis: "Ihre Kunden unterschreiben Angebote im Browser und brauchen keine Lizenz.",
        },
      ],
    },
    kernpunkte: {
      title: "Was das Kundenportal bietet",
      lead: "Online-Unterschrift, Rechnungen als PDF und Zahlung per Überweisung für Ihre Kunden.",
      tiles: [
        {
          // Beleg: src/App.tsx Route /angebot-unterschreiben in PublicRouteBoundary (ohne Anmeldung), QuoteSigning.tsx.
          size: "md",
          title: "Ohne eigenes Konto",
          text: "Zum Unterschreiben braucht Ihr Kunde nur den Link aus Ihrer E-Mail und einen Browser.",
          visual: { kind: "icon", icon: Mail },
        },
        {
          // Beleg: supabase/functions/send-document-email (Anhang über _shared/mailAttachment.ts).
          size: "sm",
          title: "Rechnung als PDF",
          text: "Rechnungen erhält Ihr Kunde als PDF-Anhang Ihrer E-Mail.",
          visual: { kind: "icon", icon: Globe },
        },
        {
          size: "sm",
          title: "Angebote unterschreiben",
          text: "Per persönlichem Link nimmt Ihr Kunde das Angebot an und unterschreibt oder lehnt es ab.",
          visual: { kind: "icon", icon: CheckCheck },
        },
        {
          // Beleg: src/components/portal/PortalPaymentNotice.tsx (Überweisung auf das Konto aus dem Rechnungs-PDF).
          size: "wide",
          title: "Zahlung per Überweisung",
          text: "Rechnungen begleicht der Kunde per Überweisung auf das Konto im Rechnungs-PDF.",
          visual: { kind: "icon", icon: Info },
          grenze: true,
        },
      ],
    },
    faq: {
      title: "Häufige Fragen zum Kundenportal",
      lead: "Kurze Antworten zu Funktionen, Zugang, Zahlung und Vorschau des Portals.",
      items: [
        // Pflichtfrage nach Orchestrator-Entscheidung 2 (09-RESEARCH) positiv: was Kunden am Release erreichen.
        // 09-REVIEW ME-03 (Web-Release c5b5135): Nach der Anmeldung zeigt das Portal nur „Ihre Unterlagen“ mit dem Hinweis
        // auf die E-Mail (CustomerPortalHome.tsx); keine Mail verlinkt Portal-Belegseiten. Belege der Antwort:
        // _shared/quoteSigning.ts + QuoteSigning.tsx (Unterschriftsseite aus der Angebotsmail), send-document-email (PDF),
        // PortalPaymentNotice.tsx (Überweisung).
        {
          q: "Was können Kunden im Kundenportal erledigen?",
          a: "Angebote und Rechnungen senden Sie Ihrem Kunden per E-Mail: Angebote unterschreibt er online über den persönlichen Link oder sendet eine Ablehnung, Rechnungen erhält er als PDF und begleicht sie per Überweisung.",
        },
        // Quelle: CustomerPortalAccessCard.tsx, CustomerPortalInviteDialog.tsx (14 Tage), CustomerInviteAccept.tsx,
        // CustomerPortalHome.tsx („Ihre Unterlagen öffnen Sie über den Link in der E-Mail Ihres Handwerksbetriebs.“).
        {
          q: "Wie bekommt mein Kunde Zugang zum Kundenportal?",
          a: "Sie hinterlegen die E-Mail-Adresse im Kundenstamm und senden über die Karte „Kundenportal“ eine Einladung, die 14 Tage gilt. Ihr Kunde meldet sich danach mit einem Code aus der E-Mail an.",
        },
        // Quelle: PortalPaymentNotice.tsx; Hilfeartikel bankumsaetze-abgleichen (Zahlungseingang erfassen).
        {
          q: "Wie bezahlen Kunden Ihre Rechnungen?",
          a: "Per Überweisung auf das Konto, das auf dem Rechnungs-PDF steht. Den Zahlungseingang erfassen Sie wie gewohnt in der Web-App, zum Beispiel über den Abgleich der Bankumsätze.",
        },
        // Quelle: Angebotsansicht „Online-Unterschrift“ mit „vom Kunden geöffnet“ und „Digital unterschrieben“
        // (Hilfeartikel angebot-online-unterschreiben-lassen, 09-f). Die Portal-Vorschau zeigt Belege, die der Kunde im
        // Portal nicht erreicht (ME-03), und wird deshalb nicht beworben.
        {
          q: "Wie sehe ich, ob mein Kunde ein Angebot unterschrieben hat?",
          a: "In der Angebotsansicht unter „Online-Unterschrift“: Dort steht zum Beispiel „vom Kunden geöffnet“ oder „Digital unterschrieben“ mit Name und Zeitpunkt.",
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
          text: "Kataloge in DATANORM 4 und 5 einlesen und fehlerhafte Zeilen prüfen.",
          visual: { kind: "icon", icon: BookOpen },
          // D-21: DATANORM-Anleitung über das href der vorhandenen Kachel (Anordnung bleibt md·sm·sm·wide·wide).
          href: "/hilfe/datanorm-katalog-importieren",
        },
        {
          size: "wide",
          title: "Universalimport erkennt GAEB",
          text: "Der Universalimport erkennt GAEB-Dateien an ihrer Dateiendung.",
          visual: { kind: "icon", icon: Import },
        },
        {
          size: "wide",
          // K-9/L-1 (09-14): positiv und identisch mit funktionen.ts gaeb note; Beleg GAEBImportDialog.tsx Z. 287/328
          // („X83: GAEB DA XML 3.2 (2013-10) oder 3.3 (2021-05) · bis 5 MiB · UTF-8“).
          title: "GAEB DA XML 3.2 und 3.3",
          text: "Leistungsverzeichnisse als X83 in GAEB DA XML 3.2 oder 3.3 einlesen, bis 5 MiB in UTF-8.",
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
          a: "CraftOS importiert Leistungsverzeichnisse als X83 im Format GAEB DA XML 3.2 oder 3.3 und exportiert X83 sowie die Angebotsabgabe als X84. Importdateien dürfen bis 5 MiB groß sein und sind UTF-8-codiert.",
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
        // Quelle: Release src/lib/datanorm/datanormParser.ts (DATANORM 4 und 5); DatanormImportDialog.tsx
        // („Artikelvorschau“, „Fehlerhafte Zeilen anzeigen“) laut 07-RESEARCH.
        {
          q: "Wird DATANORM 5 unterstützt?",
          a: "Ja. CraftOS liest DATANORM 4 und DATANORM 5 im Semikolonformat, wie Großhändler sie ausliefern. Nach dem Einlesen sehen Sie die Artikelvorschau und übernehmen die Artikel in Ihre Angebote.",
        },
      ],
    },
    verwandt: ["angebote", "aufmass"],
  },
};
