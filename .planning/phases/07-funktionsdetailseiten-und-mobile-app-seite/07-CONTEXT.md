# Phase 7: Funktionsdetailseiten und Mobile-App-Seite – Context

**Gathered:** 2026-10-21
**Status:** Ready for planning
**Quelle der Entscheidungen:** Inhaberauftrag 20.10.2026 („viel strukturierter, viel schöner … nur Text … wir brauchen SEO“), Freigabe 21.10.2026 „ja mach einfach bis du sie alle fertig hast“ (keine Rückfragen; offene Details entscheidet der Orchestrator nach diesen Leitplanken). Ergebnisse und offene Punkte aus Phase 6 (06-VERIFICATION.md, PHASE-06-ROLLOUT.md, 06-REVIEW-FIX.md).

<domain>
## Phase Boundary

- Alle Funktionsdetailseiten `/funktionen/[slug]` (heute 16) auf eine feste v2-Vorlage umstellen.
- Neue Detailseiten für live Funktionen mit eigenem Keyword-Map-Eintrag (Status „geplant“, Phase 7): `/funktionen/gaeb`, `/funktionen/mahnwesen`, `/funktionen/terminplanung`, `/funktionen/bankabgleich`, `/funktionen/datenuebernahme`, `/funktionen/maengelmanagement` – nur wenn die Funktion im Produktregister live und beworben ist (Recherche bestätigt je Seite).
- Mobile-App-Seite `/app` mit allen Live-Funktionen der App (FEAT-03).
- Übrige Zusatzfunktionen ohne eigenes Keyword (z. B. Besichtigung, Abnahme mit Unterschrift, Bautagesbericht, Wareneingang, Angebotsunterschrift online, Kunden in der App, 21 Sprachen, Projekt-Chat) bekommen einen Abschnitt auf der passenden Detailseite statt eigener Seite.

Nicht in dieser Phase: Alternativen-Seiten, Preise-/Vergleichsseiten, technisches SEO-Audit, Titel/Descriptions aller übrigen Seiten (→ Phase 8); Gewerke-Seiten-Umbau (→ Phase 8, soweit SEO-relevant); Ratgeber/Hilfe (→ Phase 9).
</domain>

<decisions>
## Implementation Decisions

### Vorlage Detailseite (FEAT-02, DESIGN-02)
- **D-01:** Verbindlich bleiben 05-UI-SPEC („Werkbank-Präzision“) und 06-UI-SPEC (Header, Bausteine, Kompaktliste, Textbudgets). Bausteine aus `components/v2` wiederverwenden; neue Bausteine nur, wenn die Vorlage sie zwingend braucht.
- **D-02:** Feste Abschnittsfolge jeder Detailseite: (1) Seitenkopf mit H1 = Hauptkeyword der Keyword-Map (natürlich formuliert), ein Satz Kurznutzen, CTA „10 Tage kostenlos testen“ + Sekundärlink, visuelles Element (vereinfachte UI im Browser- oder Phone-Rahmen bzw. Paar, Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“); (2) Ablauf in 3–5 Schritten (StepFlow); (3) Plattformen (Web/Mobile, nur belegt) und Rollen (wer nutzt es: nur belegte Rollen/Rechte aus dem Web-Release); (4) Kernpunkte als Kacheln/Liste (statt Fließtext), inkl. Abschnitte für zugeordnete Zusatzfunktionen; (5) FAQ (FaqList + FAQPage nur für sichtbare Fragen); (6) verwandte Funktionen (2–3 Links, gleiche/benachbarte Gruppe); (7) CtaBand. Jeder Abschnitt: höchstens eine H2, ein Satz Einleitung.
- **D-03:** Inhalte kommen aus einem typisierten Inhaltsmodul je Funktion (Daten statt JSX-Texte), geprüft per Budget-Test; Produktfakten nur aus `lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts`, Snapshot und – bei Bedarf – lesend aus `C:/Projekte/craft-connect-buddy` und `C:/Projekte/CraftOS - Mobile/craftos-mobile` (`git show origin/release:<pfad>`). Keine erfundenen Funktionen, Zahlen, Rollen oder Kundenstimmen.
- **D-04:** Bestehende Detailtexte dürfen gekürzt und umstrukturiert werden (Inhaberauftrag); keine URL entfällt. Ausführliche Erklärungen, die wegfallen, nur dann, wenn sie in Hilfeartikeln oder FAQ abgedeckt sind; sonst als knapper Kernpunkt erhalten.

### Visuelle Elemente (MEDIA-01)
- **D-05:** Jede Live-Funktion bekommt ein visuelles Element. Die 11 Funktionskarten, die in Phase 6 nur ein Icon zeigen, erhalten eine vereinfachte UI-Szene (`lib/scenes.ts`, MiniUi), sofern ein belegter Bildschirm existiert; sonst eine Ablaufgrafik/Icon-Grafik. Szenen zeigen nur belegte Bildschirme, Felder und Statusnamen (Kurzform-Beleg `web:`/`app:`).
- **D-06:** Animierte Szenen: Die bestehenden `FeatureSnippet`-Szenen dürfen auf Detailseiten höchstens als ein Element bleiben, wenn reduced motion, CLS 0 und Budgets eingehalten sind; Standard ist die statische v2-Szene. `components/product-demo` wird nicht wieder eingebunden; die Dateien bleiben (keine Löschung ohne Freigabe), ihre beiden geskippten Specs bleiben geskippt, Vermerk für Phase 10.

### Neue Seiten und Zuordnung (FEAT-02)
- **D-07:** Neue Detailseiten (siehe Boundary) entstehen über dieselbe Vorlage; sie wandern in `lib/funktionsgruppen.ts` von den Zusatzfunktionen zu den Detailfunktionen (Menü, Übersicht, Sitemap, `llms.txt`, ItemList werden automatisch konsistent; Paritätstests anpassen). Zwei-Klick-Regel bleibt erfüllt.
- **D-08:** Keyword-Map: Status der neuen Seiten von „geplant“ auf „bestehend“; SE-Ranking-Projekt trackt diese Keywords bereits mit der geplanten Ziel-URL (kein Retarget nötig, nur `--check`).

### Mobile-App-Seite (FEAT-03)
- **D-09:** `/app` zeigt alle Live-Funktionen der App (Liste FEAT-03, gegen `C:/Projekte/CraftOS - Mobile/craftos-mobile` origin/release und Register geprüft) als gegliederte Kacheln (BentoGrid/FeatureCard) mit Phone-Darstellungen (PhoneFrame + MiniUi), plus Store-Links (iOS/Android), Offline und 21 Sprachen als Kennzahlen, FAQ, CtaBand. H1/Title nach Keyword-Map-Eintrag für `/app`.

### SEO (SEO-02-Fortsetzung)
- **D-10:** Title, H1, Description jeder Detailseite und von `/app` folgen der Keyword-Map (Title ≤ 60 Zeichen inkl. „| CraftOS“, Description 120–158 Zeichen). Menü- und Übersichts-Ankertexte dürfen den Wortstamm des Hauptkeywords aufnehmen, wo es natürlich ist (06-VERIFICATION: 9/16).
- **D-11:** Strukturierte Daten je Detailseite: BreadcrumbList (Start → Funktionen → Seite), FAQPage (nur sichtbare FAQ), WebPage; kein HowTo. `/app`: BreadcrumbList, FAQPage, SoftwareApplication (MobileApplication, Plattformen iOS/Android, Preis netto aus site.ts) wenn belegt.
- **D-12:** Neue Seiten in Sitemap, `llms.txt`, Menü, Übersicht; interne Links von verwandten Funktionen und passenden Hilfeartikeln/Gewerkeseiten (keine Massenverlinkung).

### Offene Punkte aus Phase 6
- **D-13:** IN-05 `data-source`: Werte auf öffentlichen Seiten auf die Kurzform `register:<id>` bzw. `site:<feld>` kürzen und Test anpassen (keine internen Pfade/Namen im HTML), sofern 05-UI-SPEC-Prüfung nur das Vorhandensein verlangt.
- **D-14:** IN-07 `scrollbar-gutter`: Sichtprüfung `/impressum`, `/datenschutz`, 404 in Chromium/WebKit bei 1440 und 390; nur bei sichtbarer Nebenwirkung auf Header/Menü-Bereich begrenzen.

### Qualität, Rollout
- **D-15:** Server Components, keine neue Client-Insel außer bestehender HeaderShell; CLS 0, reduced motion, LCP-Element ohne Lazy-Load, axe ohne serious/critical bei 360/390/768/1024/1440, Above-the-fold je Detailseite: H1, Kurznutzen und CTA ohne Scrollen bei 360×640.
- **D-16:** Ausführung strikt sequentiell (Wellen nacheinander), TDD für Datenmodule, schwere Läufe einzeln lokal (Port 3100 prüfen, eigene PID), Rollout wie Phase 6: lokale Gates, Code-Review-Gate durch Orchestrator, Ship-Gate, `gh workflow list --all` vor jedem Push, Push, Vercel READY, `live-check.mjs` erweitern, `npm run indexnow`, `node scripts/se-ranking-sync.mjs --check`, `node scripts/seo-report.mjs --etappe rollout-phase07`, `docs/releases/PHASE-07-ROLLOUT.md`.
- **D-17:** Anforderungsstatus: FEAT-02, FEAT-03, MEDIA-01 erst im Rollout-Plan als erledigt markieren; DESIGN-02 und SEO-02 bleiben „In Progress“ (Abschluss Phase 8). Pläne setzen `requirements-completed: []` außer im Rollout-Plan.

### Nach der Recherche festgelegt (21.10.2026, Orchestrator)
- **D-18:** Vor der Planung entsteht ein schlankes 07-UI-SPEC (Detailseiten-Vorlage `FunktionsKopf`, Abschnittsfolge, Kachelregeln, Szenenkatalog, /app-Gliederung), das 05- und 06-UI-SPEC referenziert statt wiederholt; Prüfung durch gsd-ui-checker.
- **D-19 (zu D-06):** Die animierte FeatureSnippet-Szene bleibt nur auf den 8 Detailseiten, an die E2E-Tests gebunden sind, als einziges animiertes Element im Ablauf-Abschnitt; auf allen anderen Seiten statische v2-Szenen.
- **D-20:** Terminplanung: Plattformen Web und Mobile-App mit Belegen; Text klar: geplant wird im Web, die App zeigt die Arbeitsabschnitte an. Produktbegriff „Arbeitsabschnitte“ (statt „Bauphasen“) in neuen Texten verwenden, Keyword „bauzeitenplan software“ bleibt Hauptkeyword.
- **D-21:** Zusatzeintrag „21 Sprachen“ verlinkt auf `/app`, sobald die neue App-Seite steht (Typ des Ziels ggf. um „seite“ erweitern); bis dahin `/funktionen/team`.
- **D-22:** H1-Regel: H1 entspricht exakt dem Zielwert der Keyword-Map und enthält das Kopfwort des Hauptkeywords; die vier Zielwerte für Team, Terminplanung, Bankabgleich und Datenübernahme werden laut Recherche umformuliert (≤ 60 Zeichen, nur belegte Aussagen – Bankabgleich ohne „automatisch“, KI-Zuordnung nur auf Anforderung/gegen Credits). Änderungen in KEYWORD-MAP.md und keyword-map.json dokumentieren.
- **D-23:** Offline-Aussagen nur mit den im Register erlaubten Einschränkungen (nie „vollständig offline“).

### Claude's Discretion
- Zuordnung der Zusatzfunktionen ohne eigene Seite zu Detailseiten; Auswahl der FAQ (Fragen aus SE-Ranking-Keyword-Fragen/Hilfeartikeln, nur belegte Antworten).
- Ob ein Datenmodul pro Funktion oder ein gemeinsames Modul; Szenenauswahl je Seite.
</decisions>

<canonical_refs>
## Canonical References

### Design und Bausteine
- `.planning/phases/05-produktwahrheit-designsystem-v2-und-medienpipeline/05-UI-SPEC.md`
- `.planning/phases/06-startseite-navigation-und-funktions-bersicht/06-UI-SPEC.md`
- `craftos/docs/DESIGN-V2.md`, `craftos/components/v2/**`, `craftos/lib/scenes.ts`, `craftos/app/styleguide/page.tsx`
- `.planning/phases/06-…/06-0[1-6]-SUMMARY.md`, `06-REVIEW-FIX.md`, `06-VERIFICATION.md`, `craftos/docs/releases/PHASE-06-ROLLOUT.md`

### Produkt und SEO
- `craftos/lib/product-register.ts`, `craftos/lib/funktionen.ts`, `craftos/lib/funktionsgruppen.ts`, `craftos/lib/site.ts`, `craftos/docs/product-pricing-snapshot.json`
- `craftos/docs/seo/KEYWORD-MAP.md`, `keyword-map.json`, `craftos/lib/keyword-map.ts`, `craftos/docs/seo/SE-RANKING-BEFUND-2026-10-20.md`, `craftos/docs/seo/data/`
- Produkt-Repos (nur lesend): `C:/Projekte/craft-connect-buddy` (Web, `origin/release`), `C:/Projekte/CraftOS - Mobile/craftos-mobile` (Mobile, `origin/release`)

### Bestand
- `craftos/app/funktionen/[slug]/page.tsx`, `craftos/app/app/page.tsx`, `craftos/components/feature-snippet/**`, `craftos/lib/llms.ts`, `craftos/app/sitemap.ts`, `craftos/lib/schema.ts`, `craftos/content/hilfe/**`
- Tests: `craftos/tests/**`, `craftos/tests/e2e/**` (explizites `testMatch`), `craftos/scripts/route-audit.mjs`, `live-check.mjs`, `se-ranking-sync.mjs`, `seo-report.mjs`
</canonical_refs>

<deferred>
## Deferred Ideas
- Löschung von `components/product-demo` und der zwei geskippten Specs → Phase 10 mit Inhaberfreigabe.
- Echte Kundenstimmen/Logos – erst wenn belegt.
- Gewerke-Seiten-Umbau → Phase 8.
</deferred>

---

*Phase: 07-funktionsdetailseiten-und-mobile-app-seite*
*Context gathered: 2026-10-21*
