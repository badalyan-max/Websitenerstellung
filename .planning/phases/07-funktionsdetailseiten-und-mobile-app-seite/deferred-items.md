# Phase 07 – zurückgestellte Punkte

## Aus 07-08

1. **Leerraum in Icon-Kacheln ohne Phone (nicht B10).** Die B10-Messung über alle 22 Detailseiten und /app
   (Playwright, Chromium und WebKit, 768/1024/1440) zeigt in Rastern ohne große Phone-Kachel (Anordnungen
   md·sm·sm·…) bei 1024 px bis zu 122 px Leerraum in md-Kacheln (plantafel „Über Änderungen informiert“,
   angebote, dashboard, kundenportal, gaeb, mahnwesen um 97 px), bei 1440 px höchstens 49 px. Ursache: Die
   sm-Kacheln im Vierspaltenraster sind bei 1024 px so schmal, dass ihr Text umbricht und die Rasterzeile
   höher wird als die md-Kachel daneben. Der Befund war vor B10 identisch (55 Kacheln über 48 px vorher wie
   nachher), B10 ändert diese Raster nicht. Vorschlag für Phase 10: Text der md-Kachel unten ausrichten oder
   das Raster zwischen 1024 und 1279 px dreispaltig führen; Entscheidung braucht eine UI-SPEC-Abweichung.
   Messdaten: `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/07-08/b10/b10-nachher.json`.

2. **Gedimmte Zwischenstände der FeatureSnippet-Animation.** Bei laufender Animation stehen inaktive
   Schritte mit 50 % (lager, `stockMovement`) bzw. 35 % Deckkraft (aufmass, `opening`); axe meldet in diesen
   Zwischenständen `color-contrast`. Die Fläche ist `aria-hidden`, dekorativ und Teil einer Abbildung
   (WCAG 1.4.3, „incidental“); der statische Endzustand (reduzierte Bewegung, ohne JavaScript) ist axe-frei
   und wird in `funktionsdetails.pw.cjs` geprüft. Entscheidung über die Dimmstufe zusammen mit
   `components/product-demo` in Phase 10.
