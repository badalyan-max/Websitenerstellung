# Performance im lokalen Produktionsbuild

Gemessen am 9. September 2026 mit Chromium, 390 × 844 Pixeln, leerem Cache, vierfacher CPU-Drosselung, 150 ms Netzwerklatenz und 1,6 Mbit/s Download. Drei frische Browserkontexte pro Seite. Wiederholbar mit `node scripts/performance-audit.mjs` gegen Port 3101; `AUDIT_ROUTES=/app` grenzt die gezielte Nachprüfung ein.

| Seite | Median LCP | Bereich der drei Läufe | CLS beim Laden | Längste gemessene Interaktion |
| --- | ---: | ---: | ---: | ---: |
| / | 1.648 s | 1.636–2.164 s | 0.000 | 56 ms |
| /app | 2.484 s | 2.464–2.488 s | 0.000 | 32 ms |
| /preise | 1.124 s | 1.104–1.172 s | 0.000 | 32 ms |
| /blog/handwerkerrechnung-schreiben | 1.096 s | 1.076–1.116 s | 0.000 | 32 ms |
| /rechner/stundensatz | 1.196 s | 1.152–1.216 s | 0.000 | 32 ms |

Alle 15 ausgewiesenen LCP-Messungen liegen unter 2,5 Sekunden, CLS bei 0. Die App-Seite liegt nahe am LCP-Zielwert; für die tatsächliche Hostingumgebung besteht keine große Reserve. Die aufgezeichneten Bedienaktionen blieben unter 200 ms. Das sind Labormessungen auf dem lokalen Rechner, keine Felddaten und keine bestätigten INP-Werte echter Besuche. Reale INP-, LCP- und CLS-Verteilungen sind nach Veröffentlichung über Nutzungsdaten zu beurteilen.

Die vier anderen Seiten stammen aus dem abschließenden Matrixlauf und wurden seitdem nicht verändert. Die App-Seite wurde nach der letzten Bildoptimierung gezielt neu gemessen. Einzelwerte und Messumgebung stehen in [performance-results.json](performance-results.json).

Die drei App-Mockups bleiben bei nativen 887 × 1774 Pixeln und werden direkt aus den Ausgangs-PNGs einmalig kodiert. Das picture-Element verwendet AVIF (63–74 KB) oder WebP (124–145 KB), abhängig vom Browser. Chromium lädt AVIF, der geprüfte WebKit-Port WebP; beide laden jeweils nur die unterstützte Fassung. Die unveränderten Screenshots sind über den Originalumschalter erreichbar. Diese Maßnahme senkt die Bildlast ohne Hochskalierung oder wiederholte Next.js-Kompression.
