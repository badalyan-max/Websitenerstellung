# GPS, Projektzuordnung, Einsatzkarte und Unterschriften

Stand: 9. September 2026. Diese Prüfung belegt die öffentlich beschriebenen Funktionen anhand des lokalen Produktcodes einschließlich des vorhandenen Arbeitsstands. Sie ist keine neue Live- oder Deploymentprüfung.

## Quellen und Umfang

| Produkt | Repository | Branch und HEAD bei der Prüfung | Arbeitsstand |
|---|---|---|---|
| Web | `C:/Projekte/craft-connect-buddy` | `main`, `179cef55583e67b2853f1154ed1efe68a418bb3f` | 67 vorhandene Änderungen; aktuelle Dateien und relevante Migrationen lesend berücksichtigt. |
| Mobile | `C:/Projekte/CraftOS - Mobile/craftos-mobile` | `master`, `9e6260d3c1bb9b50139c87777a72806b3499c4a8` | 29 vorhandene Änderungen; in den untersuchten GPS-Funktionsdateien keine Abweichung zu HEAD. |

Keine Produktdateien verändert, keine Transaktionen erzeugt, keine Konten verwendet und keine Tests oder Builds in den Produktrepositories gestartet. Fremde Änderungen bleiben erhalten; ihre Inhalte sind für diesen Bericht nicht aufgelistet. Die folgenden Pfade beziehen sich jeweils auf das genannte Repository; Zeilenangaben gelten für diesen Prüfstand.

Die Website-Inhalte werden separat im Worktree `C:/Users/badal/.codex/worktrees/craftos-gps-content-20260909` ab Website-Commit `25c178bcab95515bd59f0f4cbc7111f68c8713c7` bearbeitet. Preisangaben gehören nicht zu diesem Auftrag und bleiben unverändert.

## 1. Arbeitszeiten mit GPS erfassen

### Auslöser und Speicherung

Beim ausdrücklichen Starten und Stoppen eines mobilen Timers fragt die App den aktuellen Gerätestandort ab. Ohne erfolgreichen Standortabruf wird die jeweilige Aktion nicht ausgeführt. Ein erfolgloser Stopp beendet den laufenden Timer nicht.

| Beleg in Mobile | Beobachtung |
|---|---|
| `src/features/time-tracking/screens/TimeTrackingScreen.tsx:180–216` | Standort vor Start beziehungsweise Stopp erforderlich; sichtbare Fehlermeldung und Abbruch bei Fehler. |
| `src/features/dashboard/screens/DashboardScreen.tsx:86–129` | Derselbe Ablauf beim Timer im Dashboard. |
| `src/features/time-tracking/hooks/useTimeEntries.ts:382–443` | Timerstart schreibt Person, Projektbezug und `start_geo_lat`, `start_geo_lng`, `start_geo_accuracy` nach `time_entries`; lokaler Timer speichert `startGeo`. |
| `src/features/time-tracking/hooks/useTimeEntries.ts:475–508` | Offline-Stopp erzeugt einen ausstehenden Eintrag mit ursprünglichem Startpunkt und beim Stopp aufgenommenem Endpunkt. |
| `src/features/time-tracking/lib/offlineReplays.ts:50–81,134–155` | Übertragung speichert Start-/Endkoordinaten und Genauigkeit; Stopp aktualisiert Ende und Stunden, nicht das Projekt. |
| `src/features/time-tracking/components/TimeEntrySheet.tsx:204–220` | Neuer manueller Mobile-Eintrag erfordert Standort beim Speichern; Bearbeiten eines bestehenden Eintrags fragt keinen neuen Standort ab. |

Wichtig für Nachträge: Der Punkt eines neu gespeicherten rückwirkenden Mobile-Eintrags ist der Standort beim Nachtragen. Er belegt keinen historisch rekonstruierten Aufenthaltsort während der eingetragenen Arbeitszeit. Die manuelle Web-Zeiterfassung erhebt keinen neuen GPS-Punkt (`src/components/time/QuickTimeEntry.tsx:41,82` in Web).

### Anzeige

| Produkt und Beleg | Anzeige |
|---|---|
| Mobile `src/features/time-tracking/components/EntryList.tsx:105–110` | Startstandort in der Liste. |
| Mobile `src/features/time-tracking/components/TimeEntrySheet.tsx:406–425` | Start- und Endstandort als vorhandene, nicht editierbare Angaben. |
| Mobile `src/shared/components/GeoLocationLabel.tsx:43–84` | Aufgelöste Adresse oder Koordinaten, Genauigkeit und gegebenenfalls Zeitpunkt; Verknüpfung zum einzelnen Punkt auf Google Maps. |
| Web `src/pages/Zeiten.tsx:463`, `src/components/projects/ProjectTimeTab.tsx:149` | Standort beim Zeiteintrag beziehungsweise im Projekt. |
| Web `src/components/time/EditTimeEntryDialog.tsx:300` | Vorhandene Start- und Endpunkte in den Details. |
| Web `src/components/GeoLocationLabel.tsx:44–59` | Ungefähre Ortsangabe mit Koordinaten als Rückfall und Kartenverknüpfung. |

### Freigabe und Fehlerfälle

`src/shared/hooks/useGeolocation.ts:18–44,57–80` in Mobile behandelt fehlende Unterstützung, verweigerte Freigabe, fehlendes Signal und Zeitüberschreitung. `src/shared/lib/despia/index.ts:384–395,419–429` verwendet `navigator.geolocation.getCurrentPosition`: zuerst hohe Genauigkeit mit zehn Sekunden Zeitlimit, bei Nichtverfügbarkeit beziehungsweise Zeitüberschreitung einen zweiten Versuch mit geringerer Genauigkeit und bis zu 60 Sekunden altem Positionswert. Verweigerte Freigabe wird nicht durch einen heimlichen zweiten Abruf umgangen.

Es handelt sich um einzelne Abrufe bei Benutzeraktionen. Für `watchPosition` sowie die vorhandenen Hintergrundortungs-Wrapper wurden keine aufrufenden Funktionspfade in `src` gefunden. Kein geprüfter Ablauf erzeugt einen kontinuierlichen Bewegungsverlauf. Die gemeldete Genauigkeit und mögliche kurze Zwischenspeicherung verbieten das Versprechen einer zentimetergenauen Echtzeitposition.

**Öffentliche Formulierung:** „Erfassen Sie Arbeitszeiten mit Standort. Beim Starten und Stoppen hält die Mobile-App jeweils einen GPS-Punkt fest, den Sie nach der Synchronisierung auch im Büro am Zeiteintrag nachvollziehen können.“

**Passende Hilfegrenze:** Standortfreigabe und erfolgreiche Ortung sind erforderlich. Ohne GPS wird Start beziehungsweise Stopp nicht abgeschlossen. Einzelne Punkte, kein Dauertracking.

## 2. Automatische Projektzuordnung

### Tatsächlicher Ablauf

Beim mobilen Timerstart aus Dashboard oder Zeitansicht ohne vorgegebenes Projekt wird das nächstgelegene zugängliche, nicht archivierte Projekt innerhalb des wirksamen Radius direkt ausgewählt. Dies ist eine automatische Zuordnung, nicht bloß eine Vorschlagsliste. Ohne Treffer bleibt der Timer ohne Projektbezug.

| Beleg in Mobile | Verhalten |
|---|---|
| `src/features/dashboard/screens/DashboardScreen.tsx:121–129` | Ergebnis von `findNearestProject` wird an den Timerstart übergeben. |
| `src/features/time-tracking/screens/TimeTrackingScreen.tsx:209–216` | Automatischer Projektbezug beim Start aus der Zeitansicht. |
| `src/shared/lib/geo/nearestProject.ts:53–76` | Distanzberechnung, Ausschluss fehlender Koordinaten, Projektradius vor Standardradius, nächster Treffer innerhalb des Radius. |
| `src/features/projects/hooks/useProjects.ts:38–57` | Nur nicht archivierte Projekte aus dem durch Zugriffsregeln sichtbaren Bestand. |
| `src/features/projects/screens/ProjectDetailScreen.tsx:233–241` | Ein ausdrücklich aus dem Projekt gestarteter Timer verwendet dessen Projekt-ID. |
| `src/features/time-tracking/components/TimeEntrySheet.tsx:97–126` | Neuer manueller Eintrag für Arbeit/Fahrt erhält eine bestmögliche, editierbare Vorauswahl; expliziter Projektbezug und Benutzerwahl gehen vor. |

Beim Stoppen findet **keine neue Projektzuordnung** statt. Der Stopp-Pfad in `src/features/time-tracking/lib/offlineReplays.ts:134–155` schreibt kein `project_id`; in den geprüften Backend-Funktionen und Migrationen wurde kein entsprechender Zuordnungstrigger gefunden. Der Timer wechselt auch nicht allein durch das Betreten eines anderen Radius das Projekt.

### Adresse, Koordinaten und Radius

| Produkt und Beleg | Voraussetzung beziehungsweise Einstellung |
|---|---|
| Mobile `src/shared/hooks/useGeoRadius.ts:11–35` | Geräteeinstellung in lokalem Speicher: 50/100/200 Meter, Standard 100 Meter. |
| Mobile `src/features/settings/screens/SettingsScreen.tsx:190–212` | Sichtbares Menü „Automatische Projektzuordnung“. |
| Web `src/components/projects/EditProjectDialog.tsx:486–512` | Pro Projekt „App-Standard“ oder 50/100/200 Meter. Ein eigener positiver Projektradius überschreibt die Geräteeinstellung. |
| Web `src/api/projects.ts:217,284` | Adressauflösung beim Anlegen beziehungsweise bei geänderter Adresse. |
| Mobile `src/features/projects/lib/offlineReplays.ts:22–50,67–85` | Koordinaten aus Adressauswahl oder nachträglicher Adressauflösung; ein Fehlschlag darf nicht als erfolgreich gespeicherter Standort dargestellt werden. |
| Mobile `src/shared/lib/geo/geocodeAddress.ts:22–38` | Bestmögliche Adressauflösung mit `null` bei Fehler. |
| Mobile `src/features/projects/screens/ProjectDetailScreen.tsx:119–121,150–167,380` | Standort per GPS ergänzen, wenn Koordinaten fehlen; beschränkt auf Admins beziehungsweise berechtigte Leitung. |
| Web `supabase/migrations/20260614130000_projects_geo_coordinates.sql:13` | Koordinaten optional; gesetzter Projektradius muss positiv sein. |

Eine Projektadresse allein garantiert keinen verwendbaren Kartenpunkt. Bei einer fehlgeschlagenen Auflösung nach Adressänderung können bisherige Koordinaten erhalten bleiben. Hilfe und Illustration sollen deshalb zu einem Kontrollblick auf den Projektstandort anleiten.

Die derzeitigen Produkthilfetexte `src/shared/i18n/locales/de/settings.json:30–32` (Mobile) und `src/components/projects/EditProjectDialog.tsx:512` (Web) nennen „Starten/Stoppen“. Diese Formulierung ist durch den Stopppfad nicht gedeckt und wird auf der Website nicht übernommen. Der Produktcode wurde in diesem Website-Auftrag nicht geändert.

**Öffentliche Formulierung:** „Starten Sie auf der Baustelle den Timer: CraftOS ordnet das passende Projekt in Ihrer Nähe automatisch zu.“

**Passende Hilfegrenze:** Gilt ohne bereits vorgegebenes Projekt, mit GPS, Projektzugriff und passenden gespeicherten Koordinaten innerhalb des Radius. Bei mehreren nahen Baustellen die Auswahl kontrollieren; kein Treffer bedeutet zunächst keine Projektzuordnung. Mobile Nachträge haben eine änderbare Vorauswahl.

## 3. Teamplanung und Einsatzorte auf der Karte

### Web: geplante Orte mit Teambezug

`src/pages/Einsaetze.tsx:105,208` zeigt geplante Einsätze mit Datums- und Mitarbeiterfilter sowie Karte, Route und verfügbarer Optimierungsaktion. Die Kartenkoordinaten stammen aus dem Einsatz-Ziel beziehungsweise ersatzweise aus dem Projekt (`src/api/assignments.ts:90`, `src/hooks/useDispatch.ts:141`).

Die Karte zeigt **geplante Einsatzorte**, keine aktuellen Mitarbeiterpositionen. Die Prüfung der Kartenverbraucher ergab keine eigenständige GPS-Teamkarte: `MapView` wird in der Web-Einsatzseite verwendet, die gespeicherten Zeit-/Signaturpunkte werden als Ortsangaben mit Kartenlink angezeigt.

Ohne Koordinaten bleibt der Einsatz in der Web-Liste sichtbar und wird mit „Keine Koordinaten“ gekennzeichnet (`src/pages/Einsaetze.tsx:282`). Ohne Kartenkonfiguration zeigt `src/components/map/MapView.tsx:73` einen Rückfallzustand; Tokenwerte wurden nicht gelesen.

### Mobile: Auftrag, Zielort und Anfahrt

| Beleg in Mobile | Verhalten |
|---|---|
| `src/features/assignments/hooks/useAssignments.ts:81–95` | Zielkoordinaten des Einsatzes oder ersatzweise Projektkoordinaten. |
| `src/features/assignments/screens/DispatchDetailScreen.tsx:71–83,218–234` | Eine Zielmarkierung plus gegebenenfalls Route; Offline-Platzhalter für die Karte. |
| `src/features/assignments/hooks/useDirections.ts:32–75` | Einmaliger bestmöglicher GPS-Abruf, danach Online-Routenanfrage über `navigation` mit Fahrprofil. |
| `src/features/assignments/components/DispatchAssignmentCard.tsx:104` | Kleine Standortkarte in der Einsatzkarte. |
| `src/features/assignments/hooks/useAssignments.ts:248–267` | Mitzugeordnete Personen aus Einsätzen desselben Projekts/Datums, begrenzt durch dieselben Zugriffsregeln. |
| `src/shared/lib/navigation.ts:48–53,64–65,94–101` | „Einsätze“ ist bei App-Lizenzen ein eigener Navigationsbereich; andere Rollen erreichen ihn gegebenenfalls unter „Mehr“. |
| `src/shared/lib/geo/mapbox.ts:13–18` | Öffentliche Kartenkonfiguration erforderlich; kein Tokenwert für diese Prüfung ausgelesen. |

Bei verweigerter Standortfreigabe fehlt die Route ab der eigenen Position; das gespeicherte Ziel wird dadurch nicht gelöscht. Karten und Routen brauchen Internet. Die sichtbaren Teamnamen sind keine pauschale organisationsweite Mitarbeiterliste: Ein Teammitglied mit Zugriff nur auf eigene Einsätze kann daraus keine vollständige Teambesetzung abrufen.

**Öffentliche Formulierung:** „Sehen Sie die geplanten Einsätze Ihres Teams auf der Karte. Unterwegs öffnet Ihr Team den Auftrag mit Zielort und verfügbarer Route.“

**Passende Hilfegrenze:** Geplante Einsatzorte, keine Live-Standorte. Kartenpunkte benötigen Ziel-/Projektkoordinaten, Karten und Routen eine Verbindung; eine Route ab dem eigenen Standort zusätzlich GPS. Sichtbarkeit folgt Rolle und Projektzugriff.

## 4. Unterschriften mit Standort und Zeitpunkt

### Auslöser und Dokumentarten

Die Bestätigung einer mobilen Unterschrift fragt einen einzelnen Standort ab. Bei fehlgeschlagener Ortung wird die Bestätigung abgebrochen, die Zeichnung bleibt erhalten (`src/shared/components/SignaturePad.tsx:188–207`, `src/shared/components/FullscreenSignatureOverlay.tsx:174–201`).

| Mobile-Pfad | Speicherung |
|---|---|
| `src/features/construction-reports/screens/DailyReportScreen.tsx:163–170,188–210,506–510` und `src/features/construction-reports/lib/offlineReplays.ts:24–68` | Bautagesberichte: GPS, Genauigkeit und Zeitpunkt separat je Unterzeichnendem in `construction_reports`. |
| `src/features/acceptance/screens/AcceptanceScreen.tsx:432–459` und `src/features/acceptance/lib/offlineReplays.ts:23–64` | Abnahme: GPS, Genauigkeit und Zeitpunkt getrennt für Auftragnehmer und Auftraggeber in `acceptance_protocols`. |
| `src/features/documents/screens/DocumentSignScreen.tsx:35,61–74,166–171` | Kundendokumente: Lieferschein, Auftragsbestätigung und Angebots-Dokumenttypen (`delivery_note`, `order_confirmation`, `quote`, `offer`). |
| `src/features/documents/hooks/useSignDocument.ts:54–81` | Unterschriftsbild hochladen, dann Dokument mit `customer_signature_url`, `signed_at`, Kunden-GPS und Status aktualisieren. Dieser Ablauf hat keine Offline-Warteschlange. |

Bei Berichten und Abnahmen wird der Zeitpunkt der Bestätigung je Person festgehalten. Beim Kundendokument wird `signed_at` beim Speichervorgang nach dem Bild-Upload gesetzt. Deshalb nicht dokumentübergreifend eine identische technische Zeitmessung oder eine universelle Offline-Unterschrift versprechen.

### Anzeige im Projekt und Dokument

| Produkt und Beleg | Anzeige |
|---|---|
| Mobile `src/features/construction-reports/screens/ConstructionReportDetailScreen.tsx:255–277` | Standort, Genauigkeit und Zeitpunkt an der jeweiligen Berichtsunterschrift. |
| Mobile `src/features/acceptance/screens/AcceptanceProtocolDetailScreen.tsx:282–305` | Entsprechende Angaben je Abnahme-Unterschrift. |
| Mobile `src/features/documents/screens/DocumentSignScreen.tsx:97–103` | Gespeicherter Kundenstandort am unterschriebenen Dokument. |
| Web `src/components/projects/bauakte/ConstructionReportsSection.tsx:268` | Berichtsunterschrift mit Standortangaben. |
| Web `src/components/projects/bauakte/AcceptanceSection.tsx:118` | Abnahme-Unterschrift mit Standortangaben. |
| Web `src/pages/DocumentDetail.tsx:684,729` | Kundenunterschrift und gespeicherter Standort. |

**Öffentliche Formulierung:** „Dokumentieren Sie Unterschriften mit Ort und Zeitpunkt. Die Angaben bleiben direkt am Bericht oder Abnahmeprotokoll sichtbar – auf dem Handy und nach der Synchronisierung im Büro.“

**Passende Hilfegrenze:** Standortfreigabe und erfolgreiche Ortung sind bei der mobilen Bestätigung erforderlich. Es wird der Gerätestandort dieser Aktion gespeichert. Daraus folgt keine garantierte Identitätsprüfung, qualifizierte elektronische Signatur oder pauschale rechtliche Beweissicherheit; solche Aussagen gehören nicht in die Produktbeschreibung.

## Rechte, Lizenzen und gespeicherte Altdaten

GPS-Felder besitzen in den geprüften Abläufen keinen eigenen separat verkauften GPS-Schalter. Das bedeutet nicht, dass jeder Nutzer jeden Standort sehen kann: Die Sichtbarkeit hängt am zugehörigen Zeit-, Einsatz-, Projekt- oder Dokumentdatensatz.

| Beleg | Wirkung |
|---|---|
| Mobile `src/AppRoot.tsx:85–95,118–150`, `src/shared/hooks/useLicense.ts` | Geschützte Sitzung und Abonnementprüfung; Zeit-, Einsatz- und Dokumentpfade innerhalb dieser Grenzen. |
| Web `src/components/ProtectedRoute.tsx:81`, `src/App.tsx:250`, `src/types/license.ts:134` | App-Lizenz erhält keinen Web-Bürozugang; Web-Einsatzseite an Plantafel-Freigabe gebunden. |
| Web `supabase/migrations/20260611184100_time_entries_role_scoped_select_and_writes.sql:42` | Zeitdaten nach Rolle begrenzt: organisationsweit für entsprechende Administration/Büroleitung, projektbezogen für Projekt-/Teamleitung, eigene Daten für Teammitglieder. |
| Web `supabase/migrations/20260619120000_e0_assignments_role_scoped_rls.sql:50` | Entsprechende Reichweiten beim Lesen von Einsätzen. |
| Web `supabase/migrations/20260903035004_assignments_write_scope_buero_leitung.sql:12` | Planungs-Schreibrechte von bloßer Lesesicht getrennt. |
| Web `supabase/migrations/20260611184036_org_scope_site_documentation_tables.sql:83` | Bericht/Abnahme an Ersteller beziehungsweise Projektzugriff gebunden. |
| Web `supabase/migrations/20260907223000_subscription_gate_fixes.sql:54` | Abonnementgrenzen auch für Berichte, Abnahmen und Einsätze. |
| Web `supabase/migrations/20260614120000_geo_capture_time_signatures.sql:16` | GPS-Spalten sind optional: Altbestände und über andere erlaubte Wege entstandene Datensätze können ohne Standort existieren. Die aktuelle Mobile-Oberfläche verlangt GPS bei den beschriebenen Aktionen. |

Öffentliche Texte sollen deshalb von „berechtigten Personen“, „Projektzugriff“ und erfolgreicher Synchronisierung sprechen. Keine Behauptung, dass alle historischen Einträge nachträglich einen Standort erhalten, jeder Mitarbeiter alle Teamstandorte sieht oder Web-Nachträge einen GPS-Nachweis erzeugen.

## Redaktionelle Umsetzung und Grenzen der Illustrationen

- Funktionsseiten: Nutzen von GPS-Zeit, automatischer Startzuordnung, Einsatzkarte und ortsbezogener Unterschrift im Einstieg und in den Funktionspunkten sichtbar machen.
- App-Seite und Faktenübersicht: dieselben vier Zusammenhänge knapp erklären und auf passende Hilfe verlinken.
- Hilfe: tatsächliche Menüs, Radiuswahl, Projektkoordinaten, Standortfreigabe, fehlender GPS-Empfang, Synchronisierung und Rechte erläutern.
- Ratgeber: Nutzen in der täglichen Zusammenarbeit vermitteln und für die Einrichtung auf die Hilfe verweisen.
- Illustration: Ein Standortpunkt darf beim Start oder Bestätigen erscheinen; eine dauerhaft laufende Ortung, sich ständig bewegende Team-GPS-Pins oder eine automatische Projektwahl beim Stoppen wären sachlich falsch.
- Beispielprojekte und Personen sind fiktiv. Eine Website-Illustration führt keine echte Zeitbuchung, Standortaufnahme, Planung oder Unterschrift aus.

Lokale Codeprüfung ist die Grundlage dieses Berichts. Root übernimmt die Prüfung der Website-Darstellung und die Gesamtvalidierung; ein veröffentlichter Produktstand wurde in dieser Recherche nicht erneut verifiziert.

## Ergänzung: Benachrichtigungen bei Einsatzänderungen

Der Codeabgleich vom 9. September 2026 bestätigt einen direkten Datenbanktrigger für neue und geänderte Mitarbeiter-Einsätze. Das Datum bei gleicher Person zu ändern erzeugt „Einsatz verschoben“ mit Projekt und neuem Datum. Titel und Text der Website-Illustration sind gekürzt; es ist keine echte zugestellte Nachricht.

- Web `supabase/migrations/20260703160000_e6b_assignment_push_no_past_filter.sql:31–136`: Ereignisse „Neuer Einsatz“, „Einsatz verschoben“ und „Einsatz geändert“.
- Web `supabase/migrations/20260702130000_e6_assignment_push.sql:49`: Empfängerzuordnung zum App-Benutzer, keine Selbstbenachrichtigung; Web-Benachrichtigung und OneSignal-Aufruf.
- Mobile `src/contexts/AuthContext.tsx:362`, `src/shared/lib/pushPref.ts:34`, `src/shared/lib/despia/index.ts:263`: Registrierung nach Anmeldung, App-Präferenz und native Push-Erlaubnis.
- Web `supabase/migrations/20260619140000_e0_vacation_decision_push.sql:85`, `supabase/functions/send-onesignal-notification/index.ts:114`: asynchrone Weiterleitung und Authentifizierung. Kein zusätzlicher Cron für direkte Änderungen nötig.

Der Test löst keine Produktbenachrichtigung aus. Live-Konfiguration und tatsächliche Zustellung wurden in diesem Abgleich nicht geprüft. Das Beispiel zeigt den plausiblen Erfolgsfall, keine Zustellgarantie.
