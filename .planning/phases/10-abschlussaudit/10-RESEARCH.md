# Phase 10: Abschlussaudit – Research

**Researched:** 2026-10-23
**Domain:** Barrierefreiheitsprüfung (axe-core über Playwright, Tastaturbedienung), Lighthouse-Labormessung (Node-API, mobile Standardvoreinstellung), Next.js-16-Seitenvorlagen auf v2-Bausteinen, Produktwahrheit gegen `origin/release`, SEO-Audit nach dem Repo-Skill `/audit`
**Confidence:** HIGH für alle Befunde mit eigener Messung oder Code-/Release-Pfad (Lighthouse-Werte live, axe-Probe, Font-Experimente, Registerbelege); MEDIUM für Laufzeit- und RAM-Schätzungen der vollen Matrix; LOW nur dort, wo ausdrücklich `[ASSUMED]` steht

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Umfang, Produktbasis und Regeln
- **D-01 (Umfang):** DESIGN-05, QA-04, QA-05, QA-06 und der DESIGN-02-Rest vollständig; SEO-08 wird gemessen und vorbereitet, aber nur bei belegtem Ziel abgeschlossen (D-29). Dazu die zugeordneten zurückgestellten Punkte (D-31). Keine neue Seite, keine neue URL, kein entfallender Slug.
- **D-02 (Produktbasis einfrieren):** Ausgangsbasis ist der Registerstand nach `467da9d`: Web `origin/release` = `bfe165e9` (v4.0.0-test.249), Mobile `origin/release` = `837aab4f` (mobile-v1.0.0-test.96); beide am 23.10.2026 nachgeprüft. Produktfakten nur aus `lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts`, `docs/product-pricing-snapshot.json` und den Release-Pfaden (nur lesend per `git show origin/release:<pfad>`, kein Fetch in den Spuren). Ein späterer Release-Sprung wird nur im Integrationsplan (10-06) und im Rollout per `npm run sync:product:check` und Delta-Prüfung übernommen, nie blind.
- **D-03 (Inhaberregel 22.10.2026 für jede Textänderung):** Es wird nur genannt, was unterstützt wird; keine Negativlisten (einzige Ausnahme bleibt die GoBD-Zertifizierungsfrage, Überclaim-Schutz). „Live“ heißt für Kunden erreichbar: Freischaltungen am Release beachten – `isDeveloper` (KI-Agent), Feature-Flags (`src/lib/featureFlags.ts`, z. B. `subcontractorPortalInvites: false`), „Bald verfügbar“ (Videoanalyse) und Lizenzsperren (`LicenseProtectedRoute`, `useLicense`). Beispiel aus diesem Befund: Das Kassenbuch (`/buchhaltung/kasse`) ist mit `LicenseProtectedRoute feature="finanzen"` geschützt; sichtbar für Admin immer, für Büro nur mit Schalter `finanzen_sichtbar`, für die App-Lizenz nie (`src/hooks/useLicense.ts` Z. 58/85). Jede neue Aussage nennt deshalb die Lizenz. Prüfwerkzeuge: `lib/leitlinie*`, `lib/nur-unterstuetzt.ts`, `tests/announcements.test.ts`, `tests/content-produktwahrheit.test.ts`, `scripts/content-pruefen.mjs --l1`.
- **D-04 (Lösch- und Kopierregel, phasenweit):** Ohne Inhaberfreigabe wird keine Datei, Seite, URL, kein Bild und kein Abschnitt gelöscht; Kandidaten landen in der Inhaberliste „Freigabe zum Entfernen nötig“ (Format nach dem Audit-Skill). Fließtexte werden nicht umgeschrieben; erlaubt sind nur mechanische SEO-Korrekturen nach der Kopierregel des Skills (Title, Description, Alt-Text, Überschriften-Tag, Schema, Links, Anker) und die ausdrücklich beauftragten Kartentexte aus D-21.

#### Barrierefreiheit (DESIGN-05)
- **D-05 (Prüfumfang):** Alle 156 URLs aus der Sitemap des lokalen Produktionsbuilds plus die 404-Seite (ein unbekannter Pfad) und `/styleguide` (noindex, aber erreichbar) = 158 Seiten. Breiten 360, 390, 768, 1024, 1440 px. **Chromium** prüft die volle Matrix (790 Seitenaufrufe); **WebKit** prüft je Vorlage eine Seite (Start, Funktionsübersicht, Funktionsdetail, `/app`, Gewerke-Übersicht und -Detail, Ratgeber-/Hilfe-Übersicht, -Kategorie und -Artikel, Vergleichs-Hub und Alternative, `/preise`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd`, Rechner, `/support`, Rechtsseite, 404) bei allen fünf Breiten. Geprüft wird der stabile Zustand mit `reducedMotion: "reduce"` und zusätzlich auf den Seiten mit FeatureSnippet bzw. animierter Szene ein Zustand mit laufender Animation (D-10).
- **D-06 (Bestehenskriterien):** axe mit den Tags `wcag2a`, `wcag2aa`, `wcag21aa` (wie in `scripts/visual-audit.mjs` und den E2E-Specs) und zusätzlich `wcag22aa`. Hartes Gate: 0 Verstöße mit Wirkung `serious` oder `critical`; `color-contrast` mit 0 Verstößen jeder Wirkung. „Kontrast ≥ 4,5 : 1“ gilt auch für großen Text: Dafür werden die Ergebnisse von `color-contrast-enhanced` nur für Knoten mit erwartetem Verhältnis 4,5 : 1 (großer Text) gewertet; der AAA-Wert 7 : 1 für normalen Text ist kein Gate. Verstöße `moderate`/`minor` werden im Bericht gezählt und behoben, wo es ohne Designänderung geht; Rest mit Begründung im Bericht.
- **D-07 (Tastaturbedienung, automatisiert):** Je Seite und Breite ein Tab-Durchlauf von der Seitenspitze: (1) jedes sichtbare, nicht `inert`/`aria-hidden` liegende Bedienelement (`a[href]`, `button`, `input`, `select`, `textarea`, `summary`, `[tabindex="0"]`) erhält mindestens einmal den Fokus; (2) keine Tastaturfalle (Fokus kehrt zum Dokumentanfang bzw. in die Browserleiste zurück, Obergrenze Elementzahl + 20 Schritte); (3) sichtbarer Fokusindikator (berechnetes `outline` oder `box-shadow` ungleich `none` bzw. Stiländerung gegenüber dem Ruhezustand); (4) kein Fokus auf unsichtbare oder außerhalb des Viewports verbleibende Elemente (z. B. geschlossene Menüs, Rahmen-Inhalte). Zusätzlich je Vorlage: Sprunglink zum Inhalt, Mega-Menü bzw. Drawer mit Enter/Leertaste öffnen, mit Esc schließen, Fokus kehrt zum Auslöser zurück (deckt die offene Sichtprüfung WR-02/IN-01 aus Phase 6 automatisiert ab); Rechnerfelder, FAQ-Elemente, `ContentSearch`, Pause-Knopf der FeatureSnippets und Tabellen mit Querscroll (fokussierbarer Scrollbereich) per Tastatur bedienbar.
- **D-08 (Werkzeug):** Neues Skript `craftos/scripts/a11y-audit.mjs` (Muster `visual-audit.mjs`, Playwright + `@axe-core/playwright`, keine neue Abhängigkeit): liest die URLs aus der Sitemap des laufenden lokalen Servers, Parameter `--paths=`, `--widths=`, `--engines=` und `--shard=k/n` (damit kein einzelner Lauf die `.heavy-lock` übermäßig hält), Ergebnis `test-results/a11y/report.json` mit Zählern je Regel, Seite, Breite und Engine; Exit 1 bei Gate-Verstoß. Ergänzend eine E2E-Spec `tests/e2e/a11y.pw.cjs` mit den Vorlagenseiten und den Tastaturfällen aus D-07 für die reguläre Suite (die Spec iteriert die fünf Breiten selbst, weil `playwright.config.cjs` nur 1440 und 390 als Projekte führt). `visual-audit.mjs` prüft axe künftig bei allen fünf Breiten statt nur 390/1440. Schlussnachweis: voller Lauf im Integrationsplan 10-06 auf dem zusammengeführten Stand, Zahlen in `craftos/docs/releases/PHASE-10-ROLLOUT.md`.
- **D-09 (Bekannte Altfehler Rechtsseiten):** `/impressum` Z. 76 und `/datenschutz` Z. 77 nutzen `font-semibold text-primary-600` (#d28a13 auf Weiß, 2,84 : 1); dazu prüfen: Augenbraue `spec-label text-primary-600` in `components/legal/Legal.tsx` Z. 29. Behebung nur über die Darstellung (Farbton mit ≥ 4,5 : 1, z. B. `text-primary-800` #784b10, Unterstreichung für Links im Fließtext) im Paket (c) zusammen mit der v2-Umstellung. Am Rechtstext ändert sich kein Wort: Ein Test vergleicht den normalisierten Textinhalt des Hauptbereichs der drei Rechtsseiten im Build vor und nach der Umstellung (Hash bzw. wörtlicher Vergleich, Referenz vor der ersten Änderung erzeugt).
- **D-10 (FeatureSnippet-Dimmstufe, deferred 07-08):** Inaktive Schritte (heute 50 % bzw. 35 % Deckkraft, z. B. `lager`/`stockMovement`, `aufmass`/`opening`) erhalten eine Darstellung, die auch in Zwischenständen ≥ 4,5 : 1 erreicht (Farbton statt Deckkraft oder höhere Stufe); die Hervorhebung des aktiven Schritts bleibt erkennbar (Rahmen, Gewicht, Markierung). Begründung: DESIGN-05 verlangt „jede Seite besteht“, und ein Prüfer mit laufender Animation sähe sonst Verstöße. Besitzer: Paket (a). Die Kopplung an die ProductDemo-Entscheidung aus Phase 7 entfällt.

#### Performance und Prüfsuite (QA-04)
- **D-11 (Lighthouse-Messung):** Lighthouse mobil mit Standardvoreinstellung (simulierte Drosselung, mobile Emulation), Kategorie Performance, gegen den lokalen Produktionsserver (`next build` + `next start`, eigener Port); drei Läufe je URL, gewertet wird der Median. Gate je Vorlage: Performance ≥ 95 und LCP < 2,5 s; berichtet werden zusätzlich CLS, TBT, FCP, Speed Index und die Hauptbefunde. Vorlagen und Startwerte: Startseite `/`; Funktions-Vorlage `/funktionen` und `/funktionen/zeiterfassung` (Detailvorlage mit FeatureSnippet); Gewerke `/gewerke/elektriker`; Vergleich `/vergleich/plancraft-alternative`; Ratgeber `/blog/handwerkerrechnung-schreiben`. Das Fundament misst je Vorlage zusätzlich zwei weitere Seiten und nimmt die schwerste als Gate-Seite (Discretion). Zur Information (kein Gate): `/preise`, `/app`, ein Hilfeartikel, `/rechner/stundensatz`. Jeder Wert trägt im Bericht „Labordaten, mobil, lokal, Median aus 3 Läufen, URL“. Nach dem Rollout eine Kontrollmessung derselben URLs gegen https://craftos.eu (lokal ausgeführt, als Labordaten gekennzeichnet, kein Gate).
- **D-12 (Werkzeug):** `scripts/performance-audit.mjs` misst heute ohne Lighthouse (Playwright, eigene LCP/CLS/Interaktionswerte, 13 Routen, `test-results/performance.json`). Es wird um einen Modus `--lighthouse` erweitert (programmatische Lighthouse-API, Chrome aus Playwright `chromium.executablePath()`, Ergebnisse `test-results/lighthouse/<route>-<lauf>.json` und Zusammenfassung `test-results/lighthouse/summary.json`, Exit 1 bei Gate-Verstoß); der bisherige Modus bleibt. Lighthouse ist im Repo nicht installiert und wird als `devDependency` mit fester Version aufgenommen (vorher Context7-Doku zur Node-API; `package.json`/`package-lock.json` gehören Paket (b)).
- **D-13 (Optimierung):** Reihenfolge nach Lighthouse-Befund: LCP-Element (Bild-Priorität, Größen, Schrift-Laden mit `next/font` und `display: swap`), Render-Blocker, JavaScript der Client-Inseln (Hydration, ungenutzter Code), CLS (zweiter Teil von 07 IN-05: CLS auch ohne reduzierte Bewegung auf den 8 Snippet-Seiten messen und halten). Kein Entfernen von Funktionen, Bildern, Skripten oder Abschnitten (D-04); Analytics und Speed Insights bleiben eingebunden. Ist ein Ziel nur mit sichtbarer Gestaltungsänderung erreichbar, wird sie im 10-UI-SPEC begründet oder als offene Abweichung berichtet, nie still.
- **D-14 (Prüfsuiten angepasst und grün):** Am Phasenende lokal grün: `npx vitest run` (volle Suite), `npm run typecheck`, `npm run lint`, `npm run build`, E2E `npm run test:e2e` (Chromium und WebKit, Projekte 1440 und 390-touch, inkl. neuer `a11y.pw.cjs`), `seo-audit.mjs` sitewide 0, `route-audit.mjs` 0 Fehler und 0 defekte Links, `visual-audit.mjs` (fünf Breiten, ergänzte Routen für Rechner, Support, Rechtsseiten, 404, eine Gewerke-Detailseite, eine Hilfekategorie) ohne Befund, `live-check.mjs` lokal grün, `sync:product:check` grün. Bekannte Zeitflakes (05 Nr. 2 „außerhalb des Viewports“, 08 `function-illustrations.pw.cjs:281` Tab-Sichtbarkeit und `:476` Pause) werden deterministisch gemacht (Auslesen nach `data-running="false"` bzw. längeres Poll-Fenster), nicht übersprungen. `pricing-parity.test.ts` und `product-register.test.ts` nutzen den Helfer `tests/release-repos.ts` (Phase-7-Befund: sonst stilles Überspringen ohne Release-Repos); das Testkontext-Muster in `pricing-parity.test.ts` erhält eine Wortgrenze (09-09: Treffer in „Spätestens“).

#### DESIGN-02-Rest (Paket c)
- **D-15 (Rechner):** `/rechner`, `/rechner/stundensatz`, `/rechner/angebotskalkulation` erhalten einen v2-Kopf (FunktionsKopf bzw. gleichwertiger Kopf mit Brotkrumen aus `crumbsFor`, H1 aus der Keyword-Map, Antwort ≤ 300 Zeichen mit `data-answer`, wo die Antwortregel gilt), v2-Abschnitte und CtaBand. Die Rechner selbst (`components/calculators/*`) bleiben in Rechenlogik, Feldnamen und Beschriftungen gleich (Tests `calculators.test.ts`, `calculator-hydration.test.ts`; `performance-audit.mjs` füllt „Personalkosten pro Jahr in Euro“); weiterhin keine Speicherung der Eingaben. `CalculatorPage.tsx` wird auf v2 umgestellt statt ersetzt.
- **D-16 (`/support`):** `PageHero` entfällt zugunsten des v2-Kopfs; Kontaktwege (E-Mail aus `site.ts`, Hilfezentrum, Login/App-Links nur wie heute) als LinkKarten bzw. FeatureCard-Raster; Inhalte nur aus `site.ts` und bestehenden Seiten.
- **D-17 (Rechtsseiten):** `LegalShell`/`LegalSection`/`DataBlock` (`components/legal/Legal.tsx`) werden auf v2-Typografie, -Abstände und -Kopf (mit vorhandenen Brotkrumen) umgestellt; Wortlaut, Reihenfolge und Gliederung der Rechtstexte bleiben unverändert (Test aus D-09). Kontrastbehebung aus D-09.
- **D-18 (404):** `app/not-found.tsx` auf v2-Bausteine (Kopf ohne Brotkrumen, Linkkarten zu Startseite, Hilfe, Funktionen), Status 404 und `noindex` bleiben; Texte bleiben sinngemäß, nur Unterstütztes.
- **D-19 (Design-Feinschliff aus den Vorphasen):** (1) Weißraum in md-Kacheln ohne Phone bei 1024 px (deferred 07-08, bis 122 px): Text der md-Kachel am Kachelboden ausrichten oder das Raster zwischen 1024 und 1279 px dreispaltig führen – Entscheidung im 10-UI-SPEC als dokumentierte UI-SPEC-Abweichung, Messung mit dem B10-Verfahren vorher/nachher; (2) Tabellenüberschrift (`caption`) der `ComparisonTable` bei 360 px angeschnitten (deferred 08-10): Caption außerhalb des Scrollbereichs, gilt für alle Tabellen (`/preise`, Alternativen, kleine Betriebe); (3) Silbentrennung im Kopfwort der H2 auf `/preise` bei 1440 px („Handwer-kersoftware“, Rollout 08 § 13): Überschriften-Regel `hyphens: manual` (bzw. die in 08-10/08-11 genutzte Lösung) ohne Wortänderung, damit Anker `#was-kostet-handwerkersoftware` und Antwort unverändert bleiben.
- **D-20 (10-UI-SPEC):** Vor der Planung ein schlankes `10-UI-SPEC.md` für D-15 bis D-19, das 05–09-UI-SPEC referenziert statt wiederholt; Prüfung durch gsd-ui-checker. Design-Kaskade laut Projekt-CLAUDE.md einmal im UI-SPEC (frontend-design read-only, ui-ux-pro-max `--domain ux`, 21st.dev nur Inspiration falls verfügbar, Context7, SEO-Check), nicht je Plan.

#### Funktionsergänzungen aus zurückgestellten Punkten (Paket d)
- **D-21 (Kassenbuch und § 13b auf `/funktionen` und im Menü):** Die Registereinträge „Kassenbuch“ und „Rechnung nach § 13b“ (`liveExtras`, heute `advertised: false`) werden beworben und erscheinen als Zusatzfunktionen in `lib/funktionsgruppen.ts` (Gruppe Buchhaltung bzw. Rechnungen nach der bestehenden Gruppenlogik; Discretion), damit auf `/funktionen` und im Mega-Menü. Ziel je Zusatzfunktion nach der Regel aus 07-02: Kassenbuch → `/funktionen/buchhaltung` (dort Kachel „Kassenbuch“ vorhanden, verlinkt `/hilfe/kassenbuch-fuehren`); § 13b → passende Detailseite mit Kachel, sonst Kachel mit `href` auf `/hilfe/rechnung-fertigstellen` ergänzen. Kartentext nennt die Lizenz (D-03: Kassenbuch nur Admin bzw. Büro mit Finanzfreigabe). Mengen- und Zähltests (`funktionsgruppen.test.ts`, `funktionen-seite.test.ts`, `navigation.test.ts`, betroffene Zählstellen in `home-navigation.pw.cjs`/`navigation.pw.cjs`, `ZUSATZ_IDS`) werden im selben Plan gleichgezogen; `llms.txt` und Startseite folgen ihrer Quelle `funktionsgruppen.ts`.
- **D-22 (Credit-Wert der Lager-Foto-KI):** Ein Wert wird nur genannt, wenn er am Release im Code steht (Web `src/lib/constants.ts`/`src/lib/subscription/pricing.ts`, Supabase-Funktion oder Mobile-Konfiguration – nicht nur in einer Sprachdatei) und dann zuerst in `lib/site.ts` mit Belegkommentar und Paritätstest aufgenommen wird. Ohne Code-Beleg bleibt die Seite ohne Wert und der Punkt wird als „nicht in diesem Meilenstein (kein Code-Beleg)“ geschlossen.
- **D-23 (ProductDemo):** `components/product-demo/*` (ProductDemo.tsx ~3.070 Zeilen, PlanningBoard) und `lib/demo/{machine,data}.ts` bleiben unverändert und ungerendert; nichts wird gelöscht. Die Szene `ki` zeigt Craft AI, das aus einer Zeitanfrage einen Zeiteintrag vorschlägt – das entspricht dem nicht freigeschalteten KI-Agenten (`isDeveloper`) und darf so nicht ausgespielt werden. Eine Umstellung auf belegte Funktionen wäre ein Neubau ohne Einsatzort (Inhaberrahmen 20.10.: kein Demo-Betrieb). Daher: Inhaberentscheidung „archivieren oder löschen?“ mit Empfehlung „löschen nach Freigabe“ samt Folgen (übersprungene Specs `demo-planning.pw.cjs`, `mobile-step-flow.pw.cjs`, `tests/demo.test.ts`, `components/ui/MobileAppGallery.tsx`). Bis dahin ein Schutztest, dass keine Datei unter `app/` die Demo importiert (heute nur für `FunktionsDetail` geprüft, `tests/funktionsdetails.test.ts` Z. 1424).
- **D-24 (07 IN-06):** `INHALTE` in `lib/funktionsdetails/index.ts` wirft bei doppeltem Slug, statt still zu überschreiben (kleiner Schutz mit rotem Test zuerst).

#### Audits, SE Ranking und Abschlussbericht (QA-06, SEO-08; Paket e und Rollout)
- **D-25 (`/audit` nach dem Repo-Skill):** Ablauf nach `.claude/skills/audit/SKILL.md` mit `craftos/` als Projektwurzel: Audit → Bericht → Freigabe → Behebung. Die Freigabe für mechanische Korrekturen erteilt der Orchestrator im Rahmen der Inhaberfreigaben; Kopierregel (kein Fließtext umgeschrieben, Zahl geänderter Sätze im Bericht, Sollwert 0) und Löschregel (nichts löschen; Kandidaten unter „Needs your approval to remove“ als Inhaberpunkt) gelten unverändert, ebenso Waiver- und Stichprobenregel. Zeitpunkte: **Vorab-Audit** in Welle 1 gegen https://craftos.eu (Stand Phase 9) und den lokalen Build – liefert die Behebungsliste, die nach Dateibesitz verteilt wird (Map-/Metadatenkorrekturen in Paket e, alles Übrige im Integrationsplan 10-06); **Bestätigungsaudit** nach dem Rollout gegen https://craftos.eu ohne Behebungen. Quellen ohne Zugang (Search Console, Semrush, Business Profile) erscheinen als „nicht gemessen“ mit Grund; SE Ranking ersetzt Semrush für Wettbewerber, Backlinks und Keywords (Quelle je Zahl). Ebene Local wird mit Typ und Grund gewaivt (craftos.eu ist kein lokales Geschäft). Berichtsdateien nach Skill-Konvention `craftos/audit-report.md` und `craftos/audit-report.html` (Vorab und Bestätigung getrennt datiert, nichts überschrieben).
- **D-26 (SE-Ranking-Website-Audit):** Zuerst vorhandene Audits auflisten (`PROJECT_listAudits`/`DATA_listAudits`); das Audit vom 20.10.2026 (126 Seiten, 96/100, 0 Fehler, 14 Warnungen, 60 Hinweise; Rohdaten wurden damals nicht gesichert) wird per Recheck wiederholt, sonst ein Standard-Audit mit Seitenlimit ≥ 160 angelegt. Rohdaten mit Datum unter `docs/seo/data/`. Ziel: 0 Fehler, 0 offene On-Page-Warnungen; „JavaScript nicht komprimiert“ wird live über `content-encoding` geprüft und, falls Crawler-Artefakt, mit Beleg gewaivt. Lauf einmal vorab (Welle 1) und einmal nach dem Rollout.
- **D-27 (Unit-Budget SE Ranking):** Höchstens 5.000 Units für alle Phase-10-Abrufe. Kontostand vor und nach jedem Block über `DATA_getSubscription` (Muster aus PHASE-09-ROLLOUT § 7, Skript im Scratchpad oder `scripts/lib/se-ranking-mcp.mjs`, Schlüssel nie ausgeben). Kontostand am 23.10.2026: 26.209 von 100.000, Testzugang bis 03.11.2026. Beobachtet: Die tägliche Projektmessung (Positionen und KI-Suche des Projekts 13094375) verbraucht ca. 7.700 Units je Tag – bei unveränderter Einstellung ist das Kontingent etwa am 26./27.10. erschöpft. Folge: Die SE-Ranking-Blöcke laufen so früh wie möglich (Vorab-Audit in Welle 1) und unmittelbar nach dem Rollout; reicht der Stand nicht, steht im Bericht „nicht gemessen“ mit Grund, keine Schätzung. Eine Änderung der Prüfhäufigkeit im SE-Ranking-Projekt nimmt kein Plan vor (Orchestrator/Inhaber, siehe offene Punkte).
- **D-28 (Abschlussbericht):** `craftos/docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md` (Entwurf in Paket e, Endwerte im Rollout): Positionen (Top 10/Top 100 je Seitengruppe), KI-Share-of-Voice, verweisende Domains (seriös vs. Spam, Abgleich mit dem Register), Domain-InLink-Rank – jeweils gegen den Ausgangsstand 20.10.2026 (`SE-RANKING-BEFUND-2026-10-20.md`, `reports/2026-10-21-messbericht-ausgangsstand.md`) und den Etappenberichten 05–09; dazu Audit-Ergebnisse (`/audit`, SE-Ranking-Audit), Lighthouse- und A11y-Zahlen, Anforderungsstatus und eine Tabelle des Unit-Verbrauchs (Phasen 5–10 plus Kontoverbrauch durch die tägliche Messung, ca. 7.700 Units/Tag, mit Kontoständen und Zeitpunkten) als Datengrundlage für die Tarifempfehlung, die der Orchestrator vor dem 03.11.2026 gibt. Der Bericht selbst gibt keine Tarifempfehlung.
- **D-29 (SEO-08):** Messung der verweisenden Domains in SE Ranking (im Rahmen von `seo-report.mjs`, das den Registerabgleich schon enthält). Statuspflege in `docs/seo/backlink-register.json` nach LINKPLAN § 5: „live“ nur, wenn die Domain in SE Ranking als verweisend erscheint oder ein öffentlich erreichbares Profil nachweislich auf https://craftos.eu verlinkt (Abruf mit Datum in `notiz`); sonst Status unverändert. Je offenem Eintrag ein kopierfertiger Browser-Prompt (Regeln aus LINKPLAN § 2 wörtlich: nichts kaufen, keine Zugangsdaten, Konten nur durch den Inhaber, Fakten nur aus `llms.txt`/Impressum); Faktenstand der Prompts gegen das aktuelle `llms.txt` prüfen. Neue Übergabe `LINKPLAN.md` § „Übergabe 2“ mit Reihenfolge nach Priorität (zuerst die offenen Punkte aus Übergabe 1: ProvenExpert, G2, OMR-Nachfassen, kennstdueinen.de, SoftwareWorld, zwei Portal-Mails). `tests/backlink-plan.test.ts` grün. SEO-08 bleibt „In Progress“, solange nicht ≥ 15 neue seriöse Domains in SE Ranking belegt sind; keine Schätzung.

#### Etappennachweis (QA-05)
- **D-30 (Sammeldokument):** `craftos/docs/releases/ETAPPEN-NACHWEIS-V2.md`, eine Zeile je Etappe 5–10 mit Belegverweis: Code-Commit und Push-Zeit, Ship-Gate (Prüfungen und Ergebnis), `gh workflow list --all` vor dem Push, Vercel-Deployment-ID und READY, IndexNow (URL-Zahl, HTTP-Status), live-check (Zahl OK/FEHLER), SE-Ranking-Etappenbericht, `trial_click`/`ai_visit`. Quellen sind ausschließlich die Rollout-Nachweise `PHASE-05-ROLLOUT.md` bis `PHASE-09-ROLLOUT.md` (Paket e) und `PHASE-10-ROLLOUT.md` (Rollout). Analytics: Der Orchestrator fragt `trial_click` und `ai_visit` über das Vercel-MCP (Web-Analytics-Events, Projekt `craftos`, Team `craft-os`) je 24-Stunden-Fenster nach jedem Rollout ab und übergibt Zahlen mit Abfragezeitpunkt (z. B. als Datei unter `docs/releases/data/`); „kontrolliert“ heißt Abfrage ausgeführt und Ergebnis dokumentiert. Ein Fenster mit 0 Ereignissen ist ein Befund (Verdrahtung live prüfen: `data-track`, `/_vercel/insights/script.js`). Für Phase 10 folgt das 24-Stunden-Fenster als Nachtrag. Nur wenn das Vercel-MCP keine Events liefert, bleibt die Kontrolle ein Inhaberpunkt mit der bisherigen Anleitung.

#### Zurückgestellte Punkte
- **D-31 (Zuordnung):** Jeder offene Punkt aus `deferred-items.md` (Phasen 5, 7, 8, 9; Phase 6 hat keine Datei), den VERIFICATION-Dateien 07–09 und den Abschnitten „offene Punkte“ der Rollout-Nachweise 05–09 ist in der Tabelle unter `<specifics>` genau einem Plan zugeordnet oder als „Inhaber“ bzw. „nicht in diesem Meilenstein“ begründet. Bereits erledigte Punkte stehen mit Beleg darin, damit sie nicht erneut geplant werden. Der Integrationsplan hält die Tabelle mit dem Endstand nach und überträgt sie in `PHASE-10-ROLLOUT.md`.

#### Parallelisierung
- **D-32 (Pakete und Wellen):** Pakete mit getrennten Dateimengen, je eigener Worktree `C:/Projekte/wt-10<x>` auf Branch `phase10-spur-<x>` mit Port 3101–3105 (Muster Phasen 8/9); der Orchestrator merged nach `main`. **Welle 1 (parallel):** 10-01 (a) Barrierefreiheit, 10-02 (b) Performance und Prüfsuite, 10-03 (c) DESIGN-02-Rest und Feinschliff, 10-04 (d) Funktionsergänzungen, 10-05 (e) Audits, SE Ranking, Linkregister, Etappennachweis und Berichtsentwurf. **Welle 2:** 10-06 Integration und Phasen-Gate (Haupt-Arbeitsbaum, Port 3100). **Welle 3:** 10-07 (f) Rollout. Zuschnitt und Dateibesitz in `<specifics>`.
- **D-33 (Geteilte Dateien):** Jede geteilte Datei hat je Welle genau einen Besitzer; alle anderen tragen nötige Änderungen in die Übergabeliste ihres SUMMARY ein, die 10-06 umsetzt. Feste Besitzer in Welle 1: `app/globals.css` und bestehende Dateien unter `components/v2/**` sowie `components/layout/**` → (a), ausgenommen `components/v2/BentoGrid.{tsx,module.css}` und `components/v2/ComparisonTable.{tsx,module.css}` → (c); neue Dateien unter `components/v2/` darf nur (c) anlegen. `app/layout.tsx`, `next.config.js`, `package.json`, `package-lock.json`, `tests/e2e/playwright.config.cjs`, `scripts/performance-audit.mjs`, `public/images/**`, `scripts/optimize-images.mjs` → (b). `scripts/visual-audit.mjs`, neue `scripts/a11y-audit.mjs`, `tests/e2e/a11y.pw.cjs`, `components/feature-snippet/**` → (a). `app/rechner/**`, `components/calculators/**`, `app/support/**`, `app/{impressum,datenschutz,agb}/**`, `components/legal/**`, `app/not-found.tsx`, `docs/DESIGN-V2.md`, `10-UI-SPEC`-Umsetzung → (c). `lib/funktionsgruppen.ts`, `lib/product-register.ts`, `lib/site.ts`, `lib/funktionsdetails/**`, Zähltests aus D-21, `tests/funktionsdetails.test.ts`, `tests/demo.test.ts` (nur Schutztest) → (d). `docs/seo/**` (inkl. `keyword-map.json`, `KEYWORD-MAP.md`, `backlink-register.json`, `LINKPLAN.md`), `scripts/se-ranking-*`, `scripts/seo-report.mjs`, `tests/keyword-map.test.ts`, `tests/backlink-plan.test.ts`, Audit-Berichte, `docs/releases/ETAPPEN-NACHWEIS-V2.md`, `docs/releases/MEILENSTEIN-V2-ABSCHLUSS.md` (Entwurf) → (e). Nur 10-06: `app/sitemap.ts` (`lastModified`-Zeilen der geänderten Seiten), `scripts/live-check.mjs` (Phase-10-Block), `testMatch` für `a11y.pw.cjs`, Behebungen aus dem Vorab-Audit außerhalb von `docs/seo/**`, Übergabelisten. `.planning/STATE.md`/`ROADMAP.md` nur Orchestrator.
- **D-34 (Schwere Läufe):** Build, `next start`, volle Vitest-Suite, E2E, `a11y-audit.mjs`, `visual-audit.mjs`, `performance-audit.mjs` (auch `--lighthouse`) und `npm ci` nur unter der gemeinsamen Sperre `C:/Projekte/Websitenerstellung/.heavy-lock`, einzeln, Koordinationsstatus vorher lesen (kein Website-Rezept, also lokal). Die volle A11y-Matrix läuft in Teilen (`--shard`), die Sperre wird zwischen den Teilen freigegeben. Lighthouse-Messungen nie parallel zu einem anderen schweren Lauf (Messwerte wären verfälscht). Je Worktree eigener Port und eigene PID, danach Port frei prüfen. SE-Ranking- und Vercel-Abfragen sind keine schweren Läufe, aber nur in Paket e bzw. durch den Orchestrator.

#### Rollout und Anforderungsstatus
- **D-35 (Rollout 10-07):** Letzter Plan; nur dort wird gepusht. Lokale Gates aus D-14 auf dem integrierten Stand, Code-Review-Gate durch den Orchestrator, Ship-Gate, `gh workflow list --all` unmittelbar vor dem Push (erwartet nur „Dependabot Updates“, kein `.github` im Diff), Vercel READY, `live-check.mjs` (mit Phase-10-Block), `npm run indexnow` erst nach bestätigtem Live-Stand, `se-ranking-sync.mjs --check`, SE-Ranking-Audit-Recheck (D-26), Bestätigungs-`/audit` (D-25), Lighthouse-Kontrollmessung live (D-11), `node scripts/seo-report.mjs --etappe rollout-phase10` genau einmal, Phase-10-Zeile in `ETAPPEN-NACHWEIS-V2.md`, `craftos/docs/releases/PHASE-10-ROLLOUT.md` und Endfassung `MEILENSTEIN-V2-ABSCHLUSS.md`, danach Doku-Push mit erneutem Ship-Gate und `gh workflow list --all`. Tests nur lokal, keine CI, kein Push zum Testen. Zeigt das Bestätigungsaudit offene Fehler, folgt ein Lückenschluss-Plan mit eigenem Push; QA-06 wird dann erst danach markiert.
- **D-36 (Requirements):** Alle Nicht-Rollout-Pläne `requirements-completed: []`. Nur 10-07 markiert DESIGN-02, DESIGN-05, QA-04, QA-05 und QA-06 – jeweils nur bei erfülltem Nachweis (QA-05 einschließlich dokumentierter Analytics-Kontrolle für 5–9 und Phase-10-Abfrage; QA-06 nur bei 0 offenen technischen/On-Page-Fehlern im Bestätigungsaudit und im SE-Ranking-Audit). SEO-08 nur bei ≥ 15 in SE Ranking belegten neuen seriösen Domains, sonst „In Progress“ mit Messstand und Verweis auf Übergabe 2. Traceability-Hinweis in `REQUIREMENTS.md` entsprechend.

### Claude's Discretion
- Gruppe und Reihenfolge der neuen Zusatzkarten (D-21) innerhalb der Gruppenlogik von `funktionsgruppen.ts`; Ziel der § 13b-Karte.
- Konkrete Farbtöne und Darstellungen für D-09/D-10 innerhalb der Marke (Amber, Kontrast ≥ 4,5 : 1).
- Variante für den 1024-px-Weißraum (Bodenausrichtung oder dreispaltiges Raster) im 10-UI-SPEC.
- Ob 10-01 intern in „Werkzeug und Baseline“ und „Behebung“ geteilt wird; ob 10-06 in Integration und Phasen-Gate zwei Pläne bildet.
- Lighthouse-Version, Lauf-Parameter innerhalb der Mobile-Standardvoreinstellung, Auswahl der zusätzlichen Messseiten je Vorlage.
- Format der Übergabe an den Inhaber (eine Datei mit allen Prompts oder Abschnitte in `LINKPLAN.md`).

### Deferred Ideas (OUT OF SCOPE)
- Koordinationsrezepte `website-unit`/`website-build`/`website-e2e` → außerhalb dieses Meilensteins (CraftOS-Workspace).
- Codepflege 07 IN-08 und Snapshot-Feld `tag` → nach dem Meilenstein.
- Mini-UI-Status „Fertiggestellt“ → nur bei Bedarf einer Szene.
- Wiederkehrende Prüfung der Wettbewerberangaben (spätestens 21.12.2026) → Daueraufgabe.
- Office-/PDF-Vorlagen zum Herunterladen, Hilfeartikel „Kunden in der App“, neue Szenen nur für Artikel → wie in Phase 9 zurückgestellt.
- Kundenportal-Produktbefunde, Datenschutzabschnitt Webanalyse, „§ 5 DDG“, ProductDemo-Löschung, Portalarbeit → Inhaber.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DESIGN-05 | Jede Seite besteht die Barrierefreiheitsprüfung (axe ohne ernsthafte Verstöße, Kontrast ≥ 4,5:1, Tastaturbedienung) bei 360, 390, 768, 1024 und 1440 px. | § „Barrierefreiheit“: axe-core 4.13.0 im Repo, `wcag22aa` = nur `target-size`, `color-contrast-enhanced` muss per `rules`-Option zugeschaltet werden (Reihenfolge `.options()` vor `.withTags()`), Probe live (30 Aufrufe, 15 Seiten, je 2 Breiten): nur Rechtsseiten-Kontrast (2,84 : 1 und **neu 4,42 : 1** auf `/datenschutz` und `/agb`), 0 `target-size`, 0 Großtext-Verstöße bei 4,5 : 1; Fokusindikator liegt bei Karten am Vorfahren (`:focus-within`/`:has`) → Prüfalgorithmus muss Vorfahren werten; Laufzeit ≈ 2–3 s je Aufruf. |
| QA-04 | Lighthouse mobil (Labordaten) erreicht auf Startseite, Funktions-, Gewerke-, Vergleichs- und Ratgeber-Vorlage Performance ≥ 95 und LCP < 2,5 s; Prüfungen angepasst und grün. | § „Lighthouse“: Messung live (Lighthouse 12.8.2 aus npx-Cache, 3 Läufe, Median): Score 96–97 überall, **LCP 2,57–2,74 s überall über dem Gate**; LCP-Element ist Text (H1 bzw. `#antwort`); Experimente mit gesperrten Ressourcen belegen: Schriften sind der Hebel (ohne 3 Schriftschnitte LCP 2,28–2,44 s, Score 98). Lighthouse 13.5.0 (Node ≥ 22.19) als devDependency. |
| QA-05 | Jede Etappe einzeln nach Ship-Gate live; IndexNow, Live-Prüfung, `trial_click`/`ai_visit` kontrolliert. | § „Etappennachweis“: Rollout-Nachweise 05–09 haben alle Abschnitte, aber **keine Analytics-Zahlen** („Zahlen bei Bedarf nachtragen“); Custom Events in Vercel Web Analytics nur in Pro/Enterprise – Tarif des Teams `craft-os` ist offen (Open Question 2). |
| QA-06 | Erneuter `/audit craftos.eu` nach der letzten Etappe ohne offene technische oder On-Page-Fehler. | § „/audit-Skill“: Skill ist interaktiv (wartet auf GSC-Exporte, Scope-Frage, Freigabe) → Vorab-Antworten für autonome Ausführung; Lighthouse Accessibility/Best Practices/SEO live heute 100 auf 6 Vorlagen, nur `/impressum` 96 (`color-contrast`); „JS nicht komprimiert“ ist belegbares Crawler-Artefakt (ohne `Accept-Encoding` liefert Vercel unkomprimiert, mit `br`/`gzip` komprimiert). |
| DESIGN-02 (Rest) | Rechner, Support, Rechtsseiten, 404 auf v2-Bausteinen. | § „DESIGN-02-Rest“: Bestandsaufnahme je Seite mit passenden Bausteinen (`ContentKopf` passt besser als `FunktionsKopf`), echten Lücken (404-Kopf ohne Brotkrumen, Rechner-Intro mit 3 Sätzen), Altklassen; D-19 (3) ist bereits in 09-09 (`7b1ed70`) erledigt. |
| SEO-08 (Messung) | ≥ 15 neue seriöse verweisende Domains, Register, Prompts. | Nur Rahmen (D-29); SE-Ranking-Abfragen in dieser Recherche bewusst nicht ausgeführt (anderer Agent). |
</phase_requirements>

## Summary

Phase 10 ist überwiegend eine Mess- und Nachweisphase mit drei echten Bauaufgaben (A11y-Werkzeug, Lighthouse-Modus, DESIGN-02-Rest) und zwei kleinen Datenaufgaben (Zusatzkarten, Credit-Wert). Die wichtigste neue Erkenntnis kommt aus einer eigenen Live-Messung: **Alle sechs Gate-Seiten verfehlen heute das LCP-Ziel knapp** (Median 2,57–2,74 s bei Score 96–97), obwohl TBT (23–58 ms) und CLS (0) unkritisch sind. Das LCP-Element ist überall Text (H1 bzw. `p#antwort`); Bilder spielen keine Rolle. Kontrollierte Experimente mit `blockedUrlPatterns` zeigen, dass die sechs vorgeladenen Schriftschnitte (113 KB) den Ausschlag geben: Ohne Schriften sinkt LCP auf 1,98 s, nur mit Clash 600 und General 400 auf 2,13 s, ohne die drei kaum genutzten Schnitte (Clash 500 ungenutzt; Clash 700 und General 500 nur im Logo-Schriftzug „CraftOS“/„Handwerkersoftware“) auf 2,28–2,44 s. Paket (b) muss deshalb zuerst die Schriftlast senken – designneutral über ein Logo als SVG und das Weglassen des ungenutzten Schnitts – und erst danach JavaScript/CSS angehen.

Die Barrierefreiheit ist besser als erwartet: Eine Probe mit 30 Aufrufen auf 15 Seiten (live, axe 4.13 mit `wcag22aa` und zugeschaltetem `color-contrast-enhanced`) fand außer den Rechtsseiten keine `serious`/`critical`-Verstöße, keine `target-size`-Verstöße und keinen Großtext unter 4,5 : 1. Neu gegenüber CONTEXT: Auf `/datenschutz` und `/agb` steht je ein Hinweisabsatz in `text-ink-400` (#777782, 4,42 : 1) – gleiche Behebung über Darstellung wie D-09 (`text-ink-500`, 6,01 : 1). Die eigentliche Arbeit in (a) ist das Werkzeug: Fokusindikatoren der Karten liegen am Vorfahren (`.card:focus-within`, `.item:has(.link:focus-visible)`), ein naiver Test auf `outline` am fokussierten Element meldet sonst 30 Fehlalarme allein auf `/funktionen`. Der Tab-Durchlauf selbst ist billig (40–130 ms je Seite); axe kostet 0,4–1,2 s.

Für den Audit-Skill gilt: Er ist für interaktive Nutzung geschrieben (fragt nach Search-Console-Exporten, Scope, Freigabe und wartet). Paket (e) braucht einen festen Antwortblock, der diese Fragen mit den Entscheidungen D-25/D-26 vorwegnimmt; dazu eine präzise Definition, was als „offener technischer oder On-Page-Fehler“ zählt, weil die 80-Punkte-Liste des Skills Inhaltspunkte (Autor-Schema, Erfahrungsbelege, Länge gegenüber Top 3) enthält, die nach der Kopierregel nie im Fix-Loop landen dürfen.

**Primary recommendation:** Lighthouse 13.5.0 fest pinnen und mit Playwrights Chromium über die Node-API betreiben; zuerst die Schriftlast senken (ungenutzten Schnitt entfernen, Logo-Schriftzug als SVG), Ziel-LCP ≤ 2,3 s lokal als Sicherheitsabstand; das A11y-Skript mit Vorfahren-Fokusprüfung, Pool-Parallelität 2 und vier Shards bauen.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| A11y-Matrix (axe, Tastatur) | Prüfwerkzeug lokal (Node + Playwright gegen `next start`) | Browser (Seiten-DOM) | Prüft gerenderte Seiten; keine Laufzeitänderung an der Website |
| Kontrast- und Fokus-Behebung | Frontend-Stil (CSS-Module, `globals.css`) | — | Reine Darstellung, keine Textänderung (D-04/D-09) |
| Lighthouse-Messung | Prüfwerkzeug lokal (Node-API + Chrome aus Playwright) | Frontend-Server (`next start`) | Labordaten gegen Produktionsbuild |
| LCP-Optimierung | Frontend-Server/SSR (`app/layout.tsx`, `next/font`, `next.config.js`) | Statische Assets (`public/fonts`) | Schriftladen und CSS-Auslieferung entscheiden über Text-LCP |
| DESIGN-02-Rest | SSR-Seiten (Server Components) | Client-Insel nur Rechner | Seiten sind statisch prerendert; Rechner bleiben Client-Inseln |
| Zusatzkarten Kassenbuch/§ 13b | Datenmodell (`lib/funktionsgruppen.ts`, `lib/product-register.ts`) | SSR (`/funktionen`, Detailseiten) | Single Source speist Seiten und `llms.txt` |
| Credit-Wert Lagerfoto | Datenmodell (`lib/site.ts`) + Paritätstest | — | Wert nur aus Release-Code (D-22) |
| `/audit`, SE-Ranking-Audit, Berichte | Dokumentation/externe APIs (Paket e) | Live-Site | Messen, berichten, keine Code-Änderung außer `docs/seo/**` |
| Analytics-Kontrolle | Orchestrator (Vercel-MCP) | — | Nicht in Spuren (D-30/D-34) |

## Messbefunde vom 23.10.2026 (Recherche, nur lesend, unter `.heavy-lock`)

Alle Läufe einzeln unter der Sperre, Koordinationsstatus vorher gelesen (kein Website-Rezept), freier RAM 1,9–2,2 GiB von 15,9 GiB. Werkzeuge: Lighthouse 12.8.2 aus dem vorhandenen npx-Cache (`%LOCALAPPDATA%/npm-cache/_npx/ed05d372d6adb15e`, **keine Installation**), Chrome aus Playwright (`chromium-1243`, HeadlessChrome 153), Playwright 1.63 + axe 4.13.0 aus `craftos/node_modules`. Ziel war https://craftos.eu (Stand Phase 9, derselbe Code wie `main`; `.next` lokal von 10:11 Uhr passt zum letzten Code-Commit `5ae63b3`). Skripte und Rohdaten liegen im Scratchpad, nichts im Repo.

### Lighthouse mobil, Performance, live, Median aus 3 Läufen (Labordaten) [VERIFIED: eigene Messung]

| Vorlage | URL | Score (Läufe) | LCP Median | FCP | SI | TBT | CLS | LCP-Element |
|---|---|---|---|---|---|---|---|---|
| Start | `/` | 97 (97/97/97) | **2.581 ms** | 1.073 | 1.073 | 27 | 0 | `h1#startseite-titel` |
| Funktionsübersicht | `/funktionen` | 97 (97/96/97) | **2.584 ms** | 1.225 | 1.225 | 52 | 0 | `h1#funktionen-titel` |
| Funktionsdetail | `/funktionen/zeiterfassung` | 96 (97/96/93) | **2.743 ms** | 1.074 | 1.408 | 35 | 0 | `h1#funktion-titel` |
| Gewerke | `/gewerke/elektriker` | 97 (97/96/97) | **2.577 ms** | 1.071 | 1.071 | 29 | 0 | `p#antwort` |
| Vergleich | `/vergleich/plancraft-alternative` | 97 (97/97/96) | **2.574 ms** | 1.224 | 1.224 | 23 | 0 | `p#antwort` |
| Ratgeber | `/blog/handwerkerrechnung-schreiben` | 96 (96/96/95) | **2.723 ms** | 1.373 | 1.373 | 58 | 0 | `h1#artikel-titel` |

Lighthouse-Hinweise im Median-Lauf überall gleich: `render-blocking-insight` 70–250 ms, `unused-javascript` ≈ 28 KiB, `unused-css-rules` ≈ 14 KiB, `legacy-javascript` ≈ 14 KiB. Accessibility/Best Practices/SEO (je 1 Lauf): 100/100/100 auf Start, Detail, Gewerke, Vergleich, Ratgeber, `/rechner/stundensatz`; `/impressum` 96/100/100 (nur `color-contrast`).

### Experimente mit gesperrten Ressourcen (je 2 Läufe, live) [VERIFIED: eigene Messung]

| Variante | `/` LCP | `/funktionen/zeiterfassung` LCP | `/blog/…` LCP | Score |
|---|---|---|---|---|
| Basis | 2.684/2.690 | – | – | 96 |
| alle Schriften gesperrt | 1.985/1.983 | – | – | 99 |
| nur Clash 600 + General 400 | 2.131/2.135 | – | 2.161/2.128 | 98–99 |
| ohne Clash 500 | 2.435/2.726 | 2.871/2.598 | 2.724/2.432 | 94–98 (uneinheitlich) |
| ohne Clash 500, Clash 700, General 500 | 2.282/2.280 | 2.441/2.430 | 2.282/2.277 | 98 |
| Vercel-Skripte gesperrt | 2.572/2.722 | – | – | 96–97 (kein Effekt) |
| alles JavaScript gesperrt | 1.677/1.670 | – | – | 100 |

### Tatsächlich genutzte Schriftschnitte (390 px, live) [VERIFIED: eigene Messung]

Clash 500 wird auf keiner der sieben geprüften Seiten verwendet. Clash 700 und General 500 kommen je zweimal vor – ausschließlich im Logo `components/CraftOSLogo.tsx` (Schriftzug „CraftOS“ `font-display font-bold`, Unterzeile „Handwerkersoftware“ `font-medium`) in Kopf- und Fußleiste. General 600 (über 100 Elemente) und Clash 600 (H1/H2) sind tragend. Alle sechs Schnitte werden auf jeder Seite mit hoher Priorität vorgeladen (`next/font/local`, `preload` gilt je `localFont()`-Aufruf, nicht je Schnitt).

### Bundle des lokalen Builds (`.next`, gzip-Größen) [VERIFIED: eigene Messung]

Jede Seite lädt 9–11 Skripte mit 190–206 KB gzip (react-dom 70 KB, zwei App-Chunks 44 KB und 39 KB, Analytics + Speed Insights 16 KB), 2–4 CSS-Dateien mit 25–28 KB gzip (roh 148–162 KB) und sechs Schrift-Preloads mit 111,5 KB. Keine Seite hat ein Bild über dem Falz; `next.config.js` setzt lokal `output: 'standalone'`. Live liefert Vercel Brotli, lokal liefert `next start` gzip – lokale Transfergrößen sind größer, lokale LCP-Werte daher eher etwas schlechter als live `[ASSUMED]`.

### A11y-Probe (live, axe 4.13.0, Tags `wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa`/`wcag22aa` + `color-contrast-enhanced`) [VERIFIED: eigene Messung]

| Seiten (Breiten) | Verstöße außer `color-contrast-enhanced` | Großtext < 4,5 : 1 | Elemente ohne Fokusindikator am Element |
|---|---|---|---|
| `/`, `/funktionen`, `/funktionen/zeiterfassung`, `/preise`, `/rechner/stundensatz` (360, 1440) | 0 | 0 | 2–30 (alle Karten-Links, Indikator am Vorfahren) |
| `/impressum` (360, 1440) | `color-contrast` 1 (2,84 : 1, Link OS-Plattform) | 0 | 0 |
| `/datenschutz` (360, 1440) | `color-contrast` 2 (2,84 : 1 `mailto`-Link; **4,42 : 1** Hinweisabsatz `text-ink-400`) | 0 | 0 |
| `/agb` (360, 1024) | `color-contrast` 1 (**4,42 : 1** Hinweisabsatz `text-ink-400`) | 0 | 0 |
| `/styleguide`, 404, `/support`, `/hilfe/kategorie/einrichtung`, `/rechner`, `/app`, `/gewerke` (360, 1024) | 0 | 0 | 0–15 (Karten) |

Alle `color-contrast-enhanced`-Treffer hatten `expectedContrastRatio: "7:1"` (normaler Text, kein Gate). Zeitbedarf je Aufruf: `goto` 0,4–1,4 s (ein Kaltstart 3,9 s), axe 0,4–1,2 s, Tab-Durchlauf über 28–77 Elemente 40–130 ms. Keine Tastaturfalle, kein Fokus außerhalb des Viewports.

## Lighthouse lokal (Schwerpunkt 1)

### Version und Kompatibilität
- **lighthouse 13.5.0** (latest, veröffentlicht 18.09.2026), `engines.node >= 22.19` → passt zu Node 24.12.0 [VERIFIED: npm registry]. Paket ist ESM (`"type": "module"`, `main: ./core/index.js`, kein `exports`-Feld → Tiefenimporte wie `lighthouse/core/lib/median-run.js` sind möglich) [CITED: github.com/GoogleChrome/lighthouse v13.5.0 package.json].
- 13.0 hat Audits zugunsten von „Insights“ entfernt (u. a. `offscreen-images`, `uses-rel-preload`, `preload-fonts`, `font-size`, `third-party-facades`), Mindest-Node 22.19, `onlyCategories` mit unbekannter Kategorie wirft jetzt; **Gewichte der Performance-Kategorie unverändert** (FCP 10 %, SI 10 %, LCP 25 %, TBT 30 %, CLS 25 %) [CITED: github.com/GoogleChrome/lighthouse/releases/tag/v13.0.0; developer.chrome.com/docs/lighthouse/performance/performance-scoring].
- Next 16.3.4 ist für Lighthouse irrelevant (es misst nur die ausgelieferte Seite). Chrome kommt aus Playwright: `chromium.executablePath()` liefert `…/ms-playwright/chromium-1243/chrome-win64/chrome.exe` (Vollversion, nicht die Headless-Shell) [VERIFIED: lokal ausgeführt]. Lighthouse 12.8.2 lief damit fehlerfrei; 13.5.0 mit Chrome 153 ist nicht gemessen `[ASSUMED]` kompatibel.
- Abhängigkeiten von 13.5.0: u. a. `chrome-launcher ^1.2.1`, `puppeteer-core ^25.9.0` (lädt keinen Browser), `axe-core ^4.13.0`, `@sentry/node ^10`; kein `postinstall`; ca. 19 MB entpackt ohne Abhängigkeiten [VERIFIED: npm registry].

### Mobile Standardvoreinstellung (ohne eigene Konfiguration)
Die Default-Settings sind bereits mobil: `formFactor: 'mobile'`, `screenEmulation` 412×823 bei DPR 1,75, `throttlingMethod: 'simulate'`, `throttling: mobileSlow4G` (Lantern: 150 ms RTT, ca. 1,6 Mbit/s, CPU-Faktor 4) [VERIFIED: `core/config/constants.js` in 12.8.2; Struktur in 13.x unverändert `[ASSUMED]`]. D-11 erfüllt man also mit `lighthouse(url, { port, output: 'json', onlyCategories: ['performance'], logLevel: 'error' })` ohne dritten Parameter. Bewertungskurven mobil: LCP p10 = 2.500 ms / Median 4.000 ms; FCP 1.800/3.000; SI 3.387/5.800; TBT 200/600; CLS 0,1/0,25 [VERIFIED: `core/audits/metrics/*.js`].

### Mehrere Läufe und Median
- Lighthouse liefert `computeMedianRun(lhrs)` und `filterToValidRuns(lhrs)` aus `lighthouse/core/lib/median-run.js`; der „Median-Lauf“ ist der Lauf, der FCP- und TTI-Median am nächsten liegt [VERIFIED: Quelltext 12.8.2 und v13.5.0].
- **Empfehlung für das Gate:** je URL drei Läufe, jeder in frisch gestartetem Chrome; Gate auf den **Median je Kennzahl** (Score-Median ≥ 95 und LCP-Median < 2.500 ms), weil D-11 „gewertet wird der Median“ sagt und der Median-Lauf einzelne Kennzahlen nicht garantiert. Der Median-Lauf (`computeMedianRun`) liefert LCP-Element und Insights für den Bericht. Ungültige Läufe (`runtimeError`) werden gezählt und nachgeholt, nie still ignoriert.
- Beobachtete Streuung: LCP springt zwischen ≈ 2.58 s und ≈ 2.73 s (zweigipflig, Lantern-Quantisierung); Score ±1–3. Mit 3 Läufen ist ein Abstand von ≥ 150 ms zum Gate nötig, um stabil zu bestehen → **Arbeitsziel lokal LCP ≤ 2.300 ms**.

### Laufzeit und RAM
- Ein Lauf dauerte live ca. 20–40 s (12 Läufe in < 10 min, inklusive Chrome-Start) [VERIFIED: eigene Messung, grob]. Gate-Messung D-11: 6 Gate-URLs + 2 Zusatzseiten je Vorlage (bis 10) + 4 Info-URLs ≈ 20 URLs × 3 = 60 Läufe ≈ 20–40 min, deshalb in zwei Blöcke teilen (`--paths=`), Sperre zwischen den Blöcken freigeben.
- RAM: ein headless Chrome plus Lighthouse-Prozess plus `next start` ≈ 0,6–1,0 GiB `[ASSUMED]`. Bei 1,9–2,2 GiB frei ist genau ein Lighthouse-Lauf zur Zeit vertretbar; parallel nichts Schweres (D-34). Die simulierte Drosselung rechnet zwar mit festen Netzwerten, der CPU-Anteil hängt aber vom Host ab (Lighthouse misst einen `benchmarkIndex`) → Messung nie neben Build/E2E [CITED: developer.chrome.com Performance-Scoring „Variabilität“].

### Realistische Erwartung und Hebel (Reihenfolge für 10-02)
1. **Schriftlast (größter Hebel, designneutral möglich):** (a) Clash 500 aus der `localFont`-Liste nehmen (auf den Gate-Seiten nicht verwendet; Datei bleibt liegen, D-04); (b) Logo-Schriftzug „CraftOS“ und „Handwerkersoftware“ in `components/CraftOSLogo.tsx` als SVG mit Pfaden statt Text in Clash 700/General 500 – dann werden diese beiden Schnitte auf normalen Seiten nicht mehr angefordert. Erwartung nach Experiment: LCP ≈ 2,28–2,44 s live. Vorher prüfen, ob Clash 700/General 500 sonst irgendwo verwendet werden (`/impressum` nutzt Clash 700/800 für Rechtsüberschriften `font-bold`/`font-extrabold` – dort würde ohne Clash 700 synthetisch gefettet; das ist eine Gestaltungsfrage für 10-UI-SPEC bzw. (c) stellt die Rechtsseiten ohnehin auf v2-Typografie mit 600 um).
2. **Render-Blocker:** 3–4 CSS-Dateien; Lighthouse schätzt 70–250 ms. Option `experimental.inlineCss: true` (Next 16.3, laut lokaler Doku „experimental“, inlined alle `<link>`-Stylesheets als `<style>`) als A/B-Messung; Nachteil: CSS wird je Seite neu geladen (HTML +≈28 KB gzip) [CITED: `craftos/node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/inlineCss.md`]. Nur übernehmen, wenn gemessen besser.
3. **JavaScript:** gemessen 190–206 KB gzip je Seite; Sperren aller Skripte senkt LCP auf 1,67 s (Obergrenze des Hebels). Realistisch: `legacy-javascript` (≈ 14 KiB) und `unused-javascript` (≈ 28 KiB) prüfen; Analytics/Speed Insights bleiben (D-13) – deren Sperre brachte messbar nichts.
4. CLS ist 0 auf allen Gate-Seiten bei laufender Animation (Lighthouse emuliert keine reduzierte Bewegung) – 07 IN-05 Teil 2 für die Gate-Seiten bereits erfüllt; für alle 8 Snippet-Seiten mit dem bestehenden Modus von `performance-audit.mjs` bestätigen.
- Schätzung ohne Optimierung lokal: Score 95–97 (Gate besteht), **LCP 2,6–2,8 s (Gate verfehlt)**. Mit Hebel 1: LCP ≈ 2,3–2,45 s – knapp; mit Hebel 1+2 oder 1+3 voraussichtlich ≤ 2,3 s `[ASSUMED]`. Die Planung muss eine Messschleife (messen → ändern → messen) vorsehen und ein Abbruchkriterium mit Bericht als offene Abweichung (D-13).

## Barrierefreiheit (Schwerpunkt 2)

### axe-core über @axe-core/playwright
- Im Repo: `@axe-core/playwright` 4.13.0 mit `axe-core ~4.13.0` (Lockfile: 4.13.0); verfügbar wäre 4.14.0 – **nicht aktualisieren** (D-08 „keine neue Abhängigkeit“, und eine Versionsänderung mitten in der Phase verschiebt Ergebnisse zwischen Worktrees) [VERIFIED: node_modules, npm registry].
- Tags in axe 4.13.0: `wcag22aa` enthält **nur** `target-size`; `wcag21aa` = `autocomplete-valid`, `avoid-inline-spacing`, `css-orientation-lock`; `wcag21a` = `label-content-name-mismatch` (experimentell, läuft nicht ohne Zuschalten) [VERIFIED: Auswertung `node_modules/axe-core/axe.js`].
- `color-contrast-enhanced` trägt den Tag `wcag2aaa` und läuft mit `withTags([...AA])` **nicht**. Zuschalten über die `rules`-Option: axe erlaubt ausdrücklich „rules … enabled: true“ zusätzlich zu `runOnly` vom Typ `tag` [CITED: github.com/dequelabs/axe-core/blob/develop/doc/API.md].
- **Falle in @axe-core/playwright:** `.options(o)` ersetzt `this.option` vollständig; `.withTags()` setzt nur `runOnly`. Reihenfolge daher `new AxeBuilder({ page }).options({ rules: { 'color-contrast-enhanced': { enabled: true } } }).withTags([...])` – umgekehrt geht `runOnly` verloren [VERIFIED: `node_modules/@axe-core/playwright/dist/index.js` Z. 170–203].
- Großtext-Filter D-06: Knoten `n.any[0].data.expectedContrastRatio === "4.5:1"` (String im Format „X:1“; axe setzt 4,5 für kleinen und 3 für großen Text bei AA, 7/4,5 bei AAA) [VERIFIED: Probe-Ausgabe `"7:1"` und axe-Quelle Z. ~25407].
- `best-practice`-Regeln (z. B. `heading-order`, `region`) laufen mit `withTags` nicht mit; sie sind kein Gate. Empfehlung: im Bericht `incomplete`-Ergebnisse von `color-contrast` (Text auf Verläufen, Bildern, Pseudo-Elementen) zählen und für die Sichtprüfung auflisten – axe meldet diese nicht als Verstoß.

### Tastaturprüfung programmatisch (D-07)
Der Durchlauf ist mit `page.keyboard.press('Tab')` plus `page.evaluate` je Schritt schnell genug (gemessen 40–130 ms je Seite). Was die naive Variante falsch macht und wie es richtig geht:
1. **Fokusindikator am Vorfahren:** `FeatureCard` (`.card:focus-within`), `BentoGrid` (`.tile:focus-within`) und `FeatureList` (`.item:has(.link:focus-visible)`) setzen `outline: none` am Link und zeichnen den Ring am Kartenrahmen (#bb7609, 3,68 : 1 auf Weiß – erfüllt 1.4.11 mit 3 : 1). Die Prüfung muss das fokussierte Element **und Vorfahren bis zur Karte (≤ 4 Ebenen)** sowie `::before/::after` werten und gegen einen **Ruhezustand-Schnappschuss** vergleichen, der vor dem ersten Tab für alle Kandidaten erhoben wird (`outline-style/width`, `box-shadow`, `border-color`, `background-color`, `text-decoration`). Sonst meldet `/funktionen` 30 Fehlalarme [VERIFIED: Probe].
2. **Zykluserkennung:** Abbruch, wenn `document.activeElement` wieder `body`/das erste Element ist oder ein Element zum zweiten Mal kommt; Obergrenze Kandidatenzahl + 20. „Erreicht“ = Menge der fokussierten Elemente ⊇ Menge der sichtbaren Kandidaten (Kandidaten vorher sammeln, ohne `[inert]`, `[aria-hidden=true]`-Vorfahren, `disabled`, `display:none`, `visibility:hidden`, Breite/Höhe 0).
3. **Unsichtbar/außerhalb:** Nach dem Fokus scrollt der Browser selbst; prüfen auf Fläche 0, `opacity: 0` in der Vorfahrenkette, `clip`/`clip-path` (Sprunglink ist im Fokus sichtbar), und **WCAG 2.2 AA 2.4.11 „Focus Not Obscured“**: Mittelpunkt des fokussierten Elements per `elementFromPoint` – liegt dort die Sticky-Kopfleiste (`.header { position: sticky; z-index: 60 }`), ist der Fokus verdeckt. `scroll-padding-top: 100px` ist gesetzt und sollte das verhindern; axe prüft 2.4.11 nicht.
4. **Menü/Drawer:** `HeaderShell.tsx` hat bereits Esc-Behandlung (Z. 133–154), Rückfokus auf den Auslöser (Z. 150), `aria-expanded`/`aria-controls` und setzt `main`/`footer` beim offenen Drawer `inert` (Z. 106–110). Die Spec prüft daher Verhalten, nicht neue Logik.
5. **Weitere Fälle:** `details/summary` (FaqList) mit Enter/Leertaste; Pause-Knopf der FeatureSnippets nur ohne reduzierte Bewegung vorhanden (`{!reduced && <button …>}`) → im Animationszustand prüfen; Tabellen mit Querscroll brauchen `tabindex="0"` und Namen am Scrollbereich (axe-Regel `scrollable-region-focusable` deckt das ab).

### Laufzeit und Parallelisierung
- Je Aufruf (lokal, `next start`) ≈ 2–3 s: `goto` mit `networkidle` 0,5–1,5 s, Scrollen durch die Seite (wie `visual-audit.mjs`, für Lazy-Inhalte) 0,3–1 s, axe 0,4–1,2 s, Tastatur 0,1–0,3 s [VERIFIED: Probe live; lokal `[ASSUMED]` ähnlich].
- **Chromium-Matrix 790 Aufrufe:** seriell ≈ 30–40 min; mit Pool-Parallelität 2 (zwei Seiten gleichzeitig in einem Browser, je Breite ein `BrowserContext`) ≈ 15–20 min. Empfehlung **`--shard=k/4`** (≈ 200 Aufrufe, 4–6 min je Teil, Sperre dazwischen frei) und `--concurrency=2` als Standard; 3 nur bei > 3 GiB freiem RAM.
- **WebKit-Stichprobe:** 18 Vorlagenseiten × 5 Breiten = 90 Aufrufe, WebKit ≈ 1,5× langsamer `[ASSUMED]` → ≈ 6–8 min, eigener Shard.
- **Animationszustand (D-05/D-10):** 22 Seiten mit FeatureSnippet (8 Funktionsdetails: angebote, aufmass, beleg/eingangsrechnungen, dashboard, lager, planung/plantafel, rechnung, zeit; 12 Gewerke; `/craft-ai`; `/gobd`) × 5 Breiten = 110 zusätzliche axe-Läufe nur mit `color-contrast`, je Seite zu 3 Zeitpunkten (z. B. nach `data-phase`-Wechsel) → ≈ 6–10 min.
- Shard-Logik: Matrix (Engine, Breite, Pfad) deterministisch sortieren, Teil k nimmt Indizes `i % n === k-1`; jeder Teil schreibt `test-results/a11y/report-<k>-of-<n>.json`, ein Schritt `--merge` erzeugt `report.json` und bewertet das Gesamtgate.

### Bekannte und neue Kontrastfehler (für Paket c)
| Seite | Stelle | Klasse | Ist | Behebung (Darstellung) |
|---|---|---|---|---|
| `/impressum` | Z. 76, Link OS-Plattform | `font-semibold text-primary-600` | 2,84 : 1 | `text-primary-800` #784b10 (7,47 : 1) oder `text-primary-700` #99600b (5,21 : 1) + Unterstreichung |
| `/datenschutz` | Z. 77, `mailto`-Link | dito | 2,84 : 1 | dito |
| `/datenschutz` | Z. 84, Hinweis „Diese Datenschutzerklärung ist eine Vorlage …“ | `text-sm text-ink-400` | **4,42 : 1** (neu) | `text-ink-500` #62626e (6,01 : 1) |
| `/agb` | Z. 90, Hinweis „Diese AGB sind eine Vorlage …“ | `text-sm text-ink-400` | **4,42 : 1** (neu) | dito |
| alle drei | `Legal.tsx` Z. 29 Augenbraue `spec-label text-primary-600` auf `bg-ink-50` | — | von axe nicht gemeldet | bei v2-Umstellung ohnehin durch `v2-eyebrow` ersetzen; danach neu messen |
| alle drei | `Legal.tsx` Z. 31 „Stand:“ `text-ink-400` | — | heute nicht gerendert (kein `updated`) | vorsorglich `text-ink-500` |

[VERIFIED: axe-Probe live; Kontrastwerte mit WCAG-Formel nachgerechnet]. Hinweis für den Inhaber (nicht Teil der Behebung): Beide Hinweisabsätze sagen, dass Datenschutzerklärung und AGB „Vorlagen“ seien und rechtlich zu prüfen sind – inhaltlich ein Inhaberpunkt neben Nr. 37 der D-31-Tabelle.

## DESIGN-02-Rest (Schwerpunkt 3) – Bestandsaufnahme

### Vorhandene v2-Bausteine und ihre Regeln (für die Auswahl entscheidend)
| Baustein | Pfad | Bindende Regeln (werfen beim Rendern) | Eignung |
|---|---|---|---|
| `ContentKopf` | `components/content/ContentKopf.tsx` | Brotkrumen Pflicht (2–4 Glieder), H1 ≤ 100, Augenbraue ≤ 24, `answer` 1–2 Sätze ≤ 300 mit `p#antwort[data-answer]`, `lead` **ohne** Satzregel, heller Ton, kein CTA | **Bester Kopf für Rechner, Support, Rechtsseiten** (heller Ton wie heute, Intro-Texte passen unverändert als `lead`) |
| `FunktionsKopf` | `components/funktionen/FunktionsKopf.tsx` | H1 muss `keyword` enthalten, `lead` genau 1 Satz ≤ 110 **oder** `answer` 1–2 Sätze, `secondary`-Link Pflicht, dunkler Ton, Trial-CTA eingebaut | Für Rechner nur mit Textänderung (Intro `/rechner` hat 3 Sätze) → verletzt D-04; nicht empfohlen |
| `SectionHeader` | `components/v2/SectionHeader.tsx` | `as="h1"` möglich, Titel ≤ 60, `lead` genau 1 Satz ≤ 140 (bei Fragetitel 1–2 Sätze ≤ 300), Augenbraue ≤ 24 | 404-Kopf ohne Brotkrumen – aber 404-Intro hat 2 Sätze (siehe Lücken) |
| `LinkKarten` | `components/v2/LinkKarten.tsx` | 1–60 Einträge, Titel ≤ 100, Text ≤ 160, Label ≤ 24, H3 je Karte, `next/link` (auch `mailto:` möglich), Fokusring über `::after`-Streckung | Support-Kontaktwege, 404-Ziele |
| `FeatureCard` | `components/v2/FeatureCard.tsx` | wirft, wenn `slug` keine Live-Funktion aus `lib/funktionen.ts` ist | **Nicht** für Support/404 geeignet |
| `CtaBand` | `components/v2/CtaBand.tsx` | Titel ≤ 40, Text ≤ 80, Trial-Button fest, `secondary` optional | Rechner (ersetzt `CalculatorCta`-Aside), Support |
| `Abschnitt` | `components/v2/Abschnitt.tsx` | Fläche `white`/`warm` | Abschnittsrahmen für Rechnerhilfe, Support |
| `FaqList` | `components/v2/FaqList.tsx` | 3–8 Fragen, Frage endet mit „?“ ≤ 90, Antwort ≤ 600, erster Satz ≤ 300 | Rechner-FAQ (heute eigene `details` in `styles.faqList`) – nur wenn alle Fragen/Antworten die Budgets **ohne Textänderung** einhalten, sonst Darstellung angleichen statt Baustein tauschen |
| `Breadcrumbs` + `crumbsFor` | `components/v2/Breadcrumbs.tsx`, `lib/breadcrumbs.ts` | `assertCrumbCount` 2–4 | Rechner nutzen sie bereits (`CalculatorPage.tsx`), Rechtsseiten ebenfalls (`LegalShell`) |

### Seite für Seite
| Seite | Heute | Passende Bausteine | Echte Lücke / Risiko |
|---|---|---|---|
| `/rechner` | `CalculatorPage` (eigener Kopf mit Brotkrumen, H1 aus `zielwerte`, Intro 3 Sätze, „Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.“), zwei `article.toolCard` mit H2 + Liste + Link, `CalculatorHelp` (H2 als Frage), `CalculatorCta` (Aside, Link `/funktionen/angebote`), JSON-LD `CollectionPage` | `ContentKopf` (Intro als `lead`), `LinkKarten` (2 Karten, Texte ≤ 160 – „Verteilen Sie Ihre jährlichen Kosten …“ ≈ 150 Zeichen, prüfen), `Abschnitt` + `SectionHeader` für Hilfe, `CtaBand` | Die Aufzählungen der Toolkarten (`ul` mit 3 Punkten) haben in `LinkKarten` keinen Platz → entweder Karten als eigene Darstellung in `Calculators.module.css` belassen und nur Typografie/Abstände auf v2 bringen, oder neue v2-Variante (nur (c) darf neue `components/v2/`-Dateien anlegen). Antwortregel gilt für Rechner **nicht** (`mitAntwortRegel` schließt sie aus, Kommentar `seo-audit-core.mjs` Z. 256) → `lead` statt `answer` genügt; `data-answer` nur bei bewusster Entscheidung |
| `/rechner/stundensatz` | wie oben, `current="stundensatz"`, Rechnernavigation (`nav aria-label="Rechner auswählen"`), `HourlyRateCalculator`, zwei `CalculatorHelp`, FAQ als `details` in `styles.faqList`, JSON-LD `WebApplication`, `noscript`-Hinweis | `ContentKopf` (Intro 1 Satz), Abschnitte, `CtaBand` | Rechner-Komponenten unverändert (Feldnamen, Labels; `performance-audit.mjs` füllt „Personalkosten pro Jahr in Euro“; `browser-functional.pw.cjs` Z. 37–142, `navigation.pw.cjs` Z. 177 hängen daran) |
| `/rechner/angebotskalkulation` | wie oben, Intro 2 Sätze, `CalculatorHelp` mit H3 „Gewinnmarge“/„Kostenaufschlag“ | dito | dito; H3 unter H2 beibehalten |
| `/support` | `PageHero` (einzige Nutzung im Repo), `section-space`, `split-section`, `soft-panel`, `btn-cta`, `text-link`, zwei H2-Spalten (E-Mail aus `site.email`, Hilfezentrum/Ratgeber) | `ContentKopf` (H1 „Wir helfen Ihnen beim nächsten Schritt.“, Augenbraue „Kontakt & Support“, Intro 1 Satz als `lead`), `SectionHeader` H2 + `LinkKarten` (E-Mail `mailto:`, `/hilfe`, `/blog`), Hinweis „Bitte senden Sie keine Passwörter …“ als Absatz | `LinkKarten` rendert H3 → davor eine H2 (sonst Sprung H1→H3, Skill-Check „Heading order“). `PageHero.tsx` danach ungenutzt → **nicht löschen**, in „Freigabe zum Entfernen nötig“ (D-04) |
| `/impressum`, `/datenschutz`, `/agb` | `LegalShell` (heller Kopf mit Brotkrumen, `spec-label`-Augenbraue, H1 `font-display text-4xl font-extrabold`), `LegalSection` (H2 `font-bold`), `DataBlock` | `ContentKopf` als Kopf (Brotkrumen vorhanden), v2-Typografie für H2 (600 statt 700/800 – senkt nebenbei den Bedarf an Clash 700/800) | Wortlaut-Schutztest **vor** der ersten Änderung (Muster unten); Kontrast laut Tabelle oben |
| 404 (`app/not-found.tsx`) | Altklassen `section-space`, `eyebrow`, `section-intro`, `btn-cta`, `btn-secondary`; H1 mit `<br/>`; Intro 2 Sätze | `SectionHeader as="h1"` (Titel 51 Zeichen passt), `LinkKarten` (Start, Hilfe, Funktionen) | **Lücke:** `SectionHeader` erlaubt nur 1 Satz im `lead`, `ContentKopf` verlangt Brotkrumen. Optionen: (1) Intro in zwei Absätze teilen (keine Wortänderung, nur Struktur), (2) neue schlanke v2-Kopfvariante ohne Brotkrumen in `components/v2/` durch (c). Status 404 und `noindex` setzt Next selbst; im Test prüfen |

### D-19 Stand
- (1) md-Kachel-Weißraum bei 1024 px: offen, `BentoGrid.module.css` → (c).
- (2) `caption` der `ComparisonTable` bei 360 px: offen, `.caption` in `ComparisonTable.module.css` Z. 41 → (c); betroffen `/preise`, `/vergleich`, `/vergleich/handwerkersoftware-kleine-betriebe`, Startseite, `/styleguide`.
- (3) Silbentrennung H2 `/preise`: **bereits erledigt** in 09-09 (`7b1ed70`): `app/globals.css` setzt ab 768 px `h2#was-kostet-handwerkersoftware { hyphens: manual }` [VERIFIED: git log -S]. In Phase 10 nur Sichtnachweis (Screenshot 1440 px), keine Änderung; die Regel liegt in `globals.css` (Besitz (a)), (c) muss sie nicht anfassen.

### Altklassen nach der Umstellung
`section-space`, `section-intro`, `btn-secondary`, `soft-panel`, `split-section` werden nach Support/404 nur noch von `components/ui/TrialCta.tsx` (`section-space dark-section`) bzw. gar nicht mehr genutzt. Nicht entfernen (D-04); als Kandidat „Freigabe zum Entfernen nötig“ melden.

## Funktionsergänzungen (Schwerpunkt 4)

### Belege am Release (`bfe165e9`, nur lesend) [VERIFIED: git show origin/release]
- **Kassenbuch:** Route `/buchhaltung/kasse` mit `<LicenseProtectedRoute feature="finanzen">` (`src/App.tsx` Z. 271), genau wie alle Buchhaltungsrouten (Eingangsrechnungen, Bankumsätze, Zahlungseingänge, Buchungsjournal, Steuern). `useLicense.ts` Z. 58/85: `canSeeFinance = isAdmin || (isBuero && toggles.finanzen_sichtbar)`, App-Lizenz nie. `Kassenbuch.tsx`: Seitenkopf „Buchhaltung“, Beschreibung „Bargeld täglich erfassen – unveränderbar, mit laufendem Bestand.“, ohne Zugriff „Für das Kassenbuch brauchst du Finanzrechte.“ Kein Feature-Flag, kein `isDeveloper`.
- **§ 13b:** `CustomerDialog.tsx` Feld `is_reverse_charge`, Label „Bauleister nach § 13b“, Beschreibung „Für E-Rechnungen nach § 13b erforderlich.“; `invoiceNoticeTexts.ts` hält Kurz- und Langfassung des Hinweises. Rechnungen: `/rechnungen` mit `feature="dokumente"` (Z. 262) → Voll-Lizenz (Admin/Büro). Hilfeartikel `content/hilfe/rechnung-fertigstellen.md` beschreibt den Schalter „Rechnung nach § 13b (ohne USt.)“ mit H2 „Wie stelle ich eine Rechnung nach § 13b fertig?“.
- Feature-Flags am Release (Auszug): `subcontractorPortalInvites: false`, `activeSubscriptionStatus: false`; keine Flags für Kassenbuch oder § 13b.

### Umsetzung nach der bestehenden Logik
1. `lib/product-register.ts`: beide `liveExtras` auf `advertised: true` (Kommentare Z. 349–350/357–358 anpassen).
2. `lib/funktionsgruppen.ts`: `REGISTER_IDS` um `Kassenbuch: "kassenbuch"` und `"Rechnung nach § 13b": "rechnung-13b"` (id frei, stabil); `ZUSATZ` um zwei Einträge: `kassenbuch` → `gruppe: "buchhaltung"`, Ziel `{ href: "/funktionen/buchhaltung", kind: "funktion", label: <Name der Detailfunktion> }`; `rechnung-13b` → `gruppe: "rechnung"`, Ziel `/funktionen/rechnungen`. Budgets: Name ≤ 32, Nutzen genau 1 Satz ≤ 100 (`TEXT_BUDGET.featureList`), `featureList` 1–7 je Gruppe. Kommentar Z. 157–163 („Rechnung, Planung und Buchhaltung haben danach keine Zusatzfunktion mehr“) wird falsch und ist anzupassen.
3. Regel aus 07-02 (Zusatz → Kachel am Ziel): `lib/funktionsdetails/index.ts` kennt `tile.zusatz` (muss in `ZUSATZ_IDS` liegen, nicht `sm`). Kassenbuch: vorhandene `wide`-Kachel „Kassenbuch“ in `buchhaltung.ts` Z. 95–103 bekommt `zusatz: "kassenbuch"`, `href` bleibt `/hilfe/kassenbuch-fuehren`. § 13b: `/funktionen/rechnungen` hat heute 5 Kacheln (`md·sm·sm·wide·wide`, keine zu § 13b) → neue Kachel (`md` oder `wide`, Bento max. 7) mit `zusatz: "rechnung-13b"` und `href: "/hilfe/rechnung-fertigstellen"`; nur eine `grenze`-Kachel je Seite.
4. Kartentexte nennen die Lizenz (D-03). Vorschläge zum Prüfen gegen Budget und Satzregel `[ASSUMED]`: Kassenbuch – „Bargeld mit laufendem Bestand täglich buchen, für Admin und für Büro mit Finanzfreigabe.“; § 13b – „Rechnungen an Bauleister ohne Umsatzsteuer und mit dem Hinweis nach § 13b UStG fertigstellen.“ (Plattform-Badge „Web“ aus dem Register).
5. Zähltests gleichziehen: `funktionsgruppen.test.ts` Z. 47–97 (Soll-Extras je Gruppe; `rechnung`/`buchhaltung` bisher `[]`), Z. 335 (`beworben` 8 → 10), Z. 338 (Gruppen mit Extras um `rechnung`, `buchhaltung`), Z. 340 (30 → 32); `home-navigation.pw.cjs` Z. 384 (`toHaveLength(30)`) und Z. 435 (Testname „alle 30 Einträge“); `tests/funktionsdetails.test.ts` `ERWARTET.buchhaltung.zusatz`, `ERWARTET.rechnungen.zusatz` und `anordnung`; `funktionen-seite.test.ts`, `navigation.test.ts`, `llms.test.ts` je nach Zählstelle.
6. **Befund zu „im Mega-Menü“:** `components/layout/MegaMenu.tsx` rendert nur `group.details` (Z. 40–41), **keine** `extras` – seit Phase 7 erscheinen Zusatzfunktionen nicht im Menü, nur auf `/funktionen` (`FeatureList „Weitere Funktionen“`, `app/funktionen/page.tsx` Z. 61–63). Startseite (`lib/home-content.ts`) nutzt nur Gruppenköpfe. D-21 „damit … im Mega-Menü“ trifft also nicht zu → Open Question 3 (RESOLVED mit Empfehlung).

### D-22 Lagerfoto-Credit – Code-Beleg vorhanden
- Mobile „Foto mit KI erkennen“ (`content/hilfe/lager-scan-app.md` Schritt 2) ruft `analyze-inventory-photo` auf (`craftos-mobile@837aab4f: src/features/inventory/hooks/useAnalyzeInventoryPhoto.ts` Z. 18) [VERIFIED].
- Preis im Web-Release `supabase/functions/_shared/aiPricing.ts` (Eintrag `'analyze-inventory-photo'`, Label „Inventurfoto“): `tariff: { kind: 'fixed', maxCredits: 2, steps: [{ from: '2027-01-01T00:00:00Z', maxCredits: 3 }] }`; Kommentar: ab 01.01.2027 Höchstpreis 3 Credits (Migration `20261009200000`). SQL-Tests bestätigen „Lagerfoto: bis zu 2 Credits reserviert“ bzw. „bis zu 3“ [VERIFIED].
- Damit erfüllt D-22 die Bedingung „Supabase-Funktion“. Formulierung nur als **Höchstwert** („bis zu 2 Credits je Foto“), weil reserviert und höchstens abgerechnet wird; der Stichtag 01.01.2027 muss in `lib/site.ts` als datierter Wert oder als Hinweis abgebildet werden, sonst ist die Seite ab Januar falsch. Paritätstest liest `aiPricing.ts` über `tests/release-repos.ts` (überspringt nicht still).
- Nicht verwechseln: Wareneingang/Lieferschein (`analyze-goods-receipt`) ist `cost_plus` ohne festen Wert → dafür keinen Wert nennen.

## /audit-Skill (Schwerpunkt 5)

### Was der Skill konkret tut
Ablauf **Audit → Bericht → Freigabe → Behebung → Wiederholung**, 13 Ebenen plus drei Site-Lesungen (Kannibalisierung, Proof-Zählung, Struktur), vier harte Regeln (Kopier-, Lösch-, Waiver-, Stichprobenregel), Ergebnis `audit-report.md` (Checkliste, Wiederholungen werden **angehängt**) und `audit-report.html` aus `references/audit-report-template.html` [VERIFIED: `.claude/skills/audit/SKILL.md`]. Lokale Anpassung: Projektwurzel ist der Site-Ordner (`craftos/`), Semrush optional (DataForSEO/SE Ranking als Ersatz mit Quellenangabe), Lighthouse nur lokal.

### Ebenen ohne Search-Console-Exporte
| Ebene | Lauffähig ohne GSC? | Quelle in diesem Projekt | Status im Bericht |
|---|---|---|---|
| 1 Search Console | nein | — | „nicht gemessen – kein Zugang“; Bericht beginnt mit Kasten „inferred“ (Skill-Pflicht) |
| 2 Semrush Site Audit | ersetzt | SE-Ranking-Website-Audit (D-26) | gemessen, Quelle „SE Ranking“ |
| 3 Wettbewerber | teilweise | SE-Ranking-Projekt 13094375 (5 Wettbewerber), Keyword-/Traffic-Zahlen aus SE Ranking; Bewertungszahlen öffentlich | gemessen bzw. je Spalte „nicht gemessen“ |
| 4 Backlinks | ja | SE Ranking (`seo-report.mjs`, Register) | gemessen |
| 5 On-Page | ja | `seo-audit.mjs` (12 Regeln, sitewide) + 80-Punkte-Liste je Vorlage | „N von 158 Seiten bewertet“ |
| 6 Technik/Lighthouse | ja | `performance-audit.mjs --lighthouse` (Welle 1 noch nicht fertig → Vorab-Werte dieser Recherche, gekennzeichnet) | Labordaten, mobil, URLs, Läufe |
| 7 GEO | Papierteil ja; Live-Test nicht durch Agenten | 38 Punkte aus `references/geo.md`; Live-Test ChatGPT/Perplexity/AI Mode ersetzt durch SE-Ranking-KI-Suche (20 Prompts, SoV) | Live-Test „ersetzt durch SE Ranking“ bzw. „nicht gemessen“ |
| 8 Index-Hygiene | teilweise | Sitemap (156), `robots.txt`, noindex `/styleguide`; `site:`-Zählung ohne echte Google-Suche nicht belastbar | „inferred“ |
| 9 Framework-Fallen | ja | Code-Lesung (`metadata`, Canonical, `sitemap.ts`, Schriften im Root-Layout → deckt sich mit Lighthouse-Befund) | gemessen |
| 10 Versteckte Inhalte | ja | FAQ als `details` (HTML enthält alle Antworten) | gemessen |
| 11 Local/GBP | — | — | **übersprungen mit Grund** „SaaS ohne lokales Einzugsgebiet“ (Skill: „say it out loud“) |
| 12 Keyword-Realität | ja | SE-Ranking-Positionen, Keyword-Map | gemessen |
| 13 Thin/Doorway | ja | `py -3.12 .claude/skills/audit/code/check_page_similarity.py --base https://craftos.eu --pattern /gewerke/` (nur Standardbibliothek; auch `/vergleich/`, `/hilfe/`) | gemessen |

### Eingaben für autonome Ausführung durch Paket (e)
Der Skill stellt Fragen und wartet (Schritt 0b/0c GSC und GBP, Schritt 1 Seitenliste, 1b Scope, Schritt 3 „Want me to fix all of this…?“). Der Plan muss diese Antworten **vorab festschreiben**:
1. Domain `craftos.eu`, Modus „eigene Seite“ (kein Prospect-/Gap-Modus), Projektwurzel `craftos/`.
2. Seitenliste: Sitemap https://craftos.eu/sitemap.xml (156) + lokaler Build `.next/server/app/sitemap.xml.body`; Abweichungen sind Befund.
3. Scope: Site-Ebenen voll; Seiten-Ebenen: `seo-audit.mjs`-Regeln auf allen 156, 80-Punkte-Liste und GEO-Papierteil **je Vorlage eine Seite** (Skill empfiehlt das ab ~50 Seiten) – im Bericht als „sampled: N von 156“.
4. GSC: „ohne Exporte ausführen“ (D-25) → Kasten „inferred“, Ebene 1 „nicht gemessen“, „What this audit did NOT measure“ beginnt damit.
5. GBP/Local: übersprungen (nicht lokal). D-25 sagt „gewaivt“; der Skill kennt dafür „skipped“, nicht „waived“ – im Bericht als „übersprungen“ mit Grund führen, damit der Waiver-Typ nicht gedehnt wird.
6. Freigabe: Orchestrator gibt die mechanischen Korrekturen frei (D-25); der Bericht nennt Datum und Quelle der Freigabe.
7. Kopierregel: Zähler „geänderte Fließtextsätze“ Soll 0; Löschregel: Abschnitt „Needs your approval to remove“ (Kandidaten: `PageHero.tsx`, ungenutzte Altklassen, `components/product-demo/**`, ungenutzte Schriftdatei Clash 500 falls nicht mehr referenziert).
8. **Fehlerdefinition für QA-06 (Empfehlung):** „offener technischer Fehler“ = SE-Ranking-Audit-Fehler > 0, `seo-audit.mjs` sitewide > 0, `route-audit.mjs` Fehler oder defekte Links > 0, Lighthouse-Audits mit Gewicht in Accessibility/Best Practices/SEO < 1 auf einer Vorlage, Ebene-9-Falle. „Offener On-Page-Fehler“ = mechanische Punkte der Gruppen 1, 3, 6, 7, 9, 10, 14 der 80-Punkte-Liste (Head-Tags, Überschriften-Tags, Alt-Text, interne Links, OG, Schema-Validität, Indexierbarkeit). **Kein** Fehler im Sinne von QA-06: Inhaltspunkte (Gruppen 5, 12 teilweise, 13: Länge vs. Top 3, Autor-Schema, Erfahrungsbelege, Ich-Form), die der Skill selbst an `/blog-post`/`/service-page` verweist – sie stehen unter „What remains“.
9. Schwellen-Konflikt: Skill verlangt Title 50–60 und Description 140–160 Zeichen; die Keyword-Map-Regeln des Projekts (Phase 8) sind Title ≤ 60 und Description 120–155. Abweichungen nach Skill-Schwelle als Hinweis mit Waiver-Typ „Owner decision“ und Beleg (Phase-8-Entscheidung, Keyword-Map-Test) führen, nicht in den Fix-Loop.
10. „JS nicht komprimiert“ (SE Ranking, 18 Hinweise am 20.10.): Crawler-Artefakt mit Beleg – `curl -H "Accept-Encoding: br, gzip"` auf `/_next/static/immutable/chunks/*.js` liefert `Content-Encoding: br`, ohne Header kommt die Datei unkomprimiert (Content-Length 5.598 für den kleinsten Chunk) [VERIFIED: curl live 23.10.2026]. Wiederholbarer Befehl gehört in den Waiver.
11. Lighthouse-Schleifenziel des Skills „100 auf allen vier“ kollidiert mit D-11 (Performance ≥ 95). Für Performance gilt D-11; Accessibility/Best Practices/SEO sind heute bereits 100 (außer `/impressum`) und sollen 100 bleiben.

### Zeitpunkt-Konflikt in Welle 1
Das Vorab-Audit (e) braucht Lighthouse-Zahlen, während (b) das Werkzeug erst baut und Lighthouse nur ohne parallelen schweren Lauf messen darf. Empfehlung: Vorab-Audit verwendet die Live-Messung dieser Recherche (oben, Lighthouse 12.8.2, mit Datum und Werkzeugversion) und kennzeichnet sie; das Bestätigungsaudit nutzt das Werkzeug aus (b) mit 13.5.0.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| lighthouse | **13.5.0** (exakt pinnen, neu) | Labormessung Performance (Node-API) | Offizielles Google-Werkzeug; D-11/D-12 |
| @axe-core/playwright | 4.13.0 (vorhanden) | axe in Playwright-Seiten | Bereits in 4 Specs + `visual-audit.mjs` |
| axe-core | 4.13.0 (vorhanden, transitive) | Regeln WCAG 2.0–2.2 | Referenz für automatisierte A11y |
| @playwright/test / playwright | 1.63.0 (vorhanden) | Browsersteuerung Chromium/WebKit, Chrome-Pfad für Lighthouse | Projektstandard |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| chrome-launcher | 1.2.x (transitive über lighthouse) | Chrome mit Debug-Port starten | im `--lighthouse`-Modus, `chromePath` aus Playwright |
| next/font/local | Next 16.3.4 | Schriften, `preload`, `display: swap` | Schrifthebel QA-04 |
| Python 3.12 (Stdlib) | vorhanden | `check_page_similarity.py` (Ebene 13) | Paket e |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Lighthouse-Node-API | `npx lighthouse` CLI | CLI schreibt Dateien und braucht Shell-Parsing; API liefert `lhr` direkt und erlaubt Median-Logik im Skript |
| Lighthouse über Playwright-`page` (4. Parameter) | chrome-launcher | Lighthouse unterstützt Puppeteer-`Page`, nicht Playwright-`Page` `[ASSUMED]`; chrome-launcher mit Playwright-Chrome ist der einfachste stabile Weg |
| Unlighthouse/lhci | — | zusätzliche Abhängigkeiten, Server-Komponenten; nicht nötig |
| axe 4.14.0 | 4.13.0 behalten | Upgrade würde Ergebnisse zwischen Worktrees verschieben |

**Installation (nur Paket b, im Worktree `wt-10b`, unter `.heavy-lock`):**
```bash
npm install --save-dev --save-exact lighthouse@13.5.0
npm ls axe-core   # Erwartung: eine Version 4.13.0 (dedupliziert), sonst Befund melden
```

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| lighthouse | npm | seit 2016, 13.5.0 vom 18.09.2026 | 3,27 Mio./Woche | github.com/GoogleChrome/lighthouse | [OK] (gsd-tools package-legitimacy) | Approved; kein `postinstall` |
| @axe-core/playwright | npm | vorhanden | — | github.com/dequelabs/axe-core-npm | bereits installiert | keine Änderung |

**Packages removed due to [SLOP] verdict:** keine
**Packages flagged as suspicious [SUS]:** keine
Hinweis: Context7 war in dieser Sitzung nicht verfügbar; die Node-API ist über die offizielle README (`GoogleChrome/lighthouse/docs/readme.md`) und den Quelltext der Version belegt.

## Architecture Patterns

### System Architecture Diagram
```
                 ┌──────────────────────── Welle 1 (parallel, je Worktree/Port) ─────────────────────────┐
 Sitemap des     │ (a) a11y-audit.mjs ──► next start :3101 ──► Chromium/WebKit ──► axe + Tab-Durchlauf   │
 lokalen Builds ─┼──► Matrix (Engine×Breite×Pfad) ─► --shard k/4 ─► report-k.json ─► --merge ─► Gate Exit │
                 │ (b) performance-audit.mjs --lighthouse ─► next start :3102 ─► chrome-launcher(Chrome   │
                 │     aus Playwright) ─► 3 Läufe/URL ─► Median je Kennzahl ─► summary.json ─► Gate Exit  │
                 │ (c) 10-UI-SPEC ─► Rechner/Support/Recht/404 auf v2 ─► Wortlaut-Schutztest (Referenz   │
                 │     vor Änderung) ─► Übergabeliste                                                     │
                 │ (d) Register advertised ─► funktionsgruppen ZUSATZ ─► Kachel zusatz ─► Zähltests       │
                 │ (e) /audit (Vorab-Antworten) + SE-Ranking-Audit ─► audit-report.md/.html ─► Behebungs- │
                 │     liste nach Dateibesitz ─► Etappennachweis 05–09 ─► Berichtsentwurf                 │
                 └──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                                            ▼
 Welle 2 (main, :3100): Übergabelisten + Audit-Behebungen ─► Gates D-14 ─► volle A11y-Matrix (4 Shards)
                        ─► Lighthouse-Endmessung (allein) ─► Deferred-Tabelle Endstand
                                                            ▼
 Welle 3 (main): Ship-Gate ─► gh workflow list ─► Push ─► Vercel READY ─► live-check ─► IndexNow
                 ─► SE-Ranking-Recheck + Bestätigungs-/audit ─► Lighthouse live (Kontrolle) ─► Berichte
```

### Recommended Project Structure (nur neue/geänderte Prüfdateien)
```
craftos/
├── scripts/a11y-audit.mjs              # (a) CLI: Matrix, Shards, Merge, Gate
├── scripts/lib/a11y-audit-core.mjs     # (a) reine Funktionen (Gate, Großtext-Filter, Shard-Teilung) → unit-testbar
├── scripts/performance-audit.mjs       # (b) + Modus --lighthouse
├── scripts/lib/lighthouse-core.mjs     # (b) reine Funktionen (Median je Kennzahl, Gate, Zusammenfassung)
├── tests/a11y-audit-core.test.ts       # (a)
├── tests/lighthouse-core.test.ts       # (b)
├── tests/rechtstexte-wortlaut.test.ts  # (c) Referenz vor der ersten Änderung
├── tests/fixtures/rechtstexte/*.txt    # (c) normalisierte Referenztexte
└── tests/e2e/a11y.pw.cjs               # (a) Vorlagen + Tastaturfälle, iteriert 5 Breiten
```

### Pattern 1: Lighthouse-Modus mit Median je Kennzahl
**What:** Drei Läufe je URL in frischem Chrome, Gate auf Median von Score und LCP, Median-Lauf für Diagnose.
**When to use:** `node scripts/performance-audit.mjs --lighthouse [--paths=…] [--runs=3]`
```javascript
// Source: github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md (Node-Nutzung) + core/lib/median-run.js
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { computeMedianRun, filterToValidRuns } from "lighthouse/core/lib/median-run.js";
import { chromium } from "@playwright/test";

const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
async function messe(url, runs = 3) {
  const lhrs = [];
  for (let i = 0; i < runs; i++) {
    const chrome = await chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless=new"] });
    try {
      const { lhr } = await lighthouse(url, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance"] });
      lhrs.push(lhr);
    } finally { await chrome.kill(); }
  }
  const gueltig = filterToValidRuns(lhrs);            // Läufe mit runtimeError zählen und nachholen
  const score = median(gueltig.map((l) => l.categories.performance.score * 100));
  const lcp = median(gueltig.map((l) => l.audits["largest-contentful-paint"].numericValue));
  return { score, lcp, bestanden: score >= 95 && lcp < 2500, diagnose: computeMedianRun(gueltig) };
}
```

### Pattern 2: axe mit AA-Tags plus Großtext-Prüfung
```javascript
// Source: node_modules/@axe-core/playwright/dist/index.js (options ersetzt this.option → zuerst aufrufen);
//         axe API.md „rules … enabled: true“ zusätzlich zu runOnly
const result = await new AxeBuilder({ page })
  .options({ rules: { "color-contrast-enhanced": { enabled: true } } })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
  .analyze();
const gate = result.violations.filter((v) =>
  v.id === "color-contrast" || ((v.impact === "serious" || v.impact === "critical") && v.id !== "color-contrast-enhanced"));
const grossText = (result.violations.find((v) => v.id === "color-contrast-enhanced")?.nodes ?? [])
  .filter((n) => n.any?.[0]?.data?.expectedContrastRatio === "4.5:1");
```

### Pattern 3: Fokusindikator gegen Ruhezustand inkl. Vorfahren
```javascript
// Vor dem ersten Tab: Ruhezustand je Kandidat (Element + 4 Vorfahren + ::before/::after) im Seitenkontext merken.
const STIL = ["outlineStyle", "outlineWidth", "boxShadow", "borderTopColor", "backgroundColor", "textDecorationLine"];
function stilSignatur(el) {
  const kette = []; let n = el;
  for (let i = 0; n && i < 5; i++, n = n.parentElement)
    for (const pseudo of [null, "::before", "::after"]) {
      const cs = getComputedStyle(n, pseudo); kette.push(STIL.map((k) => cs[k]).join("|"));
    }
  return kette.join("§");
}
// Nach jedem Tab: sichtbar = stilSignatur(activeElement) !== ruhe.get(activeElement)
// und mindestens eine Ebene mit outline≠none&width>0 oder box-shadow≠none oder Farbwechsel.
```

### Pattern 4: Wortlaut-Schutztest der Rechtsseiten (vor der Umstellung anlegen)
```typescript
// Muster: tests/kernseiten.test.ts lädt Seiten per import(); tests/demo.test.ts rendert mit renderToStaticMarkup.
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
// Referenz: Hauptbereich ohne Kopf (Brotkrumen, Augenbraue) – nur der Inhalt von LegalShell-children,
// z. B. über ein data-Attribut am Inhaltscontainer, das (c) im ersten Commit setzt, bevor Stile wechseln.
```

### Anti-Patterns to Avoid
- **Fokus nur am Element prüfen:** erzeugt Fehlalarme auf allen Karten (siehe Probe).
- **`.withTags()` vor `.options()`:** `runOnly` geht verloren, axe läuft mit allen Regeln inkl. best-practice.
- **Lighthouse parallel zu anderem schweren Lauf oder mehrere Lighthouse-Läufe gleichzeitig:** verfälscht CPU-Anteil der Simulation.
- **LCP mit Bildmaßnahmen jagen:** Es gibt kein LCP-Bild; `fetchpriority`/`priority` bringen nichts.
- **Schriftschnitte „einfach weglassen“:** führt zu synthetischem Fettdruck (Gestaltungsänderung) – nur ungenutzte Schnitte entfernen bzw. Logo als SVG.
- **Rechner auf `FunktionsKopf`:** erzwingt Textänderungen (1-Satz-Lead, Keyword in H1, Sekundärlink).
- **`FeatureCard` für Support/404:** wirft, weil kein Funktions-Slug.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Lighthouse-Median | eigene „Median-Lauf“-Auswahl | `computeMedianRun`/`filterToValidRuns` aus `lighthouse/core/lib/median-run.js` | gleiche Logik wie PageSpeed/CI-Werkzeuge |
| Chrome-Start für Lighthouse | eigenes `spawn` mit Debug-Port | `chrome-launcher` (transitive) mit `chromePath` aus Playwright | Port-Ermittlung, Aufräumen, Flags |
| Kontrastberechnung | eigene Farbmathematik im Gate | axe `color-contrast`/`-enhanced` | Opazität, Hintergrundstapel, Textgröße |
| Scrollbereich-Fokus | eigene Prüfung | axe `scrollable-region-focusable` | Teil von wcag2a |
| Seitenähnlichkeit (Ebene 13) | eigenes Shingling | `.claude/skills/audit/code/check_page_similarity.py` | Methode des Skills, Boilerplate-Filter |
| SE-Ranking-Zugriff | neue HTTP-Clients | `scripts/lib/se-ranking-mcp.mjs` | Schlüssel nie ausgeben, bewährt |

**Key insight:** Die Phase misst gegen externe Maßstäbe (WCAG, Lighthouse, Skill-Checkliste). Jede eigene Nachbildung der Maßstäbe erzeugt Abweichungen, die man später nicht erklären kann.

## Runtime State Inventory

Nicht anwendbar – Phase 10 ist keine Umbenennungs- oder Migrationsphase. Einzige Laufzeitzustände außerhalb des Repos: SE-Ranking-Projekt 13094375 (tägliche Messung verbraucht Units, D-27 – Orchestrator), Vercel-Projekt `craftos` (Deployments, Analytics), IndexNow-Meldungen. Keine Daten-Migration nötig.

## Common Pitfalls

### Pitfall 1: LCP-Gate rot trotz Score ≥ 95
**What goes wrong:** Score 96–97 besteht, LCP 2,58–2,74 s nicht.
**Why it happens:** Text-LCP; Lanterns pessimistischer Graph rechnet alle vor dem beobachteten LCP gestarteten Anfragen mit ein – inkl. sechs Schrift-Preloads und aller Skripte.
**How to avoid:** Schriftlast zuerst (s. o.), Ziel ≤ 2,3 s lokal; erst danach CSS/JS.
**Warning signs:** LCP > FCP + 1,3 s bei kleinem TBT.

### Pitfall 2: Lokale Messung schlechter als live
**What goes wrong:** Live grün, lokal rot (oder umgekehrt).
**Why it happens:** `next start` liefert gzip und andere Header als Vercel (Brotli, CDN); Lantern rechnet mit Transfergrößen.
**How to avoid:** Gate nur lokal (D-11), Live nur Kontrolle; im Bericht beide Herkünfte kennzeichnen.

### Pitfall 3: `@axe-core/playwright`-Optionsreihenfolge
Siehe Pattern 2 – `.options()` überschreibt `runOnly`.

### Pitfall 4: Fokus-Fehlalarme auf Karten
Siehe Pattern 3 – Indikator am Vorfahren.

### Pitfall 5: Animationszustand wird nie geprüft
**What goes wrong:** Kontext mit `reducedMotion: "reduce"` zeigt nur den Endzustand; Pause-Knopf existiert dann nicht.
**How to avoid:** Zweiter Kontext ohne reduzierte Bewegung nur für die 22 Snippet-Seiten; warten auf `data-running="true"`, dann `color-contrast` an mehreren `data-phase`-Zuständen.

### Pitfall 6: Wortlaut-Referenz zu spät erzeugt
**What goes wrong:** Referenz nach der ersten Stiländerung – Schutztest beweist nichts.
**How to avoid:** Erster Commit von (c) erzeugt nur Test + Referenz (rot→grün auf unverändertem Stand), danach Umbau.

### Pitfall 7: Zusatzkarten erscheinen nicht im Mega-Menü
Siehe Open Question 3; Tests nicht auf Menü-Einträge für Extras schreiben.

### Pitfall 8: Credit-Wert ohne Stichtag
**What goes wrong:** „bis zu 2 Credits“ ist ab 01.01.2027 falsch.
**How to avoid:** Wert mit Stichtag in `site.ts` modellieren oder beide Werte mit Datum nennen; Paritätstest gegen `aiPricing.ts`.

### Pitfall 9: axe-Version driftet durch die Lighthouse-Installation
**What goes wrong:** `lighthouse` verlangt `axe-core ^4.13.0`; npm könnte 4.14.0 hochziehen und `@axe-core/playwright` (verlangt `~4.13.0`) erhält eine andere Version als in anderen Worktrees.
**How to avoid:** Nach Installation `npm ls axe-core` (Soll: nur 4.13.0); Lockfile-Diff prüfen.

### Pitfall 10: Audit-Skill wartet auf Antworten
**What goes wrong:** Agent stoppt bei „Export the four Search Console reports“ oder „Audit all N pages, or a slice?“.
**How to avoid:** Vorab-Antworten (oben, 1–11) wörtlich in den Plan.

### Pitfall 11: Speicher bei voller A11y-Matrix
**What goes wrong:** Mehr als 2 parallele Seiten bei ~2 GiB freiem RAM → Abstürze/Timeouts.
**How to avoid:** `--concurrency=2`, Shards, Browser je Shard neu starten; freien RAM vor jedem Shard loggen.

### Pitfall 12: Analytics-Events nicht vorhanden
**What goes wrong:** Vercel-MCP liefert 0 Custom Events.
**Why it happens:** Custom Events (`track()`) gibt es nur in Pro/Enterprise [CITED: vercel.com/docs/analytics/custom-events]; bei Hobby werden sie nicht erfasst.
**How to avoid:** Orchestrator prüft zuerst den Tarif bzw. ob `aggregate_events` überhaupt Event-Namen kennt; sonst Inhaberpunkt nach D-30.

## Code Examples

### Shard-Teilung und Merge (reine Funktionen)
```javascript
// scripts/lib/a11y-audit-core.mjs (Vorschlag)
export function matrix({ pfade, breiten, engines }) {
  return engines.flatMap((e) => breiten.flatMap((b) => pfade.map((p) => ({ engine: e, breite: b, pfad: p }))))
    .sort((x, y) => `${x.engine}${x.breite}${x.pfad}`.localeCompare(`${y.engine}${y.breite}${y.pfad}`));
}
export const teil = (liste, k, n) => liste.filter((_, i) => i % n === k - 1);
export function gate(ergebnisse) {
  return ergebnisse.filter((r) => r.gateVerstoesse.length || r.grossText.length || r.tastatur.fehler.length);
}
```

### Status und Noindex der 404 im Test
```javascript
// tests/e2e/a11y.pw.cjs (Ausschnitt)
const res = await page.goto("/gibt-es-nicht-a11y");
expect(res.status()).toBe(404);
await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Lighthouse-Audits wie `uses-rel-preload`, `preload-fonts`, `offscreen-images` | „Insights“ (`render-blocking-insight`, `lcp-breakdown-insight`, `font-display-insight` …) | Lighthouse 13.0 (Okt. 2025) | Berichtsfelder heißen anders; Skript liest Kennzahlen, nicht Audit-IDs von Opportunities |
| WCAG 2.1 AA | WCAG 2.2 AA (`target-size`, 2.4.11 Focus Not Obscured) | axe `wcag22aa` seit 4.7 `[ASSUMED]` | axe deckt nur `target-size` ab; 2.4.11 muss die Tastaturprüfung selbst testen |
| FAQ-Rich-Results | entfallen (Skill-Referenz: Mai 2026) | — | FAQ-Schema bleibt für KI/PAA, ist aber kein Rich-Result-Hebel |

**Deprecated/outdated:**
- `visual-audit.mjs` prüft axe nur bei 390/1440 – wird in (a) auf fünf Breiten erweitert (D-08).
- `performance-audit.mjs` Standard-Origin `http://localhost:3101` – im Lighthouse-Modus Origin/Port als Parameter setzen.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Lighthouse 13.5.0 läuft mit Playwright-Chrome 153 so stabil wie 12.8.2 | Lighthouse | Werkzeug muss Chrome-Version wechseln (z. B. `chromium-1228`) |
| A2 | Defaults (mobil, simulate, mobileSlow4G) in 13.x unverändert | Lighthouse | Andere Werte → Konfiguration explizit setzen |
| A3 | Lokale Werte (gzip) etwas schlechter als live | Messbefunde | Sicherheitsabstand größer oder kleiner nötig |
| A4 | Logo als SVG + Clash 500 raus ≈ −250 ms LCP lokal | Lighthouse | Zusatzhebel CSS/JS nötig |
| A5 | RAM 0,6–1,0 GiB je Lighthouse-Lauf; A11y-Pool 2 passt in ~2 GiB | Laufzeit | Läufe brechen ab → Pool 1 |
| A6 | WebKit ≈ 1,5× langsamer | A11y-Laufzeit | Shard-Zeit länger |
| A7 | Kartentext-Vorschläge D-21 halten Budget/Satzregel | Funktionsergänzungen | Test wirft → Text kürzen |
| A8 | Lighthouse nimmt keine Playwright-`Page` als 4. Parameter | Alternatives | ohne Folgen (chrome-launcher-Weg ist belegt) |
| A9 | `wcag22aa` seit axe 4.7 | State of the Art | ohne Folgen für die Phase |

## Open Questions

1. **Gilt QA-04 mit dem heutigen Stand als erreichbar ohne Gestaltungsänderung?**
   - What we know: LCP-Gate heute überall knapp verfehlt; designneutrale Hebel (Clash 500 raus, Logo-SVG) bringen live ≈ 2,28–2,44 s.
   - What's unclear: lokaler Wert nach Optimierung; ob ein dritter Hebel nötig ist.
   - Recommendation: (b) misst lokal vor/nach jedem Hebel; reicht es nicht, `inlineCss`-A/B und JS-Prüfung; bleibt ein Rest, Bericht als offene Abweichung (D-13). `components/CraftOSLogo.tsx` hat laut D-33 keinen Besitzer → **RESOLVED (Empfehlung): (b) als Besitzer zuordnen**, weil der Grund Performance ist und `app/layout.tsx` (Schriften) ebenfalls bei (b) liegt.
2. **Liefert Vercel Web Analytics Custom Events?** – **RESOLVED (23.10.2026):** Ja. Die Abfrage des Orchestrators per Vercel-MCP `aggregate_events` (`craftos/docs/seo/data/2026-10-23-vercel-events-phase10.json`, Projekt `craftos`, Zeitraum 15.–24.10.2026) liefert `trial_click` (5 Ereignisse, 3 Besucher), `login_click`, `store_click`, `calculator_use` und das Altereignis `registration_click`; `ai_visit` ist eingebaut, im Zeitraum aber nicht aufgetreten (Befund, Verdrahtungsprüfung in 10-11). Custom Events sind damit verfügbar; QA-05 hängt nicht an einer Inhaberkontrolle.
   - What we know: `trial_click`/`ai_visit` werden per `track()` gesendet (`components/Analytics.tsx` Z. 28, `lib/tracking.ts`); Custom Events nur in Pro/Enterprise.
   - What's unclear: Tarif des Teams `craft-os`.
   - Recommendation: Orchestrator prüft vor 10-05 per Vercel-MCP; bei Hobby bleibt QA-05-Analytics ein Inhaberpunkt (D-30) – Folge für D-36: QA-05 nur markierbar, wenn Inhaber die Kontrolle bestätigt.
3. **„im Mega-Menü“ (D-21)** – **RESOLVED:** Das Mega-Menü zeigt seit Phase 7 nur Detailfunktionen. Die Zusatzkarten erscheinen auf `/funktionen` (FeatureList „Weitere Funktionen“) und auf der Zieldetailseite als Kachel mit `zusatz`. Empfehlung: Menü nicht ändern (Besitz (a), Gestaltungsänderung), D-21 als „/funktionen + Detailseite + llms.txt, sofern dessen Quelle Extras ausgibt“ umsetzen und im SUMMARY dokumentieren. Falls der Orchestrator Menü-Präsenz verlangt, gehört die Änderung an `MegaMenu.tsx` in die Übergabeliste an 10-06.
4. **D-22 Credit-Wert** – **RESOLVED:** Code-Beleg vorhanden (`aiPricing.ts`, fixed `maxCredits: 2`, ab 01.01.2027 `3`). Umsetzung in (d) mit Stichtag; nicht „nicht in diesem Meilenstein“.
5. **D-19 (3) Silbentrennung `/preise`** – **RESOLVED:** erledigt in 09-09 (`7b1ed70`); in 10-03 nur Sichtnachweis.
6. **Neue Kontrastfehler `/datenschutz`/`/agb` (4,42 : 1)** – **RESOLVED:** gehören zu D-09 in Paket (c), Behebung `text-ink-500`.
7. **404-Kopf ohne Brotkrumen mit 2-Satz-Intro** – **RESOLVED (10-UI-SPEC K1, J1, A2, approved 23.10.2026):** `ContentKopf` erhält `crumbs: Crumb[] | null`; `null` nur auf der 404-Seite (`data-crumbs="ohne"`, Grep-Test), die zwei Sätze stehen unverändert als `lead`; kein neuer Baustein, keine Wortänderung. Umsetzung in 10-03.
   - What we know: kein v2-Kopf passt ohne Strukturänderung.
   - Recommendation: Im 10-UI-SPEC entscheiden: Intro in zwei Absätze teilen (keine Wortänderung) oder neue Kopfvariante in `components/v2/` durch (c).
8. **Wer misst Lighthouse fürs Vorab-Audit in Welle 1?** – **RESOLVED (Empfehlung):** Vorab-Audit übernimmt die Live-Werte dieser Recherche (Lighthouse 12.8.2, 23.10.2026, gekennzeichnet); keine zusätzliche Lighthouse-Messung in (e), damit (b) die Sperre für Lighthouse allein nutzen kann.
9. **Fehlerdefinition QA-06** – **RESOLVED (Empfehlung):** siehe „/audit-Skill“, Punkt 8; Orchestrator bestätigt sie im Plan 10-05.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | alle Skripte, Lighthouse ≥ 22.19 | ✓ | 24.12.0 | — |
| npm | Installation Lighthouse (b) | ✓ | (mit Node 24) | — |
| Playwright Chromium | A11y, Lighthouse-Chrome | ✓ | chromium-1243 (Chrome 153) | ältere `chromium-1228` vorhanden |
| Playwright WebKit | A11y-Stichprobe, E2E | ✓ | webkit-2359 | — |
| @axe-core/playwright / axe-core | A11y | ✓ | 4.13.0 / 4.13.0 | — |
| lighthouse im Repo | D-12 | ✗ | — | Installation in (b); npx-Cache 12.8.2 nur für Recherche/Notfall, nicht als Gate |
| Python 3.12 | `check_page_similarity.py` | ✓ | 3.12 | — |
| fontTools (Python) | Schriften-Subsetting (optionaler Hebel) | ✗ | — | Hebel ohne Subsetting (Schnitt weglassen, Logo-SVG) |
| Freier RAM | schwere Läufe | knapp | 1,9–2,2 GiB von 15,9 | Pool 1, kleinere Shards |
| Koordination | Statusabfrage | ✓ | Runner 1.9.9 (edgar bereit, edgarspc offline) | kein Website-Rezept → lokal |
| Vercel-MCP | QA-05 Analytics | Orchestrator | — | Inhaberpunkt |
| SE-Ranking-Zugang | (e), Rollout | ✓ (Test bis 03.11.2026) | — | „nicht gemessen“ |

**Missing dependencies with no fallback:** keine.
**Missing dependencies with fallback:** lighthouse (Installation in b), fontTools (anderer Hebel).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 5.0.0 (`environment: node`), Playwright 1.63.0 + @axe-core/playwright 4.13.0, Lighthouse 13.5.0 (neu) |
| Config file | `craftos/vitest.config.ts` (`tests/**/*.test.ts`), `craftos/tests/e2e/playwright.config.cjs` (Projekte 1440 / 390-touch, `workers: 2`) |
| Quick run command | `npx vitest run tests/<datei>.test.ts` (ohne Sperre) |
| Full suite command | unter `.heavy-lock`: `npx vitest run && npm run typecheck && npm run lint && npm run build`, dann `next start` und `npm run test:e2e`, `node scripts/seo-audit.mjs`, `node scripts/route-audit.mjs`, `node scripts/visual-audit.mjs`, `node scripts/a11y-audit.mjs --shard=k/4` (k=1..4) + `--merge`, `node scripts/performance-audit.mjs --lighthouse` (allein) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DESIGN-05 | Gate-Logik (serious/critical, `color-contrast`, Großtext 4,5 : 1), Shard-Teilung, Merge | unit | `npx vitest run tests/a11y-audit-core.test.ts` | ❌ Wave 0 (a) |
| DESIGN-05 | 158 Seiten × 5 Breiten Chromium, WebKit-Vorlagen, Animationszustand | Skript (schwer) | `node scripts/a11y-audit.mjs --shard=1/4` … `--merge` | ❌ Wave 0 (a) |
| DESIGN-05 | Tastatur: Sprunglink, Menü Enter/Esc/Rückfokus, FAQ, Rechnerfelder, ContentSearch, Pause, Tabellen-Scroll; 404-Status | e2e | `npx playwright test tests/e2e/a11y.pw.cjs` (nach `testMatch` in 10-06) | ❌ Wave 0 (a) |
| DESIGN-05 | axe bei 5 Breiten in `visual-audit.mjs` | Skript | `node scripts/visual-audit.mjs` | ✅ umstellen (a) |
| QA-04 | Median je Kennzahl, Gate, Zusammenfassung | unit | `npx vitest run tests/lighthouse-core.test.ts` | ❌ Wave 0 (b) |
| QA-04 | Lighthouse 6 Gate-Seiten (+ Zusatzseiten), 3 Läufe | Skript (schwer, allein) | `node scripts/performance-audit.mjs --lighthouse` | ❌ Modus neu (b) |
| QA-04 | CLS ohne reduzierte Bewegung auf 8 Snippet-Seiten | Skript | `node scripts/performance-audit.mjs` (bestehender Modus, Routen ergänzen) | ✅ erweitern (b) |
| QA-04 | Flakes deterministisch (`function-illustrations.pw.cjs:281/:476`, 05 Nr. 2) | e2e | `npx playwright test tests/e2e/function-illustrations.pw.cjs` | ✅ ändern (b) |
| QA-04 | Release-Helfer + Wortgrenze | unit | `npx vitest run tests/pricing-parity.test.ts tests/product-register.test.ts` | ✅ ändern (b) |
| DESIGN-02 | Rechtstexte wörtlich unverändert | unit | `npx vitest run tests/rechtstexte-wortlaut.test.ts` | ❌ Wave 0 (c), Referenz vor Umbau |
| DESIGN-02 | Rechner unverändert in Logik/Feldern | unit | `npx vitest run tests/calculators.test.ts tests/calculator-hydration.test.ts` | ✅ |
| DESIGN-02 | v2-Köpfe/Bausteine auf Rechner, Support, Recht, 404 | unit + e2e | `npx vitest run tests/kernseiten.test.ts` (Fälle ergänzen); `npx playwright test tests/e2e/design-v2.pw.cjs` | ✅ erweitern (c) bzw. Übergabe 10-06 |
| D-21 | 10 beworbene Extras, Gruppen, Zähler 32, Kacheln mit `zusatz` | unit + e2e | `npx vitest run tests/funktionsgruppen.test.ts tests/funktionsdetails.test.ts tests/funktionen-seite.test.ts tests/navigation.test.ts`; `npx playwright test tests/e2e/home-navigation.pw.cjs` | ✅ ändern (d) |
| D-22 | Credit-Wert = `aiPricing.ts` am Release, mit Stichtag | unit | `npx vitest run tests/pricing-parity.test.ts` (oder neue Datei in (d)) | ❌ Fall neu (d) |
| D-23 | keine Datei unter `app/` importiert `components/product-demo` | unit | `npx vitest run tests/demo.test.ts` | ✅ erweitern (d) |
| D-24 | doppelter Slug in `INHALTE` wirft | unit | `npx vitest run tests/funktionsdetails.test.ts` | ✅ Fall neu (d) |
| QA-05 | Etappenzeilen 05–10 vollständig (Commit, Push, Ship-Gate, Workflows, Deployment, IndexNow, live-check, Etappenbericht, Analytics) | Doku + optional unit | `npx vitest run tests/etappen-nachweis.test.ts` (Vorschlag, prüft Pflichtspalten) | ❌ optional (e) |
| QA-06 | Audit-Bericht mit Pflichtzeilen, Zähler „geänderte Sätze“, Abschnitte „NOT measured“/„Needs approval“ | manuell + Doku | Sichtprüfung im Rollout | — |
| SEO-08 | Register/Prompts konsistent | unit | `npx vitest run tests/backlink-plan.test.ts` | ✅ |

### Sampling Rate
- **Per task commit:** gezielte Vitest-Dateien des Pakets + `npm run lint` + `npm run typecheck` (ohne Sperre).
- **Per Paketende:** einmal Build + paketeigene schwere Prüfung unter Sperre ((a) ein Shard + WebKit-Stichprobe, (b) Lighthouse auf Gate-Seiten allein, (c) `visual-audit.mjs --paths` der eigenen Seiten, (d) `home-navigation.pw.cjs`).
- **Phase gate (10-06):** Gates aus D-14 vollständig; volle A11y-Matrix in 4 Shards; Lighthouse-Endmessung allein; Ergebnisse in `PHASE-10-ROLLOUT.md`.

### Wave 0 Gaps
- [ ] `scripts/lib/a11y-audit-core.mjs` + `tests/a11y-audit-core.test.ts` (a)
- [ ] `scripts/lib/lighthouse-core.mjs` + `tests/lighthouse-core.test.ts` (b)
- [ ] `tests/rechtstexte-wortlaut.test.ts` + Referenzdateien **vor** jeder Änderung an Rechtsseiten (c)
- [ ] Lighthouse-Installation (b): `npm install --save-dev --save-exact lighthouse@13.5.0` unter Sperre, `npm ls axe-core` prüfen

### Paketgrenzen und geteilte Dateien – bestätigt bzw. ergänzt
| Datei | D-33-Besitz | Befund | Empfehlung |
|---|---|---|---|
| `components/CraftOSLogo.tsx` | **nicht zugeordnet** | Logo nutzt Clash 700 + General 500, wird in `components/layout/**` (a) eingebunden | **(b)** zuordnen (Performance-Hebel); (a) ändert die Einbindung nicht |
| `app/layout.tsx` (`localFont`) | (b) | Clash 500 ungenutzt | (b) |
| `app/globals.css` | (a) | enthält bereits D-19 (3); `h1–h4 { hyphens: auto }` | (a); (c) braucht hier nichts |
| `components/v2/FeatureCard.module.css`, `FeatureList.module.css` | (a) | Fokusring am Vorfahren | nur bei A11y-Befund ändern |
| `components/v2/BentoGrid.*` | (c) | Fokusring `.tile:focus-within`; neue 6. Kachel auf `/funktionen/rechnungen` durch (d) betrifft Layout bei 1024 px | (c) prüft D-19 (1) mit 6 Kacheln; 10-06 Sichtprüfung |
| `lib/funktionsdetails/rechnung.ts`, `buchhaltung.ts` | (d) | Kacheln für § 13b und `zusatz` an Kassenbuch | (d) |
| `tests/e2e/home-navigation.pw.cjs` (Zähler 30) | (d) | Z. 384, Z. 435 | (d) |
| `tests/e2e/function-illustrations.pw.cjs` | (b) (Flakes) | — | (b) |
| `components/layout/MegaMenu.tsx` | (a) | rendert keine Extras | unverändert (Open Question 3) |
| `components/ui/PageHero.tsx`, `TrialCta.tsx` | keiner | nach (c) ungenutzt bzw. Altklassen | nicht löschen; Kandidat für Inhaberliste |
| `scripts/visual-audit.mjs` | (a) | Routen ergänzen (D-14) und axe bei 5 Breiten | (a) |
| `tests/kernseiten.test.ts` | nicht genannt | Muster für Seitentests | (c) für eigene Seitenfälle; sonst Übergabe |
| `tests/pricing-parity.test.ts` | (b) (D-14) und (d) (D-22) | Konflikt | **(d) legt D-22 in eigener Datei** `tests/credit-paritaet.test.ts` an; (b) behält `pricing-parity.test.ts` |

## Security Domain

### Applicable ASVS Categories
| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | nein | — |
| V3 Session Management | nein | — |
| V4 Access Control | nein | — |
| V5 Input Validation | gering | Rechner bleiben clientseitig, keine Speicherung (D-15); keine neuen Formulare |
| V6 Cryptography | nein | — |
| V7 Error/Logging | ja | Prüfskripte geben keine Schlüssel aus (`SE_RANKING_*` nur als Variablenname) |
| V14 Configuration | ja | `next.config.js`-Header (nosniff, SAMEORIGIN, Referrer-Policy) bleiben; `inlineCss` ändert keine Sicherheitsheader |

### Known Threat Patterns
| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Schlüssel in Berichten/Logs (SE Ranking, Sentry, Vercel) | Information Disclosure | `scripts/lib/se-ranking-mcp.mjs`, `check-no-secrets.mjs` im Ship-Gate |
| Lieferkette (neue devDependency) | Tampering | exakte Version, Legitimacy-Check OK, kein `postinstall`, Lockfile-Review |
| CI-Kosten durch Push | (Kosten) | nur lokal testen, `gh workflow list --all` vor Push (globale Regel 5) |

## Project Constraints (from CLAUDE.md)

- **Projekt-CLAUDE.md:** Next.js App Router, Tailwind, TypeScript strict, keine `any`; Semantic HTML; WCAG: Alt-Texte, ARIA wo nötig, Tastaturbedienung, Kontrast ≥ 4,5 : 1; Fonts über `next/font` mit `display: swap`; Schema-Markup je Seite; Design-Kaskade bei UI-Arbeit (frontend-design → ui-ux-pro-max → 21st.dev nur Inspiration, nie Builder/Refiner → Context7 → SEO-Check) – laut D-20 einmal im 10-UI-SPEC; Context7 vor Framework-Code; Zugangsdaten nie committen.
- **Globale Regeln:** Tests und Verifikation ausschließlich lokal, keine GitHub Actions, vor jedem Push `gh workflow list --all`; `ship-gate` vor jedem Commit/Push der Umsetzung; schwere Läufe nach Koordinationsstatus und nur einzeln (hier `.heavy-lock`); kein Ultra-Review automatisch; Plugins nur über ihre Einstiegspunkte; Sentry-Token nur als Variablenname; Übergabe nach dem gemeinsamen Agent-Handoff-Skill.
- **EXECUTOR-RULES:** Worktrees `C:/Projekte/wt-10<x>`, Ports 3101–3105, `npm ci --prefer-offline` unter Sperre, nie fremde Prozesse beenden, Port nach Stopp prüfen, Texte mit `$`/Backticks nur über Write/Edit, `.planning/config.json` nie stagen, Nicht-Rollout-Pläne `requirements-completed: []`.

## Sources

### Primary (HIGH confidence)
- Eigene Messungen 23.10.2026 (Scratchpad `lh.mjs`, `exp*.mjs`, `lh4.mjs`, `a11yprobe.cjs`, `focusprobe.cjs`, `fontuse.cjs`, `bundle.mjs`) – Lighthouse 12.8.2, Chrome 153, axe 4.13.0, live https://craftos.eu und lokaler `.next`
- npm registry: `lighthouse` (13.5.0, engines, dependencies, kein postinstall), `@axe-core/playwright` 4.14.0 latest, `axe-core` 4.14.0 latest; gsd-tools package-legitimacy `lighthouse` OK
- Lighthouse-Quelltext 12.8.2 (`core/config/constants.js`, `core/lib/median-run.js`, `core/audits/metrics/*.js`) und v13.5.0 (`median-run.js`, `package.json`)
- `craftos/node_modules/@axe-core/playwright/dist/index.js`, `node_modules/axe-core/axe.js`
- `craftos/node_modules/next/dist/docs/…/inlineCss.md`, `…/02-components/font.md`
- Release-Repos nur lesend: Web `bfe165e9` (`src/App.tsx`, `src/hooks/useLicense.ts`, `src/lib/featureFlags.ts`, `src/pages/Kassenbuch.tsx`, `src/components/customers/CustomerDialog.tsx`, `src/lib/invoiceNoticeTexts.ts`, `supabase/functions/_shared/aiPricing.ts`, `src/lib/constants.ts`), Mobile `837aab4f` (`useAnalyzeInventoryPhoto.ts`)
- Repo-Code: `scripts/{performance,visual,seo}-audit.mjs`, `tests/e2e/playwright.config.cjs`, `components/**`, `lib/funktionsgruppen.ts`, `lib/product-register.ts`, `lib/funktionsdetails/**`, `app/**`, `.claude/skills/audit/SKILL.md` + `references/on-page-seo.md`, `code/check_page_similarity.py`

### Secondary (MEDIUM confidence)
- https://raw.githubusercontent.com/GoogleChrome/lighthouse/main/docs/readme.md (Node-Nutzung)
- https://github.com/GoogleChrome/lighthouse/releases/tag/v13.0.0 (Änderungen 13.0)
- https://developer.chrome.com/docs/lighthouse/performance/performance-scoring (Gewichte, Variabilität)
- https://raw.githubusercontent.com/dequelabs/axe-core/develop/doc/API.md (runOnly + rules)
- https://vercel.com/docs/analytics/custom-events (Custom Events nur Pro/Enterprise)

### Tertiary (LOW confidence)
- Laufzeit-/RAM-Schätzungen für volle Matrix und lokale Messung (als `[ASSUMED]` markiert)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH – Versionen und Legitimität geprüft, API am Quelltext belegt
- Architecture: HIGH – Bausteinregeln aus dem Code gelesen, Besitzlücken benannt
- Pitfalls: HIGH – überwiegend durch eigene Messung reproduziert (LCP, Fokus, axe-Optionen, Kontrast)
- Laufzeiten/RAM: MEDIUM – aus Stichproben hochgerechnet

**Research date:** 2026-10-23
**Valid until:** 2026-11-06 (Lighthouse erscheint monatlich; Release-Stände und SE-Ranking-Testzugang ändern sich bis 03.11.2026)
