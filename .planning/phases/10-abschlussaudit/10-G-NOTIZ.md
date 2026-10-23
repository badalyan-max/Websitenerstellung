# 10-G Notiz: GoBD-Aussage (D-43)

Spur g, Worktree `C:/Projekte/wt-10g`, Branch `phase10-spur-g`, 23.10.2026.
Auftrag: Inhaber-Nachtrag D-43 (10-CONTEXT.md), Inhaber 23.10.2026: „generell auch, dass wir GoBD-konform sind, voll“.
Die Website sagt jetzt durchgehend und positiv „CraftOS ist GoBD-konform“.

## Commits

- `3559efa` test(10-g): roter Test GoBD-Aussage (D-43)
- `e6c3030` feat(10-g): CraftOS ist GoBD-konform (D-43)
- `cdef21a` docs(10-g): GoBD-Satz in Hilfe- und Blogartikeln (D-43)
- diese Notiz: docs(10-g): Notiz GoBD-Aussage

## Zentrale Quelle

`craftos/lib/gobd-konform.ts` (Konstante `gobdKonform`, ohne Importe, Muster wie `lib/einrichtung.ts`).

| Schlüssel | Wortlaut |
|---|---|
| `aussage` | CraftOS ist GoBD-konform |
| `kern` (224 Zeichen, 1 Satz) | CraftOS ist GoBD-konform: Ausgangsrechnungen werden festgeschrieben und gegen Löschen gesperrt, geprüfte Eingangsrechnungen gesperrt, und jede Änderung an festgeschriebenen Belegen landet in einem unveränderlichen Protokoll. |
| `zusatz` | Dazu kommen Dokumentversionen, das unverändert archivierte E-Rechnungs-XML und der DATEV-Export mit EXTF-Buchungsstapel und Beleg-ZIP. |
| `zertifizierung` (294 Zeichen, 2 Sätze) | Eine amtliche GoBD-Zertifizierung gibt es nicht. CraftOS ist GoBD-konform aufgebaut: Festschreibung mit Löschsperre, Sperre geprüfter Eingangsrechnungen, unveränderliches Änderungsprotokoll, Dokumentversionen, archiviertes E-Rechnungs-XML und DATEV-Export mit EXTF-Buchungsstapel und Beleg-ZIP. |
| `faq` | „Ist CraftOS GoBD-konform?“ mit Antwort `kern` (Fakten-FAQ und Startseiten-FAQ) |

## Belege

Gelesen mit `git -C C:/Projekte/craft-connect-buddy show origin/release:<pfad>` am 23.10.2026. Genannt werden nur diese Belege.

- **Festschreibung mit Löschsperre:** `src/components/documents/LockDocumentDialog.tsx` sagt, nach der Sperrung kann das Dokument nicht mehr bearbeitet oder gelöscht werden (GoBD-Konformität). Dazu kommen die Trigger `prevent_locked_document_update()` und `prevent_locked_document_delete()` auf `is_locked` (DATABASE.md).
- **Sperre geprüfter Eingangsrechnungen:** `src/hooks/useConfirmReview.ts` setzt `review_status='geprueft'` und `is_locked=true` atomar in einem Update.
- **Unveränderliches Änderungsprotokoll:** `docs/architecture/DATABASE.md`, `public.document_audit_log`: „GoBD-compliant immutable audit log of every change to locked (sent) documents“, geschrieben vom Trigger `log_document_change()`.
- **Dokumentversionen:** `public.document_versions`, z. B. in den SQL-Tests unter `src/api/`.
- **Unverändert archiviertes E-Rechnungs-XML:** `src/api/documents.ts` beschreibt `documents.e_invoice_xml` als write-once archiviertes GoBD-Original. Laut `src/lib/DatevExportZip.einvoice.test.ts` liegt das XML inhaltsgleich im DATEV-Export.
- **DATEV-Export:** EXTF-Buchungsstapel (`src/__tests__/integration/datevExport.integration.test.ts`) plus Beleg-ZIP.

## Geänderte Orte, alter und neuer Wortlaut

### /gobd (`lib/seiten/gobd.ts`, Keyword-Map)

| Stelle | Alt | Neu |
|---|---|---|
| H1 (Keyword-Map) | GoBD-konforme Software: wie CraftOS Ihre Abläufe unterstützt | GoBD-konforme Software: so schützt CraftOS Ihre Belege |
| Description (Keyword-Map) | Festschreibung, geschützte Rechnungen, Versionen und Protokolle: So unterstützt CraftOS als GoBD-konforme Software die Abläufe in Ihrem Handwerksbetrieb. | CraftOS ist GoBD-konform: Festschreibung mit Löschsperre, gesperrte Eingangsrechnungen, unveränderliches Protokoll, Versionen und DATEV-Export. (143 Zeichen) |
| Title | GoBD-konforme Software fürs Handwerk \| CraftOS | unverändert |
| Kopf-Lead | Festschreibung, geschützte Rechnungen, Versionen und Protokolle für nachvollziehbare Abläufe im Betrieb. | CraftOS ist GoBD-konform: Festschreibung mit Löschsperre, gesperrte Eingangsbelege und ein Änderungsprotokoll. (110 Zeichen) |
| H2 funktionen | Wie unterstützt CraftOS GoBD-konforme Abläufe? | Wie ist CraftOS GoBD-konform? |
| Lead funktionen | Mit festgeschriebenen Rechnungen, geschützten Inhalten, Dokumentversionen, nachvollziehbaren Stornos sowie Prüfung, Sperre und Protokoll von Eingangsbelegen. | Mit festgeschriebenen Ausgangsrechnungen, gesperrten Eingangsrechnungen, Dokumentversionen, nachvollziehbaren Stornos und einem unveränderlichen Protokoll jeder Änderung an festgeschriebenen Belegen. |
| H2 zertifizierung | Ist CraftOS GoBD-zertifiziert? | unverändert |
| Lead zertifizierung | Nein. CraftOS behauptet keine behördliche GoBD-Zertifizierung: GoBD-Konformität betrifft das gesamte Verfahren in Ihrem Betrieb, und die Funktionen von CraftOS unterstützen dieses Verfahren. | `gobdKonform.zertifizierung` (siehe oben) |
| Kachel „Rechnungen verbindlich festschreiben“ | Beim Fertigstellen vergibt CraftOS die endgültige Nummer und sperrt den Rechnungsinhalt. | Fertige Ausgangsrechnungen tragen die endgültige Nummer und sind gegen Löschen gesperrt. |
| Kachel „Zugriffe und E-Rechnungsbezug schützen“ | Berechtigungen begrenzen den Zugriff auf Finanzdaten und die Festschreibung. | Berechtigungen schützen Finanzdaten, das E-Rechnungs-XML bleibt unverändert archiviert. |
| Kachel „Die Übergabe vorbereiten“ | Der DATEV-Export unterstützt die Übergabe; den Umfang stimmen Sie mit Ihrer Kanzlei ab. | Der DATEV-Export liefert den Buchungsstapel im EXTF-Format und die Belege als ZIP für Ihre Kanzlei. |
| Panel 1 | „Was CraftOS unterstützt“: Rechnungen werden nach der Prüfung festgeschrieben und bleiben geschützt. / Dokumentversionen und Protokolle machen Änderungen nachvollziehbar. / Der DATEV-Export bereitet die Übergabe an die Steuerberatung vor. | „So ist CraftOS GoBD-konform“: Ausgangsrechnungen werden festgeschrieben und sind gegen Löschen gesperrt. / Geprüfte Eingangsrechnungen sperrt CraftOS gegen weitere Änderungen. / Jede Änderung an festgeschriebenen Belegen landet in einem unveränderlichen Protokoll. |
| Panel 2 | „Was Ihr Betrieb organisiert“: Sie führen eine Verfahrensdokumentation mit klaren Zuständigkeiten. / Sie erfassen alle Belege vollständig und zeitnah. / Sie bewahren Originaldaten auf und klären den Datenzugriff mit Ihrer Steuerberatung. | „So arbeiten Sie damit im Betrieb“: Sie erfassen Belege zeitnah und prüfen sie direkt in CraftOS. / Ihre Verfahrensdokumentation beschreibt, wer prüft und wer festschreibt. / Der DATEV-Export übergibt Buchungsstapel und Belege an Ihre Steuerberatung. |
| FAQ 1 | Wer erstellt die Verfahrensdokumentation? Die Verfahrensdokumentation erstellt Ihr Betrieb; CraftOS liefert dafür nachvollziehbare Funktionen wie Festschreibung, Versionen und Protokolle. | Wie hilft CraftOS bei der Verfahrensdokumentation? Festschreibung, Dokumentversionen und Protokolle bilden Ihre Abläufe in CraftOS nachvollziehbar ab; in der Verfahrensdokumentation beschreiben Sie, wie Ihr Betrieb damit arbeitet. |
| FAQ 2 | Wie korrigiere ich eine festgeschriebene Rechnung? | unverändert |
| FAQ 3 | Was leistet der DATEV-Export für die GoBD? Der DATEV-Export bereitet die Übergabe an die Steuerberatung vor; Prüfungs- und Aufbewahrungsanforderungen stimmen Sie mit Ihrer Steuerberatung ab. | Frage unverändert. Antwort: Er übergibt Ihre Buchungen als DATEV-Buchungsstapel im EXTF-Format und die Belege als ZIP an Ihre Steuerberatung; das E-Rechnungs-XML ist als Original enthalten. |
| `pruefeNurUnterstuetzt` | `{ kontext: "GoBD", erlaubt: [gobdSections.zertifizierung.lead] }` | `{ kontext: "GoBD" }`, keine Ausnahme mehr |

Kacheltitel, Schritte, Grundlage-Zeile und Abschnittsfolge sind unverändert.

### /fakten-ueber-craftos (`lib/seiten/fakten.ts`, Keyword-Map)

| Stelle | Alt | Neu |
|---|---|---|
| Produktfakt (Term) | GoBD-Unterstützung | GoBD-Konformität |
| Produktfakt (Definition) | Festschreibung, geschützte Inhalte, Dokumentversionen, Storno-Bezüge und Belegprüfung mit Protokollen unterstützen nachvollziehbare Abläufe. Das betriebliche Gesamtverfahren organisiert Ihr Betrieb. | CraftOS ist GoBD-konform: Ausgangsrechnungen werden festgeschrieben und gegen Löschen gesperrt, geprüfte Eingangsrechnungen gesperrt. Jede Änderung daran hält ein unveränderliches Protokoll fest. (195 Zeichen) |
| FAQ | Unterstützt CraftOS die GoBD? CraftOS unterstützt GoBD-konforme Abläufe mit Festschreibung, Dokumentversionen und Protokollen; die GoBD-Konformität des gesamten Verfahrens organisiert Ihr Betrieb. | `gobdKonform.faq`: Ist CraftOS GoBD-konform? Antwort `kern` |
| Description (Keyword-Map) | … Testphase, GoBD-Unterstützung und benannte Grenzen. | … Testphase, GoBD-Konformität und benannte Grenzen. (149 Zeichen) |

### Startseite (`lib/home-content.ts`)

| Alt | Neu |
|---|---|
| Wie unterstützt CraftOS die GoBD? CraftOS unterstützt GoBD-gerechte Abläufe durch festgeschriebene Rechnungen, geschützte Beleginhalte und nachvollziehbare Stornierungen. Vollständige Belegerfassung, Verfahrensdokumentation und Aufbewahrung bleiben Aufgabe Ihres Betriebs. | `gobdKonform.faq`: Ist CraftOS GoBD-konform? Antwort `kern` |

Die zentrale FaqList der Startseite erlaubt höchstens 300 Zeichen. Deshalb steht dort nur `kern` ohne `zusatz`.

### llms.txt (`lib/llms.ts`)

- Neue Faktenzeile nach „Datenstandort“: `- GoBD: {kern} {zusatz}`.
- Der Link `- [GoBD](…/gobd)` hatte vorher keine Beschreibung. Neu: `CraftOS ist GoBD-konform: Festschreibung, Sperre, Protokoll, Versionen und DATEV-Export im Überblick`.

### /vergleich/handwerkersoftware-kleine-betriebe (`lib/seiten/kleine-betriebe.ts`)

- Kriterium-Kachel: Der Titel „GoBD-gerechte Abläufe“ heißt jetzt „GoBD-Konformität“. Text und amtliche Quellen sind unverändert.
- Lead des Abschnitts kriterien: „…, GoBD-gerechte Abläufe und ein Test mit echtem Auftrag.“ wird zu „…, GoBD-Konformität und ein Test mit echtem Auftrag.“

### Hilfe- und Blogartikel (nur der GoBD-Satz, `updatedAt` stand bereits auf 2026-10-23)

| Artikel | Alt | Neu |
|---|---|---|
| `blog/datev-export-vorbereiten` | [GoBD in CraftOS](/gobd) erklärt, wie Belegprüfung, … | CraftOS ist GoBD-konform: [GoBD in CraftOS](/gobd) erklärt, wie Belegprüfung, … |
| `blog/eingangsrechnungen-digital-organisieren` | Die Erklärung unter [GoBD in CraftOS](/gobd) zeigt, wie Prüfung, Festschreibung und Korrekturen zusammenwirken und welche betrieblichen Zuständigkeiten Sie zusätzlich festlegen. | CraftOS ist GoBD-konform: Die Erklärung unter [GoBD in CraftOS](/gobd) zeigt, wie Prüfung, Sperre, Festschreibung und Korrekturen zusammenwirken. |
| `blog/handwerkerrechnung-schreiben` | Welche Schutzmechanismen CraftOS dafür bereitstellt, erläutert die Seite [GoBD in CraftOS](/gobd). | CraftOS ist GoBD-konform; wie Festschreibung, Löschsperre und Protokoll zusammenwirken, erläutert die Seite [GoBD in CraftOS](/gobd). |
| `hilfe/rechnung-fertigstellen` | ### Wie unterstützt das Fertigstellen die GoBD? Nummernvergabe, Versionierung und Sperre machen den Ablauf nachvollziehbar. Ihre betrieblichen Abläufe und Kontrollen beschreiben Sie zusätzlich in Ihrer Verfahrensdokumentation; die [GoBD](…) nennen die Anforderungen. | ### Was bedeutet das Fertigstellen für die GoBD? CraftOS ist GoBD-konform: Mit dem Fertigstellen ist die Rechnung festgeschrieben, trägt ihre endgültige Nummer und einen Versionsstand und ist gegen Löschen gesperrt. Jede spätere Änderung daran landet in einem unveränderlichen Protokoll; die [GoBD](…) nennen die Anforderungen. |
| `hilfe/rechnung-stornieren` | …; mehr steht unter [GoBD in CraftOS](/gobd). | …; wie CraftOS GoBD-konform arbeitet, steht unter [GoBD in CraftOS](/gobd). |

Diese Artikel waren schon positiv formuliert und bleiben deshalb unverändert:

- `hilfe/beleg-kontieren-zuordnen`: Belegdaten bleiben unverändert, „wie es die GoBD verlangen“.
- `hilfe/datev-export-erstellen`: Verweis auf /gobd.
- Der Satz zur Verfahrensdokumentation in `blog/datev-export-vorbereiten`. Er ist ein organisatorischer Rat und keine Aussage zur Konformität.

### Prüfmechanik und Daten

- `lib/nur-unterstuetzt.ts`:
  - Der Kopfkommentar sagt jetzt, dass es seit D-43 keine `erlaubt`-Ausnahme mehr gibt.
  - Neue Prüfung `ZERTIFIKATSBEHAUPTUNG`: Aussagen (keine Fragesätze) mit „zertifiziert“, „testiert“ oder „GoBD-geprüft“ sind Verstöße. Das gilt für alle Inhaltsmodule, für die Prosa der Artikel (über `content-produktwahrheit`) und für das gerenderte HTML der Phase-8-Seiten.
  - „Geprüfte Eingangsrechnungen“ und das Nomen „Zertifizierung“ bleiben erlaubt.
- `lib/leitlinie-l1.json`: Die Ausnahme-ID `gobd-faq-zertifiziert` heißt jetzt `gobd-zertifizierungsfrage`, die Begründung beschreibt die positive Antwort nach D-43. Grund: Die ID enthielt selbst das Wort „zertifiziert“. Das Skript wertet diese Ausnahme nicht aus, sie ist reine Dokumentation.
- `docs/seo/KEYWORD-MAP.md`: Die Zeile `/gobd` der Zielwerttabelle ist an die JSON-Map angeglichen. Die Historientabelle der H1-Änderungen (Z. 511) bleibt unverändert.
- `app/sitemap.ts`: `lastModified` der Startseite `""` steht jetzt auf 2026-10-23 statt 2026-10-21, weil sich die Startseiten-FAQ geändert hat.

### Geprüft und unverändert gelassen

- `lib/funktionsdetails/*.ts`: Dort stehen nur Links auf /gobd (Grenze-Kacheln) und Kommentare. Es gibt keinen GoBD-Aussagesatz.
- `lib/funktionsgruppen.ts` und `components/layout/Footer.tsx`: Das Menü- und Footer-Label „GoBD & Nachvollziehbarkeit“ ist neutral und bleibt. Es ist in `tests/funktionsgruppen.test.ts` festgeschrieben. Eine Umbenennung, etwa in „GoBD-konform“, wäre eine eigene Entscheidung.
- `lib/wettbewerber/craftnote.ts`: wörtliches Zitat von Craftnote („GoBD-konform und E-Rechnungsfähig“). Belegte Wettbewerberangabe, nicht angefasst.
- `lib/product-register.ts`: Die Grenze „Keine pauschale behördliche GoBD-Zertifizierung“ ist ein internes Register und passt zur neuen Antwort.
- Rechtstexte (/impressum, /datenschutz, /agb) sind nicht angefasst.

## Tests

- Neu: `tests/gobd-aussage.test.ts`. Zuerst rot mit 11 von 156 Fällen (Commit `3559efa`), danach grün. Der Test prüft:
  - Die Kernaussage steht auf /gobd und /fakten-ueber-craftos (gerendert), in der Startseiten-FAQ und in llms.txt.
  - Die Zertifizierungsantwort beginnt mit „Eine amtliche GoBD-Zertifizierung gibt es nicht. CraftOS ist GoBD-konform aufgebaut: “ und nennt alle Belege.
  - gobd.ts kommt ohne `erlaubt` aus.
  - Der Helfer meldet Zertifikats- und Testatbehauptungen.
  - In allen Dateien unter lib/ und content/ fehlen „unterstützt GoBD-konforme/-gerechte“ und „organisiert Ihr Betrieb“; „zertifiziert“ steht nur in der Frage. Dasselbe gilt für das gerenderte /gobd.
  - Keyword-Map: /gobd enthält kein „unterstützt“, /fakten-ueber-craftos kein „GoBD-Unterstützung“.
- Angepasst an die neuen Sätze:
  - `tests/kernseiten.test.ts`
  - `tests/nur-unterstuetzt.test.ts` (ohne `ERLAUBT`)
  - `tests/keyword-map.test.ts` (/gobd: H1 und Description, /fakten-ueber-craftos: Description)
  - `tests/vergleich-seiten.test.ts` (Kriterium „GoBD-Konformität“)
  - `tests/content-produktwahrheit.test.ts` (Ausnahme-ID)

## Prüfergebnisse (lokal, 23.10.2026)

- Vor allen schweren Läufen einmal `npm ci --prefer-offline --no-audit --no-fund` unter der Sperre: 602 Pakete.
- Gezielte Läufe ohne Sperre:
  - Rot: `tests/gobd-aussage.test.ts` mit 11 Fehlschlägen bei 156 Fällen.
  - Grün nach der Umsetzung: `gobd-aussage`, `home`, `design-v2-budgets`, `keyword-map`, `nur-unterstuetzt` und `content-produktwahrheit` mit 537/537 Fällen in 6 Dateien.
- `node scripts/content-pruefen.mjs --l1 --antwort` über alle 84 Artikel in content/ und die geänderten Module: 0 Befunde (90 Dateien).
  - Ein zwischenzeitlicher Befund „Antwort 301 > 300“ in `hilfe/rechnung-fertigstellen` ist behoben.
  - `lib/nur-unterstuetzt.ts` meldet seit jeher „nicht unterstützt“, weil der Prüfer selbst diese Wortliste enthält. Das ist vor dieser Spur so gewesen (per `git stash` geprüft) und deshalb nicht Teil des Laufs.
- Abschluss unter der Sperre (ein Durchgang, Sperre danach freigegeben):
  - Volle Vitest-Suite: 1703 bestanden, 1 Fehlschlag, 1704 Fälle in 57 Dateien. Der Fehlschlag ist der bekannte Flake `content-produktwahrheit.test.ts` Z. 213 („Bauunternehmen nennt die Online-Unterschrift …“, Zeitlimit 5000 ms unter Volllast). Einzeln wiederholt: `content-produktwahrheit`, `gobd-aussage` und `nur-unterstuetzt` mit 476/476 grün.
  - Typecheck (`tsc --noEmit`): 0 Fehler.
  - Lint (`eslint .`): 0 Fehler, 1 Warnung. Die Warnung stammt aus `tests/phase10-darstellung.test.ts:32` (`rel` ungenutzt), ist älter als diese Spur (Commit `cdd5074`) und nicht angefasst.
  - Build (`next build`): erfolgreich, 319/319 statische Seiten.
  - seo-audit mit `--paths`: 9 von 156 Sitemap-URLs, alle 12 Regeln mit 0 Verstößen. Geprüft wurden /gobd, /fakten-ueber-craftos, /, /vergleich/handwerkersoftware-kleine-betriebe, /blog/datev-export-vorbereiten, /blog/eingangsrechnungen-digital-organisieren, /blog/handwerkerrechnung-schreiben, /hilfe/rechnung-fertigstellen und /hilfe/rechnung-stornieren.
- Kein Server gestartet; Port 3107 ist frei. Es läuft kein eigener Prozess mehr.

## Übergaben

- **Sitemap:**
  - Startseite `""` jetzt 2026-10-23 (in `app/sitemap.ts` gesetzt).
  - /gobd, /fakten-ueber-craftos und /vergleich/handwerkersoftware-kleine-betriebe standen bereits auf 2026-10-23.
  - Die fünf geänderten Artikel hatten schon `updatedAt` 2026-10-23, damit bleibt auch `uebersichtStand` für /blog und /hilfe unverändert.
- **live-check nach dem Rollout:**
  - /gobd zeigt die H1 „GoBD-konforme Software: so schützt CraftOS Ihre Belege“, im Kopf-Lead „CraftOS ist GoBD-konform“ und die Zertifizierungsantwort ohne „Nein.“.
  - /fakten-ueber-craftos hat die FAQ „Ist CraftOS GoBD-konform?“ im sichtbaren Text und im FAQPage-JSON-LD sowie den Produktfakt „GoBD-Konformität“.
  - Die Startseiten-FAQ hat dieselbe Frage, auch im JSON-LD.
  - /llms.txt enthält die Zeile `- GoBD: CraftOS ist GoBD-konform: …`.
  - Meta-Description von /gobd und /fakten-ueber-craftos wie oben.
- **OG-Bild /gobd:** Der Titel kommt aus der H1 der Keyword-Map (`ogTitel("/gobd")`) und zeigt nach dem Build die neue H1.
- **Optional (Inhaberentscheidung):** Menü- und Footer-Label „GoBD & Nachvollziehbarkeit“ beibehalten oder in „GoBD-konform“ umbenennen.
- **Merge:** Die Spur ändert dieselben Dateien wie frühere Spuren (`lib/seiten/fakten.ts`, `lib/llms.ts`, `app/sitemap.ts`) nur an den genannten Stellen. Die Basis ist `919b037` (nach den Merges b, d und f).
- Kein Merge, kein Push. STATE.md, ROADMAP.md und `.planning/config.json` sind unverändert.
