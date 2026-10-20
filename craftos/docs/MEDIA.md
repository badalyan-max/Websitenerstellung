# Medien des Relaunchs

Stand: 9. September 2026.

- `public/icons/gewerke/*.svg`: zwölf eigens erstellte, skalierbare Werkzeugzeichnungen auf gemeinsamem 64er Raster, dunkler Kontur und zurückhaltendem Amber. Keine generierten Rastergrafiken als Icons.
- `public/images/team-baustelle-2026.webp`: neu generiertes, illustratives Nutzungsmotiv einer Innenausbau-Baustelle; keine erfundene Produktoberfläche. Originaldatei bleibt im lokalen Generated-Images-Ordner erhalten.
- `public/images/werkstatt-2026.webp`: neu generiertes, illustratives Nutzungsmotiv einer Tischlerei bei Tageslicht. Einheitlicher ruhiger, wenig gesättigter Stil.
- `public/images/mobile/zeiten.webp` und `projekte.webp`: unveränderte Inhalte aus den tatsächlichen Mobile-Aufnahmen vom Juli 2026, nur skaliert und als WebP optimiert. Diese älteren Aufnahmen werden nicht mehr als Hauptmotiv auf der App-Seite verwendet.
- Die sechs interaktiven Beispieldemos sind React-Oberflächen mit gemeinsamem Datenmodell; sie zeigen ein fiktives Projekt. Automatik und manuelle Bedienung verwenden dieselben Zustandsübergänge. Keine Live-KI, keine Registrierung, keine echten Betriebsdaten.
- Frühere generierte Hintergründe werden nicht mehr in der Website verwendet. Bestehende öffentliche Mediendateien bleiben unter ihren bisherigen Adressen erreichbar.


- `public/images/mobile/store/*.webp`: neun bestehende, gestaltete CraftOS Storemotive aus dem aktuellen öffentlichen Apple-Auftritt (Version 1.0.3), für die Website proportional optimiert. Diese Storemotive bleiben als Archiv erreichbar; die neue Galerie verwendet frisch aufgenommene App-Bilder und passende Handy-Mockups. Herkunft und Prüfsummen: `store-media-sources.md` und `store-media-sources.json`.
- Zwei getrennte QR-Codes tragen direkt die dokumentierten Store-Ziele für iOS und Android. Die Marketingseite leitet nicht ungefragt in eine mobile Browser-App weiter.

- Aktuelle Hauptmedien: siehe `MOBILE-MOCKUPS.md`. Drei frisch aufgenommene App-Ansichten mit KI-Geräterahmen und direkter Umschaltung auf die unveränderten Originalaufnahmen. Die Darstellungsbreite ist auf dem Handy bis zu 324 px und am Desktop bis zu 360 px groß, damit Schrift lesbar bleibt.

## Medienbudget und Bildkonvertierung (Stand: 21. Oktober 2026, Plan 05-06)

**Budgetregel (MEDIA-04):** Jede tatsächlich ausgelieferte Bildvariante ist AVIF, WebP oder SVG und höchstens 150 KB (153.600 Bytes) groß. Jedes Bild hat feste Abmessungen (`width`/`height`), damit kein Layout-Shift entsteht. Das Budget gilt je ausgelieferter Datei, nicht als Summe.

**Konvertierung:** `node scripts/optimize-images.mjs` (im Ordner `craftos/`). Das Skript nutzt das über `next` installierte `sharp` 0.35.4 (keine eigene Installation) und erzeugt AVIF (Qualität 60, effort 6) und WebP (Qualität 75, effort 6, smartSubsample) mit höchstens 1600 px Breite ohne Vergrößerung. Liegt eine Variante über 150 KB, senkt es die Qualität in 5er-Schritten bis 45 und bricht sonst mit Dateinamen ab. Die Konsole zeigt Abmessungen, Qualität und Größe je Datei.

| Eingabe | Ausgabe | Abmessungen | Größe (AVIF / WebP) | Verwendung |
|---|---|---|---|---|
| `images/mobile/current/dashboard-original.png` | `dashboard-original.avif/.webp` | 1170 × 2532 | 34,0 / 48,7 KB | Originalansicht der Mobile-Galerie (`/app`) |
| `images/mobile/current/projekt-original.png` | `projekt-original.avif/.webp` | 1170 × 2532 | 39,0 / 56,5 KB | Originalansicht der Mobile-Galerie |
| `images/mobile/current/zeiten-original.png` | `zeiten-original.avif/.webp` | 1170 × 2532 | 45,4 / 61,1 KB | Originalansicht der Mobile-Galerie |
| `images/werkstatt-2026.webp` | `images/werkstatt-2026-1600.avif/.webp` | 1536 × 1024 | 87,9 / 78,9 KB | `/gewerke`, Musterseite `/styleguide` |
| `images/team-baustelle-2026.webp` | `images/team-baustelle-2026-1600.avif/.webp` | 1536 × 1024 | 82,9 / 82,4 KB | vorbereitet für die Phasen 6–9 |

Die Ausgangsdateien bleiben unverändert erhalten (Löschregel, D-15). Die Werkstatt- und Team-Motive sind 1536 px breit, kleiner als die Obergrenze 1600 px; der Dateiname nennt die Obergrenze.

**Kennzeichnung der Mobile-Galerie (MEDIA-03, D-04):** Die Mockup-Ansicht trägt „Darstellung, KI-gestaltet: App-Aufnahme vom 9. September 2026 im Handy-Mockup.“, die Originalansicht „Originalaufnahme der Mobile-App vom 9. September 2026.“ Die Galerie führt jede Ansicht mit vollständigen, statischen Pfaden (AVIF als `source`, WebP als `img`).

**Prüfung:** `tests/media-budget.test.ts` sammelt alle literalen Bildpfade (`/images/…`, `/icons/…`) aus `app/`, `components/`, `lib/` und `content/`. Pfade, die per Verkettung (`"/images/…" +`) oder Template-Literal (`` `/images/…${` ``) gebildet werden, löst der Test über das Verzeichnis auf: Alle Dateien in `public/`, deren Pfad mit dem Präfix beginnt, gelten als ausgeliefert (z. B. `/images/mobile/qr-*`, `/images/brands/*`, `/icons/gewerke/*`). Im Browser prüft `tests/e2e/design-v2.pw.cjs` (Beschreibung „Budget“) die tatsächlich ausgelieferten Antworten, Abmessungen und CLS auf sieben Routen.

**Ausnahmen vom Format (Größenlimit gilt trotzdem):**

| Datei | Begründung |
|---|---|
| `icons/icon-192x192.png` | Favicon und Apple-Touch-Icon in `app/layout.tsx`; Browser und iOS verlangen PNG. |
| `icons/icon-512x512.png` | Organisationslogo im JSON-LD (`lib/schema.ts`); Google verlangt ein Rasterformat wie PNG. |
| `images/brands/craftnote.png` | Offizielles Fremdlogo auf `/vergleich`, unverändert eingebunden (Markenvorgaben), 10,4 KB. |

**Ungenutzte Großdateien:** Mockup-Master (`*-mockup.png/.webp`), alte Fotos (`hero-werkbank.jpg` u. a.), `images/screenshots/`, `images/mobile/store/`, `icons/icon-1024x1024.png` sowie die Ausgangsdateien oben bleiben bewusst unter ihren bisherigen Adressen in `public/` (D-15). Sie werden von keiner Seite eingebunden und deshalb nicht vom Budget geprüft.
