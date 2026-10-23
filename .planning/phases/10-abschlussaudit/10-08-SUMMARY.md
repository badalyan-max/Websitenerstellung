---
phase: 10-abschlussaudit
plan: 08
subsystem: barrierefreiheit/featuresnippet/e2e
tags: [paket-a, barrierefreiheit, dimmstufe, featuresnippet, tastatur, e2e, baseline, axe]
requires:
  - phase: 10-01
    provides: "scripts/a11y-audit.mjs, scripts/lib/a11y-audit-core.mjs (bewerteAxe, WEBKIT_VORLAGEN, Merge)"
provides:
  - "Dimmstufe der FeatureSnippets per Farbton statt Deckkraft (D-10, 10-UI-SPEC § 8)"
  - "craftos/tests/e2e/a11y.pw.cjs mit 11 Fallgruppen „Vorlage:“/„Tastatur:“ (D-07, D-31 Nr. 1, 21, 40)"
  - "Baseline der vollen A11y-Matrix: 158 Seiten, 890 Aufrufe, Gate nur auf den drei Rechtsseiten verletzt (Besitz c)"
affects: [10-06, 10-12, 10-03, 10-10]
tech-stack:
  added: []
  patterns:
    - "Gedimmter Zustand über color (#62626E) statt opacity; aktiver Zustand #17171C; Übergang color/background-color 300 ms"
    - "E2E-Spec lädt die ESM-Kern-Datei per await import(pathToFileURL(...)) und wertet axe mit bewerteAxe wie das CLI"
    - "Volle Matrix in fünf gleich großen Teilen --shard=k/5 über beide Engines (Merge verlangt gleiche Teilzahl)"
key-files:
  created:
    - craftos/tests/e2e/a11y.pw.cjs
  modified:
    - craftos/components/feature-snippet/IllustrationScene.module.css
    - craftos/components/feature-snippet/ConnectedScene.module.css
    - craftos/components/feature-snippet/SupplementalScene.module.css
key-decisions:
  - "Volle Matrix als --shard=k/5 über beide Engines statt Chromium 4/4 plus WebKit 1/1, weil mergeReports Teilberichte mit unterschiedlicher Teilzahl ablehnt."
  - "In der Lager-Szene wird auch die Unterzeile (small) des inaktiven Schritts auf #62626E gesetzt; aktiv kehrt sie zum Bestand ink-600 zurück."
  - "Sprunglink-Fall läuft nur in Chromium; die Suche prüft in WebKit die Fokussierbarkeit des Treffers per focus(), weil WebKit unter Windows Links nicht per Tab fokussiert (10-01, gemessen)."
  - "Menü-Fall wählt je Breite automatisch Drawer („Menü öffnen“ sichtbar) oder Mega-Menü (erster data-nav-disclosure-Schalter) und prüft beide Tasten."
  - "Kein Task-3-Code-Commit: Die Baseline zeigt außerhalb der Rechtsseiten 0 Befunde; app/globals.css und übrige Paket-(a)-Dateien blieben unverändert."
requirements-completed: []
metrics:
  duration: "ca. 65 min (11:13–12:18 UTC, davon rund 25 min Warten auf die gemeinsame Sperre)"
  completed: 2026-10-23
  tasks: 3
  files: 4
---

# Phase 10 Plan 08: FeatureSnippet-Dimmstufe, a11y.pw.cjs und Baseline der vollen A11y-Matrix – Summary

Die inaktiven Schritte der FeatureSnippets haben jetzt volle Deckkraft und werden über den Farbton `#62626E` gedimmt; im Animationszustand meldet axe auf allen 22 Snippet-Seiten bei fünf Breiten 0 `color-contrast`. Die neue Spec `tests/e2e/a11y.pw.cjs` automatisiert die Vorlagen- und Tastaturfälle aus D-07 (65 bestanden, 0 fehlgeschlagen ohne den Rechtsseiten-Fall). Die erste volle Matrix (158 Seiten, 890 Aufrufe) ist außerhalb von `/impressum`, `/datenschutz` und `/agb` fehlerfrei; die 25 Gate-Verstöße dort gehören zu Paket (c).

## Aufgaben

| Aufgabe | Inhalt | Commit |
|---|---|---|
| 1 | Dimmstufe per Farbton (D-10), Mini-UI-Gewicht 400 (§ 7.3), Nachweis im Animationszustand | `f04fcf8` |
| 2 | E2E-Spec `tests/e2e/a11y.pw.cjs` (RED → GREEN) | `89f6313` |
| 3 | Baseline der vollen Matrix, Auswertung, Übergabeliste | kein Code-Commit (0 Befunde in Paket-(a)-Dateien), Zahlen hier |

## Aufgabe 1: Dimmstufe

- `IllustrationScene.module.css`: `.stockMovement` von `opacity: .5` auf `color: #62626E` (auch die Unterzeile `small`), aktiv `color: #17171C` auf `primary-50`, Unterzeile aktiv wieder `ink-600`. Der gemeinsame Übergang von `[data-cursor-target]` läuft über `color` statt `opacity`.
- `ConnectedScene.module.css`: `.opening` von `opacity: .35` auf `color: #62626E`, aktiv `#17171C` mit `border-style: solid` (Bestand). Übergang `color, background-color .3s`. Der gestrichelte Rahmen `#D28A13` bleibt als Nicht-Text-Element.
- `SupplementalScene.module.css` Z. 83: `font-weight: 500` → `400`; die Zeilen mit `700` sind unverändert.
- Weitere Deckkraftregeln in `components/feature-snippet/**` (Benachrichtigung, Scanstrahl, Cursor, Geräte-Slots, `planSheet`, `sourceDetails`) blenden Elemente vollständig ein und aus. Sie dimmen keinen Text, deshalb blieben sie unverändert. Der Animationslauf bestätigt das mit 0 Befunden.
- Reduzierte Bewegung: Die bestehenden Regeln in `FeatureSnippet.module.css` und `IllustrationScene.module.css` setzen `transition: none`. Damit gilt der Endzustand.

**Nachweis unter Sperre (11:25–11:31 UTC):** Build 35 s, Server 3101. `a11y-audit.mjs --paths=<22 Snippet-Seiten> --engines=chromium --animation=an` lief 330 s, danach `--merge` mit 22 Seiten, 110 Aufrufen, 110 Animationsprüfungen und **22 Snippet-Seiten**. Ergebnis: 0 Gate-Verstöße, davon **0 `color-contrast` im Zustand `animation`**, 0 Großtext, 0 Tastatur, 0 Status. Unvollständige Kontrastknoten (nur zur Sichtprüfung): 2024. Freier RAM 2,30 bis 3,37 GiB.

**Screenshots (selbst angesehen):** Der aktive Schritt ist über die Amber-Fläche und dunklen Text klar erkennbar. Der inaktive Schritt ist grau auf grau, aber gut lesbar. Beim Aufmaß ist die Öffnung „~2 m²“ inaktiv gestrichelt mit grauem Text.
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-a/snippet-lager-390-aktiv.png`, `…/snippet-lager-390-inaktiv.png`, `…/snippet-lager-390-gemischt.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-a/snippet-lager-1440-aktiv.png`, `…/snippet-lager-1440-inaktiv.png`, `…/snippet-lager-1440-gemischt.png`
- `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-a/snippet-aufmass-390-gemischt.png`, `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-a/snippet-aufmass-1440-gemischt.png`

Akzeptanz-Greps: `#62626E` ist in beiden Szenen-Dateien vorhanden, `font-weight: 500` in `SupplementalScene.module.css` gibt es nicht mehr, keine Deckkraft-Dimmung 0,5/0,35 mehr. `npm run lint` und `npm run typecheck` sind grün.

## Aufgabe 2: `tests/e2e/a11y.pw.cjs`

Fälle (11 Testaufrufe mit Präfix im Quelltext, die Vorlagenschleife erzeugt 20 Fälle):
- „Vorlage: Liste entspricht WEBKIT_VORLAGEN“: Gleichlauf mit der Kern-Datei.
- „Vorlage: <pfad>“ für die 20 Vorlagen bei 360/390/768/1024/1440. Geprüft werden das axe-Gate wie im CLI (Gate plus Großtext), kein horizontaler Seitenscroll und die H1 ohne Überlauf. `/impressum` heißt „Vorlage: Rechtsseite /impressum“.
- „Tastatur: Sprunglink“: erster Tabstopp `a.skip-link[href="#inhalt"]`, Enter setzt `#inhalt` als Ziel, der nächste Tab landet im Hauptbereich.
- „Tastatur: Menü und Drawer“: Enter und Leertaste öffnen (`aria-expanded="true"`), beim Drawer sind `main` und `footer` `inert`, Esc schließt und der Fokus kehrt zum Auslöser zurück (06 WR-02/IN-01).
- „Tastatur: FAQ“ (`/gobd`), „Tastatur: Rechner“ (alle Felder per Tab, Eingabe in „Personalkosten pro Jahr in Euro“ ändert den `aria-live`-Bereich, Rechenweg-`summary`), „Tastatur: Suche“ (`/hilfe`), „Tastatur: Pause“ (`/funktionen/lager`, Leertaste → `data-running="false"`, Fokus wechselt auf „Animation fortsetzen“), „Tastatur: Tabellen-Scroll“ (`/preise` bei 360 px).
- „Vorlage: 404“ (Status 404, `noindex`, keine Brotkrumen), „Vorlage: Styleguide-Bild“ (Alt-Text von `werkstatt-2026` und sichtbare Kennzeichnung „Darstellung, KI-gestaltet“), „Vorlage: Silbentrennung WebKit“ (`/hilfe/material-entnehmen-zurueckbuchen` bei 360 px ohne Querscroll).
- 0 `waitForTimeout`. Das Warten hängt immer an Bedingungen (`toHaveAttribute`, `expect.poll`).

**RED:** Der 404-Fall wurde bewusst mit `toBe(200)` ausgeführt und schlug in `chromium-1440` fehl (1 failed). Danach wurde die Datei byte-gleich wiederhergestellt (`cmp` identisch).
**GREEN unter Sperre (11:34–11:41 UTC, Build 29 s):** `CRAFTOS_BASE_URL=http://localhost:3101 npx playwright test -c <Scratchpad>/a11y.config.cjs --grep-invert "Rechtsseite"` ergab **65 passed, 55 skipped, 0 failed** (3,7 min, alle vier Projekte). Übersprungen wurden in den Touch-Projekten die Fälle mit Breitenschleife (52), der Sprunglink in `webkit-1440` (1) und die Silbentrennung in den beiden Chromium-Projekten (2).
**Rot aus fremdem Besitz:** „Vorlage: Rechtsseite /impressum“ (`chromium-1440`) meldet `color-contrast (serious) .hover\:underline` bei allen fünf Breiten. Das ist **rot bis zum Merge von (c)** (D-09) und wurde per `--grep-invert` nur über den Namen ausgenommen, nicht abgeschwächt.
Die Scratchpad-Konfiguration liegt unter `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-a/a11y.config.cjs` und nicht im Repo (`git status --porcelain` leer).

## Aufgabe 3: Baseline der vollen Matrix

Lauf 11:57–12:16 UTC. Der Build lief mit dem ersten Teil unter derselben Sperre (33 s). Je Teil wurde die Sperre neu geholt und danach freigegeben, je Teil ein eigener Serverstart auf 3101.

| Teil | Aufrufe | Laufzeit | Gate | Freier RAM (Start → Ende) |
|---|---|---|---|---|
| `--shard=1/5` | 178 | 221 s | 4 | 2,46 → 2,95 GiB |
| `--shard=2/5` | 178 | 215 s | 4 | 2,95 → 2,72 GiB |
| `--shard=3/5` | 178 | 219 s | 4 | 2,71 → 2,22 GiB |
| `--shard=4/5` | 178 | 214 s | 4 | 2,23 → 2,66 GiB |
| `--shard=5/5` | 178 | 212 s | 9 | 2,64 → 3,16 GiB |

**Merge (5 Teilberichte, kein „fehlt“/„doppelt“):** 158 Seiten (156 Sitemap-URLs + `/styleguide` + 404), **890 Aufrufe** (Chromium 790 = 158 × 5, WebKit 100 = 20 Vorlagen × 5), 110 Animationsprüfungen auf 22 Snippet-Seiten, Gesamtlaufzeit 1081 s. Exit 1 nur wegen der Rechtsseiten.

| Zähler | Gesamt | außerhalb der Rechtsseiten |
|---|---|---|
| Gate-Verstöße | 25 (alle `color-contrast`, `serious`) | **0** |
| Großtext-Knoten < 4,5 : 1 | 0 | 0 |
| Tastaturfehler | 0 | 0 |
| Statusfehler | 0 | 0 |
| `moderate`/`minor` (übrige Regeln) | 0 | 0 |
| Unvollständige Kontrastknoten (nur Sichtprüfung) | 4661 | – |

Je Engine: Chromium 790 Aufrufe/20 Gate, WebKit 100/5. Je Breite jeweils 178 Aufrufe/5 Gate. Je Regel: nur `color-contrast` (25 × `serious`).

**Vorher/nachher:**
- Vorher, Stand 10-01: Die Probe auf 4 Pfaden plus `/impressum` fand außerhalb der Rechtsseiten 0 Befunde. Die Deckkraft-Dimmung 0,5/0,35 war bekannt (D-10), wurde aber nicht im Animationszustand gemessen, weil das Werkzeug erst mit 10-01 entstand.
- Nachher: Animationszustand 0 `color-contrast` auf 22/22 Snippet-Seiten. Die volle Matrix ist außerhalb der Rechtsseiten bei 0/0/0/0.
- Da die Baseline in Paket-(a)-Dateien keinen Befund zeigte, war keine Behebung nötig. Ein Lauf „nach Behebung“ entfällt; die Baseline ist zugleich der Endstand von Paket (a).

Die verify-Prüfung (`jeSeite` ohne `/impressum`, `/datenschutz`, `/agb`) ergab Exit 0 mit „Seiten 158 Aufrufe 890“.

### Unvollständige Kontrastknoten (axe `incomplete`, Sichtprüfung in 10-06/10-12)

Insgesamt 4661 Knoten an 317 verschiedenen Stellen. axe kann dort die Hintergrundfarbe nicht bestimmen, typischerweise wegen gestreckter Link-Flächen (`::after`), Verläufen, Bildern oder Überlagerung. Nach Baustein:

| Baustein | Knoten | Seiten | Hinweis |
|---|---|---|---|
| `StepFlow` (`.node[aria-hidden]`, `.title`) | 1279 | 45 | Ziffernknoten sind `aria-hidden` |
| `DeviceFrame` (Status, Flow, Caption, Tabs `small`, `mobileTitle`) | 935 | 21 | Mini-UI im Rahmen |
| `Badges` `[data-kind="platform"]` (in `FeatureCard`) | 647 | 78 | gestreckter Kartenlink |
| `MediaFigure` `.label` (Kennzeichnung „vereinfacht“) | 519 | 121 | |
| `FeatureCard` `.title` | 353 | 74 | gestreckter Kartenlink |
| `ConnectedScene` `.pill` | 140 | 15 | Szene mit Verlauf |
| `SupplementalScene` | 60 | 4 | |
| Tabellenzeilen `tr:nth-child(n)` (Vergleich/Preise) | ca. 230 | bis 20 | Sticky-Spalte über Scrollbereich |
| `HomeHero`, `Breadcrumbs`, `FunktionenHead`, Szenen-Einzelknoten, sonstige | ca. 500 | je 1–7 | |

Die Rohliste (Pfad, Breite, Engine, Selektor) liegt in `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/10-a/report-vorher.json` (`unvollstaendigStellen`).

## Rote Fälle und Befunde aus fremdem Besitz (Übergabe an (c), 10-03/10-10)

| Seite | Regel | Selektor | Wert | Engine/Breiten | Besitzer |
|---|---|---|---|---|---|
| `/impressum` | `color-contrast` (serious) | `.hover\:underline` | 2,84 : 1 (`#d28a13` auf Weiß, 15 px) | Chromium und WebKit, alle 5 | (c) |
| `/datenschutz` | `color-contrast` (serious) | `.hover\:underline` | 2,84 : 1 | Chromium, alle 5 | (c) |
| `/datenschutz` | `color-contrast` (serious) | `.text-ink-400` | 4,42 : 1 (`#777782` auf Weiß, 14 px) | Chromium, alle 5 | (c) |
| `/agb` | `color-contrast` (serious) | `.text-ink-400` | 4,42 : 1 | Chromium, alle 5 | (c) |
| E2E „Vorlage: Rechtsseite /impressum“ | axe-Gate | `.hover\:underline` | wie oben | `chromium-1440`, alle 5 | rot bis Merge von (c) |

## Übergaben an 10-06 (Integration)

| Nr. | Punkt | Besitzer |
|---|---|---|
| 1 | `testMatch` in `tests/e2e/playwright.config.cjs` um `a11y.pw.cjs` ergänzen (K-9); danach läuft die Spec in der regulären Suite. | 10-06 |
| 2 | Nach dem Merge von (c) „Vorlage: Rechtsseite /impressum“ ohne `--grep-invert` ausführen (muss grün werden); den 404-Fall um die drei Karten `/`, `/hilfe`, `/funktionen` ergänzen (10-PATTERNS). | 10-06 |
| 3 | `docs/DESIGN-V2.md`-Absatz zu D-10 (Dimmstufe per Farbton `#62626E`/`#51515C`/`#BCBCC6`, aktiv `#17171C`/`#F4F4F5`, Übergang über `color`) und zum Fokusalgorithmus (Element plus vier Vorfahren inkl. `::before`/`::after`, K-12). | 10-06 (Datei im Besitz von c) |
| 4 | Volle Matrix im Schlussnachweis als `--shard=k/5` ohne `--engines` fahren. Chromium `--shard=k/4` plus WebKit ohne `--shard` lässt sich nicht zusammenführen („unterschiedliche Teilzahl“). Alternativ `mergeReports` für getrennte Engine-Gruppen erweitern (Paket-a-Werkzeug). | 10-06, 10-12 |
| 5 | Sichtprüfung der `incomplete`-Kontrastknoten (Tabelle oben), Schwerpunkt `Badges` platform in `FeatureCard`, `MediaFigure`-Kennzeichnung und Tabellenzeilen. | 10-06/10-12 |
| 6 | Optional ein npm-Skript `a11y:audit` für `scripts/a11y-audit.mjs` (`package.json` gehört (b)). | 10-06 |
| 7 | Lücke: Für Website-Audits gibt es kein Koordinationsrezept. Die Läufe liefen lokal unter `.heavy-lock`. | Orchestrator |

## Abweichungen vom Plan

### Automatisch behoben

**1. [Regel 3 – blockierend] Shard-Aufteilung der vollen Matrix**
- **Gefunden in:** Aufgabe 3, vor dem Lauf (Codeprüfung von `mergeReports`)
- **Problem:** Der Plan sah Chromium `--shard=k/4` und WebKit ohne `--shard` vor (`report-1-of-1.json`). `mergeReports` lehnt Teilberichte mit unterschiedlichem `n` ab, der Merge wäre gescheitert.
- **Behebung:** Fünf gleich große Teile `--shard=k/5` über beide Engines (Standard-Engines; WebKit nur Vorlagen). Jeder Teil hat 178 Aufrufe und rund 3,6 min Laufzeit, die Sperre wurde zwischen den Teilen freigegeben. Die Abdeckung entspricht genau der geplanten Matrix (790 + 100).
- **Dateien:** keine, nur der Aufruf

**2. Prüffeld im Animationsnachweis**
- Der verify-Befehl liest `r.snippetSeiten`. Das Feld existiert im Merge-Bericht (10-01), deshalb war keine Anpassung nötig. Erwähnt, weil 10-01 nur `snippetPfade` aufführt.

**3. Screenshots in der Sperre von Aufgabe 2 aufgenommen**
- Die Screenshots zu Aufgabe 1 entstanden mit einem Scratchpad-Skript im Serverlauf von Aufgabe 2, um keine zusätzliche Sperre zu belegen. Code und Build waren identisch.

**4. Kein Task-3-Commit**
- Die Baseline fand in Paket-(a)-Dateien (`app/globals.css`, `components/v2/**` ohne Bento/ComparisonTable, `components/layout/**`, `components/feature-snippet/**`, `components/content/**` ohne `ContentKopf`) keinen Befund. `app/globals.css` blieb unverändert, ein leerer Commit wurde nicht erzeugt. Zahlen und Übergaben stehen in diesem SUMMARY.

### Plattformbedingte Fallgestaltung
- Der Sprunglink-Fall wird in WebKit übersprungen. In der Suche prüft WebKit die Fokussierbarkeit des Treffers per `focus()` statt per Tab, weil WebKit unter Windows Links nicht per Tab fokussiert (10-01, gemessen). Chromium deckt beide Fälle vollständig ab.

## Known Stubs

Keine.

## Threat Flags

Keine neue Angriffsfläche (nur CSS-Farbwerte und eine lokale Testdatei).

## Prozesse

Alle Server wurden über die eigene PID gestartet und beendet. Nach jedem Lauf war Port 3101 frei, die eigene Sperre wurde jeweils freigegeben. Am Ende lauscht nichts auf 3101.

## Self-Check: PASSED

- Dateien vorhanden: `craftos/tests/e2e/a11y.pw.cjs`, `craftos/components/feature-snippet/IllustrationScene.module.css`, `ConnectedScene.module.css`, `SupplementalScene.module.css`.
- Commits vorhanden: `f04fcf8`, `89f6313`.
- TDD: RED-Lauf (404-Fall mit 200) fehlgeschlagen, danach GREEN. Spec und Test kamen in einem Commit `test(10-08)`, wie im Plan vorgegeben; es gibt keinen separaten `feat`-Commit, weil die Aufgabe nur eine Testdatei liefert.
