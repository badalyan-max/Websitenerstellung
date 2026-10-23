# Phase 10: Abschlussaudit – Context

**Gathered:** 2026-10-23
**Status:** Ready for planning (nach 10-UI-SPEC für Paket c; Ausführung auf dem Stand `main` nach dem Phase-9-Lückenschluss)
**Quelle der Entscheidungen:** Inhaberfreigaben „mach einfach bis du sie alle fertig hast“ (21.10.2026) und „Mach, wie du es richtig findest“; Inhaberrahmen vom 20.10.2026 (keine detailgetreuen Screenshots, keine Demo-Organisation, keine Videos); Inhaberregel vom 22.10.2026 („Nur nennen, was unterstützt wird“; „live“ heißt für Kunden erreichbar); Wunsch des Inhabers nach mehreren gleichzeitig arbeitenden Agenten; globale Regel 5 (Tests nur lokal, keine CI). Die Entscheidungen 1–10 des Orchestrators sind gesetzt und hier als D-xx übernommen und mit dem Codebefund vom 23.10.2026 (`main` = `e853571`, `origin/main` = `87b73ce`) präzisiert.

<domain>
## Phase Boundary

- **DESIGN-05:** Jede Seite der Sitemap (156 URLs) plus 404-Seite und `/styleguide` besteht bei 360, 390, 768, 1024 und 1440 px die Barrierefreiheitsprüfung: axe ohne ernste oder kritische Verstöße, Kontrast ≥ 4,5 : 1, vollständige Tastaturbedienung. Prüfung lokal mit Playwright und axe; gefundene Mängel werden behoben.
- **QA-04:** Lighthouse mobil (Labordaten, lokal) auf Startseite, Funktions-, Gewerke-, Vergleichs- und Ratgeber-Vorlage mit Performance ≥ 95 und LCP < 2,5 s; Unit-, Browser-, Routen- und visuelle Prüfungen sind an den Stand angepasst und lokal grün.
- **QA-05:** Ein Sammelnachweis belegt je Etappe (Phasen 5 bis 10): Ship-Gate, Live-Gang, IndexNow, Live-Prüfung und Kontrolle von `trial_click`/`ai_visit`.
- **QA-06:** Erneuter `/audit craftos.eu` nach dem Repo-Skill und ein SE-Ranking-Website-Audit nach der letzten Etappe ohne offene technische oder On-Page-Fehler; Abschlussbericht mit Positionen, KI-Share-of-Voice und verweisenden Domains gegen den Ausgangsstand vom 20.10.2026.
- **DESIGN-02 (Rest und Abschluss):** Rechner (`/rechner`, `/rechner/stundensatz`, `/rechner/angebotskalkulation`), `/support`, Rechtsseiten (`/impressum`, `/datenschutz`, `/agb`; nur Darstellung) und die 404-Seite auf v2-Bausteinen.
- **SEO-08 (Messung):** Stand der verweisenden Domains in SE Ranking messen, Statusregister und Linkliste aktualisieren, je offenem Eintrag ein kopierfertiger Browser-Prompt für den Inhaber.
- **Zurückgestellte Punkte** aller Phasen werden je einem Plan zugeordnet oder ausdrücklich als „Inhaber“ bzw. „nicht in diesem Meilenstein“ begründet (D-31, Tabelle in `<specifics>`).
- Rollout mit Ship-Gate, IndexNow, Live-Prüfung, SE-Ranking-Messung, Etappenbericht, `PHASE-10-ROLLOUT.md` und Meilenstein-Abschlussbericht.

Nicht in dieser Phase: Änderungen an Rechtstexten (Wortlaut), Datenschutzabschnitt Webanalyse und Impressum-Hinweis „§ 5 DDG“ (Inhaberfreigabe); Konten, Profile und E-Mails bei Portalen (Inhaber); Produktänderungen in den App-Repos (Kundenportal-Befunde); Koordinationsrezepte für das Website-Repo; Löschen von Dateien, Seiten oder URLs ohne Inhaberfreigabe; neue Inhaltsseiten.
</domain>

<decisions>
## Implementation Decisions

### Umfang, Produktbasis und Regeln
- **D-01 (Umfang):** DESIGN-05, QA-04, QA-05, QA-06 und der DESIGN-02-Rest vollständig; SEO-08 wird gemessen und vorbereitet, aber nur bei belegtem Ziel abgeschlossen (D-29). Dazu die zugeordneten zurückgestellten Punkte (D-31). Keine neue Seite, keine neue URL, kein entfallender Slug.
- **D-02 (Produktbasis einfrieren):** Ausgangsbasis ist der Registerstand nach `467da9d`: Web `origin/release` = `bfe165e9` (v4.0.0-test.249), Mobile `origin/release` = `837aab4f` (mobile-v1.0.0-test.96); beide am 23.10.2026 nachgeprüft. Produktfakten nur aus `lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts`, `docs/product-pricing-snapshot.json` und den Release-Pfaden (nur lesend per `git show origin/release:<pfad>`, kein Fetch in den Spuren). Ein späterer Release-Sprung wird nur im Integrationsplan (10-06) und im Rollout per `npm run sync:product:check` und Delta-Prüfung übernommen, nie blind.
- **D-03 (Inhaberregel 22.10.2026 für jede Textänderung):** Es wird nur genannt, was unterstützt wird; keine Negativlisten (einzige Ausnahme bleibt die GoBD-Zertifizierungsfrage, Überclaim-Schutz). „Live“ heißt für Kunden erreichbar: Freischaltungen am Release beachten – `isDeveloper` (KI-Agent), Feature-Flags (`src/lib/featureFlags.ts`, z. B. `subcontractorPortalInvites: false`), „Bald verfügbar“ (Videoanalyse) und Lizenzsperren (`LicenseProtectedRoute`, `useLicense`). Beispiel aus diesem Befund: Das Kassenbuch (`/buchhaltung/kasse`) ist mit `LicenseProtectedRoute feature="finanzen"` geschützt; sichtbar für Admin immer, für Büro nur mit Schalter `finanzen_sichtbar`, für die App-Lizenz nie (`src/hooks/useLicense.ts` Z. 58/85). Jede neue Aussage nennt deshalb die Lizenz. Prüfwerkzeuge: `lib/leitlinie*`, `lib/nur-unterstuetzt.ts`, `tests/announcements.test.ts`, `tests/content-produktwahrheit.test.ts`, `scripts/content-pruefen.mjs --l1`.
- **D-04 (Lösch- und Kopierregel, phasenweit):** Ohne Inhaberfreigabe wird keine Datei, Seite, URL, kein Bild und kein Abschnitt gelöscht; Kandidaten landen in der Inhaberliste „Freigabe zum Entfernen nötig“ (Format nach dem Audit-Skill). Fließtexte werden nicht umgeschrieben; erlaubt sind nur mechanische SEO-Korrekturen nach der Kopierregel des Skills (Title, Description, Alt-Text, Überschriften-Tag, Schema, Links, Anker) und die ausdrücklich beauftragten Kartentexte aus D-21.

### Barrierefreiheit (DESIGN-05)
- **D-05 (Prüfumfang):** Alle 156 URLs aus der Sitemap des lokalen Produktionsbuilds plus die 404-Seite (ein unbekannter Pfad) und `/styleguide` (noindex, aber erreichbar) = 158 Seiten. Breiten 360, 390, 768, 1024, 1440 px. **Chromium** prüft die volle Matrix (790 Seitenaufrufe); **WebKit** prüft je Vorlage eine Seite (Start, Funktionsübersicht, Funktionsdetail, `/app`, Gewerke-Übersicht und -Detail, Ratgeber-/Hilfe-Übersicht, -Kategorie und -Artikel, Vergleichs-Hub und Alternative, `/preise`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd`, Rechner, `/support`, Rechtsseite, 404) bei allen fünf Breiten. Geprüft wird der stabile Zustand mit `reducedMotion: "reduce"` und zusätzlich auf den Seiten mit FeatureSnippet bzw. animierter Szene ein Zustand mit laufender Animation (D-10).
- **D-06 (Bestehenskriterien):** axe mit den Tags `wcag2a`, `wcag2aa`, `wcag21aa` (wie in `scripts/visual-audit.mjs` und den E2E-Specs) und zusätzlich `wcag22aa`. Hartes Gate: 0 Verstöße mit Wirkung `serious` oder `critical`; `color-contrast` mit 0 Verstößen jeder Wirkung. „Kontrast ≥ 4,5 : 1“ gilt auch für großen Text: Dafür werden die Ergebnisse von `color-contrast-enhanced` nur für Knoten mit erwartetem Verhältnis 4,5 : 1 (großer Text) gewertet; der AAA-Wert 7 : 1 für normalen Text ist kein Gate. Verstöße `moderate`/`minor` werden im Bericht gezählt und behoben, wo es ohne Designänderung geht; Rest mit Begründung im Bericht.
- **D-07 (Tastaturbedienung, automatisiert):** Je Seite und Breite ein Tab-Durchlauf von der Seitenspitze: (1) jedes sichtbare, nicht `inert`/`aria-hidden` liegende Bedienelement (`a[href]`, `button`, `input`, `select`, `textarea`, `summary`, `[tabindex="0"]`) erhält mindestens einmal den Fokus; (2) keine Tastaturfalle (Fokus kehrt zum Dokumentanfang bzw. in die Browserleiste zurück, Obergrenze Elementzahl + 20 Schritte); (3) sichtbarer Fokusindikator (berechnetes `outline` oder `box-shadow` ungleich `none` bzw. Stiländerung gegenüber dem Ruhezustand); (4) kein Fokus auf unsichtbare oder außerhalb des Viewports verbleibende Elemente (z. B. geschlossene Menüs, Rahmen-Inhalte). Zusätzlich je Vorlage: Sprunglink zum Inhalt, Mega-Menü bzw. Drawer mit Enter/Leertaste öffnen, mit Esc schließen, Fokus kehrt zum Auslöser zurück (deckt die offene Sichtprüfung WR-02/IN-01 aus Phase 6 automatisiert ab); Rechnerfelder, FAQ-Elemente, `ContentSearch`, Pause-Knopf der FeatureSnippets und Tabellen mit Querscroll (fokussierbarer Scrollbereich) per Tastatur bedienbar.
- **D-08 (Werkzeug):** Neues Skript `craftos/scripts/a11y-audit.mjs` (Muster `visual-audit.mjs`, Playwright + `@axe-core/playwright`, keine neue Abhängigkeit): liest die URLs aus der Sitemap des laufenden lokalen Servers, Parameter `--paths=`, `--widths=`, `--engines=` und `--shard=k/n` (damit kein einzelner Lauf die `.heavy-lock` übermäßig hält), Ergebnis `test-results/a11y/report.json` mit Zählern je Regel, Seite, Breite und Engine; Exit 1 bei Gate-Verstoß. Ergänzend eine E2E-Spec `tests/e2e/a11y.pw.cjs` mit den Vorlagenseiten und den Tastaturfällen aus D-07 für die reguläre Suite (die Spec iteriert die fünf Breiten selbst, weil `playwright.config.cjs` nur 1440 und 390 als Projekte führt). `visual-audit.mjs` prüft axe künftig bei allen fünf Breiten statt nur 390/1440. Schlussnachweis: voller Lauf im Integrationsplan 10-06 auf dem zusammengeführten Stand, Zahlen in `craftos/docs/releases/PHASE-10-ROLLOUT.md`.
- **D-09 (Bekannte Altfehler Rechtsseiten):** `/impressum` Z. 76 und `/datenschutz` Z. 77 nutzen `font-semibold text-primary-600` (#d28a13 auf Weiß, 2,84 : 1); dazu prüfen: Augenbraue `spec-label text-primary-600` in `components/legal/Legal.tsx` Z. 29. Behebung nur über die Darstellung (Farbton mit ≥ 4,5 : 1, z. B. `text-primary-800` #784b10, Unterstreichung für Links im Fließtext) im Paket (c) zusammen mit der v2-Umstellung. Am Rechtstext ändert sich kein Wort: Ein Test vergleicht den normalisierten Textinhalt des Hauptbereichs der drei Rechtsseiten im Build vor und nach der Umstellung (Hash bzw. wörtlicher Vergleich, Referenz vor der ersten Änderung erzeugt).
- **D-10 (FeatureSnippet-Dimmstufe, deferred 07-08):** Inaktive Schritte (heute 50 % bzw. 35 % Deckkraft, z. B. `lager`/`stockMovement`, `aufmass`/`opening`) erhalten eine Darstellung, die auch in Zwischenständen ≥ 4,5 : 1 erreicht (Farbton statt Deckkraft oder höhere Stufe); die Hervorhebung des aktiven Schritts bleibt erkennbar (Rahmen, Gewicht, Markierung). Begründung: DESIGN-05 verlangt „jede Seite besteht“, und ein Prüfer mit laufender Animation sähe sonst Verstöße. Besitzer: Paket (a). Die Kopplung an die ProductDemo-Entscheidung aus Phase 7 entfällt.

### Performance und Prüfsuite (QA-04)
- **D-11 (Lighthouse-Messung):** Lighthouse mobil mit Standardvoreinstellung (simulierte Drosselung, mobile Emulation), Kategorie Performance, gegen den lokalen Produktionsserver (`next build` + `next start`, eigener Port); drei Läufe je URL, gewertet wird der Median. Gate je Vorlage: Performance ≥ 95 und LCP < 2,5 s; berichtet werden zusätzlich CLS, TBT, FCP, Speed Index und die Hauptbefunde. Vorlagen und Startwerte: Startseite `/`; Funktions-Vorlage `/funktionen` und `/funktionen/zeiterfassung` (Detailvorlage mit FeatureSnippet); Gewerke `/gewerke/elektriker`; Vergleich `/vergleich/plancraft-alternative`; Ratgeber `/blog/handwerkerrechnung-schreiben`. Das Fundament misst je Vorlage zusätzlich zwei weitere Seiten und nimmt die schwerste als Gate-Seite (Discretion). Zur Information (kein Gate): `/preise`, `/app`, ein Hilfeartikel, `/rechner/stundensatz`. Jeder Wert trägt im Bericht „Labordaten, mobil, lokal, Median aus 3 Läufen, URL“. Nach dem Rollout eine Kontrollmessung derselben URLs gegen https://craftos.eu (lokal ausgeführt, als Labordaten gekennzeichnet, kein Gate).
- **D-12 (Werkzeug):** `scripts/performance-audit.mjs` misst heute ohne Lighthouse (Playwright, eigene LCP/CLS/Interaktionswerte, 13 Routen, `test-results/performance.json`). Es wird um einen Modus `--lighthouse` erweitert (programmatische Lighthouse-API, Chrome aus Playwright `chromium.executablePath()`, Ergebnisse `test-results/lighthouse/<route>-<lauf>.json` und Zusammenfassung `test-results/lighthouse/summary.json`, Exit 1 bei Gate-Verstoß); der bisherige Modus bleibt. Lighthouse ist im Repo nicht installiert und wird als `devDependency` mit fester Version aufgenommen (vorher Context7-Doku zur Node-API; `package.json`/`package-lock.json` gehören Paket (b)).
- **D-13 (Optimierung):** Reihenfolge nach Lighthouse-Befund: LCP-Element (Bild-Priorität, Größen, Schrift-Laden mit `next/font` und `display: swap`), Render-Blocker, JavaScript der Client-Inseln (Hydration, ungenutzter Code), CLS (zweiter Teil von 07 IN-05: CLS auch ohne reduzierte Bewegung auf den 8 Snippet-Seiten messen und halten). Kein Entfernen von Funktionen, Bildern, Skripten oder Abschnitten (D-04); Analytics und Speed Insights bleiben eingebunden. Ist ein Ziel nur mit sichtbarer Gestaltungsänderung erreichbar, wird sie im 10-UI-SPEC begründet oder als offene Abweichung berichtet, nie still.
- **D-14 (Prüfsuiten angepasst und grün):** Am Phasenende lokal grün: `npx vitest run` (volle Suite), `npm run typecheck`, `npm run lint`, `npm run build`, E2E `npm run test:e2e` (Chromium und WebKit, Projekte 1440 und 390-touch, inkl. neuer `a11y.pw.cjs`), `seo-audit.mjs` sitewide 0, `route-audit.mjs` 0 Fehler und 0 defekte Links, `visual-audit.mjs` (fünf Breiten, ergänzte Routen für Rechner, Support, Rechtsseiten, 404, eine Gewerke-Detailseite, eine Hilfekategorie) ohne Befund, `live-check.mjs` lokal grün, `sync:product:check` grün. Bekannte Zeitflakes (05 Nr. 2 „außerhalb des Viewports“, 08 `function-illustrations.pw.cjs:281` Tab-Sichtbarkeit und `:476` Pause) werden deterministisch gemacht (Auslesen nach `data-running="false"` bzw. längeres Poll-Fenster), nicht übersprungen. `pricing-parity.test.ts` und `product-register.test.ts` nutzen den Helfer `tests/release-repos.ts` (Phase-7-Befund: sonst stilles Überspringen ohne Release-Repos); das Testkontext-Muster in `pricing-parity.test.ts` erhält eine Wortgrenze (09-09: Treffer in „Spätestens“).

### DESIGN-02-Rest (Paket c)
- **D-15 (Rechner):** `/rechner`, `/rechner/stundensatz`, `/rechner/angebotskalkulation` erhalten einen v2-Kopf (FunktionsKopf bzw. gleichwertiger Kopf mit Brotkrumen aus `crumbsFor`, H1 aus der Keyword-Map, Antwort ≤ 300 Zeichen mit `data-answer`, wo die Antwortregel gilt), v2-Abschnitte und CtaBand. Die Rechner selbst (`components/calculators/*`) bleiben in Rechenlogik, Feldnamen und Beschriftungen gleich (Tests `calculators.test.ts`, `calculator-hydration.test.ts`; `performance-audit.mjs` füllt „Personalkosten pro Jahr in Euro“); weiterhin keine Speicherung der Eingaben. `CalculatorPage.tsx` wird auf v2 umgestellt statt ersetzt.
- **D-16 (`/support`):** `PageHero` entfällt zugunsten des v2-Kopfs; Kontaktwege (E-Mail aus `site.ts`, Hilfezentrum, Login/App-Links nur wie heute) als LinkKarten bzw. FeatureCard-Raster; Inhalte nur aus `site.ts` und bestehenden Seiten.
- **D-17 (Rechtsseiten):** `LegalShell`/`LegalSection`/`DataBlock` (`components/legal/Legal.tsx`) werden auf v2-Typografie, -Abstände und -Kopf (mit vorhandenen Brotkrumen) umgestellt; Wortlaut, Reihenfolge und Gliederung der Rechtstexte bleiben unverändert (Test aus D-09). Kontrastbehebung aus D-09.
- **D-18 (404):** `app/not-found.tsx` auf v2-Bausteine (Kopf ohne Brotkrumen, Linkkarten zu Startseite, Hilfe, Funktionen), Status 404 und `noindex` bleiben; Texte bleiben sinngemäß, nur Unterstütztes.
- **D-19 (Design-Feinschliff aus den Vorphasen):** (1) Weißraum in md-Kacheln ohne Phone bei 1024 px (deferred 07-08, bis 122 px): Text der md-Kachel am Kachelboden ausrichten oder das Raster zwischen 1024 und 1279 px dreispaltig führen – Entscheidung im 10-UI-SPEC als dokumentierte UI-SPEC-Abweichung, Messung mit dem B10-Verfahren vorher/nachher; (2) Tabellenüberschrift (`caption`) der `ComparisonTable` bei 360 px angeschnitten (deferred 08-10): Caption außerhalb des Scrollbereichs, gilt für alle Tabellen (`/preise`, Alternativen, kleine Betriebe); (3) Silbentrennung im Kopfwort der H2 auf `/preise` bei 1440 px („Handwer-kersoftware“, Rollout 08 § 13): Überschriften-Regel `hyphens: manual` (bzw. die in 08-10/08-11 genutzte Lösung) ohne Wortänderung, damit Anker `#was-kostet-handwerkersoftware` und Antwort unverändert bleiben.
- **D-20 (10-UI-SPEC):** Vor der Planung ein schlankes `10-UI-SPEC.md` für D-15 bis D-19, das 05–09-UI-SPEC referenziert statt wiederholt; Prüfung durch gsd-ui-checker. Design-Kaskade laut Projekt-CLAUDE.md einmal im UI-SPEC (frontend-design read-only, ui-ux-pro-max `--domain ux`, 21st.dev nur Inspiration falls verfügbar, Context7, SEO-Check), nicht je Plan.

### Funktionsergänzungen aus zurückgestellten Punkten (Paket d)
- **D-21 (Kassenbuch und § 13b auf `/funktionen` und im Menü):** Die Registereinträge „Kassenbuch“ und „Rechnung nach § 13b“ (`liveExtras`, heute `advertised: false`) werden beworben und erscheinen als Zusatzfunktionen in `lib/funktionsgruppen.ts` (Gruppe Buchhaltung bzw. Rechnungen nach der bestehenden Gruppenlogik; Discretion), damit auf `/funktionen` und im Mega-Menü. Ziel je Zusatzfunktion nach der Regel aus 07-02: Kassenbuch → `/funktionen/buchhaltung` (dort Kachel „Kassenbuch“ vorhanden, verlinkt `/hilfe/kassenbuch-fuehren`); § 13b → passende Detailseite mit Kachel, sonst Kachel mit `href` auf `/hilfe/rechnung-fertigstellen` ergänzen. Kartentext nennt die Lizenz (D-03: Kassenbuch nur Admin bzw. Büro mit Finanzfreigabe). Mengen- und Zähltests (`funktionsgruppen.test.ts`, `funktionen-seite.test.ts`, `navigation.test.ts`, betroffene Zählstellen in `home-navigation.pw.cjs`/`navigation.pw.cjs`, `ZUSATZ_IDS`) werden im selben Plan gleichgezogen; `llms.txt` und Startseite folgen ihrer Quelle `funktionsgruppen.ts`.
- **D-22 (Credit-Wert der Lager-Foto-KI):** Ein Wert wird nur genannt, wenn er am Release im Code steht (Web `src/lib/constants.ts`/`src/lib/subscription/pricing.ts`, Supabase-Funktion oder Mobile-Konfiguration – nicht nur in einer Sprachdatei) und dann zuerst in `lib/site.ts` mit Belegkommentar und Paritätstest aufgenommen wird. Ohne Code-Beleg bleibt die Seite ohne Wert und der Punkt wird als „nicht in diesem Meilenstein (kein Code-Beleg)“ geschlossen.
- **D-23 (ProductDemo):** `components/product-demo/*` (ProductDemo.tsx ~3.070 Zeilen, PlanningBoard) und `lib/demo/{machine,data}.ts` bleiben unverändert und ungerendert; nichts wird gelöscht. Die Szene `ki` zeigt Craft AI, das aus einer Zeitanfrage einen Zeiteintrag vorschlägt – das entspricht dem nicht freigeschalteten KI-Agenten (`isDeveloper`) und darf so nicht ausgespielt werden. Eine Umstellung auf belegte Funktionen wäre ein Neubau ohne Einsatzort (Inhaberrahmen 20.10.: kein Demo-Betrieb). Daher: Inhaberentscheidung „archivieren oder löschen?“ mit Empfehlung „löschen nach Freigabe“ samt Folgen (übersprungene Specs `demo-planning.pw.cjs`, `mobile-step-flow.pw.cjs`, `tests/demo.test.ts`, `components/ui/MobileAppGallery.tsx`). Bis dahin ein Schutztest, dass keine Datei unter `app/` die Demo importiert (heute nur für `FunktionsDetail` geprüft, `tests/funktionsdetails.test.ts` Z. 1424).
- **D-24 (07 IN-06):** `INHALTE` in `lib/funktionsdetails/index.ts` wirft bei doppeltem Slug, statt still zu überschreiben (kleiner Schutz mit rotem Test zuerst).

### Audits, SE Ranking und Abschlussbericht (QA-06, SEO-08; Paket e und Rollout)
- **D-25 (`/audit` nach dem Repo-Skill):** Ablauf nach `.claude/skills/audit/SKILL.md` mit `craftos/` als Projektwurzel: Audit → Bericht → Freigabe → Behebung. Die Freigabe für mechanische Korrekturen erteilt der Orchestrator im Rahmen der Inhaberfreigaben; Kopierregel (kein Fließtext umgeschrieben, Zahl geänderter Sätze im Bericht, Sollwert 0) und Löschregel (nichts löschen; Kandidaten unter „Needs your approval to remove“ als Inhaberpunkt) gelten unverändert, ebenso Waiver- und Stichprobenregel. Zeitpunkte: **Vorab-Audit** in Welle 1 gegen https://craftos.eu (Stand Phase 9) und den lokalen Build – liefert die Behebungsliste, die nach Dateibesitz verteilt wird (Map-/Metadatenkorrekturen in Paket e, alles Übrige im Integrationsplan 10-06); **Bestätigungsaudit** nach dem Rollout gegen https://craftos.eu ohne Behebungen. Quellen ohne Zugang (Search Console, Semrush, Business Profile) erscheinen als „nicht gemessen“ mit Grund; SE Ranking ersetzt Semrush für Wettbewerber, Backlinks und Keywords (Quelle je Zahl). Ebene Local wird mit Typ und Grund gewaivt (craftos.eu ist kein lokales Geschäft). Berichtsdateien nach Skill-Konvention `craftos/audit-report.md` und `craftos/audit-report.html` (Vorab und Bestätigung getrennt datiert, nichts überschrieben).
- **D-26 (SE-Ranking-Website-Audit):** Zuerst vorhandene Audits auflisten (`PROJECT_listAudits`/`DATA_listAudits`); das Audit vom 20.10.2026 (126 Seiten, 96/100, 0 Fehler, 14 Warnungen, 60 Hinweise; Rohdaten wurden damals nicht gesichert) wird per Recheck wiederholt, sonst ein Standard-Audit mit Seitenlimit ≥ 160 angelegt. Rohdaten mit Datum unter `docs/seo/data/`. Ziel: 0 Fehler, 0 offene On-Page-Warnungen; „JavaScript nicht komprimiert“ wird live über `content-encoding` geprüft und, falls Crawler-Artefakt, mit Beleg gewaivt. Lauf einmal vorab (Welle 1) und einmal nach dem Rollout.
- **D-27 (Unit-Budget SE Ranking):** Höchstens 5.000 Units für alle Phase-10-Abrufe. Kontostand vor und nach jedem Block über `DATA_getSubscription` (Muster aus PHASE-09-ROLLOUT § 7, Skript im Scratchpad oder `scripts/lib/se-ranking-mcp.mjs`, Schlüssel nie ausgeben). Kontostand am 23.10.2026: 26.209 von 100.000, Testzugang bis 03.11.2026. Beobachtet: Die tägliche Projektmessung (Positionen und KI-Suche des Projekts 13094375) verbraucht ca. 7.700 Units je Tag – bei unveränderter Einstellung ist das Kontingent etwa am 26./27.10. erschöpft. Folge: Die SE-Ranking-Blöcke laufen so früh wie möglich (Vorab-Audit in Welle 1) und unmittelbar nach dem Rollout; reicht der Stand nicht, steht im Bericht „nicht gemessen“ mit Grund, keine Schätzung. Eine Änderung der Prüfhäufigkeit im SE-Ranking-Projekt nimmt kein Plan vor (Orchestrator/Inhaber, siehe offene Punkte).
- **D-28 (Abschlussbericht):** `craftos/docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md` (Entwurf in Paket e, Endwerte im Rollout): Positionen (Top 10/Top 100 je Seitengruppe), KI-Share-of-Voice, verweisende Domains (seriös vs. Spam, Abgleich mit dem Register), Domain-InLink-Rank – jeweils gegen den Ausgangsstand 20.10.2026 (`SE-RANKING-BEFUND-2026-10-20.md`, `reports/2026-10-21-messbericht-ausgangsstand.md`) und den Etappenberichten 05–09; dazu Audit-Ergebnisse (`/audit`, SE-Ranking-Audit), Lighthouse- und A11y-Zahlen, Anforderungsstatus und eine Tabelle des Unit-Verbrauchs (Phasen 5–10 plus Kontoverbrauch durch die tägliche Messung, ca. 7.700 Units/Tag, mit Kontoständen und Zeitpunkten) als Datengrundlage für die Tarifempfehlung, die der Orchestrator vor dem 03.11.2026 gibt. Der Bericht selbst gibt keine Tarifempfehlung.
- **D-29 (SEO-08):** Messung der verweisenden Domains in SE Ranking (im Rahmen von `seo-report.mjs`, das den Registerabgleich schon enthält). Statuspflege in `docs/seo/backlink-register.json` nach LINKPLAN § 5: „live“ nur, wenn die Domain in SE Ranking als verweisend erscheint oder ein öffentlich erreichbares Profil nachweislich auf https://craftos.eu verlinkt (Abruf mit Datum in `notiz`); sonst Status unverändert. Je offenem Eintrag ein kopierfertiger Browser-Prompt (Regeln aus LINKPLAN § 2 wörtlich: nichts kaufen, keine Zugangsdaten, Konten nur durch den Inhaber, Fakten nur aus `llms.txt`/Impressum); Faktenstand der Prompts gegen das aktuelle `llms.txt` prüfen. Neue Übergabe `LINKPLAN.md` § „Übergabe 2“ mit Reihenfolge nach Priorität (zuerst die offenen Punkte aus Übergabe 1: ProvenExpert, G2, OMR-Nachfassen, kennstdueinen.de, SoftwareWorld, zwei Portal-Mails). `tests/backlink-plan.test.ts` grün. SEO-08 bleibt „In Progress“, solange nicht ≥ 15 neue seriöse Domains in SE Ranking belegt sind; keine Schätzung.

### Etappennachweis (QA-05)
- **D-30 (Sammeldokument):** `craftos/docs/releases/ETAPPEN-NACHWEIS-V2.md`, eine Zeile je Etappe 5–10 mit Belegverweis: Code-Commit und Push-Zeit, Ship-Gate (Prüfungen und Ergebnis), `gh workflow list --all` vor dem Push, Vercel-Deployment-ID und READY, IndexNow (URL-Zahl, HTTP-Status), live-check (Zahl OK/FEHLER), SE-Ranking-Etappenbericht, `trial_click`/`ai_visit`. Quellen sind ausschließlich die Rollout-Nachweise `PHASE-05-ROLLOUT.md` bis `PHASE-09-ROLLOUT.md` (Paket e) und `PHASE-10-ROLLOUT.md` (Rollout). Analytics: Der Orchestrator fragt `trial_click` und `ai_visit` über das Vercel-MCP (Web-Analytics-Events, Projekt `craftos`, Team `craft-os`) je 24-Stunden-Fenster nach jedem Rollout ab und übergibt Zahlen mit Abfragezeitpunkt (z. B. als Datei unter `docs/releases/data/`); „kontrolliert“ heißt Abfrage ausgeführt und Ergebnis dokumentiert. Ein Fenster mit 0 Ereignissen ist ein Befund (Verdrahtung live prüfen: `data-track`, `/_vercel/insights/script.js`). Für Phase 10 folgt das 24-Stunden-Fenster als Nachtrag. Nur wenn das Vercel-MCP keine Events liefert, bleibt die Kontrolle ein Inhaberpunkt mit der bisherigen Anleitung.

### Zurückgestellte Punkte
- **D-31 (Zuordnung):** Jeder offene Punkt aus `deferred-items.md` (Phasen 5, 7, 8, 9; Phase 6 hat keine Datei), den VERIFICATION-Dateien 07–09 und den Abschnitten „offene Punkte“ der Rollout-Nachweise 05–09 ist in der Tabelle unter `<specifics>` genau einem Plan zugeordnet oder als „Inhaber“ bzw. „nicht in diesem Meilenstein“ begründet. Bereits erledigte Punkte stehen mit Beleg darin, damit sie nicht erneut geplant werden. Der Integrationsplan hält die Tabelle mit dem Endstand nach und überträgt sie in `PHASE-10-ROLLOUT.md`.

### Parallelisierung
- **D-32 (Pakete und Wellen):** Pakete mit getrennten Dateimengen, je eigener Worktree `C:/Projekte/wt-10<x>` auf Branch `phase10-spur-<x>` mit Port 3101–3105 (Muster Phasen 8/9); der Orchestrator merged nach `main`. **Welle 1 (parallel):** 10-01 (a) Barrierefreiheit, 10-02 (b) Performance und Prüfsuite, 10-03 (c) DESIGN-02-Rest und Feinschliff, 10-04 (d) Funktionsergänzungen, 10-05 (e) Audits, SE Ranking, Linkregister, Etappennachweis und Berichtsentwurf. **Welle 2:** 10-06 Integration und Phasen-Gate (Haupt-Arbeitsbaum, Port 3100). **Welle 3:** 10-07 (f) Rollout. Zuschnitt und Dateibesitz in `<specifics>`.
- **D-33 (Geteilte Dateien):** Jede geteilte Datei hat je Welle genau einen Besitzer; alle anderen tragen nötige Änderungen in die Übergabeliste ihres SUMMARY ein, die 10-06 umsetzt. Feste Besitzer in Welle 1: `app/globals.css` und bestehende Dateien unter `components/v2/**` sowie `components/layout/**` → (a), ausgenommen `components/v2/BentoGrid.{tsx,module.css}` und `components/v2/ComparisonTable.{tsx,module.css}` → (c); neue Dateien unter `components/v2/` darf nur (c) anlegen. `app/layout.tsx`, `next.config.js`, `package.json`, `package-lock.json`, `tests/e2e/playwright.config.cjs`, `scripts/performance-audit.mjs`, `public/images/**`, `scripts/optimize-images.mjs` → (b). `scripts/visual-audit.mjs`, neue `scripts/a11y-audit.mjs`, `tests/e2e/a11y.pw.cjs`, `components/feature-snippet/**` → (a). `app/rechner/**`, `components/calculators/**`, `app/support/**`, `app/{impressum,datenschutz,agb}/**`, `components/legal/**`, `app/not-found.tsx`, `docs/DESIGN-V2.md`, `10-UI-SPEC`-Umsetzung → (c). `lib/funktionsgruppen.ts`, `lib/product-register.ts`, `lib/site.ts`, `lib/funktionsdetails/**`, Zähltests aus D-21, `tests/funktionsdetails.test.ts`, `tests/demo.test.ts` (nur Schutztest) → (d). `docs/seo/**` (inkl. `keyword-map.json`, `KEYWORD-MAP.md`, `backlink-register.json`, `LINKPLAN.md`), `scripts/se-ranking-*`, `scripts/seo-report.mjs`, `tests/keyword-map.test.ts`, `tests/backlink-plan.test.ts`, Audit-Berichte, `docs/releases/ETAPPEN-NACHWEIS-V2.md`, `docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md` (Entwurf) → (e). Nur 10-06: `app/sitemap.ts` (`lastModified`-Zeilen der geänderten Seiten), `scripts/live-check.mjs` (Phase-10-Block), `testMatch` für `a11y.pw.cjs`, Behebungen aus dem Vorab-Audit außerhalb von `docs/seo/**`, Übergabelisten. `.planning/STATE.md`/`ROADMAP.md` nur Orchestrator.
- **D-34 (Schwere Läufe):** Build, `next start`, volle Vitest-Suite, E2E, `a11y-audit.mjs`, `visual-audit.mjs`, `performance-audit.mjs` (auch `--lighthouse`) und `npm ci` nur unter der gemeinsamen Sperre `C:/Projekte/Websitenerstellung/.heavy-lock`, einzeln, Koordinationsstatus vorher lesen (kein Website-Rezept, also lokal). Die volle A11y-Matrix läuft in Teilen (`--shard`), die Sperre wird zwischen den Teilen freigegeben. Lighthouse-Messungen nie parallel zu einem anderen schweren Lauf (Messwerte wären verfälscht). Je Worktree eigener Port und eigene PID, danach Port frei prüfen. SE-Ranking- und Vercel-Abfragen sind keine schweren Läufe, aber nur in Paket e bzw. durch den Orchestrator.

### Rollout und Anforderungsstatus
- **D-35 (Rollout 10-07):** Letzter Plan; nur dort wird gepusht. Lokale Gates aus D-14 auf dem integrierten Stand, Code-Review-Gate durch den Orchestrator, Ship-Gate, `gh workflow list --all` unmittelbar vor dem Push (erwartet nur „Dependabot Updates“, kein `.github` im Diff), Vercel READY, `live-check.mjs` (mit Phase-10-Block), `npm run indexnow` erst nach bestätigtem Live-Stand, `se-ranking-sync.mjs --check`, SE-Ranking-Audit-Recheck (D-26), Bestätigungs-`/audit` (D-25), Lighthouse-Kontrollmessung live (D-11), `node scripts/seo-report.mjs --etappe rollout-phase10` genau einmal, Phase-10-Zeile in `ETAPPEN-NACHWEIS-V2.md`, `craftos/docs/releases/PHASE-10-ROLLOUT.md` und Endfassung `MEILENSTEIN-V2-ABSCHLUSS.md`, danach Doku-Push mit erneutem Ship-Gate und `gh workflow list --all`. Tests nur lokal, keine CI, kein Push zum Testen. Zeigt das Bestätigungsaudit offene Fehler, folgt ein Lückenschluss-Plan mit eigenem Push; QA-06 wird dann erst danach markiert.
- **D-36 (Requirements):** Alle Nicht-Rollout-Pläne `requirements-completed: []`. Nur 10-07 markiert DESIGN-02, DESIGN-05, QA-04, QA-05 und QA-06 – jeweils nur bei erfülltem Nachweis (QA-05 einschließlich dokumentierter Analytics-Kontrolle für 5–9 und Phase-10-Abfrage; QA-06 nur bei 0 offenen technischen/On-Page-Fehlern im Bestätigungsaudit und im SE-Ranking-Audit). SEO-08 nur bei ≥ 15 in SE Ranking belegten neuen seriösen Domains, sonst „In Progress“ mit Messstand und Verweis auf Übergabe 2. Traceability-Hinweis in `REQUIREMENTS.md` entsprechend.

### Claude's Discretion
- Gruppe und Reihenfolge der neuen Zusatzkarten (D-21) innerhalb der Gruppenlogik von `funktionsgruppen.ts`; Ziel der § 13b-Karte.
- Konkrete Farbtöne und Darstellungen für D-09/D-10 innerhalb der Marke (Amber, Kontrast ≥ 4,5 : 1).
- Variante für den 1024-px-Weißraum (Bodenausrichtung oder dreispaltiges Raster) im 10-UI-SPEC.
- Ob 10-01 intern in „Werkzeug und Baseline“ und „Behebung“ geteilt wird; ob 10-06 in Integration und Phasen-Gate zwei Pläne bildet.
- Lighthouse-Version, Lauf-Parameter innerhalb der Mobile-Standardvoreinstellung, Auswahl der zusätzlichen Messseiten je Vorlage.
- Format der Übergabe an den Inhaber (eine Datei mit allen Prompts oder Abschnitte in `LINKPLAN.md`).
</decisions>

<specifics>
## Specific Ideas

### Nachgezählt (Stand 23.10.2026, `main` `e853571`)
- **Sitemap:** 156 URLs (davon 30 Ratgeber, 54 Hilfeartikel, 12 Gewerke); Keyword-Map 156/156 „bestehend“. `app/sitemap.ts` pflegt `lastModified` je Kernseite von Hand (z. B. `"": "2026-10-21"`, `/preise` `2026-10-23`).
- **A11y-Werkzeuge heute:** `scripts/visual-audit.mjs` prüft 20 Routen bei fünf Breiten in Chromium und WebKit, axe aber nur bei 390 und 1440 px; keine Tastaturprüfung. E2E mit axe in `design-v2.pw.cjs`, `funktionsdetails.pw.cjs`, `home-navigation.pw.cjs`, `vergleich.pw.cjs`; `playwright.config.cjs` hat nur die Projekte `{chromium,webkit}-1440` und `-390-touch`, `testMatch` ohne `demo-planning.pw.cjs` und `mobile-step-flow.pw.cjs`.
- **Performance heute:** `scripts/performance-audit.mjs` ohne Lighthouse (eigene Messung, 390 × 844, 4× CPU, 150 ms Latenz, 1,6 Mbit/s, 3 Läufe, 13 Routen). Lighthouse ist weder in `package.json` noch in `node_modules`.
- **DESIGN-02-Rest heute:** `/support` nutzt `PageHero`; Rechner über `components/calculators/CalculatorPage.tsx` mit `Calculators.module.css`; Rechtsseiten über `components/legal/Legal.tsx`; `app/not-found.tsx` mit Altklassen `section-space`, `eyebrow`, `section-intro`, `btn-cta`, `btn-secondary`.
- **Kontrast-Altfehler:** `/impressum` Z. 76 (Link zur OS-Plattform) und `/datenschutz` Z. 77 (`mailto`), beide `font-semibold text-primary-600`; Augenbraue `text-primary-600` in `Legal.tsx` Z. 29 prüfen.
- **Register:** `liveExtras` „Kassenbuch“ (Web, `src/pages/Kassenbuch.tsx`, Lizenzschutz `finanzen`) und „Rechnung nach § 13b“ (Web, `CustomerDialog.tsx`, `invoiceNoticeTexts.ts`, `generate-einvoice`) mit `advertised: false`; „Vorhersagen“ bleibt `advertised: false` (Umfang ungeprüft).
- **Linkregister:** `docs/seo/backlink-register.json` 65 Einträge: 61 offen, 1 angefragt (omr.com), 3 „nicht möglich“ (softguide.de, trusted.de, de.wikipedia.org), 0 live; 62 mit `browserPrompt`; alle Stände vom 20.10.2026.
- **SE Ranking:** Projekt 13094375, 157 Keywords (132 Soll, 25 zusätzlich), 5 Wettbewerber, 20 KI-Prompts; letzter Etappenbericht `reports/2026-10-23-messbericht-rollout-phase09.md`: 0 Top 10 / 2 Top 100 bei 127 gemessenen Bestandsseiten, Zusatz-Keywords 2/4, SoV 0,02 %, 12 verweisende Domains (alle Spam), InLink Rank 3. `seo-report.mjs` und `se-ranking-sync.mjs --check` kosteten in den Phasen 7–9 je 0 Units.
- **Ausgangsstand 20.10.2026:** 1 rankendes Keyword (Platz 51–100), 12 verweisende Domains (Spam), InLink Rank 3, SoV 0,02 %; SE-Ranking-Audit 96/100, 0 Fehler, 14 Warnungen (Alt-Text), 60 Hinweise (34 Title zu lang, 1 zu kurz, 4 Description zu lang, 2 doppelte H1, 18 „JS nicht komprimiert“, 1 externer 3XX-Link).

### Zuordnung der zurückgestellten Punkte (D-31)
| # | Punkt | Herkunft | Zuordnung | Grund |
|---|---|---|---|---|
| 1 | KI-Bild `werkstatt-2026` ohne Kennzeichnung auf `/gewerke` | 05 deferred 1 | erledigt (09-11) | Bild entfällt auf `/gewerke`, `/styleguide` gekennzeichnet; 10-01 prüft nur noch Alt/Label |
| 2 | WebKit-Flake „außerhalb des Viewports bleibt der Ablauf stehen“ | 05 deferred 2 | 10-02 (b) | QA-04 „Prüfungen grün“; deterministisch machen (D-14) |
| 3 | Kein Koordinationsrezept für das Website-Repo | 05 deferred 3; Rollouts 05–09 | nicht in diesem Meilenstein | Änderung am CraftOS-Workspace, nicht an der Website; Vorschlag bleibt beim Inhaber |
| 4 | Icon-Kachel-Weißraum bei 1024 px | 07 deferred 1; Rollout 07 § 13 | 10-03 (c) | D-19 (1), UI-SPEC-Abweichung |
| 5 | FeatureSnippet-Dimmstufe (axe in Zwischenständen) | 07 deferred 2 | 10-01 (a) | D-10 |
| 6 | Review-Low 07 IN-01 (Gutter) | 07-REVIEW-FIX | nicht in diesem Meilenstein | Entscheidung D-14 aus Phase 7 bleibt bewusst; kein A11y-Mangel |
| 7 | Review-Low 07 IN-05 Teil 2 (CLS ohne reduzierte Bewegung, 8 Snippet-Seiten) | 07-REVIEW-FIX | 10-02 (b) | D-13 |
| 8 | Review-Low 07 IN-06 (doppelte Slugs in `INHALTE`) | 07-REVIEW-FIX | 10-04 (d) | D-24 |
| 9 | Review-Low 07 IN-07 (`zielwerte` verschieben) | 07-REVIEW-FIX | erledigt (08-01) | `zielwerte` liegt in `lib/seo-meta.ts` |
| 10 | Review-Low 07 IN-08 (doppelte Validierung/Hilfsfunktionen) | 07-REVIEW-FIX | nicht in diesem Meilenstein | reine Codepflege ohne Nutzerwirkung; Risiko kurz vor Meilensteinende |
| 11 | Ältere Release-Tests ohne Helfer (`pricing-parity`, `product-register`) | Rollout 07 § 13 | 10-02 (b) | D-14 |
| 12 | Impressum-Linkkontrast 2,84 : 1 (+ gleicher Link in `/datenschutz`) | 08 deferred 08-02 | 10-03 (c) | D-09/D-17, nur Darstellung |
| 13 | E2E-Zeitflakes WebKit (`:281`, `:476`; `:443`/`:501` behoben in 08-13) | 08 deferred | 10-02 (b) | D-14 |
| 14 | `content.test.ts` Zeitlimit | 08 deferred | erledigt (08-09, `1e1cbb6`) | – |
| 15 | Produkt-Snapshot veraltet | 08/09 deferred | erledigt (09-10, Register test.249 in `467da9d`) | Gate prüft `sync:product:check` erneut |
| 16 | Tabellen-Caption bei 360 px angeschnitten | 08 deferred 08-10 | 10-03 (c) | D-19 (2) |
| 17 | Verneinte KI-Formulierungen in zwei Artikeln | 08 deferred 08-13 | erledigt (Phase 9) | `content-pruefen --l1` 0 Befunde; Grep „autonom“ 0 |
| 18 | Überclaim-/Datenschutzaussagen (`/gobd`, `/fakten-ueber-craftos`) | 08 deferred 08-13 | Inhaber (optional) | bewusst belassen; nur auf Wunsch ändern |
| 19 | Lint-Konfiguration (Playwright-Berichte in `eslint .`) | 08-12/08-13 | erledigt (08-13, `6a2b382`) | `globalIgnores` enthält `tests/e2e/reports/**`, `tests/e2e/artifacts/**`; 10-06 bestätigt `npm run lint` nach einem E2E-Lauf mit Fehlschlag |
| 20 | Silbentrennung H2 `/preise` (Chromium, 1440 px) | 08-VERIFICATION, Rollout 08 § 13 | 10-03 (c) | D-19 (3) |
| 21 | Silbentrennung WebKit ohne Wörterbuch (`/hilfe/material-entnehmen-zurueckbuchen`) | 09-VERIFICATION, Rollout 09 § 13 | Inhaber | Prüfung nur in echtem Safari möglich; 10-01 sichert nur „kein Querscroll“ bei 360 px |
| 22 | `announcements.test.ts` rot wegen „Bald verfügbar“ in `lib/gewerke.ts` | 09 deferred 09-01/09-15 | erledigt (09-11) | 10-06 bestätigt in der vollen Suite |
| 23 | Antwortregel-Verstöße auf 15 Ratgebern | 09 deferred 09-01 | erledigt (09-16) | seo-audit sitewide 0 |
| 24 | Zusatzkarten Kassenbuch und § 13b auf `/funktionen` und im Menü | 09 deferred 09-09; 09-VERIFICATION | 10-04 (d) | D-21 |
| 25 | `components/product-demo` und `lib/demo/machine.ts` | 06-REVIEW WR-03; 07/09 deferred | Inhaber („archivieren oder löschen?“) + Schutztest in 10-04 (d) | D-23; keine Löschung ohne Freigabe |
| 26 | Lager-Foto-KI ohne Credit-Wert | 09 deferred 09-09 | 10-04 (d) | D-22; ohne Code-Beleg „nicht in diesem Meilenstein“ |
| 27 | Testkontext-Muster in `pricing-parity.test.ts` (Teilwörter) | 09 deferred 09-09 | 10-02 (b) | D-14 |
| 28 | Mini-UI-Status „Fertiggestellt“ | Rollout 09 § 1 | nicht in diesem Meilenstein | optional, keine Szene braucht ihn |
| 29 | Snapshot-Feld `tag` (Mobile) aus Sync-Ausgabe | 08-REVIEW-FIX Hinweis 3 | nicht in diesem Meilenstein | Register nennt den richtigen Tag; nur interne JSON |
| 30 | Grenzen 09-REVIEW-FIX (HI-01 Rollen/Lizenzen, LO-03 Inhaltsverzeichnis vor Text) | 09-REVIEW-FIX | nicht in diesem Meilenstein | bewusst begründet; Lizenzen bleiben Teil der manuellen Prüfdateien |
| 31 | Kundenportal-Befunde (leeres Portal, Einladungsmail) | 09-REVIEW-FIX, Rollout 09 § 13 | Inhaber | Produkt-Repo, kein Website-Auftrag |
| 32 | Analytics-Kontrolle `trial_click`/`ai_visit` (Phasen 5–9) | alle Rollouts | Orchestrator über Vercel-MCP → 10-05 (e)/10-07 | D-30; nur ohne MCP-Ergebnis Inhaber |
| 33 | Sichtung der Screenshots/Gesamteindruck (Phasen 5–9), `/app` Phone vs. Icons | VERIFICATION 07–09, Rollouts | Inhaber | ästhetisches Urteil |
| 34 | Inhaltliche Abnahme Wettbewerberaussagen (UWG), Review-Fixes 08/09 | 08-VERIFICATION, Rollouts 08/09 | Inhaber | fachlich-rechtliches Urteil |
| 35 | Rechts-/Steuerfakten der Wissensseiten, `[ASSUMED]`-Quellen aus `09-g.md` | 09-VERIFICATION, Rollout 09 § 13 | Inhaber | juristisches Urteil |
| 36 | Wettbewerberangaben nach 60 Tagen neu prüfen (bis 21.12.2026) | Rollout 08 § 14 | nicht in diesem Meilenstein | Daueraufgabe nach Meilensteinende; im Abschlussbericht als Termin |
| 37 | Datenschutzabschnitt Webanalyse, Impressum „§ 5 DDG“ | Rollout 08 § 14, STATE | Inhaber | Rechtstext |
| 38 | Portale, Bewertungen, Portal-Mails (SEO-08) | LINKPLAN Übergabe 1 | Inhaber; Messung und Übergabe 2 in 10-05 (e) | D-29 |
| 39 | SE-Ranking-Kontoverbrauch durch tägliche Messung | Rollout 09 § 13 Nr. 8 | Orchestrator/Inhaber; Daten in 10-05 (e) | D-27/D-28 |
| 40 | Sichtprüfung Esc/Fokusverlust im Header (06 WR-02/IN-01) | Rollout 06 § 12 | 10-01 (a) | automatisiert über D-07 |

### Paketzuschnitt (Vorschlag für den Planer)
| Plan | Paket | Welle | Worktree/Port | Kern | Eigene Dateien (D-33) |
|---|---|---|---|---|---|
| 10-01 | (a) Barrierefreiheit | 1 | `wt-10a` / 3101 | `a11y-audit.mjs`, Baseline über 158 Seiten × 5 Breiten, Behebung in eigenen Dateien, Tastaturfälle, Dimmstufe | `scripts/a11y-audit.mjs`, `scripts/visual-audit.mjs`, `tests/e2e/a11y.pw.cjs`, `app/globals.css`, `components/v2/**` (ohne BentoGrid/ComparisonTable), `components/layout/**`, `components/feature-snippet/**` |
| 10-02 | (b) Performance und Prüfsuite | 1 | `wt-10b` / 3102 | Lighthouse-Modus, Baseline, Optimierung, Flakes, Release-Helfer, Regex | `scripts/performance-audit.mjs`, `package.json`, `package-lock.json`, `app/layout.tsx`, `next.config.js`, `public/images/**`, `tests/e2e/playwright.config.cjs`, betroffene Testdateien aus D-14 |
| 10-03 | (c) DESIGN-02-Rest und Feinschliff | 1 (nach 10-UI-SPEC) | `wt-10c` / 3103 | Rechner, Support, Rechtsseiten, 404, Weißraum 1024, Caption, Silbentrennung | `app/rechner/**`, `components/calculators/**`, `app/support/**`, `app/{impressum,datenschutz,agb}/**`, `components/legal/**`, `app/not-found.tsx`, `components/v2/BentoGrid.*`, `components/v2/ComparisonTable.*`, `docs/DESIGN-V2.md` |
| 10-04 | (d) Funktionsergänzungen | 1 | `wt-10d` / 3104 | Kassenbuch/§ 13b, Lager-KI-Credit, ProductDemo-Schutztest, `INHALTE`-Schutz | `lib/funktionsgruppen.ts`, `lib/product-register.ts`, `lib/site.ts`, `lib/funktionsdetails/**`, Zähltests aus D-21 |
| 10-05 | (e) Audits, SE Ranking, Berichte | 1 | `wt-10e` / 3105 | Vorab-`/audit`, SE-Ranking-Audit, Map-/Metadatenkorrekturen, Linkregister + Übergabe 2, Etappennachweis 5–9, Abschlussbericht-Entwurf, Unit-Tabelle | `docs/seo/**`, `scripts/se-ranking-*`, `scripts/seo-report.mjs`, `tests/keyword-map.test.ts`, `tests/backlink-plan.test.ts`, `craftos/audit-report.*`, `docs/releases/ETAPPEN-NACHWEIS-V2.md`, `docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md` |
| 10-06 | Integration und Phasen-Gate | 2 | Haupt-Arbeitsbaum / 3100 | Übergabelisten, Audit-Behebungen, `sitemap.ts`, live-check Phase 10, `testMatch`, volle A11y-Matrix, Lighthouse-Endmessung, Gates D-14, Deferred-Tabelle Endstand | siehe D-33 „Nur 10-06“ |
| 10-07 | (f) Rollout | 3 | Haupt-Arbeitsbaum / 3100 | D-35/D-36 | `docs/releases/PHASE-10-ROLLOUT.md`, Endfassungen der Berichte, Phase-10-Messbericht |

- Reihenfolge der SE-Ranking-Blöcke in 10-05 (Units knapp, D-27): (1) `DATA_getSubscription`; (2) Audit auflisten und Recheck; (3) Audit-Ergebnis abholen; (4) Backlink-Stand (falls nicht im Etappenbericht); jeweils Kontostand davor und danach.
- Lighthouse-Gate-Seiten (Startwerte, D-11): `/`, `/funktionen`, `/funktionen/zeiterfassung`, `/gewerke/elektriker`, `/vergleich/plancraft-alternative`, `/blog/handwerkerrechnung-schreiben`.
</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Anforderungen und Planung
- `.planning/ROADMAP.md` § Phase 10 – Ziel und vier Erfolgskriterien
- `.planning/REQUIREMENTS.md` – DESIGN-02, DESIGN-05, QA-04, QA-05, QA-06, SEO-08 und Traceability
- `.planning/PROJECT.md` – Inhaberrahmen, Nicht-live-Liste, Lizenzen
- `.planning/STATE.md` – Entscheidungen der Phasen 5–9, Blocker (SE-Ranking-Test bis 03.11.2026)
- `.planning/EXECUTOR-RULES.md` – Parallelbetrieb, `.heavy-lock`, Ports, PID-Regeln, Anforderungs-Markierung
- `.planning/phases/09-gewerke-und-wissensinhalte/09-CONTEXT.md` – Muster für Pakete, Dateibesitz, Rollout (D-26 bis D-30)

### Zurückgestellte Punkte und Nachweise
- `.planning/phases/05-…/deferred-items.md`, `07-…/deferred-items.md`, `08-…/deferred-items.md`, `09-…/deferred-items.md`
- `.planning/phases/07-…/07-VERIFICATION.md`, `08-…/08-VERIFICATION.md`, `09-…/09-VERIFICATION.md` (Inhaberprüfungen, Nachtrag Lückenschluss)
- `.planning/phases/07-…/07-REVIEW-FIX.md` (zurückgestellte Lows), `08-…/08-REVIEW-FIX.md` (Hinweise), `09-…/09-REVIEW-FIX.md` (Grenzen, Produktbefunde)
- `craftos/docs/releases/PHASE-05-ROLLOUT.md` bis `PHASE-09-ROLLOUT.md` – Quelle für den Etappennachweis (D-30) und Muster für `PHASE-10-ROLLOUT.md`

### Audit und SEO
- `.claude/skills/audit/SKILL.md` (Repo-Wurzel) – Kopier-, Lösch-, Waiver- und Stichprobenregel, Berichtsaufbau
- `craftos/docs/seo/SE-RANKING-BEFUND-2026-10-20.md` – Ausgangsstand
- `craftos/docs/seo/reports/2026-10-21-messbericht-ausgangsstand.md` und die Etappenberichte `…-rollout-phase05` bis `…-rollout-phase09`, Projektabgleiche `2026-10-23-projektabgleich*.json`
- `craftos/docs/seo/LINKPLAN.md`, `backlink-register.json`, `tests/backlink-plan.test.ts`
- `craftos/scripts/seo-report.mjs`, `se-ranking-sync.mjs`, `scripts/lib/se-ranking-mcp.mjs`, `seo-audit.mjs`, `scripts/lib/seo-audit-core.mjs`, `route-audit.mjs`, `live-check.mjs`, `indexnow-submit.mjs`, `check-no-secrets.mjs`

### Prüfwerkzeuge
- `craftos/scripts/visual-audit.mjs`, `craftos/scripts/performance-audit.mjs`
- `craftos/tests/e2e/playwright.config.cjs`, `design-v2.pw.cjs`, `funktionsdetails.pw.cjs`, `home-navigation.pw.cjs`, `vergleich.pw.cjs`, `navigation.pw.cjs`, `function-illustrations.pw.cjs`
- `craftos/tests/release-repos.ts`, `pricing-parity.test.ts`, `product-register.test.ts`, `announcements.test.ts`, `content-produktwahrheit.test.ts`

### Design
- `.planning/phases/05-…/05-UI-SPEC.md` bis `09-…/09-UI-SPEC.md`; `craftos/docs/DESIGN-V2.md`
- `craftos/components/v2/**`, `components/v2/budgets.ts`, `lib/scenes.ts`, `/styleguide`

### Bestand dieser Phase
- `craftos/app/rechner/**`, `components/calculators/**`, `app/support/page.tsx`, `app/{impressum,datenschutz,agb}/page.tsx`, `components/legal/Legal.tsx`, `app/not-found.tsx`, `components/ui/PageHero.tsx`
- `craftos/lib/funktionsgruppen.ts`, `lib/product-register.ts` (`liveExtras`), `lib/site.ts`, `lib/funktionsdetails/**`
- `craftos/components/product-demo/**`, `lib/demo/**`, `components/ui/MobileAppGallery.tsx` (nur lesen)

### Produktwahrheit
- `craftos/lib/product-register.ts`, `craftos/docs/PRODUCT-REGISTER.md`, `docs/product-pricing-snapshot.json`, `docs/product-source-snapshot.json`
- Release-Repos nur lesend: `C:/Projekte/craft-connect-buddy` (`src/App.tsx`, `src/lib/featureFlags.ts`, `src/hooks/useLicense.ts`, `src/lib/constants.ts`) und `C:/Projekte/CraftOS - Mobile/craftos-mobile` (`origin/release`)
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- v2-Kopf `FunktionsKopf` (mit `answer`/`stand`, ohne Pflicht-Visual) und `ContentKopf`; `SectionHeader`, `Abschnitt`, `LinkKarten`, `FeatureCard`, `FaqList answerMax`, `FactList`, `CtaBand`, `Breadcrumbs` mit `crumbsFor`.
- `metaFor`/`zielwerte` (`lib/seo-meta.ts`) für Title/Description/H1 aus der Keyword-Map; Segment-OG über `pageOg`.
- axe-Muster in vier E2E-Specs und `visual-audit.mjs` (`@axe-core/playwright`, Tags `wcag2a`, `wcag2aa`, `wcag21aa`); Muster für Breitenschleifen und Screenshots in `visual-audit.mjs`.
- `performance-audit.mjs` als Grundgerüst (Kontext, Drosselung, Ergebnisdatei); `seo-audit.mjs` liest die Sitemap des Builds.
- `scripts/lib/se-ranking-mcp.mjs` (`createClient`/`callTool`) für Kontostand und Audit-Abrufe ohne Schlüsselausgabe.

### Established Patterns
- Keyword-Map als einzige Quelle für Title, Description und H1; Bearbeitung nur per Node-Skript mit Regelprüfung.
- Leitlinie L-1 („nur Unterstütztes“) mit Prüfskripten; Belege als Kurzform `web:`/`app:` im HTML.
- Paritätstests gegen den gepinnten Release-Commit; `tests/release-repos.ts` als Helfer.
- Parallelbetrieb mit Worktrees, `.heavy-lock`, ein schwerer Lauf zur Zeit; Rollout-Nachweis mit festen Abschnitten (Stand, Ship-Gate, Workflows, Push/Vercel, IndexNow, live-check, SE Ranking, Analytics, Messbericht, Anforderungsstatus, offene Punkte).
- Globale Reduced-Motion-Regel mit `transition-duration: 0s` (08-13); FeatureCard-Raster `grid-cols-1` unter 768 px.

### Integration Points
- `lib/funktionsgruppen.ts` speist Mega-Menü, Startseite, `/funktionen` und `llms.txt` (Zusatzkarten D-21).
- `app/sitemap.ts` mit Handpflege von `lastModified`; `scripts/live-check.mjs` mit Blöcken je Phase.
- `components/calculators/CalculatorPage.tsx` für alle drei Rechnerseiten; `components/legal/Legal.tsx` für alle drei Rechtsseiten.
- Vercel-Projekt `craftos` (Team `craft-os`); Web Analytics aktiv (`/_vercel/insights/script.js`), Ereignisse über `lib/tracking.ts` und `components/Analytics.tsx`.
</code_context>

<deferred>
## Deferred Ideas
- Koordinationsrezepte `website-unit`/`website-build`/`website-e2e` → außerhalb dieses Meilensteins (CraftOS-Workspace).
- Codepflege 07 IN-08 und Snapshot-Feld `tag` → nach dem Meilenstein.
- Mini-UI-Status „Fertiggestellt“ → nur bei Bedarf einer Szene.
- Wiederkehrende Prüfung der Wettbewerberangaben (spätestens 21.12.2026) → Daueraufgabe.
- Office-/PDF-Vorlagen zum Herunterladen, Hilfeartikel „Kunden in der App“, neue Szenen nur für Artikel → wie in Phase 9 zurückgestellt.
- Kundenportal-Produktbefunde, Datenschutzabschnitt Webanalyse, „§ 5 DDG“, ProductDemo-Löschung, Portalarbeit → Inhaber.
</deferred>

## Offene Punkte für den Orchestrator
- **SE-Ranking-Kontingent:** Bei ca. 7.700 Units/Tag ist das Restkontingent (26.209 am 23.10.) etwa am 26./27.10. aufgebraucht. Vor Beginn von 10-05 Kontostand lesen; Entscheidung über eine niedrigere Prüfhäufigkeit des Projekts 13094375 (oder die Reihenfolge der Messungen) liegt beim Orchestrator bzw. Inhaber, nicht in einem Plan.
- **Vercel-MCP:** Vor 10-05 einmal prüfen, ob `count_events`/`aggregate_events` für `trial_click` und `ai_visit` Daten liefern; Ergebnis als Datei übergeben (D-30).
- **„Lint-Konfiguration“:** In den deferred-items ist nur der Befund aus 08-12 belegt, und der ist in 08-13 erledigt (Nr. 19). Ist ein anderer Lint-Punkt gemeint, bitte nachreichen.
- **ProductDemo:** Inhaberfrage „archivieren oder löschen?“ formulieren (D-23).

---

*Phase: 10-abschlussaudit*
*Context gathered: 2026-10-23*

## Nachtrag Orchestrator (23.10.2026, nach SE-Ranking-Sofortmessung `1161e27`)

- **D-37 (ersetzt die Verbrauchsannahme in D-27):** Die tägliche Projektmessung kostet keine Units. Der Verbrauch kommt allein aus `DATA_getAiSearchLeaderboard` in `scripts/seo-report.mjs`, pauschal 7.500 Units je Abruf, zusammen mit Backlinks 7.612 je Berichtslauf. Paket (e) baut `seo-report.mjs` deshalb so um, dass das Leaderboard nur mit dem ausdrücklichen Schalter `--leaderboard` abgerufen wird (Standard: aus). Dazu gehören ein Test und eine Kostenwarnung in der Ausgabe. Kosten werden 10–60 s nach dem Abruf gebucht, darum liest das Skript den Kontostand erst nach einer Wartezeit erneut. Der Rollout 10-07 läuft ohne Leaderboard (≈ 640 Units).
- **D-38:** Messstand und Website-Audit vom 23.10. (`docs/seo/reports/2026-10-23-messstand-phase10.md`, Audit 485185, 97/100, 0 Fehler) sind die Vorab-Basis für Paket (e).
  - Die 13 Warnungen „Alt-Text fehlt“ betreffen nur das dekorative Gewerk-Symbol mit `alt=""`, das ist barrierefrei korrekt. Sie werden als begründete Ausnahme dokumentiert (Waiver-Typ „Crawler artifact“ nach dem /audit-Skill), es kommt kein Alt-Text dazu.
  - Impressum: Den ODR-Link (Plattform 2025 eingestellt) und den kurzen Title gibt nur der Inhaber frei. Bis dahin steht das als Inhaberpunkt, der Rechtstext bleibt unverändert.
- **D-39:** Perplexity-Prompts werden nie geprüft, Gemini und AI Mode haben keine Prompts. Paket (e) prüft das per Project API, ohne Unit-Kosten, und gleicht es an. Neue Prompts kommen nur aus der vorhandenen Prompt-Liste.
