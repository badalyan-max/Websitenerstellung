# CraftOS-Relaunch: lokale Abnahme

Stand: 9. September 2026. Dieser Bericht führt die bestätigten Ergebnisse der lokalen Umsetzung und Prüfung zusammen. Gegenstand ist die CraftOS-Marketingwebsite mit ihren Inhalten, Beispieldemos, Rechnern und Produktmedien. Die abgeschlossene Performance-Prüfung wird gesondert in [PERFORMANCE.md](PERFORMANCE.md) dokumentiert. Eine Prüfung der veröffentlichten Website oder des tatsächlich ausgelieferten Produktstands ist mit dieser lokalen Abnahme nicht verbunden.

## Umgesetzter Umfang

| Bereich | Umfang | Ergebnis |
| --- | ---: | --- |
| Ratgeber | 24 Artikel | Die sechs vereinbarten Themenbereiche Rechnungen, Kalkulation, Softwareauswahl, Belege, Projekte und Team sind abgedeckt. |
| Hilfezentrum | 40 Artikel | Anleitungen zu Einrichtung, Angeboten, Rechnungen, Belegen, Projekten, Zeiten, Lager, Baudokumentation und Craft AI sind vorhanden. |
| Kostenlose Rechner | 2 | Stundensatzkalkulator und Angebots-/Margenrechner arbeiten im Browser mit nachvollziehbarem Rechenweg, Eingabeprüfung und Rücksetzen. |
| Interaktive Beispieldemos | 6 | Dashboard/Projekt, Aufmaß/Angebot, Planung/Zeiten, Bericht/Rechnung, Beleg/Buchhaltung und Craft AI sind bedienbar. |

Die Website verwendet die öffentliche Marke CraftOS sowie die Bezeichnungen Web-App und Mobile-App. Die überarbeiteten Produkt-, Preis- und Gewerke-Seiten werden mit Wissen, Hilfe und Rechnern verknüpft. Produktbehauptungen und ihre Prüfbelege sind im [Produktregister](PRODUCT-REGISTER.md) dokumentiert; die inhaltliche Prüfung der 64 Artikel und ihrer Quellen steht im [Content-Audit](content-source-audit.md).

Die Demos sind ausdrücklich interaktive Beispiele mit fiktiven Daten. Sie erklären einen Ablauf mit gemeinsamer Zustandslogik, manuellen Schritten, Wiederholung und kontrollierter automatischer Vorführung. Die mobile Darstellung führt durch einzelne lesbare Schritte. Eine ausdrückliche KI-Bestätigung wird weder durch den nächsten Schritt noch durch die automatische Vorführung ersetzt.

## Zusammengeführte Prüfergebnisse

| Prüfung | Bestätigtes Ergebnis |
| --- | --- |
| Build, Lint und Typprüfung | Alle drei Prüfungen bestanden; 131 Seiten im Produktionsbuild erzeugt. |
| Unit-Tests | 81 Tests bestanden. |
| Browser-Funktionstests | 98 von 98 Fällen bestanden, ohne automatische Wiederholungen, übersprungene Fälle oder verbleibende Fehler im letzten vollständigen Lauf. |
| Allgemeine Darstellung | 100 Ansichten geprüft; die zwei zuletzt festgestellten Kontrastfehler auf der Startseite wurden behoben. |
| Gezielte visuelle Nachprüfung | 20 von 20 Ansichten nach der letzten Kontrastkorrektur ohne Befund. |
| Demo-Zustände | 144 Zustände der Desktop- und Mobile-Darstellung geprüft. |
| Medien-Zustände | 60 Zustände der aktuellen Mobile-Medien und ihrer Darstellung geprüft. |
| Öffentliche Routen | 125 Routen erreichbar. |
| Linkziele | 129 geprüfte Linkziele erreichbar. |
| Unbekannte Adressen | Sieben geprüfte unbekannte Adressen liefern echte HTTP-404-Antworten. |
| Standardreview | Drei P2-Befunde behoben; das fokussierte Nachreview ergab keinen weiteren Befund. |

Die visuelle Prüfung umfasst die vereinbarten Breiten 360, 390, 768, 1024 und 1440 Pixel in Chromium und WebKit. Die wiederholbaren Funktionstests verwenden Chromium und WebKit bei 1440 × 1000 Pixeln sowie bei 390 × 844 Pixeln mit Touch-Emulation. Umfang und Prüfzahlen dieser unterschiedlichen Prüfungen werden getrennt ausgewiesen; die 144 Demo- und 60 Medienzustände sind keine zusätzlichen Unit-Tests.

## Funktionen, Rechner und Bedienung

Die sechs Demos wurden mit Szenenwechsel, einzelnen Folgeschritten, Endzuständen und reproduzierbarem Zurücksetzen geprüft. Eigene Beispielwerte verändern Aufmaßmengen, Angebotsbeträge, geplante Zeiten und Projektkosten nachvollziehbar. Die Rechnungsdemo zeigt die Nummer erst nach dem Fertigstellen; die Belegdemo erhält korrigierte Angaben und die gewählte Projektzuordnung. Ein geänderter KI-Entwurf muss erneut geprüft und ausdrücklich bestätigt werden.

Maus, Tastatur und Touch sind im Browserlauf berücksichtigt. Die mobile Auswahl von Person und Einsatztag bietet eine bedienbare Alternative zum Ziehen. Die mobile Fortsetzung prüft vor dem Antippen die vollständige Sichtbarkeit der jeweiligen Aktion und danach den Fokus an der neuen Schrittüberschrift. Bei reduzierter Bewegung bleiben sämtliche manuellen Schritte zugänglich, während die automatische Wiedergabe deaktiviert ist.

Die Rechnerprüfung bestätigt unter anderem die vereinbarten Referenzwerte:

- 144.000 € Jahreskosten bei 2.400 verrechenbaren Stunden ergeben 60,00 € internen Kostensatz und bei 20 % Zielmarge 75,00 € Verkaufssatz.
- 1.200,00 € Auftragskosten ergeben bei 20 % Zielmarge 1.500,00 € netto und 25 % Kostenaufschlag.
- Die Übergabe zwischen den Rechnern verwendet den internen Kostensatz ohne Gewinnaufschlag; auch ein übergebener gültiger Angebotskostensatz von 0,00 € wird akzeptiert.
- Deutsche Kommawerte, leere Pflichtfelder, negative Kosten, null verrechenbare Stunden, unzulässige Margen, Cent-Aufrundung, optionale Umsatzsteuer, Verluste und Zurücksetzen sind geprüft.

Die frühere WebKit-Hydrationsregression wurde behoben und mit unmittelbarer Erstbedienung nachgeprüft. Auch die mobile Pause-Funktion und die vollständige Sichtbarkeit der KI-Bestätigung bestehen nach ihrer Korrektur. Die globale Scrollanimation wurde entsprechend der Nutzerkorrektur entfernt; die gezielte mobile Schrittführung behält ihr eigenes Scrollverhalten. Die Tests enthalten dafür keine künstlichen Warteblöcke oder abgeschwächten Assertions.

Der [Browser-Funktionsbericht](browser-functional-audit.md) enthält den wiederholbaren Aufruf, die vollständige Prüfabdeckung, die Befundhistorie und die Grenzen der Browseremulation. Der maßgebliche maschinenlesbare Lauf ist dort über `tests/e2e/reports/results.json` referenziert.

## Review und nachgewiesene Korrekturen

Das lokale Standardreview meldete drei P2-Befunde: eine globale Textfarbe überlagerte Kontraste in der hellen Demo, ein geöffnetes Mobilmenü störte beim Wechsel zur Desktopbreite die Navigation, und die gemeinsame Metadatenfunktion überschrieb individuelle Artikel-Vorschaubilder. Diese Befunde wurden behoben. Das fokussierte Nachreview ergab keinen verbleibenden Befund.

Die zwei zuletzt gefundenen Kontrastfehler der Startseite wurden ebenfalls korrigiert; die anschließende gezielte Prüfung bestand mit 20 von 20 Ansichten. Dieser Bericht dokumentiert das lokale Standardreview und dessen Nachprüfung, keine pauschale Fehlerfreiheit sämtlicher denkbaren Browser- und Nutzungskombinationen.

## Herkunft und Darstellung der Mobile-Medien

Die aktuelle App-Galerie verwendet drei direkte Aufnahmen aus den tatsächlichen lokalen Komponenten der Mobile-App: Dashboard, Zeiterfassung und Projektinformationen. Die Quelle ist der saubere Mobile-Arbeitsstand `9e6260d3c1bb9b50139c87777a72806b3499c4a8`. Alle gezeigten Personen, Projekte und Beträge sind fiktive Beispieldaten. Für die Aufnahmen wurden keine echten Benutzerkonten oder Produktionsdaten benötigt.

Auf dieser Grundlage entstanden drei KI-Mockups mit Handyrahmen und Hintergrund. Die Produktoberflächen wurden nicht frei erfunden. Die Mockup-Fassungen sind als gestalterische Inszenierung zu verstehen; eine pixelidentische Übernahme jedes Details durch die Bildgenerierung wird nicht behauptet. Ein Originalumschalter macht für jedes Motiv die unveränderte direkte App-Aufnahme zugänglich. Die Originaldateien und Ausgangsmedien sind archiviert.

Herkunft, Aufnahmestand und Isolation sind in [mobile-capture-sources.md](mobile-capture-sources.md) sowie im zugehörigen [Manifest](mobile-capture-manifest.json) dokumentiert. Die Generierung, Darstellungsfassungen und erhaltenen Originale erläutert [MOBILE-MOCKUPS.md](MOBILE-MOCKUPS.md). Die interaktiven Beispieldemos der Website bleiben davon getrennt als vereinfachte Erklärung erkennbar.

## Performance und Erfolgsmessung

Die abgeschlossene Performance-Optimierung und ihre erneuten Messungen sind in [PERFORMANCE.md](PERFORMANCE.md) dokumentiert. Die lokalen LCP-Messungen liegen unter 2,5 Sekunden, CLS bei 0; die synthetischen Interaktionen blieben unter 200 ms. Daraus wird keine Feldmessung der Core Web Vitals abgeleitet. Maßgeblich sind der dort bezeichnete Produktionsbuild, das jeweilige Messverfahren und der abschließend dokumentierte Messstand.

Lokale Labormessungen sind von echten Nutzungsdaten nach Veröffentlichung zu unterscheiden. Insbesondere kann eine lokale Interaktionsmessung keinen bestätigten INP-Wert der späteren Websitebesuche ersetzen. Auch die Auslieferung über die tatsächliche Hosting- und CDN-Konfiguration ist nach Veröffentlichung gesondert zu beurteilen.

Analytics ist standardmäßig deaktiviert. Die lokale Prüfung bestätigt daher keine erfolgreiche Ereigniszustellung in einem Produktionsprojekt. Die vorbereitete Erfassung umfasst Registrierungs-, Store-, Demo- und Rechnernutzung; Eingabewerte der Rechner werden nicht übertragen. Voraussetzungen, Ereignisinhalte und die vor Aktivierung zu prüfende Konfiguration stehen in [ANALYTICS.md](ANALYTICS.md).

## Geltungsbereich und verbleibender Veröffentlichungsabgleich

Die bestätigten Ergebnisse beziehen sich auf die lokal integrierte Website und die genannten Prüfstände. Der Stand ist in C:/Projekte/Websitenerstellung übernommen und per SHA-256 mit dem geprüften Integrationsstand abgeglichen. Bestehende eigene Änderungen wurden erhalten. npm ci, Lint und der Produktionsbuild mit131 Seiten bestehen auch im ursprünglichen Ordner; die lokale Vorschau auf Port3100 läuft von dort. Dieses Dokument ist keine Bestätigung eines bereits erfolgten Commits, Pushs oder Deployments.

Vor einer Veröffentlichung bleiben der tatsächliche veröffentlichte Produktstand, die produktive Website-Auslieferung und die konkrete Analytics-Konfiguration abzugleichen. Dazu gehören auch die zum Veröffentlichungszeitpunkt verfügbaren Funktionen, Preise, Testphase und Store-Verknüpfungen. Der lokale Code- und Quellenabgleich ist dafür eine belastbare Grundlage, ersetzt diesen späteren Abgleich aber nicht.

Die Browserprüfung verwendet isolierte Kontexte und Touch-Emulation; WebKit unter Windows ist keine vollständige Prüfung realer iPhone- und Safari-Geräteversionen. Die lokale Abnahme führt keine echten Registrierungen, Zahlungen oder schreibenden Aktionen gegen Produktdatenbanken aus.

Für diesen zusammengeführten Dokumentationsschritt wurden keine neuen Tests gestartet. Die aufgeführten Ergebnisse stammen aus den abgeschlossenen und untereinander abgeglichenen lokalen Prüfläufen; die abgeschlossene Performance-Abnahme bleibt ausdrücklich an ihren eigenen Bericht gebunden.

Die abschließende Bildformatprüfung ergänzte 24 Zustände bei 390 und 1440 Pixeln: Chromium wählt AVIF, WebKit WebP. Alle Motive und Originalaufnahmen dekodieren korrekt; die zunächst gefundene fehlende AVIF-Unterstützung im WebKit-Port ist durch die Browseralternative behoben.

Nach dem Wechsel der Vorschau auf den Originalordner wurden /, /app und /blog/handwerkersoftware-wechseln in frischen Chromium- und WebKit-Kontexten bei390 Pixeln erneut geladen: alle HTTP200, keine Konsolenwarnungen, Seiten- oder Hydrationsfehler. Alle drei Motive und ihre Originalumschalter funktionieren.
