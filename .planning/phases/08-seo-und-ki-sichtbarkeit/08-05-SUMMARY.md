---
phase: 08-seo-und-ki-sichtbarkeit
plan: 05
subsystem: seo-og-grafiken
tags: [og-image, opengraph, twitter-image, generateStaticParams, d-08, d-20, d-21]
requires:
  - phase: 08-04
    provides: keyword-map.json mit target.h1 für alle 131 indexierten Seiten, metaFor/zielwerte
  - phase: 08-01
    provides: seo-audit.mjs mit Regel og (prerender-manifest, ≤ 300 KB, twitter:image = og:image)
provides:
  - craftos/lib/og.tsx mit OG_SIZE, OG_KINDS/OgKind, ogTitleSize, ogAlt, pageOg (G7)
  - 24 opengraph-image.tsx (Root + 23 Segmente), alle statisch beim Build, dynamische mit generateStaticParams
  - metaFor setzt standardmäßig das Segmentbild {path}/opengraph-image (Root /opengraph-image); segmentBild(), ogTitel()
  - Kurztitel target.ogTitle in keyword-map.json für H1 über 90 Zeichen
affects: [08-08, 08-09, 08-11, 08-12, 08-14, phase-09]
tech-stack:
  added: []
  patterns:
    - "OG je Segment: statisch drei Exporte (size = OG_SIZE, contentType, alt = ogAlt(kind, titel)) plus default pageOg({ title: ogTitel(pfad), kind, path }); dynamisch zusätzlich generateStaticParams aus derselben Datenquelle wie page.tsx und await params"
    - "Neue Seiten mit metaFor(pfad) brauchen eine opengraph-image.tsx im Segment, sonst meldet seo-audit --only=og einen Verstoß"
key-files:
  created:
    - craftos/tests/og.test.ts
    - craftos/app/{funktionen,app,preise,vergleich,gewerke,craft-ai,gobd,fakten-ueber-craftos,support,blog,hilfe,rechner,rechner/stundensatz,rechner/angebotskalkulation,agb,datenschutz,impressum}/opengraph-image.tsx
    - craftos/app/{funktionen/[slug],gewerke/[slug],blog/kategorie/[category],hilfe/kategorie/[category]}/opengraph-image.tsx
  modified:
    - craftos/lib/og.tsx
    - craftos/app/opengraph-image.tsx
    - craftos/app/blog/[slug]/opengraph-image.tsx
    - craftos/app/hilfe/[slug]/opengraph-image.tsx
    - craftos/lib/seo-meta.ts
    - craftos/lib/keyword-map.ts
    - craftos/docs/seo/keyword-map.json
    - craftos/components/CraftOSLogo.tsx
    - craftos/tests/seo-meta.test.ts
    - craftos/app/app/page.tsx
    - craftos/app/funktionen/page.tsx
    - craftos/app/funktionen/[slug]/page.tsx
    - craftos/scripts/route-audit.mjs
key-decisions:
  - "08-05: H1 über 90 Zeichen (3 Ratgeber) bekommen einen Kurztitel target.ogTitle in keyword-map.json; ogTitel(path) = ogTitle ?? h1, Test sichert ogTitle nur bei H1 > 90 und alle OG-Titel ≤ 90"
  - "08-05: Dynamische Segmente exportieren einen festen alt-Text („Ratgeber von CraftOS“ usw.), weil der alt-Export statisch ist und generateImageMetadata die Bild-URL verändern würde; statische Segmente nutzen „{kind}: {title}“"
  - "08-05: Logo im OG-Bild flach in #F2AF38 (ohne SVG-Verlauf, UI-SPEC § 7 „flach, kein Verlauf“), viewBox auf die Markenfläche zugeschnitten, damit das Zeichen 56 px ausfüllt"
  - "08-05: generateStaticParams in den Bilddateien als eigene Funktion aus derselben Datenquelle wie page.tsx statt Re-Export aus ./page (Bildroute lädt so keine Seitenkomponenten)"
requirements-completed: []
duration: 31min
completed: 2026-10-22
---

# Phase 8 Plan 05: OG-Grafik je Seite Summary

**Eine Markenvorlage `pageOg` (Geist Regular, #101014 flach, Seitentyp in Amber, Titel = H1, 12-px-Amberkante) erzeugt beim Build für alle 131 Sitemap-URLs ein eigenes OG-Bild (131 Einträge im prerender-manifest, größtes 57,9 KB, Mittel 46,7 KB); `twitter:image` = `og:image` überall, `seo-audit --only=og` 0 Verstöße (vorher 130).**

## Performance

- **Duration:** ca. 31 min
- **Started:** 2026-10-22T17:12Z
- **Completed:** 2026-10-22T17:43Z
- **Tasks:** 2 (Task 1 mit RED- und GREEN-Commit)
- **Files modified:** 13 geändert, 23 neu (22 Bilddateien + og.test.ts)

## Accomplishments

- **Vorlage G7 (`lib/og.tsx`):** `OG_SIZE`, `OG_KINDS`/`OgKind` (16 Seitentypen), `ogTitleSize` (≤ 40 → 72 px, 41–60 → 64 px, 61–90 → 52 px, > 90 Fehler „OG: Titel für {path} hat {n} Zeichen – höchstens 90, Kurztitel in den Daten angeben.“), `ogAlt`, `pageOg`. Keine `fonts`-Option, kein `fontWeight`, kein Verlauf, kein Raster, keine Pillen, keine Versalien, kein „·“/„→“. `articleOg` entfernt (ausdrücklich erlaubt).
- **Root-Bild** auf `pageOg({ title: H1, kind: "Handwerkersoftware" })` umgestellt (Verlauf, Raster, Pillen, `fontWeight: 800` entfallen).
- **24 Bilddateien** laut UI-SPEC § 7 „Seitentyp je Segment“, darunter die Bilder für `/fakten-ueber-craftos`, `/craft-ai` und `/gobd` (laut Auftrag hier gebaut, Spur C legt keine eigenen an). Rechtsseiten: Seitentyp „Rechtliches“ mit Seitennamen (D-20). `/styleguide` ohne Bilddatei.
- **Metadaten:** `metaFor` setzt standardmäßig `{path}/opengraph-image` (Root `/opengraph-image`); `/app`, `/funktionen` und `/funktionen/[slug]` laufen jetzt über `metaFor`. `pageMetadata(` kommt in `app/` nur noch auf `/` (Root-Bild) und `/styleguide` (noindex, keine OG-Datei) vor.
- **route-audit:** OG-Stichprobe um `/preise`, `/funktionen/angebote`, `/hilfe/kategorie/rechnungen` erweitert; Exit-Bedingung prüft jetzt zusätzlich `content-type image/png`.
- **product-register.test.ts:** OG-URL-Form unverändert (`/blog/<slug>/opengraph-image`), keine Anpassung nötig.

## Messung (Annahme A4)

| Größe | Vorher (08-04-Build, 16:55Z) | Nachher |
|---|---|---|
| `next-build` (Trace) | 26,6 s | 28,0 s (erster Build), 20,4 s (zweiter Build, warmer Cache) |
| davon `static-generation` | 3,3 s | 3,9 s bzw. 3,4 s |
| Wanduhr `npm run build` | – | 35 s bzw. 28 s |
| Routen im prerender-manifest | 139 | 269 |
| `opengraph-image`-Einträge | 1 | **131 = Anzahl Sitemap-URLs**, keine Sitemap-URL ohne Bild |
| OG-Größe | Root 78 KB | größtes 57,9 KB (`/blog/abschlagsrechnung-schlussrechnung`), kleinstes 30,7 KB, Mittel 46,7 KB, Median 47,2 KB, gesamt 5,97 MB; keines über 300 KB |

A4 bestätigt und unterschritten: Build-Mehrzeit rund 1–2 s statt 10–40 s, Bildgröße 31–58 KB statt 40–90 KB. 08-04 nannte keine Build-Dauer; der Vorher-Wert stammt aus `.next/trace` des letzten 08-04-Builds.

## Prüfergebnisse

- Vitest gezielt: og, seo-meta, keyword-map, product-register 51/51; content, app-seite, funktionen-seite, seo-audit-core 94/94.
- `npm test` (volle Suite unter Sperre): **34 Dateien, 627 bestanden, 1 fehlgeschlagen** – `pricing-parity.test.ts` „Snapshot ist aktuell: Commit entspricht origin/release“ (Web-`origin/release` steht inzwischen auf `a9319e5db925`, Snapshot auf `1e9c8bc288dc`). Bekannt aus deferred-items.md (08-03), unabhängig von 08-05, Produktsync gehört nicht in diesen Plan.
- `npm run lint`, `npm run typecheck`: grün.
- `npm run build`: grün (zweimal, je unter `.heavy-lock`; Koordinationsstatus vorher gelesen, kein Website-Rezept, also lokal und einzeln).
- `node scripts/seo-audit.mjs --only=og,breadcrumbs,title,description,h1,duplikate,map`: **131/131 URLs, 0 Verstöße, Exit 0**.
- `npm run test:e2e`: **293 bestanden, 0 fehlgeschlagen, 75 übersprungen** (7,7 min).
- `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs`: 131 Routen, 0 Fehler, 0 defekte Links, 6/6 OG-Stichproben 200 `image/png`, Exit 0.
- `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs`: 46 OK, „alle Prüfungen OK“.
- Server `next start -p 3100` mit eigener PID 39336; nach dem Lauf beendet, Port 3100 frei, kein Prozess mit dieser PID mehr, Sperre freigegeben.

## OG-Sichtprüfung

Kopien in `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/08-05/`: `root.png` (52 Zeichen, 64 px), `ratgeber-tiefenkalkulation.png` (Kurztitel 78 Zeichen, 52 px, zwei Zeilen), `rechtliches-datenschutz.png` (Rechtliches, 72 px). Logo, Seitentyp, Titel ohne Abschneiden, „craftos.eu“ und Amberkante sind korrekt; längster Titel (88 Zeichen) passt in drei Zeilen. Keine PNG im Git-Status.

**Befund (Renderer):** Satori setzt mit der gebündelten Geist Regular einzelne Wortabstände sichtbar breiter (z. B. nach Komma oder nach „…tion“). Gegenprobe ohne `letterSpacing`, mit ausdrücklich geladener Geist-TTF und mit Wörtern als einzelne Spans zeigt dasselbe, die Ursache liegt also im Renderer bzw. in der Schrift, nicht in der Vorlage. Abhilfe wäre nur eine andere Schrift (gesperrt durch D-21/C7); Hinweis für den Inhaber bei der Abnahme.

## Task Commits

1. **Task 1: pageOg, Root-Bild, Segmentbild als metaFor-Standard** – `d60ea46` (test, RED), `014d054` (feat, GREEN)
2. **Task 2: Segmentdateien, metaFor auf /app und /funktionen, route-audit, Messung** – `bd8a303` (feat)

## Decisions Made

Siehe `key-decisions` im Frontmatter.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Drei H1 über 90 Zeichen hätten den Build abgebrochen**
- **Found during:** Task 1
- **Issue:** `/blog/handwerkersoftware-auswaehlen` (91), `/blog/offline-baustellen-app` (91) und `/blog/tiefenkalkulation-handwerk` (98) überschreiten die 90-Zeichen-Grenze der Vorlage.
- **Fix:** Kurztitel `target.ogTitle` in keyword-map.json (per Skript mit Längen-, Zeichen- und Kopfwortprüfung), Typ in `lib/keyword-map.ts` ergänzt, `ogTitel()` in `lib/seo-meta.ts`; H1, Title und Description unverändert.
- **Files modified:** craftos/docs/seo/keyword-map.json, craftos/lib/keyword-map.ts, craftos/lib/seo-meta.ts
- **Commit:** 014d054

**2. [Rule 3 - Blocking] Logopfad für die Vorlage**
- **Issue:** Das Markenzeichen liegt nur als nicht exportierte Konstante in `components/CraftOSLogo.tsx`.
- **Fix:** `LOGO_PATH` exportiert (ein Wort), keine Kopie des Pfads.
- **Commit:** 014d054

**3. [Rule 1 - Bug] Logo wirkte zu klein**
- **Found during:** Task 2, Sichtprüfung
- **Issue:** Der Pfad füllt nur rund 61 % der Viewbox 0 0 1024 1024; das Zeichen erschien etwa 34 px statt 56 px groß.
- **Fix:** Viewbox auf die Markenfläche zugeschnitten (`140 139 744 744`).
- **Commit:** bd8a303

### Abweichungen und Hinweise

- **alt-Text dynamischer Segmente:** fest je Seitentyp statt „{kind}: {title}“ (siehe key-decisions); statische Segmente und Root folgen der Vorgabe.
- **Logo flach** in #F2AF38 statt mit dem SVG-Verlauf des Bestandszeichens (UI-SPEC § 7 „flach, kein Verlauf“).
- **Kurztitel in der Map** sind Daten, keine Metadaten-Änderung; `target.ogTitle` ist ein neues optionales Feld.
- Die Datei-Liste nannte die Tests `tests/og.test.ts` und `tests/seo-meta.test.ts`; die Smoke-Prüfung von `pageOg` (PNG mit Inhalt) läuft in Vitest.

**Total deviations:** 3 auto-fixed (Rule 1, Rule 3 ×2). **Impact:** keine Umfangserweiterung.

## Issues Encountered

- `pricing-parity.test.ts` „Snapshot ist aktuell“ weiterhin rot (siehe oben, deferred-items 08-03).
- Sperre `.heavy-lock` zweimal belegt (08-12 E2E, 08-08 npm ci); Läufe haben gewartet und die Sperre direkt danach freigegeben.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche. T-08-12: jede dynamische Bilddatei hat `generateStaticParams`, das Audit bestätigt alle 131 Bilder im prerender-manifest (kein Rendern bei Abruf). T-08-13: Bilder enthalten nur Seitentyp, H1 bzw. Kurztitel und „craftos.eu“. T-08-14: keine neuen Schriftdateien.

## User Setup Required

None – keine externe Konfiguration.

## Next Phase Readiness

- Neue Seiten (08-08, 08-09, 08-11) brauchen je Segment eine `opengraph-image.tsx` nach dem Muster oben; `metaFor(pfad)` verweist automatisch auf das Segmentbild. Für `/vergleich/<slug>` gilt Seitentyp „Vergleich“.
- Ändert ein Folgeplan eine H1 auf über 90 Zeichen, bricht der Build mit dem Kurztitel-Hinweis ab; dann `target.ogTitle` setzen.

## Self-Check: PASSED

Commits d60ea46, 014d054, bd8a303 im Verlauf; `export function pageOg` = 1, `articleOg` = 0, kein `linear-gradient`/`fontWeight: [5-8]00` in lib/og.tsx und app/opengraph-image.tsx; `opengraph-image` in seo-meta.ts vorhanden; 24 Bilddateien, 6/6 dynamische mit `generateStaticParams`; keine Bilddatei unter /styleguide; `metaFor(` in app/app, app/funktionen und app/funktionen/[slug] je ≥ 1.
