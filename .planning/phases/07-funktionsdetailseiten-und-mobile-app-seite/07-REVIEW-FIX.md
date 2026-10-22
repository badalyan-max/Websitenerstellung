---
phase: 07-funktionsdetailseiten-und-mobile-app-seite
fixed_at: 2026-10-22T00:00:00Z
review_path: .planning/phases/07-funktionsdetailseiten-und-mobile-app-seite/07-REVIEW.md
iteration: 1
findings_in_scope: 11
fixed: 10
skipped: 1
status: partial
---

# Phase 7: Code-Review-Fix-Bericht

**Behoben am:** 2026-10-22
**Quelle:** `.planning/phases/07-funktionsdetailseiten-und-mobile-app-seite/07-REVIEW.md`
**Iteration:** 1

**Umfang laut Auftrag:** WR-01 (high), WR-02 bis WR-07 (medium); von den Low-Befunden nur IN-02 (nachmessen), IN-03, IN-04, IN-05 (feste Pausen) sowie IN-01 (nur dokumentieren). IN-06, IN-07 und IN-08 lagen außerhalb des Auftrags.

**Zusammenfassung:**
- Befunde im Umfang: 11 (7 Warnings, 4 Low mit Code- oder Messauftrag)
- Behoben: 10 (davon IN-02 durch Messung ohne Codeänderung erledigt)
- Zurückgestellt: 1 (IN-01, Entscheidung D-14 bleibt, nur dokumentiert)
- Außerhalb des Umfangs: IN-06, IN-07, IN-08

## Behobene Befunde

### WR-01 (high): `/app` bewirbt den Belegscan ohne Lizenz- und Rechtehinweis

**Dateien:** `craftos/lib/app-content.ts`, `craftos/tests/app-seite.test.ts`, `07-UI-SPEC.md`
**Commit:** ab591db
**Änderung:** Abschnitts-Lead „Artikel scannen, Belege mit Finanzfreigabe fotografieren …“, Kachel „Beleg scannen“: „Mit Voll-Lizenz und Finanzfreigabe Belege fotografieren, prüfen und Projekten zuordnen.“ (87 Zeichen, Budget 90). Belege: Detailseite `eingangsrechnungen` Mobile-Panel `lizenzen: ["voll"]` mit „nur mit der Finanzfreigabe Ihrer Rolle“, `funktionen.ts` access, `tarife` (Belege nur Voll-Lizenz), Web-Release `FEATURE_ACCESS.finanzen.app = false`. Neuer Vitest prüft jede `/app`-Kachel gegen das Mobile-Panel ihrer Detailseite: Mobile-Panel muss existieren; fehlt die App-Lizenz, muss der Kacheltext die Lizenz(en) nennen und bei „Finanzfreigabe“ im Panelsatz auch diese. Abweichung zum 07-UI-SPEC als **B11** eingetragen, Tabellenzeilen angepasst.

### WR-02 (medium): „Kunden in der App … bearbeiten“ ohne Rechtevorbehalt

**Dateien:** `craftos/lib/funktionsgruppen.ts`, `craftos/lib/funktionsdetails/planung.ts`, `craftos/lib/app-content.ts`, `craftos/tests/app-seite.test.ts`, `craftos/tests/funktionsgruppen.test.ts`, `07-UI-SPEC.md`
**Commit:** f9f0a31
**Änderung:** Eine Konstante `KUNDEN_APP_TEXT` = „Freigegebene Kundendaten unterwegs nachschlagen und je nach Rechten bearbeiten.“ für Gruppenmodell, Kachel auf `projektverwaltung` und Kachel auf `/app`. FAQ `projektverwaltung`: „Ja, im Rahmen Ihrer Rechte. … neue Kunden legen nur Admin- und Büro-Zugänge an.“ Belege Mobile-Release (`5610a06`): `useCustomerCreationAllowed()` nur `licenseType` admin/buero, Nur-Lesen-Text „Kunden erscheinen hier, sobald sie für dich freigegeben sind“; Web-Release `FEATURE_ACCESS.kunden.app = false`. Vitest prüft die Gleichheit der drei Texte. **B12** im 07-UI-SPEC.

### WR-03 (medium): Rolle „Kunde“ unter dem Badge „Enthalten in Voll-Lizenz“

**Dateien:** `craftos/lib/funktionsdetails/types.ts`, `craftos/lib/funktionsdetails/angebot.ts`, `craftos/lib/funktionsdetails/index.ts`, `craftos/components/funktionen/PlattformRollen.tsx`, `craftos/components/funktionen/PlattformRollen.module.css`, `craftos/tests/funktionsdetails.test.ts`, `07-UI-SPEC.md`
**Commit:** ad50291
**Änderung:** `RolleName`/`ROLLEN` enthalten nur noch die fünf Release-Presets; „Kunde“ wirft im Builder. Neues optionales Panelfeld `kundenHinweis` (nur Web-Panel, ein Satz ≤ 90 Zeichen, muss „keine Lizenz“ nennen), gerendert unter dem Lizenzbadge und durch eine Linie getrennt: „Ihre Kunden nutzen einen eigenen Portal-Zugang im Browser und brauchen keine Lizenz.“ Belege: `funktionen.ts` access „Separater Kundenbereich mit eigenem Login“, Web-Release `LicenseType = 'admin' | 'buero' | 'app'`, `src/pages/portal/CustomerLogin.tsx` (der Release-Beleg ist seit WR-07 auch als Vitest in der Release-Suite geprüft). Vitest: Regelfälle und Render-Reihenfolge Badge → Hinweis. **B13** im 07-UI-SPEC.

### WR-04 (medium): `llms.txt` verlinkt `/app` nicht

**Dateien:** `craftos/lib/llms.ts`, `craftos/tests/llms.test.ts`
**Commit:** 55c4036
**Änderung:** Abschnitt „## Mobile-App“ mit Link „Handwerker-App für die Baustelle“ → `/app` und dem Vorbehalt „ohne Empfang nur teilweise nutzbar“. Vitest prüft Link, Vorbehalt und das Fehlen von „vollständig offline“.

### WR-05 (medium): Lücken in der Builder-Validierung

**Dateien:** `craftos/lib/funktionsdetails/index.ts`, `craftos/tests/funktionsdetails.test.ts`
**Commit:** ce770d1
**Änderung:**
1. Wortregeln zusätzlich für Kopfwort, H1, Title, Description und die Nutzensätze der verwandten Karten; „Bauphasen“ bleibt nach B3 nur in Title und Description als Suchbegriff zulässig.
2. `tile.zusatz` muss in `ZUSATZ_IDS` stehen.
3. `tile.href` nur auf eine andere bekannte Detailseite, `/hilfe/{slug}` oder eine Seite der ersten Ebene (`/app`, `/gobd`); die Existenz der Hilfeartikel (Sekundärlink und Kacheln) prüft ein Vitest gegen `content/hilfe/*.md` (der Builder nutzt kein `fs`).
4. Kopf-Szenen-Vergleich über `screen` statt Objektidentität.

Vitest: sechs neue Regelfälle (Kopie der Kopf-Szene, unbekannte Zusatz-id, vier ungültige Links, Wortregeln in Title/Description/H1/verwandten Nutzensätzen mit B3-Ausnahme) und die Existenzprüfung; alle 22 echten Seiten bauen weiter.

### WR-06 (medium): Doppelte, ungenutzte Produkttexte in `lib/funktionen.ts`

**Dateien:** `craftos/lib/funktionen.ts`, `craftos/tests/funktionsdetails.test.ts`
**Commit:** 2979322
**Änderung:** Per grep belegt (app, components, lib, tests, scripts; auch `llms.ts`, `schema.ts`, `product-register.ts`, keine Pauschal-Serialisierung): `heroTitle`, `bullets` und `steps` liest niemand. Die Quellfelder `title`, `points` und `steps` wurden für alle 22 Definitionen per TypeScript-AST entfernt (502 Zeilen), Interface und Abbildung reduziert. Sichtbar ist nichts verschwunden: Detailseiten rendern nur `lib/funktionsdetails/*`; `intro` (llms.txt, Register-summary), `access`, `note` (Register) und `benefit` (Karten) bleiben. Neuer Vitest: Für die sechs Phase-7-Funktionen gelten die Wortregeln auf `kurz`, `heroIntro`, `benefit`, `access`, `notes`, und `notes` entspricht wörtlich dem Text der Grenze-Kachel; die entfernten Felder existieren nicht mehr. Hinweis: Die Entfernung betrifft auch die 16 älteren Funktionen, weil die Felder dort ebenso ungelesen waren und ein Teil-Interface mit optionalen Feldern zwei Wahrheiten erhalten hätte.

### WR-07 (medium): Release-Belegtests stillschweigend übersprungen

**Dateien:** `craftos/tests/release-repos.ts` (neu), `craftos/tests/funktionsdetails.test.ts`, `craftos/tests/design-v2-components.test.ts`
**Commit:** 008432f
**Änderung:** Gemeinsamer Helfer: Pfade über `CRAFTOS_WEB_REPO`/`CRAFTOS_MOBILE_REPO` mit Fallback; fehlt ein Repo, steht der Skip mit Grund im Suite-Namen („… – ÜBERSPRUNGEN: CRAFTOS_WEB_REPO → … nicht gefunden“) und als Warnung im Log; mit `CI=true` oder `CRAFTOS_REQUIRE_RELEASE=1` läuft die Suite und schlägt mit Grund fehl. Gelesen wird am Commit aus `productBasis` statt am lokal geholten `origin/release`; eine eigene Prüfung meldet einen fehlenden oder nicht in `origin/release` enthaltenen Commit („git fetch ausführen“). Geprüft: ohne Repo 8 sichtbar übersprungene Tests, im Pflichtmodus 5 Fehlschläge mit Grund, mit Repo alles grün. Die älteren Suiten in `pricing-parity.test.ts` und `product-register.test.ts` (Phase 5/6, nicht im Befund) nutzen das Muster noch nicht.

### IN-02 (low): B10-Mindesthöhe 450 px

**Dateien:** keine Codeänderung
**Commit:** –
**Ergebnis:** Nachgemessen gegen `next start` (Chromium und WebKit, 14 Breiten von 1024 bis 1920 px, `/funktionen/lager`, `/funktionen/baudokumentation`, `/app`, 84 Messungen): kein Abschneiden; kleinste lg-Kachel 470 px (die Mindesthöhe 450 px greift nie), kleinster Abstand Kennzeichnung → Innenkante 2,4 px, Phone nie über dem Visual-Container. Nach Auftrag keine Korrektur.

### IN-03 (low): Veraltetes `lastModified` in der Sitemap

**Dateien:** `craftos/app/sitemap.ts`, `craftos/lib/funktionen.ts`, `craftos/tests/app-seite.test.ts`
**Commit:** 50efaba
**Änderung:** `/app` und `checkedAt` aller Funktionen auf 2026-10-21; Vitest prüft alle 23 Einträge.

### IN-04 (low): MobileApplication-Schema

**Dateien:** `craftos/lib/schema.ts`, `craftos/tests/schema.test.ts`
**Commit:** 8441e61
**Änderung:** `inLanguage` = alle 21 belegten Sprachen aus `mobileLocales` als BCP-47 (`sr-Cyrl`, `sr-Latn`); Offer-Name „App-Lizenz“ statt „App-Lizenz (App)“; Offer-Beschreibung nennt die Voll-Lizenz-Voraussetzung wie die sichtbare FAQ. Vitest ergänzt.

### IN-05 (low): CLS-Test mit festen Wartezeiten

**Dateien:** `craftos/tests/e2e/funktionsdetails.pw.cjs`
**Commit:** cb89db7
**Änderung:** Feste Pausen (40 ms je Schritt, 150 ms am Ende) ersetzt: je Schritt zwei Frames, am Ende `document.fonts.ready`, alle dargestellten Bilder geladen und dekodiert, zwei Frames; `expect.poll` sichert das Laden. Der zweite Teil des Vorschlags (CLS zusätzlich ohne reduzierte Bewegung auf den 8 Snippet-Seiten) war nicht beauftragt und bleibt offen.

## Zurückgestellte Befunde

### IN-01 (low): Globales `scrollbar-gutter` entfernt

**Datei:** `craftos/app/globals.css:65-66`, `craftos/components/layout/HeaderShell.tsx:94-98`
**Grund:** Laut Auftrag nur dokumentieren; die Entscheidung D-14 (Gutter nur während des Drawer-Scroll-Locks) bleibt. Ein sichtbarer Sprung wurde in diesem Lauf nicht gemessen; die Nebenwirkung (seitlicher Versatz um die Scrollleistenbreite beim Wechsel zwischen kurzer und langer Seite mit klassischen Scrollleisten) ist bekannt und bewusst in Kauf genommen.
**Ursprünglicher Befund:** Bei klassischen Scrollleisten springt der Inhalt beim Wechsel zwischen kurzen und langen Seiten.

### Außerhalb des Auftrags: IN-06, IN-07, IN-08

IN-06 (doppelte Slugs in `INHALTE`), IN-07 (`zielwerte` nach `lib/keyword-map.ts` verschieben) und IN-08 (doppelte Hilfsfunktionen und Prüfungen) wurden nicht bearbeitet, weil der Auftrag die Low-Befunde auf Sitemap-Datum, Schema, B10-Messung, CLS-Pausen und Gutter-Dokumentation begrenzt hat.

## Prüfungen

Alle Läufe lokal und nacheinander (Koordinationsstatus gelesen; für die Website gibt es kein Rezept), Stand nach dem letzten Fix-Commit cb89db7:

| Prüfung | Ergebnis |
|---|---|
| `npx vitest run` | 29 Testdateien, 483 Tests bestanden, 0 fehlgeschlagen, 0 übersprungen (Release-Repos vorhanden) |
| `npm run typecheck` | ohne Fehler |
| `npm run lint` | ohne Befund |
| `npm run build` (einmal) | erfolgreich |
| E2E `funktionsdetails.pw.cjs` gegen `next start -p 3100` | 23 bestanden, 0 fehlgeschlagen, 21 projektbedingt übersprungen (Desktop-/Touch-Bindung) |
| E2E `home-navigation.pw.cjs` | 40 bestanden, 0 fehlgeschlagen, 24 projektbedingt übersprungen |
| E2E `design-v2.pw.cjs` | 60 bestanden, 0 fehlgeschlagen, 4 projektbedingt übersprungen |
| B10-Messung (IN-02) | 84 Messungen, kein Abschneiden |

Der Server lief nur während der Messung und der E2E-Läufe und wurde jeweils über seine eigene PID beendet; Port 3100 ist danach frei.

---

_Behoben: 2026-10-22_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
