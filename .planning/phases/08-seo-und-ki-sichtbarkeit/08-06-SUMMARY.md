---
phase: 08-seo-und-ki-sichtbarkeit
plan: 06
subsystem: wettbewerber-daten
tags: [wettbewerber, uwg, provenienz, hero-screenshot, d-01, d-02, d-04, d-16, f1]
requires:
  - phase: 08-01
    provides: D-23-Ausnahme lib/wettbewerber/ im Testphasen-Scan mit Gegenprüfung tageAusserhalbFeld, KeyFacts-Kurzform wettbewerber:
  - phase: 08-03
    provides: ComparisonTable-Quellenliste (ComparisonSource), FitPanels
provides:
  - lib/wettbewerber/types.ts – Quelle, Fakt<T>, Preis (stattCents, ersterJahrespreis, regulaerDerzeitCents, ab), Wettbewerber, QuellenEintrag; clientneutral
  - lib/wettbewerber/index.ts – UWG_WORTLISTE, uwgTreffer, pruefeText, pruefeWettbewerber, alterWarnung, monatAusJahr, craftosRechenbeispiel, faktenVon, standVon, quellenFuer, heroVariante, heroPreise, HERO_VARIANTE_B_HINWEIS, CRAFTOS_OHNE, Liste wettbewerber
  - Vier Datenmodule plancraft, craftnote, hero, tooltime mit Neuprüfung am 22.10.2026 je Angabe
  - lib/site.ts vertrag (AGB § 5)
  - HERO-Screenshot-Beleg beider Umschalterstellungen unter craftos/docs/seo/belege/ (Variante A)
affects: [08-07, 08-08, 08-09, 08-10, 08-11, 08-14]
tech-stack:
  added: []
  patterns:
    - "Jede Wettbewerberangabe ist ein Fakt mit https-Quelle auf der Herstellerdomain und Abrufdatum; pruefeWettbewerber wirft mit Abhilfe"
    - "Tageszahlen in lib/wettbewerber nur als Feld (testphaseTage, kuendigungsfristTage) oder im zitat-Schlüssel; Sätze per Vorlage"
    - "Monatswerte aus Jahresbeträgen zentral über monatAusJahr (Summe in Cent, am Ende gerundet)"
    - "Ankündigungsprüfung bezieht die Namen nicht-live Funktionen aus getProductRegister().notLive statt aus Literalen"
key-files:
  created:
    - craftos/lib/wettbewerber/types.ts
    - craftos/lib/wettbewerber/index.ts
    - craftos/lib/wettbewerber/plancraft.ts
    - craftos/lib/wettbewerber/craftnote.ts
    - craftos/lib/wettbewerber/hero.ts
    - craftos/lib/wettbewerber/tooltime.ts
    - craftos/tests/wettbewerber.test.ts
    - craftos/docs/seo/belege/2026-10-22-hero-preise-monatlich.png
    - craftos/docs/seo/belege/2026-10-22-hero-preise-jaehrlich.png
  modified:
    - craftos/lib/site.ts
    - craftos/lib/funktionsdetails/index.ts
key-decisions:
  - "08-06: HERO Variante A – zwei Playwright-Screenshots (Chromium 1440 × 900, „Nur notwendige Cookies“) belegen Monatlich = 79/135/345 €, Jährlich = 69/119/299 €, App-Lizenz 25/22 €, weitere Standard-Lizenz 79/69 €; je rund 40 KB"
  - "08-06: Typvertrag ergänzt um kuendigungsfristTage (Fakt<number>, ToolTime 30 Tage) und angaben (Record<string, Fakt<string>> für FAQ-/Panel-Einzelangaben), weil Tageszahlen im Freitext den Testphasen-Gegencheck verletzen und FAQ-Werte sonst kein Feld hätten"
  - "08-06: U6-Fairnesskriterium technisch über CRAFTOS_OHNE = kiTelefon, fahrzeugortung (KI-Telefonie nicht live laut Register, Zeiterfassung ohne Bewegungsverläufe)"
  - "08-06: Ankündigungsprüfung in pruefeWettbewerber mit Register-Namen (notLive) und Stämmen „angekündig…“/„geplant…“ (Unicode-Wortanfang, „eingeplant“ trifft nicht)"
  - "08-06: ersteDoppelung aus lib/funktionsdetails exportiert und wiederverwendet; lib/wettbewerber/index.ts ist damit server-only (types.ts bleibt clientneutral)"
requirements-completed: []
duration: 31min
completed: 2026-10-22
---

# Phase 8 Plan 06: Belegte Wettbewerberdaten Summary

**Vier Wettbewerber-Datenmodule (plancraft, Craftnote, HERO, ToolTime) mit Quelle und Abrufdatum je Angabe, am 22.10.2026 auf den offiziellen Seiten neu geprüft; Prüf- und Rechenfunktionen (UWG-Wortliste, Statt-/Erstjahrespreise, Stärken-Pflicht, Alterswarnung, `monatAusJahr` mit 58,13 €), CraftOS-Vertragskonstante aus AGB § 5 und HERO-Preise per Screenshot-Beleg beider Umschalterstellungen (Variante A).**

## Performance

- **Dauer:** 31min (Start 16:57 UTC, inklusive Wartezeit auf die zentrale Sperre für `npm ci` und `npm test`)
- **Tasks:** 2/2
- **Dateien:** 9 neu, 2 geändert

## Accomplishments

- `lib/wettbewerber/types.ts`: Typvertrag laut Plan, ergänzt um `kuendigungsfristTage` und `angaben` (siehe Abweichungen), plus `QuellenEintrag` (deckungsgleich mit `ComparisonSource` aus 08-03).
- `lib/wettbewerber/index.ts`: `UWG_WORTLISTE` (17 Einträge, Unicode-Wortgrenzen per Lookaround, damit auch Wörter mit Umlaut korrekt begrenzt sind), `pruefeText`, `pruefeWettbewerber` (U1 Quelle/Domain/Datum, U3 Preisfelder, U6 Stärken und Fairnesskriterium, U7, U8 Schreibweise, U9 Ankündigungen, U11 HERO-Variante B ohne Zahlen, Doppelungen über `ersteDoppelung`), `alterWarnung` (ältestes Abrufdatum > 60 Tage → `console.warn`, kein Abbruch), `monatAusJahr` (5813 Cent für 1 Voll + 4 App), `craftosRechenbeispiel` aus `tarife` (5813 / 6975 Cent), `faktenVon`, `standVon`, `quellenFuer` (eindeutige Quellen mit Anbieter und jüngstem Abrufdatum, direkt für die ComparisonTable-Quellenliste), `heroVariante`, `heroPreise`, `HERO_VARIANTE_B_HINWEIS`, Liste `wettbewerber`.
- Vier Datenmodule mit lokaler `QUELLEN`-Konstante, Fakten je Angabe, Stärken (je 3) und Kriterien nach UI-SPEC § 3.6/§ 4; keine CraftOS-Werte in den Modulen.
- `lib/site.ts`: `vertrag = { monat: "monatlich kündbar", jahr: "zum Ende der Laufzeit kündbar" }` mit Quellkommentar AGB § 5; `app/agb/page.tsx` unverändert.
- Tests (`tests/wettbewerber.test.ts`, 45 Fälle): Fixture-Regeln, alle vier Module (Provenienz, Domain, Datum, Quelltext ohne Ankündigung/UWG-Wort/`http://`), Werte laut Neuprüfung, HERO-Variante gegen `fs.existsSync` der Belege und ≤ 300 KB, Rechenbeispiele der UI-SPEC (58,13 €, 69,75 €, 179,40 €/224,40 €, 109,50 €/129,50 €, ab 157 €/179 €, Marktspanne 29,95–89 €, Testphasen 7–30).

## Neuprüfung je Quelle (22.10.2026, curl-Abruf der offiziellen Seiten, Werte von Hand übernommen)

| Anbieter | Quelle | Ergebnis |
|---|---|---|
| plancraft | https://plancraft.com/de-de/preise | unverändert: Business 74,90/59,90/47,92 €, Pro 139,90/109,90/87,92 €, Premium 249,90/199,90/159,92 €; Bürozugang +59,90/+49,90/+39,92 €; Mobilzugang +24,90/+19,90/+15,92 €; Plantafel Premium inkl., sonst +49,90/+39,90/+31,92 €; enthaltene Bürozugänge 1/2/3; DATEV-Export in allen Paketen (Häkchen in allen drei Spalten), GAEB ab Pro, KI-Empfang „inkl. 60 credits pro Monat“ in allen Paketen; Kündigung „Bis einen Tag vor Mindestvertragslaufzeitende“; nach dem Test 0-€-Tarif; Kreditkarte und PayPal |
| plancraft | https://plancraft.com/de-de/handwerkersoftware-kleinbetriebe | unverändert: 7 Tage kostenlos, ohne Kreditkarte und ohne automatische Verlängerung |
| plancraft | https://plancraft.com/de-de/funktionen/handwerk-rechnungsprogramm | unverändert: E-Rechnung „im XRechnungs-Format“, in jedem Paket; App „Egal ob Android oder iOS“; DATEV-Export genannt |
| Craftnote | https://craftnote.de/preise/ | unverändert: Büro Plus 49,90 € statt 69,90 €, Büro 29,90 €, Baustelle 14,90 € (pro Nutzer/Monat, exkl. MwSt., jährliche Abrechnung); Laufzeit ein Jahr, automatische Verlängerung um ein Jahr, Kündigungsfrist drei Monate; Zeit-Modul 49,90 € (jährliche Abrechnung, je Monat); Fahrzeug-Modul 24,90 € je Tracker und Monat im ersten Jahr; DATEV-Export, IDS-Connect, Datanorm nur Büro Plus; iOS ab 14.5, Android ab 8.0, Web-App; SEPA (DE/AT) oder Kreditkarte; mindestens ein Büropaket |
| Craftnote | https://craftnote.de/ | unverändert: 30 Tage Büro-Plus-Umfang, keine Zahlungsmethode, endet automatisch; Plantafel „Engpässe, Terminkonflikte und freie Kapazitäten“ |
| Craftnote | https://craftnote.de/buero-plus/ | unverändert: „GoBD-konform und E-Rechnungsfähig“, DATEV-Export |
| HERO | https://hero-software.de/preise | Zahlen unverändert (69/79, 119/135, 299/345 €; App 22/25 €; Standard 69/79 € ab HERO OS); Zuordnung per Screenshot belegt (Variante A). **Geändert:** Die Preisseite nennt im statischen HTML keine Testphasendauer mehr → Testphase jetzt aus AGB 9.1 belegt |
| HERO | https://hero-software.de/rechtliches/agb | unverändert: 3.5 netto; 9.1 Testphase von 14 Tagen kostenfrei; 9.2 Grundlaufzeit zwölf Monate, Kündigungsfrist ein Monat, automatische Verlängerung |
| HERO | https://hero-software.de/features/rechnungsprogramm-handwerker/e-rechnung | unverändert: Erstellung von ZUGFeRD und XRechnung; XRechnung-Import „zukünftig“ (nicht übernommen); „14 Tage lang“ kostenfrei |
| ToolTime | https://www.tooltime.app/preise | unverändert: Solo 89/69 € (1. Jahr)/regulär 79 €, Team 169/145/149 €, Max 329/279/299 €; je Lizenz Team 34/29 €, Max 33/28 €; Fußnote Erstjahrespreise; Mindestlaufzeit 12 Monate; 7-tägige Testversion; DATEV Rechnungsdatenservice 1.0 19 €/Monat; Assistant 59 €/Monat inkl. 100 Minuten; GAEB-Import & Export; Lexware Office Team/Max, Solo auf Anfrage. Neu ablesbar: regulärer Jahrespreis je Lizenz 30 € (Team, Max) → als `regulaerDerzeitCents` hinterlegt |
| ToolTime | https://www.tooltime.app/rechtliches/nutzungsbedingungen | unverändert: 4.1 „zzgl. gesetzlicher MwSt.“; 9.1 Kündigungsfrist dreißig (30) Tage zum Laufzeitende, Verlängerung um die Mindestlaufzeit; 9.4 schriftlich oder in Textform |
| ToolTime | https://www.tooltime.app/ | unverändert: „Keine Zahlungsinfos notwendig“, „E-Rechnung (XRechnung/ZUGFeRD) inklusive“, App „für iOS & Android“, Desktop-Version |
| ToolTime | https://www.tooltime.app/digitale-plantafel | unverändert: Drag & Drop, Tages-/Wochenansicht, Abwesenheitswarnung, Sync mit der App, Offline-Zugriff auf Einsatzpläne |

**Entfallene bzw. bewusst nicht übernommene Angaben:** plancraft KI-Empfang-Credit-Staffel und Tarif „Flexibel“ (uneindeutig), Funktionen, die plancraft noch nicht als verfügbar führt; Craftnote GAEB (nicht genannt), Hilfeartikel N2/N5, PDF-Formular-Paket/Schulungen (Einmalpreise, auf keiner Seite benötigt); HERO DATEV/GAEB (nicht gefunden), Einführungsangebot (nur Drittquellen), XRechnung-Import (laut HERO zukünftig), Preisanpassung AGB 9.3 (keine Seite braucht sie); ToolTime „Weitere Mitarbeiter“ (Tabelle 29/35 € vs. FAQ 29,90 €), Datanorm-Import-Gebühr (Tabellenzuordnung uneindeutig), Persönliche Schulung, ToolTime Pay.

## HERO-Beleg (D-16): Variante A

- Skript: Playwright (Chromium aus `craftos/node_modules/@playwright/test`), 1440 × 900, `https://hero-software.de/preise`. Der Cookie-Banner bietet nur „Anpassen“ und „Alles erlauben“; das Skript öffnet „Anpassen“, lässt alle optionalen Kategorien abgewählt und klickt „Nur notwendige Cookies“.
- Ausschnitt: Umschalter + Preiskarten (Clip 1232 × 375 px).
- `2026-10-22-hero-preise-monatlich.png` (39,9 KB): Umschalter „Monatlich“ aktiv → HERO Select ab 79 €, HERO OS ab 135 €, HERO OS Plus ab 345 €, App-Lizenz 25 €, weitere Standard-Lizenz 79 €.
- `2026-10-22-hero-preise-jaehrlich.png` (39,8 KB): Umschalter „Jährlich – über 10 % sparen“ aktiv → 69 €, 119 €, 299 €, App-Lizenz 22 €, weitere Standard-Lizenz 69 €.
- Beide Bilder selbst angesehen: Umschalterzustand und Preise eindeutig lesbar und verschieden; kein Aktions- oder Einführungspreis erkennbar. Deshalb `preiseBelegt` gesetzt und die Dateien nach `craftos/docs/seo/belege/` kopiert und committet.

## Task Commits

1. **Task 1: Typen, Prüf- und Rechenfunktionen, Vertragskonstante** – `ed33801` (test, RED), `109cc81` (feat, GREEN)
2. **Task 2: Vier Datenmodule, Neuprüfung, HERO-Beleg** – `4ef5596` (test, RED), `61e25ab` (feat, GREEN)

## Prüfergebnisse

- `npx vitest run tests/wettbewerber.test.ts tests/pricing-parity.test.ts tests/announcements.test.ts tests/funktionsdetails.test.ts`: alle grün außer dem bekannten externen Fall „Snapshot ist aktuell“ (siehe unten).
- `npm test` (volle Suite, unter der Sperre): 34 Dateien, 656 von 657 Tests grün; einziger Fehlschlag „Snapshot ist aktuell“ (extern, siehe Issues). Start 19:26:30 Ortszeit, nach der letzten Codeänderung.
- `npm run typecheck`: grün. `npm run lint`: grün. `node scripts/check-no-secrets.mjs lib docs/seo`: „OK: Schlüssel in keiner Datei“.
- Akzeptanz-greps: `UWG_WORTLISTE`, `monatAusJahr`, `vertrag` je 1; `"server-only"` in types.ts 0; `Telefon-Agent|MCP-Server|angekündigt` je Datei 0; `preiseBelegt` in hero.ts 2; https je Modul 3–4, `http://` 0; `find craftos/docs/seo/belege -size +300k` leer; `git diff HEAD -- craftos/app/agb/page.tsx` leer.

## Decisions Made

Siehe `key-decisions` im Frontmatter.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 – Blocking] WebFetch nicht verfügbar → curl-Abruf**
- **Found during:** Task 2 (Neuprüfung)
- **Issue:** Das WebFetch-Werkzeug stand dem Ausführungsagenten nicht zur Verfügung.
- **Fix:** Alle 13 Research-Quellen per `curl` (Browser-User-Agent, `Accept-Language: de-DE`) in den Scratchpad geladen, per Python zu Text reduziert und die Einzelwerte von Hand verglichen; HTML wurde nicht übernommen (T-08-16). HERO-Zuordnung zusätzlich per Playwright.
- **Files modified:** keine Repo-Dateien

**2. [Rule 3 – Blocking] Typvertrag um `kuendigungsfristTage` und `angaben` erweitert**
- **Found during:** Task 2
- **Issue:** Der Gegencheck `tageAusserhalbFeld` (08-01) meldet jede „N Tage“-Angabe außerhalb von `testphaseTage`/`zitat`; die ToolTime-Frist (30 Tage) hätte im Feld `kuendigung` als Freitext stehen müssen. FAQ-Werte (Zahlungsarten, Test ohne Kreditkarte, 0-€-Tarif, Mindestpaket) hatten kein Feld.
- **Fix:** Optionale Felder `kuendigungsfristTage?: Fakt<number>` und `angaben?: Record<string, Fakt<string>>`; beide werden von `faktenVon`/`pruefeWettbewerber` vollständig geprüft. Tageszahlen in Stärken-Sätzen per Vorlage (`${TESTTAGE} Tage`), in Zitaten unter dem Schlüssel `zitat`.
- **Files modified:** craftos/lib/wettbewerber/types.ts, index.ts, Module
- **Commit:** `109cc81`, `61e25ab`

**3. [Rule 1 – Bug] Ankündigungs-Wortliste kollidierte mit announcements.test.ts**
- **Found during:** Task 2 (Verify)
- **Issue:** Die Literal-Liste „Telefon-Agent“/„MCP-Server“ in `index.ts` und ein Kommentar „Bald verfügbar“ in `plancraft.ts` lösten den strengen `CODE_PATTERN`-Scan aus; „angekündigt“ als Literal verletzte das Akzeptanzkriterium (0 je Datei).
- **Fix:** Namen aus `getProductRegister().notLive`, Ankündigungsstämme „angekündig…“/„geplant…“ als Präfixmuster; Kommentar umformuliert. `announcements.test.ts` bleibt unverändert streng.
- **Files modified:** craftos/lib/wettbewerber/index.ts, plancraft.ts
- **Commit:** `61e25ab`

**4. [Rule 3] `ersteDoppelung` exportiert**
- Plan verlangt Wiederverwendung statt Kopie; `lib/funktionsdetails/index.ts` exportiert die Funktion jetzt (eine Zeile, Kommentar ergänzt). Geteilte Datei außerhalb von `files_modified`.

---

**Total deviations:** 4 (2 blocking, 1 bug, 1 kleine Export-Änderung). **Impact:** Keine Ausweitung des Umfangs; Typvertrag nur additiv erweitert.

## Issues Encountered

- `pricing-parity.test.ts` „Snapshot ist aktuell“ ist weiterhin rot: `origin/release` des Web-Repos steht jetzt auf `a9319e5…`, der Snapshot auf `1e9c8bc…`. Bekannter Befund aus 08-03 (deferred-items.md, Produktsync), unabhängig von 08-06.
- Wartezeiten auf die zentrale Sperre (08-04, 08-12) für `npm ci` und `npm test`.

## Geteilte Dateien (für den Merge)

- `craftos/lib/site.ts`: neue Konstante `vertrag` vor `creditPakete` (nur Einfügung).
- `craftos/lib/funktionsdetails/index.ts`: `ersteDoppelung` jetzt `export` (eine Zeile + Kommentar).
- `craftos/tests/pricing-parity.test.ts`: **nicht** geändert (Ausnahme und Gegencheck aus 08-01 genügen).

## Known Stubs

Keine. Die Module sind reine Daten; Seiten (08-07 ff.) rendern sie noch nicht.

## Threat Flags

Keine neue Angriffsfläche (keine Endpunkte; externe Abrufe nur zur Ausführungszeit, nicht im Build).

## Next Phase Readiness

- 08-07 bis 08-11 können Tabellen, KeyFacts, FitPanels, FAQ und Quellenlisten aus `wettbewerber`, `quellenFuer`, `standVon`, `craftosRechenbeispiel` und `heroPreise` bauen; HERO rendert Variante A.
- Die KeyFacts-Kurzform `wettbewerber:<schlüssel>` (08-01) braucht noch Schlüssel je Rechenbeispiel in den Seitenmodulen.

## Self-Check: PASSED

Alle neun angelegten Dateien vorhanden; Commits ed33801, 109cc81, 4ef5596, 61e25ab im Branch phase08-spur-b gefunden.
