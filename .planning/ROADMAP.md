# Roadmap

1. Produktgrundlage und Gestaltung: Produktregister, überprüfbare Quellenstände, Navigation, semantisches Designsystem.
2. Produkterlebnis: Startseite, 16 Funktionsseiten, Gewerke, Preise, Mobile/Craft AI, sechs funktionierende Demos und Medien.
3. Wissen und Werkzeuge: serverseitiger Markdown-Unterbau, Blog/Hilfe, 64 Inhalte, zwei Rechner, Metadaten und Sitemap.
4. Abnahme: Testfälle, vollständiger Linkcrawl, Chromium/WebKit mit fünf Viewports, Accessibility, Build/Lint/Typprüfung, Review und Übergabe.

## Ownership
- Root: Integration, Designsystem, sämtliche vorhandenen Seiten, Produktregister, Content-Infrastruktur, SEO, Medien, Tests und Abnahme; Worktree main.
- build_content: ausschließlich content/blog, content/hilfe und docs/content-source-audit.md; Worktree content.
- website_content_audit: ausschließlich components/product-demo, lib/demo und tests/demo.test.ts; Worktree demos.
- calculator_spec: ausschließlich components/calculators, lib/calculators.ts, app/rechner und tests/calculators.test.ts; Worktree tools.

Integration erfolgt nach Datei-Zuständigkeit. Keine parallele Browserbedienung und keine eigenständigen Commits der Worker.

## Abschluss
Alle vier Etappen lokal umgesetzt und geprüft. Die abschließenden Zuständigkeiten umfassten beim Contentagenten Browserfälle, beim Demoagenten mobile Führung und Medienprüfung sowie beim Rechneragenten Preise, Produktabgleich und direkte Mobile-Aufnahmen. Integration und Veröffentlichung bleiben in Verantwortung des Hauptagenten.
