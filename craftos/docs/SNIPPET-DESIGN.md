# Kleine Funktionsbeispiele

Stand: 9. September 2026. Ersetzt auf Wunsch des Nutzers die große, universelle Produktdemo durch kleine Step-Pads neben dem jeweiligen Funktionstext.

Als Referenz dient die frühere Website in Commit `142ab82`: ein Ausschnitt, unmittelbare Reaktion, keine Appnavigation. Die bisherigen Produktprüfungen gelten weiterhin; dargestellt wird bewusst nur ein Teil des jeweiligen Ablaufs.

- Bestehende Farben: Ink `#101014`, Weiß `#ffffff`, Flächen `#f4f4f5`, Amber `#f2af38`, lesbares dunkles Amber `#784b10`, Erfolg `#24764d`.
- Bestehende Schriftfamilien: Clash Display für Überschriften, General Sans für Bedienung und Daten.
- Links Nutzen und Erklärung, rechts ein höchstens 640 Pixel breites Beispiel; auf kleinen Bildschirmen untereinander. Keine Sidebar, keine globale Szenenauswahl, keine verschachtelte Tour.
- Drei lokale Schritte, eine kurze explizit gestartete Animation mit Pause und Reset. Direkte Aktionen und Vorführung verändern denselben lokalen Zustand. Nutzeraktionen stoppen die Automatik; außerhalb des sichtbaren Bereichs pausiert sie. Reduzierte Bewegung behält die manuelle Bedienung und entfernt Übergänge.
- Die Plantafel zeigt nur das Verschieben eines Einsatzes derselben Person auf andere Tage. Es gibt keine vermeintlich vollständige Ressourcenplanung; die reale Copy-Regel bei Personenwechsel wird durch diesen Ausschnitt nicht ersetzt.
- Alle Beispiele nennen ihre fiktiven Daten und die vereinfachte Darstellung. Originale Mobile-App-Aufnahmen bleiben separat erreichbar. Keine echte KI, Buchung oder Nachrichtenübermittlung.

Abnahme: kontextbezogene Zuordnung, konsistente Rechenwerte, wiederholbarer Reset, Pointer-Abbruch, Tastatur und Touch, geringe Höhe, keine Überläufe bei 360 bis 1440 Pixeln sowie Chromium/WebKit; bestehende Rechner- und Preistests bleiben erhalten.

## Ergänzende Navigationskorrektur

Der Nutzer ergänzte eine feste obere Leiste, ein Gewerke-Dropdown und die Behebung der springenden mobilen Navigation. Ursache war die höhere Spezifität der Desktop-Hover-Regel: Sie änderte auf Touch-Geräten das mobile Untermenü von Grid in Block; die gemessene Höhe verdoppelte sich von 118,5 auf 237 Pixel.

Die Navigation verwendet jetzt explizite Disclosure-Buttons mit `aria-expanded` und `aria-controls`. Desktop unterstützt Hover und Tastatur, mobil werden Bereiche per Antippen aufgeklappt. Die Gewerke stammen aus dem vorhandenen Register. Der Header bleibt mit `position: sticky` sichtbar; das offene mobile Menü scrollt intern. Die Scrollsperre liegt nur auf dem Dokumentelement, damit kein zusätzlicher Scrollcontainer den Sticky-Bezug aufhebt. Bei Akkordeonwechseln wird ausschließlich der interne Menüscroll korrigiert, falls der gewählte Schalter oder erste Link aus dem Blick gerät.

Browserprüfungen für die Seitenposition betätigen den sichtbaren Sticky-Schalter über seine tatsächlichen Bildschirmkoordinaten: Playwrights automatisches ScrollIntoView bei `locator.tap()` kann ansonsten selbst zum ursprünglichen Dokumentplatz des Headers scrollen und einen Sprung verursachen, der bei echten Touch-Eingaben nicht auftritt.

Das lokale Review identifizierte außerdem drei Snippet-Randfälle: ein gehaltener Button darf durch einen Timer nicht seine Aktion wechseln, Reset muss laufende Ziehgesten verwerfen, und ein per Tastatur ausgewähltes Ziel muss den Fokus auf die versetzte Karte übertragen. Alle drei Fälle erhielten zunächst fehlschlagende Browserregressionen und wurden anschließend behoben.
