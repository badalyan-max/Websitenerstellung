---
phase: 06
slug: startseite-navigation-und-funktions-bersicht
status: approved
reviewed_at: 2026-10-21
shadcn_initialized: false
preset: none
created: 2026-10-21
---

# Phase 06 — UI-Designvertrag: Startseite, Navigation und Funktionsübersicht

> Visueller und interaktiver Vertrag für den Umbau von `/` (Startseite), Hauptnavigation (Header mit Mega-Menü „Funktionen“ und mobilem Drawer) und `/funktionen` der Website craftos.eu (`craftos/`, Next.js 16.3.4 App Router, React 19.2.7, Tailwind 4.3.0 CSS-first). Erstellt vom gsd-ui-researcher, geprüft vom gsd-ui-checker.

**Grundsatz:** Dieser Vertrag erfindet **nichts** neu. Gestaltungsrichtung „Werkbank-Präzision“, Tokens, Typoskala, Farben, Amber-Liste, Fokusring, Abstände, 96-px-Ausnahme, Textbudgets, Bausteinverträge und Bewegungsregeln gelten **unverändert** aus dem genehmigten Vertrag `.planning/phases/05-produktwahrheit-designsystem-v2-und-medienpipeline/05-UI-SPEC.md` (im Folgenden **[05]**) [CONTEXT D-01]. Dieser Vertrag legt nur fest, **wie** die vorhandenen Bausteine auf den drei Oberflächen zusammengesetzt werden, welche Texte sie tragen und wo drei kleine, budgetgeprüfte Ergänzungen nötig sind.

**Quellenkennzeichnung:** [CONTEXT D-xx] = gesperrte Entscheidung aus `06-CONTEXT.md`, [RESEARCH] = `06-RESEARCH.md`, [05] = genehmigter Phase-5-Vertrag, [BESTAND] = vorhandener Code, [ERMESSEN] = Entscheidung des UI-Researchers im Rahmen von „Claude's Discretion“, [KASKADE] = Ergebnis der Design-Kaskade (siehe unten).

**Faktenquellen (ausschließlich):** `lib/site.ts` (`site.trialDays`, `site.ctaUrl`, `site.appUrl`, `tarife`, `zahlung`), `lib/funktionen.ts` (16 Detailseiten, Namen, Icons, Plattformen, `intro`/`points`), `lib/product-register.ts` (`liveExtras` mit `advertised: true` = 14 Einträge, `mobileLocales` = 21, `productBasis.checkedAt`), `docs/product-pricing-snapshot.json`, Hilfeartikel `content/hilfe/*.md`. Zahlen, Preise und Testtage stehen **nie** als Literal im JSX, sondern werden aus diesen Modulen abgeleitet [05 Typography; RESEARCH Anti-Patterns]. Die Zahlen in diesem Dokument (10, 29,95 €, 9,95 €, 21) sind nur Lesehilfe.

---

## Design-Kaskade (Projekt-CLAUDE.md, „Automatische Kette: Frontend-Arbeit“)

### 1. frontend-design (Leitlinie gelesen, nicht kopiert)

Gelesen: `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/e68e375d2286/skills/frontend-design/SKILL.md` (neuester Cache-Stand vom 20.10.2026; byte-identisch mit dem in Phase 5 gelesenen Stand `a0b04d9ddcca`). Kein Skill-Werkzeug in dieser Sitzung; die Leitlinie wurde gelesen und auf die freien Achsen dieser Phase angewendet. Bei konkreten Werten gilt [05].

**Erster Durchgang (Plan):**
- *Subjekt:* Handwerksbetriebe (Inhaber, Büro, Bauleitung, Monteure); Hauptaufgabe der Startseite: in einem Blick verstehen „ein System für Büro und Baustelle“ und den Test starten.
- *Hero:* Die Leitlinie verlangt, mit dem charakteristischsten Element des Subjekts zu öffnen → das Produkt selbst (Plantafel im Browser + Einsatzliste auf dem Handy, `DevicePair`) neben einer sachlichen Keyword-Überschrift.
- *Kühnheit an genau einer Stelle:* Auf der Startseite ist das der Geräterahmen im Hero; alles darunter bleibt flach (Kacheln, Liste, Tabelle).
- *Navigation:* Das Mega-Menü ist ein Werkzeugschrank, kein Schaufenster: sechs Arbeitsablauf-Spalten mit kleinem Icon, Kurzbeschreibung und Funktionslinks; keine Kartenoptik.

**Zweiter Durchgang (Abgleich mit den generischen Mustern der Leitlinie, Korrekturen):**

| Generisches Muster laut Leitlinie | Befund im Bestand / naheliegender Entwurf | Entscheidung Phase 6 |
|---|---|---|
| „Große Zahl mit kleinem Label, Kennzahlen und Verlaufsakzent“ als Standard-Hero | Naheliegend für SaaS-Heros | Nicht im Hero. Kennzahlen stehen als eigener, flacher Abschnitt **nach** dem Hero (`KeyFacts`, ohne Verlauf). |
| Ein Wort in der Überschrift farbig hervorheben | Bestand: „Weniger Büro.“ in Amber | Entfällt. H1 einfarbig `#F4F4F5`. |
| Eyebrow in Großbuchstaben über jeder Überschrift | Bestand `.eyebrow` „Die Handwerkersoftware für Ihren Betrieb“ | Kein Eyebrow im Hero. Eyebrows nur auf `/funktionen` als Gruppenname (echte Kategorie). |
| Verlaufsflächen als Dekoration | Bestand `.home-hero`: radialer Amber-Verlauf `#8c5a172f` | Entfällt (verletzt [05] „keine Amber-Verläufe als Dekoration“). Das 72-px-Linienraster bleibt als einziges Hero-Motiv [05 Gestaltungsrichtung]. |
| SaaS-Kartenbaukasten (gleiche Karten, gleicher Schatten) | Mega-Menüs werden oft als Raster gleicher Icon-Karten mit Schatten gebaut | Verworfen. Menügruppen sind flache Spalten ohne Kartenrahmen; Hierarchie über Icon-Feld, Gewicht und Einzug. |
| Meta-Ketten „A · B · C“, Pfeil „→“ an Linktexten | Naheliegend für die Fußleiste des Mega-Menüs | Verworfen. Fußleiste als Liste mit 24 px Abstand; keine Pfeilglyphen; nur der Haupt-CTA trägt `ArrowUpRight` [05]. |
| Einblendungen beim Scrollen, Hover-Effekt an jeder Karte | Bestand: zwei animierte `FeatureSnippet`-Szenen auf `/` | Beide Szenen entfallen auf `/` (D-04); keine Einblendungen. Bewegung nur als Antwort auf Nutzeraktion (Chevron 150 ms, FAQ-Symbol 150 ms, Hover 150–180 ms). |
| Überdimensionierte Display-Schrift (Bestand 42–76 px) | Bestand-H1 `clamp(42px, 5.2vw, 76px)` | Auf die Display-Stufe aus [05] begrenzt (32–48 px), damit „Handwerkersoftware“ bei 360 px ungetrennt in eine Zeile passt und der Hero oberhalb der Falz bleibt (D-20). |

### 2. ui-ux-pro-max (ausgeführt am 21.10.2026, lokal)

```
py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas mega menu navigation feature overview" --domain ux
py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "saas landing page hero handwerk software" --domain ux
# ergänzend:
py -3.12 -X utf8 .../search.py "mobile menu dropdown keyboard focus touch target" --domain ux
py -3.12 -X utf8 .../search.py "saas hero product screenshot cta" --domain landing
```

| Empfehlung (Treffer) | Übernommen? | Umsetzung / Begründung |
|---|---|---|
| Sticky Navigation darf Inhalt nicht verdecken (Medium) | Ja | Header bleibt `sticky`; Gruppenanker auf `/funktionen` nutzen `scroll-margin-top: 100px` [BESTAND `SectionHeader.module.css`]; geöffnete Menüs überlagern bewusst, im Ruhezustand verdecken sie nichts. |
| Breadcrumbs ab 3+ Ebenen (Low) | Nur als Schema | `/funktionen` ist Ebene 2; sichtbarer Breadcrumb verworfen (auch Detailseiten zeigen keinen). BreadcrumbList-JSON-LD bleibt Pflicht (D-10). |
| Zurück-Taste muss vorhersagbar funktionieren (High, mobil) | Ja | Menüzustand wird **nicht** in die History geschrieben (kein `pushState` beim Öffnen); Anker sind normale Links, Zurück springt zur vorigen Position. |
| Bildoptimierung (High) | Ja, implizit | Hero und Menü enthalten keine Rasterbilder (Produkt als Code-UI); LCP-Element ist die H1. Keine neuen Bilder in dieser Phase. |
| Aktiver Zustand der Navigation sichtbar machen (Medium) | Ja, angepasst | Aktuelle Seite/Bereich mit 2-px-Unterstrich in `#F4F4F5` auf dem dunklen Header (nicht Amber, damit die Amber-Liste aus [05] unverändert bleibt). |
| Sichtbarer Fokus, Touch-Ziele ≥ 44 × 44 px, ≥ 8 px Abstand zwischen Touch-Zielen | Ja | Fokusring 3 px `#BB7609` [05]; Drawer-Zeilen 48–56 px; Chevron-Schalter 28 × 44 px Desktop, 48 × 56 px mobil. |
| Landing-Muster „Product Demo + Features“ (Hero mit Mockup → Funktionsaufschlüsselung → Vergleich → CTA) | Ja | Deckt sich mit dem Seitenrezept aus [05] und D-02. |
| Landing-Muster „Comparison Table + CTA“ | Teilweise | Nur Lizenzvergleich (Voll-Lizenz / App-Lizenz); Wettbewerbervergleiche sind Phase 8. |
| Landing-Muster „Product Review/Ratings Focused“ | Nein | Keine belegten Bewertungen/Kundenstimmen (Deferred Ideas, MEDIA-03). |

### 3. 21st.dev

**Nicht verfügbar.** `21st_magic_component_inspiration` steht dem UI-Researcher in dieser Sitzung nicht als Werkzeug zur Verfügung; es wurden keine Referenzen abgerufen und keine behauptet. Der Executor ruft vor dem Bau – falls verfügbar – ausschließlich `21st_magic_component_inspiration` mit den Suchbegriffen „mega menu“, „saas hero device mockup“, „feature list compact“ auf und trägt Übernahmen/Verwerfungen in `craftos/docs/DESIGN-V2.md` (neuer Abschnitt „Kaskade Phase 6“) ein; nie `_builder`/`_refiner`. Ist das Werkzeug weiter nicht verfügbar, wird das dort wie in Phase 5 vermerkt.

### 4. Context7

**Nicht als Werkzeug verfügbar** in dieser Sitzung. Ersatz wie in Phase 5: mitgelieferte Doku `craftos/node_modules/next/dist/docs` (Next 16.3.4) – bereits in [RESEARCH] ausgewertet: `generate-metadata.md` (Title-Template gilt nicht für die Root-Seite → vollständiger Title auf `/`), `link.md` (`prefetch`), `05-server-and-client-components.md` (Server Component als Prop/Slot einer Client-Hülle).

### 5. SEO-Check

Semantik, Schema und Barrierefreiheit sind in den Abschnitten „SEO-Vertrag“ und „Barrierefreiheit“ festgelegt. Keine DataForSEO-/SE-Ranking-Aufrufe in dieser Phase außer `seo-report.mjs --etappe rollout-phase06` im Rollout [RESEARCH Project Constraints].

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none – eigenes Token-System in `craftos/app/globals.css` (`@theme`) plus CSS-Module [05, BESTAND]. shadcn wird nicht eingeführt (keine neuen Abhängigkeiten, D-01 „keine neue Bildsprache“). |
| Preset | not applicable |
| Component library | none – v2-Bausteine `craftos/components/v2/*` (React Server Components) [05] |
| Icon library | `lucide-react` 0.475.0 [BESTAND]; Gewerke-Icons über `GewerkIcon` [BESTAND] |
| Font | Clash Display (Überschriften, Kennzahlen) und General Sans (Text, Labels, Navigation) über `next/font/local` [05, BESTAND] |
| Ablageort neu | `lib/funktionsgruppen.ts` (server-only, 6 Gruppen, 30 Einträge), `lib/home-content.ts` (alle Startseitentexte), `lib/scenes.ts` (FrameScene-Daten aus `lib/styleguide-content.ts` herausgelöst), `components/layout/HeaderShell.tsx` (`"use client"`), `components/layout/ActiveLink.tsx` (`"use client"`, nur `aria-current`), `components/layout/MegaMenu.tsx` (Server), `components/v2/FeatureList.tsx` (+ `.module.css`) [RESEARCH Empfohlene Struktur] |

### Ergänzungen an Bausteinen (nur diese drei, budgetgeprüft, im Stil von [05])

| # | Baustein | Ergänzung | Begründung |
|---|---|---|---|
| E1 | `DevicePair` | Neue Prop `layout?: "default" \| "compact"` (Standard `"default"` = unverändert). `compact`: Phone immer `--phone-w: 160px`; unter 768 px **nicht** zentriert unter dem Browser gestapelt, sondern rechts unten über den Browser gelegt (siehe Hero-Lagen). | D-20: Bei 360 × 640 muss die Produktdarstellung oberhalb der Falz beginnen; der heutige Stapel (Browser + 410-px-Phone) passt nicht [RESEARCH Pattern 4]. |
| E2 | `FeatureList` (neu) | Kompaktliste für die 14 Zusatzfunktionen ohne Detailseite (Vertrag unten). | `FeatureCard` akzeptiert nur Detailseiten-Slugs und verlinkt immer „Mehr zu {Name}“ – für Zusatzfunktionen irreführend [RESEARCH Anti-Patterns]. |
| E3 | Rahmen-Belege | `data-evidence` an `BrowserFrame`/`PhoneFrame`/`DevicePair` wird zur Kurzform `web:<Bildschirmname>` bzw. `app:<Bildschirmname>` (ohne Pfad, ohne Leerzeichen). Voller Belegpfad bleibt nur in den Daten (`lib/scenes.ts`) und in der Vitest-Belegprüfung. | D-16, Review-Punkt LO-05: keine internen Quellpfade im öffentlichen HTML. E2E-Regex wird `^(web\|app):[^\s/]+$`. |

Kurzformen (verbindlich): `web:Plantafel`, `web:Rechnungen`, `app:Einsätze`, `app:Zeiterfassung`, `app:Mängel`, `app:Aufmaß`.

### Abweichungen zu [05] (ausdrücklich gekennzeichnet und begründet)

| # | Stelle | [05] sagt | Phase 6 legt fest | Begründung |
|---|---|---|---|---|
| A1 | Display-Größe | „48px (≥ 1024 px)“, zugleich `clamp(32px, 4vw, 48px)` | **Korrektur der Beschreibung:** 48 px erst ab 1200 px Fensterbreite (Formel unverändert) | Die Formel ergibt bei 1024 px 40,96 px; die Angabe in [05] war in sich widersprüchlich. Keine Wertänderung. |
| A2 | H1 Startseite < 400 px | vier Größen (14/16/20/48 bzw. 32) | **28 px**, nur dieses Element | Gemessen: „Handwerkersoftware,“ bei 32 px 343,9 px > 324 px Container (360 px); D-20 verbietet Trennung. |
| A3 | Amber-Liste Punkt 3 | „Markenzeichen … innerhalb der Geräterahmen (`CraftOSMark`)“ | Punkt 3 umfasst zusätzlich das **Logo im Header** (`CraftOSLogo` mit Amber-Hexagon) | Bestand auf jeder Seite seit vor Phase 5, Marke gesperrt (Phase-5-CONTEXT D-08); [05] nennt es unter „Logo … unverändert“, aber nicht in der Amber-Liste. Klarstellung, keine neue Amber-Verwendung. |
| A4 | Dunkle Flächen | Dunkel „nur Hero, CTA-Band und höchstens eine Kachel je Bento-Raster“ | Zusätzlich **Header (Bestand) und mobiler Drawer** dunkel `#101014` | Der Header ist seit jeher dunkel und nicht Teil des Seiteninhalts; der Drawer ist seine Fortsetzung über dem Inhalt. Die Flächenrhythmus-Regel „zwischen Hero und CTA-Band keine dunklen Abschnitte“ betrifft Inhaltsabschnitte und bleibt unverletzt. |
| A5 | Icon-Feld | Bento-Icon-Visual 24-px-Icon im 48 × 48-Feld, Radius 12 | Menü-Gruppen und `FeatureList`: **40 × 40-Feld, Icon 20 px**, Radius 12, `primary-100`/`primary-800` | Navigations- und Listenzeilen sind dichter als Kacheln; 48 px würde die Zeilenhöhe der Menüspalten sprengen (Panelhöhe bei 1121 × 700 px). 40 = 5 × 8 liegt auf dem Raster; Farben unverändert. |
| A6 | Seitenrezept `/funktionen` | `SectionHeader` je Gruppe + `FeatureCard`-Raster; „jeder Abschnitt = SectionHeader + genau ein visueller Baustein“ | Je Gruppe **`FeatureCard`-Raster und `FeatureList` in einem Abschnitt** | D-18 verlangt die Zusatzfunktionen in einer Kompaktliste **je Gruppe** unter dem Gruppenanker; eine Trennung in zwei Abschnitte würde je Gruppe eine zweite H2 erzeugen und die Anker zerreißen. Die Liste ist unter eigener H3 klar abgesetzt. |
| A7 | Schatten | nur Geräterahmen | zusätzlich Navigationspanels (Bestandsschatten) | Funktionale Überlagerungsebene, siehe Desktop-Layout „Panel-Schatten“. |

---

## Spacing Scale

Unverändert aus [05] (alle Werte Vielfache von 4):

| Token | Value | Usage in Phase 6 |
|-------|-------|-------|
| xs | 4px | Abstand Link ↔ Chevron-Schalter im Desktop-Header, Icon ↔ Text in Badges |
| sm | 8px | Abstand CTA ↔ Sekundärlink gestapelt (< 768 px), Icon-Feld ↔ Gruppentitel im Menü, Lücke zwischen Sprunglinks |
| md | 16px | H1 → Lead, Abstand Gruppenkopf → Funktionslinks im Menü, Zeilenabstand `FeatureList`, Kartenlücke mobil |
| lg | 24px | Hero-Abstand oben < 768 px, Lead → CTA < 768 px, Spaltenlücke Mega-Menü, Kartenlücke ≥ 768 px, Abstand Links der Menü-Fußleiste |
| xl | 32px | Lead → CTA ≥ 768 px, Innenabstand Mega-Menü, Text → Produkt gestapelt, Karten-Raster → `FeatureList` |
| 2xl | 48px | Spaltenlücke Hero ≥ 1024 px, Hero oben 768–1023 px, Abschnittskopf → Inhalt ≥ 768 px, Abschnittsabstand < 768 px |
| 3xl | 64px | Hero oben ≥ 1024 px, Abschnittsabstand 768–1023 px |

**Regeln (aus [05], hier angewendet):** v2-Abschnitte `padding-block` 96 / 64 / 48 px (≥ 1024 / 768–1023 / < 768); Abschnittskopf → Inhalt 48 px ab 768 px, 32 px darunter; Kachel-/Karteninnenabstand 24 px ab 768 px, 16 px darunter.

**Exceptions:**
- 96 px Abschnittsabstand Desktop – unverändert aus [05] (Token `--spacing-section`), nur `padding-block` von v2-Abschnitten ≥ 1024 px.
- Touch-Ziele ≥ 44 × 44 px [05]; Drawer-Zeilen 48 px (Funktionslinks) bzw. 56 px (Hauptpunkte).
- Bestand bleibt bis zur globalen Bereinigung unverändert: Header-Höhe 84 px (≥ 1121 px) / **74 px** (≤ 1120 px; kein 4er-Vielfaches, wird nicht in dieser Phase geändert, weil alle Seiten und die Above-the-fold-Rechnung darauf beruhen); `.site-container` mobil 18 px Rand (`calc(100% - 36px)`); **seitlicher Innenabstand des mobilen Drawers 18 px** (gleicher Wert wie der `.site-container`-Rand, damit Logo, Menü-Schalter und Drawer-Inhalt bündig zur Seitenkante stehen; Bestand `Header.module.css` `.open`); `scroll-margin-top: 100px` der Abschnittsanker (= 4 × 25).
- Keine weiteren Ausnahmen: Overlap im Hero −64 px, Drawer-Einzug 32 px, Drawer-Link `padding-block: 8px` + `min-height: 48px` liegen alle auf der Skala.
- 12 px nur wie in [05]: Innenabstand `.v2-btn-cta` (12 × 24) und Mini-UI.

---

## Typography

Unverändert aus [05]: vier Größen, zwei Gewichte.

| Role | Size | Weight | Line Height | Einsatz in Phase 6 |
|------|------|--------|-------------|-------------------|
| Label | 14px | 600 / 400 | 1.4 | 600: Hauptpunkte im Desktop-Header, Login-Link, Badges, Eyebrow (Gruppenname auf `/funktionen`), Sprunglinks, Fußleiste des Mega-Menüs. 400: Kurzbeschreibung der Menügruppen, Zielhinweis in `FeatureList`, Kennzeichnung, Kennzahlen-Hinweis |
| Body | 16px | 400 / 600 | 1.5 | 400: Funktionslinks im Menü und Drawer, Kartentext, Nutzensätze, FAQ-Antworten, Hero-Lead < 768 px. 600: Gruppentitel im Menü, Hauptpunkte im Drawer, Funktionsname in `FeatureList`, Buttons, Textlinks, FAQ-Fragen |
| Heading | 20px | 600 (Clash) / 400 (General Sans, Lead) | 1.25 / Lead 1.4 | Karten-, Kachel- und Schritttitel (h3); Lead der Abschnittsköpfe; Hero-Lead ≥ 768 px |
| Display | 48px (ab 1200 px Fensterbreite), fließend `clamp(32px, 4vw, 48px)`, 32px unter 768 px; **H1 der Startseite < 400 px: 28 px** | 600 | 1.1 | H1 der Startseite und von `/funktionen`, H2 der Abschnittsköpfe, KeyFacts-Werte, CTA-Band-Überschrift |

**Regeln:**
- Gewichte nur 400 und 600; der Bestand-Header nutzt heute 500 → wird auf 600 (Hauptpunkte) bzw. 400 (Funktionslinks) umgestellt.
- **H1 ohne Silbentrennung (D-20, Pitfall 7):** An beiden H1 `hyphens: manual` (überschreibt die globale Regel `hyphens: auto`); das Hauptkeyword steht in einem `<span>` mit `white-space: nowrap` und `overflow-wrap: normal` – auf `/` „Handwerkersoftware,“ (inkl. Komma), auf `/funktionen` „Handwerksbetriebe“. Prüfung (Playwright, 360/390/768/1024/1440): Breite des Spans ≤ Breite des Containers und `scrollWidth` des Dokuments = Fensterbreite.
- **H1 der Startseite < 400 px: 28 px** (Zeilenhöhe 1.1, verbindlich, deklarierte Ausnahme von der Vier-Größen-Skala nur für dieses eine Element). Begründung (gemessen am 21.10.2026 mit Clash Display 600, `letter-spacing: -0.025em`, Messskript `scratchpad/measure.cjs`): Der Span „Handwerkersoftware,“ ist bei 32 px **343,9 px** breit und passt nicht in den 324-px-Container bei 360 px; bei 28 px sind es **300,9 px** (3 Zeilen). Ab 400 px Fensterbreite (Container ≥ 364 px) gilt wieder die Display-Stufe (32 px → 343,9 px; bei 390 px Container 354 px ebenfalls passend, deshalb liegt die Grenze bei < 400 px, 390 px nutzt 32 px). Weitere Messwerte: 40,96 px (1024 px) → 440,2 px, 48 px → 515,9 px. Sonst keine weitere Schriftgröße.
- **Abweichung zu [05], Korrektur:** [05] nennt „48px (≥ 1024 px)“ und zugleich `clamp(32px, 4vw, 48px)`; die Formel erreicht 48 px erst bei 1200 px Fensterbreite (bei 1024 px = 40,96 px). Phase 6 übernimmt die Formel unverändert und beschreibt sie korrekt („48 px ab 1200 px“); keine Wertänderung.
- Überschriften `letter-spacing: -0.025em`, `text-wrap: balance` [05]; Zahlen `tabular-nums`.
- Keine Großbuchstaben-Labels, keine Kursiv- oder Farbhervorhebung einzelner Wörter [05].
- Mini-UI in Geräterahmen ist von der Skala ausgenommen [05].

---

## Color

Unverändert aus [05]:

| Role | Value | Usage in Phase 6 |
|------|-------|-------|
| Dominant (60%) | `#FFFFFF` | Seitenhintergrund, weiße Abschnitte, Mega-Menü-Panel, Funktionskarten |
| Secondary (30%) | `#F7F3EB` (warm) und `#101014` (dunkel) | Warm: abwechselnde Abschnitte, Kachel- und Kartenbühnen, Hover-Fläche und Fußleiste im Mega-Menü. Dunkel: Header (Bestand), mobiler Drawer, Hero beider Seiten, CTA-Band, genau eine Bento-Kachel |
| Accent (10%) | `#F2AF38` | ausschließlich die Liste aus [05] |
| Destructive | `#B32F28` | nicht verwendet (keine destruktiven Aktionen) |

**Accent reserved for** (Liste aus [05] unverändert; Phase 6 nutzt davon):
1. Hintergrund des Haupt-CTA „10 Tage kostenlos testen“ (Hero, CTA-Band) und „10 Tage testen“ (Header, Drawer) – jetzt `.v2-btn-cta` statt `.btn-cta`.
2. Sechseck-Knoten und Maßlinie der `StepFlow` auf der Startseite.
3. Markenzeichen in Geräterahmen (`CraftOSMark`), aktiver Phone-Tab und – als Klarstellung, Abweichung A3 – das Logo im Header (`CraftOSLogo`, Bestand).
4. Obere Kante (3 px) der Voll-Lizenz-Spalte in der `ComparisonTable` der Startseite.
5. Icon-Farbe auf dunklen Flächen: Gruppen-Icons im mobilen Drawer, Icons der Sprunglinks im Kopf von `/funktionen`, Icon-Feld der dunklen Bento-Kachel.
6. Untere Kante (3 px) des Seitenkopfs von `/funktionen`.
7. Vollflächige Amber-Fläche nur einmal: `StepFlow tone="amber"` auf der Startseite. `/funktionen` hat keine Amber-Fläche.
8./9. Amber-Tönung `#F2AF381F` und Lizenz-Badge-Text `#FFD06A` nur auf dunklen Flächen wie [05].

**Nicht erlaubt (Phase-6-Präzisierungen der [05]-Verbote):** Amber als Text- oder Unterstrichfarbe in der Navigation (Bestand `.groupButton[aria-expanded="true"] { color: #f2af38 }` und Hover in Amber entfallen); Amber-Verlauf im Hero (Bestand `radial-gradient(… #8c5a172f …)` entfällt); Amber-Tönungsfelder im Drawer (Icons dort ohne Feld).

**Navigationsfarben (abgeleitet aus [05]):**

| Zustand | Desktop-Header (dunkel) | Mega-Menü-Panel (weiß) | Mobiler Drawer (dunkel) |
|---|---|---|---|
| Standard | Text `#F4F4F5` | Gruppentitel `#17171C`, Kurzbeschreibung `#62626E`, Funktionslink `#17171C` | Hauptpunkt `#F4F4F5`, Gruppentitel `#F4F4F5`, Kurzbeschreibung `#BCBCC6`, Funktionslink `#F4F4F5` |
| Hover (`hover: hover`) | Unterstrich 1 px `#F4F4F5`, Offset 5 px (wie [05]) | Fläche `#F7F3EB`, Text unverändert | Fläche `#242429` |
| Offen (`aria-expanded="true"`) | Unterstrich 2 px `#F4F4F5`, Chevron 180° | – | Chevron 180° |
| Aktuell (`aria-current="page"` bzw. Bereich `/funktionen*`) | Unterstrich 2 px `#F4F4F5` | Fläche `#F7F3EB`, Gewicht 600 | Linker Balken 2 px `#F4F4F5`, Gewicht 600 |
| Fokus (`:focus-visible`) | `3px solid #BB7609`, Offset 4 px (≈ 5,1:1 auf `#101014`) – ersetzt Bestand 2 px `#f2af38` | wie links (≈ 3,7:1 auf Weiß) | wie links |
| Icon-Feld Gruppe | – | 40 × 40 px, Radius 12 px, Fläche `primary-100 #FFEFCC`, Icon 20 px `primary-800 #784B10` | kein Feld, Icon 20 px Amber `#F2AF38` |
| Trennlinien | `#2C2C34` [BESTAND] | `ink-200 #DEDEE3` | `#2C2C34` [BESTAND] |

---

## Seite 1: Startseite `/`

### Abschnittsfolge (verbindlich, 7 Abschnitte nach dem Hero)

Flächenrhythmus nach [05]: Hero dunkel → Weiß / Amber (einmalig) / Weiß / Warm / Weiß / Warm → CTA-Band dunkel. Jeder Abschnitt = `SectionHeader` (1 H2 + 1 Satz) + genau ein visueller Baustein; zwei aufeinanderfolgende Abschnitte nutzen nie denselben Baustein [05 Seitenrezepte]. Alle Texte liegen in `lib/home-content.ts` und werden per Vitest gegen `TEXT_BUDGET` geprüft (inkl. „genau ein Satz“).

| # | Abschnitt | Fläche | Baustein | H2 (≤ 60) | Lead (1 Satz, ≤ 140) | Zusatz |
|---|---|---|---|---|---|---|
| 0 | Hero | `#101014` + 72-px-Linienraster | eigener Hero (H1, Lead, CTA, Sekundärlink) + `DevicePair layout="compact" tone="dark"` | – (H1, siehe unten) | – | – |
| 1 | Kennzahlen | Weiß | `KeyFacts` (`SectionHeader align="center"`) | „Das Wichtigste auf einen Blick“ | „Sie testen ohne Zahlungsdaten und wählen danach zwischen Voll-Lizenz für das Büro und App-Lizenz für die Baustelle.“ | Fakten siehe unten |
| 2 | Arbeitsablauf | `#F2AF38` | `StepFlow tone="amber"` (6 Schritte), **ohne Eyebrow** (primary-700 auf Amber nur ≈ 2,6:1) | „So arbeitet Ihr Betrieb mit CraftOS“ | „Vom Angebot bis zur Buchhaltung arbeiten Büro und Baustelle in einem System mit denselben Projektdaten.“ | Schritte verlinken auf `/funktionen#<gruppe>` |
| 3 | Kernfunktionen | Weiß | `BentoGrid` (5 Kacheln) | „Kernfunktionen für Büro und Baustelle“ | „Jede Kachel führt zur Seite der Funktion mit Ablauf, Plattformen und passender Anleitung.“ | Textlink unter dem Raster „Alle Funktionen ansehen“ → `/funktionen` |
| 4 | Web-App + Mobile-App | `#F7F3EB` | `PhoneFrame width={240}` (Szene Aufmaß) | „Web-App im Büro, Mobile-App auf der Baustelle“ | „Sie planen und rechnen im Browser ab, Ihr Team erfasst Zeiten, Fotos und Aufmaß in der Mobile-App.“ | `StoreLinks` [BESTAND] + Textlink „Mobile-App ansehen“ → `/app` |
| 5 | Preis-Kurzfassung | Weiß | `ComparisonTable` (Inhalt wie `comparisonContent` aus [05]: 8 Zeilen, Voll-Lizenz hervorgehoben) | „Zwei Lizenzen, klare Preise“ | „Die Voll-Lizenz enthält Web-App und Mobile-App, die App-Lizenz ergänzt sie für Mitarbeitende auf der Baustelle.“ | Textlink „Alle Preise ansehen“ → `/preise` |
| 6 | FAQ | `#F7F3EB` | `FaqList` (5 Fragen) + `JsonLd(faqSchema(dasselbeArray))` | „Häufige Fragen zu CraftOS“ | „Kurze Antworten zu Test, Lizenzen, GoBD und Arbeit ohne Internet; ausführliche Anleitungen stehen in der Hilfe.“ | – |
| 7 | Abschluss | `#101014` | `CtaBand` (ersetzt `TrialCta` auf `/`) | Titel „Machen Sie Platz für Ihr Handwerk.“ | Satz „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ | Button „10 Tage kostenlos testen“, Sekundär „Preise ansehen“ → `/preise` |

**Entfällt auf `/` (URLs bleiben, Inhalte stehen auf Zielseiten – D-03):** beide `FeatureSnippet`-Szenen (D-04: statische Darstellung ersetzt sie; spart Client-JS und CLS-Risiko), GoBD-Box (→ FAQ-Frage 4, Menü-Fußleiste, Footer, `/gobd`), Ratgeber-Block (→ Menü „Wissen“), alte `PricingTable` (bleibt auf `/preise`), Store-Badges und Preiszeile im Hero (→ Abschnitte 1, 4, 5), Anker `#produktdemo` (ungenutztes `site.demoUrl` wird entfernt).

### Hero (Abschnitt 0)

**Inhalt:**

| Element | Wert | Budget / Regel |
|---|---|---|
| H1 | „Handwerkersoftware, die Büro und Baustelle verbindet“ (52 Zeichen, Keyword-Map-Ziel) | ≤ 60; Display-Stufe, unter 400 px Fensterbreite 28 px; Keyword-Span `nowrap`, `hyphens: manual` |
| Lead | „Angebote, Plantafel, Zeiten und Rechnungen in einem System: Web-App im Büro, Mobile-App auf der Baustelle.“ (106 Zeichen) | genau 1 Satz, **≤ 110** (strenger als 140, damit er bei 360 px in 3 Zeilen passt); 16/400 `#BCBCC6` unter 768 px, 20/400 ab 768 px |
| Primär-CTA | „10 Tage kostenlos testen“ (Zahl aus `site.trialDays`) → `site.ctaUrl`, `.v2-btn-cta`, Icon `ArrowUpRight` 16 px, `data-track="trial"` | ≤ 28; `trial_click` über `classifyAppLink` [BESTAND] |
| Sekundäraktion | Textlink „Alle Funktionen ansehen“ → `/funktionen`, 16/600 `#F4F4F5`, unterstrichen (Offset 5 px), min. 44 px hoch | keine Pfeilglyphe |
| Produkt | `DevicePair layout="compact" tone="dark"`: Browser „Plantafel“ (`web:Plantafel`, Wochenansicht) + Phone „Einsätze“ (`app:Einsätze`, Tab „Einsätze“), Screenreadersatz „Plantafel der Web-App mit Wochenplanung und daneben die Einsatzliste der Mobile-App mit denselben Einsätzen.“ | Kennzeichnung „Vereinfachte Darstellung mit Beispieldaten“ in der `figcaption` [05 §9] |
| Kein | Eyebrow, Store-Badges, Preiszeile, Animation, Verlauf, Bild | – |

**Raster:**
- < 1024 px: einspaltig; Reihenfolge H1 → Lead → CTA-Gruppe → Produkt.
- ≥ 1024 px: zwei Spalten `minmax(0, 1fr) minmax(0, 1fr)` (1:1), Spaltenlücke 48 px, `align-items: center`. Das zuvor erwogene 5:7-Raster entfällt: gemessen ist „Handwerkersoftware,“ bei 48 px **515,9 px** breit und damit breiter als die 5:7-Textspalte (1440 px: 513,3 px; 1280 px: ≈ 487 px).

| Fensterbreite | Container | Textspalte | H1-Größe | Keyword-Span (gemessen) | Reserve | Produktspalte → Browser / Phone |
|---|---|---|---|---|---|---|
| 1024 px | 960 px | 456 px | 40,96 px | 440,2 px | 15,8 px | 456 px → Browser 344 × 215 px, Phone 160 × 338 px |
| 1280 px | 1216 px | 584 px | 48 px | 515,9 px | 68,1 px | 584 px → Browser 472 × 295 px, Phone 160 × 338 px |
| 1440 px | 1280 px | 616 px | 48 px | 515,9 px | 100,1 px | 616 px → Browser 504 × 315 px, Phone 160 × 338 px |

(Browserbreite = Produktspalte − 160 px Phone + 48 px Überlappung; Höhe 16:10.)
- Abstände: oben 24 / 48 / 64 px (< 768 / 768–1023 / ≥ 1024), unten 48 / 64 / 96 px; H1 → Lead 16 px; Lead → CTA 24 px (< 768) bzw. 32 px; CTA-Gruppe: < 768 px gestapelt (CTA volle Breite, 8 px, Sekundärlink), ab 768 px nebeneinander mit 24 px Lücke; Text → Produkt gestapelt 32 px.

**DevicePair `compact` (E1):**
- < 768 px: Browser 100 % Containerbreite (16:10); Phone 160 px breit, rechtsbündig mit 16 px Einzug, `margin-top: -64px` (überlappt die untere rechte Browserecke um 64 px, Wert der Skala `3xl`), `z-index: 1`. Keine Umschaltung, statisch. Gesamthöhe des Paars bei 360 px: Browser 203 px + Phone 338 px − 64 px = 477 px zuzüglich Kennzeichnung.
- ≥ 768 px: nebeneinander wie `default`, aber Phone 160 px, Überlappung 48 px, Versatz 24 px nach unten.
- Kennzeichnung einmal unter dem Paar, linksbündig, 8 px Abstand.

**Above-the-fold-Lagen (Prüfkriterien, Messung im Browser Pflicht – D-20):**

| Viewport | Header | Erwartete Lage | Prüfkriterium (Playwright, `reducedMotion: "reduce"`) |
|---|---|---|---|
| 360 × 640 | 74 px | Rechnung: 74 Header + 24 + H1 92 (28 px, 3 Zeilen à 30,8) + 16 + Lead 72 (3 Zeilen à 24) + 24 + CTA 48 + 8 + Sekundärlink 44 + 32 = Produkt beginnt bei ≈ 434 px; ≈ 206 px Produkt sichtbar (Fensterleiste + Wochenraster des Browsers); der −64-px-Overlap ändert nur die Höhe unterhalb der Falz | H1, Lead und CTA vollständig sichtbar (`bottom ≤ 640`); Oberkante `figure[data-figure="pair"]` ≤ 460 px (≥ 180 px Produkt sichtbar); H1 ≤ 3 Zeilen bei 28 px; kein horizontaler Scroll |
| 390 × 844 | 74 px | 74 + 24 + H1 106 (32 px, 3 Zeilen) + 16 + 72 + 24 + 48 + 8 + 44 + 32 = Produkt ab ≈ 448 px; Browser 354 × 221 px endet ≈ 669 px; Phone-Oberkante ≈ 605 px | Browserrahmen vollständig sichtbar (`bottom ≤ 844`); Oberkante Phone < 844 |
| 768 × 1024 | 74 px | einspaltig, Paar nebeneinander unter dem Text | Browser **und** Phone vollständig sichtbar |
| 1024 × 768 | 74 px | zweispaltig 1:1; Text ≈ 431 px hoch (H1 3 Zeilen à 45, Lead 3 Zeilen à 28, CTA und Sekundärlink gestapelt, weil zusammen > 456 px); Paar 362 px + Kennzeichnung, vertikal zentriert, endet ≈ 550 px | H1, Lead, CTA, Browser und Phone vollständig sichtbar |
| 1440 × 900 | 84 px | zweispaltig 1:1 (Textspalte 616 px, Browser 504 × 315 px) | H1, Lead, CTA, Browser und Phone vollständig sichtbar; Kennzeichnung sichtbar |

Bei jeder Breite: CTA-Link zeigt auf `site.ctaUrl`, H1 enthält „Handwerkersoftware“ ungetrennt, CLS = 0, LCP-Element (H1) ohne Lazy-Load.

### Kennzahlen (Abschnitt 1) – `KeyFacts`

| Wert | Beschriftung | `source` |
|---|---|---|
| `${site.trialDays} Tage` | „kostenlos testen“ | `site.trialDays` |
| `euro(voll.monat)` mit `const voll = tarife.find((t) => t.id === "voll")!` | „Voll-Lizenz pro Monat“ | `tarife.voll.monat` (Quellkennung wie Phase 5 `keyFactsContent`) |
| `euro(app.monat)` mit `const app = tarife.find((t) => t.id === "app")!` | „App-Lizenz pro Monat“ | `tarife.app.monat` |

`tarife` ist ein Array (`lib/site.ts`); Zugriff immer über `tarife.find((t) => t.id === …)`, nie `tarife.voll`. Die `source`-Zeichenketten sind nur Herkunftskennungen für `data-source` und den Vitest, kein Objektpfad.
| `String(mobileLocales.length)` | „Sprachen in der Mobile-App“ | `product-register: mobileLocales` |

Note: „Preise netto zzgl. USt. Stand: {germanDate(productBasis.checkedAt)}.“ Keine „Anzahl Funktionen“ (Zählweise 16/30 missverständlich [RESEARCH]).

### Arbeitsablauf (Abschnitt 2) – `StepFlow tone="amber"`

Schritte und Texte aus `stepContent` [05/BESTAND `lib/styleguide-content.ts`, im Budget], jeweils mit `href`:

| Schritt | Text (≤ 80) | Icon | Ziel |
|---|---|---|---|
| Angebot | „Positionen kalkulieren und das Angebot online unterschreiben lassen.“ | `FileText` | `/funktionen#angebot` |
| Planung | „Einsätze in der Plantafel verteilen und Bauphasen terminieren.“ | `CalendarDays` | `/funktionen#planung` |
| Baustelle | „Zeiten, Fotos, Aufmaß und Mängel in der Mobile-App erfassen.“ | `HardHat` | `/funktionen#baustelle` |
| Rechnung | „Rechnungen schreiben, als E-Rechnung ausgeben und Zahlungen verfolgen.“ | `Receipt` | `/funktionen#rechnung` |
| Buchhaltung | „Belege prüfen und Daten für DATEV an die Steuerberatung übergeben.“ | `Calculator` | `/funktionen#buchhaltung` |
| Team | „Rechte vergeben sowie Urlaub und Abwesenheiten im Blick behalten.“ | `Users` | `/funktionen#team` |

Icons der Schritte = Gruppen-Icons des Menüs (eine Bildsprache für dieselben sechs Gruppen). Fokusring innerhalb der Amber-Fläche `3px solid #101014` [05].

### Kernfunktionen (Abschnitt 3) – `BentoGrid`

Bewährte Anordnung der Musterseite (lg, sm, sm, md, wide → lückenlos bei 4 Spalten) [05/BESTAND]:

| Größe | Fläche | Titel (≤ 40) | Text (sm/md ≤ 90, lg/wide ≤ 120) | Visual | `href` |
|---|---|---|---|---|---|
| lg | dunkel (einzige) | „Rechnungen und E-Rechnung“ | „Abschlags-, Teil- und Schlussrechnungen erstellen und als XRechnung oder ZUGFeRD ausgeben.“ | `BrowserFrame` Szene Rechnungen (`web:Rechnungen`) | `/funktionen/rechnungen` |
| sm | warm | „Angebote & Kalkulation“ | „Positionen mit Lohn, Material und Zuschlägen nachvollziehbar kalkulieren.“ | Icon `FileText` | `/funktionen/angebote` |
| sm | weiß | „Belege scannen“ | „Belege mit der Mobile-App fotografieren, erkannte Angaben prüfen und zuordnen.“ | Icon `ScanLine` | `/funktionen/eingangsrechnungen` |
| md | warm | „Zeiterfassung“ | „Zeit per Timer auf der Baustelle starten und stoppen, mit Standort und Projekt.“ | `PhoneFrame` Szene Zeiterfassung (`app:Zeiterfassung`, Tab „Zeiten“) | `/funktionen/zeiterfassung` |
| wide | warm | „Mängel und Abnahme“ | „Mängel mit Foto am Projekt festhalten und Abnahmen vor Ort unterschreiben lassen.“ | `PhoneFrame` Szene Mängel (`app:Mängel`), `visualPosition="end"` | `/funktionen/baudokumentation` |

Plantafel erscheint bewusst nicht im Raster, weil sie schon im Hero steht (keine doppelte Szene auf einer Seite). Badges: Plattformen aus `funktionen[].platforms`.

### Web-App + Mobile-App (Abschnitt 4)

- ≥ 1024 px: zwei Spalten `7fr / 5fr`, links `SectionHeader` + `StoreLinks` (24 px darunter) + Textlink (16 px darunter), rechts `PhoneFrame width={240}` Szene Aufmaß (`app:Aufmaß`, Tab „Projekte“) mit Kennzeichnung, vertikal zentriert.
- < 1024 px: gestapelt Kopf → Phone (zentriert) → StoreLinks → Textlink.

### FAQ (Abschnitt 6) – Texte (Werte aus `tarife`/`site`, Antworten ≤ 600, erster Satz ≤ 300)

| Frage (≤ 90, endet mit „?“) | Antwort |
|---|---|
| „Ist die Mobile-App in der Voll-Lizenz enthalten?“ | „Ja. Die Voll-Lizenz für {voll.monat} netto pro Person und Monat umfasst Web-App und Mobile-App für dieselbe Person. Mitarbeitende auf der Baustelle nutzen die App-Lizenz für {app.monat} netto im Monat.“ |
| „Wie lange kann ich CraftOS kostenlos testen?“ | „Sie testen CraftOS {trialDays} Tage ohne Zahlungsdaten. Ein kostenpflichtiges Abonnement wählen Sie aktiv in der App; den Zahlungsbeginn sehen Sie im Checkout.“ |
| „Kostet die Plantafel zusätzlich?“ | „Nein, die Plantafel gehört zur Voll-Lizenz, ebenso Angebote, Rechnungen, Projekte, Lager und Nachkalkulation. KI-Verbrauch und zusätzlicher Speicher werden gesondert abgerechnet.“ |
| „Wie unterstützt CraftOS die GoBD?“ | „CraftOS unterstützt GoBD-gerechte Abläufe durch festgeschriebene Rechnungen, geschützte Beleginhalte und nachvollziehbare Stornierungen. Vollständige Belegerfassung, Verfahrensdokumentation und Aufbewahrung bleiben Aufgabe Ihres Betriebs.“ |
| „Kann ich auf der Baustelle ohne Internet arbeiten?“ | „Teilweise: Bereits geladene Daten, ausgewählte Texteingaben und Zeiteinträge können mobil offline nutzbar sein. Fotos, KI und noch nicht geladene Inhalte benötigen eine Verbindung.“ |

Die Antworten kürzen die Bestandsfassungen (`app/page.tsx:30–51`) ohne neue Aussagen; ausführliche Fassungen stehen auf `/gobd` und `/hilfe/mobile-offline-synchronisierung` (D-03).

---

## Seite 2: Hauptnavigation (Header, Mega-Menü „Funktionen“, mobiler Drawer)

### Struktur und Muster

**Muster:** WAI-APG „Disclosure Navigation Menu with Top-Level Links“ [RESEARCH Pattern 1]. Jeder Hauptpunkt mit Untermenü besteht aus einem echten Link auf seine Übersichtsseite **und** einem separaten Disclosure-Button (`aria-expanded`, `aria-controls`). Kein `role="menu"`/`"menubar"`/`"menuitem"`. Verschachtelte `ul/li` im `<nav aria-label="Hauptnavigation">`.

**Server/Client-Schnitt (D-13):** `Header` (Server) baut das Menümodell aus `lib/funktionsgruppen.ts` und rendert `MegaMenu` (Server, `next/link`, Icons als SVG) als Slot in `HeaderShell` (`"use client"`), die nur Zustand, Esc, Außenklick, Fokus-außerhalb, Scroll-Lock, Breakpoint-Reset (`(max-width: 1120px)`) und Schließen bei Routenwechsel (`usePathname`) und Linkklick (Delegation am `nav`) steuert. Alle Menülinks stehen im Server-HTML.

**Hauptpunkte (Reihenfolge):**

| # | Link (Ziel) | Disclosure | Inhalt |
|---|---|---|---|
| 1 | „Funktionen“ (`/funktionen`) | ja, `aria-controls="nav-funktionen"` | Mega-Menü (unten) |
| 2 | „Gewerke“ (`/gewerke`) | ja | Bestand: „Alle Gewerke“ + 12 Gewerke zweispaltig |
| 3 | „Preise“ (`/preise`) | nein | – |
| 4 | „Wissen“ (`/blog`) | ja | Bestand: Ratgeber, Kostenlose Rechner, Stundensatz berechnen, Angebot kalkulieren |
| 5 | „Hilfe“ (`/hilfe`) | ja | Bestand: Hilfezentrum, Kontakt & Support |
| Aktionen | `StoreLinks compact` [BESTAND], „Anmelden“ → `site.appUrl` mit `data-track="login"`, CTA „10 Tage testen“ → `site.ctaUrl` (`.v2-btn-cta`, ohne `data-track="login"`) | – | – |

„Produkt“ entfällt als Bezeichnung; seine Links wandern in die Fußleiste des Mega-Menüs. „Warum CraftOS?“ (`/vergleich`), Mobile-App (`/app`), Craft AI (`/craft-ai`, nur als Link – D-15) und GoBD (`/gobd`) bleiben damit mit einem Öffnen + einem Klick erreichbar (D-06).

### Mega-Menü „Funktionen“: Gruppen (aus `lib/funktionsgruppen.ts`, D-07)

| Gruppe (Anker) | lucide-Icon | Kurzbeschreibung (≤ 60) | Funktionslinks (Detailseiten, Name = Ankertext) |
|---|---|---|---|
| Angebot (`#angebot`) | `FileText` | „Kalkulieren, Mengen übernehmen, online unterschreiben“ (53) | Angebote & Kalkulation · Aufmaß · Kundenportal |
| Planung (`#planung`) | `CalendarDays` | „Einsätze, Projekte und Bauphasen planen“ (39) | Plantafel & Einsatzplanung · Projektverwaltung · Arbeitsanweisungen |
| Baustelle (`#baustelle`) | `HardHat` | „Zeiten, Fotos, Mängel und Material vor Ort erfassen“ (51) | Zeiterfassung · Baudokumentation · Lager & Material |
| Rechnung (`#rechnung`) | `Receipt` | „Rechnungen, E-Rechnung und Zahlungserinnerungen“ (47) | Rechnungen · E-Rechnung |
| Buchhaltung (`#buchhaltung`) | `Calculator` | „Belege, Bankumsätze, DATEV-Export und Kennzahlen“ (48) | Buchhaltung & DATEV · Eingangsrechnungen & Belegscan · Nachkalkulation · Dashboard |
| Team (`#team`) | `Users` | „Zugänge, Rechte und Nachrichten im Team“ (39) | Team & Rechte |

(„·“ trennt hier nur die Tabellenwerte; im Menü sind es Listeneinträge.)

- Der **Gruppentitel ist ein Link** auf `/funktionen#<gruppe>`; dort stehen alle Funktionen der Gruppe einschließlich der Zusatzfunktionen ohne Detailseite. Damit ist jede der 30 Live-Funktionen mit „Menü öffnen + 1 Klick“ erreichbar (16 direkt, 14 über den Gruppenlink – Zwei-Klick-Definition aus [RESEARCH]).
- Zusatzfunktionen erscheinen **nicht** einzeln im Menü (Menülänge, Linkziele ohne eigene Seite); der Paritätstest prüft: jede Detailfunktion hat genau einen Menülink, jede Zusatzfunktion gehört zu genau einer Gruppe mit Gruppenlink.
- **Fußleiste** des Panels (Liste, Reihenfolge): „Alle Funktionen“ → `/funktionen` (600), „Mobile-App“ → `/app`, „Craft AI“ → `/craft-ai`, „GoBD & Nachvollziehbarkeit“ → `/gobd`, „Warum CraftOS?“ → `/vergleich`.
- Zuordnung der Grenzfälle [ERMESSEN, im Plan zu begründen]: Dashboard → Buchhaltung (Kennzahlen, offene Beträge, Umsatzverlauf); Kundenportal → Angebot (Annahme/Ablehnung von Angeboten im Portal); Projekt-Chat → Team (Kommunikation); Datenübernahme → Team (Einrichtung des Betriebs).
- Keine Vorschaubilder/Mini-UI im Menü (D-17).

### Desktop-Layout (≥ 1121 px)

```
Header (dunkel, 84 px)
[Logo]   Funktionen ⌄   Gewerke ⌄   Preise   Wissen ⌄   Hilfe ⌄        [Stores] Anmelden [10 Tage testen ↗]
         └─ Link ─┘└Btn┘
┌──────────────────────────────────────────────────────────────────────────────────────────┐ weiß
│ [▣] Angebot                    [▣] Planung                     [▣] Baustelle              │
│     Kalkulieren, Mengen …          Einsätze, Projekte …            Zeiten, Fotos, …       │
│     Angebote & Kalkulation         Plantafel & Einsatzplanung      Zeiterfassung          │
│     Aufmaß                         Projektverwaltung               Baudokumentation       │
│     Kundenportal                   Arbeitsanweisungen              Lager & Material       │
│                                                                                           │
│ [▣] Rechnung                   [▣] Buchhaltung                 [▣] Team                   │
│     Rechnungen, E-Rechnung …       Belege, Bankumsätze …           Zugänge, Rechte …      │
│     Rechnungen                     Buchhaltung & DATEV             Team & Rechte          │
│     E-Rechnung                     Eingangsrechnungen & Belegscan                         │
│                                    Nachkalkulation                                        │
│                                    Dashboard                                              │
├──────────────────────────────────────────────────────────────────────────────────────────┤ warm
│ Alle Funktionen    Mobile-App    Craft AI    GoBD & Nachvollziehbarkeit    Warum CraftOS? │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

| Maß | Wert |
|---|---|
| Panel-Position | `position: absolute; top: 100%` relativ zum Header-Inneren, horizontal zentriert, Breite `min(1120px, calc(100vw - 64px))`; direkt am Header anliegend (keine Hover-Lücke) |
| Panel-Fläche | Weiß, Rahmen 1 px `ink-200` (ohne Oberkante), Radius `0 0 16px 16px` |
| Panel-Schatten | **Deklarierte Ausnahme „Überlagerungsebene“:** `0 14px 45px #10101420` [BESTAND `.dropdown`] – funktional (Abgrenzung des schwebenden Panels vom Seiteninhalt), nicht dekorativ; gilt nur für Navigationspanels (Mega-Menü, Gewerke, Wissen, Hilfe), nicht für Kacheln/Karten [05 bleibt dort gültig] |
| Raster | `grid-template-columns: repeat(3, minmax(0, 1fr))`, Spaltenlücke 24 px, Zeilenlücke 32 px, Innenabstand 32 px |
| Gruppenkopf | Icon-Feld 40 × 40 (links), 8 px Lücke, rechts Titel-Link 16/600 und darunter Kurzbeschreibung 14/400 `#62626E` (4 px Abstand) |
| Funktionslinks | Liste mit 16 px Abstand zum Kopf, Einzug 48 px (bündig mit Titel), je Link 16/400 `#17171C`, `min-height: 44px` (Touch-Ziel ≥ 44 px, Tablets quer erhalten das Desktop-Panel), Innenabstand 8 px, Radius 6 px |
| Fußleiste | Fläche `#F7F3EB`, Innenabstand 16 × 32 px, Links 14/600 `#17171C`, Lücke 24 px, `min-height: 44px` je Link |
| Höhe | max. `calc(100dvh - 104px)`, darüber `overflow-y: auto; overscroll-behavior: contain` [BESTAND] |
| Gewerke/Wissen/Hilfe | Bestand-Layout (278 px bzw. 570 px zweispaltig) mit v2-Werten: Radius 16 px, Links 16/400, Hover `#F7F3EB`, Fokusring wie oben |
| Hauptpunkte | 14/600 `#F4F4F5`, `min-height: 44px`; Chevron-Schalter 28 × 44 px, 4 px neben dem Link, Icon `ChevronDown` 16 px; 1121–1250 px Lücke 16 px, darüber 24 px |

### Mobiler Drawer (≤ 1120 px)

```
Header (dunkel, 74 px)   [Logo]                                   [☰ / ✕ 48×48]
┌─────────────────────────────────────────────┐ dunkel, fixed: top 74 px … bottom 0
│ Funktionen                              ⌃  │ 56 px, Link + Schalter (vorgeöffnet)
│   ✦ Angebot                                 │ Gruppenlink 16/600 + Amber-Icon 20 px
│     Kalkulieren, Mengen übernehmen, …       │ 14/400 #BCBCC6
│     Angebote & Kalkulation                  │ 48 px je Link, 16/400 #F4F4F5
│     Aufmaß                                  │
│     Kundenportal                            │
│   ✦ Planung …  (alle 6 Gruppen)             │
│   Alle Funktionen · Mobile-App · …          │ Fußleistenlinks als Liste
│ ─────────────────────────────────────────── │
│ Gewerke                                 ⌄  │ zugeklappt
│ Preise                                      │
│ Wissen                                  ⌄  │
│ Hilfe                                   ⌄  │
│ [App Store] [Google Play]                   │
│ Anmelden                                    │
│ [ 10 Tage testen ↗ ]   volle Breite         │
└─────────────────────────────────────────────┘
```

| Regel | Wert |
|---|---|
| Fläche | Vollflächig `position: fixed; top: <Headerhöhe>; inset-inline: 0; bottom: 0`, `#101014`, `overflow-y: auto; overscroll-behavior: contain`, Innenabstand oben 8 px, seitlich 18 px (deklarierte Bestand-Ausnahme, siehe Spacing → Exceptions), unten `max(24px, env(safe-area-inset-bottom))` [BESTAND-Werte] |
| Vorgeöffnet (D-17) | Bei **jedem** Öffnen ist „Funktionen“ aufgeklappt (`aria-expanded="true"`), alle anderen zu. Gruppen innerhalb von „Funktionen“ sind **keine** Akkordeons (sonst 3 Taps – Anti-Pattern [RESEARCH]). |
| Akkordeon | Gewerke, Wissen, Hilfe: je Link + Chevron-Schalter 48 × 56 px; mehrere dürfen gleichzeitig offen sein; `keepGroupVisible` [BESTAND] scrollt den geöffneten Kopf in Sicht |
| Raster Funktionen | < 640 px einspaltig; 640–1120 px zwei Spalten (Lücke 24 px), Reihenfolge zeilenweise Angebot, Planung / Baustelle, Rechnung / Buchhaltung, Team |
| Hauptpunkt | 16/600 `#F4F4F5`, `min-height: 56px`, Trennlinie 1 px `#2C2C34` |
| Funktionslink | 16/400 `#F4F4F5`, `min-height: 48px`, `padding-block: 8px`, `padding-inline: 16px`, Einzug 32 px (Icon 20 px zentriert in einer 24-px-Box + 8 px Lücke = 32 px; Links bündig mit dem Gruppentitel) |
| Gruppenkopf im Drawer | Icon-Box 24 × 24 px (Icon 20 px Amber, ohne Fläche), 8 px Lücke, Titel-Link 16/600 `min-height: 48px` (`padding-block: 8px`), Kurzbeschreibung 14/400 `#BCBCC6` darunter mit 4 px Abstand, ebenfalls 32 px eingezogen |
| Aktionen | 24 px über den Aktionen; Store-Badges, „Anmelden“ (48 px), CTA volle Breite |
| Schalter | 48 × 48 px, Rahmen 1 px `#454550`, Radius 6 px, Icons `Menu`/`X` 24 px; Name „Menü öffnen“ / „Menü schließen“, `aria-expanded`, `aria-controls="hauptnavigation"` [BESTAND-Namen, Tests] |

### Zustände und Tastatur (Desktop und Mobil)

| Interaktion | Verhalten |
|---|---|
| Klick/Tap auf Hauptpunkt-Link | navigiert zur Übersichtsseite (funktioniert ohne JS) |
| Klick/Tap/Enter/Leertaste auf Chevron-Schalter | öffnet/schließt das zugehörige Panel; ein Desktop-Panel gleichzeitig |
| Maus-Hover (nur `pointerType === "mouse"`, ≥ 1121 px) | **Auslöser ist das `<li>` des Hauptpunkts** (umfasst Link, Chevron-Schalter und Panel; `onPointerEnter`/`onPointerLeave` am `li`, wie Bestand am Gruppen-`div`). Eintritt öffnet sofort (Öffnungsquelle „hover“); Verlassen des `li` schließt, solange die Quelle „hover“ ist und der Fokus nicht im `li` liegt; das Panel liegt ohne Lücke am Header an und bleibt beim Überfahren offen (WCAG 1.4.13). Touch und Stift öffnen nie per Hover. |
| Klick auf den Chevron-Schalter nach Hover-Öffnen | **hält das Panel offen** (kein Zuklappen): die Öffnungsquelle wechselt von „hover“ zu „press“, danach schließt Verlassen des `li` nicht mehr; erst ein zweiter Klick, Esc, Außenklick, Fokus außerhalb oder Linkklick schließt [BESTAND-Logik `wasHover` verbindlich übernehmen]. Klick auf den Hauptpunkt-**Link** navigiert immer. |
| Pfeil runter am Chevron-Schalter | **Verbindlich ja:** öffnet das Panel (Quelle „press“) und setzt den Fokus auf den ersten Link des Panels (Gruppentitel „Angebot“ bzw. erster Eintrag); weitere Pfeiltasten werden nicht ausgewertet (kein Menü-Tastaturmodell). |
| Tab / Umschalt+Tab | DOM-Reihenfolge = Sichtreihenfolge: Logo → Funktionen-Link → Funktionen-Schalter → (wenn offen) Gruppe Angebot (Titel, Links) → Planung → … → Team → Fußleiste → Gewerke-Link → … → Aktionen |
| Esc | schließt offenes Panel bzw. Drawer und setzt den Fokus auf den auslösenden Schalter (Chevron bzw. „Menü schließen“-Schalter) [BESTAND] |
| Fokus verlässt Header / Klick außerhalb | schließt [BESTAND `pointerdown`/`focusin`] |
| Linkklick im Panel/Drawer, Routenwechsel | schließt (Delegation am `nav` + `usePathname`-Effekt), Scroll-Lock wird gelöst |
| Breakpoint-Wechsel über 1120 px | schließt alles, löst Scroll-Lock [BESTAND] |
| Scroll-Lock (Drawer) | `overflow: hidden` am `html` mit Rückstellung der Scrollposition [BESTAND] **plus** `scrollbar-gutter: stable` am `html` (global), damit `main` beim Öffnen nicht springt; E2E vergleicht die Breite von `main` vor/nach dem Öffnen |
| Aktuelle Seite | **Kleine Client-Komponente `components/layout/ActiveLink.tsx`** (`"use client"`, Props nur `href`, `className?`, `children`; liest `usePathname()` und setzt `aria-current="page"`, wenn der Pfad ohne Hash und ohne abschließenden Schrägstrich gleich `href` ist; Links mit `#`-Fragment sind nie „aktuell“). `MegaMenu` (Server) rendert jeden Panel-Link als `ActiveLink`; es werden keine Zustände per Prop aus `HeaderShell` in den Server-Slot gereicht. Die Hauptpunkt-Links rendert `HeaderShell` selbst und markiert den Bereich mit `data-active="true"`, wenn der Pfad mit dem Hauptpunkt-Pfad beginnt (`/funktionen…`, `/gewerke…`, `/blog…` bzw. `/rechner…` für Wissen, `/hilfe…`), sowie `aria-current="page"` bei exakter Übereinstimmung. `ActiveLink` importiert keine Datenmodule (Client-Bundle bleibt klein). |
| Ankerlink auf derselben Seite (`/funktionen#team` von `/funktionen`) | schließt das Panel, scrollt zum Anker (`scroll-margin-top: 100px`), Fokus folgt dem Linkziel |

**Zugängliche Namen:** Schalter tragen einen zustandsunabhängigen Namen „Untermenü Funktionen“ / „Untermenü Gewerke“ / „Untermenü Wissen“ / „Untermenü Hilfe“; der Zustand steht nur in `aria-expanded`. Panels sind `<div id="nav-…">` mit `hidden` im geschlossenen Zustand (kein `aria-hidden`-Missbrauch).

### Ohne JavaScript (D-13)

- Alle Hauptpunkt-Links (`/funktionen`, `/gewerke`, `/preise`, `/blog`, `/hilfe`), „Anmelden“ und der CTA sind echte `<a>` im HTML.
- `<noscript><style>`: Chevron-Schalter und Menü-Schalter `display: none`; unter 1120 px wird `#hauptnavigation` statisch unter dem Header als Liste der Hauptpunkte und Aktionen angezeigt (`display: block; position: static`); Panels bleiben `hidden`.
- Zwei-Klick-Weg ohne JS: „Funktionen“ → `/funktionen` (1) → Karte oder Listeneintrag (2).
- Kein Panel wird serverseitig sichtbar gerendert und nach der Hydration versteckt (sonst CLS) [RESEARCH Anti-Patterns].

---

## Seite 3: Funktionsübersicht `/funktionen`

### Aufbau

| # | Bereich | Fläche | Inhalt |
|---|---|---|---|
| 0 | Seitenkopf (v2, ersetzt `PageHero` mit Alt-`.eyebrow`) | `#101014`, Unterkante 3 px Amber | H1 „Alle Funktionen der Software für Handwerksbetriebe“ (50 Zeichen, Display-Stufe, Keyword-Span „Handwerksbetriebe“ `nowrap`); Lead (1 Satz) „Von Angebot bis Team: alle Funktionen von CraftOS, geordnet nach den Arbeitsschritten Ihres Betriebs.“ (20/400 ab 768 px, 16/400 darunter, `#BCBCC6`); darunter Sprungnavigation |
| 0a | Sprungnavigation | im Seitenkopf | `<nav aria-label="Funktionsgruppen">` mit `ul` aus 6 Links „Angebot“, „Planung“, „Baustelle“, „Rechnung“, „Buchhaltung“, „Team“ → `#angebot` … `#team`; je Link Icon 16 px Amber + Label 14/600 `#F4F4F5`, Rahmen 1 px `#FFFFFF25`, Radius 6 px, Innenabstand 8 × 16 px, `min-height: 44px`, Lücke 8 px, `flex-wrap`; 32 px unter dem Lead |
| 1–6 | Gruppenabschnitte in fester Reihenfolge Angebot → Planung → Baustelle → Rechnung → Buchhaltung → Team | abwechselnd Weiß / `#F7F3EB` (Angebot weiß) | `SectionHeader` (Eyebrow = Gruppenname, `id` = Anker) → `FeatureCard`-Raster (Detailseiten) → 32 px → `FeatureList` „Weitere Funktionen“ (falls Einträge) |
| 7 | Abschluss | `#101014` | `CtaBand` Titel „Alle Funktionen selbst ausprobieren“, Satz „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“, Button „10 Tage kostenlos testen“, Sekundär „Preise ansehen“ → `/preise` |

Die bisherige Hinweisbox zur Voll-Lizenz und `TrialCta` entfallen auf `/funktionen` (Lizenzinhalt steht auf `/preise` und in der Startseiten-Tabelle).

### Gruppenköpfe (`SectionHeader`, Eyebrow = Gruppe)

| Anker | Eyebrow | H2 (≤ 60) | Lead (1 Satz, ≤ 140) |
|---|---|---|---|
| `#angebot` | Angebot | „Vom Aufmaß zum unterschriebenen Angebot“ | „Maße auf der Baustelle erfassen, im Büro ins Angebot übernehmen und online unterschreiben lassen.“ |
| `#planung` | Planung | „Einsätze, Projekte und Bauphasen planen“ | „Das Büro plant Team und Termine, die Mobile-App zeigt jedem Teammitglied seine Einsätze.“ |
| `#baustelle` | Baustelle | „Zeiten, Fotos und Mängel direkt vor Ort erfassen“ | „Was auf der Baustelle passiert, landet über die Mobile-App im richtigen Projekt.“ |
| `#rechnung` | Rechnung | „Rechnungen schreiben und offene Beträge verfolgen“ | „Aus Angeboten und Berichten werden prüfbare Rechnungen, E-Rechnungen und bei Bedarf Zahlungserinnerungen.“ |
| `#buchhaltung` | Buchhaltung | „Belege, Zahlen und DATEV-Export an einem Ort“ | „Belege prüfen, Bankumsätze zuordnen und Daten für die Steuerberatung vorbereiten.“ |
| `#team` | Team | „Zugänge, Rechte und Kommunikation im Team“ | „Jedes Teammitglied erhält den passenden Zugang und klärt Rückfragen im Projekt-Chat.“ |

Der Anker sitzt auf der H2 (`SectionHeader id`), `scroll-margin-top: 100px` [BESTAND]; der Abschnitt ist `<section aria-labelledby="<anker>">` und trägt `data-gruppe="<anker>"`.

### `FeatureCard`-Raster (16 Funktionen mit Detailseite)

Raster und Karte unverändert aus [05 §5]: 1 / 2 / 3 Spalten (< 768 / 768–1023 / ≥ 1024), Lücke 16 / 24 px; Bühne 4:3; Badges; Titel 20/600; Nutzen 16/400 `#62626E`; Link „Mehr zu {Name}“ → `/funktionen/{slug}`; Karte als `<li><article>`, Raster als `<ul>`, `data-funktion="<slug>"`.

**Visual je Karte** (jede Karte hat ein visuelles Element, D-08): Szene im Geräterahmen, wo eine belegte Szene vorliegt, sonst das große Icon im Sechseck-Umriss (`FeatureCard` ohne `visual`, Icon aus `funktionen[].icon`).

| Gruppe | Funktion (Titel ≤ 32) | Nutzensatz (genau 1 Satz, ≤ 100) – Entwurf, belegt durch `funktionen.ts` | Visual | Badges |
|---|---|---|---|---|
| Angebot | Angebote & Kalkulation | „Positionen mit Lohn, Material und Zuschlägen kalkulieren und als PDF mit Briefpapier ausgeben.“ (94) | Icon `FileText` | Web-App, Mobile-App |
| Angebot | Aufmaß | „Räume, Flächen und Abzüge vor Ort erfassen und die Mengen ins Angebot übernehmen.“ (81) | Phone, Szene Aufmaß (`app:Aufmaß`) | Web-App, Mobile-App |
| Angebot | Kundenportal | „Kunden sehen freigegebene Angebote, Rechnungen und Termine in einem eigenen Bereich im Browser.“ (95) | Icon `Globe` | Web-App |
| Planung | Plantafel & Einsatzplanung | „Einsätze für das Team planen und die Einsatzorte auf der Karte im Blick behalten.“ (81) | Browser, Szene Plantafel (`web:Plantafel`) | Web-App, Mobile-App |
| Planung | Projektverwaltung | „Kunden, Phasen, Aufgaben, Termine und Dokumente bleiben beim jeweiligen Auftrag.“ (80) | Icon `FolderKanban` | Web-App, Mobile-App |
| Planung | Arbeitsanweisungen | „Leistungen und Materialbedarf ohne Verkaufspreise für die Ausführung bereitstellen.“ (83) | Icon `ClipboardList` | Web-App, Mobile-App |
| Baustelle | Zeiterfassung | „Arbeitszeit per Timer starten und stoppen, mit Standort erfassen und einem Projekt zuordnen.“ (92) | Phone, Szene Zeiterfassung (`app:Zeiterfassung`) | Web-App, Mobile-App |
| Baustelle | Baudokumentation | „Arbeiten, Fotos und Mängel direkt beim Projekt festhalten und im Büro wiederfinden.“ (83) | Phone, Szene Mängel (`app:Mängel`) | Web-App, Mobile-App |
| Baustelle | Lager & Material | „Bestände, Lagerorte und Materialbewegungen nachvollziehbar verwalten.“ (69) | Icon `Package` | Web-App, Mobile-App |
| Rechnung | Rechnungen | „Abschlags-, Teil- und Schlussrechnungen erstellen und Zahlungseingänge zuordnen.“ (80) | Browser, Szene Rechnungen (`web:Rechnungen`) | Web-App |
| Rechnung | E-Rechnung | „Rechnungen als XRechnung oder ZUGFeRD mit strukturierten Daten ausgeben.“ (72) | Icon `FileCheck2` | Web-App |
| Buchhaltung | Buchhaltung & DATEV | „Belege prüfen und Buchungsdaten samt Belegbezug für DATEV exportieren.“ (70) | Icon `Calculator` | Web-App |
| Buchhaltung | Eingangsrechnungen & Belegscan | „Belege fotografieren, erkannte Angaben prüfen und Ausgaben einem Projekt zuordnen.“ (82) | Icon `ScanLine` | Web-App, Mobile-App |
| Buchhaltung | Nachkalkulation | „Geplante und tatsächliche Kosten je Projekt vergleichen und Abweichungen erkennen.“ (82) | Icon `TrendingUp` | Web-App |
| Buchhaltung | Dashboard | „Projekte, offene Beträge, Angebote und Aufgaben auf einen Blick sehen.“ (70) | Icon `LayoutDashboard` | Web-App |
| Team | Team & Rechte | „Mitarbeitende einladen und Zugänge und Rechte passend zur Aufgabe vergeben.“ (75) | Icon `Users` | Web-App, Mobile-App |

Die Nutzensätze werden als neues Feld `benefit` in `lib/funktionen.ts` (oder im Gruppenmodul) gepflegt; die Startseite nutzt für Bento-Kacheln eigene, ebenso belegte Texte. Plattform-Badges ausschließlich aus `funktionen[].platforms`.

### `FeatureList` (E2) – 14 Zusatzfunktionen ohne Detailseite

**Vertrag:**

```ts
interface FeatureListItem {
  id: string;                 // stabiler Schlüssel, Parität zum Register (liveExtras, advertised: true)
  name: string;               // Anzeigename ≤ 32 Zeichen
  icon: LucideIcon;
  benefit: string;            // genau 1 Satz, ≤ 100 Zeichen
  platforms: ProductPlatform[]; // aus liveExtras[].platforms
  target?: { href: string; kind: "hilfe" | "funktion"; label: string }; // label = Name der Zielseite
}
interface FeatureListProps { items: FeatureListItem[]; title: string } // 1–7 Einträge
```

- Semantik: `<h3>` („Weitere Funktionen“) + `<ul>`; Eintrag `<li data-funktion="<id>">`; Name ist kein Heading.
- Layout: ≥ 1024 px zwei Spalten (Lücke 24 px), darunter einspaltig; Einträge durch 1 px `ink-200` oben getrennt (Liste, keine Karten, kein Schatten, keine Bühne – bewusster Hierarchieunterschied zu den Detailkarten); Zeile `padding-block: 16px`.
- Zeile: Icon-Feld 40 × 40, Radius 12 px, `primary-100` mit Icon 20 px `primary-800`; 16 px Lücke; Textblock: Name 16/600 `#17171C` + Plattform-Badges (8 px Abstand, umbrechend) → Nutzensatz 16/400 `#62626E` (max. 60ch) → Zielhinweis 14/400 `#62626E` (nur bei `target`).
- Link: Bei `target` ist der **Name** der Link (gestreckter Klickbereich `::after { inset: 0 }` über die Zeile, ein Tabstopp), Zielhinweis per `aria-describedby`. Zielhinweis-Texte: `kind: "hilfe"` → „Anleitung in der Hilfe“; `kind: "funktion"` → „Beschrieben unter {label}“. Ohne `target`: Name als Text, kein Hinweis, kein Platzhalter.
- Hover (`hover: hover`, nur verlinkte Zeilen): Name unterstrichen (Offset 5 px), 150 ms; Fokus: Ring am Link, über `:focus-within` an der Zeile sichtbar.
- Verboten: „Seite folgt“, „bald“, „demnächst“, „in Vorbereitung“ o. ä. (`announcements.test.ts`).

**Zuordnung Register → stabile `id` (verbindlich):** `liveExtras` in `lib/product-register.ts` haben **kein** `id`-Feld; der Schlüssel ist heute nur der Name. `lib/funktionsgruppen.ts` führt deshalb eine ausdrückliche, vollständige Zuordnungstabelle `Registername → id` (Vergleich exakt auf den Namensstring; der Sprachen-Eintrag wird über das Muster `^\d+ Sprachen in der Mobile-App$` bzw. den mit `mobileLocales.length` erzeugten String zugeordnet). Der Paritätstest prüft beidseitig: jeder `advertised: true`-Eintrag hat genau eine `id`, jede `id` existiert im Register, „Vorhersagen“ (`advertised: false`) hat keine. Alternativ darf der Executor `liveExtras` um ein Feld `id` mit denselben Werten erweitern; dann entfällt die Tabelle im Gruppenmodul, die Werte bleiben gleich.

| Registername (`liveExtras[].name`, exakt) | `id` | Anzeigename |
|---|---|---|
| „GAEB-Import/-Export und DATANORM-Import“ | `gaeb-datanorm` | GAEB und DATANORM *(abweichend)* |
| „Angebotsunterschrift online“ | `angebotsunterschrift` | Angebotsunterschrift online |
| „Besichtigung“ | `besichtigung` | Besichtigung |
| „Kunden in der App“ | `kunden-app` | Kunden in der App |
| „Terminplanung mit Bauphasen (in der Mobile-App: Arbeitsabschnitte)“ | `terminplanung` | Terminplanung mit Bauphasen *(abweichend)* |
| „Mängel“ | `maengel` | Mängel |
| „Abnahme und Teilabnahme“ | `abnahme` | Abnahme und Teilabnahme |
| „Bautagesbericht“ | `bautagesbericht` | Bautagesbericht |
| „Lager-Scan und Wareneingang“ | `lager-scan` | Lager-Scan und Wareneingang |
| „Mahnwesen“ | `mahnwesen` | Mahnwesen |
| „Bankabgleich und Zahlungseingänge“ | `bankabgleich` | Bankabgleich & Zahlungen *(abweichend, Registername hat 33 Zeichen > 32)* |
| „Projekt-Chat und Nachrichten“ | `projekt-chat` | Projekt-Chat und Nachrichten |
| `` `${mobileLocales.length} Sprachen in der Mobile-App` `` | `sprachen` | `${mobileLocales.length} Sprachen in der Mobile-App` |
| „Datenübernahme“ | `datenuebernahme` | Datenübernahme |
| „Vorhersagen“ (`advertised: false`) | – (nicht anzeigen) | – |

**Einträge (Reihenfolge je Gruppe verbindlich):**

| Gruppe | `id` | Anzeigename (≤ 32) | Icon (lucide) | Nutzensatz (1 Satz, ≤ 100) – Entwurf, belegt durch Register-/Releasebelege | Badges | Ziel (Phase 6) |
|---|---|---|---|---|---|---|
| Angebot | `gaeb-datanorm` | GAEB und DATANORM | `FileInput` | „Leistungsverzeichnisse per GAEB importieren und exportieren, Artikel per DATANORM einlesen.“ (91) | Web-App | `/hilfe/gaeb-importieren` (hilfe) |
| Angebot | `angebotsunterschrift` | Angebotsunterschrift online | `Signature` | „Kunden nehmen Ihr Angebot online an und unterschreiben es oder senden eine Ablehnung.“ (85) | Web-App | ohne Link (die Seite `/funktionen/kundenportal` belegt nur Annahme und Ablehnung von Angeboten, keine Unterschrift; ein Verweis „Beschrieben unter Kundenportal“ wäre irreführend) |
| Angebot | `besichtigung` | Besichtigung | `Camera` | „Fotos, Videos und Sprachnotizen der Besichtigung gesammelt im Projekt ablegen.“ (78) | Web-App, Mobile-App | ohne Link |
| Angebot | `kunden-app` | Kunden in der App | `Contact` | „Kundendaten unterwegs in der Mobile-App nachschlagen und bearbeiten.“ (68) | Mobile-App | ohne Link |
| Planung | `terminplanung` | Terminplanung mit Bauphasen | `CalendarRange` | „Bauphasen im Zeitplan anlegen und Abhängigkeiten zwischen den Phasen sehen.“ (75) | Web-App | `/hilfe/projekt-phasen-anlegen` (hilfe) |
| Baustelle | `maengel` | Mängel | `TriangleAlert` | „Mängel mit Foto erfassen und über Status und Zuständigkeit bis zur Erledigung verfolgen.“ (88) | Web-App, Mobile-App | `/hilfe/mangel-erfassen-bearbeiten` (hilfe) |
| Baustelle | `abnahme` | Abnahme und Teilabnahme | `ClipboardCheck` | „Abnahmen und Teilabnahmen vor Ort protokollieren und unterschreiben lassen.“ (75) | Web-App, Mobile-App | `/hilfe/abnahme-dokumentieren` (hilfe) |
| Baustelle | `bautagesbericht` | Bautagesbericht | `NotebookPen` | „Leistungen, Personal und weitere Angaben des Tages in der Mobile-App als Bericht festhalten.“ (92) | Mobile-App | `/hilfe/bautagesbericht-erstellen` (hilfe) |
| Baustelle | `lager-scan` | Lager-Scan und Wareneingang | `ScanBarcode` | „Artikel per Barcode scannen und Wareneingänge am Lager buchen.“ (62) | Web-App, Mobile-App | `/hilfe/wareneingang-buchen` (hilfe) |
| Rechnung | `mahnwesen` | Mahnwesen | `BellRing` | „Zahlungserinnerungen mit Fristen, Stufen und Vorlagen einrichten, auf Wunsch automatisch.“ (89) | Web-App | ohne Link |
| Buchhaltung | `bankabgleich` | Bankabgleich & Zahlungen | `Landmark` | „Bankdatei importieren und Umsätze mit Belegen und erfassten Zahlungen verbinden.“ (80) | Web-App | ohne Link (Hilfeartikel `zahlungen-erfassen` behandelt manuelle Zahlungen, nicht den Bankabgleich – wäre irreführend) |
| Team | `projekt-chat` | Projekt-Chat und Nachrichten | `MessagesSquare` | „Rückfragen im Projekt-Chat klären und Direktnachrichten im Posteingang der App lesen.“ (85) | Mobile-App | `/funktionen/projektverwaltung` (funktion, „Projektverwaltung“) |
| Team | `sprachen` | `${mobileLocales.length} Sprachen in der Mobile-App` | `Languages` | „Mitarbeitende nutzen die Mobile-App in einer von {mobileLocales.length} Sprachen.“ (61) | Mobile-App | ohne Link |
| Team | `datenuebernahme` | Datenübernahme | `Import` | „Bestehende Daten aus Dateien prüfen, zuordnen und kontrolliert in CraftOS übernehmen.“ (85) | Web-App | ohne Link |

Belege der Nutzensätze (gelesen am Web-Release `535206b4`, nur lesend): Mahnwesen-Einstellungen „Fristen, Stufen und Vorlagen für Zahlungserinnerungen“, „Automatische Mahnungen“; Bankumsätze „Bankdatei importieren“, „Bankumsätze mit deinen Belegen und erfassten Zahlungen verbinden“; Datenimport „Dateien prüfen, Daten zuordnen und kontrolliert übernehmen“; Angebotsunterschrift „Angebot annehmen und unterschreiben“, „Ablehnung senden“; Besichtigung = Projektordner „Besichtigung“ für Fotos, Videos und Sprachnotizen (die Web-Videoanalyse ist **nicht** live und wird nicht erwähnt). Die übrigen Sätze folgen `funktionen.ts` (`points`, `access`) und den Registerpfaden. „Vorhersagen“ (`advertised: false`) erscheint nirgends.

Alle hier genannten lucide-Namen sind am 21.10.2026 in den Typdefinitionen von `lucide-react` 0.475.0 (`dist/lucide-react.d.ts`) als Export vorhanden geprüft.

### Strukturierte Daten `/funktionen` (D-10)

`BreadcrumbList` (Start → Funktionen) über `breadcrumbSchema()` und `ItemList` „Funktionen von CraftOS“ mit 16 `ListItem` (Position, Name, URL der Detailseiten) über `components/seo/JsonLd.tsx`. Zusatzfunktionen ohne eigene URL stehen nicht in der ItemList.

---

## SEO-Vertrag (D-11, D-12, D-19)

| Pfad | Title (gerendert) | H1 | Meta-Description |
|---|---|---|---|
| `/` | „Handwerkersoftware für Büro und Baustelle \| CraftOS“ (51; vollständig gesetzt, Root erbt kein Template) | „Handwerkersoftware, die Büro und Baustelle verbindet“ | „CraftOS ist die Handwerkersoftware für Angebote, Rechnungen, Plantafel, Zeiterfassung und Lager – Web-App und Mobile-App in einer Lizenz. {trialDays} Tage testen.“ (153) |
| `/funktionen` | „Software für Handwerksbetriebe: alle Funktionen \| CraftOS“ (57; Seitenwert ohne Marke, Template hängt an) | „Alle Funktionen der Software für Handwerksbetriebe“ | „Angebote, Rechnungen, Plantafel, Zeiterfassung, Aufmaß, Lager und Baudokumentation: alle Funktionen der Software für Handwerksbetriebe im Überblick.“ (148) |

Grenzen: Title ≤ 60, Description 120–155 (harte Obergrenze aus `keyword-map.test.ts`). Werte = `keyword-map.json` `target` [RESEARCH SEO]. Startseite: Organization + SoftwareApplication bleiben aus dem Layout unverändert; FAQPage nur für die 5 sichtbaren Fragen. Menü-Ankertexte = Funktionsnamen aus `funktionen.ts`.

---

## Copywriting Contract

Unverändert aus [05]: Ansprache „Sie“, Satzschreibung, aktive Verben, keine Ausrufezeichen, keine Füllwörter; nicht-live Funktionen werden nirgends angekündigt; Begriffe „Web-App“, „Mobile-App“, „Voll-Lizenz“, „App-Lizenz“, „Credits“, „Bauphasen“ (nicht „Volllizenz“, „Handy-App“ als Lizenzname, „Features“).

| Element | Copy |
|---------|------|
| Primary CTA (Seiten) | „10 Tage kostenlos testen“ (Zahl aus `site.trialDays`) → `site.ctaUrl`, `.v2-btn-cta`, Icon `ArrowUpRight` |
| Primary CTA (Header, Drawer) | „10 Tage testen“ → `site.ctaUrl` (kurz wegen Platz; Bestand und Tests) |
| Sekundäraktion Hero | „Alle Funktionen ansehen“ → `/funktionen` (gleicher Text unter dem Bento-Raster: gleiche Aktion, gleicher Name) |
| Weitere Textlinks | „Mobile-App ansehen“ → `/app`; „Alle Preise ansehen“ → `/preise`; CTA-Band sekundär „Preise ansehen“ → `/preise` |
| Login | „Anmelden“ → `site.appUrl`, `data-track="login"` |
| Menü-Schalter | „Menü öffnen“ / „Menü schließen“; Untermenü-Schalter „Untermenü {Hauptpunkt}“ |
| Menü-Fußleiste | „Alle Funktionen“, „Mobile-App“, „Craft AI“, „GoBD & Nachvollziehbarkeit“, „Warum CraftOS?“ |
| Kartenlink | „Mehr zu {Funktionsname}“ [05] |
| Zielhinweis `FeatureList` | „Anleitung in der Hilfe“ bzw. „Beschrieben unter {Seitenname}“ |
| Listenüberschrift | „Weitere Funktionen“ |
| Kennzeichnung | „Vereinfachte Darstellung mit Beispieldaten“ [05] |
| Kennzahlen-Hinweis | „Preise netto zzgl. USt. Stand: {Datum aus productBasis.checkedAt}.“ |
| Tabellenhinweis mobil | „Zum Vergleichen seitlich wischen“ [05] |
| CTA-Band `/` | „Machen Sie Platz für Ihr Handwerk.“ / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ |
| CTA-Band `/funktionen` | „Alle Funktionen selbst ausprobieren“ / „Ohne Zahlungsdaten – Sie entscheiden nach dem Test.“ |
| Empty state heading | Entfällt als Oberfläche: Seiten rendern statisch aus Datenmodulen; eine Gruppe ohne Zusatzfunktionen rendert keine `FeatureList` (keine leere Überschrift, kein Platzhalter). |
| Empty state body | Entwicklerfehler statt leerer Fläche: „Funktionsgruppen: Gruppe {id} enthält keine Funktion – Zuordnung in lib/funktionsgruppen.ts ergänzen.“ |
| Error state | Keine Laufzeitfehler für Besucher (keine Datenabfrage; unbekannte Pfade → bestehende 404-Seite). Build-/Testfehler nennen Problem und Abhilfe: „Funktionsgruppen: {Name} aus dem Produktregister ist keiner Gruppe zugeordnet – Eintrag in lib/funktionsgruppen.ts ergänzen.“; „Menü: Ziel {href} ist keine Route der Sitemap – Ziel in lib/funktionsgruppen.ts korrigieren oder Link entfernen.“; „FeatureList: Nutzen für {Name} hat {n} Sätze – genau einen Satz schreiben.“; „Textbudget überschritten: {Baustein}.{Feld} hat {n} von {max} Zeichen – Satz kürzen.“ [05] |
| Destructive confirmation | Keine destruktiven Aktionen in dieser Phase (Marketingseiten ohne Konten, Formulare oder Löschfunktionen). |

### Textbudgets

Alle Budgets aus [05 „Textbudgets“] gelten unverändert (Abschnittskopf, Bento-Kachel, Funktionskarte, Schrittfolge, Kennzahlen, Vergleichstabelle, Badge, FAQ, CTA-Band, Mini-UI). **Phase-6-Ergänzungen** (in `TEXT_BUDGET` ergänzen, per Vitest geprüft):

| Feld | Budget |
|---|---|
| Hero-H1 Startseite | ≤ 60 Zeichen, enthält „Handwerkersoftware“ |
| Hero-Lead Startseite | genau 1 Satz, ≤ 110 Zeichen |
| Seitenkopf-Lead `/funktionen` | genau 1 Satz, ≤ 140 Zeichen |
| Menügruppe Kurzbeschreibung | ≤ 60 Zeichen, kein Satzende-Punkt |
| Menü-Funktionslink | = Funktionsname aus `funktionen.ts` (≤ 32) |
| `FeatureList` Name / Nutzen | ≤ 32 / genau 1 Satz ≤ 100 |
| `FeatureList` Einträge je Gruppe | 1–7 |
| Startseite Abschnitte nach dem Hero | 6–8 (festgelegt: 7), je ≤ 1 `h2` |

Alle Entwürfe dieses Vertrags wurden am 21.10.2026 maschinell gezählt (Node, `Array.from(s).length`): 30 Nutzensätze, max. 95 Zeichen, je genau ein Satz; alle Überschriften, Leads, FAQ-Texte und Meta-Werte innerhalb der Grenzen.

---

## Bewegung und Reduced Motion

Unverändert aus [05]; in dieser Phase **keine neuen Animationen**.

| Element | Bewegung | Dauer | Reduced Motion |
|---|---|---|---|
| Chevron der Disclosure-Schalter | Drehung 180° bei `aria-expanded="true"` | 150 ms ease | sofort |
| Mega-Menü-Panel, Dropdowns, Drawer | **keine** Ein-/Ausblendung, erscheinen sofort | – | – |
| Hover Navigation / Karten / Kacheln / Listenzeilen | Unterstrich bzw. Rahmenfarbe | 150 ms | sofort |
| `.v2-btn-cta` | `translateY(-2px)` nur `hover: hover` | 180 ms | sofort |
| FAQ-Symbol | Drehung 45° | 150 ms | sofort |

- `FeatureSnippet` erscheint auf `/` und `/funktionen` nicht mehr (D-04) → kein Client-JS außer der Menü-Hülle (D-13).
- Kein Inhalt startet unsichtbar; keine Scroll-, Einblend- oder Zähleranimationen [05].
- Prüfung: `emulateMedia({ reducedMotion: "reduce" })` auf `/` und `/funktionen` (auch mit geöffnetem Menü) → `document.getAnimations()` leer, alle Inhalte sichtbar.

---

## Barrierefreiheit

- Landmarks: ein `<header>`, `<nav aria-label="Hauptnavigation">`, `<main id="inhalt">` (Skip-Link „Zum Inhalt“ bleibt erster Tabstopp [BESTAND]), Sprungnavigation `<nav aria-label="Funktionsgruppen">`, `<footer>`.
- Überschriften: genau eine H1 je Seite; Abschnitte H2; Karten/Kacheln/Schritte/„Weitere Funktionen“ H3; keine Ebene übersprungen. Menüinhalte enthalten keine Überschriften.
- Disclosure: `aria-expanded` und `aria-controls` an jedem Schalter; zustandsunabhängige Namen; kein `role="menu"`; `aria-current="page"` an der aktuellen Seite.
- Tastatur: alle Links und Schalter per Tab erreichbar, sichtbarer Fokusring 3 px `#BB7609` (auf Amber `#101014`); Esc mit Fokusrückgabe; Fokus verlässt Header → schließt; Mini-UI `inert` + `aria-hidden` [05].
- Touch-Ziele ≥ 44 × 44 px, im Drawer 48/56 px; Abstand ≥ 8 px.
- Kontrast: Text ≥ 4,5:1 (alle oben genannten Paare erfüllt; `ink-400` nie für Text), Fokusring ≥ 3:1 auf allen Flächen.
- Links eindeutig: „Mehr zu {Name}“; `FeatureList`-Namen als Linktext mit Zielhinweis per `aria-describedby`; StepFlow-Titel als Linktext im Kontext der H2.
- axe (`wcag2a`, `wcag2aa`, `wcag21aa`) ohne serious/critical auf `/` und `/funktionen` in 360/390/768/1024/1440 px sowie mit geöffnetem Mega-Menü (1440) und geöffnetem Drawer (390, Touch).
- Kein horizontaler Seitenscroll bei 360 px; einziger Scrollbereich ist die `ComparisonTable`.

---

## Layout-Stabilität und Performance (CLS, LCP)

- **CLS = 0** auf `/` und `/funktionen` (Playwright `PerformanceObserver`), auch beim Öffnen von Panel und Drawer: Panels überlagern (`absolute`/`fixed`), `scrollbar-gutter: stable` verhindert den Scrollleisten-Sprung, Geräterahmen haben feste Seitenverhältnisse (16:10, 194:410, Bühne 4:3) [05].
- **LCP:** H1 der Startseite (Text, kein Bild); kein Lazy-Load oberhalb der Falz; keine neuen Rasterbilder.
- Client-JS nur `HeaderShell` und die Blattkomponente `ActiveLink`; `lib/funktionen.ts` und `lib/product-register.ts` gelangen nicht ins Client-Bundle (Menüinhalt als Server-Slot).
- Panel-Links mit `prefetch={false}`, wenn der Prefetch-Burst beim Öffnen messbar stört [RESEARCH Pitfall 11]; Hauptpunkt-Links behalten Standard-Prefetch.

---

## Prüfmatrix für Planer und Auditor

| Prüfung | Werkzeug | Erwartung |
|---|---|---|
| Texte und Budgets `/`, `/funktionen`, Menü | Vitest (`tests/home.test.ts`, `tests/funktionsgruppen.test.ts`, `design-v2-budgets`) | alle Felder im Budget, Leads/Nutzensätze genau 1 Satz, 7 Abschnitte nach dem Hero |
| Parität Register ↔ Gruppen ↔ Menü ↔ Übersicht | Vitest | 16 Detailfunktionen + 14 `advertised`-Zusatzfunktionen, je genau einer Gruppe; „Vorhersagen“ fehlt; jedes `href` in `sitemap()` oder Anker auf `/funktionen` |
| Kennzahlen-Herkunft, Preise | Vitest + bestehende Paritäts-/Literal-Scans | Werte gleich `site`/`tarife`/`mobileLocales`; keine Preisliterale |
| SEO | Vitest `keyword-map.test.ts` (D-12) | gerenderter Title, H1, Description = Zielwerte; Keyword in Title und H1 |
| Above the fold | Playwright, 5 Viewports | Kriterien der Hero-Tabelle |
| H1 ohne Trennung | Playwright | Keyword-Span ≤ Containerbreite, kein horizontaler Scroll |
| Menü Tastatur/Touch/Hover | Playwright (Chromium, WebKit mit `Alt+Tab`-Muster) | Zustände und Tastatur laut Tabelle; Breakpoint-Reset; Scroll-Lock ohne Breitenänderung von `main` |
| Zwei Klicks | Playwright | jeder `[data-funktion]`-Eintrag nach genau einer Aktivierung über sichtbaren Menülink oder Gruppenlink erreichbar; mobil Funktionen vorgeöffnet; Ziele HTTP 200 |
| Ohne JS | Playwright `javaScriptEnabled: false`, 1440 und 390 | Hauptpunkt-Links sichtbar, `/funktionen` erreichbar, Menülinks im HTML |
| Belege im HTML | Playwright | `data-evidence` erfüllt `^(web\|app):[^\s/]+$` |
| Kennzeichnung | Playwright | jede Rahmen-`figure` enthält „Vereinfachte Darstellung mit Beispieldaten“ |
| Reduced Motion, CLS, axe | Playwright | wie oben |

Neue Spec-Dateien in `tests/e2e/playwright.config.cjs` `testMatch` eintragen; alle Prüfungen lokal (globale Regel 5).

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | keine – shadcn nicht initialisiert (Tool: none) | not applicable |
| Drittanbieter-Registries | keine | not applicable |
| 21st.dev | keine Blöcke; höchstens Inspiration über `21st_magic_component_inspiration` (in dieser Sitzung nicht verfügbar), kein übernommener Code | not applicable (kein Code-Import) |

Neue npm-Abhängigkeiten: keine [RESEARCH Standard Stack].

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: FLAG (28 px nur für H1 der Startseite < 400 px; Test sichert das ab)
- [x] Dimension 5 Spacing: FLAG behoben (Menülinks 44 px)
- [x] Dimension 6 Registry Safety: PASS

Geprüft: 2026-10-21, gsd-ui-checker (2. Durchgang, nach Überarbeitung)

**Approval:** approved 2026-10-21
