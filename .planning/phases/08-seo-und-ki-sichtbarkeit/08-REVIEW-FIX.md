---
phase: 08-seo-und-ki-sichtbarkeit
fixed_at: 2026-10-23T00:58:00+02:00
review_path: .planning/phases/08-seo-und-ki-sichtbarkeit/08-REVIEW.md
iteration: 1
findings_in_scope: 20
fixed: 20
skipped: 0
status: all_fixed
---

# Phase 8: Bericht zur Behebung der Review-Befunde

**Behoben am:** 23.10.2026, 00:58 Uhr (Haupt-Arbeitsbaum, Branch `main`, kein Push)
**Quelle:** `.planning/phases/08-seo-und-ki-sichtbarkeit/08-REVIEW.md` (21 Befunde: 3 High, 6 Medium, 8 Low, 4 Info)
**Maßgeblich:** Inhabervorgabe vom 22.10.2026 („Nur, was unterstützt wird, nicht, was nicht unterstützt wird.“) und die Entscheidungen des Orchestrators zu HI-01, HI-02, HI-03/ME-01, ME-06, ME-02, ME-03, ME-04 und ME-05.

**Zusammenfassung**

- Befunde mit Handlungsbedarf: 20. Alle wurden behoben, jeder mit einem eigenen Commit.
- IN-01 ist eine reine Bestätigung („Geprüft und in Ordnung“) und brauchte keine Änderung.
- Wo es sinnvoll war, kam der Test zuerst und schlug rot fehl, bevor die Änderung ihn grün machte. Ausnahmen sind unten begründet.
- Schlussprüfung unter `.heavy-lock`: Vitest 862 von 863 grün. Der eine Fehlschlag bestand schon vorher und hängt nicht mit diesen Änderungen zusammen (siehe Hinweise). Außerdem: tsc 0 Fehler, Lint 0, Build OK, SEO-Audit 136/136 URLs mit 0 Verstößen, live-check 46/46 OK, route-audit Exit 0, E2E 140 bestanden, 0 fehlgeschlagen, 44 projektbedingt übersprungen.

## Befund → Commit → Prüfung

| Befund | Commit | Änderung | Prüfung |
|---|---|---|---|
| HI-01 Marktspanne `/preise` | `858c614` | Für jeden Anbieter wird das kleinste buchbare Paket aus den Daten gewählt (günstigster Einstiegspreis). Craftnote erscheint deshalb mit „Büro“ zu 29,90 € (Jahresabo). „Baustelle“ fällt nur heraus, weil die belegte Angabe `mindestpaket` es ausschließt. Die unbelegte Einschränkung „mit Angeboten und Rechnungen“ ist entfallen, auch in der Zeile der Craftnote-Seite („Bürozugang (Büro Plus), Jahresabo je Monat“). Der Antwortsatz nennt jetzt Spannen für beide Zahlweisen aus den Tabellenzeilen: monatlich 29,95 € bis 89 €, Jahresabo 24,96 € bis 69 € je Monat. | `tests/preise-seite.test.ts`: kleinstes buchbares Paket je Zeile, keine Einschränkung ohne Beleg, Spannen aus den Zeilen. Rot → grün. |
| HI-02 HERO „Grundlaufzeit“ | `c5097b0` | Neues Datenfeld `laufzeitArt: "grundlaufzeit"`. `pruefeWettbewerber` verlangt es, sobald das Zitat „Grundlaufzeit“ enthält. Hub und kleine Betriebe: Spalte „Laufzeit laut Anbieter“, Zelle „12 Monate Grundlaufzeit“, Pflichthinweis „HERO: Grundlaufzeit laut AGB, soweit nicht abweichend vereinbart.“ Die FAQ nennt keine „Mindestlaufzeit“ mehr, der Schritt „Laufzeit prüfen“ ebenfalls nicht. Der Alternativen-Builder erzeugt die Zeile „Grundlaufzeit, soweit nicht anders vereinbart“. | Test „HI-02“: kein „Mindestlaufzeit“ bzw. „kürzeste Laufzeit“ auf Hub und kleinen Betrieben; jeder HERO-Satz mit Vorbehalt. Datenmodul-Test. Rot → grün. |
| HI-03 Negativaussagen `/fakten-ueber-craftos` | `d15f342` | Offline zählt jetzt auf, was ohne Empfang geht: „Zeiten, Bautagesberichte, Mängel, Aufmaße und Urlaubsanträge erfasst die Mobile-App auch ohne Empfang und überträgt sie danach. Bereits geladene Projekte stehen offline bereit.“ Belege: Register `mobileOffline` und `useOfflineMutation` in den Hooks für Zeiterfassung, Bautagebuch, Mängel, Raumaufmaß und Urlaub im Mobile-Release, nur lesend geprüft. Standort: „GPS erfasst nur einzelne Vorgänge wie das Ein- und Ausstempeln: …“. Bei der Einsatzkarte ist der Negativsatz entfallen; Kopf und Lead nennen keine „Grenzen“ mehr. Die FAQ heißen „Was funktioniert in CraftOS offline?“ und „Welche Standortdaten speichert die Mobile-App?“. Die GoBD-FAQ beschreibt die Zuständigkeit positiv. | `tests/kernseiten.test.ts` verlangt die positiven Formulierungen; keine Definition oder FAQ enthält „Teilweise“, „nicht“, „kein(e)“ oder „Grenzen“. Rot → grün. |
| ME-01 weitere „Nein“-Antworten | `7cfd683` | `/gobd`: Die drei FAQ sind positiv formuliert (Wer erstellt die Verfahrensdokumentation? / Wie korrigiere ich eine festgeschriebene Rechnung? / Was leistet der DATEV-Export für die GoBD?). `/preise`: „Wie wird CraftOS abgerechnet?“ statt der Frage nach dem Einmalkauf; die Testfrage kommt ohne „Nein“ aus; die Lizenztabelle zeigt „mit Voll-Lizenz“ statt Nein-Zellen. Craftnote-Alternative: „Welche Lizenzen braucht mein Team bei CraftOS?“. „Ist CraftOS GoBD-zertifiziert? – Nein“ bleibt unverändert. | `kernseiten`, `preise-seite` und `vergleich-seiten` verlangen die positiven Formen und keine Antwort, die mit „Nein“ beginnt. Rot → grün. |
| ME-06 Leitlinien-Schutz | `c6992b9` | Zentraler Helfer `lib/nur-unterstuetzt.ts`. Er prüft Negativsätze, FAQ-Antworten, die mit „Nein“ beginnen, und verneinte CraftOS-Zellen; Wettbewerberbelege bleiben außen vor. Er läuft beim Laden von `lib/seiten/{fakten,gobd,preise,craft-ai,vergleich,kleine-betriebe}.ts` und im Alternativen-Builder und ersetzt die verstreuten, engeren Muster. Einzige Ausnahme ist die GoBD-Zertifizierungsantwort. | `tests/nur-unterstuetzt.test.ts` (21 Fälle): der Helfer gegen die alten Verstöße, jedes Modul unter `lib/seiten` und das gerenderte HTML der zehn Phase-8-Seiten. Rot (Modul fehlte) → grün. |
| ME-02 Stand-Datum | `a80eaa7` | `standVon` liefert überall das älteste Abrufdatum der angezeigten Fakten, optional je Feldpfad; `quellenFuer` ebenso je Quelle. Die Marktübersichten nehmen das älteste Datum der angezeigten Belege, `/preise` das der Preisangaben, die Alternativen das des Anbieters. | Fixture-Tests: Eine neu geprüfte Einzelangabe hebt den Stand nicht an, eine ältere senkt ihn (Hub, Alternative, `standVon`, `quellenFuer`). Rot → grün. |
| ME-03 „länger testen“ | `d35264a` | Vergleichende Stärken sind aus den Datenmodulen HERO und Craftnote entfernt; `pruefeWettbewerber` lehnt „länger“ ab. Der Builder ergänzt „Sie möchten länger testen: {Anbieter} nennt {n} Tage.“ mit der Quelle der Testphase, aber nur bei `testphaseTage > site.trialDays`. Die „Für wen“-Antwort der Craftnote-Seite bildet den Zusatz aus denselben Daten. Ein Seitentext mit „länger testen“ ohne diese Bedingung bricht ab. | Fixture mit gleich langer Testphase: kein „länger“. Abbruchtest. Panel-Erwartungen. Rot → grün. |
| ME-04 ToolTime-Widerspruch | `b856658` | Die Lesart ergibt sich aus den Daten: Der Preis „je Lizenz“ ist der Paketpreis geteilt durch die enthaltenen Personen (Team 169 €/5 ≈ 34 €, Max 329 €/10 ≈ 33 €, in allen Zahlweisen). Die Alternative zeigt „34 € anteilig (Team)“ und „29 € anteilig, 1. Jahr“ mit Erklärung in der Rechenweg-Note. Die Seite für kleine Betriebe schreibt „bis zur Paketgröße im Paketpreis enthalten (Team bis 5, Max bis 10 Personen)“. | Datentest zur Lesart (alle Zahlweisen). Konsistenztest für beide Seiten. Rot → grün. |
| ME-05 `seo-audit.mjs` | `a7b8592` | Eine unbekannte Regel, eine leere Liste oder ein Pfad, der nicht in der Sitemap steht, beendet das Audit mit Exitcode 2. Pfade, die Git Bash umgeschrieben hat, erhalten den Hinweis `MSYS_NO_PATHCONV=1`. | `optionsFehler` mit Vitest-Fällen. Manuell: `--only=breadcrumb` → Exit 2; `--paths=/vergleich/hero` ohne MSYS-Schalter → Exit 2 mit Hinweis. |
| LO-01 OG-`alt` und Cache | `de97380` | `metaFor` setzt `og:image:alt` auf „{Seitentyp}: {OG-Titel}“ und hängt `?v={Hash aus Seitentyp und Titel}` an `og:image` und `twitter:image`; die Startseite nutzt denselben Helfer. Die 29 wirkungslosen `alt`-Exporte sind entfernt. Seitentypen und `ogAlt` liegen in `lib/og-meta.ts`, damit Seiten kein `next/og` laden. | `og.test.ts` (Seitentyp je OG-Datei, `alt`, `?v=`), `seo-meta.test.ts`. Live: `/preise` liefert `og:image …/preise/opengraph-image?v=s8zoei` mit 200 image/png und `og:image:alt` „Preise: Preise der Handwerkersoftware CraftOS“. |
| LO-02 Article-Schema-Bild | `d6bc19c` | `image` im Article/TechArticle-Schema zeigt jetzt auf das Segmentbild des Artikels. | `content.test.ts` für alle Ratgeber- und Hilfeartikel. Rot → grün. |
| LO-03 404 statt 500 | `f988cb1` | Die sechs dynamischen OG-Routen setzen `dynamicParams = false`; `route-audit` prüft drei unbekannte OG-Pfade. | `og.test.ts`. Live: vier unbekannte OG-Pfade liefern 404, `/funktionen/aufmass/opengraph-image` liefert 200. route-audit Exit 0. |
| LO-04 Verallgemeinerungen | `861d736` | Die Hub-Kopfantwort gruppiert die übergebenen Anbieter nach Abrechnungsmodell (`ABRECHNUNG_SATZ` neben `ABRECHNUNG`). Die FAQ zur eigenen Lizenz leitet „allen / den meisten / einigen“ und den Paket-Hinweis aus `WEITERE_PERSON` ab. `llms.txt` erzeugt Alternativen-Links und Anbieterzahl aus `lib/wettbewerber`. | Fixture-Tests mit zwei und drei Anbietern; `llms.test.ts`. Rot → grün. |
| LO-05 Mitternachts-Test | `d899159` | „Heute“ wird lokal gebildet wie in `isoHeute`, nicht in UTC. | Ohne roten Test, siehe Hinweise. |
| LO-06 Testphase unter `/vergleich` | `f9bb482` | `craftosTestphaseSaetze` prüft jeden Satz, der CraftOS und eine Testphase nennt, blockweise auf genau `trialDays`; route-audit nutzt die Funktion unter `/vergleich`. | Vitest-Fälle. Gegen die gebauten Vergleichsseiten ohne Fehlalarm. route-audit Exit 0. Rot → grün. |
| LO-07 Prompt-Phase | `744aea2` | Für jedes Ziel gilt die kleinste Phase, unabhängig von der Reihenfolge im Mapping. | Vitest-Fall (zuerst Phase 9, dann Phase 8). Rot → grün. |
| LO-08 Alterswarnung | `4495c30` | Neue Funktion `veralteteAngaben` ohne Konsolenausgabe. Der Testbericht zeigt Angaben, die älter als 60 Tage sind, als eigenen Eintrag „NEU PRÜFEN: …“ (`it.todo`), sonst den bestandenen Test „alle Angaben jünger als 60 Tage“. | Fixture-Test zum 25.12.2026. Rot → grün. |
| IN-02 `WebPage.name` | `168607b` | Sechs Seiten (`/preise`, `/vergleich`, kleine Betriebe, Fakten, Craft AI, GoBD) nehmen den Title ohne Marke, wie `og:title`, die Funktions- und die Alternativen-Seiten. | `kernseiten`, `preise-seite`, `vergleich-seiten`. Rot → grün. |
| IN-03 API-Unschärfen | `46cdee9` | `FaqList` hat jetzt das boolesche `zentral` statt `answerMax`; alle zehn Aufrufer sind umgestellt, DESIGN-V2 C3 vermerkt das. `ogTitleSize` zählt Codepoints. | `design-v2-components`; `og.test.ts` mit Emoji-Titeln. Rot → grün. |
| IN-04 `mobile.tag` | `fde85bd` | Commit 837aab4f trägt inzwischen den echten Tag `mobile-v1.0.0-test.96` (lesend geprüft); das Register nennt ihn statt der describe-Ausgabe. | `product-register.test.ts`: kein describe-Suffix; lokal zeigen beide Tags genau auf den eingetragenen Commit. Rot → grün. |

## Nicht behoben

- **IN-01** ist eine Bestätigung des Reviewers und kein Mangel. Es gab nichts zu ändern.

## Hinweise und offene Punkte (außerhalb des Auftrags)

1. **Snapshot-Test bestand schon vorher und schlägt weiter fehl.** In `tests/pricing-parity.test.ts` ist der Test „Snapshot ist aktuell“ rot: `docs/product-pricing-snapshot.json` (und das Register seit `82c82e6`) nennen Web-Commit `cd419852` (v4.0.0-test.244), das lokale `origin/release` im Web-Repo zeigt aber auf `6686d05e`. Der Test liest nur den Zustand des externen Repos, meine Commits ändern daran nichts. Für den Abgleich ist eine Produktentscheidung nötig (`npm run sync:product`), deshalb habe ich ihn nicht angefasst.
2. **`/app` und `llms.txt`:** Dort steht weiterhin „Teilweise“ bzw. „ohne Empfang nur teilweise nutzbar“, in `lib/app-content.ts` und `lib/llms.ts`. Laut Orchestrator gilt der Leitlinien-Schutz für `lib/seiten/*.ts`; Artikel, Gewerke und übrige Seiten folgen in Phase 9.
3. **`docs/product-pricing-snapshot.json`** speichert `tag` weiterhin als `git describe`-Ausgabe, weil das Sync-Skript den Wert so erzeugt. Behoben ist IN-04 nur im Register (`lib/product-register.ts`).
4. **„Laufzeit und Kündigungsfrist“ (kleine Betriebe):** Der Satz „… reichen von monatlich kündbar bis zwölf Monate Laufzeit.“ bleibt unverändert. Craftnote und ToolTime tragen ihn mit 12 Monaten Vertrags- bzw. Mindestlaufzeit; von HERO behauptet er keine Mindestlaufzeit.
5. **LO-05 ohne roten Test:** Ein deterministischer roter Fall hinge von der Zeitzone der Prüfumgebung ab. Die Korrektur übernimmt deshalb die Datumsbildung von `isoHeute`.
6. **Inhaltlich sichten:** HI-01, HI-02, HI-03, ME-01 und ME-04 ändern sichtbare Aussagen über CraftOS und Mitbewerber. Belegt sind sie in den Datenmodulen, im Register und im Release-Code; der Produktkoordinator sollte den Wortlaut trotzdem abnehmen.
7. **Lesezugriff auf das Mobile-Repo:** Für die Offline-Belege habe ich dort einmal `git fetch` ausgeführt. Dabei wurden nur Remote-Refs aktualisiert; `origin/release` stand danach unverändert auf 837aab4f. Danach gab es ausschließlich `git show`, `git grep`, `git tag -l`, `git describe` und `git rev-parse`.

## Schlussprüfung (unter `.heavy-lock`, danach freigegeben)

| Prüfung | Ergebnis |
|---|---|
| `npx vitest run` | 39 Dateien, 863 Tests: 862 bestanden, 1 fehlgeschlagen (Snapshot-Test, schon vorher rot, siehe Hinweis 1) |
| `npx tsc --noEmit -p .` | 0 Fehler |
| `npm run lint` | 0 Befunde |
| `npm run build` | erfolgreich, alle Seiten und OG-Bilder statisch |
| `MSYS_NO_PATHCONV=1 node scripts/seo-audit.mjs` | 136/136 Sitemap-URLs, alle 12 Regeln, 0 Verstöße |
| `next start -p 3100` + `LIVE_ORIGIN=http://localhost:3100 node scripts/live-check.mjs` | 46/46 Prüfungen OK |
| `AUDIT_ORIGIN=http://localhost:3100 node scripts/route-audit.mjs` | Exit 0; 10 unbekannte Pfade liefern 404 (davon 3 OG-Pfade), 6 OG-Bilder 200 image/png |
| E2E `vergleich.pw.cjs`, `design-v2.pw.cjs`, `home-navigation.pw.cjs` (4 Projekte; deckt /preise, /fakten-ueber-craftos und /gobd ab) | 140 bestanden, 0 fehlgeschlagen, 44 übersprungen (projektbedingt) |
| Server und Port | eigener `next start` (PID 45064, Kommandozeile geprüft) per PID beendet, Port 3100 frei, Sperre entfernt |

---

_Behoben: 23.10.2026_
_Behebung: Claude (gsd-code-fixer)_
_Durchlauf: 1_
