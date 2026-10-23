---
phase: 09-gewerke-und-wissensinhalte
verified: 2026-10-23T12:30:00Z
status: human_needed
score: 7/7 must-haves verified
re_verified: 2026-10-23T08:20:00Z
overrides_applied: 0
gaps:
  - truth: "Für jede seit 09.09.2026 neue Live-Funktion gibt es mindestens einen Hilfeartikel mit Schritt-für-Schritt-Anleitung, verlinkt von der Detailseite (ROADMAP SC 3, CONTENT-04)"
    status: closed
    closed_by: "6921340 (Fix), f6144bb (Test), 937fa13 (live-check), 18887fe (Doku); live seit 23.10.2026 10:17 MESZ"
    reason: "13 von 14 Funktionen erfüllen das Kriterium. Für „Abnahme und Teilabnahme“ gibt es den Artikel /hilfe/abnahme-dokumentieren (live, mit Teilabnahme-Schritten), aber keine Funktionsdetailseite verlinkt ihn. Auf /funktionen/baudokumentation hat die Kachel „Abnahme und Teilabnahme“ kein href, und der Sekundärlink zeigt auf /hilfe/bautagesbericht-erstellen. Live-Scan aller 25 Seiten unter /funktionen*, /app und /craft-ai: kein Link auf /hilfe/abnahme-dokumentieren. Die Abdeckungstabelle (09-integration.md § 7, PHASE-09-ROLLOUT.md § 10) behauptet „/funktionen/baudokumentation“ als verlinkende Detailseite mit Audit „FD“. tests/funktionsdetails.test.ts prüft für baudokumentation aber nur den Sekundärlink auf bautagesbericht-erstellen."
    artifacts:
      - path: "craftos/lib/funktionsdetails/baustelle.ts"
        issue: "Kachel „Abnahme und Teilabnahme“ (Kernpunkte von baudokumentation, zusatz „abnahme“) ohne href auf /hilfe/abnahme-dokumentieren"
      - path: "craftos/tests/funktionsdetails.test.ts"
        issue: "Kein Test, dass baudokumentation auf /hilfe/abnahme-dokumentieren verlinkt; die Tabelle nennt „FD“ als Audit, obwohl FD das nicht prüft"
      - path: "craftos/docs/content-pruefung/09-integration.md"
        issue: "§ 7, Zeile „Abnahme und Teilabnahme“: verlinkende Detailseite und Ergebnis „grün“ stimmen nicht mit dem Code und der Live-Seite überein (gleiche Zeile in PHASE-09-ROLLOUT.md § 10)"
    missing:
      - "href \"/hilfe/abnahme-dokumentieren\" an der Kachel „Abnahme und Teilabnahme“ in lib/funktionsdetails/baustelle.ts (Kacheln dürfen laut lib/funktionsdetails/index.ts auf /hilfe/{slug} zeigen)"
      - "Test in tests/funktionsdetails.test.ts: baudokumentation enthält href /hilfe/abnahme-dokumentieren (rot vor dem Fix)"
      - "live-check-Zeile „Detailseiten verlinken Anleitungen“ um baudokumentation → abnahme-dokumentieren erweitern"
      - "Abdeckungstabelle in 09-integration.md und PHASE-09-ROLLOUT.md nach dem Fix korrigieren; danach Ship-Gate, Push und Live-Prüfung"
deferred:
  - truth: "DESIGN-02: Designsystem v2 wird auf allen Seiten einheitlich genutzt"
    addressed_in: "Phase 10"
    evidence: "ROADMAP Phase 9: „DESIGN-02 für Gewerke-, Ratgeber- und Hilfe-Vorlagen, Rest Phase 10“; REQUIREMENTS-Traceability: „Rest Phase 10 (Rechner, Support, Rechtsseiten, 404)“"
  - truth: "Zusatzkarten „Kassenbuch“ und „Rechnung nach § 13b“ auf /funktionen und im Mega-Menü"
    addressed_in: "Phase 10"
    evidence: "09-integration.md § 6/§ 8 und deferred-items.md (09-09): Entscheidung Phase 10; nicht Teil der 14 Funktionen aus D-19. Das Kassenbuch ist über die Kachel auf /funktionen/buchhaltung verlinkt."
human_verification:
  - test: "Echte Silbentrennung langer H1 in Safari auf dem iPhone (360/390), z. B. /hilfe/material-entnehmen-zurueckbuchen"
    expected: "Trennung mit Trennstrich wie in Chromium („Materialentnahme-schein“), kein harter Umbruch mitten im Wort"
    why_human: "Playwright-WebKit unter Windows hat kein deutsches Trennwörterbuch (09-integration.md § 8)"
  - test: "Vercel Analytics → Events, Zeitraum „Last 24 hours“, frühestens ab 24.10.2026 09:26 MESZ"
    expected: "trial_click und ai_visit erscheinen weiterhin"
    why_human: "Ohne Dashboard- oder MCP-Zugang nicht abrufbar (PHASE-09-ROLLOUT.md § 8)"
  - test: "Stichprobe Rechts- und Steuerfakten der Wissensseiten (Leistungszeitraum, Reverse Charge, Bedenkenanzeige, Mängelanzeige) gegen die verlinkten Quellen"
    expected: "Aussage und checkedAt entsprechen dem aktuellen Gesetzestext"
    why_human: "Im Phasen-Gate laut 09-integration.md § 9 „nicht erneut geöffnet“; fremde Quellen und juristisches Urteil"
---

# Phase 9: Gewerke und Wissensinhalte – Verifikationsbericht

**Phasenziel:** Gewerke-Seiten, Ratgeber und Hilfe sind klar gegliedert, entsprechen dem aktuellen Produktstand und erklären auch die neuen Funktionen Schritt für Schritt.
**Verifiziert:** 23.10.2026, gegen den Code in `craftos/` (HEAD `e8e01a5`), gegen die Live-Seite https://craftos.eu und gegen `origin/release` der Web-App (`bfe165e`, v4.0.0-test.249) und der Mobile-App (`837aab4`, mobile-v1.0.0-test.96)
**Status:** human_needed (Lücke geschlossen, siehe Nachtrag; die drei Inhaberprüfungen bleiben offen)
**Re-Verifikation:** Nein, Erstprüfung

Hinweis zur Methode: SUMMARY-, Integrations- und Rollout-Dokumente dienten nur als Hinweisquelle. Alle Aussagen unten beruhen auf eigenen Abfragen: Dateien in `craftos/`, Release-Code über `git show`/`git archive origin/release`, Live-HTML über `fetch`/`curl`. Es liefen keine Builds, keine E2E und kein Server.

## Zielerreichung

### Beobachtbare Wahrheiten

| # | Wahrheit | Status | Beleg |
|---|---|---|---|
| 1 | SC 1 / FEAT-04: Die 12 Gewerke-Seiten zeigen gewerktypische Abläufe mit visuellen Elementen und verlinken auf die passenden Funktionsseiten | ✓ VERIFIED | Live: alle 12 `/gewerke/*` HTTP 200, genau eine H1, `#antwort` ≤ 300 Zeichen, Abschnitt „Ablauf“ mit Schrittliste, je 6 verschiedene Links auf `/funktionen/*`, 61–78 SVG/Bild-Elemente, FAQPage-Schema vorhanden. Vorlage `app/gewerke/[slug]/page.tsx` nutzt StepFlow, FeatureCard, SceneContent, FaqList, LinkKarten. Prüfung in `lib/gewerke.ts:642`: Jede Gewerk-Funktion muss eine Live-Funktion sein. |
| 2 | SC 2 / CONTENT-03: Ratgeber und Hilfeartikel sind gegen den Produktstand geprüft, korrigiert und gegliedert; keiner beschreibt eine nicht-live Funktion | ✓ VERIFIED | Bestand: 30 Ratgeber und 54 Hilfeartikel (24 + 40 Bestand, dazu 20 neue). Alle mit `draft: false` und Pflichtfeld `answer`. Live: alle 84 in der Sitemap (156 URLs), HTTP 200, genau eine H1, `#antwort` ≤ 300, kein HowTo-Schema; RSS 30 Einträge. Alle 54 Hilfeartikel haben nummerierte Schritte; 8 Ratgeber haben keine, das ist nach D-13 zulässig (Schritte nur „wo es passt“). Produktwahrheit: 1.372 zitierte Bedienbegriffe („…“) aus allen 84 Artikeln gegen den Release-Quelltext (Web `src` + `supabase/functions`, Mobile `src`) abgeglichen, 1.370 gefunden. Die beiden Fehltreffer sind Beispieldaten („Wohnung Lindenstraße“). |
| 3 | SC 3 / CONTENT-04: Für jede neue Live-Funktion seit 09.09.2026 gibt es einen Hilfeartikel mit Schritt-für-Schritt-Anleitung, verlinkt von der Detailseite | ✗ FAILED (teilweise) | Alle 14 Anleitungen (plus Kassenbuch) sind live und haben einen Abschnitt „Schritt für Schritt“. 18 von 19 Link-Paaren Detailseite → Anleitung sind live vorhanden. **Lücke:** `/funktionen/baudokumentation` verlinkt `/hilfe/abnahme-dokumentieren` nicht, und auch keine andere Funktionsseite tut das (Scan aller 25 Seiten). Die Kachel „Abnahme und Teilabnahme“ in `lib/funktionsdetails/baustelle.ts` hat kein href. Die Abdeckungstabelle gibt für diese Zeile fälschlich „grün“ an. |
| 4 | SC 4: Metadaten- und Breadcrumb-Regeln aus Phase 8 erfüllt; live nach Ship-Gate mit IndexNow | ✓ VERIFIED | Live über alle 97 Gewerke-/Artikel-URLs: Title beginnt mit dem Map-`target.title`, Description = Map-`target.description`, Canonical = Pfad, `og:image` vorhanden, genau ein `BreadcrumbList`, Brotkrumen-Navigation vorhanden, 0 Abweichungen. Live-Stand enthält die letzten Code-Commits (z. B. `/app` „Urlaubsanträge“ aus `47b3483`). IndexNow-Schlüsseldatei liefert 200. Die IndexNow-Meldung (156 URLs, HTTP 200) ist nur im Rollout-Nachweis belegt. |
| 5 | SC 5 / SEO-09: Jede KD<20-Lücke und jede getrackte KI-Frage hat eine zitierfähige Zielseite (Antwort zuerst, Fakten mit Quelle, FAQPage) | ✓ VERIFIED | Alle 9 Lücken mit Zielphase 9 aus `KEYWORD-MAP.md` § 3 sind live (`#antwort` ≤ 300, FAQPage); `keyword-map.json`: 156/156 `bestehend`, 0 `geplant`. Alle 20 Ziele aus `ai-prompts-targets.json` sind live mit HTTP 200 und Anker. Die Abdeckungstabelle (18 Themen) ist in `09-integration.md` § 7 und `PHASE-09-ROLLOUT.md` § 10 vorhanden. Hinweis: `/blog/materialliste-vorlage` hat bewusst `sources: []` (keine Rechtsfakten). |
| 6 | SC 6 / DESIGN-02 (Teil): Gewerke-, Ratgeber- und Hilfeseiten nutzen die v2-Bausteine einheitlich | ✓ VERIFIED (Teilstand) | `app/gewerke/[slug]/page.tsx`, `app/gewerke/page.tsx`, `components/content/ArticlePage.tsx` und `ContentIndex.tsx` importieren ausschließlich v2-Bausteine (Abschnitt, SectionHeader, StepFlow, FeatureCard, FaqList, LinkKarten, CtaBand, SceneContent). Die Schrittliste ist v2-CSS auf der obersten `ol` der Prosa. Der Rest von DESIGN-02 liegt in Phase 10 (deferred). Den visuellen Gesamteindruck hat 09-16 laut Bericht gesichtet; er wurde hier nicht neu bewertet. |
| 7 | Inhaberregel: Es wird nur Unterstütztes genannt; Negativlisten gibt es nur in der GoBD-Ausnahme | ✓ VERIFIED | Alle 21 Grenze-Kacheln in `lib/funktionsdetails/*` sind positiv formuliert (z. B. „Steuererklärung über die Kanzlei“, „E-Rechnung mit strukturierten Daten“). Keine FAQ-Antwort in Gewerken, Artikeln oder Detailseiten beginnt mit „Nein/Nicht/Kein“, als Leistungsverneinung. Ausnahmen: „Nichts. Die KI-Kosten … übernimmt CraftOS“ (Vorteil) und auf der Startseite „Nein, die Plantafel gehört zur Voll-Lizenz“ (Vorteil, kein Phase-9-Inhalt). Die übrigen „noch nicht“-Treffer sind wörtliche Statusmeldungen der App. Gesperrte Funktionen aus dem Release (KI-Agent nur für `isDeveloper`, Videoanalyse „Bald verfügbar“, `subcontractorPortalInvites: false`) werden auf keiner Seite als verfügbar genannt. Sie stehen nur im Register bzw. in der L-1-Sperrliste. |

**Punktzahl:** 6/7 Wahrheiten verifiziert

### Zurückgestellte Punkte

| # | Punkt | Zuständig | Beleg |
|---|---|---|---|
| 1 | DESIGN-02 für Rechner, Support, Rechtsseiten, 404 | Phase 10 | ROADMAP Phase 9 Requirements-Zeile; REQUIREMENTS-Traceability |
| 2 | Zusatzkarten Kassenbuch und § 13b auf /funktionen und im Mega-Menü | Phase 10 | 09-integration.md § 6/§ 8; nicht Teil der 14 Funktionen (D-19) |

### Pflichtartefakte

| Artefakt | Erwartet | Status | Details |
|---|---|---|---|
| `craftos/lib/gewerke.ts` | 12 Gewerke mit `ablauf`, `faq`, Funktionen | ✓ VERIFIED | live auf 12 Seiten gerendert, 37 FAQ-Antworten |
| `craftos/app/gewerke/[slug]/page.tsx`, `app/gewerke/page.tsx` | v2-Vorlage | ✓ VERIFIED | v2-Importe, live 13 URLs |
| `craftos/components/content/ArticlePage.tsx` | Artikelvorlage v2 mit Antwort, Inhaltsverzeichnis, Schrittliste | ✓ VERIFIED | live auf 84 Artikeln (`artikel-toc-liste`, `#antwort`) |
| `craftos/content/blog/*.md` (30), `content/hilfe/*.md` (54) | geprüft, `answer` Pflicht | ✓ VERIFIED | Zählung und Frontmatter geprüft |
| `craftos/lib/funktionsdetails/*.ts` | Links auf neue Anleitungen | ⚠️ PARTIAL | 13/14 verlinkt; Abnahme fehlt (baustelle.ts) |
| `craftos/docs/content-pruefung/09-integration.md` | Abdeckungstabelle | ⚠️ PARTIAL | vorhanden; Zeile „Abnahme und Teilabnahme“ sachlich falsch |
| `craftos/docs/releases/PHASE-09-ROLLOUT.md` | Rollout-Nachweis | ✓ VERIFIED | vorhanden; gleiche falsche Tabellenzeile in § 10 |

### Prüfung der Schlüsselverbindungen (Detailseite → Anleitung, live)

| Von | Nach | Status |
|---|---|---|
| /funktionen/terminplanung | /hilfe/projekt-phasen-anlegen | ✓ WIRED |
| /funktionen/baudokumentation | /hilfe/abnahme-dokumentieren | ✗ NOT_WIRED |
| /funktionen/baudokumentation | /hilfe/bautagesbericht-erstellen | ✓ WIRED |
| /funktionen/maengelmanagement | /hilfe/mangel-erfassen-bearbeiten | ✓ WIRED |
| /funktionen/mahnwesen | /hilfe/mahnwesen-einrichten | ✓ WIRED |
| /funktionen/bankabgleich | /hilfe/bankumsaetze-abgleichen | ✓ WIRED |
| /funktionen/gaeb, /funktionen/angebote | /hilfe/datanorm-katalog-importieren | ✓ WIRED |
| /funktionen/datenuebernahme | /hilfe/daten-importieren | ✓ WIRED |
| /funktionen/angebote | /hilfe/angebot-online-unterschreiben-lassen | ✓ WIRED |
| /funktionen/kundenportal | /hilfe/kundenportal-kunden-einladen | ✓ WIRED |
| /funktionen/lager | /hilfe/lager-scan-app | ✓ WIRED |
| /funktionen/aufmass | /hilfe/besichtigung-durchfuehren | ✓ WIRED |
| /funktionen/team, /funktionen/projektverwaltung, /app | /hilfe/projekt-chat-nachrichten | ✓ WIRED |
| /funktionen/team, /app | /hilfe/app-sprache-einstellen | ✓ WIRED |
| /funktionen/buchhaltung | /hilfe/kassenbuch-fuehren (D-32) | ✓ WIRED |
| Gewerke (shk, bauunternehmen) | /hilfe/abnahme-dokumentieren | ✓ WIRED (ersetzt nicht die Detailseite) |

### Release-Abgleich (Stichprobe, Freischaltungen)

| Prüfung | Release-Beleg | Ergebnis |
|---|---|---|
| KI-Agent | `src/pages/KiAgent.tsx`, `AppSidebar.tsx:350` nur für `usePlatformDeveloper`, sonst „Bald verfügbar“ | auf der Website nicht beworben; nur im Register `lib/product-register.ts:390` als nicht live |
| Craft AI im Angebot | `OfferAiWorkspace.tsx` hinter `useAiGate('offer')` (Betriebs-/Personenschalter, kein Entwicklerschalter) | Artikel `craft-ai-betriebsdaten-fragen` beschreibt die Freigabe durch Admin unter „Einstellungen“ → „KI-Funktionen“: korrekt |
| Videoanalyse | `src/lib/ai/availability.ts` „Bald verfügbar“ | auf der Website nicht genannt (Besichtigung nennt nur Videoaufnahme, Label „Video & Sprachnotiz“ im Release belegt) |
| Subunternehmer-Portal | `featureFlags.ts` `subcontractorPortalInvites: false` | nicht beworben; Subunternehmer nur als Anwesende bzw. Zuständige mit belegten Labels |
| Kassenbuch | Route `/buchhaltung/kasse` (`LicenseProtectedRoute feature="finanzen"`), Reiter „Kasse“ in `AccountingNavigation.tsx`, „Buchung erfassen“, „Kassensturz“ | Artikel stimmt |
| Release-Delta nach dem Rollout | test.248 → test.249: nur `Dokumente`-Filter (NB7) | keine Inhaltswirkung |
| Mobile | `origin/release` unverändert `837aab4`; keine Entwickler-Gates im Quelltext | – |

### Datenfluss (Ebene 4)

| Artefakt | Daten | Quelle | Echte Daten | Status |
|---|---|---|---|---|
| Gewerke-Seiten | Ablauf, FAQ, Funktionen | `lib/gewerke.ts` (statisch, mit Prüfung gegen `lib/funktionen.ts`) | ja, live gerendert | ✓ FLOWING |
| Artikel | Frontmatter `answer`, Prosa, FAQ | `content/*/*.md` über `lib/content.ts` | ja, 84 live | ✓ FLOWING |
| Detailseiten-Links | `secondary.href`, Kachel-`href` | `lib/funktionsdetails/*.ts` | ja; Abnahme-Kachel ohne href | ⚠️ teilweise |

### Stichproben zum Verhalten

| Verhalten | Befehl | Ergebnis | Status |
|---|---|---|---|
| Sitemap-Mengen | Node-`fetch` `/sitemap.xml` | 156 URLs, 30 /blog, 54 /hilfe, 12 /gewerke | ✓ PASS |
| Antwort zuerst, H1, kein HowTo | Node-`fetch` aller 97 URLs | 0 Abweichungen | ✓ PASS |
| Meta/Breadcrumb gegen Keyword-Map | Node-`fetch` + `keyword-map.json` | 0 Abweichungen | ✓ PASS |
| KI-Prompt-Anker | 20 Ziele aus `ai-prompts-targets.json` | 0 fehlend | ✓ PASS |
| Bedienbegriffe gegen Release | Abgleich von 1.372 Zitaten | 1.370 gefunden, 2 Beispieldaten | ✓ PASS |
| Detailseite → Anleitung | 19 Paare live | 18/19 | ✗ FAIL |
| RSS | `/feed.xml` | 30 Einträge | ✓ PASS |

### Ausführung der Prüfskripte

Die Phase deklariert keine `scripts/*/tests/probe-*.sh`. `live-check.mjs` wurde nicht erneut ausgeführt. Stattdessen liefen die gleichnamigen Prüfungen oben mit eigenen Skripten im Sitzungs-Scratchpad gegen https://craftos.eu. Hinweis: Die live-check-Zeile „Detailseiten verlinken Anleitungen“ prüft nur kundenportal, mahnwesen, bankabgleich und datenuebernahme. Deshalb ist ihr die Abnahme-Lücke entgangen.

### Abdeckung der Anforderungen

| Anforderung | Beschreibung | Status | Beleg |
|---|---|---|---|
| FEAT-04 | 12 Gewerke-Seiten mit gewerktypischen Abläufen und visuellen Elementen | ✓ SATISFIED | Wahrheit 1 |
| CONTENT-03 | 24 Ratgeber und 40 Hilfeartikel geprüft, korrigiert, gegliedert | ✓ SATISFIED | Wahrheit 2 (jetzt 30/54 inkl. neuer Artikel) |
| CONTENT-04 | Hilfeartikel mit Schritt-für-Schritt-Anleitung je neuer Live-Funktion | ✓ SATISFIED (REQ-Text) / ✗ SC 3 teilweise | Den Requirement-Text erfüllen alle 14 Funktionen. Der ROADMAP-Zusatz „verlinkt von der Detailseite“ fehlt bei Abnahme. |
| SEO-09 | Zitierfähige Zielseiten für KI-Fragen und KD<20-Lücken | ✓ SATISFIED | Wahrheit 5 |
| DESIGN-02 | v2 sitewide | Teilstand ✓, Rest deferred (Phase 10) | Wahrheit 6 |

Keine verwaisten Anforderungen: Die REQUIREMENTS-Traceability ordnet Phase 9 genau FEAT-04, CONTENT-03, CONTENT-04, SEO-09 (Abschluss) und DESIGN-02 (Teil) zu.

### Gefundene Anti-Patterns

| Datei | Zeile | Muster | Schwere | Wirkung |
|---|---|---|---|---|
| `craftos/docs/content-pruefung/09-integration.md` | § 7 | Abdeckungszeile „grün“ ohne tatsächliche Prüfung | ⚠️ Warning | falscher Nachweis; dieselbe Zeile steht in PHASE-09-ROLLOUT.md § 10 |
| `craftos/scripts/live-check.mjs` | Phase-9-Block | Linkprüfung nur für 4 von 14 Detailseiten | ℹ️ Info | Lücke blieb unentdeckt |

Keine Marker TBD, FIXME oder XXX in den von Phase 9 geänderten Code- und Inhaltsdateien.

### Menschliche Prüfung erforderlich

1. **Silbentrennung in echtem Safari:** Auf dem iPhone bei 360/390 lange H1 öffnen, z. B. auf `/hilfe/material-entnehmen-zurueckbuchen`. Erwartet: Trennung mit Trennstrich. Warum manuell: Playwright-WebKit unter Windows hat kein Wörterbuch.
2. **Analytics-Ereignisse:** In Vercel → craftos → Analytics → Events „Last 24 hours“ ab 24.10.2026 09:26 MESZ öffnen. Erwartet: `trial_click` und `ai_visit` erscheinen. Warum manuell: Dafür ist Dashboard-Zugang nötig.
3. **Rechts- und Steuerfakten:** Die Wissensseiten (Leistungszeitraum, Reverse Charge, Bedenkenanzeige, Mängelanzeige) gegen ihre Quellen lesen. Erwartet: Aussage und `checkedAt` sind aktuell. Warum manuell: Das ist ein juristisches Urteil, und das Phasen-Gate hat die Quellen nicht erneut geöffnet.

### Zusammenfassung der Lücken

Das Phasenziel ist bis auf eine Lücke erreicht. Die 12 Gewerke-Seiten, 30 Ratgeber und 54 Hilfeartikel sind live, gegliedert und folgen dem Prinzip „Antwort zuerst“. Sie halten die Metadaten- und Breadcrumb-Regeln ein, und ihre Bedienbegriffe sind praktisch vollständig im Release belegt. Gesperrte Release-Funktionen (`isDeveloper`-KI-Agent, Videoanalyse, Subunternehmer-Portal) werden nicht beworben, und Negativformulierungen fehlen bis auf die GoBD-Ausnahme.

Die einzige Lücke betrifft ROADMAP SC 3: Die Anleitung zu „Abnahme und Teilabnahme“ (`/hilfe/abnahme-dokumentieren`) ist von keiner Funktionsdetailseite verlinkt. Die Abdeckungstabelle und der Rollout-Nachweis melden diese Zeile trotzdem als grün. Ursache ist eine fehlende Prüfung: `tests/funktionsdetails.test.ts` und `live-check.mjs` prüfen diese Verbindung nicht. Die Behebung ist klein: ein href an der vorhandenen Kachel, ein Test und eine Zeile im live-check. Danach müssen Tabelle und Nachweis berichtigt werden, gefolgt von Ship-Gate, Push und Live-Prüfung.

---

_Verifiziert: 23.10.2026_
_Prüfer: Claude (gsd-verifier)_

---

## Nachtrag 23.10.2026: Lücke geschlossen

**Befund:** ROADMAP SC 3 / CONTENT-04 ist jetzt vollständig erfüllt. `/funktionen/baudokumentation` verlinkt `/hilfe/abnahme-dokumentieren` über die Kachel „Abnahme und Teilabnahme“. Wahrheit 3 ist ✓ VERIFIED, die Punktzahl steigt auf 7/7. Der Status lautet `human_needed`, weil die drei menschlichen Prüfungen oben (Safari-Silbentrennung, Analytics-Ereignisse, Rechts- und Steuerfakten) unverändert offen sind.

| Commit | Inhalt |
|---|---|
| `f6144bb` | test: Block „CONTENT-04: jede Anleitung zu einer neuen Live-Funktion ist von einer Detailseite verlinkt“ in `tests/funktionsdetails.test.ts`. Er deckt alle 15 Anleitungen der Abdeckungstabelle ab (Sekundärlink oder Kachel, gerenderter `href`). Vor dem Fix war er rot, mit genau 2 Fehlschlägen, beide zu Abnahme. |
| `6921340` | fix: `href: "/hilfe/abnahme-dokumentieren"` an der Kachel in `lib/funktionsdetails/baustelle.ts`, zulässig nach `pruefeKachelLink` (`/hilfe/{slug}`) |
| `937fa13` | `scripts/live-check.mjs`: „Detailseiten verlinken Anleitungen“ prüft jetzt 14 Detailseiten, 17 Links und 15 Anleitungen (vorher 4 Seiten). Jede Anleitung muss in der Sitemap stehen. |
| `18887fe` | Abdeckungszeile in `09-integration.md` § 7 und `PHASE-09-ROLLOUT.md` § 10 richtiggestellt, mit Korrekturvermerk |
| `467da9d`, `5ae63b3` | Nebenbefund: `origin/release` der Web-App ist auf test.249 (`bfe165e9`) vorgerückt. Deshalb war `pricing-parity` „Snapshot ist aktuell“ rot. Preis- und Beleg-Snapshot sowie `productBasis` wurden angehoben. Das Delta besteht aus 2 Commits (Dokumente-Filter) und ändert keine der 43 Belegdateien und keine Preise. |

**Lokale Prüfungen unter `.heavy-lock`:**
- Vitest: 1363 von 1363 (45 Dateien)
- `tsc --noEmit`: 0 Fehler
- `npm run lint`: 0 Befunde
- `npm run build`: 319 statische Seiten
- `seo-audit`: 0 Verstöße über 156 von 156 URLs und 12 Regeln
- `live-check` gegen `localhost:3100`: 69 von 69 OK
- E2E `design-v2.pw.cjs`: 140 bestanden, 8 übersprungen, 0 fehlgeschlagen
- Der Server wurde per eigener PID beendet, Port 3100 ist frei.

**Live (https://craftos.eu, Push `e8e01a5..5ae63b3`):**
- `/funktionen/baudokumentation` enthält genau einen Link `<a class="BentoGrid-module__…__link" href="/hilfe/abnahme-dokumentieren">`, live ab etwa 50 s nach dem Push.
- `/hilfe/abnahme-dokumentieren` antwortet mit HTTP 200.
- `LIVE_ORIGIN=https://craftos.eu node scripts/live-check.mjs`: 69 von 69 OK, darunter „Detailseiten verlinken Anleitungen (14 Seiten, 17 Links, 15 Anleitungen)“.
- IndexNow: `https://craftos.eu/funktionen/baudokumentation` per POST gemeldet, Schlüsseldatei mit HTTP 200 und passendem Inhalt, Antwort HTTP 200 (08:18 UTC).

_Nachtrag: Claude (Lückenschluss), 23.10.2026_
