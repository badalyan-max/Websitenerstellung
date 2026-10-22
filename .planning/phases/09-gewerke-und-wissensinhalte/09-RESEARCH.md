# Phase 9: Gewerke und Wissensinhalte – Research

**Researched:** 2026-10-22
**Domain:** Inhaltsprüfung gegen den Produkt-Release (Web + Mobile), Next.js-16-Inhaltsvorlagen (Markdown/Frontmatter), Gewerke-Daten, SEO/GEO (Keyword-Map, Antwort-zuerst-Audit, SE Ranking)
**Confidence:** HIGH für Produktbefunde mit Release-Pfad, MEDIUM für Keyword-Auswahl und Gewerke-Abläufe (fachliche Zuordnung), LOW nur dort, wo ausdrücklich vermerkt

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Umfang, Rahmen und Produktbasis
- **D-01 (Umfang):** FEAT-04, CONTENT-03 und CONTENT-04 vollständig; dazu der SEO-09-Rest (D-22, D-23) und der DESIGN-02-Abschluss für die Vorlagen Gewerke, Ratgeber und Hilfe. Keine Gewerke-Seite, kein Artikel und keine URL entfällt; Slugs bleiben.
- **D-02 (Inhaberrahmen 20.10.2026):** Keine detailgetreuen Screenshots, keine Demo-Organisation, keine Videos. Visuelle Elemente nur als vereinfachte Code-Visuals aus `components/v2` (StepFlow, BentoGrid, FeatureCard, FactList, BrowserFrame/PhoneFrame mit MiniUi) und den Szenen aus `lib/scenes.ts`, sichtbar gekennzeichnet („Vereinfachte Darstellung mit Beispieldaten“). Weniger Text, klare Struktur. `components/product-demo` bleibt ungenutzt und ungelöscht.
- **D-03 (Startpunkt):** Phase 9 setzt auf dem Stand nach dem Phase-8-Rollout (08-14) auf `main` auf. Insbesondere bleiben die Änderungen aus 08-11/08-14 an `blog/handwerkersoftware-auswaehlen.md` und `blog/handwerkersoftware-einzelunternehmen.md` (Links zur Seite „Handwerkersoftware für kleine Betriebe“) erhalten; Paket (b) baut darauf auf.
- **D-04 (Produktbasis einfrieren):** Das Fundament (09-01) liest einmal `origin/release` beider Produkt-Repos (nur lesend: `git -C C:/Projekte/craft-connect-buddy show origin/release:<pfad>`, `git -C "C:/Projekte/CraftOS - Mobile/craftos-mobile" show origin/release:<pfad>`, kein Fetch). Stand 22.10.2026: Web `origin/release` = `a9319e5`, Register/Snapshot = `1e9c8bc` (v4.0.0-test.240) bzw. `535206b` im Preis-Snapshot → Abweichung (vgl. `deferred-items.md` 08-03); Mobile `origin/release` = `6cac3669` = Register. Ist der Abgleich nicht schon in 08-14 erfolgt, werden Register und Snapshot erst nach Faktenabgleich (Preise, Testphase, Funktionsbelege) nachgezogen, nie blind. Danach gilt diese eingefrorene Basis für alle parallelen Pakete; ein späterer Release-Sprung wird nur als Delta im Integrationsplan geprüft. Produktfakten ausschließlich aus `lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts`, `docs/product-pricing-snapshot.json`, `lib/funktionsdetails/**` und den Release-Pfaden.

#### Gewerke-Seiten (FEAT-04, D-19 aus Phase 8)
- **D-05 (Vorlage `/gewerke/[slug]`, feste Abschnittsfolge):** (1) Kopf im v2-Stil (FunktionsKopf oder gleichwertig) mit Brotkrumen, H1 aus der Keyword-Map, `answer` ≤ 300 Zeichen als `<p id="antwort" data-answer>` (was CraftOS für dieses Gewerk leistet, nur Belegtes), CTA „10 Tage kostenlos testen“; (2) „So läuft ein Auftrag in Ihrem Gewerk“: StepFlow mit 4–5 gewerktypischen Schritten, jeder Schritt verlinkt die passende Funktionsdetailseite, genau ein Visual (D-06); (3) „Passende Funktionen“: 4–6 FeatureCards/FeatureList-Einträge auf `/funktionen/<slug>`, mindestens eine der Phase-7-Detailseiten (gaeb, mahnwesen, terminplanung, bankabgleich, datenuebernahme, maengelmanagement, kundenportal), wo fachlich passend; (4) Gewerkbeispiel (`exampleTitle`/`example`) knapp als Kachel oder FactList; (5) gewerkspezifische FAQ, 3–4 Fragen, Antwort ≤ 300, FAQPage aus demselben Array; (6) 2–3 Links auf passende Ratgeber/Hilfeartikel; (7) CtaBand. Jeder Abschnitt höchstens eine H2 und ein Satz Einleitung (Budgets aus `components/v2/budgets.ts`).
- **D-06 (Visual):** Die bestehende gewerkspezifische FeatureSnippet-Szene aus `lib/trade-snippet-examples.ts` bleibt als einziges animiertes Element im Ablauf-Abschnitt (analog 07 D-19), weil sie bereits gewerktypische Projekte zeigt und an `tests/e2e/function-illustrations.pw.cjs` (Fälle ab Z. 341: „zwölf Gewerke behalten passende Projekte“, Breiten 360–1440) gebunden ist; reduzierte Bewegung statisch, CLS 0. Ersatz durch eine statische Szene aus `lib/scenes.ts` ist nur zulässig, wenn derselbe Plan die Gewerke-E2E-Fälle mit umstellt. Keine neuen Bildschirme ohne Beleg.
- **D-07 (Daten `lib/gewerke.ts`):** Erweiterung um `ablauf` (Schritte mit Funktions-Slug) und gewerkspezifische `faq`; `funktionen` auf 4–6 Slugs. Die zwei heute für alle 12 Gewerke identischen FAQ (Vorlagen, Handy-App) entfallen als alleinige FAQ (Duplicate Content); eine davon darf als gemeinsame Frage bleiben. Jede Zusage (z. B. `hatVorlagen`, gewerkspezifische Leistungsvorlagen, GAEB/DATANORM bei Elektro/SHK) wird gegen `origin/release` belegt; DATANORM nie als v5-geprüft.
- **D-08 (`heroTitle`):** Das Feld wird aus `Gewerk` entfernt. Der Slogan lebt nur noch in `docs/seo/keyword-map.json` (`target.h1`, z. B. „Elektriker-Software: vom Zählerschrank bis zur Wallbox“) – eine Quelle, keine Abweichung möglich. `heroIntro` wird zur Kopf-Antwort umgeschrieben (≤ 300) oder durch ein Feld `answer` ersetzt. Test: Gewerke-H1 = `zielwerte(pfad).h1`.
- **D-09 (`/gewerke`):** v2-Kopf mit Antwort (Hauptkeyword „branchensoftware handwerk“, SEO-09 „Gewerke-Software“), 12 Gewerke als Kachelraster mit `GewerkIcon` und je einem Satz, CtaBand. Das KI-generierte Bild `werkstatt-2026` bleibt nur mit KI-Kennzeichnung (`tests/media-ki-label.test.ts`) oder entfällt (Discretion).
- **D-10 (KI-Prompts Elektro/Maler, D-18 Phase 8):** `docs/seo/ai-prompts-targets.json` Ziele auf `/gewerke/elektriker#antwort` und `/gewerke/maler#antwort`, `tests/ai-prompts.test.ts` Z. 86–87 gleichziehen; beide Antworten nennen das Gewerk und belegte Funktionen. Die Phase-9-Einträge bleiben `phase: 9`.

#### Ratgeber und Hilfe (CONTENT-03)
- **D-11 (Prüfung je Artikel):** Jeder der 24 Ratgeber und 40 Hilfeartikel wird gegen die eingefrorene Basis (D-04) geprüft: nicht-live Funktionen (`notLive`), Grenzen (`limitations`: Portal-Onlinezahlung aus, DATANORM v5 nicht zugesagt, keine vollständige Offline-Zusage, GPS nur je Vorgang, keine autonom verbuchende KI, keine GoBD-Zertifizierung), Lizenznamen (Voll-Lizenz = Admin oder Büro, App-Lizenz), 10 Tage Test ohne Zahlungsdaten, Preise nur aus `site.ts`, Bildschirm- und Statusbezeichnungen aus dem Release, Produktbegriff „Arbeitsabschnitte“ mit „Bauphasen“ als Suchbegriff (07 D-20, Phase-5 D-13). Ergebnis je Artikel (geprüft gegen, Änderungen, Belegpfade) in einer paketeigenen Datei `craftos/docs/content-pruefung/09-<paket>.md`.
- **D-12 (Umschreiben):** Ausdrücklich erlaubt, weil CONTENT-03 es verlangt; die fachliche Kernaussage bleibt. Kein Artikel, keine URL, kein Slug entfällt. Titel, H1 und Description kommen weiter aus der Keyword-Map; Inhaltspakete ändern die Map nicht – nötige Map-Korrekturen landen in der Übergabeliste des Pakets und werden im Integrationsplan umgesetzt. Frontmatter-`title` (Brotkrumen, Listen, Feed, Schema) nur ändern, wenn er sachlich falsch ist.
- **D-13 (Gliederung):** *Hilfe:* Antwort (Frontmatter `answer`, ≤ 300) → Voraussetzungen (kurz) → „Schritt für Schritt“ als nummerierte Liste, bei Bedarf getrennt nach Web-App und Mobile-App → „Ergebnis prüfen“ → „Häufige Probleme“ als Frage-Überschriften mit Antwort ≤ 300 direkt darunter. *Ratgeber:* Antwort → Zwischenüberschriften als Fragen mit Antwort ≤ 300 direkt darunter → Beispiel/Tabelle → wo sinnvoll nummerierte Schritte → „So unterstützt CraftOS“ nur mit Belegtem und Link auf Detailseite bzw. Hilfeartikel → Quellen. Rechts- und Steuerfakten mit Quelle und `checkedAt` im Frontmatter `sources` (vorhandene Validierung in `lib/content.ts`), Quellen neu abrufen und datieren; keine Rechtsberatung.
- **D-14 (Datum):** `updatedAt` = Datum der inhaltlichen Änderung; `publishedAt` bleibt.
- **D-15 (Visual in Artikeln):** Optional genau eine Szene aus `lib/scenes.ts` per Frontmatter (`scene: <id>`), nur bestehende Szenen mit Beleg; Inhaltspakete legen keine neuen Szenen an.
- **D-16 (Schema):** Kein HowTo-Schema (wie 07 D-11); Artikel-Schema wie bisher; FAQPage nur für sichtbare FAQ aus Frontmatter `faq`.

#### Artikelvorlage (DESIGN-02)
- **D-17 (Vorlage):** `components/content/ArticlePage.tsx`, `ContentIndex.tsx` und die Kategorieseiten auf v2: Kopf mit Brotkrumen, H1 aus der Map, Antwort `#antwort` (`data-answer`), Meta-Zeile (Autor, Veröffentlicht/Aktualisiert, Lesezeit, Plattformen), Inhaltsverzeichnis; Fließtext in v2-Typografie; nummerierte Listen als v2-Schrittliste (Maßketten-Optik von StepFlow, reines CSS auf Markdown-`<ol>`, keine neue Client-Insel); optionale Szene; FAQ über `FaqList answerMax={300}`; Quellen; verwandte Funktionen (Karten) und Artikel; CtaBand. Übersichten und Kategorien als Kachelraster; `ContentSearch` bleibt funktionsgleich.
- **D-18 (Frontmatter):** `lib/content.ts`/`lib/content-types.ts` erhalten `answer` (≤ 300, 1–2 Sätze), `faq` (Frage ≤ 90, Antwort ≤ 300) und `scene` (optional). In Welle 1 optional, damit Bestand und Pakete bauen; der Integrationsplan macht `answer` für alle Artikel zur Pflicht (Test). Keine neue Kategorie: `categories` bleibt unverändert, neue Artikel nutzen bestehende Kategorien (`<specifics>`).

#### Neue Hilfeartikel (CONTENT-04)
- **D-19 (Liste und Abdeckung):** Maßgeblich sind die seit 09.09.2026 neu beworbenen Live-Funktionen (PROJECT.md-Liste plus Kundenportal, das am 20.10.2026 von „In Prüfung“ auf live ging; Register `liveExtras`/Detailfunktionen). Das sind 14 Funktionen; 4 haben bereits einen passenden Schritt-für-Schritt-Artikel (Terminplanung, Bautagesbericht, Mängel, Abnahme), 10 haben keinen. Daraus folgen 10 neue Artikel (Arbeitsslugs in `<specifics>`, endgültige Slugs nach den Keyword-Daten im Fundament) und 2 Erweiterungen in Bestandsartikeln, die zur jeweiligen Hilfe-Hälfte gehören: Teilabnahme in `abnahme-dokumentieren` (Paket e, bisher kein Wort „Teilabnahme“) und Arbeitsabschnitte/Terminplanung in `projekt-phasen-anlegen` (Paket e). „Kunden in der App“ steht zwar in `liveExtras`, war im Mobile-Stand vom 09.09.2026 (`9e6260d`) aber schon vorhanden und zählt nicht als neu.
- **D-20 (Inhalt neuer Artikel):** Jeweils nummerierte Schritt-für-Schritt-Anleitung nur mit Bildschirmen, Schaltflächen und Statusnamen, die am Release belegt sind (Pfad in der Prüfdatei, D-11); Grenzen wörtlich aus dem Register (u. a. Portal ohne Onlinezahlung, DATANORM v5 nicht zugesagt, KI-Zuordnung nur auf Anforderung bzw. gegen Credits, Bankabgleich ohne „automatisch“, Offline nur eingeschränkt). Aufbau wie D-13.
- **D-21 (Verlinkung von der Detailseite):** Sekundärlink „Anleitung in der Hilfe“ statt „Alle Funktionen ansehen“ bei `kundenportal`, `mahnwesen`, `bankabgleich`, `datenuebernahme`; für Teilfunktionen ohne eigene Detailseite Kernpunkt-Kachel mit `href: "/hilfe/<slug>"` (Builder-Regel WR-05 in `lib/funktionsdetails/index.ts` erlaubt das): Angebotsunterschrift auf `angebote` oder `kundenportal`, DATANORM auf `gaeb`, Besichtigung auf `baudokumentation`, Lager-Scan auf `lager`; Projekt-Chat auf `team` und `/app`, Sprachen auf `/app` (`lib/app-content.ts`). Die Sekundärlink-Tabelle in `tests/funktionsdetails.test.ts` (ab Z. 272) wird gleichgezogen. Diese Verdrahtung gehört ausschließlich Paket (f).

#### SEO-09-Wissensseiten
- **D-22 (Abgleich mit Phase 7/8):** Bereits abgedeckt und nur zu prüfen: Aufmaß-App (`/funktionen/aufmass`, KD 12), Bautagebuch-App (`/funktionen/baudokumentation`, KD 7), Zeiterfassung Handwerk (`/funktionen/zeiterfassung`, KD 12) – Prompts dort seit Phase 7 gemappt; „beste Handwerkersoftware für kleine Betriebe“ (08-11). Phase 9 deckt ab: Gewerke-Software (`/gewerke` + 12 Gewerke, Prompts Elektro/Maler) in (a); Schlussrechnung über `/hilfe/schlussrechnung-erstellen` (d) und `/blog/abschlagsrechnung-schlussrechnung` (b) jeweils answer-first mit FAQ; die 9 geplanten Map-Seiten (3 Hilfe, 6 Ratgeber, alle KD ≤ 12) in (g).
- **D-23 (Wissensseiten):** Antwort zuerst, Fakten mit Quelle und Datum (Gesetz, VOB, BMF, amtliche Quellen bevorzugt), sichtbare FAQ mit FAQPage, kein Rechtsrat. Produktbezug nur mit Beleg, im Plan erneut zu prüfen: Regiebericht und Bedenkenanzeige als Berichtsarten der Bauakte (Web-Release `src/components/projects/bauakte/reportTypeMeta.ts`, `ConstructionReportDialog.tsx`), Leistungszeitraum in Dokumenten, Reverse Charge (§ 13b UStG) in Belegen/PDF, Materialliste (`MaterialListMenuItem.tsx`), GAEB-Formate (`src/lib/gaeb/gaebParser.ts`); „Mängelanzeige“ hat keinen Produktbeleg – dort nur Verweis auf Mängelmanagement ohne Dokumentzusage. „Vorlage“-Keywords (materialliste vorlage, arbeitszeitnachweis vorlage) werden mit einer sichtbaren HTML-Tabelle bzw. Checkliste im Artikel bedient, ohne Office-Downloads.

#### Metadaten, Prüfung, SE Ranking
- **D-24 (Phase-8-Regeln):** Titel ≤ 60, Description 120–155, genau eine H1 aus der Map, sichtbare Brotkrumen mit BreadcrumbList aus `crumbsFor`, OG je Seite über die bestehenden Segment-OG-Routen (`blog/[slug]`, `hilfe/[slug]`, `gewerke/[slug]`, je mit `generateStaticParams`, neue Artikel automatisch). Neue URLs bekommen im Fundament Map-Einträge mit vollständigem `target` (Status „geplant“, Phase 9); die 9 vorhandenen Phase-9-Einträge erhalten ihre bislang fehlenden `target`-Werte; der Integrationsplan setzt alle auf „bestehend“. Die Antwort-zuerst-Regel des Audits (`scripts/lib/seo-audit-core.mjs`, heute nur `istZentral`) wird auf `/gewerke`, `/blog/*` und `/hilfe/*` ausgedehnt; `tests/seo-audit-core.test.ts` Z. 364 wird entsprechend umgestellt. Abschluss: `seo-audit.mjs` sitewide 0 Verstöße, `route-audit.mjs` 0 Fehler und 0 defekte Links.
- **D-25 (SE-Ranking-Budget):** Höchstens ~4.000 Units für Phase 9 (Trial bis 03.11.2026): Keyword-Metriken für die Kandidaten der 10 neuen Hilfeartikel und Fragen für die 9 Wissensseiten im Fundament, Tracking-Abgleich neuer URLs (`se-ranking-sync.mjs --check`, ggf. Ergänzung) im Integrations-/Rolloutplan, Bericht genau einmal: `scripts/seo-report.mjs --etappe rollout-phase09`. Kontostand vor und nach jedem Block dokumentieren, Rohdaten mit Datum unter `docs/seo/data/`, Schlüssel nie ausgeben. Seiten ohne belegtes Suchvolumen bekommen beschreibende Zielwerte ohne Hauptkeyword (Regel aus 05-01), keine geschätzten Zahlen.

#### Parallelisierung (Inhaberwunsch: mehrere Agenten gleichzeitig)
- **D-26 (Pakete und Wellen):** Die Pläne zerfallen in Pakete mit getrennten Dateimengen, je eigener Worktree `C:/Projekte/wt-09<x>` auf Branch `phase09-spur-<x>` (Muster Phase 8); der Orchestrator merged nach `main`. Welle 1: **09-01 Fundament** ‖ **(a) Gewerke**. Welle 2 (nach Merge von 09-01): **(b) Ratgeber 1**, **(c) Ratgeber 2**, **(d) Hilfe 1**, **(e) Hilfe 2**, **(f) neue Hilfeartikel**, **(g) SEO-09-Wissensseiten** parallel; (a) darf in Welle 2 weiterlaufen. Welle 3: **Integration** (vor dem Rollout). Welle 4: **(h) Rollout**. Zuschnitt und Dateibesitz in `<specifics>`.
- **D-27 (Geteilte Dateien):** Jede geteilte Datei hat genau einen Besitzer je Welle; alle anderen fassen sie nicht an. `docs/seo/keyword-map.json`, `KEYWORD-MAP.md`, `tests/keyword-map.test.ts`: Fundament (neue Einträge, Targets) und Integration (Status „bestehend“) – sonst niemand. `tests/content.test.ts`: Fundament stellt den festen Mengentest (Z. 15/16/45: 24/40/24) auf einen Map-Bezug um (jede Inhaltsdatei hat einen Map-Eintrag, jeder „bestehend“-Eintrag eine Datei), die Integration setzt die Endwerte. `scripts/lib/seo-audit-core.mjs` + Test, `lib/content*.ts`, `components/content/**`, Artikel-CSS: Fundament. `app/sitemap.ts`: nur (a) für die `lastModified`-Zeile `/gewerke`; Artikel kommen automatisch. `lib/funktionsdetails/*.ts`, `tests/funktionsdetails.test.ts`, `lib/app-content.ts`: nur (f). `docs/seo/ai-prompts-targets.json`, `tests/ai-prompts.test.ts`, Gewerke-Fälle in `function-illustrations.pw.cjs`, `tests/media-ki-label.test.ts`, `lib/gewerke.ts`, `lib/trade-snippet-examples.ts`, `app/gewerke/**`: nur (a). `lib/scenes.ts`, `components/v2/**`: nur Fundament und (a), und nur additiv. Jede Inhaltsdatei gehört genau einem Paket. Querverweise zwischen Artikeln dürfen die in `<specifics>` festgelegten neuen Slugs schon verwenden; der vollständige Linkcheck läuft im Integrationsplan.
- **D-28 (Schwere Läufe bei Parallelbetrieb):** Build, volle Vitest-Suite, E2E und Audit nach Build nur unter der gemeinsamen Sperre `C:/Projekte/Websitenerstellung/.heavy-lock` und einzeln; vorher Koordinationsstatus lesen (globale Regel; es gibt kein Website-Rezept, also lokal). Je Worktree eigener Port (3101–3108) und eigene PID, nach Ende beenden. Inhaltspakete prüfen leichtgewichtig (gezielte Vitest-Dateien, Lint, Typprüfung) und genau einmal am Paketende Build + `seo-audit.mjs --paths=<eigene Pfade>` unter Sperre.

#### Rollout und Anforderungsstatus
- **D-29 (Rollout):** Letzter Plan; nur dort wird gepusht. Lokale Gates, Code-Review-Gate durch den Orchestrator, Ship-Gate, `gh workflow list --all` vor dem Push, Vercel READY, `live-check.mjs` erweitern (Gewerke-Antwort und Ablauf, je eine neue Hilfe-URL, Wissensseiten), IndexNow, `se-ranking-sync.mjs --check`, `seo-report.mjs --etappe rollout-phase09`, Nachweis `craftos/docs/releases/PHASE-09-ROLLOUT.md`. Tests nur lokal, keine CI, kein Push zum Testen.
- **D-30 (Requirements):** Alle Nicht-Rollout-Pläne `requirements-completed: []`. Nur der Rollout-Plan markiert FEAT-04, CONTENT-03, CONTENT-04 und SEO-09. DESIGN-02 bleibt bis Phase 10 „In Progress“ (offen: Rechner, Support, Rechtsseiten, 404); Traceability-Hinweis in REQUIREMENTS.md entsprechend.
- **D-31 (Design-Kaskade und UI-SPEC):** Vor der Planung ein schlankes 09-UI-SPEC (Gewerke-Vorlage, Gewerke-Übersicht, Artikelvorlage inkl. Schrittliste, Übersichten/Kategorien), das 05–08-UI-SPEC referenziert statt wiederholt; Prüfung durch gsd-ui-checker. Kaskade laut Projekt-CLAUDE.md (frontend-design, ui-ux-pro-max, 21st.dev nur Inspiration, Context7, SEO-Check) einmal im UI-SPEC, nicht je Inhaltspaket.

### Claude's Discretion
- Endgültige Slugs der 10 neuen Hilfeartikel (nach Keyword-Daten, Arbeitsslugs als Startpunkt), Auswahl der Szene je Artikel und Gewerk, Formulierungen.
- Ob `werkstatt-2026` auf `/gewerke` bleibt (mit Kennzeichnung) oder entfällt.
- Ob Paket (f) intern in zwei Pläne geteilt wird (Büro-/Baustellenartikel); die Verdrahtung nach D-21 bleibt dann in genau einem davon.
- Reihenfolge der Artikel innerhalb eines Pakets; Zusammenlegung von Integration und Browserprüfungen in einen oder zwei Pläne.

### Deferred Ideas (OUT OF SCOPE)
- DESIGN-02-Rest: Rechner, `/support`, Rechtsseiten, 404 auf v2 → Phase 10.
- Impressum-Linkkontrast und WebKit-Zeitflakes aus 08-02 → Phase 10 (QA-05).
- Office-/PDF-Vorlagen zum Herunterladen (Materialliste, Arbeitszeitnachweis) → später, nur mit eigener Entscheidung.
- Hilfeartikel „Kunden in der App“ (nicht neu seit 09.09.2026) → optional später.
- Neue Szenen in `lib/scenes.ts` eigens für Artikel → nur bei belegtem Bedarf in einer späteren Phase.
- Datenschutzabschnitt Webanalyse → Inhaberfreigabe; Backlinks/Portale → SEO-08, Inhaber.
- `components/product-demo` (Entscheidung Wiederverwendung/Archiv) → Phase 10.
</user_constraints>

## Neue Inhaber-Leitlinie vom 22.10.2026 (nach CONTEXT, verbindlich)

Vom Orchestrator übermittelt (Inhabervorgabe, umgesetzt in `main` `2b6cc2f`/`f22ee78`): **Die Website nennt nur, was unterstützt wird, nicht, was fehlt.** DATANORM wird unterstützt, und zwar DATANORM 4 und DATANORM 5 (Release `src/lib/datanorm/datanormParser.ts`: „Liest DATANORM 4 und DATANORM 5 im Semikolonformat …“; Importdialog: „Unterstützt: Datanorm 4.0 und 5.0, Zeichensatz CP850, ISO-8859-1 oder UTF-8 (wird erkannt)“) [VERIFIED: Web-Release a9319e5]. Die Register-Limitation „DATANORM v5 nicht als geprüft zugesagt“ ist gestrichen [VERIFIED: `craftos/lib/product-register.ts` auf main].

**Leitlinie L-1 für alle Artikel und Gewerke-Texte dieser Phase:**
1. Keine Aufzählung nicht unterstützter Formate, Versionen oder Funktionen (z. B. kein „GAEB 90 und GAEB 2000 werden nicht unterstützt“, kein „DATANORM v5 nicht zugesagt“, kein „Die Website verspricht keine …“).
2. Grenzen, die der Nutzer für die Bedienung wissen muss, werden **positiv als Voraussetzung oder Ablauf** formuliert: „Rechnungen aus dem Portal begleicht der Kunde per Überweisung auf das Konto auf dem Rechnungs-PDF“ statt „keine Onlinezahlung“; „Fotos laden Sie mit Internetverbindung hoch; Zeiten und Berichte werden ohne Netz vorgemerkt und später übertragen“ statt „keine vollständige Offline-Zusage“; „Automatische Mahnungen gelten für normale Rechnungen“ statt „Abschlags- und Schlussrechnungen mahnt die Automatik nicht“; „KI-Vorschläge holen Sie auf Anforderung; die Zuordnung bestätigen Sie selbst“ statt „keine autonom verbuchende KI“.
3. D-11 und D-20 verweisen noch auf die alte Limitation „DATANORM v5 nicht zugesagt“ – diese Teile sind überholt; der Planer übernimmt L-1 statt der wörtlichen Negativ-Grenzen.
4. Restbestände dieser Negativformulierung im Code (außerhalb der Artikel), die der Planer einem Paket zuweisen muss: `craftos/lib/funktionen.ts` Z. 340 (GAEB-Note „GAEB 90 und GAEB 2000 werden nicht unterstützt …“) und `craftos/lib/funktionsdetails/angebot.ts` Z. 394 (Grenze-Kachel) und Z. 408 (FAQ-Antwort) [VERIFIED: grep auf main]. Empfehlung: Paket (f) (besitzt `lib/funktionsdetails/*.ts` und `tests/funktionsdetails.test.ts`; `funktionen.ts`-`note` = Text der Grenze-Kachel, WR-06), positiv: „Leistungsverzeichnisse als X83 im Format GAEB DA XML 3.2 und 3.3, bis 5 MiB, UTF-8“.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FEAT-04 | Die 12 Gewerke-Seiten zeigen gewerktypische Abläufe mit visuellen Elementen statt nur Text. | § Gewerke: Datenbefund (`hatVorlagen` nicht belegt), Ablauf-Vorschläge je Gewerk mit belegten Funktions-Slugs, Wiederverwendung FeatureSnippet/StepFlow, Testvertrag |
| CONTENT-03 | 24 Ratgeber und 40 Hilfeartikel gegen Produktstand geprüft, korrigiert, gegliedert. | § Faktencheck je Artikel (64 Zeilen mit Status und Korrektur), Antwort-zuerst-Messung je Artikel, Querschnittskorrekturen |
| CONTENT-04 | Für jede neue Live-Funktion mindestens ein Hilfeartikel mit Schritt-für-Schritt-Anleitung. | § Neue Hilfeartikel: Release-Abläufe, Menüpfade, Rollen/Lizenzen, Grenzen (positiv), Slug-/Keyword-Empfehlung, Verlinkung (korrigierte Kachel-Zuordnung) |
| SEO-09 (Rest) | Zitierfähige Zielseiten für Wissenslücken (KD < 20). | § SEO-09-Wissensseiten: Map-Targets vorhanden, Fragen-Daten, Produktbelege, Quellen |
| DESIGN-02 (Teil) | v2-Vorlagen für Gewerke, Ratgeber, Hilfe. | § Architektur-Muster (Artikelvorlage, Frontmatter, Szenen-ID, Audit-Ausweitung) |
</phase_requirements>

## Summary

Der Release-Stand ist frisch gelesen (`git fetch` nur lesend, 22.10.2026): **Web `origin/release` = `a9319e5` (v4.0.0-test.241)**, **Mobile `origin/release` = `6cac366` (mobile-v1.0.0-test.95)** [VERIFIED: git]. Register und Preis-Snapshot stehen auf Web `1e9c8bc` (test.240); das Delta `1e9c8bc..a9319e5` sind genau zwei Commits zur **Zeitkorrektur im Web** („Beginn, Ende und Pausen im Web korrigieren“, RZ1/RZ2), ohne Preis- oder Flag-Änderung (`src/lib/constants.ts`, `featureFlags.ts`, `ai/availability.ts`, `subscription/` unverändert) [VERIFIED: git diff]. Folge: Der Test „Snapshot ist aktuell“ in `tests/pricing-parity.test.ts` ist rot, bis das Fundament den Snapshot nach Faktenabgleich auf `a9319e5` hebt; inhaltlich betrifft das Delta den Hilfeartikel `zeiteintrag-erfassen-korrigieren`, der heute ausdrücklich das Gegenteil behauptet.

Der Faktencheck aller 64 Artikel (automatischer Abgleich aller „…“-zitierten Bedienbegriffe gegen den extrahierten Release-Quelltext beider Repos plus gezielte Prüfung der Navigations- und Dialogtexte) ergibt: **0 Artikel beschreiben eine nicht-live Funktion**, aber **9 Artikel enthalten falsche Bedienbegriffe** (u. a. „Neue Phase“, „Asset hinzufügen“, „Ressourcen verwalten“, „Keine Koordinaten“, „Konflikt erkannt“, „Finanzen sichtbar“, GAEB-Formate .x84/.d83, Web-Zeitdialog „nur Stundenzahl“, Projekt-Reiternamen) und **25 sind veraltet**, weil sie neue Funktionen (Mahnwesen, Bankabgleich, Datenübernahme, Online-Unterschrift, Kundenportal, Teilabnahme, Lager-Scan, DATANORM-Kataloge, Projekt-Chat) oder die neue Navigation („Buchhaltung → Belege“ statt „Eingangsrechnungen“) nicht kennen. Strukturell erfüllen die 24 Ratgeber die Frage-Überschriften schon (179 Frage-H2), haben aber **Leads von 236–383 Zeichen** und **21 Antwort-Absätze > 300 Zeichen in 15 Artikeln**; die 40 Hilfeartikel haben fast keine Frage-Überschriften (Gliederung D-13 fehlt).

Wichtigster Gewerke-Befund: Die Zusage „CraftOS enthält vorbereitete Leistungsvorlagen für dieses Gewerk“ (`hatVorlagen` bei Elektro, SHK, Maler, Tischler, Allrounder) ist **am Release nicht als Nutzerfunktion belegt** – `trade_templates`/`useTradeTemplates` wird von keiner UI-Komponente verwendet, nur von der KI-Angebotsfunktion `generate-offer` als Kontext [VERIFIED: Web-Release]. Die SE-Ranking-Recherche hat **750 Units** verbraucht (34.671 → 33.921), Rohdaten liegen unter `craftos/docs/seo/data/2026-10-22-*-phase09.json`; belegtes Suchvolumen gibt es nur für 5 der 10 neuen Hilfeartikel.

**Primary recommendation:** Die Pakete arbeiten die Korrekturtabelle unten Zeile für Zeile ab, formulieren nach Leitlinie L-1 nur Unterstütztes, und das Fundament hebt zuerst Register/Snapshot auf `a9319e5`, ergänzt `answer`/`faq`/`scene` im Frontmatter mit einer Szenen-ID-Registry und weitet die Antwort-zuerst-Regel auf `/gewerke`, `/blog/*`, `/hilfe/*` aus.

## Produktbasis (D-04)

| Repo | `origin/release` (22.10.2026, nach `git fetch`) | Tag | Register/Snapshot | Delta |
|---|---|---|---|---|
| Web `C:/Projekte/craft-connect-buddy` | `a9319e5db9259dbdb24c8e70abb6edb15160cc79` (2026-10-22 18:09 +02) | v4.0.0-test.241 | Register `productBasis.web` und `product-pricing-snapshot.json` = `1e9c8bc` (test.240) | `437808a` feat(zeiten) Beginn/Ende/Pausen im Web korrigieren, `a9319e5` fix(zeiten) Texte/Rundung; Dateien nur `src/components/time/EditTimeEntryDialog.tsx`, `src/lib/time/timeEntryCorrection.ts`, `src/api/timeEntries.ts`, `src/hooks/useUpdateTimeEntry.ts`, `src/lib/timeUtils.ts` (+Tests) |
| Mobile `C:/Projekte/CraftOS - Mobile/craftos-mobile` | `6cac36694c4bfc77678ceead023fec70f1022331` (2026-10-22 15:53 +02) | mobile-v1.0.0-test.95 | Register = `6cac366` | keines |

- `product-pricing-snapshot.json` steht inzwischen auf `1e9c8bc` (nicht mehr `535206b`, CONTEXT D-04 ist insoweit überholt) [VERIFIED: Datei]. `git diff 535206b origin/release -- src/lib/constants.ts` ist leer → Preise, Testtage, Credits unverändert [VERIFIED: git].
- Hinweis an das Fundament: Der Fetch ist bereits erfolgt; D-04 („kein Fetch“) bleibt für Executor bindend – sie lesen `origin/release` = `a9319e5`.
- Für die Inhaltsprüfung wurden die Release-Bäume `src/` + `supabase/functions/` (Web) und `src/` (Mobile) per `git archive` in den Scratchpad extrahiert und durchsucht; Pfade unten sind Release-Pfade.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Artikelinhalte (Markdown + Frontmatter `answer`/`faq`/`scene`) | Build/SSG (Next.js Server Components, `lib/content.ts`) | CDN/Static (statisches HTML) | Inhalte werden beim Build geparst und validiert; kein Client-JS nötig |
| Artikelvorlage v2 (Kopf, Schrittliste, FAQ, Karten) | Frontend Server (RSC) | Browser nur für `ContentSearch` (bestehende Insel) | D-17: Schrittliste reines CSS, keine neue Client-Insel |
| Gewerke-Seiten (Ablauf, Funktionen, FAQ) | Frontend Server (RSC, `generateStaticParams`) | Browser für FeatureSnippet-Animation (bestehend) | D-06: einziges animiertes Element bleibt FeatureSnippet |
| Titel/H1/Description | Daten (`docs/seo/keyword-map.json` über `metaFor`/`zielwerte`) | — | Map ist einzige Quelle (08-04) |
| Strukturierte Daten (FAQPage, BreadcrumbList, Article) | Frontend Server (`lib/schema.ts`, `JsonLd`) | — | aus denselben Arrays wie sichtbare FAQ |
| OG-Bilder | Build (Segment-OG-Routen mit `generateStaticParams`) | CDN | neue Artikel automatisch |
| Prüfung Antwort-zuerst, Map, Links | Build-Nachlauf (`scripts/seo-audit.mjs`, `route-audit.mjs`) | Vitest | Audit auf gebautem HTML |
| Produktwahrheit | Daten (`lib/product-register.ts`, Snapshot) | Release-Repos (nur lesend) | D-04 |
| Keyword-Daten | Externe API (SE Ranking MCP) → Rohdaten-JSON | — | einmal im Fundament/Research |

## Faktencheck je Artikel (wichtigstes Ergebnis)

**Methode:** (1) Alle in „…“ gesetzten Begriffe aller 64 Artikel automatisch gegen den Release-Quelltext (Web `src` ohne Tests, Mobile `src` inkl. `shared/i18n/locales/de/*.json`) abgeglichen [VERIFIED: Skript]; (2) für jeden Artikel die Navigations- und Dialogtexte des beschriebenen Ablaufs am Release gelesen (Pfade in der Spalte „Beleg“); (3) Abgleich mit Register (`notLive`, `limitations`, `liveExtras`), `site.ts`, Leitlinie L-1. **Status:** `ok` = keine Widerspruch gefunden, nur Gliederung/Antwort/Links nach D-13; `veraltet` = fehlende neue Funktion oder veraltete Navigation; `falsch` = Bedienbegriff oder Aussage widerspricht dem Release; `nicht-live` = beschreibt nicht-live Funktion (**kein Fall gefunden**).

**Querschnitt für alle 64 Artikel (nicht je Zeile wiederholt):** Frontmatter `answer` ≤ 300 ergänzen; Gliederung D-13; `updatedAt` setzen; Lizenzbegriffe „Voll-Lizenz (Admin oder Büro)“ und „App-Lizenz“ statt „Admin- oder Büro-Lizenz“ / „Admin-, Büro- und App-Lizenzen“ (betroffen u. a. anmelden, artikel-stammdaten, kunden, angebot-entwurf, plantafel, projekt-phasen, lagerorte, abschlagsrechnung, craft-ai, handwerkersoftware-auswaehlen, -einzelunternehmen, web-app-baustellen-app); Negativsätze nach L-1 umformulieren; „Wohnung Lindenstraße“ bleibt als fiktives Musterprojekt erlaubt; Quellen mit `checkedAt` neu abrufen.

**Messwerte Antwort-zuerst (Markdown-Näherung der Audit-Regel `answerFirstViolations`, H2/H3 mit „?“ → erster Absatz ≤ 300):** Ratgeber: alle 24 haben 6–9 Frage-H2 (179 gesamt), 21 Verstöße in 15 Artikeln, Lead 236–383 Zeichen (20 von 24 > 300 → `answer` neu schreiben). Hilfe: 4 Artikel mit je 1 Frage-Überschrift, sonst keine; Leads 87–212 Zeichen (Antwort-Kandidaten). [VERIFIED: Skript `answerfirst.mjs` im Scratchpad]

### Paket (b) Ratgeber 1 (12)

| Artikel | Status | Konkrete Korrektur | Beleg (Release) |
|---|---|---|---|
| blog/abschlagsrechnung-schlussrechnung | veraltet | Schlussrechnung „Erst nach Abnahme möglich“ bestätigt; ergänzen: Abschlag kann aus einer **Teilabnahme** mit vorgeschlagenem Nettobetrag starten; Abnahmeprotokoll übernimmt Büro-Leitung/Inhaber („Abnahme übernehmen“, nur bei „Beauftragt“/„In Ausführung“). SEO-09 Schlussrechnung: answer-first + FAQ; Lead 365 → `answer`; 2 Absätze > 300 kürzen; Quelle § 14 UStG neu datieren, ggf. § 650g BGB ergänzen. Link `/hilfe/schlussrechnung-erstellen`, `/hilfe/abnahme-dokumentieren` (Teilabnahme). | web `src/lib/invoiceModeLogic.ts` („Erst nach Abnahme möglich“, „Abnahme bereits erfolgt — nur noch Schlussrechnung“), `src/components/documents/CreateInvoiceDialog.tsx` (Teilabnahme-Einstieg), `src/components/documents/InvoiceAcceptanceHint.tsx` |
| blog/handwerkerrechnung-schreiben | ok | Ablauf („Rechnung erstellen“, „Fertigstellen“) stimmt; ergänzen: Links auf neue Wissensseiten `/hilfe/leistungszeitraum-rechnung`, `/blog/reverse-charge-bauleistungen`; 2 Absätze > 300 (max 385); Lead 351. | `src/pages/DocumentDetail.tsx`, `src/components/DocumentEditor/DocumentCanvas.tsx` (Leistungszeitraum-Pflichtangaben) |
| blog/xrechnung-zugferd-pdf-unterschiede | veraltet | H2 „Welche zeitliche Einordnung gilt im September 2026?“ auf heutigen Stand (Oktober 2026) umstellen; BMF-FAQ neu abrufen und `checkedAt` setzen (Abruf am 22.10. lieferte HTTP 503 → Executor wiederholt); Absatz 508 Zeichen teilen; Lead 383. Produktteil (E-Rechnungsdownload) stimmt. | `src/components/documents/EInvoiceDownloadDialog.tsx` |
| blog/zahlungserinnerung-mahnung-handwerk | veraltet | CraftOS-Abschnitt beschreibt nur manuelle Zahlungserfassung. Neu: **Einstellungen → Mahnwesen** mit „Mahn-Fristen“, Stufen „Zahlungserinnerung“, „1. Mahnung“, „2. Mahnung“ („Tage überfällig“, „Mahngebühr“, „Stufe aktiv“, „Verzugszinssatz (jährlich)“, „Rechtliche Vorschläge übernehmen“), „Mahn-Vorlagen“, „Automatische Mahnungen einschalten?“ mit Vorschau; „Mahnverlauf“ an der Rechnung. Positiv: „Automatische Mahnungen gelten für normale Rechnungen.“ Satz „Die Website verspricht keine automatische Onlinezahlung …“ streichen (L-1). Links `/funktionen/mahnwesen`, neuer Mahnwesen-Hilfeartikel, Bankabgleich. 3 Absätze > 300. | `src/pages/settings/MahnwesenSettings.tsx`, `src/components/invoices/ReminderHistory.tsx`, `src/components/invoices/InvoiceReminderStatus.tsx` |
| blog/aufmass-angebot-mengen-abzuege | ok | „Aufmaß & Massen“, „Als Angebotspositionen“ belegt; ergänzen: Aufmaß auch in der Mobile-App (Kachel „Aufmaß – Räume vermessen“), Besichtigung als Vorstufe; 1 Absatz > 300, Lead 319. | web `src/components/projects/projectTabs.ts`; mobile `projects.json` `actionCards.measurementsLabel` |
| blog/handwerkerangebot-erstellen | veraltet | Ergänzen: Versand per E-Mail mit **persönlichem Link zum Online-Unterschreiben** (30 Tage gültig, am Handy per QR-Code), Stand unter „Online-Unterschrift“; Artikel aus **DATANORM-Katalogen** in der Positionssuche; GAEB-Import. Link neuer Artikel Angebotsunterschrift. | `src/components/documents/SendDocumentDialog.tsx` Z. 617–628, `src/components/documents/QuoteSignatureEvidence.tsx`, `src/pages/Stammdaten.tsx` (Kataloge) |
| blog/stundenverrechnungssatz-berechnen | ok | Nur Gliederung; HWK-Quelle neu abrufen/datieren; Lead 336. | — |
| blog/tiefenkalkulation-handwerk | ok | „Einstellungen → Lohngruppen“, „Zuschläge & Margen“ belegt; 1 Absatz 333, Lead 320. | `src/components/settings/SettingsSidebar.tsx` |
| blog/handwerkersoftware-auswaehlen | veraltet | D-03-Links behalten. Lizenzbegriffe (Voll-Lizenz/App-Lizenz), 10 Tage Test ohne Zahlungsdaten aus `site.ts`; Daten-„Gegenrichtung“/Wechsel: **Datenübernahme** („Daten importieren mit KI“, Rücknahme möglich) verlinken. 1 Absatz > 300. | `src/pages/Datenimport.tsx`, `src/components/import/ImportResult.tsx` |
| blog/handwerkersoftware-einzelunternehmen | veraltet | D-03-Links behalten. „erste Admin-Lizenz … umfasst den App-Zugang“ → „Voll-Lizenz (Admin) mit Web-App und Mobile-App“; 2 Absätze > 300. | `craftos/lib/site.ts` `tarife` |
| blog/handwerkersoftware-wechseln | veraltet | relatedFeatures nennt `datenuebernahme`, Text aber nicht: Abschnitt „Pilotdurchlauf“ um Datenübernahme ergänzen (Kunden, Projekte, Stammdaten aus CSV/TSV/TXT/XLSX/JSON/XML/vCard; bis 10 MiB je Datei, 30 MiB zusammen; Zuordnung prüfen, „Import starten“, „Rücknahme prüfen“; Import-KI kostenlos; Rolle Admin oder Büro-Leitung); DATANORM-Kataloge und GAEB für Stammdaten/LV. Link neuer Artikel `daten-importieren`. | `src/components/import/ImportWizard.tsx`, `UniversalImport.tsx`, `src/pages/Datenimport.tsx` |
| blog/web-app-baustellen-app | veraltet | Lizenzbegriffe; **5 Rollen** (Admin, Büro-Leitung, Büro-Projektleitung, Mobil-Teamleitung, Mobil-Teammitglied); neu: Projekt-Chat und Direktnachrichten, App in 21 Sprachen; Offline-Absatz positiv (L-1). 2 Absätze > 300, Lead 339. | web `src/lib/subscription/roles.ts` Z. 90–96; mobile `chat.json`, `messages.json`, `settings.json` `language.title` |

### Paket (c) Ratgeber 2 (12)

| Artikel | Status | Konkrete Korrektur | Beleg (Release) |
|---|---|---|---|
| blog/datev-export-vorbereiten | ok | Ablauf „Zeitraum → Prüfung → Festschreiben → Übergabe“ bestätigt („Welchen Zeitraum übergibst du?“, „Ist alles vollständig?“, „Festschreiben (GoBD)“, „Übergabe-Paket herunterladen“; Paket: DATEV-Buchungsstapel EXTF, Belege, Buchungsjournal CSV, Offene-Posten-Liste, Zeiten-Nachweis). Navigation zusätzlich „Buchhaltung → Steuerberater“. GoBD-Quellen neu datieren. | `src/pages/SteuerberaterExport.tsx`, `src/components/buchhaltung/AccountingNavigation.tsx` |
| blog/eingangsrechnungen-digital-organisieren | veraltet | „In der Web-App öffnen … ‚Eingangsrechnungen‘“ → **„Buchhaltung → Belege → Eingangsbelege“**, Button „Neue Eingangsrechnung“ bleibt; ergänzen: „Mit Bankumsatz abgleichen“ / „Zahlung über Bankumsatz erfassen“; mobile „Beleg scannen“. 1 Absatz 307, Lead 331. | `src/components/buchhaltung/ReceiptNavigation.tsx`, `src/pages/Eingangsrechnungen.tsx` |
| blog/ki-belegscan-pruefen | ok | Satz „kein autonomes Verbuchen … zu erwarten“ positiv (L-1): „Sie prüfen den Vorschlag und bestätigen jeden Schritt selbst“; Navigation wie oben; Lead 333. | `src/pages/Eingangsrechnungen.tsx`; mobile `features/supplier-invoices/screens/ScanReceiptScreen.tsx` |
| blog/offene-posten-liquiditaet | veraltet | „Die Hilfe zur Zahlungserfassung erklärt den Abgleich“ → Bankabgleich: Bankdatei (CSV, camt.053, PDF) importieren, Umsatz zuordnen; Links `/funktionen/bankabgleich`, neuer Artikel `bankumsaetze-abgleichen`, `/funktionen/mahnwesen`; Lead 308. | `src/pages/Bankumsaetze.tsx`, `src/components/buchhaltung/BankImportDialog.tsx`, `BankAllocationDialog.tsx` |
| blog/baustellen-einsatzplanung | veraltet | „Projekte enthalten zusätzlich einen eigenen Planungsbereich“ → Reiter **„Terminplanung“ mit Arbeitsabschnitten** (Bauphasen als Suchbegriff), Link `/funktionen/terminplanung`; „Geräte & Fahrzeuge“ statt „Ressourcen“; Karte: Einsätze ohne Kartenposition stehen in der Liste („Ohne Kartenposition“). | `src/components/projects/ProjectSchedulingTab.tsx`, `src/components/plantafel/PlantafelHeader.tsx`, `src/pages/Einsaetze.tsx` |
| blog/digitale-projektakte | falsch | Reiterliste ersetzen durch Release: **Übersicht, Terminplanung, Dokumente, Arbeitsanweisungen, Baudokumentation, Aufmaß & Massen, Zeiten, Kalkulation (nur mit Finanzfreigabe), Dateien**; Tabelle Z. 29 „Planung | Phasen …“ → „Terminplanung | Arbeitsabschnitte …“; ergänzen: Ordner „Besichtigung“, Sichtbarkeit „Nur intern“/„Für Kunde“, mobil Projekt-Chat. Linktext „Projekt und Phasen anlegen“ an Map-Titel anpassen. | `src/components/projects/projectTabs.ts` Z. 41–51, `src/components/projects/ProjectAssetsTab.tsx` |
| blog/materialverbrauch-baustelle-zuordnen | veraltet | Warenausgang verlangt **Kunde und Auftrag/Projekt**; Rückbuchung über „Ursprüngliche Materialentnahme“; mobil: Mehr → Lager → „Barcode scannen“ → „Ausgabe, Rücknahme oder Bewegung“; Link neuer Artikel `lager-scan-app`. | `src/components/lager/StockMovementDialog.tsx`; mobile `common.json` `inventory.*` |
| blog/nachkalkulation-handwerk | ok | Reiter „Kalkulation“ (Finanzfreigabe) benennen; sonst nur Gliederung. | `src/components/projects/projectTabs.ts` |
| blog/digitale-bautagesberichte | veraltet | Berichtsarten ergänzen: Web „Bautagesbericht“, „Regiebericht“ („Zusatzarbeiten & Stunden“), „Bedenkenanzeige“, eigene Vorlage; Mobile „Tagesbericht“, „Stundenbericht“, „Bedenkenanzeige“; Links auf neue `/hilfe/regiebericht`, `/hilfe/bedenkenanzeige`; Abnahme/Teilabnahme; 1 Absatz 338. | web `src/components/projects/bauakte/reportTypeMeta.ts`; mobile `construction.json` `reportType.*` |
| blog/offline-baustellen-app | veraltet | Satz „Die Website verspricht deshalb keine pauschale Offline-Fotoablage …“ streichen (L-1); positiv: Zeiten, Berichte, Mängel, Nachrichten, Lagerbuchungen werden ohne Netz vorgemerkt („Auf Gerät vorgemerkt“, „Offline: Nachricht wird gesendet, sobald wieder Verbindung besteht.“), Fotos mit Verbindung hochladen; Besichtigungsaufnahmen „Auf Gerät sichern“. 1 Absatz 304. | mobile `common.json` `offline.*`, `inventory.operationQueued`; `chat.json` `composer.queued`; `projects.json` `siteVisit.persistLocal` |
| blog/projektbezogene-zeiterfassung | veraltet | Web-Korrektur jetzt mit **Beginn, Ende, Pause (Minuten)** (Release `a9319e5`); App-Tab heißt „Zeiten“; Teamleitung = Option „Teamzeiten im Projekt“ / Rolle „Mobil-Teamleitung“. 1 Absatz 359. | `src/components/time/EditTimeEntryDialog.tsx`; `src/components/team/NewTeamMemberDialog.tsx` |
| blog/urlaub-abwesenheiten-einsatzplanung | ok | Reiter „Urlaub“ (mobil), „Plantafel → Verwalten → Urlaubsanträge“, „Abwesenheit erfassen“, Einstellungen „Arbeitszeiten“, „Feiertage“, „Urlaubskonto“ belegt; nur Gliederung. | mobile `time.json` `tabs.urlaub`; web `PlantafelHeader.tsx`, `SettingsSidebar.tsx` |

### Paket (d) Hilfe 1 – Büro (21)

| Artikel | Status | Konkrete Korrektur | Beleg (Release) |
|---|---|---|---|
| hilfe/anmelden-web-mobile | ok | Begriffe belegt („Kein Passwort? Mit Code anmelden“, „Code senden“); Lizenzsätze positiv (L-1). | `src/pages/Auth.tsx`; mobile `auth.json` |
| hilfe/firmenprofil-einrichten | ok | Einstellungen „Firmendaten“, „Bankverbindung“, „Steuern & MwSt“, „Nummernkreise“, „Briefpapier gestalten“ belegt; „Steuerprofil“ ergänzen. | `src/components/settings/SettingsSidebar.tsx` |
| hilfe/kunden-ansprechpartner-anlegen | veraltet | „Neuer Kunde“ belegt; ergänzen: Kunde ins Kundenportal einladen („Zum Kundenportal einladen“) → Link neuer Artikel; mobil Kunden (Tab „Kunden“). | `src/components/customers/CustomerDialog.tsx`, `CustomerPortalAccessCard.tsx` |
| hilfe/mitarbeiter-einladen-lizenz-zuweisen | falsch | „Team → Mitarbeiter“ → Seitenleiste **„Mitarbeiter“**; Dialog „Mitarbeiter hinzufügen“: Vorname, Nachname, E-Mail, Lizenz (App/Büro/Admin) und Rolle („Rolle auswählen“), „Büro-Optionen“/„App-Optionen“ (erweitert), „Sprache (App-Vorgabe)“, Standort, Kosten; Einladung „Einladung senden“/„Einladung erneut senden“/„Einladungslink kopieren“; **Sitze und Rollen vergibt nur der Inhaber**. | `src/components/layout/AppSidebar.tsx`, `src/components/team/NewTeamMemberDialog.tsx`, `LicenseRoleSelect.tsx`, `src/pages/Mitarbeiter.tsx` |
| hilfe/rollen-zugriffsrechte-einstellen | falsch | „Finanzen sichtbar“ → **„Globale Finanzbereiche“**, „Teamleitung (Zeiten für andere)“ → **„Teamzeiten im Projekt“**; außerdem „Alle Projekte sehen“, „Lagerpreise sehen“. Ort: **Einstellungen → Rollen & Rechte** (bzw. Button „Rollen & Rechte“ auf der Mitarbeiterseite), Person wählen, „Änderungen prüfen“ → „Rollenänderung bestätigen“; Tabelle auf die 5 Rollen (Admin, Büro-Leitung, Büro-Projektleitung, Mobil-Teamleitung, Mobil-Teammitglied) mit Release-Beschreibungen umstellen; nur Inhaber ändert Rollen/Sitze. | `src/lib/subscription/roles.ts`, `src/pages/settings/RollenRechte.tsx`, `src/components/team/RoleEditor.tsx` |
| hilfe/angebot-entwurf-anlegen | ok | Begriffe belegt; ergänzen: Versand mit Online-Unterschrift, DATANORM-Kataloge in der Suche. | `src/pages/Dokumente.tsx`, `SendDocumentDialog.tsx` |
| hilfe/angebotspositionen-leistungsvorlagen | veraltet | Positionssuche liefert auch Artikel aus DATANORM-Katalogen („Artikel aus DATANORM-Katalogen übernehmen Sie unter Stammdaten → Kataloge“) → Link DATANORM-Artikel. | `src/components/calculation/ArticlePicker.tsx` Z. 89 |
| hilfe/position-tiefenkalkulieren | ok | nur Gliederung. | — |
| hilfe/raumaufmass-angebot-uebernehmen | ok | Begriffe belegt; mobil „Aufmaß“-Kachel ergänzen. | web `src/components/projects/bauakte/RoomMeasurementDialog.tsx`; mobile `room-measurements` |
| hilfe/gaeb-importieren | falsch | Formate: Import nimmt **X83 als GAEB DA XML 3.2 (2013-10) oder 3.3 (2021-05), bis 5 MiB, UTF-8** (Dateiauswahl `.x83`/`.gaeb`) – „.x84 und .d83“ streichen; Schritt „Preise übernehmen“ ist im GAEB-Dialog **nicht** belegt (nur im DATANORM-Dialog) → streichen; belegt: „GAEB importieren“, „Positionsvorschau“, „Hinweise“, „Alle auswählen“/„Alle abwählen“, Hinweis zur vollständigen Übernahme für spätere X84-Abgabe; Export „GAEB exportieren“ (X83, X84 — Angebotsabgabe) ergänzen. Negativsatz „keine pauschale Unterstützung jeder GAEB-Variante“ streichen (L-1). | `src/components/DocumentEditor/GAEBImportDialog.tsx` Z. 287, 321, 328; `GAEBExportDialog.tsx`; `DocumentEditor.tsx` Z. 1017 |
| hilfe/abschlagsrechnung-erstellen | veraltet | Einstieg aus Teilabnahme ergänzen (Betragsvorschlag); sonst belegt. | `CreateInvoiceDialog.tsx`, `src/lib/abschlagFreigabe.ts` |
| hilfe/angebot-in-rechnung-uebernehmen | ok | nur Gliederung. | — |
| hilfe/berichte-abrechnen | ok | Belegt: „Rechnung aus Bericht erstellen“, „Sammelabrechnung“, Sperrgründe „Nur für abgeschlossene Berichte (nicht Entwurf)“, „Dem Projekt ist kein Kunde zugeordnet“; Regiebericht als typische Quelle verlinken. | `src/components/projects/bauakte/ConstructionReportsSection.tsx` |
| hilfe/e-rechnung-herunterladen | ok | BMF-Link neu prüfen. | `EInvoiceDownloadDialog.tsx` |
| hilfe/rechnung-fertigstellen | ok | optional Hinweis Mahnwesen/Zahlungsziel. | — |
| hilfe/rechnung-stornieren | ok | „Stornogrund (Pflicht)“ belegt. | — |
| hilfe/schlussrechnung-erstellen | veraltet | Voraussetzung präzisieren: Schlussrechnung „Erst nach Abnahme möglich“; Abnahmeprotokoll per „Abnahme übernehmen“ (Büro-Leitung/Inhaber, Projektstatus „Beauftragt“/„In Ausführung“); Web-Bezeichnung „Schlussabnahme“. SEO-09 Schlussrechnung: answer-first + sichtbare FAQ (Map-Keyword „schlussrechnung muster“ 480 → Muster-Tabelle). | `invoiceModeLogic.ts`, `InvoiceAcceptanceHint.tsx`, `bauakte/AcceptanceSection.tsx` Z. 49–51 |
| hilfe/beleg-kontieren-zuordnen | veraltet | Navigation „Eingangsrechnungen“ → „Buchhaltung → Belege → Eingangsbelege“; Begriffe sonst belegt. | `ReceiptNavigation.tsx` |
| hilfe/beleg-scannen-pruefen | veraltet | Navigation wie oben; mobil „Beleg scannen“ (Mehr bzw. Projektkachel) ergänzen. | mobile `common.json` `more.scanReceipt`, `projects.json` `actionCards.scanReceiptLabel` |
| hilfe/datev-export-erstellen | ok | Pfad „Buchhaltung → Steuerberater“ als zweiten Einstieg nennen. | `AccountingNavigation.tsx` |
| hilfe/zahlungen-erfassen | veraltet | „ersetzt keinen Abgleich mit dem tatsächlichen Zahlungseingang“ → Bankabgleich verlinken („Zahlung über Bankumsatz erfassen“); Liste „Buchhaltung → Belege → Zahlungseingänge“. | `src/pages/Zahlungseingaenge.tsx`, `BankAllocationDialog.tsx` |

### Paket (e) Hilfe 2 – Baustelle (19)

| Artikel | Status | Konkrete Korrektur | Beleg (Release) |
|---|---|---|---|
| hilfe/plantafel-einsatz-planen | falsch | „Neuer Einsatz → Mitarbeiter-Einsatz“ → Kopfzeilen-Button **„Einplanen“** (Dialog „Neuer Einsatz“: Mitarbeiter*, Projekt*, Beginn*, Ende (optional), Startzeit, Endzeit, Einsatzadresse – leer = Projektadresse, Farbe, Notizen, „Einsatz planen“); „Keine Koordinaten“ → **„Ohne Kartenposition“ / „Dieser Einsatz hat keine Kartenposition.“**; „Konflikt erkannt“ → **„Hinweis zur Planung“ / „Trotzdem einplanen“**; „Einsatz geändert“ am Release nicht als Text gefunden (nur „Einsatz verschoben“) → nur „Einsatz verschoben“ nennen; „an einer Phase planen“ → am Arbeitsabschnitt „Jetzt einplanen“. | `PlantafelHeader.tsx` Z. 81–84, `NewAssignmentDialog.tsx`, `src/pages/Einsaetze.tsx`, `AssignmentPlanHintsDialog.tsx`, `supabase/functions/send-push-notification/index.ts` |
| hilfe/planung-mitarbeiter-ressourcen | falsch | „Verwalten → Ressourcen verwalten“ → **„Verwalten → Geräte & Fahrzeuge verwalten“**; „Ressource erstellen“ → **„Neues Gerät oder Fahrzeug“** (Name, Art, Option „In der Plantafel einplanen“); Einplanung: Dialog **„Gerät/Fahrzeug einplanen“** (Gerät/Fahrzeug*, Projekt*, Beginn*, Ende); Begriff „Ressource“ im Text durch „Geräte und Fahrzeuge“ ersetzen. | `src/components/plantafel/ResourcesManagerDialog.tsx`, `ResourceAssignmentDialog.tsx` Z. 261 |
| hilfe/projekt-phasen-anlegen | falsch + Erweiterung | „Neue Phase“ → **„Abschnitt anlegen“**; Begriff **Arbeitsabschnitte** (Bauphasen nur als Suchbegriff, 07 D-20); Dialog: „Name*“, „Von*“, „Bis*“, „Projektzeitraum automatisch anpassen“, „Mehr Einstellungen“ (Beschreibung, Geschätzte Stunden, Personal- und Gerätebedarf, Farbe), „Speichern und einplanen“; „Abschnitte aus Angebot vorschlagen“; Ansicht „Liste“/„Zeitleiste“; Abhängigkeiten; **Erweiterung (D-19):** Mobile-App zeigt Arbeitsabschnitte mit Status im Projekt und am Einsatz, geplant wird im Web; Projektort mobil „Aktuellen Standort als Projektort setzen“. Titel „Ein Projekt mit Phasen anlegen“ ggf. Map-Korrektur in Übergabeliste. | `ProjectSchedulingTab.tsx`, `PhaseDialog.tsx`, `PhaseListView.tsx`; mobile `features/projects/components/ProjectPhaseSummary.tsx`, `features/assignments/components/AssignmentPhaseLine.tsx`, `projects.json` `detail.setLocationFromGps` |
| hilfe/projektdateien-ordner | falsch | „Asset hinzufügen“ → **„Dateien hochladen“** (Dialog) oder Datei in den Bereich ziehen; „Neuer Ordner“/„Ordner erstellen“/„Datei herunterladen“ belegt; ergänzen: Filter Dateityp/Analysestatus/**Sichtbarkeit („Nur intern“, „Für Kunde“)**, Ordner „Besichtigung“, „Angebot aus diesen Daten erstellen“; mobil „Belege & Dateien“ belegt. | `ProjectAssetsTab.tsx`, `src/components/projects/AddAssetDialog.tsx` |
| hilfe/mobile-offline-synchronisierung | ok | Begriffe belegt („Offline, noch nicht geladen“, „Synchronisiere…“, „Vom Server abgelehnt“, „Erneut versuchen“, „Verwerfen“, „Offline hier noch nicht möglich“); ergänzen: beim Abmelden bleiben nicht synchronisierte Änderungen für die nächste Anmeldung erhalten (`logoutConfirm.pendingRetained`); Chat/Lager vorgemerkt; Satz „kein pauschales Offline-Fotoversprechen“ positiv (L-1). | mobile `common.json` `offline.*`, `settings.json` `logoutConfirm.*` |
| hilfe/mobilen-timer-bedienen | ok | Tab heißt „Zeiten“ (Bildschirm „Zeiterfassung“), sonst belegt („Starten“, „Stoppen“, „Arbeit“/„Fahrt“, „Zeit für dieses Projekt erfassen“, „Automatische Projektzuordnung“). | mobile `time.json`, `projects.json`, `settings.json` `geo.title` |
| hilfe/urlaub-beantragen-bearbeiten | ok | Begriffe belegt („Neuer Antrag“, „Meine Anträge“, „Offene Anträge“, „Freigeben“, „Kein Mitarbeiterprofil verknüpft …“). | mobile `vacation.json`; web `PlantafelHeader.tsx` |
| hilfe/zeiteintrag-erfassen-korrigieren | falsch (Release-Delta) | Absatz „Der Web-Dialog arbeitet mit einer Stundenzahl …“ ist seit `a9319e5` falsch: Web „Zeiteintrag bearbeiten“ mit „Datum*“, **„Beginn“, „Ende“, „Pause (Minuten)“** – „Uhrzeiten und Pause korrigieren; die Arbeitszeit wird daraus berechnet“; nur ohne Uhrzeiten „Stunden*“; Sperren „Diese Zeit ist bereits abgerechnet. Bitte zuerst die Rechnung korrigieren.“, „Läuft noch. Bitte erst stoppen.“; „Mindestens 0,25 Std.“, „Maximal 24 Std.“; „Erfasste Standorte“ bleiben sichtbar. Mobile-Teil belegt. | `src/components/time/EditTimeEntryDialog.tsx`, `src/lib/time/timeEntryCorrection.ts` (Release-Delta) |
| hilfe/zeiten-pruefen-exportieren | ok | nur Gliederung. | `src/pages/Zeiten.tsx` |
| hilfe/artikel-stammdaten-anlegen | ok (nach 2b6cc2f) | Satz „DATANORM 4 oder DATANORM 5“ ist L-1-konform; ergänzen: Weg „Stammdaten → Kataloge → DATANORM importieren“, „Artikel ansehen“ übernimmt Katalogartikel in eigene Artikel; Link neuer DATANORM-Artikel. | `src/pages/Stammdaten.tsx` Z. 235–244, 586–590 |
| hilfe/inventur-durchfuehren | ok | Begriffe belegt. | `src/components/lager/InventurSection.tsx` |
| hilfe/lagerorte-lagerplaetze-einrichten | ok | Belegt; Dialogtext „Lager oder Fahrzeug anlegen. Lagerplätze sind optional“. | `src/components/lager/LagerDialog.tsx` |
| hilfe/material-entnehmen-zurueckbuchen | veraltet | Warenausgang: „Kunde“ und „Auftrag / Projekt“ wählen; Rückbuchung: „Ursprüngliche Materialentnahme“ (Menge höchstens die Entnahme, damaliger Materialwert); mobil „Ausgabe, Rücknahme oder Bewegung“ → Link `lager-scan-app`. | `StockMovementDialog.tsx` |
| hilfe/wareneingang-buchen | veraltet | „Einkaufspreis (EK)“ → **„Einkaufspreis (EK, optional)“**; ergänzen: **„Beleg scannen“** im Wareneingang (Beleg fotografieren, erkannte Positionen antippen); mobil „Zubuchen“; Reiter „Bestellungen“, „Meldungen“. | `StockMovementDialog.tsx` Z. 308; `src/pages/Lager.tsx`; mobile `inventory.addStock` |
| hilfe/abnahme-dokumentieren | veraltet + Erweiterung | **Teilabnahme fehlt** (D-19): Mobile „Art der Abnahme“ Teilabnahme/Endabnahme, Abschnitt „Abgenommene Arbeitsabschnitte“ (Arbeitsschritte-Stand wird gespeichert), „Allgemeine Abnahme-Vorlage verwenden“, nach beidseitiger Unterschrift gesperrt; Web „Teilabnahme“/„Schlussabnahme“, „Abnahme durchführen“, PDF-Vorschau; Schlussrechnung erst nach Abnahme; Abschlag aus Teilabnahme. Unterschiedliche Bezeichnungen konkret nennen (Endabnahme mobil = Schlussabnahme web). | mobile `acceptance.json` (`protocolType.partial`, `form.scopeSection`, `detail.lockedHint`); web `bauakte/AcceptanceSection.tsx`, `src/api/acceptanceScopes.ts` |
| hilfe/bautagesbericht-erstellen | ok | Berichtsarten ergänzen (mobil Tagesbericht/Stundenbericht/Bedenkenanzeige; web Bautagesbericht/Regiebericht/Bedenkenanzeige/eigene Vorlage) und auf Wissensseiten verlinken. | mobile `construction.json`; web `reportTypeMeta.ts` |
| hilfe/mangel-erfassen-bearbeiten | ok | Begriffe belegt („Neuen Mangel erfassen“, „Zu erledigen bis“, „Zuständig“, „Behoben“, „Geprüft“). | mobile `defects.json`; web `bauakte/DefectsBoard.tsx` |
| hilfe/craft-ai-betriebsdaten-fragen | ok | bereits 2026-10-20 überarbeitet; nur Gliederung/Lizenzbegriff. | `src/components/layout/MainLayout.tsx` (KI-Assistent-Panel) |
| hilfe/ki-entwurf-pruefen-uebernehmen | ok | nur Gliederung; Negativsatz „nicht autonom festgeschrieben“ positiv (L-1). | — |

**Zusammenfassung Status (64):** falsch 9 (blog/digitale-projektakte; hilfe/mitarbeiter-einladen-lizenz-zuweisen, rollen-zugriffsrechte-einstellen, gaeb-importieren, plantafel-einsatz-planen, planung-mitarbeiter-ressourcen, projekt-phasen-anlegen, projektdateien-ordner, zeiteintrag-erfassen-korrigieren), veraltet 25 (b 8, c 7, d 7, e 3), ok 30 (b 4, c 4, d 11, e 11), nicht-live 0. [VERIFIED: Release-Pfade wie angegeben; Einstufung ok = „kein Widerspruch gefunden“, MEDIUM für vollständige Schrittfolgen, die der Executor im Release nachliest]

## Neue Hilfeartikel (Paket f) – Abläufe am Release

Alle Pfade Web = `C:/Projekte/craft-connect-buddy` @ `a9319e5`, Mobile = `C:/Projekte/CraftOS - Mobile/craftos-mobile` @ `6cac366`. Rollen-Namen laut `src/lib/subscription/roles.ts`.

| # | Slug-Empfehlung | Kategorie | Hauptkeyword (SE Ranking DE, 22.10.2026) | Ablauf (belegt) | Rollen/Lizenz | Grenzen positiv (L-1) | Beleg |
|---|---|---|---|---|---|---|---|
| 1 | `kundenportal-kunden-einladen` | angebote | keins belegt (Kandidaten ohne Daten; „kundenportal software“ 110/KD 13 gehört `/funktionen/kundenportal`) → beschreibende Zielwerte | Kunde mit E-Mail im Kundenstamm → Karte „Kundenportal“ → „Zum Kundenportal einladen“ → Dialog (Kunde, „Empfänger-E-Mail“) → „Einladung senden“ (gültig 14 Tage; erneutes Einladen macht alten Link ungültig) → Status „Noch nicht eingeladen“/„Eingeladen“/„Einladung abgelaufen“/„Aktiv“/„Zugang entzogen“; Kunde meldet sich mit Code an; sieht „Ihre Unterlagen“, Angebote (online unterschreiben), Rechnungen, „Meine Termine“, Projekt-Chat „Nachrichten“; Vorschau „Kundenportal-Vorschau“; „Zugang entziehen“; Dateien mit Sichtbarkeit „Für Kunde“ | berechtigte Büro-/Admin-Zugänge im Kundenstamm; Kunde eigener Login | Rechnungen begleicht der Kunde per Überweisung auf das Konto des Rechnungs-PDF; Portal zeigt übermittelte Belege im erlaubten Projektumfang | web `src/components/customers/CustomerPortalInviteDialog.tsx`, `CustomerPortalAccessCard.tsx`, `src/pages/CustomerPortalPreview.tsx`, `src/pages/portal/*`, `src/components/portal/PortalPaymentNotice.tsx` |
| 2 | `angebot-online-unterschreiben-lassen` | angebote | keins belegt → beschreibend | Angebot fertig → „Senden“ (E-Mail mit PDF-Anhang + „persönlicher Link zum Online-Unterschreiben (30 Tage gültig, am Handy auch per QR-Code)“) → in der Angebotsansicht „Online-Unterschrift“: Status „wartet auf Unterschrift“, „Erneut senden“, „Link kopieren“, „Neue Fassung senden“ bei Änderung; Kunde: „Angebot annehmen und unterschreiben“ (Vor- und Nachname, Unterschrift, Kommentar optional, Standort freiwillig) oder „Angebot ablehnen“; Nachweis: „Digital unterschrieben“, „Unterschriebene PDF“, „Versandte Fassung“, IP-Adresse, Gerät, Prüfwert SHA-256; vor Ort alternativ mobil Kachel „Unterschrift – Dokument unterschreiben“ | Büro/Admin mit Dokumentrechten; Kunde ohne Konto | Link gilt 30 Tage; nach Änderung neue Fassung senden | web `SendDocumentDialog.tsx` Z. 617–628, `src/components/documents/QuoteSignatureEvidence.tsx`, `QuoteSigningOfficeActions.tsx`, `src/pages/QuoteSigning.tsx`; mobile `features/documents/screens/DocumentSignScreen.tsx` |
| 3 | `mahnwesen-einrichten` (statt Arbeitsslug `mahnwesen-zahlungserinnerungen`) | rechnungen | **„mahnstufen“ 170, KD 8** (frei in der Map); sekundär „mahnlauf“ 140/KD 7 | Einstellungen → „Mahnwesen“ → „Mahn-Fristen“: je Stufe (Zahlungserinnerung, 1. Mahnung, 2. Mahnung) „Tage überfällig“, „Mahngebühr“, „Stufe aktiv“; „Verzugszinssatz (jährlich)“, „Rechtliche Vorschläge übernehmen“ → „Mahn-Vorlagen“ (Betreff/Text je Stufe, Platzhalter per Klick) → „Einstellungen speichern“ → „Automatische Mahnungen einschalten?“ mit Vorschau der nächsten Mahnungen → „Einschalten“; an der Rechnung „Mahnverlauf“ (Geplant/Gesendet/Abgebrochen/Pausiert, „Mahnschreiben öffnen“, „Stufe abbrechen“) | Admin/Büro mit Einstellungszugriff; Fristen, Gebühren, Stufen und Vorlagen ändert nur der Inhaber | Automatik mahnt normale Rechnungen; Abschlags- und Schlussrechnungen begleiten Sie über den Zahlungsstand (positiv formulieren, L-1) | web `src/pages/settings/MahnwesenSettings.tsx` (STAGE_LABELS Z. 54–57), `ReminderHistory.tsx`, `InvoiceReminderStatus.tsx`, `supabase/functions/send-invoice-reminders/index.ts` |
| 4 | `bankumsaetze-abgleichen` | belege | **„camt 053“ 390, KD 13** (frei); sekundär „zahlungsabgleich“ ist schon `/funktionen/bankabgleich` | Buchhaltung → „Bankumsätze“ → „Bankdatei importieren“ (CSV, camt.053 bis 2 MiB, PDF bis 10 MiB, höchstens 2.000 Umsätze, EUR-Konten; CSV-Spalten/Format prüfen; „Vorschau geprüft …“ bestätigen; „Umsätze importieren“) → Umsatz öffnen → „Bankumsatz zuordnen“ (Beleg oder Zahlung suchen; „Zahlung aus Bankumsatz erfassen“ / „Bestehende Zahlung verknüpfen“; „Zuordnung bestätigen“) → Status „Vollständig zugeordnet“; „Zurücknehmen“ mit Grund; optional „KI-Vorschläge aktivieren und Credit-Verbrauch bestätigen“, PDF-Auszug „mit KI auslesen“ | Finanzbereich: Admin; Büro nur mit Finanzfreigabe (Büro-Leitung) | CSV und camt.053 ohne Credits; KI auf Anforderung gegen Credits; Zuordnung bestätigen Sie selbst; Import allein erfasst keine Zahlung | web `src/pages/Bankumsaetze.tsx`, `src/components/buchhaltung/BankImportDialog.tsx`, `BankAllocationDialog.tsx`, `src/components/eingangsrechnungen/ExpensePaymentReconciliationPanel.tsx` |
| 5 | `daten-importieren` | einrichtung | **„datenübernahme“ 110, KD 9** (frei; „datenimport“/„daten importieren“ belegt `/funktionen/datenuebernahme`) | Einstellungen → „Daten importieren mit KI“ (Route `/daten-uebernehmen`) bzw. „Kunden importieren“/„Projekte importieren“/„Stammdaten importieren“ → Datenbestand wählen („Name des bisherigen Datenbestands“, „Bisherige Software (optional)“) → „Dateien auswählen“ (CSV, TSV, TXT, XLSX, flache JSON/XML, vCard; bis 10 MiB je Datei, 30 MiB zusammen) → „Kostenlos mit KI zuordnen“ → „Spaltenzuordnung und Vorschau“, Dubletten („Neu anlegen“/„Überspringen“/„Vorhandenen Datensatz ändern“) → „Import starten“ → „Übernahme abgeschlossen“; „Rücknahme prüfen“ → „Rücknahme bestätigen“ | Admin oder Büro-Leitung („Für den Datenimport brauchst du die Rolle Admin oder Büro-Leitung.“) | Import-KI kostenlos, ohne Zahlungsdaten; an das Modell gehen nur Spaltenüberschriften und Statistiken; DATANORM, GAEB und Bankdateien öffnen Sie im jeweiligen Fachimport | web `src/pages/Datenimport.tsx`, `src/components/import/ImportWizard.tsx`, `UniversalImport.tsx`, `ImportReview.tsx`, `ImportResult.tsx`, `src/lib/import/importAccess.ts` |
| 6 | `datanorm-katalog-importieren` | lager | **„datanorm“ 390, KD 18** (frei); sekundär „datanorm datei“ 140/KD 11 | Stammdaten → Reiter „Kataloge“ → „DATANORM importieren“ → „Datanorm-Import“: Dateien wählen (.001–.999, .DAT, .WRG, .RAB; Datanorm 4.0 und 5.0; CP850, ISO-8859-1 oder UTF-8 wird erkannt) → „Katalogname (Lieferant)“ → optional „Rabattdatei hinzufügen (DATANORM.RAB)“ → „Preise übernehmen“ → „Artikelvorschau“ → Import („… Artikel importiert“); danach in der Suche des Beleg-Editors; „Artikel ansehen“ übernimmt markierte Katalogartikel in eigene Artikel; erneuter Import aktualisiert ohne Dubletten | Admin; Büro mit „Alle Projekte sehen“ (Import-Kontext Stammdaten) | nur positiv: „liest DATANORM 4 und DATANORM 5“ (Inhaber 22.10.) | web `src/components/documents/DatanormImportDialog.tsx`, `src/pages/Stammdaten.tsx` Z. 235–244, 586–590, `src/lib/datanorm/datanormParser.ts`, `src/api/datanormCatalogs.ts`, `src/lib/import/importAccess.ts` |
| 7 | `lager-scan-app` | lager | **„lager app“ 90, KD 14** (frei; „lagerverwaltung app“ gehört `/funktionen/lager`) | Mobile: Mehr → „Lager“ → „Barcode scannen“ (oder „Barcode fotografieren“/manuelle Eingabe) → Artikel/Werkzeug → „Bestand nach Lagerort“ → „Ausgabe, Rücknahme oder Bewegung“ → „Bewegung prüfen“ (Aktion, Projekt, Ziellager, Menge/volle Packungen, Notiz) → „Buchung bestätigen“; Zugang „Zubuchen“; Neues erfassen „Lagerbestand erfassen“ mit optionaler „Foto mit KI erkennen“ (bis zu 2 Betriebscredits) | Mitarbeitende mit Lagerfreigabe (App-Lizenz möglich, freigegebene Lager) | Ohne Netz: Buchung „Auf Gerät vorgemerkt“, Server prüft Bestand nach der Verbindung | mobile `features/inventory/screens/InventoryScreen.tsx`, `InventoryScanScreen.tsx`, `shared/lib/navigation.ts` Z. 74, 114–115, `shared/i18n/locales/de/common.json` `inventory.*`; web `src/api/goodsReceipt.ts` |
| 8 | `besichtigung-durchfuehren` | baudokumentation | keins (einziger Treffer „baustellenbegehung“ 210/KD 8 hat anderen Intent) → beschreibend | Mobile: Projekt → Kachel „Besichtigung“ → „Foto aufnehmen“ / „Foto aus Mediathek wählen“, „Video & Sprachnotiz“ (Video bis etwa 3 Minuten, 500 MB), „Datei hinzufügen“ (PDF bis 100 MiB), „Notiz“ je Aufnahme → Upload; ohne Netz „Auf Gerät sichern“ / „Jetzt hochladen“; Web: Projekt → „Dateien“ → Ordner „Besichtigung“ → „KI-Angebot aus Besichtigung“ (nutzt Fotos, PDF, Sprachnotizen, Notizen) | Projektzugriff; KI-Angebot nach KI-Freigabe | nur Unterstütztes nennen: Fotos, PDF, Sprachnotizen und Notizen fließen ins KI-Angebot; **Videoauswertung nicht erwähnen** (Register `notLive` „Videoanalyse (Web)“; `availability.ts` „Bald verfügbar“) | mobile `features/site-visit/screens/SiteVisitScreen.tsx`, `projects.json` `siteVisit.*`; web `src/lib/besichtigung.ts`, `src/components/projects/BesichtigungHeader.tsx` |
| 9 | `projekt-chat-nachrichten` | projekte | keins („baustellenkommunikation“ schon in der Map) → beschreibend | Mobile: Projekt → Kachel „Chat – Projekt-Nachrichten“ → „Projekt-Chat“: „Nachricht schreiben …“, „Foto anhängen“ (Kamera/Galerie, Datei bis 50 MB), „Senden“; Direktnachricht: Mehr → „Nachrichten“ → „Neue Nachricht“ → „Kollege auswählen“; Nachrichtenaktionen „Text kopieren“, „Nachricht löschen“; Kundenportal-Kunden schreiben im Portal-„Projekt-Chat“ | Mitarbeitende, die dem Projekt zugeordnet sind („Sobald dir ein Einsatz auf diesem Projekt zugewiesen wird, kannst du hier mitschreiben.“) | Ohne Netz: „Nachricht wird gesendet, sobald wieder Verbindung besteht.“; neue Direktunterhaltung braucht Verbindung | mobile `features/chat/screens/ChatScreen.tsx`, `features/messages/screens/InboxScreen.tsx`, `DirectChatScreen.tsx`, `chat.json`, `messages.json`; web `src/pages/portal/CustomerMessages.tsx` |
| 10 | `app-sprache-einstellen` | einrichtung | keins („app sprache ändern“ 110/KD 10 ist generischer Intent) → beschreibend | Mobile: Mehr → „Einstellungen“ → „Sprache / Language“ → „Sprache suchen“ → Sprache wählen (21 Sprachen: bg, bs, cs, de, el, en, es, fr, hr, hu, it, pl, pt, ro, ru, sk, sq, sr-cyrl, sr-latn, tr, uk); Büro setzt Vorgabe beim Anlegen: „Sprache (App-Vorgabe)“ – „Vorgabe für die Mobile-App; der Mitarbeiter kann sie nach dem Einloggen überschreiben.“ | jede App-Nutzerin; Vorgabe: Inhaber/Admin beim Anlegen | Web-App und Dokumente bleiben Deutsch (nicht als Negativsatz, sondern „Die Mobile-App zeigt …“) | mobile `settings.json` `language.*`, `src/shared/i18n/locales/` (21 Ordner); web `NewTeamMemberDialog.tsx`; Register `mobileLocales` |

**Erweiterungen in Paket (e):** Teilabnahme in `abnahme-dokumentieren` und Arbeitsabschnitte/App-Anzeige in `projekt-phasen-anlegen` – Inhalte siehe Paket-(e)-Tabelle. Beide sind gleichzeitig `falsch`/`veraltet` und werden in einem Durchgang korrigiert.

**Verlinkung (D-21) – Korrektur nach Release-Code der Website:** Die Zusatz-Kacheln für Teilfunktionen existieren bereits und sitzen teilweise auf anderen Detailseiten als in D-21 angenommen [VERIFIED: `craftos/lib/funktionsdetails/*.ts`, `tests/funktionsdetails.test.ts`]:

| Teilfunktion | Vorhandene Zusatz-Kachel (`zusatz:`) | D-21 sagt | Empfehlung |
|---|---|---|---|
| Angebotsunterschrift | `angebot.ts` Z. 100 auf `angebote` | `angebote` oder `kundenportal` | `href: "/hilfe/angebot-online-unterschreiben-lassen"` an diese Kachel |
| Besichtigung | `angebot.ts` Z. 203 auf **`aufmass`** | `baudokumentation` | Kachel auf `aufmass` verlinken (keine neue Kachel auf `baudokumentation`) – Abweichung von D-21 im Plan begründen |
| Lager-Scan | `baustelle.ts` Z. 308 auf `lager` | `lager` | `href` an diese Kachel |
| Projekt-Chat | `planung.ts` Z. 220 auf **`projektverwaltung`** | `team` und `/app` | Kachel auf `projektverwaltung` + Link in `lib/app-content.ts` |
| Sprachen | `team.ts` Z. 78 auf `team` | `/app` | Kachel auf `team` + Link in `lib/app-content.ts` |
| DATANORM | keine | `gaeb` | neue Kernpunkt-Kachel oder Kachel-`href` auf `gaeb` |
| Sekundärlinks | `kundenportal`, `mahnwesen`, `bankabgleich`, `datenuebernahme` heute `ALLE` | „Anleitung in der Hilfe“ | wie D-21; zusätzlich frei: `arbeitsanweisungen`, `nachkalkulation`, `dashboard` bleiben `ALLE` |

Zusätzlich: `lib/funktionen.ts` `help`-Feld (`helpSlug`) ist am Website-Code **nirgends gelesen** (grep: nur Definition) – keine Verdrahtung nötig; wer es pflegt, setzt mahnwesen/bankabgleich/datenuebernahme/kundenportal/gaeb auf die neuen Slugs (optional, Paket f).

## Gewerke (Paket a)

### Datenbefund `lib/gewerke.ts`
- `hatVorlagen: true` bei elektriker, shk, maler, tischler-schreiner, allrounder speist FAQ „CraftOS enthält vorbereitete Leistungsvorlagen für dieses Gewerk“ und den Hinweis in `app/gewerke/[slug]/page.tsx` Z. 52–56. Am Release gibt es `trade_templates` mit genau diesen fünf Gewerken (`src/hooks/useTradeTemplates.ts` `TRADE_TYPES`: electrician, plumber, painter, carpenter, handyman), aber **keine UI nutzt den Hook**; einziger Leser ist `supabase/functions/generate-offer/index.ts` (KI-Angebot) [VERIFIED: grep Release]. → **Zusage nicht belegt**; Feld entfernen oder FAQ umformulieren auf Belegtes: „Eigene Leistungen und Artikel legen Sie in den Stammdaten an; Artikel aus DATANORM-Katalogen Ihres Großhändlers übernehmen Sie; die Einrichtung fragt Ihr Gewerk ab“ (Setup-Liste mit 30+ Gewerken in `src/components/onboarding/SetupWizard.tsx`; Arbeitsabschnitte haben ein Gewerk, `src/hooks/useProjectPhases.ts` Z. 184 ff.; Einstellungen „Einheiten & Gewerke“).
- Heutige FAQ: zwei identische Fragen für alle 12 Seiten (Duplicate Content) [VERIFIED: `lib/gewerke.ts` Z. 169–180].
- `heroTitle` wird nicht mehr gerendert (H1 aus `zielwerte`) – Entfernen gefahrlos; alle 12 Map-Einträge haben `target.h1` [VERIFIED: keyword-map.json].
- `app/sitemap.ts`: neben `"/gewerke": "2026-10-20"` (Z. 16) steht **für alle Gewerke-Detailseiten fest `"2026-09-09"`** (Z. 56–59) → (a) ändert beide Stellen.

### Ablauf je Gewerk (Vorschlag, jeder Schritt mit belegtem Funktions-Slug)

| Gewerk | 4–5 Schritte (Funktions-Slug) | Funktionen (4–6, ≥ 1 Phase-7) | FAQ-Themen (3–4) | Artikel-Links |
|---|---|---|---|---|
| elektriker | Material aus DATANORM-Katalog ins Angebot (gaeb) → Einsatz planen (plantafel) → Zeit am Projekt per Timer (zeiterfassung) → Material per Scan entnehmen (lager) → Rechnung und Mahnung (rechnungen/mahnwesen) | angebote, gaeb, plantafel, zeiterfassung, lager, mahnwesen | DATANORM 4/5 einlesen? Material vom Lager auf den Auftrag? Monteur-App? | datanorm-katalog-importieren, plantafel-einsatz-planen, lager-scan-app |
| shk | Besichtigung mit Fotos (aufmass) → Angebot + Online-Unterschrift (angebote) → Arbeitsabschnitte Rückbau/Installation/Endmontage (terminplanung) → Teilabnahme (baudokumentation) → Abschlagsrechnung (rechnungen) | angebote, gaeb, terminplanung, baudokumentation, rechnungen, lager | Abschläge je Bauabschnitt? Kunde unterschreibt online? Großhandelskatalog? | angebot-online-unterschreiben-lassen, abnahme-dokumentieren, abschlagsrechnung-erstellen |
| maler | Raumaufmaß (aufmass) → Positionen ins Angebot (angebote) → Einsatz planen (plantafel) → Bautagesbericht mit Fotos (baudokumentation) → Nachkalkulation (nachkalkulation) | aufmass, angebote, plantafel, baudokumentation, maengelmanagement, nachkalkulation | Wand- und Deckenflächen mit Abzügen? Mängel nach Übergabe? Stundenabweichung erkennen? | raumaufmass-angebot-uebernehmen, mangel-erfassen-bearbeiten, blog/aufmass-angebot-mengen-abzuege |
| tischler-schreiner | Aufmaß vor Ort (aufmass) → Kalkulation Material/Fertigung (angebote) → Arbeitsanweisungen für Werkstatt/Montage (arbeitsanweisungen) → Zeiten Werkstatt und Montage (zeiterfassung) → Nachkalkulation (nachkalkulation) | angebote, arbeitsanweisungen, zeiterfassung, lager, nachkalkulation, terminplanung | Werkstatt- und Montagezeit getrennt? Materialliste ohne Preise? Nachkalkulation? | position-tiefenkalkulieren, blog/tiefenkalkulation-handwerk |
| dachdecker | Besichtigung (aufmass) → LV per GAEB (gaeb) → Arbeitsabschnitte (terminplanung) → Bautagesbericht/Regiebericht (baudokumentation) → Abnahme und Schlussrechnung (rechnungen) | angebote, gaeb, terminplanung, plantafel, baudokumentation, rechnungen | GAEB-Ausschreibung bepreisen (X84)? Gerüst/Fahrzeuge planen? Zusatzarbeiten dokumentieren? | gaeb-importieren, regiebericht, schlussrechnung-erstellen |
| fliesenleger | Raumaufmaß (aufmass) → Angebot mit Verschnitt (angebote) → Material buchen (lager) → Mängel vor Übergabe (maengelmanagement) → Rechnung (rechnungen) | aufmass, angebote, lager, maengelmanagement, baudokumentation | Verschnitt kalkulieren? Abdichtung dokumentieren? Restmaterial zurückbuchen? | raumaufmass-angebot-uebernehmen, material-entnehmen-zurueckbuchen |
| zimmerer | LV/Angebot (gaeb) → Arbeitsabschnitte Fertigung/Montage (terminplanung) → Kran/Fahrzeuge einplanen (plantafel) → Material (lager) → Nachkalkulation | gaeb, terminplanung, plantafel, lager, nachkalkulation, projektverwaltung | Fertigung und Montage planen? Geräte disponieren? Kosten je Abschnitt? | projekt-phasen-anlegen, planung-mitarbeiter-ressourcen |
| galabau | Besichtigung (aufmass) → Angebot (angebote) → Team und Geräte (plantafel) → Bautagesbericht/Regiebericht (baudokumentation) → Nachkalkulation | angebote, plantafel, baudokumentation, lager, nachkalkulation, aufmass | Geräte-Einsätze? Regiearbeiten abrechnen? Materialverbrauch? | planung-mitarbeiter-ressourcen, berichte-abrechnen |
| trockenbau | Aufmaß (aufmass) → LV per GAEB (gaeb) → Arbeitsabschnitte (terminplanung) → Mängel (maengelmanagement) → Abnahme/Schlussrechnung (rechnungen) | aufmass, gaeb, terminplanung, maengelmanagement, baudokumentation, rechnungen | GAEB-LV importieren? Gewerkeabschnitte? Mängelliste vor Abnahme? | gaeb-importieren, mangel-erfassen-bearbeiten |
| metallbau | Kalkulation Profile/Beschläge (angebote) → Arbeitsanweisungen (arbeitsanweisungen) → Zeiten Werkstatt/Montage (zeiterfassung) → Material (lager) → Nachkalkulation | angebote, arbeitsanweisungen, zeiterfassung, lager, nachkalkulation, gaeb | Werkstattzeit auf den Auftrag? Zeichnungen/Dateien beim Projekt? Material per Scan? | projektdateien-ordner, lager-scan-app |
| bauunternehmen | LV per GAEB (gaeb) → Terminplanung mit Abschnitten (terminplanung) → Bautagesbericht (baudokumentation) → Mängelmanagement (maengelmanagement) → Abschläge und Schlussrechnung (rechnungen) | gaeb, terminplanung, baudokumentation, maengelmanagement, rechnungen, kundenportal | Bauzeitenplan? Teilabnahmen? Bauherr im Kundenportal? | projekt-phasen-anlegen, abnahme-dokumentieren, blog/bauablaufplan |
| allrounder | Einsatz planen (plantafel) → Zeit per Timer (zeiterfassung) → Bericht/Stundenbericht (baudokumentation) → Rechnung (rechnungen) → Mahnwesen (mahnwesen) | plantafel, zeiterfassung, baudokumentation, rechnungen, mahnwesen, kundenportal | Viele kleine Einsätze planen? Stunden abrechnen? Zahlungserinnerungen automatisch? | plantafel-einsatz-planen, mahnwesen-einrichten, berichte-abrechnen |

Fachliche Zuordnung je Gewerk ist [ASSUMED] (Branchenkenntnis); jede genannte Funktion ist am Release belegt (Register-Evidence). Jede Seite enthält ≥ 1 Phase-7-Seite.

### Wiederverwendbare Bausteine
- `components/v2`: StepFlow (Maßkette), FeatureCard/FeatureList, FactList, FaqList (`answerMax`), CtaBand, Breadcrumbs, SectionHeader (Frage-Titel + Antwort-Lead), BentoGrid, KeyFacts, FitPanels, BrowserFrame/PhoneFrame/DevicePair + MiniUi, IllustrationLabel, SceneContent [VERIFIED: Dateiliste].
- `lib/scenes.ts`: 28 benannte Exporte `…Scene` (plantafel, zeiten, maengel, aufmass, rechnungen, einsaetze, dashboard, projekte, angebot, eRechnung, buchhaltung, beleg, lager, bautagesberichte, arbeitsschritte, mitarbeiter, kalkulation, portal, gaeb, mahnwesen, projektplan, arbeitsabschnitte, bank, import, maengelStatus, urlaub, abnahme, lagerApp) plus `allScenes`, `kopfVisuals`, `cardScenes` (nach Funktions-Slug) [VERIFIED]. **Es gibt keine String-ID je Szene** → für Frontmatter `scene: <id>` braucht das Fundament eine additive Registry (z. B. `sceneById` mit Schlüssel = Exportname ohne „Scene“) und eine Validierung in `lib/content.ts`.
- FeatureSnippet + `tradeSnippetExamples` (12 Gewerke) bleibt das einzige animierte Element (D-06).

## SEO-09-Wissensseiten (Paket g)

- Alle 9 Map-Einträge haben bereits **vollständige `target`** (Titel, H1, Description) – durch 08-04 sitewide ergänzt [VERIFIED: keyword-map.json]. D-24 „bislang fehlende target-Werte“ → RESOLVED, keine Arbeit im Fundament nötig außer Status/Phase.

| Pfad | Keyword (Vol./KD) | H1 aus Map | Produktbeleg (Release) | Fragen-Daten 22.10.2026 | Quellen-Kandidaten |
|---|---|---|---|---|---|
| /hilfe/leistungszeitraum-rechnung | leistungszeitraum rechnung 390/8 | Leistungszeitraum und Leistungsdatum auf der Rechnung | Editor-Hinweis „Pflichtangaben … Leistungszeitraum oder Ersatzsatz“, Vorbelegung aus Berichtstagen (`DocumentCanvas.tsx` Z. 1588, `baudoku/ReportInvoiceDialog.tsx` Z. 282) | „was zählt rechnungsdatum oder leistungsdatum steuererklärung“ (20) | § 14 Abs. 4 Nr. 6 UStG (gesetze-im-internet.de/ustg_1980/__14.html, HTTP 200) |
| /hilfe/regiebericht | regiebericht 390/4 | Regiebericht schreiben und abrechnen | Web Berichtsart „Regiebericht – Zusatzarbeiten & Stunden“, mobil „Stundenbericht“; „Rechnung aus Bericht erstellen“ | ähnliche: regiebericht vorlage 210, regieberichte vorlagen 210, regiebericht vorlage pdf 110, regiebericht handwerk 70 | VOB/B § 15 (Stundenlohnarbeiten) [ASSUMED Paragraph]; Vorlage als HTML-Tabelle (D-23) |
| /hilfe/bedenkenanzeige | bedenkenanzeige 390/7 | Bedenkenanzeige schreiben und dokumentieren | Berichtsart „Bedenkenanzeige – Rechtliche Bedenkenmeldung“ (web + mobil) | ähnliche: bedenkenanzeige vob 140, bedenkenanzeige vorlage 70, nach vob 50, bgb 20 | VOB/B § 4 Abs. 3 [ASSUMED Paragraph]; BGB-Bezug prüfen |
| /blog/maengelanzeige | mängelanzeige 810/8 | Mängelanzeige: richtig reagieren als Handwerksbetrieb | kein Dokumentbeleg → nur Mängelmanagement verlinken (D-23) | „was muss eine mängelanzeige enthalten“, „wie schreibe ich eine mängelanzeige“ | §§ 634 ff., 640 BGB (HTTP 200); VOB/B § 13 [ASSUMED] |
| /blog/reverse-charge-bauleistungen | reverse charge rechnungsstellung 590/9 | Reverse Charge bei Bauleistungen richtig abrechnen | Dokumentfeld `is_reverse_charge` (Steuer 0, Summen) in `DocumentCanvas.tsx`/`DocumentEditor.tsx`; DATEV-Schlüssel „§13b“ in `datev/DatevAccountMappings.tsx`; **sichtbare UI-Bezeichnung am Editor nicht gefunden** → Executor prüft Label/PDF-Hinweistext | „wann reverse charge und wann innergemeinschaftliche lieferung“ (10); übrige Treffer fachfremd | § 13b UStG, § 14a Abs. 5 UStG (HTTP 200); BMF-UStAE 13b.1 [ASSUMED URL] |
| /blog/materialliste-vorlage | materialliste vorlage 210/8 | Materialliste für Baustelle und Auftrag erstellen | „Materialliste drucken (ohne Preise)“ am Angebot/Auftrag (`documents/MaterialListMenuItem.tsx`, `projects/ProjectDocumentsTab.tsx` Z. 254) | keine | keine Rechtsquelle nötig; Checkliste/Tabelle im Artikel |
| /blog/gaeb-formate | gaeb formate 590/12 | GAEB-Formate verstehen: welche Datei wofür? | Import X83 (GAEB DA XML 3.2/3.3), Export X83/X84 | „was ist gaeb d83“, „was bedeutet gaeb d83“, „was ist ein gaeb format“, „was ist eine gaeb x83 datei“, „wie kann ich eine gaeb datei öffnen“, „welche gaeb formate gibt es“ | gaeb.de Datenaustausch (HTTP 200) |
| /blog/bauablaufplan | bauablaufplan 390/10 | Bauablaufplan und Bauzeitenplan erstellen | Terminplanung mit Arbeitsabschnitten, Abhängigkeiten, Zeitleiste | Bauzeitenplan: „was gehört in einen bauzeitenplan“, „wer muss den bauzeitenplan erstellen“, „ist ein bauzeitenplan verpflichtend“, „wie erstelle ich einen bauzeitenplan“ | VOB/B § 5 (Ausführungsfristen) [ASSUMED] |
| /blog/arbeitszeitnachweis-vorlage | arbeitszeitnachweis vorlagen 480/8 | Arbeitszeitnachweis: Vorlage oder App? | Zeiterfassung, Export CSV/Excel, Zeiten-Nachweis im Steuerberater-Paket | „wie sieht ein arbeitszeitnachweis aus“ | § 16 Abs. 2 ArbZG, § 17 MiLoG (HTTP 200); BAG 13.09.2022 – 1 ABR 22/21 [ASSUMED] |

Hinweis L-1 für `/blog/gaeb-formate`: Eine neutrale Fachübersicht der GAEB-Formate (GAEB 90/2000/DA XML, Phasen 81–86) ist Wissensinhalt; der CraftOS-Abschnitt nennt ausschließlich Unterstütztes (Import X83 DA XML 3.2/3.3, Export X83 und X84). Ob die Fachübersicht D83 nennen darf → Open Question 1.

## Keyword-Daten und SE-Ranking-Verbrauch

| Block | Endpunkt (MCP) | Units vorher | Units nachher | Verbrauch | Rohdaten |
|---|---|---|---|---|---|
| Metriken (74 Kandidaten in 12 Gruppen) | `DATA_getKeywordsMetrics` source=de | 34.671 | 34.671 (verzögert verbucht) | – | `craftos/docs/seo/data/2026-10-22-keyword-metrics-phase09.json` |
| Fragen (12 Seeds, limit 10) + ähnliche (2 Seeds, limit 10) | `DATA_getKeywordQuestions`, `DATA_getSimilarKeywords` | 34.671 | 33.921 | – | `craftos/docs/seo/data/2026-10-22-keyword-questions-phase09.json` |
| **Summe Research** | 31 MCP-Aufrufe | **34.671** | **33.921** (zweite Abfrage bestätigt) | **750 Units** | — |

Kontingent 100.000, Testzugang bis 2026-11-03 17:22 [VERIFIED: `DATA_getSubscription`]. Budget-Rest für Phase 9 laut D-25 (~4.000): ~3.250; Integration/Rollout brauchen `se-ranking-sync.mjs --check` und einen Bericht. Schlüssel nie ausgegeben.

**Ergebnis Metriken (Auswahl, alle mit Volumen):** mahnstufen 170/KD 8, mahnlauf 140/7, mahnwesen software 40/8, automatisches mahnwesen 10/9; camt 053 390/13, zahlungsabgleich 20/8; datenübernahme 110/9, datenimport 90/8, daten importieren 70/10; datanorm 390/18, datanorm datei 140/11, datanorm katalog 30/12, datanorm 5 30/0, datanorm import 20/7; lagerverwaltung app 210/14, lager app 90/14, lagerverwaltung barcode 40/14, werkzeugverwaltung app 30/11, barcode scanner lager 10/6; baustellenbegehung 210/8, baustellenbegehung protokoll 20/7; baustellenkommunikation 50/7; app sprache ändern 110/10; kundenportal software 110/13; branchensoftware handwerk 20/30; schlussrechnung 1.800/71, schlussrechnung erstellen 20/12, schlussrechnung handwerker 10/7, teilabnahme vob 110/9. **Ohne Daten:** alle Kandidaten zu Online-Unterschrift, Besichtigung (außer Begehung), Projekt-Chat, Kundenportal-Einladung, „gewerke software“. [VERIFIED: Rohdaten]

**Map-Empfehlungen (Fundament, D-12/D-27):** 10 neue `geplant`/Phase-9-Einträge mit vollständigem `target`; Hauptkeywords nur für Nr. 3 (mahnstufen), 4 (camt 053), 5 (datenübernahme), 6 (datanorm), 7 (lager app); übrige beschreibend ohne Hauptkeyword (Regel 05-01). „teilabnahme vob“ (110/9) als `secondary` an `/hilfe/abnahme-dokumentieren`. Kannibalisierungsprüfung: alle fünf Hauptkeywords sind heute in keinem Map-Eintrag belegt [VERIFIED: Skript].

## Standard Stack

Keine neuen Pakete. Bestehender Stack [VERIFIED: `craftos/package.json`]:

| Library | Version (package.json) | Zweck in Phase 9 |
|---|---|---|
| next | ^16.1.4 | App Router, `generateStaticParams`, Metadata |
| react / react-dom | ^19.2.3 | Server Components |
| gray-matter | ^4.0.3 | Frontmatter (`answer`, `faq`, `scene`) |
| unified + remark-parse + remark-gfm + remark-rehype + rehype-sanitize + rehype-slug + rehype-stringify | ^11 / ^4 / ^11 / ^6 / ^6 / ^10 | Markdown → sicheres HTML; GFM-Tabellen für „Vorlage“-Artikel |
| tailwindcss / @tailwindcss/typography | ^4.1.18 / ^0.5.20 | v2-Typografie |
| vitest | ^5.0.0 | Unit-Tests |
| @playwright/test + @axe-core/playwright | ^1.63.0 / ^4.13.0 | E2E, Barrierefreiheit |

**Installation:** keine. Worktrees: `npm ci --prefer-offline` unter Sperre (EXECUTOR-RULES).

## Package Legitimacy Audit

Diese Phase installiert keine externen Pakete. **Packages removed:** none. **Flagged:** none.

## Architecture Patterns

### Systemablauf

```
Release-Repos (origin/release, nur lesend)
   │  git show / Prüfdatei je Paket (docs/content-pruefung/09-<x>.md)
   ▼
content/{blog,hilfe}/*.md ──(gray-matter)──► lib/content.ts parseContent
   │   Frontmatter: title, description, category, dates, sources(+checkedAt),
   │   platforms, relatedFeatures/Articles, answer(≤300), faq[], scene(id)
   │        ├─ Validierung: Längen, Kategorie, https-Quellen, scene ∈ sceneById
   │        ▼
   │   renderMarkdown (remark-gfm → sanitize → slug)
   ▼
app/{blog,hilfe}/[slug]/page.tsx ──► components/content/ArticlePage (v2)
   │   H1/Title/Description ◄── docs/seo/keyword-map.json (metaFor/zielwerte)
   │   Brotkrumen ◄── crumbsFor ; FAQPage ◄── faq[] ; OG ◄── Segment-Route
   ▼
next build ──► .next HTML ──► scripts/seo-audit.mjs (answerFirst auch /blog,/hilfe,/gewerke)
                           └► scripts/route-audit.mjs (Links, Flags)
lib/gewerke.ts (ablauf[], faq[], funktionen 4–6) ──► app/gewerke/[slug] (StepFlow + FeatureSnippet)
```

### Struktur (bestehend, keine neuen Ordner außer Prüfdateien)
```
craftos/
├── content/blog/*.md (30 nach Phase 9), content/hilfe/*.md (53)
├── components/content/ (ArticlePage, ContentIndex, ContentSearch)  ← Fundament
├── lib/content.ts, lib/content-types.ts                               ← Fundament
├── lib/scenes.ts (+ sceneById, additiv)                              ← Fundament
├── lib/gewerke.ts, app/gewerke/**                                     ← (a)
├── lib/funktionsdetails/*.ts, lib/app-content.ts                     ← (f)
└── docs/content-pruefung/09-<paket>.md                               ← je Paket
```

### Pattern 1: Frontmatter-Antwort statt Fließtext-Lead
**What:** `answer` (≤ 300, 1–2 Sätze) im Frontmatter, gerendert als `<p id="antwort" data-answer>` im Kopf; der bisherige Lead-Absatz entfällt oder wird zur Einleitung des ersten Abschnitts.
**When:** alle 64 + 19 Artikel. **Warum:** Audit `anchorAnswer`/Prompt-Anker zielen auf `#antwort`; Blog-Leads sind heute 236–383 Zeichen.

### Pattern 2: Antwort-zuerst in Markdown
**What:** Nach jeder `## …?`/`### …?` direkt ein Absatz ≤ 300 Zeichen, **vor** Liste, Tabelle oder Zitat. Die Audit-Regel nimmt das erste `<p>` vor der nächsten Überschrift (`antwortDanach` in `scripts/lib/seo-audit-core.mjs` Z. 172–178) – steht zuerst eine Liste und danach ein Absatz, zählt dieser Absatz; das ist erlaubt, aber nicht „direkt darunter“ im Sinn von D-13.
**Beispiel:**
```markdown
## Wie richten Sie die Mahnstufen ein?

Unter Einstellungen → Mahnwesen legen Sie je Stufe fest, nach wie vielen Tagen Überfälligkeit sie greift und welche Mahngebühr gilt.

1. Öffnen Sie „Einstellungen → Mahnwesen“.
2. …
```

### Pattern 3: Szenen-Registry für Frontmatter
```typescript
// lib/scenes.ts (additiv, Fundament) – Quelle: bestehende Exporte
export const sceneById: Readonly<Record<string, FrameScene>> = {
  plantafel: plantafelScene, zeiten: zeitenScene, maengel: maengelScene, aufmass: aufmassScene,
  /* … alle 28 … */ lagerApp: lagerAppScene,
};
// lib/content.ts: if (data.scene && !(data.scene in sceneById)) throw new Error("Unknown scene in " + slug);
```

### Pattern 4: Mengentest per Map-Bezug (D-27)
```typescript
// tests/content.test.ts (Fundament) – statt toHaveLength(24/40)
const map = keywordMap.filter((e) => /^\/(blog|hilfe)\/[^/]+$/.test(e.path) && !e.path.includes("/kategorie/"));
for (const a of [...blog, ...hilfe]) expect(map.some((e) => e.path === `/${a.kind}/${a.slug}`), a.slug).toBe(true);
for (const e of map.filter((e) => e.status === "bestehend")) expect(files.has(e.path), e.path).toBe(true);
// RSS: Anzahl <item> === Anzahl Ratgeber (statt fest 24)
```

### Anti-Patterns
- **Negativlisten** („wird nicht unterstützt“, „verspricht keine …“) – L-1.
- **Bedienbegriffe aus dem Gedächtnis:** jeder Begriff in „…“ braucht einen Release-Pfad in der Prüfdatei; das Prüfskript (unten) findet Fehlzitate automatisch.
- **Map-Änderungen in Inhaltspaketen** – nur Übergabeliste (D-12).
- **HowTo-Schema** – verboten (D-16).
- **Video-/Besichtigungs-KI überzeichnen** – Videoauswertung ist nicht live.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Titel/H1/Description | eigene Strings in Seiten/Frontmatter | `metaFor`/`zielwerte` aus der Map | einzige Quelle (08-04) |
| FAQ + Schema | eigenes Akkordeon/JSON-LD | `FaqList answerMax={300}` + `faqSchema` | Budget- und Schemakopplung |
| Schrittfolge Gewerke | eigene Liste | `StepFlow` (v2) | Maßketten-Optik, Budgets |
| Schrittliste in Artikeln | Client-Komponente | CSS auf Markdown-`<ol>` (D-17) | keine neue Insel |
| Brotkrumen | manuell | `crumbsFor` + `Breadcrumbs` | BreadcrumbList synchron |
| OG | eigene Bilder | Segment-OG-Routen | automatisch je Slug |
| SE-Ranking-Aufrufe | eigener HTTP-Client | `scripts/lib/se-ranking-mcp.mjs` `createClient` | Backoff, Schlüsselschutz |
| Antwort-Prüfung | eigenes Regex in Tests | `answerFirstViolations`/`anchorAnswer` aus `seo-audit-core.mjs` | identische Regel Build/Test |
| Zitatabgleich gegen Release | Handprüfung | Skript nach Muster `quotes.mjs` (Scratchpad) in `docs/content-pruefung` dokumentieren | 64+19 Artikel, Hunderte Begriffe |

## Runtime State Inventory

Keine Umbenennung/Migration (Slugs bleiben). Nur zur Vollständigkeit:
| Category | Items Found | Action |
|---|---|---|
| Stored data | SE-Ranking-Projekt: neue URLs fehlen im Tracking | Integration/Rollout `se-ranking-sync.mjs --check` (D-25) |
| Live service config | Vercel-Projekt `craftos` – keine Konfig-Änderung | keine |
| OS-registered state | keine – verified (keine Tasks/Dienste der Website) | keine |
| Secrets/env vars | `SE_RANKING_API_KEY` in Repo-Root `.env` (nur gelesen) | keine |
| Build artifacts | `.next` je Worktree; OG-Bilder werden neu erzeugt | Build je Paket unter Sperre |

## Common Pitfalls

### Pitfall 1: Snapshot-Test rot durch Release-Sprung
**What:** `tests/pricing-parity.test.ts` „Snapshot ist aktuell“ vergleicht mit `git rev-parse origin/release` → seit `a9319e5` rot. **Avoid:** Fundament hebt Register `productBasis.web` (tag test.241, commit a9319e5) und Snapshot nach Faktenabgleich (Preise unverändert, Delta nur Zeitkorrektur). **Warning:** Vitest-Lauf in Welle 2 rot ohne eigene Änderung.

### Pitfall 2: Substring-Treffer täuschen Belege vor
**What:** Kurze Begriffe („Speichern“, „Lager“) kommen überall vor; „Eingangsrechnungen“ existiert als Seitenname, ist aber kein Menüpunkt mehr. **Avoid:** Für Navigation immer die Navigationsquelle lesen: `src/components/layout/AppSidebar.tsx` (Übersicht, Neuigkeiten & geplant, Projekte, Plantafel, Einsätze, Dokumente, Rechnungen, Buchhaltung, Zeiten, Stammdaten, Lager, Kunden, Mitarbeiter, Abo, Speicher …), `AccountingNavigation.tsx` (Belege, Bankumsätze, Fristen, Steuerberater), `SettingsSidebar.tsx`, `projectTabs.ts`, Mobile `shared/lib/navigation.ts` (Business: Home/Projekte/Kunden/Mehr; Feld: Einsätze/Zeiten/Projekte/Mehr; Mehr: Lager, Nachrichten, …, Einstellungen).

### Pitfall 3: Antwort-zuerst wird auf Artikel ausgeweitet → Massenverstöße
**What:** Mit D-24 prüft das Audit `/blog/*` und `/hilfe/*`: heute 21 Verstöße in 15 Ratgebern; neue „Häufige Probleme“-Fragen in Hilfeartikeln erzeugen weitere. **Avoid:** Regel im Fundament aktivieren, aber pfadgefiltert (`--paths`) je Paket prüfen; Integration erwartet sitewide 0. Überschriften ohne „?“ („Häufige Fragen“) werden nicht geprüft (Test Z. 299).

### Pitfall 4: Mengentests mit festen Zahlen
**What:** `tests/content.test.ts` Z. 15/16/45 (24/40/24) brechen, sobald (f)/(g) Dateien anlegen. **Avoid:** Fundament stellt auf Map-Bezug um, Integration setzt Endwerte 30/53.

### Pitfall 5: Sitemap-Daten
**What:** Gewerke-Detailseiten haben festes `lastModified "2026-09-09"` (Z. 58), `/blog` und `/hilfe` fallen auf `2026-09-09` zurück (nicht in `pageUpdated`). **Avoid:** (a) ändert `/gewerke` und Z. 58; `/blog`, `/hilfe` setzt die Integration (Besitz in Welle 3).

### Pitfall 6: Rollen- und Lizenzbegriffe vermischt
**What:** Artikel sprechen von „Admin-Lizenz“, „Büro-Lizenz“, „Teamleitung“. Release: 3 Lizenzarten (Admin, Büro, App) und 5 Rollen; Website-Begriff „Voll-Lizenz“. **Avoid:** Lizenz = Voll-Lizenz/App-Lizenz; Rolle = Release-Rollenname; Schalternamen wörtlich („Globale Finanzbereiche“, „Alle Projekte sehen“, „Teamzeiten im Projekt“, „Lagerpreise sehen“).

### Pitfall 7: Web- und Mobile-Bezeichnungen weichen ab
Endabnahme (mobil) = Schlussabnahme (web); Stundenbericht (mobil) = Regiebericht (web); Tagesbericht (mobil) = Bautagesbericht (web). Artikel nennen beide, je Plattformabschnitt.

### Pitfall 8: Release-Sprung während Welle 2
Ein neuer `origin/release` ist nur Delta im Integrationsplan (D-04); Pakete arbeiten auf `a9319e5`/`6cac366`.

### Pitfall 9: KI-/Credit-Aussagen
Bankabgleich-KI, PDF-Auszug, Lager-Foto-KI (bis 2 Betriebscredits), Beleg-KI kosten Credits; Datenübernahme-KI ist kostenlos. Immer „auf Anforderung“ formulieren, nie „automatisch“.

## Code Examples

### Prüfskript-Muster (Zitate gegen Release, je Paket)
```javascript
// Muster aus der Recherche (Scratchpad quotes.mjs): Release per `git archive a9319e5 src supabase/functions` entpacken,
// alle „…“-Begriffe eines Artikels extrahieren, an „→“ teilen und gegen Web-src und Mobile-src (inkl. locales/de) prüfen.
for (const m of txt.matchAll(/„([^“]{2,80})“/g))
  for (const part of m[1].split(/\s*→\s*/)) if (!web.includes(part) && !mob.includes(part)) miss.push(part);
```

### Antwort-zuerst-Ausweitung (Fundament)
```javascript
// scripts/lib/seo-audit-core.mjs, pruefeSeite: statt nur istZentral(path)
const mitAntwortRegel = (p) => istZentral(p) || p === "/gewerke" || /^\/(gewerke|blog|hilfe)\//.test(p);
if (aktiv.has("antwort") && mitAntwortRegel(path))
  for (const v of answerFirstViolations(html)) add("antwort", antwortText(v.q, path), v.problem);
// tests/seo-audit-core.test.ts Z. 361–365: /blog/x, /hilfe/x, /gewerke/maler wandern in die Positivliste
```

## State of the Art

| Alt (Bestand) | Aktuell (Release) | Seit | Wirkung |
|---|---|---|---|
| Web-Zeitkorrektur nur Stunden | Beginn/Ende/Pause (Minuten), Arbeitszeit berechnet | a9319e5 (22.10.2026) | hilfe/zeiteintrag…, blog/projektbezogene… |
| „Phase“ in Terminplanung | „Arbeitsabschnitt“, „Abschnitt anlegen“, Vorschlag aus Angebot | vor 22.10. | projekt-phasen-anlegen, plantafel |
| Menü „Eingangsrechnungen“ | „Buchhaltung → Belege → Eingangsbelege“ | vor 22.10. | 4 Artikel |
| „Ressourcen verwalten“ | „Geräte & Fahrzeuge verwalten“ | vor 22.10. | planung-mitarbeiter-ressourcen |
| Rollen-Schalter „Finanzen sichtbar“ | „Globale Finanzbereiche“ in „Rollen & Rechte“ | vor 22.10. | rollen…, mitarbeiter… |
| DATANORM „v5 nicht zugesagt“ | DATANORM 4 und 5 unterstützt, nur positiv nennen | Inhaber 22.10.2026 (main 2b6cc2f) | alle Texte (L-1) |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Gewerktypische Abläufe/FAQ-Themen je Gewerk (fachliche Auswahl) | Gewerke | Gewerke-Seite wirkt unpassend; Planer/Executor prüft je Gewerk |
| A2 | VOB/B-Paragraphen (§ 4 Abs. 3, § 5, § 13, § 15) für Wissensseiten | SEO-09 | falsche Rechtsquelle → Executor ruft Quelle ab und datiert |
| A3 | BAG-Beschluss 13.09.2022 – 1 ABR 22/21 als Quelle Arbeitszeitnachweis | SEO-09 | Quelle prüfen |
| A4 | „baustellenbegehung“ und „app sprache ändern“ haben anderen Suchintent als die Hilfeartikel | Keyword | verschenktes Keyword; Discretion |
| A5 | Push-Text „Einsatz geändert“ existiert nicht (nur „Einsatz verschoben“ gefunden) | Faktencheck (e) | evtl. dynamisch zusammengesetzt; Executor prüft `send-push-notification` |
| A6 | Reverse-Charge-Bezeichnung im Editor/PDF | SEO-09 | Feld belegt, Label nicht gefunden → Executor sucht Label/PDF-Text |

## Open Questions

1. **Darf `/blog/gaeb-formate` als neutrale Fachübersicht GAEB 90 (D83) und GAEB 2000 nennen?**
   - Wir wissen: L-1 verbietet Aufzählungen nicht unterstützter Formate „für CraftOS“; Nutzerfragen drehen sich um „was ist gaeb d83“.
   - Empfehlung: Ja als Fachwissen ohne CraftOS-Bezug; der CraftOS-Abschnitt nennt nur X83/X84 DA XML. Orchestrator/Inhaber bestätigen.
2. **Negativ formulierte Pflichtfrage auf `/funktionen/kundenportal` („Können Kunden Rechnungen im Portal online bezahlen?“)** – kollidiert mit L-1, liegt aber in `tests/funktionsdetails.test.ts` (Paket f). Empfehlung: (f) prüft eine positive Umformulierung („Wie bezahlen Kunden Rechnungen aus dem Portal?“) und zieht den Test gleich; Entscheidung Orchestrator.
3. **RESOLVED – Fehlende `target`-Werte der 9 Phase-9-Map-Einträge:** sind seit 08-04 vollständig vorhanden; Fundament setzt nur noch neue Einträge und Status.
4. **RESOLVED – Snapshot 535206b:** Preis-Snapshot steht bereits auf `1e9c8bc`; offen ist nur `1e9c8bc → a9319e5` (keine Preisänderung).
5. **RESOLVED – Endgültige Slugs:** Empfehlung oben; einzige Änderung `mahnwesen-zahlungserinnerungen` → `mahnwesen-einrichten` (Keyword „mahnstufen“). Wird die Arbeitsslug beibehalten, entfällt nichts; Querverweise in (b)/(c)/(d) müssen den endgültigen Slug aus dem Fundament nutzen.
6. **RESOLVED – D-21 Kachelorte:** Besichtigung sitzt auf `aufmass`, Projekt-Chat auf `projektverwaltung` (vorhandene `zusatz`-Kacheln); Plan übernimmt die Korrekturtabelle.
7. **RESOLVED – `hatVorlagen`:** am Release nicht als Nutzerfunktion belegt → entfernen/umformulieren (Paket a).
8. **Besitz geteilter Dateien, nicht in D-27 genannt:** `lib/funktionen.ts` (GAEB-Note, `help`-Felder) → Empfehlung Paket (f); `app/sitemap.ts` `/blog`, `/hilfe` und Gewerke-Detailzeile → (a) Gewerke-Zeilen, Integration `/blog`/`/hilfe`; `lib/product-register.ts` + Snapshot → Fundament. Orchestrator bestätigt im Plan.
9. **BMF-E-Rechnungs-FAQ** war am 22.10. nicht abrufbar (HTTP 503) → Executor (b) ruft erneut ab, bevor er Fristen schreibt.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|---|---|---|---|---|
| Node.js | Build, Skripte | ✓ | v24.12.0 (engines 24.x) | — |
| npm | Worktree-Setup | ✓ | 11.6.2 | — |
| git + Release-Repos | Faktenprüfung | ✓ | Web a9319e5, Mobile 6cac366 | — |
| SE Ranking MCP (`SE_RANKING_API_KEY`) | Fundament, Rollout | ✓ | 33.921 Units, bis 03.11.2026 | — |
| Worktrees `C:/Projekte/wt-08b/c/d` | Phase-8-Spuren | belegt | — | Phase-9-Worktrees `wt-09<x>` neu, Ports 3101–3108 prüfen |
| gesetze-im-internet.de, gaeb.de | Quellen | ✓ (HTTP 200) | — | — |
| bundesfinanzministerium.de FAQ | xrechnung-Artikel | ✗ am 22.10. (503) | — | erneut abrufen |

## Validation Architecture

### Test Framework
| Property | Value |
|---|---|
| Framework | Vitest ^5.0.0, Playwright ^1.63.0 (+ axe) |
| Config | `craftos/vitest.config.*` (bestehend), `tests/e2e/playwright.config.cjs` |
| Quick run | `npx vitest run tests/content.test.ts tests/keyword-map.test.ts tests/seo-audit-core.test.ts` (ohne Sperre) |
| Full suite | `npm test && npm run lint && npm run typecheck && npm run build && node scripts/seo-audit.mjs && node scripts/route-audit.mjs` (unter `.heavy-lock`) ; E2E `npm run test:e2e` (unter Sperre) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|---|---|---|---|---|
| FEAT-04 | 12 Gewerke: `ablauf` 4–5 Schritte, jeder Slug ∈ `funktionen`; `funktionen` 4–6 mit ≥ 1 Phase-7-Slug; 3–4 FAQ, Antwort ≤ 300, höchstens 1 gemeinsame Frage; kein `heroTitle`; H1 = `zielwerte().h1`; keine `hatVorlagen`-Zusage | unit | `npx vitest run tests/gewerke.test.ts` | ❌ Wave 0 (a) |
| FEAT-04 | FeatureSnippet je Gewerk, 360–1440, reduzierte Bewegung | e2e | `npx playwright test tests/e2e/function-illustrations.pw.cjs -g Gewerke` | ✅ (Z. 341 ff.) |
| FEAT-04/SEO-09 | Prompts Elektro/Maler → `#antwort`, phase 9 | unit | `npx vitest run tests/ai-prompts.test.ts` | ✅ (Z. 86–87 anpassen) |
| CONTENT-03 | jede Inhaltsdatei hat Map-Eintrag; jeder „bestehend“-Eintrag hat Datei; RSS-Items = Ratgeberzahl | unit | `npx vitest run tests/content.test.ts` | ✅ umstellen (Fundament) |
| CONTENT-03 | Frontmatter `answer` ≤ 300 (Integration: Pflicht), `faq` Frage ≤ 90/Antwort ≤ 300, `scene` ∈ `sceneById`, `sources` https + `checkedAt` | unit | `npx vitest run tests/content.test.ts` | ❌ Fälle ergänzen (Fundament) |
| CONTENT-03 | Produktwahrheit Inhalte: verbotene Altbegriffe („Neue Phase“, „Asset hinzufügen“, „Ressourcen verwalten“, „Keine Koordinaten“, „Konflikt erkannt“, „Finanzen sichtbar“, „Teamleitung (Zeiten für andere)“, „.x84 und .d83“, „Admin-Lizenz“, „Büro-Lizenz“, „DATANORM v5“, „nicht unterstützt“, „verspricht keine“) | unit | `npx vitest run tests/content-produktwahrheit.test.ts` | ❌ Wave 0 (Fundament, Liste aus dieser RESEARCH) |
| CONTENT-03 | Prüfdatei je Paket vorhanden und nennt jeden Paketartikel | unit | `npx vitest run tests/content-pruefung.test.ts` | ❌ Wave 0 (Integration) |
| CONTENT-03/SEO-09 | Antwort-zuerst auf `/gewerke`, `/blog/*`, `/hilfe/*` | unit + Build-Audit | `npx vitest run tests/seo-audit-core.test.ts`; `node scripts/seo-audit.mjs --paths=…` | ✅ umstellen (Z. 361–365) |
| CONTENT-04 | 14 neue Funktionen → je ≥ 1 Hilfeartikel; Sekundärlinks/Kachel-`href` laut Korrekturtabelle; Ziel-Datei existiert | unit | `npx vitest run tests/funktionsdetails.test.ts` | ✅ Tabelle ab Z. 272 erweitern (f) |
| SEO-09 | Map: neue Einträge mit `target`, Titel ≤ 60, Description 120–155, Status | unit | `npx vitest run tests/keyword-map.test.ts` | ✅ |
| DESIGN-02 | Artikelvorlage/Übersicht/Kategorie: axe, CLS 0, reduced motion, 360–1440 | e2e | `npx playwright test tests/e2e/design-v2.pw.cjs` (neue Fälle) | ❌ Integration |
| Alle | Produkt-Snapshot aktuell | unit | `npx vitest run tests/pricing-parity.test.ts` | ✅ (rot bis Fundament-Sync) |

### Sampling Rate
- **Per task commit:** gezielte Vitest-Dateien des Pakets + `npm run lint` + `npm run typecheck` (ohne Sperre).
- **Per Paketende:** einmal Build + `node scripts/seo-audit.mjs --paths=<eigene Pfade>` unter Sperre (D-28).
- **Phase gate (Integration):** volle Vitest-Suite, Build, `seo-audit.mjs` sitewide 0, `route-audit.mjs` 0/0, E2E-Auswahl.

### Wave 0 Gaps
- [ ] `tests/gewerke.test.ts` (a)
- [ ] `tests/content-produktwahrheit.test.ts` mit Altbegriff-Liste (Fundament)
- [ ] Map-Bezug + Frontmatter-Fälle in `tests/content.test.ts` (Fundament)
- [ ] `tests/content-pruefung.test.ts` (Integration)
- [ ] E2E-Fälle Artikelvorlage in `design-v2.pw.cjs` (Integration)

### Paketgrenzen und geteilte Dateien – bestätigt bzw. korrigiert
| Datei | D-27-Besitz | Befund | Empfehlung |
|---|---|---|---|
| `docs/seo/keyword-map.json`, `KEYWORD-MAP.md`, `tests/keyword-map.test.ts` | Fundament + Integration | bestätigt | Fundament: 10 neue Einträge, `secondary` „teilabnahme vob“; Integration: Status |
| `tests/content.test.ts` | Fundament/Integration | Z. 15/16/45 bestätigt | wie D-27 |
| `scripts/lib/seo-audit-core.mjs` + Test | Fundament | bestätigt, Z. 366 `istZentral` | Pattern oben |
| `lib/scenes.ts` | Fundament + (a) additiv | keine String-IDs | Fundament ergänzt `sceneById` |
| `app/sitemap.ts` | (a) nur `/gewerke` | **korrigiert:** auch Gewerke-Detailzeile Z. 56–59; `/blog`, `/hilfe` fehlen in `pageUpdated` | (a) beide Gewerke-Stellen; Integration `/blog`, `/hilfe` |
| `lib/funktionen.ts` | nicht genannt | GAEB-Negativnote Z. 340; `help`-Felder unbenutzt | (f) |
| `lib/funktionsdetails/*.ts`, `tests/funktionsdetails.test.ts`, `lib/app-content.ts` | (f) | Kachelorte korrigiert (Tabelle oben); GAEB-Negativtexte `angebot.ts` Z. 394/408 | (f) |
| `lib/product-register.ts`, `docs/product-*-snapshot.json` | Fundament (D-04) | Delta a9319e5 | Fundament |
| `tests/pricing-parity.test.ts` | — | rot bis Sync | Fundament |
| `lib/gewerke.ts`, `app/gewerke/**`, `trade-snippet-examples.ts`, `ai-prompts-targets.json`, `ai-prompts.test.ts`, `media-ki-label.test.ts`, Gewerke-E2E | (a) | bestätigt | — |
| Inhaltsdateien | je Paket | bestätigt: b 12, c 12, d 21, e 19, f 10 neu, g 9 neu = 83 | — |

## Security Domain

| ASVS Category | Applies | Standard Control |
|---|---|---|
| V2 Authentication | no | statische Website |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | yes (Build-Zeit) | Frontmatter-Validierung in `lib/content.ts`; Markdown über `rehype-sanitize` |
| V6 Cryptography | no | — |
| V14 Config/Secrets | yes | `SE_RANKING_API_KEY` nur aus `.env` gelesen, `redact()` in `se-ranking-mcp.mjs`; `scripts/check-no-secrets.mjs` |

| Pattern | STRIDE | Mitigation |
|---|---|---|
| HTML/Script-Injektion über Markdown | Tampering | `rehype-sanitize` vor `rehype-slug` (bestehend); keine Roh-HTML-Blöcke in Artikeln |
| Schlüsselleck in Rohdaten/Logs | Information Disclosure | Rohdaten enthalten keinen Schlüssel (geprüft: nur API-Antworten) |
| Externe Links | Spoofing | `sources` nur `https` (Validierung bestehend) |

## Project Constraints (from CLAUDE.md)

- Next.js App Router, Tailwind, TypeScript strict, keine `any`; Semantic HTML; WCAG (Alt-Texte, Kontrast ≥ 4,5:1, Tastatur).
- Jede Seite mit JSON-LD; FAQPage für FAQ; H2 als Fragen mit Antwort ≤ 300 Zeichen direkt danach (300-Zeichen-Regel).
- Frontend-Arbeit: Design-Kaskade (frontend-design → ui-ux-pro-max → 21st.dev nur `21st_magic_component_inspiration` → Context7 → SEO-Check) – laut D-31 einmal im UI-SPEC.
- Context7 vor Framework-Code (Executor; Ersatz `craftos/node_modules/next/dist/docs`).
- Keine Credentials committen; KI-Crawler nicht blockieren.
- Globale Regeln: Tests nur lokal, keine CI, kein Push außer Rollout; `ship-gate` vor Commit/Push; schwere Läufe unter Sperre und nach Koordinationsstatus; keine Ultra-Reviews automatisch.

## Sources

### Primary (HIGH)
- Web-Release `C:/Projekte/craft-connect-buddy` @ `a9319e5` (git archive): Pfade je Tabellenzeile.
- Mobile-Release `C:/Projekte/CraftOS - Mobile/craftos-mobile` @ `6cac366`: `src/shared/i18n/locales/de/*.json`, `src/shared/lib/navigation.ts`, `src/features/**`.
- Website `main` (b43d965/116ca11): `craftos/lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts`, `lib/gewerke.ts`, `lib/scenes.ts`, `lib/funktionsdetails/*.ts`, `app/sitemap.ts`, `docs/seo/keyword-map.json`, `scripts/lib/seo-audit-core.mjs`, Tests.
- SE Ranking Data API (MCP) 22.10.2026: `DATA_getKeywordsMetrics`, `DATA_getKeywordQuestions`, `DATA_getSimilarKeywords`, `DATA_getSubscription`.

### Secondary (MEDIUM)
- gesetze-im-internet.de (§ 13b, § 14, § 14a UStG; § 16 ArbZG; § 17 MiLoG; §§ 634, 640, 650g BGB) – Erreichbarkeit geprüft (HTTP 200), Inhalte vom Executor zu zitieren.
- gaeb.de Datenaustausch (HTTP 200).

### Tertiary (LOW)
- VOB/B-Paragraphen und BAG-Beschluss: [ASSUMED], vor Verwendung abrufen.

## Metadata

**Confidence breakdown:**
- Produktbefunde/Faktencheck: HIGH (Release-Quelltext, Pfade genannt); vollständige Schrittfolgen der „ok“-Artikel: MEDIUM (kein Widerspruch gefunden, Executor liest nach).
- Neue Hilfeartikel-Abläufe: HIGH (Dialogtexte am Release).
- Gewerke-Abläufe: MEDIUM (fachliche Zuordnung [ASSUMED], Funktionen belegt).
- Keyword-Daten: HIGH für Zahlen (Rohdaten), MEDIUM für Intent-Einschätzung.
- Validation/Paketgrenzen: HIGH (Code gelesen).

**Research date:** 2026-10-22
**Valid until:** nächster `origin/release`-Sprung (Web/Mobile) bzw. 7 Tage (schnell bewegliches Produkt); Keyword-Daten 30 Tage.
