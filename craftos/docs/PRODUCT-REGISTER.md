# Produktregister und Veröffentlichungsabgleich

Stand: 23. Oktober 2026 (Release-Abgleich Phase 5; Basis über die Abgleiche nach 08-13 und 08-14 auf Web v4.0.0-test.245 und Mobile test.96 nachgezogen und in 09-15 für Phase 9 eingefroren, siehe `content-pruefung/09-basis.md`).

Die maschinenlesbare Grundlage liegt in `lib/product-register.ts`. Sie verbindet die zentralen Funktionsbeschreibungen mit Plattformen, Zugriff, Lizenzzuordnung, Implementierungsstatus und internen Prüfbelegen. Preise und 10 Testtage werden aus `lib/site.ts` bezogen. Ratgeber und Hilfeartikel referenzieren dieselben Funktions-Slugs. Interne Belegpfade werden nicht an Suchkomponenten im Browser übertragen.

## Erfasste Produktstände (Release-Basis)

Maßgeblich ist ausschließlich der Produktions-Release `origin/release` beider Produkt-Repositories, lokal gelesen ohne `fetch` und ohne `checkout`:

| Produkt | Ref | Release-Tag | Commit |
|---|---|---|---|
| Web-App (`craft-connect-buddy`) | `origin/release` | `v4.0.0-test.245` | `6686d05e0aed9d9ed1a9959ddc2142928e874e84` |
| Mobile-App (`craftos-mobile`) | `origin/release` | `mobile-v1.0.0-test.96` | `837aab4f5c1d3cd5411f41e1d720b2aa274e2cac` |

Dieselben Commits stehen in `lib/product-register.ts` (`productBasis`), in `product-pricing-snapshot.json` (`source`, `mobileSource`) und in `product-source-snapshot.json` (`basis`, SHA-256 der Belegdateien am jeweiligen Commit). Für Phase 9 gilt diese Basis eingefroren; das Delta ab der Recherchebasis (Web `a9319e5`, Mobile `6cac366`) steht in `content-pruefung/09-basis.md`. Neu live seit test.241 und noch ohne eigenen Registereintrag: GoBD-Kassenbuch (Stufe 1, mit DATEV-Export), Rechnung nach § 13b, Sperre abgerechneter Zeiten; die Zeitkorrektur im Web (Beginn, Ende, Pause) kam mit test.241. Die Einordnung in Hilfeartikel übernehmen die Phase-9-Pakete.

Jeder Belegpfad im Register (`features[].evidence`, `liveExtras[].evidence`) und jeder Sprachordner aus `mobileLocales` wird von `tests/product-register.test.ts` per `git cat-file -e <commit>:<pfad>` gegen diese Commits geprüft, sobald beide Repositories lokal vorliegen (Pfade über `CRAFTOS_WEB_REPO` und `CRAFTOS_MOBILE_REPO` überschreibbar). Lokale Arbeitsstände oder Feature-Branches sind keine Grundlage mehr.

## Funktionen mit eigener Seite (16)

Alle 16 Funktionen aus `lib/funktionen.ts` gelten als live (`availability: "implemented"`). Gegenüber dem Stand vom 9. September 2026 geändert:

- **Kundenportal** ist live (Einladung per E-Mail aus dem Kundenstamm, Login, Projekte, Angebote mit Annahme/Ablehnung, Rechnungen, Termine, Nachrichten; ohne Feature-Flag im Release). Der Hinweis „In Prüfung“ entfällt. Onlinezahlung im Portal ist abgeschaltet und wird nicht beworben; Rechnungen werden per Überweisung beglichen (`PortalPaymentNotice.tsx`).
- **Lager & Material** zusätzlich in der Mobile-App: Barcode-Scan, Bestand je freigegebenem Lager, Ausgabe, Rücknahme und Bewegung (`src/features/inventory/screens/InventoryScanScreen.tsx`, `InventoryScreen.tsx`).
- **Arbeitsanweisungen** zusätzlich in der Mobile-App: Arbeitsschritte des Projekts mit Anleitung, Material und Werkzeug, abhakbar (`src/features/work-steps/components/WorkStepsSection.tsx`). Erstellt und verwaltet werden sie weiterhin in der Web-App.
- Belege ergänzt für Angebote (Angebotsunterschrift online, GAEB, DATANORM), Rechnungen (Mahnwesen), Buchhaltung (Bankumsätze, Zahlungseingänge, Steuer-Cockpit), Plantafel (Terminplanung/Gantt, Bauphasen), Baudokumentation (Abnahme/Teilabnahme, Mängel, Besichtigung) und Dashboard/Projekte in der Mobile-App.

## Live, aber ohne eigene Seite (`liveExtras`)

| Funktion | Plattform | Beworben |
|---|---|---|
| Mahnwesen | Web | ja |
| Bankabgleich und Zahlungseingänge | Web | ja |
| Terminplanung mit Bauphasen (in der Mobile-App: Arbeitsabschnitte) | Web | ja |
| Abnahme und Teilabnahme | Web + Mobile | ja |
| GAEB-Import/-Export und DATANORM-Import | Web | ja |
| Datenübernahme | Web | ja |
| Angebotsunterschrift online | Web | ja |
| Lager-Scan und Wareneingang | Web + Mobile | ja |
| Besichtigung | Web + Mobile | ja |
| Bautagesbericht | Mobile (+ Web-Ansicht) | ja |
| Mängel | Web + Mobile | ja |
| Projekt-Chat und Nachrichten | Mobile | ja |
| 21 Sprachen in der Mobile-App (`mobileLocales`: bg, bs, cs, de, el, en, es, fr, hr, hu, it, pl, pt, ro, ru, sk, sq, sr-cyrl, sr-latn, tr, uk) | Mobile | ja |
| Kunden in der App | Mobile | ja |
| Vorhersagen | Web | **nein** – Umfang noch ungeprüft |

„Bauphasen“ ist der Hauptbegriff; „Arbeitsabschnitte“ (Mobile seit 19.10.2026) wird als Synonym genannt (D-13). Eigene Seiten für diese Funktionen folgen in Phase 7.

## Nicht live (`notLive`) – nirgends ankündigen

Telefon-Agent, MCP-Server, KI-Agent (weitere Agent-Aktionen), Videoanalyse (Web), Subunternehmer-Portal-Einladungen und Portal-Onlinezahlung sind im Release nicht verfügbar. Die Belege (Code fehlt, Feature-Flag aus oder „Bald verfügbar“) stehen im Register. Diese Funktionen erscheinen weder auf Seiten noch in Hilfeartikeln oder `llms.txt`, auch nicht als „Demnächst“ oder mit Termin (D-12). `tests/announcements.test.ts` und das Flag `announcement` in `scripts/route-audit.mjs` verhindern Rückfälle.

## Entscheidungskorrekturen

1. 10 Tage Testphase: maßgeblich sind `src/lib/subscription/plans.ts` (Runtime-Wert) und `20260903050000_org_bootstrap_at_signup_and_start_credits.sql`; ältere Kommentarblöcke mit 14 Tagen sind überholt.
2. Voll-Lizenz: Web-App und Mobile-App für dieselbe Person enthalten, 29,95 € netto monatlich oder 299,50 € jährlich. App-Lizenz zusätzlich für andere Personen, 9,95 € bzw. 99,50 €. Mindestens eine Voll-Lizenz ist erforderlich.
3. Jahresvorteil: zehn statt zwölf Monatszahlungen = 16,666… %, öffentlich „rund 17 %“. Kein einmaliger Kauf, keine lebenslange Dauerlizenz.
4. Plantafel und weitere freigegebene Kernmodule erfordern kein separates Modulabo. Rollen und Lizenzen bleiben getrennt; KI-Verbrauch und zusätzliche Speicheroptionen werden nicht als unbegrenzt enthalten dargestellt.
5. Telefon-Agent, offener MCP-Server und weitere Agent-Aktionen: am Release nicht vorhanden; die früheren datierten Ankündigungen sind seit 20. Oktober 2026 vollständig entfernt (D-12).
6. Kundenportal: live seit dem Release-Abgleich vom 20. Oktober 2026 (D-11). Onlinezahlungen sind explizit abgeschaltet und werden nicht beworben.
7. Offline: nur geladene Inhalte und unterstützte Vorgänge. Fotos, KI und neue Downloads benötigen Verbindung; keine lückenlose Offline-Garantie.
8. Automatische ELSTER-Abgabe und autonomes Verbuchen werden nicht als verfügbare Fähigkeiten behauptet. DATANORM 4 und DATANORM 5 sind am Release belegt (`src/lib/datanorm/datanormParser.ts`, Importdialog); die frühere Einschränkung zu DATANORM v5 ist seit dem 22. Oktober 2026 gestrichen (Leitlinie L-1).

## GoBD-Prüfbelege

- `20260908020000_finalize_status.sql`: Finalisierung, Nummernvergabe, Sperre und Versionsstand.
- `20260908040000_lock_guard_hardening.sql`: geschützte Rechnungsinhalte, kein Entsperren, Rechte und verantwortliche Person.
- `20260908030000_cancellation_invoice_type_and_rpcs.sql`: eigener Stornobeleg mit Bezug zur ursprünglichen Rechnung.
- `20260614140000_eingangsrechnungen_gobd_lock_review_audit.sql`: Eingangsbelegprüfung, Sperre und Änderungsprotokoll.
- `20260710190000_documents_e_invoice_pdf_writeonce.sql`: unveränderbarer einmal gesetzter Archivverweis.
- Die Seite /gobd trennt technische Unterstützung von der Verantwortung für das betriebliche Gesamtverfahren, Aufbewahrung und Verfahrensdokumentation; sie behauptet keine Zertifizierung.
- Amtliche Quellen und Prüfung einzelner Hilfeabläufe: siehe `content-source-audit.md`.

## Vor einer öffentlichen Veröffentlichung

Die veröffentlichte App, Preise und Store-Ziele erneut gegen dieses Register prüfen. Geänderte Funktionsstände zuerst im Register und den zentralen Funktionsdaten korrigieren, danach betroffene Hilfe-/Ratgeberartikel aktualisieren. Wettbewerberpreise direkt anhand der im Vergleich verlinkten Quellen erneut prüfen; Aktionspreise bleiben als solche gekennzeichnet. Die Prüfung der Rechtsgrundlage für vergleichende Werbung ersetzt keine individuelle rechtliche Freigabe.

Der Veröffentlichungsabgleich für diesen Relaunch wurde am 9. September 2026 abgeschlossen; Belege und Grenzen stehen in `RELEASE-2026-09-09.md`. Die obige Checkliste gilt bei späteren Veröffentlichungen erneut.


## Store- und Plattformabgleich am 9. September 2026

Die direkten Ziele `https://apps.apple.com/de/app/craftos/id6757652683` und `https://play.google.com/store/apps/details?id=com.despia.craftos` stammen aus der Web-App-Konfiguration. Beide öffentlichen Seiten antworteten im frischen Browser mit HTTP 200; Google Play zeigte CraftOS, Anbieter Badalyan und „Installieren“. Für iOS meldete Apples Lookup die Version 1.0.3. Navigation, Einstieg und App-Seite bieten zwei getrennte Links, die Desktopansicht der App-Seite zusätzlich zwei QR-Codes mit den jeweiligen Store-Zielen.

Mobile Belegpfade sind im maschinenlesbaren Register pro beworbener Plattform ergänzt. (Historisch, Stand 9. September 2026: Arbeitsanweisungen wurden damals nur für die Web-App ausgewiesen; seit dem Release-Abgleich vom 20. Oktober 2026 ist die mobile Ansicht der Arbeitsschritte belegt.)

## Abschließender lokaler Codeabgleich (historisch, 9. September 2026)

Mobile wurde während der Arbeiten auf `9e6260d3c1bb9b50139c87777a72806b3499c4a8` konsolidiert und ist beim Abschlussabgleich sauber. Der vorherige Stand `f274e00` bleibt als Ausgangsbasis dokumentiert. Die neuen Commits sichern Offline-Sitzungen, Timer- und Fotozuordnungen; der letzte Commit betrifft ausschließlich einen Demo-Testmock. Daraus entsteht keine zusätzliche beworbene Fähigkeit. Web bleibt bei `d442df6874e69f13f1ffef04b9a9d59ee5d8e9a5` mit lokalen Änderungen an UI, PDF, Projektnavigation und Plantafel. Preis-, Testphasen- und Rollenquellen sowie Migrationen wurden nicht abweichend verändert. Alle angegebenen Belegpfade sind vorhanden; SHA-256-Dateistände liegen in `product-source-snapshot.json`. Diese lokale Abnahme ersetzt weiterhin keinen Abgleich mit einem späteren Produktionsdeployment.
