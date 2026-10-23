---
phase: 10-abschlussaudit
verified: 2026-10-23T17:40:00Z
status: human_needed
score: 11/11 must-haves verified (1 davon über Override D-44)
overrides_applied: 1
overrides:
  - must_have: "Lighthouse mobil (Labordaten) erreicht auf Startseite, Funktions-, Gewerke-, Vergleichs- und Ratgeber-Vorlage Performance ≥ 95 und LCP < 2,5 s"
    reason: "Inhaberentscheidung D-44 (10-CONTEXT.md): QA-04 wird ausschließlich an Vercel-Speed-Insights-Felddaten (p75 LCP < 2.500 ms, INP < 200 ms, CLS < 0,1) gemessen; Lighthouse-Labordaten sind nur nicht blockierende Regressionsinformation. REQUIREMENTS.md QA-04 ist entsprechend neu gefasst."
    accepted_by: "Inhaber (D-44)"
    accepted_at: "2026-10-23T00:00:00Z"
human_verification:
  - test: "24-Stunden-Fenster der Etappe 10 für trial_click/ai_visit nach dem 24.10.2026, 16:29 UTC abfragen und in ETAPPEN-NACHWEIS-V2.md nachtragen"
    expected: "Zeile 10 der Analytics-Tabelle mit vollständigem Fenster; trial_click ≥ 0 dokumentiert, ai_visit-Verdrahtung unverändert"
    why_human: "Das Fenster ist zum Prüfzeitpunkt (23.10.2026, 17:35 UTC) noch nicht abgelaufen; der Nachtrag ist ausdrücklich dem Orchestrator zugewiesen"
  - test: "Inhaber prüft die neu gefassten Rechtstexte (/datenschutz Hosting und Datenstandort, /agb und /datenschutz mit „Stand: 23. Oktober 2026“) und die Aussage „CraftOS ist GoBD-konform“ rechtlich"
    expected: "Freigabe oder Korrektur; insbesondere „Dateien speichern wir in europäischen Rechenzentren“ bei R2 mit Standorthinweis EEUR/WEUR, aber Jurisdiktion „default“ (Inhaberpunkt 5 in PHASE-10-ROLLOUT.md § 13)"
    why_human: "Rechtliche Bewertung (DSGVO, UWG) ist nicht programmatisch prüfbar; die Website-Texte sind im Code konsistent belegt"
  - test: "Sichtprüfung des neuen Abschnitts „Mehr über CraftOS“ unter dem Rechtstext von /impressum, /datenschutz und /agb bei 390 und 1440 px"
    expected: "Drei LinkKarten (Funktionen, Preise und Lizenzen, Kontakt und Support) sauber unter dem Rechtstext, ohne Überlauf, Fokusring sichtbar"
    why_human: "Der Hotfix f9cd7f2 kam nach der vollen A11y-Matrix und dem visual-audit; belegt sind nur gezielte a11y-audit-Läufe (30 Aufrufe, 0 Befunde), keine visuelle Sichtung"
---

# Phase 10: Abschlussaudit – Verifikationsbericht

**Phasenziel:** Alle Seiten sind barrierefrei und schnell, und ein erneuter Audit von craftos.eu zeigt keine offenen technischen oder On-Page-Fehler.
**Geprüft:** 23.10.2026, 17:15–17:40 UTC, gegen `main` = `origin/main` = `df6c13a` und live https://craftos.eu
**Status:** human_needed
**Re-Verifikation:** Nein, Erstprüfung

## Ergebnis in einem Satz

Das Phasenziel ist im Code und live erreicht. Die Nachträge D-41 bis D-44 sind live und stimmen mit den Belegen überein, und auf allen 156 Sitemap-Seiten samt `llms.txt` steht keine verbotene Formulierung. Offen sind drei Prüfungen durch Menschen und mehrere veraltete Statuszeilen in Begleitdokumenten. Diese Statuszeilen sind Warnungen und blockieren nicht.

## Zielerreichung

### Beobachtbare Wahrheiten

| # | Wahrheit | Status | Beleg (selbst geprüft) |
|---|---|---|---|
| 1 | SC 1: Jede Seite besteht bei 360/390/768/1024/1440 px die A11y-Prüfung (DESIGN-05) | ✓ VERIFIED | `PHASE-10-PRUEFUNGEN.md` § 5.2: 158 Seiten, 890 Aufrufe, Gate/Großtext/Tastatur/Status 0. Rohdaten `2026-10-23-lighthouse-live-phase10.json`: Accessibility 100 auf allen 15 Live-URLs. Spätere Änderungen an den Rechtsseiten (`19dd8ed`, `f9cd7f2`) sind durch gezielte `a11y-audit`-Läufe mit 0 Befunden belegt. |
| 2 | SC 2: Ladezeit (QA-04) und angepasste Prüfsuiten grün | ✓ PASSED (Override D-44) | Eigene Abfrage der Vercel-Speed-Insights-Felddaten (Produktion, 30 Tage, 17:34 UTC): **p75 LCP 532 ms (n = 66), INP 40 ms, CLS 0**. Damit liegen alle drei Werte unter den Schwellen. Die Labordaten verfehlen das alte Kriterium knapp (live `/funktionen` LCP 2.569 ms). Nach D-44 sind sie nur noch Regressionsinformation. Elf gezielte Vitest-Dateien grün (siehe Stichproben). |
| 3 | SC 3: Etappen 05–10 einzeln live, IndexNow, Live-Prüfung, `trial_click`/`ai_visit` kontrolliert (QA-05) | ✓ VERIFIED | `ETAPPEN-NACHWEIS-V2.md`: Zeilen 05–10 vorhanden, `etappen-nachweis.test.ts` 5/5 grün. Für Etappe 10 ist ein Teilfenster abgefragt (16:51 UTC). Der 24-h-Nachtrag folgt (human_needed 1). |
| 4 | SC 4 / QA-06: erneuter Audit ohne offene technische oder On-Page-Fehler, Abschlussbericht mit Vergleich zum 20.10.2026 | ✓ VERIFIED | Das Bestätigungsaudit ließ nur O2/O3 offen (`/impressum`). Live geprüft: `<main>` von `/impressum`, `/datenschutz` und `/agb` enthält je die Links `/`, `/funktionen`, `/preise` und `/support`. Damit sind O2 und O3 geschlossen. `MEILENSTEIN-V2-ABSCHLUSS.md` vergleicht Positionen, KI-Share-of-Voice und verweisende Domains. Einschränkung: Nach dem Hotfix lief kein vollständiger neuer `/audit`. Belegt ist nur der SE-Ranking-Recheck 485185 mit 0 Fehlern; seine Rohdatei ist nicht abgelegt (Warnung). |
| 5 | D-41: Einrichtung kostenlos, live an allen Zielorten | ✓ VERIFIED | Live: `/preise` (FAQ und „Einrichtung und Datenübernahme kostenlos.“), `/fakten-ueber-craftos`, `/vergleich`, `/vergleich/handwerkersoftware-kleine-betriebe`, alle vier `*-alternative`, `/funktionen/datenuebernahme`, `/hilfe/daten-importieren` und `/llms.txt`. Keine messbare Zusage wie „rund um die Uhr“, „24/7“ oder Reaktionszeit. Quelle `lib/einrichtung.ts`, `einrichtung.test.ts` 7/7. |
| 6 | Datenstandort ohne Übertreibung | ✓ VERIFIED | Live auf `/preise`, `/fakten-ueber-craftos`, `/datenschutz` und `/llms.txt` wortgleich mit `lib/datenstandort.ts`: „Datenbank in Frankfurt am Main, Dateien … in europäischen Rechenzentren“. Auf allen 157 geprüften Live-URLs fehlen „Server in der EU“, „Server in Deutschland“, „deutsche Server“ und „ausschließlich in der EU“. Der frühere Satz „Personenbezogene Daten werden auf Servern in der EU gespeichert“ ist mit `476c1a0` entfernt. `datenstandort.test.ts` 5/5. |
| 7 | D-43: „CraftOS ist GoBD-konform“ ohne Zertifizierungsbehauptung | ✓ VERIFIED | Live auf `/` (FAQ), `/gobd`, `/fakten-ueber-craftos`, `/llms.txt` sowie in Hilfe- und Blogartikeln. Die Antwort auf `/gobd` beginnt mit „Eine amtliche GoBD-Zertifizierung gibt es nicht. CraftOS ist GoBD-konform aufgebaut: …“, ohne „Nein.“. Auf allen 157 URLs fehlen „unterstützt GoBD-konforme/-gerechte“, „organisiert Ihr Betrieb“ und „GoBD-Unterstützung“. Eine Behauptung wie „CraftOS ist … zertifiziert“, „GoBD-geprüft“ oder „testiert“ kommt nicht vor. `gobd-aussage.test.ts` 156/156. |
| 8 | D-42: Impressum ohne OS-Plattform, VSBG-Satz bleibt, Title verlängert | ✓ VERIFIED | Live `/impressum`: kein „OS-Plattform“, kein `consumers/odr`, keine „Online-Streitbeilegung“. Der VSBG-Satz „Wir sind nicht bereit oder verpflichtet, … teilzunehmen.“ steht noch da. Title: „Impressum – CraftOS Handwerkersoftware“. `rechtstexte-wortlaut.test.ts` 11/11. |
| 9 | AGB und Datenschutz ohne Vorlagenhinweis | ✓ VERIFIED | Code: `LegalHinweis` mit dem Vorlagentext ist in `app/agb/page.tsx` (`19dd8ed`) und `app/datenschutz/page.tsx` (`476c1a0`) entfernt und durch `<p>Stand: 23. Oktober 2026</p>` ersetzt. Live steht „Stand: 23. Oktober 2026“ auf beiden Seiten, ein Vorlagen- oder Mustertext auf keiner der 157 URLs. Der verbliebene `LegalHinweis` auf `/impressum` ist die Angabe „Einzelunternehmer · CraftOS“ und kein Vorlagenhinweis. |
| 10 | Inhaberregel „nur Unterstütztes nennen“ auf den geänderten Seiten | ✓ VERIFIED | Live-Suche auf allen 156 Sitemap-URLs und `llms.txt` nach Negativlisten („wird nicht unterstützt“, „unterstützt CraftOS nicht“, „kein DATANORM/GAEB“): 0 Treffer. Die neuen LinkKarten-Texte auf den Rechtsseiten nennen nur vorhandene Funktionen, Lizenzen und Supportwege. `nur-unterstuetzt.test.ts` 292/292 mit der neuen Regel `ZERTIFIKATSBEHAUPTUNG`. |
| 11 | Anforderungsstatus ehrlich (REQUIREMENTS.md) | ✓ VERIFIED | DESIGN-02, DESIGN-05, QA-04, QA-05 und QA-06 sind `[x]` und „Complete“, jeweils mit Beleg in der Traceability. **SEO-08 bleibt `[ ]` „In Progress“ mit 0 von 15** (12 verweisende Domains, alle Spam). Das deckt sich mit `MEILENSTEIN-V2-ABSCHLUSS.md` § 3 und PHASE-10-ROLLOUT § 9/§ 11. Begleitdokumente sind teilweise veraltet (siehe Warnungen). |

**Score:** 11/11, davon eine Wahrheit über den Override D-44.

### Erforderliche Artefakte

| Artefakt | Erwartung | Status | Details |
|---|---|---|---|
| `craftos/lib/einrichtung.ts` | Zentrale Quelle D-41 | ✓ VERIFIED | Eingebunden in preise, fakten, vergleich, kleine-betriebe, alternativen, team, llms. Live gerendert |
| `craftos/lib/datenstandort.ts` | Zentrale Quelle Datenstandort | ✓ VERIFIED | Kopfkommentar mit Belegen, live auf 3 Seiten und in `llms.txt`. Die Datenschutzerklärung nutzt denselben Wortlaut |
| `craftos/lib/gobd-konform.ts` | Zentrale Quelle D-43 | ✓ VERIFIED | Live auf `/`, `/gobd`, `/fakten-ueber-craftos` und in `llms.txt` |
| `craftos/app/impressum/page.tsx` | Ohne OS-Plattform, VSBG wörtlich | ✓ VERIFIED | Z. 70–74 |
| `craftos/app/agb/page.tsx`, `app/datenschutz/page.tsx` | Ohne Vorlagenhinweis, mit Stand | ✓ VERIFIED | Z. 89 bzw. Z. 114 |
| `craftos/components/legal/Legal.tsx` (LinkKarten) | QA-06 O2/O3 | ✓ VERIFIED | Live je 4 interne Links im `<main>`, `rechtsseiten-links.test.ts` 3/3 |
| `craftos/lib/nur-unterstuetzt.ts` | Ohne `erlaubt`-Ausnahme, Zertifikatsprüfung | ✓ VERIFIED | Test 292/292 |
| `craftos/docs/releases/PHASE-10-ROLLOUT.md`, `PHASE-10-PRUEFUNGEN.md`, `ETAPPEN-NACHWEIS-V2.md`, `MEILENSTEIN-V2-ABSCHLUSS.md` | Nachweise | ✓ VERIFIED (mit Warnungen) | Siehe Warnungen zur Statusgleichheit |

### Verdrahtung (Key Links)

| Von | Nach | Weg | Status |
|---|---|---|---|
| `lib/einrichtung.ts` | `/preise`, `/fakten-ueber-craftos`, `/vergleich*`, `/funktionen/datenuebernahme`, `llms.txt` | Import in den Seitenmodulen | ✓ WIRED, Wortlaut live |
| `lib/datenstandort.ts` | `/preise`, `/fakten-ueber-craftos`, `llms.txt` | Import | ✓ WIRED |
| `lib/gobd-konform.ts` | `/gobd`, `/fakten-ueber-craftos`, Startseiten-FAQ, `llms.txt` | Import | ✓ WIRED, auch im FAQPage-JSON-LD |
| `LegalShell` | `/impressum`, `/datenschutz`, `/agb` | gemeinsamer Abschnitt „Mehr über CraftOS“ | ✓ WIRED |
| Mega-Menü und `/funktionen` | Kassenbuch und Rechnung nach § 13b (D-21, D-40) | Links auf `/funktionen/buchhaltung` und `/funktionen/rechnungen` | ✓ WIRED, live auf `/` und `/funktionen` |

### Datenfluss (Level 4)

| Artefakt | Daten | Quelle | Echte Daten | Status |
|---|---|---|---|---|
| QA-04-Felddaten | p75 LCP, INP, CLS | Vercel Speed Insights Produktion | 532 ms, 40 ms, 0 (n LCP = 66), selbst abgefragt | ✓ FLOWING |
| FAQ und `llms.txt` | Einrichtung, Datenstandort, GoBD | statische Konstanten | belegte Inhaberangaben bzw. Produktcode-Belege | ✓ FLOWING (statischer Inhalt, so beabsichtigt) |

### Stichproben (Verhalten)

| Verhalten | Befehl | Ergebnis | Status |
|---|---|---|---|
| Gezielte Vitest-Dateien | `npx vitest run` mit einrichtung, datenstandort, gobd-aussage, rechtsseiten-links, rechtstexte-wortlaut, nur-unterstuetzt, etappen-nachweis, backlink-plan, llms, sitemap-phase10, phase10-darstellung | 11 Dateien, 508/508 grün | ✓ PASS |
| Phrasenprüfung über alle Live-Seiten | Node-Skript über `sitemap.xml` (156 URLs) und `/llms.txt` | 157 × HTTP 200, 0 Treffer bei sieben Verbotsmustern | ✓ PASS |
| Kernaussagen live | Node-Skript über 17 Zielseiten | alle Sollsätze an allen Zielorten vorhanden | ✓ PASS |
| Interne Links der Rechtsseiten | `curl` und Auswertung von `<main>` | `/`, `/funktionen`, `/preise`, `/support` auf allen drei Seiten | ✓ PASS |
| Felddaten QA-04 | `npx vercel@65.2.0 metrics vercel.speed_insights.* --aggregation p75 … --since 30d` | LCP 532 ms, INP 40 ms, CLS 0 | ✓ PASS |
| 404 | `curl` auf einen unbekannten Pfad | 404, `noindex`, kein Canonical | ✓ PASS |
| Repo-Stand | `git status -sb` | `main...origin/main`, nur `.planning/config.json` geändert | ✓ PASS |

Bewusst nicht ausgeführt (Auftrag: keine schweren Läufe): Build, E2E, A11y-Matrix, Lighthouse, `/audit` und ein SE-Ranking-Recheck (kostet Units).

### Probe-Ausführung

Übersprungen. Die Phase deklariert keine `scripts/*/tests/probe-*.sh`.

### Anforderungsabdeckung

| Anforderung | Beschreibung (kurz) | Status | Beleg |
|---|---|---|---|
| DESIGN-02 (Rest) | Rechner, Support, Rechtsseiten und 404 auf v2 | ✓ SATISFIED | Live 200, ContentKopf, 404 mit `noindex` und ohne Canonical, `phase10-darstellung.test.ts` 5/5 |
| DESIGN-05 | A11y bei 5 Breiten | ✓ SATISFIED | Matrix 0, Lighthouse-A11y 100 live |
| QA-04 (D-44) | Felddaten p75 unter den Schwellen | ✓ SATISFIED | Eigene Abfrage 532/40/0. Die Stichprobe liegt unter 100 Messungen; nach D-44 ist das eine genannte Grenze, kein Blocker |
| QA-05 | Etappen einzeln live mit Kontrolle | ✓ SATISFIED | Etappennachweis 05–10. Der 24-h-Nachtrag für Etappe 10 steht aus |
| QA-06 | Erneuter Audit ohne offene Fehler | ✓ SATISFIED | O2/O3 live geschlossen. Die übrigen Fehler waren schon im Bestätigungsaudit geschlossen. Der Recheck mit 0 Fehlern ist nur in der Prosa belegt |
| SEO-08 | ≥ 15 neue seriöse Domains | IN PROGRESS (ehrlich ausgewiesen) | Messstand 0 von 15. In dieser Phase nur Messung, kein Abschlusskriterium von Phase 10 |

Verwaiste Anforderungen: keine.

### Anti-Patterns

| Datei | Zeile | Muster | Schwere | Wirkung |
|---|---|---|---|---|
| 64 in der Phase geänderte Code- und Inhaltsdateien unter `craftos/app`, `components`, `lib`, `scripts`, `content` | – | TBD/FIXME/XXX/TODO/HACK/Platzhalter | – | 0 Treffer |
| `.planning/ROADMAP.md` | Phase 10, Absatz „Stand nach dem Rollout“ | veraltet: „Kriterium 4 teilweise … 2 behebbare On-Page-Fehler auf `/impressum`“ | ⚠️ Warnung | widerspricht REQUIREMENTS (QA-06 Complete) |
| `.planning/STATE.md` | Z. 24, 34, 133 | „QA-06 bleibt In Progress“, „offen: Lückenschluss QA-06“ | ⚠️ Warnung | veralteter Projektstatus |
| `craftos/docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md` | Z. 30, 130, 163, 203 | QA-06 „In Progress“, 2 behebbare Fehler | ⚠️ Warnung | Abschlussbericht ohne Hotfix-Nachtrag |
| `craftos/audit-report.md` | Z. 259–261 | „QA-06 ist damit nicht erfüllt“, kein Nachtrag | ⚠️ Warnung | Audit-Dokument ohne Bestätigung nach dem Hotfix |
| `craftos/docs/releases/PHASE-10-ROLLOUT.md` | § 11 Z. 220; § 13 Punkt 5 | Satz „QA-06 und SEO-08 bleiben In Progress“ mit nachgestelltem Nachtrag; Verweis auf den Satz „Server in der EU“, den es nicht mehr gibt | ℹ️ Info | missverständlich, inhaltlich korrigiert |
| `craftos/docs/seo/data/` | – | keine Rohdatei für den Recheck 485185 um 17:26 UTC (nach dem Hotfix) | ⚠️ Warnung | Beleg nur in der Prosa, anders als beim Recheck um 16:37 |
| `.planning/ROADMAP.md` | Phase 10, SC 2 | Wortlaut fordert weiter Lighthouse ≥ 95 und Lab-LCP < 2,5 s | ℹ️ Info | durch D-44 ersetzt; Override in diesem Bericht |

Keine Blocker.

### Durch Menschen zu prüfen

#### 1. 24-Stunden-Analytics der Etappe 10

**Test:** Nach dem 24.10.2026, 16:29 UTC `trial_click`, `ai_visit` und `login_click` für das volle Fenster abfragen und in `ETAPPEN-NACHWEIS-V2.md` nachtragen.
**Erwartet:** Die Zeile für Etappe 10 ist vollständig, wie bei den Etappen 05–09.
**Warum ein Mensch:** Das Fenster ist noch nicht abgelaufen. Der Nachtrag ist dem Orchestrator zugewiesen.

#### 2. Rechtliche Freigabe der neuen Texte

**Test:** Der Inhaber prüft auf `/datenschutz` den Abschnitt Hosting (Vercel, DPF) und den Satz zum Datenstandort, dazu „Stand: 23. Oktober 2026“ auf `/agb` und `/datenschutz` und die Aussage „CraftOS ist GoBD-konform“.
**Erwartet:** Freigabe. Für „europäische Rechenzentren“ gilt die offene R2-Jurisdiktion als Inhaberpunkt (ROLLOUT § 13 Nr. 5).
**Warum ein Mensch:** Die rechtliche Bewertung nach DSGVO und UWG lässt sich nicht automatisch prüfen.

#### 3. Sichtprüfung der Link-Karten auf den Rechtsseiten

**Test:** `/impressum`, `/datenschutz` und `/agb` bei 390 und 1440 px ansehen.
**Erwartet:** Der Abschnitt „Mehr über CraftOS“ mit drei Karten unter dem Rechtstext, ohne Überlauf, mit sichtbarem Fokus.
**Warum ein Mensch:** Der Hotfix kam nach visual-audit und Matrix; für ihn gibt es nur gezielte axe-Läufe.

### Zusammenfassung

Das Ziel ist erreicht. Barrierefreiheit (Matrix 0, A11y 100 live), Ladezeit an den Felddaten nach D-44 (heute erneut abgefragt: p75 LCP 532 ms, INP 40 ms, CLS 0) und der Audit-Lückenschluss QA-06 (live geschlossen) sind belegt. Die Inhabernachträge D-41 bis D-44 sind live, kommen aus zentralen Quellen und sind durch Tests abgesichert. Eine Prüfung aller 157 Live-URLs fand keine übertriebene Standortaussage, keine Zertifizierungsbehauptung, keinen OS-Plattform-Hinweis, keinen Vorlagenhinweis und keine Negativliste. SEO-08 steht ehrlich auf „In Progress“ mit 0 von 15.

Nicht blockierend, aber nachzuziehen (ein Doku-Commit): ROADMAP-Absatz „Stand nach dem Rollout“, STATE.md, MEILENSTEIN-V2-ABSCHLUSS.md und audit-report.md auf QA-06 erledigt bringen (Hotfix `f9cd7f2`, Recheck 485185 mit 0 Fehlern). Die Rohdaten des zweiten Rechecks gehören zusätzlich unter `docs/seo/data/`.

---

_Geprüft: 2026-10-23T17:40:00Z_
_Prüfer: Claude (gsd-verifier)_
