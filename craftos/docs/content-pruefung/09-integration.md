# Phase 9 – Integration (09-09)

Stand: 23.10.2026. Haupt-Arbeitsbaum `main`, nach dem Merge aller Spuren der Wellen 1 bis 4 und des Craft-AI-Hotfixes (`d778c31`). Diese Datei dokumentiert die Rücknahme der Übergangsregeln, die umgesetzten Übergaben je Prüfdatei, das Release-Delta und die Abdeckung der SEO-09-Themen und der neuen Live-Funktionen. Die Spalte „Ergebnis“ der Abdeckungstabelle trägt 09-16 nach dem Phasen-Gate ein.

## 1. Strenge wiederhergestellt

| Übergang aus 09-01 | Stand nach 09-09 | Test |
|---|---|---|
| K-3: geplante Phase-9-Pfade durften in der Sitemap stehen | entfernt; alle 20 Phase-9-Einträge `bestehend` (19 + Kassenbuch), „geplant ⇒ nicht in der Sitemap“ ausnahmslos | `tests/keyword-map.test.ts` |
| `UEBERGANG_PHASE9` (Prosa-Regeln) | entfernt (war leer) | `tests/content.test.ts` |
| `L1_UEBERGANG_PHASE9` (24 Bestandstreffer) | entfernt; 0 Treffer; Geltung zusätzlich `lib/funktionen.ts`, `lib/funktionsdetails/*.ts`, `lib/app-content.ts` | `tests/content-produktwahrheit.test.ts` |
| `answer` optional | Pflicht (`lib/content.ts`, Fehlertext „Artikel {slug}: Antwort fehlt – …“) | `tests/content.test.ts` |
| Mengen über Map-Bezug | Endmengen 30 Ratgeber, 54 Hilfeartikel, RSS 30 | `tests/content.test.ts` |
| Listenobergrenzen nur beim Parsen | zusätzlich Sammelprüfung über alle 84 Artikel (≤ 3 / ≤ 4) | `tests/content.test.ts` |
| Prüfdateien ohne Test | jede Prüfdatei nennt ihre Paketartikel genau einmal, b–g decken alle 84 ab | `tests/content-pruefung.test.ts` (neu) |
| Sitemap `/blog`, `/hilfe` mit Standarddatum | `2026-10-23` (K-11) | `tests/content.test.ts` |

**Abweichung Endmenge Hilfe:** Der Plan nennt 53 Hilfeartikel. Mit der Veröffentlichung von `/hilfe/kassenbuch-fuehren` (D-32, Auftrag) sind es 54; Paket f führt damit 11 Artikel, die Vereinigung b bis g umfasst 84 Artikel.

## 2. Umgesetzte Übergaben je Prüfdatei

| Prüfdatei | Wunsch | Status |
|---|---|---|
| 09-a | Querverweise Gewerke → neue Artikel | erledigt in 09-13; Kassenbuch bewusst nicht von Gewerken verlinkt (Test „Kassenbuch nicht verlinkt“) |
| 09-a | Hinweis GAEB-/Mahnwesen-Note in `lib/funktionen.ts` | erledigt in 09-14 |
| 09-b | `handwerkerrechnung-schreiben` → leistungszeitraum-rechnung, reverse-charge-bauleistungen | umgesetzt; `/blog/abschlagsrechnung-schlussrechnung` weicht (Obergrenze 4, wie vorgeschlagen) |
| 09-b | zahlungserinnerung → mahnwesen-einrichten; aufmass-angebot → besichtigung; handwerkerangebot → angebot-online-unterschreiben; softwareauswahl → daten-importieren; wechseln → daten-importieren, datanorm; web-app-baustellen-app → projekt-chat, app-sprache | umgesetzt |
| 09-b | Map-Description „Lohnanteil“ | umgesetzt (Leistungszeitraum) |
| 09-c | offene-posten, eingangsrechnungen → bankumsaetze-abgleichen | umgesetzt |
| 09-c | Map-H1 `/blog/baustellen-einsatzplanung` ohne „Ressourcen“ | umgesetzt: „Baustellenplanung: Kapazität, Abwesenheiten und Übergaben verbinden“ (Kopfwort bleibt) |
| 09-c | Wiederverlinkung `/hilfe/planung-mitarbeiter-ressourcen` | abgelehnt: Slug bleibt laut D-12, die Akzeptanz von 09-04 („Ressourcen“ = 0) gilt weiter |
| 09-c | materialverbrauch → lager-scan-app; digitale-projektakte → besichtigung, projekt-chat; digitale-bautagesberichte → regiebericht, bedenkenanzeige; offline-baustellen-app → besichtigung | umgesetzt (materialverbrauch: wareneingang-buchen weicht; bautagesberichte: abnahme-dokumentieren weicht) |
| 09-c | Map-Titel `/hilfe/projekt-phasen-anlegen` | abgelehnt: „Bauphasen“ bleibt als Suchbegriff (09-e: zulässig) |
| 09-d | kunden-ansprechpartner → kundenportal; mitarbeiter-einladen → app-sprache; zahlungen-erfassen → bankumsaetze | umgesetzt |
| 09-d2 | Registereintrag § 13b | umgesetzt als `liveExtras` „Rechnung nach § 13b“ (nicht beworben, siehe § 6) |
| 09-d2 | Description rechnung-fertigstellen ohne „GoBD-gerecht“; angebotspositionen ohne „Leistungsvorlagen“ | umgesetzt |
| 09-d2 | Hauptkeyword berichte-abrechnen | abgelehnt: Kandidaten ohne Daten (Rohdaten `dataFound: false`) |
| 09-d2 | rechnung-fertigstellen → mahnwesen; berichte-abrechnen → regiebericht; angebot-entwurf → angebot-online; angebotspositionen → datanorm; gaeb-importieren → gaeb-formate | umgesetzt (rechnung-fertigstellen: e-rechnung-herunterladen und zahlungen-erfassen weichen zugunsten der Wünsche aus d2 und g) |
| 09-e | Descriptions zeiteintrag (Beginn, Ende, Pause) und plantafel (ohne „sofort“) | umgesetzt |
| 09-e | projekt-phasen → bauablaufplan; projektdateien → besichtigung, kundenportal; offline-sync → lager-scan-app | umgesetzt |
| 09-e2 | bautagesbericht-erstellen → regiebericht, bedenkenanzeige | umgesetzt (abnahme-dokumentieren und mangel-erfassen weichen, Obergrenze 4) |
| 09-e2 | mangel-erfassen → maengelanzeige; Description abnahme mit Teilabnahme | umgesetzt |
| 09-e2 | Map craft-ai-betriebsdaten, ki-entwurf, Kategorie craft-ai, `/craft-ai`, `/fakten` | bereits mit dem Craft-AI-Hotfix (`d778c31`) angeglichen |
| 09-e2 | relatedFeatures ki-entwurf-pruefen-uebernehmen | umgesetzt: nur `angebote` |
| 09-f | `TS_DATEIEN` erweitern | umgesetzt |
| 09-f | Kundenportal ohne Termine/Nachrichten (lib/gewerke.ts, Map, Register) | umgesetzt, siehe § 4 |
| 09-f | Negativsätze in Produktdaten (ELSTER, Mitarbeiterstandorte, PDF ≠ E-Rechnung) | umgesetzt (Inhabervorgabe), siehe § 5 |
| 09-f | Map-Eintrag, `draft: false`, Verlinkung Kassenbuch | umgesetzt: „digitales kassenbuch“ (320/8), Kachel auf `/funktionen/buchhaltung`, `relatedArticles` von `hilfe/datev-export-erstellen` |
| 09-f | `relatedArticles` von `hilfe/bankumsaetze-abgleichen` auf Kassenbuch | abgelehnt: Liste hat vier stärkere Ziele; Kassenbuch verlinkt umgekehrt auf den Bankabgleich |
| 09-f | Credit-Wert Lager-Foto-KI in `lib/site.ts` | nicht umgesetzt (nur „bei Bedarf“); Artikel nennt keinen Wert |
| 09-g | Status der neun Wissensseiten | umgesetzt (`bestehend`) |
| 09-g | relatedArticles berichte-abrechnen, bautagesbericht, digitale-bautagesberichte, rechnung-fertigstellen, handwerkerrechnung, e-rechnung-herunterladen, mangel, abnahme, gaeb-importieren, materialverbrauch, material-entnehmen, projekt-phasen, baustellen-einsatzplanung, zeiten-pruefen-exportieren, projektbezogene-zeiterfassung | umgesetzt |
| 09-g | Weiterlesen-Links `/funktionen/gaeb` → gaeb-formate, `/funktionen/maengelmanagement` → maengelanzeige | nicht umgesetzt (optional); beide Ratgeber sind über Hilfeartikel und llms.txt verlinkt |

Insgesamt 33 Artikel mit neuen `relatedArticles`, alle Ziele veröffentlicht, keine Liste über 4.

## 3. Release-Delta

| Repo | Eingefrorene Basis (09-15) | `origin/release` am 23.10.2026 | Ergebnis |
|---|---|---|---|
| Web (`craft-connect-buddy`) | `6686d05e0aed9d9ed1a9959ddc2142928e874e84` (v4.0.0-test.245) | `a0e27c4209f91e939d4cdd6830562ac929c0761a` (v4.0.0-test.246) | 4 Commits: Angebotsstatus „Fertiggestellt“ für fertiggestellte, nicht versendete Angebote (Filter in „Dokumente“, Dashboard-Kachel „… fertiggestellt · … versendet“), Kassenbuch-Formatierung (typografisches Minus), Nebenbefunde Abnahme. `src/lib/constants.ts`, `src/lib/subscription`, `src/lib/featureFlags.ts`, `src/lib/ai`, `supabase/migrations`: unverändert. |
| Mobile (`craftos-mobile`) | `837aab4f5c1d3cd5411f41e1d720b2aa274e2cac` (mobile-v1.0.0-test.96) | unverändert | – |

Wirkung auf Inhalte: Kein Artikel nennt die Angebotsstatus „Gesendet“/„Versendet“ als Ergebnis des Fertigstellens; keine Textänderung nötig. Nach dem Faktenabgleich: `npm run sync:product` (Preise, Credits, Testphase identisch), `productBasis.web` und `product-source-snapshot.json` (Basis, 43 Belegdatei-Hashes) auf test.246; `npm run sync:product:check`: „Snapshot ist aktuell: v4.0.0-test.246 (a0e27c42).“

## 4. Kundenportal nach Release

Belege (Release `a0e27c42`): `src/App.tsx` routet `/portal/login`, `/portal/einladung`, `/portal/quotes/:id`, `/portal/invoices/:id`, sonst „Ihre Unterlagen“; die Angebotsmail verlinkt die öffentliche Unterschriftsseite (`supabase/functions/_shared/quoteSigning.ts` `SIGNING_PAGE_PATH`, `src/pages/QuoteSigning.tsx`: „Angebot annehmen und unterschreiben“, „Ablehnung senden“); die Rechnungsmail trägt das PDF (`send-document-email`, `_shared/mailAttachment.ts`). Termine und Nachrichten im Portal sind nicht erreichbar.

Angeglichen: `/funktionen/kundenportal` (Lead, Ablauf „Kundenportal und Online-Unterschrift in vier Schritten“, Kacheln, FAQ), `lib/funktionen.ts` (benefit, intro, note), Angebote-FAQ, `lib/gewerke.ts` (SHK-FAQ, Bauunternehmen-FAQ „Wie erhält der Bauherr Angebote und Rechnungen?“), Map-Descriptions `/funktionen/kundenportal` und `/hilfe/kundenportal-kunden-einladen`, Register-Belege (CustomerSchedule/CustomerMessages → CustomerLogin/CustomerInviteAccept), `PRODUCT-REGISTER.md`, Hilfeartikel `kundenportal-kunden-einladen` (Szene „portal“ entfernt), `angebot-online-unterschreiben-lassen`, `projektdateien-ordner`.

## 5. Inhabervorgabe „nur nennen, was unterstützt wird“

Positiv gefasst: sechs Grenze-Kacheln (u. a. „Steuererklärung über die Kanzlei“ statt „Keine ELSTER-Einreichung“, „E-Rechnung mit strukturierten Daten“ statt „Eine PDF ist keine E-Rechnung“, „Geplante Einsatzorte auf der Karte“ statt „Geplante Orte, keine Live-Standorte“), 14 FAQ-Antworten ohne „Nein“ (Fragen so gewählt, dass die Antwort Unterstütztes nennt), neun Grenze-Sätze in `lib/funktionen.ts`, die `/app`-Kennzahlennotiz („Offline teilweise nutzbar“). Einzige Ausnahme: FAQ „Ist CraftOS GoBD-zertifiziert?“ auf `/gobd`. Bewusst belassen, weil sie Vorteile oder Pflichthinweise sind: „brauchen keine Lizenz“ (Kunden im Portal), „keine Zahlungsdaten“ (Import-KI), „Keine zusätzlichen Modulgebühren“ (Plantafel), „es besteht keine Geschäftsbeziehung“ (Anbieterhinweis), „Nicht zu verwechseln“ (`/fakten`). Test: `tests/funktionsdetails.test.ts` „Inhabervorgabe L-1 (09-09)“.

## 6. Kassenbuch und § 13b im Register

`liveExtras` „Kassenbuch“ (`src/pages/Kassenbuch.tsx`, Migration `20261022150000_kassenbuch_kb.sql`) und „Rechnung nach § 13b“ (`CustomerDialog.tsx`, `invoiceNoticeTexts.ts`, `generate-einvoice/index.ts`) mit `advertised: false`: beschrieben in Hilfe- und Ratgeberartikeln bzw. als Kachel auf `/funktionen/buchhaltung`, aber noch nicht als eigene Zusatzkarte auf `/funktionen` und im Mega-Menü (das ändert Gruppenmodell, Navigation und deren Tests; Entscheidung Phase 10).

## 7. Abdeckungstabelle (W11): Thema → Zielseite/Anker → Audit

Audit-Kürzel: **SA** = `scripts/seo-audit.mjs` (Regeln `antwort`, `h1`, `map`, `faq-schema`, `prompts`), **RA** = `scripts/route-audit.mjs` (Status und Links), **CT** = `tests/content.test.ts`, **FD** = `tests/funktionsdetails.test.ts`, **AP** = `tests/ai-prompts.test.ts`, **GW** = `tests/gewerke.test.ts`, **APP** = `tests/app-seite.test.ts`. Ergebnis: Vorlauf 09-09: SA sitewide 0 Verstöße (156 URLs), RA 0 Fehler, 0 defekte Links. Phasen-Gate 09-16 (23.10.2026, lokaler Produktionsbuild): SA sitewide 0 Verstöße über 156 von 156 URLs und alle 12 Regeln, RA 0 Fehler und 0 defekte Links (156 Routen, 159 Links), alle 34 Anker der Tabelle im Build vorhanden, volle Vitest-Suite 1304 von 1304; Details in § 9.

### SEO-09-Themen

| Thema | Zielseite/Anker | Audit | Ergebnis (09-16) |
|---|---|---|---|
| Leistungszeitraum auf der Rechnung | `/hilfe/leistungszeitraum-rechnung#antwort` | SA antwort, faq-schema; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Regiebericht | `/hilfe/regiebericht#antwort` | SA antwort, faq-schema; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Bedenkenanzeige | `/hilfe/bedenkenanzeige#antwort` | SA antwort, faq-schema; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Mängelanzeige | `/blog/maengelanzeige#antwort` | SA antwort, faq-schema; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Reverse Charge bei Bauleistungen | `/blog/reverse-charge-bauleistungen#antwort` | SA antwort, faq-schema; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| GAEB-Formate | `/blog/gaeb-formate#antwort` | SA antwort, faq-schema; L-1 Fachteil-Ausnahme (`content-produktwahrheit`) || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Materialliste-Vorlage | `/blog/materialliste-vorlage#antwort` | SA antwort; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Bauablaufplan | `/blog/bauablaufplan#antwort` | SA antwort, faq-schema; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Arbeitszeitnachweis-Vorlage | `/blog/arbeitszeitnachweis-vorlage#antwort` | SA antwort; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Gewerke-Software | `/gewerke#antwort` | SA antwort, h1, map; GW || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Prompt Elektro | `/gewerke/elektriker#antwort` | SA prompts (Anker voll geprüft, K-2); AP || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Prompt Maler | `/gewerke/maler#antwort` | SA prompts; AP || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Schlussrechnung (Hilfe) | `/hilfe/schlussrechnung-erstellen#faq` | SA antwort, faq-schema; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Schlussrechnung (Ratgeber) | `/blog/abschlagsrechnung-schlussrechnung#faq` | SA antwort, faq-schema; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Aufmaß-App | `/funktionen/aufmass#faq-titel` | SA prompts, faq-schema; FD || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Bautagebuch-App | `/funktionen/baudokumentation#faq-titel` | SA prompts, faq-schema; FD || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Zeiterfassung Handwerk | `/funktionen/zeiterfassung#faq-titel` | SA prompts, faq-schema; FD || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Handwerkersoftware für kleine Betriebe (Phase 8) | `/vergleich/handwerkersoftware-kleine-betriebe#antwort` | SA prompts, antwort || grün: SA 0, Anker im Build, RA 200, Tests grün |

### Neue Live-Funktionen (14) und D-32

| Funktion | Anleitung (Anker) | Verlinkende Detailseite bzw. /app | Audit | Ergebnis (09-16) |
|---|---|---|---|---|
| Terminplanung / Arbeitsabschnitte | `/hilfe/projekt-phasen-anlegen#antwort` | `/funktionen/terminplanung` | SA; FD; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Abnahme und Teilabnahme | `/hilfe/abnahme-dokumentieren#antwort` | `/funktionen/baudokumentation` (Kachel „Abnahme und Teilabnahme“, seit Korrektur `6921340`) | SA; FD CONTENT-04; LC; RA || korrigiert 23.10.2026: Der Link fehlte bis `6921340` (Lücke aus 09-VERIFICATION, die frühere Angabe „grün“ war falsch). Jetzt FD CONTENT-04 grün, LC grün |
| Bautagesbericht | `/hilfe/bautagesbericht-erstellen#antwort` | `/funktionen/baudokumentation` | SA; FD; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Mängel | `/hilfe/mangel-erfassen-bearbeiten#antwort` | `/funktionen/maengelmanagement` | SA; FD; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Mahnwesen | `/hilfe/mahnwesen-einrichten#antwort` | `/funktionen/mahnwesen` (Sekundärlink) | SA; FD Sekundärlink; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Bankabgleich | `/hilfe/bankumsaetze-abgleichen#antwort` | `/funktionen/bankabgleich` (Sekundärlink) | SA; FD Sekundärlink; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| DATANORM | `/hilfe/datanorm-katalog-importieren#antwort` | `/funktionen/gaeb`, `/funktionen/angebote` (Kacheln) | SA; FD hrefs; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Datenübernahme | `/hilfe/daten-importieren#antwort` | `/funktionen/datenuebernahme` (Sekundärlink) | SA; FD Sekundärlink; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Angebotsunterschrift online | `/hilfe/angebot-online-unterschreiben-lassen#antwort` | `/funktionen/angebote` (Kachel) | SA; FD hrefs; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Kundenportal | `/hilfe/kundenportal-kunden-einladen#antwort` | `/funktionen/kundenportal` (Sekundärlink) | SA; FD (Portal nach Release); RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Lager-Scan | `/hilfe/lager-scan-app#antwort` | `/funktionen/lager` (Kachel) | SA; FD hrefs; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Besichtigung | `/hilfe/besichtigung-durchfuehren#antwort` | `/funktionen/aufmass` (Kachel) | SA; FD hrefs; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Projekt-Chat und Nachrichten | `/hilfe/projekt-chat-nachrichten#antwort` | `/funktionen/team`, `/funktionen/projektverwaltung`, `/app` | SA; FD; APP; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| 21 Sprachen der Mobile-App | `/hilfe/app-sprache-einstellen#antwort` | `/funktionen/team` (Kachel), `/app` (Textlink) | SA; FD; APP; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Kassenbuch (D-32) | `/hilfe/kassenbuch-fuehren#antwort` | `/funktionen/buchhaltung` (Kachel „Kassenbuch“) | SA; FD hrefs; CT; RA || grün: SA 0, Anker im Build, RA 200, Tests grün |
| Rechnung nach § 13b (D-32) | `/hilfe/rechnung-fertigstellen#antwort`, `/blog/reverse-charge-bauleistungen#antwort` | – (Hilfe- und Ratgeberartikel) | SA; CT || grün: SA 0, Anker im Build, RA 200, Tests grün |

**Korrektur 23.10.2026 (Lückenschluss nach `09-VERIFICATION.md`):** Die Zeile „Abnahme und Teilabnahme“ war als grün gemeldet, obwohl keine Funktionsdetailseite `/hilfe/abnahme-dokumentieren` verlinkte; weder FD noch der live-check prüften diese Verbindung. Seit Commit `6921340` verlinkt die Kachel „Abnahme und Teilabnahme“ auf `/funktionen/baudokumentation` die Anleitung. Neue Prüfungen: **FD CONTENT-04** = Block „CONTENT-04: jede Anleitung zu einer neuen Live-Funktion ist von einer Detailseite verlinkt“ in `tests/funktionsdetails.test.ts` (alle 15 Anleitungen dieser Tabelle; Sekundärlink oder Kachel, gerenderter `href`; Commit `f6144bb`, rot vor dem Fix). **LC** = `scripts/live-check.mjs`, Prüfung „Detailseiten verlinken Anleitungen“, jetzt für alle 14 Detailseiten mit 17 Links statt 4 (Commit `937fa13`).

## 8. Offene Punkte

- ~~Kopf-Szene `/funktionen/kundenportal` und Karten-Szene „portal“ zeigen die Portal-Rechnungsansicht~~ – erledigt in 09-16: Die Szene zeigt die Unterschriftsseite aus der Angebotsmail (`QuoteSigning.tsx`, Titel „Angebot AN-2026-018“, Felder „Vor- und Nachname“, „Unterschrift“, „Kommentar (optional)“), abgesichert in `tests/funktionsdetails.test.ts` (Szene und Feldnamen wörtlich gegen den Web-Release).
- Zusatzkarten „Kassenbuch“ und „Rechnung nach § 13b“ auf `/funktionen` und im Mega-Menü: Entscheidung Phase 10.
- Web-Produkt (kein Website-Auftrag): Kartentext „Angebote, Rechnungen, Termine, Nachrichten“ in `CustomerPortalAccessCard.tsx` nennt nicht geroutete Portalbereiche.
- Credit-Wert der Lager-Foto-KI erst nach Aufnahme in `lib/site.ts` nennen.
- `components/product-demo` und `lib/demo/machine.ts` unverändert (nicht gerendert); Entscheidung Phase 10 (deferred-items).
- Echte Silbentrennung in Safari: Playwright-WebKit unter Windows bringt kein deutsches Trennwörterbuch mit und bricht lange H1-Wörter ohne Trennstrich um (z. B. „Materialentnahmeschei|n“ auf `/hilfe/material-entnehmen-zurueckbuchen` bei 360 px, Rückfall `overflow-wrap: break-word`, kein Querscroll). Chromium trennt richtig („Materialentnahme-schein“). Stichprobe in einem echten Safari (iPhone, 360/390) steht beim Inhaber aus.

## 9. Phasen-Gate 09-16 (lokal, 23.10.2026)

Alle Prüfungen strikt nacheinander unter `.heavy-lock` gegen den lokalen Produktionsbuild, Server `next start` auf Port 3100; keine CI, kein Push. Stand nach den 09-16-Korrekturen (Kundenportal-Szene, Kartenrahmen), zweiter vollständiger Lauf.

| Prüfung | Ergebnis |
|---|---|
| `npm test` (volle Vitest-Suite) | 43 von 43 Dateien, **1304 von 1304** Tests grün |
| `npm run lint`, `npm run typecheck` | Exitcode 0 |
| `npm run sync:product:check` | „Snapshot ist aktuell: v4.0.0-test.246 (a0e27c42).“ |
| `check-no-secrets.mjs app components lib tests scripts docs ../.planning` | „OK: Schlüssel in keiner Datei“ |
| `npm run build` | Exitcode 0 |
| `seo-audit.mjs` ohne Optionen (`MSYS_NO_PATHCONV=1`) | 156 von 156 Sitemap-URLs, alle 12 Regeln **0 Verstöße**, Exitcode 0 |
| E2E-Auswahl `design-v2`, `function-illustrations`, `navigation` (inkl. `home-navigation`), `browser-functional` in Chromium und WebKit (1440 und 390 Touch) | **348 bestanden, 0 fehlgeschlagen, 0 flaky**, 56 übersprungen (Fälle, die nur in einem Projekt laufen) |
| davon neue Phase-9-Fälle in `design-v2.pw.cjs` (7 Routen × 2 Fälle + Fold-Fall, je Projekt) | 58 bestanden, 2 übersprungen (Fold nur im Desktop-Projekt) |
| `route-audit.mjs` (Port 3100) | 156 Routen, **0 Fehler, 0 defekte Links** (159 Links, 14 Assets) |
| `live-check.mjs` mit `LIVE_ORIGIN=http://localhost:3100` | 62 Prüfungen OK, 0 FEHLER |
| `visual-audit.mjs` (7 Phase-9-Routen plus `/funktionen/kundenportal`, 360/390/768/1024/1280/1440, Chromium und WebKit) | 96 Seiten: 0 Status-, 0 Seitenüberlauf-, 0 Bild-, 0 JS-, 0 axe-Befunde; einzige Elementmeldung ist die Kostentabelle auf `/blog/tiefenkalkulation-handwerk` bei 360/390 im vorgesehenen Tabellen-Scrollbereich |
| Anker der Abdeckungstabelle (§ 7) im Build | 34 von 34 vorhanden |

**Neue Browserprüfungen (`tests/e2e/design-v2.pw.cjs`, 09-UI-SPEC § 8):** `/gewerke`, `/gewerke/elektriker`, `/gewerke/allrounder`, `/blog`, `/hilfe/kategorie/rechnungen`, `/blog/tiefenkalkulation-handwerk`, `/hilfe/material-entnehmen-zurueckbuchen` in 360, 390, 768, 1024, 1280 und 1440: kein horizontaler Seitenscroll, genau eine H1 ohne Überlauf, Kopfwort-Span in der H1, StepFlow waagerecht ab 1024 und darunter senkrecht, Funktionskarten-Rahmen innerhalb der Kartenbühne, Inhaltsverzeichnis als `details` unter 1024 und sticky ab 1024, Schrittknoten 40 × 40, axe (`wcag2a`, `wcag2aa`, `wcag21aa`) ohne serious/critical, reduzierte Bewegung ohne laufende Animation (FeatureSnippet im Endzustand), CLS 0 (Chromium; WebKit meldet keine Layout-Shift-Einträge). Fold 360 × 640: Unterkante CTA bzw. Antwort `/gewerke` 519, `/gewerke/elektriker` 519, `/gewerke/allrounder` 495, `/blog/tiefenkalkulation-handwerk` 556, `/hilfe/material-entnehmen-zurueckbuchen` 532 (WebKit 501) px.

**Befunde und Korrekturen:**

1. Kundenportal-Szene (Orchestrator-Auftrag): Kopf `/funktionen/kundenportal` und Karte „Kundenportal“ zeigten die Portal-Rechnungsansicht, die keine Mail verlinkt. Umgestellt auf die Unterschriftsseite (`lib/scenes.ts`), Test rot → grün (`tests/funktionsdetails.test.ts`).
2. Kartenrahmen: Die Plantafel-Wochenansicht in den Funktionskarten nahm ihre max-content-Breite (375 px) an und ragte bei 360 und 1024 px beidseitig 26 px über die Karte (`/funktionen`, Gewerke-Seiten). Ursache in `components/v2/FeatureCard.module.css` behoben (`max-width: max(280px, 100%)`), neuer E2E-Fall rot → grün; Rahmen jetzt 280 px in 322 bzw. 302 px breiter Bühne.

**Manuelle Prüfungen aus 09-VALIDATION, soweit ohne Inhaber möglich:**

| Prüfung | Ergebnis 09-16 |
|---|---|
| Gesamteindruck der drei Vorlagen | Screenshots aus visual-audit und Ausschnitte gesichtet (Gewerke 360, Artikel 360 WebKit und 1280 Chromium, Kundenportal-Kopf 360–1440, Karten 360/1024/1440): ruhige Abschnittsfolge, Kopf mit Antwort, Inhaltsverzeichnis rechts ab 1024; einziger Befund war der Kartenrahmen (behoben) |
| Echte Silbentrennung in H1 und Prosa-H2 | Chromium 360 trennt mit Trennstrich; Playwright-WebKit unter Windows ohne Wörterbuch (siehe § 8); echter Safari offen beim Inhaber |
| Gewerke-Ablauf, Beispielkachel und Snippet, erster Antwortsatz, Schritte, L-1, Bedienbegriffe | in den Paketen 09-a bis 09-g und 09-09 durchgesehen; im Gate keine neuen Befunde (seo-audit `antwort` 0, `content-produktwahrheit` grün) |
| Rechts- und Steuerfakten aktuell | nicht erneut geöffnet; Stand der Pakete (`checkedAt`) |
| Analytics und SE-Ranking nach dem Rollout | folgt in 09-10 |
