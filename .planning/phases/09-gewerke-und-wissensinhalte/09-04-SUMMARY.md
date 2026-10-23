---
phase: 09-gewerke-und-wissensinhalte
plan: 04
subsystem: content-ratgeber
tags: [inhalt, paket-c, ratgeber, belege, projekte, team, leitlinie-l1, release-delta]

requires:
  - phase: 09-01
    provides: "Inhaltsvertrag answer/faq/scene, Listenobergrenzen, Antwortregel für /blog, L-1-Wortliste"
  - phase: 09-15
    provides: "Eingefrorene Basis Web 6686d05e / Mobile 837aab4f, Delta, scripts/content-pruefen.mjs, Prüfdatei-Format"
provides:
  - "12 Ratgeber (Belege, Projekte, Team) gegen den Release geprüft, korrigiert, answer-first gegliedert, updatedAt 2026-10-23"
  - "Prüfdatei craftos/docs/content-pruefung/09-c.md mit 12 Artikelzeilen, Zitatprüfung, Pflichtquellen, Zitat-Ausnahmen und Übergabeliste"
affects: [09-09, 09-16, 09-06, 09-07, 09-14]

tech-stack:
  added: []
  patterns:
    - "Beispieltexte ohne Bildschirmbezug in ‚…‘ statt „…“, damit die Zitatprüfung nur Bedienbegriffe prüft"
    - "Plattformtabelle für abweichende Web-/Mobile-Begriffe (Pitfall 7)"

key-files:
  created:
    - craftos/docs/content-pruefung/09-c.md
  modified:
    - craftos/content/blog/datev-export-vorbereiten.md
    - craftos/content/blog/eingangsrechnungen-digital-organisieren.md
    - craftos/content/blog/ki-belegscan-pruefen.md
    - craftos/content/blog/offene-posten-liquiditaet.md
    - craftos/content/blog/baustellen-einsatzplanung.md
    - craftos/content/blog/digitale-projektakte.md
    - craftos/content/blog/materialverbrauch-baustelle-zuordnen.md
    - craftos/content/blog/nachkalkulation-handwerk.md
    - craftos/content/blog/digitale-bautagesberichte.md
    - craftos/content/blog/offline-baustellen-app.md
    - craftos/content/blog/projektbezogene-zeiterfassung.md
    - craftos/content/blog/urlaub-abwesenheiten-einsatzplanung.md

key-decisions:
  - "Phase 9 (c): Beispieltexte und Musternotizen stehen in ‚…‘; „Wohnung Lindenstraße“ ist einzige Zitat-Ausnahme (fiktives Musterprojekt)"
  - "Phase 9 (c): baustellen-einsatzplanung verlinkt /hilfe/planung-mitarbeiter-ressourcen nicht mehr (Akzeptanz „Ressourcen“ = 0 erfasst den Slug); Frontmatter-title ohne „Ressourcen“, Map-H1 über Übergabeliste an 09-09"
  - "Phase 9 (c): Pflichtquellen zusätzlich für Zeiterfassung (§ 4 ArbZG) und Urlaub (§ 3 BUrlG), weil beide Artikel jetzt diese Rechtsfakten nennen"

requirements-completed: []

duration: ca. 115 min (inkl. Wartezeit auf die Sperre)
completed: 2026-10-23
---

# Phase 9 Plan 04: Paket (c) Ratgeber 2 Summary

**Zwölf Ratgeber zu Belegen, Projekten und Team gegen Web 6686d05e und Mobile 837aab4f geprüft: Navigation „Buchhaltung → Belege → Eingangsbelege“, Projekt-Reiter wörtlich laut Release, Arbeitsabschnitte statt Phasen, Bankabgleich ohne „automatisch“, Offline und KI positiv nach L-1, Web-Zeitkorrektur mit „Beginn“, „Ende“, „Pause (Minuten)“; jeder Artikel answer-first mit neuem `updatedAt`, Prüfdatei 09-c.md mit Übergabeliste.**

## Performance

- **Duration:** ca. 115 min (davon Wartezeit auf die von 09-03 gehaltene Sperre für `npm ci`)
- **Started:** 2026-10-23T00:12Z
- **Completed:** 2026-10-23T02:10Z
- **Tasks:** 3 von 3
- **Files:** 1 neu, 12 geändert

## Startgate

| Bedingung | Ergebnis |
|---|---|
| `git merge --no-edit main` | „Already up to date“ (Branch frisch von `682d86b`) |
| `docs/content-pruefung/09-basis.md`, `scripts/content-pruefen.mjs` auf HEAD | vorhanden |
| `npm ci --prefer-offline` in `craftos/` unter `.heavy-lock` | Exit 0 |

## Accomplishments

- **Belege (`6f2a425`):** `datev-export-vorbereiten` mit Ablauf „Buchhaltung → Steuerberater“ (Zeitraum, „Ist alles vollständig?“, „Festschreiben (GoBD)“, „Übergabe-Paket herunterladen“), Paketinhalt und DATEV-Einstellungen als positiv formulierte Voraussetzung (Delta `bf08314`/`c4d4945`); `eingangsrechnungen-digital-organisieren` mit „Buchhaltung → Belege → Eingangsbelege“, „Neue Eingangsrechnung“, „Prüfung bestätigen“, Bankumsatz-Abgleich und „Beleg scannen“; `ki-belegscan-pruefen` mit „Sie prüfen den Vorschlag und bestätigen jeden Schritt selbst“, KI auf Anforderung, E-Rechnung ohne KI-Credits, Mobile-Abschnitt; `offene-posten-liquiditaet` mit Bankabgleich (CSV, camt.053, PDF-Kontoauszug, „Zuordnen“, „Zuordnung bestätigen“) und Links `/funktionen/bankabgleich`, `/funktionen/mahnwesen`, Inline `/hilfe/bankumsaetze-abgleichen`. GoBD-Quellen neu abgerufen (HTTP 200) und auf 2026-10-23 datiert.
- **Projekte (`b797ada`):** `digitale-projektakte` (Status war falsch) mit den neun Release-Reitern, „Terminplanung | Arbeitsabschnitte“, Ordner „Besichtigung“, „Nur intern“/„Für Kunde“, „Projekt-Chat“; `baustellen-einsatzplanung` mit Reiter „Terminplanung“, „Abschnitt anlegen“, „Aus Angebot vorschlagen“, „Einplanen“, „Geräte & Fahrzeuge“, „Ohne Kartenposition“; `materialverbrauch-baustelle-zuordnen` mit „Warenausgang“ (Kunde, Auftrag / Projekt), „Rückbuchung vom Auftrag“ mit „Ursprüngliche Materialentnahme“ und Lager-App („Barcode scannen“, „Ausgabe, Rücknahme oder Bewegung“); `nachkalkulation-handwerk` mit Reiter „Kalkulation“ (Finanzfreigabe) und Plan-Ist-Schritten.
- **Team (`d98e042`):** `digitale-bautagesberichte` mit Berichtsarten-Tabelle Web/Mobile (Bautagesbericht/Tagesbericht, Regiebericht/Stundenbericht, Bedenkenanzeige, Bericht aus Vorlage), Teil-, End- und Schlussabnahme; `offline-baustellen-app` ohne Negativsatz, mit vorgemerkten Eintragsarten und Statustexten der App; `projektbezogene-zeiterfassung` mit Web-Korrektur „Zeiteintrag bearbeiten“ („Beginn“, „Ende“, „Pause (Minuten)“, Release `a9319e5`), Tab „Zeiten“, „Mobil-Teamleitung“/„Teamzeiten im Projekt“, Korrektur nach Storno; `urlaub-abwesenheiten-einsatzplanung` mit Antragsweg in der App und Entscheidung über „Verwalten“ → „Urlaubsanträge“.
- **Prüfdatei `09-c.md`:** 12 Zeilen `| blog/<slug> |` mit Status, Commit, Änderungen und Belegpfaden (Web/Mobile), Zitatprüfung je Aufgabe, Pflichtquellen (vier Artikel), Zitat-Ausnahme „Wohnung Lindenstraße“, Übergabeliste (8 Punkte).

## Task Commits

1. **Aufgabe 1: Belege** – `6f2a425` `feat(09-04): Belege-Ratgeber gegen Release geprüft und answer-first gegliedert`
2. **Aufgabe 2: Projekte** – `b797ada` `feat(09-04): Projekt-Ratgeber mit Release-Reitern und Arbeitsabschnitten`
3. **Aufgabe 3: Team, Prüfdatei, Paketende** – `d98e042` `feat(09-04): Team-Ratgeber positiv nach L-1, Zeitkorrektur im Web, Prüfdatei abgeschlossen`

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `content-pruefen.mjs --ausnahmen docs/content-pruefung/09-c.md --zitate --l1 --antwort` je Aufgabe (4/4/4) und Paketende (12) | jeweils 0 Befunde, 0 Hinweise, Exit 0 (Ausgangslage: 20 Befunde, 12 Hinweise) |
| `npx vitest run tests/content-produktwahrheit.test.ts` (ohne Sperre, nach jeder Aufgabe) | 10 von 10 grün |
| `npx vitest run tests/content.test.ts` (unter `.heavy-lock`, nach jeder Aufgabe) | 34 von 34 grün (3 Läufe) |
| `npm run typecheck`, `npm run lint` (nach jeder Aufgabe) | 0 Fehler |
| Paketende unter Sperre: `npm run build` | Exit 0 |
| Paketende unter Sperre: `seo-audit.mjs --paths=<12 Pfade>` (alle Regeln) | 12 von 136 Sitemap-URLs, 0 Verstöße in allen 12 Regeln (title, description, h1, keyword, map, breadcrumbs, og, faq-schema, schema, antwort, duplikate, prompts) |
| Akzeptanz-Greps | `answer:` in 12 von 12; „Buchhaltung → Belege“ 3; „kein autonomes Verbuchen“/„nicht autonom“ 0; „Arbeitsabschnitte“ 2 bzw. 4; „\| Planung \| Phasen“ 0; „Ressourcen“ in baustellen-einsatzplanung 0; „verspricht“/„pauschale Offline“ 0; „Pause (Minuten)“ 2; 12 Zeilen `| blog/` in 09-c.md |

**Durchsicht „automatisch“ (Akzeptanz Aufgabe 1):** `offene-posten-liquiditaet.md` enthält das Wort nicht; der Bankabgleich ist durchgehend als Import plus selbst bestätigte Zuordnung beschrieben, KI-Hilfen („PDF mit KI auslesen“, „KI-Vorschläge laden“) als „auf Anforderung“. Im ganzen Paket steht „automatisch“ nur in `projektbezogene-zeiterfassung` für die Release-Funktion „Automatische Projektzuordnung“ des mobilen Timers (Mobile `settings.json` `geo.title`), nicht für Bankabgleich oder KI.

## Decisions Made

- Beispieltexte ohne Bildschirmbezug (Notizen, Wertungen, Dateinamen) stehen in einfachen Anführungszeichen ‚…‘; „…“ bleibt Bedienbegriffen vorbehalten. Einzige Zitat-Ausnahme ist das fiktive Musterprojekt „Wohnung Lindenstraße“.
- Die frühere Einleitung jedes Artikels ist im Frontmatter `answer` aufgegangen (Pattern 1); kein Lead-Absatz vor der ersten H2.
- „So unterstützt CraftOS“ als letzte H2 ohne Fragezeichen in allen zwölf Artikeln; Quellen nur über Frontmatter `sources`; keine FAQ und keine Szene ergänzt (beides optional).
- Pflichtquellen über den Plan hinaus: Die Zeiterfassung nennt jetzt § 4 ArbZG (Ruhepausen) und der Urlaubsartikel § 3 BUrlG (Mindesturlaub); beide Normen wurden am 23.10.2026 auf gesetze-im-internet.de gelesen und als Quelle mit `checkedAt` 2026-10-23 eingetragen.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Akzeptanzkonflikt] Link auf `/hilfe/planung-mitarbeiter-ressourcen` entfernt**
- **Found during:** Aufgabe 2
- **Issue:** Die Akzeptanz `grep -ci "Ressourcen" baustellen-einsatzplanung.md = 0` erfasst auch den Slug des bestehenden Hilfeartikels (Frontmatter und Inline-Link) sowie den Frontmatter-`title` „Baustellen und Ressourcen planen …“.
- **Fix:** `title` sachlich auf „Baustellen und Einsätze planen: …“ korrigiert (D-12: Produktbegriff ist „Geräte & Fahrzeuge“), Link durch `/hilfe/projekt-phasen-anlegen` und `/blog/urlaub-abwesenheiten-einsatzplanung` ersetzt; Map-H1 und eine mögliche Wiederverlinkung stehen in der Übergabeliste an 09-09.
- **Files modified:** `craftos/content/blog/baustellen-einsatzplanung.md`
- **Commit:** `b797ada`

**2. [Rule 2 – L-1] Frontmatter-`description` zweier Artikel positiv**
- **Found during:** Aufgaben 1 und 3
- **Issue:** `ki-belegscan-pruefen` sprach von „automatisch erkannten Rechnungsdaten“ (KI nur „auf Anforderung“), `offline-baustellen-app` von „Welche Grenzen eine Baustellen-App ohne Verbindung hat“.
- **Fix:** „KI-erkannte Rechnungsdaten“ bzw. „Wie Sie eine Baustellen-App ohne Verbindung nutzen …“. Die Map-Descriptions beider Pfade enthalten diese Formulierungen nicht (geprüft), daher keine Übergabe nötig.
- **Commits:** `6f2a425`, `d98e042`

**3. [Rule 2 – Prüfdatei-Format] Pflichtquellen-Tabelle ohne führendes `| blog/`**
- **Found during:** Aufgabe 3
- **Issue:** Die Akzeptanz zählt Zeilen `| blog/…|`; die Pflichtquellen-Tabelle hätte die Zahl auf 16 erhöht.
- **Fix:** Erste Spalte dort als Code (`` `blog/<slug>` ``); genau 12 Artikelzeilen.
- **Commit:** `d98e042`

**Total deviations:** 3 Auto-Fixes. **Impact:** keine Regel abgeschwächt; kein Slug, keine URL und kein Artikel entfallen.

## Deferred Issues

Keine im eigenen Umfang. Offene Punkte anderer Besitzer stehen in der Übergabeliste von `docs/content-pruefung/09-c.md` (Keyword-Map-H1 `/blog/baustellen-einsatzplanung`, `relatedArticles` auf die neuen Hilfeartikel aus Paket f, Abstimmung der Zeitkorrektur mit 09-06).

## Known Stubs

Keine. Inline-Links auf `/hilfe/bankumsaetze-abgleichen`, `/hilfe/lager-scan-app`, `/hilfe/regiebericht`, `/hilfe/bedenkenanzeige`, `/hilfe/besichtigung-durchfuehren` und `/hilfe/projekt-chat-nachrichten` zielen auf die in 09-03 `<interfaces>` freigegebenen neuen Slugs (Paket f); Linkcheck in 09-16.

## Threat Flags

Keine neue Angriffsfläche. T-09-15: Offline-, KI- und Bankabgleich-Aussagen nur positiv mit Release-Beleg (Prüfskript 0 Befunde, Belegpfade in 09-c.md). T-09-16: keine Roh-HTML-Blöcke, keine Bilder; Sanitizing aus 09-01 unverändert.

## Next Phase Readiness

- Branch `phase09-spur-c` bereit zum Merge durch den Orchestrator; kein Merge nach `main`, kein Push.
- STATE.md und ROADMAP.md nicht geändert (Worktree-Regel); `requirements-completed: []`, kein `requirements.mark-complete`.
- Sperre `C:/Projekte/Websitenerstellung/.heavy-lock` freigegeben; Port 3104 nicht benutzt, kein Server und kein Hintergrundprozess aktiv.

## Self-Check: PASSED

Dateien `craftos/docs/content-pruefung/09-c.md` und die zwölf Artikel vorhanden; Commits `6f2a425`, `b797ada`, `d98e042` im Branch `phase09-spur-c`.
