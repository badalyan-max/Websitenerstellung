# Phase 9: Gewerke und Wissensinhalte – Context

**Gathered:** 2026-10-22
**Status:** Ready for planning (nach 09-UI-SPEC; Ausführung erst nach dem Phase-8-Rollout 08-14)
**Quelle der Entscheidungen:** Inhaberfreigaben „mach einfach bis du sie alle fertig hast“ (21.10.2026) und „Mach, wie du es richtig findest“; Inhaberrahmen vom 20.10.2026 (keine detailgetreuen Screenshots, keine Demo-Organisation, keine Videos); Wunsch des Inhabers nach mehreren gleichzeitig arbeitenden Agenten. Die Entscheidungen 1–10 des Orchestrators sind gesetzt und hier als D-xx übernommen und mit dem Codebefund präzisiert. `craftos/docs/entwuerfe/datenschutz-webanalyse.md` bleibt ausgenommen (Rechtstext, eigene Inhaberfreigabe); die übrigen Entwürfe dort sind in Phase 8 verbraucht und für Phase 9 ohne Belang.

<domain>
## Phase Boundary

- **FEAT-04:** Die 12 Gewerke-Seiten `/gewerke/{elektriker, shk, maler, tischler-schreiner, dachdecker, fliesenleger, zimmerer, galabau, trockenbau, metallbau, bauunternehmen, allrounder}` zeigen einen gewerktypischen Ablauf als visuelle Schrittfolge mit Szene und verlinken auf die passenden Funktionsdetailseiten (inkl. der Phase-7-Seiten, D-19 aus Phase 8). Dazu die Übersicht `/gewerke` auf v2.
- **CONTENT-03:** Alle 24 Ratgeber (`craftos/content/blog/*.md`) und 40 Hilfeartikel (`craftos/content/hilfe/*.md`) werden gegen den Produktstand geprüft, korrigiert und neu gegliedert (Antwort zuerst, nummerierte Schritte, Zwischenüberschriften als Fragen, wo es passt).
- **CONTENT-04:** Mindestens ein Hilfeartikel mit Schritt-für-Schritt-Anleitung je neuer Live-Funktion seit 09.09.2026, verlinkt von der Funktionsdetailseite (10 neue Artikel, 2 Erweiterungen, siehe D-19 und `<specifics>`).
- **SEO-09 (Rest):** Wissenslücken mit eigener Zielseite oder eigenem Abschnitt – die 9 in der Keyword-Map als „geplant, Phase 9“ geführten Seiten, die Gewerke-Prompts (Elektro, Maler), Gewerke-Software und Schlussrechnung; Abgleich mit dem, was Phase 7/8 schon abdeckt (D-22).
- **DESIGN-02 (Abschluss für drei Vorlagen):** Gewerke (Übersicht + Detail), Ratgeber (`/blog`, `/blog/[slug]`, `/blog/kategorie/[category]`) und Hilfe (`/hilfe`, `/hilfe/[slug]`, `/hilfe/kategorie/[category]`) auf v2-Bausteine.
- Metadaten, Brotkrumen, OG nach Phase-8-Regeln; Rollout mit Ship-Gate, IndexNow, SE-Ranking-Abgleich und Etappenbericht.

Nicht in dieser Phase: Rechner, `/support`, Rechtsseiten und 404 auf v2 (DESIGN-02-Rest → Phase 10); Barrierefreiheits- und Performance-Abschlussaudit (Phase 10); Backlinks/Portale (SEO-08, Inhaberaufgabe); Datenschutzabschnitt Webanalyse (Inhaberfreigabe). Keine Seite, kein Artikel und keine URL wird gelöscht.
</domain>

<decisions>
## Implementation Decisions

### Umfang, Rahmen und Produktbasis
- **D-01 (Umfang):** FEAT-04, CONTENT-03 und CONTENT-04 vollständig; dazu der SEO-09-Rest (D-22, D-23) und der DESIGN-02-Abschluss für die Vorlagen Gewerke, Ratgeber und Hilfe. Keine Gewerke-Seite, kein Artikel und keine URL entfällt; Slugs bleiben.
- **D-02 (Inhaberrahmen 20.10.2026):** Keine detailgetreuen Screenshots, keine Demo-Organisation, keine Videos. Visuelle Elemente nur als vereinfachte Code-Visuals aus `components/v2` (StepFlow, BentoGrid, FeatureCard, FactList, BrowserFrame/PhoneFrame mit MiniUi) und den Szenen aus `lib/scenes.ts`, sichtbar gekennzeichnet („Vereinfachte Darstellung mit Beispieldaten“). Weniger Text, klare Struktur. `components/product-demo` bleibt ungenutzt und ungelöscht.
- **D-03 (Startpunkt):** Phase 9 setzt auf dem Stand nach dem Phase-8-Rollout (08-14) auf `main` auf. Insbesondere bleiben die Änderungen aus 08-11/08-14 an `blog/handwerkersoftware-auswaehlen.md` und `blog/handwerkersoftware-einzelunternehmen.md` (Links zur Seite „Handwerkersoftware für kleine Betriebe“) erhalten; Paket (b) baut darauf auf.
- **D-04 (Produktbasis einfrieren):** Das Fundament (09-01) liest einmal `origin/release` beider Produkt-Repos (nur lesend: `git -C C:/Projekte/craft-connect-buddy show origin/release:<pfad>`, `git -C "C:/Projekte/CraftOS - Mobile/craftos-mobile" show origin/release:<pfad>`, kein Fetch). Stand 22.10.2026: Web `origin/release` = `a9319e5`, Register/Snapshot = `1e9c8bc` (v4.0.0-test.240) bzw. `535206b` im Preis-Snapshot → Abweichung (vgl. `deferred-items.md` 08-03); Mobile `origin/release` = `6cac3669` = Register. Ist der Abgleich nicht schon in 08-14 erfolgt, werden Register und Snapshot erst nach Faktenabgleich (Preise, Testphase, Funktionsbelege) nachgezogen, nie blind. Danach gilt diese eingefrorene Basis für alle parallelen Pakete; ein späterer Release-Sprung wird nur als Delta im Integrationsplan geprüft. Produktfakten ausschließlich aus `lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts`, `docs/product-pricing-snapshot.json`, `lib/funktionsdetails/**` und den Release-Pfaden.

### Gewerke-Seiten (FEAT-04, D-19 aus Phase 8)
- **D-05 (Vorlage `/gewerke/[slug]`, feste Abschnittsfolge):** (1) Kopf im v2-Stil (FunktionsKopf oder gleichwertig) mit Brotkrumen, H1 aus der Keyword-Map, `answer` ≤ 300 Zeichen als `<p id="antwort" data-answer>` (was CraftOS für dieses Gewerk leistet, nur Belegtes), CTA „10 Tage kostenlos testen“; (2) „So läuft ein Auftrag in Ihrem Gewerk“: StepFlow mit 4–5 gewerktypischen Schritten, jeder Schritt verlinkt die passende Funktionsdetailseite, genau ein Visual (D-06); (3) „Passende Funktionen“: 4–6 FeatureCards/FeatureList-Einträge auf `/funktionen/<slug>`, mindestens eine der Phase-7-Detailseiten (gaeb, mahnwesen, terminplanung, bankabgleich, datenuebernahme, maengelmanagement, kundenportal), wo fachlich passend; (4) Gewerkbeispiel (`exampleTitle`/`example`) knapp als Kachel oder FactList; (5) gewerkspezifische FAQ, 3–4 Fragen, Antwort ≤ 300, FAQPage aus demselben Array; (6) 2–3 Links auf passende Ratgeber/Hilfeartikel; (7) CtaBand. Jeder Abschnitt höchstens eine H2 und ein Satz Einleitung (Budgets aus `components/v2/budgets.ts`).
- **D-06 (Visual):** Die bestehende gewerkspezifische FeatureSnippet-Szene aus `lib/trade-snippet-examples.ts` bleibt als einziges animiertes Element im Ablauf-Abschnitt (analog 07 D-19), weil sie bereits gewerktypische Projekte zeigt und an `tests/e2e/function-illustrations.pw.cjs` (Fälle ab Z. 341: „zwölf Gewerke behalten passende Projekte“, Breiten 360–1440) gebunden ist; reduzierte Bewegung statisch, CLS 0. Ersatz durch eine statische Szene aus `lib/scenes.ts` ist nur zulässig, wenn derselbe Plan die Gewerke-E2E-Fälle mit umstellt. Keine neuen Bildschirme ohne Beleg.
- **D-07 (Daten `lib/gewerke.ts`):** Erweiterung um `ablauf` (Schritte mit Funktions-Slug) und gewerkspezifische `faq`; `funktionen` auf 4–6 Slugs. Die zwei heute für alle 12 Gewerke identischen FAQ (Vorlagen, Handy-App) entfallen als alleinige FAQ (Duplicate Content); eine davon darf als gemeinsame Frage bleiben. Jede Zusage (z. B. `hatVorlagen`, gewerkspezifische Leistungsvorlagen, GAEB/DATANORM bei Elektro/SHK) wird gegen `origin/release` belegt; DATANORM nie als v5-geprüft.
- **D-08 (`heroTitle`):** Das Feld wird aus `Gewerk` entfernt. Der Slogan lebt nur noch in `docs/seo/keyword-map.json` (`target.h1`, z. B. „Elektriker-Software: vom Zählerschrank bis zur Wallbox“) – eine Quelle, keine Abweichung möglich. `heroIntro` wird zur Kopf-Antwort umgeschrieben (≤ 300) oder durch ein Feld `answer` ersetzt. Test: Gewerke-H1 = `zielwerte(pfad).h1`.
- **D-09 (`/gewerke`):** v2-Kopf mit Antwort (Hauptkeyword „branchensoftware handwerk“, SEO-09 „Gewerke-Software“), 12 Gewerke als Kachelraster mit `GewerkIcon` und je einem Satz, CtaBand. Das KI-generierte Bild `werkstatt-2026` bleibt nur mit KI-Kennzeichnung (`tests/media-ki-label.test.ts`) oder entfällt (Discretion).
- **D-10 (KI-Prompts Elektro/Maler, D-18 Phase 8):** `docs/seo/ai-prompts-targets.json` Ziele auf `/gewerke/elektriker#antwort` und `/gewerke/maler#antwort`, `tests/ai-prompts.test.ts` Z. 86–87 gleichziehen; beide Antworten nennen das Gewerk und belegte Funktionen. Die Phase-9-Einträge bleiben `phase: 9`.

### Ratgeber und Hilfe (CONTENT-03)
- **D-11 (Prüfung je Artikel):** Jeder der 24 Ratgeber und 40 Hilfeartikel wird gegen die eingefrorene Basis (D-04) geprüft: nicht-live Funktionen (`notLive`), Grenzen (`limitations`: Portal-Onlinezahlung aus, DATANORM v5 nicht zugesagt, keine vollständige Offline-Zusage, GPS nur je Vorgang, keine autonom verbuchende KI, keine GoBD-Zertifizierung), Lizenznamen (Voll-Lizenz = Admin oder Büro, App-Lizenz), 10 Tage Test ohne Zahlungsdaten, Preise nur aus `site.ts`, Bildschirm- und Statusbezeichnungen aus dem Release, Produktbegriff „Arbeitsabschnitte“ mit „Bauphasen“ als Suchbegriff (07 D-20, Phase-5 D-13). Ergebnis je Artikel (geprüft gegen, Änderungen, Belegpfade) in einer paketeigenen Datei `craftos/docs/content-pruefung/09-<paket>.md`.
- **D-12 (Umschreiben):** Ausdrücklich erlaubt, weil CONTENT-03 es verlangt; die fachliche Kernaussage bleibt. Kein Artikel, keine URL, kein Slug entfällt. Titel, H1 und Description kommen weiter aus der Keyword-Map; Inhaltspakete ändern die Map nicht – nötige Map-Korrekturen landen in der Übergabeliste des Pakets und werden im Integrationsplan umgesetzt. Frontmatter-`title` (Brotkrumen, Listen, Feed, Schema) nur ändern, wenn er sachlich falsch ist.
- **D-13 (Gliederung):** *Hilfe:* Antwort (Frontmatter `answer`, ≤ 300) → Voraussetzungen (kurz) → „Schritt für Schritt“ als nummerierte Liste, bei Bedarf getrennt nach Web-App und Mobile-App → „Ergebnis prüfen“ → „Häufige Probleme“ als Frage-Überschriften mit Antwort ≤ 300 direkt darunter. *Ratgeber:* Antwort → Zwischenüberschriften als Fragen mit Antwort ≤ 300 direkt darunter → Beispiel/Tabelle → wo sinnvoll nummerierte Schritte → „So unterstützt CraftOS“ nur mit Belegtem und Link auf Detailseite bzw. Hilfeartikel → Quellen. Rechts- und Steuerfakten mit Quelle und `checkedAt` im Frontmatter `sources` (vorhandene Validierung in `lib/content.ts`), Quellen neu abrufen und datieren; keine Rechtsberatung.
- **D-14 (Datum):** `updatedAt` = Datum der inhaltlichen Änderung; `publishedAt` bleibt.
- **D-15 (Visual in Artikeln):** Optional genau eine Szene aus `lib/scenes.ts` per Frontmatter (`scene: <id>`), nur bestehende Szenen mit Beleg; Inhaltspakete legen keine neuen Szenen an.
- **D-16 (Schema):** Kein HowTo-Schema (wie 07 D-11); Artikel-Schema wie bisher; FAQPage nur für sichtbare FAQ aus Frontmatter `faq`.

### Artikelvorlage (DESIGN-02)
- **D-17 (Vorlage):** `components/content/ArticlePage.tsx`, `ContentIndex.tsx` und die Kategorieseiten auf v2: Kopf mit Brotkrumen, H1 aus der Map, Antwort `#antwort` (`data-answer`), Meta-Zeile (Autor, Veröffentlicht/Aktualisiert, Lesezeit, Plattformen), Inhaltsverzeichnis; Fließtext in v2-Typografie; nummerierte Listen als v2-Schrittliste (Maßketten-Optik von StepFlow, reines CSS auf Markdown-`<ol>`, keine neue Client-Insel); optionale Szene; FAQ über `FaqList answerMax={300}`; Quellen; verwandte Funktionen (Karten) und Artikel; CtaBand. Übersichten und Kategorien als Kachelraster; `ContentSearch` bleibt funktionsgleich.
- **D-18 (Frontmatter):** `lib/content.ts`/`lib/content-types.ts` erhalten `answer` (≤ 300, 1–2 Sätze), `faq` (Frage ≤ 90, Antwort ≤ 300) und `scene` (optional). In Welle 1 optional, damit Bestand und Pakete bauen; der Integrationsplan macht `answer` für alle Artikel zur Pflicht (Test). Keine neue Kategorie: `categories` bleibt unverändert, neue Artikel nutzen bestehende Kategorien (`<specifics>`).

### Neue Hilfeartikel (CONTENT-04)
- **D-19 (Liste und Abdeckung):** Maßgeblich sind die seit 09.09.2026 neu beworbenen Live-Funktionen (PROJECT.md-Liste plus Kundenportal, das am 20.10.2026 von „In Prüfung“ auf live ging; Register `liveExtras`/Detailfunktionen). Das sind 14 Funktionen; 4 haben bereits einen passenden Schritt-für-Schritt-Artikel (Terminplanung, Bautagesbericht, Mängel, Abnahme), 10 haben keinen. Daraus folgen 10 neue Artikel (Arbeitsslugs in `<specifics>`, endgültige Slugs nach den Keyword-Daten im Fundament) und 2 Erweiterungen in Bestandsartikeln, die zur jeweiligen Hilfe-Hälfte gehören: Teilabnahme in `abnahme-dokumentieren` (Paket e, bisher kein Wort „Teilabnahme“) und Arbeitsabschnitte/Terminplanung in `projekt-phasen-anlegen` (Paket e). „Kunden in der App“ steht zwar in `liveExtras`, war im Mobile-Stand vom 09.09.2026 (`9e6260d`) aber schon vorhanden und zählt nicht als neu.
- **D-20 (Inhalt neuer Artikel):** Jeweils nummerierte Schritt-für-Schritt-Anleitung nur mit Bildschirmen, Schaltflächen und Statusnamen, die am Release belegt sind (Pfad in der Prüfdatei, D-11); Grenzen wörtlich aus dem Register (u. a. Portal ohne Onlinezahlung, DATANORM v5 nicht zugesagt, KI-Zuordnung nur auf Anforderung bzw. gegen Credits, Bankabgleich ohne „automatisch“, Offline nur eingeschränkt). Aufbau wie D-13.
- **D-21 (Verlinkung von der Detailseite):** Sekundärlink „Anleitung in der Hilfe“ statt „Alle Funktionen ansehen“ bei `kundenportal`, `mahnwesen`, `bankabgleich`, `datenuebernahme`; für Teilfunktionen ohne eigene Detailseite Kernpunkt-Kachel mit `href: "/hilfe/<slug>"` (Builder-Regel WR-05 in `lib/funktionsdetails/index.ts` erlaubt das): Angebotsunterschrift auf `angebote` oder `kundenportal`, DATANORM auf `gaeb`, Besichtigung auf `baudokumentation`, Lager-Scan auf `lager`; Projekt-Chat auf `team` und `/app`, Sprachen auf `/app` (`lib/app-content.ts`). Die Sekundärlink-Tabelle in `tests/funktionsdetails.test.ts` (ab Z. 272) wird gleichgezogen. Diese Verdrahtung gehört ausschließlich Paket (f).

### SEO-09-Wissensseiten
- **D-22 (Abgleich mit Phase 7/8):** Bereits abgedeckt und nur zu prüfen: Aufmaß-App (`/funktionen/aufmass`, KD 12), Bautagebuch-App (`/funktionen/baudokumentation`, KD 7), Zeiterfassung Handwerk (`/funktionen/zeiterfassung`, KD 12) – Prompts dort seit Phase 7 gemappt; „beste Handwerkersoftware für kleine Betriebe“ (08-11). Phase 9 deckt ab: Gewerke-Software (`/gewerke` + 12 Gewerke, Prompts Elektro/Maler) in (a); Schlussrechnung über `/hilfe/schlussrechnung-erstellen` (d) und `/blog/abschlagsrechnung-schlussrechnung` (b) jeweils answer-first mit FAQ; die 9 geplanten Map-Seiten (3 Hilfe, 6 Ratgeber, alle KD ≤ 12) in (g).
- **D-23 (Wissensseiten):** Antwort zuerst, Fakten mit Quelle und Datum (Gesetz, VOB, BMF, amtliche Quellen bevorzugt), sichtbare FAQ mit FAQPage, kein Rechtsrat. Produktbezug nur mit Beleg, im Plan erneut zu prüfen: Regiebericht und Bedenkenanzeige als Berichtsarten der Bauakte (Web-Release `src/components/projects/bauakte/reportTypeMeta.ts`, `ConstructionReportDialog.tsx`), Leistungszeitraum in Dokumenten, Reverse Charge (§ 13b UStG) in Belegen/PDF, Materialliste (`MaterialListMenuItem.tsx`), GAEB-Formate (`src/lib/gaeb/gaebParser.ts`); „Mängelanzeige“ hat keinen Produktbeleg – dort nur Verweis auf Mängelmanagement ohne Dokumentzusage. „Vorlage“-Keywords (materialliste vorlage, arbeitszeitnachweis vorlage) werden mit einer sichtbaren HTML-Tabelle bzw. Checkliste im Artikel bedient, ohne Office-Downloads.

### Metadaten, Prüfung, SE Ranking
- **D-24 (Phase-8-Regeln):** Titel ≤ 60, Description 120–155, genau eine H1 aus der Map, sichtbare Brotkrumen mit BreadcrumbList aus `crumbsFor`, OG je Seite über die bestehenden Segment-OG-Routen (`blog/[slug]`, `hilfe/[slug]`, `gewerke/[slug]`, je mit `generateStaticParams`, neue Artikel automatisch). Neue URLs bekommen im Fundament Map-Einträge mit vollständigem `target` (Status „geplant“, Phase 9); die 9 vorhandenen Phase-9-Einträge erhalten ihre bislang fehlenden `target`-Werte; der Integrationsplan setzt alle auf „bestehend“. Die Antwort-zuerst-Regel des Audits (`scripts/lib/seo-audit-core.mjs`, heute nur `istZentral`) wird auf `/gewerke`, `/blog/*` und `/hilfe/*` ausgedehnt; `tests/seo-audit-core.test.ts` Z. 364 wird entsprechend umgestellt. Abschluss: `seo-audit.mjs` sitewide 0 Verstöße, `route-audit.mjs` 0 Fehler und 0 defekte Links.
- **D-25 (SE-Ranking-Budget):** Höchstens ~4.000 Units für Phase 9 (Trial bis 03.11.2026): Keyword-Metriken für die Kandidaten der 10 neuen Hilfeartikel und Fragen für die 9 Wissensseiten im Fundament, Tracking-Abgleich neuer URLs (`se-ranking-sync.mjs --check`, ggf. Ergänzung) im Integrations-/Rolloutplan, Bericht genau einmal: `scripts/seo-report.mjs --etappe rollout-phase09`. Kontostand vor und nach jedem Block dokumentieren, Rohdaten mit Datum unter `docs/seo/data/`, Schlüssel nie ausgeben. Seiten ohne belegtes Suchvolumen bekommen beschreibende Zielwerte ohne Hauptkeyword (Regel aus 05-01), keine geschätzten Zahlen.

### Parallelisierung (Inhaberwunsch: mehrere Agenten gleichzeitig)
- **D-26 (Pakete und Wellen):** Die Pläne zerfallen in Pakete mit getrennten Dateimengen, je eigener Worktree `C:/Projekte/wt-09<x>` auf Branch `phase09-spur-<x>` (Muster Phase 8); der Orchestrator merged nach `main`. Welle 1: **09-01 Fundament** ‖ **(a) Gewerke**. Welle 2 (nach Merge von 09-01): **(b) Ratgeber 1**, **(c) Ratgeber 2**, **(d) Hilfe 1**, **(e) Hilfe 2**, **(f) neue Hilfeartikel**, **(g) SEO-09-Wissensseiten** parallel; (a) darf in Welle 2 weiterlaufen. Welle 3: **Integration** (vor dem Rollout). Welle 4: **(h) Rollout**. Zuschnitt und Dateibesitz in `<specifics>`.
- **D-27 (Geteilte Dateien):** Jede geteilte Datei hat genau einen Besitzer je Welle; alle anderen fassen sie nicht an. `docs/seo/keyword-map.json`, `KEYWORD-MAP.md`, `tests/keyword-map.test.ts`: Fundament (neue Einträge, Targets) und Integration (Status „bestehend“) – sonst niemand. `tests/content.test.ts`: Fundament stellt den festen Mengentest (Z. 15/16/45: 24/40/24) auf einen Map-Bezug um (jede Inhaltsdatei hat einen Map-Eintrag, jeder „bestehend“-Eintrag eine Datei), die Integration setzt die Endwerte. `scripts/lib/seo-audit-core.mjs` + Test, `lib/content*.ts`, `components/content/**`, Artikel-CSS: Fundament. `app/sitemap.ts`: nur (a) für die `lastModified`-Zeile `/gewerke`; Artikel kommen automatisch. `lib/funktionsdetails/*.ts`, `tests/funktionsdetails.test.ts`, `lib/app-content.ts`: nur (f). `docs/seo/ai-prompts-targets.json`, `tests/ai-prompts.test.ts`, Gewerke-Fälle in `function-illustrations.pw.cjs`, `tests/media-ki-label.test.ts`, `lib/gewerke.ts`, `lib/trade-snippet-examples.ts`, `app/gewerke/**`: nur (a). `lib/scenes.ts`, `components/v2/**`: nur Fundament und (a), und nur additiv. Jede Inhaltsdatei gehört genau einem Paket. Querverweise zwischen Artikeln dürfen die in `<specifics>` festgelegten neuen Slugs schon verwenden; der vollständige Linkcheck läuft im Integrationsplan.
- **D-28 (Schwere Läufe bei Parallelbetrieb):** Build, volle Vitest-Suite, E2E und Audit nach Build nur unter der gemeinsamen Sperre `C:/Projekte/Websitenerstellung/.heavy-lock` und einzeln; vorher Koordinationsstatus lesen (globale Regel; es gibt kein Website-Rezept, also lokal). Je Worktree eigener Port (3101–3108) und eigene PID, nach Ende beenden. Inhaltspakete prüfen leichtgewichtig (gezielte Vitest-Dateien, Lint, Typprüfung) und genau einmal am Paketende Build + `seo-audit.mjs --paths=<eigene Pfade>` unter Sperre.

### Rollout und Anforderungsstatus
- **D-29 (Rollout):** Letzter Plan; nur dort wird gepusht. Lokale Gates, Code-Review-Gate durch den Orchestrator, Ship-Gate, `gh workflow list --all` vor dem Push, Vercel READY, `live-check.mjs` erweitern (Gewerke-Antwort und Ablauf, je eine neue Hilfe-URL, Wissensseiten), IndexNow, `se-ranking-sync.mjs --check`, `seo-report.mjs --etappe rollout-phase09`, Nachweis `craftos/docs/releases/PHASE-09-ROLLOUT.md`. Tests nur lokal, keine CI, kein Push zum Testen.
- **D-30 (Requirements):** Alle Nicht-Rollout-Pläne `requirements-completed: []`. Nur der Rollout-Plan markiert FEAT-04, CONTENT-03, CONTENT-04 und SEO-09. DESIGN-02 bleibt bis Phase 10 „In Progress“ (offen: Rechner, Support, Rechtsseiten, 404); Traceability-Hinweis in REQUIREMENTS.md entsprechend.
- **D-31 (Design-Kaskade und UI-SPEC):** Vor der Planung ein schlankes 09-UI-SPEC (Gewerke-Vorlage, Gewerke-Übersicht, Artikelvorlage inkl. Schrittliste, Übersichten/Kategorien), das 05–08-UI-SPEC referenziert statt wiederholt; Prüfung durch gsd-ui-checker. Kaskade laut Projekt-CLAUDE.md (frontend-design, ui-ux-pro-max, 21st.dev nur Inspiration, Context7, SEO-Check) einmal im UI-SPEC, nicht je Inhaltspaket.

### Claude's Discretion
- Endgültige Slugs der 10 neuen Hilfeartikel (nach Keyword-Daten, Arbeitsslugs als Startpunkt), Auswahl der Szene je Artikel und Gewerk, Formulierungen.
- Ob `werkstatt-2026` auf `/gewerke` bleibt (mit Kennzeichnung) oder entfällt.
- Ob Paket (f) intern in zwei Pläne geteilt wird (Büro-/Baustellenartikel); die Verdrahtung nach D-21 bleibt dann in genau einem davon.
- Reihenfolge der Artikel innerhalb eines Pakets; Zusammenlegung von Integration und Browserprüfungen in einen oder zwei Pläne.
</decisions>

<specifics>
## Specific Ideas

### Nachgezählt (Stand 22.10.2026, Code `main` 5a49eeb)
- **Gewerke:** 12 (`lib/gewerke.ts`): elektriker, shk, maler, tischler-schreiner, dachdecker, fliesenleger, zimmerer, galabau, trockenbau, metallbau, bauunternehmen, allrounder. Alle Detailseiten rendern noch `PageHero`, FeatureSnippet, eine Funktionsliste (4 Slugs, nur Phase-6-Funktionen) und dieselben zwei FAQ.
- **Ratgeber:** 24 (`content/blog`, 6 Kategorien × 4), alle `updatedAt` 2026-09-09.
- **Hilfe:** 40 (`content/hilfe`, 9 Kategorien: rechnungen 7, angebote 5, einrichtung 5, lager 5, zeiten 5, belege 4, projekte 4, baudokumentation 3, craft-ai 2); 38 mit `updatedAt` 2026-09-09, 2 (Craft AI) 2026-10-20. Alle 40 enthalten nummerierte Listen; 28 der 64 Artikel haben schon Frage-Überschriften.
- **Funktionsdetailseiten:** 23 (`lib/funktionsdetails/*`); 7 davon verlinken heute „Alle Funktionen ansehen“ statt eine Anleitung (kundenportal, nachkalkulation, dashboard, bankabgleich, arbeitsanweisungen, mahnwesen, datenuebernahme).
- **Keyword-Map:** 145 Einträge; 131 bestehend, 5 geplant Phase 8, 9 geplant Phase 9 (ohne `target`).
- **Zielmengen nach Phase 9:** 30 Ratgeber, 53 Hilfeartikel, 12 Gewerke.

### Neue Live-Funktionen seit 09.09.2026 und Hilfe-Abdeckung
| Funktion | Detailseite | Vorhandener Hilfeartikel | Ergebnis |
|---|---|---|---|
| Terminplanung / Bauphasen (Arbeitsabschnitte) | terminplanung | `projekt-phasen-anlegen` (verlinkt, mit Abhängigkeiten) | abgedeckt; (e) ergänzt Arbeitsabschnitte/App-Anzeige |
| Abnahme und Teilabnahme | baudokumentation | `abnahme-dokumentieren` (ohne Teilabnahme) | (e) ergänzt Teilabnahme-Schritte |
| Bautagesbericht | baudokumentation | `bautagesbericht-erstellen` | abgedeckt |
| Mängel | maengelmanagement | `mangel-erfassen-bearbeiten` | abgedeckt |
| Mahnwesen | mahnwesen | keiner (nur Ratgeber) | **neu** |
| Bankabgleich | bankabgleich | keiner (`zahlungen-erfassen` sagt ausdrücklich „ersetzt keinen Abgleich“) | **neu** |
| DATANORM (zu GAEB) | gaeb | keiner (GAEB ja; `artikel-stammdaten-anlegen` nur v5-Vorbehalt) | **neu** |
| Datenübernahme | datenuebernahme | keiner | **neu** |
| Angebotsunterschrift online | angebote / kundenportal | keiner | **neu** |
| Kundenportal (live seit 20.10.2026) | kundenportal | keiner | **neu** |
| Lager-Scan (Mobile) | lager | `wareneingang-buchen` nur Web, ohne Scan | **neu** |
| Besichtigung | baudokumentation | keiner | **neu** |
| Projekt-Chat und Nachrichten | team, /app | keiner | **neu** |
| 21 Sprachen der Mobile-App | /app | keiner | **neu** |

### Arbeitsslugs der 10 neuen Hilfeartikel (Paket f) mit Kategorie und Verlinkung
1. `/hilfe/kundenportal-kunden-einladen` – angebote – Sekundärlink `kundenportal`
2. `/hilfe/angebot-online-unterschreiben-lassen` – angebote – Kachel auf `angebote`/`kundenportal`
3. `/hilfe/mahnwesen-zahlungserinnerungen` – rechnungen – Sekundärlink `mahnwesen`
4. `/hilfe/bankumsaetze-abgleichen` – belege – Sekundärlink `bankabgleich`
5. `/hilfe/daten-importieren` – einrichtung – Sekundärlink `datenuebernahme`
6. `/hilfe/datanorm-katalog-importieren` – lager – Kachel auf `gaeb`
7. `/hilfe/lager-scan-app` – lager – Kachel auf `lager`
8. `/hilfe/besichtigung-durchfuehren` – baudokumentation – Kachel auf `baudokumentation`
9. `/hilfe/projekt-chat-nachrichten` – projekte – Kachel auf `team`, Link auf `/app`
10. `/hilfe/app-sprache-einstellen` – einrichtung – Link auf `/app`

### SEO-09-Wissensseiten (Paket g, Pfade und Keywords aus der Map)
| Pfad | Hauptkeyword | Vol. | KD | Kategorie |
|---|---|---|---|---|
| `/hilfe/leistungszeitraum-rechnung` | leistungszeitraum rechnung | 390 | 8 | rechnungen |
| `/hilfe/regiebericht` | regiebericht | 390 | 4 | baudokumentation |
| `/hilfe/bedenkenanzeige` | bedenkenanzeige | 390 | 7 | baudokumentation |
| `/blog/maengelanzeige` | mängelanzeige | 810 | 8 | projekte |
| `/blog/reverse-charge-bauleistungen` | reverse charge rechnungsstellung | 590 | 9 | rechnungen |
| `/blog/materialliste-vorlage` | materialliste vorlage | 210 | 8 | projekte |
| `/blog/gaeb-formate` | gaeb formate | 590 | 12 | kalkulation |
| `/blog/bauablaufplan` | bauablaufplan | 390 | 10 | projekte |
| `/blog/arbeitszeitnachweis-vorlage` | arbeitszeitnachweis vorlagen | 480 | 8 | team |

### Paketzuschnitt (Vorschlag für den Planer)
| Plan | Paket | Welle | Eigene Dateien |
|---|---|---|---|
| 09-01 | Fundament | 1 | Artikelvorlage (`components/content/**`, Artikel-CSS), `lib/content.ts`, `lib/content-types.ts` (nur Felder), `scripts/lib/seo-audit-core.mjs` + Test, `tests/content.test.ts` (Map-Bezug), Map-Einträge/Targets + `KEYWORD-MAP.md` § Phase 9 + `tests/keyword-map.test.ts`, SE-Ranking-Rohdaten, Produktbasis (Register/Snapshot nur bei Abweichung, D-04) |
| 09-02 | (a) Gewerke | 1–2 | `lib/gewerke.ts`, `lib/trade-snippet-examples.ts`, `app/gewerke/**`, Gewerke-Fälle in `function-illustrations.pw.cjs`, `ai-prompts-targets.json` + `ai-prompts.test.ts`, `media-ki-label.test.ts`, `/gewerke`-Zeile in `app/sitemap.ts` |
| 09-03 | (b) Ratgeber 1 | 2 | 12 Ratgeber: rechnungen (abschlagsrechnung-schlussrechnung, handwerkerrechnung-schreiben, xrechnung-zugferd-pdf-unterschiede, zahlungserinnerung-mahnung-handwerk), kalkulation (aufmass-angebot-mengen-abzuege, handwerkerangebot-erstellen, stundenverrechnungssatz-berechnen, tiefenkalkulation-handwerk), softwareauswahl (handwerkersoftware-auswaehlen, handwerkersoftware-einzelunternehmen, handwerkersoftware-wechseln, web-app-baustellen-app); `docs/content-pruefung/09-b.md` |
| 09-04 | (c) Ratgeber 2 | 2 | 12 Ratgeber: belege (datev-export-vorbereiten, eingangsrechnungen-digital-organisieren, ki-belegscan-pruefen, offene-posten-liquiditaet), projekte (baustellen-einsatzplanung, digitale-projektakte, materialverbrauch-baustelle-zuordnen, nachkalkulation-handwerk), team (digitale-bautagesberichte, offline-baustellen-app, projektbezogene-zeiterfassung, urlaub-abwesenheiten-einsatzplanung); `09-c.md` |
| 09-05 | (d) Hilfe 1 | 2 | 21 Hilfeartikel Büro: einrichtung (5), angebote (5), rechnungen (7), belege (4); `09-d.md` |
| 09-06 | (e) Hilfe 2 | 2 | 19 Hilfeartikel Baustelle: projekte (4), zeiten (5), lager (5), baudokumentation (3), craft-ai (2) inkl. Erweiterungen Teilabnahme/Arbeitsabschnitte; `09-e.md` |
| 09-07 | (f) neue Hilfeartikel | 2 | 10 neue Dateien unter `content/hilfe/`, `lib/funktionsdetails/*.ts` (nur Links), `tests/funktionsdetails.test.ts`, `lib/app-content.ts`; `09-f.md` |
| 09-08 | (g) SEO-09-Wissensseiten | 2 | 3 neue Hilfe- und 6 neue Ratgeberdateien laut Tabelle; `09-g.md` |
| 09-09 | Integration | 3 | Map-Status „bestehend“, Map-Korrekturen aus den Übergabelisten, `answer`-Pflicht, Endmengen 30/53, Querverweise auf neue Artikel, Release-Delta, Browserprüfungen (axe, CLS, reduced motion, 360–1440) für die neuen Vorlagen, Audit sitewide 0, route-audit 0 |
| 09-10 | (h) Rollout | 4 | Phasen-Gate, Push, IndexNow, SE-Ranking, Bericht, `PHASE-09-ROLLOUT.md` |

- Gewerktypische Abläufe (Ideen, im Plan zu belegen): Elektro – Aufmaß/Angebot mit DATANORM-Artikeln → Einsatz planen → Zeiten → Abschluss/Rechnung; SHK – Besichtigung → Angebot → Arbeitsabschnitte → Abschläge; Maler/Fliesenleger/Trockenbau – Raumaufmaß → Positionen → Baustellendoku → Nachkalkulation; Dachdecker/Bauunternehmen – GAEB-LV → Terminplanung → Bautagesbericht/Mängel → Abnahme/Schlussrechnung; Allrounder/Hausmeister – wiederkehrende Einsätze → Plantafel → Zeiten → Rechnung/Mahnwesen.
</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Anforderungen und Planung
- `.planning/ROADMAP.md` § Phase 9 und § Phase 10 – Ziel, Erfolgskriterien, Abgrenzung
- `.planning/REQUIREMENTS.md` – FEAT-04, CONTENT-03, CONTENT-04, SEO-09, DESIGN-02 und Traceability
- `.planning/PROJECT.md` – Liste der seit 09.09.2026 neuen Funktionen, Nicht-live-Liste, Inhaberrahmen
- `.planning/phases/08-seo-und-ki-sichtbarkeit/08-CONTEXT.md` – D-09 bis D-11, D-17, D-18, D-19, D-24
- `.planning/phases/08-seo-und-ki-sichtbarkeit/08-UI-SPEC.md` § 1 Brotkrumen, § 2 Antwort-zuerst-Regel, § 8 SEO-Vertrag, Prüfmatrix
- `.planning/phases/08-seo-und-ki-sichtbarkeit/08-03-SUMMARY.md` – Bausteine G1–G5 (FunktionsKopf `answer`, SectionHeader-Antwort-Lead, FaqList `answerMax`, FitPanels, FactList)
- `.planning/phases/08-seo-und-ki-sichtbarkeit/08-04-SUMMARY.md` – Map als einzige Quelle für Titel/H1/Description (`metaFor`, `zielwerte`), `heroTitle` nicht mehr gerendert
- `.planning/phases/08-seo-und-ki-sichtbarkeit/deferred-items.md` – Snapshot-Abweichung, WebKit-Zeitflakes, Impressum-Kontrast
- `.planning/phases/07-funktionsdetailseiten-und-mobile-app-seite/07-CONTEXT.md` – D-02 Abschnittsfolge, D-06/D-19 animierte Szenen, D-11 Schema, D-20 Arbeitsabschnitte

### Design
- `.planning/phases/05-…/05-UI-SPEC.md`, `06-…/06-UI-SPEC.md`, `07-…/07-UI-SPEC.md`, `08-…/08-UI-SPEC.md`; `craftos/docs/DESIGN-V2.md` (§ 17.4 G1–G5)
- `craftos/components/v2/**`, `craftos/components/v2/budgets.ts`, `craftos/lib/scenes.ts`, `/styleguide`

### Produktwahrheit
- `craftos/lib/product-register.ts`, `craftos/docs/PRODUCT-REGISTER.md`, `craftos/lib/funktionen.ts`, `craftos/lib/site.ts`, `craftos/docs/product-pricing-snapshot.json`, `craftos/docs/product-source-snapshot.json`, `craftos/scripts/sync-product-snapshot.mjs`
- `craftos/lib/funktionsdetails/**` (Sekundärlinks, Kernpunkt-Kacheln, Builder-Regeln), `craftos/lib/funktionsgruppen.ts`, `craftos/lib/app-content.ts`
- Release-Repos nur lesend: `C:/Projekte/craft-connect-buddy` und `C:/Projekte/CraftOS - Mobile/craftos-mobile` (`origin/release`)

### SEO
- `craftos/docs/seo/KEYWORD-MAP.md`, `keyword-map.json`, `ai-prompts-targets.json`, `docs/seo/data/`, `docs/seo/reports/`; `craftos/lib/seo-meta.ts`, `lib/breadcrumbs.ts`, `lib/schema.ts`, `lib/og.tsx`
- `craftos/scripts/seo-audit.mjs`, `scripts/lib/seo-audit-core.mjs`, `route-audit.mjs`, `live-check.mjs`, `se-ranking-sync.mjs`, `seo-report.mjs`, `indexnow-submit.mjs`

### Bestand dieser Phase
- `craftos/lib/gewerke.ts`, `craftos/lib/trade-snippet-examples.ts`, `craftos/app/gewerke/**`
- `craftos/content/blog/*.md`, `craftos/content/hilfe/*.md`, `craftos/lib/content.ts`, `craftos/lib/content-types.ts`, `craftos/components/content/{ArticlePage,ContentIndex,ContentSearch}.tsx`, `craftos/app/{blog,hilfe}/**`
- Tests: `tests/content.test.ts`, `keyword-map.test.ts`, `funktionsdetails.test.ts`, `ai-prompts.test.ts`, `breadcrumbs.test.ts`, `seo-audit-core.test.ts`, `media-ki-label.test.ts`, `llms.test.ts`, `tests/e2e/function-illustrations.pw.cjs`, `design-v2.pw.cjs`, `navigation.pw.cjs`
- Rollout-Muster: `craftos/docs/releases/PHASE-07-ROLLOUT.md` (und `PHASE-08-ROLLOUT.md`, sobald vorhanden)
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `FunktionsKopf` mit `answer`/`stand` und ohne Pflicht-Visual (08-03 G1): Kopf für Gewerke- und Artikelvorlage.
- `SectionHeader` (Frage-Titel → Antwort-Lead ≤ 300), `FaqList answerMax`, `FactList`, `StepFlow`, `BentoGrid`, `FeatureCard`, `FeatureList`, `CtaBand`, `Breadcrumbs`, `BrowserFrame`/`PhoneFrame`/`DevicePair` + `MiniUi`, `IllustrationLabel`.
- `lib/scenes.ts`: 28 belegte Szenen (u. a. plantafel, zeiten, maengel, aufmass, rechnungen, angebot, gaeb, mahnwesen, projektplan, arbeitsabschnitte, bank, import, abnahme, lagerApp, portal).
- `FeatureSnippet` mit `tradeSnippetExamples` (12 gewerkspezifische Beispiele).
- `metaFor`/`zielwerte` (`lib/seo-meta.ts`), `crumbsFor` (`lib/breadcrumbs.ts`), `faqSchema` (`lib/schema.ts`), Segment-OG mit `generateStaticParams`.
- Frontmatter-Validierung in `lib/content.ts` (Datum, Kategorie, `sources` mit https und `checkedAt`, Plattformen).

### Established Patterns
- Keyword-Map ist die einzige Quelle für Title, Description und H1; Map-Bearbeitung nur per Node-Skript mit eingebauter Regelprüfung (08-04).
- Inhalte als typisierte Daten mit Budgetprüfung beim Bauen (Funktionsdetails-Builder, `TEXT_BUDGET`); Fehlertexte wörtlich aus dem UI-SPEC.
- Belege als Kurzform `web:`/`app:` im HTML, volle Pfade nur in Daten/Register.
- Parallelbetrieb Phase 8: Worktrees `C:/Projekte/wt-08<x>`, Sperre `.heavy-lock`, ein schwerer Lauf zur Zeit.
- Antwort-zuerst-Prüfung `answerFirstViolations` im Build-HTML; heute nur für zentrale Seiten.

### Integration Points
- `app/gewerke/[slug]/page.tsx` und `app/gewerke/page.tsx` (heute `PageHero`, alte Klassen `section-space`, `Faq`, `TrialCta`).
- `components/content/ArticlePage.tsx` (eine Vorlage für Ratgeber und Hilfe; H1 aus der Map, Frontmatter-Titel für Brotkrumen), `ContentIndex.tsx` für Übersichten und Kategorien.
- `lib/funktionsdetails/*.ts` `secondary` und Kernpunkt-`href` → Hilfeartikel; `lib/app-content.ts` für `/app`.
- `app/sitemap.ts` (Artikel automatisch aus `getContentList`, Gewerke aus `gewerke`), `lib/llms.ts` (Gewerke-Links, Übersichten).
- `tests/content.test.ts` Z. 15/16/45 feste Mengen 24/40/24 → Map-Bezug (D-27).
</code_context>

<deferred>
## Deferred Ideas
- DESIGN-02-Rest: Rechner, `/support`, Rechtsseiten, 404 auf v2 → Phase 10.
- Impressum-Linkkontrast und WebKit-Zeitflakes aus 08-02 → Phase 10 (QA-05).
- Office-/PDF-Vorlagen zum Herunterladen (Materialliste, Arbeitszeitnachweis) → später, nur mit eigener Entscheidung.
- Hilfeartikel „Kunden in der App“ (nicht neu seit 09.09.2026) → optional später.
- Neue Szenen in `lib/scenes.ts` eigens für Artikel → nur bei belegtem Bedarf in einer späteren Phase.
- Datenschutzabschnitt Webanalyse → Inhaberfreigabe; Backlinks/Portale → SEO-08, Inhaber.
- `components/product-demo` (Entscheidung Wiederverwendung/Archiv) → Phase 10.
</deferred>

---

*Phase: 09-gewerke-und-wissensinhalte*
*Context gathered: 2026-10-22*
