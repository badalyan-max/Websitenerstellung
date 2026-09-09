# CraftOS: Browser-Funktionsprüfung

Prüftag: 9. September 2026. Gegenstand ist die integrierte Marketingwebsite auf `http://localhost:3100`, ausgeführt aus einem getrennten Content-Worktree. Dieser Bericht betrifft die Bedienlogik der sechs Beispieldemos, beide Rechner und die Preisumschaltung. Die separate visuelle Prüfung aller fünf geforderten Breiten führt der Hauptagent durch.

## Prüfumgebung und wiederholbarer Aufruf

Die Tests verwenden die im Main-Worktree installierte Version `@playwright/test` 1.63.0 mit Chromium 153.0.8010.12 (Playwright-Build 1243) und WebKit 26.6 (Build 2359) unter Windows. Fehlende Browserlaufzeiten wurden über den offiziellen Playwright-Installer installiert. Alle Kontexte sind frisch, ohne Benutzerkonto, in deutscher Locale und Zeitzone Europe/Berlin. Der gemeinsam verwendete MCP-Browser wurde nicht bewegt.

Die Matrix besteht aus Chromium und WebKit, jeweils mit 1440 × 1000 Pixeln als Desktop und 390 × 844 Pixeln mit Mobile-/Touch-Emulation. Die Touch-Tests verwenden `tap()` für Schaltflächen und auswählbare Formulare als Alternative zum Ziehen. Die Tastaturprüfung enthält die tatsächliche Tab-Reihenfolge der sechs Desktop-Szenenschaltflächen, die mobile native Szenenauswahl sowie Enter und Leertaste für Schritte und Wiederholung. Der zusätzliche mobile Test verlangt, dass jede Fortsetzung bereits vollständig im Viewport liegt, bevor sie angetippt wird; das automatische Scrollen von Playwright darf diesen Nachweis nicht ersetzen.

Nach Übernahme der Testdateien ins Website-Unterprojekt lautet der reguläre Aufruf bei laufendem Devserver:

```powershell
npx playwright test --config tests/e2e/playwright.config.cjs
```

Der im isolierten Worktree verwendete Aufruf lautet:

```powershell
$env:CRAFTOS_PLAYWRIGHT_PATH = 'C:/Users/badal/.codex/worktrees/craftos-relaunch-01a08357/main/craftos/node_modules/@playwright/test'
node 'C:/Users/badal/.codex/worktrees/craftos-relaunch-01a08357/main/craftos/node_modules/@playwright/test/cli.js' test --config craftos/tests/e2e/playwright.config.cjs
```

`CRAFTOS_BASE_URL` kann den Zielserver überschreiben. Die Konfiguration startet keinen zweiten Server und verändert keine Anwendung. Zwei Worker laufen ohne automatische Wiederholungen. Die Dateiendung `.pw.cjs` hält den Browserlauf von der Vitest-Erkennung für `.test.*` und `.spec.*` getrennt. Die drei CommonJS-Dateien tragen eine begründete Ausnahme nur für die ESLint-Regel gegen `require`, damit das Paket im anderen Worktree verwendet werden kann.

Zur Übernahme gehören genau diese fünf Dateien aus dem Content-Worktree, jeweils unter demselben relativen Pfad:

- `craftos/tests/e2e/.gitignore`
- `craftos/tests/e2e/playwright.config.cjs`
- `craftos/tests/e2e/browser-functional.pw.cjs`
- `craftos/tests/e2e/mobile-step-flow.pw.cjs`
- `craftos/docs/browser-functional-audit.md`

Das bereits installierte Playwright-Paket ist die einzige Testlaufzeit. Dieser Prüfauftrag verändert keine Anwendungs-, Paket- oder Konfigurationsdatei außerhalb des eigenen Testordners.

## Abgedeckte Abläufe

| Bereich | Geprüfte Benutzerhandlungen und Ergebnisse |
| --- | --- |
| Alle sechs Demos | Szene auswählen; jeden vorgesehenen Schritt durchlaufen; Endzustand sperrt den nächsten Schritt; Wiederholen stellt den Anfang wieder her. |
| Dashboard | Desktop: Zeitraum wechseln, Diagrammbeschreibung prüfen, nach einem unbekannten Projekt suchen, Weber finden und das tatsächlich ausgewählte Projekt öffnen. Mobile: Musterprojekt Krause öffnen und zur Nachkalkulation wechseln. |
| Aufmaß/Angebot | 50,5 m² Wandfläche minus 5,5 m² Öffnungen erfassen; 45 m² übernehmen; 24,60 € Einheitspreis und 1.107,00 € netto in der Vorschau nachvollziehen; Reset auf 48 m². |
| Planung/Zeiten | Jonas Weber auswählen, 2,5 Stunden planen und per Tagesauswahl auf Donnerstag verschieben; Timer starten/stoppen; 9,5 Gesamtstunden und 456,00 € Lohnkosten bestätigen; erneute Buchung gesperrt. |
| Bericht/Rechnung | Leistung abwählen und gesperrte Entwurfserstellung erkennen; Leistung übernehmen; zunächst keine Rechnungsnummer; prüfen und fertigstellen; Nummer und festgeschriebenen Stand bestätigen. |
| Beleg/Buchhaltung | Beispielerkennung auslösen; Lieferant, Referenz und Netto korrigieren; Angaben prüfen; Projekt Weber zuweisen; 125,50 € und DATEV-Hinweis im Ergebnis sehen. |
| Craft AI | Anfrage mit fünf Stunden eingeben; Entwurf prüfen; bestätigungsbereiten Entwurf auf 4,5 Stunden ändern; erneute Prüfung erforderlich; ausdrückliche Bestätigung erzeugt den gesperrten Ergebniszustand. |
| Automatik | Vorführung startet, führt denselben Projektwechsel aus und lässt sich pausieren; längerer Ablauf bleibt vor der KI-Bestätigung stehen. Die Playwright-Uhr beschleunigt nur Wartezeiten. |
| Reduzierte Bewegung | `prefers-reduced-motion: reduce` deaktiviert automatische Wiedergabe; alle sechs Szenen bleiben schrittweise bedienbar. |
| Mobile Schrittführung | Alle sechs Szenen über die native Auswahl öffnen; jeden Folgeschritt ohne manuelles Wegscrollen auslösen; Fokus und vollständige Sichtbarkeit der neuen Schrittüberschrift prüfen; die eigene KI-Bestätigung bleibt ausdrücklich erforderlich. |
| Stundensatz | 144.000 € Jahreskosten / 2.400 Stunden ergeben 60,00 € internen Kostensatz und bei 20 % Marge 75,00 € Verkaufssatz; Kostenaufschlag 25 %. |
| Kommawerte und Transfer | Deutsche Tausender-/Dezimalnotation; kompensierende Cent-Eingaben; Transfer ausschließlich von 60,00 € Kostensatz ohne Gewinn; URL-Fragment wird nach Übernahme entfernt. Auch der gültige Angebotskostensatz `#kostensatz=0.00` wird als 0,00 € übernommen und ergibt 750,00 € netto. Der Stundensatzrechner verlangt weiterhin positive Gesamtjahreskosten. |
| Rechnerfehler | Leere Pflichtfelder, negative Kosten, mehr als zwei Nachkommastellen, null verrechenbare Jahresstunden und 100 % Zielmarge zeigen feldbezogene Fehler und entfernen das Berechnungsergebnis. |
| Angebot/Marge | 1.200,00 € Auftragskosten ergeben 1.500,00 € netto, 20 % Marge und 25 % Kostenaufschlag; 1,01 € Kosten bei 20 % Marge ergeben aufgerundet 1,27 € netto. |
| Verlust | Ein vorhandener Preis von 1.000,00 € bei 1.200,00 € Kosten zeigt −200,00 € Gewinn/Verlust und −20 % Marge; Reset stellt den Zielpreismodus wieder her. |
| Umsatzsteuer | Optionale 19 % ändern die Marge nicht; 89,25 € brutto pro Stunde beziehungsweise 1.785,00 € brutto pro Auftrag werden korrekt angezeigt; Reset entfernt die optionale Eingabe. |
| Browserdaten | Die markierte eigene Materialeingabe erscheint in keinem beobachteten Request und keinem Local-/Session-Storage-Wert; Neuladen stellt die Beispielwerte her. Externe Requests werden im Testkontext gesperrt. |
| Preise | Jahresabo ist voreingestellt; 24,96 €/8,29 € monatliches Äquivalent mit 299,50 €/99,50 € jährlicher Zahlung; Monatlich zeigt 29,95 €/9,95 €; Rückwechsel stimmt. Die Voll-Lizenz nennt Web- und Handy-App für dieselbe Person. |

## Gefundene und behandelte Probleme

### Ansprache der Rechner

Die erste Browseraufnahme zeigte auf beiden Rechnerseiten „du/dein“, obwohl die Website „Sie“ verwenden soll. Der Befund wurde an den Hauptagenten gemeldet; dessen Korrektur ist in den anschließend geladenen Seiten sichtbar. Die Hilfe-/Ratgebertexte dieses Content-Pakets verwendeten bereits „Sie“.

### Frühe Eingaben während der Hydration in WebKit

Die direkte Erstbedienung des Angebotsrechners belegte einen Produktfehler: Das Eingabefeld war bereits editierbar, bevor React die Eingabe zuverlässig verarbeiten konnte. In vier unabhängigen frischen WebKit-Kontexten zeigte das Materialfeld nach `fill('87654,32')` den neuen Wert, das Ergebnis blieb jedoch bei 1.500,00 €. Auch nach einer Sekunde änderte es sich nicht. Eine spätere bewusste Modusumschaltung und erneute Eingabe ergaben korrekt 110.442,90 €.

Reproduktion:

1. Einen frischen WebKit-Kontext öffnen und direkt `/rechner/angebotskalkulation` laden.
2. Ohne künstlichen Warteblock das Textfeld „Materialkosten netto in Euro“ mit `87654,32` füllen.
3. Das sichtbare Feld und das Ergebnis vergleichen: Feld verändert, Ergebnis weiterhin 1.500,00 €.
4. Alternativ zuerst Materialkosten `500,50`, anschließend Zusatzkosten `99,50` eingeben: Die erste Zustandsänderung fehlt, wodurch 1.499,38 € statt 1.500,00 € angezeigt werden.

Ein zusätzlicher Diagnoseversuch mit 0/200/500 ms vor der ersten Eingabe grenzte den Fehler auf die Aktivierung beim ersten Laden ein: Die beiden frühen Eingaben wurden nicht berechnet, die Eingabe nach 500 ms dagegen schon. Diese Diagnosewartezeiten wurden nicht als Umgehung in die Regressionstests übernommen.

Status: Behoben und im Browser nachgeprüft. Der zuständige Haupt-/Demoagent ergänzte die serverseitige Sperre der noch nicht bedienbereiten Rechnerfelder und Umsatzsteueroption. Die unveränderten frühen Eingaben, die zuvor in WebKit fehlschlugen, bestehen nun bei 390 und 1440 Pixeln; die Tests enthalten weiterhin keinen zusätzlichen Warteblock. Auch die unmittelbar bediente Umsatzsteueroption besteht.

### Korrekturen am Test selbst

Die erste Testfassung suchte Beschreibungslisten über den zugänglichen Namen der ARIA-Rolle `term`; dieser Name ist dort nicht aus dem sichtbaren Text ableitbar. Der Selektor verwendet nun die sichtbare `dt`-Beschriftung und das zugehörige `dd`. Eine Regex für die Verlustmeldung berücksichtigte zunächst das geschützte Leerzeichen vor dem Eurozeichen nicht; die normalisierte Textprüfung behebt dies. Nach dem mobilen Umbau wurde der sichtbare Reduced-Motion-Hinweis getrennt für Desktop und Mobile ausgewählt. Alle waren Testfehler und wurden nicht als Anwendungsdefekte gemeldet.

### Mobile Wiedergabe ließ sich mit dem Zeiger nicht pausieren

Der integrierte mobile Ablauf stoppte nach Antippen von „Pause“ nicht: Nach dem automatischen Wechsel von Überblick zu Projekt führte die Vorführung trotz Pause weiter zu Kosten. Der Fehler trat in Chromium und WebKit auf. Die Ereignisbehandlung des umgebenden mobilen Feldbereichs pausierte beim Zeigerkontakt bereits vor dem Klick; der anschließende Wiedergabeschalter sah den pausierten Zustand und startete erneut.

Reproduktion: Mobile Ansicht öffnen, Wiedergabe starten, den ersten Schrittwechsel abwarten, „Pause“ antippen und länger als zwei Schrittintervalle warten. Erwartet ist derselbe Projektschritt. Der automatisierte Test verwendet dafür die Playwright-Uhr; die Anwendung erhält weiterhin reguläre Maus- beziehungsweise Touch-Ereignisse.

Status: Behoben und integriert nachgeprüft. Der Wiedergabeschalter ist von der vorgezogenen Ereignisbehandlung ausgenommen. Im unveränderten Ablauf hält die Pause in Chromium und WebKit, bei Desktop-Maus und mobilem Touch, den aktuellen Schritt fest; auch die spätere KI-Bestätigung wird nicht automatisch überschritten.

### Mobile KI-Bestätigung erforderte zusätzliches Scrollen

Die neue mobile Schrittführung brachte in allen Szenen die nächsten Bedienelemente in den sichtbaren Bereich, mit einer Ausnahme: Im Schritt „Prüfen“ von Craft AI lag „Jetzt ausdrücklich bestätigen“ bei 390 × 844 Pixeln nur zu rund 49 % (Chromium) beziehungsweise 29 % (WebKit) im Viewport. Die reguläre Aktion `tap()` hätte zum Element gescrollt und damit den Layoutfehler im Test verdeckt; die vorgelagerte vollständige Viewport-Prüfung deckte ihn auf.

Status: Behoben und integriert nachgeprüft. Die kompakte Prüfzusammenfassung nennt Projekt und Dauer direkt vor der ausdrücklichen Bestätigung. Der unveränderte Test besteht in Chromium und WebKit bei 390 × 844 Pixeln: Die Bestätigung ist vor dem Antippen vollständig im Viewport, anschließend erhält die neue Schrittüberschrift den Fokus. Das gilt auch für die vorhergehenden Schritte aller sechs Szenen.

### Seltene Zeigerfehler während globaler Scrollanimation in WebKit

In einem vollständigen Lauf wurde nach Öffnen des Weber-Projekts ein Klick auf „Zur Betriebsübersicht“ protokolliert, ohne dass anschließend das Suchfeld der Betriebsübersicht erschien. Derselbe unveränderte Dashboardtest bestand danach in fünf frischen WebKit-Desktopkontexten ohne künstliche Wartezeiten. In einem weiteren vollständigen Lauf bestand der Dashboardtest, während das unmittelbare Ankreuzen der Umsatzsteueranzeige einmal scheiterte.

Der Checkboxtrace zeigte die zunächst korrekt gesperrte, dann aktivierte Eingabe; anschließend verschob sich das Zeigerziel während des Scrollens mehrfach. Teilweise fing der Resetknopf den Zeiger ab. Ein erneuter Verlust bereits angenommener React-Eingaben war daraus nicht ableitbar. Zusätzliche frische Kontexte bestätigten die Checkboxbedienung sechsmal mit global weichem Scrollen, sechsmal mit sofortigem Scrollen und sechsmal per Tastatur nach tatsächlicher Aktivierung. Ein erster Tastatur-Diagnoseversuch fokussierte die noch gesperrte Checkbox und wurde daher ausdrücklich als ungültiger Vergleich verworfen.

Der Hauptagent entfernte die globale Scrollanimation außerdem entsprechend der Nutzerkorrektur zum zähen Scrollverhalten. Die gezielte mobile Schrittführung behält ihr eigenes bewusst gewähltes Scrollverhalten. Die Browsertests wurden dafür weder mit Warteblöcken versehen noch abgeschwächt. Beide zuvor auffälligen Zeigerabläufe bestanden nach dieser Integration jeweils dreimal sowie erneut im abschließenden vollständigen Lauf; eine sicher nachgewiesene identische Ursache beider seltenen Ereignisse wird nicht behauptet.

## Ergebnis und Grenzen

Der abschließende vollständige Lauf bestand mit **98 von 98 Fällen**, ohne Fehler, übersprungene Fälle oder automatische Wiederholungen, in rund 1,8 Minuten. Die 24 gemeinsamen Abläufe werden jeweils in vier Browser-/Viewport-Kontexten geprüft; zusätzlich durchläuft die mobile Fortsetzungsprüfung alle sechs Szenen in den beiden Touch-Kontexten. Syntaxprüfung und ESLint für alle drei CommonJS-Dateien bestanden ohne Befunde. Es bestehen keine noch reproduzierbaren Funktionsbefunde innerhalb dieses Prüfbereichs.

Der maßgebliche grüne Gesamtlauf liegt in `tests/e2e/reports/results.json`. Historische Befunde bleiben als maschinenlesbare Berichte erhalten: `before-hydration-fix.json` dokumentiert die frühe Eingaberegression, `before-mobile-pause-layout-fix.json` die mobilen Pause-/Viewportbefunde. `after-mobile-fixes-dashboard-transient.json` und `after-mobile-fixes-webkit-scroll.json` halten die beiden beschriebenen seltenen Zeigerereignisse fest. Die zusätzliche Eingabediagnose liegt in `webkit-scroll-diagnosis.json`. Diese älteren Berichte sind keine Behauptung offener Fehler im abschließenden Stand.

Die Konfiguration schreibt den maschinenlesbaren letzten Bericht nach `tests/e2e/reports/results.json`, einen HTML-Bericht nach `tests/e2e/reports/html` sowie Screenshots und Fehlertraces in `tests/e2e/artifacts`. Die sechs abgeschlossenen Demos werden pro Kontext als Screenshot festgehalten. Diese Ausgaben sind per lokalem `.gitignore` von der Übernahme der Testquellen getrennt.

Dies ist keine Registrierung, keine Prüfung echter Benutzerkonten und keine Ausführung gegen die Produktdatenbanken. Die Touch-Ansicht ist Browseremulation. WebKit unter Windows deckt die WebKit-Engine ab, aber keine vollständige Gerätematrix aus realen iPhones und Safari-Versionen. Die separaten Anforderungen an sämtliche Inhaltslinks, Meta-/SEO-Daten, fünf visuelle Breiten, Produktionsbuild und reale Core Web Vitals verbleiben im Gesamtbericht des Hauptagenten.
