# Content-Paket zum CraftOS-Relaunch

## Ergebnis und Prüfumfang

Am 9. September 2026 wurden genau **24 Ratgeber** unter `content/blog/` und **40 Hilfeartikel** unter `content/hilfe/` erstellt. Alle Inhalte sprechen Leser mit „Sie“ an und verwenden die öffentliche Marke CraftOS. Die Texte sind eigenständig formuliert; Wettbewerber-Hilfen wurden nicht kopiert.

Die Ratgeber umfassen nach dem redaktionellen Ausbau insgesamt 15.510 Wörter (Durchschnitt 646, Spannweite 596–710). Die Hilfeartikel umfassen insgesamt 10.801 Wörter (Durchschnitt 270, Spannweite 252–302). Die Wortzählung berücksichtigt den Markdown-Text nach dem Frontmatter und zählt durch Bindestriche getrennte Wörter einzeln; sie ist eine Umfangskontrolle, kein SEO-Rankingkriterium.

Die Prüfung umfasst die aktuelle Implementierung und sichtbare Beschriftungen im Quellcode. Sie ist **kein abgeschlossener Live-User-Durchlauf** aller Funktionen und bestätigt nicht den bereits ausgerollten Stand jeder Migration. Produktionsverfügbarkeit, echte Rollen-Sitzungen, Veröffentlichung und Website-Routing werden vom integrierenden Hauptagenten geprüft.

## Produktstände und redaktionelle Entscheidungen

- Web-App: `C:/Projekte/craft-connect-buddy`, HEAD `d442df68`, einschließlich gelesener uncommitteter Änderungen; beim abschließenden Statusabruf 73 geänderte beziehungsweise untracked Statuszeilen.
- Mobile-App: `C:/Projekte/CraftOS - Mobile/craftos-mobile`, HEAD `f274e00`, einschließlich gelesener uncommitteter Änderungen; beim abschließenden Statusabruf ebenfalls 73 Statuszeilen.
- Bearbeitungsort dieses Pakets: `C:/Users/badal/.codex/worktrees/craftos-relaunch-01a08357/content`.
- Schreibbesitz: ausschließlich die 64 Markdown-Artikel und diese Auditdatei; keine Code-, CSS-, Paket- oder Framework-Dateien verändert.
- Die erste Admin-Lizenz bildet den Verwaltungszugang. Admin und Büro umfassen die Mobile-App; reine App-Lizenzen eröffnen nicht die vollständige Web-Verwaltung.
- Die vom Nutzer bestätigte Testphase beträgt **10 Tage**. Die Artikel enthalten kein abweichendes Testphasenversprechen; „14 Tage offen“ in einem Mahnbeispiel bezeichnet ausschließlich ein Rechnungsalter.
- Telefon-Agent, offener MCP-Server und zusätzliche Agent-Aktionen werden in den KI-Hilfen als **Demnächst, geplant für September beziehungsweise Anfang Oktober 2026** eingeordnet. Vorhandene bestätigungspflichtige Vorschläge bleiben davon getrennt.
- Der Content veröffentlicht keine unbelegte DATANORM-v5-Kompatibilität, keine aktivierte Onlinezahlung im Kundenportal, kein autonomes KI-Verbuchen und kein pauschales vollständiges Offline- oder Offline-Fotoversprechen.
- GoBD wird anhand konkreter Mechanismen erklärt: Nummernvergabe bei Fertigstellung, Dokumentversion, Bearbeitungssperre, Stornobeleg mit Grund, Belegprüfung, Festschreibung und Änderungsprotokoll; eine pauschale Zertifizierung des Betriebs wird nicht behauptet.
- Rechenbeispiele sind eigene didaktische Beispiele. Die gemeinsame Bezeichnung „Wohnung Lindenstraße“ bezeichnet ein fiktives Projekt; unterschiedliche Artikel beleuchten ausdrücklich unterschiedliche Beispielausschnitte und Beträge.

## Amtliche und fachliche Primärquellen

Alle nachfolgenden Quellen wurden am **9. September 2026** über Webzugriff geöffnet beziehungsweise geprüft. Quellenmetadaten stehen bei den jeweils einschlägigen Artikeln; der Text enthält dort zusätzlich passende direkte Links.

| Quelle | Geprüfter Inhalt | Verwendung |
|---|---|---|
| [§ 14 UStG](https://www.gesetze-im-internet.de/ustg_1980/__14.html) | Rechnungsangaben und Bezug vereinnahmter Teilentgelte in Endrechnungen. | Handwerkerrechnung; Abschlags- und Schlussrechnung. |
| [BMF-FAQ zur E-Rechnung, Stand März 2026](https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html) | Strukturierte E-Rechnung versus einfaches PDF; Übergangsfristen 2026/2027; Empfang seit 2025; Empfängerreferenzen; Bedeutung strukturierter Daten. | Formatvergleich und E-Rechnungsdownload. |
| [§ 286 BGB](https://www.gesetze-im-internet.de/bgb/__286.html) | Voraussetzungen des Verzugs und besonderer Hinweis für Verbraucher im Rahmen der 30-Tage-Regel. | Zahlungserinnerung und Mahnung. |
| [Handwerkskammer Cottbus: Stundenverrechnungssatz](https://www.hwk-cottbus.de/downloads/kalkulation-svs-7,1375.pdf) | Grundzusammenhang von Kosten, produktiver Zeit und Stundenkalkulation. | Stundensatzratgeber. Die konkrete Beispielrechnung ist eigenständig. |
| [GoBD im Amtlichen AO-Handbuch 2025](https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html) | Nachvollziehbarkeit, Belegwesen, Unveränderbarkeit, Protokollierung, Verfahrensdokumentation und Grenzen von Softwaretestaten. | GoBD-Einordnung in Rechnungs-, Beleg- und Exporttexten. |
| [BMF: zweite GoBD-Änderung vom 14. Juli 2025](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html) | Ergänzungen zu strukturierten E-Rechnungsdaten, Aufbewahrung und maschineller Auswertbarkeit; das zugehörige vierseitige PDF wurde gelesen. | Ergänzende aktuelle Quelle für Beleg-/Exporttexte. |

**Quellenabgrenzung:** Der Kopf der genannten AO-Handbuchseite 2025 nennt nur die Änderung vom 11. März 2024. Die Seite wurde deshalb nicht als bereits vollständig um die zweite Änderung 2025 ergänzte Fassung bezeichnet; das separate BMF-Schreiben vom 14. Juli 2025 ergänzt die Quellenbasis.

Es wurden keine pauschalen Steuerfall-Zusagen veröffentlicht. Hinweise zu Kleinunternehmern, Reverse Charge, gemischten Steuersätzen oder öffentlichen Empfängern verweisen auf die Prüfung des tatsächlichen Vorgangs. Aus einem technischen Download wird keine erfolgreiche Empfängerannahme, Steuererklärung oder Zahlung abgeleitet.

## Abgleich der Hilfe mit der Web-App

Die Pfade dieser Tabelle sind relativ zu `C:/Projekte/craft-connect-buddy`. Gruppen nennen die jeweils betroffenen Hilfe-Slugs; die Dateien wurden gezielt gelesen beziehungsweise nach Beschriftungen und Funktionen durchsucht.

| Artikelgruppe | Implementierungsbelege | Festgehaltene Details |
|---|---|---|
| `anmelden-web-mobile` | `src/pages/Auth.tsx`; `src/components/auth/CodeLoginForm.tsx` | Passwort und sechsstelliger E-Mail-Code; Wiederholung mit Versandpause; Google-Konto kann dieselbe E-Mail für Code verwenden; kein produktives SMS-Loginversprechen. |
| `firmenprofil-einrichten` | `src/components/settings/SettingsSidebar.tsx`; `src/pages/settings/FirmaSettings.tsx`; `src/types/license.ts` | Firmendaten, Bankverbindung, Steuern & MwSt, Nummernkreise, Briefpapier; administratives Schreiben von Systemeinstellungen. |
| `kunden-ansprechpartner-anlegen` | `src/pages/Kunden.tsx`; `src/components/customers/CustomerDialog.tsx` | „Kunden“, „Neuer Kunde“, Kontaktfelder; keine erfundene separate Kontaktpersonen-Verwaltung behauptet. |
| `mitarbeiter-einladen-lizenz-zuweisen`, `rollen-zugriffsrechte-einstellen` | `src/pages/Mitarbeiter.tsx`; `src/components/team/NewTeamMemberDialog.tsx`; `src/components/team/EditTeamMemberDialog.tsx`; `src/types/license.ts` | Persönliche Einladung; selbst gesetztes Passwort; Rolle, Finanzsichtbarkeit, alle Projekte, Teamleitung; Inhaber nicht gewöhnlich editierbar. |
| `angebot-entwurf-anlegen`, `angebotspositionen-leistungsvorlagen` | `src/pages/Dokumente.tsx`; `src/components/DocumentEditor/DocumentEditor.tsx`; `DocumentToolbox.tsx` | „Neues Dokument“, „Angebot“, „Angebote/KV“, „Position“, Artikel-/Leistungssuche, Speichern und Vorschau. |
| `position-tiefenkalkulieren` | `src/components/DocumentEditor/PositionCalculator.tsx`; `src/components/settings/SettingsSidebar.tsx` | „Detaillierte Kalkulation“, Kostenzeilen, Lohngruppen, „EP“, „VK gesamt“, Zuschläge; Kostenaufschlag und Marge werden getrennt erklärt. |
| `raumaufmass-angebot-uebernehmen` | `src/components/projects/bauakte/RoomMeasurementDialog.tsx`; `ProjectMeasurementsTab.tsx`; `src/lib/measurements/offerPrefill.ts`; `src/components/DocumentEditor/PositionMeasurementAccordion.tsx` | Web-Dialog erfasst Flächenwerte direkt; „Aufmaß & Massen“, „Raum-Aufmaß“, „Als Angebotspositionen“ öffnet neuen Entwurf; Netto-Wandfläche hat Vorrang; Positionsaufmaß ist eigener Weg. |
| `gaeb-importieren` | `src/components/DocumentEditor/GAEBImportDialog.tsx`; `DocumentEditor.tsx` | Genannte Formate .x83/.x84/.d83, Warnungen, Positionsvorschau, Auswahl und „Preise übernehmen“; keine vollständige GAEB-Universalkompatibilität. |
| `angebot-in-rechnung-uebernehmen`, `abschlagsrechnung-erstellen`, `schlussrechnung-erstellen` | `src/components/documents/CreateInvoiceDialog.tsx`; `src/lib/invoiceModeLogic.ts`; `src/lib/invoiceTypeGate.ts`; `src/pages/DocumentDetail.tsx` | „Rechnung erstellen“, Projektvoraussetzung, pauschaler/kumulativer Modus, Sperre nach erstem Abschlag, Schlussrechnung und Abnahme, Zahlungen getrennt von gestellten Beträgen. |
| `rechnung-fertigstellen` | `src/pages/DocumentDetail.tsx`; `supabase/migrations/20260908020000_finalize_status.sql`; `20260908040000_lock_guard_hardening.sql` | Nummer bei Fertigstellung, Dokumentversion, gesperrter Stand und Statusübergang; keine freie Nachbearbeitung einer fertigen Rechnung. |
| `rechnung-stornieren` | `src/components/documents/StornoDialog.tsx`; `supabase/migrations/20260908030000_cancellation_invoice_type_and_rpcs.sql` | Pflichtgrund; Stornorechnung sofort nummeriert und gesperrt; Originalbezug; optional neuer Entwurf; Storno führt keine Rücküberweisung aus. |
| `berichte-abrechnen` | `src/components/projects/bauakte/ConstructionReportsSection.tsx`; `src/components/baudoku/ReportInvoiceDialog.tsx` | Nur geeignete nicht als Entwurf offene Berichte mit übernehmbaren Positionen; Einzel-/Sammelweg; offene Projektstunden bewusst prüfen. |
| `e-rechnung-herunterladen` | `src/components/documents/EInvoiceDownloadDialog.tsx` | XRechnung XML, ZUGFeRD mit eingebetteter XML, Pflichtangaben, Käuferreferenz, getrennter Empfängerübermittlungsweg. |
| `zahlungen-erfassen` | `src/components/documents/DocumentPaymentsSection.tsx` | Positive Zahlung, Datum, Zahlungsart, Referenz, Skonto/Einbehalt, „Zahlung speichern“; Saldo getrennt vom Rechnungsdokument. |
| `beleg-scannen-pruefen`, `beleg-kontieren-zuordnen` | `src/pages/Eingangsrechnungen.tsx`; `src/components/eingangsrechnungen/IncomingInvoiceDialog.tsx`; `supabase/migrations/20260614140000_eingangsrechnungen_gobd_lock_review_audit.sql` | Finanzgate, Upload, KI-Erkennung, Teilzuweisung an Projekt/Betriebsbereich, DATEV-Konto, explizite KI-Vorschlagsübernahme, Prüfbestätigung und Lock, unveränderliches Original, Audit-Verlauf. |
| `datev-export-erstellen` | `src/pages/Buchungsjournal.tsx`; `src/pages/SteuerberaterExport.tsx`; `src/components/settings/SettingsSidebar.tsx` | „An Steuerberater übergeben“; Zeitraum/Prüfung/Festschreiben/Übergabe; nur festgeschriebene Daten; Blocker und Paketwarnungen; E-Mail-Vorbereitung hängt keine Datei automatisch an. |
| `projekt-phasen-anlegen` | `src/components/projects/NewProjectDialog.tsx`; `ProjectSchedulingTab.tsx`; `PhaseDialog.tsx` | Projektfelder, „Terminplanung“, Phasendaten, Abhängigkeiten und Konflikte mit Projektzeitraum. |
| `plantafel-einsatz-planen`, `planung-mitarbeiter-ressourcen` | `src/components/plantafel/PlantafelHeader.tsx`; `NewAssignmentDialog.tsx`; `ResourceAssignmentDialog.tsx`; `ResourcesManagerDialog.tsx` | „Neuer Einsatz → Mitarbeiter-Einsatz“, Phase/Zeitraum/Person, „Verwalten → Ressourcen verwalten“, Fahrzeuge/Maschinen/Werkzeuge, eigenständige Reservierungen. |
| `projektdateien-ordner` | `src/components/projects/ProjectAssetsTab.tsx`; `src/components/projects/projectTabs.ts` | „Dateien“, „Neuer Ordner“, „Asset hinzufügen“, Vorschau/Download; Originalbelege gesondert geschützt. |
| `zeiteintrag-erfassen-korrigieren`, `zeiten-pruefen-exportieren` | `src/pages/Zeiten.tsx`; `src/components/time/NewTimeEntryDialog.tsx`; `EditTimeEntryDialog.tsx`; `TimeExportDialog.tsx` | Web mit „Stunden“, Datum, Projekt, Typ; Export aktueller Filter und Spalten als CSV/XLSX; nicht identisch mit mobilen Von-/Bis-Feldern. |
| `urlaub-beantragen-bearbeiten` | `src/components/plantafel/PlantafelHeader.tsx`; `VacationRequestsDialog.tsx` | „Verwalten → Urlaubsanträge“, Genehmigen/Ablehnen; Antrag und Entscheidung getrennt. |
| `artikel-stammdaten-anlegen` | `src/pages/Stammdaten.tsx`; `src/components/stammdaten/ArticleDialog.tsx` | Artikel, Name, Einheit, EK/VK, Erstellung; Artikelanlage erzeugt noch keinen Bestand. |
| `lagerorte-lagerplaetze-einrichten` | `src/components/lager/LagerorteSection.tsx`; `LagerDialog.tsx` | Neues Lager, Bezeichnung, Art, optionale Lagerplätze. |
| `wareneingang-buchen`, `material-entnehmen-zurueckbuchen` | `src/pages/Lager.tsx`; `src/components/lager/StockMovementDialog.tsx` | Buchen → Wareneingang/Warenausgang/Rückbuchung vom Auftrag; Einbuchen/Ausbuchen/Zurückbuchen; Projekt- und Bestandswirkung. |
| `inventur-durchfuehren` | `src/components/lager/InventurSection.tsx`; `InventurDialog.tsx` | Lager zählen, Artikel hinzufügen, System/Gezählt/Differenz; Bestätigung der Korrekturen; keine Buchung ohne Abweichung. |
| `bautagesbericht-erstellen`, `mangel-erfassen-bearbeiten`, `abnahme-dokumentieren` | `src/components/projects/bauakte/ProjectBauakteTab.tsx`; `ConstructionReportsSection.tsx`; `DefectsSection.tsx`; `AcceptanceSection.tsx`; `src/components/projects/AcceptanceDialog.tsx` | Baudokumentation mit Berichte/Mängel/Abnahme; getrennte Status und Arbeitsaufgaben; keine automatische rechtliche Erfolgsgarantie. |
| `craft-ai-betriebsdaten-fragen`, `ki-entwurf-pruefen-uebernehmen` | `src/components/layout/AppSidebar.tsx`; `src/components/ai-agent/AiAgentPanel.tsx`; `AiAgentInput.tsx`; `AiAgentDraftCard.tsx`; `AgentStepTimeline.tsx` | Admin/Büro plus Chatfreigabe; konkrete Betriebsfragen; Vorschlag legt noch nichts an; Bestätigen/Verwerfen; bestätigter Einsatz ist echter Einsatz, Angebot/Bericht bleiben Entwürfe. |

## Abgleich mit der Mobile-App

Die Pfade sind relativ zu `C:/Projekte/CraftOS - Mobile/craftos-mobile`.

| Inhalt | Implementierungsbelege | Verwendete Erkenntnis |
|---|---|---|
| Anmeldung | `src/shared/i18n/locales/de/auth.json`; `src/features/auth/screens/LoginScreen.tsx` | Code/Passwort, sechsstelliger E-Mail-Code, Fehlerfälle, Konto-/Abonnement-Sperre. |
| Projektnavigation | `src/shared/i18n/locales/de/projects.json`; `common.json` | Rollenabhängige Tabs; Projektaktionen Aufmaß, Tagesbericht, Mängel, Abnahme, Belege & Dateien. |
| Timer und Nachtrag | `src/features/time-tracking/screens/TimeTrackingScreen.tsx`; `src/shared/i18n/locales/de/time.json` | Starten/Stoppen, Arbeit/Fahrt, „Nachtragen“, Von/Bis/Pause/Summe. |
| Urlaubsanträge | `src/features/vacation/components/VacationTab.tsx`; `src/shared/i18n/locales/de/vacation.json` | Eigene Anträge, offene Anträge für Admin/Büro-Prüfer, Freigeben/Ablehnen, fehlendes Mitarbeiterprofil. |
| Berichte | `src/shared/i18n/locales/de/construction.json` | Berichtstyp, Datum, Arbeiten, Materialverbrauch, Besonderheiten, nächste Schritte, Unterschriften und unterschiedliche Status. |
| Mängel | `src/shared/i18n/locales/de/defects.json` | Ort, Zuständigkeit, Priorität, Frist, Vorher/Nachher, Offen/In Bearbeitung/Behoben/Geprüft. |
| Abnahme | `src/shared/i18n/locales/de/acceptance.json` | Prüfpunkte, Ergebnis, Verweigerung, fehlende Unterschriften, unvollständige Prüfung; mobile und Web-Bezeichnungen können abweichen. |
| Offline | `src/shared/components/OfflineIndicator.tsx`; `src/shared/i18n/locales/de/common.json`; `src/shared/offline/replayManifest.ts`; `replayManifest.test.ts`; `src/shared/lib/offline/pendingPhotos.ts` | Cache und mutationsbezogene Queue; ausstehend/fehlgeschlagen; Erneut versuchen/Verwerfen; selektive Fotowege vorhanden, aber keine pauschale Offline-Unterstützung sämtlicher Fotoansichten. |

## Struktur- und Linkprüfung

Ein lokaler lesender Prüflauf hat alle 64 Frontmatter-Blöcke zeilenweise als JSON-kompatible YAML-Werte verarbeitet und folgende Eigenschaften geprüft:

- Genau 24 Blog- und 40 Hilfe-Dateien.
- Alle zwölf vereinbarten Frontmatter-Felder vorhanden.
- Einheitliche Veröffentlichungs-/Änderungsdaten `2026-09-09` und `draft: false`.
- Funktionsbezüge ausschließlich aus den zehn bestehenden und sechs vorgesehenen Funktionsslugs.
- Quellenobjekte mit `url`, `label` und `checkedAt`; ausschließlich HTTPS-Quellen.
- Keine Raw-HTML-Elemente oder MDX-Bausteine.
- Alle internen `/blog/`- und `/hilfe/`-Links sowie `relatedArticles` lösen innerhalb der 64 Dateien auf.
- Alle `/funktionen/`-Links entsprechen einem der vorgesehenen Slugs.
- Insgesamt 79 unterschiedliche interne Zielpfade geprüft; keine defekten Inhalts- oder Funktionsreferenzen.

Die sechs Blogkategorien enthalten jeweils vier Artikel. Die Hilfeverteilung entspricht dem Auftrag: Einrichtung 5, Angebote 5, Rechnungen 7, Belege 4, Projekte 4, Zeiten 5, Lager 5, Baudokumentation 3, Craft AI 2.

Die Website-Integration muss zusätzlich die tatsächlichen Routen `/gobd`, `/preise`, `/rechner/stundensatz` und `/rechner/angebotskalkulation` bereitstellen sowie Metadaten, Inhaltsverzeichnisse, Suche und verwandte Inhalte aus diesen Daten rendern. Diese Codearbeiten liegen beim Hauptagenten und wurden in diesem isolierten Content-Paket nicht vorgetäuscht.

## Übergabe und verbleibende Gesamtprüfung

Die 64 Artikel sind zur Integration bereit. Vor Veröffentlichung werden die beschriebenen Wege gegen den tatsächlich veröffentlichten Produktstand und die vorhandenen Rollen geprüft. Änderungen in den noch uncommitteten App-Ständen können einzelne Menüpfade oder Verfügbarkeiten verändern.

Der Hauptagent übernimmt die Dateien aus dem Content-Worktree, prüft Build und Darstellung im Kontext der neuen Content-Verarbeitung und pflegt die gemeinsame finale Projektübergabe. Es wurde kein Commit, Push, Versand oder Deployment aus diesem Teilauftrag durchgeführt.
