---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
plan: 02
subsystem: produktwahrheit
tags: [produktwahrheit, register, ankuendigungen, route-audit]
requires: []
provides:
  - "productBasis auf origin/release (Web v4.0.0-test.238 / 07cf0645, Mobile mobile-v1.0.0-test.93 / 5610a064)"
  - "Register-Felder liveExtras und notLive, Export mobileLocales (21)"
  - "tests/announcements.test.ts gegen Ankündigungen nicht-live Funktionen"
  - "route-audit Flag announcement"
affects: [05-03, 05-06, 05-08, phase-07]
tech-stack:
  added: []
  patterns:
    - "Belege je Funktion per git cat-file gegen den Release-Commit geprüft (skipIf ohne lokale Repos)"
    - "Preise auf Seiten aus tarife mit Intl.NumberFormat currency EUR abgeleitet"
key-files:
  created:
    - craftos/tests/announcements.test.ts
  modified:
    - craftos/lib/product-register.ts
    - craftos/lib/funktionen.ts
    - craftos/tests/product-register.test.ts
    - craftos/app/funktionen/page.tsx
    - craftos/app/funktionen/[slug]/page.tsx
    - craftos/app/craft-ai/page.tsx
    - craftos/app/fakten-ueber-craftos/page.tsx
    - craftos/app/vergleich/page.tsx
    - craftos/app/vergleich/Comparison.module.css
    - craftos/app/sitemap.ts
    - craftos/lib/comparison.ts
    - craftos/content/hilfe/craft-ai-betriebsdaten-fragen.md
    - craftos/content/hilfe/ki-entwurf-pruefen-uebernehmen.md
    - craftos/scripts/route-audit.mjs
    - craftos/docs/PRODUCT-REGISTER.md
    - craftos/docs/SNIPPET-DESIGN.md
decisions:
  - "Produktregister bezieht sich ausschließlich auf origin/release (Web 07cf0645 / v4.0.0-test.238, Mobile 5610a064 / mobile-v1.0.0-test.93)"
  - "Kundenportal live (D-11); Portalhinweis nennt Überweisung statt deaktivierter Onlinezahlung"
  - "Lager und Arbeitsanweisungen zusätzlich mit Plattform mobile (Lager-Scan, Arbeitsschritte) belegt"
  - "Vorhersagen als liveExtra mit advertised false (Umfang ungeprüft)"
  - "Einzige Ausnahme im Ankündigungstest: lib/product-register.ts (server-only, notLive-Liste)"
metrics:
  duration: "ca. 35 min"
  completed: "2026-10-20"
  tasks: 2
  files: 17
---

# Phase 5 Plan 02: Produktregister auf Release-Basis und Ankündigungen entfernt Summary

Das Produktregister belegt jetzt alle 16 Funktionen und 15 Zusatzfunktionen mit Pfaden am Produktions-Release (Web `07cf0645517b81fa39c8644e3c9c84904f789bc4` / `v4.0.0-test.238`, Mobile `5610a06415361f5c5a01c90258352ed7f49b7bab` / `mobile-v1.0.0-test.93`). Jeder Pfad wird per `git cat-file` geprüft. Das Kundenportal ist live. Telefon-Agent, MCP-Server und Agent-Aktionen sind aus Seiten, Hilfeartikeln, Vergleich und `llms.txt` vollständig entfernt; Test und Routen-Audit verhindern Rückfälle.

## Verwendete Produktstände

| Produkt | Ref | Tag | Commit |
|---|---|---|---|
| Web (`C:/Projekte/craft-connect-buddy`) | `origin/release` | `v4.0.0-test.238` | `07cf0645517b81fa39c8644e3c9c84904f789bc4` |
| Mobile (`C:/Projekte/CraftOS - Mobile/craftos-mobile`) | `origin/release` | `mobile-v1.0.0-test.93` | `5610a06415361f5c5a01c90258352ed7f49b7bab` |

Gelesen wurde lokal per `git rev-parse` und `git describe --tags`, ohne `fetch` und ohne `checkout`. Die Werte stimmen mit der Recherche überein. Die 21 Sprachordner wurden per `git ls-tree` am Mobile-Commit abgeglichen.

## Tasks

| Task | Name | Commits |
|---|---|---|
| 1 | Produktregister auf origin/release, Belege, Kundenportal live | `7b36740` (test), `0672bdb` (feat) |
| 2 | Ankündigungen entfernen und dauerhaft verhindern | `fb4e762` (test), `d0b2645` (feat) |

### Task 1
- `productBasis` hat jetzt die Form `{ checkedAt: "2026-10-20", web|mobile: { ref, tag, commit } }`. Die alten Felder (`branch`, `head`, `includesWorkingTree`, `179cef55…`) sind entfernt.
- Die Belege wurden gemäß RESEARCH Tabelle A ergänzt. Dazu gehören Angebotsunterschrift, GAEB und DATANORM, Mahnwesen, Bankumsätze, Zahlungseingänge, Steuer-Cockpit, Gantt und Bauphasen, Abnahme und Teilabnahme, Mängel und Besichtigung. In der Mobile-App kommen Dashboard, Projekt anlegen, Lager-Scan und Arbeitsschritte hinzu.
- Die neuen Felder `liveExtras` (15 Zeilen aus Tabelle B; `advertised: false` nur bei Vorhersagen) und `notLive` (6 Zeilen aus Tabelle C mit Belegtext) sind angelegt, ebenso der Export `mobileLocales` (21). Das Feld `upcoming` entfällt.
- `lager` und `arbeitsanweisungen` haben jetzt die Plattformen `["web", "mobile"]`. Zugangs- und Hinweistexte nennen die Mobile-Funktion (Barcode-Scan mit Ausgabe, Rücknahme und Bewegung bzw. abhakbare Arbeitsschritte).
- Kundenportal: `upcoming` und der Hinweis „In Prüfung“ wurden entfernt. Die Texte beschreiben jetzt den Live-Ablauf: Einladung per E-Mail aus dem Kundenstamm, Login, Projekte, Angebote, Rechnungen, Termine und Nachrichten. Der Hinweis zur Zahlung lautet „Überweisung auf das Konto vom Rechnungs-PDF“, entsprechend `PortalPaymentNotice.tsx` im Release. Onlinezahlung wird nicht beworben.
- Das optionale Feld `upcoming` wurde aus dem Typ `Definition` entfernt. `tier` ist jetzt immer `"heute"` und `checkedAt` steht auf `2026-10-20`.
- `sitemap.ts` hat die Konstante `pageUpdated`. Den Wert `2026-10-20` tragen nur „“, /funktionen, /craft-ai, /vergleich, /fakten-ueber-craftos, /preise, /app und /gewerke. Alle übrigen Seiten behalten `2026-09-09`.
- In `docs/PRODUCT-REGISTER.md` stehen jetzt die Release-Basis, die 16 Funktionen mit Änderungen, eine Tabelle zu liveExtras und ein Abschnitt zu notLive. Die alten Abschnitte sind als historisch markiert. In `docs/SNIPPET-DESIGN.md` wurde die Lager-Aussage korrigiert.

### Task 2
- Entfernt wurden `upcomingFeatures` und `vision` aus `lib/funktionen.ts` sowie der Abschnitt „Demnächst in CraftOS.“ samt „· In Prüfung“ auf /funktionen. Auf /craft-ai entfielen der Block „In Vorbereitung … Schon demnächst“ und der Satz „Weitere Agent-Aktionen folgen.“ in der Description. Die neue Description hat 137 Zeichen: „Craft AI beantwortet Fragen zu Ihren Betriebsdaten und bereitet Entwürfe vor. Sie prüfen den Inhalt und bestätigen jede Übernahme selbst.“ Auf /fakten-ueber-craftos entfielen „Angekündigte Erweiterungen“, der tote Zweig `launch` und „angekündigte Erweiterungen“ in der Description. Auf /vergleich entfielen das Roadmap-Raster `#ausblick` und der Link aus der Vergleichszelle.
- `lib/comparison.ts`: Die CraftOS-Zelle bei KI-Telefonempfang lautet jetzt `{ text: "Nein" }`. Die Zellen der Wettbewerber sind unverändert.
- In beiden Hilfeartikeln wurde der datierte Satz ersatzlos gestrichen und `updatedAt` auf `2026-10-20` gesetzt.
- Die Faktenseite leitet die Preise aus `tarife` ab (`Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })`). Lizenznamen kommen aus `tarife[].name`, „rund 17 %“ aus `annualSavingPercent`. „Stand“ steht auf 20. Oktober 2026.
- `route-audit.mjs`: Das Flag `announcement` mit dem Muster `/Geplant:|Demnächst in CraftOS|Telefon-Agent|MCP-Server|(September|Oktober|November) 2026 geplant/` greift in beiden Fehlerfiltern.

## Design-Kaskade Lückenschluss

Auftrag: kein Redesign, nur die durch das Entfernen entstandene Lücke schließen. ui-ux-pro-max (`--domain ux`, „section spacing content removal layout“) lieferte als relevante Regeln: Lesebreite begrenzen und keine springenden Layouts. Beide Regeln sind durch die bestehenden Container erfüllt. Die Inspiration von 21st.dev entfällt mit Begründung, weil kein neues Gestaltungselement entsteht.

- **/funktionen:** Entfernt wurde die getönte Sektion `bg-ink-100` „Demnächst in CraftOS.“ (Eyebrow, H2, Zeitangaben-Satz, 3er-Raster). Lückenschluss: Die weiße Funktionssektion mit dem Hinweis zur Voll-Lizenz geht direkt in die dunkle `TrialCta` über. Dadurch bleibt ein klarer Hintergrundwechsel (Weiß → Dunkel), es gibt keine leere Sektion und keinen verwaisten Anker. Die Überschriften-Hierarchie (H1 → H2-Kacheln → H2 Hinweis) hat keinen Sprung.
- **/craft-ai:** Entfernt wurde die getönte Sektion „In Vorbereitung / Mehr Unterstützung. Schon demnächst.“ samt Terminsatz. Lückenschluss: Die weiße Sektion mit dem Prüfhinweis (`notice`) geht direkt in die dunkle `TrialCta` über (Weiß → Dunkel). Die H2-Folge bleibt erhalten. Die Description wurde ohne Ankündigung neu formuliert (137 Zeichen).
- **/vergleich:** Entfernt wurde die weiße Sektion `#ausblick` „Diese Erweiterungen sind angekündigt.“ mit dem Roadmap-Raster. Der Link „Details“ zu `#ausblick` in der Vergleichszelle ist ebenfalls entfernt; die Abschnittsnavigation enthielt `#ausblick` nicht. Lückenschluss: Ohne die Sektion würden die getönte Funktionsvergleich-Sektion und die getönte Quellen-Sektion direkt aufeinander folgen. Deshalb hat `.sourceSection` jetzt einen weißen Hintergrund, die bestehende Oberkante bleibt. So ergibt sich wieder der Wechsel getönt → weiß → dunkel (`TrialCta`). Die verwaisten Stile `.roadmapGrid`, `.roadmapItem` und `.planned` sind entfernt.
- **/fakten-ueber-craftos:** Entfernt wurden die H2 „Angekündigte Erweiterungen“ samt Liste und der Zusatz „· In Prüfung“ in der Liste der Funktionsbereiche. Lückenschluss: Auf das Raster der Funktionsbereiche folgt direkt der bestehende Hinweis `notice mt-10` zu den Grenzen (Onlinezahlung, DATANORM v5, ELSTER) und danach die Standzeile. Abstände bleiben über die vorhandenen `mt-*`-Klassen, und alle Inhalte stehen in einer Sektion, sodass keine leere Sektion entsteht.

## Verification

- `npx vitest run tests/announcements.test.ts tests/product-register.test.ts tests/llms.test.ts tests/content.test.ts`: 23/23 grün. Der Fall „Belege existieren am Release-Commit“ wurde ausgeführt, nicht übersprungen, und prüft über 80 Belege.
- Volle Vitest-Suite: 11 Dateien, 139 Tests grün.
- `npm run typecheck` (Exit 0) und `npm run lint` („No issues found“).
- Lokaler Produktionsbuild (`npm run build`, Exit 0), danach `next start -p 3101` und `AUDIT_ORIGIN=http://127.0.0.1:3101 node scripts/route-audit.mjs`: Exit 0, 125 Routen, 0 Fehler, 0 Routen mit `announcement: true`. Es gab keine kaputten Links, alle unbekannten Pfade lieferten 404 und alle OG-Bilder 200. Der Koordinationsstatus wurde vorher gelesen. Für das Website-Repo gibt es kein Rezept, daher lief alles lokal als einziger schwerer Prozess.
- Akzeptanz-Greps: `origin/release` kommt 3-mal vor, `179cef55` 0-mal. „In Prüfung“, `upcomingFeatures`, `#ausblick`, Preisliterale auf der Faktenseite und „Agent-Aktionen“ in craft-ai und im Hilfeartikel haben keine Treffer. `announcement` kommt 4-mal in route-audit vor, `2026 geplant` 2-mal. In der Sitemap steht `2026-10-20` 8-mal und `2026-09-09` 3-mal.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Skill-Tool für frontend-design nicht verfügbar**
- **Gefunden bei:** Task 2 (Lückenschluss)
- **Problem:** In dieser Executor-Umgebung gibt es kein Skill-Tool, daher konnte `frontend-design` nicht aufgerufen werden.
- **Lösung:** Die Vorgaben des Auftrags (Sektionsfolge, Hintergrundwechsel, Überschriften-Hierarchie, keine leeren Sektionen, keine verwaisten Anker) wurden manuell je Seite geprüft und umgesetzt. Die Gegenprüfung mit ui-ux-pro-max lief wie geplant. Die volle Design-Kaskade folgt ohnehin in 05-04/05-05.

**2. [Rule 1 - Bug] Hintergrundwechsel auf /vergleich nach Entfernen des Ausblicks**
- **Gefunden bei:** Task 2
- **Problem:** Zwei getönte Sektionen (Funktionsvergleich, Quellen) folgten direkt aufeinander.
- **Lösung:** `.sourceSection` hat jetzt einen weißen Hintergrund, die verwaisten Roadmap-Stile sind entfernt.
- **Dateien:** `craftos/app/vergleich/Comparison.module.css` (nicht in files_modified)
- **Commit:** `d0b2645`

**3. [Rule 2 - Korrektheit] Weitere Ankündigungsreste außerhalb der genannten Stellen**
- In der Description der Faktenseite stand „angekündigte Erweiterungen“; das ist jetzt „klar benannte Grenzen“. Die Standzeile der Faktenseite wurde auf 20. Oktober 2026 angehoben, weil sich der Seiteninhalt geändert hat.
- Der Portalhinweis „Onlinezahlungen im Portal sind deaktiviert“ ist jetzt positiv formuliert (Überweisung, wie im Release angezeigt). So nennt die Funktionsseite keine Onlinezahlung mehr (T-05-08).

**4. Requirement-Status:** PROD-02 und PROD-04 sind als erledigt markiert. PROD-03 bleibt offen (Pending), weil dieser Plan nur den Anteil der Faktenseite liefert. Hero, Extra-Speicher, Credits und Schema folgen in 05-03.

Sonst wurde der Plan wie geschrieben umgesetzt. Außerhalb von files_modified wurde nur `Comparison.module.css` geändert.

## Known Stubs

Keine.

## Threat Flags

Keine. Es gibt keine neue Netzwerk-, Auth- oder Dateizugriffsoberfläche. `execFileSync("git", …)` läuft nur im Test, ohne Shell und mit festen Argumenten.

## Self-Check: PASSED

- FOUND: craftos/tests/announcements.test.ts, craftos/lib/product-register.ts, craftos/tests/product-register.test.ts
- FOUND: Commits 7b36740, 0672bdb, fb4e762, d0b2645
