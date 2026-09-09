# Animierte Funktionsbeispiele

Stand: 9. September 2026. Die aktuelle Nutzerentscheidung ersetzt die bedienbaren Step-Pads durch automatisch wiederholte Funktionsillustrationen mit sichtbarem Cursor. Auf den Seiten wird keine Testinstanz angeboten.

## Gestaltung und Ablauf

Die bestehende CraftOS-Gestaltung bleibt erhalten: Ink #101014, Weiß #ffffff, Flächen #f4f4f5, Amber #f2af38, dunkles Amber #784b10, Erfolg #24764d; Clash Display für Überschriften und General Sans für die Darstellung der Daten. Als visuelle Referenz wurden die grafischen Funktionsausschnitte auf https://plancraft.com/de-de im Browser angesehen; Layout, Code, Texte und Inhalte entstehen eigenständig für CraftOS.

Neben der jeweiligen Funktion steht ein kompaktes Beispiel ohne Appnavigation, Schrittmenü oder Eingabefelder. Ein sichtbarer Cursor fährt zu den tatsächlichen Elementen der Illustration, führt drei vorbereitete Handlungen vor und lässt das Ergebnis kurz stehen. Nach ungefähr neun Sekunden beginnt der Ablauf erneut. Die Cursorposition folgt den tatsächlichen Elementpositionen, auch wenn die mobile Darstellung anders angeordnet ist.

Die einzige Bedienung ist eine zugängliche Pausefunktion. Oberflächen dürfen auf Berührung oder Hover dezent reagieren, verändern aber keine Geschäftsdaten und bieten keine bearbeitbare Demo an. Die Animation läuft nur im sichtbaren Bereich und bei sichtbarem Browser-Tab. Reduzierte Bewegung zeigt das vollständige statische Ergebnis ohne Cursor; eine dauerhafte Textzusammenfassung erklärt den gesamten Vorgang auch im ausgelieferten HTML.

Die Planung verbindet den Web-Ausschnitt mit einer stilisierten Handyansicht. Dieselben Projekt- und Zeitangaben bleiben nachvollziehbar. Die Darstellung behauptet weder eine identische Produktoberfläche noch Pushbenachrichtigungen oder eine Offlineübertragung.

Der lokale Produktabgleich erfolgte gegen Web main 179cef5 und Mobile master 9e6260d einschließlich des vorhandenen Arbeitsstands. Mobile bietet „Einsätze“ mit „Ab heute“ und Tagesgruppen (AssignmentsListScreen.tsx), Projektname und Uhrzeitspanne (DispatchAssignmentCard.tsx); useAssignments.ts liest dieselbe Einsatzzeile, useRealtime.ts invalidiert sie bei Änderungen. Web usePlantafelDragDrop.ts verschiebt das Datum dieser Zeile und erhält die Start-/Endzeit. Die Handyillustration zeigt deshalb 09:00 bis 12:30 und kein zusätzliches Feld für die geplante Dauer; „Dauer“ im echten Einsatzdetail bezieht sich auf die Fahrzeit. Der Abgleich war rein lesend, die App-Repositories wurden nicht verändert.

## Beispiele je Gewerk

Alle zwölf Gewerke erhalten eigene fiktive Projekte und Tätigkeiten aus dem jeweils beschriebenen Auftrag. Die Zuordnung steht serverseitig in lib/trade-snippet-examples.ts; nur das benötigte Beispiel wird an die Client-Komponente übergeben. Ein fehlendes Beispiel verhindert den Build der Gewerke-Seite.

Maler, Fliesenleger und Trockenbauer zeigen jeweils drei Angebotspositionen. Menge und Einzelpreis erzeugen sowohl die Beschreibung als auch den Positionsbetrag; Summen verwenden ganze Cent. Beim Fliesenleger ergeben 12 m² Wandfliesen verlegen, 6 m² Abdichtung im Duschbereich und 12 m² Fliesen verfugen 816,00 € netto beziehungsweise 971,04 € inklusive 19 % Umsatzsteuer. Dies sind fiktive Ausschnitte, keine vollständigen Angebote oder empfohlenen Preise.

Die übrigen neun Gewerke zeigen passende Planungstätigkeiten, etwa Zählerschrank montieren, Dachziegel verlegen oder Geländer montieren. Projekt, Arbeit und geplante Dauer bleiben beim Tageswechsel erhalten. Funktionsseiten behalten ihre allgemeinen Beispiele; ein Wechsel des Beispiels setzt die Animation zurück.

## Prüfung

Die aktuelle Browserprüfung kontrolliert wiederholte Abläufe, Cursorziele, Pause und Fortsetzung, Ausblenden außerhalb des sichtbaren Bereichs, reduzierte Bewegung, unveränderliche Illustrationen, Gewerkezuordnung und Rechenwerte sowie Darstellungen bei 360, 390, 768, 1024 und 1440 Pixeln in Chromium und WebKit. Rechner-, Preis- und Navigationstests bleiben erhalten. Historische Tests der vorherigen bedienbaren Snippets sind als Archiv von der aktuellen Testauswahl ausgeschlossen.

## Ergänzende Navigationskorrektur

Der Nutzer ergänzte eine feste obere Leiste, ein Gewerke-Dropdown und die Behebung der springenden mobilen Navigation. Ursache war die höhere Spezifität der Desktop-Hover-Regel: Sie änderte auf Touch-Geräten das mobile Untermenü von Grid in Block; die gemessene Höhe verdoppelte sich von 118,5 auf 237 Pixel.

Die Navigation verwendet jetzt explizite Disclosure-Buttons mit `aria-expanded` und `aria-controls`. Desktop unterstützt Hover und Tastatur, mobil werden Bereiche per Antippen aufgeklappt. Die Gewerke stammen aus dem vorhandenen Register. Der Header bleibt mit `position: sticky` sichtbar; das offene mobile Menü scrollt intern. Die Scrollsperre liegt nur auf dem Dokumentelement, damit kein zusätzlicher Scrollcontainer den Sticky-Bezug aufhebt. Bei Akkordeonwechseln wird ausschließlich der interne Menüscroll korrigiert, falls der gewählte Schalter oder erste Link aus dem Blick gerät.

Browserprüfungen für die Seitenposition betätigen den sichtbaren Sticky-Schalter über seine tatsächlichen Bildschirmkoordinaten: Playwrights automatisches ScrollIntoView bei `locator.tap()` kann ansonsten selbst zum ursprünglichen Dokumentplatz des Headers scrollen und einen Sprung verursachen, der bei echten Touch-Eingaben nicht auftritt.

Das lokale Review identifizierte außerdem drei Snippet-Randfälle: ein gehaltener Button darf durch einen Timer nicht seine Aktion wechseln, Reset muss laufende Ziehgesten verwerfen, und ein per Tastatur ausgewähltes Ziel muss den Fokus auf die versetzte Karte übertragen. Alle drei Fälle erhielten zunächst fehlschlagende Browserregressionen und wurden anschließend behoben.
