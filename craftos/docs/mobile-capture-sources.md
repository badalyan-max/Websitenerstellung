# CraftOS Mobile: scharfe Originalaufnahmen

Aufnahme am 09.09.2026 für die CraftOS-Marketingwebsite. Alle Motive wurden direkt aus den echten lokalen App-Komponenten aufgenommen; keine UI nachgebaut, keine Pixel retuschiert und keine Bilder durch KI erzeugt. Die weitere Gestaltung als Handy-Mockup übernimmt der Website-Hauptagent.

## Quelle und reproduzierbarer Stand

- Repository: `C:/Projekte/CraftOS - Mobile/craftos-mobile`.
- Git-HEAD bei Beginn und Abschluss der Aufnahme: `9e6260d3c1bb9b50139c87777a72806b3499c4a8`; ursprünglicher Arbeitsbaum bei beiden Prüfungen sauber. Originalrepo unverändert.
- Originalquellen: `src/features/dashboard/screens/DashboardScreen.tsx`, `src/features/projects/screens/ProjectDetailScreen.tsx`, `src/features/projects/screens/ProjectInfoScreen.tsx`, `src/features/time-tracking/screens/TimeTrackingScreen.tsx` und deren echte Hooks/Komponenten.
- Vorhandener backendfreier Demo-Login nach `e2e/support/auth-mock.ts` (`craftos_demo_mode=true`). Keine echte Anmeldung und keine Zugangsdaten verwendet.
- Eigener Vite-Server: `http://127.0.0.1:3103`, weil 3102 und 8081 belegt waren. Original-Vite-Konfiguration wird nicht verändert; `server.mjs` importiert die vorhandenen React- und Tailwind-Plugins, setzt denselben src-Alias und legt seinen Cache ausschließlich hier im Scratch ab. Platzhalter-Backend `https://capture.invalid`, fiktiver Anon-Key, keine .env-Dateien geladen, Sentry aus.
- Eigener flüchtiger Chrome-Kontext: iPhone User-Agent, 390 × 844 CSS-Pixel, DPR 3, Deutsch, Europe/Berlin, hell, reduzierte Bewegung. Screenshot direkt als PNG in **1170 × 2532 Pixeln**, kein nachträgliches Hochskalieren.
- Browserdatum für konsistente Tages-/Wochendarstellung: 09.09.2026, 15:15 Uhr Europe/Berlin; Animationen vor Aufnahme vollständig abgewartet. Der laufende Timer wird nicht gestartet.
- Wiederholung: `node server.mjs` und in einer zweiten Shell `node capture.cjs` aus diesem Verzeichnis. Der isolierte Port muss frei sein.

## Motive

| Datei | Echte Route | Inhalt |
| --- | --- | --- |
| `screenshots/01-dashboard.png` | `/` | Übersicht mit 3 aktiven Projekten, 07:30 gebuchten Stunden, 3 offenen Angeboten, 2 offenen Zahlungen und Fokuspunkt. |
| `screenshots/02-projekt.png` | `/projects/11111111-1111-4111-8111-111111111111` | Projektübersicht, Adresse, Zeitraum, 18.500 € Budget und Zeitsumme. Die echte kompakte Liste kürzt Mitarbeiternamen bei 390 px deutlich; für das Marketing ist Motiv 04 vorzuziehen. |
| `screenshots/03-zeiterfassung.png` | `/time` | Dunkle Timerkarte, Wochenfilter, gefüllte Tagesliste. Timer ruht; 07:30 ist die Tagesanzeige, keine laufende Messung. |
| `screenshots/04-projektinfos.png` | `/projects/11111111-1111-4111-8111-111111111111/info` | Komplette vorhandene Stammdatenansicht mit Kunde, Kontakt, Adresse, Zeitraum, Budget und Beschreibung. |

Empfohlen für drei Handy-Mockups: **01-dashboard, 03-zeiterfassung und 04-projektinfos**. Die PNGs sind scharfe, verlustfrei gerenderte Browseraufnahmen; normale UI-Kürzungen bleiben erhalten.

## Ausschließlich fiktive Beispieldaten

`fixtures.json` dokumentiert die gesamten abgefangenen Tabellenantworten. Beispielprojekt „Bad Bergmann“, Kundschaft „Familie Bergmann“, Mitarbeiter „Max Muster“, Adresse „Musterstraße 12, 70173 Stuttgart“ und reservierte Beispieladresse `bergmann@example.com`. Der gezeigte GPS-Punkt liegt exemplarisch in Stuttgart und wird ausschließlich durch die lokale Reverse-Geocode-Fixture auf die fiktive Musteradresse abgebildet; er behauptet keine reale Baustelle.

Projektzeitraum 07.–18.09.2026, Budget 18.500 €. Drei erfasste Tagesblöcke am 09.09.: 07:30–12:00 mit 4,5 Stunden Arbeit; 12:00–12:30 mit 0,5 Stunden Pause; 12:30–15:00 mit 2,5 Stunden Arbeit. Zwei weitere abgeschlossene Blöcke am 07. und 08.09. zu je 8 Stunden. Der echte App-Code zeigt damit 7,5 Stunden Tagesbuchungen und 23,5 Stunden im Projekt bzw. in der Woche an. Diese App-Summe umfasst die als Pause erfasste halbe Stunde. Daneben zwei weitere Beispielprojekte „Neubau Lindenweg“ und „Heizungstausch Weber“, drei Angebote und zwei Rechnungen sowie ein offener Fokuspunkt „Silikonfugen prüfen“ zum 10.09.

## Isolation und Nachweis

Alle Browser-HTTP-Anfragen außerhalb des lokalen Vite-Servers werden abgefangen: auf `capture.invalid` ausschließlich Fixtureantworten; weitere Hosts werden blockiert. WebSockets außerhalb des eigenen Servers werden geschlossen. Die vorhandenen lesenden RPCs `get_org_member_names` und Reverse-Geocode werden lokal beantwortet. Andere Nicht-GET-Anfragen erhalten lokal 403. Keine Produktionsdaten gelesen oder geschrieben, kein Timer gestartet, keine Formulare gespeichert.

`capture-results.json` enthält nur Requestpfade und Methoden, die Zahl blockierter Fremdhosts sowie App-Fehler; keine Tokens oder Request-Header. `image-manifest.json` enthält Maße, Dateigrößen und SHA-256 der finalen PNGs. Alle vier Motive visuell geprüft. Die UI-Herkunft ist die lokale WebView-App; eine native Statusleiste/Geräterahmen ist nicht Bestandteil der Original-PNGs.

## Korrigierte finale Zeitaufnahme

Die erste Wiederholungsaufnahme der Zeitansicht wurde vom Hauptagenten mit unsichtbarer Eintragsliste erkannt, obwohl die Zeilen im DOM standen. Die finale Datei `03-zeiterfassung.png` wurde separat mit `capture-time.cjs` erneut aufgenommen: Vorher wurden die erste Eintragszeile und alle 18 Vorfahren auf Deckkraft 1 und sichtbaren Zustand geprüft; beim Screenshot bleiben Browseranimationen unverändert (`animations: allow`). Direkt danach visuell verifiziert: alle drei Tageszeilen sichtbar. Keine CSS-/DOM-Manipulation an App-Elementen. Der Nachlauf hatte 43 lokal simulierte Anfragen und 0 Appfehler (`capture-time-results.json`); das aktualisierte Manifest enthält den finalen Hash. Diese finale PNG wird nicht mehr überschrieben.
