# Verständliche Beispieldemos und Anbieterlogos

## Ziel und Produktgrundlage

Die Website erklärt ausgewählte Produktabläufe als interaktive Beispiele. Sie darf nicht den Eindruck erwecken, eine authentische Produktoberfläche oder eine vollständige Testinstanz zu zeigen. Der dauerhaft sichtbare Einstieg benennt deshalb ausdrücklich die fiktiven Daten, die vereinfachte Oberfläche und den eingeschränkten Bedienumfang. Ein direkter Link führt zu den Originalansichten der Mobile-App; innerhalb der Arbeitsfläche steht zusätzlich „Vereinfachte Demo“.

Der erneute Abgleich der Plantafel erfolgte am 9. September 2026 gegen die unveränderte Web-App auf `main`, Commit `af0c571527afe3a7857a3c14adc0222ec948d0ab`. Dieser Commit ist auch produktiv auf `app.craftos.eu`: Vercel-Deployment `dpl_FnUUiEYasTpJGrYREAs8kqPvYu46`, Status READY und Domainzuordnung geprüft. Web-App und Datenbanken wurden nicht verändert.

## Belegte Mechanik

| Verhalten | Produktbeleg | Umsetzung im Beispiel |
| --- | --- | --- |
| Gleiche Person: verschieben; andere Person: kopieren; Alt/Strg/⌘: umplanen | `src/lib/plantafelDnd.ts`, `resolveDropMode`; `src/hooks/usePlantafelDragDrop.ts` | Gleiches Prinzip, Vorschau vor dem Ablegen und ausdrückliche Umplanen-Option für Touch/Tastatur. |
| Uhrzeiten und Kalendertagsdauer bleiben beim Verschieben erhalten | `computeMovePreview` und Schreibpfade in `usePlantafelDragDrop.ts` | Die gebuchte Planungsdauer bleibt beim Ziehen unverändert; Bearbeiten über die Felder ist eine eigene Aktion. |
| Wochenkapazität steht bei der Person | `src/components/plantafel/CapacityBar.tsx` | Geplante Stunden inklusive Kopien bei jeder Person; 40 Wochenstunden sind ausdrücklich Beispielwerte. |
| Konflikte öffnen eine eigene Entscheidung | `src/lib/plantafelCollision.ts`, `src/pages/Plantafel.tsx` | Die Demo bildet diesen Dialog nicht nach; bereits belegte Beispielziele erzeugen keine Duplikate, der begrenzte Umfang wird benannt. |
| Plantafel und tatsächliche Arbeitszeit sind unterschiedliche Vorgänge | Plantafel sowie projektbezogene Zeiterfassung | Geplante Kopien buchen keine Arbeitszeit. Der Timer bucht die Dauer des ursprünglichen Einsatzes einmalig; Kosten folgen erst dieser Buchung. |

Die echte Plantafel bietet außerdem mehrtägige Balken, Randgriffe für die Kalendertagsdauer, Ressourcen, Kolonnen und Subunternehmer. Das Website-Beispiel begrenzt sich bewusst auf ein Projekt, fünf Arbeitstage und einen bearbeitbaren Haupteinsatz. Zusätzliche Kopien dienen der Veranschaulichung. Eine vollständige Nachbildung oder eine identische Oberfläche wird nicht behauptet.

## Führung und technische Entscheidungen

Die sechs Szenen starten pausiert. Die Anleitung und Wiedergabesteuerung stehen auch am Desktop vor der Arbeitsfläche; Eingriffe pausieren die automatische Vorführung. Die bisherigen Einblendungen der gesamten Szene entfallen, damit Inhalte beim Wechsel sofort scharf lesbar sind. Die Schrittfolge benennt jeweils die nächste Aufgabe.

Die Plantafel verwendet Pointer Events mit Pointer Capture, einem Mindestweg vor Beginn des Ziehens, hervorgehobenem Ziel und beweglicher Vorschau. Der Browserklick nach dem Ablegen darf keinen zweiten Vorgang auslösen; unterschiedliche React-Schlüssel und ein begrenzter Klickschutz verhindern das. Escape wird während einer aktiven Geste unabhängig vom Fokus verarbeitet und der Listener beim Entfernen der Komponente abgemeldet. Abbrechen außerhalb der Ziele und ein nativer Touch-Systemabbruch verändern keine Planung.

Tastatur und Touch können Ziele direkt auswählen. Auf schmalen Bildschirmen gibt es eine lesbare Einsatzkarte, einen Personenwähler und fünf Tagesziele; nach einer Änderung bleibt die Rückmeldung sichtbar und die Plantafel kann vor dem Timer erneut aufgeklappt werden. Wiederholen setzt Einsatz, Kopien und Rückmeldungen zurück. Die ausdrückliche KI-Bestätigung bleibt ausschließlich eine Nutzeraktion.

## Vergleichslogos und Prüfung

CraftOS, Craftnote und plancraft erscheinen mit zugeordneten Markenlogos in den Kostenbeispielen und Tabellenköpfen. Herkunft, Originaldateien, Prüfsummen und Logo-Prüfung stehen in `COMPARISON-LOGOS.md`; Preise und Vergleichsaussagen bleiben unverändert.

Die automatisierten Prüfungen umfassen die bestehenden sechs Demoabläufe und neue Tests für Verschieben, Kopieren, Dauererhalt, besetzte Ziele, Rückmeldungen, Wochenstunden, Reset, Maus, Tastatur, Touch und Escape. Die native Touch-Wischgeste samt Systemabbruch wird in Chromium über CDP geprüft; WebKit prüft die echte Antippalternative. Plattformbedingt nicht ausführbare Wischprüfungen werden als ausgelassen ausgewiesen und nicht als bestandene native Tests gezählt.

Prüfbefehle: `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e` und `npm run build`. Abschließende Ergebnisse und gegebenenfalls Veröffentlichung werden im gemeinsamen Projekt-Handoff festgehalten.
