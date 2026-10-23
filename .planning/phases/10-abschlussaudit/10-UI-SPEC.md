---
phase: 10
slug: abschlussaudit
status: approved
reviewed_at: 2026-10-23
shadcn_initialized: false
preset: none
created: 2026-10-23
---

# Phase 10 – UI-Designvertrag: Abschlussaudit (DESIGN-02-Rest, Feinschliff, Barrierefreiheit)

> Dies ist ein schlanker Vertrag für D-15 bis D-19 (Rechner, `/support`, Rechtsseiten, 404 und den Feinschliff) sowie für die gestalterischen Teile aus D-09, D-10 und D-21, für das Logo als SVG (Performance-Hebel aus [R]) und für die Prüfkriterien von DESIGN-05 und QA-04. Erstellt hat ihn der gsd-ui-researcher am 23.10.2026 ohne Rückfragen, weil der Inhaber nicht erreichbar ist und laut Freigabe „Mach, wie du es richtig findest“ gilt. Die Prüfung übernimmt der gsd-ui-checker.

**Stand nach Checker (23.10.2026):** Der gsd-ui-checker hat den Vertrag freigegeben (APPROVED, keine BLOCK-Dimension). Seine Korrekturen K1 bis K13 sind mit den Entscheidungen des Koordinators eingearbeitet; die Fundstellen stehen in § „Korrekturen nach Checker“ am Ende.

**Grundsatz:** Die genehmigten Verträge **[05]** bis **[09]** gelten **unverändert**. Das betrifft Gestaltungsrichtung, Tokens, die Typoskala (vier Größen, zwei Gewichte, H1 unter 400 px mit 28 px), Farben, die Amber-Liste, den Fokusring, die Abstände einschließlich der 96-px-Ausnahme, die Bausteinverträge, die Brotkrumen ([08] § 1), die Antwort-zuerst-Regel ([08] § 2), die Anker-Konvention (`DESIGN-V2.md` § 17.1), `ContentKopf` (G8), `LinkKarten` (G9) und die Leitlinie L-1 ([09] § 5). Dieser Vertrag legt nur Phase-10-Spezifisches fest. Jede Abweichung steht in § „Abweichungen“ (J1 bis J12).

**Quellenkennzeichnung:** [D-xx] = `10-CONTEXT.md` einschließlich des Nachtrags D-37 bis D-39 (verbindlich). [R] = `10-RESEARCH.md`. [05] bis [09] = genehmigte Verträge. [BESTAND] = Code auf `main` (`9e3eb39`). [REL] = Web-Release `origin/release` `bfe165e9`, nur lesend. [KASKADE] = Design-Kaskade. [ERMESSEN] = Entscheidung ohne Inhaberrückfrage (Liste A1 bis A12 am Ende).

**Mess- und Zählnachweis (23.10.2026):**
- **Texte:** 28 feste Texte dieses Vertrags sind per Node gezählt (`Array.from(s).length`, Satztrennung wie `sentenceCount` in `components/v2/budgets.ts`). Alle liegen im Budget, die Werte stehen in § 10. Nach dem Checker sind drei Texte neu gezählt: 404-Karte „Funktionen“ 86 (K7), Kassenbuch-Nutzensatz 96 (K8) und die Rechner-Notiz über dem CTA-Band 94 (K6).
- **FAQ der Rechner:** Die acht FAQ-Einträge beider Rechner sind gegen das Budget von `FaqList` gezählt: Frage 31 bis 53 Zeichen mit „?“, Antwort 163 bis 264, erster Satz 38 bis 108. Alle passen ohne Textänderung.
- **Kontraste:** Alle Kontrastwerte sind mit der WCAG-Formel nachgerechnet.
- **Map-H1:** Die H1 stammen aus `docs/seo/keyword-map.json`: `/rechner` 61, `/rechner/stundensatz` 59, `/rechner/angebotskalkulation` 56, `/support` 39, `/impressum` 9, `/datenschutz` 20 und `/agb` 31 Zeichen.
- **Release-Belege:** Für D-21 sind gelesen: das Schalterlabel „Globale Finanzbereiche“ (`src/components/team/NewTeamMemberDialog.tsx` Z. 203), die Rollenbeschreibung „Büro-Leitung: … globale Finanzen“ (`src/lib/subscription/roles.ts` Z. 92) und `canSeeFinance` (`src/hooks/useLicense.ts`). Der Checker hat ergänzt: „täglich … mit laufendem Bestand“ steht wörtlich in `src/pages/Kassenbuch.tsx` Z. 45 und Z. 113.

---

## Design-Kaskade (Projekt-CLAUDE.md, laut D-20 einmal für die ganze Phase)

### 1. frontend-design (Leitlinie gelesen, nicht kopiert)

Gelesen wurde `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/af59ee3a1051/skills/frontend-design/SKILL.md`. Alle sieben Cache-Stände haben den MD5-Wert `7d6df6b2e98e38f8b86046325dc6afd0` und sind damit identisch mit dem Stand, der für [05] bis [09] gelesen wurde.

| Leitlinie | Anwendung in Phase 10 |
|---|---|
| „Treat failure and emptiness as moments for direction, not mood“ | Die 404-Seite benennt die Lage in einem Satz und bietet drei Einstiege als Karten. Es gibt keine Entschuldigung und keinen Witz. |
| „Meta strings joined with middle dots“ | Die 404-Augenbraue „404 · Seite nicht gefunden“ wird zu „Seite nicht gefunden“. Mittelpunkte in Rechtstexten bleiben unangetastet (Wortlaut). |
| „Spend your boldness in one place“ | Rechner: Das einzige kräftige Element ist der Ergebnisbetrag in Display-Größe. Rechtsseiten, `/support` und 404 bleiben bewusst ruhig. |
| „Visual structure is information“ | Kartenränder und Flächen zeigen Ebenen (Formular und Ergebnis). Amber-Kanten an Formelkästen entfallen, weil sie nur dekorieren. |
| „Build to a quality floor … visible keyboard focus, reduced motion respected, visually accessible“ | Siehe § 9 und § 11: Fokus über `:focus-within`, Tastaturprüfung, `target-size`, Kontrast ≥ 4,5 : 1 auch bei laufender Animation (D-10). |
| „Line lengths of less than 80 characters“ | Rechtsprosa und Rechnerhilfe höchstens 720 px bzw. 68ch, Lead höchstens 60ch, Kartentext höchstens 45ch. |

### 2. ui-ux-pro-max (ausgeführt am 23.10.2026, lokal)

```
py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas legal pages calculator support 404 accessibility" --domain ux
# ergänzend:
py -3.12 -X utf8 .../search.py "404 error page navigation recovery" --domain ux
py -3.12 -X utf8 .../search.py "form input label focus number" --domain ux
py -3.12 -X utf8 .../search.py "touch target size focus visible keyboard" --domain ux
```

| Treffer | Übernommen? | Umsetzung |
|---|---|---|
| Error Recovery (Medium): „Provide clear next steps“ | Ja | 404 mit drei Linkkarten (§ 4). |
| Error Messages (High): „Use aria-live or role=alert“ | Ja, Bestand | Die Rechner haben Feldfehler mit `aria-invalid` und `aria-describedby` sowie Ergebnisbereiche mit `role="status"` und `aria-live="polite"` [BESTAND]. Das bleibt unverändert, Fehler sind nie nur farbig markiert. |
| Input Labels (High): Label über dem Feld | Ja, Bestand | Die Beschriftungen bleiben wörtlich (D-15) und stehen über dem Feld, 8 px Abstand. |
| Input Types (Medium) | Ja, Bestand | `inputMode="decimal"` bleibt [BESTAND]. |
| Autofill Support (Medium): kein `autocomplete="off"` überall | Bewusst nicht | Rechnerfelder sind Kalkulationswerte ohne passende Autofill-Kategorie; `autoComplete="off"` bleibt nur dort [BESTAND]. |
| Alt Text (High) | Ja | Es gibt keine neuen Bilder. Icons sind dekorativ (`aria-hidden`), der Logo-Schriftzug ist `aria-hidden`, weil der Link seinen Namen per `aria-label` trägt (§ 7). |
| Focus States, Keyboard Navigation, Touch Target Size (High) | Ja | Siehe § 9 und § 11. |
| Active State (Medium) | Ja | Die Rechnernavigation markiert den aktiven Rechner mit Fläche, Rahmen und `aria-current="page"`. |

### 3. 21st.dev

**Nicht verfügbar.** `21st_magic_component_inspiration` steht in dieser Sitzung nicht als Werkzeug bereit; es wurde nichts abgerufen oder behauptet. Falls das Werkzeug bei der Umsetzung verfügbar ist, nutzt der Executor nur `21st_magic_component_inspiration` mit „404 page“, „support contact cards“ und „calculator form“, nie `_builder` oder `_refiner`, und vermerkt das Ergebnis in `DESIGN-V2.md` § 19.

### 4. Context7

**Nicht verfügbar** (in dieser Sitzung kein aufrufbares Werkzeug). Ersatz wie in [06] bis [09] ist `craftos/node_modules/next/dist/docs`. Belegt sind dort zwei Punkte. Erstens setzt Next bei 404 automatisch `<meta name="robots" content="noindex">` (`01-app/03-api-reference/03-file-conventions/not-found.md` Z. 187). Zweitens gilt `preload` je `localFont()`-Aufruf, Standard `true` (`02-components/font.md` Z. 184 f.). Eine offene API-Frage gibt es nicht. Alle Seiten sind Server Components, die einzigen Client-Inseln bleiben die beiden Rechner [BESTAND].

### 5. SEO-Check

Siehe § 11: Metadaten unverändert über `metaFor`, Brotkrumen bis auf 404, Schema unverändert, Überschriftenfolge ohne Sprung, Status 404 mit `noindex`.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none – eigenes Token-System `craftos/app/globals.css` und CSS-Module [05]–[09] |
| Preset | not applicable |
| Component library | none – v2-Bausteine `craftos/components/v2/*` und `components/content/ContentKopf` (React Server Components) |
| Icon library | `lucide-react` 0.475.0 [BESTAND]; geprüft vorhanden: `House`, `LayoutGrid`, `BookOpen`, `Newspaper`, `Mail`, `LockKeyhole`, `Clock3`, `Calculator`, `Wallet`, `ReceiptText` |
| Font | Clash Display 600 (H1, H2, h3-Titel) und General Sans 400/600 (Text, Labels) über `next/font/local` [05]. Nach § 7 werden nur noch diese drei Schnitte geladen. |

**Wiederverwendet ohne Änderung:** `Breadcrumbs`/`crumbsFor`, `SectionHeader`, `Abschnitt`, `LinkKarten` (mit `iconFeld`, `meta`), `FaqList`, `CtaBand`, `FeatureList`, `BentoTile` (Daten), `PlatformBadges`.

**Ergänzungen (nur diese zwei, Lücke jeweils belegt):**

| # | Baustein | Änderung | Belegte Lücke |
|---|---|---|---|
| K1 | `ContentKopf` (`components/content/ContentKopf.tsx` + `.module.css`) | `crumbs: Crumb[] \| null`. `null` ist nur auf der 404-Seite erlaubt (Test, § 11). Nur bei `null` setzt der Kopf `data-crumbs="ohne"` an der `section` und lässt den Brotkrumen-Container weg. Die CSS-Regel für oben 48 / 64 / 64 px (< 768 / 768–1023 / ≥ 1024, gleich dem unteren Abstand) gilt **nur** für `.kopf[data-crumbs="ohne"]`; die allgemeine Regel `.kopf` bleibt unverändert. | D-18 verlangt einen Kopf ohne Brotkrumen. `SectionHeader` erlaubt nur einen Lead-Satz, die 404-Einleitung hat zwei Sätze ([R] Open Question 7). |
| K2 | `ContentKopf` | Neue optionale Prop `hinweis?: { text: string; icon: LucideIcon }` mit Text ≤ 80 Zeichen (lokale Konstante `HINWEIS_MAX = 80` in `ContentKopf.tsx`, weil `budgets.ts` in Welle 1 Paket (a) gehört; die Übernahme nach `budgets.ts` ist ein Übergabepunkt an 10-06). **Reihenfolge im Kopf:** Eyebrow → H1 → Antwort bzw. Lead → **Hinweis** → `meta` → `stand` → `platforms`. Darstellung: `<p data-hinweis>`, 16 px unter Lead bzw. Antwort, `display: flex; gap: 8px; align-items: flex-start`, Icon 16 px `#62626E` mit `aria-hidden`, Text 14/400/1.4 `#62626E` (5,43 : 1 auf `#F7F3EB`). Fehlertext: „ContentKopf: hinweis hat {n} von 80 Zeichen – Satz kürzen.“ | Das Rechnerversprechen „Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.“ [BESTAND] braucht einen Platz im Kopf. `meta` ist als „Angaben zum Artikel“ benannt, `stand` als Stand-Zeile. |

**Keine Folgen für die Phase-9-Seiten (K3):** `ContentKopf` wird auf rund 90 Ratgeber-, Hilfe-, Übersichts- und Kategorieseiten gerendert. Ohne `crumbs={null}` und ohne `hinweis` muss sein Markup **Byte für Byte** gleich bleiben. Paket (c) legt dafür vor der ersten Änderung am Kopf einen Vergleichstest an (`tests/contentkopf-unveraendert.test.ts`):
- Er rendert per `renderToStaticMarkup` drei Phase-9-Seiten: eine Artikelseite (`/hilfe/rechnung-fertigstellen`), eine Übersicht (`/blog`) und eine Kategorieseite (`/hilfe/kategorie/rechnungen`).
- Er nimmt jeweils die `section[data-abschnitt="kopf"]` und vergleicht sie per `fs.readFileSync` und `toBe` mit Referenzdateien unter `tests/fixtures/contentkopf/`, die auf dem unveränderten Stand von `main` erzeugt sind. Fehlt eine Referenz, ist der Test rot; Snapshot-APIs sind verboten (wie § 3.3).
- Das CSS-Modul ist gedeckt, weil die Regeln für K1 und K2 nur an `[data-crumbs="ohne"]` bzw. `[data-hinweis]` hängen; das prüft ein Grep-Fall im selben Test (keine geänderte Deklaration in `.kopf`, `.crumbs`, `.inner`, `.title`, `.answer`, `.lead`, `.meta`, `.stand`, `.platforms` gegenüber `main`).

**Besitzergänzung zu D-33 (mit K2):**
- `components/content/ContentKopf.{tsx,module.css}` gehört in Welle 1 zu Paket (c). Kein anderes Paket ändert die Dateien.
- Die übrigen Dateien unter `components/content/**` (z. B. `ContentSearch`, `ArticlePage`, `ContentIndex`) gehören zu Paket (a), Änderungen daran nur per Übergabe.
- `components/CraftOSLogo.tsx` gehört zu Paket (b), wie in [R] Open Question 1 empfohlen.
- Die neuen Routen in `scripts/visual-audit.mjs` (Rechner, `/support`, Rechtsseiten, 404) trägt Paket (a) ein; Paket (c) übergibt die Liste in seiner Übergabeliste.

---

## Abweichungen zu [05]–[09] (ausdrücklich gekennzeichnet und begründet)

| # | Stelle | [05]–[09] sagt | Phase 10 legt fest | Begründung |
|---|---|---|---|---|
| J1 | [09] G8 | Brotkrumen sind im `ContentKopf` Pflicht | `crumbs={null}` nur in `app/not-found.tsx` (K1) | D-18. Die 404-Seite ist nicht indexiert und hat keinen Ort in der Seitenhierarchie. [08] § 1 verlangt Brotkrumen auf indexierten Seiten. |
| J2 | [09] G8 | Kopf ohne zusätzliche Zeile | `hinweis` (K2) nur auf den drei Rechnerseiten | Das Versprechen zur lokalen Berechnung ist ein Kaufargument der Rechner [BESTAND] und gehört über den Rechner. |
| J3 | [05] § 2 BentoGrid | Text folgt direkt dem Visual | Ab 768 px sitzt der Textblock von `sm`- und `md`-Kacheln ohne Phone am Kachelboden (`.body { margin-top: auto }`), § 6.1 | D-19 (1): Bei 1024 px entstanden bis zu 122 px Leerraum unter dem Text der md-Kacheln (07 deferred 1). Bodenausrichtung entspricht dem bestehenden Muster der lg-Browserkacheln („Text sitzt am Kachelboden“, 06-04/06-05). Das dreispaltige Raster wurde verworfen, weil die 4er-Kompositionen `md·sm·sm` auf 22 Detailseiten zwischen 1024 und 1279 px Lücken von zwei Spalten erzeugen würden. |
| J4 | [05] § 7 ComparisonTable | `<caption>` sichtbar im Tabellenrahmen | Sichtbare Überschrift als `<p data-caption aria-hidden="true">` über dem Scrollbereich. `<caption class="sr-only">` bleibt in der Tabelle, und `aria-label` des Scrollbereichs bleibt gleich der Caption (§ 6.2). | D-19 (2): Bei 360 px war die Caption im 520 px breiten Scrollbereich angeschnitten. Die Tests prüfen das `<caption>`-Element mit Text (`design-v2-frames.test.ts` Z. 128, `preise-seite.test.ts` Z. 406, `browser-functional.pw.cjs` Z. 167), deshalb bleibt es erhalten. |
| J5 | Bestand `LegalShell` | H1 extrafett, H2 20 px fett, Text 15 px `ink-700`, zentrierte Spalte 768 px | v2-Rechtsprosa: H1 im `ContentKopf`, H2 32/600 Clash (wie Prosa-H2 [09] H6), Text 16/400/1.5 `#17171C`, Spalte max. 720 px linksbündig im `site-container` (§ 3) | D-17. Gewichte nur 400/600. Damit braucht keine sichtbare Schrift mehr Clash 700/800 (Voraussetzung für § 7). |
| J6 | [05] „jeder Abschnitt = SectionHeader + ein Baustein“ | Lead-Satz Pflicht | Rechner-Hilfeabschnitte (`CalculatorHelp`) behalten ihre Struktur: H2 im Display-Stil und danach der Bestandsinhalt (Absätze, Formelkasten, Vergleich, `FaqList`), ohne eigenen Lead | Hilfeabschnitte ohne einleitenden Satz (z. B. „Welche Kosten und Stunden gehören hinein?“ beginnt direkt mit FAQ). Ein Lead-Satz wäre neuer Text, und D-04 schließt Umschreiben aus. |
| J7 | Bestand `/rechner` | Werkzeugkarten (H2) vor der Hilfe | Erst `SectionHeader` „Welcher Rechner ist der richtige Einstieg?“ mit dem ersten Hilfeabsatz als Antwort, darunter die Karten (H3), dann der zweite Hilfeabsatz als Notiz (§ 1.2) | Es gibt so keinen neuen Text, die Antwort steht zuerst, und es entsteht keine H2 in Kartengröße. Der Wechsel von H2 zu H3 ist eine mechanische Tag-Korrektur (D-04). |
| J8 | Bestand Rechner-CTA | Aside „Von der Kalkulation zum Angebot.“ mit Satz von 94 Zeichen | `CtaBand` mit demselben Titel, Standardsatz „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ und Sekundärlink „Angebotsfunktionen ansehen“. Der Bestandssatz „Lernen Sie die Angebotsfunktionen von CraftOS kennen und bringen Sie Ihre Aufträge ins System.“ bleibt wörtlich als **Notiz direkt über dem CTA-Band** erhalten (§ 1.2); es wird nichts entfernt (K6). | D-15 verlangt `CtaBand`, dessen Text auf 80 Zeichen begrenzt ist. Titel und Ziel bleiben, der Satz passt nicht ins Budget und steht deshalb davor [ERMESSEN A5]. |
| J9 | [09] `LinkKarten` (Listen gleichrangiger Ziele) | 1–60 Karten | `/support`-Abschnitt „Kontakt“ mit genau einer Karte (E-Mail), `columns={2}` | Die zwei bestehenden H2 von `/support` bleiben als zwei Abschnitte erhalten (D-04). Eine Kontaktkarte links ist gewollt, ein Platzhalter daneben gibt es nicht. |
| J10 | [05] Seitenende | CTA-Band als letzter Abschnitt | 404 ohne `CtaBand` | Auf der Fehlerseite ist die Orientierung die Hauptaufgabe. Ein Test-CTA würde mit den drei Einstiegen konkurrieren. |
| J11 | [05] Typography „Clash 500/700, General 500 nicht verwendet“ | geladen, aber ungenutzt | Logo-Schriftzug als SVG-Pfade (Grafik, kein Text), bei unklarer Schriftlizenz stattdessen als Webfont-Subset nur mit den Glyphen des Schriftzugs (§ 7.1). Clash 500, Clash 700 und General 500 werden nicht mehr vollständig geladen (§ 7) | Performance-Hebel aus [R] (LCP). Das sichtbare Ergebnis bleibt identisch, die Prüfung erfolgt per Screenshot-Vergleich. |
| J12 | [05] Color „Destructive in Phase 5 nicht verwendet“ | – | `#B32F28` ist Farbe der Feldfehler und des Verlust-Hinweises im Rechner (statt Bestand `#A12525`) | Fehler brauchen einen Farbton aus dem Token-System; Kontrast 6,26 : 1 auf Weiß und 5,66 : 1 auf `#F7F3EB`. Fehler stehen immer zusätzlich als Text. |

---

## Spacing Scale

Unverändert aus [05]–[09], alle Werte sind Vielfache von 4:

| Token | Value | Usage in Phase 10 |
|-------|-------|-------|
| xs | 4px | Zeilenabstand der Kartenmeta bei Umbruch |
| sm | 8px | Label → Feld, Feld → Hinweis/Fehler, Icon → Hinweistext im Kopf, Lücke der Rechnernavigation, Caption → Wischhinweis |
| md | 16px | Absatzabstand der Rechts- und Hilfeprosa, H2 → erster Absatz, Feldabstand, Lead → Hinweis im Kopf, Kasteninnenabstand < 768 px, Panelinnenabstand < 768 px, Lücke Formular/Ergebnis < 768 px, Caption → Tabelle |
| lg | 24px | Panelinnenabstand 768–1023 px, Abstand zwischen Fieldsets (mit 1-px-Linie), Rechnernavigation → Rechner, Kasteninnenabstand ≥ 768 px (seitlich) |
| xl | 32px | Panelinnenabstand ≥ 1024 px, Lücke Formular/Ergebnis ≥ 1024 px, Abschnittskopf → Inhalt < 768 px |
| 2xl | 48px | H2-Abstand oben in der Rechtsprosa, Abschnittsabstand < 768 px, Abschnittskopf → Inhalt ≥ 768 px, Kopf oben/unten < 768 px (404) |
| 3xl | 64px | Kopf unten ≥ 768 px, Abschnittsabstand 768–1023 px |

Ausnahmen bleiben unverändert aus [05]–[09]: 96 px Abschnittsabstand ab 1024 px (`--spacing-section`), Touch-Ziele ≥ 44 × 44 px, Header 74/84 px, 18-px-Containerrand unter 768 px, 12 px nur in `.v2-btn-cta`, in der Mini-UI und als Icon-Feld-Radius. **Es gibt keine neuen Ausnahmen.** In `Calculators.module.css` werden alle `rem`- und `clamp`-Abstände auf diese Skala gerundet (§ 1.3).

---

## Typography

Unverändert aus [05]–[09]: vier Größen (14/16/20/Display) und zwei Gewichte (400/600).

| Role | Size | Weight | Line Height | Einsatz in Phase 10 |
|------|------|--------|-------------|-------------------|
| Label | 14px | 400 / 600 | 1.4 | 400: Brotkrumen, Hinweis im Kopf, Feldhinweis, Einheit, Rechenweg, Quellenhinweis, Hinweisabsätze der Rechtsseiten, Kartenmeta, Wischhinweis. 600: Eyebrow, Feldlabel, Feldfehler, Kartenlabel |
| Body | 16px | 400 / 600 | 1.5 | 400: Rechtsprosa, Hilfeprosa, Eingabewerte, Ergebniszeilen (`dt`), Kartentext, FAQ-Antwort. 600: Legenden, Ergebniswerte (`dd`), Links in der Rechtsprosa, Rechnernavigation, Buttons, `summary`, erste Zeile im Datenblock |
| Heading | 20px | 600 (Clash) / 400 (General Sans) | 1.25 / 1.4 | 600: Kartentitel (h3), Panel-Titel der Rechner („Ihr Betrieb in Zahlen“, „Ihre Kalkulation“), H3 im Vergleich Marge/Aufschlag, sichtbare Tabellen-Caption. 400: Lead im Kopf und Antwort-Lead ab 768 px |
| Display | `clamp(32px, 4vw, 48px)`, 32 px < 768 px, **H1 < 400 px: 28 px**; Prosa-H2 fest 32 px | 600 | 1.1 | H1 (alle Köpfe), Abschnitts-H2, H2 der Rechner-Hilfe, Ergebnisbetrag der Rechner, Prosa-H2 der Rechtsseiten, CTA-Band |

**Regeln:** Alle H1 im `ContentKopf` folgen [09] H5 (`hyphens: auto`, `hyphenate-limit-chars: 10 4 4`, `overflow-wrap: break-word`, max. 800 px). Die H2 der Rechtsprosa und der Rechner-Hilfe haben dieselben drei Regeln und `scroll-margin-top: 100px`. Zahlen in Rechnern und Tabellen stehen in `tabular-nums`. Es gibt keine Monospace mehr (die Bestand-Stand-Zeile `font-mono` entfällt), keine Großbuchstaben und keine Einzelwort-Hervorhebung. `font-weight: 500/700/800` und die Klassen `font-medium`, `font-bold` und `font-extrabold` kommen nach dieser Phase in `app/**`, `components/legal/**`, `components/calculators/**` und `components/CraftOSLogo.tsx` nicht mehr vor (Test, § 11). Ausgenommen ist die Mini-UI der Geräterahmen [05], siehe § 7.3.

---

## Color

Unverändert aus [05]–[09]:

| Role | Value | Usage in Phase 10 |
|------|-------|-------|
| Dominant (60%) | `#FFFFFF` | Seitenhintergrund, Rechner-Abschnitt, Rechtsprosa, Formular-Panel, Karten auf Warmflächen, 404-Einstiege |
| Secondary (30%) | `#F7F3EB` (warm), `#101014` (dunkel) | Warm: alle `ContentKopf`, Ergebnis-Panel, Werkzeugkarten, Datenblock, Formelkasten, abwechselnde Hilfeabschnitte, aktiver Rechner-Reiter, gewählte Rechenart. Dunkel: CTA-Band, Header, Fußleiste |
| Accent (10%) | `#F2AF38` | nur die Liste unten |
| Destructive | `#B32F28` | nur Feldfehler und der Verlust-Hinweis im Angebotsrechner (J12); keine destruktiven Aktionen |

**Accent reserved for** (Teilmenge von [05], keine Erweiterung):
1. Hintergrund des Haupt-CTA „10 Tage kostenlos testen“ im CTA-Band (Rechner, `/support`) und im Header.
2. Bestandsakzente innerhalb von `FeatureSnippet` und Szenen auf anderen Seiten (unverändert, § 8).
3. `CraftOSMark` im Logo (Verlauf `#FFC438` → `#F19800` [BESTAND], unverändert).
4. Amber-Oberkante der hervorgehobenen Tabellenspalte (unverändert, § 6.2).

**Nicht erlaubt (neu in Phase 10 bereinigt):** Amber-Buttons in den Rechnerkarten (`.primaryLink` Amber [BESTAND]), Amber-Kanten an Formelkästen und Vergleichsblöcken, `.btn-cta`/`.btn-secondary` auf der 404-Seite, `text-primary-600` (`#D28A13`, 2,84 : 1) als Text, `text-ink-400` (`#777782`, 4,43 : 1) als Text, Amber im hellen `ContentKopf`.

**Abgeleitete Farben Phase 10 (nachgerechnet):**

| Zweck | Wert | Kontrast |
|---|---|---|
| Haupttext | `#17171C` | 17,86 : 1 auf Weiß, 16,14 : 1 auf `#F7F3EB` |
| Sekundärtext, Hinweisabsätze, Feldhinweise | `#62626E` | 6,01 : 1 auf Weiß, 5,43 : 1 auf `#F7F3EB` |
| Links in Rechts- und Hilfeprosa, Kartenlabel | `#784B10` | 7,47 : 1 auf Weiß, 6,75 : 1 auf `#F7F3EB` |
| Eyebrow hell | `#99600B` | 4,71 : 1 auf `#F7F3EB` |
| Fehlertext | `#B32F28` | 6,26 : 1 auf Weiß, 5,66 : 1 auf `#F7F3EB` |
| Rahmen von Eingabefeldern, Reset-Button | `#777782` | 4,43 : 1 auf Weiß (Nicht-Text ≥ 3 : 1) |
| Fokusring | `3px solid #BB7609`, Offset 4 px | 3,68 : 1 auf Weiß, 3,32 : 1 auf `#F7F3EB`, 5,16 : 1 auf `#101014` |
| Logo-Unterzeile | berechneter Wert von `text-zinc-400` im aktuellen Build (≈ `#9F9FA9`) | ≈ 7,24 : 1 auf `#101014` |
| Kartenrahmen | `#DEDEE3` auf Weiß, `#E7DCC9` auf Warm | dekorativ, keine Anforderung |

**Flächenrhythmus (verbindlich):**
- `/rechner`: Kopf Warm → Einstieg Weiß (Karten Warm) → CTA dunkel.
- `/rechner/stundensatz`: Kopf Warm → Rechner Weiß → „Wie wird der Stundensatz berechnet?“ Warm → „Welche Kosten und Stunden gehören hinein?“ Weiß → CTA dunkel.
- `/rechner/angebotskalkulation`: Kopf Warm → Rechner Weiß → „Wie kalkuliere ich einen Angebotspreis?“ Warm → „Was unterscheidet Marge und Kostenaufschlag?“ Weiß → „Was muss ich bei meinen Eingaben beachten?“ Warm → CTA dunkel.
- `/support`: Kopf Warm → Kontakt Weiß (Karte Warm) → Hilfe Warm (Karten Weiß) → CTA dunkel.
- `/impressum`, `/datenschutz`, `/agb`: Kopf Warm → Rechtstext Weiß → Fußleiste.
- 404: Kopf Warm → Einstiege Weiß (Karten Warm) → Fußleiste.

---

## 1. Rechner (D-15)

`CalculatorPage.tsx` wird auf v2 umgestellt und nicht ersetzt. Rechenlogik, Feldnamen, Beschriftungen, Fehlertexte, `noscript`-Hinweise und JSON-LD bleiben wörtlich. Eingaben werden weiterhin nicht gespeichert.

### 1.1 Kopf (alle drei Rechnerseiten)

`ContentKopf` mit diesen Werten:
- `crumbs={crumbsFor(pfad)}` (wie heute)
- `eyebrow="Rechner"` (7 Zeichen)
- `h1={zielwerte(pfad).h1}`
- `id="rechner-titel"`
- `lead` = Bestands-Intro wörtlich, ohne `answer`, weil die Antwortregel für Rechner nicht gilt (`mitAntwortRegel`, `seo-audit-core.mjs` Z. 256)
- `hinweis={{ text: "Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.", icon: LockKeyhole }}` (58 Zeichen)

Der Bestandskopf `.hero` mit eigener H1-Größe `clamp(2.2rem, 5vw, 4.4rem)` entfällt.

**Above-the-fold 360 × 640 (ungünstigster Fall `/rechner/angebotskalkulation`):** 74 Header + 8 + 44 Brotkrumen + 16 + 20 Eyebrow + 24 + H1 124 (4 × 30,8) + 16 + Lead 144 (6 × 24) + 16 + Hinweis 40 (2 × 20) = **526 px** ≤ 640. Der Hinweis ist vollständig sichtbar.

### 1.2 Abschnittsfolge

Die Abschnitte sind `section data-abschnitt={id}`. H2-ids folgen `DESIGN-V2.md` § 17.1, also ohne Suffix.

| Seite | # | Abschnitt (`id`) | Fläche | Inhalt |
|---|---|---|---|---|
| `/rechner` | 1 | `einstieg` | Weiß | `SectionHeader` mit Titel „Welcher Rechner ist der richtige Einstieg?“ (42) und Lead = erster Bestandsabsatz „Beginnen Sie beim Stundensatz, … für einen konkreten Auftrag.“ (177, 2 Sätze, rendert `data-answer`). Darunter 48/32 Abstand, dann die Werkzeugkarten (§ 1.4) im Raster 1 / 2 Spalten (< 768 / ≥ 768), Lücke 16 / 24. Darunter 32 Abstand, dann der zweite Bestandsabsatz „Beide Rechner arbeiten netto. …“ als `<p>` 16/400 `#62626E`, max. 68ch. |
| | 2 | – | dunkel | `CtaBand` (§ 10) |
| `/rechner/stundensatz` | 1 | `rechner` | Weiß | Rechnernavigation (§ 1.5) → 24/32 → `noscript` → `HourlyRateCalculator`. Die `section` hat keinen Namen und ist keine Landmark; die Panels tragen ihre H2. |
| | 2 | `berechnung` | Warm | `CalculatorHelp` „Wie wird der Stundensatz berechnet?“ mit Absatz, Formelkasten, Beispiel und Quellenhinweis (wörtlich) |
| | 3 | `kosten-und-stunden` | Weiß | `CalculatorHelp` „Welche Kosten und Stunden gehören hinein?“ mit `FaqList` (4 Einträge wörtlich, `answerMax` Standard 600, **ohne** neues FAQPage-Schema) |
| | 4 | – | dunkel | `CtaBand` |
| `/rechner/angebotskalkulation` | 1 | `rechner` | Weiß | wie oben mit `OfferCalculator` |
| | 2 | `angebotspreis` | Warm | „Wie kalkuliere ich einen Angebotspreis?“ |
| | 3 | `marge-und-aufschlag` | Weiß | „Was unterscheidet Marge und Kostenaufschlag?“ mit Vergleichsblöcken (H3 „Gewinnmarge“/„Kostenaufschlag“ bleiben H3) |
| | 4 | `eingaben` | Warm | „Was muss ich bei meinen Eingaben beachten?“ mit `FaqList` (4 Einträge) |
| | 5 | – | dunkel | `CtaBand` |

**Notiz über dem CTA-Band (K6, J8, alle drei Rechnerseiten):** Der Bestandssatz der alten CTA-Aside „Lernen Sie die Angebotsfunktionen von CraftOS kennen und bringen Sie Ihre Aufträge ins System.“ (94 Zeichen) steht wörtlich als letztes Element des letzten Inhaltsabschnitts vor dem `CtaBand` (auf `/rechner` nach der Notiz „Beide Rechner arbeiten netto. …“). Darstellung: `<p data-notiz>` 16/400/1.5 `#62626E`, max. 68ch, 32 / 48 px Abstand zum Inhalt darüber (< 768 / ≥ 768). Kein Link in der Notiz, das Ziel `/funktionen/angebote` trägt der Sekundärlink des CTA-Bands.

**`CalculatorHelp` v2 (J6):**
- Aufbau: `section data-abschnitt={id} aria-labelledby={id}`, Fläche laut Tabelle, `padding-block` 48 / 64 / 96, `site-container`.
- H2 im Stil des `SectionHeader`-Titels: Display, Clash 600, `#17171C`, max. 800 px, `id={id}`.
- Abstand H2 → Inhalt: 32 / 48.
- Inhaltsspalte: max. 720 px, linksbündig. Absätze 16/400/1.5 `#17171C`, Abstand 16.
- Die Zweispaltigkeit des Bestands (0,72fr/1,28fr) entfällt.

**Kästen in der Hilfe:**
- **Formelkasten:** Gegenfläche zur Abschnittsfläche (Weiß auf Warm, Warm auf Weiß), 1 px `#E7DCC9`, Radius 16, Innenabstand 16 / 24, Text 16/400 `#17171C`, `strong` 600, `tabular-nums`, keine Amber-Kante.
- **Vergleich Marge/Aufschlag:** zwei Blöcke nebeneinander ab 768 px, Lücke 24. Jeder Block hat 1 px `#E7DCC9`, Radius 16 und Innenabstand 24. H3 20/600 Clash, Rechenzeile 16/400 `#62626E`, Wert `strong` Display 32 `tabular-nums`.
- **Quellenhinweis:** 14/400 `#62626E`, Link `#784B10` mit 1 px Unterstrich und Offset 4.

### 1.3 Darstellung der Rechner (`Calculators.module.css`, Token-Abbildung)

Raster und Verhalten bleiben wie im Bestand: zwei Spalten Formular/Ergebnis (1,15fr/0,85fr), Sticky-Verhalten des Ergebnisses, Feldpaare und Rechenwahl. Die Umbruchgrenzen wechseln von 960/640 px auf die v2-Grenzen 1024/768 px:
- Formular und Ergebnis nebeneinander ab 1024 px.
- Feldpaare und Vergleich zweispaltig ab 768 px.

Geändert werden nur Flächen, Linien, Radien, Abstände, Größen, Gewichte und Farben:

| Bestand | v2 |
|---|---|
| `--calc-ink #1D2924`, `--calc-muted #58625B` | `#17171C`, `#62626E` |
| `--calc-background #F7F8F5` (Seitenfläche) | entfällt; Abschnittsflächen laut Flächenrhythmus |
| `--calc-line #DCE1D9` | `#DEDEE3` auf Weiß, `#E7DCC9` auf Warm |
| `--calc-amber-light #FFF4DB` (Ergebnisfläche, gewählter Modus, Feldfläche bei `noscript`) | `#F7F3EB` |
| `--calc-error #A12525`, Fehlerfläche `#FFFAFA` | `#B32F28` (J12), Fläche Weiß |
| `.container` (`min(100% - 3rem, 76rem)`) | `site-container` |
| Formular-Panel | Weiß, 1 px `#DEDEE3`, Radius 16, Innenabstand 16 / 24 / 32 |
| Ergebnis-Panel | `#F7F3EB`, 1 px `#E7DCC9`, Radius 16, Innenabstand 16 / 24 / 32 |
| Panel-Titel (1,45rem) | 20/600 Clash |
| Legende (1,05rem/600) | 16/600 |
| Feldlabel (0,95rem/500) | 14/600 `#17171C`, 8 px über dem Feld |
| Eingabe (1,125rem/500, Rahmen `#A9B3A9`, Radius 0,55rem) | 16/400 `#17171C`, Weiß, 1 px `#777782`, Radius 6, `min-height: 48px`, Innenabstand 0 16. Platzhalter 16/400 `#62626E` |
| Fokus Eingabe (`outline 3px var(--calc-ink)`, Offset 2) | `.inputWrap:focus-within { outline: 3px solid #BB7609; outline-offset: 4px }` |
| Einheit, Hinweis, Fehler (0,9/0,825rem) | Einheit und Hinweis 14/400 `#62626E`, Fehler 14/600 `#B32F28`, jeweils 8 px unter dem Feld |
| Ungültiges Feld | Rahmen bleibt 1 px, Farbe `#B32F28`; der zweite Pixel kommt per `box-shadow: inset 0 0 0 1px #B32F28`. Innenabstand bleibt 16, keine Höhenänderung (K11) |
| Ergebnisbetrag (`clamp(2.3rem, 3.7vw, 3.6rem)`) | Display, Clash 600, `tabular-nums` |
| Ergebniszeilen (0,875rem) | 16: `dt` 400 `#62626E`, `dd` 600 `#17171C`, Trennlinie 1 px `#E7DCC9` |
| Rechenweg `summary` | 16/600, `min-height: 44px`; Liste 14/400 |
| `.transferLink` (dunkle Fläche, weiß) und `.resetButton` | Sekundärbutton: transparent, 1 px `#777782`, Radius 6, 16/600 `#17171C`, `min-height: 48px` (Transfer) bzw. `44px` (Reset), Innenabstand 0 16. Hover (`hover: hover`): Fläche Weiß bzw. `#F7F3EB`. Icon 16 px |
| Rechenwahl (Radio-Karten) | 1 px `#DEDEE3`, Radius 6, `min-height: 48px`. Gewählt: `#F7F3EB`, Rahmen 2 px `#17171C`, 600. `accent-color: #17171C` |
| Hinweisboxen (`lossNotice`, `transferNotice`, `noScript`) | 14/400, Radius 6, Innenabstand 16. Verlust: Weiß, 1 px `#B32F28`, Text `#B32F28` 600. Übernahme und `noscript`: `#F7F3EB`, 1 px `#E7DCC9`, Text `#17171C` |
| eigene Fokusregeln `.page a/button/summary/input:focus-visible` (`--calc-ink`) | entfallen; es gilt die globale Regel `3px solid #BB7609`, Offset 4 |
| Abstände (`rem`/`clamp`) | Feldabstand 16, Fieldset-Abstand 24 mit 1 px Linie, Lücke Formular/Ergebnis 16 / 24 / 32 |

### 1.4 Werkzeugkarten auf `/rechner`

Die Karten bleiben seiteneigen in `Calculators.module.css`, weil `LinkKarten` keine Aufzählung erlaubt ([R]).

Darstellung:
- `<article>` auf `#F7F3EB` mit 1 px `#E7DCC9`, Radius 16, Innenabstand 16 / 24, kein Schatten.
- Icon-Feld 48 × 48 mit Radius 12 und `primary-100 #FFEFCC`, Icon 24 px `#784B10` (bisher 28) → 16.
- `<h3>` 20/600 Clash (bisher H2) → 8 → Text 16/400 `#62626E`, max. 45ch → 16.
- Punktliste 16/400 `#62626E` mit Marker `#777782`, Einzug 24 und Eintragsabstand 8 → 24.
- Link „Stundensatz berechnen“ bzw. „Angebot kalkulieren“ als Sekundärbutton (§ 1.3), am Kartenboden (`margin-top: auto`).

Der Link ist gestreckt (`::after { inset: 0 }`) und damit der einzige Tabstopp der Karte. Den Fokusring trägt die Karte per `:focus-within` (3 px `#BB7609`, Offset 4). Hover (`hover: hover`): Kartenrahmen `#99600B`, 150 ms. Der Akzent `#F2AF38` kommt in den Karten nicht vor; die hellen Amber-Töne `primary-100 #FFEFCC` (Icon-Feld) und `primary-700 #99600B` (Hover-Rahmen) sind wie in [05] § 2 und [09] G9 keine Akzentfläche, sondern Hinterlegung bzw. Linie (K10).

### 1.5 Rechnernavigation

`nav aria-label="Rechner auswählen"` [BESTAND]:
- Links „Stundensatz“ und „Angebot & Marge“ (wörtlich), `inline-flex`, `min-height: 44px`, Innenabstand 0 16, Radius 6, 16/600 `#17171C`, Lücke 8.
- Aktiv (`aria-current="page"`): `#F7F3EB` mit 1 px `#E7DCC9`.
- Inaktiv: transparent mit 1 px transparent. Hover (`hover: hover`): `#F7F3EB`.
- Kein Unterstrich, kein Amber.

---

## 2. `/support` (D-16)

`PageHero` entfällt auf dieser Seite. Die Datei bleibt erhalten und steht auf der Inhaberliste „Freigabe zum Entfernen nötig“ (D-04). Alle Bestandssätze bleiben wörtlich erhalten, sie verteilen sich nur auf v2-Bausteine.

| # | Abschnitt (`id`) | Fläche | Baustein | Inhalt |
|---|---|---|---|---|
| 0 | Kopf | Warm | `ContentKopf` | Brotkrumen `crumbsFor("/support")`, Eyebrow „Kontakt & Support“ (17), H1 = Map (39), `id="support-titel"`, `lead` = Bestands-Intro (117, 1 Satz) |
| 1 | `kontakt` | Weiß | `SectionHeader` + `LinkKarten surface="warm" columns={2} label="Kontaktweg"` (1 Karte, J9) | H2 „Direkt zum CraftOS Support.“ (27), Lead „Nennen Sie die betroffene Ansicht, Ihr Gerät und die Schritte, bei denen die Frage auftritt.“ (92). Karte: `href="mailto:" + site.email`, Icon-Feld `Mail`, Label „E-Mail“, Titel `site.email`, Text „Eine genaue Fehlermeldung hilft uns bei der Einordnung. Bitte senden Sie keine Passwörter oder vollständigen Zahlungsdaten.“ (123, 2 Sätze) |
| 2 | `hilfe` | Warm | `SectionHeader` + `LinkKarten surface="white" columns={2} label="Hilfe und Ratgeber"` (2 Karten) | H2 „Die Antwort ist vielleicht schon da.“ (36), Lead „Im Hilfezentrum finden Sie Anleitungen zu Einrichtung, Angeboten, Rechnungen, Zeiten, Lager und Craft AI.“ (105). Karten: `/hilfe` mit Icon `BookOpen`, Titel „Hilfezentrum öffnen“ und Meta „{n} Anleitungen“; `/blog` mit Icon `Newspaper`, Titel „Ratgeber für Ihren Betriebsalltag“ und Meta „{n} Artikel“. Die Zahlen kommen aus den Inhaltslisten in `lib/content`. |
| 3 | Abschluss | dunkel | `CtaBand` | § 10 |

Die Altklassen `section-space`, `split-section`, `soft-panel`, `btn-cta` und `text-link` entfallen auf der Seite. Die CSS-Regeln bleiben bestehen und sind Kandidaten für die Inhaberliste. Die Überschriftenfolge ist H1 → H2 → H3 (Karten) ohne Sprung.

---

## 3. Rechtsseiten `/impressum`, `/datenschutz`, `/agb` (D-09, D-17)

### 3.1 Aufbau

**Kopf:** `LegalShell` rendert `ContentKopf` mit diesen Werten:
- `crumbs={crumbsFor(pfad)}`
- `eyebrow="Rechtliches"` (11)
- `h1={zielwerte(pfad).h1}`
- `id="rechtstext-titel"`
- weder Lead noch Antwort
- `updated` → `stand="Stand: {updated}"` (heute nicht gesetzt)

**Rechtstext:** `section` auf Weiß mit `padding-block` 48 / 64 / 96 und `site-container`. Der Inhaltscontainer hat das Attribut `data-rechtstext` (für den Schutztest), ist max. 720 px breit und linksbündig. Die Darstellung kommt aus einem neuen `components/legal/Legal.module.css`; `.article-prose` wird nicht wiederverwendet, weil die Datenblöcke andere Absatzabstände brauchen.

| Element | Festlegung |
|---|---|
| Absatz | 16/400/1.5 `#17171C`, max. 68ch, Abstand 16 |
| H2 (`LegalSection`) | 32/600 Clash, Zeilenhöhe 1.1, `#17171C`, oben 48 (erste H2 im Container 0), H2 → Inhalt 16, Silbentrennung wie Typography-Regeln, `scroll-margin-top: 100px` |
| Datenblock (`DataBlock`) | `#F7F3EB`, 1 px `#E7DCC9`, Radius 16, Innenabstand 16 / 24. Zeilen ohne Abstand 16/1.5: erste Zeile 600 `#17171C`, weitere 400 `#17171C` |
| Hinweisabsätze `text-sm` (z. B. „Hinweis: Diese Datenschutzerklärung ist eine Vorlage …“, „Einzelunternehmer · CraftOS“) | 14/400/1.4 `#62626E` |
| Link im Fließtext | 16/600 `#784B10`, Unterstrich 1 px mit Offset 4, Hover `#17171C`, Fokus global (3 px `#BB7609`, Offset 4). Externe Links bleiben `target="_blank"` mit `rel="noopener noreferrer"` [BESTAND]. |

### 3.2 Kontrastkorrekturen (nur Darstellung, kein Wortwechsel)

| Seite | Stelle [BESTAND] | Ist | Neu | Ergebnis |
|---|---|---|---|---|
| `/impressum` | Z. 76 Link zur OS-Plattform, `font-semibold text-primary-600 hover:underline` | 2,84 : 1 | Klassen entfernen, Linkregel aus § 3.1 | 7,47 : 1 |
| `/datenschutz` | Z. 77 `mailto`-Link, gleiche Klassen | 2,84 : 1 | dito | 7,47 : 1 |
| `/datenschutz` | Z. 84 Hinweisabsatz `text-sm text-ink-400` | 4,42 : 1 (genau 4,425; in der Farbtabelle gerundet 4,43) | `text-ink-400` → Darstellung 14/400 `#62626E` | 6,01 : 1 |
| `/agb` | Z. 90 Hinweisabsatz `text-sm text-ink-400` | 4,42 : 1 | dito | 6,01 : 1 |
| alle drei | `Legal.tsx` Z. 29 Augenbraue `spec-label text-primary-600` | – | `.v2-eyebrow` im `ContentKopf` (`#99600B`) | 4,71 : 1 auf `#F7F3EB` |
| alle drei | `Legal.tsx` Z. 31 „Stand:“ `font-mono text-xs text-ink-400` | heute nicht gerendert | `stand`-Zeile 14/400 `#62626E` | 5,43 : 1 |

Der ODR-Link auf `/impressum` (Plattform 2025 eingestellt) und der kurze Title bleiben unverändert, beides ist ein Inhaberpunkt (D-38). Die Hinweisabsätze „Vorlage …“ bleiben ebenfalls im Wortlaut, ihr Inhalt ist ein Inhaberpunkt neben D-31 Nr. 37 ([R]).

### 3.3 Schutztest Wortlaut (vor jeder Darstellungsänderung)

Der erste Commit von Paket (c) enthält **nur** drei Dinge:
- das Attribut `data-rechtstext` am Inhaltscontainer von `LegalShell`,
- den Test `tests/rechtstexte-wortlaut.test.ts`,
- die Referenzdateien `tests/fixtures/rechtstexte/{impressum,datenschutz,agb}.txt`, erzeugt aus dem unveränderten Stand.

**Vorgehen des Tests (K1, verbindlich):**
1. **Rendern:** Jede Seite wird per `renderToStaticMarkup` gerendert (Vitest läuft mit `environment: 'node'`, es gibt keinen HTML-Parser im Repo).
2. **Container herauslösen:** Eine kleine reine Funktion (`rechtstextAusschnitt(html)` in der Testdatei oder in `tests/lib/`) sucht das öffnende Tag mit `data-rechtstext` und läuft mit einem **Zähler für verschachtelte `div`-Tags** bis zum passenden schließenden `</div>`. Diese Funktion hat einen eigenen kleinen Test mit verschachtelten `div`, Geschwistern nach dem Container und fehlendem Container (dann wirft sie mit „data-rechtstext fehlt“).
3. **Blockfolge statt Wortfolge:** Der Inhalt wird in eine Folge von Blöcken mit Tagnamen zerlegt, eine Zeile je Block: `[h2] …`, `[p] …`, `[li] …`, `[div] …` für Datenblock-Zeilen. Links stehen in ihrem Block als `[a href="…"] Linktext [/a]`. So fallen eine H2, die zum Absatz wird, ein Satz, der in einen anderen Absatz wandert, und ein geändertes Linkziel (OS-Plattform, `mailto`) auf.
4. **Normalisieren:** Entities werden allgemein dekodiert (benannte wie `&amp;`, `&lt;`, `&gt;`, `&quot;` und numerische `&#…;`/`&#x…;`). Leerraum wird nur über die Zeichenklasse `[ \t\r\n]+` zusammengefasst, **nicht** über `\s`; das Zeichen U+00A0 bleibt erhalten und muss gleich bleiben.
5. **Versteckter Text verboten:** Im Container dürfen die Klassen `sr-only` und `hidden` sowie die Attribute `hidden` und `aria-hidden="true"` nicht vorkommen; der Test schlägt sonst mit „Rechtstext {seite}: versteckter Inhalt (‚{klasse}‘) im Container – Text muss sichtbar bleiben.“ fehl.
6. **H1 getrennt:** Die H1 gehört nicht in die Referenzdatei (die Keyword-Map gehört Paket (e)). Der Test prüft sie getrennt auf Gleichheit mit `zielwerte(pfad).h1`.
7. **Referenzen ohne Snapshot-API:** Vergleich per `fs.readFileSync(referenz, "utf8")` und `expect(ist).toBe(soll)`. `toMatchSnapshot` und `toMatchFileSnapshot` sind verboten, weil sie fehlende Referenzen selbst schreiben und mit `-u` überschreiben. Fehlt eine Referenzdatei, ist der Test **rot** („Referenz {datei} fehlt – auf unverändertem Stand erzeugen.“).

Erst danach folgen Stiländerungen. Ein Fehlschlag meldet: „Rechtstext {seite} weicht vom Wortlaut ab (erste Abweichung bei Zeichen {i}: ‚{ist}‘ statt ‚{soll}‘) – nur Darstellung ändern.“ Die Referenzdateien werden nie automatisch aktualisiert. Eine Aktualisierung braucht eine Inhaberfreigabe für eine Rechtstextänderung.

---

## 4. 404-Seite (D-18)

**Entscheidung zur zweisätzigen Einleitung:** Der Kopf ist `ContentKopf` mit `crumbs={null}` (K1, J1). Die beiden Sätze stehen unverändert als `lead`, denn `lead` kennt keine Satzregel. Es gibt also weder eine geteilte Einleitung noch einen neuen Kopfbaustein. Die H1 verliert das `<br/>` und behält beide Sätze; den Umbruch übernimmt `text-wrap: balance`.

| # | Abschnitt (`id`) | Fläche | Baustein | Inhalt |
|---|---|---|---|---|
| 0 | Kopf | Warm | `ContentKopf crumbs={null}` | Eyebrow „Seite nicht gefunden“ (20, statt „404 · Seite nicht gefunden“ mit 26 Zeichen über Budget und Mittelpunkt). H1 „Hier geht es nicht weiter. An anderer Stelle schon.“ (51), `id="fehler-titel"`. `lead` „Diese Adresse ist nicht verfügbar. Über die Startseite oder das Hilfezentrum finden Sie den passenden Einstieg.“ (111, wörtlich) |
| 1 | `einstiege` | Weiß | `SectionHeader` + `LinkKarten surface="warm" columns={3} label="Einstiege"` mit `iconFeld` | H2 „So geht es weiter“ (17), Lead „Wählen Sie den Einstieg, der zu Ihrer Frage passt.“ (50). Karten in dieser Reihenfolge: (1) `/` mit Icon `House`, Titel „Startseite“, Text „CraftOS im Überblick: Angebot, Planung, Baustelle und Rechnung in einer Software.“ (81); (2) `/hilfe` mit Icon `BookOpen`, Titel „Hilfezentrum“, Text „Anleitungen Schritt für Schritt, von der Einrichtung bis zur Rechnung.“ (70); (3) `/funktionen` mit Icon `LayoutGrid`, Titel „Funktionen“, Text „Alle Funktionen von Angebot bis Buchhaltung mit Plattformen und Lizenzen im Überblick.“ (86; K7: nicht jede Funktion läuft auf beiden Plattformen, z. B. das Kassenbuch nur im Web) |

- Es gibt kein `CtaBand` (J10), keine Altklassen (`section-space`, `eyebrow`, `section-intro`, `btn-cta`, `btn-secondary`) und kein Amber.
- HTTP-Status 404 und `noindex` setzt Next selbst; der Test prüft beides (§ 11).
- **Above-the-fold 360 × 640:** 74 + 48 + 20 + 24 + H1 93 (3 × 30,8) + 16 + Lead 120 (5 × 24) = **395 px**. Die H2 „So geht es weiter“ beginnt bei 395 + 48 (unterer Kopfabstand) + 48 (oberer Abschnittsabstand) = **491 px** und ist damit über dem Falz sichtbar (K12).

---

## 5. Funktionskarten Kassenbuch und § 13b (D-21, Inhaltsteil von Paket d)

**Position:**
- Je Gruppe ein Eintrag in der bestehenden `FeatureList` „Weitere Funktionen“ unter den `FeatureCard`-Rastern auf `/funktionen` (`app/funktionen/page.tsx` Z. 61–63).
- „Rechnung nach § 13b“ steht in der Gruppe `rechnung`, „Kassenbuch“ in der Gruppe `buchhaltung`. Beide sind dort die einzige Zusatzfunktion.
- Den Kommentar `lib/funktionsgruppen.ts` Z. 157–163 passt Paket (d) an.

**Menü:** Das Mega-Menü bleibt unverändert, es zeigt seit Phase 7 nur Detailfunktionen ([R] Open Question 3, RESOLVED). Startseite und Menü erhalten keinen Eintrag. `llms.txt` folgt seiner Quelle.

**Kartenregeln (unveränderter `FeatureList`-Vertrag [06]):**
- Name ≤ 32
- Nutzen genau 1 Satz ≤ 100
- Plattform-Badges aus dem Register
- Ziel mit Hinweis „Beschrieben unter {label}“
- ein Tabstopp je Zeile
- Fokus über `.item:has(.link:focus-visible)`

Die Lizenz steht im Nutzensatz, positiv formuliert (D-03, L-1). Es gibt keine Negativformulierung, kein „nur“ und kein „nicht für“.

| id | Name | Icon | Nutzensatz (Zeichen) | Plattform | Ziel |
|---|---|---|---|---|---|
| `kassenbuch` | „Kassenbuch“ | `Wallet` | „Bargeld täglich mit laufendem Bestand buchen, für Admin und Büro-Zugänge mit Finanzberechtigung.“ (96; K8, passend zur FAQ auf `/funktionen/buchhaltung`) | Web | `/funktionen/buchhaltung`, `kind: "funktion"`, `label: "Buchhaltung & DATEV"` |
| `rechnung-13b` | „Rechnung nach § 13b“ | `ReceiptText` | „Bauleistungen ohne Umsatzsteuer mit Hinweis nach § 13b UStG abrechnen, mit Voll-Lizenz.“ (87) | Web | `/funktionen/rechnungen`, `kind: "funktion"`, `label: "Rechnungen"` |

**Belege [REL]:**
- „Globale Finanzbereiche“ ist das Schalterlabel; `canSeeFinance = isAdmin || (isBuero && finanzen_sichtbar)`; die App-Lizenz hat nie Zugriff.
- „täglich … mit laufendem Bestand“ steht wörtlich in `src/pages/Kassenbuch.tsx` Z. 45 und Z. 113.
- Rechnungen laufen über `LicenseProtectedRoute feature="dokumente"` und sind damit Voll-Lizenz (Admin oder Büro).
- § 13b ist belegt durch `CustomerDialog.tsx` („Bauleister nach § 13b“) und `invoiceNoticeTexts.ts`.

**Kacheln am Ziel (Regel aus 07-02):**
- Die bestehende `wide`-Kachel „Kassenbuch“ in `lib/funktionsdetails/buchhaltung.ts` erhält `zusatz: "kassenbuch"`. Text und `href` (`/hilfe/kassenbuch-fuehren`) bleiben unverändert.
- `/funktionen/rechnungen` erhält eine neue Kachel mit Größe `wide`, Titel „Rechnung nach § 13b“ (19) und Text „Kunden als Bauleister markieren und Rechnungen ohne Umsatzsteuer mit Hinweis nach § 13b UStG fertigstellen.“ (107 ≤ 120). Dazu kommen das Icon `ReceiptText`, `href: "/hilfe/rechnung-fertigstellen"` und `zusatz: "rechnung-13b"`. Die Kachel steht **nach** „Kontrolliert fertigstellen“ und **vor** „Berichte abrechnen“, die neue Folge ist `md·sm·sm·wide·wide·wide` (6 ≤ 7).
- Ab 1024 px ergeben sich vollständige Zeilen (md+sm+sm, dann dreimal wide), ab 768 px ebenfalls (md, sm+sm, wide, wide, wide). Es entsteht keine leere Rasterzelle. Eine `grenze`-Kachel kommt nicht hinzu.

---

## 6. Feinschliff (D-19)

### 6.1 Bodenausrichtung in Bento-Kacheln (D-19 (1), J3, Datei `BentoGrid.module.css`)

```css
@media (min-width: 768px) {
  .tile[data-size="sm"] > .body,
  .tile[data-size="md"]:not(:has([data-figure="phone"])) > .body { margin-top: auto; }
}
```

- Das Visual (Icon-Feld, Kennzahl, Rahmen) bleibt oben. Der Textblock sitzt am Kachelboden, die Mindestlücke Visual → Text bleibt 24 px (`gap`).
- `lg`, `wide`, `visualPosition="end"` und Phone-Kacheln sind nicht betroffen (B10 [07] bleibt gültig).
- Kachel- und Zeilenhöhen ändern sich nicht. Es entsteht weder Layoutverschiebung noch CLS.
- **Messung mit dem B10-Verfahren vorher/nachher** (22 Detailseiten, `/app`, Startseite, `/styleguide`; Chromium und WebKit; 768/1024/1440):
  - Leerraum zwischen Unterkante Textblock und Innenkante Kachelboden bei allen `sm`/`md`-Kacheln ohne Phone ≤ 1 px (vorher bis 122 px).
  - Kachelhöhen je Seite und Breite unverändert ±1 px; Ausnahme `/funktionen/rechnungen`, die 10-06 nach dem Zusammenführen neu misst (§ 11, K2).
  - Abstand Visual-Unterkante → Titel ≥ 24 px.
  - Die größte so verlagerte Lücke steht im SUMMARY (Datei unter `test-results/bento-b10/`).

### 6.2 Tabellen-Caption außerhalb des Scrollbereichs (D-19 (2), J4, Dateien `ComparisonTable.{tsx,module.css}`)

```
div.root (flex, column, gap 8)
├─ p.caption[data-caption][aria-hidden="true"]   20/600 Clash, Zeilenhöhe 1.25, #17171C, max. 60ch, margin-bottom 8 (→ 16 zum nächsten Element)
├─ p.hint                                         „Zum Vergleichen seitlich wischen“ 14/400 #62626E, nur < 768 px [BESTAND]
└─ div.scroll[role="region"][aria-label={caption}][tabindex="0"]   Rahmen 1 px #DEDEE3, Radius 16 [BESTAND]
   └─ table › caption.sr-only {caption}            (Semantik und Tests bleiben)
```

- Die bisherige Caption-Zeile im Rahmen (16 px Innenabstand, Unterkante 1 px) entfällt. Der Tabellenkopf ist die erste Zeile im Rahmen.
- Das gilt für alle Tabellen: `/preise` (zwei Tabellen), die vier Alternativen, `/vergleich`, `/vergleich/handwerkersoftware-kleine-betriebe`, die Startseite und `/styleguide`.
- **Kriterium bei 360 px:** Die sichtbare Caption ist vollständig lesbar (`getBoundingClientRect().right ≤ clientWidth − 18` und `scrollWidth ≤ clientWidth` des Elements). Die Seite scrollt nicht horizontal.

### 6.3 Silbentrennung `/preise` (D-19 (3))

Das ist bereits in 09-09 (`7b1ed70`) erledigt: `app/globals.css` setzt `h2#was-kostet-handwerkersoftware { hyphens: manual }` ab 768 px. In Phase 10 gibt es **keine Änderung**, nur einen Sichtnachweis: Screenshot bei 1440 px, und `Range.getClientRects()` des Wortes „Handwerkersoftware“ liefert genau eine Zeile.

---

## 7. Logo-Schriftzug als SVG (Performance-Hebel, Paket b, J11)

### 7.1 Vertrag

`CraftOSLogo variant="full"` behält das `CraftOSMark` unverändert. Der Schriftzug, bisher zwei `<span>`, wird **ein** Inline-`<svg>` mit Glyphen-Umrissen:

| Zeile | Quelle der Umrisse | Bestandsmaß | Farbe |
|---|---|---|---|
| „CraftOS“ | `public/fonts/clash-display-700.woff2` | `text-lg` (18 px), `leading-none`, `tracking-tight` (−0,025em), Kerning der Schrift | `fill="currentColor"` (erbt `#F4F4F5` in Header und Fußleiste) |
| „Handwerkersoftware“ | `public/fonts/general-sans-500.woff2` | `text-xs` (12 px, Zeilenhöhe 16 px) | der berechnete Wert von `text-zinc-400` im Build vor der Änderung, als Literal mit Kommentar |

- **Maße:** `width` und `height` als Attribute exakt gleich der gemessenen Schriftzug-Box vor der Änderung (±0,5 px, einheitlich für Erzeugung und Abnahme), `viewBox` in px im Maßstab 1 für `md`, linksbündig. Der Abstand zum Mark bleibt `gap-3` (12 px). Es gibt keine CLS.
- **Größen `sm` und `lg` (K4):** Sie bleiben in der API und **skalieren** dasselbe SVG gleichmäßig über `width`/`height`, mit dem Verhältnis der Bestands-Schriftgröße von „CraftOS“: `sm` (`text-base`, 16 px) Faktor 16/18, `lg` (`text-xl`, 20 px) Faktor 20/18. Die Unterzeile skaliert dabei mit; im Bestand blieb sie fest bei 12 px. Diese kleine Abweichung ist zulässig, weil heute nur `md` gerendert wird. Ein Unit-Test prüft, dass `sm` und `lg` ein SVG mit den skalierten Maßen ausgeben.
- **Barrierefreiheit:** `aria-hidden="true"` und `focusable="false"` am Schriftzug-SVG. Den Namen trägt weiterhin der Link `aria-label="CraftOS Startseite"` [BESTAND]. Das Mark behält `role="img"`.
- **Erzeugung:** einmalig per Skript im Scratchpad, mit eigener `package.json` (z. B. `fontkit`, das WOFF2 und Kerning liest). Im Repo gibt es **keine** neue Abhängigkeit. Skriptname, Schriftdatei, Größe und Laufweite stehen als Kommentar über den Pfaddaten. Die Schriftdateien bleiben im Repo (D-04).
- **Schriftlizenz prüfen (K4, vor der Erzeugung):** In `public/fonts` liegt keine Lizenzdatei. Clash Display und General Sans stammen vermutlich von Fontshare (Indian Type Foundry). Paket (b) liest den geltenden Lizenztext an der Quelle und hält Fundstelle, Datum und die Antwort auf die Frage „Ist die Umwandlung von Glyphen in Pfade für ein Logo erlaubt?“ im SUMMARY fest.
  - **Erlaubt:** SVG-Pfade wie oben.
  - **Unklar oder nicht erlaubt (Alternative für den Executor):** Das Logo bleibt Webfont-Text in den zwei `<span>` des Bestands. Statt der vollständigen Schnitte Clash 700 und General 500 lädt `app/layout.tsx` je ein **Subset**, das nur die Glyphen von „CraftOS“ bzw. „Handwerkersoftware“ enthält. Die Subsets entstehen einmalig im Scratchpad (z. B. mit `subset-font` oder `fontkit`, keine Repo-Abhängigkeit) und liegen als `public/fonts/clash-display-700-logo.woff2` und `general-sans-500-logo.woff2` im Repo. Sie werden über einen eigenen `localFont`-Aufruf mit `preload: false` und `display: "swap"` eingebunden; die Logo-Klassen nutzen deren CSS-Variablen. Die Lizenzfrage für Subsetting ist im selben SUMMARY-Eintrag zu beantworten. Die Abnahme aus § 7.4 gilt unverändert, die Netzwerkprüfung erwartet dann statt „keine Anfrage“ nur Anfragen an die beiden Logo-Subsets, ohne Preload.

### 7.2 Schnitte nicht mehr laden

In `app/layout.tsx` entfallen aus den `localFont`-Listen:
- `clash-display-500` (ungenutzt),
- `clash-display-700` (nach § 7.1 und § 3 ungenutzt),
- `general-sans-500` (nach § 7.1 und § 1.3 ungenutzt).

Es bleiben Clash 600 sowie General 400 und 600, weiterhin mit `display: "swap"` und `preload`. Bei der Subset-Alternative aus § 7.1 kommen nur die beiden Logo-Subsets ohne Preload hinzu; die vollständigen Schnitte entfallen trotzdem. Weitere sichtbare Eingriffe für QA-04 sind **nicht** freigegeben: kein `font-display: optional`, kein Entfernen von Clash 600 oder General 600, keine Ersatzschrift für H1. Wenn das LCP-Ziel trotz § 7 und der unsichtbaren Hebel aus [R] (`inlineCss`-A/B, JavaScript) verfehlt wird, berichtet 10-06 eine offene Abweichung (D-13).

### 7.3 Folgen für Bestandsstellen

- Die Mini-UI in `components/feature-snippet/SupplementalScene.module.css` Z. 83 (`font-weight: 500`, 10 px) fällt ohne General 500 auf 400 zurück. Das entspricht dem Browserverhalten ohne den Schnitt und ist ausdrücklich zulässig. Paket (a) setzt dort `400`, damit der Code die Darstellung beschreibt.
- `font-weight: 700` in der Mini-UI nutzt schon heute General 600 (General 700 wurde nie geladen); das ändert sich nicht.
- `components/product-demo/**` wird nicht gerendert (D-23) und ist nicht betroffen.
- Die Umstellung in `layout.tsx` wird erst im Integrationsstand 10-06 zusammen mit § 1.3 und § 3 wirksam geprüft.

### 7.4 Abnahme (mit K4)

- **Screenshot-Vergleich:**
  - Engine und Rechner: Playwright Chromium, Referenz und Vergleich auf **demselben Rechner** mit **derselben Playwright-/Chromium-Version** (`chromium-1243`).
  - Vor jeder Aufnahme `await page.evaluate(() => document.fonts.ready)`, damit die Referenz nicht die Ersatzschrift zeigt.
  - Ausschnitt: **nur der Schriftzug** (Box der beiden `<span>` vorher bzw. des Schriftzug-SVG nachher, ohne Mark und ohne Linkfläche), im Header und in der Fußleiste, je bei 1440 und 390 px Breite und mit `deviceScaleFactor: 2`.
  - Toleranz absolut: `toHaveScreenshot({ maxDiffPixels: 40, threshold: 0.1 })` je Ausschnitt; kein Anteilswert.
  - Speicherort der Referenzen: `tests/e2e/logo-schriftzug.pw.cjs-snapshots/`, erzeugt **vor** der Änderung in einem eigenen Commit. `--update-snapshots` ist nach der Änderung verboten; eine neue Referenz braucht einen neuen Bestand-Commit.
  - Boxgröße des Schriftzugs gleich der Referenz, ±0,5 px.
- **Netzwerk:** Auf den sechs Lighthouse-Gate-Seiten und auf `/impressum` gibt es keine Anfrage an `clash-display-500`, `clash-display-700` oder `general-sans-500`, und es gibt genau drei Schrift-Preloads (Alternative Subset: siehe § 7.1).

---

## 8. FeatureSnippet-Dimmstufe (D-10, Paket a)

- Inaktive Schritte erhalten `opacity: 1`. Die Hervorhebung entsteht über Farbe, abhängig vom Hintergrund der Szene (K10, nachgerechnet):

  | Hintergrund in der Szene | Text inaktiv | Kontrast | Text aktiv |
  |---|---|---|---|
  | Weiß / `ink-50` | `#62626E` | 6,01 : 1 | `#17171C` |
  | `ink-100 #F7F3EB` (z. B. `.stockMovement`) | `#62626E` | 5,43 : 1 | `#17171C` |
  | `primary-50 #FFF4D9` | `#62626E` | 5,50 : 1 | `#17171C` |
  | `primary-100 #FFEFCC` | `#62626E` | 5,29 : 1 | `#17171C` |
  | `ink-200 #DEDEE3` | `#51515C` (`#62626E` hätte nur 4,49 : 1) | 5,84 : 1 | `#17171C` |
  | dunkel `ink-700` bis `ink-950` | `#BCBCC6` | 6,07 : 1 (auf `ink-700`) bis 10,08 : 1 | `#F4F4F5` |

  Auf `primary-500`/`primary-600` (Amber-Flächen) gibt es keinen gedimmten Zustand; dort bleibt Text `#17171C` bzw. `#101014`.
- Bestandsrahmen und Hintergrundwechsel des aktiven Schritts bleiben erhalten (Rahmen, Gewicht 600, Markierung).
- Dekorative Linien und gestrichelte Rahmen (`.opening` `#D28A13`) sind Nicht-Text und bleiben.
- Übergänge laufen über `color` und `background-color` mit 300 ms statt über `opacity`. Bei reduzierter Bewegung gilt der Endzustand [BESTAND].
- Betroffen sind mindestens `IllustrationScene.module.css` `.stockMovement` (heute 0,5) und `ConnectedScene.module.css` `.opening` (heute 0,35). Paket (a) prüft alle 22 Snippet-Seiten im Animationszustand (§ 11).
- Die Mini-UI bleibt von der Typoskala ausgenommen [05], aber **nicht** vom Kontrast.

---

## 9. Barrierefreiheit (DESIGN-05)

### 9.1 Fokusindikator am Vorfahren (`:focus-within`), Dokumentation für Werkzeug und Code

Bausteine mit gestrecktem Link oder umhüllter Eingabe zeichnen den Fokusring **nicht** am fokussierten Element, sondern an der Hülle. Ring überall `3px solid #BB7609`, Offset 4 px:

| Baustein | Fokussiertes Element | Ring an | Regel |
|---|---|---|---|
| `FeatureCard` | Titel-Link | `.card` | `.card:focus-within` [BESTAND] |
| `BentoGrid` | Titel-Link (`.link:focus-visible { outline: none }`) | `.tile` | `.tile:focus-within` [BESTAND] |
| `FeatureList` | Name-Link | `.item` | `.item:has(.link:focus-visible)` [BESTAND] |
| `LinkKarten` | Titel-Link (`::after` gestreckt) | Karte | `:focus-within` [09] |
| Werkzeugkarten `/rechner` (neu) | Sekundärbutton-Link (gestreckt) | `article` | `:focus-within` (§ 1.4) |
| Rechnerfelder (neu) | `input` (`outline: 0`) | `.inputWrap` | `.inputWrap:focus-within` (§ 1.3) |
| `ComparisonTable`, Prosa-Tabellen | Scrollbereich selbst | Scrollbereich | `:focus-visible` [BESTAND] |

**Regel für neue Hüllen:** Am inneren Element wird `outline: none` nur gesetzt, wenn die Hülle per `:focus-within` oder `:has(:focus-visible)` einen gleichwertigen Ring zeichnet. Ringkontrast ≥ 3 : 1 gegen die angrenzende Fläche (Werte in § Color).

**Prüfalgorithmus (D-07, [R] Pattern 3):** Das fokussierte Element **und bis zu vier Vorfahren** einschließlich `::before` und `::after` werden gegen einen Ruhezustand-Schnappschuss verglichen, der vor dem ersten Tab erhoben wird (`outline-style/width`, `box-shadow`, `border-color`, `background-color`, `text-decoration-line`). Sichtbar heißt: Die Signatur unterscheidet sich, und mindestens eine Ebene hat `outline` ≠ `none` mit Breite > 0, `box-shadow` ≠ `none` oder einen Farbwechsel.

### 9.2 Tastaturbedienung (Prüfkriterium)

- **Reihenfolge:** Sprunglink → Header → Brotkrumen → Kopf → Inhalt in DOM- und Sichtreihenfolge. Es gibt keine `tabindex` > 0.
- **Rechner:** Navigation → Felder in Formularreihenfolge → Rechenwahl (Radiogruppe, Pfeiltasten) → USt-Kontrollkästchen → Reset → Ergebnis-`summary` → Übernahme-Link. Ergebnisse werden über `aria-live="polite"` angesagt [BESTAND]. Eingaben sind ohne Maus vollständig ausfüllbar.
- **Karten:** ein Tabstopp je Karte (`LinkKarten`, Werkzeugkarten).
- **`FaqList` und Rechenweg:** `summary` öffnet und schließt mit Enter und Leertaste.
- **Tabellen:** Der Scrollbereich ist fokussierbar und mit Pfeiltasten scrollbar (`scrollable-region-focusable`).
- **Keine Tastaturfalle:** Der Fokus kehrt nach Elementzahl + 20 Schritten zum Dokumentanfang zurück.
- **Kein Fokus** auf unsichtbaren Elementen (geschlossenes Menü, `inert`-Mini-UI).
- **WCAG 2.4.11:** Das fokussierte Element ist nicht von der Sticky-Kopfleiste verdeckt (`elementFromPoint` im Mittelpunkt, `scroll-padding-top: 100px` [BESTAND]).

### 9.3 Zielgröße (`target-size`, Prüfkriterium)

- axe `target-size` (WCAG 2.2 AA 2.5.8, ≥ 24 × 24 px oder ausreichender Abstand) ergibt 0 Verstöße auf allen 158 Seiten und allen fünf Breiten.
- Projektmaß für alle in dieser Phase neu gestalteten Bedienelemente ist **≥ 44 px Höhe**: Rechnernavigation, Reset (44), Übernahme-Link (48), Rechenwahl (48), Eingabefelder (48), `summary` (44), Brotkrumen [BESTAND]. Karten sind vollständig klickbar.
- Links im Fließtext der Rechtsprosa sind nach der Inline-Ausnahme von 2.5.8 ausgenommen.

---

## 10. Copywriting Contract

Unverändert aus [05]–[09]: „Sie“, Satzschreibung, aktive Verben, keine Ausrufezeichen, keine Füllwörter, keine Superlative. Preise, Testtage und Credits kommen nur aus `lib/site.ts`. **Inhaberregel L-1 (22.10.2026):** Es wird nur genannt, was unterstützt wird, positiv und ohne Negativlisten. Jede neue Funktionsaussage nennt die Lizenz (D-03). Fließtexte bestehender Seiten werden nicht umgeschrieben (D-04): Rechtstexte bleiben wörtlich (§ 3.3), und Rechner- sowie Support-Texte werden nur auf Bausteine verteilt.

| Element | Copy |
|---------|------|
| Primary CTA | „10 Tage kostenlos testen“ (Zahl aus `site.trialDays`) → `site.ctaUrl`, `.v2-btn-cta` mit Icon `ArrowUpRight`, nur im `CtaBand` auf Rechner- und Support-Seiten |
| CTA-Band Rechner (alle drei) | „Von der Kalkulation zum Angebot.“ (32) / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ (51) / Sekundärlink „Angebotsfunktionen ansehen“ (26) → `/funktionen/angebote`. Direkt darüber die Notiz „Lernen Sie die Angebotsfunktionen von CraftOS kennen und bringen Sie Ihre Aufträge ins System.“ (94, Bestand, K6) |
| `LinkKarten`-Listennamen (K5) | `/support`: „Kontaktweg“, „Hilfe und Ratgeber“ · 404: „Einstiege“ |
| CTA-Band `/support` | „Machen Sie Platz für Ihr Handwerk.“ (34) / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ (51) / Sekundärlink Standard „Preise ansehen“ → `/preise` |
| Kopf-Hinweis Rechner | „Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.“ (58) [BESTAND] |
| Eyebrows | Rechner „Rechner“ (7) · `/support` „Kontakt & Support“ (17) · Rechtsseiten „Rechtliches“ (11) · 404 „Seite nicht gefunden“ (20) |
| Empty state heading | 404 (der einzige „Nichts da“-Zustand dieser Phase): „Hier geht es nicht weiter. An anderer Stelle schon.“ (51) [BESTAND] |
| Empty state body | „Diese Adresse ist nicht verfügbar. Über die Startseite oder das Hilfezentrum finden Sie den passenden Einstieg.“ (111) [BESTAND], danach H2 „So geht es weiter“ (17), Lead „Wählen Sie den Einstieg, der zu Ihrer Frage passt.“ (50) und drei Karten (Texte § 4) |
| Error state (Besucher) | Rechner-Feldfehler wörtlich [BESTAND]: „Bitte füllen Sie dieses Feld aus.“ bzw. „Verwenden Sie eine Zahl wie 1.250,50 mit höchstens zwei Nachkommastellen.“, angezeigt unter dem Feld, `aria-invalid` und `aria-describedby`. Verlust-Hinweis: „Dieser Preis deckt Ihre erfassten Kosten nicht. Es fehlen {Betrag}.“ |
| Error state (Build/Test) | „ContentKopf: crumbs={null} ist nur auf der 404-Seite erlaubt – crumbsFor(pfad) verwenden.“; „Referenz {datei} fehlt – auf unverändertem Stand erzeugen.“; „data-rechtstext fehlt“; „Rechtstext {seite}: versteckter Inhalt (‚{klasse}‘) im Container – Text muss sichtbar bleiben.“; „ContentKopf: hinweis hat {n} von 80 Zeichen – Satz kürzen.“; „Rechtstext {seite} weicht vom Wortlaut ab (erste Abweichung bei Zeichen {i}: ‚{ist}‘ statt ‚{soll}‘) – nur Darstellung ändern.“; „{datei}: font-weight {w} gefunden – nur 400 und 600 verwenden.“; „{datei}: text-primary-600/text-ink-400 als Textfarbe – #784B10 bzw. #62626E verwenden.“ |
| Funktionskarten (§ 5) | Kassenbuch: „Bargeld täglich mit laufendem Bestand buchen, für Admin und Büro-Zugänge mit Finanzberechtigung.“ (96) · § 13b: „Bauleistungen ohne Umsatzsteuer mit Hinweis nach § 13b UStG abrechnen, mit Voll-Lizenz.“ (87) · Kachel § 13b: „Kunden als Bauleister markieren und Rechnungen ohne Umsatzsteuer mit Hinweis nach § 13b UStG fertigstellen.“ (107) |
| Destructive confirmation | Keine destruktiven Aktionen. „Werte zurücksetzen“ im Rechner stellt die Beispielwerte wieder her, speichert und löscht nichts [BESTAND] und braucht deshalb keine Bestätigung. |

---

## 11. Prüfkriterien (nur lokal, globale Regel 5; schwere Läufe unter `.heavy-lock`, D-34)

| Prüfung | Werkzeug | Erwartung |
|---|---|---|
| Rechtstexte wörtlich | Vitest `tests/rechtstexte-wortlaut.test.ts` (neu, (c), erster Commit) | Blockfolge von `[data-rechtstext]` mit Tags und `href` gleich der Referenz (`readFileSync` + `toBe`, fehlende Referenz = rot); eigener Test für die Container-Funktion mit `div`-Zähler; U+00A0 erhalten; keine `sr-only`/`hidden` im Container; H1 getrennt gleich `zielwerte(pfad).h1`. Fehlertexte § 3.3 |
| Phase-9-Köpfe unverändert | Vitest `tests/contentkopf-unveraendert.test.ts` (neu, (c), vor der ersten Kopfänderung) | Kopf-Markup von `/hilfe/rechnung-fertigstellen`, `/blog` und `/hilfe/kategorie/rechnungen` Byte für Byte gleich der Referenz von `main`; CSS-Grundregeln von `ContentKopf.module.css` unverändert (K3) |
| Rechner unverändert | Vitest `calculators.test.ts`, `calculator-hydration.test.ts`; Playwright `browser-functional.pw.cjs` Z. 37–142, `navigation.pw.cjs` Z. 177; `performance-audit.mjs` füllt „Personalkosten pro Jahr in Euro“ | grün ohne Testanpassung an Logik, Feldnamen oder Beschriftungen |
| Köpfe und Bausteine | Vitest `tests/kernseiten.test.ts` (Fälle ergänzt, (c)) | Rechner, `/support`, Rechtsseiten und 404 rendern `ContentKopf` (`section[data-abschnitt="kopf"][data-tone="light"]`), keine Altklassen `section-space`, `eyebrow`, `section-intro`, `btn-cta`, `btn-secondary`, `soft-panel`, `split-section`, kein `PageHero`. Eine `null`-Kette kommt im Repo nur in `app/not-found.tsx` vor: Der Grep-Test sucht `crumbs={null}`, `crumbs:\s*null` und Zuweisungen von `null` an Variablen, die als `crumbs` übergeben werden (K3). H1 = `zielwerte(pfad).h1` außer bei 404. Überschriftenfolge ohne Sprung. Texte § 10 im Budget |
| Gewichte und Farben | Vitest (neu, (c)) | In `app/{rechner,support,impressum,datenschutz,agb}/**`, `app/not-found.tsx`, `components/{legal,calculators}/**` und `components/content/ContentKopf.*` gibt es kein `font-weight: 500/700/800`, kein `font-medium/bold/extrabold`, kein `text-primary-600` und kein `text-ink-400`. Fehlertexte § 10. **`components/CraftOSLogo.tsx` prüft (c) nicht** (K2); diese Datei prüft Paket (b) im eigenen Logo-Test (bei SVG: keine Schriftklassen mehr; bei Subset-Alternative: nur die Logo-Subset-Variablen) |
| 404 | Playwright `tests/e2e/a11y.pw.cjs` ((a), Übergabe der Fälle durch (c)) | `GET /gibt-es-nicht-a11y` liefert Status 404, `meta[name="robots"]` enthält `noindex`, keine Brotkrumen, drei Karten mit Zielen `/`, `/hilfe` und `/funktionen` |
| Funktionskarten | Vitest `funktionsgruppen.test.ts`, `funktionsdetails.test.ts`, `funktionen-seite.test.ts`, `navigation.test.ts`, `llms.test.ts`; Playwright `home-navigation.pw.cjs` ((d)) | 10 beworbene Extras, 32 Einträge. `rechnung` und `buchhaltung` je 1 Extra. Kachel § 13b `wide` mit `zusatz`, Rasterfolge `md·sm·sm·wide·wide·wide`. Mega-Menü unverändert ohne Extras. Nutzensätze ≤ 100 und 1 Satz. Wortliste L-1 0 Treffer |
| Bento-Bodenausrichtung | B10-Messskript (Muster 07-08) vorher/nachher, (c) | Leerraum unter dem Text ≤ 1 px, Kachelhöhen ±1 px, Visual → Titel ≥ 24 px (§ 6.1). **Ausnahme `/funktionen/rechnungen` (K2):** Dort fügt Paket (d) die § 13b-Kachel hinzu, deshalb gilt für diese Seite in (c) nur „Leerraum ≤ 1 px“ und „Visual → Titel ≥ 24 px“. 10-06 misst die Seite auf dem zusammengeführten Stand neu und legt dort die Kachelhöhen als neuen Sollwert fest (Folge `md·sm·sm·wide·wide·wide`, keine leere Rasterzelle) |
| Caption 360 px | Playwright `design-v2.pw.cjs` (Fall ergänzt, Übergabe an 10-06) | § 6.2 auf `/preise`, `/vergleich/plancraft-alternative`, `/vergleich/handwerkersoftware-kleine-betriebe`, `/` und `/styleguide`. `<caption>` mit Text bleibt (bestehende Tests grün) |
| Logo | Playwright-Screenshot-Vergleich und Request-Log, (b) | § 7.4 |
| Darstellung je Breite | Playwright `design-v2.pw.cjs` und `visual-audit.mjs` (Routen ergänzt laut D-14) bei 360, 390, 768, 1024 und 1440 | Kein horizontaler Seitenscroll. H1 `scrollWidth ≤ clientWidth`. Bei 360 × 640 liegt die Unterkante von Rechner-Hinweis und 404-Lead ≤ 640. Rechner: Formular und Ergebnis nebeneinander ab 1024, darunter gestapelt; Feldpaare zweispaltig ab 768. Werkzeugkarten 1 / 2 Spalten |
| axe | `scripts/a11y-audit.mjs` ((a)), 158 Seiten × 5 Breiten Chromium; WebKit-Vorlagen inklusive Rechner, `/support`, Rechtsseite und 404 | Tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` plus `color-contrast-enhanced` (Reihenfolge `.options()` vor `.withTags()`). **0** `serious`/`critical`, **0** `color-contrast` jeder Wirkung, **0** Großtext-Knoten mit erwartetem Verhältnis 4,5 : 1, **0** `target-size`. Die 22 Snippet-Seiten werden zusätzlich ohne reduzierte Bewegung in mindestens drei `data-phase`-Zuständen geprüft (§ 8) |
| Tastatur | `a11y-audit.mjs` und `a11y.pw.cjs` ((a)) | § 9.1 und § 9.2 auf allen Seiten und Breiten; Rechnerfelder per Tab und Eingabe bedienbar; `summary` mit Enter und Leertaste |
| Lighthouse Accessibility (Gate, K13) | `performance-audit.mjs --lighthouse` (Kategorie zusätzlich, ein Lauf je URL) | **Accessibility = 100** auf `/impressum` (heute 96) und den fünf Vorlagen aus QA-04 (Gate-Seiten aus D-11: `/`, `/funktionen` und `/funktionen/zeiterfassung`, `/gewerke/elektriker`, `/vergleich/plancraft-alternative`, `/blog/handwerkerrechnung-schreiben`). Auf `/datenschutz`, `/agb`, `/support` und den drei Rechnerseiten wird der Wert berichtet (Soll 100, kein Gate) |
| Lighthouse Best Practices, SEO (nur Bericht, K13) | dito | Werte je URL im Bericht; kein Gate |
| Lighthouse Performance (QA-04) | `performance-audit.mjs --lighthouse` ((b), allein unter Sperre) | Gate-Seiten (D-11): Median aus 3 Läufen mit Score ≥ 95 und LCP < 2.500 ms, Arbeitsziel ≤ 2.300 ms. `/rechner/stundensatz` zur Information. CLS 0 auf allen Phase-10-Seiten |
| SEO | `node scripts/seo-audit.mjs` (sitewide) und `route-audit.mjs` | 0 Verstöße: Title, Description und H1 laut Map; genau eine BreadcrumbList auf Rechner, `/support` und Rechtsseiten; Schema unverändert (`CollectionPage`, `WebApplication`); 0 defekte Links (Karten, `mailto`) |
| Sichtnachweis | Screenshot 1440 px `/preise` | § 6.3 |

---

## 12. Besitz und Reihenfolge (Ergänzung zu D-32/D-33)

| Teil | Paket | Hinweis |
|---|---|---|
| § 1–4, § 6.1, § 6.2, K1/K2, `DESIGN-V2.md` § 19 „Phase 10“ (Kaskade, J1–J12, Verweis auf diesen Vertrag) | (c) | Erster Commit nur Schutztest (§ 3.3), danach der Vergleichstest der Phase-9-Köpfe (K3) vor der ersten Kopfänderung. Übergabeliste an (a): Testfälle für 404, Caption und Tastatur auf Phase-10-Seiten sowie die neuen Routen für `visual-audit.mjs`. Übergabeliste an 10-06: Umzug von `HINWEIS_MAX` nach `budgets.ts`, Neumessung B10 auf `/funktionen/rechnungen` |
| § 5 (Daten, Texte, Kacheln, Zähltests) | (d) | `FeatureList` und Mega-Menü bleiben unverändert |
| § 7 (Logo, `layout.tsx`) | (b) | Zuerst Lizenzprüfung (§ 7.1), dann Referenzscreenshots in eigenem Commit vor der Änderung. (b) prüft `CraftOSLogo.tsx` selbst (K2). Die Mini-UI-Zeile aus § 7.3 kommt in die Übergabeliste an (a) |
| § 8, § 9, `a11y-audit.mjs`, `a11y.pw.cjs` | (a) | Der Prüfalgorithmus wertet Vorfahren (§ 9.1) |
| Gesamtnachweis § 11 | 10-06 | Auf dem zusammengeführten Stand; die Zahlen kommen in `PHASE-10-ROLLOUT.md` |

Nicht gelöscht wird (Inhaberliste „Freigabe zum Entfernen nötig“, D-04): `components/ui/PageHero.tsx`, die Funktion `CalculatorCta`, die Altklassen `section-space`, `section-intro`, `btn-secondary`, `soft-panel`, `split-section` und `.eyebrow`/`.spec-label` (soweit ungenutzt) sowie die Schriftdateien Clash 500/700 und General 500.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | keine – shadcn nicht initialisiert (Tool: none) | not applicable |
| Drittanbieter-Registries | keine | not applicable |
| 21st.dev | keine Blöcke; nur Inspiration über `21st_magic_component_inspiration` (in dieser Sitzung nicht verfügbar), kein übernommener Code | not applicable (kein Code-Import) |

Neue npm-Abhängigkeiten aus diesem Vertrag: **keine**. Die Glyphenumrisse des Logos entstehen einmalig im Scratchpad (§ 7.1). `lighthouse@13.5.0` ist eine Prüfabhängigkeit aus D-12 und [R], nicht Teil dieses Vertrags.

---

## Annahmen ohne Inhaberrückfrage ([ERMESSEN], Inhaber nicht erreichbar, „Mach, wie du es richtig findest“)

| # | Entscheidung | Begründung |
|---|---|---|
| A1 | `ContentKopf` statt `FunktionsKopf` für alle Phase-10-Seiten | `FunktionsKopf` erzwingt Textänderungen (1-Satz-Lead, Keyword-Span, Sekundärlink) und einen dunklen Kopf mit Test-CTA. Der helle Kopf passt zu Rechtsseiten, Hilfe-nahen Seiten und Rechnern [R]. |
| A2 | 404: `crumbs={null}` und zweisätziger `lead` (K1) | Das ist die kleinste Änderung ohne neuen Baustein und ohne Wortänderung; die Lösung ist per Grep auf eine Datei begrenzt. |
| A3 | 404-Eyebrow „Seite nicht gefunden“ und neue H2 „So geht es weiter“ mit Lead | Die Eyebrow lag über dem Budget und enthielt einen Mittelpunkt. Vor `LinkKarten` braucht es eine H2 (H1 → H3 wäre ein Sprung); D-18 erlaubt „sinngemäß“. |
| A4 | Bento-Bodenausrichtung statt Dreispaltenraster (J3) | Bewährtes Muster der lg-Kacheln; das Dreispaltenraster würde in bestehenden Kompositionen Lücken erzeugen. |
| A5 | Im CTA-Band der Rechner steht der Standardsatz; der Bestandssatz bleibt als Notiz direkt darüber (J8, K6) | D-15 verlangt `CtaBand`, der Bestandssatz hat 94 > 80 Zeichen; nach D-04 wird nichts entfernt. Titel und Ziel bleiben. |
| A6 | `/rechner`: Einstiegsfrage vor den Karten (J7) | Keine neuen Texte, Antwort zuerst, keine H2 in Kartengröße. |
| A7 | Rechner-FAQ als `FaqList` ohne zusätzliches FAQPage-Schema | Alle acht Einträge passen ohne Textänderung. Ein Schema wäre eine SEO-Änderung über D-15 hinaus; `faq-schema` prüft nur Schemafragen gegen Sichtbares. |
| A8 | `/support` in zwei Abschnitten, Kontaktkarte einzeln (J9), Meta-Zählung bei Hilfe und Ratgeber | Beide Bestands-H2 und alle Sätze bleiben. Die Meta-Zahlen sind datengetrieben und kein neuer Werbetext. |
| A9 | Rechtsprosa-H2 32 px wie Artikelprosa (J5) | Eine Prosa-H2-Größe sitewide; keine fünfte Schriftgröße. |
| A10 | Kassenbuch-Lizenz als „Admin und Büro-Zugänge mit Finanzberechtigung“ (K8) | Gleiche Sprache wie die bestehende FAQ auf `/funktionen/buchhaltung`; deckt Admin und Büro mit dem Schalter „Globale Finanzbereiche“ ab. „Finanzen sichtbar“ ist laut [09] ein Altbegriff. „Büro-Leitung“ allein wäre ungenau, weil die Rolle über „Alle Projekte“ bestimmt wird und Finanzbereiche einzeln schaltbar sind. |
| A11 | Kein `CtaBand` auf der 404-Seite (J10) | Orientierung vor Verkauf; D-18 nennt nur Kopf und Linkkarten. |
| A12 | Validierungsfehler in `#B32F28` (J12) | Token statt Einzelwert; Kontrast ≥ 5,66 : 1; Text bleibt Pflicht. |

---

## Korrekturen nach Checker (23.10.2026, mit Entscheidungen des Koordinators)

| # | Inhalt | Eingearbeitet in |
|---|---|---|
| K1 | Wortlaut-Test als Blockfolge mit Tags und `href`, Container per `div`-Zähler mit eigenem Test, Entities allgemein, U+00A0 erhalten, `sr-only`/`hidden` verboten, H1 getrennt gegen `zielwerte()`, keine Snapshot-API (`readFileSync` + `toBe`, fehlende Referenz = rot) | § 3.3, § 10, § 11 |
| K2 | (c) prüft `CraftOSLogo.tsx` nicht, (b) prüft selbst; B10-Ausnahme `/funktionen/rechnungen` mit Neumessung in 10-06; `visual-audit`-Routen bei (a), Übergabe durch (c); `components/content/**` außer `ContentKopf` bei (a), nur per Übergabe; `HINWEIS_MAX` als Übergabepunkt an 10-06 | Design System (Besitz), K2-Zeile, § 6.1, § 11, § 12 |
| K3 | `data-crumbs="ohne"` mit CSS nur dafür; Reihenfolge von `hinweis`; Byte-Vergleichstest auf drei Phase-9-Seiten; Grep-Test erweitert | Design System (K1, K2, Absatz K3), § 11 |
| K4 | `fonts.ready`, Ausschnitt nur des Schriftzugs, `deviceScaleFactor: 2`, `maxDiffPixels`, gleiche Engine und gleicher Rechner, `--update-snapshots` nach der Änderung verboten, ±0,5 px einheitlich, `sm`/`lg` skalieren, Lizenzprüfung mit Subset-Alternative | § 7.1, § 7.2, § 7.4, J11, § 12 |
| K5 | Listennamen „Kontaktweg“, „Hilfe und Ratgeber“, „Einstiege“ | § 2, § 4, § 10 |
| K6 | Rechner-CTA-Satz (94) bleibt als Notiz über dem CTA-Band, nichts entfernt | J8, § 1.2, § 10, A5 |
| K7 | 404-Karte „Funktionen“: „… mit Plattformen und Lizenzen im Überblick.“ (86) | § 4 |
| K8 | Kassenbuch: „… für Admin und Büro-Zugänge mit Finanzberechtigung.“ (96), Beleg `Kassenbuch.tsx` Z. 45/113 | § 5, § 10, A10, Messnachweis |
| K9 | Verlust-Hinweis bleibt im Bestandswortlaut | unverändert (§ 10) |
| K10 | Satz auf den Akzent `#F2AF38` eingegrenzt; Dimmstufe je Szenenhintergrund festgelegt (`#51515C` auf `ink-200`) | § 1.4, § 8 |
| K11 | Ungültiges Feld: 1-px-Rahmen plus `box-shadow: inset 0 0 0 1px`, Innenabstand bleibt 16 | § 1.3 |
| K12 | 404-Falz: H2 bei 491 px | § 4 |
| K13 | Accessibility 100 ist Gate für `/impressum` und die fünf Vorlagen; Best Practices und SEO nur Bericht | § 11 |

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS (FLAG K7–K9 eingearbeitet)
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS (FLAG K10 eingearbeitet)
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS (FLAG K11 eingearbeitet)
- [x] Dimension 6 Registry Safety: PASS

Geprüft: 2026-10-23, gsd-ui-checker. Korrekturen K1–K13 am selben Tag eingearbeitet, mit den Entscheidungen des Koordinators.

**Approval:** approved 2026-10-23
