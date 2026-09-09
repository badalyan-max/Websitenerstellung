# Produktregister und Veröffentlichungsabgleich

Stand: 9. September 2026.

Die maschinenlesbare Grundlage liegt in `lib/product-register.ts`. Sie verbindet die zentralen Funktionsbeschreibungen mit Plattformen, Zugriff, Lizenzzuordnung, Implementierungsstatus und internen Prüfbelegen. Preise und 10 Testtage werden aus `lib/site.ts` bezogen. Ratgeber und Hilfeartikel referenzieren dieselben Funktions-Slugs. Interne Belegpfade werden nicht an Suchkomponenten im Browser übertragen.

## Erfasste Produktstände

- Web-App: Hauptbranch `main`, HEAD `d442df6874e69f13f1ffef04b9a9d59ee5d8e9a5`, einschließlich implementierter lokaler Änderungen; insbesondere Plantafel und Projektnavigation.
- Mobile-App: Hauptbranch heißt in diesem Repository `master`, HEAD `f274e00493ecc7e88803d60a776d2050fffd1963`, einschließlich implementierter lokaler Änderungen an Warteschlangen und Synchronisierung.
- Marketing-Ausgangspunkt: `142ab82`. Bestehende Änderungen an BILDER-PROMPTS.md und der deaktivierte SEO-Referenzordner wurden erhalten. Umsetzung und Autorenarbeit fanden in getrennten Worktrees statt.
- Beide Produkt-Repositories wurden ausschließlich gelesen. Eine tatsächlich veröffentlichte App-Version wird durch den Codeabgleich allein nicht bestätigt.

## Entscheidungskorrekturen

1. 10 Tage Testphase: maßgeblich sind `src/lib/subscription/plans.ts` (Runtime-Wert) und `20260903050000_org_bootstrap_at_signup_and_start_credits.sql`; ältere Kommentarblöcke mit 14 Tagen sind überholt.
2. Voll-Lizenz: Web-App und Mobile-App für dieselbe Person enthalten, 29,95 € netto monatlich oder 299,50 € jährlich. App-Lizenz zusätzlich für andere Personen, 9,95 € bzw. 99,50 €. Mindestens eine Voll-Lizenz ist erforderlich.
3. Jahresvorteil: zehn statt zwölf Monatszahlungen = 16,666… %, öffentlich „rund 17 %“. Kein einmaliger Kauf, keine lebenslange Dauerlizenz.
4. Plantafel und weitere freigegebene Kernmodule erfordern kein separates Modulabo. Rollen und Lizenzen bleiben getrennt; KI-Verbrauch und zusätzliche Speicheroptionen werden nicht als unbegrenzt enthalten dargestellt.
5. Telefon-Agent und offener MCP-Server: angekündigt für September / Anfang Oktober 2026. Weitere schreibende Agent-Aktionen nach Bestätigung: geplant für September 2026. Grundlage sind ausdrückliche Angaben des Produktinhabers, keine aus fremden Produktseiten abgeleiteten Zusagen.
6. Kundenportal: bestehende Portalansichten, aber durchgängiger Einladungsablauf noch in Prüfung. Onlinezahlungen sind explizit abgeschaltet.
7. Offline: nur geladene Inhalte und unterstützte Vorgänge. Fotos, KI und neue Downloads benötigen Verbindung; keine lückenlose Offline-Garantie.
8. DATANORM v5, automatische ELSTER-Abgabe und autonomes Verbuchen werden nicht als verfügbare Fähigkeiten behauptet.

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

Mobile Belegpfade sind im maschinenlesbaren Register pro beworbener Plattform ergänzt. Arbeitsanweisungen werden nur für die Web-App ausgewiesen; eine eigene mobile Ansicht wurde im gelesenen Stand nicht gefunden.

## Abschließender lokaler Codeabgleich

Mobile wurde während der Arbeiten auf `9e6260d3c1bb9b50139c87777a72806b3499c4a8` konsolidiert und ist beim Abschlussabgleich sauber. Der vorherige Stand `f274e00` bleibt als Ausgangsbasis dokumentiert. Die neuen Commits sichern Offline-Sitzungen, Timer- und Fotozuordnungen; der letzte Commit betrifft ausschließlich einen Demo-Testmock. Daraus entsteht keine zusätzliche beworbene Fähigkeit. Web bleibt bei `d442df6874e69f13f1ffef04b9a9d59ee5d8e9a5` mit lokalen Änderungen an UI, PDF, Projektnavigation und Plantafel. Preis-, Testphasen- und Rollenquellen sowie Migrationen wurden nicht abweichend verändert. Alle angegebenen Belegpfade sind vorhanden; SHA-256-Dateistände liegen in `product-source-snapshot.json`. Diese lokale Abnahme ersetzt weiterhin keinen Abgleich mit einem späteren Produktionsdeployment.
