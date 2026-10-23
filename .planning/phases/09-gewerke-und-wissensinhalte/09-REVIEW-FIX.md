---
phase: 09-gewerke-und-wissensinhalte
fixed_at: 2026-10-23T07:10:00Z
review_path: .planning/phases/09-gewerke-und-wissensinhalte/09-REVIEW.md
iteration: 1
findings_in_scope: 23
fixed: 23
skipped: 0
status: all_fixed
---

# Phase 9: Bericht zur Behebung der Review-Befunde

**Behoben am:** 23.10.2026
**Quelle:** `.planning/phases/09-gewerke-und-wissensinhalte/09-REVIEW.md` (24 Befunde: 1 High, 4 Medium, 10 Low, 9 Info)
**Arbeitsbaum:** `C:/Projekte/Websitenerstellung` (Branch `main`), kein Push
**Release-Abgleich (nur lesend):** Web `origin/release` = `c5b5135`, Mobile `origin/release` = `837aab4f`

**Zusammenfassung:**
- Befunde im Umfang: 23 (IN-09 ist eine Bestätigung ohne Befund und braucht keine Änderung)
- Behoben: 23, davon IN-06 ohne eigenen Commit durch ME-03
- Übersprungen: 0
- 22 atomare Commits, jeder mit Test (rot vor grün, wo sinnvoll) und der Zeile `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

## Befund → Commit → Prüfung

| Befund | Commit | Änderung | Prüfung |
|---|---|---|---|
| HI-01 | `ad04e2d` | `content-pruefen --zitate` zählt nur Nutzer-Oberflächentexte (neu `scripts/lib/zitat-belege.mjs`) | 11 neue Tests (rot: Modul fehlte); Gegenprobe mit JSDoc-Text aus `SheetActions.tsx` und „Bank → Kassenbu“ rot, „KI-Agent“ meldet Hinweis |
| ME-04 | `0adf7ba` | Listenwort-Ausnahme entfernt (Test und Skript); Satzprüfung `NEGATIVSATZ` auch für Antwort, FAQ und Prosa aller Artikel (`artikelAussagen`) | 3 neue Tests (rot: Funktion fehlte); Probe `label: "Onlinezahlung"` im Skript gemeldet |
| LO-10 | `ae70fef` | GAEB-Ausnahme nur für Frage-Abschnitte ohne Produktbezug (`produktbezug` in `leitlinie-l1.json`) | Fixture mit „Web-App“, „craftos“ und Nicht-Frage-H2 (rot, danach grün); Skriptprobe |
| LO-05 | `9cf0d95` | `--antwort`: fehlende Antwort ist Befund, 1–2 Sätze, Frage-Antworten über `answerFirstViolations` wie das Audit (`scripts/lib/antwort-pruefung.mjs`) | 5 neue Tests (rot: Modul fehlte); 84 Artikel 0 Befunde |
| ME-02 | `da2be95` | Offline-Bereitschaft mit Frist „bis zu 24 Stunden“, Vorbereitung „am Tag des Einsatzes“ in Offline-Ratgeber, Hilfe Offline-Synchronisierung, Ratgeber Web-App/Baustellen-App und Fakten-Seite; Belegpfade in 09-b, 09-c, 09-e | Neuer Test „kein Satz verspricht Offline-Bereitschaft ohne Frist“ (rot mit 4 Treffern) |
| ME-03 | `a046be4` | Bauunternehmen, `/funktionen/kundenportal` (Ablauf, Kacheln, FAQ, H1 der Keyword-Map), Hilfe Kundenportal und Online-Unterschrift beschreiben nur Erreichbares | Neuer Test gegen Portal-Versprechen (rot mit 5 Treffern); Bauunternehmen-Test |
| ME-01 | `2528276` | `.artikel-toc` mit `max-height: calc(100vh - 116px)`, `overflow-y: auto`, `overscroll-behavior: contain`, Platz für den Fokusring | Neuer E2E-Fall 1366 × 768 auf `/hilfe/zeiteintrag-erfassen-korrigieren`: am alten Build rot (Verzeichnis endete bei 803,5 px), jetzt grün in Chromium und WebKit; Sichtprüfung |
| LO-01 | `d84366d` | Reservierte ids um `inhalt`, `artikel-titel`, `seiten-titel`, `hauptnavigation` und Präfix `navigation-` ergänzt | Neuer Regeltest (rot) und Synchrontest gegen Layout, Kopf und Vorlagen |
| LO-02 | `552961a` | Inhaltsverzeichnis aus dem hast-Baum über `file.data` statt Regex auf HTML | Neuer Test mit `<`, `&`, Anführungszeichen, Inline-Code, Link (rot: `&#x3C;`) |
| LO-03 | `92fc7cb` | `role="list"` an beiden TOC-Listen, H3 als Unterliste im H2-Eintrag | Neuer Rendertest (rot); DOM-Reihenfolge siehe Grenzen |
| LO-04 | `87e1fde` | `LinkKarten` mit `ohneMaximum`, genutzt von `ContentSearch`; andere Raster bleiben bei 60 | Test 70 Anleitungen (rot: Budgetfehler), 61 Karten außerhalb der Suche werfen weiter; Abstand der realen Hilfe-Suche (54) benannt |
| LO-06 | `3b4e7d0` | Test: `relatedArticles` folgen `/blog|hilfe/<slug>`, nicht selbstbezüglich, lösen als veröffentlichter Artikel auf | grün (keine aktuellen Verstöße, reiner Schutztest) |
| LO-07 | `ba20bc0` | Veralteten Kassenbuch-Sperrtest der Gewerke entfernt | Gewerke-Tests grün; Zweck deckt „kein Artikelziel ist ein Entwurf“ |
| LO-08 | `e1ef13f` | `/blog`, `/hilfe` und Kategorien über `uebersichtStand` aus `updatedAt`; `/gewerke` aus `GEWERKE_STAND` | Test der Ableitung (rot: Funktion fehlte) |
| LO-09 | `4d648d8` | Kassenbuch: „Admin oder Voll-Lizenz (Büro) mit „Globale Finanzbereiche““; Link auf Rollen; Belegpfade in 09-f | Neuer Test gegen die alte Formel (rot) |
| IN-04 | `07127dc` | Status „n Anleitungen gefunden“ auf /hilfe, Suchfeld `type="search"`, `autoComplete="off"` | Neuer Rendertest (rot: „2 Artikel gefunden“) |
| IN-05 | `2583729` | `ContentKopf` mit `region`; im Artikel keine zweite Region mit dem Namen der H1 | Neuer Rendertest (rot) |
| IN-07 | `34fb0e0` | Weitere Tabellen unter derselben H2 heißen „Tabelle 2: …“ | Neuer Test (rot) |
| IN-08 | `70b4480` | `zusammengesetzteTexte` für `+`-Ketten und Template-Literale in L-1 (Test und Skript) | Neuer Fixture-Test (rot); TS-Daten 0 Befunde |
| IN-03 | `4627ddb` | Modulkommentar korrigiert, `import "server-only"` in `lib/gewerke.ts` | Typprüfung, Build und Gewerke-Tests grün |
| IN-02 | `84a52bf` | `categoryIcons` nach `lib/content-icons.ts` (nur Server); `content-types.ts` ohne `lucide-react` | Neuer Strukturtest (rot) |
| IN-01 | `5fbad3b` | `components/v2/Abschnitt.tsx`, `lib/funktionskarten.ts`, `lib/content-cta.ts`, `germanDate` statt Kopien | Strukturtest gegen erneute Kopien; Rendertests unverändert grün |
| IN-06 | – (durch `a046be4`) | Die Szene zeigt bereits `web:Angebotsunterschrift` (09-16); seit ME-03 beschreibt die Karte „Kundenportal“ genau diese Online-Unterschrift | Funktionsdetail-Tests zur Szene grün |
| IN-09 | – | Bestätigung ohne Befund (Sanitize, JSON-LD, Links, Secrets, FAQPage, BreadcrumbList) | keine Änderung nötig |

## Fixed Issues

### HI-01: `content-pruefen --zitate` belegt Existenz statt Erreichbarkeit

**Geänderte Dateien:** `craftos/scripts/content-pruefen.mjs`, `craftos/scripts/lib/zitat-belege.mjs` (neu), `craftos/tests/content-pruefen-zitate.test.ts` (neu)
**Commit:** `ad04e2d`
**Umsetzung:** Treffer zählen nur aus Nutzer-Oberflächentexten: JSX-Text, String-Literale von Quelldateien (auch Attributwerte), Werte deutscher Sprachdateien (`i18n/locales/de/*.json`). Kommentare, JSDoc, Modulpfade, Literal-Typen, Tests, `__mocks__`, `__fixtures__`, `fixtures`, `test/`, `eval/`, Stories und `.d.ts` zählen nicht. Kandidaten per `git grep -l`, Inhalte per `git cat-file --batch`, Auswertung über den TypeScript-Parser. Menüpfade mit „→“ sind belegt, wenn jedes Segment innerhalb einer App ein ganzes Label ist oder der Pfad als Ganzes in einem Text steht.
**Freischaltung:** Als Heuristik umgesetzt (optional laut Auftrag): Stehen alle App-Fundstellen (`src/`) eines Zitats in Dateien mit `isDeveloper`, `usePlatformDeveloper`, `isPlatformDeveloper`, `useFeatureFlag` oder `isFeatureEnabled`, meldet das Skript einen Hinweis „Erreichbarkeit prüfen“ (Probe „KI-Agent“ am Web-Release schlägt an). Grenze im Skriptkopf festgehalten, siehe unten.
**Lauf `--zitate --l1 --antwort` über alle Artikel (je Paket mit seiner Prüfdatei):** 84 Artikel in 8 Paketen plus `lib/gewerke.ts`: 0 Befunde, 15 Hinweise (nur Kurzbegriffe unter 4 Zeichen wie „CSV“, „Von“, „Bis“, „KI“, „OK“), 0 Freischaltungs-Hinweise. Echte neue Befunde in den Artikeln: keine.

### ME-01: Sticky-Inhaltsverzeichnis ohne Höhenbegrenzung

**Geänderte Dateien:** `craftos/app/globals.css`, `craftos/tests/e2e/design-v2.pw.cjs`
**Commit:** `2528276`
**Umsetzung:** Ab 1024 px `max-height: calc(100vh - 116px)`, `overflow-y: auto`, `overscroll-behavior: contain`, `padding: 8px` mit `margin: -8px` für den Fokusring. E2E-Fall bei 1366 × 768 mit dem längsten Artikel (15 Einträge). Sichtprüfung Chromium und WebKit: Das Verzeichnis scrollt selbst, der letzte Eintrag ist mit Fokusring vollständig sichtbar (Screenshots unten).

### ME-02: Offline-Ratgeber verspricht dauerhaftes Offline-Lesen

**Geänderte Dateien:** `craftos/content/blog/offline-baustellen-app.md`, `craftos/content/hilfe/mobile-offline-synchronisierung.md`, `craftos/content/blog/web-app-baustellen-app.md`, `craftos/lib/seiten/fakten.ts`, `craftos/tests/kernseiten.test.ts`, `craftos/tests/content-produktwahrheit.test.ts`, `craftos/docs/content-pruefung/09-b.md`, `09-c.md`, `09-e.md`
**Commit:** `da2be95`
**Beleg:** Mobile `src/AppRoot.tsx` Z. 209–211 (`maxAge: 1000 * 60 * 60 * 24`, „Persistierten Cache nach 24h verwerfen“), `src/shared/lib/query-client.ts` Z. 43–44 (`gcTime` 24 h).
**Umsetzung:** Positiv formuliert: „Die App hält jede geladene Ansicht danach bis zu 24 Stunden auch offline bereit.“ Vorbereitung „am Tag des Einsatzes“. Die Fakten-Seite (`/fakten-ueber-craftos`) machte dieselbe Aussage ohne Frist und ist mit angepasst.

### ME-03: „Kundenportal für Bauherren“ als Leistung

**Geänderte Dateien:** `craftos/lib/gewerke.ts`, `craftos/lib/funktionsdetails/angebot.ts`, `craftos/content/hilfe/kundenportal-kunden-einladen.md`, `craftos/content/hilfe/angebot-online-unterschreiben-lassen.md`, `craftos/docs/seo/keyword-map.json`, `craftos/docs/seo/KEYWORD-MAP.md`, `craftos/docs/content-pruefung/09-a.md`, `09-f.md`, `craftos/tests/content-produktwahrheit.test.ts`
**Commit:** `a046be4`
**Release-Prüfung (Web `c5b5135`):** `/portal/*` (auch `/portal/projects` nach Login und Einladung) zeigt `CustomerPortalHome.tsx`: Überschrift „Ihre Unterlagen“ und der Satz „Ihre Unterlagen öffnen Sie über den Link in der E-Mail Ihres Handwerksbetriebs.“ Keine Liste, kein Link, im Portalmenü nur „Startseite“. Kein Quelltext in `src` oder `supabase/functions` verlinkt `/portal/quotes/:id` oder `/portal/invoices/:id`. Belegt erreichbar sind die öffentliche Unterschriftsseite `/angebot-unterschreiben` aus der Angebotsmail und das Rechnungs-PDF als Mailanhang.
**Umsetzung:**
- Gewerke-Seite Bauunternehmen: Antwort „… und die Online-Unterschrift von Angeboten für Bauherren“, FAQ ohne Portal-Satz („Rechnungen erhält er als PDF-Anhang“), Funktionskarte `angebote` statt `kundenportal`.
- Hilfe-FAQ: „Wie bezahlen Kunden Ihre Rechnungen?“ statt „… aus dem Portal?“.
- `/funktionen/kundenportal` (Seite bleibt): Ablauf „Kundenportal: Online-Unterschrift in vier Schritten“ (E-Mail hinterlegen → Angebot senden → öffnen → beantworten), Kachel „Ohne eigenes Konto“ statt „Einladung mit Anmeldecode“, Pflichtantwort nur mit Online-Unterschrift, PDF und Überweisung, FAQ „Wie sehe ich, ob mein Kunde ein Angebot unterschrieben hat?“ statt der Portal-Vorschau. Die Portal-Vorschau zeigt Belege, die der Kunde im Portal nicht erreicht, und wird deshalb nicht mehr beworben. H1 der Keyword-Map „Kundenportal: Angebote online unterschreiben lassen“ statt „ein gemeinsamer Ort für Ihre Kunden“.
- Hilfeartikel `kundenportal-kunden-einladen` (Seite bleibt): Antwort und Einleitung nennen Online-Unterschrift und PDF per E-Mail; Schritt „Portal-Vorschau öffnen“ gestrichen; Anmelde-Absatz ergänzt, dass Angebote und Rechnungen über die E-Mails geöffnet werden.
- Hilfeartikel `angebot-online-unterschreiben-lassen`: FAQ „Wo sieht mein Kunde das Angebot noch einmal?“ ohne Portal-Zugang.
**Status:** behoben; Inhaber-Sichtung empfohlen (inhaltliche Entscheidung, siehe Produktbefund 1).

### ME-04: L-1-Lücken

**Geänderte Dateien:** `craftos/tests/content-produktwahrheit.test.ts`, `craftos/scripts/content-pruefen.mjs`, `craftos/lib/nur-unterstuetzt.ts`
**Commit:** `0adf7ba`
**Umsetzung:** Ein Literal, das genau einem Leitlinienwort entspricht, gilt als sichtbarer Text (keine `lib/gewerke.ts`-Wortliste mehr). `nurUnterstuetztVerstoesse` läuft über `answer`, Frontmatter-`faq` und Prosa aller 84 Artikel. Prüfmechanik von `artikelAussagen`: Fragen (Überschriften und Sätze mit „?“) und zitierte Oberflächentexte („Stornierung nicht möglich“) sind keine Aussagen; „grenzen Sie … ein“ ist die Filteranweisung und nicht das Nomen „Grenzen“. Vor dieser Mechanik gab es 11 Prosatreffer, alle von dieser Art; danach 0.

### LO-01 bis LO-10, IN-01 bis IN-08

Siehe Tabelle oben. Hinweise:
- **LO-06** ist ein reiner Schutztest. Er war sofort grün, weil es heute keinen Verstoß gibt.
- **LO-08:** `uebersichtStand` liegt in `lib/content.ts`, weil Next-Metadatenrouten keine weiteren Exporte führen sollen.
- **IN-03:** `server-only` wie in `lib/content.ts`. Kein Client-Modul importiert `lib/gewerke` oder `lib/breadcrumbs` (geprüft), der Build ist grün.

## Grenzen und bewusst nicht umgesetzte Teile

- **HI-01, Erreichbarkeit:** Grün heißt „der Text steht in der Oberfläche“. Rollen, Lizenzen und Rollen-Sperren prüft das Skript nicht. Die Freischaltungs-Heuristik arbeitet je Datei. Sie erkennt keine Sprachdateien (Mobile-Labels stehen in JSON ohne Bedingung) und keine Sperre auf Elementebene in Dateien, die die Abfrage auch für andere Elemente lesen. Die Erreichbarkeit bleibt Teil der manuellen Prüfdatei (`docs/content-pruefung/09-*.md`). Festgehalten im Skriptkopf.
- **HI-01, Zitate in Website-Daten:** `--zitate` über `lib/funktionsdetails/index.ts` meldet „Anleitung in der Hilfe“ und „Alle Funktionen ansehen“. Das sind Linktexte der Website, keine Produktzitate. Der Auftrag galt den Artikeln, deshalb keine Änderung.
- **LO-03, Fokusreihenfolge:** Das Inhaltsverzeichnis steht weiter vor dem Text im DOM. Das ist die zweite vom Review erlaubte Lösung: Es dient wie ein Sprunglink als Navigation, und Tastaturnutzer erreichen es vor der Prosa statt erst am Artikelende. Begründet im Code (`ArticlePage.tsx`).
- **LO-05:** Das Review behauptet, eine Liste direkt unter einer Frage gelte im Audit als „keine Antwort“. Das stimmt so nicht: `answerFirstViolations` nimmt den ersten `<p>` vor der nächsten Überschrift. Das Skript nutzt jetzt genau diese Funktion, damit Skript und Audit gleich zählen. Diese Abweichung vom Wortlaut des Reviews ist gewollt.
- **ME-03, Allrounder:** Die Gewerke-Seite Allrounder führt die Karte „Kundenportal“ weiter. Ihr Nutzentext („Kunden unterschreiben Angebote online und erhalten Rechnungen als PDF per E-Mail.“) ist belegt, und der Auftrag nannte nur Bauunternehmen.

## Produktbefunde für den Inhaber

1. **Kundenportal ist für Kunden praktisch leer.** Ein angemeldeter Portalkunde sieht am Web-Release `c5b5135` nur „Ihre Unterlagen“ mit dem Hinweis auf die E-Mail (`src/pages/portal/CustomerPortalHome.tsx`). Es gibt keine Belegliste, und das Menü hat nur „Startseite“. Keine E-Mail verlinkt die vorhandenen Portalseiten `/portal/quotes/:id` und `/portal/invoices/:id`. Gleichzeitig verspricht die Einladungsmail (`supabase/functions/_shared/customerInvite.ts` Z. 86 und 97): „Dort sehen Sie alles, was wir für Sie freigeben – Angebote, Rechnungen, Termine und Nachrichten – und können Angebote online annehmen und unterschreiben.“ Die „Portal-Vorschau“ im Büro (`CustomerPortalPreview.tsx`) zeigt „Über E-Mail-Links erreichbare Angebote und Rechnungen“, die der Kunde so nicht erreicht. Die Website beschreibt das Portal deshalb nur noch über Online-Unterschrift und PDF per E-Mail. Für eine echte Portal-Leistung fehlt im Produkt die Belegliste oder ein Portal-Link in den Beleg-Mails.
2. **Produkt-Snapshot veraltet (Website, kein Produktfehler):** Web `origin/release` steht auf `c5b5135`, der Snapshot `docs/product-source-snapshot.json` auf `a0e27c42` (test.246). Deshalb ist der lokale Test `tests/pricing-parity.test.ts › Snapshot ist aktuell` rot. Er hängt nicht an diesen Korrekturen. Ein `npm run sync:product` samt Prüfung der Produktfakten ist ein eigener Auftrag.

## Weitere Beobachtungen (außerhalb des Review-Umfangs, nicht geändert)

- Die Startseiten-FAQ (`lib/home-content.ts` Z. 214–215) beginnt mit „Teilweise: … benötigen eine Verbindung“. Das widerspricht „positiv formulieren“. `home-content.ts` liegt nicht im Geltungsbereich von `pruefeNurUnterstuetzt`.
- Die App-Seite nennt „Offline teilweise nutzbar“ (`lib/app-content.ts` Z. 263, 266). Die Formulierung ist durch Tests festgeschrieben und war eine frühere Entscheidung.

## Prüfungen (unter `.heavy-lock`, ein Fenster)

| Prüfung | Ergebnis |
|---|---|
| `npx vitest run` | 45 Dateien, 1345 Tests: 1344 bestanden, 1 fehlgeschlagen (`pricing-parity › Snapshot ist aktuell`, Snapshot `a0e27c42` ≠ Web-Release `c5b5135`, vorbestehend, siehe Produktbefund 2) |
| `npx tsc --noEmit -p .` | Exitcode 0 |
| `npm run lint` | Exitcode 0 |
| `npm run build` | Exitcode 0, 319 statische Seiten |
| `MSYS_NO_PATHCONV=1 node scripts/seo-audit.mjs` | 156 von 156 Sitemap-URLs, 12 Regeln, 0 Verstöße |
| `next start -p 3100` + `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | 62 OK, 0 FEHLER |
| E2E `design-v2`, `navigation`, `browser-functional` (4 Projekte, inkl. neuem ME-01-Fall) | 212 Fälle: 200 bestanden, 12 übersprungen, 0 fehlgeschlagen, 0 flaky (4,4 min) |
| ME-01 Rotprobe am alten Build | rot (803,5 px > 768,5 px), danach grün |
| `content-pruefen --zitate --l1 --antwort` (84 Artikel, je Paket) + `lib/gewerke.ts` | 0 Befunde, 15 Kurzbegriff-Hinweise |
| Port 3100 / `.heavy-lock` | eigener `next start` beendet, Port frei, Sperre entfernt |

Screenshots (nur Scratchpad, nicht committet): `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/toc-chromium-oben.png`, `…/toc-chromium-fokus-letzter.png`, `…/toc-webkit-oben.png`, `…/toc-webkit-fokus-letzter.png`.

---

_Behoben: 23.10.2026_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
