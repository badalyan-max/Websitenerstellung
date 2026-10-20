# Zurückgestellte Punkte – Phase 05

## Aus Plan 05-06 (21.10.2026)

1. **/gewerke zeigt ein KI-generiertes Foto ohne Kennzeichnung.** `public/images/werkstatt-2026.webp` (jetzt ausgeliefert als `werkstatt-2026-1600.webp`) ist laut `craftos/docs/MEDIA.md` ein „neu generiertes, illustratives Nutzungsmotiv“. Nach D-04/MEDIA-03 gehört die sichtbare Kennzeichnung „Darstellung, KI-gestaltet“ daran. Plan 05-06 durfte `/gewerke` nur im Bildpfad ändern (D-03). Empfehlung: bei der Neugestaltung der Gewerke-Seite (Phasen 6–8) `MediaFigure` mit `label="ki"` verwenden. Dasselbe gilt für `team-baustelle-2026`, sobald es eingebunden wird.
2. **Instabiler Bestandstest (WebKit):** `tests/e2e/function-illustrations.pw.cjs` „außerhalb des Viewports bleibt der automatische Ablauf stehen“ schlug in einem vollen Lauf mit zwei Workern einmal fehl (Phase lief vor dem Wegscrollen von 1 auf 2) und bestand anschließend viermal in Folge isoliert. Es handelt sich um ein Zeitrennen im Test, nicht um eine Folge der Änderungen aus 05-06.
3. **Lücke der Koordinationszentrale:** Für das Website-Repo (`craftos/`, Next.js-Marketingseite) gibt es kein Rezept (`web-*`/`mobile-*` gelten nur für die CraftOS-Produkt-Repos). Build und Playwright-E2E liefen deshalb lokal als einzelner schwerer Prozess. Vorschlag: Rezepte `site-build` und `site-e2e` für dieses Repo bauen.
