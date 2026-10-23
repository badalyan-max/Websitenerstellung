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

Audit-Kürzel: **SA** = `scripts/seo-audit.mjs` (Regeln `antwort`, `h1`, `map`, `faq-schema`, `prompts`), **RA** = `scripts/route-audit.mjs` (Status und Links), **CT** = `tests/content.test.ts`, **FD** = `tests/funktionsdetails.test.ts`, **AP** = `tests/ai-prompts.test.ts`, **GW** = `tests/gewerke.test.ts`, **APP** = `tests/app-seite.test.ts`. Ergebnis: 09-16 trägt das Gate-Ergebnis ein; Vorlauf 09-09: SA sitewide 0 Verstöße (156 URLs), RA 0 Fehler, 0 defekte Links.

### SEO-09-Themen

| Thema | Zielseite/Anker | Audit | Ergebnis (09-16) |
|---|---|---|---|
| Leistungszeitraum auf der Rechnung | `/hilfe/leistungszeitraum-rechnung#antwort` | SA antwort, faq-schema; CT | |
| Regiebericht | `/hilfe/regiebericht#antwort` | SA antwort, faq-schema; CT | |
| Bedenkenanzeige | `/hilfe/bedenkenanzeige#antwort` | SA antwort, faq-schema; CT | |
| Mängelanzeige | `/blog/maengelanzeige#antwort` | SA antwort, faq-schema; CT | |
| Reverse Charge bei Bauleistungen | `/blog/reverse-charge-bauleistungen#antwort` | SA antwort, faq-schema; CT | |
| GAEB-Formate | `/blog/gaeb-formate#antwort` | SA antwort, faq-schema; L-1 Fachteil-Ausnahme (`content-produktwahrheit`) | |
| Materialliste-Vorlage | `/blog/materialliste-vorlage#antwort` | SA antwort; CT | |
| Bauablaufplan | `/blog/bauablaufplan#antwort` | SA antwort, faq-schema; CT | |
| Arbeitszeitnachweis-Vorlage | `/blog/arbeitszeitnachweis-vorlage#antwort` | SA antwort; CT | |
| Gewerke-Software | `/gewerke#antwort` | SA antwort, h1, map; GW | |
| Prompt Elektro | `/gewerke/elektriker#antwort` | SA prompts (Anker voll geprüft, K-2); AP | |
| Prompt Maler | `/gewerke/maler#antwort` | SA prompts; AP | |
| Schlussrechnung (Hilfe) | `/hilfe/schlussrechnung-erstellen#faq` | SA antwort, faq-schema; CT | |
| Schlussrechnung (Ratgeber) | `/blog/abschlagsrechnung-schlussrechnung#faq` | SA antwort, faq-schema; CT | |
| Aufmaß-App | `/funktionen/aufmass#faq-titel` | SA prompts, faq-schema; FD | |
| Bautagebuch-App | `/funktionen/baudokumentation#faq-titel` | SA prompts, faq-schema; FD | |
| Zeiterfassung Handwerk | `/funktionen/zeiterfassung#faq-titel` | SA prompts, faq-schema; FD | |
| Handwerkersoftware für kleine Betriebe (Phase 8) | `/vergleich/handwerkersoftware-kleine-betriebe#antwort` | SA prompts, antwort | |

### Neue Live-Funktionen (14) und D-32

| Funktion | Anleitung (Anker) | Verlinkende Detailseite bzw. /app | Audit | Ergebnis (09-16) |
|---|---|---|---|---|
| Terminplanung / Arbeitsabschnitte | `/hilfe/projekt-phasen-anlegen#antwort` | `/funktionen/terminplanung` | SA; FD; RA | |
| Abnahme und Teilabnahme | `/hilfe/abnahme-dokumentieren#antwort` | `/funktionen/baudokumentation` | SA; FD; RA | |
| Bautagesbericht | `/hilfe/bautagesbericht-erstellen#antwort` | `/funktionen/baudokumentation` | SA; FD; RA | |
| Mängel | `/hilfe/mangel-erfassen-bearbeiten#antwort` | `/funktionen/maengelmanagement` | SA; FD; RA | |
| Mahnwesen | `/hilfe/mahnwesen-einrichten#antwort` | `/funktionen/mahnwesen` (Sekundärlink) | SA; FD Sekundärlink; RA | |
| Bankabgleich | `/hilfe/bankumsaetze-abgleichen#antwort` | `/funktionen/bankabgleich` (Sekundärlink) | SA; FD Sekundärlink; RA | |
| DATANORM | `/hilfe/datanorm-katalog-importieren#antwort` | `/funktionen/gaeb`, `/funktionen/angebote` (Kacheln) | SA; FD hrefs; RA | |
| Datenübernahme | `/hilfe/daten-importieren#antwort` | `/funktionen/datenuebernahme` (Sekundärlink) | SA; FD Sekundärlink; RA | |
| Angebotsunterschrift online | `/hilfe/angebot-online-unterschreiben-lassen#antwort` | `/funktionen/angebote` (Kachel) | SA; FD hrefs; RA | |
| Kundenportal | `/hilfe/kundenportal-kunden-einladen#antwort` | `/funktionen/kundenportal` (Sekundärlink) | SA; FD (Portal nach Release); RA | |
| Lager-Scan | `/hilfe/lager-scan-app#antwort` | `/funktionen/lager` (Kachel) | SA; FD hrefs; RA | |
| Besichtigung | `/hilfe/besichtigung-durchfuehren#antwort` | `/funktionen/aufmass` (Kachel) | SA; FD hrefs; RA | |
| Projekt-Chat und Nachrichten | `/hilfe/projekt-chat-nachrichten#antwort` | `/funktionen/team`, `/funktionen/projektverwaltung`, `/app` | SA; FD; APP; RA | |
| 21 Sprachen der Mobile-App | `/hilfe/app-sprache-einstellen#antwort` | `/funktionen/team` (Kachel), `/app` (Textlink) | SA; FD; APP; RA | |
| Kassenbuch (D-32) | `/hilfe/kassenbuch-fuehren#antwort` | `/funktionen/buchhaltung` (Kachel „Kassenbuch“) | SA; FD hrefs; CT; RA | |
| Rechnung nach § 13b (D-32) | `/hilfe/rechnung-fertigstellen#antwort`, `/blog/reverse-charge-bauleistungen#antwort` | – (Hilfe- und Ratgeberartikel) | SA; CT | |

## 8. Offene Punkte

- Kopf-Szene `/funktionen/kundenportal` und Karten-Szene „portal“ (`lib/scenes.ts`, Rechnungsansicht `CustomerInvoice.tsx`): Die Seite ist geroutet, aber keine Mail verlinkt sie. Szene in Phase 10 auf die Unterschriftsseite umstellen oder bestätigen (Besitz `lib/scenes.ts`).
- Zusatzkarten „Kassenbuch“ und „Rechnung nach § 13b“ auf `/funktionen` und im Mega-Menü: Entscheidung Phase 10.
- Web-Produkt (kein Website-Auftrag): Kartentext „Angebote, Rechnungen, Termine, Nachrichten“ in `CustomerPortalAccessCard.tsx` nennt nicht geroutete Portalbereiche.
- Credit-Wert der Lager-Foto-KI erst nach Aufnahme in `lib/site.ts` nennen.
- `components/product-demo` und `lib/demo/machine.ts` unverändert (nicht gerendert); Entscheidung Phase 10 (deferred-items).
