# Erfolgsmessung

Die Einbindung bleibt ohne `NEXT_PUBLIC_ANALYTICS_ENABLED=true` vollständig deaktiviert. Dadurch wird lokal und auf nicht eingerichteten Deployments kein fehlerhafter Vercel-Endpunkt geladen. Vor Aktivierung muss Web Analytics für das konkrete Vercel-Projekt eingerichtet sein; Datenschutzhinweise und tatsächliche Konfiguration werden beim Veröffentlichungsabgleich geprüft.

Bei aktivierter Einbindung sind diese Ereignisse vorgesehen:

| Ereignis | Enthaltene Angaben |
| --- | --- |
| registration_click | Keine Eigenschaften; Klick auf die CraftOS Web-App |
| store_click | Nur `ios` oder `android` |
| demo_use | Nur der feste Name einer der sechs Beispieldemos |
| calculator_use | Nur `stundensatz` oder `angebot`, einmal pro Seitenaufruf bei Bedienung |

Eingabetexte, Kosten, Stunden, Margen, Ergebnisse und Feldnamen werden nicht ausgelesen oder übertragen. Die URL wird vor der Übermittlung auf Ursprung und Pfad begrenzt; Suchparameter und Fragmente einschließlich des zwischen Rechnern übergebenen Kostensatzes werden entfernt. Keine Speicherung der Rechnereingaben in Cookies, Local Storage oder auf einem Server.

Lokale Browserprüfungen verwenden die deaktivierte Standardkonfiguration. Eine erfolgreiche Ereigniszustellung im späteren Produktionsprojekt wird damit nicht behauptet.
