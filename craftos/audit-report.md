# Audit: craftos.eu · 23.10.2026 · 156 Seiten

## Vorab-Audit 2026-10-23

> **inferred – ohne Search Console ausgeführt.** Es gibt keinen Zugang zu den Search-Console-Exporten (Antwort 4). Folgende Angaben sind deshalb Ableitung statt Messung: indexierte Seiten (SE-Ranking-Wert 62, kein Google-Export), Positionen (SE-Ranking-Projekt statt Search Console), Feldwerte der Core Web Vitals (keine; nur Labordaten), Kannibalisierung (aus Keyword-Map und SE-Ranking-Positionen). Jede betroffene Zeile trägt „inferred“.

Ausführung nach `.claude/skills/audit/SKILL.md` (Repo-Wurzel), Projektwurzel `craftos/`, Plan 10-05 (Paket e), Worktree `phase10-spur-e`. Stand der Website: https://craftos.eu mit Phase 9; lokaler Produktionsbuild des Worktrees vom 23.10.2026, 11:17 UTC. Dieses Vorab-Audit ist die Basis; das Bestätigungsaudit nach dem Rollout 10-07 wird darunter als neuer datierter Abschnitt angehängt (Skill: Wiederholungen ergänzen, nie ersetzen).

### Festgeschriebene Antworten (Skill-Fragen 0 bis 3)

| Nr. | Frage des Skills | Antwort |
|---|---|---|
| 1 | Wessen Seite, welcher Modus? | Domain `craftos.eu`, Modus „eigene Seite“ (kein Prospect-/Gap-Modus), Projektwurzel `craftos/` |
| 2 | Seitenliste | https://craftos.eu/sitemap.xml (156 URLs) und lokaler Build `.next/server/app/sitemap.xml.body` (156 URLs); Abgleich: 0 Abweichungen |
| 3 | Scope | Site-Ebenen voll; `seo-audit.mjs` (12 Regeln) und `route-audit.mjs` auf allen 156 Seiten; 80-Punkte-Liste und GEO-Papierteil je Vorlage eine Seite – **sampled: 14 von 156** |
| 4 | Search Console | ohne Exporte ausführen → Kasten „inferred“, Ebene 1 „nicht gemessen – kein Zugang“; Semrush und Business Profile ebenfalls „nicht gemessen“; SE Ranking ersetzt Semrush (Quelle je Zahl) |
| 5 | Local/GBP | übersprungen – SaaS ohne lokales Einzugsgebiet |
| 6 | Freigabe der Behebung | mechanische Korrekturen freigegeben durch den Orchestrator im Rahmen der Inhaberfreigaben vom 21.10.2026 („mach einfach bis du sie alle fertig hast“); Quelle: 10-CONTEXT D-25, Plan 10-05 |
| 7 | Kopier- und Löschregel | Zähler „geänderte Fließtextsätze“ Soll 0; Löschkandidaten nur unter „Needs your approval to remove“ |
| 8 | Fehlerdefinition QA-06 | siehe Abschnitt „QA-06“ unten |
| 9 | Schwellenkonflikt Title/Description | Skill 50–60 bzw. 140–160 Zeichen gegen Projektregel Title ≤ 60, Description 120–155 → Owner decision (Beleg `tests/keyword-map.test.ts`), nicht im Fix-Loop |
| 10 | „JavaScript nicht komprimiert“ | Crawler artifact mit `curl`-Beleg (unten); im Audit 485185 bereits 0 Treffer |
| 11 | Lighthouse-Ziel | Performance nach D-11 (≥ 95 und LCP < 2,5 s je Vorlage, nicht „100“); Accessibility, Best Practices und SEO sollen 100 bleiben |

Stichprobe (eine Seite je Vorlage, 14): `/`, `/funktionen`, `/funktionen/zeiterfassung`, `/gewerke`, `/gewerke/elektriker`, `/vergleich/plancraft-alternative`, `/blog/handwerkerrechnung-schreiben`, `/hilfe/mitarbeiter-einladen-lizenz-zuweisen`, `/hilfe/kategorie/einrichtung`, `/rechner/stundensatz`, `/preise`, `/impressum`, `/support`, `/app`. Seiten-Ebenen (5, 6, 7 Seitenteil, 10, 13 Thin) gelten nur für diese Stichprobe; Site-Ebenen (1, 2, 3, 4, 8, 9, 11, 12, Struktur) für die ganze Website.

### Scoreboard (Stand 23.10.2026, Quelle je Zahl)

| Ebene | Ergebnis | Bewertet / im Scope | Quelle |
|---|---|---|---|
| 1 Search Console | **nicht gemessen – kein Zugang** (indexiert, Top-Abfragen, Ø Position, manuelle Maßnahmen: alles inferred bzw. offen) | 0 / 156 | – |
| 2 Site Audit (Semrush ersetzt durch SE Ranking) | 97/100, 0 Fehler, 13 Warnungen, 11 Hinweise, 123 Prüfpunkte | 157 gecrawlt / 156 Sitemap | SE-Ranking-Audit 485185, `docs/seo/data/2026-10-23-audit-report-phase10.json` |
| 3 Wettbewerbsvergleich | KI-Share-of-Voice: CraftOS Rang 8 von 8 (0,02 %), Streit 41,63 % an der Spitze; Keywords/Traffic/verweisende Domains der Wettbewerber **nicht gemessen** (Units, D-27); Bewertungen **nicht gemessen** | 8 Marken | `docs/seo/reports/2026-10-23-raw-rollout-phase09-ai-leaderboard.json` (Leaderboard, Stand 23.10.2026) |
| 3 eigene Kennzahlen | 1 rankendes Keyword DE (Platz 51–100), Traffic 0, indexiert 62 (inferred), 12 verweisende Domains | Website | SE Ranking Domain-Overview und Audit, Messstand § 5.3–§ 5.4 |
| 4 Backlinks | 12 verweisende Domains, alle Spam (z. B. webboard.pl, sport-life.club, nettools.guru), Domain-InLink-Rank 3, Anker 12 × „craftos.eu“, verloren 0; Lücke zu Wettbewerbern **nicht gemessen** (Units) | Website | SE Ranking Backlinks, Messstand § 5.3 |
| 5 On-Page | fixable Ø 89 %, raw Ø 88 % (Stichprobe); mechanische Fehler siehe QA-06 | **14 von 156 (sampled)** | eigene Bewertung nach `references/on-page-seo.md`, Live-Abruf 23.10.2026 |
| 5 On-Page sitewide (Projektregeln) | `seo-audit.mjs`: 0 Verstöße in 12 Regeln | 156 von 156 | lokaler Build 23.10.2026 11:17 UTC |
| 6 Technik (Lighthouse, Labordaten, mobil) | Performance 96–97, LCP 2.574–2.743 ms; Accessibility/Best Practices/SEO 100/100/100 auf 6 Vorlagen, `/impressum` 96/100/100 | 8 URLs | Lighthouse 12.8.2, live, 23.10.2026, Performance Median aus 3 Läufen, übrige Kategorien 1 Lauf (10-RESEARCH „Messbefunde“) |
| 6 Core Web Vitals Feldwerte | **nicht gemessen** – kein Search-Console-Export, CrUX im SE-Ranking-Audit leer | – | Audit 485185 (`chromeux` mobil/desktop leer) |
| 7 GEO Papierteil | fixable Ø 71 % (31 sichtbare Prüfpunkte); Site-Ebene: robots.txt nennt nur OAI-SearchBot ausdrücklich, Bot-Abruf GPTBot/ClaudeBot/PerplexityBot je 200, `llms.txt` 200 (10.371 Byte) | **14 von 156 (sampled)** | eigene Bewertung nach `references/geo.md`, Live-Abruf |
| 7 GEO Live-Test | ersetzt durch den KI-Tracker von SE Ranking (siehe Basislinie unten) | 20 Prompts | Projekt 13094375 |
| 8 Index-Hygiene | Sitemap lokal = live = 156; `robots.txt` sperrt nur `/api/`; `/styleguide` noindex und nicht in der Sitemap; `site:`-Zählung **nicht gemessen** (keine Google-Suche von hier); Google-Index 62 von 156 laut SE Ranking (inferred) | Website | Live-Abruf, Build, Audit 485185 |
| 9 Framework-Fallen | 2 Befunde (Schrift-Preloads, 404 erbt Root-Canonical) | Website | Code-Lesung `app/layout.tsx`, Live-Abruf 404 |
| 10 Versteckte Inhalte | 0 Befunde: FAQ als `details` mit allen Antworten im HTML; Inhalte ohne JavaScript im HTML | 14 von 156 | Live-HTML |
| 11 Local/Business Profile | **übersprungen – SaaS ohne lokales Einzugsgebiet** | – | – |
| 12 Keyword-Realität | 6 Keywords in den Top 100, 2 in den Top 10 (beide Marke); „shk software“ Platz 29 mit `/gewerke/shk`; kein generisches Hauptkeyword rankt | 157 Projekt-Keywords | SE-Ranking-Projekt 13094375, Messstand § 5.1 |
| 13 Doorway | 0 Sets: `/gewerke/` 12 Seiten, `/vergleich/` 5, `/hilfe/` 63 – jeweils „PASS“ | 80 Geschwisterseiten | `check_page_similarity.py` live, 23.10.2026 |
| 13 Thin | Wortzahl gegen Top-3-Mittel **nicht gemessen** (kein SERP-Abruf) | – | – |
| Kannibalisierung | 0 Sets (inferred: rankende URLs = Zielseiten der Map; kein Hauptkeyword doppelt) | 157 Keywords | SE Ranking + `tests/keyword-map.test.ts` |
| Proof-Zählung | **nicht gemessen** – keine `context/proof/proof-inventory.md` im Projekt | – | – |
| Struktur | höchstens 3 Ordnerebenen (`/hilfe/kategorie/…`), Hubs für alle Spokes, Sitemap = Baum | 156 | Sitemap |

Lighthouse je Vorlage (Labordaten, mobil, live, Lighthouse 12.8.2, 23.10.2026):

| Vorlage | URL | Performance (3 Läufe, Median) | LCP Median | Accessibility / Best Practices / SEO (1 Lauf) |
|---|---|---|---|---|
| Start | `/` | 97 | 2.581 ms | 100 / 100 / 100 |
| Funktionsübersicht | `/funktionen` | 97 | 2.584 ms | nicht gemessen |
| Funktionsdetail | `/funktionen/zeiterfassung` | 96 | 2.743 ms | 100 / 100 / 100 |
| Gewerk | `/gewerke/elektriker` | 97 | 2.577 ms | 100 / 100 / 100 |
| Vergleich | `/vergleich/plancraft-alternative` | 97 | 2.574 ms | 100 / 100 / 100 |
| Ratgeber | `/blog/handwerkerrechnung-schreiben` | 96 | 2.723 ms | 100 / 100 / 100 |
| Rechner | `/rechner/stundensatz` | nicht gemessen | – | 100 / 100 / 100 |
| Rechtsseite | `/impressum` | nicht gemessen | – | 96 / 100 / 100 (`color-contrast`) |

### QA-06: Fehlerdefinition und Anwendung

**Definition (Antwort 8).** „Offener technischer Fehler“ = SE-Ranking-Audit-Fehler > 0, `seo-audit.mjs` sitewide > 0, `route-audit.mjs` Fehler oder defekte Links > 0, ein Lighthouse-Audit mit Gewicht in Accessibility, Best Practices oder SEO < 1 auf einer Vorlage, eine Ebene-9-Falle. „Offener On-Page-Fehler“ = mechanischer Prüfpunkt der Gruppen 1, 3, 6, 7, 9, 10 und 14 der 80-Punkte-Liste (Head-Tags, Überschriften-Tags, Alt-Text, interne Links, OG, Schema-Validität, Indexierbarkeit und technische Basis). **Kein Fehler im Sinne von QA-06:** Inhaltspunkte (Gruppen 5, 12 teilweise, 13), die der Skill an `/blog-post` bzw. `/service-page` verweist – sie stehen unter „What remains“. Gewaivte Punkte zählen nur im Rohwert. Offene Inhaberpunkte zählen nur im Rohwert, nicht im Wert der behebbaren Fehler. QA-06 darf markiert werden, wenn der Wert der behebbaren Fehler 0 ist (im Bestätigungsaudit nach 10-07).

**Anwendung (Vorab, 23.10.2026):**

| Nr. | Art | Befund | Zahl | Quelle |
|---|---|---|---|---|
| T1 | technisch | SE-Ranking-Audit-Fehler | 0 | Audit 485185 |
| T2 | technisch | `seo-audit.mjs` sitewide (12 Regeln) | 0 von 156 Seiten | lokaler Build 23.10.2026 |
| T3 | technisch | `route-audit.mjs`: 156 Routen, 0 Fehler, 0 defekte Links (159 Links, 14 Assets), 10 von 10 unbekannten Pfaden 404, 6 von 6 OG-Bildern 200 | 0 | `localhost:3105`, 23.10.2026 |
| T4 | technisch | Lighthouse Accessibility `/impressum` 96 (`color-contrast`, Link OS-Plattform 2,84 : 1) | 1 | Lighthouse 12.8.2 live |
| T5 | technisch | Ebene 9: alle sechs Schriftschnitte werden auf jeder Seite vorgeladen, Clash 500 wird nirgends genutzt, Clash 700 und General 500 nur im Logo | 1 | 10-RESEARCH „Tatsächlich genutzte Schriftschnitte“, `app/layout.tsx` |
| T6 | technisch | Ebene 9: die 404-Seite erbt den Root-Canonical `https://craftos.eu` und trägt zwei robots-Metas („noindex“ und „index, follow“) | 1 | Live-Abruf `/gibt-es-nicht-10-05` (Status 404), `app/layout.tsx` `alternates.canonical` |
| O1 | On-Page Gr. 14 | „Loads fast“: Labor-LCP 2.574–2.743 ms > 2.500 ms auf 6 von 6 gemessenen Vorlagen; die 8 übrigen Stichprobenseiten inferred (gleiche Schrift-Preloads) | 1 (sitewide Ursache) | Lighthouse 12.8.2 |
| O2 | On-Page Gr. 7 | `/impressum`: 1 interner Link im Hauptteil (Soll 3–5) | 1 | Live-HTML |
| O3 | On-Page Gr. 7 | `/impressum`: kein Link auf Funktions- oder Preisseiten im Hauptteil | 1 | Live-HTML |
| I1 | **Inhaberpunkt offen** | ODR-Link auf `/impressum` (`https://ec.europa.eu/consumers/odr`, 301; EU-Plattform am 20.07.2025 eingestellt) – SE-Ranking-Hinweis `extlinks3xx` | 1 | Audit 485185 |
| I2 | **Inhaberpunkt offen** | Title `/impressum` „Impressum \| CraftOS“ zu kurz (`title_short`, 19 Zeichen gerendert, SE Ranking zählt 18) – Rechtsseite, Titel bleibt bis zur Entscheidung | 1 | Audit 485185, Live-Abruf |

Gruppen 1, 3, 6, 9 und 10 der Stichprobe: 0 offene Fehler (gewaivt: Title unter 50 Zeichen auf 7 Stichprobenseiten, dekorative Symbole mit `alt=""` auf 2 Stichprobenseiten). SE-Ranking-Hinweis `same_title_h1` ist im Repo behoben (Punkt 1 der Checkliste), live nach 10-07.

**Rohwert: 8 · Wert der behebbaren Fehler: 6** (T4, T5, T6, O1, O2, O3) · davon Inhaberpunkt offen: 2 (I1, I2).

### Checkliste (Behebungsliste nach Dateibesitz, D-33)

### [x] 1. Title ungleich H1 auf `/hilfe/mitarbeiter-einladen-lizenz-zuweisen` · SE-Ranking-Hinweis `same_title_h1`
Erledigt 23.10.2026 im Repo: Title „Mitarbeiter einladen und Lizenz zuweisen | CraftOS“ (50) statt wörtlich der H1 (54); live mit dem Rollout 10-07. Regel: Title ≤ 60, Title ≠ H1, eindeutig.
**Who:** Paket e (10-05), `docs/seo/keyword-map.json`, `docs/seo/KEYWORD-MAP.md` § 6
**Time:** 10 Min.
**Changes:** ein Title in der Map. Kein Fließtext berührt.

### [ ] 2. LCP unter 2,5 s auf allen Gate-Vorlagen · 6 von 6 über der Grenze (O1)
Labor-LCP 2.574–2.743 ms; ohne Clash 500, Clash 700 und General 500 sinkt er live auf 2.277–2.441 ms (10-RESEARCH, je 2 Läufe). Regel D-11: Performance ≥ 95 und LCP < 2,5 s je Vorlage.
**Who:** Paket b (10-02), `app/layout.tsx`, `components/CraftOSLogo.tsx`
**Time:** laut Plan 10-02
**Changes:** Schrift-Preloads. Kein Fließtext berührt.

### [ ] 3. Nur genutzte Schriftschnitte vorladen · Ebene-9-Falle (T5)
Alle sechs Schnitte werden je Seite vorgeladen; Clash 500 wird nicht genutzt. Soll: nur Clash 600 und General 400/600 tragend vorladen, Logo-Schnitte ohne Preload oder ersetzt (10-UI-SPEC § 7).
**Who:** Paket b (10-02), `app/layout.tsx`
**Time:** mit Punkt 2
**Changes:** Schriftkonfiguration. Kein Fließtext berührt.

### [ ] 4. Kontrast der Rechtsseiten auf ≥ 4,5 : 1 · Accessibility `/impressum` 96 (T4)
Link OS-Plattform und `mailto`-Link 2,84 : 1, Hinweisabsätze `/datenschutz` und `/agb` 4,42 : 1. Soll: Lighthouse Accessibility 100 auf jeder Vorlage.
**Who:** Paket c (10-03), `components/legal/Legal.tsx` und Rechtsseiten-Stile
**Time:** laut Plan 10-03
**Changes:** Farbklassen. Kein Fließtext berührt.

### [ ] 5. Interne Links im Hauptteil von `/impressum` · 1 statt 3–5, kein Link auf Funktionen oder Preise (O2, O3)
Soll: mindestens 3 interne Links im `<main>` über Bausteine der v2-Umstellung (Brotkrumen im ContentKopf, Abschluss-CTA), der Rechtstext selbst bleibt unverändert.
**Who:** Paket c (10-03) bzw. 10-06, `app/impressum/page.tsx`, `components/legal/Legal.tsx`
**Time:** mit der Rechtsseiten-Umstellung
**Changes:** Layout-Bausteine. Kein Fließtext berührt.

### [ ] 6. 404-Seite ohne geerbten Canonical und mit genau einem robots-Meta (T6)
Die 404 rendert `canonical` auf die Startseite und „noindex“ neben „index, follow“. Soll: kein Canonical (oder eigener) und nur „noindex“; Root-Layout-Canonical nicht mehr an Seiten ohne eigene Metadaten vererben.
**Who:** 10-06 (dateiübergreifend: `app/not-found.tsx` Paket c, `app/layout.tsx` Paket b)
**Time:** 20 Min.
**Changes:** Metadaten. Kein Fließtext berührt.

### [ ] 7. KI-Crawler in `robots.txt` ausdrücklich erlauben · GEO 1.1 (kein QA-06-Fehler)
Heute nennt `robots.txt` nur OAI-SearchBot; GPTBot, ClaudeBot, PerplexityBot und Google-Extended sind nur über `*` erlaubt (Abruf mit diesen User-Agents: 200). Soll laut Projekt-CLAUDE.md: je Bot `Allow: /`, `Disallow: /api/`.
**Who:** 10-06, `app/robots.ts`
**Time:** 10 Min.
**Changes:** robots-Regeln. Kein Fließtext berührt.

### [ ] 8. ODR-Link und kurzer Title auf `/impressum` · Inhaberpunkt offen (I1, I2)
Die EU-Plattform zur Online-Streitbeilegung ist seit 20.07.2025 eingestellt; der Link antwortet mit 301. Der Title „Impressum | CraftOS“ ist für SE Ranking zu kurz. Beides ist Rechtstext bzw. Rechtsseite und wird nur nach Entscheidung des Inhabers geändert.
**Who:** Inhaber, Entscheidung; Umsetzung danach 10-06 (Text) bzw. Paket e (Title in der Map)
**Time:** 2 Min. Entscheidung
**Changes:** keine ohne Freigabe.

### Waived (23.10.2026)

| Typ | Punkt | Begründung | Beleg |
|---|---|---|---|
| Crawler artifact | 13 × „Alt-Text fehlt“ (`/gewerke` und 12 Gewerkseiten) | Das Gewerk-Symbol `/icons/gewerke/<gewerk>.svg` ist dekorativ neben der Überschrift; `alt=""` ist nach WCAG richtig. Es wird kein Alt-Text ergänzt (D-38). | Audit 485185 `image_no_alt` (13 URLs); Live-HTML: `alt=""`, Breite und Höhe gesetzt |
| Crawler artifact | „JavaScript nicht komprimiert“ (20.10.: 18 Hinweise, 23.10.: 0) | Vercel liefert Brotli, sobald der Client es anbietet; ohne `Accept-Encoding` kommt die Datei unkomprimiert. | `curl -sI -H "Accept-Encoding: br, gzip" https://craftos.eu/_next/static/immutable/chunks/0h18ic--luabl.js` → `Content-Encoding: br`; ohne Header `Content-Length: 5598`, kein `Content-Encoding` (23.10.2026, 11:12 UTC) |
| Owner decision | 8 Seiten mit externen nofollow-Links (`/gobd`, `/vergleich`, `/preise`, vier Alternativen-Seiten, `/vergleich/handwerkersoftware-kleine-betriebe`) | Wettbewerber- und Quellenlinks sind bewusst `rel="nofollow"` | 08-UI-SPEC G3/G4 (genehmigt), `components/v2/ComparisonTable.tsx`; Audit 485185 `extlinks_nofollow` |
| Owner decision | Skill-Schwellen Title 50–60 / Description 140–160: 83 von 156 Map-Titeln unter 50, 13 Descriptions unter 140 (Stichprobe: 7 Titel) | Projektregel aus Phase 8: Title ≤ 60, Description 120–155 | `tests/keyword-map.test.ts` („gerenderter Title ≤ 60 …, Description 120–155“) |
| Owner decision | `/funktionen` und `/gewerke` ohne Wort des Hauptkeywords im Slug | In diesem Meilenstein entfällt kein Slug; eine Änderung bräuchte 301 und Freigabe | 10-CONTEXT D-01 („Keine neue Seite, keine neue URL, kein entfallender Slug“) |

### Kopierbericht

geänderte Fließtextsätze: 0 – geändert wurde nur ein Title in `docs/seo/keyword-map.json`; H1, Description und Artikeltext sind unverändert. Gelöschte Elemente: 0.

### Needs your approval to remove

Nichts davon ist angefasst; jede Zeile wartet auf ein ausdrückliches Ja des Inhabers.

- Recommend removing: `components/ui/PageHero.tsx` · heute nur noch von `/support` genutzt, nach der Support-Umstellung in Paket c ungenutzt · Kosten des Behaltens: toter Code, Verwechslungsgefahr mit `ContentKopf` · nach Entfernen kein Redirect nötig (keine URL).
- Recommend removing: Altklassen `section-space`, `section-intro`, `btn-secondary`, `soft-panel`, `split-section` in `app/globals.css` · nach Paket c nur noch `TrialCta.tsx` (`section-space`) bzw. gar nicht genutzt · Kosten: ungenutztes CSS in jedem Seitenaufruf (Lighthouse `unused-css-rules` ≈ 14 KiB) · kein Redirect.
- Recommend removing: `components/product-demo/**` (5 Dateien) mit `lib/demo/**` (2 Dateien) und dem zugehörigen Block in `app/globals.css` · nicht mehr eingebunden · Kosten: Wartung, Testlaufzeit · kein Redirect.
- Recommend removing: Schriftdateien Clash Display 500 und 700, General Sans 500 (`public/fonts/clash-display-500.woff2`, `clash-display-700.woff2`, `general-sans-500.woff2`) · sofern nach Paket b ungenutzt · Kosten: 3 Preloads je Seite, sofern noch eingebunden · kein Redirect.

### What remains (Inhalt und Strategie, nach Ranking-Wirkung)

1. **Autorität ist der Engpass, nicht die Technik.** 12 verweisende Domains, alle Spam, Domain-InLink-Rank 3; kein generisches Hauptkeyword rankt. Weg: Linkplan (`docs/seo/LINKPLAN.md`, Übergabe 2 in 10-11) – Inhaberaufgabe, nicht dieser Loop.
2. **Inhaltspunkte gegen die Top 3** (Gruppen 3.2, 5.1–5.2, 12.5; GEO 5.1) auf 11 Inhaltsvorlagen nicht gemessen und an Inhaltsarbeit verwiesen (`/blog-post`, `/service-page`).
3. **Antwortblock unter Frage-H2** fehlt auf 5 Vorlagen (Start, Funktionsübersicht, Funktionsdetail, Rechner, App) – Inhaltsarbeit.
4. **Erfahrungsbelege und Autorenschaft** (Gruppen 13.1, 13.4, 12.6; Person-Schema mit Autorenseite für Ratgeber und Hilfe) – Inhaber und Inhaltsarbeit.
5. **Originalfotos/Screenshots** auf Ratgeber, Hilfe, Vergleich, Rechner, Preise – Inhaltsarbeit.
6. **Markenname im Fließtext** der Hilfe-Kategorieseiten (GEO 5.2) – Inhaltsarbeit.

Deine nächsten 3 Schritte: (1) Punkte 2 bis 6 der Checkliste über die Pakete b, c und 10-06 schließen; (2) Inhaberpunkt 8 entscheiden; (3) nach dem Rollout 10-07 Recheck des SE-Ranking-Audits 485185 und Bestätigungsaudit (D-25, D-26).

### KI-Oberflächen-Basislinie (23.10.2026)

Ersatz für den manuellen Live-Test: KI-Tracker des SE-Ranking-Projekts 13094375 (Prompt-Gruppe 94132), Auswertung 20.–23.10.2026 (`docs/seo/data/2026-10-23-ki-prompts-phase10.json`, `…-projekt-messstand-phase10.json`).

| Oberfläche | Prompts | geprüft | CraftOS genannt (23.10.) | Quelle craftos.eu | Stand |
|---|---|---|---|---|---|
| ChatGPT | 16 | 16 | 1 von 16 („Was ist CraftOS?“, Position 1) | 1 | Nennung 6,25 %, Link 6,25 % |
| Google AI Overview | 2 | 2 | 0 von 2 | 0 | letzte Prüfung 23.10.2026 |
| Perplexity | 2 | 0 | – | – | nie geprüft; kein Prüfauslöser in der API, Einstellung wie ChatGPT (`docs/seo/data/2026-10-23-ki-tracker-abgleich-phase10.json`) |
| Gemini | 0 | – | – | – | Prompts abgelehnt: Promptlimit des Testzugangs (HTTP 403) |
| Google AI Mode | 0 | – | – | – | Prompts abgelehnt: Promptlimit des Testzugangs (HTTP 403) |

Meistgenannte Wettbewerber in den Antworten (20.–23.10.): plancraft, ToolTime, HERO Software, Das Programm, openHandwerk. KI-Leaderboard (Data API, 5 Engines): CraftOS Rang 8 von 8, Share of Voice 0,02 %, Stand 23.10.2026 (monatliche Daten).

### What this audit did NOT measure (23.10.2026)

- **inferred – Search Console:** nicht gemessen – kein Zugang. Indexierte Seiten (62 laut SE Ranking), Positionen und Kannibalisierung sind abgeleitet. Schließt: die vier Search-Console-Exporte (Leistung, Seiten, Core Web Vitals, manuelle Maßnahmen), etwa 2 Minuten.
- **Skipped – Core Web Vitals Feldwerte:** nicht gemessen – kein Export, CrUX leer. Schließt: Search-Console-Export Core Web Vitals.
- **Skipped – Semrush:** nicht verbunden; SE Ranking ersetzt es (Quelle je Zahl).
- **Skipped – Local und Business Profile:** übersprungen – SaaS ohne lokales Einzugsgebiet.
- **Sampled – On-Page und GEO-Papierteil:** 14 von 156 Seiten, eine je Vorlage. Schließt: Stichprobe erweitern (Fehlerursachen liegen auf Vorlagenebene).
- **Skipped – Top-3-Vergleiche** (Länge, Unterthemen, Entitäten, Thin-Prüfung): kein SERP-Abruf, um Units zu sparen. Schließt: SERP-Abruf je Geld-Keyword.
- **Skipped – Wettbewerberzahlen** (Keywords, Traffic, verweisende Domains, Backlink-Lücke): Units (D-27). Schließt: Data-API-Abrufe (≈ 100 Units je Domain).
- **Skipped – Bewertungen:** keine Bewertungsplattform verbunden.
- **Skipped – Proof-Zählung:** keine `proof-inventory.md`. Schließt: Proof-Inventar des Inhabers.
- **Inferred – `site:`-Zählung:** keine Google-Suche von hier. Schließt: `site:craftos.eu` im Browser bzw. Search-Console-Export Seiten.
- **Sampled – Lighthouse:** Accessibility/Best Practices/SEO je 1 Lauf, `/funktionen` ohne diese Kategorien, `/rechner/stundensatz` und `/impressum` ohne Performance. Schließt: Werkzeug aus Paket b (Lighthouse 13.5.0) im Bestätigungsaudit.
