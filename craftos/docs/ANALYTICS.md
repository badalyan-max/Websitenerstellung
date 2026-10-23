# Erfolgsmessung

Die Einbindung bleibt ohne `NEXT_PUBLIC_ANALYTICS_ENABLED=true` vollständig deaktiviert. Dadurch wird lokal und auf nicht eingerichteten Deployments kein fehlerhafter Vercel-Endpunkt geladen. Vor Aktivierung muss Web Analytics für das konkrete Vercel-Projekt eingerichtet sein; Datenschutzhinweise und tatsächliche Konfiguration werden beim Veröffentlichungsabgleich geprüft.

Bei aktivierter Einbindung sind diese Ereignisse vorgesehen:

| Ereignis | Enthaltene Angaben |
| --- | --- |
| trial_click | Keine Eigenschaften; Klick auf einen Test- bzw. Registrierungslink zur CraftOS Web-App (bis 20.10.2026 zusammen mit Anmelden als `registration_click`) |
| login_click | Keine Eigenschaften; Klick auf „Anmelden“ (Link mit `data-track="login"`) |
| ai_visit | Nur `source` (`chatgpt`, `perplexity`, `copilot`, `gemini` oder `claude`); höchstens einmal pro Seitenladevorgang, erkannt am Referrer oder an `utm_source` |
| store_click | Nur `ios` oder `android` |
| demo_use | Nur der feste Name einer der sechs Beispieldemos |
| calculator_use | Nur `stundensatz` oder `angebot`, einmal pro Seitenaufruf bei Bedienung |

Bei aktivierter Einbindung läuft zusätzlich Vercel Speed Insights in der kostenlosen Stufe (ohne Speed Insights Plus); auch dort wird die URL auf Ursprung und Pfad begrenzt. Die kostenlose Stufe ist laut Vercel auf allen Plänen ohne Projekt- oder Ereignisgebühr enthalten (10.000 Ereignisse in 30 Tagen, teamweit geteilt; danach pausiert die Erfassung). Speed Insights Plus (10 $ pro Projekt und Monat) wird für dieses Projekt nicht aktiviert. Im Projekt `craftos` muss der Reiter „Speed Insights“ eingerichtet sein, sonst liefert `/_vercel/speed-insights/script.js` keinen Inhalt.

`ai_visit` speichert nichts im Browser: kein `sessionStorage`, kein `localStorage` und keine Cookies. Ein Schutz im Arbeitsspeicher (`aiVisitOnce` in `lib/tracking.ts`) sendet das Ereignis höchstens einmal je Seitenladevorgang; Referrer und `utm_source` liegen ohnehin nur beim Einstieg von außen vor. Ein erneuter Einstieg über einen KI-Dienst in einem neuen Tab oder nach einem Neuladen wird erneut gezählt.

`ai_visit` legt vor dem Senden die Warteschlange von Vercel Analytics selbst an (`ensureAnalyticsQueue`), weil `track()` Ereignisse ohne geladenes Skript sonst verwirft; der Query-Filter steht dabei vor dem ersten Ereignis.

Eingabetexte, Kosten, Stunden, Margen, Ergebnisse und Feldnamen werden nicht ausgelesen oder übertragen. Die URL wird vor der Übermittlung auf Ursprung und Pfad begrenzt; Suchparameter und Fragmente einschließlich des zwischen Rechnern übergebenen Kostensatzes werden entfernt. Keine Speicherung der Rechnereingaben in Cookies, Local Storage oder auf einem Server.

Lokale Browserprüfungen verwenden die deaktivierte Standardkonfiguration. Eine erfolgreiche Ereigniszustellung im späteren Produktionsprojekt wird damit nicht behauptet.
